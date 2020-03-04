import ParamMetadata from "./ParamMetadata";
import { getFromContainer } from "../index";
import { IMiddleware } from "../types/IMiddleware";
import { IMiddlewareMetadataArgs } from "./args/IMiddlewareMetadataArgs";
import { Executer } from "./base/Executer";
import { IExecContext } from "../types/IExecContext";

/**
 *
 *
 * @export
 * @class MiddlewareMetadata
 */
export class MiddlewareMetadata extends Executer {
    /**
     *
     *
     * @type {Function}
     * @memberof MiddlewareMetadata
     */
    target: Function;

    /**
     *
     *
     * @type {boolean}
     * @memberof MiddlewareMetadata
     */
    global: boolean;

    /**
     *
     *
     * @type {number}
     * @memberof MiddlewareMetadata
     */
    priority: number;

    /**
     *
     *
     * @type {ParamMetadata[]}
     * @memberof MiddlewareMetadata
     */
    params: ParamMetadata[] = [];

    /**
     *
     *
     * @readonly
     * @type {IMiddleware}
     * @memberof MiddlewareMetadata
     */
    get instance(): IMiddleware {
        return getFromContainer<IMiddleware>(this.target);
    }

    /**
     * Default constructor.
     * @param {IMiddlewareMetadataArgs} args
     * @memberof MiddlewareMetadata
     */
    constructor(args: IMiddlewareMetadataArgs) {
        super();

        this.global = args.global;
        this.target = args.target;
        this.priority = args.priority;
    }

    public exec(context: IExecContext): any {
        const instance = this.instance;
        const params = this.buildParams(this.params, context);

        return instance["use"].apply(instance, params);
    }
}
