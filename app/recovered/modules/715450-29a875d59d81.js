// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (0, e.i(78436).$)((e, t) => ({
    request: null,
    resolve: null,
    ask: (r) =>
      t().resolve
        ? Promise.resolve(null)
        : new Promise((t) => {
            e({ request: r, resolve: t });
          }),
    settle: (r) => {
      let { resolve: n } = t();
      (e({ request: null, resolve: null }), n?.(r));
    },
  }));
  e.s(["f", 0, t]);
};
