// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, t, r) {
      let n = e[t.name];
      if ("function" == typeof n) return n;
      let i = e[r];
      return "function" == typeof i ? i : (r) => t(e, r);
    },
  ]);
};
