const model = require("./model");
const handlers = require("./handlers");

function htmlSkeleton(redirect, content) {
  return `

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Survive the virus</title>
        <link rel='shortcut icon' href='https://ps.w.org/covid-19/assets/icon.svg?rev=2262770' type='image/x-icon'> 
        <link href="https://fonts.googleapis.com/css?family=Lato|Open+Sans&display=swap" rel="stylesheet">
        <script src="https://kit.fontawesome.com/743c019083.js" crossorigin="anonymous"></script>
        <link href="public/styles.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600;800&display=swap" rel="stylesheet">
    </head>
    <body>
        <h1 class="heading-logo">SRV|VRS</h1>
          ${redirect}
        <main>
          ${content}
        </main>
        <script src="public/main.js"></script>
    </body>
    </html>
    `;
}

function printTools(tools) {
  return tools.map(tool => {
    return `
      <article id="tool_${tool.id}" class="tool-card"> 
            <h2 class="tool-card__name">${tool.tool_name}</h2>
            <p class="tool-card__love-icon"><a><i class="fas fa-heart"></i></a><span>${tool.love}</span></p>
            <p class="tool-card__user">Added by: ${tool.added_by}</p>
            <p class="tool-card__desc">What is it: ${tool.tool_description}</p>
            <a class="tool-card__link" href="https://www.${tool.tool_link}">Link</a>
            <p class="tool-card__category">Category: ${tool.category}</p>
      </article>
      `;
  }).join("");
}

function home(tools) {
  return htmlSkeleton(
    // Redirect Parameter 
    `<h2 class="home-description">A collection of tools to help you survive social distancing!</h2>
    <a class="new-page-link" href='/add'>Add a tool</a>`,
    // Content Parameter 
    `
    <p class="home-filter-description">Select a category to filter the results:</p>
    <div id="categoryIcon" class="cat">
      <a class="cat__work-icon"><i class="fas fa-briefcase"></i></a>
      <a class="cat__social-icon"><i class="fas fa-people-arrows"></i></a>
      <a class="cat__ent-icon"><i class="fas fa-photo-video"></i></a>
      <a class="cat__health-icon"><i class="fas fa-heartbeat"></i></a>
      <a class="cat__news-icon"><i class="far fa-newspaper"></i></a>
    </div>
    ${printTools(tools)}`);
}

function addPage() {
  return htmlSkeleton(
    // Redirect Parameter 
    `<a class="new-page-link" href='/'>Go back home</a>`,
    // Content Parameter 
    `<form action="create-tool" method="POST">
        <fieldset>
          <legend>Category:</legend>
          <label class="radio-label" for="work"><i class="fas fa-briefcase"></i>
          <input type="radio" id="work" name="category" value="Work" required>
          </label>
          <label class="radio-label" for="social"><i class="fas fa-people-arrows"></i>
          <input type="radio" id="social" name="category" value="Social" required>
          </label>
          <label class="radio-label" for="entertainment"><i class="fas fa-photo-video"></i>
          <input type="radio" id="entertainment" name="category" value="Entertainment" required>
          </label>
          <label class="radio-label" for="health"><i class="fas fa-heartbeat"></i>
          <input type="radio" id="health" name="category" value="Health" required>
          </label>
          <label class="radio-label" for="news"><i class="far fa-newspaper"></i>
          <input type="radio" id="news" name="category" value="News" required>
          </label>
        </fieldset>

        <label class='user-info-label' for="tool_name">Name
        <input class="user-info" id="tool_name" name="tool_name" required>
        </label>

        <label class='user-info-label' for="tool_description">Description
        <input class="user-info" id="tool_description" name="tool_description" required>
        </label>
       
       <label class='user-info-label' for="tool_link">Link https://www.
       <input class="user-info" id="tool_link" name="tool_link" placeholder="google.com" required>
       </label>
       
       <label class='user-info-label' for="added_by">Username
       <input class="user-info" id="added_by" name="added_by" required>
       </label>
       
       <button class="post-tool-button" type="submit">Post tool</button>
     </form>`
  );
}

function missing() {
  return htmlSkeleton(
    // Redirect Parameter 
    `<a href='/'><h2 class='error-subtitle'>Go back home!</h2></a>`,
    // Content Parameter   
    `<h1 class="error-title">Content Not Found</h1>`
  );
}

module.exports = { home, addPage, missing };
