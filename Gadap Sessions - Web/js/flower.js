(function() {
  var DragDrop, Kaleidoscope, c, dragger, gui, i, image, kaleidoscope, len, onChange, onMouseMoved, options, ref, tr, tx, ty, update,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Kaleidoscope = (function() {
    Kaleidoscope.prototype.HALF_PI = Math.PI / 2;

    Kaleidoscope.prototype.TWO_PI = Math.PI * 2;

    function Kaleidoscope(options1) {
      var key, ref, ref1, val;
      this.options = options1 != null ? options1 : {};
      this.defaults = {
        offsetRotation: 0.0,
        offsetScale: 1.0,
        offsetX: 0.0,
        offsetY: 0.0,
        radius: 1100,
        slices: 12,
        zoom: .5
      };
      ref = this.defaults;
      for (key in ref) {
        val = ref[key];
        this[key] = val;
      }
      ref1 = this.options;
      for (key in ref1) {
        val = ref1[key];
        this[key] = val;
      }
      if (this.domElement == null) {
        this.domElement = document.createElement('canvas');
      }
      if (this.context == null) {
        this.context = this.domElement.getContext('2d');
      }
      if (this.image == null) {
        this.image = document.createElement('img');
      }
    }

    Kaleidoscope.prototype.draw = function() {
      var cx, i, index, ref, results, scale, step;
      this.domElement.width = this.domElement.height = this.radius * 2;
      this.context.fillStyle = this.context.createPattern(this.image, 'repeat');
      scale = this.zoom * (this.radius / Math.min(this.image.width, this.image.height));
      step = this.TWO_PI / this.slices;
      cx = this.image.width / 2;
      results = [];
      for (index = i = 0, ref = this.slices; 0 <= ref ? i <= ref : i >= ref; index = 0 <= ref ? ++i : --i) {
        this.context.save();
        this.context.translate(this.radius, this.radius);
        this.context.rotate(index * step);
        this.context.beginPath();
        this.context.moveTo(-0.5, -0.5);
        this.context.arc(0, 0, this.radius, step * -0.51, step * 0.51);
        this.context.lineTo(0.5, 0.5);
        this.context.closePath();
        this.context.rotate(this.HALF_PI);
        this.context.scale(scale, scale);
        this.context.scale([-1, 1][index % 2], 1);
        this.context.translate(this.offsetX - cx, this.offsetY);
        this.context.rotate(this.offsetRotation);
        this.context.scale(this.offsetScale, this.offsetScale);
        this.context.fill();
        results.push(this.context.restore());
      }
      return results;
    };

    return Kaleidoscope;

  })();

  DragDrop = (function() {
    function DragDrop(callback, context, filter) {
      var disable;
      this.callback = callback;
      this.context = context != null ? context : document;
      this.filter = filter != null ? filter : /^image/i;
      this.onDrop = bind(this.onDrop, this);
      disable = function(event) {
        event.stopPropagation();
        return event.preventDefault();
      };
      this.context.addEventListener('dragleave', disable);
      this.context.addEventListener('dragenter', disable);
      this.context.addEventListener('dragover', disable);
      this.context.addEventListener('drop', this.onDrop, false);
    }

    DragDrop.prototype.onDrop = function(event) {
      var file, reader;
      event.stopPropagation();
      event.preventDefault();
      file = event.dataTransfer.files[0];
      if (this.filter.test(file.type)) {
        reader = new FileReader;
        reader.onload = (function(_this) {
          return function(event) {
            return typeof _this.callback === "function" ? _this.callback(event.target.result) : void 0;
          };
        })(this);
        return reader.readAsDataURL(file);
      }
    };

    return DragDrop;

  })();

  image = new Image;

  image.onload = (function(_this) {
    return function() {
      return kaleidoscope.draw();
    };
  })(this);

  image.src = 'https://s3.amazonaws.com/websiteimagery/kalair_home.jpg';

  kaleidoscope = new Kaleidoscope({
    image: image,
    slices: 20
  });

  kaleidoscope.domElement.style.position = 'absolute';

  kaleidoscope.domElement.style.marginLeft = -kaleidoscope.radius + 'px';

  kaleidoscope.domElement.style.marginTop = -kaleidoscope.radius + 'px';

  kaleidoscope.domElement.style.left = '50%';

  kaleidoscope.domElement.style.top = '50%';

  document.body.appendChild(kaleidoscope.domElement);

  dragger = new DragDrop(function(data) {
    return kaleidoscope.image.src = data;
  });

  tx = kaleidoscope.offsetX;

  ty = kaleidoscope.offsetY;

  tr = kaleidoscope.offsetRotation;

  onMouseMoved = (function(_this) {
    return function(event) {
      var cx, cy, dx, dy, hx, hy;
      cx = window.innerWidth / 2;
      cy = window.innerHeight / 2;
      dx = event.pageX / window.innerWidth;
      dy = event.pageY / window.innerHeight;
      hx = dx - 0.5;
      hy = dy - 0.5;
      tx = hx * kaleidoscope.radius * -2;
      ty = hy * kaleidoscope.radius * 2;
      return tr = Math.atan2(hy, hx);
    };
  })(this);

  window.addEventListener('mousemove', onMouseMoved, false);

  options = {
    interactive: true,
    ease: 0.01
  };

  (update = (function(_this) {
    return function() {
      var delta, theta;
      if (options.interactive) {
        delta = tr - kaleidoscope.offsetRotation;
        theta = Math.atan2(Math.sin(delta), Math.cos(delta));
        kaleidoscope.offsetX += (tx - kaleidoscope.offsetX) * options.ease;
        kaleidoscope.offsetY += (ty - kaleidoscope.offsetY) * options.ease;
        kaleidoscope.offsetRotation += (theta - kaleidoscope.offsetRotation) * options.ease;
        kaleidoscope.draw();
      }
      return setTimeout(update, 1000 / 60);
    };
  })(this))();

  gui = new dat.GUI;

  gui.add(kaleidoscope, 'zoom').min(0.25).max(2.0);

  gui.add(kaleidoscope, 'slices').min(6).max(32).step(2);

  gui.add(kaleidoscope, 'radius').min(200).max(500);

  gui.add(kaleidoscope, 'offsetX').min(-kaleidoscope.radius).max(kaleidoscope.radius).listen();

  gui.add(kaleidoscope, 'offsetY').min(-kaleidoscope.radius).max(kaleidoscope.radius).listen();

  gui.add(kaleidoscope, 'offsetRotation').min(-Math.PI).max(Math.PI).listen();

  gui.add(kaleidoscope, 'offsetScale').min(0.5).max(4.0);

  gui.add(options, 'interactive').listen();

  gui.close();

  onChange = (function(_this) {
    return function() {
      kaleidoscope.domElement.style.marginLeft = -kaleidoscope.radius + 'px';
      kaleidoscope.domElement.style.marginTop = -kaleidoscope.radius + 'px';
      options.interactive = false;
      return kaleidoscope.draw();
    };
  })(this);

  ref = gui.__controllers;
  for (i = 0, len = ref.length; i < len; i++) {
    c = ref[i];
    if (c.property !== 'interactive') {
      c.onChange(onChange);
    }
  }

}).call(this);







// var doc = document,
//     win = window,
//     body = doc.body;

// var ww = win.innerWidth,
//     wh = win.innerHeight;

// var c = doc.createElement('canvas'),
//     ctx = c.getContext('2d');

// var half_PI = Math.PI / 2,
//     two_PI = Math.PI * 2,
//     ease = .001;


// var img = new Image();
// img.src = 'https://s3.amazonaws.com/websiteimagery/kalair_3.jpg';

// var k = {
//     offsetRotation: 0,
//     offsetScale: .8,
//     offsetX: 0,
//     offsetY: 0,
//     radius: 1100,
//     slices: 16,
//     zoom: 1.18,
//     maxSlices: 32,
//     minSlices: 6
// };

// body.appendChild(c);
// c.width = k.radius * 2;
// c.height = k.radius * 2;

// function draw(){
//     var scale, step, cx;
      
//     ctx.fillStyle = ctx.createPattern(img, 'repeat');
    
//     scale = k.zoom * (k.radius / Math.min(img.width, img.height));
//     step = two_PI / k.slices;
//     cx = img.width / 2;
      
//     for (var i = 0; i <= k.slices; i++) {
//         ctx.save();
//         ctx.translate(k.radius, k.radius);
//         ctx.rotate(i * step);
//         ctx.beginPath();
//         ctx.moveTo(-0.5, -0.5);
//         ctx.arc(0, 0, k.radius, step * -0.51, step * 0.51);
//         ctx.rotate(half_PI);
//         ctx.scale(scale, scale);
//         ctx.scale([ -1,1 ][i % 2], 1);
//         ctx.translate(k.offsetX - cx, k.offsetY);
//         ctx.rotate(k.offsetRotation);
//         ctx.scale(k.offsetScale, k.offsetScale); 
//         ctx.fill();
        
//         ctx.restore();
        
//     }
    
// }


// var tx = k.offsetX;
// var ty = k.offsetY;
// var tr = k.offsetRotation;


// win.addEventListener('mousemove', mousemove, false);
// function mousemove(e){
//     var cx, cy, dx, dy, hx, hy;
//     cx = ww / 2;
//     cy = wh / 2;
//     dx = e.pageX / ww;
//     dy = e.pageY / wh;
//     hx = dx - 0.1;
//     hy = dy - 0.1;
//     tx = hx * k.radius * -.8;
//     ty = hy * k.radius * .8;
// }

// c.style.position = 'fixed';
// c.style.marginLeft = -k.radius + 'px';
// c.style.marginTop = -k.radius + 'px'; 
// c.style.left = '50%';
// c.style.top = '50%';

// function update() {
//     tr -= 0.002; 
    
//     k.offsetX += (tx - k.offsetX) * ease;
//     k.offsetY += (ty - k.offsetY) * ease;
//     k.offsetRotation += (tr - k.offsetRotation) * ease; 
    
//     draw();
    
//     requestAnimationFrame(update);
// };
// update();









// !function e(t, n, i) {
//     function o(a, s) {
//         if (!n[a]) {
//             if (!t[a]) {
//                 var c = "function" == typeof require && require;
//                 if (!s && c)
//                     return c(a, !0);
//                 if (r)
//                     return r(a, !0);
//                 var l = new Error("Cannot find module '" + a + "'");
//                 throw l.code = "MODULE_NOT_FOUND",
//                 l
//             }
//             var u = n[a] = {
//                 exports: {}
//             };
//             t[a][0].call(u.exports, function(e) {
//                 var n = t[a][1][e];
//                 return o(n ? n : e)
//             }, u, u.exports, e, t, n, i)
//         }
//         return n[a].exports
//     }
//     for (var r = "function" == typeof require && require, a = 0; a < i.length; a++)
//         o(i[a]);
//     return o
// }({
//     1: [function(e, t, n) {
//         !function() {
//             "use strict";
//             function e(t, n) {
//                 function o(e, t) {
//                     return function() {
//                         return e.apply(t, arguments)
//                     }
//                 }
//                 var r;
//                 if (n = n || {},
//                 this.trackingClick = !1,
//                 this.trackingClickStart = 0,
//                 this.targetElement = null ,
//                 this.touchStartX = 0,
//                 this.touchStartY = 0,
//                 this.lastTouchIdentifier = 0,
//                 this.touchBoundary = n.touchBoundary || 10,
//                 this.layer = t,
//                 this.tapDelay = n.tapDelay || 200,
//                 this.tapTimeout = n.tapTimeout || 700,
//                 !e.notNeeded(t)) {
//                     for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], s = this, c = 0, l = a.length; l > c; c++)
//                         s[a[c]] = o(s[a[c]], s);
//                     i && (t.addEventListener("mouseover", this.onMouse, !0),
//                     t.addEventListener("mousedown", this.onMouse, !0),
//                     t.addEventListener("mouseup", this.onMouse, !0)),
//                     t.addEventListener("click", this.onClick, !0),
//                     t.addEventListener("touchstart", this.onTouchStart, !1),
//                     t.addEventListener("touchmove", this.onTouchMove, !1),
//                     t.addEventListener("touchend", this.onTouchEnd, !1),
//                     t.addEventListener("touchcancel", this.onTouchCancel, !1),
//                     Event.prototype.stopImmediatePropagation || (t.removeEventListener = function(e, n, i) {
//                         var o = Node.prototype.removeEventListener;
//                         "click" === e ? o.call(t, e, n.hijacked || n, i) : o.call(t, e, n, i)
//                     }
//                     ,
//                     t.addEventListener = function(e, n, i) {
//                         var o = Node.prototype.addEventListener;
//                         "click" === e ? o.call(t, e, n.hijacked || (n.hijacked = function(e) {
//                             e.propagationStopped || n(e)
//                         }
//                         ), i) : o.call(t, e, n, i)
//                     }
//                     ),
//                     "function" == typeof t.onclick && (r = t.onclick,
//                     t.addEventListener("click", function(e) {
//                         r(e)
//                     }, !1),
//                     t.onclick = null )
//                 }
//             }
//             var n = navigator.userAgent.indexOf("Windows Phone") >= 0
//               , i = navigator.userAgent.indexOf("Android") > 0 && !n
//               , o = /iP(ad|hone|od)/.test(navigator.userAgent) && !n
//               , r = o && /OS 4_\d(_\d)?/.test(navigator.userAgent)
//               , a = o && /OS [6-7]_\d/.test(navigator.userAgent)
//               , s = navigator.userAgent.indexOf("BB10") > 0;
//             e.prototype.needsClick = function(e) {
//                 switch (e.nodeName.toLowerCase()) {
//                 case "button":
//                 case "select":
//                 case "textarea":
//                     if (e.disabled)
//                         return !0;
//                     break;
//                 case "input":
//                     if (o && "file" === e.type || e.disabled)
//                         return !0;
//                     break;
//                 case "label":
//                 case "iframe":
//                 case "video":
//                     return !0
//                 }
//                 return /\bneedsclick\b/.test(e.className)
//             }
//             ,
//             e.prototype.needsFocus = function(e) {
//                 switch (e.nodeName.toLowerCase()) {
//                 case "textarea":
//                     return !0;
//                 case "select":
//                     return !i;
//                 case "input":
//                     switch (e.type) {
//                     case "button":
//                     case "checkbox":
//                     case "file":
//                     case "image":
//                     case "radio":
//                     case "submit":
//                         return !1
//                     }
//                     return !e.disabled && !e.readOnly;
//                 default:
//                     return /\bneedsfocus\b/.test(e.className)
//                 }
//             }
//             ,
//             e.prototype.sendClick = function(e, t) {
//                 var n, i;
//                 document.activeElement && document.activeElement !== e && document.activeElement.blur(),
//                 i = t.changedTouches[0],
//                 n = document.createEvent("MouseEvents"),
//                 n.initMouseEvent(this.determineEventType(e), !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null ),
//                 n.forwardedTouchEvent = !0,
//                 e.dispatchEvent(n)
//             }
//             ,
//             e.prototype.determineEventType = function(e) {
//                 return i && "select" === e.tagName.toLowerCase() ? "mousedown" : "click"
//             }
//             ,
//             e.prototype.focus = function(e) {
//                 var t;
//                 o && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type && "month" !== e.type ? (t = e.value.length,
//                 e.setSelectionRange(t, t)) : e.focus()
//             }
//             ,
//             e.prototype.updateScrollParent = function(e) {
//                 var t, n;
//                 if (t = e.fastClickScrollParent,
//                 !t || !t.contains(e)) {
//                     n = e;
//                     do {
//                         if (n.scrollHeight > n.offsetHeight) {
//                             t = n,
//                             e.fastClickScrollParent = n;
//                             break
//                         }
//                         n = n.parentElement
//                     } while (n)
//                 }
//                 t && (t.fastClickLastScrollTop = t.scrollTop)
//             }
//             ,
//             e.prototype.getTargetElementFromEventTarget = function(e) {
//                 return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
//             }
//             ,
//             e.prototype.onTouchStart = function(e) {
//                 var t, n, i;
//                 if (e.targetTouches.length > 1)
//                     return !0;
//                 if (t = this.getTargetElementFromEventTarget(e.target),
//                 n = e.targetTouches[0],
//                 o) {
//                     if (i = window.getSelection(),
//                     i.rangeCount && !i.isCollapsed)
//                         return !0;
//                     if (!r) {
//                         if (n.identifier && n.identifier === this.lastTouchIdentifier)
//                             return e.preventDefault(),
//                             !1;
//                         this.lastTouchIdentifier = n.identifier,
//                         this.updateScrollParent(t)
//                     }
//                 }
//                 return this.trackingClick = !0,
//                 this.trackingClickStart = e.timeStamp,
//                 this.targetElement = t,
//                 this.touchStartX = n.pageX,
//                 this.touchStartY = n.pageY,
//                 e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(),
//                 !0
//             }
//             ,
//             e.prototype.touchHasMoved = function(e) {
//                 var t = e.changedTouches[0]
//                   , n = this.touchBoundary;
//                 return Math.abs(t.pageX - this.touchStartX) > n || Math.abs(t.pageY - this.touchStartY) > n ? !0 : !1
//             }
//             ,
//             e.prototype.onTouchMove = function(e) {
//                 return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1,
//                 this.targetElement = null ),
//                 !0) : !0
//             }
//             ,
//             e.prototype.findControl = function(e) {
//                 return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
//             }
//             ,
//             e.prototype.onTouchEnd = function(e) {
//                 var t, n, s, c, l, u = this.targetElement;
//                 if (!this.trackingClick)
//                     return !0;
//                 if (e.timeStamp - this.lastClickTime < this.tapDelay)
//                     return this.cancelNextClick = !0,
//                     !0;
//                 if (e.timeStamp - this.trackingClickStart > this.tapTimeout)
//                     return !0;
//                 if (this.cancelNextClick = !1,
//                 this.lastClickTime = e.timeStamp,
//                 n = this.trackingClickStart,
//                 this.trackingClick = !1,
//                 this.trackingClickStart = 0,
//                 a && (l = e.changedTouches[0],
//                 u = document.elementFromPoint(l.pageX - window.pageXOffset, l.pageY - window.pageYOffset) || u,
//                 u.fastClickScrollParent = this.targetElement.fastClickScrollParent),
//                 s = u.tagName.toLowerCase(),
//                 "label" === s) {
//                     if (t = this.findControl(u)) {
//                         if (this.focus(u),
//                         i)
//                             return !1;
//                         u = t
//                     }
//                 } else if (this.needsFocus(u))
//                     return e.timeStamp - n > 100 || o && window.top !== window && "input" === s ? (this.targetElement = null ,
//                     !1) : (this.focus(u),
//                     this.sendClick(u, e),
//                     o && "select" === s || (this.targetElement = null ,
//                     e.preventDefault()),
//                     !1);
//                 return o && !r && (c = u.fastClickScrollParent,
//                 c && c.fastClickLastScrollTop !== c.scrollTop) ? !0 : (this.needsClick(u) || (e.preventDefault(),
//                 this.sendClick(u, e)),
//                 !1)
//             }
//             ,
//             e.prototype.onTouchCancel = function() {
//                 this.trackingClick = !1,
//                 this.targetElement = null
//             }
//             ,
//             e.prototype.onMouse = function(e) {
//                 return this.targetElement ? e.forwardedTouchEvent ? !0 : e.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0,
//                 e.stopPropagation(),
//                 e.preventDefault(),
//                 !1) : !0 : !0
//             }
//             ,
//             e.prototype.onClick = function(e) {
//                 var t;
//                 return this.trackingClick ? (this.targetElement = null ,
//                 this.trackingClick = !1,
//                 !0) : "submit" === e.target.type && 0 === e.detail ? !0 : (t = this.onMouse(e),
//                 t || (this.targetElement = null ),
//                 t)
//             }
//             ,
//             e.prototype.destroy = function() {
//                 var e = this.layer;
//                 i && (e.removeEventListener("mouseover", this.onMouse, !0),
//                 e.removeEventListener("mousedown", this.onMouse, !0),
//                 e.removeEventListener("mouseup", this.onMouse, !0)),
//                 e.removeEventListener("click", this.onClick, !0),
//                 e.removeEventListener("touchstart", this.onTouchStart, !1),
//                 e.removeEventListener("touchmove", this.onTouchMove, !1),
//                 e.removeEventListener("touchend", this.onTouchEnd, !1),
//                 e.removeEventListener("touchcancel", this.onTouchCancel, !1)
//             }
//             ,
//             e.notNeeded = function(e) {
//                 var t, n, o, r;
//                 if ("undefined" == typeof window.ontouchstart)
//                     return !0;
//                 if (n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
//                     if (!i)
//                         return !0;
//                     if (t = document.querySelector("meta[name=viewport]")) {
//                         if (-1 !== t.content.indexOf("user-scalable=no"))
//                             return !0;
//                         if (n > 31 && document.documentElement.scrollWidth <= window.outerWidth)
//                             return !0
//                     }
//                 }
//                 if (s && (o = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),
//                 o[1] >= 10 && o[2] >= 3 && (t = document.querySelector("meta[name=viewport]")))) {
//                     if (-1 !== t.content.indexOf("user-scalable=no"))
//                         return !0;
//                     if (document.documentElement.scrollWidth <= window.outerWidth)
//                         return !0
//                 }
//                 return "none" === e.style.msTouchAction || "manipulation" === e.style.touchAction ? !0 : (r = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1],
//                 r >= 27 && (t = document.querySelector("meta[name=viewport]"),
//                 t && (-1 !== t.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === e.style.touchAction || "manipulation" === e.style.touchAction ? !0 : !1)
//             }
//             ,
//             e.attach = function(t, n) {
//                 return new e(t,n)
//             }
//             ,
//             "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
//                 return e
//             }) : "undefined" != typeof t && t.exports ? (t.exports = e.attach,
//             t.exports.FastClick = e) : window.FastClick = e
//         }()
//     }
//     , {}],
//     2: [function(e, t, n) {
//         !function(e, i) {
//             "function" == typeof define && define.amd ? define([], function() {
//                 return e.svg4everybody = i()
//             }) : "object" == typeof n ? t.exports = i() : e.svg4everybody = i()
//         }(this, function() {
//             function e(e, t) {
//                 if (t) {
//                     var n = !e.getAttribute("viewBox") && t.getAttribute("viewBox")
//                       , i = document.createDocumentFragment()
//                       , o = t.cloneNode(!0);
//                     for (n && e.setAttribute("viewBox", n); o.childNodes.length; )
//                         i.appendChild(o.firstChild);
//                     e.appendChild(i)
//                 }
//             }
//             function t(t) {
//                 t.onreadystatechange = function() {
//                     if (4 === t.readyState) {
//                         var n = document.createElement("x");
//                         n.innerHTML = t.responseText,
//                         t.s.splice(0).map(function(t) {
//                             e(t[0], n.querySelector("#" + t[1].replace(/(\W)/g, "\\$1")))
//                         })
//                     }
//                 }
//                 ,
//                 t.onreadystatechange()
//             }
//             function n(n) {
//                 function i() {
//                     for (var n, d, f = 0; f < r.length; )
//                         if (n = r[f],
//                         d = n.parentNode,
//                         d && /svg/i.test(d.nodeName)) {
//                             var h = n.getAttribute("xlink:href");
//                             if (o) {
//                                 var m = new Image
//                                   , p = d.getAttribute("width")
//                                   , g = d.getAttribute("height");
//                                 m.src = a(h, d, n),
//                                 p && m.setAttribute("width", p),
//                                 g && m.setAttribute("height", g),
//                                 d.replaceChild(m, n)
//                             } else if (s && (!c || c(h, d, n))) {
//                                 var v = h.split("#")
//                                   , w = v[0]
//                                   , y = v[1];
//                                 if (d.removeChild(n),
//                                 w.length) {
//                                     var b = u[w] = u[w] || new XMLHttpRequest;
//                                     b.s || (b.s = [],
//                                     b.open("GET", w),
//                                     b.send()),
//                                     b.s.push([d, y]),
//                                     t(b)
//                                 } else
//                                     e(d, document.getElementById(y))
//                             }
//                         } else
//                             f += 1;
//                     l(i, 17)
//                 }
//                 n = n || {};
//                 var o, r = document.getElementsByTagName("use"), a = n.fallback || function(e) {
//                     return e.replace(/\?[^#]+/, "").replace("#", ".").replace(/^\./, "") + ".png" + (/\?[^#]+/.exec(e) || [""])[0]
//                 }
//                 ;
//                 o = "nosvg"in n ? n.nosvg : /\bMSIE [1-8]\b/.test(navigator.userAgent),
//                 o && (document.createElement("svg"),
//                 document.createElement("use"));
//                 var s = "polyfill"in n ? n.polyfill : o || /\bEdge\/12\b|\bMSIE [1-8]\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537
//                   , c = n.validate
//                   , l = window.requestAnimationFrame || setTimeout
//                   , u = {};
//                 s && i()
//             }
//             return n
//         })
//     }
//     , {}],
//     3: [function(e, t, n) {
//         "use strict";
//         function i(e) {
//             return e && e.__esModule ? e : {
//                 "default": e
//             }
//         }
//         function o(e, t) {
//             if (!(e instanceof t))
//                 throw new TypeError("Cannot call a class as a function")
//         }
//         Object.defineProperty(n, "__esModule", {
//             value: !0
//         });
//         var r = function() {
//             function e(e, t) {
//                 for (var n = 0; n < t.length; n++) {
//                     var i = t[n];
//                     i.enumerable = i.enumerable || !1,
//                     i.configurable = !0,
//                     "value"in i && (i.writable = !0),
//                     Object.defineProperty(e, i.key, i)
//                 }
//             }
//             return function(t, n, i) {
//                 return n && e(t.prototype, n),
//                 i && e(t, i),
//                 t
//             }
//         }()
//           , a = e("./components/PolyfillsHandler")
//           , s = i(a)
//           , c = e("fastclick")
//           , l = e("svg4everybody")
//           , u = i(l)
//           , d = e("./components/kaleidoscope")
//           , f = i(d)
//           , h = e("./components/welcome")
//           , m = i(h)
//           , p = e("./components/share")
//           , g = i(p)
//           , v = e("./components/counter")
//           , w = i(v)
//           , y = function() {
//             function e() {
//                 o(this, e)
//             }
//             return r(e, [{
//                 key: "construct",
//                 value: function() {
//                     this["super"].apply(this, arguments)
//                 }
//             }, {
//                 key: "run",
//                 value: function() {
//                     var e = new s["default"]
//                       , t = new f["default"]
//                       , n = new m["default"]
//                       , i = new g["default"]
//                       , o = new w["default"];
//                     switch (e.init(),
//                     t.init(),
//                     n.init(),
//                     i.init(),
//                     o.init(),
//                     (0,
//                     u["default"])(),
//                     document.body.getAttribute("data-page")) {
//                     case "home":
//                         this.homepage()
//                     }
//                 }
//             }, {
//                 key: "homepage",
//                 value: function() {
//                     var e = new ExampleComponent;
//                     e.init()
//                 }
//             }]),
//             e
//         }();
//         n["default"] = y;
//         var b = new y;
//         $(document).ready(function() {
//             c.FastClick.attach(document.body),
//             b.run()
//         }),
//         t.exports = n["default"]
//     }
//     , {
//         "./components/PolyfillsHandler": 4,
//         "./components/counter": 5,
//         "./components/kaleidoscope": 6,
//         "./components/share": 9,
//         "./components/welcome": 11,
//         fastclick: 1,
//         svg4everybody: 2
//     }],
//     4: [function(e, t, n) {
//         "use strict";
//         function i(e, t) {
//             if (!(e instanceof t))
//                 throw new TypeError("Cannot call a class as a function")
//         }
//         Object.defineProperty(n, "__esModule", {
//             value: !0
//         });
//         var o = function() {
//             function e(e, t) {
//                 for (var n = 0; n < t.length; n++) {
//                     var i = t[n];
//                     i.enumerable = i.enumerable || !1,
//                     i.configurable = !0,
//                     "value"in i && (i.writable = !0),
//                     Object.defineProperty(e, i.key, i)
//                 }
//             }
//             return function(t, n, i) {
//                 return n && e(t.prototype, n),
//                 i && e(t, i),
//                 t
//             }
//         }()
//           , r = function() {
//             function e() {
//                 i(this, e)
//             }
//             return o(e, [{
//                 key: "init",
//                 value: function() {
//                     Modernizr.csspointerevents || PointerEventsPolyfill.initialize({})
//                 }
//             }]),
//             e
//         }();
//         n["default"] = r,
//         t.exports = n["default"]
//     }
//     , {}],
//     5: [function(e, t, n) {
//         "use strict";
//         function i(e, t) {
//             if (!(e instanceof t))
//                 throw new TypeError("Cannot call a class as a function")
//         }
//         Object.defineProperty(n, "__esModule", {
//             value: !0
//         });
//         var o = function() {
//             function e(e, t) {
//                 for (var n = 0; n < t.length; n++) {
//                     var i = t[n];
//                     i.enumerable = i.enumerable || !1,
//                     i.configurable = !0,
//                     "value"in i && (i.writable = !0),
//                     Object.defineProperty(e, i.key, i)
//                 }
//             }
//             return function(t, n, i) {
//                 return n && e(t.prototype, n),
//                 i && e(t, i),
//                 t
//             }
//         }()
//           , r = e("./loader")
//           , a = function() {
//             function e() {
//                 i(this, e)
//             }
//             return o(e, [{
//                 key: "init",
//                 value: function() {
//                     function e() {
//                         $(".dl-welcome").remove()
//                     }
//                     function t(n) {
//                         var i = n;
//                         if (3 > i && $(".js-welcome_number").toggleClass("anim-in"),
//                         window.setTimeout(function() {
//                             $(".js-welcome_number").html(i)
//                         }, 250),
//                         i > 0) {
//                             window.setTimeout(function() {
//                                 i--,
//                                 t(i)
//                             }, 1e3)
//                         } else
//                             $(".dl-welcome").addClass("anim-out"),
//                             $(".dl-mainLogo").addClass("anim-in"),
//                             window.setTimeout(e, 2e3)
//                     }
//                     $(".dl-welcome_center").addClass("anim-in"),
//                     $(".dl-welcome_quote").addClass("anim-in"),
//                     $(".dl-welcome_message").addClass("anim-in"),
//                     r.loader.once("complete", function() {
//                         $(".dl-welcome_bottom").addClass("anim-in"),
//                         $(".dl-welcome_counter").addClass("anim-in"),
//                         $(".dl-welcome_loader_container").addClass("anim-out"),
//                         window.setTimeout(function() {
//                             t(3)
//                         }, 500)
//                     })
//                 }
//             }]),
//             e
//         }();
//         n["default"] = a,
//         t.exports = n["default"]
//     }
//     , {
//         "./loader": 7
//     }],
//     6: [function(e, t, n) {
//         "use strict";
//         function i(e, t) {
//             if (!(e instanceof t))
//                 throw new TypeError("Cannot call a class as a function")
//         }
//         Object.defineProperty(n, "__esModule", {
//             value: !0
//         });
//         var o = function() {
//             function e(e, t) {
//                 for (var n = 0; n < t.length; n++) {
//                     var i = t[n];
//                     i.enumerable = i.enumerable || !1,
//                     i.configurable = !0,
//                     "value"in i && (i.writable = !0),
//                     Object.defineProperty(e, i.key, i)
//                 }
//             }
//             return function(t, n, i) {
//                 return n && e(t.prototype, n),
//                 i && e(t, i),
//                 t
//             }
//         }()
//           , r = e("./sharedTick")
//           , a = e("./loader")
//           , s = e("./mobileDetect")
//           , c = function() {
//             function e() {
//                 i(this, e)
//             }
//             return o(e, [{
//                 key: "init",
//                 value: function() {
//                     if (void 0 != window.devicePixelRatio)
//                         if (-1 != navigator.userAgent.indexOf("Safari") && -1 == navigator.userAgent.indexOf("Chrome"))
//                             var e = 1;
//                         else
//                             var e = window.devicePixelRatio;
//                     else
//                         var e = 1;
//                     var t, n, i, o = 0, c = $(window).width(), l = $(window).height(), u = new FULLTILT.getDeviceOrientation({
//                         type: "world"
//                     });
//                     u.then(function(e) {
//                         i = e
//                     })["catch"](function(e) {});
//                     var d = (document.getElementById("Xaxis"),
//                     document.getElementById("Yaxis"),
//                     document.getElementById("Zaxis"),
//                     document.getElementById("capture"))
//                       , f = d.getContext("2d");
//                     f.scale(2, 2);
//                     var h = new Image;
//                     h.src = "../images/logo-header.png";
//                     var m = !1;
//                     h.onload = function() {
//                         m = !0
//                     }
//                     ;
//                     var p, g, v, w, y, b, k, C, E, T, _, x, I, S, P, M = ["../img/kalair_1.jpg", "../img/kalair_2.jpg", "../img/kalair_3.jpg"], j = ["../img/kalair_1_small.jpg", "../img/kalair_2_small.jpg", "../img/kalair_3_small.jpg"], L = 0;
//                     p = function() {
//                         function u(u) {
//                             var d, f, h, m;
//                             this.options = null != u ? u : {},
//                             this.defaults = {
//                                 offsetRotation: 0,
//                                 offsetScale: 1,
//                                 offsetX: 0,
//                                 offsetY: 0,
//                                 radius: c / 2,
//                                 radiusX: c / 2,
//                                 radiusY: l / 2,
//                                 zoom: 1.18,
//                                 maxSlices: 32,
//                                 minSlices: 6
//                             },
//                             f = this.defaults;
//                             for (d in f)
//                                 m = f[d],
//                                 this[d] = m;
//                             h = this.options;
//                             for (d in h)
//                                 m = h[d],
//                                 this[d] = m;
//                             null == this.renderer && (this.renderer = PIXI.autoDetectRenderer(c, l, {
//                                 antialias: !0,
//                                 backgroundColor: 1087931,
//                                 preserveDrawingBuffer: !0
//                             }),
//                             Modernizr.cssvhunit && Modernizr.cssvwunit ? (this.renderer.view.style.width = "100vw",
//                             this.renderer.view.style.height = "100vh") : (this.renderer.view.style.width = "100%",
//                             this.renderer.view.style.height = "100%"),
//                             this.renderer.view.style.position = "absolute",
//                             this.renderer.view.style.left = "0",
//                             this.renderer.view.style.top = "0",
//                             s.md.mobile() || (this.renderer.resolution = e),
//                             document.body.appendChild(this.renderer.view),
//                             this.renderer.resize(c, l)),
//                             null == this.stage && (this.stage = new PIXI.Container,
//                             this.container = new PIXI.Container,
//                             this.arc = [],
//                             this.sprite = [],
//                             this.piece = []);
//                             var p = this;
//                             a.loader.once("complete", function() {
//                                 s.md.mobile() || s.md.phone() || s.md.tablet() ? (p.image = PIXI.Texture.fromImage("../img/kalair_1_small.jpg"),
//                                 r.ticker.add(function() {
//                                     if (t = r.ticker.deltaTime,
//                                     o += .09,
//                                     i) {
//                                         var e = (i.getScreenAdjustedQuaternion(),
//                                         i.getScreenAdjustedMatrix(),
//                                         i.getScreenAdjustedEuler());
//                                         w.offsetX += (6 * e.beta - w.offsetX) * w.easeMobile + o,
//                                         w.offsetY += (6 * e.gamma - w.offsetY) * w.easeMobile * t,
//                                         w.offsetRotation += (.02 * e.alpha - w.offsetRotation) * w.easeMobile * t
//                                     }
//                                     w.draw()
//                                 })) : (p.image = PIXI.Texture.fromImage("../img/kalair_1.jpg"),
//                                 r.ticker.add(function() {
//                                     o += .03,
//                                     t = r.ticker.deltaTime,
//                                     n = r.ticker.elapsedMS;
//                                     var e;
//                                     e = Math.atan2(Math.sin(T), Math.cos(T)),
//                                     w.offsetX += (_ - w.offsetX) * w.ease + o,
//                                     w.offsetY += (x - w.offsetY) * w.ease,
//                                     w.offsetRotation += (.25 * e - w.offsetRotation) * w.ease,
//                                     w.draw()
//                                 })),
//                                 p.init()
//                             })
//                         }
//                         return u.prototype.HALF_PI = Math.PI / 2,
//                         u.prototype.TWO_PI = 2 * Math.PI,
//                         u.prototype.init = function() {
//                             for (this.piece = [],
//                             this.sprite = [],
//                             this.arc = [],
//                             this.container = new PIXI.Container,
//                             this.stage.removeChildren(),
//                             S = g = 0,
//                             E = this.slices; E >= 0 ? E >= g : g >= E; S = E >= 0 ? ++g : --g)
//                                 P = this.TWO_PI / this.slices,
//                                 this.piece.push(new PIXI.Container),
//                                 this.arc.push(new PIXI.Graphics),
//                                 this.sprite.push(new PIXI.extras.TilingSprite(this.image,3 * c,3 * c)),
//                                 this.piece[g].addChild(this.arc[g]),
//                                 this.piece[g].addChild(this.sprite[g]),
//                                 this.container.addChild(this.piece[g]),
//                                 this.arc[g].moveTo(this.radiusX, this.radiusY),
//                                 this.arc[g].beginFill(0),
//                                 this.arc[g].arc(this.radiusX, this.radiusY, 10 * this.radiusX, P * -.51, .51 * P),
//                                 this.piece[g].pivot.x = this.radiusX,
//                                 this.piece[g].pivot.y = this.radiusY,
//                                 this.piece[g].rotation = S * P,
//                                 this.sprite[g].mask = this.arc[g],
//                                 this.sprite[g].tileScale.y = [1, -1][S % 2],
//                                 s.md.phone() && (this.sprite[g].tileScale.y = [.5, -.5][S % 2],
//                                 this.sprite[g].tileScale.x = .5),
//                                 this.sprite[g].position.y = l / 2 - this.image.height / 2;
//                             this.container.position.x = this.radiusX,
//                             this.container.position.y = this.radiusY,
//                             this.stage.addChild(this.container),
//                             this.draw()
//                         }
//                         ,
//                         u.prototype.draw = function() {
//                             var e, t, n, i, o, r, a;
//                             for (this.renderer.render(this.stage),
//                             r = this.zoom * (this.radius / Math.min(c, l)),
//                             a = this.TWO_PI / this.slices,
//                             e = this.image.width / 2,
//                             o = [],
//                             n = t = 0,
//                             i = this.slices; i >= 0 ? i >= t : t >= i; n = i >= 0 ? ++t : --t)
//                                 this.sprite[t].tilePosition.x = this.offsetX,
//                                 this.sprite[t].tilePosition.y = [-1 * this.offsetY, this.offsetY][n % 2];
//                             return this.container.rotation = this.offsetRotation,
//                             o
//                         }
//                         ,
//                         u
//                     }(),
//                     w = new p({
//                         image: v,
//                         slices: 16,
//                         ease: .075,
//                         easeMobile: .2
//                     }),
//                     _ = w.offsetX,
//                     x = w.offsetY,
//                     T = w.offsetRotation,
//                     I = w.zoom,
//                     y = function(e) {
//                         return function(e) {
//                             var t, n, i, o;
//                             return t = e.pageX / c,
//                             n = e.pageY / l,
//                             i = t - .5,
//                             o = n - .5,
//                             _ = i * w.radius * -2,
//                             x = o * w.radius * 2,
//                             T = Math.atan2(o, i)
//                         }
//                     }(this),
//                     k = function(e) {
//                         return function(e) {
//                             c = $(window).width(),
//                             l = $(window).height(),
//                             w.radius = c / 2,
//                             w.radiusX = c / 2,
//                             w.radiusY = l / 2,
//                             w.renderer.resize(c, l),
//                             w.container.position.x = w.radiusX,
//                             w.container.position.y = w.radiusY
//                         }
//                     }(this),
//                     b = function(e) {
//                         return function(e) {
//                             a.secondLoaded && (2 == L ? L = 0 : L++,
//                             s.md.mobile() ? w.image = PIXI.Texture.fromImage(j[L]) : w.image = PIXI.Texture.fromImage(M[L]),
//                             w.init())
//                         }
//                     }(this),
//                     C = function(t) {
//                         m && 68 == t.which && (d.width = w.renderer.view.width,
//                         d.height = w.renderer.view.height,
//                         f.drawImage(w.renderer.view, 0, 0),
//                         s.md.mobile() || f.drawImage(h, d.width / 2 - h.width / 2 * e / 2, 0, h.width / 2 * e, h.height / 2 * e),
//                         window.open(d.toDataURL("image/png")))
//                     }
//                     ,
//                     $(window).keydown(C),
//                     window.addEventListener("resize", k, !1),
//                     window.addEventListener("mousemove", y, !1);
//                     var X = document.getElementById("clickHack");
//                     X.addEventListener("click", b, !1)
//                 }
//             }]),
//             e
//         }();
//         n["default"] = c,
//         t.exports = n["default"]
//     }
//     , {
//         "./loader": 7,
//         "./mobileDetect": 8,
//         "./sharedTick": 10
//     }],
//     7: [function(e, t, n) {
//         "use strict";
//         function i() {
//             o.md.mobile() ? (a.add("second_illustration", "../img/kalair_2.jpg"),
//             a.add("third_illustration", "../img/kalair_3.jpg")) : (a.add("second_illustration", "../img/kalair_2.jpg"),
//             a.add("third_illustration", "../img/kalair_3.jpg")),
//             a.load(),
//             a.once("complete", function() {
//                 n.secondLoaded = s = !0
//             })
//         }
//         Object.defineProperty(n, "__esModule", {
//             value: !0
//         });
//         var o = e("./mobileDetect")
//           , r = PIXI.loader;
//         n.loader = r;
//         var a = PIXI.loader;
//         n.loader_secondary = a;
//         var s = !1;
//         n.secondLoaded = s,
//         o.md.mobile() ? r.add("first_illustration", "../img/kalair_1.jpg") : r.add("first_illustration", "../img/kalair_1.jpg"),
//         r.load(),
//         r.once("complete", i)
//     }
//     , {
//         "./mobileDetect": 8
//     }],
//     8: [function(e, t, n) {
//         "use strict";
//         Object.defineProperty(n, "__esModule", {
//             value: !0
//         });
//         var i = new MobileDetect(navigator.userAgent);
//         n.md = i
//     }
//     , {}],
//     9: [function(e, t, n) {
//         "use strict";
//         function i(e, t) {
//             if (!(e instanceof t))
//                 throw new TypeError("Cannot call a class as a function")
//         }
//         Object.defineProperty(n, "__esModule", {
//             value: !0
//         });
//         var o = function() {
//             function e(e, t) {
//                 for (var n = 0; n < t.length; n++) {
//                     var i = t[n];
//                     i.enumerable = i.enumerable || !1,
//                     i.configurable = !0,
//                     "value"in i && (i.writable = !0),
//                     Object.defineProperty(e, i.key, i)
//                 }
//             }
//             return function(t, n, i) {
//                 return n && e(t.prototype, n),
//                 i && e(t, i),
//                 t
//             }
//         }()
//           , r = function() {
//             function e() {
//                 i(this, e)
//             }
//             return o(e, [{
//                 key: "init",
//                 value: function() {
//                     var e = new MobileDetect(navigator.userAgent);
//                     e.mobile() || e.phone() || e.tablet() ? $(".js-share_open").on("click", function() {
//                         $(".dl-svg_share").toggleClass("is-visible"),
//                         $(".dl-svg_close").toggleClass("is-visible"),
//                         $(".js-share_list").toggleClass("is-active")
//                     }) : $(".js-footer_item-share").addClass("no-mobile"),
//                     e.phone() || $(".dl-share_item-whatsapp").remove()
//                 }
//             }]),
//             e
//         }();
//         n["default"] = r,
//         t.exports = n["default"]
//     }
//     , {}],
//     10: [function(e, t, n) {
//         "use strict";
//         Object.defineProperty(n, "__esModule", {
//             value: !0
//         });
//         var i = PIXI.ticker.shared;
//         n.ticker = i
//     }
//     , {}],
//     11: [function(e, t, n) {
//         "use strict";
//         function i(e, t) {
//             if (!(e instanceof t))
//                 throw new TypeError("Cannot call a class as a function")
//         }
//         Object.defineProperty(n, "__esModule", {
//             value: !0
//         });
//         var o = function() {
//             function e(e, t) {
//                 for (var n = 0; n < t.length; n++) {
//                     var i = t[n];
//                     i.enumerable = i.enumerable || !1,
//                     i.configurable = !0,
//                     "value"in i && (i.writable = !0),
//                     Object.defineProperty(e, i.key, i)
//                 }
//             }
//             return function(t, n, i) {
//                 return n && e(t.prototype, n),
//                 i && e(t, i),
//                 t
//             }
//         }()
//           , r = function() {
//             function e() {
//                 i(this, e)
//             }
//             return o(e, [{
//                 key: "init",
//                 value: function() {}
//             }]),
//             e
//         }();
//         n["default"] = r,
//         t.exports = n["default"]
//     }
//     , {}]
// }, {}, [3]);
