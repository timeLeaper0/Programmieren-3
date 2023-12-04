const express = require("express");
const app = express();
app.use(express.static("../Abschlussprojekt_timeLeaper/"));

app.get("/", function (req, res) {
    res.send("<h1>Hello world</h1")

});

app.get("/name/:name", function (req, res) {
    let name = req.params.name;
    res.send("<h1>Hello" + name + "</h1>")
});

app.get("/google", function (req, res) {
    res.redirect("https://www.google.com/")
});

app.get("/search/:object", function (req, res) {
    let object = req.params.object;
    res.redirect("https://www.google.com/search?q=" + object)
});

app.get("/game", function (req, res) {
    res.redirect("index.html");
});

app.get("/*", function (req, res) {
    res.status(404).send("<h1> 404 File not found</h1>");
});


app.listen(3000, function () {
    console.log("Server is running from port 3000...");
});