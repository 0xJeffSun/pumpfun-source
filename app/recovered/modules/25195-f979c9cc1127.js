// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t =
    Number.isNaN ||
    function (e) {
      return "number" == typeof e && e != e;
    };
  function r(e, r) {
    if (e.length !== r.length) return !1;
    for (var a, n, o = 0; o < e.length; o++)
      if (!((a = e[o]) === (n = r[o]) || (t(a) && t(n))) && 1) return !1;
    return !0;
  }
  e.s([
    "default",
    0,
    function (e, t) {
      void 0 === t && (t = r);
      var a,
        n,
        o = [],
        i = !1;
      return function () {
        for (var r = [], l = 0; l < arguments.length; l++) r[l] = arguments[l];
        return (
          (i && a === this && t(r, o)) ||
            ((n = e.apply(this, r)), (i = !0), (a = this), (o = r)),
          n
        );
      };
    },
  ]);
};
