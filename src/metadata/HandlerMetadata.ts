import IHandlerMetadataArgs from "./args/IHandlerMetadataArgs";
import ActionMetadata from "./ActionMetadata";
import { getFromContainer } from "../container";

/**
 * Handler metadata.
 *
 * @export
 * @class HandlerMetadata
 */
export default class HandlerMetadata {
    /**
     * Target: Typescript class.
     *
     * @type {Function}
     * @memberof HandlerMetadata
     */
    target: Function;

    /**
     * Entity for which the handler is registerd.
     *
     * @type {string}
     * @memberof HandlerMetadata
     */
    entity: string;

    /**
     * Actions metadata.
     *
     * @type {ActionMetadata[]}
     * @memberof HandlerMetadata
     */
    actions: ActionMetadata[] = [];

    /**
     * Default constructor.
     * @param {IHandlerMetadataArgs} args Metadata arguments.
     * @memberof HandlerMetadata
     */
    constructor(args: IHandlerMetadataArgs) {
        this.target = args.target;
        this.entity = args.entity;
    }

    /**
     * Returns a instance of the handler.
     *
     * @readonly
     * @type {*}
     * @memberof HandlerMetadata
     */
    get instance(): any {
        return getFromContainer(this.target);
    }
}
