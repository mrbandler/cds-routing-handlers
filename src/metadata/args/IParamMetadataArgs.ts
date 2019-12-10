import { ParamType } from "../../types/ParamType";

/**
 * Parameter metadata arguments.
 *
 * @export
 * @interface IParamMetadataArgs
 */
export default interface IParamMetadataArgs {
    /**
     * bject on which's method's parameter this parameter is attached.
     *
     * @type {*}
     * @memberof IParamMetadataArgs
     */
    object: any;

    /**
     * Method name.
     *
     * @type {string}
     * @memberof IParamMetadataArgs
     */
    method: string;

    /**
     * Parameter index.
     *
     * @type {number}
     * @memberof IParamMetadataArgs
     */
    index: number;

    /**
     * Parameter type.
     *
     * @type {ParamType}
     * @memberof IParamMetadataArgs
     */
    type: ParamType;

    /**
     * Name of the parameter used for @Param("name") decorator.
     *
     * @type {string}
     * @memberof IParamMetadataArgs
     */
    name?: string;
}
