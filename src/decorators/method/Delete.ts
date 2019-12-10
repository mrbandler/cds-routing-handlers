import { getMetadataArgsStorage } from "../../index";
import { OperationType } from "../../types/OperationType";
import { HandlerType } from "../../types/HandlerType";

/**
 * Before delete handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function BeforeDelete(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.Before,
            operation: OperationType.Delete,
        });
    };
}

/**
 * On delete handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function OnDelete(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.On,
            operation: OperationType.Delete,
        });
    };
}

/**
 * After delete handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function AfterDelete(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.After,
            operation: OperationType.Delete,
        });
    };
}
