const compression = require("compression");
const express = require("express");
const path = require("path");
const app = express();

// compress app size
app.use(compression());

// Serve static files....
app.use(express.static(__dirname + "/dist/medfinder-spa"));

// Send all requests to index.html
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/medfinder-spa/index.html"));
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);
