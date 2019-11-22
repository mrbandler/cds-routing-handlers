import { getMetadataArgsStorage } from "../index";
import HandlerMetadata from "../metadata/HandlerMetadata";
import ActionMetadata from "../metadata/ActionMetadata";

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
    buildHandlerMetadata(classes?: Function[]): HandlerMetadata[] {
        return this.createHandler(classes);
    }

    /**
     * Create handler metadata.
     *
     * @param {Function[]} [classes] Handler classes to build for.
     * @returns {HandlerMetadata[]} Created handler metadata.
     * @memberof MetadataBuilder
     */
    createHandler(classes?: Function[]): HandlerMetadata[] {
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
    createActions(handler: HandlerMetadata): ActionMetadata[] {
        return getMetadataArgsStorage()
            .filterActionsWithTarget(handler.target)
            .map(actionArgs => new ActionMetadata(handler, actionArgs));
    }
}
