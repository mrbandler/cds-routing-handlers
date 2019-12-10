import { getMetadataArgsStorage } from "../../index";
import { ParamType } from "../../types/ParamType";

/**
 * Service parameter decorator.
 *
 * @export
 * @returns {ParameterDecorator}
 */
export function Srv(): ParameterDecorator {
    return (target: Object, key: string | symbol, index: number) => {
        getMetadataArgsStorage().addParamMetadata({
            object: target,
            method: key as string,
            index: index,
            type: ParamType.Srv,
        });
    };
}
