(this["webpackJsonpreact-test"]=this["webpackJsonpreact-test"]||[]).push([[0],{119:function(e,t){},157:function(e,t,n){e.exports=n(175)},162:function(e,t,n){},165:function(e,t,n){},168:function(e,t){},175:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),r=n(37),l=n.n(r),i=(n(162),n(98)),c=n(223),s=n(224),u=n(120),m=(n(165),n(214)),p=n(220),d=n(221),f=n(222),E=n(139),v=n.n(E),b=n(216),h=n(228),g=n(229),j=n(225),w={longitude:135.497009,latitude:34.669529,zoom:8,pitch:45,bearing:0},y=Object(m.a)({list:{width:200},root:{flexGrow:1},menuButton:{marginLeft:-12,marginRight:0},totalDiv:{marginLeft:"auto"},fontSize_small:{fontSize:"12px"}});var O=function(){var e=Object(a.useState)(null),t=Object(i.a)(e,2),n=t[0],r=t[1],l=Object(a.useState)(!1),m=Object(i.a)(l,2),E=m[0],O=m[1],S=Object(a.useState)(void 0),k=Object(i.a)(S,2),x=k[0],I=k[1],z=Object(a.useState)(null),C=Object(i.a)(z,2),M=C[0],N=C[1],G=function(e,t){return function(){O(t)}},W=y(),B=o.a.createElement("div",{className:W.list},o.a.createElement(b.a,null,o.a.createElement(h.a,{button:!0},o.a.createElement(g.a,{primary:"Home"})),o.a.createElement(h.a,{button:!0},o.a.createElement(g.a,{primary:"About"}))));function D(e){var t={type:"FeatureCollection",features:[]};return e.forEach((function(e){var n={id:e.id,type:"Feature",geometry:{type:"Point",coordinates:[e.lng,e.lat]},properties:{id:e.id,name:e.name_ja,lat:e.lat,lng:e.lng,cases:e.cases,deaths:e.deaths}};t.features.push(n)})),console.log("retJson",t),t}return Object(a.useEffect)((function(){fetch("https://covid19-japan-web-api.now.sh/api/v1/prefectures").then((function(e){return e.json()})).then((function(e){console.log("result",e);var t=new s.a({id:"Point_layer",data:D(e),getRadius:function(e){return 4e3},getFillColor:function(e){return[245,36,36,150]},pickable:!0,onHover:function(e){return I(e.object)}});N(t),fetch("https://covid19-japan-web-api.now.sh/api/v1/total").then((function(e){return e.json()})).then((function(e){r(e),console.log("TotalInfo result",e)}),(function(e){console.log(e)}))}),(function(e){console.log(e)}))}),[]),o.a.createElement(o.a.Fragment,null,o.a.createElement(c.a,{initialViewState:w,controller:!0,layers:M},o.a.createElement("div",{className:W.root},o.a.createElement(p.a,{position:"relative",color:"inherit"},o.a.createElement(d.a,null,o.a.createElement(f.a,{className:W.menuButton,color:"inherit","aria-label":"Menu",onClick:G(0,!0)},o.a.createElement(v.a,null)),o.a.createElement(j.a,{open:E,onClose:G(0,!1)},o.a.createElement("div",{tabIndex:0,role:"button",onClick:G(0,!1),onKeyDown:G(0,!1)},B)),"COVID-19 Map",o.a.createElement("div",{className:W.totalDiv},function(){if(null!==n)return o.a.createElement("div",{className:W.fontSize_small},o.a.createElement("div",null,"\u6700\u7d42\u66f4\u65b0\u65e5: ",function(e){if(null!==e){var t=String(e);return t.substr(0,4)+"/"+t.substr(4,2)+"/"+t.substr(6,2)}}(n.date)),o.a.createElement("div",null,"\u967d\u6027\u60a3\u8005\u6570: ",n.positive,"\u4eba"))}())))),o.a.createElement(u.b,{mapStyle:"mapbox://styles/mapbox/streets-v11",mapboxApiAccessToken:"pk.eyJ1IjoieXVzdWtlZWVlZWU1NSIsImEiOiJjazhudGpiczgxMmN5M2dxb3FyMTBvZGUwIn0.4rGM-WGp5mEoCdGQDHEYLA"},function(){if(console.log("hoveredObject",x),void 0!==x)return o.a.createElement(u.a,{longitude:x.geometry.coordinates[0],latitude:x.geometry.coordinates[1]},o.a.createElement("div",null,o.a.createElement("p",null,"id: ",x.properties.id),o.a.createElement("p",null,"\u5834\u6240: ",x.properties.name),o.a.createElement("p",null,"\u611f\u67d3\u6570: ",x.properties.cases,"\u4eba"),o.a.createElement("p",null,"\u6b7b\u8005\u6570: ",x.properties.deaths,"\u4eba")))}())))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[157,1,2]]]);
//# sourceMappingURL=main.c88b234b.chunk.js.map