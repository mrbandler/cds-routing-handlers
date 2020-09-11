/**
 * Middleware runtime.
 *
 * @export
 * @enum {number}
 */
export enum MiddlewareRuntime {
    Normal,
    /**
     * @deprecated: not available since @sap/cds > 3.31.2
     */
    BeforeDefaults,
    /**
     * @deprecated: not available since @sap/cds > 3.31.2
     */
    AfterDefaults,
}
