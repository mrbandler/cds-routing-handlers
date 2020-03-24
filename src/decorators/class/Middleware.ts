import { getMetadataArgsStorage } from "../../index";
import { IMiddlewareOptions } from "./options/IMiddlewareOptions";

/**
 * Handler decorator.
 *
 * @export
 * @param {string} entity Entity for which the decorator is used.
 * @returns {ClassDecorator}
 */
export function Middleware(options?: IMiddlewareOptions): ClassDecorator {
    return (target: Function) => {
        const global = options ? options.global || false : false;
        const priority = options ? options.priority || 99 : 99;
        getMetadataArgsStorage().addMiddlewareMetadata({
            target: target,
            global: global,
            priority: priority,
        });
    };
}
