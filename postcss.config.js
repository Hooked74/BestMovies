module.exports = {
  modules: true,
  plugins: {
    // Illustrational
    "postcss-flexbugs-fixes": {},
    autoprefixer: {
      browsers: [
        ">1%",
        "last 4 versions",
        "Firefox ESR",
        "not ie < 9" // React doesn't support IE8 anyway
      ],
      flexbox: "no-2009"
    },
    "postcss-modules": {
      generateScopedName: function(name, filename, css) {
        var path = require("path");
        var file = path.basename(filename).split(".")[0];

        return /index.less$/.test(filename) ? name : file + "__" + name;
      } //"[name]__[local]"
    }
  }
};
