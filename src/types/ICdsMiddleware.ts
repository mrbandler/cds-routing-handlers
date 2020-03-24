/**
 * Middleware interface.
 *
 * @export
 * @interface IMiddleware
 */
export interface ICdsMiddleware {
    use(...args: any[]): Promise<void>;
}
