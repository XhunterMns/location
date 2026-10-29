// node_modules/@ionic/core/components/p-BmVRXR1y.js
var o = "ion-focused";
var t = ["Tab", "ArrowDown", "Space", "Escape", " ", "Shift", "Enter", "ArrowLeft", "ArrowRight", "ArrowUp", "Home", "End"];
var e = (e2) => {
  let s = [], n = true;
  const c = e2 ? e2.shadowRoot : document, u = e2 || document.body, r = (t2) => {
    s.forEach((t3) => t3.classList.remove(o)), t2.forEach((t3) => t3.classList.add(o)), s = t2;
  }, d = () => {
    n = false, r([]);
  }, f = (o2) => {
    n = t.includes(o2.key), n || r([]);
  }, i = (o2) => {
    if (n && void 0 !== o2.composedPath) {
      const t2 = o2.composedPath().filter((o3) => !!o3.classList && o3.classList.contains("ion-focusable"));
      r(t2);
    }
  }, w = () => {
    c.activeElement === u && r([]);
  };
  return c.addEventListener("keydown", f), c.addEventListener("focusin", i), c.addEventListener("focusout", w), c.addEventListener("touchstart", d, { passive: true }), c.addEventListener("mousedown", d), { destroy: () => {
    c.removeEventListener("keydown", f), c.removeEventListener("focusin", i), c.removeEventListener("focusout", w), c.removeEventListener("touchstart", d), c.removeEventListener("mousedown", d);
  }, setFocus: r };
};

export {
  e
};
/*! Bundled license information:

@ionic/core/components/p-BmVRXR1y.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=chunk-6Q7MF7YH.js.map
