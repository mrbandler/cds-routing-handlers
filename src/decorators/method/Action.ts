import { getMetadataArgsStorage } from "../../index";
import { HandlerType } from "../../types/HandlerType";
import { OperationType } from "../../types/OperationType";

/**
 * Action handler decorator.
 *
 * @export
 * @param {string} name Name of the action
 * @returns {MethodDecorator}
 */
export function Action(name: string): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.On,
            operation: OperationType.Action,
            functionImportName: name,
        });
    };
}
