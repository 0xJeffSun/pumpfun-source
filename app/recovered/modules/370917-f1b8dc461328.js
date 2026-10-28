// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, t) {
      return ({ exclude: s, format: i }) => ({
        exclude: s,
        format: (e, r) => {
          let n = t(e, r);
          if (s) for (let e of s) delete n[e];
          return { ...n, ...i(e, r) };
        },
        type: e,
      });
    },
  ]);
};
