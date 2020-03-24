/**
 * CDS routing handler options.
 *
 * @export
 * @interface CdsRoutingHandlerOptions
 */
export interface ICdsRoutingHandlerOptions {
    handler: Function[] | string[];
    middlewares?: Function[];
    userChecker?: Function;
}
