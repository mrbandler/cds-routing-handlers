import { MiddlewareRuntime } from "../../types/MiddlewareRuntime";

/**
 * Middleware metadata arguments.
 *
 * @export
 * @interface IMiddlewareMetadataArgs
 */
export interface IMiddlewareMetadataArgs {
    /**
     * Target: JS function for the handler class.
     *
     * @type {Function}
     * @memberof IMiddlewareMetadataArgs
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

    /**
     * Middleware runtime.
     *
     * @type {MiddlewareRuntime}
     * @memberof IMiddlewareMetadataArgs
     */
    runtime: MiddlewareRuntime;
}
