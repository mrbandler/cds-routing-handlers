import HandlerMetadata from "./HandlerMetadata";
import { HandlerType } from "../types/HandlerType";
import { OperationType } from "../types/OperationType";
import IActionMetadataArgs from "./args/IActionMetadataArgs";
import RejectMetadata from "./RejectMetadata";
import IRejectMetadataArgs from "./args/IRejectMetadataArgs";
import ParamMetadata from "./ParamMetadata";
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
    public async exec(srv: any, req: any, next: any): Promise<any> {
        const handlerInstance = this.handlerMetadata.instance;
        const params = this.buildParams(srv, req, next);

        if (this.reject) {
            try {
                return handlerInstance[this.method].apply(handlerInstance, params);
            } catch (error) {
                req.reject(this.reject.code, `${this.reject.message}: ${error.message}`);
            }
        } else {
            return handlerInstance[this.method].apply(handlerInstance, params);
        }
    }

    /**
     * Builds a paramters list out if all defined paramter decorators.
     *
     * @private
     * @param {*} srv
     * @param {*} req
     * @param {*} next
     * @returns {any[]}
     * @memberof ActionMetadata
     */
    private buildParams(srv: any, req: any, next: any): any[] {
        const sortedParams = this.params.sort((a, b) => {
            if (a > b) return 1;
            if (b > a) return -1;

            return 0;
        });

        return sortedParams.map(param => {
            switch (param.type) {
                case ParamType.Srv:
                    return srv;
                case ParamType.Req:
                    return req;
                case ParamType.Next:
                    return next;
                case ParamType.ParamObj:
                    return req.data;
                case ParamType.Param:
                    return this.buildParam(param, req);
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
