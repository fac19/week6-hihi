const test = require("tape");
const router = require("../router");
const supertest = require("supertest"); // Need to install

test("initialise", t => {
  let num = 2;
  t.equal(num, 2, "Should return 2");
  t.end();
});

// Types of test
// 1. Check status codes 
// 2. Check HTML content
// 3. Chec head content e.g. title

test("Check status code is 302 on index.html", t => {
    supertest(router)
    .get('/')
    .expect(302)
    .expect("location", "/public/index.html") 
    // .expect(200)
    .end((error, response) => {
        t.error(error);
        // console.log()
        t.equal(response.text.includes('<title>Sharing is caring</title>'), true)
        t.end();
    })
}, 'This is a test that checks the index.html path');

// Nice let's stay productive ha lol poor guys, poor Ayub bless him
test("Check status code is 302 on form.html", t => {
  supertest(router)
  .get('/')
  .expect(302)
  .expect("Content-Type", "/public/form.html")
  .end((error, response) => {
    t.error(error);
    // t.equal(response.text.includes("<title>Surplus shop</title>"), true)
    t.equal("Surplus shop", true)
    t.end();
  })
});

// test("Check status code is 200 on listings.html", t => {

// });

// test("Check status code is 302 and page redirects on post creation", t => {

// });

// test("Check status code is 404 on missing url", t => {

// });