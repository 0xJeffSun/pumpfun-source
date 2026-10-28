// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(511518);
  e.s([
    "f",
    0,
    function (e, r) {
      return "function" == typeof e
        ? e(r)
        : e && "object" == typeof e && t.C in e
          ? e[t.C](r)
          : e instanceof Date
            ? new e.constructor(r)
            : new Date(r);
    },
  ]);
};
