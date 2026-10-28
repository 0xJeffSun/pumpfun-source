// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(689391),
    i = r.i(995040),
    o = r.i(794193);
  let t = e.z.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 24px;
  padding-bottom: 24px;
`,
    a = e.z.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    border-radius: var(--privy-border-radius-sm);
  }
`,
    n = e.z.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`,
    l = e.z.div`
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
  e.z.div`
  font-size: 42px !important;
`;
  let s = e.z.input`
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
    c = (0, e.z)(s)`
  && {
    font-size: 42px;
  }
`;
  e.z.button`
  cursor: pointer;
  padding-left: 4px;
`;
  let d = e.z.div`
  font-size: 18px;
`,
    p = e.z.div`
  font-size: 12px;
  color: var(--privy-color-foreground-3);
  /* we need this container to maintain a static height if there's no content */
  height: 20px;
`;
  (e.z.div`
  display: flex;
  flex-direction: row;
  line-height: 22px;
  font-size: 16px;
  text-align: center;
  svg {
    margin: auto;
  }
`,
    (0, e.z)(o.LinkButton)`
  margin-top: 16px;
`);
  let h = e.q`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
  (0, e.z)(i.c)`
  border-radius: var(--privy-border-radius-md) !important;
  animation: ${h} 0.3s ease-in-out;
`;
  let v = e.z.a`
  && {
    color: var(--privy-color-accent);
  }

  cursor: pointer;
`;
  r.s([
    "F",
    0,
    n,
    "I",
    0,
    a,
    "a",
    0,
    l,
    "b",
    0,
    s,
    "c",
    0,
    d,
    "d",
    0,
    p,
    "e",
    0,
    t,
    "f",
    0,
    v,
    "g",
    0,
    c,
  ]);
};
