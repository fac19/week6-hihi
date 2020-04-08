var filter = '%';

var workFilter = document.querySelector(".cat__work-icon");
var socialFilter = document.querySelector(".cat__social-icon");
var entFilter = document.querySelector(".cat__ent-icon");
var healthFilter = document.querySelector(".cat__health-icon");
var newsFilter = document.querySelector(".cat__news-icon");

// IN THE FUTURE WE WOULD REFACTOR THE BELOW FUNCTIONS!

workFilter.addEventListener("click", async () => {
    filter = 'Work';
    var newHtml = await fetch ("/", {
        method: "POST",
        headers: {"Content-Type": "application/javascript"},
        body: filter,
    });
    document.open('text/html');
    document.write(`${await newHtml.text()}`);
    document.close();
})

socialFilter.addEventListener("click", async () => {
    filter = 'Social';
    var newHtml = await fetch ("/", {
        method: "POST",
        headers: {"Content-Type": "application/javascript"},
        body: filter,
    });
    document.open('text/html');
    document.write(`${await newHtml.text()}`);
    document.close();
})

entFilter.addEventListener("click", async () => {
    filter = 'Entertainment';
    var newHtml = await fetch ("/", {
        method: "POST",
        headers: {"Content-Type": "application/javascript"},
        body: filter,
    });
    document.open('text/html');
    document.write(`${await newHtml.text()}`);
    document.close();
})

healthFilter.addEventListener("click", async () => {
    filter = 'Health';
    var newHtml = await fetch ("/", {
        method: "POST",
        headers: {"Content-Type": "application/javascript"},
        body: filter,
    });
    document.open('text/html');
    document.write(`${await newHtml.text()}`);
    document.close();
})

newsFilter.addEventListener("click", async () => {
    filter = 'News';
    var newHtml = await fetch ("/", {
        method: "POST",
        headers: {"Content-Type": "application/javascript"},
        body: filter,
    });
    document.open('text/html');
    document.write(`${await newHtml.text()}`);
    document.close();
})