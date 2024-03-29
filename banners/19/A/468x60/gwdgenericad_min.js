(function() {
    'use strict';
    var b;
    var d = function() {};
    goog.inherits(d, HTMLElement);
    b = d.prototype;
    b.createdCallback = function() {
        document.body.style.opacity = "0";
        this.c = this.f.bind(this);
        this.b = this.a = null
    };
    b.attachedCallback = function() {
        this.a = this.querySelector("[is=gwd-pagedeck]");
        window.addEventListener("resize", this.c, !1)
    };
    b.detachedCallback = function() {
        window.removeEventListener("resize", this.c, !1)
    };
    b.initAd = function() {
        document.body.style.opacity = "";
        var a = document.createEvent("Event");
        a.initEvent("adinitialized", !0, !0);
        this.dispatchEvent(a);
        this.goToPage()
    };
    b.goToPage = function(a, c, e, f, g) {
        this.a.getPage(this.a.currentIndex);
        if (a = a ? this.a.getPage(a) : this.a.getDefaultPage()) a = this.a.getOrientationSpecificPage(window.innerHeight >= window.innerWidth ? 1 : 2, a.id), c ? this.a.goToPage(a.id, c, e, f, g) : this.a.goToPage(a.id)
    };
    b.f = function() {
        var a = window.innerHeight >= window.innerWidth ? 1 : 2;
        this.b != a && (this.b = a, (a = this.a.getPage(this.a.currentIndex)) && this.goToPage(a.id))
    };
    b.exit = function(a, c, e) {
        window.open(a, "_newtab");
        c && this.goToPage(e)
    };
    b.attributeChangedCallback = function() {};
    document.registerElement("gwd-genericad", {
        prototype: d.prototype
    });
}).call(this);