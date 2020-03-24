import { getMetadataArgsStorage } from "../index";
import { ActionMetadata } from "../metadata/ActionMetadata";
import { RejectMetadata } from "../metadata/RejectMetadata";
import { ParamMetadata } from "../metadata/ParamMetadata";
import { HandlerMetadata } from "../metadata/HandlerMetadata";
import { MiddlewareMetadata } from "../metadata/MiddlewareMetadata";
import { IUserCheckerMetadataArgs } from "../metadata/args/IUserCheckerMetadataArgs";
import { UserCheckerMetadata } from "../metadata/UserCheckerMetadata";

/**
 * Metadata builder.
 *
 * @export
 * @class MetadataBuilder
 */
export class MetadataBuilder {
    /**
     * Builds handler metadata for a given set of handler classes.
     *
     * @param {Function[]} [classes] Handler classes
     * @returns {MiddlewareMetadata[]} Build handler metadata
     * @memberof MetadataBuilder
     */
    public buildHandlerMetadata(classes?: Function[], userChecker?: Function): HandlerMetadata[] {
        const userCheckerMetadata = getMetadataArgsStorage().findUserCheckerWithTarget(userChecker);

        return this.createHandler(classes, userCheckerMetadata);
    }

    /**
     * Builds middleware metadata for a given set of middleware classes.
     *
     * @param {Function[]} [classes] Middleware classes
     * @returns {MiddlewareMetadata[]} Buiild middleware metadata
     * @memberof MetadataBuilder
     */
    public buildMiddlewareMetadata(classes?: Function[], userChecker?: Function): MiddlewareMetadata[] {
        const userCheckerMetadata = getMetadataArgsStorage().findUserCheckerWithTarget(userChecker);

        return this.createMiddlewares(classes, userCheckerMetadata);
    }

    /**
     * Create handler metadata.
     *
     * @param {Function[]} [classes] Handler classes to build for
     * @returns {MiddlewareMetadata[]} Created handler metadata
     * @memberof MetadataBuilder
     */
    private createHandler(classes?: Function[], userCheckerMetadataArg?: IUserCheckerMetadataArgs): HandlerMetadata[] {
        const handlers = !classes
            ? getMetadataArgsStorage().handlerMetadata
            : getMetadataArgsStorage().filterHandlerMetadataForClasses(classes);

        return handlers.map(handlerArgs => {
            const handler = new HandlerMetadata(handlerArgs);
            handler.actions = this.createActions(handler, userCheckerMetadataArg);

            return handler;
        });
    }

    /**
     * Creates middleware metadata.
     *
     * @private
     * @param {Function[]} [classes] Middleware classes to build for
     * @returns {MiddlewareMetadata[]} Created middleware metadata
     * @memberof MetadataBuilder
     */
    private createMiddlewares(
        classes?: Function[],
        userCheckerMetadataArg?: IUserCheckerMetadataArgs
    ): MiddlewareMetadata[] {
        const middlewares = !classes
            ? getMetadataArgsStorage().middlewareMetadata
            : getMetadataArgsStorage().filterMiddlewareMetadataForClasses(classes);

        return middlewares.map(middlewareArgs => {
            const middleware = new MiddlewareMetadata(middlewareArgs);
            middleware.params = this.createMiddlewareParams(middleware);
            middleware.userChecker = this.createUserChecker(userCheckerMetadataArg);

            if (!middleware.global) {
                const uses = getMetadataArgsStorage().filterUsesWithMiddleware(middleware.target);
                const handler = getMetadataArgsStorage().filterHandlerMetadataForClasses(uses.map(u => u.target));
                middleware.entities = handler
                    .filter(h => h.entity)
                    .map(h => h.entity || "")
                    .filter(s => s !== "");
            }

            return middleware;
        });
    }

    /**
     * Creates action metadata.
     *
     * @param {MiddlewareMetadata} handler Handler metadata
     * @returns {ActionMetadata[]} Created action metadata
     * @memberof MetadataBuilder
     */
    private createActions(handler: HandlerMetadata, userCheckerArg?: IUserCheckerMetadataArgs): ActionMetadata[] {
        return getMetadataArgsStorage()
            .filterActionsWithTarget(handler.target)
            .map(actionArgs => {
                const action = new ActionMetadata(handler, actionArgs);

                action.reject = this.createReject(action);
                action.params = this.createParams(action);
                action.userChecker = this.createUserChecker(userCheckerArg);

                return action;
            });
    }

    /**
     * Creates a reject.
     *
     * @private
     * @param {ActionMetadata} action Action to create metadata for
     * @returns {(RejectMetadata | undefined)} Created rejection metadata
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

    /**
     * Creates user checker parameters.
     *
     * @private
     * @param {UserCheckerMetadata} userchecker Middleware to create parameters for
     * @returns {ParamMetadata[]} Created parameters
     * @memberof MetadataBuilder
     */
    private createUserCheckerParams(userChecker: UserCheckerMetadata): ParamMetadata[] {
        return getMetadataArgsStorage()
            .filterParamsWithTargetAndMethod(userChecker.target, "check")
            .map(paramArgs => new ParamMetadata(paramArgs));
    }

    /**
     * Creates a user checker.
     *
     * @private
     * @param {(IUserCheckerMetadataArgs | undefined)} userCheckerArg User checker metadata arguments
     * @returns {(UserCheckerMetadata | undefined)} Creates user checker
     * @memberof MetadataBuilder
     */
    private createUserChecker(userCheckerArg: IUserCheckerMetadataArgs | undefined): UserCheckerMetadata | undefined {
        if (userCheckerArg) {
            const userChecker = new UserCheckerMetadata(userCheckerArg);
            userChecker.params = this.createUserCheckerParams(userChecker);

            return userChecker;
        }
    }
}
