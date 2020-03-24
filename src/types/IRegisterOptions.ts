/**
 * Register options.
 *
 * @export
 * @interface IRegisterOptions
 */
export interface IRegisterOptions {
    handler: Function[];
    middlewares?: Function[];
    userChecker?: Function;
}
