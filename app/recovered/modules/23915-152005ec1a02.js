// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(689391),
    i = r.i(949894);
  let a = o.z.span`
  padding: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem; /* 150% */
  border-radius: var(--privy-border-radius-xs);
  display: flex;
  align-items: center;
  ${(r) => {
    let e, i;
    ("green" === r.$color &&
      ((e = "var(--privy-color-success-dark)"),
      (i = "var(--privy-color-success-light)")),
      "red" === r.$color &&
        ((e = "var(--privy-color-error)"),
        (i = "var(--privy-color-error-light)")),
      "gray" === r.$color &&
        ((e = "var(--privy-color-foreground-2)"),
        (i = "var(--privy-color-background-2)")));
    let a = o.q`
      from, to {
        background-color: ${i};
      }

      50% {
        background-color: rgba(${i}, 0.8);
      }
    `;
    return o.m`
      color: ${e};
      background-color: ${i};
      ${
        r.$isPulsing &&
        o.m`
        animation: ${a} 3s linear infinite;
      `
      };
    `;
  }}

  ${i.L}
`;
  r.s([
    "C",
    0,
    ({ children: r, color: o, isLoading: i, isPulsing: l, ...t }) =>
      (0, e.jsx)(a, {
        $color: o,
        $isLoading: i,
        $isPulsing: l,
        ...t,
        children: r,
      }),
  ]);
};
