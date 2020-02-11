import IActionMetadataArgs from "./args/IActionMetadataArgs";
import IRejectMetadataArgs from "./args/IRejectMetadataArgs";
import HandlerMetadata from "./HandlerMetadata";
import RejectMetadata from "./RejectMetadata";
import ParamMetadata from "./ParamMetadata";
import { HandlerType } from "../types/HandlerType";
import { OperationType } from "../types/OperationType";
import { ParamType } from "../types/ParamType";

/**
 * Action metadata.
 *
 * @export
 * @class ActionMetadata
 */
export default class ActionMetadata {
    /**
     * Parent handler metadata.
     *
     * @type {HandlerMetadata}
     * @memberof ActionMetadata
     */
    handlerMetadata: HandlerMetadata;

    /**
     * Target: Method on the handler class.
     *
     * @type {Function}
     * @memberof ActionMetadata
     */
    target: Function;

    /**
     * Action method on the handler class.
     *
     * @type {string}
     * @memberof ActionMetadata
     */
    method: string;

    /**
     * Entity on which the action acts.
     *
     * @type {string}
     * @memberof ActionMetadata
     */
    entity?: string;

    /**
     * Handler type.
     *
     * @type {HandlerType}
     * @memberof ActionMetadata
     */
    handler: HandlerType;

    /**
     * Operation type.
     *
     * @type {OperationType}
     * @memberof ActionMetadata
     */
    operation: OperationType;

    /**
     * Function import name.
     *
     * @type {string}
     * @memberof ActionMetadata
     */
    functionImportName?: string;

    /**
     * Reject
     *
     * @type {RejectMetadata}
     * @memberof ActionMetadata
     */
    reject?: RejectMetadata;

    /**
     * Parameter metadata.
     *
     * @type {ParamMetadata[]}
     * @memberof ActionMetadata
     */
    params: ParamMetadata[] = [];

    /**
     * Default constructor.
     * @param {HandlerMetadata} handlerMetadata Handler metadata.
     * @param {IActionMetadataArgs} args Action metadata arguments.
     * @memberof ActionMetadata
     */
    constructor(handlerMetadata: HandlerMetadata, args: IActionMetadataArgs) {
        this.handlerMetadata = handlerMetadata;
        this.entity = handlerMetadata.entity;
        this.target = args.target;
        this.method = args.method;
        this.handler = args.handler;
        this.operation = args.operation;
        this.functionImportName = args.functionImportName;
    }

    /**
     * Sets the reject metadata.
     *
     * @param {IRejectMetadataArgs} args Reject metadata arguments
     * @memberof ActionMetadata
     */
    public setReject(args: IRejectMetadataArgs | undefined): void {
        if (args) {
            this.reject = new RejectMetadata(args);
        }
    }

    /**
     * Calls the action.
     *
     * @param {*} srv CDS service.
     * @param {*} req Incoming request.
     * @param {*} next Next handler.
     * @returns
     * @memberof ActionMetadata
     */
    public exec(srv: any, req: any, next: Function | undefined, e?: any[] | any): any {
        let result;

        const handlerInstance = this.handlerMetadata.instance;
        const params = this.buildParams(srv, req, next, e);

        if (this.reject) {
            try {
                result = handlerInstance[this.method].apply(handlerInstance, params);
            } catch (error) {
                if (this.reject.appendErrorMessage) {
                    req.reject(this.reject.code, `${this.reject.message}: ${error.message}`);
                } else {
                    req.reject(this.reject.code, this.reject.message);
                }

                return;
            }
        } else {
            result = handlerInstance[this.method].apply(handlerInstance, params);
        }

        return result;
    }

    /**
     * Builds a paramters list out if all defined paramter decorators.
     *
     * @private
     * @param {*} srv CDS Service
     * @param {*} req Incoming CDS request
     * @param {*} next Next function that calls the next handler.
     * @returns {any[]}
     * @memberof ActionMetadata
     */
    private buildParams(srv: any, req: any, next: Function | undefined, e?: any[] | any): any[] {
        const sortedParams = this.params.sort((a, b) => {
            if (a.index > b.index) return 1;
            if (b.index > a.index) return -1;

            return 0;
        });

        return sortedParams.map(param => {
            switch (param.type) {
                case ParamType.Srv:
                    return srv;
                case ParamType.Req:
                    return req;
                case ParamType.Data:
                    return req.data;
                case ParamType.ParamObj:
                    return req.data;
                case ParamType.Param:
                    return this.buildParam(param, req);
                case ParamType.Jwt:
                    return req.attr.token || "";
                case ParamType.Entities:
                    return e;
                case ParamType.Next:
                    return next;
            }
        });
    }

    /**
     * Reads a parameter from the request data object.
     *
     * @private
     * @param {ParamMetadata} param Param to read from the object
     * @param {*} req Request to read it from
     * @returns {*}
     * @memberof ActionMetadata
     */
    private buildParam(param: ParamMetadata, req: any): any {
        let result = undefined;

        if (param.name) {
            result = req.data[param.name];
        }

        return result;
    }
}
