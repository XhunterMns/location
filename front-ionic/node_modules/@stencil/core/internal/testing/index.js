"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  "node_modules/balanced-match/index.js"(exports2, module2) {
    "use strict";
    module2.exports = balanced;
    function balanced(a, b, str) {
      if (a instanceof RegExp) a = maybeMatch(a, str);
      if (b instanceof RegExp) b = maybeMatch(b, str);
      var r = range(a, b, str);
      return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
      };
    }
    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
      var begs, beg, left, right, result;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i2 = ai;
      if (ai >= 0 && bi > 0) {
        if (a === b) {
          return [ai, bi];
        }
        begs = [];
        left = str.length;
        while (i2 >= 0 && !result) {
          if (i2 == ai) {
            begs.push(i2);
            ai = str.indexOf(a, i2 + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
            bi = str.indexOf(b, i2 + 1);
          }
          i2 = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result = [left, right];
        }
      }
      return result;
    }
  }
});

// node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS({
  "node_modules/brace-expansion/index.js"(exports2, module2) {
    var balanced = require_balanced_match();
    module2.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0";
    var escOpen = "\0OPEN" + Math.random() + "\0";
    var escClose = "\0CLOSE" + Math.random() + "\0";
    var escComma = "\0COMMA" + Math.random() + "\0";
    var escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str) {
      return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
    }
    function escapeBraces(str) {
      return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }
    function unescapeBraces(str) {
      return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
    }
    function parseCommaParts(str) {
      if (!str)
        return [""];
      var parts = [];
      var m = balanced("{", "}", str);
      if (!m)
        return str.split(",");
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(",");
      p[p.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
      }
      parts.push.apply(parts, p);
      return parts;
    }
    function expandTop(str) {
      if (!str)
        return [];
      if (str.substr(0, 2) === "{}") {
        str = "\\{\\}" + str.substr(2);
      }
      return expand2(escapeBraces(str), true).map(unescapeBraces);
    }
    function embrace(str) {
      return "{" + str + "}";
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i2, y) {
      return i2 <= y;
    }
    function gte(i2, y) {
      return i2 >= y;
    }
    function expand2(str, isTop) {
      var expansions = [];
      var m = balanced("{", "}", str);
      if (!m) return [str];
      var pre = m.pre;
      var post = m.post.length ? expand2(m.post, false) : [""];
      if (/\$$/.test(m.pre)) {
        for (var k = 0; k < post.length; k++) {
          var expansion = pre + "{" + m.body + "}" + post[k];
          expansions.push(expansion);
        }
      } else {
        var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
        var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
        var isSequence = isNumericSequence || isAlphaSequence;
        var isOptions = m.body.indexOf(",") >= 0;
        if (!isSequence && !isOptions) {
          if (m.post.match(/,(?!,).*\}/)) {
            str = m.pre + "{" + m.body + escClose + m.post;
            return expand2(str);
          }
          return [str];
        }
        var n;
        if (isSequence) {
          n = m.body.split(/\.\./);
        } else {
          n = parseCommaParts(m.body);
          if (n.length === 1) {
            n = expand2(n[0], false).map(embrace);
            if (n.length === 1) {
              return post.map(function(p) {
                return m.pre + n[0] + p;
              });
            }
          }
        }
        var N;
        if (isSequence) {
          var x = numeric(n[0]);
          var y = numeric(n[1]);
          var width = Math.max(n[0].length, n[1].length);
          var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
          var test = lte;
          var reverse = y < x;
          if (reverse) {
            incr *= -1;
            test = gte;
          }
          var pad = n.some(isPadded);
          N = [];
          for (var i2 = x; test(i2, y); i2 += incr) {
            var c;
            if (isAlphaSequence) {
              c = String.fromCharCode(i2);
              if (c === "\\")
                c = "";
            } else {
              c = String(i2);
              if (pad) {
                var need = width - c.length;
                if (need > 0) {
                  var z = new Array(need + 1).join("0");
                  if (i2 < 0)
                    c = "-" + z + c.slice(1);
                  else
                    c = z + c;
                }
              }
            }
            N.push(c);
          }
        } else {
          N = [];
          for (var j = 0; j < n.length; j++) {
            N.push.apply(N, expand2(n[j], false));
          }
        }
        for (var j = 0; j < N.length; j++) {
          for (var k = 0; k < post.length; k++) {
            var expansion = pre + N[j] + post[k];
            if (!isTop || isSequence || expansion)
              expansions.push(expansion);
          }
        }
      }
      return expansions;
    }
  }
});

// src/testing/platform/index.ts
var index_exports = {};
__export(index_exports, {
  Build: () => Build,
  Env: () => import_app_data24.Env,
  Fragment: () => Fragment,
  HYDRATED_STYLE_ID: () => HYDRATED_STYLE_ID,
  Host: () => Host,
  Mixin: () => Mixin,
  addHostEventListeners: () => addHostEventListeners,
  bootstrapLazy: () => bootstrapLazy,
  connectedCallback: () => connectedCallback,
  consoleDevError: () => consoleDevError,
  consoleDevInfo: () => consoleDevInfo,
  consoleDevWarn: () => consoleDevWarn,
  consoleError: () => consoleError,
  createEvent: () => createEvent,
  defineCustomElement: () => defineCustomElement,
  disconnectedCallback: () => disconnectedCallback,
  flushAll: () => flushAll,
  flushLoadModule: () => flushLoadModule,
  flushQueue: () => flushQueue,
  forceModeUpdate: () => forceModeUpdate,
  forceUpdate: () => forceUpdate,
  getAssetPath: () => getAssetPath,
  getElement: () => getElement,
  getHostRef: () => getHostRef,
  getMode: () => getMode,
  getRenderingRef: () => getRenderingRef,
  getValue: () => getValue,
  h: () => h,
  insertVdomAnnotations: () => insertVdomAnnotations,
  isMemberInElement: () => isMemberInElement,
  jsx: () => jsx,
  jsxDEV: () => jsxDEV,
  jsxs: () => jsxs,
  loadModule: () => loadModule,
  modeResolutionChain: () => modeResolutionChain,
  needsScopedSSR: () => needsScopedSSR,
  nextTick: () => nextTick,
  normalizeWatchers: () => normalizeWatchers,
  parsePropertyValue: () => parsePropertyValue,
  plt: () => plt,
  postUpdateComponent: () => postUpdateComponent,
  proxyComponent: () => proxyComponent,
  proxyCustomElement: () => proxyCustomElement,
  readTask: () => readTask,
  registerComponents: () => registerComponents,
  registerHost: () => registerHost,
  registerInstance: () => registerInstance,
  registerModule: () => registerModule,
  render: () => render,
  renderVdom: () => renderVdom,
  resetPlatform: () => resetPlatform,
  setAssetPath: () => setAssetPath,
  setErrorHandler: () => setErrorHandler,
  setMode: () => setMode,
  setNonce: () => setNonce,
  setPlatformHelpers: () => setPlatformHelpers,
  setPlatformOptions: () => setPlatformOptions,
  setScopedSSR: () => setScopedSSR,
  setSupportsShadowDom: () => setSupportsShadowDom,
  setTagTransformer: () => setTagTransformer,
  setValue: () => setValue,
  startAutoApplyChanges: () => startAutoApplyChanges,
  stopAutoApplyChanges: () => stopAutoApplyChanges,
  styles: () => styles,
  supportsConstructableStylesheets: () => supportsConstructableStylesheets,
  supportsListenerOptions: () => supportsListenerOptions,
  supportsMutableAdoptedStyleSheets: () => supportsMutableAdoptedStyleSheets,
  supportsShadow: () => supportsShadow,
  transformTag: () => transformTag,
  win: () => win,
  writeTask: () => writeTask
});
module.exports = __toCommonJS(index_exports);

// src/testing/platform/testing-build.ts
var Build = {
  isDev: true,
  isBrowser: false,
  isServer: true,
  isTesting: true
};

// src/testing/platform/testing-constants.ts
var styles = /* @__PURE__ */ new Map();
var modeResolutionChain = [];
var cstrs = /* @__PURE__ */ new Map();
var queuedTicks = [];
var queuedWriteTasks = [];
var queuedReadTasks = [];
var moduleLoaded = /* @__PURE__ */ new Map();
var queuedLoadModules = [];
var caughtErrors = [];

// src/runtime/event-emitter.ts
var import_app_data2 = require("@stencil/core/internal/app-data");

// src/utils/constants.ts
var SVG_NS = "http://www.w3.org/2000/svg";
var HTML_NS = "http://www.w3.org/1999/xhtml";
var PrimitiveType = /* @__PURE__ */ ((PrimitiveType2) => {
  PrimitiveType2["Undefined"] = "undefined";
  PrimitiveType2["Null"] = "null";
  PrimitiveType2["String"] = "string";
  PrimitiveType2["Number"] = "number";
  PrimitiveType2["SpecialNumber"] = "number";
  PrimitiveType2["Boolean"] = "boolean";
  PrimitiveType2["BigInt"] = "bigint";
  return PrimitiveType2;
})(PrimitiveType || {});
var NonPrimitiveType = /* @__PURE__ */ ((NonPrimitiveType2) => {
  NonPrimitiveType2["Array"] = "array";
  NonPrimitiveType2["Date"] = "date";
  NonPrimitiveType2["Map"] = "map";
  NonPrimitiveType2["Object"] = "object";
  NonPrimitiveType2["RegularExpression"] = "regexp";
  NonPrimitiveType2["Set"] = "set";
  NonPrimitiveType2["Channel"] = "channel";
  NonPrimitiveType2["Symbol"] = "symbol";
  return NonPrimitiveType2;
})(NonPrimitiveType || {});
var TYPE_CONSTANT = "type";
var VALUE_CONSTANT = "value";
var SERIALIZED_PREFIX = "serialized:";

// src/runtime/element.ts
var import_app_data = require("@stencil/core/internal/app-data");
var getElement = (ref) => {
  var _a2;
  return import_app_data.BUILD.lazyLoad ? (_a2 = getHostRef(ref)) == null ? void 0 : _a2.$hostElement$ : ref;
};

// src/runtime/event-emitter.ts
var createEvent = (ref, name, flags) => {
  const elm = getElement(ref);
  return {
    emit: (detail) => {
      if (import_app_data2.BUILD.isDev && !elm.isConnected) {
        consoleDevWarn(`The "${name}" event was emitted, but the dispatcher node is no longer connected to the dom.`);
      }
      return emitEvent(elm, name, {
        bubbles: !!(flags & 4 /* Bubbles */),
        composed: !!(flags & 2 /* Composed */),
        cancelable: !!(flags & 1 /* Cancellable */),
        detail
      });
    }
  };
};
var emitEvent = (elm, name, opts) => {
  const ev = plt.ce(name, opts);
  elm.dispatchEvent(ev);
  return ev;
};

// src/utils/helpers.ts
var isDef = (v) => v != null && v !== void 0;
var isComplexType = (o) => {
  o = typeof o;
  return o === "object" || o === "function";
};

// node_modules/minimatch/dist/esm/index.js
var import_brace_expansion = __toESM(require_brace_expansion(), 1);

// node_modules/minimatch/dist/esm/assert-valid-pattern.js
var MAX_PATTERN_LENGTH = 1024 * 64;
var assertValidPattern = (pattern) => {
  if (typeof pattern !== "string") {
    throw new TypeError("invalid pattern");
  }
  if (pattern.length > MAX_PATTERN_LENGTH) {
    throw new TypeError("pattern is too long");
  }
};

// node_modules/minimatch/dist/esm/brace-expressions.js
var posixClasses = {
  "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true],
  "[:alpha:]": ["\\p{L}\\p{Nl}", true],
  "[:ascii:]": ["\\x00-\\x7f", false],
  "[:blank:]": ["\\p{Zs}\\t", true],
  "[:cntrl:]": ["\\p{Cc}", true],
  "[:digit:]": ["\\p{Nd}", true],
  "[:graph:]": ["\\p{Z}\\p{C}", true, true],
  "[:lower:]": ["\\p{Ll}", true],
  "[:print:]": ["\\p{C}", true],
  "[:punct:]": ["\\p{P}", true],
  "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true],
  "[:upper:]": ["\\p{Lu}", true],
  "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true],
  "[:xdigit:]": ["A-Fa-f0-9", false]
};
var braceEscape = (s) => s.replace(/[[\]\\-]/g, "\\$&");
var regexpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var rangesToString = (ranges) => ranges.join("");
var parseClass = (glob, position) => {
  const pos = position;
  if (glob.charAt(pos) !== "[") {
    throw new Error("not in a brace expression");
  }
  const ranges = [];
  const negs = [];
  let i2 = pos + 1;
  let sawStart = false;
  let uflag = false;
  let escaping = false;
  let negate = false;
  let endPos = pos;
  let rangeStart = "";
  WHILE: while (i2 < glob.length) {
    const c = glob.charAt(i2);
    if ((c === "!" || c === "^") && i2 === pos + 1) {
      negate = true;
      i2++;
      continue;
    }
    if (c === "]" && sawStart && !escaping) {
      endPos = i2 + 1;
      break;
    }
    sawStart = true;
    if (c === "\\") {
      if (!escaping) {
        escaping = true;
        i2++;
        continue;
      }
    }
    if (c === "[" && !escaping) {
      for (const [cls, [unip, u, neg]] of Object.entries(posixClasses)) {
        if (glob.startsWith(cls, i2)) {
          if (rangeStart) {
            return ["$.", false, glob.length - pos, true];
          }
          i2 += cls.length;
          if (neg)
            negs.push(unip);
          else
            ranges.push(unip);
          uflag = uflag || u;
          continue WHILE;
        }
      }
    }
    escaping = false;
    if (rangeStart) {
      if (c > rangeStart) {
        ranges.push(braceEscape(rangeStart) + "-" + braceEscape(c));
      } else if (c === rangeStart) {
        ranges.push(braceEscape(c));
      }
      rangeStart = "";
      i2++;
      continue;
    }
    if (glob.startsWith("-]", i2 + 1)) {
      ranges.push(braceEscape(c + "-"));
      i2 += 2;
      continue;
    }
    if (glob.startsWith("-", i2 + 1)) {
      rangeStart = c;
      i2 += 2;
      continue;
    }
    ranges.push(braceEscape(c));
    i2++;
  }
  if (endPos < i2) {
    return ["", false, 0, false];
  }
  if (!ranges.length && !negs.length) {
    return ["$.", false, glob.length - pos, true];
  }
  if (negs.length === 0 && ranges.length === 1 && /^\\?.$/.test(ranges[0]) && !negate) {
    const r = ranges[0].length === 2 ? ranges[0].slice(-1) : ranges[0];
    return [regexpEscape(r), false, endPos - pos, false];
  }
  const sranges = "[" + (negate ? "^" : "") + rangesToString(ranges) + "]";
  const snegs = "[" + (negate ? "" : "^") + rangesToString(negs) + "]";
  const comb = ranges.length && negs.length ? "(" + sranges + "|" + snegs + ")" : ranges.length ? sranges : snegs;
  return [comb, uflag, endPos - pos, true];
};

// node_modules/minimatch/dist/esm/unescape.js
var unescape = (s, { windowsPathsNoEscape = false } = {}) => {
  return windowsPathsNoEscape ? s.replace(/\[([^\/\\])\]/g, "$1") : s.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1");
};

// node_modules/minimatch/dist/esm/ast.js
var _a;
var types = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]);
var isExtglobType = (c) => types.has(c);
var isExtglobAST = (c) => isExtglobType(c.type);
var adoptionMap = /* @__PURE__ */ new Map([
  ["!", ["@"]],
  ["?", ["?", "@"]],
  ["@", ["@"]],
  ["*", ["*", "+", "?", "@"]],
  ["+", ["+", "@"]]
]);
var adoptionWithSpaceMap = /* @__PURE__ */ new Map([
  ["!", ["?"]],
  ["@", ["?"]],
  ["+", ["?", "*"]]
]);
var adoptionAnyMap = /* @__PURE__ */ new Map([
  ["!", ["?", "@"]],
  ["?", ["?", "@"]],
  ["@", ["?", "@"]],
  ["*", ["*", "+", "?", "@"]],
  ["+", ["+", "@", "?", "*"]]
]);
var usurpMap = /* @__PURE__ */ new Map([
  ["!", /* @__PURE__ */ new Map([["!", "@"]])],
  ["?", /* @__PURE__ */ new Map([["*", "*"], ["+", "*"]])],
  ["@", /* @__PURE__ */ new Map([["!", "!"], ["?", "?"], ["@", "@"], ["*", "*"], ["+", "+"]])],
  ["+", /* @__PURE__ */ new Map([["?", "*"], ["*", "*"]])]
]);
var startNoTraversal = "(?!(?:^|/)\\.\\.?(?:$|/))";
var startNoDot = "(?!\\.)";
var addPatternStart = /* @__PURE__ */ new Set(["[", "."]);
var justDots = /* @__PURE__ */ new Set(["..", "."]);
var reSpecials = new Set("().*{}+?[]^$\\!");
var regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var qmark = "[^/]";
var star = qmark + "*?";
var starNoEmpty = qmark + "+?";
var _root, _hasMagic, _uflag, _parts, _parent, _parentIndex, _negs, _filledNegs, _options, _toString, _emptyExt, _AST_instances, fillNegs_fn, _AST_static, parseAST_fn, canAdoptWithSpace_fn, canAdopt_fn, canAdoptType_fn, adoptWithSpace_fn, adopt_fn, canUsurpType_fn, canUsurp_fn, usurp_fn, flatten_fn, partsToRegExp_fn, parseGlob_fn;
var AST = class {
  constructor(type, parent, options = {}) {
    __privateAdd(this, _AST_instances);
    __publicField(this, "type");
    __privateAdd(this, _root);
    __privateAdd(this, _hasMagic);
    __privateAdd(this, _uflag, false);
    __privateAdd(this, _parts, []);
    __privateAdd(this, _parent);
    __privateAdd(this, _parentIndex);
    __privateAdd(this, _negs);
    __privateAdd(this, _filledNegs, false);
    __privateAdd(this, _options);
    __privateAdd(this, _toString);
    // set to true if it's an extglob with no children
    // (which really means one child of '')
    __privateAdd(this, _emptyExt, false);
    this.type = type;
    if (type)
      __privateSet(this, _hasMagic, true);
    __privateSet(this, _parent, parent);
    __privateSet(this, _root, __privateGet(this, _parent) ? __privateGet(__privateGet(this, _parent), _root) : this);
    __privateSet(this, _options, __privateGet(this, _root) === this ? options : __privateGet(__privateGet(this, _root), _options));
    __privateSet(this, _negs, __privateGet(this, _root) === this ? [] : __privateGet(__privateGet(this, _root), _negs));
    if (type === "!" && !__privateGet(__privateGet(this, _root), _filledNegs))
      __privateGet(this, _negs).push(this);
    __privateSet(this, _parentIndex, __privateGet(this, _parent) ? __privateGet(__privateGet(this, _parent), _parts).length : 0);
  }
  get hasMagic() {
    if (__privateGet(this, _hasMagic) !== void 0)
      return __privateGet(this, _hasMagic);
    for (const p of __privateGet(this, _parts)) {
      if (typeof p === "string")
        continue;
      if (p.type || p.hasMagic)
        return __privateSet(this, _hasMagic, true);
    }
    return __privateGet(this, _hasMagic);
  }
  // reconstructs the pattern
  toString() {
    if (__privateGet(this, _toString) !== void 0)
      return __privateGet(this, _toString);
    if (!this.type) {
      return __privateSet(this, _toString, __privateGet(this, _parts).map((p) => String(p)).join(""));
    } else {
      return __privateSet(this, _toString, this.type + "(" + __privateGet(this, _parts).map((p) => String(p)).join("|") + ")");
    }
  }
  push(...parts) {
    for (const p of parts) {
      if (p === "")
        continue;
      if (typeof p !== "string" && !(p instanceof _a && __privateGet(p, _parent) === this)) {
        throw new Error("invalid part: " + p);
      }
      __privateGet(this, _parts).push(p);
    }
  }
  toJSON() {
    var _a2;
    const ret = this.type === null ? __privateGet(this, _parts).slice().map((p) => typeof p === "string" ? p : p.toJSON()) : [this.type, ...__privateGet(this, _parts).map((p) => p.toJSON())];
    if (this.isStart() && !this.type)
      ret.unshift([]);
    if (this.isEnd() && (this === __privateGet(this, _root) || __privateGet(__privateGet(this, _root), _filledNegs) && ((_a2 = __privateGet(this, _parent)) == null ? void 0 : _a2.type) === "!")) {
      ret.push({});
    }
    return ret;
  }
  isStart() {
    var _a2;
    if (__privateGet(this, _root) === this)
      return true;
    if (!((_a2 = __privateGet(this, _parent)) == null ? void 0 : _a2.isStart()))
      return false;
    if (__privateGet(this, _parentIndex) === 0)
      return true;
    const p = __privateGet(this, _parent);
    for (let i2 = 0; i2 < __privateGet(this, _parentIndex); i2++) {
      const pp = __privateGet(p, _parts)[i2];
      if (!(pp instanceof _a && pp.type === "!")) {
        return false;
      }
    }
    return true;
  }
  isEnd() {
    var _a2, _b, _c;
    if (__privateGet(this, _root) === this)
      return true;
    if (((_a2 = __privateGet(this, _parent)) == null ? void 0 : _a2.type) === "!")
      return true;
    if (!((_b = __privateGet(this, _parent)) == null ? void 0 : _b.isEnd()))
      return false;
    if (!this.type)
      return (_c = __privateGet(this, _parent)) == null ? void 0 : _c.isEnd();
    const pl = __privateGet(this, _parent) ? __privateGet(__privateGet(this, _parent), _parts).length : 0;
    return __privateGet(this, _parentIndex) === pl - 1;
  }
  copyIn(part) {
    if (typeof part === "string")
      this.push(part);
    else
      this.push(part.clone(this));
  }
  clone(parent) {
    const c = new _a(this.type, parent);
    for (const p of __privateGet(this, _parts)) {
      c.copyIn(p);
    }
    return c;
  }
  static fromGlob(pattern, options = {}) {
    var _a2;
    const ast = new _a(null, void 0, options);
    __privateMethod(_a2 = _a, _AST_static, parseAST_fn).call(_a2, pattern, ast, 0, options, 0);
    return ast;
  }
  // returns the regular expression if there's magic, or the unescaped
  // string if not.
  toMMPattern() {
    if (this !== __privateGet(this, _root))
      return __privateGet(this, _root).toMMPattern();
    const glob = this.toString();
    const [re, body, hasMagic, uflag] = this.toRegExpSource();
    const anyMagic = hasMagic || __privateGet(this, _hasMagic) || __privateGet(this, _options).nocase && !__privateGet(this, _options).nocaseMagicOnly && glob.toUpperCase() !== glob.toLowerCase();
    if (!anyMagic) {
      return body;
    }
    const flags = (__privateGet(this, _options).nocase ? "i" : "") + (uflag ? "u" : "");
    return Object.assign(new RegExp(`^${re}$`, flags), {
      _src: re,
      _glob: glob
    });
  }
  get options() {
    return __privateGet(this, _options);
  }
  // returns the string match, the regexp source, whether there's magic
  // in the regexp (so a regular expression is required) and whether or
  // not the uflag is needed for the regular expression (for posix classes)
  // TODO: instead of injecting the start/end at this point, just return
  // the BODY of the regexp, along with the start/end portions suitable
  // for binding the start/end in either a joined full-path makeRe context
  // (where we bind to (^|/), or a standalone matchPart context (where
  // we bind to ^, and not /).  Otherwise slashes get duped!
  //
  // In part-matching mode, the start is:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: ^(?!\.\.?$)
  // - if dots allowed or not possible: ^
  // - if dots possible and not allowed: ^(?!\.)
  // end is:
  // - if not isEnd(): nothing
  // - else: $
  //
  // In full-path matching mode, we put the slash at the START of the
  // pattern, so start is:
  // - if first pattern: same as part-matching mode
  // - if not isStart(): nothing
  // - if traversal possible, but not allowed: /(?!\.\.?(?:$|/))
  // - if dots allowed or not possible: /
  // - if dots possible and not allowed: /(?!\.)
  // end is:
  // - if last pattern, same as part-matching mode
  // - else nothing
  //
  // Always put the (?:$|/) on negated tails, though, because that has to be
  // there to bind the end of the negated pattern portion, and it's easier to
  // just stick it in now rather than try to inject it later in the middle of
  // the pattern.
  //
  // We can just always return the same end, and leave it up to the caller
  // to know whether it's going to be used joined or in parts.
  // And, if the start is adjusted slightly, can do the same there:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: (?:/|^)(?!\.\.?$)
  // - if dots allowed or not possible: (?:/|^)
  // - if dots possible and not allowed: (?:/|^)(?!\.)
  //
  // But it's better to have a simpler binding without a conditional, for
  // performance, so probably better to return both start options.
  //
  // Then the caller just ignores the end if it's not the first pattern,
  // and the start always gets applied.
  //
  // But that's always going to be $ if it's the ending pattern, or nothing,
  // so the caller can just attach $ at the end of the pattern when building.
  //
  // So the todo is:
  // - better detect what kind of start is needed
  // - return both flavors of starting pattern
  // - attach $ at the end of the pattern when creating the actual RegExp
  //
  // Ah, but wait, no, that all only applies to the root when the first pattern
  // is not an extglob. If the first pattern IS an extglob, then we need all
  // that dot prevention biz to live in the extglob portions, because eg
  // +(*|.x*) can match .xy but not .yx.
  //
  // So, return the two flavors if it's #root and the first child is not an
  // AST, otherwise leave it to the child AST to handle it, and there,
  // use the (?:^|/) style of start binding.
  //
  // Even simplified further:
  // - Since the start for a join is eg /(?!\.) and the start for a part
  // is ^(?!\.), we can just prepend (?!\.) to the pattern (either root
  // or start or whatever) and prepend ^ or / at the Regexp construction.
  toRegExpSource(allowDot) {
    var _a2;
    const dot = allowDot != null ? allowDot : !!__privateGet(this, _options).dot;
    if (__privateGet(this, _root) === this) {
      __privateMethod(this, _AST_instances, flatten_fn).call(this);
      __privateMethod(this, _AST_instances, fillNegs_fn).call(this);
    }
    if (!isExtglobAST(this)) {
      const noEmpty = this.isStart() && this.isEnd();
      const src = __privateGet(this, _parts).map((p) => {
        var _a3;
        const [re, _, hasMagic, uflag] = typeof p === "string" ? __privateMethod(_a3 = _a, _AST_static, parseGlob_fn).call(_a3, p, __privateGet(this, _hasMagic), noEmpty) : p.toRegExpSource(allowDot);
        __privateSet(this, _hasMagic, __privateGet(this, _hasMagic) || hasMagic);
        __privateSet(this, _uflag, __privateGet(this, _uflag) || uflag);
        return re;
      }).join("");
      let start2 = "";
      if (this.isStart()) {
        if (typeof __privateGet(this, _parts)[0] === "string") {
          const dotTravAllowed = __privateGet(this, _parts).length === 1 && justDots.has(__privateGet(this, _parts)[0]);
          if (!dotTravAllowed) {
            const aps = addPatternStart;
            const needNoTrav = (
              // dots are allowed, and the pattern starts with [ or .
              dot && aps.has(src.charAt(0)) || // the pattern starts with \., and then [ or .
              src.startsWith("\\.") && aps.has(src.charAt(2)) || // the pattern starts with \.\., and then [ or .
              src.startsWith("\\.\\.") && aps.has(src.charAt(4))
            );
            const needNoDot = !dot && !allowDot && aps.has(src.charAt(0));
            start2 = needNoTrav ? startNoTraversal : needNoDot ? startNoDot : "";
          }
        }
      }
      let end = "";
      if (this.isEnd() && __privateGet(__privateGet(this, _root), _filledNegs) && ((_a2 = __privateGet(this, _parent)) == null ? void 0 : _a2.type) === "!") {
        end = "(?:$|\\/)";
      }
      const final2 = start2 + src + end;
      return [
        final2,
        unescape(src),
        __privateSet(this, _hasMagic, !!__privateGet(this, _hasMagic)),
        __privateGet(this, _uflag)
      ];
    }
    const repeated = this.type === "*" || this.type === "+";
    const start = this.type === "!" ? "(?:(?!(?:" : "(?:";
    let body = __privateMethod(this, _AST_instances, partsToRegExp_fn).call(this, dot);
    if (this.isStart() && this.isEnd() && !body && this.type !== "!") {
      const s = this.toString();
      const me = this;
      __privateSet(me, _parts, [s]);
      me.type = null;
      __privateSet(me, _hasMagic, void 0);
      return [s, unescape(this.toString()), false, false];
    }
    let bodyDotAllowed = !repeated || allowDot || dot || !startNoDot ? "" : __privateMethod(this, _AST_instances, partsToRegExp_fn).call(this, true);
    if (bodyDotAllowed === body) {
      bodyDotAllowed = "";
    }
    if (bodyDotAllowed) {
      body = `(?:${body})(?:${bodyDotAllowed})*?`;
    }
    let final = "";
    if (this.type === "!" && __privateGet(this, _emptyExt)) {
      final = (this.isStart() && !dot ? startNoDot : "") + starNoEmpty;
    } else {
      const close = this.type === "!" ? (
        // !() must match something,but !(x) can match ''
        "))" + (this.isStart() && !dot && !allowDot ? startNoDot : "") + star + ")"
      ) : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && bodyDotAllowed ? ")" : this.type === "*" && bodyDotAllowed ? `)?` : `)${this.type}`;
      final = start + body + close;
    }
    return [
      final,
      unescape(body),
      __privateSet(this, _hasMagic, !!__privateGet(this, _hasMagic)),
      __privateGet(this, _uflag)
    ];
  }
};
_root = new WeakMap();
_hasMagic = new WeakMap();
_uflag = new WeakMap();
_parts = new WeakMap();
_parent = new WeakMap();
_parentIndex = new WeakMap();
_negs = new WeakMap();
_filledNegs = new WeakMap();
_options = new WeakMap();
_toString = new WeakMap();
_emptyExt = new WeakMap();
_AST_instances = new WeakSet();
fillNegs_fn = function() {
  if (this !== __privateGet(this, _root))
    throw new Error("should only call on root");
  if (__privateGet(this, _filledNegs))
    return this;
  this.toString();
  __privateSet(this, _filledNegs, true);
  let n;
  while (n = __privateGet(this, _negs).pop()) {
    if (n.type !== "!")
      continue;
    let p = n;
    let pp = __privateGet(p, _parent);
    while (pp) {
      for (let i2 = __privateGet(p, _parentIndex) + 1; !pp.type && i2 < __privateGet(pp, _parts).length; i2++) {
        for (const part of __privateGet(n, _parts)) {
          if (typeof part === "string") {
            throw new Error("string part in extglob AST??");
          }
          part.copyIn(__privateGet(pp, _parts)[i2]);
        }
      }
      p = pp;
      pp = __privateGet(p, _parent);
    }
  }
  return this;
};
_AST_static = new WeakSet();
parseAST_fn = function(str, ast, pos, opt, extDepth) {
  var _a2, _b, _c, _d, _e;
  const maxDepth = (_a2 = opt.maxExtglobRecursion) != null ? _a2 : 2;
  let escaping = false;
  let inBrace = false;
  let braceStart = -1;
  let braceNeg = false;
  if (ast.type === null) {
    let i3 = pos;
    let acc2 = "";
    while (i3 < str.length) {
      const c = str.charAt(i3++);
      if (escaping || c === "\\") {
        escaping = !escaping;
        acc2 += c;
        continue;
      }
      if (inBrace) {
        if (i3 === braceStart + 1) {
          if (c === "^" || c === "!") {
            braceNeg = true;
          }
        } else if (c === "]" && !(i3 === braceStart + 2 && braceNeg)) {
          inBrace = false;
        }
        acc2 += c;
        continue;
      } else if (c === "[") {
        inBrace = true;
        braceStart = i3;
        braceNeg = false;
        acc2 += c;
        continue;
      }
      const doRecurse = !opt.noext && isExtglobType(c) && str.charAt(i3) === "(" && extDepth <= maxDepth;
      if (doRecurse) {
        ast.push(acc2);
        acc2 = "";
        const ext2 = new _a(c, ast);
        i3 = __privateMethod(_b = _a, _AST_static, parseAST_fn).call(_b, str, ext2, i3, opt, extDepth + 1);
        ast.push(ext2);
        continue;
      }
      acc2 += c;
    }
    ast.push(acc2);
    return i3;
  }
  let i2 = pos + 1;
  let part = new _a(null, ast);
  const parts = [];
  let acc = "";
  while (i2 < str.length) {
    const c = str.charAt(i2++);
    if (escaping || c === "\\") {
      escaping = !escaping;
      acc += c;
      continue;
    }
    if (inBrace) {
      if (i2 === braceStart + 1) {
        if (c === "^" || c === "!") {
          braceNeg = true;
        }
      } else if (c === "]" && !(i2 === braceStart + 2 && braceNeg)) {
        inBrace = false;
      }
      acc += c;
      continue;
    } else if (c === "[") {
      inBrace = true;
      braceStart = i2;
      braceNeg = false;
      acc += c;
      continue;
    }
    const doRecurse = isExtglobType(c) && str.charAt(i2) === "(" && /* c8 ignore start - the maxDepth is sufficient here */
    (extDepth <= maxDepth || ast && __privateMethod(_c = ast, _AST_instances, canAdoptType_fn).call(_c, c));
    if (doRecurse) {
      const depthAdd = ast && __privateMethod(_d = ast, _AST_instances, canAdoptType_fn).call(_d, c) ? 0 : 1;
      part.push(acc);
      acc = "";
      const ext2 = new _a(c, part);
      part.push(ext2);
      i2 = __privateMethod(_e = _a, _AST_static, parseAST_fn).call(_e, str, ext2, i2, opt, extDepth + depthAdd);
      continue;
    }
    if (c === "|") {
      part.push(acc);
      acc = "";
      parts.push(part);
      part = new _a(null, ast);
      continue;
    }
    if (c === ")") {
      if (acc === "" && __privateGet(ast, _parts).length === 0) {
        __privateSet(ast, _emptyExt, true);
      }
      part.push(acc);
      acc = "";
      ast.push(...parts, part);
      return i2;
    }
    acc += c;
  }
  ast.type = null;
  __privateSet(ast, _hasMagic, void 0);
  __privateSet(ast, _parts, [str.substring(pos - 1)]);
  return i2;
};
canAdoptWithSpace_fn = function(child) {
  return __privateMethod(this, _AST_instances, canAdopt_fn).call(this, child, adoptionWithSpaceMap);
};
canAdopt_fn = function(child, map2 = adoptionMap) {
  if (!child || typeof child !== "object" || child.type !== null || __privateGet(child, _parts).length !== 1 || this.type === null) {
    return false;
  }
  const gc = __privateGet(child, _parts)[0];
  if (!gc || typeof gc !== "object" || gc.type === null) {
    return false;
  }
  return __privateMethod(this, _AST_instances, canAdoptType_fn).call(this, gc.type, map2);
};
canAdoptType_fn = function(c, map2 = adoptionAnyMap) {
  var _a2;
  return !!((_a2 = map2.get(this.type)) == null ? void 0 : _a2.includes(c));
};
adoptWithSpace_fn = function(child, index) {
  const gc = __privateGet(child, _parts)[0];
  const blank = new _a(null, gc, this.options);
  __privateGet(blank, _parts).push("");
  gc.push(blank);
  __privateMethod(this, _AST_instances, adopt_fn).call(this, child, index);
};
adopt_fn = function(child, index) {
  const gc = __privateGet(child, _parts)[0];
  __privateGet(this, _parts).splice(index, 1, ...__privateGet(gc, _parts));
  for (const p of __privateGet(gc, _parts)) {
    if (typeof p === "object")
      __privateSet(p, _parent, this);
  }
  __privateSet(this, _toString, void 0);
};
canUsurpType_fn = function(c) {
  const m = usurpMap.get(this.type);
  return !!(m == null ? void 0 : m.has(c));
};
canUsurp_fn = function(child) {
  if (!child || typeof child !== "object" || child.type !== null || __privateGet(child, _parts).length !== 1 || this.type === null || __privateGet(this, _parts).length !== 1) {
    return false;
  }
  const gc = __privateGet(child, _parts)[0];
  if (!gc || typeof gc !== "object" || gc.type === null) {
    return false;
  }
  return __privateMethod(this, _AST_instances, canUsurpType_fn).call(this, gc.type);
};
usurp_fn = function(child) {
  const m = usurpMap.get(this.type);
  const gc = __privateGet(child, _parts)[0];
  const nt = m == null ? void 0 : m.get(gc.type);
  if (!nt)
    return false;
  __privateSet(this, _parts, __privateGet(gc, _parts));
  for (const p of __privateGet(this, _parts)) {
    if (typeof p === "object")
      __privateSet(p, _parent, this);
  }
  this.type = nt;
  __privateSet(this, _toString, void 0);
  __privateSet(this, _emptyExt, false);
};
flatten_fn = function() {
  var _a2, _b;
  if (!isExtglobAST(this)) {
    for (const p of __privateGet(this, _parts)) {
      if (typeof p === "object")
        __privateMethod(_a2 = p, _AST_instances, flatten_fn).call(_a2);
    }
  } else {
    let iterations = 0;
    let done = false;
    do {
      done = true;
      for (let i2 = 0; i2 < __privateGet(this, _parts).length; i2++) {
        const c = __privateGet(this, _parts)[i2];
        if (typeof c === "object") {
          __privateMethod(_b = c, _AST_instances, flatten_fn).call(_b);
          if (__privateMethod(this, _AST_instances, canAdopt_fn).call(this, c)) {
            done = false;
            __privateMethod(this, _AST_instances, adopt_fn).call(this, c, i2);
          } else if (__privateMethod(this, _AST_instances, canAdoptWithSpace_fn).call(this, c)) {
            done = false;
            __privateMethod(this, _AST_instances, adoptWithSpace_fn).call(this, c, i2);
          } else if (__privateMethod(this, _AST_instances, canUsurp_fn).call(this, c)) {
            done = false;
            __privateMethod(this, _AST_instances, usurp_fn).call(this, c);
          }
        }
      }
    } while (!done && ++iterations < 10);
  }
  __privateSet(this, _toString, void 0);
};
partsToRegExp_fn = function(dot) {
  return __privateGet(this, _parts).map((p) => {
    if (typeof p === "string") {
      throw new Error("string type in extglob ast??");
    }
    const [re, _, _hasMagic2, uflag] = p.toRegExpSource(dot);
    __privateSet(this, _uflag, __privateGet(this, _uflag) || uflag);
    return re;
  }).filter((p) => !(this.isStart() && this.isEnd()) || !!p).join("|");
};
parseGlob_fn = function(glob, hasMagic, noEmpty = false) {
  let escaping = false;
  let re = "";
  let uflag = false;
  let inStar = false;
  for (let i2 = 0; i2 < glob.length; i2++) {
    const c = glob.charAt(i2);
    if (escaping) {
      escaping = false;
      re += (reSpecials.has(c) ? "\\" : "") + c;
      inStar = false;
      continue;
    }
    if (c === "\\") {
      if (i2 === glob.length - 1) {
        re += "\\\\";
      } else {
        escaping = true;
      }
      continue;
    }
    if (c === "[") {
      const [src, needUflag, consumed, magic] = parseClass(glob, i2);
      if (consumed) {
        re += src;
        uflag = uflag || needUflag;
        i2 += consumed - 1;
        hasMagic = hasMagic || magic;
        inStar = false;
        continue;
      }
    }
    if (c === "*") {
      if (inStar)
        continue;
      inStar = true;
      re += noEmpty && /^[*]+$/.test(glob) ? starNoEmpty : star;
      hasMagic = true;
      continue;
    } else {
      inStar = false;
    }
    if (c === "?") {
      re += qmark;
      hasMagic = true;
      continue;
    }
    re += regExpEscape(c);
  }
  return [re, unescape(glob), !!hasMagic, uflag];
};
__privateAdd(AST, _AST_static);
_a = AST;

// node_modules/minimatch/dist/esm/escape.js
var escape = (s, { windowsPathsNoEscape = false } = {}) => {
  return windowsPathsNoEscape ? s.replace(/[?*()[\]]/g, "[$&]") : s.replace(/[?*()[\]\\]/g, "\\$&");
};

// node_modules/minimatch/dist/esm/index.js
var minimatch = (p, pattern, options = {}) => {
  assertValidPattern(pattern);
  if (!options.nocomment && pattern.charAt(0) === "#") {
    return false;
  }
  return new Minimatch(pattern, options).match(p);
};
var starDotExtRE = /^\*+([^+@!?\*\[\(]*)$/;
var starDotExtTest = (ext2) => (f) => !f.startsWith(".") && f.endsWith(ext2);
var starDotExtTestDot = (ext2) => (f) => f.endsWith(ext2);
var starDotExtTestNocase = (ext2) => {
  ext2 = ext2.toLowerCase();
  return (f) => !f.startsWith(".") && f.toLowerCase().endsWith(ext2);
};
var starDotExtTestNocaseDot = (ext2) => {
  ext2 = ext2.toLowerCase();
  return (f) => f.toLowerCase().endsWith(ext2);
};
var starDotStarRE = /^\*+\.\*+$/;
var starDotStarTest = (f) => !f.startsWith(".") && f.includes(".");
var starDotStarTestDot = (f) => f !== "." && f !== ".." && f.includes(".");
var dotStarRE = /^\.\*+$/;
var dotStarTest = (f) => f !== "." && f !== ".." && f.startsWith(".");
var starRE = /^\*+$/;
var starTest = (f) => f.length !== 0 && !f.startsWith(".");
var starTestDot = (f) => f.length !== 0 && f !== "." && f !== "..";
var qmarksRE = /^\?+([^+@!?\*\[\(]*)?$/;
var qmarksTestNocase = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExt([$0]);
  if (!ext2)
    return noext;
  ext2 = ext2.toLowerCase();
  return (f) => noext(f) && f.toLowerCase().endsWith(ext2);
};
var qmarksTestNocaseDot = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExtDot([$0]);
  if (!ext2)
    return noext;
  ext2 = ext2.toLowerCase();
  return (f) => noext(f) && f.toLowerCase().endsWith(ext2);
};
var qmarksTestDot = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExtDot([$0]);
  return !ext2 ? noext : (f) => noext(f) && f.endsWith(ext2);
};
var qmarksTest = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExt([$0]);
  return !ext2 ? noext : (f) => noext(f) && f.endsWith(ext2);
};
var qmarksTestNoExt = ([$0]) => {
  const len = $0.length;
  return (f) => f.length === len && !f.startsWith(".");
};
var qmarksTestNoExtDot = ([$0]) => {
  const len = $0.length;
  return (f) => f.length === len && f !== "." && f !== "..";
};
var defaultPlatform = typeof process === "object" && process ? typeof process.env === "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix";
var path = {
  win32: { sep: "\\" },
  posix: { sep: "/" }
};
var sep = defaultPlatform === "win32" ? path.win32.sep : path.posix.sep;
minimatch.sep = sep;
var GLOBSTAR = Symbol("globstar **");
minimatch.GLOBSTAR = GLOBSTAR;
var qmark2 = "[^/]";
var star2 = qmark2 + "*?";
var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
var filter = (pattern, options = {}) => (p) => minimatch(p, pattern, options);
minimatch.filter = filter;
var ext = (a, b = {}) => Object.assign({}, a, b);
var defaults = (def) => {
  if (!def || typeof def !== "object" || !Object.keys(def).length) {
    return minimatch;
  }
  const orig = minimatch;
  const m = (p, pattern, options = {}) => orig(p, pattern, ext(def, options));
  return Object.assign(m, {
    Minimatch: class Minimatch extends orig.Minimatch {
      constructor(pattern, options = {}) {
        super(pattern, ext(def, options));
      }
      static defaults(options) {
        return orig.defaults(ext(def, options)).Minimatch;
      }
    },
    AST: class AST extends orig.AST {
      /* c8 ignore start */
      constructor(type, parent, options = {}) {
        super(type, parent, ext(def, options));
      }
      /* c8 ignore stop */
      static fromGlob(pattern, options = {}) {
        return orig.AST.fromGlob(pattern, ext(def, options));
      }
    },
    unescape: (s, options = {}) => orig.unescape(s, ext(def, options)),
    escape: (s, options = {}) => orig.escape(s, ext(def, options)),
    filter: (pattern, options = {}) => orig.filter(pattern, ext(def, options)),
    defaults: (options) => orig.defaults(ext(def, options)),
    makeRe: (pattern, options = {}) => orig.makeRe(pattern, ext(def, options)),
    braceExpand: (pattern, options = {}) => orig.braceExpand(pattern, ext(def, options)),
    match: (list, pattern, options = {}) => orig.match(list, pattern, ext(def, options)),
    sep: orig.sep,
    GLOBSTAR
  });
};
minimatch.defaults = defaults;
var braceExpand = (pattern, options = {}) => {
  assertValidPattern(pattern);
  if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
    return [pattern];
  }
  return (0, import_brace_expansion.default)(pattern);
};
minimatch.braceExpand = braceExpand;
var makeRe = (pattern, options = {}) => new Minimatch(pattern, options).makeRe();
minimatch.makeRe = makeRe;
var match = (list, pattern, options = {}) => {
  const mm = new Minimatch(pattern, options);
  list = list.filter((f) => mm.match(f));
  if (mm.options.nonull && !list.length) {
    list.push(pattern);
  }
  return list;
};
minimatch.match = match;
var globMagic = /[?*]|[+@!]\(.*?\)|\[|\]/;
var regExpEscape2 = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var _Minimatch_instances, matchGlobstar_fn, matchGlobStarBodySections_fn, matchOne_fn;
var Minimatch = class {
  constructor(pattern, options = {}) {
    __privateAdd(this, _Minimatch_instances);
    __publicField(this, "options");
    __publicField(this, "set");
    __publicField(this, "pattern");
    __publicField(this, "windowsPathsNoEscape");
    __publicField(this, "nonegate");
    __publicField(this, "negate");
    __publicField(this, "comment");
    __publicField(this, "empty");
    __publicField(this, "preserveMultipleSlashes");
    __publicField(this, "partial");
    __publicField(this, "globSet");
    __publicField(this, "globParts");
    __publicField(this, "nocase");
    __publicField(this, "isWindows");
    __publicField(this, "platform");
    __publicField(this, "windowsNoMagicRoot");
    __publicField(this, "maxGlobstarRecursion");
    __publicField(this, "regexp");
    var _a2;
    assertValidPattern(pattern);
    options = options || {};
    this.options = options;
    this.maxGlobstarRecursion = (_a2 = options.maxGlobstarRecursion) != null ? _a2 : 200;
    this.pattern = pattern;
    this.platform = options.platform || defaultPlatform;
    this.isWindows = this.platform === "win32";
    this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
    if (this.windowsPathsNoEscape) {
      this.pattern = this.pattern.replace(/\\/g, "/");
    }
    this.preserveMultipleSlashes = !!options.preserveMultipleSlashes;
    this.regexp = null;
    this.negate = false;
    this.nonegate = !!options.nonegate;
    this.comment = false;
    this.empty = false;
    this.partial = !!options.partial;
    this.nocase = !!this.options.nocase;
    this.windowsNoMagicRoot = options.windowsNoMagicRoot !== void 0 ? options.windowsNoMagicRoot : !!(this.isWindows && this.nocase);
    this.globSet = [];
    this.globParts = [];
    this.set = [];
    this.make();
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1) {
      return true;
    }
    for (const pattern of this.set) {
      for (const part of pattern) {
        if (typeof part !== "string")
          return true;
      }
    }
    return false;
  }
  debug(..._) {
  }
  make() {
    const pattern = this.pattern;
    const options = this.options;
    if (!options.nocomment && pattern.charAt(0) === "#") {
      this.comment = true;
      return;
    }
    if (!pattern) {
      this.empty = true;
      return;
    }
    this.parseNegate();
    this.globSet = [...new Set(this.braceExpand())];
    if (options.debug) {
      this.debug = (...args) => console.error(...args);
    }
    this.debug(this.pattern, this.globSet);
    const rawGlobParts = this.globSet.map((s) => this.slashSplit(s));
    this.globParts = this.preprocess(rawGlobParts);
    this.debug(this.pattern, this.globParts);
    let set = this.globParts.map((s, _, __) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        const isUNC = s[0] === "" && s[1] === "" && (s[2] === "?" || !globMagic.test(s[2])) && !globMagic.test(s[3]);
        const isDrive = /^[a-z]:/i.test(s[0]);
        if (isUNC) {
          return [...s.slice(0, 4), ...s.slice(4).map((ss) => this.parse(ss))];
        } else if (isDrive) {
          return [s[0], ...s.slice(1).map((ss) => this.parse(ss))];
        }
      }
      return s.map((ss) => this.parse(ss));
    });
    this.debug(this.pattern, set);
    this.set = set.filter((s) => s.indexOf(false) === -1);
    if (this.isWindows) {
      for (let i2 = 0; i2 < this.set.length; i2++) {
        const p = this.set[i2];
        if (p[0] === "" && p[1] === "" && this.globParts[i2][2] === "?" && typeof p[3] === "string" && /^[a-z]:$/i.test(p[3])) {
          p[2] = "?";
        }
      }
    }
    this.debug(this.pattern, this.set);
  }
  // various transforms to equivalent pattern sets that are
  // faster to process in a filesystem walk.  The goal is to
  // eliminate what we can, and push all ** patterns as far
  // to the right as possible, even if it increases the number
  // of patterns that we have to process.
  preprocess(globParts) {
    if (this.options.noglobstar) {
      for (let i2 = 0; i2 < globParts.length; i2++) {
        for (let j = 0; j < globParts[i2].length; j++) {
          if (globParts[i2][j] === "**") {
            globParts[i2][j] = "*";
          }
        }
      }
    }
    const { optimizationLevel = 1 } = this.options;
    if (optimizationLevel >= 2) {
      globParts = this.firstPhasePreProcess(globParts);
      globParts = this.secondPhasePreProcess(globParts);
    } else if (optimizationLevel >= 1) {
      globParts = this.levelOneOptimize(globParts);
    } else {
      globParts = this.adjascentGlobstarOptimize(globParts);
    }
    return globParts;
  }
  // just get rid of adjascent ** portions
  adjascentGlobstarOptimize(globParts) {
    return globParts.map((parts) => {
      let gs = -1;
      while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
        let i2 = gs;
        while (parts[i2 + 1] === "**") {
          i2++;
        }
        if (i2 !== gs) {
          parts.splice(gs, i2 - gs);
        }
      }
      return parts;
    });
  }
  // get rid of adjascent ** and resolve .. portions
  levelOneOptimize(globParts) {
    return globParts.map((parts) => {
      parts = parts.reduce((set, part) => {
        const prev = set[set.length - 1];
        if (part === "**" && prev === "**") {
          return set;
        }
        if (part === "..") {
          if (prev && prev !== ".." && prev !== "." && prev !== "**") {
            set.pop();
            return set;
          }
        }
        set.push(part);
        return set;
      }, []);
      return parts.length === 0 ? [""] : parts;
    });
  }
  levelTwoFileOptimize(parts) {
    if (!Array.isArray(parts)) {
      parts = this.slashSplit(parts);
    }
    let didSomething = false;
    do {
      didSomething = false;
      if (!this.preserveMultipleSlashes) {
        for (let i2 = 1; i2 < parts.length - 1; i2++) {
          const p = parts[i2];
          if (i2 === 1 && p === "" && parts[0] === "")
            continue;
          if (p === "." || p === "") {
            didSomething = true;
            parts.splice(i2, 1);
            i2--;
          }
        }
        if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
          didSomething = true;
          parts.pop();
        }
      }
      let dd = 0;
      while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
        const p = parts[dd - 1];
        if (p && p !== "." && p !== ".." && p !== "**") {
          didSomething = true;
          parts.splice(dd - 1, 2);
          dd -= 2;
        }
      }
    } while (didSomething);
    return parts.length === 0 ? [""] : parts;
  }
  // First phase: single-pattern processing
  // <pre> is 1 or more portions
  // <rest> is 1 or more portions
  // <p> is any portion other than ., .., '', or **
  // <e> is . or ''
  //
  // **/.. is *brutal* for filesystem walking performance, because
  // it effectively resets the recursive walk each time it occurs,
  // and ** cannot be reduced out by a .. pattern part like a regexp
  // or most strings (other than .., ., and '') can be.
  //
  // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
  // <pre>/<e>/<rest> -> <pre>/<rest>
  // <pre>/<p>/../<rest> -> <pre>/<rest>
  // **/**/<rest> -> **/<rest>
  //
  // **/*/<rest> -> */**/<rest> <== not valid because ** doesn't follow
  // this WOULD be allowed if ** did follow symlinks, or * didn't
  firstPhasePreProcess(globParts) {
    let didSomething = false;
    do {
      didSomething = false;
      for (let parts of globParts) {
        let gs = -1;
        while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
          let gss = gs;
          while (parts[gss + 1] === "**") {
            gss++;
          }
          if (gss > gs) {
            parts.splice(gs + 1, gss - gs);
          }
          let next = parts[gs + 1];
          const p = parts[gs + 2];
          const p2 = parts[gs + 3];
          if (next !== "..")
            continue;
          if (!p || p === "." || p === ".." || !p2 || p2 === "." || p2 === "..") {
            continue;
          }
          didSomething = true;
          parts.splice(gs, 1);
          const other = parts.slice(0);
          other[gs] = "**";
          globParts.push(other);
          gs--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let i2 = 1; i2 < parts.length - 1; i2++) {
            const p = parts[i2];
            if (i2 === 1 && p === "" && parts[0] === "")
              continue;
            if (p === "." || p === "") {
              didSomething = true;
              parts.splice(i2, 1);
              i2--;
            }
          }
          if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
            didSomething = true;
            parts.pop();
          }
        }
        let dd = 0;
        while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
          const p = parts[dd - 1];
          if (p && p !== "." && p !== ".." && p !== "**") {
            didSomething = true;
            const needDot = dd === 1 && parts[dd + 1] === "**";
            const splin = needDot ? ["."] : [];
            parts.splice(dd - 1, 2, ...splin);
            if (parts.length === 0)
              parts.push("");
            dd -= 2;
          }
        }
      }
    } while (didSomething);
    return globParts;
  }
  // second phase: multi-pattern dedupes
  // {<pre>/*/<rest>,<pre>/<p>/<rest>} -> <pre>/*/<rest>
  // {<pre>/<rest>,<pre>/<rest>} -> <pre>/<rest>
  // {<pre>/**/<rest>,<pre>/<rest>} -> <pre>/**/<rest>
  //
  // {<pre>/**/<rest>,<pre>/**/<p>/<rest>} -> <pre>/**/<rest>
  // ^-- not valid because ** doens't follow symlinks
  secondPhasePreProcess(globParts) {
    for (let i2 = 0; i2 < globParts.length - 1; i2++) {
      for (let j = i2 + 1; j < globParts.length; j++) {
        const matched = this.partsMatch(globParts[i2], globParts[j], !this.preserveMultipleSlashes);
        if (matched) {
          globParts[i2] = [];
          globParts[j] = matched;
          break;
        }
      }
    }
    return globParts.filter((gs) => gs.length);
  }
  partsMatch(a, b, emptyGSMatch = false) {
    let ai = 0;
    let bi = 0;
    let result = [];
    let which = "";
    while (ai < a.length && bi < b.length) {
      if (a[ai] === b[bi]) {
        result.push(which === "b" ? b[bi] : a[ai]);
        ai++;
        bi++;
      } else if (emptyGSMatch && a[ai] === "**" && b[bi] === a[ai + 1]) {
        result.push(a[ai]);
        ai++;
      } else if (emptyGSMatch && b[bi] === "**" && a[ai] === b[bi + 1]) {
        result.push(b[bi]);
        bi++;
      } else if (a[ai] === "*" && b[bi] && (this.options.dot || !b[bi].startsWith(".")) && b[bi] !== "**") {
        if (which === "b")
          return false;
        which = "a";
        result.push(a[ai]);
        ai++;
        bi++;
      } else if (b[bi] === "*" && a[ai] && (this.options.dot || !a[ai].startsWith(".")) && a[ai] !== "**") {
        if (which === "a")
          return false;
        which = "b";
        result.push(b[bi]);
        ai++;
        bi++;
      } else {
        return false;
      }
    }
    return a.length === b.length && result;
  }
  parseNegate() {
    if (this.nonegate)
      return;
    const pattern = this.pattern;
    let negate = false;
    let negateOffset = 0;
    for (let i2 = 0; i2 < pattern.length && pattern.charAt(i2) === "!"; i2++) {
      negate = !negate;
      negateOffset++;
    }
    if (negateOffset)
      this.pattern = pattern.slice(negateOffset);
    this.negate = negate;
  }
  // set partial to true to test if, for example,
  // "/a/b" matches the start of "/*/b/*/d"
  // Partial means, if you run out of file before you run
  // out of pattern, then that's fine, as long as all
  // the parts match.
  matchOne(file, pattern, partial = false) {
    let fileStartIndex = 0;
    let patternStartIndex = 0;
    if (this.isWindows) {
      const fileDrive = typeof file[0] === "string" && /^[a-z]:$/i.test(file[0]);
      const fileUNC = !fileDrive && file[0] === "" && file[1] === "" && file[2] === "?" && /^[a-z]:$/i.test(file[3]);
      const patternDrive = typeof pattern[0] === "string" && /^[a-z]:$/i.test(pattern[0]);
      const patternUNC = !patternDrive && pattern[0] === "" && pattern[1] === "" && pattern[2] === "?" && typeof pattern[3] === "string" && /^[a-z]:$/i.test(pattern[3]);
      const fdi = fileUNC ? 3 : fileDrive ? 0 : void 0;
      const pdi = patternUNC ? 3 : patternDrive ? 0 : void 0;
      if (typeof fdi === "number" && typeof pdi === "number") {
        const [fd, pd] = [
          file[fdi],
          pattern[pdi]
        ];
        if (fd.toLowerCase() === pd.toLowerCase()) {
          pattern[pdi] = fd;
          patternStartIndex = pdi;
          fileStartIndex = fdi;
        }
      }
    }
    const { optimizationLevel = 1 } = this.options;
    if (optimizationLevel >= 2) {
      file = this.levelTwoFileOptimize(file);
    }
    if (pattern.includes(GLOBSTAR)) {
      return __privateMethod(this, _Minimatch_instances, matchGlobstar_fn).call(this, file, pattern, partial, fileStartIndex, patternStartIndex);
    }
    return __privateMethod(this, _Minimatch_instances, matchOne_fn).call(this, file, pattern, partial, fileStartIndex, patternStartIndex);
  }
  braceExpand() {
    return braceExpand(this.pattern, this.options);
  }
  parse(pattern) {
    assertValidPattern(pattern);
    const options = this.options;
    if (pattern === "**")
      return GLOBSTAR;
    if (pattern === "")
      return "";
    let m;
    let fastTest = null;
    if (m = pattern.match(starRE)) {
      fastTest = options.dot ? starTestDot : starTest;
    } else if (m = pattern.match(starDotExtRE)) {
      fastTest = (options.nocase ? options.dot ? starDotExtTestNocaseDot : starDotExtTestNocase : options.dot ? starDotExtTestDot : starDotExtTest)(m[1]);
    } else if (m = pattern.match(qmarksRE)) {
      fastTest = (options.nocase ? options.dot ? qmarksTestNocaseDot : qmarksTestNocase : options.dot ? qmarksTestDot : qmarksTest)(m);
    } else if (m = pattern.match(starDotStarRE)) {
      fastTest = options.dot ? starDotStarTestDot : starDotStarTest;
    } else if (m = pattern.match(dotStarRE)) {
      fastTest = dotStarTest;
    }
    const re = AST.fromGlob(pattern, this.options).toMMPattern();
    if (fastTest && typeof re === "object") {
      Reflect.defineProperty(re, "test", { value: fastTest });
    }
    return re;
  }
  makeRe() {
    if (this.regexp || this.regexp === false)
      return this.regexp;
    const set = this.set;
    if (!set.length) {
      this.regexp = false;
      return this.regexp;
    }
    const options = this.options;
    const twoStar = options.noglobstar ? star2 : options.dot ? twoStarDot : twoStarNoDot;
    const flags = new Set(options.nocase ? ["i"] : []);
    let re = set.map((pattern) => {
      const pp = pattern.map((p) => {
        if (p instanceof RegExp) {
          for (const f of p.flags.split(""))
            flags.add(f);
        }
        return typeof p === "string" ? regExpEscape2(p) : p === GLOBSTAR ? GLOBSTAR : p._src;
      });
      pp.forEach((p, i2) => {
        const next = pp[i2 + 1];
        const prev = pp[i2 - 1];
        if (p !== GLOBSTAR || prev === GLOBSTAR) {
          return;
        }
        if (prev === void 0) {
          if (next !== void 0 && next !== GLOBSTAR) {
            pp[i2 + 1] = "(?:\\/|" + twoStar + "\\/)?" + next;
          } else {
            pp[i2] = twoStar;
          }
        } else if (next === void 0) {
          pp[i2 - 1] = prev + "(?:\\/|" + twoStar + ")?";
        } else if (next !== GLOBSTAR) {
          pp[i2 - 1] = prev + "(?:\\/|\\/" + twoStar + "\\/)" + next;
          pp[i2 + 1] = GLOBSTAR;
        }
      });
      return pp.filter((p) => p !== GLOBSTAR).join("/");
    }).join("|");
    const [open, close] = set.length > 1 ? ["(?:", ")"] : ["", ""];
    re = "^" + open + re + close + "$";
    if (this.negate)
      re = "^(?!" + re + ").+$";
    try {
      this.regexp = new RegExp(re, [...flags].join(""));
    } catch (ex) {
      this.regexp = false;
    }
    return this.regexp;
  }
  slashSplit(p) {
    if (this.preserveMultipleSlashes) {
      return p.split("/");
    } else if (this.isWindows && /^\/\/[^\/]+/.test(p)) {
      return ["", ...p.split(/\/+/)];
    } else {
      return p.split(/\/+/);
    }
  }
  match(f, partial = this.partial) {
    this.debug("match", f, this.pattern);
    if (this.comment) {
      return false;
    }
    if (this.empty) {
      return f === "";
    }
    if (f === "/" && partial) {
      return true;
    }
    const options = this.options;
    if (this.isWindows) {
      f = f.split("\\").join("/");
    }
    const ff = this.slashSplit(f);
    this.debug(this.pattern, "split", ff);
    const set = this.set;
    this.debug(this.pattern, "set", set);
    let filename = ff[ff.length - 1];
    if (!filename) {
      for (let i2 = ff.length - 2; !filename && i2 >= 0; i2--) {
        filename = ff[i2];
      }
    }
    for (let i2 = 0; i2 < set.length; i2++) {
      const pattern = set[i2];
      let file = ff;
      if (options.matchBase && pattern.length === 1) {
        file = [filename];
      }
      const hit = this.matchOne(file, pattern, partial);
      if (hit) {
        if (options.flipNegate) {
          return true;
        }
        return !this.negate;
      }
    }
    if (options.flipNegate) {
      return false;
    }
    return this.negate;
  }
  static defaults(def) {
    return minimatch.defaults(def).Minimatch;
  }
};
_Minimatch_instances = new WeakSet();
matchGlobstar_fn = function(file, pattern, partial, fileIndex, patternIndex) {
  const firstgs = pattern.indexOf(GLOBSTAR, patternIndex);
  const lastgs = pattern.lastIndexOf(GLOBSTAR);
  const [head, body, tail] = partial ? [
    pattern.slice(patternIndex, firstgs),
    pattern.slice(firstgs + 1),
    []
  ] : [
    pattern.slice(patternIndex, firstgs),
    pattern.slice(firstgs + 1, lastgs),
    pattern.slice(lastgs + 1)
  ];
  if (head.length) {
    const fileHead = file.slice(fileIndex, fileIndex + head.length);
    if (!__privateMethod(this, _Minimatch_instances, matchOne_fn).call(this, fileHead, head, partial, 0, 0))
      return false;
    fileIndex += head.length;
  }
  let fileTailMatch = 0;
  if (tail.length) {
    if (tail.length + fileIndex > file.length)
      return false;
    let tailStart = file.length - tail.length;
    if (__privateMethod(this, _Minimatch_instances, matchOne_fn).call(this, file, tail, partial, tailStart, 0)) {
      fileTailMatch = tail.length;
    } else {
      if (file[file.length - 1] !== "" || fileIndex + tail.length === file.length) {
        return false;
      }
      tailStart--;
      if (!__privateMethod(this, _Minimatch_instances, matchOne_fn).call(this, file, tail, partial, tailStart, 0))
        return false;
      fileTailMatch = tail.length + 1;
    }
  }
  if (!body.length) {
    let sawSome = !!fileTailMatch;
    for (let i3 = fileIndex; i3 < file.length - fileTailMatch; i3++) {
      const f = String(file[i3]);
      sawSome = true;
      if (f === "." || f === ".." || !this.options.dot && f.startsWith(".")) {
        return false;
      }
    }
    return partial || sawSome;
  }
  const bodySegments = [[[], 0]];
  let currentBody = bodySegments[0];
  let nonGsParts = 0;
  const nonGsPartsSums = [0];
  for (const b of body) {
    if (b === GLOBSTAR) {
      nonGsPartsSums.push(nonGsParts);
      currentBody = [[], 0];
      bodySegments.push(currentBody);
    } else {
      currentBody[0].push(b);
      nonGsParts++;
    }
  }
  let i2 = bodySegments.length - 1;
  const fileLength = file.length - fileTailMatch;
  for (const b of bodySegments) {
    b[1] = fileLength - (nonGsPartsSums[i2--] + b[0].length);
  }
  return !!__privateMethod(this, _Minimatch_instances, matchGlobStarBodySections_fn).call(this, file, bodySegments, fileIndex, 0, partial, 0, !!fileTailMatch);
};
matchGlobStarBodySections_fn = function(file, bodySegments, fileIndex, bodyIndex, partial, globStarDepth, sawTail) {
  const bs = bodySegments[bodyIndex];
  if (!bs) {
    for (let i2 = fileIndex; i2 < file.length; i2++) {
      sawTail = true;
      const f = file[i2];
      if (f === "." || f === ".." || !this.options.dot && f.startsWith(".")) {
        return false;
      }
    }
    return sawTail;
  }
  const [body, after] = bs;
  while (fileIndex <= after) {
    const m = __privateMethod(this, _Minimatch_instances, matchOne_fn).call(this, file.slice(0, fileIndex + body.length), body, partial, fileIndex, 0);
    if (m && globStarDepth < this.maxGlobstarRecursion) {
      const sub = __privateMethod(this, _Minimatch_instances, matchGlobStarBodySections_fn).call(this, file, bodySegments, fileIndex + body.length, bodyIndex + 1, partial, globStarDepth + 1, sawTail);
      if (sub !== false)
        return sub;
    }
    const f = file[fileIndex];
    if (f === "." || f === ".." || !this.options.dot && f.startsWith(".")) {
      return false;
    }
    fileIndex++;
  }
  return partial || null;
};
matchOne_fn = function(file, pattern, partial, fileIndex, patternIndex) {
  let fi;
  let pi;
  let pl;
  let fl;
  for (fi = fileIndex, pi = patternIndex, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
    this.debug("matchOne loop");
    let p = pattern[pi];
    let f = file[fi];
    this.debug(pattern, p, f);
    if (p === false || p === GLOBSTAR)
      return false;
    let hit;
    if (typeof p === "string") {
      hit = f === p;
      this.debug("string match", p, f, hit);
    } else {
      hit = p.test(f);
      this.debug("pattern match", p, f, hit);
    }
    if (!hit)
      return false;
  }
  if (fi === fl && pi === pl) {
    return true;
  } else if (fi === fl) {
    return partial;
  } else if (pi === pl) {
    return fi === fl - 1 && file[fi] === "";
  } else {
    throw new Error("wtf?");
  }
};
minimatch.AST = AST;
minimatch.Minimatch = Minimatch;
minimatch.escape = escape;
minimatch.unescape = unescape;

// src/utils/query-nonce-meta-tag-content.ts
function queryNonceMetaTagContent(doc) {
  var _a2, _b, _c;
  return (_c = (_b = (_a2 = doc.head) == null ? void 0 : _a2.querySelector('meta[name="csp-nonce"]')) == null ? void 0 : _b.getAttribute("content")) != null ? _c : void 0;
}

// src/utils/regular-expression.ts
var escapeRegExpSpecialCharacters = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// src/utils/remote-value.ts
var RemoteValue = class _RemoteValue {
  /**
   * Deserializes a LocalValue serialized object back to its original JavaScript representation
   *
   * @param serialized The serialized LocalValue object
   * @returns The original JavaScript value/object
   */
  static fromLocalValue(serialized) {
    const type = serialized[TYPE_CONSTANT];
    const value = VALUE_CONSTANT in serialized ? serialized[VALUE_CONSTANT] : void 0;
    switch (type) {
      case "string" /* String */:
        return value;
      case "boolean" /* Boolean */:
        return value;
      case "bigint" /* BigInt */:
        return BigInt(value);
      case "undefined" /* Undefined */:
        return void 0;
      case "null" /* Null */:
        return null;
      case "number" /* Number */:
        if (value === "NaN") return NaN;
        if (value === "-0") return -0;
        if (value === "Infinity") return Infinity;
        if (value === "-Infinity") return -Infinity;
        return value;
      case "array" /* Array */:
        return value.map((item) => _RemoteValue.fromLocalValue(item));
      case "date" /* Date */:
        return new Date(value);
      case "map" /* Map */:
        const map2 = /* @__PURE__ */ new Map();
        for (const [key, val] of value) {
          const deserializedKey = typeof key === "object" && key !== null ? _RemoteValue.fromLocalValue(key) : key;
          const deserializedValue = _RemoteValue.fromLocalValue(val);
          map2.set(deserializedKey, deserializedValue);
        }
        return map2;
      case "object" /* Object */:
        const obj = {};
        for (const [key, val] of value) {
          obj[key] = _RemoteValue.fromLocalValue(val);
        }
        return obj;
      case "regexp" /* RegularExpression */:
        const { pattern, flags } = value;
        return new RegExp(pattern, flags);
      case "set" /* Set */:
        const set = /* @__PURE__ */ new Set();
        for (const item of value) {
          set.add(_RemoteValue.fromLocalValue(item));
        }
        return set;
      case "symbol" /* Symbol */:
        return Symbol(value);
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  }
  /**
   * Utility method to deserialize multiple LocalValues at once
   *
   * @param serializedValues Array of serialized LocalValue objects
   * @returns Array of deserialized JavaScript values
   */
  static fromLocalValueArray(serializedValues) {
    return serializedValues.map((value) => _RemoteValue.fromLocalValue(value));
  }
  /**
   * Verifies if the given object matches the structure of a serialized LocalValue
   *
   * @param obj Object to verify
   * @returns boolean indicating if the object has LocalValue structure
   */
  static isLocalValueObject(obj) {
    if (typeof obj !== "object" || obj === null) {
      return false;
    }
    if (!obj.hasOwnProperty(TYPE_CONSTANT)) {
      return false;
    }
    const type = obj[TYPE_CONSTANT];
    const hasTypeProperty = Object.values({ ...PrimitiveType, ...NonPrimitiveType }).includes(type);
    if (!hasTypeProperty) {
      return false;
    }
    if (type !== "null" /* Null */ && type !== "undefined" /* Undefined */) {
      return obj.hasOwnProperty(VALUE_CONSTANT);
    }
    return true;
  }
};

// src/utils/result.ts
var result_exports = {};
__export(result_exports, {
  err: () => err,
  map: () => map,
  ok: () => ok,
  unwrap: () => unwrap,
  unwrapErr: () => unwrapErr
});
var ok = (value) => ({
  isOk: true,
  isErr: false,
  value
});
var err = (value) => ({
  isOk: false,
  isErr: true,
  value
});
function map(result, fn) {
  if (result.isOk) {
    const val = fn(result.value);
    if (val instanceof Promise) {
      return val.then((newVal) => ok(newVal));
    } else {
      return ok(val);
    }
  }
  if (result.isErr) {
    const value = result.value;
    return err(value);
  }
  throw "should never get here";
}
var unwrap = (result) => {
  if (result.isOk) {
    return result.value;
  } else {
    throw result.value;
  }
};
var unwrapErr = (result) => {
  if (result.isErr) {
    return result.value;
  } else {
    throw result.value;
  }
};

// src/utils/serialize.ts
function decodeBase64Unicode(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i2 = 0; i2 < binary.length; i2++) {
    bytes[i2] = binary.charCodeAt(i2);
  }
  return new TextDecoder().decode(bytes);
}
function deserializeProperty(value) {
  if (typeof value !== "string" || !value.startsWith(SERIALIZED_PREFIX)) {
    return value;
  }
  return RemoteValue.fromLocalValue(JSON.parse(decodeBase64Unicode(value.slice(SERIALIZED_PREFIX.length))));
}

// src/utils/shadow-root.ts
var import_app_data3 = require("@stencil/core/internal/app-data");

// src/app-globals/index.ts
var globalStyles = (
  /* default */
  ""
);

// src/runtime/runtime-constants.ts
var CONTENT_REF_ID = "r";
var ORG_LOCATION_ID = "o";
var SLOT_NODE_ID = "s";
var TEXT_NODE_ID = "t";
var COMMENT_NODE_ID = "c";
var HYDRATE_ID = "s-id";
var HYDRATED_STYLE_ID = "sty-id";
var HYDRATE_CHILD_ID = "c-id";
var HYDRATED_CSS = "{visibility:hidden}.hydrated{visibility:inherit}";
var STENCIL_DOC_DATA = "_stencilDocData";
var DEFAULT_DOC_DATA = {
  hostIds: 0,
  rootLevelIds: 0,
  staticComponents: /* @__PURE__ */ new Set()
};
var SLOT_FB_CSS = "slot-fb{display:contents}slot-fb[hidden]{display:none}";
var XLINK_NS = "http://www.w3.org/1999/xlink";
var FORM_ASSOCIATED_CUSTOM_ELEMENT_CALLBACKS = [
  "formAssociatedCallback",
  "formResetCallback",
  "formDisabledCallback",
  "formStateRestoreCallback"
];

// src/utils/style.ts
function createStyleSheetIfNeededAndSupported(styles2) {
  if (!styles2 || !supportsConstructableStylesheets) return void 0;
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(styles2);
  return sheet;
}

// src/utils/shadow-root.ts
var globalStyleSheet;
var GLOBAL_STYLE_ID = "sc-global";
function createShadowRoot(cmpMeta) {
  var _a2;
  const opts = { mode: "open" };
  if (import_app_data3.BUILD.shadowDelegatesFocus) {
    opts.delegatesFocus = !!(cmpMeta.$flags$ & 16 /* shadowDelegatesFocus */);
  }
  if (import_app_data3.BUILD.shadowSlotAssignmentManual) {
    const isManual = !!(cmpMeta.$flags$ & 1024 /* shadowSlotAssignmentManual */);
    if (isManual) {
      opts.slotAssignment = "manual";
    }
  }
  const shadowRoot = this.attachShadow(opts);
  if (globalStyleSheet === void 0) globalStyleSheet = (_a2 = createStyleSheetIfNeededAndSupported(globalStyles)) != null ? _a2 : null;
  if (globalStyleSheet) {
    if (supportsMutableAdoptedStyleSheets) {
      shadowRoot.adoptedStyleSheets.push(globalStyleSheet);
    } else {
      shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, globalStyleSheet];
    }
  } else if (globalStyles && !supportsConstructableStylesheets) {
    const styleElm = document.createElement("style");
    styleElm.innerHTML = globalStyles;
    if (import_app_data3.BUILD.hotModuleReplacement) {
      styleElm.setAttribute(HYDRATED_STYLE_ID, GLOBAL_STYLE_ID);
    }
    shadowRoot.prepend(styleElm);
  }
}

// src/utils/util.ts
var lowerPathParam = (fn) => (p) => fn(p.toLowerCase());
var isDtsFile = lowerPathParam((p) => p.endsWith(".d.ts") || p.endsWith(".d.mts") || p.endsWith(".d.cts"));
var isTsFile = lowerPathParam(
  (p) => !isDtsFile(p) && (p.endsWith(".ts") || p.endsWith(".mts") || p.endsWith(".cts"))
);
var isTsxFile = lowerPathParam(
  (p) => p.endsWith(".tsx") || p.endsWith(".mtsx") || p.endsWith(".ctsx")
);
var isJsxFile = lowerPathParam(
  (p) => p.endsWith(".jsx") || p.endsWith(".mjsx") || p.endsWith(".cjsx")
);
var isJsFile = lowerPathParam((p) => p.endsWith(".js") || p.endsWith(".mjs") || p.endsWith(".cjs"));

// src/testing/platform/testing-host-ref.ts
var getHostRef = (elm) => {
  if (elm.__stencil__getHostRef) {
    return elm.__stencil__getHostRef();
  }
  return void 0;
};
var registerInstance = (lazyInstance, hostRef) => {
  if (lazyInstance == null || lazyInstance.constructor == null) {
    throw new Error(`Invalid component constructor`);
  }
  if (hostRef == null) {
    const Cstr2 = lazyInstance.constructor;
    const tagName = Cstr2.COMPILER_META && Cstr2.COMPILER_META.tagName ? Cstr2.COMPILER_META.tagName : "div";
    const elm = document.createElement(tagName);
    registerHost(elm, { $flags$: 0, $tagName$: tagName });
    hostRef = getHostRef(elm);
  }
  lazyInstance.__stencil__getHostRef = () => hostRef;
  hostRef.$lazyInstance$ = lazyInstance;
  const Cstr = lazyInstance.constructor;
  const allEvents = [];
  const seenEventMethods = /* @__PURE__ */ new Set();
  if (Cstr.COMPILER_META && Cstr.COMPILER_META.events) {
    Cstr.COMPILER_META.events.forEach((event) => {
      if (!seenEventMethods.has(event.method)) {
        allEvents.push(event);
        seenEventMethods.add(event.method);
      }
    });
  }
  let currentProto = Object.getPrototypeOf(Cstr);
  while (currentProto && currentProto !== Function.prototype && currentProto.name) {
    if (typeof currentProto.events === "object" && Array.isArray(currentProto.events)) {
      currentProto.events.forEach((event) => {
        if (!seenEventMethods.has(event.method)) {
          allEvents.push(event);
          seenEventMethods.add(event.method);
        }
      });
    }
    currentProto = Object.getPrototypeOf(currentProto);
  }
  allEvents.forEach((eventMeta) => {
    if (!lazyInstance[eventMeta.method]) {
      let flags = 0;
      if (eventMeta.bubbles) flags |= 4 /* Bubbles */;
      if (eventMeta.composed) flags |= 2 /* Composed */;
      if (eventMeta.cancelable) flags |= 1 /* Cancellable */;
      lazyInstance[eventMeta.method] = createEvent(lazyInstance, eventMeta.name, flags);
    }
  });
};
var registerHost = (elm, cmpMeta) => {
  const hostRef = {
    $flags$: 0,
    $hostElement$: elm,
    $cmpMeta$: cmpMeta,
    $instanceValues$: /* @__PURE__ */ new Map(),
    $serializerValues$: /* @__PURE__ */ new Map(),
    $renderCount$: 0
  };
  hostRef.$fetchedCbList$ = [];
  hostRef.$onInstancePromise$ = new Promise((r) => hostRef.$onInstanceResolve$ = r);
  hostRef.$onReadyPromise$ = new Promise((r) => hostRef.$onReadyResolve$ = r);
  elm["s-p"] = [];
  elm["s-rc"] = [];
  elm.__stencil__getHostRef = () => hostRef;
};

// src/testing/platform/testing-log.ts
var customError;
var defaultConsoleError = (e) => {
  caughtErrors.push(e);
};
var consoleError = (e, el) => (customError || defaultConsoleError)(e, el);
var consoleDevError = (...e) => {
  caughtErrors.push(new Error(e.join(", ")));
};
var consoleDevWarn = (...args) => {
  const params = args.filter((a) => typeof a === "string" || typeof a === "number" || typeof a === "boolean");
  console.warn(...params);
};
var consoleDevInfo = (..._) => {
};
var setErrorHandler = (handler) => customError = handler;

// src/testing/platform/testing-task-queue.ts
function resetTaskQueue() {
  queuedTicks.length = 0;
  queuedWriteTasks.length = 0;
  queuedReadTasks.length = 0;
  moduleLoaded.clear();
  queuedLoadModules.length = 0;
  caughtErrors.length = 0;
}
var nextTick = (cb) => {
  queuedTicks.push(cb);
};
function flushTicks() {
  return new Promise((resolve, reject) => {
    function drain() {
      try {
        if (queuedTicks.length > 0) {
          const writeTasks = queuedTicks.slice();
          queuedTicks.length = 0;
          let cb;
          while (cb = writeTasks.shift()) {
            cb(Date.now());
          }
        }
        if (queuedTicks.length > 0) {
          process.nextTick(drain);
        } else {
          resolve();
        }
      } catch (e) {
        reject(`flushTicks: ${e}`);
      }
    }
    process.nextTick(drain);
  });
}
function writeTask(cb) {
  queuedWriteTasks.push(cb);
}
function readTask(cb) {
  queuedReadTasks.push(cb);
}
function flushQueue() {
  return new Promise((resolve, reject) => {
    async function drain() {
      try {
        if (queuedReadTasks.length > 0) {
          const readTasks = queuedReadTasks.slice();
          queuedReadTasks.length = 0;
          let cb;
          while (cb = readTasks.shift()) {
            const result = cb(Date.now());
            if (result != null && typeof result.then === "function") {
              await result;
            }
          }
        }
        if (queuedWriteTasks.length > 0) {
          const writeTasks = queuedWriteTasks.slice();
          queuedWriteTasks.length = 0;
          let cb;
          while (cb = writeTasks.shift()) {
            const result = cb(Date.now());
            if (result != null && typeof result.then === "function") {
              await result;
            }
          }
        }
        if (queuedReadTasks.length + queuedWriteTasks.length > 0) {
          process.nextTick(drain);
        } else {
          resolve();
        }
      } catch (e) {
        reject(`flushQueue: ${e}`);
      }
    }
    process.nextTick(drain);
  });
}
async function flushAll() {
  while (queuedTicks.length + queuedLoadModules.length + queuedWriteTasks.length + queuedReadTasks.length > 0) {
    await flushTicks();
    await flushLoadModule();
    await flushQueue();
  }
  if (caughtErrors.length > 0) {
    const err2 = caughtErrors[0];
    if (err2 == null) {
      throw new Error("Error!");
    }
    if (typeof err2 === "string") {
      throw new Error(err2);
    }
    throw err2;
  }
  return new Promise((resolve) => process.nextTick(resolve));
}
function loadModule(cmpMeta, _hostRef, _hmrVersionId) {
  return new Promise((resolve) => {
    queuedLoadModules.push({
      bundleId: cmpMeta.$lazyBundleId$,
      resolve: () => resolve(moduleLoaded.get(cmpMeta.$lazyBundleId$))
    });
  });
}
function flushLoadModule(bundleId) {
  return new Promise((resolve, reject) => {
    try {
      process.nextTick(() => {
        if (bundleId != null) {
          for (let i2 = 0; i2 < queuedLoadModules.length; i2++) {
            if (queuedLoadModules[i2].bundleId === bundleId) {
              queuedLoadModules[i2].resolve();
              queuedLoadModules.splice(i2, 1);
              i2--;
            }
          }
        } else {
          let queuedLoadModule;
          while (queuedLoadModule = queuedLoadModules.shift()) {
            queuedLoadModule.resolve();
          }
        }
        resolve();
      });
    } catch (e) {
      reject(`flushLoadModule: ${e}`);
    }
  });
}

// src/testing/platform/testing-window.ts
var import_mock_doc = require("../../mock-doc/index.cjs");
var win = (0, import_mock_doc.setupGlobal)(global);

// src/testing/platform/testing-platform.ts
var supportsShadow = true;
var plt = {
  $flags$: 0,
  $resourcesUrl$: "",
  jmp: (h2) => h2(),
  raf: (h2) => requestAnimationFrame(h2),
  ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
  rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
  ce: (eventName, opts) => new win.CustomEvent(eventName, opts)
};
var setPlatformHelpers = (helpers) => {
  Object.assign(plt, helpers);
};
var supportsListenerOptions = true;
var supportsConstructableStylesheets = false;
var supportsMutableAdoptedStyleSheets = false;
var setSupportsShadowDom = (supports) => {
  supportsShadow = supports;
};
function resetPlatform(defaults2 = {}) {
  if (win && typeof win.close === "function") {
    win.close();
  }
  styles.clear();
  plt.$flags$ = 0;
  Object.assign(plt, defaults2);
  if (plt.$orgLocNodes$ != null) {
    plt.$orgLocNodes$.clear();
    plt.$orgLocNodes$ = void 0;
  }
  win.location.href = plt.$resourcesUrl$ = `http://testing.stenciljs.com/`;
  resetTaskQueue();
  stopAutoApplyChanges();
  cstrs.clear();
}
var isAutoApplyingChanges = false;
var autoApplyTimer = void 0;
function stopAutoApplyChanges() {
  isAutoApplyingChanges = false;
  if (autoApplyTimer) {
    clearTimeout(autoApplyTimer);
    autoApplyTimer = void 0;
  }
}
async function startAutoApplyChanges() {
  isAutoApplyingChanges = true;
  flushAll().then(() => {
    if (isAutoApplyingChanges) {
      autoApplyTimer = setTimeout(() => {
        startAutoApplyChanges();
      }, 100);
    }
  });
}
var registerComponents = (Cstrs) => {
  Cstrs.filter((Cstr) => Cstr.COMPILER_META).forEach((Cstr) => {
    cstrs.set(Cstr.COMPILER_META.tagName, Cstr);
  });
};
function registerModule(bundleId, Cstr) {
  moduleLoaded.set(bundleId, Cstr);
}
var isMemberInElement = (elm, memberName) => {
  if (elm != null) {
    if (memberName in elm) {
      return true;
    }
    const nodeName = elm.nodeName;
    if (nodeName) {
      const cstr = cstrs.get(nodeName.toLowerCase());
      if (cstr != null && cstr.COMPILER_META != null && cstr.COMPILER_META.properties != null) {
        return cstr.COMPILER_META.properties.some((p) => p.name === memberName);
      }
    }
  }
  return false;
};

// src/testing/platform/index.ts
var import_app_data24 = require("@stencil/core/internal/app-data");

// src/runtime/asset-path.ts
var getAssetPath = (path2) => {
  const assetUrl = new URL(path2, plt.$resourcesUrl$);
  return assetUrl.origin !== win.location.origin ? assetUrl.href : assetUrl.pathname;
};
var setAssetPath = (path2) => plt.$resourcesUrl$ = path2;

// src/runtime/bootstrap-custom-element.ts
var import_app_data20 = require("@stencil/core/internal/app-data");

// src/runtime/connected-callback.ts
var import_app_data18 = require("@stencil/core/internal/app-data");

// src/runtime/client-hydrate.ts
var import_app_data9 = require("@stencil/core/internal/app-data");

// src/runtime/dom-extras.ts
var import_app_data5 = require("@stencil/core/internal/app-data");

// src/runtime/slot-polyfill-utils.ts
var import_app_data4 = require("@stencil/core/internal/app-data");
var updateFallbackSlotVisibility = (elm) => {
  const childNodes = internalCall(elm, "childNodes");
  if (elm.tagName && elm.tagName.includes("-") && elm["s-cr"] && elm.tagName !== "SLOT-FB") {
    getHostSlotNodes(childNodes, elm.tagName).forEach((slotNode) => {
      if (slotNode.nodeType === 1 /* ElementNode */ && slotNode.tagName === "SLOT-FB") {
        if (getSlotChildSiblings(slotNode, getSlotName(slotNode), false).length) {
          slotNode.hidden = true;
        } else {
          slotNode.hidden = false;
        }
      }
    });
  }
  let i2 = 0;
  for (i2 = 0; i2 < childNodes.length; i2++) {
    const childNode = childNodes[i2];
    if (childNode.nodeType === 1 /* ElementNode */ && internalCall(childNode, "childNodes").length) {
      updateFallbackSlotVisibility(childNode);
    }
  }
};
var getSlottedChildNodes = (childNodes) => {
  const result = [];
  for (let i2 = 0; i2 < childNodes.length; i2++) {
    const slottedNode = childNodes[i2]["s-nr"] || void 0;
    if (slottedNode && slottedNode.isConnected) {
      result.push(slottedNode);
    }
  }
  return result;
};
function getHostSlotNodes(childNodes, hostName, slotName) {
  let i2 = 0;
  let slottedNodes = [];
  let childNode;
  for (; i2 < childNodes.length; i2++) {
    childNode = childNodes[i2];
    if (childNode["s-sr"] && (!hostName || childNode["s-hn"] === hostName) && (slotName === void 0 || getSlotName(childNode) === slotName)) {
      slottedNodes.push(childNode);
      if (typeof slotName !== "undefined") return slottedNodes;
    }
    slottedNodes = [...slottedNodes, ...getHostSlotNodes(childNode.childNodes, hostName, slotName)];
  }
  return slottedNodes;
}
var getSlotChildSiblings = (slot, slotName, includeSlot = true) => {
  const childNodes = [];
  if (includeSlot && slot["s-sr"] || !slot["s-sr"]) childNodes.push(slot);
  let node = slot;
  while (node = node.nextSibling) {
    if (getSlotName(node) === slotName && (includeSlot || !node["s-sr"])) childNodes.push(node);
  }
  return childNodes;
};
var isNodeLocatedInSlot = (nodeToRelocate, slotName) => {
  if (nodeToRelocate.nodeType === 1 /* ElementNode */) {
    if (nodeToRelocate.getAttribute("slot") === null && slotName === "") {
      return true;
    }
    if (nodeToRelocate.getAttribute("slot") === slotName) {
      return true;
    }
    return false;
  }
  if (nodeToRelocate["s-sn"] === slotName) {
    return true;
  }
  return slotName === "";
};
var addSlotRelocateNode = (newChild, slotNode, prepend, position) => {
  if (newChild["s-ol"] && newChild["s-ol"].isConnected) {
    return;
  }
  const slottedNodeLocation = document.createTextNode("");
  slottedNodeLocation["s-nr"] = newChild;
  if (!slotNode["s-cr"] || !slotNode["s-cr"].parentNode) return;
  const parent = slotNode["s-cr"].parentNode;
  const appendMethod = prepend ? internalCall(parent, "prepend") : internalCall(parent, "appendChild");
  if (import_app_data4.BUILD.hydrateClientSide && typeof position !== "undefined") {
    slottedNodeLocation["s-oo"] = position;
    const childNodes = internalCall(parent, "childNodes");
    const slotRelocateNodes = [slottedNodeLocation];
    childNodes.forEach((n) => {
      if (n["s-nr"]) slotRelocateNodes.push(n);
    });
    slotRelocateNodes.sort((a, b) => {
      if (!a["s-oo"] || a["s-oo"] < (b["s-oo"] || 0)) return -1;
      else if (!b["s-oo"] || b["s-oo"] < a["s-oo"]) return 1;
      return 0;
    });
    slotRelocateNodes.forEach((n) => appendMethod.call(parent, n));
  } else {
    appendMethod.call(parent, slottedNodeLocation);
  }
  newChild["s-ol"] = slottedNodeLocation;
  newChild["s-sh"] = slotNode["s-hn"];
};
var getSlotName = (node) => typeof node["s-sn"] === "string" ? node["s-sn"] : node.nodeType === 1 && node.getAttribute("slot") || void 0;
function patchSlotNode(node) {
  if (node.assignedElements || node.assignedNodes || !node["s-sr"]) return;
  const assignedFactory = (elementsOnly) => (function(opts) {
    const toReturn = [];
    const slotName = this["s-sn"];
    if (opts == null ? void 0 : opts.flatten) {
      console.error(`
          Flattening is not supported for Stencil non-shadow slots.
          You can use \`.childNodes\` to nested slot fallback content.
          If you have a particular use case, please open an issue on the Stencil repo.
        `);
    }
    const parent = this["s-cr"].parentElement;
    const slottedNodes = parent.__childNodes ? parent.childNodes : getSlottedChildNodes(parent.childNodes);
    slottedNodes.forEach((n) => {
      if (slotName === getSlotName(n)) {
        toReturn.push(n);
      }
    });
    if (elementsOnly) {
      return toReturn.filter((n) => n.nodeType === 1 /* ElementNode */);
    }
    return toReturn;
  }).bind(node);
  node.assignedElements = assignedFactory(true);
  node.assignedNodes = assignedFactory(false);
}
function dispatchSlotChangeEvent(elm) {
  elm.dispatchEvent(new CustomEvent("slotchange", { bubbles: false, cancelable: false, composed: false }));
}
function findSlotFromSlottedNode(slottedNode, parentHost) {
  var _a2;
  parentHost = parentHost || ((_a2 = slottedNode["s-ol"]) == null ? void 0 : _a2.parentElement);
  if (!parentHost) return { slotNode: null, slotName: "" };
  const slotName = slottedNode["s-sn"] = getSlotName(slottedNode) || "";
  const childNodes = internalCall(parentHost, "childNodes");
  const slotNode = getHostSlotNodes(childNodes, parentHost.tagName, slotName)[0];
  return { slotNode, slotName };
}

// src/runtime/dom-extras.ts
var patchPseudoShadowDom = (hostElementPrototype) => {
  patchCloneNode(hostElementPrototype);
  patchSlotAppendChild(hostElementPrototype);
  patchSlotAppend(hostElementPrototype);
  patchSlotPrepend(hostElementPrototype);
  patchSlotInsertAdjacentElement(hostElementPrototype);
  patchSlotInsertAdjacentHTML(hostElementPrototype);
  patchSlotInsertAdjacentText(hostElementPrototype);
  patchInsertBefore(hostElementPrototype);
  patchTextContent(hostElementPrototype);
  patchChildSlotNodes(hostElementPrototype);
  patchSlotRemoveChild(hostElementPrototype);
};
var patchCloneNode = (HostElementPrototype) => {
  if (HostElementPrototype.__cloneNode) return;
  const orgCloneNode = HostElementPrototype.__cloneNode = HostElementPrototype.cloneNode;
  HostElementPrototype.cloneNode = function(deep) {
    const srcNode = this;
    const isShadowDom = import_app_data5.BUILD.shadowDom ? srcNode.shadowRoot && supportsShadow : false;
    const clonedNode = orgCloneNode.call(srcNode, isShadowDom ? deep : false);
    if (import_app_data5.BUILD.slot && !isShadowDom && deep) {
      let i2 = 0;
      let slotted, nonStencilNode;
      const stencilPrivates = [
        "s-id",
        "s-cr",
        "s-lr",
        "s-rc",
        "s-sc",
        "s-p",
        "s-cn",
        "s-sr",
        "s-sn",
        "s-hn",
        "s-ol",
        "s-nr",
        "s-si",
        "s-rf",
        "s-scs"
      ];
      const childNodes = this.__childNodes || this.childNodes;
      for (; i2 < childNodes.length; i2++) {
        slotted = childNodes[i2]["s-nr"];
        nonStencilNode = stencilPrivates.every((privateField) => !childNodes[i2][privateField]);
        if (slotted) {
          if (import_app_data5.BUILD.appendChildSlotFix && clonedNode.__appendChild) {
            clonedNode.__appendChild(slotted.cloneNode(true));
          } else {
            clonedNode.appendChild(slotted.cloneNode(true));
          }
        }
        if (nonStencilNode) {
          clonedNode.appendChild(childNodes[i2].cloneNode(true));
        }
      }
    }
    return clonedNode;
  };
};
var patchSlotAppendChild = (HostElementPrototype) => {
  if (HostElementPrototype.__appendChild) return;
  HostElementPrototype.__appendChild = HostElementPrototype.appendChild;
  HostElementPrototype.appendChild = function(newChild) {
    const { slotName, slotNode } = findSlotFromSlottedNode(newChild, this);
    if (slotNode) {
      addSlotRelocateNode(newChild, slotNode);
      const slotChildNodes = getSlotChildSiblings(slotNode, slotName);
      const appendAfter = slotChildNodes[slotChildNodes.length - 1];
      const parent = internalCall(appendAfter, "parentNode");
      const insertedNode = internalCall(parent, "insertBefore")(newChild, appendAfter.nextSibling);
      dispatchSlotChangeEvent(slotNode);
      updateFallbackSlotVisibility(this);
      return insertedNode;
    }
    return this.__appendChild(newChild);
  };
};
var patchSlotRemoveChild = (ElementPrototype) => {
  if (ElementPrototype.__removeChild) return;
  ElementPrototype.__removeChild = ElementPrototype.removeChild;
  ElementPrototype.removeChild = function(toRemove) {
    if (toRemove && typeof toRemove["s-sn"] !== "undefined") {
      const childNodes = this.__childNodes || this.childNodes;
      const slotNode = getHostSlotNodes(childNodes, this.tagName, toRemove["s-sn"]);
      if (slotNode && toRemove.isConnected) {
        toRemove.remove();
        updateFallbackSlotVisibility(this);
        return;
      }
    }
    return this.__removeChild(toRemove);
  };
};
var patchSlotPrepend = (HostElementPrototype) => {
  if (HostElementPrototype.__prepend) return;
  HostElementPrototype.__prepend = HostElementPrototype.prepend;
  HostElementPrototype.prepend = function(...newChildren) {
    newChildren.forEach((newChild) => {
      if (typeof newChild === "string") {
        newChild = this.ownerDocument.createTextNode(newChild);
      }
      const slotName = (newChild["s-sn"] = getSlotName(newChild)) || "";
      const childNodes = internalCall(this, "childNodes");
      const slotNode = getHostSlotNodes(childNodes, this.tagName, slotName)[0];
      if (slotNode) {
        addSlotRelocateNode(newChild, slotNode, true);
        const slotChildNodes = getSlotChildSiblings(slotNode, slotName);
        const appendAfter = slotChildNodes[0];
        const parent = internalCall(appendAfter, "parentNode");
        const toReturn = internalCall(parent, "insertBefore")(newChild, internalCall(appendAfter, "nextSibling"));
        dispatchSlotChangeEvent(slotNode);
        return toReturn;
      }
      if (newChild.nodeType === 1 && !!newChild.getAttribute("slot")) {
        newChild.hidden = true;
      }
      return HostElementPrototype.__prepend(newChild);
    });
  };
};
var patchSlotAppend = (HostElementPrototype) => {
  if (HostElementPrototype.__append) return;
  HostElementPrototype.__append = HostElementPrototype.append;
  HostElementPrototype.append = function(...newChildren) {
    newChildren.forEach((newChild) => {
      if (typeof newChild === "string") {
        newChild = this.ownerDocument.createTextNode(newChild);
      }
      this.appendChild(newChild);
    });
  };
};
var patchSlotInsertAdjacentHTML = (HostElementPrototype) => {
  if (HostElementPrototype.__insertAdjacentHTML) return;
  const originalInsertAdjacentHtml = HostElementPrototype.insertAdjacentHTML;
  HostElementPrototype.insertAdjacentHTML = function(position, text) {
    if (position !== "afterbegin" && position !== "beforeend") {
      return originalInsertAdjacentHtml.call(this, position, text);
    }
    const container = this.ownerDocument.createElement("_");
    let node;
    container.innerHTML = text;
    if (position === "afterbegin") {
      while (node = container.firstChild) {
        this.prepend(node);
      }
    } else if (position === "beforeend") {
      while (node = container.firstChild) {
        this.append(node);
      }
    }
  };
};
var patchSlotInsertAdjacentText = (HostElementPrototype) => {
  HostElementPrototype.insertAdjacentText = function(position, text) {
    this.insertAdjacentHTML(position, text);
  };
};
var patchInsertBefore = (HostElementPrototype) => {
  if (HostElementPrototype.__insertBefore) return;
  const eleProto = HostElementPrototype;
  if (eleProto.__insertBefore) return;
  eleProto.__insertBefore = HostElementPrototype.insertBefore;
  HostElementPrototype.insertBefore = function(newChild, currentChild) {
    const { slotName, slotNode } = findSlotFromSlottedNode(newChild, this);
    const slottedNodes = this.__childNodes ? this.childNodes : getSlottedChildNodes(this.childNodes);
    if (slotNode) {
      let found = false;
      slottedNodes.forEach((childNode) => {
        if (childNode === currentChild || currentChild === null) {
          found = true;
          if (currentChild === null || slotName !== currentChild["s-sn"]) {
            this.appendChild(newChild);
            return;
          }
          if (slotName === currentChild["s-sn"]) {
            addSlotRelocateNode(newChild, slotNode);
            const parent = internalCall(currentChild, "parentNode");
            internalCall(parent, "insertBefore")(newChild, currentChild);
            dispatchSlotChangeEvent(slotNode);
          }
          return;
        }
      });
      if (found) return newChild;
    }
    const parentNode = currentChild == null ? void 0 : currentChild.__parentNode;
    if (parentNode && !this.isSameNode(parentNode)) {
      return this.appendChild(newChild);
    }
    return this.__insertBefore(newChild, currentChild);
  };
};
var patchSlotInsertAdjacentElement = (HostElementPrototype) => {
  if (HostElementPrototype.__insertAdjacentElement) return;
  const originalInsertAdjacentElement = HostElementPrototype.insertAdjacentElement;
  HostElementPrototype.insertAdjacentElement = function(position, element) {
    if (position !== "afterbegin" && position !== "beforeend") {
      return originalInsertAdjacentElement.call(this, position, element);
    }
    if (position === "afterbegin") {
      this.prepend(element);
      return element;
    } else if (position === "beforeend") {
      this.append(element);
      return element;
    }
    return element;
  };
};
var patchTextContent = (hostElementPrototype) => {
  patchHostOriginalAccessor("textContent", hostElementPrototype);
  Object.defineProperty(hostElementPrototype, "textContent", {
    get: function() {
      let text = "";
      const childNodes = this.__childNodes ? this.childNodes : getSlottedChildNodes(this.childNodes);
      childNodes.forEach((node) => text += node.textContent || "");
      return text;
    },
    set: function(value) {
      const childNodes = this.__childNodes ? this.childNodes : getSlottedChildNodes(this.childNodes);
      childNodes.forEach((node) => {
        if (node["s-ol"]) node["s-ol"].remove();
        node.remove();
      });
      this.insertAdjacentHTML("beforeend", value);
    }
  });
};
var patchChildSlotNodes = (elm) => {
  class FakeNodeList extends Array {
    item(n) {
      return this[n];
    }
  }
  patchHostOriginalAccessor("children", elm);
  Object.defineProperty(elm, "children", {
    get() {
      return this.childNodes.filter((n) => n.nodeType === 1);
    }
  });
  Object.defineProperty(elm, "childElementCount", {
    get() {
      return this.children.length;
    }
  });
  patchHostOriginalAccessor("firstChild", elm);
  Object.defineProperty(elm, "firstChild", {
    get() {
      return this.childNodes[0];
    }
  });
  patchHostOriginalAccessor("lastChild", elm);
  Object.defineProperty(elm, "lastChild", {
    get() {
      return this.childNodes[this.childNodes.length - 1];
    }
  });
  patchHostOriginalAccessor("childNodes", elm);
  Object.defineProperty(elm, "childNodes", {
    get() {
      const result = new FakeNodeList();
      result.push(...getSlottedChildNodes(this.__childNodes));
      return result;
    }
  });
};
var patchSlottedNode = (node) => {
  if (!node || node.__nextSibling !== void 0 || !globalThis.Node) return;
  patchNextSibling(node);
  patchPreviousSibling(node);
  patchParentNode(node);
  if (node.nodeType === Node.ELEMENT_NODE) {
    patchNextElementSibling(node);
    patchPreviousElementSibling(node);
  }
};
var patchNextSibling = (node) => {
  if (!node || node.__nextSibling) return;
  patchHostOriginalAccessor("nextSibling", node);
  Object.defineProperty(node, "nextSibling", {
    get: function() {
      var _a2;
      const parentNodes = (_a2 = this["s-ol"]) == null ? void 0 : _a2.parentNode.childNodes;
      const index = parentNodes == null ? void 0 : parentNodes.indexOf(this);
      if (parentNodes && index > -1) {
        return parentNodes[index + 1];
      }
      return this.__nextSibling;
    }
  });
};
var patchNextElementSibling = (element) => {
  if (!element || element.__nextElementSibling) return;
  patchHostOriginalAccessor("nextElementSibling", element);
  Object.defineProperty(element, "nextElementSibling", {
    get: function() {
      var _a2;
      const parentEles = (_a2 = this["s-ol"]) == null ? void 0 : _a2.parentNode.children;
      const index = parentEles == null ? void 0 : parentEles.indexOf(this);
      if (parentEles && index > -1) {
        return parentEles[index + 1];
      }
      return this.__nextElementSibling;
    }
  });
};
var patchPreviousSibling = (node) => {
  if (!node || node.__previousSibling) return;
  patchHostOriginalAccessor("previousSibling", node);
  Object.defineProperty(node, "previousSibling", {
    get: function() {
      var _a2;
      const parentNodes = (_a2 = this["s-ol"]) == null ? void 0 : _a2.parentNode.childNodes;
      const index = parentNodes == null ? void 0 : parentNodes.indexOf(this);
      if (parentNodes && index > -1) {
        return parentNodes[index - 1];
      }
      return this.__previousSibling;
    }
  });
};
var patchPreviousElementSibling = (element) => {
  if (!element || element.__previousElementSibling) return;
  patchHostOriginalAccessor("previousElementSibling", element);
  Object.defineProperty(element, "previousElementSibling", {
    get: function() {
      var _a2;
      const parentNodes = (_a2 = this["s-ol"]) == null ? void 0 : _a2.parentNode.children;
      const index = parentNodes == null ? void 0 : parentNodes.indexOf(this);
      if (parentNodes && index > -1) {
        return parentNodes[index - 1];
      }
      return this.__previousElementSibling;
    }
  });
};
var patchParentNode = (node) => {
  if (!node || node.__parentNode) return;
  patchHostOriginalAccessor("parentNode", node);
  Object.defineProperty(node, "parentNode", {
    get: function() {
      var _a2;
      return ((_a2 = this["s-ol"]) == null ? void 0 : _a2.parentNode) || this.__parentNode;
    },
    set: function(value) {
      this.__parentNode = value;
    }
  });
};
var validElementPatches = ["children", "nextElementSibling", "previousElementSibling"];
var validNodesPatches = [
  "childNodes",
  "firstChild",
  "lastChild",
  "nextSibling",
  "previousSibling",
  "textContent",
  "parentNode"
];
function patchHostOriginalAccessor(accessorName, node) {
  if (!globalThis.Node || !globalThis.Element) {
    return;
  }
  let accessor;
  if (validElementPatches.includes(accessorName)) {
    accessor = Object.getOwnPropertyDescriptor(Element.prototype, accessorName);
  } else if (validNodesPatches.includes(accessorName)) {
    accessor = Object.getOwnPropertyDescriptor(Node.prototype, accessorName);
  }
  if (!accessor) {
    accessor = Object.getOwnPropertyDescriptor(node, accessorName);
  }
  if (accessor) Object.defineProperty(node, "__" + accessorName, accessor);
}
function internalCall(node, method) {
  if ("__" + method in node) {
    const toReturn = node["__" + method];
    if (typeof toReturn !== "function") return toReturn;
    return toReturn.bind(node);
  } else {
    if (typeof node[method] !== "function") return node[method];
    return node[method].bind(node);
  }
}

// src/runtime/profile.ts
var import_app_data6 = require("@stencil/core/internal/app-data");
var i = 0;
var createTime = (fnName, tagName = "") => {
  if (import_app_data6.BUILD.profile && performance.mark) {
    const key = `st:${fnName}:${tagName}:${i++}`;
    performance.mark(key);
    return () => performance.measure(`[Stencil] ${fnName}() <${tagName}>`, key);
  } else {
    return () => {
      return;
    };
  }
};
var uniqueTime = (key, measureText) => {
  if (import_app_data6.BUILD.profile && performance.mark) {
    if (performance.getEntriesByName(key, "mark").length === 0) {
      performance.mark(key);
    }
    return () => {
      if (performance.getEntriesByName(measureText, "measure").length === 0) {
        performance.measure(measureText, key);
      }
    };
  } else {
    return () => {
      return;
    };
  }
};
var inspect = (ref) => {
  const hostRef = getHostRef(ref);
  if (!hostRef) {
    return void 0;
  }
  const flags = hostRef.$flags$;
  const hostElement = hostRef.$hostElement$;
  return {
    renderCount: hostRef.$renderCount$,
    flags: {
      hasRendered: !!(flags & 2 /* hasRendered */),
      hasConnected: !!(flags & 1 /* hasConnected */),
      isWaitingForChildren: !!(flags & 4 /* isWaitingForChildren */),
      isConstructingInstance: !!(flags & 8 /* isConstructingInstance */),
      isQueuedForUpdate: !!(flags & 16 /* isQueuedForUpdate */),
      hasInitializedComponent: !!(flags & 32 /* hasInitializedComponent */),
      hasLoadedComponent: !!(flags & 64 /* hasLoadedComponent */),
      isWatchReady: !!(flags & 128 /* isWatchReady */),
      isListenReady: !!(flags & 256 /* isListenReady */),
      needsRerender: !!(flags & 512 /* needsRerender */)
    },
    instanceValues: hostRef.$instanceValues$,
    serializerValues: hostRef.$serializerValues$,
    ancestorComponent: hostRef.$ancestorComponent$,
    hostElement,
    lazyInstance: hostRef.$lazyInstance$,
    vnode: hostRef.$vnode$,
    modeName: hostRef.$modeName$,
    fetchedCbList: hostRef.$fetchedCbList$,
    onReadyPromise: hostRef.$onReadyPromise$,
    onReadyResolve: hostRef.$onReadyResolve$,
    onInstancePromise: hostRef.$onInstancePromise$,
    onInstanceResolve: hostRef.$onInstanceResolve$,
    onRenderResolve: hostRef.$onRenderResolve$,
    queuedListeners: hostRef.$queuedListeners$,
    rmListeners: hostRef.$rmListeners$,
    ["s-id"]: hostElement["s-id"],
    ["s-cr"]: hostElement["s-cr"],
    ["s-lr"]: hostElement["s-lr"],
    ["s-p"]: hostElement["s-p"],
    ["s-rc"]: hostElement["s-rc"],
    ["s-sc"]: hostElement["s-sc"]
  };
};
var installDevTools = () => {
  if (import_app_data6.BUILD.devTools) {
    const stencil = win.stencil = win.stencil || {};
    const originalInspect = stencil.inspect;
    stencil.inspect = (ref) => {
      let result = inspect(ref);
      if (!result && typeof originalInspect === "function") {
        result = originalInspect(ref);
      }
      return result;
    };
  }
};

// src/runtime/styles.ts
var import_app_data7 = require("@stencil/core/internal/app-data");
var rootAppliedStyles = /* @__PURE__ */ new WeakMap();
var registerStyle = (scopeId2, cssText, allowCS) => {
  let style = styles.get(scopeId2);
  if (supportsConstructableStylesheets && allowCS) {
    style = style || new CSSStyleSheet();
    if (typeof style === "string") {
      style = cssText;
    } else {
      style.replaceSync(cssText);
    }
  } else {
    style = cssText;
  }
  styles.set(scopeId2, style);
};
var addStyle = (styleContainerNode, cmpMeta, mode) => {
  var _a2, _b, _c;
  const scopeId2 = getScopeId(cmpMeta, mode);
  const style = styles.get(scopeId2);
  if (!import_app_data7.BUILD.attachStyles || !win.document) {
    return scopeId2;
  }
  styleContainerNode = styleContainerNode.nodeType === 11 /* DocumentFragment */ ? styleContainerNode : win.document;
  if (style) {
    if (typeof style === "string") {
      styleContainerNode = styleContainerNode.head || styleContainerNode;
      let appliedStyles = rootAppliedStyles.get(styleContainerNode);
      let styleElm;
      if (!appliedStyles) {
        rootAppliedStyles.set(styleContainerNode, appliedStyles = /* @__PURE__ */ new Set());
      }
      const existingStyleElm = (import_app_data7.BUILD.hydrateClientSide || import_app_data7.BUILD.hotModuleReplacement) && styleContainerNode.querySelector(`[${HYDRATED_STYLE_ID}="${scopeId2}"]`);
      if (existingStyleElm) {
        existingStyleElm.textContent = style;
      } else if (!appliedStyles.has(scopeId2)) {
        styleElm = win.document.createElement("style");
        styleElm.textContent = style;
        const nonce = (_a2 = plt.$nonce$) != null ? _a2 : queryNonceMetaTagContent(win.document);
        if (nonce != null) {
          styleElm.setAttribute("nonce", nonce);
        }
        if ((import_app_data7.BUILD.hydrateServerSide || import_app_data7.BUILD.hotModuleReplacement) && (cmpMeta.$flags$ & 2 /* scopedCssEncapsulation */ || cmpMeta.$flags$ & 128 /* shadowNeedsScopedCss */ || cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */)) {
          styleElm.setAttribute(HYDRATED_STYLE_ID, scopeId2);
        }
        if (!(cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */)) {
          if (styleContainerNode.nodeName === "HEAD") {
            const preconnectLinks = styleContainerNode.querySelectorAll("link[rel=preconnect]");
            const referenceNode2 = preconnectLinks.length > 0 ? preconnectLinks[preconnectLinks.length - 1].nextSibling : styleContainerNode.querySelector("style");
            styleContainerNode.insertBefore(
              styleElm,
              (referenceNode2 == null ? void 0 : referenceNode2.parentNode) === styleContainerNode ? referenceNode2 : null
            );
          } else if ("host" in styleContainerNode) {
            if (supportsConstructableStylesheets) {
              const currentWindow = (_b = styleContainerNode.defaultView) != null ? _b : styleContainerNode.ownerDocument.defaultView;
              const stylesheet = new currentWindow.CSSStyleSheet();
              stylesheet.replaceSync(style);
              if (supportsMutableAdoptedStyleSheets) {
                styleContainerNode.adoptedStyleSheets.unshift(stylesheet);
              } else {
                styleContainerNode.adoptedStyleSheets = [stylesheet, ...styleContainerNode.adoptedStyleSheets];
              }
            } else {
              const existingStyleContainer = styleContainerNode.querySelector("style");
              if (existingStyleContainer && !import_app_data7.BUILD.hotModuleReplacement) {
                existingStyleContainer.textContent = style + existingStyleContainer.textContent;
              } else {
                styleContainerNode.prepend(styleElm);
              }
            }
          } else {
            styleContainerNode.append(styleElm);
          }
        }
        if (cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
          styleContainerNode.insertBefore(styleElm, null);
        }
        if (cmpMeta.$flags$ & 4 /* hasSlotRelocation */) {
          styleElm.textContent += SLOT_FB_CSS;
        }
        if (appliedStyles) {
          appliedStyles.add(scopeId2);
        }
      }
    } else if (import_app_data7.BUILD.constructableCSS) {
      let appliedStyles = rootAppliedStyles.get(styleContainerNode);
      if (!appliedStyles) {
        rootAppliedStyles.set(styleContainerNode, appliedStyles = /* @__PURE__ */ new Set());
      }
      if (!appliedStyles.has(scopeId2)) {
        const currentWindow = (_c = styleContainerNode.defaultView) != null ? _c : styleContainerNode.ownerDocument.defaultView;
        let stylesheet;
        if (style.constructor === currentWindow.CSSStyleSheet) {
          stylesheet = style;
        } else {
          stylesheet = new currentWindow.CSSStyleSheet();
          for (let i2 = 0; i2 < style.cssRules.length; i2++) {
            stylesheet.insertRule(style.cssRules[i2].cssText, i2);
          }
        }
        if (supportsMutableAdoptedStyleSheets) {
          styleContainerNode.adoptedStyleSheets.push(stylesheet);
        } else {
          styleContainerNode.adoptedStyleSheets = [...styleContainerNode.adoptedStyleSheets, stylesheet];
        }
        appliedStyles.add(scopeId2);
        if (import_app_data7.BUILD.hydrateClientSide && "host" in styleContainerNode) {
          const ssrStyleElm = styleContainerNode.querySelector(`[${HYDRATED_STYLE_ID}="${scopeId2}"]`);
          if (ssrStyleElm) {
            writeTask(() => ssrStyleElm.remove());
          }
        }
      }
    }
  }
  return scopeId2;
};
var attachStyles = (hostRef) => {
  const cmpMeta = hostRef.$cmpMeta$;
  const elm = hostRef.$hostElement$;
  const flags = cmpMeta.$flags$;
  const endAttachStyles = createTime("attachStyles", cmpMeta.$tagName$);
  const scopeId2 = addStyle(
    import_app_data7.BUILD.shadowDom && supportsShadow && elm.shadowRoot ? elm.shadowRoot : elm.getRootNode(),
    cmpMeta,
    hostRef.$modeName$
  );
  if ((import_app_data7.BUILD.shadowDom || import_app_data7.BUILD.scoped) && import_app_data7.BUILD.cssAnnotations && flags & 10 /* needsScopedEncapsulation */) {
    elm["s-sc"] = scopeId2;
    elm.classList.add(scopeId2 + "-h");
  }
  endAttachStyles();
};
var getScopeId = (cmp, mode) => "sc-" + (import_app_data7.BUILD.mode && mode && cmp.$flags$ & 32 /* hasMode */ ? cmp.$tagName$ + "-" + mode : cmp.$tagName$);
var convertScopedToShadow = (css) => css.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g, "$1{");
var hydrateScopedToShadow = () => {
  if (!win.document) {
    return;
  }
  const styles2 = win.document.querySelectorAll(`[${HYDRATED_STYLE_ID}]`);
  let i2 = 0;
  for (; i2 < styles2.length; i2++) {
    registerStyle(styles2[i2].getAttribute(HYDRATED_STYLE_ID), convertScopedToShadow(styles2[i2].innerHTML), true);
  }
};

// src/runtime/vdom/h.ts
var import_app_data8 = require("@stencil/core/internal/app-data");
var h = (nodeName, vnodeData, ...children) => {
  if (typeof nodeName === "string") {
    nodeName = transformTag(nodeName);
  }
  let child = null;
  let key = null;
  let slotName = null;
  let simple = false;
  let lastSimple = false;
  const vNodeChildren = [];
  const walk = (c) => {
    for (let i2 = 0; i2 < c.length; i2++) {
      child = c[i2];
      if (Array.isArray(child)) {
        walk(child);
      } else if (child != null && typeof child !== "boolean") {
        if (simple = typeof nodeName !== "function" && !isComplexType(child)) {
          child = String(child);
        } else if (import_app_data8.BUILD.isDev && typeof nodeName !== "function" && child.$flags$ === void 0) {
          consoleDevError(`vNode passed as children has unexpected type.
Make sure it's using the correct h() function.
Empty objects can also be the cause, look for JSX comments that became objects.`);
        }
        if (simple && lastSimple) {
          vNodeChildren[vNodeChildren.length - 1].$text$ += child;
        } else {
          vNodeChildren.push(simple ? newVNode(null, child) : child);
        }
        lastSimple = simple;
      }
    }
  };
  walk(children);
  if (vnodeData) {
    if (import_app_data8.BUILD.isDev && nodeName === "input") {
      validateInputProperties(vnodeData);
    }
    if (import_app_data8.BUILD.vdomKey && vnodeData.key) {
      key = vnodeData.key;
    }
    if (import_app_data8.BUILD.slotRelocation && vnodeData.name) {
      slotName = vnodeData.name;
    }
    if (import_app_data8.BUILD.vdomClass) {
      const classData = vnodeData.className || vnodeData.class;
      if (classData) {
        vnodeData.class = typeof classData !== "object" ? classData : Object.keys(classData).filter((k) => classData[k]).join(" ");
      }
    }
  }
  if (import_app_data8.BUILD.isDev && vNodeChildren.some(isHost)) {
    consoleDevError(`The <Host> must be the single root component. Make sure:
- You are NOT using hostData() and <Host> in the same component.
- <Host> is used once, and it's the single root component of the render() function.`);
  }
  if (import_app_data8.BUILD.vdomFunctional && typeof nodeName === "function") {
    return nodeName(
      vnodeData === null ? {} : vnodeData,
      vNodeChildren,
      vdomFnUtils
    );
  }
  const vnode = newVNode(nodeName, null);
  vnode.$attrs$ = vnodeData;
  if (vNodeChildren.length > 0) {
    vnode.$children$ = vNodeChildren;
  }
  if (import_app_data8.BUILD.vdomKey) {
    vnode.$key$ = key;
  }
  if (import_app_data8.BUILD.slotRelocation) {
    vnode.$name$ = slotName;
  }
  return vnode;
};
var newVNode = (tag, text) => {
  const vnode = {
    $flags$: 0,
    $tag$: tag,
    // Normalize undefined to null to prevent rendering "undefined" as text
    $text$: text != null ? text : null,
    $elm$: null,
    $children$: null
  };
  if (import_app_data8.BUILD.vdomAttribute) {
    vnode.$attrs$ = null;
  }
  if (import_app_data8.BUILD.vdomKey) {
    vnode.$key$ = null;
  }
  if (import_app_data8.BUILD.slotRelocation) {
    vnode.$name$ = null;
  }
  return vnode;
};
var Host = {};
var isHost = (node) => node && node.$tag$ === Host;
var vdomFnUtils = {
  forEach: (children, cb) => children.map(convertToPublic).forEach(cb),
  map: (children, cb) => children.map(convertToPublic).map(cb).map(convertToPrivate)
};
var convertToPublic = (node) => ({
  vattrs: node.$attrs$,
  vchildren: node.$children$,
  vkey: node.$key$,
  vname: node.$name$,
  vtag: node.$tag$,
  vtext: node.$text$
});
var convertToPrivate = (node) => {
  if (typeof node.vtag === "function") {
    const vnodeData = { ...node.vattrs };
    if (node.vkey) {
      vnodeData.key = node.vkey;
    }
    if (node.vname) {
      vnodeData.name = node.vname;
    }
    return h(node.vtag, vnodeData, ...node.vchildren || []);
  }
  const vnode = newVNode(node.vtag, node.vtext);
  vnode.$attrs$ = node.vattrs;
  vnode.$children$ = node.vchildren;
  vnode.$key$ = node.vkey;
  vnode.$name$ = node.vname;
  return vnode;
};
var validateInputProperties = (inputElm) => {
  const props = Object.keys(inputElm);
  const value = props.indexOf("value");
  if (value === -1) {
    return;
  }
  const typeIndex = props.indexOf("type");
  const minIndex = props.indexOf("min");
  const maxIndex = props.indexOf("max");
  const stepIndex = props.indexOf("step");
  if (value < typeIndex || value < minIndex || value < maxIndex || value < stepIndex) {
    consoleDevWarn(`The "value" prop of <input> should be set after "min", "max", "type" and "step"`);
  }
};

// src/runtime/client-hydrate.ts
var initializeClientHydrate = (hostElm, tagName, hostId, hostRef) => {
  var _a2, _b, _c, _d;
  const endHydrate = createTime("hydrateClient", tagName);
  const shadowRoot = hostElm.shadowRoot;
  const childRenderNodes = [];
  const slotNodes = [];
  const slottedNodes = [];
  const shadowRootNodes = import_app_data9.BUILD.shadowDom && shadowRoot ? [] : null;
  const vnode = newVNode(tagName, null);
  vnode.$elm$ = hostElm;
  let scopeId2;
  if (import_app_data9.BUILD.scoped) {
    const cmpMeta = hostRef.$cmpMeta$;
    if (cmpMeta && cmpMeta.$flags$ & 10 /* needsScopedEncapsulation */ && hostElm["s-sc"]) {
      scopeId2 = hostElm["s-sc"];
      hostElm.classList.add(scopeId2 + "-h");
    } else if (hostElm["s-sc"]) {
      delete hostElm["s-sc"];
    }
  }
  if (win.document && (!plt.$orgLocNodes$ || !plt.$orgLocNodes$.size)) {
    initializeDocumentHydrate(win.document.body, plt.$orgLocNodes$ = /* @__PURE__ */ new Map());
  }
  hostElm[HYDRATE_ID] = hostId;
  hostElm.removeAttribute(HYDRATE_ID);
  hostRef.$vnode$ = clientHydrate(
    vnode,
    childRenderNodes,
    slotNodes,
    shadowRootNodes,
    hostElm,
    hostElm,
    hostId,
    slottedNodes
  );
  let crIndex = 0;
  const crLength = childRenderNodes.length;
  let childRenderNode;
  for (crIndex; crIndex < crLength; crIndex++) {
    childRenderNode = childRenderNodes[crIndex];
    const orgLocationId = childRenderNode.$hostId$ + "." + childRenderNode.$nodeId$;
    const orgLocationNode = plt.$orgLocNodes$.get(orgLocationId);
    const node = childRenderNode.$elm$;
    if (!shadowRoot) {
      node["s-hn"] = transformTag(tagName).toUpperCase();
      if (childRenderNode.$tag$ === "slot") {
        node["s-cr"] = hostElm["s-cr"];
      }
    } else if (((_a2 = childRenderNode.$tag$) == null ? void 0 : _a2.toString().includes("-")) && childRenderNode.$tag$ !== "slot-fb" && !childRenderNode.$elm$.shadowRoot) {
      const cmpMeta = getHostRef(childRenderNode.$elm$);
      if (cmpMeta) {
        const scopeId3 = getScopeId(
          cmpMeta.$cmpMeta$,
          import_app_data9.BUILD.mode ? childRenderNode.$elm$.getAttribute("s-mode") : void 0
        );
        const styleSheet = win.document.querySelector(`style[sty-id="${scopeId3}"]`);
        if (styleSheet) {
          shadowRootNodes.unshift(styleSheet.cloneNode(true));
        }
      }
    }
    if (childRenderNode.$tag$ === "slot") {
      childRenderNode.$name$ = childRenderNode.$elm$["s-sn"] || childRenderNode.$elm$["name"] || null;
      if (childRenderNode.$children$) {
        childRenderNode.$flags$ |= 2 /* isSlotFallback */;
        if (!childRenderNode.$elm$.childNodes.length) {
          childRenderNode.$children$.forEach((c) => {
            childRenderNode.$elm$.appendChild(c.$elm$);
          });
        }
      } else {
        childRenderNode.$flags$ |= 1 /* isSlotReference */;
      }
    }
    if (orgLocationNode && orgLocationNode.isConnected) {
      if (orgLocationNode.parentElement.shadowRoot && orgLocationNode["s-en"] === "") {
        orgLocationNode.parentNode.insertBefore(node, orgLocationNode.nextSibling);
      }
      orgLocationNode.parentNode.removeChild(orgLocationNode);
      if (!shadowRoot) {
        node["s-oo"] = parseInt(childRenderNode.$nodeId$);
      }
    }
    if (orgLocationNode && !orgLocationNode["s-id"]) {
      plt.$orgLocNodes$.delete(orgLocationId);
    }
  }
  const hosts = [];
  const snLen = slottedNodes.length;
  let snIndex = 0;
  let slotGroup;
  let snGroupIdx;
  let snGroupLen;
  let slottedItem;
  let currentPos = 0;
  for (snIndex; snIndex < snLen; snIndex++) {
    slotGroup = slottedNodes[snIndex];
    if (!slotGroup || !slotGroup.length) continue;
    snGroupLen = slotGroup.length;
    snGroupIdx = 0;
    for (snGroupIdx; snGroupIdx < snGroupLen; snGroupIdx++) {
      slottedItem = slotGroup[snGroupIdx];
      if (!hosts[slottedItem.hostId]) {
        hosts[slottedItem.hostId] = plt.$orgLocNodes$.get(slottedItem.hostId);
      }
      if (!hosts[slottedItem.hostId]) continue;
      const hostEle = hosts[slottedItem.hostId];
      if (hostEle.shadowRoot && slottedItem.node.parentElement !== hostEle) {
        hostEle.insertBefore(slottedItem.node, (_c = (_b = slotGroup[snGroupIdx - 1]) == null ? void 0 : _b.node) == null ? void 0 : _c.nextSibling);
      }
      if (!hostEle.shadowRoot || !shadowRoot) {
        if (!slottedItem.slot["s-cr"]) {
          slottedItem.slot["s-cr"] = hostEle["s-cr"];
          if (!slottedItem.slot["s-cr"] && hostEle.shadowRoot) {
            slottedItem.slot["s-cr"] = hostEle;
          } else {
            slottedItem.slot["s-cr"] = (hostEle.__childNodes || hostEle.childNodes)[0];
          }
        }
        addSlotRelocateNode(slottedItem.node, slottedItem.slot, false, slottedItem.node["s-oo"] || currentPos);
        if (((_d = slottedItem.node.parentElement) == null ? void 0 : _d.shadowRoot) && slottedItem.node["getAttribute"] && slottedItem.node.getAttribute("slot")) {
          slottedItem.node.removeAttribute("slot");
        }
        if (import_app_data9.BUILD.experimentalSlotFixes) {
          patchSlottedNode(slottedItem.node);
        }
      }
      currentPos = (slottedItem.node["s-oo"] || currentPos) + 1;
    }
  }
  if (import_app_data9.BUILD.scoped && scopeId2 && slotNodes.length) {
    slotNodes.forEach((slot) => {
      slot.$elm$.parentElement.classList.add(scopeId2 + "-s");
    });
  }
  if (import_app_data9.BUILD.shadowDom && shadowRoot && !shadowRoot.childNodes.length) {
    let rnIdex = 0;
    const rnLen = shadowRootNodes.length;
    if (rnLen) {
      for (rnIdex; rnIdex < rnLen; rnIdex++) {
        const node = shadowRootNodes[rnIdex];
        if (node) {
          shadowRoot.appendChild(node);
        }
      }
      Array.from(hostElm.childNodes).forEach((node) => {
        if (typeof node["s-en"] !== "string" && typeof node["s-sn"] !== "string") {
          if (node.nodeType === 1 /* ElementNode */ && node.slot && node.hidden) {
            node.removeAttribute("hidden");
          } else if (node.nodeType === 8 /* CommentNode */ && !node.nodeValue) {
            node.parentNode.removeChild(node);
          }
        }
      });
    }
  }
  hostRef.$hostElement$ = hostElm;
  endHydrate();
};
var clientHydrate = (parentVNode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, node, hostId, slottedNodes = []) => {
  let childNodeType;
  let childIdSplt;
  let childVNode;
  let i2;
  const scopeId2 = hostElm["s-sc"];
  if (node.nodeType === 1 /* ElementNode */) {
    childNodeType = node.getAttribute(HYDRATE_CHILD_ID);
    if (childNodeType) {
      childIdSplt = childNodeType.split(".");
      if (childIdSplt[0] === hostId || childIdSplt[0] === "0") {
        childVNode = createSimpleVNode({
          $flags$: 0,
          $hostId$: childIdSplt[0],
          $nodeId$: childIdSplt[1],
          $depth$: childIdSplt[2],
          $index$: childIdSplt[3],
          $tag$: node.tagName.toLowerCase(),
          $elm$: node,
          // If we don't add the initial classes to the VNode, the first `vdom-render.ts` patch
          // won't try to reconcile them. Classes set on the node will be blown away.
          $attrs$: { class: node.className || "" }
        });
        childRenderNodes.push(childVNode);
        node.removeAttribute(HYDRATE_CHILD_ID);
        if (!parentVNode.$children$) {
          parentVNode.$children$ = [];
        }
        if (import_app_data9.BUILD.scoped && scopeId2 && childIdSplt[0] === hostId) {
          node["s-si"] = scopeId2;
          childVNode.$attrs$.class += " " + scopeId2;
        }
        const slotName = childVNode.$elm$.getAttribute("s-sn");
        if (typeof slotName === "string") {
          if (childVNode.$tag$ === "slot-fb") {
            addSlot(
              slotName,
              childIdSplt[2],
              childVNode,
              node,
              parentVNode,
              childRenderNodes,
              slotNodes,
              shadowRootNodes,
              slottedNodes
            );
            if (import_app_data9.BUILD.scoped && scopeId2) {
              node.classList.add(scopeId2);
            }
          }
          childVNode.$elm$["s-sn"] = slotName;
          childVNode.$elm$.removeAttribute("s-sn");
        }
        if (childVNode.$index$ !== void 0) {
          parentVNode.$children$[childVNode.$index$] = childVNode;
        }
        parentVNode = childVNode;
        if (shadowRootNodes && childVNode.$depth$ === "0") {
          shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
        }
      }
    }
    if (node.shadowRoot) {
      for (i2 = node.shadowRoot.childNodes.length - 1; i2 >= 0; i2--) {
        clientHydrate(
          parentVNode,
          childRenderNodes,
          slotNodes,
          shadowRootNodes,
          hostElm,
          node.shadowRoot.childNodes[i2],
          hostId,
          slottedNodes
        );
      }
    }
    const nonShadowNodes = node.__childNodes || node.childNodes;
    for (i2 = nonShadowNodes.length - 1; i2 >= 0; i2--) {
      clientHydrate(
        parentVNode,
        childRenderNodes,
        slotNodes,
        shadowRootNodes,
        hostElm,
        nonShadowNodes[i2],
        hostId,
        slottedNodes
      );
    }
  } else if (node.nodeType === 8 /* CommentNode */) {
    childIdSplt = node.nodeValue.split(".");
    if (childIdSplt[1] === hostId || childIdSplt[1] === "0") {
      childNodeType = childIdSplt[0];
      childVNode = createSimpleVNode({
        $hostId$: childIdSplt[1],
        $nodeId$: childIdSplt[2],
        $depth$: childIdSplt[3],
        $index$: childIdSplt[4] || "0",
        $elm$: node,
        $attrs$: null,
        $children$: null,
        $key$: null,
        $name$: null,
        $tag$: null,
        $text$: null
      });
      if (childNodeType === TEXT_NODE_ID) {
        childVNode.$elm$ = findCorrespondingNode(node, 3 /* TextNode */);
        if (childVNode.$elm$ && childVNode.$elm$.nodeType === 3 /* TextNode */) {
          childVNode.$text$ = childVNode.$elm$.textContent;
          childRenderNodes.push(childVNode);
          node.remove();
          if (hostId === childVNode.$hostId$) {
            if (!parentVNode.$children$) {
              parentVNode.$children$ = [];
            }
            parentVNode.$children$[childVNode.$index$] = childVNode;
          }
          if (shadowRootNodes && childVNode.$depth$ === "0") {
            shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
          }
        }
      } else if (childNodeType === COMMENT_NODE_ID) {
        childVNode.$elm$ = findCorrespondingNode(node, 8 /* CommentNode */);
        if (childVNode.$elm$ && childVNode.$elm$.nodeType === 8 /* CommentNode */) {
          childRenderNodes.push(childVNode);
          node.remove();
        }
      } else if (childVNode.$hostId$ === hostId) {
        if (childNodeType === SLOT_NODE_ID) {
          const slotName = node["s-sn"] = childIdSplt[5] || "";
          addSlot(
            slotName,
            childIdSplt[2],
            childVNode,
            node,
            parentVNode,
            childRenderNodes,
            slotNodes,
            shadowRootNodes,
            slottedNodes
          );
        } else if (childNodeType === CONTENT_REF_ID) {
          if (import_app_data9.BUILD.shadowDom && shadowRootNodes) {
            node.remove();
          } else if (import_app_data9.BUILD.slotRelocation) {
            hostElm["s-cr"] = node;
            node["s-cn"] = true;
          }
        }
      }
    }
  } else if (parentVNode && parentVNode.$tag$ === "style") {
    const vnode = newVNode(null, node.textContent);
    vnode.$elm$ = node;
    vnode.$index$ = "0";
    parentVNode.$children$ = [vnode];
  }
  return parentVNode;
};
var initializeDocumentHydrate = (node, orgLocNodes) => {
  if (node.nodeType === 1 /* ElementNode */) {
    const componentId = node[HYDRATE_ID] || node.getAttribute(HYDRATE_ID);
    if (componentId) {
      orgLocNodes.set(componentId, node);
    }
    let i2 = 0;
    if (node.shadowRoot) {
      for (; i2 < node.shadowRoot.childNodes.length; i2++) {
        initializeDocumentHydrate(node.shadowRoot.childNodes[i2], orgLocNodes);
      }
    }
    const nonShadowNodes = node.__childNodes || node.childNodes;
    for (i2 = 0; i2 < nonShadowNodes.length; i2++) {
      initializeDocumentHydrate(nonShadowNodes[i2], orgLocNodes);
    }
  } else if (node.nodeType === 8 /* CommentNode */) {
    const childIdSplt = node.nodeValue.split(".");
    if (childIdSplt[0] === ORG_LOCATION_ID) {
      orgLocNodes.set(childIdSplt[1] + "." + childIdSplt[2], node);
      node.nodeValue = "";
      node["s-en"] = childIdSplt[3];
    }
  }
};
var createSimpleVNode = (vnode) => {
  const defaultVNode = {
    $flags$: 0,
    $hostId$: null,
    $nodeId$: null,
    $depth$: null,
    $index$: "0",
    $elm$: null,
    $attrs$: null,
    $children$: null,
    $key$: null,
    $name$: null,
    $tag$: null,
    $text$: null
  };
  return { ...defaultVNode, ...vnode };
};
function addSlot(slotName, slotId, childVNode, node, parentVNode, childRenderNodes, slotNodes, shadowRootNodes, slottedNodes) {
  node["s-sr"] = true;
  childVNode.$name$ = slotName || null;
  childVNode.$tag$ = "slot";
  const parentNodeId = (parentVNode == null ? void 0 : parentVNode.$elm$) ? parentVNode.$elm$["s-id"] || parentVNode.$elm$.getAttribute("s-id") : "";
  if (import_app_data9.BUILD.shadowDom && shadowRootNodes && win.document) {
    const slot = childVNode.$elm$ = win.document.createElement(childVNode.$tag$);
    if (childVNode.$name$) {
      childVNode.$elm$.setAttribute("name", slotName);
    }
    if (parentVNode.$elm$.shadowRoot && parentNodeId && parentNodeId !== childVNode.$hostId$) {
      internalCall(parentVNode.$elm$, "insertBefore")(slot, internalCall(parentVNode.$elm$, "children")[0]);
    } else {
      internalCall(internalCall(node, "parentNode"), "insertBefore")(slot, node);
    }
    addSlottedNodes(slottedNodes, slotId, slotName, node, childVNode.$hostId$);
    node.remove();
    if (childVNode.$depth$ === "0") {
      shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
    }
  } else {
    const slot = childVNode.$elm$;
    const shouldMove = parentNodeId && parentNodeId !== childVNode.$hostId$ && parentVNode.$elm$.shadowRoot;
    addSlottedNodes(slottedNodes, slotId, slotName, node, shouldMove ? parentNodeId : childVNode.$hostId$);
    patchSlotNode(node);
    if (shouldMove) {
      parentVNode.$elm$.insertBefore(slot, parentVNode.$elm$.children[0]);
    }
  }
  childRenderNodes.push(childVNode);
  slotNodes.push(childVNode);
  if (!parentVNode.$children$) {
    parentVNode.$children$ = [];
  }
  parentVNode.$children$[childVNode.$index$] = childVNode;
}
var addSlottedNodes = (slottedNodes, slotNodeId, slotName, slotNode, hostId) => {
  var _a2, _b;
  let slottedNode = slotNode.nextSibling;
  slottedNodes[slotNodeId] = slottedNodes[slotNodeId] || [];
  if (!slottedNode || ((_a2 = slottedNode.nodeValue) == null ? void 0 : _a2.startsWith(SLOT_NODE_ID + "."))) return;
  do {
    if (slottedNode && ((slottedNode["getAttribute"] && slottedNode.getAttribute("slot") || slottedNode["s-sn"]) === slotName || slotName === "" && !slottedNode["s-sn"] && (!slottedNode["getAttribute"] || !slottedNode.getAttribute("slot")) && (slottedNode.nodeType === 8 /* CommentNode */ || slottedNode.nodeType === 3 /* TextNode */))) {
      slottedNode["s-sn"] = slotName;
      slottedNodes[slotNodeId].push({ slot: slotNode, node: slottedNode, hostId });
    }
    slottedNode = slottedNode == null ? void 0 : slottedNode.nextSibling;
  } while (slottedNode && !((_b = slottedNode.nodeValue) == null ? void 0 : _b.startsWith(SLOT_NODE_ID + ".")));
};
var findCorrespondingNode = (node, type) => {
  let sibling = node;
  do {
    sibling = sibling.nextSibling;
  } while (sibling && (sibling.nodeType !== type || !sibling.nodeValue));
  return sibling;
};

// src/runtime/initialize-component.ts
var import_app_data17 = require("@stencil/core/internal/app-data");

// src/utils/shadow-css.ts
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * This file is a port of shadowCSS from `webcomponents.js` to TypeScript.
 * https://github.com/webcomponents/webcomponentsjs/blob/4efecd7e0e/src/ShadowCSS/ShadowCSS.js
 * https://github.com/angular/angular/blob/master/packages/compiler/src/shadow_css.ts
 */
var safeSelector = (selector) => {
  const placeholders = [];
  let index = 0;
  selector = selector.replace(/(\[\s*part~=\s*("[^"]*"|'[^']*')\s*\])/g, (_, keep) => {
    const replaceBy = `__part-${index}__`;
    placeholders.push(keep);
    index++;
    return replaceBy;
  });
  selector = selector.replace(/(\[[^\]]*\])/g, (_, keep) => {
    const replaceBy = `__ph-${index}__`;
    placeholders.push(keep);
    index++;
    return replaceBy;
  });
  const content = selector.replace(/(:nth-[-\w]+)(\([^)]+\))/g, (_, pseudo, exp) => {
    const replaceBy = `__ph-${index}__`;
    placeholders.push(exp);
    index++;
    return pseudo + replaceBy;
  });
  const ss = {
    content,
    placeholders
  };
  return ss;
};
var restoreSafeSelector = (placeholders, content) => {
  content = content.replace(/__part-(\d+)__/g, (_, index) => placeholders[+index]);
  return content.replace(/__ph-(\d+)__/g, (_, index) => placeholders[+index]);
};
var _polyfillHost = "-shadowcsshost";
var _polyfillSlotted = "-shadowcssslotted";
var _polyfillHostContext = "-shadowcsscontext";
var _parenSuffix = ")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)";
var _cssColonHostRe = new RegExp("(" + _polyfillHost + _parenSuffix, "gim");
var _cssColonHostContextRe = new RegExp("(" + _polyfillHostContext + _parenSuffix, "gim");
var _cssColonSlottedRe = new RegExp("(" + _polyfillSlotted + _parenSuffix, "gim");
var _polyfillHostNoCombinator = _polyfillHost + "-no-combinator";
var _polyfillHostNoCombinatorRe = /-shadowcsshost-no-combinator([^\s]*)/;
var _shadowDOMSelectorsRe = [/::shadow/g, /::content/g];
var _safePartRe = /__part-(\d+)__/g;
var _selectorReSuffix = "([>\\s~+[.,{:][\\s\\S]*)?$";
var _polyfillHostRe = /-shadowcsshost/gim;
var createSupportsRuleRe = (selector) => {
  const safeSelector2 = escapeRegExpSpecialCharacters(selector);
  return new RegExp(
    // First capture group: match any context before the selector that's not inside @supports selector()
    // Using negative lookahead to avoid matching inside @supports selector(...) condition
    `(^|[^@]|@(?!supports\\s+selector\\s*\\([^{]*?${safeSelector2}))(${safeSelector2}\\b)`,
    "g"
  );
};
var _commentRe = /\/\*\s*[\s\S]*?\*\//g;
var stripComments = (input) => {
  return input.replace(_commentRe, "");
};
var _commentWithHashRe = /\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g;
var extractCommentsWithHash = (input) => {
  return input.match(_commentWithHashRe) || [];
};
var _ruleRe = /(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g;
var _curlyRe = /([{}])/g;
var _selectorPartsRe = /(^.*?[^\\])??((:+)(.*)|$)/;
var OPEN_CURLY = "{";
var CLOSE_CURLY = "}";
var BLOCK_PLACEHOLDER = "%BLOCK%";
var processRules = (input, ruleCallback) => {
  const inputWithEscapedBlocks = escapeBlocks(input);
  let nextBlockIndex = 0;
  return inputWithEscapedBlocks.escapedString.replace(_ruleRe, (...m) => {
    const selector = m[2];
    let content = "";
    let suffix = m[4];
    let contentPrefix = "";
    if (suffix && suffix.startsWith("{" + BLOCK_PLACEHOLDER)) {
      content = inputWithEscapedBlocks.blocks[nextBlockIndex++];
      suffix = suffix.substring(BLOCK_PLACEHOLDER.length + 1);
      contentPrefix = "{";
    }
    const cssRule = {
      selector,
      content
    };
    const rule = ruleCallback(cssRule);
    return `${m[1]}${rule.selector}${m[3]}${contentPrefix}${rule.content}${suffix}`;
  });
};
var escapeBlocks = (input) => {
  const inputParts = input.split(_curlyRe);
  const resultParts = [];
  const escapedBlocks = [];
  let bracketCount = 0;
  let currentBlockParts = [];
  for (let partIndex = 0; partIndex < inputParts.length; partIndex++) {
    const part = inputParts[partIndex];
    if (part === CLOSE_CURLY) {
      bracketCount--;
    }
    if (bracketCount > 0) {
      currentBlockParts.push(part);
    } else {
      if (currentBlockParts.length > 0) {
        escapedBlocks.push(currentBlockParts.join(""));
        resultParts.push(BLOCK_PLACEHOLDER);
        currentBlockParts = [];
      }
      resultParts.push(part);
    }
    if (part === OPEN_CURLY) {
      bracketCount++;
    }
  }
  if (currentBlockParts.length > 0) {
    escapedBlocks.push(currentBlockParts.join(""));
    resultParts.push(BLOCK_PLACEHOLDER);
  }
  const strEscapedBlocks = {
    escapedString: resultParts.join(""),
    blocks: escapedBlocks
  };
  return strEscapedBlocks;
};
var insertPolyfillHostInCssText = (cssText) => {
  const supportsBlocks = [];
  cssText = cssText.replace(/@supports\s+selector\s*\(\s*([^)]*)\s*\)/g, (_, selectorContent) => {
    const placeholder = `__supports_${supportsBlocks.length}__`;
    supportsBlocks.push(selectorContent);
    return `@supports selector(${placeholder})`;
  });
  const _colonSlottedRe = createSupportsRuleRe("::slotted");
  const _colonHostRe = createSupportsRuleRe(":host");
  const _colonHostContextRe = createSupportsRuleRe(":host-context");
  cssText = cssText.replace(_colonHostContextRe, `$1${_polyfillHostContext}`).replace(_colonHostRe, `$1${_polyfillHost}`).replace(_colonSlottedRe, `$1${_polyfillSlotted}`);
  supportsBlocks.forEach((originalSelector, index) => {
    cssText = cssText.replace(`__supports_${index}__`, originalSelector);
  });
  return cssText;
};
var convertColonRule = (cssText, regExp, partReplacer) => {
  return cssText.replace(regExp, (...m) => {
    if (m[2]) {
      const parts = m[2].split(",");
      const r = [];
      for (let i2 = 0; i2 < parts.length; i2++) {
        const p = parts[i2].trim();
        if (!p) break;
        r.push(partReplacer(_polyfillHostNoCombinator, p, m[3]));
      }
      return r.join(",");
    } else {
      return _polyfillHostNoCombinator + m[3];
    }
  });
};
var colonHostPartReplacer = (host, part, suffix) => {
  return host + part.replace(_polyfillHost, "") + suffix;
};
var convertColonHost = (cssText) => {
  return convertColonRule(cssText, _cssColonHostRe, colonHostPartReplacer);
};
var colonHostContextPartReplacer = (host, part, suffix) => {
  if (part.indexOf(_polyfillHost) > -1) {
    return colonHostPartReplacer(host, part, suffix);
  } else {
    return host + part + suffix + ", " + part + " " + host + suffix;
  }
};
var convertColonSlotted = (cssText, slotScopeId) => {
  const slotClass = "." + slotScopeId + " > ";
  const selectors = [];
  cssText = cssText.replace(_cssColonSlottedRe, (...m) => {
    if (m[2]) {
      const compound = m[2].trim();
      const suffix = m[3];
      const slottedSelector = slotClass + compound + suffix;
      let prefixSelector = "";
      for (let i2 = m[4] - 1; i2 >= 0; i2--) {
        const char = m[5][i2];
        if (char === "}" || char === ",") {
          break;
        }
        prefixSelector = char + prefixSelector;
      }
      const orgSelector = (prefixSelector + slottedSelector).trim();
      const addedSelector = `${prefixSelector.trimEnd()}${slottedSelector.trim()}`.trim();
      if (orgSelector !== addedSelector) {
        const updatedSelector = `${addedSelector}, ${orgSelector}`;
        selectors.push({
          orgSelector,
          updatedSelector
        });
      }
      return slottedSelector;
    } else {
      return _polyfillHostNoCombinator + m[3];
    }
  });
  return {
    selectors,
    cssText
  };
};
var convertColonHostContext = (cssText) => {
  return convertColonRule(cssText, _cssColonHostContextRe, colonHostContextPartReplacer);
};
var convertShadowDOMSelectors = (cssText) => {
  return _shadowDOMSelectorsRe.reduce((result, pattern) => result.replace(pattern, " "), cssText);
};
var makeScopeMatcher = (scopeSelector2) => {
  const lre = /\[/g;
  const rre = /\]/g;
  scopeSelector2 = scopeSelector2.replace(lre, "\\[").replace(rre, "\\]");
  return new RegExp("^(" + scopeSelector2 + ")" + _selectorReSuffix, "m");
};
var selectorNeedsScoping = (selector, scopeSelector2) => {
  const re = makeScopeMatcher(scopeSelector2);
  return !re.test(selector);
};
var injectScopingSelector = (selector, scopingSelector) => {
  return selector.replace(_selectorPartsRe, (_, before = "", _colonGroup, colon = "", after = "") => {
    return before + scopingSelector + colon + after;
  });
};
var applySimpleSelectorScope = (selector, scopeSelector2, hostSelector) => {
  _polyfillHostRe.lastIndex = 0;
  if (_polyfillHostRe.test(selector)) {
    const replaceBy = `.${hostSelector}`;
    return selector.replace(_polyfillHostNoCombinatorRe, (_, selector2) => injectScopingSelector(selector2, replaceBy)).replace(_polyfillHostRe, replaceBy + " ");
  }
  return scopeSelector2 + " " + selector;
};
var applyStrictSelectorScope = (selector, scopeSelector2, hostSelector) => {
  const isRe = /\[is=([^\]]*)\]/g;
  scopeSelector2 = scopeSelector2.replace(isRe, (_, ...parts) => parts[0]);
  const className = "." + scopeSelector2;
  const _scopeSelectorPart = (p) => {
    let scopedP = p.trim();
    if (!scopedP) {
      return "";
    }
    if (p.indexOf(_polyfillHostNoCombinator) > -1) {
      scopedP = applySimpleSelectorScope(p, scopeSelector2, hostSelector);
    } else {
      const t = p.replace(_polyfillHostRe, "");
      if (t.length > 0) {
        scopedP = injectScopingSelector(t, className);
      }
    }
    return scopedP;
  };
  const safeContent = safeSelector(selector);
  selector = safeContent.content;
  let scopedSelector = "";
  let startIndex = 0;
  let res;
  const sep2 = /( |>|\+|~(?!=))(?=(?:[^()]*\([^()]*\))*[^()]*$)\s*/g;
  const hasHost = selector.indexOf(_polyfillHostNoCombinator) > -1;
  let shouldScope = !hasHost;
  while ((res = sep2.exec(selector)) !== null) {
    const separator = res[1];
    const part2 = selector.slice(startIndex, res.index).trim();
    shouldScope = shouldScope || part2.indexOf(_polyfillHostNoCombinator) > -1;
    const scopedPart = shouldScope ? _scopeSelectorPart(part2) : part2;
    scopedSelector += `${scopedPart} ${separator} `;
    startIndex = sep2.lastIndex;
  }
  const part = selector.substring(startIndex);
  shouldScope = !part.match(_safePartRe) && (shouldScope || part.indexOf(_polyfillHostNoCombinator) > -1);
  scopedSelector += shouldScope ? _scopeSelectorPart(part) : part;
  return restoreSafeSelector(safeContent.placeholders, scopedSelector);
};
var scopeSelector = (selector, scopeSelectorText, hostSelector, slotSelector) => {
  return selector.split(",").map((shallowPart) => {
    if (slotSelector && shallowPart.indexOf("." + slotSelector) > -1) {
      return shallowPart.trim();
    }
    if (selectorNeedsScoping(shallowPart, scopeSelectorText)) {
      return applyStrictSelectorScope(shallowPart, scopeSelectorText, hostSelector).trim();
    } else {
      return shallowPart.trim();
    }
  }).join(", ");
};
var scopeSelectors = (cssText, scopeSelectorText, hostSelector, slotSelector, commentOriginalSelector) => {
  return processRules(cssText, (rule) => {
    let selector = rule.selector;
    let content = rule.content;
    if (rule.selector[0] !== "@") {
      selector = scopeSelector(rule.selector, scopeSelectorText, hostSelector, slotSelector);
    } else if (rule.selector.startsWith("@media") || rule.selector.startsWith("@supports") || rule.selector.startsWith("@page") || rule.selector.startsWith("@document")) {
      content = scopeSelectors(rule.content, scopeSelectorText, hostSelector, slotSelector, commentOriginalSelector);
    }
    const cssRule = {
      selector: selector.replace(/\s{2,}/g, " ").trim(),
      content
    };
    return cssRule;
  });
};
var scopeCssText = (cssText, scopeId2, hostScopeId, slotScopeId, commentOriginalSelector) => {
  cssText = insertPolyfillHostInCssText(cssText);
  cssText = convertColonHost(cssText);
  cssText = convertColonHostContext(cssText);
  const slotted = convertColonSlotted(cssText, slotScopeId);
  cssText = slotted.cssText;
  cssText = convertShadowDOMSelectors(cssText);
  if (scopeId2) {
    cssText = scopeSelectors(cssText, scopeId2, hostScopeId, slotScopeId, commentOriginalSelector);
  }
  cssText = replaceShadowCssHost(cssText, hostScopeId);
  cssText = cssText.replace(/>\s*\*\s+([^{, ]+)/gm, " $1 ");
  return {
    cssText: cssText.trim(),
    // We need to replace the shadow CSS host string in each of these selectors since we created
    // them prior to the replacement happening in the components CSS text.
    slottedSelectors: slotted.selectors.map((ref) => ({
      orgSelector: replaceShadowCssHost(ref.orgSelector, hostScopeId),
      updatedSelector: replaceShadowCssHost(ref.updatedSelector, hostScopeId)
    }))
  };
};
var replaceShadowCssHost = (cssText, hostScopeId) => {
  return cssText.replace(/-shadowcsshost-no-combinator/g, `.${hostScopeId}`);
};
var expandPartSelectors = (cssText) => {
  const partSelectorRe = /([^\s,{][^,{]*?)::part\(\s*([^)]+?)\s*\)((?:[:.][^,{]*)*)/g;
  return processRules(cssText, (rule) => {
    if (rule.selector[0] === "@") {
      return rule;
    }
    const selectors = rule.selector.split(",").map((sel) => {
      const out = [sel.trim()];
      let m;
      while ((m = partSelectorRe.exec(sel)) !== null) {
        const before = m[1].trimEnd();
        const partNames = m[2].trim().split(/\s+/);
        const after = m[3] || "";
        const partAttr = partNames.flatMap((p) => {
          if (!rule.selector.includes(`[part~="${p}"]`)) {
            return [`[part~="${p}"]`];
          }
          return [];
        }).join("");
        const expanded = `${before} ${partAttr}${after}`;
        if (!!partAttr && expanded !== sel.trim()) {
          out.push(expanded);
        }
      }
      return out.join(", ");
    });
    rule.selector = selectors.join(", ");
    return rule;
  });
};
var scopeCss = (cssText, scopeId2, commentOriginalSelector) => {
  const hostScopeId = scopeId2 + "-h";
  const slotScopeId = scopeId2 + "-s";
  const commentsWithHash = extractCommentsWithHash(cssText);
  cssText = stripComments(cssText);
  const orgSelectors = [];
  if (commentOriginalSelector) {
    const processCommentedSelector = (rule) => {
      const placeholder = `/*!@___${orgSelectors.length}___*/`;
      const comment = `/*!@${rule.selector}*/`;
      orgSelectors.push({ placeholder, comment });
      rule.selector = placeholder + rule.selector;
      return rule;
    };
    cssText = processRules(cssText, (rule) => {
      if (rule.selector[0] !== "@") {
        return processCommentedSelector(rule);
      } else if (rule.selector.startsWith("@media") || rule.selector.startsWith("@supports") || rule.selector.startsWith("@page") || rule.selector.startsWith("@document")) {
        rule.content = processRules(rule.content, processCommentedSelector);
        return rule;
      }
      return rule;
    });
  }
  const scoped = scopeCssText(cssText, scopeId2, hostScopeId, slotScopeId, commentOriginalSelector);
  cssText = [scoped.cssText, ...commentsWithHash].join("\n");
  if (commentOriginalSelector) {
    orgSelectors.forEach(({ placeholder, comment }) => {
      cssText = cssText.replace(placeholder, comment);
    });
  }
  scoped.slottedSelectors.forEach((slottedSelector) => {
    const regex = new RegExp(escapeRegExpSpecialCharacters(slottedSelector.orgSelector) + "(?=\\s*[,{]|$)", "g");
    cssText = cssText.replace(regex, slottedSelector.updatedSelector);
  });
  cssText = expandPartSelectors(cssText);
  return cssText;
};

// src/runtime/mode.ts
var computeMode = (elm) => modeResolutionChain.map((h2) => h2(elm)).find((m) => !!m);
var setMode = (handler) => modeResolutionChain.push(handler);
var getMode = (ref) => {
  var _a2;
  return (_a2 = getHostRef(ref)) == null ? void 0 : _a2.$modeName$;
};

// src/runtime/normalize-watchers.ts
var normalizeWatchers = (raw) => {
  if (!raw) return void 0;
  const keys = Object.keys(raw);
  if (keys.length === 0) return void 0;
  let hasLegacy = false;
  for (const propName of keys) {
    if (hasLegacy) break;
    for (const h2 of raw[propName]) {
      if (typeof h2 === "string") {
        hasLegacy = true;
        break;
      }
    }
  }
  if (!hasLegacy) return raw;
  const out = {};
  for (const propName of keys) {
    out[propName] = raw[propName].map(
      (h2) => typeof h2 === "string" ? { [h2]: 0 } : h2
    );
  }
  return out;
};

// src/runtime/proxy-component.ts
var import_app_data16 = require("@stencil/core/internal/app-data");

// src/utils/get-prop-descriptor.ts
function getPropertyDescriptor(obj, memberName, getOnly) {
  const stopAt = typeof HTMLElement !== "undefined" ? HTMLElement.prototype : null;
  while (obj && obj !== stopAt) {
    const desc = Object.getOwnPropertyDescriptor(obj, memberName);
    if (desc && (!getOnly || desc.get)) return desc;
    obj = Object.getPrototypeOf(obj);
  }
  return void 0;
}

// src/runtime/set-value.ts
var import_app_data15 = require("@stencil/core/internal/app-data");

// src/runtime/parse-property-value.ts
var import_app_data10 = require("@stencil/core/internal/app-data");
var parsePropertyValue = (propValue, propType, isFormAssociated) => {
  if ((import_app_data10.BUILD.hydrateClientSide || import_app_data10.BUILD.hydrateServerSide) && typeof propValue === "string" && propValue.startsWith(SERIALIZED_PREFIX)) {
    propValue = deserializeProperty(propValue);
    return propValue;
  }
  if (propValue != null && !isComplexType(propValue)) {
    if (import_app_data10.BUILD.propBoolean && propType & 4 /* Boolean */) {
      if (import_app_data10.BUILD.formAssociated && isFormAssociated && typeof propValue === "string") {
        return propValue === "" || !!propValue;
      } else {
        return propValue === "false" ? false : propValue === "" || !!propValue;
      }
    }
    if (import_app_data10.BUILD.propNumber && propType & 2 /* Number */) {
      return typeof propValue === "string" ? parseFloat(propValue) : typeof propValue === "number" ? propValue : NaN;
    }
    if (import_app_data10.BUILD.propString && propType & 1 /* String */) {
      return String(propValue);
    }
    return propValue;
  }
  return propValue;
};

// src/runtime/update-component.ts
var import_app_data14 = require("@stencil/core/internal/app-data");

// src/runtime/vdom/vdom-render.ts
var import_app_data13 = require("@stencil/core/internal/app-data");

// src/runtime/vdom/update-element.ts
var import_app_data12 = require("@stencil/core/internal/app-data");

// src/runtime/vdom/set-accessor.ts
var import_app_data11 = require("@stencil/core/internal/app-data");
var setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags, initialRender) => {
  if (oldValue === newValue) {
    return;
  }
  let isProp = isMemberInElement(elm, memberName);
  let ln = memberName.toLowerCase();
  if (import_app_data11.BUILD.vdomClass && memberName === "class") {
    const classList = elm.classList;
    const oldClasses = parseClassList(oldValue);
    let newClasses = parseClassList(newValue);
    if (import_app_data11.BUILD.hydrateClientSide && (elm["s-si"] || elm["s-sc"]) && initialRender) {
      const scopeId2 = elm["s-sc"] || elm["s-si"];
      newClasses.push(scopeId2);
      oldClasses.forEach((c) => {
        if (c.startsWith(scopeId2)) newClasses.push(c);
      });
      newClasses = [...new Set(newClasses)].filter((c) => c);
      classList.add(...newClasses);
    } else {
      classList.remove(...oldClasses.filter((c) => c && !newClasses.includes(c)));
      classList.add(...newClasses.filter((c) => c && !oldClasses.includes(c)));
    }
  } else if (import_app_data11.BUILD.vdomStyle && memberName === "style") {
    if (import_app_data11.BUILD.updatable) {
      for (const prop in oldValue) {
        if (!newValue || newValue[prop] == null) {
          if (!import_app_data11.BUILD.hydrateServerSide && prop.includes("-")) {
            elm.style.removeProperty(prop);
          } else {
            elm.style[prop] = "";
          }
        }
      }
    }
    for (const prop in newValue) {
      if (!oldValue || newValue[prop] !== oldValue[prop]) {
        if (!import_app_data11.BUILD.hydrateServerSide && prop.includes("-")) {
          elm.style.setProperty(prop, newValue[prop]);
        } else {
          elm.style[prop] = newValue[prop];
        }
      }
    }
  } else if (import_app_data11.BUILD.vdomKey && memberName === "key") {
  } else if (import_app_data11.BUILD.vdomRef && memberName === "ref") {
    if (newValue) {
      queueRefAttachment(newValue, elm);
    }
  } else if (import_app_data11.BUILD.vdomListener && (import_app_data11.BUILD.lazyLoad ? !isProp : !elm.__lookupSetter__(memberName)) && memberName[0] === "o" && memberName[1] === "n") {
    if (memberName[2] === "-") {
      memberName = memberName.slice(3);
    } else if (isMemberInElement(win, ln)) {
      memberName = ln.slice(2);
    } else {
      memberName = ln[2] + memberName.slice(3);
    }
    if (oldValue || newValue) {
      const capture = memberName.endsWith(CAPTURE_EVENT_SUFFIX);
      memberName = memberName.replace(CAPTURE_EVENT_REGEX, "");
      if (oldValue) {
        plt.rel(elm, memberName, oldValue, capture);
      }
      if (newValue) {
        plt.ael(elm, memberName, newValue, capture);
      }
    }
  } else if (import_app_data11.BUILD.vdomPropOrAttr && memberName[0] === "a" && memberName.startsWith("attr:")) {
    const propName = memberName.slice(5);
    let attrName;
    if (import_app_data11.BUILD.member) {
      const hostRef = getHostRef(elm);
      if (hostRef && hostRef.$cmpMeta$ && hostRef.$cmpMeta$.$members$) {
        const memberMeta = hostRef.$cmpMeta$.$members$[propName];
        if (memberMeta && memberMeta[1]) {
          attrName = memberMeta[1];
        }
      }
    }
    if (!attrName) {
      attrName = propName.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    }
    if (newValue == null || newValue === false) {
      if (newValue !== false || elm.getAttribute(attrName) === "") {
        elm.removeAttribute(attrName);
      }
    } else {
      elm.setAttribute(attrName, newValue === true ? "" : newValue);
    }
    return;
  } else if (import_app_data11.BUILD.vdomPropOrAttr && memberName[0] === "p" && memberName.startsWith("prop:")) {
    const propName = memberName.slice(5);
    try {
      elm[propName] = newValue;
    } catch (e) {
    }
    return;
  } else if (import_app_data11.BUILD.vdomPropOrAttr) {
    const isComplex = isComplexType(newValue);
    if ((isProp || isComplex && newValue !== null) && !isSvg) {
      try {
        if (!elm.tagName.includes("-")) {
          const n = newValue == null ? "" : newValue;
          if (memberName === "list") {
            isProp = false;
          } else if (oldValue == null || elm[memberName] !== n) {
            if (typeof elm.__lookupSetter__(memberName) === "function") {
              elm[memberName] = n;
            } else {
              elm.setAttribute(memberName, n);
            }
          }
        } else if (elm[memberName] !== newValue) {
          elm[memberName] = newValue;
        }
      } catch (e) {
      }
    }
    let xlink = false;
    if (import_app_data11.BUILD.vdomXlink) {
      if (ln !== (ln = ln.replace(/^xlink\:?/, ""))) {
        memberName = ln;
        xlink = true;
      }
    }
    if (newValue == null || newValue === false) {
      if (newValue !== false || elm.getAttribute(memberName) === "") {
        if (import_app_data11.BUILD.vdomXlink && xlink) {
          elm.removeAttributeNS(XLINK_NS, memberName);
        } else {
          elm.removeAttribute(memberName);
        }
      }
    } else if ((!isProp || flags & 4 /* isHost */ || isSvg) && !isComplex && elm.nodeType === 1 /* ElementNode */) {
      newValue = newValue === true ? "" : newValue;
      if (import_app_data11.BUILD.vdomXlink && xlink) {
        elm.setAttributeNS(XLINK_NS, memberName, newValue);
      } else {
        elm.setAttribute(memberName, newValue);
      }
    }
  }
};
var parseClassListRegex = /\s/;
var parseClassList = (value) => {
  if (typeof value === "object" && value && "baseVal" in value) {
    value = value.baseVal;
  }
  if (!value || typeof value !== "string") {
    return [];
  }
  return value.split(parseClassListRegex);
};
var CAPTURE_EVENT_SUFFIX = "Capture";
var CAPTURE_EVENT_REGEX = new RegExp(CAPTURE_EVENT_SUFFIX + "$");

// src/runtime/vdom/update-element.ts
var updateElement = (oldVnode, newVnode, isSvgMode2, isInitialRender) => {
  const elm = newVnode.$elm$.nodeType === 11 /* DocumentFragment */ && newVnode.$elm$.host ? newVnode.$elm$.host : newVnode.$elm$;
  const oldVnodeAttrs = oldVnode && oldVnode.$attrs$ || {};
  const newVnodeAttrs = newVnode.$attrs$ || {};
  if (import_app_data12.BUILD.updatable) {
    for (const memberName of sortedAttrNames(Object.keys(oldVnodeAttrs))) {
      if (!(memberName in newVnodeAttrs)) {
        setAccessor(
          elm,
          memberName,
          oldVnodeAttrs[memberName],
          void 0,
          isSvgMode2,
          newVnode.$flags$,
          isInitialRender
        );
      }
    }
  }
  for (const memberName of sortedAttrNames(Object.keys(newVnodeAttrs))) {
    setAccessor(
      elm,
      memberName,
      oldVnodeAttrs[memberName],
      newVnodeAttrs[memberName],
      isSvgMode2,
      newVnode.$flags$,
      isInitialRender
    );
  }
};
function sortedAttrNames(attrNames) {
  return attrNames.includes("ref") ? (
    // we need to sort these to ensure that `'ref'` is the last attr
    [...attrNames.filter((attr) => attr !== "ref"), "ref"]
  ) : (
    // no need to sort, return the original array
    attrNames
  );
}

// src/runtime/vdom/vdom-render.ts
var scopeId;
var contentRef;
var hostTagName;
var useNativeShadowDom = false;
var checkSlotFallbackVisibility = false;
var checkSlotRelocate = false;
var isSvgMode = false;
var refCallbacksToRemove = [];
var refCallbacksToAttach = [];
var createElm = (oldParentVNode, newParentVNode, childIndex) => {
  var _a2;
  const newVNode2 = newParentVNode.$children$[childIndex];
  let i2 = 0;
  let elm;
  let childNode;
  let oldVNode;
  if (import_app_data13.BUILD.slotRelocation && !useNativeShadowDom) {
    checkSlotRelocate = true;
    if (newVNode2.$tag$ === "slot") {
      newVNode2.$flags$ |= newVNode2.$children$ ? (
        // slot element has fallback content
        // still create an element that "mocks" the slot element
        2 /* isSlotFallback */
      ) : (
        // slot element does not have fallback content
        // create an html comment we'll use to always reference
        // where actual slot content should sit next to
        1 /* isSlotReference */
      );
    }
  }
  if (import_app_data13.BUILD.isDev && newVNode2.$elm$) {
    consoleDevError(
      `The JSX ${newVNode2.$text$ !== null ? `"${newVNode2.$text$}" text` : `"${newVNode2.$tag$}" element`} node should not be shared within the same renderer. The renderer caches element lookups in order to improve performance. However, a side effect from this is that the exact same JSX node should not be reused. For more information please see https://stenciljs.com/docs/templating-jsx#avoid-shared-jsx-nodes`
    );
  }
  if (import_app_data13.BUILD.vdomText && newVNode2.$text$ != null) {
    elm = newVNode2.$elm$ = win.document.createTextNode(newVNode2.$text$);
  } else if (import_app_data13.BUILD.slotRelocation && newVNode2.$flags$ & 1 /* isSlotReference */) {
    elm = newVNode2.$elm$ = import_app_data13.BUILD.isDebug || import_app_data13.BUILD.hydrateServerSide ? slotReferenceDebugNode(newVNode2) : win.document.createTextNode("");
    if (import_app_data13.BUILD.vdomAttribute) {
      updateElement(null, newVNode2, isSvgMode);
    }
  } else {
    if (import_app_data13.BUILD.svg && !isSvgMode) {
      isSvgMode = newVNode2.$tag$ === "svg";
    }
    if (!win.document) {
      throw new Error("You are trying to render a Stencil component in an environment that doesn't support the DOM.");
    }
    elm = newVNode2.$elm$ = import_app_data13.BUILD.svg ? win.document.createElementNS(
      isSvgMode ? SVG_NS : HTML_NS,
      !useNativeShadowDom && import_app_data13.BUILD.slotRelocation && newVNode2.$flags$ & 2 /* isSlotFallback */ ? "slot-fb" : newVNode2.$tag$
    ) : win.document.createElement(
      !useNativeShadowDom && import_app_data13.BUILD.slotRelocation && newVNode2.$flags$ & 2 /* isSlotFallback */ ? "slot-fb" : newVNode2.$tag$
    );
    if (import_app_data13.BUILD.svg && isSvgMode && newVNode2.$tag$ === "foreignObject") {
      isSvgMode = false;
    }
    if (import_app_data13.BUILD.vdomAttribute) {
      updateElement(null, newVNode2, isSvgMode);
    }
    if ((import_app_data13.BUILD.scoped || import_app_data13.BUILD.hydrateServerSide && 128 /* shadowNeedsScopedCss */) && isDef(scopeId) && elm["s-si"] !== scopeId) {
      elm.classList.add(elm["s-si"] = scopeId);
    }
    if (newVNode2.$children$) {
      const appendTarget = newVNode2.$tag$ === "template" ? elm.content : elm;
      for (i2 = 0; i2 < newVNode2.$children$.length; ++i2) {
        childNode = createElm(oldParentVNode, newVNode2, i2);
        if (childNode) {
          appendTarget.appendChild(childNode);
        }
      }
    }
    if (import_app_data13.BUILD.svg) {
      if (newVNode2.$tag$ === "svg") {
        isSvgMode = false;
      } else if (elm.tagName === "foreignObject") {
        isSvgMode = true;
      }
    }
  }
  elm["s-hn"] = hostTagName;
  if (import_app_data13.BUILD.slotRelocation) {
    if (newVNode2.$flags$ & (2 /* isSlotFallback */ | 1 /* isSlotReference */)) {
      elm["s-sr"] = true;
      elm["s-cr"] = contentRef;
      elm["s-sn"] = newVNode2.$name$ || "";
      elm["s-rf"] = (_a2 = newVNode2.$attrs$) == null ? void 0 : _a2.ref;
      patchSlotNode(elm);
      oldVNode = oldParentVNode && oldParentVNode.$children$ && oldParentVNode.$children$[childIndex];
      if (oldVNode && oldVNode.$tag$ === newVNode2.$tag$ && oldParentVNode.$elm$) {
        relocateToHostRoot(oldParentVNode.$elm$);
      }
      if (import_app_data13.BUILD.scoped || import_app_data13.BUILD.hydrateServerSide && 128 /* shadowNeedsScopedCss */) {
        addRemoveSlotScopedClass(contentRef, elm, newParentVNode.$elm$, oldParentVNode == null ? void 0 : oldParentVNode.$elm$);
      }
    }
  }
  return elm;
};
var relocateToHostRoot = (parentElm) => {
  plt.$flags$ |= 1 /* isTmpDisconnected */;
  const host = parentElm.closest(hostTagName.toLowerCase());
  if (host != null) {
    const contentRefNode = Array.from(host.__childNodes || host.childNodes).find(
      (ref) => ref["s-cr"]
    );
    const childNodeArray = Array.from(
      parentElm.__childNodes || parentElm.childNodes
    );
    for (const childNode of contentRefNode ? childNodeArray.reverse() : childNodeArray) {
      if (childNode["s-sh"] != null) {
        insertBefore(host, childNode, contentRefNode != null ? contentRefNode : null);
        childNode["s-sh"] = void 0;
        checkSlotRelocate = true;
      }
    }
  }
  plt.$flags$ &= ~1 /* isTmpDisconnected */;
};
var putBackInOriginalLocation = (parentElm, recursive) => {
  plt.$flags$ |= 1 /* isTmpDisconnected */;
  const oldSlotChildNodes = Array.from(parentElm.__childNodes || parentElm.childNodes);
  if (parentElm["s-sr"]) {
    let node = parentElm;
    while (node = node.nextSibling) {
      if (node && node["s-sn"] === parentElm["s-sn"] && node["s-sh"] === hostTagName) {
        oldSlotChildNodes.push(node);
      }
    }
  }
  for (let i2 = oldSlotChildNodes.length - 1; i2 >= 0; i2--) {
    const childNode = oldSlotChildNodes[i2];
    if (childNode["s-hn"] !== hostTagName && childNode["s-ol"]) {
      insertBefore(referenceNode(childNode).parentNode, childNode, referenceNode(childNode));
      childNode["s-ol"].remove();
      childNode["s-ol"] = void 0;
      childNode["s-sh"] = void 0;
      checkSlotRelocate = true;
    }
    if (recursive) {
      putBackInOriginalLocation(childNode, recursive);
    }
  }
  plt.$flags$ &= ~1 /* isTmpDisconnected */;
};
var addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
  let containerElm = import_app_data13.BUILD.slotRelocation && parentElm["s-cr"] && parentElm["s-cr"].parentNode || parentElm;
  let childNode;
  if (import_app_data13.BUILD.shadowDom && containerElm.shadowRoot && containerElm.tagName === hostTagName) {
    containerElm = containerElm.shadowRoot;
  }
  if (parentVNode.$tag$ === "template") {
    containerElm = containerElm.content;
  }
  for (; startIdx <= endIdx; ++startIdx) {
    if (vnodes[startIdx]) {
      childNode = createElm(null, parentVNode, startIdx);
      if (childNode) {
        vnodes[startIdx].$elm$ = childNode;
        insertBefore(containerElm, childNode, import_app_data13.BUILD.slotRelocation ? referenceNode(before) : before);
      }
    }
  }
};
var removeVnodes = (vnodes, startIdx, endIdx) => {
  for (let index = startIdx; index <= endIdx; ++index) {
    const vnode = vnodes[index];
    if (vnode) {
      const elm = vnode.$elm$;
      nullifyVNodeRefs(vnode);
      if (elm) {
        if (import_app_data13.BUILD.slotRelocation) {
          checkSlotFallbackVisibility = true;
          if (elm["s-ol"]) {
            elm["s-ol"].remove();
          } else {
            putBackInOriginalLocation(elm, true);
          }
        }
        elm.remove();
      }
    }
  }
};
var updateChildren = (parentElm, oldCh, newVNode2, newCh, isInitialRender = false) => {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let idxInOld = 0;
  let i2 = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let node;
  let elmToMove;
  const containerElm = newVNode2.$tag$ === "template" ? parentElm.content : parentElm;
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldStartVnode, newStartVnode, isInitialRender)) {
      patch(oldStartVnode, newStartVnode, isInitialRender);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (isSameVnode(oldEndVnode, newEndVnode, isInitialRender)) {
      patch(oldEndVnode, newEndVnode, isInitialRender);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldStartVnode, newEndVnode, isInitialRender)) {
      if (import_app_data13.BUILD.slotRelocation && (oldStartVnode.$tag$ === "slot" || newEndVnode.$tag$ === "slot")) {
        putBackInOriginalLocation(oldStartVnode.$elm$.parentNode, false);
      }
      patch(oldStartVnode, newEndVnode, isInitialRender);
      insertBefore(containerElm, oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldEndVnode, newStartVnode, isInitialRender)) {
      if (import_app_data13.BUILD.slotRelocation && (oldStartVnode.$tag$ === "slot" || newEndVnode.$tag$ === "slot")) {
        putBackInOriginalLocation(oldEndVnode.$elm$.parentNode, false);
      }
      patch(oldEndVnode, newStartVnode, isInitialRender);
      insertBefore(containerElm, oldEndVnode.$elm$, oldStartVnode.$elm$);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      idxInOld = -1;
      if (import_app_data13.BUILD.vdomKey) {
        for (i2 = oldStartIdx; i2 <= oldEndIdx; ++i2) {
          if (oldCh[i2] && oldCh[i2].$key$ !== null && oldCh[i2].$key$ === newStartVnode.$key$) {
            idxInOld = i2;
            break;
          }
        }
      }
      if (import_app_data13.BUILD.vdomKey && idxInOld >= 0) {
        elmToMove = oldCh[idxInOld];
        if (elmToMove.$tag$ !== newStartVnode.$tag$) {
          node = createElm(oldCh && oldCh[newStartIdx], newVNode2, idxInOld);
        } else {
          patch(elmToMove, newStartVnode, isInitialRender);
          oldCh[idxInOld] = void 0;
          node = elmToMove.$elm$;
        }
        newStartVnode = newCh[++newStartIdx];
      } else {
        node = createElm(oldCh && oldCh[newStartIdx], newVNode2, newStartIdx);
        newStartVnode = newCh[++newStartIdx];
      }
      if (node) {
        if (import_app_data13.BUILD.slotRelocation) {
          insertBefore(
            referenceNode(oldStartVnode.$elm$).parentNode,
            node,
            referenceNode(oldStartVnode.$elm$)
          );
        } else {
          insertBefore(oldStartVnode.$elm$.parentNode, node, oldStartVnode.$elm$);
        }
      }
    }
  }
  if (oldStartIdx > oldEndIdx) {
    addVnodes(
      parentElm,
      newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$,
      newVNode2,
      newCh,
      newStartIdx,
      newEndIdx
    );
  } else if (import_app_data13.BUILD.updatable && newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
};
var isSameVnode = (leftVNode, rightVNode, isInitialRender = false) => {
  if (leftVNode.$tag$ === rightVNode.$tag$) {
    if (import_app_data13.BUILD.slotRelocation && leftVNode.$tag$ === "slot") {
      return leftVNode.$name$ === rightVNode.$name$;
    }
    if (import_app_data13.BUILD.vdomKey && !isInitialRender) {
      return leftVNode.$key$ === rightVNode.$key$;
    }
    if (isInitialRender && !leftVNode.$key$ && rightVNode.$key$) {
      leftVNode.$key$ = rightVNode.$key$;
    }
    return true;
  }
  return false;
};
var referenceNode = (node) => node && node["s-ol"] || node;
var patch = (oldVNode, newVNode2, isInitialRender = false) => {
  const elm = newVNode2.$elm$ = oldVNode.$elm$;
  const oldChildren = oldVNode.$children$;
  const newChildren = newVNode2.$children$;
  const tag = newVNode2.$tag$;
  const text = newVNode2.$text$;
  let defaultHolder;
  if (!import_app_data13.BUILD.vdomText || text == null) {
    if (import_app_data13.BUILD.svg) {
      isSvgMode = tag === "svg" ? true : tag === "foreignObject" ? false : isSvgMode;
    }
    if (import_app_data13.BUILD.vdomAttribute || import_app_data13.BUILD.reflect) {
      if (import_app_data13.BUILD.slot && tag === "slot" && !useNativeShadowDom) {
        if (oldVNode.$name$ !== newVNode2.$name$) {
          newVNode2.$elm$["s-sn"] = newVNode2.$name$ || "";
          relocateToHostRoot(newVNode2.$elm$.parentElement);
        }
      }
      updateElement(oldVNode, newVNode2, isSvgMode, isInitialRender);
    }
    if (import_app_data13.BUILD.updatable && oldChildren !== null && newChildren !== null) {
      updateChildren(elm, oldChildren, newVNode2, newChildren, isInitialRender);
    } else if (newChildren !== null) {
      if (import_app_data13.BUILD.updatable && import_app_data13.BUILD.vdomText && oldVNode.$text$ !== null) {
        elm.textContent = "";
      }
      addVnodes(elm, null, newVNode2, newChildren, 0, newChildren.length - 1);
    } else if (
      // don't do this on initial render as it can cause non-hydrated content to be removed
      !isInitialRender && import_app_data13.BUILD.updatable && oldChildren !== null
    ) {
      removeVnodes(oldChildren, 0, oldChildren.length - 1);
    } else if (import_app_data13.BUILD.hydrateClientSide && isInitialRender && import_app_data13.BUILD.updatable && oldChildren !== null && newChildren === null) {
      newVNode2.$children$ = oldChildren;
    }
    if (import_app_data13.BUILD.svg && isSvgMode && tag === "svg") {
      isSvgMode = false;
    }
  } else if (import_app_data13.BUILD.vdomText && import_app_data13.BUILD.slotRelocation && (defaultHolder = elm["s-cr"])) {
    defaultHolder.parentNode.textContent = text;
  } else if (import_app_data13.BUILD.vdomText && oldVNode.$text$ !== text) {
    elm.data = text;
  }
};
var relocateNodes = [];
var markSlotContentForRelocation = (elm) => {
  let node;
  let hostContentNodes;
  let j;
  const children = elm.__childNodes || elm.childNodes;
  for (const childNode of children) {
    if (childNode["s-sr"] && (node = childNode["s-cr"]) && node.parentNode) {
      hostContentNodes = node.parentNode.__childNodes || node.parentNode.childNodes;
      const slotName = childNode["s-sn"];
      for (j = hostContentNodes.length - 1; j >= 0; j--) {
        node = hostContentNodes[j];
        if (!node["s-cn"] && !node["s-nr"] && node["s-hn"] !== childNode["s-hn"] && (!node["s-sh"] || node["s-sh"] !== childNode["s-hn"])) {
          if (isNodeLocatedInSlot(node, slotName)) {
            let relocateNodeData = relocateNodes.find((r) => r.$nodeToRelocate$ === node);
            checkSlotFallbackVisibility = true;
            node["s-sn"] = node["s-sn"] || slotName;
            if (relocateNodeData) {
              relocateNodeData.$nodeToRelocate$["s-sh"] = childNode["s-hn"];
              relocateNodeData.$slotRefNode$ = childNode;
            } else {
              node["s-sh"] = childNode["s-hn"];
              relocateNodes.push({
                $slotRefNode$: childNode,
                $nodeToRelocate$: node
              });
            }
            if (node["s-sr"]) {
              relocateNodes.map((relocateNode) => {
                if (isNodeLocatedInSlot(relocateNode.$nodeToRelocate$, node["s-sn"])) {
                  relocateNodeData = relocateNodes.find((r) => r.$nodeToRelocate$ === node);
                  if (relocateNodeData && !relocateNode.$slotRefNode$) {
                    relocateNode.$slotRefNode$ = relocateNodeData.$slotRefNode$;
                  }
                }
              });
            }
          } else if (!relocateNodes.some((r) => r.$nodeToRelocate$ === node)) {
            relocateNodes.push({
              $nodeToRelocate$: node
            });
          }
        }
      }
    }
    if (childNode.nodeType === 1 /* ElementNode */) {
      markSlotContentForRelocation(childNode);
    }
  }
};
var nullifyVNodeRefs = (vNode) => {
  if (import_app_data13.BUILD.vdomRef) {
    if (vNode.$attrs$ && vNode.$attrs$.ref) {
      refCallbacksToRemove.push(() => vNode.$attrs$.ref(null));
    }
    vNode.$children$ && vNode.$children$.map(nullifyVNodeRefs);
  }
};
var queueRefAttachment = (refCallback, elm) => {
  if (import_app_data13.BUILD.vdomRef) {
    refCallbacksToAttach.push(() => refCallback(elm));
  }
};
var flushQueuedRefCallbacks = () => {
  if (import_app_data13.BUILD.vdomRef) {
    refCallbacksToRemove.forEach((cb) => cb());
    refCallbacksToRemove.length = 0;
    refCallbacksToAttach.forEach((cb) => cb());
    refCallbacksToAttach.length = 0;
  }
};
var insertBefore = (parent, newNode, reference, isInitialLoad) => {
  if (import_app_data13.BUILD.slotRelocation) {
    if (import_app_data13.BUILD.scoped && typeof newNode["s-sn"] === "string" && !!newNode["s-sr"] && !!newNode["s-cr"]) {
      addRemoveSlotScopedClass(newNode["s-cr"], newNode, parent, newNode.parentElement);
    } else if (typeof newNode["s-sn"] === "string") {
      if (import_app_data13.BUILD.experimentalSlotFixes && parent.getRootNode().nodeType !== 11 /* DOCUMENT_FRAGMENT_NODE */) {
        patchParentNode(newNode);
      }
      parent.insertBefore(newNode, reference);
      const { slotNode } = findSlotFromSlottedNode(newNode);
      if (slotNode && !isInitialLoad) dispatchSlotChangeEvent(slotNode);
      return newNode;
    }
  }
  if (parent.__insertBefore) {
    return parent.__insertBefore(newNode, reference);
  } else {
    return parent == null ? void 0 : parent.insertBefore(newNode, reference);
  }
};
function addRemoveSlotScopedClass(reference, slotNode, newParent, oldParent) {
  var _a2, _b;
  let scopeId2;
  if (reference && typeof slotNode["s-sn"] === "string" && !!slotNode["s-sr"] && reference.parentNode && reference.parentNode["s-sc"] && (scopeId2 = slotNode["s-si"] || reference.parentNode["s-sc"])) {
    const scopeName = slotNode["s-sn"];
    const hostName = slotNode["s-hn"];
    (_a2 = newParent.classList) == null ? void 0 : _a2.add(scopeId2 + "-s");
    if (oldParent && ((_b = oldParent.classList) == null ? void 0 : _b.contains(scopeId2 + "-s"))) {
      let child = (oldParent.__childNodes || oldParent.childNodes)[0];
      let found = false;
      while (child) {
        if (child["s-sn"] !== scopeName && child["s-hn"] === hostName && !!child["s-sr"]) {
          found = true;
          break;
        }
        child = child.nextSibling;
      }
      if (!found) oldParent.classList.remove(scopeId2 + "-s");
    }
  }
}
var renderVdom = (hostRef, renderFnResults, isInitialLoad = false) => {
  var _a2, _b, _c, _d, _e;
  const hostElm = hostRef.$hostElement$;
  const cmpMeta = hostRef.$cmpMeta$;
  const oldVNode = hostRef.$vnode$ || newVNode(null, null);
  const isHostElement = isHost(renderFnResults);
  const rootVnode = isHostElement ? renderFnResults : h(null, null, renderFnResults);
  hostTagName = hostElm.tagName;
  if (import_app_data13.BUILD.isDev && Array.isArray(renderFnResults) && renderFnResults.some(isHost)) {
    throw new Error(`The <Host> must be the single root component.
Looks like the render() function of "${hostTagName.toLowerCase()}" is returning an array that contains the <Host>.

The render() function should look like this instead:

render() {
  // Do not return an array
  return (
    <Host>{content}</Host>
  );
}
  `);
  }
  if (import_app_data13.BUILD.reflect && cmpMeta.$attrsToReflect$) {
    rootVnode.$attrs$ = rootVnode.$attrs$ || {};
    cmpMeta.$attrsToReflect$.forEach(([propName, attribute]) => {
      if (import_app_data13.BUILD.serializer && hostRef.$serializerValues$.has(propName)) {
        rootVnode.$attrs$[attribute] = hostRef.$serializerValues$.get(propName);
      } else {
        rootVnode.$attrs$[attribute] = hostElm[propName];
      }
    });
  }
  if (isInitialLoad && rootVnode.$attrs$) {
    for (const key of Object.keys(rootVnode.$attrs$)) {
      if (hostElm.hasAttribute(key) && !["key", "ref", "style", "class"].includes(key)) {
        rootVnode.$attrs$[key] = hostElm[key];
      }
    }
  }
  rootVnode.$tag$ = null;
  rootVnode.$flags$ |= 4 /* isHost */;
  hostRef.$vnode$ = rootVnode;
  rootVnode.$elm$ = oldVNode.$elm$ = import_app_data13.BUILD.shadowDom ? hostElm.shadowRoot || hostElm : hostElm;
  if (import_app_data13.BUILD.scoped || import_app_data13.BUILD.shadowDom) {
    scopeId = hostElm["s-sc"];
  }
  useNativeShadowDom = supportsShadow && !!(cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) && !(cmpMeta.$flags$ & 128 /* shadowNeedsScopedCss */);
  if (import_app_data13.BUILD.slotRelocation) {
    contentRef = hostElm["s-cr"];
    checkSlotFallbackVisibility = false;
  }
  patch(oldVNode, rootVnode, isInitialLoad);
  if (import_app_data13.BUILD.slotRelocation) {
    plt.$flags$ |= 1 /* isTmpDisconnected */;
    if (checkSlotRelocate) {
      markSlotContentForRelocation(rootVnode.$elm$);
      for (const relocateData of relocateNodes) {
        const nodeToRelocate = relocateData.$nodeToRelocate$;
        if (!nodeToRelocate["s-ol"] && win.document) {
          const orgLocationNode = import_app_data13.BUILD.isDebug || import_app_data13.BUILD.hydrateServerSide ? originalLocationDebugNode(nodeToRelocate) : win.document.createTextNode("");
          orgLocationNode["s-nr"] = nodeToRelocate;
          insertBefore(
            nodeToRelocate.parentNode,
            nodeToRelocate["s-ol"] = orgLocationNode,
            nodeToRelocate,
            isInitialLoad
          );
        }
      }
      for (const relocateData of relocateNodes) {
        const nodeToRelocate = relocateData.$nodeToRelocate$;
        const slotRefNode = relocateData.$slotRefNode$;
        if (nodeToRelocate.nodeType === 1 /* ElementNode */ && isInitialLoad) {
          nodeToRelocate["s-ih"] = (_a2 = nodeToRelocate.hidden) != null ? _a2 : false;
        }
        if (slotRefNode) {
          const parentNodeRef = slotRefNode.parentNode;
          let insertBeforeNode = slotRefNode.nextSibling;
          if (!import_app_data13.BUILD.hydrateServerSide && insertBeforeNode && insertBeforeNode.nodeType === 1 /* ElementNode */) {
            let orgLocationNode = (_b = nodeToRelocate["s-ol"]) == null ? void 0 : _b.previousSibling;
            while (orgLocationNode) {
              let refNode = (_c = orgLocationNode["s-nr"]) != null ? _c : null;
              if (refNode && refNode["s-sn"] === nodeToRelocate["s-sn"] && parentNodeRef === (refNode.__parentNode || refNode.parentNode)) {
                refNode = refNode.nextSibling;
                while (refNode === nodeToRelocate || (refNode == null ? void 0 : refNode["s-sr"])) {
                  refNode = refNode == null ? void 0 : refNode.nextSibling;
                }
                if (!refNode || !refNode["s-nr"]) {
                  insertBeforeNode = refNode;
                  break;
                }
              }
              orgLocationNode = orgLocationNode.previousSibling;
            }
          }
          const parent = nodeToRelocate.__parentNode || nodeToRelocate.parentNode;
          const nextSibling = nodeToRelocate.__nextSibling || nodeToRelocate.nextSibling;
          if (!insertBeforeNode && parentNodeRef !== parent || nextSibling !== insertBeforeNode) {
            if (nodeToRelocate !== insertBeforeNode) {
              insertBefore(parentNodeRef, nodeToRelocate, insertBeforeNode, isInitialLoad);
              if (nodeToRelocate.nodeType === 8 /* CommentNode */ && nodeToRelocate.nodeValue.startsWith("s-nt-")) {
                const textNode = win.document.createTextNode(nodeToRelocate.nodeValue.replace(/^s-nt-/, ""));
                textNode["s-hn"] = nodeToRelocate["s-hn"];
                textNode["s-sn"] = nodeToRelocate["s-sn"];
                textNode["s-sh"] = nodeToRelocate["s-sh"];
                textNode["s-sr"] = nodeToRelocate["s-sr"];
                textNode["s-ol"] = nodeToRelocate["s-ol"];
                textNode["s-ol"]["s-nr"] = textNode;
                insertBefore(nodeToRelocate.parentNode, textNode, nodeToRelocate, isInitialLoad);
                nodeToRelocate.parentNode.removeChild(nodeToRelocate);
              }
              if (nodeToRelocate.nodeType === 1 /* ElementNode */ && nodeToRelocate.tagName !== "SLOT-FB") {
                nodeToRelocate.hidden = (_d = nodeToRelocate["s-ih"]) != null ? _d : false;
              }
            }
          }
          nodeToRelocate && typeof slotRefNode["s-rf"] === "function" && slotRefNode["s-rf"](slotRefNode);
        } else if (nodeToRelocate.nodeType === 1 /* ElementNode */) {
          nodeToRelocate.hidden = true;
        }
      }
    }
    if (checkSlotFallbackVisibility) {
      updateFallbackSlotVisibility(rootVnode.$elm$);
    }
    plt.$flags$ &= ~1 /* isTmpDisconnected */;
    relocateNodes.length = 0;
  }
  if (import_app_data13.BUILD.slotRelocation && !useNativeShadowDom && !(cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) && hostElm["s-cr"]) {
    const children = rootVnode.$elm$.__childNodes || rootVnode.$elm$.childNodes;
    for (const childNode of children) {
      if (childNode["s-hn"] !== hostTagName && !childNode["s-sh"]) {
        if (isInitialLoad && childNode["s-ih"] == null) {
          childNode["s-ih"] = (_e = childNode.hidden) != null ? _e : false;
        }
        if (childNode.nodeType === 1 /* ElementNode */) {
          childNode.hidden = true;
        } else if (childNode.nodeType === 3 /* TextNode */ && !!childNode.nodeValue.trim()) {
          const textCommentNode = win.document.createComment("s-nt-" + childNode.nodeValue);
          textCommentNode["s-sn"] = childNode["s-sn"];
          insertBefore(childNode.parentNode, textCommentNode, childNode, isInitialLoad);
          childNode.parentNode.removeChild(childNode);
        }
      }
    }
  }
  contentRef = void 0;
  flushQueuedRefCallbacks();
};
var slotReferenceDebugNode = (slotVNode) => {
  var _a2;
  return (_a2 = win.document) == null ? void 0 : _a2.createComment(
    `<slot${slotVNode.$name$ ? ' name="' + slotVNode.$name$ + '"' : ""}> (host=${hostTagName.toLowerCase()})`
  );
};
var originalLocationDebugNode = (nodeToRelocate) => {
  var _a2;
  return (_a2 = win.document) == null ? void 0 : _a2.createComment(
    `org-location for ` + (nodeToRelocate.localName ? `<${nodeToRelocate.localName}> (host=${nodeToRelocate["s-hn"]})` : `[${nodeToRelocate.textContent}]`)
  );
};

// src/runtime/update-component.ts
var attachToAncestor = (hostRef, ancestorComponent) => {
  if (import_app_data14.BUILD.asyncLoading && ancestorComponent && !hostRef.$onRenderResolve$ && ancestorComponent["s-p"]) {
    const index = ancestorComponent["s-p"].push(
      new Promise(
        (r) => hostRef.$onRenderResolve$ = () => {
          ancestorComponent["s-p"].splice(index - 1, 1);
          r();
        }
      )
    );
  }
};
var scheduleUpdate = (hostRef, isInitialLoad) => {
  if (import_app_data14.BUILD.taskQueue && import_app_data14.BUILD.updatable) {
    hostRef.$flags$ |= 16 /* isQueuedForUpdate */;
  }
  if (import_app_data14.BUILD.asyncLoading && hostRef.$flags$ & 4 /* isWaitingForChildren */) {
    hostRef.$flags$ |= 512 /* needsRerender */;
    return;
  }
  attachToAncestor(hostRef, hostRef.$ancestorComponent$);
  const dispatch = () => dispatchHooks(hostRef, isInitialLoad);
  if (isInitialLoad) {
    queueMicrotask(() => {
      dispatch();
    });
    return;
  }
  return import_app_data14.BUILD.taskQueue ? writeTask(dispatch) : dispatch();
};
var dispatchHooks = (hostRef, isInitialLoad) => {
  const elm = hostRef.$hostElement$;
  const endSchedule = createTime("scheduleUpdate", hostRef.$cmpMeta$.$tagName$);
  const instance = import_app_data14.BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
  if (!instance) {
    throw new Error(
      `Can't render component <${elm.tagName.toLowerCase()} /> with invalid Stencil runtime! Make sure this imported component is compiled with a \`externalRuntime: true\` flag. For more information, please refer to https://stenciljs.com/docs/custom-elements#externalruntime`
    );
  }
  let maybePromise;
  if (isInitialLoad) {
    if (import_app_data14.BUILD.lazyLoad) {
      if (import_app_data14.BUILD.slotRelocation && hostRef.$deferredConnectedCallback$) {
        hostRef.$deferredConnectedCallback$ = false;
        safeCall(instance, "connectedCallback", void 0, elm);
      }
      if (import_app_data14.BUILD.hostListener) {
        hostRef.$flags$ |= 256 /* isListenReady */;
        if (hostRef.$queuedListeners$) {
          hostRef.$queuedListeners$.map(([methodName, event]) => safeCall(instance, methodName, event, elm));
          hostRef.$queuedListeners$ = void 0;
        }
      }
      if (hostRef.$fetchedCbList$.length) {
        hostRef.$fetchedCbList$.forEach((cb) => cb(elm));
      }
    }
    emitLifecycleEvent(elm, "componentWillLoad");
    maybePromise = safeCall(instance, "componentWillLoad", void 0, elm);
  } else {
    emitLifecycleEvent(elm, "componentWillUpdate");
    maybePromise = safeCall(instance, "componentWillUpdate", void 0, elm);
  }
  emitLifecycleEvent(elm, "componentWillRender");
  maybePromise = enqueue(maybePromise, () => safeCall(instance, "componentWillRender", void 0, elm));
  endSchedule();
  return enqueue(maybePromise, () => updateComponent(hostRef, instance, isInitialLoad));
};
var enqueue = (maybePromise, fn) => isPromisey(maybePromise) ? maybePromise.then(fn).catch((err2) => {
  console.error(err2);
  fn();
}) : fn();
var isPromisey = (maybePromise) => maybePromise instanceof Promise || maybePromise && maybePromise.then && typeof maybePromise.then === "function";
var updateComponent = async (hostRef, instance, isInitialLoad) => {
  var _a2;
  const elm = hostRef.$hostElement$;
  const endUpdate = createTime("update", hostRef.$cmpMeta$.$tagName$);
  const rc = elm["s-rc"];
  if (import_app_data14.BUILD.style && isInitialLoad) {
    attachStyles(hostRef);
  }
  const endRender = createTime("render", hostRef.$cmpMeta$.$tagName$);
  if (import_app_data14.BUILD.isDev) {
    hostRef.$flags$ |= 1024 /* devOnRender */;
  }
  if (import_app_data14.BUILD.hydrateServerSide) {
    await callRender(hostRef, instance, elm, isInitialLoad);
  } else {
    callRender(hostRef, instance, elm, isInitialLoad);
  }
  if (import_app_data14.BUILD.isDev) {
    hostRef.$renderCount$ = hostRef.$renderCount$ === void 0 ? 1 : hostRef.$renderCount$ + 1;
    hostRef.$flags$ &= ~1024 /* devOnRender */;
  }
  if (import_app_data14.BUILD.hydrateServerSide) {
    try {
      serverSideConnected(elm);
      if (isInitialLoad) {
        if (hostRef.$cmpMeta$.$flags$ & 1 /* shadowDomEncapsulation */) {
          elm["s-en"] = "";
        } else if (hostRef.$cmpMeta$.$flags$ & 2 /* scopedCssEncapsulation */) {
          elm["s-en"] = "c";
        }
      }
    } catch (e) {
      consoleError(e, elm);
    }
  }
  if (import_app_data14.BUILD.asyncLoading && rc) {
    rc.map((cb) => cb());
    elm["s-rc"] = void 0;
  }
  endRender();
  endUpdate();
  if (import_app_data14.BUILD.asyncLoading) {
    const childrenPromises = (_a2 = elm["s-p"]) != null ? _a2 : [];
    const postUpdate = () => postUpdateComponent(hostRef);
    if (childrenPromises.length === 0) {
      postUpdate();
    } else {
      Promise.all(childrenPromises).then(postUpdate).catch(postUpdate);
      hostRef.$flags$ |= 4 /* isWaitingForChildren */;
      childrenPromises.length = 0;
    }
  } else {
    postUpdateComponent(hostRef);
  }
};
var renderingRef = null;
var callRender = (hostRef, instance, elm, isInitialLoad) => {
  const allRenderFn = import_app_data14.BUILD.allRenderFn ? true : false;
  const lazyLoad = import_app_data14.BUILD.lazyLoad ? true : false;
  const taskQueue = import_app_data14.BUILD.taskQueue ? true : false;
  const updatable = import_app_data14.BUILD.updatable ? true : false;
  try {
    renderingRef = instance;
    instance = allRenderFn ? instance.render() : instance.render && instance.render();
    if (updatable && taskQueue) {
      hostRef.$flags$ &= ~16 /* isQueuedForUpdate */;
    }
    if (updatable || lazyLoad) {
      hostRef.$flags$ |= 2 /* hasRendered */;
    }
    if (import_app_data14.BUILD.hasRenderFn || import_app_data14.BUILD.reflect) {
      if (import_app_data14.BUILD.vdomRender || import_app_data14.BUILD.reflect) {
        if (import_app_data14.BUILD.hydrateServerSide) {
          return Promise.resolve(instance).then((value) => renderVdom(hostRef, value, isInitialLoad));
        } else {
          renderVdom(hostRef, instance, isInitialLoad);
        }
      } else {
        const shadowRoot = elm.shadowRoot;
        if (hostRef.$cmpMeta$.$flags$ & 1 /* shadowDomEncapsulation */) {
          shadowRoot.textContent = instance;
        } else {
          elm.textContent = instance;
        }
      }
    }
  } catch (e) {
    consoleError(e, hostRef.$hostElement$);
  }
  renderingRef = null;
  return null;
};
var getRenderingRef = () => renderingRef;
var postUpdateComponent = (hostRef) => {
  const tagName = hostRef.$cmpMeta$.$tagName$;
  const elm = hostRef.$hostElement$;
  const endPostUpdate = createTime("postUpdate", tagName);
  const instance = import_app_data14.BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
  const ancestorComponent = hostRef.$ancestorComponent$;
  if (import_app_data14.BUILD.isDev) {
    hostRef.$flags$ |= 1024 /* devOnRender */;
  }
  safeCall(instance, "componentDidRender", void 0, elm);
  if (import_app_data14.BUILD.isDev) {
    hostRef.$flags$ &= ~1024 /* devOnRender */;
  }
  emitLifecycleEvent(elm, "componentDidRender");
  if (!(hostRef.$flags$ & 64 /* hasLoadedComponent */)) {
    hostRef.$flags$ |= 64 /* hasLoadedComponent */;
    if (import_app_data14.BUILD.asyncLoading && import_app_data14.BUILD.cssAnnotations) {
      addHydratedFlag(elm);
    }
    if (import_app_data14.BUILD.isDev) {
      hostRef.$flags$ |= 2048 /* devOnDidLoad */;
    }
    safeCall(instance, "componentDidLoad", void 0, elm);
    if (import_app_data14.BUILD.isDev) {
      hostRef.$flags$ &= ~2048 /* devOnDidLoad */;
    }
    emitLifecycleEvent(elm, "componentDidLoad");
    endPostUpdate();
    if (import_app_data14.BUILD.asyncLoading) {
      hostRef.$onReadyResolve$(elm);
      if (!ancestorComponent) {
        appDidLoad(tagName);
      }
    }
  } else {
    if (import_app_data14.BUILD.isDev) {
      hostRef.$flags$ |= 1024 /* devOnRender */;
    }
    safeCall(instance, "componentDidUpdate", void 0, elm);
    if (import_app_data14.BUILD.isDev) {
      hostRef.$flags$ &= ~1024 /* devOnRender */;
    }
    emitLifecycleEvent(elm, "componentDidUpdate");
    endPostUpdate();
  }
  if (import_app_data14.BUILD.method && import_app_data14.BUILD.lazyLoad) {
    hostRef.$onInstanceResolve$(elm);
  }
  if (import_app_data14.BUILD.asyncLoading) {
    if (hostRef.$onRenderResolve$) {
      hostRef.$onRenderResolve$();
      hostRef.$onRenderResolve$ = void 0;
    }
    if (hostRef.$flags$ & 512 /* needsRerender */) {
      nextTick(() => scheduleUpdate(hostRef, false));
    }
    hostRef.$flags$ &= ~(4 /* isWaitingForChildren */ | 512 /* needsRerender */);
  }
};
var forceUpdate = (ref) => {
  var _a2;
  if (import_app_data14.BUILD.updatable && (Build.isBrowser || Build.isTesting)) {
    const hostRef = getHostRef(ref);
    const isConnected = (_a2 = hostRef == null ? void 0 : hostRef.$hostElement$) == null ? void 0 : _a2.isConnected;
    if (isConnected && (hostRef.$flags$ & (2 /* hasRendered */ | 16 /* isQueuedForUpdate */)) === 2 /* hasRendered */) {
      scheduleUpdate(hostRef, false);
    }
    return isConnected;
  }
  return false;
};
var appDidLoad = (who) => {
  var _a2;
  if (import_app_data14.BUILD.asyncQueue) {
    plt.$flags$ |= 2 /* appLoaded */;
  }
  nextTick(() => emitEvent(win, "appload", { detail: { namespace: import_app_data14.NAMESPACE } }));
  if (import_app_data14.BUILD.hydrateClientSide) {
    if ((_a2 = plt.$orgLocNodes$) == null ? void 0 : _a2.size) {
      plt.$orgLocNodes$.clear();
    }
  }
  if (import_app_data14.BUILD.profile && performance.measure) {
    performance.measure(`[Stencil] ${import_app_data14.NAMESPACE} initial load (by ${who})`, "st:app:start");
  }
};
var safeCall = (instance, method, arg, elm) => {
  if (instance && instance[method]) {
    try {
      return instance[method](arg);
    } catch (e) {
      consoleError(e, elm);
    }
  }
  return void 0;
};
var emitLifecycleEvent = (elm, lifecycleName) => {
  if (import_app_data14.BUILD.lifecycleDOMEvents) {
    emitEvent(elm, "stencil_" + lifecycleName, {
      bubbles: true,
      composed: true,
      detail: {
        namespace: import_app_data14.NAMESPACE
      }
    });
  }
};
var addHydratedFlag = (elm) => {
  var _a2, _b;
  return import_app_data14.BUILD.hydratedClass ? elm.classList.add((_a2 = import_app_data14.BUILD.hydratedSelectorName) != null ? _a2 : "hydrated") : import_app_data14.BUILD.hydratedAttribute ? elm.setAttribute((_b = import_app_data14.BUILD.hydratedSelectorName) != null ? _b : "hydrated", "") : void 0;
};
var serverSideConnected = (elm) => {
  const children = elm.children;
  if (children != null) {
    for (let i2 = 0, ii = children.length; i2 < ii; i2++) {
      const childElm = children[i2];
      if (typeof childElm.connectedCallback === "function") {
        childElm.connectedCallback();
      }
      serverSideConnected(childElm);
    }
  }
};

// src/runtime/set-value.ts
var getValue = (ref, propName) => getHostRef(ref).$instanceValues$.get(propName);
var setValue = (ref, propName, newVal, cmpMeta) => {
  const hostRef = getHostRef(ref);
  if (!hostRef) {
    return;
  }
  if (import_app_data15.BUILD.lazyLoad && !hostRef) {
    throw new Error(
      `Couldn't find host element for "${cmpMeta.$tagName$}" as it is unknown to this Stencil runtime. This usually happens when integrating a 3rd party Stencil component with another Stencil component or application. Please reach out to the maintainers of the 3rd party Stencil component or report this on the Stencil Discord server (https://chat.stenciljs.com) or comment on this similar [GitHub issue](https://github.com/stenciljs/core/issues/5457).`
    );
  }
  if (import_app_data15.BUILD.serializer && hostRef.$serializerValues$.has(propName) && hostRef.$serializerValues$.get(propName) === newVal) {
    return;
  }
  const elm = import_app_data15.BUILD.lazyLoad ? hostRef.$hostElement$ : ref;
  const oldVal = hostRef.$instanceValues$.get(propName);
  const flags = hostRef.$flags$;
  const instance = import_app_data15.BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
  newVal = parsePropertyValue(
    newVal,
    cmpMeta.$members$[propName][0],
    import_app_data15.BUILD.formAssociated && !!(cmpMeta.$flags$ & 64 /* formAssociated */)
  );
  const areBothNaN = Number.isNaN(oldVal) && Number.isNaN(newVal);
  const didValueChange = newVal !== oldVal && !areBothNaN;
  if ((!import_app_data15.BUILD.lazyLoad || !(flags & 8 /* isConstructingInstance */) || oldVal === void 0) && didValueChange) {
    hostRef.$instanceValues$.set(propName, newVal);
    if (import_app_data15.BUILD.serializer && import_app_data15.BUILD.reflect && cmpMeta.$attrsToReflect$) {
      if (cmpMeta.$serializers$ && cmpMeta.$serializers$[propName]) {
        const runSerializer = (inst) => {
          let attrVal = newVal;
          for (const serializer of cmpMeta.$serializers$[propName]) {
            const [[methodName]] = Object.entries(serializer);
            attrVal = inst[methodName](attrVal, propName);
          }
          hostRef.$serializerValues$.set(propName, attrVal);
        };
        if (instance) {
          runSerializer(instance);
        } else {
          hostRef.$fetchedCbList$.push(() => {
            runSerializer(hostRef.$lazyInstance$);
          });
        }
      }
    }
    if (import_app_data15.BUILD.isDev) {
      if (hostRef.$flags$ & 1024 /* devOnRender */) {
        consoleDevWarn(
          `The state/prop "${propName}" changed during rendering. This can potentially lead to infinite-loops and other bugs.`,
          "\nElement",
          elm,
          "\nNew value",
          newVal,
          "\nOld value",
          oldVal
        );
      } else if (hostRef.$flags$ & 2048 /* devOnDidLoad */) {
        consoleDevWarn(
          `The state/prop "${propName}" changed during "componentDidLoad()", this triggers extra re-renders, try to setup on "componentWillLoad()"`,
          "\nElement",
          elm,
          "\nNew value",
          newVal,
          "\nOld value",
          oldVal
        );
      }
    }
    if (import_app_data15.BUILD.propChangeCallback && cmpMeta.$watchers$) {
      const watchMethods = cmpMeta.$watchers$[propName];
      if (watchMethods) {
        watchMethods.map((watcher) => {
          try {
            const [[watchMethodName, watcherFlags]] = Object.entries(watcher);
            if (flags & 128 /* isWatchReady */ || watcherFlags & 1 /* Immediate */) {
              if (!instance) {
                hostRef.$fetchedCbList$.push(() => {
                  hostRef.$lazyInstance$[watchMethodName](newVal, oldVal, propName);
                });
              } else {
                instance[watchMethodName](newVal, oldVal, propName);
              }
            }
          } catch (e) {
            consoleError(e, elm);
          }
        });
      }
    }
    if (import_app_data15.BUILD.updatable && flags & 2 /* hasRendered */) {
      if (instance.componentShouldUpdate) {
        const shouldUpdate = instance.componentShouldUpdate(newVal, oldVal, propName);
        if (shouldUpdate === false && !(flags & 16 /* isQueuedForUpdate */)) {
          return;
        }
      }
      if (!(flags & 16 /* isQueuedForUpdate */)) {
        scheduleUpdate(hostRef, false);
      }
    }
  }
};

// src/runtime/proxy-component.ts
var proxyComponent = (Cstr, cmpMeta, flags) => {
  var _a2, _b;
  const prototype = Cstr.prototype;
  if (import_app_data16.BUILD.isTesting) {
    if (prototype.__stencilAugmented) {
      return;
    }
    prototype.__stencilAugmented = true;
  }
  if (import_app_data16.BUILD.formAssociated && cmpMeta.$flags$ & 64 /* formAssociated */ && flags & 1 /* isElementConstructor */) {
    FORM_ASSOCIATED_CUSTOM_ELEMENT_CALLBACKS.forEach((cbName) => {
      const originalFormAssociatedCallback = prototype[cbName];
      Object.defineProperty(prototype, cbName, {
        value(...args) {
          var _a3;
          const hostRef = getHostRef(this);
          const instance = import_app_data16.BUILD.lazyLoad ? hostRef == null ? void 0 : hostRef.$lazyInstance$ : this;
          if (!instance) {
            (_a3 = hostRef == null ? void 0 : hostRef.$onReadyPromise$) == null ? void 0 : _a3.then((asyncInstance) => {
              const cb = asyncInstance[cbName];
              typeof cb === "function" && cb.call(asyncInstance, ...args);
            });
          } else {
            const cb = import_app_data16.BUILD.lazyLoad ? instance[cbName] : originalFormAssociatedCallback;
            typeof cb === "function" && cb.call(instance, ...args);
          }
        }
      });
    });
  }
  if (import_app_data16.BUILD.member && cmpMeta.$members$ || import_app_data16.BUILD.propChangeCallback) {
    if (import_app_data16.BUILD.propChangeCallback) {
      if (Cstr.watchers && !cmpMeta.$watchers$) {
        cmpMeta.$watchers$ = normalizeWatchers(Cstr.watchers);
      }
      if (Cstr.deserializers && !cmpMeta.$deserializers$) {
        cmpMeta.$deserializers$ = Cstr.deserializers;
      }
      if (Cstr.serializers && !cmpMeta.$serializers$) {
        cmpMeta.$serializers$ = Cstr.serializers;
      }
    }
    const members = Object.entries((_a2 = cmpMeta.$members$) != null ? _a2 : {});
    members.map(([memberName, [memberFlags]]) => {
      if ((import_app_data16.BUILD.prop || import_app_data16.BUILD.state) && (memberFlags & 31 /* Prop */ || (!import_app_data16.BUILD.lazyLoad || flags & 2 /* proxyState */) && memberFlags & 32 /* State */)) {
        const { get: origGetter, set: origSetter } = getPropertyDescriptor(prototype, memberName) || {};
        if (origGetter) cmpMeta.$members$[memberName][0] |= 2048 /* Getter */;
        if (origSetter) cmpMeta.$members$[memberName][0] |= 4096 /* Setter */;
        if (flags & 1 /* isElementConstructor */ || !origGetter) {
          Object.defineProperty(prototype, memberName, {
            get() {
              if (import_app_data16.BUILD.lazyLoad) {
                if ((cmpMeta.$members$[memberName][0] & 2048 /* Getter */) === 0) {
                  return getValue(this, memberName);
                }
                const ref = getHostRef(this);
                const instance = ref ? ref.$lazyInstance$ : prototype;
                if (!instance) return;
                return instance[memberName];
              }
              if (!import_app_data16.BUILD.lazyLoad) {
                return origGetter ? origGetter.apply(this) : getValue(this, memberName);
              }
            },
            configurable: true,
            enumerable: true
          });
        }
        Object.defineProperty(prototype, memberName, {
          set(newValue) {
            const ref = getHostRef(this);
            if (!ref) {
              return;
            }
            if (import_app_data16.BUILD.isDev) {
              if (
                // we are proxying the instance (not element)
                (flags & 1 /* isElementConstructor */) === 0 && // if the class has a setter, then the Element can update instance values, so ignore
                (cmpMeta.$members$[memberName][0] & 4096 /* Setter */) === 0 && // the element is not constructing
                (ref && ref.$flags$ & 8 /* isConstructingInstance */) === 0 && // the member is a prop
                (memberFlags & 31 /* Prop */) !== 0 && // the member is not mutable
                (memberFlags & 1024 /* Mutable */) === 0
              ) {
                consoleDevWarn(
                  `@Prop() "${memberName}" on <${cmpMeta.$tagName$}> is immutable but was modified from within the component.
More information: https://stenciljs.com/docs/properties#prop-mutability`
                );
              }
            }
            if (origSetter) {
              const currentValue = memberFlags & 32 /* State */ ? this[memberName] : ref.$hostElement$[memberName];
              if (typeof currentValue === "undefined" && ref.$instanceValues$.get(memberName)) {
                newValue = ref.$instanceValues$.get(memberName);
              }
              origSetter.apply(this, [
                parsePropertyValue(
                  newValue,
                  memberFlags,
                  import_app_data16.BUILD.formAssociated && !!(cmpMeta.$flags$ & 64 /* formAssociated */)
                )
              ]);
              newValue = memberFlags & 32 /* State */ ? this[memberName] : ref.$hostElement$[memberName];
              setValue(this, memberName, newValue, cmpMeta);
              return;
            }
            if (!import_app_data16.BUILD.lazyLoad) {
              setValue(this, memberName, newValue, cmpMeta);
              return;
            }
            if (import_app_data16.BUILD.lazyLoad) {
              if ((flags & 1 /* isElementConstructor */) === 0 || (cmpMeta.$members$[memberName][0] & 4096 /* Setter */) === 0) {
                setValue(this, memberName, newValue, cmpMeta);
                if (flags & 1 /* isElementConstructor */ && !ref.$lazyInstance$) {
                  ref.$fetchedCbList$.push(() => {
                    if (cmpMeta.$members$[memberName][0] & 4096 /* Setter */ && ref.$lazyInstance$[memberName] !== ref.$instanceValues$.get(memberName)) {
                      ref.$lazyInstance$[memberName] = newValue;
                    }
                  });
                }
                return;
              }
              const setterSetVal = () => {
                const currentValue = ref.$lazyInstance$[memberName];
                if (!ref.$instanceValues$.get(memberName) && currentValue) {
                  ref.$instanceValues$.set(memberName, currentValue);
                }
                ref.$lazyInstance$[memberName] = parsePropertyValue(
                  newValue,
                  memberFlags,
                  import_app_data16.BUILD.formAssociated && !!(cmpMeta.$flags$ & 64 /* formAssociated */)
                );
                setValue(this, memberName, ref.$lazyInstance$[memberName], cmpMeta);
              };
              if (ref.$lazyInstance$) {
                setterSetVal();
              } else {
                ref.$fetchedCbList$.push(() => {
                  setterSetVal();
                });
              }
            }
          }
        });
      } else if (import_app_data16.BUILD.lazyLoad && import_app_data16.BUILD.method && flags & 1 /* isElementConstructor */ && memberFlags & 64 /* Method */) {
        Object.defineProperty(prototype, memberName, {
          value(...args) {
            var _a3;
            const ref = getHostRef(this);
            return (_a3 = ref == null ? void 0 : ref.$onInstancePromise$) == null ? void 0 : _a3.then(() => {
              var _a4;
              return (_a4 = ref.$lazyInstance$) == null ? void 0 : _a4[memberName](...args);
            });
          }
        });
      }
    });
    if (import_app_data16.BUILD.observeAttribute && (!import_app_data16.BUILD.lazyLoad || flags & 1 /* isElementConstructor */)) {
      const attrNameToPropName = /* @__PURE__ */ new Map();
      prototype.attributeChangedCallback = function(attrName, oldValue, newValue) {
        plt.jmp(() => {
          var _a3;
          const propName = attrNameToPropName.get(attrName);
          const hostRef = getHostRef(this);
          if (import_app_data16.BUILD.serializer && hostRef.$serializerValues$.has(propName) && hostRef.$serializerValues$.get(propName) === newValue) {
            return;
          }
          if (this.hasOwnProperty(propName) && import_app_data16.BUILD.lazyLoad) {
            newValue = this[propName];
            delete this[propName];
          }
          if (import_app_data16.BUILD.deserializer && cmpMeta.$deserializers$ && cmpMeta.$deserializers$[propName]) {
            const setVal = (methodName, instance) => {
              const deserializeVal = instance == null ? void 0 : instance[methodName](newValue, propName);
              if (deserializeVal !== this[propName]) {
                this[propName] = deserializeVal;
              }
            };
            for (const deserializer of cmpMeta.$deserializers$[propName]) {
              const [[methodName]] = Object.entries(deserializer);
              if (import_app_data16.BUILD.lazyLoad) {
                if (hostRef.$lazyInstance$) {
                  setVal(methodName, hostRef.$lazyInstance$);
                } else {
                  hostRef.$fetchedCbList$.push(() => {
                    setVal(methodName, hostRef.$lazyInstance$);
                  });
                }
              } else {
                setVal(methodName, this);
              }
            }
            return;
          } else if (prototype.hasOwnProperty(propName) && typeof this[propName] === "number" && // cast type to number to avoid TS compiler issues
          this[propName] == newValue) {
            return;
          } else if (propName == null) {
            const flags2 = hostRef == null ? void 0 : hostRef.$flags$;
            if (hostRef && flags2 && !(flags2 & 8 /* isConstructingInstance */) && newValue !== oldValue) {
              const elm = import_app_data16.BUILD.lazyLoad ? hostRef.$hostElement$ : this;
              const instance = import_app_data16.BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
              const entry = (_a3 = cmpMeta.$watchers$) == null ? void 0 : _a3[attrName];
              entry == null ? void 0 : entry.forEach((watcher) => {
                const [[watchMethodName, watcherFlags]] = Object.entries(watcher);
                if (instance[watchMethodName] != null && (flags2 & 128 /* isWatchReady */ || watcherFlags & 1 /* Immediate */)) {
                  instance[watchMethodName].call(instance, newValue, oldValue, attrName);
                }
              });
            }
            return;
          }
          const propFlags = members.find(([m]) => m === propName);
          const isBooleanTarget = propFlags && propFlags[1][0] & 4 /* Boolean */;
          const isSpuriousBooleanRemoval = isBooleanTarget && newValue === null && this[propName] === void 0;
          if (isBooleanTarget) {
            newValue = newValue === null || newValue === "false" ? false : true;
          }
          const propDesc = Object.getOwnPropertyDescriptor(prototype, propName);
          if (!isSpuriousBooleanRemoval && newValue != this[propName] && (!propDesc.get || !!propDesc.set)) {
            this[propName] = newValue;
          }
        });
      };
      Cstr.observedAttributes = Array.from(
        /* @__PURE__ */ new Set([
          ...Object.keys((_b = cmpMeta.$watchers$) != null ? _b : {}),
          ...members.filter(([_, m]) => m[0] & 31 /* HasAttribute */).map(([propName, m]) => {
            var _a3;
            const attrName = m[1] || propName;
            attrNameToPropName.set(attrName, propName);
            if (import_app_data16.BUILD.reflect && m[0] & 512 /* ReflectAttr */) {
              (_a3 = cmpMeta.$attrsToReflect$) == null ? void 0 : _a3.push([propName, attrName]);
            }
            return attrName;
          })
        ])
      );
    }
  }
  return Cstr;
};

// src/runtime/initialize-component.ts
var initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId) => {
  let Cstr;
  try {
    if ((hostRef.$flags$ & 32 /* hasInitializedComponent */) === 0) {
      hostRef.$flags$ |= 32 /* hasInitializedComponent */;
      const bundleId = cmpMeta.$lazyBundleId$;
      if (import_app_data17.BUILD.lazyLoad && bundleId) {
        const CstrImport = loadModule(cmpMeta, hostRef, hmrVersionId);
        if (CstrImport && "then" in CstrImport) {
          const endLoad = uniqueTime(
            `st:load:${cmpMeta.$tagName$}:${hostRef.$modeName$}`,
            `[Stencil] Load module for <${cmpMeta.$tagName$}>`
          );
          Cstr = await CstrImport;
          endLoad();
        } else {
          Cstr = CstrImport;
        }
        if (!Cstr) {
          throw new Error(`Constructor for "${cmpMeta.$tagName$}#${hostRef.$modeName$}" was not found`);
        }
        if (import_app_data17.BUILD.member && !Cstr.isProxied) {
          if (import_app_data17.BUILD.propChangeCallback) {
            cmpMeta.$watchers$ = normalizeWatchers(Cstr.watchers);
            cmpMeta.$serializers$ = Cstr.serializers;
            cmpMeta.$deserializers$ = Cstr.deserializers;
          }
          proxyComponent(Cstr, cmpMeta, 2 /* proxyState */);
          Cstr.isProxied = true;
        }
        const endNewInstance = createTime("createInstance", cmpMeta.$tagName$);
        if (import_app_data17.BUILD.member) {
          hostRef.$flags$ |= 8 /* isConstructingInstance */;
        }
        try {
          new Cstr(hostRef);
        } catch (e) {
          consoleError(e, elm);
        }
        if (import_app_data17.BUILD.member) {
          hostRef.$flags$ &= ~8 /* isConstructingInstance */;
        }
        if (import_app_data17.BUILD.propChangeCallback) {
          hostRef.$flags$ |= 128 /* isWatchReady */;
        }
        endNewInstance();
        const needsDeferredCallback = import_app_data17.BUILD.slotRelocation && cmpMeta.$flags$ & 4 /* hasSlotRelocation */;
        if (!needsDeferredCallback) {
          fireConnectedCallback(hostRef.$lazyInstance$, elm);
        } else {
          hostRef.$deferredConnectedCallback$ = true;
        }
      } else {
        Cstr = elm.constructor;
        const cmpTag = elm.localName;
        customElements.whenDefined(cmpTag).then(() => hostRef.$flags$ |= 128 /* isWatchReady */);
      }
      if (import_app_data17.BUILD.style && Cstr && Cstr.style) {
        let style;
        if (typeof Cstr.style === "string") {
          style = Cstr.style;
        } else if (import_app_data17.BUILD.mode && typeof Cstr.style !== "string") {
          hostRef.$modeName$ = computeMode(elm);
          if (hostRef.$modeName$) {
            style = Cstr.style[hostRef.$modeName$];
          }
          if (import_app_data17.BUILD.hydrateServerSide && hostRef.$modeName$) {
            elm.setAttribute("s-mode", hostRef.$modeName$);
          }
        }
        const scopeId2 = getScopeId(cmpMeta, hostRef.$modeName$);
        if (!styles.has(scopeId2) || import_app_data17.BUILD.hotModuleReplacement && hmrVersionId) {
          const endRegisterStyles = createTime("registerStyles", cmpMeta.$tagName$);
          if (import_app_data17.BUILD.hydrateServerSide && import_app_data17.BUILD.shadowDom) {
            if (cmpMeta.$flags$ & 128 /* shadowNeedsScopedCss */) {
              style = scopeCss(style, scopeId2, true);
            } else if (needsScopedSSR()) {
              style = expandPartSelectors(style);
            }
          }
          registerStyle(scopeId2, style, !!(cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */));
          endRegisterStyles();
        }
      }
    }
    const ancestorComponent = hostRef.$ancestorComponent$;
    const schedule = () => scheduleUpdate(hostRef, true);
    if (import_app_data17.BUILD.asyncLoading && ancestorComponent && ancestorComponent["s-rc"]) {
      ancestorComponent["s-rc"].push(schedule);
    } else {
      schedule();
    }
  } catch (e) {
    consoleError(e, elm);
    if (import_app_data17.BUILD.asyncLoading && hostRef.$onRenderResolve$) {
      hostRef.$onRenderResolve$();
      hostRef.$onRenderResolve$ = void 0;
    }
    if (import_app_data17.BUILD.asyncLoading && hostRef.$onReadyResolve$) {
      hostRef.$onReadyResolve$(elm);
    }
  }
};
var fireConnectedCallback = (instance, elm) => {
  if (import_app_data17.BUILD.lazyLoad) {
    safeCall(instance, "connectedCallback", void 0, elm);
  }
};

// src/runtime/connected-callback.ts
var connectedCallback = (elm) => {
  if ((plt.$flags$ & 1 /* isTmpDisconnected */) === 0) {
    const hostRef = getHostRef(elm);
    if (!hostRef) {
      return;
    }
    const cmpMeta = hostRef.$cmpMeta$;
    const endConnected = createTime("connectedCallback", cmpMeta.$tagName$);
    if (import_app_data18.BUILD.hostListenerTargetParent) {
      addHostEventListeners(elm, hostRef, cmpMeta.$listeners$, true);
    }
    if (!(hostRef.$flags$ & 1 /* hasConnected */)) {
      hostRef.$flags$ |= 1 /* hasConnected */;
      let hostId;
      if (import_app_data18.BUILD.hydrateClientSide) {
        hostId = elm.getAttribute(HYDRATE_ID);
        if (hostId) {
          if (import_app_data18.BUILD.shadowDom && supportsShadow && cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
            const scopeId2 = import_app_data18.BUILD.mode ? addStyle(elm.shadowRoot, cmpMeta, elm.getAttribute("s-mode")) : addStyle(elm.shadowRoot, cmpMeta);
            elm.classList.remove(scopeId2 + "-h", scopeId2 + "-s");
          } else if (import_app_data18.BUILD.scoped && cmpMeta.$flags$ & 2 /* scopedCssEncapsulation */) {
            const scopeId2 = getScopeId(cmpMeta, import_app_data18.BUILD.mode ? elm.getAttribute("s-mode") : void 0);
            elm["s-sc"] = scopeId2;
          }
          initializeClientHydrate(elm, cmpMeta.$tagName$, hostId, hostRef);
        }
      }
      if (import_app_data18.BUILD.slotRelocation && !hostId) {
        if (import_app_data18.BUILD.hydrateServerSide || (import_app_data18.BUILD.slot || import_app_data18.BUILD.shadowDom) && // TODO(STENCIL-854): Remove code related to legacy shadowDomShim field
        cmpMeta.$flags$ & (4 /* hasSlotRelocation */ | 8 /* needsShadowDomShim */)) {
          setContentReference(elm);
        }
      }
      if (import_app_data18.BUILD.asyncLoading) {
        let ancestorComponent = elm;
        while (ancestorComponent = ancestorComponent.parentNode || ancestorComponent.host) {
          if (import_app_data18.BUILD.hydrateClientSide && ancestorComponent.nodeType === 1 /* ElementNode */ && ancestorComponent.hasAttribute("s-id") && ancestorComponent["s-p"] || ancestorComponent["s-p"]) {
            attachToAncestor(hostRef, hostRef.$ancestorComponent$ = ancestorComponent);
            break;
          }
        }
      }
      if (import_app_data18.BUILD.prop && !import_app_data18.BUILD.hydrateServerSide && cmpMeta.$members$) {
        Object.entries(cmpMeta.$members$).map(([memberName, [memberFlags]]) => {
          if (memberFlags & 31 /* Prop */ && Object.prototype.hasOwnProperty.call(elm, memberName)) {
            const value = elm[memberName];
            delete elm[memberName];
            elm[memberName] = value;
          }
        });
      }
      if (import_app_data18.BUILD.initializeNextTick) {
        nextTick(() => initializeComponent(elm, hostRef, cmpMeta));
      } else {
        initializeComponent(elm, hostRef, cmpMeta);
      }
    } else {
      addHostEventListeners(elm, hostRef, cmpMeta.$listeners$, false);
      if (hostRef == null ? void 0 : hostRef.$lazyInstance$) {
        fireConnectedCallback(hostRef.$lazyInstance$, elm);
      } else if (hostRef == null ? void 0 : hostRef.$onReadyPromise$) {
        hostRef.$onReadyPromise$.then(() => fireConnectedCallback(hostRef.$lazyInstance$, elm));
      }
    }
    endConnected();
  }
};
var setContentReference = (elm) => {
  if (!win.document) {
    return;
  }
  const contentRefElm = elm["s-cr"] = win.document.createComment(
    import_app_data18.BUILD.isDebug ? `content-ref (host=${elm.localName})` : ""
  );
  contentRefElm["s-cn"] = true;
  insertBefore(elm, contentRefElm, elm.firstChild);
};

// src/runtime/disconnected-callback.ts
var import_app_data19 = require("@stencil/core/internal/app-data");
var disconnectInstance = (instance, elm) => {
  if (import_app_data19.BUILD.lazyLoad) {
    safeCall(instance, "disconnectedCallback", void 0, elm || instance);
  }
};
var disconnectedCallback = async (elm) => {
  if ((plt.$flags$ & 1 /* isTmpDisconnected */) === 0) {
    const hostRef = getHostRef(elm);
    if (import_app_data19.BUILD.hostListener) {
      if (hostRef == null ? void 0 : hostRef.$rmListeners$) {
        hostRef.$rmListeners$.map((rmListener) => rmListener());
        hostRef.$rmListeners$ = void 0;
      }
    }
    if (!import_app_data19.BUILD.lazyLoad) {
      disconnectInstance(elm);
    } else if (hostRef == null ? void 0 : hostRef.$lazyInstance$) {
      disconnectInstance(hostRef.$lazyInstance$, elm);
    } else if (hostRef == null ? void 0 : hostRef.$onReadyPromise$) {
      hostRef.$onReadyPromise$.then(() => disconnectInstance(hostRef.$lazyInstance$, elm));
    }
  }
  if (rootAppliedStyles.has(elm)) {
    rootAppliedStyles.delete(elm);
  }
  if (elm.shadowRoot && rootAppliedStyles.has(elm.shadowRoot)) {
    rootAppliedStyles.delete(elm.shadowRoot);
  }
};

// src/runtime/bootstrap-custom-element.ts
var defineCustomElement = (Cstr, compactMeta) => {
  customElements.define(
    transformTag(compactMeta[1]),
    proxyCustomElement(Cstr, compactMeta)
  );
};
var proxyCustomElement = (Cstr, compactMeta) => {
  const cmpMeta = {
    $flags$: compactMeta[0],
    $tagName$: compactMeta[1]
  };
  try {
    if (import_app_data20.BUILD.member) {
      cmpMeta.$members$ = compactMeta[2];
    }
    if (import_app_data20.BUILD.hostListener) {
      cmpMeta.$listeners$ = compactMeta[3];
    }
    if (import_app_data20.BUILD.propChangeCallback) {
      cmpMeta.$watchers$ = normalizeWatchers(Cstr.$watchers$);
      cmpMeta.$deserializers$ = Cstr.$deserializers$;
      cmpMeta.$serializers$ = Cstr.$serializers$;
    }
    if (import_app_data20.BUILD.reflect) {
      cmpMeta.$attrsToReflect$ = [];
    }
    if (import_app_data20.BUILD.shadowDom && !supportsShadow && cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
      cmpMeta.$flags$ |= 8 /* needsShadowDomShim */;
    }
    if (!(cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) && cmpMeta.$flags$ & 256 /* hasSlot */) {
      if (import_app_data20.BUILD.experimentalSlotFixes) {
        patchPseudoShadowDom(Cstr.prototype);
      } else {
        if (import_app_data20.BUILD.slotChildNodesFix) {
          patchChildSlotNodes(Cstr.prototype);
        }
        if (import_app_data20.BUILD.cloneNodeFix) {
          patchCloneNode(Cstr.prototype);
        }
        if (import_app_data20.BUILD.appendChildSlotFix) {
          patchSlotAppendChild(Cstr.prototype);
        }
        if (import_app_data20.BUILD.scopedSlotTextContentFix && cmpMeta.$flags$ & 2 /* scopedCssEncapsulation */) {
          patchTextContent(Cstr.prototype);
        }
      }
    } else if (import_app_data20.BUILD.cloneNodeFix) {
      patchCloneNode(Cstr.prototype);
    }
    if (import_app_data20.BUILD.hydrateClientSide && import_app_data20.BUILD.shadowDom) {
      hydrateScopedToShadow();
    }
    const originalConnectedCallback = Cstr.prototype.connectedCallback;
    const originalDisconnectedCallback = Cstr.prototype.disconnectedCallback;
    Object.assign(Cstr.prototype, {
      __hasHostListenerAttached: false,
      __registerHost() {
        registerHost(this, cmpMeta);
      },
      connectedCallback() {
        if (!this.__hasHostListenerAttached) {
          const hostRef = getHostRef(this);
          if (!hostRef) {
            return;
          }
          addHostEventListeners(this, hostRef, cmpMeta.$listeners$, false);
          this.__hasHostListenerAttached = true;
        }
        connectedCallback(this);
        if (originalConnectedCallback) {
          originalConnectedCallback.call(this);
        }
      },
      disconnectedCallback() {
        disconnectedCallback(this);
        if (originalDisconnectedCallback) {
          originalDisconnectedCallback.call(this);
        }
      },
      __attachShadow() {
        if (supportsShadow) {
          if (!this.shadowRoot) {
            createShadowRoot.call(this, cmpMeta);
          } else {
            if (this.shadowRoot.mode !== "open") {
              throw new Error(
                `Unable to re-use existing shadow root for ${cmpMeta.$tagName$}! Mode is set to ${this.shadowRoot.mode} but Stencil only supports open shadow roots.`
              );
            }
          }
        } else {
          this.shadowRoot = this;
        }
      }
    });
    Object.defineProperty(Cstr, "is", {
      value: cmpMeta.$tagName$,
      configurable: true
    });
    return proxyComponent(Cstr, cmpMeta, 1 /* isElementConstructor */ | 2 /* proxyState */);
  } catch (e) {
    consoleError(e);
    return Cstr;
  }
};
var forceModeUpdate = (elm) => {
  if (import_app_data20.BUILD.style && import_app_data20.BUILD.mode && !import_app_data20.BUILD.lazyLoad) {
    const mode = computeMode(elm);
    const hostRef = getHostRef(elm);
    if (hostRef && hostRef.$modeName$ !== mode) {
      const cmpMeta = hostRef.$cmpMeta$;
      const oldScopeId = elm["s-sc"];
      const scopeId2 = getScopeId(cmpMeta, mode);
      const style = elm.constructor.style[mode];
      const flags = cmpMeta.$flags$;
      if (style) {
        if (!styles.has(scopeId2)) {
          registerStyle(scopeId2, style, !!(flags & 1 /* shadowDomEncapsulation */));
        }
        hostRef.$modeName$ = mode;
        elm.classList.remove(oldScopeId + "-h", oldScopeId + "-s");
        attachStyles(hostRef);
        forceUpdate(elm);
      }
    }
  }
};

// src/runtime/bootstrap-lazy.ts
var import_app_data21 = require("@stencil/core/internal/app-data");

// src/runtime/hmr-component.ts
var hmrStart = (hostElement, cmpMeta, hmrVersionId) => {
  const hostRef = getHostRef(hostElement);
  if (!hostRef) {
    return;
  }
  hostRef.$flags$ = 1 /* hasConnected */;
  initializeComponent(hostElement, hostRef, cmpMeta, hmrVersionId);
};

// src/runtime/bootstrap-lazy.ts
var bootstrapLazy = (lazyBundles, options = {}) => {
  var _a2;
  if (import_app_data21.BUILD.profile && performance.mark) {
    performance.mark("st:app:start");
  }
  installDevTools();
  if (!win.document) {
    console.warn("Stencil: No document found. Skipping bootstrapping lazy components.");
    return;
  }
  const endBootstrap = createTime("bootstrapLazy");
  const cmpTags = [];
  const exclude = options.exclude || [];
  const customElements2 = win.customElements;
  const head = win.document.head;
  const metaCharset = /* @__PURE__ */ head.querySelector("meta[charset]");
  const dataStyles = /* @__PURE__ */ win.document.createElement("style");
  const deferredConnectedCallbacks = [];
  let appLoadFallback;
  let isBootstrapping = true;
  Object.assign(plt, options);
  plt.$resourcesUrl$ = new URL(options.resourcesUrl || "./", win.document.baseURI).href;
  if (import_app_data21.BUILD.asyncQueue) {
    if (options.syncQueue) {
      plt.$flags$ |= 4 /* queueSync */;
    }
  }
  if (import_app_data21.BUILD.hydrateClientSide) {
    plt.$flags$ |= 2 /* appLoaded */;
  }
  if (import_app_data21.BUILD.hydrateClientSide && import_app_data21.BUILD.shadowDom) {
    hydrateScopedToShadow();
  }
  let hasSlotRelocation = false;
  lazyBundles.map((lazyBundle) => {
    lazyBundle[1].map((compactMeta) => {
      var _a3, _b;
      const cmpMeta = {
        $flags$: compactMeta[0],
        $tagName$: compactMeta[1],
        $members$: compactMeta[2],
        $listeners$: compactMeta[3]
      };
      if (cmpMeta.$flags$ & 4 /* hasSlotRelocation */) {
        hasSlotRelocation = true;
      }
      if (import_app_data21.BUILD.member) {
        cmpMeta.$members$ = compactMeta[2];
      }
      if (import_app_data21.BUILD.hostListener) {
        cmpMeta.$listeners$ = compactMeta[3];
      }
      if (import_app_data21.BUILD.reflect) {
        cmpMeta.$attrsToReflect$ = [];
      }
      if (import_app_data21.BUILD.propChangeCallback) {
        cmpMeta.$watchers$ = normalizeWatchers(compactMeta[4]);
        cmpMeta.$serializers$ = (_a3 = compactMeta[5]) != null ? _a3 : {};
        cmpMeta.$deserializers$ = (_b = compactMeta[6]) != null ? _b : {};
      }
      if (import_app_data21.BUILD.shadowDom && !supportsShadow && cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
        cmpMeta.$flags$ |= 8 /* needsShadowDomShim */;
      }
      const tagName = import_app_data21.BUILD.transformTagName && options.transformTagName ? options.transformTagName(cmpMeta.$tagName$) : transformTag(cmpMeta.$tagName$);
      const HostElement = class extends HTMLElement {
        ["s-p"];
        ["s-rc"];
        hasRegisteredEventListeners = false;
        // StencilLazyHost
        constructor(self) {
          super(self);
          self = this;
          registerHost(self, cmpMeta);
          if (import_app_data21.BUILD.shadowDom && cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
            if (supportsShadow) {
              if (!self.shadowRoot) {
                createShadowRoot.call(self, cmpMeta);
              } else {
                if (self.shadowRoot.mode !== "open") {
                  throw new Error(
                    `Unable to re-use existing shadow root for ${cmpMeta.$tagName$}! Mode is set to ${self.shadowRoot.mode} but Stencil only supports open shadow roots.`
                  );
                }
              }
            } else if (!import_app_data21.BUILD.hydrateServerSide && !("shadowRoot" in self)) {
              self.shadowRoot = self;
            }
          }
        }
        connectedCallback() {
          const hostRef = getHostRef(this);
          if (!hostRef) {
            return;
          }
          if (!this.hasRegisteredEventListeners) {
            this.hasRegisteredEventListeners = true;
            addHostEventListeners(this, hostRef, cmpMeta.$listeners$, false);
          }
          if (appLoadFallback) {
            clearTimeout(appLoadFallback);
            appLoadFallback = null;
          }
          if (isBootstrapping) {
            deferredConnectedCallbacks.push(this);
          } else {
            plt.jmp(() => connectedCallback(this));
          }
        }
        disconnectedCallback() {
          plt.jmp(() => disconnectedCallback(this));
          plt.raf(() => {
            var _a4;
            const hostRef = getHostRef(this);
            if (!hostRef) {
              return;
            }
            const i2 = deferredConnectedCallbacks.findIndex((host) => host === this);
            if (i2 > -1) {
              deferredConnectedCallbacks.splice(i2, 1);
            }
            if (((_a4 = hostRef == null ? void 0 : hostRef.$vnode$) == null ? void 0 : _a4.$elm$) instanceof Node && !hostRef.$vnode$.$elm$.isConnected) {
              delete hostRef.$vnode$.$elm$;
            }
          });
        }
        componentOnReady() {
          var _a4;
          return (_a4 = getHostRef(this)) == null ? void 0 : _a4.$onReadyPromise$;
        }
      };
      if (!(cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) && cmpMeta.$flags$ & 256 /* hasSlot */) {
        if (import_app_data21.BUILD.experimentalSlotFixes) {
          patchPseudoShadowDom(HostElement.prototype);
        } else {
          if (import_app_data21.BUILD.slotChildNodesFix) {
            patchChildSlotNodes(HostElement.prototype);
          }
          if (import_app_data21.BUILD.cloneNodeFix) {
            patchCloneNode(HostElement.prototype);
          }
          if (import_app_data21.BUILD.appendChildSlotFix) {
            patchSlotAppendChild(HostElement.prototype);
          }
          if (import_app_data21.BUILD.scopedSlotTextContentFix && cmpMeta.$flags$ & 2 /* scopedCssEncapsulation */) {
            patchTextContent(HostElement.prototype);
          }
        }
      } else if (import_app_data21.BUILD.cloneNodeFix) {
        patchCloneNode(HostElement.prototype);
      }
      if (import_app_data21.BUILD.formAssociated && cmpMeta.$flags$ & 64 /* formAssociated */) {
        HostElement.formAssociated = true;
      }
      if (import_app_data21.BUILD.hotModuleReplacement) {
        HostElement.prototype["s-hmr"] = function(hmrVersionId) {
          hmrStart(this, cmpMeta, hmrVersionId);
        };
      }
      cmpMeta.$lazyBundleId$ = lazyBundle[0];
      if (!exclude.includes(tagName) && !customElements2.get(tagName)) {
        cmpTags.push(tagName);
        customElements2.define(
          tagName,
          proxyComponent(HostElement, cmpMeta, 1 /* isElementConstructor */)
        );
      }
    });
  });
  if (cmpTags.length > 0) {
    if (import_app_data21.BUILD.slotRelocation && hasSlotRelocation) {
      dataStyles.textContent += SLOT_FB_CSS;
    }
    if (import_app_data21.BUILD.invisiblePrehydration && (import_app_data21.BUILD.hydratedClass || import_app_data21.BUILD.hydratedAttribute)) {
      dataStyles.textContent += cmpTags.sort() + HYDRATED_CSS;
    }
    if (dataStyles.innerHTML.length) {
      dataStyles.setAttribute("data-styles", "");
      const nonce = (_a2 = plt.$nonce$) != null ? _a2 : queryNonceMetaTagContent(win.document);
      if (nonce != null) {
        dataStyles.setAttribute("nonce", nonce);
      }
      head.insertBefore(dataStyles, metaCharset ? metaCharset.nextSibling : head.firstChild);
    }
  }
  isBootstrapping = false;
  if (deferredConnectedCallbacks.length) {
    deferredConnectedCallbacks.map((host) => host.connectedCallback());
  } else {
    if (import_app_data21.BUILD.profile) {
      plt.jmp(() => appLoadFallback = setTimeout(appDidLoad, 30, "timeout"));
    } else {
      plt.jmp(() => appLoadFallback = setTimeout(appDidLoad, 30));
    }
  }
  endBootstrap();
};

// src/runtime/fragment.ts
var Fragment = (_, children) => children;

// src/runtime/host-listener.ts
var import_app_data22 = require("@stencil/core/internal/app-data");
var addHostEventListeners = (elm, hostRef, listeners, attachParentListeners) => {
  if (import_app_data22.BUILD.hostListener && listeners && win.document) {
    if (import_app_data22.BUILD.hostListenerTargetParent) {
      if (attachParentListeners) {
        listeners = listeners.filter(([flags]) => flags & 32 /* TargetParent */);
      } else {
        listeners = listeners.filter(([flags]) => !(flags & 32 /* TargetParent */));
      }
    }
    listeners.map(([flags, name, method]) => {
      const target = import_app_data22.BUILD.hostListenerTarget ? getHostListenerTarget(win.document, elm, flags) : elm;
      const handler = hostListenerProxy(hostRef, method);
      const opts = hostListenerOpts(flags);
      plt.ael(target, name, handler, opts);
      (hostRef.$rmListeners$ = hostRef.$rmListeners$ || []).push(() => plt.rel(target, name, handler, opts));
    });
  }
};
var hostListenerProxy = (hostRef, methodName) => (ev) => {
  var _a2;
  try {
    if (import_app_data22.BUILD.lazyLoad) {
      if (hostRef.$flags$ & 256 /* isListenReady */) {
        (_a2 = hostRef.$lazyInstance$) == null ? void 0 : _a2[methodName](ev);
      } else {
        (hostRef.$queuedListeners$ = hostRef.$queuedListeners$ || []).push([methodName, ev]);
      }
    } else {
      hostRef.$hostElement$[methodName](ev);
    }
  } catch (e) {
    consoleError(e, hostRef.$hostElement$);
  }
};
var getHostListenerTarget = (doc, elm, flags) => {
  if (import_app_data22.BUILD.hostListenerTargetDocument && flags & 4 /* TargetDocument */) {
    return doc;
  }
  if (import_app_data22.BUILD.hostListenerTargetWindow && flags & 8 /* TargetWindow */) {
    return win;
  }
  if (import_app_data22.BUILD.hostListenerTargetBody && flags & 16 /* TargetBody */) {
    return doc.body;
  }
  if (import_app_data22.BUILD.hostListenerTargetParent && flags & 32 /* TargetParent */ && elm.parentElement) {
    return elm.parentElement;
  }
  return elm;
};
var hostListenerOpts = (flags) => supportsListenerOptions ? {
  passive: (flags & 1 /* Passive */) !== 0,
  capture: (flags & 2 /* Capture */) !== 0
} : (flags & 2 /* Capture */) !== 0;

// src/runtime/mixin.ts
var import_app_data23 = require("@stencil/core/internal/app-data");
var baseClass = import_app_data23.BUILD.lazyLoad ? class {
} : globalThis.HTMLElement || class {
};
function Mixin(...mixins) {
  return mixins.reduceRight((acc, mixin) => mixin(acc), baseClass);
}

// src/runtime/nonce.ts
var setNonce = (nonce) => plt.$nonce$ = nonce;

// src/runtime/platform-options.ts
var setPlatformOptions = (opts) => Object.assign(plt, opts);

// src/runtime/render.ts
var hostRefCache = /* @__PURE__ */ new WeakMap();
function render(vnode, container) {
  let ref = hostRefCache.get(container);
  if (!ref) {
    const cmpMeta = {
      $flags$: 0,
      $tagName$: container.tagName
    };
    ref = {
      $flags$: 0,
      $cmpMeta$: cmpMeta,
      $hostElement$: container
    };
    hostRefCache.set(container, ref);
  }
  renderVdom(ref, vnode);
}

// src/runtime/tag-transform.ts
var tagTransformer = void 0;
function transformTag(tag) {
  if (!tagTransformer) return tag;
  return tagTransformer(tag);
}
function setTagTransformer(transformer) {
  if (tagTransformer) {
    console.warn(`
      A tagTransformer has already been set. 
      Overwriting it may lead to error and unexpected results if your components have already been defined.
    `);
  }
  tagTransformer = transformer;
}

// src/runtime/vdom/jsx-dev-runtime.ts
function jsxDEV(type, props, key, _isStaticChildren, _source, _self) {
  const propsObj = props || {};
  const { children, ...rest } = propsObj;
  let vnodeData = rest;
  if (key !== void 0 && !("key" in rest)) {
    vnodeData = { ...rest, key };
  }
  if (vnodeData && Object.keys(vnodeData).length === 0) {
    vnodeData = null;
  }
  if (children !== void 0) {
    if (Array.isArray(children)) {
      return h(type, vnodeData, ...children);
    }
    if (typeof children === "object" && children !== null && "$flags$" in children) {
      return h(type, vnodeData, children);
    }
    return h(type, vnodeData, children);
  }
  return h(type, vnodeData);
}

// src/runtime/vdom/jsx-runtime.ts
function jsx(type, props, key) {
  const propsObj = props || {};
  const { children, ...rest } = propsObj;
  let vnodeData = rest;
  if (key !== void 0 && !("key" in rest)) {
    vnodeData = { ...rest, key };
  }
  if (vnodeData && Object.keys(vnodeData).length === 0) {
    vnodeData = null;
  }
  if (children !== void 0) {
    if (Array.isArray(children)) {
      return h(type, vnodeData, ...children);
    }
    if (typeof children === "object" && children !== null && "$flags$" in children) {
      return h(type, vnodeData, children);
    }
    return h(type, vnodeData, children);
  }
  return h(type, vnodeData);
}
function jsxs(type, props, key) {
  return jsx(type, props, key);
}

// src/runtime/vdom/vdom-annotations.ts
var insertVdomAnnotations = (doc, staticComponents) => {
  if (doc != null) {
    const docData = STENCIL_DOC_DATA in doc ? doc[STENCIL_DOC_DATA] : { ...DEFAULT_DOC_DATA };
    docData.staticComponents = new Set(staticComponents);
    const orgLocationNodes = [];
    parseVNodeAnnotations(doc, doc.body, docData, orgLocationNodes);
    orgLocationNodes.forEach((orgLocationNode) => {
      var _a2;
      if (orgLocationNode != null && orgLocationNode["s-nr"]) {
        const nodeRef = orgLocationNode["s-nr"];
        let hostId = nodeRef["s-host-id"];
        let nodeId = nodeRef["s-node-id"];
        let childId = `${hostId}.${nodeId}`;
        if (hostId == null) {
          hostId = 0;
          docData.rootLevelIds++;
          nodeId = docData.rootLevelIds;
          childId = `${hostId}.${nodeId}`;
          if (nodeRef.nodeType === 1 /* ElementNode */) {
            nodeRef.setAttribute(HYDRATE_CHILD_ID, childId);
            if (typeof nodeRef["s-sn"] === "string" && !nodeRef.getAttribute("slot")) {
              nodeRef.setAttribute("s-sn", nodeRef["s-sn"]);
            }
          } else if (nodeRef.nodeType === 3 /* TextNode */) {
            if (hostId === 0) {
              const textContent = (_a2 = nodeRef.nodeValue) == null ? void 0 : _a2.trim();
              if (textContent === "") {
                orgLocationNode.remove();
                return;
              }
            }
            const commentBeforeTextNode = doc.createComment(childId);
            commentBeforeTextNode.nodeValue = `${TEXT_NODE_ID}.${childId}`;
            insertBefore(nodeRef.parentNode, commentBeforeTextNode, nodeRef);
          } else if (nodeRef.nodeType === 8 /* CommentNode */) {
            const commentBeforeTextNode = doc.createComment(childId);
            commentBeforeTextNode.nodeValue = `${COMMENT_NODE_ID}.${childId}`;
            nodeRef.parentNode.insertBefore(commentBeforeTextNode, nodeRef);
          }
        }
        let orgLocationNodeId = `${ORG_LOCATION_ID}.${childId}`;
        const orgLocationParentNode = orgLocationNode.parentElement;
        if (orgLocationParentNode) {
          if (orgLocationParentNode["s-en"] === "") {
            orgLocationNodeId += `.`;
          } else if (orgLocationParentNode["s-en"] === "c") {
            orgLocationNodeId += `.c`;
          }
        }
        orgLocationNode.nodeValue = orgLocationNodeId;
      }
    });
  }
};
var parseVNodeAnnotations = (doc, node, docData, orgLocationNodes) => {
  var _a2;
  if (node == null) {
    return;
  }
  if (node["s-nr"] != null) {
    orgLocationNodes.push(node);
  }
  if (node.nodeType === 1 /* ElementNode */) {
    const childNodes = [...Array.from(node.childNodes), ...Array.from(((_a2 = node.shadowRoot) == null ? void 0 : _a2.childNodes) || [])];
    childNodes.forEach((childNode) => {
      const hostRef = getHostRef(childNode);
      if (hostRef != null && !docData.staticComponents.has(childNode.nodeName.toLowerCase())) {
        const cmpData = {
          nodeIds: 0
        };
        insertVNodeAnnotations(doc, childNode, hostRef.$vnode$, docData, cmpData);
      }
      parseVNodeAnnotations(doc, childNode, docData, orgLocationNodes);
    });
  }
};
var insertVNodeAnnotations = (doc, hostElm, vnode, docData, cmpData) => {
  if (vnode != null) {
    const hostId = ++docData.hostIds;
    hostElm.setAttribute(HYDRATE_ID, hostId);
    if (hostElm["s-cr"] != null) {
      hostElm["s-cr"].nodeValue = `${CONTENT_REF_ID}.${hostId}`;
    }
    if (vnode.$children$ != null) {
      const depth = 0;
      vnode.$children$.forEach((vnodeChild, index) => {
        insertChildVNodeAnnotations(doc, vnodeChild, cmpData, hostId, depth, index);
      });
    }
    if (hostElm && vnode && vnode.$elm$ && !hostElm.hasAttribute(HYDRATE_CHILD_ID)) {
      const parent = hostElm.parentElement;
      if (parent && parent.childNodes) {
        const parentChildNodes = Array.from(parent.childNodes);
        const comment = parentChildNodes.find(
          (node) => node.nodeType === 8 /* CommentNode */ && node["s-sr"]
        );
        if (comment) {
          const index = parentChildNodes.indexOf(hostElm) - 1;
          vnode.$elm$.setAttribute(
            HYDRATE_CHILD_ID,
            `${comment["s-host-id"]}.${comment["s-node-id"]}.0.${index}`
          );
        }
      }
    }
  }
};
var insertChildVNodeAnnotations = (doc, vnodeChild, cmpData, hostId, depth, index) => {
  const childElm = vnodeChild.$elm$;
  if (childElm == null) {
    return;
  }
  const nodeId = cmpData.nodeIds++;
  const childId = `${hostId}.${nodeId}.${depth}.${index}`;
  childElm["s-host-id"] = hostId;
  childElm["s-node-id"] = nodeId;
  if (childElm.nodeType === 1 /* ElementNode */) {
    childElm.setAttribute(HYDRATE_CHILD_ID, childId);
    if (typeof childElm["s-sn"] === "string" && !childElm.getAttribute("slot")) {
      childElm.setAttribute("s-sn", childElm["s-sn"]);
    }
  } else if (childElm.nodeType === 3 /* TextNode */) {
    const parentNode = childElm.parentNode;
    const nodeName = parentNode == null ? void 0 : parentNode.nodeName;
    if (nodeName !== "STYLE" && nodeName !== "SCRIPT") {
      const textNodeId = `${TEXT_NODE_ID}.${childId}`;
      const commentBeforeTextNode = doc.createComment(textNodeId);
      insertBefore(parentNode, commentBeforeTextNode, childElm);
    }
  } else if (childElm.nodeType === 8 /* CommentNode */) {
    if (childElm["s-sr"]) {
      const slotName = childElm["s-sn"] || "";
      const slotNodeId = `${SLOT_NODE_ID}.${childId}.${slotName}`;
      childElm.nodeValue = slotNodeId;
    }
  }
  if (vnodeChild.$children$ != null) {
    const childDepth = depth + 1;
    vnodeChild.$children$.forEach((vnode, index2) => {
      insertChildVNodeAnnotations(doc, vnode, cmpData, hostId, childDepth, index2);
    });
  }
};

// src/testing/platform/index.ts
var setScopedSSR = (scoped) => {
  scopedSSR = scoped;
};
var needsScopedSSR = () => scopedSSR;
var scopedSSR = false;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Build,
  Env,
  Fragment,
  HYDRATED_STYLE_ID,
  Host,
  Mixin,
  addHostEventListeners,
  bootstrapLazy,
  connectedCallback,
  consoleDevError,
  consoleDevInfo,
  consoleDevWarn,
  consoleError,
  createEvent,
  defineCustomElement,
  disconnectedCallback,
  flushAll,
  flushLoadModule,
  flushQueue,
  forceModeUpdate,
  forceUpdate,
  getAssetPath,
  getElement,
  getHostRef,
  getMode,
  getRenderingRef,
  getValue,
  h,
  insertVdomAnnotations,
  isMemberInElement,
  jsx,
  jsxDEV,
  jsxs,
  loadModule,
  modeResolutionChain,
  needsScopedSSR,
  nextTick,
  normalizeWatchers,
  parsePropertyValue,
  plt,
  postUpdateComponent,
  proxyComponent,
  proxyCustomElement,
  readTask,
  registerComponents,
  registerHost,
  registerInstance,
  registerModule,
  render,
  renderVdom,
  resetPlatform,
  setAssetPath,
  setErrorHandler,
  setMode,
  setNonce,
  setPlatformHelpers,
  setPlatformOptions,
  setScopedSSR,
  setSupportsShadowDom,
  setTagTransformer,
  setValue,
  startAutoApplyChanges,
  stopAutoApplyChanges,
  styles,
  supportsConstructableStylesheets,
  supportsListenerOptions,
  supportsMutableAdoptedStyleSheets,
  supportsShadow,
  transformTag,
  win,
  writeTask
});
