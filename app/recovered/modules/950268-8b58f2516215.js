// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    i = e.i(653327),
    o = e.i(574695),
    n = e.i(352386),
    t = e.i(689391),
    a = e.i(336291),
    s = e.i(995040);
  let l = t.z.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`,
    c = t.z.span`
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
  e.s([
    "A",
    0,
    ({ address: e, showCopyIcon: t, url: h, className: p }) => {
      let [x, u] = (0, n.useState)(!1);
      function g(r) {
        (r.stopPropagation(),
          navigator.clipboard
            .writeText(e)
            .then(() => u(!0))
            .catch(console.error));
      }
      return (
        (0, n.useEffect)(() => {
          if (x) {
            let e = setTimeout(() => u(!1), 3e3);
            return () => clearTimeout(e);
          }
        }, [x]),
        (0, r.jsxs)(
          l,
          h
            ? {
                children: [
                  (0, r.jsx)(d, {
                    title: e,
                    className: p,
                    href: `${h}/address/${e}`,
                    target: "_blank",
                    children: (0, a.c)(e),
                  }),
                  t &&
                    (0, r.jsx)(s.S, {
                      onClick: g,
                      size: "sm",
                      style: { gap: "0.375rem" },
                      children: (0, r.jsxs)(
                        r.Fragment,
                        x
                          ? {
                              children: [
                                "Copied",
                                (0, r.jsx)(i.f, { size: 16 }),
                              ],
                            }
                          : {
                              children: ["Copy", (0, r.jsx)(o.f, { size: 16 })],
                            },
                      ),
                    }),
                ],
              }
            : {
                children: [
                  (0, r.jsx)(c, {
                    title: e,
                    className: p,
                    children: (0, a.c)(e),
                  }),
                  t &&
                    (0, r.jsx)(s.S, {
                      onClick: g,
                      size: "sm",
                      style: { gap: "0.375rem", fontSize: "14px" },
                      children: (0, r.jsxs)(
                        r.Fragment,
                        x
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
              },
        )
      );
    },
  ]);
};
