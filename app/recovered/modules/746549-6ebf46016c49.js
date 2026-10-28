// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(924568),
    a = e.i(689391);
  let i = a.z.div`
  display: flex;
  gap: 0.5rem;
  background-color: var(--privy-color-error-bg);
  border: 1px solid var(--privy-color-border-error);
  align-items: flex-start;
  padding: 0.75rem;
  border-radius: 0.5rem;
  overflow: clip;
  width: 100%;
`,
    r = a.z.div`
  color: ${(e) => ("dark" === e.$theme ? "var(--privy-color-foreground-2)" : "var(--privy-color-foreground)")};
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.125rem;
  flex: 1;
  text-align: left;
  font-feature-settings:
    'calt' 0,
    'kern' 0;
`;
  e.s([
    "E",
    0,
    ({ children: e, theme: a, className: o }) =>
      (0, t.jsxs)(i, {
        $theme: a,
        className: o,
        children: [
          (0, t.jsx)(n.f, {
            width: "16px",
            height: "16px",
            color: "var(--privy-color-icon-error)",
            strokeWidth: 2,
            style: { flexShrink: 0 },
          }),
          (0, t.jsx)(r, { $theme: a, children: e }),
        ],
      }),
  ]);
};
