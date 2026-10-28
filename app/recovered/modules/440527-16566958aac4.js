// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(653327),
    i = r.i(574695),
    a = r.i(352386),
    t = r.i(689391),
    n = r.i(995040),
    l = r.i(294882),
    c = r.i(744894),
    s = r.i(950268),
    d = r.i(691416);
  let u = (0, t.z)(d.B)`
  && {
    padding: 0.75rem;
    height: 56px;
  }
`,
    v = t.z.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`,
    p = t.z.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`,
    h = t.z.div`
  font-size: 12px;
  line-height: 1rem;
  color: var(--privy-color-foreground-3);
`,
    g = (0, t.z)(c.L)`
  text-align: left;
  margin-bottom: 0.5rem;
`,
    f = (0, t.z)(l.E)`
  margin-top: 0.25rem;
`,
    m = (0, t.z)(n.S)`
  && {
    gap: 0.375rem;
    font-size: 14px;
  }
`;
  r.s([
    "W",
    0,
    ({
      errMsg: r,
      balance: t,
      address: n,
      className: l,
      title: c,
      showCopyButton: d = !1,
    }) => {
      let [b, x] = (0, a.useState)(!1);
      return (
        (0, a.useEffect)(() => {
          if (b) {
            let r = setTimeout(() => x(!1), 3e3);
            return () => clearTimeout(r);
          }
        }, [b]),
        (0, e.jsxs)("div", {
          children: [
            c && (0, e.jsx)(g, { children: c }),
            (0, e.jsx)(u, {
              className: l,
              $state: r ? "error" : void 0,
              children: (0, e.jsxs)(v, {
                children: [
                  (0, e.jsxs)(p, {
                    children: [
                      (0, e.jsx)(s.A, { address: n, showCopyIcon: !1 }),
                      void 0 !== t && (0, e.jsx)(h, { children: t }),
                    ],
                  }),
                  d &&
                    (0, e.jsx)(m, {
                      onClick: function (r) {
                        (r.stopPropagation(),
                          navigator.clipboard
                            .writeText(n)
                            .then(() => x(!0))
                            .catch(console.error));
                      },
                      size: "sm",
                      children: (0, e.jsxs)(
                        e.Fragment,
                        b
                          ? {
                              children: [
                                "Copied",
                                (0, e.jsx)(o.f, { size: 14 }),
                              ],
                            }
                          : {
                              children: ["Copy", (0, e.jsx)(i.f, { size: 14 })],
                            },
                      ),
                    }),
                ],
              }),
            }),
            r && (0, e.jsx)(f, { children: r }),
          ],
        })
      );
    },
  ]);
};
