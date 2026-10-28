// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(732486),
    t = e.i(689391),
    a = e.i(949894);
  let l = t.z.span`
  padding: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem; /* 150% */
  border-radius: var(--privy-border-radius-xs);
  display: flex;
  align-items: center;
  ${(e) => {
    let n, a;
    ("green" === e.$color &&
      ((n = "var(--privy-color-success-dark)"),
      (a = "var(--privy-color-success-light)")),
      "red" === e.$color &&
        ((n = "var(--privy-color-error)"),
        (a = "var(--privy-color-error-light)")),
      "gray" === e.$color &&
        ((n = "var(--privy-color-foreground-2)"),
        (a = "var(--privy-color-background-2)")));
    let l = t.q`
      from, to {
        background-color: ${a};
      }

      50% {
        background-color: rgba(${a}, 0.8);
      }
    `;
    return t.m`
      color: ${n};
      background-color: ${a};
      ${
        e.$isPulsing &&
        t.m`
        animation: ${l} 3s linear infinite;
      `
      };
    `;
  }}

  ${a.L}
`;
  e.s([
    "C",
    0,
    ({ children: e, color: t, isLoading: a, isPulsing: i, ...o }) =>
      (0, n.jsx)(l, {
        $color: t,
        $isLoading: a,
        $isPulsing: i,
        ...o,
        children: e,
      }),
  ]);
};
