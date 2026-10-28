// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(653327),
    i = r.i(574695),
    a = r.i(352386),
    l = r.i(689391),
    n = r.i(995040),
    t = r.i(294882),
    c = r.i(744894),
    d = r.i(950268),
    s = r.i(691416);
  let v = (0, l.z)(s.B)`
  && {
    padding: 0.75rem;
    height: 56px;
  }
`,
    p = l.z.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`,
    h = l.z.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`,
    u = l.z.div`
  font-size: 12px;
  line-height: 1rem;
  color: var(--privy-color-foreground-3);
`,
    g = (0, l.z)(c.L)`
  text-align: left;
  margin-bottom: 0.5rem;
`,
    f = (0, l.z)(t.E)`
  margin-top: 0.25rem;
`,
    x = (0, l.z)(n.S)`
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
      balance: l,
      address: n,
      className: t,
      title: c,
      showCopyButton: s = !1,
    }) => {
      let [b, y] = (0, a.useState)(!1);
      return (
        (0, a.useEffect)(() => {
          if (b) {
            let r = setTimeout(() => y(!1), 3e3);
            return () => clearTimeout(r);
          }
        }, [b]),
        (0, e.jsxs)("div", {
          children: [
            c && (0, e.jsx)(g, { children: c }),
            (0, e.jsx)(v, {
              className: t,
              $state: r ? "error" : void 0,
              children: (0, e.jsxs)(p, {
                children: [
                  (0, e.jsxs)(h, {
                    children: [
                      (0, e.jsx)(d.A, { address: n, showCopyIcon: !1 }),
                      void 0 !== l && (0, e.jsx)(u, { children: l }),
                    ],
                  }),
                  s &&
                    (0, e.jsx)(x, {
                      onClick: function (r) {
                        (r.stopPropagation(),
                          navigator.clipboard
                            .writeText(n)
                            .then(() => y(!0))
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
