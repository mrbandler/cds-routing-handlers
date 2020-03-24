import { IHandlerMetadataArgs } from "./args/IHandlerMetadataArgs";
import { ActionMetadata } from "./ActionMetadata";
import { getFromContainer } from "../container";

/**
 * Handler metadata.
 *
 * @export
 * @class HandlerMetadata
 */
export class HandlerMetadata {
    /**
     * Target: Typescript class.
     *
     * @type {Function}
     * @memberof HandlerMetadata
     */
    private _target: Function;

    /**
     * Entity for which the handler is registerd.
     *
     * @type {string}
     * @memberof HandlerMetadata
     */
    private _entity?: string;

    /**
     * Actions metadata.
     *
     * @type {ActionMetadata[]}
     * @memberof HandlerMetadata
     */
    private _actions: ActionMetadata[] = [];

    /**
     * Target: Typescript class.
     *
     * @readonly
     * @type {Function}
     * @memberof HandlerMetadata
     */
    public get target(): Function {
        return this._target;
    }

    /**
     * Entity for which the handler is registerd.
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof HandlerMetadata
     */
    public get entity(): string | undefined {
        return this._entity;
    }

    /**
     * Returns a instance of the handler.
     *
     * @readonly
     * @type {*} Instance of the handler class
     * @memberof HandlerMetadata
     */
    public get instance(): any {
        return getFromContainer(this.target);
    }

    /**
     * Actions metadata.
     *
     * @type {ActionMetadata[]}
     * @memberof HandlerMetadata
     */
    public get actions(): ActionMetadata[] {
        return this._actions;
    }

    /**
     * Actions metadata.
     *
     * @memberof HandlerMetadata
     */
    public set actions(value: ActionMetadata[]) {
        this._actions = value;
    }

    /**
     * Default constructor.
     *
     * @param {IHandlerMetadataArgs} args Metadata arguments
     * @memberof HandlerMetadata
     */
    constructor(args: IHandlerMetadataArgs) {
        this._target = args.target;
        this._entity = args.entity;
    }
}
