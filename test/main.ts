import server, { Server } from '../src/types/core/index';
import urlencoded from '../src/types/middleware/url';
import json from '../src/types/middleware/urljson';
import cors from 'cors';

const serve: server = new Server(3560);
serve.use(urlencoded(true));
// serve.use(json());
serve.use(cors());

serve.open("/", (req, res) => {
    res.sendFile("D:\\GDFsector\\serpack\\test\\html\\index.html");
});

serve.post("/store", (req, res) => {
    console.log(req.body ?? req);
    console.log(req.body ? req : "not impled");
});

serve.listen("listening");