/**
 * Middleware interface.
 *
 * @export
 * @interface IMiddleware
 */
export interface IMiddleware {
    use(...args: any[]): Promise<boolean>;
}
