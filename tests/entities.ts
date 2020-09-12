export namespace TestService {
    export enum ActionGreeter {
        name = "greeter",
        paramTitle = "title",
        paramName = "name",
    }

    export interface IActionGreeterParams {
        title: string;
        name: string;
    }

    export enum FuncHello {
        name = "hello",
        paramName = "name",
    }

    export interface IFuncHelloParams {
        name: string;
    }

    export interface IGreeter {
        Id: string;
        Name: string;
        Message: string;
    }

    export enum Entity {
        Greeter = "TestService.Greeter",
    }

    export enum SanitizedEntity {
        Greeter = "Greeter",
    }
}

export enum Entity {}

export enum SanitizedEntity {}
