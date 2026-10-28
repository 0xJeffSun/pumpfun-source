// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(689391),
    t = e.i(995040),
    a = e.i(794193);
  let l = n.z.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 24px;
  padding-bottom: 24px;
`,
    i = n.z.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    border-radius: var(--privy-border-radius-sm);
  }
`,
    o = n.z.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`,
    r = n.z.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding: 0 16px;
  border-width: 1px !important;
  border-radius: 12px;
  cursor: text;

  &:focus-within {
    border-color: var(--privy-color-accent);
  }
`;
  n.z.div`
  font-size: 42px !important;
`;
  let c = n.z.input`
  background-color: var(--privy-color-background);
  width: 100%;

  &:focus {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }

  && {
    font-size: 26px;
  }
`,
    s = (0, n.z)(c)`
  && {
    font-size: 42px;
  }
`;
  n.z.button`
  cursor: pointer;
  padding-left: 4px;
`;
  let d = n.z.div`
  font-size: 18px;
`,
    p = n.z.div`
  font-size: 12px;
  color: var(--privy-color-foreground-3);
  /* we need this container to maintain a static height if there's no content */
  height: 20px;
`;
  (n.z.div`
  display: flex;
  flex-direction: row;
  line-height: 22px;
  font-size: 16px;
  text-align: center;
  svg {
    margin: auto;
  }
`,
    (0, n.z)(a.LinkButton)`
  margin-top: 16px;
`);
  let u = n.q`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
  (0, n.z)(t.c)`
  border-radius: var(--privy-border-radius-md) !important;
  animation: ${u} 0.3s ease-in-out;
`;
  let h = n.z.a`
  && {
    color: var(--privy-color-accent);
  }

  cursor: pointer;
`;
  e.s([
    "F",
    0,
    o,
    "I",
    0,
    i,
    "a",
    0,
    r,
    "b",
    0,
    c,
    "c",
    0,
    d,
    "d",
    0,
    p,
    "e",
    0,
    l,
    "f",
    0,
    h,
    "g",
    0,
    s,
  ]);
};
