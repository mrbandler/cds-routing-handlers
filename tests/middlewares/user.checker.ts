import { UserChecker, IUserChecker, Srv } from "../../lib";
import { IUser } from "../IUser";

@UserChecker()
export class UserCheckerImpl implements IUserChecker {
    public check(@Srv() srv: any): IUser {
        console.log(srv);

        return {
            username: "mrbandler",
            service: "",
        };
    }
}
