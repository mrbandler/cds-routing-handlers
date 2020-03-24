import { IRejectMetadataArgs } from "./args/IRejectMetadataArgs";

/**
 * Rejection metadata.
 *
 * @export
 * @class RejectMetadata
 */
export class RejectMetadata {
    /**
     * Target: JS function of the handler class method.
     *
     * @type {Function}
     * @memberof IRejectMetadataArgs
     */
    private _target: Function;

    /**
     * Method name.
     *
     * @type {string}
     * @memberof IRejectMetadataArgs
     */
    private _method: string;

    /**
     * HTTP Response code.
     *
     * @type {number}
     * @memberof IRejectMetadataArgs
     */
    private _code: number;

    /**
     * Response message.
     *
     * @type {string}
     * @memberof IRejectMetadataArgs
     */
    private _message: string;

    /**
     * Flag, whether the JS error message should be appended.
     *
     * @type {boolean}
     * @memberof RejectMetadata
     */
    private _appendErrorMessage: boolean;

    /**
     * HTTP Response code.
     *
     * @readonly
     * @type {number}
     * @memberof RejectMetadata
     */
    public get code(): number {
        return this._code;
    }

    /**
     * Response message.
     *
     * @readonly
     * @type {string}
     * @memberof RejectMetadata
     */
    public get message(): string {
        return this._message;
    }

    /**
     * Flag, whether the JS error message should be appended.
     *
     * @readonly
     * @type {boolean}
     * @memberof RejectMetadata
     */
    public get appendErrorMessage(): boolean {
        return this._appendErrorMessage;
    }

    /**
     * Default constructor.
     *
     * @param {IRejectMetadataArgs} args Metadata arguments
     * @memberof RejectMetadata
     */
    constructor(args: IRejectMetadataArgs) {
        this._target = args.target;
        this._method = args.method;
        this._code = args.code;
        this._message = args.message;
        this._appendErrorMessage = args.appendErrorMessage;
    }
}
