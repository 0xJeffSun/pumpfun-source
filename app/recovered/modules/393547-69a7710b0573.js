// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    (e, t, r) =>
      JSON.stringify(
        e,
        (e, r) => {
          let s = "bigint" == typeof r ? r.toString() : r;
          return "function" == typeof t ? t(e, s) : s;
        },
        r,
      ),
  ]);
};
