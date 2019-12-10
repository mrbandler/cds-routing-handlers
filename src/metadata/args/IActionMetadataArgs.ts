import { HandlerType } from "../../types/HandlerType";
import { OperationType } from "../../types/OperationType";

/**
 * Action metadata arguments.
 *
 * @export
 * @interface ICRUDMetadataArgs
 */
export default interface IActionMetadataArgs {
    /**
     * Target: JS function of the handler class method.
     *
     * @type {Function}
     * @memberof IActionMetadataArgs
     */
    target: Function;

    /**
     * Method name.
     *
     * @type {string}
     * @memberof IActionMetadataArgs
     */
    method: string;

    /**
     * Handler type.
     *
     * @type {HandlerType}
     * @memberof IActionMetadataArgs
     */
    handler: HandlerType;

    /**
     * Operation type.
     *
     * @type {OperationType}
     * @memberof IActionMetadataArgs
     */
    operation: OperationType;

    /**
     * Function import name.
     *
     * @type {string}
     * @memberof IActionMetadataArgs
     */
    functionImportName?: string;
}
