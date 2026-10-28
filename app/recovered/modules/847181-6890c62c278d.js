// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(689391);
  let n = ({ title: e, description: i, children: n, ...a }) =>
    (0, t.jsx)(r, {
      ...a,
      children: (0, t.jsxs)(t.Fragment, {
        children: [
          (0, t.jsx)("h3", { children: e }),
          "string" == typeof i ? (0, t.jsx)("p", { children: i }) : i,
          n,
        ],
      }),
    });
  (0, i.z)(n)`
  margin-bottom: 24px;
`;
  let r = i.z.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  gap: 8px;
  width: 100%;
  margin-bottom: 24px;

  && h3 {
    font-size: 17px;
    color: var(--privy-color-foreground);
  }

  /* Sugar assuming children are paragraphs. Otherwise, handling styling on your own */
  && p {
    color: var(--privy-color-foreground-2);
    font-size: 14px;
  }
`,
    a = (0, i.z)(r)`
  align-items: center;
  text-align: center;
  gap: 16px;

  h3 {
    margin-bottom: 24px;
  }
`;
  e.s([
    "C",
    0,
    ({ title: e, description: i, icon: n, children: r, ...s }) =>
      (0, t.jsxs)(a, {
        ...s,
        children: [
          n || null,
          (0, t.jsx)("h3", { children: e }),
          i && "string" == typeof i ? (0, t.jsx)("p", { children: i }) : i,
          r,
        ],
      }),
    "S",
    0,
    n,
  ]);
};
