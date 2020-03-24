import { Handler, Req, OnRead, OnReject, AfterRead, Entities, Next, Data, Use } from "../../lib";
import { HandlerMiddleware } from "../middlewares/handler.middleware";

interface IData {
    Id: string;
    Name: string;
    Message: string;
}

@Handler("Greeter")
@Use(HandlerMiddleware)
export class GreeterHandler {
    @OnRead()
    @OnReject(500, "Nope", true)
    public async read(@Req() req: any, @Next() next: Function, @Data() data: IData): Promise<IData[]> {
        console.log(next);
        console.log(data);

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

    @AfterRead()
    public async afterRead(@Req() req: any, @Entities() entities: IData[]): Promise<IData[]> {
        return entities.map(e => {
            e.Message = "After read was here!";
            return e;
        });
    }
}
