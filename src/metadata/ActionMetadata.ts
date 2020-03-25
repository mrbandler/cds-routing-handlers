import { IActionMetadataArgs } from "./args/IActionMetadataArgs";
import { HandlerMetadata } from "./HandlerMetadata";
import { RejectMetadata } from "./RejectMetadata";
import { ParamMetadata } from "./ParamMetadata";
import { HandlerType } from "../types/HandlerType";
import { ODataOperation } from "../types/ODataOperation";
import { Executor } from "./base/Executer";
import { IExecContext } from "../types/IExecContext";
import { UserCheckerMetadata } from "./UserCheckerMetadata";

/**
 * Action metadata and executer.
 *
 * @export
 * @class ActionMetadata
 */
export class ActionMetadata extends Executor {
    /**
     * Parent handler metadata.
     *
     * @type {HandlerMetadata}
     * @memberof ActionMetadata
     */
    private _handlerMetadata: HandlerMetadata;

    /**
     * Target: Method on the handler class.
     *
     * @type {Function}
     * @memberof ActionMetadata
     */
    private _target: Function;

    /**
     * Action method on the handler class.
     *
     * @type {string}
     * @memberof ActionMetadata
     */
    private _method: string;

    /**
     * Entity on which the action acts.
     *
     * @type {string}
     * @memberof ActionMetadata
     */
    private _entity?: string;

    /**
     * Handler type.
     *
     * @type {HandlerType}
     * @memberof ActionMetadata
     */
    private _handler: HandlerType;

    /**
     * Operation type.
     *
     * @type {ODataOperation}
     * @memberof ActionMetadata
     */
    private _operation: ODataOperation;

    /**
     * Function import name.
     *
     * @type {string}
     * @memberof ActionMetadata
     */
    private _functionImportName?: string;

    /**
     * Reject metadata.
     *
     * @type {RejectMetadata}
     * @memberof ActionMetadata
     */
    private _reject?: RejectMetadata;

    /**
     * Parameter metadata.
     *
     * @type {ParamMetadata[]}
     * @memberof ActionMetadata
     */
    private _params: ParamMetadata[] = [];

    /**
     * User checker.
     *
     * @private
     * @type {UserCheckerMetadata}
     * @memberof ActionMetadata
     */
    private _userChecker?: UserCheckerMetadata;

    /**
     * Target: Method on the handler class.
     *
     * @readonly
     * @type {Function}
     * @memberof ActionMetadata
     */
    public get target(): Function {
        return this._target;
    }

    /**
     * Action method on the handler class.
     *
     * @readonly
     * @type {string}
     * @memberof ActionMetadata
     */
    public get method(): string {
        return this._method;
    }

    /**
     * Handler type.
     *
     * @readonly
     * @type {HandlerType}
     * @memberof ActionMetadata
     */
    public get handler(): HandlerType {
        return this._handler;
    }

    /**
     * Operation type.
     *
     * @readonly
     * @type {ODataOperation}
     * @memberof ActionMetadata
     */
    public get operation(): ODataOperation {
        return this._operation;
    }

    /**
     * Entity on which the action acts.
     *
     * @readonly
     * @type {string}
     * @memberof ActionMetadata
     */
    public get entity(): string | undefined {
        return this._entity;
    }

    /**
     * Function import name.
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof ActionMetadata
     */
    public get functionImportName(): string | undefined {
        return this._functionImportName;
    }

    /**
     * Reject metadata.
     *
     * @memberof ActionMetadata
     */
    public set reject(value: RejectMetadata | undefined) {
        this._reject = value;
    }

    /**
     * Parameter metadata.
     *
     * @memberof ActionMetadata
     */
    public set params(value: ParamMetadata[]) {
        this._params = value;
    }

    /**
     * User checker.
     *
     * @memberof ActionMetadata
     */
    public set userChecker(value: UserCheckerMetadata | undefined) {
        this._userChecker = value;
    }

    /**
     * Default constructor.
     *
     * @param {HandlerMetadata} handlerMetadata Handler metadata
     * @param {IActionMetadataArgs} args Action metadata arguments
     * @memberof ActionMetadata
     */
    constructor(handlerMetadata: HandlerMetadata, args: IActionMetadataArgs) {
        super();

        this._handlerMetadata = handlerMetadata;
        this._entity = handlerMetadata.entity;
        this._target = args.target;
        this._method = args.method;
        this._handler = args.handler;
        this._operation = args.operation;
        this._functionImportName = args.functionImportName;
    }

    /**
     * Executs the action.
     *
     * @protected
     * @param {IExecContext} context Execution context
     * @returns {*} Execution result
     * @memberof ActionMetadata
     */
    public exec(context: IExecContext): any {
        let result = undefined;

        const instance = this._handlerMetadata.instance;
        const params = this.buildParams(this._params, context, this._userChecker);

        if (this._reject) {
            try {
                result = instance[this._method].apply(instance, params);
            } catch (error) {
                if (this._reject.appendErrorMessage) {
                    context.req.reject(this._reject.code, `${this._reject.message}: ${error.message}`);
                } else {
                    context.req.reject(this._reject.code, this._reject.message);
                }

                return;
            }
        } else {
            result = instance[this._method].apply(instance, params);
        }

        return result;
    }
}
