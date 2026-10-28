// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(653327),
    i = r.i(574695),
    a = r.i(352386),
    l = r.i(689391);
  let n = l.z.button`
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
    t = l.z.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--privy-color-foreground-2);
`,
    c = (0, l.z)(o.f)`
  color: var(--privy-color-icon-success);
  flex-shrink: 0;
`,
    d = (0, l.z)(i.f)`
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
      hideCopyIcon: l,
      onCopy: s,
      iconSize: v = 14,
      ...p
    }) {
      let [h, u] = (0, a.useState)(!1);
      return (0, e.jsxs)(n, {
        ...p,
        onClick: () => {
          (navigator.clipboard
            .writeText(i || ("string" == typeof r ? r : ""))
            .then(() => s?.())
            .catch(console.error),
            u(!0),
            setTimeout(() => u(!1), 1500));
        },
        children: [
          r,
          " ",
          h
            ? (0, e.jsxs)(t, {
                children: [(0, e.jsx)(c, { size: v }), " ", !o && "Copied"],
              })
            : !l && (0, e.jsx)(d, { size: v }),
        ],
      });
    },
    "a",
    0,
    ({ value: r, includeChildren: o, children: i, ...l }) => {
      let [s, v] = (0, a.useState)(!1),
        p = () => {
          (navigator.clipboard.writeText(r).catch(console.error),
            v(!0),
            setTimeout(() => v(!1), 1500));
        };
      return (0, e.jsxs)(e.Fragment, {
        children: [
          o
            ? (0, e.jsx)(n, { ...l, onClick: p, children: i })
            : (0, e.jsx)(e.Fragment, { children: i }),
          (0, e.jsx)(n, {
            ...l,
            onClick: p,
            children: s
              ? (0, e.jsx)(t, { children: (0, e.jsx)(c, {}) })
              : (0, e.jsx)(d, {}),
          }),
        ],
      });
    },
  ]);
};
