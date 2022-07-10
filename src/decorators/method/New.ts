import { getMetadataArgsStorage } from "../../index";
import { HandlerType } from "../../types/HandlerType";
import { ODataOperation } from "../../types/ODataOperation";

/**
 * Before new handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function BeforeNew(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.Before,
            operation: ODataOperation.New,
        });
    };
}

/**
 * On new handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function OnNew(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.On,
            operation: ODataOperation.New,
        });
    };
}

/**
 * After new handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function AfterNew(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.After,
            operation: ODataOperation.New,
        });
    };
}
