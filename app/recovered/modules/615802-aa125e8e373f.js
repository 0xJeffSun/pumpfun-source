// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(686035);
  e.s([
    "I",
    0,
    ({ icon: e, name: n }) =>
      "string" == typeof e
        ? (0, t.jsx)("img", {
            alt: `${n || "wallet"} logo`,
            src: e,
            style: { height: 24, width: 24, borderRadius: 4 },
          })
        : void 0 === e
          ? (0, t.jsx)(i.f, { style: { height: 24, width: 24 } })
          : e
            ? (0, t.jsx)(e, { style: { height: 24, width: 24 } })
            : null,
  ]);
};
