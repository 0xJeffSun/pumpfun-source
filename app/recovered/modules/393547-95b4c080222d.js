// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    (e, t, n) =>
      JSON.stringify(
        e,
        (e, n) => {
          let i = "bigint" == typeof n ? n.toString() : n;
          return "function" == typeof t ? t(e, i) : i;
        },
        n,
      ),
  ]);
};
