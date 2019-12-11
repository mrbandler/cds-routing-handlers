import "reflect-metadata";
import express from "express";
import * as handler from "../lib/index";
const cds = require("@sap/cds");

class Main {
    public static run(): void {
        const server = express();

        const hdl = handler.createCombinedHandler([__dirname + "/handlers/**/*.js"]);
        cds.serve(__dirname + "/gen/csn.json")
            .at("odata")
            .in(server)
            .with((srv: any) => {
                hdl(srv);
            })
            // .with((srv: any) => {
            //     srv.on("hello", (req: any) => {
            //         console.log(req.data.name);
            //     });
            // })
            .catch((error: any) => {
                console.log("Starup error: ", error);
                process.exit(1);
            });

        const port = process.env.PORT || 3001;
        server.listen(port, async () => {
            console.log("Server running on port %d", port);
        });
    }
}

Main.run();
