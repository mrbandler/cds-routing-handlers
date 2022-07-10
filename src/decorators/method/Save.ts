import { getMetadataArgsStorage } from "../../index";
import { HandlerType } from "../../types/HandlerType";
import { ODataOperation } from "../../types/ODataOperation";

/**
 * Before save handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function BeforeSave(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.Before,
            operation: ODataOperation.Save,
        });
    };
}

/**
 * On save handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function OnSave(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.On,
            operation: ODataOperation.Save,
        });
    };
}

/**
 * After save handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function AfterSave(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.After,
            operation: ODataOperation.Save,
        });
    };
}
