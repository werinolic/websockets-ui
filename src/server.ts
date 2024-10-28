import { readFile } from 'node:fs';
import { dirname, join } from 'node:path';
import { createServer } from 'node:http';
import { fileURLToPath } from "node:url";

import WebSocket, { WebSocketServer } from 'ws';

import {router} from './router.js';
import { User, Message } from './modules/@types.js';

export const httpServer = createServer(function (req, res) {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const file_path = join(__dirname, '../', (req.url === '/' ? '/front/index.html' : '/front' + req.url));
    readFile(file_path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
});

const connections = new Map();

const messageListener = async (ws: WebSocket, data: WebSocket.RawData, session: {user: User | null}) => {
    const message = JSON.parse(data.toString());
    const { user, messages} = await router(session.user, message);
    if(message.type === 'reg') {
        connections.set(user?.name, ws);
    }
    session.user = user;
    if (messages.length !== 0) {
        messages.forEach(message => {
            console.log(`user: ${session.user?.name} | type: ${message.type} | message : ${message.data}`);
            if(message.broadcast) {
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: message.type,
                            data: message.data,
                            id: message.id,
                        }));
                    }
                });
            } else {
                const recipientsUsers = message.users;
                recipientsUsers.forEach(user => {
                    const connection = connections.get(user.name)
                    connection.send(JSON.stringify({
                        type: message.type,
                        data: message.data,
                        id: message.id,
                    }));

                })
            }
        })
    }
};

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
    let session: {user: User | null} = { user: null};
    ws.on('error', console.error);
    ws.on('message', (data: WebSocket.RawData) => {
        return messageListener(ws, data, session)
    });
});
