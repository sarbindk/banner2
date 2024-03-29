(function() {
    'use strict';
    var c;
    var e = function(a, b, f) {
        if (f) {
            var d = document.createEvent("CustomEvent");
            d.initCustomEvent(a, !0, !0, f)
        } else d = document.createEvent("Event"), d.initEvent(a, !0, !0);
        b.dispatchEvent(d);
        return d
    };
    var g = [],
        h = function(a) {
            a = g.indexOf(a);
            0 <= a && g.splice(a, 1)
        };
    document.addEventListener("click", function(a) {
        for (var b = 0; b < g.length; b++)
            if (25 > Math.abs(a.clientX - g[b].m) && 25 > Math.abs(a.clientY - g[b].o) || 25 > Math.abs(a.screenX - g[b].A) && 25 > Math.abs(a.screenY - g[b].B)) g.splice(b, 1), a.stopPropagation(), a.preventDefault()
    }, !0);
    var k = function() {};
    goog.inherits(k, HTMLElement);
    c = k.prototype;
    c.createdCallback = function() {
        this.l = this.j = 0;
        this.f = this.b = this.g = this.c = null;
        this.a = !0;
        this.h = this.s.bind(this)
    };
    c.attachedCallback = function() {
        this.b || (this.c = this.i.bind(this), this.g = this.w.bind(this), this.b = this.v.bind(this), this.f = this.u.bind(this));
        this.addEventListener("click", this.c, !1);
        this.addEventListener("touchstart", this.g, !1);
        this.addEventListener("action", this.h, !1)
    };
    c.detachedCallback = function() {
        this.removeEventListener("click", this.c, !1);
        this.removeEventListener("touchstart", this.g, !1);
        this.removeEventListener("action", this.h, !1)
    };
    c.i = function(a) {
        this.a && e("action", this, a);
        this.a = !0
    };
    c.w = function(a) {
        this.addEventListener("touchmove", this.b, !1);
        this.addEventListener("touchend", this.f, !1);
        a = a.touches[0];
        this.j = a.clientX;
        this.l = a.clientY
    };
    c.u = function(a) {
        this.i(a);
        this.removeEventListener("touchmove", this.b, !1);
        this.removeEventListener("touchend", this.f, !1);
        a = a.changedTouches[0];
        a = {
            m: a.clientX,
            o: a.clientY,
            A: a.screenX,
            B: a.screenY
        };
        g.push(a);
        setTimeout(h.bind(null, a), 2500)
    };
    c.v = function(a) {
        a = a.touches[0];
        this.a = this.a && 10 >= Math.abs(this.j - a.clientX) && 10 >= Math.abs(this.l - a.clientY)
    };
    c.s = function(a) {
        var b = this.getAttribute("exit-id"),
            f = this.getAttribute("product-index"),
            d = this.getAttribute("exit-override-url");
        d && !e("tapareaexit", this, {
            "exit-id": b,
            url: d,
            "product-index": f,
            "action-event": a.detail
        }).detail.handled && window.open(d)
    };
    c.attributeChangedCallback = function() {};
    document.registerElement("gwd-taparea", {
        prototype: k.prototype
    });
}).call(this);