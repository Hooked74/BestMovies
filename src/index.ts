import "./critical-polyfills";
import "./style/index.scss";
import { isIE } from "./utils";

(async function init() {
  if (isIE) await import("./polyfills");
  // TODO:
})();
