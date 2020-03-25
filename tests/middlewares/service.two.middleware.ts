import { Middleware, ICdsMiddleware, Srv, MiddlewareRuntime } from "../../lib";

@Middleware({ global: true, priority: 2, runtime: MiddlewareRuntime.AfterDefaults })
export class ServiceTwoMiddleware implements ICdsMiddleware {
    public async use(@Srv() srv: any): Promise<void> {
        console.log("I am global middleware prio 2 (after defaults)");
    }
}
