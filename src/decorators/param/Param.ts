import { getCDSMetadataArgsStorage } from "../../index";
import { ParamType } from "../../types/ParamType";

/**
 * Param parameter decorator.
 *
 * @export
 * @param {string} name
 * @returns {ParameterDecorator}
 */
export function Param(name: string): ParameterDecorator {
    return (target: Object, key: string | symbol, index: number) => {
        getCDSMetadataArgsStorage().addParamMetadata({
            object: target,
            method: key as string,
            index: index,
            type: ParamType.Param,
            name: name,
        });
    };
}
