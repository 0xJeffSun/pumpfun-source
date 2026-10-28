// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "x",
    0,
    function (e, t) {
      for (let n = e.length - 1; n >= 0; n -= 1) {
        let r = e[n];
        if (t(r, n, e)) return r;
      }
    },
    "_",
    0,
    function (e) {
      return Object.entries(e);
    },
    "k",
    0,
    function (e) {
      return Object.values(e);
    },
  ]);
};
