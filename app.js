const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
var upload = multer({dest: "uploads"});
const url = require("url");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname, "public"))),


// app.use("*", function (req, res) {
//     // var link = url.parse(req.url);
//
// });
app.use(express.static(path.join(__dirname, "public")));
console.log(path.join(__dirname, "public"))
app.use("/*", function (req, res) {
    // var link = req.headers.host;
    if (!req.headers.ajax) {
        res.sendFile(path.join(__dirname, "index.html"));
    } else {
        res.status(404).send("error");
    }
});

app.listen(port);
