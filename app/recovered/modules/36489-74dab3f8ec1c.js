// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(890088),
    r = e.i(187611);
  e.s([
    "s",
    0,
    "/docs/app-competition-terms",
    "Z",
    0,
    (e, r) => (0, t.R)(r).format(e),
    "_",
    0,
    (e, n) => {
      if (null === e) return null;
      let i = Date.parse(e);
      return Number.isFinite(i)
        ? (0, r.T)(
            (0, t.r)(n, {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            }).format(i),
            "date-format",
          )
        : null;
    },
  ]);
};
