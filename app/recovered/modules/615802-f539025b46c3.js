// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(686035);
  r.s([
    "I",
    0,
    ({ icon: r, name: i }) =>
      "string" == typeof r
        ? (0, e.jsx)("img", {
            alt: `${i || "wallet"} logo`,
            src: r,
            style: { height: 24, width: 24, borderRadius: 4 },
          })
        : void 0 === r
          ? (0, e.jsx)(o.f, { style: { height: 24, width: 24 } })
          : r
            ? (0, e.jsx)(r, { style: { height: 24, width: 24 } })
            : null,
  ]);
};
