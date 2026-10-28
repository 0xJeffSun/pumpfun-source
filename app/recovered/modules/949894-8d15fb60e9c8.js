// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var o = e.i(689391);
  let n = o.q`
  from, to {
    background: var(--privy-color-foreground-4);
    color: var(--privy-color-foreground-4);
  }

  50% {
    background: var(--privy-color-foreground-accent);
    color: var(--privy-color-foreground-accent);
  }
`,
    r = o.m`
  ${(e) =>
    e.$isLoading
      ? o.m`
          width: 35%;
          animation: ${n} 2s linear infinite;
          border-radius: var(--privy-border-radius-sm);
        `
      : ""}
`;
  e.s(["L", 0, r]);
};
