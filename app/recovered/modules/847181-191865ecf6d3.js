// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(689391);
  let a = ({ title: e, description: n, children: a, ...r }) =>
    (0, t.jsx)(i, {
      ...r,
      children: (0, t.jsxs)(t.Fragment, {
        children: [
          (0, t.jsx)("h3", { children: e }),
          "string" == typeof n ? (0, t.jsx)("p", { children: n }) : n,
          a,
        ],
      }),
    });
  (0, n.z)(a)`
  margin-bottom: 24px;
`;
  let i = n.z.div`
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
    r = (0, n.z)(i)`
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
    ({ title: e, description: n, icon: a, children: i, ...o }) =>
      (0, t.jsxs)(r, {
        ...o,
        children: [
          a || null,
          (0, t.jsx)("h3", { children: e }),
          n && "string" == typeof n ? (0, t.jsx)("p", { children: n }) : n,
          i,
        ],
      }),
    "S",
    0,
    a,
  ]);
};
