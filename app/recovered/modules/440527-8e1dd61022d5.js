// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    i = e.i(653327),
    o = e.i(574695),
    n = e.i(352386),
    t = e.i(689391),
    a = e.i(995040),
    s = e.i(294882),
    l = e.i(744894),
    c = e.i(950268),
    d = e.i(691416);
  let h = (0, t.z)(d.B)`
  && {
    padding: 0.75rem;
    height: 56px;
  }
`,
    p = t.z.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`,
    x = t.z.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`,
    u = t.z.div`
  font-size: 12px;
  line-height: 1rem;
  color: var(--privy-color-foreground-3);
`,
    g = (0, t.z)(l.L)`
  text-align: left;
  margin-bottom: 0.5rem;
`,
    v = (0, t.z)(s.E)`
  margin-top: 0.25rem;
`,
    m = (0, t.z)(a.S)`
  && {
    gap: 0.375rem;
    font-size: 14px;
  }
`;
  e.s([
    "W",
    0,
    ({
      errMsg: e,
      balance: t,
      address: a,
      className: s,
      title: l,
      showCopyButton: d = !1,
    }) => {
      let [f, j] = (0, n.useState)(!1);
      return (
        (0, n.useEffect)(() => {
          if (f) {
            let e = setTimeout(() => j(!1), 3e3);
            return () => clearTimeout(e);
          }
        }, [f]),
        (0, r.jsxs)("div", {
          children: [
            l && (0, r.jsx)(g, { children: l }),
            (0, r.jsx)(h, {
              className: s,
              $state: e ? "error" : void 0,
              children: (0, r.jsxs)(p, {
                children: [
                  (0, r.jsxs)(x, {
                    children: [
                      (0, r.jsx)(c.A, { address: a, showCopyIcon: !1 }),
                      void 0 !== t && (0, r.jsx)(u, { children: t }),
                    ],
                  }),
                  d &&
                    (0, r.jsx)(m, {
                      onClick: function (e) {
                        (e.stopPropagation(),
                          navigator.clipboard
                            .writeText(a)
                            .then(() => j(!0))
                            .catch(console.error));
                      },
                      size: "sm",
                      children: (0, r.jsxs)(
                        r.Fragment,
                        f
                          ? {
                              children: [
                                "Copied",
                                (0, r.jsx)(i.f, { size: 14 }),
                              ],
                            }
                          : {
                              children: ["Copy", (0, r.jsx)(o.f, { size: 14 })],
                            },
                      ),
                    }),
                ],
              }),
            }),
            e && (0, r.jsx)(v, { children: e }),
          ],
        })
      );
    },
  ]);
};
