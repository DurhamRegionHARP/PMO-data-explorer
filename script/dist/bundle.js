"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var n=[],r=!0,a=!1,i=void 0;try{for(var s,o=e[Symbol.iterator]();!(r=(s=o.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(e){a=!0,i=e}finally{try{r||null==o.return||o.return()}finally{if(a)throw i}}return n}}function _arrayWithHoles(e){if(Array.isArray(e))return e}!function(e,p){e.PMO=function(e){this.version="0.5.0",this.anchor=p.querySelector(".indicator-list"),this.name=e.pmoName,this.description=e.description,this.slug=e.pmoName.split(" ").join("-").toLowerCase(),this.chartData=e.estimates,this.chartsToBuild=Object.keys(e.estimates),this.container=function(){var e=p.createElement("article");return e.setAttribute("class","indicator-block indicator-".concat(this.slug)),e},this.notes=function(){if(e.trendTests)return{Notes:["Source: 2018-2019 Ontario Student Drug Use and Health Survey","Missing bars indicate an estimate is not releaseable due to small numbers"],"Trend analysis":e.trendTests,Feedback:'Your comments are welcome through our <a href="#">feedback form</a>'};return{Notes:["Source: 2018-2019 Ontario Student Drug Use and Health Survey","Missing bars indicate an estimate is not releaseable due to small numbers"],Feedback:'Your comments are welcome through our <a href="#">feedback form</a>'}},this.buildHeader=function(){var n=this,e=p.createElement("div"),t=p.createElement("h3"),r=p.createElement("p");e.setAttribute("class","indicator-header"),t.setAttribute("class","indicator-title"),r.setAttribute("class","indicator-desc"),r.insertAdjacentText("afterbegin",this.description),t.insertAdjacentText("afterbegin",this.name),e.appendChild(t),e.appendChild(r);var a=[];Object.keys(this.chartData).forEach(function(t){var e=p.createElement("button");e.setAttribute("class","byAll"==t?"btn btn-default active wb-toggle":"btn btn-default wb-toggle"),e.setAttribute("data-toggle",'{ "selector": "#'.concat(n.slug,"-").concat(t,'","group": ".chart-').concat(n.slug,'","type": "on"}')),e.insertAdjacentText("afterbegin",function(){var e="";switch(t){case"byAll":e="By Response Category";break;case"byGrade":e="By Grade";break;case"bySex":e="By Sex";break;case"byYear":e="By Year"}return e}()),a.push(e)});var i=p.createElement("div"),s=p.createElement("div"),o=p.createElement("a");o.insertAdjacentText("afterbegin","?");for(var c=0,l=Object.entries({class:"btn btn-sm btn-default overlay-lnk",href:"#options-hint","aria-controls":"options-hint",role:"button"});c<l.length;c++){var d=_slicedToArray(l[c],2),u=d[0],h=d[1];o.setAttribute(u,h)}return s.setAttribute("class","view-control"),i.setAttribute("class","view-mode-control btn-group-sm btn-group"),a.forEach(function(e,t){i.appendChild(e)}),s.appendChild(i),s.appendChild(o),e.appendChild(s),e},this.buildCharts=function(){var n=this,r=p.createElement("div");return r.setAttribute("class","indicator-chart"),Object.keys(this.chartData).forEach(function(e){var t=p.createElement("div");t.setAttribute("id","".concat(n.slug,"-").concat(e)),t.setAttribute("class","chart chart-".concat(n.slug)),"byAll"===e&&(t.className+=" on"),r.appendChild(t)}),r},this.buildNotes=function(){var e=p.createElement("div");e.setAttribute("class","indicator-footer");var t=p.createElement("div");t.setAttribute("class","wb-tabs");var o=p.createElement("div");return o.setAttribute("class","tabpanels"),Object.entries(this.notes()).forEach(function(e){var t=_slicedToArray(e,2),n=t[0],r=t[1],a=p.createElement("details");a.setAttribute("class","tab-".concat(n.toLowerCase()));var i=p.createElement("summary");if(i.insertAdjacentText("afterbegin",n),Array.isArray(r))a.appendChild(i),r.forEach(function(e){var t=p.createElement("p");t.insertAdjacentText("afterbegin",e),a.appendChild(t)});else{var s=p.createElement("p");s.insertAdjacentHTML("afterbegin",r),a.appendChild(i),a.appendChild(s)}o.appendChild(a)}),t.appendChild(o),e.appendChild(t),e},this.create=function(){var e=this.container();e.appendChild(this.buildHeader()),e.appendChild(this.buildCharts()),e.appendChild(this.buildNotes()),this.anchor.appendChild(e)}}}(window,document),function(c,a,s,l,i){var o=s.querySelector(".search-text"),e=s.querySelector(".index-container");function d(r){fetch("https://cdn.jsdelivr.net/gh/DurhamRegionHARP/PMO-data-explorer@gh-pages/_data/pmo.json").then(function(e){return e.json()}).then(function(e){var t={qry:function(e){var t=new RegExp(r.value,"i");if(t.test(e.pmoName)||t.test(e.description)||t.test(e.tags.join(" ")))return e},cat:function(e){if(e.category.split(" ").join("-").toLowerCase()===r.value)return console.log(e),e},ind:function(e){if(e.pmoName.split(" ").join("-").toLowerCase()===r.value)return e}},n=e.indicators.filter(t[r.action]);"qry"===r.action&&function(e){var t=e.length,n=s.createElement("p"),r=t+" result"+(1===t?"":"s")+" found";0===t&&(r+='<p>Why not <a href="#">suggest</a> this topic be added?</p>');n.insertAdjacentHTML("afterbegin",r);var a=s.querySelector(".search-feedback");if(a)a.removeChild(a.firstChild),a.appendChild(n),o.parentNode.appendChild(a);else{var i=s.createElement("span");i.setAttribute("class","search-feedback"),i.appendChild(n),o.parentNode.appendChild(i)}}(n),function(){var e=s.querySelector(".indicator-list");for(;e.firstChild;)e.removeChild(e.firstChild)}(),n.forEach(function(e){!function(e){var o=new i(e);if(!s.querySelector(".indicator-"+o.slug)){o.create(),o.chartsToBuild.forEach(function(e){var t,n,r,a,i,s;t="#".concat(o.slug,"-").concat(e),n=o.chartData[e],r=n.series.map(function(e){return e.cl.map(function(e){return e[0]})}),a=n.series.map(function(e){return e.cl.map(function(e){return e[1]})}),i=n.series.map(function(e){return e.notes}),s={axisX:{showGrid:!1},axisY:{labelInterpolationFnc:function(e){return e+"%"},onlyInteger:!0},height:"250px",width:"1100px",high:100,low:0,showGridBackground:!0,seriesBarDistance:22,plugins:[l.plugins.errorBars({orientation:"vertical",confidenceLimit:{upper:r,lower:a}}),l.plugins.tooltip({tooltipFnc:function(e,t){var n="null"==e?"":"<br>".concat(e);return"".concat(t,"%").concat(n)}}),l.plugins.legend({className:"list-inline",clickable:!1}),l.plugins.ctAccessibility({caption:"OSDUHS Results",seriesHeader:"Analysis group",valueTransform:function(e){return e+"%"}})]},new l.Bar(t,n,s,[["screen and (max-width: 767px)",{width:"650px",seriesBarDistance:15,chartPadding:{right:25}}],["screen and (min-width: 768px)",{width:"680px",seriesBarDistance:22}],["screen and (min-width: 992px)",{seriesBarDistance:22,width:"900px"}],["screen and (min-width: 1200px)",{seriesBarDistance:22,width:"1100px"}]]).on("draw",function(e){"bar"===e.type&&e.element.attr({"ct:meta":this[e.seriesIndex][e.index]})}.bind(i)),c(".wb-toggle").trigger("wb-init.wb-toggle"),c(".wb-tabs").trigger("wb-init.wb-tabs")}),s.querySelector(".indicator-"+o.slug).addEventListener("click",function(e){if("BUTTON"===e.target.tagName){var t=e.target.parentNode;t.hasChildNodes()&&t.childNodes.forEach(function(e){e.classList.remove("active")}),e.target.classList.add("active")}})}}(e)})}).catch(function(e){console.log(e)})}function u(){var e=s.querySelector(".search-feedback");e&&o.parentNode.removeChild(e)}s.addEventListener("DOMContentLoaded",function(){o.addEventListener("input",function(e){"number"==typeof this.toId&&(clearTimeout(this.toId),this.toId=void 0),this.toId=setTimeout(function(e){var t=e.target.value;if(t.length){u();var n="#qry=".concat(t),r=n.substr(1).split("=");a.location.hash=n,d({action:r[0],value:r[1].replace(/[.*+\-?^${}()|[\]\\]/g,"\\$&")})}else u()}.bind(this),600,e)}),e.addEventListener("click",function(e){if("index-link"===e.target.className){var t=e.target.hash.substr(1).split("="),n=c("#close-index"),r=n.data("toggle");a.location.hash=e.target.hash,d({action:t[0],value:t[1]}),n.trigger("toggle.wb-toggle",r)}})})}($,window,document,Chartist,PMO);
//# sourceMappingURL=bundle.js.map