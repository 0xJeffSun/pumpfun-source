// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(689391),
    i = e.i(995040),
    n = e.i(794193);
  let r = t.z.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 24px;
  padding-bottom: 24px;
`,
    a = t.z.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    border-radius: var(--privy-border-radius-sm);
  }
`,
    s = t.z.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`,
    o = t.z.div`
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
  t.z.div`
  font-size: 42px !important;
`;
  let l = t.z.input`
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
    d = (0, t.z)(l)`
  && {
    font-size: 42px;
  }
`;
  t.z.button`
  cursor: pointer;
  padding-left: 4px;
`;
  let c = t.z.div`
  font-size: 18px;
`,
    h = t.z.div`
  font-size: 12px;
  color: var(--privy-color-foreground-3);
  /* we need this container to maintain a static height if there's no content */
  height: 20px;
`;
  (t.z.div`
  display: flex;
  flex-direction: row;
  line-height: 22px;
  font-size: 16px;
  text-align: center;
  svg {
    margin: auto;
  }
`,
    (0, t.z)(n.LinkButton)`
  margin-top: 16px;
`);
  let u = t.q`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
  (0, t.z)(i.c)`
  border-radius: var(--privy-border-radius-md) !important;
  animation: ${u} 0.3s ease-in-out;
`;
  let p = t.z.a`
  && {
    color: var(--privy-color-accent);
  }

  cursor: pointer;
`;
  e.s([
    "F",
    0,
    s,
    "I",
    0,
    a,
    "a",
    0,
    o,
    "b",
    0,
    l,
    "c",
    0,
    c,
    "d",
    0,
    h,
    "e",
    0,
    r,
    "f",
    0,
    p,
    "g",
    0,
    d,
  ]);
};
