import * as fs from 'node:fs';
import * as path from 'node:path';
import * as http from 'node:http';
import {fileURLToPath} from "node:url";
import { WebSocketServer } from 'ws';

import {router} from './router.js';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', async (data) => {
        const message = JSON.parse(data.toString());
        const response = await router(message);
        if(response !== undefined) ws.send(response);
    });
});

export const httpServer = http.createServer(function (req, res) {
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    const file_path = path.join(dirname, '../', (req.url === '/' ? '/front/index.html' : '/front' + req.url));
    fs.readFile(file_path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
});
