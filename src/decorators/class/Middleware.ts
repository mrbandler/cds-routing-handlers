import { getMetadataArgsStorage } from "../../index";
import { IMiddlewareOptions } from "./options/IMiddlewareOptions";
import { MiddlewareRuntime } from "../../types/MiddlewareRuntime";

/**
 * Middleware decorator.
 *
 * @export
 * @param {IMiddlewareOptions} [options] Middleware options, should only be used for global middlewares
 * @returns {ClassDecorator}
 */
export function Middleware(options?: IMiddlewareOptions): ClassDecorator {
    return (target: Function) => {
        const global = options ? options.global || false : false;
        const priority = options ? options.priority || 99 : 99;
        const runtime = options ? options.runtime || MiddlewareRuntime.Normal : MiddlewareRuntime.Normal;
        getMetadataArgsStorage().addMiddlewareMetadata({
            target: target,
            global: global,
            priority: priority,
            runtime: runtime,
        });
    };
}
