// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, t) {
      return ({ exclude: r, format: o }) => ({
        exclude: r,
        format: (e, a) => {
          let s = t(e, a);
          if (r) for (let e of r) delete s[e];
          return { ...s, ...o(e, a) };
        },
        type: e,
      });
    },
  ]);
};
