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
     * Method to which this "use" is applied.
     * If method is not given it means "use" is used on the controller. Then "use" applied to all controller's actions.
     *
     * @type {string}
     * @memberof IUseMetadataArgs
     */
    method?: string;

    /**
     * Middleware to be executed for this "use".
     *
     * @type {Function}
     * @memberof IUseMetadataArgs
     */
    middleware: Function;
}
