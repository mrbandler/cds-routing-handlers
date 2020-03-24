import { Middleware, ICdsMiddleware, Srv } from "../../lib";

@Middleware({ global: true, priority: 2 })
export class ServiceTwoMiddleware implements ICdsMiddleware {
    public async use(@Srv() srv: any): Promise<void> {
        console.log("I am global middleware prio 2");
    }
}
