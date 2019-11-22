import IHandlerMetadataArgs from "../metadata/args/IHandlerMetadataArgs";
import IActionMetadataArgs from "../metadata/args/IActionMetadataArgs";

/**
 * Metadata arguments storage.
 *
 * @export
 * @class MetadataArgsStorage
 */
export class MetadataArgsStorage {
    /**
     * Handler metadata arguments.
     *
     * @private
     * @type {IHandlerMetadataArgs[]}
     * @memberof MetadataArgsStorage
     */
    private handler: IHandlerMetadataArgs[] = [];

    /**
     * Action metadata arguments.
     *
     * @private
     * @type {IActionMetadataArgs[]}
     * @memberof MetadataArgsStorage
     */
    private actions: IActionMetadataArgs[] = [];

    /**
     * Handler metadata.
     *
     * @readonly
     * @type {IHandlerMetadataArgs[]}
     * @memberof MetadataArgsStorage
     */
    get handlerMetadata(): IHandlerMetadataArgs[] {
        return this.handler;
    }

    /**
     * Adds handler metadata.
     *
     * @param {IHandlerMetadataArgs} metadata Metadata arguments.
     * @memberof MetadataArgsStorage
     */
    public addHandlerMetadata(metadata: IHandlerMetadataArgs): void {
        this.handler.push(metadata);
    }

    /**
     * Adds action metadata.
     *
     * @param {IActionMetadataArgs} metadata Metadata arguments.
     * @memberof MetadataArgsStorage
     */
    public addActionMetadata(metadata: IActionMetadataArgs): void {
        this.actions.push(metadata);
    }

    /**
     * Filters handler metadata for given classes.
     *
     * @param {Function[]} classes Handler classes.
     * @returns {IHandlerMetadataArgs[]} Filtered handler metadata.
     * @memberof MetadataArgsStorage
     */
    public filterHandlerMetadataForClasses(classes: Function[]): IHandlerMetadataArgs[] {
        return this.handler.filter(ctrl => {
            return classes.filter(cls => ctrl.target === cls).length > 0;
        });
    }

    /**
     * Filters action metadata for given target.
     *
     * @param {Function} target Target of the action.
     * @returns {IActionMetadataArgs[]} Filtered action metadata.
     * @memberof MetadataArgsStorage
     */
    public filterActionsWithTarget(target: Function): IActionMetadataArgs[] {
        return this.actions.filter(action => action.target === target);
    }

    /**
     * Resets the storage.
     *
     * @memberof MetadataArgsStorage
     */
    public reset(): void {
        this.handler = [];
        this.actions = [];
    }
}
