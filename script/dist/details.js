!function(a,n){"use strict";var r="wb-details",o="summary",t=n.doc,s=function(){return null!==this.getAttribute("open")},l=function(t){"boolean"==typeof t&&(t?function(){this.setAttribute("open","open"),this.className+=" open",e.call(this)}.call(this):function(){this.removeAttribute("open"),this.className=this.className.replace(" open",""),e.call(this)}.call(this)),this.summary.setAttribute("aria-expanded",t),a(this).trigger("toggle")},e=function(){var t;if(-1!==this.className.indexOf("alert")&&(t="alert-collapsible-state-"+this.getAttribute("id")),t)try{localStorage.setItem(t,this.open?"open":"closed")}catch(t){}};t.on("timerpoke.wb wb-init.wb-details",o,function(t){var e,i=n.init(t,r,o);i&&(e=i.parentNode,Object.defineProperty(e,"open",{get:s,set:l}),(e.summary=i).setAttribute("aria-expanded",null!==e.getAttribute("open")),i.getAttribute("role")||i.setAttribute("role","button"),i.getAttribute("tabindex")||i.setAttribute("tabindex","0"),n.ready(a(i),r))}),t.on("click keydown toggle."+r,o,function(t){var e,i=t.which,n=t.currentTarget;return i&&1!==i||-1!==n.className.indexOf("wb-toggle")&&("toggle"!==t.type||t.namespace!==r)?13!==i&&32!==i||(t.preventDefault(),a(n).trigger("click")):(e=n.parentNode).open=!e.open,!0}),n.add(o)}(jQuery,(window,wb));
//# sourceMappingURL=details.js.map