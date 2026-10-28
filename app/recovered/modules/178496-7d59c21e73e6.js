// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = null,
    r = new Set(),
    n = () => {
      for (let e of r) e();
    };
  e.s([
    "m",
    0,
    () => t,
    "M",
    0,
    (e) =>
      new Promise((r) => {
        (t?.resolve("cancel"), (t = { ...e, resolve: r }), n());
      }),
    "n",
    0,
    (e) => {
      let r = t;
      r && ((t = null), n(), r.resolve(e));
    },
    "D",
    0,
    (e) => (
      r.add(e),
      () => {
        r.delete(e);
      }
    ),
  ]);
};
