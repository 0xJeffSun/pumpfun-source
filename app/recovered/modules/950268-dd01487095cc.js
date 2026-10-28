// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(653327),
    i = r.i(574695),
    a = r.i(352386),
    l = r.i(689391),
    n = r.i(336291),
    t = r.i(995040);
  let c = l.z.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`,
    s = l.z.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--privy-color-foreground);
`,
    d = l.z.a`
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
    ({ address: r, showCopyIcon: l, url: v, className: p }) => {
      let [h, u] = (0, a.useState)(!1);
      function g(e) {
        (e.stopPropagation(),
          navigator.clipboard
            .writeText(r)
            .then(() => u(!0))
            .catch(console.error));
      }
      return (
        (0, a.useEffect)(() => {
          if (h) {
            let r = setTimeout(() => u(!1), 3e3);
            return () => clearTimeout(r);
          }
        }, [h]),
        (0, e.jsxs)(
          c,
          v
            ? {
                children: [
                  (0, e.jsx)(d, {
                    title: r,
                    className: p,
                    href: `${v}/address/${r}`,
                    target: "_blank",
                    children: (0, n.c)(r),
                  }),
                  l &&
                    (0, e.jsx)(t.S, {
                      onClick: g,
                      size: "sm",
                      style: { gap: "0.375rem" },
                      children: (0, e.jsxs)(
                        e.Fragment,
                        h
                          ? {
                              children: [
                                "Copied",
                                (0, e.jsx)(o.f, { size: 16 }),
                              ],
                            }
                          : {
                              children: ["Copy", (0, e.jsx)(i.f, { size: 16 })],
                            },
                      ),
                    }),
                ],
              }
            : {
                children: [
                  (0, e.jsx)(s, {
                    title: r,
                    className: p,
                    children: (0, n.c)(r),
                  }),
                  l &&
                    (0, e.jsx)(t.S, {
                      onClick: g,
                      size: "sm",
                      style: { gap: "0.375rem", fontSize: "14px" },
                      children: (0, e.jsxs)(
                        e.Fragment,
                        h
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
              },
        )
      );
    },
  ]);
};
