/**
 * Metadata used to store registered middlewares.
 *
 * @export
 * @interface IUseMetadataArgs
 */
export interface IUseMetadataArgs {
    /**
     * Object class of this "use".
     *
     * @type {Function}
     * @memberof IUseMetadataArgs
     */
    target: Function;

    /**
     * Middleware to be executed for this "use".
     *
     * @type {Function}
     * @memberof IUseMetadataArgs
     */
    middleware: Function;
}
