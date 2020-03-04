import { getMetadataArgsStorage } from "../index";
import MiddlewareMetadata from "../metadata/HandlerMetadata";
import ActionMetadata from "../metadata/ActionMetadata";
import RejectMetadata from "../metadata/RejectMetadata";
import ParamMetadata from "../metadata/ParamMetadata";
import { MiddlewareMetadata } from "../metadata/MiddlewareMetadata";

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
     * @returns {MiddlewareMetadata[]} Build handler metadata.
     * @memberof MetadataBuilder
     */
    public buildHandlerMetadata(classes?: Function[]): MiddlewareMetadata[] {
        return this.createHandler(classes);
    }

    /**
     * Builds middleware metadata for a given set of middleware classes.
     *
     * @param {Function[]} [classes] Middleware classes
     * @returns {MiddlewareMetadata[]} Buiild middleware metadata
     * @memberof MetadataBuilder
     */
    public buildMiddlewareMetadata(classes?: Function[]): MiddlewareMetadata[] {
        return this.create;
    }

    /**
     * Create handler metadata.
     *
     * @param {Function[]} [classes] Handler classes to build for.
     * @returns {MiddlewareMetadata[]} Created handler metadata.
     * @memberof MetadataBuilder
     */
    private createHandler(classes?: Function[]): MiddlewareMetadata[] {
        const handlers = !classes
            ? getMetadataArgsStorage().handlerMetadata
            : getMetadataArgsStorage().filterHandlerMetadataForClasses(classes);

        return handlers.map(handlerArgs => {
            const handler = new MiddlewareMetadata(handlerArgs);
            handler.actions = this.createActions(handler);

            return handler;
        });
    }

    private createMiddleware(classes?: Function[]): MiddlewareMetadata[] {
        const middlewares = !classes
            ? getMetadataArgsStorage().middlewareMetadata
            : getMetadataArgsStorage().filterMiddlewareMetadataForClasses(classes);

        return middlewares.map(middlewareArgs => {
            const middleware = new MiddlewareMetadata(middlewareArgs);
            middleware.params = this.createMiddlewareParams(middleware);

            return middleware;
        });
    }

    /**
     * Creates action metadata.
     *
     * @param {MiddlewareMetadata} handler Handler metadata.
     * @returns {ActionMetadata[]} Created action metadata.
     * @memberof MetadataBuilder
     */
    private createActions(handler: MiddlewareMetadata): ActionMetadata[] {
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
     * Creates action parameters.
     *
     * @private
     * @param {ActionMetadata} action Action to create the parameters for
     * @returns {ParamMetadata[]} Created parameters
     * @memberof MetadataBuilder
     */
    private createParams(action: ActionMetadata): ParamMetadata[] {
        return getMetadataArgsStorage()
            .filterParamsWithTargetAndMethod(action.target, action.method)
            .map(paramArgs => new ParamMetadata(paramArgs));
    }

    /**
     * Creates middleware paramters.
     *
     * @private
     * @param {MiddlewareMetadata} middleware Middleware to create parameters for
     * @returns {ParamMetadata[]} Created parameters
     * @memberof MetadataBuilder
     */
    private createMiddlewareParams(middleware: MiddlewareMetadata): ParamMetadata[] {
        return getMetadataArgsStorage()
            .filterParamsWithTargetAndMethod(middleware.target, "use")
            .map(paramArgs => new ParamMetadata(paramArgs));
    }
}
