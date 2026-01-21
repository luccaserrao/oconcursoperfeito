var Ef=e=>{throw TypeError(e)};var Hc=(e,r,n)=>r.has(e)||Ef("Cannot "+n);var T=(e,r,n)=>(Hc(e,r,"read from private field"),n?n.call(e):r.get(e)),Z=(e,r,n)=>r.has(e)?Ef("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(e):r.set(e,n),K=(e,r,n,t)=>(Hc(e,r,"write to private field"),t?t.call(e,n):r.set(e,n),n),de=(e,r,n)=>(Hc(e,r,"access private method"),n);var Pi=(e,r,n,t)=>({set _(a){K(e,r,a,n)},get _(){return T(e,r,t)}});function M1(e,r){for(var n=0;n<r.length;n++){const t=r[n];if(typeof t!="string"&&!Array.isArray(t)){for(const a in t)if(a!=="default"&&!(a in e)){const o=Object.getOwnPropertyDescriptor(t,a);o&&Object.defineProperty(e,a,o.get?o:{enumerable:!0,get:()=>t[a]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();var bl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function na(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Dv={exports:{}},ic={},Bv={exports:{}},ue={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pi=Symbol.for("react.element"),L1=Symbol.for("react.portal"),F1=Symbol.for("react.fragment"),D1=Symbol.for("react.strict_mode"),B1=Symbol.for("react.profiler"),$1=Symbol.for("react.provider"),U1=Symbol.for("react.context"),V1=Symbol.for("react.forward_ref"),H1=Symbol.for("react.suspense"),Q1=Symbol.for("react.memo"),W1=Symbol.for("react.lazy"),kf=Symbol.iterator;function G1(e){return e===null||typeof e!="object"?null:(e=kf&&e[kf]||e["@@iterator"],typeof e=="function"?e:null)}var $v={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Uv=Object.assign,Vv={};function Wo(e,r,n){this.props=e,this.context=r,this.refs=Vv,this.updater=n||$v}Wo.prototype.isReactComponent={};Wo.prototype.setState=function(e,r){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,r,"setState")};Wo.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Hv(){}Hv.prototype=Wo.prototype;function Pm(e,r,n){this.props=e,this.context=r,this.refs=Vv,this.updater=n||$v}var Tm=Pm.prototype=new Hv;Tm.constructor=Pm;Uv(Tm,Wo.prototype);Tm.isPureReactComponent=!0;var Pf=Array.isArray,Qv=Object.prototype.hasOwnProperty,zm={current:null},Wv={key:!0,ref:!0,__self:!0,__source:!0};function Gv(e,r,n){var t,a={},o=null,s=null;if(r!=null)for(t in r.ref!==void 0&&(s=r.ref),r.key!==void 0&&(o=""+r.key),r)Qv.call(r,t)&&!Wv.hasOwnProperty(t)&&(a[t]=r[t]);var l=arguments.length-2;if(l===1)a.children=n;else if(1<l){for(var c=Array(l),u=0;u<l;u++)c[u]=arguments[u+2];a.children=c}if(e&&e.defaultProps)for(t in l=e.defaultProps,l)a[t]===void 0&&(a[t]=l[t]);return{$$typeof:pi,type:e,key:o,ref:s,props:a,_owner:zm.current}}function Y1(e,r){return{$$typeof:pi,type:e.type,key:r,ref:e.ref,props:e.props,_owner:e._owner}}function Am(e){return typeof e=="object"&&e!==null&&e.$$typeof===pi}function K1(e){var r={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return r[n]})}var Tf=/\/+/g;function Qc(e,r){return typeof e=="object"&&e!==null&&e.key!=null?K1(""+e.key):r.toString(36)}function rl(e,r,n,t,a){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case pi:case L1:s=!0}}if(s)return s=e,a=a(s),e=t===""?"."+Qc(s,0):t,Pf(a)?(n="",e!=null&&(n=e.replace(Tf,"$&/")+"/"),rl(a,r,n,"",function(u){return u})):a!=null&&(Am(a)&&(a=Y1(a,n+(!a.key||s&&s.key===a.key?"":(""+a.key).replace(Tf,"$&/")+"/")+e)),r.push(a)),1;if(s=0,t=t===""?".":t+":",Pf(e))for(var l=0;l<e.length;l++){o=e[l];var c=t+Qc(o,l);s+=rl(o,r,n,c,a)}else if(c=G1(e),typeof c=="function")for(e=c.call(e),l=0;!(o=e.next()).done;)o=o.value,c=t+Qc(o,l++),s+=rl(o,r,n,c,a);else if(o==="object")throw r=String(e),Error("Objects are not valid as a React child (found: "+(r==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":r)+"). If you meant to render a collection of children, use an array instead.");return s}function Ti(e,r,n){if(e==null)return e;var t=[],a=0;return rl(e,t,"","",function(o){return r.call(n,o,a++)}),t}function X1(e){if(e._status===-1){var r=e._result;r=r(),r.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=r)}if(e._status===1)return e._result.default;throw e._result}var yr={current:null},nl={transition:null},J1={ReactCurrentDispatcher:yr,ReactCurrentBatchConfig:nl,ReactCurrentOwner:zm};function Yv(){throw Error("act(...) is not supported in production builds of React.")}ue.Children={map:Ti,forEach:function(e,r,n){Ti(e,function(){r.apply(this,arguments)},n)},count:function(e){var r=0;return Ti(e,function(){r++}),r},toArray:function(e){return Ti(e,function(r){return r})||[]},only:function(e){if(!Am(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};ue.Component=Wo;ue.Fragment=F1;ue.Profiler=B1;ue.PureComponent=Pm;ue.StrictMode=D1;ue.Suspense=H1;ue.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=J1;ue.act=Yv;ue.cloneElement=function(e,r,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var t=Uv({},e.props),a=e.key,o=e.ref,s=e._owner;if(r!=null){if(r.ref!==void 0&&(o=r.ref,s=zm.current),r.key!==void 0&&(a=""+r.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in r)Qv.call(r,c)&&!Wv.hasOwnProperty(c)&&(t[c]=r[c]===void 0&&l!==void 0?l[c]:r[c])}var c=arguments.length-2;if(c===1)t.children=n;else if(1<c){l=Array(c);for(var u=0;u<c;u++)l[u]=arguments[u+2];t.children=l}return{$$typeof:pi,type:e.type,key:a,ref:o,props:t,_owner:s}};ue.createContext=function(e){return e={$$typeof:U1,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:$1,_context:e},e.Consumer=e};ue.createElement=Gv;ue.createFactory=function(e){var r=Gv.bind(null,e);return r.type=e,r};ue.createRef=function(){return{current:null}};ue.forwardRef=function(e){return{$$typeof:V1,render:e}};ue.isValidElement=Am;ue.lazy=function(e){return{$$typeof:W1,_payload:{_status:-1,_result:e},_init:X1}};ue.memo=function(e,r){return{$$typeof:Q1,type:e,compare:r===void 0?null:r}};ue.startTransition=function(e){var r=nl.transition;nl.transition={};try{e()}finally{nl.transition=r}};ue.unstable_act=Yv;ue.useCallback=function(e,r){return yr.current.useCallback(e,r)};ue.useContext=function(e){return yr.current.useContext(e)};ue.useDebugValue=function(){};ue.useDeferredValue=function(e){return yr.current.useDeferredValue(e)};ue.useEffect=function(e,r){return yr.current.useEffect(e,r)};ue.useId=function(){return yr.current.useId()};ue.useImperativeHandle=function(e,r,n){return yr.current.useImperativeHandle(e,r,n)};ue.useInsertionEffect=function(e,r){return yr.current.useInsertionEffect(e,r)};ue.useLayoutEffect=function(e,r){return yr.current.useLayoutEffect(e,r)};ue.useMemo=function(e,r){return yr.current.useMemo(e,r)};ue.useReducer=function(e,r,n){return yr.current.useReducer(e,r,n)};ue.useRef=function(e){return yr.current.useRef(e)};ue.useState=function(e){return yr.current.useState(e)};ue.useSyncExternalStore=function(e,r,n){return yr.current.useSyncExternalStore(e,r,n)};ue.useTransition=function(){return yr.current.useTransition()};ue.version="18.3.1";Bv.exports=ue;var x=Bv.exports;const D=na(x),qm=M1({__proto__:null,default:D},[x]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Z1=x,ej=Symbol.for("react.element"),rj=Symbol.for("react.fragment"),nj=Object.prototype.hasOwnProperty,tj=Z1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,aj={key:!0,ref:!0,__self:!0,__source:!0};function Kv(e,r,n){var t,a={},o=null,s=null;n!==void 0&&(o=""+n),r.key!==void 0&&(o=""+r.key),r.ref!==void 0&&(s=r.ref);for(t in r)nj.call(r,t)&&!aj.hasOwnProperty(t)&&(a[t]=r[t]);if(e&&e.defaultProps)for(t in r=e.defaultProps,r)a[t]===void 0&&(a[t]=r[t]);return{$$typeof:ej,type:e,key:o,ref:s,props:a,_owner:tj.current}}ic.Fragment=rj;ic.jsx=Kv;ic.jsxs=Kv;Dv.exports=ic;var i=Dv.exports,Xv={exports:{}},Gr={},Jv={exports:{}},Zv={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function r(q,O){var S=q.length;q.push(O);e:for(;0<S;){var Y=S-1>>>1,F=q[Y];if(0<a(F,O))q[Y]=O,q[S]=F,S=Y;else break e}}function n(q){return q.length===0?null:q[0]}function t(q){if(q.length===0)return null;var O=q[0],S=q.pop();if(S!==O){q[0]=S;e:for(var Y=0,F=q.length,C=F>>>1;Y<C;){var W=2*(Y+1)-1,re=q[W],te=W+1,X=q[te];if(0>a(re,S))te<F&&0>a(X,re)?(q[Y]=X,q[te]=S,Y=te):(q[Y]=re,q[W]=S,Y=W);else if(te<F&&0>a(X,S))q[Y]=X,q[te]=S,Y=te;else break e}}return O}function a(q,O){var S=q.sortIndex-O.sortIndex;return S!==0?S:q.id-O.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var s=Date,l=s.now();e.unstable_now=function(){return s.now()-l}}var c=[],u=[],d=1,m=null,f=3,p=!1,y=!1,g=!1,b=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function w(q){for(var O=n(u);O!==null;){if(O.callback===null)t(u);else if(O.startTime<=q)t(u),O.sortIndex=O.expirationTime,r(c,O);else break;O=n(u)}}function j(q){if(g=!1,w(q),!y)if(n(c)!==null)y=!0,Q(E);else{var O=n(u);O!==null&&R(j,O.startTime-q)}}function E(q,O){y=!1,g&&(g=!1,h(k),k=-1),p=!0;var S=f;try{for(w(O),m=n(c);m!==null&&(!(m.expirationTime>O)||q&&!I());){var Y=m.callback;if(typeof Y=="function"){m.callback=null,f=m.priorityLevel;var F=Y(m.expirationTime<=O);O=e.unstable_now(),typeof F=="function"?m.callback=F:m===n(c)&&t(c),w(O)}else t(c);m=n(c)}if(m!==null)var C=!0;else{var W=n(u);W!==null&&R(j,W.startTime-O),C=!1}return C}finally{m=null,f=S,p=!1}}var N=!1,P=null,k=-1,z=5,A=-1;function I(){return!(e.unstable_now()-A<z)}function _(){if(P!==null){var q=e.unstable_now();A=q;var O=!0;try{O=P(!0,q)}finally{O?V():(N=!1,P=null)}}else N=!1}var V;if(typeof v=="function")V=function(){v(_)};else if(typeof MessageChannel<"u"){var L=new MessageChannel,U=L.port2;L.port1.onmessage=_,V=function(){U.postMessage(null)}}else V=function(){b(_,0)};function Q(q){P=q,N||(N=!0,V())}function R(q,O){k=b(function(){q(e.unstable_now())},O)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(q){q.callback=null},e.unstable_continueExecution=function(){y||p||(y=!0,Q(E))},e.unstable_forceFrameRate=function(q){0>q||125<q?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):z=0<q?Math.floor(1e3/q):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(q){switch(f){case 1:case 2:case 3:var O=3;break;default:O=f}var S=f;f=O;try{return q()}finally{f=S}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(q,O){switch(q){case 1:case 2:case 3:case 4:case 5:break;default:q=3}var S=f;f=q;try{return O()}finally{f=S}},e.unstable_scheduleCallback=function(q,O,S){var Y=e.unstable_now();switch(typeof S=="object"&&S!==null?(S=S.delay,S=typeof S=="number"&&0<S?Y+S:Y):S=Y,q){case 1:var F=-1;break;case 2:F=250;break;case 5:F=1073741823;break;case 4:F=1e4;break;default:F=5e3}return F=S+F,q={id:d++,callback:O,priorityLevel:q,startTime:S,expirationTime:F,sortIndex:-1},S>Y?(q.sortIndex=S,r(u,q),n(c)===null&&q===n(u)&&(g?(h(k),k=-1):g=!0,R(j,S-Y))):(q.sortIndex=F,r(c,q),y||p||(y=!0,Q(E))),q},e.unstable_shouldYield=I,e.unstable_wrapCallback=function(q){var O=f;return function(){var S=f;f=O;try{return q.apply(this,arguments)}finally{f=S}}}})(Zv);Jv.exports=Zv;var oj=Jv.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sj=x,Wr=oj;function B(e){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)r+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ex=new Set,Ls={};function Ua(e,r){Oo(e,r),Oo(e+"Capture",r)}function Oo(e,r){for(Ls[e]=r,e=0;e<r.length;e++)ex.add(r[e])}var st=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Vu=Object.prototype.hasOwnProperty,ij=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,zf={},Af={};function lj(e){return Vu.call(Af,e)?!0:Vu.call(zf,e)?!1:ij.test(e)?Af[e]=!0:(zf[e]=!0,!1)}function cj(e,r,n,t){if(n!==null&&n.type===0)return!1;switch(typeof r){case"function":case"symbol":return!0;case"boolean":return t?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function uj(e,r,n,t){if(r===null||typeof r>"u"||cj(e,r,n,t))return!0;if(t)return!1;if(n!==null)switch(n.type){case 3:return!r;case 4:return r===!1;case 5:return isNaN(r);case 6:return isNaN(r)||1>r}return!1}function br(e,r,n,t,a,o,s){this.acceptsBooleans=r===2||r===3||r===4,this.attributeName=t,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=r,this.sanitizeURL=o,this.removeEmptyString=s}var tr={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){tr[e]=new br(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var r=e[0];tr[r]=new br(r,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){tr[e]=new br(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){tr[e]=new br(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){tr[e]=new br(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){tr[e]=new br(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){tr[e]=new br(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){tr[e]=new br(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){tr[e]=new br(e,5,!1,e.toLowerCase(),null,!1,!1)});var Rm=/[\-:]([a-z])/g;function _m(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var r=e.replace(Rm,_m);tr[r]=new br(r,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var r=e.replace(Rm,_m);tr[r]=new br(r,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var r=e.replace(Rm,_m);tr[r]=new br(r,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){tr[e]=new br(e,1,!1,e.toLowerCase(),null,!1,!1)});tr.xlinkHref=new br("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){tr[e]=new br(e,1,!1,e.toLowerCase(),null,!0,!0)});function Om(e,r,n,t){var a=tr.hasOwnProperty(r)?tr[r]:null;(a!==null?a.type!==0:t||!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(uj(r,n,a,t)&&(n=null),t||a===null?lj(r)&&(n===null?e.removeAttribute(r):e.setAttribute(r,""+n)):a.mustUseProperty?e[a.propertyName]=n===null?a.type===3?!1:"":n:(r=a.attributeName,t=a.attributeNamespace,n===null?e.removeAttribute(r):(a=a.type,n=a===3||a===4&&n===!0?"":""+n,t?e.setAttributeNS(t,r,n):e.setAttribute(r,n))))}var mt=sj.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,zi=Symbol.for("react.element"),Za=Symbol.for("react.portal"),eo=Symbol.for("react.fragment"),Im=Symbol.for("react.strict_mode"),Hu=Symbol.for("react.profiler"),rx=Symbol.for("react.provider"),nx=Symbol.for("react.context"),Mm=Symbol.for("react.forward_ref"),Qu=Symbol.for("react.suspense"),Wu=Symbol.for("react.suspense_list"),Lm=Symbol.for("react.memo"),Nt=Symbol.for("react.lazy"),tx=Symbol.for("react.offscreen"),qf=Symbol.iterator;function ts(e){return e===null||typeof e!="object"?null:(e=qf&&e[qf]||e["@@iterator"],typeof e=="function"?e:null)}var Ie=Object.assign,Wc;function vs(e){if(Wc===void 0)try{throw Error()}catch(n){var r=n.stack.trim().match(/\n( *(at )?)/);Wc=r&&r[1]||""}return`
`+Wc+e}var Gc=!1;function Yc(e,r){if(!e||Gc)return"";Gc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(r)if(r=function(){throw Error()},Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(r,[])}catch(u){var t=u}Reflect.construct(e,[],r)}else{try{r.call()}catch(u){t=u}e.call(r.prototype)}else{try{throw Error()}catch(u){t=u}e()}}catch(u){if(u&&t&&typeof u.stack=="string"){for(var a=u.stack.split(`
`),o=t.stack.split(`
`),s=a.length-1,l=o.length-1;1<=s&&0<=l&&a[s]!==o[l];)l--;for(;1<=s&&0<=l;s--,l--)if(a[s]!==o[l]){if(s!==1||l!==1)do if(s--,l--,0>l||a[s]!==o[l]){var c=`
`+a[s].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=s&&0<=l);break}}}finally{Gc=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?vs(e):""}function dj(e){switch(e.tag){case 5:return vs(e.type);case 16:return vs("Lazy");case 13:return vs("Suspense");case 19:return vs("SuspenseList");case 0:case 2:case 15:return e=Yc(e.type,!1),e;case 11:return e=Yc(e.type.render,!1),e;case 1:return e=Yc(e.type,!0),e;default:return""}}function Gu(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case eo:return"Fragment";case Za:return"Portal";case Hu:return"Profiler";case Im:return"StrictMode";case Qu:return"Suspense";case Wu:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case nx:return(e.displayName||"Context")+".Consumer";case rx:return(e._context.displayName||"Context")+".Provider";case Mm:var r=e.render;return e=e.displayName,e||(e=r.displayName||r.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Lm:return r=e.displayName||null,r!==null?r:Gu(e.type)||"Memo";case Nt:r=e._payload,e=e._init;try{return Gu(e(r))}catch{}}return null}function mj(e){var r=e.type;switch(e.tag){case 24:return"Cache";case 9:return(r.displayName||"Context")+".Consumer";case 10:return(r._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=r.render,e=e.displayName||e.name||"",r.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return r;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Gu(r);case 8:return r===Im?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r}return null}function Jt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ax(e){var r=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(r==="checkbox"||r==="radio")}function pj(e){var r=ax(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,r),t=""+e[r];if(!e.hasOwnProperty(r)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,o=n.set;return Object.defineProperty(e,r,{configurable:!0,get:function(){return a.call(this)},set:function(s){t=""+s,o.call(this,s)}}),Object.defineProperty(e,r,{enumerable:n.enumerable}),{getValue:function(){return t},setValue:function(s){t=""+s},stopTracking:function(){e._valueTracker=null,delete e[r]}}}}function Ai(e){e._valueTracker||(e._valueTracker=pj(e))}function ox(e){if(!e)return!1;var r=e._valueTracker;if(!r)return!0;var n=r.getValue(),t="";return e&&(t=ax(e)?e.checked?"true":"false":e.value),e=t,e!==n?(r.setValue(e),!0):!1}function wl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Yu(e,r){var n=r.checked;return Ie({},r,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Rf(e,r){var n=r.defaultValue==null?"":r.defaultValue,t=r.checked!=null?r.checked:r.defaultChecked;n=Jt(r.value!=null?r.value:n),e._wrapperState={initialChecked:t,initialValue:n,controlled:r.type==="checkbox"||r.type==="radio"?r.checked!=null:r.value!=null}}function sx(e,r){r=r.checked,r!=null&&Om(e,"checked",r,!1)}function Ku(e,r){sx(e,r);var n=Jt(r.value),t=r.type;if(n!=null)t==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(t==="submit"||t==="reset"){e.removeAttribute("value");return}r.hasOwnProperty("value")?Xu(e,r.type,n):r.hasOwnProperty("defaultValue")&&Xu(e,r.type,Jt(r.defaultValue)),r.checked==null&&r.defaultChecked!=null&&(e.defaultChecked=!!r.defaultChecked)}function _f(e,r,n){if(r.hasOwnProperty("value")||r.hasOwnProperty("defaultValue")){var t=r.type;if(!(t!=="submit"&&t!=="reset"||r.value!==void 0&&r.value!==null))return;r=""+e._wrapperState.initialValue,n||r===e.value||(e.value=r),e.defaultValue=r}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Xu(e,r,n){(r!=="number"||wl(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var xs=Array.isArray;function mo(e,r,n,t){if(e=e.options,r){r={};for(var a=0;a<n.length;a++)r["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=r.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&t&&(e[n].defaultSelected=!0)}else{for(n=""+Jt(n),r=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,t&&(e[a].defaultSelected=!0);return}r!==null||e[a].disabled||(r=e[a])}r!==null&&(r.selected=!0)}}function Ju(e,r){if(r.dangerouslySetInnerHTML!=null)throw Error(B(91));return Ie({},r,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Of(e,r){var n=r.value;if(n==null){if(n=r.children,r=r.defaultValue,n!=null){if(r!=null)throw Error(B(92));if(xs(n)){if(1<n.length)throw Error(B(93));n=n[0]}r=n}r==null&&(r=""),n=r}e._wrapperState={initialValue:Jt(n)}}function ix(e,r){var n=Jt(r.value),t=Jt(r.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),r.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),t!=null&&(e.defaultValue=""+t)}function If(e){var r=e.textContent;r===e._wrapperState.initialValue&&r!==""&&r!==null&&(e.value=r)}function lx(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Zu(e,r){return e==null||e==="http://www.w3.org/1999/xhtml"?lx(r):e==="http://www.w3.org/2000/svg"&&r==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var qi,cx=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(r,n,t,a){MSApp.execUnsafeLocalFunction(function(){return e(r,n,t,a)})}:e}(function(e,r){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=r;else{for(qi=qi||document.createElement("div"),qi.innerHTML="<svg>"+r.valueOf().toString()+"</svg>",r=qi.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;r.firstChild;)e.appendChild(r.firstChild)}});function Fs(e,r){if(r){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=r;return}}e.textContent=r}var Cs={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},fj=["Webkit","ms","Moz","O"];Object.keys(Cs).forEach(function(e){fj.forEach(function(r){r=r+e.charAt(0).toUpperCase()+e.substring(1),Cs[r]=Cs[e]})});function ux(e,r,n){return r==null||typeof r=="boolean"||r===""?"":n||typeof r!="number"||r===0||Cs.hasOwnProperty(e)&&Cs[e]?(""+r).trim():r+"px"}function dx(e,r){e=e.style;for(var n in r)if(r.hasOwnProperty(n)){var t=n.indexOf("--")===0,a=ux(n,r[n],t);n==="float"&&(n="cssFloat"),t?e.setProperty(n,a):e[n]=a}}var hj=Ie({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ed(e,r){if(r){if(hj[e]&&(r.children!=null||r.dangerouslySetInnerHTML!=null))throw Error(B(137,e));if(r.dangerouslySetInnerHTML!=null){if(r.children!=null)throw Error(B(60));if(typeof r.dangerouslySetInnerHTML!="object"||!("__html"in r.dangerouslySetInnerHTML))throw Error(B(61))}if(r.style!=null&&typeof r.style!="object")throw Error(B(62))}}function rd(e,r){if(e.indexOf("-")===-1)return typeof r.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var nd=null;function Fm(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var td=null,po=null,fo=null;function Mf(e){if(e=gi(e)){if(typeof td!="function")throw Error(B(280));var r=e.stateNode;r&&(r=mc(r),td(e.stateNode,e.type,r))}}function mx(e){po?fo?fo.push(e):fo=[e]:po=e}function px(){if(po){var e=po,r=fo;if(fo=po=null,Mf(e),r)for(e=0;e<r.length;e++)Mf(r[e])}}function fx(e,r){return e(r)}function hx(){}var Kc=!1;function gx(e,r,n){if(Kc)return e(r,n);Kc=!0;try{return fx(e,r,n)}finally{Kc=!1,(po!==null||fo!==null)&&(hx(),px())}}function Ds(e,r){var n=e.stateNode;if(n===null)return null;var t=mc(n);if(t===null)return null;n=t[r];e:switch(r){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(t=!t.disabled)||(e=e.type,t=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!t;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(B(231,r,typeof n));return n}var ad=!1;if(st)try{var as={};Object.defineProperty(as,"passive",{get:function(){ad=!0}}),window.addEventListener("test",as,as),window.removeEventListener("test",as,as)}catch{ad=!1}function gj(e,r,n,t,a,o,s,l,c){var u=Array.prototype.slice.call(arguments,3);try{r.apply(n,u)}catch(d){this.onError(d)}}var Ns=!1,jl=null,Sl=!1,od=null,vj={onError:function(e){Ns=!0,jl=e}};function xj(e,r,n,t,a,o,s,l,c){Ns=!1,jl=null,gj.apply(vj,arguments)}function yj(e,r,n,t,a,o,s,l,c){if(xj.apply(this,arguments),Ns){if(Ns){var u=jl;Ns=!1,jl=null}else throw Error(B(198));Sl||(Sl=!0,od=u)}}function Va(e){var r=e,n=e;if(e.alternate)for(;r.return;)r=r.return;else{e=r;do r=e,r.flags&4098&&(n=r.return),e=r.return;while(e)}return r.tag===3?n:null}function vx(e){if(e.tag===13){var r=e.memoizedState;if(r===null&&(e=e.alternate,e!==null&&(r=e.memoizedState)),r!==null)return r.dehydrated}return null}function Lf(e){if(Va(e)!==e)throw Error(B(188))}function bj(e){var r=e.alternate;if(!r){if(r=Va(e),r===null)throw Error(B(188));return r!==e?null:e}for(var n=e,t=r;;){var a=n.return;if(a===null)break;var o=a.alternate;if(o===null){if(t=a.return,t!==null){n=t;continue}break}if(a.child===o.child){for(o=a.child;o;){if(o===n)return Lf(a),e;if(o===t)return Lf(a),r;o=o.sibling}throw Error(B(188))}if(n.return!==t.return)n=a,t=o;else{for(var s=!1,l=a.child;l;){if(l===n){s=!0,n=a,t=o;break}if(l===t){s=!0,t=a,n=o;break}l=l.sibling}if(!s){for(l=o.child;l;){if(l===n){s=!0,n=o,t=a;break}if(l===t){s=!0,t=o,n=a;break}l=l.sibling}if(!s)throw Error(B(189))}}if(n.alternate!==t)throw Error(B(190))}if(n.tag!==3)throw Error(B(188));return n.stateNode.current===n?e:r}function xx(e){return e=bj(e),e!==null?yx(e):null}function yx(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var r=yx(e);if(r!==null)return r;e=e.sibling}return null}var bx=Wr.unstable_scheduleCallback,Ff=Wr.unstable_cancelCallback,wj=Wr.unstable_shouldYield,jj=Wr.unstable_requestPaint,De=Wr.unstable_now,Sj=Wr.unstable_getCurrentPriorityLevel,Dm=Wr.unstable_ImmediatePriority,wx=Wr.unstable_UserBlockingPriority,Cl=Wr.unstable_NormalPriority,Cj=Wr.unstable_LowPriority,jx=Wr.unstable_IdlePriority,lc=null,Dn=null;function Nj(e){if(Dn&&typeof Dn.onCommitFiberRoot=="function")try{Dn.onCommitFiberRoot(lc,e,void 0,(e.current.flags&128)===128)}catch{}}var jn=Math.clz32?Math.clz32:Pj,Ej=Math.log,kj=Math.LN2;function Pj(e){return e>>>=0,e===0?32:31-(Ej(e)/kj|0)|0}var Ri=64,_i=4194304;function ys(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Nl(e,r){var n=e.pendingLanes;if(n===0)return 0;var t=0,a=e.suspendedLanes,o=e.pingedLanes,s=n&268435455;if(s!==0){var l=s&~a;l!==0?t=ys(l):(o&=s,o!==0&&(t=ys(o)))}else s=n&~a,s!==0?t=ys(s):o!==0&&(t=ys(o));if(t===0)return 0;if(r!==0&&r!==t&&!(r&a)&&(a=t&-t,o=r&-r,a>=o||a===16&&(o&4194240)!==0))return r;if(t&4&&(t|=n&16),r=e.entangledLanes,r!==0)for(e=e.entanglements,r&=t;0<r;)n=31-jn(r),a=1<<n,t|=e[n],r&=~a;return t}function Tj(e,r){switch(e){case 1:case 2:case 4:return r+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function zj(e,r){for(var n=e.suspendedLanes,t=e.pingedLanes,a=e.expirationTimes,o=e.pendingLanes;0<o;){var s=31-jn(o),l=1<<s,c=a[s];c===-1?(!(l&n)||l&t)&&(a[s]=Tj(l,r)):c<=r&&(e.expiredLanes|=l),o&=~l}}function sd(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Sx(){var e=Ri;return Ri<<=1,!(Ri&4194240)&&(Ri=64),e}function Xc(e){for(var r=[],n=0;31>n;n++)r.push(e);return r}function fi(e,r,n){e.pendingLanes|=r,r!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,r=31-jn(r),e[r]=n}function Aj(e,r){var n=e.pendingLanes&~r;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=r,e.mutableReadLanes&=r,e.entangledLanes&=r,r=e.entanglements;var t=e.eventTimes;for(e=e.expirationTimes;0<n;){var a=31-jn(n),o=1<<a;r[a]=0,t[a]=-1,e[a]=-1,n&=~o}}function Bm(e,r){var n=e.entangledLanes|=r;for(e=e.entanglements;n;){var t=31-jn(n),a=1<<t;a&r|e[t]&r&&(e[t]|=r),n&=~a}}var be=0;function Cx(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Nx,$m,Ex,kx,Px,id=!1,Oi=[],Dt=null,Bt=null,$t=null,Bs=new Map,$s=new Map,kt=[],qj="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Df(e,r){switch(e){case"focusin":case"focusout":Dt=null;break;case"dragenter":case"dragleave":Bt=null;break;case"mouseover":case"mouseout":$t=null;break;case"pointerover":case"pointerout":Bs.delete(r.pointerId);break;case"gotpointercapture":case"lostpointercapture":$s.delete(r.pointerId)}}function os(e,r,n,t,a,o){return e===null||e.nativeEvent!==o?(e={blockedOn:r,domEventName:n,eventSystemFlags:t,nativeEvent:o,targetContainers:[a]},r!==null&&(r=gi(r),r!==null&&$m(r)),e):(e.eventSystemFlags|=t,r=e.targetContainers,a!==null&&r.indexOf(a)===-1&&r.push(a),e)}function Rj(e,r,n,t,a){switch(r){case"focusin":return Dt=os(Dt,e,r,n,t,a),!0;case"dragenter":return Bt=os(Bt,e,r,n,t,a),!0;case"mouseover":return $t=os($t,e,r,n,t,a),!0;case"pointerover":var o=a.pointerId;return Bs.set(o,os(Bs.get(o)||null,e,r,n,t,a)),!0;case"gotpointercapture":return o=a.pointerId,$s.set(o,os($s.get(o)||null,e,r,n,t,a)),!0}return!1}function Tx(e){var r=ya(e.target);if(r!==null){var n=Va(r);if(n!==null){if(r=n.tag,r===13){if(r=vx(n),r!==null){e.blockedOn=r,Px(e.priority,function(){Ex(n)});return}}else if(r===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function tl(e){if(e.blockedOn!==null)return!1;for(var r=e.targetContainers;0<r.length;){var n=ld(e.domEventName,e.eventSystemFlags,r[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var t=new n.constructor(n.type,n);nd=t,n.target.dispatchEvent(t),nd=null}else return r=gi(n),r!==null&&$m(r),e.blockedOn=n,!1;r.shift()}return!0}function Bf(e,r,n){tl(e)&&n.delete(r)}function _j(){id=!1,Dt!==null&&tl(Dt)&&(Dt=null),Bt!==null&&tl(Bt)&&(Bt=null),$t!==null&&tl($t)&&($t=null),Bs.forEach(Bf),$s.forEach(Bf)}function ss(e,r){e.blockedOn===r&&(e.blockedOn=null,id||(id=!0,Wr.unstable_scheduleCallback(Wr.unstable_NormalPriority,_j)))}function Us(e){function r(a){return ss(a,e)}if(0<Oi.length){ss(Oi[0],e);for(var n=1;n<Oi.length;n++){var t=Oi[n];t.blockedOn===e&&(t.blockedOn=null)}}for(Dt!==null&&ss(Dt,e),Bt!==null&&ss(Bt,e),$t!==null&&ss($t,e),Bs.forEach(r),$s.forEach(r),n=0;n<kt.length;n++)t=kt[n],t.blockedOn===e&&(t.blockedOn=null);for(;0<kt.length&&(n=kt[0],n.blockedOn===null);)Tx(n),n.blockedOn===null&&kt.shift()}var ho=mt.ReactCurrentBatchConfig,El=!0;function Oj(e,r,n,t){var a=be,o=ho.transition;ho.transition=null;try{be=1,Um(e,r,n,t)}finally{be=a,ho.transition=o}}function Ij(e,r,n,t){var a=be,o=ho.transition;ho.transition=null;try{be=4,Um(e,r,n,t)}finally{be=a,ho.transition=o}}function Um(e,r,n,t){if(El){var a=ld(e,r,n,t);if(a===null)iu(e,r,t,kl,n),Df(e,t);else if(Rj(a,e,r,n,t))t.stopPropagation();else if(Df(e,t),r&4&&-1<qj.indexOf(e)){for(;a!==null;){var o=gi(a);if(o!==null&&Nx(o),o=ld(e,r,n,t),o===null&&iu(e,r,t,kl,n),o===a)break;a=o}a!==null&&t.stopPropagation()}else iu(e,r,t,null,n)}}var kl=null;function ld(e,r,n,t){if(kl=null,e=Fm(t),e=ya(e),e!==null)if(r=Va(e),r===null)e=null;else if(n=r.tag,n===13){if(e=vx(r),e!==null)return e;e=null}else if(n===3){if(r.stateNode.current.memoizedState.isDehydrated)return r.tag===3?r.stateNode.containerInfo:null;e=null}else r!==e&&(e=null);return kl=e,null}function zx(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Sj()){case Dm:return 1;case wx:return 4;case Cl:case Cj:return 16;case jx:return 536870912;default:return 16}default:return 16}}var Mt=null,Vm=null,al=null;function Ax(){if(al)return al;var e,r=Vm,n=r.length,t,a="value"in Mt?Mt.value:Mt.textContent,o=a.length;for(e=0;e<n&&r[e]===a[e];e++);var s=n-e;for(t=1;t<=s&&r[n-t]===a[o-t];t++);return al=a.slice(e,1<t?1-t:void 0)}function ol(e){var r=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&r===13&&(e=13)):e=r,e===10&&(e=13),32<=e||e===13?e:0}function Ii(){return!0}function $f(){return!1}function Yr(e){function r(n,t,a,o,s){this._reactName=n,this._targetInst=a,this.type=t,this.nativeEvent=o,this.target=s,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(o):o[l]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Ii:$f,this.isPropagationStopped=$f,this}return Ie(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ii)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ii)},persist:function(){},isPersistent:Ii}),r}var Go={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Hm=Yr(Go),hi=Ie({},Go,{view:0,detail:0}),Mj=Yr(hi),Jc,Zc,is,cc=Ie({},hi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Qm,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==is&&(is&&e.type==="mousemove"?(Jc=e.screenX-is.screenX,Zc=e.screenY-is.screenY):Zc=Jc=0,is=e),Jc)},movementY:function(e){return"movementY"in e?e.movementY:Zc}}),Uf=Yr(cc),Lj=Ie({},cc,{dataTransfer:0}),Fj=Yr(Lj),Dj=Ie({},hi,{relatedTarget:0}),eu=Yr(Dj),Bj=Ie({},Go,{animationName:0,elapsedTime:0,pseudoElement:0}),$j=Yr(Bj),Uj=Ie({},Go,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Vj=Yr(Uj),Hj=Ie({},Go,{data:0}),Vf=Yr(Hj),Qj={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Wj={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Gj={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Yj(e){var r=this.nativeEvent;return r.getModifierState?r.getModifierState(e):(e=Gj[e])?!!r[e]:!1}function Qm(){return Yj}var Kj=Ie({},hi,{key:function(e){if(e.key){var r=Qj[e.key]||e.key;if(r!=="Unidentified")return r}return e.type==="keypress"?(e=ol(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Wj[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Qm,charCode:function(e){return e.type==="keypress"?ol(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ol(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Xj=Yr(Kj),Jj=Ie({},cc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Hf=Yr(Jj),Zj=Ie({},hi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Qm}),eS=Yr(Zj),rS=Ie({},Go,{propertyName:0,elapsedTime:0,pseudoElement:0}),nS=Yr(rS),tS=Ie({},cc,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),aS=Yr(tS),oS=[9,13,27,32],Wm=st&&"CompositionEvent"in window,Es=null;st&&"documentMode"in document&&(Es=document.documentMode);var sS=st&&"TextEvent"in window&&!Es,qx=st&&(!Wm||Es&&8<Es&&11>=Es),Qf=" ",Wf=!1;function Rx(e,r){switch(e){case"keyup":return oS.indexOf(r.keyCode)!==-1;case"keydown":return r.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function _x(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ro=!1;function iS(e,r){switch(e){case"compositionend":return _x(r);case"keypress":return r.which!==32?null:(Wf=!0,Qf);case"textInput":return e=r.data,e===Qf&&Wf?null:e;default:return null}}function lS(e,r){if(ro)return e==="compositionend"||!Wm&&Rx(e,r)?(e=Ax(),al=Vm=Mt=null,ro=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(r.ctrlKey||r.altKey||r.metaKey)||r.ctrlKey&&r.altKey){if(r.char&&1<r.char.length)return r.char;if(r.which)return String.fromCharCode(r.which)}return null;case"compositionend":return qx&&r.locale!=="ko"?null:r.data;default:return null}}var cS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Gf(e){var r=e&&e.nodeName&&e.nodeName.toLowerCase();return r==="input"?!!cS[e.type]:r==="textarea"}function Ox(e,r,n,t){mx(t),r=Pl(r,"onChange"),0<r.length&&(n=new Hm("onChange","change",null,n,t),e.push({event:n,listeners:r}))}var ks=null,Vs=null;function uS(e){Qx(e,0)}function uc(e){var r=ao(e);if(ox(r))return e}function dS(e,r){if(e==="change")return r}var Ix=!1;if(st){var ru;if(st){var nu="oninput"in document;if(!nu){var Yf=document.createElement("div");Yf.setAttribute("oninput","return;"),nu=typeof Yf.oninput=="function"}ru=nu}else ru=!1;Ix=ru&&(!document.documentMode||9<document.documentMode)}function Kf(){ks&&(ks.detachEvent("onpropertychange",Mx),Vs=ks=null)}function Mx(e){if(e.propertyName==="value"&&uc(Vs)){var r=[];Ox(r,Vs,e,Fm(e)),gx(uS,r)}}function mS(e,r,n){e==="focusin"?(Kf(),ks=r,Vs=n,ks.attachEvent("onpropertychange",Mx)):e==="focusout"&&Kf()}function pS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return uc(Vs)}function fS(e,r){if(e==="click")return uc(r)}function hS(e,r){if(e==="input"||e==="change")return uc(r)}function gS(e,r){return e===r&&(e!==0||1/e===1/r)||e!==e&&r!==r}var Cn=typeof Object.is=="function"?Object.is:gS;function Hs(e,r){if(Cn(e,r))return!0;if(typeof e!="object"||e===null||typeof r!="object"||r===null)return!1;var n=Object.keys(e),t=Object.keys(r);if(n.length!==t.length)return!1;for(t=0;t<n.length;t++){var a=n[t];if(!Vu.call(r,a)||!Cn(e[a],r[a]))return!1}return!0}function Xf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Jf(e,r){var n=Xf(e);e=0;for(var t;n;){if(n.nodeType===3){if(t=e+n.textContent.length,e<=r&&t>=r)return{node:n,offset:r-e};e=t}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Xf(n)}}function Lx(e,r){return e&&r?e===r?!0:e&&e.nodeType===3?!1:r&&r.nodeType===3?Lx(e,r.parentNode):"contains"in e?e.contains(r):e.compareDocumentPosition?!!(e.compareDocumentPosition(r)&16):!1:!1}function Fx(){for(var e=window,r=wl();r instanceof e.HTMLIFrameElement;){try{var n=typeof r.contentWindow.location.href=="string"}catch{n=!1}if(n)e=r.contentWindow;else break;r=wl(e.document)}return r}function Gm(e){var r=e&&e.nodeName&&e.nodeName.toLowerCase();return r&&(r==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||r==="textarea"||e.contentEditable==="true")}function vS(e){var r=Fx(),n=e.focusedElem,t=e.selectionRange;if(r!==n&&n&&n.ownerDocument&&Lx(n.ownerDocument.documentElement,n)){if(t!==null&&Gm(n)){if(r=t.start,e=t.end,e===void 0&&(e=r),"selectionStart"in n)n.selectionStart=r,n.selectionEnd=Math.min(e,n.value.length);else if(e=(r=n.ownerDocument||document)&&r.defaultView||window,e.getSelection){e=e.getSelection();var a=n.textContent.length,o=Math.min(t.start,a);t=t.end===void 0?o:Math.min(t.end,a),!e.extend&&o>t&&(a=t,t=o,o=a),a=Jf(n,o);var s=Jf(n,t);a&&s&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(r=r.createRange(),r.setStart(a.node,a.offset),e.removeAllRanges(),o>t?(e.addRange(r),e.extend(s.node,s.offset)):(r.setEnd(s.node,s.offset),e.addRange(r)))}}for(r=[],e=n;e=e.parentNode;)e.nodeType===1&&r.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<r.length;n++)e=r[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var xS=st&&"documentMode"in document&&11>=document.documentMode,no=null,cd=null,Ps=null,ud=!1;function Zf(e,r,n){var t=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ud||no==null||no!==wl(t)||(t=no,"selectionStart"in t&&Gm(t)?t={start:t.selectionStart,end:t.selectionEnd}:(t=(t.ownerDocument&&t.ownerDocument.defaultView||window).getSelection(),t={anchorNode:t.anchorNode,anchorOffset:t.anchorOffset,focusNode:t.focusNode,focusOffset:t.focusOffset}),Ps&&Hs(Ps,t)||(Ps=t,t=Pl(cd,"onSelect"),0<t.length&&(r=new Hm("onSelect","select",null,r,n),e.push({event:r,listeners:t}),r.target=no)))}function Mi(e,r){var n={};return n[e.toLowerCase()]=r.toLowerCase(),n["Webkit"+e]="webkit"+r,n["Moz"+e]="moz"+r,n}var to={animationend:Mi("Animation","AnimationEnd"),animationiteration:Mi("Animation","AnimationIteration"),animationstart:Mi("Animation","AnimationStart"),transitionend:Mi("Transition","TransitionEnd")},tu={},Dx={};st&&(Dx=document.createElement("div").style,"AnimationEvent"in window||(delete to.animationend.animation,delete to.animationiteration.animation,delete to.animationstart.animation),"TransitionEvent"in window||delete to.transitionend.transition);function dc(e){if(tu[e])return tu[e];if(!to[e])return e;var r=to[e],n;for(n in r)if(r.hasOwnProperty(n)&&n in Dx)return tu[e]=r[n];return e}var Bx=dc("animationend"),$x=dc("animationiteration"),Ux=dc("animationstart"),Vx=dc("transitionend"),Hx=new Map,eh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ta(e,r){Hx.set(e,r),Ua(r,[e])}for(var au=0;au<eh.length;au++){var ou=eh[au],yS=ou.toLowerCase(),bS=ou[0].toUpperCase()+ou.slice(1);ta(yS,"on"+bS)}ta(Bx,"onAnimationEnd");ta($x,"onAnimationIteration");ta(Ux,"onAnimationStart");ta("dblclick","onDoubleClick");ta("focusin","onFocus");ta("focusout","onBlur");ta(Vx,"onTransitionEnd");Oo("onMouseEnter",["mouseout","mouseover"]);Oo("onMouseLeave",["mouseout","mouseover"]);Oo("onPointerEnter",["pointerout","pointerover"]);Oo("onPointerLeave",["pointerout","pointerover"]);Ua("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ua("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ua("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ua("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ua("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ua("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var bs="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),wS=new Set("cancel close invalid load scroll toggle".split(" ").concat(bs));function rh(e,r,n){var t=e.type||"unknown-event";e.currentTarget=n,yj(t,r,void 0,e),e.currentTarget=null}function Qx(e,r){r=(r&4)!==0;for(var n=0;n<e.length;n++){var t=e[n],a=t.event;t=t.listeners;e:{var o=void 0;if(r)for(var s=t.length-1;0<=s;s--){var l=t[s],c=l.instance,u=l.currentTarget;if(l=l.listener,c!==o&&a.isPropagationStopped())break e;rh(a,l,u),o=c}else for(s=0;s<t.length;s++){if(l=t[s],c=l.instance,u=l.currentTarget,l=l.listener,c!==o&&a.isPropagationStopped())break e;rh(a,l,u),o=c}}}if(Sl)throw e=od,Sl=!1,od=null,e}function Pe(e,r){var n=r[hd];n===void 0&&(n=r[hd]=new Set);var t=e+"__bubble";n.has(t)||(Wx(r,e,2,!1),n.add(t))}function su(e,r,n){var t=0;r&&(t|=4),Wx(n,e,t,r)}var Li="_reactListening"+Math.random().toString(36).slice(2);function Qs(e){if(!e[Li]){e[Li]=!0,ex.forEach(function(n){n!=="selectionchange"&&(wS.has(n)||su(n,!1,e),su(n,!0,e))});var r=e.nodeType===9?e:e.ownerDocument;r===null||r[Li]||(r[Li]=!0,su("selectionchange",!1,r))}}function Wx(e,r,n,t){switch(zx(r)){case 1:var a=Oj;break;case 4:a=Ij;break;default:a=Um}n=a.bind(null,r,n,e),a=void 0,!ad||r!=="touchstart"&&r!=="touchmove"&&r!=="wheel"||(a=!0),t?a!==void 0?e.addEventListener(r,n,{capture:!0,passive:a}):e.addEventListener(r,n,!0):a!==void 0?e.addEventListener(r,n,{passive:a}):e.addEventListener(r,n,!1)}function iu(e,r,n,t,a){var o=t;if(!(r&1)&&!(r&2)&&t!==null)e:for(;;){if(t===null)return;var s=t.tag;if(s===3||s===4){var l=t.stateNode.containerInfo;if(l===a||l.nodeType===8&&l.parentNode===a)break;if(s===4)for(s=t.return;s!==null;){var c=s.tag;if((c===3||c===4)&&(c=s.stateNode.containerInfo,c===a||c.nodeType===8&&c.parentNode===a))return;s=s.return}for(;l!==null;){if(s=ya(l),s===null)return;if(c=s.tag,c===5||c===6){t=o=s;continue e}l=l.parentNode}}t=t.return}gx(function(){var u=o,d=Fm(n),m=[];e:{var f=Hx.get(e);if(f!==void 0){var p=Hm,y=e;switch(e){case"keypress":if(ol(n)===0)break e;case"keydown":case"keyup":p=Xj;break;case"focusin":y="focus",p=eu;break;case"focusout":y="blur",p=eu;break;case"beforeblur":case"afterblur":p=eu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Uf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=Fj;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=eS;break;case Bx:case $x:case Ux:p=$j;break;case Vx:p=nS;break;case"scroll":p=Mj;break;case"wheel":p=aS;break;case"copy":case"cut":case"paste":p=Vj;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Hf}var g=(r&4)!==0,b=!g&&e==="scroll",h=g?f!==null?f+"Capture":null:f;g=[];for(var v=u,w;v!==null;){w=v;var j=w.stateNode;if(w.tag===5&&j!==null&&(w=j,h!==null&&(j=Ds(v,h),j!=null&&g.push(Ws(v,j,w)))),b)break;v=v.return}0<g.length&&(f=new p(f,y,null,n,d),m.push({event:f,listeners:g}))}}if(!(r&7)){e:{if(f=e==="mouseover"||e==="pointerover",p=e==="mouseout"||e==="pointerout",f&&n!==nd&&(y=n.relatedTarget||n.fromElement)&&(ya(y)||y[it]))break e;if((p||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,p?(y=n.relatedTarget||n.toElement,p=u,y=y?ya(y):null,y!==null&&(b=Va(y),y!==b||y.tag!==5&&y.tag!==6)&&(y=null)):(p=null,y=u),p!==y)){if(g=Uf,j="onMouseLeave",h="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(g=Hf,j="onPointerLeave",h="onPointerEnter",v="pointer"),b=p==null?f:ao(p),w=y==null?f:ao(y),f=new g(j,v+"leave",p,n,d),f.target=b,f.relatedTarget=w,j=null,ya(d)===u&&(g=new g(h,v+"enter",y,n,d),g.target=w,g.relatedTarget=b,j=g),b=j,p&&y)r:{for(g=p,h=y,v=0,w=g;w;w=Ga(w))v++;for(w=0,j=h;j;j=Ga(j))w++;for(;0<v-w;)g=Ga(g),v--;for(;0<w-v;)h=Ga(h),w--;for(;v--;){if(g===h||h!==null&&g===h.alternate)break r;g=Ga(g),h=Ga(h)}g=null}else g=null;p!==null&&nh(m,f,p,g,!1),y!==null&&b!==null&&nh(m,b,y,g,!0)}}e:{if(f=u?ao(u):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var E=dS;else if(Gf(f))if(Ix)E=hS;else{E=pS;var N=mS}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(E=fS);if(E&&(E=E(e,u))){Ox(m,E,n,d);break e}N&&N(e,f,u),e==="focusout"&&(N=f._wrapperState)&&N.controlled&&f.type==="number"&&Xu(f,"number",f.value)}switch(N=u?ao(u):window,e){case"focusin":(Gf(N)||N.contentEditable==="true")&&(no=N,cd=u,Ps=null);break;case"focusout":Ps=cd=no=null;break;case"mousedown":ud=!0;break;case"contextmenu":case"mouseup":case"dragend":ud=!1,Zf(m,n,d);break;case"selectionchange":if(xS)break;case"keydown":case"keyup":Zf(m,n,d)}var P;if(Wm)e:{switch(e){case"compositionstart":var k="onCompositionStart";break e;case"compositionend":k="onCompositionEnd";break e;case"compositionupdate":k="onCompositionUpdate";break e}k=void 0}else ro?Rx(e,n)&&(k="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(k="onCompositionStart");k&&(qx&&n.locale!=="ko"&&(ro||k!=="onCompositionStart"?k==="onCompositionEnd"&&ro&&(P=Ax()):(Mt=d,Vm="value"in Mt?Mt.value:Mt.textContent,ro=!0)),N=Pl(u,k),0<N.length&&(k=new Vf(k,e,null,n,d),m.push({event:k,listeners:N}),P?k.data=P:(P=_x(n),P!==null&&(k.data=P)))),(P=sS?iS(e,n):lS(e,n))&&(u=Pl(u,"onBeforeInput"),0<u.length&&(d=new Vf("onBeforeInput","beforeinput",null,n,d),m.push({event:d,listeners:u}),d.data=P))}Qx(m,r)})}function Ws(e,r,n){return{instance:e,listener:r,currentTarget:n}}function Pl(e,r){for(var n=r+"Capture",t=[];e!==null;){var a=e,o=a.stateNode;a.tag===5&&o!==null&&(a=o,o=Ds(e,n),o!=null&&t.unshift(Ws(e,o,a)),o=Ds(e,r),o!=null&&t.push(Ws(e,o,a))),e=e.return}return t}function Ga(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function nh(e,r,n,t,a){for(var o=r._reactName,s=[];n!==null&&n!==t;){var l=n,c=l.alternate,u=l.stateNode;if(c!==null&&c===t)break;l.tag===5&&u!==null&&(l=u,a?(c=Ds(n,o),c!=null&&s.unshift(Ws(n,c,l))):a||(c=Ds(n,o),c!=null&&s.push(Ws(n,c,l)))),n=n.return}s.length!==0&&e.push({event:r,listeners:s})}var jS=/\r\n?/g,SS=/\u0000|\uFFFD/g;function th(e){return(typeof e=="string"?e:""+e).replace(jS,`
`).replace(SS,"")}function Fi(e,r,n){if(r=th(r),th(e)!==r&&n)throw Error(B(425))}function Tl(){}var dd=null,md=null;function pd(e,r){return e==="textarea"||e==="noscript"||typeof r.children=="string"||typeof r.children=="number"||typeof r.dangerouslySetInnerHTML=="object"&&r.dangerouslySetInnerHTML!==null&&r.dangerouslySetInnerHTML.__html!=null}var fd=typeof setTimeout=="function"?setTimeout:void 0,CS=typeof clearTimeout=="function"?clearTimeout:void 0,ah=typeof Promise=="function"?Promise:void 0,NS=typeof queueMicrotask=="function"?queueMicrotask:typeof ah<"u"?function(e){return ah.resolve(null).then(e).catch(ES)}:fd;function ES(e){setTimeout(function(){throw e})}function lu(e,r){var n=r,t=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(t===0){e.removeChild(a),Us(r);return}t--}else n!=="$"&&n!=="$?"&&n!=="$!"||t++;n=a}while(n);Us(r)}function Ut(e){for(;e!=null;e=e.nextSibling){var r=e.nodeType;if(r===1||r===3)break;if(r===8){if(r=e.data,r==="$"||r==="$!"||r==="$?")break;if(r==="/$")return null}}return e}function oh(e){e=e.previousSibling;for(var r=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(r===0)return e;r--}else n==="/$"&&r++}e=e.previousSibling}return null}var Yo=Math.random().toString(36).slice(2),Mn="__reactFiber$"+Yo,Gs="__reactProps$"+Yo,it="__reactContainer$"+Yo,hd="__reactEvents$"+Yo,kS="__reactListeners$"+Yo,PS="__reactHandles$"+Yo;function ya(e){var r=e[Mn];if(r)return r;for(var n=e.parentNode;n;){if(r=n[it]||n[Mn]){if(n=r.alternate,r.child!==null||n!==null&&n.child!==null)for(e=oh(e);e!==null;){if(n=e[Mn])return n;e=oh(e)}return r}e=n,n=e.parentNode}return null}function gi(e){return e=e[Mn]||e[it],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function ao(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(B(33))}function mc(e){return e[Gs]||null}var gd=[],oo=-1;function aa(e){return{current:e}}function Te(e){0>oo||(e.current=gd[oo],gd[oo]=null,oo--)}function Ne(e,r){oo++,gd[oo]=e.current,e.current=r}var Zt={},ur=aa(Zt),zr=aa(!1),Oa=Zt;function Io(e,r){var n=e.type.contextTypes;if(!n)return Zt;var t=e.stateNode;if(t&&t.__reactInternalMemoizedUnmaskedChildContext===r)return t.__reactInternalMemoizedMaskedChildContext;var a={},o;for(o in n)a[o]=r[o];return t&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=r,e.__reactInternalMemoizedMaskedChildContext=a),a}function Ar(e){return e=e.childContextTypes,e!=null}function zl(){Te(zr),Te(ur)}function sh(e,r,n){if(ur.current!==Zt)throw Error(B(168));Ne(ur,r),Ne(zr,n)}function Gx(e,r,n){var t=e.stateNode;if(r=r.childContextTypes,typeof t.getChildContext!="function")return n;t=t.getChildContext();for(var a in t)if(!(a in r))throw Error(B(108,mj(e)||"Unknown",a));return Ie({},n,t)}function Al(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Zt,Oa=ur.current,Ne(ur,e),Ne(zr,zr.current),!0}function ih(e,r,n){var t=e.stateNode;if(!t)throw Error(B(169));n?(e=Gx(e,r,Oa),t.__reactInternalMemoizedMergedChildContext=e,Te(zr),Te(ur),Ne(ur,e)):Te(zr),Ne(zr,n)}var rt=null,pc=!1,cu=!1;function Yx(e){rt===null?rt=[e]:rt.push(e)}function TS(e){pc=!0,Yx(e)}function oa(){if(!cu&&rt!==null){cu=!0;var e=0,r=be;try{var n=rt;for(be=1;e<n.length;e++){var t=n[e];do t=t(!0);while(t!==null)}rt=null,pc=!1}catch(a){throw rt!==null&&(rt=rt.slice(e+1)),bx(Dm,oa),a}finally{be=r,cu=!1}}return null}var so=[],io=0,ql=null,Rl=0,Zr=[],en=0,Ia=null,tt=1,at="";function pa(e,r){so[io++]=Rl,so[io++]=ql,ql=e,Rl=r}function Kx(e,r,n){Zr[en++]=tt,Zr[en++]=at,Zr[en++]=Ia,Ia=e;var t=tt;e=at;var a=32-jn(t)-1;t&=~(1<<a),n+=1;var o=32-jn(r)+a;if(30<o){var s=a-a%5;o=(t&(1<<s)-1).toString(32),t>>=s,a-=s,tt=1<<32-jn(r)+a|n<<a|t,at=o+e}else tt=1<<o|n<<a|t,at=e}function Ym(e){e.return!==null&&(pa(e,1),Kx(e,1,0))}function Km(e){for(;e===ql;)ql=so[--io],so[io]=null,Rl=so[--io],so[io]=null;for(;e===Ia;)Ia=Zr[--en],Zr[en]=null,at=Zr[--en],Zr[en]=null,tt=Zr[--en],Zr[en]=null}var Hr=null,Ur=null,Re=!1,bn=null;function Xx(e,r){var n=tn(5,null,null,0);n.elementType="DELETED",n.stateNode=r,n.return=e,r=e.deletions,r===null?(e.deletions=[n],e.flags|=16):r.push(n)}function lh(e,r){switch(e.tag){case 5:var n=e.type;return r=r.nodeType!==1||n.toLowerCase()!==r.nodeName.toLowerCase()?null:r,r!==null?(e.stateNode=r,Hr=e,Ur=Ut(r.firstChild),!0):!1;case 6:return r=e.pendingProps===""||r.nodeType!==3?null:r,r!==null?(e.stateNode=r,Hr=e,Ur=null,!0):!1;case 13:return r=r.nodeType!==8?null:r,r!==null?(n=Ia!==null?{id:tt,overflow:at}:null,e.memoizedState={dehydrated:r,treeContext:n,retryLane:1073741824},n=tn(18,null,null,0),n.stateNode=r,n.return=e,e.child=n,Hr=e,Ur=null,!0):!1;default:return!1}}function vd(e){return(e.mode&1)!==0&&(e.flags&128)===0}function xd(e){if(Re){var r=Ur;if(r){var n=r;if(!lh(e,r)){if(vd(e))throw Error(B(418));r=Ut(n.nextSibling);var t=Hr;r&&lh(e,r)?Xx(t,n):(e.flags=e.flags&-4097|2,Re=!1,Hr=e)}}else{if(vd(e))throw Error(B(418));e.flags=e.flags&-4097|2,Re=!1,Hr=e}}}function ch(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Hr=e}function Di(e){if(e!==Hr)return!1;if(!Re)return ch(e),Re=!0,!1;var r;if((r=e.tag!==3)&&!(r=e.tag!==5)&&(r=e.type,r=r!=="head"&&r!=="body"&&!pd(e.type,e.memoizedProps)),r&&(r=Ur)){if(vd(e))throw Jx(),Error(B(418));for(;r;)Xx(e,r),r=Ut(r.nextSibling)}if(ch(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(B(317));e:{for(e=e.nextSibling,r=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(r===0){Ur=Ut(e.nextSibling);break e}r--}else n!=="$"&&n!=="$!"&&n!=="$?"||r++}e=e.nextSibling}Ur=null}}else Ur=Hr?Ut(e.stateNode.nextSibling):null;return!0}function Jx(){for(var e=Ur;e;)e=Ut(e.nextSibling)}function Mo(){Ur=Hr=null,Re=!1}function Xm(e){bn===null?bn=[e]:bn.push(e)}var zS=mt.ReactCurrentBatchConfig;function ls(e,r,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(B(309));var t=n.stateNode}if(!t)throw Error(B(147,e));var a=t,o=""+e;return r!==null&&r.ref!==null&&typeof r.ref=="function"&&r.ref._stringRef===o?r.ref:(r=function(s){var l=a.refs;s===null?delete l[o]:l[o]=s},r._stringRef=o,r)}if(typeof e!="string")throw Error(B(284));if(!n._owner)throw Error(B(290,e))}return e}function Bi(e,r){throw e=Object.prototype.toString.call(r),Error(B(31,e==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":e))}function uh(e){var r=e._init;return r(e._payload)}function Zx(e){function r(h,v){if(e){var w=h.deletions;w===null?(h.deletions=[v],h.flags|=16):w.push(v)}}function n(h,v){if(!e)return null;for(;v!==null;)r(h,v),v=v.sibling;return null}function t(h,v){for(h=new Map;v!==null;)v.key!==null?h.set(v.key,v):h.set(v.index,v),v=v.sibling;return h}function a(h,v){return h=Wt(h,v),h.index=0,h.sibling=null,h}function o(h,v,w){return h.index=w,e?(w=h.alternate,w!==null?(w=w.index,w<v?(h.flags|=2,v):w):(h.flags|=2,v)):(h.flags|=1048576,v)}function s(h){return e&&h.alternate===null&&(h.flags|=2),h}function l(h,v,w,j){return v===null||v.tag!==6?(v=gu(w,h.mode,j),v.return=h,v):(v=a(v,w),v.return=h,v)}function c(h,v,w,j){var E=w.type;return E===eo?d(h,v,w.props.children,j,w.key):v!==null&&(v.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Nt&&uh(E)===v.type)?(j=a(v,w.props),j.ref=ls(h,v,w),j.return=h,j):(j=ml(w.type,w.key,w.props,null,h.mode,j),j.ref=ls(h,v,w),j.return=h,j)}function u(h,v,w,j){return v===null||v.tag!==4||v.stateNode.containerInfo!==w.containerInfo||v.stateNode.implementation!==w.implementation?(v=vu(w,h.mode,j),v.return=h,v):(v=a(v,w.children||[]),v.return=h,v)}function d(h,v,w,j,E){return v===null||v.tag!==7?(v=Ra(w,h.mode,j,E),v.return=h,v):(v=a(v,w),v.return=h,v)}function m(h,v,w){if(typeof v=="string"&&v!==""||typeof v=="number")return v=gu(""+v,h.mode,w),v.return=h,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case zi:return w=ml(v.type,v.key,v.props,null,h.mode,w),w.ref=ls(h,null,v),w.return=h,w;case Za:return v=vu(v,h.mode,w),v.return=h,v;case Nt:var j=v._init;return m(h,j(v._payload),w)}if(xs(v)||ts(v))return v=Ra(v,h.mode,w,null),v.return=h,v;Bi(h,v)}return null}function f(h,v,w,j){var E=v!==null?v.key:null;if(typeof w=="string"&&w!==""||typeof w=="number")return E!==null?null:l(h,v,""+w,j);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case zi:return w.key===E?c(h,v,w,j):null;case Za:return w.key===E?u(h,v,w,j):null;case Nt:return E=w._init,f(h,v,E(w._payload),j)}if(xs(w)||ts(w))return E!==null?null:d(h,v,w,j,null);Bi(h,w)}return null}function p(h,v,w,j,E){if(typeof j=="string"&&j!==""||typeof j=="number")return h=h.get(w)||null,l(v,h,""+j,E);if(typeof j=="object"&&j!==null){switch(j.$$typeof){case zi:return h=h.get(j.key===null?w:j.key)||null,c(v,h,j,E);case Za:return h=h.get(j.key===null?w:j.key)||null,u(v,h,j,E);case Nt:var N=j._init;return p(h,v,w,N(j._payload),E)}if(xs(j)||ts(j))return h=h.get(w)||null,d(v,h,j,E,null);Bi(v,j)}return null}function y(h,v,w,j){for(var E=null,N=null,P=v,k=v=0,z=null;P!==null&&k<w.length;k++){P.index>k?(z=P,P=null):z=P.sibling;var A=f(h,P,w[k],j);if(A===null){P===null&&(P=z);break}e&&P&&A.alternate===null&&r(h,P),v=o(A,v,k),N===null?E=A:N.sibling=A,N=A,P=z}if(k===w.length)return n(h,P),Re&&pa(h,k),E;if(P===null){for(;k<w.length;k++)P=m(h,w[k],j),P!==null&&(v=o(P,v,k),N===null?E=P:N.sibling=P,N=P);return Re&&pa(h,k),E}for(P=t(h,P);k<w.length;k++)z=p(P,h,k,w[k],j),z!==null&&(e&&z.alternate!==null&&P.delete(z.key===null?k:z.key),v=o(z,v,k),N===null?E=z:N.sibling=z,N=z);return e&&P.forEach(function(I){return r(h,I)}),Re&&pa(h,k),E}function g(h,v,w,j){var E=ts(w);if(typeof E!="function")throw Error(B(150));if(w=E.call(w),w==null)throw Error(B(151));for(var N=E=null,P=v,k=v=0,z=null,A=w.next();P!==null&&!A.done;k++,A=w.next()){P.index>k?(z=P,P=null):z=P.sibling;var I=f(h,P,A.value,j);if(I===null){P===null&&(P=z);break}e&&P&&I.alternate===null&&r(h,P),v=o(I,v,k),N===null?E=I:N.sibling=I,N=I,P=z}if(A.done)return n(h,P),Re&&pa(h,k),E;if(P===null){for(;!A.done;k++,A=w.next())A=m(h,A.value,j),A!==null&&(v=o(A,v,k),N===null?E=A:N.sibling=A,N=A);return Re&&pa(h,k),E}for(P=t(h,P);!A.done;k++,A=w.next())A=p(P,h,k,A.value,j),A!==null&&(e&&A.alternate!==null&&P.delete(A.key===null?k:A.key),v=o(A,v,k),N===null?E=A:N.sibling=A,N=A);return e&&P.forEach(function(_){return r(h,_)}),Re&&pa(h,k),E}function b(h,v,w,j){if(typeof w=="object"&&w!==null&&w.type===eo&&w.key===null&&(w=w.props.children),typeof w=="object"&&w!==null){switch(w.$$typeof){case zi:e:{for(var E=w.key,N=v;N!==null;){if(N.key===E){if(E=w.type,E===eo){if(N.tag===7){n(h,N.sibling),v=a(N,w.props.children),v.return=h,h=v;break e}}else if(N.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Nt&&uh(E)===N.type){n(h,N.sibling),v=a(N,w.props),v.ref=ls(h,N,w),v.return=h,h=v;break e}n(h,N);break}else r(h,N);N=N.sibling}w.type===eo?(v=Ra(w.props.children,h.mode,j,w.key),v.return=h,h=v):(j=ml(w.type,w.key,w.props,null,h.mode,j),j.ref=ls(h,v,w),j.return=h,h=j)}return s(h);case Za:e:{for(N=w.key;v!==null;){if(v.key===N)if(v.tag===4&&v.stateNode.containerInfo===w.containerInfo&&v.stateNode.implementation===w.implementation){n(h,v.sibling),v=a(v,w.children||[]),v.return=h,h=v;break e}else{n(h,v);break}else r(h,v);v=v.sibling}v=vu(w,h.mode,j),v.return=h,h=v}return s(h);case Nt:return N=w._init,b(h,v,N(w._payload),j)}if(xs(w))return y(h,v,w,j);if(ts(w))return g(h,v,w,j);Bi(h,w)}return typeof w=="string"&&w!==""||typeof w=="number"?(w=""+w,v!==null&&v.tag===6?(n(h,v.sibling),v=a(v,w),v.return=h,h=v):(n(h,v),v=gu(w,h.mode,j),v.return=h,h=v),s(h)):n(h,v)}return b}var Lo=Zx(!0),ey=Zx(!1),_l=aa(null),Ol=null,lo=null,Jm=null;function Zm(){Jm=lo=Ol=null}function ep(e){var r=_l.current;Te(_l),e._currentValue=r}function yd(e,r,n){for(;e!==null;){var t=e.alternate;if((e.childLanes&r)!==r?(e.childLanes|=r,t!==null&&(t.childLanes|=r)):t!==null&&(t.childLanes&r)!==r&&(t.childLanes|=r),e===n)break;e=e.return}}function go(e,r){Ol=e,Jm=lo=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&r&&(Tr=!0),e.firstContext=null)}function on(e){var r=e._currentValue;if(Jm!==e)if(e={context:e,memoizedValue:r,next:null},lo===null){if(Ol===null)throw Error(B(308));lo=e,Ol.dependencies={lanes:0,firstContext:e}}else lo=lo.next=e;return r}var ba=null;function rp(e){ba===null?ba=[e]:ba.push(e)}function ry(e,r,n,t){var a=r.interleaved;return a===null?(n.next=n,rp(r)):(n.next=a.next,a.next=n),r.interleaved=n,lt(e,t)}function lt(e,r){e.lanes|=r;var n=e.alternate;for(n!==null&&(n.lanes|=r),n=e,e=e.return;e!==null;)e.childLanes|=r,n=e.alternate,n!==null&&(n.childLanes|=r),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Et=!1;function np(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ny(e,r){e=e.updateQueue,r.updateQueue===e&&(r.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function ot(e,r){return{eventTime:e,lane:r,tag:0,payload:null,callback:null,next:null}}function Vt(e,r,n){var t=e.updateQueue;if(t===null)return null;if(t=t.shared,pe&2){var a=t.pending;return a===null?r.next=r:(r.next=a.next,a.next=r),t.pending=r,lt(e,n)}return a=t.interleaved,a===null?(r.next=r,rp(t)):(r.next=a.next,a.next=r),t.interleaved=r,lt(e,n)}function sl(e,r,n){if(r=r.updateQueue,r!==null&&(r=r.shared,(n&4194240)!==0)){var t=r.lanes;t&=e.pendingLanes,n|=t,r.lanes=n,Bm(e,n)}}function dh(e,r){var n=e.updateQueue,t=e.alternate;if(t!==null&&(t=t.updateQueue,n===t)){var a=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?a=o=s:o=o.next=s,n=n.next}while(n!==null);o===null?a=o=r:o=o.next=r}else a=o=r;n={baseState:t.baseState,firstBaseUpdate:a,lastBaseUpdate:o,shared:t.shared,effects:t.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=r:e.next=r,n.lastBaseUpdate=r}function Il(e,r,n,t){var a=e.updateQueue;Et=!1;var o=a.firstBaseUpdate,s=a.lastBaseUpdate,l=a.shared.pending;if(l!==null){a.shared.pending=null;var c=l,u=c.next;c.next=null,s===null?o=u:s.next=u,s=c;var d=e.alternate;d!==null&&(d=d.updateQueue,l=d.lastBaseUpdate,l!==s&&(l===null?d.firstBaseUpdate=u:l.next=u,d.lastBaseUpdate=c))}if(o!==null){var m=a.baseState;s=0,d=u=c=null,l=o;do{var f=l.lane,p=l.eventTime;if((t&f)===f){d!==null&&(d=d.next={eventTime:p,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var y=e,g=l;switch(f=r,p=n,g.tag){case 1:if(y=g.payload,typeof y=="function"){m=y.call(p,m,f);break e}m=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=g.payload,f=typeof y=="function"?y.call(p,m,f):y,f==null)break e;m=Ie({},m,f);break e;case 2:Et=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,f=a.effects,f===null?a.effects=[l]:f.push(l))}else p={eventTime:p,lane:f,tag:l.tag,payload:l.payload,callback:l.callback,next:null},d===null?(u=d=p,c=m):d=d.next=p,s|=f;if(l=l.next,l===null){if(l=a.shared.pending,l===null)break;f=l,l=f.next,f.next=null,a.lastBaseUpdate=f,a.shared.pending=null}}while(!0);if(d===null&&(c=m),a.baseState=c,a.firstBaseUpdate=u,a.lastBaseUpdate=d,r=a.shared.interleaved,r!==null){a=r;do s|=a.lane,a=a.next;while(a!==r)}else o===null&&(a.shared.lanes=0);La|=s,e.lanes=s,e.memoizedState=m}}function mh(e,r,n){if(e=r.effects,r.effects=null,e!==null)for(r=0;r<e.length;r++){var t=e[r],a=t.callback;if(a!==null){if(t.callback=null,t=n,typeof a!="function")throw Error(B(191,a));a.call(t)}}}var vi={},Bn=aa(vi),Ys=aa(vi),Ks=aa(vi);function wa(e){if(e===vi)throw Error(B(174));return e}function tp(e,r){switch(Ne(Ks,r),Ne(Ys,e),Ne(Bn,vi),e=r.nodeType,e){case 9:case 11:r=(r=r.documentElement)?r.namespaceURI:Zu(null,"");break;default:e=e===8?r.parentNode:r,r=e.namespaceURI||null,e=e.tagName,r=Zu(r,e)}Te(Bn),Ne(Bn,r)}function Fo(){Te(Bn),Te(Ys),Te(Ks)}function ty(e){wa(Ks.current);var r=wa(Bn.current),n=Zu(r,e.type);r!==n&&(Ne(Ys,e),Ne(Bn,n))}function ap(e){Ys.current===e&&(Te(Bn),Te(Ys))}var _e=aa(0);function Ml(e){for(var r=e;r!==null;){if(r.tag===13){var n=r.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return r}else if(r.tag===19&&r.memoizedProps.revealOrder!==void 0){if(r.flags&128)return r}else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)break;for(;r.sibling===null;){if(r.return===null||r.return===e)return null;r=r.return}r.sibling.return=r.return,r=r.sibling}return null}var uu=[];function op(){for(var e=0;e<uu.length;e++)uu[e]._workInProgressVersionPrimary=null;uu.length=0}var il=mt.ReactCurrentDispatcher,du=mt.ReactCurrentBatchConfig,Ma=0,Oe=null,Qe=null,Ye=null,Ll=!1,Ts=!1,Xs=0,AS=0;function or(){throw Error(B(321))}function sp(e,r){if(r===null)return!1;for(var n=0;n<r.length&&n<e.length;n++)if(!Cn(e[n],r[n]))return!1;return!0}function ip(e,r,n,t,a,o){if(Ma=o,Oe=r,r.memoizedState=null,r.updateQueue=null,r.lanes=0,il.current=e===null||e.memoizedState===null?OS:IS,e=n(t,a),Ts){o=0;do{if(Ts=!1,Xs=0,25<=o)throw Error(B(301));o+=1,Ye=Qe=null,r.updateQueue=null,il.current=MS,e=n(t,a)}while(Ts)}if(il.current=Fl,r=Qe!==null&&Qe.next!==null,Ma=0,Ye=Qe=Oe=null,Ll=!1,r)throw Error(B(300));return e}function lp(){var e=Xs!==0;return Xs=0,e}function An(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ye===null?Oe.memoizedState=Ye=e:Ye=Ye.next=e,Ye}function sn(){if(Qe===null){var e=Oe.alternate;e=e!==null?e.memoizedState:null}else e=Qe.next;var r=Ye===null?Oe.memoizedState:Ye.next;if(r!==null)Ye=r,Qe=e;else{if(e===null)throw Error(B(310));Qe=e,e={memoizedState:Qe.memoizedState,baseState:Qe.baseState,baseQueue:Qe.baseQueue,queue:Qe.queue,next:null},Ye===null?Oe.memoizedState=Ye=e:Ye=Ye.next=e}return Ye}function Js(e,r){return typeof r=="function"?r(e):r}function mu(e){var r=sn(),n=r.queue;if(n===null)throw Error(B(311));n.lastRenderedReducer=e;var t=Qe,a=t.baseQueue,o=n.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,n.pending=null}if(a!==null){o=a.next,t=t.baseState;var l=s=null,c=null,u=o;do{var d=u.lane;if((Ma&d)===d)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),t=u.hasEagerState?u.eagerState:e(t,u.action);else{var m={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(l=c=m,s=t):c=c.next=m,Oe.lanes|=d,La|=d}u=u.next}while(u!==null&&u!==o);c===null?s=t:c.next=l,Cn(t,r.memoizedState)||(Tr=!0),r.memoizedState=t,r.baseState=s,r.baseQueue=c,n.lastRenderedState=t}if(e=n.interleaved,e!==null){a=e;do o=a.lane,Oe.lanes|=o,La|=o,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[r.memoizedState,n.dispatch]}function pu(e){var r=sn(),n=r.queue;if(n===null)throw Error(B(311));n.lastRenderedReducer=e;var t=n.dispatch,a=n.pending,o=r.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Cn(o,r.memoizedState)||(Tr=!0),r.memoizedState=o,r.baseQueue===null&&(r.baseState=o),n.lastRenderedState=o}return[o,t]}function ay(){}function oy(e,r){var n=Oe,t=sn(),a=r(),o=!Cn(t.memoizedState,a);if(o&&(t.memoizedState=a,Tr=!0),t=t.queue,cp(ly.bind(null,n,t,e),[e]),t.getSnapshot!==r||o||Ye!==null&&Ye.memoizedState.tag&1){if(n.flags|=2048,Zs(9,iy.bind(null,n,t,a,r),void 0,null),Ke===null)throw Error(B(349));Ma&30||sy(n,r,a)}return a}function sy(e,r,n){e.flags|=16384,e={getSnapshot:r,value:n},r=Oe.updateQueue,r===null?(r={lastEffect:null,stores:null},Oe.updateQueue=r,r.stores=[e]):(n=r.stores,n===null?r.stores=[e]:n.push(e))}function iy(e,r,n,t){r.value=n,r.getSnapshot=t,cy(r)&&uy(e)}function ly(e,r,n){return n(function(){cy(r)&&uy(e)})}function cy(e){var r=e.getSnapshot;e=e.value;try{var n=r();return!Cn(e,n)}catch{return!0}}function uy(e){var r=lt(e,1);r!==null&&Sn(r,e,1,-1)}function ph(e){var r=An();return typeof e=="function"&&(e=e()),r.memoizedState=r.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Js,lastRenderedState:e},r.queue=e,e=e.dispatch=_S.bind(null,Oe,e),[r.memoizedState,e]}function Zs(e,r,n,t){return e={tag:e,create:r,destroy:n,deps:t,next:null},r=Oe.updateQueue,r===null?(r={lastEffect:null,stores:null},Oe.updateQueue=r,r.lastEffect=e.next=e):(n=r.lastEffect,n===null?r.lastEffect=e.next=e:(t=n.next,n.next=e,e.next=t,r.lastEffect=e)),e}function dy(){return sn().memoizedState}function ll(e,r,n,t){var a=An();Oe.flags|=e,a.memoizedState=Zs(1|r,n,void 0,t===void 0?null:t)}function fc(e,r,n,t){var a=sn();t=t===void 0?null:t;var o=void 0;if(Qe!==null){var s=Qe.memoizedState;if(o=s.destroy,t!==null&&sp(t,s.deps)){a.memoizedState=Zs(r,n,o,t);return}}Oe.flags|=e,a.memoizedState=Zs(1|r,n,o,t)}function fh(e,r){return ll(8390656,8,e,r)}function cp(e,r){return fc(2048,8,e,r)}function my(e,r){return fc(4,2,e,r)}function py(e,r){return fc(4,4,e,r)}function fy(e,r){if(typeof r=="function")return e=e(),r(e),function(){r(null)};if(r!=null)return e=e(),r.current=e,function(){r.current=null}}function hy(e,r,n){return n=n!=null?n.concat([e]):null,fc(4,4,fy.bind(null,r,e),n)}function up(){}function gy(e,r){var n=sn();r=r===void 0?null:r;var t=n.memoizedState;return t!==null&&r!==null&&sp(r,t[1])?t[0]:(n.memoizedState=[e,r],e)}function vy(e,r){var n=sn();r=r===void 0?null:r;var t=n.memoizedState;return t!==null&&r!==null&&sp(r,t[1])?t[0]:(e=e(),n.memoizedState=[e,r],e)}function xy(e,r,n){return Ma&21?(Cn(n,r)||(n=Sx(),Oe.lanes|=n,La|=n,e.baseState=!0),r):(e.baseState&&(e.baseState=!1,Tr=!0),e.memoizedState=n)}function qS(e,r){var n=be;be=n!==0&&4>n?n:4,e(!0);var t=du.transition;du.transition={};try{e(!1),r()}finally{be=n,du.transition=t}}function yy(){return sn().memoizedState}function RS(e,r,n){var t=Qt(e);if(n={lane:t,action:n,hasEagerState:!1,eagerState:null,next:null},by(e))wy(r,n);else if(n=ry(e,r,n,t),n!==null){var a=xr();Sn(n,e,t,a),jy(n,r,t)}}function _S(e,r,n){var t=Qt(e),a={lane:t,action:n,hasEagerState:!1,eagerState:null,next:null};if(by(e))wy(r,a);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=r.lastRenderedReducer,o!==null))try{var s=r.lastRenderedState,l=o(s,n);if(a.hasEagerState=!0,a.eagerState=l,Cn(l,s)){var c=r.interleaved;c===null?(a.next=a,rp(r)):(a.next=c.next,c.next=a),r.interleaved=a;return}}catch{}finally{}n=ry(e,r,a,t),n!==null&&(a=xr(),Sn(n,e,t,a),jy(n,r,t))}}function by(e){var r=e.alternate;return e===Oe||r!==null&&r===Oe}function wy(e,r){Ts=Ll=!0;var n=e.pending;n===null?r.next=r:(r.next=n.next,n.next=r),e.pending=r}function jy(e,r,n){if(n&4194240){var t=r.lanes;t&=e.pendingLanes,n|=t,r.lanes=n,Bm(e,n)}}var Fl={readContext:on,useCallback:or,useContext:or,useEffect:or,useImperativeHandle:or,useInsertionEffect:or,useLayoutEffect:or,useMemo:or,useReducer:or,useRef:or,useState:or,useDebugValue:or,useDeferredValue:or,useTransition:or,useMutableSource:or,useSyncExternalStore:or,useId:or,unstable_isNewReconciler:!1},OS={readContext:on,useCallback:function(e,r){return An().memoizedState=[e,r===void 0?null:r],e},useContext:on,useEffect:fh,useImperativeHandle:function(e,r,n){return n=n!=null?n.concat([e]):null,ll(4194308,4,fy.bind(null,r,e),n)},useLayoutEffect:function(e,r){return ll(4194308,4,e,r)},useInsertionEffect:function(e,r){return ll(4,2,e,r)},useMemo:function(e,r){var n=An();return r=r===void 0?null:r,e=e(),n.memoizedState=[e,r],e},useReducer:function(e,r,n){var t=An();return r=n!==void 0?n(r):r,t.memoizedState=t.baseState=r,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:r},t.queue=e,e=e.dispatch=RS.bind(null,Oe,e),[t.memoizedState,e]},useRef:function(e){var r=An();return e={current:e},r.memoizedState=e},useState:ph,useDebugValue:up,useDeferredValue:function(e){return An().memoizedState=e},useTransition:function(){var e=ph(!1),r=e[0];return e=qS.bind(null,e[1]),An().memoizedState=e,[r,e]},useMutableSource:function(){},useSyncExternalStore:function(e,r,n){var t=Oe,a=An();if(Re){if(n===void 0)throw Error(B(407));n=n()}else{if(n=r(),Ke===null)throw Error(B(349));Ma&30||sy(t,r,n)}a.memoizedState=n;var o={value:n,getSnapshot:r};return a.queue=o,fh(ly.bind(null,t,o,e),[e]),t.flags|=2048,Zs(9,iy.bind(null,t,o,n,r),void 0,null),n},useId:function(){var e=An(),r=Ke.identifierPrefix;if(Re){var n=at,t=tt;n=(t&~(1<<32-jn(t)-1)).toString(32)+n,r=":"+r+"R"+n,n=Xs++,0<n&&(r+="H"+n.toString(32)),r+=":"}else n=AS++,r=":"+r+"r"+n.toString(32)+":";return e.memoizedState=r},unstable_isNewReconciler:!1},IS={readContext:on,useCallback:gy,useContext:on,useEffect:cp,useImperativeHandle:hy,useInsertionEffect:my,useLayoutEffect:py,useMemo:vy,useReducer:mu,useRef:dy,useState:function(){return mu(Js)},useDebugValue:up,useDeferredValue:function(e){var r=sn();return xy(r,Qe.memoizedState,e)},useTransition:function(){var e=mu(Js)[0],r=sn().memoizedState;return[e,r]},useMutableSource:ay,useSyncExternalStore:oy,useId:yy,unstable_isNewReconciler:!1},MS={readContext:on,useCallback:gy,useContext:on,useEffect:cp,useImperativeHandle:hy,useInsertionEffect:my,useLayoutEffect:py,useMemo:vy,useReducer:pu,useRef:dy,useState:function(){return pu(Js)},useDebugValue:up,useDeferredValue:function(e){var r=sn();return Qe===null?r.memoizedState=e:xy(r,Qe.memoizedState,e)},useTransition:function(){var e=pu(Js)[0],r=sn().memoizedState;return[e,r]},useMutableSource:ay,useSyncExternalStore:oy,useId:yy,unstable_isNewReconciler:!1};function gn(e,r){if(e&&e.defaultProps){r=Ie({},r),e=e.defaultProps;for(var n in e)r[n]===void 0&&(r[n]=e[n]);return r}return r}function bd(e,r,n,t){r=e.memoizedState,n=n(t,r),n=n==null?r:Ie({},r,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var hc={isMounted:function(e){return(e=e._reactInternals)?Va(e)===e:!1},enqueueSetState:function(e,r,n){e=e._reactInternals;var t=xr(),a=Qt(e),o=ot(t,a);o.payload=r,n!=null&&(o.callback=n),r=Vt(e,o,a),r!==null&&(Sn(r,e,a,t),sl(r,e,a))},enqueueReplaceState:function(e,r,n){e=e._reactInternals;var t=xr(),a=Qt(e),o=ot(t,a);o.tag=1,o.payload=r,n!=null&&(o.callback=n),r=Vt(e,o,a),r!==null&&(Sn(r,e,a,t),sl(r,e,a))},enqueueForceUpdate:function(e,r){e=e._reactInternals;var n=xr(),t=Qt(e),a=ot(n,t);a.tag=2,r!=null&&(a.callback=r),r=Vt(e,a,t),r!==null&&(Sn(r,e,t,n),sl(r,e,t))}};function hh(e,r,n,t,a,o,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(t,o,s):r.prototype&&r.prototype.isPureReactComponent?!Hs(n,t)||!Hs(a,o):!0}function Sy(e,r,n){var t=!1,a=Zt,o=r.contextType;return typeof o=="object"&&o!==null?o=on(o):(a=Ar(r)?Oa:ur.current,t=r.contextTypes,o=(t=t!=null)?Io(e,a):Zt),r=new r(n,o),e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=hc,e.stateNode=r,r._reactInternals=e,t&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=o),r}function gh(e,r,n,t){e=r.state,typeof r.componentWillReceiveProps=="function"&&r.componentWillReceiveProps(n,t),typeof r.UNSAFE_componentWillReceiveProps=="function"&&r.UNSAFE_componentWillReceiveProps(n,t),r.state!==e&&hc.enqueueReplaceState(r,r.state,null)}function wd(e,r,n,t){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},np(e);var o=r.contextType;typeof o=="object"&&o!==null?a.context=on(o):(o=Ar(r)?Oa:ur.current,a.context=Io(e,o)),a.state=e.memoizedState,o=r.getDerivedStateFromProps,typeof o=="function"&&(bd(e,r,o,n),a.state=e.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(r=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),r!==a.state&&hc.enqueueReplaceState(a,a.state,null),Il(e,n,a,t),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function Do(e,r){try{var n="",t=r;do n+=dj(t),t=t.return;while(t);var a=n}catch(o){a=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:r,stack:a,digest:null}}function fu(e,r,n){return{value:e,source:null,stack:n??null,digest:r??null}}function jd(e,r){try{console.error(r.value)}catch(n){setTimeout(function(){throw n})}}var LS=typeof WeakMap=="function"?WeakMap:Map;function Cy(e,r,n){n=ot(-1,n),n.tag=3,n.payload={element:null};var t=r.value;return n.callback=function(){Bl||(Bl=!0,qd=t),jd(e,r)},n}function Ny(e,r,n){n=ot(-1,n),n.tag=3;var t=e.type.getDerivedStateFromError;if(typeof t=="function"){var a=r.value;n.payload=function(){return t(a)},n.callback=function(){jd(e,r)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){jd(e,r),typeof t!="function"&&(Ht===null?Ht=new Set([this]):Ht.add(this));var s=r.stack;this.componentDidCatch(r.value,{componentStack:s!==null?s:""})}),n}function vh(e,r,n){var t=e.pingCache;if(t===null){t=e.pingCache=new LS;var a=new Set;t.set(r,a)}else a=t.get(r),a===void 0&&(a=new Set,t.set(r,a));a.has(n)||(a.add(n),e=JS.bind(null,e,r,n),r.then(e,e))}function xh(e){do{var r;if((r=e.tag===13)&&(r=e.memoizedState,r=r!==null?r.dehydrated!==null:!0),r)return e;e=e.return}while(e!==null);return null}function yh(e,r,n,t,a){return e.mode&1?(e.flags|=65536,e.lanes=a,e):(e===r?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(r=ot(-1,1),r.tag=2,Vt(n,r,1))),n.lanes|=1),e)}var FS=mt.ReactCurrentOwner,Tr=!1;function hr(e,r,n,t){r.child=e===null?ey(r,null,n,t):Lo(r,e.child,n,t)}function bh(e,r,n,t,a){n=n.render;var o=r.ref;return go(r,a),t=ip(e,r,n,t,o,a),n=lp(),e!==null&&!Tr?(r.updateQueue=e.updateQueue,r.flags&=-2053,e.lanes&=~a,ct(e,r,a)):(Re&&n&&Ym(r),r.flags|=1,hr(e,r,t,a),r.child)}function wh(e,r,n,t,a){if(e===null){var o=n.type;return typeof o=="function"&&!xp(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(r.tag=15,r.type=o,Ey(e,r,o,t,a)):(e=ml(n.type,null,t,r,r.mode,a),e.ref=r.ref,e.return=r,r.child=e)}if(o=e.child,!(e.lanes&a)){var s=o.memoizedProps;if(n=n.compare,n=n!==null?n:Hs,n(s,t)&&e.ref===r.ref)return ct(e,r,a)}return r.flags|=1,e=Wt(o,t),e.ref=r.ref,e.return=r,r.child=e}function Ey(e,r,n,t,a){if(e!==null){var o=e.memoizedProps;if(Hs(o,t)&&e.ref===r.ref)if(Tr=!1,r.pendingProps=t=o,(e.lanes&a)!==0)e.flags&131072&&(Tr=!0);else return r.lanes=e.lanes,ct(e,r,a)}return Sd(e,r,n,t,a)}function ky(e,r,n){var t=r.pendingProps,a=t.children,o=e!==null?e.memoizedState:null;if(t.mode==="hidden")if(!(r.mode&1))r.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ne(uo,Dr),Dr|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,r.lanes=r.childLanes=1073741824,r.memoizedState={baseLanes:e,cachePool:null,transitions:null},r.updateQueue=null,Ne(uo,Dr),Dr|=e,null;r.memoizedState={baseLanes:0,cachePool:null,transitions:null},t=o!==null?o.baseLanes:n,Ne(uo,Dr),Dr|=t}else o!==null?(t=o.baseLanes|n,r.memoizedState=null):t=n,Ne(uo,Dr),Dr|=t;return hr(e,r,a,n),r.child}function Py(e,r){var n=r.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(r.flags|=512,r.flags|=2097152)}function Sd(e,r,n,t,a){var o=Ar(n)?Oa:ur.current;return o=Io(r,o),go(r,a),n=ip(e,r,n,t,o,a),t=lp(),e!==null&&!Tr?(r.updateQueue=e.updateQueue,r.flags&=-2053,e.lanes&=~a,ct(e,r,a)):(Re&&t&&Ym(r),r.flags|=1,hr(e,r,n,a),r.child)}function jh(e,r,n,t,a){if(Ar(n)){var o=!0;Al(r)}else o=!1;if(go(r,a),r.stateNode===null)cl(e,r),Sy(r,n,t),wd(r,n,t,a),t=!0;else if(e===null){var s=r.stateNode,l=r.memoizedProps;s.props=l;var c=s.context,u=n.contextType;typeof u=="object"&&u!==null?u=on(u):(u=Ar(n)?Oa:ur.current,u=Io(r,u));var d=n.getDerivedStateFromProps,m=typeof d=="function"||typeof s.getSnapshotBeforeUpdate=="function";m||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==t||c!==u)&&gh(r,s,t,u),Et=!1;var f=r.memoizedState;s.state=f,Il(r,t,s,a),c=r.memoizedState,l!==t||f!==c||zr.current||Et?(typeof d=="function"&&(bd(r,n,d,t),c=r.memoizedState),(l=Et||hh(r,n,l,t,f,c,u))?(m||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(r.flags|=4194308)):(typeof s.componentDidMount=="function"&&(r.flags|=4194308),r.memoizedProps=t,r.memoizedState=c),s.props=t,s.state=c,s.context=u,t=l):(typeof s.componentDidMount=="function"&&(r.flags|=4194308),t=!1)}else{s=r.stateNode,ny(e,r),l=r.memoizedProps,u=r.type===r.elementType?l:gn(r.type,l),s.props=u,m=r.pendingProps,f=s.context,c=n.contextType,typeof c=="object"&&c!==null?c=on(c):(c=Ar(n)?Oa:ur.current,c=Io(r,c));var p=n.getDerivedStateFromProps;(d=typeof p=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==m||f!==c)&&gh(r,s,t,c),Et=!1,f=r.memoizedState,s.state=f,Il(r,t,s,a);var y=r.memoizedState;l!==m||f!==y||zr.current||Et?(typeof p=="function"&&(bd(r,n,p,t),y=r.memoizedState),(u=Et||hh(r,n,u,t,f,y,c)||!1)?(d||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(t,y,c),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(t,y,c)),typeof s.componentDidUpdate=="function"&&(r.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(r.flags|=1024)):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&f===e.memoizedState||(r.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&f===e.memoizedState||(r.flags|=1024),r.memoizedProps=t,r.memoizedState=y),s.props=t,s.state=y,s.context=c,t=u):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&f===e.memoizedState||(r.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&f===e.memoizedState||(r.flags|=1024),t=!1)}return Cd(e,r,n,t,o,a)}function Cd(e,r,n,t,a,o){Py(e,r);var s=(r.flags&128)!==0;if(!t&&!s)return a&&ih(r,n,!1),ct(e,r,o);t=r.stateNode,FS.current=r;var l=s&&typeof n.getDerivedStateFromError!="function"?null:t.render();return r.flags|=1,e!==null&&s?(r.child=Lo(r,e.child,null,o),r.child=Lo(r,null,l,o)):hr(e,r,l,o),r.memoizedState=t.state,a&&ih(r,n,!0),r.child}function Ty(e){var r=e.stateNode;r.pendingContext?sh(e,r.pendingContext,r.pendingContext!==r.context):r.context&&sh(e,r.context,!1),tp(e,r.containerInfo)}function Sh(e,r,n,t,a){return Mo(),Xm(a),r.flags|=256,hr(e,r,n,t),r.child}var Nd={dehydrated:null,treeContext:null,retryLane:0};function Ed(e){return{baseLanes:e,cachePool:null,transitions:null}}function zy(e,r,n){var t=r.pendingProps,a=_e.current,o=!1,s=(r.flags&128)!==0,l;if((l=s)||(l=e!==null&&e.memoizedState===null?!1:(a&2)!==0),l?(o=!0,r.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),Ne(_e,a&1),e===null)return xd(r),e=r.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(r.mode&1?e.data==="$!"?r.lanes=8:r.lanes=1073741824:r.lanes=1,null):(s=t.children,e=t.fallback,o?(t=r.mode,o=r.child,s={mode:"hidden",children:s},!(t&1)&&o!==null?(o.childLanes=0,o.pendingProps=s):o=xc(s,t,0,null),e=Ra(e,t,n,null),o.return=r,e.return=r,o.sibling=e,r.child=o,r.child.memoizedState=Ed(n),r.memoizedState=Nd,e):dp(r,s));if(a=e.memoizedState,a!==null&&(l=a.dehydrated,l!==null))return DS(e,r,s,t,l,a,n);if(o){o=t.fallback,s=r.mode,a=e.child,l=a.sibling;var c={mode:"hidden",children:t.children};return!(s&1)&&r.child!==a?(t=r.child,t.childLanes=0,t.pendingProps=c,r.deletions=null):(t=Wt(a,c),t.subtreeFlags=a.subtreeFlags&14680064),l!==null?o=Wt(l,o):(o=Ra(o,s,n,null),o.flags|=2),o.return=r,t.return=r,t.sibling=o,r.child=t,t=o,o=r.child,s=e.child.memoizedState,s=s===null?Ed(n):{baseLanes:s.baseLanes|n,cachePool:null,transitions:s.transitions},o.memoizedState=s,o.childLanes=e.childLanes&~n,r.memoizedState=Nd,t}return o=e.child,e=o.sibling,t=Wt(o,{mode:"visible",children:t.children}),!(r.mode&1)&&(t.lanes=n),t.return=r,t.sibling=null,e!==null&&(n=r.deletions,n===null?(r.deletions=[e],r.flags|=16):n.push(e)),r.child=t,r.memoizedState=null,t}function dp(e,r){return r=xc({mode:"visible",children:r},e.mode,0,null),r.return=e,e.child=r}function $i(e,r,n,t){return t!==null&&Xm(t),Lo(r,e.child,null,n),e=dp(r,r.pendingProps.children),e.flags|=2,r.memoizedState=null,e}function DS(e,r,n,t,a,o,s){if(n)return r.flags&256?(r.flags&=-257,t=fu(Error(B(422))),$i(e,r,s,t)):r.memoizedState!==null?(r.child=e.child,r.flags|=128,null):(o=t.fallback,a=r.mode,t=xc({mode:"visible",children:t.children},a,0,null),o=Ra(o,a,s,null),o.flags|=2,t.return=r,o.return=r,t.sibling=o,r.child=t,r.mode&1&&Lo(r,e.child,null,s),r.child.memoizedState=Ed(s),r.memoizedState=Nd,o);if(!(r.mode&1))return $i(e,r,s,null);if(a.data==="$!"){if(t=a.nextSibling&&a.nextSibling.dataset,t)var l=t.dgst;return t=l,o=Error(B(419)),t=fu(o,t,void 0),$i(e,r,s,t)}if(l=(s&e.childLanes)!==0,Tr||l){if(t=Ke,t!==null){switch(s&-s){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=a&(t.suspendedLanes|s)?0:a,a!==0&&a!==o.retryLane&&(o.retryLane=a,lt(e,a),Sn(t,e,a,-1))}return vp(),t=fu(Error(B(421))),$i(e,r,s,t)}return a.data==="$?"?(r.flags|=128,r.child=e.child,r=ZS.bind(null,e),a._reactRetry=r,null):(e=o.treeContext,Ur=Ut(a.nextSibling),Hr=r,Re=!0,bn=null,e!==null&&(Zr[en++]=tt,Zr[en++]=at,Zr[en++]=Ia,tt=e.id,at=e.overflow,Ia=r),r=dp(r,t.children),r.flags|=4096,r)}function Ch(e,r,n){e.lanes|=r;var t=e.alternate;t!==null&&(t.lanes|=r),yd(e.return,r,n)}function hu(e,r,n,t,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:r,rendering:null,renderingStartTime:0,last:t,tail:n,tailMode:a}:(o.isBackwards=r,o.rendering=null,o.renderingStartTime=0,o.last=t,o.tail=n,o.tailMode=a)}function Ay(e,r,n){var t=r.pendingProps,a=t.revealOrder,o=t.tail;if(hr(e,r,t.children,n),t=_e.current,t&2)t=t&1|2,r.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=r.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ch(e,n,r);else if(e.tag===19)Ch(e,n,r);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===r)break e;for(;e.sibling===null;){if(e.return===null||e.return===r)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}t&=1}if(Ne(_e,t),!(r.mode&1))r.memoizedState=null;else switch(a){case"forwards":for(n=r.child,a=null;n!==null;)e=n.alternate,e!==null&&Ml(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=r.child,r.child=null):(a=n.sibling,n.sibling=null),hu(r,!1,a,n,o);break;case"backwards":for(n=null,a=r.child,r.child=null;a!==null;){if(e=a.alternate,e!==null&&Ml(e)===null){r.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}hu(r,!0,n,null,o);break;case"together":hu(r,!1,null,null,void 0);break;default:r.memoizedState=null}return r.child}function cl(e,r){!(r.mode&1)&&e!==null&&(e.alternate=null,r.alternate=null,r.flags|=2)}function ct(e,r,n){if(e!==null&&(r.dependencies=e.dependencies),La|=r.lanes,!(n&r.childLanes))return null;if(e!==null&&r.child!==e.child)throw Error(B(153));if(r.child!==null){for(e=r.child,n=Wt(e,e.pendingProps),r.child=n,n.return=r;e.sibling!==null;)e=e.sibling,n=n.sibling=Wt(e,e.pendingProps),n.return=r;n.sibling=null}return r.child}function BS(e,r,n){switch(r.tag){case 3:Ty(r),Mo();break;case 5:ty(r);break;case 1:Ar(r.type)&&Al(r);break;case 4:tp(r,r.stateNode.containerInfo);break;case 10:var t=r.type._context,a=r.memoizedProps.value;Ne(_l,t._currentValue),t._currentValue=a;break;case 13:if(t=r.memoizedState,t!==null)return t.dehydrated!==null?(Ne(_e,_e.current&1),r.flags|=128,null):n&r.child.childLanes?zy(e,r,n):(Ne(_e,_e.current&1),e=ct(e,r,n),e!==null?e.sibling:null);Ne(_e,_e.current&1);break;case 19:if(t=(n&r.childLanes)!==0,e.flags&128){if(t)return Ay(e,r,n);r.flags|=128}if(a=r.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Ne(_e,_e.current),t)break;return null;case 22:case 23:return r.lanes=0,ky(e,r,n)}return ct(e,r,n)}var qy,kd,Ry,_y;qy=function(e,r){for(var n=r.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===r)break;for(;n.sibling===null;){if(n.return===null||n.return===r)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};kd=function(){};Ry=function(e,r,n,t){var a=e.memoizedProps;if(a!==t){e=r.stateNode,wa(Bn.current);var o=null;switch(n){case"input":a=Yu(e,a),t=Yu(e,t),o=[];break;case"select":a=Ie({},a,{value:void 0}),t=Ie({},t,{value:void 0}),o=[];break;case"textarea":a=Ju(e,a),t=Ju(e,t),o=[];break;default:typeof a.onClick!="function"&&typeof t.onClick=="function"&&(e.onclick=Tl)}ed(n,t);var s;n=null;for(u in a)if(!t.hasOwnProperty(u)&&a.hasOwnProperty(u)&&a[u]!=null)if(u==="style"){var l=a[u];for(s in l)l.hasOwnProperty(s)&&(n||(n={}),n[s]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Ls.hasOwnProperty(u)?o||(o=[]):(o=o||[]).push(u,null));for(u in t){var c=t[u];if(l=a!=null?a[u]:void 0,t.hasOwnProperty(u)&&c!==l&&(c!=null||l!=null))if(u==="style")if(l){for(s in l)!l.hasOwnProperty(s)||c&&c.hasOwnProperty(s)||(n||(n={}),n[s]="");for(s in c)c.hasOwnProperty(s)&&l[s]!==c[s]&&(n||(n={}),n[s]=c[s])}else n||(o||(o=[]),o.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(o=o||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(o=o||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Ls.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&Pe("scroll",e),o||l===c||(o=[])):(o=o||[]).push(u,c))}n&&(o=o||[]).push("style",n);var u=o;(r.updateQueue=u)&&(r.flags|=4)}};_y=function(e,r,n,t){n!==t&&(r.flags|=4)};function cs(e,r){if(!Re)switch(e.tailMode){case"hidden":r=e.tail;for(var n=null;r!==null;)r.alternate!==null&&(n=r),r=r.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?r||e.tail===null?e.tail=null:e.tail.sibling=null:t.sibling=null}}function sr(e){var r=e.alternate!==null&&e.alternate.child===e.child,n=0,t=0;if(r)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,t|=a.subtreeFlags&14680064,t|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,t|=a.subtreeFlags,t|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=t,e.childLanes=n,r}function $S(e,r,n){var t=r.pendingProps;switch(Km(r),r.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return sr(r),null;case 1:return Ar(r.type)&&zl(),sr(r),null;case 3:return t=r.stateNode,Fo(),Te(zr),Te(ur),op(),t.pendingContext&&(t.context=t.pendingContext,t.pendingContext=null),(e===null||e.child===null)&&(Di(r)?r.flags|=4:e===null||e.memoizedState.isDehydrated&&!(r.flags&256)||(r.flags|=1024,bn!==null&&(Od(bn),bn=null))),kd(e,r),sr(r),null;case 5:ap(r);var a=wa(Ks.current);if(n=r.type,e!==null&&r.stateNode!=null)Ry(e,r,n,t,a),e.ref!==r.ref&&(r.flags|=512,r.flags|=2097152);else{if(!t){if(r.stateNode===null)throw Error(B(166));return sr(r),null}if(e=wa(Bn.current),Di(r)){t=r.stateNode,n=r.type;var o=r.memoizedProps;switch(t[Mn]=r,t[Gs]=o,e=(r.mode&1)!==0,n){case"dialog":Pe("cancel",t),Pe("close",t);break;case"iframe":case"object":case"embed":Pe("load",t);break;case"video":case"audio":for(a=0;a<bs.length;a++)Pe(bs[a],t);break;case"source":Pe("error",t);break;case"img":case"image":case"link":Pe("error",t),Pe("load",t);break;case"details":Pe("toggle",t);break;case"input":Rf(t,o),Pe("invalid",t);break;case"select":t._wrapperState={wasMultiple:!!o.multiple},Pe("invalid",t);break;case"textarea":Of(t,o),Pe("invalid",t)}ed(n,o),a=null;for(var s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="children"?typeof l=="string"?t.textContent!==l&&(o.suppressHydrationWarning!==!0&&Fi(t.textContent,l,e),a=["children",l]):typeof l=="number"&&t.textContent!==""+l&&(o.suppressHydrationWarning!==!0&&Fi(t.textContent,l,e),a=["children",""+l]):Ls.hasOwnProperty(s)&&l!=null&&s==="onScroll"&&Pe("scroll",t)}switch(n){case"input":Ai(t),_f(t,o,!0);break;case"textarea":Ai(t),If(t);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(t.onclick=Tl)}t=a,r.updateQueue=t,t!==null&&(r.flags|=4)}else{s=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=lx(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof t.is=="string"?e=s.createElement(n,{is:t.is}):(e=s.createElement(n),n==="select"&&(s=e,t.multiple?s.multiple=!0:t.size&&(s.size=t.size))):e=s.createElementNS(e,n),e[Mn]=r,e[Gs]=t,qy(e,r,!1,!1),r.stateNode=e;e:{switch(s=rd(n,t),n){case"dialog":Pe("cancel",e),Pe("close",e),a=t;break;case"iframe":case"object":case"embed":Pe("load",e),a=t;break;case"video":case"audio":for(a=0;a<bs.length;a++)Pe(bs[a],e);a=t;break;case"source":Pe("error",e),a=t;break;case"img":case"image":case"link":Pe("error",e),Pe("load",e),a=t;break;case"details":Pe("toggle",e),a=t;break;case"input":Rf(e,t),a=Yu(e,t),Pe("invalid",e);break;case"option":a=t;break;case"select":e._wrapperState={wasMultiple:!!t.multiple},a=Ie({},t,{value:void 0}),Pe("invalid",e);break;case"textarea":Of(e,t),a=Ju(e,t),Pe("invalid",e);break;default:a=t}ed(n,a),l=a;for(o in l)if(l.hasOwnProperty(o)){var c=l[o];o==="style"?dx(e,c):o==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&cx(e,c)):o==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Fs(e,c):typeof c=="number"&&Fs(e,""+c):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Ls.hasOwnProperty(o)?c!=null&&o==="onScroll"&&Pe("scroll",e):c!=null&&Om(e,o,c,s))}switch(n){case"input":Ai(e),_f(e,t,!1);break;case"textarea":Ai(e),If(e);break;case"option":t.value!=null&&e.setAttribute("value",""+Jt(t.value));break;case"select":e.multiple=!!t.multiple,o=t.value,o!=null?mo(e,!!t.multiple,o,!1):t.defaultValue!=null&&mo(e,!!t.multiple,t.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=Tl)}switch(n){case"button":case"input":case"select":case"textarea":t=!!t.autoFocus;break e;case"img":t=!0;break e;default:t=!1}}t&&(r.flags|=4)}r.ref!==null&&(r.flags|=512,r.flags|=2097152)}return sr(r),null;case 6:if(e&&r.stateNode!=null)_y(e,r,e.memoizedProps,t);else{if(typeof t!="string"&&r.stateNode===null)throw Error(B(166));if(n=wa(Ks.current),wa(Bn.current),Di(r)){if(t=r.stateNode,n=r.memoizedProps,t[Mn]=r,(o=t.nodeValue!==n)&&(e=Hr,e!==null))switch(e.tag){case 3:Fi(t.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Fi(t.nodeValue,n,(e.mode&1)!==0)}o&&(r.flags|=4)}else t=(n.nodeType===9?n:n.ownerDocument).createTextNode(t),t[Mn]=r,r.stateNode=t}return sr(r),null;case 13:if(Te(_e),t=r.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Re&&Ur!==null&&r.mode&1&&!(r.flags&128))Jx(),Mo(),r.flags|=98560,o=!1;else if(o=Di(r),t!==null&&t.dehydrated!==null){if(e===null){if(!o)throw Error(B(318));if(o=r.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(B(317));o[Mn]=r}else Mo(),!(r.flags&128)&&(r.memoizedState=null),r.flags|=4;sr(r),o=!1}else bn!==null&&(Od(bn),bn=null),o=!0;if(!o)return r.flags&65536?r:null}return r.flags&128?(r.lanes=n,r):(t=t!==null,t!==(e!==null&&e.memoizedState!==null)&&t&&(r.child.flags|=8192,r.mode&1&&(e===null||_e.current&1?We===0&&(We=3):vp())),r.updateQueue!==null&&(r.flags|=4),sr(r),null);case 4:return Fo(),kd(e,r),e===null&&Qs(r.stateNode.containerInfo),sr(r),null;case 10:return ep(r.type._context),sr(r),null;case 17:return Ar(r.type)&&zl(),sr(r),null;case 19:if(Te(_e),o=r.memoizedState,o===null)return sr(r),null;if(t=(r.flags&128)!==0,s=o.rendering,s===null)if(t)cs(o,!1);else{if(We!==0||e!==null&&e.flags&128)for(e=r.child;e!==null;){if(s=Ml(e),s!==null){for(r.flags|=128,cs(o,!1),t=s.updateQueue,t!==null&&(r.updateQueue=t,r.flags|=4),r.subtreeFlags=0,t=n,n=r.child;n!==null;)o=n,e=t,o.flags&=14680066,s=o.alternate,s===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=s.childLanes,o.lanes=s.lanes,o.child=s.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=s.memoizedProps,o.memoizedState=s.memoizedState,o.updateQueue=s.updateQueue,o.type=s.type,e=s.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Ne(_e,_e.current&1|2),r.child}e=e.sibling}o.tail!==null&&De()>Bo&&(r.flags|=128,t=!0,cs(o,!1),r.lanes=4194304)}else{if(!t)if(e=Ml(s),e!==null){if(r.flags|=128,t=!0,n=e.updateQueue,n!==null&&(r.updateQueue=n,r.flags|=4),cs(o,!0),o.tail===null&&o.tailMode==="hidden"&&!s.alternate&&!Re)return sr(r),null}else 2*De()-o.renderingStartTime>Bo&&n!==1073741824&&(r.flags|=128,t=!0,cs(o,!1),r.lanes=4194304);o.isBackwards?(s.sibling=r.child,r.child=s):(n=o.last,n!==null?n.sibling=s:r.child=s,o.last=s)}return o.tail!==null?(r=o.tail,o.rendering=r,o.tail=r.sibling,o.renderingStartTime=De(),r.sibling=null,n=_e.current,Ne(_e,t?n&1|2:n&1),r):(sr(r),null);case 22:case 23:return gp(),t=r.memoizedState!==null,e!==null&&e.memoizedState!==null!==t&&(r.flags|=8192),t&&r.mode&1?Dr&1073741824&&(sr(r),r.subtreeFlags&6&&(r.flags|=8192)):sr(r),null;case 24:return null;case 25:return null}throw Error(B(156,r.tag))}function US(e,r){switch(Km(r),r.tag){case 1:return Ar(r.type)&&zl(),e=r.flags,e&65536?(r.flags=e&-65537|128,r):null;case 3:return Fo(),Te(zr),Te(ur),op(),e=r.flags,e&65536&&!(e&128)?(r.flags=e&-65537|128,r):null;case 5:return ap(r),null;case 13:if(Te(_e),e=r.memoizedState,e!==null&&e.dehydrated!==null){if(r.alternate===null)throw Error(B(340));Mo()}return e=r.flags,e&65536?(r.flags=e&-65537|128,r):null;case 19:return Te(_e),null;case 4:return Fo(),null;case 10:return ep(r.type._context),null;case 22:case 23:return gp(),null;case 24:return null;default:return null}}var Ui=!1,lr=!1,VS=typeof WeakSet=="function"?WeakSet:Set,G=null;function co(e,r){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(t){Le(e,r,t)}else n.current=null}function Pd(e,r,n){try{n()}catch(t){Le(e,r,t)}}var Nh=!1;function HS(e,r){if(dd=El,e=Fx(),Gm(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var t=n.getSelection&&n.getSelection();if(t&&t.rangeCount!==0){n=t.anchorNode;var a=t.anchorOffset,o=t.focusNode;t=t.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var s=0,l=-1,c=-1,u=0,d=0,m=e,f=null;r:for(;;){for(var p;m!==n||a!==0&&m.nodeType!==3||(l=s+a),m!==o||t!==0&&m.nodeType!==3||(c=s+t),m.nodeType===3&&(s+=m.nodeValue.length),(p=m.firstChild)!==null;)f=m,m=p;for(;;){if(m===e)break r;if(f===n&&++u===a&&(l=s),f===o&&++d===t&&(c=s),(p=m.nextSibling)!==null)break;m=f,f=m.parentNode}m=p}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(md={focusedElem:e,selectionRange:n},El=!1,G=r;G!==null;)if(r=G,e=r.child,(r.subtreeFlags&1028)!==0&&e!==null)e.return=r,G=e;else for(;G!==null;){r=G;try{var y=r.alternate;if(r.flags&1024)switch(r.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var g=y.memoizedProps,b=y.memoizedState,h=r.stateNode,v=h.getSnapshotBeforeUpdate(r.elementType===r.type?g:gn(r.type,g),b);h.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var w=r.stateNode.containerInfo;w.nodeType===1?w.textContent="":w.nodeType===9&&w.documentElement&&w.removeChild(w.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(B(163))}}catch(j){Le(r,r.return,j)}if(e=r.sibling,e!==null){e.return=r.return,G=e;break}G=r.return}return y=Nh,Nh=!1,y}function zs(e,r,n){var t=r.updateQueue;if(t=t!==null?t.lastEffect:null,t!==null){var a=t=t.next;do{if((a.tag&e)===e){var o=a.destroy;a.destroy=void 0,o!==void 0&&Pd(r,n,o)}a=a.next}while(a!==t)}}function gc(e,r){if(r=r.updateQueue,r=r!==null?r.lastEffect:null,r!==null){var n=r=r.next;do{if((n.tag&e)===e){var t=n.create;n.destroy=t()}n=n.next}while(n!==r)}}function Td(e){var r=e.ref;if(r!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof r=="function"?r(e):r.current=e}}function Oy(e){var r=e.alternate;r!==null&&(e.alternate=null,Oy(r)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(r=e.stateNode,r!==null&&(delete r[Mn],delete r[Gs],delete r[hd],delete r[kS],delete r[PS])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Iy(e){return e.tag===5||e.tag===3||e.tag===4}function Eh(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Iy(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function zd(e,r,n){var t=e.tag;if(t===5||t===6)e=e.stateNode,r?n.nodeType===8?n.parentNode.insertBefore(e,r):n.insertBefore(e,r):(n.nodeType===8?(r=n.parentNode,r.insertBefore(e,n)):(r=n,r.appendChild(e)),n=n._reactRootContainer,n!=null||r.onclick!==null||(r.onclick=Tl));else if(t!==4&&(e=e.child,e!==null))for(zd(e,r,n),e=e.sibling;e!==null;)zd(e,r,n),e=e.sibling}function Ad(e,r,n){var t=e.tag;if(t===5||t===6)e=e.stateNode,r?n.insertBefore(e,r):n.appendChild(e);else if(t!==4&&(e=e.child,e!==null))for(Ad(e,r,n),e=e.sibling;e!==null;)Ad(e,r,n),e=e.sibling}var Ze=null,yn=!1;function yt(e,r,n){for(n=n.child;n!==null;)My(e,r,n),n=n.sibling}function My(e,r,n){if(Dn&&typeof Dn.onCommitFiberUnmount=="function")try{Dn.onCommitFiberUnmount(lc,n)}catch{}switch(n.tag){case 5:lr||co(n,r);case 6:var t=Ze,a=yn;Ze=null,yt(e,r,n),Ze=t,yn=a,Ze!==null&&(yn?(e=Ze,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ze.removeChild(n.stateNode));break;case 18:Ze!==null&&(yn?(e=Ze,n=n.stateNode,e.nodeType===8?lu(e.parentNode,n):e.nodeType===1&&lu(e,n),Us(e)):lu(Ze,n.stateNode));break;case 4:t=Ze,a=yn,Ze=n.stateNode.containerInfo,yn=!0,yt(e,r,n),Ze=t,yn=a;break;case 0:case 11:case 14:case 15:if(!lr&&(t=n.updateQueue,t!==null&&(t=t.lastEffect,t!==null))){a=t=t.next;do{var o=a,s=o.destroy;o=o.tag,s!==void 0&&(o&2||o&4)&&Pd(n,r,s),a=a.next}while(a!==t)}yt(e,r,n);break;case 1:if(!lr&&(co(n,r),t=n.stateNode,typeof t.componentWillUnmount=="function"))try{t.props=n.memoizedProps,t.state=n.memoizedState,t.componentWillUnmount()}catch(l){Le(n,r,l)}yt(e,r,n);break;case 21:yt(e,r,n);break;case 22:n.mode&1?(lr=(t=lr)||n.memoizedState!==null,yt(e,r,n),lr=t):yt(e,r,n);break;default:yt(e,r,n)}}function kh(e){var r=e.updateQueue;if(r!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new VS),r.forEach(function(t){var a=eC.bind(null,e,t);n.has(t)||(n.add(t),t.then(a,a))})}}function fn(e,r){var n=r.deletions;if(n!==null)for(var t=0;t<n.length;t++){var a=n[t];try{var o=e,s=r,l=s;e:for(;l!==null;){switch(l.tag){case 5:Ze=l.stateNode,yn=!1;break e;case 3:Ze=l.stateNode.containerInfo,yn=!0;break e;case 4:Ze=l.stateNode.containerInfo,yn=!0;break e}l=l.return}if(Ze===null)throw Error(B(160));My(o,s,a),Ze=null,yn=!1;var c=a.alternate;c!==null&&(c.return=null),a.return=null}catch(u){Le(a,r,u)}}if(r.subtreeFlags&12854)for(r=r.child;r!==null;)Ly(r,e),r=r.sibling}function Ly(e,r){var n=e.alternate,t=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(fn(r,e),zn(e),t&4){try{zs(3,e,e.return),gc(3,e)}catch(g){Le(e,e.return,g)}try{zs(5,e,e.return)}catch(g){Le(e,e.return,g)}}break;case 1:fn(r,e),zn(e),t&512&&n!==null&&co(n,n.return);break;case 5:if(fn(r,e),zn(e),t&512&&n!==null&&co(n,n.return),e.flags&32){var a=e.stateNode;try{Fs(a,"")}catch(g){Le(e,e.return,g)}}if(t&4&&(a=e.stateNode,a!=null)){var o=e.memoizedProps,s=n!==null?n.memoizedProps:o,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&o.type==="radio"&&o.name!=null&&sx(a,o),rd(l,s);var u=rd(l,o);for(s=0;s<c.length;s+=2){var d=c[s],m=c[s+1];d==="style"?dx(a,m):d==="dangerouslySetInnerHTML"?cx(a,m):d==="children"?Fs(a,m):Om(a,d,m,u)}switch(l){case"input":Ku(a,o);break;case"textarea":ix(a,o);break;case"select":var f=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!o.multiple;var p=o.value;p!=null?mo(a,!!o.multiple,p,!1):f!==!!o.multiple&&(o.defaultValue!=null?mo(a,!!o.multiple,o.defaultValue,!0):mo(a,!!o.multiple,o.multiple?[]:"",!1))}a[Gs]=o}catch(g){Le(e,e.return,g)}}break;case 6:if(fn(r,e),zn(e),t&4){if(e.stateNode===null)throw Error(B(162));a=e.stateNode,o=e.memoizedProps;try{a.nodeValue=o}catch(g){Le(e,e.return,g)}}break;case 3:if(fn(r,e),zn(e),t&4&&n!==null&&n.memoizedState.isDehydrated)try{Us(r.containerInfo)}catch(g){Le(e,e.return,g)}break;case 4:fn(r,e),zn(e);break;case 13:fn(r,e),zn(e),a=e.child,a.flags&8192&&(o=a.memoizedState!==null,a.stateNode.isHidden=o,!o||a.alternate!==null&&a.alternate.memoizedState!==null||(fp=De())),t&4&&kh(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(lr=(u=lr)||d,fn(r,e),lr=u):fn(r,e),zn(e),t&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!d&&e.mode&1)for(G=e,d=e.child;d!==null;){for(m=G=d;G!==null;){switch(f=G,p=f.child,f.tag){case 0:case 11:case 14:case 15:zs(4,f,f.return);break;case 1:co(f,f.return);var y=f.stateNode;if(typeof y.componentWillUnmount=="function"){t=f,n=f.return;try{r=t,y.props=r.memoizedProps,y.state=r.memoizedState,y.componentWillUnmount()}catch(g){Le(t,n,g)}}break;case 5:co(f,f.return);break;case 22:if(f.memoizedState!==null){Th(m);continue}}p!==null?(p.return=f,G=p):Th(m)}d=d.sibling}e:for(d=null,m=e;;){if(m.tag===5){if(d===null){d=m;try{a=m.stateNode,u?(o=a.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(l=m.stateNode,c=m.memoizedProps.style,s=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=ux("display",s))}catch(g){Le(e,e.return,g)}}}else if(m.tag===6){if(d===null)try{m.stateNode.nodeValue=u?"":m.memoizedProps}catch(g){Le(e,e.return,g)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;d===m&&(d=null),m=m.return}d===m&&(d=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:fn(r,e),zn(e),t&4&&kh(e);break;case 21:break;default:fn(r,e),zn(e)}}function zn(e){var r=e.flags;if(r&2){try{e:{for(var n=e.return;n!==null;){if(Iy(n)){var t=n;break e}n=n.return}throw Error(B(160))}switch(t.tag){case 5:var a=t.stateNode;t.flags&32&&(Fs(a,""),t.flags&=-33);var o=Eh(e);Ad(e,o,a);break;case 3:case 4:var s=t.stateNode.containerInfo,l=Eh(e);zd(e,l,s);break;default:throw Error(B(161))}}catch(c){Le(e,e.return,c)}e.flags&=-3}r&4096&&(e.flags&=-4097)}function QS(e,r,n){G=e,Fy(e)}function Fy(e,r,n){for(var t=(e.mode&1)!==0;G!==null;){var a=G,o=a.child;if(a.tag===22&&t){var s=a.memoizedState!==null||Ui;if(!s){var l=a.alternate,c=l!==null&&l.memoizedState!==null||lr;l=Ui;var u=lr;if(Ui=s,(lr=c)&&!u)for(G=a;G!==null;)s=G,c=s.child,s.tag===22&&s.memoizedState!==null?zh(a):c!==null?(c.return=s,G=c):zh(a);for(;o!==null;)G=o,Fy(o),o=o.sibling;G=a,Ui=l,lr=u}Ph(e)}else a.subtreeFlags&8772&&o!==null?(o.return=a,G=o):Ph(e)}}function Ph(e){for(;G!==null;){var r=G;if(r.flags&8772){var n=r.alternate;try{if(r.flags&8772)switch(r.tag){case 0:case 11:case 15:lr||gc(5,r);break;case 1:var t=r.stateNode;if(r.flags&4&&!lr)if(n===null)t.componentDidMount();else{var a=r.elementType===r.type?n.memoizedProps:gn(r.type,n.memoizedProps);t.componentDidUpdate(a,n.memoizedState,t.__reactInternalSnapshotBeforeUpdate)}var o=r.updateQueue;o!==null&&mh(r,o,t);break;case 3:var s=r.updateQueue;if(s!==null){if(n=null,r.child!==null)switch(r.child.tag){case 5:n=r.child.stateNode;break;case 1:n=r.child.stateNode}mh(r,s,n)}break;case 5:var l=r.stateNode;if(n===null&&r.flags&4){n=l;var c=r.memoizedProps;switch(r.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(r.memoizedState===null){var u=r.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var m=d.dehydrated;m!==null&&Us(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(B(163))}lr||r.flags&512&&Td(r)}catch(f){Le(r,r.return,f)}}if(r===e){G=null;break}if(n=r.sibling,n!==null){n.return=r.return,G=n;break}G=r.return}}function Th(e){for(;G!==null;){var r=G;if(r===e){G=null;break}var n=r.sibling;if(n!==null){n.return=r.return,G=n;break}G=r.return}}function zh(e){for(;G!==null;){var r=G;try{switch(r.tag){case 0:case 11:case 15:var n=r.return;try{gc(4,r)}catch(c){Le(r,n,c)}break;case 1:var t=r.stateNode;if(typeof t.componentDidMount=="function"){var a=r.return;try{t.componentDidMount()}catch(c){Le(r,a,c)}}var o=r.return;try{Td(r)}catch(c){Le(r,o,c)}break;case 5:var s=r.return;try{Td(r)}catch(c){Le(r,s,c)}}}catch(c){Le(r,r.return,c)}if(r===e){G=null;break}var l=r.sibling;if(l!==null){l.return=r.return,G=l;break}G=r.return}}var WS=Math.ceil,Dl=mt.ReactCurrentDispatcher,mp=mt.ReactCurrentOwner,an=mt.ReactCurrentBatchConfig,pe=0,Ke=null,Ve=null,nr=0,Dr=0,uo=aa(0),We=0,ei=null,La=0,vc=0,pp=0,As=null,Pr=null,fp=0,Bo=1/0,et=null,Bl=!1,qd=null,Ht=null,Vi=!1,Lt=null,$l=0,qs=0,Rd=null,ul=-1,dl=0;function xr(){return pe&6?De():ul!==-1?ul:ul=De()}function Qt(e){return e.mode&1?pe&2&&nr!==0?nr&-nr:zS.transition!==null?(dl===0&&(dl=Sx()),dl):(e=be,e!==0||(e=window.event,e=e===void 0?16:zx(e.type)),e):1}function Sn(e,r,n,t){if(50<qs)throw qs=0,Rd=null,Error(B(185));fi(e,n,t),(!(pe&2)||e!==Ke)&&(e===Ke&&(!(pe&2)&&(vc|=n),We===4&&Pt(e,nr)),qr(e,t),n===1&&pe===0&&!(r.mode&1)&&(Bo=De()+500,pc&&oa()))}function qr(e,r){var n=e.callbackNode;zj(e,r);var t=Nl(e,e===Ke?nr:0);if(t===0)n!==null&&Ff(n),e.callbackNode=null,e.callbackPriority=0;else if(r=t&-t,e.callbackPriority!==r){if(n!=null&&Ff(n),r===1)e.tag===0?TS(Ah.bind(null,e)):Yx(Ah.bind(null,e)),NS(function(){!(pe&6)&&oa()}),n=null;else{switch(Cx(t)){case 1:n=Dm;break;case 4:n=wx;break;case 16:n=Cl;break;case 536870912:n=jx;break;default:n=Cl}n=Wy(n,Dy.bind(null,e))}e.callbackPriority=r,e.callbackNode=n}}function Dy(e,r){if(ul=-1,dl=0,pe&6)throw Error(B(327));var n=e.callbackNode;if(vo()&&e.callbackNode!==n)return null;var t=Nl(e,e===Ke?nr:0);if(t===0)return null;if(t&30||t&e.expiredLanes||r)r=Ul(e,t);else{r=t;var a=pe;pe|=2;var o=$y();(Ke!==e||nr!==r)&&(et=null,Bo=De()+500,qa(e,r));do try{KS();break}catch(l){By(e,l)}while(!0);Zm(),Dl.current=o,pe=a,Ve!==null?r=0:(Ke=null,nr=0,r=We)}if(r!==0){if(r===2&&(a=sd(e),a!==0&&(t=a,r=_d(e,a))),r===1)throw n=ei,qa(e,0),Pt(e,t),qr(e,De()),n;if(r===6)Pt(e,t);else{if(a=e.current.alternate,!(t&30)&&!GS(a)&&(r=Ul(e,t),r===2&&(o=sd(e),o!==0&&(t=o,r=_d(e,o))),r===1))throw n=ei,qa(e,0),Pt(e,t),qr(e,De()),n;switch(e.finishedWork=a,e.finishedLanes=t,r){case 0:case 1:throw Error(B(345));case 2:fa(e,Pr,et);break;case 3:if(Pt(e,t),(t&130023424)===t&&(r=fp+500-De(),10<r)){if(Nl(e,0)!==0)break;if(a=e.suspendedLanes,(a&t)!==t){xr(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=fd(fa.bind(null,e,Pr,et),r);break}fa(e,Pr,et);break;case 4:if(Pt(e,t),(t&4194240)===t)break;for(r=e.eventTimes,a=-1;0<t;){var s=31-jn(t);o=1<<s,s=r[s],s>a&&(a=s),t&=~o}if(t=a,t=De()-t,t=(120>t?120:480>t?480:1080>t?1080:1920>t?1920:3e3>t?3e3:4320>t?4320:1960*WS(t/1960))-t,10<t){e.timeoutHandle=fd(fa.bind(null,e,Pr,et),t);break}fa(e,Pr,et);break;case 5:fa(e,Pr,et);break;default:throw Error(B(329))}}}return qr(e,De()),e.callbackNode===n?Dy.bind(null,e):null}function _d(e,r){var n=As;return e.current.memoizedState.isDehydrated&&(qa(e,r).flags|=256),e=Ul(e,r),e!==2&&(r=Pr,Pr=n,r!==null&&Od(r)),e}function Od(e){Pr===null?Pr=e:Pr.push.apply(Pr,e)}function GS(e){for(var r=e;;){if(r.flags&16384){var n=r.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var t=0;t<n.length;t++){var a=n[t],o=a.getSnapshot;a=a.value;try{if(!Cn(o(),a))return!1}catch{return!1}}}if(n=r.child,r.subtreeFlags&16384&&n!==null)n.return=r,r=n;else{if(r===e)break;for(;r.sibling===null;){if(r.return===null||r.return===e)return!0;r=r.return}r.sibling.return=r.return,r=r.sibling}}return!0}function Pt(e,r){for(r&=~pp,r&=~vc,e.suspendedLanes|=r,e.pingedLanes&=~r,e=e.expirationTimes;0<r;){var n=31-jn(r),t=1<<n;e[n]=-1,r&=~t}}function Ah(e){if(pe&6)throw Error(B(327));vo();var r=Nl(e,0);if(!(r&1))return qr(e,De()),null;var n=Ul(e,r);if(e.tag!==0&&n===2){var t=sd(e);t!==0&&(r=t,n=_d(e,t))}if(n===1)throw n=ei,qa(e,0),Pt(e,r),qr(e,De()),n;if(n===6)throw Error(B(345));return e.finishedWork=e.current.alternate,e.finishedLanes=r,fa(e,Pr,et),qr(e,De()),null}function hp(e,r){var n=pe;pe|=1;try{return e(r)}finally{pe=n,pe===0&&(Bo=De()+500,pc&&oa())}}function Fa(e){Lt!==null&&Lt.tag===0&&!(pe&6)&&vo();var r=pe;pe|=1;var n=an.transition,t=be;try{if(an.transition=null,be=1,e)return e()}finally{be=t,an.transition=n,pe=r,!(pe&6)&&oa()}}function gp(){Dr=uo.current,Te(uo)}function qa(e,r){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,CS(n)),Ve!==null)for(n=Ve.return;n!==null;){var t=n;switch(Km(t),t.tag){case 1:t=t.type.childContextTypes,t!=null&&zl();break;case 3:Fo(),Te(zr),Te(ur),op();break;case 5:ap(t);break;case 4:Fo();break;case 13:Te(_e);break;case 19:Te(_e);break;case 10:ep(t.type._context);break;case 22:case 23:gp()}n=n.return}if(Ke=e,Ve=e=Wt(e.current,null),nr=Dr=r,We=0,ei=null,pp=vc=La=0,Pr=As=null,ba!==null){for(r=0;r<ba.length;r++)if(n=ba[r],t=n.interleaved,t!==null){n.interleaved=null;var a=t.next,o=n.pending;if(o!==null){var s=o.next;o.next=a,t.next=s}n.pending=t}ba=null}return e}function By(e,r){do{var n=Ve;try{if(Zm(),il.current=Fl,Ll){for(var t=Oe.memoizedState;t!==null;){var a=t.queue;a!==null&&(a.pending=null),t=t.next}Ll=!1}if(Ma=0,Ye=Qe=Oe=null,Ts=!1,Xs=0,mp.current=null,n===null||n.return===null){We=1,ei=r,Ve=null;break}e:{var o=e,s=n.return,l=n,c=r;if(r=nr,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,d=l,m=d.tag;if(!(d.mode&1)&&(m===0||m===11||m===15)){var f=d.alternate;f?(d.updateQueue=f.updateQueue,d.memoizedState=f.memoizedState,d.lanes=f.lanes):(d.updateQueue=null,d.memoizedState=null)}var p=xh(s);if(p!==null){p.flags&=-257,yh(p,s,l,o,r),p.mode&1&&vh(o,u,r),r=p,c=u;var y=r.updateQueue;if(y===null){var g=new Set;g.add(c),r.updateQueue=g}else y.add(c);break e}else{if(!(r&1)){vh(o,u,r),vp();break e}c=Error(B(426))}}else if(Re&&l.mode&1){var b=xh(s);if(b!==null){!(b.flags&65536)&&(b.flags|=256),yh(b,s,l,o,r),Xm(Do(c,l));break e}}o=c=Do(c,l),We!==4&&(We=2),As===null?As=[o]:As.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,r&=-r,o.lanes|=r;var h=Cy(o,c,r);dh(o,h);break e;case 1:l=c;var v=o.type,w=o.stateNode;if(!(o.flags&128)&&(typeof v.getDerivedStateFromError=="function"||w!==null&&typeof w.componentDidCatch=="function"&&(Ht===null||!Ht.has(w)))){o.flags|=65536,r&=-r,o.lanes|=r;var j=Ny(o,l,r);dh(o,j);break e}}o=o.return}while(o!==null)}Vy(n)}catch(E){r=E,Ve===n&&n!==null&&(Ve=n=n.return);continue}break}while(!0)}function $y(){var e=Dl.current;return Dl.current=Fl,e===null?Fl:e}function vp(){(We===0||We===3||We===2)&&(We=4),Ke===null||!(La&268435455)&&!(vc&268435455)||Pt(Ke,nr)}function Ul(e,r){var n=pe;pe|=2;var t=$y();(Ke!==e||nr!==r)&&(et=null,qa(e,r));do try{YS();break}catch(a){By(e,a)}while(!0);if(Zm(),pe=n,Dl.current=t,Ve!==null)throw Error(B(261));return Ke=null,nr=0,We}function YS(){for(;Ve!==null;)Uy(Ve)}function KS(){for(;Ve!==null&&!wj();)Uy(Ve)}function Uy(e){var r=Qy(e.alternate,e,Dr);e.memoizedProps=e.pendingProps,r===null?Vy(e):Ve=r,mp.current=null}function Vy(e){var r=e;do{var n=r.alternate;if(e=r.return,r.flags&32768){if(n=US(n,r),n!==null){n.flags&=32767,Ve=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{We=6,Ve=null;return}}else if(n=$S(n,r,Dr),n!==null){Ve=n;return}if(r=r.sibling,r!==null){Ve=r;return}Ve=r=e}while(r!==null);We===0&&(We=5)}function fa(e,r,n){var t=be,a=an.transition;try{an.transition=null,be=1,XS(e,r,n,t)}finally{an.transition=a,be=t}return null}function XS(e,r,n,t){do vo();while(Lt!==null);if(pe&6)throw Error(B(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(B(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(Aj(e,o),e===Ke&&(Ve=Ke=null,nr=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Vi||(Vi=!0,Wy(Cl,function(){return vo(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=an.transition,an.transition=null;var s=be;be=1;var l=pe;pe|=4,mp.current=null,HS(e,n),Ly(n,e),vS(md),El=!!dd,md=dd=null,e.current=n,QS(n),jj(),pe=l,be=s,an.transition=o}else e.current=n;if(Vi&&(Vi=!1,Lt=e,$l=a),o=e.pendingLanes,o===0&&(Ht=null),Nj(n.stateNode),qr(e,De()),r!==null)for(t=e.onRecoverableError,n=0;n<r.length;n++)a=r[n],t(a.value,{componentStack:a.stack,digest:a.digest});if(Bl)throw Bl=!1,e=qd,qd=null,e;return $l&1&&e.tag!==0&&vo(),o=e.pendingLanes,o&1?e===Rd?qs++:(qs=0,Rd=e):qs=0,oa(),null}function vo(){if(Lt!==null){var e=Cx($l),r=an.transition,n=be;try{if(an.transition=null,be=16>e?16:e,Lt===null)var t=!1;else{if(e=Lt,Lt=null,$l=0,pe&6)throw Error(B(331));var a=pe;for(pe|=4,G=e.current;G!==null;){var o=G,s=o.child;if(G.flags&16){var l=o.deletions;if(l!==null){for(var c=0;c<l.length;c++){var u=l[c];for(G=u;G!==null;){var d=G;switch(d.tag){case 0:case 11:case 15:zs(8,d,o)}var m=d.child;if(m!==null)m.return=d,G=m;else for(;G!==null;){d=G;var f=d.sibling,p=d.return;if(Oy(d),d===u){G=null;break}if(f!==null){f.return=p,G=f;break}G=p}}}var y=o.alternate;if(y!==null){var g=y.child;if(g!==null){y.child=null;do{var b=g.sibling;g.sibling=null,g=b}while(g!==null)}}G=o}}if(o.subtreeFlags&2064&&s!==null)s.return=o,G=s;else e:for(;G!==null;){if(o=G,o.flags&2048)switch(o.tag){case 0:case 11:case 15:zs(9,o,o.return)}var h=o.sibling;if(h!==null){h.return=o.return,G=h;break e}G=o.return}}var v=e.current;for(G=v;G!==null;){s=G;var w=s.child;if(s.subtreeFlags&2064&&w!==null)w.return=s,G=w;else e:for(s=v;G!==null;){if(l=G,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:gc(9,l)}}catch(E){Le(l,l.return,E)}if(l===s){G=null;break e}var j=l.sibling;if(j!==null){j.return=l.return,G=j;break e}G=l.return}}if(pe=a,oa(),Dn&&typeof Dn.onPostCommitFiberRoot=="function")try{Dn.onPostCommitFiberRoot(lc,e)}catch{}t=!0}return t}finally{be=n,an.transition=r}}return!1}function qh(e,r,n){r=Do(n,r),r=Cy(e,r,1),e=Vt(e,r,1),r=xr(),e!==null&&(fi(e,1,r),qr(e,r))}function Le(e,r,n){if(e.tag===3)qh(e,e,n);else for(;r!==null;){if(r.tag===3){qh(r,e,n);break}else if(r.tag===1){var t=r.stateNode;if(typeof r.type.getDerivedStateFromError=="function"||typeof t.componentDidCatch=="function"&&(Ht===null||!Ht.has(t))){e=Do(n,e),e=Ny(r,e,1),r=Vt(r,e,1),e=xr(),r!==null&&(fi(r,1,e),qr(r,e));break}}r=r.return}}function JS(e,r,n){var t=e.pingCache;t!==null&&t.delete(r),r=xr(),e.pingedLanes|=e.suspendedLanes&n,Ke===e&&(nr&n)===n&&(We===4||We===3&&(nr&130023424)===nr&&500>De()-fp?qa(e,0):pp|=n),qr(e,r)}function Hy(e,r){r===0&&(e.mode&1?(r=_i,_i<<=1,!(_i&130023424)&&(_i=4194304)):r=1);var n=xr();e=lt(e,r),e!==null&&(fi(e,r,n),qr(e,n))}function ZS(e){var r=e.memoizedState,n=0;r!==null&&(n=r.retryLane),Hy(e,n)}function eC(e,r){var n=0;switch(e.tag){case 13:var t=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:t=e.stateNode;break;default:throw Error(B(314))}t!==null&&t.delete(r),Hy(e,n)}var Qy;Qy=function(e,r,n){if(e!==null)if(e.memoizedProps!==r.pendingProps||zr.current)Tr=!0;else{if(!(e.lanes&n)&&!(r.flags&128))return Tr=!1,BS(e,r,n);Tr=!!(e.flags&131072)}else Tr=!1,Re&&r.flags&1048576&&Kx(r,Rl,r.index);switch(r.lanes=0,r.tag){case 2:var t=r.type;cl(e,r),e=r.pendingProps;var a=Io(r,ur.current);go(r,n),a=ip(null,r,t,e,a,n);var o=lp();return r.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(r.tag=1,r.memoizedState=null,r.updateQueue=null,Ar(t)?(o=!0,Al(r)):o=!1,r.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,np(r),a.updater=hc,r.stateNode=a,a._reactInternals=r,wd(r,t,e,n),r=Cd(null,r,t,!0,o,n)):(r.tag=0,Re&&o&&Ym(r),hr(null,r,a,n),r=r.child),r;case 16:t=r.elementType;e:{switch(cl(e,r),e=r.pendingProps,a=t._init,t=a(t._payload),r.type=t,a=r.tag=nC(t),e=gn(t,e),a){case 0:r=Sd(null,r,t,e,n);break e;case 1:r=jh(null,r,t,e,n);break e;case 11:r=bh(null,r,t,e,n);break e;case 14:r=wh(null,r,t,gn(t.type,e),n);break e}throw Error(B(306,t,""))}return r;case 0:return t=r.type,a=r.pendingProps,a=r.elementType===t?a:gn(t,a),Sd(e,r,t,a,n);case 1:return t=r.type,a=r.pendingProps,a=r.elementType===t?a:gn(t,a),jh(e,r,t,a,n);case 3:e:{if(Ty(r),e===null)throw Error(B(387));t=r.pendingProps,o=r.memoizedState,a=o.element,ny(e,r),Il(r,t,null,n);var s=r.memoizedState;if(t=s.element,o.isDehydrated)if(o={element:t,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},r.updateQueue.baseState=o,r.memoizedState=o,r.flags&256){a=Do(Error(B(423)),r),r=Sh(e,r,t,n,a);break e}else if(t!==a){a=Do(Error(B(424)),r),r=Sh(e,r,t,n,a);break e}else for(Ur=Ut(r.stateNode.containerInfo.firstChild),Hr=r,Re=!0,bn=null,n=ey(r,null,t,n),r.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Mo(),t===a){r=ct(e,r,n);break e}hr(e,r,t,n)}r=r.child}return r;case 5:return ty(r),e===null&&xd(r),t=r.type,a=r.pendingProps,o=e!==null?e.memoizedProps:null,s=a.children,pd(t,a)?s=null:o!==null&&pd(t,o)&&(r.flags|=32),Py(e,r),hr(e,r,s,n),r.child;case 6:return e===null&&xd(r),null;case 13:return zy(e,r,n);case 4:return tp(r,r.stateNode.containerInfo),t=r.pendingProps,e===null?r.child=Lo(r,null,t,n):hr(e,r,t,n),r.child;case 11:return t=r.type,a=r.pendingProps,a=r.elementType===t?a:gn(t,a),bh(e,r,t,a,n);case 7:return hr(e,r,r.pendingProps,n),r.child;case 8:return hr(e,r,r.pendingProps.children,n),r.child;case 12:return hr(e,r,r.pendingProps.children,n),r.child;case 10:e:{if(t=r.type._context,a=r.pendingProps,o=r.memoizedProps,s=a.value,Ne(_l,t._currentValue),t._currentValue=s,o!==null)if(Cn(o.value,s)){if(o.children===a.children&&!zr.current){r=ct(e,r,n);break e}}else for(o=r.child,o!==null&&(o.return=r);o!==null;){var l=o.dependencies;if(l!==null){s=o.child;for(var c=l.firstContext;c!==null;){if(c.context===t){if(o.tag===1){c=ot(-1,n&-n),c.tag=2;var u=o.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?c.next=c:(c.next=d.next,d.next=c),u.pending=c}}o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),yd(o.return,n,r),l.lanes|=n;break}c=c.next}}else if(o.tag===10)s=o.type===r.type?null:o.child;else if(o.tag===18){if(s=o.return,s===null)throw Error(B(341));s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),yd(s,n,r),s=o.sibling}else s=o.child;if(s!==null)s.return=o;else for(s=o;s!==null;){if(s===r){s=null;break}if(o=s.sibling,o!==null){o.return=s.return,s=o;break}s=s.return}o=s}hr(e,r,a.children,n),r=r.child}return r;case 9:return a=r.type,t=r.pendingProps.children,go(r,n),a=on(a),t=t(a),r.flags|=1,hr(e,r,t,n),r.child;case 14:return t=r.type,a=gn(t,r.pendingProps),a=gn(t.type,a),wh(e,r,t,a,n);case 15:return Ey(e,r,r.type,r.pendingProps,n);case 17:return t=r.type,a=r.pendingProps,a=r.elementType===t?a:gn(t,a),cl(e,r),r.tag=1,Ar(t)?(e=!0,Al(r)):e=!1,go(r,n),Sy(r,t,a),wd(r,t,a,n),Cd(null,r,t,!0,e,n);case 19:return Ay(e,r,n);case 22:return ky(e,r,n)}throw Error(B(156,r.tag))};function Wy(e,r){return bx(e,r)}function rC(e,r,n,t){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=r,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=t,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function tn(e,r,n,t){return new rC(e,r,n,t)}function xp(e){return e=e.prototype,!(!e||!e.isReactComponent)}function nC(e){if(typeof e=="function")return xp(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Mm)return 11;if(e===Lm)return 14}return 2}function Wt(e,r){var n=e.alternate;return n===null?(n=tn(e.tag,r,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=r,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,r=e.dependencies,n.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ml(e,r,n,t,a,o){var s=2;if(t=e,typeof e=="function")xp(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case eo:return Ra(n.children,a,o,r);case Im:s=8,a|=8;break;case Hu:return e=tn(12,n,r,a|2),e.elementType=Hu,e.lanes=o,e;case Qu:return e=tn(13,n,r,a),e.elementType=Qu,e.lanes=o,e;case Wu:return e=tn(19,n,r,a),e.elementType=Wu,e.lanes=o,e;case tx:return xc(n,a,o,r);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case rx:s=10;break e;case nx:s=9;break e;case Mm:s=11;break e;case Lm:s=14;break e;case Nt:s=16,t=null;break e}throw Error(B(130,e==null?e:typeof e,""))}return r=tn(s,n,r,a),r.elementType=e,r.type=t,r.lanes=o,r}function Ra(e,r,n,t){return e=tn(7,e,t,r),e.lanes=n,e}function xc(e,r,n,t){return e=tn(22,e,t,r),e.elementType=tx,e.lanes=n,e.stateNode={isHidden:!1},e}function gu(e,r,n){return e=tn(6,e,null,r),e.lanes=n,e}function vu(e,r,n){return r=tn(4,e.children!==null?e.children:[],e.key,r),r.lanes=n,r.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},r}function tC(e,r,n,t,a){this.tag=r,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Xc(0),this.expirationTimes=Xc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Xc(0),this.identifierPrefix=t,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function yp(e,r,n,t,a,o,s,l,c){return e=new tC(e,r,n,l,c),r===1?(r=1,o===!0&&(r|=8)):r=0,o=tn(3,null,null,r),e.current=o,o.stateNode=e,o.memoizedState={element:t,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},np(o),e}function aC(e,r,n){var t=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Za,key:t==null?null:""+t,children:e,containerInfo:r,implementation:n}}function Gy(e){if(!e)return Zt;e=e._reactInternals;e:{if(Va(e)!==e||e.tag!==1)throw Error(B(170));var r=e;do{switch(r.tag){case 3:r=r.stateNode.context;break e;case 1:if(Ar(r.type)){r=r.stateNode.__reactInternalMemoizedMergedChildContext;break e}}r=r.return}while(r!==null);throw Error(B(171))}if(e.tag===1){var n=e.type;if(Ar(n))return Gx(e,n,r)}return r}function Yy(e,r,n,t,a,o,s,l,c){return e=yp(n,t,!0,e,a,o,s,l,c),e.context=Gy(null),n=e.current,t=xr(),a=Qt(n),o=ot(t,a),o.callback=r??null,Vt(n,o,a),e.current.lanes=a,fi(e,a,t),qr(e,t),e}function yc(e,r,n,t){var a=r.current,o=xr(),s=Qt(a);return n=Gy(n),r.context===null?r.context=n:r.pendingContext=n,r=ot(o,s),r.payload={element:e},t=t===void 0?null:t,t!==null&&(r.callback=t),e=Vt(a,r,s),e!==null&&(Sn(e,a,s,o),sl(e,a,s)),s}function Vl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Rh(e,r){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<r?n:r}}function bp(e,r){Rh(e,r),(e=e.alternate)&&Rh(e,r)}function oC(){return null}var Ky=typeof reportError=="function"?reportError:function(e){console.error(e)};function wp(e){this._internalRoot=e}bc.prototype.render=wp.prototype.render=function(e){var r=this._internalRoot;if(r===null)throw Error(B(409));yc(e,r,null,null)};bc.prototype.unmount=wp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var r=e.containerInfo;Fa(function(){yc(null,e,null,null)}),r[it]=null}};function bc(e){this._internalRoot=e}bc.prototype.unstable_scheduleHydration=function(e){if(e){var r=kx();e={blockedOn:null,target:e,priority:r};for(var n=0;n<kt.length&&r!==0&&r<kt[n].priority;n++);kt.splice(n,0,e),n===0&&Tx(e)}};function jp(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function wc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function _h(){}function sC(e,r,n,t,a){if(a){if(typeof t=="function"){var o=t;t=function(){var u=Vl(s);o.call(u)}}var s=Yy(r,t,e,0,null,!1,!1,"",_h);return e._reactRootContainer=s,e[it]=s.current,Qs(e.nodeType===8?e.parentNode:e),Fa(),s}for(;a=e.lastChild;)e.removeChild(a);if(typeof t=="function"){var l=t;t=function(){var u=Vl(c);l.call(u)}}var c=yp(e,0,!1,null,null,!1,!1,"",_h);return e._reactRootContainer=c,e[it]=c.current,Qs(e.nodeType===8?e.parentNode:e),Fa(function(){yc(r,c,n,t)}),c}function jc(e,r,n,t,a){var o=n._reactRootContainer;if(o){var s=o;if(typeof a=="function"){var l=a;a=function(){var c=Vl(s);l.call(c)}}yc(r,s,e,a)}else s=sC(n,r,e,a,t);return Vl(s)}Nx=function(e){switch(e.tag){case 3:var r=e.stateNode;if(r.current.memoizedState.isDehydrated){var n=ys(r.pendingLanes);n!==0&&(Bm(r,n|1),qr(r,De()),!(pe&6)&&(Bo=De()+500,oa()))}break;case 13:Fa(function(){var t=lt(e,1);if(t!==null){var a=xr();Sn(t,e,1,a)}}),bp(e,1)}};$m=function(e){if(e.tag===13){var r=lt(e,134217728);if(r!==null){var n=xr();Sn(r,e,134217728,n)}bp(e,134217728)}};Ex=function(e){if(e.tag===13){var r=Qt(e),n=lt(e,r);if(n!==null){var t=xr();Sn(n,e,r,t)}bp(e,r)}};kx=function(){return be};Px=function(e,r){var n=be;try{return be=e,r()}finally{be=n}};td=function(e,r,n){switch(r){case"input":if(Ku(e,n),r=n.name,n.type==="radio"&&r!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+r)+'][type="radio"]'),r=0;r<n.length;r++){var t=n[r];if(t!==e&&t.form===e.form){var a=mc(t);if(!a)throw Error(B(90));ox(t),Ku(t,a)}}}break;case"textarea":ix(e,n);break;case"select":r=n.value,r!=null&&mo(e,!!n.multiple,r,!1)}};fx=hp;hx=Fa;var iC={usingClientEntryPoint:!1,Events:[gi,ao,mc,mx,px,hp]},us={findFiberByHostInstance:ya,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},lC={bundleType:us.bundleType,version:us.version,rendererPackageName:us.rendererPackageName,rendererConfig:us.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:mt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=xx(e),e===null?null:e.stateNode},findFiberByHostInstance:us.findFiberByHostInstance||oC,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Hi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Hi.isDisabled&&Hi.supportsFiber)try{lc=Hi.inject(lC),Dn=Hi}catch{}}Gr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=iC;Gr.createPortal=function(e,r){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!jp(r))throw Error(B(200));return aC(e,r,null,n)};Gr.createRoot=function(e,r){if(!jp(e))throw Error(B(299));var n=!1,t="",a=Ky;return r!=null&&(r.unstable_strictMode===!0&&(n=!0),r.identifierPrefix!==void 0&&(t=r.identifierPrefix),r.onRecoverableError!==void 0&&(a=r.onRecoverableError)),r=yp(e,1,!1,null,null,n,!1,t,a),e[it]=r.current,Qs(e.nodeType===8?e.parentNode:e),new wp(r)};Gr.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var r=e._reactInternals;if(r===void 0)throw typeof e.render=="function"?Error(B(188)):(e=Object.keys(e).join(","),Error(B(268,e)));return e=xx(r),e=e===null?null:e.stateNode,e};Gr.flushSync=function(e){return Fa(e)};Gr.hydrate=function(e,r,n){if(!wc(r))throw Error(B(200));return jc(null,e,r,!0,n)};Gr.hydrateRoot=function(e,r,n){if(!jp(e))throw Error(B(405));var t=n!=null&&n.hydratedSources||null,a=!1,o="",s=Ky;if(n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),r=Yy(r,null,e,1,n??null,a,!1,o,s),e[it]=r.current,Qs(e),t)for(e=0;e<t.length;e++)n=t[e],a=n._getVersion,a=a(n._source),r.mutableSourceEagerHydrationData==null?r.mutableSourceEagerHydrationData=[n,a]:r.mutableSourceEagerHydrationData.push(n,a);return new bc(r)};Gr.render=function(e,r,n){if(!wc(r))throw Error(B(200));return jc(null,e,r,!1,n)};Gr.unmountComponentAtNode=function(e){if(!wc(e))throw Error(B(40));return e._reactRootContainer?(Fa(function(){jc(null,null,e,!1,function(){e._reactRootContainer=null,e[it]=null})}),!0):!1};Gr.unstable_batchedUpdates=hp;Gr.unstable_renderSubtreeIntoContainer=function(e,r,n,t){if(!wc(n))throw Error(B(200));if(e==null||e._reactInternals===void 0)throw Error(B(38));return jc(e,r,n,!1,t)};Gr.version="18.3.1-next-f1338f8080-20240426";function Xy(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Xy)}catch(e){console.error(e)}}Xy(),Xv.exports=Gr;var xi=Xv.exports;const Jy=na(xi);var Zy,Oh=xi;Zy=Oh.createRoot,Oh.hydrateRoot;const cC=1,uC=1e6;let xu=0;function dC(){return xu=(xu+1)%Number.MAX_SAFE_INTEGER,xu.toString()}const yu=new Map,Ih=e=>{if(yu.has(e))return;const r=setTimeout(()=>{yu.delete(e),Rs({type:"REMOVE_TOAST",toastId:e})},uC);yu.set(e,r)},mC=(e,r)=>{switch(r.type){case"ADD_TOAST":return{...e,toasts:[r.toast,...e.toasts].slice(0,cC)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(n=>n.id===r.toast.id?{...n,...r.toast}:n)};case"DISMISS_TOAST":{const{toastId:n}=r;return n?Ih(n):e.toasts.forEach(t=>{Ih(t.id)}),{...e,toasts:e.toasts.map(t=>t.id===n||n===void 0?{...t,open:!1}:t)}}case"REMOVE_TOAST":return r.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(n=>n.id!==r.toastId)}}},pl=[];let fl={toasts:[]};function Rs(e){fl=mC(fl,e),pl.forEach(r=>{r(fl)})}function pC({...e}){const r=dC(),n=a=>Rs({type:"UPDATE_TOAST",toast:{...a,id:r}}),t=()=>Rs({type:"DISMISS_TOAST",toastId:r});return Rs({type:"ADD_TOAST",toast:{...e,id:r,open:!0,onOpenChange:a=>{a||t()}}}),{id:r,dismiss:t,update:n}}function eb(){const[e,r]=x.useState(fl);return x.useEffect(()=>(pl.push(r),()=>{const n=pl.indexOf(r);n>-1&&pl.splice(n,1)}),[e]),{...e,toast:pC,dismiss:n=>Rs({type:"DISMISS_TOAST",toastId:n})}}function xe(e,r,{checkForDefaultPrevented:n=!0}={}){return function(a){if(e==null||e(a),n===!1||!a.defaultPrevented)return r==null?void 0:r(a)}}function Mh(e,r){if(typeof e=="function")return e(r);e!=null&&(e.current=r)}function rb(...e){return r=>{let n=!1;const t=e.map(a=>{const o=Mh(a,r);return!n&&typeof o=="function"&&(n=!0),o});if(n)return()=>{for(let a=0;a<t.length;a++){const o=t[a];typeof o=="function"?o():Mh(e[a],null)}}}}function Be(...e){return x.useCallback(rb(...e),e)}function sa(e,r=[]){let n=[];function t(o,s){const l=x.createContext(s),c=n.length;n=[...n,s];const u=m=>{var h;const{scope:f,children:p,...y}=m,g=((h=f==null?void 0:f[e])==null?void 0:h[c])||l,b=x.useMemo(()=>y,Object.values(y));return i.jsx(g.Provider,{value:b,children:p})};u.displayName=o+"Provider";function d(m,f){var g;const p=((g=f==null?void 0:f[e])==null?void 0:g[c])||l,y=x.useContext(p);if(y)return y;if(s!==void 0)return s;throw new Error(`\`${m}\` must be used within \`${o}\``)}return[u,d]}const a=()=>{const o=n.map(s=>x.createContext(s));return function(l){const c=(l==null?void 0:l[e])||o;return x.useMemo(()=>({[`__scope${e}`]:{...l,[e]:c}}),[l,c])}};return a.scopeName=e,[t,fC(a,...r)]}function fC(...e){const r=e[0];if(e.length===1)return r;const n=()=>{const t=e.map(a=>({useScope:a(),scopeName:a.scopeName}));return function(o){const s=t.reduce((l,{useScope:c,scopeName:u})=>{const m=c(o)[`__scope${u}`];return{...l,...m}},{});return x.useMemo(()=>({[`__scope${r.scopeName}`]:s}),[s])}};return n.scopeName=r.scopeName,n}function Hl(e){const r=gC(e),n=x.forwardRef((t,a)=>{const{children:o,...s}=t,l=x.Children.toArray(o),c=l.find(xC);if(c){const u=c.props.children,d=l.map(m=>m===c?x.Children.count(u)>1?x.Children.only(null):x.isValidElement(u)?u.props.children:null:m);return i.jsx(r,{...s,ref:a,children:x.isValidElement(u)?x.cloneElement(u,void 0,d):null})}return i.jsx(r,{...s,ref:a,children:o})});return n.displayName=`${e}.Slot`,n}var hC=Hl("Slot");function gC(e){const r=x.forwardRef((n,t)=>{const{children:a,...o}=n;if(x.isValidElement(a)){const s=bC(a),l=yC(o,a.props);return a.type!==x.Fragment&&(l.ref=t?rb(t,s):s),x.cloneElement(a,l)}return x.Children.count(a)>1?x.Children.only(null):null});return r.displayName=`${e}.SlotClone`,r}var nb=Symbol("radix.slottable");function vC(e){const r=({children:n})=>i.jsx(i.Fragment,{children:n});return r.displayName=`${e}.Slottable`,r.__radixId=nb,r}function xC(e){return x.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===nb}function yC(e,r){const n={...r};for(const t in r){const a=e[t],o=r[t];/^on[A-Z]/.test(t)?a&&o?n[t]=(...l)=>{const c=o(...l);return a(...l),c}:a&&(n[t]=a):t==="style"?n[t]={...a,...o}:t==="className"&&(n[t]=[a,o].filter(Boolean).join(" "))}return{...e,...n}}function bC(e){var t,a;let r=(t=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:t.get,n=r&&"isReactWarning"in r&&r.isReactWarning;return n?e.ref:(r=(a=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:a.get,n=r&&"isReactWarning"in r&&r.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}function tb(e){const r=e+"CollectionProvider",[n,t]=sa(r),[a,o]=n(r,{collectionRef:{current:null},itemMap:new Map}),s=g=>{const{scope:b,children:h}=g,v=D.useRef(null),w=D.useRef(new Map).current;return i.jsx(a,{scope:b,itemMap:w,collectionRef:v,children:h})};s.displayName=r;const l=e+"CollectionSlot",c=Hl(l),u=D.forwardRef((g,b)=>{const{scope:h,children:v}=g,w=o(l,h),j=Be(b,w.collectionRef);return i.jsx(c,{ref:j,children:v})});u.displayName=l;const d=e+"CollectionItemSlot",m="data-radix-collection-item",f=Hl(d),p=D.forwardRef((g,b)=>{const{scope:h,children:v,...w}=g,j=D.useRef(null),E=Be(b,j),N=o(d,h);return D.useEffect(()=>(N.itemMap.set(j,{ref:j,...w}),()=>void N.itemMap.delete(j))),i.jsx(f,{[m]:"",ref:E,children:v})});p.displayName=d;function y(g){const b=o(e+"CollectionConsumer",g);return D.useCallback(()=>{const v=b.collectionRef.current;if(!v)return[];const w=Array.from(v.querySelectorAll(`[${m}]`));return Array.from(b.itemMap.values()).sort((N,P)=>w.indexOf(N.ref.current)-w.indexOf(P.ref.current))},[b.collectionRef,b.itemMap])}return[{Provider:s,Slot:u,ItemSlot:p},y,t]}var wC=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],we=wC.reduce((e,r)=>{const n=Hl(`Primitive.${r}`),t=x.forwardRef((a,o)=>{const{asChild:s,...l}=a,c=s?n:r;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),i.jsx(c,{...l,ref:o})});return t.displayName=`Primitive.${r}`,{...e,[r]:t}},{});function ab(e,r){e&&xi.flushSync(()=>e.dispatchEvent(r))}function vr(e){const r=x.useRef(e);return x.useEffect(()=>{r.current=e}),x.useMemo(()=>(...n)=>{var t;return(t=r.current)==null?void 0:t.call(r,...n)},[])}function jC(e,r=globalThis==null?void 0:globalThis.document){const n=vr(e);x.useEffect(()=>{const t=a=>{a.key==="Escape"&&n(a)};return r.addEventListener("keydown",t,{capture:!0}),()=>r.removeEventListener("keydown",t,{capture:!0})},[n,r])}var SC="DismissableLayer",Id="dismissableLayer.update",CC="dismissableLayer.pointerDownOutside",NC="dismissableLayer.focusOutside",Lh,ob=x.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),Sp=x.forwardRef((e,r)=>{const{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:t,onPointerDownOutside:a,onFocusOutside:o,onInteractOutside:s,onDismiss:l,...c}=e,u=x.useContext(ob),[d,m]=x.useState(null),f=(d==null?void 0:d.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,p]=x.useState({}),y=Be(r,P=>m(P)),g=Array.from(u.layers),[b]=[...u.layersWithOutsidePointerEventsDisabled].slice(-1),h=g.indexOf(b),v=d?g.indexOf(d):-1,w=u.layersWithOutsidePointerEventsDisabled.size>0,j=v>=h,E=kC(P=>{const k=P.target,z=[...u.branches].some(A=>A.contains(k));!j||z||(a==null||a(P),s==null||s(P),P.defaultPrevented||l==null||l())},f),N=PC(P=>{const k=P.target;[...u.branches].some(A=>A.contains(k))||(o==null||o(P),s==null||s(P),P.defaultPrevented||l==null||l())},f);return jC(P=>{v===u.layers.size-1&&(t==null||t(P),!P.defaultPrevented&&l&&(P.preventDefault(),l()))},f),x.useEffect(()=>{if(d)return n&&(u.layersWithOutsidePointerEventsDisabled.size===0&&(Lh=f.body.style.pointerEvents,f.body.style.pointerEvents="none"),u.layersWithOutsidePointerEventsDisabled.add(d)),u.layers.add(d),Fh(),()=>{n&&u.layersWithOutsidePointerEventsDisabled.size===1&&(f.body.style.pointerEvents=Lh)}},[d,f,n,u]),x.useEffect(()=>()=>{d&&(u.layers.delete(d),u.layersWithOutsidePointerEventsDisabled.delete(d),Fh())},[d,u]),x.useEffect(()=>{const P=()=>p({});return document.addEventListener(Id,P),()=>document.removeEventListener(Id,P)},[]),i.jsx(we.div,{...c,ref:y,style:{pointerEvents:w?j?"auto":"none":void 0,...e.style},onFocusCapture:xe(e.onFocusCapture,N.onFocusCapture),onBlurCapture:xe(e.onBlurCapture,N.onBlurCapture),onPointerDownCapture:xe(e.onPointerDownCapture,E.onPointerDownCapture)})});Sp.displayName=SC;var EC="DismissableLayerBranch",sb=x.forwardRef((e,r)=>{const n=x.useContext(ob),t=x.useRef(null),a=Be(r,t);return x.useEffect(()=>{const o=t.current;if(o)return n.branches.add(o),()=>{n.branches.delete(o)}},[n.branches]),i.jsx(we.div,{...e,ref:a})});sb.displayName=EC;function kC(e,r=globalThis==null?void 0:globalThis.document){const n=vr(e),t=x.useRef(!1),a=x.useRef(()=>{});return x.useEffect(()=>{const o=l=>{if(l.target&&!t.current){let c=function(){ib(CC,n,u,{discrete:!0})};const u={originalEvent:l};l.pointerType==="touch"?(r.removeEventListener("click",a.current),a.current=c,r.addEventListener("click",a.current,{once:!0})):c()}else r.removeEventListener("click",a.current);t.current=!1},s=window.setTimeout(()=>{r.addEventListener("pointerdown",o)},0);return()=>{window.clearTimeout(s),r.removeEventListener("pointerdown",o),r.removeEventListener("click",a.current)}},[r,n]),{onPointerDownCapture:()=>t.current=!0}}function PC(e,r=globalThis==null?void 0:globalThis.document){const n=vr(e),t=x.useRef(!1);return x.useEffect(()=>{const a=o=>{o.target&&!t.current&&ib(NC,n,{originalEvent:o},{discrete:!1})};return r.addEventListener("focusin",a),()=>r.removeEventListener("focusin",a)},[r,n]),{onFocusCapture:()=>t.current=!0,onBlurCapture:()=>t.current=!1}}function Fh(){const e=new CustomEvent(Id);document.dispatchEvent(e)}function ib(e,r,n,{discrete:t}){const a=n.originalEvent.target,o=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});r&&a.addEventListener(e,r,{once:!0}),t?ab(a,o):a.dispatchEvent(o)}var TC=Sp,zC=sb,Nn=globalThis!=null&&globalThis.document?x.useLayoutEffect:()=>{},AC="Portal",lb=x.forwardRef((e,r)=>{var l;const{container:n,...t}=e,[a,o]=x.useState(!1);Nn(()=>o(!0),[]);const s=n||a&&((l=globalThis==null?void 0:globalThis.document)==null?void 0:l.body);return s?Jy.createPortal(i.jsx(we.div,{...t,ref:r}),s):null});lb.displayName=AC;function qC(e,r){return x.useReducer((n,t)=>r[n][t]??n,e)}var pt=e=>{const{present:r,children:n}=e,t=RC(r),a=typeof n=="function"?n({present:t.isPresent}):x.Children.only(n),o=Be(t.ref,_C(a));return typeof n=="function"||t.isPresent?x.cloneElement(a,{ref:o}):null};pt.displayName="Presence";function RC(e){const[r,n]=x.useState(),t=x.useRef(null),a=x.useRef(e),o=x.useRef("none"),s=e?"mounted":"unmounted",[l,c]=qC(s,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return x.useEffect(()=>{const u=Qi(t.current);o.current=l==="mounted"?u:"none"},[l]),Nn(()=>{const u=t.current,d=a.current;if(d!==e){const f=o.current,p=Qi(u);e?c("MOUNT"):p==="none"||(u==null?void 0:u.display)==="none"?c("UNMOUNT"):c(d&&f!==p?"ANIMATION_OUT":"UNMOUNT"),a.current=e}},[e,c]),Nn(()=>{if(r){let u;const d=r.ownerDocument.defaultView??window,m=p=>{const g=Qi(t.current).includes(p.animationName);if(p.target===r&&g&&(c("ANIMATION_END"),!a.current)){const b=r.style.animationFillMode;r.style.animationFillMode="forwards",u=d.setTimeout(()=>{r.style.animationFillMode==="forwards"&&(r.style.animationFillMode=b)})}},f=p=>{p.target===r&&(o.current=Qi(t.current))};return r.addEventListener("animationstart",f),r.addEventListener("animationcancel",m),r.addEventListener("animationend",m),()=>{d.clearTimeout(u),r.removeEventListener("animationstart",f),r.removeEventListener("animationcancel",m),r.removeEventListener("animationend",m)}}else c("ANIMATION_END")},[r,c]),{isPresent:["mounted","unmountSuspended"].includes(l),ref:x.useCallback(u=>{t.current=u?getComputedStyle(u):null,n(u)},[])}}function Qi(e){return(e==null?void 0:e.animationName)||"none"}function _C(e){var t,a;let r=(t=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:t.get,n=r&&"isReactWarning"in r&&r.isReactWarning;return n?e.ref:(r=(a=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:a.get,n=r&&"isReactWarning"in r&&r.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var OC=qm[" useInsertionEffect ".trim().toString()]||Nn;function yi({prop:e,defaultProp:r,onChange:n=()=>{},caller:t}){const[a,o,s]=IC({defaultProp:r,onChange:n}),l=e!==void 0,c=l?e:a;{const d=x.useRef(e!==void 0);x.useEffect(()=>{const m=d.current;m!==l&&console.warn(`${t} is changing from ${m?"controlled":"uncontrolled"} to ${l?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),d.current=l},[l,t])}const u=x.useCallback(d=>{var m;if(l){const f=MC(d)?d(e):d;f!==e&&((m=s.current)==null||m.call(s,f))}else o(d)},[l,e,o,s]);return[c,u]}function IC({defaultProp:e,onChange:r}){const[n,t]=x.useState(e),a=x.useRef(n),o=x.useRef(r);return OC(()=>{o.current=r},[r]),x.useEffect(()=>{var s;a.current!==n&&((s=o.current)==null||s.call(o,n),a.current=n)},[n,a]),[n,t,o]}function MC(e){return typeof e=="function"}var LC=Object.freeze({position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal"}),FC="VisuallyHidden",Sc=x.forwardRef((e,r)=>i.jsx(we.span,{...e,ref:r,style:{...LC,...e.style}}));Sc.displayName=FC;var DC=Sc,Cp="ToastProvider",[Np,BC,$C]=tb("Toast"),[cb,d3]=sa("Toast",[$C]),[UC,Cc]=cb(Cp),ub=e=>{const{__scopeToast:r,label:n="Notification",duration:t=5e3,swipeDirection:a="right",swipeThreshold:o=50,children:s}=e,[l,c]=x.useState(null),[u,d]=x.useState(0),m=x.useRef(!1),f=x.useRef(!1);return n.trim()||console.error(`Invalid prop \`label\` supplied to \`${Cp}\`. Expected non-empty \`string\`.`),i.jsx(Np.Provider,{scope:r,children:i.jsx(UC,{scope:r,label:n,duration:t,swipeDirection:a,swipeThreshold:o,toastCount:u,viewport:l,onViewportChange:c,onToastAdd:x.useCallback(()=>d(p=>p+1),[]),onToastRemove:x.useCallback(()=>d(p=>p-1),[]),isFocusedToastEscapeKeyDownRef:m,isClosePausedRef:f,children:s})})};ub.displayName=Cp;var db="ToastViewport",VC=["F8"],Md="toast.viewportPause",Ld="toast.viewportResume",mb=x.forwardRef((e,r)=>{const{__scopeToast:n,hotkey:t=VC,label:a="Notifications ({hotkey})",...o}=e,s=Cc(db,n),l=BC(n),c=x.useRef(null),u=x.useRef(null),d=x.useRef(null),m=x.useRef(null),f=Be(r,m,s.onViewportChange),p=t.join("+").replace(/Key/g,"").replace(/Digit/g,""),y=s.toastCount>0;x.useEffect(()=>{const b=h=>{var w;t.length!==0&&t.every(j=>h[j]||h.code===j)&&((w=m.current)==null||w.focus())};return document.addEventListener("keydown",b),()=>document.removeEventListener("keydown",b)},[t]),x.useEffect(()=>{const b=c.current,h=m.current;if(y&&b&&h){const v=()=>{if(!s.isClosePausedRef.current){const N=new CustomEvent(Md);h.dispatchEvent(N),s.isClosePausedRef.current=!0}},w=()=>{if(s.isClosePausedRef.current){const N=new CustomEvent(Ld);h.dispatchEvent(N),s.isClosePausedRef.current=!1}},j=N=>{!b.contains(N.relatedTarget)&&w()},E=()=>{b.contains(document.activeElement)||w()};return b.addEventListener("focusin",v),b.addEventListener("focusout",j),b.addEventListener("pointermove",v),b.addEventListener("pointerleave",E),window.addEventListener("blur",v),window.addEventListener("focus",w),()=>{b.removeEventListener("focusin",v),b.removeEventListener("focusout",j),b.removeEventListener("pointermove",v),b.removeEventListener("pointerleave",E),window.removeEventListener("blur",v),window.removeEventListener("focus",w)}}},[y,s.isClosePausedRef]);const g=x.useCallback(({tabbingDirection:b})=>{const v=l().map(w=>{const j=w.ref.current,E=[j,...tN(j)];return b==="forwards"?E:E.reverse()});return(b==="forwards"?v.reverse():v).flat()},[l]);return x.useEffect(()=>{const b=m.current;if(b){const h=v=>{var E,N,P;const w=v.altKey||v.ctrlKey||v.metaKey;if(v.key==="Tab"&&!w){const k=document.activeElement,z=v.shiftKey;if(v.target===b&&z){(E=u.current)==null||E.focus();return}const _=g({tabbingDirection:z?"backwards":"forwards"}),V=_.findIndex(L=>L===k);bu(_.slice(V+1))?v.preventDefault():z?(N=u.current)==null||N.focus():(P=d.current)==null||P.focus()}};return b.addEventListener("keydown",h),()=>b.removeEventListener("keydown",h)}},[l,g]),i.jsxs(zC,{ref:c,role:"region","aria-label":a.replace("{hotkey}",p),tabIndex:-1,style:{pointerEvents:y?void 0:"none"},children:[y&&i.jsx(Fd,{ref:u,onFocusFromOutsideViewport:()=>{const b=g({tabbingDirection:"forwards"});bu(b)}}),i.jsx(Np.Slot,{scope:n,children:i.jsx(we.ol,{tabIndex:-1,...o,ref:f})}),y&&i.jsx(Fd,{ref:d,onFocusFromOutsideViewport:()=>{const b=g({tabbingDirection:"backwards"});bu(b)}})]})});mb.displayName=db;var pb="ToastFocusProxy",Fd=x.forwardRef((e,r)=>{const{__scopeToast:n,onFocusFromOutsideViewport:t,...a}=e,o=Cc(pb,n);return i.jsx(Sc,{"aria-hidden":!0,tabIndex:0,...a,ref:r,style:{position:"fixed"},onFocus:s=>{var u;const l=s.relatedTarget;!((u=o.viewport)!=null&&u.contains(l))&&t()}})});Fd.displayName=pb;var bi="Toast",HC="toast.swipeStart",QC="toast.swipeMove",WC="toast.swipeCancel",GC="toast.swipeEnd",fb=x.forwardRef((e,r)=>{const{forceMount:n,open:t,defaultOpen:a,onOpenChange:o,...s}=e,[l,c]=yi({prop:t,defaultProp:a??!0,onChange:o,caller:bi});return i.jsx(pt,{present:n||l,children:i.jsx(XC,{open:l,...s,ref:r,onClose:()=>c(!1),onPause:vr(e.onPause),onResume:vr(e.onResume),onSwipeStart:xe(e.onSwipeStart,u=>{u.currentTarget.setAttribute("data-swipe","start")}),onSwipeMove:xe(e.onSwipeMove,u=>{const{x:d,y:m}=u.detail.delta;u.currentTarget.setAttribute("data-swipe","move"),u.currentTarget.style.setProperty("--radix-toast-swipe-move-x",`${d}px`),u.currentTarget.style.setProperty("--radix-toast-swipe-move-y",`${m}px`)}),onSwipeCancel:xe(e.onSwipeCancel,u=>{u.currentTarget.setAttribute("data-swipe","cancel"),u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),u.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"),u.currentTarget.style.removeProperty("--radix-toast-swipe-end-y")}),onSwipeEnd:xe(e.onSwipeEnd,u=>{const{x:d,y:m}=u.detail.delta;u.currentTarget.setAttribute("data-swipe","end"),u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),u.currentTarget.style.setProperty("--radix-toast-swipe-end-x",`${d}px`),u.currentTarget.style.setProperty("--radix-toast-swipe-end-y",`${m}px`),c(!1)})})})});fb.displayName=bi;var[YC,KC]=cb(bi,{onClose(){}}),XC=x.forwardRef((e,r)=>{const{__scopeToast:n,type:t="foreground",duration:a,open:o,onClose:s,onEscapeKeyDown:l,onPause:c,onResume:u,onSwipeStart:d,onSwipeMove:m,onSwipeCancel:f,onSwipeEnd:p,...y}=e,g=Cc(bi,n),[b,h]=x.useState(null),v=Be(r,L=>h(L)),w=x.useRef(null),j=x.useRef(null),E=a||g.duration,N=x.useRef(0),P=x.useRef(E),k=x.useRef(0),{onToastAdd:z,onToastRemove:A}=g,I=vr(()=>{var U;(b==null?void 0:b.contains(document.activeElement))&&((U=g.viewport)==null||U.focus()),s()}),_=x.useCallback(L=>{!L||L===1/0||(window.clearTimeout(k.current),N.current=new Date().getTime(),k.current=window.setTimeout(I,L))},[I]);x.useEffect(()=>{const L=g.viewport;if(L){const U=()=>{_(P.current),u==null||u()},Q=()=>{const R=new Date().getTime()-N.current;P.current=P.current-R,window.clearTimeout(k.current),c==null||c()};return L.addEventListener(Md,Q),L.addEventListener(Ld,U),()=>{L.removeEventListener(Md,Q),L.removeEventListener(Ld,U)}}},[g.viewport,E,c,u,_]),x.useEffect(()=>{o&&!g.isClosePausedRef.current&&_(E)},[o,E,g.isClosePausedRef,_]),x.useEffect(()=>(z(),()=>A()),[z,A]);const V=x.useMemo(()=>b?wb(b):null,[b]);return g.viewport?i.jsxs(i.Fragment,{children:[V&&i.jsx(JC,{__scopeToast:n,role:"status","aria-live":t==="foreground"?"assertive":"polite","aria-atomic":!0,children:V}),i.jsx(YC,{scope:n,onClose:I,children:xi.createPortal(i.jsx(Np.ItemSlot,{scope:n,children:i.jsx(TC,{asChild:!0,onEscapeKeyDown:xe(l,()=>{g.isFocusedToastEscapeKeyDownRef.current||I(),g.isFocusedToastEscapeKeyDownRef.current=!1}),children:i.jsx(we.li,{role:"status","aria-live":"off","aria-atomic":!0,tabIndex:0,"data-state":o?"open":"closed","data-swipe-direction":g.swipeDirection,...y,ref:v,style:{userSelect:"none",touchAction:"none",...e.style},onKeyDown:xe(e.onKeyDown,L=>{L.key==="Escape"&&(l==null||l(L.nativeEvent),L.nativeEvent.defaultPrevented||(g.isFocusedToastEscapeKeyDownRef.current=!0,I()))}),onPointerDown:xe(e.onPointerDown,L=>{L.button===0&&(w.current={x:L.clientX,y:L.clientY})}),onPointerMove:xe(e.onPointerMove,L=>{if(!w.current)return;const U=L.clientX-w.current.x,Q=L.clientY-w.current.y,R=!!j.current,q=["left","right"].includes(g.swipeDirection),O=["left","up"].includes(g.swipeDirection)?Math.min:Math.max,S=q?O(0,U):0,Y=q?0:O(0,Q),F=L.pointerType==="touch"?10:2,C={x:S,y:Y},W={originalEvent:L,delta:C};R?(j.current=C,Wi(QC,m,W,{discrete:!1})):Dh(C,g.swipeDirection,F)?(j.current=C,Wi(HC,d,W,{discrete:!1}),L.target.setPointerCapture(L.pointerId)):(Math.abs(U)>F||Math.abs(Q)>F)&&(w.current=null)}),onPointerUp:xe(e.onPointerUp,L=>{const U=j.current,Q=L.target;if(Q.hasPointerCapture(L.pointerId)&&Q.releasePointerCapture(L.pointerId),j.current=null,w.current=null,U){const R=L.currentTarget,q={originalEvent:L,delta:U};Dh(U,g.swipeDirection,g.swipeThreshold)?Wi(GC,p,q,{discrete:!0}):Wi(WC,f,q,{discrete:!0}),R.addEventListener("click",O=>O.preventDefault(),{once:!0})}})})})}),g.viewport)})]}):null}),JC=e=>{const{__scopeToast:r,children:n,...t}=e,a=Cc(bi,r),[o,s]=x.useState(!1),[l,c]=x.useState(!1);return rN(()=>s(!0)),x.useEffect(()=>{const u=window.setTimeout(()=>c(!0),1e3);return()=>window.clearTimeout(u)},[]),l?null:i.jsx(lb,{asChild:!0,children:i.jsx(Sc,{...t,children:o&&i.jsxs(i.Fragment,{children:[a.label," ",n]})})})},ZC="ToastTitle",hb=x.forwardRef((e,r)=>{const{__scopeToast:n,...t}=e;return i.jsx(we.div,{...t,ref:r})});hb.displayName=ZC;var eN="ToastDescription",gb=x.forwardRef((e,r)=>{const{__scopeToast:n,...t}=e;return i.jsx(we.div,{...t,ref:r})});gb.displayName=eN;var vb="ToastAction",xb=x.forwardRef((e,r)=>{const{altText:n,...t}=e;return n.trim()?i.jsx(bb,{altText:n,asChild:!0,children:i.jsx(Ep,{...t,ref:r})}):(console.error(`Invalid prop \`altText\` supplied to \`${vb}\`. Expected non-empty \`string\`.`),null)});xb.displayName=vb;var yb="ToastClose",Ep=x.forwardRef((e,r)=>{const{__scopeToast:n,...t}=e,a=KC(yb,n);return i.jsx(bb,{asChild:!0,children:i.jsx(we.button,{type:"button",...t,ref:r,onClick:xe(e.onClick,a.onClose)})})});Ep.displayName=yb;var bb=x.forwardRef((e,r)=>{const{__scopeToast:n,altText:t,...a}=e;return i.jsx(we.div,{"data-radix-toast-announce-exclude":"","data-radix-toast-announce-alt":t||void 0,...a,ref:r})});function wb(e){const r=[];return Array.from(e.childNodes).forEach(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent&&r.push(t.textContent),nN(t)){const a=t.ariaHidden||t.hidden||t.style.display==="none",o=t.dataset.radixToastAnnounceExclude==="";if(!a)if(o){const s=t.dataset.radixToastAnnounceAlt;s&&r.push(s)}else r.push(...wb(t))}}),r}function Wi(e,r,n,{discrete:t}){const a=n.originalEvent.currentTarget,o=new CustomEvent(e,{bubbles:!0,cancelable:!0,detail:n});r&&a.addEventListener(e,r,{once:!0}),t?ab(a,o):a.dispatchEvent(o)}var Dh=(e,r,n=0)=>{const t=Math.abs(e.x),a=Math.abs(e.y),o=t>a;return r==="left"||r==="right"?o&&t>n:!o&&a>n};function rN(e=()=>{}){const r=vr(e);Nn(()=>{let n=0,t=0;return n=window.requestAnimationFrame(()=>t=window.requestAnimationFrame(r)),()=>{window.cancelAnimationFrame(n),window.cancelAnimationFrame(t)}},[r])}function nN(e){return e.nodeType===e.ELEMENT_NODE}function tN(e){const r=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:t=>{const a=t.tagName==="INPUT"&&t.type==="hidden";return t.disabled||t.hidden||a?NodeFilter.FILTER_SKIP:t.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)r.push(n.currentNode);return r}function bu(e){const r=document.activeElement;return e.some(n=>n===r?!0:(n.focus(),document.activeElement!==r))}var aN=ub,jb=mb,Sb=fb,Cb=hb,Nb=gb,Eb=xb,kb=Ep;function Pb(e){var r,n,t="";if(typeof e=="string"||typeof e=="number")t+=e;else if(typeof e=="object")if(Array.isArray(e)){var a=e.length;for(r=0;r<a;r++)e[r]&&(n=Pb(e[r]))&&(t&&(t+=" "),t+=n)}else for(n in e)e[n]&&(t&&(t+=" "),t+=n);return t}function Tb(){for(var e,r,n=0,t="",a=arguments.length;n<a;n++)(e=arguments[n])&&(r=Pb(e))&&(t&&(t+=" "),t+=r);return t}const Bh=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,$h=Tb,Nc=(e,r)=>n=>{var t;if((r==null?void 0:r.variants)==null)return $h(e,n==null?void 0:n.class,n==null?void 0:n.className);const{variants:a,defaultVariants:o}=r,s=Object.keys(a).map(u=>{const d=n==null?void 0:n[u],m=o==null?void 0:o[u];if(d===null)return null;const f=Bh(d)||Bh(m);return a[u][f]}),l=n&&Object.entries(n).reduce((u,d)=>{let[m,f]=d;return f===void 0||(u[m]=f),u},{}),c=r==null||(t=r.compoundVariants)===null||t===void 0?void 0:t.reduce((u,d)=>{let{class:m,className:f,...p}=d;return Object.entries(p).every(y=>{let[g,b]=y;return Array.isArray(b)?b.includes({...o,...l}[g]):{...o,...l}[g]===b})?[...u,m,f]:u},[]);return $h(e,s,c,n==null?void 0:n.class,n==null?void 0:n.className)};/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oN=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),zb=(...e)=>e.filter((r,n,t)=>!!r&&r.trim()!==""&&t.indexOf(r)===n).join(" ").trim();/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var sN={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iN=x.forwardRef(({color:e="currentColor",size:r=24,strokeWidth:n=2,absoluteStrokeWidth:t,className:a="",children:o,iconNode:s,...l},c)=>x.createElement("svg",{ref:c,...sN,width:r,height:r,stroke:e,strokeWidth:t?Number(n)*24/Number(r):n,className:zb("lucide",a),...l},[...s.map(([u,d])=>x.createElement(u,d)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=(e,r)=>{const n=x.forwardRef(({className:t,...a},o)=>x.createElement(iN,{ref:o,iconNode:r,className:zb(`lucide-${oN(e)}`,t),...a}));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kp=le("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uh=le("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vh=le("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ql=le("BookOpen",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ab=le("Brain",[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",key:"ep3f8r"}],["path",{d:"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4",key:"1p4c4q"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375",key:"tmeiqw"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396",key:"1qfode"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18",key:"159ez6"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wu=le("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qb=le("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lN=le("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cN=le("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const er=le("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uN=le("Clock3",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16.5 12",key:"1aq6pp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dN=le("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mN=le("Coins",[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dd=le("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pN=le("CreditCard",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fN=le("Dna",[["path",{d:"m10 16 1.5 1.5",key:"11lckj"}],["path",{d:"m14 8-1.5-1.5",key:"1ohn8i"}],["path",{d:"M15 2c-1.798 1.998-2.518 3.995-2.807 5.993",key:"80uv8i"}],["path",{d:"m16.5 10.5 1 1",key:"696xn5"}],["path",{d:"m17 6-2.891-2.891",key:"xu6p2f"}],["path",{d:"M2 15c6.667-6 13.333 0 20-6",key:"1pyr53"}],["path",{d:"m20 9 .891.891",key:"3xwk7g"}],["path",{d:"M3.109 14.109 4 15",key:"q76aoh"}],["path",{d:"m6.5 12.5 1 1",key:"cs35ky"}],["path",{d:"m7 18 2.891 2.891",key:"1sisit"}],["path",{d:"M9 22c1.798-1.998 2.518-3.995 2.807-5.993",key:"q3hbxp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ju=le("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hN=le("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Su=le("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gN=le("Lightbulb",[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $o=le("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ja=le("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hh=le("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cu=le("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rn=le("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rb=le("RefreshCcw",[["path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"14sxne"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",key:"1hlbsb"}],["path",{d:"M16 16h5v5",key:"ccwih5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vN=le("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xN=le("Scale",[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"7g6ntu"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"ijws7r"}],["path",{d:"M7 21h10",key:"1b0cd5"}],["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",key:"3gwbw2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _s=le("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bd=le("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kr=le("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $d=le("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rn=le("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yN=le("Timer",[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qh=le("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uo=le("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bN=le("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wh=le("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _b=le("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gh=le("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]),Pp="-",wN=e=>{const r=SN(e),{conflictingClassGroups:n,conflictingClassGroupModifiers:t}=e;return{getClassGroupId:s=>{const l=s.split(Pp);return l[0]===""&&l.length!==1&&l.shift(),Ob(l,r)||jN(s)},getConflictingClassGroupIds:(s,l)=>{const c=n[s]||[];return l&&t[s]?[...c,...t[s]]:c}}},Ob=(e,r)=>{var s;if(e.length===0)return r.classGroupId;const n=e[0],t=r.nextPart.get(n),a=t?Ob(e.slice(1),t):void 0;if(a)return a;if(r.validators.length===0)return;const o=e.join(Pp);return(s=r.validators.find(({validator:l})=>l(o)))==null?void 0:s.classGroupId},Yh=/^\[(.+)\]$/,jN=e=>{if(Yh.test(e)){const r=Yh.exec(e)[1],n=r==null?void 0:r.substring(0,r.indexOf(":"));if(n)return"arbitrary.."+n}},SN=e=>{const{theme:r,prefix:n}=e,t={nextPart:new Map,validators:[]};return NN(Object.entries(e.classGroups),n).forEach(([o,s])=>{Ud(s,t,o,r)}),t},Ud=(e,r,n,t)=>{e.forEach(a=>{if(typeof a=="string"){const o=a===""?r:Kh(r,a);o.classGroupId=n;return}if(typeof a=="function"){if(CN(a)){Ud(a(t),r,n,t);return}r.validators.push({validator:a,classGroupId:n});return}Object.entries(a).forEach(([o,s])=>{Ud(s,Kh(r,o),n,t)})})},Kh=(e,r)=>{let n=e;return r.split(Pp).forEach(t=>{n.nextPart.has(t)||n.nextPart.set(t,{nextPart:new Map,validators:[]}),n=n.nextPart.get(t)}),n},CN=e=>e.isThemeGetter,NN=(e,r)=>r?e.map(([n,t])=>{const a=t.map(o=>typeof o=="string"?r+o:typeof o=="object"?Object.fromEntries(Object.entries(o).map(([s,l])=>[r+s,l])):o);return[n,a]}):e,EN=e=>{if(e<1)return{get:()=>{},set:()=>{}};let r=0,n=new Map,t=new Map;const a=(o,s)=>{n.set(o,s),r++,r>e&&(r=0,t=n,n=new Map)};return{get(o){let s=n.get(o);if(s!==void 0)return s;if((s=t.get(o))!==void 0)return a(o,s),s},set(o,s){n.has(o)?n.set(o,s):a(o,s)}}},Ib="!",kN=e=>{const{separator:r,experimentalParseClassName:n}=e,t=r.length===1,a=r[0],o=r.length,s=l=>{const c=[];let u=0,d=0,m;for(let b=0;b<l.length;b++){let h=l[b];if(u===0){if(h===a&&(t||l.slice(b,b+o)===r)){c.push(l.slice(d,b)),d=b+o;continue}if(h==="/"){m=b;continue}}h==="["?u++:h==="]"&&u--}const f=c.length===0?l:l.substring(d),p=f.startsWith(Ib),y=p?f.substring(1):f,g=m&&m>d?m-d:void 0;return{modifiers:c,hasImportantModifier:p,baseClassName:y,maybePostfixModifierPosition:g}};return n?l=>n({className:l,parseClassName:s}):s},PN=e=>{if(e.length<=1)return e;const r=[];let n=[];return e.forEach(t=>{t[0]==="["?(r.push(...n.sort(),t),n=[]):n.push(t)}),r.push(...n.sort()),r},TN=e=>({cache:EN(e.cacheSize),parseClassName:kN(e),...wN(e)}),zN=/\s+/,AN=(e,r)=>{const{parseClassName:n,getClassGroupId:t,getConflictingClassGroupIds:a}=r,o=[],s=e.trim().split(zN);let l="";for(let c=s.length-1;c>=0;c-=1){const u=s[c],{modifiers:d,hasImportantModifier:m,baseClassName:f,maybePostfixModifierPosition:p}=n(u);let y=!!p,g=t(y?f.substring(0,p):f);if(!g){if(!y){l=u+(l.length>0?" "+l:l);continue}if(g=t(f),!g){l=u+(l.length>0?" "+l:l);continue}y=!1}const b=PN(d).join(":"),h=m?b+Ib:b,v=h+g;if(o.includes(v))continue;o.push(v);const w=a(g,y);for(let j=0;j<w.length;++j){const E=w[j];o.push(h+E)}l=u+(l.length>0?" "+l:l)}return l};function qN(){let e=0,r,n,t="";for(;e<arguments.length;)(r=arguments[e++])&&(n=Mb(r))&&(t&&(t+=" "),t+=n);return t}const Mb=e=>{if(typeof e=="string")return e;let r,n="";for(let t=0;t<e.length;t++)e[t]&&(r=Mb(e[t]))&&(n&&(n+=" "),n+=r);return n};function RN(e,...r){let n,t,a,o=s;function s(c){const u=r.reduce((d,m)=>m(d),e());return n=TN(u),t=n.cache.get,a=n.cache.set,o=l,l(c)}function l(c){const u=t(c);if(u)return u;const d=AN(c,n);return a(c,d),d}return function(){return o(qN.apply(null,arguments))}}const ke=e=>{const r=n=>n[e]||[];return r.isThemeGetter=!0,r},Lb=/^\[(?:([a-z-]+):)?(.+)\]$/i,_N=/^\d+\/\d+$/,ON=new Set(["px","full","screen"]),IN=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,MN=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,LN=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,FN=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,DN=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,Xn=e=>xo(e)||ON.has(e)||_N.test(e),bt=e=>Ko(e,"length",GN),xo=e=>!!e&&!Number.isNaN(Number(e)),Nu=e=>Ko(e,"number",xo),ds=e=>!!e&&Number.isInteger(Number(e)),BN=e=>e.endsWith("%")&&xo(e.slice(0,-1)),se=e=>Lb.test(e),wt=e=>IN.test(e),$N=new Set(["length","size","percentage"]),UN=e=>Ko(e,$N,Fb),VN=e=>Ko(e,"position",Fb),HN=new Set(["image","url"]),QN=e=>Ko(e,HN,KN),WN=e=>Ko(e,"",YN),ms=()=>!0,Ko=(e,r,n)=>{const t=Lb.exec(e);return t?t[1]?typeof r=="string"?t[1]===r:r.has(t[1]):n(t[2]):!1},GN=e=>MN.test(e)&&!LN.test(e),Fb=()=>!1,YN=e=>FN.test(e),KN=e=>DN.test(e),XN=()=>{const e=ke("colors"),r=ke("spacing"),n=ke("blur"),t=ke("brightness"),a=ke("borderColor"),o=ke("borderRadius"),s=ke("borderSpacing"),l=ke("borderWidth"),c=ke("contrast"),u=ke("grayscale"),d=ke("hueRotate"),m=ke("invert"),f=ke("gap"),p=ke("gradientColorStops"),y=ke("gradientColorStopPositions"),g=ke("inset"),b=ke("margin"),h=ke("opacity"),v=ke("padding"),w=ke("saturate"),j=ke("scale"),E=ke("sepia"),N=ke("skew"),P=ke("space"),k=ke("translate"),z=()=>["auto","contain","none"],A=()=>["auto","hidden","clip","visible","scroll"],I=()=>["auto",se,r],_=()=>[se,r],V=()=>["",Xn,bt],L=()=>["auto",xo,se],U=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],Q=()=>["solid","dashed","dotted","double","none"],R=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],q=()=>["start","end","center","between","around","evenly","stretch"],O=()=>["","0",se],S=()=>["auto","avoid","all","avoid-page","page","left","right","column"],Y=()=>[xo,se];return{cacheSize:500,separator:":",theme:{colors:[ms],spacing:[Xn,bt],blur:["none","",wt,se],brightness:Y(),borderColor:[e],borderRadius:["none","","full",wt,se],borderSpacing:_(),borderWidth:V(),contrast:Y(),grayscale:O(),hueRotate:Y(),invert:O(),gap:_(),gradientColorStops:[e],gradientColorStopPositions:[BN,bt],inset:I(),margin:I(),opacity:Y(),padding:_(),saturate:Y(),scale:Y(),sepia:O(),skew:Y(),space:_(),translate:_()},classGroups:{aspect:[{aspect:["auto","square","video",se]}],container:["container"],columns:[{columns:[wt]}],"break-after":[{"break-after":S()}],"break-before":[{"break-before":S()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...U(),se]}],overflow:[{overflow:A()}],"overflow-x":[{"overflow-x":A()}],"overflow-y":[{"overflow-y":A()}],overscroll:[{overscroll:z()}],"overscroll-x":[{"overscroll-x":z()}],"overscroll-y":[{"overscroll-y":z()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[g]}],"inset-x":[{"inset-x":[g]}],"inset-y":[{"inset-y":[g]}],start:[{start:[g]}],end:[{end:[g]}],top:[{top:[g]}],right:[{right:[g]}],bottom:[{bottom:[g]}],left:[{left:[g]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",ds,se]}],basis:[{basis:I()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",se]}],grow:[{grow:O()}],shrink:[{shrink:O()}],order:[{order:["first","last","none",ds,se]}],"grid-cols":[{"grid-cols":[ms]}],"col-start-end":[{col:["auto",{span:["full",ds,se]},se]}],"col-start":[{"col-start":L()}],"col-end":[{"col-end":L()}],"grid-rows":[{"grid-rows":[ms]}],"row-start-end":[{row:["auto",{span:[ds,se]},se]}],"row-start":[{"row-start":L()}],"row-end":[{"row-end":L()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",se]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",se]}],gap:[{gap:[f]}],"gap-x":[{"gap-x":[f]}],"gap-y":[{"gap-y":[f]}],"justify-content":[{justify:["normal",...q()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...q(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...q(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[v]}],px:[{px:[v]}],py:[{py:[v]}],ps:[{ps:[v]}],pe:[{pe:[v]}],pt:[{pt:[v]}],pr:[{pr:[v]}],pb:[{pb:[v]}],pl:[{pl:[v]}],m:[{m:[b]}],mx:[{mx:[b]}],my:[{my:[b]}],ms:[{ms:[b]}],me:[{me:[b]}],mt:[{mt:[b]}],mr:[{mr:[b]}],mb:[{mb:[b]}],ml:[{ml:[b]}],"space-x":[{"space-x":[P]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[P]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",se,r]}],"min-w":[{"min-w":[se,r,"min","max","fit"]}],"max-w":[{"max-w":[se,r,"none","full","min","max","fit","prose",{screen:[wt]},wt]}],h:[{h:[se,r,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[se,r,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[se,r,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[se,r,"auto","min","max","fit"]}],"font-size":[{text:["base",wt,bt]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",Nu]}],"font-family":[{font:[ms]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",se]}],"line-clamp":[{"line-clamp":["none",xo,Nu]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",Xn,se]}],"list-image":[{"list-image":["none",se]}],"list-style-type":[{list:["none","disc","decimal",se]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[h]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[h]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...Q(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",Xn,bt]}],"underline-offset":[{"underline-offset":["auto",Xn,se]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:_()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",se]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",se]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[h]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...U(),VN]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",UN]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},QN]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[y]}],"gradient-via-pos":[{via:[y]}],"gradient-to-pos":[{to:[y]}],"gradient-from":[{from:[p]}],"gradient-via":[{via:[p]}],"gradient-to":[{to:[p]}],rounded:[{rounded:[o]}],"rounded-s":[{"rounded-s":[o]}],"rounded-e":[{"rounded-e":[o]}],"rounded-t":[{"rounded-t":[o]}],"rounded-r":[{"rounded-r":[o]}],"rounded-b":[{"rounded-b":[o]}],"rounded-l":[{"rounded-l":[o]}],"rounded-ss":[{"rounded-ss":[o]}],"rounded-se":[{"rounded-se":[o]}],"rounded-ee":[{"rounded-ee":[o]}],"rounded-es":[{"rounded-es":[o]}],"rounded-tl":[{"rounded-tl":[o]}],"rounded-tr":[{"rounded-tr":[o]}],"rounded-br":[{"rounded-br":[o]}],"rounded-bl":[{"rounded-bl":[o]}],"border-w":[{border:[l]}],"border-w-x":[{"border-x":[l]}],"border-w-y":[{"border-y":[l]}],"border-w-s":[{"border-s":[l]}],"border-w-e":[{"border-e":[l]}],"border-w-t":[{"border-t":[l]}],"border-w-r":[{"border-r":[l]}],"border-w-b":[{"border-b":[l]}],"border-w-l":[{"border-l":[l]}],"border-opacity":[{"border-opacity":[h]}],"border-style":[{border:[...Q(),"hidden"]}],"divide-x":[{"divide-x":[l]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[l]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[h]}],"divide-style":[{divide:Q()}],"border-color":[{border:[a]}],"border-color-x":[{"border-x":[a]}],"border-color-y":[{"border-y":[a]}],"border-color-s":[{"border-s":[a]}],"border-color-e":[{"border-e":[a]}],"border-color-t":[{"border-t":[a]}],"border-color-r":[{"border-r":[a]}],"border-color-b":[{"border-b":[a]}],"border-color-l":[{"border-l":[a]}],"divide-color":[{divide:[a]}],"outline-style":[{outline:["",...Q()]}],"outline-offset":[{"outline-offset":[Xn,se]}],"outline-w":[{outline:[Xn,bt]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:V()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[h]}],"ring-offset-w":[{"ring-offset":[Xn,bt]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",wt,WN]}],"shadow-color":[{shadow:[ms]}],opacity:[{opacity:[h]}],"mix-blend":[{"mix-blend":[...R(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":R()}],filter:[{filter:["","none"]}],blur:[{blur:[n]}],brightness:[{brightness:[t]}],contrast:[{contrast:[c]}],"drop-shadow":[{"drop-shadow":["","none",wt,se]}],grayscale:[{grayscale:[u]}],"hue-rotate":[{"hue-rotate":[d]}],invert:[{invert:[m]}],saturate:[{saturate:[w]}],sepia:[{sepia:[E]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[n]}],"backdrop-brightness":[{"backdrop-brightness":[t]}],"backdrop-contrast":[{"backdrop-contrast":[c]}],"backdrop-grayscale":[{"backdrop-grayscale":[u]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[d]}],"backdrop-invert":[{"backdrop-invert":[m]}],"backdrop-opacity":[{"backdrop-opacity":[h]}],"backdrop-saturate":[{"backdrop-saturate":[w]}],"backdrop-sepia":[{"backdrop-sepia":[E]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[s]}],"border-spacing-x":[{"border-spacing-x":[s]}],"border-spacing-y":[{"border-spacing-y":[s]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",se]}],duration:[{duration:Y()}],ease:[{ease:["linear","in","out","in-out",se]}],delay:[{delay:Y()}],animate:[{animate:["none","spin","ping","pulse","bounce",se]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[j]}],"scale-x":[{"scale-x":[j]}],"scale-y":[{"scale-y":[j]}],rotate:[{rotate:[ds,se]}],"translate-x":[{"translate-x":[k]}],"translate-y":[{"translate-y":[k]}],"skew-x":[{"skew-x":[N]}],"skew-y":[{"skew-y":[N]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",se]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",se]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":_()}],"scroll-mx":[{"scroll-mx":_()}],"scroll-my":[{"scroll-my":_()}],"scroll-ms":[{"scroll-ms":_()}],"scroll-me":[{"scroll-me":_()}],"scroll-mt":[{"scroll-mt":_()}],"scroll-mr":[{"scroll-mr":_()}],"scroll-mb":[{"scroll-mb":_()}],"scroll-ml":[{"scroll-ml":_()}],"scroll-p":[{"scroll-p":_()}],"scroll-px":[{"scroll-px":_()}],"scroll-py":[{"scroll-py":_()}],"scroll-ps":[{"scroll-ps":_()}],"scroll-pe":[{"scroll-pe":_()}],"scroll-pt":[{"scroll-pt":_()}],"scroll-pr":[{"scroll-pr":_()}],"scroll-pb":[{"scroll-pb":_()}],"scroll-pl":[{"scroll-pl":_()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",se]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[Xn,bt,Nu]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},JN=RN(XN);function fe(...e){return JN(Tb(e))}const ZN=aN,Db=x.forwardRef(({className:e,...r},n)=>i.jsx(jb,{ref:n,className:fe("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",e),...r}));Db.displayName=jb.displayName;const eE=Nc("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),Bb=x.forwardRef(({className:e,variant:r,...n},t)=>i.jsx(Sb,{ref:t,className:fe(eE({variant:r}),e),...n}));Bb.displayName=Sb.displayName;const rE=x.forwardRef(({className:e,...r},n)=>i.jsx(Eb,{ref:n,className:fe("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",e),...r}));rE.displayName=Eb.displayName;const $b=x.forwardRef(({className:e,...r},n)=>i.jsx(kb,{ref:n,className:fe("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",e),"toast-close":"",...r,children:i.jsx(_b,{className:"h-4 w-4"})}));$b.displayName=kb.displayName;const Ub=x.forwardRef(({className:e,...r},n)=>i.jsx(Cb,{ref:n,className:fe("text-sm font-semibold",e),...r}));Ub.displayName=Cb.displayName;const Vb=x.forwardRef(({className:e,...r},n)=>i.jsx(Nb,{ref:n,className:fe("text-sm opacity-90",e),...r}));Vb.displayName=Nb.displayName;function nE(){const{toasts:e}=eb();return i.jsxs(ZN,{children:[e.map(function({id:r,title:n,description:t,action:a,...o}){return i.jsxs(Bb,{...o,children:[i.jsxs("div",{className:"grid gap-1",children:[n&&i.jsx(Ub,{children:n}),t&&i.jsx(Vb,{children:t})]}),a,i.jsx($b,{})]},r)}),i.jsx(Db,{})]})}var Wl=["light","dark"],Tp="(prefers-color-scheme: dark)",tE=typeof window>"u",zp=x.createContext(void 0),aE={setTheme:e=>{},themes:[]},oE=()=>{var e;return(e=x.useContext(zp))!=null?e:aE},sE=e=>x.useContext(zp)?e.children:x.createElement(lE,{...e}),iE=["light","dark"],lE=({forcedTheme:e,disableTransitionOnChange:r=!1,enableSystem:n=!0,enableColorScheme:t=!0,storageKey:a="theme",themes:o=iE,defaultTheme:s=n?"system":"light",attribute:l="data-theme",value:c,children:u,nonce:d})=>{let[m,f]=x.useState(()=>Xh(a,s)),[p,y]=x.useState(()=>Xh(a)),g=c?Object.values(c):o,b=x.useCallback(j=>{let E=j;if(!E)return;j==="system"&&n&&(E=Jh());let N=c?c[E]:E,P=r?uE():null,k=document.documentElement;if(l==="class"?(k.classList.remove(...g),N&&k.classList.add(N)):N?k.setAttribute(l,N):k.removeAttribute(l),t){let z=Wl.includes(s)?s:null,A=Wl.includes(E)?E:z;k.style.colorScheme=A}P==null||P()},[]),h=x.useCallback(j=>{let E=typeof j=="function"?j(j):j;f(E);try{localStorage.setItem(a,E)}catch{}},[e]),v=x.useCallback(j=>{let E=Jh(j);y(E),m==="system"&&n&&!e&&b("system")},[m,e]);x.useEffect(()=>{let j=window.matchMedia(Tp);return j.addListener(v),v(j),()=>j.removeListener(v)},[v]),x.useEffect(()=>{let j=E=>{if(E.key!==a)return;let N=E.newValue||s;h(N)};return window.addEventListener("storage",j),()=>window.removeEventListener("storage",j)},[h]),x.useEffect(()=>{b(e??m)},[e,m]);let w=x.useMemo(()=>({theme:m,setTheme:h,forcedTheme:e,resolvedTheme:m==="system"?p:m,themes:n?[...o,"system"]:o,systemTheme:n?p:void 0}),[m,h,e,p,n,o]);return x.createElement(zp.Provider,{value:w},x.createElement(cE,{forcedTheme:e,disableTransitionOnChange:r,enableSystem:n,enableColorScheme:t,storageKey:a,themes:o,defaultTheme:s,attribute:l,value:c,children:u,attrs:g,nonce:d}),u)},cE=x.memo(({forcedTheme:e,storageKey:r,attribute:n,enableSystem:t,enableColorScheme:a,defaultTheme:o,value:s,attrs:l,nonce:c})=>{let u=o==="system",d=n==="class"?`var d=document.documentElement,c=d.classList;${`c.remove(${l.map(y=>`'${y}'`).join(",")})`};`:`var d=document.documentElement,n='${n}',s='setAttribute';`,m=a?Wl.includes(o)&&o?`if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${o}'`:"if(e==='light'||e==='dark')d.style.colorScheme=e":"",f=(y,g=!1,b=!0)=>{let h=s?s[y]:y,v=g?y+"|| ''":`'${h}'`,w="";return a&&b&&!g&&Wl.includes(y)&&(w+=`d.style.colorScheme = '${y}';`),n==="class"?g||h?w+=`c.add(${v})`:w+="null":h&&(w+=`d[s](n,${v})`),w},p=e?`!function(){${d}${f(e)}}()`:t?`!function(){try{${d}var e=localStorage.getItem('${r}');if('system'===e||(!e&&${u})){var t='${Tp}',m=window.matchMedia(t);if(m.media!==t||m.matches){${f("dark")}}else{${f("light")}}}else if(e){${s?`var x=${JSON.stringify(s)};`:""}${f(s?"x[e]":"e",!0)}}${u?"":"else{"+f(o,!1,!1)+"}"}${m}}catch(e){}}()`:`!function(){try{${d}var e=localStorage.getItem('${r}');if(e){${s?`var x=${JSON.stringify(s)};`:""}${f(s?"x[e]":"e",!0)}}else{${f(o,!1,!1)};}${m}}catch(t){}}();`;return x.createElement("script",{nonce:c,dangerouslySetInnerHTML:{__html:p}})}),Xh=(e,r)=>{if(tE)return;let n;try{n=localStorage.getItem(e)||void 0}catch{}return n||r},uE=()=>{let e=document.createElement("style");return e.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(e),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(e)},1)}},Jh=e=>(e||(e=window.matchMedia(Tp)),e.matches?"dark":"light"),dE=e=>{switch(e){case"success":return fE;case"info":return gE;case"warning":return hE;case"error":return vE;default:return null}},mE=Array(12).fill(0),pE=({visible:e,className:r})=>D.createElement("div",{className:["sonner-loading-wrapper",r].filter(Boolean).join(" "),"data-visible":e},D.createElement("div",{className:"sonner-spinner"},mE.map((n,t)=>D.createElement("div",{className:"sonner-loading-bar",key:`spinner-bar-${t}`})))),fE=D.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},D.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",clipRule:"evenodd"})),hE=D.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",height:"20",width:"20"},D.createElement("path",{fillRule:"evenodd",d:"M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",clipRule:"evenodd"})),gE=D.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},D.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",clipRule:"evenodd"})),vE=D.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},D.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",clipRule:"evenodd"})),xE=D.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"},D.createElement("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),D.createElement("line",{x1:"6",y1:"6",x2:"18",y2:"18"})),yE=()=>{let[e,r]=D.useState(document.hidden);return D.useEffect(()=>{let n=()=>{r(document.hidden)};return document.addEventListener("visibilitychange",n),()=>window.removeEventListener("visibilitychange",n)},[]),e},Vd=1,bE=class{constructor(){this.subscribe=e=>(this.subscribers.push(e),()=>{let r=this.subscribers.indexOf(e);this.subscribers.splice(r,1)}),this.publish=e=>{this.subscribers.forEach(r=>r(e))},this.addToast=e=>{this.publish(e),this.toasts=[...this.toasts,e]},this.create=e=>{var r;let{message:n,...t}=e,a=typeof(e==null?void 0:e.id)=="number"||((r=e.id)==null?void 0:r.length)>0?e.id:Vd++,o=this.toasts.find(l=>l.id===a),s=e.dismissible===void 0?!0:e.dismissible;return this.dismissedToasts.has(a)&&this.dismissedToasts.delete(a),o?this.toasts=this.toasts.map(l=>l.id===a?(this.publish({...l,...e,id:a,title:n}),{...l,...e,id:a,dismissible:s,title:n}):l):this.addToast({title:n,...t,dismissible:s,id:a}),a},this.dismiss=e=>(this.dismissedToasts.add(e),e||this.toasts.forEach(r=>{this.subscribers.forEach(n=>n({id:r.id,dismiss:!0}))}),this.subscribers.forEach(r=>r({id:e,dismiss:!0})),e),this.message=(e,r)=>this.create({...r,message:e}),this.error=(e,r)=>this.create({...r,message:e,type:"error"}),this.success=(e,r)=>this.create({...r,type:"success",message:e}),this.info=(e,r)=>this.create({...r,type:"info",message:e}),this.warning=(e,r)=>this.create({...r,type:"warning",message:e}),this.loading=(e,r)=>this.create({...r,type:"loading",message:e}),this.promise=(e,r)=>{if(!r)return;let n;r.loading!==void 0&&(n=this.create({...r,promise:e,type:"loading",message:r.loading,description:typeof r.description!="function"?r.description:void 0}));let t=e instanceof Promise?e:e(),a=n!==void 0,o,s=t.then(async c=>{if(o=["resolve",c],D.isValidElement(c))a=!1,this.create({id:n,type:"default",message:c});else if(jE(c)&&!c.ok){a=!1;let u=typeof r.error=="function"?await r.error(`HTTP error! status: ${c.status}`):r.error,d=typeof r.description=="function"?await r.description(`HTTP error! status: ${c.status}`):r.description;this.create({id:n,type:"error",message:u,description:d})}else if(r.success!==void 0){a=!1;let u=typeof r.success=="function"?await r.success(c):r.success,d=typeof r.description=="function"?await r.description(c):r.description;this.create({id:n,type:"success",message:u,description:d})}}).catch(async c=>{if(o=["reject",c],r.error!==void 0){a=!1;let u=typeof r.error=="function"?await r.error(c):r.error,d=typeof r.description=="function"?await r.description(c):r.description;this.create({id:n,type:"error",message:u,description:d})}}).finally(()=>{var c;a&&(this.dismiss(n),n=void 0),(c=r.finally)==null||c.call(r)}),l=()=>new Promise((c,u)=>s.then(()=>o[0]==="reject"?u(o[1]):c(o[1])).catch(u));return typeof n!="string"&&typeof n!="number"?{unwrap:l}:Object.assign(n,{unwrap:l})},this.custom=(e,r)=>{let n=(r==null?void 0:r.id)||Vd++;return this.create({jsx:e(n),id:n,...r}),n},this.getActiveToasts=()=>this.toasts.filter(e=>!this.dismissedToasts.has(e.id)),this.subscribers=[],this.toasts=[],this.dismissedToasts=new Set}},Nr=new bE,wE=(e,r)=>{let n=(r==null?void 0:r.id)||Vd++;return Nr.addToast({title:e,...r,id:n}),n},jE=e=>e&&typeof e=="object"&&"ok"in e&&typeof e.ok=="boolean"&&"status"in e&&typeof e.status=="number",SE=wE,CE=()=>Nr.toasts,NE=()=>Nr.getActiveToasts(),hl=Object.assign(SE,{success:Nr.success,info:Nr.info,warning:Nr.warning,error:Nr.error,custom:Nr.custom,message:Nr.message,promise:Nr.promise,dismiss:Nr.dismiss,loading:Nr.loading},{getHistory:CE,getToasts:NE});function EE(e,{insertAt:r}={}){if(typeof document>"u")return;let n=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",r==="top"&&n.firstChild?n.insertBefore(t,n.firstChild):n.appendChild(t),t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e))}EE(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:var(--offset-right)}:where([data-sonner-toaster][data-x-position="left"]){left:var(--offset-left)}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:var(--offset-top)}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:var(--offset-bottom)}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:-50%;right:-50%;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y, 0px)) translate(var(--swipe-amount-x, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-bg-hover: hsl(0, 0%, 12%);--normal-border: hsl(0, 0%, 20%);--normal-border-hover: hsl(0, 0%, 25%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);function Gi(e){return e.label!==void 0}var kE=3,PE="32px",TE="16px",Zh=4e3,zE=356,AE=14,qE=20,RE=200;function hn(...e){return e.filter(Boolean).join(" ")}function _E(e){let[r,n]=e.split("-"),t=[];return r&&t.push(r),n&&t.push(n),t}var OE=e=>{var r,n,t,a,o,s,l,c,u,d,m;let{invert:f,toast:p,unstyled:y,interacting:g,setHeights:b,visibleToasts:h,heights:v,index:w,toasts:j,expanded:E,removeToast:N,defaultRichColors:P,closeButton:k,style:z,cancelButtonStyle:A,actionButtonStyle:I,className:_="",descriptionClassName:V="",duration:L,position:U,gap:Q,loadingIcon:R,expandByDefault:q,classNames:O,icons:S,closeButtonAriaLabel:Y="Close toast",pauseWhenPageIsHidden:F}=e,[C,W]=D.useState(null),[re,te]=D.useState(null),[X,Fe]=D.useState(!1),[Ge,Xe]=D.useState(!1),[ar,cn]=D.useState(!1),[Or,Gn]=D.useState(!1),[wr,mr]=D.useState(!1),[Wa,ua]=D.useState(0),[Yn,ns]=D.useState(0),da=D.useRef(p.duration||L||Zh),ki=D.useRef(null),Kn=D.useRef(null),$c=w===0,Uc=w+1<=h,M=p.type,H=p.dismissible!==!1,ne=p.className||"",ce=p.descriptionClassName||"",he=D.useMemo(()=>v.findIndex(ae=>ae.toastId===p.id)||0,[v,p.id]),Ir=D.useMemo(()=>{var ae;return(ae=p.closeButton)!=null?ae:k},[p.closeButton,k]),Tn=D.useMemo(()=>p.duration||L||Zh,[p.duration,L]),Mr=D.useRef(0),Kr=D.useRef(0),ft=D.useRef(0),$e=D.useRef(null),[ht,un]=U.split("-"),Cf=D.useMemo(()=>v.reduce((ae,je,ze)=>ze>=he?ae:ae+je.height,0),[v,he]),Nf=yE(),O1=p.invert||f,Vc=M==="loading";Kr.current=D.useMemo(()=>he*Q+Cf,[he,Cf]),D.useEffect(()=>{da.current=Tn},[Tn]),D.useEffect(()=>{Fe(!0)},[]),D.useEffect(()=>{let ae=Kn.current;if(ae){let je=ae.getBoundingClientRect().height;return ns(je),b(ze=>[{toastId:p.id,height:je,position:p.position},...ze]),()=>b(ze=>ze.filter(dn=>dn.toastId!==p.id))}},[b,p.id]),D.useLayoutEffect(()=>{if(!X)return;let ae=Kn.current,je=ae.style.height;ae.style.height="auto";let ze=ae.getBoundingClientRect().height;ae.style.height=je,ns(ze),b(dn=>dn.find(mn=>mn.toastId===p.id)?dn.map(mn=>mn.toastId===p.id?{...mn,height:ze}:mn):[{toastId:p.id,height:ze,position:p.position},...dn])},[X,p.title,p.description,b,p.id]);let gt=D.useCallback(()=>{Xe(!0),ua(Kr.current),b(ae=>ae.filter(je=>je.toastId!==p.id)),setTimeout(()=>{N(p)},RE)},[p,N,b,Kr]);D.useEffect(()=>{if(p.promise&&M==="loading"||p.duration===1/0||p.type==="loading")return;let ae;return E||g||F&&Nf?(()=>{if(ft.current<Mr.current){let je=new Date().getTime()-Mr.current;da.current=da.current-je}ft.current=new Date().getTime()})():da.current!==1/0&&(Mr.current=new Date().getTime(),ae=setTimeout(()=>{var je;(je=p.onAutoClose)==null||je.call(p,p),gt()},da.current)),()=>clearTimeout(ae)},[E,g,p,M,F,Nf,gt]),D.useEffect(()=>{p.delete&&gt()},[gt,p.delete]);function I1(){var ae,je,ze;return S!=null&&S.loading?D.createElement("div",{className:hn(O==null?void 0:O.loader,(ae=p==null?void 0:p.classNames)==null?void 0:ae.loader,"sonner-loader"),"data-visible":M==="loading"},S.loading):R?D.createElement("div",{className:hn(O==null?void 0:O.loader,(je=p==null?void 0:p.classNames)==null?void 0:je.loader,"sonner-loader"),"data-visible":M==="loading"},R):D.createElement(pE,{className:hn(O==null?void 0:O.loader,(ze=p==null?void 0:p.classNames)==null?void 0:ze.loader),visible:M==="loading"})}return D.createElement("li",{tabIndex:0,ref:Kn,className:hn(_,ne,O==null?void 0:O.toast,(r=p==null?void 0:p.classNames)==null?void 0:r.toast,O==null?void 0:O.default,O==null?void 0:O[M],(n=p==null?void 0:p.classNames)==null?void 0:n[M]),"data-sonner-toast":"","data-rich-colors":(t=p.richColors)!=null?t:P,"data-styled":!(p.jsx||p.unstyled||y),"data-mounted":X,"data-promise":!!p.promise,"data-swiped":wr,"data-removed":Ge,"data-visible":Uc,"data-y-position":ht,"data-x-position":un,"data-index":w,"data-front":$c,"data-swiping":ar,"data-dismissible":H,"data-type":M,"data-invert":O1,"data-swipe-out":Or,"data-swipe-direction":re,"data-expanded":!!(E||q&&X),style:{"--index":w,"--toasts-before":w,"--z-index":j.length-w,"--offset":`${Ge?Wa:Kr.current}px`,"--initial-height":q?"auto":`${Yn}px`,...z,...p.style},onDragEnd:()=>{cn(!1),W(null),$e.current=null},onPointerDown:ae=>{Vc||!H||(ki.current=new Date,ua(Kr.current),ae.target.setPointerCapture(ae.pointerId),ae.target.tagName!=="BUTTON"&&(cn(!0),$e.current={x:ae.clientX,y:ae.clientY}))},onPointerUp:()=>{var ae,je,ze,dn;if(Or||!H)return;$e.current=null;let mn=Number(((ae=Kn.current)==null?void 0:ae.style.getPropertyValue("--swipe-amount-x").replace("px",""))||0),vt=Number(((je=Kn.current)==null?void 0:je.style.getPropertyValue("--swipe-amount-y").replace("px",""))||0),ma=new Date().getTime()-((ze=ki.current)==null?void 0:ze.getTime()),pn=C==="x"?mn:vt,xt=Math.abs(pn)/ma;if(Math.abs(pn)>=qE||xt>.11){ua(Kr.current),(dn=p.onDismiss)==null||dn.call(p,p),te(C==="x"?mn>0?"right":"left":vt>0?"down":"up"),gt(),Gn(!0),mr(!1);return}cn(!1),W(null)},onPointerMove:ae=>{var je,ze,dn,mn;if(!$e.current||!H||((je=window.getSelection())==null?void 0:je.toString().length)>0)return;let vt=ae.clientY-$e.current.y,ma=ae.clientX-$e.current.x,pn=(ze=e.swipeDirections)!=null?ze:_E(U);!C&&(Math.abs(ma)>1||Math.abs(vt)>1)&&W(Math.abs(ma)>Math.abs(vt)?"x":"y");let xt={x:0,y:0};C==="y"?(pn.includes("top")||pn.includes("bottom"))&&(pn.includes("top")&&vt<0||pn.includes("bottom")&&vt>0)&&(xt.y=vt):C==="x"&&(pn.includes("left")||pn.includes("right"))&&(pn.includes("left")&&ma<0||pn.includes("right")&&ma>0)&&(xt.x=ma),(Math.abs(xt.x)>0||Math.abs(xt.y)>0)&&mr(!0),(dn=Kn.current)==null||dn.style.setProperty("--swipe-amount-x",`${xt.x}px`),(mn=Kn.current)==null||mn.style.setProperty("--swipe-amount-y",`${xt.y}px`)}},Ir&&!p.jsx?D.createElement("button",{"aria-label":Y,"data-disabled":Vc,"data-close-button":!0,onClick:Vc||!H?()=>{}:()=>{var ae;gt(),(ae=p.onDismiss)==null||ae.call(p,p)},className:hn(O==null?void 0:O.closeButton,(a=p==null?void 0:p.classNames)==null?void 0:a.closeButton)},(o=S==null?void 0:S.close)!=null?o:xE):null,p.jsx||x.isValidElement(p.title)?p.jsx?p.jsx:typeof p.title=="function"?p.title():p.title:D.createElement(D.Fragment,null,M||p.icon||p.promise?D.createElement("div",{"data-icon":"",className:hn(O==null?void 0:O.icon,(s=p==null?void 0:p.classNames)==null?void 0:s.icon)},p.promise||p.type==="loading"&&!p.icon?p.icon||I1():null,p.type!=="loading"?p.icon||(S==null?void 0:S[M])||dE(M):null):null,D.createElement("div",{"data-content":"",className:hn(O==null?void 0:O.content,(l=p==null?void 0:p.classNames)==null?void 0:l.content)},D.createElement("div",{"data-title":"",className:hn(O==null?void 0:O.title,(c=p==null?void 0:p.classNames)==null?void 0:c.title)},typeof p.title=="function"?p.title():p.title),p.description?D.createElement("div",{"data-description":"",className:hn(V,ce,O==null?void 0:O.description,(u=p==null?void 0:p.classNames)==null?void 0:u.description)},typeof p.description=="function"?p.description():p.description):null),x.isValidElement(p.cancel)?p.cancel:p.cancel&&Gi(p.cancel)?D.createElement("button",{"data-button":!0,"data-cancel":!0,style:p.cancelButtonStyle||A,onClick:ae=>{var je,ze;Gi(p.cancel)&&H&&((ze=(je=p.cancel).onClick)==null||ze.call(je,ae),gt())},className:hn(O==null?void 0:O.cancelButton,(d=p==null?void 0:p.classNames)==null?void 0:d.cancelButton)},p.cancel.label):null,x.isValidElement(p.action)?p.action:p.action&&Gi(p.action)?D.createElement("button",{"data-button":!0,"data-action":!0,style:p.actionButtonStyle||I,onClick:ae=>{var je,ze;Gi(p.action)&&((ze=(je=p.action).onClick)==null||ze.call(je,ae),!ae.defaultPrevented&&gt())},className:hn(O==null?void 0:O.actionButton,(m=p==null?void 0:p.classNames)==null?void 0:m.actionButton)},p.action.label):null))};function eg(){if(typeof window>"u"||typeof document>"u")return"ltr";let e=document.documentElement.getAttribute("dir");return e==="auto"||!e?window.getComputedStyle(document.documentElement).direction:e}function IE(e,r){let n={};return[e,r].forEach((t,a)=>{let o=a===1,s=o?"--mobile-offset":"--offset",l=o?TE:PE;function c(u){["top","right","bottom","left"].forEach(d=>{n[`${s}-${d}`]=typeof u=="number"?`${u}px`:u})}typeof t=="number"||typeof t=="string"?c(t):typeof t=="object"?["top","right","bottom","left"].forEach(u=>{t[u]===void 0?n[`${s}-${u}`]=l:n[`${s}-${u}`]=typeof t[u]=="number"?`${t[u]}px`:t[u]}):c(l)}),n}var ME=x.forwardRef(function(e,r){let{invert:n,position:t="bottom-right",hotkey:a=["altKey","KeyT"],expand:o,closeButton:s,className:l,offset:c,mobileOffset:u,theme:d="light",richColors:m,duration:f,style:p,visibleToasts:y=kE,toastOptions:g,dir:b=eg(),gap:h=AE,loadingIcon:v,icons:w,containerAriaLabel:j="Notifications",pauseWhenPageIsHidden:E}=e,[N,P]=D.useState([]),k=D.useMemo(()=>Array.from(new Set([t].concat(N.filter(F=>F.position).map(F=>F.position)))),[N,t]),[z,A]=D.useState([]),[I,_]=D.useState(!1),[V,L]=D.useState(!1),[U,Q]=D.useState(d!=="system"?d:typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),R=D.useRef(null),q=a.join("+").replace(/Key/g,"").replace(/Digit/g,""),O=D.useRef(null),S=D.useRef(!1),Y=D.useCallback(F=>{P(C=>{var W;return(W=C.find(re=>re.id===F.id))!=null&&W.delete||Nr.dismiss(F.id),C.filter(({id:re})=>re!==F.id)})},[]);return D.useEffect(()=>Nr.subscribe(F=>{if(F.dismiss){P(C=>C.map(W=>W.id===F.id?{...W,delete:!0}:W));return}setTimeout(()=>{Jy.flushSync(()=>{P(C=>{let W=C.findIndex(re=>re.id===F.id);return W!==-1?[...C.slice(0,W),{...C[W],...F},...C.slice(W+1)]:[F,...C]})})})}),[]),D.useEffect(()=>{if(d!=="system"){Q(d);return}if(d==="system"&&(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?Q("dark"):Q("light")),typeof window>"u")return;let F=window.matchMedia("(prefers-color-scheme: dark)");try{F.addEventListener("change",({matches:C})=>{Q(C?"dark":"light")})}catch{F.addListener(({matches:W})=>{try{Q(W?"dark":"light")}catch(re){console.error(re)}})}},[d]),D.useEffect(()=>{N.length<=1&&_(!1)},[N]),D.useEffect(()=>{let F=C=>{var W,re;a.every(te=>C[te]||C.code===te)&&(_(!0),(W=R.current)==null||W.focus()),C.code==="Escape"&&(document.activeElement===R.current||(re=R.current)!=null&&re.contains(document.activeElement))&&_(!1)};return document.addEventListener("keydown",F),()=>document.removeEventListener("keydown",F)},[a]),D.useEffect(()=>{if(R.current)return()=>{O.current&&(O.current.focus({preventScroll:!0}),O.current=null,S.current=!1)}},[R.current]),D.createElement("section",{ref:r,"aria-label":`${j} ${q}`,tabIndex:-1,"aria-live":"polite","aria-relevant":"additions text","aria-atomic":"false",suppressHydrationWarning:!0},k.map((F,C)=>{var W;let[re,te]=F.split("-");return N.length?D.createElement("ol",{key:F,dir:b==="auto"?eg():b,tabIndex:-1,ref:R,className:l,"data-sonner-toaster":!0,"data-theme":U,"data-y-position":re,"data-lifted":I&&N.length>1&&!o,"data-x-position":te,style:{"--front-toast-height":`${((W=z[0])==null?void 0:W.height)||0}px`,"--width":`${zE}px`,"--gap":`${h}px`,...p,...IE(c,u)},onBlur:X=>{S.current&&!X.currentTarget.contains(X.relatedTarget)&&(S.current=!1,O.current&&(O.current.focus({preventScroll:!0}),O.current=null))},onFocus:X=>{X.target instanceof HTMLElement&&X.target.dataset.dismissible==="false"||S.current||(S.current=!0,O.current=X.relatedTarget)},onMouseEnter:()=>_(!0),onMouseMove:()=>_(!0),onMouseLeave:()=>{V||_(!1)},onDragEnd:()=>_(!1),onPointerDown:X=>{X.target instanceof HTMLElement&&X.target.dataset.dismissible==="false"||L(!0)},onPointerUp:()=>L(!1)},N.filter(X=>!X.position&&C===0||X.position===F).map((X,Fe)=>{var Ge,Xe;return D.createElement(OE,{key:X.id,icons:w,index:Fe,toast:X,defaultRichColors:m,duration:(Ge=g==null?void 0:g.duration)!=null?Ge:f,className:g==null?void 0:g.className,descriptionClassName:g==null?void 0:g.descriptionClassName,invert:n,visibleToasts:y,closeButton:(Xe=g==null?void 0:g.closeButton)!=null?Xe:s,interacting:V,position:F,style:g==null?void 0:g.style,unstyled:g==null?void 0:g.unstyled,classNames:g==null?void 0:g.classNames,cancelButtonStyle:g==null?void 0:g.cancelButtonStyle,actionButtonStyle:g==null?void 0:g.actionButtonStyle,removeToast:Y,toasts:N.filter(ar=>ar.position==X.position),heights:z.filter(ar=>ar.position==X.position),setHeights:A,expandByDefault:o,gap:h,loadingIcon:v,expanded:I,pauseWhenPageIsHidden:E,swipeDirections:e.swipeDirections})})):null}))});const LE=({...e})=>{const{theme:r="system"}=oE();return i.jsx(ME,{theme:r,className:"toaster group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})};var FE=qm[" useId ".trim().toString()]||(()=>{}),DE=0;function Hb(e){const[r,n]=x.useState(FE());return Nn(()=>{n(t=>t??String(DE++))},[e]),r?`radix-${r}`:""}const BE=["top","right","bottom","left"],ea=Math.min,$r=Math.max,Gl=Math.round,Yi=Math.floor,$n=e=>({x:e,y:e}),$E={left:"right",right:"left",bottom:"top",top:"bottom"},UE={start:"end",end:"start"};function Hd(e,r,n){return $r(e,ea(r,n))}function ut(e,r){return typeof e=="function"?e(r):e}function dt(e){return e.split("-")[0]}function Xo(e){return e.split("-")[1]}function Ap(e){return e==="x"?"y":"x"}function qp(e){return e==="y"?"height":"width"}const VE=new Set(["top","bottom"]);function Fn(e){return VE.has(dt(e))?"y":"x"}function Rp(e){return Ap(Fn(e))}function HE(e,r,n){n===void 0&&(n=!1);const t=Xo(e),a=Rp(e),o=qp(a);let s=a==="x"?t===(n?"end":"start")?"right":"left":t==="start"?"bottom":"top";return r.reference[o]>r.floating[o]&&(s=Yl(s)),[s,Yl(s)]}function QE(e){const r=Yl(e);return[Qd(e),r,Qd(r)]}function Qd(e){return e.replace(/start|end/g,r=>UE[r])}const rg=["left","right"],ng=["right","left"],WE=["top","bottom"],GE=["bottom","top"];function YE(e,r,n){switch(e){case"top":case"bottom":return n?r?ng:rg:r?rg:ng;case"left":case"right":return r?WE:GE;default:return[]}}function KE(e,r,n,t){const a=Xo(e);let o=YE(dt(e),n==="start",t);return a&&(o=o.map(s=>s+"-"+a),r&&(o=o.concat(o.map(Qd)))),o}function Yl(e){return e.replace(/left|right|bottom|top/g,r=>$E[r])}function XE(e){return{top:0,right:0,bottom:0,left:0,...e}}function Qb(e){return typeof e!="number"?XE(e):{top:e,right:e,bottom:e,left:e}}function Kl(e){const{x:r,y:n,width:t,height:a}=e;return{width:t,height:a,top:n,left:r,right:r+t,bottom:n+a,x:r,y:n}}function tg(e,r,n){let{reference:t,floating:a}=e;const o=Fn(r),s=Rp(r),l=qp(s),c=dt(r),u=o==="y",d=t.x+t.width/2-a.width/2,m=t.y+t.height/2-a.height/2,f=t[l]/2-a[l]/2;let p;switch(c){case"top":p={x:d,y:t.y-a.height};break;case"bottom":p={x:d,y:t.y+t.height};break;case"right":p={x:t.x+t.width,y:m};break;case"left":p={x:t.x-a.width,y:m};break;default:p={x:t.x,y:t.y}}switch(Xo(r)){case"start":p[s]-=f*(n&&u?-1:1);break;case"end":p[s]+=f*(n&&u?-1:1);break}return p}const JE=async(e,r,n)=>{const{placement:t="bottom",strategy:a="absolute",middleware:o=[],platform:s}=n,l=o.filter(Boolean),c=await(s.isRTL==null?void 0:s.isRTL(r));let u=await s.getElementRects({reference:e,floating:r,strategy:a}),{x:d,y:m}=tg(u,t,c),f=t,p={},y=0;for(let g=0;g<l.length;g++){const{name:b,fn:h}=l[g],{x:v,y:w,data:j,reset:E}=await h({x:d,y:m,initialPlacement:t,placement:f,strategy:a,middlewareData:p,rects:u,platform:s,elements:{reference:e,floating:r}});d=v??d,m=w??m,p={...p,[b]:{...p[b],...j}},E&&y<=50&&(y++,typeof E=="object"&&(E.placement&&(f=E.placement),E.rects&&(u=E.rects===!0?await s.getElementRects({reference:e,floating:r,strategy:a}):E.rects),{x:d,y:m}=tg(u,f,c)),g=-1)}return{x:d,y:m,placement:f,strategy:a,middlewareData:p}};async function ri(e,r){var n;r===void 0&&(r={});const{x:t,y:a,platform:o,rects:s,elements:l,strategy:c}=e,{boundary:u="clippingAncestors",rootBoundary:d="viewport",elementContext:m="floating",altBoundary:f=!1,padding:p=0}=ut(r,e),y=Qb(p),b=l[f?m==="floating"?"reference":"floating":m],h=Kl(await o.getClippingRect({element:(n=await(o.isElement==null?void 0:o.isElement(b)))==null||n?b:b.contextElement||await(o.getDocumentElement==null?void 0:o.getDocumentElement(l.floating)),boundary:u,rootBoundary:d,strategy:c})),v=m==="floating"?{x:t,y:a,width:s.floating.width,height:s.floating.height}:s.reference,w=await(o.getOffsetParent==null?void 0:o.getOffsetParent(l.floating)),j=await(o.isElement==null?void 0:o.isElement(w))?await(o.getScale==null?void 0:o.getScale(w))||{x:1,y:1}:{x:1,y:1},E=Kl(o.convertOffsetParentRelativeRectToViewportRelativeRect?await o.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:v,offsetParent:w,strategy:c}):v);return{top:(h.top-E.top+y.top)/j.y,bottom:(E.bottom-h.bottom+y.bottom)/j.y,left:(h.left-E.left+y.left)/j.x,right:(E.right-h.right+y.right)/j.x}}const ZE=e=>({name:"arrow",options:e,async fn(r){const{x:n,y:t,placement:a,rects:o,platform:s,elements:l,middlewareData:c}=r,{element:u,padding:d=0}=ut(e,r)||{};if(u==null)return{};const m=Qb(d),f={x:n,y:t},p=Rp(a),y=qp(p),g=await s.getDimensions(u),b=p==="y",h=b?"top":"left",v=b?"bottom":"right",w=b?"clientHeight":"clientWidth",j=o.reference[y]+o.reference[p]-f[p]-o.floating[y],E=f[p]-o.reference[p],N=await(s.getOffsetParent==null?void 0:s.getOffsetParent(u));let P=N?N[w]:0;(!P||!await(s.isElement==null?void 0:s.isElement(N)))&&(P=l.floating[w]||o.floating[y]);const k=j/2-E/2,z=P/2-g[y]/2-1,A=ea(m[h],z),I=ea(m[v],z),_=A,V=P-g[y]-I,L=P/2-g[y]/2+k,U=Hd(_,L,V),Q=!c.arrow&&Xo(a)!=null&&L!==U&&o.reference[y]/2-(L<_?A:I)-g[y]/2<0,R=Q?L<_?L-_:L-V:0;return{[p]:f[p]+R,data:{[p]:U,centerOffset:L-U-R,...Q&&{alignmentOffset:R}},reset:Q}}}),ek=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(r){var n,t;const{placement:a,middlewareData:o,rects:s,initialPlacement:l,platform:c,elements:u}=r,{mainAxis:d=!0,crossAxis:m=!0,fallbackPlacements:f,fallbackStrategy:p="bestFit",fallbackAxisSideDirection:y="none",flipAlignment:g=!0,...b}=ut(e,r);if((n=o.arrow)!=null&&n.alignmentOffset)return{};const h=dt(a),v=Fn(l),w=dt(l)===l,j=await(c.isRTL==null?void 0:c.isRTL(u.floating)),E=f||(w||!g?[Yl(l)]:QE(l)),N=y!=="none";!f&&N&&E.push(...KE(l,g,y,j));const P=[l,...E],k=await ri(r,b),z=[];let A=((t=o.flip)==null?void 0:t.overflows)||[];if(d&&z.push(k[h]),m){const L=HE(a,s,j);z.push(k[L[0]],k[L[1]])}if(A=[...A,{placement:a,overflows:z}],!z.every(L=>L<=0)){var I,_;const L=(((I=o.flip)==null?void 0:I.index)||0)+1,U=P[L];if(U&&(!(m==="alignment"?v!==Fn(U):!1)||A.every(q=>q.overflows[0]>0&&Fn(q.placement)===v)))return{data:{index:L,overflows:A},reset:{placement:U}};let Q=(_=A.filter(R=>R.overflows[0]<=0).sort((R,q)=>R.overflows[1]-q.overflows[1])[0])==null?void 0:_.placement;if(!Q)switch(p){case"bestFit":{var V;const R=(V=A.filter(q=>{if(N){const O=Fn(q.placement);return O===v||O==="y"}return!0}).map(q=>[q.placement,q.overflows.filter(O=>O>0).reduce((O,S)=>O+S,0)]).sort((q,O)=>q[1]-O[1])[0])==null?void 0:V[0];R&&(Q=R);break}case"initialPlacement":Q=l;break}if(a!==Q)return{reset:{placement:Q}}}return{}}}};function ag(e,r){return{top:e.top-r.height,right:e.right-r.width,bottom:e.bottom-r.height,left:e.left-r.width}}function og(e){return BE.some(r=>e[r]>=0)}const rk=function(e){return e===void 0&&(e={}),{name:"hide",options:e,async fn(r){const{rects:n}=r,{strategy:t="referenceHidden",...a}=ut(e,r);switch(t){case"referenceHidden":{const o=await ri(r,{...a,elementContext:"reference"}),s=ag(o,n.reference);return{data:{referenceHiddenOffsets:s,referenceHidden:og(s)}}}case"escaped":{const o=await ri(r,{...a,altBoundary:!0}),s=ag(o,n.floating);return{data:{escapedOffsets:s,escaped:og(s)}}}default:return{}}}}},Wb=new Set(["left","top"]);async function nk(e,r){const{placement:n,platform:t,elements:a}=e,o=await(t.isRTL==null?void 0:t.isRTL(a.floating)),s=dt(n),l=Xo(n),c=Fn(n)==="y",u=Wb.has(s)?-1:1,d=o&&c?-1:1,m=ut(r,e);let{mainAxis:f,crossAxis:p,alignmentAxis:y}=typeof m=="number"?{mainAxis:m,crossAxis:0,alignmentAxis:null}:{mainAxis:m.mainAxis||0,crossAxis:m.crossAxis||0,alignmentAxis:m.alignmentAxis};return l&&typeof y=="number"&&(p=l==="end"?y*-1:y),c?{x:p*d,y:f*u}:{x:f*u,y:p*d}}const tk=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(r){var n,t;const{x:a,y:o,placement:s,middlewareData:l}=r,c=await nk(r,e);return s===((n=l.offset)==null?void 0:n.placement)&&(t=l.arrow)!=null&&t.alignmentOffset?{}:{x:a+c.x,y:o+c.y,data:{...c,placement:s}}}}},ak=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(r){const{x:n,y:t,placement:a}=r,{mainAxis:o=!0,crossAxis:s=!1,limiter:l={fn:b=>{let{x:h,y:v}=b;return{x:h,y:v}}},...c}=ut(e,r),u={x:n,y:t},d=await ri(r,c),m=Fn(dt(a)),f=Ap(m);let p=u[f],y=u[m];if(o){const b=f==="y"?"top":"left",h=f==="y"?"bottom":"right",v=p+d[b],w=p-d[h];p=Hd(v,p,w)}if(s){const b=m==="y"?"top":"left",h=m==="y"?"bottom":"right",v=y+d[b],w=y-d[h];y=Hd(v,y,w)}const g=l.fn({...r,[f]:p,[m]:y});return{...g,data:{x:g.x-n,y:g.y-t,enabled:{[f]:o,[m]:s}}}}}},ok=function(e){return e===void 0&&(e={}),{options:e,fn(r){const{x:n,y:t,placement:a,rects:o,middlewareData:s}=r,{offset:l=0,mainAxis:c=!0,crossAxis:u=!0}=ut(e,r),d={x:n,y:t},m=Fn(a),f=Ap(m);let p=d[f],y=d[m];const g=ut(l,r),b=typeof g=="number"?{mainAxis:g,crossAxis:0}:{mainAxis:0,crossAxis:0,...g};if(c){const w=f==="y"?"height":"width",j=o.reference[f]-o.floating[w]+b.mainAxis,E=o.reference[f]+o.reference[w]-b.mainAxis;p<j?p=j:p>E&&(p=E)}if(u){var h,v;const w=f==="y"?"width":"height",j=Wb.has(dt(a)),E=o.reference[m]-o.floating[w]+(j&&((h=s.offset)==null?void 0:h[m])||0)+(j?0:b.crossAxis),N=o.reference[m]+o.reference[w]+(j?0:((v=s.offset)==null?void 0:v[m])||0)-(j?b.crossAxis:0);y<E?y=E:y>N&&(y=N)}return{[f]:p,[m]:y}}}},sk=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(r){var n,t;const{placement:a,rects:o,platform:s,elements:l}=r,{apply:c=()=>{},...u}=ut(e,r),d=await ri(r,u),m=dt(a),f=Xo(a),p=Fn(a)==="y",{width:y,height:g}=o.floating;let b,h;m==="top"||m==="bottom"?(b=m,h=f===(await(s.isRTL==null?void 0:s.isRTL(l.floating))?"start":"end")?"left":"right"):(h=m,b=f==="end"?"top":"bottom");const v=g-d.top-d.bottom,w=y-d.left-d.right,j=ea(g-d[b],v),E=ea(y-d[h],w),N=!r.middlewareData.shift;let P=j,k=E;if((n=r.middlewareData.shift)!=null&&n.enabled.x&&(k=w),(t=r.middlewareData.shift)!=null&&t.enabled.y&&(P=v),N&&!f){const A=$r(d.left,0),I=$r(d.right,0),_=$r(d.top,0),V=$r(d.bottom,0);p?k=y-2*(A!==0||I!==0?A+I:$r(d.left,d.right)):P=g-2*(_!==0||V!==0?_+V:$r(d.top,d.bottom))}await c({...r,availableWidth:k,availableHeight:P});const z=await s.getDimensions(l.floating);return y!==z.width||g!==z.height?{reset:{rects:!0}}:{}}}};function Ec(){return typeof window<"u"}function Jo(e){return Gb(e)?(e.nodeName||"").toLowerCase():"#document"}function Qr(e){var r;return(e==null||(r=e.ownerDocument)==null?void 0:r.defaultView)||window}function Qn(e){var r;return(r=(Gb(e)?e.ownerDocument:e.document)||window.document)==null?void 0:r.documentElement}function Gb(e){return Ec()?e instanceof Node||e instanceof Qr(e).Node:!1}function En(e){return Ec()?e instanceof Element||e instanceof Qr(e).Element:!1}function Vn(e){return Ec()?e instanceof HTMLElement||e instanceof Qr(e).HTMLElement:!1}function sg(e){return!Ec()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof Qr(e).ShadowRoot}const ik=new Set(["inline","contents"]);function wi(e){const{overflow:r,overflowX:n,overflowY:t,display:a}=kn(e);return/auto|scroll|overlay|hidden|clip/.test(r+t+n)&&!ik.has(a)}const lk=new Set(["table","td","th"]);function ck(e){return lk.has(Jo(e))}const uk=[":popover-open",":modal"];function kc(e){return uk.some(r=>{try{return e.matches(r)}catch{return!1}})}const dk=["transform","translate","scale","rotate","perspective"],mk=["transform","translate","scale","rotate","perspective","filter"],pk=["paint","layout","strict","content"];function _p(e){const r=Op(),n=En(e)?kn(e):e;return dk.some(t=>n[t]?n[t]!=="none":!1)||(n.containerType?n.containerType!=="normal":!1)||!r&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!r&&(n.filter?n.filter!=="none":!1)||mk.some(t=>(n.willChange||"").includes(t))||pk.some(t=>(n.contain||"").includes(t))}function fk(e){let r=ra(e);for(;Vn(r)&&!Vo(r);){if(_p(r))return r;if(kc(r))return null;r=ra(r)}return null}function Op(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const hk=new Set(["html","body","#document"]);function Vo(e){return hk.has(Jo(e))}function kn(e){return Qr(e).getComputedStyle(e)}function Pc(e){return En(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function ra(e){if(Jo(e)==="html")return e;const r=e.assignedSlot||e.parentNode||sg(e)&&e.host||Qn(e);return sg(r)?r.host:r}function Yb(e){const r=ra(e);return Vo(r)?e.ownerDocument?e.ownerDocument.body:e.body:Vn(r)&&wi(r)?r:Yb(r)}function ni(e,r,n){var t;r===void 0&&(r=[]),n===void 0&&(n=!0);const a=Yb(e),o=a===((t=e.ownerDocument)==null?void 0:t.body),s=Qr(a);if(o){const l=Wd(s);return r.concat(s,s.visualViewport||[],wi(a)?a:[],l&&n?ni(l):[])}return r.concat(a,ni(a,[],n))}function Wd(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Kb(e){const r=kn(e);let n=parseFloat(r.width)||0,t=parseFloat(r.height)||0;const a=Vn(e),o=a?e.offsetWidth:n,s=a?e.offsetHeight:t,l=Gl(n)!==o||Gl(t)!==s;return l&&(n=o,t=s),{width:n,height:t,$:l}}function Ip(e){return En(e)?e:e.contextElement}function yo(e){const r=Ip(e);if(!Vn(r))return $n(1);const n=r.getBoundingClientRect(),{width:t,height:a,$:o}=Kb(r);let s=(o?Gl(n.width):n.width)/t,l=(o?Gl(n.height):n.height)/a;return(!s||!Number.isFinite(s))&&(s=1),(!l||!Number.isFinite(l))&&(l=1),{x:s,y:l}}const gk=$n(0);function Xb(e){const r=Qr(e);return!Op()||!r.visualViewport?gk:{x:r.visualViewport.offsetLeft,y:r.visualViewport.offsetTop}}function vk(e,r,n){return r===void 0&&(r=!1),!n||r&&n!==Qr(e)?!1:r}function Da(e,r,n,t){r===void 0&&(r=!1),n===void 0&&(n=!1);const a=e.getBoundingClientRect(),o=Ip(e);let s=$n(1);r&&(t?En(t)&&(s=yo(t)):s=yo(e));const l=vk(o,n,t)?Xb(o):$n(0);let c=(a.left+l.x)/s.x,u=(a.top+l.y)/s.y,d=a.width/s.x,m=a.height/s.y;if(o){const f=Qr(o),p=t&&En(t)?Qr(t):t;let y=f,g=Wd(y);for(;g&&t&&p!==y;){const b=yo(g),h=g.getBoundingClientRect(),v=kn(g),w=h.left+(g.clientLeft+parseFloat(v.paddingLeft))*b.x,j=h.top+(g.clientTop+parseFloat(v.paddingTop))*b.y;c*=b.x,u*=b.y,d*=b.x,m*=b.y,c+=w,u+=j,y=Qr(g),g=Wd(y)}}return Kl({width:d,height:m,x:c,y:u})}function Mp(e,r){const n=Pc(e).scrollLeft;return r?r.left+n:Da(Qn(e)).left+n}function Jb(e,r,n){n===void 0&&(n=!1);const t=e.getBoundingClientRect(),a=t.left+r.scrollLeft-(n?0:Mp(e,t)),o=t.top+r.scrollTop;return{x:a,y:o}}function xk(e){let{elements:r,rect:n,offsetParent:t,strategy:a}=e;const o=a==="fixed",s=Qn(t),l=r?kc(r.floating):!1;if(t===s||l&&o)return n;let c={scrollLeft:0,scrollTop:0},u=$n(1);const d=$n(0),m=Vn(t);if((m||!m&&!o)&&((Jo(t)!=="body"||wi(s))&&(c=Pc(t)),Vn(t))){const p=Da(t);u=yo(t),d.x=p.x+t.clientLeft,d.y=p.y+t.clientTop}const f=s&&!m&&!o?Jb(s,c,!0):$n(0);return{width:n.width*u.x,height:n.height*u.y,x:n.x*u.x-c.scrollLeft*u.x+d.x+f.x,y:n.y*u.y-c.scrollTop*u.y+d.y+f.y}}function yk(e){return Array.from(e.getClientRects())}function bk(e){const r=Qn(e),n=Pc(e),t=e.ownerDocument.body,a=$r(r.scrollWidth,r.clientWidth,t.scrollWidth,t.clientWidth),o=$r(r.scrollHeight,r.clientHeight,t.scrollHeight,t.clientHeight);let s=-n.scrollLeft+Mp(e);const l=-n.scrollTop;return kn(t).direction==="rtl"&&(s+=$r(r.clientWidth,t.clientWidth)-a),{width:a,height:o,x:s,y:l}}function wk(e,r){const n=Qr(e),t=Qn(e),a=n.visualViewport;let o=t.clientWidth,s=t.clientHeight,l=0,c=0;if(a){o=a.width,s=a.height;const u=Op();(!u||u&&r==="fixed")&&(l=a.offsetLeft,c=a.offsetTop)}return{width:o,height:s,x:l,y:c}}const jk=new Set(["absolute","fixed"]);function Sk(e,r){const n=Da(e,!0,r==="fixed"),t=n.top+e.clientTop,a=n.left+e.clientLeft,o=Vn(e)?yo(e):$n(1),s=e.clientWidth*o.x,l=e.clientHeight*o.y,c=a*o.x,u=t*o.y;return{width:s,height:l,x:c,y:u}}function ig(e,r,n){let t;if(r==="viewport")t=wk(e,n);else if(r==="document")t=bk(Qn(e));else if(En(r))t=Sk(r,n);else{const a=Xb(e);t={x:r.x-a.x,y:r.y-a.y,width:r.width,height:r.height}}return Kl(t)}function Zb(e,r){const n=ra(e);return n===r||!En(n)||Vo(n)?!1:kn(n).position==="fixed"||Zb(n,r)}function Ck(e,r){const n=r.get(e);if(n)return n;let t=ni(e,[],!1).filter(l=>En(l)&&Jo(l)!=="body"),a=null;const o=kn(e).position==="fixed";let s=o?ra(e):e;for(;En(s)&&!Vo(s);){const l=kn(s),c=_p(s);!c&&l.position==="fixed"&&(a=null),(o?!c&&!a:!c&&l.position==="static"&&!!a&&jk.has(a.position)||wi(s)&&!c&&Zb(e,s))?t=t.filter(d=>d!==s):a=l,s=ra(s)}return r.set(e,t),t}function Nk(e){let{element:r,boundary:n,rootBoundary:t,strategy:a}=e;const s=[...n==="clippingAncestors"?kc(r)?[]:Ck(r,this._c):[].concat(n),t],l=s[0],c=s.reduce((u,d)=>{const m=ig(r,d,a);return u.top=$r(m.top,u.top),u.right=ea(m.right,u.right),u.bottom=ea(m.bottom,u.bottom),u.left=$r(m.left,u.left),u},ig(r,l,a));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function Ek(e){const{width:r,height:n}=Kb(e);return{width:r,height:n}}function kk(e,r,n){const t=Vn(r),a=Qn(r),o=n==="fixed",s=Da(e,!0,o,r);let l={scrollLeft:0,scrollTop:0};const c=$n(0);function u(){c.x=Mp(a)}if(t||!t&&!o)if((Jo(r)!=="body"||wi(a))&&(l=Pc(r)),t){const p=Da(r,!0,o,r);c.x=p.x+r.clientLeft,c.y=p.y+r.clientTop}else a&&u();o&&!t&&a&&u();const d=a&&!t&&!o?Jb(a,l):$n(0),m=s.left+l.scrollLeft-c.x-d.x,f=s.top+l.scrollTop-c.y-d.y;return{x:m,y:f,width:s.width,height:s.height}}function Eu(e){return kn(e).position==="static"}function lg(e,r){if(!Vn(e)||kn(e).position==="fixed")return null;if(r)return r(e);let n=e.offsetParent;return Qn(e)===n&&(n=n.ownerDocument.body),n}function e0(e,r){const n=Qr(e);if(kc(e))return n;if(!Vn(e)){let a=ra(e);for(;a&&!Vo(a);){if(En(a)&&!Eu(a))return a;a=ra(a)}return n}let t=lg(e,r);for(;t&&ck(t)&&Eu(t);)t=lg(t,r);return t&&Vo(t)&&Eu(t)&&!_p(t)?n:t||fk(e)||n}const Pk=async function(e){const r=this.getOffsetParent||e0,n=this.getDimensions,t=await n(e.floating);return{reference:kk(e.reference,await r(e.floating),e.strategy),floating:{x:0,y:0,width:t.width,height:t.height}}};function Tk(e){return kn(e).direction==="rtl"}const zk={convertOffsetParentRelativeRectToViewportRelativeRect:xk,getDocumentElement:Qn,getClippingRect:Nk,getOffsetParent:e0,getElementRects:Pk,getClientRects:yk,getDimensions:Ek,getScale:yo,isElement:En,isRTL:Tk};function r0(e,r){return e.x===r.x&&e.y===r.y&&e.width===r.width&&e.height===r.height}function Ak(e,r){let n=null,t;const a=Qn(e);function o(){var l;clearTimeout(t),(l=n)==null||l.disconnect(),n=null}function s(l,c){l===void 0&&(l=!1),c===void 0&&(c=1),o();const u=e.getBoundingClientRect(),{left:d,top:m,width:f,height:p}=u;if(l||r(),!f||!p)return;const y=Yi(m),g=Yi(a.clientWidth-(d+f)),b=Yi(a.clientHeight-(m+p)),h=Yi(d),w={rootMargin:-y+"px "+-g+"px "+-b+"px "+-h+"px",threshold:$r(0,ea(1,c))||1};let j=!0;function E(N){const P=N[0].intersectionRatio;if(P!==c){if(!j)return s();P?s(!1,P):t=setTimeout(()=>{s(!1,1e-7)},1e3)}P===1&&!r0(u,e.getBoundingClientRect())&&s(),j=!1}try{n=new IntersectionObserver(E,{...w,root:a.ownerDocument})}catch{n=new IntersectionObserver(E,w)}n.observe(e)}return s(!0),o}function qk(e,r,n,t){t===void 0&&(t={});const{ancestorScroll:a=!0,ancestorResize:o=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:c=!1}=t,u=Ip(e),d=a||o?[...u?ni(u):[],...ni(r)]:[];d.forEach(h=>{a&&h.addEventListener("scroll",n,{passive:!0}),o&&h.addEventListener("resize",n)});const m=u&&l?Ak(u,n):null;let f=-1,p=null;s&&(p=new ResizeObserver(h=>{let[v]=h;v&&v.target===u&&p&&(p.unobserve(r),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var w;(w=p)==null||w.observe(r)})),n()}),u&&!c&&p.observe(u),p.observe(r));let y,g=c?Da(e):null;c&&b();function b(){const h=Da(e);g&&!r0(g,h)&&n(),g=h,y=requestAnimationFrame(b)}return n(),()=>{var h;d.forEach(v=>{a&&v.removeEventListener("scroll",n),o&&v.removeEventListener("resize",n)}),m==null||m(),(h=p)==null||h.disconnect(),p=null,c&&cancelAnimationFrame(y)}}const Rk=tk,_k=ak,Ok=ek,Ik=sk,Mk=rk,cg=ZE,Lk=ok,Fk=(e,r,n)=>{const t=new Map,a={platform:zk,...n},o={...a.platform,_c:t};return JE(e,r,{...a,platform:o})};var Dk=typeof document<"u",Bk=function(){},gl=Dk?x.useLayoutEffect:Bk;function Xl(e,r){if(e===r)return!0;if(typeof e!=typeof r)return!1;if(typeof e=="function"&&e.toString()===r.toString())return!0;let n,t,a;if(e&&r&&typeof e=="object"){if(Array.isArray(e)){if(n=e.length,n!==r.length)return!1;for(t=n;t--!==0;)if(!Xl(e[t],r[t]))return!1;return!0}if(a=Object.keys(e),n=a.length,n!==Object.keys(r).length)return!1;for(t=n;t--!==0;)if(!{}.hasOwnProperty.call(r,a[t]))return!1;for(t=n;t--!==0;){const o=a[t];if(!(o==="_owner"&&e.$$typeof)&&!Xl(e[o],r[o]))return!1}return!0}return e!==e&&r!==r}function n0(e){return typeof window>"u"?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function ug(e,r){const n=n0(e);return Math.round(r*n)/n}function ku(e){const r=x.useRef(e);return gl(()=>{r.current=e}),r}function $k(e){e===void 0&&(e={});const{placement:r="bottom",strategy:n="absolute",middleware:t=[],platform:a,elements:{reference:o,floating:s}={},transform:l=!0,whileElementsMounted:c,open:u}=e,[d,m]=x.useState({x:0,y:0,strategy:n,placement:r,middlewareData:{},isPositioned:!1}),[f,p]=x.useState(t);Xl(f,t)||p(t);const[y,g]=x.useState(null),[b,h]=x.useState(null),v=x.useCallback(q=>{q!==N.current&&(N.current=q,g(q))},[]),w=x.useCallback(q=>{q!==P.current&&(P.current=q,h(q))},[]),j=o||y,E=s||b,N=x.useRef(null),P=x.useRef(null),k=x.useRef(d),z=c!=null,A=ku(c),I=ku(a),_=ku(u),V=x.useCallback(()=>{if(!N.current||!P.current)return;const q={placement:r,strategy:n,middleware:f};I.current&&(q.platform=I.current),Fk(N.current,P.current,q).then(O=>{const S={...O,isPositioned:_.current!==!1};L.current&&!Xl(k.current,S)&&(k.current=S,xi.flushSync(()=>{m(S)}))})},[f,r,n,I,_]);gl(()=>{u===!1&&k.current.isPositioned&&(k.current.isPositioned=!1,m(q=>({...q,isPositioned:!1})))},[u]);const L=x.useRef(!1);gl(()=>(L.current=!0,()=>{L.current=!1}),[]),gl(()=>{if(j&&(N.current=j),E&&(P.current=E),j&&E){if(A.current)return A.current(j,E,V);V()}},[j,E,V,A,z]);const U=x.useMemo(()=>({reference:N,floating:P,setReference:v,setFloating:w}),[v,w]),Q=x.useMemo(()=>({reference:j,floating:E}),[j,E]),R=x.useMemo(()=>{const q={position:n,left:0,top:0};if(!Q.floating)return q;const O=ug(Q.floating,d.x),S=ug(Q.floating,d.y);return l?{...q,transform:"translate("+O+"px, "+S+"px)",...n0(Q.floating)>=1.5&&{willChange:"transform"}}:{position:n,left:O,top:S}},[n,l,Q.floating,d.x,d.y]);return x.useMemo(()=>({...d,update:V,refs:U,elements:Q,floatingStyles:R}),[d,V,U,Q,R])}const Uk=e=>{function r(n){return{}.hasOwnProperty.call(n,"current")}return{name:"arrow",options:e,fn(n){const{element:t,padding:a}=typeof e=="function"?e(n):e;return t&&r(t)?t.current!=null?cg({element:t.current,padding:a}).fn(n):{}:t?cg({element:t,padding:a}).fn(n):{}}}},Vk=(e,r)=>({...Rk(e),options:[e,r]}),Hk=(e,r)=>({..._k(e),options:[e,r]}),Qk=(e,r)=>({...Lk(e),options:[e,r]}),Wk=(e,r)=>({...Ok(e),options:[e,r]}),Gk=(e,r)=>({...Ik(e),options:[e,r]}),Yk=(e,r)=>({...Mk(e),options:[e,r]}),Kk=(e,r)=>({...Uk(e),options:[e,r]});var Xk="Arrow",t0=x.forwardRef((e,r)=>{const{children:n,width:t=10,height:a=5,...o}=e;return i.jsx(we.svg,{...o,ref:r,width:t,height:a,viewBox:"0 0 30 10",preserveAspectRatio:"none",children:e.asChild?n:i.jsx("polygon",{points:"0,0 30,0 15,10"})})});t0.displayName=Xk;var Jk=t0;function a0(e){const[r,n]=x.useState(void 0);return Nn(()=>{if(e){n({width:e.offsetWidth,height:e.offsetHeight});const t=new ResizeObserver(a=>{if(!Array.isArray(a)||!a.length)return;const o=a[0];let s,l;if("borderBoxSize"in o){const c=o.borderBoxSize,u=Array.isArray(c)?c[0]:c;s=u.inlineSize,l=u.blockSize}else s=e.offsetWidth,l=e.offsetHeight;n({width:s,height:l})});return t.observe(e,{box:"border-box"}),()=>t.unobserve(e)}else n(void 0)},[e]),r}var o0="Popper",[s0,i0]=sa(o0),[m3,l0]=s0(o0),c0="PopperAnchor",u0=x.forwardRef((e,r)=>{const{__scopePopper:n,virtualRef:t,...a}=e,o=l0(c0,n),s=x.useRef(null),l=Be(r,s);return x.useEffect(()=>{o.onAnchorChange((t==null?void 0:t.current)||s.current)}),t?null:i.jsx(we.div,{...a,ref:l})});u0.displayName=c0;var Lp="PopperContent",[Zk,e2]=s0(Lp),d0=x.forwardRef((e,r)=>{var X,Fe,Ge,Xe,ar,cn;const{__scopePopper:n,side:t="bottom",sideOffset:a=0,align:o="center",alignOffset:s=0,arrowPadding:l=0,avoidCollisions:c=!0,collisionBoundary:u=[],collisionPadding:d=0,sticky:m="partial",hideWhenDetached:f=!1,updatePositionStrategy:p="optimized",onPlaced:y,...g}=e,b=l0(Lp,n),[h,v]=x.useState(null),w=Be(r,Or=>v(Or)),[j,E]=x.useState(null),N=a0(j),P=(N==null?void 0:N.width)??0,k=(N==null?void 0:N.height)??0,z=t+(o!=="center"?"-"+o:""),A=typeof d=="number"?d:{top:0,right:0,bottom:0,left:0,...d},I=Array.isArray(u)?u:[u],_=I.length>0,V={padding:A,boundary:I.filter(n2),altBoundary:_},{refs:L,floatingStyles:U,placement:Q,isPositioned:R,middlewareData:q}=$k({strategy:"fixed",placement:z,whileElementsMounted:(...Or)=>qk(...Or,{animationFrame:p==="always"}),elements:{reference:b.anchor},middleware:[Vk({mainAxis:a+k,alignmentAxis:s}),c&&Hk({mainAxis:!0,crossAxis:!1,limiter:m==="partial"?Qk():void 0,...V}),c&&Wk({...V}),Gk({...V,apply:({elements:Or,rects:Gn,availableWidth:wr,availableHeight:mr})=>{const{width:Wa,height:ua}=Gn.reference,Yn=Or.floating.style;Yn.setProperty("--radix-popper-available-width",`${wr}px`),Yn.setProperty("--radix-popper-available-height",`${mr}px`),Yn.setProperty("--radix-popper-anchor-width",`${Wa}px`),Yn.setProperty("--radix-popper-anchor-height",`${ua}px`)}}),j&&Kk({element:j,padding:l}),t2({arrowWidth:P,arrowHeight:k}),f&&Yk({strategy:"referenceHidden",...V})]}),[O,S]=f0(Q),Y=vr(y);Nn(()=>{R&&(Y==null||Y())},[R,Y]);const F=(X=q.arrow)==null?void 0:X.x,C=(Fe=q.arrow)==null?void 0:Fe.y,W=((Ge=q.arrow)==null?void 0:Ge.centerOffset)!==0,[re,te]=x.useState();return Nn(()=>{h&&te(window.getComputedStyle(h).zIndex)},[h]),i.jsx("div",{ref:L.setFloating,"data-radix-popper-content-wrapper":"",style:{...U,transform:R?U.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:re,"--radix-popper-transform-origin":[(Xe=q.transformOrigin)==null?void 0:Xe.x,(ar=q.transformOrigin)==null?void 0:ar.y].join(" "),...((cn=q.hide)==null?void 0:cn.referenceHidden)&&{visibility:"hidden",pointerEvents:"none"}},dir:e.dir,children:i.jsx(Zk,{scope:n,placedSide:O,onArrowChange:E,arrowX:F,arrowY:C,shouldHideArrow:W,children:i.jsx(we.div,{"data-side":O,"data-align":S,...g,ref:w,style:{...g.style,animation:R?void 0:"none"}})})})});d0.displayName=Lp;var m0="PopperArrow",r2={top:"bottom",right:"left",bottom:"top",left:"right"},p0=x.forwardRef(function(r,n){const{__scopePopper:t,...a}=r,o=e2(m0,t),s=r2[o.placedSide];return i.jsx("span",{ref:o.onArrowChange,style:{position:"absolute",left:o.arrowX,top:o.arrowY,[s]:0,transformOrigin:{top:"",right:"0 0",bottom:"center 0",left:"100% 0"}[o.placedSide],transform:{top:"translateY(100%)",right:"translateY(50%) rotate(90deg) translateX(-50%)",bottom:"rotate(180deg)",left:"translateY(50%) rotate(-90deg) translateX(50%)"}[o.placedSide],visibility:o.shouldHideArrow?"hidden":void 0},children:i.jsx(Jk,{...a,ref:n,style:{...a.style,display:"block"}})})});p0.displayName=m0;function n2(e){return e!==null}var t2=e=>({name:"transformOrigin",options:e,fn(r){var b,h,v;const{placement:n,rects:t,middlewareData:a}=r,s=((b=a.arrow)==null?void 0:b.centerOffset)!==0,l=s?0:e.arrowWidth,c=s?0:e.arrowHeight,[u,d]=f0(n),m={start:"0%",center:"50%",end:"100%"}[d],f=(((h=a.arrow)==null?void 0:h.x)??0)+l/2,p=(((v=a.arrow)==null?void 0:v.y)??0)+c/2;let y="",g="";return u==="bottom"?(y=s?m:`${f}px`,g=`${-c}px`):u==="top"?(y=s?m:`${f}px`,g=`${t.floating.height+c}px`):u==="right"?(y=`${-c}px`,g=s?m:`${p}px`):u==="left"&&(y=`${t.floating.width+c}px`,g=s?m:`${p}px`),{data:{x:y,y:g}}}});function f0(e){const[r,n="center"]=e.split("-");return[r,n]}var a2=u0,o2=d0,s2=p0,[Tc,p3]=sa("Tooltip",[i0]),Fp=i0(),h0="TooltipProvider",i2=700,dg="tooltip.open",[l2,g0]=Tc(h0),v0=e=>{const{__scopeTooltip:r,delayDuration:n=i2,skipDelayDuration:t=300,disableHoverableContent:a=!1,children:o}=e,s=x.useRef(!0),l=x.useRef(!1),c=x.useRef(0);return x.useEffect(()=>{const u=c.current;return()=>window.clearTimeout(u)},[]),i.jsx(l2,{scope:r,isOpenDelayedRef:s,delayDuration:n,onOpen:x.useCallback(()=>{window.clearTimeout(c.current),s.current=!1},[]),onClose:x.useCallback(()=>{window.clearTimeout(c.current),c.current=window.setTimeout(()=>s.current=!0,t)},[t]),isPointerInTransitRef:l,onPointerInTransitChange:x.useCallback(u=>{l.current=u},[]),disableHoverableContent:a,children:o})};v0.displayName=h0;var x0="Tooltip",[f3,zc]=Tc(x0),Gd="TooltipTrigger",c2=x.forwardRef((e,r)=>{const{__scopeTooltip:n,...t}=e,a=zc(Gd,n),o=g0(Gd,n),s=Fp(n),l=x.useRef(null),c=Be(r,l,a.onTriggerChange),u=x.useRef(!1),d=x.useRef(!1),m=x.useCallback(()=>u.current=!1,[]);return x.useEffect(()=>()=>document.removeEventListener("pointerup",m),[m]),i.jsx(a2,{asChild:!0,...s,children:i.jsx(we.button,{"aria-describedby":a.open?a.contentId:void 0,"data-state":a.stateAttribute,...t,ref:c,onPointerMove:xe(e.onPointerMove,f=>{f.pointerType!=="touch"&&!d.current&&!o.isPointerInTransitRef.current&&(a.onTriggerEnter(),d.current=!0)}),onPointerLeave:xe(e.onPointerLeave,()=>{a.onTriggerLeave(),d.current=!1}),onPointerDown:xe(e.onPointerDown,()=>{a.open&&a.onClose(),u.current=!0,document.addEventListener("pointerup",m,{once:!0})}),onFocus:xe(e.onFocus,()=>{u.current||a.onOpen()}),onBlur:xe(e.onBlur,a.onClose),onClick:xe(e.onClick,a.onClose)})})});c2.displayName=Gd;var u2="TooltipPortal",[h3,d2]=Tc(u2,{forceMount:void 0}),Ho="TooltipContent",y0=x.forwardRef((e,r)=>{const n=d2(Ho,e.__scopeTooltip),{forceMount:t=n.forceMount,side:a="top",...o}=e,s=zc(Ho,e.__scopeTooltip);return i.jsx(pt,{present:t||s.open,children:s.disableHoverableContent?i.jsx(b0,{side:a,...o,ref:r}):i.jsx(m2,{side:a,...o,ref:r})})}),m2=x.forwardRef((e,r)=>{const n=zc(Ho,e.__scopeTooltip),t=g0(Ho,e.__scopeTooltip),a=x.useRef(null),o=Be(r,a),[s,l]=x.useState(null),{trigger:c,onClose:u}=n,d=a.current,{onPointerInTransitChange:m}=t,f=x.useCallback(()=>{l(null),m(!1)},[m]),p=x.useCallback((y,g)=>{const b=y.currentTarget,h={x:y.clientX,y:y.clientY},v=v2(h,b.getBoundingClientRect()),w=x2(h,v),j=y2(g.getBoundingClientRect()),E=w2([...w,...j]);l(E),m(!0)},[m]);return x.useEffect(()=>()=>f(),[f]),x.useEffect(()=>{if(c&&d){const y=b=>p(b,d),g=b=>p(b,c);return c.addEventListener("pointerleave",y),d.addEventListener("pointerleave",g),()=>{c.removeEventListener("pointerleave",y),d.removeEventListener("pointerleave",g)}}},[c,d,p,f]),x.useEffect(()=>{if(s){const y=g=>{const b=g.target,h={x:g.clientX,y:g.clientY},v=(c==null?void 0:c.contains(b))||(d==null?void 0:d.contains(b)),w=!b2(h,s);v?f():w&&(f(),u())};return document.addEventListener("pointermove",y),()=>document.removeEventListener("pointermove",y)}},[c,d,s,u,f]),i.jsx(b0,{...e,ref:o})}),[p2,f2]=Tc(x0,{isInside:!1}),h2=vC("TooltipContent"),b0=x.forwardRef((e,r)=>{const{__scopeTooltip:n,children:t,"aria-label":a,onEscapeKeyDown:o,onPointerDownOutside:s,...l}=e,c=zc(Ho,n),u=Fp(n),{onClose:d}=c;return x.useEffect(()=>(document.addEventListener(dg,d),()=>document.removeEventListener(dg,d)),[d]),x.useEffect(()=>{if(c.trigger){const m=f=>{const p=f.target;p!=null&&p.contains(c.trigger)&&d()};return window.addEventListener("scroll",m,{capture:!0}),()=>window.removeEventListener("scroll",m,{capture:!0})}},[c.trigger,d]),i.jsx(Sp,{asChild:!0,disableOutsidePointerEvents:!1,onEscapeKeyDown:o,onPointerDownOutside:s,onFocusOutside:m=>m.preventDefault(),onDismiss:d,children:i.jsxs(o2,{"data-state":c.stateAttribute,...u,...l,ref:r,style:{...l.style,"--radix-tooltip-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-tooltip-content-available-width":"var(--radix-popper-available-width)","--radix-tooltip-content-available-height":"var(--radix-popper-available-height)","--radix-tooltip-trigger-width":"var(--radix-popper-anchor-width)","--radix-tooltip-trigger-height":"var(--radix-popper-anchor-height)"},children:[i.jsx(h2,{children:t}),i.jsx(p2,{scope:n,isInside:!0,children:i.jsx(DC,{id:c.contentId,role:"tooltip",children:a||t})})]})})});y0.displayName=Ho;var w0="TooltipArrow",g2=x.forwardRef((e,r)=>{const{__scopeTooltip:n,...t}=e,a=Fp(n);return f2(w0,n).isInside?null:i.jsx(s2,{...a,...t,ref:r})});g2.displayName=w0;function v2(e,r){const n=Math.abs(r.top-e.y),t=Math.abs(r.bottom-e.y),a=Math.abs(r.right-e.x),o=Math.abs(r.left-e.x);switch(Math.min(n,t,a,o)){case o:return"left";case a:return"right";case n:return"top";case t:return"bottom";default:throw new Error("unreachable")}}function x2(e,r,n=5){const t=[];switch(r){case"top":t.push({x:e.x-n,y:e.y+n},{x:e.x+n,y:e.y+n});break;case"bottom":t.push({x:e.x-n,y:e.y-n},{x:e.x+n,y:e.y-n});break;case"left":t.push({x:e.x+n,y:e.y-n},{x:e.x+n,y:e.y+n});break;case"right":t.push({x:e.x-n,y:e.y-n},{x:e.x-n,y:e.y+n});break}return t}function y2(e){const{top:r,right:n,bottom:t,left:a}=e;return[{x:a,y:r},{x:n,y:r},{x:n,y:t},{x:a,y:t}]}function b2(e,r){const{x:n,y:t}=e;let a=!1;for(let o=0,s=r.length-1;o<r.length;s=o++){const l=r[o],c=r[s],u=l.x,d=l.y,m=c.x,f=c.y;d>t!=f>t&&n<(m-u)*(t-d)/(f-d)+u&&(a=!a)}return a}function w2(e){const r=e.slice();return r.sort((n,t)=>n.x<t.x?-1:n.x>t.x?1:n.y<t.y?-1:n.y>t.y?1:0),j2(r)}function j2(e){if(e.length<=1)return e.slice();const r=[];for(let t=0;t<e.length;t++){const a=e[t];for(;r.length>=2;){const o=r[r.length-1],s=r[r.length-2];if((o.x-s.x)*(a.y-s.y)>=(o.y-s.y)*(a.x-s.x))r.pop();else break}r.push(a)}r.pop();const n=[];for(let t=e.length-1;t>=0;t--){const a=e[t];for(;n.length>=2;){const o=n[n.length-1],s=n[n.length-2];if((o.x-s.x)*(a.y-s.y)>=(o.y-s.y)*(a.x-s.x))n.pop();else break}n.push(a)}return n.pop(),r.length===1&&n.length===1&&r[0].x===n[0].x&&r[0].y===n[0].y?r:r.concat(n)}var S2=v0,j0=y0;const C2=S2,N2=x.forwardRef(({className:e,sideOffset:r=4,...n},t)=>i.jsx(j0,{ref:t,sideOffset:r,className:fe("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...n}));N2.displayName=j0.displayName;var ji=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(e){return this.listeners.add(e),this.onSubscribe(),()=>{this.listeners.delete(e),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},Ba=typeof window>"u"||"Deno"in globalThis;function Er(){}function E2(e,r){return typeof e=="function"?e(r):e}function Yd(e){return typeof e=="number"&&e>=0&&e!==1/0}function S0(e,r){return Math.max(e+(r||0)-Date.now(),0)}function Gt(e,r){return typeof e=="function"?e(r):e}function Jr(e,r){return typeof e=="function"?e(r):e}function mg(e,r){const{type:n="all",exact:t,fetchStatus:a,predicate:o,queryKey:s,stale:l}=e;if(s){if(t){if(r.queryHash!==Dp(s,r.options))return!1}else if(!ai(r.queryKey,s))return!1}if(n!=="all"){const c=r.isActive();if(n==="active"&&!c||n==="inactive"&&c)return!1}return!(typeof l=="boolean"&&r.isStale()!==l||a&&a!==r.state.fetchStatus||o&&!o(r))}function pg(e,r){const{exact:n,status:t,predicate:a,mutationKey:o}=e;if(o){if(!r.options.mutationKey)return!1;if(n){if(ti(r.options.mutationKey)!==ti(o))return!1}else if(!ai(r.options.mutationKey,o))return!1}return!(t&&r.state.status!==t||a&&!a(r))}function Dp(e,r){return((r==null?void 0:r.queryKeyHashFn)||ti)(e)}function ti(e){return JSON.stringify(e,(r,n)=>Xd(n)?Object.keys(n).sort().reduce((t,a)=>(t[a]=n[a],t),{}):n)}function ai(e,r){return e===r?!0:typeof e!=typeof r?!1:e&&r&&typeof e=="object"&&typeof r=="object"?Object.keys(r).every(n=>ai(e[n],r[n])):!1}function C0(e,r){if(e===r)return e;const n=fg(e)&&fg(r);if(n||Xd(e)&&Xd(r)){const t=n?e:Object.keys(e),a=t.length,o=n?r:Object.keys(r),s=o.length,l=n?[]:{},c=new Set(t);let u=0;for(let d=0;d<s;d++){const m=n?d:o[d];(!n&&c.has(m)||n)&&e[m]===void 0&&r[m]===void 0?(l[m]=void 0,u++):(l[m]=C0(e[m],r[m]),l[m]===e[m]&&e[m]!==void 0&&u++)}return a===s&&u===a?e:l}return r}function Kd(e,r){if(!r||Object.keys(e).length!==Object.keys(r).length)return!1;for(const n in e)if(e[n]!==r[n])return!1;return!0}function fg(e){return Array.isArray(e)&&e.length===Object.keys(e).length}function Xd(e){if(!hg(e))return!1;const r=e.constructor;if(r===void 0)return!0;const n=r.prototype;return!(!hg(n)||!n.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(e)!==Object.prototype)}function hg(e){return Object.prototype.toString.call(e)==="[object Object]"}function k2(e){return new Promise(r=>{setTimeout(r,e)})}function Jd(e,r,n){return typeof n.structuralSharing=="function"?n.structuralSharing(e,r):n.structuralSharing!==!1?C0(e,r):r}function P2(e,r,n=0){const t=[...e,r];return n&&t.length>n?t.slice(1):t}function T2(e,r,n=0){const t=[r,...e];return n&&t.length>n?t.slice(0,-1):t}var Bp=Symbol();function N0(e,r){return!e.queryFn&&(r!=null&&r.initialPromise)?()=>r.initialPromise:!e.queryFn||e.queryFn===Bp?()=>Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)):e.queryFn}function z2(e,r){return typeof e=="function"?e(...r):!!e}var Sa,Tt,So,Av,A2=(Av=class extends ji{constructor(){super();Z(this,Sa);Z(this,Tt);Z(this,So);K(this,So,r=>{if(!Ba&&window.addEventListener){const n=()=>r();return window.addEventListener("visibilitychange",n,!1),()=>{window.removeEventListener("visibilitychange",n)}}})}onSubscribe(){T(this,Tt)||this.setEventListener(T(this,So))}onUnsubscribe(){var r;this.hasListeners()||((r=T(this,Tt))==null||r.call(this),K(this,Tt,void 0))}setEventListener(r){var n;K(this,So,r),(n=T(this,Tt))==null||n.call(this),K(this,Tt,r(t=>{typeof t=="boolean"?this.setFocused(t):this.onFocus()}))}setFocused(r){T(this,Sa)!==r&&(K(this,Sa,r),this.onFocus())}onFocus(){const r=this.isFocused();this.listeners.forEach(n=>{n(r)})}isFocused(){var r;return typeof T(this,Sa)=="boolean"?T(this,Sa):((r=globalThis.document)==null?void 0:r.visibilityState)!=="hidden"}},Sa=new WeakMap,Tt=new WeakMap,So=new WeakMap,Av),$p=new A2,Co,zt,No,qv,q2=(qv=class extends ji{constructor(){super();Z(this,Co,!0);Z(this,zt);Z(this,No);K(this,No,r=>{if(!Ba&&window.addEventListener){const n=()=>r(!0),t=()=>r(!1);return window.addEventListener("online",n,!1),window.addEventListener("offline",t,!1),()=>{window.removeEventListener("online",n),window.removeEventListener("offline",t)}}})}onSubscribe(){T(this,zt)||this.setEventListener(T(this,No))}onUnsubscribe(){var r;this.hasListeners()||((r=T(this,zt))==null||r.call(this),K(this,zt,void 0))}setEventListener(r){var n;K(this,No,r),(n=T(this,zt))==null||n.call(this),K(this,zt,r(this.setOnline.bind(this)))}setOnline(r){T(this,Co)!==r&&(K(this,Co,r),this.listeners.forEach(t=>{t(r)}))}isOnline(){return T(this,Co)}},Co=new WeakMap,zt=new WeakMap,No=new WeakMap,qv),Jl=new q2;function Zd(){let e,r;const n=new Promise((a,o)=>{e=a,r=o});n.status="pending",n.catch(()=>{});function t(a){Object.assign(n,a),delete n.resolve,delete n.reject}return n.resolve=a=>{t({status:"fulfilled",value:a}),e(a)},n.reject=a=>{t({status:"rejected",reason:a}),r(a)},n}function R2(e){return Math.min(1e3*2**e,3e4)}function E0(e){return(e??"online")==="online"?Jl.isOnline():!0}var k0=class extends Error{constructor(e){super("CancelledError"),this.revert=e==null?void 0:e.revert,this.silent=e==null?void 0:e.silent}};function Pu(e){return e instanceof k0}function P0(e){let r=!1,n=0,t=!1,a;const o=Zd(),s=g=>{var b;t||(f(new k0(g)),(b=e.abort)==null||b.call(e))},l=()=>{r=!0},c=()=>{r=!1},u=()=>$p.isFocused()&&(e.networkMode==="always"||Jl.isOnline())&&e.canRun(),d=()=>E0(e.networkMode)&&e.canRun(),m=g=>{var b;t||(t=!0,(b=e.onSuccess)==null||b.call(e,g),a==null||a(),o.resolve(g))},f=g=>{var b;t||(t=!0,(b=e.onError)==null||b.call(e,g),a==null||a(),o.reject(g))},p=()=>new Promise(g=>{var b;a=h=>{(t||u())&&g(h)},(b=e.onPause)==null||b.call(e)}).then(()=>{var g;a=void 0,t||(g=e.onContinue)==null||g.call(e)}),y=()=>{if(t)return;let g;const b=n===0?e.initialPromise:void 0;try{g=b??e.fn()}catch(h){g=Promise.reject(h)}Promise.resolve(g).then(m).catch(h=>{var N;if(t)return;const v=e.retry??(Ba?0:3),w=e.retryDelay??R2,j=typeof w=="function"?w(n,h):w,E=v===!0||typeof v=="number"&&n<v||typeof v=="function"&&v(n,h);if(r||!E){f(h);return}n++,(N=e.onFail)==null||N.call(e,n,h),k2(j).then(()=>u()?void 0:p()).then(()=>{r?f(h):y()})})};return{promise:o,cancel:s,continue:()=>(a==null||a(),o),cancelRetry:l,continueRetry:c,canStart:d,start:()=>(d()?y():p().then(y),o)}}var _2=e=>setTimeout(e,0);function O2(){let e=[],r=0,n=l=>{l()},t=l=>{l()},a=_2;const o=l=>{r?e.push(l):a(()=>{n(l)})},s=()=>{const l=e;e=[],l.length&&a(()=>{t(()=>{l.forEach(c=>{n(c)})})})};return{batch:l=>{let c;r++;try{c=l()}finally{r--,r||s()}return c},batchCalls:l=>(...c)=>{o(()=>{l(...c)})},schedule:o,setNotifyFunction:l=>{n=l},setBatchNotifyFunction:l=>{t=l},setScheduler:l=>{a=l}}}var rr=O2(),Ca,Rv,T0=(Rv=class{constructor(){Z(this,Ca)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),Yd(this.gcTime)&&K(this,Ca,setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(e){this.gcTime=Math.max(this.gcTime||0,e??(Ba?1/0:5*60*1e3))}clearGcTimeout(){T(this,Ca)&&(clearTimeout(T(this,Ca)),K(this,Ca,void 0))}},Ca=new WeakMap,Rv),Eo,Na,Xr,Ea,ir,ci,ka,vn,Zn,_v,I2=(_v=class extends T0{constructor(r){super();Z(this,vn);Z(this,Eo);Z(this,Na);Z(this,Xr);Z(this,Ea);Z(this,ir);Z(this,ci);Z(this,ka);K(this,ka,!1),K(this,ci,r.defaultOptions),this.setOptions(r.options),this.observers=[],K(this,Ea,r.client),K(this,Xr,T(this,Ea).getQueryCache()),this.queryKey=r.queryKey,this.queryHash=r.queryHash,K(this,Eo,M2(this.options)),this.state=r.state??T(this,Eo),this.scheduleGc()}get meta(){return this.options.meta}get promise(){var r;return(r=T(this,ir))==null?void 0:r.promise}setOptions(r){this.options={...T(this,ci),...r},this.updateGcTime(this.options.gcTime)}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&T(this,Xr).remove(this)}setData(r,n){const t=Jd(this.state.data,r,this.options);return de(this,vn,Zn).call(this,{data:t,type:"success",dataUpdatedAt:n==null?void 0:n.updatedAt,manual:n==null?void 0:n.manual}),t}setState(r,n){de(this,vn,Zn).call(this,{type:"setState",state:r,setStateOptions:n})}cancel(r){var t,a;const n=(t=T(this,ir))==null?void 0:t.promise;return(a=T(this,ir))==null||a.cancel(r),n?n.then(Er).catch(Er):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(T(this,Eo))}isActive(){return this.observers.some(r=>Jr(r.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===Bp||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStatic(){return this.getObserversCount()>0?this.observers.some(r=>Gt(r.options.staleTime,this)==="static"):!1}isStale(){return this.getObserversCount()>0?this.observers.some(r=>r.getCurrentResult().isStale):this.state.data===void 0||this.state.isInvalidated}isStaleByTime(r=0){return this.state.data===void 0?!0:r==="static"?!1:this.state.isInvalidated?!0:!S0(this.state.dataUpdatedAt,r)}onFocus(){var n;const r=this.observers.find(t=>t.shouldFetchOnWindowFocus());r==null||r.refetch({cancelRefetch:!1}),(n=T(this,ir))==null||n.continue()}onOnline(){var n;const r=this.observers.find(t=>t.shouldFetchOnReconnect());r==null||r.refetch({cancelRefetch:!1}),(n=T(this,ir))==null||n.continue()}addObserver(r){this.observers.includes(r)||(this.observers.push(r),this.clearGcTimeout(),T(this,Xr).notify({type:"observerAdded",query:this,observer:r}))}removeObserver(r){this.observers.includes(r)&&(this.observers=this.observers.filter(n=>n!==r),this.observers.length||(T(this,ir)&&(T(this,ka)?T(this,ir).cancel({revert:!0}):T(this,ir).cancelRetry()),this.scheduleGc()),T(this,Xr).notify({type:"observerRemoved",query:this,observer:r}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||de(this,vn,Zn).call(this,{type:"invalidate"})}fetch(r,n){var u,d,m;if(this.state.fetchStatus!=="idle"){if(this.state.data!==void 0&&(n!=null&&n.cancelRefetch))this.cancel({silent:!0});else if(T(this,ir))return T(this,ir).continueRetry(),T(this,ir).promise}if(r&&this.setOptions(r),!this.options.queryFn){const f=this.observers.find(p=>p.options.queryFn);f&&this.setOptions(f.options)}const t=new AbortController,a=f=>{Object.defineProperty(f,"signal",{enumerable:!0,get:()=>(K(this,ka,!0),t.signal)})},o=()=>{const f=N0(this.options,n),y=(()=>{const g={client:T(this,Ea),queryKey:this.queryKey,meta:this.meta};return a(g),g})();return K(this,ka,!1),this.options.persister?this.options.persister(f,y,this):f(y)},l=(()=>{const f={fetchOptions:n,options:this.options,queryKey:this.queryKey,client:T(this,Ea),state:this.state,fetchFn:o};return a(f),f})();(u=this.options.behavior)==null||u.onFetch(l,this),K(this,Na,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((d=l.fetchOptions)==null?void 0:d.meta))&&de(this,vn,Zn).call(this,{type:"fetch",meta:(m=l.fetchOptions)==null?void 0:m.meta});const c=f=>{var p,y,g,b;Pu(f)&&f.silent||de(this,vn,Zn).call(this,{type:"error",error:f}),Pu(f)||((y=(p=T(this,Xr).config).onError)==null||y.call(p,f,this),(b=(g=T(this,Xr).config).onSettled)==null||b.call(g,this.state.data,f,this)),this.scheduleGc()};return K(this,ir,P0({initialPromise:n==null?void 0:n.initialPromise,fn:l.fetchFn,abort:t.abort.bind(t),onSuccess:f=>{var p,y,g,b;if(f===void 0){c(new Error(`${this.queryHash} data is undefined`));return}try{this.setData(f)}catch(h){c(h);return}(y=(p=T(this,Xr).config).onSuccess)==null||y.call(p,f,this),(b=(g=T(this,Xr).config).onSettled)==null||b.call(g,f,this.state.error,this),this.scheduleGc()},onError:c,onFail:(f,p)=>{de(this,vn,Zn).call(this,{type:"failed",failureCount:f,error:p})},onPause:()=>{de(this,vn,Zn).call(this,{type:"pause"})},onContinue:()=>{de(this,vn,Zn).call(this,{type:"continue"})},retry:l.options.retry,retryDelay:l.options.retryDelay,networkMode:l.options.networkMode,canRun:()=>!0})),T(this,ir).start()}},Eo=new WeakMap,Na=new WeakMap,Xr=new WeakMap,Ea=new WeakMap,ir=new WeakMap,ci=new WeakMap,ka=new WeakMap,vn=new WeakSet,Zn=function(r){const n=t=>{switch(r.type){case"failed":return{...t,fetchFailureCount:r.failureCount,fetchFailureReason:r.error};case"pause":return{...t,fetchStatus:"paused"};case"continue":return{...t,fetchStatus:"fetching"};case"fetch":return{...t,...z0(t.data,this.options),fetchMeta:r.meta??null};case"success":return K(this,Na,void 0),{...t,data:r.data,dataUpdateCount:t.dataUpdateCount+1,dataUpdatedAt:r.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!r.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":const a=r.error;return Pu(a)&&a.revert&&T(this,Na)?{...T(this,Na),fetchStatus:"idle"}:{...t,error:a,errorUpdateCount:t.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:t.fetchFailureCount+1,fetchFailureReason:a,fetchStatus:"idle",status:"error"};case"invalidate":return{...t,isInvalidated:!0};case"setState":return{...t,...r.state}}};this.state=n(this.state),rr.batch(()=>{this.observers.forEach(t=>{t.onQueryUpdate()}),T(this,Xr).notify({query:this,type:"updated",action:r})})},_v);function z0(e,r){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:E0(r.networkMode)?"fetching":"paused",...e===void 0&&{error:null,status:"pending"}}}function M2(e){const r=typeof e.initialData=="function"?e.initialData():e.initialData,n=r!==void 0,t=n?typeof e.initialDataUpdatedAt=="function"?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0;return{data:r,dataUpdateCount:0,dataUpdatedAt:n?t??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:n?"success":"pending",fetchStatus:"idle"}}var _n,Ov,L2=(Ov=class extends ji{constructor(r={}){super();Z(this,_n);this.config=r,K(this,_n,new Map)}build(r,n,t){const a=n.queryKey,o=n.queryHash??Dp(a,n);let s=this.get(o);return s||(s=new I2({client:r,queryKey:a,queryHash:o,options:r.defaultQueryOptions(n),state:t,defaultOptions:r.getQueryDefaults(a)}),this.add(s)),s}add(r){T(this,_n).has(r.queryHash)||(T(this,_n).set(r.queryHash,r),this.notify({type:"added",query:r}))}remove(r){const n=T(this,_n).get(r.queryHash);n&&(r.destroy(),n===r&&T(this,_n).delete(r.queryHash),this.notify({type:"removed",query:r}))}clear(){rr.batch(()=>{this.getAll().forEach(r=>{this.remove(r)})})}get(r){return T(this,_n).get(r)}getAll(){return[...T(this,_n).values()]}find(r){const n={exact:!0,...r};return this.getAll().find(t=>mg(n,t))}findAll(r={}){const n=this.getAll();return Object.keys(r).length>0?n.filter(t=>mg(r,t)):n}notify(r){rr.batch(()=>{this.listeners.forEach(n=>{n(r)})})}onFocus(){rr.batch(()=>{this.getAll().forEach(r=>{r.onFocus()})})}onOnline(){rr.batch(()=>{this.getAll().forEach(r=>{r.onOnline()})})}},_n=new WeakMap,Ov),On,pr,Pa,In,St,Iv,F2=(Iv=class extends T0{constructor(r){super();Z(this,In);Z(this,On);Z(this,pr);Z(this,Pa);this.mutationId=r.mutationId,K(this,pr,r.mutationCache),K(this,On,[]),this.state=r.state||D2(),this.setOptions(r.options),this.scheduleGc()}setOptions(r){this.options=r,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(r){T(this,On).includes(r)||(T(this,On).push(r),this.clearGcTimeout(),T(this,pr).notify({type:"observerAdded",mutation:this,observer:r}))}removeObserver(r){K(this,On,T(this,On).filter(n=>n!==r)),this.scheduleGc(),T(this,pr).notify({type:"observerRemoved",mutation:this,observer:r})}optionalRemove(){T(this,On).length||(this.state.status==="pending"?this.scheduleGc():T(this,pr).remove(this))}continue(){var r;return((r=T(this,Pa))==null?void 0:r.continue())??this.execute(this.state.variables)}async execute(r){var o,s,l,c,u,d,m,f,p,y,g,b,h,v,w,j,E,N,P,k;const n=()=>{de(this,In,St).call(this,{type:"continue"})};K(this,Pa,P0({fn:()=>this.options.mutationFn?this.options.mutationFn(r):Promise.reject(new Error("No mutationFn found")),onFail:(z,A)=>{de(this,In,St).call(this,{type:"failed",failureCount:z,error:A})},onPause:()=>{de(this,In,St).call(this,{type:"pause"})},onContinue:n,retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>T(this,pr).canRun(this)}));const t=this.state.status==="pending",a=!T(this,Pa).canStart();try{if(t)n();else{de(this,In,St).call(this,{type:"pending",variables:r,isPaused:a}),await((s=(o=T(this,pr).config).onMutate)==null?void 0:s.call(o,r,this));const A=await((c=(l=this.options).onMutate)==null?void 0:c.call(l,r));A!==this.state.context&&de(this,In,St).call(this,{type:"pending",context:A,variables:r,isPaused:a})}const z=await T(this,Pa).start();return await((d=(u=T(this,pr).config).onSuccess)==null?void 0:d.call(u,z,r,this.state.context,this)),await((f=(m=this.options).onSuccess)==null?void 0:f.call(m,z,r,this.state.context)),await((y=(p=T(this,pr).config).onSettled)==null?void 0:y.call(p,z,null,this.state.variables,this.state.context,this)),await((b=(g=this.options).onSettled)==null?void 0:b.call(g,z,null,r,this.state.context)),de(this,In,St).call(this,{type:"success",data:z}),z}catch(z){try{throw await((v=(h=T(this,pr).config).onError)==null?void 0:v.call(h,z,r,this.state.context,this)),await((j=(w=this.options).onError)==null?void 0:j.call(w,z,r,this.state.context)),await((N=(E=T(this,pr).config).onSettled)==null?void 0:N.call(E,void 0,z,this.state.variables,this.state.context,this)),await((k=(P=this.options).onSettled)==null?void 0:k.call(P,void 0,z,r,this.state.context)),z}finally{de(this,In,St).call(this,{type:"error",error:z})}}finally{T(this,pr).runNext(this)}}},On=new WeakMap,pr=new WeakMap,Pa=new WeakMap,In=new WeakSet,St=function(r){const n=t=>{switch(r.type){case"failed":return{...t,failureCount:r.failureCount,failureReason:r.error};case"pause":return{...t,isPaused:!0};case"continue":return{...t,isPaused:!1};case"pending":return{...t,context:r.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:r.isPaused,status:"pending",variables:r.variables,submittedAt:Date.now()};case"success":return{...t,data:r.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...t,data:void 0,error:r.error,failureCount:t.failureCount+1,failureReason:r.error,isPaused:!1,status:"error"}}};this.state=n(this.state),rr.batch(()=>{T(this,On).forEach(t=>{t.onMutationUpdate(r)}),T(this,pr).notify({mutation:this,type:"updated",action:r})})},Iv);function D2(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}var nt,xn,ui,Mv,B2=(Mv=class extends ji{constructor(r={}){super();Z(this,nt);Z(this,xn);Z(this,ui);this.config=r,K(this,nt,new Set),K(this,xn,new Map),K(this,ui,0)}build(r,n,t){const a=new F2({mutationCache:this,mutationId:++Pi(this,ui)._,options:r.defaultMutationOptions(n),state:t});return this.add(a),a}add(r){T(this,nt).add(r);const n=Ki(r);if(typeof n=="string"){const t=T(this,xn).get(n);t?t.push(r):T(this,xn).set(n,[r])}this.notify({type:"added",mutation:r})}remove(r){if(T(this,nt).delete(r)){const n=Ki(r);if(typeof n=="string"){const t=T(this,xn).get(n);if(t)if(t.length>1){const a=t.indexOf(r);a!==-1&&t.splice(a,1)}else t[0]===r&&T(this,xn).delete(n)}}this.notify({type:"removed",mutation:r})}canRun(r){const n=Ki(r);if(typeof n=="string"){const t=T(this,xn).get(n),a=t==null?void 0:t.find(o=>o.state.status==="pending");return!a||a===r}else return!0}runNext(r){var t;const n=Ki(r);if(typeof n=="string"){const a=(t=T(this,xn).get(n))==null?void 0:t.find(o=>o!==r&&o.state.isPaused);return(a==null?void 0:a.continue())??Promise.resolve()}else return Promise.resolve()}clear(){rr.batch(()=>{T(this,nt).forEach(r=>{this.notify({type:"removed",mutation:r})}),T(this,nt).clear(),T(this,xn).clear()})}getAll(){return Array.from(T(this,nt))}find(r){const n={exact:!0,...r};return this.getAll().find(t=>pg(n,t))}findAll(r={}){return this.getAll().filter(n=>pg(r,n))}notify(r){rr.batch(()=>{this.listeners.forEach(n=>{n(r)})})}resumePausedMutations(){const r=this.getAll().filter(n=>n.state.isPaused);return rr.batch(()=>Promise.all(r.map(n=>n.continue().catch(Er))))}},nt=new WeakMap,xn=new WeakMap,ui=new WeakMap,Mv);function Ki(e){var r;return(r=e.options.scope)==null?void 0:r.id}function gg(e){return{onFetch:(r,n)=>{var d,m,f,p,y;const t=r.options,a=(f=(m=(d=r.fetchOptions)==null?void 0:d.meta)==null?void 0:m.fetchMore)==null?void 0:f.direction,o=((p=r.state.data)==null?void 0:p.pages)||[],s=((y=r.state.data)==null?void 0:y.pageParams)||[];let l={pages:[],pageParams:[]},c=0;const u=async()=>{let g=!1;const b=w=>{Object.defineProperty(w,"signal",{enumerable:!0,get:()=>(r.signal.aborted?g=!0:r.signal.addEventListener("abort",()=>{g=!0}),r.signal)})},h=N0(r.options,r.fetchOptions),v=async(w,j,E)=>{if(g)return Promise.reject();if(j==null&&w.pages.length)return Promise.resolve(w);const P=(()=>{const I={client:r.client,queryKey:r.queryKey,pageParam:j,direction:E?"backward":"forward",meta:r.options.meta};return b(I),I})(),k=await h(P),{maxPages:z}=r.options,A=E?T2:P2;return{pages:A(w.pages,k,z),pageParams:A(w.pageParams,j,z)}};if(a&&o.length){const w=a==="backward",j=w?$2:vg,E={pages:o,pageParams:s},N=j(t,E);l=await v(E,N,w)}else{const w=e??o.length;do{const j=c===0?s[0]??t.initialPageParam:vg(t,l);if(c>0&&j==null)break;l=await v(l,j),c++}while(c<w)}return l};r.options.persister?r.fetchFn=()=>{var g,b;return(b=(g=r.options).persister)==null?void 0:b.call(g,u,{client:r.client,queryKey:r.queryKey,meta:r.options.meta,signal:r.signal},n)}:r.fetchFn=u}}}function vg(e,{pages:r,pageParams:n}){const t=r.length-1;return r.length>0?e.getNextPageParam(r[t],r,n[t],n):void 0}function $2(e,{pages:r,pageParams:n}){var t;return r.length>0?(t=e.getPreviousPageParam)==null?void 0:t.call(e,r[0],r,n[0],n):void 0}var Me,At,qt,ko,Po,Rt,To,zo,Lv,U2=(Lv=class{constructor(e={}){Z(this,Me);Z(this,At);Z(this,qt);Z(this,ko);Z(this,Po);Z(this,Rt);Z(this,To);Z(this,zo);K(this,Me,e.queryCache||new L2),K(this,At,e.mutationCache||new B2),K(this,qt,e.defaultOptions||{}),K(this,ko,new Map),K(this,Po,new Map),K(this,Rt,0)}mount(){Pi(this,Rt)._++,T(this,Rt)===1&&(K(this,To,$p.subscribe(async e=>{e&&(await this.resumePausedMutations(),T(this,Me).onFocus())})),K(this,zo,Jl.subscribe(async e=>{e&&(await this.resumePausedMutations(),T(this,Me).onOnline())})))}unmount(){var e,r;Pi(this,Rt)._--,T(this,Rt)===0&&((e=T(this,To))==null||e.call(this),K(this,To,void 0),(r=T(this,zo))==null||r.call(this),K(this,zo,void 0))}isFetching(e){return T(this,Me).findAll({...e,fetchStatus:"fetching"}).length}isMutating(e){return T(this,At).findAll({...e,status:"pending"}).length}getQueryData(e){var n;const r=this.defaultQueryOptions({queryKey:e});return(n=T(this,Me).get(r.queryHash))==null?void 0:n.state.data}ensureQueryData(e){const r=this.defaultQueryOptions(e),n=T(this,Me).build(this,r),t=n.state.data;return t===void 0?this.fetchQuery(e):(e.revalidateIfStale&&n.isStaleByTime(Gt(r.staleTime,n))&&this.prefetchQuery(r),Promise.resolve(t))}getQueriesData(e){return T(this,Me).findAll(e).map(({queryKey:r,state:n})=>{const t=n.data;return[r,t]})}setQueryData(e,r,n){const t=this.defaultQueryOptions({queryKey:e}),a=T(this,Me).get(t.queryHash),o=a==null?void 0:a.state.data,s=E2(r,o);if(s!==void 0)return T(this,Me).build(this,t).setData(s,{...n,manual:!0})}setQueriesData(e,r,n){return rr.batch(()=>T(this,Me).findAll(e).map(({queryKey:t})=>[t,this.setQueryData(t,r,n)]))}getQueryState(e){var n;const r=this.defaultQueryOptions({queryKey:e});return(n=T(this,Me).get(r.queryHash))==null?void 0:n.state}removeQueries(e){const r=T(this,Me);rr.batch(()=>{r.findAll(e).forEach(n=>{r.remove(n)})})}resetQueries(e,r){const n=T(this,Me);return rr.batch(()=>(n.findAll(e).forEach(t=>{t.reset()}),this.refetchQueries({type:"active",...e},r)))}cancelQueries(e,r={}){const n={revert:!0,...r},t=rr.batch(()=>T(this,Me).findAll(e).map(a=>a.cancel(n)));return Promise.all(t).then(Er).catch(Er)}invalidateQueries(e,r={}){return rr.batch(()=>(T(this,Me).findAll(e).forEach(n=>{n.invalidate()}),(e==null?void 0:e.refetchType)==="none"?Promise.resolve():this.refetchQueries({...e,type:(e==null?void 0:e.refetchType)??(e==null?void 0:e.type)??"active"},r)))}refetchQueries(e,r={}){const n={...r,cancelRefetch:r.cancelRefetch??!0},t=rr.batch(()=>T(this,Me).findAll(e).filter(a=>!a.isDisabled()&&!a.isStatic()).map(a=>{let o=a.fetch(void 0,n);return n.throwOnError||(o=o.catch(Er)),a.state.fetchStatus==="paused"?Promise.resolve():o}));return Promise.all(t).then(Er)}fetchQuery(e){const r=this.defaultQueryOptions(e);r.retry===void 0&&(r.retry=!1);const n=T(this,Me).build(this,r);return n.isStaleByTime(Gt(r.staleTime,n))?n.fetch(r):Promise.resolve(n.state.data)}prefetchQuery(e){return this.fetchQuery(e).then(Er).catch(Er)}fetchInfiniteQuery(e){return e.behavior=gg(e.pages),this.fetchQuery(e)}prefetchInfiniteQuery(e){return this.fetchInfiniteQuery(e).then(Er).catch(Er)}ensureInfiniteQueryData(e){return e.behavior=gg(e.pages),this.ensureQueryData(e)}resumePausedMutations(){return Jl.isOnline()?T(this,At).resumePausedMutations():Promise.resolve()}getQueryCache(){return T(this,Me)}getMutationCache(){return T(this,At)}getDefaultOptions(){return T(this,qt)}setDefaultOptions(e){K(this,qt,e)}setQueryDefaults(e,r){T(this,ko).set(ti(e),{queryKey:e,defaultOptions:r})}getQueryDefaults(e){const r=[...T(this,ko).values()],n={};return r.forEach(t=>{ai(e,t.queryKey)&&Object.assign(n,t.defaultOptions)}),n}setMutationDefaults(e,r){T(this,Po).set(ti(e),{mutationKey:e,defaultOptions:r})}getMutationDefaults(e){const r=[...T(this,Po).values()],n={};return r.forEach(t=>{ai(e,t.mutationKey)&&Object.assign(n,t.defaultOptions)}),n}defaultQueryOptions(e){if(e._defaulted)return e;const r={...T(this,qt).queries,...this.getQueryDefaults(e.queryKey),...e,_defaulted:!0};return r.queryHash||(r.queryHash=Dp(r.queryKey,r)),r.refetchOnReconnect===void 0&&(r.refetchOnReconnect=r.networkMode!=="always"),r.throwOnError===void 0&&(r.throwOnError=!!r.suspense),!r.networkMode&&r.persister&&(r.networkMode="offlineFirst"),r.queryFn===Bp&&(r.enabled=!1),r}defaultMutationOptions(e){return e!=null&&e._defaulted?e:{...T(this,qt).mutations,...(e==null?void 0:e.mutationKey)&&this.getMutationDefaults(e.mutationKey),...e,_defaulted:!0}}clear(){T(this,Me).clear(),T(this,At).clear()}},Me=new WeakMap,At=new WeakMap,qt=new WeakMap,ko=new WeakMap,Po=new WeakMap,Rt=new WeakMap,To=new WeakMap,zo=new WeakMap,Lv),Cr,me,di,fr,Ta,Ao,_t,Ot,mi,qo,Ro,za,Aa,It,_o,ye,ws,em,rm,nm,tm,am,om,sm,A0,Fv,V2=(Fv=class extends ji{constructor(r,n){super();Z(this,ye);Z(this,Cr);Z(this,me);Z(this,di);Z(this,fr);Z(this,Ta);Z(this,Ao);Z(this,_t);Z(this,Ot);Z(this,mi);Z(this,qo);Z(this,Ro);Z(this,za);Z(this,Aa);Z(this,It);Z(this,_o,new Set);this.options=n,K(this,Cr,r),K(this,Ot,null),K(this,_t,Zd()),this.options.experimental_prefetchInRender||T(this,_t).reject(new Error("experimental_prefetchInRender feature flag is not enabled")),this.bindMethods(),this.setOptions(n)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(T(this,me).addObserver(this),xg(T(this,me),this.options)?de(this,ye,ws).call(this):this.updateResult(),de(this,ye,tm).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return im(T(this,me),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return im(T(this,me),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,de(this,ye,am).call(this),de(this,ye,om).call(this),T(this,me).removeObserver(this)}setOptions(r){const n=this.options,t=T(this,me);if(this.options=T(this,Cr).defaultQueryOptions(r),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof Jr(this.options.enabled,T(this,me))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");de(this,ye,sm).call(this),T(this,me).setOptions(this.options),n._defaulted&&!Kd(this.options,n)&&T(this,Cr).getQueryCache().notify({type:"observerOptionsUpdated",query:T(this,me),observer:this});const a=this.hasListeners();a&&yg(T(this,me),t,this.options,n)&&de(this,ye,ws).call(this),this.updateResult(),a&&(T(this,me)!==t||Jr(this.options.enabled,T(this,me))!==Jr(n.enabled,T(this,me))||Gt(this.options.staleTime,T(this,me))!==Gt(n.staleTime,T(this,me)))&&de(this,ye,em).call(this);const o=de(this,ye,rm).call(this);a&&(T(this,me)!==t||Jr(this.options.enabled,T(this,me))!==Jr(n.enabled,T(this,me))||o!==T(this,It))&&de(this,ye,nm).call(this,o)}getOptimisticResult(r){const n=T(this,Cr).getQueryCache().build(T(this,Cr),r),t=this.createResult(n,r);return Q2(this,t)&&(K(this,fr,t),K(this,Ao,this.options),K(this,Ta,T(this,me).state)),t}getCurrentResult(){return T(this,fr)}trackResult(r,n){return new Proxy(r,{get:(t,a)=>(this.trackProp(a),n==null||n(a),Reflect.get(t,a))})}trackProp(r){T(this,_o).add(r)}getCurrentQuery(){return T(this,me)}refetch({...r}={}){return this.fetch({...r})}fetchOptimistic(r){const n=T(this,Cr).defaultQueryOptions(r),t=T(this,Cr).getQueryCache().build(T(this,Cr),n);return t.fetch().then(()=>this.createResult(t,n))}fetch(r){return de(this,ye,ws).call(this,{...r,cancelRefetch:r.cancelRefetch??!0}).then(()=>(this.updateResult(),T(this,fr)))}createResult(r,n){var z;const t=T(this,me),a=this.options,o=T(this,fr),s=T(this,Ta),l=T(this,Ao),u=r!==t?r.state:T(this,di),{state:d}=r;let m={...d},f=!1,p;if(n._optimisticResults){const A=this.hasListeners(),I=!A&&xg(r,n),_=A&&yg(r,t,n,a);(I||_)&&(m={...m,...z0(d.data,r.options)}),n._optimisticResults==="isRestoring"&&(m.fetchStatus="idle")}let{error:y,errorUpdatedAt:g,status:b}=m;p=m.data;let h=!1;if(n.placeholderData!==void 0&&p===void 0&&b==="pending"){let A;o!=null&&o.isPlaceholderData&&n.placeholderData===(l==null?void 0:l.placeholderData)?(A=o.data,h=!0):A=typeof n.placeholderData=="function"?n.placeholderData((z=T(this,Ro))==null?void 0:z.state.data,T(this,Ro)):n.placeholderData,A!==void 0&&(b="success",p=Jd(o==null?void 0:o.data,A,n),f=!0)}if(n.select&&p!==void 0&&!h)if(o&&p===(s==null?void 0:s.data)&&n.select===T(this,mi))p=T(this,qo);else try{K(this,mi,n.select),p=n.select(p),p=Jd(o==null?void 0:o.data,p,n),K(this,qo,p),K(this,Ot,null)}catch(A){K(this,Ot,A)}T(this,Ot)&&(y=T(this,Ot),p=T(this,qo),g=Date.now(),b="error");const v=m.fetchStatus==="fetching",w=b==="pending",j=b==="error",E=w&&v,N=p!==void 0,k={status:b,fetchStatus:m.fetchStatus,isPending:w,isSuccess:b==="success",isError:j,isInitialLoading:E,isLoading:E,data:p,dataUpdatedAt:m.dataUpdatedAt,error:y,errorUpdatedAt:g,failureCount:m.fetchFailureCount,failureReason:m.fetchFailureReason,errorUpdateCount:m.errorUpdateCount,isFetched:m.dataUpdateCount>0||m.errorUpdateCount>0,isFetchedAfterMount:m.dataUpdateCount>u.dataUpdateCount||m.errorUpdateCount>u.errorUpdateCount,isFetching:v,isRefetching:v&&!w,isLoadingError:j&&!N,isPaused:m.fetchStatus==="paused",isPlaceholderData:f,isRefetchError:j&&N,isStale:Up(r,n),refetch:this.refetch,promise:T(this,_t),isEnabled:Jr(n.enabled,r)!==!1};if(this.options.experimental_prefetchInRender){const A=V=>{k.status==="error"?V.reject(k.error):k.data!==void 0&&V.resolve(k.data)},I=()=>{const V=K(this,_t,k.promise=Zd());A(V)},_=T(this,_t);switch(_.status){case"pending":r.queryHash===t.queryHash&&A(_);break;case"fulfilled":(k.status==="error"||k.data!==_.value)&&I();break;case"rejected":(k.status!=="error"||k.error!==_.reason)&&I();break}}return k}updateResult(){const r=T(this,fr),n=this.createResult(T(this,me),this.options);if(K(this,Ta,T(this,me).state),K(this,Ao,this.options),T(this,Ta).data!==void 0&&K(this,Ro,T(this,me)),Kd(n,r))return;K(this,fr,n);const t=()=>{if(!r)return!0;const{notifyOnChangeProps:a}=this.options,o=typeof a=="function"?a():a;if(o==="all"||!o&&!T(this,_o).size)return!0;const s=new Set(o??T(this,_o));return this.options.throwOnError&&s.add("error"),Object.keys(T(this,fr)).some(l=>{const c=l;return T(this,fr)[c]!==r[c]&&s.has(c)})};de(this,ye,A0).call(this,{listeners:t()})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&de(this,ye,tm).call(this)}},Cr=new WeakMap,me=new WeakMap,di=new WeakMap,fr=new WeakMap,Ta=new WeakMap,Ao=new WeakMap,_t=new WeakMap,Ot=new WeakMap,mi=new WeakMap,qo=new WeakMap,Ro=new WeakMap,za=new WeakMap,Aa=new WeakMap,It=new WeakMap,_o=new WeakMap,ye=new WeakSet,ws=function(r){de(this,ye,sm).call(this);let n=T(this,me).fetch(this.options,r);return r!=null&&r.throwOnError||(n=n.catch(Er)),n},em=function(){de(this,ye,am).call(this);const r=Gt(this.options.staleTime,T(this,me));if(Ba||T(this,fr).isStale||!Yd(r))return;const t=S0(T(this,fr).dataUpdatedAt,r)+1;K(this,za,setTimeout(()=>{T(this,fr).isStale||this.updateResult()},t))},rm=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(T(this,me)):this.options.refetchInterval)??!1},nm=function(r){de(this,ye,om).call(this),K(this,It,r),!(Ba||Jr(this.options.enabled,T(this,me))===!1||!Yd(T(this,It))||T(this,It)===0)&&K(this,Aa,setInterval(()=>{(this.options.refetchIntervalInBackground||$p.isFocused())&&de(this,ye,ws).call(this)},T(this,It)))},tm=function(){de(this,ye,em).call(this),de(this,ye,nm).call(this,de(this,ye,rm).call(this))},am=function(){T(this,za)&&(clearTimeout(T(this,za)),K(this,za,void 0))},om=function(){T(this,Aa)&&(clearInterval(T(this,Aa)),K(this,Aa,void 0))},sm=function(){const r=T(this,Cr).getQueryCache().build(T(this,Cr),this.options);if(r===T(this,me))return;const n=T(this,me);K(this,me,r),K(this,di,r.state),this.hasListeners()&&(n==null||n.removeObserver(this),r.addObserver(this))},A0=function(r){rr.batch(()=>{r.listeners&&this.listeners.forEach(n=>{n(T(this,fr))}),T(this,Cr).getQueryCache().notify({query:T(this,me),type:"observerResultsUpdated"})})},Fv);function H2(e,r){return Jr(r.enabled,e)!==!1&&e.state.data===void 0&&!(e.state.status==="error"&&r.retryOnMount===!1)}function xg(e,r){return H2(e,r)||e.state.data!==void 0&&im(e,r,r.refetchOnMount)}function im(e,r,n){if(Jr(r.enabled,e)!==!1&&Gt(r.staleTime,e)!=="static"){const t=typeof n=="function"?n(e):n;return t==="always"||t!==!1&&Up(e,r)}return!1}function yg(e,r,n,t){return(e!==r||Jr(t.enabled,e)===!1)&&(!n.suspense||e.state.status!=="error")&&Up(e,n)}function Up(e,r){return Jr(r.enabled,e)!==!1&&e.isStaleByTime(Gt(r.staleTime,e))}function Q2(e,r){return!Kd(e.getCurrentResult(),r)}var q0=x.createContext(void 0),W2=e=>{const r=x.useContext(q0);if(!r)throw new Error("No QueryClient set, use QueryClientProvider to set one");return r},G2=({client:e,children:r})=>(x.useEffect(()=>(e.mount(),()=>{e.unmount()}),[e]),i.jsx(q0.Provider,{value:e,children:r})),R0=x.createContext(!1),Y2=()=>x.useContext(R0);R0.Provider;function K2(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}var X2=x.createContext(K2()),J2=()=>x.useContext(X2),Z2=(e,r)=>{(e.suspense||e.throwOnError||e.experimental_prefetchInRender)&&(r.isReset()||(e.retryOnMount=!1))},eP=e=>{x.useEffect(()=>{e.clearReset()},[e])},rP=({result:e,errorResetBoundary:r,throwOnError:n,query:t,suspense:a})=>e.isError&&!r.isReset()&&!e.isFetching&&t&&(a&&e.data===void 0||z2(n,[e.error,t])),nP=e=>{if(e.suspense){const r=t=>t==="static"?t:Math.max(t??1e3,1e3),n=e.staleTime;e.staleTime=typeof n=="function"?(...t)=>r(n(...t)):r(n),typeof e.gcTime=="number"&&(e.gcTime=Math.max(e.gcTime,1e3))}},tP=(e,r)=>e.isLoading&&e.isFetching&&!r,aP=(e,r)=>(e==null?void 0:e.suspense)&&r.isPending,bg=(e,r,n)=>r.fetchOptimistic(e).catch(()=>{n.clearReset()});function oP(e,r,n){var m,f,p,y,g;const t=Y2(),a=J2(),o=W2(),s=o.defaultQueryOptions(e);(f=(m=o.getDefaultOptions().queries)==null?void 0:m._experimental_beforeQuery)==null||f.call(m,s),s._optimisticResults=t?"isRestoring":"optimistic",nP(s),Z2(s,a),eP(a);const l=!o.getQueryCache().get(s.queryHash),[c]=x.useState(()=>new r(o,s)),u=c.getOptimisticResult(s),d=!t&&e.subscribed!==!1;if(x.useSyncExternalStore(x.useCallback(b=>{const h=d?c.subscribe(rr.batchCalls(b)):Er;return c.updateResult(),h},[c,d]),()=>c.getCurrentResult(),()=>c.getCurrentResult()),x.useEffect(()=>{c.setOptions(s)},[s,c]),aP(s,u))throw bg(s,c,a);if(rP({result:u,errorResetBoundary:a,throwOnError:s.throwOnError,query:o.getQueryCache().get(s.queryHash),suspense:s.suspense}))throw u.error;if((y=(p=o.getDefaultOptions().queries)==null?void 0:p._experimental_afterQuery)==null||y.call(p,s,u),s.experimental_prefetchInRender&&!Ba&&tP(u,t)){const b=l?bg(s,c,a):(g=o.getQueryCache().get(s.queryHash))==null?void 0:g.promise;b==null||b.catch(Er).finally(()=>{c.updateResult()})}return s.notifyOnChangeProps?u:c.trackResult(u)}function _0(e,r){return oP(e,V2)}/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function oi(){return oi=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},oi.apply(this,arguments)}var Ft;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Ft||(Ft={}));const wg="popstate";function sP(e){e===void 0&&(e={});function r(t,a){let{pathname:o,search:s,hash:l}=t.location;return lm("",{pathname:o,search:s,hash:l},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function n(t,a){return typeof a=="string"?a:Zl(a)}return lP(r,n,null,e)}function He(e,r){if(e===!1||e===null||typeof e>"u")throw new Error(r)}function O0(e,r){if(!e){typeof console<"u"&&console.warn(r);try{throw new Error(r)}catch{}}}function iP(){return Math.random().toString(36).substr(2,8)}function jg(e,r){return{usr:e.state,key:e.key,idx:r}}function lm(e,r,n,t){return n===void 0&&(n=null),oi({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof r=="string"?Zo(r):r,{state:n,key:r&&r.key||t||iP()})}function Zl(e){let{pathname:r="/",search:n="",hash:t=""}=e;return n&&n!=="?"&&(r+=n.charAt(0)==="?"?n:"?"+n),t&&t!=="#"&&(r+=t.charAt(0)==="#"?t:"#"+t),r}function Zo(e){let r={};if(e){let n=e.indexOf("#");n>=0&&(r.hash=e.substr(n),e=e.substr(0,n));let t=e.indexOf("?");t>=0&&(r.search=e.substr(t),e=e.substr(0,t)),e&&(r.pathname=e)}return r}function lP(e,r,n,t){t===void 0&&(t={});let{window:a=document.defaultView,v5Compat:o=!1}=t,s=a.history,l=Ft.Pop,c=null,u=d();u==null&&(u=0,s.replaceState(oi({},s.state,{idx:u}),""));function d(){return(s.state||{idx:null}).idx}function m(){l=Ft.Pop;let b=d(),h=b==null?null:b-u;u=b,c&&c({action:l,location:g.location,delta:h})}function f(b,h){l=Ft.Push;let v=lm(g.location,b,h);u=d()+1;let w=jg(v,u),j=g.createHref(v);try{s.pushState(w,"",j)}catch(E){if(E instanceof DOMException&&E.name==="DataCloneError")throw E;a.location.assign(j)}o&&c&&c({action:l,location:g.location,delta:1})}function p(b,h){l=Ft.Replace;let v=lm(g.location,b,h);u=d();let w=jg(v,u),j=g.createHref(v);s.replaceState(w,"",j),o&&c&&c({action:l,location:g.location,delta:0})}function y(b){let h=a.location.origin!=="null"?a.location.origin:a.location.href,v=typeof b=="string"?b:Zl(b);return v=v.replace(/ $/,"%20"),He(h,"No window.location.(origin|href) available to create URL for href: "+v),new URL(v,h)}let g={get action(){return l},get location(){return e(a,s)},listen(b){if(c)throw new Error("A history only accepts one active listener");return a.addEventListener(wg,m),c=b,()=>{a.removeEventListener(wg,m),c=null}},createHref(b){return r(a,b)},createURL:y,encodeLocation(b){let h=y(b);return{pathname:h.pathname,search:h.search,hash:h.hash}},push:f,replace:p,go(b){return s.go(b)}};return g}var Sg;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Sg||(Sg={}));function cP(e,r,n){return n===void 0&&(n="/"),uP(e,r,n,!1)}function uP(e,r,n,t){let a=typeof r=="string"?Zo(r):r,o=Vp(a.pathname||"/",n);if(o==null)return null;let s=I0(e);dP(s);let l=null;for(let c=0;l==null&&c<s.length;++c){let u=jP(o);l=bP(s[c],u,t)}return l}function I0(e,r,n,t){r===void 0&&(r=[]),n===void 0&&(n=[]),t===void 0&&(t="");let a=(o,s,l)=>{let c={relativePath:l===void 0?o.path||"":l,caseSensitive:o.caseSensitive===!0,childrenIndex:s,route:o};c.relativePath.startsWith("/")&&(He(c.relativePath.startsWith(t),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+t+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(t.length));let u=Yt([t,c.relativePath]),d=n.concat(c);o.children&&o.children.length>0&&(He(o.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),I0(o.children,r,d,u)),!(o.path==null&&!o.index)&&r.push({path:u,score:xP(u,o.index),routesMeta:d})};return e.forEach((o,s)=>{var l;if(o.path===""||!((l=o.path)!=null&&l.includes("?")))a(o,s);else for(let c of M0(o.path))a(o,s,c)}),r}function M0(e){let r=e.split("/");if(r.length===0)return[];let[n,...t]=r,a=n.endsWith("?"),o=n.replace(/\?$/,"");if(t.length===0)return a?[o,""]:[o];let s=M0(t.join("/")),l=[];return l.push(...s.map(c=>c===""?o:[o,c].join("/"))),a&&l.push(...s),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function dP(e){e.sort((r,n)=>r.score!==n.score?n.score-r.score:yP(r.routesMeta.map(t=>t.childrenIndex),n.routesMeta.map(t=>t.childrenIndex)))}const mP=/^:[\w-]+$/,pP=3,fP=2,hP=1,gP=10,vP=-2,Cg=e=>e==="*";function xP(e,r){let n=e.split("/"),t=n.length;return n.some(Cg)&&(t+=vP),r&&(t+=fP),n.filter(a=>!Cg(a)).reduce((a,o)=>a+(mP.test(o)?pP:o===""?hP:gP),t)}function yP(e,r){return e.length===r.length&&e.slice(0,-1).every((t,a)=>t===r[a])?e[e.length-1]-r[r.length-1]:0}function bP(e,r,n){let{routesMeta:t}=e,a={},o="/",s=[];for(let l=0;l<t.length;++l){let c=t[l],u=l===t.length-1,d=o==="/"?r:r.slice(o.length)||"/",m=Ng({path:c.relativePath,caseSensitive:c.caseSensitive,end:u},d),f=c.route;if(!m&&u&&n&&!t[t.length-1].route.index&&(m=Ng({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},d)),!m)return null;Object.assign(a,m.params),s.push({params:a,pathname:Yt([o,m.pathname]),pathnameBase:EP(Yt([o,m.pathnameBase])),route:f}),m.pathnameBase!=="/"&&(o=Yt([o,m.pathnameBase]))}return s}function Ng(e,r){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,t]=wP(e.path,e.caseSensitive,e.end),a=r.match(n);if(!a)return null;let o=a[0],s=o.replace(/(.)\/+$/,"$1"),l=a.slice(1);return{params:t.reduce((u,d,m)=>{let{paramName:f,isOptional:p}=d;if(f==="*"){let g=l[m]||"";s=o.slice(0,o.length-g.length).replace(/(.)\/+$/,"$1")}const y=l[m];return p&&!y?u[f]=void 0:u[f]=(y||"").replace(/%2F/g,"/"),u},{}),pathname:o,pathnameBase:s,pattern:e}}function wP(e,r,n){r===void 0&&(r=!1),n===void 0&&(n=!0),O0(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let t=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(s,l,c)=>(t.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(t.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,r?void 0:"i"),t]}function jP(e){try{return e.split("/").map(r=>decodeURIComponent(r).replace(/\//g,"%2F")).join("/")}catch(r){return O0(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+r+").")),e}}function Vp(e,r){if(r==="/")return e;if(!e.toLowerCase().startsWith(r.toLowerCase()))return null;let n=r.endsWith("/")?r.length-1:r.length,t=e.charAt(n);return t&&t!=="/"?null:e.slice(n)||"/"}function SP(e,r){r===void 0&&(r="/");let{pathname:n,search:t="",hash:a=""}=typeof e=="string"?Zo(e):e;return{pathname:n?n.startsWith("/")?n:CP(n,r):r,search:kP(t),hash:PP(a)}}function CP(e,r){let n=r.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function Tu(e,r,n,t){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+r+"` field ["+JSON.stringify(t)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function NP(e){return e.filter((r,n)=>n===0||r.route.path&&r.route.path.length>0)}function L0(e,r){let n=NP(e);return r?n.map((t,a)=>a===n.length-1?t.pathname:t.pathnameBase):n.map(t=>t.pathnameBase)}function F0(e,r,n,t){t===void 0&&(t=!1);let a;typeof e=="string"?a=Zo(e):(a=oi({},e),He(!a.pathname||!a.pathname.includes("?"),Tu("?","pathname","search",a)),He(!a.pathname||!a.pathname.includes("#"),Tu("#","pathname","hash",a)),He(!a.search||!a.search.includes("#"),Tu("#","search","hash",a)));let o=e===""||a.pathname==="",s=o?"/":a.pathname,l;if(s==null)l=n;else{let m=r.length-1;if(!t&&s.startsWith("..")){let f=s.split("/");for(;f[0]==="..";)f.shift(),m-=1;a.pathname=f.join("/")}l=m>=0?r[m]:"/"}let c=SP(a,l),u=s&&s!=="/"&&s.endsWith("/"),d=(o||s===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(u||d)&&(c.pathname+="/"),c}const Yt=e=>e.join("/").replace(/\/\/+/g,"/"),EP=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),kP=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,PP=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function TP(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const D0=["post","put","patch","delete"];new Set(D0);const zP=["get",...D0];new Set(zP);/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function si(){return si=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},si.apply(this,arguments)}const Hp=x.createContext(null),AP=x.createContext(null),Ha=x.createContext(null),Ac=x.createContext(null),ia=x.createContext({outlet:null,matches:[],isDataRoute:!1}),B0=x.createContext(null);function qP(e,r){let{relative:n}=r===void 0?{}:r;Si()||He(!1);let{basename:t,navigator:a}=x.useContext(Ha),{hash:o,pathname:s,search:l}=U0(e,{relative:n}),c=s;return t!=="/"&&(c=s==="/"?t:Yt([t,s])),a.createHref({pathname:c,search:l,hash:o})}function Si(){return x.useContext(Ac)!=null}function la(){return Si()||He(!1),x.useContext(Ac).location}function $0(e){x.useContext(Ha).static||x.useLayoutEffect(e)}function Qp(){let{isDataRoute:e}=x.useContext(ia);return e?QP():RP()}function RP(){Si()||He(!1);let e=x.useContext(Hp),{basename:r,future:n,navigator:t}=x.useContext(Ha),{matches:a}=x.useContext(ia),{pathname:o}=la(),s=JSON.stringify(L0(a,n.v7_relativeSplatPath)),l=x.useRef(!1);return $0(()=>{l.current=!0}),x.useCallback(function(u,d){if(d===void 0&&(d={}),!l.current)return;if(typeof u=="number"){t.go(u);return}let m=F0(u,JSON.parse(s),o,d.relative==="path");e==null&&r!=="/"&&(m.pathname=m.pathname==="/"?r:Yt([r,m.pathname])),(d.replace?t.replace:t.push)(m,d.state,d)},[r,t,s,o,e])}function _P(){let{matches:e}=x.useContext(ia),r=e[e.length-1];return r?r.params:{}}function U0(e,r){let{relative:n}=r===void 0?{}:r,{future:t}=x.useContext(Ha),{matches:a}=x.useContext(ia),{pathname:o}=la(),s=JSON.stringify(L0(a,t.v7_relativeSplatPath));return x.useMemo(()=>F0(e,JSON.parse(s),o,n==="path"),[e,s,o,n])}function OP(e,r){return IP(e,r)}function IP(e,r,n,t){Si()||He(!1);let{navigator:a}=x.useContext(Ha),{matches:o}=x.useContext(ia),s=o[o.length-1],l=s?s.params:{};s&&s.pathname;let c=s?s.pathnameBase:"/";s&&s.route;let u=la(),d;if(r){var m;let b=typeof r=="string"?Zo(r):r;c==="/"||(m=b.pathname)!=null&&m.startsWith(c)||He(!1),d=b}else d=u;let f=d.pathname||"/",p=f;if(c!=="/"){let b=c.replace(/^\//,"").split("/");p="/"+f.replace(/^\//,"").split("/").slice(b.length).join("/")}let y=cP(e,{pathname:p}),g=BP(y&&y.map(b=>Object.assign({},b,{params:Object.assign({},l,b.params),pathname:Yt([c,a.encodeLocation?a.encodeLocation(b.pathname).pathname:b.pathname]),pathnameBase:b.pathnameBase==="/"?c:Yt([c,a.encodeLocation?a.encodeLocation(b.pathnameBase).pathname:b.pathnameBase])})),o,n,t);return r&&g?x.createElement(Ac.Provider,{value:{location:si({pathname:"/",search:"",hash:"",state:null,key:"default"},d),navigationType:Ft.Pop}},g):g}function MP(){let e=HP(),r=TP(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return x.createElement(x.Fragment,null,x.createElement("h2",null,"Unexpected Application Error!"),x.createElement("h3",{style:{fontStyle:"italic"}},r),n?x.createElement("pre",{style:a},n):null,null)}const LP=x.createElement(MP,null);class FP extends x.Component{constructor(r){super(r),this.state={location:r.location,revalidation:r.revalidation,error:r.error}}static getDerivedStateFromError(r){return{error:r}}static getDerivedStateFromProps(r,n){return n.location!==r.location||n.revalidation!=="idle"&&r.revalidation==="idle"?{error:r.error,location:r.location,revalidation:r.revalidation}:{error:r.error!==void 0?r.error:n.error,location:n.location,revalidation:r.revalidation||n.revalidation}}componentDidCatch(r,n){console.error("React Router caught the following error during render",r,n)}render(){return this.state.error!==void 0?x.createElement(ia.Provider,{value:this.props.routeContext},x.createElement(B0.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function DP(e){let{routeContext:r,match:n,children:t}=e,a=x.useContext(Hp);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),x.createElement(ia.Provider,{value:r},t)}function BP(e,r,n,t){var a;if(r===void 0&&(r=[]),n===void 0&&(n=null),t===void 0&&(t=null),e==null){var o;if(!n)return null;if(n.errors)e=n.matches;else if((o=t)!=null&&o.v7_partialHydration&&r.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let s=e,l=(a=n)==null?void 0:a.errors;if(l!=null){let d=s.findIndex(m=>m.route.id&&(l==null?void 0:l[m.route.id])!==void 0);d>=0||He(!1),s=s.slice(0,Math.min(s.length,d+1))}let c=!1,u=-1;if(n&&t&&t.v7_partialHydration)for(let d=0;d<s.length;d++){let m=s[d];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(u=d),m.route.id){let{loaderData:f,errors:p}=n,y=m.route.loader&&f[m.route.id]===void 0&&(!p||p[m.route.id]===void 0);if(m.route.lazy||y){c=!0,u>=0?s=s.slice(0,u+1):s=[s[0]];break}}}return s.reduceRight((d,m,f)=>{let p,y=!1,g=null,b=null;n&&(p=l&&m.route.id?l[m.route.id]:void 0,g=m.route.errorElement||LP,c&&(u<0&&f===0?(y=!0,b=null):u===f&&(y=!0,b=m.route.hydrateFallbackElement||null)));let h=r.concat(s.slice(0,f+1)),v=()=>{let w;return p?w=g:y?w=b:m.route.Component?w=x.createElement(m.route.Component,null):m.route.element?w=m.route.element:w=d,x.createElement(DP,{match:m,routeContext:{outlet:d,matches:h,isDataRoute:n!=null},children:w})};return n&&(m.route.ErrorBoundary||m.route.errorElement||f===0)?x.createElement(FP,{location:n.location,revalidation:n.revalidation,component:g,error:p,children:v(),routeContext:{outlet:null,matches:h,isDataRoute:!0}}):v()},null)}var V0=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(V0||{}),ec=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(ec||{});function $P(e){let r=x.useContext(Hp);return r||He(!1),r}function UP(e){let r=x.useContext(AP);return r||He(!1),r}function VP(e){let r=x.useContext(ia);return r||He(!1),r}function H0(e){let r=VP(),n=r.matches[r.matches.length-1];return n.route.id||He(!1),n.route.id}function HP(){var e;let r=x.useContext(B0),n=UP(ec.UseRouteError),t=H0(ec.UseRouteError);return r!==void 0?r:(e=n.errors)==null?void 0:e[t]}function QP(){let{router:e}=$P(V0.UseNavigateStable),r=H0(ec.UseNavigateStable),n=x.useRef(!1);return $0(()=>{n.current=!0}),x.useCallback(function(a,o){o===void 0&&(o={}),n.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,si({fromRouteId:r},o)))},[e,r])}function WP(e,r){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function Je(e){He(!1)}function GP(e){let{basename:r="/",children:n=null,location:t,navigationType:a=Ft.Pop,navigator:o,static:s=!1,future:l}=e;Si()&&He(!1);let c=r.replace(/^\/*/,"/"),u=x.useMemo(()=>({basename:c,navigator:o,static:s,future:si({v7_relativeSplatPath:!1},l)}),[c,l,o,s]);typeof t=="string"&&(t=Zo(t));let{pathname:d="/",search:m="",hash:f="",state:p=null,key:y="default"}=t,g=x.useMemo(()=>{let b=Vp(d,c);return b==null?null:{location:{pathname:b,search:m,hash:f,state:p,key:y},navigationType:a}},[c,d,m,f,p,y,a]);return g==null?null:x.createElement(Ha.Provider,{value:u},x.createElement(Ac.Provider,{children:n,value:g}))}function YP(e){let{children:r,location:n}=e;return OP(cm(r),n)}new Promise(()=>{});function cm(e,r){r===void 0&&(r=[]);let n=[];return x.Children.forEach(e,(t,a)=>{if(!x.isValidElement(t))return;let o=[...r,a];if(t.type===x.Fragment){n.push.apply(n,cm(t.props.children,o));return}t.type!==Je&&He(!1),!t.props.index||!t.props.children||He(!1);let s={id:t.props.id||o.join("-"),caseSensitive:t.props.caseSensitive,element:t.props.element,Component:t.props.Component,index:t.props.index,path:t.props.path,loader:t.props.loader,action:t.props.action,errorElement:t.props.errorElement,ErrorBoundary:t.props.ErrorBoundary,hasErrorBoundary:t.props.ErrorBoundary!=null||t.props.errorElement!=null,shouldRevalidate:t.props.shouldRevalidate,handle:t.props.handle,lazy:t.props.lazy};t.props.children&&(s.children=cm(t.props.children,o)),n.push(s)}),n}/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function um(){return um=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},um.apply(this,arguments)}function KP(e,r){if(e==null)return{};var n={},t=Object.keys(e),a,o;for(o=0;o<t.length;o++)a=t[o],!(r.indexOf(a)>=0)&&(n[a]=e[a]);return n}function XP(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function JP(e,r){return e.button===0&&(!r||r==="_self")&&!XP(e)}function dm(e){return e===void 0&&(e=""),new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((r,n)=>{let t=e[n];return r.concat(Array.isArray(t)?t.map(a=>[n,a]):[[n,t]])},[]))}function ZP(e,r){let n=dm(e);return r&&r.forEach((t,a)=>{n.has(a)||r.getAll(a).forEach(o=>{n.append(a,o)})}),n}const eT=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],rT="6";try{window.__reactRouterVersion=rT}catch{}const nT="startTransition",Eg=qm[nT];function tT(e){let{basename:r,children:n,future:t,window:a}=e,o=x.useRef();o.current==null&&(o.current=sP({window:a,v5Compat:!0}));let s=o.current,[l,c]=x.useState({action:s.action,location:s.location}),{v7_startTransition:u}=t||{},d=x.useCallback(m=>{u&&Eg?Eg(()=>c(m)):c(m)},[c,u]);return x.useLayoutEffect(()=>s.listen(d),[s,d]),x.useEffect(()=>WP(t),[t]),x.createElement(GP,{basename:r,children:n,location:l.location,navigationType:l.action,navigator:s,future:t})}const aT=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",oT=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,cr=x.forwardRef(function(r,n){let{onClick:t,relative:a,reloadDocument:o,replace:s,state:l,target:c,to:u,preventScrollReset:d,viewTransition:m}=r,f=KP(r,eT),{basename:p}=x.useContext(Ha),y,g=!1;if(typeof u=="string"&&oT.test(u)&&(y=u,aT))try{let w=new URL(window.location.href),j=u.startsWith("//")?new URL(w.protocol+u):new URL(u),E=Vp(j.pathname,p);j.origin===w.origin&&E!=null?u=E+j.search+j.hash:g=!0}catch{}let b=qP(u,{relative:a}),h=sT(u,{replace:s,state:l,target:c,preventScrollReset:d,relative:a,viewTransition:m});function v(w){t&&t(w),w.defaultPrevented||h(w)}return x.createElement("a",um({},f,{href:y||b,onClick:g||o?t:v,ref:n,target:c}))});var kg;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(kg||(kg={}));var Pg;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Pg||(Pg={}));function sT(e,r){let{target:n,replace:t,state:a,preventScrollReset:o,relative:s,viewTransition:l}=r===void 0?{}:r,c=Qp(),u=la(),d=U0(e,{relative:s});return x.useCallback(m=>{if(JP(m,n)){m.preventDefault();let f=t!==void 0?t:Zl(u)===Zl(d);c(e,{replace:f,state:a,preventScrollReset:o,relative:s,viewTransition:l})}},[u,c,d,t,a,n,e,o,s,l])}function Q0(e){let r=x.useRef(dm(e)),n=x.useRef(!1),t=la(),a=x.useMemo(()=>ZP(t.search,n.current?null:r.current),[t.search]),o=Qp(),s=x.useCallback((l,c)=>{const u=dm(typeof l=="function"?l(a):l);n.current=!0,o("?"+u,c)},[o,a]);return[a,s]}var W0={exports:{}},iT="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",lT=iT,cT=lT;function G0(){}function Y0(){}Y0.resetWarningCache=G0;var uT=function(){function e(t,a,o,s,l,c){if(c!==cT){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}e.isRequired=e;function r(){return e}var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:r,element:e,elementType:e,instanceOf:r,node:e,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:Y0,resetWarningCache:G0};return n.PropTypes=n,n};W0.exports=uT();var dT=W0.exports;const Ae=na(dT);function mT(e){return e&&typeof e=="object"&&"default"in e?e.default:e}var K0=x,pT=mT(K0);function Tg(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function fT(e,r){e.prototype=Object.create(r.prototype),e.prototype.constructor=e,e.__proto__=r}var hT=!!(typeof window<"u"&&window.document&&window.document.createElement);function gT(e,r,n){if(typeof e!="function")throw new Error("Expected reducePropsToState to be a function.");if(typeof r!="function")throw new Error("Expected handleStateChangeOnClient to be a function.");if(typeof n<"u"&&typeof n!="function")throw new Error("Expected mapStateOnServer to either be undefined or a function.");function t(a){return a.displayName||a.name||"Component"}return function(o){if(typeof o!="function")throw new Error("Expected WrappedComponent to be a React component.");var s=[],l;function c(){l=e(s.map(function(d){return d.props})),u.canUseDOM?r(l):n&&(l=n(l))}var u=function(d){fT(m,d);function m(){return d.apply(this,arguments)||this}m.peek=function(){return l},m.rewind=function(){if(m.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var y=l;return l=void 0,s=[],y};var f=m.prototype;return f.UNSAFE_componentWillMount=function(){s.push(this),c()},f.componentDidUpdate=function(){c()},f.componentWillUnmount=function(){var y=s.indexOf(this);s.splice(y,1),c()},f.render=function(){return pT.createElement(o,this.props)},m}(K0.PureComponent);return Tg(u,"displayName","SideEffect("+t(o)+")"),Tg(u,"canUseDOM",hT),u}}var vT=gT;const xT=na(vT);var yT=typeof Element<"u",bT=typeof Map=="function",wT=typeof Set=="function",jT=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function vl(e,r){if(e===r)return!0;if(e&&r&&typeof e=="object"&&typeof r=="object"){if(e.constructor!==r.constructor)return!1;var n,t,a;if(Array.isArray(e)){if(n=e.length,n!=r.length)return!1;for(t=n;t--!==0;)if(!vl(e[t],r[t]))return!1;return!0}var o;if(bT&&e instanceof Map&&r instanceof Map){if(e.size!==r.size)return!1;for(o=e.entries();!(t=o.next()).done;)if(!r.has(t.value[0]))return!1;for(o=e.entries();!(t=o.next()).done;)if(!vl(t.value[1],r.get(t.value[0])))return!1;return!0}if(wT&&e instanceof Set&&r instanceof Set){if(e.size!==r.size)return!1;for(o=e.entries();!(t=o.next()).done;)if(!r.has(t.value[0]))return!1;return!0}if(jT&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(r)){if(n=e.length,n!=r.length)return!1;for(t=n;t--!==0;)if(e[t]!==r[t])return!1;return!0}if(e.constructor===RegExp)return e.source===r.source&&e.flags===r.flags;if(e.valueOf!==Object.prototype.valueOf&&typeof e.valueOf=="function"&&typeof r.valueOf=="function")return e.valueOf()===r.valueOf();if(e.toString!==Object.prototype.toString&&typeof e.toString=="function"&&typeof r.toString=="function")return e.toString()===r.toString();if(a=Object.keys(e),n=a.length,n!==Object.keys(r).length)return!1;for(t=n;t--!==0;)if(!Object.prototype.hasOwnProperty.call(r,a[t]))return!1;if(yT&&e instanceof Element)return!1;for(t=n;t--!==0;)if(!((a[t]==="_owner"||a[t]==="__v"||a[t]==="__o")&&e.$$typeof)&&!vl(e[a[t]],r[a[t]]))return!1;return!0}return e!==e&&r!==r}var ST=function(r,n){try{return vl(r,n)}catch(t){if((t.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw t}};const CT=na(ST);/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var zg=Object.getOwnPropertySymbols,NT=Object.prototype.hasOwnProperty,ET=Object.prototype.propertyIsEnumerable;function kT(e){if(e==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function PT(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de",Object.getOwnPropertyNames(e)[0]==="5")return!1;for(var r={},n=0;n<10;n++)r["_"+String.fromCharCode(n)]=n;var t=Object.getOwnPropertyNames(r).map(function(o){return r[o]});if(t.join("")!=="0123456789")return!1;var a={};return"abcdefghijklmnopqrst".split("").forEach(function(o){a[o]=o}),Object.keys(Object.assign({},a)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}var TT=PT()?Object.assign:function(e,r){for(var n,t=kT(e),a,o=1;o<arguments.length;o++){n=Object(arguments[o]);for(var s in n)NT.call(n,s)&&(t[s]=n[s]);if(zg){a=zg(n);for(var l=0;l<a.length;l++)ET.call(n,a[l])&&(t[a[l]]=n[a[l]])}}return t};const zT=na(TT);var _a={BODY:"bodyAttributes",HTML:"htmlAttributes",TITLE:"titleAttributes"},oe={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"};Object.keys(oe).map(function(e){return oe[e]});var qe={CHARSET:"charset",CSS_TEXT:"cssText",HREF:"href",HTTPEQUIV:"http-equiv",INNER_HTML:"innerHTML",ITEM_PROP:"itemprop",NAME:"name",PROPERTY:"property",REL:"rel",SRC:"src",TARGET:"target"},rc={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},ii={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate"},AT=Object.keys(rc).reduce(function(e,r){return e[rc[r]]=r,e},{}),qT=[oe.NOSCRIPT,oe.SCRIPT,oe.STYLE],wn="data-react-helmet",RT=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_T=function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")},OT=function(){function e(r,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(r,a.key,a)}}return function(r,n,t){return n&&e(r.prototype,n),t&&e(r,t),r}}(),jr=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},IT=function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)},Ag=function(e,r){var n={};for(var t in e)r.indexOf(t)>=0||Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n},MT=function(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r&&(typeof r=="object"||typeof r=="function")?r:e},mm=function(r){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return n===!1?String(r):String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},LT=function(r){var n=bo(r,oe.TITLE),t=bo(r,ii.TITLE_TEMPLATE);if(t&&n)return t.replace(/%s/g,function(){return Array.isArray(n)?n.join(""):n});var a=bo(r,ii.DEFAULT_TITLE);return n||a||void 0},FT=function(r){return bo(r,ii.ON_CHANGE_CLIENT_STATE)||function(){}},zu=function(r,n){return n.filter(function(t){return typeof t[r]<"u"}).map(function(t){return t[r]}).reduce(function(t,a){return jr({},t,a)},{})},DT=function(r,n){return n.filter(function(t){return typeof t[oe.BASE]<"u"}).map(function(t){return t[oe.BASE]}).reverse().reduce(function(t,a){if(!t.length)for(var o=Object.keys(a),s=0;s<o.length;s++){var l=o[s],c=l.toLowerCase();if(r.indexOf(c)!==-1&&a[c])return t.concat(a)}return t},[])},ps=function(r,n,t){var a={};return t.filter(function(o){return Array.isArray(o[r])?!0:(typeof o[r]<"u"&&VT("Helmet: "+r+' should be of type "Array". Instead found type "'+RT(o[r])+'"'),!1)}).map(function(o){return o[r]}).reverse().reduce(function(o,s){var l={};s.filter(function(f){for(var p=void 0,y=Object.keys(f),g=0;g<y.length;g++){var b=y[g],h=b.toLowerCase();n.indexOf(h)!==-1&&!(p===qe.REL&&f[p].toLowerCase()==="canonical")&&!(h===qe.REL&&f[h].toLowerCase()==="stylesheet")&&(p=h),n.indexOf(b)!==-1&&(b===qe.INNER_HTML||b===qe.CSS_TEXT||b===qe.ITEM_PROP)&&(p=b)}if(!p||!f[p])return!1;var v=f[p].toLowerCase();return a[p]||(a[p]={}),l[p]||(l[p]={}),a[p][v]?!1:(l[p][v]=!0,!0)}).reverse().forEach(function(f){return o.push(f)});for(var c=Object.keys(l),u=0;u<c.length;u++){var d=c[u],m=zT({},a[d],l[d]);a[d]=m}return o},[]).reverse()},bo=function(r,n){for(var t=r.length-1;t>=0;t--){var a=r[t];if(a.hasOwnProperty(n))return a[n]}return null},BT=function(r){return{baseTag:DT([qe.HREF,qe.TARGET],r),bodyAttributes:zu(_a.BODY,r),defer:bo(r,ii.DEFER),encode:bo(r,ii.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:zu(_a.HTML,r),linkTags:ps(oe.LINK,[qe.REL,qe.HREF],r),metaTags:ps(oe.META,[qe.NAME,qe.CHARSET,qe.HTTPEQUIV,qe.PROPERTY,qe.ITEM_PROP],r),noscriptTags:ps(oe.NOSCRIPT,[qe.INNER_HTML],r),onChangeClientState:FT(r),scriptTags:ps(oe.SCRIPT,[qe.SRC,qe.INNER_HTML],r),styleTags:ps(oe.STYLE,[qe.CSS_TEXT],r),title:LT(r),titleAttributes:zu(_a.TITLE,r)}},pm=function(){var e=Date.now();return function(r){var n=Date.now();n-e>16?(e=n,r(n)):setTimeout(function(){pm(r)},0)}}(),qg=function(r){return clearTimeout(r)},$T=typeof window<"u"?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||pm:global.requestAnimationFrame||pm,UT=typeof window<"u"?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||qg:global.cancelAnimationFrame||qg,VT=function(r){return console&&typeof console.warn=="function"&&console.warn(r)},fs=null,HT=function(r){fs&&UT(fs),r.defer?fs=$T(function(){Rg(r,function(){fs=null})}):(Rg(r),fs=null)},Rg=function(r,n){var t=r.baseTag,a=r.bodyAttributes,o=r.htmlAttributes,s=r.linkTags,l=r.metaTags,c=r.noscriptTags,u=r.onChangeClientState,d=r.scriptTags,m=r.styleTags,f=r.title,p=r.titleAttributes;fm(oe.BODY,a),fm(oe.HTML,o),QT(f,p);var y={baseTag:Ya(oe.BASE,t),linkTags:Ya(oe.LINK,s),metaTags:Ya(oe.META,l),noscriptTags:Ya(oe.NOSCRIPT,c),scriptTags:Ya(oe.SCRIPT,d),styleTags:Ya(oe.STYLE,m)},g={},b={};Object.keys(y).forEach(function(h){var v=y[h],w=v.newTags,j=v.oldTags;w.length&&(g[h]=w),j.length&&(b[h]=y[h].oldTags)}),n&&n(),u(r,g,b)},X0=function(r){return Array.isArray(r)?r.join(""):r},QT=function(r,n){typeof r<"u"&&document.title!==r&&(document.title=X0(r)),fm(oe.TITLE,n)},fm=function(r,n){var t=document.getElementsByTagName(r)[0];if(t){for(var a=t.getAttribute(wn),o=a?a.split(","):[],s=[].concat(o),l=Object.keys(n),c=0;c<l.length;c++){var u=l[c],d=n[u]||"";t.getAttribute(u)!==d&&t.setAttribute(u,d),o.indexOf(u)===-1&&o.push(u);var m=s.indexOf(u);m!==-1&&s.splice(m,1)}for(var f=s.length-1;f>=0;f--)t.removeAttribute(s[f]);o.length===s.length?t.removeAttribute(wn):t.getAttribute(wn)!==l.join(",")&&t.setAttribute(wn,l.join(","))}},Ya=function(r,n){var t=document.head||document.querySelector(oe.HEAD),a=t.querySelectorAll(r+"["+wn+"]"),o=Array.prototype.slice.call(a),s=[],l=void 0;return n&&n.length&&n.forEach(function(c){var u=document.createElement(r);for(var d in c)if(c.hasOwnProperty(d))if(d===qe.INNER_HTML)u.innerHTML=c.innerHTML;else if(d===qe.CSS_TEXT)u.styleSheet?u.styleSheet.cssText=c.cssText:u.appendChild(document.createTextNode(c.cssText));else{var m=typeof c[d]>"u"?"":c[d];u.setAttribute(d,m)}u.setAttribute(wn,"true"),o.some(function(f,p){return l=p,u.isEqualNode(f)})?o.splice(l,1):s.push(u)}),o.forEach(function(c){return c.parentNode.removeChild(c)}),s.forEach(function(c){return t.appendChild(c)}),{oldTags:o,newTags:s}},J0=function(r){return Object.keys(r).reduce(function(n,t){var a=typeof r[t]<"u"?t+'="'+r[t]+'"':""+t;return n?n+" "+a:a},"")},WT=function(r,n,t,a){var o=J0(t),s=X0(n);return o?"<"+r+" "+wn+'="true" '+o+">"+mm(s,a)+"</"+r+">":"<"+r+" "+wn+'="true">'+mm(s,a)+"</"+r+">"},GT=function(r,n,t){return n.reduce(function(a,o){var s=Object.keys(o).filter(function(u){return!(u===qe.INNER_HTML||u===qe.CSS_TEXT)}).reduce(function(u,d){var m=typeof o[d]>"u"?d:d+'="'+mm(o[d],t)+'"';return u?u+" "+m:m},""),l=o.innerHTML||o.cssText||"",c=qT.indexOf(r)===-1;return a+"<"+r+" "+wn+'="true" '+s+(c?"/>":">"+l+"</"+r+">")},"")},Z0=function(r){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return Object.keys(r).reduce(function(t,a){return t[rc[a]||a]=r[a],t},n)},YT=function(r){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return Object.keys(r).reduce(function(t,a){return t[AT[a]||a]=r[a],t},n)},KT=function(r,n,t){var a,o=(a={key:n},a[wn]=!0,a),s=Z0(t,o);return[D.createElement(oe.TITLE,s,n)]},XT=function(r,n){return n.map(function(t,a){var o,s=(o={key:a},o[wn]=!0,o);return Object.keys(t).forEach(function(l){var c=rc[l]||l;if(c===qe.INNER_HTML||c===qe.CSS_TEXT){var u=t.innerHTML||t.cssText;s.dangerouslySetInnerHTML={__html:u}}else s[c]=t[l]}),D.createElement(r,s)})},Jn=function(r,n,t){switch(r){case oe.TITLE:return{toComponent:function(){return KT(r,n.title,n.titleAttributes)},toString:function(){return WT(r,n.title,n.titleAttributes,t)}};case _a.BODY:case _a.HTML:return{toComponent:function(){return Z0(n)},toString:function(){return J0(n)}};default:return{toComponent:function(){return XT(r,n)},toString:function(){return GT(r,n,t)}}}},ew=function(r){var n=r.baseTag,t=r.bodyAttributes,a=r.encode,o=r.htmlAttributes,s=r.linkTags,l=r.metaTags,c=r.noscriptTags,u=r.scriptTags,d=r.styleTags,m=r.title,f=m===void 0?"":m,p=r.titleAttributes;return{base:Jn(oe.BASE,n,a),bodyAttributes:Jn(_a.BODY,t,a),htmlAttributes:Jn(_a.HTML,o,a),link:Jn(oe.LINK,s,a),meta:Jn(oe.META,l,a),noscript:Jn(oe.NOSCRIPT,c,a),script:Jn(oe.SCRIPT,u,a),style:Jn(oe.STYLE,d,a),title:Jn(oe.TITLE,{title:f,titleAttributes:p},a)}},JT=function(r){var n,t;return t=n=function(a){IT(o,a);function o(){return _T(this,o),MT(this,a.apply(this,arguments))}return o.prototype.shouldComponentUpdate=function(l){return!CT(this.props,l)},o.prototype.mapNestedChildrenToProps=function(l,c){if(!c)return null;switch(l.type){case oe.SCRIPT:case oe.NOSCRIPT:return{innerHTML:c};case oe.STYLE:return{cssText:c}}throw new Error("<"+l.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},o.prototype.flattenArrayTypeChildren=function(l){var c,u=l.child,d=l.arrayTypeChildren,m=l.newChildProps,f=l.nestedChildren;return jr({},d,(c={},c[u.type]=[].concat(d[u.type]||[],[jr({},m,this.mapNestedChildrenToProps(u,f))]),c))},o.prototype.mapObjectTypeChildren=function(l){var c,u,d=l.child,m=l.newProps,f=l.newChildProps,p=l.nestedChildren;switch(d.type){case oe.TITLE:return jr({},m,(c={},c[d.type]=p,c.titleAttributes=jr({},f),c));case oe.BODY:return jr({},m,{bodyAttributes:jr({},f)});case oe.HTML:return jr({},m,{htmlAttributes:jr({},f)})}return jr({},m,(u={},u[d.type]=jr({},f),u))},o.prototype.mapArrayTypeChildrenToProps=function(l,c){var u=jr({},c);return Object.keys(l).forEach(function(d){var m;u=jr({},u,(m={},m[d]=l[d],m))}),u},o.prototype.warnOnInvalidChildren=function(l,c){return!0},o.prototype.mapChildrenToProps=function(l,c){var u=this,d={};return D.Children.forEach(l,function(m){if(!(!m||!m.props)){var f=m.props,p=f.children,y=Ag(f,["children"]),g=YT(y);switch(u.warnOnInvalidChildren(m,p),m.type){case oe.LINK:case oe.META:case oe.NOSCRIPT:case oe.SCRIPT:case oe.STYLE:d=u.flattenArrayTypeChildren({child:m,arrayTypeChildren:d,newChildProps:g,nestedChildren:p});break;default:c=u.mapObjectTypeChildren({child:m,newProps:c,newChildProps:g,nestedChildren:p});break}}}),c=this.mapArrayTypeChildrenToProps(d,c),c},o.prototype.render=function(){var l=this.props,c=l.children,u=Ag(l,["children"]),d=jr({},u);return c&&(d=this.mapChildrenToProps(c,d)),D.createElement(r,d)},OT(o,null,[{key:"canUseDOM",set:function(l){r.canUseDOM=l}}]),o}(D.Component),n.propTypes={base:Ae.object,bodyAttributes:Ae.object,children:Ae.oneOfType([Ae.arrayOf(Ae.node),Ae.node]),defaultTitle:Ae.string,defer:Ae.bool,encodeSpecialCharacters:Ae.bool,htmlAttributes:Ae.object,link:Ae.arrayOf(Ae.object),meta:Ae.arrayOf(Ae.object),noscript:Ae.arrayOf(Ae.object),onChangeClientState:Ae.func,script:Ae.arrayOf(Ae.object),style:Ae.arrayOf(Ae.object),title:Ae.string,titleAttributes:Ae.object,titleTemplate:Ae.string},n.defaultProps={defer:!0,encodeSpecialCharacters:!0},n.peek=r.peek,n.rewind=function(){var a=r.rewind();return a||(a=ew({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),a},t},ZT=function(){return null},ez=xT(BT,HT,ew)(ZT),$a=JT(ez);$a.renderStatic=$a.rewind;const rz=({children:e,...r})=>i.jsx(sE,{...r,children:e}),nz=Nc("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),ge=x.forwardRef(({className:e,variant:r,size:n,asChild:t=!1,...a},o)=>{const s=t?hC:"button";return i.jsx(s,{className:fe(nz({variant:r,size:n,className:e})),ref:o,...a})});ge.displayName="Button";const J=x.forwardRef(({className:e,...r},n)=>i.jsx("div",{ref:n,className:fe("rounded-lg border bg-card text-card-foreground shadow-sm",e),...r}));J.displayName="Card";const tz=x.forwardRef(({className:e,...r},n)=>i.jsx("div",{ref:n,className:fe("flex flex-col space-y-1.5 p-6",e),...r}));tz.displayName="CardHeader";const az=x.forwardRef(({className:e,...r},n)=>i.jsx("h3",{ref:n,className:fe("text-2xl font-semibold leading-none tracking-tight",e),...r}));az.displayName="CardTitle";const oz=x.forwardRef(({className:e,...r},n)=>i.jsx("p",{ref:n,className:fe("text-sm text-muted-foreground",e),...r}));oz.displayName="CardDescription";const sz=x.forwardRef(({className:e,...r},n)=>i.jsx("div",{ref:n,className:fe("p-6 pt-0",e),...r}));sz.displayName="CardContent";const iz=x.forwardRef(({className:e,...r},n)=>i.jsx("div",{ref:n,className:fe("flex items-center p-6 pt-0",e),...r}));iz.displayName="CardFooter";const Ci=()=>i.jsx("footer",{className:"border-t border-border mt-12 py-8 bg-card",children:i.jsxs("div",{className:"container mx-auto px-4",children:[i.jsxs("div",{className:"grid md:grid-cols-3 gap-8 mb-6",children:[i.jsxs("div",{children:[i.jsx("h4",{className:"font-semibold mb-2",children:"Futuro Perfeito"}),i.jsx("p",{className:"text-sm text-muted-foreground",children:"Projeto independente, feito por uma pessoa e em constante evolução para mostrar os concursos públicos disponíveis no Brasil e como você pode se preparar."})]}),i.jsxs("div",{children:[i.jsx("h5",{className:"font-semibold mb-3 text-sm",children:"Legal"}),i.jsxs("div",{className:"space-y-2",children:[i.jsx(cr,{to:"/blog",className:"block text-sm text-muted-foreground hover:text-primary transition-colors",children:"Blog"}),i.jsx(cr,{to:"/terms",className:"block text-sm text-muted-foreground hover:text-primary transition-colors",children:"Termos de Uso"}),i.jsx(cr,{to:"/privacy",className:"block text-sm text-muted-foreground hover:text-primary transition-colors",children:"Política de Privacidade"})]})]}),i.jsxs("div",{children:[i.jsx("h5",{className:"font-semibold mb-3 text-sm",children:"Contato"}),i.jsxs("div",{className:"space-y-2 text-sm text-muted-foreground",children:[i.jsx("p",{children:"WhatsApp: (91) 98423-3672"}),i.jsx("a",{href:"https://www.instagram.com/luccaserrao/",target:"_blank",rel:"noreferrer",className:"text-primary hover:underline",children:"Instagram: @luccaserrao"})]})]})]}),i.jsxs("div",{className:"text-center text-sm text-muted-foreground pt-6 border-t border-border",children:["© 2025 Futuro Perfeito. Todos os direitos reservados. Feito por"," ",i.jsx("a",{href:"https://www.instagram.com/luccaserrao/",target:"_blank",rel:"noreferrer",className:"text-primary hover:underline font-semibold",children:"@luccaserrao"}),"."]})]})}),lz=`---\r
title: "Como escolher qual concurso fazer: passo a passo para decidir sem arrependimento"\r
description: "Aprenda um método simples para escolher qual concurso fazer analisando perfil, rotina, pressão e estilo de vida — não apenas salário."\r
slug: "como-escolher-qual-concurso-fazer"\r
date: "2026-01-05"\r
tags: ["concurso publico", "carreira publica", "escolha de concurso", "perfil profissional"]\r
---\r
\r
# Como escolher qual concurso fazer: passo a passo para decidir sem arrependimento\r
\r
Se você está pensando em concurso público, provavelmente já se fez esta pergunta:\r
\r
> **“Com tantas opções, como eu escolho o concurso certo para mim?”**\r
\r
Muita gente começa pelo caminho errado:\r
\r
- olha primeiro o salário,
- segue o que os outros dizem,
- escolhe o que “está na moda”.
\r
Depois passa… e descobre que a rotina não combina.\r
\r
Vamos fazer diferente.\r
\r
---\r
\r
## Regra número 1: concurso certo é o que você consegue sustentar\r
\r
Quando você passa, você ganha estabilidade —  \r
mas também ganha:\r
\r
- um tipo de rotina,
- um tipo de pressão,
- um tipo de ambiente.
\r
E viver anos num cargo que não combina com você é caro emocionalmente.\r
\r
> Escolha pensando na vida que você vai ter — não só no contracheque.\r
\r
---\r
\r
## Passo 1 — Entenda seu perfil de trabalho\r
\r
Responda com sinceridade:\r
\r
- prefiro trabalhar com pessoas ou com tarefas individuais?  \r
- gosto de imprevistos ou de rotina?  \r
- suporto pressão direta?  \r
- gosto de números e análises?  \r
- prefiro ambiente calmo?\r
\r
Essas respostas apontam para áreas mais adequadas.\r
\r
---\r
\r
## Passo 2 — Elimine aquilo que você não quer viver\r
\r
Faça uma lista honesta:\r
\r
- plantões?
- risco físico?
- conflito frequente?
- cobrança pública?
- trabalho solitário demais?
\r
Quanto mais claro isso fica, mais simples é escolher.\r
\r
---\r
\r
## Passo 3 — Compare áreas de concurso (não cargos isolados)\r
\r
### 🗂️ Administrativa  \r
Organização, processos, previsibilidade.\r
\r
### 👥 Atendimento ao público  \r
Comunicação e paciência — pode cansar quem é introvertido.\r
\r
### 🚓 Segurança/policial  \r
Alta pressão e risco. Perfil que gosta de ação.\r
\r
### ⚖️ Tribunais  \r
Trabalho técnico, analítico e detalhista.\r
\r
### 💉 Saúde  \r
Rotina intensa, emocionalmente exigente e com plantões.\r
\r
### 📊 Fiscal/controle  \r
Alta cobrança, muita responsabilidade e foco em números.\r
\r
---\r
\r
## Passo 4 — Pesquise o dia a dia real\r
\r
Não basta assistir depoimentos de aprovação.\r
\r
Procure:\r
\r
- relatos de servidores,
- pontos negativos,
- bastidores.
\r
Pergunte:\r
\r
> “Eu consigo viver isso por anos?”\r
\r
---\r
\r
## Passo 5 — Avalie estilo de vida e prioridades\r
\r
- estabilidade?
- tempo com a família?
- desafio?
- status?
- tranquilidade emocional?
\r
Cada área cobra um preço diferente.\r
\r
---\r
\r
## Passo 6 — Use testes como apoio (não como sentença)\r
\r
Eles ajudam a:\r
\r
- enxergar tendências,
- eliminar opções incompatíveis,
- direcionar melhor seus esforços.
\r
> Teste é bússola — não destino final.\r
\r
---\r
\r
## Onde o Futuro Perfeito entra\r
\r
Nós:\r
\r
- analisamos seu perfil,
- entendemos sua formação,
- avaliamos seu estilo de vida,
- cruzamos com áreas de concurso,
\r
e sugerimos **3 caminhos plausíveis**, com prós e contras.\r
\r
Sem promessas mágicas.  \r
Só clareza.\r
\r
---\r
\r
## Quer decidir com mais segurança?\r
\r
Se quiser:\r
\r
- responder perguntas guiadas,
- entender melhor seu perfil,
- ver concursos que combinam mais com você,
\r
o teste do Futuro Perfeito pode ajudar.\r
`,cz=`---\r
title: "Qual carreira seguir? Guia completo para decidir com mais segurança em 2026"\r
description: "Se você tem dúvidas sobre qual carreira seguir, veja um guia atualizado com análise de mercado, salários, tendências e concursos para decidir com mais segurança."\r
slug: "como-saber-qual-profissao-escolher"
date: "2026-02-05"\r
tags: ["qual carreira seguir", "como escolher uma profissão", "perfil profissional", "teste vocacional", "concurso publico"]\r
---\r
\r
# Qual carreira seguir? Guia completo para decidir com mais segurança em 2026\r
\r
Poucas perguntas geram tanta ansiedade quanto esta:\r
\r
> **“Afinal, qual carreira seguir?”**\r
\r
Essa dúvida é comum em pessoas que:\r
- já trabalham, mas estão insatisfeitas  \r
- sentem que escolheram no automático  \r
- têm medo de errar novamente  \r
\r
A boa notícia é que **hoje existem mais informações e métodos** para decidir melhor — sem achismo.\r
\r
---\r
\r
## Primeiro: carreira não é só profissão — é estilo de vida\r
\r
Quando alguém pergunta *qual profissão seguir*, na prática está perguntando:\r
\r
- como será minha rotina?\r
- terei estabilidade?\r
- lidarei com pressão constante?\r
- meu salário tende a crescer?\r
- essa carreira existe daqui a 10 anos?\r
\r
> Carreira boa é aquela que se sustenta no longo prazo — não só no entusiasmo inicial.\r
\r
---\r
\r
## Como escolher uma profissão olhando para o mercado de trabalho\r
\r
Além do autoconhecimento, é essencial olhar para o **mercado real**.\r
\r
Segundo dados recentes do IBGE e relatórios do mercado de trabalho no Brasil:\r
\r
- áreas administrativas, tecnologia, saúde e setor público seguem com alta demanda  \r
- profissões muito específicas tendem a oscilar mais  \r
- estabilidade e previsibilidade salarial se tornaram fatores decisivos após 2020  \r
\r
### Profissões em alta em 2026 (exemplos)\r
- tecnologia e dados  \r
- saúde e gestão em saúde  \r
- áreas administrativas e de processos  \r
- setor público (nível médio e superior)  \r
\r
Isso não significa escolher só pelo dinheiro —  \r
mas **ignorar o mercado costuma gerar frustração**.\r
\r
---\r
\r
## Qual profissão seguir considerando salário e crescimento\r
\r
Uma pergunta honesta que muita gente tem (e poucos admitem):\r
\r
> “Essa carreira me permitirá crescer financeiramente?”\r
\r
Alguns pontos importantes:\r
- salário inicial não é tudo  \r
- progressão ao longo do tempo importa mais  \r
- previsibilidade pesa mais do que picos de renda  \r
\r
É por isso que muitas pessoas passam a comparar **iniciativa privada x concurso público**.\r
\r
---\r
\r
## Graduação, faculdade e formação: como decidir sem errar\r
\r
Se você ainda pensa em graduação ou especialização, avalie:\r
\r
- reconhecimento pelo MEC  \r
- grade curricular prática  \r
- empregabilidade real  \r
- possibilidade de atuar em diferentes áreas  \r
\r
Muita gente escolhe o curso sem pensar na **rotina profissional real** — e se arrepende depois.\r
\r
---\r
\r
## Tendências de carreira e profissões do futuro\r
\r
O mercado valoriza cada vez mais:\r
- profissionais organizados  \r
- pessoas que lidam bem com processos  \r
- quem entende tecnologia aplicada (não só programação)  \r
- estabilidade emocional e constância  \r
\r
Por isso, carreiras extremamente caóticas tendem a afastar quem busca equilíbrio.\r
\r
---\r
\r
## Qual carreira seguir se você pensa em concurso público\r
\r
Aqui a pergunta muda completamente.\r
\r
Não é:\r
> “Qual concurso paga mais?”\r
\r
Mas sim:\r
> **“Qual tipo de cargo combina com meu perfil?”**\r
\r
Existem concursos com:\r
- rotina administrativa  \r
- atendimento ao público  \r
- trabalho de campo  \r
- funções técnicas  \r
- pressão alta ou baixa  \r
\r
👉 Escolher errado gera arrependimento mesmo após a aprovação.\r
\r
---\r
\r
## Como testes vocacionais ajudam nessa decisão\r
\r
Testes não escolhem por você.  \r
Eles ajudam a:\r
- organizar o pensamento  \r
- identificar padrões de comportamento  \r
- eliminar opções incompatíveis  \r
\r
O teste funciona como **bússola**, não como sentença.\r
\r
---\r
\r
## Exemplos reais (o que acontece na prática)\r
\r
Muitas pessoas que chegam ao Futuro Perfeito:\r
- já têm graduação  \r
- vêm da iniciativa privada  \r
- nunca estudaram para concurso  \r
- querem estabilidade e previsibilidade  \r
\r
Após entenderem melhor seu perfil, conseguem **enxergar caminhos que antes pareciam invisíveis**.\r
\r
---\r
\r
## Erros comuns ao escolher carreira\r
\r
❌ decidir só pelo salário  \r
❌ copiar decisões de amigos  \r
❌ ignorar rotina e pressão  \r
❌ não considerar o mercado  \r
❌ achar que “qualquer carreira dá certo”\r
\r
---\r
\r
## Resumo prático para decidir melhor\r
\r
Antes de escolher, responda:\r
1. Como quero viver?\r
2. Que rotina tolero?\r
3. Que tipo de pressão aceito?\r
4. Quero estabilidade ou risco?\r
5. Esse mercado cresce ou encolhe?\r
\r
---\r
\r
## Como o Futuro Perfeito ajuda nessa escolha\r
\r
O Futuro Perfeito ajuda você a:\r
- entender seu perfil  \r
- cruzar com mercado e carreira  \r
- analisar concursos e setor privado  \r
- enxergar **3 caminhos possíveis**, explicados  \r
\r
Sem promessa mágica.  \r
Com clareza.\r
\r
---\r
\r
## Quer continuar essa conversa?\r
\r
Se quiser:\r
- entender melhor seu perfil  \r
- ver opções reais para você  \r
- evitar escolhas no escuro  \r
\r
O teste do Futuro Perfeito pode ajudar.\r
\r
E se esse conteúdo fez sentido, compartilhe com alguém que também esteja nessa dúvida.\r
`,uz=`---\r
title: "Não sei qual concurso estudar: como destravar essa decisão"\r
description: "Se você quer fazer concurso público mas não sabe para qual estudar, este guia mostra como clarear o caminho analisando perfil, rotina e áreas de atuação."\r
slug: "nao-sei-qual-concurso-estudar"\r
date: "2026-02-11"\r
tags: ["concurso publico", "dicas de estudo", "perfil profissional", "orientacao de carreira"]\r
---\r
\r
# Não sei qual concurso estudar: como destravar essa decisão\r
\r
Talvez seja exatamente isso que você está vivendo:\r
\r
> “Eu quero passar em concurso…  \r
> mas não faço ideia de **qual concurso estudar**.”\r
\r
Você começa a pesquisar e aparece uma avalanche de opções:\r
\r
- tribunais,  \r
- policial,  \r
- administrativo,  \r
- saúde,  \r
- fiscal…\r
\r
E aí bate a dúvida:\r
\r
> “E se eu escolher errado e perder tempo?”\r
\r
Respira. Vamos organizar.\r
\r
---\r
\r
## Primeiro: não é falta de foco — é falta de clareza\r
\r
A maioria das pessoas acha que o problema é disciplina.\r
\r
Mas, muitas vezes, o problema é:\r
\r
- dúvida sobre o cargo,  \r
- medo de escolher errado,  \r
- pouca informação sobre a rotina,  \r
- expectativa de encontrar “o concurso perfeito”.\r
\r
Quando não há clareza, o cérebro **segura o freio**.\r
\r
---\r
\r
## O que realmente importa na hora de escolher\r
\r
Antes de abrir edital, pergunte:\r
\r
- eu gosto de lidar com pessoas o tempo todo?\r
- lido bem com pressão intensa?\r
- prefiro rotina ou imprevistos?\r
- gosto de números e análises?\r
- tenho perfil mais calmo ou mais “ação”?\r
\r
Essas respostas apontam se você combina mais com:\r
\r
- administrativo,  \r
- atendimento,  \r
- policial,  \r
- tribunais,  \r
- fiscal,  \r
- saúde.\r
\r
---\r
\r
## Por que escolher só pelo salário costuma dar errado\r
\r
Claro que dinheiro importa — mas:\r
\r
- salários altos costumam vir com **alta cobrança**,  \r
- algumas áreas têm **plantões** e rotina pesada,  \r
- outras têm **conflitos e pressão constante**.\r
\r
> Concurso bom é aquele que você consegue sustentar por anos.\r
\r
---\r
\r
## Como destravar a decisão (passo a passo)\r
\r
### 1️⃣ Liste o que você NÃO quer viver\r
Exemplo:\r
\r
- risco físico,\r
- plantões,\r
- exposição pública,\r
- trabalho emocionalmente pesado.\r
\r
Isso já elimina muita coisa.\r
\r
---\r
\r
### 2️⃣ Pense no estilo de vida que você deseja\r
\r
- previsibilidade?\r
- tempo com a família?\r
- desafio?\r
- status?\r
- tranquilidade emocional?\r
\r
Cada área traz prós e contras diferentes.\r
\r
---\r
\r
### 3️⃣ Pesquise o dia a dia real do cargo\r
\r
Não confie só em depoimentos de aprovação.\r
\r
Procure:\r
\r
- relatos de servidores,\r
- reclamações comuns,\r
- rotina verdadeira.\r
\r
Pergunte sempre:\r
\r
> “Eu me vejo fazendo isso por anos?”\r
\r
---\r
\r
### 4️⃣ Defina uma área — e só depois um cargo específico\r
\r
Primeiro decida **a área geral**.  \r
Depois, dentro dela, veja quais cargos fazem sentido.\r
\r
Isso reduz ansiedade e organiza o caminho.\r
\r
---\r
\r
## E se eu ainda ficar em dúvida?\r
\r
Aí entram os testes vocacionais e de perfil.\r
\r
Eles ajudam a:\r
\r
- entender seu jeito de trabalhar,  \r
- cruzar com diferentes áreas,  \r
- reduzir opções confusas,  \r
- mostrar direções mais seguras.\r
\r
Mas lembre:\r
\r
> teste ajuda — quem decide é você.\r
\r
---\r
\r
## Como o Futuro Perfeito pode ajudar\r
\r
No Futuro Perfeito, nós não falamos:\r
\r
> “Faça esse concurso aqui.”\r
\r
Em vez disso:\r
\r
- analisamos seu perfil,  \r
- entendemos sua formação,  \r
- avaliamos seu estilo de vida desejado,  \r
- cruzamos com áreas reais de concurso,\r
\r
e sugerimos **3 caminhos possíveis** — com explicações claras.\r
\r
Sem prometer milagres.  \r
Com clareza e realidade.\r
\r
---\r
\r
## Perguntas frequentes\r
\r
### “Se eu escolher e me arrepender, perdi tudo?”\r
Não. Muita coisa que você estuda serve para vários concursos.\r
\r
### “Posso estudar para mais de um concurso?”\r
Pode — desde que sejam da **mesma área**, para não dividir energia demais.\r
\r
### “Existe concurso perfeito?”\r
Não. Existe concurso **compatível** com você.\r
\r
---\r
\r
## Quer ajuda para decidir por onde começar?\r
\r
Se quiser:\r
\r
- responder algumas perguntas,  \r
- entender melhor seu perfil,  \r
- enxergar áreas que combinam mais com você,\r
\r
o teste do Futuro Perfeito pode ajudar.\r
\r
Sem promessas mágicas —  \r
só clareza para começar do jeito certo.\r
`,dz=`---\r
title: "Qual carreira seguir? Um guia prático para decidir sem se arrepender"\r
description: "Se você tem dúvidas sobre qual carreira seguir, este guia ajuda a organizar suas ideias, evitar escolhas impensadas e encontrar caminhos que realmente combinam com você."\r
slug: "qual-carreira-seguir"\r
date: "2026-02-05"\r
tags: ["carreira", "orientacao profissional", "perfil profissional", "teste vocacional"]\r
---\r
\r
# Qual carreira seguir? Um guia prático para decidir sem se arrepender\r
\r
Poucas perguntas pesam tanto quanto esta:\r
\r
> **“Afinal… qual carreira eu devo seguir?”**\r
\r
Às vezes você já trabalha, mas sente que não é bem isso.  \r
Às vezes ainda está escolhendo — e morre de medo de se arrepender.\r
\r
A boa notícia: decidir carreira não precisa ser um tiro no escuro.  \r
Com clareza e método, tudo fica mais leve.\r
\r
---\r
\r
## Primeiro: carreira não é só profissão — é estilo de vida\r
\r
Quando pensamos em “carreira”, pensamos em:\r
\r
- salário  \r
- cargo  \r
- status  \r
\r
Mas, na prática, o que mais pesa é:\r
\r
- a rotina diária,  \r
- o nível de pressão,  \r
- o ambiente,  \r
- o tipo de problema que você resolve,  \r
- o impacto na sua saúde mental.\r
\r
> A carreira certa é aquela que cabe na vida que você deseja construir.\r
\r
---\r
\r
## Passo 1 — Entenda como você funciona no trabalho\r
\r
Respondendo honestamente, sem romantizar:\r
\r
- você gosta de trabalhar com **pessoas** ou prefere **tarefas individuais**?\r
- prefere **rotina previsível** ou **variedade constante**?\r
- lida bem com **cobrança intensa**?\r
- gosta de **organizar e planejar** ou prefere **executar**?\r
- se sente melhor com **dados e lógica** ou **comunicação e interação**?\r
\r
Essas respostas eliminam várias carreiras que parecem boas —  \r
mas que, na prática, te drenariam.\r
\r
---\r
\r
## Passo 2 — Observe o que já funcionou na sua história\r
\r
Faça memória:\r
\r
- quando se sentiu motivado?\r
- quando o tempo passava rápido?\r
- quando você se orgulhou do que fez?\r
\r
Pergunte:\r
\r
> “O que essas situações tinham em comum?”\r
\r
Costumam aparecer pistas como:\r
\r
- autonomia,  \r
- criação,  \r
- segurança,  \r
- estabilidade,  \r
- impacto social,  \r
- resolução de problemas.\r
\r
Esses padrões valem ouro.\r
\r
---\r
\r
## Passo 3 — Liste o que você definitivamente não quer\r
\r
Muita clareza vem daqui.\r
\r
Exemplos comuns:\r
\r
- plantões e horários quebrados,  \r
- pressão comercial,  \r
- exposição pública constante,  \r
- conflito frequente,  \r
- trabalho repetitivo demais,  \r
- ambientes competitivos ao extremo.\r
\r
> Saber o que evitar é metade do caminho.\r
\r
---\r
\r
## Passo 4 — Pesquise o “dia a dia real” das carreiras\r
\r
Cuidado com versões romantizadas.\r
\r
Busque:\r
\r
- relatos reais,  \r
- bastidores,  \r
- desafios comuns,  \r
- pontos negativos também.\r
\r
Converse com pessoas da área.  \r
Pergunte:\r
\r
> “O que ninguém conta, mas é importante saber?”\r
\r
Decisão boa é decisão informada.\r
\r
---\r
\r
## Passo 5 — Teste antes de mergulhar\r
\r
Se puder:\r
\r
- faça cursos curtos,  \r
- participe de projetos,  \r
- voluntarie,  \r
- crie algo pequeno,  \r
- acompanhe alguém por um dia.\r
\r
Experimentar reduz arrependimentos.\r
\r
---\r
\r
## Onde entra o teste vocacional e de perfil?\r
\r
Eles não decidem por você — mas **organizam o caos**.\r
\r
Eles ajudam a:\r
\r
- identificar tendências,  \r
- mostrar áreas compatíveis,  \r
- apontar riscos,  \r
- direcionar pesquisas.\r
\r
O segredo é usar como **bússola**, não como sentença.\r
\r
---\r
\r
## E se você estiver considerando concurso público?\r
\r
A pergunta muda de:\r
\r
> “Qual concurso vale mais a pena?”\r
\r
para:\r
\r
> **“Qual tipo de cargo combina com meu perfil e minha vida?”**\r
\r
Existem concursos com:\r
\r
- atendimento intenso ao público,  \r
- trabalho mais burocrático,  \r
- fiscalização/campo,  \r
- plantão e alta pressão,  \r
- rotina tranquila de gabinete.\r
\r
> Passar é bom.  \r
> **Passar para algo sustentável é melhor ainda.**\r
\r
---\r
\r
## Erros comuns ao escolher carreira\r
\r
❌ escolher só pelo salário  \r
❌ seguir apenas expectativa da família  \r
❌ copiar decisões de amigos  \r
❌ ignorar sinais do corpo (exaustão, ansiedade)  \r
❌ acreditar que “carreira certa não dá trabalho”\r
\r
Carreira boa também cansa —  \r
mas **não destrói quem você é**.\r
\r
---\r
\r
## Quando vale buscar ajuda?\r
\r
Quando você:\r
\r
- gira em círculo há meses,  \r
- muda de ideia toda semana,  \r
- sente culpa por não gostar do que tem,  \r
- se sente completamente perdido.\r
\r
Um olhar externo organiza o que já está dentro de você.\r
\r
---\r
\r
## Como o Futuro Perfeito pode ajudar\r
\r
O Futuro Perfeito não “escolhe por você”.\r
\r
Ele ajuda a:\r
\r
- entender seu perfil,  \r
- cruzar com sua formação,  \r
- analisar a rotina que você deseja,  \r
- mostrar **3 caminhos possíveis**, bem explicados.\r
\r
Sem promessas mágicas.  \r
Com clareza.\r
\r
---\r
\r
## Perguntas frequentes\r
\r
### E se eu escolher errado?\r
Ajuste faz parte. Importante é errar cada vez com mais consciência.\r
\r
### Posso começar tarde?\r
Sim — adultos decidem melhor porque têm mais referência.\r
\r
### Preciso abandonar tudo para mudar de carreira?\r
Quase nunca. Transições inteligentes são feitas por etapas.\r
\r
---\r
\r
## Quer clarear qual carreira seguir — com calma?\r
\r
Se quiser:\r
\r
- responder perguntas guiadas,  \r
- entender melhor seu perfil,  \r
- ver caminhos que realmente combinam com você,\r
\r
o teste do Futuro Perfeito pode ajudar.\r
\r
Sem pressa. Sem mágica.  \r
Só clareza para decidir melhor.\r
`,mz=`---\r
title: "Qual concurso devo fazer? Veja como descobrir o que realmente combina com você"\r
description: "Se você quer fazer concurso público e não sabe qual escolher, este guia mostra como analisar seu perfil, rotina desejada e áreas de concurso para decidir com mais segurança."\r
slug: "qual-concurso-devo-fazer"\r
date: "2026-02-09"\r
tags: ["concurso publico", "escolha de carreira", "perfil profissional", "teste vocacional"]\r
---\r
\r
# Qual concurso devo fazer? Veja como descobrir o que realmente combina com você\r
\r
Se você está pesquisando sobre concursos, provavelmente já pensou:\r
\r
> **“Com tanta opção… qual concurso eu devo fazer?”**\r
\r
E é normal ficar perdido.\r
\r
Você ouve:\r
\r
- “faz o que paga mais”  \r
- “escolhe o que sai edital primeiro”  \r
- “entra em qualquer um, depois você muda”\r
\r
Mas o que quase ninguém fala é:\r
\r
> **o concurso certo não é o mais famoso — é o que combina com você.**\r
\r
---\r
\r
## Concurso não é só passar — é conseguir ficar\r
\r
Quando você escolhe um concurso, escolhe junto:\r
\r
- um tipo de rotina  \r
- um estilo de trabalho  \r
- um ambiente  \r
- um nível de pressão  \r
\r
E é por isso que muita gente:\r
\r
- passa  \r
- toma posse  \r
- e depois descobre que não aguenta  \r
\r
> Passar é difícil.  \r
> **Ficar no lugar errado é muito pior.**\r
\r
---\r
\r
## Primeiro passo: olhar para o seu perfil (antes do edital)\r
\r
Em vez de começar pelo salário, comece por perguntas como:\r
\r
- eu gosto de lidar com pessoas todos os dias?  \r
- prefiro atividades estruturadas e repetitivas?  \r
- lido bem com risco, conflito e pressão?  \r
- gosto de trabalhar com números e análises?  \r
- funciono melhor em ambientes calmos?\r
\r
Essas respostas apontam áreas mais adequadas.\r
\r
---\r
\r
## Principais áreas de concurso — e para quem combinam\r
\r
### 🗂️ Administrativa  \r
Boa para quem gosta de rotina, organização e previsibilidade.\r
\r
### 👥 Atendimento ao público  \r
Ideal para quem é comunicativo e empático, mas cansativa para introvertidos.\r
\r
### 🚓 Segurança/policial  \r
Exige preparo emocional, disciplina e tolerância a risco.\r
\r
### ⚖️ Tribunais  \r
Perfil analítico, organizado, paciente e atento a detalhes.\r
\r
### 💉 Saúde  \r
Trabalho intenso, emocionalmente exigente e muitas vezes com plantões.\r
\r
### 📊 Fiscal/controle  \r
Perfil lógico, responsável e focado — com alta cobrança.\r
\r
---\r
\r
## Como filtrar opções sem pirar\r
\r
### 1️⃣ Faça uma lista do que você não aceita viver\r
\r
- plantões  \r
- risco físico  \r
- exposição pública  \r
- cobrança agressiva  \r
\r
Isso já reduz as escolhas.\r
\r
---\r
\r
### 2️⃣ Pense no estilo de vida que você quer ter\r
\r
- estabilidade e previsibilidade  \r
- emoção e dinamismo  \r
- tempo para a família  \r
- tolerância à pressão  \r
\r
Cada área traz um “preço” diferente.\r
\r
---\r
\r
### 3️⃣ Pesquise o dia a dia real (não só o salário)\r
\r
Procure:\r
\r
- relatos de servidores  \r
- bastidores  \r
- pontos negativos  \r
\r
Pergunte:\r
\r
> “Se eu passar, consigo viver isso por 10 anos?”\r
\r
---\r
\r
## Testes podem ajudar — mas não decidem por você\r
\r
Eles:\r
\r
- organizam suas tendências  \r
- mostram áreas compatíveis  \r
- evitam escolhas sem sentido  \r
\r
> Eles são bússola, não destino.\r
\r
---\r
\r
## Como o Futuro Perfeito ajuda nessa decisão\r
\r
Nós analisamos:\r
\r
- seu perfil  \r
- sua formação  \r
- suas preferências  \r
- sua rotina desejada  \r
\r
e sugerimos **3 caminhos mais compatíveis**, com prós e contras.\r
\r
Sem prometer resultado fácil.  \r
Com clareza.\r
\r
---\r
\r
## Quer descobrir qual concurso fazer com mais segurança?\r
\r
Se quiser:\r
\r
- responder algumas perguntas  \r
- entender melhor seu perfil  \r
- ver concursos que combinam mais com você  \r
\r
o teste do Futuro Perfeito pode ajudar.\r
\r
Sem promessas mágicas —  \r
apenas clareza para tomar uma decisão melhor.\r
`,pz=`---\r
title: "Qual concurso escolher? Como decidir com clareza e evitar arrependimentos"\r
description: "Veja como escolher o concurso certo analisando perfil, rotina, pressão e estilo de vida — para não se arrepender depois de passar."\r
slug: "qual-concurso-escolher"\r
date: "2026-01-05"\r
tags: ["concurso publico", "carreira publica", "escolha de carreira", "perfil profissional"]\r
---\r
\r
# Qual concurso escolher? Como decidir com clareza e evitar arrependimentos\r
\r
Quando alguém decide estudar para concurso, surge a grande dúvida:\r
\r
> **“Tá… mas qual concurso eu devo escolher?”**\r
\r
E começam os palpites:\r
\r
- “esse paga mais”  \r
- “aquele é mais fácil”  \r
- “entra em qualquer um”\r
\r
Mas essa é uma decisão que pode durar décadas.\r
\r
---\r
\r
## Concurso certo é aquele que você consegue viver\r
\r
Ao escolher um concurso, você escolhe:\r
\r
- tipo de trabalho,  \r
- pressão,  \r
- ambiente,  \r
- rotina.\r
\r
> Escolher sem clareza = alto risco de arrependimento.\r
\r
---\r
\r
## O ponto de partida é o seu perfil\r
\r
Pergunte:\r
\r
- gosto de contato com pessoas?  \r
- suporto pressão constante?  \r
- prefiro rotina ou imprevistos?  \r
- gosto de números?  \r
- prefiro campo ou gabinete?\r
\r
Isso já reduz metade das opções.\r
\r
---\r
\r
## Áreas e perfis que costumam combinar\r
\r
### 🗂️ Administrativa  \r
Rotina estável, tarefas organizadas.\r
\r
### 👥 Atendimento ao público  \r
Comunicação, paciência e empatia.\r
\r
### 🚓 Segurança/policial  \r
Alta pressão e risco. Perfil específico.\r
\r
### ⚖️ Tribunais  \r
Trabalho técnico e analisado.\r
\r
### 💉 Saúde  \r
Emocionalmente exigente, com plantões.\r
\r
### 📊 Fiscal/controle  \r
Alta cobrança e responsabilidade.\r
\r
---\r
\r
## Como evitar a escolha errada\r
\r
### 1️⃣ Liste o que você NÃO aceita viver  \r
Plantões, risco, conflito, exposição…\r
\r
### 2️⃣ Pense no estilo de vida que quer ter  \r
Tempo, estabilidade, salário, tranquilidade…\r
\r
### 3️⃣ Pesquise a rotina real do cargo  \r
Converse com quem já está lá.\r
\r
---\r
\r
## Onde testes ajudam\r
\r
Eles:\r
\r
- clareiam perfis,  \r
- reduzem opções ruins,  \r
- direcionam decisões.\r
\r
> Não decidem — orientam.\r
\r
---\r
\r
## Como o Futuro Perfeito ajuda\r
\r
Nós:\r
\r
- analisamos seu perfil,  \r
- sua formação,  \r
- sua rotina desejada,\r
\r
e sugerimos **3 caminhos compatíveis**, explicando prós e contras.\r
\r
---\r
\r
## Quer escolher com segurança?\r
\r
Se quiser clareza, o teste do Futuro Perfeito pode te ajudar —  \r
sem promessas mágicas, só direção.\r
`,fz=`---\r
title: "Qual concurso devo fazer? Descubra o que realmente combina com você"\r
description: "Um guia prático para ajudar você a descobrir qual concurso fazer analisando perfil, rotina e estilo de vida — não apenas salário."\r
slug: "qual-concurso-fazer"
date: "2026-01-05"\r
tags: ["concurso publico", "carreira", "escolha de concurso", "teste vocacional"]\r
---\r
\r
# Qual concurso devo fazer? Descubra o que realmente combina com você\r
\r
Se você está pesquisando sobre concursos, provavelmente já pensou:\r
\r
> **“Com tanta opção… qual concurso eu devo fazer?”**\r
\r
É normal ficar confuso.\r
\r
Você escuta:\r
\r
- “faz o que paga mais”  \r
- “vai no que sair primeiro”  \r
- “entra em qualquer um e depois troca”\r
\r
Mas o que quase ninguém fala é:\r
\r
> **o melhor concurso é o que combina com você — e com a sua vida.**\r
\r
---\r
\r
## Concurso não é só passar — é conseguir ficar\r
\r
Quando você escolhe um concurso, escolhe também:\r
\r
- rotina,  \r
- ambiente,  \r
- tipo de pressão.\r
\r
E muita gente descobre isso **depois que passa**.\r
\r
> Passar é difícil.  \r
> Ficar no lugar errado é pior.\r
\r
---\r
\r
## Comece pelo seu perfil (antes de olhar salário)\r
\r
Pergunte a si mesmo:\r
\r
- gosto de lidar com pessoas diariamente?  \r
- prefiro tarefas organizadas e repetitivas?  \r
- lido bem com risco e conflito?  \r
- gosto de analisar números e dados?  \r
- funciono melhor em ambientes calmos?\r
\r
Essas respostas apontam a área certa.\r
\r
---\r
\r
## Áreas de concurso — e quem combina com cada uma\r
\r
### 🗂️ Administrativa  \r
Rotina, organização e previsibilidade.\r
\r
### 👥 Atendimento ao público  \r
Contato constante — exige paciência.\r
\r
### 🚓 Segurança/policial  \r
Risco, pressão e hierarquia.\r
\r
### ⚖️ Tribunais  \r
Perfil analítico e organizado.\r
\r
### 💉 Saúde  \r
Exige preparo emocional e plantões.\r
\r
### 📊 Fiscal/controle  \r
Muita responsabilidade e cobrança.\r
\r
---\r
\r
## Como filtrar sem travar\r
\r
### 1️⃣ Liste o que você NÃO aceita viver  \r
Plantões, risco físico, cobrança pública…\r
\r
### 2️⃣ Pense no estilo de vida que deseja  \r
Tempo, tranquilidade, crescimento, estabilidade…\r
\r
### 3️⃣ Pesquise o dia a dia real  \r
Converse com servidores. Veja os pontos negativos também.\r
\r
---\r
\r
## Testes ajudam — mas não decidem por você\r
\r
Eles:\r
\r
- organizam suas tendências,  \r
- reduzem opções erradas,  \r
- trazem clareza.\r
\r
> Eles são bússola — não destino.\r
\r
---\r
\r
## Como o Futuro Perfeito ajuda\r
\r
Nós:\r
\r
- analisamos perfil,  \r
- formação,  \r
- preferências,  \r
- e rotina desejada,\r
\r
e apresentamos **3 caminhos compatíveis**, explicando prós e contras.\r
\r
Sem ilusão.  \r
Com clareza.\r
\r
---\r
\r
## Quer descobrir com mais segurança?\r
\r
Se quiser:\r
\r
- responder perguntas guiadas,  \r
- entender melhor seu perfil,  \r
- ver áreas que combinam com você,\r
\r
o Futuro Perfeito pode ajudar.\r
`,hz=`---\r
title: "Qual profissão combina comigo? Guia sincero para não se arrepender depois"\r
description: "Um passo a passo simples para descobrir que tipo de profissão combina com você — especialmente se você pensa em concurso público."\r
slug: "qual-profissao-combina-comigo"\r
date: "2026-01-05"\r
tags: ["teste vocacional", "escolha de carreira", "concurso publico", "orientacao profissional"]\r
---\r
\r
# Qual profissão combina comigo? Guia sincero para não se arrepender depois\r
\r
Se você caiu aqui é porque provavelmente já se perguntou alguma vez:\r
\r
> “Tá, mas **qual profissão realmente combina comigo?**”\r
\r
Pode ser que você:\r
\r
- já tenha feito faculdade e não se encontre na área,\r
- esteja cansado da iniciativa privada,\r
- ou esteja considerando concurso público, mas ainda sem saber **em qual direção ir**.\r
\r
A boa notícia é: não existe uma “profissão perfeita” mágica.  \r
Mas existe, sim, um **tipo de trabalho** que faz mais sentido para você do que outros — e dá pra chegar mais perto disso sem surtar.\r
\r
---\r
\r
## Por que é tão difícil saber “qual profissão combina comigo”?\r
\r
Não é porque você é indeciso ou “fraco”.  \r
É porque o mundo real é confuso mesmo:\r
\r
- pressão da família (“faz medicina”, “faz direito”, “faz concurso de tal coisa”);\r
- redes sociais romantizando algumas carreiras e demonizando outras;\r
- medo de “escolher errado” e ficar preso num trabalho que você odeia.\r
\r
E, na hora de escolher, a maioria olha só para:\r
\r
- **nome bonito do cargo**,  \r
- **salário inicial**,  \r
- **status social**.\r
\r
Quase ninguém avalia:\r
\r
- rotina de verdade,\r
- tipo de problema que vai lidar,\r
- ambiente de trabalho,\r
- impacto na saúde mental.\r
\r
> **Resultado:** muita gente “bem-sucedida” por fora… e frustrada por dentro.\r
\r
---\r
\r
## Em vez de procurar uma profissão, procure um JEITO DE VIVER\r
\r
Antes de pensar no nome do cargo, responda:\r
\r
> **“Como eu quero que seja minha vida no dia a dia?”**\r
\r
Essas perguntas ajudam:\r
\r
- Você prefere trabalhar **com pessoas** ou mais em **tarefas individuais**?\r
- Prefere **movimento e imprevisto** ou **rotina e previsibilidade**?\r
- Se sente melhor resolvendo **problemas práticos** ou lidando com **documentos e planilhas**?\r
- Se energiza em **ambientes calmos** ou lida bem com **pressão e conflito**?\r
\r
Isso já separa bem:\r
\r
- perfis **operacionais / práticos**;  \r
- perfis **analíticos / investigativos**;  \r
- perfis **organizacionais / administrativos**;  \r
- perfis **de contato intenso com o público**.\r
\r
> Profissão não é só o cargo — é **o pacote: rotina + ambiente + pressão**.\r
\r
---\r
\r
## 4 perguntas simples para clarear seu perfil\r
\r
Se você quiser um mini raio-x agora, responda:\r
\r
### 1️⃣ Em que momentos o tempo passa mais rápido?\r
\r
- estudando algo específico?\r
- organizando coisas?\r
- resolvendo problemas?\r
- ajudando pessoas diretamente?\r
\r
### 2️⃣ O que te esgota em meia hora?\r
\r
Isso costuma ser sinal de “não combina”.  \r
Ex.: muita exposição pública, cobrança constante, plantão noturno.\r
\r
### 3️⃣ Você prefere **segurança** ou **liberdade**?\r
\r
- algumas carreiras: mais risco, metas e competição;  \r
- outras (especialmente públicas): mais **estabilidade e rotina**.\r
\r
### 4️⃣ Você lida bem com pressão constante?\r
\r
Algumas áreas (saúde, polícia, fiscal, empresas grandes) são intensas.  \r
Outras são mais burocráticas — porém previsíveis.\r
\r
Essas respostas já apontam **tipos de cargos** que combinam mais com você.\r
\r
---\r
\r
## E se eu estiver pensando em concurso público?\r
\r
Quando alguém pergunta:\r
\r
> “Qual concurso combina comigo?”\r
\r
na prática está perguntando sobre:\r
\r
- **área** (administrativa, policial, fiscal, judiciária, saúde…),\r
- **tipo de rotina** (plantão, atendimento direto, gabinete, campo…),\r
- **nível emocional** (conflito, dor, pressão política…).\r
\r
Vale refletir:\r
\r
- eu me imagino **lidando com pessoas em tensão todos os dias?**\r
- prefiro trabalhar **nos bastidores**, com processos?\r
- gosto de **fiscalização / campo**?\r
- aceitaria **plantões e horários alternativos**?\r
\r
Muita gente descobre que **combina com concursos** —  \r
mas não com **qualquer área**.\r
\r
---\r
\r
## Como usar testes vocacionais (do jeito certo)\r
\r
Testes vocacionais não são oráculo.\r
\r
Eles servem para:\r
\r
- reduzir opções,\r
- mostrar **tendências de perfil**,\r
- indicar áreas com maior chance de encaixe.\r
\r
O erro é pensar:\r
\r
> “Deu X no teste, então é isso e pronto.”\r
\r
O uso correto é:\r
\r
1. ver o teste como **mapa**;  \r
2. cruzar com:\r
   - sua formação,\r
   - suas habilidades,\r
   - sua realidade de vida,\r
   - o tipo de rotina que deseja;  \r
3. filtrar as opções com consciência.\r
\r
---\r
\r
## Onde entra o Futuro Perfeito\r
\r
Se concursos fazem sentido pra você, a pergunta vira:\r
\r
> **“Que tipo de cargo combina com meu perfil, minha formação e o estilo de vida que eu quero?”**\r
\r
No Futuro Perfeito, nós:\r
\r
- entendemos seu **perfil**,  \r
- cruzamos com sua **formação e interesses**,  \r
- comparamos com **cargos reais**,\r
- e sugerimos **3 caminhos explicados**, não listas aleatórias.\r
\r
Não é “profissão perfeita”.  \r
É **clareza para decidir melhor**.\r
\r
---\r
\r
## Próximos passos (em 20 minutos)\r
\r
1. anote as **4 perguntas** acima;  \r
2. liste **3 profissões/cargos** que sempre voltam à sua cabeça;  \r
3. escreva para cada um:\r
   - “o que me atrai?”  \r
   - “o que me assusta?”  \r
4. se pensar em concurso, reflita **qual área combina mais**;  \r
5. e, se quiser, use um teste que cruze **perfil + formação + realidade**.\r
\r
---\r
\r
## Perguntas frequentes\r
\r
### Um teste vocacional consegue dizer “minha profissão”?\r
\r
Ele **não adivinha** — mas reduz o caos e aponta direções.  \r
Use como ferramenta, não como sentença.\r
\r
### E se eu gostar de mais de uma área?\r
\r
Compare:\r
\r
- rotina,\r
- tipo de pressão,\r
- mercado,\r
- impacto na sua saúde mental.\r
\r
Às vezes, ambas combinam — mas uma é mais sustentável.\r
\r
### Já tenho faculdade: ainda vale fazer teste?\r
\r
Talvez **agora faça ainda mais sentido**.  \r
Você já sabe o que não quer — o teste ajuda a organizar isso.\r
\r
### E se eu passar e descobrir que não combina?\r
\r
Pode acontecer — por isso refletir antes ajuda.  \r
E sempre existe reorganização ao longo do caminho.\r
\r
---\r
\r
## Quer um atalho para clarear?\r
\r
No Futuro Perfeito você responde sobre:\r
\r
- seu jeito de ser,  \r
- sua formação,  \r
- suas preferências de rotina,\r
\r
e recebe **3 sugestões alinhadas** — com explicações claras.\r
\r
Não decide por você.  \r
Mas te dá um ponto de partida muito mais sólido.\r
\r
Se fizer sentido, esse pode ser seu próximo passo. 🙂\r
`,gz=`---\r
title: "Quero mudar de carreira: o que fazer (sem colocar tudo a perder)"\r
description: "Se você quer mudar de carreira mas tem medo de errar ou perder segurança, este guia prático mostra como fazer a transição com clareza e menos risco."\r
slug: "quero-mudar-de-carreira-o-que-fazer"\r
date: "2026-02-06"\r
tags: ["mudanca de carreira", "replanejamento profissional", "perfil profissional", "teste vocacional"]\r
---\r
\r
# Quero mudar de carreira: o que fazer (sem colocar tudo a perder)\r
\r
Talvez você tenha chegado a esse ponto:\r
\r
> “Eu quero mudar de carreira — mas morro de medo de me arrepender.”\r
\r
É medo de perder estabilidade.  \r
É medo de começar do zero.  \r
É medo do julgamento dos outros.\r
\r
E tudo isso é compreensível.\r
\r
Boa notícia?  \r
Existe um jeito **organizado e seguro** de atravessar essa fase.\r
\r
---\r
\r
## Antes de tudo: não jogue fora sua experiência\r
\r
Muita gente erra pensando:\r
\r
> “Vou recomeçar do zero.”\r
\r
Quase nunca é “do zero”.\r
\r
Você leva consigo:\r
\r
- habilidades,  \r
- maturidade,  \r
- relacionamentos,  \r
- visão de mundo,  \r
- disciplina de trabalho.\r
\r
Esses ativos acompanham você para qualquer área.\r
\r
---\r
\r
## Passo 1 — Entenda por que você quer sair\r
\r
Escreva com sinceridade:\r
\r
- é a **rotina** que te desgasta?\r
- é o **ambiente**?\r
- é o tipo de **tarefa**?\r
- é a **pressão emocional**?\r
- é a **falta de propósito**?\r
- é **dinheiro**?\r
\r
Saber o motivo real evita trocar um problema por outro igual — só que com outro nome.\r
\r
---\r
\r
## Passo 2 — Defina qual tipo de vida você quer ter\r
\r
Pergunte:\r
\r
- quero previsibilidade ou movimento?\r
- quero tempo para a família?\r
- topo trabalhar sob pressão?\r
- prefiro lidar com pessoas ou com processos?\r
- quero crescer rápido ou prefiro estabilidade?\r
\r
> Carreira é instrumento.  \r
> O objetivo é a vida que você quer construir.\r
\r
---\r
\r
## Passo 3 — Explore caminhos possíveis (sem se comprometer ainda)\r
\r
Antes de anunciar que vai mudar tudo:\r
\r
- faça cursos curtos,  \r
- participe de projetos,  \r
- busque freelas pequenos,  \r
- converse com pessoas da área,  \r
- acompanhe alguém por um dia.\r
\r
Isso reduz riscos e dá realidade.\r
\r
---\r
\r
## Passo 4 — Planeje financeiramente\r
\r
Transição sem planejamento vira sofrimento.\r
\r
Organize:\r
\r
- reserva financeira,  \r
- redução de gastos,  \r
- prazos realistas,  \r
- possíveis fontes paralelas de renda.\r
\r
Mudança com segurança = menos ansiedade.\r
\r
---\r
\r
## Passo 5 — Construa pontes, não abismos\r
\r
Sempre que possível, procure:\r
\r
- áreas relacionadas à sua experiência,  \r
- cargos de transição,  \r
- funções intermediárias.\r
\r
Assim você **não joga fora o que construiu** — e avança com mais estabilidade.\r
\r
---\r
\r
## Passo 6 — Use testes e orientação como apoio (não como oráculo)\r
\r
Testes vocacionais e de perfil ajudam a:\r
\r
- entender seu jeito de trabalhar,  \r
- identificar ambientes compatíveis,  \r
- evitar áreas que te drenariam.\r
\r
Mas lembre:\r
\r
> Eles orientam — quem decide é você.\r
\r
---\r
\r
## Quando o medo é sinal de alerta (e não de fuga)\r
\r
Preste atenção se o seu corpo já está avisando:\r
\r
- ansiedade crônica,  \r
- insônia,  \r
- desânimo constante,  \r
- sensação de estar “preso”.\r
\r
Às vezes não é frescura.  \r
É um chamado para ajustar a rota.\r
\r
---\r
\r
## E quem pensa em concurso público?\r
\r
Aqui a transição pode ser interessante — principalmente para quem busca:\r
\r
- estabilidade,  \r
- rotina mais previsível,  \r
- segurança a longo prazo.\r
\r
Mas, novamente:\r
\r
- escolha a **área certa**,  \r
- pense no tipo de pressão,  \r
- entenda a rotina real.\r
\r
Concurso não é “escape automático” — é uma escolha que precisa combinar com você.\r
\r
---\r
\r
## Como o Futuro Perfeito ajuda em mudanças de carreira\r
\r
O Futuro Perfeito não promete milagres.\r
\r
Ele ajuda você a:\r
\r
- entender seu perfil,  \r
- cruzar com sua experiência,  \r
- alinhar com sua realidade de vida,  \r
- enxergar **3 caminhos possíveis** — com prós e contras claros.\r
\r
Sem romantização.  \r
Com pés no chão.\r
\r
---\r
\r
## Perguntas frequentes\r
\r
### Vou precisar recomeçar totalmente?\r
Raramente. Quase sempre dá para reaproveitar muita coisa.\r
\r
### E se eu errar de novo?\r
A diferença é que agora você erra **com consciência e planejamento**.\r
\r
### Mudança de carreira é coisa de gente indecisa?\r
Não. É coisa de quem amadureceu e quer viver melhor.\r
\r
---\r
\r
## Se você quer mudar — mas com clareza\r
\r
Você não precisa decidir tudo sozinho e no escuro.\r
\r
Se quiser:\r
\r
- responder perguntas guiadas,  \r
- entender melhor seu perfil,  \r
- enxergar opções mais adequadas,\r
\r
o teste do Futuro Perfeito pode ajudar.\r
\r
Sem fórmulas mágicas.  \r
Só clareza para dar o próximo passo com segurança.\r
`,vz=`---\r
title: "Teste de perfil profissional: descubra seu tipo e escolha melhor"\r
description: "Como um teste de perfil profissional ajuda a entender seu jeito de trabalhar, evitar escolhas erradas e encontrar caminhos que combinam com você."\r
slug: "teste-de-perfil-profissional"\r
date: "2026-02-01"\r
tags: ["perfil profissional", "orientacao profissional", "teste vocacional", "carreira"]\r
---\r
\r
# Teste de perfil profissional: descubra seu tipo e escolha melhor\r
\r
Você já se pegou pensando:\r
\r
> “Será que eu estou na profissão certa — ou só acostumei?”\r
\r
Essa é exatamente a função do **teste de perfil profissional**:  \r
ajudar você a entender *como trabalha melhor*, quais ambientes favorecem seu desempenho e quais caminhos tendem a gerar mais satisfação.\r
\r
Não é adivinhação.  \r
É clareza.\r
\r
---\r
\r
## O que é um teste de perfil profissional (de verdade)?\r
\r
Um teste de perfil profissional é uma ferramenta que analisa:\r
\r
- jeito de resolver problemas,  \r
- tomada de decisão,  \r
- relação com pessoas,  \r
- preferência por rotina ou mudanças,  \r
- como você reage à pressão.\r
\r
O objetivo não é dizer:\r
\r
> “Você nasceu para fazer X e pronto.”\r
\r
Mas sim mostrar **tendências**, como:\r
\r
- perfis **analíticos**,  \r
- perfis **práticos**,  \r
- perfis **organizadores**,  \r
- perfis **de liderança/público**,  \r
- perfis **criativos**, etc.\r
\r
> Ele não decide *por você* — ele facilita suas decisões.\r
\r
---\r
\r
## Por que fazer um teste de perfil profissional antes de mudar de carreira?\r
\r
Muita gente muda de profissão buscando:\r
\r
- salário melhor,\r
- status,\r
- promessa de estabilidade…\r
\r
…e acaba caindo em rotinas totalmente incompatíveis.\r
\r
O teste ajuda a evitar exatamente isso.\r
\r
### Ele traz clareza em pontos como:\r
\r
- você rende melhor **sozinho** ou com **gente o tempo todo**?  \r
- prefere **previsibilidade** ou gosta de **movimento e imprevistos**?  \r
- se sente bem com **cobrança constante**?  \r
- gosta mais de **planejar** ou **executar**?\r
\r
> Quando o trabalho combina com seu perfil, você cansa — mas não se destrói.\r
\r
---\r
\r
## Tipos comuns de perfis (simplificando)\r
\r
Cada teste usa uma classificação diferente, mas na prática eles costumam apontar para grupos parecidos:\r
\r
### 🔹 Perfil analítico\r
Gosta de investigar, entender padrões, trabalhar com dados, lógica e detalhes.\r
\r
### 🔹 Perfil prático\r
Prefere resolver coisas concretas, colocar a mão na massa, ver resultado rápido.\r
\r
### 🔹 Perfil organizador\r
Curte processos claros, planilhas, controle, planejamento e rotina estável.\r
\r
### 🔹 Perfil comunicador\r
Se sente bem lidando com pessoas, conversando, orientando, atendendo.\r
\r
### 🔹 Perfil criativo\r
Gosta de ideias novas, variação, expressão, liberdade e menos rigidez.\r
\r
> Importante: ninguém é “100% de um tipo”.  \r
Quase sempre somos um **mix** — com predominâncias.\r
\r
---\r
\r
## Teste de perfil profissional funciona?\r
\r
Funciona **quando usado do jeito certo**.\r
\r
Ele serve para:\r
\r
- diminuir o cenário de dúvidas,  \r
- reduzir escolhas óbvias que não combinam com você,  \r
- orientar pesquisas mais inteligentes.\r
\r
Ele **não** serve para:\r
\r
- substituir autoconhecimento,  \r
- decidir sua vida sozinho,  \r
- virar sentença definitiva.\r
\r
O caminho ideal é:\r
\r
1️⃣ fazer o teste  \r
2️⃣ refletir sobre o resultado  \r
3️⃣ comparar com sua experiência real  \r
4️⃣ analisar o impacto na rotina que você quer construir\r
\r
---\r
\r
## Como interpretar seu resultado (sem exageros)\r
\r
Quando o teste mostrar:\r
\r
> “Você tem perfil mais X”\r
\r
pergunte:\r
\r
- em quais momentos da vida isso apareceu?  \r
- quando fui feliz no trabalho — meu contexto parecia isso?  \r
- quando sofri — o contexto era o oposto?\r
\r
Essa conexão é onde a mágica acontece.\r
\r
---\r
\r
## E para quem pensa em concurso público?\r
\r
Aqui o teste é ainda mais útil.\r
\r
Não é sobre “passar em qualquer coisa”.\r
\r
É sobre entender:\r
\r
- se você combina com área administrativa,  \r
- com fiscalização/campo,  \r
- com atendimento ao público,  \r
- com ambiente jurídico,  \r
- com plantão/urgência, etc.\r
\r
> Concurso não muda quem você é.  \r
Ele apenas **troca o tipo de pressão**.\r
\r
---\r
\r
## Vale fazer mais de um teste?\r
\r
Sim — desde que sejam **sérios** e usados como complemento, não como oráculo.\r
\r
Se dois testes diferentes mostram padrões parecidos, é um ótimo sinal.\r
\r
---\r
\r
## Como o Futuro Perfeito usa seu perfil\r
\r
No Futuro Perfeito, o teste não entrega apenas:\r
\r
> “Seu perfil é X.”\r
\r
Ele cruza:\r
\r
- seu perfil,  \r
- sua formação,  \r
- suas preferências,  \r
- áreas de concurso compatíveis,  \r
\r
e sugere **3 caminhos plausíveis**, com explicação.\r
\r
Sem prometer milagres.  \r
Com clareza e pé no chão.\r
\r
---\r
\r
## Perguntas frequentes\r
\r
### O teste pode estar errado?\r
Pode — principalmente se você responder tentando “acertar”.  \r
Seja sincero com seu cotidiano real.\r
\r
### Perfil muda com o tempo?\r
Algumas tendências permanecem, mas experiência e maturidade influenciam muito.\r
\r
### Posso gostar de um trabalho que não combina com meu perfil?\r
Pode — mas normalmente custa mais energia para manter.\r
\r
---\r
\r
## Quer entender melhor seu perfil sem complicação?\r
\r
Se quiser dar um passo simples:\r
\r
- responda perguntas diretas,  \r
- receba uma análise clara,  \r
- veja 3 caminhos que combinam com você.\r
\r
Sem promessas milagrosas — só clareza.\r
\r
👉 Pode fazer o teste do Futuro Perfeito quando quiser.\r
`,xz=`---\r
title: "Teste de personalidade profissional: o que ele revela (e o que não revela)"\r
description: "Entenda como um teste de personalidade profissional pode ajudar na escolha de carreira — sem cair na ilusão de respostas mágicas."\r
slug: "teste-de-personalidade-profissional"\r
date: "2026-02-03"\r
tags: ["perfil profissional", "personalidade", "teste vocacional", "carreira"]\r
---\r
\r
# Teste de personalidade profissional: o que ele revela (e o que não revela)\r
\r
Se você já fez algum teste e saiu pensando:\r
\r
> “Ok… deu esse resultado. Mas o que eu faço com isso agora?”\r
\r
Você não está sozinho.\r
\r
O **teste de personalidade profissional** pode ser extremamente útil —  \r
mas só quando é usado do jeito certo.\r
\r
Neste guia, vou te mostrar:\r
\r
- o que ele realmente mede,  \r
- como interpretar sem ilusões,  \r
- quando ele ajuda na prática,  \r
- e quando é melhor não levar tão a sério.\r
\r
---\r
\r
## O que é um teste de personalidade profissional?\r
\r
É um teste que tenta entender **como você reage** a situações de trabalho, como:\r
\r
- tomada de decisão,  \r
- convivência com outras pessoas,  \r
- organização,  \r
- adaptação às mudanças,  \r
- relação com pressão e prazos.\r
\r
Ele não mede inteligência.  \r
Ele mede **tendências comportamentais**.\r
\r
Exemplo:\r
\r
- algumas pessoas gostam de liderar,\r
- outras preferem apoiar,\r
- algumas precisam de rotina,\r
- outras funcionam melhor com variedade.\r
\r
> O teste ajuda a descrever isso de forma estruturada.\r
\r
---\r
\r
## O que ele pode te ajudar a descobrir\r
\r
Um bom teste de personalidade profissional pode esclarecer:\r
\r
### 🔹 Como você prefere trabalhar\r
Sozinho? Em equipe? Com autonomia? Com supervisão?\r
\r
### 🔹 Em que tipo de ambiente você rende mais\r
Calmo, competitivo, criativo, burocrático, dinâmico…\r
\r
### 🔹 Quanto de pressão emocional você tolera\r
Conflito direto, cobrança constante, situações delicadas.\r
\r
### 🔹 Que tipo de atividades drenam sua energia\r
Exposição pública, repetição extrema, conflito frequente, metas agressivas.\r
\r
Isso não “define sua vida”, mas **ilumina caminhos**.\r
\r
---\r
\r
## O que ele NÃO faz (mesmo que digam que faz)\r
\r
Um teste de personalidade profissional **não é oráculo**.\r
\r
Ele NÃO serve para:\r
\r
- decidir sua profissão sozinho,\r
- prever exatamente seu futuro,\r
- colocar você numa caixinha fixa,\r
- substituir experiência real.\r
\r
E muito menos para:\r
\r
> “Você nasceu para ser X e pronto.”\r
\r
Personalidade influencia — mas escolhas, contexto e prática contam muito.\r
\r
---\r
\r
## Teste de personalidade x teste de perfil profissional (qual a diferença?)\r
\r
Muita gente confunde.\r
\r
### ✔ Teste de personalidade\r
Foca em **como você se comporta**.\r
\r
### ✔ Teste de perfil profissional\r
Foca em **como você trabalha melhor** (tarefas, rotina, demandas).\r
\r
Eles se complementam.  \r
Quando usados juntos, trazem uma visão bem mais completa.\r
\r
---\r
\r
## Quando o teste realmente ajuda\r
\r
Ele é especialmente útil quando você:\r
\r
- sente que “não se encaixa” no trabalho atual,\r
- está pensando em mudar de área,\r
- tem dúvidas entre profissões diferentes,\r
- sente culpa por não gostar do que os outros consideram “bom”.\r
\r
O teste mostra:\r
\r
> “Não é que você seja errado —  \r
é que esse ambiente não conversa com quem você é.”\r
\r
Isso traz paz e direcionamento.\r
\r
---\r
\r
## Como interpretar seu resultado (sem paranoia)\r
\r
Quando sair o resultado, pergunte:\r
\r
- isso parece comigo?\r
- em quais momentos da minha vida isso apareceu?\r
- quando me senti bem, esse cenário estava presente?\r
- quando sofri, o oposto acontecia?\r
\r
E lembre:\r
\r
> Teste é um espelho.  \r
Não é um juiz.\r
\r
---\r
\r
## E quem quer seguir concurso público?\r
\r
Aqui ele é muito útil.\r
\r
Porque concursos não mudam sua personalidade — apenas **mudam o tipo de pressão**.\r
\r
O teste ajuda a entender se você se encaixa melhor em:\r
\r
- área administrativa,  \r
- atendimento ao público,  \r
- fiscal/campo,  \r
- jurídica,  \r
- saúde,  \r
- áreas mais técnicas e analíticas.\r
\r
Você pode até passar em qualquer um…  \r
Mas **sustentar** é outra história.\r
\r
---\r
\r
## Posso “dar um jeito” de mudar meu perfil?\r
\r
Sim — até certo ponto.\r
\r
Experiência, terapia, maturidade e treinamento **impactam bastante**.\r
\r
Mas ignorar totalmente sua natureza costuma gerar:\r
\r
- burnout,\r
- desmotivação,\r
- sensação de inadequação,\r
- vontade de fugir do trabalho.\r
\r
> O caminho é alinhar — não brigar com quem você é.\r
\r
---\r
\r
## Como o Futuro Perfeito usa testes de personalidade\r
\r
No Futuro Perfeito, nós não pegamos o resultado e falamos:\r
\r
> “Você é X — então faça Y.”\r
\r
Em vez disso, cruzamos:\r
\r
- personalidade,  \r
- preferências de rotina,  \r
- formação,  \r
- áreas de interesse,  \r
- realidade de concurso/carreira.\r
\r
E sugerimos **3 caminhos possíveis**, com explicações claras — sem empurrar nada.\r
\r
---\r
\r
## Perguntas frequentes\r
\r
### O teste pode errar?\r
Pode — principalmente se você responder tentando “parecer melhor”.\r
\r
### Vale repetir depois de um tempo?\r
Sim. Experiências novas mudam a forma como você reage.\r
\r
### Dá para se dar bem em algo que não bate com meu resultado?\r
Até dá — mas custa mais energia e costuma cansar mais rápido.\r
\r
---\r
\r
## Quer entender melhor seu jeito de trabalhar?\r
\r
Se quiser:\r
\r
- responder perguntas simples,  \r
- ver seu perfil descrito com clareza,  \r
- descobrir áreas mais compatíveis com você,\r
\r
o teste do Futuro Perfeito pode ajudar.\r
\r
Sem fórmulas mágicas.  \r
Só clareza para escolher melhor.\r
`,yz=`---\r
title: "Teste vocacional para adultos: ainda vale a pena?"\r
description: "Se você já é adulto e está repensando sua carreira, um teste vocacional pode ajudar — desde que usado do jeito certo. Veja como aproveitar de verdade."\r
slug: "teste-vocacional-adulto"\r
date: "2026-02-04"\r
tags: ["teste vocacional", "perfil profissional", "mudanca de carreira", "orientacao profissional"]\r
---\r
\r
# Teste vocacional para adultos: ainda vale a pena?\r
\r
Talvez você esteja vivendo algo parecido com isso:\r
\r
> “Escolhi uma profissão, trabalhei anos nela…  \r
e agora sinto que não combina mais comigo.”\r
\r
Essa sensação é mais comum do que parece.\r
\r
E é justamente por isso que muita gente procura um **teste vocacional para adultos**.\r
\r
Mas surge a dúvida:\r
\r
- será que funciona?\r
- não é tarde demais?\r
- será que vai me confundir ainda mais?\r
\r
Vamos conversar sobre isso — de forma sincera.\r
\r
---\r
\r
## O que muda entre um teste vocacional “normal” e um para adultos?\r
\r
Quando você é adolescente, o teste tenta descobrir:\r
\r
> “Para onde você poderia ir?”\r
\r
Quando você é adulto, a pergunta vira:\r
\r
> **“Dado tudo que eu já vivi… qual caminho faz mais sentido agora?”**\r
\r
Ou seja, entra em jogo:\r
\r
- experiências anteriores,  \r
- frustrações acumuladas,  \r
- responsabilidades (família, contas, segurança),  \r
- habilidades que você já desenvolveu.\r
\r
> O teste não começa do zero.  \r
Ele parte da sua história.\r
\r
---\r
\r
## Quando faz MUITO sentido fazer um teste vocacional sendo adulto\r
\r
Ele ajuda especialmente quando você:\r
\r
- se sente esgotado com sua área atual,\r
- pensa em mudar, mas não sabe para onde,\r
- sente que “foi no embalo” quando escolheu,\r
- gosta da estabilidade, mas não da rotina,\r
- tem medo de trocar e se arrepender de novo.\r
\r
Um bom teste vocacional ajuda a:\r
\r
- enxergar padrões do seu comportamento,\r
- identificar ambientes que te favorecem,\r
- eliminar opções que claramente não combinam,\r
- levantar alternativas possíveis.\r
\r
---\r
\r
## O que o teste NÃO vai fazer (e está tudo bem)\r
\r
Vamos ser diretos:\r
\r
❌ ele não vai te “revelar” uma profissão secreta  \r
❌ não vai te salvar de qualquer esforço  \r
❌ não vai decidir por você\r
\r
Ele é uma **ferramenta de clareza**, não uma solução mágica.\r
\r
> Ele organiza a sua cabeça.  \r
Quem decide é você.\r
\r
---\r
\r
## Como usar um teste vocacional sendo adulto (do jeito certo)\r
\r
Depois de fazer o teste, responda para si mesmo:\r
\r
### 1️⃣ O resultado parece comigo na prática?\r
Lembre de momentos da vida em que isso apareceu.\r
\r
### 2️⃣ Ele confirma coisas que eu já sentia?\r
Se sim, ótimo — isso reduz a culpa e reforça sua intuição.\r
\r
### 3️⃣ Ele aponta ambientes que me fazem mal?\r
Ambientes tóxicos não são “prova de maturidade”.  \r
Às vezes só não combinam com seu perfil.\r
\r
### 4️⃣ Ele mostra caminhos possíveis?\r
Não espere “uma resposta”.  \r
Espere **direções mais seguras**.\r
\r
---\r
\r
## Adultos mudam — e isso é normal\r
\r
Talvez:\r
\r
- aquilo que te motivava aos 18 já não motiva mais,\r
- prioridades mudaram,\r
- você já não tolera certas pressões,\r
- sua saúde mental pede outra coisa.\r
\r
Isso não é fraqueza.  \r
É **evolução**.\r
\r
> A maturidade ajuda você a escolher melhor — não pior.\r
\r
---\r
\r
## Teste vocacional e concursos públicos\r
\r
Aqui ele é especialmente útil.\r
\r
Não é sobre “qual concurso paga melhor”.  \r
É sobre:\r
\r
- rotina,\r
- tipo de pressão,\r
- contato com pessoas,\r
- ambiente,\r
- previsibilidade.\r
\r
Existem concursos:\r
\r
- com trabalho mais burocrático,  \r
- com contato intenso com o público,  \r
- com fiscalização e campo,  \r
- com plantões,  \r
- com rotina estável de gabinete.\r
\r
> O resultado do teste ajuda a não cair num cargo que te esgota.\r
\r
---\r
\r
## Quando o teste vocacional pode confundir\r
\r
Ele pode atrapalhar se você:\r
\r
- responde tentando “parecer bom”,  \r
- faz um teste raso, qualquer um,\r
- espera um milagre.\r
\r
O ideal:\r
\r
- seja radicalmente sincero,  \r
- use testes confiáveis,  \r
- combine com reflexão — não apenas com ansiedade.\r
\r
---\r
\r
## Como o Futuro Perfeito usa teste vocacional para adultos\r
\r
No Futuro Perfeito, o teste não solta:\r
\r
> “Seu resultado é X. Boa sorte.”\r
\r
Ele cruza:\r
\r
- seu perfil,  \r
- sua história,  \r
- suas preferências,  \r
- áreas compatíveis,  \r
- realidade de carreiras e concursos.\r
\r
E entrega **3 caminhos possíveis**, explicados com clareza — sem prometer fantasia.\r
\r
---\r
\r
## Perguntas frequentes\r
\r
### Não é tarde para mudar?\r
Não. Pode ser mais trabalhoso — mas é muito melhor do que passar 20 anos infeliz.\r
\r
### E se eu tiver medo de perder estabilidade?\r
Dá para ajustar a rota com planejamento — não precisa ser radical.\r
\r
### E se o teste mostrar algo que eu não esperava?\r
Veja como hipótese, não como sentença. Explore aos poucos.\r
\r
---\r
\r
## Se você quer clarear o próximo passo\r
\r
Se estiver cansado de decidir tudo no escuro, você pode:\r
\r
- responder perguntas simples,  \r
- entender melhor seu perfil,  \r
- ver caminhos que combinam mais com a sua realidade atual.\r
\r
O teste do Futuro Perfeito foi pensado exatamente para isso.\r
\r
Sem promessa milagrosa.  \r
Só clareza — para um adulto decidir com consciência.\r
`,bz=`---\r
title: "Concurso público ou iniciativa privada: qual vale mais a pena?"\r
description: "Uma comparação realista entre concurso público e iniciativa privada para quem busca estabilidade, bons salários e qualidade de vida."\r
slug: "concurso-publico-ou-iniciativa-privada"\r
date: "2026-02-08"\r
tags: ["concurso publico", "iniciativa privada", "carreira", "estabilidade"]\r
---\r
\r
# Concurso público ou iniciativa privada: qual vale mais a pena?\r
\r
Em algum momento da vida profissional, muita gente se depara com essa dúvida:\r
\r
> **Vale mais a pena seguir na iniciativa privada ou tentar um concurso público?**\r
\r
Essa pergunta costuma surgir quando:\r
\r
- o salário até é razoável, mas a pressão é alta;\r
- a carreira anda, mas nunca parece segura;\r
- o esforço é constante, mas a sensação de instabilidade não vai embora.\r
\r
Vamos comparar os dois caminhos **sem romantizar nenhum** — mas sendo honestos.\r
\r
---\r
\r
## Iniciativa privada: crescimento rápido, mas instável\r
\r
A iniciativa privada costuma atrair por prometer:\r
\r
- crescimento acelerado,\r
- meritocracia,\r
- possibilidade de ganhos maiores no curto prazo.\r
\r
E, de fato, para algumas pessoas, funciona bem.\r
\r
Mas existe um outro lado que pesa com o tempo:\r
\r
- demissões frequentes (mesmo para bons profissionais),\r
- metas cada vez mais agressivas,\r
- pressão constante por performance,\r
- mudanças repentinas de gestão,\r
- insegurança sobre o futuro.\r
\r
> Na prática, você pode estar indo bem hoje…  \r
e fora da empresa amanhã.\r
\r
---\r
\r
## Concurso público: menos glamour, mais previsibilidade\r
\r
O concurso público raramente vende um sonho glamouroso.  \r
Ele oferece algo diferente — e, para muita gente, mais valioso:\r
\r
- **estabilidade**,\r
- regras claras,\r
- previsibilidade de renda,\r
- progressão salarial definida.\r
\r
E isso muda completamente a relação com o trabalho.\r
\r
---\r
\r
## Estabilidade: o fator que muda o jogo\r
\r
Na iniciativa privada, estabilidade quase sempre depende de:\r
\r
- mercado,\r
- humor da empresa,\r
- decisões que você não controla.\r
\r
No serviço público:\r
\r
- a demissão não acontece “do nada”,\r
- existe proteção legal,\r
- o risco de perda abrupta de renda é muito menor.\r
\r
> Isso reduz ansiedade, melhora o sono e muda a forma como você vive fora do trabalho.\r
\r
---\r
\r
## Salário: a comparação real (e não o mito)\r
\r
Existe a ideia de que:\r
\r
> “Na iniciativa privada sempre se ganha mais.”\r
\r
Nem sempre.\r
\r
Em muitos cargos públicos:\r
\r
- o salário inicial já supera boa parte do setor privado,\r
- há **progressão automática** ao longo do tempo,\r
- benefícios entram na conta,\r
- o teto de ganho é claro — e atingível.\r
\r
Enquanto isso, no setor privado:\r
\r
- aumentos dependem de negociações,\r
- promoções não são garantidas,\r
- o salário pode estagnar mesmo com esforço alto.\r
\r
Para quem busca previsibilidade financeira, o concurso costuma levar vantagem.\r
\r
---\r
\r
## Progressão de carreira: previsível x incerta\r
\r
### Iniciativa privada\r
- crescimento depende de vaga, gestor e contexto;\r
- você pode performar bem e ainda assim não subir;\r
- mudanças de liderança podem travar sua carreira.\r
\r
### Concurso público\r
- progressão é clara e definida em lei;\r
- você sabe onde pode chegar e em quanto tempo;\r
- o crescimento não depende de política interna.\r
\r
> Não é sobre crescer rápido — é sobre crescer com segurança.\r
\r
---\r
\r
## Qual ambiente combina mais com você?\r
\r
A escolha não é só financeira.\r
\r
### Iniciativa privada costuma combinar com quem:\r
- gosta de competição,\r
- aceita riscos,\r
- lida bem com pressão constante,\r
- busca crescimento acelerado.\r
\r
### Concurso público costuma combinar com quem:\r
- valoriza estabilidade,\r
- prefere rotina previsível,\r
- quer segurança no longo prazo,\r
- busca equilíbrio entre trabalho e vida pessoal.\r
\r
Nenhum é “melhor para todo mundo”.  \r
Mas **um deles costuma ser melhor para quem busca paz**.\r
\r
---\r
\r
## Por que tanta gente migra da iniciativa privada para concurso?\r
\r
Não é falta de ambição.\r
\r
Normalmente é:\r
\r
- cansaço emocional,\r
- desejo de previsibilidade,\r
- busca por qualidade de vida,\r
- vontade de sair do ciclo de pressão constante.\r
\r
Muita gente percebe que:\r
\r
> ganhar um pouco menos (ou até igual)  \r
> com muito menos ansiedade  \r
> vale muito mais.\r
\r
---\r
\r
## Concurso público é garantia de felicidade?\r
\r
Não.\r
\r
Mas costuma oferecer:\r
\r
- menos medo do futuro,\r
- menos instabilidade financeira,\r
- menos dependência de decisões externas.\r
\r
E isso, para muita gente, já muda tudo.\r
\r
---\r
\r
## Como escolher sem se arrepender\r
\r
O erro não é escolher iniciativa privada ou concurso.\r
\r
O erro é escolher **sem entender seu perfil**.\r
\r
Antes de decidir, é importante refletir sobre:\r
\r
- sua tolerância à pressão,\r
- sua necessidade de estabilidade,\r
- o tipo de rotina que deseja,\r
- o que você espera do trabalho nos próximos 10–20 anos.\r
\r
---\r
\r
## Onde o Futuro Perfeito entra nessa decisão\r
\r
O Futuro Perfeito não diz:\r
\r
> “Concurso é sempre melhor.”\r
\r
Ele ajuda você a:\r
\r
- entender seu perfil,\r
- comparar iniciativa privada x setor público de forma realista,\r
- identificar áreas de concurso compatíveis,\r
- enxergar **caminhos possíveis**, sem fantasia.\r
\r
Especialmente para quem vem da iniciativa privada e nunca estudou para concurso.\r
\r
---\r
\r
## Perguntas frequentes\r
\r
### Concurso paga melhor que iniciativa privada?\r
Em muitos cargos, sim — principalmente no médio e longo prazo.\r
\r
### É difícil se adaptar ao setor público?\r
Depende do perfil. Quem gosta de regras e previsibilidade costuma se adaptar bem.\r
\r
### Dá para tentar concurso sem largar o trabalho?\r
Sim — e essa é a forma mais inteligente de começar.\r
\r
---\r
\r
## Então, qual escolher?\r
\r
Se você busca:\r
\r
- estabilidade,\r
- salário previsível,\r
- progressão clara,\r
- menos risco de demissão,\r
\r
o concurso público tende a ser uma escolha mais segura do que a iniciativa privada.\r
\r
Mas a decisão certa é aquela que combina com você —  \r
não com o discurso dos outros.\r
\r
Se quiser clarear essa escolha com mais segurança, o teste do Futuro Perfeito pode ajudar.\r
\r
Sem pressão.  \r
Sem promessa vazia.  \r
Só clareza para decidir melhor.\r
`,wz=`---\r
title: "Vale a pena estudar para concurso hoje em dia?"\r
description: "Para quem nunca estudou para concurso público e está em dúvida se ainda vale a pena começar hoje, este guia traz uma visão realista e um caminho inicial."\r
slug: "vale-a-pena-estudar-para-concurso-hoje-em-dia"\r
date: "2026-02-09"\r
tags: ["concurso publico", "iniciantes", "estudar para concurso", "mudanca de carreira"]\r
---\r
\r
# Vale a pena estudar para concurso hoje em dia?\r
\r
Se você nunca estudou para concurso público e está se perguntando isso, é bem provável que também esteja pensando:\r
\r
> “Será que já não ficou tarde demais?”  \r
> “Será que concurso não está saturado?”  \r
> “Por onde eu começaria sem me perder?”\r
\r
Essas dúvidas são normais — principalmente para quem vem da iniciativa privada e **não faz parte do mundo dos concurseiros**.\r
\r
Vamos falar disso de forma clara e realista.\r
\r
---\r
\r
## Por que tanta gente ainda pensa em concurso hoje?\r
\r
Apesar de todas as mudanças no mercado de trabalho, o concurso público continua atraindo porque oferece algo raro hoje em dia:\r
\r
- previsibilidade,\r
- estabilidade,\r
- regras claras,\r
- progressão salarial definida.\r
\r
Enquanto na iniciativa privada muita coisa muda rápido demais, o setor público segue uma lógica mais estável.\r
\r
> Para quem busca segurança no longo prazo, isso pesa — e muito.\r
\r
---\r
\r
## “Mas concurso não está muito concorrido?”\r
\r
Sim, está.  \r
Mas isso não conta a história toda.\r
\r
O erro é achar que **todo concurso é igual**.\r
\r
Nem todo concurso é:\r
\r
- super disputado,\r
- nível juiz ou auditor,\r
- anos de estudo.\r
\r
Existem muitos concursos que:\r
\r
- não exigem experiência prévia,\r
- têm conteúdo mais enxuto,\r
- permitem uma preparação organizada,\r
- são acessíveis para quem está começando.\r
\r
O problema não é a concorrência.  \r
É **começar sem estratégia**.\r
\r
---\r
\r
## Vale a pena começar hoje se eu nunca estudei?\r
\r
Para muita gente, sim — **desde que comece do jeito certo**.\r
\r
Quem nunca estudou costuma errar ao:\r
\r
- querer estudar tudo ao mesmo tempo,\r
- escolher concursos irreais,\r
- copiar rotina de concurseiro profissional,\r
- não saber nem para qual cargo está estudando.\r
\r
Começar bem significa:\r
\r
- escolher um **tipo de cargo compatível com você**,  \r
- entender o básico do conteúdo,  \r
- criar uma rotina simples e sustentável.\r
\r
---\r
\r
## O maior erro de quem está começando\r
\r
O maior erro não é falta de inteligência.\r
\r
É começar assim:\r
\r
> “Vou estudar concurso”  \r
sem saber:\r
- qual área,\r
- qual cargo,\r
- qual rotina vem depois da aprovação.\r
\r
Isso gera frustração rápida.\r
\r
> Concurso não é loteria.  \r
> É projeto de médio prazo.\r
\r
---\r
\r
## Como saber se concurso combina com você\r
\r
Antes de abrir um edital, vale refletir:\r
\r
- você lida bem com rotina?\r
- valoriza estabilidade?\r
- prefere previsibilidade a risco?\r
- aceita estudar matérias teóricas?\r
- busca segurança mais do que adrenalina?\r
\r
Se a resposta for “sim” para a maioria, concurso **pode** fazer sentido.\r
\r
Se você odeia regras e rotina, talvez não seja o melhor caminho.\r
\r
---\r
\r
## Por onde começar (sem se perder)\r
\r
Para quem nunca estudou, o melhor caminho é:\r
\r
### 1️⃣ Entender seu perfil\r
Antes de escolher um concurso, entenda:\r
- seu jeito de trabalhar,\r
- sua tolerância à pressão,\r
- sua relação com rotina.\r
\r
### 2️⃣ Escolher uma área, não um edital\r
Área administrativa, judiciária, fiscal, policial, etc.  \r
Isso reduz drasticamente a confusão.\r
\r
### 3️⃣ Começar pelo básico\r
Português, matemática básica, direito introdutório (dependendo da área).  \r
Nada de querer estudar tudo de uma vez.\r
\r
### 4️⃣ Criar uma rotina possível\r
Não é sobre estudar 8 horas por dia.  \r
É sobre **constância**, mesmo com pouco tempo.\r
\r
---\r
\r
## Concurso hoje não é “plano B”\r
\r
Para muita gente, concurso virou **plano de vida**.\r
\r
Não por falta de ambição —  \r
mas por busca de estabilidade, equilíbrio e previsibilidade.\r
\r
> Crescer com menos ansiedade também é sucesso.\r
\r
---\r
\r
## E se eu começar e desistir?\r
\r
Acontece.  \r
Mas começar sem direção aumenta muito a chance de desistência.\r
\r
Com um norte claro, mesmo quem desiste sai com mais clareza sobre si.\r
\r
---\r
\r
## Como o Futuro Perfeito ajuda quem está começando\r
\r
O Futuro Perfeito foi pensado justamente para quem:\r
\r
- nunca estudou para concurso,\r
- vem da iniciativa privada,\r
- está confuso,\r
- não quer perder tempo com escolhas erradas.\r
\r
Ele ajuda a:\r
\r
- entender seu perfil,\r
- identificar áreas de concurso compatíveis,\r
- mostrar **caminhos possíveis**,\r
- reduzir a confusão inicial.\r
\r
Sem prometer “concurso fácil”.  \r
Com orientação.\r
\r
---\r
\r
## Perguntas frequentes\r
\r
### Concurso ainda vale a pena financeiramente?\r
Em muitos cargos, sim — especialmente no médio e longo prazo.\r
\r
### Preciso largar o trabalho para estudar?\r
Não. O ideal é começar conciliando.\r
\r
### Quanto tempo leva para passar?\r
Depende do cargo, da estratégia e da constância. Não existe resposta única.\r
\r
---\r
\r
## Então… vale a pena?\r
\r
Para quem busca:\r
\r
- estabilidade,\r
- previsibilidade,\r
- segurança financeira,\r
- menos risco de demissão,\r
\r
**sim, ainda vale a pena estudar para concurso hoje em dia**.\r
\r
Mas não do jeito bagunçado que muita gente começa.\r
\r
Se você quer um norte inicial para entender **se concurso faz sentido para você e por onde começar**, o teste do Futuro Perfeito pode ajudar.\r
\r
Sem pressão.  \r
Sem ilusão.  \r
Só clareza para decidir melhor.\r
`,jz=`---\r
title: "Vale a pena fazer concurso público depois dos 30?"\r
description: "Para quem passou dos 30, está insatisfeito na iniciativa privada e pensa em estabilidade, concurso público ainda vale a pena — desde que seja bem escolhido."\r
slug: "vale-a-pena-fazer-concurso-publico-depois-dos-30"\r
date: "2026-02-07"\r
tags: ["concurso publico", "mudanca de carreira", "concurso depois dos 30", "estabilidade"]\r
---\r
\r
# Vale a pena fazer concurso público depois dos 30?\r
\r
Se você tem mais de 30 anos e já pensou nisso, provavelmente o pensamento veio assim:\r
\r
> “Será que não é tarde demais para fazer concurso público?”\r
\r
Ou pior:\r
\r
> “Eu até faria… mas não tenho tempo, nem cabeça pra virar concurseiro profissional.”\r
\r
Essa dúvida é **muito comum** — especialmente entre pessoas que:\r
\r
- já trabalham há anos na iniciativa privada,\r
- ganham relativamente bem,\r
- estão cansadas da pressão,\r
- mas sentem que a vida virou só trabalho e cobrança.\r
\r
Vamos falar disso sem romantizar concurso e sem discurso motivacional vazio.\r
\r
---\r
\r
## O que normalmente leva alguém a pensar em concurso depois dos 30\r
\r
Quase nunca é “sonho de infância”.\r
\r
Geralmente vem depois de:\r
\r
- anos batendo meta,\r
- chefes diferentes, mesmos problemas,\r
- insegurança constante,\r
- medo de demissão,\r
- sensação de que o esforço nunca estabiliza.\r
\r
A pessoa não quer “ficar rica rápido”.\r
\r
Ela quer:\r
\r
- previsibilidade,\r
- rotina mais clara,\r
- segurança,\r
- tempo para viver.\r
\r
E isso muda completamente a lógica da escolha.\r
\r
---\r
\r
## Concurso depois dos 30 NÃO é igual a concurso aos 20\r
\r
Esse é um erro comum de comparação.\r
\r
Aos 20:\r
- tempo sobrando,\r
- menos responsabilidades,\r
- disposição para estudar qualquer coisa.\r
\r
Depois dos 30:\r
- tempo limitado,\r
- contas,\r
- vida acontecendo,\r
- menos tolerância a sofrimento desnecessário.\r
\r
Por isso, **não faz sentido copiar o modelo do concurseiro hardcore**.\r
\r
O caminho precisa ser outro.\r
\r
---\r
\r
## O maior erro de quem começa tarde\r
\r
O erro não é a idade.\r
\r
É este aqui:\r
\r
> “Vou fazer qualquer concurso, só pra passar.”\r
\r
Isso leva a:\r
\r
- cargos que não combinam com você,\r
- rotinas frustrantes,\r
- arrependimento depois da posse.\r
\r
Depois dos 30, **não dá mais para errar feio**.\r
\r
O foco precisa ser:\r
\r
- concursos com conteúdo acessível,\r
- cargos que não exigem experiência prévia,\r
- rotinas mais administrativas,\r
- ambientes previsíveis.\r
\r
---\r
\r
## Existem concursos “possíveis” para quem nunca estudou?\r
\r
Sim — e esse é um ponto importante.\r
\r
Nem todo concurso é:\r
\r
- auditor fiscal,\r
- juiz,\r
- policial,\r
- carreira super disputada.\r
\r
Existem muitos cargos que:\r
\r
- não exigem experiência anterior,\r
- têm conteúdo mais objetivo,\r
- permitem uma preparação estratégica,\r
- pagam bem o suficiente para mudar sua qualidade de vida.\r
\r
O segredo está em **escolher bem o tipo de cargo**, não apenas o salário.\r
\r
---\r
\r
## O perfil que mais se adapta bem depois dos 30\r
\r
Pessoas que costumam se dar melhor nessa fase:\r
\r
- já têm disciplina de trabalho,\r
- sabem estudar com foco,\r
- valorizam rotina,\r
- não precisam provar nada para ninguém,\r
- preferem estabilidade a adrenalina constante.\r
\r
Ou seja:  \r
**maturidade ajuda — não atrapalha.**\r
\r
---\r
\r
## Mas e o tempo para estudar?\r
\r
Aqui vai uma verdade que quase ninguém fala:\r
\r
> Quem trabalha e estuda com método costuma render mais do que quem só estuda sem direção.\r
\r
Depois dos 30, estudar precisa ser:\r
\r
- objetivo,\r
- com edital bem escolhido,\r
- sem desperdício de energia,\r
- com expectativa realista.\r
\r
Não é sobre estudar 10 horas por dia.  \r
É sobre estudar **o que faz sentido**.\r
\r
---\r
\r
## Concurso público é fuga da iniciativa privada?\r
\r
Não necessariamente.\r
\r
Para muita gente, é **reposicionamento de vida**.\r
\r
Sair de um ambiente:\r
\r
- instável,\r
- competitivo demais,\r
- emocionalmente desgastante,\r
\r
para outro:\r
\r
- previsível,\r
- com regras claras,\r
- com menos pressão diária,\r
\r
não é fraqueza.  \r
É estratégia.\r
\r
---\r
\r
## Quando NÃO vale a pena fazer concurso depois dos 30\r
\r
Vamos ser honestos.\r
\r
Talvez não seja para você se:\r
\r
- você odeia rotina,\r
- precisa de constante novidade,\r
- não suporta regras,\r
- quer crescer rápido a qualquer custo,\r
- se sente mal em ambientes mais burocráticos.\r
\r
Concurso não é solução universal.\r
\r
---\r
\r
## Como evitar entrar no concurso errado\r
\r
Antes de escolher, é essencial entender:\r
\r
- seu perfil,\r
- sua tolerância à pressão,\r
- sua relação com rotina,\r
- o tipo de ambiente em que você rende melhor.\r
\r
Muita frustração acontece porque a pessoa escolheu **no escuro**.\r
\r
---\r
\r
## Onde o Futuro Perfeito entra nisso\r
\r
O Futuro Perfeito não promete:\r
\r
> “Passe em concurso fácil.”\r
\r
Ele ajuda você a:\r
\r
- entender seu perfil,\r
- cruzar com sua experiência de vida,\r
- identificar áreas de concurso compatíveis,\r
- enxergar **caminhos possíveis**, não fantasias.\r
\r
Especialmente para quem:\r
\r
- nunca estudou para concurso,\r
- tem mais de 30,\r
- quer estabilidade sem destruir a saúde mental.\r
\r
---\r
\r
## Perguntas frequentes\r
\r
### Estou velho para começar?\r
Não. Você só não pode começar sem critério.\r
\r
### Preciso estudar anos?\r
Depende do cargo e da estratégia. Muitos não exigem maratona infinita.\r
\r
### Dá para conciliar trabalho e estudo?\r
Sim — se o concurso for bem escolhido.\r
\r
### Concurso garante felicidade?\r
Não. Mas pode garantir **menos ansiedade diária**, o que já muda muita coisa.\r
\r
---\r
\r
## Então… vale a pena?\r
\r
Para muita gente depois dos 30, a resposta é:\r
\r
> **Sim — desde que seja o concurso certo, pelo motivo certo.**\r
\r
Não é sobre status.  \r
É sobre qualidade de vida.\r
\r
Se você está nessa dúvida, clareza vale mais do que força de vontade.\r
\r
Se quiser entender melhor **quais tipos de concurso combinam com você**, o teste do Futuro Perfeito pode ajudar.\r
\r
Sem pressão.  \r
Sem promessas mágicas.  \r
Só orientação para decidir com mais segurança.\r
`,Sz=`---\r
title: "Como descobrir minhas habilidades profissionais (e transformar isso em escolhas reais)"\r
description: "Um guia prático para descobrir suas habilidades profissionais, entender como elas aparecem no trabalho e escolher carreiras ou concursos compatíveis."\r
slug: "como-descobrir-minhas-habilidades-profissionais"\r
date: "2026-02-10"\r
tags: ["habilidades profissionais", "perfil profissional", "escolha de carreira", "concurso publico"]\r
---\r
\r
# Como descobrir minhas habilidades profissionais (e transformar isso em escolhas reais)\r
\r
Se você já tentou responder essa pergunta, talvez tenha travado aqui:\r
\r
> “Eu sei do que eu gosto…  \r
mas não sei no que eu realmente sou bom.”\r
\r
Esse é o ponto onde muita gente se perde —  \r
e onde a maioria dos conteúdos na internet falha.\r
\r
Descobrir habilidades profissionais **não é sobre gosto**.  \r
É sobre **comportamento na prática**.\r
\r
Vamos direto ao que funciona.\r
\r
---\r
\r
## O erro mais comum: confundir gostar com ser bom\r
\r
Muita gente acha que habilidade é:\r
\r
- “gosto de conversar”  \r
- “gosto de ajudar pessoas”  \r
- “gosto de organização”  \r
\r
Mas gostar não sustenta carreira.\r
\r
A pergunta certa não é:\r
> “O que eu gosto?”\r
\r
É:\r
> **“O que eu faço bem, mesmo quando não estou animado?”**\r
\r
Isso muda tudo.\r
\r
---\r
\r
## Habilidade profissional é comportamento repetido\r
\r
Habilidades aparecem no dia a dia, não em testes abstratos.\r
\r
Observe situações reais:\r
\r
- quando surge um problema, o que você faz primeiro?\r
- você organiza, executa, analisa ou comunica?\r
- as pessoas costumam pedir ajuda em quê?\r
- em quais tarefas você é rápido sem perceber?\r
\r
Esses padrões revelam **habilidades reais**.\r
\r
---\r
\r
## Habilidade natural x habilidade treinável (diferença crucial)\r
\r
### 🔹 Habilidades naturais\r
São aquelas que:\r
- aparecem cedo,\r
- exigem menos esforço mental,\r
- você faz melhor que a média sem treino intenso.\r
\r
Exemplos:\r
- organizar informações,\r
- manter rotina,\r
- lidar com pressão,\r
- explicar coisas com clareza,\r
- resolver problemas práticos.\r
\r
### 🔹 Habilidades treináveis\r
São importantes, mas exigem:\r
- esforço constante,\r
- energia contínua,\r
- maior desgaste.\r
\r
Exemplos:\r
- liderança agressiva,\r
- vendas intensas,\r
- exposição pública constante,\r
- improviso frequente.\r
\r
👉 **Carreiras sustentáveis se apoiam nas habilidades naturais**,  \r
não só nas treináveis.\r
\r
---\r
\r
## Exemplos práticos (tradução para o mundo real)\r
\r
Vamos sair da teoria.\r
\r
### Se você…\r
- gosta de rotina,\r
- segue processos,\r
- se incomoda com bagunça,\r
- é confiável e constante,\r
\r
👉 isso aponta para **funções administrativas**, controle, gestão de processos.\r
\r
---\r
\r
### Se você…\r
- resolve problemas rapidamente,\r
- prefere ação à discussão,\r
- não gosta de ficar parado,\r
- lida bem com imprevistos,\r
\r
👉 isso aponta para **funções operacionais ou de campo**.\r
\r
---\r
\r
### Se você…\r
- analisa detalhes,\r
- gosta de dados, regras e lógica,\r
- questiona inconsistências,\r
- prefere trabalhar com informação,\r
\r
👉 isso aponta para **áreas analíticas, fiscais ou técnicas**.\r
\r
---\r
\r
### Se você…\r
- se comunica bem,\r
- orienta pessoas,\r
- lida bem com demandas humanas,\r
- mantém calma em conflitos,\r
\r
👉 isso aponta para **funções de atendimento, orientação ou liderança moderada**.\r
\r
---\r
\r
## Como suas habilidades se conectam com concursos públicos\r
\r
Aqui está um ponto que quase ninguém explica.\r
\r
Concurso não é “uma coisa só”.\r
\r
Existem **tipos de cargos**, com rotinas completamente diferentes.\r
\r
### Exemplos de conexão habilidade → área de concurso\r
\r
- organização + rotina → **área administrativa**\r
- análise + regras → **área fiscal / controle**\r
- ação + campo → **área operacional / fiscalização**\r
- comunicação + pessoas → **atendimento público / educação / saúde**\r
\r
👉 Quem escolhe concurso sem entender isso costuma se frustrar depois da aprovação.\r
\r
---\r
\r
## Outro erro comum: olhar só para o nome do cargo\r
\r
“Cargo bonito” engana.\r
\r
O que importa é:\r
- rotina diária,\r
- tipo de problema,\r
- ambiente,\r
- nível de pressão.\r
\r
> Habilidade errada no ambiente errado gera exaustão — mesmo com estabilidade.\r
\r
---\r
\r
## Como começar a mapear suas habilidades (sem achismo)\r
\r
Faça isso de forma prática:\r
\r
1️⃣ Liste tarefas do seu trabalho atual que você faz bem  \r
2️⃣ Observe quais exigem menos esforço mental  \r
3️⃣ Veja onde as pessoas confiam em você  \r
4️⃣ Compare com ambientes de trabalho reais  \r
\r
Esse cruzamento já elimina muita confusão.\r
\r
---\r
\r
## Onde testes entram (do jeito certo)\r
\r
Testes não servem para:\r
❌ te rotular  \r
❌ decidir sua vida  \r
\r
Eles servem para:\r
✔ organizar padrões  \r
✔ cruzar comportamento + rotina  \r
✔ reduzir escolhas incompatíveis  \r
\r
Quando bem usados, ajudam a transformar **habilidade abstrata em direção concreta**.\r
\r
---\r
\r
## Como o Futuro Perfeito ajuda nesse processo\r
\r
O Futuro Perfeito não pergunta apenas:\r
> “Do que você gosta?”\r
\r
Ele analisa:\r
- como você trabalha,\r
- como reage à rotina,\r
- como lida com pressão,\r
- quais ambientes combinam com você.\r
\r
E traduz isso em **áreas reais de carreira e concurso**, explicadas com clareza.\r
\r
---\r
\r
## Resumo rápido (o que você deve levar daqui)\r
\r
- habilidade ≠ gosto  \r
- habilidade aparece no comportamento  \r
- habilidade natural sustenta carreira  \r
- cargos são pacotes de rotina + pressão  \r
- concurso só funciona quando combina com seu perfil  \r
\r
---\r
\r
## Quer clarear isso com mais precisão?\r
\r
Se você sente que:\r
- faz muita coisa bem, mas não sabe onde encaixar,\r
- tem medo de escolher errado,\r
- quer algo mais estável, mas compatível com você,\r
\r
o teste do Futuro Perfeito pode ajudar a transformar suas habilidades em **caminhos reais**, sem achismo.\r
\r
Sem promessa mágica.  \r
Só clareza para decidir melhor.\r
`,Cz=`---\r
title: "Como escolher um concurso pelo perfil (e evitar se arrepender depois da aprovação)"\r
description: "Veja como escolher um concurso público com base no seu perfil comportamental, rotina, pressão e longo prazo — e não só por salário."\r
slug: "como-escolher-um-concurso-pelo-perfil"\r
date: "2026-02-13"\r
tags: ["concurso publico", "perfil profissional", "qual concurso escolher", "iniciante em concurso"]\r
---\r
\r
# Como escolher um concurso pelo perfil (e evitar se arrepender depois da aprovação)\r
\r
A maioria das pessoas escolhe concurso assim:\r
\r
- olha o salário  \r
- vê o nível de escolaridade  \r
- pergunta se “é difícil”  \r
- começa a estudar  \r
\r
E só descobre o erro **depois da aprovação**.\r
\r
O problema não é o concurso.  \r
É **não escolher pelo perfil**.\r
\r
---\r
\r
## Concurso não é só prova — é rotina para anos\r
\r
Antes de pensar em edital, pense nisso:\r
\r
> Você não vai fazer concurso só para passar.  \r
> Você vai **trabalhar nesse cargo por anos**.\r
\r
Por isso, escolher concurso é escolher:\r
- tipo de rotina  \r
- nível de pressão  \r
- ambiente de trabalho  \r
- ritmo diário  \r
- forma de cobrança  \r
\r
Salário sozinho não sustenta isso.\r
\r
---\r
\r
## O que significa “escolher pelo perfil”\r
\r
Escolher pelo perfil é cruzar quatro coisas:\r
\r
1️⃣ como você funciona no trabalho  \r
2️⃣ como é a rotina do cargo  \r
3️⃣ que tipo de conteúdo você estuda melhor  \r
4️⃣ como esse cargo evolui no longo prazo  \r
\r
Quando essas quatro coisas batem, o concurso faz sentido.\r
\r
---\r
\r
## Perfis comportamentais mais comuns (exemplos reais)\r
\r
### 🧾 Perfil executor (operacional)\r
\r
Você:\r
- gosta de fazer acontecer  \r
- prefere ação a discussão  \r
- se irrita com excesso de teoria  \r
- funciona bem com tarefas claras  \r
\r
📌 Tendem a combinar melhor com:\r
- cargos operacionais  \r
- fiscalização  \r
- áreas de campo  \r
- funções com execução direta  \r
\r
🚫 Costumam sofrer em cargos muito burocráticos.\r
\r
---\r
\r
### 📊 Perfil analítico\r
\r
Você:\r
- gosta de regras, dados e lógica  \r
- se sente confortável com leitura  \r
- analisa antes de agir  \r
- prefere previsibilidade  \r
\r
📌 Tendem a combinar melhor com:\r
- áreas administrativas  \r
- controle, fiscalização  \r
- cargos técnicos  \r
- rotinas estruturadas  \r
\r
🚫 Sofrem com ambientes caóticos.\r
\r
---\r
\r
### 🧑‍💼 Perfil organizador\r
\r
Você:\r
- gosta de ordem  \r
- segue processos  \r
- é constante  \r
- se sente bem com rotina  \r
\r
📌 Tendem a combinar melhor com:\r
- área administrativa  \r
- gestão de processos  \r
- apoio técnico  \r
- cargos internos  \r
\r
🚫 Se desgastam em ambientes imprevisíveis.\r
\r
---\r
\r
### 🧠 Perfil estratégico / decisório\r
\r
Você:\r
- gosta de planejar  \r
- pensa no longo prazo  \r
- lida bem com responsabilidade  \r
- tolera pressão  \r
\r
📌 Tendem a combinar melhor com:\r
- cargos de gestão  \r
- áreas com tomada de decisão  \r
- carreiras com progressão clara  \r
\r
🚫 Sofrem em cargos excessivamente repetitivos.\r
\r
---\r
\r
## Rotina e pressão: o ponto que mais gera arrependimento\r
\r
Antes de escolher, pergunte:\r
\r
- eu tolero rotina repetitiva?\r
- lido bem com cobrança constante?\r
- prefiro previsibilidade ou desafio diário?\r
- gosto de hierarquia clara?\r
\r
Muita gente passa e depois percebe:\r
> “O problema não era o estudo.  \r
> Era o ambiente.”\r
\r
---\r
\r
## Conteúdo da prova também precisa combinar com você\r
\r
Não adianta escolher um cargo “ideal” se você:\r
- odeia leitura  \r
- não lida bem com teoria  \r
- se perde em conteúdo abstrato  \r
\r
Alguns concursos exigem:\r
- leitura extensa  \r
- memorização  \r
- estudo contínuo  \r
\r
Outros:\r
- mais prática  \r
- menos densidade teórica  \r
\r
👉 **Estudar algo incompatível com seu perfil vira tortura.**\r
\r
---\r
\r
## O erro clássico: escolher só pelo salário\r
\r
Salário alto costuma vir com:\r
- mais cobrança  \r
- mais responsabilidade  \r
- mais pressão  \r
\r
Se isso não combina com você, o cargo pesa.\r
\r
> Dinheiro ajuda.  \r
> Mas rotina errada cobra caro.\r
\r
---\r
\r
## Como eliminar opções (passo mais importante)\r
\r
Antes de decidir, elimine concursos que:\r
\r
❌ exigem rotina que você odeia  \r
❌ cobram matérias incompatíveis  \r
❌ têm pressão que você não tolera  \r
❌ não oferecem o estilo de vida que você quer  \r
\r
Eliminar bem vale mais do que escolher rápido.\r
\r
---\r
\r
## Um caminho simples para decidir (sem se perder)\r
\r
Um método prático:\r
\r
1. identifique seu perfil predominante  \r
2. entenda que tipo de rotina te favorece  \r
3. elimine áreas incompatíveis  \r
4. selecione **3 concursos possíveis**  \r
5. escolha um como foco principal  \r
\r
Isso já te coloca à frente da maioria.\r
\r
---\r
\r
## Onde muita gente erra nessa etapa\r
\r
❌ copia escolha de amigos  \r
❌ escolhe só pelo salário  \r
❌ ignora rotina real  \r
❌ começa a estudar sem decidir  \r
❌ troca de foco toda hora  \r
\r
Concurso não é impulso.  \r
É projeto.\r
\r
---\r
\r
## Como o Futuro Perfeito ajuda nessa decisão\r
\r
O Futuro Perfeito foi pensado exatamente para esse momento.\r
\r
Ele ajuda você a:\r
- identificar seu perfil comportamental  \r
- cruzar com rotinas reais de cargos  \r
- eliminar opções ruins  \r
- chegar a **3 concursos ideais**, explicados  \r
\r
Sem empurrar.  \r
Sem lista genérica.  \r
Com clareza.\r
\r
---\r
\r
## Resumo final\r
\r
- concurso não é igual para todo mundo  \r
- perfil define adaptação  \r
- rotina importa mais que nome  \r
- eliminar opções evita arrependimento  \r
- foco em um concurso acelera resultados  \r
\r
---\r
\r
## Quer chegar a 3 opções realmente compatíveis?\r
\r
Se você está confuso entre vários concursos e não quer errar na escolha, o teste do Futuro Perfeito pode ajudar a transformar seu perfil em **decisão prática**.\r
\r
Sem mágica.  \r
Sem achismo.  \r
Só clareza.\r
`,Nz=`---\r
title: "Como saber se concurso combina comigo? Um guia honesto antes de decidir"\r
description: "Antes de começar a estudar para concurso público, veja como saber se esse caminho realmente combina com seu perfil, rotina e expectativas."\r
slug: "como-saber-se-concurso-combina-comigo"\r
date: "2026-02-11"\r
tags: ["concurso publico", "perfil profissional", "mudanca de carreira", "estabilidade"]\r
---\r
\r
# Como saber se concurso combina comigo? Um guia honesto antes de decidir\r
\r
Muita gente chega nessa dúvida depois de pensar:\r
\r
> “Talvez concurso seja a saída…”\r
\r
Mas para sair de onde?  \r
E para ir para quê?\r
\r
A verdade é simples — e quase ninguém fala:\r
\r
> **Concurso público não é para todo mundo.**\r
\r
E dizer isso não afasta pessoas certas.  \r
Pelo contrário: gera confiança.\r
\r
---\r
\r
## O erro comum: tratar concurso como solução universal\r
\r
Grande parte dos conteúdos na internet vende concurso como:\r
\r
- garantia de felicidade,\r
- resposta para todo cansaço profissional,\r
- caminho óbvio para quem está insatisfeito.\r
\r
Isso cria dois problemas:\r
1. pessoas entram sem saber no que estão entrando  \r
2. muita frustração depois da aprovação  \r
\r
> Passar num concurso errado não resolve a vida — só muda o tipo de problema.\r
\r
---\r
\r
## Concurso x iniciativa privada: perfis diferentes\r
\r
Antes de decidir, é preciso entender que os ambientes são **estruturalmente diferentes**.\r
\r
### Iniciativa privada costuma combinar com quem:\r
- gosta de mudanças constantes  \r
- busca crescimento rápido  \r
- tolera instabilidade  \r
- aceita pressão por resultado  \r
- se motiva com metas e competição  \r
\r
### Concurso público costuma combinar com quem:\r
- valoriza previsibilidade  \r
- prefere rotina clara  \r
- gosta de regras e processos  \r
- busca estabilidade no longo prazo  \r
- aceita hierarquia  \r
\r
Nenhum é “melhor”.  \r
São **jogos diferentes**.\r
\r
---\r
\r
## A rotina real do serviço público (sem romantizar)\r
\r
Aqui vai o lado que quase não aparece no Instagram:\r
\r
No serviço público, você vai lidar com:\r
- processos repetitivos  \r
- normas e regras rígidas  \r
- hierarquia definida  \r
- decisões mais lentas  \r
- menos espaço para improviso  \r
\r
Para algumas pessoas, isso é **alívio**.  \r
Para outras, é **tortura diária**.\r
\r
---\r
\r
## Perguntas de exclusão (responda com sinceridade)\r
\r
Essas perguntas servem para **te eliminar da decisão**, se for o caso.\r
\r
Se você:\r
- odeia rotina repetitiva  \r
- precisa de novidades constantes  \r
- se irrita com burocracia  \r
- não lida bem com hierarquia  \r
- quer crescimento rápido e agressivo  \r
- se sente mal com regras rígidas  \r
\r
👉 **Concurso provavelmente não é para você.**\r
\r
E está tudo bem.\r
\r
---\r
\r
## Quem costuma se adaptar bem ao concurso público\r
\r
Concurso costuma funcionar melhor para quem:\r
- busca estabilidade real  \r
- valoriza previsibilidade  \r
- quer menos ansiedade no dia a dia  \r
- aceita ganhar bem de forma gradual  \r
- prefere constância a adrenalina  \r
\r
> Não é sobre ser acomodado.  \r
> É sobre escolher um ambiente compatível com você.\r
\r
---\r
\r
## Estabilidade x status x dinheiro rápido\r
\r
Aqui muita gente se confunde.\r
\r
### Concurso entrega:\r
- estabilidade  \r
- progressão previsível  \r
- segurança no longo prazo  \r
\r
### Concurso NÃO entrega:\r
- crescimento explosivo  \r
- status imediato  \r
- enriquecimento rápido  \r
\r
Se sua motivação principal for:\r
- ostentação,\r
- comparação social,\r
- dinheiro rápido,\r
\r
👉 concurso tende a frustrar.\r
\r
---\r
\r
## Outro erro comum: achar que todo concurso é igual\r
\r
Existem cargos públicos com rotinas totalmente diferentes:\r
\r
- administrativos (processos, organização)  \r
- atendimento ao público  \r
- fiscalização e campo  \r
- áreas técnicas e analíticas  \r
\r
Muita gente se frustra não por fazer concurso,  \r
mas por **escolher o tipo errado de cargo**.\r
\r
---\r
\r
## Então… como saber se concurso combina com você?\r
\r
Concurso combina com você se:\r
- estabilidade pesa mais que risco  \r
- rotina clara te tranquiliza  \r
- você aceita regras e processos  \r
- prefere segurança a incerteza  \r
\r
Não combina se:\r
- você precisa de constante mudança  \r
- odeia repetição  \r
- quer crescer muito rápido  \r
- se sente preso em ambientes formais  \r
\r
Essa honestidade evita anos de arrependimento.\r
\r
---\r
\r
## Onde testes entram nessa decisão (do jeito certo)\r
\r
Testes não servem para dizer:\r
> “Faça concurso.”\r
\r
Eles servem para:\r
- entender seu perfil  \r
- comparar ambientes  \r
- evitar escolhas incompatíveis  \r
- mostrar áreas mais adequadas  \r
\r
Eles ajudam a **decidir com menos achismo**.\r
\r
---\r
\r
## Como o Futuro Perfeito ajuda nessa escolha\r
\r
O Futuro Perfeito não empurra concurso para todo mundo.\r
\r
Ele ajuda você a:\r
- entender seu perfil real  \r
- comparar iniciativa privada x concurso  \r
- identificar tipos de cargos compatíveis  \r
- enxergar caminhos possíveis  \r
\r
Sem promessas mágicas.  \r
Com clareza.\r
\r
---\r
\r
## Resumo honesto\r
\r
- concurso não é solução universal  \r
- estabilidade tem preço (rotina e regras)  \r
- nem todo perfil se adapta  \r
- escolher o cargo certo é essencial  \r
\r
---\r
\r
## Quer ter mais clareza antes de decidir?\r
\r
Se você está em dúvida e não quer entrar em algo que não combina com você, o teste do Futuro Perfeito pode ajudar a organizar essa decisão.\r
\r
Sem pressão.  \r
Sem ilusão.  \r
Só clareza para escolher melhor.\r
`,Ez=`---\r
title: "Concurso público para iniciantes: como começar do jeito certo (sem desperdiçar tempo)"\r
description: "Se você nunca estudou para concurso público, este guia mostra como começar com foco, escolher o concurso certo e evitar os erros que fazem iniciantes desistirem."\r
slug: "concurso-publico-para-iniciantes"\r
date: "2026-02-11"\r
tags: ["concurso publico", "iniciante em concurso", "como estudar para concurso", "primeiro concurso"]\r
---\r
\r
# Concurso público para iniciantes: como começar do jeito certo (sem desperdiçar tempo)\r
\r
Se você nunca estudou para concurso público, provavelmente já ouviu conselhos como:\r
\r
- “Estuda tudo”\r
- “Faz vários concursos ao mesmo tempo”\r
- “Compra um cursinho e começa”\r
- “Qualquer concurso serve pra treinar”\r
\r
E é exatamente isso que faz a maioria dos iniciantes **se perder, se frustrar e desistir**.\r
\r
A boa notícia:  \r
dá para começar certo — mesmo sem experiência.\r
\r
---\r
\r
## O maior erro do iniciante: começar sem direção\r
\r
Quem está começando geralmente faz isso:\r
\r
- estuda sem concurso definido  \r
- pula de edital em edital  \r
- acumula PDFs e videoaulas  \r
- sente que estuda muito e aprende pouco  \r
\r
> Estudar sem concurso-alvo é como treinar sem saber qual prova vai fazer.\r
\r
Resultado:\r
- cansaço,\r
- desorganização,\r
- sensação de incapacidade.\r
\r
O problema não é falta de inteligência.  \r
É falta de estratégia.\r
\r
---\r
\r
## Concurso não é sobre estudar tudo — é sobre estudar o certo\r
\r
Diferente da escola ou faculdade, concurso funciona assim:\r
\r
- cada prova cobra **um recorte específico**\r
- ninguém passa sabendo tudo\r
- quem passa estudou **o que cai**, do jeito certo\r
\r
Para iniciantes, isso é libertador.\r
\r
Você não precisa dominar todas as matérias.  \r
Você precisa dominar **as matérias certas para um concurso específico**.\r
\r
---\r
\r
## O conceito que todo iniciante precisa entender: concurso trampolim\r
\r
Concurso trampolim é aquele que:\r
\r
- tem conteúdo mais enxuto  \r
- cobra matérias básicas  \r
- permite ganhar ritmo de estudo  \r
- serve como porta de entrada  \r
\r
Ele não precisa ser o concurso “da sua vida”.\r
\r
Ele serve para:\r
- aprender a estudar,\r
- entender como funciona prova,\r
- criar constância,\r
- ganhar confiança.\r
\r
> Quem tenta começar pelo “concurso dos sonhos” costuma desistir antes de chegar lá.\r
\r
---\r
\r
## Áreas mais amigáveis para quem está começando\r
\r
Para quem nunca estudou, algumas áreas tendem a ser mais acessíveis:\r
\r
### 📁 Área administrativa\r
- matérias comuns (português, informática, direito básico)\r
- rotina previsível\r
- muitos editais parecidos\r
\r
### 🧾 Área de apoio / técnico-administrativo\r
- menos profundidade técnica\r
- boa porta de entrada\r
- concursos frequentes\r
\r
### 🏛️ Órgãos municipais e estaduais\r
- concorrência menor que grandes concursos federais\r
- conteúdo mais direto\r
\r
Isso não é regra absoluta, mas **ajuda muito no começo**.\r
\r
---\r
\r
## Foco vale mais que motivação (especialmente no início)\r
\r
Iniciante costuma esperar:\r
> “Quando eu me sentir motivado, eu começo.”\r
\r
Só que motivação vem **depois** do progresso, não antes.\r
\r
O que funciona melhor:\r
- foco em um único concurso  \r
- poucas matérias bem estudadas  \r
- rotina simples e repetível  \r
\r
> Quem começa com foco cria motivação.  \r
> Quem espera motivação, raramente começa.\r
\r
---\r
\r
## O erro clássico: estudar sem concurso-alvo\r
\r
Esse erro merece destaque porque destrói meses de estudo.\r
\r
Sem concurso definido:\r
- você não sabe o que priorizar  \r
- não sabe quando revisar  \r
- não sabe quando avançar  \r
- não sabe se está indo bem  \r
\r
Estudo vira consumo de conteúdo — não preparação.\r
\r
Mesmo como iniciante, você **precisa de um alvo**, ainda que provisório.\r
\r
---\r
\r
## Então, como começar do jeito certo?\r
\r
Um caminho simples e realista:\r
\r
1. entenda seu perfil (rotina, pressão, tipo de tarefa)\r
2. escolha uma área compatível\r
3. selecione um concurso trampolim\r
4. monte um plano enxuto\r
5. estude com constância, não com desespero\r
\r
Isso evita a maioria das desistências.\r
\r
---\r
\r
## Onde muita gente erra ao seguir conselhos da internet\r
\r
❌ estudar tudo ao mesmo tempo  \r
❌ trocar de concurso toda semana  \r
❌ copiar rotina de concurseiro avançado  \r
❌ achar que cursinho resolve tudo  \r
❌ ignorar o próprio perfil  \r
\r
Concurso é preparação de médio prazo — não impulso.\r
\r
---\r
\r
## Como testes ajudam quem está começando\r
\r
Testes não escolhem por você.\r
\r
Eles ajudam a:\r
- entender seu perfil\r
- evitar áreas incompatíveis\r
- reduzir o número de opções\r
- escolher melhor o primeiro concurso\r
\r
Para iniciantes, isso economiza **tempo e energia**.\r
\r
---\r
\r
## Como o Futuro Perfeito pode ajudar no início\r
\r
O Futuro Perfeito foi pensado justamente para quem está começando.\r
\r
Ele ajuda você a:\r
- entender seu perfil profissional\r
- cruzar com áreas de concurso\r
- identificar cargos mais compatíveis\r
- evitar escolhas aleatórias\r
\r
Sem promessas irreais.  \r
Sem empurrar cursinho.  \r
Com clareza.\r
\r
---\r
\r
## Resumo para iniciantes\r
\r
- não comece sem concurso-alvo  \r
- foco vence empolgação  \r
- concurso trampolim é estratégia  \r
- menos matérias, mais constância  \r
- perfil importa mais do que parece  \r
\r
---\r
\r
## Quer começar com mais segurança?\r
\r
Se você nunca estudou para concurso e quer evitar erros comuns logo no início, o teste do Futuro Perfeito pode te ajudar a enxergar um caminho mais claro.\r
\r
Sem pressa.  \r
Sem ilusão.  \r
Só direção.\r
`,kz=`---\r
title: "Qual concurso é mais fácil para iniciantes? Entenda antes de escolher errado"\r
description: "Veja o que realmente torna um concurso mais fácil para iniciantes e como escolher o primeiro concurso sem cair em armadilhas comuns."\r
slug: "qual-concurso-e-mais-facil-para-iniciantes"\r
date: "2026-02-12"\r
tags: ["concurso publico", "iniciante em concurso", "qual concurso escolher", "primeiro concurso"]\r
---\r
\r
# Qual concurso é mais fácil para iniciantes? Entenda antes de escolher errado\r
\r
Se você nunca estudou para concurso público, é natural procurar por:\r
\r
> **"Qual concurso é mais fácil para iniciantes?"**\r
\r
O problema é que a maioria dos conteúdos responde isso do jeito errado -  \r
com listas genéricas que não explicam **por que** algo seria mais fácil.\r
\r
Vamos organizar essa ideia do jeito certo.\r
\r
---\r
\r
## Primeiro: o que significa "concurso fácil"?\r
\r
Concurso fácil **não significa**:\r
\r
- pouca concorrência  \r
- prova simples para todo mundo  \r
- aprovação rápida garantida  \r
\r
Na prática, um concurso é mais fácil quando tem:\r
\r
1. **conteúdo mais enxuto**\r
2. **matérias previsíveis**\r
3. **nível de cobrança básico**\r
4. **rotina de estudo compatível com iniciantes**\r
\r
> Fácil é o que cabe na sua realidade - não o que parece fácil no papel.\r
\r
---\r
\r
## Por que "concurso fácil" varia de pessoa para pessoa\r
\r
Aqui está o ponto que quase ninguém explica.\r
\r
Um concurso pode ser:\r
- fácil para alguém organizado  \r
- difícil para alguém que odeia rotina  \r
\r
Ou:\r
- fácil para quem gosta de leitura e teoria  \r
- difícil para quem prefere prática e ação  \r
\r
**Perfil importa mais do que o nome do concurso.**\r
\r
---\r
\r
## Comparar concursos pelo que realmente importa\r
\r
Em vez de perguntar *qual paga mais*, o iniciante deveria comparar:\r
\r
- quantidade de matérias  \r
- profundidade do conteúdo  \r
- previsibilidade do edital  \r
- tipo de rotina após a aprovação  \r
\r
Vamos simplificar isso.\r
\r
---\r
\r
## Concursos mais amigáveis para iniciantes (por perfil)\r
\r
### Perfil organizado e constante\r
Se você:\r
- gosta de rotina\r
- consegue seguir processos\r
- prefere previsibilidade\r
\r
concursos administrativos tendem a ser mais acessíveis.\r
\r
---\r
\r
### Perfil analítico\r
Se você:\r
- lida bem com leitura\r
- gosta de regras e lógica\r
- se sente confortável com teoria\r
\r
concursos com direito básico e matérias teóricas costumam encaixar melhor.\r
\r
---\r
\r
### Perfil prático\r
Se você:\r
- prefere ação\r
- se cansa com leitura longa\r
- gosta de resolver problemas rápidos\r
\r
concursos com parte operacional ou prática podem ser mais fáceis *para você*.\r
\r
---\r
\r
## Comparação simples (o que o iniciante deve observar)\r
\r
| Critério | Concurso mais amigável | Concurso difícil para iniciante |\r
|--------|-----------------------|--------------------------------|\r
| Quantidade de matérias | 4-6 | 8 ou mais |
| Profundidade | básica / introdutória | avançada |\r
| Editais anteriores | parecidos | mudam muito |\r
| Tempo médio de preparo | 6-12 meses | 2+ anos |\r
| Exigência técnica | baixa | alta |\r
\r
Isso importa mais do que o nome do órgão.\r
\r
---\r
\r
## O erro clássico: achar que "fácil" é fazer vários ao mesmo tempo\r
\r
Muitos iniciantes pensam:\r
\r
> "Vou fazer todos os concursos fáceis que aparecerem."\r
\r
Isso costuma gerar:\r
- estudo superficial\r
- confusão de matérias\r
- sensação de não evoluir\r
\r
> Um concurso fácil sem foco vira difícil rapidamente.\r
\r
Especialmente para quem está começando.\r
\r
---\r
\r
## Concurso fácil como estratégia (não como objetivo final)\r
\r
Para iniciantes, o melhor uso do "concurso mais fácil" é como:\r
\r
**concurso trampolim**\r
\r
Ou seja:\r
- aprender a estudar\r
- ganhar ritmo\r
- entender provas\r
- criar constância\r
\r
Depois disso, dá para subir o nível com muito mais segurança.\r
\r
---\r
\r
## Como escolher o concurso mais fácil para você (passo a passo)\r
\r
Antes de decidir, pergunte:\r
\r
1. quantas matérias eu consigo estudar com constância?\r
2. prefiro teoria ou prática?\r
3. consigo lidar com leitura extensa?\r
4. quanto tempo real eu tenho por dia?\r
5. quero usar esse concurso como trampolim?\r
\r
Essas respostas filtram 80% das escolhas ruins.\r
\r
---\r
\r
## Onde muita gente erra ao procurar "concurso fácil"\r
\r
- escolher só pelo salário  
- copiar listas da internet  
- ignorar o próprio perfil  
- trocar de foco toda semana  
- estudar sem edital-alvo  
\r
O problema não é falta de capacidade - é falta de critério.\r
\r
---\r
\r
## Como o Futuro Perfeito ajuda nessa escolha\r
\r
O Futuro Perfeito não diz:\r
> "Esse concurso é fácil."\r
\r
Ele ajuda você a:\r
- entender seu perfil\r
- cruzar com tipos de cargo\r
- identificar concursos mais compatíveis\r
- evitar escolhas aleatórias\r
\r
Especialmente para quem está começando.\r
\r
---\r
\r
## Resumo honesto\r
\r
- concurso fácil é relativo  \r
- perfil importa mais que nome  \r
- menos matérias = mais foco  \r
- concurso trampolim é estratégia  \r
- sem foco, até o fácil vira difícil  \r
\r
---\r
\r
## Quer evitar escolher errado logo no começo?\r
\r
Se você nunca estudou para concurso e quer mais clareza para escolher um bom ponto de partida, o teste do Futuro Perfeito pode ajudar a reduzir o risco e organizar sua decisão.\r
\r
Sem promessa milagrosa.  \r
Sem lista genérica.  \r
Só clareza.
`,Pz=`---\r
title: "Como alinhar carreira com perfil e valores: decidir sem se trair no caminho"\r
description: "Alinhar carreira com perfil e valores evita frustracao no longo prazo. Entenda como identificar seu perfil, definir objetivos realistas e escolher ambientes compatíveis."\r
slug: "como-alinhar-carreira-com-perfil-e-valores"\r
date: "2026-01-12"\r
tags: ["perfil profissional", "valores profissionais", "clareza profissional", "decisao de carreira"]\r
---\r
\r
# Como alinhar carreira com perfil e valores\r
\r
## Quando a carreira avanca, mas voce fica para tras\r
\r
Muita gente cresce profissionalmente e, ainda assim, se sente desconectada do proprio trabalho.\r
O cargo melhora. O salario aumenta.\r
Mas algo parece fora do lugar.\r
\r
Isso acontece quando a carreira evolui sem considerar **quem voce e e como voce funciona**.\r
Com o tempo, essa desconexao vira cansaco, frustracao e vontade de mudar tudo.\r
\r
Antes de trocar de area ou buscar algo novo, e preciso alinhar duas coisas basicas: **perfil e valores**.\r
\r
---\r
\r
## O erro mais comum: escolher carreira apenas pelo resultado\r
\r
Grande parte das decisoes profissionais e tomada olhando apenas para o fim:\r
salario, status, estabilidade ou reconhecimento.\r
\r
O problema e que a maior parte da vida profissional acontece no meio.\r
Na rotina.\r
Na forma de trabalhar.\r
Na pressao diaria.\r
\r
Quando o caminho nao combina com seu perfil, o resultado nunca compensa o custo.\r
\r
---\r
\r
## Identificando seu perfil na pratica\r
\r
Perfil nao e teste de internet isolado.\r
E padrao de comportamento repetido ao longo do tempo.\r
\r
Alguns exemplos comuns.\r
\r
### Perfil mais analitico\r
- gosta de organizar, estruturar e analisar\r
- prefere previsibilidade e clareza\r
- tende a se incomodar com improviso excessivo\r
\r
Costuma se adaptar melhor a funcoes tecnicas, planejamento, controle ou estudo estruturado.\r
\r
### Perfil mais criativo\r
- gosta de criar, propor e variar\r
- precisa de liberdade e espaco mental\r
- se frustra com excesso de regra\r
\r
Costuma se adaptar melhor a ambientes flexiveis, projetos e construcao de ideias.\r
\r
### Perfil comunicador\r
- energia vem do contato com pessoas\r
- gosta de explicar, vender, ensinar ou negociar\r
- se desgasta em trabalho muito solitario\r
\r
Costuma se adaptar melhor a areas de relacionamento, lideranca ou atendimento.\r
\r
Nenhum perfil e melhor.\r
Cada um funciona melhor em contextos diferentes.\r
\r
---\r
\r
## Valores: o que sustenta sua decisao no longo prazo\r
\r
Valores sao os criterios invisiveis que determinam sua satisfacao.\r
\r
Alguns exemplos:\r
- estabilidade\r
- autonomia\r
- impacto social\r
- crescimento financeiro\r
- equilibrio de vida\r
- aprendizado constante\r
\r
O erro comum e tentar viver uma carreira que exige abrir mao de um valor central.\r
No curto prazo ate funciona.\r
No longo, cobra um preco alto.\r
\r
---\r
\r
## Definindo objetivos compativeis com quem voce e\r
\r
Objetivos precisam respeitar perfil e valores, nao apenas ambicao.\r
\r
### Curto prazo\r
- melhorar rotina\r
- reduzir desgaste\r
- aprender algo especifico\r
\r
### Medio prazo\r
- mudar de funcao ou area\r
- aumentar renda de forma sustentavel\r
- ganhar mais autonomia ou previsibilidade\r
\r
### Longo prazo\r
- tipo de vida que voce quer sustentar\r
- nivel de pressao aceitavel\r
- estabilidade ou variacao desejada\r
\r
Objetivo que ignora perfil vira fonte de frustracao.\r
\r
---\r
\r
## Pesquisar empresas e culturas organizacionais\r
\r
Nao e so a profissao que importa.\r
O ambiente pesa tanto quanto.\r
\r
### O que observar em uma empresa\r
- como lidam com erro\r
- nivel de cobranca\r
- autonomia real\r
- clareza de processos\r
- respeito a limites\r
\r
Empresas da mesma area podem ter culturas completamente diferentes.\r
\r
### Networking como avaliacao\r
Conversar com quem ja trabalha no lugar ajuda a responder:\r
- essa rotina combina comigo?\r
- essa pressao e aceitavel?\r
- eu conseguiria me ver aqui por anos?\r
\r
Isso evita entrar em ambientes incompatíveis.\r
\r
---\r
\r
## Desenvolver competencias e ajustar a rota\r
\r
Alinhamento nao e decisao unica.\r
E processo continuo.\r
\r
### Cursos e certificacoes\r
Servem quando:\r
- fortalecem um movimento claro\r
- aumentam compatibilidade com o caminho escolhido\r
\r
Estudar sem direcao gera mais duvida.\r
\r
### Acompanhamento continuo\r
Reavaliar a cada fase evita acumular frustracao silenciosa.\r
O que funciona hoje pode nao funcionar daqui a alguns anos.\r
\r
Ajustar rota nao e fracasso.\r
E manutencao.\r
\r
---\r
\r
## Como cada caminho exige perfis diferentes\r
\r
### Carreira privada\r
- exige adaptacao rapida\r
- tolerancia a pressao\r
- foco em resultado\r
\r
Funciona melhor para quem aceita mudanca frequente.\r
\r
### Concurso publico\r
- exige disciplina e paciencia\r
- valoriza previsibilidade\r
- rotina mais estruturada\r
\r
Funciona melhor para quem busca estabilidade no longo prazo.\r
\r
### Empreendedorismo\r
- exige autonomia e resiliência\r
- risco constante\r
- aprendizado continuo\r
\r
Funciona melhor para quem tolera incerteza.\r
\r
Nao existe caminho neutro.\r
Existe o caminho que combina mais com seu perfil.\r
\r
---\r
\r
## Perguntas de exclusao essenciais\r
\r
- Se voce odeia cobranca diaria, ambientes agressivos vao te esgotar.\r
- Se voce precisa de estabilidade, risco constante vira ansiedade.\r
- Se voce precisa de liberdade, rotina rigida vira prisao.\r
\r
Excluir o que nao combina e parte do alinhamento.\r
\r
---\r
\r
## Erros comuns ao tentar alinhar carreira\r
\r
- copiar trajetorias de outras pessoas\r
- ignorar sinais de desgaste\r
- romantizar estilos de vida\r
- insistir em caminhos incompatíveis por orgulho\r
\r
Alinhamento exige honestidade, nao teimosia.\r
\r
---\r
\r
## Resumo pratico\r
\r
- Perfil define como voce trabalha melhor\r
- Valores definem o que voce tolera no longo prazo\r
- Objetivos precisam respeitar ambos\r
- Ambiente pesa tanto quanto a funcao\r
- Ajustar rota faz parte do processo\r
\r
---\r
\r
## Um convite a clareza estrutural\r
\r
Se voce quer alinhar carreira com perfil e valores antes de tomar decisoes maiores, o teste do FuturoPerfeito pode ajudar a organizar essa analise, conectando comportamento, rotina, pressao e longo prazo.\r
\r
Alinhamento reduz arrependimento.\r
Clareza vem antes da escolha.\r
`,Tz=`---\r
title: "Como encontrar um trabalho que faca sentido: clareza antes de mudar de caminho"\r
description: "Encontrar um trabalho que faca sentido nao e seguir paixao cega nem apenas o mercado. Entenda como alinhar valores, rotina e realidade antes de decidir."\r
slug: "como-encontrar-um-trabalho-que-faca-sentido"\r
date: "2026-01-12"\r
tags: ["trabalho com sentido", "clareza profissional", "decisao de carreira", "vida profissional"]\r
---\r
\r
# Como encontrar um trabalho que faca sentido\r
\r
## Quando o trabalho deixa de responder ao por que\r
\r
Muita gente nao odeia o que faz.\r
Tambem nao ama.\r
Apenas executa.\r
\r
O problema surge quando, aos poucos, aparece a pergunta:\r
"Por que eu continuo fazendo isso?"\r
\r
Um trabalho sem sentido nao gera apenas cansaco.\r
Ele gera vazio, dificuldade de projetar o futuro e a sensacao de estar gastando energia em algo que nao retorna significado.\r
\r
Antes de buscar respostas fora, e preciso organizar o que sentido realmente significa para voce.\r
\r
---\r
\r
## O erro mais comum: achar que sentido vem da paixao\r
\r
Existe a ideia de que trabalho com sentido e aquele que envolve amor, vocacao ou paixao.\r
Na vida real, isso raramente funciona sozinho.\r
\r
Paixao sem estrutura vira frustracao.\r
Mercado sem afinidade vira esgotamento.\r
\r
Sentido costuma surgir do equilibrio entre:\r
- o que voce valoriza\r
- o que voce tolera no dia a dia\r
- o que o mundo paga e precisa\r
\r
---\r
\r
## Autoconhecimento aplicado a vida real\r
\r
Autoconhecimento util nao e abstrato.\r
Ele responde perguntas praticas.\r
\r
### Valores\r
O que pesa mais para voce hoje?\r
- previsibilidade\r
- autonomia\r
- impacto social\r
- crescimento financeiro\r
- tempo livre\r
\r
Nao tente marcar todos. Priorize.\r
\r
### Interesses\r
Nao sao curiosidades passageiras, mas temas que se repetem ao longo dos anos.\r
Aquilo que voce sempre acaba voltando a estudar ou conversar.\r
\r
### Talentos praticos\r
Nao e potencial.\r
E o que voce ja faz razoavelmente bem:\r
- organizar\r
- comunicar\r
- analisar\r
- executar sob pressao\r
- trabalhar sozinho ou em grupo\r
\r
Ferramentas como testes de perfil e conversas com mentores ajudam a identificar padroes que voce ja vive, mas nao nomeia.\r
\r
---\r
\r
## Seguir o coracao ou seguir o mercado?\r
\r
Essa divisao costuma ser falsa.\r
\r
Ignorar o mercado gera inseguranca financeira.\r
Ignorar a si mesmo gera vazio emocional.\r
\r
A pergunta mais util nao e "o que eu amo fazer?", mas:\r
"Que tipo de problema eu tolero resolver todos os dias?"\r
\r
Todo trabalho tem partes chatas.\r
Sentido aparece quando o desconforto e suportavel e coerente com seus valores.\r
\r
---\r
\r
## Pesquisar antes de decidir\r
\r
Muita frustracao nasce de idealizacao.\r
\r
Antes de investir tempo e dinheiro, pesquise.\r
\r
### Cursos e graduacoes\r
- o que realmente se aprende?\r
- quanto tempo leva?\r
- que tipo de rotina forma depois?\r
\r
### Conversar com profissionais\r
Pergunte sobre:\r
- rotina real\r
- pressao\r
- salario ao longo do tempo\r
- sacrificios invisiveis\r
\r
Isso reduz fantasias.\r
\r
### Networking como pesquisa, nao exibicao\r
Conversar com pessoas da area e coleta de dados, nao autopromocao.\r
Ouvir historias reais ajuda a alinhar expectativa com realidade.\r
\r
---\r
\r
## Carreira como jornada, nao como aposta unica\r
\r
Decidir tudo de uma vez aumenta o medo de errar.\r
Tratar carreira como jornada reduz pressao.\r
\r
### Experimentos antes da decisao fina\r
- projetos paralelos\r
- voluntariados\r
- estagios tardios\r
- cursos curtos aplicados\r
\r
O objetivo nao e acertar.\r
E aprender rapido.\r
\r
Cada experiencia responde:\r
- isso combina com minha rotina?\r
- a pressao e aceitavel?\r
- consigo me ver nisso no longo prazo?\r
\r
---\r
\r
## Onde cada caminho costuma fazer mais sentido\r
\r
### Carreira privada\r
- sentido costuma vir de crescimento, desafios e impacto\r
- pressao constante e mudanca frequente\r
\r
Nao funciona para quem precisa de estabilidade emocional alta.\r
\r
### Concurso publico\r
- sentido costuma vir de previsibilidade e servico\r
- esforco concentrado antes, rotina mais previsivel depois\r
\r
Nao funciona para quem precisa de variacao diaria e autonomia.\r
\r
### Empreendedorismo\r
- sentido costuma vir de autonomia e construcao\r
- risco alto e pressao constante\r
\r
Nao funciona para quem precisa de seguranca imediata.\r
\r
Nenhum caminho entrega tudo.\r
Cada um entrega algo diferente.\r
\r
---\r
\r
## Perguntas de exclusao fundamentais\r
\r
- Se voce odeia rotina fixa, estabilidade vira prisao.\r
- Se voce nao tolera risco, autonomia vira ansiedade.\r
- Se voce precisa de impacto rapido, processos lentos frustram.\r
\r
Excluir caminhos errados traz mais sentido do que buscar o ideal.\r
\r
---\r
\r
## Erros que afastam o sentido do trabalho\r
\r
- romantizar profissao ou estilo de vida\r
- decidir baseado apenas em status ou salario\r
- ignorar rotina e pressao diaria\r
- achar que sentido aparece sozinho\r
\r
Sentido e construido, nao encontrado pronto.\r
\r
---\r
\r
## Resumo pratico\r
\r
- Trabalho com sentido nasce do alinhamento entre valores, rotina e realidade\r
- Paixao sozinha nao sustenta uma carreira\r
- Mercado sem afinidade gera esgotamento\r
- Pesquisar reduz erro e ansiedade\r
- Experimentar pequeno e mais seguro do que apostar tudo\r
\r
---\r
\r
## Um convite a organizar essa decisao\r
\r
Se voce quer encontrar um trabalho que faca sentido antes de mudar de caminho, o teste do FuturoPerfeito pode ajudar a organizar essa analise, conectando perfil, rotina, pressao e longo prazo.\r
\r
Sentido vem da clareza, nao da pressa.\r
`,zz=`---\r
title: "Como tomar uma decisao de carreira: clareza antes de escolher um caminho"\r
description: "Tomar uma decisao de carreira nao exige certeza absoluta, mas criterio. Entenda como alinhar objetivos, valores, habilidades e realidade antes de decidir."\r
slug: "como-tomar-uma-decisao-de-carreira"\r
date: "2026-01-12"\r
tags: ["decisao de carreira", "clareza profissional", "mudanca de carreira", "vida profissional"]\r
---\r
\r
# Como tomar uma decisao de carreira\r
\r
## Quando decidir parece mais assustador do que ficar parado\r
\r
Tomar uma decisao de carreira costuma gerar mais ansiedade do que continuar insatisfeito.\r
Nao porque a pessoa nao sabe pensar, mas porque sente que qualquer escolha pode custar caro demais.\r
\r
Medo de errar.\r
Medo de perder tempo.\r
Medo de se arrepender.\r
\r
Esse peso aparece quando a decisao e tratada como definitiva, em vez de **bem analisada**.\r
\r
---\r
\r
## O erro mais comum: esperar certeza para decidir\r
\r
Muita gente acredita que so deve decidir quando sentir conviccao total.\r
Na pratica, essa certeza quase nunca chega.\r
\r
Decisoes profissionais boas nao nascem da certeza.\r
Nascem de **criterios claros**.\r
\r
Quem espera clareza absoluta costuma ficar preso no mesmo lugar por anos.\r
\r
---\r
\r
## Entender objetivos e valores antes de olhar opcoes\r
\r
Decidir sem saber o que voce busca transforma qualquer escolha em aposta.\r
\r
### Objetivos reais\r
Pergunte-se:\r
- o que eu preciso resolver agora?\r
- o que eu quero melhorar nos proximos anos?\r
- o que nao quero mais repetir?\r
\r
Objetivos mudam com o tempo.\r
O erro e fingir que nao mudam.\r
\r
### Valores que orientam a decisao\r
Valores sao filtros.\r
Eles evitam escolhas incompatíveis.\r
\r
Exemplos:\r
- estabilidade\r
- autonomia\r
- crescimento financeiro\r
- equilibrio de vida\r
- impacto social\r
\r
Um diario simples ajuda:\r
Escreva por alguns dias o que te gerou satisfacao ou desgaste no trabalho.\r
Padroes aparecem rapido.\r
\r
Tambem e valido observar tendencias de mercado, nao para seguir modas, mas para entender **o que tem demanda real**.\r
\r
---\r
\r
## Avaliar habilidades e lacunas com honestidade\r
\r
Decidir carreira nao e listar sonhos, e mapear recursos.\r
\r
### O que voce ja sabe fazer\r
- habilidades tecnicas\r
- habilidades comportamentais\r
- experiencias acumuladas\r
\r
Isso indica caminhos mais seguros no curto e medio prazo.\r
\r
### O que falta desenvolver\r
Toda mudanca exige aprendizado.\r
A questao e **quanto aprendizado** e **em quanto tempo**.\r
\r
Planeje de forma pratica:\r
- cursos curtos e direcionados\r
- idiomas se fizer sentido para o caminho\r
- certificacoes apenas quando aumentam compatibilidade real\r
\r
Estudar sem direcao costuma gerar mais confusao.\r
\r
---\r
\r
## Ponderar pros e contras de forma concreta\r
\r
Toda decisao cobra um preco.\r
Ignorar isso cria arrependimento.\r
\r
Avalie cada opcao considerando:\r
\r
### Financas\r
- renda inicial\r
- tempo ate estabilizar\r
- risco financeiro\r
\r
### Qualidade de vida\r
- carga horaria\r
- nivel de pressao\r
- impacto na rotina pessoal\r
\r
### Crescimento no longo prazo\r
- possibilidades reais de evolucao\r
- dependencia de fatores externos\r
- sustentabilidade emocional\r
\r
Se uma opcao parece boa em um ponto e pessima em todos os outros, o custo provavelmente e alto demais.\r
\r
---\r
\r
## Testar antes de decidir reduz erro\r
\r
Decidir sem experimentar aumenta o medo.\r
\r
Sempre que possivel, teste em escala pequena.\r
\r
### Formas de ganhar experiencia pratica\r
- projetos paralelos\r
- freelas experimentais\r
- estagios tardios\r
- voluntariado estrategico\r
\r
O objetivo nao e se destacar.\r
E sentir a rotina.\r
\r
Depois de cada experiencia, pergunte:\r
- consigo sustentar isso por anos?\r
- a pressao e aceitavel?\r
- isso combina com meu perfil?\r
\r
Aprender que algo nao e para voce ja e decisao.\r
\r
---\r
\r
## Como cada caminho exige tipos diferentes de decisao\r
\r
### Carreira privada\r
- decisao envolve tolerancia a pressao\r
- mudancas mais frequentes\r
- crescimento atrelado a desempenho\r
\r
### Concurso publico\r
- decisao envolve paciencia e disciplina\r
- esforco concentrado antes\r
- previsibilidade maior depois\r
\r
### Empreendedorismo\r
- decisao envolve risco e instabilidade\r
- autonomia alta\r
- pressao constante\r
\r
Nao existe escolha neutra.\r
Existe escolha coerente.\r
\r
---\r
\r
## Perguntas de exclusao que ajudam a decidir\r
\r
- Se eu odeio instabilidade, esse caminho vai me gerar ansiedade?\r
- Se eu preciso de autonomia, esse ambiente vai me sufocar?\r
- Se eu nao tolero pressao diaria, esse ritmo vai me adoecer?\r
\r
Excluir caminhos errados clareia os certos.\r
\r
---\r
\r
## Erros comuns ao tomar decisoes de carreira\r
\r
- decidir apenas pelo salario\r
- ignorar rotina e pressao diaria\r
- comparar sua vida com trajetorias editadas\r
- apostar tudo sem testar nada\r
\r
Decisao boa nao elimina risco.\r
Ela reduz arrependimento.\r
\r
---\r
\r
## Resumo pratico\r
\r
- Decisao de carreira exige criterio, nao certeza\r
- Objetivos e valores orientam escolhas\r
- Habilidades e lacunas definem viabilidade\r
- Pros e contras precisam ser avaliados com honestidade\r
- Testar pequeno reduz erro grande\r
\r
---\r
\r
## Um convite a decidir com mais clareza\r
\r
Se voce quer tomar uma decisao de carreira com menos ansiedade e mais criterio, o teste do FuturoPerfeito pode ajudar a organizar essa analise, conectando perfil, rotina, pressao e longo prazo.\r
\r
Decidir melhor vem antes de decidir rapido.\r
`,Az=`---\r
title: "Estou perdido profissionalmente: como entender o motivo antes de escolher qualquer caminho"\r
description: "Sentir-se perdido profissionalmente não é falta de capacidade. Entenda as causas reais dessa confusão, como ela afeta sua vida e como ganhar clareza antes de tomar novas decisões."\r
slug: "estou-perdido-profissionalmente"\r
date: "2026-01-12"\r
tags: ["clareza profissional", "insatisfacao no trabalho", "decisao de carreira", "vida profissional"]\r
---\r
\r
# Estou perdido profissionalmente\r
\r
## Quando a confusao vira um peso diario\r
\r
Dizer “estou perdido profissionalmente” quase nunca significa “nao sei fazer nada”.\r
Na maioria das vezes, significa acordar todo dia com uma sensacao incomoda de estar no lugar errado — mesmo trabalhando, mesmo recebendo salario, mesmo sendo competente.\r
\r
Voce trabalha, cumpre tarefas, mas algo nao encaixa.\r
E quanto mais o tempo passa, maior o medo de errar de novo se mudar de rumo.\r
\r
Antes de pensar em solucoes, e preciso entender por que essa sensacao aparece.\r
\r
---\r
\r
## O erro mais comum: achar que o problema e falta de opcao\r
\r
Muita gente acredita que esta perdida porque “nao encontrou a profissao certa”.\r
Na pratica, o problema quase sempre e outro: as decisoes anteriores foram tomadas sem considerar rotina, pressao e longo prazo.\r
\r
Escolheu pelo salario.\r
Ou pela opiniao da familia.\r
Ou pelo que parecia seguro naquele momento.\r
\r
Nada disso e errado. O erro e achar que isso nao cobra um preco depois.\r
\r
---\r
\r
## Por que tantas pessoas se sentem perdidas profissionalmente?\r
\r
Existem causas recorrentes. Veja quais fazem parte da sua realidade.\r
\r
### 1. Pressao externa constante\r
Familia, amigos e redes sociais criam expectativas irreais:\r
- “Voce ja devia estar ganhando mais”\r
- “Fulano ja virou gestor”\r
- “Voce ainda esta nesse emprego?”\r
\r
Isso gera comparacao e ansiedade, mesmo quando sua vida esta razoavelmente estavel.\r
\r
### 2. Mudanca do mercado\r
Funcoes mudam, areas encolhem, outras surgem.\r
O que fazia sentido ha 5 anos pode nao fazer mais hoje — e isso nao e falha pessoal.\r
\r
### 3. Decisoes baseadas apenas em curto prazo\r
Aceitar algo so para “resolver agora” costuma gerar:\r
- estagnacao\r
- desmotivacao\r
- medo de sair, porque ja investiu tempo demais\r
\r
### 4. Falta de leitura clara sobre si mesmo\r
Nao no sentido abstrato de “se conhecer”, mas de nao saber responder perguntas simples como:\r
- Que tipo de rotina eu tolero?\r
- Quanto risco financeiro eu aguento?\r
- Como lido com cobranca constante?\r
\r
### 5. Questoes financeiras\r
Quando o dinheiro aperta, a margem de escolha diminui.\r
Isso faz muita gente permanecer em caminhos que ja nao fazem sentido.\r
\r
---\r
\r
## Um exercicio simples para organizar a bagunca mental\r
\r
Antes de pensar em mudar, escreva:\r
- Quais desses fatores estao presentes hoje na sua vida?\r
- Que sentimento cada um gera? (ansiedade, frustracao, medo, cansaco)\r
\r
Exemplo:\r
“Pressao financeira → medo de errar”\r
“Rotina repetitiva → sensacao de desperdicio”\r
\r
Isso ja comeca a separar causa de consequencia.\r
\r
---\r
\r
## Autoconhecimento aplicado (nao generico)\r
\r
Autoconhecimento nao e lista de qualidades.\r
E entender como voce funciona na pratica.\r
\r
Use este roteiro simples.\r
\r
### 1. Valores que voce nao negocia\r
Exemplos:\r
- previsibilidade\r
- autonomia\r
- estabilidade\r
- impacto social\r
- crescimento rapido\r
\r
Nao escolha todos. Escolha dois ou tres.\r
\r
### 2. Habilidades que voce realmente usa\r
Nao e o que voce “pode fazer”, mas o que ja faz no dia a dia:\r
- organizar\r
- lidar com pessoas\r
- resolver problemas sob pressao\r
- trabalhar sozinho por longos periodos\r
\r
### 3. Interesses que se sustentam no tempo\r
Nao hobbies passageiros, mas temas que voltam sempre.\r
\r
Ferramentas como escrita diaria ou testes de perfil ajudam a perceber padroes — nao para decidir por voce, mas para reduzir erro.\r
\r
---\r
\r
## Explorar possibilidades sem se perder ainda mais\r
\r
“Explorar novas areas” sem metodo so aumenta a confusao.\r
\r
Use um modelo simples de experimentacao:\r
1. Escolha uma area possivel, nao idealizada\r
2. Faça um curso curto ou projeto pequeno\r
3. Converse com alguem que ja vive essa rotina\r
4. Reavalie com base na experiencia real\r
\r
Nada de decisoes definitivas aqui.\r
O objetivo e sentir a rotina, nao se apaixonar por uma ideia.\r
\r
Uma boa pergunta e:\r
“Como seria minha vida com isso em 5, 10 e 20 anos?”\r
\r
---\r
\r
## Como caminhos diferentes cobram precos diferentes\r
\r
### Concurso publico\r
- Mais previsibilidade\r
- Pressao concentrada no estudo\r
- Rotina mais estavel depois\r
\r
Nao funciona para quem odeia repeticao ou tem aversao a processos longos.\r
\r
### Carreira privada\r
- Crescimento mais rapido em alguns casos\r
- Mais cobranca e incerteza\r
- Necessidade de atualizacao constante\r
\r
Nao funciona para quem precisa de seguranca emocional alta.\r
\r
### Empreendedorismo\r
- Autonomia e risco elevados\r
- Pressao continua\r
- Resultados demorados\r
\r
Nao funciona para quem precisa de renda previsivel no curto prazo.\r
\r
Nenhum e melhor. Cada um cobra um preco psicologico diferente.\r
\r
---\r
\r
## Perguntas de exclusao (as mais importantes)\r
\r
- Se voce odeia cobranca constante, carreiras altamente competitivas vao te adoecer.\r
- Se voce nao tolera previsibilidade, estabilidade pode virar prisao.\r
- Se voce precisa de rotina clara, ambientes caoticos vao gerar ansiedade.\r
\r
Eliminar caminhos incompativeis traz mais clareza do que tentar escolher o “melhor”.\r
\r
---\r
\r
## Erros comuns que mantem a sensacao de estar perdido\r
\r
- Pular de ideia em ideia sem testar nada\r
- Confundir cansaco com vocacao errada\r
- Buscar respostas rapidas para decisoes de longo prazo\r
- Ignorar saude mental enquanto tenta decidir o futuro\r
\r
Cuidar da mente nao resolve tudo, mas facilita decidir.\r
\r
---\r
\r
## Resumo pratico\r
\r
- Estar perdido raramente e falta de capacidade\r
- A confusao vem de decisoes desconectadas da rotina real\r
- Clareza comeca entendendo causas, nao escolhendo destinos\r
- Eliminar opcoes erradas e progresso\r
- Caminhos diferentes exigem perfis diferentes\r
\r
---\r
\r
## Um convite a clareza\r
\r
Se voce sente que esta confuso e quer clareza antes de decidir qualquer caminho, o teste do FuturoPerfeito pode ajudar a organizar essa decisao — conectando perfil, rotina, pressao e longo prazo, sem promessas vazias.\r
\r
Clareza vem antes da escolha.\r
`,qz=`---\r
title: "Insatisfacao profissional: o que fazer quando o trabalho deixa de fazer sentido"\r
description: "Insatisfacao profissional nao se resolve com frases motivacionais. Entenda as causas reais, os sinais ignorados e o que fazer de forma pratica antes de tomar decisoes erradas."\r
slug: "insatisfacao-profissional-o-que-fazer"\r
date: "2026-01-12"\r
tags: ["insatisfacao profissional", "clareza profissional", "mudanca de carreira", "vida profissional"]\r
---\r
\r
# Insatisfacao profissional: o que fazer?\r
\r
## Quando trabalhar vira apenas suportar o dia\r
\r
Insatisfacao profissional raramente aparece de forma explosiva.\r
Ela costuma surgir devagar, em pequenos sinais que vao sendo normalizados.\r
\r
Voce continua indo ao trabalho.\r
Continua entregando.\r
Mas o sentimento e de desgaste constante, como se estivesse sempre empurrando a semana com a barriga.\r
\r
Nao e falta de gratidao.\r
E um sinal de desalinhamento.\r
\r
Antes de pensar em sair, mudar ou recomeçar, e preciso entender **o que exatamente esta te incomodando**.\r
\r
---\r
\r
## O erro mais comum: achar que o problema e apenas o salario\r
\r
Muitas pessoas reduzem a insatisfacao a dinheiro.\r
Salario importa, mas raramente e o unico fator.\r
\r
Quando o foco fica so nisso, a tendencia e trocar de emprego e levar o mesmo problema junto.\r
\r
Insatisfacao profissional quase sempre envolve **rotina, pressao e expectativas mal alinhadas**.\r
\r
---\r
\r
## Principais causas e sinais de insatisfacao profissional\r
\r
Veja quais desses pontos fazem parte do seu dia a dia.\r
\r
### Salario desconectado do esforco\r
- sensacao de entregar muito e receber pouco\r
- dificuldade de enxergar crescimento real\r
Isso gera ressentimento silencioso.\r
\r
### Ambiente desgastante\r
- clima de tensao constante\r
- conflitos frequentes\r
- falta de respeito ou reconhecimento\r
Mesmo bons salarios nao compensam ambientes toxicos por muito tempo.\r
\r
### Sobrecarga continua\r
- volume de trabalho que nunca diminui\r
- dificuldade de desligar fora do horario\r
- sensacao de estar sempre atrasado\r
\r
Isso leva ao esgotamento, nao a produtividade.\r
\r
### Falta de perspectiva\r
- nao enxergar proximo passo\r
- nao saber onde aquela funcao leva no longo prazo\r
A ausencia de futuro claro costuma matar a motivacao.\r
\r
---\r
\r
## Antes de mudar tudo, planeje a transicao\r
\r
Sair por impulso costuma gerar mais ansiedade do que alivio.\r
Planejar nao e covardia, e estrategia.\r
\r
### Analise sua situacao financeira\r
Pergunte-se:\r
- quanto tempo eu consigo me manter se algo mudar?\r
- tenho reserva ou dependo 100 por cento da renda atual?\r
\r
Isso define o nivel de risco que voce pode assumir.\r
\r
### Identifique seus pontos fortes reais\r
Nao habilidades teoricas, mas aquilo que voce ja usa na pratica:\r
- resolver problemas\r
- lidar com pessoas\r
- organizar processos\r
- executar sob pressao\r
\r
Esses pontos indicam **para onde e mais seguro se mover**.\r
\r
### Busque mentoria ou conversas reais\r
Conversar com quem ja esta em outras areas ajuda a:\r
- reduzir fantasias\r
- entender a rotina real\r
- perceber se aquele caminho combina com voce\r
\r
Isso evita trocas baseadas em ilusao.\r
\r
---\r
\r
## Pequenas mudancas que ja aliviam a insatisfacao\r
\r
Nem toda insatisfacao exige uma ruptura imediata.\r
\r
### Liste pros e contras do trabalho atual\r
Nao para reclamar, mas para entender:\r
- o que ainda funciona\r
- o que esta claramente errado\r
\r
Isso ajuda a separar desconforto momentaneo de problema estrutural.\r
\r
### Mapeie solucoes possiveis\r
Exemplos:\r
- trocar de area dentro da empresa\r
- ajustar carga horaria\r
- renegociar responsabilidades\r
- buscar projetos paralelos\r
\r
As vezes o problema nao e o trabalho, mas a forma como ele esta organizado.\r
\r
### Invista em aprendizado com criterio\r
Cursos curtos e objetivos ajudam quando:\r
- estao ligados a uma transicao real\r
- resolvem lacunas claras\r
\r
Estudar sem direcao costuma aumentar a frustacao.\r
\r
---\r
\r
## Saude mental nao e detalhe, e base\r
\r
Ignorar o cansaço mental distorce qualquer decisao profissional.\r
\r
### Rotina fisica e sono\r
- exercicio regular reduz ansiedade\r
- sono desregulado aumenta irritacao e impulsividade\r
\r
Decisoes tomadas exausto costumam ser ruins.\r
\r
### Hobbies e pausas reais\r
Nao para performar, mas para recuperar energia mental.\r
Sem isso, tudo parece pior do que realmente e.\r
\r
### Limites claros\r
Aprender a dizer nao, desligar fora do horario e proteger sua energia nao e falta de comprometimento.\r
E manutencao de longo prazo.\r
\r
---\r
\r
## Caminhos diferentes, niveis diferentes de insatisfacao\r
\r
### Carreira privada\r
- crescimento mais rapido\r
- cobranca constante\r
- menos previsibilidade\r
\r
Insatisfacao aparece quando a pressao supera o retorno emocional.\r
\r
### Concurso publico\r
- mais previsibilidade depois da aprovacao\r
- esforco intenso concentrado antes\r
- rotina mais repetitiva\r
\r
Insatisfacao aparece quando a pessoa precisa de variacao e autonomia.\r
\r
### Empreendedorismo\r
- autonomia alta\r
- risco continuo\r
- pressao diaria\r
\r
Insatisfacao aparece quando falta estrutura emocional e financeira.\r
\r
Nao existe caminho sem desgaste.\r
Existe o desgaste que voce tolera melhor.\r
\r
---\r
\r
## Perguntas de exclusao importantes\r
\r
- Se voce nao tolera cobranca diaria, ambientes agressivos vao te adoecer.\r
- Se voce precisa de estabilidade, risco constante vira ansiedade.\r
- Se voce odeia rotina fixa, previsibilidade vira tedio.\r
\r
Eliminar o que nao combina ja e avancar.\r
\r
---\r
\r
## Erros comuns que mantem a insatisfacao\r
\r
- fingir que esta tudo bem por medo de mudar\r
- trocar de emprego sem mudar criterio\r
- ignorar sinais de esgotamento\r
- buscar solucao rapida para problema estrutural\r
\r
Insatisfacao ignorada costuma crescer, nao sumir.\r
\r
---\r
\r
## Resumo pratico\r
\r
- Insatisfacao profissional tem causas concretas\r
- Salario raramente e o unico problema\r
- Planejar a transicao reduz erro e ansiedade\r
- Pequenos ajustes ja podem aliviar bastante\r
- Saude mental influencia diretamente suas decisoes\r
\r
---\r
\r
## Um convite a clareza antes da mudanca\r
\r
Se voce sente insatisfacao profissional e quer entender qual caminho faz mais sentido antes de decidir qualquer mudanca, o teste do FuturoPerfeito pode ajudar a organizar essa analise, conectando perfil, rotina, pressao e longo prazo.\r
\r
Clareza vem antes da coragem.\r
`,Rz=`---\r
title: "Me sinto frustrado no trabalho: como entender a frustracao e recuperar clareza"\r
description: "Sentir frustracao no trabalho nao significa fracasso. Entenda as causas reais, como lidar com erros, controlar as emocoes e decidir os proximos passos com mais clareza."\r
slug: "me-sinto-frustrado-no-trabalho"\r
date: "2026-01-12"\r
tags: ["frustracao no trabalho", "clareza profissional", "insatisfacao profissional", "vida profissional"]\r
---\r
\r
# Me sinto frustrado no trabalho\r
\r
## Quando o esforco nao gera satisfacao\r
\r
Sentir frustracao no trabalho nao e sobre um dia ruim.\r
E sobre a repeticao de uma sensacao: voce se esforca, entrega, tenta melhorar, mas o retorno emocional nao vem.\r
\r
Com o tempo, isso vira irritacao silenciosa, queda de energia e a duvida constante:\r
"Tem algo errado comigo ou com esse trabalho?"\r
\r
Antes de reagir no impulso, e preciso entender **de onde essa frustracao nasce**.\r
\r
---\r
\r
## O erro mais comum: tratar a frustracao como fraqueza\r
\r
Muita gente acredita que sentir frustracao significa falta de competencia ou resiliência.\r
Nao significa.\r
\r
Frustracao geralmente aparece quando:\r
- expectativas nao se confirmam\r
- esforco e resultado nao se conectam\r
- o ambiente nao permite evolucao\r
\r
Ignorar isso nao resolve. So prolonga o desgaste.\r
\r
---\r
\r
## Como lidar com erros e expectativas mal alinhadas\r
\r
Frustracao quase sempre tem relacao com algo que nao saiu como esperado.\r
\r
### Analise o que deu errado sem se atacar\r
Pergunte:\r
- foi uma expectativa irreal?\r
- faltou recurso, tempo ou autonomia?\r
- o criterio de avaliacao era claro?\r
\r
Separar erro de identidade evita que voce leve tudo para o pessoal.\r
\r
### Foque no que pode ser ajustado\r
Nem todo erro exige mudanca radical.\r
As vezes exige:\r
- alinhamento de expectativa\r
- ajuste de processo\r
- redistribuicao de responsabilidades\r
\r
Pensar em solucao reduz a sensacao de impotencia.\r
\r
### Peça feedback objetivo\r
Feedback nao e pedido de aprovacao.\r
E coleta de informacao.\r
\r
Busque perguntas claras:\r
- o que exatamente esperavam de mim?\r
- onde posso melhorar de forma pratica?\r
\r
Isso traz realidade para o lugar da suposicao.\r
\r
---\r
\r
## Tecnicas simples de controle emocional no dia a dia\r
\r
Frustracao acumulada distorce percepcao.\r
Por isso, controlar a reacao emocional e parte da solucao.\r
\r
### Pausas conscientes\r
Parar alguns minutos para respirar profundamente reduz a ativacao emocional.\r
Nao resolve o problema, mas impede decisoes precipitadas.\r
\r
### Exercicio fisico regular\r
Movimento ajuda a descarregar tensao acumulada.\r
Nao precisa ser intenso. Precisa ser constante.\r
\r
### Hobbies sem objetivo produtivo\r
Atividades sem meta, sem avaliacao e sem resultado aliviam a mente.\r
Isso cria espaco mental para pensar melhor.\r
\r
---\r
\r
## Quando pedir ajuda deixa de ser opcao e vira necessidade\r
\r
Insistir em resolver tudo sozinho costuma aumentar a frustracao.\r
\r
### Conversar com colegas\r
Trocar experiencias ajuda a perceber se o problema e individual ou estrutural.\r
Muitas vezes, outros sentem o mesmo.\r
\r
### Buscar mentoria\r
Mentores ajudam a:\r
- interpretar situacoes com mais distancia\r
- evitar erros repetidos\r
- enxergar caminhos possiveis\r
\r
Nao e idolatria. E aprendizado pratico.\r
\r
### Considerar terapia\r
Quando a frustracao vira ansiedade constante, irritacao ou queda de autoestima, ajuda profissional e sinal de maturidade.\r
Cuidar da mente melhora a qualidade das decisoes.\r
\r
---\r
\r
## Histórias comuns de quem superou a frustracao\r
\r
Muitas trajetorias tem um ponto em comum:\r
a frustracao foi o sinal, nao o fim.\r
\r
Algumas pessoas perceberam que:\r
- estavam em um ambiente incompatível com seu perfil\r
- aceitavam cobrancas que nao faziam sentido\r
- confundiam estabilidade com satisfacao\r
\r
Outras entenderam que precisavam:\r
- ajustar expectativas\r
- aprender novas habilidades\r
- mudar de area ou de ritmo\r
\r
O padrao nao e coragem repentina.\r
E **clareza progressiva**.\r
\r
---\r
\r
## Frustracao varia conforme o caminho profissional\r
\r
### Carreira privada\r
- frustracao costuma vir de metas irreais e cobranca constante\r
- crescimento rapido pode gerar desgaste emocional\r
\r
### Concurso publico\r
- frustracao aparece quando a rotina nao combina com o perfil\r
- repeticao e falta de autonomia pesam para alguns\r
\r
### Empreendedorismo\r
- frustracao vem da instabilidade e da pressao diaria\r
- resultados demorados testam o emocional\r
\r
Nao existe caminho sem frustracao.\r
Existe o caminho cuja frustracao voce consegue administrar melhor.\r
\r
---\r
\r
## Perguntas de exclusao importantes\r
\r
- Se voce precisa de reconhecimento constante, ambientes frios vao te frustrar.\r
- Se voce odeia metas agressivas, pressao comercial vai te esgotar.\r
- Se voce precisa de previsibilidade, risco continuo vira ansiedade.\r
\r
Eliminar o que nao combina diminui a frustracao futura.\r
\r
---\r
\r
## Erros que mantem a frustracao ativa\r
\r
- normalizar o desconforto por medo de mudar\r
- reagir no impulso sem analisar causas\r
- buscar alivio rapido em vez de ajuste real\r
- ignorar sinais de desgaste mental\r
\r
Frustracao ignorada tende a virar cinismo ou apatia.\r
\r
---\r
\r
## Resumo pratico\r
\r
- Frustracao e sinal, nao falha pessoal\r
- Erros precisam ser analisados, nao internalizados\r
- Controle emocional evita decisoes ruins\r
- Pedir ajuda acelera clareza\r
- Caminhos diferentes geram frustracoes diferentes\r
\r
---\r
\r
## Um convite a clareza antes de reagir\r
\r
Se voce se sente frustrado no trabalho e quer entender qual caminho faz mais sentido antes de decidir qualquer mudanca, o teste do FuturoPerfeito pode ajudar a organizar essa analise, conectando perfil, rotina, pressao e longo prazo.\r
\r
Clareza reduz frustracao. Decisao vem depois.\r
`,_z=`---\r
title: "Profissoes do futuro: tendencias ate 2030 e o que isso muda na sua carreira"\r
description: "Profissoes do futuro nao sao apostas cegas. Entenda quais setores crescem ate 2030, quais habilidades ganham peso e como se preparar sem cair em modismo."\r
slug: "profissoes-do-futuro-tendencias-ate-2030"\r
date: "2026-01-12"\r
tags: ["profissoes do futuro", "tendencias de carreira", "clareza profissional", "mercado de trabalho"]\r
---\r
\r
# Profissoes do futuro: tendencias ate 2030\r
\r
## Quando o futuro vira ansiedade profissional\r
\r
Pensar em futuro profissional hoje gera mais ansiedade do que empolgacao.\r
IA, automacao, novas tecnologias e mudancas rapidas fazem muita gente sentir que esta ficando para tras.\r
\r
A pergunta deixa de ser apenas:\r
"Qual profissao escolher?"\r
\r
E vira:\r
"Minha profissao ainda vai existir?"\r
\r
Antes de correr atras do que parece moderno, e preciso entender **como as transformacoes realmente acontecem**.\r
\r
---\r
\r
## O erro mais comum: achar que o futuro elimina tudo o que existe hoje\r
\r
Toda grande mudanca no mercado gera duas ilusoes:\r
- que tudo antigo vai desaparecer\r
- que quem nao entrar agora vai ficar obsoleto\r
\r
Na pratica, profissioes raramente somem de uma hora para outra.\r
Elas **evoluem**, mudam de foco e exigem novas habilidades.\r
\r
Entender isso evita decisoes impulsivas.\r
\r
---\r
\r
## Setores em ascensao ate 2030\r
\r
Alguns setores apresentam crescimento consistente, nao por moda, mas por demanda estrutural.\r
\r
### Tecnologia e dados\r
Areas ligadas a:\r
- inteligencia artificial\r
- big data\r
- automacao\r
- seguranca da informacao\r
\r
Nao se trata apenas de programadores.\r
Analistas, gestores e profissionais que sabem **usar tecnologia para resolver problemas** ganham espaco.\r
\r
### Sustentabilidade\r
Cresce a demanda por:\r
- design sustentavel\r
- eficiencia energetica\r
- gestao ambiental\r
- economia circular\r
\r
Empresas precisam se adaptar a regulacoes e pressao social.\r
Isso gera novas funcoes.\r
\r
### Saude e saude mental\r
Envelhecimento da populacao, estresse e novas formas de trabalho aumentam a demanda por:\r
- profissionais de saude\r
- suporte psicologico\r
- gestao de bem-estar\r
\r
Nao e apenas clinico.\r
Ha espaco para gestao, tecnologia e educacao em saude.\r
\r
### Economia prateada\r
O envelhecimento da populacao cria demandas em:\r
- cuidados\r
- lazer\r
- educacao\r
- servicos especializados para idosos\r
\r
E um mercado crescente e ainda pouco explorado.\r
\r
---\r
\r
## As novas habilidades mais exigidas\r
\r
O futuro nao exige apenas novas profissoes.\r
Exige **novas combinacoes de habilidades**.\r
\r
### Pensamento analitico\r
Capacidade de:\r
- interpretar dados\r
- tomar decisoes com criterio\r
- entender cenarios complexos\r
\r
Isso vale para quase todas as areas.\r
\r
### Programacao e letramento digital\r
Nao e que todos precisem programar.\r
Mas entender como sistemas funcionam vira vantagem competitiva.\r
\r
### Design sustentavel\r
Pensar produtos, servicos e processos considerando impacto ambiental e social.\r
\r
### Human skills\r
Quanto mais tecnologia avanca, mais valor ganha quem:\r
- comunica bem\r
- lidera\r
- entende pessoas\r
- lida com emocao e conflito\r
\r
Maquinas automatizam tarefas.\r
Nao automatizam relacoes humanas.\r
\r
---\r
\r
## Como se preparar sem entrar em desespero\r
\r
Preparar-se para o futuro nao e largar tudo.\r
E ajustar a rota com criterio.\r
\r
### Cursos e certificacoes\r
Funcionam quando:\r
- resolvem lacunas claras\r
- conectam com sua area atual ou proxima\r
\r
Acumular cursos sem estrategia gera ansiedade, nao vantagem.\r
\r
### Idiomas\r
Ingles continua sendo diferencial real, especialmente em tecnologia, ciencia e negocios.\r
Nao como status, mas como acesso a informacao e oportunidades.\r
\r
### Comunidades e redes\r
Participar de comunidades tech, eventos e grupos de estudo ajuda a:\r
- entender demandas reais\r
- ouvir quem ja esta no mercado\r
- reduzir ilusoes sobre profissioes do futuro\r
\r
Networking aqui e observacao, nao autopromocao.\r
\r
---\r
\r
## O impacto real da IA e da automacao\r
\r
IA nao elimina trabalhos.\r
Ela elimina **tarefas**.\r
\r
Funcoes repetitivas, previsiveis e padronizadas tendem a ser automatizadas.\r
Funcoes que exigem:\r
- decisao\r
- criatividade\r
- julgamento\r
- relacao humana\r
\r
tendem a se transformar, nao desaparecer.\r
\r
O risco maior nao e a IA.\r
E ficar preso a tarefas que podem ser automatizadas.\r
\r
---\r
\r
## Profissoes do futuro e escolhas de carreira\r
\r
### Carreira privada\r
- exige adaptabilidade constante\r
- aprendizado continuo\r
- tolerancia a mudanca\r
\r
### Concurso publico\r
- tende a incorporar tecnologia\r
- exige atualizacao, mas mantem previsibilidade\r
- rotinas evoluem mais lentamente\r
\r
### Empreendedorismo\r
- aproveita nichos criados por novas demandas\r
- exige leitura rapida de mercado\r
- risco e mais alto\r
\r
O futuro nao favorece um caminho unico.\r
Favorece quem **se conhece e se ajusta melhor**.\r
\r
---\r
\r
## Perguntas de exclusao importantes\r
\r
- Estou buscando futuro por medo ou por estrategia?\r
- Essa area exige uma rotina que eu tolero?\r
- Estou disposto a aprender continuamente?\r
\r
Se a resposta for nao, o preco pode ser alto demais.\r
\r
---\r
\r
## Erros comuns ao pensar em profissoes do futuro\r
\r
- seguir modismos sem entender a rotina\r
- ignorar perfil e valores\r
- achar que so tecnologia importa\r
- tentar prever tudo em vez de se adaptar\r
\r
O futuro premia flexibilidade, nao adivinhacao.\r
\r
---\r
\r
## Resumo pratico\r
\r
- Profissoes do futuro evoluem mais do que surgem do zero\r
- Setores como tecnologia, sustentabilidade e saude crescem por demanda real\r
- Habilidades analiticas e humanas ganham peso\r
- IA transforma tarefas, nao pessoas\r
- Preparacao exige criterio, nao pressa\r
\r
---\r
\r
## Um convite a clareza estrategica\r
\r
Se voce quer entender como se preparar para o futuro profissional sem apostar no escuro, o teste do FuturoPerfeito pode ajudar a organizar seu perfil, sua rotina e seus objetivos de longo prazo diante dessas tendencias.\r
\r
O futuro favorece quem decide com clareza, nao quem corre atras de tudo.\r
`,Oz=`---\r
title: "Sindrome do impostor no trabalho: o que e e como superar sem se sabotar"\r
description: "A sindrome do impostor faz profissionais competentes se sentirem uma fraude. Entenda o que e, quais os gatilhos e como superar de forma pratica."\r
slug: "sindrome-do-impostor-no-trabalho"\r
date: "2026-01-12"\r
tags: ["sindrome do impostor", "vida profissional", "clareza profissional", "saude mental no trabalho"]\r
---\r
\r
# Sindrome do impostor no trabalho: o que e e como superar\r
\r
## Quando o reconhecimento nao convence voce\r
\r
Voce entrega resultados.\r
Recebe elogios.\r
Consegue novas responsabilidades.\r
\r
Mesmo assim, algo insiste em dizer:\r
"Uma hora vao perceber que eu nao sou tudo isso."\r
\r
A sindrome do impostor no trabalho nao e falta de competencia.\r
E a sensacao constante de estar enganando os outros, mesmo com evidencias contrarias.\r
\r
Isso cansa, gera ansiedade e impede decisoes melhores de carreira.\r
\r
---\r
\r
## O erro mais comum: achar que isso so acontece com iniciantes\r
\r
Muita gente acredita que a sindrome do impostor some com experiencia.\r
Nao some.\r
\r
Ela aparece em:\r
- profissionais promovidos\r
- pessoas que mudam de area\r
- quem entra em ambientes mais exigentes\r
- quem cresce mais rapido do que o esperado\r
\r
O problema nao e a falta de preparo.\r
E a interpretacao distorcida do proprio desempenho.\r
\r
---\r
\r
## O que e, de fato, a sindrome do impostor\r
\r
A sindrome do impostor e um padrao mental caracterizado por:\r
- duvidar das proprias capacidades\r
- atribuir conquistas a sorte ou fatores externos\r
- medo constante de ser "descoberto"\r
\r
A pessoa nao se sente merecedora do que conquistou.\r
E isso acontece mesmo com dados objetivos mostrando o contrario.\r
\r
---\r
\r
## Principais gatilhos da sindrome do impostor\r
\r
### Perfeccionismo\r
Nada nunca parece suficiente.\r
Se nao for impecavel, vira fracasso.\r
\r
Esse padrao cria um criterio inalcançavel e alimenta a frustracao.\r
\r
### Critica interna constante\r
A voz interna nunca elogia.\r
So aponta erro, atraso ou falha.\r
\r
Com o tempo, isso vira desgaste emocional continuo.\r
\r
### Comparacao social\r
Comparar bastidores com o palco dos outros distorce tudo.\r
Redes sociais e ambientes competitivos amplificam esse efeito.\r
\r
Voce ve resultado final.\r
Nao ve o processo, as duvidas e os erros alheios.\r
\r
---\r
\r
## Como a sindrome do impostor afeta sua carreira\r
\r
- evita assumir desafios\r
- gera medo de se posicionar\r
- aumenta ansiedade e exaustao\r
- faz a pessoa aceitar menos do que merece\r
\r
No longo prazo, isso trava crescimento e gera insatisfacao silenciosa.\r
\r
---\r
\r
## Cinco passos praticos para superar a sindrome do impostor\r
\r
### 1. Reestruturar pensamentos (base cognitiva)\r
A terapia cognitivo-comportamental ajuda a identificar distorcoes como:\r
- "se nao sou perfeito, sou incapaz"\r
- "se consegui, foi sorte"\r
\r
Aprender a questionar esses pensamentos reduz o impacto emocional.\r
\r
### 2. Buscar mentoria de carreira\r
Mentores ajudam a:\r
- dar referencia externa realista\r
- diferenciar erro pontual de incompetencia\r
- validar progresso com criterio\r
\r
Isso tira voce do julgamento solitario.\r
\r
### 3. Organizar a rotina e as entregas\r
Caos aumenta inseguranca.\r
Clareza reduz ansiedade.\r
\r
Ter prioridades definidas, prazos claros e processos organizados melhora a percepcao de controle.\r
\r
### 4. Fortalecer inteligencia emocional\r
Reconhecer emocao nao e fraqueza.\r
E habilidade.\r
\r
Aprender a lidar com medo, ansiedade e frustracao evita que eles ditem suas decisoes.\r
\r
### 5. Investir em capacitacao com criterio\r
Capacitar-se nao para provar valor, mas para reduzir lacunas reais.\r
\r
Cursos e certificacoes fazem sentido quando:\r
- resolvem inseguranca especifica\r
- aumentam compatibilidade com o papel atual\r
\r
Estudar sem foco reforca a ideia de que voce nunca esta pronto.\r
\r
---\r
\r
## Histories comuns de quem superou o impostor\r
\r
Muitos profissionais relatam que:\r
- a inseguranca diminuiu quando pararam de se comparar\r
- a clareza aumentou ao entender seu proprio perfil\r
- a sindrome enfraqueceu ao alinhar carreira com rotina e valores\r
\r
Nao foi um evento unico.\r
Foi um processo de ajuste mental e estrutural.\r
\r
A virada nao veio da confianca cega.\r
Veio da clareza.\r
\r
---\r
\r
## Sindrome do impostor e o tipo de carreira escolhida\r
\r
### Carreira privada\r
- ambientes competitivos amplificam comparacao\r
- metas agressivas alimentam inseguranca\r
\r
### Concurso publico\r
- inseguranca aparece em ambientes hierarquicos\r
- medo de nao corresponder a expectativa pesa\r
\r
### Empreendedorismo\r
- comparacao constante com outros empreendedores\r
- resultados instaveis reforcam duvida\r
\r
Cada caminho tem seus gatilhos.\r
Nenhum esta livre disso.\r
\r
---\r
\r
## Perguntas de exclusao importantes\r
\r
- Estou me cobrando alem do razoavel?\r
- Estou tentando corresponder a um padrao que nao e meu?\r
- Estou confundindo aprendizado com incompetencia?\r
\r
Responder com honestidade reduz o poder do impostor.\r
\r
---\r
\r
## Erros que fortalecem a sindrome do impostor\r
\r
- buscar perfeicao constante\r
- ignorar evidencias objetivas\r
- se comparar o tempo todo\r
- tentar provar valor o tempo inteiro\r
\r
A sindrome cresce quando voce luta contra ela do jeito errado.\r
\r
---\r
\r
## Resumo pratico\r
\r
- Sindrome do impostor nao e falta de capacidade\r
- Gatilhos comuns sao perfeccionismo e comparacao\r
- Clareza reduz inseguranca\r
- Mentoria e organizacao ajudam mais que motivacao\r
- Capacitar-se com criterio enfraquece o impostor\r
\r
---\r
\r
## Um convite a clareza interna\r
\r
Se voce sente que a sindrome do impostor esta afetando suas decisoes profissionais, o teste do FuturoPerfeito pode ajudar a organizar seu perfil, rotina, pressao e objetivos de longo prazo.\r
\r
Quando a mente se organiza, o impostor perde espaco.\r
`,Iz=`---\r
title: "Soft skills mais valorizadas pelo mercado: o que realmente pesa na vida real"\r
description: "Soft skills sao decisivas para crescer na carreira. Entenda quais sao as mais valorizadas pelo mercado, como aparecem no dia a dia e como desenvolve-las de forma pratica."\r
slug: "soft-skills-mais-valorizadas-pelo-mercado"\r
date: "2026-01-12"\r
tags: ["soft skills", "habilidades comportamentais", "clareza profissional", "vida profissional"]\r
---\r
\r
# Soft skills mais valorizadas pelo mercado\r
\r
## Quando a tecnica nao e o problema\r
\r
Muita gente sente que trava profissionalmente mesmo sendo competente.\r
Entrega, cumpre prazos, tem formacao.\r
Ainda assim, nao cresce, nao se destaca ou nao se sente segura.\r
\r
Na maioria das vezes, o problema nao esta no conhecimento tecnico.\r
Esta nas **habilidades comportamentais**, as chamadas soft skills.\r
\r
Sao elas que definem como voce trabalha sob pressao, se relaciona, aprende e se adapta.\r
\r
---\r
\r
## O erro mais comum: achar que soft skill e coisa abstrata\r
\r
Soft skills nao sao traços de personalidade vagos.\r
Elas aparecem no dia a dia, em situacoes concretas.\r
\r
O mercado nao valoriza quem "diz que tem".\r
Valoriza quem **demonstra na rotina**.\r
\r
---\r
\r
## Comunicacao, lideranca e trabalho em equipe\r
\r
Essas habilidades caminham juntas.\r
\r
### Comunicacao na pratica\r
Nao e falar bonito.\r
E conseguir:\r
- explicar ideias com clareza\r
- alinhar expectativas\r
- evitar retrabalho\r
\r
Voce pratica comunicacao quando:\r
- confirma combinados por escrito\r
- pergunta antes de assumir\r
- ajusta linguagem conforme o publico\r
\r
### Lideranca no dia a dia\r
Nao depende de cargo.\r
Lideranca aparece quando voce:\r
- assume responsabilidade\r
- toma decisoes com criterio\r
- ajuda o time a funcionar melhor\r
\r
Mesmo sem chefiar ninguem, voce pode liderar processos.\r
\r
### Trabalho em equipe\r
O mercado valoriza quem:\r
- coopera sem competir o tempo todo\r
- sabe ouvir\r
- resolve conflitos sem escalar problemas desnecessarios\r
\r
Isso reduz atrito e aumenta produtividade.\r
\r
---\r
\r
## Inteligencia emocional e empatia\r
\r
Ambientes de trabalho sao emocionais, mesmo quando fingem nao ser.\r
\r
### Inteligencia emocional\r
E a capacidade de:\r
- reconhecer suas reacoes\r
- nao agir no impulso\r
- manter clareza sob pressao\r
\r
Ela aparece quando voce:\r
- recebe critica sem explodir\r
- sustenta conversas dificeis\r
- lida melhor com frustracao\r
\r
### Empatia\r
Empatia nao e concordar com tudo.\r
E entender o ponto de vista do outro antes de responder.\r
\r
Isso melhora negociacao, lideranca e convivio diaria.\r
\r
---\r
\r
## Criatividade e resolucao de problemas\r
\r
Criatividade nao e so para areas artisticas.\r
E sobre **enxergar alternativas**.\r
\r
### Resolucao de problemas\r
Profissionais valorizados nao so apontam falhas.\r
Eles propoem caminhos.\r
\r
Praticas simples ajudam:\r
- dividir problemas grandes em partes menores\r
- perguntar "por que isso acontece?"\r
- testar solucoes pequenas antes de mudar tudo\r
\r
### Pensamento critico\r
Questionar processos nao e rebeldia.\r
E melhoria.\r
\r
Tecnicas como brainstorming estruturado e design thinking ajudam quando usadas para resolver problemas reais, nao como moda.\r
\r
---\r
\r
## Aprendizagem continua e adaptabilidade\r
\r
Mercados mudam.\r
Funcoes mudam.\r
Habilidades tecnicas envelhecem.\r
\r
O que sustenta uma carreira hoje e a capacidade de aprender.\r
\r
### Curiosidade pratica\r
Nao e consumir conteudo aleatorio.\r
E aprender com objetivo:\r
- resolver uma lacuna\r
- melhorar uma entrega\r
- se preparar para um proximo passo\r
\r
### Adaptabilidade\r
Profissionais adaptaveis:\r
- aceitam mudanca sem paralisar\r
- ajustam rota sem drama\r
- aprendem com erro\r
\r
Isso reduz inseguranca em ambientes instaveis.\r
\r
---\r
\r
## Soft skills e o tipo de carreira\r
\r
### Carreira privada\r
- comunicacao e inteligencia emocional sao cruciais\r
- pressao exige adaptabilidade constante\r
\r
### Concurso publico\r
- trabalho em equipe e comunicacao sustentam a rotina\r
- inteligencia emocional ajuda a lidar com hierarquia e repeticao\r
\r
### Empreendedorismo\r
- lideranca, empatia e resolucao de problemas sao diarias\r
- aprendizagem continua e obrigatoria\r
\r
Soft skills mudam de peso conforme o caminho, mas nunca deixam de importar.\r
\r
---\r
\r
## Perguntas de exclusao importantes\r
\r
- Eu consigo receber feedback sem levar para o pessoal?\r
- Consigo trabalhar em grupo sem me isolar ou competir demais?\r
- Consigo aprender algo novo sem travar pelo medo?\r
\r
Responder nao mostra onde desenvolver.\r
\r
---\r
\r
## Erros comuns ao tentar desenvolver soft skills\r
\r
- achar que curso resolve tudo\r
- confundir simpatia com empatia\r
- ignorar feedbacks recorrentes\r
- tentar parecer algo que nao e\r
\r
Soft skills se desenvolvem com pratica consciente, nao com discurso.\r
\r
---\r
\r
## Resumo pratico\r
\r
- Soft skills definem crescimento no longo prazo\r
- Comunicacao, inteligencia emocional e adaptabilidade sao centrais\r
- Elas aparecem na rotina, nao no curriculo\r
- Cada caminho exige combinacoes diferentes\r
- Desenvolver soft skills reduz inseguranca profissional\r
\r
---\r
\r
## Um convite a clareza comportamental\r
\r
Se voce quer entender quais habilidades comportamentais fazem mais sentido desenvolver de acordo com seu perfil e seus objetivos, o teste do FuturoPerfeito pode ajudar a organizar essa analise, conectando comportamento, rotina, pressao e longo prazo.\r
\r
Soft skills bem alinhadas sustentam escolhas melhores.\r
`,Mz=`---
title: "Checklist do dia da prova"
description: "O que fazer na véspera e no dia para não perder pontos por detalhes."
slug: "checklist-dia-da-prova"
date: "2025-01-04"
tags: ["prova", "logistica", "controle-emocional"]
---

Mesmo com conteúdo em dia, detalhes logísticos derrubam notas. Use este checklist simples:

## Véspera
- Separe documento, caneta, água e lanche leve.
- Confirme o endereço e o tempo de deslocamento em horário de pico.
- Durma cedo: 7h a 8h de sono ajudam mais do que 2h extras de estudo.

## Manhã do exame
- Chegue com 1h de antecedência para evitar imprevistos.
- Faça um aquecimento mental de 10 a 15 minutos (questões fáceis).
- Respire fundo 3 vezes antes de abrir a prova para baixar a frequência cardíaca.

## Durante a prova
- Varredura inicial: marque questões rápidas e difíceis.
- Controle de tempo: divida o total por blocos de 30 minutos e confira o relógio.
- Últimos 10 minutos: revise só marcações e preenchimento do gabarito.

Simples, mas prático: eliminar imprevistos libera sua energia para o conteúdo.
`,Lz=`---
title: "Como organizar seus estudos para concursos"
description: "Passo a passo para montar um plano semanal e manter o foco até a prova."
slug: "como-organizar-estudos"
date: "2025-01-05"
tags: ["planejamento", "rotina", "foco"]
---

Organizar estudos para concursos é mais fácil quando você enxerga o caminho. Use estes passos:

## 1. Defina metas semanais
- Escolha 3 a 5 matérias prioritárias.
- Converta o edital em tópicos rastreáveis.
- Reserve horários fixos: é melhor ter menos tempo consistente do que muito tempo irregular.

## 2. Monte blocos curtos
- 50 minutos de estudo + 10 minutos de pausa.
- Alterne leitura, resumo e revisão ativa (flashcards ou questões).
- Finalize cada bloco com 3 a 5 questões do tema.

## 3. Revise com cadência
- D+1: releia o que marcou e refaça 2 questões.
- D+7: revisão maior; anote dúvidas reais.
- Antes do simulado: checklist rápido só de erros recorrentes.

## 4. Faça simulados quinzenais
- Simule o tempo da prova e mantenha a mesma sequência de matérias.
- Marque tempo gasto por questão para entender onde está perdendo pontos.
- Registre os 5 erros mais comuns e corrija no próximo ciclo de estudos.

Mantenha o plano visível (quadro, planner ou app). Ajuste semanalmente: removendo o que não funcionou e repetindo o que deu resultado.
`,Fz=e=>{const r=e.match(/^---\s*[\r\n]+([\s\S]*?)\r?\n---\s*[\r\n]*([\s\S]*)$/);if(!r)return{data:{},content:e};const[,n,t]=r,a={};return n.split(/\r?\n/).forEach(o=>{const s=o.trim();if(!s)return;const l=s.indexOf(":");if(l===-1)return;const c=s.slice(0,l).trim(),u=s.slice(l+1).trim();if(!c)return;let d=u;if(u.startsWith("[")&&u.endsWith("]"))try{d=JSON.parse(u.replace(/'/g,'"'))}catch{d=u.slice(1,-1).split(",").map(m=>m.trim().replace(/^["']|["']$/g,"")).filter(Boolean)}else d=u.replace(/^["']|["']$/g,"");a[c]=d}),{data:a,content:t.trim()}},Dz=Object.assign({"/content/blog/2026-01-05-como-escolher-qual-concurso-fazer.md":lz,"/content/blog/2026-01-05-como-saber-qual-profissao-escolher.md":cz,"/content/blog/2026-01-05-nao-sei-qula-concurso-estudar.md":uz,"/content/blog/2026-01-05-qual-carreira-seguir.md":dz,"/content/blog/2026-01-05-qual-concurso-devo-fazer.md":mz,"/content/blog/2026-01-05-qual-concurso-escolher.md":pz,"/content/blog/2026-01-05-qual-concurso-fazer.md":fz,"/content/blog/2026-01-05-qual-profissao-combina-comigo.md":hz,"/content/blog/2026-01-05-quero-mudar-de-carreira-o-que-fazer.md":gz,"/content/blog/2026-01-05-teste-de-perfil-profissional.md":vz,"/content/blog/2026-01-05-teste-de-personalidade-profissional.md":xz,"/content/blog/2026-01-05-teste-vocacional-adulto.md":yz,"/content/blog/2026-01-10-concurso-publico-ou-iniciativa-privada.md":bz,"/content/blog/2026-01-10-vale-a-pena-estudar-para-concurso-hoje-em-dia.md":wz,"/content/blog/2026-01-10-vale-a-pena-fazer-concurso-publico-depois-dos-30.md":jz,"/content/blog/2026-01-11-como-descobrir-minhas-habilidades-profissionais.md":Sz,"/content/blog/2026-01-11-como-escolher-um-concurso-pelo-perfil.md":Cz,"/content/blog/2026-01-11-como-saber-se-concurso-combina-comigo.md":Nz,"/content/blog/2026-01-11-concurso-publico-para-iniciantes.md":Ez,"/content/blog/2026-01-11-qual-concurso-e-mais-facil-para-iniciantes.md":kz,"/content/blog/2026-01-13-como-alinhar-carreira-com-perfil-e-valores.md":Pz,"/content/blog/2026-01-13-como-encontrar-um-trabalho-que-faca-sentido.md":Tz,"/content/blog/2026-01-13-como-tomar-uma-decisao-de-carreira.md":zz,"/content/blog/2026-01-13-estou-perdido-profissionalmente.md":Az,"/content/blog/2026-01-13-insatisfacao-profissional.md":qz,"/content/blog/2026-01-13-me-sinto-frustado-no-trabalho.md":Rz,"/content/blog/2026-01-13-profissoes-do-futuro-tendencias-ate-2030.md":_z,"/content/blog/2026-01-13-sindrome-do-impostor-no-trabalho.md":Oz,"/content/blog/2026-01-13-soft-skills-mais-valorizadas-pelo-mercado.md":Iz,"/content/blog/checklist-dia-da-prova.md":Mz,"/content/blog/como-organizar-estudos.md":Lz}),rw=Object.entries(Dz).map(([e,r])=>{var l,c;const{data:n,content:t}=Fz(r),a=n,o=a.slug??((c=(l=e.split("/").pop())==null?void 0:l.replace(".md",""))==null?void 0:c.toLowerCase()),s=Array.isArray(a.tags)?a.tags.map(u=>String(u)):[];return!a.title||!a.description||!o||!a.date?(console.warn(`Skipping blog file with missing fields: ${e}`),null):{title:a.title,description:a.description,slug:o,date:a.date,tags:s,content:t.trim()}}).filter(e=>!!e).sort((e,r)=>new Date(r.date).getTime()-new Date(e.date).getTime()),Wp=()=>rw,Bz=e=>rw.find(r=>r.slug===e),$z=({onStart:e,variant:r})=>{const n=r==="B",t=x.useMemo(()=>n?["concurso público","iniciativa privada","empreendedorismo","o próximo passo profissional"]:["baseado na sua personalidade","baseado na sua experiência com provas anteriores","baseado na sua formação acadêmica","baseado no estado onde deseja construir carreira"],[n]),[a,o]=x.useState(0),[s,l]=x.useState(!0),c=x.useMemo(()=>Wp().slice(0,3),[]);x.useEffect(()=>{let h;const v=window.setInterval(()=>{l(!1),h=window.setTimeout(()=>{o(w=>(w+1)%t.length),l(!0)},220)},2e3);return()=>{clearInterval(v),h&&clearTimeout(h)}},[t]);const u=n?[{title:"Estilo de trabalho e motivadores",icon:i.jsx(kr,{className:"w-5 h-5 text-primary"})},{title:"Habilidades e pontos fortes",icon:i.jsx(Ql,{className:"w-5 h-5 text-primary"})},{title:"Experiência profissional e estudos",icon:i.jsx(Su,{className:"w-5 h-5 text-primary"})},{title:"Objetivos de renda e qualidade de vida",icon:i.jsx(rn,{className:"w-5 h-5 text-primary"})},{title:"Localização e formato de trabalho",icon:i.jsx(Cu,{className:"w-5 h-5 text-primary"})}]:[{title:"Personalidade (RIASEC)",icon:i.jsx(kr,{className:"w-5 h-5 text-primary"})},{title:"Formação acadêmica e habilidades",icon:i.jsx(Ql,{className:"w-5 h-5 text-primary"})},{title:"Histórico com provas anteriores",icon:i.jsx(Su,{className:"w-5 h-5 text-primary"})},{title:"Objetivo de carreira e qualidade de vida",icon:i.jsx(rn,{className:"w-5 h-5 text-primary"})},{title:"Localização onde deseja construir carreira",icon:i.jsx(Cu,{className:"w-5 h-5 text-primary"})}],d=n?["Mapa das rotas: concurso público, iniciativa privada e empreendedorismo","Clareza sobre seu perfil RIASEC e ambiente ideal","Sugestões de cargos/áreas compatíveis com seu perfil","Plano inicial de próximos passos (estudo, portfólio ou validação)","Comparativo de riscos e benefícios por rota","Checklist prático para executar sem travar"]:["Ranking dos concursos mais compatíveis (3 concursos públicos ideais)","Descrição prática do dia a dia no trabalho","Faixa salarial e tempo estimado de estudo","Orientação para editais e provas anteriores","Plano de estudo alinhado ao edital","Assistente de Estudos para organizar o cronograma"],m=n?[{quote:"O relatório me ajudou a decidir entre concurso e empresa privada. Parei de girar em círculos.",name:"Larissa, transição de carreira"},{quote:"Achei que precisava empreender, mas o diagnóstico mostrou um caminho mais claro para mim.",name:"Marcos, área comercial"}]:[{quote:"“Obrigada pela análise! Creio que são 3 boas opções dentro da minha área que demandam menos estresse cognitivo. E a opção número 1 é exatamente meu foco hoje: área pericial… Foi o motivo para eu fazer o PIX, para contribuir com o trabalho :).”",name:"Bruna, área pericial"},{quote:"“Consegui ver sim, tem vínculo com meu perfil. Agora vou pensar em algo relacionado à transição de carreira, pois trabalho com engenharia ambiental.”",name:"Diogo, engenharia ambiental"}],f=n?["Diagnóstico feito por uma pessoa, com melhoria contínua a cada feedback.","Direção prática: aponta a rota mais coerente agora e o próximo passo.","Transparente e simples: pagamento único de R$ 25 para o relatório completo, sem assinatura ou recorrência.","Base em método (RIASEC) + contexto profissional real, sem promessas milagrosas."]:["Futuro Perfeito é tocado por uma pessoa, com melhoria contínua a cada feedback para entregar um futuro cada vez mais perfeito para você.","Atendimento próximo: respondo direto e ajusto o produto com base nas dúvidas reais dos clientes.","Transparente e simples: pagamento único de R$ 25 para o relatório completo, sem assinatura ou recorrência.","Base em método (RIASEC) + dados reais, sem promessas milagrosas."],p=n?[{title:"Responda ao teste",desc:"Leva 7-10 minutos e já é gratuito.",icon:i.jsx(kr,{className:"w-5 h-5 text-primary"})},{title:"Veja sua clareza de rota",desc:"Receba seus pontos fortes e o caminho mais coerente agora.",icon:i.jsx(rn,{className:"w-5 h-5 text-primary"})},{title:"Destrave o relatório profissional",desc:"Se fizer sentido, por R$ 25 você recebe a comparação das rotas e um plano detalhado.",icon:i.jsx(er,{className:"w-5 h-5 text-primary"})}]:[{title:"Responda ao teste",desc:"Leva 7-10 minutos e já é gratuito.",icon:i.jsx(kr,{className:"w-5 h-5 text-primary"})},{title:"Veja seus insights",desc:"Receba os primeiros encaixes e pontos fortes na hora.",icon:i.jsx(rn,{className:"w-5 h-5 text-primary"})},{title:"Destrave o relatório completo",desc:"Se fizer sentido, por R$ 25 você recebe ranking de concursos e plano detalhado (pagamento único).",icon:i.jsx(er,{className:"w-5 h-5 text-primary"})}],y=n?["identificar seus pontos fortes e lacunas,","comparar rotas com melhor encaixe,","criar um plano eficiente para o seu momento atual."]:["identificar matérias onde você trava,","ajustar seu cronograma,","criar um plano eficiente para o seu momento atual."],g=n?["quer clareza para decidir entre concurso, CLT e empreender,","quer um plano realista para o próximo passo,","quer alinhar trabalho, renda e estilo de vida."]:["quer estabilidade com clareza e método,","já estudou sem resultados consistentes,","busca direção realista."],b=n?["quer atalho mágico,","não aceita olhar para o próprio perfil,","quer decidir sem seguir um plano."]:["quer promessas mágicas,","não quer seguir um plano.","acredita em milagres sem esforço."];return i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5",children:i.jsx("div",{className:"container mx-auto px-4 py-16 md:py-24",children:i.jsxs("div",{className:"max-w-5xl mx-auto space-y-16 animate-fade-in",children:[i.jsxs("div",{className:"text-center space-y-4 md:space-y-6",children:[i.jsxs("h1",{className:"text-3xl sm:text-4xl md:text-6xl font-bold leading-tight",children:[n?"Encontre clareza profissional para decidir seu próximo passo:":"Descubra o concurso que combina com você —"," ",i.jsx("span",{className:"block md:inline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",children:i.jsxs("span",{className:"relative inline-flex items-center justify-center min-h-[34px] sm:min-h-[40px] md:min-h-[44px]",children:[i.jsx("span",{className:`absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl md:text-inherit transition-opacity duration-300 ${s?"opacity-100":"opacity-0"}`,children:t[a]}),i.jsx("span",{className:"opacity-0 text-2xl sm:text-3xl md:text-inherit",children:t[0]})]})})]}),i.jsx("div",{className:"flex justify-center",children:i.jsxs("div",{className:"relative w-full max-w-3xl h-14 sm:h-16 md:h-20",style:{perspective:"1200px"},children:[i.jsx("div",{className:"absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/15 via-accent/10 to-primary/15 blur-md"}),i.jsxs("div",{className:"relative h-full overflow-hidden rounded-2xl border border-primary/20 bg-white/50 backdrop-blur-sm shadow-[var(--shadow-elevated)]",children:[t.map((h,v)=>i.jsx("div",{className:"absolute inset-0 flex items-center justify-center text-base sm:text-lg md:text-xl font-semibold text-primary transition-all duration-500 ease-out",style:{opacity:a===v?1:0,transform:a===v?"translateZ(40px) rotateX(0deg)":"translateZ(-40px) rotateX(-70deg)"},children:h},h)),i.jsx("div",{className:"opacity-0 text-base sm:text-lg md:text-xl",children:t[0]})]})]})}),i.jsx("p",{className:"text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto",children:n?"Um diagnóstico que organiza seu perfil e mostra a rota mais coerente agora: concurso público, iniciativa privada ou empreendedorismo. Sem promessas milagrosas, só direção prática.":"Um relatório personalizado que transforma suas informações em um plano claro — mostrando quais concursos realmente valem seu tempo e como estudar com método, sem promessas milagrosas ou testes genéricos."}),i.jsxs("div",{className:"flex flex-col items-center gap-2",children:[i.jsxs("div",{className:"inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary font-medium",children:[i.jsx(er,{className:"w-4 h-4"}),n?"Centenas de pessoas já buscaram clareza profissional com o teste.":"Centenas de pessoas já fizeram o teste e avaliaram positivamente a experiência."]}),i.jsxs(ge,{onClick:e,size:"lg",className:"text-lg px-8 py-6 rounded-full shadow-[var(--shadow-elevated)] hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-primary to-accent",children:["Começar meu teste agora",i.jsx(Uh,{className:"ml-2 w-5 h-5"})]}),i.jsx("p",{className:"text-sm text-muted-foreground",children:"Teste gratuito, leva 7–10 minutos para responder."}),i.jsx("p",{className:"text-xs sm:text-sm text-muted-foreground",children:n?"Relatório completo custa R$ 25 (pagamento único, sem assinatura) — menos do que um hambúrguer para evitar meses no caminho errado.":"Relatório completo custa R$ 25 (pagamento único, sem assinatura) — menos do que um hambúrguer para evitar meses no edital errado."}),i.jsxs("div",{className:"flex flex-wrap justify-center gap-2 text-xs sm:text-sm text-muted-foreground",children:[i.jsxs("span",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary",children:[i.jsx(er,{className:"w-3.5 h-3.5"}),"Pagamento único, sem assinatura"]}),i.jsxs("span",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary",children:[i.jsx(er,{className:"w-3.5 h-3.5"}),"Dados protegidos"]})]})]})]}),i.jsx("section",{children:i.jsx(J,{className:"p-8 bg-card border border-border",children:i.jsxs("div",{className:"space-y-4 text-left",children:[i.jsx("h2",{className:"text-3xl font-bold",children:n?"Você se esforça muito — mas sem direção.":"Você estuda muito… mas cresce pouco."}),i.jsx("p",{className:"text-lg text-foreground",children:n?"O maior problema não é a quantidade de esforço, e sim escolher a rota profissional errada para o seu perfil e realidade.":"O maior problema não é a quantidade de horas de estudo, e sim escolher o concurso errado para o seu perfil e realidade."}),i.jsx("p",{className:"text-lg text-foreground",children:n?"Muita gente oscila entre concurso, iniciativa privada e empreender sem clareza. O Futuro Perfeito foi criado para acabar com essa perda de tempo: ele mostra o caminho certo, de acordo com quem você é e onde quer chegar.":"Muita gente segue listas aleatórias e passa anos sem resultado. O Futuro Perfeito foi criado para acabar com essa perda de tempo: ele mostra o caminho certo, de acordo com quem você é e onde quer chegar."})]})})}),i.jsxs("section",{className:"space-y-6",children:[i.jsx("h2",{className:"text-3xl font-bold text-center",children:n?"Como o Futuro Perfeito funciona: analisamos seu perfil profissional":"Como o Futuro Perfeito funciona: analisamos"}),i.jsx("div",{className:"grid sm:grid-cols-2 lg:grid-cols-3 gap-4",children:u.map((h,v)=>i.jsxs(J,{className:"p-5 flex items-center gap-3 h-full",children:[i.jsx("div",{className:"w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0",children:h.icon}),i.jsx("p",{className:"font-semibold leading-snug",children:h.title})]},v))}),i.jsx(J,{className:"p-6 bg-primary/5 border-primary/20 text-center",children:i.jsx("p",{className:"text-lg",children:n?"Com isso, o relatório mostra as rotas mais compatíveis (concurso, iniciativa privada ou empreendedorismo) e um plano de ação realista.":"Com isso, o relatório indica concursos compatíveis e um plano de estudo realista."})})]}),i.jsxs("section",{className:"space-y-6",children:[i.jsx("h2",{className:"text-3xl font-bold text-center",children:n?"Futuro Perfeito: clareza profissional de forma humana":"Futuro Perfeito: feito por uma pessoa, evoluindo sempre"}),i.jsx("div",{className:"grid md:grid-cols-2 gap-4",children:f.map((h,v)=>i.jsxs(J,{className:"p-5 flex items-start gap-3",children:[i.jsx(er,{className:"w-5 h-5 text-primary mt-1"}),i.jsx("p",{children:h})]},v))}),i.jsxs(J,{className:"p-6 bg-primary/5 border-primary/20 text-center space-y-3",children:[i.jsx("p",{className:"text-lg",children:n?"Você começa respondendo ao teste gratuitamente, vê seus primeiros insights e só paga se quiser receber o relatório profissional completo, detalhado e personalizado.":"Você começa respondendo ao teste gratuitamente, vê seus primeiros insights e só paga se quiser receber o relatório completo, detalhado e personalizado."}),i.jsx("p",{className:"text-sm text-muted-foreground",children:n?"O relatório completo custa R$ 25 — menos do que um hambúrguer — para te ajudar a decidir a rota profissional mais coerente com o seu perfil. Sem mensalidade, sem recorrência: pagamento único que evita anos de tentativa e erro.":"O relatório completo custa R$ 25 — menos do que um hambúrguer — para te ajudar a decidir um caminho de concursos alinhado com o seu perfil. Sem mensalidade, sem recorrência: pagamento único que evita anos de tentativa e erro."}),i.jsxs("p",{className:"text-sm text-muted-foreground",children:["Precisa falar direto comigo? WhatsApp:"," ",i.jsx("a",{className:"text-primary font-semibold",href:"https://wa.me/5591984233672",target:"_blank",rel:"noreferrer",children:"(91) 98423-3672"})]})]})]}),i.jsxs("section",{className:"space-y-4",children:[i.jsx("h2",{className:"text-3xl font-bold text-center",children:"Como acontece na prática"}),i.jsx("div",{className:"grid md:grid-cols-3 gap-4",children:p.map((h,v)=>i.jsxs(J,{className:"p-5 flex items-start gap-3",children:[i.jsx("div",{className:"w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center",children:h.icon}),i.jsxs("div",{children:[i.jsx("p",{className:"font-semibold",children:h.title}),i.jsx("p",{className:"text-sm text-muted-foreground",children:h.desc})]})]},v))}),i.jsx("p",{className:"text-center text-sm text-muted-foreground",children:"Seus dados ficam protegidos; envio no WhatsApp é opcional e não há assinatura escondida."})]}),i.jsxs("section",{className:"grid md:grid-cols-2 gap-6 items-start",children:[i.jsxs(J,{className:"p-7 h-full",children:[i.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[i.jsx("div",{className:"w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center",children:i.jsx(Cu,{className:"w-5 h-5 text-primary"})}),i.jsx("h3",{className:"text-2xl font-semibold",children:n?"Oportunidades alinhadas com a sua realidade":"Concursos alinhados com a sua realidade geográfica"})]}),i.jsx("p",{className:"text-muted-foreground text-lg",children:n?"Você pode comparar rotas considerando região, estabilidade, crescimento e estilo de vida. O relatório mostra opções viáveis sem te prender a um único caminho.":"Você pode focar na região onde já vive ou considerar outros estados. O relatório mostra oportunidades que realmente existem para o seu cenário — sem forçar ninguém a se mudar."})]}),i.jsxs(J,{className:"p-7 h-full",children:[i.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[i.jsx("div",{className:"w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center",children:i.jsx(Su,{className:"w-5 h-5 text-accent"})}),i.jsx("h3",{className:"text-2xl font-semibold",children:n?"Sua experiência profissional vira vantagem":"Sua experiência com provas vira vantagem"})]}),i.jsxs("div",{className:"space-y-2 text-muted-foreground text-lg",children:[i.jsx("p",{children:n?"Usamos sua experiência para:":"Usamos seu histórico para:"}),i.jsx("ul",{className:"list-disc list-inside space-y-1",children:y.map(h=>i.jsx("li",{children:h},h))}),i.jsx("p",{className:"font-medium text-foreground",children:n?"Você não começa do zero — começa do que já fez e aprendeu.":"Você não começa do zero — começa de onde está."})]})]})]}),i.jsxs("section",{className:"space-y-4",children:[i.jsx("h2",{className:"text-3xl font-bold text-center",children:"O que você recebe"}),i.jsx("div",{className:"grid md:grid-cols-2 gap-4",children:d.map((h,v)=>i.jsxs(J,{className:"p-5 flex items-start gap-3",children:[i.jsx(er,{className:"w-5 h-5 text-primary mt-1"}),i.jsx("p",{children:h})]},v))})]}),i.jsxs("section",{className:"space-y-6",children:[i.jsx("h2",{className:"text-3xl font-bold text-center",children:"Para quem o Futuro Perfeito foi feito"}),i.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[i.jsxs(J,{className:"p-6 space-y-3",children:[i.jsx("p",{className:"font-semibold",children:"É para quem:"}),i.jsx("ul",{className:"space-y-2 text-muted-foreground",children:g.map(h=>i.jsxs("li",{className:"flex gap-2",children:[i.jsx(er,{className:"w-4 h-4 text-primary mt-1"}),i.jsx("span",{children:h})]},h))})]}),i.jsxs(J,{className:"p-6 space-y-3",children:[i.jsx("p",{className:"font-semibold",children:"Não é para quem:"}),i.jsx("ul",{className:"space-y-2 text-muted-foreground",children:b.map(h=>i.jsxs("li",{className:"flex gap-2",children:[i.jsx(_b,{className:"w-4 h-4 text-destructive mt-1"}),i.jsx("span",{children:h})]},h))})]})]})]}),i.jsxs("section",{className:"space-y-6",children:[i.jsx("h2",{className:"text-3xl font-bold text-center",children:n?"Histórias de clareza profissional":"Depoimentos"}),i.jsx("div",{className:"grid md:grid-cols-2 gap-4",children:m.map((h,v)=>i.jsxs(J,{className:"p-6 space-y-3 shadow-[var(--shadow-card)]",children:[i.jsx("div",{className:"flex gap-1",children:[...Array(5)].map((w,j)=>i.jsx($d,{className:"w-4 h-4 fill-primary text-primary"},j))}),i.jsx("p",{className:"text-muted-foreground italic",children:h.quote}),i.jsx("p",{className:"font-semibold",children:h.name})]},v))})]}),i.jsxs("section",{className:"space-y-6",children:[i.jsxs("div",{className:"flex flex-col items-center justify-between gap-2 text-center md:flex-row md:text-left",children:[i.jsx("h2",{className:"text-3xl font-bold",children:"Blog e conteudo"}),i.jsx(cr,{to:"/blog",className:"text-sm font-semibold text-primary transition-colors hover:text-primary/80",children:"Ver todos os artigos"})]}),c.length>0?i.jsx("div",{className:"grid gap-4 md:grid-cols-3",children:c.map(h=>i.jsxs(cr,{to:`/blog/${h.slug}`,className:"group rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",children:[i.jsx("p",{className:"text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground",children:"Blog"}),i.jsx("h3",{className:"mt-3 text-lg font-semibold text-foreground group-hover:text-primary",children:h.title}),i.jsx("p",{className:"mt-2 text-sm text-muted-foreground",children:h.description})]},h.slug))}):i.jsx("p",{className:"text-center text-muted-foreground",children:"Sem posts publicados no momento."})]}),i.jsxs("section",{className:"text-center space-y-4",children:[i.jsx("h2",{className:"text-3xl font-bold",children:n?"Você não precisa escolher no escuro. Precisa de clareza para seguir o caminho certo.":"Você não precisa estudar mais. Precisa estudar com direção — para o concurso certo."}),i.jsxs(ge,{onClick:e,size:"lg",className:"text-lg px-8 py-6 rounded-full shadow-[var(--shadow-elevated)] hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-primary to-accent",children:["Começar meu teste agora",i.jsx(Uh,{className:"ml-2 w-5 h-5"})]}),i.jsx("p",{className:"text-sm text-muted-foreground",children:n?"Teste gratuito para começar; o relatório completo é opcional e ajuda a decidir sua rota profissional.":"Teste gratuito para começar; o relatório completo é opcional, de pagamento único e sem recorrência."})]})]})})}),i.jsx(Ci,{})]})},Uz=({onStart:e})=>i.jsx("div",{className:"min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center py-8",children:i.jsx("div",{className:"container mx-auto px-4 max-w-4xl",children:i.jsxs(J,{className:"p-8 md:p-12 shadow-[var(--shadow-elevated)] animate-fade-in",children:[i.jsxs("div",{className:"text-center mb-8",children:[i.jsx("div",{className:"inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent mb-6 animate-scale-in",children:i.jsx(Ab,{className:"w-10 h-10 text-white"})}),i.jsx("h1",{className:"text-3xl md:text-4xl font-bold mb-4",children:"Antes de começar: 7-10 minutos para ganhar direção"})]}),i.jsxs("div",{className:"space-y-6 text-center mb-8",children:[i.jsx("p",{className:"text-lg md:text-xl text-muted-foreground",children:"Feito para auxiliar administrativa que quer estabilidade sem se expor. Usamos RIASEC adaptado para concursos: liberamos um diagnóstico grátis na hora e você decide se quer destravar o plano completo por R$25."}),i.jsx("div",{className:"bg-primary/5 border border-primary/20 rounded-lg p-6 text-left",children:i.jsxs("div",{className:"flex flex-col md:flex-row gap-4",children:[i.jsxs("div",{className:"flex-1 space-y-4",children:[i.jsxs("div",{className:"flex items-start gap-3",children:[i.jsx(rn,{className:"w-6 h-6 text-primary flex-shrink-0 mt-1"}),i.jsxs("div",{children:[i.jsx("h3",{className:"font-semibold text-lg mb-2",children:"Por que este teste é diferente?"}),i.jsx("p",{className:"text-sm text-muted-foreground",children:"A metodologia RIASEC é usada em orientação profissional. Aqui ela foi ajustada para concursos públicos para evitar que você estude para o edital errado."})]})]}),i.jsxs("div",{className:"flex items-start gap-3",children:[i.jsx(kr,{className:"w-6 h-6 text-primary flex-shrink-0 mt-1"}),i.jsxs("div",{children:[i.jsx("h3",{className:"font-semibold text-lg mb-2",children:"Bônus ao terminar"}),i.jsx("p",{className:"text-sm text-muted-foreground",children:"Resultado parcial grátis liberado na hora. Se fizer sentido, você pode pegar o plano completo com checklist de edital e plano de 7 dias por R$25."})]})]})]}),i.jsxs("div",{className:"rounded-xl border bg-background/60 p-4 flex flex-col gap-3 max-w-xs",children:[i.jsxs("div",{className:"flex items-center gap-2 text-sm font-semibold",children:[i.jsx(yN,{className:"w-4 h-4 text-primary"}),"Tempo médio: 7-10 min"]}),i.jsxs("div",{className:"flex items-center gap-2 text-sm text-muted-foreground",children:[i.jsx(_s,{className:"w-4 h-4 text-primary"}),"Dados protegidos (LGPD) e sem aparecer em rede social"]}),i.jsx("div",{className:"text-xs text-muted-foreground",children:"O diagnóstico grátis aparece antes de qualquer oferta paga."})]})]})}),i.jsxs("div",{className:"space-y-3",children:[i.jsx("p",{className:"text-lg font-medium",children:"Para resultados precisos:"}),i.jsxs("div",{className:"grid md:grid-cols-3 gap-3",children:[i.jsxs("div",{className:"flex items-center gap-2 text-sm text-muted-foreground bg-background border rounded-lg p-3",children:[i.jsx(er,{className:"w-4 h-4 text-primary flex-shrink-0"}),i.jsx("span",{children:"Local silencioso"})]}),i.jsxs("div",{className:"flex items-center gap-2 text-sm text-muted-foreground bg-background border rounded-lg p-3",children:[i.jsx(er,{className:"w-4 h-4 text-primary flex-shrink-0"}),i.jsx("span",{children:"Sem distrações"})]}),i.jsxs("div",{className:"flex items-center gap-2 text-sm text-muted-foreground bg-background border rounded-lg p-3",children:[i.jsx(er,{className:"w-4 h-4 text-primary flex-shrink-0"}),i.jsx("span",{children:"Respostas sinceras"})]})]})]}),i.jsx("div",{className:"pt-4",children:i.jsxs("p",{className:"text-lg md:text-xl font-semibold text-foreground",children:["Leve a sério: ",i.jsx("span",{className:"text-primary",children:"este teste pode cortar meses de estudo no concurso errado."})]})})]}),i.jsxs("div",{className:"text-center",children:[i.jsx(ge,{onClick:e,size:"lg",className:"text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity",children:"Começar teste gratuito"}),i.jsx("p",{className:"text-xs text-muted-foreground mt-4",children:"Tempo estimado: 7-10 minutos | 25 perguntas | Diagnóstico grátis e privado"})]})]})})}),Vz=["Discordo totalmente","Discordo","Neutro","Concordo","Concordo totalmente"],Hz=[{id:"riasec_r1",riasecType:"Realista",question:"Você gosta de realizar atividades práticas, como consertar objetos quebrados ou fazer pequenos reparos em casa?"},{id:"riasec_r2",riasecType:"Realista",question:"Você sente interesse em operar máquinas, ferramentas ou equipamentos mecânicos por conta própria?"},{id:"riasec_r3",riasecType:"Realista",question:"Você gosta de trabalhar em ambientes externos, como jardins, obras ou espaços ao ar livre?"},{id:"riasec_r4",riasecType:"Realista",question:"Desmontar equipamentos, entender suas peças e montar novamente é algo que chama sua atenção?"},{id:"riasec_r5",riasecType:"Realista",question:"Você se sente confortável em fazer reparos elétricos simples, como trocar tomadas ou instalar lâmpadas?"},{id:"riasec_i1",riasecType:"Investigativo",question:"Você sente prazer em resolver problemas matemáticos, cálculos ou desafios numéricos?"},{id:"riasec_i2",riasecType:"Investigativo",question:"Você gosta de ler sobre descobertas científicas, avanços da medicina ou novas tecnologias?"},{id:"riasec_i3",riasecType:"Investigativo",question:"Fazer pesquisas, analisar informações e investigar causas e efeitos te interessa?"},{id:"riasec_i4",riasecType:"Investigativo",question:"Você gosta de descobrir como as coisas funcionam desmontando, estudando ou observando processos?"},{id:"riasec_i5",riasecType:"Investigativo",question:"Trabalhar com bancos de dados, estatísticas ou gráficos é algo que desperta o seu interesse?"},{id:"riasec_a1",riasecType:"Artístico",question:"Você gosta de criar desenhos, ilustrações, pinturas ou qualquer forma de arte visual?"},{id:"riasec_a2",riasecType:"Artístico",question:"Escrever textos, histórias, poesias ou roteiros é algo que te envolve e estimula sua criatividade?"},{id:"riasec_a3",riasecType:"Artístico",question:"Expressar ideias de forma criativa, original e fora do padrão é natural para você?"},{id:"riasec_a4",riasecType:"Artístico",question:"Tocar instrumentos, compor músicas ou participar de atividades musicais te agrada?"},{id:"riasec_a5",riasecType:"Artístico",question:"Criar designs, layouts, artes digitais ou conteúdos visuais te deixa animado?"},{id:"riasec_s1",riasecType:"Social",question:"Você gosta de ensinar outras pessoas, explicar temas e ajudar alguém a aprender?"},{id:"riasec_s2",riasecType:"Social",question:"Ajudar pessoas com dificuldades, oferecendo apoio e orientação, te traz satisfação?"},{id:"riasec_s3",riasecType:"Social",question:"Você gosta de dar conselhos, ouvir problemas e orientar amigos ou colegas?"},{id:"riasec_s4",riasecType:"Social",question:"Trabalhar em equipe, colaborar com pessoas e criar um ambiente harmonioso te motiva?"},{id:"riasec_s5",riasecType:"Social",question:"Cuidar do bem-estar de outras pessoas, seja emocional ou físico, é algo que você valoriza?"},{id:"riasec_e1",riasecType:"Empreendedor",question:"Você gosta de liderar grupos, coordenar pessoas ou tomar decisões importantes?"},{id:"riasec_e2",riasecType:"Empreendedor",question:"Assumir responsabilidade e ser o responsável final por um projeto te motiva?"},{id:"riasec_e3",riasecType:"Empreendedor",question:"Vender produtos, ideias, serviços ou persuadir outras pessoas é algo que você faz bem?"},{id:"riasec_e4",riasecType:"Empreendedor",question:"Você gosta de assumir riscos calculados para alcançar resultados maiores?"},{id:"riasec_e5",riasecType:"Empreendedor",question:"Planejar metas, criar estratégias e pensar no futuro te empolga?"},{id:"riasec_c1",riasecType:"Convencional",question:"Você gosta de organizar documentos, manter arquivos e deixar tudo fácil de encontrar?"},{id:"riasec_c2",riasecType:"Convencional",question:"Seguir regras, procedimentos e rotinas claras te traz segurança e tranquilidade?"},{id:"riasec_c3",riasecType:"Convencional",question:"Trabalhar com planilhas, sistemas ou processos administrativos te parece confortável?"},{id:"riasec_c4",riasecType:"Convencional",question:"Manter o ambiente limpo, organizado e padronizado é algo que você considera importante?"},{id:"riasec_c5",riasecType:"Convencional",question:"Você não se incomoda com tarefas repetitivas e prefere atividades estruturadas?"}],Qz=Hz.map(e=>({...e,type:"likert",options:Vz})),Br=[...Qz,{id:"q1",type:"multiple-choice",question:"Qual é o seu nível de escolaridade atual?",options:["Ensino Fundamental completo ou em andamento","Ensino Médio completo ou em andamento","Ensino Superior completo ou em andamento","Pós-graduação (especialização, mestrado ou doutorado)"]},{id:"q2",type:"text",question:"Em qual estado você deseja prestar o concurso público?",placeholder:"Ex: Pará; capital ou interior",helperText:"Usuários costumam escrever: 'Pará, capital' ou 'SP, interior'."},{id:"q3",type:"multiple-choice",question:"Qual ambiente de trabalho você prefere?",options:["Escritório administrativo com rotina estável","Trabalho externo com deslocamentos/fiscalização","Ambiente de saúde (hospital, unidade, serviço de campo)","Instituição de ensino (escola, universidade, formação)","Órgãos de segurança pública ou campo operacional"]},{id:"q4",type:"text",question:"Descreva sua experiência profissional ou com provas de concursos anteriores.",placeholder:"Ex: trabalhei no setor privado e já fiz 2 provas (INSS e TJ-SP)",helperText:"Outros exemplos: 'estágio na prefeitura e fiz PF e Receita', 'sou CLT e fiz INSS e TJ-RJ'."},{id:"q5",type:"text",question:"Qual é o seu principal objetivo ao passar em um concurso?",placeholder:"Ex: salário alto e benefícios / menor concorrência / qualidade de vida",helperText:"Usuários escrevem: 'menor concorrência', 'salário alto + benefícios', 'equilíbrio trabalho-vida'."}],gr=(e,r)=>{typeof window<"u"&&window.gtag&&window.gtag("event",e,r)},Gp=()=>{if(typeof window>"u")return"A";try{const e=window.localStorage.getItem("home_variant");return(e?e.trim().toUpperCase():"")==="B"?"B":"A"}catch{return"A"}},Wz=e=>{if(!(typeof window>"u"))try{window.gtag&&window.gtag("set","user_properties",e)}catch{}},nw=(e,r)=>{typeof window<"u"&&window.gtag&&window.gtag("event","conversion",{send_to:e,value:50,currency:"BRL"})},Gz=(e,r=25,n)=>{typeof window<"u"&&window.gtag&&(window.gtag("event","purchase",{transaction_id:e,value:r,currency:"BRL",items:[{item_id:"pacote-completo",item_name:"Pacote Completo de Preparação",item_category:"Concursos Públicos",price:r,quantity:1}],...n??{}}),window.gtag("event","conversion",{send_to:"AW-400922729/LFG4CLCi_7IbEOmwlr8B",transaction_id:e,value:r,currency:"BRL"}),console.log("🎯 Google Ads conversion tracked:",e,r))},Yz=(e=50,r)=>{typeof window<"u"&&window.gtag&&window.gtag("event","begin_checkout",{value:e,currency:"BRL",items:[{item_id:"pacote-completo",item_name:"Pacote Completo de Preparação",item_category:"Concursos Públicos",price:e,quantity:1}],...r??{}})},Kz=e=>{typeof window<"u"&&window.gtag&&window.gtag("event","cta_desbloqueio_click",{event_category:"engagement",event_label:e,value:25}),typeof window<"u"&&window.fbq&&window.fbq("trackCustom","CtaDesbloqueioClick",{location:e}),console.log("📊 CTA Desbloqueio tracked:",e)},Xz=()=>{typeof window<"u"&&window.gtag&&window.gtag("event","cupom_whatsapp_click",{event_category:"engagement",event_label:"discount_coupon_request",value:5}),typeof window<"u"&&window.fbq&&window.fbq("trackCustom","CupomWhatsappClick",{discount_value:5}),console.log("📊 Cupom WhatsApp tracked")},Jz={"Discordo totalmente":-2,Discordo:-1,Neutro:0,Concordo:1,"Concordo totalmente":2},Zz={riasec_r1:1.1,riasec_r4:1.15,riasec_i1:1.1,riasec_i5:1.15,riasec_a2:1.1,riasec_a3:1.15,riasec_s1:1.1,riasec_s4:1.1,riasec_e1:1.1,riasec_e4:1.15,riasec_c1:1.1,riasec_c3:1.15},Ct={Realista:{strengths:["prático","mão na massa","orientado a resultados","persistente"],environment:"ambientes concretos, com processos claros e entregas visíveis",tagline:"execução prática e objetiva"},Investigativo:{strengths:["analítico","curioso","metódico","gosta de dados"],environment:"contextos que exigem análise, investigação e entendimento de causas",tagline:"profundidade analítica"},Artístico:{strengths:["criativo","original","expressivo","pensamento divergente"],environment:"espaços com liberdade de criação, design ou expressão",tagline:"criatividade aplicada"},Social:{strengths:["empático","comunicativo","facilitador","orientado a pessoas"],environment:"times colaborativos, ensino, cuidado ou orientação",tagline:"conexão e impacto em pessoas"},Empreendedor:{strengths:["liderança","persuasivo","decisor","foco em resultados"],environment:"cenários com metas, influência, visão de futuro e tomada de risco calculado",tagline:"liderança estratégica"},Convencional:{strengths:["organizado","detalhista","sistemático","consistente"],environment:"operações estruturadas, rotinas claras e controle de qualidade",tagline:"organização e consistência"}},eA=()=>({Realista:{raw:0,max:0,min:0,strongSignals:0,positiveSignals:0,weightSum:0},Investigativo:{raw:0,max:0,min:0,strongSignals:0,positiveSignals:0,weightSum:0},Artístico:{raw:0,max:0,min:0,strongSignals:0,positiveSignals:0,weightSum:0},Social:{raw:0,max:0,min:0,strongSignals:0,positiveSignals:0,weightSum:0},Empreendedor:{raw:0,max:0,min:0,strongSignals:0,positiveSignals:0,weightSum:0},Convencional:{raw:0,max:0,min:0,strongSignals:0,positiveSignals:0,weightSum:0}}),rA=(e,r,n)=>{const t=Math.max(n-r,1);return Math.round((e-r)/t*100)},nA=(e,r,n,t)=>{const a=Math.abs(n[e]-n[r]),s=a<=8?`Perfil híbrido entre ${e} e ${r} (diferença de apenas ${a} pontos)`:`Predominância ${e} com suporte ${r} (diferença de ${a} pontos)`,l=`${t[e].strong} respostas de alta concordância em ${e} e ${t[r].strong} em ${r}`,c=`${Ct[e].environment} com influência ${r.toLowerCase()}`;return`${s}. Você mostrou ${l}, indicando preferência por ${c}.`},hm=(e,r)=>{const n=eA();r.forEach(d=>{if(d.type!=="likert"||!d.riasecType)return;const m=e[d.id],f=Jz[m],p=Zz[d.id]??1;if(n[d.riasecType].max+=2*p,n[d.riasecType].min-=2*p,n[d.riasecType].weightSum+=p,typeof f!="number")return;const y=f*p;n[d.riasecType].raw+=y,f>=1&&(n[d.riasecType].positiveSignals+=1),f>=2&&(n[d.riasecType].strongSignals+=1)});const t=Object.entries(n).reduce((d,[m,f])=>{const p=rA(f.raw,f.min,f.max);return d[m]=p,d},{}),a=Object.entries(t).sort(([d,m],[f,p])=>{if(m!==p)return p-m;const y=n[d],g=n[f],b=y.strongSignals*2+y.positiveSignals;return g.strongSignals*2+g.positiveSignals-b}),[o,s]=a.slice(0,2).map(([d])=>d),l=Array.from(new Set([Ct[o].strengths[0],Ct[o].strengths[1],Ct[s].strengths[0],"perfil alinhado às respostas mais fortes"])),c={Realista:{strong:n.Realista.strongSignals,positive:n.Realista.positiveSignals},Investigativo:{strong:n.Investigativo.strongSignals,positive:n.Investigativo.positiveSignals},Artístico:{strong:n.Artístico.strongSignals,positive:n.Artístico.positiveSignals},Social:{strong:n.Social.strongSignals,positive:n.Social.positiveSignals},Empreendedor:{strong:n.Empreendedor.strongSignals,positive:n.Empreendedor.positiveSignals},Convencional:{strong:n.Convencional.strongSignals,positive:n.Convencional.positiveSignals}},u=nA(o,s,t,c);return{top1:o,top2:s,scores:t,habilidades:l,habilidade_destaque:`${Ct[o].tagline} com apoio ${Ct[s].tagline}`,contexto_profissional:`${Ct[o].environment} complementado por ${Ct[s].environment}`,descricao_personalizada:u}},tA=({onComplete:e})=>{const n=Math.ceil(Br.length/3),[t,a]=x.useState(0),[o,s]=x.useState({}),l=x.useRef({}),c=12,u=x.useMemo(()=>Object.keys(o).length,[o]),d=u/Br.length*100,f=Math.max(Br.length-u,0)*c,p=f===0?0:Math.max(1,Math.ceil(f/60)),y=x.useMemo(()=>{const P=t*3;return Br.slice(P,P+3)},[t,3]),g=y.every(P=>P.type==="text"?!0:!!o[P.id]),b=t===n-1,h=[{title:"Plano completo liberado no final",description:"Depois do diagnóstico grátis, destrave opcionalmente o plano completo + checklist de edital por R$25.",pill:"Bonus pago",cta:"Quero ver o plano completo",event:"quiz_microbanner_click_full_plan"},{title:"Resultado grátis imediato",description:"Mostramos seu diagnóstico antes da oferta paga. você só paga se quiser o plano completo.",pill:"grátis primeiro",cta:"Ver como funciona",event:"quiz_microbanner_click_free_first"},{title:"Roteiro personalizado",description:"Seu perfil RIASEC vira um plano de estudos com priorização do que rende mais.",pill:"Benefício",cta:"Quero meu roteiro",event:"quiz_microbanner_click_route"}],v=h[t%h.length];x.useEffect(()=>{console.log(`[Quiz] Total de perguntas no quiz: ${Br.length}`);const P=localStorage.getItem("quiz_progress");if(P)try{const{answers:k}=JSON.parse(P);k&&typeof k=="object"&&s(k)}catch(k){console.error("[Quiz] Falha ao carregar progresso salvo:",k),localStorage.removeItem("quiz_progress")}gr("quiz_started")},[]),x.useEffect(()=>{localStorage.setItem("quiz_progress",JSON.stringify({answers:o}))},[o]),x.useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"})},[t]);const w=(P,k)=>{s(z=>({...z,[P]:k})),gr("quiz_option_selected",{questionId:P,answer:k})},j=(P,k)=>{s(z=>({...z,[P]:k}))},E=()=>{if(!g){const z=y.find(A=>!o[A.id]);if(z){const A=l.current[z.id];A==null||A.scrollIntoView({behavior:"smooth",block:"start"})}return}if(!b){gr("quiz_page_advance",{page:t+1}),a(z=>z+1),window.scrollTo({top:0,behavior:"smooth"});return}const P=hm(o,Br),k=Br.map(z=>({id:z.id,question:z.question,answer:o[z.id],riasecType:z.riasecType}));localStorage.removeItem("quiz_progress"),gr("quiz_completed"),e(k,P)},N=b?"Finalizar":"próxima";return i.jsxs("div",{className:"min-h-screen flex flex-col bg-background",children:[i.jsx("div",{className:"sticky top-0 z-10 bg-background/95 backdrop-blur border-b",children:i.jsxs("div",{className:"max-w-2xl mx-auto px-4 pt-4 pb-3 space-y-3",children:[i.jsxs("div",{className:"flex items-center justify-between text-sm text-muted-foreground",children:[i.jsxs("span",{children:["Pagina ",t+1," de ",n]}),i.jsxs("span",{className:"font-medium",children:["Respondidas ",u,"/",Br.length," Â· ",d.toFixed(0),"%"]})]}),i.jsx("div",{className:"w-full h-2 bg-muted rounded-full overflow-hidden",children:i.jsx("div",{className:"h-full bg-primary transition-all duration-300",style:{width:`${d}%`}})}),i.jsxs("div",{className:"flex flex-wrap items-center gap-3 text-xs text-muted-foreground",children:[i.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/60",children:[i.jsx(uN,{className:"w-4 h-4 text-primary"}),"Tempo restante aprox: ",p," min"]}),i.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/60",children:[i.jsx(_s,{className:"w-4 h-4 text-primary"}),"diagnóstico grátis antes da oferta paga"]}),i.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/60",children:[i.jsx(rn,{className:"w-4 h-4 text-primary"}),"Foque em respostas sinceras para mais precisao"]})]})]})}),i.jsx("div",{className:"flex-1 w-full max-w-2xl mx-auto px-4 py-4 space-y-4",children:y.map((P,k)=>{const z=t*3+k,A=k===0;return i.jsxs("div",{className:"space-y-4",children:[i.jsx("div",{ref:I=>{l.current[P.id]=I},className:"rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm",children:i.jsxs("div",{className:"flex items-start gap-3",children:[i.jsx("div",{className:"mt-1 h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0",children:z+1}),i.jsxs("div",{className:"space-y-3 w-full",children:[i.jsx("p",{className:"text-base sm:text-lg font-semibold leading-snug",children:P.question}),P.type==="text"?i.jsxs("div",{className:"space-y-1",children:[i.jsx("textarea",{value:o[P.id]||"",onChange:I=>j(P.id,I.target.value),onBlur:I=>gr("quiz_text_answered",{questionId:P.id,length:(I.target.value||"").length}),placeholder:P.placeholder||"",className:"w-full rounded-xl border px-4 py-3 text-base sm:text-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/40",rows:2}),P.helperText&&i.jsx("p",{className:"text-xs text-muted-foreground",children:P.helperText})]}):i.jsx("div",{className:"grid gap-2",children:(P.options||[]).map((I,_)=>{const V=o[P.id]===I;return i.jsx("button",{type:"button",onClick:()=>w(P.id,I),className:`text-left w-full rounded-xl border px-4 py-3 sm:py-3.5 text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${V?"border-primary bg-primary/10 text-primary":"border-border bg-background hover:bg-muted/70"}`,children:I},_)})})]})]})}),A&&i.jsxs("div",{className:"rounded-2xl border bg-muted/40 p-4 sm:p-5 flex gap-3 items-start",children:[i.jsx("div",{className:"mt-1",children:i.jsx("div",{className:"w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center",children:i.jsx(kr,{className:"w-5 h-5 text-primary"})})}),i.jsxs("div",{className:"space-y-1",children:[i.jsx("div",{className:"flex items-center gap-2 text-xs uppercase tracking-wide text-primary font-semibold",children:v.pill}),i.jsx("p",{className:"text-sm font-semibold text-foreground",children:v.title}),i.jsx("p",{className:"text-sm text-muted-foreground",children:v.description}),i.jsx("button",{type:"button",className:"mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 underline",onClick:()=>gr(v.event,{page:t+1}),children:v.cta})]})]})]},P.id)})}),i.jsx("div",{className:"sticky bottom-0 z-20 bg-background/95 backdrop-blur border-t",children:i.jsxs("div",{className:"max-w-2xl mx-auto px-4 py-3 space-y-2",children:[i.jsx("p",{className:"text-xs text-muted-foreground text-center",children:"Complete a pagina para avancar. Seu diagnóstico gratuito aparece ao final antes de qualquer oferta paga."}),i.jsx("button",{className:"w-full bg-primary text-primary-foreground py-3.5 rounded-xl text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md shadow-primary/20",onClick:E,disabled:!g,children:N})]})})]})},Kt=x.forwardRef(({className:e,type:r,...n},t)=>i.jsx("input",{type:r,className:fe("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",e),ref:t,...n}));Kt.displayName="Input";var aA="Label",tw=x.forwardRef((e,r)=>i.jsx(we.label,{...e,ref:r,onMouseDown:n=>{var a;n.target.closest("button, input, select, textarea")||((a=e.onMouseDown)==null||a.call(e,n),!n.defaultPrevented&&n.detail>1&&n.preventDefault())}}));tw.displayName=aA;var aw=tw;const oA=Nc("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),Un=x.forwardRef(({className:e,...r},n)=>i.jsx(aw,{ref:n,className:fe(oA(),e),...r}));Un.displayName=aw.displayName;function sA(e){const r=x.useRef({value:e,previous:e});return x.useMemo(()=>(r.current.value!==e&&(r.current.previous=r.current.value,r.current.value=e),r.current.previous),[e])}var qc="Checkbox",[iA,g3]=sa(qc),[lA,Yp]=iA(qc);function cA(e){const{__scopeCheckbox:r,checked:n,children:t,defaultChecked:a,disabled:o,form:s,name:l,onCheckedChange:c,required:u,value:d="on",internal_do_not_use_render:m}=e,[f,p]=yi({prop:n,defaultProp:a??!1,onChange:c,caller:qc}),[y,g]=x.useState(null),[b,h]=x.useState(null),v=x.useRef(!1),w=y?!!s||!!y.closest("form"):!0,j={checked:f,disabled:o,setChecked:p,control:y,setControl:g,name:l,form:s,value:d,hasConsumerStoppedPropagationRef:v,required:u,defaultChecked:Xt(a)?!1:a,isFormControl:w,bubbleInput:b,setBubbleInput:h};return i.jsx(lA,{scope:r,...j,children:uA(m)?m(j):t})}var ow="CheckboxTrigger",sw=x.forwardRef(({__scopeCheckbox:e,onKeyDown:r,onClick:n,...t},a)=>{const{control:o,value:s,disabled:l,checked:c,required:u,setControl:d,setChecked:m,hasConsumerStoppedPropagationRef:f,isFormControl:p,bubbleInput:y}=Yp(ow,e),g=Be(a,d),b=x.useRef(c);return x.useEffect(()=>{const h=o==null?void 0:o.form;if(h){const v=()=>m(b.current);return h.addEventListener("reset",v),()=>h.removeEventListener("reset",v)}},[o,m]),i.jsx(we.button,{type:"button",role:"checkbox","aria-checked":Xt(c)?"mixed":c,"aria-required":u,"data-state":dw(c),"data-disabled":l?"":void 0,disabled:l,value:s,...t,ref:g,onKeyDown:xe(r,h=>{h.key==="Enter"&&h.preventDefault()}),onClick:xe(n,h=>{m(v=>Xt(v)?!0:!v),y&&p&&(f.current=h.isPropagationStopped(),f.current||h.stopPropagation())})})});sw.displayName=ow;var Kp=x.forwardRef((e,r)=>{const{__scopeCheckbox:n,name:t,checked:a,defaultChecked:o,required:s,disabled:l,value:c,onCheckedChange:u,form:d,...m}=e;return i.jsx(cA,{__scopeCheckbox:n,checked:a,defaultChecked:o,disabled:l,required:s,onCheckedChange:u,name:t,form:d,value:c,internal_do_not_use_render:({isFormControl:f})=>i.jsxs(i.Fragment,{children:[i.jsx(sw,{...m,ref:r,__scopeCheckbox:n}),f&&i.jsx(uw,{__scopeCheckbox:n})]})})});Kp.displayName=qc;var iw="CheckboxIndicator",lw=x.forwardRef((e,r)=>{const{__scopeCheckbox:n,forceMount:t,...a}=e,o=Yp(iw,n);return i.jsx(pt,{present:t||Xt(o.checked)||o.checked===!0,children:i.jsx(we.span,{"data-state":dw(o.checked),"data-disabled":o.disabled?"":void 0,...a,ref:r,style:{pointerEvents:"none",...e.style}})})});lw.displayName=iw;var cw="CheckboxBubbleInput",uw=x.forwardRef(({__scopeCheckbox:e,...r},n)=>{const{control:t,hasConsumerStoppedPropagationRef:a,checked:o,defaultChecked:s,required:l,disabled:c,name:u,value:d,form:m,bubbleInput:f,setBubbleInput:p}=Yp(cw,e),y=Be(n,p),g=sA(o),b=a0(t);x.useEffect(()=>{const v=f;if(!v)return;const w=window.HTMLInputElement.prototype,E=Object.getOwnPropertyDescriptor(w,"checked").set,N=!a.current;if(g!==o&&E){const P=new Event("click",{bubbles:N});v.indeterminate=Xt(o),E.call(v,Xt(o)?!1:o),v.dispatchEvent(P)}},[f,g,o,a]);const h=x.useRef(Xt(o)?!1:o);return i.jsx(we.input,{type:"checkbox","aria-hidden":!0,defaultChecked:s??h.current,required:l,disabled:c,name:u,value:d,form:m,...r,tabIndex:-1,ref:y,style:{...r.style,...b,position:"absolute",pointerEvents:"none",opacity:0,margin:0,transform:"translateX(-100%)"}})});uw.displayName=cw;function uA(e){return typeof e=="function"}function Xt(e){return e==="indeterminate"}function dw(e){return Xt(e)?"indeterminate":e?"checked":"unchecked"}const mw=x.forwardRef(({className:e,...r},n)=>i.jsx(Kp,{ref:n,className:fe("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",e),...r,children:i.jsx(lw,{className:fe("flex items-center justify-center text-current"),children:i.jsx(qb,{className:"h-4 w-4"})})}));mw.displayName=Kp.displayName;const _g=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,Au=e=>{const t=(e.trim().split("@")[0]||"").replace(/[\.\_\-\+]+/g," ").trim().split(" ")[0]||"";return t.length<2?"Concurseiro":t.charAt(0).toUpperCase()+t.slice(1)},dA=({onSubmit:e})=>{const[r,n]=x.useState("email"),[t,a]=x.useState(""),[o,s]=x.useState(""),[l,c]=x.useState(!0),[u,d]=x.useState(!1),[m,f]=x.useState({}),p=()=>{const b={};return o.trim()?_g.test(o.trim())||(b.email="Use um email válido"):b.email="Informe seu email para liberar o resultado",f(h=>({...h,...b})),Object.keys(b).length===0},y=b=>{b.preventDefault(),p()&&(t.trim()||a(Au(o)),f({}),n("details"))},g=async b=>{b.preventDefault();const h={},v=o.trim().toLowerCase();(!v||!_g.test(v))&&(h.email="Confirme um email válido para receber o relatório"),l||(h.terms="Aceite os termos (pode cancelar a qualquer momento)");const w=t.trim().length>=2?t.trim():Au(v);if(f(h),!(Object.keys(h).length>0)){d(!0);try{nw("AW-400922729/LFG4CLCi_7IbEOmwlr8B"),console.log("Google Ads: lead conversion tracked"),typeof window<"u"&&window.fbq&&(window.fbq("track","Lead",{content_name:"Quiz Email Capture"}),console.log("Facebook Pixel: lead tracked")),await e(w,v)}catch{d(!1)}}};return i.jsx("div",{className:"min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center py-10 px-4",children:i.jsx("div",{className:"container mx-auto max-w-2xl",children:i.jsxs(J,{className:"p-8 shadow-[var(--shadow-elevated)] animate-fade-in",children:[i.jsxs("div",{className:"flex items-start justify-between gap-4 mb-6",children:[i.jsxs("div",{className:"text-left",children:[i.jsx("div",{className:"inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent mb-3",children:i.jsx(kr,{className:"w-7 h-7 text-white"})}),i.jsx("p",{className:"text-xs font-semibold uppercase tracking-[0.08em] text-primary",children:r==="email"?"Etapa 1 de 2":"Etapa 2 de 2"}),i.jsx("h2",{className:"text-2xl md:text-3xl font-bold leading-snug",children:"Último passo para receber seu resultado de forma privada"}),i.jsx("p",{className:"text-muted-foreground mt-2",children:"Mostramos o resultado agora e enviamos no seu email (e opcionalmente no WhatsApp) para você guardar sem se expor."})]}),i.jsxs("div",{className:"hidden md:flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-semibold",children:[i.jsx(_s,{className:"w-4 h-4"}),"Protegido pela LGPD"]})]}),r==="email"?i.jsxs("form",{onSubmit:y,className:"space-y-6",children:[i.jsxs("div",{className:"space-y-2",children:[i.jsx(Un,{htmlFor:"email",children:"Seu email"}),i.jsxs("div",{className:"relative",children:[i.jsx(Hh,{className:"absolute left-3 top-3 h-4 w-4 text-muted-foreground"}),i.jsx(Kt,{id:"email",type:"email",placeholder:"seu@email.com",value:o,onChange:b=>s(b.target.value),className:`pl-10 ${m.email?"border-destructive":""}`})]}),m.email&&i.jsx("p",{className:"text-sm text-destructive",children:m.email})]}),i.jsxs("div",{className:"flex items-start gap-3 rounded-lg border bg-muted/50 p-3",children:[i.jsx(_s,{className:"w-5 h-5 text-primary mt-0.5"}),i.jsxs("div",{children:[i.jsx("p",{className:"font-semibold text-sm",children:"Dados seguros e sem exposição"}),i.jsx("p",{className:"text-xs text-muted-foreground",children:"Aceite pré-marcado. Você pode cancelar quando quiser. Seguimos a LGPD e não exibimos nada em rede social."})]})]}),i.jsxs("div",{className:"flex items-start gap-3",children:[i.jsx(mw,{id:"terms",checked:l,onCheckedChange:b=>c(!!b),className:"mt-1"}),i.jsxs("label",{htmlFor:"terms",className:"text-sm text-muted-foreground cursor-pointer leading-tight",children:["Concordo com os"," ",i.jsx("a",{href:"/terms",target:"_blank",className:"text-primary underline hover:text-primary/80",children:"Termos de Uso"})," ","e a"," ",i.jsx("a",{href:"/privacy",target:"_blank",className:"text-primary underline hover:text-primary/80",children:"Política de Privacidade"}),". Pode cancelar a qualquer momento."]})]}),m.terms&&i.jsx("p",{className:"text-sm text-destructive",children:m.terms}),i.jsxs(ge,{type:"submit",className:"w-full bg-gradient-to-r from-primary to-accent",size:"lg",disabled:u,children:["Continuar para liberar resultado",i.jsx(cN,{className:"w-4 h-4 ml-2"})]}),i.jsx("p",{className:"text-xs text-center text-muted-foreground",children:"Receba seu relatório parcial grátis agora. Sem spam e sem grupos."})]}):i.jsxs("form",{onSubmit:g,className:"space-y-6",children:[i.jsxs("div",{className:"grid gap-4",children:[i.jsxs("div",{className:"space-y-2",children:[i.jsx(Un,{htmlFor:"email-confirm",children:"Confirme seu email"}),i.jsxs("div",{className:"relative",children:[i.jsx(Hh,{className:"absolute left-3 top-3 h-4 w-4 text-muted-foreground"}),i.jsx(Kt,{id:"email-confirm",type:"email",value:o,onChange:b=>s(b.target.value),className:`pl-10 ${m.email?"border-destructive":""}`})]}),m.email&&i.jsx("p",{className:"text-sm text-destructive",children:m.email})]}),i.jsxs("div",{className:"space-y-2",children:[i.jsxs("div",{className:"flex items-center justify-between",children:[i.jsx(Un,{htmlFor:"name",children:"Nome (opcional)"}),i.jsxs("span",{className:"text-xs text-muted-foreground",children:["Sugerido: ",Au(o)]})]}),i.jsxs("div",{className:"relative",children:[i.jsx(bN,{className:"absolute left-3 top-3 h-4 w-4 text-muted-foreground"}),i.jsx(Kt,{id:"name",type:"text",placeholder:"Como gostaria de ser chamado",value:t,onChange:b=>a(b.target.value),className:`pl-10 ${m.name?"border-destructive":""}`})]}),m.name&&i.jsx("p",{className:"text-sm text-destructive",children:m.name}),i.jsx("p",{className:"text-xs text-muted-foreground",children:"Opcional, usamos apenas para personalizar seu plano de estudos."})]})]}),i.jsxs("div",{className:"flex items-start gap-3 text-xs text-muted-foreground bg-muted/40 border rounded-lg p-3",children:[i.jsx(_s,{className:"w-4 h-4 text-primary mt-0.5"}),i.jsx("p",{children:"Enviamos um relatório parcial grátis e você pode cancelar o recebimento a qualquer momento."})]}),i.jsxs("div",{className:"flex flex-col md:flex-row gap-3",children:[i.jsxs(ge,{type:"button",variant:"outline",className:"md:w-40",onClick:()=>{f({}),n("email")},disabled:u,children:[i.jsx(kp,{className:"w-4 h-4 mr-2"}),"Voltar"]}),i.jsx(ge,{type:"submit",className:"w-full bg-gradient-to-r from-primary to-accent",size:"lg",disabled:u,children:u?i.jsxs(i.Fragment,{children:[i.jsx($o,{className:"mr-2 w-5 h-5 animate-spin"}),"Gerando sua recomendação..."]}):"Liberar meu resultado agora"})]}),m.terms&&i.jsx("p",{className:"text-sm text-destructive text-center",children:"Use Voltar para marcar o aceite de LGPD e concluir (pode cancelar depois)."}),i.jsx("p",{className:"text-xs text-center text-muted-foreground",children:"Receba seu relatório parcial grátis agora. Sem spam, sem exposição e com saída garantida."})]})]})})})},mA=Nc("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function Se({className:e,variant:r,...n}){return i.jsx("div",{className:fe(mA({variant:r}),e),...n})}const Ka=({userName:e,userEmail:r,quizResponseId:n,amount:t=25,location:a="unknown"})=>{var g;const{toast:o}=eb(),[s,l]=x.useState(!1),[c,u]=x.useState(null),[d,m]=x.useState(!1),f=async()=>{if(!s)try{l(!0),m(!1),Kz(a),Yz(t,{home_variant:Gp()}),o({title:"Gerando PIX...",description:"Estamos criando seu QR Code e o código para copiar e colar."});const h=await fetch("/api/createPix",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userName:e,userEmail:r,quizResponseId:n,amount:t})}),v=await h.text();let w={};try{w=v?JSON.parse(v):{}}catch(j){console.error("Parse error on createPix response:",j,v),w={}}if(!h.ok){const j=(w==null?void 0:w.details)||(w==null?void 0:w.error)||h.statusText||`Erro no checkout (status ${h.status})`;throw new Error(typeof j=="string"?j:JSON.stringify(j))}if(!w.qrCodeImage&&!w.copyPaste)throw new Error("Erro ao gerar PIX. Tente novamente em instantes.");u({qrCodeImage:w.qrCodeImage||void 0,copyPaste:w.copyPaste||""}),o({title:"PIX gerado!",description:"Use o QR Code ou o código para copiar e colar abaixo."})}catch(b){console.error("Payment error:",b);const h=b instanceof Error&&b.message||typeof b=="string"&&b||(typeof b=="object"&&b&&"message"in b?String(b.message):null)||"não foi possível processar. Tente novamente.";o({variant:"destructive",title:"Erro no checkout",description:typeof h=="string"?h:JSON.stringify(h)})}finally{l(!1)}},p=async()=>{if(c!=null&&c.copyPaste)try{await navigator.clipboard.writeText(c.copyPaste),m(!0),setTimeout(()=>m(!1),2e3)}catch(b){console.error("Copy failed",b),o({variant:"destructive",title:"Erro ao copiar",description:"Tente copiar manualmente o código"})}},y=(g=c==null?void 0:c.qrCodeImage)!=null&&g.startsWith("data:")?c.qrCodeImage:c!=null&&c.qrCodeImage?`data:image/png;base64,${c.qrCodeImage}`:void 0;return i.jsxs("div",{className:"w-full space-y-3",children:[i.jsx(ge,{onClick:f,disabled:s,size:"lg","aria-label":`Pagar R$ ${t} com segurança via PIX`,className:"w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-base md:text-lg py-5 md:py-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-full shadow-[var(--shadow-elevated)]",children:s?i.jsxs("span",{className:"flex items-center justify-center",children:[i.jsx("div",{className:"mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"}),"Processando..."]}):i.jsxs("span",{className:"flex items-center justify-center whitespace-nowrap",children:[i.jsx(pN,{className:"mr-2 w-5 h-5 flex-shrink-0"}),i.jsxs("span",{className:"truncate",children:["Gerar PIX de R$ ",t]})]})}),c&&i.jsxs("div",{className:"w-full rounded-lg border bg-card p-4 shadow-sm space-y-3",children:[i.jsx("p",{className:"font-semibold",children:"Pague escaneando ou copiando o código:"}),y&&i.jsx("div",{className:"flex justify-center",children:i.jsx("img",{src:y,alt:"QR Code PIX",className:"w-48 h-48 rounded-md border"})}),i.jsxs("div",{className:"space-y-2",children:[i.jsx("p",{className:"text-sm text-muted-foreground",children:"Copie e cole (PIX ideal no celular)"}),i.jsxs("div",{className:"flex flex-col gap-2",children:[i.jsx("div",{className:"rounded-md bg-muted p-3 text-sm break-all min-h-[64px] flex items-center",children:c.copyPaste||"Código ainda não carregou. Aguarde 1 segundo ou toque novamente em copiar."}),i.jsx(ge,{variant:"secondary",size:"sm",onClick:p,className:"self-start",disabled:!c.copyPaste,children:d?i.jsxs("span",{className:"flex items-center gap-2 text-emerald-700",children:[i.jsx(qb,{className:"h-4 w-4"})," Copiado!"]}):i.jsxs("span",{className:"flex items-center gap-2",children:[i.jsx(Dd,{className:"h-4 w-4"})," Copiar código"]})})]})]})]})]})},pA=({initialMinutes:e=120})=>{const[r,n]=x.useState(e*60);x.useEffect(()=>{if(r<=0)return;const l=setInterval(()=>{n(c=>Math.max(0,c-1))},1e3);return()=>clearInterval(l)},[r]);const t=Math.floor(r/3600),a=Math.floor(r%3600/60),o=r%60,s=r<600;return i.jsxs("div",{className:`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-bold ${s?"bg-destructive text-destructive-foreground animate-pulse":"bg-primary text-primary-foreground"}`,children:[i.jsx(dN,{className:"w-5 h-5"}),i.jsxs("span",{children:[t>0&&`${String(t).padStart(2,"0")}:`,String(a).padStart(2,"0"),":",String(o).padStart(2,"0")]})]})};var Rc="Collapsible",[fA,pw]=sa(Rc),[hA,Xp]=fA(Rc),fw=x.forwardRef((e,r)=>{const{__scopeCollapsible:n,open:t,defaultOpen:a,disabled:o,onOpenChange:s,...l}=e,[c,u]=yi({prop:t,defaultProp:a??!1,onChange:s,caller:Rc});return i.jsx(hA,{scope:n,disabled:o,contentId:Hb(),open:c,onOpenToggle:x.useCallback(()=>u(d=>!d),[u]),children:i.jsx(we.div,{"data-state":Zp(c),"data-disabled":o?"":void 0,...l,ref:r})})});fw.displayName=Rc;var hw="CollapsibleTrigger",gw=x.forwardRef((e,r)=>{const{__scopeCollapsible:n,...t}=e,a=Xp(hw,n);return i.jsx(we.button,{type:"button","aria-controls":a.contentId,"aria-expanded":a.open||!1,"data-state":Zp(a.open),"data-disabled":a.disabled?"":void 0,disabled:a.disabled,...t,ref:r,onClick:xe(e.onClick,a.onOpenToggle)})});gw.displayName=hw;var Jp="CollapsibleContent",vw=x.forwardRef((e,r)=>{const{forceMount:n,...t}=e,a=Xp(Jp,e.__scopeCollapsible);return i.jsx(pt,{present:n||a.open,children:({present:o})=>i.jsx(gA,{...t,ref:r,present:o})})});vw.displayName=Jp;var gA=x.forwardRef((e,r)=>{const{__scopeCollapsible:n,present:t,children:a,...o}=e,s=Xp(Jp,n),[l,c]=x.useState(t),u=x.useRef(null),d=Be(r,u),m=x.useRef(0),f=m.current,p=x.useRef(0),y=p.current,g=s.open||l,b=x.useRef(g),h=x.useRef(void 0);return x.useEffect(()=>{const v=requestAnimationFrame(()=>b.current=!1);return()=>cancelAnimationFrame(v)},[]),Nn(()=>{const v=u.current;if(v){h.current=h.current||{transitionDuration:v.style.transitionDuration,animationName:v.style.animationName},v.style.transitionDuration="0s",v.style.animationName="none";const w=v.getBoundingClientRect();m.current=w.height,p.current=w.width,b.current||(v.style.transitionDuration=h.current.transitionDuration,v.style.animationName=h.current.animationName),c(t)}},[s.open,t]),i.jsx(we.div,{"data-state":Zp(s.open),"data-disabled":s.disabled?"":void 0,id:s.contentId,hidden:!g,...o,ref:d,style:{"--radix-collapsible-content-height":f?`${f}px`:void 0,"--radix-collapsible-content-width":y?`${y}px`:void 0,...e.style},children:g&&a})});function Zp(e){return e?"open":"closed"}var vA=fw,xA=gw,yA=vw,bA=x.createContext(void 0);function xw(e){const r=x.useContext(bA);return e||r||"ltr"}var Pn="Accordion",wA=["Home","End","ArrowDown","ArrowUp","ArrowLeft","ArrowRight"],[ef,jA,SA]=tb(Pn),[_c,v3]=sa(Pn,[SA,pw]),rf=pw(),yw=D.forwardRef((e,r)=>{const{type:n,...t}=e,a=t,o=t;return i.jsx(ef.Provider,{scope:e.__scopeAccordion,children:n==="multiple"?i.jsx(kA,{...o,ref:r}):i.jsx(EA,{...a,ref:r})})});yw.displayName=Pn;var[bw,CA]=_c(Pn),[ww,NA]=_c(Pn,{collapsible:!1}),EA=D.forwardRef((e,r)=>{const{value:n,defaultValue:t,onValueChange:a=()=>{},collapsible:o=!1,...s}=e,[l,c]=yi({prop:n,defaultProp:t??"",onChange:a,caller:Pn});return i.jsx(bw,{scope:e.__scopeAccordion,value:D.useMemo(()=>l?[l]:[],[l]),onItemOpen:c,onItemClose:D.useCallback(()=>o&&c(""),[o,c]),children:i.jsx(ww,{scope:e.__scopeAccordion,collapsible:o,children:i.jsx(jw,{...s,ref:r})})})}),kA=D.forwardRef((e,r)=>{const{value:n,defaultValue:t,onValueChange:a=()=>{},...o}=e,[s,l]=yi({prop:n,defaultProp:t??[],onChange:a,caller:Pn}),c=D.useCallback(d=>l((m=[])=>[...m,d]),[l]),u=D.useCallback(d=>l((m=[])=>m.filter(f=>f!==d)),[l]);return i.jsx(bw,{scope:e.__scopeAccordion,value:s,onItemOpen:c,onItemClose:u,children:i.jsx(ww,{scope:e.__scopeAccordion,collapsible:!0,children:i.jsx(jw,{...o,ref:r})})})}),[PA,Oc]=_c(Pn),jw=D.forwardRef((e,r)=>{const{__scopeAccordion:n,disabled:t,dir:a,orientation:o="vertical",...s}=e,l=D.useRef(null),c=Be(l,r),u=jA(n),m=xw(a)==="ltr",f=xe(e.onKeyDown,p=>{var k;if(!wA.includes(p.key))return;const y=p.target,g=u().filter(z=>{var A;return!((A=z.ref.current)!=null&&A.disabled)}),b=g.findIndex(z=>z.ref.current===y),h=g.length;if(b===-1)return;p.preventDefault();let v=b;const w=0,j=h-1,E=()=>{v=b+1,v>j&&(v=w)},N=()=>{v=b-1,v<w&&(v=j)};switch(p.key){case"Home":v=w;break;case"End":v=j;break;case"ArrowRight":o==="horizontal"&&(m?E():N());break;case"ArrowDown":o==="vertical"&&E();break;case"ArrowLeft":o==="horizontal"&&(m?N():E());break;case"ArrowUp":o==="vertical"&&N();break}const P=v%h;(k=g[P].ref.current)==null||k.focus()});return i.jsx(PA,{scope:n,disabled:t,direction:a,orientation:o,children:i.jsx(ef.Slot,{scope:n,children:i.jsx(we.div,{...s,"data-orientation":o,ref:c,onKeyDown:t?void 0:f})})})}),nc="AccordionItem",[TA,nf]=_c(nc),Sw=D.forwardRef((e,r)=>{const{__scopeAccordion:n,value:t,...a}=e,o=Oc(nc,n),s=CA(nc,n),l=rf(n),c=Hb(),u=t&&s.value.includes(t)||!1,d=o.disabled||e.disabled;return i.jsx(TA,{scope:n,open:u,disabled:d,triggerId:c,children:i.jsx(vA,{"data-orientation":o.orientation,"data-state":Tw(u),...l,...a,ref:r,disabled:d,open:u,onOpenChange:m=>{m?s.onItemOpen(t):s.onItemClose(t)}})})});Sw.displayName=nc;var Cw="AccordionHeader",Nw=D.forwardRef((e,r)=>{const{__scopeAccordion:n,...t}=e,a=Oc(Pn,n),o=nf(Cw,n);return i.jsx(we.h3,{"data-orientation":a.orientation,"data-state":Tw(o.open),"data-disabled":o.disabled?"":void 0,...t,ref:r})});Nw.displayName=Cw;var gm="AccordionTrigger",Ew=D.forwardRef((e,r)=>{const{__scopeAccordion:n,...t}=e,a=Oc(Pn,n),o=nf(gm,n),s=NA(gm,n),l=rf(n);return i.jsx(ef.ItemSlot,{scope:n,children:i.jsx(xA,{"aria-disabled":o.open&&!s.collapsible||void 0,"data-orientation":a.orientation,id:o.triggerId,...l,...t,ref:r})})});Ew.displayName=gm;var kw="AccordionContent",Pw=D.forwardRef((e,r)=>{const{__scopeAccordion:n,...t}=e,a=Oc(Pn,n),o=nf(kw,n),s=rf(n);return i.jsx(yA,{role:"region","aria-labelledby":o.triggerId,"data-orientation":a.orientation,...s,...t,ref:r,style:{"--radix-accordion-content-height":"var(--radix-collapsible-content-height)","--radix-accordion-content-width":"var(--radix-collapsible-content-width)",...e.style}})});Pw.displayName=kw;function Tw(e){return e?"open":"closed"}var zA=yw,AA=Sw,qA=Nw,zw=Ew,Aw=Pw;const RA=zA,ha=x.forwardRef(({className:e,...r},n)=>i.jsx(AA,{ref:n,className:fe("border-b",e),...r}));ha.displayName="AccordionItem";const ga=x.forwardRef(({className:e,children:r,...n},t)=>i.jsx(qA,{className:"flex",children:i.jsxs(zw,{ref:t,className:fe("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",e),...n,children:[r,i.jsx(lN,{className:"h-4 w-4 shrink-0 transition-transform duration-200"})]})}));ga.displayName=zw.displayName;const va=x.forwardRef(({className:e,children:r,...n},t)=>i.jsx(Aw,{ref:t,className:"overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",...n,children:i.jsx("div",{className:fe("pb-4 pt-0",e),children:r})}));va.displayName=Aw.displayName;const qw=x.forwardRef(({className:e,...r},n)=>i.jsx("div",{className:"relative w-full overflow-auto",children:i.jsx("table",{ref:n,className:fe("w-full caption-bottom text-sm",e),...r})}));qw.displayName="Table";const Rw=x.forwardRef(({className:e,...r},n)=>i.jsx("thead",{ref:n,className:fe("[&_tr]:border-b",e),...r}));Rw.displayName="TableHeader";const _w=x.forwardRef(({className:e,...r},n)=>i.jsx("tbody",{ref:n,className:fe("[&_tr:last-child]:border-0",e),...r}));_w.displayName="TableBody";const _A=x.forwardRef(({className:e,...r},n)=>i.jsx("tfoot",{ref:n,className:fe("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",e),...r}));_A.displayName="TableFooter";const js=x.forwardRef(({className:e,...r},n)=>i.jsx("tr",{ref:n,className:fe("border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50",e),...r}));js.displayName="TableRow";const Ss=x.forwardRef(({className:e,...r},n)=>i.jsx("th",{ref:n,className:fe("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",e),...r}));Ss.displayName="TableHead";const Lr=x.forwardRef(({className:e,...r},n)=>i.jsx("td",{ref:n,className:fe("p-4 align-middle [&:has([role=checkbox])]:pr-0",e),...r}));Lr.displayName="TableCell";const OA=x.forwardRef(({className:e,...r},n)=>i.jsx("caption",{ref:n,className:fe("mt-4 text-sm text-muted-foreground",e),...r}));OA.displayName="TableCaption";const IA=({recommendation:e,userName:r,userEmail:n,quizResponseId:t,riasecFallback:a})=>{var h,v,w;const[o,s]=x.useState(!1),[l,c]=x.useState(!1),[u]=x.useState(()=>{if(typeof window>"u")return"A";const j=window.localStorage.getItem("cta_variant");if(j==="A"||j==="B")return j;const E=Math.random()>.5?"A":"B";return window.localStorage.setItem("cta_variant",E),E}),d=e.riasec||a||{top1:"Realista",top2:"Investigativo",habilidades:["organizada","comunicativa","logica","criativa","persistente"],habilidade_destaque:"praticas e objetivas",contexto_profissional:"organizar processos e resolver problemas complexos"},m=r.split(" ")[0],f=(((h=e.justification)==null?void 0:h.split(".")[0])||"").trim(),p=((v=d.scores)==null?void 0:v[d.top1])??90,y=((w=d.scores)==null?void 0:w[d.top2])??78,g=d.descricao_personalizada||"Se este recorte gratuito já faz sentido, o plano completo (R$25) destrava salário, cronograma e cargos que combinam com seu estilo.";x.useEffect(()=>{gr("results_viewed",{career:e.careerName})},[e.careerName]),x.useEffect(()=>{gr("cta_variant_assigned",{variant:u})},[u]),x.useEffect(()=>{const j=()=>{const E=window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100;E>60&&window.innerWidth>=768?s(!0):s(!1),E>60&&c(!0)};return window.addEventListener("scroll",j),()=>window.removeEventListener("scroll",j)},[]);const b=()=>{Xz(),window.open("https://wa.me/5591984233672?text=Oi,+vi+meu+resultado+no+teste+e+quero+reivindicar+meu+cupom+de+R$5","_blank")};return i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-destructive/90 to-destructive/70 backdrop-blur-sm shadow-lg",children:i.jsxs("div",{className:"container mx-auto px-4 py-2 flex items-center justify-center gap-2 text-white text-sm md:text-base text-center",children:[i.jsx(ja,{className:"w-4 h-4"}),i.jsx("span",{className:"font-medium",children:"Oferta garantida por 5 minutos (R$25 com pagamento seguro):"}),i.jsx(pA,{initialMinutes:5})]})}),o&&i.jsx("div",{className:"hidden md:block fixed right-4 top-1/2 -translate-y-1/2 z-40 animate-slide-in-right",children:i.jsxs("div",{className:"bg-gradient-to-br from-primary to-accent p-4 rounded-lg shadow-2xl max-w-xs",children:[i.jsx("p",{className:"text-white font-bold text-center mb-3",children:"Desbloqueie seu plano completo!"}),i.jsx(Ka,{userName:r,userEmail:n,quizResponseId:t,amount:25,location:"floating_desktop"})]})}),i.jsx("div",{className:"min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-20 pb-12",children:i.jsxs("div",{className:"container mx-auto px-4 max-w-6xl",children:[i.jsxs("div",{className:"mb-14 animate-fade-in",children:[i.jsxs("div",{className:"text-center mb-8 space-y-3",children:[i.jsx("div",{className:"inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide",children:"diagnóstico gratuito pronto - se isso convence grátis, imagine por R$25"}),i.jsxs("h1",{className:"text-3xl md:text-5xl font-bold leading-tight",children:[m,", seu DNA RIASEC e: ",d.top1," ",i.jsxs("span",{className:"text-primary",children:["+ ",d.top2]})]}),i.jsx("p",{className:"text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed",children:g})]}),i.jsxs("div",{className:"grid gap-4 lg:grid-cols-[1.1fr,1fr]",children:[i.jsx(J,{className:"p-6 bg-card border-2 border-primary/20",children:i.jsxs("div",{className:"flex flex-col gap-3",children:[i.jsxs("div",{className:"flex flex-wrap gap-2 text-xs uppercase font-semibold",children:[i.jsx(Se,{variant:"outline",className:"bg-primary/10 text-primary border-primary/30",children:"perfil hibrido top2"}),i.jsx(Se,{variant:"outline",className:"bg-muted text-foreground",children:"alta correspondencia de respostas"})]}),i.jsxs("div",{className:"space-y-2",children:[i.jsxs("p",{className:"text-xl font-bold",children:["Seu mapa de identidade ",d.top1," com toque ",d.top2]}),i.jsxs("p",{className:"text-sm text-muted-foreground",children:["Densidade de sinais fortes apontou que você rende mais quando combina ",d.habilidade_destaque,"."]})]}),i.jsx("div",{className:"space-y-3",children:[{label:d.top1,value:p,tone:"primary"},{label:d.top2,value:y,tone:"accent"}].map(j=>i.jsxs("div",{className:"space-y-1",children:[i.jsxs("div",{className:"flex items-center justify-between text-sm",children:[i.jsx("span",{className:"font-semibold",children:j.label}),i.jsxs("span",{className:"text-muted-foreground",children:[j.value,"% sinais"]})]}),i.jsx("div",{className:"w-full h-2 rounded-full bg-muted overflow-hidden",children:i.jsx("div",{className:`h-full ${j.tone==="primary"?"bg-primary":"bg-accent"}`,style:{width:`${j.value}%`}})})]},j.label))}),i.jsxs("div",{className:"grid gap-2 sm:grid-cols-2 text-sm",children:[i.jsxs("div",{className:"flex items-start gap-2",children:[i.jsx(kr,{className:"w-4 h-4 text-primary mt-0.5"}),i.jsx("span",{children:e.careerName})]}),i.jsxs("div",{className:"flex items-start gap-2",children:[i.jsx(rn,{className:"w-4 h-4 text-primary mt-0.5"}),i.jsx("span",{children:f||"Roteiro inicial baseado no seu par RIASEC top2."})]})]})]})}),i.jsxs(J,{className:"p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20",children:[i.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[i.jsx(Gh,{className:"w-5 h-5 text-primary"}),i.jsx("h3",{className:"font-bold text-lg",children:"Roteiro imediato (grátis)"})]}),i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[i.jsxs("div",{className:"space-y-2",children:[i.jsx("p",{className:"text-sm font-semibold text-foreground",children:"Forcas principais"}),i.jsx("ul",{className:"space-y-2 text-sm",children:d.habilidades.slice(0,3).map((j,E)=>i.jsxs("li",{className:"flex items-center gap-2",children:[i.jsx(er,{className:"w-4 h-4 text-primary flex-shrink-0"}),i.jsx("span",{className:"capitalize",children:j})]},E))})]}),i.jsxs("div",{className:"space-y-2",children:[i.jsx("p",{className:"text-sm font-semibold text-foreground",children:"Onde você brilha"}),i.jsxs("ul",{className:"space-y-2 text-sm",children:[i.jsxs("li",{className:"flex items-center gap-2",children:[i.jsx(rn,{className:"w-4 h-4 text-primary flex-shrink-0"}),i.jsx("span",{children:d.contexto_profissional})]}),i.jsxs("li",{className:"flex items-center gap-2",children:[i.jsx(rn,{className:"w-4 h-4 text-primary flex-shrink-0"}),i.jsxs("span",{children:["Tarefas que exigem ",d.habilidade_destaque]})]})]})]}),i.jsxs("div",{className:"space-y-2",children:[i.jsx("p",{className:"text-sm font-semibold text-foreground",children:"Evite desperdício"}),i.jsxs("ul",{className:"space-y-2 text-sm",children:[i.jsxs("li",{className:"flex items-center gap-2",children:[i.jsx(Uo,{className:"w-4 h-4 text-destructive flex-shrink-0"}),i.jsx("span",{children:"Funções muito rotineiras ou repetitivas"})]}),i.jsxs("li",{className:"flex items-center gap-2",children:[i.jsx(Uo,{className:"w-4 h-4 text-destructive flex-shrink-0"}),i.jsx("span",{children:"Ambientes que não valorizam sua criatividade"})]})]})]})]}),i.jsx("div",{className:"mt-4 text-xs text-muted-foreground",children:"Este é o aperitivo gratuito. O upgrade entrega salário, cronograma 30/60/90 e cargos mais aderentes ao seu DNA."})]})]}),i.jsx(J,{className:"p-6 mt-6 bg-primary/5 border-2 border-primary/30",children:i.jsx("div",{className:"flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4",children:i.jsxs("div",{className:"space-y-2",children:[i.jsxs("div",{className:"inline-flex items-center gap-2 text-xs uppercase tracking-wide text-primary font-semibold bg-primary/10 border border-primary/30 px-3 py-1 rounded-full",children:[i.jsx(kr,{className:"w-4 h-4"}),"Se isso faz sentido, destrave o resto"]}),i.jsx("p",{className:"text-xl font-bold",children:"Plano completo por R$25"}),i.jsx("p",{className:"text-sm text-muted-foreground max-w-2xl",children:"Veja faixa salarial, probabilidade de edital, cronograma de estudos 30/60/90 e checklist pronto. Garantia de 7 dias."}),i.jsxs("div",{className:"flex flex-wrap gap-2 text-xs text-foreground",children:[i.jsxs(Se,{variant:"outline",className:"bg-white/40 border-primary/30 text-primary inline-flex items-center gap-2",children:[i.jsx(ja,{className:"w-3.5 h-3.5"}),"Pagamento seguro · Mercado Pago + criptografia"]}),i.jsx(Se,{variant:"outline",className:"bg-white/40 border-primary/30 text-primary",children:"Relatorio imediato"}),i.jsx(Se,{variant:"outline",className:"bg-white/40 border-primary/30 text-primary",children:"+ Prova social 4.8/5"})]}),i.jsx(Ka,{userName:r,userEmail:n,quizResponseId:t,amount:25,location:"hero_upgrade"}),i.jsxs("div",{className:"flex items-center gap-2 text-xs text-muted-foreground",children:[i.jsx(ja,{className:"w-4 h-4 text-primary"}),i.jsx(Bd,{className:"w-4 h-4 text-primary"}),i.jsx("span",{children:"Garantia de 7 dias. Sem perguntas."})]})]})})})]}),i.jsxs("div",{className:"mb-12 animate-fade-in",children:[i.jsx("h2",{className:"text-2xl md:text-3xl font-bold text-center mb-8",children:"?? Quem já fez o upgrade, descobriu o caminho certo!"}),i.jsx("div",{className:"grid md:grid-cols-3 gap-6",children:[{name:"Carla Pereira",location:"SP",course:"cursando administração (4º período)",date:"06/11/25",text:"O relatório liberou 'Técnico Administrativo TJ-SP' pra mim. Vi salário, rotina e um plano de 30 dias que fez sentido. Não precisei ficar adivinhando edital."},{name:"Lucas Andrade",location:"MG",course:"formado em direito",date:"21/09/25",text:"Eu tinha medo de estar mirando errado. O upgrade mostrou 'Analista MPU', justificou com meu perfil Investigativo/Social e já trouxe matérias mais cobradas. Paguei 25 e parei de perder tempo."},{name:"Amanda Souza",location:"PE",course:"estudante de enfermagem",date:"11/08/25",text:"Ele indicou 'Enfermeira SAMU Recife' com faixa salarial e frequência de edital. O plano veio mastigado, só segui. Valeu mais que uma pizza."}].map((j,E)=>i.jsxs(J,{className:"p-6 border-2 border-primary/10 animate-fade-in hover:shadow-lg transition-shadow",children:[i.jsx("div",{className:"flex gap-1 mb-3",children:[...Array(5)].map((N,P)=>i.jsx($d,{className:"w-4 h-4 fill-primary text-primary"},P))}),i.jsxs("p",{className:"text-sm text-muted-foreground mb-4 italic leading-relaxed break-words",children:['"',j.text,'"']}),i.jsxs("div",{className:"border-t pt-3",children:[i.jsx("p",{className:"font-bold text-sm",children:j.name}),i.jsxs("p",{className:"text-xs text-muted-foreground",children:[j.location," · ",j.course]}),i.jsx("p",{className:"text-xs text-muted-foreground mt-1",children:j.date})]})]},E))})]}),i.jsx("div",{className:"mb-12 animate-fade-in",children:i.jsxs(J,{className:"p-8 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 border-2 border-amber-500/30",children:[i.jsxs("div",{className:"flex items-center gap-3 mb-6",children:[i.jsx(gN,{className:"w-8 h-8 text-amber-500"}),i.jsx("h2",{className:"text-2xl md:text-3xl font-bold",children:"?? Por que este teste vale R$25?"})]}),i.jsxs("div",{className:"space-y-4 text-muted-foreground leading-relaxed",children:[i.jsx("p",{children:"A maioria dos testes gratuitos mostra apenas seu tipo de personalidade. Este aqui vai além: analisa seu perfil RIASEC e combina com carreiras e concursos que realmente se encaixam no seu estilo de trabalho."}),i.jsx("p",{children:"Você não paga apenas por um resultado — recebe um plano de ação personalizado, um cronograma de estudos e cargos recomendados com base em dados reais do mercado píblico brasileiro."}),i.jsx("p",{className:"font-semibold text-foreground",children:"Por R$25, você economiza tempo, evita estudar para o concurso errado e ganha clareza sobre onde concentrar seus esforços."})]})]})}),i.jsx("div",{className:"mb-12 animate-fade-in",children:i.jsxs(J,{className:"p-8 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-blue-500/10 border-2 border-blue-500/30",children:[i.jsxs("div",{className:"flex items-center gap-3 mb-6",children:[i.jsx(xN,{className:"w-8 h-8 text-blue-500"}),i.jsx("h2",{className:"text-2xl md:text-3xl font-bold",children:"?? O que faz diferente dos outros"})]}),i.jsxs("div",{className:"space-y-4 text-muted-foreground leading-relaxed",children:[i.jsx("p",{children:"Nosso diferencial é que cruzamos seus dados RIASEC com suas preferências de trabalho em concursos píblicos. Isso mostra quais carreiras e cargos píblicos combinam com você e inclui um plano de estudos prático para alcançar seus objetivos."}),i.jsxs("div",{className:"bg-primary/10 rounded-lg p-6 border-l-4 border-primary",children:[i.jsx("p",{className:"font-semibold text-foreground mb-2",children:"?? Contexto do Mercado Brasileiro"}),i.jsxs("p",{children:["No Brasil existem mais de ",i.jsx("span",{className:"font-bold text-foreground",children:"10 mil concursos píblicos"})," realizados todos os anos, em níveis municipal, estadual e federal."]})]}),i.jsx("p",{children:"Escolher o concurso certo, alinhado ao seu perfil, é o que define quem progride rápido e quem desiste no meio do caminho. Nosso sistema analisa o perfil dos cargos que mais se repetem nos concursos com os melhores salários e estabilidade de emprego, indicando caminhos de maior potencial."})]})]})}),i.jsx("div",{className:"mb-12 animate-fade-in",children:i.jsxs(J,{className:"p-8 bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-purple-500/10 border-2 border-purple-500/30",children:[i.jsxs("div",{className:"flex items-center gap-3 mb-6",children:[i.jsx(fN,{className:"w-8 h-8 text-purple-500"}),i.jsx("h2",{className:"text-2xl md:text-3xl font-bold",children:"?? Sobre o método"})]}),i.jsxs("div",{className:"space-y-4 text-muted-foreground leading-relaxed",children:[i.jsx("div",{className:"flex items-center gap-2 mb-4",children:i.jsxs(Se,{className:"bg-green-500/20 text-green-700 border-green-500/30 px-4 py-1.5",children:[i.jsx(Vh,{className:"w-4 h-4 mr-2"}),"Validado Cientificamente"]})}),i.jsxs("p",{children:["O teste é baseado no modelo ",i.jsx("span",{className:"font-bold text-foreground",children:"RIASEC"}),", criado pelo psicólogo John L. Holland (Universidade Johns Hopkins) e usado há décadas por centros de carreira e universidades do mundo todo."]}),i.jsx("p",{children:"O RIASEC identifica seus principais interesses profissionais e mostra onde você tende a ter melhor desempenho."}),i.jsx("p",{className:"font-semibold text-foreground",children:"Nosso sistema aprimora esse método cruzando seus resultados com carreiras píblicas brasileiras e com o perfil dos cargos que mais aparecem nos concursos com os melhores salários e estabilidade de emprego."})]})]})}),i.jsx("div",{className:"mb-12 animate-fade-in",children:i.jsxs(J,{className:"p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30",children:[i.jsxs("div",{className:"text-center mb-8",children:[i.jsx("h2",{className:"text-2xl md:text-3xl font-bold mb-2",children:"?? Diferenciais Exclusivos"}),i.jsx("p",{className:"text-muted-foreground",children:"Recursos ínicos que transformam seu resultado em ação"})]}),i.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",children:[{icon:Vh,title:"Base científica validada",desc:"Método RIASEC internacional"},{icon:rn,title:"Personalizado para BR",desc:"Foco em concursos píblicos"},{icon:Ab,title:"Cruzamento inteligente",desc:"Perfil + oportunidades reais"},{icon:ju,title:"Faixas salariais",desc:"Médias atualizadas do mercado"},{icon:wu,title:"Plano 30/60/90 dias",desc:"Cronograma estruturado"},{icon:Qh,title:"Frequência de editais",desc:"Probabilidade real"},{icon:Gh,title:"Resultado imediato",desc:"Acesso instantâneo"},{icon:Wh,title:"Suporte direto",desc:"WhatsApp disponível"}].map((j,E)=>i.jsxs("div",{className:"flex flex-col items-center text-center p-4 bg-background/50 rounded-lg border border-border hover:shadow-lg transition-all",style:{animationDelay:`${E*50}ms`},children:[i.jsx(j.icon,{className:"w-8 h-8 text-primary mb-3"}),i.jsx("h4",{className:"font-bold text-sm mb-1",children:j.title}),i.jsx("p",{className:"text-xs text-muted-foreground",children:j.desc})]},E))})]})}),i.jsx("div",{className:"mb-12 animate-fade-in",children:i.jsxs(J,{className:"p-8 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-yellow-500/10 border-2 border-yellow-500/30",children:[i.jsxs("div",{className:"flex items-center gap-3 mb-6",children:[i.jsx(mN,{className:"w-8 h-8 text-yellow-600"}),i.jsx("h2",{className:"text-2xl md:text-3xl font-bold",children:"?? Investimento e Benefício"})]}),i.jsxs("div",{className:"space-y-4 text-muted-foreground leading-relaxed",children:[i.jsxs("p",{children:["O teste custa ",i.jsx("span",{className:"font-bold text-foreground text-xl",children:"R$25"}),", um valor simbólico perto do que ele entrega."]}),i.jsx("p",{children:"Foi criado para ser acessível, mas com nível de qualidade profissional."}),i.jsx("p",{className:"font-semibold text-foreground",children:"Em vez de perder tempo com testes genéricos, aqui você recebe uma análise feita sob medida para sua realidade e seu objetivo."}),i.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-3 mt-6 pt-6 border-t",children:[i.jsxs("div",{className:"text-center p-3 bg-background/50 rounded-lg",children:[i.jsx("p",{className:"text-2xl font-bold text-foreground",children:"R$25"}),i.jsx("p",{className:"text-xs",children:"Nosso teste"})]}),i.jsxs("div",{className:"text-center p-3 bg-muted/30 rounded-lg opacity-60",children:[i.jsx("p",{className:"text-2xl font-bold",children:"R$30"}),i.jsx("p",{className:"text-xs",children:"Hambírguer"})]}),i.jsxs("div",{className:"text-center p-3 bg-muted/30 rounded-lg opacity-60",children:[i.jsx("p",{className:"text-2xl font-bold",children:"R$40"}),i.jsx("p",{className:"text-xs",children:"Streaming"})]})]})]})]})}),i.jsx("div",{className:"mb-12 animate-fade-in",children:i.jsxs(J,{className:"p-8 bg-card border-2 border-primary/20",children:[i.jsx("h2",{className:"text-2xl md:text-3xl font-bold text-center mb-8",children:"?? Comparativo com outros testes"}),i.jsx("div",{className:"hidden md:block overflow-x-auto",children:i.jsxs(qw,{children:[i.jsx(Rw,{children:i.jsxs(js,{children:[i.jsx(Ss,{className:"font-bold",children:"Teste"}),i.jsx(Ss,{className:"font-bold",children:"Foco"}),i.jsx(Ss,{className:"font-bold",children:"Resultado Entregue"}),i.jsx(Ss,{className:"font-bold",children:"Personalização"})]})}),i.jsxs(_w,{children:[i.jsxs(js,{className:"opacity-60",children:[i.jsx(Lr,{className:"font-medium",children:"MBTI / 16personalities"}),i.jsx(Lr,{children:"Personalidade"}),i.jsx(Lr,{children:"Tipo psicológico (ex: INTJ, ENFP)"}),i.jsx(Lr,{children:"Genérico, sem plano"})]}),i.jsxs(js,{className:"opacity-60",children:[i.jsx(Lr,{className:"font-medium",children:"GPTs gratuitos"}),i.jsx(Lr,{children:"Curiosidade"}),i.jsx(Lr,{children:"Respostas automáticas sem base científica"}),i.jsx(Lr,{children:"Sem plano de ação"})]}),i.jsxs(js,{className:"bg-primary/10 border-2 border-primary font-bold",children:[i.jsx(Lr,{className:"font-bold text-primary",children:"RIASEC + Concursos (nosso)"}),i.jsx(Lr,{className:"text-primary",children:"Carreira píblica"}),i.jsx(Lr,{className:"text-primary",children:"Cargo ideal + cronograma + plano de ação"}),i.jsx(Lr,{className:"text-primary",children:"Totalmente personalizado"})]})]})]})}),i.jsxs("div",{className:"md:hidden space-y-4",children:[i.jsxs("div",{className:"p-4 bg-muted/30 rounded-lg opacity-60 border",children:[i.jsx("p",{className:"font-bold mb-2",children:"MBTI / 16personalities"}),i.jsxs("div",{className:"text-sm space-y-1",children:[i.jsxs("p",{children:[i.jsx("span",{className:"font-semibold",children:"Foco:"})," Personalidade"]}),i.jsxs("p",{children:[i.jsx("span",{className:"font-semibold",children:"Resultado:"})," Tipo psicológico"]}),i.jsxs("p",{children:[i.jsx("span",{className:"font-semibold",children:"Personalização:"})," Genérico"]})]})]}),i.jsxs("div",{className:"p-4 bg-muted/30 rounded-lg opacity-60 border",children:[i.jsx("p",{className:"font-bold mb-2",children:"GPTs gratuitos"}),i.jsxs("div",{className:"text-sm space-y-1",children:[i.jsxs("p",{children:[i.jsx("span",{className:"font-semibold",children:"Foco:"})," Curiosidade"]}),i.jsxs("p",{children:[i.jsx("span",{className:"font-semibold",children:"Resultado:"})," Respostas automáticas"]}),i.jsxs("p",{children:[i.jsx("span",{className:"font-semibold",children:"Personalização:"})," Sem plano"]})]})]}),i.jsxs("div",{className:"p-4 bg-primary/10 rounded-lg border-2 border-primary",children:[i.jsx("p",{className:"font-bold text-primary mb-2",children:"? RIASEC + Concursos (nosso)"}),i.jsxs("div",{className:"text-sm space-y-1",children:[i.jsxs("p",{children:[i.jsx("span",{className:"font-semibold",children:"Foco:"})," Carreira píblica"]}),i.jsxs("p",{children:[i.jsx("span",{className:"font-semibold",children:"Resultado:"})," Cargo + cronograma + plano"]}),i.jsxs("p",{children:[i.jsx("span",{className:"font-semibold",children:"Personalização:"})," ",i.jsx("span",{className:"text-primary font-bold",children:"Totalmente personalizado"})]})]})]})]})]})}),i.jsx("div",{className:"mb-12 animate-fade-in",children:i.jsxs(J,{className:"p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/30 relative overflow-hidden",children:[i.jsxs("div",{className:"text-center mb-8",children:[i.jsx("h2",{className:"text-2xl md:text-3xl font-bold mb-4",children:"?? Prévia do Relatório Profissional Completo"}),i.jsx("p",{className:"text-muted-foreground max-w-2xl mx-auto",children:"Desbloqueie o Relatório Profissional Completo e transforme este resultado em um plano de ação prático para conquistar seu cargo ideal."})]}),i.jsxs("div",{className:"relative",children:[i.jsx("div",{className:"bg-card border-2 border-border rounded-lg p-8 blur-md select-none pointer-events-none",children:i.jsxs("div",{className:"space-y-6",children:[i.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[i.jsx("div",{className:"w-12 h-12 bg-primary/20 rounded-full"}),i.jsxs("div",{children:[i.jsx("div",{className:"h-4 bg-foreground/20 rounded w-48 mb-2"}),i.jsx("div",{className:"h-3 bg-foreground/10 rounded w-32"})]})]}),i.jsxs("div",{className:"space-y-3",children:[i.jsx("div",{className:"h-6 bg-foreground/20 rounded w-3/4"}),i.jsx("div",{className:"h-4 bg-foreground/10 rounded w-full"}),i.jsx("div",{className:"h-4 bg-foreground/10 rounded w-5/6"})]}),i.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[i.jsx("div",{className:"h-24 bg-foreground/10 rounded"}),i.jsx("div",{className:"h-24 bg-foreground/10 rounded"})]}),i.jsxs("div",{className:"space-y-2",children:[i.jsx("div",{className:"h-4 bg-foreground/10 rounded w-full"}),i.jsx("div",{className:"h-4 bg-foreground/10 rounded w-4/5"}),i.jsx("div",{className:"h-4 bg-foreground/10 rounded w-5/6"})]})]})}),i.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none",children:[i.jsx(ja,{className:"w-16 h-16 text-primary animate-pulse"}),i.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl",children:[i.jsxs(Se,{className:"bg-primary/90 text-primary-foreground px-3 py-2",children:[i.jsx(rn,{className:"w-4 h-4 mr-1"}),"Carreira indicada pela IA"]}),i.jsxs(Se,{className:"bg-primary/90 text-primary-foreground px-3 py-2",children:[i.jsx(ju,{className:"w-4 h-4 mr-1"}),"Faixa salarial completa"]}),i.jsxs(Se,{className:"bg-primary/90 text-primary-foreground px-3 py-2",children:[i.jsx(wu,{className:"w-4 h-4 mr-1"}),"Probabilidade do edital"]}),i.jsxs(Se,{className:"bg-primary/90 text-primary-foreground px-3 py-2",children:[i.jsx(Ql,{className:"w-4 h-4 mr-1"}),"Plano de estudos 30/60/90"]}),i.jsxs(Se,{className:"bg-primary/90 text-primary-foreground px-3 py-2",children:[i.jsx(kr,{className:"w-4 h-4 mr-1"}),"Materiais recomendados"]}),i.jsxs(Se,{className:"bg-primary/90 text-primary-foreground px-3 py-2",children:[i.jsx(er,{className:"w-4 h-4 mr-1"}),"Checklist completo"]})]})]})]})]})}),i.jsx("div",{className:"mb-12 animate-fade-in",children:i.jsxs(J,{className:"p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-2 border-primary/30",children:[i.jsxs("div",{className:"text-center mb-8 space-y-2",children:[i.jsx("h2",{className:"text-2xl md:text-4xl font-bold",children:"Desbloqueie o plano completo por R$25"}),i.jsx("p",{className:"text-lg text-muted-foreground",children:"Menos que 1 mês de cursinho (R$150+) e com garantia de satisfação."}),i.jsxs("div",{className:"inline-flex items-center gap-2 text-xs uppercase tracking-wide text-primary font-semibold bg-primary/10 border border-primary/30 px-3 py-1 rounded-full",children:[i.jsx(kr,{className:"w-4 h-4"}),"Bonus: checklist de edital + mini plano imediato"]})]}),i.jsx("div",{className:"grid md:grid-cols-2 gap-4 mb-8",children:[{icon:rn,text:"Cargo recomendado e justificativa do seu perfil"},{icon:ju,text:"Faixa salarial inicial e com progressão"},{icon:wu,text:"Probabilidade do próximo edital"},{icon:Ql,text:"Plano de estudos 30/60/90 dias"},{icon:kr,text:"Materiais práticos e checklist"},{icon:Qh,text:"Acesso imediato ao Relatório"}].map((j,E)=>i.jsxs("div",{className:"flex items-start gap-3 p-3 bg-background/50 rounded-lg",children:[i.jsx(j.icon,{className:"w-5 h-5 text-primary flex-shrink-0 mt-1"}),i.jsx("span",{className:"text-sm font-medium",children:j.text})]},E))}),i.jsxs("div",{className:"bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-6 mb-6 text-center border-2 border-amber-500/20 space-y-3",children:[i.jsxs("p",{className:"text-4xl font-bold text-amber-600",children:["R$ 25",i.jsx("span",{className:"text-xl",children:",00"})]}),i.jsx("p",{className:"text-sm text-muted-foreground",children:"(pagamento unico · acesso imediato)"}),i.jsxs("div",{className:"inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-bold",children:[i.jsx(Bd,{className:"w-4 h-4"}),"Garantia 7 dias ou seu dinheiro de volta"]}),i.jsx("div",{className:"text-sm text-foreground font-semibold",children:"referência: cursinho 1 mês custa R$150+ — aqui você paga 6x menos"})]}),i.jsxs("div",{className:"grid lg:grid-cols-[2fr,1fr] gap-6 items-center",children:[i.jsxs("div",{className:"space-y-3",children:[i.jsxs("div",{className:"flex items-center gap-3 text-sm text-muted-foreground",children:[i.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold",children:[i.jsx($d,{className:"w-4 h-4"}),"4.8/5 por 1.240 concurseiros"]}),i.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold",children:[i.jsx(Wh,{className:"w-4 h-4"}),"Pagamento seguro · selo Mercado Pago"]})]}),i.jsxs("div",{className:"flex flex-col sm:flex-row gap-3 text-sm",children:[i.jsxs("div",{className:"flex-1 rounded-lg border bg-background/60 p-3",children:[i.jsxs("div",{className:"flex items-center gap-2 text-primary font-semibold text-xs",children:[i.jsx(kr,{className:"w-4 h-4"})," Tamires, aprovada em pre-análise"]}),i.jsx("p",{className:"text-muted-foreground mt-1",children:'"Paguei os 25 e recebi um passo a passo de estudo sem enrolação."'})]}),i.jsxs("div",{className:"flex-1 rounded-lg border bg-background/60 p-3",children:[i.jsxs("div",{className:"flex items-center gap-2 text-primary font-semibold text-xs",children:[i.jsx(kr,{className:"w-4 h-4"})," Diego, PF administrativa"]}),i.jsx("p",{className:"text-muted-foreground mt-1",children:'"Valeu mais que 1 mês de cursinho. Checklist e cronograma em minutos."'})]})]})]}),i.jsxs("div",{className:"space-y-3",children:[i.jsx(Ka,{userName:r,userEmail:n,quizResponseId:t,amount:25,location:"main_offer"}),i.jsx("p",{className:"text-xs text-muted-foreground text-center",children:"Pix, cartao ou saldo Mercado Pago · conexão segura com criptografia."})]})]})]})}),l&&i.jsx("div",{className:"mb-12 animate-fade-in",children:i.jsx(J,{className:"p-6 bg-gradient-to-r from-primary to-accent text-primary-foreground",children:i.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-between gap-4",children:[i.jsxs("div",{children:[i.jsx("p",{className:"text-xl font-bold mb-1",children:"Ainda não desbloqueou seu plano?"}),i.jsx("p",{className:"text-sm opacity-90",children:"Oferta de R$25 ativa por tempo limitado, com garantia de 7 dias."})]}),i.jsx(Ka,{userName:r,userEmail:n,quizResponseId:t,amount:25,location:"scroll_banner"})]})})}),i.jsx("div",{className:"mb-12 animate-fade-in",children:i.jsxs(J,{className:"p-8 bg-card",children:[i.jsx("h2",{className:"text-2xl font-bold text-center mb-8",children:"? Perguntas Frequentes"}),i.jsxs(RA,{type:"single",collapsible:!0,className:"w-full",children:[i.jsxs(ha,{value:"item-1",children:[i.jsx(ga,{className:"text-left",children:i.jsxs("span",{className:"flex items-center gap-2",children:[i.jsx(Rn,{className:"w-5 h-5 text-primary"}),"Por que pagar R$25 se há testes gratuitos?"]})}),i.jsx(va,{children:"Porque aqui você recebe um plano de ação prático e cargos reais do serviço público que combinam com você. Não é só teoria — é um caminho completo com cronograma de estudos e materiais específicos."})]}),i.jsxs(ha,{value:"item-2",children:[i.jsx(ga,{className:"text-left",children:i.jsxs("span",{className:"flex items-center gap-2",children:[i.jsx(Rn,{className:"w-5 h-5 text-primary"}),"O método e confiavel?"]})}),i.jsx(va,{children:"Sim. Baseado na teoria RIASEC, criada por John L. Holland e usada em universidades e orgaos de RH no mundo todo há decadas. Nosso diferencial e adaptar isso para o mercado de concursos públicos brasileiros."})]}),i.jsxs(ha,{value:"item-3",children:[i.jsx(ga,{className:"text-left",children:i.jsxs("span",{className:"flex items-center gap-2",children:[i.jsx(Rn,{className:"w-5 h-5 text-primary"}),"Recebo o resultado na hora?"]})}),i.jsx(va,{children:"Sim. O relatório completo é liberado automaticamente logo após a confirmação do pagamento."})]}),i.jsxs(ha,{value:"item-4",children:[i.jsx(ga,{className:"text-left",children:i.jsxs("span",{className:"flex items-center gap-2",children:[i.jsx(Rn,{className:"w-5 h-5 text-primary"}),"Posso acessar depois?"]})}),i.jsx(va,{children:"Sim, você pode baixar o relatório e consultar quando quiser. Recomendamos salvar uma cópia."})]}),i.jsxs(ha,{value:"item-5",children:[i.jsx(ga,{className:"text-left",children:i.jsxs("span",{className:"flex items-center gap-2",children:[i.jsx(Rn,{className:"w-5 h-5 text-primary"}),"Isso e melhor que teste gratuito?"]})}),i.jsx(va,{children:"Sim, aqui você recebe um plano real de ação baseado no seu perfil específico, não apenas um tipo de personalidade genérico."})]}),i.jsxs(ha,{value:"item-6",children:[i.jsx(ga,{className:"text-left",children:i.jsxs("span",{className:"flex items-center gap-2",children:[i.jsx(Rn,{className:"w-5 h-5 text-primary"}),"E meus dados?"]})}),i.jsx(va,{children:"Usamos apenas para gerar e entregar seu relatório. Pagamento processado pelo Mercado Pago e você pode solicitar remoção a qualquer momento (LGPD)."})]})]})]})}),i.jsx("div",{className:"mb-12 animate-fade-in",children:i.jsxs(J,{className:"p-8 bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-2 border-green-500/20 text-center",children:[i.jsx("h3",{className:"text-xl font-bold mb-4",children:"Prefere conversar antes?"}),i.jsx("p",{className:"text-muted-foreground mb-6",children:"Fale comigo no WhatsApp e ganhe um cupom exclusivo de R$5 OFF!"}),i.jsxs(ge,{onClick:b,size:"lg",variant:"outline",className:"w-full md:w-auto bg-green-500 hover:bg-green-600 text-white border-none mb-4",children:[i.jsx(Rn,{className:"mr-2 w-5 h-5"}),"Prefiro pensar depois"]}),i.jsx("p",{className:"text-xs text-destructive font-semibold",children:"? Cupom válido por 24h, após isso o desconto expira."})]})}),i.jsx("div",{className:"mb-12 animate-fade-in",children:i.jsx(J,{className:"p-6 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 border border-blue-500/20",children:i.jsxs("div",{className:"flex items-center justify-between gap-4 flex-wrap",children:[i.jsxs("div",{className:"flex items-center gap-3",children:[i.jsx(hN,{className:"w-6 h-6 text-blue-500 flex-shrink-0"}),i.jsxs("div",{children:[i.jsx("p",{className:"font-bold text-sm md:text-base",children:"?? Comparativo Internacional"}),i.jsxs("p",{className:"text-xs md:text-sm text-muted-foreground",children:["Testes internacionais RIASEC custam US$20 (~R$110). O nosso: ",i.jsx("span",{className:"font-bold text-primary",children:"R$25"})]})]})]}),i.jsx("div",{className:"flex items-center gap-2 text-sm",children:i.jsx(Se,{variant:"outline",className:"bg-primary/10 text-primary border-primary/30",children:"4x mais barato"})})]})})}),i.jsx("div",{className:"mb-12 animate-fade-in",children:i.jsxs(J,{className:"p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary text-center",children:[i.jsx("h2",{className:"text-2xl md:text-3xl font-bold mb-4",children:"?? Seu futuro começa com uma decisão de R$25"}),i.jsx("p",{className:"text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto",children:"Você já deu o primeiro passo fazendo este teste. Agora é hora de transformar esse resultado em um plano de ação concreto."}),i.jsx(Ka,{userName:r,userEmail:n,quizResponseId:t,amount:25,location:"final_cta"}),i.jsx("p",{className:"text-sm text-muted-foreground mt-4",children:"? Junte-se a centenas de pessoas que já descobriram seu caminho!"})]})})]})}),i.jsx("div",{className:"md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-primary to-accent p-4 pb-[calc(env(safe-area-inset-bottom,0px)+16px)] shadow-2xl",children:i.jsx(Ka,{userName:r,userEmail:n,quizResponseId:t,amount:25,location:"sticky_mobile"})}),i.jsx(Ci,{})]})},MA=({onRetry:e})=>i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center py-8",children:i.jsx("div",{className:"container mx-auto px-4 max-w-md",children:i.jsxs(J,{className:"p-8 shadow-[var(--shadow-elevated)] text-center",children:[i.jsx("div",{className:"text-6xl mb-4",children:"😅"}),i.jsx("h2",{className:"text-2xl font-bold mb-3",children:"Ops! Algo deu errado..."}),i.jsx("p",{className:"text-muted-foreground mb-6",children:"Nossa IA está sobrecarregada agora (muita gente fazendo o quiz!). Mas não se preocupe, seus dados estão salvos."}),i.jsxs("div",{className:"space-y-3",children:[i.jsxs(ge,{onClick:e,size:"lg",className:"w-full bg-gradient-to-r from-primary to-accent",children:[i.jsx(vN,{className:"w-5 h-5 mr-2"}),"Tentar Novamente"]}),i.jsx(ge,{variant:"outline",size:"lg",className:"w-full",asChild:!0,children:i.jsxs("a",{href:"https://wa.me/5591984233672?text=Tive%20um%20problema%20ao%20gerar%20minha%20recomenda%C3%A7%C3%A3o%20de%20carreira",target:"_blank",rel:"noopener noreferrer",children:[i.jsx(Rn,{className:"w-5 h-5 mr-2"}),"Falar com Suporte (WhatsApp)"]})})]}),i.jsx("p",{className:"text-xs text-muted-foreground mt-6",children:"Geralmente resolve em segundos. Se persistir, te respondo no WhatsApp rapidinho!"})]})})}),i.jsx(Ci,{})]}),Xa="home_variant",Xi=e=>{if(!e)return null;const r=e.trim().toUpperCase();return r==="A"||r==="B"?r:null},LA=()=>{const[e]=Q0(),[r,n]=x.useState("landing"),[t,a]=x.useState([]),[o,s]=x.useState(null),[l,c]=x.useState(null),[u,d]=x.useState(""),[m,f]=x.useState(""),[p,y]=x.useState(),[g,b]=x.useState(()=>{if(typeof window>"u")return"A";const k=Xi(new URLSearchParams(window.location.search).get("ab"));if(k)return window.localStorage.setItem(Xa,k),k;const z=Xi(window.localStorage.getItem(Xa));if(z)return z;const A=Math.random()<.5?"A":"B";return window.localStorage.setItem(Xa,A),A}),h=x.useRef(!1);x.useEffect(()=>{if(typeof window>"u")return;const k=Xi(e.get("ab"));if(k){window.localStorage.setItem(Xa,k),b(k);return}const z=Xi(window.localStorage.getItem(Xa));if(z){b(z);return}const A=Math.random()<.5?"A":"B";window.localStorage.setItem(Xa,A),b(A)},[e]),x.useEffect(()=>{Wz({home_variant:g}),gr("home_variant_assigned",{variant:g})},[g]),x.useEffect(()=>{r==="landing"&&(h.current||(gr("home_viewed",{variant:g}),h.current=!0))},[r,g]);const v=()=>{gr("quiz_start_clicked"),n("preparation")},w=()=>{gr("quiz_preparation_completed"),n("quiz")},j=(k,z)=>{a(k),c(z),gr("email_form_viewed"),n("email")},E=async(k,z)=>{const A=z.trim().toLowerCase(),I=k.trim().length>=2?k.trim():"Concurseiro",_=l||hm(t.reduce((V,L,U)=>{var R;const Q=L.id||((R=Br[U])==null?void 0:R.id)||`q${U}`;return V[Q]=L.answer,V},{}),Br);if(!A){hl.error("Informe um email valido."),n("email");return}d(I),f(A),gr("email_captured",{home_variant:Gp()});try{const L=await fetch("/api/generate-career-recommendation",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({answers:t,name:I,email:A,riasec:_,whatsapp:""})});if(!L.ok){const R=await L.text();throw new Error(`Erro ao salvar recomendacao: ${R}`)}const U=await L.json(),Q={careerName:`Plano recomendado para perfil ${_.top1}`,justification:"Baseado nas suas respostas RIASEC.",salary:"Em definicao",examDate:"Em definicao",workplaces:[],workRoutine:"Plano inicial alinhado ao seu perfil.",subjects:[],examFrequency:"Em definicao",riasec:_};s(Q),y(U==null?void 0:U.id);try{await fetch("/api/send-welcome-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userName:I,userEmail:A})}),console.log("Welcome email sent successfully")}catch(R){console.error("Error sending welcome email:",R)}n("results"),hl.success("Resultado gerado com sucesso!")}catch(V){console.error("Error generating recommendation:",V);const L=_||hm(t.reduce((Q,R,q)=>{var S;const O=R.id||((S=Br[q])==null?void 0:S.id)||`q${q}`;return Q[O]=R.answer,Q},{}),Br),U={careerName:`Plano recomendado para perfil ${L.top1}`,justification:"Baseado nas suas respostas, criamos um plano preliminar enquanto geramos o relatorio completo.",salary:"Em definicao",examDate:"Em definicao",workplaces:[],workRoutine:"Rotina flexivel alinhada ao seu perfil.",subjects:[],examFrequency:"Em definicao",riasec:L};s(U),y(void 0),n("results"),hl.warning("Nao conseguimos gerar o relatorio completo agora. Mostramos um resultado parcial.")}},N=()=>{n("landing")},P=async()=>{n("email"),u&&m&&await E(u,m)};return i.jsxs(i.Fragment,{children:[r==="landing"&&i.jsx($z,{onStart:v,variant:g}),r==="preparation"&&i.jsx(Uz,{onStart:w}),r==="quiz"&&i.jsx(tA,{onComplete:j,onBack:N}),r==="email"&&i.jsx(dA,{onSubmit:E}),r==="error"&&i.jsx(MA,{onRetry:P}),r==="results"&&o&&i.jsx(IA,{recommendation:o,userName:u,userEmail:m,quizResponseId:p,riasecFallback:l||void 0})]})},FA=()=>{const[e]=Q0(),r=Qp(),[n,t]=x.useState(!0),[a,o]=x.useState(null),[s,l]=x.useState(""),[c,u]=x.useState("");if(x.useEffect(()=>{const p=e.get("payment_id")||"simulado",y={studyPlan:{days:[],hoursPerDay:"2h",focus:"Início rápido"},alternativeCareers:[],studyRoadmap:"Plano será enviado por e-mail.",freeMaterials:[],whatsappGroupInfo:"",whatsappSupportNumber:"5591984233672"};l("Usuário"),o(y),Gz(p,25,{home_variant:Gp()}),hl.success("Pagamento confirmado!"),t(!1)},[e]),n)return i.jsx("div",{className:"min-h-screen flex items-center justify-center",children:i.jsxs("div",{className:"text-center",children:[i.jsx($o,{className:"w-12 h-12 animate-spin mx-auto mb-4 text-primary"}),i.jsx("p",{className:"text-lg text-muted-foreground",children:"Verificando pagamento..."})]})});if(c)return i.jsx("div",{className:"min-h-screen flex items-center justify-center",children:i.jsxs("div",{className:"text-center",children:[i.jsx("p",{className:"text-lg text-destructive mb-4",children:c}),i.jsx(ge,{onClick:()=>r("/"),children:"Voltar ao Início"})]})});if(!a)return null;const d=()=>{gr("whatsapp_contact_clicked",{source:"paid_content_page"}),typeof window<"u"&&window.fbq&&window.fbq("track","Contact",{content_name:"WhatsApp Support - Post Purchase"})},m=p=>p.replace("55","").replace(/(\d{2})(\d{5})(\d{4})/,"($1) $2-$3"),f=encodeURIComponent("Olá! Acabei de fazer o pagamento do Pacote Completo de Preparação e gostaria de receber meu acesso.");return i.jsx("div",{className:"min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4",children:i.jsxs("div",{className:"container mx-auto max-w-2xl",children:[i.jsxs("div",{className:"text-center mb-8 animate-fade-in",children:[i.jsx("div",{className:"inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-green-600 mb-6 shadow-lg animate-bounce-slow",children:i.jsx(er,{className:"w-12 h-12 text-white"})}),i.jsx("h1",{className:"text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent",children:"Pagamento confirmado!"}),i.jsxs("p",{className:"text-xl text-gray-600 dark:text-gray-400",children:["Olá, ",i.jsx("strong",{children:s.split(" ")[0]}),"! Seu investimento foi processado com sucesso."]})]}),i.jsx(J,{className:"p-8 shadow-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-2 border-green-500",children:i.jsxs("div",{className:"text-center",children:[i.jsx("div",{className:"inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-4 animate-pulse",children:i.jsx(Rn,{className:"w-8 h-8 text-white"})}),i.jsx("h2",{className:"text-2xl font-bold mb-2 text-green-900 dark:text-green-100",children:"Próximo passo: receba seu material"}),i.jsx("p",{className:"text-lg font-semibold mb-6 text-green-800 dark:text-green-200",children:"Entre em contato agora para liberar seu acesso"}),i.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 border-2 border-green-300 dark:border-green-700",children:[i.jsxs("p",{className:"text-base text-gray-700 dark:text-gray-300 mb-3",children:[i.jsx("strong",{children:"IMPORTANTE:"})," Clique no botão abaixo e me envie uma mensagem no WhatsApp dizendo:"]}),i.jsx("div",{className:"bg-green-50 dark:bg-green-900/30 rounded-lg p-4 my-4 border-l-4 border-green-500",children:i.jsx("p",{className:"text-sm italic text-gray-600 dark:text-gray-400",children:'"Olá! Acabei de fazer o pagamento do Pacote Completo de Preparação e gostaria de receber meu acesso."'})}),i.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:["Vou te enviar todo o material em até ",i.jsx("strong",{className:"text-green-600 dark:text-green-400",children:"10 minutos"}),"!"]})]}),i.jsx("a",{href:`https://wa.me/${a.whatsappSupportNumber}?text=${f}`,target:"_blank",rel:"noopener noreferrer",onClick:d,className:"block",children:i.jsxs(ge,{size:"lg",className:"w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105",children:[i.jsx(Rn,{className:"mr-2 w-6 h-6"}),"Falar comigo agora: ",m(a.whatsappSupportNumber)]})}),i.jsx("p",{className:"text-xs text-gray-500 dark:text-gray-400 mt-4",children:"Atendimento imediato • Entrega em até 10 minutos"})]})}),i.jsx("div",{className:"mt-8 text-center",children:i.jsxs("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:["Confirmação enviada para: ",i.jsx("strong",{children:s})]})})]})})},DA=()=>i.jsx("div",{className:"min-h-screen flex items-center justify-center px-4",children:i.jsxs("div",{className:"max-w-md w-full bg-card border rounded-lg p-8 text-center space-y-4",children:[i.jsx("h1",{className:"text-2xl font-bold",children:"Pagamentos"}),i.jsx("p",{className:"text-muted-foreground",children:"Gestão de pagamentos removida. Para reativar, crie APIs próprias na Vercel e conecte um banco de dados/MP conforme necessidade."})]})}),BA=()=>i.jsx("div",{className:"min-h-screen flex items-center justify-center px-4",children:i.jsxs("div",{className:"max-w-md w-full bg-card border rounded-lg p-8 text-center space-y-4",children:[i.jsx("h1",{className:"text-2xl font-bold",children:"Usuários"}),i.jsx("p",{className:"text-muted-foreground",children:"Painel admin removido junto com Supabase. Implante um backend próprio (ex.: Vercel + banco) para listar usuários."})]})}),$A=()=>i.jsx("div",{className:"min-h-screen flex items-center justify-center px-4",children:i.jsxs("div",{className:"max-w-md w-full bg-card border rounded-lg p-8 text-center space-y-4",children:[i.jsx("h1",{className:"text-2xl font-bold",children:"Analytics"}),i.jsx("p",{className:"text-muted-foreground",children:"Dashboard de analytics desativado após remoção do Supabase. Suba um backend próprio e aponte o front para novas APIs se quiser reativar esta área."})]})});function UA(e,[r,n]){return Math.min(n,Math.max(r,e))}function VA(e,r){return x.useReducer((n,t)=>r[n][t]??n,e)}var tf="ScrollArea",[Ow,x3]=sa(tf),[HA,ln]=Ow(tf),Iw=x.forwardRef((e,r)=>{const{__scopeScrollArea:n,type:t="hover",dir:a,scrollHideDelay:o=600,...s}=e,[l,c]=x.useState(null),[u,d]=x.useState(null),[m,f]=x.useState(null),[p,y]=x.useState(null),[g,b]=x.useState(null),[h,v]=x.useState(0),[w,j]=x.useState(0),[E,N]=x.useState(!1),[P,k]=x.useState(!1),z=Be(r,I=>c(I)),A=xw(a);return i.jsx(HA,{scope:n,type:t,dir:A,scrollHideDelay:o,scrollArea:l,viewport:u,onViewportChange:d,content:m,onContentChange:f,scrollbarX:p,onScrollbarXChange:y,scrollbarXEnabled:E,onScrollbarXEnabledChange:N,scrollbarY:g,onScrollbarYChange:b,scrollbarYEnabled:P,onScrollbarYEnabledChange:k,onCornerWidthChange:v,onCornerHeightChange:j,children:i.jsx(we.div,{dir:A,...s,ref:z,style:{position:"relative","--radix-scroll-area-corner-width":h+"px","--radix-scroll-area-corner-height":w+"px",...e.style}})})});Iw.displayName=tf;var Mw="ScrollAreaViewport",Lw=x.forwardRef((e,r)=>{const{__scopeScrollArea:n,children:t,nonce:a,...o}=e,s=ln(Mw,n),l=x.useRef(null),c=Be(r,l,s.onViewportChange);return i.jsxs(i.Fragment,{children:[i.jsx("style",{dangerouslySetInnerHTML:{__html:"[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"},nonce:a}),i.jsx(we.div,{"data-radix-scroll-area-viewport":"",...o,ref:c,style:{overflowX:s.scrollbarXEnabled?"scroll":"hidden",overflowY:s.scrollbarYEnabled?"scroll":"hidden",...e.style},children:i.jsx("div",{ref:s.onContentChange,style:{minWidth:"100%",display:"table"},children:t})})]})});Lw.displayName=Mw;var Wn="ScrollAreaScrollbar",af=x.forwardRef((e,r)=>{const{forceMount:n,...t}=e,a=ln(Wn,e.__scopeScrollArea),{onScrollbarXEnabledChange:o,onScrollbarYEnabledChange:s}=a,l=e.orientation==="horizontal";return x.useEffect(()=>(l?o(!0):s(!0),()=>{l?o(!1):s(!1)}),[l,o,s]),a.type==="hover"?i.jsx(QA,{...t,ref:r,forceMount:n}):a.type==="scroll"?i.jsx(WA,{...t,ref:r,forceMount:n}):a.type==="auto"?i.jsx(Fw,{...t,ref:r,forceMount:n}):a.type==="always"?i.jsx(of,{...t,ref:r}):null});af.displayName=Wn;var QA=x.forwardRef((e,r)=>{const{forceMount:n,...t}=e,a=ln(Wn,e.__scopeScrollArea),[o,s]=x.useState(!1);return x.useEffect(()=>{const l=a.scrollArea;let c=0;if(l){const u=()=>{window.clearTimeout(c),s(!0)},d=()=>{c=window.setTimeout(()=>s(!1),a.scrollHideDelay)};return l.addEventListener("pointerenter",u),l.addEventListener("pointerleave",d),()=>{window.clearTimeout(c),l.removeEventListener("pointerenter",u),l.removeEventListener("pointerleave",d)}}},[a.scrollArea,a.scrollHideDelay]),i.jsx(pt,{present:n||o,children:i.jsx(Fw,{"data-state":o?"visible":"hidden",...t,ref:r})})}),WA=x.forwardRef((e,r)=>{const{forceMount:n,...t}=e,a=ln(Wn,e.__scopeScrollArea),o=e.orientation==="horizontal",s=Mc(()=>c("SCROLL_END"),100),[l,c]=VA("hidden",{hidden:{SCROLL:"scrolling"},scrolling:{SCROLL_END:"idle",POINTER_ENTER:"interacting"},interacting:{SCROLL:"interacting",POINTER_LEAVE:"idle"},idle:{HIDE:"hidden",SCROLL:"scrolling",POINTER_ENTER:"interacting"}});return x.useEffect(()=>{if(l==="idle"){const u=window.setTimeout(()=>c("HIDE"),a.scrollHideDelay);return()=>window.clearTimeout(u)}},[l,a.scrollHideDelay,c]),x.useEffect(()=>{const u=a.viewport,d=o?"scrollLeft":"scrollTop";if(u){let m=u[d];const f=()=>{const p=u[d];m!==p&&(c("SCROLL"),s()),m=p};return u.addEventListener("scroll",f),()=>u.removeEventListener("scroll",f)}},[a.viewport,o,c,s]),i.jsx(pt,{present:n||l!=="hidden",children:i.jsx(of,{"data-state":l==="hidden"?"hidden":"visible",...t,ref:r,onPointerEnter:xe(e.onPointerEnter,()=>c("POINTER_ENTER")),onPointerLeave:xe(e.onPointerLeave,()=>c("POINTER_LEAVE"))})})}),Fw=x.forwardRef((e,r)=>{const n=ln(Wn,e.__scopeScrollArea),{forceMount:t,...a}=e,[o,s]=x.useState(!1),l=e.orientation==="horizontal",c=Mc(()=>{if(n.viewport){const u=n.viewport.offsetWidth<n.viewport.scrollWidth,d=n.viewport.offsetHeight<n.viewport.scrollHeight;s(l?u:d)}},10);return Qo(n.viewport,c),Qo(n.content,c),i.jsx(pt,{present:t||o,children:i.jsx(of,{"data-state":o?"visible":"hidden",...a,ref:r})})}),of=x.forwardRef((e,r)=>{const{orientation:n="vertical",...t}=e,a=ln(Wn,e.__scopeScrollArea),o=x.useRef(null),s=x.useRef(0),[l,c]=x.useState({content:0,viewport:0,scrollbar:{size:0,paddingStart:0,paddingEnd:0}}),u=Vw(l.viewport,l.content),d={...t,sizes:l,onSizesChange:c,hasThumb:u>0&&u<1,onThumbChange:f=>o.current=f,onThumbPointerUp:()=>s.current=0,onThumbPointerDown:f=>s.current=f};function m(f,p){return ZA(f,s.current,l,p)}return n==="horizontal"?i.jsx(GA,{...d,ref:r,onThumbPositionChange:()=>{if(a.viewport&&o.current){const f=a.viewport.scrollLeft,p=Og(f,l,a.dir);o.current.style.transform=`translate3d(${p}px, 0, 0)`}},onWheelScroll:f=>{a.viewport&&(a.viewport.scrollLeft=f)},onDragScroll:f=>{a.viewport&&(a.viewport.scrollLeft=m(f,a.dir))}}):n==="vertical"?i.jsx(YA,{...d,ref:r,onThumbPositionChange:()=>{if(a.viewport&&o.current){const f=a.viewport.scrollTop,p=Og(f,l);o.current.style.transform=`translate3d(0, ${p}px, 0)`}},onWheelScroll:f=>{a.viewport&&(a.viewport.scrollTop=f)},onDragScroll:f=>{a.viewport&&(a.viewport.scrollTop=m(f))}}):null}),GA=x.forwardRef((e,r)=>{const{sizes:n,onSizesChange:t,...a}=e,o=ln(Wn,e.__scopeScrollArea),[s,l]=x.useState(),c=x.useRef(null),u=Be(r,c,o.onScrollbarXChange);return x.useEffect(()=>{c.current&&l(getComputedStyle(c.current))},[c]),i.jsx(Bw,{"data-orientation":"horizontal",...a,ref:u,sizes:n,style:{bottom:0,left:o.dir==="rtl"?"var(--radix-scroll-area-corner-width)":0,right:o.dir==="ltr"?"var(--radix-scroll-area-corner-width)":0,"--radix-scroll-area-thumb-width":Ic(n)+"px",...e.style},onThumbPointerDown:d=>e.onThumbPointerDown(d.x),onDragScroll:d=>e.onDragScroll(d.x),onWheelScroll:(d,m)=>{if(o.viewport){const f=o.viewport.scrollLeft+d.deltaX;e.onWheelScroll(f),Qw(f,m)&&d.preventDefault()}},onResize:()=>{c.current&&o.viewport&&s&&t({content:o.viewport.scrollWidth,viewport:o.viewport.offsetWidth,scrollbar:{size:c.current.clientWidth,paddingStart:ac(s.paddingLeft),paddingEnd:ac(s.paddingRight)}})}})}),YA=x.forwardRef((e,r)=>{const{sizes:n,onSizesChange:t,...a}=e,o=ln(Wn,e.__scopeScrollArea),[s,l]=x.useState(),c=x.useRef(null),u=Be(r,c,o.onScrollbarYChange);return x.useEffect(()=>{c.current&&l(getComputedStyle(c.current))},[c]),i.jsx(Bw,{"data-orientation":"vertical",...a,ref:u,sizes:n,style:{top:0,right:o.dir==="ltr"?0:void 0,left:o.dir==="rtl"?0:void 0,bottom:"var(--radix-scroll-area-corner-height)","--radix-scroll-area-thumb-height":Ic(n)+"px",...e.style},onThumbPointerDown:d=>e.onThumbPointerDown(d.y),onDragScroll:d=>e.onDragScroll(d.y),onWheelScroll:(d,m)=>{if(o.viewport){const f=o.viewport.scrollTop+d.deltaY;e.onWheelScroll(f),Qw(f,m)&&d.preventDefault()}},onResize:()=>{c.current&&o.viewport&&s&&t({content:o.viewport.scrollHeight,viewport:o.viewport.offsetHeight,scrollbar:{size:c.current.clientHeight,paddingStart:ac(s.paddingTop),paddingEnd:ac(s.paddingBottom)}})}})}),[KA,Dw]=Ow(Wn),Bw=x.forwardRef((e,r)=>{const{__scopeScrollArea:n,sizes:t,hasThumb:a,onThumbChange:o,onThumbPointerUp:s,onThumbPointerDown:l,onThumbPositionChange:c,onDragScroll:u,onWheelScroll:d,onResize:m,...f}=e,p=ln(Wn,n),[y,g]=x.useState(null),b=Be(r,z=>g(z)),h=x.useRef(null),v=x.useRef(""),w=p.viewport,j=t.content-t.viewport,E=vr(d),N=vr(c),P=Mc(m,10);function k(z){if(h.current){const A=z.clientX-h.current.left,I=z.clientY-h.current.top;u({x:A,y:I})}}return x.useEffect(()=>{const z=A=>{const I=A.target;(y==null?void 0:y.contains(I))&&E(A,j)};return document.addEventListener("wheel",z,{passive:!1}),()=>document.removeEventListener("wheel",z,{passive:!1})},[w,y,j,E]),x.useEffect(N,[t,N]),Qo(y,P),Qo(p.content,P),i.jsx(KA,{scope:n,scrollbar:y,hasThumb:a,onThumbChange:vr(o),onThumbPointerUp:vr(s),onThumbPositionChange:N,onThumbPointerDown:vr(l),children:i.jsx(we.div,{...f,ref:b,style:{position:"absolute",...f.style},onPointerDown:xe(e.onPointerDown,z=>{z.button===0&&(z.target.setPointerCapture(z.pointerId),h.current=y.getBoundingClientRect(),v.current=document.body.style.webkitUserSelect,document.body.style.webkitUserSelect="none",p.viewport&&(p.viewport.style.scrollBehavior="auto"),k(z))}),onPointerMove:xe(e.onPointerMove,k),onPointerUp:xe(e.onPointerUp,z=>{const A=z.target;A.hasPointerCapture(z.pointerId)&&A.releasePointerCapture(z.pointerId),document.body.style.webkitUserSelect=v.current,p.viewport&&(p.viewport.style.scrollBehavior=""),h.current=null})})})}),tc="ScrollAreaThumb",$w=x.forwardRef((e,r)=>{const{forceMount:n,...t}=e,a=Dw(tc,e.__scopeScrollArea);return i.jsx(pt,{present:n||a.hasThumb,children:i.jsx(XA,{ref:r,...t})})}),XA=x.forwardRef((e,r)=>{const{__scopeScrollArea:n,style:t,...a}=e,o=ln(tc,n),s=Dw(tc,n),{onThumbPositionChange:l}=s,c=Be(r,m=>s.onThumbChange(m)),u=x.useRef(void 0),d=Mc(()=>{u.current&&(u.current(),u.current=void 0)},100);return x.useEffect(()=>{const m=o.viewport;if(m){const f=()=>{if(d(),!u.current){const p=eq(m,l);u.current=p,l()}};return l(),m.addEventListener("scroll",f),()=>m.removeEventListener("scroll",f)}},[o.viewport,d,l]),i.jsx(we.div,{"data-state":s.hasThumb?"visible":"hidden",...a,ref:c,style:{width:"var(--radix-scroll-area-thumb-width)",height:"var(--radix-scroll-area-thumb-height)",...t},onPointerDownCapture:xe(e.onPointerDownCapture,m=>{const p=m.target.getBoundingClientRect(),y=m.clientX-p.left,g=m.clientY-p.top;s.onThumbPointerDown({x:y,y:g})}),onPointerUp:xe(e.onPointerUp,s.onThumbPointerUp)})});$w.displayName=tc;var sf="ScrollAreaCorner",Uw=x.forwardRef((e,r)=>{const n=ln(sf,e.__scopeScrollArea),t=!!(n.scrollbarX&&n.scrollbarY);return n.type!=="scroll"&&t?i.jsx(JA,{...e,ref:r}):null});Uw.displayName=sf;var JA=x.forwardRef((e,r)=>{const{__scopeScrollArea:n,...t}=e,a=ln(sf,n),[o,s]=x.useState(0),[l,c]=x.useState(0),u=!!(o&&l);return Qo(a.scrollbarX,()=>{var m;const d=((m=a.scrollbarX)==null?void 0:m.offsetHeight)||0;a.onCornerHeightChange(d),c(d)}),Qo(a.scrollbarY,()=>{var m;const d=((m=a.scrollbarY)==null?void 0:m.offsetWidth)||0;a.onCornerWidthChange(d),s(d)}),u?i.jsx(we.div,{...t,ref:r,style:{width:o,height:l,position:"absolute",right:a.dir==="ltr"?0:void 0,left:a.dir==="rtl"?0:void 0,bottom:0,...e.style}}):null});function ac(e){return e?parseInt(e,10):0}function Vw(e,r){const n=e/r;return isNaN(n)?0:n}function Ic(e){const r=Vw(e.viewport,e.content),n=e.scrollbar.paddingStart+e.scrollbar.paddingEnd,t=(e.scrollbar.size-n)*r;return Math.max(t,18)}function ZA(e,r,n,t="ltr"){const a=Ic(n),o=a/2,s=r||o,l=a-s,c=n.scrollbar.paddingStart+s,u=n.scrollbar.size-n.scrollbar.paddingEnd-l,d=n.content-n.viewport,m=t==="ltr"?[0,d]:[d*-1,0];return Hw([c,u],m)(e)}function Og(e,r,n="ltr"){const t=Ic(r),a=r.scrollbar.paddingStart+r.scrollbar.paddingEnd,o=r.scrollbar.size-a,s=r.content-r.viewport,l=o-t,c=n==="ltr"?[0,s]:[s*-1,0],u=UA(e,c);return Hw([0,s],[0,l])(u)}function Hw(e,r){return n=>{if(e[0]===e[1]||r[0]===r[1])return r[0];const t=(r[1]-r[0])/(e[1]-e[0]);return r[0]+t*(n-e[0])}}function Qw(e,r){return e>0&&e<r}var eq=(e,r=()=>{})=>{let n={left:e.scrollLeft,top:e.scrollTop},t=0;return function a(){const o={left:e.scrollLeft,top:e.scrollTop},s=n.left!==o.left,l=n.top!==o.top;(s||l)&&r(),n=o,t=window.requestAnimationFrame(a)}(),()=>window.cancelAnimationFrame(t)};function Mc(e,r){const n=vr(e),t=x.useRef(0);return x.useEffect(()=>()=>window.clearTimeout(t.current),[]),x.useCallback(()=>{window.clearTimeout(t.current),t.current=window.setTimeout(n,r)},[n,r])}function Qo(e,r){const n=vr(r);Nn(()=>{let t=0;if(e){const a=new ResizeObserver(()=>{cancelAnimationFrame(t),t=window.requestAnimationFrame(n)});return a.observe(e),()=>{window.cancelAnimationFrame(t),a.unobserve(e)}}},[e,n])}var Ww=Iw,rq=Lw,nq=Uw;const Gw=x.forwardRef(({className:e,children:r,...n},t)=>i.jsxs(Ww,{ref:t,className:fe("relative overflow-hidden",e),...n,children:[i.jsx(rq,{className:"h-full w-full rounded-[inherit]",children:r}),i.jsx(Yw,{}),i.jsx(nq,{})]}));Gw.displayName=Ww.displayName;const Yw=x.forwardRef(({className:e,orientation:r="vertical",...n},t)=>i.jsx(af,{ref:t,orientation:r,className:fe("flex touch-none select-none transition-colors",r==="vertical"&&"h-full w-2.5 border-l border-l-transparent p-[1px]",r==="horizontal"&&"h-2.5 flex-col border-t border-t-transparent p-[1px]",e),...n,children:i.jsx($w,{className:"relative flex-1 rounded-full bg-border"})}));Yw.displayName=af.displayName;var tq="Separator",Ig="horizontal",aq=["horizontal","vertical"],Kw=x.forwardRef((e,r)=>{const{decorative:n,orientation:t=Ig,...a}=e,o=oq(t)?t:Ig,l=n?{role:"none"}:{"aria-orientation":o==="vertical"?o:void 0,role:"separator"};return i.jsx(we.div,{"data-orientation":o,...l,...a,ref:r})});Kw.displayName=tq;function oq(e){return aq.includes(e)}var Xw=Kw;const lf=x.forwardRef(({className:e,orientation:r="horizontal",decorative:n=!0,...t},a)=>i.jsx(Xw,{ref:a,decorative:n,orientation:r,className:fe("shrink-0 bg-border",r==="horizontal"?"h-[1px] w-full":"h-full w-[1px]",e),...t}));lf.displayName=Xw.displayName;const Mg=e=>{const r=new Date(e);return Number.isNaN(r.getTime())?e:r.toLocaleString("pt-BR")},Lg=Br.reduce((e,r)=>(e[r.id]=r.question,e),{}),sq=()=>{var _,V,L,U,Q;const[e,r]=x.useState(""),[n,t]=x.useState(""),[a,o]=x.useState(""),[s,l]=x.useState(!1),[c,u]=x.useState(!1),[d,m]=x.useState({});x.useEffect(()=>{if(typeof window>"u")return;const R=window.localStorage.getItem("admin_quiz_token");R&&(r(R),t(R))},[]);const{data:f,isLoading:p,isFetching:y,error:g,refetch:b}=_0({queryKey:["quiz-responses",e],enabled:!!e,queryFn:async()=>{if(!e)return[];const O=await fetch("https://cowszxuttssqdxhciwzp.supabase.co/functions/v1/list-quiz-responses?limit=200",{headers:{"x-admin-token":e,Authorization:`Bearer ${e}`}});if(!O.ok){const F=await O.json().catch(()=>({}));if(O.status===401)throw new Error("401: token invalido");if(O.status>=500){const W=(F==null?void 0:F.message)||(F==null?void 0:F.error)||(F==null?void 0:F.details)||JSON.stringify(F)||"erro interno da funcao";throw new Error(`500: ${W}`)}const C=(F==null?void 0:F.error)||"Erro ao buscar respostas";throw new Error(C)}const S=await O.json();return((S==null?void 0:S.responses)||[]).map(F=>{var re,te;const C=F.answers;let W=[];return Array.isArray(C)?W=C.map(X=>({question:Lg[X==null?void 0:X.question]||(X==null?void 0:X.question)||"",answer:(X==null?void 0:X.answer)??""})):C&&typeof C=="object"&&(W=Object.entries(C).map(([X,Fe])=>({question:Lg[X]||String(X),answer:Fe!=null?String(Fe):""}))),{id:F.id,name:F.name||"",email:F.email||"",whatsapp:F.whatsapp??null,created_at:F.created_at,answers:W,raw_answers:C,ai_recommendation:F.ai_recommendation||null,clicked_upsell:F.clicked_upsell??null,upsell_clicked_at:F.upsell_clicked_at??null,riasec_top1:F.riasec_top1||((re=F.riasec)==null?void 0:re.top1)||null,riasec_top2:F.riasec_top2||((te=F.riasec)==null?void 0:te.top2)||null,riasec:F.riasec||F.ai_recommendation||null,paid:F.paid||{paid:!1,paid_at:null,amount:null,order_id:null}}})}}),h=R=>{R.preventDefault();const q=n.trim();q&&(r(q),typeof window<"u"&&window.localStorage.setItem("admin_quiz_token",q))},v=()=>{r(""),typeof window<"u"&&window.localStorage.removeItem("admin_quiz_token")},w=x.useMemo(()=>{const R=f||[],q=R.length,O=R.filter(F=>F.clicked_upsell).length,S=R.reduce((F,C)=>{const W=C.riasec_top1||"";return W&&(F[W]=(F[W]||0)+1),F},{}),Y=Object.entries(S).sort((F,C)=>C[1]-F[1]).slice(0,3);return{total:q,upsells:O,topProfiles:Y}},[f]),j=x.useMemo(()=>{const R=a.trim().toLowerCase(),q=new Date().getTime(),O=24*60*60*1e3;return(f||[]).filter(S=>{const Y=!R||S.name.toLowerCase().includes(R)||S.email.toLowerCase().includes(R)||S.id.toLowerCase().includes(R),F=(S.answers||[]).length>0,C=!s||F,W=new Date(S.created_at).getTime(),re=!c||q-W<=O;return Y&&C&&re})},[f,a,s,c]),E=R=>{var q;R&&((q=navigator.clipboard)==null||q.writeText(R).catch(()=>{}))},N=R=>{var O;const q={id:R.id,name:R.name,email:R.email,created_at:R.created_at,answers:R.answers&&R.answers.length?R.answers:R.raw_answers||[],raw_answers:R.raw_answers||[],riasec:R.riasec||R.ai_recommendation||null};(O=navigator.clipboard)==null||O.writeText(JSON.stringify(q,null,2)).catch(()=>{})},P=R=>{m(q=>({...q,[R]:!q[R]}))},k=()=>{const R=j.map(C=>{var W;return{id:C.id,name:C.name,email:C.email,created_at:C.created_at,answers_count:((W=C.answers)==null?void 0:W.length)||0,riasec_top1:C.riasec_top1||"",riasec_top2:C.riasec_top2||"",clicked_upsell:C.clicked_upsell?"yes":"no"}}),q=Object.keys(R[0]||{id:"",name:"",email:"",created_at:"",answers_count:"",riasec_top1:"",riasec_top2:"",clicked_upsell:""}),O=[q.join(","),...R.map(C=>q.map(W=>{const re=C[W]??"",te=typeof re=="string"&&/[",\n]/.test(re),X=String(re).replace(/"/g,'""');return te?`"${X}"`:X}).join(","))].join(`
`),S=new Blob([O],{type:"text/csv;charset=utf-8;"}),Y=URL.createObjectURL(S),F=document.createElement("a");F.href=Y,F.download="quiz_responses.csv",F.click(),URL.revokeObjectURL(Y)},z=()=>i.jsxs(J,{className:"max-w-xl mx-auto",children:[i.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[i.jsx("div",{className:"w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center",children:i.jsx(ja,{className:"w-5 h-5 text-primary"})}),i.jsxs("div",{children:[i.jsx("p",{className:"text-sm text-muted-foreground",children:"Acesso restrito"}),i.jsx("h1",{className:"text-xl font-bold",children:"Digite o token secreto"})]})]}),i.jsxs("form",{onSubmit:h,className:"space-y-3",children:[i.jsxs("div",{className:"space-y-2",children:[i.jsx(Un,{htmlFor:"token",children:"Token"}),i.jsx(Kt,{id:"token",type:"password",value:n,onChange:R=>t(R.target.value),placeholder:"Cole o token definido no backend"})]}),i.jsx(ge,{type:"submit",className:"w-full",children:"Desbloquear"}),i.jsx("p",{className:"text-xs text-muted-foreground text-center",children:"Usamos apenas este token para validar que voc? ? o dono. Nenhum dado sens?vel ? gravado no navegador."})]})]});if(!e)return i.jsx("div",{className:"min-h-screen bg-muted/20 py-12 px-4",children:z()});const A=((_=g==null?void 0:g.message)==null?void 0:_.startsWith("401"))||((V=g==null?void 0:g.message)==null?void 0:V.toLowerCase().includes("nao autorizado"))||((L=g==null?void 0:g.message)==null?void 0:L.toLowerCase().includes("n?o autorizado"))||((U=g==null?void 0:g.message)==null?void 0:U.toLowerCase().includes("token")),I=(Q=g==null?void 0:g.message)==null?void 0:Q.startsWith("500");return i.jsx("div",{className:"min-h-screen bg-muted/20 py-10 px-4",children:i.jsxs("div",{className:"container mx-auto max-w-6xl space-y-6",children:[i.jsxs("div",{className:"flex flex-col md:flex-row md:items-center md:justify-between gap-3",children:[i.jsxs("div",{children:[i.jsx("p",{className:"text-sm text-muted-foreground",children:"Painel privado"}),i.jsx("h1",{className:"text-2xl font-bold",children:"Respostas do quiz"}),i.jsx("p",{className:"text-sm text-muted-foreground",children:"Apenas quem tem o token secreto consegue carregar estes dados."})]}),i.jsxs("div",{className:"flex items-center gap-2",children:[i.jsx(ge,{variant:"outline",onClick:v,children:"Trocar token"}),i.jsxs(ge,{variant:"outline",onClick:()=>b(),disabled:y,children:[y?i.jsx($o,{className:"w-4 h-4 mr-2 animate-spin"}):i.jsx(Rb,{className:"w-4 h-4 mr-2"}),"Atualizar"]}),i.jsx(ge,{variant:"outline",onClick:k,disabled:!j.length,children:"Exportar CSV"})]})]}),i.jsx(J,{className:"p-4 space-y-3",children:i.jsxs("div",{className:"flex flex-col md:flex-row md:items-center gap-3",children:[i.jsxs("div",{className:"flex-1 space-y-2",children:[i.jsx(Un,{htmlFor:"search",children:"Buscar"}),i.jsx(Kt,{id:"search",placeholder:"Filtre por nome, email ou ID",value:a,onChange:R=>o(R.target.value)})]}),i.jsxs("div",{className:"flex flex-col md:w-56 space-y-2",children:[i.jsx(Un,{children:"Filtros"}),i.jsxs("div",{className:"flex flex-wrap gap-2",children:[i.jsx(ge,{type:"button",variant:s?"default":"outline",onClick:()=>l(R=>!R),className:"text-sm",children:s?"Com respostas":"Todas"}),i.jsx(ge,{type:"button",variant:c?"default":"outline",onClick:()=>u(R=>!R),className:"text-sm",children:"?ltimas 24h"})]})]})]})}),A&&i.jsx(J,{className:"border-destructive/40 bg-destructive/5",children:i.jsxs("div",{className:"flex items-start gap-3",children:[i.jsx(Uo,{className:"w-5 h-5 text-destructive mt-0.5"}),i.jsxs("div",{children:[i.jsx("p",{className:"font-semibold",children:"Token inv?lido"}),i.jsx("p",{className:"text-sm text-muted-foreground",children:"Confirme o token ADMIN_DASHBOARD_TOKEN configurado na API e cole novamente."})]})]})}),I&&i.jsx(J,{className:"border-orange-300/60 bg-orange-100/30",children:i.jsxs("div",{className:"flex items-start gap-3",children:[i.jsx(Uo,{className:"w-5 h-5 text-orange-500 mt-0.5"}),i.jsxs("div",{children:[i.jsx("p",{className:"font-semibold",children:"Erro interno"}),i.jsx("p",{className:"text-sm text-muted-foreground whitespace-pre-wrap",children:(g==null?void 0:g.message)||"A Edge Function retornou 500. Confira os logs no Supabase."})]})]})}),i.jsx(J,{children:i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[i.jsxs("div",{className:"p-4 rounded-lg border bg-muted/40",children:[i.jsx("p",{className:"text-sm text-muted-foreground",children:"Total de respostas"}),i.jsx("p",{className:"text-2xl font-bold",children:w.total})]}),i.jsxs("div",{className:"p-4 rounded-lg border bg-muted/40",children:[i.jsx("p",{className:"text-sm text-muted-foreground",children:"Cliques em upsell"}),i.jsx("p",{className:"text-2xl font-bold",children:w.upsells})]}),i.jsxs("div",{className:"p-4 rounded-lg border bg-muted/40",children:[i.jsx("p",{className:"text-sm text-muted-foreground",children:"Perfis mais comuns"}),i.jsxs("div",{className:"flex flex-wrap gap-2 mt-2",children:[w.topProfiles.length===0&&i.jsx("span",{className:"text-sm text-muted-foreground",children:"N/A"}),w.topProfiles.map(([R,q])=>i.jsxs(Se,{variant:"outline",children:[R," (",q,")"]},R))]})]})]})}),p&&i.jsxs(J,{className:"p-8 text-center space-y-3",children:[i.jsx($o,{className:"w-6 h-6 animate-spin mx-auto text-primary"}),i.jsx("p",{className:"text-sm text-muted-foreground",children:"Carregando respostas..."})]}),!p&&!(f!=null&&f.length)&&!g&&i.jsxs(J,{className:"p-6 text-center space-y-2",children:[i.jsx(Bd,{className:"w-6 h-6 mx-auto text-muted-foreground"}),i.jsx("p",{className:"font-semibold",children:"Nenhuma resposta encontrada"}),i.jsx("p",{className:"text-sm text-muted-foreground",children:"Quando alguem concluir o quiz, os dados aparecem aqui."})]}),j.length?i.jsx("div",{className:"space-y-4",children:j.map(R=>{var Ge,Xe,ar,cn,Or,Gn;const q=(Ge=R.paid)==null?void 0:Ge.paid,O=(Xe=R.paid)!=null&&Xe.amount&&Number.isFinite(R.paid.amount/100)?(R.paid.amount/100).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}):null,S=R.riasec_top1||R.riasec_top2,Y=R.riasec_top2||R.riasec_top1,F=((ar=R.riasec)==null?void 0:ar.scores)||{},C=((cn=R.riasec)==null?void 0:cn.descricao_personalizada)||"",W=((Or=R.riasec)==null?void 0:Or.habilidades)||[],re=R.answers||[],te=d[R.id],X=te?re:re.slice(0,5),Fe=Math.max(0,re.length-X.length);return i.jsx(J,{className:"overflow-hidden border-border/70 shadow-sm",children:i.jsxs("div",{className:"p-6 space-y-4",children:[i.jsxs("div",{className:"flex flex-col md:flex-row md:items-start md:justify-between gap-4",children:[i.jsxs("div",{className:"space-y-3",children:[i.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[i.jsx("h3",{className:"text-xl font-semibold text-foreground",children:R.name||"Sem nome"}),i.jsx(Se,{variant:"secondary",className:"text-xs",children:R.email}),R.whatsapp&&i.jsxs(Se,{variant:"outline",children:["WhatsApp: ",R.whatsapp]}),q?i.jsxs(Se,{className:"bg-emerald-500 hover:bg-emerald-600 text-white",children:[i.jsx(er,{className:"w-3 h-3 mr-1"})," Pago ",O?`- ${O}`:""]}):i.jsx(Se,{variant:"outline",className:"text-amber-600 border-amber-300",children:"Aguardando pagamento"}),R.clicked_upsell&&i.jsxs(Se,{className:"bg-blue-600 text-white",children:[i.jsx(er,{className:"w-3 h-3 mr-1"})," Clicou no upsell"]})]}),i.jsxs("div",{className:"text-sm text-muted-foreground flex flex-wrap gap-4",children:[i.jsxs("span",{children:["Recebido em ",Mg(R.created_at)]}),i.jsxs("span",{children:["ID: ",R.id]}),((Gn=R.paid)==null?void 0:Gn.paid_at)&&i.jsxs("span",{children:["Pago em ",Mg(R.paid.paid_at)]})]}),i.jsxs("div",{className:"flex flex-wrap gap-2",children:[i.jsx(ge,{size:"sm",variant:"outline",onClick:()=>E(R.email),children:"Copiar email"}),i.jsx(ge,{size:"sm",variant:"outline",onClick:()=>N(R),children:"Copiar dados"})]})]}),i.jsx("div",{className:"w-full md:w-96",children:i.jsxs(J,{className:"p-4 bg-gradient-to-br from-primary/5 via-background to-accent/5 border border-primary/20 space-y-3",children:[i.jsxs("div",{className:"flex items-center justify-between",children:[i.jsxs("div",{children:[i.jsx("p",{className:"text-xs uppercase text-primary font-semibold",children:"Perfil RIASEC"}),i.jsxs("div",{className:"flex flex-wrap gap-2 mt-1",children:[S&&i.jsx(Se,{className:"bg-primary text-white",children:S}),Y&&i.jsx(Se,{variant:"outline",className:"border-primary text-primary",children:Y})]})]}),R.clicked_upsell&&i.jsx(Se,{className:"bg-blue-600 text-white",children:"Clicou upsell"})]}),i.jsx("div",{className:"space-y-2",children:Object.entries(F).map(([wr,mr])=>i.jsxs("div",{className:"space-y-1",children:[i.jsxs("div",{className:"flex justify-between text-xs text-muted-foreground",children:[i.jsx("span",{children:wr}),i.jsxs("span",{children:[mr,"%"]})]}),i.jsx("div",{className:"h-1.5 rounded-full bg-muted overflow-hidden",children:i.jsx("div",{className:"h-full bg-primary",style:{width:`${Math.min(100,Number(mr)||0)}%`}})})]},wr))}),i.jsx("p",{className:"text-xs text-muted-foreground leading-relaxed",children:C?String(C).slice(0,220)+(String(C).length>220?"...":""):"Resumo de personalidade baseado nas respostas do usu?rio."}),W!=null&&W.length?i.jsx("div",{className:"flex flex-wrap gap-2",children:W.slice(0,5).map((wr,mr)=>i.jsx(Se,{variant:"outline",className:"text-xs",children:String(wr)},`${R.id}-hab-${mr}`))}):null]})})]}),i.jsx(lf,{}),i.jsxs("div",{className:"space-y-3",children:[i.jsxs("div",{className:"flex items-center justify-between",children:[i.jsxs("p",{className:"font-semibold text-sm text-foreground",children:["Respostas (",re.length,")"]}),re.length>5&&i.jsx(ge,{type:"button",size:"sm",variant:"ghost",onClick:()=>P(R.id),className:"h-8 px-2 text-xs",children:te?"Ver menos":`Ver todas (${re.length})`})]}),re.length===0?i.jsx("p",{className:"text-sm text-muted-foreground",children:"Sem respostas registradas."}):i.jsx(Gw,{className:te?"max-h-[520px]":"max-h-[320px]",children:i.jsxs("div",{className:"grid gap-3 pr-1",children:[X.map((wr,mr)=>i.jsx(J,{className:"border border-border/80 bg-card/60",children:i.jsxs("div",{className:"p-4 space-y-2",children:[i.jsxs("div",{className:"flex items-start justify-between gap-3",children:[i.jsxs("p",{className:"text-sm font-semibold text-foreground",children:["Q",mr+1,": ",wr.question||"Pergunta"]}),i.jsx(Se,{variant:"outline",className:"text-xs",children:"Resposta do usu?rio"})]}),i.jsx("p",{className:"text-sm text-muted-foreground whitespace-pre-wrap",children:wr.answer||"Sem resposta"})]})},`${R.id}-${mr}`)),!te&&Fe>0&&i.jsxs("p",{className:"text-xs text-muted-foreground pb-2",children:["+",Fe,' respostas ocultas. Clique em "Ver todas".']})]})})]})]})},R.id)})}):null]})})},qu=e=>{if(!e)return"—";const r=new Date(e);return Number.isNaN(r.getTime())?e:r.toLocaleString("pt-BR")},Fg=e=>Number.isFinite(e||0)?(e/100).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}):"—",iq=()=>{var P;const[e,r]=x.useState(""),[n,t]=x.useState(""),[a,o]=x.useState(""),[s,l]=x.useState(!1);x.useEffect(()=>{if(typeof window>"u")return;const k=window.localStorage.getItem("admin_clients_token")||window.localStorage.getItem("admin_quiz_token");k&&(r(k),t(k))},[]);const{data:c,isLoading:u,isFetching:d,error:m,refetch:f}=_0({queryKey:["clients",e],enabled:!!e,queryFn:async()=>{const k=await fetch("/api/listClients",{headers:{"x-admin-token":e,Authorization:`Bearer ${e}`}});if(!k.ok){const z=await k.json().catch(()=>({})),A=(z==null?void 0:z.error)||(z==null?void 0:z.details)||(z==null?void 0:z.message)||"Erro ao buscar clientes";throw new Error(`${k.status}: ${A}`)}return k.json()}}),p=(c==null?void 0:c.orders)||[],y=x.useMemo(()=>{const k=a.trim().toLowerCase();return p.filter(z=>{var _,V,L,U;const A=!k||((_=z.user_name)==null?void 0:_.toLowerCase().includes(k))||((V=z.user_email)==null?void 0:V.toLowerCase().includes(k))||((L=z.id)==null?void 0:L.toLowerCase().includes(k)),I=!s||((U=z.payment_status)==null?void 0:U.toLowerCase())==="paid";return A&&I})},[p,a,s]),g=x.useMemo(()=>{const k=p.length,z=p.filter(_=>(_.payment_status||"").toLowerCase()==="paid"),A=z.reduce((_,V)=>_+(V.amount||0),0),I=p.filter(_=>(_.payment_status||"").toLowerCase()!=="paid");return{total:k,paid:z.length,pending:I.length,revenueCents:A}},[p]),b=k=>{k.preventDefault();const z=n.trim();z&&(r(z),typeof window<"u"&&window.localStorage.setItem("admin_clients_token",z))},h=()=>{r(""),typeof window<"u"&&window.localStorage.removeItem("admin_clients_token")},v=k=>{var z;k&&((z=navigator.clipboard)==null||z.writeText(k).catch(()=>{}))},w=()=>{if(!y.length)return;const k=["id","user_name","user_email","amount_cents","payment_status","created_at","paid_at","product_id","quiz_response_id","mp_preference_id","mercado_pago_payment_id","stripe_session_id"],z=[k.join(","),...y.map(V=>k.map(L=>{const U=V[L]??"",Q=String(U).replace(/"/g,'""');return/[",\n]/.test(Q)?`"${Q}"`:Q}).join(","))].join(`
`),A=new Blob([z],{type:"text/csv;charset=utf-8;"}),I=URL.createObjectURL(A),_=document.createElement("a");_.href=I,_.download="clientes.csv",_.click(),URL.revokeObjectURL(I)},j=(P=m==null?void 0:m.message)==null?void 0:P.startsWith("401"),E=m&&!j,N=()=>i.jsxs(J,{className:"max-w-xl mx-auto",children:[i.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[i.jsx("div",{className:"w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center",children:i.jsx(ja,{className:"w-5 h-5 text-primary"})}),i.jsxs("div",{children:[i.jsx("p",{className:"text-sm text-muted-foreground",children:"Acesso restrito"}),i.jsx("h1",{className:"text-xl font-bold",children:"Digite o token secreto"})]})]}),i.jsxs("form",{onSubmit:b,className:"space-y-3",children:[i.jsxs("div",{className:"space-y-2",children:[i.jsx(Un,{htmlFor:"token",children:"Token"}),i.jsx(Kt,{id:"token",type:"password",value:n,onChange:k=>t(k.target.value),placeholder:"Cole o token ADMIN_DASHBOARD_TOKEN"})]}),i.jsx(ge,{type:"submit",className:"w-full",children:"Desbloquear"}),i.jsx("p",{className:"text-xs text-muted-foreground text-center",children:"Usamos apenas este token para validar que voce e o dono."})]})]});return e?i.jsx("div",{className:"min-h-screen bg-muted/20 py-10 px-4",children:i.jsxs("div",{className:"container mx-auto max-w-6xl space-y-6",children:[i.jsxs("div",{className:"flex flex-col md:flex-row md:items-center md:justify-between gap-3",children:[i.jsxs("div",{children:[i.jsx("p",{className:"text-sm text-muted-foreground",children:"Painel privado"}),i.jsx("h1",{className:"text-2xl font-bold",children:"Clientes / Pedidos"}),i.jsx("p",{className:"text-sm text-muted-foreground",children:"Lista pedidos gravados no Supabase (service role)."})]}),i.jsxs("div",{className:"flex items-center gap-2",children:[i.jsx(ge,{variant:"outline",onClick:h,children:"Trocar token"}),i.jsxs(ge,{variant:"outline",onClick:()=>f(),disabled:d,children:[d?i.jsx($o,{className:"w-4 h-4 mr-2 animate-spin"}):i.jsx(Rb,{className:"w-4 h-4 mr-2"}),"Atualizar"]}),i.jsx(ge,{variant:"outline",onClick:w,disabled:!y.length,children:"Exportar CSV"})]})]}),i.jsx(J,{className:"p-4 space-y-3",children:i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-3",children:[i.jsxs("div",{className:"p-4 rounded-lg border bg-muted/40",children:[i.jsx("p",{className:"text-sm text-muted-foreground",children:"Total pedidos"}),i.jsx("p",{className:"text-2xl font-bold",children:g.total})]}),i.jsxs("div",{className:"p-4 rounded-lg border bg-muted/40",children:[i.jsx("p",{className:"text-sm text-muted-foreground",children:"Pagos"}),i.jsx("p",{className:"text-2xl font-bold",children:g.paid})]}),i.jsxs("div",{className:"p-4 rounded-lg border bg-muted/40",children:[i.jsx("p",{className:"text-sm text-muted-foreground",children:"Receita (R$)"}),i.jsx("p",{className:"text-2xl font-bold",children:Fg(g.revenueCents)})]})]})}),i.jsx(J,{className:"p-4 space-y-3",children:i.jsxs("div",{className:"flex flex-col md:flex-row md:items-center gap-3",children:[i.jsxs("div",{className:"flex-1 space-y-2",children:[i.jsx(Un,{htmlFor:"search",children:"Buscar"}),i.jsx(Kt,{id:"search",placeholder:"Filtre por nome, email ou ID",value:a,onChange:k=>o(k.target.value)})]}),i.jsxs("div",{className:"flex flex-col md:w-56 space-y-2",children:[i.jsx(Un,{children:"Filtros"}),i.jsx("div",{className:"flex flex-wrap gap-2",children:i.jsx(ge,{type:"button",variant:s?"default":"outline",onClick:()=>l(k=>!k),className:"text-sm",children:s?"Somente pagos":"Todos"})})]})]})}),j&&i.jsx(J,{className:"border-destructive/40 bg-destructive/5",children:i.jsxs("div",{className:"flex items-start gap-3",children:[i.jsx(Uo,{className:"w-5 h-5 text-destructive mt-0.5"}),i.jsxs("div",{children:[i.jsx("p",{className:"font-semibold",children:"Token invalido"}),i.jsx("p",{className:"text-sm text-muted-foreground",children:"Confirme o ADMIN_DASHBOARD_TOKEN configurado na API e cole novamente."})]})]})}),E&&i.jsx(J,{className:"border-orange-300/60 bg-orange-100/30",children:i.jsxs("div",{className:"flex items-start gap-3",children:[i.jsx(Uo,{className:"w-5 h-5 text-orange-500 mt-0.5"}),i.jsxs("div",{children:[i.jsx("p",{className:"font-semibold",children:"Erro interno"}),i.jsx("p",{className:"text-sm text-muted-foreground whitespace-pre-wrap",children:m==null?void 0:m.message})]})]})}),u&&i.jsxs(J,{className:"p-8 text-center space-y-3",children:[i.jsx($o,{className:"w-6 h-6 animate-spin mx-auto text-primary"}),i.jsx("p",{className:"text-sm text-muted-foreground",children:"Carregando clientes..."})]}),!u&&!y.length&&!m&&i.jsxs(J,{className:"p-6 text-center space-y-2",children:[i.jsx(ja,{className:"w-6 h-6 mx-auto text-muted-foreground"}),i.jsx("p",{className:"font-semibold",children:"Nenhum pedido encontrado"}),i.jsx("p",{className:"text-sm text-muted-foreground",children:"Quando houver vendas elas aparecem aqui."})]}),y.length?i.jsx("div",{className:"space-y-4",children:y.map(k=>{var z;return i.jsx(J,{className:"overflow-hidden",children:i.jsxs("div",{className:"p-6 space-y-3",children:[i.jsxs("div",{className:"flex flex-col md:flex-row md:items-start md:justify-between gap-3",children:[i.jsxs("div",{className:"space-y-1",children:[i.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[i.jsx("h3",{className:"text-lg font-semibold",children:k.user_name||"Sem nome"}),i.jsx(Se,{variant:"secondary",children:k.user_email}),i.jsx(Se,{variant:"outline",children:Fg(k.amount)}),((z=k.payment_status)==null?void 0:z.toLowerCase())==="paid"?i.jsxs(Se,{className:"bg-emerald-500 hover:bg-emerald-600 text-white",children:[i.jsx(er,{className:"w-3 h-3 mr-1"}),"Pago"]}):i.jsx(Se,{variant:"outline",children:k.payment_status||"status"})]}),i.jsxs("p",{className:"text-sm text-muted-foreground",children:["Criado em ",qu(k.created_at)," • Pago em ",qu(k.paid_at)]}),i.jsxs("div",{className:"flex flex-wrap gap-2",children:[i.jsxs(ge,{size:"sm",variant:"outline",onClick:()=>v(k.user_email),children:[i.jsx(Dd,{className:"w-3 h-3 mr-1"}),"Copiar email"]}),i.jsxs(ge,{size:"sm",variant:"outline",onClick:()=>v(k.id),children:[i.jsx(Dd,{className:"w-3 h-3 mr-1"}),"Copiar ID pedido"]})]})]}),i.jsxs("div",{className:"text-sm text-muted-foreground text-right space-y-1",children:[i.jsxs("p",{children:["ID: ",k.id]}),k.quiz_response_id&&i.jsxs("p",{children:["Quiz: ",k.quiz_response_id]}),k.mercado_pago_payment_id&&i.jsxs("p",{children:["MP: ",k.mercado_pago_payment_id]}),k.stripe_session_id&&i.jsxs("p",{children:["Stripe: ",k.stripe_session_id]})]})]}),i.jsx(lf,{}),i.jsxs("div",{className:"text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-2",children:[i.jsxs("p",{children:["Produto: ",k.product_id||"—"]}),i.jsxs("p",{children:["Preferencia MP: ",k.mp_preference_id||"—"]}),i.jsxs("p",{children:["Atualizado em: ",qu(k.updated_at)]})]})]})},k.id)})}):null]})}):i.jsx("div",{className:"min-h-screen bg-muted/20 py-12 px-4",children:N()})},lq=()=>i.jsx("div",{className:"min-h-screen flex items-center justify-center px-4",children:i.jsxs("div",{className:"max-w-md w-full bg-card border rounded-lg p-8 text-center space-y-4",children:[i.jsx("h1",{className:"text-2xl font-bold",children:"Área administrativa desativada"}),i.jsx("p",{className:"text-muted-foreground",children:"O backend do Supabase foi removido. Se precisar de uma nova área admin, configure uma API própria na Vercel ou outro provedor de auth."})]})}),cq=()=>i.jsx("div",{className:"min-h-screen flex items-center justify-center px-4",children:i.jsxs("div",{className:"max-w-md w-full bg-card border rounded-lg p-8 text-center space-y-4",children:[i.jsx("h1",{className:"text-2xl font-bold",children:"Recuperar senha"}),i.jsx("p",{className:"text-muted-foreground",children:"Fluxo de senha desativado após remoção do Supabase. Implemente um novo provedor de autenticação se precisar deste recurso."})]})}),uq=()=>i.jsx("div",{className:"min-h-screen flex items-center justify-center px-4",children:i.jsxs("div",{className:"max-w-md w-full bg-card border rounded-lg p-8 text-center space-y-4",children:[i.jsx("h1",{className:"text-2xl font-bold",children:"Reset de senha"}),i.jsx("p",{className:"text-muted-foreground",children:"Este fluxo não está disponível sem o backend de autenticação. Configure um novo provedor (ex.: Auth via Vercel/NextAuth/Clerk) se precisar resetar senhas."})]})}),dq=()=>i.jsxs(i.Fragment,{children:[i.jsxs($a,{children:[i.jsx("title",{children:"Termos de Uso | Futuro Perfeito"}),i.jsx("meta",{name:"description",content:"Conheca os termos de uso do Futuro Perfeito e como funciona o servico."})]}),i.jsx("div",{className:"min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12",children:i.jsxs("div",{className:"container mx-auto px-4 max-w-4xl",children:[i.jsxs(cr,{to:"/",className:"inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors",children:[i.jsx(kp,{className:"w-4 h-4"}),"Voltar para o início"]}),i.jsxs(J,{className:"p-8 shadow-[var(--shadow-elevated)]",children:[i.jsx("h1",{className:"text-3xl font-bold mb-6",children:"Termos de Uso"}),i.jsx("p",{className:"text-sm text-muted-foreground mb-8",children:"Última atualização: Dezembro de 2025"}),i.jsxs("div",{className:"prose prose-sm max-w-none space-y-6",children:[i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"1. Aceitação dos Termos"}),i.jsx("p",{className:"text-muted-foreground",children:"Ao acessar ou usar o Futuro Perfeito, você concorda com estes Termos de Uso. Se não concordar com qualquer parte, não utilize o serviço."})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"2. Quem somos e o que oferecemos"}),i.jsx("p",{className:"text-muted-foreground",children:"Futuro Perfeito é um projeto independente, desenvolvido por uma pessoa, que ajuda você a identificar concursos públicos aderentes ao seu perfil. Oferecemos:"}),i.jsxs("ul",{className:"list-disc list-inside text-muted-foreground space-y-1 ml-4",children:[i.jsx("li",{children:"Quiz gratuito para mapear perfil e contexto"}),i.jsx("li",{children:"Recomendações iniciais baseadas nas suas respostas"}),i.jsx("li",{children:"Relatório completo opcional por pagamento único de R$ 25 (ranking de concursos, estimativas e plano)"})]})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"3. Uso do serviço"}),i.jsx("p",{className:"text-muted-foreground mb-2",children:"Ao usar o Futuro Perfeito, você se compromete a:"}),i.jsxs("ul",{className:"list-disc list-inside text-muted-foreground space-y-1 ml-4",children:[i.jsx("li",{children:"Fornecer informações verdadeiras e atualizadas"}),i.jsx("li",{children:"Não tentar burlar, interromper ou explorar o sistema"}),i.jsx("li",{children:"Usar o serviço somente para fins pessoais e legais"}),i.jsx("li",{children:"Respeitar direitos autorais e marcas exibidas no site"})]})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"4. Produto pago e entrega"}),i.jsx("p",{className:"text-muted-foreground",children:"O relatório completo tem pagamento único de R$ 25. O processamento é feito por provedores de pagamento terceirizados e o acesso é entregue por e-mail (e, se você optar, também por WhatsApp). Não há assinatura nem recorrência."})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"5. Reembolso"}),i.jsx("p",{className:"text-muted-foreground",children:"Se não ficar satisfeito com o relatório completo, você pode solicitar reembolso em até 7 dias pelo WhatsApp (91) 98423-3672 ou pelo contato indicado no site. Reembolsos são integrais para pedidos dentro desse prazo."})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"6. Propriedade intelectual"}),i.jsx("p",{className:"text-muted-foreground",children:"Todo o conteúdo, textos, layouts, ilustrações e marca Futuro Perfeito são de propriedade do projeto ou de seus licenciantes. É proibido copiar, revender ou distribuir sem autorização por escrito."})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"7. Limitação de responsabilidade"}),i.jsx("p",{className:"text-muted-foreground",children:"As recomendações são baseadas nas respostas fornecidas e em dados disponíveis no momento. Não garantimos aprovação em concursos nem que informações de terceiros (editais, salários, datas) estejam sempre atualizadas. Use seu julgamento e verifique fontes oficiais antes de decisões."})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"8. Privacidade e dados"}),i.jsx("p",{className:"text-muted-foreground",children:"O tratamento dos seus dados pessoais é regido pela nossa Política de Privacidade. Ao usar o serviço, você concorda com ela."})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"9. Alterações nos termos"}),i.jsx("p",{className:"text-muted-foreground",children:"Podemos atualizar estes termos. Mudanças relevantes serão comunicadas pelos canais disponíveis no site. O uso continuado após a atualização implica concordância com a versão vigente."})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"10. Lei aplicável"}),i.jsx("p",{className:"text-muted-foreground",children:"Estes termos são regidos pelas leis da República Federativa do Brasil. Eventuais disputas serão resolvidas em foro competente no Brasil."})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"11. Contato"}),i.jsx("p",{className:"text-muted-foreground",children:"Dúvidas ou solicitações: WhatsApp (91) 98423-3672 ou mensagem via Instagram @luccaserrao."})]})]})]})]})}),i.jsx(Ci,{})]}),mq=()=>i.jsxs(i.Fragment,{children:[i.jsxs($a,{children:[i.jsx("title",{children:"Politica de Privacidade | Futuro Perfeito"}),i.jsx("meta",{name:"description",content:"Saiba como o Futuro Perfeito coleta, usa e protege seus dados."})]}),i.jsx("div",{className:"min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12",children:i.jsxs("div",{className:"container mx-auto px-4 max-w-4xl",children:[i.jsxs(cr,{to:"/",className:"inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors",children:[i.jsx(kp,{className:"w-4 h-4"}),"Voltar para o início"]}),i.jsxs(J,{className:"p-8 shadow-[var(--shadow-elevated)]",children:[i.jsx("h1",{className:"text-3xl font-bold mb-6",children:"Política de Privacidade"}),i.jsx("p",{className:"text-sm text-muted-foreground mb-8",children:"Última atualização: Dezembro de 2025"}),i.jsxs("div",{className:"prose prose-sm max-w-none space-y-6",children:[i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"1. Introdução"}),i.jsx("p",{className:"text-muted-foreground",children:"O Futuro Perfeito é um projeto independente e se compromete a proteger sua privacidade, seguindo a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018). Esta política explica como coletamos, usamos e protegemos seus dados."})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"2. Dados coletados"}),i.jsx("p",{className:"text-muted-foreground mb-2",children:"Coletamos apenas o necessário para entregar o serviço:"}),i.jsxs("ul",{className:"list-disc list-inside text-muted-foreground space-y-1 ml-4",children:[i.jsxs("li",{children:[i.jsx("strong",{children:"Nome:"})," para personalizar a comunicação e os resultados"]}),i.jsxs("li",{children:[i.jsx("strong",{children:"E-mail:"})," para enviar o relatório e atualizações"]}),i.jsxs("li",{children:[i.jsx("strong",{children:"WhatsApp (opcional):"})," para entrega do relatório e suporte, se você optar"]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Respostas do quiz:"})," para gerar recomendações personalizadas"]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Dados técnicos de navegação:"})," como IP, dispositivo e métricas de uso, via ferramentas de analytics"]})]})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"3. Como usamos seus dados"}),i.jsx("p",{className:"text-muted-foreground mb-2",children:"Utilizamos seus dados para:"}),i.jsxs("ul",{className:"list-disc list-inside text-muted-foreground space-y-1 ml-4",children:[i.jsx("li",{children:"Gerar e entregar recomendações e relatórios personalizados"}),i.jsx("li",{children:"Enviar comunicações sobre o seu pedido ou sobre melhorias do serviço (você pode sair a qualquer momento)"}),i.jsx("li",{children:"Processar pagamento do relatório completo (pagamento único de R$ 25)"}),i.jsx("li",{children:"Melhorar o produto com análises agregadas e métricas de uso"})]})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"4. Bases legais"}),i.jsx("p",{className:"text-muted-foreground mb-2",children:"Tratamos seus dados com base em:"}),i.jsxs("ul",{className:"list-disc list-inside text-muted-foreground space-y-1 ml-4",children:[i.jsxs("li",{children:[i.jsx("strong",{children:"Consentimento:"})," para comunicações e uso do WhatsApp"]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Execução de contrato:"})," para gerar e entregar o relatório"]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Legítimo interesse:"})," para segurança, prevenção a fraudes e melhoria do serviço"]})]})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"5. Compartilhamento"}),i.jsx("p",{className:"text-muted-foreground mb-2",children:"Compartilhamos dados apenas com provedores necessários:"}),i.jsxs("ul",{className:"list-disc list-inside text-muted-foreground space-y-1 ml-4",children:[i.jsx("li",{children:"Processador de pagamentos para transações seguras"}),i.jsx("li",{children:"Serviços de e-mail para envio de relatórios e comunicações"}),i.jsx("li",{children:"Plataformas de analytics para métricas (dados agregados)"}),i.jsx("li",{children:"Plataforma de backend/armazenamento para guardar respostas do quiz e contato"})]}),i.jsx("p",{className:"text-muted-foreground mt-2",children:i.jsx("strong",{children:"Não vendemos nem alugamos seus dados."})})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"6. Seus direitos (LGPD)"}),i.jsx("p",{className:"text-muted-foreground mb-2",children:"Você pode, a qualquer momento:"}),i.jsxs("ul",{className:"list-disc list-inside text-muted-foreground space-y-1 ml-4",children:[i.jsx("li",{children:"Confirmar se tratamos seus dados e acessar uma cópia"}),i.jsx("li",{children:"Corrigir dados incompletos ou desatualizados"}),i.jsx("li",{children:"Solicitar anonimização ou exclusão de dados"}),i.jsx("li",{children:"Revogar consentimento e cancelar comunicações"})]})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"7. Segurança"}),i.jsx("p",{className:"text-muted-foreground",children:"Usamos criptografia (HTTPS), controles de acesso e armazenamento restrito. Apesar dos cuidados, nenhum sistema é 100% imune; mantenha seus dispositivos seguros."})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"8. Retenção"}),i.jsx("p",{className:"text-muted-foreground",children:"Mantemos seus dados enquanto necessário para entregar o serviço ou cumprir obrigações legais. Você pode pedir a exclusão; isso pode limitar funcionalidades futuras."})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"9. Cookies e métricas"}),i.jsx("p",{className:"text-muted-foreground",children:"Utilizamos cookies/localStorage para manter sua sessão no quiz e analytics para métricas de uso. Você pode desativar no navegador, mas algumas funções podem ser afetadas."})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"10. Alterações nesta política"}),i.jsx("p",{className:"text-muted-foreground",children:"Podemos atualizar esta política. Mudanças relevantes serão comunicadas pelos canais disponíveis. O uso contínuo após a atualização significa que você concorda com a nova versão."})]}),i.jsxs("section",{children:[i.jsx("h2",{className:"text-xl font-semibold mb-3",children:"11. Contato"}),i.jsx("p",{className:"text-muted-foreground",children:"Para exercer seus direitos ou tirar dúvidas: WhatsApp (91) 98423-3672 ou mensagem via Instagram @luccaserrao."})]})]})]})]})}),i.jsx(Ci,{})]}),pq=()=>{const e=la();return x.useEffect(()=>{console.error("404 Error: User attempted to access non-existent route:",e.pathname)},[e.pathname]),i.jsx("div",{className:"flex min-h-screen items-center justify-center bg-gray-100",children:i.jsxs("div",{className:"text-center",children:[i.jsx("h1",{className:"mb-4 text-4xl font-bold",children:"404"}),i.jsx("p",{className:"mb-4 text-xl text-gray-600",children:"Oops! Page not found"}),i.jsx("a",{href:"/",className:"text-blue-500 underline hover:text-blue-700",children:"Return to Home"})]})})},fq=()=>{x.useEffect(()=>{nw("AW-XXXXXXX/YYYZZZZ")},[]);const e=()=>{window.open("https://wa.me/5591984233672?text=Olá,+acabei+de+realizar+meu+pagamento+e+quero+reivindicar+meu+produto!","_blank")};return i.jsx("div",{className:"min-h-screen bg-white flex flex-col items-center justify-center px-4",children:i.jsxs("div",{className:"max-w-2xl w-full text-center space-y-8",children:[i.jsx("h1",{className:"text-4xl md:text-5xl font-bold text-gray-900",children:"✅ Pagamento confirmado!"}),i.jsxs("div",{className:"space-y-4 text-lg text-gray-700",children:[i.jsx("p",{children:"Parabéns! Seu pagamento foi confirmado com sucesso 🎉"}),i.jsx("p",{children:"Para liberar o acesso ao seu produto, fale diretamente comigo pelo WhatsApp."}),i.jsx("p",{className:"font-medium",children:"Basta clicar no botão abaixo 👇"})]}),i.jsx("div",{className:"pt-4",children:i.jsx(ge,{onClick:e,className:"bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-lg px-8 py-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105",size:"lg",children:"📲 Falar com o Suporte"})}),i.jsx("p",{className:"text-sm text-gray-500 italic pt-8",children:"*Atendimento disponível de segunda a sexta, das 9h às 18h.*"})]})})},hq=e=>new Date(e).toLocaleDateString("pt-BR",{day:"2-digit",month:"short",year:"numeric"}),gq=()=>{const e=Wp();return i.jsxs("div",{className:"min-h-screen bg-background text-foreground",children:[i.jsxs($a,{children:[i.jsx("title",{children:"Blog | O Concurso Perfeito"}),i.jsx("meta",{name:"description",content:"Conteúdos práticos sobre preparação para concursos: organização, rotina e o dia da prova."}),i.jsx("meta",{name:"robots",content:"index,follow"})]}),i.jsxs("div",{className:"mx-auto max-w-3xl md:max-w-4xl px-4 py-14 md:px-6 md:py-16",children:[i.jsxs("header",{className:"mb-12 rounded-3xl border border-slate-200 bg-card/80 px-6 py-10 text-center shadow-sm backdrop-blur-sm sm:px-10",children:[i.jsx("p",{className:"text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600",children:"Conteúdo para concurseiros"}),i.jsx("h1",{className:"mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl",children:"Blog"}),i.jsx("p",{className:"mt-4 text-base leading-relaxed text-slate-600 sm:text-lg md:mx-auto md:max-w-3xl",children:"Artigos rápidos com táticas práticas para estudar melhor, manter o foco e chegar bem ao dia da prova."})]}),e.length===0?i.jsx("p",{className:"text-center text-slate-500",children:"Nenhum post publicado ainda."}):i.jsx("div",{className:"grid gap-6 md:grid-cols-2 md:gap-8",children:e.map(r=>i.jsxs("article",{className:"flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-7",children:[i.jsxs("div",{className:"flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500",children:[i.jsx("span",{className:"rounded-full bg-indigo-50 px-3 py-1.5 text-indigo-700",children:hq(r.date)}),i.jsx("div",{className:"flex flex-wrap gap-2",children:r.tags.map(n=>i.jsx("span",{className:"rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700",children:n},n))})]}),i.jsxs("div",{className:"space-y-3",children:[i.jsx("h2",{className:"text-2xl font-bold leading-tight text-slate-900 sm:text-3xl",children:i.jsx(cr,{to:`/blog/${r.slug}`,className:"hover:text-indigo-700",children:r.title})}),i.jsx("p",{className:"text-base leading-relaxed text-slate-700 sm:text-lg",children:r.description})]}),i.jsxs("div",{className:"mt-auto flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between",children:[i.jsx(cr,{to:`/blog/${r.slug}`,className:"inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900",children:"Ler artigo"}),i.jsx(cr,{to:"/",className:"text-sm font-medium text-slate-500 underline decoration-dashed hover:text-slate-700",children:"Voltar para a Home"})]})]},r.slug))})]})]})};function vq(e,r){const n={};return(e[e.length-1]===""?[...e,""]:e).join((n.padRight?" ":"")+","+(n.padLeft===!1?"":" ")).trim()}const xq=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,yq=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,bq={};function Dg(e,r){return(bq.jsx?yq:xq).test(e)}const wq=/[ \t\n\f\r]/g;function jq(e){return typeof e=="object"?e.type==="text"?Bg(e.value):!1:Bg(e)}function Bg(e){return e.replace(wq,"")===""}class Ni{constructor(r,n,t){this.normal=n,this.property=r,t&&(this.space=t)}}Ni.prototype.normal={};Ni.prototype.property={};Ni.prototype.space=void 0;function Jw(e,r){const n={},t={};for(const a of e)Object.assign(n,a.property),Object.assign(t,a.normal);return new Ni(n,t,r)}function vm(e){return e.toLowerCase()}class _r{constructor(r,n){this.attribute=n,this.property=r}}_r.prototype.attribute="";_r.prototype.booleanish=!1;_r.prototype.boolean=!1;_r.prototype.commaOrSpaceSeparated=!1;_r.prototype.commaSeparated=!1;_r.prototype.defined=!1;_r.prototype.mustUseProperty=!1;_r.prototype.number=!1;_r.prototype.overloadedBoolean=!1;_r.prototype.property="";_r.prototype.spaceSeparated=!1;_r.prototype.space=void 0;let Sq=0;const ie=Qa(),Ue=Qa(),xm=Qa(),$=Qa(),Ce=Qa(),wo=Qa(),Fr=Qa();function Qa(){return 2**++Sq}const ym=Object.freeze(Object.defineProperty({__proto__:null,boolean:ie,booleanish:Ue,commaOrSpaceSeparated:Fr,commaSeparated:wo,number:$,overloadedBoolean:xm,spaceSeparated:Ce},Symbol.toStringTag,{value:"Module"})),Ru=Object.keys(ym);class cf extends _r{constructor(r,n,t,a){let o=-1;if(super(r,n),$g(this,"space",a),typeof t=="number")for(;++o<Ru.length;){const s=Ru[o];$g(this,Ru[o],(t&ym[s])===ym[s])}}}cf.prototype.defined=!0;function $g(e,r,n){n&&(e[r]=n)}function es(e){const r={},n={};for(const[t,a]of Object.entries(e.properties)){const o=new cf(t,e.transform(e.attributes||{},t),a,e.space);e.mustUseProperty&&e.mustUseProperty.includes(t)&&(o.mustUseProperty=!0),r[t]=o,n[vm(t)]=t,n[vm(o.attribute)]=t}return new Ni(r,n,e.space)}const Zw=es({properties:{ariaActiveDescendant:null,ariaAtomic:Ue,ariaAutoComplete:null,ariaBusy:Ue,ariaChecked:Ue,ariaColCount:$,ariaColIndex:$,ariaColSpan:$,ariaControls:Ce,ariaCurrent:null,ariaDescribedBy:Ce,ariaDetails:null,ariaDisabled:Ue,ariaDropEffect:Ce,ariaErrorMessage:null,ariaExpanded:Ue,ariaFlowTo:Ce,ariaGrabbed:Ue,ariaHasPopup:null,ariaHidden:Ue,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:Ce,ariaLevel:$,ariaLive:null,ariaModal:Ue,ariaMultiLine:Ue,ariaMultiSelectable:Ue,ariaOrientation:null,ariaOwns:Ce,ariaPlaceholder:null,ariaPosInSet:$,ariaPressed:Ue,ariaReadOnly:Ue,ariaRelevant:null,ariaRequired:Ue,ariaRoleDescription:Ce,ariaRowCount:$,ariaRowIndex:$,ariaRowSpan:$,ariaSelected:Ue,ariaSetSize:$,ariaSort:null,ariaValueMax:$,ariaValueMin:$,ariaValueNow:$,ariaValueText:null,role:null},transform(e,r){return r==="role"?r:"aria-"+r.slice(4).toLowerCase()}});function e1(e,r){return r in e?e[r]:r}function r1(e,r){return e1(e,r.toLowerCase())}const Cq=es({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:wo,acceptCharset:Ce,accessKey:Ce,action:null,allow:null,allowFullScreen:ie,allowPaymentRequest:ie,allowUserMedia:ie,alt:null,as:null,async:ie,autoCapitalize:null,autoComplete:Ce,autoFocus:ie,autoPlay:ie,blocking:Ce,capture:null,charSet:null,checked:ie,cite:null,className:Ce,cols:$,colSpan:null,content:null,contentEditable:Ue,controls:ie,controlsList:Ce,coords:$|wo,crossOrigin:null,data:null,dateTime:null,decoding:null,default:ie,defer:ie,dir:null,dirName:null,disabled:ie,download:xm,draggable:Ue,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:ie,formTarget:null,headers:Ce,height:$,hidden:xm,high:$,href:null,hrefLang:null,htmlFor:Ce,httpEquiv:Ce,id:null,imageSizes:null,imageSrcSet:null,inert:ie,inputMode:null,integrity:null,is:null,isMap:ie,itemId:null,itemProp:Ce,itemRef:Ce,itemScope:ie,itemType:Ce,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:ie,low:$,manifest:null,max:null,maxLength:$,media:null,method:null,min:null,minLength:$,multiple:ie,muted:ie,name:null,nonce:null,noModule:ie,noValidate:ie,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:ie,optimum:$,pattern:null,ping:Ce,placeholder:null,playsInline:ie,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:ie,referrerPolicy:null,rel:Ce,required:ie,reversed:ie,rows:$,rowSpan:$,sandbox:Ce,scope:null,scoped:ie,seamless:ie,selected:ie,shadowRootClonable:ie,shadowRootDelegatesFocus:ie,shadowRootMode:null,shape:null,size:$,sizes:null,slot:null,span:$,spellCheck:Ue,src:null,srcDoc:null,srcLang:null,srcSet:null,start:$,step:null,style:null,tabIndex:$,target:null,title:null,translate:null,type:null,typeMustMatch:ie,useMap:null,value:Ue,width:$,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:Ce,axis:null,background:null,bgColor:null,border:$,borderColor:null,bottomMargin:$,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:ie,declare:ie,event:null,face:null,frame:null,frameBorder:null,hSpace:$,leftMargin:$,link:null,longDesc:null,lowSrc:null,marginHeight:$,marginWidth:$,noResize:ie,noHref:ie,noShade:ie,noWrap:ie,object:null,profile:null,prompt:null,rev:null,rightMargin:$,rules:null,scheme:null,scrolling:Ue,standby:null,summary:null,text:null,topMargin:$,valueType:null,version:null,vAlign:null,vLink:null,vSpace:$,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:ie,disableRemotePlayback:ie,prefix:null,property:null,results:$,security:null,unselectable:null},space:"html",transform:r1}),Nq=es({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:Fr,accentHeight:$,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:$,amplitude:$,arabicForm:null,ascent:$,attributeName:null,attributeType:null,azimuth:$,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:$,by:null,calcMode:null,capHeight:$,className:Ce,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:$,diffuseConstant:$,direction:null,display:null,dur:null,divisor:$,dominantBaseline:null,download:ie,dx:null,dy:null,edgeMode:null,editable:null,elevation:$,enableBackground:null,end:null,event:null,exponent:$,externalResourcesRequired:null,fill:null,fillOpacity:$,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:wo,g2:wo,glyphName:wo,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:$,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:$,horizOriginX:$,horizOriginY:$,id:null,ideographic:$,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:$,k:$,k1:$,k2:$,k3:$,k4:$,kernelMatrix:Fr,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:$,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:$,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:$,overlineThickness:$,paintOrder:null,panose1:null,path:null,pathLength:$,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:Ce,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:$,pointsAtY:$,pointsAtZ:$,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:Fr,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:Fr,rev:Fr,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:Fr,requiredFeatures:Fr,requiredFonts:Fr,requiredFormats:Fr,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:$,specularExponent:$,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:$,strikethroughThickness:$,string:null,stroke:null,strokeDashArray:Fr,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:$,strokeOpacity:$,strokeWidth:null,style:null,surfaceScale:$,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:Fr,tabIndex:$,tableValues:null,target:null,targetX:$,targetY:$,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:Fr,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:$,underlineThickness:$,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:$,values:null,vAlphabetic:$,vMathematical:$,vectorEffect:null,vHanging:$,vIdeographic:$,version:null,vertAdvY:$,vertOriginX:$,vertOriginY:$,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:$,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:e1}),n1=es({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(e,r){return"xlink:"+r.slice(5).toLowerCase()}}),t1=es({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:r1}),a1=es({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(e,r){return"xml:"+r.slice(3).toLowerCase()}}),Eq={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},kq=/[A-Z]/g,Ug=/-[a-z]/g,Pq=/^data[-\w.:]+$/i;function Tq(e,r){const n=vm(r);let t=r,a=_r;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)==="data"&&Pq.test(r)){if(r.charAt(4)==="-"){const o=r.slice(5).replace(Ug,Aq);t="data"+o.charAt(0).toUpperCase()+o.slice(1)}else{const o=r.slice(4);if(!Ug.test(o)){let s=o.replace(kq,zq);s.charAt(0)!=="-"&&(s="-"+s),r="data"+s}}a=cf}return new a(t,r)}function zq(e){return"-"+e.toLowerCase()}function Aq(e){return e.charAt(1).toUpperCase()}const qq=Jw([Zw,Cq,n1,t1,a1],"html"),uf=Jw([Zw,Nq,n1,t1,a1],"svg");function Rq(e){return e.join(" ").trim()}var df={},Vg=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,_q=/\n/g,Oq=/^\s*/,Iq=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,Mq=/^:\s*/,Lq=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,Fq=/^[;\s]*/,Dq=/^\s+|\s+$/g,Bq=`
`,Hg="/",Qg="*",xa="",$q="comment",Uq="declaration";function Vq(e,r){if(typeof e!="string")throw new TypeError("First argument must be a string");if(!e)return[];r=r||{};var n=1,t=1;function a(y){var g=y.match(_q);g&&(n+=g.length);var b=y.lastIndexOf(Bq);t=~b?y.length-b:t+y.length}function o(){var y={line:n,column:t};return function(g){return g.position=new s(y),u(),g}}function s(y){this.start=y,this.end={line:n,column:t},this.source=r.source}s.prototype.content=e;function l(y){var g=new Error(r.source+":"+n+":"+t+": "+y);if(g.reason=y,g.filename=r.source,g.line=n,g.column=t,g.source=e,!r.silent)throw g}function c(y){var g=y.exec(e);if(g){var b=g[0];return a(b),e=e.slice(b.length),g}}function u(){c(Oq)}function d(y){var g;for(y=y||[];g=m();)g!==!1&&y.push(g);return y}function m(){var y=o();if(!(Hg!=e.charAt(0)||Qg!=e.charAt(1))){for(var g=2;xa!=e.charAt(g)&&(Qg!=e.charAt(g)||Hg!=e.charAt(g+1));)++g;if(g+=2,xa===e.charAt(g-1))return l("End of comment missing");var b=e.slice(2,g-2);return t+=2,a(b),e=e.slice(g),t+=2,y({type:$q,comment:b})}}function f(){var y=o(),g=c(Iq);if(g){if(m(),!c(Mq))return l("property missing ':'");var b=c(Lq),h=y({type:Uq,property:Wg(g[0].replace(Vg,xa)),value:b?Wg(b[0].replace(Vg,xa)):xa});return c(Fq),h}}function p(){var y=[];d(y);for(var g;g=f();)g!==!1&&(y.push(g),d(y));return y}return u(),p()}function Wg(e){return e?e.replace(Dq,xa):xa}var Hq=Vq,Qq=bl&&bl.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(df,"__esModule",{value:!0});df.default=Gq;const Wq=Qq(Hq);function Gq(e,r){let n=null;if(!e||typeof e!="string")return n;const t=(0,Wq.default)(e),a=typeof r=="function";return t.forEach(o=>{if(o.type!=="declaration")return;const{property:s,value:l}=o;a?r(s,l,o):l&&(n=n||{},n[s]=l)}),n}var Lc={};Object.defineProperty(Lc,"__esModule",{value:!0});Lc.camelCase=void 0;var Yq=/^--[a-zA-Z0-9_-]+$/,Kq=/-([a-z])/g,Xq=/^[^-]+$/,Jq=/^-(webkit|moz|ms|o|khtml)-/,Zq=/^-(ms)-/,eR=function(e){return!e||Xq.test(e)||Yq.test(e)},rR=function(e,r){return r.toUpperCase()},Gg=function(e,r){return"".concat(r,"-")},nR=function(e,r){return r===void 0&&(r={}),eR(e)?e:(e=e.toLowerCase(),r.reactCompat?e=e.replace(Zq,Gg):e=e.replace(Jq,Gg),e.replace(Kq,rR))};Lc.camelCase=nR;var tR=bl&&bl.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},aR=tR(df),oR=Lc;function bm(e,r){var n={};return!e||typeof e!="string"||(0,aR.default)(e,function(t,a){t&&a&&(n[(0,oR.camelCase)(t,r)]=a)}),n}bm.default=bm;var sR=bm;const iR=na(sR),o1=s1("end"),mf=s1("start");function s1(e){return r;function r(n){const t=n&&n.position&&n.position[e]||{};if(typeof t.line=="number"&&t.line>0&&typeof t.column=="number"&&t.column>0)return{line:t.line,column:t.column,offset:typeof t.offset=="number"&&t.offset>-1?t.offset:void 0}}}function lR(e){const r=mf(e),n=o1(e);if(r&&n)return{start:r,end:n}}function Os(e){return!e||typeof e!="object"?"":"position"in e||"type"in e?Yg(e.position):"start"in e||"end"in e?Yg(e):"line"in e||"column"in e?wm(e):""}function wm(e){return Kg(e&&e.line)+":"+Kg(e&&e.column)}function Yg(e){return wm(e&&e.start)+"-"+wm(e&&e.end)}function Kg(e){return e&&typeof e=="number"?e:1}class dr extends Error{constructor(r,n,t){super(),typeof n=="string"&&(t=n,n=void 0);let a="",o={},s=!1;if(n&&("line"in n&&"column"in n?o={place:n}:"start"in n&&"end"in n?o={place:n}:"type"in n?o={ancestors:[n],place:n.position}:o={...n}),typeof r=="string"?a=r:!o.cause&&r&&(s=!0,a=r.message,o.cause=r),!o.ruleId&&!o.source&&typeof t=="string"){const c=t.indexOf(":");c===-1?o.ruleId=t:(o.source=t.slice(0,c),o.ruleId=t.slice(c+1))}if(!o.place&&o.ancestors&&o.ancestors){const c=o.ancestors[o.ancestors.length-1];c&&(o.place=c.position)}const l=o.place&&"start"in o.place?o.place.start:o.place;this.ancestors=o.ancestors||void 0,this.cause=o.cause||void 0,this.column=l?l.column:void 0,this.fatal=void 0,this.file="",this.message=a,this.line=l?l.line:void 0,this.name=Os(o.place)||"1:1",this.place=o.place||void 0,this.reason=this.message,this.ruleId=o.ruleId||void 0,this.source=o.source||void 0,this.stack=s&&o.cause&&typeof o.cause.stack=="string"?o.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}dr.prototype.file="";dr.prototype.name="";dr.prototype.reason="";dr.prototype.message="";dr.prototype.stack="";dr.prototype.column=void 0;dr.prototype.line=void 0;dr.prototype.ancestors=void 0;dr.prototype.cause=void 0;dr.prototype.fatal=void 0;dr.prototype.place=void 0;dr.prototype.ruleId=void 0;dr.prototype.source=void 0;const pf={}.hasOwnProperty,cR=new Map,uR=/[A-Z]/g,dR=new Set(["table","tbody","thead","tfoot","tr"]),mR=new Set(["td","th"]),i1="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function pR(e,r){if(!r||r.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const n=r.filePath||void 0;let t;if(r.development){if(typeof r.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");t=wR(n,r.jsxDEV)}else{if(typeof r.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof r.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");t=bR(n,r.jsx,r.jsxs)}const a={Fragment:r.Fragment,ancestors:[],components:r.components||{},create:t,elementAttributeNameCase:r.elementAttributeNameCase||"react",evaluater:r.createEvaluater?r.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:r.ignoreInvalidStyle||!1,passKeys:r.passKeys!==!1,passNode:r.passNode||!1,schema:r.space==="svg"?uf:qq,stylePropertyNameCase:r.stylePropertyNameCase||"dom",tableCellAlignToStyle:r.tableCellAlignToStyle!==!1},o=l1(a,e,void 0);return o&&typeof o!="string"?o:a.create(e,a.Fragment,{children:o||void 0},void 0)}function l1(e,r,n){if(r.type==="element")return fR(e,r,n);if(r.type==="mdxFlowExpression"||r.type==="mdxTextExpression")return hR(e,r);if(r.type==="mdxJsxFlowElement"||r.type==="mdxJsxTextElement")return vR(e,r,n);if(r.type==="mdxjsEsm")return gR(e,r);if(r.type==="root")return xR(e,r,n);if(r.type==="text")return yR(e,r)}function fR(e,r,n){const t=e.schema;let a=t;r.tagName.toLowerCase()==="svg"&&t.space==="html"&&(a=uf,e.schema=a),e.ancestors.push(r);const o=u1(e,r.tagName,!1),s=jR(e,r);let l=hf(e,r);return dR.has(r.tagName)&&(l=l.filter(function(c){return typeof c=="string"?!jq(c):!0})),c1(e,s,o,r),ff(s,l),e.ancestors.pop(),e.schema=t,e.create(r,o,s,n)}function hR(e,r){if(r.data&&r.data.estree&&e.evaluater){const t=r.data.estree.body[0];return t.type,e.evaluater.evaluateExpression(t.expression)}li(e,r.position)}function gR(e,r){if(r.data&&r.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(r.data.estree);li(e,r.position)}function vR(e,r,n){const t=e.schema;let a=t;r.name==="svg"&&t.space==="html"&&(a=uf,e.schema=a),e.ancestors.push(r);const o=r.name===null?e.Fragment:u1(e,r.name,!0),s=SR(e,r),l=hf(e,r);return c1(e,s,o,r),ff(s,l),e.ancestors.pop(),e.schema=t,e.create(r,o,s,n)}function xR(e,r,n){const t={};return ff(t,hf(e,r)),e.create(r,e.Fragment,t,n)}function yR(e,r){return r.value}function c1(e,r,n,t){typeof n!="string"&&n!==e.Fragment&&e.passNode&&(r.node=t)}function ff(e,r){if(r.length>0){const n=r.length>1?r:r[0];n&&(e.children=n)}}function bR(e,r,n){return t;function t(a,o,s,l){const u=Array.isArray(s.children)?n:r;return l?u(o,s,l):u(o,s)}}function wR(e,r){return n;function n(t,a,o,s){const l=Array.isArray(o.children),c=mf(t);return r(a,o,s,l,{columnNumber:c?c.column-1:void 0,fileName:e,lineNumber:c?c.line:void 0},void 0)}}function jR(e,r){const n={};let t,a;for(a in r.properties)if(a!=="children"&&pf.call(r.properties,a)){const o=CR(e,a,r.properties[a]);if(o){const[s,l]=o;e.tableCellAlignToStyle&&s==="align"&&typeof l=="string"&&mR.has(r.tagName)?t=l:n[s]=l}}if(t){const o=n.style||(n.style={});o[e.stylePropertyNameCase==="css"?"text-align":"textAlign"]=t}return n}function SR(e,r){const n={};for(const t of r.attributes)if(t.type==="mdxJsxExpressionAttribute")if(t.data&&t.data.estree&&e.evaluater){const o=t.data.estree.body[0];o.type;const s=o.expression;s.type;const l=s.properties[0];l.type,Object.assign(n,e.evaluater.evaluateExpression(l.argument))}else li(e,r.position);else{const a=t.name;let o;if(t.value&&typeof t.value=="object")if(t.value.data&&t.value.data.estree&&e.evaluater){const l=t.value.data.estree.body[0];l.type,o=e.evaluater.evaluateExpression(l.expression)}else li(e,r.position);else o=t.value===null?!0:t.value;n[a]=o}return n}function hf(e,r){const n=[];let t=-1;const a=e.passKeys?new Map:cR;for(;++t<r.children.length;){const o=r.children[t];let s;if(e.passKeys){const c=o.type==="element"?o.tagName:o.type==="mdxJsxFlowElement"||o.type==="mdxJsxTextElement"?o.name:void 0;if(c){const u=a.get(c)||0;s=c+"-"+u,a.set(c,u+1)}}const l=l1(e,o,s);l!==void 0&&n.push(l)}return n}function CR(e,r,n){const t=Tq(e.schema,r);if(!(n==null||typeof n=="number"&&Number.isNaN(n))){if(Array.isArray(n)&&(n=t.commaSeparated?vq(n):Rq(n)),t.property==="style"){let a=typeof n=="object"?n:NR(e,String(n));return e.stylePropertyNameCase==="css"&&(a=ER(a)),["style",a]}return[e.elementAttributeNameCase==="react"&&t.space?Eq[t.property]||t.property:t.attribute,n]}}function NR(e,r){try{return iR(r,{reactCompat:!0})}catch(n){if(e.ignoreInvalidStyle)return{};const t=n,a=new dr("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:t,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw a.file=e.filePath||void 0,a.url=i1+"#cannot-parse-style-attribute",a}}function u1(e,r,n){let t;if(!n)t={type:"Literal",value:r};else if(r.includes(".")){const a=r.split(".");let o=-1,s;for(;++o<a.length;){const l=Dg(a[o])?{type:"Identifier",name:a[o]}:{type:"Literal",value:a[o]};s=s?{type:"MemberExpression",object:s,property:l,computed:!!(o&&l.type==="Literal"),optional:!1}:l}t=s}else t=Dg(r)&&!/^[a-z]/.test(r)?{type:"Identifier",name:r}:{type:"Literal",value:r};if(t.type==="Literal"){const a=t.value;return pf.call(e.components,a)?e.components[a]:a}if(e.evaluater)return e.evaluater.evaluateExpression(t);li(e)}function li(e,r){const n=new dr("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:r,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw n.file=e.filePath||void 0,n.url=i1+"#cannot-handle-mdx-estrees-without-createevaluater",n}function ER(e){const r={};let n;for(n in e)pf.call(e,n)&&(r[kR(n)]=e[n]);return r}function kR(e){let r=e.replace(uR,PR);return r.slice(0,3)==="ms-"&&(r="-"+r),r}function PR(e){return"-"+e.toLowerCase()}const _u={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},TR={};function zR(e,r){const n=TR,t=typeof n.includeImageAlt=="boolean"?n.includeImageAlt:!0,a=typeof n.includeHtml=="boolean"?n.includeHtml:!0;return d1(e,t,a)}function d1(e,r,n){if(AR(e)){if("value"in e)return e.type==="html"&&!n?"":e.value;if(r&&"alt"in e&&e.alt)return e.alt;if("children"in e)return Xg(e.children,r,n)}return Array.isArray(e)?Xg(e,r,n):""}function Xg(e,r,n){const t=[];let a=-1;for(;++a<e.length;)t[a]=d1(e[a],r,n);return t.join("")}function AR(e){return!!(e&&typeof e=="object")}const Jg=document.createElement("i");function gf(e){const r="&"+e+";";Jg.innerHTML=r;const n=Jg.textContent;return n.charCodeAt(n.length-1)===59&&e!=="semi"||n===r?!1:n}function Hn(e,r,n,t){const a=e.length;let o=0,s;if(r<0?r=-r>a?0:a+r:r=r>a?a:r,n=n>0?n:0,t.length<1e4)s=Array.from(t),s.unshift(r,n),e.splice(...s);else for(n&&e.splice(r,n);o<t.length;)s=t.slice(o,o+1e4),s.unshift(r,0),e.splice(...s),o+=1e4,r+=1e4}function nn(e,r){return e.length>0?(Hn(e,e.length,0,r),e):r}const Zg={}.hasOwnProperty;function qR(e){const r={};let n=-1;for(;++n<e.length;)RR(r,e[n]);return r}function RR(e,r){let n;for(n in r){const a=(Zg.call(e,n)?e[n]:void 0)||(e[n]={}),o=r[n];let s;if(o)for(s in o){Zg.call(a,s)||(a[s]=[]);const l=o[s];_R(a[s],Array.isArray(l)?l:l?[l]:[])}}}function _R(e,r){let n=-1;const t=[];for(;++n<r.length;)(r[n].add==="after"?e:t).push(r[n]);Hn(e,0,0,t)}function m1(e,r){const n=Number.parseInt(e,r);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)===65535||(n&65535)===65534||n>1114111?"�":String.fromCodePoint(n)}function jo(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const Ln=ca(/[A-Za-z]/),Vr=ca(/[\dA-Za-z]/),OR=ca(/[#-'*+\--9=?A-Z^-~]/);function jm(e){return e!==null&&(e<32||e===127)}const Sm=ca(/\d/),IR=ca(/[\dA-Fa-f]/),MR=ca(/[!-/:-@[-`{-~]/);function ee(e){return e!==null&&e<-2}function Rr(e){return e!==null&&(e<0||e===32)}function ve(e){return e===-2||e===-1||e===32}const LR=ca(new RegExp("\\p{P}|\\p{S}","u")),FR=ca(/\s/);function ca(e){return r;function r(n){return n!==null&&n>-1&&e.test(String.fromCharCode(n))}}function rs(e){const r=[];let n=-1,t=0,a=0;for(;++n<e.length;){const o=e.charCodeAt(n);let s="";if(o===37&&Vr(e.charCodeAt(n+1))&&Vr(e.charCodeAt(n+2)))a=2;else if(o<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o))||(s=String.fromCharCode(o));else if(o>55295&&o<57344){const l=e.charCodeAt(n+1);o<56320&&l>56319&&l<57344?(s=String.fromCharCode(o,l),a=1):s="�"}else s=String.fromCharCode(o);s&&(r.push(e.slice(t,n),encodeURIComponent(s)),t=n+a+1,s=""),a&&(n+=a,a=0)}return r.join("")+e.slice(t)}function Ee(e,r,n,t){const a=t?t-1:Number.POSITIVE_INFINITY;let o=0;return s;function s(c){return ve(c)?(e.enter(n),l(c)):r(c)}function l(c){return ve(c)&&o++<a?(e.consume(c),l):(e.exit(n),r(c))}}const DR={tokenize:BR};function BR(e){const r=e.attempt(this.parser.constructs.contentInitial,t,a);let n;return r;function t(l){if(l===null){e.consume(l);return}return e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),Ee(e,r,"linePrefix")}function a(l){return e.enter("paragraph"),o(l)}function o(l){const c=e.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=c),n=c,s(l)}function s(l){if(l===null){e.exit("chunkText"),e.exit("paragraph"),e.consume(l);return}return ee(l)?(e.consume(l),e.exit("chunkText"),o):(e.consume(l),s)}}const $R={tokenize:UR},ev={tokenize:VR};function UR(e){const r=this,n=[];let t=0,a,o,s;return l;function l(w){if(t<n.length){const j=n[t];return r.containerState=j[1],e.attempt(j[0].continuation,c,u)(w)}return u(w)}function c(w){if(t++,r.containerState._closeFlow){r.containerState._closeFlow=void 0,a&&v();const j=r.events.length;let E=j,N;for(;E--;)if(r.events[E][0]==="exit"&&r.events[E][1].type==="chunkFlow"){N=r.events[E][1].end;break}h(t);let P=j;for(;P<r.events.length;)r.events[P][1].end={...N},P++;return Hn(r.events,E+1,0,r.events.slice(j)),r.events.length=P,u(w)}return l(w)}function u(w){if(t===n.length){if(!a)return f(w);if(a.currentConstruct&&a.currentConstruct.concrete)return y(w);r.interrupt=!!(a.currentConstruct&&!a._gfmTableDynamicInterruptHack)}return r.containerState={},e.check(ev,d,m)(w)}function d(w){return a&&v(),h(t),f(w)}function m(w){return r.parser.lazy[r.now().line]=t!==n.length,s=r.now().offset,y(w)}function f(w){return r.containerState={},e.attempt(ev,p,y)(w)}function p(w){return t++,n.push([r.currentConstruct,r.containerState]),f(w)}function y(w){if(w===null){a&&v(),h(0),e.consume(w);return}return a=a||r.parser.flow(r.now()),e.enter("chunkFlow",{_tokenizer:a,contentType:"flow",previous:o}),g(w)}function g(w){if(w===null){b(e.exit("chunkFlow"),!0),h(0),e.consume(w);return}return ee(w)?(e.consume(w),b(e.exit("chunkFlow")),t=0,r.interrupt=void 0,l):(e.consume(w),g)}function b(w,j){const E=r.sliceStream(w);if(j&&E.push(null),w.previous=o,o&&(o.next=w),o=w,a.defineSkip(w.start),a.write(E),r.parser.lazy[w.start.line]){let N=a.events.length;for(;N--;)if(a.events[N][1].start.offset<s&&(!a.events[N][1].end||a.events[N][1].end.offset>s))return;const P=r.events.length;let k=P,z,A;for(;k--;)if(r.events[k][0]==="exit"&&r.events[k][1].type==="chunkFlow"){if(z){A=r.events[k][1].end;break}z=!0}for(h(t),N=P;N<r.events.length;)r.events[N][1].end={...A},N++;Hn(r.events,k+1,0,r.events.slice(P)),r.events.length=N}}function h(w){let j=n.length;for(;j-- >w;){const E=n[j];r.containerState=E[1],E[0].exit.call(r,e)}n.length=w}function v(){a.write([null]),o=void 0,a=void 0,r.containerState._closeFlow=void 0}}function VR(e,r,n){return Ee(e,e.attempt(this.parser.constructs.document,r,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function rv(e){if(e===null||Rr(e)||FR(e))return 1;if(LR(e))return 2}function vf(e,r,n){const t=[];let a=-1;for(;++a<e.length;){const o=e[a].resolveAll;o&&!t.includes(o)&&(r=o(r,n),t.push(o))}return r}const Cm={name:"attention",resolveAll:HR,tokenize:QR};function HR(e,r){let n=-1,t,a,o,s,l,c,u,d;for(;++n<e.length;)if(e[n][0]==="enter"&&e[n][1].type==="attentionSequence"&&e[n][1]._close){for(t=n;t--;)if(e[t][0]==="exit"&&e[t][1].type==="attentionSequence"&&e[t][1]._open&&r.sliceSerialize(e[t][1]).charCodeAt(0)===r.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[t][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[t][1].end.offset-e[t][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;c=e[t][1].end.offset-e[t][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1;const m={...e[t][1].end},f={...e[n][1].start};nv(m,-c),nv(f,c),s={type:c>1?"strongSequence":"emphasisSequence",start:m,end:{...e[t][1].end}},l={type:c>1?"strongSequence":"emphasisSequence",start:{...e[n][1].start},end:f},o={type:c>1?"strongText":"emphasisText",start:{...e[t][1].end},end:{...e[n][1].start}},a={type:c>1?"strong":"emphasis",start:{...s.start},end:{...l.end}},e[t][1].end={...s.start},e[n][1].start={...l.end},u=[],e[t][1].end.offset-e[t][1].start.offset&&(u=nn(u,[["enter",e[t][1],r],["exit",e[t][1],r]])),u=nn(u,[["enter",a,r],["enter",s,r],["exit",s,r],["enter",o,r]]),u=nn(u,vf(r.parser.constructs.insideSpan.null,e.slice(t+1,n),r)),u=nn(u,[["exit",o,r],["enter",l,r],["exit",l,r],["exit",a,r]]),e[n][1].end.offset-e[n][1].start.offset?(d=2,u=nn(u,[["enter",e[n][1],r],["exit",e[n][1],r]])):d=0,Hn(e,t-1,n-t+3,u),n=t+u.length-d-2;break}}for(n=-1;++n<e.length;)e[n][1].type==="attentionSequence"&&(e[n][1].type="data");return e}function QR(e,r){const n=this.parser.constructs.attentionMarkers.null,t=this.previous,a=rv(t);let o;return s;function s(c){return o=c,e.enter("attentionSequence"),l(c)}function l(c){if(c===o)return e.consume(c),l;const u=e.exit("attentionSequence"),d=rv(c),m=!d||d===2&&a||n.includes(c),f=!a||a===2&&d||n.includes(t);return u._open=!!(o===42?m:m&&(a||!f)),u._close=!!(o===42?f:f&&(d||!m)),r(c)}}function nv(e,r){e.column+=r,e.offset+=r,e._bufferIndex+=r}const WR={name:"autolink",tokenize:GR};function GR(e,r,n){let t=0;return a;function a(p){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),o}function o(p){return Ln(p)?(e.consume(p),s):p===64?n(p):u(p)}function s(p){return p===43||p===45||p===46||Vr(p)?(t=1,l(p)):u(p)}function l(p){return p===58?(e.consume(p),t=0,c):(p===43||p===45||p===46||Vr(p))&&t++<32?(e.consume(p),l):(t=0,u(p))}function c(p){return p===62?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),r):p===null||p===32||p===60||jm(p)?n(p):(e.consume(p),c)}function u(p){return p===64?(e.consume(p),d):OR(p)?(e.consume(p),u):n(p)}function d(p){return Vr(p)?m(p):n(p)}function m(p){return p===46?(e.consume(p),t=0,d):p===62?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),r):f(p)}function f(p){if((p===45||Vr(p))&&t++<63){const y=p===45?f:m;return e.consume(p),y}return n(p)}}const Fc={partial:!0,tokenize:YR};function YR(e,r,n){return t;function t(o){return ve(o)?Ee(e,a,"linePrefix")(o):a(o)}function a(o){return o===null||ee(o)?r(o):n(o)}}const p1={continuation:{tokenize:XR},exit:JR,name:"blockQuote",tokenize:KR};function KR(e,r,n){const t=this;return a;function a(s){if(s===62){const l=t.containerState;return l.open||(e.enter("blockQuote",{_container:!0}),l.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(s),e.exit("blockQuoteMarker"),o}return n(s)}function o(s){return ve(s)?(e.enter("blockQuotePrefixWhitespace"),e.consume(s),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),r):(e.exit("blockQuotePrefix"),r(s))}}function XR(e,r,n){const t=this;return a;function a(s){return ve(s)?Ee(e,o,"linePrefix",t.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(s):o(s)}function o(s){return e.attempt(p1,r,n)(s)}}function JR(e){e.exit("blockQuote")}const f1={name:"characterEscape",tokenize:ZR};function ZR(e,r,n){return t;function t(o){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(o),e.exit("escapeMarker"),a}function a(o){return MR(o)?(e.enter("characterEscapeValue"),e.consume(o),e.exit("characterEscapeValue"),e.exit("characterEscape"),r):n(o)}}const h1={name:"characterReference",tokenize:e_};function e_(e,r,n){const t=this;let a=0,o,s;return l;function l(m){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(m),e.exit("characterReferenceMarker"),c}function c(m){return m===35?(e.enter("characterReferenceMarkerNumeric"),e.consume(m),e.exit("characterReferenceMarkerNumeric"),u):(e.enter("characterReferenceValue"),o=31,s=Vr,d(m))}function u(m){return m===88||m===120?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(m),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),o=6,s=IR,d):(e.enter("characterReferenceValue"),o=7,s=Sm,d(m))}function d(m){if(m===59&&a){const f=e.exit("characterReferenceValue");return s===Vr&&!gf(t.sliceSerialize(f))?n(m):(e.enter("characterReferenceMarker"),e.consume(m),e.exit("characterReferenceMarker"),e.exit("characterReference"),r)}return s(m)&&a++<o?(e.consume(m),d):n(m)}}const tv={partial:!0,tokenize:n_},av={concrete:!0,name:"codeFenced",tokenize:r_};function r_(e,r,n){const t=this,a={partial:!0,tokenize:E};let o=0,s=0,l;return c;function c(N){return u(N)}function u(N){const P=t.events[t.events.length-1];return o=P&&P[1].type==="linePrefix"?P[2].sliceSerialize(P[1],!0).length:0,l=N,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),d(N)}function d(N){return N===l?(s++,e.consume(N),d):s<3?n(N):(e.exit("codeFencedFenceSequence"),ve(N)?Ee(e,m,"whitespace")(N):m(N))}function m(N){return N===null||ee(N)?(e.exit("codeFencedFence"),t.interrupt?r(N):e.check(tv,g,j)(N)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),f(N))}function f(N){return N===null||ee(N)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),m(N)):ve(N)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),Ee(e,p,"whitespace")(N)):N===96&&N===l?n(N):(e.consume(N),f)}function p(N){return N===null||ee(N)?m(N):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),y(N))}function y(N){return N===null||ee(N)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),m(N)):N===96&&N===l?n(N):(e.consume(N),y)}function g(N){return e.attempt(a,j,b)(N)}function b(N){return e.enter("lineEnding"),e.consume(N),e.exit("lineEnding"),h}function h(N){return o>0&&ve(N)?Ee(e,v,"linePrefix",o+1)(N):v(N)}function v(N){return N===null||ee(N)?e.check(tv,g,j)(N):(e.enter("codeFlowValue"),w(N))}function w(N){return N===null||ee(N)?(e.exit("codeFlowValue"),v(N)):(e.consume(N),w)}function j(N){return e.exit("codeFenced"),r(N)}function E(N,P,k){let z=0;return A;function A(U){return N.enter("lineEnding"),N.consume(U),N.exit("lineEnding"),I}function I(U){return N.enter("codeFencedFence"),ve(U)?Ee(N,_,"linePrefix",t.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(U):_(U)}function _(U){return U===l?(N.enter("codeFencedFenceSequence"),V(U)):k(U)}function V(U){return U===l?(z++,N.consume(U),V):z>=s?(N.exit("codeFencedFenceSequence"),ve(U)?Ee(N,L,"whitespace")(U):L(U)):k(U)}function L(U){return U===null||ee(U)?(N.exit("codeFencedFence"),P(U)):k(U)}}}function n_(e,r,n){const t=this;return a;function a(s){return s===null?n(s):(e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),o)}function o(s){return t.parser.lazy[t.now().line]?n(s):r(s)}}const Ou={name:"codeIndented",tokenize:a_},t_={partial:!0,tokenize:o_};function a_(e,r,n){const t=this;return a;function a(u){return e.enter("codeIndented"),Ee(e,o,"linePrefix",5)(u)}function o(u){const d=t.events[t.events.length-1];return d&&d[1].type==="linePrefix"&&d[2].sliceSerialize(d[1],!0).length>=4?s(u):n(u)}function s(u){return u===null?c(u):ee(u)?e.attempt(t_,s,c)(u):(e.enter("codeFlowValue"),l(u))}function l(u){return u===null||ee(u)?(e.exit("codeFlowValue"),s(u)):(e.consume(u),l)}function c(u){return e.exit("codeIndented"),r(u)}}function o_(e,r,n){const t=this;return a;function a(s){return t.parser.lazy[t.now().line]?n(s):ee(s)?(e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),a):Ee(e,o,"linePrefix",5)(s)}function o(s){const l=t.events[t.events.length-1];return l&&l[1].type==="linePrefix"&&l[2].sliceSerialize(l[1],!0).length>=4?r(s):ee(s)?a(s):n(s)}}const s_={name:"codeText",previous:l_,resolve:i_,tokenize:c_};function i_(e){let r=e.length-4,n=3,t,a;if((e[n][1].type==="lineEnding"||e[n][1].type==="space")&&(e[r][1].type==="lineEnding"||e[r][1].type==="space")){for(t=n;++t<r;)if(e[t][1].type==="codeTextData"){e[n][1].type="codeTextPadding",e[r][1].type="codeTextPadding",n+=2,r-=2;break}}for(t=n-1,r++;++t<=r;)a===void 0?t!==r&&e[t][1].type!=="lineEnding"&&(a=t):(t===r||e[t][1].type==="lineEnding")&&(e[a][1].type="codeTextData",t!==a+2&&(e[a][1].end=e[t-1][1].end,e.splice(a+2,t-a-2),r-=t-a-2,t=a+2),a=void 0);return e}function l_(e){return e!==96||this.events[this.events.length-1][1].type==="characterEscape"}function c_(e,r,n){let t=0,a,o;return s;function s(m){return e.enter("codeText"),e.enter("codeTextSequence"),l(m)}function l(m){return m===96?(e.consume(m),t++,l):(e.exit("codeTextSequence"),c(m))}function c(m){return m===null?n(m):m===32?(e.enter("space"),e.consume(m),e.exit("space"),c):m===96?(o=e.enter("codeTextSequence"),a=0,d(m)):ee(m)?(e.enter("lineEnding"),e.consume(m),e.exit("lineEnding"),c):(e.enter("codeTextData"),u(m))}function u(m){return m===null||m===32||m===96||ee(m)?(e.exit("codeTextData"),c(m)):(e.consume(m),u)}function d(m){return m===96?(e.consume(m),a++,d):a===t?(e.exit("codeTextSequence"),e.exit("codeText"),r(m)):(o.type="codeTextData",u(m))}}class u_{constructor(r){this.left=r?[...r]:[],this.right=[]}get(r){if(r<0||r>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+r+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return r<this.left.length?this.left[r]:this.right[this.right.length-r+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(r,n){const t=n??Number.POSITIVE_INFINITY;return t<this.left.length?this.left.slice(r,t):r>this.left.length?this.right.slice(this.right.length-t+this.left.length,this.right.length-r+this.left.length).reverse():this.left.slice(r).concat(this.right.slice(this.right.length-t+this.left.length).reverse())}splice(r,n,t){const a=n||0;this.setCursor(Math.trunc(r));const o=this.right.splice(this.right.length-a,Number.POSITIVE_INFINITY);return t&&hs(this.left,t),o.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(r){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(r)}pushMany(r){this.setCursor(Number.POSITIVE_INFINITY),hs(this.left,r)}unshift(r){this.setCursor(0),this.right.push(r)}unshiftMany(r){this.setCursor(0),hs(this.right,r.reverse())}setCursor(r){if(!(r===this.left.length||r>this.left.length&&this.right.length===0||r<0&&this.left.length===0))if(r<this.left.length){const n=this.left.splice(r,Number.POSITIVE_INFINITY);hs(this.right,n.reverse())}else{const n=this.right.splice(this.left.length+this.right.length-r,Number.POSITIVE_INFINITY);hs(this.left,n.reverse())}}}function hs(e,r){let n=0;if(r.length<1e4)e.push(...r);else for(;n<r.length;)e.push(...r.slice(n,n+1e4)),n+=1e4}function g1(e){const r={};let n=-1,t,a,o,s,l,c,u;const d=new u_(e);for(;++n<d.length;){for(;n in r;)n=r[n];if(t=d.get(n),n&&t[1].type==="chunkFlow"&&d.get(n-1)[1].type==="listItemPrefix"&&(c=t[1]._tokenizer.events,o=0,o<c.length&&c[o][1].type==="lineEndingBlank"&&(o+=2),o<c.length&&c[o][1].type==="content"))for(;++o<c.length&&c[o][1].type!=="content";)c[o][1].type==="chunkText"&&(c[o][1]._isInFirstContentOfListItem=!0,o++);if(t[0]==="enter")t[1].contentType&&(Object.assign(r,d_(d,n)),n=r[n],u=!0);else if(t[1]._container){for(o=n,a=void 0;o--;)if(s=d.get(o),s[1].type==="lineEnding"||s[1].type==="lineEndingBlank")s[0]==="enter"&&(a&&(d.get(a)[1].type="lineEndingBlank"),s[1].type="lineEnding",a=o);else if(!(s[1].type==="linePrefix"||s[1].type==="listItemIndent"))break;a&&(t[1].end={...d.get(a)[1].start},l=d.slice(a,n),l.unshift(t),d.splice(a,n-a+1,l))}}return Hn(e,0,Number.POSITIVE_INFINITY,d.slice(0)),!u}function d_(e,r){const n=e.get(r)[1],t=e.get(r)[2];let a=r-1;const o=[];let s=n._tokenizer;s||(s=t.parser[n.contentType](n.start),n._contentTypeTextTrailing&&(s._contentTypeTextTrailing=!0));const l=s.events,c=[],u={};let d,m,f=-1,p=n,y=0,g=0;const b=[g];for(;p;){for(;e.get(++a)[1]!==p;);o.push(a),p._tokenizer||(d=t.sliceStream(p),p.next||d.push(null),m&&s.defineSkip(p.start),p._isInFirstContentOfListItem&&(s._gfmTasklistFirstContentOfListItem=!0),s.write(d),p._isInFirstContentOfListItem&&(s._gfmTasklistFirstContentOfListItem=void 0)),m=p,p=p.next}for(p=n;++f<l.length;)l[f][0]==="exit"&&l[f-1][0]==="enter"&&l[f][1].type===l[f-1][1].type&&l[f][1].start.line!==l[f][1].end.line&&(g=f+1,b.push(g),p._tokenizer=void 0,p.previous=void 0,p=p.next);for(s.events=[],p?(p._tokenizer=void 0,p.previous=void 0):b.pop(),f=b.length;f--;){const h=l.slice(b[f],b[f+1]),v=o.pop();c.push([v,v+h.length-1]),e.splice(v,2,h)}for(c.reverse(),f=-1;++f<c.length;)u[y+c[f][0]]=y+c[f][1],y+=c[f][1]-c[f][0]-1;return u}const m_={resolve:f_,tokenize:h_},p_={partial:!0,tokenize:g_};function f_(e){return g1(e),e}function h_(e,r){let n;return t;function t(l){return e.enter("content"),n=e.enter("chunkContent",{contentType:"content"}),a(l)}function a(l){return l===null?o(l):ee(l)?e.check(p_,s,o)(l):(e.consume(l),a)}function o(l){return e.exit("chunkContent"),e.exit("content"),r(l)}function s(l){return e.consume(l),e.exit("chunkContent"),n.next=e.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,a}}function g_(e,r,n){const t=this;return a;function a(s){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),Ee(e,o,"linePrefix")}function o(s){if(s===null||ee(s))return n(s);const l=t.events[t.events.length-1];return!t.parser.constructs.disable.null.includes("codeIndented")&&l&&l[1].type==="linePrefix"&&l[2].sliceSerialize(l[1],!0).length>=4?r(s):e.interrupt(t.parser.constructs.flow,n,r)(s)}}function v1(e,r,n,t,a,o,s,l,c){const u=c||Number.POSITIVE_INFINITY;let d=0;return m;function m(h){return h===60?(e.enter(t),e.enter(a),e.enter(o),e.consume(h),e.exit(o),f):h===null||h===32||h===41||jm(h)?n(h):(e.enter(t),e.enter(s),e.enter(l),e.enter("chunkString",{contentType:"string"}),g(h))}function f(h){return h===62?(e.enter(o),e.consume(h),e.exit(o),e.exit(a),e.exit(t),r):(e.enter(l),e.enter("chunkString",{contentType:"string"}),p(h))}function p(h){return h===62?(e.exit("chunkString"),e.exit(l),f(h)):h===null||h===60||ee(h)?n(h):(e.consume(h),h===92?y:p)}function y(h){return h===60||h===62||h===92?(e.consume(h),p):p(h)}function g(h){return!d&&(h===null||h===41||Rr(h))?(e.exit("chunkString"),e.exit(l),e.exit(s),e.exit(t),r(h)):d<u&&h===40?(e.consume(h),d++,g):h===41?(e.consume(h),d--,g):h===null||h===32||h===40||jm(h)?n(h):(e.consume(h),h===92?b:g)}function b(h){return h===40||h===41||h===92?(e.consume(h),g):g(h)}}function x1(e,r,n,t,a,o){const s=this;let l=0,c;return u;function u(p){return e.enter(t),e.enter(a),e.consume(p),e.exit(a),e.enter(o),d}function d(p){return l>999||p===null||p===91||p===93&&!c||p===94&&!l&&"_hiddenFootnoteSupport"in s.parser.constructs?n(p):p===93?(e.exit(o),e.enter(a),e.consume(p),e.exit(a),e.exit(t),r):ee(p)?(e.enter("lineEnding"),e.consume(p),e.exit("lineEnding"),d):(e.enter("chunkString",{contentType:"string"}),m(p))}function m(p){return p===null||p===91||p===93||ee(p)||l++>999?(e.exit("chunkString"),d(p)):(e.consume(p),c||(c=!ve(p)),p===92?f:m)}function f(p){return p===91||p===92||p===93?(e.consume(p),l++,m):m(p)}}function y1(e,r,n,t,a,o){let s;return l;function l(f){return f===34||f===39||f===40?(e.enter(t),e.enter(a),e.consume(f),e.exit(a),s=f===40?41:f,c):n(f)}function c(f){return f===s?(e.enter(a),e.consume(f),e.exit(a),e.exit(t),r):(e.enter(o),u(f))}function u(f){return f===s?(e.exit(o),c(s)):f===null?n(f):ee(f)?(e.enter("lineEnding"),e.consume(f),e.exit("lineEnding"),Ee(e,u,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),d(f))}function d(f){return f===s||f===null||ee(f)?(e.exit("chunkString"),u(f)):(e.consume(f),f===92?m:d)}function m(f){return f===s||f===92?(e.consume(f),d):d(f)}}function Is(e,r){let n;return t;function t(a){return ee(a)?(e.enter("lineEnding"),e.consume(a),e.exit("lineEnding"),n=!0,t):ve(a)?Ee(e,t,n?"linePrefix":"lineSuffix")(a):r(a)}}const v_={name:"definition",tokenize:y_},x_={partial:!0,tokenize:b_};function y_(e,r,n){const t=this;let a;return o;function o(p){return e.enter("definition"),s(p)}function s(p){return x1.call(t,e,l,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(p)}function l(p){return a=jo(t.sliceSerialize(t.events[t.events.length-1][1]).slice(1,-1)),p===58?(e.enter("definitionMarker"),e.consume(p),e.exit("definitionMarker"),c):n(p)}function c(p){return Rr(p)?Is(e,u)(p):u(p)}function u(p){return v1(e,d,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(p)}function d(p){return e.attempt(x_,m,m)(p)}function m(p){return ve(p)?Ee(e,f,"whitespace")(p):f(p)}function f(p){return p===null||ee(p)?(e.exit("definition"),t.parser.defined.push(a),r(p)):n(p)}}function b_(e,r,n){return t;function t(l){return Rr(l)?Is(e,a)(l):n(l)}function a(l){return y1(e,o,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(l)}function o(l){return ve(l)?Ee(e,s,"whitespace")(l):s(l)}function s(l){return l===null||ee(l)?r(l):n(l)}}const w_={name:"hardBreakEscape",tokenize:j_};function j_(e,r,n){return t;function t(o){return e.enter("hardBreakEscape"),e.consume(o),a}function a(o){return ee(o)?(e.exit("hardBreakEscape"),r(o)):n(o)}}const S_={name:"headingAtx",resolve:C_,tokenize:N_};function C_(e,r){let n=e.length-2,t=3,a,o;return e[t][1].type==="whitespace"&&(t+=2),n-2>t&&e[n][1].type==="whitespace"&&(n-=2),e[n][1].type==="atxHeadingSequence"&&(t===n-1||n-4>t&&e[n-2][1].type==="whitespace")&&(n-=t+1===n?2:4),n>t&&(a={type:"atxHeadingText",start:e[t][1].start,end:e[n][1].end},o={type:"chunkText",start:e[t][1].start,end:e[n][1].end,contentType:"text"},Hn(e,t,n-t+1,[["enter",a,r],["enter",o,r],["exit",o,r],["exit",a,r]])),e}function N_(e,r,n){let t=0;return a;function a(d){return e.enter("atxHeading"),o(d)}function o(d){return e.enter("atxHeadingSequence"),s(d)}function s(d){return d===35&&t++<6?(e.consume(d),s):d===null||Rr(d)?(e.exit("atxHeadingSequence"),l(d)):n(d)}function l(d){return d===35?(e.enter("atxHeadingSequence"),c(d)):d===null||ee(d)?(e.exit("atxHeading"),r(d)):ve(d)?Ee(e,l,"whitespace")(d):(e.enter("atxHeadingText"),u(d))}function c(d){return d===35?(e.consume(d),c):(e.exit("atxHeadingSequence"),l(d))}function u(d){return d===null||d===35||Rr(d)?(e.exit("atxHeadingText"),l(d)):(e.consume(d),u)}}const E_=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],ov=["pre","script","style","textarea"],k_={concrete:!0,name:"htmlFlow",resolveTo:z_,tokenize:A_},P_={partial:!0,tokenize:R_},T_={partial:!0,tokenize:q_};function z_(e){let r=e.length;for(;r--&&!(e[r][0]==="enter"&&e[r][1].type==="htmlFlow"););return r>1&&e[r-2][1].type==="linePrefix"&&(e[r][1].start=e[r-2][1].start,e[r+1][1].start=e[r-2][1].start,e.splice(r-2,2)),e}function A_(e,r,n){const t=this;let a,o,s,l,c;return u;function u(C){return d(C)}function d(C){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(C),m}function m(C){return C===33?(e.consume(C),f):C===47?(e.consume(C),o=!0,g):C===63?(e.consume(C),a=3,t.interrupt?r:S):Ln(C)?(e.consume(C),s=String.fromCharCode(C),b):n(C)}function f(C){return C===45?(e.consume(C),a=2,p):C===91?(e.consume(C),a=5,l=0,y):Ln(C)?(e.consume(C),a=4,t.interrupt?r:S):n(C)}function p(C){return C===45?(e.consume(C),t.interrupt?r:S):n(C)}function y(C){const W="CDATA[";return C===W.charCodeAt(l++)?(e.consume(C),l===W.length?t.interrupt?r:_:y):n(C)}function g(C){return Ln(C)?(e.consume(C),s=String.fromCharCode(C),b):n(C)}function b(C){if(C===null||C===47||C===62||Rr(C)){const W=C===47,re=s.toLowerCase();return!W&&!o&&ov.includes(re)?(a=1,t.interrupt?r(C):_(C)):E_.includes(s.toLowerCase())?(a=6,W?(e.consume(C),h):t.interrupt?r(C):_(C)):(a=7,t.interrupt&&!t.parser.lazy[t.now().line]?n(C):o?v(C):w(C))}return C===45||Vr(C)?(e.consume(C),s+=String.fromCharCode(C),b):n(C)}function h(C){return C===62?(e.consume(C),t.interrupt?r:_):n(C)}function v(C){return ve(C)?(e.consume(C),v):A(C)}function w(C){return C===47?(e.consume(C),A):C===58||C===95||Ln(C)?(e.consume(C),j):ve(C)?(e.consume(C),w):A(C)}function j(C){return C===45||C===46||C===58||C===95||Vr(C)?(e.consume(C),j):E(C)}function E(C){return C===61?(e.consume(C),N):ve(C)?(e.consume(C),E):w(C)}function N(C){return C===null||C===60||C===61||C===62||C===96?n(C):C===34||C===39?(e.consume(C),c=C,P):ve(C)?(e.consume(C),N):k(C)}function P(C){return C===c?(e.consume(C),c=null,z):C===null||ee(C)?n(C):(e.consume(C),P)}function k(C){return C===null||C===34||C===39||C===47||C===60||C===61||C===62||C===96||Rr(C)?E(C):(e.consume(C),k)}function z(C){return C===47||C===62||ve(C)?w(C):n(C)}function A(C){return C===62?(e.consume(C),I):n(C)}function I(C){return C===null||ee(C)?_(C):ve(C)?(e.consume(C),I):n(C)}function _(C){return C===45&&a===2?(e.consume(C),Q):C===60&&a===1?(e.consume(C),R):C===62&&a===4?(e.consume(C),Y):C===63&&a===3?(e.consume(C),S):C===93&&a===5?(e.consume(C),O):ee(C)&&(a===6||a===7)?(e.exit("htmlFlowData"),e.check(P_,F,V)(C)):C===null||ee(C)?(e.exit("htmlFlowData"),V(C)):(e.consume(C),_)}function V(C){return e.check(T_,L,F)(C)}function L(C){return e.enter("lineEnding"),e.consume(C),e.exit("lineEnding"),U}function U(C){return C===null||ee(C)?V(C):(e.enter("htmlFlowData"),_(C))}function Q(C){return C===45?(e.consume(C),S):_(C)}function R(C){return C===47?(e.consume(C),s="",q):_(C)}function q(C){if(C===62){const W=s.toLowerCase();return ov.includes(W)?(e.consume(C),Y):_(C)}return Ln(C)&&s.length<8?(e.consume(C),s+=String.fromCharCode(C),q):_(C)}function O(C){return C===93?(e.consume(C),S):_(C)}function S(C){return C===62?(e.consume(C),Y):C===45&&a===2?(e.consume(C),S):_(C)}function Y(C){return C===null||ee(C)?(e.exit("htmlFlowData"),F(C)):(e.consume(C),Y)}function F(C){return e.exit("htmlFlow"),r(C)}}function q_(e,r,n){const t=this;return a;function a(s){return ee(s)?(e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),o):n(s)}function o(s){return t.parser.lazy[t.now().line]?n(s):r(s)}}function R_(e,r,n){return t;function t(a){return e.enter("lineEnding"),e.consume(a),e.exit("lineEnding"),e.attempt(Fc,r,n)}}const __={name:"htmlText",tokenize:O_};function O_(e,r,n){const t=this;let a,o,s;return l;function l(S){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(S),c}function c(S){return S===33?(e.consume(S),u):S===47?(e.consume(S),E):S===63?(e.consume(S),w):Ln(S)?(e.consume(S),k):n(S)}function u(S){return S===45?(e.consume(S),d):S===91?(e.consume(S),o=0,y):Ln(S)?(e.consume(S),v):n(S)}function d(S){return S===45?(e.consume(S),p):n(S)}function m(S){return S===null?n(S):S===45?(e.consume(S),f):ee(S)?(s=m,R(S)):(e.consume(S),m)}function f(S){return S===45?(e.consume(S),p):m(S)}function p(S){return S===62?Q(S):S===45?f(S):m(S)}function y(S){const Y="CDATA[";return S===Y.charCodeAt(o++)?(e.consume(S),o===Y.length?g:y):n(S)}function g(S){return S===null?n(S):S===93?(e.consume(S),b):ee(S)?(s=g,R(S)):(e.consume(S),g)}function b(S){return S===93?(e.consume(S),h):g(S)}function h(S){return S===62?Q(S):S===93?(e.consume(S),h):g(S)}function v(S){return S===null||S===62?Q(S):ee(S)?(s=v,R(S)):(e.consume(S),v)}function w(S){return S===null?n(S):S===63?(e.consume(S),j):ee(S)?(s=w,R(S)):(e.consume(S),w)}function j(S){return S===62?Q(S):w(S)}function E(S){return Ln(S)?(e.consume(S),N):n(S)}function N(S){return S===45||Vr(S)?(e.consume(S),N):P(S)}function P(S){return ee(S)?(s=P,R(S)):ve(S)?(e.consume(S),P):Q(S)}function k(S){return S===45||Vr(S)?(e.consume(S),k):S===47||S===62||Rr(S)?z(S):n(S)}function z(S){return S===47?(e.consume(S),Q):S===58||S===95||Ln(S)?(e.consume(S),A):ee(S)?(s=z,R(S)):ve(S)?(e.consume(S),z):Q(S)}function A(S){return S===45||S===46||S===58||S===95||Vr(S)?(e.consume(S),A):I(S)}function I(S){return S===61?(e.consume(S),_):ee(S)?(s=I,R(S)):ve(S)?(e.consume(S),I):z(S)}function _(S){return S===null||S===60||S===61||S===62||S===96?n(S):S===34||S===39?(e.consume(S),a=S,V):ee(S)?(s=_,R(S)):ve(S)?(e.consume(S),_):(e.consume(S),L)}function V(S){return S===a?(e.consume(S),a=void 0,U):S===null?n(S):ee(S)?(s=V,R(S)):(e.consume(S),V)}function L(S){return S===null||S===34||S===39||S===60||S===61||S===96?n(S):S===47||S===62||Rr(S)?z(S):(e.consume(S),L)}function U(S){return S===47||S===62||Rr(S)?z(S):n(S)}function Q(S){return S===62?(e.consume(S),e.exit("htmlTextData"),e.exit("htmlText"),r):n(S)}function R(S){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(S),e.exit("lineEnding"),q}function q(S){return ve(S)?Ee(e,O,"linePrefix",t.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(S):O(S)}function O(S){return e.enter("htmlTextData"),s(S)}}const xf={name:"labelEnd",resolveAll:F_,resolveTo:D_,tokenize:B_},I_={tokenize:$_},M_={tokenize:U_},L_={tokenize:V_};function F_(e){let r=-1;const n=[];for(;++r<e.length;){const t=e[r][1];if(n.push(e[r]),t.type==="labelImage"||t.type==="labelLink"||t.type==="labelEnd"){const a=t.type==="labelImage"?4:2;t.type="data",r+=a}}return e.length!==n.length&&Hn(e,0,e.length,n),e}function D_(e,r){let n=e.length,t=0,a,o,s,l;for(;n--;)if(a=e[n][1],o){if(a.type==="link"||a.type==="labelLink"&&a._inactive)break;e[n][0]==="enter"&&a.type==="labelLink"&&(a._inactive=!0)}else if(s){if(e[n][0]==="enter"&&(a.type==="labelImage"||a.type==="labelLink")&&!a._balanced&&(o=n,a.type!=="labelLink")){t=2;break}}else a.type==="labelEnd"&&(s=n);const c={type:e[o][1].type==="labelLink"?"link":"image",start:{...e[o][1].start},end:{...e[e.length-1][1].end}},u={type:"label",start:{...e[o][1].start},end:{...e[s][1].end}},d={type:"labelText",start:{...e[o+t+2][1].end},end:{...e[s-2][1].start}};return l=[["enter",c,r],["enter",u,r]],l=nn(l,e.slice(o+1,o+t+3)),l=nn(l,[["enter",d,r]]),l=nn(l,vf(r.parser.constructs.insideSpan.null,e.slice(o+t+4,s-3),r)),l=nn(l,[["exit",d,r],e[s-2],e[s-1],["exit",u,r]]),l=nn(l,e.slice(s+1)),l=nn(l,[["exit",c,r]]),Hn(e,o,e.length,l),e}function B_(e,r,n){const t=this;let a=t.events.length,o,s;for(;a--;)if((t.events[a][1].type==="labelImage"||t.events[a][1].type==="labelLink")&&!t.events[a][1]._balanced){o=t.events[a][1];break}return l;function l(f){return o?o._inactive?m(f):(s=t.parser.defined.includes(jo(t.sliceSerialize({start:o.end,end:t.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(f),e.exit("labelMarker"),e.exit("labelEnd"),c):n(f)}function c(f){return f===40?e.attempt(I_,d,s?d:m)(f):f===91?e.attempt(M_,d,s?u:m)(f):s?d(f):m(f)}function u(f){return e.attempt(L_,d,m)(f)}function d(f){return r(f)}function m(f){return o._balanced=!0,n(f)}}function $_(e,r,n){return t;function t(m){return e.enter("resource"),e.enter("resourceMarker"),e.consume(m),e.exit("resourceMarker"),a}function a(m){return Rr(m)?Is(e,o)(m):o(m)}function o(m){return m===41?d(m):v1(e,s,l,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(m)}function s(m){return Rr(m)?Is(e,c)(m):d(m)}function l(m){return n(m)}function c(m){return m===34||m===39||m===40?y1(e,u,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(m):d(m)}function u(m){return Rr(m)?Is(e,d)(m):d(m)}function d(m){return m===41?(e.enter("resourceMarker"),e.consume(m),e.exit("resourceMarker"),e.exit("resource"),r):n(m)}}function U_(e,r,n){const t=this;return a;function a(l){return x1.call(t,e,o,s,"reference","referenceMarker","referenceString")(l)}function o(l){return t.parser.defined.includes(jo(t.sliceSerialize(t.events[t.events.length-1][1]).slice(1,-1)))?r(l):n(l)}function s(l){return n(l)}}function V_(e,r,n){return t;function t(o){return e.enter("reference"),e.enter("referenceMarker"),e.consume(o),e.exit("referenceMarker"),a}function a(o){return o===93?(e.enter("referenceMarker"),e.consume(o),e.exit("referenceMarker"),e.exit("reference"),r):n(o)}}const H_={name:"labelStartImage",resolveAll:xf.resolveAll,tokenize:Q_};function Q_(e,r,n){const t=this;return a;function a(l){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(l),e.exit("labelImageMarker"),o}function o(l){return l===91?(e.enter("labelMarker"),e.consume(l),e.exit("labelMarker"),e.exit("labelImage"),s):n(l)}function s(l){return l===94&&"_hiddenFootnoteSupport"in t.parser.constructs?n(l):r(l)}}const W_={name:"labelStartLink",resolveAll:xf.resolveAll,tokenize:G_};function G_(e,r,n){const t=this;return a;function a(s){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(s),e.exit("labelMarker"),e.exit("labelLink"),o}function o(s){return s===94&&"_hiddenFootnoteSupport"in t.parser.constructs?n(s):r(s)}}const Iu={name:"lineEnding",tokenize:Y_};function Y_(e,r){return n;function n(t){return e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),Ee(e,r,"linePrefix")}}const xl={name:"thematicBreak",tokenize:K_};function K_(e,r,n){let t=0,a;return o;function o(u){return e.enter("thematicBreak"),s(u)}function s(u){return a=u,l(u)}function l(u){return u===a?(e.enter("thematicBreakSequence"),c(u)):t>=3&&(u===null||ee(u))?(e.exit("thematicBreak"),r(u)):n(u)}function c(u){return u===a?(e.consume(u),t++,c):(e.exit("thematicBreakSequence"),ve(u)?Ee(e,l,"whitespace")(u):l(u))}}const Sr={continuation:{tokenize:eO},exit:nO,name:"list",tokenize:Z_},X_={partial:!0,tokenize:tO},J_={partial:!0,tokenize:rO};function Z_(e,r,n){const t=this,a=t.events[t.events.length-1];let o=a&&a[1].type==="linePrefix"?a[2].sliceSerialize(a[1],!0).length:0,s=0;return l;function l(p){const y=t.containerState.type||(p===42||p===43||p===45?"listUnordered":"listOrdered");if(y==="listUnordered"?!t.containerState.marker||p===t.containerState.marker:Sm(p)){if(t.containerState.type||(t.containerState.type=y,e.enter(y,{_container:!0})),y==="listUnordered")return e.enter("listItemPrefix"),p===42||p===45?e.check(xl,n,u)(p):u(p);if(!t.interrupt||p===49)return e.enter("listItemPrefix"),e.enter("listItemValue"),c(p)}return n(p)}function c(p){return Sm(p)&&++s<10?(e.consume(p),c):(!t.interrupt||s<2)&&(t.containerState.marker?p===t.containerState.marker:p===41||p===46)?(e.exit("listItemValue"),u(p)):n(p)}function u(p){return e.enter("listItemMarker"),e.consume(p),e.exit("listItemMarker"),t.containerState.marker=t.containerState.marker||p,e.check(Fc,t.interrupt?n:d,e.attempt(X_,f,m))}function d(p){return t.containerState.initialBlankLine=!0,o++,f(p)}function m(p){return ve(p)?(e.enter("listItemPrefixWhitespace"),e.consume(p),e.exit("listItemPrefixWhitespace"),f):n(p)}function f(p){return t.containerState.size=o+t.sliceSerialize(e.exit("listItemPrefix"),!0).length,r(p)}}function eO(e,r,n){const t=this;return t.containerState._closeFlow=void 0,e.check(Fc,a,o);function a(l){return t.containerState.furtherBlankLines=t.containerState.furtherBlankLines||t.containerState.initialBlankLine,Ee(e,r,"listItemIndent",t.containerState.size+1)(l)}function o(l){return t.containerState.furtherBlankLines||!ve(l)?(t.containerState.furtherBlankLines=void 0,t.containerState.initialBlankLine=void 0,s(l)):(t.containerState.furtherBlankLines=void 0,t.containerState.initialBlankLine=void 0,e.attempt(J_,r,s)(l))}function s(l){return t.containerState._closeFlow=!0,t.interrupt=void 0,Ee(e,e.attempt(Sr,r,n),"linePrefix",t.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(l)}}function rO(e,r,n){const t=this;return Ee(e,a,"listItemIndent",t.containerState.size+1);function a(o){const s=t.events[t.events.length-1];return s&&s[1].type==="listItemIndent"&&s[2].sliceSerialize(s[1],!0).length===t.containerState.size?r(o):n(o)}}function nO(e){e.exit(this.containerState.type)}function tO(e,r,n){const t=this;return Ee(e,a,"listItemPrefixWhitespace",t.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function a(o){const s=t.events[t.events.length-1];return!ve(o)&&s&&s[1].type==="listItemPrefixWhitespace"?r(o):n(o)}}const sv={name:"setextUnderline",resolveTo:aO,tokenize:oO};function aO(e,r){let n=e.length,t,a,o;for(;n--;)if(e[n][0]==="enter"){if(e[n][1].type==="content"){t=n;break}e[n][1].type==="paragraph"&&(a=n)}else e[n][1].type==="content"&&e.splice(n,1),!o&&e[n][1].type==="definition"&&(o=n);const s={type:"setextHeading",start:{...e[t][1].start},end:{...e[e.length-1][1].end}};return e[a][1].type="setextHeadingText",o?(e.splice(a,0,["enter",s,r]),e.splice(o+1,0,["exit",e[t][1],r]),e[t][1].end={...e[o][1].end}):e[t][1]=s,e.push(["exit",s,r]),e}function oO(e,r,n){const t=this;let a;return o;function o(u){let d=t.events.length,m;for(;d--;)if(t.events[d][1].type!=="lineEnding"&&t.events[d][1].type!=="linePrefix"&&t.events[d][1].type!=="content"){m=t.events[d][1].type==="paragraph";break}return!t.parser.lazy[t.now().line]&&(t.interrupt||m)?(e.enter("setextHeadingLine"),a=u,s(u)):n(u)}function s(u){return e.enter("setextHeadingLineSequence"),l(u)}function l(u){return u===a?(e.consume(u),l):(e.exit("setextHeadingLineSequence"),ve(u)?Ee(e,c,"lineSuffix")(u):c(u))}function c(u){return u===null||ee(u)?(e.exit("setextHeadingLine"),r(u)):n(u)}}const sO={tokenize:iO};function iO(e){const r=this,n=e.attempt(Fc,t,e.attempt(this.parser.constructs.flowInitial,a,Ee(e,e.attempt(this.parser.constructs.flow,a,e.attempt(m_,a)),"linePrefix")));return n;function t(o){if(o===null){e.consume(o);return}return e.enter("lineEndingBlank"),e.consume(o),e.exit("lineEndingBlank"),r.currentConstruct=void 0,n}function a(o){if(o===null){e.consume(o);return}return e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),r.currentConstruct=void 0,n}}const lO={resolveAll:w1()},cO=b1("string"),uO=b1("text");function b1(e){return{resolveAll:w1(e==="text"?dO:void 0),tokenize:r};function r(n){const t=this,a=this.parser.constructs[e],o=n.attempt(a,s,l);return s;function s(d){return u(d)?o(d):l(d)}function l(d){if(d===null){n.consume(d);return}return n.enter("data"),n.consume(d),c}function c(d){return u(d)?(n.exit("data"),o(d)):(n.consume(d),c)}function u(d){if(d===null)return!0;const m=a[d];let f=-1;if(m)for(;++f<m.length;){const p=m[f];if(!p.previous||p.previous.call(t,t.previous))return!0}return!1}}}function w1(e){return r;function r(n,t){let a=-1,o;for(;++a<=n.length;)o===void 0?n[a]&&n[a][1].type==="data"&&(o=a,a++):(!n[a]||n[a][1].type!=="data")&&(a!==o+2&&(n[o][1].end=n[a-1][1].end,n.splice(o+2,a-o-2),a=o+2),o=void 0);return e?e(n,t):n}}function dO(e,r){let n=0;for(;++n<=e.length;)if((n===e.length||e[n][1].type==="lineEnding")&&e[n-1][1].type==="data"){const t=e[n-1][1],a=r.sliceStream(t);let o=a.length,s=-1,l=0,c;for(;o--;){const u=a[o];if(typeof u=="string"){for(s=u.length;u.charCodeAt(s-1)===32;)l++,s--;if(s)break;s=-1}else if(u===-2)c=!0,l++;else if(u!==-1){o++;break}}if(r._contentTypeTextTrailing&&n===e.length&&(l=0),l){const u={type:n===e.length||c||l<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:o?s:t.start._bufferIndex+s,_index:t.start._index+o,line:t.end.line,column:t.end.column-l,offset:t.end.offset-l},end:{...t.end}};t.end={...u.start},t.start.offset===t.end.offset?Object.assign(t,u):(e.splice(n,0,["enter",u,r],["exit",u,r]),n+=2)}n++}return e}const mO={42:Sr,43:Sr,45:Sr,48:Sr,49:Sr,50:Sr,51:Sr,52:Sr,53:Sr,54:Sr,55:Sr,56:Sr,57:Sr,62:p1},pO={91:v_},fO={[-2]:Ou,[-1]:Ou,32:Ou},hO={35:S_,42:xl,45:[sv,xl],60:k_,61:sv,95:xl,96:av,126:av},gO={38:h1,92:f1},vO={[-5]:Iu,[-4]:Iu,[-3]:Iu,33:H_,38:h1,42:Cm,60:[WR,__],91:W_,92:[w_,f1],93:xf,95:Cm,96:s_},xO={null:[Cm,lO]},yO={null:[42,95]},bO={null:[]},wO=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:yO,contentInitial:pO,disable:bO,document:mO,flow:hO,flowInitial:fO,insideSpan:xO,string:gO,text:vO},Symbol.toStringTag,{value:"Module"}));function jO(e,r,n){let t={_bufferIndex:-1,_index:0,line:n&&n.line||1,column:n&&n.column||1,offset:n&&n.offset||0};const a={},o=[];let s=[],l=[];const c={attempt:P(E),check:P(N),consume:v,enter:w,exit:j,interrupt:P(N,{interrupt:!0})},u={code:null,containerState:{},defineSkip:g,events:[],now:y,parser:e,previous:null,sliceSerialize:f,sliceStream:p,write:m};let d=r.tokenize.call(u,c);return r.resolveAll&&o.push(r),u;function m(I){return s=nn(s,I),b(),s[s.length-1]!==null?[]:(k(r,0),u.events=vf(o,u.events,u),u.events)}function f(I,_){return CO(p(I),_)}function p(I){return SO(s,I)}function y(){const{_bufferIndex:I,_index:_,line:V,column:L,offset:U}=t;return{_bufferIndex:I,_index:_,line:V,column:L,offset:U}}function g(I){a[I.line]=I.column,A()}function b(){let I;for(;t._index<s.length;){const _=s[t._index];if(typeof _=="string")for(I=t._index,t._bufferIndex<0&&(t._bufferIndex=0);t._index===I&&t._bufferIndex<_.length;)h(_.charCodeAt(t._bufferIndex));else h(_)}}function h(I){d=d(I)}function v(I){ee(I)?(t.line++,t.column=1,t.offset+=I===-3?2:1,A()):I!==-1&&(t.column++,t.offset++),t._bufferIndex<0?t._index++:(t._bufferIndex++,t._bufferIndex===s[t._index].length&&(t._bufferIndex=-1,t._index++)),u.previous=I}function w(I,_){const V=_||{};return V.type=I,V.start=y(),u.events.push(["enter",V,u]),l.push(V),V}function j(I){const _=l.pop();return _.end=y(),u.events.push(["exit",_,u]),_}function E(I,_){k(I,_.from)}function N(I,_){_.restore()}function P(I,_){return V;function V(L,U,Q){let R,q,O,S;return Array.isArray(L)?F(L):"tokenize"in L?F([L]):Y(L);function Y(te){return X;function X(Fe){const Ge=Fe!==null&&te[Fe],Xe=Fe!==null&&te.null,ar=[...Array.isArray(Ge)?Ge:Ge?[Ge]:[],...Array.isArray(Xe)?Xe:Xe?[Xe]:[]];return F(ar)(Fe)}}function F(te){return R=te,q=0,te.length===0?Q:C(te[q])}function C(te){return X;function X(Fe){return S=z(),O=te,te.partial||(u.currentConstruct=te),te.name&&u.parser.constructs.disable.null.includes(te.name)?re():te.tokenize.call(_?Object.assign(Object.create(u),_):u,c,W,re)(Fe)}}function W(te){return I(O,S),U}function re(te){return S.restore(),++q<R.length?C(R[q]):Q}}}function k(I,_){I.resolveAll&&!o.includes(I)&&o.push(I),I.resolve&&Hn(u.events,_,u.events.length-_,I.resolve(u.events.slice(_),u)),I.resolveTo&&(u.events=I.resolveTo(u.events,u))}function z(){const I=y(),_=u.previous,V=u.currentConstruct,L=u.events.length,U=Array.from(l);return{from:L,restore:Q};function Q(){t=I,u.previous=_,u.currentConstruct=V,u.events.length=L,l=U,A()}}function A(){t.line in a&&t.column<2&&(t.column=a[t.line],t.offset+=a[t.line]-1)}}function SO(e,r){const n=r.start._index,t=r.start._bufferIndex,a=r.end._index,o=r.end._bufferIndex;let s;if(n===a)s=[e[n].slice(t,o)];else{if(s=e.slice(n,a),t>-1){const l=s[0];typeof l=="string"?s[0]=l.slice(t):s.shift()}o>0&&s.push(e[a].slice(0,o))}return s}function CO(e,r){let n=-1;const t=[];let a;for(;++n<e.length;){const o=e[n];let s;if(typeof o=="string")s=o;else switch(o){case-5:{s="\r";break}case-4:{s=`
`;break}case-3:{s=`\r
`;break}case-2:{s=r?" ":"	";break}case-1:{if(!r&&a)continue;s=" ";break}default:s=String.fromCharCode(o)}a=o===-2,t.push(s)}return t.join("")}function NO(e){const t={constructs:qR([wO,...(e||{}).extensions||[]]),content:a(DR),defined:[],document:a($R),flow:a(sO),lazy:{},string:a(cO),text:a(uO)};return t;function a(o){return s;function s(l){return jO(t,o,l)}}}function EO(e){for(;!g1(e););return e}const iv=/[\0\t\n\r]/g;function kO(){let e=1,r="",n=!0,t;return a;function a(o,s,l){const c=[];let u,d,m,f,p;for(o=r+(typeof o=="string"?o.toString():new TextDecoder(s||void 0).decode(o)),m=0,r="",n&&(o.charCodeAt(0)===65279&&m++,n=void 0);m<o.length;){if(iv.lastIndex=m,u=iv.exec(o),f=u&&u.index!==void 0?u.index:o.length,p=o.charCodeAt(f),!u){r=o.slice(m);break}if(p===10&&m===f&&t)c.push(-3),t=void 0;else switch(t&&(c.push(-5),t=void 0),m<f&&(c.push(o.slice(m,f)),e+=f-m),p){case 0:{c.push(65533),e++;break}case 9:{for(d=Math.ceil(e/4)*4,c.push(-2);e++<d;)c.push(-1);break}case 10:{c.push(-4),e=1;break}default:t=!0,e=1}m=f+1}return l&&(t&&c.push(-5),r&&c.push(r),c.push(null)),c}}const PO=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function TO(e){return e.replace(PO,zO)}function zO(e,r,n){if(r)return r;if(n.charCodeAt(0)===35){const a=n.charCodeAt(1),o=a===120||a===88;return m1(n.slice(o?2:1),o?16:10)}return gf(n)||e}const j1={}.hasOwnProperty;function AO(e,r,n){return typeof r!="string"&&(n=r,r=void 0),qO(n)(EO(NO(n).document().write(kO()(e,r,!0))))}function qO(e){const r={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:o(Yn),autolinkProtocol:z,autolinkEmail:z,atxHeading:o(wr),blockQuote:o(Xe),characterEscape:z,characterReference:z,codeFenced:o(ar),codeFencedFenceInfo:s,codeFencedFenceMeta:s,codeIndented:o(ar,s),codeText:o(cn,s),codeTextData:z,data:z,codeFlowValue:z,definition:o(Or),definitionDestinationString:s,definitionLabelString:s,definitionTitleString:s,emphasis:o(Gn),hardBreakEscape:o(mr),hardBreakTrailing:o(mr),htmlFlow:o(Wa,s),htmlFlowData:z,htmlText:o(Wa,s),htmlTextData:z,image:o(ua),label:s,link:o(Yn),listItem:o(da),listItemValue:f,listOrdered:o(ns,m),listUnordered:o(ns),paragraph:o(ki),reference:C,referenceString:s,resourceDestinationString:s,resourceTitleString:s,setextHeading:o(wr),strong:o(Kn),thematicBreak:o(Uc)},exit:{atxHeading:c(),atxHeadingSequence:E,autolink:c(),autolinkEmail:Ge,autolinkProtocol:Fe,blockQuote:c(),characterEscapeValue:A,characterReferenceMarkerHexadecimal:re,characterReferenceMarkerNumeric:re,characterReferenceValue:te,characterReference:X,codeFenced:c(b),codeFencedFence:g,codeFencedFenceInfo:p,codeFencedFenceMeta:y,codeFlowValue:A,codeIndented:c(h),codeText:c(U),codeTextData:A,data:A,definition:c(),definitionDestinationString:j,definitionLabelString:v,definitionTitleString:w,emphasis:c(),hardBreakEscape:c(_),hardBreakTrailing:c(_),htmlFlow:c(V),htmlFlowData:A,htmlText:c(L),htmlTextData:A,image:c(R),label:O,labelText:q,lineEnding:I,link:c(Q),listItem:c(),listOrdered:c(),listUnordered:c(),paragraph:c(),referenceString:W,resourceDestinationString:S,resourceTitleString:Y,resource:F,setextHeading:c(k),setextHeadingLineSequence:P,setextHeadingText:N,strong:c(),thematicBreak:c()}};S1(r,(e||{}).mdastExtensions||[]);const n={};return t;function t(M){let H={type:"root",children:[]};const ne={stack:[H],tokenStack:[],config:r,enter:l,exit:u,buffer:s,resume:d,data:n},ce=[];let he=-1;for(;++he<M.length;)if(M[he][1].type==="listOrdered"||M[he][1].type==="listUnordered")if(M[he][0]==="enter")ce.push(he);else{const Ir=ce.pop();he=a(M,Ir,he)}for(he=-1;++he<M.length;){const Ir=r[M[he][0]];j1.call(Ir,M[he][1].type)&&Ir[M[he][1].type].call(Object.assign({sliceSerialize:M[he][2].sliceSerialize},ne),M[he][1])}if(ne.tokenStack.length>0){const Ir=ne.tokenStack[ne.tokenStack.length-1];(Ir[1]||lv).call(ne,void 0,Ir[0])}for(H.position={start:jt(M.length>0?M[0][1].start:{line:1,column:1,offset:0}),end:jt(M.length>0?M[M.length-2][1].end:{line:1,column:1,offset:0})},he=-1;++he<r.transforms.length;)H=r.transforms[he](H)||H;return H}function a(M,H,ne){let ce=H-1,he=-1,Ir=!1,Tn,Mr,Kr,ft;for(;++ce<=ne;){const $e=M[ce];switch($e[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{$e[0]==="enter"?he++:he--,ft=void 0;break}case"lineEndingBlank":{$e[0]==="enter"&&(Tn&&!ft&&!he&&!Kr&&(Kr=ce),ft=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:ft=void 0}if(!he&&$e[0]==="enter"&&$e[1].type==="listItemPrefix"||he===-1&&$e[0]==="exit"&&($e[1].type==="listUnordered"||$e[1].type==="listOrdered")){if(Tn){let ht=ce;for(Mr=void 0;ht--;){const un=M[ht];if(un[1].type==="lineEnding"||un[1].type==="lineEndingBlank"){if(un[0]==="exit")continue;Mr&&(M[Mr][1].type="lineEndingBlank",Ir=!0),un[1].type="lineEnding",Mr=ht}else if(!(un[1].type==="linePrefix"||un[1].type==="blockQuotePrefix"||un[1].type==="blockQuotePrefixWhitespace"||un[1].type==="blockQuoteMarker"||un[1].type==="listItemIndent"))break}Kr&&(!Mr||Kr<Mr)&&(Tn._spread=!0),Tn.end=Object.assign({},Mr?M[Mr][1].start:$e[1].end),M.splice(Mr||ce,0,["exit",Tn,$e[2]]),ce++,ne++}if($e[1].type==="listItemPrefix"){const ht={type:"listItem",_spread:!1,start:Object.assign({},$e[1].start),end:void 0};Tn=ht,M.splice(ce,0,["enter",ht,$e[2]]),ce++,ne++,Kr=void 0,ft=!0}}}return M[H][1]._spread=Ir,ne}function o(M,H){return ne;function ne(ce){l.call(this,M(ce),ce),H&&H.call(this,ce)}}function s(){this.stack.push({type:"fragment",children:[]})}function l(M,H,ne){this.stack[this.stack.length-1].children.push(M),this.stack.push(M),this.tokenStack.push([H,ne||void 0]),M.position={start:jt(H.start),end:void 0}}function c(M){return H;function H(ne){M&&M.call(this,ne),u.call(this,ne)}}function u(M,H){const ne=this.stack.pop(),ce=this.tokenStack.pop();if(ce)ce[0].type!==M.type&&(H?H.call(this,M,ce[0]):(ce[1]||lv).call(this,M,ce[0]));else throw new Error("Cannot close `"+M.type+"` ("+Os({start:M.start,end:M.end})+"): it’s not open");ne.position.end=jt(M.end)}function d(){return zR(this.stack.pop())}function m(){this.data.expectingFirstListItemValue=!0}function f(M){if(this.data.expectingFirstListItemValue){const H=this.stack[this.stack.length-2];H.start=Number.parseInt(this.sliceSerialize(M),10),this.data.expectingFirstListItemValue=void 0}}function p(){const M=this.resume(),H=this.stack[this.stack.length-1];H.lang=M}function y(){const M=this.resume(),H=this.stack[this.stack.length-1];H.meta=M}function g(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function b(){const M=this.resume(),H=this.stack[this.stack.length-1];H.value=M.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function h(){const M=this.resume(),H=this.stack[this.stack.length-1];H.value=M.replace(/(\r?\n|\r)$/g,"")}function v(M){const H=this.resume(),ne=this.stack[this.stack.length-1];ne.label=H,ne.identifier=jo(this.sliceSerialize(M)).toLowerCase()}function w(){const M=this.resume(),H=this.stack[this.stack.length-1];H.title=M}function j(){const M=this.resume(),H=this.stack[this.stack.length-1];H.url=M}function E(M){const H=this.stack[this.stack.length-1];if(!H.depth){const ne=this.sliceSerialize(M).length;H.depth=ne}}function N(){this.data.setextHeadingSlurpLineEnding=!0}function P(M){const H=this.stack[this.stack.length-1];H.depth=this.sliceSerialize(M).codePointAt(0)===61?1:2}function k(){this.data.setextHeadingSlurpLineEnding=void 0}function z(M){const ne=this.stack[this.stack.length-1].children;let ce=ne[ne.length-1];(!ce||ce.type!=="text")&&(ce=$c(),ce.position={start:jt(M.start),end:void 0},ne.push(ce)),this.stack.push(ce)}function A(M){const H=this.stack.pop();H.value+=this.sliceSerialize(M),H.position.end=jt(M.end)}function I(M){const H=this.stack[this.stack.length-1];if(this.data.atHardBreak){const ne=H.children[H.children.length-1];ne.position.end=jt(M.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&r.canContainEols.includes(H.type)&&(z.call(this,M),A.call(this,M))}function _(){this.data.atHardBreak=!0}function V(){const M=this.resume(),H=this.stack[this.stack.length-1];H.value=M}function L(){const M=this.resume(),H=this.stack[this.stack.length-1];H.value=M}function U(){const M=this.resume(),H=this.stack[this.stack.length-1];H.value=M}function Q(){const M=this.stack[this.stack.length-1];if(this.data.inReference){const H=this.data.referenceType||"shortcut";M.type+="Reference",M.referenceType=H,delete M.url,delete M.title}else delete M.identifier,delete M.label;this.data.referenceType=void 0}function R(){const M=this.stack[this.stack.length-1];if(this.data.inReference){const H=this.data.referenceType||"shortcut";M.type+="Reference",M.referenceType=H,delete M.url,delete M.title}else delete M.identifier,delete M.label;this.data.referenceType=void 0}function q(M){const H=this.sliceSerialize(M),ne=this.stack[this.stack.length-2];ne.label=TO(H),ne.identifier=jo(H).toLowerCase()}function O(){const M=this.stack[this.stack.length-1],H=this.resume(),ne=this.stack[this.stack.length-1];if(this.data.inReference=!0,ne.type==="link"){const ce=M.children;ne.children=ce}else ne.alt=H}function S(){const M=this.resume(),H=this.stack[this.stack.length-1];H.url=M}function Y(){const M=this.resume(),H=this.stack[this.stack.length-1];H.title=M}function F(){this.data.inReference=void 0}function C(){this.data.referenceType="collapsed"}function W(M){const H=this.resume(),ne=this.stack[this.stack.length-1];ne.label=H,ne.identifier=jo(this.sliceSerialize(M)).toLowerCase(),this.data.referenceType="full"}function re(M){this.data.characterReferenceType=M.type}function te(M){const H=this.sliceSerialize(M),ne=this.data.characterReferenceType;let ce;ne?(ce=m1(H,ne==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):ce=gf(H);const he=this.stack[this.stack.length-1];he.value+=ce}function X(M){const H=this.stack.pop();H.position.end=jt(M.end)}function Fe(M){A.call(this,M);const H=this.stack[this.stack.length-1];H.url=this.sliceSerialize(M)}function Ge(M){A.call(this,M);const H=this.stack[this.stack.length-1];H.url="mailto:"+this.sliceSerialize(M)}function Xe(){return{type:"blockquote",children:[]}}function ar(){return{type:"code",lang:null,meta:null,value:""}}function cn(){return{type:"inlineCode",value:""}}function Or(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function Gn(){return{type:"emphasis",children:[]}}function wr(){return{type:"heading",depth:0,children:[]}}function mr(){return{type:"break"}}function Wa(){return{type:"html",value:""}}function ua(){return{type:"image",title:null,url:"",alt:null}}function Yn(){return{type:"link",title:null,url:"",children:[]}}function ns(M){return{type:"list",ordered:M.type==="listOrdered",start:null,spread:M._spread,children:[]}}function da(M){return{type:"listItem",spread:M._spread,checked:null,children:[]}}function ki(){return{type:"paragraph",children:[]}}function Kn(){return{type:"strong",children:[]}}function $c(){return{type:"text",value:""}}function Uc(){return{type:"thematicBreak"}}}function jt(e){return{line:e.line,column:e.column,offset:e.offset}}function S1(e,r){let n=-1;for(;++n<r.length;){const t=r[n];Array.isArray(t)?S1(e,t):RO(e,t)}}function RO(e,r){let n;for(n in r)if(j1.call(r,n))switch(n){case"canContainEols":{const t=r[n];t&&e[n].push(...t);break}case"transforms":{const t=r[n];t&&e[n].push(...t);break}case"enter":case"exit":{const t=r[n];t&&Object.assign(e[n],t);break}}}function lv(e,r){throw e?new Error("Cannot close `"+e.type+"` ("+Os({start:e.start,end:e.end})+"): a different token (`"+r.type+"`, "+Os({start:r.start,end:r.end})+") is open"):new Error("Cannot close document, a token (`"+r.type+"`, "+Os({start:r.start,end:r.end})+") is still open")}function _O(e){const r=this;r.parser=n;function n(t){return AO(t,{...r.data("settings"),...e,extensions:r.data("micromarkExtensions")||[],mdastExtensions:r.data("fromMarkdownExtensions")||[]})}}function OO(e,r){const n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(r),!0)};return e.patch(r,n),e.applyData(r,n)}function IO(e,r){const n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(r,n),[e.applyData(r,n),{type:"text",value:`
`}]}function MO(e,r){const n=r.value?r.value+`
`:"",t={},a=r.lang?r.lang.split(/\s+/):[];a.length>0&&(t.className=["language-"+a[0]]);let o={type:"element",tagName:"code",properties:t,children:[{type:"text",value:n}]};return r.meta&&(o.data={meta:r.meta}),e.patch(r,o),o=e.applyData(r,o),o={type:"element",tagName:"pre",properties:{},children:[o]},e.patch(r,o),o}function LO(e,r){const n={type:"element",tagName:"del",properties:{},children:e.all(r)};return e.patch(r,n),e.applyData(r,n)}function FO(e,r){const n={type:"element",tagName:"em",properties:{},children:e.all(r)};return e.patch(r,n),e.applyData(r,n)}function DO(e,r){const n=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",t=String(r.identifier).toUpperCase(),a=rs(t.toLowerCase()),o=e.footnoteOrder.indexOf(t);let s,l=e.footnoteCounts.get(t);l===void 0?(l=0,e.footnoteOrder.push(t),s=e.footnoteOrder.length):s=o+1,l+=1,e.footnoteCounts.set(t,l);const c={type:"element",tagName:"a",properties:{href:"#"+n+"fn-"+a,id:n+"fnref-"+a+(l>1?"-"+l:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(s)}]};e.patch(r,c);const u={type:"element",tagName:"sup",properties:{},children:[c]};return e.patch(r,u),e.applyData(r,u)}function BO(e,r){const n={type:"element",tagName:"h"+r.depth,properties:{},children:e.all(r)};return e.patch(r,n),e.applyData(r,n)}function $O(e,r){if(e.options.allowDangerousHtml){const n={type:"raw",value:r.value};return e.patch(r,n),e.applyData(r,n)}}function C1(e,r){const n=r.referenceType;let t="]";if(n==="collapsed"?t+="[]":n==="full"&&(t+="["+(r.label||r.identifier)+"]"),r.type==="imageReference")return[{type:"text",value:"!["+r.alt+t}];const a=e.all(r),o=a[0];o&&o.type==="text"?o.value="["+o.value:a.unshift({type:"text",value:"["});const s=a[a.length-1];return s&&s.type==="text"?s.value+=t:a.push({type:"text",value:t}),a}function UO(e,r){const n=String(r.identifier).toUpperCase(),t=e.definitionById.get(n);if(!t)return C1(e,r);const a={src:rs(t.url||""),alt:r.alt};t.title!==null&&t.title!==void 0&&(a.title=t.title);const o={type:"element",tagName:"img",properties:a,children:[]};return e.patch(r,o),e.applyData(r,o)}function VO(e,r){const n={src:rs(r.url)};r.alt!==null&&r.alt!==void 0&&(n.alt=r.alt),r.title!==null&&r.title!==void 0&&(n.title=r.title);const t={type:"element",tagName:"img",properties:n,children:[]};return e.patch(r,t),e.applyData(r,t)}function HO(e,r){const n={type:"text",value:r.value.replace(/\r?\n|\r/g," ")};e.patch(r,n);const t={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(r,t),e.applyData(r,t)}function QO(e,r){const n=String(r.identifier).toUpperCase(),t=e.definitionById.get(n);if(!t)return C1(e,r);const a={href:rs(t.url||"")};t.title!==null&&t.title!==void 0&&(a.title=t.title);const o={type:"element",tagName:"a",properties:a,children:e.all(r)};return e.patch(r,o),e.applyData(r,o)}function WO(e,r){const n={href:rs(r.url)};r.title!==null&&r.title!==void 0&&(n.title=r.title);const t={type:"element",tagName:"a",properties:n,children:e.all(r)};return e.patch(r,t),e.applyData(r,t)}function GO(e,r,n){const t=e.all(r),a=n?YO(n):N1(r),o={},s=[];if(typeof r.checked=="boolean"){const d=t[0];let m;d&&d.type==="element"&&d.tagName==="p"?m=d:(m={type:"element",tagName:"p",properties:{},children:[]},t.unshift(m)),m.children.length>0&&m.children.unshift({type:"text",value:" "}),m.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:r.checked,disabled:!0},children:[]}),o.className=["task-list-item"]}let l=-1;for(;++l<t.length;){const d=t[l];(a||l!==0||d.type!=="element"||d.tagName!=="p")&&s.push({type:"text",value:`
`}),d.type==="element"&&d.tagName==="p"&&!a?s.push(...d.children):s.push(d)}const c=t[t.length-1];c&&(a||c.type!=="element"||c.tagName!=="p")&&s.push({type:"text",value:`
`});const u={type:"element",tagName:"li",properties:o,children:s};return e.patch(r,u),e.applyData(r,u)}function YO(e){let r=!1;if(e.type==="list"){r=e.spread||!1;const n=e.children;let t=-1;for(;!r&&++t<n.length;)r=N1(n[t])}return r}function N1(e){const r=e.spread;return r??e.children.length>1}function KO(e,r){const n={},t=e.all(r);let a=-1;for(typeof r.start=="number"&&r.start!==1&&(n.start=r.start);++a<t.length;){const s=t[a];if(s.type==="element"&&s.tagName==="li"&&s.properties&&Array.isArray(s.properties.className)&&s.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}const o={type:"element",tagName:r.ordered?"ol":"ul",properties:n,children:e.wrap(t,!0)};return e.patch(r,o),e.applyData(r,o)}function XO(e,r){const n={type:"element",tagName:"p",properties:{},children:e.all(r)};return e.patch(r,n),e.applyData(r,n)}function JO(e,r){const n={type:"root",children:e.wrap(e.all(r))};return e.patch(r,n),e.applyData(r,n)}function ZO(e,r){const n={type:"element",tagName:"strong",properties:{},children:e.all(r)};return e.patch(r,n),e.applyData(r,n)}function e4(e,r){const n=e.all(r),t=n.shift(),a=[];if(t){const s={type:"element",tagName:"thead",properties:{},children:e.wrap([t],!0)};e.patch(r.children[0],s),a.push(s)}if(n.length>0){const s={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},l=mf(r.children[1]),c=o1(r.children[r.children.length-1]);l&&c&&(s.position={start:l,end:c}),a.push(s)}const o={type:"element",tagName:"table",properties:{},children:e.wrap(a,!0)};return e.patch(r,o),e.applyData(r,o)}function r4(e,r,n){const t=n?n.children:void 0,o=(t?t.indexOf(r):1)===0?"th":"td",s=n&&n.type==="table"?n.align:void 0,l=s?s.length:r.children.length;let c=-1;const u=[];for(;++c<l;){const m=r.children[c],f={},p=s?s[c]:void 0;p&&(f.align=p);let y={type:"element",tagName:o,properties:f,children:[]};m&&(y.children=e.all(m),e.patch(m,y),y=e.applyData(m,y)),u.push(y)}const d={type:"element",tagName:"tr",properties:{},children:e.wrap(u,!0)};return e.patch(r,d),e.applyData(r,d)}function n4(e,r){const n={type:"element",tagName:"td",properties:{},children:e.all(r)};return e.patch(r,n),e.applyData(r,n)}const cv=9,uv=32;function t4(e){const r=String(e),n=/\r?\n|\r/g;let t=n.exec(r),a=0;const o=[];for(;t;)o.push(dv(r.slice(a,t.index),a>0,!0),t[0]),a=t.index+t[0].length,t=n.exec(r);return o.push(dv(r.slice(a),a>0,!1)),o.join("")}function dv(e,r,n){let t=0,a=e.length;if(r){let o=e.codePointAt(t);for(;o===cv||o===uv;)t++,o=e.codePointAt(t)}if(n){let o=e.codePointAt(a-1);for(;o===cv||o===uv;)a--,o=e.codePointAt(a-1)}return a>t?e.slice(t,a):""}function a4(e,r){const n={type:"text",value:t4(String(r.value))};return e.patch(r,n),e.applyData(r,n)}function o4(e,r){const n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(r,n),e.applyData(r,n)}const s4={blockquote:OO,break:IO,code:MO,delete:LO,emphasis:FO,footnoteReference:DO,heading:BO,html:$O,imageReference:UO,image:VO,inlineCode:HO,linkReference:QO,link:WO,listItem:GO,list:KO,paragraph:XO,root:JO,strong:ZO,table:e4,tableCell:n4,tableRow:r4,text:a4,thematicBreak:o4,toml:Ji,yaml:Ji,definition:Ji,footnoteDefinition:Ji};function Ji(){}const E1=-1,Dc=0,Ms=1,oc=2,yf=3,bf=4,wf=5,jf=6,k1=7,P1=8,mv=typeof self=="object"?self:globalThis,i4=(e,r)=>{const n=(a,o)=>(e.set(o,a),a),t=a=>{if(e.has(a))return e.get(a);const[o,s]=r[a];switch(o){case Dc:case E1:return n(s,a);case Ms:{const l=n([],a);for(const c of s)l.push(t(c));return l}case oc:{const l=n({},a);for(const[c,u]of s)l[t(c)]=t(u);return l}case yf:return n(new Date(s),a);case bf:{const{source:l,flags:c}=s;return n(new RegExp(l,c),a)}case wf:{const l=n(new Map,a);for(const[c,u]of s)l.set(t(c),t(u));return l}case jf:{const l=n(new Set,a);for(const c of s)l.add(t(c));return l}case k1:{const{name:l,message:c}=s;return n(new mv[l](c),a)}case P1:return n(BigInt(s),a);case"BigInt":return n(Object(BigInt(s)),a);case"ArrayBuffer":return n(new Uint8Array(s).buffer,s);case"DataView":{const{buffer:l}=new Uint8Array(s);return n(new DataView(l),s)}}return n(new mv[o](s),a)};return t},pv=e=>i4(new Map,e)(0),Ja="",{toString:l4}={},{keys:c4}=Object,gs=e=>{const r=typeof e;if(r!=="object"||!e)return[Dc,r];const n=l4.call(e).slice(8,-1);switch(n){case"Array":return[Ms,Ja];case"Object":return[oc,Ja];case"Date":return[yf,Ja];case"RegExp":return[bf,Ja];case"Map":return[wf,Ja];case"Set":return[jf,Ja];case"DataView":return[Ms,n]}return n.includes("Array")?[Ms,n]:n.includes("Error")?[k1,n]:[oc,n]},Zi=([e,r])=>e===Dc&&(r==="function"||r==="symbol"),u4=(e,r,n,t)=>{const a=(s,l)=>{const c=t.push(s)-1;return n.set(l,c),c},o=s=>{if(n.has(s))return n.get(s);let[l,c]=gs(s);switch(l){case Dc:{let d=s;switch(c){case"bigint":l=P1,d=s.toString();break;case"function":case"symbol":if(e)throw new TypeError("unable to serialize "+c);d=null;break;case"undefined":return a([E1],s)}return a([l,d],s)}case Ms:{if(c){let f=s;return c==="DataView"?f=new Uint8Array(s.buffer):c==="ArrayBuffer"&&(f=new Uint8Array(s)),a([c,[...f]],s)}const d=[],m=a([l,d],s);for(const f of s)d.push(o(f));return m}case oc:{if(c)switch(c){case"BigInt":return a([c,s.toString()],s);case"Boolean":case"Number":case"String":return a([c,s.valueOf()],s)}if(r&&"toJSON"in s)return o(s.toJSON());const d=[],m=a([l,d],s);for(const f of c4(s))(e||!Zi(gs(s[f])))&&d.push([o(f),o(s[f])]);return m}case yf:return a([l,s.toISOString()],s);case bf:{const{source:d,flags:m}=s;return a([l,{source:d,flags:m}],s)}case wf:{const d=[],m=a([l,d],s);for(const[f,p]of s)(e||!(Zi(gs(f))||Zi(gs(p))))&&d.push([o(f),o(p)]);return m}case jf:{const d=[],m=a([l,d],s);for(const f of s)(e||!Zi(gs(f)))&&d.push(o(f));return m}}const{message:u}=s;return a([l,{name:c,message:u}],s)};return o},fv=(e,{json:r,lossy:n}={})=>{const t=[];return u4(!(r||n),!!r,new Map,t)(e),t},sc=typeof structuredClone=="function"?(e,r)=>r&&("json"in r||"lossy"in r)?pv(fv(e,r)):structuredClone(e):(e,r)=>pv(fv(e,r));function d4(e,r){const n=[{type:"text",value:"↩"}];return r>1&&n.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(r)}]}),n}function m4(e,r){return"Back to reference "+(e+1)+(r>1?"-"+r:"")}function p4(e){const r=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",n=e.options.footnoteBackContent||d4,t=e.options.footnoteBackLabel||m4,a=e.options.footnoteLabel||"Footnotes",o=e.options.footnoteLabelTagName||"h2",s=e.options.footnoteLabelProperties||{className:["sr-only"]},l=[];let c=-1;for(;++c<e.footnoteOrder.length;){const u=e.footnoteById.get(e.footnoteOrder[c]);if(!u)continue;const d=e.all(u),m=String(u.identifier).toUpperCase(),f=rs(m.toLowerCase());let p=0;const y=[],g=e.footnoteCounts.get(m);for(;g!==void 0&&++p<=g;){y.length>0&&y.push({type:"text",value:" "});let v=typeof n=="string"?n:n(c,p);typeof v=="string"&&(v={type:"text",value:v}),y.push({type:"element",tagName:"a",properties:{href:"#"+r+"fnref-"+f+(p>1?"-"+p:""),dataFootnoteBackref:"",ariaLabel:typeof t=="string"?t:t(c,p),className:["data-footnote-backref"]},children:Array.isArray(v)?v:[v]})}const b=d[d.length-1];if(b&&b.type==="element"&&b.tagName==="p"){const v=b.children[b.children.length-1];v&&v.type==="text"?v.value+=" ":b.children.push({type:"text",value:" "}),b.children.push(...y)}else d.push(...y);const h={type:"element",tagName:"li",properties:{id:r+"fn-"+f},children:e.wrap(d,!0)};e.patch(u,h),l.push(h)}if(l.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:o,properties:{...sc(s),id:"footnote-label"},children:[{type:"text",value:a}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:e.wrap(l,!0)},{type:"text",value:`
`}]}}const T1=function(e){if(e==null)return v4;if(typeof e=="function")return Bc(e);if(typeof e=="object")return Array.isArray(e)?f4(e):h4(e);if(typeof e=="string")return g4(e);throw new Error("Expected function, string, or object as test")};function f4(e){const r=[];let n=-1;for(;++n<e.length;)r[n]=T1(e[n]);return Bc(t);function t(...a){let o=-1;for(;++o<r.length;)if(r[o].apply(this,a))return!0;return!1}}function h4(e){const r=e;return Bc(n);function n(t){const a=t;let o;for(o in e)if(a[o]!==r[o])return!1;return!0}}function g4(e){return Bc(r);function r(n){return n&&n.type===e}}function Bc(e){return r;function r(n,t,a){return!!(x4(n)&&e.call(this,n,typeof t=="number"?t:void 0,a||void 0))}}function v4(){return!0}function x4(e){return e!==null&&typeof e=="object"&&"type"in e}const z1=[],y4=!0,hv=!1,b4="skip";function w4(e,r,n,t){let a;typeof r=="function"&&typeof n!="function"?(t=n,n=r):a=r;const o=T1(a),s=t?-1:1;l(e,void 0,[])();function l(c,u,d){const m=c&&typeof c=="object"?c:{};if(typeof m.type=="string"){const p=typeof m.tagName=="string"?m.tagName:typeof m.name=="string"?m.name:void 0;Object.defineProperty(f,"name",{value:"node ("+(c.type+(p?"<"+p+">":""))+")"})}return f;function f(){let p=z1,y,g,b;if((!r||o(c,u,d[d.length-1]||void 0))&&(p=j4(n(c,d)),p[0]===hv))return p;if("children"in c&&c.children){const h=c;if(h.children&&p[0]!==b4)for(g=(t?h.children.length:-1)+s,b=d.concat(h);g>-1&&g<h.children.length;){const v=h.children[g];if(y=l(v,g,b)(),y[0]===hv)return y;g=typeof y[1]=="number"?y[1]:g+s}}return p}}}function j4(e){return Array.isArray(e)?e:typeof e=="number"?[y4,e]:e==null?z1:[e]}function A1(e,r,n,t){let a,o,s;typeof r=="function"&&typeof n!="function"?(o=void 0,s=r,a=n):(o=r,s=n,a=t),w4(e,o,l,a);function l(c,u){const d=u[u.length-1],m=d?d.children.indexOf(c):void 0;return s(c,m,d)}}const Nm={}.hasOwnProperty,S4={};function C4(e,r){const n=r||S4,t=new Map,a=new Map,o=new Map,s={...s4,...n.handlers},l={all:u,applyData:E4,definitionById:t,footnoteById:a,footnoteCounts:o,footnoteOrder:[],handlers:s,one:c,options:n,patch:N4,wrap:P4};return A1(e,function(d){if(d.type==="definition"||d.type==="footnoteDefinition"){const m=d.type==="definition"?t:a,f=String(d.identifier).toUpperCase();m.has(f)||m.set(f,d)}}),l;function c(d,m){const f=d.type,p=l.handlers[f];if(Nm.call(l.handlers,f)&&p)return p(l,d,m);if(l.options.passThrough&&l.options.passThrough.includes(f)){if("children"in d){const{children:g,...b}=d,h=sc(b);return h.children=l.all(d),h}return sc(d)}return(l.options.unknownHandler||k4)(l,d,m)}function u(d){const m=[];if("children"in d){const f=d.children;let p=-1;for(;++p<f.length;){const y=l.one(f[p],d);if(y){if(p&&f[p-1].type==="break"&&(!Array.isArray(y)&&y.type==="text"&&(y.value=gv(y.value)),!Array.isArray(y)&&y.type==="element")){const g=y.children[0];g&&g.type==="text"&&(g.value=gv(g.value))}Array.isArray(y)?m.push(...y):m.push(y)}}}return m}}function N4(e,r){e.position&&(r.position=lR(e))}function E4(e,r){let n=r;if(e&&e.data){const t=e.data.hName,a=e.data.hChildren,o=e.data.hProperties;if(typeof t=="string")if(n.type==="element")n.tagName=t;else{const s="children"in n?n.children:[n];n={type:"element",tagName:t,properties:{},children:s}}n.type==="element"&&o&&Object.assign(n.properties,sc(o)),"children"in n&&n.children&&a!==null&&a!==void 0&&(n.children=a)}return n}function k4(e,r){const n=r.data||{},t="value"in r&&!(Nm.call(n,"hProperties")||Nm.call(n,"hChildren"))?{type:"text",value:r.value}:{type:"element",tagName:"div",properties:{},children:e.all(r)};return e.patch(r,t),e.applyData(r,t)}function P4(e,r){const n=[];let t=-1;for(r&&n.push({type:"text",value:`
`});++t<e.length;)t&&n.push({type:"text",value:`
`}),n.push(e[t]);return r&&e.length>0&&n.push({type:"text",value:`
`}),n}function gv(e){let r=0,n=e.charCodeAt(r);for(;n===9||n===32;)r++,n=e.charCodeAt(r);return e.slice(r)}function vv(e,r){const n=C4(e,r),t=n.one(e,void 0),a=p4(n),o=Array.isArray(t)?{type:"root",children:t}:t||{type:"root",children:[]};return a&&o.children.push({type:"text",value:`
`},a),o}function T4(e,r){return e&&"run"in e?async function(n,t){const a=vv(n,{file:t,...r});await e.run(a,t)}:function(n,t){return vv(n,{file:t,...e||r})}}function xv(e){if(e)throw e}var yl=Object.prototype.hasOwnProperty,q1=Object.prototype.toString,yv=Object.defineProperty,bv=Object.getOwnPropertyDescriptor,wv=function(r){return typeof Array.isArray=="function"?Array.isArray(r):q1.call(r)==="[object Array]"},jv=function(r){if(!r||q1.call(r)!=="[object Object]")return!1;var n=yl.call(r,"constructor"),t=r.constructor&&r.constructor.prototype&&yl.call(r.constructor.prototype,"isPrototypeOf");if(r.constructor&&!n&&!t)return!1;var a;for(a in r);return typeof a>"u"||yl.call(r,a)},Sv=function(r,n){yv&&n.name==="__proto__"?yv(r,n.name,{enumerable:!0,configurable:!0,value:n.newValue,writable:!0}):r[n.name]=n.newValue},Cv=function(r,n){if(n==="__proto__")if(yl.call(r,n)){if(bv)return bv(r,n).value}else return;return r[n]},z4=function e(){var r,n,t,a,o,s,l=arguments[0],c=1,u=arguments.length,d=!1;for(typeof l=="boolean"&&(d=l,l=arguments[1]||{},c=2),(l==null||typeof l!="object"&&typeof l!="function")&&(l={});c<u;++c)if(r=arguments[c],r!=null)for(n in r)t=Cv(l,n),a=Cv(r,n),l!==a&&(d&&a&&(jv(a)||(o=wv(a)))?(o?(o=!1,s=t&&wv(t)?t:[]):s=t&&jv(t)?t:{},Sv(l,{name:n,newValue:e(d,s,a)})):typeof a<"u"&&Sv(l,{name:n,newValue:a}));return l};const Mu=na(z4);function Em(e){if(typeof e!="object"||e===null)return!1;const r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype||Object.getPrototypeOf(r)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function A4(){const e=[],r={run:n,use:t};return r;function n(...a){let o=-1;const s=a.pop();if(typeof s!="function")throw new TypeError("Expected function as last argument, not "+s);l(null,...a);function l(c,...u){const d=e[++o];let m=-1;if(c){s(c);return}for(;++m<a.length;)(u[m]===null||u[m]===void 0)&&(u[m]=a[m]);a=u,d?q4(d,l)(...u):s(null,...u)}}function t(a){if(typeof a!="function")throw new TypeError("Expected `middelware` to be a function, not "+a);return e.push(a),r}}function q4(e,r){let n;return t;function t(...s){const l=e.length>s.length;let c;l&&s.push(a);try{c=e.apply(this,s)}catch(u){const d=u;if(l&&n)throw d;return a(d)}l||(c&&c.then&&typeof c.then=="function"?c.then(o,a):c instanceof Error?a(c):o(c))}function a(s,...l){n||(n=!0,r(s,...l))}function o(s){a(null,s)}}const qn={basename:R4,dirname:_4,extname:O4,join:I4,sep:"/"};function R4(e,r){if(r!==void 0&&typeof r!="string")throw new TypeError('"ext" argument must be a string');Ei(e);let n=0,t=-1,a=e.length,o;if(r===void 0||r.length===0||r.length>e.length){for(;a--;)if(e.codePointAt(a)===47){if(o){n=a+1;break}}else t<0&&(o=!0,t=a+1);return t<0?"":e.slice(n,t)}if(r===e)return"";let s=-1,l=r.length-1;for(;a--;)if(e.codePointAt(a)===47){if(o){n=a+1;break}}else s<0&&(o=!0,s=a+1),l>-1&&(e.codePointAt(a)===r.codePointAt(l--)?l<0&&(t=a):(l=-1,t=s));return n===t?t=s:t<0&&(t=e.length),e.slice(n,t)}function _4(e){if(Ei(e),e.length===0)return".";let r=-1,n=e.length,t;for(;--n;)if(e.codePointAt(n)===47){if(t){r=n;break}}else t||(t=!0);return r<0?e.codePointAt(0)===47?"/":".":r===1&&e.codePointAt(0)===47?"//":e.slice(0,r)}function O4(e){Ei(e);let r=e.length,n=-1,t=0,a=-1,o=0,s;for(;r--;){const l=e.codePointAt(r);if(l===47){if(s){t=r+1;break}continue}n<0&&(s=!0,n=r+1),l===46?a<0?a=r:o!==1&&(o=1):a>-1&&(o=-1)}return a<0||n<0||o===0||o===1&&a===n-1&&a===t+1?"":e.slice(a,n)}function I4(...e){let r=-1,n;for(;++r<e.length;)Ei(e[r]),e[r]&&(n=n===void 0?e[r]:n+"/"+e[r]);return n===void 0?".":M4(n)}function M4(e){Ei(e);const r=e.codePointAt(0)===47;let n=L4(e,!r);return n.length===0&&!r&&(n="."),n.length>0&&e.codePointAt(e.length-1)===47&&(n+="/"),r?"/"+n:n}function L4(e,r){let n="",t=0,a=-1,o=0,s=-1,l,c;for(;++s<=e.length;){if(s<e.length)l=e.codePointAt(s);else{if(l===47)break;l=47}if(l===47){if(!(a===s-1||o===1))if(a!==s-1&&o===2){if(n.length<2||t!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(c=n.lastIndexOf("/"),c!==n.length-1){c<0?(n="",t=0):(n=n.slice(0,c),t=n.length-1-n.lastIndexOf("/")),a=s,o=0;continue}}else if(n.length>0){n="",t=0,a=s,o=0;continue}}r&&(n=n.length>0?n+"/..":"..",t=2)}else n.length>0?n+="/"+e.slice(a+1,s):n=e.slice(a+1,s),t=s-a-1;a=s,o=0}else l===46&&o>-1?o++:o=-1}return n}function Ei(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}const F4={cwd:D4};function D4(){return"/"}function km(e){return!!(e!==null&&typeof e=="object"&&"href"in e&&e.href&&"protocol"in e&&e.protocol&&e.auth===void 0)}function B4(e){if(typeof e=="string")e=new URL(e);else if(!km(e)){const r=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw r.code="ERR_INVALID_ARG_TYPE",r}if(e.protocol!=="file:"){const r=new TypeError("The URL must be of scheme file");throw r.code="ERR_INVALID_URL_SCHEME",r}return $4(e)}function $4(e){if(e.hostname!==""){const t=new TypeError('File URL host must be "localhost" or empty on darwin');throw t.code="ERR_INVALID_FILE_URL_HOST",t}const r=e.pathname;let n=-1;for(;++n<r.length;)if(r.codePointAt(n)===37&&r.codePointAt(n+1)===50){const t=r.codePointAt(n+2);if(t===70||t===102){const a=new TypeError("File URL path must not include encoded / characters");throw a.code="ERR_INVALID_FILE_URL_PATH",a}}return decodeURIComponent(r)}const Lu=["history","path","basename","stem","extname","dirname"];class R1{constructor(r){let n;r?km(r)?n={path:r}:typeof r=="string"||U4(r)?n={value:r}:n=r:n={},this.cwd="cwd"in n?"":F4.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let t=-1;for(;++t<Lu.length;){const o=Lu[t];o in n&&n[o]!==void 0&&n[o]!==null&&(this[o]=o==="history"?[...n[o]]:n[o])}let a;for(a in n)Lu.includes(a)||(this[a]=n[a])}get basename(){return typeof this.path=="string"?qn.basename(this.path):void 0}set basename(r){Du(r,"basename"),Fu(r,"basename"),this.path=qn.join(this.dirname||"",r)}get dirname(){return typeof this.path=="string"?qn.dirname(this.path):void 0}set dirname(r){Nv(this.basename,"dirname"),this.path=qn.join(r||"",this.basename)}get extname(){return typeof this.path=="string"?qn.extname(this.path):void 0}set extname(r){if(Fu(r,"extname"),Nv(this.dirname,"extname"),r){if(r.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(r.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=qn.join(this.dirname,this.stem+(r||""))}get path(){return this.history[this.history.length-1]}set path(r){km(r)&&(r=B4(r)),Du(r,"path"),this.path!==r&&this.history.push(r)}get stem(){return typeof this.path=="string"?qn.basename(this.path,this.extname):void 0}set stem(r){Du(r,"stem"),Fu(r,"stem"),this.path=qn.join(this.dirname||"",r+(this.extname||""))}fail(r,n,t){const a=this.message(r,n,t);throw a.fatal=!0,a}info(r,n,t){const a=this.message(r,n,t);return a.fatal=void 0,a}message(r,n,t){const a=new dr(r,n,t);return this.path&&(a.name=this.path+":"+a.name,a.file=this.path),a.fatal=!1,this.messages.push(a),a}toString(r){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(r||void 0).decode(this.value)}}function Fu(e,r){if(e&&e.includes(qn.sep))throw new Error("`"+r+"` cannot be a path: did not expect `"+qn.sep+"`")}function Du(e,r){if(!e)throw new Error("`"+r+"` cannot be empty")}function Nv(e,r){if(!e)throw new Error("Setting `"+r+"` requires `path` to be set too")}function U4(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const V4=function(e){const t=this.constructor.prototype,a=t[e],o=function(){return a.apply(o,arguments)};return Object.setPrototypeOf(o,t),o},H4={}.hasOwnProperty;class Sf extends V4{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=A4()}copy(){const r=new Sf;let n=-1;for(;++n<this.attachers.length;){const t=this.attachers[n];r.use(...t)}return r.data(Mu(!0,{},this.namespace)),r}data(r,n){return typeof r=="string"?arguments.length===2?(Uu("data",this.frozen),this.namespace[r]=n,this):H4.call(this.namespace,r)&&this.namespace[r]||void 0:r?(Uu("data",this.frozen),this.namespace=r,this):this.namespace}freeze(){if(this.frozen)return this;const r=this;for(;++this.freezeIndex<this.attachers.length;){const[n,...t]=this.attachers[this.freezeIndex];if(t[0]===!1)continue;t[0]===!0&&(t[0]=void 0);const a=n.call(r,...t);typeof a=="function"&&this.transformers.use(a)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(r){this.freeze();const n=el(r),t=this.parser||this.Parser;return Bu("parse",t),t(String(n),n)}process(r,n){const t=this;return this.freeze(),Bu("process",this.parser||this.Parser),$u("process",this.compiler||this.Compiler),n?a(void 0,n):new Promise(a);function a(o,s){const l=el(r),c=t.parse(l);t.run(c,l,function(d,m,f){if(d||!m||!f)return u(d);const p=m,y=t.stringify(p,f);G4(y)?f.value=y:f.result=y,u(d,f)});function u(d,m){d||!m?s(d):o?o(m):n(void 0,m)}}}processSync(r){let n=!1,t;return this.freeze(),Bu("processSync",this.parser||this.Parser),$u("processSync",this.compiler||this.Compiler),this.process(r,a),kv("processSync","process",n),t;function a(o,s){n=!0,xv(o),t=s}}run(r,n,t){Ev(r),this.freeze();const a=this.transformers;return!t&&typeof n=="function"&&(t=n,n=void 0),t?o(void 0,t):new Promise(o);function o(s,l){const c=el(n);a.run(r,c,u);function u(d,m,f){const p=m||r;d?l(d):s?s(p):t(void 0,p,f)}}}runSync(r,n){let t=!1,a;return this.run(r,n,o),kv("runSync","run",t),a;function o(s,l){xv(s),a=l,t=!0}}stringify(r,n){this.freeze();const t=el(n),a=this.compiler||this.Compiler;return $u("stringify",a),Ev(r),a(r,t)}use(r,...n){const t=this.attachers,a=this.namespace;if(Uu("use",this.frozen),r!=null)if(typeof r=="function")c(r,n);else if(typeof r=="object")Array.isArray(r)?l(r):s(r);else throw new TypeError("Expected usable value, not `"+r+"`");return this;function o(u){if(typeof u=="function")c(u,[]);else if(typeof u=="object")if(Array.isArray(u)){const[d,...m]=u;c(d,m)}else s(u);else throw new TypeError("Expected usable value, not `"+u+"`")}function s(u){if(!("plugins"in u)&&!("settings"in u))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");l(u.plugins),u.settings&&(a.settings=Mu(!0,a.settings,u.settings))}function l(u){let d=-1;if(u!=null)if(Array.isArray(u))for(;++d<u.length;){const m=u[d];o(m)}else throw new TypeError("Expected a list of plugins, not `"+u+"`")}function c(u,d){let m=-1,f=-1;for(;++m<t.length;)if(t[m][0]===u){f=m;break}if(f===-1)t.push([u,...d]);else if(d.length>0){let[p,...y]=d;const g=t[f][1];Em(g)&&Em(p)&&(p=Mu(!0,g,p)),t[f]=[u,p,...y]}}}}const Q4=new Sf().freeze();function Bu(e,r){if(typeof r!="function")throw new TypeError("Cannot `"+e+"` without `parser`")}function $u(e,r){if(typeof r!="function")throw new TypeError("Cannot `"+e+"` without `compiler`")}function Uu(e,r){if(r)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function Ev(e){if(!Em(e)||typeof e.type!="string")throw new TypeError("Expected node, got `"+e+"`")}function kv(e,r,n){if(!n)throw new Error("`"+e+"` finished async. Use `"+r+"` instead")}function el(e){return W4(e)?e:new R1(e)}function W4(e){return!!(e&&typeof e=="object"&&"message"in e&&"messages"in e)}function G4(e){return typeof e=="string"||Y4(e)}function Y4(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const K4="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",Pv=[],Tv={allowDangerousHtml:!0},X4=/^(https?|ircs?|mailto|xmpp)$/i,J4=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"className",id:"remove-classname"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function Z4(e){const r=e3(e),n=r3(e);return n3(r.runSync(r.parse(n),n),e)}function e3(e){const r=e.rehypePlugins||Pv,n=e.remarkPlugins||Pv,t=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...Tv}:Tv;return Q4().use(_O).use(n).use(T4,t).use(r)}function r3(e){const r=e.children||"",n=new R1;return typeof r=="string"&&(n.value=r),n}function n3(e,r){const n=r.allowedElements,t=r.allowElement,a=r.components,o=r.disallowedElements,s=r.skipHtml,l=r.unwrapDisallowed,c=r.urlTransform||t3;for(const d of J4)Object.hasOwn(r,d.from)&&(""+d.from+(d.to?"use `"+d.to+"` instead":"remove it")+K4+d.id,void 0);return A1(e,u),pR(e,{Fragment:i.Fragment,components:a,ignoreInvalidStyle:!0,jsx:i.jsx,jsxs:i.jsxs,passKeys:!0,passNode:!0});function u(d,m,f){if(d.type==="raw"&&f&&typeof m=="number")return s?f.children.splice(m,1):f.children[m]={type:"text",value:d.value},m;if(d.type==="element"){let p;for(p in _u)if(Object.hasOwn(_u,p)&&Object.hasOwn(d.properties,p)){const y=d.properties[p],g=_u[p];(g===null||g.includes(d.tagName))&&(d.properties[p]=c(String(y||""),p,d))}}if(d.type==="element"){let p=n?!n.includes(d.tagName):o?o.includes(d.tagName):!1;if(!p&&t&&typeof m=="number"&&(p=!t(d,m,f)),p&&f&&typeof m=="number")return l&&d.children?f.children.splice(m,1,...d.children):f.children.splice(m,1),m}}}function t3(e){const r=e.indexOf(":"),n=e.indexOf("?"),t=e.indexOf("#"),a=e.indexOf("/");return r===-1||a!==-1&&r>a||n!==-1&&r>n||t!==-1&&r>t||X4.test(e.slice(0,r))?e:""}const a3="https://www.futuroperfeito.com.br",_1=e=>{const r=e.startsWith("/")?e:`/${e}`;return`${a3}${r}`},zv=e=>new Date(e).toLocaleDateString("pt-BR",{day:"2-digit",month:"short",year:"numeric"}),o3=()=>{const{slug:e}=_P(),r=Bz(e),[n,t]=x.useState(0),a=x.useMemo(()=>Wp().filter(b=>b.slug!==(r==null?void 0:r.slug)).slice(0,3),[r==null?void 0:r.slug]);x.useEffect(()=>{const g=()=>{const b=window.scrollY,h=document.documentElement.scrollHeight-document.documentElement.clientHeight,v=h>0?Math.min(1,b/h):0;t(v)};return window.addEventListener("scroll",g,{passive:!0}),g(),()=>window.removeEventListener("scroll",g)},[]);const o=g=>g.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-"),s=g=>{var b;return typeof g=="string"?g:Array.isArray(g)?g.map(s).join(" "):g&&typeof g=="object"&&"props"in g?s((b=g.props)==null?void 0:b.children):""},l=x.useMemo(()=>r!=null&&r.content?[...r.content.matchAll(/^##\s+(.+)$/gm)].map(b=>{const h=b[1].trim();return{id:o(h),title:h}}):[],[r==null?void 0:r.content]),c=({items:g})=>g.length?i.jsxs("div",{className:"mb-8 rounded-2xl border border-slate-200 bg-muted/60 p-4 text-sm md:p-5",children:[i.jsx("p",{className:"mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500",children:"Neste artigo"}),i.jsx("ul",{className:"space-y-2",children:g.map(b=>i.jsx("li",{children:i.jsx("a",{href:`#${b.id}`,className:"text-sm text-muted-foreground transition hover:text-foreground",children:b.title})},b.id))})]}):null,u=({title:g="Quer clarear ainda mais?",description:b="Responda o teste Futuro Perfeito e receba sugestões de cargos alinhadas ao seu perfil.",fullWidth:h=!1})=>i.jsx("div",{className:"my-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 shadow-sm transition dark:border-indigo-900/60 dark:bg-indigo-950/40 md:p-5",children:i.jsxs("div",{className:"space-y-2",children:[i.jsx("h3",{className:"text-base font-semibold text-slate-900 dark:text-slate-50",children:g}),i.jsx("p",{className:"text-sm leading-relaxed text-slate-700 dark:text-slate-200",children:b}),i.jsx("div",{className:"pt-1",children:i.jsx("a",{href:"/",className:`inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 ${h?"w-full":""}`,children:"Fazer o teste Futuro Perfeito"})})]})});if(!r)return i.jsx("div",{className:"flex min-h-screen items-center justify-center bg-background px-4",children:i.jsxs("div",{className:"max-w-md rounded-xl border border-slate-200 bg-card p-8 text-center shadow-sm",children:[i.jsx("p",{className:"text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600",children:"Blog"}),i.jsx("h1",{className:"mt-3 text-2xl font-bold text-slate-900",children:"Post não encontrado"}),i.jsx("p",{className:"mt-3 text-slate-600",children:"O link pode ter sido alterado ou removido."}),i.jsx(cr,{to:"/blog",className:"mt-6 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700",children:"Voltar para o Blog"})]})});const d=_1(`/blog/${r.slug}`),m=r.tags.join(", "),[f,p]=x.useState(!0),y=r.slug==="qual-profissao-combina-comigo"?"/blog/qual-profissao-hero.png":null;return i.jsxs("div",{className:"min-h-screen bg-background text-foreground",children:[i.jsx("div",{className:"fixed inset-x-0 top-0 z-30 h-2 bg-transparent",children:i.jsx("div",{className:"h-1 rounded-r-full bg-indigo-600 transition-[width]",style:{width:`${n*100}%`}})}),i.jsxs($a,{children:[i.jsx("title",{children:`${r.title} | Blog`}),i.jsx("meta",{name:"description",content:r.description}),m&&i.jsx("meta",{name:"keywords",content:m}),i.jsx("meta",{property:"og:type",content:"article"}),i.jsx("meta",{property:"og:title",content:r.title}),i.jsx("meta",{property:"og:description",content:r.description}),i.jsx("meta",{property:"og:url",content:d}),i.jsx("meta",{name:"twitter:card",content:"summary"}),i.jsx("meta",{name:"twitter:title",content:r.title}),i.jsx("meta",{name:"twitter:description",content:r.description}),i.jsx("meta",{property:"article:published_time",content:r.date})]}),i.jsxs("div",{className:"space-y-10 md:space-y-14",children:[i.jsx("section",{className:"bg-slate-950/5",children:i.jsx("div",{className:"mx-auto max-w-3xl md:max-w-4xl px-4 py-10 md:px-6 md:py-14",children:i.jsxs("div",{className:"grid gap-6 lg:grid-cols-[1.35fr,1fr] lg:items-center",children:[i.jsxs("div",{className:"rounded-3xl border border-slate-200 bg-card p-6 shadow-sm sm:p-8 md:p-8 lg:p-9",children:[i.jsx("div",{className:"flex items-center justify-between",children:i.jsx(cr,{to:"/blog",className:"text-sm font-semibold text-slate-600 underline-offset-4 hover:text-indigo-700 hover:underline",children:"<- Voltar para o Blog"})}),i.jsxs("div",{className:"mt-4 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600",children:[i.jsx("span",{className:"inline-flex items-center rounded-full bg-indigo-50 px-3 py-1.5 text-indigo-700",children:zv(r.date)}),r.tags.map(g=>i.jsx("span",{className:"inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-slate-700",children:g},g))]}),i.jsxs("div",{className:"mt-6 space-y-3",children:[i.jsx("h1",{className:"text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl",children:r.title}),i.jsx("p",{className:"text-base leading-relaxed text-slate-600 sm:text-lg",children:r.description})]})]}),i.jsx("div",{className:"hidden h-full lg:block",children:y&&f?i.jsx("div",{className:"relative h-full min-h-[220px] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-sm",children:i.jsx("img",{src:y,alt:"Ilustração sobre escolha de profissão",className:"h-full w-full object-cover",onError:()=>p(!1)})}):i.jsxs("div",{className:"relative h-full min-h-[220px] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-100 via-white to-slate-100 shadow-sm",children:[i.jsx("div",{className:"absolute -left-10 top-6 h-24 w-24 rounded-full bg-indigo-200 blur-2xl"}),i.jsx("div",{className:"absolute right-0 top-10 h-32 w-32 rounded-full bg-indigo-300/70 blur-3xl"}),i.jsx("div",{className:"absolute bottom-6 left-6 h-28 w-28 rounded-full bg-slate-200 blur-2xl"}),i.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/60"})]})})]})})}),i.jsx("div",{className:"mx-auto max-w-3xl md:max-w-4xl px-4 pb-14 md:px-6 md:pb-16",children:i.jsxs("article",{children:[i.jsxs("div",{className:"prose prose-lg prose-slate mx-auto max-w-3xl leading-relaxed prose-a:text-indigo-700 hover:prose-a:text-indigo-900 prose-headings:tracking-tight prose-headings:font-semibold prose-headings:mt-10 prose-h2:mb-3 prose-h3:mb-2 prose-p:my-4 md:prose-p:my-5 prose-p:leading-8 prose-ul:my-4 prose-ol:my-4 prose-li:my-1.5 prose-li:leading-relaxed prose-li:marker:text-slate-400 prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-strong:font-semibold prose-strong:bg-slate-100/60 dark:prose-strong:bg-slate-800/40 prose-strong:px-0.5 prose-strong:rounded prose-hr:my-8 prose-hr:border-slate-200 dark:prose-hr:border-slate-800 prose-blockquote:my-8 prose-img:my-8 prose-img:rounded-2xl prose-img:shadow-sm dark:prose-invert",children:[i.jsx(c,{items:l}),i.jsx(u,{fullWidth:!0}),i.jsx(Z4,{components:{h2:({node:g,...b})=>{const h=s(b.children),v=o(h);return i.jsx("h2",{id:v,...b,children:b.children})},blockquote:({node:g,...b})=>i.jsxs("div",{className:"my-8 rounded-2xl border border-indigo-100 bg-indigo-50/70 px-4 py-3 text-slate-800 shadow-sm ring-1 ring-indigo-100/60 dark:border-indigo-900/60 dark:bg-indigo-950/30 dark:text-slate-100",children:[i.jsx("p",{className:"mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600",children:"Dica"}),i.jsx("div",{className:"space-y-2 text-base leading-relaxed [&>p]:m-0 [&>p]:leading-relaxed",...b})]})},children:r.content}),i.jsx(u,{})]}),i.jsxs("div",{className:"mx-auto mt-12 flex max-w-3xl flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between",children:[i.jsxs("div",{className:"flex flex-col gap-2 sm:flex-row sm:gap-4",children:[i.jsx(cr,{to:"/blog",className:"inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900",children:"<- Voltar para o Blog"}),i.jsx(cr,{to:"/",className:"text-sm font-medium text-slate-600 underline decoration-dashed underline-offset-4 hover:text-slate-800",children:"Ir para a Home"})]}),i.jsx(cr,{to:"/",className:"inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700",children:"Fazer o teste Futuro Perfeito"})]}),i.jsxs("div",{className:"mx-auto mt-10 max-w-4xl",children:[i.jsx("div",{className:"mb-6 flex items-center justify-between",children:i.jsx("h3",{className:"text-lg font-semibold text-slate-900",children:"Leia também"})}),i.jsx("div",{className:"grid gap-4 md:grid-cols-3",children:a.map(g=>i.jsxs(cr,{to:`/blog/${g.slug}`,className:"flex flex-col gap-2 rounded-2xl border border-slate-200 bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",children:[i.jsx("div",{className:"text-xs font-semibold text-slate-500",children:zv(g.date)}),i.jsx("h4",{className:"text-sm font-semibold text-slate-900",children:g.title}),i.jsx("p",{className:"text-xs text-muted-foreground",children:g.tags.slice(0,2).join(" · ")})]},g.slug))}),i.jsx("div",{className:"mt-8 rounded-2xl border border-slate-200 bg-muted/80 p-4 md:p-5",children:i.jsxs("div",{className:"flex items-start gap-3",children:[i.jsx("img",{src:"/favicon.png",alt:"Futuro Perfeito",className:"mt-1 h-10 w-10 shrink-0 rounded-full object-cover"}),i.jsxs("div",{className:"space-y-2",children:[i.jsx("p",{className:"text-sm font-semibold text-slate-900",children:"Sobre o Futuro Perfeito"}),i.jsx("p",{className:"text-sm leading-relaxed text-slate-700",children:"O Futuro Perfeito é um projeto focado em dar clareza para quem quer seguir carreira em concursos, conectando perfil, rotina desejada e cargos reais. Conteúdo direto, prático e alinhado com o que você precisa para decidir com segurança."})]})]})})]})]})})]})]})},s3=new U2,i3=()=>{const{pathname:e}=la();return x.useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"})},[e]),null},l3=()=>{const{pathname:e}=la(),r=_1(e);return i.jsx($a,{children:i.jsx("link",{rel:"canonical",href:r})})},c3=()=>i.jsx(rz,{attribute:"class",defaultTheme:"light",enableSystem:!0,children:i.jsx(G2,{client:s3,children:i.jsxs(C2,{children:[i.jsx(nE,{}),i.jsx(LE,{}),i.jsxs(tT,{children:[i.jsx(i3,{}),i.jsx(l3,{}),i.jsxs(YP,{children:[i.jsx(Je,{path:"/",element:i.jsx(LA,{})}),i.jsx(Je,{path:"/paid-content",element:i.jsx(FA,{})}),i.jsx(Je,{path:"/terms",element:i.jsx(dq,{})}),i.jsx(Je,{path:"/privacy",element:i.jsx(mq,{})}),i.jsx(Je,{path:"/obrigado",element:i.jsx(fq,{})}),i.jsx(Je,{path:"/admin/login",element:i.jsx(lq,{})}),i.jsx(Je,{path:"/admin/forgot-password",element:i.jsx(cq,{})}),i.jsx(Je,{path:"/admin/reset-password",element:i.jsx(uq,{})}),i.jsx(Je,{path:"/admin/payments",element:i.jsx(DA,{})}),i.jsx(Je,{path:"/admin/users",element:i.jsx(BA,{})}),i.jsx(Je,{path:"/admin/analytics",element:i.jsx($A,{})}),i.jsx(Je,{path:"/admin/quiz-responses",element:i.jsx(sq,{})}),i.jsx(Je,{path:"/admin/clients",element:i.jsx(iq,{})}),i.jsx(Je,{path:"/blog",element:i.jsx(gq,{})}),i.jsx(Je,{path:"/blog/:slug",element:i.jsx(o3,{})}),i.jsx(Je,{path:"*",element:i.jsx(pq,{})})]})]})]})})});Zy(document.getElementById("root")).render(i.jsx(c3,{}));
