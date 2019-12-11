import { Handler, Req, OnRead, OnReject } from "../../lib";

@Handler("Greeter")
export class GreeterHandler {
    @OnRead()
    @OnReject(500, "Nope", true)
    public async read(@Req() req: any): Promise<Object[]> {
        return [
            {
                Id: "8HEXDIG-4HEXDIG-4HEXDIG-4HEXDIG-12HEXDIG",
                Name: "Nicola",
                Message: "Nicola Message",
            },
            {
                Id: "8HEXDIG-4HEXDIG-4HEXDIG-4HEXDIG-12HEXDIG",
                Name: "Mario",
                Message: "Mario Message",
            },
            {
                Id: "8HEXDIG-4HEXDIG-4HEXDIG-4HEXDIG-12HEXDIG",
                Name: "Simon",
                Message: "Simon Message",
            },
        ];
    }
}
