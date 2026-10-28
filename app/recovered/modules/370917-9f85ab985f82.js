// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, t) {
      return ({ exclude: r, format: s }) => ({
        exclude: r,
        format: (e, n) => {
          let o = t(e, n);
          if (r) for (let e of r) delete o[e];
          return { ...o, ...s(e, n) };
        },
        type: e,
      });
    },
  ]);
};
