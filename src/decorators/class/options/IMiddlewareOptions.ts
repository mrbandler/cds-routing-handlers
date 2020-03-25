import { MiddlewareRuntime } from "../../../types/MiddlewareRuntime";

/**
 * Middleware decorator options.
 *
 * @export
 * @interface IMiddlewareOptions
 */
export interface IMiddlewareOptions {
    global?: boolean;
    priority?: number;
    runtime?: MiddlewareRuntime;
}
