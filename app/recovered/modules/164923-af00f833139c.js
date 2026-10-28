// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    o = e.i(653327),
    t = e.i(574695),
    i = e.i(352386),
    a = e.i(689391);
  let n = a.z.button`
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
    l = a.z.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--privy-color-foreground-2);
`,
    s = (0, a.z)(o.f)`
  color: var(--privy-color-icon-success);
  flex-shrink: 0;
`,
    c = (0, a.z)(t.f)`
  color: var(--privy-color-icon-muted);
  flex-shrink: 0;
`;
  e.s([
    "C",
    0,
    function ({
      children: e,
      iconOnly: o,
      value: t,
      hideCopyIcon: a,
      onCopy: d,
      iconSize: u = 14,
      ...p
    }) {
      let [v, h] = (0, i.useState)(!1);
      return (0, r.jsxs)(n, {
        ...p,
        onClick: () => {
          (navigator.clipboard
            .writeText(t || ("string" == typeof e ? e : ""))
            .then(() => d?.())
            .catch(console.error),
            h(!0),
            setTimeout(() => h(!1), 1500));
        },
        children: [
          e,
          " ",
          v
            ? (0, r.jsxs)(l, {
                children: [(0, r.jsx)(s, { size: u }), " ", !o && "Copied"],
              })
            : !a && (0, r.jsx)(c, { size: u }),
        ],
      });
    },
    "a",
    0,
    ({ value: e, includeChildren: o, children: t, ...a }) => {
      let [d, u] = (0, i.useState)(!1),
        p = () => {
          (navigator.clipboard.writeText(e).catch(console.error),
            u(!0),
            setTimeout(() => u(!1), 1500));
        };
      return (0, r.jsxs)(r.Fragment, {
        children: [
          o
            ? (0, r.jsx)(n, { ...a, onClick: p, children: t })
            : (0, r.jsx)(r.Fragment, { children: t }),
          (0, r.jsx)(n, {
            ...a,
            onClick: p,
            children: d
              ? (0, r.jsx)(l, { children: (0, r.jsx)(s, {}) })
              : (0, r.jsx)(c, {}),
          }),
        ],
      });
    },
  ]);
};
