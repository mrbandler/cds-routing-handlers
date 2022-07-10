import { getMetadataArgsStorage } from "../../index";
import { HandlerType } from "../../types/HandlerType";
import { ODataOperation } from "../../types/ODataOperation";

/**
 * Before patch handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function BeforePatch(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.Before,
            operation: ODataOperation.Patch,
        });
    };
}

/**
 * On patch handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function OnPatch(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.On,
            operation: ODataOperation.Patch,
        });
    };
}

/**
 * After patch handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function AfterPatch(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.After,
            operation: ODataOperation.Patch,
        });
    };
}
