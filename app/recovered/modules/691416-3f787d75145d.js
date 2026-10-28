// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(689391);
  let r = t.m`
  && {
    border-width: 1px;
    padding: 0.5rem 1rem;
  }

  width: 100%;
  text-align: left;
  border: solid 1px var(--privy-color-foreground-4);
  border-radius: var(--privy-border-radius-md);
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(e) => ("error" === e.$state ? "\n        border-color: var(--privy-color-error);\n        background: var(--privy-color-error-bg);\n      " : "")}
`,
    i = t.z.div`
  ${r}
`;
  e.s(["B", 0, i, "a", 0, r]);
};
