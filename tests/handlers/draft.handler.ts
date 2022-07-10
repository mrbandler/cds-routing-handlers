import { Handler, Req, OnNew, OnReject, AfterRead, Entities, Next, Data, Use, User, AfterNew } from "../../lib";
import { HandlerMiddleware } from "../middlewares/handler.middleware";
import { IUser } from "../IUser";

interface IData {
    Id: string;
    Name: string;
    Message: string;
}

@Handler("DraftEnabledEntity")
@Use(HandlerMiddleware)
export class DraftHandler {
    @OnNew()
    @OnReject(500, "Nope", true)
    public async new(@Req() req: any, @Data() data: IData, @User() user: IUser): Promise<IData[]> {
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

    @AfterNew()
    public async afterNew(@Req() req: any, @Entities() entities: IData[]): Promise<IData[]> {
        return entities.map((e) => {
            e.Message = "After read was here!";
            return e;
        });
    }
}
