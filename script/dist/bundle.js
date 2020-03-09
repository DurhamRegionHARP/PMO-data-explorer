"use strict";function _slicedToArray(t,e){return _arrayWithHoles(t)||_iterableToArrayLimit(t,e)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(t,e){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var n=[],r=!0,i=!1,a=void 0;try{for(var s,c=t[Symbol.iterator]();!(r=(s=c.next()).done)&&(n.push(s.value),!e||n.length!==e);r=!0);}catch(t){i=!0,a=t}finally{try{r||null==c.return||c.return()}finally{if(i)throw a}}return n}}function _arrayWithHoles(t){if(Array.isArray(t))return t}!function(t,p){t.PMO=function(t){this.version="0.3.0",this.anchor=p.querySelector(".indicator-list"),this.name=t.pmoName,this.description=t.description,this.slug=t.pmoName.split(" ").join("-").toLowerCase(),this.chartData=t.estimates,this.chartsToBuild=Object.keys(t.estimates),this.container=function(){var t=p.createElement("article");return t.setAttribute("class","indicator-block indicator-".concat(this.slug)),t},this.notes={Notes:["Source: 2018-2019 Ontario Student Drug Use and Health Survey","Missing bars indicate an estimate is not releaseable due to small numbers"],"Trend analysis":t.trendTests,Feedback:'Your comments are welcome through our <a href="#">feedback form</a>'},this.buildHeader=function(){var n=this,t=p.createElement("div"),e=p.createElement("h3"),r=p.createElement("p");t.setAttribute("class","indicator-header"),e.setAttribute("class","indicator-title"),r.setAttribute("class","indicator-desc"),r.insertAdjacentText("afterbegin",this.description),e.insertAdjacentText("afterbegin",this.name),t.appendChild(e),t.appendChild(r);var i=[];Object.keys(this.chartData).forEach(function(e){var t=p.createElement("button");t.setAttribute("class","btn btn-default wb-toggle"),t.setAttribute("data-toggle",'{ "selector": "#'.concat(n.slug,"-").concat(e,'","group": ".chart-').concat(n.slug,'","type": "on"}')),t.insertAdjacentText("afterbegin",function(){var t="";switch(e){case"byAll":t="By Response Category";break;case"byGrade":t="By Grade";break;case"bySex":t="By Sex";break;case"byYear":t="By Year"}return t}()),i.push(t)});var a=p.createElement("div"),s=p.createElement("div"),c=p.createElement("a");c.insertAdjacentText("afterbegin","?");for(var o=0,l=Object.entries({class:"btn btn-sm btn-default overlay-lnk",href:"#options-hint","aria-controls":"options-hint",role:"button"});o<l.length;o++){var d=_slicedToArray(l[o],2),u=d[0],h=d[1];c.setAttribute(u,h)}return s.setAttribute("class","view-control"),a.setAttribute("class","view-mode-control btn-group-sm btn-group"),i.forEach(function(t,e){a.appendChild(t)}),s.appendChild(a),s.appendChild(c),t.appendChild(s),t},this.buildCharts=function(){var n=this,r=p.createElement("div");return r.setAttribute("class","indicator-chart"),Object.keys(this.chartData).forEach(function(t){var e=p.createElement("div");e.setAttribute("id","".concat(n.slug,"-").concat(t)),e.setAttribute("class","chart chart-".concat(n.slug)),"byAll"===t&&(e.className+=" on"),r.appendChild(e)}),r},this.buildNotes=function(){var t=p.createElement("div");t.setAttribute("class","indicator-footer");var e=p.createElement("div");e.setAttribute("class","wb-tabs");var c=p.createElement("div");return c.setAttribute("class","tabpanels"),Object.entries(this.notes).forEach(function(t){var e=_slicedToArray(t,2),n=e[0],r=e[1],i=p.createElement("details");i.setAttribute("class","tab-".concat(n.toLowerCase()));var a=p.createElement("summary");if(a.insertAdjacentText("afterbegin",n),Array.isArray(r))i.appendChild(a),r.forEach(function(t){var e=p.createElement("p");e.insertAdjacentText("afterbegin",t),i.appendChild(e)});else{var s=p.createElement("p");s.insertAdjacentHTML("afterbegin",r),i.appendChild(a),i.appendChild(s)}c.appendChild(i)}),e.appendChild(c),t.appendChild(e),t},this.create=function(){var t=this.container();t.appendChild(this.buildHeader()),t.appendChild(this.buildCharts()),t.appendChild(this.buildNotes()),this.anchor.appendChild(t)}}}(window,document),function(o,i,s,l,a){var c=s.querySelector(".search-text"),t=s.querySelector(".index-container");function d(r){fetch("https://cdn.jsdelivr.net/gh/DurhamRegionHARP/PMO-data-explorer@gh-pages/_data/pmo.json").then(function(t){return t.json()}).then(function(t){var e={qry:function(t){var e=new RegExp(r.value,"i");if(e.test(t.pmoName)||e.test(t.description)||e.test(t.tags.join(" ")))return t},cat:function(t){if(t.category.split(" ").join("-").toLowerCase()===r.value)return console.log(t),t},ind:function(t){if(t.pmoName.split(" ").join("-").toLowerCase()===r.value)return t}},n=t.indicators.filter(e[r.action]);"qry"===r.action&&function(t){var e=t.length,n=s.createElement("p"),r=e+" result"+(1===e?"":"s")+" found";0===e&&(r+='<p>Why not <a href="#">suggest</a> this topic be added?</p>');n.insertAdjacentHTML("afterbegin",r);var i=s.querySelector(".search-feedback");if(i)i.removeChild(i.firstChild),i.appendChild(n),c.parentNode.appendChild(i);else{var a=s.createElement("span");a.setAttribute("class","search-feedback"),a.appendChild(n),c.parentNode.appendChild(a)}}(n),function(){var t=s.querySelector(".indicator-list");for(;t.firstChild;)t.removeChild(t.firstChild)}(),n.forEach(function(t){!function(t){s.querySelectorAll(".indicator-block");var c=new a(t);s.querySelector(".indicator-"+c.slug)||(c.create(),c.chartsToBuild.forEach(function(t){var e,n,r,i,a,s;e="#".concat(c.slug,"-").concat(t),n=c.chartData[t],r=n.series.map(function(t){return t.cl.map(function(t){return t[0]})}),i=n.series.map(function(t){return t.cl.map(function(t){return t[1]})}),a=n.series.map(function(t){return t.notes}),s={axisX:{showGrid:!1},axisY:{labelInterpolationFnc:function(t){return t+"%"},onlyInteger:!0},height:"250px",width:"1100px",high:100,low:0,showGridBackground:!0,seriesBarDistance:22,plugins:[l.plugins.errorBars({orientation:"vertical",confidenceLimit:{upper:r,lower:i}}),l.plugins.tooltip({tooltipFnc:function(t,e){var n="null"==t?"":"<br>".concat(t);return"".concat(e,"%").concat(n)}}),l.plugins.legend({className:"list-inline",clickable:!1}),l.plugins.ctAccessibility({caption:"OSDUHS Results",seriesHeader:"Analysis group",valueTransform:function(t){return t+"%"}})]},new l.Bar(e,n,s,[["screen and (max-width: 767px)",{width:"650px",seriesBarDistance:15,chartPadding:{right:25}}],["screen and (min-width: 768px)",{width:"680px",seriesBarDistance:22}],["screen and (min-width: 992px)",{seriesBarDistance:22,width:"900px"}],["screen and (min-width: 1200px)",{seriesBarDistance:22,width:"1100px"}]]).on("draw",function(t){"bar"===t.type&&t.element.attr({"ct:meta":this[t.seriesIndex][t.index]})}.bind(a)),o(".wb-toggle").trigger("wb-init.wb-toggle"),o(".wb-tabs").trigger("wb-init.wb-tabs")}))}((r.value,t))})}).catch(function(t){console.log(t)})}function u(){var t=s.querySelector(".search-feedback");t&&c.parentNode.removeChild(t)}s.addEventListener("DOMContentLoaded",function(){c.addEventListener("input",function(t){"number"==typeof this.toId&&(clearTimeout(this.toId),this.toId=void 0),this.toId=setTimeout(function(t){var e=t.target.value;if(e.length){u();var n="#qry=".concat(e),r=n.substr(1).split("=");i.location.hash=n,d({action:r[0],value:r[1].replace(/[.*+\-?^${}()|[\]\\]/g,"\\$&")})}else u()}.bind(this),600,t)}),t.addEventListener("click",function(t){if("index-link"===t.target.className){var e=t.target.hash.substr(1).split("="),n=o("#close-index"),r=n.data("toggle");i.location.hash=t.target.hash,d({action:e[0],value:e[1]}),n.trigger("toggle.wb-toggle",r)}})})}($,window,document,Chartist,PMO);
//# sourceMappingURL=bundle.js.map
