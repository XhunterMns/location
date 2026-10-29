/*!
 Stencil CLI (CommonJS) v4.43.5 | MIT Licensed | https://stenciljs.com
 */
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
      var i = ai;
      if (ai >= 0 && bi > 0) {
        if (a === b) {
          return [ai, bi];
        }
        begs = [];
        left = str.length;
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
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
          var test = lte;
          var reverse = y < x;
          if (reverse) {
            incr *= -1;
            test = gte;
          }
          var pad = n.some(isPadded);
          N = [];
          for (var i = x; test(i, y); i += incr) {
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

// node_modules/kleur/index.js
var require_kleur = __commonJS({
  "node_modules/kleur/index.js"(exports2, module2) {
    "use strict";
    var { FORCE_COLOR, NODE_DISABLE_COLORS, TERM } = process.env;
    var $ = {
      enabled: !NODE_DISABLE_COLORS && TERM !== "dumb" && FORCE_COLOR !== "0",
      // modifiers
      reset: init(0, 0),
      bold: init(1, 22),
      dim: init(2, 22),
      italic: init(3, 23),
      underline: init(4, 24),
      inverse: init(7, 27),
      hidden: init(8, 28),
      strikethrough: init(9, 29),
      // colors
      black: init(30, 39),
      red: init(31, 39),
      green: init(32, 39),
      yellow: init(33, 39),
      blue: init(34, 39),
      magenta: init(35, 39),
      cyan: init(36, 39),
      white: init(37, 39),
      gray: init(90, 39),
      grey: init(90, 39),
      // background colors
      bgBlack: init(40, 49),
      bgRed: init(41, 49),
      bgGreen: init(42, 49),
      bgYellow: init(43, 49),
      bgBlue: init(44, 49),
      bgMagenta: init(45, 49),
      bgCyan: init(46, 49),
      bgWhite: init(47, 49)
    };
    function run2(arr, str) {
      let i = 0, tmp, beg = "", end = "";
      for (; i < arr.length; i++) {
        tmp = arr[i];
        beg += tmp.open;
        end += tmp.close;
        if (str.includes(tmp.close)) {
          str = str.replace(tmp.rgx, tmp.close + tmp.open);
        }
      }
      return beg + str + end;
    }
    function chain(has, keys) {
      let ctx = { has, keys };
      ctx.reset = $.reset.bind(ctx);
      ctx.bold = $.bold.bind(ctx);
      ctx.dim = $.dim.bind(ctx);
      ctx.italic = $.italic.bind(ctx);
      ctx.underline = $.underline.bind(ctx);
      ctx.inverse = $.inverse.bind(ctx);
      ctx.hidden = $.hidden.bind(ctx);
      ctx.strikethrough = $.strikethrough.bind(ctx);
      ctx.black = $.black.bind(ctx);
      ctx.red = $.red.bind(ctx);
      ctx.green = $.green.bind(ctx);
      ctx.yellow = $.yellow.bind(ctx);
      ctx.blue = $.blue.bind(ctx);
      ctx.magenta = $.magenta.bind(ctx);
      ctx.cyan = $.cyan.bind(ctx);
      ctx.white = $.white.bind(ctx);
      ctx.gray = $.gray.bind(ctx);
      ctx.grey = $.grey.bind(ctx);
      ctx.bgBlack = $.bgBlack.bind(ctx);
      ctx.bgRed = $.bgRed.bind(ctx);
      ctx.bgGreen = $.bgGreen.bind(ctx);
      ctx.bgYellow = $.bgYellow.bind(ctx);
      ctx.bgBlue = $.bgBlue.bind(ctx);
      ctx.bgMagenta = $.bgMagenta.bind(ctx);
      ctx.bgCyan = $.bgCyan.bind(ctx);
      ctx.bgWhite = $.bgWhite.bind(ctx);
      return ctx;
    }
    function init(open, close) {
      let blk = {
        open: `\x1B[${open}m`,
        close: `\x1B[${close}m`,
        rgx: new RegExp(`\\x1b\\[${close}m`, "g")
      };
      return function(txt) {
        if (this !== void 0 && this.has !== void 0) {
          this.has.includes(open) || (this.has.push(open), this.keys.push(blk));
          return txt === void 0 ? this : $.enabled ? run2(this.keys, txt + "") : txt + "";
        }
        return txt === void 0 ? chain([open], [blk]) : $.enabled ? run2([blk], txt + "") : txt + "";
      };
    }
    module2.exports = $;
  }
});

// node_modules/prompts/lib/util/action.js
var require_action = __commonJS({
  "node_modules/prompts/lib/util/action.js"(exports2, module2) {
    "use strict";
    module2.exports = (key, isSelect) => {
      if (key.meta && key.name !== "escape") return;
      if (key.ctrl) {
        if (key.name === "a") return "first";
        if (key.name === "c") return "abort";
        if (key.name === "d") return "abort";
        if (key.name === "e") return "last";
        if (key.name === "g") return "reset";
      }
      if (isSelect) {
        if (key.name === "j") return "down";
        if (key.name === "k") return "up";
      }
      if (key.name === "return") return "submit";
      if (key.name === "enter") return "submit";
      if (key.name === "backspace") return "delete";
      if (key.name === "delete") return "deleteForward";
      if (key.name === "abort") return "abort";
      if (key.name === "escape") return "exit";
      if (key.name === "tab") return "next";
      if (key.name === "pagedown") return "nextPage";
      if (key.name === "pageup") return "prevPage";
      if (key.name === "home") return "home";
      if (key.name === "end") return "end";
      if (key.name === "up") return "up";
      if (key.name === "down") return "down";
      if (key.name === "right") return "right";
      if (key.name === "left") return "left";
      return false;
    };
  }
});

// node_modules/prompts/lib/util/strip.js
var require_strip = __commonJS({
  "node_modules/prompts/lib/util/strip.js"(exports2, module2) {
    "use strict";
    module2.exports = (str) => {
      const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))"
      ].join("|");
      const RGX = new RegExp(pattern, "g");
      return typeof str === "string" ? str.replace(RGX, "") : str;
    };
  }
});

// node_modules/sisteransi/src/index.js
var require_src = __commonJS({
  "node_modules/sisteransi/src/index.js"(exports2, module2) {
    "use strict";
    var ESC = "\x1B";
    var CSI = `${ESC}[`;
    var beep = "\x07";
    var cursor = {
      to(x, y) {
        if (!y) return `${CSI}${x + 1}G`;
        return `${CSI}${y + 1};${x + 1}H`;
      },
      move(x, y) {
        let ret = "";
        if (x < 0) ret += `${CSI}${-x}D`;
        else if (x > 0) ret += `${CSI}${x}C`;
        if (y < 0) ret += `${CSI}${-y}A`;
        else if (y > 0) ret += `${CSI}${y}B`;
        return ret;
      },
      up: (count = 1) => `${CSI}${count}A`,
      down: (count = 1) => `${CSI}${count}B`,
      forward: (count = 1) => `${CSI}${count}C`,
      backward: (count = 1) => `${CSI}${count}D`,
      nextLine: (count = 1) => `${CSI}E`.repeat(count),
      prevLine: (count = 1) => `${CSI}F`.repeat(count),
      left: `${CSI}G`,
      hide: `${CSI}?25l`,
      show: `${CSI}?25h`,
      save: `${ESC}7`,
      restore: `${ESC}8`
    };
    var scroll = {
      up: (count = 1) => `${CSI}S`.repeat(count),
      down: (count = 1) => `${CSI}T`.repeat(count)
    };
    var erase = {
      screen: `${CSI}2J`,
      up: (count = 1) => `${CSI}1J`.repeat(count),
      down: (count = 1) => `${CSI}J`.repeat(count),
      line: `${CSI}2K`,
      lineEnd: `${CSI}K`,
      lineStart: `${CSI}1K`,
      lines(count) {
        let clear = "";
        for (let i = 0; i < count; i++)
          clear += this.line + (i < count - 1 ? cursor.up() : "");
        if (count)
          clear += cursor.left;
        return clear;
      }
    };
    module2.exports = { cursor, scroll, erase, beep };
  }
});

// node_modules/prompts/lib/util/clear.js
var require_clear = __commonJS({
  "node_modules/prompts/lib/util/clear.js"(exports2, module2) {
    "use strict";
    var strip = require_strip();
    var { erase, cursor } = require_src();
    var width = (str) => [...strip(str)].length;
    module2.exports = function(prompt, perLine) {
      if (!perLine) return erase.line + cursor.to(0);
      let rows = 0;
      const lines = prompt.split(/\r?\n/);
      for (let line of lines) {
        rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
      }
      return erase.lines(rows);
    };
  }
});

// node_modules/prompts/lib/util/figures.js
var require_figures = __commonJS({
  "node_modules/prompts/lib/util/figures.js"(exports2, module2) {
    "use strict";
    var main = {
      arrowUp: "\u2191",
      arrowDown: "\u2193",
      arrowLeft: "\u2190",
      arrowRight: "\u2192",
      radioOn: "\u25C9",
      radioOff: "\u25EF",
      tick: "\u2714",
      cross: "\u2716",
      ellipsis: "\u2026",
      pointerSmall: "\u203A",
      line: "\u2500",
      pointer: "\u276F"
    };
    var win2 = {
      arrowUp: main.arrowUp,
      arrowDown: main.arrowDown,
      arrowLeft: main.arrowLeft,
      arrowRight: main.arrowRight,
      radioOn: "(*)",
      radioOff: "( )",
      tick: "\u221A",
      cross: "\xD7",
      ellipsis: "...",
      pointerSmall: "\xBB",
      line: "\u2500",
      pointer: ">"
    };
    var figures = process.platform === "win32" ? win2 : main;
    module2.exports = figures;
  }
});

// node_modules/prompts/lib/util/style.js
var require_style = __commonJS({
  "node_modules/prompts/lib/util/style.js"(exports2, module2) {
    "use strict";
    var c = require_kleur();
    var figures = require_figures();
    var styles2 = Object.freeze({
      password: { scale: 1, render: (input) => "*".repeat(input.length) },
      emoji: { scale: 2, render: (input) => "\u{1F603}".repeat(input.length) },
      invisible: { scale: 0, render: (input) => "" },
      default: { scale: 1, render: (input) => `${input}` }
    });
    var render2 = (type) => styles2[type] || styles2.default;
    var symbols = Object.freeze({
      aborted: c.red(figures.cross),
      done: c.green(figures.tick),
      exited: c.yellow(figures.cross),
      default: c.cyan("?")
    });
    var symbol = (done, aborted, exited) => aborted ? symbols.aborted : exited ? symbols.exited : done ? symbols.done : symbols.default;
    var delimiter = (completing) => c.gray(completing ? figures.ellipsis : figures.pointerSmall);
    var item = (expandable, expanded) => c.gray(expandable ? expanded ? figures.pointerSmall : "+" : figures.line);
    module2.exports = {
      styles: styles2,
      render: render2,
      symbols,
      symbol,
      delimiter,
      item
    };
  }
});

// node_modules/prompts/lib/util/lines.js
var require_lines = __commonJS({
  "node_modules/prompts/lib/util/lines.js"(exports2, module2) {
    "use strict";
    var strip = require_strip();
    module2.exports = function(msg, perLine) {
      let lines = String(strip(msg) || "").split(/\r?\n/);
      if (!perLine) return lines.length;
      return lines.map((l) => Math.ceil(l.length / perLine)).reduce((a, b) => a + b);
    };
  }
});

// node_modules/prompts/lib/util/wrap.js
var require_wrap = __commonJS({
  "node_modules/prompts/lib/util/wrap.js"(exports2, module2) {
    "use strict";
    module2.exports = (msg, opts = {}) => {
      const tab = Number.isSafeInteger(parseInt(opts.margin)) ? new Array(parseInt(opts.margin)).fill(" ").join("") : opts.margin || "";
      const width = opts.width;
      return (msg || "").split(/\r?\n/g).map((line) => line.split(/\s+/g).reduce((arr, w) => {
        if (w.length + tab.length >= width || arr[arr.length - 1].length + w.length + 1 < width)
          arr[arr.length - 1] += ` ${w}`;
        else arr.push(`${tab}${w}`);
        return arr;
      }, [tab]).join("\n")).join("\n");
    };
  }
});

// node_modules/prompts/lib/util/entriesToDisplay.js
var require_entriesToDisplay = __commonJS({
  "node_modules/prompts/lib/util/entriesToDisplay.js"(exports2, module2) {
    "use strict";
    module2.exports = (cursor, total, maxVisible) => {
      maxVisible = maxVisible || total;
      let startIndex = Math.min(total - maxVisible, cursor - Math.floor(maxVisible / 2));
      if (startIndex < 0) startIndex = 0;
      let endIndex = Math.min(startIndex + maxVisible, total);
      return { startIndex, endIndex };
    };
  }
});

// node_modules/prompts/lib/util/index.js
var require_util = __commonJS({
  "node_modules/prompts/lib/util/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      action: require_action(),
      clear: require_clear(),
      style: require_style(),
      strip: require_strip(),
      figures: require_figures(),
      lines: require_lines(),
      wrap: require_wrap(),
      entriesToDisplay: require_entriesToDisplay()
    };
  }
});

// node_modules/prompts/lib/elements/prompt.js
var require_prompt = __commonJS({
  "node_modules/prompts/lib/elements/prompt.js"(exports2, module2) {
    "use strict";
    var readline = require("readline");
    var { action } = require_util();
    var EventEmitter = require("events");
    var { beep, cursor } = require_src();
    var color = require_kleur();
    var Prompt = class extends EventEmitter {
      constructor(opts = {}) {
        super();
        this.firstRender = true;
        this.in = opts.stdin || process.stdin;
        this.out = opts.stdout || process.stdout;
        this.onRender = (opts.onRender || (() => void 0)).bind(this);
        const rl = readline.createInterface({ input: this.in, escapeCodeTimeout: 50 });
        readline.emitKeypressEvents(this.in, rl);
        if (this.in.isTTY) this.in.setRawMode(true);
        const isSelect = ["SelectPrompt", "MultiselectPrompt"].indexOf(this.constructor.name) > -1;
        const keypress = (str, key) => {
          let a = action(key, isSelect);
          if (a === false) {
            this._ && this._(str, key);
          } else if (typeof this[a] === "function") {
            this[a](key);
          } else {
            this.bell();
          }
        };
        this.close = () => {
          this.out.write(cursor.show);
          this.in.removeListener("keypress", keypress);
          if (this.in.isTTY) this.in.setRawMode(false);
          rl.close();
          this.emit(this.aborted ? "abort" : this.exited ? "exit" : "submit", this.value);
          this.closed = true;
        };
        this.in.on("keypress", keypress);
      }
      fire() {
        this.emit("state", {
          value: this.value,
          aborted: !!this.aborted,
          exited: !!this.exited
        });
      }
      bell() {
        this.out.write(beep);
      }
      render() {
        this.onRender(color);
        if (this.firstRender) this.firstRender = false;
      }
    };
    module2.exports = Prompt;
  }
});

// node_modules/prompts/lib/elements/text.js
var require_text = __commonJS({
  "node_modules/prompts/lib/elements/text.js"(exports2, module2) {
    var color = require_kleur();
    var Prompt = require_prompt();
    var { erase, cursor } = require_src();
    var { style, clear, lines, figures } = require_util();
    var TextPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.transform = style.render(opts.style);
        this.scale = this.transform.scale;
        this.msg = opts.message;
        this.initial = opts.initial || ``;
        this.validator = opts.validate || (() => true);
        this.value = ``;
        this.errorMsg = opts.error || `Please Enter A Valid Value`;
        this.cursor = Number(!!this.initial);
        this.cursorOffset = 0;
        this.clear = clear(``, this.out.columns);
        this.render();
      }
      set value(v) {
        if (!v && this.initial) {
          this.placeholder = true;
          this.rendered = color.gray(this.transform.render(this.initial));
        } else {
          this.placeholder = false;
          this.rendered = this.transform.render(v);
        }
        this._value = v;
        this.fire();
      }
      get value() {
        return this._value;
      }
      reset() {
        this.value = ``;
        this.cursor = Number(!!this.initial);
        this.cursorOffset = 0;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.value = this.value || this.initial;
        this.done = this.aborted = true;
        this.error = false;
        this.red = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      async validate() {
        let valid = await this.validator(this.value);
        if (typeof valid === `string`) {
          this.errorMsg = valid;
          valid = false;
        }
        this.error = !valid;
      }
      async submit() {
        this.value = this.value || this.initial;
        this.cursorOffset = 0;
        this.cursor = this.rendered.length;
        await this.validate();
        if (this.error) {
          this.red = true;
          this.fire();
          this.render();
          return;
        }
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      next() {
        if (!this.placeholder) return this.bell();
        this.value = this.initial;
        this.cursor = this.rendered.length;
        this.fire();
        this.render();
      }
      moveCursor(n) {
        if (this.placeholder) return;
        this.cursor = this.cursor + n;
        this.cursorOffset += n;
      }
      _(c, key) {
        let s1 = this.value.slice(0, this.cursor);
        let s2 = this.value.slice(this.cursor);
        this.value = `${s1}${c}${s2}`;
        this.red = false;
        this.cursor = this.placeholder ? 0 : s1.length + 1;
        this.render();
      }
      delete() {
        if (this.isCursorAtStart()) return this.bell();
        let s1 = this.value.slice(0, this.cursor - 1);
        let s2 = this.value.slice(this.cursor);
        this.value = `${s1}${s2}`;
        this.red = false;
        if (this.isCursorAtStart()) {
          this.cursorOffset = 0;
        } else {
          this.cursorOffset++;
          this.moveCursor(-1);
        }
        this.render();
      }
      deleteForward() {
        if (this.cursor * this.scale >= this.rendered.length || this.placeholder) return this.bell();
        let s1 = this.value.slice(0, this.cursor);
        let s2 = this.value.slice(this.cursor + 1);
        this.value = `${s1}${s2}`;
        this.red = false;
        if (this.isCursorAtEnd()) {
          this.cursorOffset = 0;
        } else {
          this.cursorOffset++;
        }
        this.render();
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.value.length;
        this.render();
      }
      left() {
        if (this.cursor <= 0 || this.placeholder) return this.bell();
        this.moveCursor(-1);
        this.render();
      }
      right() {
        if (this.cursor * this.scale >= this.rendered.length || this.placeholder) return this.bell();
        this.moveCursor(1);
        this.render();
      }
      isCursorAtStart() {
        return this.cursor === 0 || this.placeholder && this.cursor === 1;
      }
      isCursorAtEnd() {
        return this.cursor === this.rendered.length || this.placeholder && this.cursor === this.rendered.length + 1;
      }
      render() {
        if (this.closed) return;
        if (!this.firstRender) {
          if (this.outputError)
            this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
          this.out.write(clear(this.outputText, this.out.columns));
        }
        super.render();
        this.outputError = "";
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          this.red ? color.red(this.rendered) : this.rendered
        ].join(` `);
        if (this.error) {
          this.outputError += this.errorMsg.split(`
`).reduce((a, l, i) => a + `
${i ? " " : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore + cursor.move(this.cursorOffset, 0));
      }
    };
    module2.exports = TextPrompt;
  }
});

// node_modules/prompts/lib/elements/select.js
var require_select = __commonJS({
  "node_modules/prompts/lib/elements/select.js"(exports2, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt();
    var { style, clear, figures, wrap, entriesToDisplay } = require_util();
    var { cursor } = require_src();
    var SelectPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.hint = opts.hint || "- Use arrow-keys. Return to submit.";
        this.warn = opts.warn || "- This option is disabled";
        this.cursor = opts.initial || 0;
        this.choices = opts.choices.map((ch, idx) => {
          if (typeof ch === "string")
            ch = { title: ch, value: idx };
          return {
            title: ch && (ch.title || ch.value || ch),
            value: ch && (ch.value === void 0 ? idx : ch.value),
            description: ch && ch.description,
            selected: ch && ch.selected,
            disabled: ch && ch.disabled
          };
        });
        this.optionsPerPage = opts.optionsPerPage || 10;
        this.value = (this.choices[this.cursor] || {}).value;
        this.clear = clear("", this.out.columns);
        this.render();
      }
      moveCursor(n) {
        this.cursor = n;
        this.value = this.choices[n].value;
        this.fire();
      }
      reset() {
        this.moveCursor(0);
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        if (!this.selection.disabled) {
          this.done = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        } else
          this.bell();
      }
      first() {
        this.moveCursor(0);
        this.render();
      }
      last() {
        this.moveCursor(this.choices.length - 1);
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.moveCursor(this.choices.length - 1);
        } else {
          this.moveCursor(this.cursor - 1);
        }
        this.render();
      }
      down() {
        if (this.cursor === this.choices.length - 1) {
          this.moveCursor(0);
        } else {
          this.moveCursor(this.cursor + 1);
        }
        this.render();
      }
      next() {
        this.moveCursor((this.cursor + 1) % this.choices.length);
        this.render();
      }
      _(c, key) {
        if (c === " ") return this.submit();
      }
      get selection() {
        return this.choices[this.cursor];
      }
      render() {
        if (this.closed) return;
        if (this.firstRender) this.out.write(cursor.hide);
        else this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        let { startIndex, endIndex } = entriesToDisplay(this.cursor, this.choices.length, this.optionsPerPage);
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.done ? this.selection.title : this.selection.disabled ? color.yellow(this.warn) : color.gray(this.hint)
        ].join(" ");
        if (!this.done) {
          this.outputText += "\n";
          for (let i = startIndex; i < endIndex; i++) {
            let title, prefix, desc = "", v = this.choices[i];
            if (i === startIndex && startIndex > 0) {
              prefix = figures.arrowUp;
            } else if (i === endIndex - 1 && endIndex < this.choices.length) {
              prefix = figures.arrowDown;
            } else {
              prefix = " ";
            }
            if (v.disabled) {
              title = this.cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
              prefix = (this.cursor === i ? color.bold().gray(figures.pointer) + " " : "  ") + prefix;
            } else {
              title = this.cursor === i ? color.cyan().underline(v.title) : v.title;
              prefix = (this.cursor === i ? color.cyan(figures.pointer) + " " : "  ") + prefix;
              if (v.description && this.cursor === i) {
                desc = ` - ${v.description}`;
                if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
                  desc = "\n" + wrap(v.description, { margin: 3, width: this.out.columns });
                }
              }
            }
            this.outputText += `${prefix} ${title}${color.gray(desc)}
`;
          }
        }
        this.out.write(this.outputText);
      }
    };
    module2.exports = SelectPrompt;
  }
});

// node_modules/prompts/lib/elements/toggle.js
var require_toggle = __commonJS({
  "node_modules/prompts/lib/elements/toggle.js"(exports2, module2) {
    var color = require_kleur();
    var Prompt = require_prompt();
    var { style, clear } = require_util();
    var { cursor, erase } = require_src();
    var TogglePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.value = !!opts.initial;
        this.active = opts.active || "on";
        this.inactive = opts.inactive || "off";
        this.initialValue = this.value;
        this.render();
      }
      reset() {
        this.value = this.initialValue;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      deactivate() {
        if (this.value === false) return this.bell();
        this.value = false;
        this.render();
      }
      activate() {
        if (this.value === true) return this.bell();
        this.value = true;
        this.render();
      }
      delete() {
        this.deactivate();
      }
      left() {
        this.deactivate();
      }
      right() {
        this.activate();
      }
      down() {
        this.deactivate();
      }
      up() {
        this.activate();
      }
      next() {
        this.value = !this.value;
        this.fire();
        this.render();
      }
      _(c, key) {
        if (c === " ") {
          this.value = !this.value;
        } else if (c === "1") {
          this.value = true;
        } else if (c === "0") {
          this.value = false;
        } else return this.bell();
        this.render();
      }
      render() {
        if (this.closed) return;
        if (this.firstRender) this.out.write(cursor.hide);
        else this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          this.value ? this.inactive : color.cyan().underline(this.inactive),
          color.gray("/"),
          this.value ? color.cyan().underline(this.active) : this.active
        ].join(" ");
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = TogglePrompt;
  }
});

// node_modules/prompts/lib/dateparts/datepart.js
var require_datepart = __commonJS({
  "node_modules/prompts/lib/dateparts/datepart.js"(exports2, module2) {
    "use strict";
    var DatePart = class _DatePart {
      constructor({ token, date, parts, locales }) {
        this.token = token;
        this.date = date || /* @__PURE__ */ new Date();
        this.parts = parts || [this];
        this.locales = locales || {};
      }
      up() {
      }
      down() {
      }
      next() {
        const currentIdx = this.parts.indexOf(this);
        return this.parts.find((part, idx) => idx > currentIdx && part instanceof _DatePart);
      }
      setTo(val) {
      }
      prev() {
        let parts = [].concat(this.parts).reverse();
        const currentIdx = parts.indexOf(this);
        return parts.find((part, idx) => idx > currentIdx && part instanceof _DatePart);
      }
      toString() {
        return String(this.date);
      }
    };
    module2.exports = DatePart;
  }
});

// node_modules/prompts/lib/dateparts/meridiem.js
var require_meridiem = __commonJS({
  "node_modules/prompts/lib/dateparts/meridiem.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Meridiem = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setHours((this.date.getHours() + 12) % 24);
      }
      down() {
        this.up();
      }
      toString() {
        let meridiem = this.date.getHours() > 12 ? "pm" : "am";
        return /\A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
      }
    };
    module2.exports = Meridiem;
  }
});

// node_modules/prompts/lib/dateparts/day.js
var require_day = __commonJS({
  "node_modules/prompts/lib/dateparts/day.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart();
    var pos = (n) => {
      n = n % 10;
      return n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
    };
    var Day = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setDate(this.date.getDate() + 1);
      }
      down() {
        this.date.setDate(this.date.getDate() - 1);
      }
      setTo(val) {
        this.date.setDate(parseInt(val.substr(-2)));
      }
      toString() {
        let date = this.date.getDate();
        let day = this.date.getDay();
        return this.token === "DD" ? String(date).padStart(2, "0") : this.token === "Do" ? date + pos(date) : this.token === "d" ? day + 1 : this.token === "ddd" ? this.locales.weekdaysShort[day] : this.token === "dddd" ? this.locales.weekdays[day] : date;
      }
    };
    module2.exports = Day;
  }
});

// node_modules/prompts/lib/dateparts/hours.js
var require_hours = __commonJS({
  "node_modules/prompts/lib/dateparts/hours.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Hours = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setHours(this.date.getHours() + 1);
      }
      down() {
        this.date.setHours(this.date.getHours() - 1);
      }
      setTo(val) {
        this.date.setHours(parseInt(val.substr(-2)));
      }
      toString() {
        let hours = this.date.getHours();
        if (/h/.test(this.token))
          hours = hours % 12 || 12;
        return this.token.length > 1 ? String(hours).padStart(2, "0") : hours;
      }
    };
    module2.exports = Hours;
  }
});

// node_modules/prompts/lib/dateparts/milliseconds.js
var require_milliseconds = __commonJS({
  "node_modules/prompts/lib/dateparts/milliseconds.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Milliseconds = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMilliseconds(this.date.getMilliseconds() + 1);
      }
      down() {
        this.date.setMilliseconds(this.date.getMilliseconds() - 1);
      }
      setTo(val) {
        this.date.setMilliseconds(parseInt(val.substr(-this.token.length)));
      }
      toString() {
        return String(this.date.getMilliseconds()).padStart(4, "0").substr(0, this.token.length);
      }
    };
    module2.exports = Milliseconds;
  }
});

// node_modules/prompts/lib/dateparts/minutes.js
var require_minutes = __commonJS({
  "node_modules/prompts/lib/dateparts/minutes.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Minutes = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMinutes(this.date.getMinutes() + 1);
      }
      down() {
        this.date.setMinutes(this.date.getMinutes() - 1);
      }
      setTo(val) {
        this.date.setMinutes(parseInt(val.substr(-2)));
      }
      toString() {
        let m = this.date.getMinutes();
        return this.token.length > 1 ? String(m).padStart(2, "0") : m;
      }
    };
    module2.exports = Minutes;
  }
});

// node_modules/prompts/lib/dateparts/month.js
var require_month = __commonJS({
  "node_modules/prompts/lib/dateparts/month.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Month = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMonth(this.date.getMonth() + 1);
      }
      down() {
        this.date.setMonth(this.date.getMonth() - 1);
      }
      setTo(val) {
        val = parseInt(val.substr(-2)) - 1;
        this.date.setMonth(val < 0 ? 0 : val);
      }
      toString() {
        let month = this.date.getMonth();
        let tl = this.token.length;
        return tl === 2 ? String(month + 1).padStart(2, "0") : tl === 3 ? this.locales.monthsShort[month] : tl === 4 ? this.locales.months[month] : String(month + 1);
      }
    };
    module2.exports = Month;
  }
});

// node_modules/prompts/lib/dateparts/seconds.js
var require_seconds = __commonJS({
  "node_modules/prompts/lib/dateparts/seconds.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Seconds = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setSeconds(this.date.getSeconds() + 1);
      }
      down() {
        this.date.setSeconds(this.date.getSeconds() - 1);
      }
      setTo(val) {
        this.date.setSeconds(parseInt(val.substr(-2)));
      }
      toString() {
        let s = this.date.getSeconds();
        return this.token.length > 1 ? String(s).padStart(2, "0") : s;
      }
    };
    module2.exports = Seconds;
  }
});

// node_modules/prompts/lib/dateparts/year.js
var require_year = __commonJS({
  "node_modules/prompts/lib/dateparts/year.js"(exports2, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Year = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setFullYear(this.date.getFullYear() + 1);
      }
      down() {
        this.date.setFullYear(this.date.getFullYear() - 1);
      }
      setTo(val) {
        this.date.setFullYear(val.substr(-4));
      }
      toString() {
        let year = String(this.date.getFullYear()).padStart(4, "0");
        return this.token.length === 2 ? year.substr(-2) : year;
      }
    };
    module2.exports = Year;
  }
});

// node_modules/prompts/lib/dateparts/index.js
var require_dateparts = __commonJS({
  "node_modules/prompts/lib/dateparts/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      DatePart: require_datepart(),
      Meridiem: require_meridiem(),
      Day: require_day(),
      Hours: require_hours(),
      Milliseconds: require_milliseconds(),
      Minutes: require_minutes(),
      Month: require_month(),
      Seconds: require_seconds(),
      Year: require_year()
    };
  }
});

// node_modules/prompts/lib/elements/date.js
var require_date = __commonJS({
  "node_modules/prompts/lib/elements/date.js"(exports2, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt();
    var { style, clear, figures } = require_util();
    var { erase, cursor } = require_src();
    var { DatePart, Meridiem, Day, Hours, Milliseconds, Minutes, Month, Seconds, Year } = require_dateparts();
    var regex = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
    var regexGroups = {
      1: ({ token }) => token.replace(/\\(.)/g, "$1"),
      2: (opts) => new Day(opts),
      // Day // TODO
      3: (opts) => new Month(opts),
      // Month
      4: (opts) => new Year(opts),
      // Year
      5: (opts) => new Meridiem(opts),
      // AM/PM // TODO (special)
      6: (opts) => new Hours(opts),
      // Hours
      7: (opts) => new Minutes(opts),
      // Minutes
      8: (opts) => new Seconds(opts),
      // Seconds
      9: (opts) => new Milliseconds(opts)
      // Fractional seconds
    };
    var dfltLocales = {
      months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
      monthsShort: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
      weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
      weekdaysShort: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",")
    };
    var DatePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.cursor = 0;
        this.typed = "";
        this.locales = Object.assign(dfltLocales, opts.locales);
        this._date = opts.initial || /* @__PURE__ */ new Date();
        this.errorMsg = opts.error || "Please Enter A Valid Value";
        this.validator = opts.validate || (() => true);
        this.mask = opts.mask || "YYYY-MM-DD HH:mm:ss";
        this.clear = clear("", this.out.columns);
        this.render();
      }
      get value() {
        return this.date;
      }
      get date() {
        return this._date;
      }
      set date(date) {
        if (date) this._date.setTime(date.getTime());
      }
      set mask(mask) {
        let result;
        this.parts = [];
        while (result = regex.exec(mask)) {
          let match2 = result.shift();
          let idx = result.findIndex((gr) => gr != null);
          this.parts.push(idx in regexGroups ? regexGroups[idx]({ token: result[idx] || match2, date: this.date, parts: this.parts, locales: this.locales }) : result[idx] || match2);
        }
        let parts = this.parts.reduce((arr, i) => {
          if (typeof i === "string" && typeof arr[arr.length - 1] === "string")
            arr[arr.length - 1] += i;
          else arr.push(i);
          return arr;
        }, []);
        this.parts.splice(0);
        this.parts.push(...parts);
        this.reset();
      }
      moveCursor(n) {
        this.typed = "";
        this.cursor = n;
        this.fire();
      }
      reset() {
        this.moveCursor(this.parts.findIndex((p) => p instanceof DatePart));
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.error = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      async validate() {
        let valid = await this.validator(this.value);
        if (typeof valid === "string") {
          this.errorMsg = valid;
          valid = false;
        }
        this.error = !valid;
      }
      async submit() {
        await this.validate();
        if (this.error) {
          this.color = "red";
          this.fire();
          this.render();
          return;
        }
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      up() {
        this.typed = "";
        this.parts[this.cursor].up();
        this.render();
      }
      down() {
        this.typed = "";
        this.parts[this.cursor].down();
        this.render();
      }
      left() {
        let prev = this.parts[this.cursor].prev();
        if (prev == null) return this.bell();
        this.moveCursor(this.parts.indexOf(prev));
        this.render();
      }
      right() {
        let next = this.parts[this.cursor].next();
        if (next == null) return this.bell();
        this.moveCursor(this.parts.indexOf(next));
        this.render();
      }
      next() {
        let next = this.parts[this.cursor].next();
        this.moveCursor(next ? this.parts.indexOf(next) : this.parts.findIndex((part) => part instanceof DatePart));
        this.render();
      }
      _(c) {
        if (/\d/.test(c)) {
          this.typed += c;
          this.parts[this.cursor].setTo(this.typed);
          this.render();
        }
      }
      render() {
        if (this.closed) return;
        if (this.firstRender) this.out.write(cursor.hide);
        else this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? color.cyan().underline(p.toString()) : p), []).join("")
        ].join(" ");
        if (this.error) {
          this.outputText += this.errorMsg.split("\n").reduce(
            (a, l, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`,
            ``
          );
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = DatePrompt;
  }
});

// node_modules/prompts/lib/elements/number.js
var require_number = __commonJS({
  "node_modules/prompts/lib/elements/number.js"(exports2, module2) {
    var color = require_kleur();
    var Prompt = require_prompt();
    var { cursor, erase } = require_src();
    var { style, figures, clear, lines } = require_util();
    var isNumber = /[0-9]/;
    var isDef2 = (any) => any !== void 0;
    var round = (number, precision) => {
      let factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    };
    var NumberPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.transform = style.render(opts.style);
        this.msg = opts.message;
        this.initial = isDef2(opts.initial) ? opts.initial : "";
        this.float = !!opts.float;
        this.round = opts.round || 2;
        this.inc = opts.increment || 1;
        this.min = isDef2(opts.min) ? opts.min : -Infinity;
        this.max = isDef2(opts.max) ? opts.max : Infinity;
        this.errorMsg = opts.error || `Please Enter A Valid Value`;
        this.validator = opts.validate || (() => true);
        this.color = `cyan`;
        this.value = ``;
        this.typed = ``;
        this.lastHit = 0;
        this.render();
      }
      set value(v) {
        if (!v && v !== 0) {
          this.placeholder = true;
          this.rendered = color.gray(this.transform.render(`${this.initial}`));
          this._value = ``;
        } else {
          this.placeholder = false;
          this.rendered = this.transform.render(`${round(v, this.round)}`);
          this._value = round(v, this.round);
        }
        this.fire();
      }
      get value() {
        return this._value;
      }
      parse(x) {
        return this.float ? parseFloat(x) : parseInt(x);
      }
      valid(c) {
        return c === `-` || c === `.` && this.float || isNumber.test(c);
      }
      reset() {
        this.typed = ``;
        this.value = ``;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        let x = this.value;
        this.value = x !== `` ? x : this.initial;
        this.done = this.aborted = true;
        this.error = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      }
      async validate() {
        let valid = await this.validator(this.value);
        if (typeof valid === `string`) {
          this.errorMsg = valid;
          valid = false;
        }
        this.error = !valid;
      }
      async submit() {
        await this.validate();
        if (this.error) {
          this.color = `red`;
          this.fire();
          this.render();
          return;
        }
        let x = this.value;
        this.value = x !== `` ? x : this.initial;
        this.done = true;
        this.aborted = false;
        this.error = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      }
      up() {
        this.typed = ``;
        if (this.value === "") {
          this.value = this.min - this.inc;
        }
        if (this.value >= this.max) return this.bell();
        this.value += this.inc;
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      down() {
        this.typed = ``;
        if (this.value === "") {
          this.value = this.min + this.inc;
        }
        if (this.value <= this.min) return this.bell();
        this.value -= this.inc;
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      delete() {
        let val = this.value.toString();
        if (val.length === 0) return this.bell();
        this.value = this.parse(val = val.slice(0, -1)) || ``;
        if (this.value !== "" && this.value < this.min) {
          this.value = this.min;
        }
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      next() {
        this.value = this.initial;
        this.fire();
        this.render();
      }
      _(c, key) {
        if (!this.valid(c)) return this.bell();
        const now = Date.now();
        if (now - this.lastHit > 1e3) this.typed = ``;
        this.typed += c;
        this.lastHit = now;
        this.color = `cyan`;
        if (c === `.`) return this.fire();
        this.value = Math.min(this.parse(this.typed), this.max);
        if (this.value > this.max) this.value = this.max;
        if (this.value < this.min) this.value = this.min;
        this.fire();
        this.render();
      }
      render() {
        if (this.closed) return;
        if (!this.firstRender) {
          if (this.outputError)
            this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
          this.out.write(clear(this.outputText, this.out.columns));
        }
        super.render();
        this.outputError = "";
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          !this.done || !this.done && !this.placeholder ? color[this.color]().underline(this.rendered) : this.rendered
        ].join(` `);
        if (this.error) {
          this.outputError += this.errorMsg.split(`
`).reduce((a, l, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore);
      }
    };
    module2.exports = NumberPrompt;
  }
});

// node_modules/prompts/lib/elements/multiselect.js
var require_multiselect = __commonJS({
  "node_modules/prompts/lib/elements/multiselect.js"(exports2, module2) {
    "use strict";
    var color = require_kleur();
    var { cursor } = require_src();
    var Prompt = require_prompt();
    var { clear, figures, style, wrap, entriesToDisplay } = require_util();
    var MultiselectPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.cursor = opts.cursor || 0;
        this.scrollIndex = opts.cursor || 0;
        this.hint = opts.hint || "";
        this.warn = opts.warn || "- This option is disabled -";
        this.minSelected = opts.min;
        this.showMinError = false;
        this.maxChoices = opts.max;
        this.instructions = opts.instructions;
        this.optionsPerPage = opts.optionsPerPage || 10;
        this.value = opts.choices.map((ch, idx) => {
          if (typeof ch === "string")
            ch = { title: ch, value: idx };
          return {
            title: ch && (ch.title || ch.value || ch),
            description: ch && ch.description,
            value: ch && (ch.value === void 0 ? idx : ch.value),
            selected: ch && ch.selected,
            disabled: ch && ch.disabled
          };
        });
        this.clear = clear("", this.out.columns);
        if (!opts.overrideRender) {
          this.render();
        }
      }
      reset() {
        this.value.map((v) => !v.selected);
        this.cursor = 0;
        this.fire();
        this.render();
      }
      selected() {
        return this.value.filter((v) => v.selected);
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        const selected = this.value.filter((e) => e.selected);
        if (this.minSelected && selected.length < this.minSelected) {
          this.showMinError = true;
          this.render();
        } else {
          this.done = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        }
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.value.length - 1;
        this.render();
      }
      next() {
        this.cursor = (this.cursor + 1) % this.value.length;
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.cursor = this.value.length - 1;
        } else {
          this.cursor--;
        }
        this.render();
      }
      down() {
        if (this.cursor === this.value.length - 1) {
          this.cursor = 0;
        } else {
          this.cursor++;
        }
        this.render();
      }
      left() {
        this.value[this.cursor].selected = false;
        this.render();
      }
      right() {
        if (this.value.filter((e) => e.selected).length >= this.maxChoices) return this.bell();
        this.value[this.cursor].selected = true;
        this.render();
      }
      handleSpaceToggle() {
        const v = this.value[this.cursor];
        if (v.selected) {
          v.selected = false;
          this.render();
        } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
          return this.bell();
        } else {
          v.selected = true;
          this.render();
        }
      }
      toggleAll() {
        if (this.maxChoices !== void 0 || this.value[this.cursor].disabled) {
          return this.bell();
        }
        const newSelected = !this.value[this.cursor].selected;
        this.value.filter((v) => !v.disabled).forEach((v) => v.selected = newSelected);
        this.render();
      }
      _(c, key) {
        if (c === " ") {
          this.handleSpaceToggle();
        } else if (c === "a") {
          this.toggleAll();
        } else {
          return this.bell();
        }
      }
      renderInstructions() {
        if (this.instructions === void 0 || this.instructions) {
          if (typeof this.instructions === "string") {
            return this.instructions;
          }
          return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
` + (this.maxChoices === void 0 ? `    a: Toggle all
` : "") + `    enter/return: Complete answer`;
        }
        return "";
      }
      renderOption(cursor2, v, i, arrowIndicator) {
        const prefix = (v.selected ? color.green(figures.radioOn) : figures.radioOff) + " " + arrowIndicator + " ";
        let title, desc;
        if (v.disabled) {
          title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
        } else {
          title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
          if (cursor2 === i && v.description) {
            desc = ` - ${v.description}`;
            if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
              desc = "\n" + wrap(v.description, { margin: prefix.length, width: this.out.columns });
            }
          }
        }
        return prefix + title + color.gray(desc || "");
      }
      // shared with autocompleteMultiselect
      paginateOptions(options) {
        if (options.length === 0) {
          return color.red("No matches for this query.");
        }
        let { startIndex, endIndex } = entriesToDisplay(this.cursor, options.length, this.optionsPerPage);
        let prefix, styledOptions = [];
        for (let i = startIndex; i < endIndex; i++) {
          if (i === startIndex && startIndex > 0) {
            prefix = figures.arrowUp;
          } else if (i === endIndex - 1 && endIndex < options.length) {
            prefix = figures.arrowDown;
          } else {
            prefix = " ";
          }
          styledOptions.push(this.renderOption(this.cursor, options[i], i, prefix));
        }
        return "\n" + styledOptions.join("\n");
      }
      // shared with autocomleteMultiselect
      renderOptions(options) {
        if (!this.done) {
          return this.paginateOptions(options);
        }
        return "";
      }
      renderDoneOrInstructions() {
        if (this.done) {
          return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
        }
        const output = [color.gray(this.hint), this.renderInstructions()];
        if (this.value[this.cursor].disabled) {
          output.push(color.yellow(this.warn));
        }
        return output.join(" ");
      }
      render() {
        if (this.closed) return;
        if (this.firstRender) this.out.write(cursor.hide);
        super.render();
        let prompt = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.renderDoneOrInstructions()
        ].join(" ");
        if (this.showMinError) {
          prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
          this.showMinError = false;
        }
        prompt += this.renderOptions(this.value);
        this.out.write(this.clear + prompt);
        this.clear = clear(prompt, this.out.columns);
      }
    };
    module2.exports = MultiselectPrompt;
  }
});

// node_modules/prompts/lib/elements/autocomplete.js
var require_autocomplete = __commonJS({
  "node_modules/prompts/lib/elements/autocomplete.js"(exports2, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt();
    var { erase, cursor } = require_src();
    var { style, clear, figures, wrap, entriesToDisplay } = require_util();
    var getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);
    var getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);
    var getIndex = (arr, valOrTitle) => {
      const index = arr.findIndex((el) => el.value === valOrTitle || el.title === valOrTitle);
      return index > -1 ? index : void 0;
    };
    var AutocompletePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.suggest = opts.suggest;
        this.choices = opts.choices;
        this.initial = typeof opts.initial === "number" ? opts.initial : getIndex(opts.choices, opts.initial);
        this.select = this.initial || opts.cursor || 0;
        this.i18n = { noMatches: opts.noMatches || "no matches found" };
        this.fallback = opts.fallback || this.initial;
        this.clearFirst = opts.clearFirst || false;
        this.suggestions = [];
        this.input = "";
        this.limit = opts.limit || 10;
        this.cursor = 0;
        this.transform = style.render(opts.style);
        this.scale = this.transform.scale;
        this.render = this.render.bind(this);
        this.complete = this.complete.bind(this);
        this.clear = clear("", this.out.columns);
        this.complete(this.render);
        this.render();
      }
      set fallback(fb) {
        this._fb = Number.isSafeInteger(parseInt(fb)) ? parseInt(fb) : fb;
      }
      get fallback() {
        let choice;
        if (typeof this._fb === "number")
          choice = this.choices[this._fb];
        else if (typeof this._fb === "string")
          choice = { title: this._fb };
        return choice || this._fb || { title: this.i18n.noMatches };
      }
      moveSelect(i) {
        this.select = i;
        if (this.suggestions.length > 0)
          this.value = getVal(this.suggestions, i);
        else this.value = this.fallback.value;
        this.fire();
      }
      async complete(cb) {
        const p = this.completing = this.suggest(this.input, this.choices);
        const suggestions = await p;
        if (this.completing !== p) return;
        this.suggestions = suggestions.map((s, i, arr) => ({ title: getTitle(arr, i), value: getVal(arr, i), description: s.description }));
        this.completing = false;
        const l = Math.max(suggestions.length - 1, 0);
        this.moveSelect(Math.min(l, this.select));
        cb && cb();
      }
      reset() {
        this.input = "";
        this.complete(() => {
          this.moveSelect(this.initial !== void 0 ? this.initial : 0);
          this.render();
        });
        this.render();
      }
      exit() {
        if (this.clearFirst && this.input.length > 0) {
          this.reset();
        } else {
          this.done = this.exited = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        }
      }
      abort() {
        this.done = this.aborted = true;
        this.exited = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.done = true;
        this.aborted = this.exited = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      _(c, key) {
        let s1 = this.input.slice(0, this.cursor);
        let s2 = this.input.slice(this.cursor);
        this.input = `${s1}${c}${s2}`;
        this.cursor = s1.length + 1;
        this.complete(this.render);
        this.render();
      }
      delete() {
        if (this.cursor === 0) return this.bell();
        let s1 = this.input.slice(0, this.cursor - 1);
        let s2 = this.input.slice(this.cursor);
        this.input = `${s1}${s2}`;
        this.complete(this.render);
        this.cursor = this.cursor - 1;
        this.render();
      }
      deleteForward() {
        if (this.cursor * this.scale >= this.rendered.length) return this.bell();
        let s1 = this.input.slice(0, this.cursor);
        let s2 = this.input.slice(this.cursor + 1);
        this.input = `${s1}${s2}`;
        this.complete(this.render);
        this.render();
      }
      first() {
        this.moveSelect(0);
        this.render();
      }
      last() {
        this.moveSelect(this.suggestions.length - 1);
        this.render();
      }
      up() {
        if (this.select === 0) {
          this.moveSelect(this.suggestions.length - 1);
        } else {
          this.moveSelect(this.select - 1);
        }
        this.render();
      }
      down() {
        if (this.select === this.suggestions.length - 1) {
          this.moveSelect(0);
        } else {
          this.moveSelect(this.select + 1);
        }
        this.render();
      }
      next() {
        if (this.select === this.suggestions.length - 1) {
          this.moveSelect(0);
        } else this.moveSelect(this.select + 1);
        this.render();
      }
      nextPage() {
        this.moveSelect(Math.min(this.select + this.limit, this.suggestions.length - 1));
        this.render();
      }
      prevPage() {
        this.moveSelect(Math.max(this.select - this.limit, 0));
        this.render();
      }
      left() {
        if (this.cursor <= 0) return this.bell();
        this.cursor = this.cursor - 1;
        this.render();
      }
      right() {
        if (this.cursor * this.scale >= this.rendered.length) return this.bell();
        this.cursor = this.cursor + 1;
        this.render();
      }
      renderOption(v, hovered, isStart, isEnd) {
        let desc;
        let prefix = isStart ? figures.arrowUp : isEnd ? figures.arrowDown : " ";
        let title = hovered ? color.cyan().underline(v.title) : v.title;
        prefix = (hovered ? color.cyan(figures.pointer) + " " : "  ") + prefix;
        if (v.description) {
          desc = ` - ${v.description}`;
          if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
            desc = "\n" + wrap(v.description, { margin: 3, width: this.out.columns });
          }
        }
        return prefix + " " + title + color.gray(desc || "");
      }
      render() {
        if (this.closed) return;
        if (this.firstRender) this.out.write(cursor.hide);
        else this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        let { startIndex, endIndex } = entriesToDisplay(this.select, this.choices.length, this.limit);
        this.outputText = [
          style.symbol(this.done, this.aborted, this.exited),
          color.bold(this.msg),
          style.delimiter(this.completing),
          this.done && this.suggestions[this.select] ? this.suggestions[this.select].title : this.rendered = this.transform.render(this.input)
        ].join(" ");
        if (!this.done) {
          const suggestions = this.suggestions.slice(startIndex, endIndex).map((item, i) => this.renderOption(
            item,
            this.select === i + startIndex,
            i === 0 && startIndex > 0,
            i + startIndex === endIndex - 1 && endIndex < this.choices.length
          )).join("\n");
          this.outputText += `
` + (suggestions || color.gray(this.fallback.title));
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = AutocompletePrompt;
  }
});

// node_modules/prompts/lib/elements/autocompleteMultiselect.js
var require_autocompleteMultiselect = __commonJS({
  "node_modules/prompts/lib/elements/autocompleteMultiselect.js"(exports2, module2) {
    "use strict";
    var color = require_kleur();
    var { cursor } = require_src();
    var MultiselectPrompt = require_multiselect();
    var { clear, style, figures } = require_util();
    var AutocompleteMultiselectPrompt = class extends MultiselectPrompt {
      constructor(opts = {}) {
        opts.overrideRender = true;
        super(opts);
        this.inputValue = "";
        this.clear = clear("", this.out.columns);
        this.filteredOptions = this.value;
        this.render();
      }
      last() {
        this.cursor = this.filteredOptions.length - 1;
        this.render();
      }
      next() {
        this.cursor = (this.cursor + 1) % this.filteredOptions.length;
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.cursor = this.filteredOptions.length - 1;
        } else {
          this.cursor--;
        }
        this.render();
      }
      down() {
        if (this.cursor === this.filteredOptions.length - 1) {
          this.cursor = 0;
        } else {
          this.cursor++;
        }
        this.render();
      }
      left() {
        this.filteredOptions[this.cursor].selected = false;
        this.render();
      }
      right() {
        if (this.value.filter((e) => e.selected).length >= this.maxChoices) return this.bell();
        this.filteredOptions[this.cursor].selected = true;
        this.render();
      }
      delete() {
        if (this.inputValue.length) {
          this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
          this.updateFilteredOptions();
        }
      }
      updateFilteredOptions() {
        const currentHighlight = this.filteredOptions[this.cursor];
        this.filteredOptions = this.value.filter((v) => {
          if (this.inputValue) {
            if (typeof v.title === "string") {
              if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
                return true;
              }
            }
            if (typeof v.value === "string") {
              if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
                return true;
              }
            }
            return false;
          }
          return true;
        });
        const newHighlightIndex = this.filteredOptions.findIndex((v) => v === currentHighlight);
        this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
        this.render();
      }
      handleSpaceToggle() {
        const v = this.filteredOptions[this.cursor];
        if (v.selected) {
          v.selected = false;
          this.render();
        } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
          return this.bell();
        } else {
          v.selected = true;
          this.render();
        }
      }
      handleInputChange(c) {
        this.inputValue = this.inputValue + c;
        this.updateFilteredOptions();
      }
      _(c, key) {
        if (c === " ") {
          this.handleSpaceToggle();
        } else {
          this.handleInputChange(c);
        }
      }
      renderInstructions() {
        if (this.instructions === void 0 || this.instructions) {
          if (typeof this.instructions === "string") {
            return this.instructions;
          }
          return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
`;
        }
        return "";
      }
      renderCurrentInput() {
        return `
Filtered results for: ${this.inputValue ? this.inputValue : color.gray("Enter something to filter")}
`;
      }
      renderOption(cursor2, v, i) {
        let title;
        if (v.disabled) title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
        else title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
        return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + "  " + title;
      }
      renderDoneOrInstructions() {
        if (this.done) {
          return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
        }
        const output = [color.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];
        if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
          output.push(color.yellow(this.warn));
        }
        return output.join(" ");
      }
      render() {
        if (this.closed) return;
        if (this.firstRender) this.out.write(cursor.hide);
        super.render();
        let prompt = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.renderDoneOrInstructions()
        ].join(" ");
        if (this.showMinError) {
          prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
          this.showMinError = false;
        }
        prompt += this.renderOptions(this.filteredOptions);
        this.out.write(this.clear + prompt);
        this.clear = clear(prompt, this.out.columns);
      }
    };
    module2.exports = AutocompleteMultiselectPrompt;
  }
});

// node_modules/prompts/lib/elements/confirm.js
var require_confirm = __commonJS({
  "node_modules/prompts/lib/elements/confirm.js"(exports2, module2) {
    var color = require_kleur();
    var Prompt = require_prompt();
    var { style, clear } = require_util();
    var { erase, cursor } = require_src();
    var ConfirmPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.value = opts.initial;
        this.initialValue = !!opts.initial;
        this.yesMsg = opts.yes || "yes";
        this.yesOption = opts.yesOption || "(Y/n)";
        this.noMsg = opts.no || "no";
        this.noOption = opts.noOption || "(y/N)";
        this.render();
      }
      reset() {
        this.value = this.initialValue;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.value = this.value || false;
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      _(c, key) {
        if (c.toLowerCase() === "y") {
          this.value = true;
          return this.submit();
        }
        if (c.toLowerCase() === "n") {
          this.value = false;
          return this.submit();
        }
        return this.bell();
      }
      render() {
        if (this.closed) return;
        if (this.firstRender) this.out.write(cursor.hide);
        else this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          this.done ? this.value ? this.yesMsg : this.noMsg : color.gray(this.initialValue ? this.yesOption : this.noOption)
        ].join(" ");
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = ConfirmPrompt;
  }
});

// node_modules/prompts/lib/elements/index.js
var require_elements = __commonJS({
  "node_modules/prompts/lib/elements/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      TextPrompt: require_text(),
      SelectPrompt: require_select(),
      TogglePrompt: require_toggle(),
      DatePrompt: require_date(),
      NumberPrompt: require_number(),
      MultiselectPrompt: require_multiselect(),
      AutocompletePrompt: require_autocomplete(),
      AutocompleteMultiselectPrompt: require_autocompleteMultiselect(),
      ConfirmPrompt: require_confirm()
    };
  }
});

// node_modules/prompts/lib/prompts.js
var require_prompts = __commonJS({
  "node_modules/prompts/lib/prompts.js"(exports2) {
    "use strict";
    var $ = exports2;
    var el = require_elements();
    var noop = (v) => v;
    function toPrompt(type, args, opts = {}) {
      return new Promise((res, rej) => {
        const p = new el[type](args);
        const onAbort = opts.onAbort || noop;
        const onSubmit = opts.onSubmit || noop;
        const onExit = opts.onExit || noop;
        p.on("state", args.onState || noop);
        p.on("submit", (x) => res(onSubmit(x)));
        p.on("exit", (x) => res(onExit(x)));
        p.on("abort", (x) => rej(onAbort(x)));
      });
    }
    $.text = (args) => toPrompt("TextPrompt", args);
    $.password = (args) => {
      args.style = "password";
      return $.text(args);
    };
    $.invisible = (args) => {
      args.style = "invisible";
      return $.text(args);
    };
    $.number = (args) => toPrompt("NumberPrompt", args);
    $.date = (args) => toPrompt("DatePrompt", args);
    $.confirm = (args) => toPrompt("ConfirmPrompt", args);
    $.list = (args) => {
      const sep2 = args.separator || ",";
      return toPrompt("TextPrompt", args, {
        onSubmit: (str) => str.split(sep2).map((s) => s.trim())
      });
    };
    $.toggle = (args) => toPrompt("TogglePrompt", args);
    $.select = (args) => toPrompt("SelectPrompt", args);
    $.multiselect = (args) => {
      args.choices = [].concat(args.choices || []);
      const toSelected = (items) => items.filter((item) => item.selected).map((item) => item.value);
      return toPrompt("MultiselectPrompt", args, {
        onAbort: toSelected,
        onSubmit: toSelected
      });
    };
    $.autocompleteMultiselect = (args) => {
      args.choices = [].concat(args.choices || []);
      const toSelected = (items) => items.filter((item) => item.selected).map((item) => item.value);
      return toPrompt("AutocompleteMultiselectPrompt", args, {
        onAbort: toSelected,
        onSubmit: toSelected
      });
    };
    var byTitle = (input, choices) => Promise.resolve(
      choices.filter((item) => item.title.slice(0, input.length).toLowerCase() === input.toLowerCase())
    );
    $.autocomplete = (args) => {
      args.suggest = args.suggest || byTitle;
      args.choices = [].concat(args.choices || []);
      return toPrompt("AutocompletePrompt", args);
    };
  }
});

// node_modules/prompts/lib/index.js
var require_lib = __commonJS({
  "node_modules/prompts/lib/index.js"(exports2, module2) {
    "use strict";
    var prompts = require_prompts();
    var passOn = ["suggest", "format", "onState", "validate", "onRender", "type"];
    var noop = () => {
    };
    async function prompt(questions = [], { onSubmit = noop, onCancel = noop } = {}) {
      const answers = {};
      const override2 = prompt._override || {};
      questions = [].concat(questions);
      let answer, question, quit, name, type, lastPrompt;
      const getFormattedAnswer = async (question2, answer2, skipValidation = false) => {
        if (!skipValidation && question2.validate && question2.validate(answer2) !== true) {
          return;
        }
        return question2.format ? await question2.format(answer2, answers) : answer2;
      };
      for (question of questions) {
        ({ name, type } = question);
        if (typeof type === "function") {
          type = await type(answer, { ...answers }, question);
          question["type"] = type;
        }
        if (!type) continue;
        for (let key in question) {
          if (passOn.includes(key)) continue;
          let value = question[key];
          question[key] = typeof value === "function" ? await value(answer, { ...answers }, lastPrompt) : value;
        }
        lastPrompt = question;
        if (typeof question.message !== "string") {
          throw new Error("prompt message is required");
        }
        ({ name, type } = question);
        if (prompts[type] === void 0) {
          throw new Error(`prompt type (${type}) is not defined`);
        }
        if (override2[question.name] !== void 0) {
          answer = await getFormattedAnswer(question, override2[question.name]);
          if (answer !== void 0) {
            answers[name] = answer;
            continue;
          }
        }
        try {
          answer = prompt._injected ? getInjectedAnswer(prompt._injected, question.initial) : await prompts[type](question);
          answers[name] = answer = await getFormattedAnswer(question, answer, true);
          quit = await onSubmit(question, answer, answers);
        } catch (err2) {
          quit = !await onCancel(question, answers);
        }
        if (quit) return answers;
      }
      return answers;
    }
    function getInjectedAnswer(injected, deafultValue) {
      const answer = injected.shift();
      if (answer instanceof Error) {
        throw answer;
      }
      return answer === void 0 ? deafultValue : answer;
    }
    function inject(answers) {
      prompt._injected = (prompt._injected || []).concat(answers);
    }
    function override(answers) {
      prompt._override = Object.assign({}, answers);
    }
    module2.exports = Object.assign(prompt, { prompt, prompts, inject, override });
  }
});

// src/cli/index.ts
var index_exports = {};
__export(index_exports, {
  BOOLEAN_CLI_FLAGS: () => BOOLEAN_CLI_FLAGS,
  parseFlags: () => parseFlags,
  run: () => run,
  runTask: () => runTask
});
module.exports = __toCommonJS(index_exports);

// src/cli/config-flags.ts
var BOOLEAN_CLI_FLAGS = [
  "build",
  "cache",
  "checkVersion",
  "ci",
  "compare",
  "debug",
  "dev",
  "devtools",
  "docs",
  // @deprecated - integrated testing will be removed in Stencil v5. See https://github.com/stenciljs/core/issues/6584.
  "e2e",
  "es5",
  "esm",
  "help",
  "log",
  "open",
  "prerender",
  "prerenderExternal",
  "prod",
  "profile",
  "serviceWorker",
  // @deprecated - screenshot testing will be removed in Stencil v5. See https://github.com/stenciljs/core/issues/6584.
  "screenshot",
  "serve",
  "skipNodeCheck",
  // @deprecated - integrated testing will be removed in Stencil v5. See https://github.com/stenciljs/core/issues/6584.
  "spec",
  "ssr",
  // @deprecated - screenshot testing will be removed in Stencil v5. See https://github.com/stenciljs/core/issues/6584.
  "updateScreenshot",
  "verbose",
  "version",
  "watch",
  // @deprecated - all JEST CLI options below are only used by integrated testing, which will be removed in Stencil v5.
  // See https://github.com/stenciljs/core/issues/6584.
  // JEST CLI OPTIONS
  "all",
  "automock",
  "bail",
  // 'cache', Stencil already supports this argument
  "changedFilesWithAncestor",
  // 'ci', Stencil already supports this argument
  "clearCache",
  "clearMocks",
  "collectCoverage",
  "color",
  "colors",
  "coverage",
  // 'debug', Stencil already supports this argument
  "detectLeaks",
  "detectOpenHandles",
  "errorOnDeprecated",
  "expand",
  "findRelatedTests",
  "forceExit",
  "init",
  "injectGlobals",
  "json",
  "lastCommit",
  "listTests",
  "logHeapUsage",
  "noStackTrace",
  "notify",
  "onlyChanged",
  "onlyFailures",
  "passWithNoTests",
  "resetMocks",
  "resetModules",
  "restoreMocks",
  "runInBand",
  "runTestsByPath",
  "showConfig",
  "silent",
  "skipFilter",
  "testLocationInResults",
  "updateSnapshot",
  "useStderr",
  // 'verbose', Stencil already supports this argument
  // 'version', Stencil already supports this argument
  // 'watch', Stencil already supports this argument
  "watchAll",
  "watchman"
];
var NUMBER_CLI_FLAGS = [
  "port",
  // @deprecated - all JEST CLI args below are only used by integrated testing, which will be removed in Stencil v5.
  // See https://github.com/stenciljs/core/issues/6584.
  // JEST CLI ARGS
  "maxConcurrency",
  "testTimeout"
];
var STRING_CLI_FLAGS = [
  "address",
  "config",
  "docsApi",
  "docsJson",
  "emulate",
  "root",
  // @deprecated - screenshot testing will be removed in Stencil v5. See https://github.com/stenciljs/core/issues/6584.
  "screenshotConnector",
  // @deprecated - all JEST CLI args below are only used by integrated testing, which will be removed in Stencil v5.
  // See https://github.com/stenciljs/core/issues/6584.
  // JEST CLI ARGS
  "cacheDirectory",
  "changedSince",
  "collectCoverageFrom",
  // 'config', Stencil already supports this argument
  "coverageDirectory",
  "coverageThreshold",
  "env",
  "filter",
  "globalSetup",
  "globalTeardown",
  "globals",
  "haste",
  "moduleNameMapper",
  "notifyMode",
  "outputFile",
  "preset",
  "prettierPath",
  "resolver",
  "rootDir",
  "runner",
  "testEnvironment",
  "testEnvironmentOptions",
  "testFailureExitCode",
  "testNamePattern",
  "testResultsProcessor",
  "testRunner",
  "testSequencer",
  "testURL",
  "timers",
  "transform"
];
var STRING_ARRAY_CLI_FLAGS = [
  "collectCoverageOnlyFrom",
  "coveragePathIgnorePatterns",
  "coverageReporters",
  "moduleDirectories",
  "moduleFileExtensions",
  "modulePathIgnorePatterns",
  "modulePaths",
  "projects",
  "reporters",
  "roots",
  "selectProjects",
  "setupFiles",
  "setupFilesAfterEnv",
  "snapshotSerializers",
  "testMatch",
  "testPathIgnorePatterns",
  "testPathPattern",
  "testRegex",
  "transformIgnorePatterns",
  "unmockedModulePathPatterns",
  "watchPathIgnorePatterns"
];
var STRING_NUMBER_CLI_FLAGS = ["maxWorkers"];
var BOOLEAN_STRING_CLI_FLAGS = [
  /**
   * `headless` is an argument passed through to Puppeteer (which is passed to Chrome) for end-to-end testing.
   *
   * {@see https://developer.chrome.com/blog/chrome-headless-shell/}
   */
  "headless",
  /**
   * `stats` is an argument that can optionally accept a file path where stats should be written.
   * When used as a boolean (--stats), it defaults to 'stencil-stats.json'.
   * When used with a path (--stats dist/stats.json), it writes to that path.
   */
  "stats"
];
var LOG_LEVEL_CLI_FLAGS = ["logLevel"];
var CLI_FLAG_ALIASES = {
  c: "config",
  h: "help",
  p: "port",
  v: "version",
  // JEST SPECIFIC CLI FLAGS
  // these are defined in
  // https://github.com/facebook/jest/blob/4156f86/packages/jest-cli/src/args.ts
  b: "bail",
  e: "expand",
  f: "onlyFailures",
  i: "runInBand",
  o: "onlyChanged",
  t: "testNamePattern",
  u: "updateSnapshot",
  w: "maxWorkers"
};
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

// src/utils/constants.ts
var DIST_HYDRATE_SCRIPT = "dist-hydrate-script";
var DOCS_CUSTOM = "docs-custom";
var DOCS_JSON = "docs-json";
var DOCS_README = "docs-readme";
var DOCS_VSCODE = "docs-vscode";
var DOCS_CUSTOM_ELEMENTS_MANIFEST = "docs-custom-elements-manifest";
var WWW = "www";

// src/utils/helpers.ts
var dashToPascalCase = (str) => str.toLowerCase().split("-").map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1)).join("");
var toCamelCase = (str) => {
  const pascalCase = dashToPascalCase(str);
  return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
};
var isFunction = (v) => typeof v === "function";
var isString = (v) => typeof v === "string";

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
var shouldIgnoreError = (msg) => {
  return msg === TASK_CANCELED_MSG;
};
var TASK_CANCELED_MSG = `task canceled`;

// src/utils/path.ts
var normalizePath = (path2, relativize = true) => {
  if (typeof path2 !== "string") {
    throw new Error(`invalid path to normalize`);
  }
  path2 = normalizeSlashes(path2.trim());
  const components = pathComponents(path2, getRootLength(path2));
  const reducedComponents = reducePathComponents(components);
  const rootPart = reducedComponents[0];
  const secondPart = reducedComponents[1];
  const normalized = rootPart + reducedComponents.slice(1).join("/");
  if (normalized === "") {
    return ".";
  }
  if (rootPart === "" && secondPart && path2.includes("/") && !secondPart.startsWith(".") && !secondPart.startsWith("@") && relativize) {
    return "./" + normalized;
  }
  return normalized;
};
var normalizeSlashes = (path2) => path2.replace(backslashRegExp, "/");
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
var getRootLength = (path2) => {
  const rootLength = getEncodedRootLength(path2);
  return rootLength < 0 ? ~rootLength : rootLength;
};
var getEncodedRootLength = (path2) => {
  if (!path2) return 0;
  const ch0 = path2.charCodeAt(0);
  if (ch0 === 47 /* slash */ || ch0 === 92 /* backslash */) {
    if (path2.charCodeAt(1) !== ch0) return 1;
    const p1 = path2.indexOf(ch0 === 47 /* slash */ ? "/" : altDirectorySeparator, 2);
    if (p1 < 0) return path2.length;
    return p1 + 1;
  }
  if (isVolumeCharacter(ch0) && path2.charCodeAt(1) === 58 /* colon */) {
    const ch2 = path2.charCodeAt(2);
    if (ch2 === 47 /* slash */ || ch2 === 92 /* backslash */) return 3;
    if (path2.length === 2) return 2;
  }
  const schemeEnd = path2.indexOf(urlSchemeSeparator);
  if (schemeEnd !== -1) {
    const authorityStart = schemeEnd + urlSchemeSeparator.length;
    const authorityEnd = path2.indexOf("/", authorityStart);
    if (authorityEnd !== -1) {
      const scheme = path2.slice(0, schemeEnd);
      const authority = path2.slice(authorityStart, authorityEnd);
      if (scheme === "file" && (authority === "" || authority === "localhost") && isVolumeCharacter(path2.charCodeAt(authorityEnd + 1))) {
        const volumeSeparatorEnd = getFileUrlVolumeSeparatorEnd(path2, authorityEnd + 2);
        if (volumeSeparatorEnd !== -1) {
          if (path2.charCodeAt(volumeSeparatorEnd) === 47 /* slash */) {
            return ~(volumeSeparatorEnd + 1);
          }
          if (volumeSeparatorEnd === path2.length) {
            return ~volumeSeparatorEnd;
          }
        }
      }
      return ~(authorityEnd + 1);
    }
    return ~path2.length;
  }
  return 0;
};
var isVolumeCharacter = (charCode) => charCode >= 97 /* a */ && charCode <= 122 /* z */ || charCode >= 65 /* A */ && charCode <= 90 /* Z */;
var getFileUrlVolumeSeparatorEnd = (url, start) => {
  const ch0 = url.charCodeAt(start);
  if (ch0 === 58 /* colon */) return start + 1;
  if (ch0 === 37 /* percent */ && url.charCodeAt(start + 1) === 51 /* _3 */) {
    const ch2 = url.charCodeAt(start + 2);
    if (ch2 === 97 /* a */ || ch2 === 65 /* A */) return start + 3;
  }
  return -1;
};
var pathComponents = (path2, rootLength) => {
  const root = path2.substring(0, rootLength);
  const rest = path2.substring(rootLength).split("/");
  const restLen = rest.length;
  if (restLen > 0 && !rest[restLen - 1]) {
    rest.pop();
  }
  return [root, ...rest];
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
minimatch.unescape = unescape;

// src/utils/output-target.ts
var isOutputTargetHydrate = (o) => o.type === DIST_HYDRATE_SCRIPT;
var isOutputTargetDocs = (o) => o.type === DOCS_README || o.type === DOCS_JSON || o.type === DOCS_CUSTOM || o.type === DOCS_VSCODE || o.type === DOCS_CUSTOM_ELEMENTS_MANIFEST;

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

// src/app-data/index.ts
var BUILD = {
  allRenderFn: false,
  element: true,
  event: true,
  hasRenderFn: true,
  hostListener: true,
  hostListenerTargetWindow: true,
  hostListenerTargetDocument: true,
  hostListenerTargetBody: true,
  hostListenerTargetParent: false,
  hostListenerTarget: true,
  member: true,
  method: true,
  mode: true,
  observeAttribute: true,
  prop: true,
  propMutable: true,
  reflect: true,
  scoped: true,
  shadowDom: true,
  slot: true,
  cssAnnotations: true,
  state: true,
  style: true,
  formAssociated: false,
  svg: true,
  updatable: true,
  vdomAttribute: true,
  vdomXlink: true,
  vdomClass: true,
  vdomFunctional: true,
  vdomKey: true,
  vdomListener: true,
  vdomRef: true,
  vdomPropOrAttr: true,
  vdomRender: true,
  vdomStyle: true,
  vdomText: true,
  propChangeCallback: true,
  taskQueue: true,
  hotModuleReplacement: false,
  isDebug: false,
  isDev: false,
  isTesting: false,
  hydrateServerSide: false,
  hydrateClientSide: false,
  lifecycleDOMEvents: false,
  lazyLoad: false,
  profile: false,
  slotRelocation: true,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  appendChildSlotFix: false,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  cloneNodeFix: false,
  hydratedAttribute: false,
  hydratedClass: true,
  // TODO(STENCIL-1305): remove this option
  scriptDataOpts: false,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  scopedSlotTextContentFix: false,
  // TODO(STENCIL-854): Remove code related to legacy shadowDomShim field
  shadowDomShim: false,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  slotChildNodesFix: false,
  invisiblePrehydration: true,
  propBoolean: true,
  propNumber: true,
  propString: true,
  constructableCSS: true,
  devTools: false,
  shadowDelegatesFocus: true,
  shadowSlotAssignmentManual: false,
  initializeNextTick: false,
  asyncLoading: true,
  asyncQueue: false,
  // TODO: deprecated in favour of `setTagTransformer` and `transformTag`. Remove in 5.0
  transformTagName: false,
  attachStyles: true,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  experimentalSlotFixes: false
};

// src/client/client-build.ts
var Build = {
  isDev: BUILD.isDev ? true : false,
  isBrowser: true,
  isServer: false,
  isTesting: BUILD.isTesting ? true : false
};

// src/client/client-log.ts
var STENCIL_DEV_MODE = BUILD.isTesting ? ["STENCIL:"] : [
  "%cstencil",
  "color: white;background:#4c47ff;font-weight: bold; font-size:10px; padding:2px 6px; border-radius: 5px"
];

// src/client/client-window.ts
var win = typeof window !== "undefined" ? window : {};
var H = win.HTMLElement || class {
};
var supportsShadow = BUILD.shadowDom;
var supportsConstructableStylesheets = BUILD.constructableCSS ? /* @__PURE__ */ (() => {
  try {
    if (!win.document.adoptedStyleSheets) {
      return false;
    }
    new CSSStyleSheet();
    return typeof new CSSStyleSheet().replaceSync === "function";
  } catch (e) {
  }
  return false;
})() : false;

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
var _polyfillHost = "-shadowcsshost";
var _polyfillSlotted = "-shadowcssslotted";
var _polyfillHostContext = "-shadowcsscontext";
var _parenSuffix = ")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)";
var _cssColonHostRe = new RegExp("(" + _polyfillHost + _parenSuffix, "gim");
var _cssColonHostContextRe = new RegExp("(" + _polyfillHostContext + _parenSuffix, "gim");
var _cssColonSlottedRe = new RegExp("(" + _polyfillSlotted + _parenSuffix, "gim");
var _polyfillHostNoCombinator = _polyfillHost + "-no-combinator";

// src/runtime/vdom/set-accessor.ts
var CAPTURE_EVENT_SUFFIX = "Capture";
var CAPTURE_EVENT_REGEX = new RegExp(CAPTURE_EVENT_SUFFIX + "$");

// src/runtime/mixin.ts
var baseClass = BUILD.lazyLoad ? class {
} : globalThis.HTMLElement || class {
};

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
var readOnlyArrayHasStringMember = (readOnlyArray, maybeMember) => readOnlyArray.includes(maybeMember);

// src/utils/validation.ts
var validateComponentTag = (tag) => {
  if (typeof tag !== "string") {
    return `Tag "${tag}" must be a string type`;
  }
  if (tag !== tag.trim()) {
    return `Tag can not contain white spaces`;
  }
  if (tag !== tag.toLowerCase()) {
    return `Tag can not contain upper case characters`;
  }
  if (tag.length === 0) {
    return `Received empty tag value`;
  }
  if (tag.indexOf(" ") > -1) {
    return `"${tag}" tag cannot contain a space`;
  }
  if (tag.indexOf(",") > -1) {
    return `"${tag}" tag cannot be used for multiple tags`;
  }
  const invalidChars = tag.replace(/\w|-/g, "");
  if (invalidChars !== "") {
    return `"${tag}" tag contains invalid characters: ${invalidChars}`;
  }
  if (tag.indexOf("-") === -1) {
    return `"${tag}" tag must contain a dash (-) to work as a valid web component`;
  }
  if (tag.indexOf("--") > -1) {
    return `"${tag}" tag cannot contain multiple dashes (--) next to each other`;
  }
  if (tag.indexOf("-") === 0) {
    return `"${tag}" tag cannot start with a dash (-)`;
  }
  if (tag.lastIndexOf("-") === tag.length - 1) {
    return `"${tag}" tag cannot end with a dash (-)`;
  }
  return void 0;
};

// src/declarations/stencil-public-compiler.ts
var LOG_LEVELS = ["debug", "info", "warn", "error"];

// src/cli/parse-flags.ts
var parseFlags = (args) => {
  const flags = createConfigFlags();
  flags.args = Array.isArray(args) ? args.slice() : [];
  if (flags.args.length > 0 && flags.args[0] && !flags.args[0].startsWith("-")) {
    flags.task = flags.args[0];
    parseArgs(flags, args.slice(1));
  } else {
    parseArgs(flags, flags.args);
  }
  if (flags.task != null) {
    const i = flags.args.indexOf(flags.task);
    if (i > -1) {
      flags.args.splice(i, 1);
    }
  }
  return flags;
};
var parseArgs = (flags, args) => {
  const argsCopy = args.concat();
  while (argsCopy.length > 0) {
    parseCLITerm(flags, argsCopy);
  }
};
var parseCLITerm = (flags, args) => {
  const arg = args.shift();
  if (arg === void 0) return;
  const isNegatedBoolean = !readOnlyArrayHasStringMember(BOOLEAN_CLI_FLAGS, normalizeFlagName(arg)) && readOnlyArrayHasStringMember(BOOLEAN_CLI_FLAGS, normalizeNegativeFlagName(arg));
  const isNegatedBooleanOrString = !readOnlyArrayHasStringMember(BOOLEAN_STRING_CLI_FLAGS, normalizeFlagName(arg)) && readOnlyArrayHasStringMember(BOOLEAN_STRING_CLI_FLAGS, normalizeNegativeFlagName(arg));
  if (arg.startsWith("--") && arg.includes("=")) {
    const [originalArg, value] = parseEqualsArg(arg);
    setCLIArg(flags, arg.split("=")[0], normalizeFlagName(originalArg), value);
  } else if (arg.startsWith("-") && arg.includes("=")) {
    const [originalArg, value] = parseEqualsArg(arg);
    setCLIArg(flags, desugarRawAlias(originalArg), normalizeFlagName(originalArg), value);
  } else if (CLI_FLAG_REGEX.test(arg)) {
    setCLIArg(flags, desugarRawAlias(arg), normalizeFlagName(arg), parseCLIValue(args));
  } else if (arg.startsWith("--no-") && arg.length > "--no-".length) {
    const normalized = normalizeNegativeFlagName(arg);
    setCLIArg(flags, arg, normalized, "");
  } else if (arg.startsWith("--no") && (isNegatedBoolean || isNegatedBooleanOrString)) {
    setCLIArg(flags, arg, normalizeNegativeFlagName(arg), "");
  } else if (arg.startsWith("--") && arg.length > "--".length) {
    setCLIArg(flags, arg, normalizeFlagName(arg), parseCLIValue(args));
  } else {
    flags.unknownArgs.push(arg);
  }
};
var normalizeNegativeFlagName = (flagName) => {
  const trimmed = flagName.replace(/^--no[-]?/, "");
  return normalizeFlagName(trimmed.charAt(0).toLowerCase() + trimmed.slice(1));
};
var normalizeFlagName = (flagName) => {
  const trimmed = flagName.replace(/^-+/, "");
  return trimmed.includes("-") ? toCamelCase(trimmed) : trimmed;
};
var setCLIArg = (flags, rawArg, normalizedArg, value) => {
  normalizedArg = desugarAlias(normalizedArg);
  if (readOnlyArrayHasStringMember(BOOLEAN_CLI_FLAGS, normalizedArg)) {
    const parsed = typeof value === "string" ? (
      // check if the value is `'true'`
      value === "true"
    ) : (
      // no value was supplied, default to true
      true
    );
    flags[normalizedArg] = parsed;
    flags.knownArgs.push(rawArg);
    if (typeof value === "string" && value !== "") {
      flags.knownArgs.push(value);
    }
  } else if (readOnlyArrayHasStringMember(STRING_CLI_FLAGS, normalizedArg)) {
    if (typeof value === "string") {
      flags[normalizedArg] = value;
      flags.knownArgs.push(rawArg);
      flags.knownArgs.push(value);
    } else {
      throwCLIParsingError(rawArg, "expected a string argument but received nothing");
    }
  } else if (readOnlyArrayHasStringMember(STRING_ARRAY_CLI_FLAGS, normalizedArg)) {
    if (typeof value === "string") {
      if (!Array.isArray(flags[normalizedArg])) {
        flags[normalizedArg] = [];
      }
      const targetArray = flags[normalizedArg];
      if (Array.isArray(targetArray)) {
        targetArray.push(value);
        flags.knownArgs.push(rawArg);
        flags.knownArgs.push(value);
      }
    } else {
      throwCLIParsingError(rawArg, "expected a string argument but received nothing");
    }
  } else if (readOnlyArrayHasStringMember(NUMBER_CLI_FLAGS, normalizedArg)) {
    if (typeof value === "string") {
      const parsed = parseInt(value, 10);
      if (isNaN(parsed)) {
        throwNumberParsingError(rawArg, value);
      } else {
        flags[normalizedArg] = parsed;
        flags.knownArgs.push(rawArg);
        flags.knownArgs.push(value);
      }
    } else {
      throwCLIParsingError(rawArg, "expected a number argument but received nothing");
    }
  } else if (readOnlyArrayHasStringMember(STRING_NUMBER_CLI_FLAGS, normalizedArg)) {
    if (typeof value === "string") {
      if (CLI_ARG_STRING_REGEX.test(value)) {
        flags[normalizedArg] = value;
      } else {
        const parsed = Number(value);
        if (isNaN(parsed)) {
          throwNumberParsingError(rawArg, value);
        } else {
          flags[normalizedArg] = parsed;
        }
      }
      flags.knownArgs.push(rawArg);
      flags.knownArgs.push(value);
    } else {
      throwCLIParsingError(rawArg, "expected a string or a number but received nothing");
    }
  } else if (readOnlyArrayHasStringMember(BOOLEAN_STRING_CLI_FLAGS, normalizedArg)) {
    const derivedValue = typeof value === "string" ? value ? value : false : true;
    flags[normalizedArg] = derivedValue;
    flags.knownArgs.push(rawArg);
    if (typeof derivedValue === "string" && derivedValue) {
      flags.knownArgs.push(derivedValue);
    }
  } else if (readOnlyArrayHasStringMember(LOG_LEVEL_CLI_FLAGS, normalizedArg)) {
    if (typeof value === "string") {
      if (isLogLevel(value)) {
        flags[normalizedArg] = value;
        flags.knownArgs.push(rawArg);
        flags.knownArgs.push(value);
      } else {
        throwCLIParsingError(rawArg, `expected to receive a valid log level but received "${String(value)}"`);
      }
    } else {
      throwCLIParsingError(rawArg, "expected to receive a valid log level but received nothing");
    }
  } else {
    flags.unknownArgs.push(rawArg);
    if (typeof value === "string") {
      flags.unknownArgs.push(value);
    }
  }
};
var CLI_ARG_STRING_REGEX = /[^\d\.Ee\+\-]+/g;
var Empty = Symbol("Empty");
var parseCLIValue = (args) => {
  if (args[0] === void 0) {
    return Empty;
  }
  if (!args[0].startsWith("-")) {
    const value = args.shift();
    if (typeof value === "string") {
      return value;
    }
  }
  return Empty;
};
var parseEqualsArg = (arg) => {
  const [originalArg, ...splitSections] = arg.split("=");
  const value = splitSections.join("=");
  return [originalArg, value === "" ? Empty : value];
};
var isLogLevel = (maybeLogLevel) => readOnlyArrayHasStringMember(LOG_LEVELS, maybeLogLevel);
var throwCLIParsingError = (flag, message) => {
  throw new Error(`when parsing CLI flag "${flag}": ${message}`);
};
var throwNumberParsingError = (flag, value) => {
  throwCLIParsingError(flag, `expected a number but received "${value}"`);
};
var desugarAlias = (maybeAlias) => {
  const possiblyDesugared = CLI_FLAG_ALIASES[maybeAlias];
  if (typeof possiblyDesugared === "string") {
    return possiblyDesugared;
  }
  return maybeAlias;
};
var desugarRawAlias = (rawAlias) => "--" + desugarAlias(normalizeFlagName(rawAlias));

// src/cli/find-config.ts
var findConfig = async (opts) => {
  const sys = opts.sys;
  const cwd = sys.getCurrentDirectory();
  const rootDir = normalizePath(cwd);
  let configPath = opts.configPath;
  if (isString(configPath)) {
    if (!sys.platformPath.isAbsolute(configPath)) {
      configPath = normalizePath(sys.platformPath.join(cwd, configPath));
    } else {
      configPath = normalizePath(configPath);
    }
  } else {
    configPath = rootDir;
  }
  const results = {
    configPath,
    rootDir: normalizePath(cwd)
  };
  const stat = await sys.stat(configPath);
  if (stat.error) {
    const diagnostics = [];
    const diagnostic = buildError(diagnostics);
    diagnostic.absFilePath = configPath;
    diagnostic.header = `Invalid config path`;
    diagnostic.messageText = `Config path "${configPath}" not found`;
    return result_exports.err(diagnostics);
  }
  if (stat.isFile) {
    results.configPath = configPath;
    results.rootDir = sys.platformPath.dirname(configPath);
  } else if (stat.isDirectory) {
    for (const configName of ["stencil.config.ts", "stencil.config.js"]) {
      const testConfigFilePath = sys.platformPath.join(configPath, configName);
      const stat2 = await sys.stat(testConfigFilePath);
      if (stat2.isFile) {
        results.configPath = testConfigFilePath;
        results.rootDir = sys.platformPath.dirname(testConfigFilePath);
        break;
      }
    }
  }
  return result_exports.ok(results);
};

// src/cli/load-compiler.ts
var loadCoreCompiler = async (sys) => {
  return await sys.dynamicImport(sys.getCompilerExecutingPath());
};

// src/cli/logs.ts
var startupLog = (logger, task) => {
  if (task === "info" || task === "serve" || task === "version") {
    return;
  }
  logger.info(logger.cyan(`@stencil/core`));
};
var startupLogVersion = (logger, task, coreCompiler) => {
  if (task === "info" || task === "serve" || task === "version") {
    return;
  }
  const isDevBuild = coreCompiler.version.includes("-dev.");
  let startupMsg;
  if (isDevBuild) {
    startupMsg = logger.yellow(`[LOCAL DEV] v${coreCompiler.version}`);
  } else {
    startupMsg = logger.cyan(`v${coreCompiler.version}`);
  }
  startupMsg += logger.emoji(" " + coreCompiler.vermoji);
  logger.info(startupMsg);
};
var loadedCompilerLog = (sys, logger, flags, coreCompiler) => {
  const sysDetails = sys.details;
  const runtimeInfo = `${sys.name} ${sys.version}`;
  const platformInfo = sysDetails ? `${sysDetails.platform}, ${sysDetails.cpuModel}` : `Unknown Platform, Unknown CPU Model`;
  const statsInfo = sysDetails ? `cpus: ${sys.hardwareConcurrency}, freemem: ${Math.round(
    sysDetails.freemem() / 1e6
  )}MB, totalmem: ${Math.round(sysDetails.totalmem / 1e6)}MB` : "Unknown CPU Core Count, Unknown Memory";
  if (logger.getLevel() === "debug") {
    logger.debug(runtimeInfo);
    logger.debug(platformInfo);
    logger.debug(statsInfo);
    logger.debug(`compiler: ${sys.getCompilerExecutingPath()}`);
    logger.debug(`build: ${coreCompiler.buildId}`);
  } else if (flags.ci) {
    logger.info(runtimeInfo);
    logger.info(platformInfo);
    logger.info(statsInfo);
  }
};
var startupCompilerLog = (coreCompiler, config) => {
  if (config.suppressLogs === true) {
    return;
  }
  const { logger } = config;
  const isDebug = logger.getLevel() === "debug";
  const isPrerelease = coreCompiler.version.includes("-");
  const isDevBuild = coreCompiler.version.includes("-dev.");
  if (isPrerelease && !isDevBuild) {
    logger.warn(
      logger.yellow(
        `This is a prerelease build, undocumented changes might happen at any time. Technical support is not available for prereleases, but any assistance testing is appreciated.`
      )
    );
  }
  if (config.devMode && !isDebug) {
    if (config.buildEs5) {
      logger.warn(
        `Generating ES5 during development is a very task expensive, initial and incremental builds will be much slower. Drop the '--es5' flag and use a modern browser for development.`
      );
    }
    if (!config.enableCache) {
      logger.warn(`Disabling cache during development will slow down incremental builds.`);
    }
  }
};

// src/cli/check-version.ts
var startCheckVersion = async (config, currentVersion) => {
  if (config.devMode && !config.flags.ci && !currentVersion.includes("-dev.") && isFunction(config.sys.checkVersion)) {
    return config.sys.checkVersion(config.logger, currentVersion);
  }
  return null;
};
var printCheckVersionResults = async (versionChecker) => {
  if (versionChecker) {
    const checkVersionResults = await versionChecker;
    if (isFunction(checkVersionResults)) {
      checkVersionResults();
    }
  }
};

// src/cli/task-prerender.ts
var taskPrerender = async (coreCompiler, config) => {
  startupCompilerLog(coreCompiler, config);
  const hydrateAppFilePath = config.flags.unknownArgs[0];
  if (typeof hydrateAppFilePath !== "string") {
    config.logger.error(`Missing hydrate app script path`);
    return config.sys.exit(1);
  }
  const srcIndexHtmlPath = config.srcIndexHtml;
  const diagnostics = await runPrerenderTask(coreCompiler, config, hydrateAppFilePath, void 0, srcIndexHtmlPath);
  config.logger.printDiagnostics(diagnostics);
  if (diagnostics.some((d) => d.level === "error")) {
    return config.sys.exit(1);
  }
};
var runPrerenderTask = async (coreCompiler, config, hydrateAppFilePath, componentGraph, srcIndexHtmlPath) => {
  const diagnostics = [];
  try {
    const prerenderer = await coreCompiler.createPrerenderer(config);
    const results = await prerenderer.start({
      hydrateAppFilePath,
      componentGraph,
      srcIndexHtmlPath
    });
    diagnostics.push(...results.diagnostics);
  } catch (e) {
    catchError(diagnostics, e);
  }
  return diagnostics;
};

// src/cli/task-watch.ts
var taskWatch = async (coreCompiler, config) => {
  let devServer = null;
  let exitCode = 0;
  try {
    startupCompilerLog(coreCompiler, config);
    const versionChecker = startCheckVersion(config, coreCompiler.version);
    const compiler = await coreCompiler.createCompiler(config);
    const watcher = await compiler.createWatcher();
    if (!config.sys.getDevServerExecutingPath || !config.sys.dynamicImport || !config.sys.onProcessInterrupt) {
      throw new Error(
        `Environment doesn't provide required functions: getDevServerExecutingPath, dynamicImport, onProcessInterrupt`
      );
    }
    if (config.flags.serve) {
      const devServerPath = config.sys.getDevServerExecutingPath();
      const { start } = await config.sys.dynamicImport(devServerPath);
      devServer = await start(config.devServer, config.logger, watcher);
    }
    config.sys.onProcessInterrupt(() => {
      config.logger.debug(`close watch`);
      compiler && compiler.destroy();
    });
    const rmVersionCheckerLog = watcher.on("buildFinish", async () => {
      rmVersionCheckerLog();
      printCheckVersionResults(versionChecker);
    });
    if (devServer) {
      const rmDevServerLog = watcher.on("buildFinish", () => {
        var _a2;
        rmDevServerLog();
        const url = (_a2 = devServer == null ? void 0 : devServer.browserUrl) != null ? _a2 : "UNKNOWN URL";
        config.logger.info(`${config.logger.cyan(url)}
`);
      });
    }
    const closeResults = await watcher.start();
    if (closeResults.exitCode > 0) {
      exitCode = closeResults.exitCode;
    }
  } catch (e) {
    exitCode = 1;
    config.logger.error(e);
  }
  if (devServer) {
    await devServer.close();
  }
  if (exitCode > 0) {
    return config.sys.exit(exitCode);
  }
};

// src/cli/telemetry/helpers.ts
var tryFn = async (fn, ...args) => {
  try {
    return await fn(...args);
  } catch {
  }
  return null;
};
var isInteractive = (sys, flags, object) => {
  const terminalInfo = object || Object.freeze({
    tty: sys.isTTY() ? true : false,
    ci: ["CI", "BUILD_ID", "BUILD_NUMBER", "BITBUCKET_COMMIT", "CODEBUILD_BUILD_ARN"].filter(
      (v) => {
        var _a2;
        return !!((_a2 = sys.getEnvironmentVar) == null ? void 0 : _a2.call(sys, v));
      }
    ).length > 0 || !!flags.ci
  });
  return terminalInfo.tty && !terminalInfo.ci;
};
var UUID_REGEX = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c == "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
async function readJson(sys, path2) {
  const file = await sys.readFile(path2);
  return !!file && JSON.parse(file);
}
function hasDebug(flags) {
  return !!flags.debug;
}
function hasVerbose(flags) {
  return !!flags.verbose && hasDebug(flags);
}

// src/cli/ionic-config.ts
var isTest = () => process.env.JEST_WORKER_ID !== void 0;
var defaultConfig = (sys) => sys.resolvePath(`${sys.homeDir()}/.ionic/${isTest() ? "tmp-config.json" : "config.json"}`);
var defaultConfigDirectory = (sys) => sys.resolvePath(`${sys.homeDir()}/.ionic`);
async function readConfig(sys) {
  let config = await readJson(sys, defaultConfig(sys));
  if (!config) {
    config = {
      "tokens.telemetry": uuidv4(),
      "telemetry.stencil": true
    };
    await writeConfig(sys, config);
  } else if (!config["tokens.telemetry"] || !UUID_REGEX.test(config["tokens.telemetry"])) {
    const newUuid = uuidv4();
    await writeConfig(sys, { ...config, "tokens.telemetry": newUuid });
    config["tokens.telemetry"] = newUuid;
  }
  return config;
}
async function writeConfig(sys, config) {
  let result = false;
  try {
    await sys.createDir(defaultConfigDirectory(sys), { recursive: true });
    await sys.writeFile(defaultConfig(sys), JSON.stringify(config, null, 2));
    result = true;
  } catch (error) {
    console.error(`Stencil Telemetry: couldn't write configuration file to ${defaultConfig(sys)} - ${error}.`);
  }
  return result;
}
async function updateConfig(sys, newOptions) {
  const config = await readConfig(sys);
  return await writeConfig(sys, Object.assign(config, newOptions));
}

// src/cli/telemetry/shouldTrack.ts
async function shouldTrack(config, sys, ci) {
  return !ci && isInteractive(sys, config.flags) && await checkTelemetry(sys);
}

// src/cli/telemetry/telemetry.ts
async function telemetryBuildFinishedAction(sys, config, coreCompiler, result) {
  const tracking = await shouldTrack(config, sys, !!config.flags.ci);
  if (!tracking) {
    return;
  }
  const component_count = result.componentGraph ? Object.keys(result.componentGraph).length : void 0;
  const data = await prepareData(coreCompiler, config, sys, result.duration, component_count);
  await sendMetric(sys, config, "stencil_cli_command", data);
  config.logger.debug(`${config.logger.blue("Telemetry")}: ${config.logger.gray(JSON.stringify(data))}`);
}
async function telemetryAction(sys, config, coreCompiler, action) {
  const tracking = await shouldTrack(config, sys, !!config.flags.ci);
  let duration = void 0;
  let error;
  if (action) {
    const start = /* @__PURE__ */ new Date();
    try {
      await action();
    } catch (e) {
      error = e;
    }
    const end = /* @__PURE__ */ new Date();
    duration = end.getTime() - start.getTime();
  }
  if (!tracking || config.flags.task == "build" && !config.flags.args.includes("--watch")) {
    return;
  }
  const data = await prepareData(coreCompiler, config, sys, duration);
  await sendMetric(sys, config, "stencil_cli_command", data);
  config.logger.debug(`${config.logger.blue("Telemetry")}: ${config.logger.gray(JSON.stringify(data))}`);
  if (error) {
    throw error;
  }
}
function hasAppTarget(config) {
  return config.outputTargets.some(
    (target) => target.type === WWW && (!!target.serviceWorker || !!target.baseUrl && target.baseUrl !== "/")
  );
}
function isUsingYarn(sys) {
  var _a2, _b;
  return ((_b = (_a2 = sys.getEnvironmentVar) == null ? void 0 : _a2.call(sys, "npm_execpath")) == null ? void 0 : _b.includes("yarn")) || false;
}
function getActiveTargets(config) {
  const result = config.outputTargets.map((t) => t.type);
  return Array.from(new Set(result));
}
var prepareData = async (coreCompiler, config, sys, duration_ms, component_count = void 0) => {
  var _a2, _b, _c;
  const { typescript, rollup } = coreCompiler.versions || { typescript: "unknown", rollup: "unknown" };
  const { packages, packagesNoVersions } = await getInstalledPackages(sys, config);
  const targets = getActiveTargets(config);
  const yarn = isUsingYarn(sys);
  const stencil = coreCompiler.version || "unknown";
  const system = `${sys.name} ${sys.version}`;
  const os_name = (_a2 = sys.details) == null ? void 0 : _a2.platform;
  const os_version = (_b = sys.details) == null ? void 0 : _b.release;
  const cpu_model = (_c = sys.details) == null ? void 0 : _c.cpuModel;
  const build = coreCompiler.buildId || "unknown";
  const has_app_pwa_config = hasAppTarget(config);
  const anonymizedConfig = anonymizeConfigForTelemetry(config);
  return {
    arguments: config.flags.args,
    build,
    component_count,
    config: anonymizedConfig,
    cpu_model,
    duration_ms,
    has_app_pwa_config,
    os_name,
    os_version,
    packages,
    packages_no_versions: packagesNoVersions,
    rollup,
    stencil,
    system,
    system_major: getMajorVersion(system),
    targets,
    task: config.flags.task,
    typescript,
    yarn
  };
};
var OUTPUT_TARGET_KEYS_TO_KEEP = ["type"];
var CONFIG_PROPS_TO_ANONYMIZE = [
  "rootDir",
  "fsNamespace",
  "packageJsonFilePath",
  "namespace",
  "srcDir",
  "srcIndexHtml",
  "buildLogFilePath",
  "cacheDir",
  "configPath",
  "tsconfig"
];
var CONFIG_PROPS_TO_DELETE = [
  "commonjs",
  "devServer",
  "env",
  "logger",
  "rollupConfig",
  "sys",
  "testing",
  "tsCompilerOptions"
];
var anonymizeConfigForTelemetry = (config) => {
  const anonymizedConfig = { ...config };
  for (const prop of CONFIG_PROPS_TO_ANONYMIZE) {
    if (anonymizedConfig[prop] !== void 0) {
      anonymizedConfig[prop] = "omitted";
    }
  }
  anonymizedConfig.outputTargets = config.outputTargets.map((target) => {
    const anonymizedOT = JSON.parse(
      JSON.stringify(target, (key, value) => {
        if (!(typeof value === "string")) {
          return value;
        }
        if (OUTPUT_TARGET_KEYS_TO_KEEP.includes(key)) {
          return value;
        }
        return "omitted";
      })
    );
    if (isOutputTargetHydrate(target) && target.external) {
      anonymizedOT["external"] = target.external.concat();
    }
    return anonymizedOT;
  });
  for (const prop of CONFIG_PROPS_TO_DELETE) {
    delete anonymizedConfig[prop];
  }
  return anonymizedConfig;
};
async function getInstalledPackages(sys, config) {
  let packages = [];
  let packagesNoVersions = [];
  const yarn = isUsingYarn(sys);
  try {
    const appRootDir = sys.getCurrentDirectory();
    const packageJson = await tryFn(
      readJson,
      sys,
      sys.resolvePath(appRootDir + "/package.json")
    );
    if (!packageJson) {
      return { packages, packagesNoVersions };
    }
    const rawPackages = Object.entries({
      ...packageJson.devDependencies,
      ...packageJson.dependencies
    });
    const ionicPackages = rawPackages.filter(
      ([k]) => k.startsWith("@stencil/") || k.startsWith("@ionic/") || k.startsWith("@capacitor/")
    );
    try {
      packages = yarn ? await yarnPackages(sys, ionicPackages) : await npmPackages(sys, ionicPackages);
    } catch (e) {
      packages = ionicPackages.map(([k, v]) => `${k}@${v.replace("^", "")}`);
    }
    packagesNoVersions = ionicPackages.map(([k]) => `${k}`);
    return { packages, packagesNoVersions };
  } catch (err2) {
    hasDebug(config.flags) && console.error(err2);
    return { packages, packagesNoVersions };
  }
}
async function npmPackages(sys, ionicPackages) {
  const appRootDir = sys.getCurrentDirectory();
  const packageLockJson = await tryFn(readJson, sys, sys.resolvePath(appRootDir + "/package-lock.json"));
  return ionicPackages.map(([k, v]) => {
    var _a2, _b, _c, _d;
    let version = (_d = (_c = (_a2 = packageLockJson == null ? void 0 : packageLockJson.dependencies[k]) == null ? void 0 : _a2.version) != null ? _c : (_b = packageLockJson == null ? void 0 : packageLockJson.devDependencies[k]) == null ? void 0 : _b.version) != null ? _d : v;
    version = version.includes("file:") ? sanitizeDeclaredVersion(v) : version;
    return `${k}@${version}`;
  });
}
async function yarnPackages(sys, ionicPackages) {
  var _a2;
  const appRootDir = sys.getCurrentDirectory();
  const yarnLock = sys.readFileSync(sys.resolvePath(appRootDir + "/yarn.lock"));
  const yarnLockYml = (_a2 = sys.parseYarnLockFile) == null ? void 0 : _a2.call(sys, yarnLock);
  return ionicPackages.map(([k, v]) => {
    var _a3;
    const identifiedVersion = `${k}@${v}`;
    let version = (_a3 = yarnLockYml == null ? void 0 : yarnLockYml.object[identifiedVersion]) == null ? void 0 : _a3.version;
    version = version && version.includes("undefined") ? sanitizeDeclaredVersion(identifiedVersion) : version;
    return `${k}@${version}`;
  });
}
function sanitizeDeclaredVersion(version) {
  return version.replace(/[*^~]/g, "");
}
async function sendMetric(sys, config, name, value) {
  const session_id = await getTelemetryToken(sys);
  const message = {
    name,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    source: "stencil_cli",
    value,
    session_id
  };
  await sendTelemetry(sys, config, message);
}
async function getTelemetryToken(sys) {
  const config = await readConfig(sys);
  if (config["tokens.telemetry"] === void 0) {
    config["tokens.telemetry"] = uuidv4();
    await writeConfig(sys, config);
  }
  return config["tokens.telemetry"];
}
async function sendTelemetry(sys, config, data) {
  try {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const body = {
      metrics: [data],
      sent_at: now
    };
    if (!sys.fetch) {
      throw new Error("No fetch implementation available");
    }
    const response = await sys.fetch("https://api.ionicjs.com/events/metrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    hasVerbose(config.flags) && console.debug("\nSent %O metric to events service (status: %O)", data.name, response.status, "\n");
    if (response.status !== 204) {
      hasVerbose(config.flags) && console.debug("\nBad response from events service. Request body: %O", response.body.toString(), "\n");
    }
  } catch (e) {
    hasVerbose(config.flags) && console.debug("Telemetry request failed:", e);
  }
}
async function checkTelemetry(sys) {
  const config = await readConfig(sys);
  if (config["telemetry.stencil"] === void 0) {
    config["telemetry.stencil"] = true;
    await writeConfig(sys, config);
  }
  return config["telemetry.stencil"];
}
async function enableTelemetry(sys) {
  return await updateConfig(sys, { "telemetry.stencil": true });
}
async function disableTelemetry(sys) {
  return await updateConfig(sys, { "telemetry.stencil": false });
}
function getMajorVersion(version) {
  const parts = version.split(".");
  return parts[0];
}

// src/cli/task-build.ts
var taskBuild = async (coreCompiler, config) => {
  if (config.flags.watch) {
    await taskWatch(coreCompiler, config);
    return;
  }
  let exitCode = 0;
  try {
    startupCompilerLog(coreCompiler, config);
    const versionChecker = startCheckVersion(config, coreCompiler.version);
    const compiler = await coreCompiler.createCompiler(config);
    const results = await compiler.build();
    await telemetryBuildFinishedAction(config.sys, config, coreCompiler, results);
    await compiler.destroy();
    if (results.hasError) {
      exitCode = 1;
    } else if (config.flags.prerender) {
      const prerenderDiagnostics = await runPrerenderTask(
        coreCompiler,
        config,
        results.hydrateAppFilePath,
        results.componentGraph,
        void 0
      );
      config.logger.printDiagnostics(prerenderDiagnostics);
      if (prerenderDiagnostics.some((d) => d.level === "error")) {
        exitCode = 1;
      }
    }
    await printCheckVersionResults(versionChecker);
  } catch (e) {
    exitCode = 1;
    config.logger.error(e);
  }
  if (exitCode > 0) {
    return config.sys.exit(exitCode);
  }
};

// src/cli/task-docs.ts
var taskDocs = async (coreCompiler, config) => {
  config.devServer = {};
  config.outputTargets = config.outputTargets.filter(isOutputTargetDocs);
  config.devMode = true;
  startupCompilerLog(coreCompiler, config);
  const compiler = await coreCompiler.createCompiler(config);
  await compiler.build();
  await compiler.destroy();
};

// src/cli/task-generate.ts
var import_path2 = require("path");
var taskGenerate = async (config) => {
  if (!config.configPath) {
    config.logger.error("Please run this command in your root directory (i. e. the one containing stencil.config.ts).");
    return config.sys.exit(1);
  }
  const absoluteSrcDir = config.srcDir;
  if (!absoluteSrcDir) {
    config.logger.error(`Stencil's srcDir was not specified.`);
    return config.sys.exit(1);
  }
  const { prompt } = await Promise.resolve().then(() => __toESM(require_lib()));
  const input = config.flags.unknownArgs.find((arg) => !arg.startsWith("-")) || (await prompt({ name: "tagName", type: "text", message: "Component tag name (dash-case):" })).tagName;
  if (void 0 === input) {
    return;
  }
  const { dir, base: componentName } = (0, import_path2.parse)(input);
  const tagError = validateComponentTag(componentName);
  if (tagError) {
    config.logger.error(tagError);
    return config.sys.exit(1);
  }
  let cssExtension = "css";
  if (!!config.plugins.find((plugin) => plugin.name === "sass")) {
    cssExtension = await chooseSassExtension();
  } else if (!!config.plugins.find((plugin) => plugin.name === "less")) {
    cssExtension = "less";
  }
  const filesToGenerateExt = await chooseFilesToGenerate(cssExtension);
  if (!filesToGenerateExt) {
    return;
  }
  const extensionsToGenerate = ["tsx", ...filesToGenerateExt];
  const testFolder = extensionsToGenerate.some(isTest2) ? "test" : "";
  const outDir = (0, import_path2.join)(absoluteSrcDir, "components", dir, componentName);
  await config.sys.createDir(normalizePath((0, import_path2.join)(outDir, testFolder)), { recursive: true });
  const filesToGenerate = extensionsToGenerate.map((extension) => ({
    extension,
    path: getFilepathForFile(outDir, componentName, extension)
  }));
  await checkForOverwrite(filesToGenerate, config);
  const writtenFiles = await Promise.all(
    filesToGenerate.map(
      (file) => getBoilerplateAndWriteFile(
        config,
        componentName,
        extensionsToGenerate.includes("css") || extensionsToGenerate.includes("sass") || extensionsToGenerate.includes("scss") || extensionsToGenerate.includes("less"),
        file,
        cssExtension
      )
    )
  ).catch((error) => config.logger.error(error));
  if (!writtenFiles) {
    return config.sys.exit(1);
  }
  console.log();
  console.log(`${config.logger.gray("$")} stencil generate ${input}`);
  console.log();
  console.log(config.logger.bold("The following files have been generated:"));
  const absoluteRootDir = config.rootDir;
  writtenFiles.map((file) => console.log(`  - ${(0, import_path2.relative)(absoluteRootDir, file)}`));
};
var chooseFilesToGenerate = async (cssExtension) => {
  const { prompt } = await Promise.resolve().then(() => __toESM(require_lib()));
  return (await prompt({
    name: "filesToGenerate",
    type: "multiselect",
    message: "Which additional files do you want to generate?",
    choices: [
      { value: cssExtension, title: `Stylesheet (.${cssExtension})`, selected: true },
      { value: "spec.tsx", title: "Spec Test  (.spec.tsx)", selected: true },
      { value: "e2e.ts", title: "E2E Test (.e2e.ts)", selected: true }
    ]
  })).filesToGenerate;
};
var chooseSassExtension = async () => {
  const { prompt } = await Promise.resolve().then(() => __toESM(require_lib()));
  return (await prompt({
    name: "sassFormat",
    type: "select",
    message: "Which Sass format would you like to use? (More info: https://sass-lang.com/documentation/syntax/#the-indented-syntax)",
    choices: [
      { value: "sass", title: `*.sass Format`, selected: true },
      { value: "scss", title: "*.scss Format" }
    ]
  })).sassFormat;
};
var getFilepathForFile = (filePath, componentName, extension) => isTest2(extension) ? normalizePath((0, import_path2.join)(filePath, "test", `${componentName}.${extension}`)) : normalizePath((0, import_path2.join)(filePath, `${componentName}.${extension}`));
var getBoilerplateAndWriteFile = async (config, componentName, withCss, file, styleExtension) => {
  const boilerplate = getBoilerplateByExtension(componentName, file.extension, withCss, styleExtension);
  await config.sys.writeFile(normalizePath(file.path), boilerplate);
  return file.path;
};
var checkForOverwrite = async (files, config) => {
  const alreadyPresent = [];
  await Promise.all(
    files.map(async ({ path: path2 }) => {
      if (await config.sys.readFile(path2) !== void 0) {
        alreadyPresent.push(path2);
      }
    })
  );
  if (alreadyPresent.length > 0) {
    config.logger.error(
      "Generating code would overwrite the following files:",
      ...alreadyPresent.map((path2) => "	" + normalizePath(path2))
    );
    await config.sys.exit(1);
  }
};
var isTest2 = (extension) => {
  return extension === "e2e.ts" || extension === "spec.tsx";
};
var getBoilerplateByExtension = (tagName, extension, withCss, styleExtension) => {
  switch (extension) {
    case "tsx":
      return getComponentBoilerplate(tagName, withCss, styleExtension);
    case "css":
    case "less":
    case "sass":
    case "scss":
      return getStyleUrlBoilerplate(styleExtension);
    case "spec.tsx":
      return getSpecTestBoilerplate(tagName);
    case "e2e.ts":
      return getE2eTestBoilerplate(tagName);
    default:
      throw new Error(`Unkown extension "${extension}".`);
  }
};
var getComponentBoilerplate = (tagName, hasStyle, styleExtension) => {
  const decorator = [`{`];
  decorator.push(`  tag: '${tagName}',`);
  if (hasStyle) {
    decorator.push(`  styleUrl: '${tagName}.${styleExtension}',`);
  }
  decorator.push(`  shadow: true,`);
  decorator.push(`}`);
  return `import { Component, Host, h } from '@stencil/core';

@Component(${decorator.join("\n")})
export class ${toPascalCase(tagName)} {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
`;
};
var getStyleUrlBoilerplate = (ext2) => ext2 === "sass" ? `:host
  display: block
` : `:host {
  display: block;
}
`;
var getSpecTestBoilerplate = (tagName) => `import { newSpecPage } from '@stencil/core/testing';
import { ${toPascalCase(tagName)} } from '../${tagName}';

describe('${tagName}', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [${toPascalCase(tagName)}],
      html: \`<${tagName}></${tagName}>\`,
    });
    expect(page.root).toEqualHtml(\`
      <${tagName}>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </${tagName}>
    \`);
  });
});
`;
var getE2eTestBoilerplate = (tagName) => `import { newE2EPage } from '@stencil/core/testing';

describe('${tagName}', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<${tagName}></${tagName}>');

    const element = await page.find('${tagName}');
    expect(element).toHaveClass('hydrated');
  });
});
`;
var toPascalCase = (str) => str.split("-").reduce((res, part) => res + part[0].toUpperCase() + part.slice(1), "");

// src/cli/task-telemetry.ts
var taskTelemetry = async (flags, sys, logger) => {
  var _a2;
  const prompt = logger.dim(((_a2 = sys.details) == null ? void 0 : _a2.platform) === "windows" ? ">" : "$");
  const isEnabling = flags.args.includes("on");
  const isDisabling = flags.args.includes("off");
  const INFORMATION = `Opt in or out of telemetry. Information about the data we collect is available on our website: ${logger.bold(
    "https://stenciljs.com/telemetry"
  )}`;
  const THANK_YOU = `Thank you for helping to make Stencil better! \u{1F496}`;
  const ENABLED_MESSAGE = `${logger.green("Enabled")}. ${THANK_YOU}

`;
  const DISABLED_MESSAGE = `${logger.red("Disabled")}

`;
  const hasTelemetry = await checkTelemetry(sys);
  if (isEnabling) {
    const result = await enableTelemetry(sys);
    result ? console.log(`
  ${logger.bold("Telemetry is now ") + ENABLED_MESSAGE}`) : console.log(`Something went wrong when enabling Telemetry.`);
    return;
  }
  if (isDisabling) {
    const result = await disableTelemetry(sys);
    result ? console.log(`
  ${logger.bold("Telemetry is now ") + DISABLED_MESSAGE}`) : console.log(`Something went wrong when disabling Telemetry.`);
    return;
  }
  console.log(`  ${logger.bold("Telemetry:")} ${logger.dim(INFORMATION)}`);
  console.log(`
  ${logger.bold("Status")}: ${hasTelemetry ? ENABLED_MESSAGE : DISABLED_MESSAGE}`);
  console.log(`    ${prompt} ${logger.green("stencil telemetry [off|on]")}

        ${logger.cyan("off")} ${logger.dim(".............")} Disable sharing anonymous usage data
        ${logger.cyan("on")} ${logger.dim("..............")} Enable sharing anonymous usage data
  `);
};

// src/cli/task-help.ts
var taskHelp = async (flags, logger, sys) => {
  var _a2;
  const prompt = logger.dim(((_a2 = sys.details) == null ? void 0 : _a2.platform) === "windows" ? ">" : "$");
  console.log(`
  ${logger.bold("Build:")} ${logger.dim("Build components for development or production.")}

    ${prompt} ${logger.green("stencil build [--dev] [--watch] [--prerender] [--debug]")}

      ${logger.cyan("--dev")} ${logger.dim(".............")} Development build
      ${logger.cyan("--watch")} ${logger.dim("...........")} Rebuild when files update
      ${logger.cyan("--serve")} ${logger.dim("...........")} Start the dev-server
      ${logger.cyan("--prerender")} ${logger.dim(".......")} Prerender the application
      ${logger.cyan("--docs")} ${logger.dim("............")} Generate component readme.md docs
      ${logger.cyan("--config")} ${logger.dim("..........")} Set stencil config file
      ${logger.cyan("--stats")} ${logger.dim("...........")} Write stats, optional file path (default: stencil-stats.json)
      ${logger.cyan("--log")} ${logger.dim(".............")} Write stencil-build.log file
      ${logger.cyan("--debug")} ${logger.dim("...........")} Set the log level to debug


  ${logger.bold("Test:")} ${logger.dim("Run unit and end-to-end tests.")}

    ${prompt} ${logger.green("stencil test [--spec] [--e2e]")}

      ${logger.cyan("--spec")} ${logger.dim("............")} Run unit tests with Jest
      ${logger.cyan("--e2e")} ${logger.dim(".............")} Run e2e tests with Puppeteer


  ${logger.bold("Generate:")} ${logger.dim("Bootstrap components.")}

    ${prompt} ${logger.green("stencil generate")} or ${logger.green("stencil g")}

`);
  await taskTelemetry(flags, sys, logger);
  console.log(`
  ${logger.bold("Examples:")}

  ${prompt} ${logger.green("stencil build --dev --watch --serve")}
  ${prompt} ${logger.green("stencil build --prerender")}
  ${prompt} ${logger.green("stencil test --spec --e2e")}
  ${prompt} ${logger.green("stencil telemetry on")}
  ${prompt} ${logger.green("stencil generate")}
  ${prompt} ${logger.green("stencil g my-component")}
`);
};

// src/cli/task-info.ts
var taskInfo = (coreCompiler, sys, logger) => {
  const details = sys.details;
  const versions = coreCompiler.versions;
  console.log(``);
  console.log(`${logger.cyan("      System:")} ${sys.name} ${sys.version}`);
  if (details) {
    console.log(`${logger.cyan("    Platform:")} ${details.platform} (${details.release})`);
    console.log(
      `${logger.cyan("   CPU Model:")} ${details.cpuModel} (${sys.hardwareConcurrency} cpu${sys.hardwareConcurrency !== 1 ? "s" : ""})`
    );
  }
  console.log(`${logger.cyan("    Compiler:")} ${sys.getCompilerExecutingPath()}`);
  console.log(`${logger.cyan("       Build:")} ${coreCompiler.buildId}`);
  console.log(`${logger.cyan("     Stencil:")} ${coreCompiler.version}${logger.emoji(" " + coreCompiler.vermoji)}`);
  console.log(`${logger.cyan("  TypeScript:")} ${versions.typescript}`);
  console.log(`${logger.cyan("      Rollup:")} ${versions.rollup}`);
  console.log(`${logger.cyan("      Parse5:")} ${versions.parse5}`);
  console.log(`${logger.cyan("      jQuery:")} ${versions.jquery}`);
  console.log(`${logger.cyan("      Terser:")} ${versions.terser}`);
  console.log(``);
};

// src/cli/task-serve.ts
var taskServe = async (config) => {
  config.suppressLogs = true;
  config.flags.serve = true;
  config.devServer.openBrowser = !!config.flags.open;
  config.devServer.reloadStrategy = null;
  config.devServer.initialLoadUrl = "/";
  config.devServer.websocket = false;
  config.maxConcurrentWorkers = 1;
  config.devServer.root = isString(config.flags.root) ? config.flags.root : config.sys.getCurrentDirectory();
  if (!config.sys.getDevServerExecutingPath || !config.sys.dynamicImport || !config.sys.onProcessInterrupt) {
    throw new Error(
      `Environment doesn't provide required functions: getDevServerExecutingPath, dynamicImport, onProcessInterrupt`
    );
  }
  const devServerPath = config.sys.getDevServerExecutingPath();
  const { start } = await config.sys.dynamicImport(devServerPath);
  const devServer = await start(config.devServer, config.logger);
  console.log(`${config.logger.cyan("     Root:")} ${devServer.root}`);
  console.log(`${config.logger.cyan("  Address:")} ${devServer.address}`);
  console.log(`${config.logger.cyan("     Port:")} ${devServer.port}`);
  console.log(`${config.logger.cyan("   Server:")} ${devServer.browserUrl}`);
  console.log(``);
  config.sys.onProcessInterrupt(() => {
    if (devServer) {
      config.logger.debug(`dev server close: ${devServer.browserUrl}`);
      devServer.close();
    }
  });
};

// src/cli/task-test.ts
var taskTest = async (config) => {
  var _a2;
  config.logger.warn(
    config.logger.yellow(
      `[DEPRECATION] Stencil's integrated testing (the 'test' task, --spec and --e2e flags) is deprecated and will be removed in Stencil v5. Migrate spec tests to @stencil/vitest (https://github.com/stenciljs/vitest) and e2e / browser tests to either @stencil/vitest (https://github.com/stenciljs/vitest) or @stencil/playwright (https://github.com/stenciljs/playwright). See https://github.com/stenciljs/core/issues/6584 for full details.`
    )
  );
  config.buildDocs = false;
  const testingRunOpts = {
    e2e: !!config.flags.e2e,
    screenshot: !!config.flags.screenshot,
    spec: !!config.flags.spec,
    updateScreenshot: !!config.flags.updateScreenshot
  };
  const ensureModuleIds = ["@types/jest", "jest", "jest-cli"];
  if (testingRunOpts.e2e) {
    const puppeteer = config.testing.browserExecutablePath ? "puppeteer-core" : "puppeteer";
    ensureModuleIds.push(puppeteer);
    if (testingRunOpts.screenshot) {
      config.logger.warn(
        config.logger.yellow(
          `EXPERIMENTAL: screenshot visual diff testing is currently under heavy development and has not reached a stable status. However, any assistance testing would be appreciated.`
        )
      );
    }
  }
  const diagnostics = await ((_a2 = config.sys.lazyRequire) == null ? void 0 : _a2.ensure(config.rootDir, ensureModuleIds));
  if (diagnostics && diagnostics.length > 0) {
    config.logger.printDiagnostics(diagnostics);
    return config.sys.exit(1);
  }
  try {
    const { createTesting } = await import("../testing/index.js");
    const testing = await createTesting(config);
    const passed = await testing.run(testingRunOpts);
    await testing.destroy();
    if (!passed) {
      return config.sys.exit(1);
    }
  } catch (e) {
    config.logger.error(e);
    return config.sys.exit(1);
  }
};

// src/cli/run.ts
var run = async (init) => {
  const { args, logger, sys } = init;
  try {
    const flags = parseFlags(args);
    const task = flags.task;
    if (flags.debug || flags.verbose) {
      logger.setLevel("debug");
    }
    if (flags.ci) {
      logger.enableColors(false);
    }
    if (isFunction(sys.applyGlobalPatch)) {
      sys.applyGlobalPatch(sys.getCurrentDirectory());
    }
    if (task && task === "version" || flags.version) {
      const coreCompiler2 = await loadCoreCompiler(sys);
      console.log(coreCompiler2.version);
      return;
    }
    if (!task || task === "help" || flags.help) {
      await taskHelp(createConfigFlags({ task: "help", args }), logger, sys);
      return;
    }
    startupLog(logger, task);
    const findConfigResults = await findConfig({ sys, configPath: flags.config });
    if (findConfigResults.isErr) {
      logger.printDiagnostics(findConfigResults.value);
      return sys.exit(1);
    }
    const coreCompiler = await loadCoreCompiler(sys);
    startupLogVersion(logger, task, coreCompiler);
    loadedCompilerLog(sys, logger, flags, coreCompiler);
    if (task === "info") {
      taskInfo(coreCompiler, sys, logger);
      return;
    }
    const foundConfig = result_exports.unwrap(findConfigResults);
    const validated = await coreCompiler.loadConfig({
      config: {
        flags
      },
      configPath: foundConfig.configPath,
      logger,
      sys
    });
    if (validated.diagnostics.length > 0) {
      logger.printDiagnostics(validated.diagnostics);
      if (hasError(validated.diagnostics)) {
        return sys.exit(1);
      }
    }
    if (isFunction(sys.applyGlobalPatch)) {
      sys.applyGlobalPatch(validated.config.rootDir);
    }
    await telemetryAction(sys, validated.config, coreCompiler, async () => {
      await runTask(coreCompiler, validated.config, task, sys);
    });
  } catch (e) {
    if (!shouldIgnoreError(e)) {
      const details = `${logger.getLevel() === "debug" && e instanceof Error ? e.stack : ""}`;
      logger.error(`uncaught cli error: ${e}${details}`);
      return sys.exit(1);
    }
  }
};
var runTask = async (coreCompiler, config, task, sys) => {
  var _a2;
  const flags = createConfigFlags((_a2 = config.flags) != null ? _a2 : { task });
  config.flags = flags;
  if (!config.sys) {
    config.sys = sys;
  }
  const strictConfig = coreCompiler.validateConfig(config, {}).config;
  switch (task) {
    case "build":
      await taskBuild(coreCompiler, strictConfig);
      break;
    case "docs":
      await taskDocs(coreCompiler, strictConfig);
      break;
    case "generate":
    case "g":
      await taskGenerate(strictConfig);
      break;
    case "help":
      await taskHelp(strictConfig.flags, strictConfig.logger, sys);
      break;
    case "prerender":
      await taskPrerender(coreCompiler, strictConfig);
      break;
    case "serve":
      await taskServe(strictConfig);
      break;
    case "telemetry":
      await taskTelemetry(strictConfig.flags, sys, strictConfig.logger);
      break;
    case "test":
      await taskTest(strictConfig);
      break;
    case "version":
      console.log(coreCompiler.version);
      break;
    default:
      strictConfig.logger.error(
        `${strictConfig.logger.emoji("\u274C ")}Invalid stencil command, please see the options below:`
      );
      await taskHelp(strictConfig.flags, strictConfig.logger, sys);
      return config.sys.exit(1);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BOOLEAN_CLI_FLAGS,
  parseFlags,
  run,
  runTask
});
