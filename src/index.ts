import * as path from "path";
import CDSHandler from "./CDSHandler";
import { MetadataArgsStorage } from "./metadata-builder/MetadataArgsStorage";

export * from "./decorators/class/Handler";
export * from "./decorators/method/Create";
export * from "./decorators/method/Read";
export * from "./decorators/method/Update";
export * from "./decorators/method/Delete";
export * from "./decorators/method/Reject";
export * from "./decorators/method/Func";
export * from "./decorators/method/Action";
export * from "./decorators/param/Srv";
export * from "./decorators/param/Req";
export * from "./decorators/param/ParamObj";
export * from "./decorators/param/Param";
export * from "./decorators/param/Jwt";

/**
 * Returns the metadata arguments storage.
 *
 * @export
 * @returns {MetadataArgsStorage} Metadata arguments storage.
 */
export function getMetadataArgsStorage(): MetadataArgsStorage {
    if (!(global as any).cdsHandlersMetadataArgsStorage)
        (global as any).cdsHandlersMetadataArgsStorage = new MetadataArgsStorage();

    return (global as any).cdsHandlersMetadataArgsStorage;
}

/**
 * Imports decorated classes from directories.
 *
 * @export
 * @param {string[]} directories Directories to search in.
 * @param {string} [formats=[".js", ".ts"]] Formats to import classes from.
 * @returns {Function[]} Imported classes.
 */
export function importClassesFromDirectories(directories: string[], formats = [".js", ".ts"]): Function[] {
    const loadFileClasses = function(exported: any, allLoaded: Function[]) {
        if (exported instanceof Function) {
            allLoaded.push(exported);
        } else if (exported instanceof Array) {
            exported.forEach((i: any) => loadFileClasses(i, allLoaded));
        } else if (exported instanceof Object || typeof exported === "object") {
            Object.keys(exported).forEach(key => loadFileClasses(exported[key], allLoaded));
        }

        return allLoaded;
    };

    const allFiles = directories.reduce((allDirs, dir) => {
        return allDirs.concat(require("glob").sync(path.normalize(dir)));
    }, [] as string[]);

    const dirs = allFiles
        .filter(file => {
            const dtsExtension = file.substring(file.length - 5, file.length);
            return formats.indexOf(path.extname(file)) !== -1 && dtsExtension !== ".d.ts";
        })
        .map(file => {
            return require(file);
        });

    return loadFileClasses(dirs, []);
}

/**
 * Create combined handler.
 *
 * @export
 * @param {(Function[] | string[])} handlers Handlers; either classes directly or the directories where the handlers reside.
 * @returns {(srv: any) => void} Function that is used to register all endpoints.
 */
export function createCombinedHandler(handlers: Function[] | string[]): (srv: any) => void {
    return (srv: any) => {
        let handlerClasses: Function[];
        if (handlers && handlers.length) {
            handlerClasses = (handlers as any[]).filter(controller => controller instanceof Function);
            const handlerDirs = (handlers as any[]).filter(controller => typeof controller === "string");
            handlerClasses.push(...importClassesFromDirectories(handlerDirs));

            CDSHandler.registerHandlers(srv, handlerClasses);
        }
    };
}
