import { ICdsMiddleware, Middleware, Req, Jwt } from "../../lib";

@Middleware()
export class HandlerMiddleware implements ICdsMiddleware {
    public async use(@Req() req: any, @Jwt() jwt: string): Promise<void> {
        console.log("I am a handler middleware");
        console.log(`My jwt is ${jwt ? jwt : "empty"}`);
    }
}
