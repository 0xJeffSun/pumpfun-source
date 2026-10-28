// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    i = e.i(653327),
    o = e.i(574695),
    t = e.i(352386),
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
    c = (0, a.z)(i.f)`
  color: var(--privy-color-icon-success);
  flex-shrink: 0;
`,
    s = (0, a.z)(o.f)`
  color: var(--privy-color-icon-muted);
  flex-shrink: 0;
`;
  e.s([
    "C",
    0,
    function ({
      children: e,
      iconOnly: i,
      value: o,
      hideCopyIcon: a,
      onCopy: d,
      iconSize: p = 14,
      ...u
    }) {
      let [h, g] = (0, t.useState)(!1);
      return (0, r.jsxs)(n, {
        ...u,
        onClick: () => {
          (navigator.clipboard
            .writeText(o || ("string" == typeof e ? e : ""))
            .then(() => d?.())
            .catch(console.error),
            g(!0),
            setTimeout(() => g(!1), 1500));
        },
        children: [
          e,
          " ",
          h
            ? (0, r.jsxs)(l, {
                children: [(0, r.jsx)(c, { size: p }), " ", !i && "Copied"],
              })
            : !a && (0, r.jsx)(s, { size: p }),
        ],
      });
    },
    "a",
    0,
    ({ value: e, includeChildren: i, children: o, ...a }) => {
      let [d, p] = (0, t.useState)(!1),
        u = () => {
          (navigator.clipboard.writeText(e).catch(console.error),
            p(!0),
            setTimeout(() => p(!1), 1500));
        };
      return (0, r.jsxs)(r.Fragment, {
        children: [
          i
            ? (0, r.jsx)(n, { ...a, onClick: u, children: o })
            : (0, r.jsx)(r.Fragment, { children: o }),
          (0, r.jsx)(n, {
            ...a,
            onClick: u,
            children: d
              ? (0, r.jsx)(l, { children: (0, r.jsx)(c, {}) })
              : (0, r.jsx)(s, {}),
          }),
        ],
      });
    },
  ]);
};
