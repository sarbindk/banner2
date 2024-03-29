(function() {
    'use strict';
    var g;
    var l = ["-ms-", "-moz-", "-webkit-", ""],
        m = function(a, c) {
            for (var b, d, e = 0; e < l.length; ++e) b = l[e] + "transition-duration", d = "" + c, a.style.setProperty(b, d)
        };

    function n(a, c, b, d, e, h, f) {
        this.j = a;
        this.f = c;
        this.w = b;
        a = d || "none";
        this.l = e = "none" === a ? 0 : e || 1E3;
        this.g = h || "linear";
        this.i = [];
        if (e) {
            h = f || "top";
            if (f = this.j) {
                f.classList.add("gwd-page");
                f.classList.add("center");
                f = "center";
                if ("push" == a) switch (h) {
                    case "top":
                        f = "top";
                        break;
                    case "bottom":
                        f = "bottom";
                        break;
                    case "left":
                        f = "left";
                        break;
                    case "right":
                        f = "right"
                }
                this.i.push(f);
                "fade" == a && this.i.push("transparent")
            }
            f = this.f;
            e = "center";
            if ("none" != a && "fade" != a) switch (h) {
                case "top":
                    e = "bottom";
                    break;
                case "bottom":
                    e = "top";
                    break;
                case "left":
                    e = "right";
                    break;
                case "right":
                    e = "left"
            }
            f.classList.add(e);
            f.classList.add("gwd-page");
            "fade" == a && f.classList.add("transparent")
        }
    }
    n.prototype.start = function() {
        if (this.l) {
            var a = this.j,
                c = this.f;
            p(c, this.J.bind(this));
            a && (m(a, this.l + "ms"), a.classList.add(this.g));
            m(c, this.l + "ms");
            c.classList.add(this.g);
            c.setAttribute("gwd-reflow", c.offsetWidth);
            if (a)
                for (var b = 0; b < this.i.length; ++b) a.classList.add(this.i[b]);
            q(c)
        } else this.w()
    };
    var r = function(a, c, b, d) {
            b = "transform: matrix3d(1,0,0,0,0,1,0,0,0,0,1,0," + b + "," + d + ",0,1);";
            return a + "." + c + "{-webkit-" + b + "-moz-" + b + "-ms-" + b + b + "}"
        },
        t = "center top bottom left right transparent".split(" "),
        q = function(a) {
            t.forEach(function(c) {
                a.classList.remove(c)
            })
        },
        p = function(a, c) {
            var b = function() {
                a.removeEventListener("webkitTransitionEnd", b);
                a.removeEventListener("transitionend", b);
                c()
            };
            a.addEventListener("webkitTransitionEnd", b);
            a.addEventListener("transitionend", b)
        };
    n.prototype.J = function() {
        var a = this.j;
        a && (q(a), m(a, 0), a.classList.remove(this.g));
        m(this.f, 0);
        this.f.classList.remove(this.g);
        this.w()
    };
    var u = function(a, c, b) {
            if (b) {
                var d = document.createEvent("CustomEvent");
                d.initCustomEvent(a, !0, !0, b)
            } else d = document.createEvent("Event"), d.initEvent(a, !0, !0);
            c.dispatchEvent(d)
        },
        w = function(a, c) {
            var b = function(d) {
                a.removeEventListener("attached", b);
                c(d)
            };
            a.addEventListener("attached", b)
        };
    var x = function() {};
    goog.inherits(x, HTMLDivElement);
    x.prototype.createdCallback = function() {
        window.addEventListener("WebComponentsReady", this.I.bind(this), !1);
        this.u = this.h.bind(this, "shake");
        this.v = this.h.bind(this, "tilt");
        this.s = this.h.bind(this, "rotatetoportrait");
        this.o = this.h.bind(this, "rotatetolandscape");
        this.a = [];
        this.A = this.H.bind(this);
        this.D = this.F.bind(this);
        this.c = this.B = null;
        this.b = -1;
        this.m = !1;
        this.classList.add("gwd-pagedeck");
        Object.defineProperty(this, "currentIndex", {
            enumerable: !0,
            get: this.G.bind(this)
        })
    };
    x.prototype.I = function() {
        this.a = Array.prototype.slice.call(this.querySelectorAll("div[is=gwd-page]"));
        this.a.forEach(function(a) {
            a.classList.add("gwd-page")
        });
        for (u("beforepagesdetached", this, {
                pages: this.a.slice()
            }); this.firstChild;) this.removeChild(this.firstChild); - 1 == this.b && void 0 !== this.C && this.goToPage(this.C)
    };
    x.prototype.attachedCallback = function() {
        if (!this.B) {
            var a = this.id;
            var c = this.offsetWidth;
            var b = this.offsetHeight;
            a = (a && "#") + a + ".gwd-pagedeck > .gwd-page";
            c = r(a, "center", 0, 0) + r(a, "top", 0, b) + r(a, "bottom", 0, -b) + r(a, "left", c, 0) + r(a, "right", -c, 0);
            b = document.createElement("style");
            void 0 !== b.cssText ? b.cssText = c : b.innerHTML = c;
            document.head.appendChild(b);
            this.B = b
        }
        this.addEventListener("pageload", this.A, !1);
        document.body.addEventListener("shake", this.u, !0);
        document.body.addEventListener("tilt", this.v, !0);
        document.body.addEventListener("rotatetoportrait", this.s, !0);
        document.body.addEventListener("rotatetolandscape", this.o, !0)
    };
    x.prototype.detachedCallback = function() {
        this.removeEventListener("pageload", this.A, !1);
        document.body && (document.body.removeEventListener("shake", this.u, !0), document.body.removeEventListener("tilt", this.v, !0), document.body.removeEventListener("rotatetoportrait", this.s, !0), document.body.removeEventListener("rotatetolandscape", this.o, !0))
    };
    var z = function(a, c, b, d, e, h) {
        if (!(a.b == c || 0 > c || c > a.a.length - 1 || a.c)) {
            var f = a.a[a.b],
                k = a.a[c];
            a.b = c;
            a.c = new n(f, k, a.D, b, d, e, h);
            var v = k.gwdLoad && !k.gwdIsLoaded();
            a.m = v;
            w(k, function() {
                k.gwdActivate();
                v ? k.gwdLoad() : y(this)
            }.bind(a));
            a.appendChild(k)
        }
    };
    x.prototype.H = function(a) {
        this.m && a.target.parentNode == this && (y(this), this.m = !1)
    };
    var y = function(a) {
        u("pagetransitionstart", a);
        a.c.start()
    };
    g = x.prototype;
    g.F = function() {
        if (this.c) {
            var a = this.c.j,
                c = this.c.f;
            this.c = null;
            u("pagetransitionend", this, {
                outgoingPage: a ? a : null,
                incomingPage: c
            });
            a && a.gwdDeactivate();
            c.gwdPresent()
        }
    };
    g.findPageIndexByAttributeValue = function(a, c) {
        for (var b = this.a.length, d, e = 0; e < b; e++)
            if (d = this.a[e], "boolean" == typeof c) {
                if (d.hasAttribute(a)) return e
            } else if (d.getAttribute(a) == c) return e;
        return -1
    };
    g.goToNextPage = function(a, c, b, d, e) {
        var h = this.b,
            f = h + 1;
        f >= this.a.length && (f = a ? 0 : h);
        z(this, f, c, b, d, e)
    };
    g.goToPreviousPage = function(a, c, b, d, e) {
        var h = this.b,
            f = this.a.length,
            k = h - 1;
        0 > k && (k = a ? f - 1 : h);
        z(this, k, c, b, d, e)
    };
    g.goToPage = function(a, c, b, d, e) {
        this.a.length ? (a = "number" == typeof a ? a : this.findPageIndexByAttributeValue("id", a), 0 <= a && z(this, a, c, b, d, e)) : this.C = a
    };
    g.G = function() {
        return 0 <= this.b ? this.b : void 0
    };
    g.getPages = function() {
        return this.a
    };
    g.getPage = function(a) {
        if ("number" != typeof a) {
            if (!a) return null;
            a = this.findPageIndexByAttributeValue("id", a)
        }
        return 0 > a || a > this.a.length - 1 ? null : this.a[a]
    };
    g.getCurrentPage = function() {
        return this.getPage(this.b)
    };
    g.getDefaultPage = function() {
        var a = this.getAttribute("default-page");
        return a ? this.getPage(this.findPageIndexByAttributeValue("id", a)) : this.getPage(0)
    };
    g.getOrientationSpecificPage = function(a, c) {
        c = this.getPage(c);
        var b = c.getAttribute("alt-orientation-page");
        if (!b) return c;
        var d = c.isPortrait();
        a = 1 == a;
        b = this.getPage(b);
        return a == d ? c : b
    };
    g.h = function(a, c) {
        if (c.target == document.body) {
            var b = this.getPage(this.b);
            u(a, b, c.detail)
        }
    };
    g.getElementById = function(a) {
        for (var c = this.a.length, b = 0; b < c; b++) {
            var d = this.a[b].querySelector("#" + a);
            if (d) return d
        }
        return null
    };
    g.getElementsBySelector = function(a) {
        for (var c = this.a.length, b = [], d = 0; d < c; d++) {
            var e = this.a[d].querySelectorAll(a);
            e && (b = b.concat(Array.prototype.slice.call(e)))
        }
        return b
    };
    g.attributeChangedCallback = function() {};
    document.registerElement("gwd-pagedeck", {
        prototype: x.prototype,
        "extends": "div"
    });
}).call(this);