// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(545063),
    r = e.i(92245),
    n = e.i(352386),
    a = e.i(466931);
  let o = new Set();
  e.s([
    "f",
    0,
    (e) => {
      let s,
        l,
        u,
        c = (0, t.c)(7),
        d = (0, i.U)(),
        { userId: f, address: m } = d;
      return (
        c[0] !== m || c[1] !== e || c[2] !== f
          ? ((s = () => {
              ((e, t) => {
                let i = (0, r.m)(t);
                if (!i) return;
                let n = `${e}:${i}`;
                o.has(n) ||
                  (o.add(n),
                  (0, a.B)({
                    name: "viewer-key-source",
                    feature: "auth",
                    operation: e,
                    context: { source: i },
                  }));
              })(e, { userId: f, address: m });
            }),
            (l = [e, f, m]),
            (c[0] = m),
            (c[1] = e),
            (c[2] = f),
            (c[3] = s),
            (c[4] = l))
          : ((s = c[3]), (l = c[4])),
        (0, n.useEffect)(s, l),
        c[5] !== d ? ((u = (0, r.$)(d)), (c[5] = d), (c[6] = u)) : (u = c[6]),
        u
      );
    },
  ]);
};
