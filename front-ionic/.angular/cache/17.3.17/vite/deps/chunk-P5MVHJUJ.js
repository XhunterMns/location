import {
  f
} from "./chunk-CN5C4E5W.js";

// node_modules/@ionic/core/components/p-o8OKV5aD.js
var o = (o3) => {
  var r2, t2;
  for (let t3 = o3; t3; t3 = t3.parentElement) {
    const o4 = null === (r2 = t3.getAttribute("dir")) || void 0 === r2 ? void 0 : r2.toLowerCase();
    if ("rtl" === o4) return true;
    if ("ltr" === o4) return false;
  }
  return "rtl" === (null === (t2 = null === document || void 0 === document ? void 0 : document.dir) || void 0 === t2 ? void 0 : t2.toLowerCase());
};

// node_modules/@ionic/core/components/p-C7II1iDj.js
var r = (a, i = 0) => new Promise((r2) => {
  e(a, i, r2);
});
var e = (a, i = 0, r2) => {
  let e2, t2;
  const n2 = { passive: true }, o3 = () => {
    e2 && e2();
  }, s2 = (i2) => {
    void 0 !== i2 && a !== i2.target || (o3(), r2(i2));
  };
  return a && (a.addEventListener("webkitTransitionEnd", s2, n2), a.addEventListener("transitionend", s2, n2), t2 = setTimeout(s2, i + 500), e2 = () => {
    void 0 !== t2 && (clearTimeout(t2), t2 = void 0), a.removeEventListener("webkitTransitionEnd", s2, n2), a.removeEventListener("transitionend", s2, n2);
  }), o3;
};
var t = (a, i) => {
  a.componentOnReady ? a.componentOnReady().then((a2) => i(a2)) : m(() => i(a));
};
var n = (a) => void 0 !== a.componentOnReady;
var o2 = (a, i = []) => {
  const r2 = {};
  return i.forEach((i2) => {
    a.hasAttribute(i2) && (null !== a.getAttribute(i2) && (r2[i2] = a.getAttribute(i2)), a.removeAttribute(i2));
  }), r2;
};
var s = ["role", "aria-activedescendant", "aria-atomic", "aria-autocomplete", "aria-braillelabel", "aria-brailleroledescription", "aria-busy", "aria-checked", "aria-colcount", "aria-colindex", "aria-colindextext", "aria-colspan", "aria-controls", "aria-current", "aria-describedby", "aria-description", "aria-details", "aria-disabled", "aria-errormessage", "aria-expanded", "aria-flowto", "aria-haspopup", "aria-hidden", "aria-invalid", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-level", "aria-live", "aria-multiline", "aria-multiselectable", "aria-orientation", "aria-owns", "aria-placeholder", "aria-posinset", "aria-pressed", "aria-readonly", "aria-relevant", "aria-required", "aria-roledescription", "aria-rowcount", "aria-rowindex", "aria-rowindextext", "aria-rowspan", "aria-selected", "aria-setsize", "aria-sort", "aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-valuetext"];
var l = (a) => o2(a, s);
var u = (a, i, r2, e2) => a.addEventListener(i, r2, e2);
var c = (a, i, r2, e2) => a.removeEventListener(i, r2, e2);
var d = (a, i = a) => a.shadowRoot || i;
var m = (a) => "function" == typeof __zone_symbol__requestAnimationFrame ? __zone_symbol__requestAnimationFrame(a) : "function" == typeof requestAnimationFrame ? requestAnimationFrame(a) : setTimeout(a);
var p = (a) => !!a.shadowRoot && !!a.attachShadow;
var f2 = (a) => {
  if (a.focus(), a.classList.contains("ion-focusable")) {
    const i = a.closest("ion-app");
    i && i.setFocus([a]);
  }
};
var b = (a, i, r2, e2, t2) => {
  {
    let a2 = i.querySelector("input.aux-input");
    a2 || (a2 = i.ownerDocument.createElement("input"), a2.type = "hidden", a2.classList.add("aux-input"), i.appendChild(a2)), a2.disabled = t2, a2.name = r2, a2.value = e2 || "";
  }
};
var v = (a, i, r2) => Math.max(a, Math.min(i, r2));
var w = (i, r2) => {
  if (!i) {
    const i2 = "ASSERT: " + r2;
    throw f(i2), new Error(i2);
  }
};
var x = (a) => {
  if (a) {
    const i = a.changedTouches;
    if (i && i.length > 0) {
      const a2 = i[0];
      return { x: a2.clientX, y: a2.clientY };
    }
    if (void 0 !== a.pageX) return { x: a.pageX, y: a.pageY };
  }
  return { x: 0, y: 0 };
};
var y = (a, r2) => {
  const e2 = o(r2);
  switch (a) {
    case "start":
      return e2;
    case "end":
      return !e2;
    default:
      throw new Error(`"${a}" is not a valid value for [side]. Use "start" or "end" instead.`);
  }
};
var h = (a, i) => {
  const r2 = a._original || a;
  return { _original: a, emit: _(r2.emit.bind(r2), i) };
};
var _ = (a, i = 0) => {
  let r2;
  return (...e2) => {
    clearTimeout(r2), r2 = setTimeout(a, i, ...e2);
  };
};
var T = (a, i) => {
  if (null != a || (a = {}), null != i || (i = {}), a === i) return true;
  const r2 = Object.keys(a);
  if (r2.length !== Object.keys(i).length) return false;
  for (const e2 of r2) {
    if (!(e2 in i)) return false;
    if (a[e2] !== i[e2]) return false;
  }
  return true;
};
var q = (a) => "number" == typeof a && !isNaN(a) && isFinite(a);

export {
  o,
  r,
  t,
  n,
  o2,
  l,
  u,
  c,
  d,
  m,
  p,
  f2 as f,
  b,
  v,
  w,
  x,
  y,
  h,
  T,
  q
};
/*! Bundled license information:

@ionic/core/components/p-o8OKV5aD.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/p-C7II1iDj.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=chunk-P5MVHJUJ.js.map
