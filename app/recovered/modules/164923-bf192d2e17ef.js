// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(653327),
    r = e.i(574695),
    n = e.i(352386),
    o = e.i(689391);
  let a = o.z.button`
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
    l = o.z.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--privy-color-foreground-2);
`,
    s = (0, o.z)(i.f)`
  color: var(--privy-color-icon-success);
  flex-shrink: 0;
`,
    c = (0, o.z)(r.f)`
  color: var(--privy-color-icon-muted);
  flex-shrink: 0;
`;
  e.s([
    "C",
    0,
    function ({
      children: e,
      iconOnly: i,
      value: r,
      hideCopyIcon: o,
      onCopy: d,
      iconSize: h = 14,
      ...u
    }) {
      let [p, g] = (0, n.useState)(!1);
      return (0, t.jsxs)(a, {
        ...u,
        onClick: () => {
          (navigator.clipboard
            .writeText(r || ("string" == typeof e ? e : ""))
            .then(() => d?.())
            .catch(console.error),
            g(!0),
            setTimeout(() => g(!1), 1500));
        },
        children: [
          e,
          " ",
          p
            ? (0, t.jsxs)(l, {
                children: [(0, t.jsx)(s, { size: h }), " ", !i && "Copied"],
              })
            : !o && (0, t.jsx)(c, { size: h }),
        ],
      });
    },
    "a",
    0,
    ({ value: e, includeChildren: i, children: r, ...o }) => {
      let [d, h] = (0, n.useState)(!1),
        u = () => {
          (navigator.clipboard.writeText(e).catch(console.error),
            h(!0),
            setTimeout(() => h(!1), 1500));
        };
      return (0, t.jsxs)(t.Fragment, {
        children: [
          i
            ? (0, t.jsx)(a, { ...o, onClick: u, children: r })
            : (0, t.jsx)(t.Fragment, { children: r }),
          (0, t.jsx)(a, {
            ...o,
            onClick: u,
            children: d
              ? (0, t.jsx)(l, { children: (0, t.jsx)(s, {}) })
              : (0, t.jsx)(c, {}),
          }),
        ],
      });
    },
  ]);
};
