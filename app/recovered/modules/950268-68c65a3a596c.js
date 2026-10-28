// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    i = r.i(653327),
    o = r.i(574695),
    t = r.i(352386),
    a = r.i(689391),
    n = r.i(336291),
    l = r.i(995040);
  let s = a.z.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`,
    c = a.z.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--privy-color-foreground);
`,
    d = a.z.a`
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
    ({ address: r, showCopyIcon: a, url: p, className: h }) => {
      let [v, g] = (0, t.useState)(!1);
      function u(e) {
        (e.stopPropagation(),
          navigator.clipboard
            .writeText(r)
            .then(() => g(!0))
            .catch(console.error));
      }
      return (
        (0, t.useEffect)(() => {
          if (v) {
            let r = setTimeout(() => g(!1), 3e3);
            return () => clearTimeout(r);
          }
        }, [v]),
        (0, e.jsxs)(
          s,
          p
            ? {
                children: [
                  (0, e.jsx)(d, {
                    title: r,
                    className: h,
                    href: `${p}/address/${r}`,
                    target: "_blank",
                    children: (0, n.c)(r),
                  }),
                  a &&
                    (0, e.jsx)(l.S, {
                      onClick: u,
                      size: "sm",
                      style: { gap: "0.375rem" },
                      children: (0, e.jsxs)(
                        e.Fragment,
                        v
                          ? {
                              children: [
                                "Copied",
                                (0, e.jsx)(i.f, { size: 16 }),
                              ],
                            }
                          : {
                              children: ["Copy", (0, e.jsx)(o.f, { size: 16 })],
                            },
                      ),
                    }),
                ],
              }
            : {
                children: [
                  (0, e.jsx)(c, {
                    title: r,
                    className: h,
                    children: (0, n.c)(r),
                  }),
                  a &&
                    (0, e.jsx)(l.S, {
                      onClick: u,
                      size: "sm",
                      style: { gap: "0.375rem", fontSize: "14px" },
                      children: (0, e.jsxs)(
                        e.Fragment,
                        v
                          ? {
                              children: [
                                "Copied",
                                (0, e.jsx)(i.f, { size: 14 }),
                              ],
                            }
                          : {
                              children: ["Copy", (0, e.jsx)(o.f, { size: 14 })],
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
