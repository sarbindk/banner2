(function() {
    'use strict';
    var b = function(a, d) {
        var f = document.createEvent("Event");
        f.initEvent(a, !0, !0);
        d.dispatchEvent(f)
    };
    var c = function() {};
    goog.inherits(c, HTMLDivElement);
    c.prototype.createdCallback = function() {
        this.h = this.i.bind(this);
        this.a = [];
        this.g = this.b = this.f = !1;
        var a = parseInt(this.getAttribute("data-gwd-width"), 10) || this.clientWidth;
        this.j = (parseInt(this.getAttribute("data-gwd-height"), 10) || this.clientHeight) >= a;
        this.c = !1
    };
    c.prototype.attachedCallback = function() {
        this.addEventListener("ready", this.h, !1);
        setTimeout(function() {
            this.a = Array.prototype.slice.call(this.querySelectorAll("*")).filter(function(a) {
                return "function" != typeof a.gwdLoad || "function" != typeof a.gwdIsLoaded || a.gwdIsLoaded() ? !1 : !0
            }, this);
            this.g = !0;
            0 < this.a.length ? (this.style.visibility = "hidden", this.f = !1) : e(this);
            this.b = !0;
            b("attached", this)
        }.bind(this), 0)
    };
    c.prototype.detachedCallback = function() {
        this.removeEventListener("ready", this.h, !1);
        this.classList.remove("gwd-play-animation");
        b("detached", this)
    };
    c.prototype.gwdActivate = function() {
        this.classList.remove("gwd-inactive");
        Array.prototype.slice.call(this.querySelectorAll("*")).forEach(function(a) {
            "function" == typeof a.gwdActivate && "function" == typeof a.gwdIsActive && 0 == a.gwdIsActive() && a.gwdActivate()
        });
        this.c = !0;
        this.b ? this.b = !1 : b("attached", this);
        b("pageactivated", this)
    };
    c.prototype.gwdDeactivate = function() {
        this.classList.add("gwd-inactive");
        this.classList.remove("gwd-play-animation");
        var a = Array.prototype.slice.call(this.querySelectorAll(".gwd-pause-animation"));
        a.push(this);
        a.forEach(function(a) {
            a.classList.remove("gwd-pause-animation")
        });
        g(this);
        Array.prototype.slice.call(this.querySelectorAll("*")).forEach(function(a) {
            "function" == typeof a.gwdDeactivate && "function" == typeof a.gwdIsActive && 1 == a.gwdIsActive() && a.gwdDeactivate()
        });
        this.c = !1;
        b("pagedeactivated", this);
        b("detached", this)
    };
    var g = function(a) {
        var d = Array.prototype.slice.call(a.querySelectorAll("[data-gwd-current-label]"));
        a.hasAttribute("data-gwd-current-label") && d.push(a);
        d.forEach(function(a) {
            var d = a.getAttribute("data-gwd-current-label");
            a.classList.remove(d);
            a.removeAttribute("data-gwd-current-label")
        })
    };
    c.prototype.gwdIsActive = function() {
        return this.c
    };
    c.prototype.gwdIsLoaded = function() {
        return this.g && 0 == this.a.length
    };
    c.prototype.gwdLoad = function() {
        if (this.gwdIsLoaded()) e(this);
        else
            for (var a = this.a.length - 1; 0 <= a; a--) this.a[a].gwdLoad()
    };
    c.prototype.i = function(a) {
        a = this.a.indexOf(a.target);
        0 <= a && (this.a.splice(a, 1), 0 == this.a.length && e(this))
    };
    var e = function(a) {
        a.style.visibility = "";
        a.f || (b("ready", a), b("pageload", a));
        a.f = !0
    };
    c.prototype.gwdPresent = function() {
        b("pagepresenting", this);
        this.classList.add("gwd-play-animation")
    };
    c.prototype.isPortrait = function() {
        return this.j
    };
    c.prototype.attributeChangedCallback = function() {};
    document.registerElement("gwd-page", {
        prototype: c.prototype,
        "extends": "div"
    });
}).call(this);