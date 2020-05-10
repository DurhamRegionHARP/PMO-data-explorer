"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var r=[],n=!0,a=!1,i=void 0;try{for(var s,o=e[Symbol.iterator]();!(n=(s=o.next()).done)&&(r.push(s.value),!t||r.length!==t);n=!0);}catch(e){a=!0,i=e}finally{try{n||null==o.return||o.return()}finally{if(a)throw i}}return r}}function _arrayWithHoles(e){if(Array.isArray(e))return e}!function(e,p){e.PMO=function(e){this.version="0.5.0",this.anchor=p.querySelector(".indicator-list"),this.name=e.pmoName,this.description=e.description,this.slug=e.pmoName.split(" ").join("-").toLowerCase(),this.chartData=e.estimates,this.chartsToBuild=Object.keys(e.estimates),this.container=function(){var e=p.createElement("article");return e.setAttribute("class","indicator-block indicator-".concat(this.slug)),e},this.notes=function(){if(e.trendTests)return{Notes:["Source: 2018-2019 Ontario Student Drug Use and Health Survey","Missing bars indicate an estimate is not releaseable due to small numbers"],"Trend analysis":e.trendTests,Feedback:'Your comments are welcome through our <a href="#">feedback form</a>'};return{Notes:["Source: 2018-2019 Ontario Student Drug Use and Health Survey","Missing bars indicate an estimate is not releaseable due to small numbers"],Feedback:'Your comments are welcome through our <a href="#">feedback form</a>'}},this.buildHeader=function(){var r=this,e=p.createElement("div"),t=p.createElement("h3"),n=p.createElement("p");e.setAttribute("class","indicator-header"),t.setAttribute("class","indicator-title"),n.setAttribute("class","indicator-desc"),n.insertAdjacentText("afterbegin",this.description),t.insertAdjacentText("afterbegin",this.name),e.appendChild(t),e.appendChild(n);var a=[];Object.keys(this.chartData).forEach(function(t){var e=p.createElement("button");e.setAttribute("class","byAll"==t?"btn btn-default active wb-toggle":"btn btn-default wb-toggle"),e.setAttribute("data-toggle",'{ "selector": "#'.concat(r.slug,"-").concat(t,'","group": ".chart-').concat(r.slug,'","type": "on"}')),e.insertAdjacentText("afterbegin",function(){var e="";switch(t){case"byAll":e="By Response Category";break;case"byGrade":e="By Grade";break;case"bySex":e="By Sex";break;case"byYear":e="By Year"}return e}()),a.push(e)});var i=p.createElement("div"),s=p.createElement("div"),o=p.createElement("a");o.insertAdjacentText("afterbegin","?");for(var c=0,l=Object.entries({class:"btn btn-sm btn-default overlay-lnk",href:"#options-hint","aria-controls":"options-hint",role:"button"});c<l.length;c++){var d=_slicedToArray(l[c],2),u=d[0],h=d[1];o.setAttribute(u,h)}return s.setAttribute("class","view-control"),i.setAttribute("class","view-mode-control btn-group-sm btn-group"),a.forEach(function(e,t){i.appendChild(e)}),s.appendChild(i),s.appendChild(o),e.appendChild(s),e},this.buildCharts=function(){var r=this,n=p.createElement("div");return n.setAttribute("class","indicator-chart"),Object.keys(this.chartData).forEach(function(e){var t=p.createElement("div");t.setAttribute("id","".concat(r.slug,"-").concat(e)),t.setAttribute("class","chart chart-".concat(r.slug)),"byAll"===e&&(t.className+=" on"),n.appendChild(t)}),n},this.buildNotes=function(){var e=p.createElement("div");e.setAttribute("class","indicator-footer");var t=p.createElement("div");t.setAttribute("class","wb-tabs");var o=p.createElement("div");return o.setAttribute("class","tabpanels"),Object.entries(this.notes()).forEach(function(e){var t=_slicedToArray(e,2),r=t[0],n=t[1],a=p.createElement("details");a.setAttribute("class","tab-".concat(r.toLowerCase()));var i,s=p.createElement("summary");s.insertAdjacentText("afterbegin",r),Array.isArray(n)?(a.appendChild(s),n.forEach(function(e){var t=p.createElement("p");t.insertAdjacentText("afterbegin",e),a.appendChild(t)})):((i=p.createElement("p")).insertAdjacentHTML("afterbegin",n),a.appendChild(s),a.appendChild(i)),o.appendChild(a)}),t.appendChild(o),e.appendChild(t),e},this.create=function(){var e=this.container();e.appendChild(this.buildHeader()),e.appendChild(this.buildCharts()),e.appendChild(this.buildNotes()),this.anchor.appendChild(e)}}}(window,document),function(c,a,s,l,i){var o=s.querySelector(".search-text"),e=s.querySelector(".index-container");function d(n){fetch("https://cdn.jsdelivr.net/gh/DurhamRegionHARP/PMO-data-explorer@gh-pages/_data/pmo1.json").then(function(e){if(e.ok)return e.json();var t=s.getElementById("snackbar-error");t.classList.add("show"),setTimeout(function(){t.classList.remove("show")},3e3)}).then(function(e){var t={qry:function(e){var t=new RegExp(n.value,"i");if(t.test(e.pmoName)||t.test(e.description)||t.test(e.tags.join(" ")))return e},cat:function(e){if(e.category.split(" ").join("-").toLowerCase()===n.value)return console.log(e),e},ind:function(e){if(e.pmoName.split(" ").join("-").toLowerCase()===n.value)return e}},r=e.indicators.filter(t[n.action]);"qry"===n.action&&function(e){var t=e.length,r=s.createElement("p"),n=t+" result"+(1===t?"":"s")+" found";0===t&&(n+='<p>Why not <a href="#">suggest</a> this topic be added?</p>');r.insertAdjacentHTML("afterbegin",n);var a=s.querySelector(".search-feedback");{var i;a?(a.removeChild(a.firstChild),a.appendChild(r),o.parentNode.appendChild(a)):((i=s.createElement("span")).setAttribute("class","search-feedback"),i.appendChild(r),o.parentNode.appendChild(i))}}(r),function(){var e=s.querySelector(".indicator-list");for(;e.firstChild;)e.removeChild(e.firstChild)}(),r.forEach(function(e){!function(e){var o=new i(e);{s.querySelector(".indicator-"+o.slug)||(o.create(),o.chartsToBuild.forEach(function(e){var t,r,n,a,i,s;t="#".concat(o.slug,"-").concat(e),r=o.chartData[e],n=r.series.map(function(e){return e.cl.map(function(e){return e[0]})}),a=r.series.map(function(e){return e.cl.map(function(e){return e[1]})}),i=r.series.map(function(e){return e.notes}),s={axisX:{showGrid:!1},axisY:{labelInterpolationFnc:function(e){return e+"%"},onlyInteger:!0},height:"250px",width:"1100px",high:100,low:0,showGridBackground:!0,seriesBarDistance:22,plugins:[l.plugins.errorBars({orientation:"vertical",confidenceLimit:{upper:n,lower:a}}),l.plugins.tooltip({tooltipFnc:function(e,t){var r="null"==e?"":"<br>".concat(e);return"".concat(t,"%").concat(r)}}),l.plugins.legend({className:"list-inline",clickable:!1}),l.plugins.ctAccessibility({caption:"OSDUHS Results",seriesHeader:"Analysis group",valueTransform:function(e){return e+"%"}})]},new l.Bar(t,r,s,[["screen and (max-width: 767px)",{width:"650px",seriesBarDistance:15,chartPadding:{right:25}}],["screen and (min-width: 768px)",{width:"680px",seriesBarDistance:22}],["screen and (min-width: 992px)",{seriesBarDistance:22,width:"900px"}],["screen and (min-width: 1200px)",{seriesBarDistance:22,width:"1100px"}]]).on("draw",function(e){"bar"===e.type&&e.element.attr({"ct:meta":this[e.seriesIndex][e.index]})}.bind(i)),c(".wb-toggle").trigger("wb-init.wb-toggle"),c(".wb-tabs").trigger("wb-init.wb-tabs")}),s.querySelector(".indicator-"+o.slug).addEventListener("click",function(e){var t;"BUTTON"===e.target.tagName&&((t=e.target.parentNode).hasChildNodes()&&t.childNodes.forEach(function(e){e.classList.remove("active")}),e.target.classList.add("active"))}))}}(e)})}).catch(function(e){var t=s.getElementById("snackbar-error");t.classList.add("show"),setTimeout(function(){t.classList.remove("show")},3e3)})}function u(){var e=s.querySelector(".search-feedback");e&&o.parentNode.removeChild(e)}s.addEventListener("DOMContentLoaded",function(){o.addEventListener("input",function(e){"number"==typeof this.toId&&(clearTimeout(this.toId),this.toId=void 0),this.toId=setTimeout(function(e){var t,r,n=e.target.value;n.length?(u(),r=(t="#qry=".concat(n)).substr(1).split("="),a.location.hash=t,d({action:r[0],value:r[1].replace(/[.*+\-?^${}()|[\]\\]/g,"\\$&")})):u()}.bind(this),600,e)}),e.addEventListener("click",function(e){var t,r,n;"index-link"===e.target.className&&(t=e.target.hash.substr(1).split("="),n=(r=c("#close-index")).data("toggle"),a.location.hash=e.target.hash,d({action:t[0],value:t[1]}),r.trigger("toggle.wb-toggle",n))})})}($,window,document,Chartist,PMO);
//# sourceMappingURL=bundle.js.map
