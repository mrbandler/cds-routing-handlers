import { ParamMetadata } from "./ParamMetadata";
import { getFromContainer } from "../index";
import { Executor } from "./base/Executer";
import { IExecContext } from "../types/IExecContext";
import { IUserChecker } from "../types/IUserChecker";
import { IUserCheckerMetadataArgs } from "./args/IUserCheckerMetadataArgs";

/**
 * Middleware metadata and executer.
 *
 * @export
 * @class UserCheckerMetadata
 */
export class UserCheckerMetadata extends Executor {
    /**
     * Target: Typescript class.
     *
     * @type {Function}
     * @memberof UserCheckerMetadata
     */
    private _target: Function;

    /**
     * Middleware parameters.
     *
     * @type {ParamMetadata[]}
     * @memberof UserCheckerMetadata
     */
    private _params: ParamMetadata[] = [];

    /**
     * Target: Typescript class.
     *
     * @readonly
     * @type {Function}
     * @memberof UserCheckerMetadata
     */
    public get target(): Function {
        return this._target;
    }

    /**
     * Middleware parameters.
     *
     * @memberof UserCheckerMetadata
     */
    public set params(value: ParamMetadata[]) {
        this._params = value;
    }

    /**
     * Returns the instance of the middleware target.
     *
     * @readonly
     * @type {IUserChecker}
     * @memberof UserCheckerMetadata
     */
    get instance(): IUserChecker {
        return getFromContainer<IUserChecker>(this._target);
    }

    /**
     * Default constructor.
     *
     * @param {IUserCheckerMetadataArgs} args User checker metadata arguments
     * @memberof UserCheckerMetadata
     */
    constructor(args: IUserCheckerMetadataArgs) {
        super();

        this._target = args.target;
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
        const params = this.buildParams(this._params, context);

        if (instance["check"]) {
            return instance.check.apply(instance, params);
        }
    }
}
