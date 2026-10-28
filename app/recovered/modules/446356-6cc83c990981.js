// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(91163),
    i = r.i(689391);
  let a = i.z.div`
  display: flex;
  gap: 0.5rem;
  background-color: var(--privy-color-warn-bg);
  border: 1px solid var(--privy-color-border-warning);
  align-items: flex-start;
  padding: 0.75rem;
  border-radius: 0.5rem;
  overflow: clip;
  width: 100%;
`,
    l = i.z.div`
  color: ${(r) => ("dark" === r.$theme ? "var(--privy-color-foreground-2)" : "var(--privy-color-foreground)")};
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.125rem;
  flex: 1;
  text-align: left;
  font-feature-settings:
    'calt' 0,
    'kern' 0;
`;
  r.s([
    "W",
    0,
    ({ children: r, theme: i, className: n }) =>
      (0, e.jsxs)(a, {
        $theme: i,
        className: n,
        children: [
          (0, e.jsx)(o.f, {
            width: "16px",
            height: "16px",
            color: "var(--privy-color-icon-warning)",
            strokeWidth: 2,
            style: { flexShrink: 0 },
          }),
          (0, e.jsx)(l, { $theme: i, children: r }),
        ],
      }),
  ]);
};
