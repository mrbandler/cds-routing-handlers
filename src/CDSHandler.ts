import MetadataBuilder from "./metadata-builder/MetadataBuilder";
import { HandlerType } from "./types/HandlerType";

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
                        srv.before(action.operation, action.entity, (req: any, next: any) => {
                            action.call(srv, req, next);
                        });
                        break;

                    case HandlerType.On:
                        srv.on(action.operation, action.entity, (req: any, next: any) => {
                            action.call(srv, req, next);
                        });
                        break;

                    case HandlerType.After:
                        srv.after(action.operation, action.entity, (req: any, next: any) => {
                            action.call(srv, req, next);
                        });
                }
            });
        });
    }
}
