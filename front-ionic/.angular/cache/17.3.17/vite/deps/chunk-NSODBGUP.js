import {
  d as d2
} from "./chunk-6QVAYI7G.js";
import {
  m
} from "./chunk-P5MVHJUJ.js";
import {
  P,
  d,
  f,
  n,
  u
} from "./chunk-CN5C4E5W.js";
import {
  __async
} from "./chunk-WDMUDEB6.js";

// node_modules/@ionic/core/components/p-CmR5uXej.js
var t;
var i = (e, o, i2) => {
  const n3 = o.startsWith("animation") ? (r3 = e, void 0 === t && (t = void 0 === r3.style.animationName && void 0 !== r3.style.webkitAnimationName ? "-webkit-" : ""), t) : "";
  var r3;
  e.style.setProperty(n3 + o, i2);
};
var n2 = (e = [], o) => {
  if (void 0 !== o) {
    const t3 = Array.isArray(o) ? o : [o];
    return [...e, ...t3];
  }
  return e;
};
var r = (t3) => {
  let r3, a, s2, d4, l2, f3, c2, v2, m3, u3, p2, y2 = [], g2 = [], A2 = [], b2 = false, C2 = {}, E2 = [], h2 = [], R = {}, S = 0, j2 = false, k2 = false, w2 = true, T = false, D2 = true, F = false;
  const W2 = t3, I2 = [], K = [], M2 = [], P3 = [], Y = [], Z = [], q2 = [], x = [], H = [], z = [], B = [], G = "function" == typeof AnimationEffect || void 0 !== d2 && "function" == typeof d2.AnimationEffect, J = "function" == typeof Element && "function" == typeof Element.prototype.animate && G, L2 = () => B, N = (e, o) => {
    const t4 = o.findIndex((o2) => o2.c === e);
    t4 > -1 && o.splice(t4, 1);
  }, O = (e, o) => (((null == o ? void 0 : o.oneTimeCallback) ? K : I2).push({ c: e, o }), p2), Q = () => {
    J && (B.forEach((e) => {
      e.cancel();
    }), B.length = 0);
  }, U2 = () => {
    Z.forEach((e) => {
      (null == e ? void 0 : e.parentNode) && e.parentNode.removeChild(e);
    }), Z.length = 0;
  }, V2 = () => void 0 !== l2 ? l2 : c2 ? c2.getFill() : "both", X = () => void 0 !== v2 ? v2 : void 0 !== f3 ? f3 : c2 ? c2.getDirection() : "normal", $ = () => j2 ? "linear" : void 0 !== s2 ? s2 : c2 ? c2.getEasing() : "linear", _ = () => k2 ? 0 : void 0 !== m3 ? m3 : void 0 !== a ? a : c2 ? c2.getDuration() : 0, ee = () => void 0 !== d4 ? d4 : c2 ? c2.getIterations() : 1, oe = () => void 0 !== u3 ? u3 : void 0 !== r3 ? r3 : c2 ? c2.getDelay() : 0, te = () => {
    0 !== S && (S--, 0 === S && ((() => {
      H.forEach((e2) => e2()), z.forEach((e2) => e2());
      const e = w2 ? 1 : 0, o = E2, t4 = h2, n3 = R;
      P3.forEach((e2) => {
        const r4 = e2.classList;
        o.forEach((e3) => r4.add(e3)), t4.forEach((e3) => r4.remove(e3));
        for (const o2 in n3) n3.hasOwnProperty(o2) && i(e2, o2, n3[o2]);
      }), m3 = void 0, v2 = void 0, u3 = void 0, I2.forEach((o2) => o2.c(e, p2)), K.forEach((o2) => o2.c(e, p2)), K.length = 0, D2 = true, w2 && (T = true), w2 = true;
    })(), c2 && c2.animationFinish()));
  }, ie = () => {
    (() => {
      q2.forEach((e2) => e2()), x.forEach((e2) => e2());
      const e = g2, o = A2, t4 = C2;
      P3.forEach((n3) => {
        const r4 = n3.classList;
        e.forEach((e2) => r4.add(e2)), o.forEach((e2) => r4.remove(e2));
        for (const e2 in t4) t4.hasOwnProperty(e2) && i(n3, e2, t4[e2]);
      });
    })(), y2.length > 0 && J && (P3.forEach((e) => {
      const o = e.animate(y2, { id: W2, delay: oe(), duration: _(), easing: $(), iterations: ee(), fill: V2(), direction: X() });
      o.pause(), B.push(o);
    }), B.length > 0 && (B[0].onfinish = () => {
      te();
    })), b2 = true;
  }, ne = (e) => {
    e = Math.min(Math.max(e, 0), 0.9999), J && B.forEach((o) => {
      o.currentTime = o.effect.getComputedTiming().delay + _() * e, o.pause();
    });
  }, re = (e) => {
    B.forEach((e2) => {
      e2.effect.updateTiming({ delay: oe(), duration: _(), easing: $(), iterations: ee(), fill: V2(), direction: X() });
    }), void 0 !== e && ne(e);
  }, ae = (e = false, o = true, t4) => (e && Y.forEach((i2) => {
    i2.update(e, o, t4);
  }), J && re(t4), p2), se = () => {
    b2 && (J ? B.forEach((e) => {
      e.pause();
    }) : P3.forEach((e) => {
      i(e, "animation-play-state", "paused");
    }), F = true);
  }, de = (e) => new Promise((o) => {
    (null == e ? void 0 : e.sync) && (k2 = true, O(() => k2 = false, { oneTimeCallback: true })), b2 || ie(), T && (J && (ne(0), re()), T = false), D2 && (S = Y.length + 1, D2 = false);
    const t4 = () => {
      N(i2, K), o();
    }, i2 = () => {
      N(t4, M2), o();
    };
    O(i2, { oneTimeCallback: true }), M2.push({ c: t4, o: { oneTimeCallback: true } }), Y.forEach((e2) => {
      e2.play();
    }), J ? (B.forEach((e2) => {
      e2.play();
    }), 0 !== y2.length && 0 !== P3.length || te()) : te(), F = false;
  }), le = (e, o) => {
    const t4 = y2[0];
    return void 0 === t4 || void 0 !== t4.offset && 0 !== t4.offset ? y2 = [{ offset: 0, [e]: o }, ...y2] : t4[e] = o, p2;
  };
  return p2 = { parentAnimation: c2, elements: P3, childAnimations: Y, id: W2, animationFinish: te, from: le, to: (e, o) => {
    const t4 = y2[y2.length - 1];
    return void 0 === t4 || void 0 !== t4.offset && 1 !== t4.offset ? y2 = [...y2, { offset: 1, [e]: o }] : t4[e] = o, p2;
  }, fromTo: (e, o, t4) => le(e, o).to(e, t4), parent: (e) => (c2 = e, p2), play: de, pause: () => (Y.forEach((e) => {
    e.pause();
  }), se(), p2), stop: () => {
    Y.forEach((e) => {
      e.stop();
    }), b2 && (Q(), b2 = false), j2 = false, k2 = false, D2 = true, v2 = void 0, m3 = void 0, u3 = void 0, S = 0, T = false, w2 = true, F = false, M2.forEach((e) => e.c(0, p2)), M2.length = 0;
  }, destroy: (e) => (Y.forEach((o) => {
    o.destroy(e);
  }), ((e2) => {
    Q(), e2 && U2();
  })(e), P3.length = 0, Y.length = 0, y2.length = 0, I2.length = 0, K.length = 0, b2 = false, D2 = true, p2), keyframes: (e) => {
    const o = y2 !== e;
    return y2 = e, o && ((e2) => {
      J && L2().forEach((o2) => {
        const t4 = o2.effect;
        if (t4.setKeyframes) t4.setKeyframes(e2);
        else {
          const i2 = new KeyframeEffect(t4.target, e2, t4.getTiming());
          o2.effect = i2;
        }
      });
    })(y2), p2;
  }, addAnimation: (e) => {
    if (null != e) if (Array.isArray(e)) for (const o of e) o.parent(p2), Y.push(o);
    else e.parent(p2), Y.push(e);
    return p2;
  }, addElement: (o) => {
    if (null != o) if (1 === o.nodeType) P3.push(o);
    else if (o.length >= 0) for (let e = 0; e < o.length; e++) P3.push(o[e]);
    else f("createAnimation - Invalid addElement value.");
    return p2;
  }, update: ae, fill: (e) => (l2 = e, ae(true), p2), direction: (e) => (f3 = e, ae(true), p2), iterations: (e) => (d4 = e, ae(true), p2), duration: (e) => (J || 0 !== e || (e = 1), a = e, ae(true), p2), easing: (e) => (s2 = e, ae(true), p2), delay: (e) => (r3 = e, ae(true), p2), getWebAnimations: L2, getKeyframes: () => y2, getFill: V2, getDirection: X, getDelay: oe, getIterations: ee, getEasing: $, getDuration: _, afterAddRead: (e) => (H.push(e), p2), afterAddWrite: (e) => (z.push(e), p2), afterClearStyles: (e = []) => {
    for (const o of e) R[o] = "";
    return p2;
  }, afterStyles: (e = {}) => (R = e, p2), afterRemoveClass: (e) => (h2 = n2(h2, e), p2), afterAddClass: (e) => (E2 = n2(E2, e), p2), beforeAddRead: (e) => (q2.push(e), p2), beforeAddWrite: (e) => (x.push(e), p2), beforeClearStyles: (e = []) => {
    for (const o of e) C2[o] = "";
    return p2;
  }, beforeStyles: (e = {}) => (C2 = e, p2), beforeRemoveClass: (e) => (A2 = n2(A2, e), p2), beforeAddClass: (e) => (g2 = n2(g2, e), p2), onFinish: O, isRunning: () => 0 !== S && !F, progressStart: (e = false, o) => (Y.forEach((t4) => {
    t4.progressStart(e, o);
  }), se(), j2 = e, b2 || ie(), ae(false, true, o), p2), progressStep: (e) => (Y.forEach((o) => {
    o.progressStep(e);
  }), ne(e), p2), progressEnd: (e, o, t4) => (j2 = false, Y.forEach((i2) => {
    i2.progressEnd(e, o, t4);
  }), void 0 !== t4 && (m3 = t4), T = false, w2 = true, 0 === e ? (v2 = "reverse" === X() ? "normal" : "reverse", "reverse" === v2 && (w2 = false), J ? (ae(), ne(1 - o)) : (u3 = (1 - o) * _() * -1, ae(false, false))) : 1 === e && (J ? (ae(), ne(o)) : (u3 = o * _() * -1, ae(false, false))), void 0 === e || c2 || de(), p2) };
};

// node_modules/@ionic/core/components/p-BDd9Zrb9.js
var r2 = "ionViewWillEnter";
var t2 = "ionViewDidEnter";
var s = "ionViewWillLeave";
var c = "ionViewDidLeave";
var l = "ionViewWillUnload";
var u2 = (n3) => {
  n3.tabIndex = -1, n3.focus();
};
var d3 = (n3) => null !== n3.offsetParent;
var f2 = "ion-last-focus";
var w = (e) => {
  if (n.get("focusManagerPriority", false)) {
    const n3 = document.activeElement;
    null !== n3 && (null == e ? void 0 : e.contains(n3)) && n3.setAttribute(f2, "true");
  }
};
var p = (i2) => {
  const a = n.get("focusManagerPriority", false);
  if (Array.isArray(a) && !i2.contains(document.activeElement)) {
    const n3 = i2.querySelector(`[${f2}]`);
    if (n3 && d3(n3)) return void u2(n3);
    for (const n4 of a) switch (n4) {
      case "content":
        const a2 = i2.querySelector('main, [role="main"]');
        if (a2 && d3(a2)) return void u2(a2);
        break;
      case "heading":
        const o = i2.querySelector('h1, [role="heading"][aria-level="1"]');
        if (o && d3(o)) return void u2(o);
        break;
      case "banner":
        const r3 = i2.querySelector('header, [role="banner"]');
        if (r3 && d3(r3)) return void u2(r3);
        break;
      default:
        u(`Unrecognized focus manager priority value ${n4}`);
    }
    u2(i2);
  }
};
var v = (n3) => new Promise((e, a) => {
  P(() => {
    const i2 = U(n3);
    m2(n3, i2), g(n3).then((i3) => {
      i3.animation && i3.animation.destroy(), b(n3), e(i3);
    }, (e2) => {
      b(n3), a(e2);
    }).finally(() => {
      A(i2, false);
    });
  });
});
var m2 = (n3, e) => {
  const i2 = n3.enteringEl, a = n3.leavingEl;
  w(a), q(i2, a, n3.direction), A(e, true), n3.showGoBack ? i2.classList.add("can-go-back") : i2.classList.remove("can-go-back"), W(i2, false), i2.style.setProperty("pointer-events", "none"), a && (W(a, false), a.style.setProperty("pointer-events", "none"));
};
var g = (n3) => __async(void 0, null, function* () {
  const e = yield h(n3);
  return e && d.isBrowser ? y(e, n3) : P2(n3);
});
var b = (n3) => {
  const e = n3.enteringEl, i2 = n3.leavingEl;
  e.classList.remove("ion-page-invisible"), e.style.removeProperty("pointer-events"), void 0 !== i2 && (i2.classList.remove("ion-page-invisible"), i2.style.removeProperty("pointer-events")), p(e);
};
var h = (n3) => __async(void 0, null, function* () {
  if (n3.leavingEl && n3.animated && 0 !== n3.duration) return n3.animationBuilder ? n3.animationBuilder : "ios" === n3.mode ? (yield import("./p-DX5m9g56-V2JL7FGC.js")).iosTransitionAnimation : (yield import("./p-Dw7GNDKq-BUCKESBW.js")).mdTransitionAnimation;
});
var y = (n3, e) => __async(void 0, null, function* () {
  yield k(e, true);
  const i2 = n3(e.baseEl, e);
  C(e.enteringEl, e.leavingEl);
  const a = yield j(i2, e);
  return e.progressCallback && e.progressCallback(void 0), a && V(e.enteringEl, e.leavingEl), { hasCompleted: a, animation: i2 };
});
var P2 = (e) => __async(void 0, null, function* () {
  const i2 = e.enteringEl, a = e.leavingEl, o = n.get("focusManagerPriority", false);
  return yield k(e, o), C(i2, a), V(i2, a), { hasCompleted: true };
});
var k = (n3, e) => __async(void 0, null, function* () {
  (void 0 !== n3.deepWait ? n3.deepWait : e) && (yield Promise.all([M(n3.enteringEl), M(n3.leavingEl)])), yield D(n3.viewIsReady, n3.enteringEl);
});
var D = (n3, e) => __async(void 0, null, function* () {
  n3 && (yield n3(e));
});
var j = (n3, e) => {
  const i2 = e.progressCallback, a = new Promise((e2) => {
    n3.onFinish((n4) => e2(1 === n4));
  });
  return i2 ? (n3.progressStart(true), i2(n3)) : n3.play(), a;
};
var C = (n3, e) => {
  E(e, s), E(n3, r2);
};
var V = (n3, e) => {
  E(n3, t2), E(e, c);
};
var E = (n3, e) => {
  if (n3) {
    const i2 = new CustomEvent(e, { bubbles: false, cancelable: false });
    n3.dispatchEvent(i2);
  }
};
var L = () => new Promise((n3) => m(() => m(() => n3())));
var M = (n3) => __async(void 0, null, function* () {
  const e = n3;
  if (e) {
    if (null != e.componentOnReady) {
      if (null != (yield e.componentOnReady())) return;
    } else if (null != e.__registerHost) {
      const n4 = new Promise((n5) => m(n5));
      return void (yield n4);
    }
    yield Promise.all(Array.from(e.children).map(M));
  }
});
var W = (n3, e) => {
  e ? (n3.setAttribute("aria-hidden", "true"), n3.classList.add("ion-page-hidden")) : (n3.hidden = false, n3.removeAttribute("aria-hidden"), n3.classList.remove("ion-page-hidden"));
};
var q = (n3, e, i2) => {
  void 0 !== n3 && (n3.style.zIndex = "back" === i2 ? "99" : "101"), void 0 !== e && (e.style.zIndex = "100");
};
var A = (n3, e) => {
  if (!n3) return;
  const i2 = "header-transitioning";
  e ? n3.classList.add(i2) : n3.classList.remove(i2);
};
var I = (n3) => {
  if (n3.classList.contains("ion-page")) return n3;
  return n3.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs") || n3;
};
var U = (n3) => {
  if ("ios" !== n3.mode) return null;
  const e = "back" === n3.direction ? n3.leavingEl : n3.enteringEl;
  return e ? e.querySelector("ion-header") : null;
};

export {
  r,
  r2,
  t2 as t,
  s,
  c,
  l,
  v,
  E,
  L,
  M,
  W,
  I
};
/*! Bundled license information:

@ionic/core/components/p-CmR5uXej.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/p-BDd9Zrb9.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=chunk-NSODBGUP.js.map
