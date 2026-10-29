// node_modules/@ionic/core/components/p-BTEOs1at.js
var t = class {
  constructor(t3, s3, i3, h2, e) {
    this.id = s3, this.name = i3, this.disableScroll = e, this.priority = 1e6 * h2 + s3, this.ctrl = t3;
  }
  canStart() {
    return !!this.ctrl && this.ctrl.canStart(this.name);
  }
  start() {
    return !!this.ctrl && this.ctrl.start(this.name, this.id, this.priority);
  }
  capture() {
    if (!this.ctrl) return false;
    const t3 = this.ctrl.capture(this.name, this.id, this.priority);
    return t3 && this.disableScroll && this.ctrl.disableScroll(this.id), t3;
  }
  release() {
    this.ctrl && (this.ctrl.release(this.id), this.disableScroll && this.ctrl.enableScroll(this.id));
  }
  destroy() {
    this.release(), this.ctrl = void 0;
  }
};
var s = class {
  constructor(t3, s3, i3, h2) {
    this.id = s3, this.disable = i3, this.disableScroll = h2, this.ctrl = t3;
  }
  block() {
    if (this.ctrl) {
      if (this.disable) for (const t3 of this.disable) this.ctrl.disableGesture(t3, this.id);
      this.disableScroll && this.ctrl.disableScroll(this.id);
    }
  }
  unblock() {
    if (this.ctrl) {
      if (this.disable) for (const t3 of this.disable) this.ctrl.enableGesture(t3, this.id);
      this.disableScroll && this.ctrl.enableScroll(this.id);
    }
  }
  destroy() {
    this.unblock(), this.ctrl = void 0;
  }
};
var i = "backdrop-no-scroll";
var h = new class {
  constructor() {
    this.gestureId = 0, this.requestedStart = /* @__PURE__ */ new Map(), this.disabledGestures = /* @__PURE__ */ new Map(), this.disabledScroll = /* @__PURE__ */ new Set();
  }
  createGesture(s3) {
    var i3;
    return new t(this, this.newID(), s3.name, null !== (i3 = s3.priority) && void 0 !== i3 ? i3 : 0, !!s3.disableScroll);
  }
  createBlocker(t3 = {}) {
    return new s(this, this.newID(), t3.disable, !!t3.disableScroll);
  }
  start(t3, s3, i3) {
    return this.canStart(t3) ? (this.requestedStart.set(s3, i3), true) : (this.requestedStart.delete(s3), false);
  }
  capture(t3, s3, i3) {
    if (!this.start(t3, s3, i3)) return false;
    const h2 = this.requestedStart;
    let e = -1e4;
    if (h2.forEach((t4) => {
      e = Math.max(e, t4);
    }), e === i3) {
      this.capturedId = s3, h2.clear();
      const i4 = new CustomEvent("ionGestureCaptured", { detail: { gestureName: t3 } });
      return document.dispatchEvent(i4), true;
    }
    return h2.delete(s3), false;
  }
  release(t3) {
    this.requestedStart.delete(t3), this.capturedId === t3 && (this.capturedId = void 0);
  }
  disableGesture(t3, s3) {
    let i3 = this.disabledGestures.get(t3);
    void 0 === i3 && (i3 = /* @__PURE__ */ new Set(), this.disabledGestures.set(t3, i3)), i3.add(s3);
  }
  enableGesture(t3, s3) {
    const i3 = this.disabledGestures.get(t3);
    void 0 !== i3 && i3.delete(s3);
  }
  disableScroll(t3) {
    this.disabledScroll.add(t3), 1 === this.disabledScroll.size && document.body.classList.add(i);
  }
  enableScroll(t3) {
    this.disabledScroll.delete(t3), 0 === this.disabledScroll.size && document.body.classList.remove(i);
  }
  canStart(t3) {
    return void 0 === this.capturedId && !this.isDisabled(t3);
  }
  isCaptured() {
    return void 0 !== this.capturedId;
  }
  isScrollDisabled() {
    return this.disabledScroll.size > 0;
  }
  isDisabled(t3) {
    const s3 = this.disabledGestures.get(t3);
    return !!(s3 && s3.size > 0);
  }
  newID() {
    return this.gestureId++, this.gestureId;
  }
}();

// node_modules/@ionic/core/components/p-BYRVyMu9.js
var t2 = (e, t3, o2, n2) => {
  const r2 = { capture: false, passive: !!n2.passive };
  let s3, i3;
  return e.__zone_symbol__addEventListener ? (s3 = "__zone_symbol__addEventListener", i3 = "__zone_symbol__removeEventListener") : (s3 = "addEventListener", i3 = "removeEventListener"), e[s3](t3, o2, r2), () => {
    e[i3](t3, o2, r2);
  };
};
var o = (e) => e instanceof Document ? e : e.ownerDocument;
var n = (n2) => {
  let c = false, a = false, d = true, u = false;
  const l = Object.assign({ disableScroll: false, direction: "x", gesturePriority: 0, passive: true, maxAngle: 40, threshold: 10 }, n2), v = l.canStart, m = l.onWillStart, p = l.onStart, f = l.onEnd, y = l.notCaptured, _ = l.onMove, h2 = l.threshold, b = l.passive, D = l.blurOnStart, E = { type: "pan", startX: 0, startY: 0, startTime: 0, currentX: 0, currentY: 0, velocityX: 0, velocityY: 0, deltaX: 0, deltaY: 0, currentTime: 0, event: void 0, data: void 0 }, x = ((e, t3, o2) => {
    const n3 = o2 * (Math.PI / 180), r2 = "x" === e, s3 = Math.cos(n3), i3 = t3 * t3;
    let c2 = 0, a2 = 0, d2 = false, u2 = 0;
    return { start(e2, t4) {
      c2 = e2, a2 = t4, u2 = 0, d2 = true;
    }, detect(e2, t4) {
      if (!d2) return false;
      const o3 = e2 - c2, n4 = t4 - a2, l2 = o3 * o3 + n4 * n4;
      if (l2 < i3) return false;
      const v2 = Math.sqrt(l2), m2 = (r2 ? o3 : n4) / v2;
      return u2 = m2 > s3 ? 1 : m2 < -s3 ? -1 : 0, d2 = false, true;
    }, isGesture: () => 0 !== u2, getDirection: () => u2 };
  })(l.direction, l.threshold, l.maxAngle), L = h.createGesture({ name: n2.gestureName, priority: n2.gesturePriority, disableScroll: n2.disableScroll }), X = () => {
    c && (u = false, _ && _(E));
  }, Y = () => !!L.capture() && (c = true, d = false, E.startX = E.currentX, E.startY = E.currentY, E.startTime = E.currentTime, m ? m(E).then(g) : g(), true), g = () => {
    D && (() => {
      if ("undefined" != typeof document) {
        const e = document.activeElement;
        (null == e ? void 0 : e.blur) && e.blur();
      }
    })(), p && p(E), d = true;
  }, M = () => {
    c = false, a = false, u = false, d = true, L.release();
  }, T = (e) => {
    const t3 = c, o2 = d;
    M(), o2 && (r(E, e), t3 ? f && f(E) : y && y(E));
  }, j = /* @__PURE__ */ ((e, n3, r2, s3, i3) => {
    let c2, a2, d2, u2, l2, v2, m2, p2 = 0;
    const f2 = (o2) => {
      p2 = Date.now() + 2e3, n3(o2) && (!a2 && r2 && (a2 = t2(e, "touchmove", r2, i3)), d2 || (d2 = t2(o2.target, "touchend", _2, i3)), u2 || (u2 = t2(o2.target, "touchcancel", _2, i3)));
    }, y2 = (s4) => {
      p2 > Date.now() || n3(s4) && (!v2 && r2 && (v2 = t2(o(e), "mousemove", r2, i3)), m2 || (m2 = t2(o(e), "mouseup", h3, i3)));
    }, _2 = (e2) => {
      b2(), s3 && s3(e2);
    }, h3 = (e2) => {
      D2(), s3 && s3(e2);
    }, b2 = () => {
      a2 && a2(), d2 && d2(), u2 && u2(), a2 = d2 = u2 = void 0;
    }, D2 = () => {
      v2 && v2(), m2 && m2(), v2 = m2 = void 0;
    }, E2 = () => {
      b2(), D2();
    }, x2 = (o2 = true) => {
      o2 ? (c2 || (c2 = t2(e, "touchstart", f2, i3)), l2 || (l2 = t2(e, "mousedown", y2, i3))) : (c2 && c2(), l2 && l2(), c2 = l2 = void 0, E2());
    };
    return { enable: x2, stop: E2, destroy: () => {
      x2(false), s3 = r2 = n3 = void 0;
    } };
  })(l.el, (e) => {
    const t3 = i2(e);
    return !(a || !d) && (s2(e, E), E.startX = E.currentX, E.startY = E.currentY, E.startTime = E.currentTime = t3, E.velocityX = E.velocityY = E.deltaX = E.deltaY = 0, E.event = e, (!v || false !== v(E)) && (L.release(), !!L.start() && (a = true, 0 === h2 ? Y() : (x.start(E.startX, E.startY), true))));
  }, (e) => {
    c ? !u && d && (u = true, r(E, e), requestAnimationFrame(X)) : (r(E, e), x.detect(E.currentX, E.currentY) && (x.isGesture() && Y() || z()));
  }, T, { passive: b }), z = () => {
    M(), j.stop(), y && y(E);
  };
  return { enable(e = true) {
    e || (c && T(void 0), M()), j.enable(e);
  }, destroy() {
    L.destroy(), j.destroy();
  } };
};
var r = (e, t3) => {
  if (!t3) return;
  const o2 = e.currentX, n2 = e.currentY, r2 = e.currentTime;
  s2(t3, e);
  const c = e.currentX, a = e.currentY, d = (e.currentTime = i2(t3)) - r2;
  if (d > 0 && d < 100) {
    const t4 = (a - n2) / d;
    e.velocityX = (c - o2) / d * 0.7 + 0.3 * e.velocityX, e.velocityY = 0.7 * t4 + 0.3 * e.velocityY;
  }
  e.deltaX = c - e.startX, e.deltaY = a - e.startY, e.event = t3;
};
var s2 = (e, t3) => {
  let o2 = 0, n2 = 0;
  if (e) {
    const t4 = e.changedTouches;
    if (t4 && t4.length > 0) {
      const e2 = t4[0];
      o2 = e2.clientX, n2 = e2.clientY;
    } else void 0 !== e.pageX && (o2 = e.pageX, n2 = e.pageY);
  }
  t3.currentX = o2, t3.currentY = n2;
};
var i2 = (e) => e.timeStamp || Date.now();

export {
  i,
  h,
  n
};
/*! Bundled license information:

@ionic/core/components/p-BTEOs1at.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/p-BYRVyMu9.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=chunk-PRPEVMHS.js.map
