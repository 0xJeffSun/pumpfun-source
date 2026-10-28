// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  !(function (n, i) {
    "use strict";
    if ("function" == typeof define && define.amd) {
      let n;
      void 0 !== (n = i(e.r, r, t)) && e.v(n);
    } else t.exports ? (t.exports = i()) : (n.log = i());
  })(e.e, function () {
    "use strict";
    var e = function () {},
      t = "undefined",
      r =
        typeof window !== t &&
        typeof window.navigator !== t &&
        /Trident\/|MSIE /.test(window.navigator.userAgent),
      n = ["trace", "debug", "info", "warn", "error"],
      i = {},
      o = null;
    function a(e, t) {
      var r = e[t];
      if ("function" == typeof r.bind) return r.bind(e);
      try {
        return Function.prototype.bind.call(r, e);
      } catch (t) {
        return function () {
          return Function.prototype.apply.apply(r, [e, arguments]);
        };
      }
    }
    function s() {
      (console.log &&
        (console.log.apply
          ? console.log.apply(console, arguments)
          : Function.prototype.apply.apply(console.log, [console, arguments])),
        console.trace && console.trace());
    }
    function l() {
      for (var r = this.getLevel(), i = 0; i < n.length; i++) {
        var o = n[i];
        this[o] = i < r ? e : this.methodFactory(o, r, this.name);
      }
      if (
        ((this.log = this.debug),
        typeof console === t && r < this.levels.SILENT)
      )
        return "No console available for logging";
    }
    function u(e) {
      return function () {
        typeof console !== t && (l.call(this), this[e].apply(this, arguments));
      };
    }
    function d(n, i, o) {
      var l;
      return (
        "debug" === (l = n) && (l = "log"),
        (typeof console !== t &&
          ("trace" === l && r
            ? s
            : void 0 !== console[l]
              ? a(console, l)
              : void 0 !== console.log
                ? a(console, "log")
                : e)) ||
          u.apply(this, arguments)
      );
    }
    function c(e, r) {
      var a,
        s,
        u,
        c = this,
        f = "loglevel";
      function h() {
        var e;
        if (typeof window !== t && f) {
          try {
            e = window.localStorage[f];
          } catch (e) {}
          if (typeof e === t)
            try {
              var r = window.document.cookie,
                n = encodeURIComponent(f),
                i = r.indexOf(n + "=");
              -1 !== i && (e = /^([^;]+)/.exec(r.slice(i + n.length + 1))[1]);
            } catch (e) {}
          return (void 0 === c.levels[e] && (e = void 0), e);
        }
      }
      function p(e) {
        var t = e;
        if (
          ("string" == typeof t &&
            void 0 !== c.levels[t.toUpperCase()] &&
            (t = c.levels[t.toUpperCase()]),
          "number" == typeof t && t >= 0 && t <= c.levels.SILENT)
        )
          return t;
        throw TypeError("log.setLevel() called with invalid level: " + e);
      }
      ("string" == typeof e
        ? (f += ":" + e)
        : "symbol" == typeof e && (f = void 0),
        (c.name = e),
        (c.levels = {
          TRACE: 0,
          DEBUG: 1,
          INFO: 2,
          WARN: 3,
          ERROR: 4,
          SILENT: 5,
        }),
        (c.methodFactory = r || d),
        (c.getLevel = function () {
          return null != u ? u : null != s ? s : a;
        }),
        (c.setLevel = function (e, r) {
          return (
            (u = p(e)),
            !1 !== r &&
              (function (e) {
                var r = (n[e] || "silent").toUpperCase();
                if (typeof window !== t && f) {
                  try {
                    window.localStorage[f] = r;
                    return;
                  } catch (e) {}
                  try {
                    window.document.cookie =
                      encodeURIComponent(f) + "=" + r + ";";
                  } catch (e) {}
                }
              })(u),
            l.call(c)
          );
        }),
        (c.setDefaultLevel = function (e) {
          ((s = p(e)), h() || c.setLevel(e, !1));
        }),
        (c.resetLevel = function () {
          if (((u = null), typeof window !== t && f)) {
            try {
              window.localStorage.removeItem(f);
            } catch (e) {}
            try {
              window.document.cookie =
                encodeURIComponent(f) +
                "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            } catch (e) {}
          }
          l.call(c);
        }),
        (c.enableAll = function (e) {
          c.setLevel(c.levels.TRACE, e);
        }),
        (c.disableAll = function (e) {
          c.setLevel(c.levels.SILENT, e);
        }),
        (c.rebuild = function () {
          if ((o !== c && (a = p(o.getLevel())), l.call(c), o === c))
            for (var e in i) i[e].rebuild();
        }),
        (a = p(o ? o.getLevel() : "WARN")));
      var g = h();
      (null != g && (u = p(g)), l.call(c));
    }
    (o = new c()).getLogger = function (e) {
      if (("symbol" != typeof e && "string" != typeof e) || "" === e)
        throw TypeError("You must supply a name when creating a logger.");
      var t = i[e];
      return (t || (t = i[e] = new c(e, o.methodFactory)), t);
    };
    var f = typeof window !== t ? window.log : void 0;
    return (
      (o.noConflict = function () {
        return (typeof window !== t && window.log === o && (window.log = f), o);
      }),
      (o.getLoggers = function () {
        return i;
      }),
      (o.default = o),
      o
    );
  });
};
