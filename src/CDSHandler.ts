import MetadataBuilder from "./metadata-builder/MetadataBuilder";
import { HandlerType } from "./types/HandlerType";
import { OperationType } from "./types/OperationType";
import ActionMetadata from "./metadata/ActionMetadata";

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
                switch (action.handler) {
                    case HandlerType.Before:
                        this.registerBeforeHandler(srv, action);
                        break;

                    case HandlerType.On:
                        if (action.operation === OperationType.Function || action.operation === OperationType.Action) {
                            this.registerFunctionImportHandler(srv, action);
                        } else {
                            this.registerOnHandler(srv, action);
                        }
                        break;

                    case HandlerType.After:
                        this.registerAfterHandler(srv, action);
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
            srv.before(action.operation, action.entity, async (req: any, next: any) => {
                return await action.exec(srv, req, next);
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
            srv.on(action.operation, action.entity, async (req: any, next: any) => {
                return await action.exec(srv, req, next);
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
            srv.after(action.operation, action.entity, async (req: any, next: any) => {
                return await action.exec(srv, req, next);
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
            srv.on(action.functionImportName, async (req: any, next: any) => {
                return await action.exec(srv, req, next);
            });
        } else {
            srv.on(action.functionImportName, action.entity, async (req: any, next: any) => {
                return await action.exec(srv, req, next);
            });
        }
    }
}
