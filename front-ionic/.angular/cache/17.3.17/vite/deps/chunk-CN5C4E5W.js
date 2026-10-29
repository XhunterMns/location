import {
  __async,
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// node_modules/@ionic/core/components/p-CHqRYvYm.js
var t = class {
  constructor() {
    this.m = /* @__PURE__ */ new Map();
  }
  reset(t3) {
    this.m = new Map(Object.entries(t3));
  }
  get(t3, n2) {
    const e2 = this.m.get(t3);
    return void 0 !== e2 ? e2 : n2;
  }
  getBoolean(t3, n2 = false) {
    const e2 = this.m.get(t3);
    return void 0 === e2 ? n2 : "string" == typeof e2 ? "true" === e2 : !!e2;
  }
  getNumber(t3, n2) {
    const e2 = parseFloat(this.m.get(t3));
    return isNaN(e2) ? void 0 !== n2 ? n2 : NaN : e2;
  }
  set(t3, n2) {
    this.m.set(t3, n2);
  }
};
var n = new t();
var e = (t3) => {
  try {
    const n2 = t3.sessionStorage.getItem(r);
    return null !== n2 ? JSON.parse(n2) : {};
  } catch (t4) {
    return {};
  }
};
var o = (t3, n2) => {
  try {
    t3.sessionStorage.setItem(r, JSON.stringify(n2));
  } catch (t4) {
    return;
  }
};
var s = (t3) => {
  const n2 = {};
  return t3.location.search.slice(1).split("&").map((t4) => t4.split("=")).map(([t4, n3]) => {
    try {
      return [decodeURIComponent(t4), decodeURIComponent(n3)];
    } catch (t5) {
      return ["", ""];
    }
  }).filter(([t4]) => l(t4, i)).map(([t4, n3]) => [t4.slice(i.length), n3]).forEach(([t4, e2]) => {
    n2[t4] = e2;
  }), n2;
};
var l = (t3, n2) => t3.substr(0, n2.length) === n2;
var i = "ionic:";
var r = "ionic-persist-config";
var c;
!function(t3) {
  t3.OFF = "OFF", t3.ERROR = "ERROR", t3.WARN = "WARN";
}(c || (c = {}));
var u = (t3, ...e2) => {
  const o2 = n.get("logLevel", c.WARN);
  if ([c.WARN].includes(o2)) return console.warn(`[Ionic Warning]: ${t3}`, ...e2);
};
var f = (t3, ...e2) => {
  const o2 = n.get("logLevel", c.ERROR);
  if ([c.ERROR, c.WARN].includes(o2)) return console.error(`[Ionic Error]: ${t3}`, ...e2);
};
var a = (t3, ...n2) => console.error(`<${t3.tagName.toLowerCase()}> must be used inside ${n2.join(" or ")}.`);
var d = { isBrowser: true };
var h = ((t3) => (t3.Undefined = "undefined", t3.Null = "null", t3.String = "string", t3.Number = "number", t3.SpecialNumber = "number", t3.Boolean = "boolean", t3.BigInt = "bigint", t3))(h || {});
var p = ((t3) => (t3.Array = "array", t3.Date = "date", t3.Map = "map", t3.Object = "object", t3.RegularExpression = "regexp", t3.Set = "set", t3.Channel = "channel", t3.Symbol = "symbol", t3))(p || {});
var v = "type";
var $ = "value";
var b = "serialized:";
function g(t3, n2, e2) {
  const o2 = "undefined" != typeof HTMLElement ? HTMLElement.prototype : null;
  for (; t3 && t3 !== o2; ) {
    const o3 = Object.getOwnPropertyDescriptor(t3, n2);
    if (o3 && (!e2 || o3.get)) return o3;
    t3 = Object.getPrototypeOf(t3);
  }
}
var m;
var y = (t3, n2) => {
  var e2;
  Object.entries(null != (e2 = n2.o.t) ? e2 : {}).map(([e3, [o2]]) => {
    if (31 & o2 || 32 & o2) {
      const o3 = t3[e3], s2 = g(Object.getPrototypeOf(t3), e3, true) || Object.getOwnPropertyDescriptor(t3, e3);
      s2 && Object.defineProperty(t3, e3, { get() {
        return s2.get.call(this);
      }, set(t4) {
        s2.set.call(this, t4);
      }, configurable: true, enumerable: true }), n2.l.has(e3) ? t3[e3] = n2.l.get(e3) : void 0 !== o3 && (t3[e3] = o3);
    }
  });
};
var w = (t3) => {
  if (t3.__stencil__getHostRef) return t3.__stencil__getHostRef();
};
var j = (t3, n2) => n2 in t3;
var O = (t3, n2) => (0, console.error)(t3, n2);
var N = /* @__PURE__ */ new Map();
var S = [];
var x = "s-id";
var E = "sty-id";
var k = "c-id";
var C = "http://www.w3.org/1999/xlink";
var M = "undefined" != typeof window ? window : {};
var I = M.HTMLElement || class {
};
var L = { i: 0, u: "", jmp: (t3) => t3(), raf: (t3) => requestAnimationFrame(t3), ael: (t3, n2, e2, o2) => t3.addEventListener(n2, e2, o2), rel: (t3, n2, e2, o2) => t3.removeEventListener(n2, e2, o2), ce: (t3, n2) => new CustomEvent(t3, n2) };
var R = (() => {
  var t3;
  let n2 = false;
  try {
    null == (t3 = M.document) || t3.addEventListener("e", null, Object.defineProperty({}, "passive", { get() {
      n2 = true;
    } }));
  } catch (t4) {
  }
  return n2;
})();
var A = (() => {
  try {
    return !!M.document.adoptedStyleSheets && (new CSSStyleSheet(), "function" == typeof new CSSStyleSheet().replaceSync);
  } catch (t3) {
  }
  return false;
})();
var _ = !!A && (() => !!M.document && Object.getOwnPropertyDescriptor(M.document.adoptedStyleSheets, "length").writable)();
var B = false;
var F = [];
var T = [];
var U = (t3, n2) => (e2) => {
  t3.push(e2), B || (B = true, n2 && 4 & L.i ? V(W) : L.raf(W));
};
var D = (t3) => {
  for (let n2 = 0; n2 < t3.length; n2++) try {
    t3[n2](performance.now());
  } catch (t4) {
    O(t4);
  }
  t3.length = 0;
};
var W = () => {
  D(F), D(T), (B = F.length > 0) && L.raf(W);
};
var V = (t3) => Promise.resolve(void 0).then(t3);
var H = U(F, false);
var P = U(T, true);
var q = (t3) => {
  const n2 = new URL(t3, L.u);
  return n2.origin !== M.location.origin ? n2.href : n2.pathname;
};
function J(t3) {
  const n2 = { mode: "open" };
  n2.delegatesFocus = !!(16 & t3.i);
  const e2 = this.attachShadow(n2);
  void 0 === m && (m = null), m && (_ ? e2.adoptedStyleSheets.push(m) : e2.adoptedStyleSheets = [...e2.adoptedStyleSheets, m]);
}
var Y = (t3) => {
  const n2 = Ot(t3, "childNodes");
  t3.tagName && t3.tagName.includes("-") && t3["s-cr"] && "SLOT-FB" !== t3.tagName && G(n2, t3.tagName).forEach((t4) => {
    1 === t4.nodeType && "SLOT-FB" === t4.tagName && (t4.hidden = !!K(t4, tt(t4), false).length);
  });
  let e2 = 0;
  for (e2 = 0; e2 < n2.length; e2++) {
    const t4 = n2[e2];
    1 === t4.nodeType && Ot(t4, "childNodes").length && Y(t4);
  }
};
var Z = (t3) => {
  const n2 = [];
  for (let e2 = 0; e2 < t3.length; e2++) {
    const o2 = t3[e2]["s-nr"] || void 0;
    o2 && o2.isConnected && n2.push(o2);
  }
  return n2;
};
function G(t3, n2, e2) {
  let o2, s2 = 0, l2 = [];
  for (; s2 < t3.length; s2++) {
    if (o2 = t3[s2], o2["s-sr"] && (!n2 || o2["s-hn"] === n2) && (void 0 === e2 || tt(o2) === e2) && (l2.push(o2), void 0 !== e2)) return l2;
    l2 = [...l2, ...G(o2.childNodes, n2, e2)];
  }
  return l2;
}
var K = (t3, n2, e2 = true) => {
  const o2 = [];
  (e2 && t3["s-sr"] || !t3["s-sr"]) && o2.push(t3);
  let s2 = t3;
  for (; s2 = s2.nextSibling; ) tt(s2) !== n2 || !e2 && s2["s-sr"] || o2.push(s2);
  return o2;
};
var Q = (t3, n2) => 1 === t3.nodeType ? null === t3.getAttribute("slot") && "" === n2 || t3.getAttribute("slot") === n2 : t3["s-sn"] === n2 || "" === n2;
var X = (t3, n2, e2, o2) => {
  if (t3["s-ol"] && t3["s-ol"].isConnected) return;
  const s2 = document.createTextNode("");
  if (s2["s-nr"] = t3, !n2["s-cr"] || !n2["s-cr"].parentNode) return;
  const l2 = n2["s-cr"].parentNode, i2 = Ot(l2, e2 ? "prepend" : "appendChild");
  if (void 0 !== o2) {
    s2["s-oo"] = o2;
    const t4 = Ot(l2, "childNodes"), n3 = [s2];
    t4.forEach((t5) => {
      t5["s-nr"] && n3.push(t5);
    }), n3.sort((t5, n4) => !t5["s-oo"] || t5["s-oo"] < (n4["s-oo"] || 0) ? -1 : !n4["s-oo"] || n4["s-oo"] < t5["s-oo"] ? 1 : 0), n3.forEach((t5) => i2.call(l2, t5));
  } else i2.call(l2, s2);
  t3["s-ol"] = s2, t3["s-sh"] = n2["s-hn"];
};
var tt = (t3) => "string" == typeof t3["s-sn"] ? t3["s-sn"] : 1 === t3.nodeType && t3.getAttribute("slot") || void 0;
function nt(t3) {
  if (t3.assignedElements || t3.assignedNodes || !t3["s-sr"]) return;
  const n2 = (n3) => function(t4) {
    const e2 = [], o2 = this["s-sn"];
    (null == t4 ? void 0 : t4.flatten) && console.error("\n          Flattening is not supported for Stencil non-shadow slots.\n          You can use `.childNodes` to nested slot fallback content.\n          If you have a particular use case, please open an issue on the Stencil repo.\n        ");
    const s2 = this["s-cr"].parentElement;
    return (s2.__childNodes ? s2.childNodes : Z(s2.childNodes)).forEach((t5) => {
      o2 === tt(t5) && e2.push(t5);
    }), n3 ? e2.filter((t5) => 1 === t5.nodeType) : e2;
  }.bind(t3);
  t3.assignedElements = n2(true), t3.assignedNodes = n2(false);
}
function et(t3) {
  t3.dispatchEvent(new CustomEvent("slotchange", { bubbles: false, cancelable: false, composed: false }));
}
function ot(t3, n2) {
  var e2;
  if (!(n2 = n2 || (null == (e2 = t3["s-ol"]) ? void 0 : e2.parentElement))) return { slotNode: null, slotName: "" };
  const o2 = t3["s-sn"] = tt(t3) || "";
  return { slotNode: G(Ot(n2, "childNodes"), n2.tagName, o2)[0], slotName: o2 };
}
var st = (t3) => {
  if (t3.__cloneNode) return;
  const n2 = t3.__cloneNode = t3.cloneNode;
  t3.cloneNode = function(t4) {
    const e2 = this.shadowRoot && true, o2 = n2.call(this, !!e2 && t4);
    if (!e2 && t4) {
      let t5, n3, e3 = 0;
      const s2 = ["s-id", "s-cr", "s-lr", "s-rc", "s-sc", "s-p", "s-cn", "s-sr", "s-sn", "s-hn", "s-ol", "s-nr", "s-si", "s-rf", "s-scs"], l2 = this.__childNodes || this.childNodes;
      for (; e3 < l2.length; e3++) t5 = l2[e3]["s-nr"], n3 = s2.every((t6) => !l2[e3][t6]), t5 && (o2.__appendChild ? o2.__appendChild(t5.cloneNode(true)) : o2.appendChild(t5.cloneNode(true))), n3 && o2.appendChild(l2[e3].cloneNode(true));
    }
    return o2;
  };
};
var lt = (t3) => {
  t3.__appendChild || (t3.__appendChild = t3.appendChild, t3.appendChild = function(t4) {
    const { slotName: n2, slotNode: e2 } = ot(t4, this);
    if (e2) {
      X(t4, e2);
      const o2 = K(e2, n2), s2 = o2[o2.length - 1], l2 = Ot(s2, "parentNode"), i2 = Ot(l2, "insertBefore")(t4, s2.nextSibling);
      return et(e2), Y(this), i2;
    }
    return this.__appendChild(t4);
  });
};
var it = (t3) => {
  t3.__removeChild || (t3.__removeChild = t3.removeChild, t3.removeChild = function(t4) {
    return t4 && void 0 !== t4["s-sn"] && G(this.__childNodes || this.childNodes, this.tagName, t4["s-sn"]) && t4.isConnected ? (t4.remove(), void Y(this)) : this.__removeChild(t4);
  });
};
var rt = (t3) => {
  t3.__prepend || (t3.__prepend = t3.prepend, t3.prepend = function(...n2) {
    n2.forEach((n3) => {
      "string" == typeof n3 && (n3 = this.ownerDocument.createTextNode(n3));
      const e2 = (n3["s-sn"] = tt(n3)) || "", o2 = G(Ot(this, "childNodes"), this.tagName, e2)[0];
      if (o2) {
        X(n3, o2, true);
        const t4 = K(o2, e2)[0], s2 = Ot(t4, "parentNode"), l2 = Ot(s2, "insertBefore")(n3, Ot(t4, "nextSibling"));
        return et(o2), l2;
      }
      return 1 === n3.nodeType && n3.getAttribute("slot") && (n3.hidden = true), t3.__prepend(n3);
    });
  });
};
var ct = (t3) => {
  t3.__append || (t3.__append = t3.append, t3.append = function(...t4) {
    t4.forEach((t5) => {
      "string" == typeof t5 && (t5 = this.ownerDocument.createTextNode(t5)), this.appendChild(t5);
    });
  });
};
var ut = (t3) => {
  if (t3.__insertAdjacentHTML) return;
  const n2 = t3.insertAdjacentHTML;
  t3.insertAdjacentHTML = function(t4, e2) {
    if ("afterbegin" !== t4 && "beforeend" !== t4) return n2.call(this, t4, e2);
    const o2 = this.ownerDocument.createElement("_");
    let s2;
    if (o2.innerHTML = e2, "afterbegin" === t4) for (; s2 = o2.firstChild; ) this.prepend(s2);
    else if ("beforeend" === t4) for (; s2 = o2.firstChild; ) this.append(s2);
  };
};
var ft = (t3) => {
  t3.insertAdjacentText = function(t4, n2) {
    this.insertAdjacentHTML(t4, n2);
  };
};
var at = (t3) => {
  t3.__insertBefore || t3.__insertBefore || (t3.__insertBefore = t3.insertBefore, t3.insertBefore = function(t4, n2) {
    const { slotName: e2, slotNode: o2 } = ot(t4, this), s2 = this.__childNodes ? this.childNodes : Z(this.childNodes);
    if (o2) {
      let l3 = false;
      if (s2.forEach((s3) => {
        if (s3 !== n2 && null !== n2) ;
        else {
          if (l3 = true, null === n2 || e2 !== n2["s-sn"]) return void this.appendChild(t4);
          if (e2 === n2["s-sn"]) {
            X(t4, o2);
            const e3 = Ot(n2, "parentNode");
            Ot(e3, "insertBefore")(t4, n2), et(o2);
          }
        }
      }), l3) return t4;
    }
    const l2 = null == n2 ? void 0 : n2.__parentNode;
    return l2 && !this.isSameNode(l2) ? this.appendChild(t4) : this.__insertBefore(t4, n2);
  });
};
var dt = (t3) => {
  if (t3.__insertAdjacentElement) return;
  const n2 = t3.insertAdjacentElement;
  t3.insertAdjacentElement = function(t4, e2) {
    return "afterbegin" !== t4 && "beforeend" !== t4 ? n2.call(this, t4, e2) : "afterbegin" === t4 ? (this.prepend(e2), e2) : "beforeend" === t4 ? (this.append(e2), e2) : e2;
  };
};
var ht = (t3) => {
  jt("textContent", t3), Object.defineProperty(t3, "textContent", { get: function() {
    let t4 = "";
    return (this.__childNodes ? this.childNodes : Z(this.childNodes)).forEach((n2) => t4 += n2.textContent || ""), t4;
  }, set: function(t4) {
    (this.__childNodes ? this.childNodes : Z(this.childNodes)).forEach((t5) => {
      t5["s-ol"] && t5["s-ol"].remove(), t5.remove();
    }), this.insertAdjacentHTML("beforeend", t4);
  } });
};
var pt = (t3) => {
  class n2 extends Array {
    item(t4) {
      return this[t4];
    }
  }
  jt("children", t3), Object.defineProperty(t3, "children", { get() {
    return this.childNodes.filter((t4) => 1 === t4.nodeType);
  } }), Object.defineProperty(t3, "childElementCount", { get() {
    return this.children.length;
  } }), jt("firstChild", t3), Object.defineProperty(t3, "firstChild", { get() {
    return this.childNodes[0];
  } }), jt("lastChild", t3), Object.defineProperty(t3, "lastChild", { get() {
    return this.childNodes[this.childNodes.length - 1];
  } }), jt("childNodes", t3), Object.defineProperty(t3, "childNodes", { get() {
    const t4 = new n2();
    return t4.push(...Z(this.__childNodes)), t4;
  } });
};
var vt = (t3) => {
  t3 && !t3.__nextSibling && (jt("nextSibling", t3), Object.defineProperty(t3, "nextSibling", { get: function() {
    var t4;
    const n2 = null == (t4 = this["s-ol"]) ? void 0 : t4.parentNode.childNodes, e2 = null == n2 ? void 0 : n2.indexOf(this);
    return n2 && e2 > -1 ? n2[e2 + 1] : this.__nextSibling;
  } }));
};
var $t = (t3) => {
  t3 && !t3.__nextElementSibling && (jt("nextElementSibling", t3), Object.defineProperty(t3, "nextElementSibling", { get: function() {
    var t4;
    const n2 = null == (t4 = this["s-ol"]) ? void 0 : t4.parentNode.children, e2 = null == n2 ? void 0 : n2.indexOf(this);
    return n2 && e2 > -1 ? n2[e2 + 1] : this.__nextElementSibling;
  } }));
};
var bt = (t3) => {
  t3 && !t3.__previousSibling && (jt("previousSibling", t3), Object.defineProperty(t3, "previousSibling", { get: function() {
    var t4;
    const n2 = null == (t4 = this["s-ol"]) ? void 0 : t4.parentNode.childNodes, e2 = null == n2 ? void 0 : n2.indexOf(this);
    return n2 && e2 > -1 ? n2[e2 - 1] : this.__previousSibling;
  } }));
};
var gt = (t3) => {
  t3 && !t3.__previousElementSibling && (jt("previousElementSibling", t3), Object.defineProperty(t3, "previousElementSibling", { get: function() {
    var t4;
    const n2 = null == (t4 = this["s-ol"]) ? void 0 : t4.parentNode.children, e2 = null == n2 ? void 0 : n2.indexOf(this);
    return n2 && e2 > -1 ? n2[e2 - 1] : this.__previousElementSibling;
  } }));
};
var mt = (t3) => {
  t3 && !t3.__parentNode && (jt("parentNode", t3), Object.defineProperty(t3, "parentNode", { get: function() {
    var t4;
    return (null == (t4 = this["s-ol"]) ? void 0 : t4.parentNode) || this.__parentNode;
  }, set: function(t4) {
    this.__parentNode = t4;
  } }));
};
var yt = ["children", "nextElementSibling", "previousElementSibling"];
var wt = ["childNodes", "firstChild", "lastChild", "nextSibling", "previousSibling", "textContent", "parentNode"];
function jt(t3, n2) {
  if (!globalThis.Node || !globalThis.Element) return;
  let e2;
  yt.includes(t3) ? e2 = Object.getOwnPropertyDescriptor(Element.prototype, t3) : wt.includes(t3) && (e2 = Object.getOwnPropertyDescriptor(Node.prototype, t3)), e2 || (e2 = Object.getOwnPropertyDescriptor(n2, t3)), e2 && Object.defineProperty(n2, "__" + t3, e2);
}
function Ot(t3, n2) {
  if ("__" + n2 in t3) {
    const e2 = t3["__" + n2];
    return "function" != typeof e2 ? e2 : e2.bind(t3);
  }
  return "function" != typeof t3[n2] ? t3[n2] : t3[n2].bind(t3);
}
var Nt = /* @__PURE__ */ new WeakMap();
var St = (t3, n2, e2) => {
  let o2 = N.get(t3);
  A && e2 ? (o2 = o2 || new CSSStyleSheet(), "string" == typeof o2 ? o2 = n2 : o2.replaceSync(n2)) : o2 = n2, N.set(t3, o2);
};
var xt = (t3, n2, e2) => {
  var o2, s2, l2;
  const i2 = Et(n2, e2), r2 = N.get(i2);
  if (!M.document) return i2;
  if (t3 = 11 === t3.nodeType ? t3 : M.document, r2) if ("string" == typeof r2) {
    let e3, l3 = Nt.get(t3 = t3.head || t3);
    l3 || Nt.set(t3, l3 = /* @__PURE__ */ new Set());
    const c2 = t3.querySelector(`[${E}="${i2}"]`);
    if (c2) c2.textContent = r2;
    else if (!l3.has(i2)) {
      e3 = M.document.createElement("style"), e3.textContent = r2;
      const c3 = null != (o2 = L.h) ? o2 : function() {
        var t4, n3, e4;
        return null != (e4 = null == (n3 = null == (t4 = M.document.head) ? void 0 : t4.querySelector('meta[name="csp-nonce"]')) ? void 0 : n3.getAttribute("content")) ? e4 : void 0;
      }();
      if (null != c3 && e3.setAttribute("nonce", c3), !(1 & n2.i)) if ("HEAD" === t3.nodeName) {
        const n3 = t3.querySelectorAll("link[rel=preconnect]"), o3 = n3.length > 0 ? n3[n3.length - 1].nextSibling : t3.querySelector("style");
        t3.insertBefore(e3, (null == o3 ? void 0 : o3.parentNode) === t3 ? o3 : null);
      } else if ("host" in t3) if (A) {
        const n3 = new (null != (s2 = t3.defaultView) ? s2 : t3.ownerDocument.defaultView).CSSStyleSheet();
        n3.replaceSync(r2), _ ? t3.adoptedStyleSheets.unshift(n3) : t3.adoptedStyleSheets = [n3, ...t3.adoptedStyleSheets];
      } else {
        const n3 = t3.querySelector("style");
        n3 ? n3.textContent = r2 + n3.textContent : t3.prepend(e3);
      }
      else t3.append(e3);
      1 & n2.i && t3.insertBefore(e3, null), 4 & n2.i && (e3.textContent += "slot-fb{display:contents}slot-fb[hidden]{display:none}"), l3 && l3.add(i2);
    }
  } else {
    let n3 = Nt.get(t3);
    if (n3 || Nt.set(t3, n3 = /* @__PURE__ */ new Set()), !n3.has(i2)) {
      const e3 = null != (l2 = t3.defaultView) ? l2 : t3.ownerDocument.defaultView;
      let o3;
      if (r2.constructor === e3.CSSStyleSheet) o3 = r2;
      else {
        o3 = new e3.CSSStyleSheet();
        for (let t4 = 0; t4 < r2.cssRules.length; t4++) o3.insertRule(r2.cssRules[t4].cssText, t4);
      }
      if (_ ? t3.adoptedStyleSheets.push(o3) : t3.adoptedStyleSheets = [...t3.adoptedStyleSheets, o3], n3.add(i2), "host" in t3) {
        const n4 = t3.querySelector(`[${E}="${i2}"]`);
        n4 && P(() => n4.remove());
      }
    }
  }
  return i2;
};
var Et = (t3, n2) => "sc-" + (n2 && 32 & t3.i ? t3.p + "-" + n2 : t3.p);
var kt = (t3) => "object" == (t3 = typeof t3) || "function" === t3;
var Ct = (t3, n2, ...e2) => {
  let o2 = null, s2 = null, l2 = null, i2 = false, r2 = false;
  const c2 = [], u2 = (n3) => {
    for (let e3 = 0; e3 < n3.length; e3++) o2 = n3[e3], Array.isArray(o2) ? u2(o2) : null != o2 && "boolean" != typeof o2 && ((i2 = "function" != typeof t3 && !kt(o2)) && (o2 = String(o2)), i2 && r2 ? c2[c2.length - 1].v += o2 : c2.push(i2 ? Mt(null, o2) : o2), r2 = i2);
  };
  if (u2(e2), n2) {
    n2.key && (s2 = n2.key), n2.name && (l2 = n2.name);
    {
      const t4 = n2.className || n2.class;
      t4 && (n2.class = "object" != typeof t4 ? t4 : Object.keys(t4).filter((n3) => t4[n3]).join(" "));
    }
  }
  if ("function" == typeof t3) return t3(null === n2 ? {} : n2, c2, Lt);
  const f2 = Mt(t3, null);
  return f2.$ = n2, c2.length > 0 && (f2.j = c2), f2.O = s2, f2.N = l2, f2;
};
var Mt = (t3, n2) => ({ i: 0, S: t3, v: null != n2 ? n2 : null, k: null, j: null, $: null, O: null, N: null });
var It = {};
var Lt = { forEach: (t3, n2) => t3.map(Rt).forEach(n2), map: (t3, n2) => t3.map(Rt).map(n2).map(At) };
var Rt = (t3) => ({ vattrs: t3.$, vchildren: t3.j, vkey: t3.O, vname: t3.N, vtag: t3.S, vtext: t3.v });
var At = (t3) => {
  if ("function" == typeof t3.vtag) {
    const n3 = __spreadValues({}, t3.vattrs);
    return t3.vkey && (n3.key = t3.vkey), t3.vname && (n3.name = t3.vname), Ct(t3.vtag, n3, ...t3.vchildren || []);
  }
  const n2 = Mt(t3.vtag, t3.vtext);
  return n2.$ = t3.vattrs, n2.j = t3.vchildren, n2.O = t3.vkey, n2.N = t3.vname, n2;
};
var _t = (t3, n2, e2, o2, s2, l2, i2, r2 = []) => {
  let c2, u2, f2, a2;
  const d2 = s2["s-sc"];
  if (1 === l2.nodeType) {
    if (c2 = l2.getAttribute(k), c2 && (u2 = c2.split("."), u2[0] === i2 || "0" === u2[0])) {
      f2 = Ft({ i: 0, C: u2[0], M: u2[1], I: u2[2], L: u2[3], S: l2.tagName.toLowerCase(), k: l2, $: { class: l2.className || "" } }), n2.push(f2), l2.removeAttribute(k), t3.j || (t3.j = []), d2 && u2[0] === i2 && (l2["s-si"] = d2, f2.$.class += " " + d2);
      const s3 = f2.k.getAttribute("s-sn");
      "string" == typeof s3 && ("slot-fb" === f2.S && (Tt(s3, u2[2], f2, l2, t3, n2, e2, o2, r2), d2 && l2.classList.add(d2)), f2.k["s-sn"] = s3, f2.k.removeAttribute("s-sn")), void 0 !== f2.L && (t3.j[f2.L] = f2), t3 = f2, o2 && "0" === f2.I && (o2[f2.L] = f2.k);
    }
    if (l2.shadowRoot) for (a2 = l2.shadowRoot.childNodes.length - 1; a2 >= 0; a2--) _t(t3, n2, e2, o2, s2, l2.shadowRoot.childNodes[a2], i2, r2);
    const h2 = l2.__childNodes || l2.childNodes;
    for (a2 = h2.length - 1; a2 >= 0; a2--) _t(t3, n2, e2, o2, s2, h2[a2], i2, r2);
  } else if (8 === l2.nodeType) u2 = l2.nodeValue.split("."), (u2[1] === i2 || "0" === u2[1]) && (c2 = u2[0], f2 = Ft({ C: u2[1], M: u2[2], I: u2[3], L: u2[4] || "0", k: l2, $: null, j: null, O: null, N: null, S: null, v: null }), "t" === c2 ? (f2.k = Dt(l2, 3), f2.k && 3 === f2.k.nodeType && (f2.v = f2.k.textContent, n2.push(f2), l2.remove(), i2 === f2.C && (t3.j || (t3.j = []), t3.j[f2.L] = f2), o2 && "0" === f2.I && (o2[f2.L] = f2.k))) : "c" === c2 ? (f2.k = Dt(l2, 8), f2.k && 8 === f2.k.nodeType && (n2.push(f2), l2.remove())) : f2.C === i2 && ("s" === c2 ? Tt(l2["s-sn"] = u2[5] || "", u2[2], f2, l2, t3, n2, e2, o2, r2) : "r" === c2 && (o2 ? l2.remove() : (s2["s-cr"] = l2, l2["s-cn"] = true))));
  else if (t3 && "style" === t3.S) {
    const n3 = Mt(null, l2.textContent);
    n3.k = l2, n3.L = "0", t3.j = [n3];
  }
  return t3;
};
var Bt = (t3, n2) => {
  if (1 === t3.nodeType) {
    const e2 = t3[x] || t3.getAttribute(x);
    e2 && n2.set(e2, t3);
    let o2 = 0;
    if (t3.shadowRoot) for (; o2 < t3.shadowRoot.childNodes.length; o2++) Bt(t3.shadowRoot.childNodes[o2], n2);
    const s2 = t3.__childNodes || t3.childNodes;
    for (o2 = 0; o2 < s2.length; o2++) Bt(s2[o2], n2);
  } else if (8 === t3.nodeType) {
    const e2 = t3.nodeValue.split(".");
    "o" === e2[0] && (n2.set(e2[1] + "." + e2[2], t3), t3.nodeValue = "", t3["s-en"] = e2[3]);
  }
};
var Ft = (t3) => __spreadValues({ i: 0, C: null, M: null, I: null, L: "0", k: null, $: null, j: null, O: null, N: null, S: null, v: null }, t3);
function Tt(t3, n2, e2, o2, s2, l2, i2, r2, c2) {
  o2["s-sr"] = true, e2.N = t3 || null, e2.S = "slot";
  const u2 = (null == s2 ? void 0 : s2.k) ? s2.k["s-id"] || s2.k.getAttribute("s-id") : "";
  if (r2 && M.document) {
    const l3 = e2.k = M.document.createElement(e2.S);
    e2.N && e2.k.setAttribute("name", t3), s2.k.shadowRoot && u2 && u2 !== e2.C ? Ot(s2.k, "insertBefore")(l3, Ot(s2.k, "children")[0]) : Ot(Ot(o2, "parentNode"), "insertBefore")(l3, o2), Ut(c2, n2, t3, o2, e2.C), o2.remove(), "0" === e2.I && (r2[e2.L] = e2.k);
  } else {
    const l3 = e2.k, i3 = u2 && u2 !== e2.C && s2.k.shadowRoot;
    Ut(c2, n2, t3, o2, i3 ? u2 : e2.C), nt(o2), i3 && s2.k.insertBefore(l3, s2.k.children[0]);
  }
  l2.push(e2), i2.push(e2), s2.j || (s2.j = []), s2.j[e2.L] = e2;
}
var Ut = (t3, n2, e2, o2, s2) => {
  var l2, i2;
  let r2 = o2.nextSibling;
  if (t3[n2] = t3[n2] || [], r2 && !(null == (l2 = r2.nodeValue) ? void 0 : l2.startsWith("s."))) do {
    !r2 || (r2.getAttribute && r2.getAttribute("slot") || r2["s-sn"]) !== e2 && ("" !== e2 || r2["s-sn"] || r2.getAttribute && r2.getAttribute("slot") || 8 !== r2.nodeType && 3 !== r2.nodeType) || (r2["s-sn"] = e2, t3[n2].push({ slot: o2, node: r2, hostId: s2 })), r2 = null == r2 ? void 0 : r2.nextSibling;
  } while (r2 && !(null == (i2 = r2.nodeValue) ? void 0 : i2.startsWith("s.")));
};
var Dt = (t3, n2) => {
  let e2 = t3;
  do {
    e2 = e2.nextSibling;
  } while (e2 && (e2.nodeType !== n2 || !e2.nodeValue));
  return e2;
};
var Wt = (t3) => S.push(t3);
var Vt = (t3) => {
  var n2;
  return null == (n2 = w(t3)) ? void 0 : n2.R;
};
var Ht = (t3) => {
  if (!t3) return;
  const n2 = Object.keys(t3);
  if (0 === n2.length) return;
  let e2 = false;
  for (const o3 of n2) {
    if (e2) break;
    for (const n3 of t3[o3]) if ("string" == typeof n3) {
      e2 = true;
      break;
    }
  }
  if (!e2) return t3;
  const o2 = {};
  for (const e3 of n2) o2[e3] = t3[e3].map((t4) => "string" == typeof t4 ? { [t4]: 0 } : t4);
  return o2;
};
var Pt = class t2 {
  static fromLocalValue(n2) {
    const e2 = n2[v], o2 = $ in n2 ? n2[$] : void 0;
    switch (e2) {
      case "string":
      case "boolean":
        return o2;
      case "bigint":
        return BigInt(o2);
      case "undefined":
        return;
      case "null":
        return null;
      case "number":
        return "NaN" === o2 ? NaN : "-0" === o2 ? -0 : "Infinity" === o2 ? 1 / 0 : "-Infinity" === o2 ? -1 / 0 : o2;
      case "array":
        return o2.map((n4) => t2.fromLocalValue(n4));
      case "date":
        return new Date(o2);
      case "map":
        const n3 = /* @__PURE__ */ new Map();
        for (const [e3, s3] of o2) {
          const o3 = "object" == typeof e3 && null !== e3 ? t2.fromLocalValue(e3) : e3, l3 = t2.fromLocalValue(s3);
          n3.set(o3, l3);
        }
        return n3;
      case "object":
        const s2 = {};
        for (const [n4, e3] of o2) s2[n4] = t2.fromLocalValue(e3);
        return s2;
      case "regexp":
        const { pattern: l2, flags: i2 } = o2;
        return new RegExp(l2, i2);
      case "set":
        const r2 = /* @__PURE__ */ new Set();
        for (const n4 of o2) r2.add(t2.fromLocalValue(n4));
        return r2;
      case "symbol":
        return Symbol(o2);
      default:
        throw new Error(`Unsupported type: ${e2}`);
    }
  }
  static fromLocalValueArray(n2) {
    return n2.map((n3) => t2.fromLocalValue(n3));
  }
  static isLocalValueObject(t3) {
    if ("object" != typeof t3 || null === t3) return false;
    if (!t3.hasOwnProperty(v)) return false;
    const n2 = t3[v];
    return !!Object.values(__spreadValues(__spreadValues({}, h), p)).includes(n2) && ("null" === n2 || "undefined" === n2 || t3.hasOwnProperty($));
  }
};
var qt;
var zt;
var Jt;
var Yt = (t3, n2) => {
  return "string" == typeof t3 && t3.startsWith(b) ? t3 = "string" == typeof (e2 = t3) && e2.startsWith(b) ? Pt.fromLocalValue(JSON.parse(function(t4) {
    const n3 = atob(t4), e3 = new Uint8Array(n3.length);
    for (let t5 = 0; t5 < n3.length; t5++) e3[t5] = n3.charCodeAt(t5);
    return new TextDecoder().decode(e3);
  }(e2.slice(11)))) : e2 : null == t3 || kt(t3) ? t3 : 4 & n2 ? "false" !== t3 && ("" === t3 || !!t3) : 2 & n2 ? "string" == typeof t3 ? parseFloat(t3) : "number" == typeof t3 ? t3 : NaN : 1 & n2 ? String(t3) : t3;
  var e2;
};
var Zt = (t3, n2, e2) => {
  const o2 = t3;
  return { emit: (t4) => Gt(o2, n2, { bubbles: !!(4 & e2), composed: !!(2 & e2), cancelable: !!(1 & e2), detail: t4 }) };
};
var Gt = (t3, n2, e2) => {
  const o2 = L.ce(n2, e2);
  return t3.dispatchEvent(o2), o2;
};
var Kt = (t3, n2, e2, o2, s2, l2, i2) => {
  if (e2 === o2) return;
  let r2 = j(t3, n2), c2 = n2.toLowerCase();
  if ("class" === n2) {
    const n3 = t3.classList, s3 = Xt(e2);
    let l3 = Xt(o2);
    if ((t3["s-si"] || t3["s-sc"]) && i2) {
      const e3 = t3["s-sc"] || t3["s-si"];
      l3.push(e3), s3.forEach((t4) => {
        t4.startsWith(e3) && l3.push(t4);
      }), l3 = [...new Set(l3)].filter((t4) => t4), n3.add(...l3);
    } else n3.remove(...s3.filter((t4) => t4 && !l3.includes(t4))), n3.add(...l3.filter((t4) => t4 && !s3.includes(t4)));
  } else if ("style" === n2) {
    for (const n3 in e2) o2 && null != o2[n3] || (n3.includes("-") ? t3.style.removeProperty(n3) : t3.style[n3] = "");
    for (const n3 in o2) e2 && o2[n3] === e2[n3] || (n3.includes("-") ? t3.style.setProperty(n3, o2[n3]) : t3.style[n3] = o2[n3]);
  } else if ("key" === n2) ;
  else if ("ref" === n2) o2 && jn(o2, t3);
  else if (t3.__lookupSetter__(n2) || "o" !== n2[0] || "n" !== n2[1]) {
    if ("a" === n2[0] && n2.startsWith("attr:")) {
      const e3 = n2.slice(5);
      let s3;
      {
        const n3 = w(t3);
        if (n3 && n3.o && n3.o.t) {
          const t4 = n3.o.t[e3];
          t4 && t4[1] && (s3 = t4[1]);
        }
      }
      return s3 || (s3 = e3.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()), void (null == o2 || false === o2 ? false === o2 && "" !== t3.getAttribute(s3) || t3.removeAttribute(s3) : t3.setAttribute(s3, true === o2 ? "" : o2));
    }
    if ("p" === n2[0] && n2.startsWith("prop:")) {
      const e3 = n2.slice(5);
      try {
        t3[e3] = o2;
      } catch (t4) {
      }
      return;
    }
    {
      const i3 = kt(o2);
      if ((r2 || i3 && null !== o2) && !s2) try {
        if (t3.tagName.includes("-")) t3[n2] !== o2 && (t3[n2] = o2);
        else {
          const s3 = null == o2 ? "" : o2;
          "list" === n2 ? r2 = false : null != e2 && t3[n2] === s3 || ("function" == typeof t3.__lookupSetter__(n2) ? t3[n2] = s3 : t3.setAttribute(n2, s3));
        }
      } catch (t4) {
      }
      let u2 = false;
      c2 !== (c2 = c2.replace(/^xlink\:?/, "")) && (n2 = c2, u2 = true), null == o2 || false === o2 ? false === o2 && "" !== t3.getAttribute(n2) || (u2 ? t3.removeAttributeNS(C, n2) : t3.removeAttribute(n2)) : (!r2 || 4 & l2 || s2) && !i3 && 1 === t3.nodeType && (o2 = true === o2 ? "" : o2, u2 ? t3.setAttributeNS(C, n2, o2) : t3.setAttribute(n2, o2));
    }
  } else if (n2 = "-" === n2[2] ? n2.slice(3) : j(M, c2) ? c2.slice(2) : c2[2] + n2.slice(3), e2 || o2) {
    const s3 = n2.endsWith(tn);
    n2 = n2.replace(nn, ""), e2 && L.rel(t3, n2, e2, s3), o2 && L.ael(t3, n2, o2, s3);
  }
};
var Qt = /\s/;
var Xt = (t3) => ("object" == typeof t3 && t3 && "baseVal" in t3 && (t3 = t3.baseVal), t3 && "string" == typeof t3 ? t3.split(Qt) : []);
var tn = "Capture";
var nn = new RegExp(tn + "$");
var en = (t3, n2, e2, o2) => {
  const s2 = 11 === n2.k.nodeType && n2.k.host ? n2.k.host : n2.k, l2 = t3 && t3.$ || {}, i2 = n2.$ || {};
  for (const t4 of on(Object.keys(l2))) t4 in i2 || Kt(s2, t4, l2[t4], void 0, e2, n2.i, o2);
  for (const t4 of on(Object.keys(i2))) Kt(s2, t4, l2[t4], i2[t4], e2, n2.i, o2);
};
function on(t3) {
  return t3.includes("ref") ? [...t3.filter((t4) => "ref" !== t4), "ref"] : t3;
}
var sn = false;
var ln = false;
var rn = false;
var cn = false;
var un = [];
var fn = [];
var an = (t3, n2, e2) => {
  var o2;
  const s2 = n2.j[e2];
  let l2, i2, r2, c2 = 0;
  if (sn || (rn = true, "slot" === s2.S && (s2.i |= s2.j ? 2 : 1)), null != s2.v) l2 = s2.k = M.document.createTextNode(s2.v);
  else if (1 & s2.i) l2 = s2.k = M.document.createTextNode(""), en(null, s2, cn);
  else {
    if (cn || (cn = "svg" === s2.S), !M.document) throw new Error("You are trying to render a Stencil component in an environment that doesn't support the DOM.");
    if (l2 = s2.k = M.document.createElementNS(cn ? "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", !sn && 2 & s2.i ? "slot-fb" : s2.S), cn && "foreignObject" === s2.S && (cn = false), en(null, s2, cn), null != (u2 = qt) && void 0 !== u2 && l2["s-si"] !== qt && l2.classList.add(l2["s-si"] = qt), s2.j) {
      const n3 = "template" === s2.S ? l2.content : l2;
      for (c2 = 0; c2 < s2.j.length; ++c2) i2 = an(t3, s2, c2), i2 && n3.appendChild(i2);
    }
    "svg" === s2.S ? cn = false : "foreignObject" === l2.tagName && (cn = true);
  }
  var u2;
  return l2["s-hn"] = Jt, 3 & s2.i && (l2["s-sr"] = true, l2["s-cr"] = zt, l2["s-sn"] = s2.N || "", l2["s-rf"] = null == (o2 = s2.$) ? void 0 : o2.ref, nt(l2), r2 = t3 && t3.j && t3.j[e2], r2 && r2.S === s2.S && t3.k && dn(t3.k), Nn(zt, l2, n2.k, null == t3 ? void 0 : t3.k)), l2;
};
var dn = (t3) => {
  L.i |= 1;
  const n2 = t3.closest(Jt.toLowerCase());
  if (null != n2) {
    const e2 = Array.from(n2.__childNodes || n2.childNodes).find((t4) => t4["s-cr"]), o2 = Array.from(t3.__childNodes || t3.childNodes);
    for (const t4 of e2 ? o2.reverse() : o2) null != t4["s-sh"] && (On(n2, t4, null != e2 ? e2 : null), t4["s-sh"] = void 0, rn = true);
  }
  L.i &= -2;
};
var hn = (t3, n2) => {
  L.i |= 1;
  const e2 = Array.from(t3.__childNodes || t3.childNodes);
  if (t3["s-sr"]) {
    let n3 = t3;
    for (; n3 = n3.nextSibling; ) n3 && n3["s-sn"] === t3["s-sn"] && n3["s-sh"] === Jt && e2.push(n3);
  }
  for (let t4 = e2.length - 1; t4 >= 0; t4--) {
    const o2 = e2[t4];
    o2["s-hn"] !== Jt && o2["s-ol"] && (On(bn(o2).parentNode, o2, bn(o2)), o2["s-ol"].remove(), o2["s-ol"] = void 0, o2["s-sh"] = void 0, rn = true), n2 && hn(o2, n2);
  }
  L.i &= -2;
};
var pn = (t3, n2, e2, o2, s2, l2) => {
  let i2, r2 = t3["s-cr"] && t3["s-cr"].parentNode || t3;
  for (r2.shadowRoot && r2.tagName === Jt && (r2 = r2.shadowRoot), "template" === e2.S && (r2 = r2.content); s2 <= l2; ++s2) o2[s2] && (i2 = an(null, e2, s2), i2 && (o2[s2].k = i2, On(r2, i2, bn(n2))));
};
var vn = (t3, n2, e2) => {
  for (let o2 = n2; o2 <= e2; ++o2) {
    const n3 = t3[o2];
    if (n3) {
      const t4 = n3.k;
      wn(n3), t4 && (ln = true, t4["s-ol"] ? t4["s-ol"].remove() : hn(t4, true), t4.remove());
    }
  }
};
var $n = (t3, n2, e2 = false) => t3.S === n2.S && ("slot" === t3.S ? t3.N === n2.N : e2 ? (e2 && !t3.O && n2.O && (t3.O = n2.O), true) : t3.O === n2.O);
var bn = (t3) => t3 && t3["s-ol"] || t3;
var gn = (t3, n2, e2 = false) => {
  const o2 = n2.k = t3.k, s2 = t3.j, l2 = n2.j, i2 = n2.S, r2 = n2.v;
  let c2;
  null == r2 ? (cn = "svg" === i2 || "foreignObject" !== i2 && cn, "slot" !== i2 || sn || t3.N !== n2.N && (n2.k["s-sn"] = n2.N || "", dn(n2.k.parentElement)), en(t3, n2, cn, e2), null !== s2 && null !== l2 ? ((t4, n3, e3, o3, s3 = false) => {
    let l3, i3, r3 = 0, c3 = 0, u2 = 0, f2 = 0, a2 = n3.length - 1, d2 = n3[0], h2 = n3[a2], p2 = o3.length - 1, v2 = o3[0], $2 = o3[p2];
    const b2 = "template" === e3.S ? t4.content : t4;
    for (; r3 <= a2 && c3 <= p2; ) if (null == d2) d2 = n3[++r3];
    else if (null == h2) h2 = n3[--a2];
    else if (null == v2) v2 = o3[++c3];
    else if (null == $2) $2 = o3[--p2];
    else if ($n(d2, v2, s3)) gn(d2, v2, s3), d2 = n3[++r3], v2 = o3[++c3];
    else if ($n(h2, $2, s3)) gn(h2, $2, s3), h2 = n3[--a2], $2 = o3[--p2];
    else if ($n(d2, $2, s3)) "slot" !== d2.S && "slot" !== $2.S || hn(d2.k.parentNode, false), gn(d2, $2, s3), On(b2, d2.k, h2.k.nextSibling), d2 = n3[++r3], $2 = o3[--p2];
    else if ($n(h2, v2, s3)) "slot" !== d2.S && "slot" !== $2.S || hn(h2.k.parentNode, false), gn(h2, v2, s3), On(b2, h2.k, d2.k), h2 = n3[--a2], v2 = o3[++c3];
    else {
      for (u2 = -1, f2 = r3; f2 <= a2; ++f2) if (n3[f2] && null !== n3[f2].O && n3[f2].O === v2.O) {
        u2 = f2;
        break;
      }
      u2 >= 0 ? (i3 = n3[u2], i3.S !== v2.S ? l3 = an(n3 && n3[c3], e3, u2) : (gn(i3, v2, s3), n3[u2] = void 0, l3 = i3.k), v2 = o3[++c3]) : (l3 = an(n3 && n3[c3], e3, c3), v2 = o3[++c3]), l3 && On(bn(d2.k).parentNode, l3, bn(d2.k));
    }
    r3 > a2 ? pn(t4, null == o3[p2 + 1] ? null : o3[p2 + 1].k, e3, o3, c3, p2) : c3 > p2 && vn(n3, r3, a2);
  })(o2, s2, n2, l2, e2) : null !== l2 ? (null !== t3.v && (o2.textContent = ""), pn(o2, null, n2, l2, 0, l2.length - 1)) : e2 || null === s2 ? e2 && null !== s2 && null === l2 && (n2.j = s2) : vn(s2, 0, s2.length - 1), cn && "svg" === i2 && (cn = false)) : (c2 = o2["s-cr"]) ? c2.parentNode.textContent = r2 : t3.v !== r2 && (o2.data = r2);
};
var mn = [];
var yn = (t3) => {
  let n2, e2, o2;
  const s2 = t3.__childNodes || t3.childNodes;
  for (const t4 of s2) {
    if (t4["s-sr"] && (n2 = t4["s-cr"]) && n2.parentNode) {
      e2 = n2.parentNode.__childNodes || n2.parentNode.childNodes;
      const s3 = t4["s-sn"];
      for (o2 = e2.length - 1; o2 >= 0; o2--) if (n2 = e2[o2], !(n2["s-cn"] || n2["s-nr"] || n2["s-hn"] === t4["s-hn"] || n2["s-sh"] && n2["s-sh"] === t4["s-hn"])) if (Q(n2, s3)) {
        let e3 = mn.find((t5) => t5.A === n2);
        ln = true, n2["s-sn"] = n2["s-sn"] || s3, e3 ? (e3.A["s-sh"] = t4["s-hn"], e3._ = t4) : (n2["s-sh"] = t4["s-hn"], mn.push({ _: t4, A: n2 })), n2["s-sr"] && mn.map((t5) => {
          Q(t5.A, n2["s-sn"]) && (e3 = mn.find((t6) => t6.A === n2), e3 && !t5._ && (t5._ = e3._));
        });
      } else mn.some((t5) => t5.A === n2) || mn.push({ A: n2 });
    }
    1 === t4.nodeType && yn(t4);
  }
};
var wn = (t3) => {
  t3.$ && t3.$.ref && un.push(() => t3.$.ref(null)), t3.j && t3.j.map(wn);
};
var jn = (t3, n2) => {
  fn.push(() => t3(n2));
};
var On = (t3, n2, e2, o2) => {
  if ("string" == typeof n2["s-sn"] && n2["s-sr"] && n2["s-cr"]) Nn(n2["s-cr"], n2, t3, n2.parentElement);
  else if ("string" == typeof n2["s-sn"]) {
    11 !== t3.getRootNode().nodeType && mt(n2), t3.insertBefore(n2, e2);
    const { slotNode: s2 } = ot(n2);
    return s2 && !o2 && et(s2), n2;
  }
  return t3.__insertBefore ? t3.__insertBefore(n2, e2) : null == t3 ? void 0 : t3.insertBefore(n2, e2);
};
function Nn(t3, n2, e2, o2) {
  var s2, l2;
  let i2;
  if (t3 && "string" == typeof n2["s-sn"] && n2["s-sr"] && t3.parentNode && t3.parentNode["s-sc"] && (i2 = n2["s-si"] || t3.parentNode["s-sc"])) {
    const t4 = n2["s-sn"], r2 = n2["s-hn"];
    if (null == (s2 = e2.classList) || s2.add(i2 + "-s"), o2 && (null == (l2 = o2.classList) ? void 0 : l2.contains(i2 + "-s"))) {
      let n3 = (o2.__childNodes || o2.childNodes)[0], e3 = false;
      for (; n3; ) {
        if (n3["s-sn"] !== t4 && n3["s-hn"] === r2 && n3["s-sr"]) {
          e3 = true;
          break;
        }
        n3 = n3.nextSibling;
      }
      e3 || o2.classList.remove(i2 + "-s");
    }
  }
}
var Sn = (t3, n2, e2 = false) => {
  var o2, s2, l2, i2, r2;
  const c2 = t3.$hostElement$, u2 = t3.o, f2 = t3.B || Mt(null, null);
  var a2;
  const d2 = (a2 = n2) && a2.S === It ? n2 : Ct(null, null, n2);
  if (Jt = c2.tagName, u2.F && (d2.$ = d2.$ || {}, u2.F.forEach(([t4, n3]) => {
    d2.$[n3] = c2[t4];
  })), e2 && d2.$) for (const t4 of Object.keys(d2.$)) c2.hasAttribute(t4) && !["key", "ref", "style", "class"].includes(t4) && (d2.$[t4] = c2[t4]);
  if (d2.S = null, d2.i |= 4, t3.B = d2, d2.k = f2.k = c2.shadowRoot || c2, qt = c2["s-sc"], sn = !(!(1 & u2.i) || 128 & u2.i), zt = c2["s-cr"], ln = false, gn(f2, d2, e2), L.i |= 1, rn) {
    yn(d2.k);
    for (const t4 of mn) {
      const n3 = t4.A;
      if (!n3["s-ol"] && M.document) {
        const t5 = M.document.createTextNode("");
        t5["s-nr"] = n3, On(n3.parentNode, n3["s-ol"] = t5, n3, e2);
      }
    }
    for (const t4 of mn) {
      const n3 = t4.A, r3 = t4._;
      if (1 === n3.nodeType && e2 && (n3["s-ih"] = null != (o2 = n3.hidden) && o2), r3) {
        const t5 = r3.parentNode;
        let o3 = r3.nextSibling;
        if (o3 && 1 === o3.nodeType) {
          let e3 = null == (s2 = n3["s-ol"]) ? void 0 : s2.previousSibling;
          for (; e3; ) {
            let s3 = null != (l2 = e3["s-nr"]) ? l2 : null;
            if (s3 && s3["s-sn"] === n3["s-sn"] && t5 === (s3.__parentNode || s3.parentNode)) {
              for (s3 = s3.nextSibling; s3 === n3 || (null == s3 ? void 0 : s3["s-sr"]); ) s3 = null == s3 ? void 0 : s3.nextSibling;
              if (!s3 || !s3["s-nr"]) {
                o3 = s3;
                break;
              }
            }
            e3 = e3.previousSibling;
          }
        }
        if ((!o3 && t5 !== (n3.__parentNode || n3.parentNode) || (n3.__nextSibling || n3.nextSibling) !== o3) && n3 !== o3) {
          if (On(t5, n3, o3, e2), 8 === n3.nodeType && n3.nodeValue.startsWith("s-nt-")) {
            const t6 = M.document.createTextNode(n3.nodeValue.replace(/^s-nt-/, ""));
            t6["s-hn"] = n3["s-hn"], t6["s-sn"] = n3["s-sn"], t6["s-sh"] = n3["s-sh"], t6["s-sr"] = n3["s-sr"], t6["s-ol"] = n3["s-ol"], t6["s-ol"]["s-nr"] = t6, On(n3.parentNode, t6, n3, e2), n3.parentNode.removeChild(n3);
          }
          1 === n3.nodeType && "SLOT-FB" !== n3.tagName && (n3.hidden = null != (i2 = n3["s-ih"]) && i2);
        }
        n3 && "function" == typeof r3["s-rf"] && r3["s-rf"](r3);
      } else 1 === n3.nodeType && (n3.hidden = true);
    }
  }
  if (ln && Y(d2.k), L.i &= -2, mn.length = 0, !sn && !(1 & u2.i) && c2["s-cr"]) {
    const t4 = d2.k.__childNodes || d2.k.childNodes;
    for (const n3 of t4) if (n3["s-hn"] !== Jt && !n3["s-sh"]) {
      if (e2 && null == n3["s-ih"] && (n3["s-ih"] = null != (r2 = n3.hidden) && r2), 1 === n3.nodeType) n3.hidden = true;
      else if (3 === n3.nodeType && n3.nodeValue.trim()) {
        const t5 = M.document.createComment("s-nt-" + n3.nodeValue);
        t5["s-sn"] = n3["s-sn"], On(n3.parentNode, t5, n3, e2), n3.parentNode.removeChild(n3);
      }
    }
  }
  zt = void 0, un.forEach((t4) => t4()), un.length = 0, fn.forEach((t4) => t4()), fn.length = 0;
};
var xn = (t3, n2) => {
  if (n2 && !t3.T && n2["s-p"]) {
    const e2 = n2["s-p"].push(new Promise((o2) => t3.T = () => {
      n2["s-p"].splice(e2 - 1, 1), o2();
    }));
  }
};
var En = (t3, n2) => {
  if (t3.i |= 16, 4 & t3.i) return void (t3.i |= 512);
  xn(t3, t3.U);
  const e2 = () => kn(t3, n2);
  if (!n2) return P(e2);
  queueMicrotask(() => {
    e2();
  });
};
var kn = (t3, n2) => {
  const e2 = t3.$hostElement$, o2 = e2;
  if (!o2) throw new Error(`Can't render component <${e2.tagName.toLowerCase()} /> with invalid Stencil runtime! Make sure this imported component is compiled with a \`externalRuntime: true\` flag. For more information, please refer to https://stenciljs.com/docs/custom-elements#externalruntime`);
  let s2;
  return s2 = Bn(o2, n2 ? "componentWillLoad" : "componentWillUpdate", void 0, e2), s2 = Cn(s2, () => Bn(o2, "componentWillRender", void 0, e2)), Cn(s2, () => In(t3, o2, n2));
};
var Cn = (t3, n2) => Mn(t3) ? t3.then(n2).catch((t4) => {
  console.error(t4), n2();
}) : n2();
var Mn = (t3) => t3 instanceof Promise || t3 && t3.then && "function" == typeof t3.then;
var In = (t3, n2, e2) => __async(void 0, null, function* () {
  var o2;
  const s2 = t3.$hostElement$, l2 = s2["s-rc"];
  e2 && ((t4) => {
    const n3 = t4.o, e3 = t4.$hostElement$, o3 = n3.i, s3 = xt(e3.shadowRoot ? e3.shadowRoot : e3.getRootNode(), n3, t4.R);
    10 & o3 && (e3["s-sc"] = s3, e3.classList.add(s3 + "-h"));
  })(t3);
  Ln(t3, n2, s2, e2), l2 && (l2.map((t4) => t4()), s2["s-rc"] = void 0);
  {
    const n3 = null != (o2 = s2["s-p"]) ? o2 : [], e3 = () => Rn(t3);
    0 === n3.length ? e3() : (Promise.all(n3).then(e3).catch(e3), t3.i |= 4, n3.length = 0);
  }
});
var Ln = (t3, n2, e2, o2) => {
  try {
    n2 = n2.render && n2.render(), t3.i &= -17, t3.i |= 2, Sn(t3, n2, o2);
  } catch (n3) {
    O(n3, t3.$hostElement$);
  }
  return null;
};
var Rn = (t3) => {
  const n2 = t3.$hostElement$, e2 = n2, o2 = t3.U;
  Bn(e2, "componentDidRender", void 0, n2), 64 & t3.i ? Bn(e2, "componentDidUpdate", void 0, n2) : (t3.i |= 64, Fn(n2), Bn(e2, "componentDidLoad", void 0, n2), t3.D(n2), o2 || _n()), t3.T && (t3.T(), t3.T = void 0), 512 & t3.i && V(() => En(t3, false)), t3.i &= -517;
};
var An = (t3) => {
  var n2;
  {
    const e2 = w(t3), o2 = null == (n2 = null == e2 ? void 0 : e2.$hostElement$) ? void 0 : n2.isConnected;
    return o2 && 2 == (18 & e2.i) && En(e2, false), o2;
  }
};
var _n = () => {
  var t3;
  V(() => Gt(M, "appload", { detail: { namespace: "ionic" } })), (null == (t3 = L.W) ? void 0 : t3.size) && L.W.clear();
};
var Bn = (t3, n2, e2, o2) => {
  if (t3 && t3[n2]) try {
    return t3[n2](e2);
  } catch (t4) {
    O(t4, o2);
  }
};
var Fn = (t3) => t3.classList.add("hydrated");
var Tn = (t3, n2, e2, o2) => {
  const s2 = w(t3);
  if (!s2) return;
  const l2 = t3, i2 = s2.l.get(n2), r2 = s2.i, c2 = l2;
  e2 = Yt(e2, o2.t[n2][0]);
  const u2 = Number.isNaN(i2) && Number.isNaN(e2);
  if (e2 !== i2 && !u2) {
    if (s2.l.set(n2, e2), o2.V) {
      const t4 = o2.V[n2];
      t4 && t4.map((t5) => {
        try {
          const [[o3, l3]] = Object.entries(t5);
          (128 & r2 || 1 & l3) && (c2 ? c2[o3](e2, i2, n2) : s2.H.push(() => {
            s2.P[o3](e2, i2, n2);
          }));
        } catch (t6) {
          O(t6, l2);
        }
      });
    }
    if (2 & r2) {
      if (c2.componentShouldUpdate && false === c2.componentShouldUpdate(e2, i2, n2) && !(16 & r2)) return;
      16 & r2 || En(s2, false);
    }
  }
};
var Un = (t3, n2) => {
  var e2, o2;
  const s2 = t3.prototype;
  {
    t3.watchers && !n2.V && (n2.V = Ht(t3.watchers)), t3.deserializers && !n2.q && (n2.q = t3.deserializers), t3.serializers && !n2.J && (n2.J = t3.serializers);
    const l2 = Object.entries(null != (e2 = n2.t) ? e2 : {});
    l2.map(([t4, [e3]]) => {
      if (31 & e3 || 32 & e3) {
        const { get: o3, set: l3 } = g(s2, t4) || {};
        o3 && (n2.t[t4][0] |= 2048), l3 && (n2.t[t4][0] |= 4096), Object.defineProperty(s2, t4, { get() {
          return o3 ? o3.apply(this) : (n3 = t4, w(this).l.get(n3));
          var n3;
        }, configurable: true, enumerable: true }), Object.defineProperty(s2, t4, { set(o4) {
          const s3 = w(this);
          if (s3) {
            if (l3) return void 0 === (32 & e3 ? this[t4] : s3.$hostElement$[t4]) && s3.l.get(t4) && (o4 = s3.l.get(t4)), l3.apply(this, [Yt(o4, e3)]), void Tn(this, t4, o4 = 32 & e3 ? this[t4] : s3.$hostElement$[t4], n2);
            Tn(this, t4, o4, n2);
          }
        } });
      }
    });
    {
      const e3 = /* @__PURE__ */ new Map();
      s2.attributeChangedCallback = function(t4, o3, i2) {
        L.jmp(() => {
          var r2;
          const c2 = e3.get(t4), u2 = w(this);
          if (this.hasOwnProperty(c2), s2.hasOwnProperty(c2) && "number" == typeof this[c2] && this[c2] == i2) return;
          if (null == c2) {
            const e4 = null == u2 ? void 0 : u2.i;
            if (u2 && e4 && !(8 & e4) && i2 !== o3) {
              const s3 = this, l3 = null == (r2 = n2.V) ? void 0 : r2[t4];
              null == l3 || l3.forEach((n3) => {
                const [[l4, r3]] = Object.entries(n3);
                null != s3[l4] && (128 & e4 || 1 & r3) && s3[l4].call(s3, i2, o3, t4);
              });
            }
            return;
          }
          const f2 = l2.find(([t5]) => t5 === c2), a2 = f2 && 4 & f2[1][0], d2 = a2 && null === i2 && void 0 === this[c2];
          a2 && (i2 = null !== i2 && "false" !== i2);
          const h2 = Object.getOwnPropertyDescriptor(s2, c2);
          d2 || i2 == this[c2] || h2.get && !h2.set || (this[c2] = i2);
        });
      }, t3.observedAttributes = Array.from(/* @__PURE__ */ new Set([...Object.keys(null != (o2 = n2.V) ? o2 : {}), ...l2.filter(([t4, n3]) => 31 & n3[0]).map(([t4, o3]) => {
        var s3;
        const l3 = o3[1] || t4;
        return e3.set(l3, t4), 512 & o3[0] && (null == (s3 = n2.F) || s3.push([t4, l3])), l3;
      })]));
    }
  }
  return t3;
};
var Dn = (t3) => {
  if (!(1 & L.i)) {
    const n2 = w(t3);
    if (!n2) return;
    const e2 = n2.o, o2 = () => {
    };
    if (1 & n2.i) Pn(t3, n2, e2.Y), (null == n2 ? void 0 : n2.P) || (null == n2 ? void 0 : n2.Z) && n2.Z.then(() => {
    });
    else {
      let o3;
      if (n2.i |= 1, o3 = t3.getAttribute(x), o3) {
        if (1 & e2.i) {
          const n3 = xt(t3.shadowRoot, e2, t3.getAttribute("s-mode"));
          t3.classList.remove(n3 + "-h", n3 + "-s");
        } else if (2 & e2.i) {
          const n3 = Et(e2, t3.getAttribute("s-mode"));
          t3["s-sc"] = n3;
        }
        ((t4, n3, e3, o4) => {
          var s2, l2, i2, r2;
          const c2 = t4.shadowRoot, u2 = [], f2 = [], a2 = [], d2 = c2 ? [] : null, h2 = Mt(n3, null);
          let p2;
          h2.k = t4;
          {
            const n4 = o4.o;
            n4 && 10 & n4.i && t4["s-sc"] ? (p2 = t4["s-sc"], t4.classList.add(p2 + "-h")) : t4["s-sc"] && delete t4["s-sc"];
          }
          !M.document || L.W && L.W.size || Bt(M.document.body, L.W = /* @__PURE__ */ new Map()), t4[x] = e3, t4.removeAttribute(x), o4.B = _t(h2, u2, f2, d2, t4, t4, e3, a2);
          let v2 = 0;
          const $2 = u2.length;
          let b2;
          for (; v2 < $2; v2++) {
            b2 = u2[v2];
            const e4 = b2.C + "." + b2.M, o5 = L.W.get(e4), l3 = b2.k;
            if (c2) {
              if ((null == (s2 = b2.S) ? void 0 : s2.toString().includes("-")) && "slot-fb" !== b2.S && !b2.k.shadowRoot) {
                const t5 = w(b2.k);
                if (t5) {
                  const n4 = Et(t5.o, b2.k.getAttribute("s-mode")), e5 = M.document.querySelector(`style[sty-id="${n4}"]`);
                  e5 && d2.unshift(e5.cloneNode(true));
                }
              }
            } else l3["s-hn"] = n3.toUpperCase(), "slot" === b2.S && (l3["s-cr"] = t4["s-cr"]);
            "slot" === b2.S && (b2.N = b2.k["s-sn"] || b2.k.name || null, b2.j ? (b2.i |= 2, b2.k.childNodes.length || b2.j.forEach((t5) => {
              b2.k.appendChild(t5.k);
            })) : b2.i |= 1), o5 && o5.isConnected && (o5.parentElement.shadowRoot && "" === o5["s-en"] && o5.parentNode.insertBefore(l3, o5.nextSibling), o5.parentNode.removeChild(o5), c2 || (l3["s-oo"] = parseInt(b2.M))), o5 && !o5["s-id"] && L.W.delete(e4);
          }
          const g2 = [], m2 = a2.length;
          let y2, j2, O2, N2, S2 = 0, E2 = 0;
          for (; S2 < m2; S2++) if (y2 = a2[S2], y2 && y2.length) for (O2 = y2.length, j2 = 0; j2 < O2; j2++) {
            if (N2 = y2[j2], g2[N2.hostId] || (g2[N2.hostId] = L.W.get(N2.hostId)), !g2[N2.hostId]) continue;
            const t5 = g2[N2.hostId];
            t5.shadowRoot && N2.node.parentElement !== t5 && t5.insertBefore(N2.node, null == (i2 = null == (l2 = y2[j2 - 1]) ? void 0 : l2.node) ? void 0 : i2.nextSibling), t5.shadowRoot && c2 || (N2.slot["s-cr"] || (N2.slot["s-cr"] = t5["s-cr"], N2.slot["s-cr"] = !N2.slot["s-cr"] && t5.shadowRoot ? t5 : (t5.__childNodes || t5.childNodes)[0]), X(N2.node, N2.slot, false, N2.node["s-oo"] || E2), (null == (r2 = N2.node.parentElement) ? void 0 : r2.shadowRoot) && N2.node.getAttribute && N2.node.getAttribute("slot") && N2.node.removeAttribute("slot"), (k2 = N2.node) && void 0 === k2.__nextSibling && globalThis.Node && (vt(k2), bt(k2), mt(k2), k2.nodeType === Node.ELEMENT_NODE && ($t(k2), gt(k2)))), E2 = (N2.node["s-oo"] || E2) + 1;
          }
          var k2;
          if (p2 && f2.length && f2.forEach((t5) => {
            t5.k.parentElement.classList.add(p2 + "-s");
          }), c2 && !c2.childNodes.length) {
            let n4 = 0;
            const e4 = d2.length;
            if (e4) {
              for (; n4 < e4; n4++) {
                const t5 = d2[n4];
                t5 && c2.appendChild(t5);
              }
              Array.from(t4.childNodes).forEach((t5) => {
                "string" != typeof t5["s-en"] && "string" != typeof t5["s-sn"] && (1 === t5.nodeType && t5.slot && t5.hidden ? t5.removeAttribute("hidden") : 8 !== t5.nodeType || t5.nodeValue || t5.parentNode.removeChild(t5));
              });
            }
          }
          o4.$hostElement$ = t4;
        })(t3, e2.p, o3, n2);
      }
      o3 || 12 & e2.i && Wn(t3);
      {
        let e3 = t3;
        for (; e3 = e3.parentNode || e3.host; ) if (1 === e3.nodeType && e3.hasAttribute("s-id") && e3["s-p"] || e3["s-p"]) {
          xn(n2, n2.U = e3);
          break;
        }
      }
      e2.t && Object.entries(e2.t).map(([n3, [e3]]) => {
        if (31 & e3 && Object.prototype.hasOwnProperty.call(t3, n3)) {
          const e4 = t3[n3];
          delete t3[n3], t3[n3] = e4;
        }
      }), ((t4, n3, e3) => __async(void 0, null, function* () {
        let o4;
        try {
          if (!(32 & n3.i) && (n3.i |= 32, o4 = t4.constructor, customElements.whenDefined(t4.localName).then(() => n3.i |= 128), o4 && o4.style)) {
            let s3;
            "string" == typeof o4.style ? s3 = o4.style : "string" != typeof o4.style && (n3.R = ((t5) => S.map((n4) => n4(t5)).find((t6) => !!t6))(t4), n3.R && (s3 = o4.style[n3.R]));
            const l3 = Et(e3, n3.R);
            if (!N.has(l3)) {
              const t5 = () => {
              };
              St(l3, s3, !!(1 & e3.i)), t5();
            }
          }
          const s2 = n3.U, l2 = () => En(n3, true);
          s2 && s2["s-rc"] ? s2["s-rc"].push(l2) : l2();
        } catch (e4) {
          O(e4, t4), n3.T && (n3.T(), n3.T = void 0), n3.D && n3.D(t4);
        }
      }))(t3, n2, e2);
    }
    o2();
  }
};
var Wn = (t3) => {
  if (!M.document) return;
  const n2 = t3["s-cr"] = M.document.createComment("");
  n2["s-cn"] = true, On(t3, n2, t3.firstChild);
};
var Vn = (t3, n2) => {
  const e2 = { i: n2[0], p: n2[1] };
  try {
    e2.t = n2[2], e2.Y = n2[3], e2.V = Ht(t3.V), e2.q = t3.q, e2.J = t3.J, e2.F = [], !(1 & e2.i) && 256 & e2.i ? (st(o2 = t3.prototype), lt(o2), ct(o2), rt(o2), dt(o2), ut(o2), ft(o2), at(o2), ht(o2), pt(o2), it(o2)) : st(t3.prototype), (() => {
      if (!M.document) return;
      const t4 = M.document.querySelectorAll(`[${E}]`);
      let n3 = 0;
      for (; n3 < t4.length; n3++) St(t4[n3].getAttribute(E), t4[n3].innerHTML.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g, "$1{"), true);
    })();
    const s2 = t3.prototype.connectedCallback, l2 = t3.prototype.disconnectedCallback;
    return Object.assign(t3.prototype, { __hasHostListenerAttached: false, __registerHost() {
      ((t4, n3) => {
        const e3 = { i: 0, $hostElement$: t4, o: n3, l: /* @__PURE__ */ new Map(), G: /* @__PURE__ */ new Map() };
        e3.Z = new Promise((t5) => e3.D = t5), t4["s-p"] = [], t4["s-rc"] = [];
        const o3 = e3;
        t4.__stencil__getHostRef = () => o3, 512 & n3.i && y(t4, e3);
      })(this, e2);
    }, connectedCallback() {
      if (!this.__hasHostListenerAttached) {
        const t4 = w(this);
        if (!t4) return;
        Pn(this, t4, e2.Y), this.__hasHostListenerAttached = true;
      }
      Dn(this), s2 && s2.call(this);
    }, disconnectedCallback() {
      ((t4) => __async(this, null, function* () {
        if (!(1 & L.i)) {
          const n3 = w(t4);
          (null == n3 ? void 0 : n3.K) && (n3.K.map((t5) => t5()), n3.K = void 0);
        }
        Nt.has(t4) && Nt.delete(t4), t4.shadowRoot && Nt.has(t4.shadowRoot) && Nt.delete(t4.shadowRoot);
      }))(this), l2 && l2.call(this);
    }, __attachShadow() {
      if (this.shadowRoot) {
        if ("open" !== this.shadowRoot.mode) throw new Error(`Unable to re-use existing shadow root for ${e2.p}! Mode is set to ${this.shadowRoot.mode} but Stencil only supports open shadow roots.`);
      } else J.call(this, e2);
    } }), Object.defineProperty(t3, "is", { value: e2.p, configurable: true }), Un(t3, e2);
  } catch (n3) {
    return O(n3), t3;
  }
  var o2;
};
var Hn = (t3, n2) => n2;
var Pn = (t3, n2, e2) => {
  e2 && M.document && e2.map(([e3, o2, s2]) => {
    const l2 = zn(M.document, t3, e3), i2 = qn(n2, s2), r2 = Jn(e3);
    L.ael(l2, o2, i2, r2), (n2.K = n2.K || []).push(() => L.rel(l2, o2, i2, r2));
  });
};
var qn = (t3, n2) => (e2) => {
  try {
    t3.$hostElement$[n2](e2);
  } catch (n3) {
    O(n3, t3.$hostElement$);
  }
};
var zn = (t3, n2, e2) => 4 & e2 ? t3 : 8 & e2 ? M : 16 & e2 ? t3.body : n2;
var Jn = (t3) => R ? { passive: !!(1 & t3), capture: !!(2 & t3) } : !!(2 & t3);
function Qn(t3) {
  return t3;
}

export {
  n,
  e,
  o,
  s,
  u,
  f,
  a,
  d,
  I,
  H,
  P,
  q,
  Ct,
  It,
  Wt,
  Vt,
  Zt,
  An,
  Vn,
  Hn,
  Qn
};
/*! Bundled license information:

@ionic/core/components/p-CHqRYvYm.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=chunk-CN5C4E5W.js.map
