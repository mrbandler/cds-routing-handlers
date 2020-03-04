/**
 * Handler metadata arguments.
 *
 * @export
 * @interface IHandlerMetadataArgs
 */
export interface IMiddlewareMetadataArgs {
    /**
     * Target: JS function for the handler class.
     *
     * @type {Function}
     * @memberof IHandlerMetadataArgs
     */
    target: Function;

    /**
     * Indicates if this middleware is global, thous applied to all routes.
     *
     * @type {boolean}
     * @memberof IMiddlewareMetadataArgs
     */
    global: boolean;

    /**
     * Execution priority of the middleware.
     *
     * @type {number}
     * @memberof IMiddlewareMetadataArgs
     */
    priority: number;
}
