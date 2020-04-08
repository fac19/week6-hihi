const handlers = require("./handlers");

function router(request, response) {
  const { url } = request;
  if (url === "/") {
    handlers.home(request, response);
  } else if (url.includes('public')) {
    handlers.public(request, response);
  } else {
    handlers.missing(request, response);
  } 
  
  // GET request for our form.html
  // POST request when submit form data
  // DELETE request when deleting a post  
  // GET request when want show all of the listings
}

module.exports = router;
