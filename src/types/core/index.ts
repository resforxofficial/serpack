import express from 'express';
import axios from 'axios';

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
    fetch(url: string, options?: { method: string, body?: any, headers?: any }): void
    delete(): void;
}

export class Server implements IServer {
    port: number;
    host: string;
    app: express.Express;
    routes: Route[] = [];
    middlewares: Middleware[] = [];

    constructor(port: number = 8080, host: string = "localhost") {
        this.port = port;
        this.host = host;
        this.app = express();
    }

    open(path: string, requestHandler: (req: express.Request, res: express.Response) => void) {
        this.routes.push({ method: "get", path, requestHandler });
    };

    post(path: string, requestHandler: (req: express.Request, res: express.Response) => void) {
        this.routes.push({ method: "post", path, requestHandler });
    };

    use(middleware: Middleware) {
        this.middlewares.push(middleware);
    }

    listen(startMessage: string) {
        this.routes.forEach(route => {
            this.app[route.method](route.path, route.requestHandler);
        });

        this.app.listen(this.port, this.host, () => {
            console.log(startMessage);
        });
    }

    async fetch(url: string, options?: { method: string, body?: any, headers?: any }): Promise<any> {
        try {
            let response;

            if (options?.method?.toUpperCase() === "POST") {
                response = await axios.post(url, options.body, { headers: options.headers });
            } else {
                response = await axios.get(url, { headers: options!.headers });
            }

            return response.data;
        }

        catch (er) {
            console.error(`error in function ${er}`);
            return null;
        }
    }

    delete() {};
}
