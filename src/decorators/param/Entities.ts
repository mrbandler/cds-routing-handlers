import { getMetadataArgsStorage } from "../../index";
import { ParamType } from "../../types/ParamType";

/**
 * Param parameter decorator.
 *
 * @export
 * @param {string} name
 * @returns {ParameterDecorator}
 */
export function Entities(): ParameterDecorator {
    return (target: Object, key: string | symbol, index: number) => {
        getMetadataArgsStorage().addParamMetadata({
            object: target,
            method: key as string,
            index: index,
            type: ParamType.Entities,
        });
    };
}
