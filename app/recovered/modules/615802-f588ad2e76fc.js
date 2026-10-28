// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(732486),
    t = e.i(686035);
  e.s([
    "I",
    0,
    ({ icon: e, name: a }) =>
      "string" == typeof e
        ? (0, n.jsx)("img", {
            alt: `${a || "wallet"} logo`,
            src: e,
            style: { height: 24, width: 24, borderRadius: 4 },
          })
        : void 0 === e
          ? (0, n.jsx)(t.f, { style: { height: 24, width: 24 } })
          : e
            ? (0, n.jsx)(e, { style: { height: 24, width: 24 } })
            : null,
  ]);
};
