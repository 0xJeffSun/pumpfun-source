// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, t) {
      return ({ exclude: r, format: n }) => ({
        exclude: r,
        format: (e, s) => {
          let o = t(e, s);
          if (r) for (let e of r) delete o[e];
          return { ...o, ...n(e, s) };
        },
        type: e,
      });
    },
  ]);
};
