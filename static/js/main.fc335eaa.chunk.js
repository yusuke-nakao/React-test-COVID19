(this["webpackJsonpreact-test"]=this["webpackJsonpreact-test"]||[]).push([[0],{52:function(e,t,n){e.exports=n(66)},57:function(e,t,n){},61:function(e,t,n){},66:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),i=n(11),r=n.n(i),c=(n(57),n(37)),l=n(31),s=n(18),u=(n(61),n(95)),d=n(99),p=n(100),f=n(101),m=n(47),g=n.n(m),h=n(98),v=n(103),b=n(104),E=n(102);n(68),n(105),Object(u.a)((function(e){return{root:{height:"auto"},wrapper:{width:300+e.spacing(2)},paper:{zIndex:1,position:"relative",margin:e.spacing(1)},svg:{width:100,height:100},polygon:{fill:e.palette.common.white,stroke:e.palette.divider,strokeWidth:1}}}));var w={id:"clusters",type:"circle",source:"earthquakes",filter:["has","point_count"],paint:{"circle-color":["step",["get","point_count"],"#51bbd6",100,"#f1f075",750,"#f28cb1"],"circle-radius":["step",["get","point_count"],20,100,30,750,40]}},y={id:"cluster-count",type:"symbol",source:"earthquakes",filter:["has","point_count"],layout:{"text-field":"{point_count_abbreviated}","text-font":["DIN Offc Pro Medium","Arial Unicode MS Bold"],"text-size":12}},j={id:"unclustered-point",type:"circle",source:"earthquakes",filter:["!",["has","point_count"]],paint:{"circle-color":"#11b4da","circle-radius":4,"circle-stroke-width":1,"circle-stroke-color":"#fff"}},O={position:"absolute",top:0,left:0,margin:10},k={position:"absolute",top:0,left:0,padding:"10px"},x={position:"absolute",top:36,left:0,padding:"10px"},S={position:"absolute",bottom:36,left:0,padding:"10px"},C={width:"100%",height:900,longitude:139.7212733,latitude:35.6606213,zoom:7,pitch:0},I=Object(u.a)({list:{width:200},root:{flexGrow:1},menuButton:{marginLeft:-12,marginRight:0},totalDiv:{marginLeft:"auto"},fontSize_small:{fontSize:"12px"}});var A=function(){var e=Object(o.useState)(null),t=Object(l.a)(e,2),n=t[0],i=t[1],r=Object(o.useState)(!1),u=Object(l.a)(r,2),m=u[0],A=u[1],W=Object(o.useState)(null),z=Object(l.a)(W,2),D=z[0],N=z[1],M=Object(o.useState)(C),_=Object(l.a)(M,2),R=_[0],V=_[1],B=Object(o.useState)(null),L=Object(l.a)(B,2),U=(L[0],L[1],function(e,t){return function(){A(t)}}),G=I(),q=a.a.createElement("div",{className:G.list},a.a.createElement(h.a,null,a.a.createElement(v.a,{button:!0},a.a.createElement(b.a,{primary:"Home"})),a.a.createElement(v.a,{button:!0},a.a.createElement(b.a,{primary:"About"}))));Object(o.useEffect)((function(){fetch("https://services6.arcgis.com/5jNaHNYe2AnnqRnS/arcgis/rest/services/COVID19_JapanCaseData/FeatureServer/0/query?where=%E9%80%9A%E3%81%97%3E-1&returnIdsOnly=false&returnCountOnly=false&&f=pgeojson&outFields=*&orderByFields=%E9%80%9A%E3%81%97").then((function(e){return e.json()})).then((function(e){console.log("result",e),N(e),fetch("https://covid19-japan-web-api.now.sh/api/v1/total").then((function(e){return e.json()})).then((function(e){i(e),console.log("TotalInfo result",e)}),(function(e){console.log(e)}))}),(function(e){console.log(e)}))}),[]);var F=function(e){return V(Object(c.a)({},e))},J=a.a.createRef();return a.a.createElement("div",{className:G.root},a.a.createElement(d.a,{position:"relative",color:"inherit"},a.a.createElement(p.a,null,a.a.createElement(f.a,{className:G.menuButton,color:"inherit","aria-label":"Menu",onClick:U(0,!0)},a.a.createElement(g.a,null)),a.a.createElement(E.a,{open:m,onClose:U(0,!1)},a.a.createElement("div",{tabIndex:0,role:"button",onClick:U(0,!1),onKeyDown:U(0,!1)},q)),"COVID-19 Map",a.a.createElement("div",{className:G.totalDiv},function(){if(null!==n){var e=new Date;return a.a.createElement("div",{className:G.fontSize_small},a.a.createElement("div",null,"\u6700\u7d42\u66f4\u65b0\u65e5: ",e.getFullYear()+"/"+(e.getMonth()+1)+"/"+e.getDate()),a.a.createElement("div",null,"\u967d\u6027\u60a3\u8005\u6570: ",D.features.length,"\u4eba"))}}()))),a.a.createElement("div",{style:{textAlign:"center",fontSize:"25px",fontWeight:"bolder"}}),a.a.createElement(s.h,Object.assign({},R,{mapboxApiAccessToken:"pk.eyJ1IjoieXVzdWtlZWVlZWU1NSIsImEiOiJjazhudGpiczgxMmN5M2dxb3FyMTBvZGUwIn0.4rGM-WGp5mEoCdGQDHEYLA",mapStyle:"mapbox://styles/mapbox/streets-v11?optimize = true",interactiveLayerIds:[w.id],onViewportChange:F,onClick:function(e){try{var t=e.features[0],n=t.properties.cluster_id;console.log("clusterId",n),J.current.getSource().getClusterExpansionZoom(n,(function(e,n){e||F(Object(c.a)({},R,{longitude:t.geometry.coordinates[0],latitude:t.geometry.coordinates[1],zoom:n,transitionDuration:500}))}))}catch(o){return void console.log("e = ",o.message)}}}),a.a.createElement(s.g,{type:"geojson",data:D,cluster:!0,clusterMaxZoom:18,clusterRadius:50,ref:J},a.a.createElement(s.c,w),a.a.createElement(s.c,y),a.a.createElement(s.c,j)),a.a.createElement("div",{style:k},a.a.createElement(s.a,null)),a.a.createElement("div",{style:x},a.a.createElement(s.d,null)),a.a.createElement("div",{style:S},a.a.createElement(s.f,null)),a.a.createElement(s.b,{onViewportChange:function(e){e.zoom=18,V(Object(c.a)({},e))},style:O,positionOptions:{enableHighAccuracy:!0},trackUserLocation:!0})))},W=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function z(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}r.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(A,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/React-test-COVID19",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/React-test-COVID19","/service-worker.js");W?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var o=n.headers.get("content-type");404===n.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):z(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):z(t,e)}))}}()}},[[52,1,2]]]);
//# sourceMappingURL=main.fc335eaa.chunk.js.map