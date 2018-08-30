require("classlist-polyfill");
require("url-polyfill");
require("core-js");
require("whatwg-fetch");

if (process.env.NODE_ENV === "test") {
  require("raf").polyfill(global);
}
