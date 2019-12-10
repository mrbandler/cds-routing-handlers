import { getMetadataArgsStorage } from "../../index";

/**
 * Reject handler decorator.
 *
 * @export
 * @param {number} code HTTP response code
 * @param {string} message Response message
 * @returns {MethodDecorator}
 */
export function OnReject(code: number, message: string, appendErrorMessage: boolean = false): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        getMetadataArgsStorage().addRejectMetadata({
            target: target.constructor,
            method: key as string,
            code: code,
            message: message,
            appendErrorMessage: appendErrorMessage,
        });
    };
}
