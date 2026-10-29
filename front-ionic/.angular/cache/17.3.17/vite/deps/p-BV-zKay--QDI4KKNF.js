import {
  o
} from "./chunk-6QVAYI7G.js";
import {
  x
} from "./chunk-P5MVHJUJ.js";
import "./chunk-CN5C4E5W.js";
import "./chunk-WDMUDEB6.js";

// node_modules/@ionic/core/components/p-BV-zKay-.js
var i = (i2) => {
  if (void 0 === o) return;
  let s, p, u, l = 0;
  const d = i2.getBoolean("animated", true) && i2.getBoolean("rippleEffect", true), v = /* @__PURE__ */ new WeakMap(), m = () => {
    u && clearTimeout(u), u = void 0, s && (b(false), s = void 0);
  }, j = (t, i3) => {
    if (t && t === s) return;
    u && clearTimeout(u), u = void 0;
    const { x: o3, y: r2 } = x(i3);
    if (s) {
      if (v.has(s)) throw new Error("internal error");
      s.classList.contains(a) || w(s, o3, r2), b(true);
    }
    if (t) {
      const e = v.get(t);
      e && (clearTimeout(e), v.delete(t)), t.classList.remove(a);
      const i4 = () => {
        w(t, o3, r2), u = void 0;
      };
      n(t) ? i4() : u = setTimeout(i4, c);
    }
    s = t;
  }, w = (t, e, i3) => {
    if (l = Date.now(), t.classList.add(a), !d) return;
    const o3 = r(t);
    null !== o3 && (T(), p = o3.addRipple(e, i3));
  }, T = () => {
    void 0 !== p && (p.then((t) => t()), p = void 0);
  }, b = (t) => {
    T();
    const e = s;
    if (!e) return;
    const i3 = f - Date.now() + l;
    if (t && i3 > 0 && !n(e)) {
      const t2 = setTimeout(() => {
        e.classList.remove(a), v.delete(e);
      }, f);
      v.set(e, t2);
    } else e.classList.remove(a);
  };
  o.addEventListener("ionGestureCaptured", m), o.addEventListener("pointerdown", (t) => {
    s || 2 === t.button || j(o2(t), t);
  }, true), o.addEventListener("pointerup", (t) => {
    j(void 0, t);
  }, true), o.addEventListener("pointercancel", m, true);
};
var o2 = (t) => {
  if (void 0 === t.composedPath) return t.target.closest(".ion-activatable");
  {
    const e = t.composedPath();
    for (let t2 = 0; t2 < e.length - 2; t2++) {
      const i2 = e[t2];
      if (!(i2 instanceof ShadowRoot) && i2.classList.contains("ion-activatable")) return i2;
    }
  }
};
var n = (t) => t.classList.contains("ion-activatable-instant");
var r = (t) => {
  if (t.shadowRoot) {
    const e = t.shadowRoot.querySelector("ion-ripple-effect");
    if (e) return e;
  }
  return t.querySelector("ion-ripple-effect");
};
var a = "ion-activated";
var c = 100;
var f = 150;
export {
  i as startTapClick
};
/*! Bundled license information:

@ionic/core/components/p-BV-zKay-.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=p-BV-zKay--QDI4KKNF.js.map
