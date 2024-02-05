import express from 'express';

export default function json(): express.RequestHandler {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.headers["content-type"] === "application/json") {
            let data = "";

            req.on("data", (chunk) => {
                data += chunk;
            });

            req.on("end", () => {
                try {
                    req.body = JSON.parse(data);
                    next();
                } catch (err) {
                    // JSON 파싱에서 오류가 발생한 경우
                    console.error("JSON parsing error:", err);
                    res.status(400).send("Bad Request");
                }
            });
        } else {
            next();
        }
    };
}
