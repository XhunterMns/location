/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import"./p-tcQvqkiX.js";const t=(t,e,i=["item-multiple-inputs"])=>{const n=t.closest("ion-item");if(!n||"undefined"==typeof MutationObserver)return;const r=()=>i.map((t=>n.classList.contains(t))).join(",");let s=r();const o=new MutationObserver((()=>{const t=r();t!==s&&(s=t,e())}));return o.observe(n,{attributes:!0,attributeFilter:["class"]}),o};export{t as c}