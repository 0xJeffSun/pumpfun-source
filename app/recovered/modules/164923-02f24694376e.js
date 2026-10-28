// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(653327),
    i = r.i(574695),
    t = r.i(352386),
    n = r.i(689391);
  let a = n.z.button`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;

  && {
    color: var(--privy-color-foreground);
    font-weight: 500;
  }

  svg {
    width: 0.875rem;
    height: 0.875rem;
  }
`,
    l = n.z.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--privy-color-foreground-2);
`,
    s = (0, n.z)(o.f)`
  color: var(--privy-color-icon-success);
  flex-shrink: 0;
`,
    c = (0, n.z)(i.f)`
  color: var(--privy-color-icon-muted);
  flex-shrink: 0;
`;
  r.s([
    "C",
    0,
    function ({
      children: r,
      iconOnly: o,
      value: i,
      hideCopyIcon: n,
      onCopy: d,
      iconSize: p = 14,
      ...u
    }) {
      let [h, v] = (0, t.useState)(!1);
      return (0, e.jsxs)(a, {
        ...u,
        onClick: () => {
          (navigator.clipboard
            .writeText(i || ("string" == typeof r ? r : ""))
            .then(() => d?.())
            .catch(console.error),
            v(!0),
            setTimeout(() => v(!1), 1500));
        },
        children: [
          r,
          " ",
          h
            ? (0, e.jsxs)(l, {
                children: [(0, e.jsx)(s, { size: p }), " ", !o && "Copied"],
              })
            : !n && (0, e.jsx)(c, { size: p }),
        ],
      });
    },
    "a",
    0,
    ({ value: r, includeChildren: o, children: i, ...n }) => {
      let [d, p] = (0, t.useState)(!1),
        u = () => {
          (navigator.clipboard.writeText(r).catch(console.error),
            p(!0),
            setTimeout(() => p(!1), 1500));
        };
      return (0, e.jsxs)(e.Fragment, {
        children: [
          o
            ? (0, e.jsx)(a, { ...n, onClick: u, children: i })
            : (0, e.jsx)(e.Fragment, { children: i }),
          (0, e.jsx)(a, {
            ...n,
            onClick: u,
            children: d
              ? (0, e.jsx)(l, { children: (0, e.jsx)(s, {}) })
              : (0, e.jsx)(c, {}),
          }),
        ],
      });
    },
  ]);
};
