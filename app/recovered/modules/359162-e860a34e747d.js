// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(895453);
  e.s([
    "f",
    0,
    function (e, n) {
      return (...r) => {
        try {
          return e(...r);
        } catch (e) {
          t.s.error(n, e);
        }
      };
    },
  ]);
};
