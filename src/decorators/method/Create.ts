import { getMetadataArgsStorage } from "../../index";
import { HandlerType } from "../../types/HandlerType";
import { OperationType } from "../../types/OperationType";

/**
 * Before create handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function BeforeCreate(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key.toString(),
            handler: HandlerType.Before,
            operation: OperationType.Create,
        });
    };
}

/**
 * On create handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function OnCreate(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key.toString(),
            handler: HandlerType.On,
            operation: OperationType.Create,
        });
    };
}

/**
 * After create handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function AfterCreate(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key.toString(),
            handler: HandlerType.After,
            operation: OperationType.Create,
        });
    };
}
