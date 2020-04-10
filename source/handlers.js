const fs = require("fs");
const path = require("path");
const model = require("./model");
const templates = require("./template");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const dotenv = require("dotenv")
dotenv.config();

const secret = process.env.SECRET;

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
    // console.log(data);
    data.love = 0;
    // console.log(data);
    model
      .createTool(data)
      .then(() => {
        response.writeHead(302, { location: "/" });
        response.end();
      })
      .catch((error) => {
        // console.log(error);
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
            response.writeHead(302, { "content-type": "text/html" });
            response.end(`<h1>You have been successfully signed up</h1>
            <a href='/'><h2 class='error-subtitle'>Go to homepage</h2></a>`);
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

function loginHandler(request, response) {
  body = "";
  request.on('data', (chunk) => {
    body += chunk;
  })
  request.on('end', () => {
    const incomingInfo = Object.fromEntries(new URLSearchParams(body))  
    const username = incomingInfo.username;
  
    model.getSpecificUser(username).then((user) => {
      // console.log(user.rows);      
      if (user.rowCount) {
        const hashedPassword = user.rows[0].password
        return bcryptjs.compare(incomingInfo.password, hashedPassword).then((match) => {
          if (!match) {
            throw new Error(error);
          } else {
            const newCookie = jwt.sign(username, secret);
            response.writeHead(302, {
              'Location': "/",
              "Set-Cookie": `login=${newCookie}; HttpOnly`,}
          )}
            return response.end();
          })
          .catch(error => {
            loginFailed();
          })
        .catch(error => {
          loginFailed();
    })
  }
    })
  })
};

function loginFailed(request, response) {
  response.writeHead(401, { 'content-type': 'text/html' })
  response.end('<h1>Username or password is incorrect!</h1>')
}

// function login(request, response) {
//   let body = "";
//   request.on("data", (chunk) => (body += chunk));


//   request.on("end", () => {
//     const searchParams = new URLSearchParams(body);
//     const userInformation = Object.fromEntries(searchParams);

//     const username = userInformation.username;
//     model.getSpecificUser(username).then((user) => {
//       if (user) {
//         //check password

//         const newCookie = jwt.sign(username, secret);
//         response.writeHead(302, {
//           Location: "/",
//           "Set-Cookie": `login=${newCookie}; HttpOnly`,
//         });
//         return response.end();
//       } else {
//         response.writeHead(500, { "content-type": "text/html" });
//         response.end("<h1> User does not exist. </h1>");
//       }
//     });
//   });
// }

function logout(request, response) {
  response.writeHead(302, {
    location: "/",
    "set-cookie": `login=0; Max-Age=0`,
  });
  return response.end();
}

function deletePost(request, response, url) {
  // SIMPLE VERSION
  if (request.headers.cookie) {
    const token = cookie.parse(request.headers.cookie).login
    console.log(token);
    const deleteId = url.match(/\d$/) || "";
    if (jwt.verify(token, secret)) {
      model.deletePostFromDatabase(deleteId).then(() => {
        response.writeHead(302, { location: "/" });
        response.end();  
      });
    } else {
      response.writeHead(302, { location: "/" });
      response.end();
    }
  } else {
    response.writeHead(302, { location: "/" });
    response.end();
  }
  // console.log(cookies);
  
  //If login user verified
}

  // and then we can use that text to delete from the database

  // COMPLICATION
  // the user should only be able to delete their own posts
  // after working out what post to delete, we should check the jwt to see if the author_id of the post matches the author_id in the verified jwt.


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
  loginHandler,
  loginFailed,
  logout,
  deletePost,
};
