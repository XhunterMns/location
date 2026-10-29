import {
  I,
  r
} from "./chunk-NSODBGUP.js";

// node_modules/@ionic/core/components/p-Dw7GNDKq.js
var i = (i2, r2) => {
  var a, n, e;
  const s = "40px", c = "back" === r2.direction, l = r2.leavingEl, p = I(r2.enteringEl), b = p.querySelector("ion-toolbar"), u = r();
  if (u.addElement(p).fill("both").beforeRemoveClass("ion-page-invisible"), c ? u.duration((null !== (a = r2.duration) && void 0 !== a ? a : 0) || 200).easing("cubic-bezier(0.47,0,0.745,0.715)") : u.duration((null !== (n = r2.duration) && void 0 !== n ? n : 0) || 280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform", `translateY(${s})`, "translateY(0px)").fromTo("opacity", 0.01, 1), b) {
    const t = r();
    t.addElement(b), u.addAnimation(t);
  }
  if (l && c) {
    u.duration((null !== (e = r2.duration) && void 0 !== e ? e : 0) || 200).easing("cubic-bezier(0.47,0,0.745,0.715)");
    const i3 = r();
    i3.addElement(I(l)).onFinish((o) => {
      1 === o && i3.elements.length > 0 && i3.elements[0].style.setProperty("display", "none");
    }).fromTo("transform", "translateY(0px)", `translateY(${s})`).fromTo("opacity", 1, 0), u.addAnimation(i3);
  }
  return u;
};

export {
  i
};
/*! Bundled license information:

@ionic/core/components/p-Dw7GNDKq.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=chunk-YCWYCWZO.js.map
