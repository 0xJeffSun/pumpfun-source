// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    i = r.i(689391),
    o = r.i(949894);
  let t = i.z.span`
  padding: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem; /* 150% */
  border-radius: var(--privy-border-radius-xs);
  display: flex;
  align-items: center;
  ${(r) => {
    let e, o;
    ("green" === r.$color &&
      ((e = "var(--privy-color-success-dark)"),
      (o = "var(--privy-color-success-light)")),
      "red" === r.$color &&
        ((e = "var(--privy-color-error)"),
        (o = "var(--privy-color-error-light)")),
      "gray" === r.$color &&
        ((e = "var(--privy-color-foreground-2)"),
        (o = "var(--privy-color-background-2)")));
    let t = i.q`
      from, to {
        background-color: ${o};
      }

      50% {
        background-color: rgba(${o}, 0.8);
      }
    `;
    return i.m`
      color: ${e};
      background-color: ${o};
      ${
        r.$isPulsing &&
        i.m`
        animation: ${t} 3s linear infinite;
      `
      };
    `;
  }}

  ${o.L}
`;
  r.s([
    "C",
    0,
    ({ children: r, color: i, isLoading: o, isPulsing: a, ...n }) =>
      (0, e.jsx)(t, {
        $color: i,
        $isLoading: o,
        $isPulsing: a,
        ...n,
        children: r,
      }),
  ]);
};
