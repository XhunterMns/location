import {
  d
} from "./chunk-6QVAYI7G.js";
import {
  f,
  n
} from "./chunk-CN5C4E5W.js";
import {
  __async
} from "./chunk-WDMUDEB6.js";

// node_modules/@ionic/core/components/p-Bz0dSlXZ.js
var o = () => n.get("experimentalCloseWatcher", false) && void 0 !== d && "CloseWatcher" in d;
var i = () => {
  document.addEventListener("backbutton", () => {
  });
};
var r = () => {
  const e = document;
  let i2 = false;
  const r2 = () => {
    if (i2) return;
    let t = 0, o2 = [];
    const r3 = new CustomEvent("ionBackButton", { bubbles: false, detail: { register(e2, n2) {
      o2.push({ priority: e2, handler: n2, id: t++ });
    } } });
    e.dispatchEvent(r3);
    const a2 = () => {
      if (o2.length > 0) {
        let t2 = { priority: Number.MIN_SAFE_INTEGER, handler: () => {
        }, id: -1 };
        o2.forEach((e2) => {
          e2.priority >= t2.priority && (t2 = e2);
        }), i2 = true, o2 = o2.filter((e2) => e2.id !== t2.id), ((t3) => __async(void 0, null, function* () {
          try {
            if (null == t3 ? void 0 : t3.handler) {
              const e2 = t3.handler(a2);
              null != e2 && (yield e2);
            }
          } catch (t4) {
            f("[ion-app] - Exception in startHardwareBackButton:", t4);
          }
        }))(t2).then(() => i2 = false);
      }
    };
    a2();
  };
  if (o()) {
    let e2;
    const n2 = () => {
      null == e2 || e2.destroy(), e2 = new d.CloseWatcher(), e2.onclose = () => {
        r2(), n2();
      };
    };
    n2();
  } else e.addEventListener("backbutton", r2);
};
var a = 100;
var c = 99;

export {
  o,
  i,
  r,
  a,
  c
};
/*! Bundled license information:

@ionic/core/components/p-Bz0dSlXZ.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=chunk-B7FAIJJ4.js.map
