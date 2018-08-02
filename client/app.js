function ready(fn) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

var getValues = function() {
  // grab our form values
  var name = document.querySelector("input[name=outfit-name]").value;
  var style = document.querySelector("input[name=outfit-style]").value;
  var gender = document.querySelector("select");

  document.querySelector("input[name=outfit-name]").value = "";
  document.querySelector("input[name=outfit-style]").value = "";
  document.querySelector("input[type=number]").value = "";

  return {
    name: name,
    style: style,
    gender: gender
  };
};

// Serves as a cache for the front-end so we don't have to make multiple trips to the back end to get data
var outfits = [];
console.log(outfits);

const updateoutfitList = () => {
  const outfitData = outfits[outfits.length - 1];
  makeTemplate(outfitData);
};

const makeoutfitList = () => {
  outfits.forEach(outfit => {
    makeTemplate(outfit);
  });
};

const getAlloutfits = () => {
  fetch("/outfits")
    .then(res => {
      console.log(res);
      return res.json(res);
    })
    .then(data => {
      outfits = outfits.concat(data);
      makeoutfitList();
    });
};
