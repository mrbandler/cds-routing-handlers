import { getMetadataArgsStorage } from "../index";

/**
 * Middleware usage decorator.
 *
 * @export
 * @param {...Function[]} middlewares
 * @returns {Function}
 */
export function Use(...middlewares: Function[]): Function {
    return (objectOrFunction: Object | Function, method?: string) => {
        middlewares.forEach(m => {
            getMetadataArgsStorage().addUseMetadata({
                target: method ? objectOrFunction.constructor : (objectOrFunction as Function),
                method: method,
                middleware: m,
            });
        });
    };
}
