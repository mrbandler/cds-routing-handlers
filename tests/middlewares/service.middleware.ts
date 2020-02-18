import { IMiddleware, Srv } from "../../lib";

export class ServiceMiddleware implements IMiddleware {
    use(@Srv() srv: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
