import { ParamMetadata } from "./ParamMetadata";
import { getFromContainer, MiddlewareRuntime } from "../index";
import { ICdsMiddleware } from "../types/ICdsMiddleware";
import { IMiddlewareMetadataArgs } from "./args/IMiddlewareMetadataArgs";
import { Executor } from "./base/Executer";
import { IExecContext } from "../types/IExecContext";
import { UserCheckerMetadata } from "./UserCheckerMetadata";

/**
 * Middleware metadata and executer.
 *
 * @export
 * @class MiddlewareMetadata
 */
export class MiddlewareMetadata extends Executor {
    /**
     * Target: Typescript class.
     *
     * @type {Function}
     * @memberof MiddlewareMetadata
     */
    private _target: Function;

    /**
     * Flag, whether this middleware is a global one.
     *
     * @type {boolean}
     * @memberof MiddlewareMetadata
     */
    private _global: boolean;

    /**
     * Priority of a global middleware.
     *
     * @type {number}
     * @memberof MiddlewareMetadata
     */
    private _priority: number;

    /**
     * Middleware runtime.
     *
     * @private
     * @type {MiddlewareRuntime}
     * @memberof MiddlewareMetadata
     */
    private _runtime: MiddlewareRuntime;

    /**
     * Entities on which to apply the middleware.
     *
     * @type {string}
     * @memberof MiddlewareMetadata
     */
    private _entities?: string[];

    /**
     * Middleware parameters.
     *
     * @type {ParamMetadata[]}
     * @memberof MiddlewareMetadata
     */
    private _params: ParamMetadata[] = [];

    /**
     * User checker.
     *
     * @private
     * @type {UserCheckerMetadata}
     * @memberof MiddlewareMetadata
     */
    private _userChecker?: UserCheckerMetadata;

    /**
     * Target: Typescript class.
     *
     * @readonly
     * @type {Function}
     * @memberof MiddlewareMetadata
     */
    public get target(): Function {
        return this._target;
    }

    /**
     * Flag, whether this middleware is a global one.
     *
     * @readonly
     * @type {boolean}
     * @memberof MiddlewareMetadata
     */
    public get global(): boolean {
        return this._global;
    }

    /**
     * Priority of a global middleware.
     *
     * @readonly
     * @type {number}
     * @memberof MiddlewareMetadata
     */
    public get priority(): number {
        return this._priority;
    }

    /**
     * Middleware runtime.
     *
     * @readonly
     * @type {(MiddlewareRuntime | undefined)}
     * @memberof MiddlewareMetadata
     */
    public get runtime(): MiddlewareRuntime {
        return this._runtime;
    }

    /**
     * Entities on which to apply the middleware.
     *
     * @type {string[]}
     * @memberof MiddlewareMetadata
     */
    public get entities(): string[] | undefined {
        return this._entities;
    }

    /**
     * Middleware parameters.
     *
     * @memberof MiddlewareMetadata
     */
    public set params(value: ParamMetadata[]) {
        this._params = value;
    }

    /**
     * Entities on which to apply the middleware.
     *
     * @memberof MiddlewareMetadata
     */
    public set entities(value: string[] | undefined) {
        this._entities = value;
    }

    /**
     * User checker.
     *
     * @memberof MiddlewareMetadata
     */
    public set userChecker(value: UserCheckerMetadata | undefined) {
        this._userChecker = value;
    }

    /**
     * Returns the instance of the middleware target.
     *
     * @readonly
     * @type {ICdsMiddleware}
     * @memberof MiddlewareMetadata
     */
    get instance(): ICdsMiddleware {
        return getFromContainer<ICdsMiddleware>(this._target);
    }

    /**
     * Default constructor.
     *
     * @param {IMiddlewareMetadataArgs} args Middleware metadata arguments
     * @memberof MiddlewareMetadata
     */
    constructor(args: IMiddlewareMetadataArgs) {
        super();

        this._global = args.global;
        this._target = args.target;
        this._priority = args.priority;
        this._runtime = args.runtime;
    }

    /**
     * Executes the middleware.
     *
     * @param {IExecContext} context Execution context
     * @returns {*} Execution result
     * @memberof MiddlewareMetadata
     */
    public exec(context: IExecContext): any {
        const instance = this.instance;
        const params = this.buildParams(this._params, context, this._userChecker);

        if (instance["use"]) {
            return instance.use.apply(instance, params);
        }
    }
}
