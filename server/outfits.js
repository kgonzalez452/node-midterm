var outfitRouter = require("express").Router();
module.exports = function(app, outfits) {
  app.get("/", function(req, res) {
    res.send(getAllOutfits(outfits));
  });

  app.get("/add", function(req, res) {
    res.render("index.html");
  });

  app.get("/add-submit", function(req, res) {
    outfits.push(req.query.name);
    res.send(getAllOutfits(outfits));
  });

  app.get("/update", function(req, res) {
    res.render("update.html");
  });

  app.get("/update-submit", function(req, res) {
    outfits.splice(req.query.pos, 1, req.query.name);
    res.send(getAllOutfits(outfits));
  });

  app.get("/del", function(req, res) {
    res.render("delete.html");
  });

  app.get("/del-submit", function(req, res) {
    outfits.splice(req.query.pos, 1);
    res.send(getAllOutfits(outfits));
  });
};

function getAllOutfits(outfits) {
  var tgs = "";
  for (var i = 0; i < outfits.length; i++) {
    tgs += "<li>" + outfits[i] + "</li>";
  }
  return "<ol>" + tgs + "</ol>";
}
module.exports = outfitRouter;
