// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(689391),
    n = e.i(949894);
  let r = i.z.span`
  padding: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem; /* 150% */
  border-radius: var(--privy-border-radius-xs);
  display: flex;
  align-items: center;
  ${(e) => {
    let t, n;
    ("green" === e.$color &&
      ((t = "var(--privy-color-success-dark)"),
      (n = "var(--privy-color-success-light)")),
      "red" === e.$color &&
        ((t = "var(--privy-color-error)"),
        (n = "var(--privy-color-error-light)")),
      "gray" === e.$color &&
        ((t = "var(--privy-color-foreground-2)"),
        (n = "var(--privy-color-background-2)")));
    let r = i.q`
      from, to {
        background-color: ${n};
      }

      50% {
        background-color: rgba(${n}, 0.8);
      }
    `;
    return i.m`
      color: ${t};
      background-color: ${n};
      ${
        e.$isPulsing &&
        i.m`
        animation: ${r} 3s linear infinite;
      `
      };
    `;
  }}

  ${n.L}
`;
  e.s([
    "C",
    0,
    ({ children: e, color: i, isLoading: n, isPulsing: a, ...s }) =>
      (0, t.jsx)(r, {
        $color: i,
        $isLoading: n,
        $isPulsing: a,
        ...s,
        children: e,
      }),
  ]);
};
