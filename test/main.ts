import server, { Server } from '../src/types/core/index';
import urlencoded from '../src/types/middleware/url';
import json from '../src/types/middleware/urljson';
import cors from 'cors';

const serve: server = new Server(5500);
serve.use(urlencoded(true));
serve.use(json());
serve.use(cors());

serve.open("/", (req, res) => {
    res.send("<h1>hello</h1>");
});

serve.listen("listening");