import { IncomingMessage } from "http";

export function retrieveJwt(req: IncomingMessage): string | undefined {
    const header = authHeader(req);
    if (validateAuthHeader(header)) {
        return header!.split(" ")[1];
    }
}

function authHeader(req: IncomingMessage): string | undefined {
    const entries = Object.entries(req.headers).find(([key]) => key.toLowerCase() === "authorization");
    if (entries) {
        const header = entries[1];

        // Header could be a list of headers
        return Array.isArray(header) ? header[0] : header;
    }
    return undefined;
}

function validateAuthHeader(header: string | undefined): boolean {
    if (typeof header === "undefined") {
        console.warn("Authorization header not set.");
        return false;
    }

    const [authType, token] = header.split(" ");

    if (typeof token === "undefined") {
        console.warn("Token in auth header missing.");
        return false;
    }

    if (authType.toLowerCase() !== "bearer") {
        console.warn("Authorization type is not Bearer.");
        return false;
    }

    return true;
}
