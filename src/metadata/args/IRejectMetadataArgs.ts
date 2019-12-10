/**
 * Reject metadata arguments.
 *
 * @export
 * @interface IRejectMetadataArgs
 */
export default interface IRejectMetadataArgs {
    /**
     * Target: JS function of the handler class method.
     *
     * @type {Function}
     * @memberof IRejectMetadataArgs
     */
    target: Function;

    /**
     * Method name.
     *
     * @type {string}
     * @memberof IRejectMetadataArgs
     */
    method: string;

    /**
     * HTTP Response code.
     *
     * @type {number}
     * @memberof IRejectMetadataArgs
     */
    code: number;

    /**
     * Response message.
     *
     * @type {string}
     * @memberof IRejectMetadataArgs
     */
    message: string;

    /**
     * Flag, whether the JS error message should be appended.
     *
     * @type {boolean}
     * @memberof IRejectMetadataArgs
     */
    appendErrorMessage: boolean;
}
