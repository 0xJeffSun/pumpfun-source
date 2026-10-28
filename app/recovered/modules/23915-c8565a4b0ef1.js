// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    t = e.i(689391),
    i = e.i(949894);
  let o = t.z.span`
  padding: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem; /* 150% */
  border-radius: var(--privy-border-radius-xs);
  display: flex;
  align-items: center;
  ${(e) => {
    let r, i;
    ("green" === e.$color &&
      ((r = "var(--privy-color-success-dark)"),
      (i = "var(--privy-color-success-light)")),
      "red" === e.$color &&
        ((r = "var(--privy-color-error)"),
        (i = "var(--privy-color-error-light)")),
      "gray" === e.$color &&
        ((r = "var(--privy-color-foreground-2)"),
        (i = "var(--privy-color-background-2)")));
    let o = t.q`
      from, to {
        background-color: ${i};
      }

      50% {
        background-color: rgba(${i}, 0.8);
      }
    `;
    return t.m`
      color: ${r};
      background-color: ${i};
      ${
        e.$isPulsing &&
        t.m`
        animation: ${o} 3s linear infinite;
      `
      };
    `;
  }}

  ${i.L}
`;
  e.s([
    "C",
    0,
    ({ children: e, color: t, isLoading: i, isPulsing: n, ...a }) =>
      (0, r.jsx)(o, {
        $color: t,
        $isLoading: i,
        $isPulsing: n,
        ...a,
        children: e,
      }),
  ]);
};
