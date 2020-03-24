import { getMetadataArgsStorage } from "../../index";
import { ODataOperation } from "../../types/ODataOperation";
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
            operation: ODataOperation.Delete,
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
            operation: ODataOperation.Delete,
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
            operation: ODataOperation.Delete,
        });
    };
}
