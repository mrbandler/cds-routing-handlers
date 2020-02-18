import * as cloud from "@sap/cloud-sdk-core";
import IActionMetadataArgs from "./args/IActionMetadataArgs";
import IRejectMetadataArgs from "./args/IRejectMetadataArgs";
import HandlerMetadata from "./HandlerMetadata";
import RejectMetadata from "./RejectMetadata";
import ParamMetadata from "./ParamMetadata";
import { HandlerType } from "../types/HandlerType";
import { OperationType } from "../types/OperationType";
import { Executer } from "./base/Executer";
import { IExecContext } from "../types/IExecContext";

/**
 * Action metadata.
 *
 * @export
 * @class ActionMetadata
 */
export default class ActionMetadata extends Executer {
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
        super();

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
     * Executs the action.
     *
     * @protected
     * @param {IExecContext} context Execution context
     * @returns {*} Result
     * @memberof ActionMetadata
     */
    public exec(context: IExecContext): any {
        let result = undefined;

        const instance = this.handlerMetadata.instance;
        const params = this.buildParams(this.params, context);

        if (this.reject) {
            try {
                result = instance[this.method].apply(instance, params);
            } catch (error) {
                if (this.reject.appendErrorMessage) {
                    context.req.reject(this.reject.code, `${this.reject.message}: ${error.message}`);
                } else {
                    context.req.reject(this.reject.code, this.reject.message);
                }

                return;
            }
        } else {
            result = instance[this.method].apply(instance, params);
        }

        return result;
    }
}
