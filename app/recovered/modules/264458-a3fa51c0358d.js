// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  !(function () {
    "use strict";
    var r = {}.hasOwnProperty;
    function n() {
      for (var e = "", t = 0; t < arguments.length; t++) {
        var o = arguments[t];
        o &&
          (e = i(
            e,
            (function (e) {
              if ("string" == typeof e || "number" == typeof e) return e;
              if ("object" != typeof e) return "";
              if (Array.isArray(e)) return n.apply(null, e);
              if (
                e.toString !== Object.prototype.toString &&
                !e.toString.toString().includes("[native code]")
              )
                return e.toString();
              var t = "";
              for (var o in e) r.call(e, o) && e[o] && (t = i(t, o));
              return t;
            })(o),
          ));
      }
      return e;
    }
    function i(e, t) {
      return t ? (e ? e + " " + t : e + t) : e;
    }
    if (t.exports) ((n.default = n), (t.exports = n));
    else if (
      "function" == typeof define &&
      "object" == typeof define.amd &&
      define.amd
    )
      void 0 !== n && e.v(n);
    else window.classNames = n;
  })();
};
