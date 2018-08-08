var express = require("express");
var app = express();
var morgan = require("morgan");
const port = 8001;
const host = "127.0.0.1";

var outfitRouter = require("./outfits");

app.use(morgan("dev")); // uses morgan dependency
app.use(express.static("client")); // to serve the files inside the client directory.
app.use(express.urlencoded({ extended: true })); //
app.use(express.json()); //

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// We now mount our outfit routes
// When a request comes in for '/outfit' we want to use this router >
app.use("/outfits", outfitRouter); // uses the outfit.js router to make code cleaner and more organized, and easier to recreate new api's.

app.use((err, req, res, next) => {
  // catches all errors
  if (err) {
    console.log(err.message);
    res.status(500).send(err);
  }
});

app.listen(port, host, function() {
  // starts our server to listen on localhost by default or host on any host you make it as in the host constant, along with the port.
  console.log("Listening on http://localhost:", port);
});
