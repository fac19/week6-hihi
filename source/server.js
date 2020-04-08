const http = require("http");
const router = require("./router");
const PORT = process.env.PORT || 3000;

const server = http.createServer(router);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

process.on('unhandledRejection', (error) => {
    console.error(error);
    process.exit(1);
})