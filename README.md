# CDS Routing-Handlers

[![npm version](https://badge.fury.io/js/cds-routing-handlers.svg)](https://badge.fury.io/js/cds-routing-handlers) [![pipeline status](https://gitlab.com/mrbandler/cds-routing-handlers/badges/master/pipeline.svg)](https://gitlab.com/mrbandler/cds-routing-handlers/commits/master) [![GitHub License](https://img.shields.io/github/license/mrbandler/cds-routing-handlers)](https://github.com/mrbandler/cds-routing-handlers/blob/master/LICENSE)

**Package to route and implement CDS handlers via a class based system in Typescript.**

## Table of Content

1. [Installation](#1-installation) 💻
2. [Usage](#2-usage) ⌨️
3. [Decorator Reference](#3-decorator-reference) 📋
4. [Example](#4-example) 🧷
5. [Bugs and Features](#5-bugs-and-features) 🐞💡
6. [License](#6-license) 📃

## 1. Installation

```bash
$ npm install cds-routing-handlers
```

OR

```bash
$ yarn add cds-routing-handlers
```

## 2. Usage

**Before:**

```javascript
const express = require("express");

function registerHandlers(srv) {
    srv.on("READ", "Entity", async () => {
        // Handle the read here...
    });
}

const server = express();
cds.serve("./gen/")
    .at("odata")
    .in(server)
    .with(registerHandlers);
```

**With CDS Routing-Handlers:**

```typescript
// ./handlers/entity.handler.ts

import { Handler, OnRead } from "cds-routing-handlers";

@Handler("Entity")
export class EntityHandler {
    @OnRead()
    public async read(@Srv() srv: any, @Req() req: any): Promise<void> {
        // Handle the read here...
    }
}
```

```typescript
// ./server.ts

import express from "express";
import { createCombinedHandler } from "cds-routing-handlers";

const server = express();

// Either:
cds.serve("./gen/")
    .at("odata")
    .in(server)
    .with(createCombinedHandler([__dirname + "/handlers/**/*.js"]));

// OR
import { EntityHandler } from "./handlers/entity.handler.ts";

cds.serve("./gen/")
    .at("odata")
    .in(server)
    .with(createCombinedHandler([EntityHandler]));
```

### Depencency Injection Support

cds-routing-handlers can be used in conjunction with [typedi](https://github.com/typestack/typedi).

```typescript
import { useContainer } from "cds-routing-handlers";
import { Container } from "typedi";

useContainer(Container);
```

That's it now you can inject service into your handler classes.

```typescript
import { Handler, Func, Param } from "cds-routing-handlers";
import { Service, Inject } from "typedi";

@Service()
export class GreeterService {
    public greet(name: string): string {
        return "Hello, " + name;
    }
}

@Handler()
export class GreeterHandler {
    @Inject()
    private greeterService: GreeterService;

    @Func("hello")
    public async hello(@Param("name") name: string): Promise<string> {
        return this.greeterService.greet(name);
    }
}
```

### Complete API

```typescript
import { Handler } from "cds-routing-handlers";
import { BeforeCreate, OnCreate, AfterCreate } from "cds-routing-handlers";
import { BeforeRead, OnRead, AfterRead } from "cds-routing-handlers";
import { BeforeUpdate, OnUpdate, AfterUpdate } from "cds-routing-handlers";
import { BeforeDelete, OnDelete, AfterDelete } from "cds-routing-handlers";
import { Func, Action } from "cds-routing-handlers";
import { Req, Srv, Param, ParamObj, Jwt } from "cds-routing-handlers";

interface IFoobar {
    Id: string;
    Foo: string;
    Bar: number;
}

/**
 *  Basic OData operations.
 */
@Handler("Foobar")
export class FooBarHandler {
    /**
     *  CREATE handlers.
     */
    @BeforeCreate()
    public async beforeCreate(): Promise<IFoobar> {
        // Handle the before create here...
    }

    @OnCreate()
    public async onCreate(): Promise<IFoobar> {
        // Handle the create here...
    }

    @AfterCreate()
    public async afterCreate(): Promise<IFoobar> {
        // Handle the after create here...
    }

    /**
     *  READ handlers.
     */
    @BeforeRead()
    public async beforeRead(): Promise<IFoobar> {
        // Handle the before read here...
    }

    @OnRead()
    public async onRead(): Promise<IFoobar> {
        // Handle the read here...
    }

    @AfterRead()
    public async afterRead(): Promise<IFoobar> {
        // Handle the after read here...
    }

    /**
     *  UPDATE handlers.
     */
    @BeforeUpdate()
    public async beforeUpdate(): Promise<IFoobar> {
        // Handle the before update here...
    }

    @OnUpdate()
    public async onUpdate(): Promise<IFoobar> {
        // Handle the update here...
    }

    @AfterUpdate()
    public async afterUpdate(): Promise<IFoobar> {
        // Handle the after update here...
    }

    /**
     *  DELETE handlers.
     */
    @BeforeDelete()
    public async beforeDelete(): Promise<void> {
        // Handle the before delete here...
    }

    @OnDelete()
    public async onDelete(): Promise<void> {
        // Handle the delete here...
    }

    @AfterDelete()
    public async afterDelete(): Promise<void> {
        // Handle the after delete here...
    }
}

/**
 *  Root service handler.
 */
@Handler("Foobar")
export class FooBarRejectHandler {
    @OnRead()
    @OnReject(500, "Foobar not found")
    public async onRead(): Promise<IFoobar> {
        // When something fails in here, a error object like defined above will be returned.
        /**
         * {
         *    "error": {
         *      "code": 500,
         *      "message": "Foobar not found"
         *    }
         * }
         *
         */
    }

    @OnRead()
    @OnReject(500, "Foobar not found", true)
    public async onRead(): Promise<IFoobar> {
        // When something fails in here, a error object like defined above will be returned.
        // This time the JS error message is appended to the message.
        /**
         * {
         *    "error": {
         *      "code": 500,
         *      "message": "Foobar not found: JS Error Message"
         *    }
         * }
         *
         */
    }
}

/**
 *  Error handling and rejection operations.
 */
@Handler()
export class FooBarRejectHandler {
    /**
     *  Function Import.
     *
     *  CDS:
     *      function foo(bar: String) returns String;
     *
     */
    @Func("foo")
    public async foo(@Param("bar") bar: string): Promise<string> {
        return "Foo, " + bar;
    }

    /**
     *  Action Import.
     *
     *  CDS:
     *      action bar(foo: String, noop: String);
     *
     */
    @Action("bar")
    public async bar(@Param("foo") foo: string, @Param("noop") noop: string): Promise<void> {
        console.log("Foo Param", foo);
        console.log("Noop Param", noop);
    }
}

interface IDoItParams {
    id: string;
    do: string;
    times: number;
}

/**
 *  Error handling and rejection operations.
 */
@Handler()
export class ParamExampleHandler {
    /**
     *  Function Import.
     *
     *  CDS:
     *      function hello(title: String, name: String) returns String;
     *
     */
    @Func("hello")
    public async foo(@Param("title") title: string, @Param("name") name: string): Promise<string> {
        return `Hello, ${title} ${name}`;
    }

    /**
     *  Function Import.
     *
     *  CDS:
     *      action doIt(id: String, do: String, tunes: number);
     *
     */
    @Action("doIt")
    public async doIt(@ParamObj() params: IDoItParams): Promise<string> {
        console.log(params); // => { id: "12345", do: "over", "times": 9000 }
    }

    /**
     * Additionaly you can inject the service aswell as the request object.
     */
    @OnRead()
    public async read(@Srv() srv: any, @Req() req: any): Promise<string> {
        // Do something with srv and req.
    }

    /**
     * If the incoming request contains a JWT token you can inject that aswell.
     */
    @OnRead()
    public async read(@Jwt() jwt: string): Promise<string> {
        // Do something with srv and req.
    }

    /**
     * After handlers a bit if a special case, they always give you a array of entities that was worked on prior to the after handler.
     *
     * This list can be injected via the @Entities decorator.
     */
    @AfterRead()
    public async afterRead(@Entities() entities: IDoItParams[]): Promise<IDoItParams[]> {
        return entities.map(e => {
            e.id = "After handler was here";
            return e;
        });
    }
}
```

## 3. Decorator Reference

### Handler Decorators

| Signature                   | Example                                | Description                                                                                                                                                                                                                          |
| --------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@Handler(entity?: string)` | `@Handler("Books") class BooksHandler` | Class that is marked with this decorator is registered as a handler and its annotated methods are registered as actions. The entity paramter is used to differentiate and register the correct actions for the corresponding entity. |

### Handler Action Decorators

In this table we assume that all action handlers a within a `@Handler` decorated class with the entity `Books`.

| Signature                                                                       | Example                                                    | Description                                                                                                                                                       | @sap/cds analogue                                                                           |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `@BeforeCreate()`                                                               | `@BeforeCreate() async beforeCreate()`                     | Methods marked with this decorator will register a request made with POST HTTP Method to the specified entity, before it will be handled by the actual handler.   | `srv.before("CREATE", "Books", async (req) => ...)`                                         |
| `@OnCreate()`                                                                   | `@OnCreate() async onCreate()`                             | Methods marked with this decorator will register a request made with POST HTTP Method to the specified entity.                                                    | `srv.on("CREATE", "Books", async (req) => ...)`                                             |
| `@AfterCreate()`                                                                | `@AfterCreate() async afterCreate()`                       | Methods marked with this decorator will register a request made with POST HTTP Method to the specified entity, after it was handled by the actual handler.        | `srv.after("CREATE", "Books", async (books, req) => ...)`                                   |
| `@BeforeRead()`                                                                 | `@BeforeRead() async beforeRead()`                         | Methods marked with this decorator will register a request made with GET HTTP Method to the specified entity, before it will be handled by the actual handler.    | `srv.before("READ", "Books", async (req) => ...)`                                           |
| `@OnRead()`                                                                     | `@OnRead() async onRead()`                                 | Methods marked with this decorator will register a request made with GET HTTP Method to the specified entity.                                                     | `srv.on("READ", "Books", async (req) => ...)`                                               |
| `@AfterRead()`                                                                  | `@AfterRead() async afterRead()`                           | Methods marked with this decorator will register a request made with GET HTTP Method to the specified entity, after it was handled by the actual handler.         | `srv.after("READ", "Books", async (books, req) => ...)`                                     |
| `@BeforeUpdate()`                                                               | `@BeforeUpdate() async beforeUpdate()`                     | Methods marked with this decorator will register a request made with PUT HTTP Method to the specified entity, before it will be handled by the actual handler.    | `srv.before("UPDATE", "Books", async (req) => ...)`                                         |
| `@OnUpdate()`                                                                   | `@OnUpdate() async onUpdate()`                             | Methods marked with this decorator will register a request made with PUT HTTP Method to the specified entity.                                                     | `srv.on("UPDATE", "Books", async (req) => ...)`                                             |
| `@AfterUpdate()`                                                                | `@AfterUpdate() async afterUpdate()`                       | Methods marked with this decorator will register a request made with DELETE HTTP Method to the specified entity, after it was handled by the actual handler.      | `srv.after("UPDATE", "Books", async (books, req) => ...)`                                   |
| `@BeforeDelete()`                                                               | `@BeforeDelete() async beforeDelete()`                     | Methods marked with this decorator will register a request made with DELETE HTTP Method to the specified entity, before it will be handled by the actual handler. | `srv.before("DELETE", "Books", async (req) => ...)`                                         |
| `@OnDelete()`                                                                   | `@OnDelete() async onDelete()`                             | Methods marked with this decorator will register a request made with DELETE HTTP Method to the specified entity.                                                  | `srv.on("DELETE", "Books", async (req) => ...)`                                             |
| `@AfterDelete()`                                                                | `@AfterDelete() async afterDelete()`                       | Methods marked with this decorator will register a request made with DELETE HTTP Method to the specified entity, after it was handled by the actual handler.      | `srv.after("DELETE", "Books", async (books, req) => ...)`                                   |
| `@Func(name: string)`                                                           | `@Func("doIt") async doIt()`                               | Methods marked with this decorator will register a request made with either GET or POST HTTP. The payload can either be given by path parameters or body.         | `srv.on("doIt", "Books", async (req) => ...)` OR `srv.on("doIt", async (req) => ...)`       |
| `@Action(name: string)`                                                         | `@Action("doItNow") async doItNow()`                       | Methods marked with this decorator will register a request made with either GET or POST HTTP. The payload can either be given by path parameters or body.         | `srv.on("doItNow", "Books", async (req) => ...)` OR `srv.on("doItNow", async (req) => ...)` |
| `@OnReject(code: number, message: string, appendErrorMessage: boolean = false)` | `@OnReject(500, "Nope, that didn't work") async handler()` | Methods marked with this decorator will return a error object when a handler fails.                                                                               | `srv.on("READ", "Books", async (req) => {req.reject(500, "Nope, that didn't work")})`       |

### Method Parameter Decorators

| Signature              | Example                                     | Description                                                                                                                                                                               | @sap/cds analogue                                                                       |
| ---------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `@Req()`               | `onRead(@Req() req: any)`                   | Injects the request object.                                                                                                                                                               | `srv.on("READ", "Books", async (req) => ...)`                                           |
| `@Srv()`               | `onRead(@Srv() srv: any)`                   | Injects the service object.                                                                                                                                                               | `srv.on("READ", "Books", async (req) => { // Acess srv here })`                         |
| `@Param(name: string)` | `doIt(@Param("times") times: number)`       | Injects a Function/Action Import parameter.                                                                                                                                               | `srv.on("READ", "Books", async (req) => { let times = req.data["times"] as number; })`  |
| `@ParamObj()`          | `doIt(@ParamObj() doItParams: IDoItParams)` | Injects a Function/Action Import parameter object.                                                                                                                                        | `srv.on("READ", "Books", async (req) => { let doItParams = req.data as IDoItParams; })` |
| `@Entities()`          | `afterRead(@Entities() entities: IBook[])`  | Injects entities from a previous handler on `@After*` handlers.                                                                                                                           | `srv.after("READ", "Books", async (books, req) => ...)`                                 |
| `@Jwt()`               | `onRead(@Jwt() jwt: string)`                | Injects the JWT token, when found on incoming request.                                                                                                                                    | `N/A`                                                                                   |
| `@Data()`              | `onRead(@Data() book: IBook)`               | Injects the data object from a incoming request. It's actually the same as `@ParamObj()` with a different identifier to differentiate between Function/Action imports and other handlers. | `srv.on("READ", "Books", async(req) => { const book = req.data as I Book})`             |
| `@Next()`              | `onRead(@Next() next: Function)`            | Injects the next handler function for flow control with multiple handlers.                                                                                                                | `srv.on("READ", "Books", async(req, next) => ... )`                                     |

## 4. Example

For a complete example checkout the `./test` directory which contains the project I am testing with.

Additionally you can use my cds-routing-handler [Postman](https://www.getpostman.com/) collection which contains definitions for every endpoint from the project.

## 5. Bugs and Features

Please open a issue when you encounter any bugs 🐞 or if you have an idea for a additional feature 💡.

---

## 6. License

MIT License

Copyright (c) 2019 mrbandler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
