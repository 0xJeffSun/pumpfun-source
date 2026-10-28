// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, t) {
      return ({ exclude: r, format: o }) => ({
        exclude: r,
        format: (e, n) => {
          let s = t(e, n);
          if (r) for (let e of r) delete s[e];
          return { ...s, ...o(e, n) };
        },
        type: e,
      });
    },
  ]);
};
