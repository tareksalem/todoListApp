const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
// const bodyParser = require("body-parser");
const url = require("url");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "public")));
app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port);
