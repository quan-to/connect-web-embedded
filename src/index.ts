import './globalthis-polyfill'
import Render from "./render";
import { createPostMessageListener } from './observable'

declare global {
 interface Window {
  Connect: any;
 }
}

export class Connect {
 hook: string;
 payload: any;
 domain: string;
 session: string;
 ee: any;
 env: string;
 getOrigin: any;
 createPostMessage: any;
 _callback: {
    onLoad: any,
    onSuccess: any,
    onExit: any,
    onGrantedPermission: any,
    onAddAccountSuccess: any,
    onAuthSuccess: any,
    onAuthFail: any,
    onSelectBank: any
 };

 constructor(props) {
  this.domain = globalThis.location.origin;
  this.session = props.session;
  this.env = props.env;
  this.getOrigin = (env: string | void) => {
   switch (env || this.env) {
    case "sandbox":
     return "https://connect.sandbox.quanto.app";
    case "production":
     return "https://connect.quanto.app";
    default:
     return this.env || this.getOrigin("production");
   }
  };
   this._callback = {
     onAddAccountSuccess: () => { },
     onAuthSuccess: () => { },
     onAuthFail: () => { },
     onExit: () => { },
     onGrantedPermission: () => { },
     onLoad: () => { },
     onSelectBank: () => { },
     onSuccess: () => { }
   }
  this.renderIframe();
   this.createPostMessage = createPostMessageListener({
     getOrigin: this.getOrigin,
     payloads: this.payload,
     hooks: this.hook
  });
  this.createPostMessage.subscribe(this.handleHookAction.bind(this))
 }

 renderIframe() {
  Render(`${this.getOrigin()}/?hsession=${this.session}`, this.domain);
 }

  
  onLoad(callback) {
    this._callback.onLoad = callback
  }

  onSuccess(callback) {
    this._callback.onSuccess = callback
 }

  onExit(callback) {
    this._callback.onExit = callback
 }

  onGrantedPermission(callback) {
    this._callback.onGrantedPermission = callback
 }

  onAuthSuccess(callback) {
    this._callback.onAuthSuccess = callback
 }

  onAuthFail(callback) {
    this._callback.onAuthFail = callback
 }

  onSelectBank(callback) {
    this._callback.onSelectBank = callback
 }

  onAddAccountSuccess(callback) {
    this._callback.onAddAccountSuccess = callback
 }
 
  
  handleHookAction = (hook) => {
    if (!this._callback) return console.log('Callback undefined')
    const { onLoad, onExit,onSuccess, onGrantedPermission, onAuthSuccess, onAuthFail, onSelectBank, onAddAccountSuccess } = this._callback
    
    if (hook === "onload") return onLoad()

    if (hook === "onsuccess") {
      const valueHTML = document.getElementsByTagName("iframe")
      Array.from(valueHTML).forEach(va => va.id.includes("connect-embedded") ? va.remove() : null);
      return onSuccess()
    }
    if(hook === "ongrantedpermission") return onGrantedPermission(this.payload)
    if(hook === "onauthsuccess") return onAuthSuccess(this.payload)
    if(hook === "onauthfail") return onAuthFail(this.payload)
    if(hook === "onselectbank") return onSelectBank(this.payload)
    if (hook === "onaddaccountsuccess") return onAddAccountSuccess(this.payload)
    
   if (hook === "onexit") {
     const valueHTML = document.getElementsByTagName("iframe");
     Array.from(valueHTML).forEach(va => va.id.includes("connect-embedded") ? va.remove() : null);
    return onExit()
  }
}
}

globalThis.Connect = globalThis.Connect || Connect;
