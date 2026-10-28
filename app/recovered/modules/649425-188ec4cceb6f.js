// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(465085),
    r = e.i(786006),
    n = e.i(144629),
    i = e.i(352386);
  e.s([
    "f",
    0,
    function ({
      value: e,
      format: a = (e) => e.toLocaleString(),
      className: s = "",
      springConfig: o = { mass: 0.8, stiffness: 55, damping: 20 },
    }) {
      let c = (0, r.f)(e, o),
        d = (0, n.f)(c, a);
      return (
        (0, i.useEffect)(() => {
          c.set(e);
        }, [c, e]),
        (0, t.jsx)(l.f.span, {
          className: s,
          style: {
            display: "inline-block",
            textAlign: "right",
            whiteSpace: "nowrap",
          },
          children: d,
        })
      );
    },
  ]);
};
