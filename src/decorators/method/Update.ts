import { getCDSMetadataArgsStorage } from "../../index";
import { HandlerType } from "../../types/HandlerType";
import { OperationType } from "../../types/OperationType";

/**
 * Before update handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function BeforeUpdate(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getCDSMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.Before,
            operation: OperationType.Update,
        });
    };
}

/**
 * On update handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function OnUpdate(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getCDSMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.On,
            operation: OperationType.Update,
        });
    };
}

/**
 * After update handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function AfterUpdate(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getCDSMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.After,
            operation: OperationType.Update,
        });
    };
}
