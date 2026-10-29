import {
  i,
  t as t2
} from "./chunk-QHH5CHKT.js";
import {
  a,
  l,
  m
} from "./chunk-ZK2EBCFA.js";
import {
  d,
  o
} from "./chunk-6QVAYI7G.js";
import {
  c,
  t,
  u
} from "./chunk-P5MVHJUJ.js";
import "./chunk-CN5C4E5W.js";
import {
  __async
} from "./chunk-WDMUDEB6.js";

// node_modules/@ionic/core/components/p-DmzFY5IC.js
var l2 = /* @__PURE__ */ new WeakMap();
var u2 = (o2, n, t3, i2 = 0, r = false) => {
  l2.has(o2) !== t3 && (t3 ? f(o2, n, i2, r) : w(o2, n));
};
var f = (o2, n, t3, i2 = false) => {
  const r = n.parentNode, a2 = n.cloneNode(false);
  a2.classList.add("cloned-input"), a2.tabIndex = -1, i2 && (a2.disabled = true);
  const e = "rtl" === o2.ownerDocument.dir;
  a2.style.insetInlineStart = e ? r.offsetWidth - n.offsetLeft - n.offsetWidth + "px" : `${n.offsetLeft}px`, r.appendChild(a2), l2.set(o2, a2);
  const s = e ? 9999 : -9999;
  o2.style.pointerEvents = "none", n.style.transform = `translate3d(${s}px,${t3}px,0) scale(0)`;
};
var w = (o2, n) => {
  const t3 = l2.get(o2);
  t3 && (l2.delete(o2), t3.remove()), o2.style.pointerEvents = "", n.style.transform = "";
};
var p = "input, textarea, [no-blur], [contenteditable]";
var m2 = "$ionPaddingTimer";
var h = (o2, n, t3) => {
  const i2 = o2[m2];
  i2 && clearTimeout(i2), n > 0 ? o2.style.setProperty("--keyboard-offset", `${n}px`) : o2[m2] = setTimeout(() => {
    o2.style.setProperty("--keyboard-offset", "0px"), t3 && t3();
  }, 120);
};
var b = (o2, n, t3) => {
  o2.addEventListener("focusout", () => {
    n && h(n, 0, t3);
  }, { once: true });
};
var y = 0;
var S = "data-ionic-skip-scroll-assist";
var v = (o2) => {
  var n;
  if (document.activeElement === o2) return;
  const t3 = o2.getAttribute("id"), i2 = o2.closest(`label[for="${t3}"]`), r = null === (n = document.activeElement) || void 0 === n ? void 0 : n.closest(`label[for="${t3}"]`);
  null !== i2 && i2 === r || (o2.setAttribute(S, "true"), o2.focus());
};
var D = (o2, n, r, a2, e, s, d2 = false, c2 = 0, l3 = true) => __async(void 0, null, function* () {
  if (!r && !a2) return;
  const f2 = ((o3, n2, t3, i2) => {
    var r2;
    return ((o4, n3, t4, i3) => {
      const r3 = o4.top, a3 = o4.bottom, e2 = n3.top, s2 = e2 + 15, d3 = Math.min(n3.bottom, i3 - t4) - 50 - a3, c3 = s2 - r3, l4 = Math.round(d3 < 0 ? -d3 : c3 > 0 ? -c3 : 0), u3 = Math.min(l4, r3 - e2), f3 = Math.abs(u3);
      return { scrollAmount: u3, scrollDuration: Math.min(400, Math.max(150, f3 / 0.3)), scrollPadding: t4, inputSafeY: 4 - (r3 - s2) };
    })((null !== (r2 = o3.closest("ion-item,[ion-item]")) && void 0 !== r2 ? r2 : o3).getBoundingClientRect(), n2.getBoundingClientRect(), t3, i2);
  })(o2, r || a2, e, c2);
  if (r && Math.abs(f2.scrollAmount) < 4) return v(n), void (s && null !== r && (h(r, y), b(n, r, () => y = 0)));
  if (u2(o2, n, true, f2.inputSafeY, d2), v(n), s && r && (y = f2.scrollPadding, h(r, y)), "undefined" != typeof window) {
    let a3;
    const e2 = () => __async(void 0, null, function* () {
      void 0 !== a3 && clearTimeout(a3), window.removeEventListener("ionKeyboardDidShow", d3), window.removeEventListener("ionKeyboardDidShow", e2), r && (yield m(r, 0, f2.scrollAmount, f2.scrollDuration)), u2(o2, n, false, f2.inputSafeY), document.activeElement === n && v(n), s && b(n, r, () => y = 0);
    }), d3 = () => {
      window.removeEventListener("ionKeyboardDidShow", d3), window.addEventListener("ionKeyboardDidShow", e2);
    };
    if (r) {
      const o3 = yield a(r);
      if (l3 && f2.scrollAmount > o3.scrollHeight - o3.clientHeight - o3.scrollTop) return "password" === n.type ? (f2.scrollAmount += 50, window.addEventListener("ionKeyboardDidShow", d3)) : window.addEventListener("ionKeyboardDidShow", e2), void (a3 = setTimeout(e2, 1e3));
    }
    e2();
  }
});
var x = (t3, i2) => __async(void 0, null, function* () {
  if (void 0 === o) return;
  const l3 = "ios" === i2, f2 = "android" === i2, w2 = t3.getNumber("keyboardHeight", 290), m3 = t3.getBoolean("scrollAssist", true), h2 = t3.getBoolean("hideCaretOnScroll", l3), b2 = t3.getBoolean("inputBlurring", false), y2 = t3.getBoolean("scrollPadding", true), v2 = Array.from(o.querySelectorAll("ion-input, ion-textarea")), x2 = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), M = yield t2.getResizeMode(), j = (n) => __async(void 0, null, function* () {
    yield new Promise((o2) => t(n, o2));
    const t4 = n.shadowRoot || n, i3 = t4.querySelector("input") || t4.querySelector("textarea"), c2 = l(n), l4 = c2 ? null : n.closest("ion-footer");
    if (i3) {
      if (c2 && h2 && !x2.has(n)) {
        const o2 = ((o3, n2, t5) => {
          if (!t5 || !n2) return () => {
          };
          const i4 = (t6) => {
            var i5;
            (i5 = n2) === i5.getRootNode().activeElement && u2(o3, n2, t6);
          }, r = () => u2(o3, n2, false), s = () => i4(true), d2 = () => i4(false);
          return u(t5, "ionScrollStart", s), u(t5, "ionScrollEnd", d2), n2.addEventListener("blur", r), () => {
            c(t5, "ionScrollStart", s), c(t5, "ionScrollEnd", d2), n2.removeEventListener("blur", r);
          };
        })(n, i3, c2);
        x2.set(n, o2);
      }
      if ("date" !== i3.type && "datetime-local" !== i3.type && (c2 || l4) && m3 && !K.has(n)) {
        const t5 = ((n2, t6, i4, r, a2, e, s, c3 = false) => {
          const l5 = e && (void 0 === s || s.mode === i.None);
          let u3 = false;
          const f3 = void 0 !== d ? d.innerHeight : 0, w3 = (o2) => {
            false !== u3 ? D(n2, t6, i4, r, o2.detail.keyboardHeight, l5, c3, f3, false) : u3 = true;
          }, p2 = () => {
            u3 = false, null == d || d.removeEventListener("ionKeyboardDidShow", w3), n2.removeEventListener("focusout", p2);
          }, m4 = () => __async(void 0, null, function* () {
            t6.hasAttribute(S) ? t6.removeAttribute(S) : (D(n2, t6, i4, r, a2, l5, c3, f3), null == d || d.addEventListener("ionKeyboardDidShow", w3), n2.addEventListener("focusout", p2));
          });
          return n2.addEventListener("focusin", m4), () => {
            n2.removeEventListener("focusin", m4), null == d || d.removeEventListener("ionKeyboardDidShow", w3), n2.removeEventListener("focusout", p2);
          };
        })(n, i3, c2, l4, w2, y2, M, f2);
        K.set(n, t5);
      }
    }
  });
  b2 && (() => {
    let o2 = true, n = false;
    const t4 = document;
    u(t4, "ionScrollStart", () => {
      n = true;
    }), t4.addEventListener("focusin", () => {
      o2 = true;
    }, true), t4.addEventListener("touchend", (i3) => {
      if (n) return void (n = false);
      const r = t4.activeElement;
      if (!r) return;
      if (r.matches(p)) return;
      const a2 = i3.target;
      a2 !== r && (a2.matches(p) || a2.closest(p) || (o2 = false, setTimeout(() => {
        o2 || r.blur();
      }, 50)));
    }, false);
  })();
  for (const o2 of v2) j(o2);
  o.addEventListener("ionInputDidLoad", (o2) => {
    j(o2.detail);
  }), o.addEventListener("ionInputDidUnload", (o2) => {
    ((o3) => {
      if (h2) {
        const n = x2.get(o3);
        n && n(), x2.delete(o3);
      }
      if (m3) {
        const n = K.get(o3);
        n && n(), K.delete(o3);
      }
    })(o2.detail);
  });
});
export {
  x as startInputShims
};
/*! Bundled license information:

@ionic/core/components/p-DmzFY5IC.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=p-DmzFY5IC-36HQGXIJ.js.map
