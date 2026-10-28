// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var o = e.i(732486),
    n = e.i(689391),
    r = e.i(949894);
  let t = n.z.span`
  padding: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem; /* 150% */
  border-radius: var(--privy-border-radius-xs);
  display: flex;
  align-items: center;
  ${(e) => {
    let o, r;
    ("green" === e.$color &&
      ((o = "var(--privy-color-success-dark)"),
      (r = "var(--privy-color-success-light)")),
      "red" === e.$color &&
        ((o = "var(--privy-color-error)"),
        (r = "var(--privy-color-error-light)")),
      "gray" === e.$color &&
        ((o = "var(--privy-color-foreground-2)"),
        (r = "var(--privy-color-background-2)")));
    let t = n.q`
      from, to {
        background-color: ${r};
      }

      50% {
        background-color: rgba(${r}, 0.8);
      }
    `;
    return n.m`
      color: ${o};
      background-color: ${r};
      ${
        e.$isPulsing &&
        n.m`
        animation: ${t} 3s linear infinite;
      `
      };
    `;
  }}

  ${r.L}
`;
  e.s([
    "C",
    0,
    ({ children: e, color: n, isLoading: r, isPulsing: i, ...l }) =>
      (0, o.jsx)(t, {
        $color: n,
        $isLoading: r,
        $isPulsing: i,
        ...l,
        children: e,
      }),
  ]);
};
