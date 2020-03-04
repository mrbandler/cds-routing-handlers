import ActionMetadata from "./ActionMetadata";
import { ParamType } from "../types/ParamType";
import IParamMetadataArgs from "./args/IParamMetadataArgs";

/**
 * Parameter metadata.
 *
 * @export
 * @class ParamMetadata
 */
export default class ParamMetadata {
    /**
     * Class object.
     *
     * @type {*}
     * @memberof ParamMetadata
     */
    object: any;

    /**
     * Target: JS function that represents the Typescript class.
     *
     * @type {Function}
     * @memberof ParamMetadata
     */
    target: Function;

    /**
     * Method the parameter belongs to.
     *
     * @type {string}
     * @memberof ParamMetadata
     */
    method: string;

    /**
     * Index of the parameter.
     *
     * @type {number}
     * @memberof ParamMetadata
     */
    index: number;

    /**
     *
     *
     * @type {ParamType}
     * @memberof ParamMetadata
     */
    type: ParamType;

    /**
     *
     *
     * @type {string}
     * @memberof ParamMetadata
     */
    name?: string;

    /**
     *
     *
     * @type {*}
     * @memberof ParamMetadata
     */
    targetType?: any;

    /**
     *
     *
     * @type {string}
     * @memberof ParamMetadata
     */
    targetName: string = "";

    /**
     *
     *
     * @type {boolean}
     * @memberof ParamMetadata
     */
    isTargetObject: boolean = false;

    /**
     * Default constructor.
     * @param {ActionMetadata} actionMetadata Action metadata.
     * @param {IParamMetadataArgs} args Paramter arguments.
     * @memberof ParamMetadata
     */
    constructor(args: IParamMetadataArgs) {
        this.target = args.object.constructor;
        this.method = args.method;
        this.index = args.index;
        this.type = args.type;
        this.name = args.name;

        const paramTypes = (Reflect as any).getMetadata("design:paramtypes", args.object, args.method);
        if (paramTypes !== "undefined") {
            this.targetType = paramTypes[args.index];
        }

        if (this.targetType) {
            if (this.targetType instanceof Function && this.targetType.name) {
                this.targetName = this.targetType.name.toLowerCase();
            } else if (typeof this.targetType === "string") {
                this.targetName = this.targetType.toLowerCase();
            }

            this.isTargetObject = this.targetType instanceof Function || this.targetType.toLowerCase() === "object";
        }
    }
}
