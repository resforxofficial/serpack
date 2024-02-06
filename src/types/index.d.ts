import express from 'express';
import { RequestInit } from 'node-fetch';

interface Route {
    method: "get" | "post";
    path: string;
    requestHandler: (req: express.Request, res: express.Response) => void;
}

type Middleware = (req: express.Request, res: express.Response, next: express.NextFunction) => void;

export default interface IServer {
    port: number;
    host: string;
    app: express.Express;
    routes: Route[];
    middlewares: Middleware[];
    open(path: string, requestHandler: (req: express.Request, res: express.Response) => void): void;
    post(path: string, requestHandler: (req: express.Request, res: express.Response) => void): void;
    use(middleware: Middleware): void;
    listen(startMessage: string): void;
    fetch(url: string, options: RequestInit): void;
    delete(): void;
}

export declare class Server implements IServer {
    port: number;
    host: string;
    app: express.Express;
    routes: Route[];
    middlewares: Middleware[];
    constructor(port?: number, host?: string);
    open(path: string, requestHandler: (req: express.Request, res: express.Response) => void): void;
    post(path: string, requestHandler: (req: express.Request, res: express.Response) => void): void;
    use(middleware: Middleware): void;
    listen(startMessage: string): void;
    fetch(url: string, options: RequestInit): Promise<unknown>;
    delete(): void;
}

export {};
