import {
  I,
  r
} from "./chunk-NSODBGUP.js";

// node_modules/@ionic/core/components/p-DX5m9g56.js
var n = (t) => document.querySelector(`${t}.ion-cloned-element`);
var a = (t) => t.shadowRoot || t;
var s = (t) => {
  const o = "ION-TABS" === t.tagName ? t : t.querySelector("ion-tabs"), n2 = "ion-content ion-header:not(.header-collapse-condense-inactive) ion-title.title-large";
  if (null != o) {
    const t2 = o.querySelector("ion-tab:not(.tab-hidden), .ion-page:not(.ion-page-hidden)");
    return null != t2 ? t2.querySelector(n2) : null;
  }
  return t.querySelector(n2);
};
var e = (t, o) => {
  const n2 = "ION-TABS" === t.tagName ? t : t.querySelector("ion-tabs");
  let a2 = [];
  if (null != n2) {
    const t2 = n2.querySelector("ion-tab:not(.tab-hidden), .ion-page:not(.ion-page-hidden)");
    null != t2 && (a2 = t2.querySelectorAll("ion-buttons"));
  } else a2 = t.querySelectorAll("ion-buttons");
  for (const t2 of a2) {
    const n3 = t2.closest("ion-header"), a3 = n3 && !n3.classList.contains("header-collapse-condense-inactive"), s2 = t2.querySelector("ion-back-button"), e2 = t2.classList.contains("buttons-collapse");
    if (null !== s2 && ("start" === t2.slot || "" === t2.slot) && (e2 && a3 && o || !e2)) return s2;
  }
  return null;
};
var r2 = (o, s2, e2, r3, i2, l2, f, p, d) => {
  var $, u;
  const b = s2 ? `calc(100% - ${i2.right + 4}px)` : i2.left - 4 + "px", m = s2 ? "right" : "left", y = s2 ? "left" : "right", X = s2 ? "right" : "left";
  let x = 1, v = 1, h = `scale(${v})`;
  const g = "scale(1)";
  if (l2 && f) {
    const t = (null === ($ = l2.textContent) || void 0 === $ ? void 0 : $.trim()) === (null === (u = p.textContent) || void 0 === u ? void 0 : u.trim());
    x = d.width / f.width, v = (d.height - c) / f.height, h = t ? `scale(${x}, ${v})` : `scale(${v})`;
  }
  const w = a(r3).querySelector("ion-icon").getBoundingClientRect(), k = s2 ? w.width / 2 - (w.right - i2.right) + "px" : i2.left - w.width / 2 + "px", T = s2 ? `-${window.innerWidth - i2.right}px` : `${i2.left}px`, A = `${d.top}px`, j = `${i2.top}px`, B = e2 ? [{ offset: 0, transform: `translate3d(${T}, ${j}, 0)` }, { offset: 1, transform: `translate3d(${k}, ${A}, 0)` }] : [{ offset: 0, transform: `translate3d(${k}, ${A}, 0)` }, { offset: 1, transform: `translate3d(${T}, ${j}, 0)` }], I2 = e2 ? [{ offset: 0, opacity: 1, transform: g }, { offset: 1, opacity: 0, transform: h }] : [{ offset: 0, opacity: 0, transform: h }, { offset: 1, opacity: 1, transform: g }], N = e2 ? [{ offset: 0, opacity: 1, transform: "scale(1)" }, { offset: 0.2, opacity: 0, transform: "scale(0.6)" }, { offset: 1, opacity: 0, transform: "scale(0.6)" }] : [{ offset: 0, opacity: 0, transform: "scale(0.6)" }, { offset: 0.6, opacity: 0, transform: "scale(0.6)" }, { offset: 1, opacity: 1, transform: "scale(1)" }], O = r(), S = r(), z = r(), C = n("ion-back-button"), D = a(C).querySelector(".button-text"), R = a(C).querySelector("ion-icon");
  C.text = r3.text, C.mode = r3.mode, C.icon = r3.icon, C.color = r3.color, C.disabled = r3.disabled, C.style.setProperty("display", "block"), C.style.setProperty("position", "fixed"), S.addElement(R), O.addElement(D), z.addElement(C), z.beforeStyles({ position: "absolute", top: "0px", [X]: "0px" }).beforeAddWrite(() => {
    r3.style.setProperty("display", "none"), C.style.setProperty(m, b);
  }).afterAddWrite(() => {
    r3.style.setProperty("display", ""), C.style.setProperty("display", "none"), C.style.removeProperty(m);
  }).keyframes(B), O.beforeStyles({ "transform-origin": `${m} top` }).keyframes(I2), S.beforeStyles({ "transform-origin": `${y} center` }).keyframes(N), o.addAnimation([O, S, z]);
};
var i = (o, a2, s2, e2, r3, i2, l2, f, p) => {
  var d, $;
  const u = a2 ? "right" : "left", b = a2 ? `calc(100% - ${r3.right}px)` : `${r3.left}px`, m = `${r3.top}px`;
  let y = a2 ? `-${window.innerWidth - l2.right - 8}px` : `${l2.x + 8}px`, X = 0.5;
  const x = "scale(1)";
  let v = `scale(${X})`;
  if (f && p) {
    y = a2 ? `-${window.innerWidth - p.right - 8}px` : p.x - 8 + "px";
    const t = (null === (d = f.textContent) || void 0 === d ? void 0 : d.trim()) === (null === ($ = e2.textContent) || void 0 === $ ? void 0 : $.trim());
    X = p.height / (i2.height - c), v = t ? `scale(${p.width / i2.width}, ${X})` : `scale(${X})`;
  }
  const h = l2.top + l2.height / 2 - r3.height * X / 2 + "px", g = s2 ? [{ offset: 0, opacity: 0, transform: `translate3d(${y}, ${h}, 0) ${v}` }, { offset: 0.1, opacity: 0 }, { offset: 1, opacity: 1, transform: `translate3d(0px, ${m}, 0) ${x}` }] : [{ offset: 0, opacity: 0.99, transform: `translate3d(0px, ${m}, 0) ${x}` }, { offset: 0.6, opacity: 0 }, { offset: 1, opacity: 0, transform: `translate3d(${y}, ${h}, 0) ${v}` }], w = n("ion-title"), k = r();
  w.innerText = e2.innerText, w.size = e2.size, w.color = e2.color, k.addElement(w), k.beforeStyles({ "transform-origin": `${u} top`, height: `${r3.height}px`, display: "", position: "relative", [u]: b }).beforeAddWrite(() => {
    e2.style.setProperty("opacity", "0");
  }).afterAddWrite(() => {
    e2.style.setProperty("opacity", ""), w.style.setProperty("display", "none");
  }).keyframes(g), o.addAnimation(k);
};
var l = (n2, l2) => {
  var c2;
  try {
    const f = "cubic-bezier(0.32,0.72,0,1)", p = "opacity", d = "transform", $ = "0%", u = 0.8, b = "rtl" === n2.ownerDocument.dir, m = b ? "-99.5%" : "99.5%", y = b ? "33%" : "-33%", X = l2.enteringEl, x = l2.leavingEl, v = "back" === l2.direction, h = X.querySelector(":scope > ion-content"), g = X.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"), w = X.querySelectorAll(":scope > ion-header > ion-toolbar"), k = r(), T = r();
    if (k.addElement(X).duration((null !== (c2 = l2.duration) && void 0 !== c2 ? c2 : 0) || 540).easing(l2.easing || f).fill("both").beforeRemoveClass("ion-page-invisible"), x && null != n2) {
      const o = r();
      o.addElement(n2), k.addAnimation(o);
    }
    if (h || 0 !== w.length || 0 !== g.length ? (T.addElement(h), T.addElement(g)) : T.addElement(X.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")), k.addAnimation(T), v ? T.beforeClearStyles([p]).fromTo("transform", `translateX(${y})`, `translateX(${$})`).fromTo(p, u, 1) : T.beforeClearStyles([p]).fromTo("transform", `translateX(${m})`, `translateX(${$})`), h) {
      const o = a(h).querySelector(".transition-effect");
      if (o) {
        const n3 = o.querySelector(".transition-cover"), a2 = o.querySelector(".transition-shadow"), s2 = r(), e2 = r(), r3 = r();
        s2.addElement(o).beforeStyles({ opacity: "1", display: "block" }).afterStyles({ opacity: "", display: "" }), e2.addElement(n3).beforeClearStyles([p]).fromTo(p, 0, 0.1), r3.addElement(a2).beforeClearStyles([p]).fromTo(p, 0.03, 0.7), s2.addAnimation([e2, r3]), T.addAnimation([s2]);
      }
    }
    const A = X.querySelector("ion-header.header-collapse-condense"), { forward: j, backward: B } = ((t, o, n3, l3, c3) => {
      const f2 = e(l3, n3), p2 = s(c3), d2 = s(l3), $2 = e(c3, n3), u2 = null !== f2 && null !== p2 && !n3, b2 = null !== d2 && null !== $2 && n3;
      if (u2) {
        const s2 = p2.getBoundingClientRect(), e2 = f2.getBoundingClientRect(), l4 = a(f2).querySelector(".button-text"), c4 = null == l4 ? void 0 : l4.getBoundingClientRect(), d3 = a(p2).querySelector(".toolbar-title").getBoundingClientRect();
        i(t, o, n3, p2, s2, d3, e2, l4, c4), r2(t, o, n3, f2, e2, l4, c4, p2, d3);
      } else if (b2) {
        const s2 = d2.getBoundingClientRect(), e2 = $2.getBoundingClientRect(), l4 = a($2).querySelector(".button-text"), c4 = null == l4 ? void 0 : l4.getBoundingClientRect(), f3 = a(d2).querySelector(".toolbar-title").getBoundingClientRect();
        i(t, o, n3, d2, s2, f3, e2, l4, c4), r2(t, o, n3, $2, e2, l4, c4, d2, f3);
      }
      return { forward: u2, backward: b2 };
    })(k, b, v, X, x);
    if (w.forEach((o) => {
      const n3 = r();
      n3.addElement(o), k.addAnimation(n3);
      const s2 = r();
      s2.addElement(o.querySelector("ion-title"));
      const e2 = r(), r3 = Array.from(o.querySelectorAll("ion-buttons,[menuToggle]")), i2 = o.closest("ion-header"), l3 = null == i2 ? void 0 : i2.classList.contains("header-collapse-condense-inactive");
      let c3;
      c3 = r3.filter(v ? (t) => {
        const o2 = t.classList.contains("buttons-collapse");
        return o2 && !l3 || !o2;
      } : (t) => !t.classList.contains("buttons-collapse")), e2.addElement(c3);
      const f2 = r();
      f2.addElement(o.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])"));
      const d2 = r();
      d2.addElement(a(o).querySelector(".toolbar-background"));
      const u2 = r(), X2 = o.querySelector("ion-back-button");
      if (X2 && u2.addElement(X2), n3.addAnimation([s2, e2, f2, d2, u2]), e2.fromTo(p, 0.01, 1), f2.fromTo(p, 0.01, 1), v) l3 || s2.fromTo("transform", `translateX(${y})`, `translateX(${$})`).fromTo(p, 0.01, 1), f2.fromTo("transform", `translateX(${y})`, `translateX(${$})`), u2.fromTo(p, 0.01, 1);
      else if (A || s2.fromTo("transform", `translateX(${m})`, `translateX(${$})`).fromTo(p, 0.01, 1), f2.fromTo("transform", `translateX(${m})`, `translateX(${$})`), d2.beforeClearStyles([p, "transform"]), (null == i2 ? void 0 : i2.translucent) ? d2.fromTo("transform", b ? "translateX(-100%)" : "translateX(100%)", "translateX(0px)") : d2.fromTo(p, 0.01, "var(--opacity)"), j || u2.fromTo(p, 0.01, 1), X2 && !j) {
        const o2 = r();
        o2.addElement(a(X2).querySelector(".button-text")).fromTo("transform", b ? "translateX(-100px)" : "translateX(100px)", "translateX(0px)"), n3.addAnimation(o2);
      }
    }), x) {
      const n3 = r(), s2 = x.querySelector(":scope > ion-content"), e2 = x.querySelectorAll(":scope > ion-header > ion-toolbar"), r3 = x.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *");
      if (s2 || 0 !== e2.length || 0 !== r3.length ? (n3.addElement(s2), n3.addElement(r3)) : n3.addElement(x.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")), k.addAnimation(n3), v) {
        n3.beforeClearStyles([p]).fromTo("transform", `translateX(${$})`, b ? "translateX(-100%)" : "translateX(100%)");
        const t = I(x);
        k.afterAddWrite(() => {
          "normal" === k.getDirection() && t.style.setProperty("display", "none");
        });
      } else n3.fromTo("transform", `translateX(${$})`, `translateX(${y})`).fromTo(p, 1, u);
      if (s2) {
        const o = a(s2).querySelector(".transition-effect");
        if (o) {
          const a2 = o.querySelector(".transition-cover"), s3 = o.querySelector(".transition-shadow"), e3 = r(), r4 = r(), i2 = r();
          e3.addElement(o).beforeStyles({ opacity: "1", display: "block" }).afterStyles({ opacity: "", display: "" }), r4.addElement(a2).beforeClearStyles([p]).fromTo(p, 0.1, 0), i2.addElement(s3).beforeClearStyles([p]).fromTo(p, 0.7, 0.03), e3.addAnimation([r4, i2]), n3.addAnimation([e3]);
        }
      }
      e2.forEach((o) => {
        const n4 = r();
        n4.addElement(o);
        const s3 = r();
        s3.addElement(o.querySelector("ion-title"));
        const e3 = r(), r4 = o.querySelectorAll("ion-buttons,[menuToggle]"), i2 = o.closest("ion-header"), l3 = null == i2 ? void 0 : i2.classList.contains("header-collapse-condense-inactive"), c3 = Array.from(r4).filter((t) => {
          const o2 = t.classList.contains("buttons-collapse");
          return o2 && !l3 || !o2;
        });
        e3.addElement(c3);
        const f2 = r(), u2 = o.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])");
        u2.length > 0 && f2.addElement(u2);
        const m2 = r();
        m2.addElement(a(o).querySelector(".toolbar-background"));
        const X2 = r(), x2 = o.querySelector("ion-back-button");
        if (x2 && X2.addElement(x2), n4.addAnimation([s3, e3, f2, X2, m2]), k.addAnimation(n4), X2.fromTo(p, 0.99, 0), e3.fromTo(p, 0.99, 0), f2.fromTo(p, 0.99, 0), v) {
          if (l3 || s3.fromTo("transform", `translateX(${$})`, b ? "translateX(-100%)" : "translateX(100%)").fromTo(p, 0.99, 0), f2.fromTo("transform", `translateX(${$})`, b ? "translateX(-100%)" : "translateX(100%)"), m2.beforeClearStyles([p, "transform"]), (null == i2 ? void 0 : i2.translucent) ? m2.fromTo("transform", "translateX(0px)", b ? "translateX(-100%)" : "translateX(100%)") : m2.fromTo(p, "var(--opacity)", 0), x2 && !B) {
            const o2 = r();
            o2.addElement(a(x2).querySelector(".button-text")).fromTo("transform", `translateX(${$})`, `translateX(${(b ? -124 : 124) + "px"})`), n4.addAnimation(o2);
          }
        } else l3 || s3.fromTo("transform", `translateX(${$})`, `translateX(${y})`).fromTo(p, 0.99, 0).afterClearStyles([d, p]), f2.fromTo("transform", `translateX(${$})`, `translateX(${y})`).afterClearStyles([d, p]), X2.afterClearStyles([p]), s3.afterClearStyles([p]), e3.afterClearStyles([p]);
      });
    }
    return k;
  } catch (t) {
    throw t;
  }
};
var c = 10;

export {
  a,
  l
};
/*! Bundled license information:

@ionic/core/components/p-DX5m9g56.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=chunk-JN2OOQME.js.map
