import { getMetadataArgsStorage } from "../../index";
import { HandlerType } from "../../types/HandlerType";
import { ODataOperation } from "../../types/ODataOperation";

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
            operation: ODataOperation.Create,
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
            operation: ODataOperation.Create,
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
            operation: ODataOperation.Create,
        });
    };
}
