import {
  t
} from "./chunk-QHH5CHKT.js";

// node_modules/@ionic/core/components/p-D6Ynv7Xh.js
var t2 = "ionKeyboardDidShow";
var o = "ionKeyboardDidHide";
var i = {};
var a = {};
var d = false;
var s = () => {
  i = {}, a = {}, d = false;
};
var n = (t3) => {
  if (t.getEngine()) r(t3);
  else {
    if (!t3.visualViewport) return;
    a = g(t3.visualViewport), t3.visualViewport.onresize = () => {
      D(t3), p() || b(t3) ? f(t3) : c(t3) && h(t3);
    };
  }
};
var r = (e) => {
  e.addEventListener("keyboardDidShow", (t3) => f(e, t3)), e.addEventListener("keyboardDidHide", () => h(e));
};
var f = (e, t3) => {
  w(e, t3), d = true;
};
var h = (e) => {
  y(e), d = false;
};
var p = () => !d && i.width === a.width && (i.height - a.height) * a.scale > 150;
var b = (e) => d && !c(e);
var c = (e) => d && a.height === e.innerHeight;
var w = (e, o2) => {
  const i2 = new CustomEvent(t2, { detail: { keyboardHeight: o2 ? o2.keyboardHeight : e.innerHeight - a.height } });
  e.dispatchEvent(i2);
};
var y = (e) => {
  const t3 = new CustomEvent(o);
  e.dispatchEvent(t3);
};
var D = (e) => {
  i = Object.assign({}, a), a = g(e.visualViewport);
};
var g = (e) => ({ width: Math.round(e.width), height: Math.round(e.height), offsetTop: e.offsetTop, offsetLeft: e.offsetLeft, pageTop: e.pageTop, pageLeft: e.pageLeft, scale: e.scale });

export {
  t2 as t,
  o,
  s,
  n,
  f,
  h,
  p,
  b,
  c,
  D,
  g
};
/*! Bundled license information:

@ionic/core/components/p-D6Ynv7Xh.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=chunk-ONPT23BT.js.map
