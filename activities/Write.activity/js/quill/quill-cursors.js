!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.QuillCursors=e():t.QuillCursors=e()}(window,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),i=function(){function t(t,e,n){this.id=t,this.name=e,this.color=n}return t.prototype.build=function(e){var n=document.createElement(t.CONTAINER_ELEMENT_TAG);n.classList.add(t.CURSOR_CLASS),n.innerHTML=e.template;var r=n.getElementsByClassName(t.SELECTION_CLASS)[0],i=n.getElementsByClassName(t.CARET_CONTAINER_CLASS)[0],o=i.getElementsByClassName(t.CARET_CLASS)[0],a=n.getElementsByClassName(t.FLAG_CLASS)[0];return a.style.backgroundColor=this.color,o.style.backgroundColor=this.color,n.getElementsByClassName(t.NAME_CLASS)[0].textContent=this.name,a.style.transitionDelay=e.hideDelayMs+"ms",a.style.transitionDuration=e.hideSpeedMs+"ms",this._el=n,this._selectionEl=r,this._caretEl=i,this._flagEl=a,this._el},t.prototype.show=function(){this._el.classList.remove(t.HIDDEN_CLASS)},t.prototype.hide=function(){this._el.classList.add(t.HIDDEN_CLASS)},t.prototype.remove=function(){this._el.parentNode.removeChild(this._el)},t.prototype.updateCaret=function(t){this._caretEl.style.top=t.top+"px",this._caretEl.style.left=t.left+"px",this._caretEl.style.height=t.height+"px",this._flagEl.style.top=t.top+"px",this._flagEl.style.left=t.left+"px"},t.prototype.updateSelection=function(t,e){var n=this;this._clearSelection(),t=t||[],Array.from(t).forEach(function(t){return n._addSelection(t,e)})},t.prototype._clearSelection=function(){this._selectionEl.innerHTML=null},t.prototype._addSelection=function(t,e){var n=this._selectionBlock(t,e);this._selectionEl.appendChild(n)},t.prototype._selectionBlock=function(e,n){var i=document.createElement(t.SELECTION_ELEMENT_TAG);return i.classList.add(t.SELECTION_BLOCK_CLASS),i.style.top=e.top-n.top+"px",i.style.left=e.left-n.left+"px",i.style.width=e.width+"px",i.style.height=e.height+"px",i.style.backgroundColor=r(this.color).setAlpha(.3).toString(),i},t.CONTAINER_ELEMENT_TAG="SPAN",t.SELECTION_ELEMENT_TAG="SPAN",t.CURSOR_CLASS="ql-cursor",t.SELECTION_CLASS="ql-cursor-selections",t.SELECTION_BLOCK_CLASS="ql-cursor-selection-block",t.CARET_CLASS="ql-cursor-caret",t.CARET_CONTAINER_CLASS="ql-cursor-caret-container",t.FLAG_CLASS="ql-cursor-flag",t.FLAG_FLAP_CLASS="ql-cursor-flag-flap",t.NAME_CLASS="ql-cursor-name",t.HIDDEN_CLASS="hidden",t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(2);n(6),e.default=r.default},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),i=n(4),o=n(5),a=function(){function t(e,n){void 0===n&&(n={}),this._cursors={},this._quill=e,this._container=this._quill.addContainer(t.CONTAINER_CLASS),this._options=this._setDefaults(n),this._currentSelection=this._quill.getSelection(),this._registerSelectionChangeListeners(),this._registerTextChangeListener(),this._registerDomListeners()}return t.prototype.createCursor=function(t,e,n){var i=this._cursors[t];if(!i){i=new r.default(t,e,n),this._cursors[t]=i;var o=i.build(this._options);this._container.appendChild(o)}return i},t.prototype.moveCursor=function(t,e){var n=this._cursors[t];n&&(n.range=e,this._updateCursor(n))},t.prototype.removeCursor=function(t){var e=this._cursors[t];e&&(e.remove(),delete this._cursors[t])},t.prototype.update=function(){var t=this;this.cursors().forEach(function(e){return t._updateCursor(e)})},t.prototype.clearCursors=function(){var t=this;this.cursors().forEach(function(e){return t.removeCursor(e.id)})},t.prototype.cursors=function(){var t=this;return Object.keys(this._cursors).map(function(e){return t._cursors[e]})},t.prototype._registerSelectionChangeListeners=function(){var t=this;this._quill.on(this._quill.constructor.events.SELECTION_CHANGE,function(e){t._currentSelection=e})},t.prototype._registerTextChangeListener=function(){var t=this;this._options.selectionChangeSource&&this._quill.on(this._quill.constructor.events.TEXT_CHANGE,function(){return window.setTimeout(function(){t._emitSelection(),t.update()})})},t.prototype._registerDomListeners=function(){var t=this;window.addEventListener("resize",function(){return t.update()}),this._quill.container.getElementsByClassName("ql-editor")[0].addEventListener("scroll",function(){return t.update()})},t.prototype._updateCursor=function(t){if(!t.range)return t.hide();var e=this._indexWithinQuillBounds(t.range.index),n=this._indexWithinQuillBounds(t.range.index+t.range.length),r=this._quill.getLeaf(e),o=this._quill.getLeaf(n);if(!this._leafIsValid(r)||!this._leafIsValid(o))return t.hide();t.show();var a=document.createRange();a.setStart(r[0].domNode,r[1]),a.setEnd(o[0].domNode,o[1]);var s=this._quill.getBounds(n);t.updateCaret(s);var l=i.getClientRects(a),u=this._quill.container.getBoundingClientRect();t.updateSelection(l,u)},t.prototype._indexWithinQuillBounds=function(t){return t=Math.max(t,0),t=Math.min(t,this._quill.getLength())},t.prototype._leafIsValid=function(t){return t&&t[0]&&t[0].domNode&&t[1]>=0},t.prototype._emitSelection=function(){this._quill.emitter.emit(this._quill.constructor.events.SELECTION_CHANGE,this._quill.getSelection(),this._currentSelection,this._options.selectionChangeSource)},t.prototype._setDefaults=function(t){return(t=Object.assign({},t)).template=t.template||o.default,null!==t.selectionChangeSource&&(t.selectionChangeSource=t.selectionChangeSource||this._quill.constructor.sources.API),t.hideDelayMs=Number.isInteger(t.hideDelayMs)?t.hideDelayMs:3e3,t.hideSpeedMs=Number.isInteger(t.hideSpeedMs)?t.hideSpeedMs:400,t},t.CONTAINER_CLASS="ql-cursors",t}();e.default=a},function(t,e,n){var r;!function(i){var o=/^\s+/,a=/\s+$/,s=0,l=i.round,u=i.min,c=i.max,f=i.random;function h(t,e){if(e=e||{},(t=t||"")instanceof h)return t;if(!(this instanceof h))return new h(t,e);var n=function(t){var e={r:0,g:0,b:0},n=1,r=null,s=null,l=null,f=!1,h=!1;"string"==typeof t&&(t=function(t){t=t.replace(o,"").replace(a,"").toLowerCase();var e,n=!1;if(q[t])t=q[t],n=!0;else if("transparent"==t)return{r:0,g:0,b:0,a:0,format:"name"};if(e=G.rgb.exec(t))return{r:e[1],g:e[2],b:e[3]};if(e=G.rgba.exec(t))return{r:e[1],g:e[2],b:e[3],a:e[4]};if(e=G.hsl.exec(t))return{h:e[1],s:e[2],l:e[3]};if(e=G.hsla.exec(t))return{h:e[1],s:e[2],l:e[3],a:e[4]};if(e=G.hsv.exec(t))return{h:e[1],s:e[2],v:e[3]};if(e=G.hsva.exec(t))return{h:e[1],s:e[2],v:e[3],a:e[4]};if(e=G.hex8.exec(t))return{r:I(e[1]),g:I(e[2]),b:I(e[3]),a:F(e[4]),format:n?"name":"hex8"};if(e=G.hex6.exec(t))return{r:I(e[1]),g:I(e[2]),b:I(e[3]),format:n?"name":"hex"};if(e=G.hex4.exec(t))return{r:I(e[1]+""+e[1]),g:I(e[2]+""+e[2]),b:I(e[3]+""+e[3]),a:F(e[4]+""+e[4]),format:n?"name":"hex8"};if(e=G.hex3.exec(t))return{r:I(e[1]+""+e[1]),g:I(e[2]+""+e[2]),b:I(e[3]+""+e[3]),format:n?"name":"hex"};return!1}(t));"object"==typeof t&&(z(t.r)&&z(t.g)&&z(t.b)?(d=t.r,p=t.g,g=t.b,e={r:255*O(d,255),g:255*O(p,255),b:255*O(g,255)},f=!0,h="%"===String(t.r).substr(-1)?"prgb":"rgb"):z(t.h)&&z(t.s)&&z(t.v)?(r=H(t.s),s=H(t.v),e=function(t,e,n){t=6*O(t,360),e=O(e,100),n=O(n,100);var r=i.floor(t),o=t-r,a=n*(1-e),s=n*(1-o*e),l=n*(1-(1-o)*e),u=r%6;return{r:255*[n,s,a,a,l,n][u],g:255*[l,n,n,s,a,a][u],b:255*[a,a,l,n,n,s][u]}}(t.h,r,s),f=!0,h="hsv"):z(t.h)&&z(t.s)&&z(t.l)&&(r=H(t.s),l=H(t.l),e=function(t,e,n){var r,i,o;function a(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+(e-t)*(2/3-n)*6:t}if(t=O(t,360),e=O(e,100),n=O(n,100),0===e)r=i=o=n;else{var s=n<.5?n*(1+e):n+e-n*e,l=2*n-s;r=a(l,s,t+1/3),i=a(l,s,t),o=a(l,s,t-1/3)}return{r:255*r,g:255*i,b:255*o}}(t.h,r,l),f=!0,h="hsl"),t.hasOwnProperty("a")&&(n=t.a));var d,p,g;return n=T(n),{ok:f,format:t.format||h,r:u(255,c(e.r,0)),g:u(255,c(e.g,0)),b:u(255,c(e.b,0)),a:n}}(t);this._originalInput=t,this._r=n.r,this._g=n.g,this._b=n.b,this._a=n.a,this._roundA=l(100*this._a)/100,this._format=e.format||n.format,this._gradientType=e.gradientType,this._r<1&&(this._r=l(this._r)),this._g<1&&(this._g=l(this._g)),this._b<1&&(this._b=l(this._b)),this._ok=n.ok,this._tc_id=s++}function d(t,e,n){t=O(t,255),e=O(e,255),n=O(n,255);var r,i,o=c(t,e,n),a=u(t,e,n),s=(o+a)/2;if(o==a)r=i=0;else{var l=o-a;switch(i=s>.5?l/(2-o-a):l/(o+a),o){case t:r=(e-n)/l+(e<n?6:0);break;case e:r=(n-t)/l+2;break;case n:r=(t-e)/l+4}r/=6}return{h:r,s:i,l:s}}function p(t,e,n){t=O(t,255),e=O(e,255),n=O(n,255);var r,i,o=c(t,e,n),a=u(t,e,n),s=o,l=o-a;if(i=0===o?0:l/o,o==a)r=0;else{switch(o){case t:r=(e-n)/l+(e<n?6:0);break;case e:r=(n-t)/l+2;break;case n:r=(t-e)/l+4}r/=6}return{h:r,s:i,v:s}}function g(t,e,n,r){var i=[j(l(t).toString(16)),j(l(e).toString(16)),j(l(n).toString(16))];return r&&i[0].charAt(0)==i[0].charAt(1)&&i[1].charAt(0)==i[1].charAt(1)&&i[2].charAt(0)==i[2].charAt(1)?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("")}function b(t,e,n,r){return[j(B(r)),j(l(t).toString(16)),j(l(e).toString(16)),j(l(n).toString(16))].join("")}function m(t,e){e=0===e?0:e||10;var n=h(t).toHsl();return n.s-=e/100,n.s=M(n.s),h(n)}function _(t,e){e=0===e?0:e||10;var n=h(t).toHsl();return n.s+=e/100,n.s=M(n.s),h(n)}function v(t){return h(t).desaturate(100)}function y(t,e){e=0===e?0:e||10;var n=h(t).toHsl();return n.l+=e/100,n.l=M(n.l),h(n)}function C(t,e){e=0===e?0:e||10;var n=h(t).toRgb();return n.r=c(0,u(255,n.r-l(-e/100*255))),n.g=c(0,u(255,n.g-l(-e/100*255))),n.b=c(0,u(255,n.b-l(-e/100*255))),h(n)}function S(t,e){e=0===e?0:e||10;var n=h(t).toHsl();return n.l-=e/100,n.l=M(n.l),h(n)}function A(t,e){var n=h(t).toHsl(),r=(n.h+e)%360;return n.h=r<0?360+r:r,h(n)}function x(t){var e=h(t).toHsl();return e.h=(e.h+180)%360,h(e)}function E(t){var e=h(t).toHsl(),n=e.h;return[h(t),h({h:(n+120)%360,s:e.s,l:e.l}),h({h:(n+240)%360,s:e.s,l:e.l})]}function w(t){var e=h(t).toHsl(),n=e.h;return[h(t),h({h:(n+90)%360,s:e.s,l:e.l}),h({h:(n+180)%360,s:e.s,l:e.l}),h({h:(n+270)%360,s:e.s,l:e.l})]}function L(t){var e=h(t).toHsl(),n=e.h;return[h(t),h({h:(n+72)%360,s:e.s,l:e.l}),h({h:(n+216)%360,s:e.s,l:e.l})]}function R(t,e,n){e=e||6,n=n||30;var r=h(t).toHsl(),i=360/n,o=[h(t)];for(r.h=(r.h-(i*e>>1)+720)%360;--e;)r.h=(r.h+i)%360,o.push(h(r));return o}function N(t,e){e=e||6;for(var n=h(t).toHsv(),r=n.h,i=n.s,o=n.v,a=[],s=1/e;e--;)a.push(h({h:r,s:i,v:o})),o=(o+s)%1;return a}h.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var t=this.toRgb();return(299*t.r+587*t.g+114*t.b)/1e3},getLuminance:function(){var t,e,n,r=this.toRgb();return t=r.r/255,e=r.g/255,n=r.b/255,.2126*(t<=.03928?t/12.92:i.pow((t+.055)/1.055,2.4))+.7152*(e<=.03928?e/12.92:i.pow((e+.055)/1.055,2.4))+.0722*(n<=.03928?n/12.92:i.pow((n+.055)/1.055,2.4))},setAlpha:function(t){return this._a=T(t),this._roundA=l(100*this._a)/100,this},toHsv:function(){var t=p(this._r,this._g,this._b);return{h:360*t.h,s:t.s,v:t.v,a:this._a}},toHsvString:function(){var t=p(this._r,this._g,this._b),e=l(360*t.h),n=l(100*t.s),r=l(100*t.v);return 1==this._a?"hsv("+e+", "+n+"%, "+r+"%)":"hsva("+e+", "+n+"%, "+r+"%, "+this._roundA+")"},toHsl:function(){var t=d(this._r,this._g,this._b);return{h:360*t.h,s:t.s,l:t.l,a:this._a}},toHslString:function(){var t=d(this._r,this._g,this._b),e=l(360*t.h),n=l(100*t.s),r=l(100*t.l);return 1==this._a?"hsl("+e+", "+n+"%, "+r+"%)":"hsla("+e+", "+n+"%, "+r+"%, "+this._roundA+")"},toHex:function(t){return g(this._r,this._g,this._b,t)},toHexString:function(t){return"#"+this.toHex(t)},toHex8:function(t){return function(t,e,n,r,i){var o=[j(l(t).toString(16)),j(l(e).toString(16)),j(l(n).toString(16)),j(B(r))];if(i&&o[0].charAt(0)==o[0].charAt(1)&&o[1].charAt(0)==o[1].charAt(1)&&o[2].charAt(0)==o[2].charAt(1)&&o[3].charAt(0)==o[3].charAt(1))return o[0].charAt(0)+o[1].charAt(0)+o[2].charAt(0)+o[3].charAt(0);return o.join("")}(this._r,this._g,this._b,this._a,t)},toHex8String:function(t){return"#"+this.toHex8(t)},toRgb:function(){return{r:l(this._r),g:l(this._g),b:l(this._b),a:this._a}},toRgbString:function(){return 1==this._a?"rgb("+l(this._r)+", "+l(this._g)+", "+l(this._b)+")":"rgba("+l(this._r)+", "+l(this._g)+", "+l(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:l(100*O(this._r,255))+"%",g:l(100*O(this._g,255))+"%",b:l(100*O(this._b,255))+"%",a:this._a}},toPercentageRgbString:function(){return 1==this._a?"rgb("+l(100*O(this._r,255))+"%, "+l(100*O(this._g,255))+"%, "+l(100*O(this._b,255))+"%)":"rgba("+l(100*O(this._r,255))+"%, "+l(100*O(this._g,255))+"%, "+l(100*O(this._b,255))+"%, "+this._roundA+")"},toName:function(){return 0===this._a?"transparent":!(this._a<1)&&(k[g(this._r,this._g,this._b,!0)]||!1)},toFilter:function(t){var e="#"+b(this._r,this._g,this._b,this._a),n=e,r=this._gradientType?"GradientType = 1, ":"";if(t){var i=h(t);n="#"+b(i._r,i._g,i._b,i._a)}return"progid:DXImageTransform.Microsoft.gradient("+r+"startColorstr="+e+",endColorstr="+n+")"},toString:function(t){var e=!!t;t=t||this._format;var n=!1,r=this._a<1&&this._a>=0;return e||!r||"hex"!==t&&"hex6"!==t&&"hex3"!==t&&"hex4"!==t&&"hex8"!==t&&"name"!==t?("rgb"===t&&(n=this.toRgbString()),"prgb"===t&&(n=this.toPercentageRgbString()),"hex"!==t&&"hex6"!==t||(n=this.toHexString()),"hex3"===t&&(n=this.toHexString(!0)),"hex4"===t&&(n=this.toHex8String(!0)),"hex8"===t&&(n=this.toHex8String()),"name"===t&&(n=this.toName()),"hsl"===t&&(n=this.toHslString()),"hsv"===t&&(n=this.toHsvString()),n||this.toHexString()):"name"===t&&0===this._a?this.toName():this.toRgbString()},clone:function(){return h(this.toString())},_applyModification:function(t,e){var n=t.apply(null,[this].concat([].slice.call(e)));return this._r=n._r,this._g=n._g,this._b=n._b,this.setAlpha(n._a),this},lighten:function(){return this._applyModification(y,arguments)},brighten:function(){return this._applyModification(C,arguments)},darken:function(){return this._applyModification(S,arguments)},desaturate:function(){return this._applyModification(m,arguments)},saturate:function(){return this._applyModification(_,arguments)},greyscale:function(){return this._applyModification(v,arguments)},spin:function(){return this._applyModification(A,arguments)},_applyCombination:function(t,e){return t.apply(null,[this].concat([].slice.call(e)))},analogous:function(){return this._applyCombination(R,arguments)},complement:function(){return this._applyCombination(x,arguments)},monochromatic:function(){return this._applyCombination(N,arguments)},splitcomplement:function(){return this._applyCombination(L,arguments)},triad:function(){return this._applyCombination(E,arguments)},tetrad:function(){return this._applyCombination(w,arguments)}},h.fromRatio=function(t,e){if("object"==typeof t){var n={};for(var r in t)t.hasOwnProperty(r)&&(n[r]="a"===r?t[r]:H(t[r]));t=n}return h(t,e)},h.equals=function(t,e){return!(!t||!e)&&h(t).toRgbString()==h(e).toRgbString()},h.random=function(){return h.fromRatio({r:f(),g:f(),b:f()})},h.mix=function(t,e,n){n=0===n?0:n||50;var r=h(t).toRgb(),i=h(e).toRgb(),o=n/100;return h({r:(i.r-r.r)*o+r.r,g:(i.g-r.g)*o+r.g,b:(i.b-r.b)*o+r.b,a:(i.a-r.a)*o+r.a})},h.readability=function(t,e){var n=h(t),r=h(e);return(i.max(n.getLuminance(),r.getLuminance())+.05)/(i.min(n.getLuminance(),r.getLuminance())+.05)},h.isReadable=function(t,e,n){var r,i,o=h.readability(t,e);switch(i=!1,(r=function(t){var e,n;e=((t=t||{level:"AA",size:"small"}).level||"AA").toUpperCase(),n=(t.size||"small").toLowerCase(),"AA"!==e&&"AAA"!==e&&(e="AA");"small"!==n&&"large"!==n&&(n="small");return{level:e,size:n}}(n)).level+r.size){case"AAsmall":case"AAAlarge":i=o>=4.5;break;case"AAlarge":i=o>=3;break;case"AAAsmall":i=o>=7}return i},h.mostReadable=function(t,e,n){var r,i,o,a,s=null,l=0;i=(n=n||{}).includeFallbackColors,o=n.level,a=n.size;for(var u=0;u<e.length;u++)(r=h.readability(t,e[u]))>l&&(l=r,s=h(e[u]));return h.isReadable(t,s,{level:o,size:a})||!i?s:(n.includeFallbackColors=!1,h.mostReadable(t,["#fff","#000"],n))};var q=h.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},k=h.hexNames=function(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[t[n]]=n);return e}(q);function T(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function O(t,e){(function(t){return"string"==typeof t&&-1!=t.indexOf(".")&&1===parseFloat(t)})(t)&&(t="100%");var n=function(t){return"string"==typeof t&&-1!=t.indexOf("%")}(t);return t=u(e,c(0,parseFloat(t))),n&&(t=parseInt(t*e,10)/100),i.abs(t-e)<1e-6?1:t%e/parseFloat(e)}function M(t){return u(1,c(0,t))}function I(t){return parseInt(t,16)}function j(t){return 1==t.length?"0"+t:""+t}function H(t){return t<=1&&(t=100*t+"%"),t}function B(t){return i.round(255*parseFloat(t)).toString(16)}function F(t){return I(t)/255}var U,D,P,G=(D="[\\s|\\(]+("+(U="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)")+")[,|\\s]+("+U+")[,|\\s]+("+U+")\\s*\\)?",P="[\\s|\\(]+("+U+")[,|\\s]+("+U+")[,|\\s]+("+U+")[,|\\s]+("+U+")\\s*\\)?",{CSS_UNIT:new RegExp(U),rgb:new RegExp("rgb"+D),rgba:new RegExp("rgba"+P),hsl:new RegExp("hsl"+D),hsla:new RegExp("hsla"+P),hsv:new RegExp("hsv"+D),hsva:new RegExp("hsva"+P),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/});function z(t){return!!G.CSS_UNIT.exec(t)}t.exports?t.exports=h:void 0===(r=function(){return h}.call(e,n,e,t))||(t.exports=r)}(Math)},function(t,e,n){var r,i;
/*!
 * RangeFix v0.2.5
 * https://github.com/edg2s/rangefix
 *
 * Copyright 2014-17 Ed Sanders.
 * Released under the MIT license
 */void 0===(i="function"==typeof(r=function(){var t,e={};function n(){var e,n,r,i,o,a,s,l;return void 0===t&&(n=document.createElement("p"),r=document.createElement("span"),i=document.createTextNode("aa"),o=document.createTextNode("aa"),(a=document.createElement("img")).setAttribute("src","#null"),s=document.createRange(),t={},n.appendChild(i),n.appendChild(r),r.appendChild(a),r.appendChild(o),document.body.appendChild(n),s.setStart(i,1),s.setEnd(r,0),t.getClientRects=t.getBoundingClientRect=s.getClientRects().length>1,t.getClientRects||(s.setEnd(o,1),t.getClientRects=t.getBoundingClientRect=s.getClientRects().length<3),t.getBoundingClientRect||(s.setEnd(s.startContainer,s.startOffset),e=s.getBoundingClientRect(),t.getBoundingClientRect=0===e.top&&0===e.left),document.body.removeChild(n),l=window.ActiveXObject&&new Function("/*@cc_on return @_jscript_version; @*/")(),t.ieZoom=l&&l<=10),t}function r(t){var e;return t?screen.deviceXDPI===screen.logicalXDPI?t:"length"in t?Array.prototype.map.call(t,r):(e=screen.deviceXDPI/screen.logicalXDPI,{top:t.top/e,bottom:t.bottom/e,left:t.left/e,right:t.right/e,width:t.width/e,height:t.height/e}):t}function i(t,e){var n,r=0;if(1024>=e.length)return Array.prototype.push.apply(t,e);for(;r<e.length;)n=Array.prototype.push.apply(t,Array.prototype.slice.call(e,r,r+1024)),r+=1024;return n}return e.getClientRects=function(t){var e,o,a,s,l=n();if(l.ieZoom)return r(t.getClientRects());if(!l.getClientRects)return t.getClientRects();for(e=[],o=t.endContainer,a=t.endOffset,s=document.createRange();o!==t.commonAncestorContainer;)s.setStart(o,0),s.setEnd(o,a),i(e,s.getClientRects()),a=Array.prototype.indexOf.call(o.parentNode.childNodes,o),o=o.parentNode;return(s=t.cloneRange()).setEnd(o,a),i(e,s.getClientRects()),e},e.getBoundingClientRect=function(t){var e,i,o,a,s,l,u=this.getClientRects(t);if(0===u.length)return null;if(s=t.getBoundingClientRect(),(l=n()).ieZoom)return r(s);if(!l.getBoundingClientRect)return s;if(0===s.width&&0===s.height)return u[0];for(e=0,i=u.length;e<i;e++)a=u[e],o?(o.left=Math.min(o.left,a.left),o.top=Math.min(o.top,a.top),o.right=Math.max(o.right,a.right),o.bottom=Math.max(o.bottom,a.bottom)):o={left:a.left,top:a.top,right:a.right,bottom:a.bottom};return o&&(o.width=o.right-o.left,o.height=o.bottom-o.top),o},e})?r.call(e,n,e,t):r)||(t.exports=i)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),i='\n  <span class="'+r.default.SELECTION_CLASS+'"></span>\n  <span class="'+r.default.CARET_CONTAINER_CLASS+'">\n    <span class="'+r.default.CARET_CLASS+'"></span>\n  </span>\n  <div class="'+r.default.FLAG_CLASS+'">\n    <small class="'+r.default.NAME_CLASS+'"></small>\n    <span class="'+r.default.FLAG_FLAP_CLASS+'"></span>\n  </div>\n';e.default=i},function(t,e,n){var r=n(7);"string"==typeof r&&(r=[[t.i,r,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(9)(r,i);r.locals&&(t.exports=r.locals)},function(t,e,n){(t.exports=n(8)(!1)).push([t.i,"/********\n * VARS *\n ********/\n/**********\n * MIXINS *\n **********/\n/***********\n * CURSORS *\n ***********/\n.ql-container {\n  position: relative;\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  overflow: hidden; }\n\n.ql-editor {\n  position: relative;\n  position: relative;\n  flex: 1;\n  outline: none;\n  tab-size: 4;\n  white-space: pre-wrap; }\n\n.ql-cursor.hidden {\n  display: none; }\n\n.ql-cursor .ql-cursor-caret-container,\n.ql-cursor .ql-cursor-flag {\n  position: absolute; }\n\n.ql-cursor .ql-cursor-flag {\n  z-index: 1;\n  transform: translate3d(-1px, -100%, 0);\n  opacity: 0;\n  visibility: hidden;\n  color: white;\n  padding-bottom: 2px; }\n  @media screen {\n    .ql-cursor .ql-cursor-flag {\n      transition: opacity 0ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms, visibility 0ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms; } }\n  .ql-cursor .ql-cursor-flag .ql-cursor-name {\n    margin-left: 5px;\n    margin-right: 2.5px;\n    display: inline-block;\n    margin-top: -2px; }\n  .ql-cursor .ql-cursor-flag .ql-cursor-flag-flap {\n    display: inline-block;\n    z-index: -1;\n    width: 5px;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: -2.5px;\n    border-radius: 3px;\n    background-color: inherit; }\n\n.ql-cursor .ql-cursor-flag:hover,\n.ql-cursor .ql-cursor-caret-container:hover + .ql-cursor-flag {\n  opacity: 1;\n  visibility: visible;\n  transition: none; }\n\n.ql-cursor .ql-cursor-caret-container {\n  margin-left: -9px;\n  padding: 0 9px;\n  z-index: 1; }\n  .ql-cursor .ql-cursor-caret-container .ql-cursor-caret {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    width: 2px;\n    margin-left: -1px;\n    background-color: attr(data-color); }\n\n.ql-cursor .ql-cursor-selection-block {\n  position: absolute; }\n",""])},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var i=(a=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),o=r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"});return[n].concat(o).concat([i]).join("\n")}var a;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];null!=o&&(r[o]=!0)}for(i=0;i<t.length;i++){var a=t[i];null!=a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){var r,i,o={},a=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===i&&(i=r.apply(this,arguments)),i}),s=function(t){var e={};return function(t,n){if("function"==typeof t)return t();if(void 0===e[t]){var r=function(t,e){return e?e.querySelector(t):document.querySelector(t)}.call(this,t,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}e[t]=r}return e[t]}}(),l=null,u=0,c=[],f=n(10);function h(t,e){for(var n=0;n<t.length;n++){var r=t[n],i=o[r.id];if(i){i.refs++;for(var a=0;a<i.parts.length;a++)i.parts[a](r.parts[a]);for(;a<r.parts.length;a++)i.parts.push(_(r.parts[a],e))}else{var s=[];for(a=0;a<r.parts.length;a++)s.push(_(r.parts[a],e));o[r.id]={id:r.id,refs:1,parts:s}}}}function d(t,e){for(var n=[],r={},i=0;i<t.length;i++){var o=t[i],a=e.base?o[0]+e.base:o[0],s={css:o[1],media:o[2],sourceMap:o[3]};r[a]?r[a].parts.push(s):n.push(r[a]={id:a,parts:[s]})}return n}function p(t,e){var n=s(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=c[c.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),c.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var i=s(t.insertAt.before,n);n.insertBefore(e,i)}}function g(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=c.indexOf(t);e>=0&&c.splice(e,1)}function b(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var r=function(){0;return n.nc}();r&&(t.attrs.nonce=r)}return m(e,t.attrs),p(t,e),e}function m(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function _(t,e){var n,r,i,o;if(e.transform&&t.css){if(!(o="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=o}if(e.singleton){var a=u++;n=l||(l=b(e)),r=C.bind(null,n,a,!1),i=C.bind(null,n,a,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",m(e,t.attrs),p(t,e),e}(e),r=function(t,e,n){var r=n.css,i=n.sourceMap,o=void 0===e.convertToAbsoluteUrls&&i;(e.convertToAbsoluteUrls||o)&&(r=f(r));i&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var a=new Blob([r],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,n,e),i=function(){g(n),n.href&&URL.revokeObjectURL(n.href)}):(n=b(e),r=function(t,e){var n=e.css,r=e.media;r&&t.setAttribute("media",r);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,n),i=function(){g(n)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else i()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=d(t,e);return h(n,e),function(t){for(var r=[],i=0;i<n.length;i++){var a=n[i];(s=o[a.id]).refs--,r.push(s)}t&&h(d(t,e),e);for(i=0;i<r.length;i++){var s;if(0===(s=r[i]).refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete o[s.id]}}}};var v,y=(v=[],function(t,e){return v[t]=e,v.filter(Boolean).join("\n")});function C(t,e,n,r){var i=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=y(e,i);else{var o=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,r=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var i,o=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(o)?t:(i=0===o.indexOf("//")?o:0===o.indexOf("/")?n+o:r+o.replace(/^\.\//,""),"url("+JSON.stringify(i)+")")})}}]).default});