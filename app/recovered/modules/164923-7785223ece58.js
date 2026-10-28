// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(653327),
    n = e.i(574695),
    a = e.i(352386),
    r = e.i(689391);
  let l = r.z.button`
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
    o = r.z.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--privy-color-foreground-2);
`,
    s = (0, r.z)(i.f)`
  color: var(--privy-color-icon-success);
  flex-shrink: 0;
`,
    c = (0, r.z)(n.f)`
  color: var(--privy-color-icon-muted);
  flex-shrink: 0;
`;
  e.s([
    "C",
    0,
    function ({
      children: e,
      iconOnly: i,
      value: n,
      hideCopyIcon: r,
      onCopy: d,
      iconSize: u = 14,
      ...p
    }) {
      let [h, g] = (0, a.useState)(!1);
      return (0, t.jsxs)(l, {
        ...p,
        onClick: () => {
          (navigator.clipboard
            .writeText(n || ("string" == typeof e ? e : ""))
            .then(() => d?.())
            .catch(console.error),
            g(!0),
            setTimeout(() => g(!1), 1500));
        },
        children: [
          e,
          " ",
          h
            ? (0, t.jsxs)(o, {
                children: [(0, t.jsx)(s, { size: u }), " ", !i && "Copied"],
              })
            : !r && (0, t.jsx)(c, { size: u }),
        ],
      });
    },
    "a",
    0,
    ({ value: e, includeChildren: i, children: n, ...r }) => {
      let [d, u] = (0, a.useState)(!1),
        p = () => {
          (navigator.clipboard.writeText(e).catch(console.error),
            u(!0),
            setTimeout(() => u(!1), 1500));
        };
      return (0, t.jsxs)(t.Fragment, {
        children: [
          i
            ? (0, t.jsx)(l, { ...r, onClick: p, children: n })
            : (0, t.jsx)(t.Fragment, { children: n }),
          (0, t.jsx)(l, {
            ...r,
            onClick: p,
            children: d
              ? (0, t.jsx)(o, { children: (0, t.jsx)(s, {}) })
              : (0, t.jsx)(c, {}),
          }),
        ],
      });
    },
  ]);
};
