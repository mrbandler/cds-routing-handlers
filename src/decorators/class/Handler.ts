import { getCDSMetadataArgsStorage } from "../../index";

/**
 * Handler decorator.
 *
 * @export
 * @param {string} entity Entity for which the decorator is used.
 * @returns {ClassDecorator}
 */
export function Handler(entity?: string): ClassDecorator {
    return (target: Function) => {
        getCDSMetadataArgsStorage().addHandlerMetadata({ target, entity });
    };
}
