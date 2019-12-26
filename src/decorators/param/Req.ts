import { getCDSMetadataArgsStorage } from "../../index";
import { ParamType } from "../../types/ParamType";

/**
 * Request parameter decorator.
 *
 * @export
 * @returns {ParameterDecorator}
 */
export function Req(): ParameterDecorator {
    return (target: Object, key: string | symbol, index: number) => {
        getCDSMetadataArgsStorage().addParamMetadata({
            object: target,
            method: key as string,
            index: index,
            type: ParamType.Req,
        });
    };
}
