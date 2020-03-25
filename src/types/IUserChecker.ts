/**
 * User checker interface.
 *
 * @export
 * @interface IUserChecker
 */
export interface IUserChecker {
    /**
     * Will be called when the user checker is used.
     *
     * @param {...any[]} args Arguments, can be used to inject like in any other handler
     * @returns {Promise<any>}
     * @memberof IUserChecker
     */
    check(...args: any[]): any;
}
