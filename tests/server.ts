import "reflect-metadata";
import * as handler from "../lib/index";
import express from "express";
import { Container } from "typedi";
import { ServiceBeforeDefaultsMiddleware } from "./middlewares/service.before.defaults.middleware";
import { ServiceAfterDefaultsMiddleware } from "./middlewares/service.after.defaults.middleware";
import { HandlerMiddleware } from "./middlewares/handler.middleware";
import { UserCheckerImpl } from "./middlewares/user.checker";

const odatav2proxy = require("@sap/cds-odata-v2-adapter-proxy");
const cds = require("@sap/cds");

class Main {
    public static run(): void {
        const server = express();
        const port = process.env.PORT || 3001;
        const genPath = __dirname + "/gen/csn.json";

        handler.useContainer(Container);
        const hdl = handler.createCombinedHandler({
            handler: [__dirname + "/handlers/**/*.js"],
            middlewares: [ServiceBeforeDefaultsMiddleware, ServiceAfterDefaultsMiddleware, HandlerMiddleware],
            userChecker: UserCheckerImpl,
        });
        cds.serve(genPath)
            .at("odata")
            .in(server)
            .with((srv: any) => {
                hdl(srv);
            })
            .catch((error: any) => {
                console.log("Startup error: ", error);
                process.exit(1);
            });

        server.use(
            odatav2proxy({
                port: port,
                path: "v2",
                model: genPath,
                services: {
                    "/odata": "TestService",
                },
            })
        );

        server.listen(port, async () => {
            console.log("Server running on port %d", port);
        });
    }
}

Main.run();
