import { Handler, Func, Action, Param, ParamObj, Req, Srv, Jwt } from "../../lib";
import { GreeterService } from "../services/greeter.service";
import { Inject } from "typedi";

interface IParams {
    title: string;
    name: string;
}

@Handler()
export class ServiceHandler {
    @Inject()
    private greeterService!: GreeterService;

    @Func("hello")
    public async hello(@Req() req: any, @Param("name") name: string, @Jwt() jwt: string): Promise<string> {
        console.log(req);
        return await this.greeterService.greet(name);
    }

    @Action("greeter")
    public async greeter(
        @Req() req: any,
        @Srv() srv: any,
        @Param("title") title: string,
        @Param("name") name: string,
        @ParamObj() params: IParams
    ): Promise<void> {
        console.log(req);
        console.log(srv);
        console.log(title, name);
        console.log(params);
    }
}
