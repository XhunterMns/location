import {
  t
} from "./chunk-P5MVHJUJ.js";
import {
  a
} from "./chunk-CN5C4E5W.js";
import {
  __async
} from "./chunk-WDMUDEB6.js";

// node_modules/@ionic/core/components/p-6J0vc7Z8.js
var r = "ion-content";
var e = ".ion-content-scroll-host";
var t2 = `${r}, ${e}`;
var n = (o) => "ION-CONTENT" === o.tagName;
var a2 = (s) => __async(void 0, null, function* () {
  return n(s) ? (yield new Promise((r2) => t(s, r2)), s.getScrollElement()) : s;
});
var i = (o) => o.querySelector(e) || o.querySelector(t2);
var l = (o) => o.closest(t2);
var f = (o) => o.querySelector(e);
var u = (o) => {
  if (n(o)) return o.querySelector("ion-refresher");
  const s = o.closest(r);
  if (null === s) return null;
  const e2 = f(s);
  return null !== e2 && e2.contains(o) ? s.querySelector("ion-refresher") : null;
};
var c = (o, s) => n(o) ? o.scrollToTop(s) : Promise.resolve(o.scrollTo({ top: 0, left: 0, behavior: "smooth" }));
var m = (o, s, r2, e2) => n(o) ? o.scrollByPoint(s, r2, e2) : Promise.resolve(o.scrollBy({ top: r2, left: s, behavior: e2 > 0 ? "smooth" : "auto" }));
var h = (o) => a(o, r);
var p = (o) => {
  if (n(o)) {
    const s = o.scrollY;
    return o.scrollY = false, s;
  }
  return o.style.setProperty("overflow", "hidden"), true;
};
var v = (o, s) => {
  n(o) ? o.scrollY = s : o.style.removeProperty("overflow");
};

export {
  r,
  e,
  n,
  a2 as a,
  i,
  l,
  f,
  u,
  c,
  m,
  h,
  p,
  v
};
/*! Bundled license information:

@ionic/core/components/p-6J0vc7Z8.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=chunk-ZK2EBCFA.js.map
