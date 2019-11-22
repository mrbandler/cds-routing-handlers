# CDS Routing-Handlers

[![npm version](https://badge.fury.io/js/cds-routing-handlers.svg)](https://badge.fury.io/js/cds-routing-handlers) [![pipeline status](https://gitlab.com/mrbandler/cds-routing-handlers/badges/master/pipeline.svg)](https://gitlab.com/mrbandler/cds-routing-handlers/commits/master) [![GitHub License](https://img.shields.io/github/license/mrbandler/cds-routing-handlers)](https://github.com/mrbandler/cds-routing-handlers/blob/master/LICENSE)

**Package to route and implement CDS handlers via a class based system in Typescript.**

## Table of Content

1. [Installation](#1-installation) 💻
2. [Usage](#2-usage) ⌨️
3. [Bugs and Features](#3-bugs-and-features) 🐞💡
4. [License](#4-license) 📃

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
    public async read(srv: any, req: any, next: any): Promise<void> {
        // Handle the read here...
    }
}
```

```typescript
// ./server.ts

import express from "express";
import * as handlers from "cds-routing-handlers";

const server = express();

// Either:
cds.serve("./gen/")
    .at("odata")
    .in(server)
    .with(handlers.createCombinedHandler([__dirname + "/handlers/**/*.js"]));

// OR
import { EntityHandler } from "./handlers/entity.handler.ts";

cds.serve("./gen/")
    .at("odata")
    .in(server)
    .with(handlers.createCombinedHandler([EntityHandler]));
```

### Complete API

```typescript
import { Handler } from "cds-routing-handlers";
import { BeforeCreate, OnCreate, AfterCreate } from "cds-routing-handlers";
import { BeforeRead, OnRead, AfterRead } from "cds-routing-handlers";
import { BeforeUpdate, OnUpdate, AfterUpdate } from "cds-routing-handlers";
import { BeforeDelete, OnDelete, AfterDelete } from "cds-routing-handlers";

@Handler("Entity")
export class EntityHandler {
    /**
     *  CREATE handlers.
     */
    @BeforeCreate()
    public async beforeCreate(srv: any, req: any, next: any): Promise<void> {
        // Handle the before create here...
    }

    @OnCreate()
    public async onCreate(srv: any, req: any, next: any): Promise<void> {
        // Handle the create here...
    }

    @AfterCreate()
    public async afterCreate(srv: any, req: any, next: any): Promise<void> {
        // Handle the after create here...
    }

    /**
     *  READ handlers.
     */
    @BeforeRead()
    public async beforeRead(srv: any, req: any, next: any): Promise<void> {
        // Handle the before read here...
    }

    @OnRead()
    public async onRead(srv: any, req: any, next: any): Promise<void> {
        // Handle the read here...
    }

    @AfterRead()
    public async afterRead(srv: any, req: any, next: any): Promise<void> {
        // Handle the after read here...
    }

    /**
     *  UPDATE handlers.
     */
    @BeforeUpdate()
    public async beforeUpdate(srv: any, req: any, next: any): Promise<void> {
        // Handle the before update here...
    }

    @OnUpdate()
    public async onUpdate(srv: any, req: any, next: any): Promise<void> {
        // Handle the update here...
    }

    @AfterUpdate()
    public async afterUpdate(srv: any, req: any, next: any): Promise<void> {
        // Handle the after update here...
    }

    /**
     *  DELETE handlers.
     */
    @BeforeDelete()
    public async beforeDelete(srv: any, req: any, next: any): Promise<void> {
        // Handle the before update here...
    }

    @OnDelete()
    public async onDelete(srv: any, req: any, next: any): Promise<void> {
        // Handle the update here...
    }

    @AfterDelete()
    public async afterDelete(srv: any, req: any, next: any): Promise<void> {
        // Handle the after update here...
    }
}
```

## 3. Bugs and Features

Please open a issue when you encounter any bugs 🐞 or if you have an idea for a additional feature 💡.

---

## 4. License

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
