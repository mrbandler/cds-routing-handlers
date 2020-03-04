import { getMetadataArgsStorage } from "../../index";

/**
 * Middleware decorator.
 *
 * @export
 * @returns {ClassDecorator}
 */
export function Middleware(): ClassDecorator {
    return (target: Function) => {
        // getMetadataArgsStorage().addMiddlewareMetadata({ target });
    };
}
