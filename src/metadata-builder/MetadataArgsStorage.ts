import IHandlerMetadataArgs from "../metadata/args/IHandlerMetadataArgs";
import IActionMetadataArgs from "../metadata/args/IActionMetadataArgs";
import IRejectMetadataArgs from "../metadata/args/IRejectMetadataArgs";
import IParamMetadataArgs from "../metadata/args/IParamMetadataArgs";

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
     * Reject metadata arguments.
     *
     * @private
     * @type {IRejectMetadataArgs[]}
     * @memberof MetadataArgsStorage
     */
    private rejects: IRejectMetadataArgs[] = [];

    /**
     * Parameter metadata arguments.
     *
     * @private
     * @type {IParamMetadataArgs[]}
     * @memberof MetadataArgsStorage
     */
    private params: IParamMetadataArgs[] = [];

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
     * Adds reject metadata.
     *
     * @param {IRejectMetadataArgs} metadata Metadata arguements.
     * @memberof MetadataArgsStorage
     */
    public addRejectMetadata(metadata: IRejectMetadataArgs): void {
        if (this.filterRejectWithTargetAndMethod(metadata.target, metadata.method) === undefined) {
            this.rejects.push(metadata);
        } else {
            //TODO: Output error that only one reject can be registered per action.
        }
    }

    /**
     * Adds parameter metadata.
     *
     * @param {IParamMetadataArgs} metadata Metadata arguments.
     * @memberof MetadataArgsStorage
     */
    public addParamMetadata(metadata: IParamMetadataArgs): void {
        this.params.push(metadata);
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
     * Filters reject metadata for given target and method.
     *
     * @param {Function} target Target of the reject
     * @param {string} method Method of the reject
     * @returns {IRejectMetadataArgs}
     * @memberof MetadataArgsStorage
     */
    public filterRejectWithTargetAndMethod(target: Function, method: string): IRejectMetadataArgs | undefined {
        let result;

        const rejects = this.rejects.filter(reject => reject.target === target && reject.method === method);
        if (rejects.length === 1) {
            result = rejects[0];
        }

        return result;
    }

    /**
     * Filters parameter metadata for a given target and method.
     *
     * @param {Function} target Target of the parameter
     * @param {string} method Method of the parameter
     * @returns {IParamMetadataArgs[]}
     * @memberof MetadataArgsStorage
     */
    public filterParamsWithTargetAndMethod(target: Function, method: string): IParamMetadataArgs[] {
        return this.params.filter(param => param.object.constructor === target && param.method === method);
    }

    /**
     * Resets the storage.
     *
     * @memberof MetadataArgsStorage
     */
    public reset(): void {
        this.handler = [];
        this.actions = [];
        this.rejects = [];
        this.params = [];
    }
}
