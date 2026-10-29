import {
  d
} from "./chunk-6QVAYI7G.js";

// node_modules/@ionic/core/components/p-CIGNaXM1.js
var r = () => {
  if (void 0 !== d) return d.Capacitor;
};

// node_modules/@ionic/core/components/p-D13Eaw-8.js
var n;
var i;
!function(o) {
  o.Unimplemented = "UNIMPLEMENTED", o.Unavailable = "UNAVAILABLE";
}(n || (n = {})), function(o) {
  o.Body = "body", o.Ionic = "ionic", o.Native = "native", o.None = "none";
}(i || (i = {}));
var t = { getEngine() {
  const n2 = r();
  if (null == n2 ? void 0 : n2.isPluginAvailable("Keyboard")) return n2.Plugins.Keyboard;
}, getResizeMode() {
  const o = this.getEngine();
  return (null == o ? void 0 : o.getResizeMode) ? o.getResizeMode().catch((o2) => {
    if (o2.code !== n.Unimplemented) throw o2;
  }) : Promise.resolve(void 0);
} };

export {
  r,
  i,
  t
};
/*! Bundled license information:

@ionic/core/components/p-CIGNaXM1.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/p-D13Eaw-8.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=chunk-QHH5CHKT.js.map
