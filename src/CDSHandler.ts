import MetadataBuilder from "./metadata-builder/MetadataBuilder";
import ActionMetadata from "./metadata/ActionMetadata";
import { HandlerType } from "./types/HandlerType";
import { OperationType } from "./types/OperationType";
import { IExecContext } from "./types/IExecContext";

/**
 * CDS Handler.
 *
 * @export
 * @class CDSHandler
 */
export default class CDSHandler {
    /**
     * Registers all handlers on the given service.
     *
     * @static
     * @param {*} srv Service to register the handlers on.
     * @param {Function[]} classes Handler classes.
     * @memberof CDSHandler
     */
    public static registerHandlers(srv: any, classes: Function[]): void {
        const handlers = new MetadataBuilder().buildHandlerMetadata(classes);
        handlers.forEach(handler => {
            handler.actions.forEach(action => {
                try {
                    switch (action.handler) {
                        case HandlerType.Before:
                            this.registerBeforeHandler(srv, action);
                            break;

                        case HandlerType.On:
                            if (
                                action.operation === OperationType.Function ||
                                action.operation === OperationType.Action
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
     * @param {*} srv
     * @param {ActionMetadata} action
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
     * @param {*} srv
     * @param {ActionMetadata} action
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
     * @param {*} srv
     * @param {ActionMetadata} action
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
     * @param {*} srv
     * @param {ActionMetadata} action
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
