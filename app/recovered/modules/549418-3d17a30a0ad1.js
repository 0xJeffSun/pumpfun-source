// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(453706),
    n = e.i(352386),
    r = e.i(248208);
  let s = (0, a.default)(() => e.A(242911).then((e) => e.DeleteAccountDialog), {
    loadableGenerated: { modules: [988402] },
    ssr: !1,
  });
  e.s([
    "f",
    0,
    function () {
      let e,
        a,
        l,
        o = (0, i.c)(6),
        [c, d] = (0, n.useState)(!1),
        [m, u] = (0, n.useState)(!1);
      o[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = () => {
            (u(!0), d(!0));
          }),
          (o[0] = e))
        : (e = o[0]);
      let p = e;
      o[1] !== m || o[2] !== c
        ? ((a = m
            ? (0, t.jsx)(r.R, {
                children: (0, t.jsx)(s, { open: c, onOpenChange: d }),
              })
            : null),
          (o[1] = m),
          (o[2] = c),
          (o[3] = a))
        : (a = o[3]);
      let f = a;
      return (
        o[4] !== f
          ? ((l = { openDialog: p, dialog: f }), (o[4] = f), (o[5] = l))
          : (l = o[5]),
        l
      );
    },
  ]);
};
