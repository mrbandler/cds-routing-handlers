import HandlerMetadata from "./HandlerMetadata";
import { HandlerType } from "../types/HandlerType";
import { OperationType } from "../types/OperationType";
import IActionMetadataArgs from "./args/IActionMetadataArgs";

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
    entity: string;

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
    call(srv: any, req: any, next: any) {
        const handlerInstance = this.handlerMetadata.instance;
        return handlerInstance[this.method].apply(handlerInstance, [srv, req, next]);
    }
}
