const http = require("http");
const router = require("./router");
const PORT = process.env.PORT || 3000;

const server = http.createServer(router);


process.on('unhandledRejection', (error) => {
    console.error(error);
    process.exit(1);
})
 
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
