import IRejectMetadataArgs from "./args/IRejectMetadataArgs";

/**
 *
 *
 * @export
 * @class RejectMetadata
 */
export default class RejectMetadata {
    /**
     * Target: JS function of the handler class method.
     *
     * @type {Function}
     * @memberof IRejectMetadataArgs
     */
    target: Function;

    /**
     * Method name.
     *
     * @type {string}
     * @memberof IRejectMetadataArgs
     */
    method: string;

    /**
     * HTTP Response code.
     *
     * @type {number}
     * @memberof IRejectMetadataArgs
     */
    code: number;

    /**
     * Response message.
     *
     * @type {string}
     * @memberof IRejectMetadataArgs
     */
    message: string;

    /**
     * Flag, wheter the JS error message should be appended.
     *
     * @type {boolean}
     * @memberof RejectMetadata
     */
    appendErrorMessage: boolean;

    /**
     * Default constructor.
     * @param {IRejectMetadataArgs} args Metadata arguments.
     * @memberof RejectMetadata
     */
    constructor(args: IRejectMetadataArgs) {
        this.target = args.target;
        this.method = args.method;
        this.code = args.code;
        this.message = args.message;
        this.appendErrorMessage = args.appendErrorMessage;
    }
}
