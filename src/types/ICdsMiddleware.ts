/**
 * Middleware interface.
 *
 * @export
 * @interface IMiddleware
 */
export interface ICdsMiddleware {
    /**
     * Will be called when the middleware is used.
     *
     * @param {...any[]} args Arguments, can be used to inject like in any other handler
     * @returns {Promise<void>}
     * @memberof ICdsMiddleware
     */
    use(...args: any[]): Promise<void>;
}
