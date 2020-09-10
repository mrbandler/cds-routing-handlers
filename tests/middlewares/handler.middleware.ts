import { ICdsMiddleware, Middleware } from "../../lib";

@Middleware()
export class HandlerMiddleware implements ICdsMiddleware {
    public async use(...args: any[]): Promise<void> {
        console.log("I am a handler middleware, args: " + JSON.stringify(args));
    }
}
