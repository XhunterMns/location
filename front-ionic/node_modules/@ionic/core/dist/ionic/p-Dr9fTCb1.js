/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{a as o,w as s}from"./p-tcQvqkiX.js";import{a as t,s as a}from"./p-Cd4H8ft-.js";import{c as r}from"./p-DZaO33Mw.js";import"./p-o8OKV5aD.js";const i=()=>{const i=window;i.addEventListener("statusTap",(()=>{o((()=>{const o=document.elementFromPoint(i.innerWidth/2,i.innerHeight/2);if(!o)return;const n=t(o);n&&new Promise((o=>r(n,o))).then((()=>{s((async()=>{n.style.setProperty("--overflow","hidden"),await a(n,300),n.style.removeProperty("--overflow")}))}))}))}))};export{i as startStatusTap}