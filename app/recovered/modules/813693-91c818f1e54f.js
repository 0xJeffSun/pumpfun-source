// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var i = e.i(689391),
    t = e.i(995040),
    r = e.i(794193);
  let n = i.z.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 24px;
  padding-bottom: 24px;
`,
    o = i.z.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    border-radius: var(--privy-border-radius-sm);
  }
`,
    a = i.z.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`,
    d = i.z.div`
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
  i.z.div`
  font-size: 42px !important;
`;
  let l = i.z.input`
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
    c = (0, i.z)(l)`
  && {
    font-size: 42px;
  }
`;
  i.z.button`
  cursor: pointer;
  padding-left: 4px;
`;
  let s = i.z.div`
  font-size: 18px;
`,
    u = i.z.div`
  font-size: 12px;
  color: var(--privy-color-foreground-3);
  /* we need this container to maintain a static height if there's no content */
  height: 20px;
`;
  (i.z.div`
  display: flex;
  flex-direction: row;
  line-height: 22px;
  font-size: 16px;
  text-align: center;
  svg {
    margin: auto;
  }
`,
    (0, i.z)(r.LinkButton)`
  margin-top: 16px;
`);
  let p = i.q`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
  (0, i.z)(t.c)`
  border-radius: var(--privy-border-radius-md) !important;
  animation: ${p} 0.3s ease-in-out;
`;
  let f = i.z.a`
  && {
    color: var(--privy-color-accent);
  }

  cursor: pointer;
`;
  e.s([
    "F",
    0,
    a,
    "I",
    0,
    o,
    "a",
    0,
    d,
    "b",
    0,
    l,
    "c",
    0,
    s,
    "d",
    0,
    u,
    "e",
    0,
    n,
    "f",
    0,
    f,
    "g",
    0,
    c,
  ]);
};
