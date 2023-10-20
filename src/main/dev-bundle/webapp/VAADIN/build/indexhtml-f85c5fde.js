(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();window.Vaadin=window.Vaadin||{};window.Vaadin.featureFlags=window.Vaadin.featureFlags||{};window.Vaadin.featureFlags.exampleFeatureFlag=!1;window.Vaadin.featureFlags.collaborationEngineBackend=!1;window.Vaadin.featureFlags.sideNavComponent=!0;const Li="modulepreload",Mi=function(o,e){return new URL(o,e).href},Zo={},x=function(e,t,n){if(!t||t.length===0)return e();const i=document.getElementsByTagName("link");return Promise.all(t.map(s=>{if(s=Mi(s,n),s in Zo)return;Zo[s]=!0;const r=s.endsWith(".css"),l=r?'[rel="stylesheet"]':"";if(!!n)for(let c=i.length-1;c>=0;c--){const m=i[c];if(m.href===s&&(!r||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${l}`))return;const d=document.createElement("link");if(d.rel=r?"stylesheet":Li,r||(d.as="script",d.crossOrigin=""),d.href=s,document.head.appendChild(d),r)return new Promise((c,m)=>{d.addEventListener("load",c),d.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>e())};function bt(o){return o=o||[],Array.isArray(o)?o:[o]}function Y(o){return`[Vaadin.Router] ${o}`}function Vi(o){if(typeof o!="object")return String(o);const e=Object.prototype.toString.call(o).match(/ (.*)\]$/)[1];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(o)}`:e}const _t="module",wt="nomodule",_o=[_t,wt];function en(o){if(!o.match(/.+\.[m]?js$/))throw new Error(Y(`Unsupported type for bundle "${o}": .js or .mjs expected.`))}function Jn(o){if(!o||!K(o.path))throw new Error(Y('Expected route config to be an object with a "path" string property, or an array of such objects'));const e=o.bundle,t=["component","redirect","bundle"];if(!ge(o.action)&&!Array.isArray(o.children)&&!ge(o.children)&&!St(e)&&!t.some(n=>K(o[n])))throw new Error(Y(`Expected route config "${o.path}" to include either "${t.join('", "')}" or "action" function but none found.`));if(e)if(K(e))en(e);else if(_o.some(n=>n in e))_o.forEach(n=>n in e&&en(e[n]));else throw new Error(Y('Expected route bundle to include either "'+wt+'" or "'+_t+'" keys, or both'));o.redirect&&["bundle","component"].forEach(n=>{n in o&&console.warn(Y(`Route config "${o.path}" has both "redirect" and "${n}" properties, and "redirect" will always override the latter. Did you mean to only use "${n}"?`))})}function tn(o){bt(o).forEach(e=>Jn(e))}function on(o,e){let t=document.head.querySelector('script[src="'+o+'"][async]');return t||(t=document.createElement("script"),t.setAttribute("src",o),e===_t?t.setAttribute("type",_t):e===wt&&t.setAttribute(wt,""),t.async=!0),new Promise((n,i)=>{t.onreadystatechange=t.onload=s=>{t.__dynamicImportLoaded=!0,n(s)},t.onerror=s=>{t.parentNode&&t.parentNode.removeChild(t),i(s)},t.parentNode===null?document.head.appendChild(t):t.__dynamicImportLoaded&&n()})}function Di(o){return K(o)?on(o):Promise.race(_o.filter(e=>e in o).map(e=>on(o[e],e)))}function Fe(o,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${o}`,{cancelable:o==="go",detail:e}))}function St(o){return typeof o=="object"&&!!o}function ge(o){return typeof o=="function"}function K(o){return typeof o=="string"}function Xn(o){const e=new Error(Y(`Page not found (${o.pathname})`));return e.context=o,e.code=404,e}const Pe=new class{};function zi(o){const e=o.port,t=o.protocol,s=t==="http:"&&e==="80"||t==="https:"&&e==="443"?o.hostname:o.host;return`${t}//${s}`}function nn(o){if(o.defaultPrevented||o.button!==0||o.shiftKey||o.ctrlKey||o.altKey||o.metaKey)return;let e=o.target;const t=o.composedPath?o.composedPath():o.path||[];for(let l=0;l<t.length;l++){const a=t[l];if(a.nodeName&&a.nodeName.toLowerCase()==="a"){e=a;break}}for(;e&&e.nodeName.toLowerCase()!=="a";)e=e.parentNode;if(!e||e.nodeName.toLowerCase()!=="a"||e.target&&e.target.toLowerCase()!=="_self"||e.hasAttribute("download")||e.hasAttribute("router-ignore")||e.pathname===window.location.pathname&&e.hash!==""||(e.origin||zi(e))!==window.location.origin)return;const{pathname:i,search:s,hash:r}=e;Fe("go",{pathname:i,search:s,hash:r})&&(o.preventDefault(),o&&o.type==="click"&&window.scrollTo(0,0))}const Ui={activate(){window.document.addEventListener("click",nn)},inactivate(){window.document.removeEventListener("click",nn)}},ji=/Trident/.test(navigator.userAgent);ji&&!ge(window.PopStateEvent)&&(window.PopStateEvent=function(o,e){e=e||{};var t=document.createEvent("Event");return t.initEvent(o,!!e.bubbles,!!e.cancelable),t.state=e.state||null,t},window.PopStateEvent.prototype=window.Event.prototype);function sn(o){if(o.state==="vaadin-router-ignore")return;const{pathname:e,search:t,hash:n}=window.location;Fe("go",{pathname:e,search:t,hash:n})}const Fi={activate(){window.addEventListener("popstate",sn)},inactivate(){window.removeEventListener("popstate",sn)}};var De=ni,Bi=No,Hi=Ki,qi=ei,Wi=oi,Qn="/",Zn="./",Gi=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function No(o,e){for(var t=[],n=0,i=0,s="",r=e&&e.delimiter||Qn,l=e&&e.delimiters||Zn,a=!1,d;(d=Gi.exec(o))!==null;){var c=d[0],m=d[1],h=d.index;if(s+=o.slice(i,h),i=h+c.length,m){s+=m[1],a=!0;continue}var f="",se=o[i],re=d[2],te=d[3],zt=d[4],B=d[5];if(!a&&s.length){var X=s.length-1;l.indexOf(s[X])>-1&&(f=s[X],s=s.slice(0,X))}s&&(t.push(s),s="",a=!1);var Se=f!==""&&se!==void 0&&se!==f,xe=B==="+"||B==="*",Ut=B==="?"||B==="*",oe=f||r,nt=te||zt;t.push({name:re||n++,prefix:f,delimiter:oe,optional:Ut,repeat:xe,partial:Se,pattern:nt?Yi(nt):"[^"+ae(oe)+"]+?"})}return(s||i<o.length)&&t.push(s+o.substr(i)),t}function Ki(o,e){return ei(No(o,e))}function ei(o){for(var e=new Array(o.length),t=0;t<o.length;t++)typeof o[t]=="object"&&(e[t]=new RegExp("^(?:"+o[t].pattern+")$"));return function(n,i){for(var s="",r=i&&i.encode||encodeURIComponent,l=0;l<o.length;l++){var a=o[l];if(typeof a=="string"){s+=a;continue}var d=n?n[a.name]:void 0,c;if(Array.isArray(d)){if(!a.repeat)throw new TypeError('Expected "'+a.name+'" to not repeat, but got array');if(d.length===0){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to not be empty')}for(var m=0;m<d.length;m++){if(c=r(d[m],a),!e[l].test(c))throw new TypeError('Expected all "'+a.name+'" to match "'+a.pattern+'"');s+=(m===0?a.prefix:a.delimiter)+c}continue}if(typeof d=="string"||typeof d=="number"||typeof d=="boolean"){if(c=r(String(d),a),!e[l].test(c))throw new TypeError('Expected "'+a.name+'" to match "'+a.pattern+'", but got "'+c+'"');s+=a.prefix+c;continue}if(a.optional){a.partial&&(s+=a.prefix);continue}throw new TypeError('Expected "'+a.name+'" to be '+(a.repeat?"an array":"a string"))}return s}}function ae(o){return o.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function Yi(o){return o.replace(/([=!:$/()])/g,"\\$1")}function ti(o){return o&&o.sensitive?"":"i"}function Ji(o,e){if(!e)return o;var t=o.source.match(/\((?!\?)/g);if(t)for(var n=0;n<t.length;n++)e.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return o}function Xi(o,e,t){for(var n=[],i=0;i<o.length;i++)n.push(ni(o[i],e,t).source);return new RegExp("(?:"+n.join("|")+")",ti(t))}function Qi(o,e,t){return oi(No(o,t),e,t)}function oi(o,e,t){t=t||{};for(var n=t.strict,i=t.start!==!1,s=t.end!==!1,r=ae(t.delimiter||Qn),l=t.delimiters||Zn,a=[].concat(t.endsWith||[]).map(ae).concat("$").join("|"),d=i?"^":"",c=o.length===0,m=0;m<o.length;m++){var h=o[m];if(typeof h=="string")d+=ae(h),c=m===o.length-1&&l.indexOf(h[h.length-1])>-1;else{var f=h.repeat?"(?:"+h.pattern+")(?:"+ae(h.delimiter)+"(?:"+h.pattern+"))*":h.pattern;e&&e.push(h),h.optional?h.partial?d+=ae(h.prefix)+"("+f+")?":d+="(?:"+ae(h.prefix)+"("+f+"))?":d+=ae(h.prefix)+"("+f+")"}}return s?(n||(d+="(?:"+r+")?"),d+=a==="$"?"$":"(?="+a+")"):(n||(d+="(?:"+r+"(?="+a+"))?"),c||(d+="(?="+r+"|"+a+")")),new RegExp(d,ti(t))}function ni(o,e,t){return o instanceof RegExp?Ji(o,e):Array.isArray(o)?Xi(o,e,t):Qi(o,e,t)}De.parse=Bi;De.compile=Hi;De.tokensToFunction=qi;De.tokensToRegExp=Wi;const{hasOwnProperty:Zi}=Object.prototype,wo=new Map;wo.set("|false",{keys:[],pattern:/(?:)/});function rn(o){try{return decodeURIComponent(o)}catch{return o}}function es(o,e,t,n,i){t=!!t;const s=`${o}|${t}`;let r=wo.get(s);if(!r){const d=[];r={keys:d,pattern:De(o,d,{end:t,strict:o===""})},wo.set(s,r)}const l=r.pattern.exec(e);if(!l)return null;const a=Object.assign({},i);for(let d=1;d<l.length;d++){const c=r.keys[d-1],m=c.name,h=l[d];(h!==void 0||!Zi.call(a,m))&&(c.repeat?a[m]=h?h.split(c.delimiter).map(rn):[]:a[m]=h&&rn(h))}return{path:l[0],keys:(n||[]).concat(r.keys),params:a}}function ii(o,e,t,n,i){let s,r,l=0,a=o.path||"";return a.charAt(0)==="/"&&(t&&(a=a.substr(1)),t=!0),{next(d){if(o===d)return{done:!0};const c=o.__children=o.__children||o.children;if(!s&&(s=es(a,e,!c,n,i),s))return{done:!1,value:{route:o,keys:s.keys,params:s.params,path:s.path}};if(s&&c)for(;l<c.length;){if(!r){const h=c[l];h.parent=o;let f=s.path.length;f>0&&e.charAt(f)==="/"&&(f+=1),r=ii(h,e.substr(f),t,s.keys,s.params)}const m=r.next(d);if(!m.done)return{done:!1,value:m.value};r=null,l++}return{done:!0}}}}function ts(o){if(ge(o.route.action))return o.route.action(o)}function os(o,e){let t=e;for(;t;)if(t=t.parent,t===o)return!0;return!1}function ns(o){let e=`Path '${o.pathname}' is not properly resolved due to an error.`;const t=(o.route||{}).path;return t&&(e+=` Resolution had failed on route: '${t}'`),e}function is(o,e){const{route:t,path:n}=e;if(t&&!t.__synthetic){const i={path:n,route:t};if(!o.chain)o.chain=[];else if(t.parent){let s=o.chain.length;for(;s--&&o.chain[s].route&&o.chain[s].route!==t.parent;)o.chain.pop()}o.chain.push(i)}}class He{constructor(e,t={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=t.baseUrl||"",this.errorHandler=t.errorHandler,this.resolveRoute=t.resolveRoute||ts,this.context=Object.assign({resolver:this},t.context),this.root=Array.isArray(e)?{path:"",__children:e,parent:null,__synthetic:!0}:e,this.root.parent=null}getRoutes(){return[...this.root.__children]}setRoutes(e){tn(e);const t=[...bt(e)];this.root.__children=t}addRoutes(e){return tn(e),this.root.__children.push(...bt(e)),this.getRoutes()}removeRoutes(){this.setRoutes([])}resolve(e){const t=Object.assign({},this.context,K(e)?{pathname:e}:e),n=ii(this.root,this.__normalizePathname(t.pathname),this.baseUrl),i=this.resolveRoute;let s=null,r=null,l=t;function a(d,c=s.value.route,m){const h=m===null&&s.value.route;return s=r||n.next(h),r=null,!d&&(s.done||!os(c,s.value.route))?(r=s,Promise.resolve(Pe)):s.done?Promise.reject(Xn(t)):(l=Object.assign(l?{chain:l.chain?l.chain.slice(0):[]}:{},t,s.value),is(l,s.value),Promise.resolve(i(l)).then(f=>f!=null&&f!==Pe?(l.result=f.result||f,l):a(d,c,f)))}return t.next=a,Promise.resolve().then(()=>a(!0,this.root)).catch(d=>{const c=ns(l);if(d?console.warn(c):d=new Error(c),d.context=d.context||l,d instanceof DOMException||(d.code=d.code||500),this.errorHandler)return l.result=this.errorHandler(d),l;throw d})}static __createUrl(e,t){return new URL(e,t)}get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^\/]*$/,""):""}__normalizePathname(e){if(!this.baseUrl)return e;const t=this.__effectiveBaseUrl,n=this.constructor.__createUrl(e,t).href;if(n.slice(0,t.length)===t)return n.slice(t.length)}}He.pathToRegexp=De;const{pathToRegexp:an}=He,ln=new Map;function si(o,e,t){const n=e.name||e.component;if(n&&(o.has(n)?o.get(n).push(e):o.set(n,[e])),Array.isArray(t))for(let i=0;i<t.length;i++){const s=t[i];s.parent=e,si(o,s,s.__children||s.children)}}function dn(o,e){const t=o.get(e);if(t&&t.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return t&&t[0]}function cn(o){let e=o.path;return e=Array.isArray(e)?e[0]:e,e!==void 0?e:""}function ss(o,e={}){if(!(o instanceof He))throw new TypeError("An instance of Resolver is expected");const t=new Map;return(n,i)=>{let s=dn(t,n);if(!s&&(t.clear(),si(t,o.root,o.root.__children),s=dn(t,n),!s))throw new Error(`Route "${n}" not found`);let r=ln.get(s.fullPath);if(!r){let a=cn(s),d=s.parent;for(;d;){const f=cn(d);f&&(a=f.replace(/\/$/,"")+"/"+a.replace(/^\//,"")),d=d.parent}const c=an.parse(a),m=an.tokensToFunction(c),h=Object.create(null);for(let f=0;f<c.length;f++)K(c[f])||(h[c[f].name]=!0);r={toPath:m,keys:h},ln.set(a,r),s.fullPath=a}let l=r.toPath(i,e)||"/";if(e.stringifyQueryParams&&i){const a={},d=Object.keys(i);for(let m=0;m<d.length;m++){const h=d[m];r.keys[h]||(a[h]=i[h])}const c=e.stringifyQueryParams(a);c&&(l+=c.charAt(0)==="?"?c:`?${c}`)}return l}}let hn=[];function rs(o){hn.forEach(e=>e.inactivate()),o.forEach(e=>e.activate()),hn=o}const as=o=>{const e=getComputedStyle(o).getPropertyValue("animation-name");return e&&e!=="none"},ls=(o,e)=>{const t=()=>{o.removeEventListener("animationend",t),e()};o.addEventListener("animationend",t)};function un(o,e){return o.classList.add(e),new Promise(t=>{if(as(o)){const n=o.getBoundingClientRect(),i=`height: ${n.bottom-n.top}px; width: ${n.right-n.left}px`;o.setAttribute("style",`position: absolute; ${i}`),ls(o,()=>{o.classList.remove(e),o.removeAttribute("style"),t()})}else o.classList.remove(e),t()})}const ds=256;function Ht(o){return o!=null}function cs(o){const e=Object.assign({},o);return delete e.next,e}function W({pathname:o="",search:e="",hash:t="",chain:n=[],params:i={},redirectFrom:s,resolver:r},l){const a=n.map(d=>d.route);return{baseUrl:r&&r.baseUrl||"",pathname:o,search:e,hash:t,routes:a,route:l||a.length&&a[a.length-1]||null,params:i,redirectFrom:s,getUrl:(d={})=>mt(le.pathToRegexp.compile(ri(a))(Object.assign({},i,d)),r)}}function pn(o,e){const t=Object.assign({},o.params);return{redirect:{pathname:e,from:o.pathname,params:t}}}function hs(o,e){e.location=W(o);const t=o.chain.map(n=>n.route).indexOf(o.route);return o.chain[t].element=e,e}function pt(o,e,t){if(ge(o))return o.apply(t,e)}function mn(o,e,t){return n=>{if(n&&(n.cancel||n.redirect))return n;if(t)return pt(t[o],e,t)}}function us(o,e){if(!Array.isArray(o)&&!St(o))throw new Error(Y(`Incorrect "children" value for the route ${e.path}: expected array or object, but got ${o}`));e.__children=[];const t=bt(o);for(let n=0;n<t.length;n++)Jn(t[n]),e.__children.push(t[n])}function lt(o){if(o&&o.length){const e=o[0].parentNode;for(let t=0;t<o.length;t++)e.removeChild(o[t])}}function mt(o,e){const t=e.__effectiveBaseUrl;return t?e.constructor.__createUrl(o.replace(/^\//,""),t).pathname:o}function ri(o){return o.map(e=>e.path).reduce((e,t)=>t.length?e.replace(/\/$/,"")+"/"+t.replace(/^\//,""):e,"")}class le extends He{constructor(e,t){const n=document.head.querySelector("base"),i=n&&n.getAttribute("href");super([],Object.assign({baseUrl:i&&He.__createUrl(i,document.URL).pathname.replace(/[^\/]*$/,"")},t)),this.resolveRoute=r=>this.__resolveRoute(r);const s=le.NavigationTrigger;le.setTriggers.apply(le,Object.keys(s).map(r=>s[r])),this.baseUrl,this.ready,this.ready=Promise.resolve(e),this.location,this.location=W({resolver:this}),this.__lastStartedRenderId=0,this.__navigationEventHandler=this.__onNavigationEvent.bind(this),this.setOutlet(e),this.subscribe(),this.__createdByRouter=new WeakMap,this.__addedByRouter=new WeakMap}__resolveRoute(e){const t=e.route;let n=Promise.resolve();ge(t.children)&&(n=n.then(()=>t.children(cs(e))).then(s=>{!Ht(s)&&!ge(t.children)&&(s=t.children),us(s,t)}));const i={redirect:s=>pn(e,s),component:s=>{const r=document.createElement(s);return this.__createdByRouter.set(r,!0),r}};return n.then(()=>{if(this.__isLatestRender(e))return pt(t.action,[e,i],t)}).then(s=>{if(Ht(s)&&(s instanceof HTMLElement||s.redirect||s===Pe))return s;if(K(t.redirect))return i.redirect(t.redirect);if(t.bundle)return Di(t.bundle).then(()=>{},()=>{throw new Error(Y(`Bundle not found: ${t.bundle}. Check if the file name is correct`))})}).then(s=>{if(Ht(s))return s;if(K(t.component))return i.component(t.component)})}setOutlet(e){e&&this.__ensureOutlet(e),this.__outlet=e}getOutlet(){return this.__outlet}setRoutes(e,t=!1){return this.__previousContext=void 0,this.__urlForName=void 0,super.setRoutes(e),t||this.__onNavigationEvent(),this.ready}render(e,t){const n=++this.__lastStartedRenderId,i=Object.assign({search:"",hash:""},K(e)?{pathname:e}:e,{__renderId:n});return this.ready=this.resolve(i).then(s=>this.__fullyResolveChain(s)).then(s=>{if(this.__isLatestRender(s)){const r=this.__previousContext;if(s===r)return this.__updateBrowserHistory(r,!0),this.location;if(this.location=W(s),t&&this.__updateBrowserHistory(s,n===1),Fe("location-changed",{router:this,location:this.location}),s.__skipAttach)return this.__copyUnchangedElements(s,r),this.__previousContext=s,this.location;this.__addAppearingContent(s,r);const l=this.__animateIfNeeded(s);return this.__runOnAfterEnterCallbacks(s),this.__runOnAfterLeaveCallbacks(s,r),l.then(()=>{if(this.__isLatestRender(s))return this.__removeDisappearingContent(),this.__previousContext=s,this.location})}}).catch(s=>{if(n===this.__lastStartedRenderId)throw t&&this.__updateBrowserHistory(i),lt(this.__outlet&&this.__outlet.children),this.location=W(Object.assign(i,{resolver:this})),Fe("error",Object.assign({router:this,error:s},i)),s}),this.ready}__fullyResolveChain(e,t=e){return this.__findComponentContextAfterAllRedirects(t).then(n=>{const s=n!==t?n:e,l=mt(ri(n.chain),n.resolver)===n.pathname,a=(d,c=d.route,m)=>d.next(void 0,c,m).then(h=>h===null||h===Pe?l?d:c.parent!==null?a(d,c.parent,h):h:h);return a(n).then(d=>{if(d===null||d===Pe)throw Xn(s);return d&&d!==Pe&&d!==n?this.__fullyResolveChain(s,d):this.__amendWithOnBeforeCallbacks(n)})})}__findComponentContextAfterAllRedirects(e){const t=e.result;return t instanceof HTMLElement?(hs(e,t),Promise.resolve(e)):t.redirect?this.__redirect(t.redirect,e.__redirectCount,e.__renderId).then(n=>this.__findComponentContextAfterAllRedirects(n)):t instanceof Error?Promise.reject(t):Promise.reject(new Error(Y(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${Vi(t)}". Double check the action return value for the route.`)))}__amendWithOnBeforeCallbacks(e){return this.__runOnBeforeCallbacks(e).then(t=>t===this.__previousContext||t===e?t:this.__fullyResolveChain(t))}__runOnBeforeCallbacks(e){const t=this.__previousContext||{},n=t.chain||[],i=e.chain;let s=Promise.resolve();const r=()=>({cancel:!0}),l=a=>pn(e,a);if(e.__divergedChainIndex=0,e.__skipAttach=!1,n.length){for(let a=0;a<Math.min(n.length,i.length)&&!(n[a].route!==i[a].route||n[a].path!==i[a].path&&n[a].element!==i[a].element||!this.__isReusableElement(n[a].element,i[a].element));a=++e.__divergedChainIndex);if(e.__skipAttach=i.length===n.length&&e.__divergedChainIndex==i.length&&this.__isReusableElement(e.result,t.result),e.__skipAttach){for(let a=i.length-1;a>=0;a--)s=this.__runOnBeforeLeaveCallbacks(s,e,{prevent:r},n[a]);for(let a=0;a<i.length;a++)s=this.__runOnBeforeEnterCallbacks(s,e,{prevent:r,redirect:l},i[a]),n[a].element.location=W(e,n[a].route)}else for(let a=n.length-1;a>=e.__divergedChainIndex;a--)s=this.__runOnBeforeLeaveCallbacks(s,e,{prevent:r},n[a])}if(!e.__skipAttach)for(let a=0;a<i.length;a++)a<e.__divergedChainIndex?a<n.length&&n[a].element&&(n[a].element.location=W(e,n[a].route)):(s=this.__runOnBeforeEnterCallbacks(s,e,{prevent:r,redirect:l},i[a]),i[a].element&&(i[a].element.location=W(e,i[a].route)));return s.then(a=>{if(a){if(a.cancel)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if(a.redirect)return this.__redirect(a.redirect,e.__redirectCount,e.__renderId)}return e})}__runOnBeforeLeaveCallbacks(e,t,n,i){const s=W(t);return e.then(r=>{if(this.__isLatestRender(t))return mn("onBeforeLeave",[s,n,this],i.element)(r)}).then(r=>{if(!(r||{}).redirect)return r})}__runOnBeforeEnterCallbacks(e,t,n,i){const s=W(t,i.route);return e.then(r=>{if(this.__isLatestRender(t))return mn("onBeforeEnter",[s,n,this],i.element)(r)})}__isReusableElement(e,t){return e&&t?this.__createdByRouter.get(e)&&this.__createdByRouter.get(t)?e.localName===t.localName:e===t:!1}__isLatestRender(e){return e.__renderId===this.__lastStartedRenderId}__redirect(e,t,n){if(t>ds)throw new Error(Y(`Too many redirects when rendering ${e.from}`));return this.resolve({pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:(t||0)+1,__renderId:n})}__ensureOutlet(e=this.__outlet){if(!(e instanceof Node))throw new TypeError(Y(`Expected router outlet to be a valid DOM Node (but got ${e})`))}__updateBrowserHistory({pathname:e,search:t="",hash:n=""},i){if(window.location.pathname!==e||window.location.search!==t||window.location.hash!==n){const s=i?"replaceState":"pushState";window.history[s](null,document.title,e+t+n),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(e,t){let n=this.__outlet;for(let i=0;i<e.__divergedChainIndex;i++){const s=t&&t.chain[i].element;if(s)if(s.parentNode===n)e.chain[i].element=s,n=s;else break}return n}__addAppearingContent(e,t){this.__ensureOutlet(),this.__removeAppearingContent();const n=this.__copyUnchangedElements(e,t);this.__appearingContent=[],this.__disappearingContent=Array.from(n.children).filter(s=>this.__addedByRouter.get(s)&&s!==e.result);let i=n;for(let s=e.__divergedChainIndex;s<e.chain.length;s++){const r=e.chain[s].element;r&&(i.appendChild(r),this.__addedByRouter.set(r,!0),i===n&&this.__appearingContent.push(r),i=r)}}__removeDisappearingContent(){this.__disappearingContent&&lt(this.__disappearingContent),this.__disappearingContent=null,this.__appearingContent=null}__removeAppearingContent(){this.__disappearingContent&&this.__appearingContent&&(lt(this.__appearingContent),this.__disappearingContent=null,this.__appearingContent=null)}__runOnAfterLeaveCallbacks(e,t){if(t)for(let n=t.chain.length-1;n>=e.__divergedChainIndex&&this.__isLatestRender(e);n--){const i=t.chain[n].element;if(i)try{const s=W(e);pt(i.onAfterLeave,[s,{},t.resolver],i)}finally{this.__disappearingContent.indexOf(i)>-1&&lt(i.children)}}}__runOnAfterEnterCallbacks(e){for(let t=e.__divergedChainIndex;t<e.chain.length&&this.__isLatestRender(e);t++){const n=e.chain[t].element||{},i=W(e,e.chain[t].route);pt(n.onAfterEnter,[i,{},e.resolver],n)}}__animateIfNeeded(e){const t=(this.__disappearingContent||[])[0],n=(this.__appearingContent||[])[0],i=[],s=e.chain;let r;for(let l=s.length;l>0;l--)if(s[l-1].route.animate){r=s[l-1].route.animate;break}if(t&&n&&r){const l=St(r)&&r.leave||"leaving",a=St(r)&&r.enter||"entering";i.push(un(t,l)),i.push(un(n,a))}return Promise.all(i).then(()=>e)}subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(e){const{pathname:t,search:n,hash:i}=e?e.detail:window.location;K(this.__normalizePathname(t))&&(e&&e.preventDefault&&e.preventDefault(),this.render({pathname:t,search:n,hash:i},!0))}static setTriggers(...e){rs(e)}urlForName(e,t){return this.__urlForName||(this.__urlForName=ss(this)),mt(this.__urlForName(e,t),this)}urlForPath(e,t){return mt(le.pathToRegexp.compile(e)(t),this)}static go(e){const{pathname:t,search:n,hash:i}=K(e)?this.__createUrl(e,"http://a"):e;return Fe("go",{pathname:t,search:n,hash:i})}}const ps=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,ft=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function ms(){function o(){return!0}return ai(o)}function fs(){try{return vs()?!0:gs()?ft?!ys():!ms():!1}catch{return!1}}function vs(){return localStorage.getItem("vaadin.developmentmode.force")}function gs(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function ys(){return!!(ft&&Object.keys(ft).map(e=>ft[e]).filter(e=>e.productionMode).length>0)}function ai(o,e){if(typeof o!="function")return;const t=ps.exec(o.toString());if(t)try{o=new Function(t[1])}catch(n){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",n)}return o(e)}window.Vaadin=window.Vaadin||{};const fn=function(o,e){if(window.Vaadin.developmentMode)return ai(o,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=fs());function bs(){}const _s=function(){if(typeof fn=="function")return fn(bs)};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.7.4"});_s();le.NavigationTrigger={POPSTATE:Fi,CLICK:Ui};var qt,$;(function(o){o.CONNECTED="connected",o.LOADING="loading",o.RECONNECTING="reconnecting",o.CONNECTION_LOST="connection-lost"})($||($={}));class ws{constructor(e){this.stateChangeListeners=new Set,this.loadingCount=0,this.connectionState=e,this.serviceWorkerMessageListener=this.serviceWorkerMessageListener.bind(this),navigator.serviceWorker&&(navigator.serviceWorker.addEventListener("message",this.serviceWorkerMessageListener),navigator.serviceWorker.ready.then(t=>{var n;(n=t==null?void 0:t.active)===null||n===void 0||n.postMessage({method:"Vaadin.ServiceWorker.isConnectionLost",id:"Vaadin.ServiceWorker.isConnectionLost"})}))}addStateChangeListener(e){this.stateChangeListeners.add(e)}removeStateChangeListener(e){this.stateChangeListeners.delete(e)}loadingStarted(){this.state=$.LOADING,this.loadingCount+=1}loadingFinished(){this.decreaseLoadingCount($.CONNECTED)}loadingFailed(){this.decreaseLoadingCount($.CONNECTION_LOST)}decreaseLoadingCount(e){this.loadingCount>0&&(this.loadingCount-=1,this.loadingCount===0&&(this.state=e))}get state(){return this.connectionState}set state(e){if(e!==this.connectionState){const t=this.connectionState;this.connectionState=e,this.loadingCount=0;for(const n of this.stateChangeListeners)n(t,this.connectionState)}}get online(){return this.connectionState===$.CONNECTED||this.connectionState===$.LOADING}get offline(){return!this.online}serviceWorkerMessageListener(e){typeof e.data=="object"&&e.data.id==="Vaadin.ServiceWorker.isConnectionLost"&&(e.data.result===!0&&(this.state=$.CONNECTION_LOST),navigator.serviceWorker.removeEventListener("message",this.serviceWorkerMessageListener))}}const Ss=o=>!!(o==="localhost"||o==="[::1]"||o.match(/^127\.\d+\.\d+\.\d+$/)),dt=window;if(!(!((qt=dt.Vaadin)===null||qt===void 0)&&qt.connectionState)){let o;Ss(window.location.hostname)?o=!0:o=navigator.onLine,dt.Vaadin=dt.Vaadin||{},dt.Vaadin.connectionState=new ws(o?$.CONNECTED:$.CONNECTION_LOST)}function j(o,e,t,n){var i=arguments.length,s=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(o,e,t,n);else for(var l=o.length-1;l>=0;l--)(r=o[l])&&(s=(i<3?r(s):i>3?r(e,t,s):r(e,t))||s);return i>3&&s&&Object.defineProperty(e,t,s),s}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xs=!1,vt=window,Po=vt.ShadowRoot&&(vt.ShadyCSS===void 0||vt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ao=Symbol(),vn=new WeakMap;class Io{constructor(e,t,n){if(this._$cssResult$=!0,n!==Ao)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this._strings=t}get styleSheet(){let e=this._styleSheet;const t=this._strings;if(Po&&e===void 0){const n=t!==void 0&&t.length===1;n&&(e=vn.get(t)),e===void 0&&((this._styleSheet=e=new CSSStyleSheet).replaceSync(this.cssText),n&&vn.set(t,e))}return e}toString(){return this.cssText}}const Es=o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${o}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)},li=o=>new Io(typeof o=="string"?o:String(o),void 0,Ao),E=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((n,i,s)=>n+Es(i)+o[s+1],o[0]);return new Io(t,o,Ao)},Cs=(o,e)=>{Po?o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const n=document.createElement("style"),i=vt.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=t.cssText,o.appendChild(n)})},ks=o=>{let e="";for(const t of o.cssRules)e+=t.cssText;return li(e)},gn=Po||xs?o=>o:o=>o instanceof CSSStyleSheet?ks(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Wt,Gt,Kt,di;const Z=window;let ci,de;const yn=Z.trustedTypes,$s=yn?yn.emptyScript:"",gt=Z.reactiveElementPolyfillSupportDevMode;{const o=(Wt=Z.litIssuedWarnings)!==null&&Wt!==void 0?Wt:Z.litIssuedWarnings=new Set;de=(e,t)=>{t+=` See https://lit.dev/msg/${e} for more information.`,o.has(t)||(console.warn(t),o.add(t))},de("dev-mode","Lit is in dev mode. Not recommended for production!"),!((Gt=Z.ShadyDOM)===null||Gt===void 0)&&Gt.inUse&&gt===void 0&&de("polyfill-support-missing","Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded."),ci=e=>({then:(t,n)=>{de("request-update-promise",`The \`requestUpdate\` method should no longer return a Promise but does so on \`${e}\`. Use \`updateComplete\` instead.`),t!==void 0&&t(!1)}})}const Yt=o=>{Z.emitLitDebugLogEvents&&Z.dispatchEvent(new CustomEvent("lit-debug",{detail:o}))},hi=(o,e)=>o,So={toAttribute(o,e){switch(e){case Boolean:o=o?$s:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o);break}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}break}return t}},ui=(o,e)=>e!==o&&(e===e||o===o),Jt={attribute:!0,type:String,converter:So,reflect:!1,hasChanged:ui},xo="finalized";class ee extends HTMLElement{constructor(){super(),this.__instanceProperties=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this.__reflectingProperty=null,this.__initialize()}static addInitializer(e){var t;this.finalize(),((t=this._initializers)!==null&&t!==void 0?t:this._initializers=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,n)=>{const i=this.__attributeNameForProperty(n,t);i!==void 0&&(this.__attributeToPropertyMap.set(i,n),e.push(i))}),e}static createProperty(e,t=Jt){var n;if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():`__${e}`,s=this.getPropertyDescriptor(e,i,t);s!==void 0&&(Object.defineProperty(this.prototype,e,s),this.hasOwnProperty("__reactivePropertyKeys")||(this.__reactivePropertyKeys=new Set((n=this.__reactivePropertyKeys)!==null&&n!==void 0?n:[])),this.__reactivePropertyKeys.add(e))}}static getPropertyDescriptor(e,t,n){return{get(){return this[t]},set(i){const s=this[e];this[t]=i,this.requestUpdate(e,s,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Jt}static finalize(){if(this.hasOwnProperty(xo))return!1;this[xo]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e._initializers!==void 0&&(this._initializers=[...e._initializers]),this.elementProperties=new Map(e.elementProperties),this.__attributeToPropertyMap=new Map,this.hasOwnProperty(hi("properties"))){const t=this.properties,n=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of n)this.createProperty(i,t[i])}this.elementStyles=this.finalizeStyles(this.styles);{const t=(n,i=!1)=>{this.prototype.hasOwnProperty(n)&&de(i?"renamed-api":"removed-api",`\`${n}\` is implemented on class ${this.name}. It has been ${i?"renamed":"removed"} in this version of LitElement.`)};t("initialize"),t("requestUpdateInternal"),t("_getUpdateComplete",!0)}return!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const i of n)t.unshift(gn(i))}else e!==void 0&&t.push(gn(e));return t}static __attributeNameForProperty(e,t){const n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}__initialize(){var e;this.__updatePromise=new Promise(t=>this.enableUpdating=t),this._$changedProperties=new Map,this.__saveInstanceProperties(),this.requestUpdate(),(e=this.constructor._initializers)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,n;((t=this.__controllers)!==null&&t!==void 0?t:this.__controllers=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((n=e.hostConnected)===null||n===void 0||n.call(e))}removeController(e){var t;(t=this.__controllers)===null||t===void 0||t.splice(this.__controllers.indexOf(e)>>>0,1)}__saveInstanceProperties(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this.__instanceProperties.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Cs(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this.__controllers)===null||e===void 0||e.forEach(t=>{var n;return(n=t.hostConnected)===null||n===void 0?void 0:n.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this.__controllers)===null||e===void 0||e.forEach(t=>{var n;return(n=t.hostDisconnected)===null||n===void 0?void 0:n.call(t)})}attributeChangedCallback(e,t,n){this._$attributeToProperty(e,n)}__propertyToAttribute(e,t,n=Jt){var i;const s=this.constructor.__attributeNameForProperty(e,n);if(s!==void 0&&n.reflect===!0){const l=(((i=n.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?n.converter:So).toAttribute(t,n.type);this.constructor.enabledWarnings.indexOf("migration")>=0&&l===void 0&&de("undefined-attribute-value",`The attribute value for the ${e} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`),this.__reflectingProperty=e,l==null?this.removeAttribute(s):this.setAttribute(s,l),this.__reflectingProperty=null}}_$attributeToProperty(e,t){var n;const i=this.constructor,s=i.__attributeToPropertyMap.get(e);if(s!==void 0&&this.__reflectingProperty!==s){const r=i.getPropertyOptions(s),l=typeof r.converter=="function"?{fromAttribute:r.converter}:((n=r.converter)===null||n===void 0?void 0:n.fromAttribute)!==void 0?r.converter:So;this.__reflectingProperty=s,this[s]=l.fromAttribute(t,r.type),this.__reflectingProperty=null}}requestUpdate(e,t,n){let i=!0;return e!==void 0&&(n=n||this.constructor.getPropertyOptions(e),(n.hasChanged||ui)(this[e],t)?(this._$changedProperties.has(e)||this._$changedProperties.set(e,t),n.reflect===!0&&this.__reflectingProperty!==e&&(this.__reflectingProperties===void 0&&(this.__reflectingProperties=new Map),this.__reflectingProperties.set(e,n))):i=!1),!this.isUpdatePending&&i&&(this.__updatePromise=this.__enqueueUpdate()),ci(this.localName)}async __enqueueUpdate(){this.isUpdatePending=!0;try{await this.__updatePromise}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e,t;if(!this.isUpdatePending)return;if(Yt==null||Yt({kind:"update"}),!this.hasUpdated){const s=[];if((e=this.constructor.__reactivePropertyKeys)===null||e===void 0||e.forEach(r=>{var l;this.hasOwnProperty(r)&&!(!((l=this.__instanceProperties)===null||l===void 0)&&l.has(r))&&s.push(r)}),s.length)throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${s.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`)}this.__instanceProperties&&(this.__instanceProperties.forEach((s,r)=>this[r]=s),this.__instanceProperties=void 0);let n=!1;const i=this._$changedProperties;try{n=this.shouldUpdate(i),n?(this.willUpdate(i),(t=this.__controllers)===null||t===void 0||t.forEach(s=>{var r;return(r=s.hostUpdate)===null||r===void 0?void 0:r.call(s)}),this.update(i)):this.__markUpdated()}catch(s){throw n=!1,this.__markUpdated(),s}n&&this._$didUpdate(i)}willUpdate(e){}_$didUpdate(e){var t;(t=this.__controllers)===null||t===void 0||t.forEach(n=>{var i;return(i=n.hostUpdated)===null||i===void 0?void 0:i.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e),this.isUpdatePending&&this.constructor.enabledWarnings.indexOf("change-in-update")>=0&&de("change-in-update",`Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`)}__markUpdated(){this._$changedProperties=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.__updatePromise}shouldUpdate(e){return!0}update(e){this.__reflectingProperties!==void 0&&(this.__reflectingProperties.forEach((t,n)=>this.__propertyToAttribute(n,this[n],t)),this.__reflectingProperties=void 0),this.__markUpdated()}updated(e){}firstUpdated(e){}}di=xo;ee[di]=!0;ee.elementProperties=new Map;ee.elementStyles=[];ee.shadowRootOptions={mode:"open"};gt==null||gt({ReactiveElement:ee});{ee.enabledWarnings=["change-in-update"];const o=function(e){e.hasOwnProperty(hi("enabledWarnings"))||(e.enabledWarnings=e.enabledWarnings.slice())};ee.enableWarning=function(e){o(this),this.enabledWarnings.indexOf(e)<0&&this.enabledWarnings.push(e)},ee.disableWarning=function(e){o(this);const t=this.enabledWarnings.indexOf(e);t>=0&&this.enabledWarnings.splice(t,1)}}((Kt=Z.reactiveElementVersions)!==null&&Kt!==void 0?Kt:Z.reactiveElementVersions=[]).push("1.6.3");Z.reactiveElementVersions.length>1&&de("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Xt,Qt,Zt,eo;const U=window,g=o=>{U.emitLitDebugLogEvents&&U.dispatchEvent(new CustomEvent("lit-debug",{detail:o}))};let Ts=0,xt;(Xt=U.litIssuedWarnings)!==null&&Xt!==void 0||(U.litIssuedWarnings=new Set),xt=(o,e)=>{e+=o?` See https://lit.dev/msg/${o} for more information.`:"",U.litIssuedWarnings.has(e)||(console.warn(e),U.litIssuedWarnings.add(e))},xt("dev-mode","Lit is in dev mode. Not recommended for production!");const H=!((Qt=U.ShadyDOM)===null||Qt===void 0)&&Qt.inUse&&((Zt=U.ShadyDOM)===null||Zt===void 0?void 0:Zt.noPatch)===!0?U.ShadyDOM.wrap:o=>o,Re=U.trustedTypes,bn=Re?Re.createPolicy("lit-html",{createHTML:o=>o}):void 0,Ns=o=>o,Ot=(o,e,t)=>Ns,Ps=o=>{if(_e!==Ot)throw new Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");_e=o},As=()=>{_e=Ot},Eo=(o,e,t)=>_e(o,e,t),Co="$lit$",ne=`lit$${String(Math.random()).slice(9)}$`,pi="?"+ne,Is=`<${pi}>`,ye=document,qe=()=>ye.createComment(""),We=o=>o===null||typeof o!="object"&&typeof o!="function",mi=Array.isArray,Rs=o=>mi(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",to=`[ 	
\f\r]`,Os=`[^ 	
\f\r"'\`<>=]`,Ls=`[^\\s"'>=/]`,ze=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_n=1,oo=2,Ms=3,wn=/-->/g,Sn=/>/g,me=new RegExp(`>|${to}(?:(${Ls}+)(${to}*=${to}*(?:${Os}|("|')|))|$)`,"g"),Vs=0,xn=1,Ds=2,En=3,no=/'/g,io=/"/g,fi=/^(?:script|style|textarea|title)$/i,zs=1,Et=2,Ro=1,Ct=2,Us=3,js=4,Fs=5,Oo=6,Bs=7,vi=o=>(e,...t)=>(e.some(n=>n===void 0)&&console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`),{_$litType$:o,strings:e,values:t}),v=vi(zs),Te=vi(Et),be=Symbol.for("lit-noChange"),k=Symbol.for("lit-nothing"),Cn=new WeakMap,ve=ye.createTreeWalker(ye,129,null,!1);let _e=Ot;function gi(o,e){if(!Array.isArray(o)||!o.hasOwnProperty("raw")){let t="invalid template strings array";throw t=`
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g,`
`),new Error(t)}return bn!==void 0?bn.createHTML(e):e}const Hs=(o,e)=>{const t=o.length-1,n=[];let i=e===Et?"<svg>":"",s,r=ze;for(let a=0;a<t;a++){const d=o[a];let c=-1,m,h=0,f;for(;h<d.length&&(r.lastIndex=h,f=r.exec(d),f!==null);)if(h=r.lastIndex,r===ze){if(f[_n]==="!--")r=wn;else if(f[_n]!==void 0)r=Sn;else if(f[oo]!==void 0)fi.test(f[oo])&&(s=new RegExp(`</${f[oo]}`,"g")),r=me;else if(f[Ms]!==void 0)throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions")}else r===me?f[Vs]===">"?(r=s??ze,c=-1):f[xn]===void 0?c=-2:(c=r.lastIndex-f[Ds].length,m=f[xn],r=f[En]===void 0?me:f[En]==='"'?io:no):r===io||r===no?r=me:r===wn||r===Sn?r=ze:(r=me,s=void 0);console.assert(c===-1||r===me||r===no||r===io,"unexpected parse state B");const se=r===me&&o[a+1].startsWith("/>")?" ":"";i+=r===ze?d+Is:c>=0?(n.push(m),d.slice(0,c)+Co+d.slice(c)+ne+se):d+ne+(c===-2?(n.push(void 0),a):se)}const l=i+(o[t]||"<?>")+(e===Et?"</svg>":"");return[gi(o,l),n]};class Ge{constructor({strings:e,["_$litType$"]:t},n){this.parts=[];let i,s=0,r=0;const l=e.length-1,a=this.parts,[d,c]=Hs(e,t);if(this.el=Ge.createElement(d,n),ve.currentNode=this.el.content,t===Et){const m=this.el.content,h=m.firstChild;h.remove(),m.append(...h.childNodes)}for(;(i=ve.nextNode())!==null&&a.length<l;){if(i.nodeType===1){{const m=i.localName;if(/^(?:textarea|template)$/i.test(m)&&i.innerHTML.includes(ne)){const h=`Expressions are not supported inside \`${m}\` elements. See https://lit.dev/msg/expression-in-${m} for more information.`;if(m==="template")throw new Error(h);xt("",h)}}if(i.hasAttributes()){const m=[];for(const h of i.getAttributeNames())if(h.endsWith(Co)||h.startsWith(ne)){const f=c[r++];if(m.push(h),f!==void 0){const re=i.getAttribute(f.toLowerCase()+Co).split(ne),te=/([.?@])?(.*)/.exec(f);a.push({type:Ro,index:s,name:te[2],strings:re,ctor:te[1]==="."?Ws:te[1]==="?"?Ks:te[1]==="@"?Ys:Lt})}else a.push({type:Oo,index:s})}for(const h of m)i.removeAttribute(h)}if(fi.test(i.tagName)){const m=i.textContent.split(ne),h=m.length-1;if(h>0){i.textContent=Re?Re.emptyScript:"";for(let f=0;f<h;f++)i.append(m[f],qe()),ve.nextNode(),a.push({type:Ct,index:++s});i.append(m[h],qe())}}}else if(i.nodeType===8)if(i.data===pi)a.push({type:Ct,index:s});else{let h=-1;for(;(h=i.data.indexOf(ne,h+1))!==-1;)a.push({type:Bs,index:s}),h+=ne.length-1}s++}g==null||g({kind:"template prep",template:this,clonableTemplate:this.el,parts:this.parts,strings:e})}static createElement(e,t){const n=ye.createElement("template");return n.innerHTML=e,n}}function Oe(o,e,t=o,n){var i,s,r,l;if(e===be)return e;let a=n!==void 0?(i=t.__directives)===null||i===void 0?void 0:i[n]:t.__directive;const d=We(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==d&&((s=a==null?void 0:a._$notifyDirectiveConnectionChanged)===null||s===void 0||s.call(a,!1),d===void 0?a=void 0:(a=new d(o),a._$initialize(o,t,n)),n!==void 0?((r=(l=t).__directives)!==null&&r!==void 0?r:l.__directives=[])[n]=a:t.__directive=a),a!==void 0&&(e=Oe(o,a._$resolve(o,e.values),a,n)),e}class qs{constructor(e,t){this._$parts=[],this._$disconnectableChildren=void 0,this._$template=e,this._$parent=t}get parentNode(){return this._$parent.parentNode}get _$isConnected(){return this._$parent._$isConnected}_clone(e){var t;const{el:{content:n},parts:i}=this._$template,s=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:ye).importNode(n,!0);ve.currentNode=s;let r=ve.nextNode(),l=0,a=0,d=i[0];for(;d!==void 0;){if(l===d.index){let c;d.type===Ct?c=new et(r,r.nextSibling,this,e):d.type===Ro?c=new d.ctor(r,d.name,d.strings,this,e):d.type===Oo&&(c=new Js(r,this,e)),this._$parts.push(c),d=i[++a]}l!==(d==null?void 0:d.index)&&(r=ve.nextNode(),l++)}return ve.currentNode=ye,s}_update(e){let t=0;for(const n of this._$parts)n!==void 0&&(g==null||g({kind:"set part",part:n,value:e[t],valueIndex:t,values:e,templateInstance:this}),n.strings!==void 0?(n._$setValue(e,n,t),t+=n.strings.length-2):n._$setValue(e[t])),t++}}class et{constructor(e,t,n,i){var s;this.type=Ct,this._$committedValue=k,this._$disconnectableChildren=void 0,this._$startNode=e,this._$endNode=t,this._$parent=n,this.options=i,this.__isConnected=(s=i==null?void 0:i.isConnected)!==null&&s!==void 0?s:!0,this._textSanitizer=void 0}get _$isConnected(){var e,t;return(t=(e=this._$parent)===null||e===void 0?void 0:e._$isConnected)!==null&&t!==void 0?t:this.__isConnected}get parentNode(){let e=H(this._$startNode).parentNode;const t=this._$parent;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$startNode}get endNode(){return this._$endNode}_$setValue(e,t=this){var n;if(this.parentNode===null)throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");if(e=Oe(this,e,t),We(e))e===k||e==null||e===""?(this._$committedValue!==k&&(g==null||g({kind:"commit nothing to child",start:this._$startNode,end:this._$endNode,parent:this._$parent,options:this.options}),this._$clear()),this._$committedValue=k):e!==this._$committedValue&&e!==be&&this._commitText(e);else if(e._$litType$!==void 0)this._commitTemplateResult(e);else if(e.nodeType!==void 0){if(((n=this.options)===null||n===void 0?void 0:n.host)===e){this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"),console.warn("Attempted to render the template host",e,"inside itself. This is almost always a mistake, and in dev mode ","we render some warning text. In production however, we'll ","render it, which will usually result in an error, and sometimes ","in the element disappearing from the DOM.");return}this._commitNode(e)}else Rs(e)?this._commitIterable(e):this._commitText(e)}_insert(e){return H(H(this._$startNode).parentNode).insertBefore(e,this._$endNode)}_commitNode(e){var t;if(this._$committedValue!==e){if(this._$clear(),_e!==Ot){const n=(t=this._$startNode.parentNode)===null||t===void 0?void 0:t.nodeName;if(n==="STYLE"||n==="SCRIPT"){let i="Forbidden";throw n==="STYLE"?i="Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and make do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.":i="Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.",new Error(i)}}g==null||g({kind:"commit node",start:this._$startNode,parent:this._$parent,value:e,options:this.options}),this._$committedValue=this._insert(e)}}_commitText(e){if(this._$committedValue!==k&&We(this._$committedValue)){const t=H(this._$startNode).nextSibling;this._textSanitizer===void 0&&(this._textSanitizer=Eo(t,"data","property")),e=this._textSanitizer(e),g==null||g({kind:"commit text",node:t,value:e,options:this.options}),t.data=e}else{const t=ye.createTextNode("");this._commitNode(t),this._textSanitizer===void 0&&(this._textSanitizer=Eo(t,"data","property")),e=this._textSanitizer(e),g==null||g({kind:"commit text",node:t,value:e,options:this.options}),t.data=e}this._$committedValue=e}_commitTemplateResult(e){var t;const{values:n,["_$litType$"]:i}=e,s=typeof i=="number"?this._$getTemplate(e):(i.el===void 0&&(i.el=Ge.createElement(gi(i.h,i.h[0]),this.options)),i);if(((t=this._$committedValue)===null||t===void 0?void 0:t._$template)===s)g==null||g({kind:"template updating",template:s,instance:this._$committedValue,parts:this._$committedValue._$parts,options:this.options,values:n}),this._$committedValue._update(n);else{const r=new qs(s,this),l=r._clone(this.options);g==null||g({kind:"template instantiated",template:s,instance:r,parts:r._$parts,options:this.options,fragment:l,values:n}),r._update(n),g==null||g({kind:"template instantiated and updated",template:s,instance:r,parts:r._$parts,options:this.options,fragment:l,values:n}),this._commitNode(l),this._$committedValue=r}}_$getTemplate(e){let t=Cn.get(e.strings);return t===void 0&&Cn.set(e.strings,t=new Ge(e)),t}_commitIterable(e){mi(this._$committedValue)||(this._$committedValue=[],this._$clear());const t=this._$committedValue;let n=0,i;for(const s of e)n===t.length?t.push(i=new et(this._insert(qe()),this._insert(qe()),this,this.options)):i=t[n],i._$setValue(s),n++;n<t.length&&(this._$clear(i&&H(i._$endNode).nextSibling,n),t.length=n)}_$clear(e=H(this._$startNode).nextSibling,t){var n;for((n=this._$notifyConnectionChanged)===null||n===void 0||n.call(this,!1,!0,t);e&&e!==this._$endNode;){const i=H(e).nextSibling;H(e).remove(),e=i}}setConnected(e){var t;if(this._$parent===void 0)this.__isConnected=e,(t=this._$notifyConnectionChanged)===null||t===void 0||t.call(this,e);else throw new Error("part.setConnected() may only be called on a RootPart returned from render().")}}class Lt{constructor(e,t,n,i,s){this.type=Ro,this._$committedValue=k,this._$disconnectableChildren=void 0,this.element=e,this.name=t,this._$parent=i,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$committedValue=new Array(n.length-1).fill(new String),this.strings=n):this._$committedValue=k,this._sanitizer=void 0}get tagName(){return this.element.tagName}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e,t=this,n,i){const s=this.strings;let r=!1;if(s===void 0)e=Oe(this,e,t,0),r=!We(e)||e!==this._$committedValue&&e!==be,r&&(this._$committedValue=e);else{const l=e;e=s[0];let a,d;for(a=0;a<s.length-1;a++)d=Oe(this,l[n+a],t,a),d===be&&(d=this._$committedValue[a]),r||(r=!We(d)||d!==this._$committedValue[a]),d===k?e=k:e!==k&&(e+=(d??"")+s[a+1]),this._$committedValue[a]=d}r&&!i&&this._commitValue(e)}_commitValue(e){e===k?H(this.element).removeAttribute(this.name):(this._sanitizer===void 0&&(this._sanitizer=_e(this.element,this.name,"attribute")),e=this._sanitizer(e??""),g==null||g({kind:"commit attribute",element:this.element,name:this.name,value:e,options:this.options}),H(this.element).setAttribute(this.name,e??""))}}class Ws extends Lt{constructor(){super(...arguments),this.type=Us}_commitValue(e){this._sanitizer===void 0&&(this._sanitizer=_e(this.element,this.name,"property")),e=this._sanitizer(e),g==null||g({kind:"commit property",element:this.element,name:this.name,value:e,options:this.options}),this.element[this.name]=e===k?void 0:e}}const Gs=Re?Re.emptyScript:"";class Ks extends Lt{constructor(){super(...arguments),this.type=js}_commitValue(e){g==null||g({kind:"commit boolean attribute",element:this.element,name:this.name,value:!!(e&&e!==k),options:this.options}),e&&e!==k?H(this.element).setAttribute(this.name,Gs):H(this.element).removeAttribute(this.name)}}class Ys extends Lt{constructor(e,t,n,i,s){if(super(e,t,n,i,s),this.type=Fs,this.strings!==void 0)throw new Error(`A \`<${e.localName}>\` has a \`@${t}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`)}_$setValue(e,t=this){var n;if(e=(n=Oe(this,e,t,0))!==null&&n!==void 0?n:k,e===be)return;const i=this._$committedValue,s=e===k&&i!==k||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==k&&(i===k||s);g==null||g({kind:"commit event listener",element:this.element,name:this.name,value:e,options:this.options,removeListener:s,addListener:r,oldListener:i}),s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$committedValue=e}handleEvent(e){var t,n;typeof this._$committedValue=="function"?this._$committedValue.call((n=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&n!==void 0?n:this.element,e):this._$committedValue.handleEvent(e)}}class Js{constructor(e,t,n){this.element=e,this.type=Oo,this._$disconnectableChildren=void 0,this._$parent=t,this.options=n}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e){g==null||g({kind:"commit to element binding",element:this.element,value:e,options:this.options}),Oe(this,e)}}const so=U.litHtmlPolyfillSupportDevMode;so==null||so(Ge,et);((eo=U.litHtmlVersions)!==null&&eo!==void 0?eo:U.litHtmlVersions=[]).push("2.8.0");U.litHtmlVersions.length>1&&xt("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");const Ae=(o,e,t)=>{var n,i;if(e==null)throw new TypeError(`The container to render into may not be ${e}`);const s=Ts++,r=(n=t==null?void 0:t.renderBefore)!==null&&n!==void 0?n:e;let l=r._$litPart$;if(g==null||g({kind:"begin render",id:s,value:o,container:e,options:t,part:l}),l===void 0){const a=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:null;r._$litPart$=l=new et(e.insertBefore(qe(),a),a,void 0,t??{})}return l._$setValue(o),g==null||g({kind:"end render",id:s,value:o,container:e,options:t,part:l}),l};Ae.setSanitizer=Ps,Ae.createSanitizer=Eo,Ae._testOnlyClearSanitizerFactoryDoNotCallOrElse=As;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ro,ao,lo;let Lo;{const o=(ro=globalThis.litIssuedWarnings)!==null&&ro!==void 0?ro:globalThis.litIssuedWarnings=new Set;Lo=(e,t)=>{t+=` See https://lit.dev/msg/${e} for more information.`,o.has(t)||(console.warn(t),o.add(t))}}class A extends ee{constructor(){super(...arguments),this.renderOptions={host:this},this.__childPart=void 0}createRenderRoot(){var e,t;const n=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=n.firstChild),n}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.__childPart=Ae(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this.__childPart)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.__childPart)===null||e===void 0||e.setConnected(!1)}render(){return be}}A.finalized=!0;A._$litElement$=!0;(ao=globalThis.litElementHydrateSupport)===null||ao===void 0||ao.call(globalThis,{LitElement:A});const co=globalThis.litElementPolyfillSupportDevMode;co==null||co({LitElement:A});A.finalize=function(){if(!ee.finalize.call(this))return!1;const e=(t,n,i=!1)=>{if(t.hasOwnProperty(n)){const s=(typeof t=="function"?t:t.constructor).name;Lo(i?"renamed-api":"removed-api",`\`${n}\` is implemented on class ${s}. It has been ${i?"renamed":"removed"} in this version of LitElement.`)}};return e(this,"render"),e(this,"getStyles",!0),e(this.prototype,"adoptStyles"),!0};((lo=globalThis.litElementVersions)!==null&&lo!==void 0?lo:globalThis.litElementVersions=[]).push("3.3.3");globalThis.litElementVersions.length>1&&Lo("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xs=(o,e)=>(customElements.define(o,e),e),Qs=(o,e)=>{const{kind:t,elements:n}=e;return{kind:t,elements:n,finisher(i){customElements.define(o,i)}}},F=o=>e=>typeof e=="function"?Xs(o,e):Qs(o,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zs=(o,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,o)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,o)}},er=(o,e,t)=>{e.constructor.createProperty(t,o)};function y(o){return(e,t)=>t!==void 0?er(o,e,t):Zs(o,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function T(o){return y({...o,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tr=({finisher:o,descriptor:e})=>(t,n)=>{var i;if(n!==void 0){const s=t.constructor;e!==void 0&&Object.defineProperty(t,n,e(n)),o==null||o(s,n)}else{const s=(i=t.originalKey)!==null&&i!==void 0?i:t.key,r=e!=null?{kind:"method",placement:"prototype",key:s,descriptor:e(t.key)}:{...t,key:s};return o!=null&&(r.finisher=function(l){o(l,s)}),r}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function tt(o,e){return tr({descriptor:t=>{const n={get(){var i,s;return(s=(i=this.renderRoot)===null||i===void 0?void 0:i.querySelector(o))!==null&&s!==void 0?s:null},enumerable:!0,configurable:!0};if(e){const i=typeof t=="symbol"?Symbol():`__${t}`;n.get=function(){var s,r;return this[i]===void 0&&(this[i]=(r=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(o))!==null&&r!==void 0?r:null),this[i]}}return n}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ho;const or=window;((ho=or.HTMLSlotElement)===null||ho===void 0?void 0:ho.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ir=o=>(...e)=>({_$litDirective$:o,values:e});class sr{constructor(e){}get _$isConnected(){return this._$parent._$isConnected}_$initialize(e,t,n){this.__part=e,this._$parent=t,this.__attributeIndex=n}_$resolve(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rr extends sr{constructor(e){var t;if(super(e),e.type!==nr.ATTRIBUTE||e.name!=="class"||((t=e.strings)===null||t===void 0?void 0:t.length)>2)throw new Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){var n,i;if(this._previousClasses===void 0){this._previousClasses=new Set,e.strings!==void 0&&(this._staticClasses=new Set(e.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in t)t[r]&&!(!((n=this._staticClasses)===null||n===void 0)&&n.has(r))&&this._previousClasses.add(r);return this.render(t)}const s=e.element.classList;this._previousClasses.forEach(r=>{r in t||(s.remove(r),this._previousClasses.delete(r))});for(const r in t){const l=!!t[r];l!==this._previousClasses.has(r)&&!(!((i=this._staticClasses)===null||i===void 0)&&i.has(r))&&(l?(s.add(r),this._previousClasses.add(r)):(s.remove(r),this._previousClasses.delete(r)))}return be}}const Mo=ir(rr),uo="css-loading-indicator";var G;(function(o){o.IDLE="",o.FIRST="first",o.SECOND="second",o.THIRD="third"})(G||(G={}));class I extends A{constructor(){super(),this.firstDelay=450,this.secondDelay=1500,this.thirdDelay=5e3,this.expandedDuration=2e3,this.onlineText="Online",this.offlineText="Connection lost",this.reconnectingText="Connection lost, trying to reconnect...",this.offline=!1,this.reconnecting=!1,this.expanded=!1,this.loading=!1,this.loadingBarState=G.IDLE,this.applyDefaultThemeState=!0,this.firstTimeout=0,this.secondTimeout=0,this.thirdTimeout=0,this.expandedTimeout=0,this.lastMessageState=$.CONNECTED,this.connectionStateListener=()=>{this.expanded=this.updateConnectionState(),this.expandedTimeout=this.timeoutFor(this.expandedTimeout,this.expanded,()=>{this.expanded=!1},this.expandedDuration)}}static create(){var e,t;const n=window;return!((e=n.Vaadin)===null||e===void 0)&&e.connectionIndicator||(n.Vaadin=n.Vaadin||{},n.Vaadin.connectionIndicator=document.createElement("vaadin-connection-indicator"),document.body.appendChild(n.Vaadin.connectionIndicator)),(t=n.Vaadin)===null||t===void 0?void 0:t.connectionIndicator}render(){return v`
      <div class="v-loading-indicator ${this.loadingBarState}" style=${this.getLoadingBarStyle()}></div>

      <div
        class="v-status-message ${Mo({active:this.reconnecting})}"
      >
        <span class="text"> ${this.renderMessage()} </span>
      </div>
    `}connectedCallback(){var e;super.connectedCallback();const t=window;!((e=t.Vaadin)===null||e===void 0)&&e.connectionState&&(this.connectionStateStore=t.Vaadin.connectionState,this.connectionStateStore.addStateChangeListener(this.connectionStateListener),this.updateConnectionState()),this.updateTheme()}disconnectedCallback(){super.disconnectedCallback(),this.connectionStateStore&&this.connectionStateStore.removeStateChangeListener(this.connectionStateListener),this.updateTheme()}get applyDefaultTheme(){return this.applyDefaultThemeState}set applyDefaultTheme(e){e!==this.applyDefaultThemeState&&(this.applyDefaultThemeState=e,this.updateTheme())}createRenderRoot(){return this}updateConnectionState(){var e;const t=(e=this.connectionStateStore)===null||e===void 0?void 0:e.state;return this.offline=t===$.CONNECTION_LOST,this.reconnecting=t===$.RECONNECTING,this.updateLoading(t===$.LOADING),this.loading?!1:t!==this.lastMessageState?(this.lastMessageState=t,!0):!1}updateLoading(e){this.loading=e,this.loadingBarState=G.IDLE,this.firstTimeout=this.timeoutFor(this.firstTimeout,e,()=>{this.loadingBarState=G.FIRST},this.firstDelay),this.secondTimeout=this.timeoutFor(this.secondTimeout,e,()=>{this.loadingBarState=G.SECOND},this.secondDelay),this.thirdTimeout=this.timeoutFor(this.thirdTimeout,e,()=>{this.loadingBarState=G.THIRD},this.thirdDelay)}renderMessage(){return this.reconnecting?this.reconnectingText:this.offline?this.offlineText:this.onlineText}updateTheme(){if(this.applyDefaultThemeState&&this.isConnected){if(!document.getElementById(uo)){const e=document.createElement("style");e.id=uo,e.textContent=this.getDefaultStyle(),document.head.appendChild(e)}}else{const e=document.getElementById(uo);e&&document.head.removeChild(e)}}getDefaultStyle(){return`
      @keyframes v-progress-start {
        0% {
          width: 0%;
        }
        100% {
          width: 50%;
        }
      }
      @keyframes v-progress-delay {
        0% {
          width: 50%;
        }
        100% {
          width: 90%;
        }
      }
      @keyframes v-progress-wait {
        0% {
          width: 90%;
          height: 4px;
        }
        3% {
          width: 91%;
          height: 7px;
        }
        100% {
          width: 96%;
          height: 7px;
        }
      }
      @keyframes v-progress-wait-pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.1;
        }
        100% {
          opacity: 1;
        }
      }
      .v-loading-indicator,
      .v-status-message {
        position: fixed;
        z-index: 251;
        left: 0;
        right: auto;
        top: 0;
        background-color: var(--lumo-primary-color, var(--material-primary-color, blue));
        transition: none;
      }
      .v-loading-indicator {
        width: 50%;
        height: 4px;
        opacity: 1;
        pointer-events: none;
        animation: v-progress-start 1000ms 200ms both;
      }
      .v-loading-indicator[style*='none'] {
        display: block !important;
        width: 100%;
        opacity: 0;
        animation: none;
        transition: opacity 500ms 300ms, width 300ms;
      }
      .v-loading-indicator.second {
        width: 90%;
        animation: v-progress-delay 3.8s forwards;
      }
      .v-loading-indicator.third {
        width: 96%;
        animation: v-progress-wait 5s forwards, v-progress-wait-pulse 1s 4s infinite backwards;
      }

      vaadin-connection-indicator[offline] .v-loading-indicator,
      vaadin-connection-indicator[reconnecting] .v-loading-indicator {
        display: none;
      }

      .v-status-message {
        opacity: 0;
        width: 100%;
        max-height: var(--status-height-collapsed, 8px);
        overflow: hidden;
        background-color: var(--status-bg-color-online, var(--lumo-primary-color, var(--material-primary-color, blue)));
        color: var(
          --status-text-color-online,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1;
        transition: all 0.5s;
        padding: 0 0.5em;
      }

      vaadin-connection-indicator[offline] .v-status-message,
      vaadin-connection-indicator[reconnecting] .v-status-message {
        opacity: 1;
        background-color: var(--status-bg-color-offline, var(--lumo-shade, #333));
        color: var(
          --status-text-color-offline,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        background-image: repeating-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0) 10px,
          rgba(255, 255, 255, 0.1) 10px,
          rgba(255, 255, 255, 0.1) 20px
        );
      }

      vaadin-connection-indicator[reconnecting] .v-status-message {
        animation: show-reconnecting-status 2s;
      }

      vaadin-connection-indicator[offline] .v-status-message:hover,
      vaadin-connection-indicator[reconnecting] .v-status-message:hover,
      vaadin-connection-indicator[expanded] .v-status-message {
        max-height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[expanded] .v-status-message {
        opacity: 1;
      }

      .v-status-message span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[reconnecting] .v-status-message span::before {
        content: '';
        width: 1em;
        height: 1em;
        border-top: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-left: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-right: 2px solid transparent;
        border-bottom: 2px solid transparent;
        border-radius: 50%;
        box-sizing: border-box;
        animation: v-spin 0.4s linear infinite;
        margin: 0 0.5em;
      }

      @keyframes v-spin {
        100% {
          transform: rotate(360deg);
        }
      }
    `}getLoadingBarStyle(){switch(this.loadingBarState){case G.IDLE:return"display: none";case G.FIRST:case G.SECOND:case G.THIRD:return"display: block";default:return""}}timeoutFor(e,t,n,i){return e!==0&&window.clearTimeout(e),t?window.setTimeout(n,i):0}static get instance(){return I.create()}}j([y({type:Number})],I.prototype,"firstDelay",void 0);j([y({type:Number})],I.prototype,"secondDelay",void 0);j([y({type:Number})],I.prototype,"thirdDelay",void 0);j([y({type:Number})],I.prototype,"expandedDuration",void 0);j([y({type:String})],I.prototype,"onlineText",void 0);j([y({type:String})],I.prototype,"offlineText",void 0);j([y({type:String})],I.prototype,"reconnectingText",void 0);j([y({type:Boolean,reflect:!0})],I.prototype,"offline",void 0);j([y({type:Boolean,reflect:!0})],I.prototype,"reconnecting",void 0);j([y({type:Boolean,reflect:!0})],I.prototype,"expanded",void 0);j([y({type:Boolean,reflect:!0})],I.prototype,"loading",void 0);j([y({type:String})],I.prototype,"loadingBarState",void 0);j([y({type:Boolean})],I.prototype,"applyDefaultTheme",null);customElements.get("vaadin-connection-indicator")===void 0&&customElements.define("vaadin-connection-indicator",I);I.instance;const Ke=window;Ke.Vaadin=Ke.Vaadin||{};Ke.Vaadin.registrations=Ke.Vaadin.registrations||[];Ke.Vaadin.registrations.push({is:"@vaadin/common-frontend",version:"0.0.18"});class kn extends Error{}const Ue=window.document.body,w=window;class ar{constructor(e){this.response=void 0,this.pathname="",this.isActive=!1,this.baseRegex=/^\//,this.navigation="",Ue.$=Ue.$||[],this.config=e||{},w.Vaadin=w.Vaadin||{},w.Vaadin.Flow=w.Vaadin.Flow||{},w.Vaadin.Flow.clients={TypeScript:{isActive:()=>this.isActive}};const t=document.head.querySelector("base");this.baseRegex=new RegExp(`^${(document.baseURI||t&&t.href||"/").replace(/^https?:\/\/[^/]+/i,"")}`),this.appShellTitle=document.title,this.addConnectionIndicator()}get serverSideRoutes(){return[{path:"(.*)",action:this.action}]}loadingStarted(){this.isActive=!0,w.Vaadin.connectionState.loadingStarted()}loadingFinished(){this.isActive=!1,w.Vaadin.connectionState.loadingFinished(),!w.Vaadin.listener&&(w.Vaadin.listener={},document.addEventListener("click",e=>{e.target&&(e.target.hasAttribute("router-link")?this.navigation="link":e.composedPath().some(t=>t.nodeName==="A")&&(this.navigation="client"))},{capture:!0}))}get action(){return async e=>{if(this.pathname=e.pathname,w.Vaadin.connectionState.online)try{await this.flowInit()}catch(t){if(t instanceof kn)return w.Vaadin.connectionState.state=$.CONNECTION_LOST,this.offlineStubAction();throw t}else return this.offlineStubAction();return this.container.onBeforeEnter=(t,n)=>this.flowNavigate(t,n),this.container.onBeforeLeave=(t,n)=>this.flowLeave(t,n),this.container}}async flowLeave(e,t){const{connectionState:n}=w.Vaadin;return this.pathname===e.pathname||!this.isFlowClientLoaded()||n.offline?Promise.resolve({}):new Promise(i=>{this.loadingStarted(),this.container.serverConnected=s=>{i(t&&s?t.prevent():{}),this.loadingFinished()},Ue.$server.leaveNavigation(this.getFlowRoutePath(e),this.getFlowRouteQuery(e))})}async flowNavigate(e,t){return this.response?new Promise(n=>{this.loadingStarted(),this.container.serverConnected=(i,s)=>{t&&i?n(t.prevent()):t&&t.redirect&&s?n(t.redirect(s.pathname)):(this.container.style.display="",n(this.container)),this.loadingFinished()},this.container.serverPaused=()=>{this.loadingFinished()},Ue.$server.connectClient(this.getFlowRoutePath(e),this.getFlowRouteQuery(e),this.appShellTitle,history.state,this.navigation),this.navigation="history"}):Promise.resolve(this.container)}getFlowRoutePath(e){return decodeURIComponent(e.pathname).replace(this.baseRegex,"")}getFlowRouteQuery(e){return e.search&&e.search.substring(1)||""}async flowInit(){if(!this.isFlowClientLoaded()){this.loadingStarted(),this.response=await this.flowInitUi();const{pushScript:e,appConfig:t}=this.response;typeof e=="string"&&await this.loadScript(e);const{appId:n}=t;await(await x(()=>import("./FlowBootstrap-feff2646.js"),[],import.meta.url)).init(this.response),typeof this.config.imports=="function"&&(this.injectAppIdScript(n),await this.config.imports());const s=`flow-container-${n.toLowerCase()}`,r=document.querySelector(s);r?this.container=r:(this.container=document.createElement(s),this.container.id=n),Ue.$[n]=this.container;const l=await x(()=>import("./FlowClient-341d667e.js"),[],import.meta.url);await this.flowInitClient(l),this.loadingFinished()}return this.container&&!this.container.isConnected&&(this.container.style.display="none",document.body.appendChild(this.container)),this.response}async loadScript(e){return new Promise((t,n)=>{const i=document.createElement("script");i.onload=()=>t(),i.onerror=n,i.src=e,document.body.appendChild(i)})}injectAppIdScript(e){const t=e.substring(0,e.lastIndexOf("-")),n=document.createElement("script");n.type="module",n.setAttribute("data-app-id",t),document.body.append(n)}async flowInitClient(e){return e.init(),new Promise(t=>{const n=setInterval(()=>{Object.keys(w.Vaadin.Flow.clients).filter(s=>s!=="TypeScript").reduce((s,r)=>s||w.Vaadin.Flow.clients[r].isActive(),!1)||(clearInterval(n),t())},5)})}async flowInitUi(){const e=w.Vaadin&&w.Vaadin.TypeScript&&w.Vaadin.TypeScript.initial;return e?(w.Vaadin.TypeScript.initial=void 0,Promise.resolve(e)):new Promise((t,n)=>{const s=new XMLHttpRequest,r=`?v-r=init&location=${encodeURIComponent(this.getFlowRoutePath(location))}&query=${encodeURIComponent(this.getFlowRouteQuery(location))}`;s.open("GET",r),s.onerror=()=>n(new kn(`Invalid server response when initializing Flow UI.
        ${s.status}
        ${s.responseText}`)),s.onload=()=>{const l=s.getResponseHeader("content-type");l&&l.indexOf("application/json")!==-1?t(JSON.parse(s.responseText)):s.onerror()},s.send()})}addConnectionIndicator(){I.create(),w.addEventListener("online",()=>{if(!this.isFlowClientLoaded()){w.Vaadin.connectionState.state=$.RECONNECTING;const e=new XMLHttpRequest;e.open("HEAD","sw.js"),e.onload=()=>{w.Vaadin.connectionState.state=$.CONNECTED},e.onerror=()=>{w.Vaadin.connectionState.state=$.CONNECTION_LOST},setTimeout(()=>e.send(),50)}}),w.addEventListener("offline",()=>{this.isFlowClientLoaded()||(w.Vaadin.connectionState.state=$.CONNECTION_LOST)})}async offlineStubAction(){const e=document.createElement("iframe"),t="./offline-stub.html";e.setAttribute("src",t),e.setAttribute("style","width: 100%; height: 100%; border: 0"),this.response=void 0;let n;const i=()=>{n!==void 0&&(w.Vaadin.connectionState.removeStateChangeListener(n),n=void 0)};return e.onBeforeEnter=(s,r,l)=>{n=()=>{w.Vaadin.connectionState.online&&(i(),l.render(s,!1))},w.Vaadin.connectionState.addStateChangeListener(n)},e.onBeforeLeave=(s,r,l)=>{i()},e}isFlowClientLoaded(){return this.response!==void 0}}const{serverSideRoutes:lr}=new ar({imports:()=>x(()=>import("./generated-flow-imports-33ddc4bf.js"),[],import.meta.url)}),dr=[...lr],cr=new le(document.querySelector("#outlet"));cr.setRoutes(dr);(function(){if(typeof document>"u"||"adoptedStyleSheets"in document)return;var o="ShadyCSS"in window&&!ShadyCSS.nativeShadow,e=document.implementation.createHTMLDocument(""),t=new WeakMap,n=typeof DOMException=="object"?Error:DOMException,i=Object.defineProperty,s=Array.prototype.forEach,r=/@import.+?;?$/gm;function l(u){var p=u.replace(r,"");return p!==u&&console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418"),p.trim()}function a(u){return"isConnected"in u?u.isConnected:document.contains(u)}function d(u){return u.filter(function(p,b){return u.indexOf(p)===b})}function c(u,p){return u.filter(function(b){return p.indexOf(b)===-1})}function m(u){u.parentNode.removeChild(u)}function h(u){return u.shadowRoot||t.get(u)}var f=["addRule","deleteRule","insertRule","removeRule"],se=CSSStyleSheet,re=se.prototype;re.replace=function(){return Promise.reject(new n("Can't call replace on non-constructed CSSStyleSheets."))},re.replaceSync=function(){throw new n("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.")};function te(u){return typeof u=="object"?Ee.isPrototypeOf(u)||re.isPrototypeOf(u):!1}function zt(u){return typeof u=="object"?re.isPrototypeOf(u):!1}var B=new WeakMap,X=new WeakMap,Se=new WeakMap,xe=new WeakMap;function Ut(u,p){var b=document.createElement("style");return Se.get(u).set(p,b),X.get(u).push(p),b}function oe(u,p){return Se.get(u).get(p)}function nt(u,p){Se.get(u).delete(p),X.set(u,X.get(u).filter(function(b){return b!==p}))}function Wo(u,p){requestAnimationFrame(function(){p.textContent=B.get(u).textContent,xe.get(u).forEach(function(b){return p.sheet[b.method].apply(p.sheet,b.args)})})}function it(u){if(!B.has(u))throw new TypeError("Illegal invocation")}function jt(){var u=this,p=document.createElement("style");e.body.appendChild(p),B.set(u,p),X.set(u,[]),Se.set(u,new WeakMap),xe.set(u,[])}var Ee=jt.prototype;Ee.replace=function(p){try{return this.replaceSync(p),Promise.resolve(this)}catch(b){return Promise.reject(b)}},Ee.replaceSync=function(p){if(it(this),typeof p=="string"){var b=this;B.get(b).textContent=l(p),xe.set(b,[]),X.get(b).forEach(function(L){L.isConnected()&&Wo(b,oe(b,L))})}},i(Ee,"cssRules",{configurable:!0,enumerable:!0,get:function(){return it(this),B.get(this).sheet.cssRules}}),i(Ee,"media",{configurable:!0,enumerable:!0,get:function(){return it(this),B.get(this).sheet.media}}),f.forEach(function(u){Ee[u]=function(){var p=this;it(p);var b=arguments;xe.get(p).push({method:u,args:b}),X.get(p).forEach(function(D){if(D.isConnected()){var R=oe(p,D).sheet;R[u].apply(R,b)}});var L=B.get(p).sheet;return L[u].apply(L,b)}}),i(jt,Symbol.hasInstance,{configurable:!0,value:te});var Go={childList:!0,subtree:!0},Ko=new WeakMap;function Ce(u){var p=Ko.get(u);return p||(p=new Xo(u),Ko.set(u,p)),p}function Yo(u){i(u.prototype,"adoptedStyleSheets",{configurable:!0,enumerable:!0,get:function(){return Ce(this).sheets},set:function(p){Ce(this).update(p)}})}function Ft(u,p){for(var b=document.createNodeIterator(u,NodeFilter.SHOW_ELEMENT,function(D){return h(D)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT},null,!1),L=void 0;L=b.nextNode();)p(h(L))}var st=new WeakMap,ke=new WeakMap,rt=new WeakMap;function Ri(u,p){return p instanceof HTMLStyleElement&&ke.get(u).some(function(b){return oe(b,u)})}function Jo(u){var p=st.get(u);return p instanceof Document?p.body:p}function Bt(u){var p=document.createDocumentFragment(),b=ke.get(u),L=rt.get(u),D=Jo(u);L.disconnect(),b.forEach(function(R){p.appendChild(oe(R,u)||Ut(R,u))}),D.insertBefore(p,null),L.observe(D,Go),b.forEach(function(R){Wo(R,oe(R,u))})}function Xo(u){var p=this;p.sheets=[],st.set(p,u),ke.set(p,[]),rt.set(p,new MutationObserver(function(b,L){if(!document){L.disconnect();return}b.forEach(function(D){o||s.call(D.addedNodes,function(R){R instanceof Element&&Ft(R,function($e){Ce($e).connect()})}),s.call(D.removedNodes,function(R){R instanceof Element&&(Ri(p,R)&&Bt(p),o||Ft(R,function($e){Ce($e).disconnect()}))})})}))}if(Xo.prototype={isConnected:function(){var u=st.get(this);return u instanceof Document?u.readyState!=="loading":a(u.host)},connect:function(){var u=Jo(this);rt.get(this).observe(u,Go),ke.get(this).length>0&&Bt(this),Ft(u,function(p){Ce(p).connect()})},disconnect:function(){rt.get(this).disconnect()},update:function(u){var p=this,b=st.get(p)===document?"Document":"ShadowRoot";if(!Array.isArray(u))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+b+": Iterator getter is not callable.");if(!u.every(te))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+b+": Failed to convert value to 'CSSStyleSheet'");if(u.some(zt))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+b+": Can't adopt non-constructed stylesheets");p.sheets=u;var L=ke.get(p),D=d(u),R=c(L,D);R.forEach(function($e){m(oe($e,p)),nt($e,p)}),ke.set(p,D),p.isConnected()&&D.length>0&&Bt(p)}},window.CSSStyleSheet=jt,Yo(Document),"ShadowRoot"in window){Yo(ShadowRoot);var Qo=Element.prototype,Oi=Qo.attachShadow;Qo.attachShadow=function(p){var b=Oi.call(this,p);return p.mode==="closed"&&t.set(this,b),b}}var at=Ce(document);at.isConnected()?at.connect():document.addEventListener("DOMContentLoaded",at.connect.bind(at))})();/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yi=Symbol.for(""),hr=o=>{if((o==null?void 0:o.r)===yi)return o==null?void 0:o._$litStatic$},ur=o=>{if(o._$litStatic$!==void 0)return o._$litStatic$;throw new Error(`Value passed to 'literal' function must be a 'literal' result: ${o}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)},ct=(o,...e)=>({_$litStatic$:e.reduce((t,n,i)=>t+ur(n)+o[i+1],o[0]),r:yi}),$n=new Map,pr=o=>(e,...t)=>{const n=t.length;let i,s;const r=[],l=[];let a=0,d=!1,c;for(;a<n;){for(c=e[a];a<n&&(s=t[a],(i=hr(s))!==void 0);)c+=i+e[++a],d=!0;a!==n&&l.push(s),r.push(c),a++}if(a===n&&r.push(e[n]),d){const m=r.join("$$lit$$");e=$n.get(m),e===void 0&&(r.raw=r,$n.set(m,e=r)),t=l}return o(e,...t)},mr=pr(v),fr="modulepreload",vr=function(o){return"/"+o},Tn={},S=function(o,e,t){if(!e||e.length===0)return o();const n=document.getElementsByTagName("link");return Promise.all(e.map(i=>{if(i=vr(i),i in Tn)return;Tn[i]=!0;const s=i.endsWith(".css"),r=s?'[rel="stylesheet"]':"";if(t)for(let a=n.length-1;a>=0;a--){const d=n[a];if(d.href===i&&(!s||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${r}`))return;const l=document.createElement("link");if(l.rel=s?"stylesheet":fr,s||(l.as="script",l.crossOrigin=""),l.href=i,document.head.appendChild(l),s)return new Promise((a,d)=>{l.addEventListener("load",a),l.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>o()).catch(i=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i})};function gr(o){var e;const t=[];for(;o&&o.parentNode;){const n=yr(o);if(n.nodeId!==-1){if((e=n.element)!=null&&e.tagName.startsWith("FLOW-CONTAINER-"))break;t.push(n)}o=o.parentElement?o.parentElement:o.parentNode.host}return t.reverse()}function yr(o){const e=window.Vaadin;if(e&&e.Flow){const{clients:t}=e.Flow,n=Object.keys(t);for(const i of n){const s=t[i];if(s.getNodeId){const r=s.getNodeId(o);if(r>=0)return{nodeId:r,uiId:s.getUIId(),element:o}}}}return{nodeId:-1,uiId:-1,element:void 0}}function br(o,e){if(o.contains(e))return!0;let t=e;const n=e.ownerDocument;for(;t&&t!==n&&t!==o;)t=t.parentNode||(t instanceof ShadowRoot?t.host:null);return t===o}const _r=(o,e)=>{const t=o[e];return t?typeof t=="function"?t():Promise.resolve(t):new Promise((n,i)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(i.bind(null,new Error("Unknown variable dynamic import: "+e)))})};var P=(o=>(o.text="text",o.checkbox="checkbox",o.range="range",o.color="color",o))(P||{});const J={lumoSize:["--lumo-size-xs","--lumo-size-s","--lumo-size-m","--lumo-size-l","--lumo-size-xl"],lumoSpace:["--lumo-space-xs","--lumo-space-s","--lumo-space-m","--lumo-space-l","--lumo-space-xl"],lumoBorderRadius:["0","--lumo-border-radius-m","--lumo-border-radius-l"],lumoFontSize:["--lumo-font-size-xxs","--lumo-font-size-xs","--lumo-font-size-s","--lumo-font-size-m","--lumo-font-size-l","--lumo-font-size-xl","--lumo-font-size-xxl","--lumo-font-size-xxxl"],lumoTextColor:["--lumo-header-text-color","--lumo-body-text-color","--lumo-secondary-text-color","--lumo-tertiary-text-color","--lumo-disabled-text-color","--lumo-primary-text-color","--lumo-error-text-color","--lumo-success-text-color"],basicBorderSize:["0px","1px","2px","3px"]},wr=Object.freeze(Object.defineProperty({__proto__:null,presets:J},Symbol.toStringTag,{value:"Module"})),je={textColor:{propertyName:"color",displayName:"Text color",editorType:P.color,presets:J.lumoTextColor},fontSize:{propertyName:"font-size",displayName:"Font size",editorType:P.range,presets:J.lumoFontSize,icon:"font"},fontWeight:{propertyName:"font-weight",displayName:"Bold",editorType:P.checkbox,checkedValue:"bold"},fontStyle:{propertyName:"font-style",displayName:"Italic",editorType:P.checkbox,checkedValue:"italic"}},Ne={backgroundColor:{propertyName:"background-color",displayName:"Background color",editorType:P.color},borderColor:{propertyName:"border-color",displayName:"Border color",editorType:P.color},borderWidth:{propertyName:"border-width",displayName:"Border width",editorType:P.range,presets:J.basicBorderSize,icon:"square"},borderRadius:{propertyName:"border-radius",displayName:"Border radius",editorType:P.range,presets:J.lumoBorderRadius,icon:"square"},padding:{propertyName:"padding",displayName:"Padding",editorType:P.range,presets:J.lumoSpace,icon:"square"},gap:{propertyName:"gap",displayName:"Spacing",editorType:P.range,presets:J.lumoSpace,icon:"square"}},Sr={height:{propertyName:"height",displayName:"Size",editorType:P.range,presets:J.lumoSize,icon:"square"},paddingInline:{propertyName:"padding-inline",displayName:"Padding",editorType:P.range,presets:J.lumoSpace,icon:"square"}},xr={iconColor:{propertyName:"color",displayName:"Icon color",editorType:P.color,presets:J.lumoTextColor},iconSize:{propertyName:"font-size",displayName:"Icon size",editorType:P.range,presets:J.lumoFontSize,icon:"font"}},Er=Object.freeze(Object.defineProperty({__proto__:null,fieldProperties:Sr,iconProperties:xr,shapeProperties:Ne,textProperties:je},Symbol.toStringTag,{value:"Module"}));function bi(o){const e=o.charAt(0).toUpperCase()+o.slice(1);return{tagName:o,displayName:e,elements:[{selector:o,displayName:"Element",properties:[Ne.backgroundColor,Ne.borderColor,Ne.borderWidth,Ne.borderRadius,Ne.padding,je.textColor,je.fontSize,je.fontWeight,je.fontStyle]}]}}const Cr=Object.freeze(Object.defineProperty({__proto__:null,createGenericMetadata:bi},Symbol.toStringTag,{value:"Module"})),kr=o=>_r(Object.assign({"./components/defaults.ts":()=>S(()=>Promise.resolve().then(()=>Er),void 0),"./components/generic.ts":()=>S(()=>Promise.resolve().then(()=>Cr),void 0),"./components/presets.ts":()=>S(()=>Promise.resolve().then(()=>wr),void 0),"./components/vaadin-app-layout.ts":()=>S(()=>x(()=>import("./vaadin-app-layout-37492a04-2c5d3ebd.js"),[],import.meta.url),[]),"./components/vaadin-avatar.ts":()=>S(()=>x(()=>import("./vaadin-avatar-7047be31-a46cf3a4.js"),[],import.meta.url),[]),"./components/vaadin-big-decimal-field.ts":()=>S(()=>x(()=>import("./vaadin-big-decimal-field-b42c1de1-8b8f2000.js"),["./vaadin-big-decimal-field-b42c1de1-8b8f2000.js","./vaadin-text-field-e82c445d-a01ccd4a.js"],import.meta.url),["assets/vaadin-big-decimal-field-b42c1de1.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-button.ts":()=>S(()=>x(()=>import("./vaadin-button-79ad9d5f-39e5f8dc.js"),[],import.meta.url),[]),"./components/vaadin-checkbox-group.ts":()=>S(()=>x(()=>import("./vaadin-checkbox-group-a9a9e85d-8cbeeb5a.js"),["./vaadin-checkbox-group-a9a9e85d-8cbeeb5a.js","./vaadin-text-field-e82c445d-a01ccd4a.js","./vaadin-checkbox-13797fc9-fe08c0ac.js"],import.meta.url),["assets/vaadin-checkbox-group-a9a9e85d.js","assets/vaadin-text-field-e82c445d.js","assets/vaadin-checkbox-13797fc9.js"]),"./components/vaadin-checkbox.ts":()=>S(()=>x(()=>import("./vaadin-checkbox-13797fc9-fe08c0ac.js"),[],import.meta.url),[]),"./components/vaadin-combo-box.ts":()=>S(()=>x(()=>import("./vaadin-combo-box-9046f78f-094e0f2b.js"),["./vaadin-combo-box-9046f78f-094e0f2b.js","./vaadin-text-field-e82c445d-a01ccd4a.js"],import.meta.url),["assets/vaadin-combo-box-9046f78f.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-email-field.ts":()=>S(()=>x(()=>import("./vaadin-email-field-da851bcb-2cc1c682.js"),["./vaadin-email-field-da851bcb-2cc1c682.js","./vaadin-text-field-e82c445d-a01ccd4a.js"],import.meta.url),["assets/vaadin-email-field-da851bcb.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-horizontal-layout.ts":()=>S(()=>x(()=>import("./vaadin-horizontal-layout-f7b1ab51-e7fc76a2.js"),[],import.meta.url),[]),"./components/vaadin-integer-field.ts":()=>S(()=>x(()=>import("./vaadin-integer-field-6e2954cf-1add6975.js"),["./vaadin-integer-field-6e2954cf-1add6975.js","./vaadin-text-field-e82c445d-a01ccd4a.js"],import.meta.url),["assets/vaadin-integer-field-6e2954cf.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-menu-bar.ts":()=>S(()=>x(()=>import("./vaadin-menu-bar-be33385c-8cca4f6a.js"),[],import.meta.url),[]),"./components/vaadin-number-field.ts":()=>S(()=>x(()=>import("./vaadin-number-field-31df11f5-efd0d4c6.js"),["./vaadin-number-field-31df11f5-efd0d4c6.js","./vaadin-text-field-e82c445d-a01ccd4a.js"],import.meta.url),["assets/vaadin-number-field-31df11f5.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-password-field.ts":()=>S(()=>x(()=>import("./vaadin-password-field-49ffb113-3ba3de3e.js"),["./vaadin-password-field-49ffb113-3ba3de3e.js","./vaadin-text-field-e82c445d-a01ccd4a.js"],import.meta.url),["assets/vaadin-password-field-49ffb113.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-progress-bar.ts":()=>S(()=>x(()=>import("./vaadin-progress-bar-3b53bb70-16dfc948.js"),[],import.meta.url),[]),"./components/vaadin-radio-group.ts":()=>S(()=>x(()=>import("./vaadin-radio-group-4a6e2cf4-bcc26de1.js"),["./vaadin-radio-group-4a6e2cf4-bcc26de1.js","./vaadin-text-field-e82c445d-a01ccd4a.js"],import.meta.url),["assets/vaadin-radio-group-4a6e2cf4.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-scroller.ts":()=>S(()=>x(()=>import("./vaadin-scroller-35e68818-c7c45b1c.js"),[],import.meta.url),[]),"./components/vaadin-select.ts":()=>S(()=>x(()=>import("./vaadin-select-5d6ab45b-2ba0d4e6.js"),["./vaadin-select-5d6ab45b-2ba0d4e6.js","./vaadin-text-field-e82c445d-a01ccd4a.js"],import.meta.url),["assets/vaadin-select-5d6ab45b.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-split-layout.ts":()=>S(()=>x(()=>import("./vaadin-split-layout-10c9713b-cc34648b.js"),[],import.meta.url),[]),"./components/vaadin-text-area.ts":()=>S(()=>x(()=>import("./vaadin-text-area-41c5f60c-d8f98aef.js"),["./vaadin-text-area-41c5f60c-d8f98aef.js","./vaadin-text-field-e82c445d-a01ccd4a.js"],import.meta.url),["assets/vaadin-text-area-41c5f60c.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-text-field.ts":()=>S(()=>x(()=>import("./vaadin-text-field-e82c445d-a01ccd4a.js"),[],import.meta.url),[]),"./components/vaadin-time-picker.ts":()=>S(()=>x(()=>import("./vaadin-time-picker-2fa5314f-feb508a2.js"),["./vaadin-time-picker-2fa5314f-feb508a2.js","./vaadin-text-field-e82c445d-a01ccd4a.js"],import.meta.url),["assets/vaadin-time-picker-2fa5314f.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-vertical-layout.ts":()=>S(()=>x(()=>import("./vaadin-vertical-layout-ff73c403-7266456d.js"),[],import.meta.url),[]),"./components/vaadin-virtual-list.ts":()=>S(()=>x(()=>import("./vaadin-virtual-list-62d4499a-9045a9e2.js"),[],import.meta.url),[])}),`./components/${o}.ts`);class $r{constructor(e=kr){this.loader=e,this.metadata={}}async getMetadata(e){var t;const n=(t=e.element)==null?void 0:t.localName;if(!n)return null;if(!n.startsWith("vaadin-"))return bi(n);let i=this.metadata[n];if(i)return i;try{i=(await this.loader(n)).default,this.metadata[n]=i}catch{console.warn(`Failed to load metadata for component: ${n}`)}return i||null}}const Tr=new $r,yt={crosshair:Te`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
   <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
   <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
   <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
   <path d="M9 12l6 0"></path>
   <path d="M12 9l0 6"></path>
</svg>`,square:Te`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
</svg>`,font:Te`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 20l3 0"></path>
   <path d="M14 20l7 0"></path>
   <path d="M6.9 15l6.9 0"></path>
   <path d="M10.2 6.3l5.8 13.7"></path>
   <path d="M5 20l6 -16l2 0l7 16"></path>
</svg>`,undo:Te`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1"></path>
</svg>`,redo:Te`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M15 13l4 -4l-4 -4m4 4h-11a4 4 0 0 0 0 8h1"></path>
</svg>`,cross:Te`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M18 6l-12 12"></path>
   <path d="M6 6l12 12"></path>
</svg>`};var Ye=(o=>(o.disabled="disabled",o.enabled="enabled",o.missing_theme="missing_theme",o))(Ye||{}),z=(o=>(o.local="local",o.global="global",o))(z||{});function po(o,e){return`${o}|${e}`}class ce{constructor(e){this._properties={},this._metadata=e}get metadata(){return this._metadata}get properties(){return Object.values(this._properties)}getPropertyValue(e,t){return this._properties[po(e,t)]||null}updatePropertyValue(e,t,n,i){if(!n){delete this._properties[po(e,t)];return}let s=this.getPropertyValue(e,t);s?(s.value=n,s.modified=i||!1):(s={elementSelector:e,propertyName:t,value:n,modified:i||!1},this._properties[po(e,t)]=s)}addPropertyValues(e){e.forEach(t=>{this.updatePropertyValue(t.elementSelector,t.propertyName,t.value,t.modified)})}getPropertyValuesForElement(e){return this.properties.filter(t=>t.elementSelector===e)}static combine(...e){if(e.length<2)throw new Error("Must provide at least two themes");const t=new ce(e[0].metadata);return e.forEach(n=>t.addPropertyValues(n.properties)),t}static fromServerRules(e,t,n){const i=new ce(e);return e.elements.forEach(s=>{const r=Le(s,t),l=n.find(a=>a.selector===r);l&&s.properties.forEach(a=>{const d=l.properties[a.propertyName];d&&i.updatePropertyValue(s.selector,a.propertyName,d,!0)})}),i}}function Le(o,e){const t=o.selector;if(e.themeScope==="global")return t;if(!e.localClassName)throw new Error("Can not build local scoped selector without instance class name");const n=t.match(/^[\w\d-_]+/),i=n&&n[0];if(!i)throw new Error(`Selector does not start with a tag name: ${t}`);return`${i}.${e.localClassName}${t.substring(i.length,t.length)}`}function Nr(o,e,t,n){const i=Le(o,e),s={[t]:n};return t==="border-width"&&(parseInt(n)>0?s["border-style"]="solid":s["border-style"]=""),{selector:i,properties:s}}function Pr(o){const e=Object.entries(o.properties).map(([t,n])=>`${t}: ${n};`).join(" ");return`${o.selector} { ${e} }`}let ht,Nn="";function Vo(o){ht||(ht=new CSSStyleSheet,document.adoptedStyleSheets=[...document.adoptedStyleSheets,ht]),Nn+=o.cssText,ht.replaceSync(Nn)}const _i=E`
  .editor-row {
    display: flex;
    align-items: baseline;
    padding: var(--theme-editor-section-horizontal-padding);
    gap: 10px;
  }

  .editor-row > .label {
    flex: 0 0 auto;
    width: 120px;
  }

  .editor-row > .editor {
    flex: 1 1 0;
  }
`,Pn="__vaadin-theme-editor-measure-element",An=/((::before)|(::after))$/,In=/::part\(([\w\d_-]+)\)$/;Vo(E`
  .__vaadin-theme-editor-measure-element {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
  }
`);async function Ar(o){const e=new ce(o),t=document.createElement(o.tagName);t.classList.add(Pn),document.body.append(t),o.setupElement&&await o.setupElement(t);const n={themeScope:z.local,localClassName:Pn};try{o.elements.forEach(i=>{Rn(t,i,n,!0);let s=Le(i,n);const r=s.match(An);s=s.replace(An,"");const l=s.match(In),a=s.replace(In,"");let d=document.querySelector(a);if(d&&l){const h=`[part~="${l[1]}"]`;d=d.shadowRoot.querySelector(h)}if(!d)return;d.style.transition="none";const c=r?r[1]:null,m=getComputedStyle(d,c);i.properties.forEach(h=>{const f=m.getPropertyValue(h.propertyName)||h.defaultValue||"";e.updatePropertyValue(i.selector,h.propertyName,f)}),Rn(t,i,n,!1)})}finally{try{o.cleanupElement&&await o.cleanupElement(t)}finally{t.remove()}}return e}function Rn(o,e,t,n){if(e.stateAttribute){if(e.stateElementSelector){const i=Le({...e,selector:e.stateElementSelector},t);o=document.querySelector(i)}o&&(n?o.setAttribute(e.stateAttribute,""):o.removeAttribute(e.stateAttribute))}}function On(o){return o.trim()}function Ir(o){const e=o.element;if(!e)return null;const t=e.querySelector("label");if(t&&t.textContent)return On(t.textContent);const n=e.textContent;return n?On(n):null}class Rr{constructor(){this._localClassNameMap=new Map}get stylesheet(){return this.ensureStylesheet(),this._stylesheet}add(e){this.ensureStylesheet(),this._stylesheet.replaceSync(e)}clear(){this.ensureStylesheet(),this._stylesheet.replaceSync("")}previewLocalClassName(e,t){if(!e)return;const n=this._localClassNameMap.get(e);n&&(e.classList.remove(n),e.overlayClass=null),t?(e.classList.add(t),e.overlayClass=t,this._localClassNameMap.set(e,t)):this._localClassNameMap.delete(e)}ensureStylesheet(){this._stylesheet||(this._stylesheet=new CSSStyleSheet,this._stylesheet.replaceSync(""),document.adoptedStyleSheets=[...document.adoptedStyleSheets,this._stylesheet])}}const fe=new Rr;class Or{constructor(e){this.pendingRequests={},this.requestCounter=0,this.globalUiId=this.getGlobalUiId(),this.wrappedConnection=e;const t=this.wrappedConnection.onMessage;this.wrappedConnection.onMessage=n=>{n.command==="themeEditorResponse"?this.handleResponse(n.data):t.call(this.wrappedConnection,n)}}sendRequest(e,t){const n=(this.requestCounter++).toString(),i=t.uiId??this.globalUiId;return new Promise((s,r)=>{this.wrappedConnection.send(e,{...t,requestId:n,uiId:i}),this.pendingRequests[n]={resolve:s,reject:r}})}handleResponse(e){const t=this.pendingRequests[e.requestId];if(!t){console.warn("Received response for unknown request");return}delete this.pendingRequests[e.requestId],e.code==="ok"?t.resolve(e):t.reject(e)}loadComponentMetadata(e){return this.sendRequest("themeEditorComponentMetadata",{nodeId:e.nodeId})}setLocalClassName(e,t){return this.sendRequest("themeEditorLocalClassName",{nodeId:e.nodeId,className:t})}setCssRules(e){return this.sendRequest("themeEditorRules",{rules:e})}loadRules(e){return this.sendRequest("themeEditorLoadRules",{selectors:e})}markAsUsed(){return this.sendRequest("themeEditorMarkAsUsed",{})}undo(e){return this.sendRequest("themeEditorHistory",{undo:e})}redo(e){return this.sendRequest("themeEditorHistory",{redo:e})}openCss(e){return this.sendRequest("themeEditorOpenCss",{selector:e})}getGlobalUiId(){const e=window.Vaadin;if(e&&e.Flow){const{clients:t}=e.Flow,n=Object.keys(t);for(const i of n){const s=t[i];if(s.getNodeId)return s.getUIId()}}return-1}}const O={index:-1,entries:[]};class Lr{constructor(e){this.api=e}get allowUndo(){return O.index>=0}get allowRedo(){return O.index<O.entries.length-1}get allowedActions(){return{allowUndo:this.allowUndo,allowRedo:this.allowRedo}}push(e,t,n){const i={requestId:e,execute:t,rollback:n};if(O.index++,O.entries=O.entries.slice(0,O.index),O.entries.push(i),t)try{t()}catch(s){console.error("Execute history entry failed",s)}return this.allowedActions}async undo(){if(!this.allowUndo)return this.allowedActions;const e=O.entries[O.index];O.index--;try{await this.api.undo(e.requestId),e.rollback&&e.rollback()}catch(t){console.error("Undo failed",t)}return this.allowedActions}async redo(){if(!this.allowRedo)return this.allowedActions;O.index++;const e=O.entries[O.index];try{await this.api.redo(e.requestId),e.execute&&e.execute()}catch(t){console.error("Redo failed",t)}return this.allowedActions}static clear(){O.entries=[],O.index=-1}}var Mr=Object.defineProperty,Vr=Object.getOwnPropertyDescriptor,ue=(o,e,t,n)=>{for(var i=n>1?void 0:n?Vr(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(i=(n?r(e,t,i):r(i))||i);return n&&i&&Mr(e,t,i),i};class Dr extends CustomEvent{constructor(e,t,n){super("theme-property-value-change",{bubbles:!0,composed:!0,detail:{element:e,property:t,value:n}})}}class q extends A{constructor(){super(...arguments),this.value=""}static get styles(){return[_i,E`
        :host {
          display: block;
        }

        .editor-row .label .modified {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: orange;
          border-radius: 3px;
          margin-left: 3px;
        }
      `]}update(e){super.update(e),(e.has("propertyMetadata")||e.has("theme"))&&this.updateValueFromTheme()}render(){var e;return v`
      <div class="editor-row">
        <div class="label">
          ${this.propertyMetadata.displayName}
          ${(e=this.propertyValue)!=null&&e.modified?v`<span class="modified"></span>`:null}
        </div>
        <div class="editor">${this.renderEditor()}</div>
      </div>
    `}updateValueFromTheme(){var e;this.propertyValue=this.theme.getPropertyValue(this.elementMetadata.selector,this.propertyMetadata.propertyName),this.value=((e=this.propertyValue)==null?void 0:e.value)||""}dispatchChange(e){this.dispatchEvent(new Dr(this.elementMetadata,this.propertyMetadata,e))}}ue([y({})],q.prototype,"elementMetadata",2);ue([y({})],q.prototype,"propertyMetadata",2);ue([y({})],q.prototype,"theme",2);ue([T()],q.prototype,"propertyValue",2);ue([T()],q.prototype,"value",2);class kt{constructor(e){if(this._values=[],this._rawValues={},e){const t=e.propertyName,n=e.presets??[];this._values=(n||[]).map(s=>s.startsWith("--")?`var(${s})`:s);const i=document.createElement("div");i.style.borderStyle="solid",i.style.visibility="hidden",document.body.append(i);try{this._values.forEach(s=>{i.style.setProperty(t,s);const r=getComputedStyle(i);this._rawValues[s]=r.getPropertyValue(t).trim()})}finally{i.remove()}}}get values(){return this._values}get rawValues(){return this._rawValues}tryMapToRawValue(e){return this._rawValues[e]??e}tryMapToPreset(e){return this.findPreset(e)??e}findPreset(e){const t=e&&e.trim();return this.values.find(n=>this._rawValues[n]===t)}}class Ln extends CustomEvent{constructor(e){super("change",{detail:{value:e}})}}let $t=class extends A{constructor(){super(...arguments),this.value="",this.showClearButton=!1}static get styles(){return E`
      :host {
        display: inline-block;
        width: 100%;
        position: relative;
      }

      input {
        width: 100%;
        box-sizing: border-box;
        padding: 0.25rem 0.375rem;
        color: inherit;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.25rem;
        border: none;
      }

      button {
        display: none;
        position: absolute;
        right: 4px;
        top: 4px;
        padding: 0;
        line-height: 0;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      button svg {
        width: 16px;
        height: 16px;
      }

      button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      :host(.show-clear-button) input {
        padding-right: 20px;
      }

      :host(.show-clear-button) button {
        display: block;
      }
    `}update(o){super.update(o),o.has("showClearButton")&&(this.showClearButton?this.classList.add("show-clear-button"):this.classList.remove("show-clear-button"))}render(){return v`
      <input class="input" .value=${this.value} @change=${this.handleInputChange} />
      <button @click=${this.handleClearClick}>${yt.cross}</button>
    `}handleInputChange(o){const e=o.target;this.dispatchEvent(new Ln(e.value))}handleClearClick(){this.dispatchEvent(new Ln(""))}};ue([y({})],$t.prototype,"value",2);ue([y({})],$t.prototype,"showClearButton",2);$t=ue([F("vaadin-dev-tools-theme-text-input")],$t);var zr=Object.defineProperty,Ur=Object.getOwnPropertyDescriptor,Mt=(o,e,t,n)=>{for(var i=n>1?void 0:n?Ur(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(i=(n?r(e,t,i):r(i))||i);return n&&i&&zr(e,t,i),i};class jr extends CustomEvent{constructor(e){super("class-name-change",{detail:{value:e}})}}let Je=class extends A{constructor(){super(...arguments),this.editedClassName="",this.invalid=!1}static get styles(){return[_i,E`
        .editor-row {
          padding-top: 0;
        }

        .editor-row .editor .error {
          display: inline-block;
          color: var(--dev-tools-red-color);
          margin-top: 4px;
        }
      `]}update(o){super.update(o),o.has("className")&&(this.editedClassName=this.className,this.invalid=!1)}render(){return v` <div class="editor-row local-class-name">
      <div class="label">CSS class name</div>
      <div class="editor">
        <vaadin-dev-tools-theme-text-input
          type="text"
          .value=${this.editedClassName}
          @change=${this.handleInputChange}
        ></vaadin-dev-tools-theme-text-input>
        ${this.invalid?v`<br /><span class="error">Please enter a valid CSS class name</span>`:null}
      </div>
    </div>`}handleInputChange(o){this.editedClassName=o.detail.value;const e=/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;this.invalid=!this.editedClassName.match(e),!this.invalid&&this.editedClassName!==this.className&&this.dispatchEvent(new jr(this.editedClassName))}};Mt([y({})],Je.prototype,"className",2);Mt([T()],Je.prototype,"editedClassName",2);Mt([T()],Je.prototype,"invalid",2);Je=Mt([F("vaadin-dev-tools-theme-class-name-editor")],Je);var Fr=Object.defineProperty,Br=Object.getOwnPropertyDescriptor,Vt=(o,e,t,n)=>{for(var i=n>1?void 0:n?Br(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(i=(n?r(e,t,i):r(i))||i);return n&&i&&Fr(e,t,i),i};class Hr extends CustomEvent{constructor(e){super("scope-change",{detail:{value:e}})}}Vo(E`
  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] {
    --lumo-primary-color-50pct: rgba(255, 255, 255, 0.5);
    z-index: 100000 !important;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector']::part(overlay) {
    background: #333;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item {
    color: rgba(255, 255, 255, 0.8);
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(content) {
    font-size: 13px;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item .title {
    color: rgba(255, 255, 255, 0.95);
    font-weight: bold;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(checkmark) {
    margin: 6px;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(checkmark)::before {
    color: rgba(255, 255, 255, 0.95);
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`);let Xe=class extends A{constructor(){super(...arguments),this.value=z.local}static get styles(){return E`
      vaadin-select {
        --lumo-primary-color-50pct: rgba(255, 255, 255, 0.5);
        width: 100px;
      }

      vaadin-select::part(input-field) {
        background: rgba(0, 0, 0, 0.2);
      }

      vaadin-select vaadin-select-value-button,
      vaadin-select::part(toggle-button) {
        color: var(--dev-tools-text-color);
      }

      vaadin-select:hover vaadin-select-value-button,
      vaadin-select:hover::part(toggle-button) {
        color: var(--dev-tools-text-color-emphasis);
      }

      vaadin-select vaadin-select-item {
        font-size: 13px;
      }
    `}update(o){var e;super.update(o),o.has("metadata")&&((e=this.select)==null||e.requestContentUpdate())}render(){return v` <vaadin-select
      theme="small vaadin-dev-tools-theme-scope-selector"
      .value=${this.value}
      .renderer=${this.selectRenderer.bind(this)}
      @value-changed=${this.handleValueChange}
    ></vaadin-select>`}selectRenderer(o){var e;const t=((e=this.metadata)==null?void 0:e.displayName)||"Component",n=`${t}s`;Ae(v`
        <vaadin-list-box>
          <vaadin-item value=${z.local} label="Local">
            <span class="title">Local</span>
            <br />
            <span>Edit styles for this ${t}</span>
          </vaadin-item>
          <vaadin-item value=${z.global} label="Global">
            <span class="title">Global</span>
            <br />
            <span>Edit styles for all ${n}</span>
          </vaadin-item>
        </vaadin-list-box>
      `,o)}handleValueChange(o){const e=o.detail.value;e!==this.value&&this.dispatchEvent(new Hr(e))}};Vt([y({})],Xe.prototype,"value",2);Vt([y({})],Xe.prototype,"metadata",2);Vt([tt("vaadin-select")],Xe.prototype,"select",2);Xe=Vt([F("vaadin-dev-tools-theme-scope-selector")],Xe);var qr=Object.defineProperty,Wr=Object.getOwnPropertyDescriptor,Gr=(o,e,t,n)=>{for(var i=n>1?void 0:n?Wr(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(i=(n?r(e,t,i):r(i))||i);return n&&i&&qr(e,t,i),i};let Mn=class extends q{static get styles(){return[q.styles,E`
        .editor-row {
          align-items: center;
        }
      `]}handleInputChange(o){const e=o.target.checked?this.propertyMetadata.checkedValue:"";this.dispatchChange(e||"")}renderEditor(){const o=this.value===this.propertyMetadata.checkedValue;return v` <input type="checkbox" .checked=${o} @change=${this.handleInputChange} /> `}};Mn=Gr([F("vaadin-dev-tools-theme-checkbox-property-editor")],Mn);var Kr=Object.defineProperty,Yr=Object.getOwnPropertyDescriptor,Jr=(o,e,t,n)=>{for(var i=n>1?void 0:n?Yr(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(i=(n?r(e,t,i):r(i))||i);return n&&i&&Kr(e,t,i),i};let Vn=class extends q{handleInputChange(o){this.dispatchChange(o.detail.value)}renderEditor(){var o;return v`
      <vaadin-dev-tools-theme-text-input
        .value=${this.value}
        .showClearButton=${((o=this.propertyValue)==null?void 0:o.modified)||!1}
        @change=${this.handleInputChange}
      ></vaadin-dev-tools-theme-text-input>
    `}};Vn=Jr([F("vaadin-dev-tools-theme-text-property-editor")],Vn);var Xr=Object.defineProperty,Qr=Object.getOwnPropertyDescriptor,Do=(o,e,t,n)=>{for(var i=n>1?void 0:n?Qr(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(i=(n?r(e,t,i):r(i))||i);return n&&i&&Xr(e,t,i),i};let Tt=class extends q{constructor(){super(...arguments),this.selectedPresetIndex=-1,this.presets=new kt}static get styles(){return[q.styles,E`
        :host {
          --preset-count: 3;
          --slider-bg: #fff;
          --slider-border: #333;
        }

        .editor-row {
          align-items: center;
        }

        .editor-row > .editor {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .editor-row .input {
          flex: 0 0 auto;
          width: 80px;
        }

        .slider-wrapper {
          flex: 1 1 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .icon {
          width: 20px;
          height: 20px;
          color: #aaa;
        }

        .icon.prefix > svg {
          transform: scale(0.75);
        }

        .slider {
          flex: 1 1 0;
          -webkit-appearance: none;
          background: linear-gradient(to right, #666, #666 2px, transparent 2px);
          background-size: calc((100% - 13px) / (var(--preset-count) - 1)) 8px;
          background-position: 5px 50%;
          background-repeat: repeat-x;
        }

        .slider::-webkit-slider-runnable-track {
          width: 100%;
          box-sizing: border-box;
          height: 16px;
          background-image: linear-gradient(#666, #666);
          background-size: calc(100% - 12px) 2px;
          background-repeat: no-repeat;
          background-position: 6px 50%;
        }

        .slider::-moz-range-track {
          width: 100%;
          box-sizing: border-box;
          height: 16px;
          background-image: linear-gradient(#666, #666);
          background-size: calc(100% - 12px) 2px;
          background-repeat: no-repeat;
          background-position: 6px 50%;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border: 2px solid var(--slider-border);
          border-radius: 50%;
          background: var(--slider-bg);
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border: 2px solid var(--slider-border);
          border-radius: 50%;
          background: var(--slider-bg);
          cursor: pointer;
        }

        .custom-value {
          opacity: 0.5;
        }

        .custom-value:hover,
        .custom-value:focus-within {
          opacity: 1;
        }

        .custom-value:not(:hover, :focus-within) {
          --slider-bg: #333;
          --slider-border: #666;
        }
      `]}update(o){o.has("propertyMetadata")&&(this.presets=new kt(this.propertyMetadata)),super.update(o)}renderEditor(){var o;const e={"slider-wrapper":!0,"custom-value":this.selectedPresetIndex<0},t=this.presets.values.length;return v`
      <div class=${Mo(e)}>
        ${null}
        <input
          type="range"
          class="slider"
          style="--preset-count: ${t}"
          step="1"
          min="0"
          .max=${(t-1).toString()}
          .value=${this.selectedPresetIndex}
          @input=${this.handleSliderInput}
          @change=${this.handleSliderChange}
        />
        ${null}
      </div>
      <vaadin-dev-tools-theme-text-input
        class="input"
        .value=${this.value}
        .showClearButton=${((o=this.propertyValue)==null?void 0:o.modified)||!1}
        @change=${this.handleValueChange}
      ></vaadin-dev-tools-theme-text-input>
    `}handleSliderInput(o){const e=o.target,t=parseInt(e.value),n=this.presets.values[t];this.selectedPresetIndex=t,this.value=this.presets.rawValues[n]}handleSliderChange(){this.dispatchChange(this.value)}handleValueChange(o){this.value=o.detail.value,this.updateSliderValue(),this.dispatchChange(this.value)}dispatchChange(o){const e=this.presets.tryMapToPreset(o);super.dispatchChange(e)}updateValueFromTheme(){var o;super.updateValueFromTheme(),this.value=this.presets.tryMapToRawValue(((o=this.propertyValue)==null?void 0:o.value)||""),this.updateSliderValue()}updateSliderValue(){const o=this.presets.findPreset(this.value);this.selectedPresetIndex=o?this.presets.values.indexOf(o):-1}};Do([T()],Tt.prototype,"selectedPresetIndex",2);Do([T()],Tt.prototype,"presets",2);Tt=Do([F("vaadin-dev-tools-theme-range-property-editor")],Tt);const Me=(o,e=0,t=1)=>o>t?t:o<e?e:o,V=(o,e=0,t=Math.pow(10,e))=>Math.round(t*o)/t,wi=({h:o,s:e,v:t,a:n})=>{const i=(200-e)*t/100;return{h:V(o),s:V(i>0&&i<200?e*t/100/(i<=100?i:200-i)*100:0),l:V(i/2),a:V(n,2)}},ko=o=>{const{h:e,s:t,l:n}=wi(o);return`hsl(${e}, ${t}%, ${n}%)`},mo=o=>{const{h:e,s:t,l:n,a:i}=wi(o);return`hsla(${e}, ${t}%, ${n}%, ${i})`},Zr=({h:o,s:e,v:t,a:n})=>{o=o/360*6,e=e/100,t=t/100;const i=Math.floor(o),s=t*(1-e),r=t*(1-(o-i)*e),l=t*(1-(1-o+i)*e),a=i%6;return{r:V([t,r,s,s,l,t][a]*255),g:V([l,t,t,r,s,s][a]*255),b:V([s,s,l,t,t,r][a]*255),a:V(n,2)}},ea=o=>{const{r:e,g:t,b:n,a:i}=Zr(o);return`rgba(${e}, ${t}, ${n}, ${i})`},ta=o=>{const e=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(o);return e?oa({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:e[7]===void 0?1:Number(e[7])/(e[8]?100:1)}):{h:0,s:0,v:0,a:1}},oa=({r:o,g:e,b:t,a:n})=>{const i=Math.max(o,e,t),s=i-Math.min(o,e,t),r=s?i===o?(e-t)/s:i===e?2+(t-o)/s:4+(o-e)/s:0;return{h:V(60*(r<0?r+6:r)),s:V(i?s/i*100:0),v:V(i/255*100),a:n}},na=(o,e)=>{if(o===e)return!0;for(const t in o)if(o[t]!==e[t])return!1;return!0},ia=(o,e)=>o.replace(/\s/g,"")===e.replace(/\s/g,""),Dn={},Si=o=>{let e=Dn[o];return e||(e=document.createElement("template"),e.innerHTML=o,Dn[o]=e),e},zo=(o,e,t)=>{o.dispatchEvent(new CustomEvent(e,{bubbles:!0,detail:t}))};let Ie=!1;const $o=o=>"touches"in o,sa=o=>Ie&&!$o(o)?!1:(Ie||(Ie=$o(o)),!0),zn=(o,e)=>{const t=$o(e)?e.touches[0]:e,n=o.el.getBoundingClientRect();zo(o.el,"move",o.getMove({x:Me((t.pageX-(n.left+window.pageXOffset))/n.width),y:Me((t.pageY-(n.top+window.pageYOffset))/n.height)}))},ra=(o,e)=>{const t=e.keyCode;t>40||o.xy&&t<37||t<33||(e.preventDefault(),zo(o.el,"move",o.getMove({x:t===39?.01:t===37?-.01:t===34?.05:t===33?-.05:t===35?1:t===36?-1:0,y:t===40?.01:t===38?-.01:0},!0)))};class Uo{constructor(e,t,n,i){const s=Si(`<div role="slider" tabindex="0" part="${t}" ${n}><div part="${t}-pointer"></div></div>`);e.appendChild(s.content.cloneNode(!0));const r=e.querySelector(`[part=${t}]`);r.addEventListener("mousedown",this),r.addEventListener("touchstart",this),r.addEventListener("keydown",this),this.el=r,this.xy=i,this.nodes=[r.firstChild,r]}set dragging(e){const t=e?document.addEventListener:document.removeEventListener;t(Ie?"touchmove":"mousemove",this),t(Ie?"touchend":"mouseup",this)}handleEvent(e){switch(e.type){case"mousedown":case"touchstart":if(e.preventDefault(),!sa(e)||!Ie&&e.button!=0)return;this.el.focus(),zn(this,e),this.dragging=!0;break;case"mousemove":case"touchmove":e.preventDefault(),zn(this,e);break;case"mouseup":case"touchend":this.dragging=!1;break;case"keydown":ra(this,e);break}}style(e){e.forEach((t,n)=>{for(const i in t)this.nodes[n].style.setProperty(i,t[i])})}}class aa extends Uo{constructor(e){super(e,"hue",'aria-label="Hue" aria-valuemin="0" aria-valuemax="360"',!1)}update({h:e}){this.h=e,this.style([{left:`${e/360*100}%`,color:ko({h:e,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuenow",`${V(e)}`)}getMove(e,t){return{h:t?Me(this.h+e.x*360,0,360):360*e.x}}}class la extends Uo{constructor(e){super(e,"saturation",'aria-label="Color"',!0)}update(e){this.hsva=e,this.style([{top:`${100-e.v}%`,left:`${e.s}%`,color:ko(e)},{"background-color":ko({h:e.h,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuetext",`Saturation ${V(e.s)}%, Brightness ${V(e.v)}%`)}getMove(e,t){return{s:t?Me(this.hsva.s+e.x*100,0,100):e.x*100,v:t?Me(this.hsva.v-e.y*100,0,100):Math.round(100-e.y*100)}}}const da=':host{display:flex;flex-direction:column;position:relative;width:200px;height:200px;user-select:none;-webkit-user-select:none;cursor:default}:host([hidden]){display:none!important}[role=slider]{position:relative;touch-action:none;user-select:none;-webkit-user-select:none;outline:0}[role=slider]:last-child{border-radius:0 0 8px 8px}[part$=pointer]{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;display:flex;place-content:center center;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}[part$=pointer]::after{content:"";width:100%;height:100%;border-radius:inherit;background-color:currentColor}[role=slider]:focus [part$=pointer]{transform:translate(-50%,-50%) scale(1.1)}',ca="[part=hue]{flex:0 0 24px;background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}[part=hue-pointer]{top:50%;z-index:2}",ha="[part=saturation]{flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part=saturation-pointer]{z-index:3}",ut=Symbol("same"),fo=Symbol("color"),Un=Symbol("hsva"),vo=Symbol("update"),jn=Symbol("parts"),Nt=Symbol("css"),Pt=Symbol("sliders");let ua=class extends HTMLElement{static get observedAttributes(){return["color"]}get[Nt](){return[da,ca,ha]}get[Pt](){return[la,aa]}get color(){return this[fo]}set color(o){if(!this[ut](o)){const e=this.colorModel.toHsva(o);this[vo](e),this[fo]=o}}constructor(){super();const o=Si(`<style>${this[Nt].join("")}</style>`),e=this.attachShadow({mode:"open"});e.appendChild(o.content.cloneNode(!0)),e.addEventListener("move",this),this[jn]=this[Pt].map(t=>new t(e))}connectedCallback(){if(this.hasOwnProperty("color")){const o=this.color;delete this.color,this.color=o}else this.color||(this.color=this.colorModel.defaultColor)}attributeChangedCallback(o,e,t){const n=this.colorModel.fromAttr(t);this[ut](n)||(this.color=n)}handleEvent(o){const e=this[Un],t={...e,...o.detail};this[vo](t);let n;!na(t,e)&&!this[ut](n=this.colorModel.fromHsva(t))&&(this[fo]=n,zo(this,"color-changed",{value:n}))}[ut](o){return this.color&&this.colorModel.equal(o,this.color)}[vo](o){this[Un]=o,this[jn].forEach(e=>e.update(o))}};class pa extends Uo{constructor(e){super(e,"alpha",'aria-label="Alpha" aria-valuemin="0" aria-valuemax="1"',!1)}update(e){this.hsva=e;const t=mo({...e,a:0}),n=mo({...e,a:1}),i=e.a*100;this.style([{left:`${i}%`,color:mo(e)},{"--gradient":`linear-gradient(90deg, ${t}, ${n}`}]);const s=V(i);this.el.setAttribute("aria-valuenow",`${s}`),this.el.setAttribute("aria-valuetext",`${s}%`)}getMove(e,t){return{a:t?Me(this.hsva.a+e.x):e.x}}}const ma=`[part=alpha]{flex:0 0 24px}[part=alpha]::after{display:block;content:"";position:absolute;top:0;left:0;right:0;bottom:0;border-radius:inherit;background-image:var(--gradient);box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part^=alpha]{background-color:#fff;background-image:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>')}[part=alpha-pointer]{top:50%}`;class fa extends ua{get[Nt](){return[...super[Nt],ma]}get[Pt](){return[...super[Pt],pa]}}const va={defaultColor:"rgba(0, 0, 0, 1)",toHsva:ta,fromHsva:ea,equal:ia,fromAttr:o=>o};class ga extends fa{get colorModel(){return va}}/**
* @license
* Copyright (c) 2017 - 2023 Vaadin Ltd.
* This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/function ya(o){const e=[];for(;o;){if(o.nodeType===Node.DOCUMENT_NODE){e.push(o);break}if(o.nodeType===Node.DOCUMENT_FRAGMENT_NODE){e.push(o),o=o.host;continue}if(o.assignedSlot){o=o.assignedSlot;continue}o=o.parentNode}return e}const go={start:"top",end:"bottom"},yo={start:"left",end:"right"},Fn=new ResizeObserver(o=>{setTimeout(()=>{o.forEach(e=>{e.target.__overlay&&e.target.__overlay._updatePosition()})})}),ba=o=>class extends o{static get properties(){return{positionTarget:{type:Object,value:null},horizontalAlign:{type:String,value:"start"},verticalAlign:{type:String,value:"top"},noHorizontalOverlap:{type:Boolean,value:!1},noVerticalOverlap:{type:Boolean,value:!1},requiredVerticalSpace:{type:Number,value:0}}}static get observers(){return["__positionSettingsChanged(horizontalAlign, verticalAlign, noHorizontalOverlap, noVerticalOverlap, requiredVerticalSpace)","__overlayOpenedChanged(opened, positionTarget)"]}constructor(){super(),this.__onScroll=this.__onScroll.bind(this),this._updatePosition=this._updatePosition.bind(this)}connectedCallback(){super.connectedCallback(),this.opened&&this.__addUpdatePositionEventListeners()}disconnectedCallback(){super.disconnectedCallback(),this.__removeUpdatePositionEventListeners()}__addUpdatePositionEventListeners(){window.addEventListener("resize",this._updatePosition),this.__positionTargetAncestorRootNodes=ya(this.positionTarget),this.__positionTargetAncestorRootNodes.forEach(e=>{e.addEventListener("scroll",this.__onScroll,!0)})}__removeUpdatePositionEventListeners(){window.removeEventListener("resize",this._updatePosition),this.__positionTargetAncestorRootNodes&&(this.__positionTargetAncestorRootNodes.forEach(e=>{e.removeEventListener("scroll",this.__onScroll,!0)}),this.__positionTargetAncestorRootNodes=null)}__overlayOpenedChanged(e,t){if(this.__removeUpdatePositionEventListeners(),t&&(t.__overlay=null,Fn.unobserve(t),e&&(this.__addUpdatePositionEventListeners(),t.__overlay=this,Fn.observe(t))),e){const n=getComputedStyle(this);this.__margins||(this.__margins={},["top","bottom","left","right"].forEach(i=>{this.__margins[i]=parseInt(n[i],10)})),this.setAttribute("dir",n.direction),this._updatePosition(),requestAnimationFrame(()=>this._updatePosition())}}__positionSettingsChanged(){this._updatePosition()}__onScroll(e){this.contains(e.target)||this._updatePosition()}_updatePosition(){if(!this.positionTarget||!this.opened)return;const e=this.positionTarget.getBoundingClientRect(),t=this.__shouldAlignStartVertically(e);this.style.justifyContent=t?"flex-start":"flex-end";const n=this.__isRTL,i=this.__shouldAlignStartHorizontally(e,n),s=!n&&i||n&&!i;this.style.alignItems=s?"flex-start":"flex-end";const r=this.getBoundingClientRect(),l=this.__calculatePositionInOneDimension(e,r,this.noVerticalOverlap,go,this,t),a=this.__calculatePositionInOneDimension(e,r,this.noHorizontalOverlap,yo,this,i);Object.assign(this.style,l,a),this.toggleAttribute("bottom-aligned",!t),this.toggleAttribute("top-aligned",t),this.toggleAttribute("end-aligned",!s),this.toggleAttribute("start-aligned",s)}__shouldAlignStartHorizontally(e,t){const n=Math.max(this.__oldContentWidth||0,this.$.overlay.offsetWidth);this.__oldContentWidth=this.$.overlay.offsetWidth;const i=Math.min(window.innerWidth,document.documentElement.clientWidth),s=!t&&this.horizontalAlign==="start"||t&&this.horizontalAlign==="end";return this.__shouldAlignStart(e,n,i,this.__margins,s,this.noHorizontalOverlap,yo)}__shouldAlignStartVertically(e){const t=this.requiredVerticalSpace||Math.max(this.__oldContentHeight||0,this.$.overlay.offsetHeight);this.__oldContentHeight=this.$.overlay.offsetHeight;const n=Math.min(window.innerHeight,document.documentElement.clientHeight),i=this.verticalAlign==="top";return this.__shouldAlignStart(e,t,n,this.__margins,i,this.noVerticalOverlap,go)}__shouldAlignStart(e,t,n,i,s,r,l){const a=n-e[r?l.end:l.start]-i[l.end],d=e[r?l.start:l.end]-i[l.start],c=s?a:d,m=c>(s?d:a)||c>t;return s===m}__adjustBottomProperty(e,t,n){let i;if(e===t.end){if(t.end===go.end){const s=Math.min(window.innerHeight,document.documentElement.clientHeight);if(n>s&&this.__oldViewportHeight){const r=this.__oldViewportHeight-s;i=n-r}this.__oldViewportHeight=s}if(t.end===yo.end){const s=Math.min(window.innerWidth,document.documentElement.clientWidth);if(n>s&&this.__oldViewportWidth){const r=this.__oldViewportWidth-s;i=n-r}this.__oldViewportWidth=s}}return i}__calculatePositionInOneDimension(e,t,n,i,s,r){const l=r?i.start:i.end,a=r?i.end:i.start,d=parseFloat(s.style[l]||getComputedStyle(s)[l]),c=this.__adjustBottomProperty(l,i,d),m=t[r?i.start:i.end]-e[n===r?i.end:i.start],h=c?`${c}px`:`${d+m*(r?-1:1)}px`;return{[l]:h,[a]:""}}};var _a=Object.defineProperty,wa=Object.getOwnPropertyDescriptor,we=(o,e,t,n)=>{for(var i=n>1?void 0:n?wa(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(i=(n?r(e,t,i):r(i))||i);return n&&i&&_a(e,t,i),i};class Sa extends CustomEvent{constructor(e){super("color-picker-change",{detail:{value:e}})}}const xi=E`
  :host {
    --preview-size: 24px;
    --preview-color: rgba(0, 0, 0, 0);
  }

  .preview {
    --preview-bg-size: calc(var(--preview-size) / 2);
    --preview-bg-pos: calc(var(--preview-size) / 4);

    width: var(--preview-size);
    height: var(--preview-size);
    padding: 0;
    position: relative;
    overflow: hidden;
    background: none;
    border: solid 2px #888;
    border-radius: 4px;
    box-sizing: content-box;
  }

  .preview::before,
  .preview::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .preview::before {
    content: '';
    background: white;
    background-image: linear-gradient(45deg, #666 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #666 75%), linear-gradient(45deg, transparent 75%, #666 75%),
      linear-gradient(45deg, #666 25%, transparent 25%);
    background-size: var(--preview-bg-size) var(--preview-bg-size);
    background-position: 0 0, 0 0, calc(var(--preview-bg-pos) * -1) calc(var(--preview-bg-pos) * -1),
      var(--preview-bg-pos) var(--preview-bg-pos);
  }

  .preview::after {
    content: '';
    background-color: var(--preview-color);
  }
`;let Qe=class extends A{constructor(){super(...arguments),this.commitValue=!1}static get styles(){return[xi,E`
        #toggle {
          display: block;
        }
      `]}update(o){super.update(o),o.has("value")&&this.overlay&&this.overlay.requestContentUpdate()}firstUpdated(){this.overlay=document.createElement("vaadin-dev-tools-color-picker-overlay"),this.overlay.renderer=this.renderOverlayContent.bind(this),this.overlay.owner=this,this.overlay.positionTarget=this.toggle,this.overlay.noVerticalOverlap=!0,this.overlay.addEventListener("vaadin-overlay-escape-press",this.handleOverlayEscape.bind(this)),this.overlay.addEventListener("vaadin-overlay-close",this.handleOverlayClose.bind(this)),this.append(this.overlay)}render(){const o=this.value||"rgba(0, 0, 0, 0)";return v` <button
      id="toggle"
      class="preview"
      style="--preview-color: ${o}"
      @click=${this.open}
    ></button>`}open(){this.commitValue=!1,this.overlay.opened=!0,this.overlay.style.zIndex="1000000";const o=this.overlay.shadowRoot.querySelector('[part="overlay"]');o.style.background="#333"}renderOverlayContent(o){const e=getComputedStyle(this.toggle,"::after").getPropertyValue("background-color");Ae(v` <div>
        <vaadin-dev-tools-color-picker-overlay-content
          .value=${e}
          .presets=${this.presets}
          @color-changed=${this.handleColorChange.bind(this)}
        ></vaadin-dev-tools-color-picker-overlay-content>
      </div>`,o)}handleColorChange(o){this.commitValue=!0,this.dispatchEvent(new Sa(o.detail.value)),o.detail.close&&(this.overlay.opened=!1,this.handleOverlayClose())}handleOverlayEscape(){this.commitValue=!1}handleOverlayClose(){const o=this.commitValue?"color-picker-commit":"color-picker-cancel";this.dispatchEvent(new CustomEvent(o))}};we([y({})],Qe.prototype,"value",2);we([y({})],Qe.prototype,"presets",2);we([tt("#toggle")],Qe.prototype,"toggle",2);Qe=we([F("vaadin-dev-tools-color-picker")],Qe);let At=class extends A{static get styles(){return[xi,E`
        :host {
          display: block;
          padding: 12px;
        }

        .picker::part(saturation),
        .picker::part(hue) {
          margin-bottom: 10px;
        }

        .picker::part(hue),
        .picker::part(alpha) {
          flex: 0 0 20px;
        }

        .picker::part(saturation),
        .picker::part(hue),
        .picker::part(alpha) {
          border-radius: 3px;
        }

        .picker::part(saturation-pointer),
        .picker::part(hue-pointer),
        .picker::part(alpha-pointer) {
          width: 20px;
          height: 20px;
        }

        .swatches {
          display: grid;
          grid-template-columns: repeat(6, var(--preview-size));
          grid-column-gap: 10px;
          grid-row-gap: 6px;
          margin-top: 16px;
        }
      `]}render(){return v` <div>
      <vaadin-dev-tools-rgba-string-color-picker
        class="picker"
        .color=${this.value}
        @color-changed=${this.handlePickerChange}
      ></vaadin-dev-tools-rgba-string-color-picker>
      ${this.renderSwatches()}
    </div>`}renderSwatches(){if(!this.presets||this.presets.length===0)return;const o=this.presets.map(e=>v` <button
        class="preview"
        style="--preview-color: ${e}"
        @click=${()=>this.selectPreset(e)}
      ></button>`);return v` <div class="swatches">${o}</div>`}handlePickerChange(o){this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:o.detail.value}}))}selectPreset(o){this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:o,close:!0}}))}};we([y({})],At.prototype,"value",2);we([y({})],At.prototype,"presets",2);At=we([F("vaadin-dev-tools-color-picker-overlay-content")],At);customElements.whenDefined("vaadin-overlay").then(()=>{const o=customElements.get("vaadin-overlay");class e extends ba(o){}customElements.define("vaadin-dev-tools-color-picker-overlay",e)});customElements.define("vaadin-dev-tools-rgba-string-color-picker",ga);var xa=Object.defineProperty,Ea=Object.getOwnPropertyDescriptor,Ca=(o,e,t,n)=>{for(var i=n>1?void 0:n?Ea(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(i=(n?r(e,t,i):r(i))||i);return n&&i&&xa(e,t,i),i};let Bn=class extends q{constructor(){super(...arguments),this.presets=new kt}static get styles(){return[q.styles,E`
        .editor-row {
          align-items: center;
        }

        .editor-row > .editor {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `]}update(o){o.has("propertyMetadata")&&(this.presets=new kt(this.propertyMetadata)),super.update(o)}renderEditor(){var o;return v`
      <vaadin-dev-tools-color-picker
        .value=${this.value}
        .presets=${this.presets.values}
        @color-picker-change=${this.handleColorPickerChange}
        @color-picker-commit=${this.handleColorPickerCommit}
        @color-picker-cancel=${this.handleColorPickerCancel}
      ></vaadin-dev-tools-color-picker>
      <vaadin-dev-tools-theme-text-input
        .value=${this.value}
        .showClearButton=${((o=this.propertyValue)==null?void 0:o.modified)||!1}
        @change=${this.handleInputChange}
      ></vaadin-dev-tools-theme-text-input>
    `}handleInputChange(o){this.value=o.detail.value,this.dispatchChange(this.value)}handleColorPickerChange(o){this.value=o.detail.value}handleColorPickerCommit(){this.dispatchChange(this.value)}handleColorPickerCancel(){this.updateValueFromTheme()}dispatchChange(o){const e=this.presets.tryMapToPreset(o);super.dispatchChange(e)}updateValueFromTheme(){var o;super.updateValueFromTheme(),this.value=this.presets.tryMapToRawValue(((o=this.propertyValue)==null?void 0:o.value)||"")}};Bn=Ca([F("vaadin-dev-tools-theme-color-property-editor")],Bn);var ka=Object.defineProperty,$a=Object.getOwnPropertyDescriptor,jo=(o,e,t,n)=>{for(var i=n>1?void 0:n?$a(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(i=(n?r(e,t,i):r(i))||i);return n&&i&&ka(e,t,i),i};class Ta extends CustomEvent{constructor(e){super("open-css",{detail:{element:e}})}}let It=class extends A{static get styles(){return E`
      .section .header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        padding: 0.4rem var(--theme-editor-section-horizontal-padding);
        color: var(--dev-tools-text-color-emphasis);
        background-color: rgba(0, 0, 0, 0.2);
      }

      .section .property-list .property-editor:not(:last-child) {
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      }

      .section .header .open-css {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        background-color: rgba(255, 255, 255, 0.12);
        color: var(--dev-tools-text-color);
        font-weight: 600;
        padding: 0.25rem 0.375rem;
        border-radius: 0.25rem;
      }

      .section .header .open-css:hover {
        color: var(--dev-tools-text-color-emphasis);
      }
    `}render(){const o=this.metadata.elements.map(e=>this.renderSection(e));return v` <div>${o}</div> `}renderSection(o){const e=o.properties.map(t=>this.renderPropertyEditor(o,t));return v`
      <div class="section" data-testid=${o==null?void 0:o.displayName}>
        <div class="header">
          <span> ${o.displayName} </span>
          <button class="open-css" @click=${()=>this.handleOpenCss(o)}>Edit CSS</button>
        </div>
        <div class="property-list">${e}</div>
      </div>
    `}handleOpenCss(o){this.dispatchEvent(new Ta(o))}renderPropertyEditor(o,e){let t;switch(e.editorType){case P.checkbox:t=ct`vaadin-dev-tools-theme-checkbox-property-editor`;break;case P.range:t=ct`vaadin-dev-tools-theme-range-property-editor`;break;case P.color:t=ct`vaadin-dev-tools-theme-color-property-editor`;break;default:t=ct`vaadin-dev-tools-theme-text-property-editor`}return mr` <${t}
          class="property-editor"
          .elementMetadata=${o}
          .propertyMetadata=${e}
          .theme=${this.theme}
          data-testid=${e.propertyName}
        >
        </${t}>`}};jo([y({})],It.prototype,"metadata",2);jo([y({})],It.prototype,"theme",2);It=jo([F("vaadin-dev-tools-theme-property-list")],It);var Na=Object.defineProperty,Pa=Object.getOwnPropertyDescriptor,Aa=(o,e,t,n)=>{for(var i=n>1?void 0:n?Pa(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(i=(n?r(e,t,i):r(i))||i);return n&&i&&Na(e,t,i),i};let Rt=class extends A{render(){return v`<div
      tabindex="-1"
      @mousemove=${this.onMouseMove}
      @click=${this.onClick}
      @keydown=${this.onKeyDown}
    ></div>`}onClick(o){const e=this.getTargetElement(o);this.dispatchEvent(new CustomEvent("shim-click",{detail:{target:e}}))}onMouseMove(o){const e=this.getTargetElement(o);this.dispatchEvent(new CustomEvent("shim-mousemove",{detail:{target:e}}))}onKeyDown(o){this.dispatchEvent(new CustomEvent("shim-keydown",{detail:{originalEvent:o}}))}getTargetElement(o){this.style.display="none";const e=document.elementFromPoint(o.clientX,o.clientY);return this.style.display="",e}};Rt.shadowRootOptions={...A.shadowRootOptions,delegatesFocus:!0};Rt.styles=[E`
      div {
        pointer-events: auto;
        background: rgba(255, 255, 255, 0);
        position: fixed;
        inset: 0px;
        z-index: 1000000;
      }
    `];Rt=Aa([F("vaadin-dev-tools-shim")],Rt);const Ei=E`
  .popup {
    width: auto;
    position: fixed;
    background-color: var(--dev-tools-background-color-active-blurred);
    color: var(--dev-tools-text-color-primary);
    padding: 0.1875rem 0.75rem 0.1875rem 1rem;
    background-clip: padding-box;
    border-radius: var(--dev-tools-border-radius);
    overflow: hidden;
    margin: 0.5rem;
    width: 30rem;
    max-width: calc(100% - 1rem);
    max-height: calc(100vh - 1rem);
    flex-shrink: 1;
    background-color: var(--dev-tools-background-color-active);
    color: var(--dev-tools-text-color);
    transition: var(--dev-tools-transition-duration);
    transform-origin: bottom right;
    display: flex;
    flex-direction: column;
    box-shadow: var(--dev-tools-box-shadow);
    outline: none;
  }
`;var Ia=Object.defineProperty,Ra=Object.getOwnPropertyDescriptor,ot=(o,e,t,n)=>{for(var i=n>1?void 0:n?Ra(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(i=(n?r(e,t,i):r(i))||i);return n&&i&&Ia(e,t,i),i};let he=class extends A{constructor(){super(...arguments),this.active=!1,this.components=[],this.selected=0}connectedCallback(){super.connectedCallback();const o=new CSSStyleSheet;o.replaceSync(`
    .vaadin-dev-tools-highlight-overlay {
      pointer-events: none;
      position: absolute;
      z-index: 10000;
      background: rgba(158,44,198,0.25);
    }`),document.adoptedStyleSheets=[...document.adoptedStyleSheets,o],this.overlayElement=document.createElement("div"),this.overlayElement.classList.add("vaadin-dev-tools-highlight-overlay")}render(){var o;return this.active?(this.style.display="block",v`
      <vaadin-dev-tools-shim
        @shim-click=${this.shimClick}
        @shim-mousemove=${this.shimMove}
        @shim-keydown=${this.shimKeydown}
      ></vaadin-dev-tools-shim>
      <div class="window popup component-picker-info">${(o=this.options)==null?void 0:o.infoTemplate}</div>
      <div class="window popup component-picker-components-info">
        <div>
          ${this.components.map((e,t)=>v`<div class=${t===this.selected?"selected":""}>
                ${e.element.tagName.toLowerCase()}
              </div>`)}
        </div>
      </div>
    `):(this.style.display="none",null)}open(o){this.options=o,this.active=!0,this.dispatchEvent(new CustomEvent("component-picker-opened",{}))}close(){this.active=!1,this.dispatchEvent(new CustomEvent("component-picker-closed",{}))}update(o){var e;if(super.update(o),(o.has("selected")||o.has("components"))&&this.highlight((e=this.components[this.selected])==null?void 0:e.element),o.has("active")){const t=o.get("active"),n=this.active;!t&&n?requestAnimationFrame(()=>this.shim.focus()):t&&!n&&this.highlight(void 0)}}shimKeydown(o){const e=o.detail.originalEvent;if(e.key==="Escape")this.close(),o.stopPropagation(),o.preventDefault();else if(e.key==="ArrowUp"){let t=this.selected-1;t<0&&(t=this.components.length-1),this.selected=t}else e.key==="ArrowDown"?this.selected=(this.selected+1)%this.components.length:e.key==="Enter"&&(this.pickSelectedComponent(),o.stopPropagation(),o.preventDefault())}shimMove(o){const e=o.detail.target;this.components=gr(e),this.selected=this.components.length-1}shimClick(o){this.pickSelectedComponent()}pickSelectedComponent(){const o=this.components[this.selected];if(o&&this.options)try{this.options.pickCallback(o)}catch(e){console.error("Pick callback failed",e)}this.close()}highlight(o){if(this.highlighted!==o)if(o){const e=o.getBoundingClientRect(),t=getComputedStyle(o);this.overlayElement.style.top=`${e.top}px`,this.overlayElement.style.left=`${e.left}px`,this.overlayElement.style.width=`${e.width}px`,this.overlayElement.style.height=`${e.height}px`,this.overlayElement.style.borderRadius=t.borderRadius,document.body.append(this.overlayElement)}else this.overlayElement.remove();this.highlighted=o}};he.styles=[Ei,E`
      .component-picker-info {
        left: 1em;
        bottom: 1em;
      }

      .component-picker-components-info {
        right: 3em;
        bottom: 1em;
      }

      .component-picker-components-info .selected {
        font-weight: bold;
      }
    `];ot([T()],he.prototype,"active",2);ot([T()],he.prototype,"components",2);ot([T()],he.prototype,"selected",2);ot([tt("vaadin-dev-tools-shim")],he.prototype,"shim",2);he=ot([F("vaadin-dev-tools-component-picker")],he);const Oa=Object.freeze(Object.defineProperty({__proto__:null,get ComponentPicker(){return he}},Symbol.toStringTag,{value:"Module"}));var La=Object.defineProperty,Ma=Object.getOwnPropertyDescriptor,pe=(o,e,t,n)=>{for(var i=n>1?void 0:n?Ma(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(i=(n?r(e,t,i):r(i))||i);return n&&i&&La(e,t,i),i};Vo(E`
  .vaadin-theme-editor-highlight {
    outline: solid 2px #9e2cc6;
    outline-offset: 3px;
  }
`);let ie=class extends A{constructor(){super(...arguments),this.expanded=!1,this.themeEditorState=Ye.enabled,this.context=null,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null}static get styles(){return E`
      :host {
        animation: fade-in var(--dev-tools-transition-duration) ease-in;
        --theme-editor-section-horizontal-padding: 0.75rem;
        display: flex;
        flex-direction: column;
        max-height: 400px;
      }

      .notice {
        padding: var(--theme-editor-section-horizontal-padding);
      }

      .notice a {
        color: var(--dev-tools-text-color-emphasis);
      }

      .header {
        flex: 0 0 auto;
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      }

      .header .picker-row {
        padding: var(--theme-editor-section-horizontal-padding);
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: space-between;
      }

      .picker {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        align-items: center;
      }

      .picker button {
        min-width: 0;
        display: inline-flex;
        align-items: center;
        padding: 0;
        line-height: 20px;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      .picker button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .picker svg,
      .picker .component-type {
        flex: 0 0 auto;
        margin-right: 4px;
      }

      .picker .instance-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #e5a2fce5;
      }

      .picker .instance-name-quote {
        color: #e5a2fce5;
      }

      .picker .no-selection {
        font-style: italic;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .property-list {
        flex: 1 1 auto;
        overflow-y: auto;
      }

      .link-button {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        color: inherit;
        font-weight: 600;
        text-decoration: underline;
      }

      .link-button:focus,
      .link-button:hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .icon-button {
        padding: 0;
        line-height: 0;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      .icon-button:disabled {
        opacity: 0.5;
      }

      .icon-button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }
    `}firstUpdated(){this.api=new Or(this.connection),this.history=new Lr(this.api),this.historyActions=this.history.allowedActions,this.api.markAsUsed(),document.addEventListener("vaadin-theme-updated",()=>{fe.clear(),this.refreshTheme()})}update(o){var e,t;super.update(o),o.has("expanded")&&(this.expanded?this.highlightElement((e=this.context)==null?void 0:e.component.element):this.removeElementHighlight((t=this.context)==null?void 0:t.component.element))}disconnectedCallback(){var o;super.disconnectedCallback(),this.removeElementHighlight((o=this.context)==null?void 0:o.component.element)}render(){var o,e,t;return this.themeEditorState===Ye.missing_theme?this.renderMissingThemeNotice():v`
      <div class="header">
        <div class="picker-row">
          ${this.renderPicker()}
          <div class="actions">
            ${(o=this.context)!=null&&o.metadata?v` <vaadin-dev-tools-theme-scope-selector
                  .value=${this.context.scope}
                  .metadata=${this.context.metadata}
                  @scope-change=${this.handleScopeChange}
                ></vaadin-dev-tools-theme-scope-selector>`:null}
            <button
              class="icon-button"
              data-testid="undo"
              ?disabled=${!((e=this.historyActions)!=null&&e.allowUndo)}
              @click=${this.handleUndo}
            >
              ${yt.undo}
            </button>
            <button
              class="icon-button"
              data-testid="redo"
              ?disabled=${!((t=this.historyActions)!=null&&t.allowRedo)}
              @click=${this.handleRedo}
            >
              ${yt.redo}
            </button>
          </div>
        </div>
        ${this.renderLocalClassNameEditor()}
      </div>
      ${this.renderPropertyList()}
    `}renderMissingThemeNotice(){return v`
      <div class="notice">
        It looks like you have not set up an application theme yet. Theme editor requires an existing theme to work
        with. Please check our
        <a href="https://vaadin.com/docs/latest/styling/application-theme" target="_blank">documentation</a>
        on how to set up an application theme.
      </div>
    `}renderPropertyList(){if(!this.context)return null;if(!this.context.metadata){const o=this.context.component.element.localName;return v`
        <div class="notice">Styling <code>&lt;${o}&gt;</code> components is not supported at the moment.</div>
      `}if(this.context.scope===z.local&&!this.context.accessible){const o=this.context.metadata.displayName;return v`
        <div class="notice">
          The selected ${o} can not be styled locally. Currently, theme editor only supports styling
          instances that are assigned to a local variable, like so:
          <pre><code>Button saveButton = new Button("Save");</code></pre>
          If you want to modify the code so that it satisfies this requirement,
          <button class="link-button" @click=${this.handleShowComponent}>click here</button>
          to open it in your IDE. Alternatively you can choose to style all ${o}s by selecting "Global" from
          the scope dropdown above.
        </div>
      `}return v` <vaadin-dev-tools-theme-property-list
      class="property-list"
      .metadata=${this.context.metadata}
      .theme=${this.effectiveTheme}
      @theme-property-value-change=${this.handlePropertyChange}
      @open-css=${this.handleOpenCss}
    ></vaadin-dev-tools-theme-property-list>`}handleShowComponent(){if(!this.context)return;const o=this.context.component,e={nodeId:o.nodeId,uiId:o.uiId};this.connection.sendShowComponentCreateLocation(e)}async handleOpenCss(o){if(!this.context)return;await this.ensureLocalClassName();const e={themeScope:this.context.scope,localClassName:this.context.localClassName},t=Le(o.detail.element,e);await this.api.openCss(t)}renderPicker(){var o;let e;if((o=this.context)!=null&&o.metadata){const t=this.context.scope===z.local?this.context.metadata.displayName:`All ${this.context.metadata.displayName}s`,n=v`<span class="component-type">${t}</span>`,i=this.context.scope===z.local?Ir(this.context.component):null,s=i?v` <span class="instance-name-quote">"</span><span class="instance-name">${i}</span
            ><span class="instance-name-quote">"</span>`:null;e=v`${n} ${s}`}else e=v`<span class="no-selection">Pick an element to get started</span>`;return v`
      <div class="picker">
        <button @click=${this.pickComponent}>${yt.crosshair} ${e}</button>
      </div>
    `}renderLocalClassNameEditor(){var o;const e=((o=this.context)==null?void 0:o.scope)===z.local&&this.context.accessible;if(!this.context||!e)return null;const t=this.context.localClassName||this.context.suggestedClassName;return v` <vaadin-dev-tools-theme-class-name-editor
      .className=${t}
      @class-name-change=${this.handleClassNameChange}
    >
    </vaadin-dev-tools-theme-class-name-editor>`}async handleClassNameChange(o){if(!this.context)return;const e=this.context.localClassName,t=o.detail.value;if(e){const n=this.context.component.element;this.context.localClassName=t;const i=await this.api.setLocalClassName(this.context.component,t);this.historyActions=this.history.push(i.requestId,()=>fe.previewLocalClassName(n,t),()=>fe.previewLocalClassName(n,e))}else this.context={...this.context,suggestedClassName:t}}async pickComponent(){var o;this.removeElementHighlight((o=this.context)==null?void 0:o.component.element),this.pickerProvider().open({infoTemplate:v`
        <div>
          <h3>Locate the component to style</h3>
          <p>Use the mouse cursor to highlight components in the UI.</p>
          <p>Use arrow down/up to cycle through and highlight specific components under the cursor.</p>
          <p>Click the primary mouse button to select the component.</p>
        </div>
      `,pickCallback:async e=>{var t;const n=await Tr.getMetadata(e);if(!n){this.context={component:e,scope:((t=this.context)==null?void 0:t.scope)||z.local},this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null;return}this.highlightElement(e.element),this.refreshComponentAndTheme(e,n)}})}handleScopeChange(o){this.context&&this.refreshTheme({...this.context,scope:o.detail.value})}async handlePropertyChange(o){if(!this.context||!this.baseTheme||!this.editedTheme)return;const{element:e,property:t,value:n}=o.detail;this.editedTheme.updatePropertyValue(e.selector,t.propertyName,n,!0),this.effectiveTheme=ce.combine(this.baseTheme,this.editedTheme),await this.ensureLocalClassName();const i={themeScope:this.context.scope,localClassName:this.context.localClassName},s=Nr(e,i,t.propertyName,n);try{const r=await this.api.setCssRules([s]);this.historyActions=this.history.push(r.requestId);const l=Pr(s);fe.add(l)}catch(r){console.error("Failed to update property value",r)}}async handleUndo(){this.historyActions=await this.history.undo(),await this.refreshComponentAndTheme()}async handleRedo(){this.historyActions=await this.history.redo(),await this.refreshComponentAndTheme()}async ensureLocalClassName(){if(!this.context||this.context.scope===z.global||this.context.localClassName)return;if(!this.context.localClassName&&!this.context.suggestedClassName)throw new Error("Cannot assign local class name for the component because it does not have a suggested class name");const o=this.context.component.element,e=this.context.suggestedClassName;this.context.localClassName=e;const t=await this.api.setLocalClassName(this.context.component,e);this.historyActions=this.history.push(t.requestId,()=>fe.previewLocalClassName(o,e),()=>fe.previewLocalClassName(o))}async refreshComponentAndTheme(o,e){var t,n,i;if(o=o||((t=this.context)==null?void 0:t.component),e=e||((n=this.context)==null?void 0:n.metadata),!o||!e)return;const s=await this.api.loadComponentMetadata(o);fe.previewLocalClassName(o.element,s.className),await this.refreshTheme({scope:((i=this.context)==null?void 0:i.scope)||z.local,metadata:e,component:o,localClassName:s.className,suggestedClassName:s.suggestedClassName,accessible:s.accessible})}async refreshTheme(o){const e=o||this.context;if(!e||!e.metadata)return;if(e.scope===z.local&&!e.accessible){this.context=e,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null;return}let t=new ce(e.metadata);if(!(e.scope===z.local&&!e.localClassName)){const i={themeScope:e.scope,localClassName:e.localClassName},s=e.metadata.elements.map(l=>Le(l,i)),r=await this.api.loadRules(s);t=ce.fromServerRules(e.metadata,i,r.rules)}const n=await Ar(e.metadata);this.context=e,this.baseTheme=n,this.editedTheme=t,this.effectiveTheme=ce.combine(n,this.editedTheme)}highlightElement(o){o&&o.classList.add("vaadin-theme-editor-highlight")}removeElementHighlight(o){o&&o.classList.remove("vaadin-theme-editor-highlight")}};pe([y({})],ie.prototype,"expanded",2);pe([y({})],ie.prototype,"themeEditorState",2);pe([y({})],ie.prototype,"pickerProvider",2);pe([y({})],ie.prototype,"connection",2);pe([T()],ie.prototype,"historyActions",2);pe([T()],ie.prototype,"context",2);pe([T()],ie.prototype,"effectiveTheme",2);ie=pe([F("vaadin-dev-tools-theme-editor")],ie);var Va=function(){var o=document.getSelection();if(!o.rangeCount)return function(){};for(var e=document.activeElement,t=[],n=0;n<o.rangeCount;n++)t.push(o.getRangeAt(n));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return o.removeAllRanges(),function(){o.type==="Caret"&&o.removeAllRanges(),o.rangeCount||t.forEach(function(i){o.addRange(i)}),e&&e.focus()}},Hn={"text/plain":"Text","text/html":"Url",default:"Text"},Da="Copy to clipboard: #{key}, Enter";function za(o){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return o.replace(/#{\s*key\s*}/g,e)}function Ua(o,e){var t,n,i,s,r,l,a=!1;e||(e={}),t=e.debug||!1;try{i=Va(),s=document.createRange(),r=document.getSelection(),l=document.createElement("span"),l.textContent=o,l.style.all="unset",l.style.position="fixed",l.style.top=0,l.style.clip="rect(0, 0, 0, 0)",l.style.whiteSpace="pre",l.style.webkitUserSelect="text",l.style.MozUserSelect="text",l.style.msUserSelect="text",l.style.userSelect="text",l.addEventListener("copy",function(c){if(c.stopPropagation(),e.format)if(c.preventDefault(),typeof c.clipboardData>"u"){t&&console.warn("unable to use e.clipboardData"),t&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var m=Hn[e.format]||Hn.default;window.clipboardData.setData(m,o)}else c.clipboardData.clearData(),c.clipboardData.setData(e.format,o);e.onCopy&&(c.preventDefault(),e.onCopy(c.clipboardData))}),document.body.appendChild(l),s.selectNodeContents(l),r.addRange(s);var d=document.execCommand("copy");if(!d)throw new Error("copy command was unsuccessful");a=!0}catch(c){t&&console.error("unable to copy using execCommand: ",c),t&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",o),e.onCopy&&e.onCopy(window.clipboardData),a=!0}catch(m){t&&console.error("unable to copy using clipboardData: ",m),t&&console.error("falling back to prompt"),n=za("message"in e?e.message:Da),window.prompt(n,o)}}finally{r&&(typeof r.removeRange=="function"?r.removeRange(s):r.removeAllRanges()),l&&document.body.removeChild(l),i()}return a}const Fo=1e3,Bo=(o,e)=>{const t=Array.from(o.querySelectorAll(e.join(", "))),n=Array.from(o.querySelectorAll("*")).filter(i=>i.shadowRoot).flatMap(i=>Bo(i.shadowRoot,e));return[...t,...n]};let qn=!1;const Ze=(o,e)=>{qn||(window.addEventListener("message",i=>{i.data==="validate-license"&&window.location.reload()},!1),qn=!0);const t=o._overlayElement;if(t){if(t.shadowRoot){const i=t.shadowRoot.querySelector("slot:not([name])");if(i&&i.assignedElements().length>0){Ze(i.assignedElements()[0],e);return}}Ze(t,e);return}const n=e.messageHtml?e.messageHtml:`${e.message} <p>Component: ${e.product.name} ${e.product.version}</p>`.replace(/https:([^ ]*)/g,"<a href='https:$1'>https:$1</a>");o.isConnected&&(o.outerHTML=`<no-license style="display:flex;align-items:center;text-align:center;justify-content:center;"><div>${n}</div></no-license>`)},Be={},Wn={},Ve={},Ci={},Q=o=>`${o.name}_${o.version}`,Gn=o=>{const{cvdlName:e,version:t}=o.constructor,n={name:e,version:t},i=o.tagName.toLowerCase();Be[e]=Be[e]??[],Be[e].push(i);const s=Ve[Q(n)];s&&setTimeout(()=>Ze(o,s),Fo),Ve[Q(n)]||Ci[Q(n)]||Wn[Q(n)]||(Wn[Q(n)]=!0,window.Vaadin.devTools.checkLicense(n))},ja=o=>{Ci[Q(o)]=!0,console.debug("License check ok for",o)},ki=o=>{const e=o.product.name;Ve[Q(o.product)]=o,console.error("License check failed for",e);const t=Be[e];(t==null?void 0:t.length)>0&&Bo(document,t).forEach(n=>{setTimeout(()=>Ze(n,Ve[Q(o.product)]),Fo)})},Fa=o=>{const e=o.message,t=o.product.name;o.messageHtml=`No license found. <a target=_blank onclick="javascript:window.open(this.href);return false;" href="${e}">Go here to start a trial or retrieve your license.</a>`,Ve[Q(o.product)]=o,console.error("No license found when checking",t);const n=Be[t];(n==null?void 0:n.length)>0&&Bo(document,n).forEach(i=>{setTimeout(()=>Ze(i,Ve[Q(o.product)]),Fo)})},Ba=()=>{window.Vaadin.devTools.createdCvdlElements.forEach(o=>{Gn(o)}),window.Vaadin.devTools.createdCvdlElements={push:o=>{Gn(o)}}};var M=(o=>(o.ACTIVE="active",o.INACTIVE="inactive",o.UNAVAILABLE="unavailable",o.ERROR="error",o))(M||{});const $i=class Ti extends Object{constructor(e){super(),this.status="unavailable",e&&(this.webSocket=new WebSocket(e),this.webSocket.onmessage=t=>this.handleMessage(t),this.webSocket.onerror=t=>this.handleError(t),this.webSocket.onclose=t=>{this.status!=="error"&&this.setStatus("unavailable"),this.webSocket=void 0}),setInterval(()=>{this.webSocket&&self.status!=="error"&&this.status!=="unavailable"&&this.webSocket.send("")},Ti.HEARTBEAT_INTERVAL)}onHandshake(){}onReload(){}onUpdate(e,t){}onConnectionError(e){}onStatusChange(e){}onMessage(e){console.error("Unknown message received from the live reload server:",e)}handleMessage(e){let t;try{t=JSON.parse(e.data)}catch(n){this.handleError(`[${n.name}: ${n.message}`);return}t.command==="hello"?(this.setStatus("active"),this.onHandshake()):t.command==="reload"?this.status==="active"&&this.onReload():t.command==="update"?this.status==="active"&&this.onUpdate(t.path,t.content):t.command==="license-check-ok"?ja(t.data):t.command==="license-check-failed"?ki(t.data):t.command==="license-check-nokey"?Fa(t.data):this.onMessage(t)}handleError(e){console.error(e),this.setStatus("error"),e instanceof Event&&this.webSocket?this.onConnectionError(`Error in WebSocket connection to ${this.webSocket.url}`):this.onConnectionError(e)}setActive(e){!e&&this.status==="active"?this.setStatus("inactive"):e&&this.status==="inactive"&&this.setStatus("active")}setStatus(e){this.status!==e&&(this.status=e,this.onStatusChange(e))}send(e,t){const n=JSON.stringify({command:e,data:t});this.webSocket?this.webSocket.readyState!==WebSocket.OPEN?this.webSocket.addEventListener("open",()=>this.webSocket.send(n)):this.webSocket.send(n):console.error(`Unable to send message ${e}. No websocket is available`)}setFeature(e,t){this.send("setFeature",{featureId:e,enabled:t})}sendTelemetry(e){this.send("reportTelemetry",{browserData:e})}sendLicenseCheck(e){this.send("checkLicense",e)}sendShowComponentCreateLocation(e){this.send("showComponentCreateLocation",e)}sendShowComponentAttachLocation(e){this.send("showComponentAttachLocation",e)}};$i.HEARTBEAT_INTERVAL=18e4;let bo=$i;var Ha=Object.defineProperty,qa=Object.getOwnPropertyDescriptor,N=(o,e,t,n)=>{for(var i=n>1?void 0:n?qa(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(i=(n?r(e,t,i):r(i))||i);return n&&i&&Ha(e,t,i),i};const _=class C extends A{constructor(){super(),this.expanded=!1,this.messages=[],this.notifications=[],this.frontendStatus=M.UNAVAILABLE,this.javaStatus=M.UNAVAILABLE,this.tabs=[{id:"log",title:"Log",render:()=>this.renderLog(),activate:this.activateLog},{id:"info",title:"Info",render:()=>this.renderInfo()},{id:"features",title:"Feature Flags",render:()=>this.renderFeatures()}],this.activeTab="log",this.serverInfo={flowVersion:"",vaadinVersion:"",javaVersion:"",osVersion:"",productName:""},this.features=[],this.unreadErrors=!1,this.componentPickActive=!1,this.themeEditorState=Ye.disabled,this.nextMessageId=1,this.transitionDuration=0,this.disableLiveReloadTimeout=null,window.Vaadin.Flow&&this.tabs.push({id:"code",title:"Code",render:()=>this.renderCode()})}static get styles(){return[E`
        :host {
          --dev-tools-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
            'Helvetica Neue', sans-serif;
          --dev-tools-font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
            monospace;

          --dev-tools-font-size: 0.8125rem;
          --dev-tools-font-size-small: 0.75rem;

          --dev-tools-text-color: rgba(255, 255, 255, 0.8);
          --dev-tools-text-color-secondary: rgba(255, 255, 255, 0.65);
          --dev-tools-text-color-emphasis: rgba(255, 255, 255, 0.95);
          --dev-tools-text-color-active: rgba(255, 255, 255, 1);

          --dev-tools-background-color-inactive: rgba(45, 45, 45, 0.25);
          --dev-tools-background-color-active: rgba(45, 45, 45, 0.98);
          --dev-tools-background-color-active-blurred: rgba(45, 45, 45, 0.85);

          --dev-tools-border-radius: 0.5rem;
          --dev-tools-box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.4);

          --dev-tools-blue-hsl: 206, 100%, 70%;
          --dev-tools-blue-color: hsl(var(--dev-tools-blue-hsl));
          --dev-tools-green-hsl: 145, 80%, 42%;
          --dev-tools-green-color: hsl(var(--dev-tools-green-hsl));
          --dev-tools-grey-hsl: 0, 0%, 50%;
          --dev-tools-grey-color: hsl(var(--dev-tools-grey-hsl));
          --dev-tools-yellow-hsl: 38, 98%, 64%;
          --dev-tools-yellow-color: hsl(var(--dev-tools-yellow-hsl));
          --dev-tools-red-hsl: 355, 100%, 68%;
          --dev-tools-red-color: hsl(var(--dev-tools-red-hsl));

          /* Needs to be in ms, used in JavaScript as well */
          --dev-tools-transition-duration: 180ms;

          all: initial;

          direction: ltr;
          cursor: default;
          font: normal 400 var(--dev-tools-font-size) / 1.125rem var(--dev-tools-font-family);
          color: var(--dev-tools-text-color);
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
          color-scheme: dark;

          position: fixed;
          z-index: 20000;
          pointer-events: none;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
        }

        .dev-tools {
          pointer-events: auto;
          display: flex;
          align-items: center;
          position: fixed;
          z-index: inherit;
          right: 0.5rem;
          bottom: 0.5rem;
          min-width: 1.75rem;
          height: 1.75rem;
          max-width: 1.75rem;
          border-radius: 0.5rem;
          padding: 0.375rem;
          box-sizing: border-box;
          background-color: var(--dev-tools-background-color-inactive);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          white-space: nowrap;
          line-height: 1rem;
        }

        .dev-tools:hover,
        .dev-tools.active {
          background-color: var(--dev-tools-background-color-active);
          box-shadow: var(--dev-tools-box-shadow);
        }

        .dev-tools.active {
          max-width: calc(100% - 1rem);
        }

        .dev-tools .dev-tools-icon {
          flex: none;
          pointer-events: none;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          fill: #fff;
          transition: var(--dev-tools-transition-duration);
          margin: 0;
        }

        .dev-tools.active .dev-tools-icon {
          opacity: 0;
          position: absolute;
          transform: scale(0.5);
        }

        .dev-tools .status-blip {
          flex: none;
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          z-index: 20001;
          background: var(--dev-tools-grey-color);
          position: absolute;
          top: -1px;
          right: -1px;
        }

        .dev-tools .status-description {
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 0.25rem;
        }

        .dev-tools.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.15);
          animation: bounce 0.5s;
          animation-iteration-count: 2;
        }

        .switch {
          display: inline-flex;
          align-items: center;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }

        .switch .slider {
          display: block;
          flex: none;
          width: 28px;
          height: 18px;
          border-radius: 9px;
          background-color: rgba(255, 255, 255, 0.3);
          transition: var(--dev-tools-transition-duration);
          margin-right: 0.5rem;
        }

        .switch:focus-within .slider,
        .switch .slider:hover {
          background-color: rgba(255, 255, 255, 0.35);
          transition: none;
        }

        .switch input:focus-visible ~ .slider {
          box-shadow: 0 0 0 2px var(--dev-tools-background-color-active), 0 0 0 4px var(--dev-tools-blue-color);
        }

        .switch .slider::before {
          content: '';
          display: block;
          margin: 2px;
          width: 14px;
          height: 14px;
          background-color: #fff;
          transition: var(--dev-tools-transition-duration);
          border-radius: 50%;
        }

        .switch input:checked + .slider {
          background-color: var(--dev-tools-green-color);
        }

        .switch input:checked + .slider::before {
          transform: translateX(10px);
        }

        .switch input:disabled + .slider::before {
          background-color: var(--dev-tools-grey-color);
        }

        .window.hidden {
          opacity: 0;
          transform: scale(0);
          position: absolute;
        }

        .window.visible {
          transform: none;
          opacity: 1;
          pointer-events: auto;
        }

        .window.visible ~ .dev-tools {
          opacity: 0;
          pointer-events: none;
        }

        .window.visible ~ .dev-tools .dev-tools-icon,
        .window.visible ~ .dev-tools .status-blip {
          transition: none;
          opacity: 0;
        }

        .window {
          border-radius: var(--dev-tools-border-radius);
          overflow: auto;
          margin: 0.5rem;
          min-width: 30rem;
          max-width: calc(100% - 1rem);
          max-height: calc(100vh - 1rem);
          flex-shrink: 1;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          display: flex;
          flex-direction: column;
          box-shadow: var(--dev-tools-box-shadow);
          outline: none;
        }

        .window-toolbar {
          display: flex;
          flex: none;
          align-items: center;
          padding: 0.375rem;
          white-space: nowrap;
          order: 1;
          background-color: rgba(0, 0, 0, 0.2);
          gap: 0.5rem;
        }

        .tab {
          color: var(--dev-tools-text-color-secondary);
          font: inherit;
          font-size: var(--dev-tools-font-size-small);
          font-weight: 500;
          line-height: 1;
          padding: 0.25rem 0.375rem;
          background: none;
          border: none;
          margin: 0;
          border-radius: 0.25rem;
          transition: var(--dev-tools-transition-duration);
        }

        .tab:hover,
        .tab.active {
          color: var(--dev-tools-text-color-active);
        }

        .tab.active {
          background-color: rgba(255, 255, 255, 0.12);
        }

        .tab.unreadErrors::after {
          content: '•';
          color: hsl(var(--dev-tools-red-hsl));
          font-size: 1.5rem;
          position: absolute;
          transform: translate(0, -50%);
        }

        .ahreflike {
          font-weight: 500;
          color: var(--dev-tools-text-color-secondary);
          text-decoration: underline;
          cursor: pointer;
        }

        .ahreflike:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .button {
          all: initial;
          font-family: inherit;
          font-size: var(--dev-tools-font-size-small);
          line-height: 1;
          white-space: nowrap;
          background-color: rgba(0, 0, 0, 0.2);
          color: inherit;
          font-weight: 600;
          padding: 0.25rem 0.375rem;
          border-radius: 0.25rem;
        }

        .button:focus,
        .button:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .minimize-button {
          flex: none;
          width: 1rem;
          height: 1rem;
          color: inherit;
          background-color: transparent;
          border: 0;
          padding: 0;
          margin: 0 0 0 auto;
          opacity: 0.8;
        }

        .minimize-button:hover {
          opacity: 1;
        }

        .minimize-button svg {
          max-width: 100%;
        }

        .message.information {
          --dev-tools-notification-color: var(--dev-tools-blue-color);
        }

        .message.warning {
          --dev-tools-notification-color: var(--dev-tools-yellow-color);
        }

        .message.error {
          --dev-tools-notification-color: var(--dev-tools-red-color);
        }

        .message {
          display: flex;
          padding: 0.1875rem 0.75rem 0.1875rem 2rem;
          background-clip: padding-box;
        }

        .message.log {
          padding-left: 0.75rem;
        }

        .message-content {
          margin-right: 0.5rem;
          -webkit-user-select: text;
          -moz-user-select: text;
          user-select: text;
        }

        .message-heading {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0.125rem 0;
        }

        .message.log {
          color: var(--dev-tools-text-color-secondary);
        }

        .message:not(.log) .message-heading {
          font-weight: 500;
        }

        .message.has-details .message-heading {
          color: var(--dev-tools-text-color-emphasis);
          font-weight: 600;
        }

        .message-heading::before {
          position: absolute;
          margin-left: -1.5rem;
          display: inline-block;
          text-align: center;
          font-size: 0.875em;
          font-weight: 600;
          line-height: calc(1.25em - 2px);
          width: 14px;
          height: 14px;
          box-sizing: border-box;
          border: 1px solid transparent;
          border-radius: 50%;
        }

        .message.information .message-heading::before {
          content: 'i';
          border-color: currentColor;
          color: var(--dev-tools-notification-color);
        }

        .message.warning .message-heading::before,
        .message.error .message-heading::before {
          content: '!';
          color: var(--dev-tools-background-color-active);
          background-color: var(--dev-tools-notification-color);
        }

        .features-tray {
          padding: 0.75rem;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .features-tray p {
          margin-top: 0;
          color: var(--dev-tools-text-color-secondary);
        }

        .features-tray .feature {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 0.5em;
        }

        .message .message-details {
          font-weight: 400;
          color: var(--dev-tools-text-color-secondary);
          margin: 0.25rem 0;
        }

        .message .message-details[hidden] {
          display: none;
        }

        .message .message-details p {
          display: inline;
          margin: 0;
          margin-right: 0.375em;
          word-break: break-word;
        }

        .message .persist {
          color: var(--dev-tools-text-color-secondary);
          white-space: nowrap;
          margin: 0.375rem 0;
          display: flex;
          align-items: center;
          position: relative;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        .message .persist::before {
          content: '';
          width: 1em;
          height: 1em;
          border-radius: 0.2em;
          margin-right: 0.375em;
          background-color: rgba(255, 255, 255, 0.3);
        }

        .message .persist:hover::before {
          background-color: rgba(255, 255, 255, 0.4);
        }

        .message .persist.on::before {
          background-color: rgba(255, 255, 255, 0.9);
        }

        .message .persist.on::after {
          content: '';
          order: -1;
          position: absolute;
          width: 0.75em;
          height: 0.25em;
          border: 2px solid var(--dev-tools-background-color-active);
          border-width: 0 0 2px 2px;
          transform: translate(0.05em, -0.05em) rotate(-45deg) scale(0.8, 0.9);
        }

        .message .dismiss-message {
          font-weight: 600;
          align-self: stretch;
          display: flex;
          align-items: center;
          padding: 0 0.25rem;
          margin-left: 0.5rem;
          color: var(--dev-tools-text-color-secondary);
        }

        .message .dismiss-message:hover {
          color: var(--dev-tools-text-color);
        }

        .notification-tray {
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
          margin: 0.5rem;
          flex: none;
        }

        .window.hidden + .notification-tray {
          margin-bottom: 3rem;
        }

        .notification-tray .message {
          pointer-events: auto;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          max-width: 30rem;
          box-sizing: border-box;
          border-radius: var(--dev-tools-border-radius);
          margin-top: 0.5rem;
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          animation: slideIn var(--dev-tools-transition-duration);
          box-shadow: var(--dev-tools-box-shadow);
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }

        .notification-tray .message.animate-out {
          animation: slideOut forwards var(--dev-tools-transition-duration);
        }

        .notification-tray .message .message-details {
          max-height: 10em;
          overflow: hidden;
        }

        .message-tray {
          flex: auto;
          overflow: auto;
          max-height: 20rem;
          user-select: text;
        }

        .message-tray .message {
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          padding-left: 2.25rem;
        }

        .message-tray .message.warning {
          background-color: hsla(var(--dev-tools-yellow-hsl), 0.09);
        }

        .message-tray .message.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.09);
        }

        .message-tray .message.error .message-heading {
          color: hsl(var(--dev-tools-red-hsl));
        }

        .message-tray .message.warning .message-heading {
          color: hsl(var(--dev-tools-yellow-hsl));
        }

        .message-tray .message + .message {
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .message-tray .dismiss-message,
        .message-tray .persist {
          display: none;
        }

        .info-tray {
          padding: 0.75rem;
          position: relative;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .info-tray dl {
          margin: 0;
          display: grid;
          grid-template-columns: max-content 1fr;
          column-gap: 0.75rem;
          position: relative;
        }

        .info-tray dt {
          grid-column: 1;
          color: var(--dev-tools-text-color-emphasis);
        }

        .info-tray dt:not(:first-child)::before {
          content: '';
          width: 100%;
          position: absolute;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.1);
          margin-top: -0.375rem;
        }

        .info-tray dd {
          grid-column: 2;
          margin: 0;
        }

        .info-tray :is(dt, dd):not(:last-child) {
          margin-bottom: 0.75rem;
        }

        .info-tray dd + dd {
          margin-top: -0.5rem;
        }

        .info-tray .live-reload-status::before {
          content: '•';
          color: var(--status-color);
          width: 0.75rem;
          display: inline-block;
          font-size: 1rem;
          line-height: 0.5rem;
        }

        .info-tray .copy {
          position: fixed;
          z-index: 1;
          top: 0.5rem;
          right: 0.5rem;
        }

        .info-tray .switch {
          vertical-align: -4px;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0%);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
        }

        @keyframes bounce {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.5);
            background-color: hsla(var(--dev-tools-red-hsl), 1);
          }
          100% {
            transform: scale(1);
          }
        }

        @supports (backdrop-filter: blur(1px)) {
          .dev-tools,
          .window,
          .notification-tray .message {
            backdrop-filter: blur(8px);
          }
          .dev-tools:hover,
          .dev-tools.active,
          .window,
          .notification-tray .message {
            background-color: var(--dev-tools-background-color-active-blurred);
          }
        }
      `,Ei]}static get isActive(){const e=window.sessionStorage.getItem(C.ACTIVE_KEY_IN_SESSION_STORAGE);return e===null||e!=="false"}static notificationDismissed(e){const t=window.localStorage.getItem(C.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);return t!==null&&t.includes(e)}elementTelemetry(){let e={};try{const t=localStorage.getItem("vaadin.statistics.basket");if(!t)return;e=JSON.parse(t)}catch{return}this.frontendConnection&&this.frontendConnection.sendTelemetry(e)}openWebSocketConnection(){this.frontendStatus=M.UNAVAILABLE,this.javaStatus=M.UNAVAILABLE;const e=a=>this.log("error",a),t=()=>{this.showSplashMessage("Reloading…");const a=window.sessionStorage.getItem(C.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE),d=a?parseInt(a,10)+1:1;window.sessionStorage.setItem(C.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE,d.toString()),window.sessionStorage.setItem(C.TRIGGERED_KEY_IN_SESSION_STORAGE,"true"),window.location.reload()},n=(a,d)=>{let c=document.head.querySelector(`style[data-file-path='${a}']`);c?(this.log("information","Hot update of "+a),c.textContent=d,document.dispatchEvent(new CustomEvent("vaadin-theme-updated"))):t()},i=new bo(this.getDedicatedWebSocketUrl());i.onHandshake=()=>{this.log("log","Vaadin development mode initialized"),C.isActive||i.setActive(!1),this.elementTelemetry()},i.onConnectionError=e,i.onReload=t,i.onUpdate=n,i.onStatusChange=a=>{this.frontendStatus=a},i.onMessage=a=>this.handleFrontendMessage(a),this.frontendConnection=i;let s;this.backend===C.SPRING_BOOT_DEVTOOLS&&this.springBootLiveReloadPort?(s=new bo(this.getSpringBootWebSocketUrl(window.location)),s.onHandshake=()=>{C.isActive||s.setActive(!1)},s.onReload=t,s.onConnectionError=e):this.backend===C.JREBEL||this.backend===C.HOTSWAP_AGENT?s=i:s=new bo(void 0);const r=s.onStatusChange;s.onStatusChange=a=>{r(a),this.javaStatus=a};const l=s.onHandshake;s.onHandshake=()=>{l(),this.backend&&this.log("information",`Java live reload available: ${C.BACKEND_DISPLAY_NAME[this.backend]}`)},this.javaConnection=s,this.backend||this.showNotification("warning","Java live reload unavailable","Live reload for Java changes is currently not set up. Find out how to make use of this functionality to boost your workflow.","https://vaadin.com/docs/latest/flow/configuration/live-reload","liveReloadUnavailable")}handleFrontendMessage(e){if((e==null?void 0:e.command)==="serverInfo")this.serverInfo=e.data;else if((e==null?void 0:e.command)==="featureFlags")this.features=e.data.features;else if((e==null?void 0:e.command)==="themeEditorState"){const t=!!window.Vaadin.Flow;this.themeEditorState=e.data,t&&this.themeEditorState!==Ye.disabled&&(this.tabs.push({id:"theme-editor",title:"Theme Editor (Preview)",render:()=>this.renderThemeEditor()}),this.requestUpdate())}else console.error("Unknown message from front-end connection:",JSON.stringify(e))}getDedicatedWebSocketUrl(){function e(n){const i=document.createElement("div");return i.innerHTML=`<a href="${n}"/>`,i.firstChild.href}if(this.url===void 0)return;const t=e(this.url);if(!t.startsWith("http://")&&!t.startsWith("https://")){console.error("The protocol of the url should be http or https for live reload to work.");return}return`${t.replace(/^http/,"ws")}?v-r=push&debug_window`}getSpringBootWebSocketUrl(e){const{hostname:t}=e,n=e.protocol==="https:"?"wss":"ws";if(t.endsWith("gitpod.io")){const i=t.replace(/.*?-/,"");return`${n}://${this.springBootLiveReloadPort}-${i}`}else return`${n}://${t}:${this.springBootLiveReloadPort}`}connectedCallback(){if(super.connectedCallback(),this.catchErrors(),this.disableEventListener=t=>this.demoteSplashMessage(),document.body.addEventListener("focus",this.disableEventListener),document.body.addEventListener("click",this.disableEventListener),this.openWebSocketConnection(),window.sessionStorage.getItem(C.TRIGGERED_KEY_IN_SESSION_STORAGE)){const t=new Date,n=`${`0${t.getHours()}`.slice(-2)}:${`0${t.getMinutes()}`.slice(-2)}:${`0${t.getSeconds()}`.slice(-2)}`;this.showSplashMessage(`Page reloaded at ${n}`),window.sessionStorage.removeItem(C.TRIGGERED_KEY_IN_SESSION_STORAGE)}this.transitionDuration=parseInt(window.getComputedStyle(this).getPropertyValue("--dev-tools-transition-duration"),10);const e=window;e.Vaadin=e.Vaadin||{},e.Vaadin.devTools=Object.assign(this,e.Vaadin.devTools),Ba(),document.documentElement.addEventListener("vaadin-overlay-outside-click",t=>{const n=t,i=n.target.owner;i&&br(this,i)||n.detail.sourceEvent.composedPath().includes(this)&&t.preventDefault()})}format(e){return e.toString()}catchErrors(){const e=window.Vaadin.ConsoleErrors;e&&e.forEach(t=>{this.log("error",t.map(n=>this.format(n)).join(" "))}),window.Vaadin.ConsoleErrors={push:t=>{this.log("error",t.map(n=>this.format(n)).join(" "))}}}disconnectedCallback(){this.disableEventListener&&(document.body.removeEventListener("focus",this.disableEventListener),document.body.removeEventListener("click",this.disableEventListener)),super.disconnectedCallback()}toggleExpanded(){this.notifications.slice().forEach(e=>this.dismissNotification(e.id)),this.expanded=!this.expanded,this.expanded&&this.root.focus()}showSplashMessage(e){this.splashMessage=e,this.splashMessage&&(this.expanded?this.demoteSplashMessage():setTimeout(()=>{this.demoteSplashMessage()},C.AUTO_DEMOTE_NOTIFICATION_DELAY))}demoteSplashMessage(){this.splashMessage&&this.log("log",this.splashMessage),this.showSplashMessage(void 0)}checkLicense(e){this.frontendConnection?this.frontendConnection.sendLicenseCheck(e):ki({message:"Internal error: no connection",product:e})}log(e,t,n,i){const s=this.nextMessageId;for(this.nextMessageId+=1,this.messages.push({id:s,type:e,message:t,details:n,link:i,dontShowAgain:!1,deleted:!1});this.messages.length>C.MAX_LOG_ROWS;)this.messages.shift();this.requestUpdate(),this.updateComplete.then(()=>{const r=this.renderRoot.querySelector(".message-tray .message:last-child");this.expanded&&r?(setTimeout(()=>r.scrollIntoView({behavior:"smooth"}),this.transitionDuration),this.unreadErrors=!1):e==="error"&&(this.unreadErrors=!0)})}showNotification(e,t,n,i,s){if(s===void 0||!C.notificationDismissed(s)){if(this.notifications.filter(l=>l.persistentId===s).filter(l=>!l.deleted).length>0)return;const r=this.nextMessageId;this.nextMessageId+=1,this.notifications.push({id:r,type:e,message:t,details:n,link:i,persistentId:s,dontShowAgain:!1,deleted:!1}),i===void 0&&setTimeout(()=>{this.dismissNotification(r)},C.AUTO_DEMOTE_NOTIFICATION_DELAY),this.requestUpdate()}else this.log(e,t,n,i)}dismissNotification(e){const t=this.findNotificationIndex(e);if(t!==-1&&!this.notifications[t].deleted){const n=this.notifications[t];if(n.dontShowAgain&&n.persistentId&&!C.notificationDismissed(n.persistentId)){let i=window.localStorage.getItem(C.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);i=i===null?n.persistentId:`${i},${n.persistentId}`,window.localStorage.setItem(C.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE,i)}n.deleted=!0,this.log(n.type,n.message,n.details,n.link),setTimeout(()=>{const i=this.findNotificationIndex(e);i!==-1&&(this.notifications.splice(i,1),this.requestUpdate())},this.transitionDuration)}}findNotificationIndex(e){let t=-1;return this.notifications.some((n,i)=>n.id===e?(t=i,!0):!1),t}toggleDontShowAgain(e){const t=this.findNotificationIndex(e);if(t!==-1&&!this.notifications[t].deleted){const n=this.notifications[t];n.dontShowAgain=!n.dontShowAgain,this.requestUpdate()}}setActive(e){var t,n;(t=this.frontendConnection)==null||t.setActive(e),(n=this.javaConnection)==null||n.setActive(e),window.sessionStorage.setItem(C.ACTIVE_KEY_IN_SESSION_STORAGE,e?"true":"false")}getStatusColor(e){return e===M.ACTIVE?"var(--dev-tools-green-color)":e===M.INACTIVE?"var(--dev-tools-grey-color)":e===M.UNAVAILABLE?"var(--dev-tools-yellow-hsl)":e===M.ERROR?"var(--dev-tools-red-color)":"none"}renderMessage(e){return v`
      <div
        class="message ${e.type} ${e.deleted?"animate-out":""} ${e.details||e.link?"has-details":""}"
      >
        <div class="message-content">
          <div class="message-heading">${e.message}</div>
          <div class="message-details" ?hidden="${!e.details&&!e.link}">
            ${e.details?v`<p>${e.details}</p>`:""}
            ${e.link?v`<a class="ahreflike" href="${e.link}" target="_blank">Learn more</a>`:""}
          </div>
          ${e.persistentId?v`<div
                class="persist ${e.dontShowAgain?"on":"off"}"
                @click=${()=>this.toggleDontShowAgain(e.id)}
              >
                Don’t show again
              </div>`:""}
        </div>
        <div class="dismiss-message" @click=${()=>this.dismissNotification(e.id)}>Dismiss</div>
      </div>
    `}render(){return v` <div
        class="window ${this.expanded&&!this.componentPickActive?"visible":"hidden"}"
        tabindex="0"
        @keydown=${e=>e.key==="Escape"&&this.expanded&&this.toggleExpanded()}
      >
        <div class="window-toolbar">
          ${this.tabs.map(e=>v`<button
                class=${Mo({tab:!0,active:this.activeTab===e.id,unreadErrors:e.id==="log"&&this.unreadErrors})}
                id="${e.id}"
                @click=${()=>{this.activeTab=e.id,e.activate&&e.activate.call(this)}}
              >
                ${e.title}
              </button> `)}
          <button class="minimize-button" title="Minimize" @click=${()=>this.toggleExpanded()}>
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
              <g fill="#fff" opacity=".8">
                <path
                  d="m7.25 1.75c0-.41421.33579-.75.75-.75h3.25c2.0711 0 3.75 1.67893 3.75 3.75v6.5c0 2.0711-1.6789 3.75-3.75 3.75h-6.5c-2.07107 0-3.75-1.6789-3.75-3.75v-3.25c0-.41421.33579-.75.75-.75s.75.33579.75.75v3.25c0 1.2426 1.00736 2.25 2.25 2.25h6.5c1.2426 0 2.25-1.0074 2.25-2.25v-6.5c0-1.24264-1.0074-2.25-2.25-2.25h-3.25c-.41421 0-.75-.33579-.75-.75z"
                />
                <path
                  d="m2.96967 2.96967c.29289-.29289.76777-.29289 1.06066 0l5.46967 5.46967v-2.68934c0-.41421.33579-.75.75-.75.4142 0 .75.33579.75.75v4.5c0 .4142-.3358.75-.75.75h-4.5c-.41421 0-.75-.3358-.75-.75 0-.41421.33579-.75.75-.75h2.68934l-5.46967-5.46967c-.29289-.29289-.29289-.76777 0-1.06066z"
                />
              </g>
            </svg>
          </button>
        </div>
        ${this.tabs.map(e=>this.activeTab===e.id?e.render():k)}
      </div>

      <div class="notification-tray">${this.notifications.map(e=>this.renderMessage(e))}</div>
      <vaadin-dev-tools-component-picker
        .active=${this.componentPickActive}
        @component-picker-opened=${()=>{this.componentPickActive=!0}}
        @component-picker-closed=${()=>{this.componentPickActive=!1}}
      ></vaadin-dev-tools-component-picker>
      <div
        class="dev-tools ${this.splashMessage?"active":""}${this.unreadErrors?" error":""}"
        @click=${()=>this.toggleExpanded()}
      >
        ${this.unreadErrors?v`<svg
              fill="none"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="dev-tools-icon error"
            >
              <clipPath id="a"><path d="m0 0h16v16h-16z" /></clipPath>
              <g clip-path="url(#a)">
                <path
                  d="m6.25685 2.09894c.76461-1.359306 2.72169-1.359308 3.4863 0l5.58035 9.92056c.7499 1.3332-.2135 2.9805-1.7432 2.9805h-11.1606c-1.529658 0-2.4930857-1.6473-1.743156-2.9805z"
                  fill="#ff5c69"
                />
                <path
                  d="m7.99699 4c-.45693 0-.82368.37726-.81077.834l.09533 3.37352c.01094.38726.32803.69551.71544.69551.38741 0 .70449-.30825.71544-.69551l.09533-3.37352c.0129-.45674-.35384-.834-.81077-.834zm.00301 8c.60843 0 1-.3879 1-.979 0-.5972-.39157-.9851-1-.9851s-1 .3879-1 .9851c0 .5911.39157.979 1 .979z"
                  fill="#fff"
                />
              </g>
            </svg>`:v`<svg
              fill="none"
              height="17"
              viewBox="0 0 16 17"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              class="dev-tools-icon logo"
            >
              <g fill="#fff">
                <path
                  d="m8.88273 5.97926c0 .04401-.0032.08898-.00801.12913-.02467.42848-.37813.76767-.8117.76767-.43358 0-.78704-.34112-.81171-.76928-.00481-.04015-.00801-.08351-.00801-.12752 0-.42784-.10255-.87656-1.14434-.87656h-3.48364c-1.57118 0-2.315271-.72849-2.315271-2.21758v-1.26683c0-.42431.324618-.768314.748261-.768314.42331 0 .74441.344004.74441.768314v.42784c0 .47924.39576.81265 1.11293.81265h3.41538c1.5542 0 1.67373 1.156 1.725 1.7679h.03429c.05095-.6119.17048-1.7679 1.72468-1.7679h3.4154c.7172 0 1.0145-.32924 1.0145-.80847l-.0067-.43202c0-.42431.3227-.768314.7463-.768314.4234 0 .7255.344004.7255.768314v1.26683c0 1.48909-.6181 2.21758-2.1893 2.21758h-3.4836c-1.04182 0-1.14437.44872-1.14437.87656z"
                />
                <path
                  d="m8.82577 15.1648c-.14311.3144-.4588.5335-.82635.5335-.37268 0-.69252-.2249-.83244-.5466-.00206-.0037-.00412-.0073-.00617-.0108-.00275-.0047-.00549-.0094-.00824-.0145l-3.16998-5.87318c-.08773-.15366-.13383-.32816-.13383-.50395 0-.56168.45592-1.01879 1.01621-1.01879.45048 0 .75656.22069.96595.6993l2.16882 4.05042 2.17166-4.05524c.2069-.47379.513-.69448.9634-.69448.5603 0 1.0166.45711 1.0166 1.01879 0 .17579-.0465.35029-.1348.50523l-3.1697 5.8725c-.00503.0096-.01006.0184-.01509.0272-.00201.0036-.00402.0071-.00604.0106z"
                />
              </g>
            </svg>`}

        <span
          class="status-blip"
          style="background: linear-gradient(to right, ${this.getStatusColor(this.frontendStatus)} 50%, ${this.getStatusColor(this.javaStatus)} 50%)"
        ></span>
        ${this.splashMessage?v`<span class="status-description">${this.splashMessage}</span></div>`:k}
      </div>`}renderLog(){return v`<div class="message-tray">${this.messages.map(e=>this.renderMessage(e))}</div>`}activateLog(){this.unreadErrors=!1,this.updateComplete.then(()=>{const e=this.renderRoot.querySelector(".message-tray .message:last-child");e&&e.scrollIntoView()})}renderCode(){return v`<div class="info-tray">
      <div>
        <select id="locationType">
          <option value="create" selected>Create</option>
          <option value="attach">Attach</option>
        </select>
        <button
          class="button pick"
          @click=${async()=>{await S(()=>Promise.resolve().then(()=>Oa),void 0),this.componentPicker.open({infoTemplate:v`
                <div>
                  <h3>Locate a component in source code</h3>
                  <p>Use the mouse cursor to highlight components in the UI.</p>
                  <p>Use arrow down/up to cycle through and highlight specific components under the cursor.</p>
                  <p>
                    Click the primary mouse button to open the corresponding source code line of the highlighted
                    component in your IDE.
                  </p>
                </div>
              `,pickCallback:e=>{const t={nodeId:e.nodeId,uiId:e.uiId};this.renderRoot.querySelector("#locationType").value==="create"?this.frontendConnection.sendShowComponentCreateLocation(t):this.frontendConnection.sendShowComponentAttachLocation(t)}})}}
        >
          Find component in code
        </button>
      </div>
      </div>
    </div>`}renderInfo(){return v`<div class="info-tray">
      <button class="button copy" @click=${this.copyInfoToClipboard}>Copy</button>
      <dl>
        <dt>${this.serverInfo.productName}</dt>
        <dd>${this.serverInfo.vaadinVersion}</dd>
        <dt>Flow</dt>
        <dd>${this.serverInfo.flowVersion}</dd>
        <dt>Java</dt>
        <dd>${this.serverInfo.javaVersion}</dd>
        <dt>OS</dt>
        <dd>${this.serverInfo.osVersion}</dd>
        <dt>Browser</dt>
        <dd>${navigator.userAgent}</dd>
        <dt>
          Live reload
          <label class="switch">
            <input
              id="toggle"
              type="checkbox"
              ?disabled=${this.liveReloadDisabled||(this.frontendStatus===M.UNAVAILABLE||this.frontendStatus===M.ERROR)&&(this.javaStatus===M.UNAVAILABLE||this.javaStatus===M.ERROR)}
              ?checked="${this.frontendStatus===M.ACTIVE||this.javaStatus===M.ACTIVE}"
              @change=${e=>this.setActive(e.target.checked)}
            />
            <span class="slider"></span>
          </label>
        </dt>
        <dd class="live-reload-status" style="--status-color: ${this.getStatusColor(this.javaStatus)}">
          Java ${this.javaStatus} ${this.backend?`(${C.BACKEND_DISPLAY_NAME[this.backend]})`:""}
        </dd>
        <dd class="live-reload-status" style="--status-color: ${this.getStatusColor(this.frontendStatus)}">
          Front end ${this.frontendStatus}
        </dd>
      </dl>
    </div>`}renderFeatures(){return v`<div class="features-tray">
      ${this.features.map(e=>v`<div class="feature">
          <label class="switch">
            <input
              class="feature-toggle"
              id="feature-toggle-${e.id}"
              type="checkbox"
              ?checked=${e.enabled}
              @change=${t=>this.toggleFeatureFlag(t,e)}
            />
            <span class="slider"></span>
            ${e.title}
          </label>
          <a class="ahreflike" href="${e.moreInfoLink}" target="_blank">Learn more</a>
        </div>`)}
    </div>`}renderThemeEditor(){return v` <vaadin-dev-tools-theme-editor
      .expanded=${this.expanded}
      .themeEditorState=${this.themeEditorState}
      .pickerProvider=${()=>this.componentPicker}
      .connection=${this.frontendConnection}
    ></vaadin-dev-tools-theme-editor>`}copyInfoToClipboard(){const e=this.renderRoot.querySelectorAll(".info-tray dt, .info-tray dd"),t=Array.from(e).map(n=>(n.localName==="dd"?": ":`
`)+n.textContent.trim()).join("").replace(/^\n/,"");Ua(t),this.showNotification("information","Environment information copied to clipboard",void 0,void 0,"versionInfoCopied")}toggleFeatureFlag(e,t){const n=e.target.checked;this.frontendConnection?(this.frontendConnection.setFeature(t.id,n),this.showNotification("information",`“${t.title}” ${n?"enabled":"disabled"}`,t.requiresServerRestart?"This feature requires a server restart":void 0,void 0,`feature${t.id}${n?"Enabled":"Disabled"}`)):this.log("error",`Unable to toggle feature ${t.title}: No server connection available`)}};_.MAX_LOG_ROWS=1e3;_.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE="vaadin.live-reload.dismissedNotifications";_.ACTIVE_KEY_IN_SESSION_STORAGE="vaadin.live-reload.active";_.TRIGGERED_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggered";_.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggeredCount";_.AUTO_DEMOTE_NOTIFICATION_DELAY=5e3;_.HOTSWAP_AGENT="HOTSWAP_AGENT";_.JREBEL="JREBEL";_.SPRING_BOOT_DEVTOOLS="SPRING_BOOT_DEVTOOLS";_.BACKEND_DISPLAY_NAME={HOTSWAP_AGENT:"HotswapAgent",JREBEL:"JRebel",SPRING_BOOT_DEVTOOLS:"Spring Boot Devtools"};N([y({type:String})],_.prototype,"url",2);N([y({type:Boolean,attribute:!0})],_.prototype,"liveReloadDisabled",2);N([y({type:String})],_.prototype,"backend",2);N([y({type:Number})],_.prototype,"springBootLiveReloadPort",2);N([y({type:Boolean,attribute:!1})],_.prototype,"expanded",2);N([y({type:Array,attribute:!1})],_.prototype,"messages",2);N([y({type:String,attribute:!1})],_.prototype,"splashMessage",2);N([y({type:Array,attribute:!1})],_.prototype,"notifications",2);N([y({type:String,attribute:!1})],_.prototype,"frontendStatus",2);N([y({type:String,attribute:!1})],_.prototype,"javaStatus",2);N([T()],_.prototype,"tabs",2);N([T()],_.prototype,"activeTab",2);N([T()],_.prototype,"serverInfo",2);N([T()],_.prototype,"features",2);N([T()],_.prototype,"unreadErrors",2);N([tt(".window")],_.prototype,"root",2);N([tt("vaadin-dev-tools-component-picker")],_.prototype,"componentPicker",2);N([T()],_.prototype,"componentPickActive",2);N([T()],_.prototype,"themeEditorState",2);let Wa=_;customElements.get("vaadin-dev-tools")===void 0&&customElements.define("vaadin-dev-tools",Wa);const{toString:Ga}=Object.prototype;function Ka(o){return Ga.call(o)==="[object RegExp]"}function Ya(o,{preserve:e=!0,whitespace:t=!0,all:n}={}){if(n)throw new Error("The `all` option is no longer supported. Use the `preserve` option instead.");let i=e,s;typeof e=="function"?(i=!1,s=e):Ka(e)&&(i=!1,s=c=>e.test(c));let r=!1,l="",a="",d="";for(let c=0;c<o.length;c++){if(l=o[c],o[c-1]!=="\\"&&(l==='"'||l==="'")&&(r===l?r=!1:r||(r=l)),!r&&l==="/"&&o[c+1]==="*"){const m=o[c+2]==="!";let h=c+2;for(;h<o.length;h++){if(o[h]==="*"&&o[h+1]==="/"){i&&m||s&&s(a)?d+=`/*${a}*/`:t||(o[h+2]===`
`?h++:o[h+2]+o[h+3]===`\r
`&&(h+=2)),a="";break}a+=o[h]}c=h+1;continue}d+=l}return d}const Ja=CSSStyleSheet.toString().includes("document.createElement"),Xa=(o,e)=>{const t=/(?:@media\s(.+?))?(?:\s{)?\@import\s*(?:url\(\s*['"]?(.+?)['"]?\s*\)|(["'])((?:\\.|[^\\])*?)\3)([^;]*);(?:})?/g;/\/\*(.|[\r\n])*?\*\//gm.exec(o)!=null&&(o=Ya(o));for(var n,i=o;(n=t.exec(o))!==null;){i=i.replace(n[0],"");const s=document.createElement("link");s.rel="stylesheet",s.href=n[2]||n[4];const r=n[1]||n[5];r&&(s.media=r),e===document?document.head.appendChild(s):e.appendChild(s)}return i},Qa=(o,e,t)=>(t?e.adoptedStyleSheets=[o,...e.adoptedStyleSheets]:e.adoptedStyleSheets=[...e.adoptedStyleSheets,o],()=>{e.adoptedStyleSheets=e.adoptedStyleSheets.filter(n=>n!==o)}),Za=(o,e,t)=>{const n=new CSSStyleSheet;return n.replaceSync(o),Ja?Qa(n,e,t):(t?e.adoptedStyleSheets.splice(0,0,n):e.adoptedStyleSheets.push(n),()=>{e.adoptedStyleSheets.splice(e.adoptedStyleSheets.indexOf(n),1)})},el=(o,e)=>{const t=document.createElement("style");t.type="text/css",t.textContent=o;let n;if(e){const s=Array.from(document.head.childNodes).filter(r=>r.nodeType===Node.COMMENT_NODE).find(r=>r.data.trim()===e);s&&(n=s)}return document.head.insertBefore(t,n),()=>{t.remove()}},Kn=(o,e,t,n)=>{if(t===document){const s=tl(o);if(window.Vaadin.theme.injectedGlobalCss.indexOf(s)!==-1)return;window.Vaadin.theme.injectedGlobalCss.push(s)}const i=Xa(o,t);return t===document?el(i,e):Za(i,t,n)};window.Vaadin=window.Vaadin||{};window.Vaadin.theme=window.Vaadin.theme||{};window.Vaadin.theme.injectedGlobalCss=[];function Yn(o){let e,t,n=2166136261;for(e=0,t=o.length;e<t;e++)n^=o.charCodeAt(e),n+=(n<<1)+(n<<4)+(n<<7)+(n<<8)+(n<<24);return("0000000"+(n>>>0).toString(16)).substr(-8)}function tl(o){let e=Yn(o);return e+Yn(e+o)}document["_vaadintheme_my-theme_componentCss"]||(document["_vaadintheme_my-theme_componentCss"]=!0);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class ol extends HTMLElement{static get version(){return"24.1.11"}}customElements.define("vaadin-lumo-styles",ol);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const nl=o=>class extends o{static get properties(){return{_theme:{type:String,readOnly:!0}}}static get observedAttributes(){return[...super.observedAttributes,"theme"]}attributeChangedCallback(t,n,i){super.attributeChangedCallback(t,n,i),t==="theme"&&this._set_theme(i)}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ni=[];function Pi(o){return o&&Object.prototype.hasOwnProperty.call(o,"__themes")}function il(o){return Pi(customElements.get(o))}function sl(o=[]){return[o].flat(1/0).filter(e=>e instanceof Io?!0:(console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."),!1))}function Ai(o,e,t={}){o&&il(o)&&console.warn(`The custom element definition for "${o}"
      was finalized before a style module was registered.
      Make sure to add component specific style modules before
      importing the corresponding custom element.`),e=sl(e),window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.registerStyles(o,e,t):Ni.push({themeFor:o,styles:e,include:t.include,moduleId:t.moduleId})}function To(){return window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.getAllThemes():Ni}function rl(o,e){return(o||"").split(" ").some(t=>new RegExp(`^${t.split("*").join(".*")}$`,"u").test(e))}function al(o=""){let e=0;return o.startsWith("lumo-")||o.startsWith("material-")?e=1:o.startsWith("vaadin-")&&(e=2),e}function Ii(o){const e=[];return o.include&&[].concat(o.include).forEach(t=>{const n=To().find(i=>i.moduleId===t);n?e.push(...Ii(n),...n.styles):console.warn(`Included moduleId ${t} not found in style registry`)},o.styles),e}function ll(o,e){const t=document.createElement("style");t.innerHTML=o.map(n=>n.cssText).join(`
`),e.content.appendChild(t)}function dl(o){const e=`${o}-default-theme`,t=To().filter(n=>n.moduleId!==e&&rl(n.themeFor,o)).map(n=>({...n,styles:[...Ii(n),...n.styles],includePriority:al(n.moduleId)})).sort((n,i)=>i.includePriority-n.includePriority);return t.length>0?t:To().filter(n=>n.moduleId===e)}const yl=o=>class extends nl(o){static finalize(){if(super.finalize(),this.elementStyles)return;const t=this.prototype._template;!t||Pi(this)||ll(this.getStylesForThis(),t)}static finalizeStyles(t){const n=this.getStylesForThis();return t?[...super.finalizeStyles(t),...n]:n}static getStylesForThis(){const t=Object.getPrototypeOf(this.prototype),n=(t?t.constructor.__themes:[])||[];this.__themes=[...n,...dl(this.is)];const i=this.__themes.flatMap(s=>s.styles);return i.filter((s,r)=>r===i.lastIndexOf(s))}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const cl=(o,...e)=>{const t=document.createElement("style");t.id=o,t.textContent=e.map(n=>n.toString()).join(`
`).replace(":host","html"),document.head.insertAdjacentElement("afterbegin",t)},Dt=(o,...e)=>{cl(`lumo-${o}`,e)};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const hl=E`
  :host {
    /* Base (background) */
    --lumo-base-color: #fff;

    /* Tint */
    --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);
    --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);
    --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);
    --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);
    --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);
    --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);
    --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);
    --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);
    --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);
    --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);
    --lumo-tint: #fff;

    /* Shade */
    --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);
    --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);
    --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);
    --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);
    --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);
    --lumo-shade-50pct: hsla(214, 45%, 20%, 0.52);
    --lumo-shade-60pct: hsla(214, 43%, 19%, 0.6);
    --lumo-shade-70pct: hsla(214, 42%, 18%, 0.69);
    --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);
    --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);
    --lumo-shade: hsl(214, 35%, 15%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-shade-5pct);
    --lumo-contrast-10pct: var(--lumo-shade-10pct);
    --lumo-contrast-20pct: var(--lumo-shade-20pct);
    --lumo-contrast-30pct: var(--lumo-shade-30pct);
    --lumo-contrast-40pct: var(--lumo-shade-40pct);
    --lumo-contrast-50pct: var(--lumo-shade-50pct);
    --lumo-contrast-60pct: var(--lumo-shade-60pct);
    --lumo-contrast-70pct: var(--lumo-shade-70pct);
    --lumo-contrast-80pct: var(--lumo-shade-80pct);
    --lumo-contrast-90pct: var(--lumo-shade-90pct);
    --lumo-contrast: var(--lumo-shade);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 100%, 48%);
    --lumo-primary-color-50pct: hsla(214, 100%, 49%, 0.76);
    --lumo-primary-color-10pct: hsla(214, 100%, 60%, 0.13);
    --lumo-primary-text-color: hsl(214, 100%, 43%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 85%, 48%);
    --lumo-error-color-50pct: hsla(3, 85%, 49%, 0.5);
    --lumo-error-color-10pct: hsla(3, 85%, 49%, 0.1);
    --lumo-error-text-color: hsl(3, 89%, 42%);
    --lumo-error-contrast-color: #fff;

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 72%, 31%, 0.5);
    --lumo-success-color-10pct: hsla(145, 72%, 31%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 25%);
    --lumo-success-contrast-color: #fff;

    /* Warning */
    --lumo-warning-color: hsl(48, 100%, 50%);
    --lumo-warning-color-10pct: hsla(48, 100%, 50%, 0.25);
    --lumo-warning-text-color: hsl(32, 100%, 30%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  /* forced-colors mode adjustments */
  @media (forced-colors: active) {
    html {
      --lumo-disabled-text-color: GrayText;
    }
  }
`;Dt("color-props",hl);const Ho=E`
  [theme~='dark'] {
    /* Base (background) */
    --lumo-base-color: hsl(214, 35%, 21%);

    /* Tint */
    --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);
    --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);
    --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);
    --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);
    --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);
    --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);
    --lumo-tint-60pct: hsla(214, 82%, 90%, 0.58);
    --lumo-tint-70pct: hsla(214, 87%, 92%, 0.69);
    --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);
    --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);
    --lumo-tint: hsl(214, 100%, 98%);

    /* Shade */
    --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);
    --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);
    --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);
    --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);
    --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);
    --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);
    --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);
    --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);
    --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);
    --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);
    --lumo-shade: hsl(214, 33%, 13%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-tint-5pct);
    --lumo-contrast-10pct: var(--lumo-tint-10pct);
    --lumo-contrast-20pct: var(--lumo-tint-20pct);
    --lumo-contrast-30pct: var(--lumo-tint-30pct);
    --lumo-contrast-40pct: var(--lumo-tint-40pct);
    --lumo-contrast-50pct: var(--lumo-tint-50pct);
    --lumo-contrast-60pct: var(--lumo-tint-60pct);
    --lumo-contrast-70pct: var(--lumo-tint-70pct);
    --lumo-contrast-80pct: var(--lumo-tint-80pct);
    --lumo-contrast-90pct: var(--lumo-tint-90pct);
    --lumo-contrast: var(--lumo-tint);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 90%, 48%);
    --lumo-primary-color-50pct: hsla(214, 90%, 70%, 0.69);
    --lumo-primary-color-10pct: hsla(214, 90%, 55%, 0.13);
    --lumo-primary-text-color: hsl(214, 90%, 77%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 79%, 49%);
    --lumo-error-color-50pct: hsla(3, 75%, 62%, 0.5);
    --lumo-error-color-10pct: hsla(3, 75%, 62%, 0.14);
    --lumo-error-text-color: hsl(3, 100%, 80%);

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 92%, 51%, 0.5);
    --lumo-success-color-10pct: hsla(145, 92%, 51%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 46%);

    /* Warning */
    --lumo-warning-color: hsl(43, 100%, 48%);
    --lumo-warning-color-10pct: hsla(40, 100%, 50%, 0.2);
    --lumo-warning-text-color: hsl(45, 100%, 60%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  html {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: light;
  }

  [theme~='dark'] {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: dark;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--lumo-header-text-color);
  }

  a:where(:any-link) {
    color: var(--lumo-primary-text-color);
  }

  a:not(:any-link) {
    color: var(--lumo-disabled-text-color);
  }

  blockquote {
    color: var(--lumo-secondary-text-color);
  }

  code,
  pre {
    background-color: var(--lumo-contrast-10pct);
    border-radius: var(--lumo-border-radius-m);
  }
`;Ai("",Ho,{moduleId:"lumo-color"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */Dt("color",Ho);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ul=E`
  :host {
    /* prettier-ignore */
    --lumo-font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

    /* Font sizes */
    --lumo-font-size-xxs: 0.75rem;
    --lumo-font-size-xs: 0.8125rem;
    --lumo-font-size-s: 0.875rem;
    --lumo-font-size-m: 1rem;
    --lumo-font-size-l: 1.125rem;
    --lumo-font-size-xl: 1.375rem;
    --lumo-font-size-xxl: 1.75rem;
    --lumo-font-size-xxxl: 2.5rem;

    /* Line heights */
    --lumo-line-height-xs: 1.25;
    --lumo-line-height-s: 1.375;
    --lumo-line-height-m: 1.625;
  }
`,qo=E`
  body,
  :host {
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    line-height: var(--lumo-line-height-m);
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  small,
  [theme~='font-size-s'] {
    font-size: var(--lumo-font-size-s);
    line-height: var(--lumo-line-height-s);
  }

  [theme~='font-size-xs'] {
    font-size: var(--lumo-font-size-xs);
    line-height: var(--lumo-line-height-xs);
  }

  :where(h1, h2, h3, h4, h5, h6) {
    font-weight: 600;
    line-height: var(--lumo-line-height-xs);
    margin-block: 0;
  }

  :where(h1) {
    font-size: var(--lumo-font-size-xxxl);
  }

  :where(h2) {
    font-size: var(--lumo-font-size-xxl);
  }

  :where(h3) {
    font-size: var(--lumo-font-size-xl);
  }

  :where(h4) {
    font-size: var(--lumo-font-size-l);
  }

  :where(h5) {
    font-size: var(--lumo-font-size-m);
  }

  :where(h6) {
    font-size: var(--lumo-font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  p,
  blockquote {
    margin-top: 0.5em;
    margin-bottom: 0.75em;
  }

  a {
    text-decoration: none;
  }

  a:where(:any-link):hover {
    text-decoration: underline;
  }

  hr {
    display: block;
    align-self: stretch;
    height: 1px;
    border: 0;
    padding: 0;
    margin: var(--lumo-space-s) calc(var(--lumo-border-radius-m) / 2);
    background-color: var(--lumo-contrast-10pct);
  }

  blockquote {
    border-left: 2px solid var(--lumo-contrast-30pct);
  }

  b,
  strong {
    font-weight: 600;
  }

  /* RTL specific styles */
  blockquote[dir='rtl'] {
    border-left: none;
    border-right: 2px solid var(--lumo-contrast-30pct);
  }
`;Ai("",qo,{moduleId:"lumo-typography"});Dt("typography-props",ul);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const pl=E`
  ${li(qo.cssText.replace(/,\s*:host/su,""))}
`;Dt("typography",pl,!1);const ml=o=>{const e=[];o!==document&&(e.push(Kn(Ho.cssText,"",o,!0)),e.push(Kn(qo.cssText,"",o,!0)))},fl=ml;fl(document);export{sr as D,je as F,A as L,nr as P,yl as T,Ne as U,x as _,Dt as a,be as b,E as c,ir as d,Ai as e,nl as f,Ho as g,v as h,qo as i,Kn as j,J as k,Sr as l,xr as m,k as n,Ae as r,Te as s,Ni as t,li as u,P as y};
