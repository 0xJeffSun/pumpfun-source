// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(689391),
    o = r.i(541021),
    i = r.i(335341);
  let t = (0, e.z)(i.S)`
  #privy-content-footer-container {
    margin-top: 0;
  }
`,
    n = e.z.p`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem;
  color: var(--privy-color-foreground-3);
  margin: 0.25rem 0 0;
`,
    a = e.z.img`
  width: 2rem;
  height: 2rem;
  border-radius: var(--privy-border-radius-full);
  object-fit: cover;
  flex-shrink: 0;
`,
    l = e.z.img`
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
`,
    s = e.z.span`
  font-weight: 500;
`,
    c = e.z.span`
  font-size: 0.875rem;
  color: var(--privy-color-foreground-3);
  margin-left: auto;
`;
  e.z.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  min-height: 2.25rem;
  border-radius: 6.25rem;
  border: none;
  background-color: var(--privy-color-background-2);

  input {
    flex: 1;
    border: none;
    outline: none;
    box-shadow: none;
    font-size: 0.875rem;
    line-height: 1.25rem;
    background: transparent;
    color: var(--privy-color-foreground);

    &:focus {
      outline: none;
      box-shadow: none;
    }

    &::placeholder {
      color: var(--privy-color-foreground-3);
    }
  }
`;
  let d = e.z.button`
  && {
    position: relative;
    width: 100%;
    display: flex;
    gap: 0.75rem;
    align-items: center;
    padding: 0.625rem 0.75rem;
    min-height: 3.5rem;
    border: 1px solid
      ${(r) => (r.$selected ? "var(--privy-color-icon-interactive)" : "var(--privy-color-foreground-4)")};
    border-radius: var(--privy-border-radius-md);
    background-color: ${(r) => (r.$selected ? "var(--privy-color-info-bg)" : "transparent")};
    color: var(--privy-color-foreground);
    font-size: 0.875rem;
    line-height: 1.5rem;
    cursor: pointer;
    outline: none;
    box-shadow: none;
    transition:
      background-color 200ms ease,
      border-color 200ms ease;

    &:hover {
      background-color: var(--privy-color-background-2);
    }

    &:disabled {
      opacity: ${(r) => (r.$selected ? 1 : 0.5)};
      cursor: not-allowed;
    }

    &:focus,
    &:focus-visible {
      outline: none;
      box-shadow: none;
    }
  }
`,
    p = e.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem 0;
`,
    u = e.z.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem 0;
`,
    h = e.z.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`,
    v = e.z.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: var(--privy-border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: ${(r) => ("done" === r.$status ? "var(--privy-color-success-light)" : "var(--privy-color-background-2)")};
`,
    g = e.z.div`
  width: 2px;
  height: 1rem;
  background-color: var(--privy-color-background-2);
  margin-left: 0.6875rem;
`,
    m = e.z.span`
  font-size: 0.875rem;
  color: var(--privy-color-foreground);
`;
  e.z.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--privy-border-radius-md);
  background-color: var(--privy-color-background-2);
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: var(--privy-color-foreground-3);
`;
  let f = e.z.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8125rem;
  line-height: 1.25rem;
`,
    x = e.z.span`
  color: var(--privy-color-foreground);
  font-weight: 400;
`,
    b = e.z.span`
  color: var(--privy-color-foreground);
  font-weight: 500;
  text-align: right;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,
    y = (0, e.z)(o.L)`
  && {
    margin-left: auto;
    height: 1.5rem;
    width: 1.5rem;
    border-width: 2px;
    flex-shrink: 0;
  }
`;
  r.s([
    "C",
    0,
    t,
    "L",
    0,
    p,
    "N",
    0,
    l,
    "O",
    0,
    d,
    "S",
    0,
    n,
    "T",
    0,
    a,
    "a",
    0,
    s,
    "b",
    0,
    y,
    "c",
    0,
    c,
    "d",
    0,
    u,
    "e",
    0,
    h,
    "f",
    0,
    v,
    "g",
    0,
    m,
    "h",
    0,
    g,
    "i",
    0,
    f,
    "j",
    0,
    x,
    "k",
    0,
    b,
  ]);
};
