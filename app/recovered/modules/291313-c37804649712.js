// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) => {
    let t = Date.parse(e);
    return Number.isNaN(t) ? 0 : t;
  };
  e.s([
    "f",
    0,
    (e) =>
      e.toSorted((e, r) => {
        let n = e.pinnedAt,
          i = r.pinnedAt;
        return null === n && null === i
          ? 0
          : null === n
            ? 1
            : null === i
              ? -1
              : t(i) - t(n);
      }),
  ]);
};
