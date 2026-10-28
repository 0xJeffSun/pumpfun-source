// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(653327),
    a = r.i(574695),
    i = r.i(352386),
    t = r.i(689391),
    n = r.i(336291),
    l = r.i(995040);
  let c = t.z.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`,
    s = t.z.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--privy-color-foreground);
`,
    d = t.z.a`
  font-size: 14px;
  color: var(--privy-color-foreground);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
  r.s([
    "A",
    0,
    ({ address: r, showCopyIcon: t, url: v, className: u }) => {
      let [p, h] = (0, i.useState)(!1);
      function f(e) {
        (e.stopPropagation(),
          navigator.clipboard
            .writeText(r)
            .then(() => h(!0))
            .catch(console.error));
      }
      return (
        (0, i.useEffect)(() => {
          if (p) {
            let r = setTimeout(() => h(!1), 3e3);
            return () => clearTimeout(r);
          }
        }, [p]),
        (0, e.jsxs)(
          c,
          v
            ? {
                children: [
                  (0, e.jsx)(d, {
                    title: r,
                    className: u,
                    href: `${v}/address/${r}`,
                    target: "_blank",
                    children: (0, n.c)(r),
                  }),
                  t &&
                    (0, e.jsx)(l.S, {
                      onClick: f,
                      size: "sm",
                      style: { gap: "0.375rem" },
                      children: (0, e.jsxs)(
                        e.Fragment,
                        p
                          ? {
                              children: [
                                "Copied",
                                (0, e.jsx)(o.f, { size: 16 }),
                              ],
                            }
                          : {
                              children: ["Copy", (0, e.jsx)(a.f, { size: 16 })],
                            },
                      ),
                    }),
                ],
              }
            : {
                children: [
                  (0, e.jsx)(s, {
                    title: r,
                    className: u,
                    children: (0, n.c)(r),
                  }),
                  t &&
                    (0, e.jsx)(l.S, {
                      onClick: f,
                      size: "sm",
                      style: { gap: "0.375rem", fontSize: "14px" },
                      children: (0, e.jsxs)(
                        e.Fragment,
                        p
                          ? {
                              children: [
                                "Copied",
                                (0, e.jsx)(o.f, { size: 14 }),
                              ],
                            }
                          : {
                              children: ["Copy", (0, e.jsx)(a.f, { size: 14 })],
                            },
                      ),
                    }),
                ],
              },
        )
      );
    },
  ]);
};
