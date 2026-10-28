// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    i = e.i(689391),
    o = e.i(949894);
  let a = i.z.span`
  padding: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem; /* 150% */
  border-radius: var(--privy-border-radius-xs);
  display: flex;
  align-items: center;
  ${(e) => {
    let r, o;
    ("green" === e.$color &&
      ((r = "var(--privy-color-success-dark)"),
      (o = "var(--privy-color-success-light)")),
      "red" === e.$color &&
        ((r = "var(--privy-color-error)"),
        (o = "var(--privy-color-error-light)")),
      "gray" === e.$color &&
        ((r = "var(--privy-color-foreground-2)"),
        (o = "var(--privy-color-background-2)")));
    let a = i.q`
      from, to {
        background-color: ${o};
      }

      50% {
        background-color: rgba(${o}, 0.8);
      }
    `;
    return i.m`
      color: ${r};
      background-color: ${o};
      ${
        e.$isPulsing &&
        i.m`
        animation: ${a} 3s linear infinite;
      `
      };
    `;
  }}

  ${o.L}
`;
  e.s([
    "C",
    0,
    ({ children: e, color: i, isLoading: o, isPulsing: t, ...l }) =>
      (0, r.jsx)(a, {
        $color: i,
        $isLoading: o,
        $isPulsing: t,
        ...l,
        children: e,
      }),
  ]);
};
