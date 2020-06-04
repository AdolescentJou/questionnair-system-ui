var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(express.static(`${__dirname}/../public`));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// app.get("/formbuild", function (req, res) {
//   res.sendFile(path.join(__dirname, "../index.html"));
// });

// app.get("/submission", function (req, res) {
//   res.sendFile(path.join(__dirname, "../index.html"));
// });

// app.get("/test", function (req, res) {
//   res.sendFile(path.join(__dirname, "../index.html"));
// });

app.listen(8001, function () {
  console.log(
    `Express started on http://localhost:8001`,
  );
});
