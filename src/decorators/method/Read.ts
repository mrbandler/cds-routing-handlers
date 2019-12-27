import { getMetadataArgsStorage } from "../../index";
import { HandlerType } from "../../types/HandlerType";
import { OperationType } from "../../types/OperationType";

/**
 * Before read handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function BeforeRead(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.Before,
            operation: OperationType.Read,
        });
    };
}

/**
 * On read handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function OnRead(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.On,
            operation: OperationType.Read,
        });
    };
}

/**
 * After read handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function AfterRead(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.After,
            operation: OperationType.Read,
        });
    };
}
