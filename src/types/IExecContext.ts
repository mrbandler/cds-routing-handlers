/**
 * Execution context.
 *
 * @export
 * @interface IExecContext
 */
export interface IExecContext {
    srv: any;
    req: any;
    next: Function | undefined;
    e?: any[] | any;
}
