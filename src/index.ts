import { EventEmitter } from "eventemitter3";
import Render from "./render";

declare global {
 interface Window {
  Connect: any;
 }
}

class Connect {
 hook: string;
 payload: any;
 domain: string;
 session: string;
 ee: any;
 env: string;
 getOrigin: any;

 constructor(props) {
  this.domain = window.location.origin;
  this.session = props.session;
  this.ee = new EventEmitter();
  this.env = props.env;
  this.getOrigin = (env: string | void) => {
   switch (env || this.env) {
    case "sandbox":
     return "https://sandbox.quanto.app";
    case "production":
     return "https://connect.quanto.app";
    default:
     return this.env || this.getOrigin("production");
   }
  };
  this.handlerMessageListener();
  this.renderIframe();
 }

 renderIframe() {
  Render(`${this.getOrigin()}/?hsession=${this.session}`, this.domain);
 }

 handleMessage(event) {
  console.log("Evento, ", event);
  const { origin, data } = event;
  const { hook, payload } = data;
  console.log(origin, this.env);
  if (origin !== this.getOrigin()) return;
  this.payload = payload;
  this.ee.emit(hook);
 }

 handlerMessageListener() {
  window.addEventListener("message", (event) => {
   const { origin, data } = event;
   const { hook, payload } = data;
   if (origin !== this.getOrigin()) return;
   this.payload = payload;
   this.ee.emit(hook);
  });
 }

 onLoad(callback) {
  this.ee.on("onload", () => {
   callback();
  });
 }

 onSuccess(callback) {
  this.ee.on("onsuccess", () => {
   callback();
   const ct = document.querySelector("#connect-embedded");
   if (ct !== null) ct.remove();
  });
 }

 onExit(callback) {
  this.ee.on("onexit", () => {
   callback();
   const ct = document.querySelector("#connect-embedded");
   if (ct !== null) ct.remove();
  });
 }

 onGrantedPermission(callback) {
  this.ee.on("ongrantedpermission", () => {
   callback(this.payload);
  });
 }

 onAuthSuccess(callback) {
  this.ee.on("onauthsuccess", () => {
   callback(this.payload);
  });
 }

 onAuthFail(callback) {
  this.ee.on("onauthfail", () => {
   callback(this.payload);
  });
 }

 onSelectBank(callback) {
  this.ee.on("onselectbank", () => {
   callback(this.payload);
  });
 }

 onAddAccountSuccess(callback) {
  this.ee.on("onaddaccountsuccess", () => {
   callback(this.payload);
  });
 }
}

window.Connect = window.Connect || Connect;
