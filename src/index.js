import { createServer } from './server.js';

function startServer() {
    const server = createServer();
    server.listen({ port: 3000 });
};

startServer();