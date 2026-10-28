// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  !(function (n, i) {
    if ("function" == typeof define && define.amd) {
      let n;
      void 0 !== (n = i(e.r, r, t)) && e.v(n);
    } else t.exports = i();
  })(e.e, function () {
    var e,
      t,
      r,
      n = {};
    n.version = "0.2.0";
    var i = (n.settings = {
      minimum: 0.08,
      easing: "ease",
      positionUsing: "",
      speed: 200,
      trickle: !0,
      trickleRate: 0.02,
      trickleSpeed: 800,
      showSpinner: !0,
      barSelector: '[role="bar"]',
      spinnerSelector: '[role="spinner"]',
      parent: "body",
      template:
        '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
    });
    function a(e, t, r) {
      return e < t ? t : e > r ? r : e;
    }
    ((n.configure = function (e) {
      var t, r;
      for (t in e) void 0 !== (r = e[t]) && e.hasOwnProperty(t) && (i[t] = r);
      return this;
    }),
      (n.status = null),
      (n.set = function (e) {
        var t = n.isStarted();
        n.status = 1 === (e = a(e, i.minimum, 1)) ? null : e;
        var r = n.render(!t),
          l = r.querySelector(i.barSelector),
          c = i.speed,
          u = i.easing;
        return (
          r.offsetWidth,
          s(function (t) {
            var a, s, d, m;
            ("" === i.positionUsing &&
              (i.positionUsing = n.getPositioningCSS()),
              o(
                l,
                ((a = e),
                (s = c),
                (d = u),
                ((m =
                  "translate3d" === i.positionUsing
                    ? { transform: "translate3d(" + (-1 + a) * 100 + "%,0,0)" }
                    : "translate" === i.positionUsing
                      ? { transform: "translate(" + (-1 + a) * 100 + "%,0)" }
                      : { "margin-left": (-1 + a) * 100 + "%" }).transition =
                  "all " + s + "ms " + d),
                m),
              ),
              1 === e
                ? (o(r, { transition: "none", opacity: 1 }),
                  r.offsetWidth,
                  setTimeout(function () {
                    (o(r, { transition: "all " + c + "ms linear", opacity: 0 }),
                      setTimeout(function () {
                        (n.remove(), t());
                      }, c));
                  }, c))
                : setTimeout(t, c));
          }),
          this
        );
      }),
      (n.isStarted = function () {
        return "number" == typeof n.status;
      }),
      (n.start = function () {
        n.status || n.set(0);
        var e = function () {
          setTimeout(function () {
            n.status && (n.trickle(), e());
          }, i.trickleSpeed);
        };
        return (i.trickle && e(), this);
      }),
      (n.done = function (e) {
        return e || n.status ? n.inc(0.3 + 0.5 * Math.random()).set(1) : this;
      }),
      (n.inc = function (e) {
        var t = n.status;
        return t
          ? ("number" != typeof e &&
              (e = (1 - t) * a(Math.random() * t, 0.1, 0.95)),
            (t = a(t + e, 0, 0.994)),
            n.set(t))
          : n.start();
      }),
      (n.trickle = function () {
        return n.inc(Math.random() * i.trickleRate);
      }),
      (e = 0),
      (t = 0),
      (n.promise = function (r) {
        return (
          r &&
            "resolved" !== r.state() &&
            (0 === t && n.start(),
            e++,
            t++,
            r.always(function () {
              0 == --t ? ((e = 0), n.done()) : n.set((e - t) / e);
            })),
          this
        );
      }),
      (n.render = function (e) {
        if (n.isRendered()) return document.getElementById("nprogress");
        c(document.documentElement, "nprogress-busy");
        var t = document.createElement("div");
        ((t.id = "nprogress"), (t.innerHTML = i.template));
        var r,
          a = t.querySelector(i.barSelector),
          s = e ? "-100" : (-1 + (n.status || 0)) * 100,
          l = document.querySelector(i.parent);
        return (
          o(a, {
            transition: "all 0 linear",
            transform: "translate3d(" + s + "%,0,0)",
          }),
          !i.showSpinner && (r = t.querySelector(i.spinnerSelector)) && m(r),
          l != document.body && c(l, "nprogress-custom-parent"),
          l.appendChild(t),
          t
        );
      }),
      (n.remove = function () {
        (u(document.documentElement, "nprogress-busy"),
          u(document.querySelector(i.parent), "nprogress-custom-parent"));
        var e = document.getElementById("nprogress");
        e && m(e);
      }),
      (n.isRendered = function () {
        return !!document.getElementById("nprogress");
      }),
      (n.getPositioningCSS = function () {
        var e = document.body.style,
          t =
            "WebkitTransform" in e
              ? "Webkit"
              : "MozTransform" in e
                ? "Moz"
                : "msTransform" in e
                  ? "ms"
                  : "OTransform" in e
                    ? "O"
                    : "";
        return t + "Perspective" in e
          ? "translate3d"
          : t + "Transform" in e
            ? "translate"
            : "margin";
      }));
    var s =
        ((r = []),
        function (e) {
          (r.push(e),
            1 == r.length &&
              (function e() {
                var t = r.shift();
                t && t(e);
              })());
        }),
      o = (function () {
        var e = ["Webkit", "O", "Moz", "ms"],
          t = {};
        function r(r, n, i) {
          var a;
          ((n =
            t[
              (a = (a = n)
                .replace(/^-ms-/, "ms-")
                .replace(/-([\da-z])/gi, function (e, t) {
                  return t.toUpperCase();
                }))
            ] ||
            (t[a] = (function (t) {
              var r = document.body.style;
              if (t in r) return t;
              for (
                var n, i = e.length, a = t.charAt(0).toUpperCase() + t.slice(1);
                i--;

              )
                if ((n = e[i] + a) in r) return n;
              return t;
            })(a))),
            (r.style[n] = i));
        }
        return function (e, t) {
          var n,
            i,
            a = arguments;
          if (2 == a.length)
            for (n in t)
              void 0 !== (i = t[n]) && t.hasOwnProperty(n) && r(e, n, i);
          else r(e, a[1], a[2]);
        };
      })();
    function l(e, t) {
      return ("string" == typeof e ? e : d(e)).indexOf(" " + t + " ") >= 0;
    }
    function c(e, t) {
      var r = d(e),
        n = r + t;
      l(r, t) || (e.className = n.substring(1));
    }
    function u(e, t) {
      var r,
        n = d(e);
      l(e, t) &&
        (e.className = (r = n.replace(" " + t + " ", " ")).substring(
          1,
          r.length - 1,
        ));
    }
    function d(e) {
      return (" " + (e.className || "") + " ").replace(/\s+/gi, " ");
    }
    function m(e) {
      e && e.parentNode && e.parentNode.removeChild(e);
    }
    return n;
  });
};
