const express = require("express");
const app = express();
app.use(express.static("../Abschlussprojekt_timeLeaper/"));

app.get("/game", function (req, res) {
    res.redirect("index.html");
});

app.get("/*", function (req, res) {
    res.status(404).send("<h1> 404 File not found</h1>");
});
