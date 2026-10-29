/*!
 Stencil Testing v4.43.5 | MIT Licensed | https://stenciljs.com
 */
"use strict";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _lazyRequire(moduleId) {
  return new Proxy(
    {},
    {
      get(_target, propertyKey) {
        const importedModule = require(moduleId);
        return Reflect.get(importedModule, propertyKey);
      },
      set(_target, propertyKey, value) {
        const importedModule = require(moduleId);
        return Reflect.set(importedModule, propertyKey, value);
      },
    },
  );
}
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

// node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "node_modules/semver/internal/debug.js"(exports2, module2) {
    "use strict";
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module2.exports = debug;
  }
});

// node_modules/semver/internal/constants.js
var require_constants = __commonJS({
  "node_modules/semver/internal/constants.js"(exports2, module2) {
    "use strict";
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    module2.exports = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
  }
});

// node_modules/semver/internal/re.js
var require_re = __commonJS({
  "node_modules/semver/internal/re.js"(exports2, module2) {
    "use strict";
    var {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = require_constants();
    var debug = require_debug();
    exports2 = module2.exports = {};
    var re = exports2.re = [];
    var safeRe = exports2.safeRe = [];
    var src = exports2.src = [];
    var safeSrc = exports2.safeSrc = [];
    var t = exports2.t = {};
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    var makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    var createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("COERCERTLFULL", src[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports2.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports2.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports2.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "node_modules/semver/internal/parse-options.js"(exports2, module2) {
    "use strict";
    var looseOption = Object.freeze({ loose: true });
    var emptyOpts = Object.freeze({});
    var parseOptions = (options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    };
    module2.exports = parseOptions;
  }
});

// node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "node_modules/semver/internal/identifiers.js"(exports2, module2) {
    "use strict";
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      if (typeof a === "number" && typeof b === "number") {
        return a === b ? 0 : a < b ? -1 : 1;
      }
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module2.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "node_modules/semver/classes/semver.js"(exports2, module2) {
    "use strict";
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
    var { safeRe: re, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var SemVer = class _SemVer {
      constructor(version2, options) {
        options = parseOptions(options);
        if (version2 instanceof _SemVer) {
          if (version2.loose === !!options.loose && version2.includePrerelease === !!options.includePrerelease) {
            return version2;
          } else {
            version2 = version2.version;
          }
        } else if (typeof version2 !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version2}".`);
        }
        if (version2.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version2, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version2.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version2}`);
        }
        this.raw = version2;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.major < other.major) {
          return -1;
        }
        if (this.major > other.major) {
          return 1;
        }
        if (this.minor < other.minor) {
          return -1;
        }
        if (this.minor > other.minor) {
          return 1;
        }
        if (this.patch < other.patch) {
          return -1;
        }
        if (this.patch > other.patch) {
          return 1;
        }
        return 0;
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("build compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier, identifierBase) {
        if (release.startsWith("pre")) {
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (identifier) {
            const match2 = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
            if (!match2 || match2[1] !== identifier) {
              throw new Error(`invalid identifier: ${identifier}`);
            }
          }
        }
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier, identifierBase);
            this.inc("pre", identifier, identifierBase);
            break;
          // If the input is a non-prerelease version, this acts the same as
          // prepatch.
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier, identifierBase);
            }
            this.inc("pre", identifier, identifierBase);
            break;
          case "release":
            if (this.prerelease.length === 0) {
              throw new Error(`version ${this.raw} is not a prerelease`);
            }
            this.prerelease.length = 0;
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          // This probably shouldn't be used publicly.
          // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                if (identifier === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    };
    module2.exports = SemVer;
  }
});

// node_modules/semver/functions/major.js
var require_major = __commonJS({
  "node_modules/semver/functions/major.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var major = (a, loose) => new SemVer(a, loose).major;
    module2.exports = major;
  }
});

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
      var begs, beg, left, right, result2;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i = ai;
      if (ai >= 0 && bi > 0) {
        if (a === b) {
          return [ai, bi];
        }
        begs = [];
        left = str.length;
        while (i >= 0 && !result2) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result2 = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
            bi = str.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result2 = [left, right];
        }
      }
      return result2;
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
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
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
          var test4 = lte;
          var reverse = y < x;
          if (reverse) {
            incr *= -1;
            test4 = gte;
          }
          var pad = n.some(isPadded);
          N = [];
          for (var i = x; test4(i, y); i += incr) {
            var c;
            if (isAlphaSequence) {
              c = String.fromCharCode(i);
              if (c === "\\")
                c = "";
            } else {
              c = String(i);
              if (pad) {
                var need = width - c.length;
                if (need > 0) {
                  var z = new Array(need + 1).join("0");
                  if (i < 0)
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

// node_modules/resolve/lib/homedir.js
var require_homedir = __commonJS({
  "node_modules/resolve/lib/homedir.js"(exports2, module2) {
    "use strict";
    var os2 = require("os");
    module2.exports = os2.homedir || function homedir2() {
      var home = process.env.HOME;
      var user = process.env.LOGNAME || process.env.USER || process.env.LNAME || process.env.USERNAME;
      if (process.platform === "win32") {
        return process.env.USERPROFILE || process.env.HOMEDRIVE + process.env.HOMEPATH || home || null;
      }
      if (process.platform === "darwin") {
        return home || (user ? "/Users/" + user : null);
      }
      if (process.platform === "linux") {
        return home || (process.getuid() === 0 ? "/root" : user ? "/home/" + user : null);
      }
      return home || null;
    };
  }
});

// node_modules/resolve/lib/caller.js
var require_caller = __commonJS({
  "node_modules/resolve/lib/caller.js"(exports2, module2) {
    module2.exports = function() {
      var origPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = function(_, stack2) {
        return stack2;
      };
      var stack = new Error().stack;
      Error.prepareStackTrace = origPrepareStackTrace;
      return stack[2].getFileName();
    };
  }
});

// node_modules/path-parse/index.js
var require_path_parse = __commonJS({
  "node_modules/path-parse/index.js"(exports2, module2) {
    "use strict";
    var isWindows = process.platform === "win32";
    var splitWindowsRe = /^(((?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?[\\\/]?)(?:[^\\\/]*[\\\/])*)((\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))[\\\/]*$/;
    var win32 = {};
    function win32SplitPath(filename) {
      return splitWindowsRe.exec(filename).slice(1);
    }
    win32.parse = function(pathString) {
      if (typeof pathString !== "string") {
        throw new TypeError(
          "Parameter 'pathString' must be a string, not " + typeof pathString
        );
      }
      var allParts = win32SplitPath(pathString);
      if (!allParts || allParts.length !== 5) {
        throw new TypeError("Invalid path '" + pathString + "'");
      }
      return {
        root: allParts[1],
        dir: allParts[0] === allParts[1] ? allParts[0] : allParts[0].slice(0, -1),
        base: allParts[2],
        ext: allParts[4],
        name: allParts[3]
      };
    };
    var splitPathRe = /^((\/?)(?:[^\/]*\/)*)((\.{1,2}|[^\/]+?|)(\.[^.\/]*|))[\/]*$/;
    var posix = {};
    function posixSplitPath(filename) {
      return splitPathRe.exec(filename).slice(1);
    }
    posix.parse = function(pathString) {
      if (typeof pathString !== "string") {
        throw new TypeError(
          "Parameter 'pathString' must be a string, not " + typeof pathString
        );
      }
      var allParts = posixSplitPath(pathString);
      if (!allParts || allParts.length !== 5) {
        throw new TypeError("Invalid path '" + pathString + "'");
      }
      return {
        root: allParts[1],
        dir: allParts[0].slice(0, -1),
        base: allParts[2],
        ext: allParts[4],
        name: allParts[3]
      };
    };
    if (isWindows)
      module2.exports = win32.parse;
    else
      module2.exports = posix.parse;
    module2.exports.posix = posix.parse;
    module2.exports.win32 = win32.parse;
  }
});

// node_modules/resolve/lib/node-modules-paths.js
var require_node_modules_paths = __commonJS({
  "node_modules/resolve/lib/node-modules-paths.js"(exports2, module2) {
    var path7 = require("path");
    var parse = path7.parse || require_path_parse();
    var getNodeModulesDirs = function getNodeModulesDirs2(absoluteStart, modules) {
      var prefix = "/";
      if (/^([A-Za-z]:)/.test(absoluteStart)) {
        prefix = "";
      } else if (/^\\\\/.test(absoluteStart)) {
        prefix = "\\\\";
      }
      var paths = [absoluteStart];
      var parsed = parse(absoluteStart);
      while (parsed.dir !== paths[paths.length - 1]) {
        paths.push(parsed.dir);
        parsed = parse(parsed.dir);
      }
      return paths.reduce(function(dirs, aPath) {
        return dirs.concat(modules.map(function(moduleDir) {
          return path7.resolve(prefix, aPath, moduleDir);
        }));
      }, []);
    };
    module2.exports = function nodeModulesPaths(start2, opts, request) {
      var modules = opts && opts.moduleDirectory ? [].concat(opts.moduleDirectory) : ["node_modules"];
      if (opts && typeof opts.paths === "function") {
        return opts.paths(
          request,
          start2,
          function() {
            return getNodeModulesDirs(start2, modules);
          },
          opts
        );
      }
      var dirs = getNodeModulesDirs(start2, modules);
      return opts && opts.paths ? dirs.concat(opts.paths) : dirs;
    };
  }
});

// node_modules/resolve/lib/normalize-options.js
var require_normalize_options = __commonJS({
  "node_modules/resolve/lib/normalize-options.js"(exports2, module2) {
    module2.exports = function(x, opts) {
      return opts || {};
    };
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports2, module2) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
      }
      return arr;
    };
    var joiny = function(arr, joiner) {
      var str = "";
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result2 = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result2) === result2) {
            return result2;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      };
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = "$" + i;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports2, module2) {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/hasown/index.js
var require_hasown = __commonJS({
  "node_modules/hasown/index.js"(exports2, module2) {
    "use strict";
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = require_function_bind();
    module2.exports = bind.call(call, $hasOwn);
  }
});

// node_modules/is-core-module/core.json
var require_core = __commonJS({
  "node_modules/is-core-module/core.json"(exports2, module2) {
    module2.exports = {
      assert: true,
      "node:assert": [">= 14.18 && < 15", ">= 16"],
      "assert/strict": ">= 15",
      "node:assert/strict": ">= 16",
      async_hooks: ">= 8",
      "node:async_hooks": [">= 14.18 && < 15", ">= 16"],
      buffer_ieee754: ">= 0.5 && < 0.9.7",
      buffer: true,
      "node:buffer": [">= 14.18 && < 15", ">= 16"],
      child_process: true,
      "node:child_process": [">= 14.18 && < 15", ">= 16"],
      cluster: ">= 0.5",
      "node:cluster": [">= 14.18 && < 15", ">= 16"],
      console: true,
      "node:console": [">= 14.18 && < 15", ">= 16"],
      constants: true,
      "node:constants": [">= 14.18 && < 15", ">= 16"],
      crypto: true,
      "node:crypto": [">= 14.18 && < 15", ">= 16"],
      _debug_agent: ">= 1 && < 8",
      _debugger: "< 8",
      dgram: true,
      "node:dgram": [">= 14.18 && < 15", ">= 16"],
      diagnostics_channel: [">= 14.17 && < 15", ">= 15.1"],
      "node:diagnostics_channel": [">= 14.18 && < 15", ">= 16"],
      dns: true,
      "node:dns": [">= 14.18 && < 15", ">= 16"],
      "dns/promises": ">= 15",
      "node:dns/promises": ">= 16",
      domain: ">= 0.7.12",
      "node:domain": [">= 14.18 && < 15", ">= 16"],
      events: true,
      "node:events": [">= 14.18 && < 15", ">= 16"],
      freelist: "< 6",
      fs: true,
      "node:fs": [">= 14.18 && < 15", ">= 16"],
      "fs/promises": [">= 10 && < 10.1", ">= 14"],
      "node:fs/promises": [">= 14.18 && < 15", ">= 16"],
      _http_agent: ">= 0.11.1",
      "node:_http_agent": [">= 14.18 && < 15", ">= 16"],
      _http_client: ">= 0.11.1",
      "node:_http_client": [">= 14.18 && < 15", ">= 16"],
      _http_common: ">= 0.11.1",
      "node:_http_common": [">= 14.18 && < 15", ">= 16"],
      _http_incoming: ">= 0.11.1",
      "node:_http_incoming": [">= 14.18 && < 15", ">= 16"],
      _http_outgoing: ">= 0.11.1",
      "node:_http_outgoing": [">= 14.18 && < 15", ">= 16"],
      _http_server: ">= 0.11.1",
      "node:_http_server": [">= 14.18 && < 15", ">= 16"],
      http: true,
      "node:http": [">= 14.18 && < 15", ">= 16"],
      http2: ">= 8.8",
      "node:http2": [">= 14.18 && < 15", ">= 16"],
      https: true,
      "node:https": [">= 14.18 && < 15", ">= 16"],
      inspector: ">= 8",
      "node:inspector": [">= 14.18 && < 15", ">= 16"],
      "inspector/promises": [">= 19"],
      "node:inspector/promises": [">= 19"],
      _linklist: "< 8",
      module: true,
      "node:module": [">= 14.18 && < 15", ">= 16"],
      net: true,
      "node:net": [">= 14.18 && < 15", ">= 16"],
      "node-inspect/lib/_inspect": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_client": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_repl": ">= 7.6 && < 12",
      os: true,
      "node:os": [">= 14.18 && < 15", ">= 16"],
      path: true,
      "node:path": [">= 14.18 && < 15", ">= 16"],
      "path/posix": ">= 15.3",
      "node:path/posix": ">= 16",
      "path/win32": ">= 15.3",
      "node:path/win32": ">= 16",
      perf_hooks: ">= 8.5",
      "node:perf_hooks": [">= 14.18 && < 15", ">= 16"],
      process: ">= 1",
      "node:process": [">= 14.18 && < 15", ">= 16"],
      punycode: ">= 0.5",
      "node:punycode": [">= 14.18 && < 15", ">= 16"],
      querystring: true,
      "node:querystring": [">= 14.18 && < 15", ">= 16"],
      readline: true,
      "node:readline": [">= 14.18 && < 15", ">= 16"],
      "readline/promises": ">= 17",
      "node:readline/promises": ">= 17",
      repl: true,
      "node:repl": [">= 14.18 && < 15", ">= 16"],
      "node:sea": [">= 20.12 && < 21", ">= 21.7"],
      smalloc: ">= 0.11.5 && < 3",
      "node:sqlite": [">= 22.13 && < 23", ">= 23.4"],
      _stream_duplex: ">= 0.9.4",
      "node:_stream_duplex": [">= 14.18 && < 15", ">= 16"],
      _stream_transform: ">= 0.9.4",
      "node:_stream_transform": [">= 14.18 && < 15", ">= 16"],
      _stream_wrap: ">= 1.4.1",
      "node:_stream_wrap": [">= 14.18 && < 15", ">= 16"],
      _stream_passthrough: ">= 0.9.4",
      "node:_stream_passthrough": [">= 14.18 && < 15", ">= 16"],
      _stream_readable: ">= 0.9.4",
      "node:_stream_readable": [">= 14.18 && < 15", ">= 16"],
      _stream_writable: ">= 0.9.4",
      "node:_stream_writable": [">= 14.18 && < 15", ">= 16"],
      stream: true,
      "node:stream": [">= 14.18 && < 15", ">= 16"],
      "stream/consumers": ">= 16.7",
      "node:stream/consumers": ">= 16.7",
      "stream/promises": ">= 15",
      "node:stream/promises": ">= 16",
      "stream/web": ">= 16.5",
      "node:stream/web": ">= 16.5",
      string_decoder: true,
      "node:string_decoder": [">= 14.18 && < 15", ">= 16"],
      sys: [">= 0.4 && < 0.7", ">= 0.8"],
      "node:sys": [">= 14.18 && < 15", ">= 16"],
      "test/reporters": ">= 19.9 && < 20.2",
      "node:test/reporters": [">= 18.17 && < 19", ">= 19.9", ">= 20"],
      "test/mock_loader": ">= 22.3 && < 22.7",
      "node:test/mock_loader": ">= 22.3 && < 22.7",
      "node:test": [">= 16.17 && < 17", ">= 18"],
      timers: true,
      "node:timers": [">= 14.18 && < 15", ">= 16"],
      "timers/promises": ">= 15",
      "node:timers/promises": ">= 16",
      _tls_common: ">= 0.11.13",
      "node:_tls_common": [">= 14.18 && < 15", ">= 16"],
      _tls_legacy: ">= 0.11.3 && < 10",
      _tls_wrap: ">= 0.11.3",
      "node:_tls_wrap": [">= 14.18 && < 15", ">= 16"],
      tls: true,
      "node:tls": [">= 14.18 && < 15", ">= 16"],
      trace_events: ">= 10",
      "node:trace_events": [">= 14.18 && < 15", ">= 16"],
      tty: true,
      "node:tty": [">= 14.18 && < 15", ">= 16"],
      url: true,
      "node:url": [">= 14.18 && < 15", ">= 16"],
      util: true,
      "node:util": [">= 14.18 && < 15", ">= 16"],
      "util/types": ">= 15.3",
      "node:util/types": ">= 16",
      "v8/tools/arguments": ">= 10 && < 12",
      "v8/tools/codemap": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/consarray": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/csvparser": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/logreader": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/profile_view": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/splaytree": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      v8: ">= 1",
      "node:v8": [">= 14.18 && < 15", ">= 16"],
      vm: true,
      "node:vm": [">= 14.18 && < 15", ">= 16"],
      wasi: [">= 13.4 && < 13.5", ">= 18.17 && < 19", ">= 20"],
      "node:wasi": [">= 18.17 && < 19", ">= 20"],
      worker_threads: ">= 11.7",
      "node:worker_threads": [">= 14.18 && < 15", ">= 16"],
      zlib: ">= 0.5",
      "node:zlib": [">= 14.18 && < 15", ">= 16"]
    };
  }
});

// node_modules/is-core-module/index.js
var require_is_core_module = __commonJS({
  "node_modules/is-core-module/index.js"(exports2, module2) {
    "use strict";
    var hasOwn = require_hasown();
    function specifierIncluded(current, specifier) {
      var nodeParts = current.split(".");
      var parts = specifier.split(" ");
      var op = parts.length > 1 ? parts[0] : "=";
      var versionParts = (parts.length > 1 ? parts[1] : parts[0]).split(".");
      for (var i = 0; i < 3; ++i) {
        var cur = parseInt(nodeParts[i] || 0, 10);
        var ver = parseInt(versionParts[i] || 0, 10);
        if (cur === ver) {
          continue;
        }
        if (op === "<") {
          return cur < ver;
        }
        if (op === ">=") {
          return cur >= ver;
        }
        return false;
      }
      return op === ">=";
    }
    function matchesRange(current, range) {
      var specifiers = range.split(/ ?&& ?/);
      if (specifiers.length === 0) {
        return false;
      }
      for (var i = 0; i < specifiers.length; ++i) {
        if (!specifierIncluded(current, specifiers[i])) {
          return false;
        }
      }
      return true;
    }
    function versionIncluded(nodeVersion, specifierValue) {
      if (typeof specifierValue === "boolean") {
        return specifierValue;
      }
      var current = typeof nodeVersion === "undefined" ? process.versions && process.versions.node : nodeVersion;
      if (typeof current !== "string") {
        throw new TypeError(typeof nodeVersion === "undefined" ? "Unable to determine current node version" : "If provided, a valid node version is required");
      }
      if (specifierValue && typeof specifierValue === "object") {
        for (var i = 0; i < specifierValue.length; ++i) {
          if (matchesRange(current, specifierValue[i])) {
            return true;
          }
        }
        return false;
      }
      return matchesRange(current, specifierValue);
    }
    var data = require_core();
    module2.exports = function isCore(x, nodeVersion) {
      return hasOwn(data, x) && versionIncluded(nodeVersion, data[x]);
    };
  }
});

// node_modules/resolve/lib/async.js
var require_async = __commonJS({
  "node_modules/resolve/lib/async.js"(exports2, module2) {
    var fs2 = require("fs");
    var getHomedir = require_homedir();
    var path7 = require("path");
    var caller = require_caller();
    var nodeModulesPaths = require_node_modules_paths();
    var normalizeOptions = require_normalize_options();
    var isCore = require_is_core_module();
    var realpathFS = process.platform !== "win32" && fs2.realpath && typeof fs2.realpath.native === "function" ? fs2.realpath.native : fs2.realpath;
    var homedir2 = getHomedir();
    var defaultPaths = function() {
      return [
        path7.join(homedir2, ".node_modules"),
        path7.join(homedir2, ".node_libraries")
      ];
    };
    var defaultIsFile = function isFile(file, cb) {
      fs2.stat(file, function(err2, stat) {
        if (!err2) {
          return cb(null, stat.isFile() || stat.isFIFO());
        }
        if (err2.code === "ENOENT" || err2.code === "ENOTDIR") return cb(null, false);
        return cb(err2);
      });
    };
    var defaultIsDir = function isDirectory(dir, cb) {
      fs2.stat(dir, function(err2, stat) {
        if (!err2) {
          return cb(null, stat.isDirectory());
        }
        if (err2.code === "ENOENT" || err2.code === "ENOTDIR") return cb(null, false);
        return cb(err2);
      });
    };
    var defaultRealpath = function realpath(x, cb) {
      realpathFS(x, function(realpathErr, realPath) {
        if (realpathErr && realpathErr.code !== "ENOENT") cb(realpathErr);
        else cb(null, realpathErr ? x : realPath);
      });
    };
    var maybeRealpath = function maybeRealpath2(realpath, x, opts, cb) {
      if (opts && opts.preserveSymlinks === false) {
        realpath(x, cb);
      } else {
        cb(null, x);
      }
    };
    var defaultReadPackage = function defaultReadPackage2(readFile, pkgfile, cb) {
      readFile(pkgfile, function(readFileErr, body) {
        if (readFileErr) cb(readFileErr);
        else {
          try {
            var pkg = JSON.parse(body);
            cb(null, pkg);
          } catch (jsonErr) {
            cb(null);
          }
        }
      });
    };
    var getPackageCandidates = function getPackageCandidates2(x, start2, opts) {
      var dirs = nodeModulesPaths(start2, opts, x);
      for (var i = 0; i < dirs.length; i++) {
        dirs[i] = path7.join(dirs[i], x);
      }
      return dirs;
    };
    module2.exports = function resolve3(x, options, callback) {
      var cb = callback;
      var opts = options;
      if (typeof options === "function") {
        cb = opts;
        opts = {};
      }
      if (typeof x !== "string") {
        var err2 = new TypeError("Path must be a string.");
        return process.nextTick(function() {
          cb(err2);
        });
      }
      opts = normalizeOptions(x, opts);
      var isFile = opts.isFile || defaultIsFile;
      var isDirectory = opts.isDirectory || defaultIsDir;
      var readFile = opts.readFile || fs2.readFile;
      var realpath = opts.realpath || defaultRealpath;
      var readPackage = opts.readPackage || defaultReadPackage;
      if (opts.readFile && opts.readPackage) {
        var conflictErr = new TypeError("`readFile` and `readPackage` are mutually exclusive.");
        return process.nextTick(function() {
          cb(conflictErr);
        });
      }
      var packageIterator = opts.packageIterator;
      var extensions = opts.extensions || [".js"];
      var includeCoreModules = opts.includeCoreModules !== false;
      var basedir = opts.basedir || path7.dirname(caller());
      var parent = opts.filename || basedir;
      opts.paths = opts.paths || defaultPaths();
      var absoluteStart = path7.resolve(basedir);
      maybeRealpath(
        realpath,
        absoluteStart,
        opts,
        function(err3, realStart) {
          if (err3) cb(err3);
          else init(realStart);
        }
      );
      var res;
      function init(basedir2) {
        if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) {
          res = path7.resolve(basedir2, x);
          if (x === "." || x === ".." || x.slice(-1) === "/") res += "/";
          if (/\/$/.test(x) && res === basedir2) {
            loadAsDirectory(res, opts.package, onfile);
          } else loadAsFile(res, opts.package, onfile);
        } else if (includeCoreModules && isCore(x)) {
          return cb(null, x);
        } else loadNodeModules(x, basedir2, function(err3, n, pkg) {
          if (err3) cb(err3);
          else if (n) {
            return maybeRealpath(realpath, n, opts, function(err4, realN) {
              if (err4) {
                cb(err4);
              } else {
                cb(null, realN, pkg);
              }
            });
          } else {
            var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
            moduleError.code = "MODULE_NOT_FOUND";
            cb(moduleError);
          }
        });
      }
      function onfile(err3, m, pkg) {
        if (err3) cb(err3);
        else if (m) cb(null, m, pkg);
        else loadAsDirectory(res, function(err4, d, pkg2) {
          if (err4) cb(err4);
          else if (d) {
            maybeRealpath(realpath, d, opts, function(err5, realD) {
              if (err5) {
                cb(err5);
              } else {
                cb(null, realD, pkg2);
              }
            });
          } else {
            var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
            moduleError.code = "MODULE_NOT_FOUND";
            cb(moduleError);
          }
        });
      }
      function loadAsFile(x2, thePackage, callback2) {
        var loadAsFilePackage = thePackage;
        var cb2 = callback2;
        if (typeof loadAsFilePackage === "function") {
          cb2 = loadAsFilePackage;
          loadAsFilePackage = void 0;
        }
        var exts = [""].concat(extensions);
        load(exts, x2, loadAsFilePackage);
        function load(exts2, x3, loadPackage) {
          if (exts2.length === 0) return cb2(null, void 0, loadPackage);
          var file = x3 + exts2[0];
          var pkg = loadPackage;
          if (pkg) onpkg(null, pkg);
          else loadpkg(path7.dirname(file), onpkg);
          function onpkg(err3, pkg_, dir) {
            pkg = pkg_;
            if (err3) return cb2(err3);
            if (dir && pkg && opts.pathFilter) {
              var rfile = path7.relative(dir, file);
              var rel = rfile.slice(0, rfile.length - exts2[0].length);
              var r = opts.pathFilter(pkg, x3, rel);
              if (r) return load(
                [""].concat(extensions.slice()),
                path7.resolve(dir, r),
                pkg
              );
            }
            isFile(file, onex);
          }
          function onex(err3, ex) {
            if (err3) return cb2(err3);
            if (ex) return cb2(null, file, pkg);
            load(exts2.slice(1), x3, pkg);
          }
        }
      }
      function loadpkg(dir, cb2) {
        if (dir === "" || dir === "/") return cb2(null);
        if (process.platform === "win32" && /^\w:[/\\]*$/.test(dir)) {
          return cb2(null);
        }
        if (/[/\\]node_modules[/\\]*$/.test(dir)) return cb2(null);
        maybeRealpath(realpath, dir, opts, function(unwrapErr2, pkgdir) {
          if (unwrapErr2) return loadpkg(path7.dirname(dir), cb2);
          var pkgfile = path7.join(pkgdir, "package.json");
          isFile(pkgfile, function(err3, ex) {
            if (!ex) return loadpkg(path7.dirname(dir), cb2);
            readPackage(readFile, pkgfile, function(err4, pkgParam) {
              if (err4) cb2(err4);
              var pkg = pkgParam;
              if (pkg && opts.packageFilter) {
                pkg = opts.packageFilter(pkg, pkgfile);
              }
              cb2(null, pkg, dir);
            });
          });
        });
      }
      function loadAsDirectory(x2, loadAsDirectoryPackage, callback2) {
        var cb2 = callback2;
        var fpkg = loadAsDirectoryPackage;
        if (typeof fpkg === "function") {
          cb2 = fpkg;
          fpkg = opts.package;
        }
        maybeRealpath(realpath, x2, opts, function(unwrapErr2, pkgdir) {
          if (unwrapErr2) return cb2(unwrapErr2);
          var pkgfile = path7.join(pkgdir, "package.json");
          isFile(pkgfile, function(err3, ex) {
            if (err3) return cb2(err3);
            if (!ex) return loadAsFile(path7.join(x2, "index"), fpkg, cb2);
            readPackage(readFile, pkgfile, function(err4, pkgParam) {
              if (err4) return cb2(err4);
              var pkg = pkgParam;
              if (pkg && opts.packageFilter) {
                pkg = opts.packageFilter(pkg, pkgfile);
              }
              if (pkg && pkg.main) {
                if (typeof pkg.main !== "string") {
                  var mainError = new TypeError("package \u201C" + pkg.name + "\u201D `main` must be a string");
                  mainError.code = "INVALID_PACKAGE_MAIN";
                  return cb2(mainError);
                }
                if (pkg.main === "." || pkg.main === "./") {
                  pkg.main = "index";
                }
                loadAsFile(path7.resolve(x2, pkg.main), pkg, function(err5, m, pkg2) {
                  if (err5) return cb2(err5);
                  if (m) return cb2(null, m, pkg2);
                  if (!pkg2) return loadAsFile(path7.join(x2, "index"), pkg2, cb2);
                  var dir = path7.resolve(x2, pkg2.main);
                  loadAsDirectory(dir, pkg2, function(err6, n, pkg3) {
                    if (err6) return cb2(err6);
                    if (n) return cb2(null, n, pkg3);
                    loadAsFile(path7.join(x2, "index"), pkg3, cb2);
                  });
                });
                return;
              }
              loadAsFile(path7.join(x2, "/index"), pkg, cb2);
            });
          });
        });
      }
      function processDirs(cb2, dirs) {
        if (dirs.length === 0) return cb2(null, void 0);
        var dir = dirs[0];
        isDirectory(path7.dirname(dir), isdir);
        function isdir(err3, isdir2) {
          if (err3) return cb2(err3);
          if (!isdir2) return processDirs(cb2, dirs.slice(1));
          loadAsFile(dir, opts.package, onfile2);
        }
        function onfile2(err3, m, pkg) {
          if (err3) return cb2(err3);
          if (m) return cb2(null, m, pkg);
          loadAsDirectory(dir, opts.package, ondir);
        }
        function ondir(err3, n, pkg) {
          if (err3) return cb2(err3);
          if (n) return cb2(null, n, pkg);
          processDirs(cb2, dirs.slice(1));
        }
      }
      function loadNodeModules(x2, start2, cb2) {
        var thunk = function() {
          return getPackageCandidates(x2, start2, opts);
        };
        processDirs(
          cb2,
          packageIterator ? packageIterator(x2, start2, thunk, opts) : thunk()
        );
      }
    };
  }
});

// node_modules/resolve/lib/core.json
var require_core2 = __commonJS({
  "node_modules/resolve/lib/core.json"(exports2, module2) {
    module2.exports = {
      assert: true,
      "node:assert": [">= 14.18 && < 15", ">= 16"],
      "assert/strict": ">= 15",
      "node:assert/strict": ">= 16",
      async_hooks: ">= 8",
      "node:async_hooks": [">= 14.18 && < 15", ">= 16"],
      buffer_ieee754: ">= 0.5 && < 0.9.7",
      buffer: true,
      "node:buffer": [">= 14.18 && < 15", ">= 16"],
      child_process: true,
      "node:child_process": [">= 14.18 && < 15", ">= 16"],
      cluster: ">= 0.5",
      "node:cluster": [">= 14.18 && < 15", ">= 16"],
      console: true,
      "node:console": [">= 14.18 && < 15", ">= 16"],
      constants: true,
      "node:constants": [">= 14.18 && < 15", ">= 16"],
      crypto: true,
      "node:crypto": [">= 14.18 && < 15", ">= 16"],
      _debug_agent: ">= 1 && < 8",
      _debugger: "< 8",
      dgram: true,
      "node:dgram": [">= 14.18 && < 15", ">= 16"],
      diagnostics_channel: [">= 14.17 && < 15", ">= 15.1"],
      "node:diagnostics_channel": [">= 14.18 && < 15", ">= 16"],
      dns: true,
      "node:dns": [">= 14.18 && < 15", ">= 16"],
      "dns/promises": ">= 15",
      "node:dns/promises": ">= 16",
      domain: ">= 0.7.12",
      "node:domain": [">= 14.18 && < 15", ">= 16"],
      events: true,
      "node:events": [">= 14.18 && < 15", ">= 16"],
      freelist: "< 6",
      fs: true,
      "node:fs": [">= 14.18 && < 15", ">= 16"],
      "fs/promises": [">= 10 && < 10.1", ">= 14"],
      "node:fs/promises": [">= 14.18 && < 15", ">= 16"],
      _http_agent: ">= 0.11.1",
      "node:_http_agent": [">= 14.18 && < 15", ">= 16"],
      _http_client: ">= 0.11.1",
      "node:_http_client": [">= 14.18 && < 15", ">= 16"],
      _http_common: ">= 0.11.1",
      "node:_http_common": [">= 14.18 && < 15", ">= 16"],
      _http_incoming: ">= 0.11.1",
      "node:_http_incoming": [">= 14.18 && < 15", ">= 16"],
      _http_outgoing: ">= 0.11.1",
      "node:_http_outgoing": [">= 14.18 && < 15", ">= 16"],
      _http_server: ">= 0.11.1",
      "node:_http_server": [">= 14.18 && < 15", ">= 16"],
      http: true,
      "node:http": [">= 14.18 && < 15", ">= 16"],
      http2: ">= 8.8",
      "node:http2": [">= 14.18 && < 15", ">= 16"],
      https: true,
      "node:https": [">= 14.18 && < 15", ">= 16"],
      inspector: ">= 8",
      "node:inspector": [">= 14.18 && < 15", ">= 16"],
      "inspector/promises": [">= 19"],
      "node:inspector/promises": [">= 19"],
      _linklist: "< 8",
      module: true,
      "node:module": [">= 14.18 && < 15", ">= 16"],
      net: true,
      "node:net": [">= 14.18 && < 15", ">= 16"],
      "node-inspect/lib/_inspect": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_client": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_repl": ">= 7.6 && < 12",
      os: true,
      "node:os": [">= 14.18 && < 15", ">= 16"],
      path: true,
      "node:path": [">= 14.18 && < 15", ">= 16"],
      "path/posix": ">= 15.3",
      "node:path/posix": ">= 16",
      "path/win32": ">= 15.3",
      "node:path/win32": ">= 16",
      perf_hooks: ">= 8.5",
      "node:perf_hooks": [">= 14.18 && < 15", ">= 16"],
      process: ">= 1",
      "node:process": [">= 14.18 && < 15", ">= 16"],
      punycode: ">= 0.5",
      "node:punycode": [">= 14.18 && < 15", ">= 16"],
      querystring: true,
      "node:querystring": [">= 14.18 && < 15", ">= 16"],
      readline: true,
      "node:readline": [">= 14.18 && < 15", ">= 16"],
      "readline/promises": ">= 17",
      "node:readline/promises": ">= 17",
      repl: true,
      "node:repl": [">= 14.18 && < 15", ">= 16"],
      "node:sea": [">= 20.12 && < 21", ">= 21.7"],
      smalloc: ">= 0.11.5 && < 3",
      "node:sqlite": ">= 23.4",
      _stream_duplex: ">= 0.9.4",
      "node:_stream_duplex": [">= 14.18 && < 15", ">= 16"],
      _stream_transform: ">= 0.9.4",
      "node:_stream_transform": [">= 14.18 && < 15", ">= 16"],
      _stream_wrap: ">= 1.4.1",
      "node:_stream_wrap": [">= 14.18 && < 15", ">= 16"],
      _stream_passthrough: ">= 0.9.4",
      "node:_stream_passthrough": [">= 14.18 && < 15", ">= 16"],
      _stream_readable: ">= 0.9.4",
      "node:_stream_readable": [">= 14.18 && < 15", ">= 16"],
      _stream_writable: ">= 0.9.4",
      "node:_stream_writable": [">= 14.18 && < 15", ">= 16"],
      stream: true,
      "node:stream": [">= 14.18 && < 15", ">= 16"],
      "stream/consumers": ">= 16.7",
      "node:stream/consumers": ">= 16.7",
      "stream/promises": ">= 15",
      "node:stream/promises": ">= 16",
      "stream/web": ">= 16.5",
      "node:stream/web": ">= 16.5",
      string_decoder: true,
      "node:string_decoder": [">= 14.18 && < 15", ">= 16"],
      sys: [">= 0.4 && < 0.7", ">= 0.8"],
      "node:sys": [">= 14.18 && < 15", ">= 16"],
      "test/reporters": ">= 19.9 && < 20.2",
      "node:test/reporters": [">= 18.17 && < 19", ">= 19.9", ">= 20"],
      "test/mock_loader": ">= 22.3 && < 22.7",
      "node:test/mock_loader": ">= 22.3 && < 22.7",
      "node:test": [">= 16.17 && < 17", ">= 18"],
      timers: true,
      "node:timers": [">= 14.18 && < 15", ">= 16"],
      "timers/promises": ">= 15",
      "node:timers/promises": ">= 16",
      _tls_common: ">= 0.11.13",
      "node:_tls_common": [">= 14.18 && < 15", ">= 16"],
      _tls_legacy: ">= 0.11.3 && < 10",
      _tls_wrap: ">= 0.11.3",
      "node:_tls_wrap": [">= 14.18 && < 15", ">= 16"],
      tls: true,
      "node:tls": [">= 14.18 && < 15", ">= 16"],
      trace_events: ">= 10",
      "node:trace_events": [">= 14.18 && < 15", ">= 16"],
      tty: true,
      "node:tty": [">= 14.18 && < 15", ">= 16"],
      url: true,
      "node:url": [">= 14.18 && < 15", ">= 16"],
      util: true,
      "node:util": [">= 14.18 && < 15", ">= 16"],
      "util/types": ">= 15.3",
      "node:util/types": ">= 16",
      "v8/tools/arguments": ">= 10 && < 12",
      "v8/tools/codemap": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/consarray": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/csvparser": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/logreader": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/profile_view": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/splaytree": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      v8: ">= 1",
      "node:v8": [">= 14.18 && < 15", ">= 16"],
      vm: true,
      "node:vm": [">= 14.18 && < 15", ">= 16"],
      wasi: [">= 13.4 && < 13.5", ">= 18.17 && < 19", ">= 20"],
      "node:wasi": [">= 18.17 && < 19", ">= 20"],
      worker_threads: ">= 11.7",
      "node:worker_threads": [">= 14.18 && < 15", ">= 16"],
      zlib: ">= 0.5",
      "node:zlib": [">= 14.18 && < 15", ">= 16"]
    };
  }
});

// node_modules/resolve/lib/core.js
var require_core3 = __commonJS({
  "node_modules/resolve/lib/core.js"(exports2, module2) {
    "use strict";
    var isCoreModule = require_is_core_module();
    var data = require_core2();
    var core = {};
    for (mod in data) {
      if (Object.prototype.hasOwnProperty.call(data, mod)) {
        core[mod] = isCoreModule(mod);
      }
    }
    var mod;
    module2.exports = core;
  }
});

// node_modules/resolve/lib/is-core.js
var require_is_core = __commonJS({
  "node_modules/resolve/lib/is-core.js"(exports2, module2) {
    var isCoreModule = require_is_core_module();
    module2.exports = function isCore(x) {
      return isCoreModule(x);
    };
  }
});

// node_modules/resolve/lib/sync.js
var require_sync = __commonJS({
  "node_modules/resolve/lib/sync.js"(exports2, module2) {
    var isCore = require_is_core_module();
    var fs2 = require("fs");
    var path7 = require("path");
    var getHomedir = require_homedir();
    var caller = require_caller();
    var nodeModulesPaths = require_node_modules_paths();
    var normalizeOptions = require_normalize_options();
    var realpathFS = process.platform !== "win32" && fs2.realpathSync && typeof fs2.realpathSync.native === "function" ? fs2.realpathSync.native : fs2.realpathSync;
    var homedir2 = getHomedir();
    var defaultPaths = function() {
      return [
        path7.join(homedir2, ".node_modules"),
        path7.join(homedir2, ".node_libraries")
      ];
    };
    var defaultIsFile = function isFile(file) {
      try {
        var stat = fs2.statSync(file, { throwIfNoEntry: false });
      } catch (e) {
        if (e && (e.code === "ENOENT" || e.code === "ENOTDIR")) return false;
        throw e;
      }
      return !!stat && (stat.isFile() || stat.isFIFO());
    };
    var defaultIsDir = function isDirectory(dir) {
      try {
        var stat = fs2.statSync(dir, { throwIfNoEntry: false });
      } catch (e) {
        if (e && (e.code === "ENOENT" || e.code === "ENOTDIR")) return false;
        throw e;
      }
      return !!stat && stat.isDirectory();
    };
    var defaultRealpathSync = function realpathSync(x) {
      try {
        return realpathFS(x);
      } catch (realpathErr) {
        if (realpathErr.code !== "ENOENT") {
          throw realpathErr;
        }
      }
      return x;
    };
    var maybeRealpathSync = function maybeRealpathSync2(realpathSync, x, opts) {
      if (opts && opts.preserveSymlinks === false) {
        return realpathSync(x);
      }
      return x;
    };
    var defaultReadPackageSync = function defaultReadPackageSync2(readFileSync, pkgfile) {
      var body = readFileSync(pkgfile);
      try {
        var pkg = JSON.parse(body);
        return pkg;
      } catch (jsonErr) {
      }
    };
    var getPackageCandidates = function getPackageCandidates2(x, start2, opts) {
      var dirs = nodeModulesPaths(start2, opts, x);
      for (var i = 0; i < dirs.length; i++) {
        dirs[i] = path7.join(dirs[i], x);
      }
      return dirs;
    };
    module2.exports = function resolveSync(x, options) {
      if (typeof x !== "string") {
        throw new TypeError("Path must be a string.");
      }
      var opts = normalizeOptions(x, options);
      var isFile = opts.isFile || defaultIsFile;
      var readFileSync = opts.readFileSync || fs2.readFileSync;
      var isDirectory = opts.isDirectory || defaultIsDir;
      var realpathSync = opts.realpathSync || defaultRealpathSync;
      var readPackageSync = opts.readPackageSync || defaultReadPackageSync;
      if (opts.readFileSync && opts.readPackageSync) {
        throw new TypeError("`readFileSync` and `readPackageSync` are mutually exclusive.");
      }
      var packageIterator = opts.packageIterator;
      var extensions = opts.extensions || [".js"];
      var includeCoreModules = opts.includeCoreModules !== false;
      var basedir = opts.basedir || path7.dirname(caller());
      var parent = opts.filename || basedir;
      opts.paths = opts.paths || defaultPaths();
      var absoluteStart = maybeRealpathSync(realpathSync, path7.resolve(basedir), opts);
      if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) {
        var res = path7.resolve(absoluteStart, x);
        if (x === "." || x === ".." || x.slice(-1) === "/") res += "/";
        var m = loadAsFileSync(res) || loadAsDirectorySync(res);
        if (m) return maybeRealpathSync(realpathSync, m, opts);
      } else if (includeCoreModules && isCore(x)) {
        return x;
      } else {
        var n = loadNodeModulesSync(x, absoluteStart);
        if (n) return maybeRealpathSync(realpathSync, n, opts);
      }
      var err2 = new Error("Cannot find module '" + x + "' from '" + parent + "'");
      err2.code = "MODULE_NOT_FOUND";
      throw err2;
      function loadAsFileSync(x2) {
        var pkg = loadpkg(path7.dirname(x2));
        if (pkg && pkg.dir && pkg.pkg && opts.pathFilter) {
          var rfile = path7.relative(pkg.dir, x2);
          var r = opts.pathFilter(pkg.pkg, x2, rfile);
          if (r) {
            x2 = path7.resolve(pkg.dir, r);
          }
        }
        if (isFile(x2)) {
          return x2;
        }
        for (var i = 0; i < extensions.length; i++) {
          var file = x2 + extensions[i];
          if (isFile(file)) {
            return file;
          }
        }
      }
      function loadpkg(dir) {
        if (dir === "" || dir === "/") return;
        if (process.platform === "win32" && /^\w:[/\\]*$/.test(dir)) {
          return;
        }
        if (/[/\\]node_modules[/\\]*$/.test(dir)) return;
        var pkgfile = path7.join(maybeRealpathSync(realpathSync, dir, opts), "package.json");
        if (!isFile(pkgfile)) {
          return loadpkg(path7.dirname(dir));
        }
        var pkg = readPackageSync(readFileSync, pkgfile);
        if (pkg && opts.packageFilter) {
          pkg = opts.packageFilter(
            pkg,
            /*pkgfile,*/
            dir
          );
        }
        return { pkg, dir };
      }
      function loadAsDirectorySync(x2) {
        var pkgfile = path7.join(maybeRealpathSync(realpathSync, x2, opts), "/package.json");
        if (isFile(pkgfile)) {
          try {
            var pkg = readPackageSync(readFileSync, pkgfile);
          } catch (e) {
          }
          if (pkg && opts.packageFilter) {
            pkg = opts.packageFilter(
              pkg,
              /*pkgfile,*/
              x2
            );
          }
          if (pkg && pkg.main) {
            if (typeof pkg.main !== "string") {
              var mainError = new TypeError("package \u201C" + pkg.name + "\u201D `main` must be a string");
              mainError.code = "INVALID_PACKAGE_MAIN";
              throw mainError;
            }
            if (pkg.main === "." || pkg.main === "./") {
              pkg.main = "index";
            }
            try {
              var m2 = loadAsFileSync(path7.resolve(x2, pkg.main));
              if (m2) return m2;
              var n2 = loadAsDirectorySync(path7.resolve(x2, pkg.main));
              if (n2) return n2;
            } catch (e) {
            }
          }
        }
        return loadAsFileSync(path7.join(x2, "/index"));
      }
      function loadNodeModulesSync(x2, start2) {
        var thunk = function() {
          return getPackageCandidates(x2, start2, opts);
        };
        var dirs = packageIterator ? packageIterator(x2, start2, thunk, opts) : thunk();
        for (var i = 0; i < dirs.length; i++) {
          var dir = dirs[i];
          if (isDirectory(path7.dirname(dir))) {
            var m2 = loadAsFileSync(dir);
            if (m2) return m2;
            var n2 = loadAsDirectorySync(dir);
            if (n2) return n2;
          }
        }
      }
    };
  }
});

// node_modules/resolve/index.js
var require_resolve = __commonJS({
  "node_modules/resolve/index.js"(exports2, module2) {
    var async = require_async();
    async.core = require_core3();
    async.isCore = require_is_core();
    async.sync = require_sync();
    module2.exports = async;
  }
});

// src/testing/index.ts
var index_exports = {};
__export(index_exports, {
  MockHeaders: () => import_mock_doc2.MockHeaders,
  MockRequest: () => import_mock_doc2.MockRequest,
  MockRequestInfo: () => import_mock_doc2.MockRequestInfo,
  MockRequestInit: () => import_mock_doc2.MockRequestInit,
  MockResponse: () => import_mock_doc2.MockResponse,
  MockResponseInit: () => import_mock_doc2.MockResponseInit,
  createTesting: () => createTesting,
  getCreateJestPuppeteerEnvironment: () => getCreateJestPuppeteerEnvironment,
  getCreateJestTestRunner: () => getCreateJestTestRunner,
  getJestPreprocessor: () => getJestPreprocessor,
  getJestPreset: () => getJestPreset,
  getJestSetupTestFramework: () => getJestSetupTestFramework,
  mockBuildCtx: () => mockBuildCtx,
  mockCompilerCtx: () => mockCompilerCtx,
  mockCompilerSystem: () => mockCompilerSystem,
  mockComponentMeta: () => mockComponentMeta,
  mockConfig: () => mockConfig,
  mockDocument: () => mockDocument,
  mockFetch: () => mockFetch,
  mockLoadConfigInit: () => mockLoadConfigInit,
  mockLogger: () => mockLogger,
  mockModule: () => mockModule,
  mockValidatedConfig: () => mockValidatedConfig,
  mockWindow: () => mockWindow,
  newE2EPage: () => newE2EPage,
  newSpecPage: () => newSpecPage,
  setupConsoleMocker: () => setupConsoleMocker,
  shuffleArray: () => shuffleArray,
  transpile: () => transpile
});
module.exports = __toCommonJS(index_exports);

// src/testing/jest/jest-stencil-connector.ts
var import_major2 = __toESM(require_major());

// src/testing/jest/jest-27-and-under/jest-environment.ts
var import_jest_environment_node = __toESM(require("jest-environment-node"));

// src/testing/puppeteer/puppeteer-browser.ts
var import_major = __toESM(require_major());
async function startPuppeteerBrowser(config) {
  if (!config.flags.e2e) {
    return null;
  }
  const env2 = process.env;
  const puppeteerDep = config.testing.browserExecutablePath ? "puppeteer-core" : "puppeteer";
  const puppeteerModulePath = config.sys.lazyRequire.getModulePath(config.rootDir, puppeteerDep);
  const puppeteerPackageJsonPath = config.sys.platformPath.join(puppeteerModulePath, "package.json");
  const puppeteer = config.sys.lazyRequire.require(config.rootDir, puppeteerModulePath);
  env2.__STENCIL_PUPPETEER_MODULE__ = puppeteerModulePath;
  try {
    const puppeteerManifest = config.sys.readFileSync(puppeteerPackageJsonPath, "utf8");
    const puppeteerPkgJson = JSON.parse(puppeteerManifest);
    env2.__STENCIL_PUPPETEER_VERSION__ = (0, import_major.default)(puppeteerPkgJson.version);
  } catch (e) {
    console.error(`An error occurred determining the version of Puppeteer installed:
${e}`);
    env2.__STENCIL_PUPPETEER_VERSION__ = void 0;
  }
  env2.__STENCIL_BROWSER_WAIT_UNTIL = config.testing.browserWaitUntil;
  if (config.flags.devtools) {
    env2.__STENCIL_E2E_DEVTOOLS__ = "true";
  }
  config.logger.debug(`puppeteer: ${puppeteerModulePath}`);
  config.logger.debug(`puppeteer headless: ${config.testing.browserHeadless}`);
  if (Array.isArray(config.testing.browserArgs)) {
    config.logger.debug(`puppeteer args: ${config.testing.browserArgs.join(" ")}`);
  }
  if (typeof config.testing.browserDevtools === "boolean") {
    config.logger.debug(`puppeteer devtools: ${config.testing.browserDevtools}`);
  }
  if (typeof config.testing.browserSlowMo === "number") {
    config.logger.debug(`puppeteer slowMo: ${config.testing.browserSlowMo}`);
  }
  const connectOpts = {
    slowMo: config.testing.browserSlowMo
  };
  let browser;
  if (config.testing.browserWSEndpoint) {
    browser = await puppeteer.connect({
      browserWSEndpoint: config.testing.browserWSEndpoint,
      ...connectOpts
    });
  } else {
    const launchOpts = {
      args: config.testing.browserArgs,
      channel: config.testing.browserChannel,
      headless: config.testing.browserHeadless,
      devtools: config.testing.browserDevtools,
      ...connectOpts
    };
    try {
      launchOpts.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_PATH || puppeteer.executablePath(launchOpts);
    } catch (_) {
      launchOpts.executablePath = puppeteer.executablePath(launchOpts.channel);
    }
    browser = await puppeteer.launch({ ...launchOpts });
  }
  env2.__STENCIL_BROWSER_WS_ENDPOINT__ = browser.wsEndpoint();
  config.logger.debug(`puppeteer browser wsEndpoint: ${env2.__STENCIL_BROWSER_WS_ENDPOINT__}`);
  return browser;
}
async function connectBrowser() {
  const env2 = process.env;
  const wsEndpoint = env2.__STENCIL_BROWSER_WS_ENDPOINT__;
  if (!wsEndpoint) {
    return null;
  }
  const connectOpts = {
    browserWSEndpoint: wsEndpoint
  };
  const puppeteer = require(env2.__STENCIL_PUPPETEER_MODULE__);
  return await puppeteer.connect(connectOpts);
}
async function disconnectBrowser(browser) {
  if (browser) {
    try {
      browser.disconnect();
    } catch (e) {
    }
  }
}
function newBrowserPage(browser) {
  return browser.newPage();
}

// src/testing/jest/jest-27-and-under/jest-environment.ts
function createJestPuppeteerEnvironment() {
  const JestEnvironment = class extends import_jest_environment_node.default {
    browser;
    pages;
    constructor(config) {
      super(config);
      this.browser = null;
      this.pages = [];
    }
    async setup() {
      if (process.env.__STENCIL_E2E_TESTS__ === "true") {
        const globalContext = this.global;
        globalContext.__NEW_TEST_PAGE__ = this.newPuppeteerPage.bind(this);
        globalContext.__CLOSE_OPEN_PAGES__ = this.closeOpenPages.bind(this);
      }
    }
    async newPuppeteerPage() {
      if (!this.browser) {
        this.browser = await connectBrowser();
      }
      await this.closeOpenPages();
      const page = await newBrowserPage(this.browser);
      this.pages.push(page);
      const env2 = process.env;
      if (typeof env2.__STENCIL_DEFAULT_TIMEOUT__ === "string") {
        page.setDefaultTimeout(parseInt(env2.__STENCIL_DEFAULT_TIMEOUT__, 10));
      }
      return page;
    }
    async closeOpenPages() {
      await Promise.all(this.pages.filter((page) => !page.isClosed()).map((page) => page.close()));
      this.pages.length = 0;
    }
    async teardown() {
      await super.teardown();
      await this.closeOpenPages();
      await disconnectBrowser(this.browser);
      this.browser = null;
    }
    getVmContext() {
      return super.getVmContext();
    }
  };
  return JestEnvironment;
}

// src/testing/jest/jest-27-and-under/jest-preprocessor.ts
var import_compiler2 = require("../compiler/stencil.js");

// src/utils/constants.ts
var COPY = "copy";
var CUSTOM = "custom";
var DIST = "dist";
var DIST_COLLECTION = "dist-collection";
var DIST_CUSTOM_ELEMENTS = "dist-custom-elements";
var DIST_TYPES = "dist-types";
var DIST_HYDRATE_SCRIPT = "dist-hydrate-script";
var DIST_LAZY = "dist-lazy";
var DIST_LAZY_LOADER = "dist-lazy-loader";
var DIST_GLOBAL_STYLES = "dist-global-styles";
var DOCS_CUSTOM = "docs-custom";
var DOCS_JSON = "docs-json";
var DOCS_README = "docs-readme";
var DOCS_VSCODE = "docs-vscode";
var DOCS_CUSTOM_ELEMENTS_MANIFEST = "docs-custom-elements-manifest";
var STATS = "stats";
var WWW = "www";
var VALID_CONFIG_OUTPUT_TARGETS = [
  // DIST
  WWW,
  DIST,
  DIST_COLLECTION,
  DIST_CUSTOM_ELEMENTS,
  DIST_LAZY,
  DIST_HYDRATE_SCRIPT,
  // DOCS
  DOCS_JSON,
  DOCS_README,
  DOCS_VSCODE,
  DOCS_CUSTOM,
  DOCS_CUSTOM_ELEMENTS_MANIFEST,
  // MISC
  COPY,
  CUSTOM,
  STATS
];
var GENERATED_DTS = "components.d.ts";

// src/utils/format-component-runtime-meta.ts
var formatLazyBundleRuntimeMeta = (bundleId, cmps) => {
  return [bundleId, cmps.map((cmp) => formatComponentRuntimeMeta(cmp, true))];
};
var formatComponentRuntimeMeta = (compilerMeta, includeMethods) => {
  let flags = 0;
  if (compilerMeta.encapsulation === "shadow") {
    flags |= 1 /* shadowDomEncapsulation */;
    if (compilerMeta.shadowDelegatesFocus) {
      flags |= 16 /* shadowDelegatesFocus */;
    }
    if (compilerMeta.slotAssignment === "manual") {
      flags |= 1024 /* shadowSlotAssignmentManual */;
    }
  } else if (compilerMeta.encapsulation === "scoped") {
    flags |= 2 /* scopedCssEncapsulation */;
  }
  if (compilerMeta.formAssociated) {
    flags |= 64 /* formAssociated */;
  }
  if (compilerMeta.encapsulation !== "shadow" && compilerMeta.htmlTagNames.includes("slot")) {
    flags |= 4 /* hasSlotRelocation */;
  }
  if (compilerMeta.hasSlot) {
    flags |= 256 /* hasSlot */;
  }
  if (compilerMeta.hasMode) {
    flags |= 32 /* hasMode */;
  }
  if (compilerMeta.hasModernPropertyDecls) {
    flags |= 512 /* hasModernPropertyDecls */;
  }
  const members = formatComponentRuntimeMembers(compilerMeta, includeMethods);
  const hostListeners = formatHostListeners(compilerMeta);
  const watchers = formatComponentRuntimeReactiveHandlers(compilerMeta, "watchers");
  const serializers = formatComponentRuntimeReactiveHandlers(compilerMeta, "serializers");
  const deserializers = formatComponentRuntimeReactiveHandlers(compilerMeta, "deserializers");
  return trimFalsy([
    flags,
    compilerMeta.tagName,
    Object.keys(members).length > 0 ? members : void 0,
    hostListeners.length > 0 ? hostListeners : void 0,
    Object.keys(watchers).length > 0 ? watchers : void 0,
    Object.keys(serializers).length > 0 ? serializers : void 0,
    Object.keys(deserializers).length > 0 ? deserializers : void 0
  ]);
};
var formatComponentRuntimeReactiveHandlers = (compilerMeta, decorator) => {
  var _a2;
  const handlers = {};
  (_a2 = compilerMeta[decorator]) == null ? void 0 : _a2.forEach(({ propName, methodName, handlerOptions }) => {
    var _a3;
    let watcherFlags = 0;
    if (handlerOptions == null ? void 0 : handlerOptions.immediate) {
      watcherFlags |= 1 /* Immediate */;
    }
    handlers[propName] = [...(_a3 = handlers[propName]) != null ? _a3 : [], { [methodName]: watcherFlags }];
  });
  return handlers;
};
var formatComponentRuntimeMembers = (compilerMeta, includeMethods = true) => {
  return {
    ...formatPropertiesRuntimeMember(compilerMeta.properties),
    ...formatStatesRuntimeMember(compilerMeta.states),
    ...includeMethods ? formatMethodsRuntimeMember(compilerMeta.methods) : {}
  };
};
var formatPropertiesRuntimeMember = (properties) => {
  const runtimeMembers = {};
  properties.forEach((member) => {
    runtimeMembers[member.name] = trimFalsy([
      /**
       * [0] member type
       */
      formatFlags(member),
      formatAttrName(member)
    ]);
  });
  return runtimeMembers;
};
var formatFlags = (compilerProperty) => {
  let type = formatPropType(compilerProperty.type);
  if (compilerProperty.mutable) {
    type |= 1024 /* Mutable */;
  }
  if (compilerProperty.reflect) {
    type |= 512 /* ReflectAttr */;
  }
  if (compilerProperty.getter) {
    type |= 2048 /* Getter */;
  }
  if (compilerProperty.setter) {
    type |= 4096 /* Setter */;
  }
  return type;
};
var kebabCaseSupportForTypes = ["string", "unknown"];
var formatAttrName = (compilerProperty) => {
  if (kebabCaseSupportForTypes.includes(typeof compilerProperty.attribute)) {
    if (compilerProperty.name === compilerProperty.attribute) {
      return void 0;
    }
    return compilerProperty.attribute;
  }
  return void 0;
};
var formatPropType = (type) => {
  if (type === "string") {
    return 1 /* String */;
  }
  if (type === "number") {
    return 2 /* Number */;
  }
  if (type === "boolean") {
    return 4 /* Boolean */;
  }
  if (type === "any") {
    return 8 /* Any */;
  }
  return 16 /* Unknown */;
};
var formatStatesRuntimeMember = (states) => {
  const runtimeMembers = {};
  states.forEach((member) => {
    runtimeMembers[member.name] = [
      /**
       * [0] member flags
       */
      32 /* State */
    ];
  });
  return runtimeMembers;
};
var formatMethodsRuntimeMember = (methods) => {
  const runtimeMembers = {};
  methods.forEach((member) => {
    runtimeMembers[member.name] = [
      /**
       * [0] member flags
       */
      64 /* Method */
    ];
  });
  return runtimeMembers;
};
var formatHostListeners = (compilerMeta) => {
  return compilerMeta.listeners.map((compilerListener) => {
    const hostListener = [
      computeListenerFlags(compilerListener),
      compilerListener.name,
      compilerListener.method
    ];
    return hostListener;
  });
};
var computeListenerFlags = (listener) => {
  let flags = 0;
  if (listener.capture) {
    flags |= 2 /* Capture */;
  }
  if (listener.passive) {
    flags |= 1 /* Passive */;
  }
  switch (listener.target) {
    case "document":
      flags |= 4 /* TargetDocument */;
      break;
    case "window":
      flags |= 8 /* TargetWindow */;
      break;
    case "body":
      flags |= 16 /* TargetBody */;
      break;
    case "parent":
      flags |= 32 /* TargetParent */;
      break;
  }
  return flags;
};
var trimFalsy = (data) => {
  const arr = data;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i]) {
      break;
    }
    arr.pop();
  }
  return arr;
};

// src/utils/helpers.ts
var dashToPascalCase = (str) => str.toLowerCase().split("-").map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1)).join("");
var noop = () => {
};
var sortBy = (array, prop) => {
  return array.slice().sort((a, b) => {
    const nameA = prop(a);
    const nameB = prop(b);
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
};
var unique = (array, predicate = (i) => i) => {
  const set = /* @__PURE__ */ new Set();
  return array.filter((item) => {
    const key = predicate(item);
    if (key == null) {
      return true;
    }
    if (set.has(key)) {
      return false;
    }
    set.add(key);
    return true;
  });
};
var pluck = (obj, keys) => {
  return keys.reduce(
    (final, key) => {
      if (obj[key]) {
        final[key] = obj[key];
      }
      return final;
    },
    {}
  );
};
var isDefined = (v) => v !== null && v !== void 0;
var isBoolean = (v) => typeof v === "boolean";
var isFunction = (v) => typeof v === "function";
var isNumber = (v) => typeof v === "number";
var isObject = (val) => val != null && typeof val === "object" && Array.isArray(val) === false;
var isString = (v) => typeof v === "string";
var isIterable = (v) => isDefined(v) && isFunction(v[Symbol.iterator]);

// src/utils/is-root-path.ts
var isRootPath = (p) => p === "/" || windowsPathRegex.test(p);
var windowsPathRegex = /^(?:[a-zA-Z]:|[\\/]{2}[^\\/]+[\\/]+[^\\/]+)?[\\/]$/;

// src/utils/message-utils.ts
var buildError = (diagnostics) => {
  const diagnostic = {
    level: "error",
    type: "build",
    header: "Build Error",
    messageText: "build error",
    relFilePath: void 0,
    absFilePath: void 0,
    lines: []
  };
  if (diagnostics) {
    diagnostics.push(diagnostic);
  }
  return diagnostic;
};
var buildWarn = (diagnostics) => {
  const diagnostic = {
    level: "warn",
    type: "build",
    header: "Build Warn",
    messageText: "build warn",
    lines: []
  };
  diagnostics.push(diagnostic);
  return diagnostic;
};
var catchError = (diagnostics, err2, msg) => {
  const diagnostic = {
    level: "error",
    type: "build",
    header: "Build Error",
    messageText: "build error",
    lines: []
  };
  if (isString(msg)) {
    diagnostic.messageText = msg.length ? msg : "UNKNOWN ERROR";
  } else if (err2 != null) {
    if (err2.stack != null) {
      diagnostic.messageText = err2.stack.toString();
    } else {
      if (err2.message != null) {
        diagnostic.messageText = err2.message.length ? err2.message : "UNKNOWN ERROR";
      } else {
        diagnostic.messageText = err2.toString();
      }
    }
  }
  if (diagnostics != null && !shouldIgnoreError(diagnostic.messageText)) {
    diagnostics.push(diagnostic);
  }
  return diagnostic;
};
var hasError = (diagnostics) => {
  if (diagnostics == null || diagnostics.length === 0) {
    return false;
  }
  return diagnostics.some((d) => d.level === "error" && d.type !== "runtime");
};
var hasWarning = (diagnostics) => {
  if (diagnostics == null || diagnostics.length === 0) {
    return false;
  }
  return diagnostics.some((d) => d.level === "warn");
};
var shouldIgnoreError = (msg) => {
  return msg === TASK_CANCELED_MSG;
};
var TASK_CANCELED_MSG = `task canceled`;

// src/utils/logger/logger-utils.ts
var splitLineBreaks = (sourceText) => {
  if (typeof sourceText !== "string") return [];
  sourceText = sourceText.replace(/\\r/g, "\n");
  return sourceText.split("\n");
};

// src/utils/path.ts
var import_path = __toESM(require("path"));
var normalizePath = (path7, relativize = true) => {
  if (typeof path7 !== "string") {
    throw new Error(`invalid path to normalize`);
  }
  path7 = normalizeSlashes(path7.trim());
  const components = pathComponents(path7, getRootLength(path7));
  const reducedComponents = reducePathComponents(components);
  const rootPart = reducedComponents[0];
  const secondPart = reducedComponents[1];
  const normalized = rootPart + reducedComponents.slice(1).join("/");
  if (normalized === "") {
    return ".";
  }
  if (rootPart === "" && secondPart && path7.includes("/") && !secondPart.startsWith(".") && !secondPart.startsWith("@") && relativize) {
    return "./" + normalized;
  }
  return normalized;
};
var normalizeSlashes = (path7) => path7.replace(backslashRegExp, "/");
var altDirectorySeparator = "\\";
var urlSchemeSeparator = "://";
var backslashRegExp = /\\/g;
var reducePathComponents = (components) => {
  if (!Array.isArray(components) || components.length === 0) {
    return [];
  }
  const reduced = [components[0]];
  for (let i = 1; i < components.length; i++) {
    const component = components[i];
    if (!component) continue;
    if (component === ".") continue;
    if (component === "..") {
      if (reduced.length > 1) {
        if (reduced[reduced.length - 1] !== "..") {
          reduced.pop();
          continue;
        }
      } else if (reduced[0]) continue;
    }
    reduced.push(component);
  }
  return reduced;
};
var getRootLength = (path7) => {
  const rootLength = getEncodedRootLength(path7);
  return rootLength < 0 ? ~rootLength : rootLength;
};
var getEncodedRootLength = (path7) => {
  if (!path7) return 0;
  const ch0 = path7.charCodeAt(0);
  if (ch0 === 47 /* slash */ || ch0 === 92 /* backslash */) {
    if (path7.charCodeAt(1) !== ch0) return 1;
    const p1 = path7.indexOf(ch0 === 47 /* slash */ ? "/" : altDirectorySeparator, 2);
    if (p1 < 0) return path7.length;
    return p1 + 1;
  }
  if (isVolumeCharacter(ch0) && path7.charCodeAt(1) === 58 /* colon */) {
    const ch2 = path7.charCodeAt(2);
    if (ch2 === 47 /* slash */ || ch2 === 92 /* backslash */) return 3;
    if (path7.length === 2) return 2;
  }
  const schemeEnd = path7.indexOf(urlSchemeSeparator);
  if (schemeEnd !== -1) {
    const authorityStart = schemeEnd + urlSchemeSeparator.length;
    const authorityEnd = path7.indexOf("/", authorityStart);
    if (authorityEnd !== -1) {
      const scheme = path7.slice(0, schemeEnd);
      const authority = path7.slice(authorityStart, authorityEnd);
      if (scheme === "file" && (authority === "" || authority === "localhost") && isVolumeCharacter(path7.charCodeAt(authorityEnd + 1))) {
        const volumeSeparatorEnd = getFileUrlVolumeSeparatorEnd(path7, authorityEnd + 2);
        if (volumeSeparatorEnd !== -1) {
          if (path7.charCodeAt(volumeSeparatorEnd) === 47 /* slash */) {
            return ~(volumeSeparatorEnd + 1);
          }
          if (volumeSeparatorEnd === path7.length) {
            return ~volumeSeparatorEnd;
          }
        }
      }
      return ~(authorityEnd + 1);
    }
    return ~path7.length;
  }
  return 0;
};
var isVolumeCharacter = (charCode) => charCode >= 97 /* a */ && charCode <= 122 /* z */ || charCode >= 65 /* A */ && charCode <= 90 /* Z */;
var getFileUrlVolumeSeparatorEnd = (url, start2) => {
  const ch0 = url.charCodeAt(start2);
  if (ch0 === 58 /* colon */) return start2 + 1;
  if (ch0 === 37 /* percent */ && url.charCodeAt(start2 + 1) === 51 /* _3 */) {
    const ch2 = url.charCodeAt(start2 + 2);
    if (ch2 === 97 /* a */ || ch2 === 65 /* A */) return start2 + 3;
  }
  return -1;
};
var pathComponents = (path7, rootLength) => {
  const root = path7.substring(0, rootLength);
  const rest = path7.substring(rootLength).split("/");
  const restLen = rest.length;
  if (restLen > 0 && !rest[restLen - 1]) {
    rest.pop();
  }
  return [root, ...rest];
};
var normalizeFsPath = (p) => normalizePath(p.split("?")[0].replace(/\0/g, ""));
function relative(from, to) {
  return normalizePath(import_path.default.relative(from, to), false);
}
function join(...paths) {
  return normalizePath(import_path.default.join(...paths), false);
}
function resolve(...paths) {
  return normalizePath(import_path.default.resolve(...paths), false);
}

// src/utils/logger/logger-typescript.ts
var loadTypeScriptDiagnostic = (tsDiagnostic) => {
  var _a2;
  const d = {
    absFilePath: void 0,
    code: tsDiagnostic.code.toString(),
    columnNumber: void 0,
    header: "TypeScript",
    language: "typescript",
    level: "warn",
    lineNumber: void 0,
    lines: [],
    messageText: flattenDiagnosticMessageText(tsDiagnostic, tsDiagnostic.messageText),
    relFilePath: void 0,
    type: "typescript"
  };
  if (tsDiagnostic.category === 1) {
    d.level = "error";
  }
  if (tsDiagnostic.file && typeof tsDiagnostic.start === "number") {
    d.absFilePath = tsDiagnostic.file.fileName;
    const sourceText = tsDiagnostic.file.text;
    const srcLines = splitLineBreaks(sourceText);
    const posData = tsDiagnostic.file.getLineAndCharacterOfPosition(tsDiagnostic.start);
    const errorLine = {
      lineIndex: posData.line,
      lineNumber: posData.line + 1,
      text: srcLines[posData.line],
      errorCharStart: posData.character,
      errorLength: Math.max((_a2 = tsDiagnostic.length) != null ? _a2 : 0, 1)
    };
    d.lineNumber = errorLine.lineNumber;
    d.columnNumber = errorLine.errorCharStart + 1;
    d.lines.push(errorLine);
    if (errorLine.errorLength === 0 && errorLine.errorCharStart > 0) {
      errorLine.errorLength = 1;
      errorLine.errorCharStart--;
    }
    if (errorLine.lineIndex > 0) {
      const previousLine = {
        lineIndex: errorLine.lineIndex - 1,
        lineNumber: errorLine.lineNumber - 1,
        text: srcLines[errorLine.lineIndex - 1],
        errorCharStart: -1,
        errorLength: -1
      };
      d.lines.unshift(previousLine);
    }
    if (errorLine.lineIndex + 1 < srcLines.length) {
      const nextLine = {
        lineIndex: errorLine.lineIndex + 1,
        lineNumber: errorLine.lineNumber + 1,
        text: srcLines[errorLine.lineIndex + 1],
        errorCharStart: -1,
        errorLength: -1
      };
      d.lines.push(nextLine);
    }
  }
  return d;
};
var flattenDiagnosticMessageText = (tsDiagnostic, diag) => {
  var _a2, _b;
  if (typeof diag === "string") {
    return diag;
  } else if (diag === void 0) {
    return "";
  }
  const ignoreCodes = [];
  const isStencilConfig = ((_b = (_a2 = tsDiagnostic.file) == null ? void 0 : _a2.fileName) != null ? _b : "").includes("stencil.config");
  if (isStencilConfig) {
    ignoreCodes.push(2322);
  }
  let result2 = "";
  if (!ignoreCodes.includes(diag.code)) {
    result2 = diag.messageText;
    if (isIterable(diag.next)) {
      for (const kid of diag.next) {
        result2 += flattenDiagnosticMessageText(tsDiagnostic, kid);
      }
    }
  }
  if (isStencilConfig) {
    result2 = result2.replace(`type 'StencilConfig'`, `Stencil Config`);
    result2 = result2.replace(`Object literal may only specify known properties, but `, ``);
    result2 = result2.replace(`Object literal may only specify known properties, and `, ``);
  }
  return result2.trim();
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
  let i = pos + 1;
  let sawStart = false;
  let uflag = false;
  let escaping = false;
  let negate = false;
  let endPos = pos;
  let rangeStart = "";
  WHILE: while (i < glob.length) {
    const c = glob.charAt(i);
    if ((c === "!" || c === "^") && i === pos + 1) {
      negate = true;
      i++;
      continue;
    }
    if (c === "]" && sawStart && !escaping) {
      endPos = i + 1;
      break;
    }
    sawStart = true;
    if (c === "\\") {
      if (!escaping) {
        escaping = true;
        i++;
        continue;
      }
    }
    if (c === "[" && !escaping) {
      for (const [cls, [unip, u, neg]] of Object.entries(posixClasses)) {
        if (glob.startsWith(cls, i)) {
          if (rangeStart) {
            return ["$.", false, glob.length - pos, true];
          }
          i += cls.length;
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
      i++;
      continue;
    }
    if (glob.startsWith("-]", i + 1)) {
      ranges.push(braceEscape(c + "-"));
      i += 2;
      continue;
    }
    if (glob.startsWith("-", i + 1)) {
      rangeStart = c;
      i += 2;
      continue;
    }
    ranges.push(braceEscape(c));
    i++;
  }
  if (endPos < i) {
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
var unescape2 = (s, { windowsPathsNoEscape = false } = {}) => {
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
    for (let i = 0; i < __privateGet(this, _parentIndex); i++) {
      const pp = __privateGet(p, _parts)[i];
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
      let start3 = "";
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
            start3 = needNoTrav ? startNoTraversal : needNoDot ? startNoDot : "";
          }
        }
      }
      let end = "";
      if (this.isEnd() && __privateGet(__privateGet(this, _root), _filledNegs) && ((_a2 = __privateGet(this, _parent)) == null ? void 0 : _a2.type) === "!") {
        end = "(?:$|\\/)";
      }
      const final2 = start3 + src + end;
      return [
        final2,
        unescape2(src),
        __privateSet(this, _hasMagic, !!__privateGet(this, _hasMagic)),
        __privateGet(this, _uflag)
      ];
    }
    const repeated = this.type === "*" || this.type === "+";
    const start2 = this.type === "!" ? "(?:(?!(?:" : "(?:";
    let body = __privateMethod(this, _AST_instances, partsToRegExp_fn).call(this, dot);
    if (this.isStart() && this.isEnd() && !body && this.type !== "!") {
      const s = this.toString();
      const me = this;
      __privateSet(me, _parts, [s]);
      me.type = null;
      __privateSet(me, _hasMagic, void 0);
      return [s, unescape2(this.toString()), false, false];
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
      final = start2 + body + close;
    }
    return [
      final,
      unescape2(body),
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
      for (let i = __privateGet(p, _parentIndex) + 1; !pp.type && i < __privateGet(pp, _parts).length; i++) {
        for (const part of __privateGet(n, _parts)) {
          if (typeof part === "string") {
            throw new Error("string part in extglob AST??");
          }
          part.copyIn(__privateGet(pp, _parts)[i]);
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
    let i2 = pos;
    let acc2 = "";
    while (i2 < str.length) {
      const c = str.charAt(i2++);
      if (escaping || c === "\\") {
        escaping = !escaping;
        acc2 += c;
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
        acc2 += c;
        continue;
      } else if (c === "[") {
        inBrace = true;
        braceStart = i2;
        braceNeg = false;
        acc2 += c;
        continue;
      }
      const doRecurse = !opt.noext && isExtglobType(c) && str.charAt(i2) === "(" && extDepth <= maxDepth;
      if (doRecurse) {
        ast.push(acc2);
        acc2 = "";
        const ext2 = new _a(c, ast);
        i2 = __privateMethod(_b = _a, _AST_static, parseAST_fn).call(_b, str, ext2, i2, opt, extDepth + 1);
        ast.push(ext2);
        continue;
      }
      acc2 += c;
    }
    ast.push(acc2);
    return i2;
  }
  let i = pos + 1;
  let part = new _a(null, ast);
  const parts = [];
  let acc = "";
  while (i < str.length) {
    const c = str.charAt(i++);
    if (escaping || c === "\\") {
      escaping = !escaping;
      acc += c;
      continue;
    }
    if (inBrace) {
      if (i === braceStart + 1) {
        if (c === "^" || c === "!") {
          braceNeg = true;
        }
      } else if (c === "]" && !(i === braceStart + 2 && braceNeg)) {
        inBrace = false;
      }
      acc += c;
      continue;
    } else if (c === "[") {
      inBrace = true;
      braceStart = i;
      braceNeg = false;
      acc += c;
      continue;
    }
    const doRecurse = isExtglobType(c) && str.charAt(i) === "(" && /* c8 ignore start - the maxDepth is sufficient here */
    (extDepth <= maxDepth || ast && __privateMethod(_c = ast, _AST_instances, canAdoptType_fn).call(_c, c));
    if (doRecurse) {
      const depthAdd = ast && __privateMethod(_d = ast, _AST_instances, canAdoptType_fn).call(_d, c) ? 0 : 1;
      part.push(acc);
      acc = "";
      const ext2 = new _a(c, part);
      part.push(ext2);
      i = __privateMethod(_e = _a, _AST_static, parseAST_fn).call(_e, str, ext2, i, opt, extDepth + depthAdd);
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
      return i;
    }
    acc += c;
  }
  ast.type = null;
  __privateSet(ast, _hasMagic, void 0);
  __privateSet(ast, _parts, [str.substring(pos - 1)]);
  return i;
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
      for (let i = 0; i < __privateGet(this, _parts).length; i++) {
        const c = __privateGet(this, _parts)[i];
        if (typeof c === "object") {
          __privateMethod(_b = c, _AST_instances, flatten_fn).call(_b);
          if (__privateMethod(this, _AST_instances, canAdopt_fn).call(this, c)) {
            done = false;
            __privateMethod(this, _AST_instances, adopt_fn).call(this, c, i);
          } else if (__privateMethod(this, _AST_instances, canAdoptWithSpace_fn).call(this, c)) {
            done = false;
            __privateMethod(this, _AST_instances, adoptWithSpace_fn).call(this, c, i);
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
  for (let i = 0; i < glob.length; i++) {
    const c = glob.charAt(i);
    if (escaping) {
      escaping = false;
      re += (reSpecials.has(c) ? "\\" : "") + c;
      inStar = false;
      continue;
    }
    if (c === "\\") {
      if (i === glob.length - 1) {
        re += "\\\\";
      } else {
        escaping = true;
      }
      continue;
    }
    if (c === "[") {
      const [src, needUflag, consumed, magic] = parseClass(glob, i);
      if (consumed) {
        re += src;
        uflag = uflag || needUflag;
        i += consumed - 1;
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
  return [re, unescape2(glob), !!hasMagic, uflag];
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
var path2 = {
  win32: { sep: "\\" },
  posix: { sep: "/" }
};
var sep = defaultPlatform === "win32" ? path2.win32.sep : path2.posix.sep;
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
      for (let i = 0; i < this.set.length; i++) {
        const p = this.set[i];
        if (p[0] === "" && p[1] === "" && this.globParts[i][2] === "?" && typeof p[3] === "string" && /^[a-z]:$/i.test(p[3])) {
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
      for (let i = 0; i < globParts.length; i++) {
        for (let j = 0; j < globParts[i].length; j++) {
          if (globParts[i][j] === "**") {
            globParts[i][j] = "*";
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
        let i = gs;
        while (parts[i + 1] === "**") {
          i++;
        }
        if (i !== gs) {
          parts.splice(gs, i - gs);
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
        for (let i = 1; i < parts.length - 1; i++) {
          const p = parts[i];
          if (i === 1 && p === "" && parts[0] === "")
            continue;
          if (p === "." || p === "") {
            didSomething = true;
            parts.splice(i, 1);
            i--;
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
          for (let i = 1; i < parts.length - 1; i++) {
            const p = parts[i];
            if (i === 1 && p === "" && parts[0] === "")
              continue;
            if (p === "." || p === "") {
              didSomething = true;
              parts.splice(i, 1);
              i--;
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
    for (let i = 0; i < globParts.length - 1; i++) {
      for (let j = i + 1; j < globParts.length; j++) {
        const matched = this.partsMatch(globParts[i], globParts[j], !this.preserveMultipleSlashes);
        if (matched) {
          globParts[i] = [];
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
    let result2 = [];
    let which = "";
    while (ai < a.length && bi < b.length) {
      if (a[ai] === b[bi]) {
        result2.push(which === "b" ? b[bi] : a[ai]);
        ai++;
        bi++;
      } else if (emptyGSMatch && a[ai] === "**" && b[bi] === a[ai + 1]) {
        result2.push(a[ai]);
        ai++;
      } else if (emptyGSMatch && b[bi] === "**" && a[ai] === b[bi + 1]) {
        result2.push(b[bi]);
        bi++;
      } else if (a[ai] === "*" && b[bi] && (this.options.dot || !b[bi].startsWith(".")) && b[bi] !== "**") {
        if (which === "b")
          return false;
        which = "a";
        result2.push(a[ai]);
        ai++;
        bi++;
      } else if (b[bi] === "*" && a[ai] && (this.options.dot || !a[ai].startsWith(".")) && a[ai] !== "**") {
        if (which === "a")
          return false;
        which = "b";
        result2.push(b[bi]);
        ai++;
        bi++;
      } else {
        return false;
      }
    }
    return a.length === b.length && result2;
  }
  parseNegate() {
    if (this.nonegate)
      return;
    const pattern = this.pattern;
    let negate = false;
    let negateOffset = 0;
    for (let i = 0; i < pattern.length && pattern.charAt(i) === "!"; i++) {
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
      pp.forEach((p, i) => {
        const next = pp[i + 1];
        const prev = pp[i - 1];
        if (p !== GLOBSTAR || prev === GLOBSTAR) {
          return;
        }
        if (prev === void 0) {
          if (next !== void 0 && next !== GLOBSTAR) {
            pp[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + next;
          } else {
            pp[i] = twoStar;
          }
        } else if (next === void 0) {
          pp[i - 1] = prev + "(?:\\/|" + twoStar + ")?";
        } else if (next !== GLOBSTAR) {
          pp[i - 1] = prev + "(?:\\/|\\/" + twoStar + "\\/)" + next;
          pp[i + 1] = GLOBSTAR;
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
      for (let i = ff.length - 2; !filename && i >= 0; i--) {
        filename = ff[i];
      }
    }
    for (let i = 0; i < set.length; i++) {
      const pattern = set[i];
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
    for (let i2 = fileIndex; i2 < file.length - fileTailMatch; i2++) {
      const f = String(file[i2]);
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
  let i = bodySegments.length - 1;
  const fileLength = file.length - fileTailMatch;
  for (const b of bodySegments) {
    b[1] = fileLength - (nonGsPartsSums[i--] + b[0].length);
  }
  return !!__privateMethod(this, _Minimatch_instances, matchGlobStarBodySections_fn).call(this, file, bodySegments, fileIndex, 0, partial, 0, !!fileTailMatch);
};
matchGlobStarBodySections_fn = function(file, bodySegments, fileIndex, bodyIndex, partial, globStarDepth, sawTail) {
  const bs = bodySegments[bodyIndex];
  if (!bs) {
    for (let i = fileIndex; i < file.length; i++) {
      sawTail = true;
      const f = file[i];
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
minimatch.unescape = unescape2;

// src/utils/output-target.ts
var getComponentsDtsTypesFilePath = (outputTarget) => join(outputTarget.typesDir, GENERATED_DTS);
var isOutputTargetDist = (o) => o.type === DIST;
var isOutputTargetDistCollection = (o) => o.type === DIST_COLLECTION;
var isOutputTargetDistCustomElements = (o) => o.type === DIST_CUSTOM_ELEMENTS;
var isOutputTargetDistLazy = (o) => o.type === DIST_LAZY;
var isOutputTargetHydrate = (o) => o.type === DIST_HYDRATE_SCRIPT;
var isOutputTargetCustom = (o) => o.type === CUSTOM;
var isOutputTargetDocsReadme = (o) => o.type === DOCS_README;
var isOutputTargetDocsJson = (o) => o.type === DOCS_JSON;
var isOutputTargetDocsCustom = (o) => o.type === DOCS_CUSTOM;
var isOutputTargetDocsVscode = (o) => o.type === DOCS_VSCODE;
var isOutputTargetDocsCustomElementsManifest = (o) => o.type === DOCS_CUSTOM_ELEMENTS_MANIFEST;
var isOutputTargetWww = (o) => o.type === WWW;
var isOutputTargetStats = (o) => o.type === STATS;
function isValidConfigOutputTarget(targetType) {
  return VALID_CONFIG_OUTPUT_TARGETS.includes(targetType);
}

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
function map(result2, fn) {
  if (result2.isOk) {
    const val = fn(result2.value);
    if (val instanceof Promise) {
      return val.then((newVal) => ok(newVal));
    } else {
      return ok(val);
    }
  }
  if (result2.isErr) {
    const value = result2.value;
    return err(value);
  }
  throw "should never get here";
}
var unwrap = (result2) => {
  if (result2.isOk) {
    return result2.value;
  } else {
    throw result2.value;
  }
};
var unwrapErr = (result2) => {
  if (result2.isErr) {
    return result2.value;
  } else {
    throw result2.value;
  }
};

// src/utils/shadow-root.ts
var import_app_data = _lazyRequire("@stencil/core/internal/app-data");
var import_platform2 = _lazyRequire("@stencil/core/internal/testing");

// src/utils/style.ts
var import_platform = _lazyRequire("@stencil/core/internal/testing");

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

// src/testing/test-transpile.ts
var import_compiler = require("../compiler/stencil.js");
function transpile(input, opts = {}) {
  opts = {
    ...opts,
    componentExport: null,
    componentMetadata: "compilerstatic",
    coreImportPath: isString(opts.coreImportPath) ? opts.coreImportPath : "@stencil/core/internal/testing",
    currentDirectory: opts.currentDirectory || process.cwd(),
    module: "cjs",
    // always use commonjs since we're in a node environment
    proxy: null,
    sourceMap: "inline",
    style: null,
    styleImportData: "queryparams",
    target: "es2015",
    // default to es2015
    transformAliasedImportPaths: parseStencilTranspilePaths(process.env.__STENCIL_TRANSPILE_PATHS__)
  };
  try {
    const v = process.versions.node.split(".");
    if (parseInt(v[0], 10) >= 10) {
      opts.target = "es2017";
    }
  } catch (e) {
  }
  return (0, import_compiler.transpileSync)(input, opts);
}
function parseStencilTranspilePaths(stencilTranspilePaths) {
  return stencilTranspilePaths === "true" ? true : false;
}

// src/testing/jest/jest-27-and-under/jest-preprocessor.ts
var isJest27TransformOptions = (obj) => {
  return obj != null && typeof obj === "object" && obj.hasOwnProperty("config");
};
var CACHE_BUSTER = 7;
var _tsCompilerOptions = null;
var _tsCompilerOptionsKey = null;
var jestPreprocessor = {
  /**
   * Transforms a file to CommonJS to be used by Jest. The API for `process` is described in the
   * ["Writing custom transformers"](https://jestjs.io/docs/code-transformation#writing-custom-transformers)
   * documentation on the jest site. Unfortunately, the URL is not versioned at the time of this writing. For
   * reference, the v27.2 docs were referenced (the most recent available).
   *
   * This function attempts to support several versions of Jest (v23 through v27). Support for earlier versions of Jest
   * will be removed in a future major version of Stencil.
   *
   * @param sourceText the contents of the source file
   * @param sourcePath the path to the source file
   * @param jestConfig the jest configuration when called by Jest 26 and lower. This parameter is folded into
   * `transformOptions` when called by Jest 27+ as a top level `config` property. Calls to this function from Jest 27+
   * will have a `Jest27TransformOptions` shape
   * @param transformOptions an object containing the various transformation options. In Jest 27+ this parameter occurs
   * third in this function signature (and no fourth parameter is formally accepted)
   * @returns the transformed file contents if the file should be transformed. returns the original source otherwise
   */
  process(sourceText, sourcePath, jestConfig, transformOptions) {
    if (isJest27TransformOptions(jestConfig)) {
      transformOptions = jestConfig.config;
    }
    if (!transformOptions) {
      throw "Unable to find Jest transformation options.";
    }
    if (shouldTransform(sourcePath, sourceText)) {
      const opts = {
        file: sourcePath,
        currentDirectory: transformOptions.rootDir
      };
      const tsCompilerOptions = getCompilerOptions(transformOptions.rootDir);
      if (tsCompilerOptions) {
        if (tsCompilerOptions.baseUrl) {
          opts.baseUrl = tsCompilerOptions.baseUrl;
        }
        if (tsCompilerOptions.paths) {
          opts.paths = tsCompilerOptions.paths;
        }
        if (tsCompilerOptions.jsx !== void 0) {
          opts.jsx = tsCompilerOptions.jsx;
        }
        if (tsCompilerOptions.jsxImportSource) {
          opts.jsxImportSource = "@stencil/core/internal/testing";
        }
      }
      const results = transpile(sourceText, opts);
      const hasErrors = results.diagnostics.some((diagnostic) => diagnostic.level === "error");
      if (results.diagnostics && hasErrors) {
        const msg = results.diagnostics.map(formatDiagnostic).join("\n\n");
        throw new Error(msg);
      }
      return results.code;
    }
    return sourceText;
  },
  /**
   * Generates a key used to cache the results of transforming a file. This helps avoid re-processing a file via the
   * `transform` function unnecessarily (when no changes have occurred). The API for `getCacheKey` is described in the
   * ["Writing custom transformers"](https://jestjs.io/docs/code-transformation#writing-custom-transformers)
   * documentation on the jest site. Unfortunately, the URL is not versioned at the time of this writing. For
   * reference, the v27.2 docs were referenced (the most recent available).
   *
   * This function attempts to support several versions of Jest (v23 through v27). Support for earlier versions of Jest
   * will be removed in a future major version of Stencil.
   *
   * @param sourceText the contents of the source file
   * @param sourcePath the path to the source file
   * @param jestConfigStr a stringified version of the jest configuration when called by Jest 26 and lower. This
   * parameter takes the shape of `transformOptions` when called by Jest 27+.
   * @param transformOptions an object containing the various transformation options. In Jest 27+ this parameter occurs
   * third in this function signature (and no fourth parameter is formally accepted)
   * @returns the key to cache a file with
   */
  getCacheKey(sourceText, sourcePath, jestConfigStr, transformOptions) {
    if (isJest27TransformOptions(jestConfigStr)) {
      transformOptions = jestConfigStr.config;
    }
    if (!transformOptions) {
      throw "Unable to find Jest transformation options.";
    }
    if (!_tsCompilerOptionsKey) {
      const opts = getCompilerOptions(transformOptions.rootDir);
      _tsCompilerOptionsKey = JSON.stringify(opts);
    }
    const key = [
      process.version,
      _tsCompilerOptionsKey,
      sourceText,
      sourcePath,
      jestConfigStr,
      !!transformOptions.instrument,
      CACHE_BUSTER
    ];
    return key.join(":");
  }
};
function formatDiagnostic(diagnostic) {
  let m = "";
  if (diagnostic.relFilePath) {
    m += diagnostic.relFilePath;
    if (typeof diagnostic.lineNumber === "number") {
      m += ":" + diagnostic.lineNumber + 1;
      if (typeof diagnostic.columnNumber === "number") {
        m += ":" + diagnostic.columnNumber;
      }
    }
    m += "\n";
  }
  m += diagnostic.messageText;
  return m;
}
function getCompilerOptions(rootDir4) {
  if (_tsCompilerOptions) {
    return _tsCompilerOptions;
  }
  if (typeof rootDir4 !== "string") {
    return null;
  }
  rootDir4 = normalizePath(rootDir4);
  const tsconfigFilePath = import_compiler2.ts.findConfigFile(rootDir4, import_compiler2.ts.sys.fileExists);
  if (!tsconfigFilePath) {
    return null;
  }
  const tsconfigResults = import_compiler2.ts.readConfigFile(tsconfigFilePath, import_compiler2.ts.sys.readFile);
  if (tsconfigResults.error) {
    throw new Error(formatDiagnostic(loadTypeScriptDiagnostic(tsconfigResults.error)));
  }
  const parseResult = import_compiler2.ts.parseJsonConfigFileContent(
    tsconfigResults.config,
    import_compiler2.ts.sys,
    rootDir4,
    void 0,
    tsconfigFilePath
  );
  _tsCompilerOptions = parseResult.options;
  return _tsCompilerOptions;
}
function shouldTransform(filePath, sourceText) {
  var _a2;
  const ext2 = ((_a2 = filePath.split(".").pop()) != null ? _a2 : "").toLowerCase().split("?")[0];
  if (ext2 === "ts" || ext2 === "tsx" || ext2 === "jsx") {
    return true;
  }
  if (ext2 === "mjs") {
    return true;
  }
  if (ext2 === "js") {
    if (sourceText.includes("import ") || sourceText.includes("import.") || sourceText.includes("import(")) {
      return true;
    }
    if (sourceText.includes("export ")) {
      return true;
    }
  }
  if (ext2 === "css") {
    return true;
  }
  return false;
}

// src/testing/jest/jest-27-and-under/jest-preset.ts
var import_path3 = require("path");
var testingDir = __dirname;
var rootDir = (0, import_path3.join)(testingDir, "..");
var internalDir = (0, import_path3.join)(rootDir, "internal");
var moduleExtensions = ["ts", "tsx", "js", "mjs", "jsx"];
var moduleExtensionRegexp = "(" + moduleExtensions.join("|") + ")";
var preset = {
  moduleFileExtensions: [...moduleExtensions, "json", "d.ts"],
  moduleNameMapper: {
    "^@stencil/core/cli$": (0, import_path3.join)(rootDir, "cli", "index.js"),
    "^@stencil/core/compiler$": (0, import_path3.join)(rootDir, "compiler", "stencil.js"),
    "^@stencil/core/internal$": (0, import_path3.join)(internalDir, "testing", "index.js"),
    "^@stencil/core/internal/app-data$": (0, import_path3.join)(internalDir, "app-data", "index.cjs"),
    "^@stencil/core/internal/app-globals$": (0, import_path3.join)(internalDir, "app-globals", "index.js"),
    "^@stencil/core/internal/testing$": (0, import_path3.join)(internalDir, "testing", "index.js"),
    "^@stencil/core/mock-doc$": (0, import_path3.join)(rootDir, "mock-doc", "index.cjs"),
    "^@stencil/core/sys$": (0, import_path3.join)(rootDir, "sys", "node", "index.js"),
    "^@stencil/core/testing$": (0, import_path3.join)(testingDir, "index.js"),
    "^@stencil/core$": (0, import_path3.join)(internalDir, "testing", "index.js")
  },
  setupFilesAfterEnv: [(0, import_path3.join)(testingDir, "jest-setuptestframework.js")],
  testEnvironment: (0, import_path3.join)(testingDir, "jest-environment.js"),
  testPathIgnorePatterns: ["/.cache", "/.stencil", "/.vscode", "/dist", "/node_modules", "/www"],
  testRegex: "(/__tests__/.*|\\.?(test|spec))\\." + moduleExtensionRegexp + "$",
  transform: {
    "^.+\\.(ts|tsx|jsx|css|mjs)$": (0, import_path3.join)(testingDir, "jest-preprocessor.js")
  },
  watchPathIgnorePatterns: ["^.+\\.d\\.ts$"]
};

// src/testing/jest/jest-27-and-under/jest-runner.ts
var import_jest_runner = __toESM(require("jest-runner"));

// src/testing/puppeteer/puppeteer-emulate.ts
function setScreenshotEmulateData(userEmulateConfig, env2) {
  const screenshotEmulate = {
    userAgent: "default",
    viewport: {
      width: 800,
      height: 600,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: false
    },
    device: void 0
  };
  if (typeof userEmulateConfig.device === "string") {
    try {
      const deviceDescriptors = require(env2.__STENCIL_PUPPETEER_MODULE__ + "/DeviceDescriptors");
      const puppeteerEmulateOpts = deviceDescriptors[userEmulateConfig.device];
      if (!puppeteerEmulateOpts) {
        console.error(`invalid emulate device: ${userEmulateConfig.device}`);
        return;
      }
      screenshotEmulate.device = userEmulateConfig.device;
      screenshotEmulate.userAgent = puppeteerEmulateOpts.userAgent;
      screenshotEmulate.viewport = puppeteerEmulateOpts.viewport;
    } catch (e) {
      console.error("error loading puppeteer DeviceDescriptors", e);
      return;
    }
  }
  if (userEmulateConfig.viewport) {
    if (typeof userEmulateConfig.viewport.width === "number") {
      screenshotEmulate.viewport.width = userEmulateConfig.viewport.width;
    }
    if (typeof userEmulateConfig.viewport.height === "number") {
      screenshotEmulate.viewport.height = userEmulateConfig.viewport.height;
    }
    if (typeof userEmulateConfig.viewport.deviceScaleFactor === "number") {
      screenshotEmulate.viewport.deviceScaleFactor = userEmulateConfig.viewport.deviceScaleFactor;
    }
    if (typeof userEmulateConfig.viewport.hasTouch === "boolean") {
      screenshotEmulate.viewport.hasTouch = userEmulateConfig.viewport.hasTouch;
    }
    if (typeof userEmulateConfig.viewport.isLandscape === "boolean") {
      screenshotEmulate.viewport.isLandscape = userEmulateConfig.viewport.isLandscape;
    }
    if (typeof userEmulateConfig.viewport.isMobile === "boolean") {
      screenshotEmulate.viewport.isMobile = userEmulateConfig.viewport.isMobile;
    }
    if (typeof userEmulateConfig.userAgent === "string") {
      screenshotEmulate.userAgent = userEmulateConfig.userAgent;
    }
  }
  env2.__STENCIL_EMULATE__ = JSON.stringify(screenshotEmulate);
}

// src/testing/jest/jest-27-and-under/jest-config.ts
var import_cli = require("../cli/index.cjs");
function getLegacyJestOptions() {
  return {
    detectLeaks: false,
    "detect-leaks": false,
    detectOpenHandles: false,
    "detect-open-handles": false,
    errorOnDeprecated: false,
    "error-on-deprecated": false,
    listTests: false,
    "list-tests": false,
    maxConcurrency: 5,
    "max-concurrency": 5,
    notifyMode: "failure-change",
    "notify-mode": "failure-change",
    passWithNoTests: false,
    "pass-with-no-tests": false,
    runTestsByPath: false,
    "run-tests-by-path": false,
    testLocationInResults: false,
    "test-location-in-results": false
  };
}
function buildJestArgv(config) {
  const yargs = require("yargs");
  const knownArgs = config.flags.knownArgs.slice();
  if (!knownArgs.some((a) => a.startsWith("--max-workers") || a.startsWith("--maxWorkers"))) {
    knownArgs.push(`--max-workers=${config.maxConcurrentWorkers}`);
  }
  if (config.flags.devtools) {
    knownArgs.push("--runInBand");
  }
  const args = [...knownArgs, ...config.flags.unknownArgs];
  config.logger.info(config.logger.magenta(`jest args: ${args.join(" ")}`));
  let jestArgv = yargs(args).argv;
  jestArgv = { ...getLegacyJestOptions(), ...jestArgv };
  jestArgv.config = buildJestConfig(config);
  if (typeof jestArgv.maxWorkers === "string") {
    try {
      jestArgv.maxWorkers = parseInt(jestArgv.maxWorkers, 10);
    } catch (e) {
    }
  }
  if (typeof jestArgv.ci === "string") {
    jestArgv.ci = jestArgv.ci === "true" || jestArgv.ci === "";
  }
  for (const flag of import_cli.BOOLEAN_CLI_FLAGS) {
    if (typeof jestArgv[flag] === "string") {
      jestArgv[flag] = jestArgv[flag] === "true";
    }
  }
  return jestArgv;
}
function buildJestConfig(config) {
  const stencilConfigTesting = config.testing;
  const jestDefaults = require("jest-config").defaults;
  const validJestConfigKeys = Object.keys(jestDefaults);
  const jestConfig = {};
  Object.keys(stencilConfigTesting).forEach((key) => {
    if (validJestConfigKeys.includes(key)) {
      jestConfig[key] = stencilConfigTesting[key];
    }
  });
  jestConfig.rootDir = config.rootDir;
  if (isString(stencilConfigTesting.collectCoverage)) {
    jestConfig.collectCoverage = stencilConfigTesting.collectCoverage;
  }
  if (Array.isArray(stencilConfigTesting.collectCoverageFrom)) {
    jestConfig.collectCoverageFrom = stencilConfigTesting.collectCoverageFrom;
  }
  if (isString(stencilConfigTesting.coverageDirectory)) {
    jestConfig.coverageDirectory = stencilConfigTesting.coverageDirectory;
  }
  if (stencilConfigTesting.coverageThreshold) {
    jestConfig.coverageThreshold = stencilConfigTesting.coverageThreshold;
  }
  if (isString(stencilConfigTesting.globalSetup)) {
    jestConfig.globalSetup = stencilConfigTesting.globalSetup;
  }
  if (isString(stencilConfigTesting.globalTeardown)) {
    jestConfig.globalTeardown = stencilConfigTesting.globalTeardown;
  }
  if (isString(stencilConfigTesting.preset)) {
    jestConfig.preset = stencilConfigTesting.preset;
  }
  if (stencilConfigTesting.projects) {
    jestConfig.projects = stencilConfigTesting.projects;
  }
  if (Array.isArray(stencilConfigTesting.reporters)) {
    jestConfig.reporters = stencilConfigTesting.reporters;
  }
  if (isString(stencilConfigTesting.testResultsProcessor)) {
    jestConfig.testResultsProcessor = stencilConfigTesting.testResultsProcessor;
  }
  if (stencilConfigTesting.transform) {
    jestConfig.transform = stencilConfigTesting.transform;
  }
  if (stencilConfigTesting.verbose) {
    jestConfig.verbose = stencilConfigTesting.verbose;
  }
  if (typeof stencilConfigTesting.bail !== "undefined") {
    jestConfig.bail = typeof stencilConfigTesting.bail === "number" ? stencilConfigTesting.bail : stencilConfigTesting.bail ? 1 : 0;
  }
  if (stencilConfigTesting.prettierPath) {
    jestConfig.prettierPath = stencilConfigTesting.prettierPath;
  }
  if (stencilConfigTesting.restoreMocks) {
    jestConfig.restoreMocks = stencilConfigTesting.restoreMocks;
  }
  jestConfig.testRunner = new Jest27Stencil().getDefaultJestRunner();
  return JSON.stringify(jestConfig);
}
function getProjectListFromCLIArgs(config, argv) {
  const projects = argv.projects ? argv.projects : [];
  projects.push(config.rootDir);
  return projects;
}

// src/testing/jest/jest-27-and-under/jest-runner.ts
async function runJest(config, env2) {
  let success = false;
  try {
    const emulateConfigs = getEmulateConfigs(config.testing, config.flags);
    env2.__STENCIL_EMULATE_CONFIGS__ = JSON.stringify(emulateConfigs);
    env2.__STENCIL_ENV__ = JSON.stringify(config.env);
    env2.__STENCIL_TRANSPILE_PATHS__ = config.transformAliasedImportPaths ? "true" : "false";
    if (config.flags.ci || config.flags.e2e) {
      env2.__STENCIL_DEFAULT_TIMEOUT__ = "30000";
    } else {
      env2.__STENCIL_DEFAULT_TIMEOUT__ = "15000";
    }
    if (config.flags.devtools) {
      env2.__STENCIL_DEFAULT_TIMEOUT__ = "300000000";
    }
    config.logger.debug(`default timeout: ${env2.__STENCIL_DEFAULT_TIMEOUT__}`);
    const jestArgv = buildJestArgv(config);
    const projects = getProjectListFromCLIArgs(config, jestArgv);
    const { runCLI } = require("@jest/core");
    const cliResults = await runCLI(jestArgv, projects);
    success = !!cliResults.results.success;
  } catch (e) {
    config.logger.error(`runJest: ${e}`);
  }
  return success;
}
function createTestRunner() {
  class StencilTestRunner extends import_jest_runner.default {
    async runTests(tests, watcher, onStart, onResult, onFailure, options) {
      const env2 = process.env;
      tests = tests.filter((t) => includeTestFile(t.path, env2));
      if (env2.__STENCIL_SCREENSHOT__ === "true" && env2.__STENCIL_EMULATE_CONFIGS__) {
        const emulateConfigs = JSON.parse(env2.__STENCIL_EMULATE_CONFIGS__);
        for (let i = 0; i < emulateConfigs.length; i++) {
          const emulateConfig = emulateConfigs[i];
          setScreenshotEmulateData(emulateConfig, env2);
          await super.runTests(tests, watcher, onStart, onResult, onFailure, options);
        }
      } else {
        await super.runTests(tests, watcher, onStart, onResult, onFailure, options);
      }
    }
  }
  return StencilTestRunner;
}
function includeTestFile(testPath, env2) {
  testPath = testPath.toLowerCase().replace(/\\/g, "/");
  const hasE2E = testPath.includes(".e2e.") || testPath.includes("/e2e.");
  if (env2.__STENCIL_E2E_TESTS__ === "true" && hasE2E) {
    return true;
  }
  if (env2.__STENCIL_SPEC_TESTS__ === "true" && !hasE2E) {
    return true;
  }
  return false;
}
function getEmulateConfigs(testing, flags) {
  var _a2, _b;
  let emulateConfigs = (_b = (_a2 = testing.emulate) == null ? void 0 : _a2.slice()) != null ? _b : [];
  if (typeof flags.emulate === "string") {
    const emulateFlag = flags.emulate.toLowerCase();
    emulateConfigs = emulateConfigs.filter((emulateConfig) => {
      if (typeof emulateConfig.device === "string" && emulateConfig.device.toLowerCase() === emulateFlag) {
        return true;
      }
      if (typeof emulateConfig.userAgent === "string" && emulateConfig.userAgent.toLowerCase().includes(emulateFlag)) {
        return true;
      }
      return false;
    });
  }
  return emulateConfigs;
}

// src/testing/jest/jest-27-and-under/jest-screenshot.ts
var import_path4 = require("path");
async function runJestScreenshot(config, env2) {
  config.logger.debug(`screenshot connector: ${config.testing.screenshotConnector}`);
  const ScreenshotConnector = require(config.testing.screenshotConnector);
  const connector = new ScreenshotConnector();
  const pixelmatchModulePath = (0, import_path4.join)(config.sys.getCompilerExecutingPath(), "..", "..", "screenshot", "pixel-match.js");
  config.logger.debug(`pixelmatch module: ${pixelmatchModulePath}`);
  const initTimespan = config.logger.createTimeSpan(`screenshot, initBuild started`, true);
  await connector.initBuild({
    buildId: createBuildId(),
    buildMessage: createBuildMessage(),
    buildTimestamp: Date.now(),
    appNamespace: config.namespace,
    rootDir: config.rootDir,
    cacheDir: config.cacheDir,
    packageDir: (0, import_path4.join)(config.sys.getCompilerExecutingPath(), "..", ".."),
    updateMaster: !!config.flags.updateScreenshot,
    logger: config.logger,
    allowableMismatchedPixels: config.testing.allowableMismatchedPixels,
    allowableMismatchedRatio: config.testing.allowableMismatchedRatio,
    pixelmatchThreshold: config.testing.pixelmatchThreshold,
    waitBeforeScreenshot: config.testing.waitBeforeScreenshot,
    pixelmatchModulePath
  });
  if (!config.flags.updateScreenshot) {
    await connector.pullMasterBuild();
  }
  initTimespan.finish(`screenshot, initBuild finished`);
  const dataPromises = await Promise.all([await connector.getMasterBuild(), await connector.getScreenshotCache()]);
  const masterBuild = dataPromises[0];
  const screenshotCache = dataPromises[1];
  env2.__STENCIL_SCREENSHOT_BUILD__ = connector.toJson(masterBuild, screenshotCache);
  const testsTimespan = config.logger.createTimeSpan(`screenshot, tests started`, true);
  const passed = await runJest(config, env2);
  testsTimespan.finish(`screenshot, tests finished, passed: ${passed}`);
  try {
    const completeTimespan = config.logger.createTimeSpan(`screenshot, completeTimespan started`, true);
    let results = await connector.completeBuild(masterBuild);
    completeTimespan.finish(`screenshot, completeTimespan finished`);
    if (results) {
      const publishTimespan = config.logger.createTimeSpan(`screenshot, publishBuild started`, true);
      results = await connector.publishBuild(results);
      publishTimespan.finish(`screenshot, publishBuild finished`);
      if (config.flags.updateScreenshot) {
        if (results.currentBuild && typeof results.currentBuild.previewUrl === "string") {
          config.logger.info(config.logger.magenta(results.currentBuild.previewUrl));
        }
      } else {
        if (results.compare) {
          try {
            await connector.updateScreenshotCache(screenshotCache, results);
          } catch (e) {
            config.logger.error(e);
          }
          config.logger.info(`screenshots compared: ${results.compare.diffs.length}`);
          if (typeof results.compare.url === "string") {
            config.logger.info(config.logger.magenta(results.compare.url));
          }
        }
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      config.logger.error(e, e.stack);
    } else {
      config.logger.error(e);
    }
  }
  return passed;
}
function createBuildId() {
  const d = /* @__PURE__ */ new Date();
  let fmDt = d.getFullYear() + "";
  fmDt += ("0" + (d.getMonth() + 1)).slice(-2);
  fmDt += ("0" + d.getDate()).slice(-2);
  fmDt += ("0" + d.getHours()).slice(-2);
  fmDt += ("0" + d.getMinutes()).slice(-2);
  fmDt += ("0" + d.getSeconds()).slice(-2);
  return fmDt;
}
function createBuildMessage() {
  const d = /* @__PURE__ */ new Date();
  let fmDt = d.getFullYear() + "-";
  fmDt += ("0" + (d.getMonth() + 1)).slice(-2) + "-";
  fmDt += ("0" + d.getDate()).slice(-2) + " ";
  fmDt += ("0" + d.getHours()).slice(-2) + ":";
  fmDt += ("0" + d.getMinutes()).slice(-2) + ":";
  fmDt += ("0" + d.getSeconds()).slice(-2);
  return `Build: ${fmDt}`;
}

// src/testing/jest/jest-27-and-under/jest-setup-test-framework.ts
var import_app_data2 = _lazyRequire("@stencil/core/internal/app-data");
var import_testing = _lazyRequire("../internal/testing/index.js");
var import_mock_doc7 = _lazyRequire("../mock-doc/index.cjs");

// src/testing/mock-fetch.ts
var import_mock_doc = _lazyRequire("../mock-doc/index.cjs");
var import_mock_doc2 = _lazyRequire("../mock-doc/index.cjs");
var mockedResponses = /* @__PURE__ */ new Map();
function setupMockFetch(global2) {
  const win2 = global2.window;
  if (!("fetch" in win2)) {
    win2.fetch = function(input) {
      return globalMockFetch(input);
    };
  }
  if (!("fetch" in global2)) {
    global2.fetch = function(input) {
      return globalMockFetch(input);
    };
  }
}
async function globalMockFetch(requestInput) {
  let requestUrl;
  if (requestInput == null) {
    throw new Error(`missing url input for mock fetch()`);
  } else if (typeof requestInput === "string") {
    requestUrl = requestInput;
  } else if (typeof requestInput.url === "string") {
    requestUrl = requestInput.url;
  } else {
    throw new Error(`invalid url for mock fetch()`);
  }
  requestUrl = new URL(requestUrl, location.href).href;
  let mockedData = mockedResponses.get(requestUrl);
  if (mockedData == null) {
    const defaultUrl = new URL(FETCH_DEFAULT_PATH, location.href);
    mockedData = mockedResponses.get(defaultUrl.href);
  }
  if (mockedData == null) {
    return new MockResponse404();
  }
  const mockedResponse = mockedData.response.clone();
  if (typeof mockedResponse.status !== "number") {
    mockedResponse.status = 200;
  }
  if (typeof mockedResponse.statusText !== "string") {
    if (mockedResponse.status >= 500) {
      mockedResponse.statusText = "Internal Server Error";
    } else if (mockedResponse.status === 404) {
      mockedResponse.statusText = "Not Found";
    } else if (mockedResponse.status >= 400) {
      mockedResponse.statusText = "Bad Request";
    } else if (mockedResponse.status === 302) {
      mockedResponse.statusText = "Found";
    } else if (mockedResponse.status === 301) {
      mockedResponse.statusText = "Moved Permanently";
    } else if (mockedResponse.status >= 300) {
      mockedResponse.statusText = "Redirection";
    } else {
      mockedResponse.statusText = "OK";
    }
  }
  mockedResponse.ok = mockedResponse.status >= 200 && mockedResponse.status <= 299;
  if (typeof mockedResponse.type !== "string") {
    mockedResponse.type = "basic";
  }
  return mockedResponse;
}
function setMockedResponse(response, input, reject) {
  if (!response) {
    throw new Error("MockResponse required");
  }
  if (typeof response.url !== "string" || response.url === "") {
    if (typeof input === "string") {
      response.url = input;
    } else if (input && typeof input.url === "string") {
      response.url = input.url;
    } else {
      response.url = FETCH_DEFAULT_PATH;
    }
  }
  const u = new URL(response.url, location.href);
  response.url = u.href;
  const mockedResponseData = {
    response,
    reject
  };
  mockedResponses.set(response.url, mockedResponseData);
}
function mockFetchReset() {
  mockedResponses.clear();
}
var mockFetch = {
  json(data, url) {
    const rsp = new import_mock_doc.MockResponse(JSON.stringify(data, null, 2), {
      headers: new import_mock_doc.MockHeaders({
        "Content-Type": "application/json"
      })
    });
    setMockedResponse(rsp, url, false);
  },
  text(data, url) {
    const rsp = new import_mock_doc.MockResponse(data, {
      headers: new import_mock_doc.MockHeaders({
        "Content-Type": "text/plain"
      })
    });
    setMockedResponse(rsp, url, false);
  },
  response(rsp, url) {
    setMockedResponse(rsp, url, false);
  },
  reject(rsp, url) {
    setMockedResponse(rsp, url, true);
  },
  reset: mockFetchReset
};
var MockResponse404 = class extends import_mock_doc.MockResponse {
  ok = false;
  status = 404;
  statusText = "Not Found";
  constructor() {
    super("", {
      headers: new import_mock_doc.MockHeaders({
        "Content-Type": "text/plain"
      })
    });
  }
  async json() {
    return { status: 404, statusText: "Not Found" };
  }
  async text() {
    return "Not Found";
  }
};
var FETCH_DEFAULT_PATH = "/mock-fetch-data";

// src/testing/reset-build-conditionals.ts
function resetBuildConditionals(b) {
  Object.keys(b).forEach((key) => {
    b[key] = true;
  });
  b.isDev = true;
  b.isTesting = true;
  b.isDebug = false;
  b.lazyLoad = true;
  b.member = true;
  b.reflect = true;
  b.scoped = true;
  b.shadowDom = true;
  b.slotRelocation = true;
  b.asyncLoading = true;
  b.svg = true;
  b.updatable = true;
  b.vdomAttribute = true;
  b.vdomClass = true;
  b.vdomFunctional = true;
  b.vdomKey = true;
  b.vdomPropOrAttr = true;
  b.vdomRef = true;
  b.vdomListener = true;
  b.vdomStyle = true;
  b.vdomText = true;
  b.vdomXlink = true;
  b.allRenderFn = false;
  b.devTools = false;
  b.hydrateClientSide = false;
  b.hydrateServerSide = false;
  b.cssAnnotations = false;
  b.style = false;
  b.hydratedAttribute = false;
  b.hydratedClass = true;
  b.invisiblePrehydration = true;
  b.appendChildSlotFix = false;
  b.cloneNodeFix = false;
  b.hotModuleReplacement = false;
  b.scriptDataOpts = false;
  b.scopedSlotTextContentFix = false;
  b.slotChildNodesFix = false;
  b.experimentalSlotFixes = false;
  b.experimentalScopedSlotChanges = false;
}

// src/testing/jest/jest-27-and-under/jest-serializer.ts
var import_mock_doc3 = _lazyRequire("../mock-doc/index.cjs");
var print = (val) => {
  return (0, import_mock_doc3.serializeNodeToHtml)(val, {
    serializeShadowRoot: true,
    prettyHtml: true,
    outerHtml: true
  });
};
var test = (val) => {
  return val !== void 0 && val !== null && (val instanceof HTMLElement || val instanceof import_mock_doc3.MockNode);
};
var HtmlSerializer = {
  print,
  test
};

// src/testing/jest/jest-27-and-under/matchers/attributes.ts
var import_mock_doc4 = _lazyRequire("../mock-doc/index.cjs");
function toEqualAttribute(elm, expectAttrName, expectAttrValue) {
  if (!elm) {
    throw new Error(`expect toMatchAttribute value is null`);
  }
  if (typeof elm.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  if (elm.nodeType !== import_mock_doc4.NODE_TYPES.ELEMENT_NODE) {
    throw new Error(`expect toMatchAttribute value is not an element`);
  }
  let receivedAttrValue = elm.getAttribute(expectAttrName);
  if (expectAttrValue != null) {
    expectAttrValue = String(expectAttrValue);
  }
  if (receivedAttrValue != null) {
    receivedAttrValue = String(receivedAttrValue);
  }
  const pass = expectAttrValue === receivedAttrValue;
  return {
    message: () => `expected attribute ${expectAttrName} "${expectAttrValue}" to ${pass ? "not " : ""}equal "${receivedAttrValue}"`,
    pass
  };
}
function toEqualAttributes(elm, expectAttrs) {
  if (!elm) {
    throw new Error(`expect toEqualAttributes value is null`);
  }
  if (typeof elm.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  if (elm.nodeType !== import_mock_doc4.NODE_TYPES.ELEMENT_NODE) {
    throw new Error(`expect toEqualAttributes value is not an element`);
  }
  const attrNames = Object.keys(expectAttrs);
  const pass = attrNames.every((attrName) => {
    let expectAttrValue = expectAttrs[attrName];
    if (expectAttrValue != null) {
      expectAttrValue = String(expectAttrValue);
    }
    return elm.getAttribute(attrName) === expectAttrValue;
  });
  return {
    message: () => `expected attributes to ${pass ? "not " : ""}equal ${attrNames.map((a) => `[${a}="${expectAttrs[a]}"]`).join(", ")}`,
    pass
  };
}
function toHaveAttribute(elm, expectAttrName) {
  if (!elm) {
    throw new Error(`expect toHaveAttribute value is null`);
  }
  if (typeof elm.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  if (elm.nodeType !== import_mock_doc4.NODE_TYPES.ELEMENT_NODE) {
    throw new Error(`expect toHaveAttribute value is not an element`);
  }
  const pass = elm.hasAttribute(expectAttrName);
  return {
    message: () => `expected to ${pass ? "not " : ""}have the attribute "${expectAttrName}"`,
    pass
  };
}

// src/testing/jest/jest-27-and-under/matchers/class-list.ts
function toHaveClass(elm, expectClassName) {
  if (!elm) {
    throw new Error(`expect toHaveClass value is null`);
  }
  if (typeof elm.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  if (elm.nodeType !== 1) {
    throw new Error(`expect toHaveClass value is not an element`);
  }
  const pass = elm.classList.contains(expectClassName);
  return {
    message: () => `expected to ${pass ? "not " : ""}have css class "${expectClassName}"`,
    pass
  };
}
function toHaveClasses(elm, expectClassNames) {
  if (!elm) {
    throw new Error(`expect toHaveClasses value is null`);
  }
  if (typeof elm.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  if (elm.nodeType !== 1) {
    throw new Error(`expect toHaveClasses value is not an element`);
  }
  const pass = expectClassNames.every((expectClassName) => {
    return elm.classList.contains(expectClassName);
  });
  return {
    message: () => `expected to ${pass ? "not " : ""}have css classes "${expectClassNames.join(" ")}", but className is "${elm.className}"`,
    pass
  };
}
function toMatchClasses(elm, expectClassNames) {
  let { pass } = toHaveClasses(elm, expectClassNames);
  if (pass) {
    pass = expectClassNames.length === elm.classList.length;
  }
  return {
    message: () => `expected to ${pass ? "not " : ""}match css classes "${expectClassNames.join(" ")}", but className is "${elm.className}"`,
    pass
  };
}

// src/testing/jest/jest-27-and-under/matchers/events.ts
function toHaveReceivedEvent(eventSpy) {
  if (!eventSpy) {
    throw new Error(`toHaveReceivedEvent event spy is null`);
  }
  if (typeof eventSpy.then === "function") {
    throw new Error(`event spy must be a resolved value, not a promise, before it can be tested`);
  }
  if (!eventSpy.eventName) {
    throw new Error(`toHaveReceivedEvent did not receive an event spy`);
  }
  const pass = eventSpy.events.length > 0;
  return {
    message: () => `expected to have ${pass ? "not " : ""}called "${eventSpy.eventName}" event`,
    pass
  };
}
function toHaveReceivedEventTimes(eventSpy, count) {
  if (!eventSpy) {
    throw new Error(`toHaveReceivedEventTimes event spy is null`);
  }
  if (typeof eventSpy.then === "function") {
    throw new Error(`event spy must be a resolved value, not a promise, before it can be tested`);
  }
  if (!eventSpy.eventName) {
    throw new Error(`toHaveReceivedEventTimes did not receive an event spy`);
  }
  const pass = eventSpy.length === count;
  return {
    message: () => `expected event "${eventSpy.eventName}" to have been called ${count} times, but was called ${eventSpy.events.length} time${eventSpy.events.length > 1 ? "s" : ""}`,
    pass
  };
}
function toHaveReceivedEventDetail(eventSpy, eventDetail) {
  if (!eventSpy) {
    throw new Error(`toHaveReceivedEventDetail event spy is null`);
  }
  if (typeof eventSpy.then === "function") {
    throw new Error(`event spy must be a resolved value, not a promise, before it can be tested`);
  }
  if (!eventSpy.eventName) {
    throw new Error(`toHaveReceivedEventDetail did not receive an event spy`);
  }
  if (!eventSpy.lastEvent) {
    throw new Error(`event "${eventSpy.eventName}" was not received`);
  }
  const pass = deepEqual(eventSpy.lastEvent.detail, eventDetail);
  expect(eventSpy.lastEvent.detail).toEqual(eventDetail);
  return {
    message: () => `expected event "${eventSpy.eventName}" detail to ${pass ? "not " : ""}equal`,
    pass
  };
}
function toHaveFirstReceivedEventDetail(eventSpy, eventDetail) {
  if (!eventSpy) {
    throw new Error(`toHaveFirstReceivedEventDetail event spy is null`);
  }
  if (typeof eventSpy.then === "function") {
    throw new Error(`event spy must be a resolved value, not a promise, before it can be tested`);
  }
  if (!eventSpy.eventName) {
    throw new Error(`toHaveFirstReceivedEventDetail did not receive an event spy`);
  }
  if (!eventSpy.firstEvent) {
    throw new Error(`event "${eventSpy.eventName}" was not received`);
  }
  const pass = deepEqual(eventSpy.firstEvent.detail, eventDetail);
  expect(eventSpy.firstEvent.detail).toEqual(eventDetail);
  return {
    message: () => `expected event "${eventSpy.eventName}" detail to ${pass ? "not " : ""}equal`,
    pass
  };
}
function toHaveLastReceivedEventDetail(eventSpy, eventDetail) {
  if (!eventSpy) {
    throw new Error(`toHaveLastReceivedEventDetail event spy is null`);
  }
  if (typeof eventSpy.then === "function") {
    throw new Error(`event spy must be a resolved value, not a promise, before it can be tested`);
  }
  if (!eventSpy.eventName) {
    throw new Error(`toHaveLastReceivedEventDetail did not receive an event spy`);
  }
  if (!eventSpy.firstEvent) {
    throw new Error(`event "${eventSpy.eventName}" was not received`);
  }
  const pass = deepEqual(eventSpy.lastEvent.detail, eventDetail);
  expect(eventSpy.lastEvent.detail).toEqual(eventDetail);
  return {
    message: () => `expected event "${eventSpy.eventName}" detail to ${pass ? "not " : ""}equal`,
    pass
  };
}
function toHaveNthReceivedEventDetail(eventSpy, index, eventDetail) {
  if (!eventSpy) {
    throw new Error(`toHaveNthReceivedEventDetail event spy is null`);
  }
  if (typeof eventSpy.then === "function") {
    throw new Error(`event spy must be a resolved value, not a promise, before it can be tested`);
  }
  if (!eventSpy.eventName) {
    throw new Error(`toHaveNthReceivedEventDetail did not receive an event spy`);
  }
  if (!eventSpy.firstEvent) {
    throw new Error(`event "${eventSpy.eventName}" was not received`);
  }
  const event = eventSpy.events[index];
  if (!event) {
    throw new Error(`event at index ${index} was not received`);
  }
  const pass = deepEqual(event.detail, eventDetail);
  expect(event.detail).toEqual(eventDetail);
  return {
    message: () => `expected event "${eventSpy.eventName}" detail to ${pass ? "not " : ""}equal`,
    pass
  };
}
var deepEqual = function equal(a, b) {
  if (a === b) return true;
  if (a && b && typeof a == "object" && typeof b == "object") {
    const arrA = Array.isArray(a), arrB = Array.isArray(b);
    let i, length, key;
    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; ) if (!equal(a[i], b[i])) return false;
      return true;
    }
    if (arrA != arrB) return false;
    const dateA = a instanceof Date, dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();
    const regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();
    const keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;
    for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    for (i = length; i-- !== 0; ) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }
    return true;
  }
  return a !== a && b !== b;
};

// src/testing/jest/jest-27-and-under/matchers/html.ts
var import_mock_doc5 = _lazyRequire("../mock-doc/index.cjs");
function toEqualHtml(input, shouldEqual) {
  return compareHtml(input, shouldEqual, true);
}
function toEqualLightHtml(input, shouldEqual) {
  return compareHtml(input, shouldEqual, false);
}
function compareHtml(input, shouldEqual, serializeShadowRoot) {
  if (input == null) {
    throw new Error(`expect toEqualHtml() value is "${input}"`);
  }
  if (typeof input.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  let serializeA;
  if (input.nodeType === import_mock_doc5.NODE_TYPES.ELEMENT_NODE) {
    const options = getSpecOptions(input);
    serializeA = (0, import_mock_doc5.serializeNodeToHtml)(input, {
      prettyHtml: true,
      outerHtml: true,
      removeHtmlComments: options.includeAnnotations === false,
      excludeTags: ["body"],
      serializeShadowRoot
    });
  } else if (input.nodeType === import_mock_doc5.NODE_TYPES.DOCUMENT_FRAGMENT_NODE) {
    serializeA = (0, import_mock_doc5.serializeNodeToHtml)(input, {
      prettyHtml: true,
      excludeTags: ["style"],
      excludeTagContent: ["style"],
      serializeShadowRoot
    });
  } else if (typeof input === "string") {
    const parseA = (0, import_mock_doc5.parseHtmlToFragment)(input);
    serializeA = (0, import_mock_doc5.serializeNodeToHtml)(parseA, {
      prettyHtml: true,
      serializeShadowRoot
    });
  } else {
    throw new Error(`expect toEqualHtml() value should be an element, shadow root or string.`);
  }
  const parseB = (0, import_mock_doc5.parseHtmlToFragment)(shouldEqual);
  const serializeB = (0, import_mock_doc5.serializeNodeToHtml)(parseB, {
    prettyHtml: true,
    excludeTags: ["body"]
  });
  if (serializeA !== serializeB) {
    expect(serializeA).toBe(serializeB);
    return {
      message: () => "HTML does not match",
      pass: false
    };
  }
  return {
    message: () => "expect HTML to match",
    pass: true
  };
}
function getSpecOptions(el) {
  if (el && el.ownerDocument && el.ownerDocument.defaultView) {
    return el.ownerDocument.defaultView["__stencil_spec_options"] || {};
  }
  return {};
}

// src/testing/jest/jest-27-and-under/matchers/screenshot.ts
function toMatchScreenshot(compare, opts = {}) {
  if (!compare) {
    throw new Error(`expect toMatchScreenshot value is null`);
  }
  if (typeof compare.then === "function") {
    throw new Error(
      `expect(compare).toMatchScreenshot() must be a resolved value, not a promise, before it can be tested`
    );
  }
  if (typeof compare.mismatchedPixels !== "number") {
    throw new Error(
      `expect toMatchScreenshot() value is not a valid screenshot compare object - 'mismatchedPixels' has type '${typeof compare.mismatchedPixels}', but should be a number`
    );
  }
  if (typeof compare.deviceScaleFactor !== "number") {
    throw new Error(
      `expect toMatchScreenshot() value is not a valid screenshot compare object - 'deviceScaleFactor' has type '${typeof compare.deviceScaleFactor}', but should be a number`
    );
  }
  const device = compare.device || compare.userAgent;
  if (typeof opts.allowableMismatchedRatio === "number") {
    if (opts.allowableMismatchedRatio < 0 || opts.allowableMismatchedRatio > 1) {
      throw new Error(`expect toMatchScreenshot() allowableMismatchedRatio must be a value ranging from 0 to 1`);
    }
    const mismatchedRatio = compare.mismatchedPixels / (compare.width * compare.deviceScaleFactor * (compare.height * compare.deviceScaleFactor));
    return {
      message: () => `${device}: screenshot has a mismatch ratio of "${mismatchedRatio}" for "${compare.desc}", but expected ratio to be less than "${opts.allowableMismatchedRatio}"`,
      pass: mismatchedRatio <= opts.allowableMismatchedRatio
    };
  }
  if (typeof opts.allowableMismatchedPixels === "number") {
    if (opts.allowableMismatchedPixels < 0) {
      throw new Error(
        `expect toMatchScreenshot() allowableMismatchedPixels value must be a value that is 0 or greater`
      );
    }
    return {
      message: () => `${device}: screenshot has "${compare.mismatchedPixels}" mismatched pixels for "${compare.desc}", but expected less than "${opts.allowableMismatchedPixels}" mismatched pixels`,
      pass: compare.mismatchedPixels <= opts.allowableMismatchedPixels
    };
  }
  if (typeof compare.allowableMismatchedRatio === "number") {
    const mismatchedRatio = compare.mismatchedPixels / (compare.width * compare.deviceScaleFactor * (compare.height * compare.deviceScaleFactor));
    return {
      message: () => `${device}: screenshot has a mismatch ratio of "${mismatchedRatio}" for "${compare.desc}", but expected ratio to be less than "${compare.allowableMismatchedRatio}"`,
      pass: mismatchedRatio <= compare.allowableMismatchedRatio
    };
  }
  if (typeof compare.allowableMismatchedPixels === "number") {
    return {
      message: () => `${device}: screenshot has "${compare.mismatchedPixels}" mismatched pixels for "${compare.desc}", but expected less than "${compare.allowableMismatchedPixels}" mismatched pixels`,
      pass: compare.mismatchedPixels <= compare.allowableMismatchedPixels
    };
  }
  throw new Error(`expect toMatchScreenshot() missing allowableMismatchedPixels in testing config`);
}

// src/testing/jest/jest-27-and-under/matchers/text.ts
var import_mock_doc6 = _lazyRequire("../mock-doc/index.cjs");
function toEqualText(input, expectTextContent) {
  var _a2;
  if (input == null) {
    throw new Error(`expect toEqualText() value is "${input}"`);
  }
  if (typeof input.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  let textContent;
  if (input.nodeType === import_mock_doc6.NODE_TYPES.ELEMENT_NODE) {
    textContent = ((_a2 = input.textContent) != null ? _a2 : "").replace(/\s\s+/g, " ").trim();
  } else {
    textContent = String(input).replace(/\s\s+/g, " ").trim();
  }
  if (typeof expectTextContent === "string") {
    expectTextContent = expectTextContent.replace(/\s\s+/g, " ").trim();
  }
  const pass = textContent === expectTextContent;
  return {
    message: () => `expected textContent "${expectTextContent}" to ${pass ? "not " : ""}equal "${textContent}"`,
    pass
  };
}

// src/testing/jest/jest-27-and-under/matchers/index.ts
var expectExtend = {
  toEqualAttribute,
  toEqualAttributes,
  toEqualHtml,
  toEqualLightHtml,
  toEqualText,
  toHaveAttribute,
  toHaveClass,
  toHaveClasses,
  toMatchClasses,
  toHaveReceivedEvent,
  toHaveReceivedEventDetail,
  toHaveReceivedEventTimes,
  toHaveFirstReceivedEventDetail,
  toHaveLastReceivedEventDetail,
  toHaveNthReceivedEventDetail,
  toMatchScreenshot
};

// src/testing/jest/jest-27-and-under/jest-setup-test-framework.ts
function jestSetupTestFramework() {
  global.resourcesUrl = "/build";
  expect.extend(expectExtend);
  expect.addSnapshotSerializer(HtmlSerializer);
  (0, import_mock_doc7.setupGlobal)(global);
  setupMockFetch(global);
  beforeEach(() => {
    (0, import_testing.resetPlatform)();
    (0, import_testing.setErrorHandler)(void 0);
    resetBuildConditionals(import_app_data2.BUILD);
    import_testing.modeResolutionChain.length = 0;
  });
  afterEach(async () => {
    var _a2, _b, _c, _d, _e, _f;
    (0, import_testing.stopAutoApplyChanges)();
    const bodyNode = (_e = (_d = (_c = (_b = (_a2 = global.window) == null ? void 0 : _a2.document) == null ? void 0 : _b.childNodes) == null ? void 0 : _c[1]) == null ? void 0 : _d.childNodes) == null ? void 0 : _e.find((ref) => ref.nodeName === "BODY");
    (_f = bodyNode == null ? void 0 : bodyNode.childNodes) == null ? void 0 : _f.forEach(removeDomNodes);
    (0, import_mock_doc7.teardownGlobal)(global);
    global.resourcesUrl = "/build";
  });
  afterAll(async () => {
    if (global.__CLOSE_OPEN_PAGES__) {
      await global.__CLOSE_OPEN_PAGES__();
    }
  });
  const jasmineEnv = jasmine.getEnv();
  if (jasmineEnv != null) {
    jasmineEnv.addReporter({
      specStarted: (spec) => {
        global.currentSpec = spec;
      }
    });
  }
  global.screenshotDescriptions = /* @__PURE__ */ new Set();
  const env2 = process.env;
  if (typeof env2.__STENCIL_DEFAULT_TIMEOUT__ === "string") {
    const time = parseInt(env2.__STENCIL_DEFAULT_TIMEOUT__, 10);
    jest.setTimeout(time * 1.5);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = time;
  }
  if (typeof env2.__STENCIL_ENV__ === "string") {
    const stencilEnv = JSON.parse(env2.__STENCIL_ENV__);
    Object.assign(import_app_data2.Env, stencilEnv);
  }
}
function removeDomNodes(node) {
  var _a2, _b;
  if (node == null) {
    return;
  }
  if (!((_a2 = node.childNodes) == null ? void 0 : _a2.length)) {
    node.remove();
  }
  (_b = node.childNodes) == null ? void 0 : _b.forEach(removeDomNodes);
}

// src/testing/jest/jest-27-and-under/jest-facade.ts
var Jest27Stencil = class {
  getJestCliRunner() {
    return runJest;
  }
  getRunJestScreenshot() {
    return runJestScreenshot;
  }
  getDefaultJestRunner() {
    return "jest-jasmine2";
  }
  getCreateJestPuppeteerEnvironment() {
    return createJestPuppeteerEnvironment;
  }
  getJestPreprocessor() {
    return jestPreprocessor;
  }
  getCreateJestTestRunner() {
    return createTestRunner;
  }
  getJestSetupTestFramework() {
    return jestSetupTestFramework;
  }
  getJestPreset() {
    return preset;
  }
};

// src/testing/jest/jest-28/jest-environment.ts
var import_jest_environment_node2 = require("jest-environment-node");
function createJestPuppeteerEnvironment2() {
  const JestEnvironment = class extends import_jest_environment_node2.TestEnvironment {
    browser;
    pages;
    testPath;
    constructor(config, context) {
      super(config, context);
      this.browser = null;
      this.pages = [];
      this.testPath = context.testPath;
    }
    async setup() {
      if (process.env.__STENCIL_E2E_TESTS__ === "true") {
        const globalContext = this.global;
        globalContext.__NEW_TEST_PAGE__ = this.newPuppeteerPage.bind(this);
        globalContext.__CLOSE_OPEN_PAGES__ = this.closeOpenPages.bind(this);
      }
    }
    /**
     * Jest Circus hook for capturing events.
     *
     * We use this lifecycle hook to capture information about the currently running test in the event that it is a
     * Jest-Stencil screenshot test, so that we may accurately report on it.
     *
     * @param event the captured runtime event
     */
    async handleTestEvent(event) {
      const ROOT_DESCRIBE_BLOCK = "ROOT_DESCRIBE_BLOCK";
      if (event.name === "test_start") {
        const eventTest = event.test;
        let fullName = eventTest.name;
        let currentParent = eventTest.parent;
        while (currentParent && currentParent.name && currentParent.name != ROOT_DESCRIBE_BLOCK) {
          fullName = `${currentParent.name} ${fullName}`;
          currentParent = currentParent.parent;
        }
        const globalContext = this.global;
        globalContext.currentSpec = {
          // the event's test's name is analogous to the original description in earlier versions of jest
          description: eventTest.name,
          fullName,
          testPath: this.testPath
        };
      }
    }
    async newPuppeteerPage() {
      if (!this.browser) {
        this.browser = await connectBrowser();
      }
      await this.closeOpenPages();
      const page = await newBrowserPage(this.browser);
      this.pages.push(page);
      const env2 = process.env;
      if (typeof env2.__STENCIL_DEFAULT_TIMEOUT__ === "string") {
        page.setDefaultTimeout(parseInt(env2.__STENCIL_DEFAULT_TIMEOUT__, 10));
      }
      return page;
    }
    async closeOpenPages() {
      await Promise.all(this.pages.filter((page) => !page.isClosed()).map((page) => page.close()));
      this.pages.length = 0;
    }
    async teardown() {
      await super.teardown();
      await this.closeOpenPages();
      await disconnectBrowser(this.browser);
      this.browser = null;
    }
    getVmContext() {
      return super.getVmContext();
    }
  };
  return JestEnvironment;
}

// src/testing/jest/jest-28/jest-preprocessor.ts
var import_compiler3 = require("../compiler/stencil.js");
var CACHE_BUSTER2 = 8;
var _tsCompilerOptions2 = null;
var _tsCompilerOptionsKey2 = null;
var jestPreprocessor2 = {
  /**
   * Transforms a file to CommonJS to be used by Jest. The API for `process` is described in the
   * ["Writing custom transformers"](https://jestjs.io/docs/code-transformation#writing-custom-transformers)
   * documentation on the jest site. Unfortunately, the URL is not versioned at the time of this writing. For
   * reference, the v28 docs were referenced.
   *
   * @param sourceText the contents of the source file
   * @param sourcePath the path to the source file
   * @param options the transformation options to apply to each file
   * @returns the transformed file contents if the file should be transformed. returns the original source otherwise
   */
  process(sourceText, sourcePath, options) {
    const transformOptions = options.config;
    if (shouldTransform2(sourcePath, sourceText)) {
      const opts = {
        file: sourcePath,
        currentDirectory: transformOptions.rootDir
      };
      const tsCompilerOptions = getCompilerOptions2(transformOptions.rootDir);
      if (tsCompilerOptions) {
        if (tsCompilerOptions.baseUrl) {
          opts.baseUrl = tsCompilerOptions.baseUrl;
        }
        if (tsCompilerOptions.paths) {
          opts.paths = tsCompilerOptions.paths;
        }
        if (tsCompilerOptions.jsx !== void 0) {
          opts.jsx = tsCompilerOptions.jsx;
        }
        if (tsCompilerOptions.jsxImportSource) {
          opts.jsxImportSource = "@stencil/core/internal/testing";
        }
      }
      const results = transpile(sourceText, opts);
      const hasErrors = results.diagnostics.some((diagnostic) => diagnostic.level === "error");
      if (results.diagnostics && hasErrors) {
        const msg = results.diagnostics.map(formatDiagnostic2).join("\n\n");
        throw new Error(msg);
      }
      return { code: results.code };
    }
    return { code: sourceText };
  },
  /**
   * Generates a key used to cache the results of transforming a file. This helps avoid re-processing a file via the
   * `transform` function unnecessarily (when no changes have occurred). The API for `getCacheKey` is described in the
   * ["Writing custom transformers"](https://jestjs.io/docs/code-transformation#writing-custom-transformers)
   * documentation on the jest site. Unfortunately, the URL is not versioned at the time of this writing. For
   * reference, the v28 docs were referenced.
   *
   * @param sourceText the contents of the source file
   * @param sourcePath the path to the source file
   * @param options the transformation options to apply to each file
   * @returns the key to cache a file with
   */
  getCacheKey(sourceText, sourcePath, options) {
    const transformOptions = options.config;
    if (!_tsCompilerOptionsKey2) {
      const opts = getCompilerOptions2(transformOptions.rootDir);
      _tsCompilerOptionsKey2 = JSON.stringify(opts);
    }
    const key = [
      process.version,
      _tsCompilerOptionsKey2,
      sourceText,
      sourcePath,
      options,
      !!options.instrument,
      CACHE_BUSTER2
    ];
    return key.join(":");
  }
};
function formatDiagnostic2(diagnostic) {
  let m = "";
  if (diagnostic.relFilePath) {
    m += diagnostic.relFilePath;
    if (typeof diagnostic.lineNumber === "number") {
      m += ":" + diagnostic.lineNumber + 1;
      if (typeof diagnostic.columnNumber === "number") {
        m += ":" + diagnostic.columnNumber;
      }
    }
    m += "\n";
  }
  m += diagnostic.messageText;
  return m;
}
function getCompilerOptions2(rootDir4) {
  if (_tsCompilerOptions2) {
    return _tsCompilerOptions2;
  }
  if (typeof rootDir4 !== "string") {
    return null;
  }
  rootDir4 = normalizePath(rootDir4);
  const tsconfigFilePath = import_compiler3.ts.findConfigFile(rootDir4, import_compiler3.ts.sys.fileExists);
  if (!tsconfigFilePath) {
    return null;
  }
  const tsconfigResults = import_compiler3.ts.readConfigFile(tsconfigFilePath, import_compiler3.ts.sys.readFile);
  if (tsconfigResults.error) {
    throw new Error(formatDiagnostic2(loadTypeScriptDiagnostic(tsconfigResults.error)));
  }
  const parseResult = import_compiler3.ts.parseJsonConfigFileContent(
    tsconfigResults.config,
    import_compiler3.ts.sys,
    rootDir4,
    void 0,
    tsconfigFilePath
  );
  _tsCompilerOptions2 = parseResult.options;
  return _tsCompilerOptions2;
}
function shouldTransform2(filePath, sourceText) {
  var _a2;
  const ext2 = ((_a2 = filePath.split(".").pop()) != null ? _a2 : "").toLowerCase().split("?")[0];
  if (ext2 === "ts" || ext2 === "tsx" || ext2 === "jsx") {
    return true;
  }
  if (ext2 === "mjs") {
    return true;
  }
  if (ext2 === "js") {
    if (sourceText.includes("import ") || sourceText.includes("import.") || sourceText.includes("import(")) {
      return true;
    }
    if (sourceText.includes("export ")) {
      return true;
    }
  }
  if (ext2 === "css") {
    return true;
  }
  return false;
}

// src/testing/jest/jest-28/jest-preset.ts
var import_path5 = require("path");
var testingDir2 = __dirname;
var rootDir2 = (0, import_path5.join)(testingDir2, "..");
var internalDir2 = (0, import_path5.join)(rootDir2, "internal");
var moduleExtensions2 = ["ts", "tsx", "js", "mjs", "jsx"];
var moduleExtensionRegexp2 = "(" + moduleExtensions2.join("|") + ")";
var preset2 = {
  moduleFileExtensions: [...moduleExtensions2, "json", "d.ts"],
  moduleNameMapper: {
    "^@stencil/core/cli$": (0, import_path5.join)(rootDir2, "cli", "index.js"),
    "^@stencil/core/compiler$": (0, import_path5.join)(rootDir2, "compiler", "stencil.js"),
    "^@stencil/core/internal$": (0, import_path5.join)(internalDir2, "testing", "index.js"),
    "^@stencil/core/internal/app-data$": (0, import_path5.join)(internalDir2, "app-data", "index.cjs"),
    "^@stencil/core/internal/app-globals$": (0, import_path5.join)(internalDir2, "app-globals", "index.js"),
    "^@stencil/core/internal/testing$": (0, import_path5.join)(internalDir2, "testing", "index.js"),
    "^@stencil/core/mock-doc$": (0, import_path5.join)(rootDir2, "mock-doc", "index.cjs"),
    "^@stencil/core/sys$": (0, import_path5.join)(rootDir2, "sys", "node", "index.js"),
    "^@stencil/core/testing$": (0, import_path5.join)(testingDir2, "index.js"),
    "^@stencil/core$": (0, import_path5.join)(internalDir2, "testing", "index.js")
  },
  setupFilesAfterEnv: [(0, import_path5.join)(testingDir2, "jest-setuptestframework.js")],
  testEnvironment: (0, import_path5.join)(testingDir2, "jest-environment.js"),
  testPathIgnorePatterns: ["/.cache", "/.stencil", "/.vscode", "/dist", "/node_modules", "/www"],
  testRegex: "(/__tests__/.*|\\.?(test|spec))\\." + moduleExtensionRegexp2 + "$",
  transform: {
    "^.+\\.(ts|tsx|jsx|css|mjs)$": (0, import_path5.join)(testingDir2, "jest-preprocessor.js")
  },
  watchPathIgnorePatterns: ["^.+\\.d\\.ts$"]
};

// src/testing/jest/jest-28/jest-runner.ts
var import_jest_runner5 = __toESM(require("jest-runner"));

// src/testing/jest/jest-28/jest-config.ts
var import_cli2 = require("../cli/index.cjs");
function buildJestArgv2(config) {
  const yargs = require("yargs");
  const knownArgs = config.flags.knownArgs.slice();
  if (!knownArgs.some((a) => a.startsWith("--max-workers") || a.startsWith("--maxWorkers"))) {
    knownArgs.push(`--max-workers=${config.maxConcurrentWorkers}`);
  }
  if (config.flags.devtools) {
    knownArgs.push("--runInBand");
  }
  const args = [...knownArgs, ...config.flags.unknownArgs];
  config.logger.info(config.logger.magenta(`jest args: ${args.join(" ")}`));
  const jestArgv = yargs(args).argv;
  jestArgv.config = buildJestConfig2(config);
  if (typeof jestArgv.maxWorkers === "string") {
    try {
      jestArgv.maxWorkers = parseInt(jestArgv.maxWorkers, 10);
    } catch (e) {
    }
  }
  if (typeof jestArgv.ci === "string") {
    jestArgv.ci = jestArgv.ci === "true" || jestArgv.ci === "";
  }
  for (const flag of import_cli2.BOOLEAN_CLI_FLAGS) {
    if (typeof jestArgv[flag] === "string") {
      jestArgv[flag] = jestArgv[flag] === "true";
    }
  }
  return jestArgv;
}
function buildJestConfig2(config) {
  const stencilConfigTesting = config.testing;
  const jestDefaults = require("jest-config").defaults;
  const validJestConfigKeys = Object.keys(jestDefaults);
  const jestConfig = {};
  Object.keys(stencilConfigTesting).forEach((key) => {
    if (validJestConfigKeys.includes(key)) {
      jestConfig[key] = stencilConfigTesting[key];
    }
  });
  jestConfig.rootDir = config.rootDir;
  if (isString(stencilConfigTesting.collectCoverage)) {
    jestConfig.collectCoverage = stencilConfigTesting.collectCoverage;
  }
  if (Array.isArray(stencilConfigTesting.collectCoverageFrom)) {
    jestConfig.collectCoverageFrom = stencilConfigTesting.collectCoverageFrom;
  }
  if (isString(stencilConfigTesting.coverageDirectory)) {
    jestConfig.coverageDirectory = stencilConfigTesting.coverageDirectory;
  }
  if (stencilConfigTesting.coverageThreshold) {
    jestConfig.coverageThreshold = stencilConfigTesting.coverageThreshold;
  }
  if (isString(stencilConfigTesting.globalSetup)) {
    jestConfig.globalSetup = stencilConfigTesting.globalSetup;
  }
  if (isString(stencilConfigTesting.globalTeardown)) {
    jestConfig.globalTeardown = stencilConfigTesting.globalTeardown;
  }
  if (isString(stencilConfigTesting.preset)) {
    jestConfig.preset = stencilConfigTesting.preset;
  }
  if (stencilConfigTesting.projects) {
    jestConfig.projects = stencilConfigTesting.projects;
  }
  if (Array.isArray(stencilConfigTesting.reporters)) {
    jestConfig.reporters = stencilConfigTesting.reporters;
  }
  if (isString(stencilConfigTesting.testResultsProcessor)) {
    jestConfig.testResultsProcessor = stencilConfigTesting.testResultsProcessor;
  }
  if (stencilConfigTesting.transform) {
    jestConfig.transform = stencilConfigTesting.transform;
  }
  if (stencilConfigTesting.verbose) {
    jestConfig.verbose = stencilConfigTesting.verbose;
  }
  if (typeof stencilConfigTesting.bail !== "undefined") {
    jestConfig.bail = typeof stencilConfigTesting.bail === "number" ? stencilConfigTesting.bail : stencilConfigTesting.bail ? 1 : 0;
  }
  if (stencilConfigTesting.prettierPath) {
    jestConfig.prettierPath = stencilConfigTesting.prettierPath;
  }
  if (stencilConfigTesting.restoreMocks) {
    jestConfig.restoreMocks = stencilConfigTesting.restoreMocks;
  }
  jestConfig.testRunner = new Jest28Stencil().getDefaultJestRunner();
  return JSON.stringify(jestConfig);
}
function getProjectListFromCLIArgs2(config, argv) {
  const projects = argv.projects ? argv.projects : [];
  projects.push(config.rootDir);
  return projects;
}

// src/testing/jest/jest-28/jest-runner.ts
async function runJest2(config, env2) {
  let success = false;
  try {
    const emulateConfigs = getEmulateConfigs2(config.testing, config.flags);
    env2.__STENCIL_EMULATE_CONFIGS__ = JSON.stringify(emulateConfigs);
    env2.__STENCIL_ENV__ = JSON.stringify(config.env);
    env2.__STENCIL_TRANSPILE_PATHS__ = config.transformAliasedImportPaths ? "true" : "false";
    if (config.flags.ci || config.flags.e2e) {
      env2.__STENCIL_DEFAULT_TIMEOUT__ = "30000";
    } else {
      env2.__STENCIL_DEFAULT_TIMEOUT__ = "15000";
    }
    if (config.flags.devtools) {
      env2.__STENCIL_DEFAULT_TIMEOUT__ = "300000000";
    }
    config.logger.debug(`default timeout: ${env2.__STENCIL_DEFAULT_TIMEOUT__}`);
    const jestArgv = buildJestArgv2(config);
    const projects = getProjectListFromCLIArgs2(config, jestArgv);
    const { runCLI } = require("@jest/core");
    const cliResults = await runCLI(jestArgv, projects);
    success = !!cliResults.results.success;
  } catch (e) {
    config.logger.error(`runJest: ${e}`);
  }
  return success;
}
function createTestRunner2() {
  class StencilTestRunner extends import_jest_runner5.default {
    async runTests(tests, watcher, options) {
      const env2 = process.env;
      tests = tests.filter((t) => includeTestFile2(t.path, env2));
      if (env2.__STENCIL_SCREENSHOT__ === "true" && env2.__STENCIL_EMULATE_CONFIGS__) {
        const emulateConfigs = JSON.parse(env2.__STENCIL_EMULATE_CONFIGS__);
        for (let i = 0; i < emulateConfigs.length; i++) {
          const emulateConfig = emulateConfigs[i];
          setScreenshotEmulateData(emulateConfig, env2);
          await super.runTests(tests, watcher, options);
        }
      } else {
        await super.runTests(tests, watcher, options);
      }
    }
  }
  return StencilTestRunner;
}
function includeTestFile2(testPath, env2) {
  testPath = testPath.toLowerCase().replace(/\\/g, "/");
  const hasE2E = testPath.includes(".e2e.") || testPath.includes("/e2e.");
  if (env2.__STENCIL_E2E_TESTS__ === "true" && hasE2E) {
    return true;
  }
  if (env2.__STENCIL_SPEC_TESTS__ === "true" && !hasE2E) {
    return true;
  }
  return false;
}
function getEmulateConfigs2(testing, flags) {
  var _a2, _b;
  let emulateConfigs = (_b = (_a2 = testing.emulate) == null ? void 0 : _a2.slice()) != null ? _b : [];
  if (typeof flags.emulate === "string") {
    const emulateFlag = flags.emulate.toLowerCase();
    emulateConfigs = emulateConfigs.filter((emulateConfig) => {
      if (typeof emulateConfig.device === "string" && emulateConfig.device.toLowerCase() === emulateFlag) {
        return true;
      }
      if (typeof emulateConfig.userAgent === "string" && emulateConfig.userAgent.toLowerCase().includes(emulateFlag)) {
        return true;
      }
      return false;
    });
  }
  return emulateConfigs;
}

// src/testing/jest/jest-28/jest-screenshot.ts
var import_path6 = require("path");
async function runJestScreenshot2(config, env2) {
  config.logger.debug(`screenshot connector: ${config.testing.screenshotConnector}`);
  const ScreenshotConnector = require(config.testing.screenshotConnector);
  const connector = new ScreenshotConnector();
  const pixelmatchModulePath = (0, import_path6.join)(config.sys.getCompilerExecutingPath(), "..", "..", "screenshot", "pixel-match.js");
  config.logger.debug(`pixelmatch module: ${pixelmatchModulePath}`);
  const initTimespan = config.logger.createTimeSpan(`screenshot, initBuild started`, true);
  await connector.initBuild({
    buildId: createBuildId2(),
    buildMessage: createBuildMessage2(),
    buildTimestamp: Date.now(),
    appNamespace: config.namespace,
    rootDir: config.rootDir,
    cacheDir: config.cacheDir,
    packageDir: (0, import_path6.join)(config.sys.getCompilerExecutingPath(), "..", ".."),
    updateMaster: !!config.flags.updateScreenshot,
    logger: config.logger,
    allowableMismatchedPixels: config.testing.allowableMismatchedPixels,
    allowableMismatchedRatio: config.testing.allowableMismatchedRatio,
    pixelmatchThreshold: config.testing.pixelmatchThreshold,
    waitBeforeScreenshot: config.testing.waitBeforeScreenshot,
    pixelmatchModulePath
  });
  if (!config.flags.updateScreenshot) {
    await connector.pullMasterBuild();
  }
  initTimespan.finish(`screenshot, initBuild finished`);
  const dataPromises = await Promise.all([await connector.getMasterBuild(), await connector.getScreenshotCache()]);
  const masterBuild = dataPromises[0];
  const screenshotCache = dataPromises[1];
  env2.__STENCIL_SCREENSHOT_BUILD__ = connector.toJson(masterBuild, screenshotCache);
  const testsTimespan = config.logger.createTimeSpan(`screenshot, tests started`, true);
  const passed = await runJest2(config, env2);
  testsTimespan.finish(`screenshot, tests finished, passed: ${passed}`);
  try {
    const completeTimespan = config.logger.createTimeSpan(`screenshot, completeTimespan started`, true);
    let results = await connector.completeBuild(masterBuild);
    completeTimespan.finish(`screenshot, completeTimespan finished`);
    if (results) {
      const publishTimespan = config.logger.createTimeSpan(`screenshot, publishBuild started`, true);
      results = await connector.publishBuild(results);
      publishTimespan.finish(`screenshot, publishBuild finished`);
      if (config.flags.updateScreenshot) {
        if (results.currentBuild && typeof results.currentBuild.previewUrl === "string") {
          config.logger.info(config.logger.magenta(results.currentBuild.previewUrl));
        }
      } else {
        if (results.compare) {
          try {
            await connector.updateScreenshotCache(screenshotCache, results);
          } catch (e) {
            config.logger.error(e);
          }
          config.logger.info(`screenshots compared: ${results.compare.diffs.length}`);
          if (typeof results.compare.url === "string") {
            config.logger.info(config.logger.magenta(results.compare.url));
          }
        }
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      config.logger.error(e, e.stack);
    } else {
      config.logger.error(e);
    }
  }
  return passed;
}
function createBuildId2() {
  const d = /* @__PURE__ */ new Date();
  let fmDt = d.getFullYear() + "";
  fmDt += ("0" + (d.getMonth() + 1)).slice(-2);
  fmDt += ("0" + d.getDate()).slice(-2);
  fmDt += ("0" + d.getHours()).slice(-2);
  fmDt += ("0" + d.getMinutes()).slice(-2);
  fmDt += ("0" + d.getSeconds()).slice(-2);
  return fmDt;
}
function createBuildMessage2() {
  const d = /* @__PURE__ */ new Date();
  let fmDt = d.getFullYear() + "-";
  fmDt += ("0" + (d.getMonth() + 1)).slice(-2) + "-";
  fmDt += ("0" + d.getDate()).slice(-2) + " ";
  fmDt += ("0" + d.getHours()).slice(-2) + ":";
  fmDt += ("0" + d.getMinutes()).slice(-2) + ":";
  fmDt += ("0" + d.getSeconds()).slice(-2);
  return `Build: ${fmDt}`;
}

// src/testing/jest/jest-28/jest-setup-test-framework.ts
var import_app_data3 = _lazyRequire("@stencil/core/internal/app-data");
var import_testing2 = _lazyRequire("../internal/testing/index.js");
var import_mock_doc12 = _lazyRequire("../mock-doc/index.cjs");

// src/testing/jest/jest-28/jest-serializer.ts
var import_mock_doc8 = _lazyRequire("../mock-doc/index.cjs");
var print2 = (val) => {
  return (0, import_mock_doc8.serializeNodeToHtml)(val, {
    serializeShadowRoot: true,
    prettyHtml: true,
    outerHtml: true
  });
};
var test2 = (val) => {
  return val !== void 0 && val !== null && (val instanceof HTMLElement || val instanceof import_mock_doc8.MockNode);
};
var HtmlSerializer2 = {
  print: print2,
  test: test2
};

// src/testing/jest/jest-28/matchers/attributes.ts
var import_mock_doc9 = _lazyRequire("../mock-doc/index.cjs");
function toEqualAttribute2(elm, expectAttrName, expectAttrValue) {
  if (!elm) {
    throw new Error(`expect toMatchAttribute value is null`);
  }
  if (typeof elm.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  if (elm.nodeType !== import_mock_doc9.NODE_TYPES.ELEMENT_NODE) {
    throw new Error(`expect toMatchAttribute value is not an element`);
  }
  let receivedAttrValue = elm.getAttribute(expectAttrName);
  if (expectAttrValue != null) {
    expectAttrValue = String(expectAttrValue);
  }
  if (receivedAttrValue != null) {
    receivedAttrValue = String(receivedAttrValue);
  }
  const pass = expectAttrValue === receivedAttrValue;
  return {
    message: () => `expected attribute ${expectAttrName} "${expectAttrValue}" to ${pass ? "not " : ""}equal "${receivedAttrValue}"`,
    pass
  };
}
function toEqualAttributes2(elm, expectAttrs) {
  if (!elm) {
    throw new Error(`expect toEqualAttributes value is null`);
  }
  if (typeof elm.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  if (elm.nodeType !== import_mock_doc9.NODE_TYPES.ELEMENT_NODE) {
    throw new Error(`expect toEqualAttributes value is not an element`);
  }
  const attrNames = Object.keys(expectAttrs);
  const pass = attrNames.every((attrName) => {
    let expectAttrValue = expectAttrs[attrName];
    if (expectAttrValue != null) {
      expectAttrValue = String(expectAttrValue);
    }
    return elm.getAttribute(attrName) === expectAttrValue;
  });
  return {
    message: () => `expected attributes to ${pass ? "not " : ""}equal ${attrNames.map((a) => `[${a}="${expectAttrs[a]}"]`).join(", ")}`,
    pass
  };
}
function toHaveAttribute2(elm, expectAttrName) {
  if (!elm) {
    throw new Error(`expect toHaveAttribute value is null`);
  }
  if (typeof elm.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  if (elm.nodeType !== import_mock_doc9.NODE_TYPES.ELEMENT_NODE) {
    throw new Error(`expect toHaveAttribute value is not an element`);
  }
  const pass = elm.hasAttribute(expectAttrName);
  return {
    message: () => `expected to ${pass ? "not " : ""}have the attribute "${expectAttrName}"`,
    pass
  };
}

// src/testing/jest/jest-28/matchers/class-list.ts
function toHaveClass2(elm, expectClassName) {
  if (!elm) {
    throw new Error(`expect toHaveClass value is null`);
  }
  if (typeof elm.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  if (elm.nodeType !== 1) {
    throw new Error(`expect toHaveClass value is not an element`);
  }
  const pass = elm.classList.contains(expectClassName);
  return {
    message: () => `expected to ${pass ? "not " : ""}have css class "${expectClassName}"`,
    pass
  };
}
function toHaveClasses2(elm, expectClassNames) {
  if (!elm) {
    throw new Error(`expect toHaveClasses value is null`);
  }
  if (typeof elm.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  if (elm.nodeType !== 1) {
    throw new Error(`expect toHaveClasses value is not an element`);
  }
  const pass = expectClassNames.every((expectClassName) => {
    return elm.classList.contains(expectClassName);
  });
  return {
    message: () => `expected to ${pass ? "not " : ""}have css classes "${expectClassNames.join(" ")}", but className is "${elm.className}"`,
    pass
  };
}
function toMatchClasses2(elm, expectClassNames) {
  let { pass } = toHaveClasses2(elm, expectClassNames);
  if (pass) {
    pass = expectClassNames.length === elm.classList.length;
  }
  return {
    message: () => `expected to ${pass ? "not " : ""}match css classes "${expectClassNames.join(" ")}", but className is "${elm.className}"`,
    pass
  };
}

// src/testing/jest/jest-28/matchers/events.ts
function toHaveReceivedEvent2(eventSpy) {
  if (!eventSpy) {
    throw new Error(`toHaveReceivedEvent event spy is null`);
  }
  if (typeof eventSpy.then === "function") {
    throw new Error(`event spy must be a resolved value, not a promise, before it can be tested`);
  }
  if (!eventSpy.eventName) {
    throw new Error(`toHaveReceivedEvent did not receive an event spy`);
  }
  const pass = eventSpy.events.length > 0;
  return {
    message: () => `expected to have ${pass ? "not " : ""}called "${eventSpy.eventName}" event`,
    pass
  };
}
function toHaveReceivedEventTimes2(eventSpy, count) {
  if (!eventSpy) {
    throw new Error(`toHaveReceivedEventTimes event spy is null`);
  }
  if (typeof eventSpy.then === "function") {
    throw new Error(`event spy must be a resolved value, not a promise, before it can be tested`);
  }
  if (!eventSpy.eventName) {
    throw new Error(`toHaveReceivedEventTimes did not receive an event spy`);
  }
  const pass = eventSpy.length === count;
  return {
    message: () => `expected event "${eventSpy.eventName}" to have been called ${count} times, but was called ${eventSpy.events.length} time${eventSpy.events.length > 1 ? "s" : ""}`,
    pass
  };
}
function toHaveReceivedEventDetail2(eventSpy, eventDetail) {
  if (!eventSpy) {
    throw new Error(`toHaveReceivedEventDetail event spy is null`);
  }
  if (typeof eventSpy.then === "function") {
    throw new Error(`event spy must be a resolved value, not a promise, before it can be tested`);
  }
  if (!eventSpy.eventName) {
    throw new Error(`toHaveReceivedEventDetail did not receive an event spy`);
  }
  if (!eventSpy.lastEvent) {
    throw new Error(`event "${eventSpy.eventName}" was not received`);
  }
  const pass = deepEqual2(eventSpy.lastEvent.detail, eventDetail);
  expect(eventSpy.lastEvent.detail).toEqual(eventDetail);
  return {
    message: () => `expected event "${eventSpy.eventName}" detail to ${pass ? "not " : ""}equal`,
    pass
  };
}
function toHaveFirstReceivedEventDetail2(eventSpy, eventDetail) {
  if (!eventSpy) {
    throw new Error(`toHaveFirstReceivedEventDetail event spy is null`);
  }
  if (typeof eventSpy.then === "function") {
    throw new Error(`event spy must be a resolved value, not a promise, before it can be tested`);
  }
  if (!eventSpy.eventName) {
    throw new Error(`toHaveFirstReceivedEventDetail did not receive an event spy`);
  }
  if (!eventSpy.firstEvent) {
    throw new Error(`event "${eventSpy.eventName}" was not received`);
  }
  const pass = deepEqual2(eventSpy.firstEvent.detail, eventDetail);
  expect(eventSpy.firstEvent.detail).toEqual(eventDetail);
  return {
    message: () => `expected event "${eventSpy.eventName}" detail to ${pass ? "not " : ""}equal`,
    pass
  };
}
function toHaveLastReceivedEventDetail2(eventSpy, eventDetail) {
  if (!eventSpy) {
    throw new Error(`toHaveLastReceivedEventDetail event spy is null`);
  }
  if (typeof eventSpy.then === "function") {
    throw new Error(`event spy must be a resolved value, not a promise, before it can be tested`);
  }
  if (!eventSpy.eventName) {
    throw new Error(`toHaveLastReceivedEventDetail did not receive an event spy`);
  }
  if (!eventSpy.firstEvent) {
    throw new Error(`event "${eventSpy.eventName}" was not received`);
  }
  const pass = deepEqual2(eventSpy.lastEvent.detail, eventDetail);
  expect(eventSpy.lastEvent.detail).toEqual(eventDetail);
  return {
    message: () => `expected event "${eventSpy.eventName}" detail to ${pass ? "not " : ""}equal`,
    pass
  };
}
function toHaveNthReceivedEventDetail2(eventSpy, index, eventDetail) {
  if (!eventSpy) {
    throw new Error(`toHaveNthReceivedEventDetail event spy is null`);
  }
  if (typeof eventSpy.then === "function") {
    throw new Error(`event spy must be a resolved value, not a promise, before it can be tested`);
  }
  if (!eventSpy.eventName) {
    throw new Error(`toHaveNthReceivedEventDetail did not receive an event spy`);
  }
  if (!eventSpy.firstEvent) {
    throw new Error(`event "${eventSpy.eventName}" was not received`);
  }
  const event = eventSpy.events[index];
  if (!event) {
    throw new Error(`event at index ${index} was not received`);
  }
  const pass = deepEqual2(event.detail, eventDetail);
  expect(event.detail).toEqual(eventDetail);
  return {
    message: () => `expected event "${eventSpy.eventName}" detail to ${pass ? "not " : ""}equal`,
    pass
  };
}
var deepEqual2 = function equal2(a, b) {
  if (a === b) return true;
  if (a && b && typeof a == "object" && typeof b == "object") {
    const arrA = Array.isArray(a), arrB = Array.isArray(b);
    let i, length, key;
    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; ) if (!equal2(a[i], b[i])) return false;
      return true;
    }
    if (arrA != arrB) return false;
    const dateA = a instanceof Date, dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();
    const regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();
    const keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;
    for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    for (i = length; i-- !== 0; ) {
      key = keys[i];
      if (!equal2(a[key], b[key])) return false;
    }
    return true;
  }
  return a !== a && b !== b;
};

// src/testing/jest/jest-28/matchers/html.ts
var import_mock_doc10 = _lazyRequire("../mock-doc/index.cjs");
function toEqualHtml2(input, shouldEqual) {
  return compareHtml2(input, shouldEqual, true);
}
function toEqualLightHtml2(input, shouldEqual) {
  return compareHtml2(input, shouldEqual, false);
}
function compareHtml2(input, shouldEqual, serializeShadowRoot) {
  if (input == null) {
    throw new Error(`expect toEqualHtml() value is "${input}"`);
  }
  if (typeof input.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  let serializeA;
  if (input.nodeType === import_mock_doc10.NODE_TYPES.ELEMENT_NODE) {
    const options = getSpecOptions2(input);
    serializeA = (0, import_mock_doc10.serializeNodeToHtml)(input, {
      prettyHtml: true,
      outerHtml: true,
      removeHtmlComments: options.includeAnnotations === false,
      excludeTags: ["body"],
      serializeShadowRoot
    });
  } else if (input.nodeType === import_mock_doc10.NODE_TYPES.DOCUMENT_FRAGMENT_NODE) {
    serializeA = (0, import_mock_doc10.serializeNodeToHtml)(input, {
      prettyHtml: true,
      excludeTags: ["style"],
      excludeTagContent: ["style"],
      serializeShadowRoot
    });
  } else if (typeof input === "string") {
    const parseA = (0, import_mock_doc10.parseHtmlToFragment)(input);
    serializeA = (0, import_mock_doc10.serializeNodeToHtml)(parseA, {
      prettyHtml: true,
      serializeShadowRoot
    });
  } else {
    throw new Error(`expect toEqualHtml() value should be an element, shadow root or string.`);
  }
  const parseB = (0, import_mock_doc10.parseHtmlToFragment)(shouldEqual);
  const serializeB = (0, import_mock_doc10.serializeNodeToHtml)(parseB, {
    prettyHtml: true,
    excludeTags: ["body"]
  });
  if (serializeA !== serializeB) {
    expect(serializeA).toBe(serializeB);
    return {
      message: () => "HTML does not match",
      pass: false
    };
  }
  return {
    message: () => "expect HTML to match",
    pass: true
  };
}
function getSpecOptions2(el) {
  if (el && el.ownerDocument && el.ownerDocument.defaultView) {
    return el.ownerDocument.defaultView["__stencil_spec_options"] || {};
  }
  return {};
}

// src/testing/jest/jest-28/matchers/screenshot.ts
function toMatchScreenshot2(compare, opts = {}) {
  if (!compare) {
    throw new Error(`expect toMatchScreenshot value is null`);
  }
  if (typeof compare.then === "function") {
    throw new Error(
      `expect(compare).toMatchScreenshot() must be a resolved value, not a promise, before it can be tested`
    );
  }
  if (typeof compare.mismatchedPixels !== "number") {
    throw new Error(
      `expect toMatchScreenshot() value is not a valid screenshot compare object - 'mismatchedPixels' has type '${typeof compare.mismatchedPixels}', but should be a number`
    );
  }
  if (typeof compare.deviceScaleFactor !== "number") {
    throw new Error(
      `expect toMatchScreenshot() value is not a valid screenshot compare object - 'deviceScaleFactor' has type '${typeof compare.deviceScaleFactor}', but should be a number`
    );
  }
  const device = compare.device || compare.userAgent;
  if (typeof opts.allowableMismatchedRatio === "number") {
    if (opts.allowableMismatchedRatio < 0 || opts.allowableMismatchedRatio > 1) {
      throw new Error(`expect toMatchScreenshot() allowableMismatchedRatio must be a value ranging from 0 to 1`);
    }
    const mismatchedRatio = compare.mismatchedPixels / (compare.width * compare.deviceScaleFactor * (compare.height * compare.deviceScaleFactor));
    return {
      message: () => `${device}: screenshot has a mismatch ratio of "${mismatchedRatio}" for "${compare.desc}", but expected ratio to be less than "${opts.allowableMismatchedRatio}"`,
      pass: mismatchedRatio <= opts.allowableMismatchedRatio
    };
  }
  if (typeof opts.allowableMismatchedPixels === "number") {
    if (opts.allowableMismatchedPixels < 0) {
      throw new Error(
        `expect toMatchScreenshot() allowableMismatchedPixels value must be a value that is 0 or greater`
      );
    }
    return {
      message: () => `${device}: screenshot has "${compare.mismatchedPixels}" mismatched pixels for "${compare.desc}", but expected less than "${opts.allowableMismatchedPixels}" mismatched pixels`,
      pass: compare.mismatchedPixels <= opts.allowableMismatchedPixels
    };
  }
  if (typeof compare.allowableMismatchedRatio === "number") {
    const mismatchedRatio = compare.mismatchedPixels / (compare.width * compare.deviceScaleFactor * (compare.height * compare.deviceScaleFactor));
    return {
      message: () => `${device}: screenshot has a mismatch ratio of "${mismatchedRatio}" for "${compare.desc}", but expected ratio to be less than "${compare.allowableMismatchedRatio}"`,
      pass: mismatchedRatio <= compare.allowableMismatchedRatio
    };
  }
  if (typeof compare.allowableMismatchedPixels === "number") {
    return {
      message: () => `${device}: screenshot has "${compare.mismatchedPixels}" mismatched pixels for "${compare.desc}", but expected less than "${compare.allowableMismatchedPixels}" mismatched pixels`,
      pass: compare.mismatchedPixels <= compare.allowableMismatchedPixels
    };
  }
  throw new Error(`expect toMatchScreenshot() missing allowableMismatchedPixels in testing config`);
}

// src/testing/jest/jest-28/matchers/text.ts
var import_mock_doc11 = _lazyRequire("../mock-doc/index.cjs");
function toEqualText2(input, expectTextContent) {
  var _a2;
  if (input == null) {
    throw new Error(`expect toEqualText() value is "${input}"`);
  }
  if (typeof input.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  let textContent;
  if (input.nodeType === import_mock_doc11.NODE_TYPES.ELEMENT_NODE) {
    textContent = ((_a2 = input.textContent) != null ? _a2 : "").replace(/\s\s+/g, " ").trim();
  } else {
    textContent = String(input).replace(/\s\s+/g, " ").trim();
  }
  if (typeof expectTextContent === "string") {
    expectTextContent = expectTextContent.replace(/\s\s+/g, " ").trim();
  }
  const pass = textContent === expectTextContent;
  return {
    message: () => `expected textContent "${expectTextContent}" to ${pass ? "not " : ""}equal "${textContent}"`,
    pass
  };
}

// src/testing/jest/jest-28/matchers/index.ts
var expectExtend2 = {
  toEqualAttribute: toEqualAttribute2,
  toEqualAttributes: toEqualAttributes2,
  toEqualHtml: toEqualHtml2,
  toEqualLightHtml: toEqualLightHtml2,
  toEqualText: toEqualText2,
  toHaveAttribute: toHaveAttribute2,
  toHaveClass: toHaveClass2,
  toHaveClasses: toHaveClasses2,
  toMatchClasses: toMatchClasses2,
  toHaveReceivedEvent: toHaveReceivedEvent2,
  toHaveReceivedEventDetail: toHaveReceivedEventDetail2,
  toHaveReceivedEventTimes: toHaveReceivedEventTimes2,
  toHaveFirstReceivedEventDetail: toHaveFirstReceivedEventDetail2,
  toHaveLastReceivedEventDetail: toHaveLastReceivedEventDetail2,
  toHaveNthReceivedEventDetail: toHaveNthReceivedEventDetail2,
  toMatchScreenshot: toMatchScreenshot2
};

// src/testing/jest/jest-28/jest-setup-test-framework.ts
function jestSetupTestFramework2() {
  global.resourcesUrl = "/build";
  expect.extend(expectExtend2);
  expect.addSnapshotSerializer(HtmlSerializer2);
  (0, import_mock_doc12.setupGlobal)(global);
  setupMockFetch(global);
  beforeEach(() => {
    (0, import_testing2.resetPlatform)();
    (0, import_testing2.setErrorHandler)(void 0);
    resetBuildConditionals(import_app_data3.BUILD);
    import_testing2.modeResolutionChain.length = 0;
  });
  afterEach(async () => {
    var _a2, _b, _c, _d, _e, _f;
    (0, import_testing2.stopAutoApplyChanges)();
    const bodyNode = (_e = (_d = (_c = (_b = (_a2 = global.window) == null ? void 0 : _a2.document) == null ? void 0 : _b.childNodes) == null ? void 0 : _c[1]) == null ? void 0 : _d.childNodes) == null ? void 0 : _e.find((ref) => ref.nodeName === "BODY");
    (_f = bodyNode == null ? void 0 : bodyNode.childNodes) == null ? void 0 : _f.forEach(removeDomNodes2);
    (0, import_mock_doc12.teardownGlobal)(global);
    global.resourcesUrl = "/build";
  });
  afterAll(async () => {
    if (global.__CLOSE_OPEN_PAGES__) {
      await global.__CLOSE_OPEN_PAGES__();
    }
  });
  global.screenshotDescriptions = /* @__PURE__ */ new Set();
  const env2 = process.env;
  if (typeof env2.__STENCIL_DEFAULT_TIMEOUT__ === "string") {
    const time = parseInt(env2.__STENCIL_DEFAULT_TIMEOUT__, 10);
    jest.setTimeout(time * 1.5);
  }
  if (typeof env2.__STENCIL_ENV__ === "string") {
    const stencilEnv = JSON.parse(env2.__STENCIL_ENV__);
    Object.assign(import_app_data3.Env, stencilEnv);
  }
}
function removeDomNodes2(node) {
  var _a2, _b;
  if (node == null) {
    return;
  }
  if (!((_a2 = node.childNodes) == null ? void 0 : _a2.length)) {
    node.remove();
  }
  (_b = node.childNodes) == null ? void 0 : _b.forEach(removeDomNodes2);
}

// src/testing/jest/jest-28/jest-facade.ts
var Jest28Stencil = class {
  getJestCliRunner() {
    return runJest2;
  }
  getRunJestScreenshot() {
    return runJestScreenshot2;
  }
  getDefaultJestRunner() {
    return "jest-circus";
  }
  getCreateJestPuppeteerEnvironment() {
    return createJestPuppeteerEnvironment2;
  }
  getJestPreprocessor() {
    return jestPreprocessor2;
  }
  getCreateJestTestRunner() {
    return createTestRunner2;
  }
  getJestSetupTestFramework() {
    return jestSetupTestFramework2;
  }
  getJestPreset() {
    return preset2;
  }
};

// src/testing/jest/jest-29/jest-environment.ts
var import_jest_environment_node3 = require("jest-environment-node");
function createJestPuppeteerEnvironment3() {
  const JestEnvironment = class extends import_jest_environment_node3.TestEnvironment {
    browser;
    pages;
    testPath;
    constructor(config, context) {
      super(config, context);
      this.browser = null;
      this.pages = [];
      this.testPath = context.testPath;
    }
    async setup() {
      if (process.env.__STENCIL_E2E_TESTS__ === "true") {
        const globalContext = this.global;
        globalContext.__NEW_TEST_PAGE__ = this.newPuppeteerPage.bind(this);
        globalContext.__CLOSE_OPEN_PAGES__ = this.closeOpenPages.bind(this);
      }
    }
    /**
     * Jest Circus hook for capturing events.
     *
     * We use this lifecycle hook to capture information about the currently running test in the event that it is a
     * Jest-Stencil screenshot test, so that we may accurately report on it.
     *
     * @param event the captured runtime event
     */
    async handleTestEvent(event) {
      const ROOT_DESCRIBE_BLOCK = "ROOT_DESCRIBE_BLOCK";
      if (event.name === "test_start") {
        const eventTest = event.test;
        let fullName = eventTest.name;
        let currentParent = eventTest.parent;
        while (currentParent && currentParent.name && currentParent.name != ROOT_DESCRIBE_BLOCK) {
          fullName = `${currentParent.name} ${fullName}`;
          currentParent = currentParent.parent;
        }
        const globalContext = this.global;
        globalContext.currentSpec = {
          // the event's test's name is analogous to the original description in earlier versions of jest
          description: eventTest.name,
          fullName,
          testPath: this.testPath
        };
      }
    }
    async newPuppeteerPage() {
      if (!this.browser) {
        this.browser = await connectBrowser();
      }
      await this.closeOpenPages();
      const page = await newBrowserPage(this.browser);
      this.pages.push(page);
      const env2 = process.env;
      if (typeof env2.__STENCIL_DEFAULT_TIMEOUT__ === "string") {
        page.setDefaultTimeout(parseInt(env2.__STENCIL_DEFAULT_TIMEOUT__, 10));
      }
      return page;
    }
    async closeOpenPages() {
      await Promise.all(this.pages.filter((page) => !page.isClosed()).map((page) => page.close()));
      this.pages.length = 0;
    }
    async teardown() {
      await super.teardown();
      await this.closeOpenPages();
      await disconnectBrowser(this.browser);
      this.browser = null;
    }
    getVmContext() {
      return super.getVmContext();
    }
  };
  return JestEnvironment;
}

// src/testing/jest/jest-29/jest-preprocessor.ts
var import_compiler4 = require("../compiler/stencil.js");
var CACHE_BUSTER3 = 9;
var _tsCompilerOptions3 = null;
var _tsCompilerOptionsKey3 = null;
var jestPreprocessor3 = {
  /**
   * Transforms a file to CommonJS to be used by Jest. The API for `process` is described in the
   * ["Writing custom transformers"](https://jestjs.io/docs/code-transformation#writing-custom-transformers)
   * documentation on the jest site. Unfortunately, the URL is not versioned at the time of this writing. For
   * reference, the v28 docs were referenced.
   *
   * @param sourceText the contents of the source file
   * @param sourcePath the path to the source file
   * @param options the transformation options to apply to each file
   * @returns the transformed file contents if the file should be transformed. returns the original source otherwise
   */
  process(sourceText, sourcePath, options) {
    const transformOptions = options.config;
    if (shouldTransform3(sourcePath, sourceText)) {
      const opts = {
        file: sourcePath,
        currentDirectory: transformOptions.rootDir
      };
      const tsCompilerOptions = getCompilerOptions3(transformOptions.rootDir);
      if (tsCompilerOptions) {
        if (tsCompilerOptions.baseUrl) {
          opts.baseUrl = tsCompilerOptions.baseUrl;
        }
        if (tsCompilerOptions.paths) {
          opts.paths = tsCompilerOptions.paths;
        }
        if (tsCompilerOptions.jsx !== void 0) {
          opts.jsx = tsCompilerOptions.jsx;
        }
        if (tsCompilerOptions.jsxImportSource) {
          opts.jsxImportSource = "@stencil/core/internal/testing";
        }
      }
      const results = transpile(sourceText, opts);
      const hasErrors = results.diagnostics.some((diagnostic) => diagnostic.level === "error");
      if (results.diagnostics && hasErrors) {
        const msg = results.diagnostics.map(formatDiagnostic3).join("\n\n");
        throw new Error(msg);
      }
      return { code: results.code };
    }
    return { code: sourceText };
  },
  /**
   * Generates a key used to cache the results of transforming a file. This helps avoid re-processing a file via the
   * `transform` function unnecessarily (when no changes have occurred). The API for `getCacheKey` is described in the
   * ["Writing custom transformers"](https://jestjs.io/docs/code-transformation#writing-custom-transformers)
   * documentation on the jest site. Unfortunately, the URL is not versioned at the time of this writing. For
   * reference, the v28 docs were referenced.
   *
   * @param sourceText the contents of the source file
   * @param sourcePath the path to the source file
   * @param options the transformation options to apply to each file
   * @returns the key to cache a file with
   */
  getCacheKey(sourceText, sourcePath, options) {
    const transformOptions = options.config;
    if (!_tsCompilerOptionsKey3) {
      const opts = getCompilerOptions3(transformOptions.rootDir);
      _tsCompilerOptionsKey3 = JSON.stringify(opts);
    }
    const key = [
      process.version,
      _tsCompilerOptionsKey3,
      sourceText,
      sourcePath,
      options,
      !!options.instrument,
      CACHE_BUSTER3
    ];
    return key.join(":");
  }
};
function formatDiagnostic3(diagnostic) {
  let m = "";
  if (diagnostic.relFilePath) {
    m += diagnostic.relFilePath;
    if (typeof diagnostic.lineNumber === "number") {
      m += ":" + diagnostic.lineNumber + 1;
      if (typeof diagnostic.columnNumber === "number") {
        m += ":" + diagnostic.columnNumber;
      }
    }
    m += "\n";
  }
  m += diagnostic.messageText;
  return m;
}
function getCompilerOptions3(rootDir4) {
  if (_tsCompilerOptions3) {
    return _tsCompilerOptions3;
  }
  if (typeof rootDir4 !== "string") {
    return null;
  }
  rootDir4 = normalizePath(rootDir4);
  const tsconfigFilePath = import_compiler4.ts.findConfigFile(rootDir4, import_compiler4.ts.sys.fileExists);
  if (!tsconfigFilePath) {
    return null;
  }
  const tsconfigResults = import_compiler4.ts.readConfigFile(tsconfigFilePath, import_compiler4.ts.sys.readFile);
  if (tsconfigResults.error) {
    throw new Error(formatDiagnostic3(loadTypeScriptDiagnostic(tsconfigResults.error)));
  }
  const parseResult = import_compiler4.ts.parseJsonConfigFileContent(
    tsconfigResults.config,
    import_compiler4.ts.sys,
    rootDir4,
    void 0,
    tsconfigFilePath
  );
  _tsCompilerOptions3 = parseResult.options;
  return _tsCompilerOptions3;
}
function shouldTransform3(filePath, sourceText) {
  var _a2;
  const ext2 = ((_a2 = filePath.split(".").pop()) != null ? _a2 : "").toLowerCase().split("?")[0];
  if (ext2 === "ts" || ext2 === "tsx" || ext2 === "jsx") {
    return true;
  }
  if (ext2 === "mjs") {
    return true;
  }
  if (ext2 === "js") {
    if (sourceText.includes("import ") || sourceText.includes("import.") || sourceText.includes("import(")) {
      return true;
    }
    if (sourceText.includes("export ")) {
      return true;
    }
  }
  if (ext2 === "css") {
    return true;
  }
  return false;
}

// src/testing/jest/jest-29/jest-preset.ts
var import_path7 = require("path");
var testingDir3 = __dirname;
var rootDir3 = (0, import_path7.join)(testingDir3, "..");
var internalDir3 = (0, import_path7.join)(rootDir3, "internal");
var moduleExtensions3 = ["ts", "tsx", "js", "mjs", "jsx"];
var moduleExtensionRegexp3 = "(" + moduleExtensions3.join("|") + ")";
var preset3 = {
  moduleFileExtensions: [...moduleExtensions3, "json", "d.ts"],
  moduleNameMapper: {
    "^@stencil/core/cli$": (0, import_path7.join)(rootDir3, "cli", "index.js"),
    "^@stencil/core/compiler$": (0, import_path7.join)(rootDir3, "compiler", "stencil.js"),
    "^@stencil/core/internal$": (0, import_path7.join)(internalDir3, "testing", "index.js"),
    "^@stencil/core/internal/app-data$": (0, import_path7.join)(internalDir3, "app-data", "index.cjs"),
    "^@stencil/core/internal/app-globals$": (0, import_path7.join)(internalDir3, "app-globals", "index.js"),
    "^@stencil/core/internal/testing$": (0, import_path7.join)(internalDir3, "testing", "index.js"),
    "^@stencil/core/mock-doc$": (0, import_path7.join)(rootDir3, "mock-doc", "index.cjs"),
    "^@stencil/core/sys$": (0, import_path7.join)(rootDir3, "sys", "node", "index.js"),
    "^@stencil/core/testing$": (0, import_path7.join)(testingDir3, "index.js"),
    "^@stencil/core$": (0, import_path7.join)(internalDir3, "testing", "index.js")
  },
  setupFilesAfterEnv: [(0, import_path7.join)(testingDir3, "jest-setuptestframework.js")],
  testEnvironment: (0, import_path7.join)(testingDir3, "jest-environment.js"),
  testPathIgnorePatterns: ["/.cache", "/.stencil", "/.vscode", "/dist", "/node_modules", "/www"],
  testRegex: "(/__tests__/.*|\\.?(test|spec))\\." + moduleExtensionRegexp3 + "$",
  transform: {
    "^.+\\.(ts|tsx|jsx|css|mjs)$": (0, import_path7.join)(testingDir3, "jest-preprocessor.js")
  },
  watchPathIgnorePatterns: ["^.+\\.d\\.ts$"]
};

// src/testing/jest/jest-29/jest-runner.ts
var import_jest_runner9 = __toESM(require("jest-runner"));

// src/testing/jest/jest-29/jest-config.ts
var import_cli3 = require("../cli/index.cjs");
function buildJestArgv3(config) {
  const yargs = require("yargs");
  const knownArgs = config.flags.knownArgs.slice();
  if (!knownArgs.some((a) => a.startsWith("--max-workers") || a.startsWith("--maxWorkers"))) {
    knownArgs.push(`--max-workers=${config.maxConcurrentWorkers}`);
  }
  if (config.flags.devtools) {
    knownArgs.push("--runInBand");
  }
  const args = [...knownArgs, ...config.flags.unknownArgs];
  config.logger.info(config.logger.magenta(`jest args: ${args.join(" ")}`));
  const jestArgv = yargs(args).argv;
  jestArgv.config = buildJestConfig3(config);
  if (typeof jestArgv.maxWorkers === "string") {
    try {
      jestArgv.maxWorkers = parseInt(jestArgv.maxWorkers, 10);
    } catch (e) {
    }
  }
  if (typeof jestArgv.ci === "string") {
    jestArgv.ci = jestArgv.ci === "true" || jestArgv.ci === "";
  }
  for (const flag of import_cli3.BOOLEAN_CLI_FLAGS) {
    if (typeof jestArgv[flag] === "string") {
      jestArgv[flag] = jestArgv[flag] === "true";
    }
  }
  return jestArgv;
}
function buildJestConfig3(config) {
  const stencilConfigTesting = config.testing;
  const jestDefaults = require("jest-config").defaults;
  const validJestConfigKeys = Object.keys(jestDefaults);
  const jestConfig = {};
  Object.keys(stencilConfigTesting).forEach((key) => {
    if (validJestConfigKeys.includes(key)) {
      jestConfig[key] = stencilConfigTesting[key];
    }
  });
  jestConfig.rootDir = config.rootDir;
  if (isString(stencilConfigTesting.collectCoverage)) {
    jestConfig.collectCoverage = stencilConfigTesting.collectCoverage;
  }
  if (Array.isArray(stencilConfigTesting.collectCoverageFrom)) {
    jestConfig.collectCoverageFrom = stencilConfigTesting.collectCoverageFrom;
  }
  if (isString(stencilConfigTesting.coverageDirectory)) {
    jestConfig.coverageDirectory = stencilConfigTesting.coverageDirectory;
  }
  if (stencilConfigTesting.coverageThreshold) {
    jestConfig.coverageThreshold = stencilConfigTesting.coverageThreshold;
  }
  if (isString(stencilConfigTesting.globalSetup)) {
    jestConfig.globalSetup = stencilConfigTesting.globalSetup;
  }
  if (isString(stencilConfigTesting.globalTeardown)) {
    jestConfig.globalTeardown = stencilConfigTesting.globalTeardown;
  }
  if (isString(stencilConfigTesting.preset)) {
    jestConfig.preset = stencilConfigTesting.preset;
  }
  if (stencilConfigTesting.projects) {
    jestConfig.projects = stencilConfigTesting.projects;
  }
  if (Array.isArray(stencilConfigTesting.reporters)) {
    jestConfig.reporters = stencilConfigTesting.reporters;
  }
  if (isString(stencilConfigTesting.testResultsProcessor)) {
    jestConfig.testResultsProcessor = stencilConfigTesting.testResultsProcessor;
  }
  if (stencilConfigTesting.transform) {
    jestConfig.transform = stencilConfigTesting.transform;
  }
  if (stencilConfigTesting.verbose) {
    jestConfig.verbose = stencilConfigTesting.verbose;
  }
  if (typeof stencilConfigTesting.bail !== "undefined") {
    jestConfig.bail = typeof stencilConfigTesting.bail === "number" ? stencilConfigTesting.bail : stencilConfigTesting.bail ? 1 : 0;
  }
  if (stencilConfigTesting.prettierPath) {
    jestConfig.prettierPath = stencilConfigTesting.prettierPath;
  }
  if (stencilConfigTesting.restoreMocks) {
    jestConfig.restoreMocks = stencilConfigTesting.restoreMocks;
  }
  jestConfig.testRunner = new Jest29Stencil().getDefaultJestRunner();
  return JSON.stringify(jestConfig);
}
function getProjectListFromCLIArgs3(config, argv) {
  const projects = argv.projects ? argv.projects : [];
  projects.push(config.rootDir);
  return projects;
}

// src/testing/jest/jest-29/jest-runner.ts
async function runJest3(config, env2) {
  let success = false;
  try {
    const emulateConfigs = getEmulateConfigs3(config.testing, config.flags);
    env2.__STENCIL_EMULATE_CONFIGS__ = JSON.stringify(emulateConfigs);
    env2.__STENCIL_ENV__ = JSON.stringify(config.env);
    env2.__STENCIL_TRANSPILE_PATHS__ = config.transformAliasedImportPaths ? "true" : "false";
    if (config.flags.ci || config.flags.e2e) {
      env2.__STENCIL_DEFAULT_TIMEOUT__ = "30000";
    } else {
      env2.__STENCIL_DEFAULT_TIMEOUT__ = "15000";
    }
    if (config.flags.devtools) {
      env2.__STENCIL_DEFAULT_TIMEOUT__ = "300000000";
    }
    config.logger.debug(`default timeout: ${env2.__STENCIL_DEFAULT_TIMEOUT__}`);
    const jestArgv = buildJestArgv3(config);
    const projects = getProjectListFromCLIArgs3(config, jestArgv);
    const { runCLI } = require("@jest/core");
    const cliResults = await runCLI(jestArgv, projects);
    success = !!cliResults.results.success;
  } catch (e) {
    config.logger.error(`runJest: ${e}`);
  }
  return success;
}
function createTestRunner3() {
  class StencilTestRunner extends import_jest_runner9.default {
    async runTests(tests, watcher, options) {
      const env2 = process.env;
      tests = tests.filter((t) => includeTestFile3(t.path, env2));
      if (env2.__STENCIL_SCREENSHOT__ === "true" && env2.__STENCIL_EMULATE_CONFIGS__) {
        const emulateConfigs = JSON.parse(env2.__STENCIL_EMULATE_CONFIGS__);
        for (let i = 0; i < emulateConfigs.length; i++) {
          const emulateConfig = emulateConfigs[i];
          setScreenshotEmulateData(emulateConfig, env2);
          await super.runTests(tests, watcher, options);
        }
      } else {
        await super.runTests(tests, watcher, options);
      }
    }
  }
  return StencilTestRunner;
}
function includeTestFile3(testPath, env2) {
  testPath = testPath.toLowerCase().replace(/\\/g, "/");
  const hasE2E = testPath.includes(".e2e.") || testPath.includes("/e2e.");
  if (env2.__STENCIL_E2E_TESTS__ === "true" && hasE2E) {
    return true;
  }
  if (env2.__STENCIL_SPEC_TESTS__ === "true" && !hasE2E) {
    return true;
  }
  return false;
}
function getEmulateConfigs3(testing, flags) {
  var _a2, _b;
  let emulateConfigs = (_b = (_a2 = testing.emulate) == null ? void 0 : _a2.slice()) != null ? _b : [];
  if (typeof flags.emulate === "string") {
    const emulateFlag = flags.emulate.toLowerCase();
    emulateConfigs = emulateConfigs.filter((emulateConfig) => {
      if (typeof emulateConfig.device === "string" && emulateConfig.device.toLowerCase() === emulateFlag) {
        return true;
      }
      if (typeof emulateConfig.userAgent === "string" && emulateConfig.userAgent.toLowerCase().includes(emulateFlag)) {
        return true;
      }
      return false;
    });
  }
  return emulateConfigs;
}

// src/testing/jest/jest-29/jest-screenshot.ts
var import_path8 = require("path");
async function runJestScreenshot3(config, env2) {
  config.logger.debug(`screenshot connector: ${config.testing.screenshotConnector}`);
  const ScreenshotConnector = require(config.testing.screenshotConnector);
  const connector = new ScreenshotConnector();
  const pixelmatchModulePath = (0, import_path8.join)(config.sys.getCompilerExecutingPath(), "..", "..", "screenshot", "pixel-match.js");
  config.logger.debug(`pixelmatch module: ${pixelmatchModulePath}`);
  const initTimespan = config.logger.createTimeSpan(`screenshot, initBuild started`, true);
  await connector.initBuild({
    buildId: createBuildId3(),
    buildMessage: createBuildMessage3(),
    buildTimestamp: Date.now(),
    appNamespace: config.namespace,
    rootDir: config.rootDir,
    cacheDir: config.cacheDir,
    packageDir: (0, import_path8.join)(config.sys.getCompilerExecutingPath(), "..", ".."),
    updateMaster: !!config.flags.updateScreenshot,
    logger: config.logger,
    allowableMismatchedPixels: config.testing.allowableMismatchedPixels,
    allowableMismatchedRatio: config.testing.allowableMismatchedRatio,
    pixelmatchThreshold: config.testing.pixelmatchThreshold,
    waitBeforeScreenshot: config.testing.waitBeforeScreenshot,
    pixelmatchModulePath
  });
  if (!config.flags.updateScreenshot) {
    await connector.pullMasterBuild();
  }
  initTimespan.finish(`screenshot, initBuild finished`);
  const dataPromises = await Promise.all([await connector.getMasterBuild(), await connector.getScreenshotCache()]);
  const masterBuild = dataPromises[0];
  const screenshotCache = dataPromises[1];
  env2.__STENCIL_SCREENSHOT_BUILD__ = connector.toJson(masterBuild, screenshotCache);
  const testsTimespan = config.logger.createTimeSpan(`screenshot, tests started`, true);
  const passed = await runJest3(config, env2);
  testsTimespan.finish(`screenshot, tests finished, passed: ${passed}`);
  try {
    const completeTimespan = config.logger.createTimeSpan(`screenshot, completeTimespan started`, true);
    let results = await connector.completeBuild(masterBuild);
    completeTimespan.finish(`screenshot, completeTimespan finished`);
    if (results) {
      const publishTimespan = config.logger.createTimeSpan(`screenshot, publishBuild started`, true);
      results = await connector.publishBuild(results);
      publishTimespan.finish(`screenshot, publishBuild finished`);
      if (config.flags.updateScreenshot) {
        if (results.currentBuild && typeof results.currentBuild.previewUrl === "string") {
          config.logger.info(config.logger.magenta(results.currentBuild.previewUrl));
        }
      } else {
        if (results.compare) {
          try {
            await connector.updateScreenshotCache(screenshotCache, results);
          } catch (e) {
            config.logger.error(e);
          }
          config.logger.info(`screenshots compared: ${results.compare.diffs.length}`);
          if (typeof results.compare.url === "string") {
            config.logger.info(config.logger.magenta(results.compare.url));
          }
        }
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      config.logger.error(e, e.stack);
    } else {
      config.logger.error(e);
    }
  }
  return passed;
}
function createBuildId3() {
  const d = /* @__PURE__ */ new Date();
  let fmDt = d.getFullYear() + "";
  fmDt += ("0" + (d.getMonth() + 1)).slice(-2);
  fmDt += ("0" + d.getDate()).slice(-2);
  fmDt += ("0" + d.getHours()).slice(-2);
  fmDt += ("0" + d.getMinutes()).slice(-2);
  fmDt += ("0" + d.getSeconds()).slice(-2);
  return fmDt;
}
function createBuildMessage3() {
  const d = /* @__PURE__ */ new Date();
  let fmDt = d.getFullYear() + "-";
  fmDt += ("0" + (d.getMonth() + 1)).slice(-2) + "-";
  fmDt += ("0" + d.getDate()).slice(-2) + " ";
  fmDt += ("0" + d.getHours()).slice(-2) + ":";
  fmDt += ("0" + d.getMinutes()).slice(-2) + ":";
  fmDt += ("0" + d.getSeconds()).slice(-2);
  return `Build: ${fmDt}`;
}

// src/testing/jest/jest-29/jest-setup-test-framework.ts
var import_app_data4 = _lazyRequire("@stencil/core/internal/app-data");
var import_testing3 = _lazyRequire("../internal/testing/index.js");
var import_mock_doc17 = _lazyRequire("../mock-doc/index.cjs");

// src/testing/jest/jest-29/jest-serializer.ts
var import_mock_doc13 = _lazyRequire("../mock-doc/index.cjs");
var print3 = (val) => {
  return (0, import_mock_doc13.serializeNodeToHtml)(val, {
    serializeShadowRoot: true,
    prettyHtml: true,
    outerHtml: true
  });
};
var test3 = (val) => {
  return val !== void 0 && val !== null && (val instanceof HTMLElement || val instanceof import_mock_doc13.MockNode);
};
var HtmlSerializer3 = {
  print: print3,
  test: test3
};

// src/testing/jest/jest-29/matchers/attributes.ts
var import_mock_doc14 = _lazyRequire("../mock-doc/index.cjs");
function toEqualAttribute3(elm, expectAttrName, expectAttrValue) {
  if (!elm) {
    throw new Error(`expect toMatchAttribute value is null`);
  }
  if (typeof elm.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  if (elm.nodeType !== import_mock_doc14.NODE_TYPES.ELEMENT_NODE) {
    throw new Error(`expect toMatchAttribute value is not an element`);
  }
  let receivedAttrValue = elm.getAttribute(expectAttrName);
  if (expectAttrValue != null) {
    expectAttrValue = String(expectAttrValue);
  }
  if (receivedAttrValue != null) {
    receivedAttrValue = String(receivedAttrValue);
  }
  const pass = expectAttrValue === receivedAttrValue;
  return {
    message: () => `expected attribute ${expectAttrName} "${expectAttrValue}" to ${pass ? "not " : ""}equal "${receivedAttrValue}"`,
    pass
  };
}
function toEqualAttributes3(elm, expectAttrs) {
  if (!elm) {
    throw new Error(`expect toEqualAttributes value is null`);
  }
  if (typeof elm.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  if (elm.nodeType !== import_mock_doc14.NODE_TYPES.ELEMENT_NODE) {
    throw new Error(`expect toEqualAttributes value is not an element`);
  }
  const attrNames = Object.keys(expectAttrs);
  const pass = attrNames.every((attrName) => {
    let expectAttrValue = expectAttrs[attrName];
    if (expectAttrValue != null) {
      expectAttrValue = String(expectAttrValue);
    }
    return elm.getAttribute(attrName) === expectAttrValue;
  });
  return {
    message: () => `expected attributes to ${pass ? "not " : ""}equal ${attrNames.map((a) => `[${a}="${expectAttrs[a]}"]`).join(", ")}`,
    pass
  };
}
function toHaveAttribute3(elm, expectAttrName) {
  if (!elm) {
    throw new Error(`expect toHaveAttribute value is null`);
  }
  if (typeof elm.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  if (elm.nodeType !== import_mock_doc14.NODE_TYPES.ELEMENT_NODE) {
    throw new Error(`expect toHaveAttribute value is not an element`);
  }
  const pass = elm.hasAttribute(expectAttrName);
  return {
    message: () => `expected to ${pass ? "not " : ""}have the attribute "${expectAttrName}"`,
    pass
  };
}

// src/testing/jest/jest-29/matchers/class-list.ts
function toHaveClass3(elm, expectClassName) {
  if (!elm) {
    throw new Error(`expect toHaveClass value is null`);
  }
  if (typeof elm.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  if (elm.nodeType !== 1) {
    throw new Error(`expect toHaveClass value is not an element`);
  }
  const pass = elm.classList.contains(expectClassName);
  return {
    message: () => `expected to ${pass ? "not " : ""}have css class "${expectClassName}"`,
    pass
  };
}
function toHaveClasses3(elm, expectClassNames) {
  if (!elm) {
    throw new Error(`expect toHaveClasses value is null`);
  }
  if (typeof elm.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  if (elm.nodeType !== 1) {
    throw new Error(`expect toHaveClasses value is not an element`);
  }
  const pass = expectClassNames.every((expectClassName) => {
    return elm.classList.contains(expectClassName);
  });
  return {
    message: () => `expected to ${pass ? "not " : ""}have css classes "${expectClassNames.join(" ")}", but className is "${elm.className}"`,
    pass
  };
}
function toMatchClasses3(elm, expectClassNames) {
  let { pass } = toHaveClasses3(elm, expectClassNames);
  if (pass) {
    pass = expectClassNames.length === elm.classList.length;
  }
  return {
    message: () => `expected to ${pass ? "not " : ""}match css classes "${expectClassNames.join(" ")}", but className is "${elm.className}"`,
    pass
  };
}

// src/testing/jest/jest-29/matchers/events.ts
function toHaveReceivedEvent3(eventSpy) {
  if (!eventSpy) {
    throw new Error(`toHaveReceivedEvent event spy is null`);
  }
  if (typeof eventSpy.then === "function") {
    throw new Error(`event spy must be a resolved value, not a promise, before it can be tested`);
  }
  if (!eventSpy.eventName) {
    throw new Error(`toHaveReceivedEvent did not receive an event spy`);
  }
  const pass = eventSpy.events.length > 0;
  return {
    message: () => `expected to have ${pass ? "not " : ""}called "${eventSpy.eventName}" event`,
    pass
  };
}
function toHaveReceivedEventTimes3(eventSpy, count) {
  if (!eventSpy) {
    throw new Error(`toHaveReceivedEventTimes event spy is null`);
  }
  if (typeof eventSpy.then === "function") {
    throw new Error(`event spy must be a resolved value, not a promise, before it can be tested`);
  }
  if (!eventSpy.eventName) {
    throw new Error(`toHaveReceivedEventTimes did not receive an event spy`);
  }
  const pass = eventSpy.length === count;
  return {
    message: () => `expected event "${eventSpy.eventName}" to have been called ${count} times, but was called ${eventSpy.events.length} time${eventSpy.events.length > 1 ? "s" : ""}`,
    pass
  };
}
function toHaveReceivedEventDetail3(eventSpy, eventDetail) {
  if (!eventSpy) {
    throw new Error(`toHaveReceivedEventDetail event spy is null`);
  }
  if (typeof eventSpy.then === "function") {
    throw new Error(`event spy must be a resolved value, not a promise, before it can be tested`);
  }
  if (!eventSpy.eventName) {
    throw new Error(`toHaveReceivedEventDetail did not receive an event spy`);
  }
  if (!eventSpy.lastEvent) {
    throw new Error(`event "${eventSpy.eventName}" was not received`);
  }
  const pass = deepEqual3(eventSpy.lastEvent.detail, eventDetail);
  expect(eventSpy.lastEvent.detail).toEqual(eventDetail);
  return {
    message: () => `expected event "${eventSpy.eventName}" detail to ${pass ? "not " : ""}equal`,
    pass
  };
}
function toHaveFirstReceivedEventDetail3(eventSpy, eventDetail) {
  if (!eventSpy) {
    throw new Error(`toHaveFirstReceivedEventDetail event spy is null`);
  }
  if (typeof eventSpy.then === "function") {
    throw new Error(`event spy must be a resolved value, not a promise, before it can be tested`);
  }
  if (!eventSpy.eventName) {
    throw new Error(`toHaveFirstReceivedEventDetail did not receive an event spy`);
  }
  if (!eventSpy.firstEvent) {
    throw new Error(`event "${eventSpy.eventName}" was not received`);
  }
  const pass = deepEqual3(eventSpy.firstEvent.detail, eventDetail);
  expect(eventSpy.firstEvent.detail).toEqual(eventDetail);
  return {
    message: () => `expected event "${eventSpy.eventName}" detail to ${pass ? "not " : ""}equal`,
    pass
  };
}
function toHaveLastReceivedEventDetail3(eventSpy, eventDetail) {
  if (!eventSpy) {
    throw new Error(`toHaveLastReceivedEventDetail event spy is null`);
  }
  if (typeof eventSpy.then === "function") {
    throw new Error(`event spy must be a resolved value, not a promise, before it can be tested`);
  }
  if (!eventSpy.eventName) {
    throw new Error(`toHaveLastReceivedEventDetail did not receive an event spy`);
  }
  if (!eventSpy.firstEvent) {
    throw new Error(`event "${eventSpy.eventName}" was not received`);
  }
  const pass = deepEqual3(eventSpy.lastEvent.detail, eventDetail);
  expect(eventSpy.lastEvent.detail).toEqual(eventDetail);
  return {
    message: () => `expected event "${eventSpy.eventName}" detail to ${pass ? "not " : ""}equal`,
    pass
  };
}
function toHaveNthReceivedEventDetail3(eventSpy, index, eventDetail) {
  if (!eventSpy) {
    throw new Error(`toHaveNthReceivedEventDetail event spy is null`);
  }
  if (typeof eventSpy.then === "function") {
    throw new Error(`event spy must be a resolved value, not a promise, before it can be tested`);
  }
  if (!eventSpy.eventName) {
    throw new Error(`toHaveNthReceivedEventDetail did not receive an event spy`);
  }
  if (!eventSpy.firstEvent) {
    throw new Error(`event "${eventSpy.eventName}" was not received`);
  }
  const event = eventSpy.events[index];
  if (!event) {
    throw new Error(`event at index ${index} was not received`);
  }
  const pass = deepEqual3(event.detail, eventDetail);
  expect(event.detail).toEqual(eventDetail);
  return {
    message: () => `expected event "${eventSpy.eventName}" detail to ${pass ? "not " : ""}equal`,
    pass
  };
}
var deepEqual3 = function equal3(a, b) {
  if (a === b) return true;
  if (a && b && typeof a == "object" && typeof b == "object") {
    const arrA = Array.isArray(a), arrB = Array.isArray(b);
    let i, length, key;
    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; ) if (!equal3(a[i], b[i])) return false;
      return true;
    }
    if (arrA != arrB) return false;
    const dateA = a instanceof Date, dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();
    const regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();
    const keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;
    for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    for (i = length; i-- !== 0; ) {
      key = keys[i];
      if (!equal3(a[key], b[key])) return false;
    }
    return true;
  }
  return a !== a && b !== b;
};

// src/testing/jest/jest-29/matchers/html.ts
var import_mock_doc15 = _lazyRequire("../mock-doc/index.cjs");
function toEqualHtml3(input, shouldEqual) {
  return compareHtml3(input, shouldEqual, true);
}
function toEqualLightHtml3(input, shouldEqual) {
  return compareHtml3(input, shouldEqual, false);
}
function compareHtml3(input, shouldEqual, serializeShadowRoot) {
  if (input == null) {
    throw new Error(`expect toEqualHtml() value is "${input}"`);
  }
  if (typeof input.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  let serializeA;
  if (input.nodeType === import_mock_doc15.NODE_TYPES.ELEMENT_NODE) {
    const options = getSpecOptions3(input);
    serializeA = (0, import_mock_doc15.serializeNodeToHtml)(input, {
      prettyHtml: true,
      outerHtml: true,
      removeHtmlComments: options.includeAnnotations === false,
      excludeTags: ["body"],
      serializeShadowRoot
    });
  } else if (input.nodeType === import_mock_doc15.NODE_TYPES.DOCUMENT_FRAGMENT_NODE) {
    serializeA = (0, import_mock_doc15.serializeNodeToHtml)(input, {
      prettyHtml: true,
      excludeTags: ["style"],
      excludeTagContent: ["style"],
      serializeShadowRoot
    });
  } else if (typeof input === "string") {
    const parseA = (0, import_mock_doc15.parseHtmlToFragment)(input);
    serializeA = (0, import_mock_doc15.serializeNodeToHtml)(parseA, {
      prettyHtml: true,
      serializeShadowRoot
    });
  } else {
    throw new Error(`expect toEqualHtml() value should be an element, shadow root or string.`);
  }
  const parseB = (0, import_mock_doc15.parseHtmlToFragment)(shouldEqual);
  const serializeB = (0, import_mock_doc15.serializeNodeToHtml)(parseB, {
    prettyHtml: true,
    excludeTags: ["body"]
  });
  if (serializeA !== serializeB) {
    expect(serializeA).toBe(serializeB);
    return {
      message: () => "HTML does not match",
      pass: false
    };
  }
  return {
    message: () => "expect HTML to match",
    pass: true
  };
}
function getSpecOptions3(el) {
  if (el && el.ownerDocument && el.ownerDocument.defaultView) {
    return el.ownerDocument.defaultView["__stencil_spec_options"] || {};
  }
  return {};
}

// src/testing/jest/jest-29/matchers/screenshot.ts
function toMatchScreenshot3(compare, opts = {}) {
  if (!compare) {
    throw new Error(`expect toMatchScreenshot value is null`);
  }
  if (typeof compare.then === "function") {
    throw new Error(
      `expect(compare).toMatchScreenshot() must be a resolved value, not a promise, before it can be tested`
    );
  }
  if (typeof compare.mismatchedPixels !== "number") {
    throw new Error(
      `expect toMatchScreenshot() value is not a valid screenshot compare object - 'mismatchedPixels' has type '${typeof compare.mismatchedPixels}', but should be a number`
    );
  }
  if (typeof compare.deviceScaleFactor !== "number") {
    throw new Error(
      `expect toMatchScreenshot() value is not a valid screenshot compare object - 'deviceScaleFactor' has type '${typeof compare.deviceScaleFactor}', but should be a number`
    );
  }
  const device = compare.device || compare.userAgent;
  if (typeof opts.allowableMismatchedRatio === "number") {
    if (opts.allowableMismatchedRatio < 0 || opts.allowableMismatchedRatio > 1) {
      throw new Error(`expect toMatchScreenshot() allowableMismatchedRatio must be a value ranging from 0 to 1`);
    }
    const mismatchedRatio = compare.mismatchedPixels / (compare.width * compare.deviceScaleFactor * (compare.height * compare.deviceScaleFactor));
    return {
      message: () => `${device}: screenshot has a mismatch ratio of "${mismatchedRatio}" for "${compare.desc}", but expected ratio to be less than "${opts.allowableMismatchedRatio}"`,
      pass: mismatchedRatio <= opts.allowableMismatchedRatio
    };
  }
  if (typeof opts.allowableMismatchedPixels === "number") {
    if (opts.allowableMismatchedPixels < 0) {
      throw new Error(
        `expect toMatchScreenshot() allowableMismatchedPixels value must be a value that is 0 or greater`
      );
    }
    return {
      message: () => `${device}: screenshot has "${compare.mismatchedPixels}" mismatched pixels for "${compare.desc}", but expected less than "${opts.allowableMismatchedPixels}" mismatched pixels`,
      pass: compare.mismatchedPixels <= opts.allowableMismatchedPixels
    };
  }
  if (typeof compare.allowableMismatchedRatio === "number") {
    const mismatchedRatio = compare.mismatchedPixels / (compare.width * compare.deviceScaleFactor * (compare.height * compare.deviceScaleFactor));
    return {
      message: () => `${device}: screenshot has a mismatch ratio of "${mismatchedRatio}" for "${compare.desc}", but expected ratio to be less than "${compare.allowableMismatchedRatio}"`,
      pass: mismatchedRatio <= compare.allowableMismatchedRatio
    };
  }
  if (typeof compare.allowableMismatchedPixels === "number") {
    return {
      message: () => `${device}: screenshot has "${compare.mismatchedPixels}" mismatched pixels for "${compare.desc}", but expected less than "${compare.allowableMismatchedPixels}" mismatched pixels`,
      pass: compare.mismatchedPixels <= compare.allowableMismatchedPixels
    };
  }
  throw new Error(`expect toMatchScreenshot() missing allowableMismatchedPixels in testing config`);
}

// src/testing/jest/jest-29/matchers/text.ts
var import_mock_doc16 = _lazyRequire("../mock-doc/index.cjs");
function toEqualText3(input, expectTextContent) {
  var _a2;
  if (input == null) {
    throw new Error(`expect toEqualText() value is "${input}"`);
  }
  if (typeof input.then === "function") {
    throw new Error(`element must be a resolved value, not a promise, before it can be tested`);
  }
  let textContent;
  if (input.nodeType === import_mock_doc16.NODE_TYPES.ELEMENT_NODE) {
    textContent = ((_a2 = input.textContent) != null ? _a2 : "").replace(/\s\s+/g, " ").trim();
  } else {
    textContent = String(input).replace(/\s\s+/g, " ").trim();
  }
  if (typeof expectTextContent === "string") {
    expectTextContent = expectTextContent.replace(/\s\s+/g, " ").trim();
  }
  const pass = textContent === expectTextContent;
  return {
    message: () => `expected textContent "${expectTextContent}" to ${pass ? "not " : ""}equal "${textContent}"`,
    pass
  };
}

// src/testing/jest/jest-29/matchers/index.ts
var expectExtend3 = {
  toEqualAttribute: toEqualAttribute3,
  toEqualAttributes: toEqualAttributes3,
  toEqualHtml: toEqualHtml3,
  toEqualLightHtml: toEqualLightHtml3,
  toEqualText: toEqualText3,
  toHaveAttribute: toHaveAttribute3,
  toHaveClass: toHaveClass3,
  toHaveClasses: toHaveClasses3,
  toMatchClasses: toMatchClasses3,
  toHaveReceivedEvent: toHaveReceivedEvent3,
  toHaveReceivedEventDetail: toHaveReceivedEventDetail3,
  toHaveReceivedEventTimes: toHaveReceivedEventTimes3,
  toHaveFirstReceivedEventDetail: toHaveFirstReceivedEventDetail3,
  toHaveLastReceivedEventDetail: toHaveLastReceivedEventDetail3,
  toHaveNthReceivedEventDetail: toHaveNthReceivedEventDetail3,
  toMatchScreenshot: toMatchScreenshot3
};

// src/testing/jest/jest-29/jest-setup-test-framework.ts
function jestSetupTestFramework3() {
  global.resourcesUrl = "/build";
  expect.extend(expectExtend3);
  expect.addSnapshotSerializer(HtmlSerializer3);
  (0, import_mock_doc17.setupGlobal)(global);
  setupMockFetch(global);
  beforeEach(() => {
    (0, import_testing3.resetPlatform)();
    (0, import_testing3.setErrorHandler)(void 0);
    resetBuildConditionals(import_app_data4.BUILD);
    import_testing3.modeResolutionChain.length = 0;
  });
  afterEach(async () => {
    var _a2, _b, _c, _d, _e, _f;
    (0, import_testing3.stopAutoApplyChanges)();
    const bodyNode = (_e = (_d = (_c = (_b = (_a2 = global.window) == null ? void 0 : _a2.document) == null ? void 0 : _b.childNodes) == null ? void 0 : _c[1]) == null ? void 0 : _d.childNodes) == null ? void 0 : _e.find((ref) => ref.nodeName === "BODY");
    (_f = bodyNode == null ? void 0 : bodyNode.childNodes) == null ? void 0 : _f.forEach(removeDomNodes3);
    (0, import_mock_doc17.teardownGlobal)(global);
    global.resourcesUrl = "/build";
  });
  afterAll(async () => {
    if (global.__CLOSE_OPEN_PAGES__) {
      await global.__CLOSE_OPEN_PAGES__();
    }
  });
  global.screenshotDescriptions = /* @__PURE__ */ new Set();
  const env2 = process.env;
  if (typeof env2.__STENCIL_DEFAULT_TIMEOUT__ === "string") {
    const time = parseInt(env2.__STENCIL_DEFAULT_TIMEOUT__, 10);
    jest.setTimeout(time * 1.5);
  }
  if (typeof env2.__STENCIL_ENV__ === "string") {
    const stencilEnv = JSON.parse(env2.__STENCIL_ENV__);
    Object.assign(import_app_data4.Env, stencilEnv);
  }
}
function removeDomNodes3(node) {
  var _a2, _b;
  if (node == null) {
    return;
  }
  if (!((_a2 = node.childNodes) == null ? void 0 : _a2.length)) {
    node.remove();
  }
  (_b = node.childNodes) == null ? void 0 : _b.forEach(removeDomNodes3);
}

// src/testing/jest/jest-29/jest-facade.ts
var Jest29Stencil = class {
  getJestCliRunner() {
    return runJest3;
  }
  getRunJestScreenshot() {
    return runJestScreenshot3;
  }
  getDefaultJestRunner() {
    return "jest-circus";
  }
  getCreateJestPuppeteerEnvironment() {
    return createJestPuppeteerEnvironment3;
  }
  getJestPreprocessor() {
    return jestPreprocessor3;
  }
  getCreateJestTestRunner() {
    return createTestRunner3;
  }
  getJestSetupTestFramework() {
    return jestSetupTestFramework3;
  }
  getJestPreset() {
    return preset3;
  }
};

// src/testing/jest/jest-apis.ts
var import_jest = require("jest");
/*!
 * This file contains Jest API usages for situations where it is difficult to determine which API should be used.
 *
 * An example of this is determining the version of Jest, which is retrieved via the `getVersion` API.
 * It's difficult at compile & runtime to determine:
 * 1. If such an API exists
 * 2. If it's typings are the same across all versions of Jest
 * 3. If there are variants of this API, which one to use and when
 *
 * Short of probing the directory where a user keeps their modules (e.g. `node_modules/`), we need to make a "best
 * guess" at things. This file is meant to only contain functions for these types of scenarios. It is expected that this
 * file be added to sparingly.
 */
var getJestMajorVersion = () => {
  return (0, import_jest.getVersion)();
};

// src/testing/jest/jest-stencil-connector.ts
/*!
 * This file acts as the connector/bridge between Stencil and Jest.
 *
 * It defines/caches a `JestFacade` implementation to dispatch Jest-related configuration calls to the correct section
 * of the Stencil codebase.
 *
 * It contains the APIs that are designed to be used by the Jest pre-configurations supplied by Stencil.
 */
var JEST_STENCIL_FACADE = null;
var getVersion2 = () => {
  return (0, import_major2.default)(getJestMajorVersion());
};
var getJestFacade = () => {
  if (!JEST_STENCIL_FACADE) {
    const version2 = getVersion2();
    if (version2 <= 27) {
      JEST_STENCIL_FACADE = new Jest27Stencil();
    } else if (version2 === 28) {
      JEST_STENCIL_FACADE = new Jest28Stencil();
    } else if (version2 === 29) {
      JEST_STENCIL_FACADE = new Jest29Stencil();
    } else {
      JEST_STENCIL_FACADE = new Jest27Stencil();
    }
  }
  if (!JEST_STENCIL_FACADE) {
    throw new Error("Stencil could not determine the Jest version being used.");
  }
  return JEST_STENCIL_FACADE;
};
var getRunner = () => {
  return getJestFacade().getJestCliRunner();
};
var getScreenshot = () => {
  return getJestFacade().getRunJestScreenshot();
};
var getCreateJestPuppeteerEnvironment = () => {
  return getJestFacade().getCreateJestPuppeteerEnvironment();
};
var getJestPreprocessor = () => {
  return getJestFacade().getJestPreprocessor();
};
var getCreateJestTestRunner = () => {
  return getJestFacade().getCreateJestTestRunner();
};
var getJestSetupTestFramework = () => {
  return getJestFacade().getJestSetupTestFramework();
};
var getJestPreset = () => {
  return getJestFacade().getJestPreset();
};

// src/testing/mocks.ts
var import_compiler5 = require("../compiler/stencil.js");
var import_mock_doc18 = _lazyRequire("../mock-doc/index.cjs");
var import_path24 = __toESM(require("path"));

// src/cli/config-flags.ts
var CLI_FLAG_REGEX = new RegExp(`^-[chpvbewofitu]{1}$`);
var createConfigFlags = (init = {}) => {
  const flags = {
    task: null,
    args: [],
    knownArgs: [],
    unknownArgs: [],
    ...init
  };
  return flags;
};

// src/compiler/config/validate-config.ts
var import_sys_api_node = require("../sys/node/index.js");

// src/compiler/config/config-utils.ts
var import_path9 = require("path");
var getAbsolutePath = (config, dir) => {
  if (!(0, import_path9.isAbsolute)(dir)) {
    dir = join(config.rootDir, dir);
  }
  return dir;
};
var setBooleanConfig = (config, configName, flagName, defaultValue) => {
  var _a2;
  if (flagName) {
    const flagValue = (_a2 = config.flags) == null ? void 0 : _a2[flagName];
    if (isBoolean(flagValue)) {
      config[configName] = flagValue;
    }
  }
  const userConfigName = getUserConfigName(config, configName);
  if (typeof config[userConfigName] === "function") {
    config[userConfigName] = !!config[userConfigName]();
  }
  if (isBoolean(config[userConfigName])) {
    config[configName] = config[userConfigName];
  } else {
    config[configName] = defaultValue;
  }
};
var getUserConfigName = (config, correctConfigName) => {
  var _a2;
  const userConfigNames = Object.keys(config);
  for (const userConfigName of userConfigNames) {
    if (userConfigName.toLowerCase() === correctConfigName.toLowerCase()) {
      if (userConfigName !== correctConfigName) {
        (_a2 = config.logger) == null ? void 0 : _a2.warn(`config "${userConfigName}" should be "${correctConfigName}"`);
        return userConfigName;
      }
      break;
    }
  }
  return correctConfigName;
};

// src/compiler/config/constants.ts
var DEFAULT_DEV_MODE = false;
var DEFAULT_HASHED_FILENAME_LENGTH = 8;
var MIN_HASHED_FILENAME_LENGTH = 4;
var MAX_HASHED_FILENAME_LENGTH = 32;
var DEFAULT_NAMESPACE = "App";
var DEFAULT_TARGET_COMPONENT_STYLES = {
  background: "#f9f",
  textColor: "#333"
};

// src/compiler/config/outputs/validate-collection.ts
var validateCollection = (config, userOutputs) => {
  return userOutputs.filter(isOutputTargetDistCollection).map((outputTarget) => {
    var _a2;
    return {
      ...outputTarget,
      transformAliasedImportPaths: isBoolean(outputTarget.transformAliasedImportPaths) ? outputTarget.transformAliasedImportPaths : true,
      dir: getAbsolutePath(config, (_a2 = outputTarget.dir) != null ? _a2 : "dist/collection")
    };
  });
};

// src/declarations/stencil-public-compiler.ts
var CustomElementsExportBehaviorOptions = [
  "default",
  "auto-define-custom-elements",
  "bundle",
  "single-export-module"
];

// src/compiler/config/validate-copy.ts
var validateCopy = (copy, defaultCopy = []) => {
  if (copy === null || copy === false) {
    return [];
  }
  if (!Array.isArray(copy)) {
    copy = [];
  }
  copy = copy.slice();
  for (const task of defaultCopy) {
    if (copy.every((t) => t.src !== task.src)) {
      copy.push(task);
    }
  }
  return unique(copy, (task) => `${task.src}:${task.dest}:${task.keepDirStructure}`);
};

// src/compiler/config/outputs/validate-custom-element.ts
var validateCustomElement = (config, userOutputs) => {
  const defaultDir = "dist";
  return userOutputs.filter(isOutputTargetDistCustomElements).reduce(
    (outputs, o) => {
      const outputTarget = {
        ...o,
        dir: getAbsolutePath(config, o.dir || join(defaultDir, "components"))
      };
      if (!isBoolean(outputTarget.empty)) {
        outputTarget.empty = true;
      }
      if (!isBoolean(outputTarget.externalRuntime)) {
        outputTarget.externalRuntime = true;
      }
      if (!isBoolean(outputTarget.generateTypeDeclarations)) {
        outputTarget.generateTypeDeclarations = true;
      }
      if (outputTarget.customElementsExportBehavior == null || !CustomElementsExportBehaviorOptions.includes(outputTarget.customElementsExportBehavior)) {
        outputTarget.customElementsExportBehavior = "default";
      }
      if (outputTarget.autoLoader === true) {
        outputTarget.autoLoader = {
          fileName: "loader",
          autoStart: true
        };
      } else if (outputTarget.autoLoader && typeof outputTarget.autoLoader === "object") {
        outputTarget.autoLoader = {
          fileName: outputTarget.autoLoader.fileName || "loader",
          autoStart: outputTarget.autoLoader.autoStart !== false
        };
      }
      if (outputTarget.generateTypeDeclarations) {
        const typesDirectory = getAbsolutePath(config, join(defaultDir, "types"));
        outputs.push({
          type: DIST_TYPES,
          dir: outputTarget.dir,
          typesDir: typesDirectory
        });
      }
      outputTarget.copy = validateCopy(outputTarget.copy, []);
      if (outputTarget.copy.length > 0) {
        outputs.push({
          type: COPY,
          dir: config.rootDir,
          copy: [...outputTarget.copy]
        });
      }
      outputs.push(outputTarget);
      return outputs;
    },
    []
  );
};

// src/compiler/config/outputs/validate-custom-output.ts
var validateCustomOutput = (config, diagnostics, userOutputs) => {
  return userOutputs.filter(isOutputTargetCustom).map((o) => {
    if (o.validate) {
      const localDiagnostics = [];
      try {
        o.validate(config, diagnostics);
      } catch (e) {
        catchError(localDiagnostics, e);
      }
      if (o.copy && o.copy.length > 0) {
        config.outputTargets.push({
          type: COPY,
          dir: config.rootDir,
          copy: [...o.copy]
        });
      }
      diagnostics.push(...localDiagnostics);
    }
    return o;
  });
};

// src/compiler/config/outputs/validate-dist.ts
var import_path10 = require("path");
var validateDist = (config, userOutputs) => {
  var _a2;
  const distOutputTargets = userOutputs.filter(isOutputTargetDist);
  const outputs = [];
  for (const outputTarget of distOutputTargets) {
    const distOutputTarget = validateOutputTargetDist(config, outputTarget);
    outputs.push(distOutputTarget);
    const namespace = config.fsNamespace || "app";
    const lazyDir = join(distOutputTarget.buildDir, namespace);
    outputs.push({
      type: DIST_LAZY,
      esmDir: lazyDir,
      systemDir: config.buildEs5 ? lazyDir : void 0,
      systemLoaderFile: config.buildEs5 ? join(lazyDir, namespace + ".js") : void 0,
      legacyLoaderFile: join(distOutputTarget.buildDir, namespace + ".js"),
      polyfills: outputTarget.polyfills !== void 0 ? !!distOutputTarget.polyfills : true,
      isBrowserBuild: true,
      empty: distOutputTarget.empty
    });
    outputs.push({
      type: COPY,
      dir: lazyDir,
      copyAssets: "dist",
      copy: ((_a2 = distOutputTarget.copy) != null ? _a2 : []).concat()
    });
    outputs.push({
      type: DIST_GLOBAL_STYLES,
      file: join(lazyDir, `${config.fsNamespace}.css`)
    });
    outputs.push({
      type: DIST_TYPES,
      dir: distOutputTarget.dir,
      typesDir: distOutputTarget.typesDir
    });
    if (config.buildDist) {
      if (distOutputTarget.collectionDir) {
        outputs.push({
          type: DIST_COLLECTION,
          dir: distOutputTarget.dir,
          collectionDir: distOutputTarget.collectionDir,
          empty: distOutputTarget.empty,
          transformAliasedImportPaths: distOutputTarget.transformAliasedImportPathsInCollection
        });
        outputs.push({
          type: COPY,
          dir: distOutputTarget.collectionDir,
          copyAssets: "collection",
          copy: [...distOutputTarget.copy, { src: "**/*.svg" }, { src: "**/*.js" }]
        });
      }
      const esmDir = join(distOutputTarget.dir, "esm");
      const esmEs5Dir = config.buildEs5 ? join(distOutputTarget.dir, "esm-es5") : void 0;
      const cjsDir = join(distOutputTarget.dir, "cjs");
      outputs.push({
        type: DIST_LAZY,
        esmDir,
        esmEs5Dir,
        cjsDir,
        cjsIndexFile: join(distOutputTarget.dir, "index.cjs.js"),
        esmIndexFile: join(distOutputTarget.dir, "index.js"),
        polyfills: true,
        empty: distOutputTarget.empty
      });
      outputs.push({
        type: DIST_LAZY_LOADER,
        dir: distOutputTarget.esmLoaderPath,
        esmDir,
        esmEs5Dir,
        cjsDir,
        componentDts: getComponentsDtsTypesFilePath(distOutputTarget),
        empty: distOutputTarget.empty
      });
    }
  }
  return outputs;
};
var validateOutputTargetDist = (config, o) => {
  var _a2, _b;
  const outputTarget = {
    ...o,
    dir: getAbsolutePath(config, o.dir || DEFAULT_DIR),
    buildDir: isString(o.buildDir) ? o.buildDir : DEFAULT_BUILD_DIR,
    collectionDir: o.collectionDir !== void 0 ? o.collectionDir : DEFAULT_COLLECTION_DIR,
    typesDir: o.typesDir || DEFAULT_TYPES_DIR,
    esmLoaderPath: o.esmLoaderPath || DEFAULT_ESM_LOADER_DIR,
    copy: validateCopy((_a2 = o.copy) != null ? _a2 : [], []),
    polyfills: isBoolean(o.polyfills) ? o.polyfills : false,
    empty: isBoolean(o.empty) ? o.empty : true,
    transformAliasedImportPathsInCollection: isBoolean(o.transformAliasedImportPathsInCollection) ? o.transformAliasedImportPathsInCollection : true,
    isPrimaryPackageOutputTarget: (_b = o.isPrimaryPackageOutputTarget) != null ? _b : false
  };
  if (!(0, import_path10.isAbsolute)(outputTarget.buildDir)) {
    outputTarget.buildDir = join(outputTarget.dir, outputTarget.buildDir);
  }
  if (outputTarget.collectionDir && !(0, import_path10.isAbsolute)(outputTarget.collectionDir)) {
    outputTarget.collectionDir = join(outputTarget.dir, outputTarget.collectionDir);
  }
  if (!(0, import_path10.isAbsolute)(outputTarget.esmLoaderPath)) {
    outputTarget.esmLoaderPath = resolve(outputTarget.dir, outputTarget.esmLoaderPath);
  }
  if (!(0, import_path10.isAbsolute)(outputTarget.typesDir)) {
    outputTarget.typesDir = join(outputTarget.dir, outputTarget.typesDir);
  }
  return outputTarget;
};
var DEFAULT_DIR = "dist";
var DEFAULT_BUILD_DIR = "";
var DEFAULT_COLLECTION_DIR = "collection";
var DEFAULT_TYPES_DIR = "types";
var DEFAULT_ESM_LOADER_DIR = "loader";

// src/compiler/config/outputs/validate-docs.ts
var import_path11 = require("path");

// src/compiler/docs/constants.ts
var NOTE = `*Built with [StencilJS](https://stenciljs.com/)*`;

// src/compiler/config/outputs/validate-docs.ts
var validateDocs = (config, diagnostics, userOutputs) => {
  const docsOutputs = [];
  if (isString(config.flags.docsJson)) {
    docsOutputs.push(
      validateJsonDocsOutputTarget(config, diagnostics, {
        type: DOCS_JSON,
        file: config.flags.docsJson
      })
    );
  }
  const jsonDocsOutputs = userOutputs.filter(isOutputTargetDocsJson);
  jsonDocsOutputs.forEach((jsonDocsOutput) => {
    docsOutputs.push(validateJsonDocsOutputTarget(config, diagnostics, jsonDocsOutput));
  });
  if (config.flags.docs || config.flags.task === "docs") {
    if (!userOutputs.some(isOutputTargetDocsReadme)) {
      docsOutputs.push(validateReadmeOutputTarget(config, { type: DOCS_README }));
    }
  }
  const readmeDocsOutputs = userOutputs.filter(isOutputTargetDocsReadme);
  readmeDocsOutputs.forEach((readmeDocsOutput) => {
    docsOutputs.push(validateReadmeOutputTarget(config, readmeDocsOutput));
  });
  const customDocsOutputs = userOutputs.filter(isOutputTargetDocsCustom);
  customDocsOutputs.forEach((jsonDocsOutput) => {
    docsOutputs.push(validateCustomDocsOutputTarget(diagnostics, jsonDocsOutput));
  });
  const vscodeDocsOutputs = userOutputs.filter(isOutputTargetDocsVscode);
  vscodeDocsOutputs.forEach((vscodeDocsOutput) => {
    docsOutputs.push(validateVScodeDocsOutputTarget(diagnostics, vscodeDocsOutput));
  });
  const customElementsManifestOutputs = userOutputs.filter(isOutputTargetDocsCustomElementsManifest);
  customElementsManifestOutputs.forEach((cemOutput) => {
    docsOutputs.push(validateCustomElementsManifestOutputTarget(config, cemOutput));
  });
  return docsOutputs;
};
var validateReadmeOutputTarget = (config, outputTarget) => {
  if (!isString(outputTarget.dir)) {
    outputTarget.dir = config.srcDir;
  }
  if (!(0, import_path11.isAbsolute)(outputTarget.dir)) {
    outputTarget.dir = join(config.rootDir, outputTarget.dir);
  }
  if (outputTarget.footer == null) {
    outputTarget.footer = NOTE;
  }
  outputTarget.strict = !!outputTarget.strict;
  return outputTarget;
};
var validateJsonDocsOutputTarget = (config, diagnostics, outputTarget) => {
  if (!isString(outputTarget.file)) {
    const err2 = buildError(diagnostics);
    err2.messageText = `docs-json outputTarget missing the "file" option`;
  }
  outputTarget.file = join(config.rootDir, outputTarget.file);
  if (isString(outputTarget.typesFile)) {
    outputTarget.typesFile = join(config.rootDir, outputTarget.typesFile);
  } else if (outputTarget.typesFile !== null && outputTarget.file.endsWith(".json")) {
    outputTarget.typesFile = outputTarget.file.replace(/\.json$/, ".d.ts");
  }
  outputTarget.strict = !!outputTarget.strict;
  return outputTarget;
};
var validateCustomDocsOutputTarget = (diagnostics, outputTarget) => {
  if (!isFunction(outputTarget.generator)) {
    const err2 = buildError(diagnostics);
    err2.messageText = `docs-custom outputTarget missing the "generator" function`;
  }
  outputTarget.strict = !!outputTarget.strict;
  return outputTarget;
};
var validateVScodeDocsOutputTarget = (diagnostics, outputTarget) => {
  if (!isString(outputTarget.file)) {
    const err2 = buildError(diagnostics);
    err2.messageText = `docs-vscode outputTarget missing the "file" path`;
  }
  return outputTarget;
};
var validateCustomElementsManifestOutputTarget = (config, outputTarget) => {
  if (!isString(outputTarget.file)) {
    outputTarget.file = "custom-elements.json";
  }
  outputTarget.file = join(config.rootDir, outputTarget.file);
  outputTarget.strict = !!outputTarget.strict;
  return outputTarget;
};

// src/compiler/config/outputs/validate-hydrate-script.ts
var import_path12 = require("path");
var validateHydrateScript = (config, userOutputs) => {
  const output = [];
  const hasHydrateOutputTarget = userOutputs.some(isOutputTargetHydrate);
  if (!hasHydrateOutputTarget) {
    const hasWwwOutput = userOutputs.filter(isOutputTargetWww).some((o) => isString(o.indexHtml));
    const shouldBuildHydrate = config.flags.prerender || config.flags.ssr;
    if (hasWwwOutput && shouldBuildHydrate) {
      let hydrateDir;
      const distOutput = userOutputs.find(isOutputTargetDist);
      if (distOutput != null && isString(distOutput.dir)) {
        hydrateDir = join(distOutput.dir, "hydrate");
      } else {
        hydrateDir = "dist/hydrate";
      }
      const hydrateForWwwOutputTarget = {
        type: DIST_HYDRATE_SCRIPT,
        dir: hydrateDir
      };
      userOutputs.push(hydrateForWwwOutputTarget);
    }
  }
  const hydrateOutputTargets = userOutputs.filter(isOutputTargetHydrate);
  hydrateOutputTargets.forEach((outputTarget) => {
    if (!isString(outputTarget.dir)) {
      outputTarget.dir = "hydrate";
    }
    if (!(0, import_path12.isAbsolute)(outputTarget.dir)) {
      outputTarget.dir = join(config.rootDir, outputTarget.dir);
    }
    if (!isBoolean(outputTarget.empty)) {
      outputTarget.empty = true;
    }
    if (!isBoolean(outputTarget.minify)) {
      outputTarget.minify = false;
    }
    if (!isBoolean(outputTarget.generatePackageJson)) {
      outputTarget.generatePackageJson = true;
    }
    outputTarget.external = outputTarget.external || [];
    outputTarget.external.push("fs");
    outputTarget.external.push("path");
    outputTarget.external.push("crypto");
    output.push(outputTarget);
  });
  return output;
};

// src/compiler/config/outputs/validate-lazy.ts
var validateLazy = (config, userOutputs) => {
  return userOutputs.filter(isOutputTargetDistLazy).map((o) => {
    const dir = getAbsolutePath(config, o.dir || join("dist", config.fsNamespace));
    const lazyOutput = {
      type: DIST_LAZY,
      esmDir: dir,
      systemDir: config.buildEs5 ? dir : void 0,
      systemLoaderFile: config.buildEs5 ? join(dir, `${config.fsNamespace}.js`) : void 0,
      polyfills: !!o.polyfills,
      isBrowserBuild: true,
      empty: isBoolean(o.empty) ? o.empty : true
    };
    return lazyOutput;
  });
};

// src/compiler/config/outputs/validate-stats.ts
var import_path13 = require("path");
var validateStats = (userConfig, userOutputs) => {
  const outputTargets = [];
  if (userConfig.flags.stats) {
    const hasOutputTarget = userOutputs.some(isOutputTargetStats);
    if (!hasOutputTarget) {
      const statsOutput = {
        type: STATS
      };
      if (typeof userConfig.flags.stats === "string") {
        statsOutput.file = userConfig.flags.stats;
      }
      outputTargets.push(statsOutput);
    }
  }
  outputTargets.push(...userOutputs.filter(isOutputTargetStats));
  outputTargets.forEach((outputTarget) => {
    if (!outputTarget.file) {
      outputTarget.file = "stencil-stats.json";
    }
    if (!(0, import_path13.isAbsolute)(outputTarget.file)) {
      outputTarget.file = join(userConfig.rootDir, outputTarget.file);
    }
  });
  return outputTargets;
};

// src/compiler/config/outputs/validate-www.ts
var import_path16 = require("path");

// src/compiler/config/validate-prerender.ts
var import_path14 = require("path");
var validatePrerender = (config, diagnostics, outputTarget) => {
  if (!config.flags.ssr && !config.flags.prerender && config.flags.task !== "prerender") {
    return;
  }
  outputTarget.baseUrl = normalizePath(outputTarget.baseUrl);
  if (!outputTarget.baseUrl.startsWith("http://") && !outputTarget.baseUrl.startsWith("https://")) {
    const err2 = buildError(diagnostics);
    err2.messageText = `When prerendering, the "baseUrl" output target config must be a full URL and start with either "http://" or "https://". The config can be updated in the "www" output target within the stencil config.`;
  }
  try {
    new URL(outputTarget.baseUrl);
  } catch (e) {
    const err2 = buildError(diagnostics);
    err2.messageText = `invalid "baseUrl": ${e}`;
  }
  if (!outputTarget.baseUrl.endsWith("/")) {
    outputTarget.baseUrl += "/";
  }
  if (isString(outputTarget.prerenderConfig)) {
    if (!(0, import_path14.isAbsolute)(outputTarget.prerenderConfig)) {
      outputTarget.prerenderConfig = join(config.rootDir, outputTarget.prerenderConfig);
    }
  }
};

// src/compiler/config/validate-service-worker.ts
var import_path15 = require("path");
var validateServiceWorker = (config, outputTarget) => {
  var _a2, _b, _c, _d;
  if (outputTarget.serviceWorker === false) {
    return;
  }
  if (config.devMode && !config.flags.serviceWorker) {
    outputTarget.serviceWorker = null;
    return;
  }
  if (outputTarget.serviceWorker === null) {
    outputTarget.serviceWorker = null;
    return;
  }
  if (!outputTarget.serviceWorker && config.devMode) {
    outputTarget.serviceWorker = null;
    return;
  }
  const globDirectory = typeof ((_a2 = outputTarget.serviceWorker) == null ? void 0 : _a2.globDirectory) === "string" ? outputTarget.serviceWorker.globDirectory : outputTarget.appDir;
  outputTarget.serviceWorker = {
    ...outputTarget.serviceWorker,
    globDirectory,
    swDest: isString((_b = outputTarget.serviceWorker) == null ? void 0 : _b.swDest) ? outputTarget.serviceWorker.swDest : join((_c = outputTarget.appDir) != null ? _c : "", DEFAULT_FILENAME)
  };
  if (!Array.isArray(outputTarget.serviceWorker.globPatterns)) {
    if (typeof outputTarget.serviceWorker.globPatterns === "string") {
      outputTarget.serviceWorker.globPatterns = [outputTarget.serviceWorker.globPatterns];
    } else if (typeof outputTarget.serviceWorker.globPatterns !== "string") {
      outputTarget.serviceWorker.globPatterns = DEFAULT_GLOB_PATTERNS.slice();
    }
  }
  if (typeof outputTarget.serviceWorker.globIgnores === "string") {
    outputTarget.serviceWorker.globIgnores = [outputTarget.serviceWorker.globIgnores];
  }
  outputTarget.serviceWorker.globIgnores = outputTarget.serviceWorker.globIgnores || [];
  addGlobIgnores(config, outputTarget.serviceWorker.globIgnores);
  outputTarget.serviceWorker.dontCacheBustURLsMatching = /p-\w{8}/;
  if (isString(outputTarget.serviceWorker.swSrc) && !(0, import_path15.isAbsolute)(outputTarget.serviceWorker.swSrc)) {
    outputTarget.serviceWorker.swSrc = join(config.rootDir, outputTarget.serviceWorker.swSrc);
  }
  if (isString(outputTarget.serviceWorker.swDest) && !(0, import_path15.isAbsolute)(outputTarget.serviceWorker.swDest)) {
    outputTarget.serviceWorker.swDest = join((_d = outputTarget.appDir) != null ? _d : "", outputTarget.serviceWorker.swDest);
  }
};
var addGlobIgnores = (config, globIgnores) => {
  globIgnores.push(
    `**/host.config.json`,
    // the filename of the host configuration
    `**/*.system.entry.js`,
    `**/*.system.js`,
    `**/${config.fsNamespace}.js`,
    `**/${config.fsNamespace}.esm.js`,
    `**/${config.fsNamespace}.css`
  );
};
var DEFAULT_GLOB_PATTERNS = ["*.html", "**/*.{js,css,json}"];
var DEFAULT_FILENAME = "sw.js";

// src/compiler/config/outputs/validate-www.ts
var validateWww = (config, diagnostics, userOutputs) => {
  const hasOutputTargets = userOutputs.length > 0;
  const hasE2eTests = !!config.flags.e2e;
  const userWwwOutputs = userOutputs.filter(isOutputTargetWww);
  if (!hasOutputTargets || hasE2eTests && !userOutputs.some(isOutputTargetWww) && !userOutputs.some(isOutputTargetDist)) {
    userWwwOutputs.push({ type: WWW });
  }
  if (config.flags.prerender && userWwwOutputs.length === 0) {
    const err2 = buildError(diagnostics);
    err2.messageText = `You need at least one "www" output target configured in your stencil.config.ts, when the "--prerender" flag is used`;
  }
  return userWwwOutputs.reduce(
    (outputs, o) => {
      const outputTarget = validateWwwOutputTarget(config, o, diagnostics);
      outputs.push(outputTarget);
      const buildDir = outputTarget.buildDir;
      outputs.push({
        type: DIST_LAZY,
        dir: buildDir,
        esmDir: buildDir,
        systemDir: config.buildEs5 ? buildDir : void 0,
        systemLoaderFile: config.buildEs5 ? join(buildDir, `${config.fsNamespace}.js`) : void 0,
        polyfills: outputTarget.polyfills,
        isBrowserBuild: true
      });
      outputs.push({
        type: COPY,
        dir: buildDir,
        copyAssets: "dist"
      });
      outputs.push({
        type: COPY,
        dir: outputTarget.appDir,
        copy: validateCopy(outputTarget.copy, [
          { src: "assets", warn: false },
          { src: "manifest.json", warn: false }
        ])
      });
      outputs.push({
        type: DIST_GLOBAL_STYLES,
        file: join(buildDir, `${config.fsNamespace}.css`)
      });
      return outputs;
    },
    []
  );
};
var validateWwwOutputTarget = (config, outputTarget, diagnostics) => {
  if (!isString(outputTarget.baseUrl)) {
    outputTarget.baseUrl = "/";
  }
  if (!outputTarget.baseUrl.endsWith("/")) {
    outputTarget.baseUrl += "/";
  }
  outputTarget.dir = getAbsolutePath(config, outputTarget.dir || "www");
  const pathname = new URL(outputTarget.baseUrl, "http://localhost/").pathname;
  outputTarget.appDir = join(outputTarget.dir, pathname);
  if (outputTarget.appDir.endsWith("/") || outputTarget.appDir.endsWith("\\")) {
    outputTarget.appDir = outputTarget.appDir.substring(0, outputTarget.appDir.length - 1);
  }
  if (!isString(outputTarget.buildDir)) {
    outputTarget.buildDir = "build";
  }
  if (!(0, import_path16.isAbsolute)(outputTarget.buildDir)) {
    outputTarget.buildDir = join(outputTarget.appDir, outputTarget.buildDir);
  }
  if (!isString(outputTarget.indexHtml)) {
    outputTarget.indexHtml = "index.html";
  }
  if (!(0, import_path16.isAbsolute)(outputTarget.indexHtml)) {
    outputTarget.indexHtml = join(outputTarget.appDir, outputTarget.indexHtml);
  }
  if (!isBoolean(outputTarget.empty)) {
    outputTarget.empty = true;
  }
  validatePrerender(config, diagnostics, outputTarget);
  validateServiceWorker(config, outputTarget);
  if (outputTarget.polyfills === void 0) {
    outputTarget.polyfills = true;
  }
  outputTarget.polyfills = !!outputTarget.polyfills;
  return outputTarget;
};

// src/compiler/config/outputs/index.ts
var validateOutputTargets = (config, diagnostics) => {
  const userOutputs = (config.outputTargets || []).slice();
  userOutputs.forEach((outputTarget) => {
    if (!isValidConfigOutputTarget(outputTarget.type)) {
      const err2 = buildError(diagnostics);
      err2.messageText = `Invalid outputTarget type "${outputTarget.type}". Valid outputTarget types include: ${VALID_CONFIG_OUTPUT_TARGETS.map((t) => `"${t}"`).join(", ")}`;
    }
  });
  config.outputTargets = [
    ...validateCollection(config, userOutputs),
    ...validateCustomElement(config, userOutputs),
    ...validateCustomOutput(config, diagnostics, userOutputs),
    ...validateLazy(config, userOutputs),
    ...validateWww(config, diagnostics, userOutputs),
    ...validateDist(config, userOutputs),
    ...validateDocs(config, diagnostics, userOutputs),
    ...validateStats(config, userOutputs)
  ];
  config.outputTargets = [
    ...config.outputTargets,
    ...validateHydrateScript(config, [...userOutputs, ...config.outputTargets])
  ];
};

// src/compiler/config/validate-dev-server.ts
var import_path17 = require("path");
var validateDevServer = (config, diagnostics) => {
  var _a2, _b, _c, _d, _e;
  if ((config.devServer === null || config.devServer) === false) {
    return {};
  }
  const { flags } = config;
  const devServer = { ...config.devServer };
  if (flags.address && isString(flags.address)) {
    devServer.address = flags.address;
  } else if (!isString(devServer.address)) {
    devServer.address = "0.0.0.0";
  }
  let addressProtocol = "http";
  if (devServer.address.toLowerCase().startsWith("http://")) {
    devServer.address = devServer.address.substring(7);
    addressProtocol = "http";
  } else if (devServer.address.toLowerCase().startsWith("https://")) {
    devServer.address = devServer.address.substring(8);
    addressProtocol = "https";
  }
  devServer.address = devServer.address.split("/")[0];
  if (devServer.pingRoute !== null) {
    let pingRoute = isString(devServer.pingRoute) ? devServer.pingRoute : "/ping";
    if (!pingRoute.startsWith("/")) {
      pingRoute = `/${pingRoute}`;
    }
    devServer.pingRoute = pingRoute;
  }
  const addressSplit = devServer.address.split(":");
  const isLocalhost = addressSplit[0] === "localhost" || !isNaN(addressSplit[0].split(".")[0]);
  let addressPort = isLocalhost ? 3333 : void 0;
  if (addressSplit.length > 1) {
    if (!isNaN(addressSplit[1])) {
      devServer.address = addressSplit[0];
      addressPort = parseInt(addressSplit[1], 10);
    }
  }
  if (isNumber(flags.port)) {
    devServer.port = flags.port;
  } else if (devServer.port !== null && !isNumber(devServer.port)) {
    if (isNumber(addressPort)) {
      devServer.port = addressPort;
    }
  }
  if (devServer.reloadStrategy === void 0) {
    devServer.reloadStrategy = "hmr";
  } else if (devServer.reloadStrategy !== "hmr" && devServer.reloadStrategy !== "pageReload" && devServer.reloadStrategy !== null) {
    const err2 = buildError(diagnostics);
    err2.messageText = `Invalid devServer reloadStrategy "${devServer.reloadStrategy}". Valid configs include "hmr", "pageReload" and null.`;
  }
  if (!isBoolean(devServer.gzip)) {
    devServer.gzip = true;
  }
  if (!isBoolean(devServer.openBrowser)) {
    devServer.openBrowser = true;
  }
  if (!isBoolean(devServer.websocket)) {
    devServer.websocket = true;
  }
  if (!isBoolean(devServer.strictPort)) {
    devServer.strictPort = false;
  }
  if (flags.ssr) {
    devServer.ssr = true;
  } else {
    devServer.ssr = !!devServer.ssr;
  }
  if (devServer.ssr) {
    const wwwOutput = ((_a2 = config.outputTargets) != null ? _a2 : []).find(isOutputTargetWww);
    devServer.prerenderConfig = wwwOutput == null ? void 0 : wwwOutput.prerenderConfig;
  }
  if (isString(config.srcIndexHtml)) {
    devServer.srcIndexHtml = normalizePath(config.srcIndexHtml);
  }
  if (devServer.protocol !== "http" && devServer.protocol !== "https") {
    devServer.protocol = devServer.https ? "https" : addressProtocol ? addressProtocol : "http";
  }
  if (devServer.historyApiFallback !== null) {
    if (Array.isArray(devServer.historyApiFallback) || typeof devServer.historyApiFallback !== "object") {
      devServer.historyApiFallback = {};
    }
    if (!isString(devServer.historyApiFallback.index)) {
      devServer.historyApiFallback.index = "index.html";
    }
    if (!isBoolean(devServer.historyApiFallback.disableDotRule)) {
      devServer.historyApiFallback.disableDotRule = false;
    }
  }
  if (flags.open === false) {
    devServer.openBrowser = false;
  } else if (flags.prerender && !config.watch) {
    devServer.openBrowser = false;
  }
  let serveDir;
  let basePath;
  const wwwOutputTarget = ((_b = config.outputTargets) != null ? _b : []).find(isOutputTargetWww);
  if (wwwOutputTarget) {
    const baseUrl = new URL((_c = wwwOutputTarget.baseUrl) != null ? _c : "", "http://config.stenciljs.com");
    basePath = baseUrl.pathname;
    serveDir = (_d = wwwOutputTarget.appDir) != null ? _d : "";
  } else {
    basePath = "";
    serveDir = (_e = config.rootDir) != null ? _e : "";
  }
  if (!isString(basePath) || basePath.trim() === "") {
    basePath = `/`;
  }
  basePath = normalizePath(basePath);
  if (!basePath.startsWith("/")) {
    basePath = "/" + basePath;
  }
  if (!basePath.endsWith("/")) {
    basePath += "/";
  }
  if (!isBoolean(devServer.logRequests)) {
    devServer.logRequests = config.logLevel === "debug";
  }
  if (!isString(devServer.root)) {
    devServer.root = serveDir;
  }
  if (!isString(devServer.basePath)) {
    devServer.basePath = basePath;
  }
  if (isString(devServer.baseUrl)) {
    const err2 = buildError(diagnostics);
    err2.messageText = `devServer config "baseUrl" has been renamed to "basePath", and should not include a domain or protocol.`;
  }
  if (!(0, import_path17.isAbsolute)(devServer.root)) {
    devServer.root = join(config.rootDir, devServer.root);
  }
  devServer.root = normalizePath(devServer.root);
  if (devServer.excludeHmr) {
    if (!Array.isArray(devServer.excludeHmr)) {
      const err2 = buildError(diagnostics);
      err2.messageText = `dev server excludeHmr must be an array of glob strings`;
    }
  } else {
    devServer.excludeHmr = [];
  }
  if (!config.devMode || config.buildEs5) {
    devServer.experimentalDevModules = false;
  } else {
    devServer.experimentalDevModules = !!devServer.experimentalDevModules;
  }
  return devServer;
};

// src/compiler/docs/readme/docs-util.ts
var isHexColor = (str) => {
  const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
  return hexColorRegex.test(str);
};

// src/compiler/config/validate-docs.ts
var validateDocs2 = (config, logger) => {
  var _a2, _b, _c;
  const { background: defaultBackground, textColor: defaultTextColor } = DEFAULT_TARGET_COMPONENT_STYLES;
  let { background = defaultBackground, textColor = defaultTextColor } = (_c = (_b = (_a2 = config.docs) == null ? void 0 : _a2.markdown) == null ? void 0 : _b.targetComponent) != null ? _c : DEFAULT_TARGET_COMPONENT_STYLES;
  if (!isHexColor(background)) {
    logger.warn(
      `'${background}' is not a valid hex color. The default value for diagram backgrounds ('${defaultBackground}') will be used.`
    );
    background = defaultBackground;
  }
  if (!isHexColor(textColor)) {
    logger.warn(
      `'${textColor}' is not a valid hex color. The default value for diagram text ('${defaultTextColor}') will be used.`
    );
    textColor = defaultTextColor;
  }
  return {
    markdown: {
      targetComponent: {
        background,
        textColor
      }
    }
  };
};

// src/compiler/config/validate-hydrated.ts
var validateHydrated = (config) => {
  var _a2;
  if (config.hydratedFlag === null || config.hydratedFlag === false) {
    return null;
  }
  const hydratedFlag = { ...(_a2 = config.hydratedFlag) != null ? _a2 : {} };
  if (!isString(hydratedFlag.name) || hydratedFlag.property === "") {
    hydratedFlag.name = `hydrated`;
  }
  if (hydratedFlag.selector === "attribute") {
    hydratedFlag.selector = `attribute`;
  } else {
    hydratedFlag.selector = `class`;
  }
  if (!isString(hydratedFlag.property) || hydratedFlag.property === "") {
    hydratedFlag.property = `visibility`;
  }
  if (!isString(hydratedFlag.initialValue) && hydratedFlag.initialValue !== null) {
    hydratedFlag.initialValue = `hidden`;
  }
  if (!isString(hydratedFlag.hydratedValue) && hydratedFlag.initialValue !== null) {
    hydratedFlag.hydratedValue = `inherit`;
  }
  return hydratedFlag;
};

// src/compiler/config/validate-namespace.ts
var validateNamespace = (namespace, fsNamespace, diagnostics) => {
  namespace = isString(namespace) ? namespace : DEFAULT_NAMESPACE;
  namespace = namespace.trim();
  const invalidNamespaceChars = namespace.replace(/(\w)|(\-)|(\$)/g, "");
  if (invalidNamespaceChars !== "") {
    const err2 = buildError(diagnostics);
    err2.messageText = `Namespace "${namespace}" contains invalid characters: ${invalidNamespaceChars}`;
  }
  if (namespace.length < 3) {
    const err2 = buildError(diagnostics);
    err2.messageText = `Namespace "${namespace}" must be at least 3 characters`;
  }
  if (/^\d+$/.test(namespace.charAt(0))) {
    const err2 = buildError(diagnostics);
    err2.messageText = `Namespace "${namespace}" cannot have a number for the first character`;
  }
  if (namespace.charAt(0) === "-") {
    const err2 = buildError(diagnostics);
    err2.messageText = `Namespace "${namespace}" cannot have a dash for the first character`;
  }
  if (namespace.charAt(namespace.length - 1) === "-") {
    const err2 = buildError(diagnostics);
    err2.messageText = `Namespace "${namespace}" cannot have a dash for the last character`;
  }
  if (!isString(fsNamespace)) {
    fsNamespace = namespace.toLowerCase().trim();
  }
  if (namespace.includes("-")) {
    namespace = dashToPascalCase(namespace);
  }
  return { namespace, fsNamespace };
};
var validateDistNamespace = (config, diagnostics) => {
  var _a2;
  const hasDist = ((_a2 = config.outputTargets) != null ? _a2 : []).some(isOutputTargetDist);
  if (hasDist) {
    if (!isString(config.namespace) || config.namespace.toLowerCase() === "app") {
      const err2 = buildError(diagnostics);
      err2.messageText = `When generating a distribution it is recommended to choose a unique namespace rather than the default setting "App". Please updated the "namespace" config property within the stencil config.`;
    }
  }
};

// src/compiler/config/validate-paths.ts
var import_path18 = require("path");
var validatePaths = (config) => {
  const rootDir4 = typeof config.rootDir !== "string" ? "/" : config.rootDir;
  let srcDir = typeof config.srcDir !== "string" ? DEFAULT_SRC_DIR : config.srcDir;
  if (!(0, import_path18.isAbsolute)(srcDir)) {
    srcDir = join(rootDir4, srcDir);
  }
  let cacheDir = typeof config.cacheDir !== "string" ? DEFAULT_CACHE_DIR : config.cacheDir;
  if (!(0, import_path18.isAbsolute)(cacheDir)) {
    cacheDir = join(rootDir4, cacheDir);
  } else {
    cacheDir = normalizePath(cacheDir);
  }
  let srcIndexHtml = typeof config.srcIndexHtml !== "string" ? join(srcDir, DEFAULT_INDEX_HTML) : config.srcIndexHtml;
  if (!(0, import_path18.isAbsolute)(srcIndexHtml)) {
    srcIndexHtml = join(rootDir4, srcIndexHtml);
  }
  const packageJsonFilePath = join(rootDir4, "package.json");
  const validatedPaths = {
    rootDir: rootDir4,
    srcDir,
    cacheDir,
    srcIndexHtml,
    packageJsonFilePath
  };
  if (typeof config.globalScript === "string" && !(0, import_path18.isAbsolute)(config.globalScript)) {
    validatedPaths.globalScript = join(rootDir4, config.globalScript);
  }
  if (typeof config.globalStyle === "string" && !(0, import_path18.isAbsolute)(config.globalStyle)) {
    validatedPaths.globalStyle = join(rootDir4, config.globalStyle);
  }
  if (config.writeLog) {
    validatedPaths.buildLogFilePath = typeof config.buildLogFilePath === "string" ? config.buildLogFilePath : DEFAULT_BUILD_LOG_FILE_NAME;
    if (!(0, import_path18.isAbsolute)(validatedPaths.buildLogFilePath)) {
      validatedPaths.buildLogFilePath = join(rootDir4, config.buildLogFilePath);
    }
  }
  return validatedPaths;
};
var DEFAULT_BUILD_LOG_FILE_NAME = "stencil-build.log";
var DEFAULT_CACHE_DIR = ".stencil";
var DEFAULT_INDEX_HTML = "index.html";
var DEFAULT_SRC_DIR = "src";

// src/compiler/config/validate-plugins.ts
var validatePlugins = (config, diagnostics) => {
  const userPlugins = config.plugins;
  if (!config.rollupPlugins) {
    config.rollupPlugins = {};
  }
  if (!Array.isArray(userPlugins)) {
    config.plugins = [];
    return;
  }
  const rollupPlugins = userPlugins.filter((plugin) => {
    return !!(plugin && typeof plugin === "object" && !plugin.pluginType);
  });
  const hasResolveNode = rollupPlugins.some((p) => p.name === "node-resolve");
  const hasCommonjs = rollupPlugins.some((p) => p.name === "commonjs");
  if (hasCommonjs) {
    const warn = buildWarn(diagnostics);
    warn.messageText = `Stencil already uses "@rollup/plugin-commonjs", please remove it from your "stencil.config.ts" plugins.
    You can configure the commonjs settings using the "commonjs" property in "stencil.config.ts`;
  }
  if (hasResolveNode) {
    const warn = buildWarn(diagnostics);
    warn.messageText = `Stencil already uses "@rollup/plugin-commonjs", please remove it from your "stencil.config.ts" plugins.
    You can configure the commonjs settings using the "commonjs" property in "stencil.config.ts`;
  }
  config.rollupPlugins.before = [
    ...config.rollupPlugins.before || [],
    ...rollupPlugins.filter(({ name }) => name !== "node-resolve" && name !== "commonjs")
  ];
  config.plugins = userPlugins.filter((plugin) => {
    return !!(plugin && typeof plugin === "object" && plugin.pluginType);
  });
};

// src/compiler/config/validate-rollup-config.ts
var validateRollupConfig = (config) => {
  let cleanRollupConfig = { ...DEFAULT_ROLLUP_CONFIG };
  const rollupConfig = config.rollupConfig;
  if (!rollupConfig || !isObject(rollupConfig)) {
    return cleanRollupConfig;
  }
  if (rollupConfig.inputOptions && isObject(rollupConfig.inputOptions)) {
    cleanRollupConfig = {
      ...cleanRollupConfig,
      inputOptions: pluck(rollupConfig.inputOptions, [
        "context",
        "moduleContext",
        "treeshake",
        "external",
        "maxParallelFileOps"
      ])
    };
  }
  if (rollupConfig.outputOptions && isObject(rollupConfig.outputOptions)) {
    cleanRollupConfig = {
      ...cleanRollupConfig,
      outputOptions: pluck(rollupConfig.outputOptions, ["globals"])
    };
  }
  return cleanRollupConfig;
};
var DEFAULT_ROLLUP_CONFIG = {
  inputOptions: {},
  outputOptions: {}
};

// src/compiler/config/validate-testing.ts
var import_path19 = require("path");

// src/compiler/sys/resolve/resolve-utils.ts
var isLocalModule = (p) => p.startsWith(".") || p.startsWith("/");
var getModuleId = (orgImport) => {
  if (orgImport.startsWith("~")) {
    orgImport = orgImport.substring(1);
  }
  const splt = orgImport.split("/");
  const m = {
    moduleId: null,
    filePath: null,
    scope: null,
    scopeSubModuleId: null
  };
  if (orgImport.startsWith("@") && splt.length > 1) {
    m.moduleId = splt.slice(0, 2).join("/");
    m.filePath = splt.slice(2).join("/");
    m.scope = splt[0];
    m.scopeSubModuleId = splt[1];
  } else {
    m.moduleId = splt[0];
    m.filePath = splt.slice(1).join("/");
  }
  return m;
};
var getPackageDirPath = (p, moduleId) => {
  const parts = normalizePath(p).split("/");
  const m = getModuleId(moduleId);
  for (let i = parts.length - 1; i >= 1; i--) {
    if (parts[i - 1] === "node_modules") {
      if (m.scope) {
        if (parts[i] === m.scope && parts[i + 1] === m.scopeSubModuleId) {
          return parts.slice(0, i + 2).join("/");
        }
      } else if (parts[i] === m.moduleId) {
        return parts.slice(0, i + 1).join("/");
      }
    }
  }
  return null;
};

// src/compiler/config/validate-testing.ts
var validateTesting = (config, diagnostics) => {
  var _a2;
  const testing = config.testing = Object.assign({}, config.testing || {});
  if (!config.flags.e2e && !config.flags.spec) {
    return;
  }
  let configPathDir = config.configPath;
  if (isString(configPathDir)) {
    if ((0, import_path19.basename)(configPathDir).includes(".")) {
      configPathDir = (0, import_path19.dirname)(configPathDir);
    }
  } else {
    configPathDir = config.rootDir;
  }
  if (typeof config.flags.headless === "boolean" || config.flags.headless === "shell") {
    testing.browserHeadless = config.flags.headless;
  } else if (typeof testing.browserHeadless !== "boolean" && testing.browserHeadless !== "shell") {
    testing.browserHeadless = "shell";
  }
  if (typeof testing.browserHeadless === "boolean" && testing.browserHeadless) {
    throw new Error(`Setting "browserHeadless" config to \`true\` is not supported anymore, please set it to "shell"!`);
  }
  if (!testing.browserWaitUntil) {
    testing.browserWaitUntil = "load";
  }
  if (!isString(testing.browserChannel)) {
    testing.browserChannel = "chrome";
  }
  testing.browserArgs = testing.browserArgs || [];
  addTestingConfigOption(testing.browserArgs, "--font-render-hinting=medium");
  addTestingConfigOption(testing.browserArgs, "--incognito");
  if (config.flags.ci || process.env.CI) {
    addTestingConfigOption(testing.browserArgs, "--no-sandbox");
    addTestingConfigOption(testing.browserArgs, "--disable-setuid-sandbox");
    addTestingConfigOption(testing.browserArgs, "--disable-dev-shm-usage");
    testing.browserHeadless = "shell";
  } else if (config.flags.devtools || testing.browserDevtools) {
    testing.browserDevtools = true;
    testing.browserHeadless = false;
  }
  if (typeof testing.rootDir === "string") {
    if (!(0, import_path19.isAbsolute)(testing.rootDir)) {
      testing.rootDir = join(config.rootDir, testing.rootDir);
    }
  } else {
    testing.rootDir = config.rootDir;
  }
  if (typeof config.flags.screenshotConnector === "string") {
    testing.screenshotConnector = config.flags.screenshotConnector;
  }
  if (typeof testing.screenshotConnector === "string") {
    if (!(0, import_path19.isAbsolute)(testing.screenshotConnector)) {
      testing.screenshotConnector = join(config.rootDir, testing.screenshotConnector);
    } else {
      testing.screenshotConnector = normalizePath(testing.screenshotConnector);
    }
  } else {
    testing.screenshotConnector = join(
      config.sys.getCompilerExecutingPath(),
      "..",
      "..",
      "screenshot",
      "local-connector.js"
    );
  }
  if (typeof testing.screenshotTimeout != "number") {
    testing.screenshotTimeout = null;
  }
  if (!Array.isArray(testing.testPathIgnorePatterns)) {
    testing.testPathIgnorePatterns = DEFAULT_IGNORE_PATTERNS.map((ignorePattern) => {
      return join(testing.rootDir, ignorePattern);
    });
    ((_a2 = config.outputTargets) != null ? _a2 : []).filter(
      (o) => (isOutputTargetDist(o) || isOutputTargetWww(o)) && !!o.dir
    ).forEach((outputTarget) => {
      var _a3;
      (_a3 = testing.testPathIgnorePatterns) == null ? void 0 : _a3.push(outputTarget.dir);
    });
  }
  if (typeof testing.preset !== "string") {
    testing.preset = join(config.sys.getCompilerExecutingPath(), "..", "..", "testing");
  } else if (!(0, import_path19.isAbsolute)(testing.preset)) {
    testing.preset = join(configPathDir, testing.preset);
  }
  if (!Array.isArray(testing.setupFilesAfterEnv)) {
    testing.setupFilesAfterEnv = [];
  }
  testing.setupFilesAfterEnv.unshift(
    join(config.sys.getCompilerExecutingPath(), "..", "..", "testing", "jest-setuptestframework.js")
  );
  if (isString(testing.testEnvironment)) {
    if (!(0, import_path19.isAbsolute)(testing.testEnvironment) && isLocalModule(testing.testEnvironment)) {
      testing.testEnvironment = join(configPathDir, testing.testEnvironment);
    }
  }
  if (typeof testing.allowableMismatchedPixels === "number") {
    if (testing.allowableMismatchedPixels < 0) {
      const err2 = buildError(diagnostics);
      err2.messageText = `allowableMismatchedPixels must be a value that is 0 or greater`;
    }
  } else {
    testing.allowableMismatchedPixels = DEFAULT_ALLOWABLE_MISMATCHED_PIXELS;
  }
  if (typeof testing.allowableMismatchedRatio === "number") {
    if (testing.allowableMismatchedRatio < 0 || testing.allowableMismatchedRatio > 1) {
      const err2 = buildError(diagnostics);
      err2.messageText = `allowableMismatchedRatio must be a value ranging from 0 to 1`;
    }
  }
  if (typeof testing.pixelmatchThreshold === "number") {
    if (testing.pixelmatchThreshold < 0 || testing.pixelmatchThreshold > 1) {
      const err2 = buildError(diagnostics);
      err2.messageText = `pixelmatchThreshold must be a value ranging from 0 to 1`;
    }
  } else {
    testing.pixelmatchThreshold = DEFAULT_PIXEL_MATCH_THRESHOLD;
  }
  if (testing.testRegex === void 0) {
    testing.testRegex = ["(/__tests__/.*|(\\.|/)(test|spec|e2e))\\.[jt]sx?$"];
  } else if (typeof testing.testRegex === "string") {
    testing.testRegex = [testing.testRegex];
  }
  if (Array.isArray(testing.testMatch)) {
    delete testing.testRegex;
  } else if (typeof testing.testRegex === "string") {
    delete testing.testMatch;
  }
  if (typeof testing.runner !== "string") {
    testing.runner = join(config.sys.getCompilerExecutingPath(), "..", "..", "testing", "jest-runner.js");
  }
  if (typeof testing.waitBeforeScreenshot === "number") {
    if (testing.waitBeforeScreenshot < 0) {
      const err2 = buildError(diagnostics);
      err2.messageText = `waitBeforeScreenshot must be a value that is 0 or greater`;
    }
  } else {
    testing.waitBeforeScreenshot = 10;
  }
  if (!Array.isArray(testing.emulate) || testing.emulate.length === 0) {
    testing.emulate = [
      {
        userAgent: "default",
        viewport: {
          width: 600,
          height: 600,
          deviceScaleFactor: 1,
          isMobile: false,
          hasTouch: false,
          isLandscape: false
        }
      }
    ];
  }
};
var addTestingConfigOption = (setArray, option) => {
  if (!setArray.includes(option)) {
    setArray.push(option);
  }
};
var DEFAULT_ALLOWABLE_MISMATCHED_PIXELS = 100;
var DEFAULT_PIXEL_MATCH_THRESHOLD = 0.1;
var DEFAULT_IGNORE_PATTERNS = [".vscode", ".stencil", "node_modules"];

// src/compiler/config/validate-workers.ts
var validateWorkers = (config) => {
  if (typeof config.maxConcurrentWorkers !== "number") {
    config.maxConcurrentWorkers = 8;
  }
  if (typeof config.flags.maxWorkers === "number") {
    config.maxConcurrentWorkers = config.flags.maxWorkers;
  } else if (config.flags.ci) {
    config.maxConcurrentWorkers = 4;
  }
  config.maxConcurrentWorkers = Math.max(Math.min(config.maxConcurrentWorkers, 16), 0);
  if (config.devServer) {
    config.devServer.worker = config.maxConcurrentWorkers > 0;
  }
};

// src/compiler/config/validate-config.ts
var CACHED_VALIDATED_CONFIG = null;
var validateConfig = (userConfig = {}, bootstrapConfig) => {
  var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const diagnostics = [];
  if (CACHED_VALIDATED_CONFIG !== null && CACHED_VALIDATED_CONFIG === userConfig) {
    return {
      config: userConfig,
      diagnostics
    };
  }
  const config = Object.assign({}, userConfig);
  const logger = bootstrapConfig.logger || config.logger || (0, import_sys_api_node.createNodeLogger)();
  const flags = JSON.parse(JSON.stringify(config.flags || {}));
  let logLevel = "info";
  if (flags.debug || flags.verbose) {
    logLevel = "debug";
  } else if (flags.logLevel) {
    logLevel = flags.logLevel;
  }
  logger.setLevel(logLevel);
  let devMode = (_a2 = config.devMode) != null ? _a2 : DEFAULT_DEV_MODE;
  if (flags.prod) {
    devMode = false;
  } else if (flags.dev) {
    devMode = true;
  } else if (!isBoolean(config.devMode)) {
    devMode = DEFAULT_DEV_MODE;
  }
  const hashFileNames = (_b = config.hashFileNames) != null ? _b : !devMode;
  const validatedConfig = {
    devServer: {},
    // assign `devServer` before spreading `config`, in the event 'devServer' is not a key on `config`
    ...config,
    buildEs5: config.buildEs5 === true || !devMode && config.buildEs5 === "prod",
    devMode,
    extras: config.extras || {},
    flags,
    generateExportMaps: isBoolean(config.generateExportMaps) ? config.generateExportMaps : false,
    hashFileNames,
    hashedFileNameLength: (_c = config.hashedFileNameLength) != null ? _c : DEFAULT_HASHED_FILENAME_LENGTH,
    hydratedFlag: validateHydrated(config),
    logLevel,
    logger,
    minifyCss: (_d = config.minifyCss) != null ? _d : !devMode,
    minifyJs: (_e = config.minifyJs) != null ? _e : !devMode,
    outputTargets: (_f = config.outputTargets) != null ? _f : [],
    rollupConfig: validateRollupConfig(config),
    sourceMap: config.sourceMap === true || devMode && (config.sourceMap === "dev" || typeof config.sourceMap === "undefined"),
    sys: (_h = (_g = config.sys) != null ? _g : bootstrapConfig.sys) != null ? _h : (0, import_sys_api_node.createNodeSys)({ logger }),
    testing: (_i = config.testing) != null ? _i : {},
    docs: validateDocs2(config, logger),
    transformAliasedImportPaths: isBoolean(userConfig.transformAliasedImportPaths) ? userConfig.transformAliasedImportPaths : true,
    validatePrimaryPackageOutputTarget: (_j = userConfig.validatePrimaryPackageOutputTarget) != null ? _j : false,
    ...validateNamespace(config.namespace, config.fsNamespace, diagnostics),
    ...validatePaths(config)
  };
  if (validatedConfig.buildLogFilePath) {
    logger.setLogFilePath(validatedConfig.buildLogFilePath);
  }
  validatedConfig.extras.lifecycleDOMEvents = !!validatedConfig.extras.lifecycleDOMEvents;
  validatedConfig.extras.scriptDataOpts = !!validatedConfig.extras.scriptDataOpts;
  validatedConfig.extras.initializeNextTick = !!validatedConfig.extras.initializeNextTick;
  validatedConfig.extras.tagNameTransform = !!validatedConfig.extras.tagNameTransform;
  validatedConfig.extras.additionalTagTransformers = validatedConfig.extras.additionalTagTransformers === true || !devMode && validatedConfig.extras.additionalTagTransformers === "prod";
  validatedConfig.extras.addGlobalStyleToComponents = isBoolean(validatedConfig.extras.addGlobalStyleToComponents) ? validatedConfig.extras.addGlobalStyleToComponents : "client";
  if (validatedConfig.extras.experimentalSlotFixes === true) {
    const possibleFlags = [
      "appendChildSlotFix",
      "slotChildNodesFix",
      "cloneNodeFix",
      "scopedSlotTextContentFix",
      "experimentalScopedSlotChanges"
    ];
    const conflictingFlags = possibleFlags.filter((flag) => validatedConfig.extras[flag] === false);
    if (conflictingFlags.length > 0) {
      const warning = buildError(diagnostics);
      warning.level = "warn";
      warning.messageText = `If the 'experimentalSlotFixes' flag is enabled it will override any slot fix flags which are disabled. In particular, the following currently-disabled flags will be ignored: ${conflictingFlags.join(
        ", "
      )}. Please update your Stencil config accordingly.`;
    }
  }
  validatedConfig.extras.experimentalSlotFixes = !!validatedConfig.extras.experimentalSlotFixes;
  if (validatedConfig.extras.experimentalSlotFixes === true) {
    validatedConfig.extras.appendChildSlotFix = true;
    validatedConfig.extras.cloneNodeFix = true;
    validatedConfig.extras.slotChildNodesFix = true;
    validatedConfig.extras.scopedSlotTextContentFix = true;
    validatedConfig.extras.experimentalScopedSlotChanges = true;
  } else {
    validatedConfig.extras.appendChildSlotFix = !!validatedConfig.extras.appendChildSlotFix;
    validatedConfig.extras.cloneNodeFix = !!validatedConfig.extras.cloneNodeFix;
    validatedConfig.extras.slotChildNodesFix = !!validatedConfig.extras.slotChildNodesFix;
    validatedConfig.extras.scopedSlotTextContentFix = !!validatedConfig.extras.scopedSlotTextContentFix;
    validatedConfig.extras.experimentalScopedSlotChanges = !!validatedConfig.extras.experimentalScopedSlotChanges;
  }
  setBooleanConfig(validatedConfig, "watch", "watch", false);
  setBooleanConfig(validatedConfig, "buildDocs", "docs", !validatedConfig.devMode);
  setBooleanConfig(validatedConfig, "buildDist", "esm", !validatedConfig.devMode || !!validatedConfig.buildEs5);
  setBooleanConfig(validatedConfig, "profile", "profile", validatedConfig.devMode);
  setBooleanConfig(validatedConfig, "writeLog", "log", false);
  setBooleanConfig(validatedConfig, "buildAppCore", null, true);
  setBooleanConfig(validatedConfig, "autoprefixCss", null, validatedConfig.buildEs5);
  setBooleanConfig(validatedConfig, "validateTypes", null, !validatedConfig._isTesting);
  setBooleanConfig(validatedConfig, "allowInlineScripts", null, true);
  setBooleanConfig(validatedConfig, "suppressReservedPublicNameWarnings", null, false);
  if (!isString(validatedConfig.taskQueue)) {
    validatedConfig.taskQueue = "async";
  }
  if (!isBoolean(validatedConfig.hashFileNames)) {
    validatedConfig.hashFileNames = !validatedConfig.devMode;
  }
  if (!isNumber(validatedConfig.hashedFileNameLength)) {
    validatedConfig.hashedFileNameLength = DEFAULT_HASHED_FILENAME_LENGTH;
  }
  if (validatedConfig.hashedFileNameLength < MIN_HASHED_FILENAME_LENGTH) {
    const err2 = buildError(diagnostics);
    err2.messageText = `validatedConfig.hashedFileNameLength must be at least ${MIN_HASHED_FILENAME_LENGTH} characters`;
  }
  if (validatedConfig.hashedFileNameLength > MAX_HASHED_FILENAME_LENGTH) {
    const err2 = buildError(diagnostics);
    err2.messageText = `validatedConfig.hashedFileNameLength cannot be more than ${MAX_HASHED_FILENAME_LENGTH} characters`;
  }
  if (!validatedConfig.env) {
    validatedConfig.env = {};
  }
  validateOutputTargets(validatedConfig, diagnostics);
  validatePlugins(validatedConfig, diagnostics);
  validatedConfig.devServer = validateDevServer(validatedConfig, diagnostics);
  validateTesting(validatedConfig, diagnostics);
  if (Array.isArray(validatedConfig.bundles)) {
    validatedConfig.bundles = sortBy(validatedConfig.bundles, (a) => a.components.length);
  } else {
    validatedConfig.bundles = [];
  }
  if (!Array.isArray(validatedConfig.excludeComponents)) {
    validatedConfig.excludeComponents = [];
  }
  validateWorkers(validatedConfig);
  setBooleanConfig(validatedConfig, "devInspector", null, validatedConfig.devMode);
  if (!validatedConfig._isTesting) {
    validateDistNamespace(validatedConfig, diagnostics);
  }
  setBooleanConfig(validatedConfig, "enableCache", "cache", true);
  if (!Array.isArray(validatedConfig.watchIgnoredRegex) && validatedConfig.watchIgnoredRegex != null) {
    validatedConfig.watchIgnoredRegex = [validatedConfig.watchIgnoredRegex];
  }
  validatedConfig.watchIgnoredRegex = (validatedConfig.watchIgnoredRegex || []).reduce((arr, reg) => {
    if (reg instanceof RegExp) {
      arr.push(reg);
    }
    return arr;
  }, []);
  if ((_k = validatedConfig.nodeResolve) == null ? void 0 : _k.customResolveOptions) {
    const warn = buildWarn(diagnostics);
    warn.messageText = `nodeResolve.customResolveOptions is a deprecated option in a Stencil Configuration file. If you need this option, please open a new issue in the Stencil repository (https://github.com/stenciljs/core/issues/new/choose)`;
  }
  CACHED_VALIDATED_CONFIG = validatedConfig;
  return {
    config: validatedConfig,
    diagnostics
  };
};

// src/compiler/build/build-ctx.ts
var BuildContext = class {
  buildId = -1;
  buildMessages = [];
  buildResults = null;
  bundleBuildCount = 0;
  collections = [];
  completedTasks = [];
  compilerCtx;
  components = [];
  componentGraph = /* @__PURE__ */ new Map();
  config;
  data = {};
  buildStats = void 0;
  esmBrowserComponentBundle;
  esmComponentBundle;
  es5ComponentBundle;
  systemComponentBundle;
  commonJsComponentBundle;
  diagnostics = [];
  dirsAdded = [];
  dirsDeleted = [];
  entryModules = [];
  filesAdded = [];
  filesChanged = [];
  filesDeleted = [];
  filesUpdated = [];
  filesWritten = [];
  globalStyle = void 0;
  hasConfigChanges = false;
  hasFinished = false;
  hasHtmlChanges = false;
  hasPrintedResults = false;
  hasServiceWorkerChanges = false;
  hasScriptChanges = true;
  hasStyleChanges = true;
  hydrateAppFilePath = null;
  indexBuildCount = 0;
  indexDoc = void 0;
  isRebuild = false;
  moduleFiles = [];
  outputs = [];
  packageJson = {};
  packageJsonFilePath = null;
  pendingCopyTasks = [];
  requiresFullBuild = true;
  scriptsAdded = [];
  scriptsDeleted = [];
  startTime = Date.now();
  styleBuildCount = 0;
  stylesPromise = null;
  stylesUpdated = [];
  timeSpan = null;
  timestamp;
  transpileBuildCount = 0;
  validateTypesPromise;
  constructor(config, compilerCtx) {
    this.config = validateConfig(config, {}).config;
    this.compilerCtx = compilerCtx;
    this.buildId = ++this.compilerCtx.activeBuildId;
    this.debug = config.logger.debug.bind(config.logger);
  }
  start() {
    const msg = `${this.isRebuild ? "rebuild" : "build"}, ${this.config.fsNamespace}, ${this.config.devMode ? "dev" : "prod"} mode, started`;
    const buildLog = {
      buildId: this.buildId,
      messages: [],
      progress: 0
    };
    this.compilerCtx.events.emit("buildLog", buildLog);
    this.timeSpan = this.createTimeSpan(msg);
    this.timestamp = getBuildTimestamp();
    this.debug(`start build, ${this.timestamp}`);
    const buildStart = {
      buildId: this.buildId,
      timestamp: this.timestamp
    };
    this.compilerCtx.events.emit("buildStart", buildStart);
  }
  createTimeSpan(msg, debug) {
    if (!this.hasFinished || debug) {
      if (debug) {
        if (this.config.watch) {
          msg = `${this.config.logger.cyan("[" + this.buildId + "]")} ${msg}`;
        }
      }
      const timeSpan = this.config.logger.createTimeSpan(msg, debug, this.buildMessages);
      if (!debug && this.compilerCtx.events) {
        const buildLog = {
          buildId: this.buildId,
          messages: this.buildMessages,
          progress: getProgress(this.completedTasks)
        };
        this.compilerCtx.events.emit("buildLog", buildLog);
      }
      return {
        duration: () => {
          return timeSpan.duration();
        },
        finish: (finishedMsg, color, bold, newLineSuffix) => {
          if (!this.hasFinished || debug) {
            if (debug) {
              if (this.config.watch) {
                finishedMsg = `${this.config.logger.cyan("[" + this.buildId + "]")} ${finishedMsg}`;
              }
            }
            timeSpan.finish(finishedMsg, color, bold, newLineSuffix);
            if (!debug) {
              const buildLog = {
                buildId: this.buildId,
                messages: this.buildMessages.slice(),
                progress: getProgress(this.completedTasks)
              };
              this.compilerCtx.events.emit("buildLog", buildLog);
            }
          }
          return timeSpan.duration();
        }
      };
    }
    return {
      duration() {
        return 0;
      },
      finish() {
        return 0;
      }
    };
  }
  debug(msg) {
    this.config.logger.debug(msg);
  }
  get hasError() {
    return hasError(this.diagnostics);
  }
  get hasWarning() {
    return hasWarning(this.diagnostics);
  }
  progress(t) {
    this.completedTasks.push(t);
  }
  async validateTypesBuild() {
    if (this.hasError) {
      return;
    }
    if (!this.validateTypesPromise) {
      return;
    }
    if (!this.config.watch) {
      this.debug(`build, non-watch, waiting on validateTypes`);
      await this.validateTypesPromise;
      this.debug(`build, non-watch, finished waiting on validateTypes`);
    }
  }
};
var getBuildTimestamp = () => {
  const d = /* @__PURE__ */ new Date();
  let timestamp = d.getUTCFullYear() + "-";
  timestamp += ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-";
  timestamp += ("0" + d.getUTCDate()).slice(-2) + "T";
  timestamp += ("0" + d.getUTCHours()).slice(-2) + ":";
  timestamp += ("0" + d.getUTCMinutes()).slice(-2) + ":";
  timestamp += ("0" + d.getUTCSeconds()).slice(-2);
  return timestamp;
};
var getProgress = (completedTasks) => {
  let progressIndex = 0;
  const taskKeys = Object.keys(ProgressTask);
  taskKeys.forEach((taskKey, index) => {
    if (completedTasks.includes(ProgressTask[taskKey])) {
      progressIndex = index;
    }
  });
  return (progressIndex + 1) / taskKeys.length;
};
var ProgressTask = {
  emptyOutputTargets: {},
  transpileApp: {},
  generateStyles: {},
  generateOutputTargets: {},
  validateTypesBuild: {},
  writeBuildFiles: {}
};

// src/compiler/cache.ts
var Cache = class {
  constructor(config, cacheFs) {
    this.config = config;
    this.cacheFs = cacheFs;
    this.sys = config.sys;
    this.logger = config.logger;
  }
  failed = 0;
  skip = false;
  sys;
  logger;
  buildCacheDir;
  async initCacheDir() {
    if (this.config._isTesting || !this.config.cacheDir) {
      return;
    }
    this.buildCacheDir = join(this.config.cacheDir, ".build");
    if (!this.config.enableCache || !this.cacheFs) {
      this.config.logger.info(`cache optimizations disabled`);
      this.clearDiskCache();
      return;
    }
    this.config.logger.debug(`cache enabled, cacheDir: ${this.buildCacheDir}`);
    try {
      const readmeFilePath = join(this.buildCacheDir, "_README.log");
      await this.cacheFs.writeFile(readmeFilePath, CACHE_DIR_README);
    } catch (e) {
      this.logger.error(`Cache, initCacheDir: ${e}`);
      this.config.enableCache = false;
    }
  }
  async get(key) {
    if (!this.config.enableCache || this.skip) {
      return null;
    }
    if (this.failed >= MAX_FAILED) {
      if (!this.skip) {
        this.skip = true;
        this.logger.debug(`cache had ${this.failed} failed ops, skip disk ops for remainder of build`);
      }
      return null;
    }
    let result2;
    try {
      result2 = await this.cacheFs.readFile(this.getCacheFilePath(key));
      this.failed = 0;
      this.skip = false;
    } catch (e) {
      this.failed++;
      result2 = null;
    }
    return result2;
  }
  async put(key, value) {
    if (!this.config.enableCache) {
      return false;
    }
    try {
      await this.cacheFs.writeFile(this.getCacheFilePath(key), value);
      return true;
    } catch (e) {
      this.failed++;
      return false;
    }
  }
  async has(key) {
    const val = await this.get(key);
    return typeof val === "string";
  }
  async createKey(domain, ...args) {
    if (!this.config.enableCache || !this.sys.generateContentHash) {
      return domain + Math.random() * 9999999;
    }
    const hash = await this.sys.generateContentHash(JSON.stringify(args), 32);
    return domain + "_" + hash;
  }
  async commit() {
    if (this.config.enableCache) {
      this.skip = false;
      this.failed = 0;
      await this.cacheFs.commit();
      await this.clearExpiredCache();
    }
  }
  clear() {
    if (this.cacheFs != null) {
      this.cacheFs.clearCache();
    }
  }
  async clearExpiredCache() {
    if (this.cacheFs == null || this.sys.cacheStorage == null) {
      return;
    }
    const now = Date.now();
    const lastClear = await this.sys.cacheStorage.get(EXP_STORAGE_KEY);
    if (lastClear != null) {
      const diff = now - lastClear;
      if (diff < ONE_DAY) {
        return;
      }
      const fs2 = this.cacheFs.sys;
      const cachedFileNames = await fs2.readDir(this.buildCacheDir);
      const cachedFilePaths = cachedFileNames.map((f) => join(this.buildCacheDir, f));
      let totalCleared = 0;
      const promises = cachedFilePaths.map(async (filePath) => {
        const stat = await fs2.stat(filePath);
        const lastModified = stat.mtimeMs;
        if (lastModified && now - lastModified > ONE_WEEK) {
          await fs2.removeFile(filePath);
          totalCleared++;
        }
      });
      await Promise.all(promises);
      this.logger.debug(`clearExpiredCache, cachedFileNames: ${cachedFileNames.length}, totalCleared: ${totalCleared}`);
    }
    this.logger.debug(`clearExpiredCache, set last clear`);
    await this.sys.cacheStorage.set(EXP_STORAGE_KEY, now);
  }
  async clearDiskCache() {
    if (this.cacheFs != null) {
      const hasAccess = await this.cacheFs.access(this.buildCacheDir);
      if (hasAccess) {
        await this.cacheFs.remove(this.buildCacheDir);
        await this.cacheFs.commit();
      }
    }
  }
  getCacheFilePath(key) {
    return join(this.buildCacheDir, key) + ".log";
  }
  getMemoryStats() {
    if (this.cacheFs != null) {
      return this.cacheFs.getMemoryStats();
    }
    return null;
  }
};
var MAX_FAILED = 100;
var ONE_DAY = 1e3 * 60 * 60 * 24;
var ONE_WEEK = ONE_DAY * 7;
var EXP_STORAGE_KEY = `last_clear_expired_cache`;
var CACHE_DIR_README = `# Stencil Cache Directory

This directory contains files which the compiler has
cached for faster builds. To disable caching, please set
"enableCache: false" within the stencil config.

To change the cache directory, please update the
"cacheDir" property within the stencil config.
`;

// src/compiler/events.ts
var buildEvents = () => {
  const evCallbacks = [];
  const off = (callback) => {
    const index = evCallbacks.findIndex((ev) => ev.callback === callback);
    if (index > -1) {
      evCallbacks.splice(index, 1);
      return true;
    }
    return false;
  };
  const on = (arg0, arg1) => {
    if (typeof arg0 === "function") {
      const eventName = null;
      const callback = arg0;
      evCallbacks.push({
        eventName,
        callback
      });
      return () => off(callback);
    } else if (typeof arg0 === "string" && typeof arg1 === "function") {
      const eventName = arg0.toLowerCase().trim();
      const callback = arg1;
      evCallbacks.push({
        eventName,
        callback
      });
      return () => off(callback);
    }
    return () => false;
  };
  const emit = (eventName, data) => {
    const normalizedEventName = eventName.toLowerCase().trim();
    const callbacks = evCallbacks.slice();
    for (const ev of callbacks) {
      if (ev.eventName == null) {
        try {
          ev.callback(eventName, data);
        } catch (e) {
          console.error(e);
        }
      } else if (ev.eventName === normalizedEventName) {
        try {
          ev.callback(data);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };
  const unsubscribeAll = () => {
    evCallbacks.length = 0;
  };
  return {
    emit,
    on,
    unsubscribeAll
  };
};

// src/compiler/sys/in-memory-fs.ts
var import_path20 = require("path");
var createInMemoryFs = (sys) => {
  const items = /* @__PURE__ */ new Map();
  const outputTargetTypes = /* @__PURE__ */ new Map();
  const access = async (filePath) => {
    const item = getItem(filePath);
    if (typeof item.exists !== "boolean") {
      const stats = await stat(filePath);
      return stats.exists;
    }
    return item.exists;
  };
  const accessSync = (filePath) => {
    const item = getItem(filePath);
    if (typeof item.exists !== "boolean") {
      const stats = statSync(filePath);
      return stats.exists;
    }
    return item.exists;
  };
  const copyFile = async (src, dest) => {
    const item = getItem(src);
    item.queueCopyFileToDest = dest;
  };
  const emptyDirs = async (dirs) => {
    dirs = dirs.filter(isString).map((s) => normalizePath(s)).reduce((dirs2, dir) => {
      if (!dirs2.includes(dir)) {
        dirs2.push(dir);
      }
      return dirs2;
    }, []);
    const allFsItems = await Promise.all(dirs.map((dir) => readdir(dir, { recursive: true })));
    const reducedItems = [];
    for (const fsItems of allFsItems) {
      for (const f of fsItems) {
        if (!reducedItems.includes(f.absPath)) {
          reducedItems.push(f.absPath);
        }
      }
    }
    reducedItems.sort((a, b) => {
      const partsA = a.split("/").length;
      const partsB = b.split("/").length;
      if (partsA < partsB) return 1;
      if (partsA > partsB) return -1;
      return 0;
    });
    await Promise.all(reducedItems.map(removeItem));
    dirs.forEach((dir) => {
      const item = getItem(dir);
      item.isFile = false;
      item.isDirectory = true;
      item.queueWriteToDisk = true;
      item.queueDeleteFromDisk = false;
    });
  };
  const readdir = async (dirPath, opts = {}) => {
    dirPath = normalizePath(dirPath);
    const collectedPaths = [];
    if (opts.inMemoryOnly === true) {
      let inMemoryDir = dirPath;
      if (!inMemoryDir.endsWith("/")) {
        inMemoryDir += "/";
      }
      const inMemoryDirs = dirPath.split("/");
      items.forEach((dir, filePath) => {
        if (!filePath.startsWith(dirPath)) {
          return;
        }
        const parts = filePath.split("/");
        if (parts.length === inMemoryDirs.length + 1 || opts.recursive && parts.length > inMemoryDirs.length) {
          if (dir.exists) {
            const item = {
              absPath: filePath,
              relPath: parts[inMemoryDirs.length],
              isDirectory: dir.isDirectory,
              isFile: dir.isFile
            };
            if (!shouldExcludeFromReaddir(opts, item)) {
              collectedPaths.push(item);
            }
          }
        }
      });
    } else {
      await readDirectory(dirPath, dirPath, opts, collectedPaths);
    }
    return collectedPaths.sort((a, b) => {
      if (a.absPath < b.absPath) return -1;
      if (a.absPath > b.absPath) return 1;
      return 0;
    });
  };
  const readDirectory = async (initPath, dirPath, opts, collectedPaths) => {
    const dirItems = await sys.readDir(dirPath);
    if (dirItems.length > 0) {
      const item = getItem(dirPath);
      item.exists = true;
      item.isFile = false;
      item.isDirectory = true;
      await Promise.all(
        dirItems.map(async (dirItem) => {
          const absPath = normalizePath(dirItem);
          const relPath = normalizePath(relative(initPath, absPath));
          const stats = await stat(absPath);
          const childItem = {
            absPath,
            relPath,
            isDirectory: stats.isDirectory,
            isFile: stats.isFile
          };
          if (shouldExcludeFromReaddir(opts, childItem)) {
            return;
          }
          collectedPaths.push(childItem);
          if (opts.recursive === true && stats.isDirectory === true) {
            await readDirectory(initPath, absPath, opts, collectedPaths);
          }
        })
      );
    }
  };
  const shouldExcludeFromReaddir = (opts, item) => {
    if (item.isDirectory) {
      if (Array.isArray(opts.excludeDirNames)) {
        const base = (0, import_path20.basename)(item.absPath);
        if (opts.excludeDirNames.some((dir) => base === dir)) {
          return true;
        }
      }
    } else {
      if (Array.isArray(opts.excludeExtensions)) {
        const p = item.relPath.toLowerCase();
        if (opts.excludeExtensions.some((ext2) => p.endsWith(ext2))) {
          return true;
        }
      }
    }
    return false;
  };
  const readFile = async (filePath, opts) => {
    if (opts == null || opts.useCache === true || opts.useCache === void 0) {
      const item2 = getItem(filePath);
      if (item2.exists && typeof item2.fileText === "string") {
        return item2.fileText;
      }
    }
    const fileText = await sys.readFile(filePath);
    const item = getItem(filePath);
    if (typeof fileText === "string") {
      if (fileText.length < MAX_TEXT_CACHE) {
        item.exists = true;
        item.isFile = true;
        item.isDirectory = false;
        item.fileText = fileText;
      }
    } else {
      item.exists = false;
    }
    return fileText;
  };
  const readFileSync = (filePath, opts) => {
    if (opts == null || opts.useCache === true || opts.useCache === void 0) {
      const item2 = getItem(filePath);
      if (item2.exists && typeof item2.fileText === "string") {
        return item2.fileText;
      }
    }
    const fileText = sys.readFileSync(filePath);
    const item = getItem(filePath);
    if (typeof fileText === "string") {
      if (fileText.length < MAX_TEXT_CACHE) {
        item.exists = true;
        item.isFile = true;
        item.isDirectory = false;
        item.fileText = fileText;
      }
    } else {
      item.exists = false;
    }
    return fileText;
  };
  const remove = async (itemPath) => {
    const stats = await stat(itemPath);
    if (stats.isDirectory === true) {
      await removeDir(itemPath);
    } else if (stats.isFile === true) {
      await removeItem(itemPath);
    }
  };
  const removeDir = async (dirPath) => {
    const item = getItem(dirPath);
    item.isFile = false;
    item.isDirectory = true;
    if (!item.queueWriteToDisk) {
      item.queueDeleteFromDisk = true;
    }
    try {
      const dirItems = await readdir(dirPath, { recursive: true });
      await Promise.all(
        dirItems.map((item2) => {
          if (item2.relPath.endsWith(".gitkeep")) {
            return null;
          }
          return removeItem(item2.absPath);
        })
      );
    } catch (e) {
    }
  };
  const removeItem = async (filePath) => {
    const item = getItem(filePath);
    if (!item.queueWriteToDisk) {
      item.queueDeleteFromDisk = true;
    }
  };
  const stat = async (itemPath) => {
    const item = getItem(itemPath);
    if (typeof item.isDirectory !== "boolean" || typeof item.isFile !== "boolean") {
      const stat2 = await sys.stat(itemPath);
      if (!stat2.error) {
        item.exists = true;
        if (stat2.isFile) {
          item.isFile = true;
          item.isDirectory = false;
          item.size = stat2.size;
        } else if (stat2.isDirectory) {
          item.isFile = false;
          item.isDirectory = true;
          item.size = stat2.size;
        } else {
          item.isFile = false;
          item.isDirectory = false;
          item.size = null;
        }
      } else {
        item.exists = false;
      }
    }
    return {
      exists: !!item.exists,
      isFile: !!item.isFile,
      isDirectory: !!item.isDirectory,
      size: typeof item.size === "number" ? item.size : 0
    };
  };
  const statSync = (itemPath) => {
    const item = getItem(itemPath);
    if (typeof item.isDirectory !== "boolean" || typeof item.isFile !== "boolean") {
      const stat2 = sys.statSync(itemPath);
      if (!stat2.error) {
        item.exists = true;
        if (stat2.isFile) {
          item.isFile = true;
          item.isDirectory = false;
          item.size = stat2.size;
        } else if (stat2.isDirectory) {
          item.isFile = false;
          item.isDirectory = true;
          item.size = stat2.size;
        } else {
          item.isFile = false;
          item.isDirectory = false;
          item.size = null;
        }
      } else {
        item.exists = false;
      }
    }
    return {
      exists: !!item.exists,
      isFile: !!item.isFile,
      isDirectory: !!item.isDirectory,
      size: item.size
    };
  };
  const writeFile2 = async (filePath, content, opts) => {
    if (typeof filePath !== "string") {
      throw new Error(`writeFile, invalid filePath: ${filePath}`);
    }
    if (typeof content !== "string") {
      throw new Error(`writeFile, invalid content: ${filePath}`);
    }
    const results = {
      ignored: false,
      changedContent: false,
      queuedWrite: false
    };
    if (shouldIgnore(filePath) === true) {
      results.ignored = true;
      return results;
    }
    const item = getItem(filePath);
    item.exists = true;
    item.isFile = true;
    item.isDirectory = false;
    item.queueDeleteFromDisk = false;
    if (typeof item.fileText === "string") {
      results.changedContent = item.fileText.replace(/\r/g, "") !== content.replace(/\r/g, "");
    } else {
      results.changedContent = true;
    }
    item.fileText = content;
    results.queuedWrite = false;
    if (opts != null) {
      if (typeof opts.outputTargetType === "string") {
        outputTargetTypes.set(filePath, opts.outputTargetType);
      }
      if (opts.useCache === false) {
        item.useCache = false;
      }
    }
    if (opts != null && opts.inMemoryOnly === true) {
      if (item.queueWriteToDisk) {
        results.queuedWrite = true;
      } else {
        item.queueWriteToDisk = false;
      }
      await ensureDir(filePath, true);
    } else if (opts != null && opts.immediateWrite === true) {
      if (results.changedContent || opts.useCache !== true) {
        const existingFile = await sys.readFile(filePath);
        if (typeof existingFile === "string") {
          results.changedContent = item.fileText.replace(/\r/g, "") !== existingFile.replace(/\r/g, "");
        }
        if (results.changedContent) {
          await ensureDir(filePath, false);
          const { error } = await sys.writeFile(filePath, item.fileText);
          if (error) {
            throw error;
          }
        }
      }
    } else {
      if (!item.queueWriteToDisk && results.changedContent === true) {
        item.queueWriteToDisk = true;
        results.queuedWrite = true;
      }
    }
    return results;
  };
  const writeFiles = (files, opts) => {
    const writes = [];
    if (isIterable(files)) {
      files.forEach((content, filePath) => {
        writes.push(writeFile2(filePath, content, opts));
      });
    } else {
      Object.keys(files).map((filePath) => {
        writes.push(writeFile2(filePath, files[filePath], opts));
      });
    }
    return Promise.all(writes);
  };
  const commit = async () => {
    const instructions = getCommitInstructions(items);
    const dirsAdded = await commitEnsureDirs(instructions.dirsToEnsure, false);
    const filesWritten = await commitWriteFiles(instructions.filesToWrite);
    const filesCopied = await commitCopyFiles(instructions.filesToCopy);
    const filesDeleted = await commitDeleteFiles(instructions.filesToDelete);
    const dirsDeleted = await commitDeleteDirs(instructions.dirsToDelete);
    instructions.filesToDelete.forEach(clearFileCache);
    instructions.dirsToDelete.forEach(clearDirCache);
    return {
      filesCopied,
      filesWritten,
      filesDeleted,
      dirsDeleted,
      dirsAdded
    };
  };
  const ensureDir = async (path7, inMemoryOnly) => {
    if (!inMemoryOnly) {
      await sys.createDir((0, import_path20.dirname)(path7), { recursive: true });
      return;
    }
    const allDirs = [];
    while (true) {
      path7 = (0, import_path20.dirname)(path7);
      if (typeof path7 === "string" && path7.length > 0 && path7 !== "/" && path7.endsWith(":/") === false && path7.endsWith(":\\") === false) {
        allDirs.push(path7);
      } else {
        break;
      }
    }
    allDirs.reverse();
    await commitEnsureDirs(allDirs, inMemoryOnly);
  };
  const commitEnsureDirs = async (dirsToEnsure, inMemoryOnly) => {
    const dirsAdded = [];
    for (const dirPath of dirsToEnsure) {
      const item = getItem(dirPath);
      if (item.exists === true && item.isDirectory === true) {
        continue;
      }
      try {
        item.exists = true;
        item.isDirectory = true;
        item.isFile = false;
        if (!inMemoryOnly) {
          await sys.createDir(dirPath);
        }
        dirsAdded.push(dirPath);
      } catch (e) {
      }
    }
    return dirsAdded;
  };
  const commitCopyFiles = (filesToCopy) => {
    const copiedFiles = Promise.all(
      filesToCopy.map(async (data) => {
        const [src, dest] = data;
        await sys.copyFile(src, dest);
        return [src, dest];
      })
    );
    return copiedFiles;
  };
  const commitWriteFiles = (filesToWrite) => {
    const writtenFiles = Promise.all(
      filesToWrite.map(async (filePath) => {
        if (typeof filePath !== "string") {
          throw new Error(`unable to writeFile without filePath`);
        }
        return commitWriteFile(filePath);
      })
    );
    return writtenFiles;
  };
  const commitWriteFile = async (filePath) => {
    const item = getItem(filePath);
    if (item.fileText == null) {
      throw new Error(`unable to find item fileText to write: ${filePath}`);
    }
    await sys.writeFile(filePath, item.fileText);
    if (item.useCache === false) {
      clearFileCache(filePath);
    }
    return filePath;
  };
  const commitDeleteFiles = async (filesToDelete) => {
    const deletedFiles = await Promise.all(
      filesToDelete.map(async (filePath) => {
        if (typeof filePath !== "string") {
          throw new Error(`unable to unlink without filePath`);
        }
        await sys.removeFile(filePath);
        return filePath;
      })
    );
    return deletedFiles;
  };
  const commitDeleteDirs = async (dirsToDelete) => {
    const dirsDeleted = [];
    for (const dirPath of dirsToDelete) {
      await sys.removeDir(dirPath);
      dirsDeleted.push(dirPath);
    }
    return dirsDeleted;
  };
  const clearDirCache = (dirPath) => {
    dirPath = normalizePath(dirPath);
    items.forEach((_, f) => {
      const filePath = relative(dirPath, f).split("/")[0];
      if (!filePath.startsWith(".") && !filePath.startsWith("/")) {
        clearFileCache(f);
      }
    });
  };
  const clearFileCache = (filePath) => {
    filePath = normalizePath(filePath);
    const item = items.get(filePath);
    if (item != null && !item.queueWriteToDisk) {
      items.delete(filePath);
    }
  };
  const cancelDeleteFilesFromDisk = (filePaths) => {
    for (const filePath of filePaths) {
      const item = getItem(filePath);
      if (item.isFile === true && item.queueDeleteFromDisk === true) {
        item.queueDeleteFromDisk = false;
      }
    }
  };
  const cancelDeleteDirectoriesFromDisk = (dirPaths) => {
    for (const dirPath of dirPaths) {
      const item = getItem(dirPath);
      if (item.queueDeleteFromDisk === true) {
        item.queueDeleteFromDisk = false;
      }
    }
  };
  const getItem = (itemPath) => {
    itemPath = normalizePath(itemPath);
    let item = items.get(itemPath);
    if (item != null) {
      return item;
    }
    items.set(
      itemPath,
      item = {
        exists: null,
        fileText: null,
        size: null,
        mtimeMs: null,
        isDirectory: null,
        isFile: null,
        queueCopyFileToDest: null,
        queueDeleteFromDisk: null,
        queueWriteToDisk: null,
        useCache: null
      }
    );
    return item;
  };
  const clearCache = () => {
    items.clear();
  };
  const getMemoryStats = () => `data length: ${items.size}`;
  const getBuildOutputs = () => {
    const outputs = [];
    outputTargetTypes.forEach((outputTargetType, filePath) => {
      const output = outputs.find((o) => o.type === outputTargetType);
      if (output) {
        output.files.push(filePath);
      } else {
        outputs.push({
          type: outputTargetType,
          files: [filePath]
        });
      }
    });
    outputs.forEach((output) => output.files.sort());
    return outputs.sort((a, b) => {
      if (a.type < b.type) return -1;
      if (a.type > b.type) return 1;
      return 0;
    });
  };
  const MAX_TEXT_CACHE = 5242880;
  return {
    access,
    accessSync,
    cancelDeleteDirectoriesFromDisk,
    cancelDeleteFilesFromDisk,
    clearCache,
    clearDirCache,
    clearFileCache,
    commit,
    copyFile,
    emptyDirs,
    getBuildOutputs,
    getItem,
    getMemoryStats,
    readFile,
    readFileSync,
    readdir,
    remove,
    stat,
    statSync,
    sys,
    writeFile: writeFile2,
    writeFiles
  };
};
var getCommitInstructions = (items) => {
  const instructions = {
    filesToDelete: [],
    filesToWrite: [],
    filesToCopy: [],
    dirsToDelete: [],
    dirsToEnsure: []
  };
  items.forEach((item, itemPath) => {
    if (item.queueWriteToDisk === true) {
      if (item.isFile === true) {
        instructions.filesToWrite.push(itemPath);
        const dir = normalizePath((0, import_path20.dirname)(itemPath));
        if (!instructions.dirsToEnsure.includes(dir)) {
          instructions.dirsToEnsure.push(dir);
        }
        const dirDeleteIndex = instructions.dirsToDelete.indexOf(dir);
        if (dirDeleteIndex > -1) {
          instructions.dirsToDelete.splice(dirDeleteIndex, 1);
        }
        const fileDeleteIndex = instructions.filesToDelete.indexOf(itemPath);
        if (fileDeleteIndex > -1) {
          instructions.filesToDelete.splice(fileDeleteIndex, 1);
        }
      } else if (item.isDirectory === true) {
        if (!instructions.dirsToEnsure.includes(itemPath)) {
          instructions.dirsToEnsure.push(itemPath);
        }
        const dirDeleteIndex = instructions.dirsToDelete.indexOf(itemPath);
        if (dirDeleteIndex > -1) {
          instructions.dirsToDelete.splice(dirDeleteIndex, 1);
        }
      }
    } else if (item.queueDeleteFromDisk === true) {
      if (item.isDirectory && !instructions.dirsToEnsure.includes(itemPath)) {
        instructions.dirsToDelete.push(itemPath);
      } else if (item.isFile && !instructions.filesToWrite.includes(itemPath)) {
        instructions.filesToDelete.push(itemPath);
      }
    } else if (typeof item.queueCopyFileToDest === "string") {
      const src = itemPath;
      const dest = item.queueCopyFileToDest;
      instructions.filesToCopy.push([src, dest]);
      const dir = normalizePath((0, import_path20.dirname)(dest));
      if (!instructions.dirsToEnsure.includes(dir)) {
        instructions.dirsToEnsure.push(dir);
      }
      const dirDeleteIndex = instructions.dirsToDelete.indexOf(dir);
      if (dirDeleteIndex > -1) {
        instructions.dirsToDelete.splice(dirDeleteIndex, 1);
      }
      const fileDeleteIndex = instructions.filesToDelete.indexOf(dest);
      if (fileDeleteIndex > -1) {
        instructions.filesToDelete.splice(fileDeleteIndex, 1);
      }
    }
    item.queueDeleteFromDisk = false;
    item.queueWriteToDisk = false;
  });
  for (let i = 0, ilen = instructions.dirsToEnsure.length; i < ilen; i++) {
    const segments = instructions.dirsToEnsure[i].split("/");
    for (let j = 2; j < segments.length; j++) {
      const dir = segments.slice(0, j).join("/");
      if (instructions.dirsToEnsure.includes(dir) === false) {
        instructions.dirsToEnsure.push(dir);
      }
    }
  }
  instructions.dirsToEnsure.sort((a, b) => {
    const segmentsA = a.split("/").length;
    const segmentsB = b.split("/").length;
    if (segmentsA < segmentsB) return -1;
    if (segmentsA > segmentsB) return 1;
    if (a.length < b.length) return -1;
    if (a.length > b.length) return 1;
    return 0;
  });
  instructions.dirsToDelete.sort((a, b) => {
    const segmentsA = a.split("/").length;
    const segmentsB = b.split("/").length;
    if (segmentsA < segmentsB) return 1;
    if (segmentsA > segmentsB) return -1;
    if (a.length < b.length) return 1;
    if (a.length > b.length) return -1;
    return 0;
  });
  for (const dirToEnsure of instructions.dirsToEnsure) {
    const i = instructions.dirsToDelete.indexOf(dirToEnsure);
    if (i > -1) {
      instructions.dirsToDelete.splice(i, 1);
    }
  }
  instructions.dirsToDelete = instructions.dirsToDelete.filter((dir) => {
    if (dir === "/" || dir.endsWith(":/") === true) {
      return false;
    }
    return true;
  });
  instructions.dirsToEnsure = instructions.dirsToEnsure.filter((dir) => {
    const item = items.get(dir);
    if (item != null && item.exists === true && item.isDirectory === true) {
      return false;
    }
    if (dir === "/" || dir.endsWith(":/")) {
      return false;
    }
    return true;
  });
  return instructions;
};
var shouldIgnore = (filePath) => {
  filePath = filePath.trim().toLowerCase();
  return IGNORE.some((ignoreFile) => filePath.endsWith(ignoreFile));
};
var IGNORE = [".ds_store", ".gitignore", "desktop.ini", "thumbs.db"];

// src/compiler/types/tests/ComponentCompilerMeta.stub.ts
var stubComponentCompilerMeta = (overrides = {}) => ({
  assetsDirs: [],
  attachInternalsMemberName: null,
  attachInternalsCustomStates: [],
  componentClassName: "StubCmp",
  dependencies: [],
  dependents: [],
  deserializers: [],
  directDependencies: [],
  directDependents: [],
  docs: { text: "docs", tags: [] },
  doesExtend: false,
  elementRef: "",
  encapsulation: "none",
  events: [],
  excludeFromCollection: false,
  formAssociated: false,
  hasAttribute: false,
  hasAttributeChangedCallbackFn: false,
  hasComponentDidLoadFn: false,
  hasComponentDidRenderFn: false,
  hasComponentDidUpdateFn: false,
  hasComponentShouldUpdateFn: false,
  hasComponentWillLoadFn: false,
  hasComponentWillRenderFn: false,
  hasComponentWillUpdateFn: false,
  hasConnectedCallbackFn: false,
  hasDeserializer: false,
  hasDisconnectedCallbackFn: false,
  hasElement: false,
  hasEvent: false,
  hasLifecycle: false,
  hasListener: false,
  hasListenerTarget: false,
  hasListenerTargetBody: false,
  hasListenerTargetDocument: false,
  hasListenerTargetParent: false,
  hasListenerTargetWindow: false,
  hasMember: false,
  hasMethod: false,
  hasMode: false,
  hasModernPropertyDecls: false,
  hasProp: false,
  hasPropBoolean: false,
  hasPropMutable: false,
  hasPropNumber: false,
  hasPropString: false,
  hasReflect: false,
  hasRenderFn: false,
  hasSerializer: false,
  hasSlot: false,
  hasState: false,
  hasStyle: false,
  hasVdomAttribute: false,
  hasVdomClass: false,
  hasVdomFunctional: false,
  hasVdomKey: false,
  hasVdomListener: false,
  hasVdomPropOrAttr: false,
  hasVdomRef: false,
  hasVdomRender: false,
  hasVdomStyle: false,
  hasVdomText: false,
  hasVdomXlink: false,
  hasWatchCallback: false,
  htmlAttrNames: [],
  htmlParts: [],
  htmlTagNames: [],
  internal: false,
  isCollectionDependency: false,
  isPlain: false,
  isUpdateable: false,
  jsFilePath: "/some/stubbed/path/my-component.js",
  listeners: [],
  methods: [],
  potentialCmpRefs: [],
  properties: [],
  serializers: [],
  shadowDelegatesFocus: false,
  slotAssignment: null,
  sourceFilePath: "/some/stubbed/path/my-component.tsx",
  sourceMapPath: "/some/stubbed/path/my-component.js.map",
  states: [],
  styleDocs: [],
  styles: [],
  tagName: "stub-cmp",
  virtualProperties: [],
  watchers: [],
  ...overrides
});

// src/testing/testing-logger.ts
var TestingLogger = class {
  isEnabled = false;
  enable() {
    this.isEnabled = true;
  }
  setLevel(_level) {
  }
  getLevel() {
    return "info";
  }
  enableColors(_useColors) {
  }
  emoji(_) {
    return "";
  }
  info(...msg) {
    if (this.isEnabled) {
      console.log(...msg);
    }
  }
  warn(...msg) {
    if (this.isEnabled) {
      console.warn(...msg);
    }
  }
  error(...msg) {
    if (this.isEnabled) {
      console.error(...msg);
    }
  }
  debug(...msg) {
    if (this.isEnabled) {
      console.log(...msg);
    }
  }
  color(_msg, _color) {
  }
  red(msg) {
    return msg;
  }
  green(msg) {
    return msg;
  }
  yellow(msg) {
    return msg;
  }
  blue(msg) {
    return msg;
  }
  magenta(msg) {
    return msg;
  }
  cyan(msg) {
    return msg;
  }
  gray(msg) {
    return msg;
  }
  bold(msg) {
    return msg;
  }
  dim(msg) {
    return msg;
  }
  bgRed(msg) {
    return msg;
  }
  createTimeSpan(_startMsg, _debug = false) {
    return {
      duration() {
        return 0;
      },
      finish() {
        return 0;
      }
    };
  }
  printDiagnostics(_diagnostics) {
  }
};

// src/testing/testing-sys.ts
var import_crypto = require("crypto");
var import_path23 = __toESM(require("path"));

// src/compiler/sys/stencil-sys.ts
var import_sys_api_node2 = require("../sys/node/index.js");
var os = __toESM(require("os"));
var import_path22 = __toESM(require("path"));
var process2 = __toESM(require("process"));

// src/version.ts
var version = "__VERSION:STENCIL__";

// src/compiler/sys/resolve/resolve-module-async.ts
var import_path21 = require("path");
var import_resolve = __toESM(require_resolve());
var resolveModuleIdAsync = (sys, inMemoryFs, opts) => {
  const resolverOpts = createCustomResolverAsync(sys, inMemoryFs, opts.exts);
  resolverOpts.basedir = (0, import_path21.dirname)(normalizeFsPath(opts.containingFile));
  if (opts.packageFilter) {
    resolverOpts.packageFilter = opts.packageFilter;
  } else if (opts.packageFilter !== null) {
    resolverOpts.packageFilter = (pkg) => {
      if (!isString(pkg.main) || pkg.main === "") {
        pkg.main = "package.json";
      }
      return pkg;
    };
  }
  return new Promise((resolvePromise, rejectPromise) => {
    (0, import_resolve.default)(opts.moduleId, resolverOpts, (err2, resolveId, pkgData) => {
      if (err2) {
        rejectPromise(err2);
      } else {
        resolveId = normalizePath(resolveId);
        const results = {
          moduleId: opts.moduleId,
          resolveId,
          pkgData,
          pkgDirPath: getPackageDirPath(resolveId, opts.moduleId)
        };
        resolvePromise(results);
      }
    });
  });
};
var createCustomResolverAsync = (sys, inMemoryFs, exts) => {
  return {
    async isFile(filePath, cb) {
      const fsFilePath = normalizeFsPath(filePath);
      const stat = await inMemoryFs.stat(fsFilePath);
      if (stat.isFile) {
        cb(null, true);
        return;
      }
      cb(null, false);
    },
    async isDirectory(dirPath, cb) {
      const fsDirPath = normalizeFsPath(dirPath);
      const stat = await inMemoryFs.stat(fsDirPath);
      if (stat.isDirectory) {
        cb(null, true);
        return;
      }
      cb(null, false);
    },
    async readFile(p, cb) {
      const fsFilePath = normalizeFsPath(p);
      const data = await inMemoryFs.readFile(fsFilePath);
      if (isString(data)) {
        return cb(null, data);
      }
      return cb(`readFile not found: ${p}`);
    },
    async realpath(p, cb) {
      const fsFilePath = normalizeFsPath(p);
      const results = await sys.realpath(fsFilePath);
      if (results.error && results.error.code !== "ENOENT") {
        cb(results.error);
      } else {
        cb(null, results.error ? fsFilePath : results.path);
      }
    },
    extensions: exts
  };
};

// src/compiler/sys/stencil-sys.ts
var createSystem = (c) => {
  var _a2;
  const logger = (_a2 = c == null ? void 0 : c.logger) != null ? _a2 : (0, import_sys_api_node2.createNodeLogger)();
  const items = /* @__PURE__ */ new Map();
  const destroys = /* @__PURE__ */ new Set();
  const addDestroy = (cb) => destroys.add(cb);
  const removeDestroy = (cb) => destroys.delete(cb);
  const events = buildEvents();
  const hardwareConcurrency = 1;
  const destroy = async () => {
    const waits = [];
    destroys.forEach((cb) => {
      try {
        const rtn = cb();
        if (rtn && typeof rtn.then === "function") {
          waits.push(rtn);
        }
      } catch (e) {
        logger.error(`stencil sys destroy: ${e}`);
      }
    });
    await Promise.all(waits);
    destroys.clear();
  };
  const normalize = (p) => {
    if (p === "/" || p === "") {
      return "/";
    }
    const dir = (0, import_path22.dirname)(p);
    const base = (0, import_path22.basename)(p);
    if (dir.endsWith("/")) {
      return normalizePath(`${dir}${base}`);
    }
    return normalizePath(`${dir}/${base}`);
  };
  const accessSync = (p) => {
    const item = items.get(normalize(p));
    return !!(item && (item.isDirectory || item.isFile && typeof item.data === "string"));
  };
  const access = async (p) => accessSync(p);
  const copyFile = async (src, dest) => {
    writeFileSync(dest, readFileSync(src));
    return true;
  };
  const isTTY = () => {
    var _a3;
    return !!((_a3 = process2 == null ? void 0 : process2.stdout) == null ? void 0 : _a3.isTTY);
  };
  const homeDir = () => {
    return os.homedir();
  };
  const createDirSync = (p, opts) => {
    p = normalize(p);
    const results = {
      basename: (0, import_path22.basename)(p),
      dirname: (0, import_path22.dirname)(p),
      path: p,
      newDirs: [],
      error: null
    };
    createDirRecursiveSync(p, opts, results);
    return results;
  };
  const createDirRecursiveSync = (p, opts, results) => {
    const parentDir = (0, import_path22.dirname)(p);
    if (opts && opts.recursive && !isRootPath(parentDir)) {
      createDirRecursiveSync(parentDir, opts, results);
    }
    const item = items.get(p);
    if (!item) {
      items.set(p, {
        basename: (0, import_path22.basename)(p),
        dirname: parentDir,
        isDirectory: true,
        isFile: false,
        watcherCallbacks: null,
        data: void 0
      });
      results.newDirs.push(p);
      emitDirectoryWatch(p, /* @__PURE__ */ new Set());
    } else {
      item.isDirectory = true;
      item.isFile = false;
    }
  };
  const createDir = async (p, opts) => createDirSync(p, opts);
  const encodeToBase64 = (str) => btoa(unescape(encodeURIComponent(str)));
  const getCurrentDirectory = () => "/";
  const getCompilerExecutingPath = () => {
    return sys.getRemoteModuleUrl({ moduleId: "@stencil/core", path: "compiler/stencil.js" });
  };
  const isSymbolicLink = async (_p) => false;
  const readDirSync = (p) => {
    p = normalize(p);
    const dirItems = [];
    const dir = items.get(p);
    if (dir && dir.isDirectory) {
      items.forEach((item, itemPath) => {
        if (itemPath !== "/" && (item.isDirectory || item.isFile && typeof item.data === "string")) {
          if (p.endsWith("/") && `${p}${item.basename}` === itemPath) {
            dirItems.push(itemPath);
          } else if (`${p}/${item.basename}` === itemPath) {
            dirItems.push(itemPath);
          }
        }
      });
    }
    return dirItems.sort();
  };
  const readDir = async (p) => readDirSync(p);
  const readFileSync = (p) => {
    p = normalize(p);
    const item = items.get(p);
    if (item && item.isFile) {
      return item.data;
    }
    return void 0;
  };
  const readFile = async (p) => readFileSync(p);
  const realpathSync = (p) => {
    const results = {
      path: normalize(p),
      error: null
    };
    return results;
  };
  const realpath = async (p) => realpathSync(p);
  const rename = async (oldPath, newPath) => {
    oldPath = normalizePath(oldPath);
    newPath = normalizePath(newPath);
    const results = {
      oldPath,
      newPath,
      renamed: [],
      oldDirs: [],
      oldFiles: [],
      newDirs: [],
      newFiles: [],
      isFile: false,
      isDirectory: false,
      error: null
    };
    const stats = statSync(oldPath);
    if (!stats.error) {
      if (stats.isFile) {
        results.isFile = true;
      } else if (stats.isDirectory) {
        results.isDirectory = true;
      }
      renameNewRecursiveSync(oldPath, newPath, results);
      if (!results.error) {
        if (results.isDirectory) {
          const rmdirResults = removeDirSync(oldPath, { recursive: true });
          if (rmdirResults.error) {
            results.error = rmdirResults.error;
          } else {
            results.oldDirs.push(...rmdirResults.removedDirs);
            results.oldFiles.push(...rmdirResults.removedFiles);
          }
        } else if (results.isFile) {
          const removeFileResults = removeFileSync(oldPath);
          if (removeFileResults.error) {
            results.error = removeFileResults.error;
          } else {
            results.oldFiles.push(oldPath);
          }
        }
      }
    } else {
      results.error = `${oldPath} does not exist`;
    }
    return results;
  };
  const renameNewRecursiveSync = (oldPath, newPath, results) => {
    const itemStat = statSync(oldPath);
    if (!itemStat.error && !results.error) {
      if (itemStat.isFile) {
        const newFileParentDir = (0, import_path22.dirname)(newPath);
        const createDirResults = createDirSync(newFileParentDir, { recursive: true });
        const fileContent = items.get(oldPath).data;
        const writeResults = writeFileSync(newPath, fileContent);
        results.newDirs.push(...createDirResults.newDirs);
        results.renamed.push({
          oldPath,
          newPath,
          isDirectory: false,
          isFile: true
        });
        if (writeResults.error) {
          results.error = writeResults.error;
        } else {
          results.newFiles.push(newPath);
        }
      } else if (itemStat.isDirectory) {
        const oldDirItemChildPaths = readDirSync(oldPath);
        const createDirResults = createDirSync(newPath, { recursive: true });
        results.newDirs.push(...createDirResults.newDirs);
        results.renamed.push({
          oldPath,
          newPath,
          isDirectory: true,
          isFile: false
        });
        for (const oldDirItemChildPath of oldDirItemChildPaths) {
          const newDirItemChildPath = oldDirItemChildPath.replace(oldPath, newPath);
          renameNewRecursiveSync(oldDirItemChildPath, newDirItemChildPath, results);
        }
      }
    }
  };
  const resolvePath = (p) => normalize(p);
  const removeDirSync = (p, opts = {}) => {
    const results = {
      basename: (0, import_path22.basename)(p),
      dirname: (0, import_path22.dirname)(p),
      path: p,
      removedDirs: [],
      removedFiles: [],
      error: null
    };
    removeDirSyncRecursive(p, opts, results);
    return results;
  };
  const removeDirSyncRecursive = (p, opts, results) => {
    if (!results.error) {
      p = normalize(p);
      const dirItemPaths = readDirSync(p);
      if (opts && opts.recursive) {
        for (const dirItemPath of dirItemPaths) {
          const item = items.get(dirItemPath);
          if (item) {
            if (item.isDirectory) {
              removeDirSyncRecursive(dirItemPath, opts, results);
            } else if (item.isFile) {
              const removeFileResults = removeFileSync(dirItemPath);
              if (removeFileResults.error) {
                results.error = removeFileResults.error;
              } else {
                results.removedFiles.push(dirItemPath);
              }
            }
          }
        }
      } else {
        if (dirItemPaths.length > 0) {
          results.error = `cannot delete directory that contains files/subdirectories`;
          return;
        }
      }
      items.delete(p);
      emitDirectoryWatch(p, /* @__PURE__ */ new Set());
      results.removedDirs.push(p);
    }
  };
  const removeDir = async (p, opts = {}) => removeDirSync(p, opts);
  const statSync = (p) => {
    p = normalize(p);
    const item = items.get(p);
    if (item && (item.isDirectory || item.isFile && typeof item.data === "string")) {
      return {
        isDirectory: item.isDirectory,
        isFile: item.isFile,
        isSymbolicLink: false,
        size: item.isFile && item.data ? item.data.length : 0,
        error: null
      };
    }
    return {
      isDirectory: false,
      isFile: false,
      isSymbolicLink: false,
      size: 0,
      error: `ENOENT: no such file or directory, statSync '${p}'`
    };
  };
  const stat = async (p) => statSync(p);
  const removeFileSync = (p) => {
    p = normalize(p);
    const results = {
      basename: (0, import_path22.basename)(p),
      dirname: (0, import_path22.dirname)(p),
      path: p,
      error: null
    };
    const item = items.get(p);
    if (item) {
      if (item.watcherCallbacks) {
        for (const watcherCallback of item.watcherCallbacks) {
          watcherCallback(p, "fileDelete");
        }
      }
      items.delete(p);
      emitDirectoryWatch(p, /* @__PURE__ */ new Set());
    }
    return results;
  };
  const removeFile = async (p) => removeFileSync(p);
  const watchDirectory = (p, dirWatcherCallback) => {
    p = normalize(p);
    const item = items.get(p);
    const close = () => {
      const closeItem = items.get(p);
      if (closeItem && closeItem.watcherCallbacks) {
        const index = closeItem.watcherCallbacks.indexOf(dirWatcherCallback);
        if (index > -1) {
          closeItem.watcherCallbacks.splice(index, 1);
        }
      }
    };
    addDestroy(close);
    if (item) {
      item.isDirectory = true;
      item.isFile = false;
      item.watcherCallbacks = item.watcherCallbacks || [];
      item.watcherCallbacks.push(dirWatcherCallback);
    } else {
      items.set(p, {
        basename: (0, import_path22.basename)(p),
        dirname: (0, import_path22.dirname)(p),
        isDirectory: true,
        isFile: false,
        watcherCallbacks: [dirWatcherCallback],
        data: void 0
      });
    }
    return {
      close() {
        removeDestroy(close);
        close();
      }
    };
  };
  const watchFile = (p, fileWatcherCallback) => {
    p = normalize(p);
    const item = items.get(p);
    const close = () => {
      const closeItem = items.get(p);
      if (closeItem && closeItem.watcherCallbacks) {
        const index = closeItem.watcherCallbacks.indexOf(fileWatcherCallback);
        if (index > -1) {
          closeItem.watcherCallbacks.splice(index, 1);
        }
      }
    };
    addDestroy(close);
    if (item) {
      item.isDirectory = false;
      item.isFile = true;
      item.watcherCallbacks = item.watcherCallbacks || [];
      item.watcherCallbacks.push(fileWatcherCallback);
    } else {
      items.set(p, {
        basename: (0, import_path22.basename)(p),
        dirname: (0, import_path22.dirname)(p),
        isDirectory: false,
        isFile: true,
        watcherCallbacks: [fileWatcherCallback],
        data: void 0
      });
    }
    return {
      close() {
        removeDestroy(close);
        close();
      }
    };
  };
  const emitDirectoryWatch = (p, emitted) => {
    const parentDir = normalize((0, import_path22.dirname)(p));
    const dirItem = items.get(parentDir);
    if (dirItem && dirItem.isDirectory && dirItem.watcherCallbacks) {
      for (const watcherCallback of dirItem.watcherCallbacks) {
        watcherCallback(p, null);
      }
    }
    if (!emitted.has(parentDir)) {
      emitted.add(parentDir);
      emitDirectoryWatch(parentDir, emitted);
    }
  };
  const writeFileSync = (p, data) => {
    p = normalize(p);
    const results = {
      path: p,
      error: null
    };
    const item = items.get(p);
    if (item) {
      const hasChanged = item.data !== data;
      item.data = data;
      if (hasChanged && item.watcherCallbacks) {
        for (const watcherCallback of item.watcherCallbacks) {
          watcherCallback(p, "fileUpdate");
        }
      }
    } else {
      items.set(p, {
        basename: (0, import_path22.basename)(p),
        dirname: (0, import_path22.dirname)(p),
        isDirectory: false,
        isFile: true,
        watcherCallbacks: null,
        data
      });
      emitDirectoryWatch(p, /* @__PURE__ */ new Set());
    }
    return results;
  };
  const fetch = typeof self !== "undefined" ? self == null ? void 0 : self.fetch : typeof window !== "undefined" ? window == null ? void 0 : window.fetch : typeof global !== "undefined" ? global == null ? void 0 : global.fetch : void 0;
  const writeFile2 = async (p, data) => writeFileSync(p, data);
  const tmpDirSync = () => "/.tmp";
  const tick = Promise.resolve();
  const nextTick = (cb) => tick.then(cb);
  const generateContentHash = async (content, hashLength) => {
    const arrayBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(content));
    const hashArray = Array.from(new Uint8Array(arrayBuffer));
    let hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    if (typeof hashLength === "number") {
      hashHex = hashHex.slice(0, hashLength);
    }
    return hashHex;
  };
  const copy = async (copyTasks, srcDir) => {
    const results = {
      diagnostics: [],
      dirPaths: [],
      filePaths: []
    };
    logger.info("todo, copy task", copyTasks.length, srcDir);
    return results;
  };
  const getEnvironmentVar = (key) => {
    return process2 == null ? void 0 : process2.env[key];
  };
  const getLocalModulePath = (opts) => join(opts.rootDir, "node_modules", opts.moduleId, opts.path);
  const getRemoteModuleUrl = (opts) => {
    const npmBaseUrl = "https://cdn.jsdelivr.net/npm/";
    const path7 = `${opts.moduleId}${opts.version ? "@" + opts.version : ""}/${opts.path}`;
    return new URL(path7, npmBaseUrl).href;
  };
  const fileWatchTimeout = 32;
  createDirSync("/");
  const sys = {
    name: "in-memory",
    version,
    events,
    access,
    accessSync,
    addDestroy,
    copyFile,
    createDir,
    createDirSync,
    homeDir,
    isTTY,
    getEnvironmentVar,
    destroy,
    encodeToBase64,
    exit: async (exitCode) => logger.warn(`exit ${exitCode}`),
    getCurrentDirectory,
    getCompilerExecutingPath,
    getLocalModulePath,
    getRemoteModuleUrl,
    hardwareConcurrency,
    isSymbolicLink,
    nextTick,
    normalizePath: normalize,
    platformPath: import_path22.default,
    readDir,
    readDirSync,
    readFile,
    readFileSync,
    realpath,
    realpathSync,
    removeDestroy,
    rename,
    fetch,
    resolvePath,
    removeDir,
    removeDirSync,
    stat,
    statSync,
    tmpDirSync,
    removeFile,
    removeFileSync,
    watchDirectory,
    watchFile,
    watchTimeout: fileWatchTimeout,
    writeFile: writeFile2,
    writeFileSync,
    generateContentHash,
    // no threading when we're running in-memory
    createWorkerController: null,
    details: {
      cpuModel: "",
      freemem: () => 0,
      platform: "",
      release: "",
      totalmem: 0
    },
    copy
  };
  sys.resolveModuleId = (opts) => resolveModuleIdAsync(sys, null, opts);
  return sys;
};

// src/testing/testing-sys.ts
function isTestingSystem(sys) {
  return "diskReads" in sys && "diskWrites" in sys;
}
var createTestingSystem = () => {
  let diskReads = 0;
  let diskWrites = 0;
  const sys = createSystem();
  sys.platformPath = import_path23.default;
  sys.generateContentHash = (content, length) => {
    let hash = (0, import_crypto.createHash)("sha1").update(content).digest("hex").toLowerCase();
    if (typeof length === "number") {
      hash = hash.slice(0, length);
    }
    return Promise.resolve(hash);
  };
  const wrapRead = (fn) => {
    const orgFn = fn;
    return (...args) => {
      diskReads++;
      return orgFn.apply(orgFn, args);
    };
  };
  const wrapWrite = (fn) => {
    const orgFn = fn;
    return (...args) => {
      diskWrites++;
      return orgFn.apply(orgFn, args);
    };
  };
  sys.access = wrapRead(sys.access);
  sys.accessSync = wrapRead(sys.accessSync);
  sys.homeDir = wrapRead(sys.homeDir);
  sys.readFile = wrapRead(sys.readFile);
  sys.readFileSync = wrapRead(sys.readFileSync);
  sys.readDir = wrapRead(sys.readDir);
  sys.readDirSync = wrapRead(sys.readDirSync);
  sys.stat = wrapRead(sys.stat);
  sys.statSync = wrapRead(sys.statSync);
  sys.copyFile = wrapWrite(sys.copyFile);
  sys.createDir = wrapWrite(sys.createDir);
  sys.createDirSync = wrapWrite(sys.createDirSync);
  sys.removeFile = wrapWrite(sys.removeFile);
  sys.removeFileSync = wrapWrite(sys.removeFileSync);
  sys.writeFile = wrapWrite(sys.writeFile);
  sys.writeFileSync = wrapWrite(sys.writeFileSync);
  sys.getCompilerExecutingPath = () => "bin/stencil.js";
  Object.defineProperties(sys, {
    diskReads: {
      get() {
        return diskReads;
      },
      set(val) {
        diskReads = val;
      }
    },
    diskWrites: {
      get() {
        return diskWrites;
      },
      set(val) {
        diskWrites = val;
      }
    }
  });
  if (!isTestingSystem(sys)) {
    throw new Error("could not generate TestingSystem");
  }
  return sys;
};

// src/testing/mocks.ts
var mockComponentMeta = stubComponentCompilerMeta;
function mockValidatedConfig(overrides = {}) {
  var _a2;
  const baseConfig = mockConfig(overrides);
  const rootDir4 = import_path24.default.resolve("/");
  return {
    ...baseConfig,
    buildEs5: false,
    cacheDir: ".stencil",
    devMode: true,
    devServer: {},
    extras: {},
    flags: createConfigFlags(),
    fsNamespace: "testing",
    hashFileNames: false,
    hashedFileNameLength: 8,
    hydratedFlag: null,
    logLevel: "info",
    logger: mockLogger(),
    minifyCss: false,
    minifyJs: false,
    namespace: "Testing",
    outputTargets: (_a2 = baseConfig.outputTargets) != null ? _a2 : [],
    packageJsonFilePath: import_path24.default.join(rootDir4, "package.json"),
    rootDir: rootDir4,
    sourceMap: true,
    srcDir: "/src",
    srcIndexHtml: "src/index.html",
    suppressReservedPublicNameWarnings: false,
    sys: createTestingSystem(),
    testing: {},
    transformAliasedImportPaths: true,
    rollupConfig: {
      inputOptions: {},
      outputOptions: {}
    },
    validatePrimaryPackageOutputTarget: false,
    ...overrides
  };
}
function mockConfig(overrides = {}) {
  const rootDir4 = import_path24.default.resolve("/");
  let { sys } = overrides;
  if (!sys) {
    sys = createTestingSystem();
  }
  sys.getCurrentDirectory = () => rootDir4;
  return {
    _isTesting: true,
    buildAppCore: false,
    buildDist: true,
    buildEs5: false,
    bundles: null,
    devMode: true,
    enableCache: false,
    extras: {},
    flags: createConfigFlags(),
    globalScript: null,
    hashFileNames: false,
    logger: new TestingLogger(),
    maxConcurrentWorkers: 0,
    minifyCss: false,
    minifyJs: false,
    namespace: "Testing",
    nodeResolve: {
      // TODO(STENCIL-1107): Remove this field - it's currently overriding Stencil's default options to pass into
      // the `@rollup/plugin-node-resolve` plugin.
      customResolveOptions: {}
    },
    outputTargets: null,
    rollupPlugins: {
      before: [],
      after: []
    },
    rootDir: rootDir4,
    sourceMap: true,
    suppressReservedPublicNameWarnings: false,
    sys,
    testing: null,
    validateTypes: false,
    ...overrides
  };
}
var mockLoadConfigInit = (overrides) => {
  const defaults2 = {
    config: {},
    configPath: void 0,
    initTsConfig: true,
    logger: void 0,
    sys: void 0
  };
  return { ...defaults2, ...overrides };
};
function mockCompilerCtx(config) {
  const innerConfig = config || mockValidatedConfig();
  const compilerCtx = {
    version: 1,
    activeBuildId: 0,
    activeDirsAdded: [],
    activeDirsDeleted: [],
    activeFilesAdded: [],
    activeFilesDeleted: [],
    activeFilesUpdated: [],
    addWatchDir: noop,
    addWatchFile: noop,
    cachedGlobalStyle: null,
    changedFiles: /* @__PURE__ */ new Set(),
    changedModules: /* @__PURE__ */ new Set(),
    collections: [],
    compilerOptions: null,
    cache: null,
    cssModuleImports: /* @__PURE__ */ new Map(),
    events: buildEvents(),
    fs: null,
    hasSuccessfulBuild: false,
    isActivelyBuilding: false,
    lastBuildResults: null,
    moduleMap: /* @__PURE__ */ new Map(),
    nodeMap: /* @__PURE__ */ new WeakMap(),
    reset: noop,
    resolvedCollections: /* @__PURE__ */ new Set(),
    rollupCache: /* @__PURE__ */ new Map(),
    rollupCacheHydrate: null,
    rollupCacheLazy: null,
    rollupCacheNative: null,
    styleModeNames: /* @__PURE__ */ new Set(),
    worker: (0, import_compiler5.createWorkerContext)(innerConfig.sys)
  };
  Object.defineProperty(compilerCtx, "fs", {
    get() {
      if (this._fs == null) {
        this._fs = createInMemoryFs(innerConfig.sys);
      }
      return this._fs;
    }
  });
  Object.defineProperty(compilerCtx, "cache", {
    get() {
      if (this._cache == null) {
        this._cache = mockCache(innerConfig, compilerCtx);
      }
      return this._cache;
    }
  });
  return compilerCtx;
}
function mockBuildCtx(config, compilerCtx) {
  const validatedConfig = config || mockValidatedConfig();
  const validatedCompilerCtx = compilerCtx || mockCompilerCtx(validatedConfig);
  const buildCtx = new BuildContext(validatedConfig, validatedCompilerCtx);
  return buildCtx;
}
function mockCache(config, compilerCtx) {
  config.enableCache = true;
  const cache = new Cache(config, compilerCtx.fs);
  cache.initCacheDir();
  return cache;
}
function mockLogger() {
  return new TestingLogger();
}
function mockCompilerSystem() {
  return createTestingSystem();
}
function mockDocument(html = null) {
  const win2 = new import_mock_doc18.MockWindow(html);
  return win2.document;
}
function mockWindow(html) {
  const win2 = new import_mock_doc18.MockWindow(html);
  return win2;
}
var mockModule = (mod = {}) => ({
  cmps: [],
  isExtended: false,
  isMixin: false,
  hasExportableMixins: false,
  coreRuntimeApis: [],
  outputTargetCoreRuntimeApis: {},
  collectionName: "",
  dtsFilePath: "",
  excludeFromCollection: false,
  externalImports: [],
  htmlAttrNames: [],
  htmlTagNames: [],
  htmlParts: [],
  isCollectionDependency: false,
  isLegacy: false,
  jsFilePath: "",
  localImports: [],
  functionalComponentDeps: [],
  originalImports: [],
  originalCollectionComponentPath: "",
  potentialCmpRefs: [],
  sourceFilePath: "",
  staticSourceFile: "",
  staticSourceFileText: "",
  sourceMapPath: "",
  sourceMapFileText: "",
  // build features
  hasVdomAttribute: false,
  hasVdomClass: false,
  hasVdomFunctional: false,
  hasVdomKey: false,
  hasVdomListener: false,
  hasVdomPropOrAttr: false,
  hasVdomRef: false,
  hasVdomRender: false,
  hasVdomStyle: false,
  hasVdomText: false,
  hasVdomXlink: false,
  ...mod
});

// src/testing/puppeteer/puppeteer-element.ts
var import_mock_doc19 = _lazyRequire("../mock-doc/index.cjs");

// src/testing/puppeteer/puppeteer-events.ts
async function initPageEvents(page) {
  page._e2eEvents = /* @__PURE__ */ new Map();
  page._e2eEventIds = 0;
  page.spyOnEvent = pageSpyOnEvent.bind(page, page);
  await page.exposeFunction("stencilOnEvent", (id, ev) => {
    nodeContextEvents(page._e2eEvents, id, ev);
  });
  await page.evaluateOnNewDocument(browserContextEvents);
}
async function pageSpyOnEvent(page, eventName, selector) {
  const eventSpy = new EventSpy(eventName);
  const handler = selector !== "document" ? () => window : () => document;
  const handle = await page.evaluateHandle(handler);
  await addE2EListener(page, handle, eventName, (ev) => {
    eventSpy.push(ev);
  });
  return eventSpy;
}
async function waitForEvent(page, eventName, elementHandle) {
  const timeoutMs = typeof jasmine !== "undefined" && jasmine.DEFAULT_TIMEOUT_INTERVAL ? jasmine.DEFAULT_TIMEOUT_INTERVAL * 0.5 : 2500;
  const ev = await page.evaluate(
    (element, eventName2, timeoutMs2) => {
      return new Promise((resolve3, reject) => {
        const tmr = setTimeout(() => {
          reject(new Error(`waitForEvent() timeout, eventName: ${eventName2}`));
        }, timeoutMs2);
        element.addEventListener(
          eventName2,
          (ev2) => {
            clearTimeout(tmr);
            resolve3(window.stencilSerializeEvent(ev2));
          },
          { once: true }
        );
      });
    },
    elementHandle,
    eventName,
    timeoutMs
  );
  await page.waitForChanges();
  return ev;
}
var EventSpy = class {
  constructor(eventName) {
    this.eventName = eventName;
  }
  events = [];
  cursor = 0;
  queuedHandler = [];
  get length() {
    return this.events.length;
  }
  get firstEvent() {
    return this.events[0] || null;
  }
  get lastEvent() {
    return this.events[this.events.length - 1] || null;
  }
  next() {
    const cursor = this.cursor;
    this.cursor++;
    const next = this.events[cursor];
    if (next) {
      return Promise.resolve({
        done: false,
        value: next
      });
    } else {
      let resolve3;
      const promise = new Promise((r) => resolve3 = r);
      this.queuedHandler.push(resolve3);
      return promise.then(() => ({
        done: false,
        value: this.events[cursor]
      }));
    }
  }
  push(ev) {
    this.events.push(ev);
    const next = this.queuedHandler.shift();
    if (next) {
      next();
    }
  }
};
async function addE2EListener(page, elmHandle, eventName, callback) {
  const id = page._e2eEventIds++;
  page._e2eEvents.set(id, {
    eventName,
    callback
  });
  await elmHandle.evaluate(
    (elm, id2, eventName2) => {
      elm.addEventListener(eventName2, (ev) => {
        window.stencilOnEvent(
          id2,
          window.stencilSerializeEvent(ev)
        );
      });
    },
    id,
    eventName
  );
}
function nodeContextEvents(waitForEvents, eventId, ev) {
  const waitForEventData = waitForEvents.get(eventId);
  if (waitForEventData) {
    waitForEventData.callback(ev);
  }
}
function browserContextEvents() {
  const waitFrame = () => {
    return new Promise((resolve3) => {
      requestAnimationFrame(resolve3);
    });
  };
  const allReady = () => {
    const promises = [];
    const waitForDidLoad = (promises2, elm) => {
      if (elm != null && elm.nodeType === 1) {
        for (let i = 0; i < elm.children.length; i++) {
          const childElm = elm.children[i];
          if (childElm.tagName.includes("-") && typeof childElm.componentOnReady === "function") {
            promises2.push(childElm.componentOnReady());
          }
          waitForDidLoad(promises2, childElm);
        }
      }
    };
    waitForDidLoad(promises, window.document.documentElement);
    return Promise.all(promises).catch((e) => console.error(e));
  };
  const stencilReady = () => {
    return allReady().then(() => waitFrame()).then(() => allReady()).then(() => {
      window.stencilAppLoaded = true;
    });
  };
  window.stencilSerializeEventTarget = (target) => {
    if (!target) {
      return null;
    }
    if (target === window) {
      return { serializedWindow: true };
    }
    if (target === document) {
      return { serializedDocument: true };
    }
    if (target.nodeType != null) {
      const serializedElement = {
        serializedElement: true,
        nodeName: target.nodeName,
        nodeValue: target.nodeValue,
        nodeType: target.nodeType,
        tagName: target.tagName,
        className: target.className,
        id: target.id
      };
      return serializedElement;
    }
    return null;
  };
  window.stencilSerializeEvent = (orgEv) => {
    const serializedEvent = {
      bubbles: orgEv.bubbles,
      cancelBubble: orgEv.cancelBubble,
      cancelable: orgEv.cancelable,
      composed: orgEv.composed,
      currentTarget: window.stencilSerializeEventTarget(orgEv.currentTarget),
      defaultPrevented: orgEv.defaultPrevented,
      detail: orgEv.detail,
      eventPhase: orgEv.eventPhase,
      isTrusted: orgEv.isTrusted,
      returnValue: orgEv.returnValue,
      srcElement: window.stencilSerializeEventTarget(orgEv.srcElement),
      target: window.stencilSerializeEventTarget(orgEv.target),
      timeStamp: orgEv.timeStamp,
      type: orgEv.type,
      isSerializedEvent: true
    };
    return serializedEvent;
  };
  if (window.document.readyState === "complete") {
    stencilReady();
  } else {
    document.addEventListener("readystatechange", function(e) {
      if (e.target.readyState == "complete") {
        stencilReady();
      }
    });
  }
}

// src/testing/puppeteer/puppeteer-element.ts
var E2EElement = class extends import_mock_doc19.MockHTMLElement {
  constructor(_page, _elmHandle) {
    super(null, null);
    this._page = _page;
    this._elmHandle = _elmHandle;
    _page._e2eElements.push(this);
  }
  _queuedActions = [];
  _queueAction(action) {
    this._queuedActions.push(action);
  }
  find(selector) {
    return find(this._page, this._elmHandle, selector);
  }
  findAll(selector) {
    return findAll(this._page, this._elmHandle, selector);
  }
  callMethod(methodName, ...methodArgs) {
    this._queueAction({
      methodName,
      methodArgs
    });
    return this.e2eRunActions();
  }
  triggerEvent(eventName, eventInitDict) {
    this._queueAction({
      eventName,
      eventInitDict
    });
  }
  async spyOnEvent(eventName) {
    const eventSpy = new EventSpy(eventName);
    await addE2EListener(this._page, this._elmHandle, eventName, (ev) => {
      eventSpy.push(ev);
    });
    return eventSpy;
  }
  async click(options) {
    await this._elmHandle.click(options);
    await this._page.waitForChanges();
  }
  async focus() {
    await this._elmHandle.focus();
    await this._page.waitForChanges();
  }
  async hover() {
    await this._elmHandle.hover();
    await this._page.waitForChanges();
  }
  async isVisible() {
    this._validate();
    let isVisible = false;
    try {
      const executionContext = getPuppeteerExecution(this._elmHandle);
      isVisible = await executionContext.evaluate((elm) => {
        return new Promise((resolve3) => {
          window.requestAnimationFrame(() => {
            if (elm.isConnected) {
              const style = window.getComputedStyle(elm);
              const isVisible2 = !!style && style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
              if (isVisible2) {
                window.requestAnimationFrame(() => {
                  elm.clientWidth;
                  resolve3(true);
                });
              } else {
                resolve3(false);
              }
            } else {
              resolve3(false);
            }
          });
        });
      }, this._elmHandle);
    } catch (e) {
    }
    return isVisible;
  }
  waitForEvent(eventName) {
    return waitForEvent(this._page, eventName, this._elmHandle);
  }
  waitForVisible() {
    return new Promise((resolve3, reject) => {
      const checkVisible = async () => {
        const isVisible = await this.isVisible();
        if (isVisible) {
          clearInterval(resolveTmr);
          clearTimeout(rejectTmr);
          resolve3();
        }
      };
      const resolveTmr = setInterval(checkVisible, 10);
      const timeout = typeof jasmine !== "undefined" && jasmine.DEFAULT_TIMEOUT_INTERVAL ? jasmine.DEFAULT_TIMEOUT_INTERVAL * 0.5 : 2500;
      const timeoutError = new Error(`waitForVisible timed out: ${timeout}ms`);
      const rejectTmr = setTimeout(() => {
        clearTimeout(resolveTmr);
        reject(timeoutError);
      }, timeout);
    });
  }
  waitForNotVisible() {
    return new Promise((resolve3, reject) => {
      const checkVisible = async () => {
        const isVisible = await this.isVisible();
        if (!isVisible) {
          clearInterval(resolveTmr);
          clearTimeout(rejectTmr);
          resolve3();
        }
      };
      const resolveTmr = setInterval(checkVisible, 10);
      const timeout = typeof jasmine !== "undefined" && jasmine.DEFAULT_TIMEOUT_INTERVAL ? jasmine.DEFAULT_TIMEOUT_INTERVAL * 0.5 : 2500;
      const timeoutError = new Error(`waitForNotVisible timed out: ${timeout}ms`);
      const rejectTmr = setTimeout(() => {
        clearTimeout(resolveTmr);
        reject(timeoutError);
      }, timeout);
    });
  }
  isIntersectingViewport() {
    return this._elmHandle.isIntersectingViewport();
  }
  async press(key, options) {
    await this._elmHandle.press(key, options);
    await this._page.waitForChanges();
  }
  async tap() {
    await this._elmHandle.tap();
    await this._page.waitForChanges();
  }
  async type(text, options) {
    await this._elmHandle.type(text, options);
    await this._page.waitForChanges();
  }
  async getProperty(propertyName) {
    this._validate();
    const executionContext = getPuppeteerExecution(this._elmHandle);
    const propValue = await executionContext.evaluate(
      (elm, propertyName2) => {
        return elm[propertyName2];
      },
      this._elmHandle,
      propertyName
    );
    return propValue;
  }
  setProperty(propertyName, value) {
    this._queueAction({
      setPropertyName: propertyName,
      setPropertyValue: value
    });
  }
  getAttribute(name) {
    this._validate();
    return super.getAttribute(name);
  }
  setAttribute(name, value) {
    this._queueAction({
      setAttributeName: name,
      setAttributeValue: value
    });
  }
  removeAttribute(name) {
    this._queueAction({
      removeAttribute: name
    });
  }
  toggleAttribute(name, force) {
    this._queueAction({
      toggleAttributeName: name,
      toggleAttributeForce: force
    });
  }
  get classList() {
    const api = {
      add: (...classNames) => {
        classNames.forEach((className) => {
          this._queueAction({
            classAdd: className
          });
        });
      },
      remove: (...classNames) => {
        classNames.forEach((className) => {
          this._queueAction({
            classRemove: className
          });
        });
      },
      toggle: (className) => {
        this._queueAction({
          classToggle: className
        });
      },
      contains: (className) => {
        this._validate();
        return super.className.split(" ").includes(className);
      }
    };
    return api;
  }
  get className() {
    this._validate();
    return super.className;
  }
  set className(value) {
    this._queueAction({
      setPropertyName: "className",
      setPropertyValue: value
    });
  }
  get id() {
    this._validate();
    return super.id;
  }
  set id(value) {
    this._queueAction({
      setPropertyName: "id",
      setPropertyValue: value
    });
  }
  get innerHTML() {
    this._validate();
    return super.innerHTML;
  }
  set innerHTML(value) {
    this._queueAction({
      setPropertyName: "innerHTML",
      setPropertyValue: value
    });
  }
  get innerText() {
    this._validate();
    return super.innerText;
  }
  set innerText(value) {
    this._queueAction({
      setPropertyName: "innerText",
      setPropertyValue: value
    });
  }
  get nodeValue() {
    this._validate();
    return super.nodeValue;
  }
  set nodeValue(value) {
    if (typeof value === "string") {
      this._queueAction({
        setPropertyName: "nodeValue",
        setPropertyValue: value
      });
    }
  }
  get outerHTML() {
    this._validate();
    return super.outerHTML;
  }
  set outerHTML(_) {
    throw new Error(`outerHTML is read-only`);
  }
  get shadowRoot() {
    this._validate();
    return super.shadowRoot;
  }
  set shadowRoot(value) {
    super.shadowRoot = value;
  }
  get tabIndex() {
    this._validate();
    return super.tabIndex;
  }
  set tabIndex(value) {
    this._queueAction({
      setPropertyName: "tabIndex",
      setPropertyValue: value
    });
  }
  get textContent() {
    this._validate();
    return super.textContent;
  }
  set textContent(value) {
    this._queueAction({
      setPropertyName: "textContent",
      setPropertyValue: value
    });
  }
  get title() {
    this._validate();
    return super.title;
  }
  set title(value) {
    this._queueAction({
      setPropertyName: "title",
      setPropertyValue: value
    });
  }
  async getComputedStyle(pseudoElt) {
    const style = await this._page.evaluate(
      (elm, pseudoElt2) => {
        const rtn = {};
        const computedStyle = window.getComputedStyle(elm, pseudoElt2);
        const keys = [
          ...Object.keys(computedStyle),
          /**
           * include CSS variables defined within the style attribute
           * of an element, e.g.:
           * ```
           * <my-component style="--my-component-text-color: rgb(255, 0, 0);"></my-component>
           * ```
           */
          ...Array.from(elm.style)
        ];
        keys.forEach((key) => {
          if (isNaN(key)) {
            const value = (
              /**
               * access property directly for any known css property
               */
              computedStyle[key] || /**
               * use `getPropertyValue` for css variables
               */
              computedStyle.getPropertyValue(key)
            );
            if (value != null) {
              rtn[key] = value;
            }
          } else {
            const dashProp = computedStyle[key];
            if (dashProp.includes("-")) {
              const value = computedStyle.getPropertyValue(dashProp);
              if (value != null) {
                rtn[dashProp] = value;
              }
            }
          }
        });
        return rtn;
      },
      this._elmHandle,
      pseudoElt
    );
    style.getPropertyValue = (propName) => {
      return style[propName];
    };
    return style;
  }
  async e2eRunActions() {
    if (this._queuedActions.length === 0) {
      return;
    }
    const executionContext = getPuppeteerExecution(this._elmHandle);
    const rtn = await executionContext.evaluate(
      (elm, queuedActions) => {
        return elm.componentOnReady().then(() => {
          let rtn2 = null;
          queuedActions.forEach((queuedAction) => {
            if (queuedAction.methodName) {
              rtn2 = elm[queuedAction.methodName].apply(elm, queuedAction.methodArgs);
            } else if (queuedAction.setPropertyName) {
              elm[queuedAction.setPropertyName] = queuedAction.setPropertyValue;
            } else if (queuedAction.setAttributeName) {
              elm.setAttribute(queuedAction.setAttributeName, queuedAction.setAttributeValue);
            } else if (queuedAction.removeAttribute) {
              elm.removeAttribute(queuedAction.removeAttribute);
            } else if (queuedAction.toggleAttributeName) {
              if (typeof queuedAction.toggleAttributeForce === "boolean") {
                elm.toggleAttribute(queuedAction.toggleAttributeName, queuedAction.toggleAttributeForce);
              } else {
                elm.toggleAttribute(queuedAction.toggleAttributeName);
              }
            } else if (queuedAction.classAdd) {
              elm.classList.add(queuedAction.classAdd);
            } else if (queuedAction.classRemove) {
              elm.classList.remove(queuedAction.classRemove);
            } else if (queuedAction.classToggle) {
              elm.classList.toggle(queuedAction.classToggle);
            } else if (queuedAction.eventName) {
              const eventInitDict = queuedAction.eventInitDict || {};
              if (typeof eventInitDict.bubbles !== "boolean") {
                eventInitDict.bubbles = true;
              }
              if (typeof eventInitDict.cancelable !== "boolean") {
                eventInitDict.cancelable = true;
              }
              if (typeof eventInitDict.composed !== "boolean") {
                eventInitDict.composed = true;
              }
              const ev = new CustomEvent(queuedAction.eventName, eventInitDict);
              elm.dispatchEvent(ev);
            }
          });
          if (rtn2 && typeof rtn2.then === "function") {
            return rtn2.then((value) => {
              return value;
            });
          }
          return rtn2;
        });
      },
      this._elmHandle,
      this._queuedActions
    );
    this._queuedActions.length = 0;
    return rtn;
  }
  async e2eSync() {
    const executionContext = getPuppeteerExecution(this._elmHandle);
    const { outerHTML, shadowRootHTML } = await executionContext.evaluate((elm) => {
      return {
        outerHTML: elm.outerHTML,
        shadowRootHTML: elm.shadowRoot ? elm.shadowRoot.innerHTML : null
      };
    }, this._elmHandle);
    if (typeof shadowRootHTML === "string") {
      this.shadowRoot = (0, import_mock_doc19.parseHtmlToFragment)(shadowRootHTML);
      this.shadowRoot.host = this;
    } else {
      this.shadowRoot = null;
    }
    const frag = (0, import_mock_doc19.parseHtmlToFragment)(outerHTML);
    const rootElm = frag.firstElementChild;
    if (!rootElm) {
      return;
    }
    this.nodeName = rootElm.nodeName;
    this.attributes = (0, import_mock_doc19.cloneAttributes)(rootElm.attributes);
    while (this.childNodes.length > 0) {
      this.removeChild(this.childNodes[0]);
    }
    while (rootElm.childNodes.length > 0) {
      this.appendChild(rootElm.childNodes[0]);
    }
  }
  _validate() {
    if (this._queuedActions.length > 0) {
      throw new Error(`await page.waitForChanges() must be called before reading element information`);
    }
  }
  async e2eDispose() {
    if (this._elmHandle) {
      await this._elmHandle.dispose();
      this._elmHandle = null;
    }
    const index = this._page._e2eElements.indexOf(this);
    if (index > -1) {
      this._page._e2eElements.splice(index, 1);
    }
    this._page = null;
  }
};
async function find(page, rootHandle, selector) {
  const { lightSelector, text, contains } = getSelector(selector);
  let elmHandle;
  if (typeof selector === "string" && selector.includes(">>>")) {
    const handle = await page.$(selector);
    if (!handle) {
      return null;
    }
    const elm2 = new E2EElement(page, handle);
    await elm2.e2eSync();
    return elm2;
  }
  if (typeof lightSelector === "string") {
    elmHandle = await findWithCssSelector(rootHandle, lightSelector);
  } else {
    elmHandle = await findWithText(page, rootHandle, text, contains);
  }
  if (!elmHandle) {
    return null;
  }
  const elm = new E2EElement(page, elmHandle);
  await elm.e2eSync();
  return elm;
}
async function findWithCssSelector(rootHandle, lightSelector) {
  const elmHandle = await rootHandle.$(lightSelector);
  if (!elmHandle) {
    return null;
  }
  return elmHandle;
}
async function findWithText(page, rootHandle, text, contains) {
  const jsHandle = await page.evaluateHandle(
    (rootElm, text2, contains2) => {
      let foundElm = null;
      function checkContent(elm) {
        if (!elm || foundElm) {
          return;
        }
        if (elm.nodeType === 3) {
          if (typeof text2 === "string" && elm.textContent.trim() === text2) {
            foundElm = elm.parentElement;
            return;
          }
          if (typeof contains2 === "string" && elm.textContent.includes(contains2)) {
            foundElm = elm.parentElement;
            return;
          }
        } else {
          if (elm.nodeName === "SCRIPT" || elm.nodeName === "STYLE") {
            return;
          }
          checkContent(elm.shadowRoot);
          if (elm.childNodes) {
            for (let i = 0; i < elm.childNodes.length; i++) {
              checkContent(elm.childNodes[i]);
            }
          }
        }
      }
      checkContent(rootElm);
      return foundElm;
    },
    rootHandle,
    text,
    contains
  );
  if (jsHandle) {
    return jsHandle.asElement();
  }
  return null;
}
async function findAll(page, rootHandle, selector) {
  const foundElms = [];
  if (typeof selector === "string" && selector.includes(">>>")) {
    const handles = await page.$$(selector);
    for (let i = 0; i < handles.length; i++) {
      const elm = new E2EElement(page, handles[i]);
      await elm.e2eSync();
      foundElms.push(elm);
    }
    return foundElms;
  }
  const { lightSelector } = getSelector(selector);
  const lightElmHandles = await rootHandle.$$(lightSelector);
  if (lightElmHandles.length === 0) {
    return foundElms;
  }
  for (let i = 0; i < lightElmHandles.length; i++) {
    const elm = new E2EElement(page, lightElmHandles[i]);
    await elm.e2eSync();
    foundElms.push(elm);
  }
  return foundElms;
}
function getSelector(selector) {
  const rtn = {
    lightSelector: null,
    text: null,
    contains: null
  };
  if (typeof selector === "string") {
    rtn.lightSelector = selector.trim();
  } else if (typeof selector.text === "string") {
    rtn.text = selector.text.trim();
  } else if (typeof selector.contains === "string") {
    rtn.contains = selector.contains.trim();
  } else {
    throw new Error(`invalid find selector: ${selector}`);
  }
  return rtn;
}
function getPuppeteerExecution(elmHandle) {
  const puppeteerMajorVersion = parseInt(process.env.__STENCIL_PUPPETEER_VERSION__, 10);
  if (puppeteerMajorVersion >= 17) {
    return elmHandle.frame;
  } else {
    return elmHandle.executionContext();
  }
}

// src/screenshot/screenshot-compare.ts
var import_child_process = require("child_process");
var import_crypto2 = require("crypto");
var import_path26 = require("path");

// src/screenshot/screenshot-fs.ts
var import_fs = __toESM(require("fs"));
var import_path25 = __toESM(require("path"));
async function writeScreenshotImage(imagePath, screenshotBuf) {
  const imageExists = await fileExists(imagePath);
  if (!imageExists) {
    await writeFile(imagePath, screenshotBuf);
  }
}
async function writeScreenshotData(dataDir, screenshotData) {
  const filePath = getDataFilePath(dataDir, screenshotData.id);
  const content = JSON.stringify(screenshotData, null, 2);
  await writeFile(filePath, content);
}
function getDataFilePath(dataDir, screenshotId) {
  const fileName = `${screenshotId}.json`;
  return import_path25.default.join(dataDir, fileName);
}
function fileExists(filePath) {
  return new Promise((resolve3) => {
    import_fs.default.access(filePath, (err2) => resolve3(!err2));
  });
}
function writeFile(filePath, data) {
  return new Promise((resolve3, reject) => {
    import_fs.default.writeFile(filePath, data, (err2) => {
      if (err2) {
        reject(err2);
      } else {
        resolve3();
      }
    });
  });
}

// src/screenshot/screenshot-compare.ts
var DEFAULT_SCREENSHOT_TIMEOUT = 2500;
async function compareScreenshot(emulateConfig, screenshotBuildData, currentScreenshotBuf, screenshotTimeoutMs, desc, width, height, testPath, pixelmatchThreshold) {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  const currentImageHash = (0, import_crypto2.createHash)("sha256").update(currentScreenshotBuf).digest("hex");
  const currentImageName = `${currentImageHash}.png`;
  const currentImagePath = (0, import_path26.join)(screenshotBuildData.imagesDir, currentImageName);
  await writeScreenshotImage(currentImagePath, currentScreenshotBuf);
  if (testPath) {
    testPath = normalizePath((0, import_path26.relative)(screenshotBuildData.rootDir, testPath));
  }
  const screenshotId = getScreenshotId(emulateConfig, desc);
  const screenshot = {
    id: screenshotId,
    image: currentImageName,
    device: emulateConfig.device,
    userAgent: emulateConfig.userAgent,
    desc,
    testPath,
    width,
    height,
    deviceScaleFactor: (_a2 = emulateConfig.viewport) == null ? void 0 : _a2.deviceScaleFactor,
    hasTouch: (_b = emulateConfig.viewport) == null ? void 0 : _b.hasTouch,
    isLandscape: (_c = emulateConfig.viewport) == null ? void 0 : _c.isLandscape,
    isMobile: (_d = emulateConfig.viewport) == null ? void 0 : _d.isMobile,
    diff: {
      id: screenshotId,
      desc,
      imageA: currentImageName,
      imageB: currentImageName,
      mismatchedPixels: 0,
      device: emulateConfig.device,
      userAgent: emulateConfig.userAgent,
      width,
      height,
      deviceScaleFactor: (_e = emulateConfig.viewport) == null ? void 0 : _e.deviceScaleFactor,
      hasTouch: (_f = emulateConfig.viewport) == null ? void 0 : _f.hasTouch,
      isLandscape: (_g = emulateConfig.viewport) == null ? void 0 : _g.isLandscape,
      isMobile: (_h = emulateConfig.viewport) == null ? void 0 : _h.isMobile,
      allowableMismatchedPixels: screenshotBuildData.allowableMismatchedPixels,
      allowableMismatchedRatio: screenshotBuildData.allowableMismatchedRatio,
      testPath,
      cacheKey: void 0
    }
  };
  if (screenshotBuildData.updateMaster) {
    await writeScreenshotData(screenshotBuildData.currentBuildDir, screenshot);
    return screenshot.diff;
  }
  const masterScreenshotImage = screenshotBuildData.masterScreenshots[screenshot.id];
  if (!masterScreenshotImage) {
    await writeScreenshotData(screenshotBuildData.currentBuildDir, screenshot);
    return screenshot.diff;
  }
  screenshot.diff.imageA = masterScreenshotImage;
  if (screenshot.diff.imageA !== screenshot.diff.imageB) {
    screenshot.diff.cacheKey = getCacheKey(screenshot.diff.imageA, screenshot.diff.imageB, pixelmatchThreshold);
    const cachedMismatchedPixels = screenshotBuildData.cache[screenshot.diff.cacheKey];
    if (typeof cachedMismatchedPixels === "number" && !isNaN(cachedMismatchedPixels)) {
      screenshot.diff.mismatchedPixels = cachedMismatchedPixels;
    } else {
      const pixelMatchInput = {
        imageAPath: (0, import_path26.join)(screenshotBuildData.imagesDir, screenshot.diff.imageA),
        imageBPath: (0, import_path26.join)(screenshotBuildData.imagesDir, screenshot.diff.imageB),
        width: Math.round(width),
        height: Math.round(height),
        pixelmatchThreshold
      };
      screenshot.diff.mismatchedPixels = await getMismatchedPixels(
        screenshotBuildData.pixelmatchModulePath,
        pixelMatchInput,
        screenshotTimeoutMs
      );
    }
  }
  await writeScreenshotData(screenshotBuildData.currentBuildDir, screenshot);
  return screenshot.diff;
}
async function getMismatchedPixels(pixelmatchModulePath, pixelMatchInput, screenshotTimeoutMs) {
  return new Promise((resolve3, reject) => {
    var _a2;
    const timeout = screenshotTimeoutMs !== null ? screenshotTimeoutMs : typeof jasmine !== "undefined" && jasmine.DEFAULT_TIMEOUT_INTERVAL ? jasmine.DEFAULT_TIMEOUT_INTERVAL * 0.5 : DEFAULT_SCREENSHOT_TIMEOUT;
    const tmr = setTimeout(() => {
      reject(`getMismatchedPixels timeout: ${timeout}ms`);
    }, timeout);
    try {
      let error;
      const filteredExecArgs = process.execArgv.filter((v) => !/^--(debug|inspect)/.test(v));
      const options = {
        execArgv: filteredExecArgs,
        env: process.env,
        cwd: process.cwd(),
        stdio: ["pipe", "pipe", "pipe", "ipc"]
      };
      const pixelMatchProcess = (0, import_child_process.fork)(pixelmatchModulePath, [], options);
      pixelMatchProcess.on("message", (data) => {
        pixelMatchProcess.kill();
        clearTimeout(tmr);
        resolve3(data);
      });
      pixelMatchProcess.on("error", (err2) => {
        clearTimeout(tmr);
        reject(err2);
      });
      (_a2 = pixelMatchProcess.stderr) == null ? void 0 : _a2.on("data", (data) => {
        error = data.toString();
      });
      pixelMatchProcess.on("exit", (code) => {
        clearTimeout(tmr);
        const exitError = code === 0 ? new Error("Pixelmatch process exited unexpectedly") : new Error(`Pixelmatch process exited with code ${code}: ${error || "unknown error"}`);
        return reject(exitError);
      });
      pixelMatchProcess.send(pixelMatchInput);
    } catch (e) {
      clearTimeout(tmr);
      reject(`getMismatchedPixels error: ${e}`);
    }
  });
}
function getCacheKey(imageA, imageB, pixelmatchThreshold) {
  const hash = (0, import_crypto2.createHash)("md5");
  hash.update(`${imageA}:${imageB}:${pixelmatchThreshold}`);
  return hash.digest("hex").slice(0, 10);
}
function getScreenshotId(emulateConfig, uniqueDescription) {
  if (typeof uniqueDescription !== "string" || uniqueDescription.trim().length === 0) {
    throw new Error(`invalid test description`);
  }
  const hash = (0, import_crypto2.createHash)("md5");
  hash.update(uniqueDescription + ":");
  hash.update(emulateConfig.userAgent + ":");
  if (emulateConfig.viewport !== void 0) {
    hash.update(emulateConfig.viewport.width + ":");
    hash.update(emulateConfig.viewport.height + ":");
    hash.update(emulateConfig.viewport.deviceScaleFactor + ":");
    hash.update(emulateConfig.viewport.hasTouch + ":");
    hash.update(emulateConfig.viewport.isMobile + ":");
  }
  return hash.digest("hex").slice(0, 8).toLowerCase();
}

// src/testing/puppeteer/puppeteer-screenshot.ts
function initPageScreenshot(page) {
  const env2 = process.env;
  if (env2.__STENCIL_SCREENSHOT__ === "true") {
    page.compareScreenshot = (a, b) => {
      const jestEnv = global;
      let desc = "";
      let testPath = "";
      if (jestEnv.currentSpec) {
        if (typeof jestEnv.currentSpec.fullName === "string") {
          desc = jestEnv.currentSpec.fullName;
        }
        if (typeof jestEnv.currentSpec.testPath === "string") {
          testPath = jestEnv.currentSpec.testPath;
        }
      }
      let opts;
      if (typeof a === "string") {
        if (desc.length > 0) {
          desc += ", " + a;
        } else {
          desc = a;
        }
        if (typeof b === "object") {
          opts = b;
        }
      } else if (typeof a === "object") {
        opts = a;
      }
      desc = desc.trim();
      opts = opts || {};
      if (!desc) {
        throw new Error(`Invalid screenshot description in "${testPath}"`);
      }
      if (jestEnv.screenshotDescriptions.has(desc)) {
        throw new Error(
          `Screenshot description "${desc}" found in "${testPath}" cannot be used for multiple screenshots and must be unique. To make screenshot descriptions unique within the same test, use the first argument to "compareScreenshot", such as "compareScreenshot('more to the description')".`
        );
      }
      jestEnv.screenshotDescriptions.add(desc);
      return pageCompareScreenshot(page, env2, desc, testPath, opts);
    };
  } else {
    page.compareScreenshot = async () => {
      const diff = {
        id: "placeholder",
        mismatchedPixels: 0,
        allowableMismatchedPixels: 1,
        allowableMismatchedRatio: 1,
        desc: "",
        width: 1,
        height: 1,
        deviceScaleFactor: 1
      };
      return diff;
    };
  }
}
async function pageCompareScreenshot(page, env2, desc, testPath, opts) {
  if (typeof env2.__STENCIL_EMULATE__ !== "string") {
    throw new Error(`compareScreenshot, missing screenshot emulate env var`);
  }
  if (typeof env2.__STENCIL_SCREENSHOT_BUILD__ !== "string") {
    throw new Error(`compareScreenshot, missing screen build env var`);
  }
  const screenshotTimeoutMs = typeof env2.__STENCIL_SCREENSHOT_TIMEOUT_MS__ === "string" ? parseInt(env2.__STENCIL_SCREENSHOT_TIMEOUT_MS__, 10) : null;
  const emulateConfig = JSON.parse(env2.__STENCIL_EMULATE__);
  const screenshotBuildData = JSON.parse(env2.__STENCIL_SCREENSHOT_BUILD__);
  await wait(screenshotBuildData.timeoutBeforeScreenshot);
  await page.evaluate(() => {
    return new Promise((resolve3) => {
      window.requestAnimationFrame(() => {
        resolve3();
      });
    });
  });
  let width = emulateConfig.viewport.width;
  let height = emulateConfig.viewport.height;
  if (opts && opts.clip) {
    if (typeof opts.clip.width === "number") {
      width = opts.clip.width;
    }
    if (typeof opts.clip.height === "number") {
      height = opts.clip.height;
    }
  }
  const screenshotOpts = createPuppeteerScreenshotOptions(opts, { width, height });
  const screenshotBuf = await page.screenshot(screenshotOpts);
  const pixelmatchThreshold = typeof opts.pixelmatchThreshold === "number" ? opts.pixelmatchThreshold : screenshotBuildData.pixelmatchThreshold;
  const results = await compareScreenshot(
    emulateConfig,
    screenshotBuildData,
    screenshotBuf,
    screenshotTimeoutMs,
    desc,
    width,
    height,
    testPath,
    pixelmatchThreshold
  );
  return results;
}
function createPuppeteerScreenshotOptions(opts, { width, height }) {
  const puppeteerOpts = {
    type: "png",
    fullPage: opts.fullPage,
    omitBackground: opts.omitBackground,
    encoding: "binary"
  };
  if (opts.clip) {
    puppeteerOpts.captureBeyondViewport = typeof opts.captureBeyondViewport === "boolean" ? opts.captureBeyondViewport : true;
    puppeteerOpts.clip = {
      x: opts.clip.x,
      y: opts.clip.y,
      width: opts.clip.width,
      height: opts.clip.height
    };
  } else {
    puppeteerOpts.captureBeyondViewport = typeof opts.captureBeyondViewport === "boolean" ? opts.captureBeyondViewport : false;
    puppeteerOpts.clip = {
      x: 0,
      y: 0,
      width,
      height
    };
  }
  return puppeteerOpts;
}
function wait(ms) {
  return new Promise((resolve3) => setTimeout(resolve3, ms));
}

// src/testing/puppeteer/puppeteer-page.ts
var DEFAULT_LOAD_TIMEOUT = 30 * 1e3;
var env = process.env;
async function newE2EPage(opts = {}) {
  if (!global.__NEW_TEST_PAGE__) {
    throw new Error(`newE2EPage() is only available from E2E tests, and ran with the --e2e cmd line flag.`);
  }
  const page = await global.__NEW_TEST_PAGE__();
  const diagnostics = [];
  try {
    page._e2eElements = [];
    page._e2eGoto = page.goto;
    page._e2eClose = page.close;
    await page.setCacheEnabled(false);
    await initPageEvents(page);
    initPageScreenshot(page);
    let docPromise = null;
    page.close = async (options) => {
      try {
        if (Array.isArray(page._e2eElements)) {
          const disposes = page._e2eElements.map(async (elmHande) => {
            if (typeof elmHande.e2eDispose === "function") {
              await elmHande.e2eDispose();
            }
          });
          await Promise.all(disposes);
        }
      } catch (e) {
      }
      const noop2 = () => {
        throw new Error("The page was already closed");
      };
      page._e2eElements = noop2;
      page._e2eEvents = noop2;
      page._e2eGoto = noop2;
      page.find = noop2;
      page.debugger = noop2;
      page.findAll = noop2;
      page.compareScreenshot = noop2;
      page.setContent = noop2;
      page.spyOnEvent = noop2;
      page.waitForChanges = noop2;
      page.waitForEvent = noop2;
      try {
        if (!page.isClosed()) {
          await page._e2eClose(options);
        }
      } catch (e) {
      }
    };
    const getDocHandle = async () => {
      if (!docPromise) {
        docPromise = page.evaluateHandle(() => document);
      }
      const documentJsHandle = await docPromise;
      return documentJsHandle.asElement();
    };
    page.find = async (selector) => {
      const docHandle = await getDocHandle();
      return find(page, docHandle, selector);
    };
    page.findAll = async (selector) => {
      const docHandle = await getDocHandle();
      return findAll(page, docHandle, selector);
    };
    page.waitForEvent = async (eventName) => {
      const docHandle = await getDocHandle();
      return waitForEvent(page, eventName, docHandle);
    };
    page.getDiagnostics = () => {
      return diagnostics;
    };
    page.waitForChanges = waitForChanges.bind(null, page);
    page.debugger = () => {
      if (env.__STENCIL_E2E_DEVTOOLS__ !== "true") {
        throw new Error("Set the --devtools flag in order to use E2EPage.debugger()");
      }
      return page.evaluate(() => {
        return new Promise((resolve3) => {
          debugger;
          resolve3();
        });
      });
    };
    const failOnConsoleError = opts.failOnConsoleError === true;
    const failOnNetworkError = opts.failOnNetworkError === true;
    const logFailingNetworkRequests = typeof opts.logFailingNetworkRequests === "boolean" ? opts.logFailingNetworkRequests : true;
    page.on("console", (ev) => {
      if (ev.type() === "error") {
        diagnostics.push({
          type: "error",
          message: ev.text(),
          location: ev.location().url
        });
        if (failOnConsoleError) {
          throw new Error(serializeConsoleMessage(ev));
        }
      }
      consoleMessage(ev);
    });
    page.on("pageerror", (err2) => {
      diagnostics.push({
        type: "pageerror",
        message: err2.message,
        location: err2.stack
      });
      throw err2;
    });
    page.on("requestfailed", (req) => {
      diagnostics.push({
        type: "requestfailed",
        message: req.failure().errorText,
        location: req.url()
      });
      if (failOnNetworkError) {
        throw new Error(req.failure().errorText);
      } else if (logFailingNetworkRequests) {
        console.error("requestfailed", req.url());
      }
    });
    if (typeof opts.html === "string") {
      await e2eSetContent(page, opts.html, { waitUntil: opts.waitUntil });
    } else if (typeof opts.url === "string") {
      await e2eGoTo(page, opts.url, { waitUntil: opts.waitUntil });
    } else {
      page.goto = e2eGoTo.bind(null, page);
      page.setContent = e2eSetContent.bind(null, page);
    }
  } catch (e) {
    if (page) {
      if (!page.isClosed()) {
        await page.close();
      }
    }
    throw e;
  }
  return page;
}
async function e2eGoTo(page, url, options = {}) {
  if (page.isClosed()) {
    throw new Error("e2eGoTo unavailable: page already closed");
  }
  if (typeof url !== "string") {
    throw new Error("invalid gotoTest() url");
  }
  if (!url.startsWith("/")) {
    throw new Error("gotoTest() url must start with /");
  }
  const browserUrl = env.__STENCIL_BROWSER_URL__;
  if (typeof browserUrl !== "string") {
    throw new Error("invalid gotoTest() browser url");
  }
  const fullUrl = browserUrl + url.substring(1);
  if (!options.waitUntil) {
    options.waitUntil = env.__STENCIL_BROWSER_WAIT_UNTIL;
  }
  const rsp = await page._e2eGoto(fullUrl, options);
  if (!rsp.ok()) {
    throw new Error(`Testing unable to load ${url}, HTTP status: ${rsp.status()}`);
  }
  await waitForStencil(page, options);
  return rsp;
}
async function e2eSetContent(page, html, options = {}) {
  if (page.isClosed()) {
    throw new Error("e2eSetContent unavailable: page already closed");
  }
  if (typeof html !== "string") {
    throw new Error("invalid e2eSetContent() html");
  }
  const output = [];
  const appScriptUrl = env.__STENCIL_APP_SCRIPT_URL__;
  if (typeof appScriptUrl !== "string") {
    throw new Error("invalid e2eSetContent() app script url");
  }
  output.push(`<!doctype html>`);
  output.push(`<html>`);
  output.push(`<head>`);
  const appStyleUrl = env.__STENCIL_APP_STYLE_URL__;
  if (typeof appStyleUrl === "string") {
    output.push(`<link rel="stylesheet" href="${appStyleUrl}">`);
  }
  output.push(`<script type="module" src="${appScriptUrl}"></script>`);
  output.push(`</head>`);
  output.push(`<body>`);
  output.push(html);
  output.push(`</body>`);
  output.push(`</html>`);
  const pageUrl = env.__STENCIL_BROWSER_URL__;
  await page.setRequestInterception(true);
  const interceptedReqCallback = (interceptedRequest) => {
    if (pageUrl === interceptedRequest.url()) {
      interceptedRequest.respond({
        status: 200,
        contentType: "text/html",
        body: output.join("\n")
      });
    } else {
      interceptedRequest.continue();
    }
  };
  page.on("request", interceptedReqCallback);
  if (!options.waitUntil) {
    options.waitUntil = env.__STENCIL_BROWSER_WAIT_UNTIL;
  }
  const rsp = await page._e2eGoto(pageUrl, options);
  if (!rsp.ok()) {
    throw new Error(`Testing unable to load content`);
  }
  await waitForStencil(page, options);
}
async function waitForStencil(page, options) {
  const timeout = typeof options.timeout === "number" ? options.timeout : DEFAULT_LOAD_TIMEOUT;
  try {
    await page.waitForFunction("window.stencilAppLoaded", { timeout });
  } catch (e) {
    throw new Error(`App did not load within ${timeout}ms. Please ensure the content loads a stencil application.`);
  }
}
async function waitForChanges(page) {
  try {
    if (page.isClosed()) {
      return;
    }
    await Promise.all(page._e2eElements.map((elm) => elm.e2eRunActions()));
    if (page.isClosed()) {
      return;
    }
    await page.evaluate(() => {
      return new Promise((resolve3) => {
        requestAnimationFrame(() => {
          const promises = [];
          const waitComponentOnReady = (elm, promises2) => {
            if (elm != null) {
              if ("shadowRoot" in elm && elm.shadowRoot instanceof ShadowRoot) {
                waitComponentOnReady(elm.shadowRoot, promises2);
              }
              const children = elm.children;
              const len = children.length;
              for (let i = 0; i < len; i++) {
                const childElm = children[i];
                if (childElm != null) {
                  if (childElm.tagName.includes("-") && typeof childElm.componentOnReady === "function") {
                    promises2.push(childElm.componentOnReady());
                  }
                  waitComponentOnReady(childElm, promises2);
                }
              }
            }
          };
          waitComponentOnReady(document.documentElement, promises);
          Promise.all(promises).then(() => {
            resolve3();
          }).catch(() => {
            resolve3();
          });
        });
      });
    });
    if (page.isClosed()) {
      return;
    }
    await new Promise((r) => setTimeout(r, 100));
    await Promise.all(page._e2eElements.map((elm) => elm.e2eSync()));
  } catch (e) {
  }
}
function consoleMessage(c) {
  const msg = serializeConsoleMessage(c);
  const type = c.type();
  if (type === "debug") {
    return;
  }
  if (typeof console[type] === "function") {
    console[type](msg);
  } else {
    console.log(type, msg);
  }
}
function serializeConsoleMessage(c) {
  return `${c.text()} ${serializeLocation(c.location())}`;
}
function serializeLocation(loc) {
  let locStr = "";
  if (loc && loc.url) {
    locStr = `
Location: ${loc.url}`;
    if (loc.lineNumber) {
      locStr += `:${loc.lineNumber}`;
    }
    if (loc.columnNumber) {
      locStr += `:${loc.columnNumber}`;
    }
  }
  return locStr;
}

// src/testing/spec-page.ts
var import_app_data5 = _lazyRequire("@stencil/core/internal/app-data");
var import_testing4 = _lazyRequire("../internal/testing/index.js");

// src/compiler/app-core/app-data.ts
var getBuildFeatures = (cmps) => {
  const slot = cmps.some((c) => c.htmlTagNames.includes("slot"));
  const shadowDom = cmps.some((c) => c.encapsulation === "shadow");
  const slotRelocation = cmps.some((c) => c.encapsulation !== "shadow" && c.htmlTagNames.includes("slot"));
  const f = {
    allRenderFn: cmps.every((c) => c.hasRenderFn),
    formAssociated: cmps.some((c) => c.formAssociated),
    deserializer: cmps.some((c) => c.hasDeserializer),
    element: cmps.some((c) => c.hasElement),
    event: cmps.some((c) => c.hasEvent),
    hasRenderFn: cmps.some((c) => c.hasRenderFn),
    lifecycle: cmps.some((c) => c.hasLifecycle),
    asyncLoading: true,
    hostListener: cmps.some((c) => c.hasListener),
    hostListenerTargetWindow: cmps.some((c) => c.hasListenerTargetWindow),
    hostListenerTargetDocument: cmps.some((c) => c.hasListenerTargetDocument),
    hostListenerTargetBody: cmps.some((c) => c.hasListenerTargetBody),
    hostListenerTargetParent: cmps.some((c) => c.hasListenerTargetParent),
    hostListenerTarget: cmps.some((c) => c.hasListenerTarget),
    member: cmps.some((c) => c.hasMember),
    method: cmps.some((c) => c.hasMethod),
    mode: cmps.some((c) => c.hasMode),
    observeAttribute: cmps.some((c) => c.hasAttribute || c.hasWatchCallback || c.hasDeserializer),
    prop: cmps.some((c) => c.hasProp),
    propBoolean: cmps.some((c) => c.hasPropBoolean),
    propChangeCallback: cmps.some((c) => c.hasWatchCallback || c.hasDeserializer || c.hasSerializer),
    propNumber: cmps.some((c) => c.hasPropNumber),
    propString: cmps.some((c) => c.hasPropString),
    propMutable: cmps.some((c) => c.hasPropMutable),
    reflect: cmps.some((c) => c.hasReflect || c.hasSerializer),
    scoped: cmps.some((c) => c.encapsulation === "scoped"),
    serializer: cmps.some((c) => c.hasSerializer),
    shadowDom,
    shadowDelegatesFocus: shadowDom && cmps.some((c) => c.shadowDelegatesFocus),
    shadowSlotAssignmentManual: shadowDom && cmps.some((c) => c.slotAssignment === "manual"),
    slot,
    slotRelocation,
    state: cmps.some((c) => c.hasState),
    style: cmps.some((c) => c.hasStyle),
    svg: cmps.some((c) => c.htmlTagNames.includes("svg")),
    updatable: cmps.some((c) => c.isUpdateable),
    vdomAttribute: cmps.some((c) => c.hasVdomAttribute),
    vdomXlink: cmps.some((c) => c.hasVdomXlink),
    vdomClass: cmps.some((c) => c.hasVdomClass),
    vdomFunctional: cmps.some((c) => c.hasVdomFunctional),
    vdomKey: cmps.some((c) => c.hasVdomKey),
    vdomListener: cmps.some((c) => c.hasVdomListener),
    vdomPropOrAttr: cmps.some((c) => c.hasVdomPropOrAttr),
    vdomRef: cmps.some((c) => c.hasVdomRef),
    vdomRender: cmps.some((c) => c.hasVdomRender),
    vdomStyle: cmps.some((c) => c.hasVdomStyle),
    vdomText: cmps.some((c) => c.hasVdomText),
    taskQueue: true
  };
  f.vdomAttribute = f.vdomAttribute || f.reflect;
  f.vdomPropOrAttr = f.vdomPropOrAttr || f.reflect;
  return f;
};

// src/testing/spec-page.ts
var generateRandBundleId = () => Math.round(Math.random() * 899999) + 1e5;
async function newSpecPage(opts) {
  var _a2;
  if (opts == null) {
    throw new Error(`NewSpecPageOptions required`);
  }
  (0, import_testing4.resetPlatform)((_a2 = opts.platform) != null ? _a2 : {});
  resetBuildConditionals(import_app_data5.BUILD);
  if (Array.isArray(opts.components)) {
    (0, import_testing4.registerComponents)(opts.components);
  }
  if (opts.hydrateClientSide) {
    opts.includeAnnotations = true;
  }
  if (opts.hydrateServerSide) {
    opts.includeAnnotations = true;
    (0, import_testing4.setSupportsShadowDom)(false);
  } else {
    opts.includeAnnotations = !!opts.includeAnnotations;
    if (opts.supportsShadowDom === false) {
      (0, import_testing4.setSupportsShadowDom)(false);
    } else {
      (0, import_testing4.setSupportsShadowDom)(true);
    }
  }
  import_app_data5.BUILD.cssAnnotations = opts.includeAnnotations;
  const cmpTags = /* @__PURE__ */ new Set();
  import_testing4.win["__stencil_spec_options"] = opts;
  const doc = import_testing4.win.document;
  const page = {
    win: import_testing4.win,
    doc,
    body: doc.body,
    build: import_app_data5.BUILD,
    styles: import_testing4.styles,
    setContent: (html) => {
      doc.body.innerHTML = html;
      return (0, import_testing4.flushAll)();
    },
    waitForChanges: import_testing4.flushAll,
    flushLoadModule: import_testing4.flushLoadModule,
    flushQueue: import_testing4.flushQueue
  };
  const lazyBundles = opts.components.map((Cstr) => {
    if (Cstr.COMPILER_META == null) {
      const arbitraryBundleId = `fc.${generateRandBundleId()}`;
      return formatLazyBundleRuntimeMeta(arbitraryBundleId, []);
    }
    cmpTags.add(Cstr.COMPILER_META.tagName);
    Cstr.isProxied = false;
    proxyComponentLifeCycles(Cstr);
    const bundleId = `${Cstr.COMPILER_META.tagName}.${generateRandBundleId()}`;
    const stylesMeta = Cstr.COMPILER_META.styles;
    if (Array.isArray(stylesMeta)) {
      if (stylesMeta.length > 1) {
        const styles2 = {};
        stylesMeta.forEach((style) => {
          styles2[style.modeName] = style.styleStr;
        });
        Cstr.style = styles2;
      } else if (stylesMeta.length === 1) {
        Cstr.style = stylesMeta[0].styleStr;
      }
    }
    (0, import_testing4.registerModule)(bundleId, Cstr);
    const lazyBundleRuntimeMeta = formatLazyBundleRuntimeMeta(bundleId, [Cstr.COMPILER_META]);
    return lazyBundleRuntimeMeta;
  });
  const cmpCompilerMeta = opts.components.filter((Cstr) => Cstr.COMPILER_META != null).map((Cstr) => Cstr.COMPILER_META);
  const cmpBuild = getBuildFeatures(cmpCompilerMeta);
  if (opts.strictBuild) {
    Object.assign(import_app_data5.BUILD, cmpBuild);
  } else {
    Object.keys(cmpBuild).forEach((key) => {
      if (cmpBuild[key] === true) {
        import_app_data5.BUILD[key] = true;
      }
    });
  }
  import_app_data5.BUILD.asyncLoading = true;
  if (opts.hydrateClientSide) {
    import_app_data5.BUILD.hydrateClientSide = true;
    import_app_data5.BUILD.hydrateServerSide = false;
  } else if (opts.hydrateServerSide) {
    import_app_data5.BUILD.hydrateServerSide = true;
    import_app_data5.BUILD.hydrateClientSide = false;
  }
  import_app_data5.BUILD.cloneNodeFix = false;
  import_app_data5.BUILD.shadowDomShim = false;
  import_app_data5.BUILD.attachStyles = !!opts.attachStyles;
  if (typeof opts.url === "string") {
    page.win.location.href = opts.url;
  }
  if (typeof opts.direction === "string") {
    page.doc.documentElement.setAttribute("dir", opts.direction);
  }
  if (typeof opts.language === "string") {
    page.doc.documentElement.setAttribute("lang", opts.language);
  }
  if (typeof opts.cookie === "string") {
    try {
      page.doc.cookie = opts.cookie;
    } catch (e) {
    }
  }
  if (typeof opts.referrer === "string") {
    try {
      page.doc.referrer = opts.referrer;
    } catch (e) {
    }
  }
  if (typeof opts.userAgent === "string") {
    try {
      page.win.navigator.userAgent = opts.userAgent;
    } catch (e) {
    }
  }
  (0, import_testing4.bootstrapLazy)(lazyBundles);
  if (typeof opts.template === "function") {
    const cmpMeta = {
      $flags$: 0,
      $tagName$: "body"
    };
    const ref = {
      $ancestorComponent$: void 0,
      $flags$: 0,
      $modeName$: void 0,
      $cmpMeta$: cmpMeta,
      $hostElement$: page.body
    };
    (0, import_testing4.renderVdom)(ref, opts.template());
  } else if (typeof opts.html === "string") {
    page.body.innerHTML = opts.html;
  }
  if (opts.flushQueue !== false) {
    await page.waitForChanges();
  }
  let rootComponent = null;
  Object.defineProperty(page, "root", {
    get() {
      if (rootComponent == null) {
        rootComponent = findRootComponent(cmpTags, page.body);
      }
      if (rootComponent != null) {
        return rootComponent;
      }
      const firstElementChild = page.body.firstElementChild;
      if (firstElementChild != null) {
        return firstElementChild;
      }
      return null;
    }
  });
  Object.defineProperty(page, "rootInstance", {
    get() {
      const hostRef = (0, import_testing4.getHostRef)(page.root);
      if (hostRef != null) {
        return hostRef.$lazyInstance$;
      }
      return null;
    }
  });
  if (opts.hydrateServerSide) {
    (0, import_testing4.insertVdomAnnotations)(doc, []);
  }
  if (opts.autoApplyChanges) {
    (0, import_testing4.startAutoApplyChanges)();
    page.waitForChanges = () => {
      console.error('waitForChanges() cannot be used manually if the "startAutoApplyChanges" option is enabled');
      return Promise.resolve();
    };
  }
  return page;
}
function proxyComponentLifeCycles(Cstr) {
  var _a2, _b, _c, _d, _e, _f;
  if (typeof ((_a2 = Cstr.prototype) == null ? void 0 : _a2.__componentWillLoad) === "function") {
    Cstr.prototype.componentWillLoad = Cstr.prototype.__componentWillLoad;
    Cstr.prototype.__componentWillLoad = null;
  }
  if (typeof ((_b = Cstr.prototype) == null ? void 0 : _b.__componentWillUpdate) === "function") {
    Cstr.prototype.componentWillUpdate = Cstr.prototype.__componentWillUpdate;
    Cstr.prototype.__componentWillUpdate = null;
  }
  if (typeof ((_c = Cstr.prototype) == null ? void 0 : _c.__componentWillRender) === "function") {
    Cstr.prototype.componentWillRender = Cstr.prototype.__componentWillRender;
    Cstr.prototype.__componentWillRender = null;
  }
  if (typeof ((_d = Cstr.prototype) == null ? void 0 : _d.componentWillLoad) === "function") {
    Cstr.prototype.__componentWillLoad = Cstr.prototype.componentWillLoad;
    Cstr.prototype.componentWillLoad = function() {
      const result2 = this.__componentWillLoad();
      if (result2 != null && typeof result2.then === "function") {
        (0, import_testing4.writeTask)(() => result2);
      } else {
        (0, import_testing4.writeTask)(() => Promise.resolve());
      }
      return result2;
    };
  }
  if (typeof ((_e = Cstr.prototype) == null ? void 0 : _e.componentWillUpdate) === "function") {
    Cstr.prototype.__componentWillUpdate = Cstr.prototype.componentWillUpdate;
    Cstr.prototype.componentWillUpdate = function() {
      const result2 = this.__componentWillUpdate();
      if (result2 != null && typeof result2.then === "function") {
        (0, import_testing4.writeTask)(() => result2);
      } else {
        (0, import_testing4.writeTask)(() => Promise.resolve());
      }
      return result2;
    };
  }
  if (typeof ((_f = Cstr.prototype) == null ? void 0 : _f.componentWillRender) === "function") {
    Cstr.prototype.__componentWillRender = Cstr.prototype.componentWillRender;
    Cstr.prototype.componentWillRender = function() {
      const result2 = this.__componentWillRender();
      if (result2 != null && typeof result2.then === "function") {
        (0, import_testing4.writeTask)(() => result2);
      } else {
        (0, import_testing4.writeTask)(() => Promise.resolve());
      }
      return result2;
    };
  }
}
function findRootComponent(cmpTags, node) {
  if (node != null) {
    const children = node.children;
    const childrenLength = children.length;
    for (let i = 0; i < childrenLength; i++) {
      const elm = children[i];
      if (cmpTags.has(elm.nodeName.toLowerCase())) {
        return elm;
      }
    }
    for (let i = 0; i < childrenLength; i++) {
      const r = findRootComponent(cmpTags, children[i]);
      if (r != null) {
        return r;
      }
    }
  }
  return null;
}

// src/testing/testing.ts
var import_dev_server = _lazyRequire("../dev-server/index.js");

// src/testing/testing-utils.ts
var import_path27 = require("path");
function shuffleArray(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
function getAppScriptUrl(config, browserUrl) {
  const appFileName = `${config.fsNamespace}.esm.js`;
  return getAppUrl(config, browserUrl, appFileName);
}
function getAppStyleUrl(config, browserUrl) {
  if (config.globalStyle) {
    const appFileName = `${config.fsNamespace}.css`;
    return getAppUrl(config, browserUrl, appFileName);
  }
  return null;
}
function getAppUrl(config, browserUrl, appFileName) {
  const wwwOutput = config.outputTargets.find(isOutputTargetWww);
  if (wwwOutput && isString(wwwOutput.buildDir) && isString(wwwOutput.dir)) {
    const appBuildDir = wwwOutput.buildDir;
    const appFilePath = (0, import_path27.join)(appBuildDir, appFileName);
    const appUrlPath = (0, import_path27.relative)(wwwOutput.dir, appFilePath);
    const url = new URL(appUrlPath, browserUrl);
    return url.href;
  }
  const distOutput = config.outputTargets.find(isOutputTargetDistLazy);
  if (distOutput && isString(distOutput.esmDir)) {
    const appBuildDir = distOutput.esmDir;
    const appFilePath = (0, import_path27.join)(appBuildDir, appFileName);
    const appUrlPath = (0, import_path27.relative)(config.rootDir, appFilePath);
    const url = new URL(appUrlPath, browserUrl);
    return url.href;
  }
  return browserUrl;
}
function setupConsoleMocker() {
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  function teardownConsoleMocks() {
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;
  }
  afterAll(() => {
    teardownConsoleMocks();
  });
  function setupConsoleMocks() {
    const logMock = jest.fn();
    const warnMock = jest.fn();
    const errorMock = jest.fn();
    console.log = logMock;
    console.warn = warnMock;
    console.error = errorMock;
    return {
      logMock,
      warnMock,
      errorMock
    };
  }
  return { setupConsoleMocks, teardownConsoleMocks };
}

// src/testing/testing.ts
var createTesting = async (config) => {
  config = setupTestingConfig(config);
  const { createCompiler } = require("../compiler/stencil.js");
  const compiler = await createCompiler(config);
  let devServer;
  let puppeteerBrowser;
  const run = async (opts = {}) => {
    let doScreenshots = false;
    let passed = false;
    let env2;
    let compilerWatcher = null;
    const msg = [];
    try {
      if (!opts.spec && !opts.e2e) {
        config.logger.error(
          `Testing requires either the --spec or --e2e command line flags, or both. For example, to run unit tests, use the command: stencil test --spec`
        );
        return false;
      }
      env2 = process.env;
      if (opts.e2e) {
        msg.push("e2e");
        env2.__STENCIL_E2E_TESTS__ = "true";
      }
      if (opts.spec) {
        msg.push("spec");
        env2.__STENCIL_SPEC_TESTS__ = "true";
      }
      config.logger.info(config.logger.magenta(`testing ${msg.join(" and ")} files${config.watch ? " (watch)" : ""}`));
      doScreenshots = !!(opts.e2e && opts.screenshot);
      if (doScreenshots) {
        env2.__STENCIL_SCREENSHOT__ = "true";
        if (config.testing.screenshotTimeout != null) {
          env2.__STENCIL_SCREENSHOT_TIMEOUT_MS__ = config.testing.screenshotTimeout.toString();
        }
        if (opts.updateScreenshot) {
          config.logger.info(config.logger.magenta(`updating master screenshots`));
        } else {
          config.logger.info(config.logger.magenta(`comparing against master screenshots`));
        }
      }
      if (opts.e2e) {
        let buildTask = null;
        config.outputTargets.forEach((outputTarget) => {
          outputTarget.empty = false;
        });
        const doBuild = !(config.flags && config.flags.build === false);
        if (doBuild && config.watch) {
          compilerWatcher = await compiler.createWatcher();
        }
        if (doBuild) {
          if (compilerWatcher) {
            const watcher = compilerWatcher;
            buildTask = new Promise((resolve3) => {
              const removeListener = watcher.on("buildFinish", (buildResults) => {
                removeListener();
                resolve3(buildResults);
              });
            });
            watcher.start();
          } else {
            buildTask = compiler.build();
          }
        }
        config.devServer.openBrowser = false;
        config.devServer.gzip = false;
        config.devServer.reloadStrategy = null;
        const startupResults = await Promise.all([
          (0, import_dev_server.start)(config.devServer, config.logger),
          startPuppeteerBrowser(config)
        ]);
        devServer = startupResults[0];
        puppeteerBrowser = startupResults[1];
        if (buildTask) {
          const results = await buildTask;
          if (!results || !config.watch && hasError(results && results.diagnostics)) {
            await destroy();
            return false;
          }
        }
        if (devServer) {
          env2.__STENCIL_BROWSER_URL__ = devServer.browserUrl;
          config.logger.debug(`e2e dev server url: ${env2.__STENCIL_BROWSER_URL__}`);
          env2.__STENCIL_APP_SCRIPT_URL__ = getAppScriptUrl(config, devServer.browserUrl);
          config.logger.debug(`e2e app script url: ${env2.__STENCIL_APP_SCRIPT_URL__}`);
          const styleUrl = getAppStyleUrl(config, devServer.browserUrl);
          if (styleUrl) {
            env2.__STENCIL_APP_STYLE_URL__ = styleUrl;
            config.logger.debug(`e2e app style url: ${env2.__STENCIL_APP_STYLE_URL__}`);
          }
        }
      }
    } catch (e) {
      config.logger.error(e);
      return false;
    }
    try {
      if (doScreenshots) {
        const runJestScreenshot4 = getScreenshot();
        passed = await runJestScreenshot4(config, env2);
      } else {
        const runJest4 = getRunner();
        passed = await runJest4(config, env2);
      }
      config.logger.info("");
      if (compilerWatcher) {
        await compilerWatcher.close();
      }
    } catch (e) {
      config.logger.error(e);
    }
    return passed;
  };
  const destroy = async () => {
    const closingTime = [];
    if (config) {
      if (config.sys && config.sys.destroy) {
        closingTime.push(config.sys.destroy());
      }
      config = null;
    }
    if (devServer) {
      if (devServer.close) {
        closingTime.push(devServer.close());
      }
      devServer = null;
    }
    if (puppeteerBrowser) {
      if (puppeteerBrowser.close) {
        closingTime.push(puppeteerBrowser.close());
      }
      puppeteerBrowser = null;
    }
    await Promise.all(closingTime);
  };
  return {
    destroy,
    run
  };
};
function setupTestingConfig(validatedConfig) {
  validatedConfig.buildEs5 = false;
  validatedConfig.devMode = true;
  validatedConfig.minifyCss = false;
  validatedConfig.minifyJs = false;
  validatedConfig.hashFileNames = false;
  validatedConfig.validateTypes = false;
  validatedConfig._isTesting = true;
  validatedConfig.buildDist = true;
  validatedConfig.flags.serve = false;
  validatedConfig.flags.open = false;
  validatedConfig.outputTargets.forEach((o) => {
    if (o.type === "www") {
      o.serviceWorker = null;
    }
  });
  if (validatedConfig.flags.args.includes("--watchAll")) {
    validatedConfig.watch = true;
  }
  return validatedConfig;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MockHeaders,
  MockRequest,
  MockRequestInfo,
  MockRequestInit,
  MockResponse,
  MockResponseInit,
  createTesting,
  getCreateJestPuppeteerEnvironment,
  getCreateJestTestRunner,
  getJestPreprocessor,
  getJestPreset,
  getJestSetupTestFramework,
  mockBuildCtx,
  mockCompilerCtx,
  mockCompilerSystem,
  mockComponentMeta,
  mockConfig,
  mockDocument,
  mockFetch,
  mockLoadConfigInit,
  mockLogger,
  mockModule,
  mockValidatedConfig,
  mockWindow,
  newE2EPage,
  newSpecPage,
  setupConsoleMocker,
  shuffleArray,
  transpile
});
