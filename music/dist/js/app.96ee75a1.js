(function(e){function t(t){for(var r,o,u=t[0],i=t[1],s=t[2],f=0,l=[];f<u.length;f++)o=u[f],Object.prototype.hasOwnProperty.call(c,o)&&c[o]&&l.push(c[o][0]),c[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);d&&d(t);while(l.length)l.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,o=1;o<n.length;o++){var u=n[o];0!==c[u]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},c={app:0},a=[];function u(e){return i.p+"js/"+({about:"about"}[e]||e)+"."+{about:"91d5549e","chunk-23f6ebe4":"61dbe6a6","chunk-3d48fd4c":"4f3ac501","chunk-71c46988":"4b3988dd","chunk-7a0b059c":"3052eda7","chunk-43c1cef2":"c0556347","chunk-7d7be873":"50ad4607","chunk-2cb62c6a":"a300283e","chunk-26e3c658":"20320cd1"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={about:1,"chunk-3d48fd4c":1,"chunk-7a0b059c":1,"chunk-43c1cef2":1,"chunk-7d7be873":1,"chunk-2cb62c6a":1,"chunk-26e3c658":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({about:"about"}[e]||e)+"."+{about:"2a4c2ee0","chunk-23f6ebe4":"31d6cfe0","chunk-3d48fd4c":"d3333b48","chunk-71c46988":"31d6cfe0","chunk-7a0b059c":"1d45df94","chunk-43c1cef2":"4863f0f5","chunk-7d7be873":"6d3af846","chunk-2cb62c6a":"e6e8aa2f","chunk-26e3c658":"31987c38"}[e]+".css",c=i.p+r,a=document.getElementsByTagName("link"),u=0;u<a.length;u++){var s=a[u],f=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(f===r||f===c))return t()}var l=document.getElementsByTagName("style");for(u=0;u<l.length;u++){s=l[u],f=s.getAttribute("data-href");if(f===r||f===c)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||c,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=r,delete o[e],d.parentNode.removeChild(d),n(a)},d.href=c;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[e]=0})));var r=c[e];if(0!==r)if(r)t.push(r[2]);else{var a=new Promise((function(t,n){r=c[e]=[t,n]}));t.push(r[2]=a);var s,f=document.createElement("script");f.charset="utf-8",f.timeout=120,i.nc&&f.setAttribute("nonce",i.nc),f.src=u(e);var l=new Error;s=function(t){f.onerror=f.onload=null,clearTimeout(d);var n=c[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",l.name="ChunkLoadError",l.type=r,l.request=o,n[1](l)}c[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:f})}),12e4);f.onerror=f.onload=s,document.head.appendChild(f)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/musci/music/dist/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],f=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var d=f;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},c=[],a={},u=a,i=(n("5c0b"),n("2877")),s=Object(i["a"])(u,o,c,!1,null,null,null),f=s.exports,l=(n("d3b7"),n("8c4f"));r["a"].use(l["a"]);var d=[{path:"/",name:"index",component:function(){return n.e("about").then(n.bind(null,"0cab"))},redirect:"/hot",children:[{path:"/hot",name:"hot",component:function(){return n.e("chunk-3d48fd4c").then(n.bind(null,"66b3"))}},{path:"/singer",name:"singer",component:function(){return n.e("chunk-7a0b059c").then(n.bind(null,"dd0e"))}},{path:"/sort",name:"sort",component:function(){return n.e("chunk-23f6ebe4").then(n.bind(null,"7fce"))}},{path:"/search",name:"search",component:function(){return n.e("chunk-71c46988").then(n.bind(null,"2d90"))}}]}],p=new l["a"]({routes:d}),h=p,b=n("2f62");r["a"].use(b["a"]);var g=new b["a"].Store({state:{swiperList:[],singerCategory:{},singerList:[],searchCode:"",playList:localStorage.getItem("playList")?JSON.parse(localStorage.getItem("playList")):[],nowPlayIndex:""},mutations:{getSwiper:function(e,t){e.swiperList=t},getSingerList:function(e,t){r["a"].set(e,"singerList",t)},getSearchCode:function(e,t){e.searchCode=t},getPlayList:function(e,t){r["a"].set(e,"playList",t)},getIndex:function(e,t){e.nowPlayIndex=t},playList:function(e){localStorage.getItem("playList")&&(e.playList=JSON.parse(localStorage.getItem("playList")))}},actions:{},modules:{},getters:{singer:function(e){return e.singerList},List:function(e){return e.playList}}}),m=(n("b059"),n("7d05"),n("bc3a")),v=n.n(m),y=v.a.create({baseURL:"http://111.229.20.115:5859"}),k=y,w=(n("99af"),n("c975"),n("f2e8")),L=n.n(w);function S(e,t,n){return e+=(e.indexOf("?")<0?"?":"&")+O(t),new Promise((function(t,r){L()(e,n,(function(e,n){e?r(e):t(n)}))}))}function O(e){var t="";for(var n in e){var r=void 0!==e[n]?e[n]:"";t+="&".concat(n,"=").concat(encodeURIComponent(r))}return t?t.substring(1):""}r["a"].config.productionTip=!1,r["a"].prototype.$http=k,r["a"].prototype.$jsonp=S,new r["a"]({router:h,store:g,render:function(e){return e(f)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("9c0c"),o=n.n(r);o.a},"7d05":function(e,t,n){},"9c0c":function(e,t,n){},b059:function(e,t,n){}});
//# sourceMappingURL=app.96ee75a1.js.map