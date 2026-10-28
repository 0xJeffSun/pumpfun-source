// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    i = r.i(686035);
  r.s([
    "I",
    0,
    ({ icon: r, name: o }) =>
      "string" == typeof r
        ? (0, e.jsx)("img", {
            alt: `${o || "wallet"} logo`,
            src: r,
            style: { height: 24, width: 24, borderRadius: 4 },
          })
        : void 0 === r
          ? (0, e.jsx)(i.f, { style: { height: 24, width: 24 } })
          : r
            ? (0, e.jsx)(r, { style: { height: 24, width: 24 } })
            : null,
  ]);
};
