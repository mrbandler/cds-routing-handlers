import IHandlerMetadataArgs from "../metadata/args/IHandlerMetadataArgs";
import IActionMetadataArgs from "../metadata/args/IActionMetadataArgs";
import IRejectMetadataArgs from "../metadata/args/IRejectMetadataArgs";
import IParamMetadataArgs from "../metadata/args/IParamMetadataArgs";
import { IUseMetadataArgs } from "../metadata/args/IUseMetadataArgs";
import { IMiddlewareMetadataArgs } from "../metadata/args/IMiddlewareMetadataArgs";

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
     * Middleware metadata arguments.
     *
     * @private
     * @type {IMiddlewareMetadataArgs[]}
     * @memberof MetadataArgsStorage
     */
    private middlewares: IMiddlewareMetadataArgs[] = [];

    /**
     * Registerd middleware usage metadata args.
     *
     * @private
     * @type {IUseMetadataArgs[]}
     * @memberof MetadataArgsStorage
     */
    private uses: IUseMetadataArgs[] = [];

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
     * Middleware metadata.
     *
     * @readonly
     * @type {IMiddlewareMetadataArgs[]}
     * @memberof MetadataArgsStorage
     */
    get middlewareMetadata(): IMiddlewareMetadataArgs[] {
        return this.middlewares;
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
     * Adds middleware metadata.
     *
     * @param {IMiddlewareMetadataArgs} metadata Metadata arguments
     * @memberof MetadataArgsStorage
     */
    public addMiddlewareMetadata(metadata: IMiddlewareMetadataArgs): void {
        this.middlewares.push(metadata);
    }

    /**
     * Adds a middleware usage metadata.
     *
     * @param {IUseMetadataArgs} metadata Metadata arguments
     * @memberof MetadataArgsStorage
     */
    public addUseMetadata(metadata: IUseMetadataArgs): void {
        this.uses.push(metadata);
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
            console.warn(`Only one OnReject can be registerd per action (${metadata.target.name}::${metadata.method})`);
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
     * Filters middleware metadata for given classes.
     *
     * @param {Function} classes Middleware classes.
     * @returns {IMiddlewareMetadataArgs[]} Filtered middleware metadata.
     * @memberof MetadataArgsStorage
     */
    public filterMiddlewareMetadataForClasses(classes: Function[]): IMiddlewareMetadataArgs[] {
        const middlewares = classes.map(cls => this.middlewares.find(mid => mid.target === cls));
        return middlewares.filter(midd => midd !== undefined) as IMiddlewareMetadataArgs[];
    }

    /**
     * Filters registerd middleware usages for a given middleware.
     *
     * @param {Function} middleware Middleware to filter for.
     * @returns {IUseMetadataArgs[]}
     * @memberof MetadataArgsStorage
     */
    public filterUsesWithMiddleware(middleware: Function): IUseMetadataArgs[] {
        return this.uses.filter(use => {
            return use.middleware === middleware;
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
        this.middlewares = [];
        this.uses = [];
        this.actions = [];
        this.rejects = [];
        this.params = [];
    }
}
