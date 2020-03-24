import { HandlerType } from "../../types/HandlerType";
import { ODataOperation } from "../../types/ODataOperation";

/**
 * Action metadata arguments.
 *
 * @export
 * @interface ICRUDMetadataArgs
 */
export interface IActionMetadataArgs {
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
     * @type {ODataOperation}
     * @memberof IActionMetadataArgs
     */
    operation: ODataOperation;

    /**
     * Function import name.
     *
     * @type {string}
     * @memberof IActionMetadataArgs
     */
    functionImportName?: string;
}
