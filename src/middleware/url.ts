import querystring from 'querystring';
import qs from 'qs';
import express from 'express';

type Middleware = (req: express.Request, res: express.Response, next: express.NextFunction) => void;

export default function urlencoded(extended: boolean = false): Middleware {
    return (req, res, next) => {
        if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                req.body = extended ? qs.parse(body) : querystring.parse(body);
                next();
            });
        } else {
            next();
        }
    };
};
