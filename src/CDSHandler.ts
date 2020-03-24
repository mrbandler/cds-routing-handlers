import { MetadataBuilder } from "./metadata-builder/MetadataBuilder";
import { ActionMetadata } from "./metadata/ActionMetadata";
import { HandlerType } from "./types/HandlerType";
import { ODataOperation } from "./types/ODataOperation";
import { IExecContext } from "./types/IExecContext";
import { MiddlewareMetadata } from "./metadata/MiddlewareMetadata";

/**
 * CDS Handler.
 *
 * @export
 * @class CDSHandler
 */
export class CDSHandler {
    /**
     * Registers all handlers and middlewares on the given service.
     *
     * @static
     * @param {*} srv Service to register the handlers on
     * @param {Function[]} handlerClasses Handler classes
     * @param {Function[]} middlewareClasses Middleware classes
     * @memberof CDSHandler
     */
    public static register(srv: any, handlerClasses: Function[], middlewareClasses?: Function[]): void {
        const metadataBuilder = new MetadataBuilder();

        if (middlewareClasses) {
            this.registerMiddlewareClasses(metadataBuilder, srv, middlewareClasses);
        }

        this.registerHandlerClasses(metadataBuilder, srv, handlerClasses);
    }

    /**
     * Registers all middleware classes.
     *
     * @private
     * @static
     * @param {MetadataBuilder} metadataBuilder Metadata builder
     * @param {*} srv Service to register the handlers to
     * @param {Function[]} middlewareClasses Middleware classes
     * @memberof CDSHandler
     */
    private static registerMiddlewareClasses(
        metadataBuilder: MetadataBuilder,
        srv: any,
        middlewareClasses: Function[]
    ): void {
        const middlewares = metadataBuilder.buildMiddlewareMetadata(middlewareClasses);
        const globalSortedMiddlewares = middlewares
            .filter(m => m.global)
            .sort((a, b) => {
                if (a.priority > b.priority) return 1;
                if (b.priority > a.priority) return -1;

                return 0;
            });

        globalSortedMiddlewares.forEach(middleware => {
            this.registerMiddleware(srv, middleware);
        });

        const usageMiddlewares = middlewares.filter(m => !m.global);
        usageMiddlewares.forEach(middleware => {
            this.registerMiddleware(srv, middleware);
        });
    }

    /**
     * Register all handler classes.
     *
     * @private
     * @static
     * @param {MetadataBuilder} metadataBuilder Metadata builder
     * @param {*} srv Service to register the handlers to
     * @param {Function[]} handlerClasses Handler classes
     * @memberof CDSHandler
     */
    private static registerHandlerClasses(
        metadataBuilder: MetadataBuilder,
        srv: any,
        handlerClasses: Function[]
    ): void {
        const handlers = metadataBuilder.buildHandlerMetadata(handlerClasses);
        handlers.forEach(handler => {
            handler.actions.forEach(action => {
                try {
                    switch (action.handler) {
                        case HandlerType.Before:
                            this.registerBeforeHandler(srv, action);
                            break;

                        case HandlerType.On:
                            if (
                                action.operation === ODataOperation.Function ||
                                action.operation === ODataOperation.Action
                            ) {
                                this.registerFunctionImportHandler(srv, action);
                            } else {
                                this.registerOnHandler(srv, action);
                            }
                            break;

                        case HandlerType.After:
                            this.registerAfterHandler(srv, action);
                    }
                } catch (error) {
                    console.error(error.message);
                }
            });
        });
    }

    /**
     * Registers before handler.
     *
     * @private
     * @static
     * @param {*} srv Service to register to
     * @param {ActionMetadata} action Action to register
     * @memberof CDSHandler
     */
    private static registerBeforeHandler(srv: any, action: ActionMetadata): void {
        if (action.entity !== undefined) {
            srv.before(action.operation, action.entity, async (req: any, next: Function) => {
                const context = this.createExecutionContext(srv, req, next);
                return await action.exec(context);
            });
        }
    }

    /**
     * Registers on handler.
     *
     * @private
     * @static
     * @param {*} srv Service to register to
     * @param {ActionMetadata} action Action to register
     * @memberof CDSHandler
     */
    private static registerOnHandler(srv: any, action: ActionMetadata): void {
        if (action.entity !== undefined) {
            srv.on(action.operation, action.entity, async (req: any, next: Function) => {
                const context = this.createExecutionContext(srv, req, next);
                return await action.exec(context);
            });
        }
    }

    /**
     * Registers after handler.
     *
     * @private
     * @static
     * @param {*} srv Service to register to
     * @param {ActionMetadata} action Action to register
     * @memberof CDSHandler
     */
    private static registerAfterHandler(srv: any, action: ActionMetadata): void {
        if (action.entity !== undefined) {
            srv.after(action.operation, action.entity, async (entities: any[], req: any) => {
                const context = this.createExecutionContext(srv, req, undefined, entities);
                return await action.exec(context);
            });
        }
    }

    /**
     * Registers function import handler.
     *
     * @private
     * @static
     * @param {*} srv Service to register to
     * @param {ActionMetadata} action Action to register
     * @memberof CDSHandler
     */
    private static registerFunctionImportHandler(srv: any, action: ActionMetadata): void {
        if (action.entity === undefined) {
            srv.on(action.functionImportName, async (req: any, next: Function) => {
                const context = this.createExecutionContext(srv, req, next);
                return await action.exec(context);
            });
        } else {
            srv.on(action.functionImportName, action.entity, async (req: any, next: Function) => {
                const context = this.createExecutionContext(srv, req, next);
                return await action.exec(context);
            });
        }
    }

    /**
     * Registers a middleware with CDS.
     *
     * @private
     * @static
     * @param {*} srv Service to register to
     * @param {MiddlewareMetadata} middleware Middleware to register
     * @memberof CDSHandler
     */
    private static registerMiddleware(srv: any, middleware: MiddlewareMetadata): void {
        if (middleware.entities) {
            middleware.entities.forEach(entity => {
                srv.before("*", entity, async (req: any, next: Function) => {
                    const context = this.createExecutionContext(srv, req, next);
                    return await middleware.exec(context);
                });
            });
        } else {
            srv.before("*", async (req: any, next: Function) => {
                const context = this.createExecutionContext(srv, req, next);
                return await middleware.exec(context);
            });
        }
    }

    /**
     * Creates a execution context.
     *
     * @private
     * @static
     * @param {*} srv CDS service
     * @param {*} req Incoming CDS request
     * @param {(Function | undefined)} next Next handler function
     * @param {(any[] | any)} [e] Entities on a after handler
     * @returns {IExecContext}
     * @memberof CDSHandler
     */
    private static createExecutionContext(
        srv: any,
        req: any,
        next: Function | undefined,
        e?: any[] | any
    ): IExecContext {
        return {
            srv: srv,
            req: req,
            next: next,
            e: e,
        };
    }
}
