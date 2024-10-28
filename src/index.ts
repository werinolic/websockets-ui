import { httpServer } from "./server.js";

const HTTP_PORT = 8181;
const SOCKET_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
