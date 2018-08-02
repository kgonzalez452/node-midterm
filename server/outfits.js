var outfitRouter = require("express").Router();
module.exports = function(app, server) {
  var outfits = [
    {
      id: 1,
      name: "Looking Cool",
      style: "Grease Look",
      gender: "male"
    },
    {
      id: 2,
      name: "Its Too Hot",
      style: "casual",
      gender: "male"
    }
  ];
  var id = 2;

  var updateId = function(req, res, next) {
    if (!req.body.id) {
      id++;
      req.body.id = id + "";
    }

    next();
  };

  outfitRouter.param("id", (req, res, next, id) => {
    var outfit = outfits.find(outfit => {
      return outfit.id == req.params.id;
    });

    if (outfit) {
      req.outfit = outfit;
      next();
    } else {
      res.send();
    }
  });

  outfitRouter.get("/", (req, res) => {
    // GET outfits
    res.json(outfits);
  });

  outfitRouter.get("/:id", (req, res) => {
    // GET outfit.id
    // var outfit = outfits.find(outfit => {
    //   return outfit.id == req.params.id;
    // });
    var outfit = req.outfit;
    res.json(outfit || {});
  });

  outfitRouter.post("/", updateId, (req, res) => {
    // POST outfit.id
    var outfit = req.body;
    // id++;
    // outfit.id = id + '';

    outfits.push(outfit);

    res.json(outfit);
  });

  // helper function for patch
  function findoutfitIndex(id) {
    // findIndex stuff
    return outfitIndex;
  }

  outfitRouter.put("/:id", (req, res) => {
    // PUT/REPLACE outfit.id
    var update = req.body;
    if (update.id) {
      delete update.id;
    }

    var outfit = outfits.findIndex(outfit => outfit.id == req.params.id);
    if (!outfits[outfit]) {
      res.send();
    } else {
      var updatedoutfit = Object.assign(outfits[outfit], update);
      //_.assign(outfits[outfit], update);
      res.json(updatedoutfit);
    }
    console.log(outfit);
  });

  outfitRouter.delete("/:id", (req, res) => {
    // DELETE outfit.id
    var outfit = outfits.findIndex(outfit => outfit.id == req.params.id);
    if (!outfits[outfit]) {
      res.send();
    } else {
      var deletedoutfit = outfits[outfit];
      outfits.splice(outfit, 1);
      res, json(deletedoutfit);
    }
  });
};
module.exports = outfitRouter;
