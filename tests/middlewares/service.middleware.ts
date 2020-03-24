import { Middleware, ICdsMiddleware, Srv } from "../../lib";

@Middleware({ global: true, priority: 1 })
export class ServiceMiddleware implements ICdsMiddleware {
    public async use(@Srv() srv: any): Promise<void> {
        console.log("I am global middleware prio 1");
    }
}
