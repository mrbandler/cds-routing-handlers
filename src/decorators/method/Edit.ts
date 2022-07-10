import { getMetadataArgsStorage } from "../../index";
import { HandlerType } from "../../types/HandlerType";
import { ODataOperation } from "../../types/ODataOperation";

/**
 * Before edit handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function BeforeEdit(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.Before,
            operation: ODataOperation.Edit,
        });
    };
}

/**
 * On edit handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function OnEdit(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.On,
            operation: ODataOperation.Edit,
        });
    };
}

/**
 * After edit handler decorator.
 *
 * @export
 * @returns {MethodDecorator}
 */
export function AfterEdit(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addActionMetadata({
            target: target.constructor,
            method: key as string,
            handler: HandlerType.After,
            operation: ODataOperation.Edit,
        });
    };
}
