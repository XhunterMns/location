/*
 Stencil Screenshot v4.43.5 | MIT Licensed | https://stenciljs.com
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

// src/screenshot/index.ts
var index_exports = {};
__export(index_exports, {
  ScreenshotConnector: () => ScreenshotConnector,
  ScreenshotLocalConnector: () => ScreenshotLocalConnector
});
module.exports = __toCommonJS(index_exports);

// src/screenshot/connector-base.ts
var import_os = require("os");
var import_path2 = require("path");

// src/screenshot/screenshot-fs.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
function fileExists(filePath) {
  return new Promise((resolve) => {
    import_fs.default.access(filePath, (err2) => resolve(!err2));
  });
}
function readFile(filePath) {
  return new Promise((resolve, reject) => {
    import_fs.default.readFile(filePath, "utf-8", (err2, data) => {
      if (err2) {
        reject(err2);
      } else {
        resolve(data);
      }
    });
  });
}
function readFileBuffer(filePath) {
  return new Promise((resolve, reject) => {
    import_fs.default.readFile(filePath, (err2, data) => {
      if (err2) {
        reject(err2);
      } else {
        resolve(data);
      }
    });
  });
}
function writeFile(filePath, data) {
  return new Promise((resolve, reject) => {
    import_fs.default.writeFile(filePath, data, (err2) => {
      if (err2) {
        reject(err2);
      } else {
        resolve();
      }
    });
  });
}
function mkDir(filePath) {
  return new Promise((resolve) => {
    import_fs.default.mkdir(filePath, () => {
      resolve();
    });
  });
}
function rmDir(filePath) {
  return new Promise((resolve) => {
    import_fs.default.rmdir(filePath, () => {
      resolve();
    });
  });
}
async function emptyDir(dir) {
  const files = await readDir(dir);
  const promises = files.map(async (fileName) => {
    const filePath = import_path.default.join(dir, fileName);
    const isDirFile = await isFile(filePath);
    if (isDirFile) {
      await unlink(filePath);
    }
  });
  await Promise.all(promises);
}
async function readDir(dir) {
  return new Promise((resolve) => {
    import_fs.default.readdir(dir, (err2, files) => {
      if (err2) {
        resolve([]);
      } else {
        resolve(files);
      }
    });
  });
}
async function isFile(itemPath) {
  return new Promise((resolve) => {
    import_fs.default.stat(itemPath, (err2, stat) => {
      if (err2) {
        resolve(false);
      } else {
        resolve(stat.isFile());
      }
    });
  });
}
async function unlink(filePath) {
  return new Promise((resolve) => {
    import_fs.default.unlink(filePath, () => {
      resolve();
    });
  });
}

// src/screenshot/connector-base.ts
var ScreenshotConnector = class {
  rootDir;
  cacheDir;
  packageDir;
  screenshotDirName = "screenshot";
  imagesDirName = "images";
  buildsDirName = "builds";
  masterBuildFileName = "master.json";
  screenshotCacheFileName = "screenshot-cache.json";
  logger;
  buildId;
  buildMessage;
  buildAuthor;
  buildUrl;
  previewUrl;
  buildTimestamp;
  appNamespace;
  screenshotDir;
  imagesDir;
  buildsDir;
  masterBuildFilePath;
  screenshotCacheFilePath;
  currentBuildDir;
  updateMaster;
  allowableMismatchedRatio;
  allowableMismatchedPixels;
  pixelmatchThreshold;
  waitBeforeScreenshot;
  pixelmatchModulePath;
  async initBuild(opts) {
    this.logger = opts.logger;
    this.buildId = opts.buildId;
    this.buildMessage = opts.buildMessage || "";
    this.buildAuthor = opts.buildAuthor;
    this.buildUrl = opts.buildUrl;
    this.previewUrl = opts.previewUrl;
    this.buildTimestamp = typeof opts.buildTimestamp === "number" ? opts.buildTimestamp : Date.now();
    this.cacheDir = opts.cacheDir;
    this.packageDir = opts.packageDir;
    this.rootDir = opts.rootDir;
    this.appNamespace = opts.appNamespace;
    this.waitBeforeScreenshot = opts.waitBeforeScreenshot;
    this.pixelmatchModulePath = opts.pixelmatchModulePath;
    if (!opts.logger) {
      throw new Error(`logger option required`);
    }
    if (typeof opts.buildId !== "string") {
      throw new Error(`buildId option required`);
    }
    if (typeof opts.cacheDir !== "string") {
      throw new Error(`cacheDir option required`);
    }
    if (typeof opts.packageDir !== "string") {
      throw new Error(`packageDir option required`);
    }
    if (typeof opts.rootDir !== "string") {
      throw new Error(`rootDir option required`);
    }
    this.updateMaster = !!opts.updateMaster;
    this.allowableMismatchedPixels = opts.allowableMismatchedPixels;
    this.allowableMismatchedRatio = opts.allowableMismatchedRatio;
    this.pixelmatchThreshold = opts.pixelmatchThreshold;
    this.logger.debug(`screenshot build: ${this.buildId}, ${this.buildMessage}, updateMaster: ${this.updateMaster}`);
    this.logger.debug(
      `screenshot, allowableMismatchedPixels: ${this.allowableMismatchedPixels}, allowableMismatchedRatio: ${this.allowableMismatchedRatio}, pixelmatchThreshold: ${this.pixelmatchThreshold}`
    );
    if (typeof opts.screenshotDirName === "string") {
      this.screenshotDirName = opts.screenshotDirName;
    }
    if (typeof opts.imagesDirName === "string") {
      this.imagesDirName = opts.imagesDirName;
    }
    if (typeof opts.buildsDirName === "string") {
      this.buildsDirName = opts.buildsDirName;
    }
    this.screenshotDir = (0, import_path2.join)(this.rootDir, this.screenshotDirName);
    this.imagesDir = (0, import_path2.join)(this.screenshotDir, this.imagesDirName);
    this.buildsDir = (0, import_path2.join)(this.screenshotDir, this.buildsDirName);
    this.masterBuildFilePath = (0, import_path2.join)(this.buildsDir, this.masterBuildFileName);
    this.screenshotCacheFilePath = (0, import_path2.join)(this.cacheDir, this.screenshotCacheFileName);
    this.currentBuildDir = (0, import_path2.join)((0, import_os.tmpdir)(), "screenshot-build-" + this.buildId);
    this.logger.debug(`screenshotDirPath: ${this.screenshotDir}`);
    this.logger.debug(`imagesDirPath: ${this.imagesDir}`);
    this.logger.debug(`buildsDirPath: ${this.buildsDir}`);
    this.logger.debug(`currentBuildDir: ${this.currentBuildDir}`);
    this.logger.debug(`cacheDir: ${this.cacheDir}`);
    await mkDir(this.screenshotDir);
    await Promise.all([
      mkDir(this.imagesDir),
      mkDir(this.buildsDir),
      mkDir(this.currentBuildDir),
      mkDir(this.cacheDir)
    ]);
  }
  async pullMasterBuild() {
  }
  async getMasterBuild() {
    try {
      const masterBuild = JSON.parse(await readFile(this.masterBuildFilePath));
      return masterBuild;
    } catch (e) {
    }
    return null;
  }
  async completeBuild(masterBuild) {
    const filePaths = (await readDir(this.currentBuildDir)).map((f) => (0, import_path2.join)(this.currentBuildDir, f)).filter((f) => f.endsWith(".json"));
    const screenshots = await Promise.all(filePaths.map(async (f) => JSON.parse(await readFile(f))));
    this.sortScreenshots(screenshots);
    if (!masterBuild) {
      masterBuild = {
        id: this.buildId,
        message: this.buildMessage,
        author: this.buildAuthor,
        url: this.buildUrl,
        previewUrl: this.previewUrl,
        appNamespace: this.appNamespace,
        timestamp: this.buildTimestamp,
        screenshots
      };
    }
    const results = {
      appNamespace: this.appNamespace,
      masterBuild,
      currentBuild: {
        id: this.buildId,
        message: this.buildMessage,
        author: this.buildAuthor,
        url: this.buildUrl,
        previewUrl: this.previewUrl,
        appNamespace: this.appNamespace,
        timestamp: this.buildTimestamp,
        screenshots
      },
      compare: {
        id: `${masterBuild.id}-${this.buildId}`,
        a: {
          id: masterBuild.id,
          message: masterBuild.message,
          author: masterBuild.author,
          url: masterBuild.url,
          previewUrl: masterBuild.previewUrl
        },
        b: {
          id: this.buildId,
          message: this.buildMessage,
          author: this.buildAuthor,
          url: this.buildUrl,
          previewUrl: this.previewUrl
        },
        url: null,
        appNamespace: this.appNamespace,
        timestamp: this.buildTimestamp,
        diffs: []
      }
    };
    results.currentBuild.screenshots.forEach((screenshot) => {
      screenshot.diff.device = screenshot.diff.device || screenshot.diff.userAgent;
      results.compare.diffs.push(screenshot.diff);
      delete screenshot.diff;
    });
    this.sortCompares(results.compare.diffs);
    await emptyDir(this.currentBuildDir);
    await rmDir(this.currentBuildDir);
    return results;
  }
  async publishBuild(results) {
    return results;
  }
  async generateJsonpDataUris(build) {
    if (build && Array.isArray(build.screenshots)) {
      for (let i = 0; i < build.screenshots.length; i++) {
        const screenshot = build.screenshots[i];
        const jsonpFileName = `screenshot_${screenshot.image}.js`;
        const jsonFilePath = (0, import_path2.join)(this.cacheDir, jsonpFileName);
        const jsonpExists = await fileExists(jsonFilePath);
        if (!jsonpExists) {
          const imageFilePath = (0, import_path2.join)(this.imagesDir, screenshot.image);
          const imageBuf = await readFileBuffer(imageFilePath);
          const jsonpContent = `loadScreenshot("${screenshot.image}","data:image/png;base64,${imageBuf.toString(
            "base64"
          )}");`;
          await writeFile(jsonFilePath, jsonpContent);
        }
      }
    }
  }
  async getScreenshotCache() {
    return null;
  }
  async updateScreenshotCache(screenshotCache, buildResults) {
    screenshotCache = screenshotCache || {};
    screenshotCache.timestamp = this.buildTimestamp;
    screenshotCache.lastBuildId = this.buildId;
    screenshotCache.size = 0;
    screenshotCache.items = screenshotCache.items || [];
    if (buildResults && buildResults.compare && Array.isArray(buildResults.compare.diffs)) {
      buildResults.compare.diffs.forEach((diff) => {
        if (typeof diff.cacheKey !== "string") {
          return;
        }
        if (diff.imageA === diff.imageB) {
          return;
        }
        const existingItem = screenshotCache.items.find((i) => i.key === diff.cacheKey);
        if (existingItem) {
          existingItem.ts = this.buildTimestamp;
        } else {
          screenshotCache.items.push({
            key: diff.cacheKey,
            ts: this.buildTimestamp,
            mp: diff.mismatchedPixels
          });
        }
      });
    }
    screenshotCache.items.sort((a, b) => {
      if (a.ts > b.ts) return -1;
      if (a.ts < b.ts) return 1;
      if (a.mp > b.mp) return -1;
      if (a.mp < b.mp) return 1;
      return 0;
    });
    screenshotCache.items = screenshotCache.items.slice(0, 1e3);
    screenshotCache.size = screenshotCache.items.length;
    return screenshotCache;
  }
  toJson(masterBuild, screenshotCache) {
    const masterScreenshots = {};
    if (masterBuild && Array.isArray(masterBuild.screenshots)) {
      masterBuild.screenshots.forEach((masterScreenshot) => {
        masterScreenshots[masterScreenshot.id] = masterScreenshot.image;
      });
    }
    const mismatchCache = {};
    if (screenshotCache && Array.isArray(screenshotCache.items)) {
      screenshotCache.items.forEach((cacheItem) => {
        mismatchCache[cacheItem.key] = cacheItem.mp;
      });
    }
    const screenshotBuild = {
      buildId: this.buildId,
      rootDir: this.rootDir,
      screenshotDir: this.screenshotDir,
      imagesDir: this.imagesDir,
      buildsDir: this.buildsDir,
      masterScreenshots,
      cache: mismatchCache,
      currentBuildDir: this.currentBuildDir,
      updateMaster: this.updateMaster,
      allowableMismatchedPixels: this.allowableMismatchedPixels,
      allowableMismatchedRatio: this.allowableMismatchedRatio,
      pixelmatchThreshold: this.pixelmatchThreshold,
      timeoutBeforeScreenshot: this.waitBeforeScreenshot,
      pixelmatchModulePath: this.pixelmatchModulePath
    };
    return JSON.stringify(screenshotBuild);
  }
  sortScreenshots(screenshots) {
    return screenshots.sort((a, b) => {
      if (a.desc && b.desc) {
        if (a.desc.toLowerCase() < b.desc.toLowerCase()) return -1;
        if (a.desc.toLowerCase() > b.desc.toLowerCase()) return 1;
      }
      if (a.device && b.device) {
        if (a.device.toLowerCase() < b.device.toLowerCase()) return -1;
        if (a.device.toLowerCase() > b.device.toLowerCase()) return 1;
      }
      if (a.userAgent && b.userAgent) {
        if (a.userAgent.toLowerCase() < b.userAgent.toLowerCase()) return -1;
        if (a.userAgent.toLowerCase() > b.userAgent.toLowerCase()) return 1;
      }
      if (a.width < b.width) return -1;
      if (a.width > b.width) return 1;
      if (a.height < b.height) return -1;
      if (a.height > b.height) return 1;
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
  }
  sortCompares(compares) {
    return compares.sort((a, b) => {
      if (a.allowableMismatchedPixels > b.allowableMismatchedPixels) return -1;
      if (a.allowableMismatchedPixels < b.allowableMismatchedPixels) return 1;
      if (a.allowableMismatchedRatio > b.allowableMismatchedRatio) return -1;
      if (a.allowableMismatchedRatio < b.allowableMismatchedRatio) return 1;
      if (a.desc && b.desc) {
        if (a.desc.toLowerCase() < b.desc.toLowerCase()) return -1;
        if (a.desc.toLowerCase() > b.desc.toLowerCase()) return 1;
      }
      if (a.device && b.device) {
        if (a.device.toLowerCase() < b.device.toLowerCase()) return -1;
        if (a.device.toLowerCase() > b.device.toLowerCase()) return 1;
      }
      if (a.userAgent && b.userAgent) {
        if (a.userAgent.toLowerCase() < b.userAgent.toLowerCase()) return -1;
        if (a.userAgent.toLowerCase() > b.userAgent.toLowerCase()) return 1;
      }
      if (a.width < b.width) return -1;
      if (a.width > b.width) return 1;
      if (a.height < b.height) return -1;
      if (a.height > b.height) return 1;
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
  }
};

// src/utils/path.ts
var normalizePath = (path3, relativize = true) => {
  if (typeof path3 !== "string") {
    throw new Error(`invalid path to normalize`);
  }
  path3 = normalizeSlashes(path3.trim());
  const components = pathComponents(path3, getRootLength(path3));
  const reducedComponents = reducePathComponents(components);
  const rootPart = reducedComponents[0];
  const secondPart = reducedComponents[1];
  const normalized = rootPart + reducedComponents.slice(1).join("/");
  if (normalized === "") {
    return ".";
  }
  if (rootPart === "" && secondPart && path3.includes("/") && !secondPart.startsWith(".") && !secondPart.startsWith("@") && relativize) {
    return "./" + normalized;
  }
  return normalized;
};
var normalizeSlashes = (path3) => path3.replace(backslashRegExp, "/");
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
var getRootLength = (path3) => {
  const rootLength = getEncodedRootLength(path3);
  return rootLength < 0 ? ~rootLength : rootLength;
};
var getEncodedRootLength = (path3) => {
  if (!path3) return 0;
  const ch0 = path3.charCodeAt(0);
  if (ch0 === 47 /* slash */ || ch0 === 92 /* backslash */) {
    if (path3.charCodeAt(1) !== ch0) return 1;
    const p1 = path3.indexOf(ch0 === 47 /* slash */ ? "/" : altDirectorySeparator, 2);
    if (p1 < 0) return path3.length;
    return p1 + 1;
  }
  if (isVolumeCharacter(ch0) && path3.charCodeAt(1) === 58 /* colon */) {
    const ch2 = path3.charCodeAt(2);
    if (ch2 === 47 /* slash */ || ch2 === 92 /* backslash */) return 3;
    if (path3.length === 2) return 2;
  }
  const schemeEnd = path3.indexOf(urlSchemeSeparator);
  if (schemeEnd !== -1) {
    const authorityStart = schemeEnd + urlSchemeSeparator.length;
    const authorityEnd = path3.indexOf("/", authorityStart);
    if (authorityEnd !== -1) {
      const scheme = path3.slice(0, schemeEnd);
      const authority = path3.slice(authorityStart, authorityEnd);
      if (scheme === "file" && (authority === "" || authority === "localhost") && isVolumeCharacter(path3.charCodeAt(authorityEnd + 1))) {
        const volumeSeparatorEnd = getFileUrlVolumeSeparatorEnd(path3, authorityEnd + 2);
        if (volumeSeparatorEnd !== -1) {
          if (path3.charCodeAt(volumeSeparatorEnd) === 47 /* slash */) {
            return ~(volumeSeparatorEnd + 1);
          }
          if (volumeSeparatorEnd === path3.length) {
            return ~volumeSeparatorEnd;
          }
        }
      }
      return ~(authorityEnd + 1);
    }
    return ~path3.length;
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
var pathComponents = (path3, rootLength) => {
  const root = path3.substring(0, rootLength);
  const rest = path3.substring(rootLength).split("/");
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

// src/screenshot/connector-local.ts
var import_path4 = require("path");
var ScreenshotLocalConnector = class extends ScreenshotConnector {
  async publishBuild(results) {
    if (this.updateMaster || !results.masterBuild) {
      results.masterBuild = {
        id: "master",
        message: "Master",
        appNamespace: this.appNamespace,
        timestamp: Date.now(),
        screenshots: []
      };
    }
    results.currentBuild.screenshots.forEach((currentScreenshot) => {
      const masterHasScreenshot = results.masterBuild.screenshots.some((masterScreenshot) => {
        return currentScreenshot.id === masterScreenshot.id;
      });
      if (!masterHasScreenshot) {
        results.masterBuild.screenshots.push(Object.assign({}, currentScreenshot));
      }
    });
    this.sortScreenshots(results.masterBuild.screenshots);
    await writeFile(this.masterBuildFilePath, JSON.stringify(results.masterBuild, null, 2));
    await this.generateJsonpDataUris(results.currentBuild);
    const compareAppSourceDir = (0, import_path4.join)(this.packageDir, "screenshot", "compare");
    const appSrcUrl = normalizePath((0, import_path4.relative)(this.screenshotDir, compareAppSourceDir));
    const imagesUrl = normalizePath((0, import_path4.relative)(this.screenshotDir, this.imagesDir));
    const jsonpUrl = normalizePath((0, import_path4.relative)(this.screenshotDir, this.cacheDir));
    const compareAppHtml = createLocalCompareApp(
      this.appNamespace,
      appSrcUrl,
      imagesUrl,
      jsonpUrl,
      results.masterBuild,
      results.currentBuild
    );
    const compareAppFileName = "compare.html";
    const compareAppFilePath = (0, import_path4.join)(this.screenshotDir, compareAppFileName);
    await writeFile(compareAppFilePath, compareAppHtml);
    const gitIgnorePath = (0, import_path4.join)(this.screenshotDir, ".gitignore");
    const gitIgnoreExists = await fileExists(gitIgnorePath);
    if (!gitIgnoreExists) {
      const content = [this.imagesDirName, this.buildsDirName, compareAppFileName];
      await writeFile(gitIgnorePath, content.join("\n"));
    }
    const url = new URL(`file://${compareAppFilePath}`);
    results.compare.url = url.href;
    return results;
  }
  async getScreenshotCache() {
    let screenshotCache = null;
    try {
      screenshotCache = JSON.parse(await readFile(this.screenshotCacheFilePath));
    } catch (e) {
    }
    return screenshotCache;
  }
  async updateScreenshotCache(cache, buildResults) {
    cache = await super.updateScreenshotCache(cache, buildResults);
    await writeFile(this.screenshotCacheFilePath, JSON.stringify(cache, null, 2));
    return cache;
  }
};
function createLocalCompareApp(namespace, appSrcUrl, imagesUrl, jsonpUrl, a, b) {
  return `<!doctype html>
<html dir="ltr" lang="en">
<head>
  <meta charset="utf-8">
  <title>Local ${namespace || ""} - Stencil Screenshot Visual Diff</title>
  <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta http-equiv="x-ua-compatible" content="IE=Edge">
  <link href="${appSrcUrl}/build/app.css" rel="stylesheet">
  <script type="module" src="${appSrcUrl}/build/app.esm.js"></script>
  <script nomodule src="${appSrcUrl}/build/app.js"></script>
  <link rel="icon" type="image/x-icon" href="${appSrcUrl}/assets/favicon.ico">
</head>
<body>
  <script>
    (function() {
      var app = document.createElement('screenshot-compare');
      app.appSrcUrl = '${appSrcUrl}';
      app.imagesUrl = '${imagesUrl}/';
      app.jsonpUrl = '${jsonpUrl}/';
      app.a = ${JSON.stringify(a)};
      app.b = ${JSON.stringify(b)};
      document.body.appendChild(app);
    })();
  </script>
</body>
</html>`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ScreenshotConnector,
  ScreenshotLocalConnector
});
