// fs = core module node
const fs = require('fs');
const path = require('path');
const model = require("./model");

const types = {
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  ico: "image/x-icon",
  png: "image/png",
  PNG: "image/png",
};

function home(request, response) {
  response.writeHead(302, { "location": "/public/index.html" });
  response.end();
  // const filePath = path.join(__dirname, '..', 'public', 'index.html');
  // console.log("home -> filePath", filePath)
  // fs.readFile(filePath, (error, file) => {
  //   if (error) {
  //     response.writeHead(404, { "content-type": "text/html" });
  //     response.end("<h1>Error</h1>")
  //   } else {
  //     response.writeHead(200, { "content-type": "text/html" });
  //     response.end(file);
  //   }
  // })
}

function public(request, response) {
  let url = request.url;
  let urlArray = url.split('.');
  let assetExtension = urlArray[1];
  let type = types[assetExtension];

  const assetFilePath = path.join(__dirname, '..', url)

  fs.readFile(assetFilePath, (error, file) => {
    if (error) {
      response.writeHead(404, { "content-type": "text/html"});
      response.end("<h1>Error file not found!</h1>")
    } else {
      response.writeHead(200, { "content-type": type});
      response.end(file);
    }
  })
}

function missing(request, response) {
  response.writeHead(404, { "content-type": "text/html" });
  response.end("<h1>Not Found</h1>");
}


module.exports = { home, missing, public };
