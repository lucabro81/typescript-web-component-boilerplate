import express from 'express';
import http from 'http';
import path from 'path';

import { AddressInfo } from 'net';

const app = express();

const PORT = 3000;
const HOST_NAME = 'localhost';
const PUBLIC_FORLDER = 'public';

app.use(`/${PUBLIC_FORLDER}`, express.static(path.resolve(PUBLIC_FORLDER)));

app.all('/*', (req: express.Request, res: express.Response) => {
    res.sendFile('index.html', { root: path.resolve(PUBLIC_FORLDER) });
});

const server = http.createServer(app);
server.listen(PORT, HOST_NAME)
    .on('listening', () => {
        const { port, address } = server.address() as AddressInfo;
        console.log(`Express server started on port ${port} at ${address}.`);
    });