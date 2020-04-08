const handlers = require("./handlers");

function router(request, response) {
  const { url, method } = request;
  if (url === "/" && method === "GET") {
    handlers.homeHandler(request, response);
  } else if (url === "/" && method === "POST") {
    handlers.homeHandler(request, response);
  } else if (url.includes("public")) {
    handlers.publicHandler(request, response);
  } else if (url === "/add" && method == "GET") {
    handlers.addPageHandler(request, response);
  } else if (url === "/create-tool" && method == "POST") {
    handlers.addToolHandler(request, response);
  } else {
    handlers.missingHandler(request, response);
  }
}

module.exports = router;
