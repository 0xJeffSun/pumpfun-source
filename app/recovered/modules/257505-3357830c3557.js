// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(254667),
    r = e.i(352386);
  e.i(12692);
  var o = e.i(398902),
    i = e.i(411657),
    a = e.i(517929),
    s = e.i(592209);
  e.s([
    "f",
    0,
    (e, l) => {
      let c,
        u,
        p,
        d,
        f,
        g,
        m = (0, t.c)(15);
      m[0] !== l
        ? ((c = void 0 === l ? {} : l), (m[0] = l), (m[1] = c))
        : (c = m[1]);
      let { releaseOnFailure: b } = c,
        { i18n: h } = (0, o.f)();
      if (m[2] !== h || m[3] !== e) {
        let t;
        ((u = (0, s.v)(h.language) ?? s.T),
          m[7] !== e ? ((t = e.join(",")), (m[7] = e), (m[8] = t)) : (t = m[8]),
          (d = t),
          (p = e.every((e) => null != h.getResource(u, i.t, e))),
          (m[2] = h),
          (m[3] = e),
          (m[4] = u),
          (m[5] = p),
          (m[6] = d));
      } else ((u = m[4]), (p = m[5]), (d = m[6]));
      let v = p,
        [x, y] = (0, r.useState)(null);
      return (
        m[9] !== h || m[10] !== u || m[11] !== v || m[12] !== d
          ? ((f = () => {
              if (v) return;
              let e = !1,
                t = d.split(","),
                r = `${u}:${d}`;
              return (
                (0, i.k)(h, u, t)
                  .then(() => {
                    e || y({ key: r, outcome: "landed" });
                  })
                  .catch((o) => {
                    (n.y.warn(
                      "i18n: namespace chunk fetch failed, copy held back",
                      {
                        locale: u,
                        namespaces: t,
                        reason: (0, a.f)(o),
                        error: o,
                      },
                    ),
                      e || y({ key: r, outcome: "failed" }));
                  }),
                () => {
                  e = !0;
                }
              );
            }),
            (g = [v, h, u, d]),
            (m[9] = h),
            (m[10] = u),
            (m[11] = v),
            (m[12] = d),
            (m[13] = f),
            (m[14] = g))
          : ((f = m[13]), (g = m[14])),
        (0, r.useEffect)(f, g),
        !!v ||
          (x?.key === `${u}:${d}` &&
            ("landed" === x.outcome || (void 0 !== b && b)))
      );
    },
  ]);
};
