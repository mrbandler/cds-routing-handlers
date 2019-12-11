import { Handler, Func, Action, Param, ParamObj, Req, Srv, Jwt } from "../../lib";

interface IParams {
    title: string;
    name: string;
}

@Handler()
export class ServiceHandler {
    @Func("hello")
    public async hello(@Req() req: any, @Param("name") name: string, @Jwt() jwt: string): Promise<string> {
        console.log(req);
        return "Hello, " + name;
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
