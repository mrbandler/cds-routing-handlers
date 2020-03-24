import { getMetadataArgsStorage } from "../../index";

/**
 * User checker decorator.
 *
 * @export
 * @returns {ClassDecorator}
 */
export function UserChecker(): ClassDecorator {
    return (target: Function) => {
        getMetadataArgsStorage().addUserCheckerMetadata({
            target: target,
        });
    };
}
