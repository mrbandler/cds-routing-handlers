import { UserChecker, IUserChecker, Srv } from "../../lib";
import { IUser } from "../IUser";

@UserChecker()
export class UserCheckerImpl implements IUserChecker {
    public async check(@Srv() srv: any): Promise<IUser> {
        console.log(srv);

        return {
            username: "mrbandler",
            service: "",
        };
    }
}
