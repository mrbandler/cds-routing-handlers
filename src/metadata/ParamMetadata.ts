import { ParamType } from "../types/ParamType";
import { IParamMetadataArgs } from "./args/IParamMetadataArgs";
import { throws } from "assert";

/**
 * Parameter metadata.
 *
 * @export
 * @class ParamMetadata
 */
export class ParamMetadata {
    /**
     * Class object.
     *
     * @type {*}
     * @memberof ParamMetadata
     */
    private _object: any;

    /**
     * Target: JS function that represents the Typescript class.
     *
     * @type {Function}
     * @memberof ParamMetadata
     */
    private _target: Function;

    /**
     * Method the parameter belongs to.
     *
     * @type {string}
     * @memberof ParamMetadata
     */
    private _method: string;

    /**
     * Index of the parameter.
     *
     * @type {number}
     * @memberof ParamMetadata
     */
    private _index: number;

    /**
     * Parameter type.
     *
     * @type {ParamType}
     * @memberof ParamMetadata
     */
    private _type: ParamType;

    /**
     * Name of the parameter.
     *
     * @type {string}
     * @memberof ParamMetadata
     */
    private _name?: string;

    /**
     * Target type of the parameter.
     *
     * @type {*}
     * @memberof ParamMetadata
     */
    private _targetType?: any;

    /**
     * Name of the target class.
     *
     * @type {string}
     * @memberof ParamMetadata
     */
    private _targetName: string = "";

    /**
     * Flag, whether the target is a object.
     *
     * @type {boolean}
     * @memberof ParamMetadata
     */
    private _isTargetObject: boolean = false;

    /**
     * Parameter index.
     *
     * @readonly
     * @type {number}
     * @memberof ParamMetadata
     */
    public get index(): number {
        return this._index;
    }

    /**
     * Parameter type.
     *
     * @readonly
     * @type {ParamType}
     * @memberof ParamMetadata
     */
    public get type(): ParamType {
        return this._type;
    }

    /**
     * Name of the parameter.
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof ParamMetadata
     */
    public get name(): string | undefined {
        return this._name;
    }

    /**
     * Default constructor.
     *
     * @param {ActionMetadata} actionMetadata Action metadata
     * @param {IParamMetadataArgs} args Parameter arguments
     * @memberof ParamMetadata
     */
    constructor(args: IParamMetadataArgs) {
        this._target = args.object.constructor;
        this._method = args.method;
        this._index = args.index;
        this._type = args.type;
        this._name = args.name;

        const paramTypes = (Reflect as any).getMetadata("design:paramtypes", args.object, args.method);
        if (paramTypes !== undefined) {
            this._targetType = paramTypes[args.index];
        }

        if (this._targetType) {
            if (this._targetType instanceof Function && this._targetType.name) {
                this._targetName = this._targetType.name.toLowerCase();
            } else if (typeof this._targetType === "string") {
                this._targetName = this._targetType.toLowerCase();
            }

            this._isTargetObject = this._targetType instanceof Function || this._targetType.toLowerCase() === "object";
        }
    }
}
