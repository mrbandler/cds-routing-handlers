/**
 * Handler metadata arguments.
 *
 * @export
 * @interface IHandlerMetadataArgs
 */
export default interface IHandlerMetadataArgs {
    /**
     * Target: JS function for the handler class.
     *
     * @type {Function}
     * @memberof IHandlerMetadataArgs
     */
    target: Function;

    /**
     * Entity on which the handler acts.
     *
     * @type {string}
     * @memberof IHandlerMetadataArgs
     */
    entity?: string;
}
