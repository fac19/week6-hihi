const fs = require("fs");
const path = require("path");
const model = require("./model");
const templates = require("./template");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "jhjg7o8injgv";
const types = {
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  jpg: "image/jpeg",
  ico: "image/x-icon",
};

// MODEL => TEMPLATE
function homeHandler(request, response) {
  let filter = "%";
  request.on("data", (chunk) => (filter += chunk));
  request.on("end", () => {
    model
      .getTools(filter) // return tools object with name, likes, desc, user
      .then((tools) => {
        templates.home(tools);
        response.writeHead(200, { "content-type": "text/html" });
        const html = templates.home(tools);
        response.end(html);
      })
      .catch((error) => {
        console.error(error);
        missingHandler(request, response);
      });
  });
  //serves home page with SELECT query on database getTools() / filterTools()
}

function publicHandler(request, response) {
  const url = request.url;
  const urlArray = url.split(".");
  const extension = urlArray[1];
  const type = types[extension];

  fs.readFile(path.join(__dirname, "..", url), (error, file) => {
    // console.log("publicHandler -> file", file);
    if (error) {
      missingHandler(request, response);
    } else {
      response.writeHead(200, { "content-type": type });
      response.end(file);
    }
  });
}

function addPageHandler(request, response) {
  response.writeHead(200, { "content-type": "text/html" });
  const formPage = templates.addPage();
  response.end(formPage);
  response.on("error", (error) => {
    console.error(error);
    missingHandler(request, response);
  });
}

function addToolHandler(request, response) {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    const searchParams = new URLSearchParams(body);
    const data = Object.fromEntries(searchParams);
    console.log(data);
    data.love = 0;
    console.log(data);
    model
      .createTool(data)
      .then(() => {
        response.writeHead(302, { location: "/" });
        response.end();
      })
      .catch((error) => {
        console.log(error);
        response.writeHead(500, { "content-type": "text/html" });
        response.end(`<h1>Something went wrong saving your data</h1>`);
      });
  });
}

function missingHandler(request, response) {
  response.writeHead(404, { "content-type": "text/html" });
  const missingHtml = templates.missing();
  response.end(missingHtml);
}

function newUserPage(request, response) {
  response.writeHead(200, { "content-type": "text/html" });
  response.end(templates.signup());
}

function addUser(request, response) {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    const searchParams = new URLSearchParams(body);
    const data = Object.fromEntries(searchParams);
    model.checkOriginalUsername(data).then((original) => {
      if (original) {
        const salt = bcryptjs.genSaltSync(10);
        data.password = bcryptjs.hashSync(data.password, salt);
        model
          .createNewUser(data)
          .then(() => {
            response.writeHead(302, { location: "/" });
            response.end();
          })
          .catch((error) => {
            console.error(error);
            response.writeHead(500, { "content-type": "text/html" });
            response.end(
              "<h1>Something went wrong with creating your login, please try again</h1>"
            );
          });
      } else {
        response.writeHead(500, { "content-type": "text/html" });
        response.end("<h1>Username already in use, please try again</h1>");
      }
    });
  });
}

function loginPage(request, response) {
  response.writeHead(200, { "content-type": "text/html" });
  response.end(templates.login());
}

function login(request, response) {
  let body = "";
  console.log(body);
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    const searchParams = new URLSearchParams(body);
    const userInformation = Object.fromEntries(searchParams);
    console.log(userInformation);
    const newCookie = jwt.sign(userInformation, secret);
    response.writeHead(302, {
      Location: "/",
      "Set-Cookie": `login=${newCookie}; HttpOnly`,
    });
    return response.end();
  });
}

function deletePost(request, response, url) {
  // SIMPLE VERSION
  const deleteId = url.match(/\d$/) || "";
  //If login user verified
  model.deletePostFromDatabase(deleteId).then(() => {
    response.writeHead(302, { location: "/" });
    response.end();
  });

  // and then we can use that text to delete from the database

  // COMPLICATION
  // the user should only be able to delete their own posts
  // after working out what post to delete, we should check the jwt to see if the author_id of the post matches the author_id in the verified jwt.
}

module.exports = {
  homeHandler,
  publicHandler,
  addPageHandler,
  addToolHandler,
  //   loveHandler,
  missingHandler,
  newUserPage,
  addUser,
  loginPage,
  login,
  deletePost,
};
