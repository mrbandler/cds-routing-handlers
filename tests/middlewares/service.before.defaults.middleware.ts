import { Middleware, ICdsMiddleware, Srv, MiddlewareRuntime } from "../../lib";

@Middleware({ global: true, priority: 1, runtime: MiddlewareRuntime.BeforeDefaults })
export class ServiceBeforeDefaultsMiddleware implements ICdsMiddleware {
    public async use(@Srv() srv: any): Promise<void> {
        console.log("I am global middleware prio 1 (before defaults)");
    }
}
