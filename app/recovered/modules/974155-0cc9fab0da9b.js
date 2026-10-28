// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(895453),
    n = e.i(970961);
  e.s([
    "f",
    0,
    function (e) {
      let t = (0, n.f)(e);
      return "string" === t || "function" === t || e instanceof RegExp;
    },
    "c",
    0,
    function (e, n, r = !1) {
      return e.some((e) => {
        try {
          if ("function" == typeof e) return e(n);
          if (e instanceof RegExp) return e.test(n);
          if ("string" == typeof e) return r ? n.startsWith(e) : e === n;
        } catch (e) {
          t.s.error(e);
        }
        return !1;
      });
    },
  ]);
};
