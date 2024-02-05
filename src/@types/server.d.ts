import express from 'express';
type Middleware = (req: express.Request, res: express.Response, next: express.NextFunction) => void;
export default function urlencoded(extended?: boolean): Middleware;

export default function json(): express.RequestHandler;

export {};