import { getMetadataArgsStorage } from "../../index";

/**
 * Middleware usage decorator.
 *
 * @export
 * @param {...Function[]} middlewares Middlewares to use
 * @returns {Function}
 */
export function Use(...middlewares: Function[]): ClassDecorator {
    return (target: Function) => {
        middlewares.forEach(m => {
            getMetadataArgsStorage().addUseMetadata({ target: target, middleware: m });
        });
    };
}
