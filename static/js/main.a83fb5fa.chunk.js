(this["webpackJsonpreact-test"]=this["webpackJsonpreact-test"]||[]).push([[0],{31:function(e,t,n){},63:function(e,t,n){e.exports=n(76)},68:function(e,t,n){},76:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(11),l=n.n(r),c=(n(68),n(31),n(29)),i=n(26);var s=function(){return o.a.createElement("h1",null,"Login")},u=n(35),m=n(107),f=n(111),d=n(112),p=n(113),E=n(59),g=n.n(E),h=n(109),v=n(116),b=n(115),w=n(46),y=n(23),O={id:"clusters",type:"circle",source:"earthquakes",filter:["has","point_count"],paint:{"circle-color":["step",["get","point_count"],"#51bbd6",100,"#f1f075",750,"#f28cb1"],"circle-radius":["step",["get","point_count"],20,100,30,750,40]}},j={id:"cluster-count",type:"symbol",source:"earthquakes",filter:["has","point_count"],layout:{"text-field":"{point_count_abbreviated}","text-font":["DIN Offc Pro Medium","Arial Unicode MS Bold"],"text-size":12}},x={id:"unclustered-point",type:"circle",source:"earthquakes",filter:["!",["has","point_count"]],paint:{"circle-color":"#11b4da","circle-radius":4,"circle-stroke-width":1,"circle-stroke-color":"#fff"}},S={position:"absolute",top:0,left:0,margin:10},k={position:"absolute",top:0,left:0,padding:"10px"},C={position:"absolute",top:36,left:0,padding:"10px"},A={position:"absolute",bottom:36,left:0,padding:"10px"},D={width:"100%",height:900,longitude:139.7212733,latitude:35.6606213,zoom:7,bearing:0,pitch:0},I=Object(m.a)({list:{width:200},root:{flexGrow:1},menuButton:{marginLeft:-12,marginRight:0},totalDiv:{marginLeft:"auto"},fontSize_small:{fontSize:"12px"}});var z=function(){var e=Object(a.useState)(null),t=Object(u.a)(e,2),n=t[0],r=t[1],l=Object(a.useState)(null),c=Object(u.a)(l,2),i=c[0],s=c[1],m=Object(a.useContext)(N).headerInfo,f=I();Object(a.useEffect)((function(){fetch("https://services6.arcgis.com/5jNaHNYe2AnnqRnS/arcgis/rest/services/COVID19_JapanCaseData/FeatureServer/0/query?where=%E9%80%9A%E3%81%97%3E-1&returnIdsOnly=false&returnCountOnly=false&&f=pgeojson&outFields=*&orderByFields=%E9%80%9A%E3%81%97").then((function(e){return e.json()})).then((function(e){console.log("result",e),r(e),m(e)}),(function(e){console.log("fetch\u30a8\u30e9\u30fc",e)}))}),[]);var d=function(e){return s(Object(w.a)({},e))},p=o.a.createRef();return o.a.createElement("div",{className:f.root},o.a.createElement("div",{style:{textAlign:"center",fontSize:"25px",fontWeight:"bolder"}}),o.a.createElement(y.g,Object.assign({onLoad:function(e){console.log("map\u30ed\u30fc\u30c9",e.type),s(D)}},i,{mapboxApiAccessToken:"pk.eyJ1IjoieXVzdWtlZWVlZWU1NSIsImEiOiJjazhudGpiczgxMmN5M2dxb3FyMTBvZGUwIn0.4rGM-WGp5mEoCdGQDHEYLA",mapStyle:"mapbox://styles/mapbox/streets-v11?optimize = true",interactiveLayerIds:[O.id],onViewportChange:d,onClick:function(e){try{var t=e.features[0];console.log("feature",t);var n=t.properties.cluster_id;console.log("clusterId",n),p.current.getSource().getClusterExpansionZoom(n,(function(e,n){e||d(Object(w.a)({},i,{longitude:t.geometry.coordinates[0],latitude:t.geometry.coordinates[1],zoom:n,transitionDuration:500}))}))}catch(a){return void console.log("e = ",a.message)}}}),o.a.createElement(y.f,{type:"geojson",data:n,cluster:!0,clusterMaxZoom:18,clusterRadius:50,ref:p},o.a.createElement(y.c,O),o.a.createElement(y.c,j),o.a.createElement(y.c,x)),o.a.createElement("div",{style:k},o.a.createElement(y.a,null)),o.a.createElement("div",{style:C},o.a.createElement(y.d,null)),o.a.createElement("div",{style:A},o.a.createElement(y.e,null)),o.a.createElement(y.b,{onViewportChange:function(e){console.log("viewport",e),e.zoom=18,s(Object(w.a)({},e))},style:S,positionOptions:{enableHighAccuracy:!0},trackUserLocation:!0})))};var L=function(){return o.a.createElement("h1",null,"About")};var M=function(){return o.a.createElement("h1",null,"Service")},N=o.a.createContext(null),W=Object(m.a)({list:{width:200},root:{flexGrow:1},menuButton:{marginLeft:-12,marginRight:0},totalDiv:{marginLeft:"auto"},fontSize_small:{fontSize:"12px"}});var _=function(){var e=Object(a.useState)(!1),t=Object(u.a)(e,2),n=t[0],r=t[1],l=W(),s=Object(a.useState)(null),m=Object(u.a)(s,2),E=m[0],w=m[1],y=Object(a.useCallback)((function(e){w(e)}));Object(a.useEffect)((function(){}),[]);var O=o.a.createElement("div",{className:l.list},o.a.createElement(h.a,null,o.a.createElement(v.a,{button:!0},o.a.createElement(c.b,{to:"/Home"},"Home")),o.a.createElement(v.a,{button:!0},o.a.createElement(c.b,{to:"/About"},"About")),o.a.createElement(v.a,{button:!0},o.a.createElement(c.b,{to:"/Service"},"Service")))),j=function(e,t){return function(){r(t)}};return o.a.createElement(N.Provider,{value:{headerInfo:y}},o.a.createElement("div",{className:l.root},o.a.createElement(c.a,null,o.a.createElement(f.a,{position:"relative",color:"primary"},o.a.createElement(d.a,null,o.a.createElement(p.a,{className:l.menuButton,color:"inherit","aria-label":"Menu",onClick:j(0,!0)},o.a.createElement(g.a,null)),o.a.createElement(b.a,{open:n,onClose:j(0,!1)},o.a.createElement("div",{tabIndex:0,role:"button",onClick:j(0,!1),onKeyDown:j(0,!1)},O)),"COVID-19 Map",o.a.createElement("div",{className:l.totalDiv},function(e){if(console.log("test",e),void 0!==e&&null!==e){var t=e.features.map((function(e){return e.properties.\u78ba\u5b9a\u65e5YYYYMMDD})),n=Math.max.apply(null,t),a=new Date(n).toLocaleDateString();return o.a.createElement("div",{className:l.fontSize_small},o.a.createElement("div",null,"\u6700\u7d42\u66f4\u65b0\u65e5: ",a),o.a.createElement("div",null,"\u967d\u6027\u60a3\u8005\u6570: ",e.features.length,"\u4eba"))}}(E)))),o.a.createElement(i.c,null,o.a.createElement(i.a,{exact:!0,path:"/"},o.a.createElement(z,null)),o.a.createElement(i.a,{path:"/Home"},o.a.createElement(z,null)),o.a.createElement(i.a,{path:"/About"},o.a.createElement(L,null)),o.a.createElement(i.a,{path:"/Service"},o.a.createElement(M,null)),o.a.createElement(i.a,null)))))};var R=function(){return o.a.createElement(c.a,null,o.a.createElement(i.c,null,o.a.createElement(i.a,{exact:!0,path:"/Login"},o.a.createElement(s,null)),o.a.createElement(i.a,{path:"/"},o.a.createElement(_,null))))},B=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function V(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var G=n(114),U=n(60),H=n(45),Y=Object(U.a)({palette:{primary:{light:"#42a5f5",main:"#1976d2",dark:"#0d47a1"},secondary:H.a}});l.a.render(o.a.createElement(G.a,{theme:Y},o.a.createElement(o.a.StrictMode,null,o.a.createElement(R,null))),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/React-test-COVID19",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/React-test-COVID19","/service-worker.js");B?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):V(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):V(t,e)}))}}()}},[[63,1,2]]]);
//# sourceMappingURL=main.a83fb5fa.chunk.js.map