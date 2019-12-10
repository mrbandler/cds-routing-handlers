import { getMetadataArgsStorage } from "../../index";
import { HandlerType } from "../../types/HandlerType";
import { OperationType } from "../../types/OperationType";

/**
 * Function handler decorator.
 *
 * @export
 * @param {string} name Name of the function
 * @returns {MethodDecorator}
 */
export function Func(name: string): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.On,
            operation: OperationType.Function,
            functionImportName: name,
        });
    };
}
