import { getMetadataArgsStorage } from "../index";
import HandlerMetadata from "../metadata/HandlerMetadata";
import ActionMetadata from "../metadata/ActionMetadata";
import RejectMetadata from "../metadata/RejectMetadata";
import ParamMetadata from "../metadata/ParamMetadata";

/**
 * Metadata builder.
 *
 * @export
 * @class MetadataBuilder
 */
export default class MetadataBuilder {
    /**
     * Builds handler metadata for a given set of handler classes.
     *
     * @param {Function[]} [classes] Handler classes.
     * @returns {HandlerMetadata[]} Build handler metadata.
     * @memberof MetadataBuilder
     */
    public buildHandlerMetadata(classes?: Function[]): HandlerMetadata[] {
        return this.createHandler(classes);
    }

    /**
     * Create handler metadata.
     *
     * @param {Function[]} [classes] Handler classes to build for.
     * @returns {HandlerMetadata[]} Created handler metadata.
     * @memberof MetadataBuilder
     */
    private createHandler(classes?: Function[]): HandlerMetadata[] {
        const handlers = !classes
            ? getMetadataArgsStorage().handlerMetadata
            : getMetadataArgsStorage().filterHandlerMetadataForClasses(classes);

        return handlers.map(handlerArgs => {
            const handler = new HandlerMetadata(handlerArgs);
            handler.actions = this.createActions(handler);

            return handler;
        });
    }

    /**
     * Creates action metadata.
     *
     * @param {HandlerMetadata} handler Handler metadata.
     * @returns {ActionMetadata[]} Created action metadata.
     * @memberof MetadataBuilder
     */
    private createActions(handler: HandlerMetadata): ActionMetadata[] {
        return getMetadataArgsStorage()
            .filterActionsWithTarget(handler.target)
            .map(actionArgs => {
                const action = new ActionMetadata(handler, actionArgs);

                action.reject = this.createReject(action);
                action.params = this.createParams(action);

                return action;
            });
    }

    /**
     * Creates a reject.
     *
     * @private
     * @param {ActionMetadata} action
     * @returns {(RejectMetadata | undefined)}
     * @memberof MetadataBuilder
     */
    private createReject(action: ActionMetadata): RejectMetadata | undefined {
        let result;

        const args = getMetadataArgsStorage().filterRejectWithTargetAndMethod(action.target, action.method);
        if (args) {
            result = new RejectMetadata(args);
        }

        return result;
    }

    /**
     * Creates a parameters.
     *
     * @private
     * @param {ActionMetadata} action
     * @returns {ParamMetadata[]}
     * @memberof MetadataBuilder
     */
    private createParams(action: ActionMetadata): ParamMetadata[] {
        return getMetadataArgsStorage()
            .filterParamsWithTargetAndMethod(action.target, action.method)
            .map(paramArgs => new ParamMetadata(action, paramArgs));
    }
}
