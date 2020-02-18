import ParamMetadata from "../ParamMetadata";
import { IExecContext } from "../../types/IExecContext";
import { ParamType } from "../../types/ParamType";

/**
 * Abstract executer class.
 *
 * Contains utils to build the necessary paramter list.
 *
 * @export
 * @abstract
 * @class Executer
 */
export abstract class Executer {
    /**
     * Abstract exec method, to be implemented in the child class.
     *
     * @protected
     * @abstract
     * @param {IExecContext} context Execution context to act on
     * @returns {*} Result
     * @memberof Executer
     */
    public abstract exec(context: IExecContext): any;

    /**
     * Builds a paramter list out of all definied parameter decorators.
     *
     * @protected
     * @param {ParamMetadata[]} params Parameter metadata to build the list for
     * @param {IExecContext} context Execution context
     * @returns
     * @memberof Executer
     */
    protected buildParams(params: ParamMetadata[], context: IExecContext) {
        const sortedParams = params.sort((a, b) => {
            if (a.index > b.index) return 1;
            if (b.index > a.index) return -1;

            return 0;
        });

        return sortedParams.map(param => {
            switch (param.type) {
                case ParamType.Srv:
                    return context.srv;
                case ParamType.Req:
                    return context.req;
                case ParamType.Data:
                    return context.req.data;
                case ParamType.ParamObj:
                    return context.req.data;
                case ParamType.Param:
                    return this.buildParam(param, context.req);
                case ParamType.Jwt:
                    return context.req.attr.token || "";
                case ParamType.Entities:
                    return context.e;
                case ParamType.Next:
                    return context.next;
            }
        });
    }

    /**
     * Reads a parameter from the request data object.
     *
     * @protected
     * @param {ParamMetadata} param Parameter to read from the object
     * @param {*} req Incoming CDS request
     * @returns {*} Builds parameter
     * @memberof Executer
     */
    protected buildParam(param: ParamMetadata, req: any): any {
        let result = undefined;

        if (param.name) {
            result = req.data[param.name];
        }

        return result;
    }
}
