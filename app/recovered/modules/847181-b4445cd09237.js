// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(732486),
    t = e.i(689391);
  let a = ({ title: e, description: t, children: a, ...i }) =>
    (0, n.jsx)(l, {
      ...i,
      children: (0, n.jsxs)(n.Fragment, {
        children: [
          (0, n.jsx)("h3", { children: e }),
          "string" == typeof t ? (0, n.jsx)("p", { children: t }) : t,
          a,
        ],
      }),
    });
  (0, t.z)(a)`
  margin-bottom: 24px;
`;
  let l = t.z.div`
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
    i = (0, t.z)(l)`
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
    ({ title: e, description: t, icon: a, children: l, ...o }) =>
      (0, n.jsxs)(i, {
        ...o,
        children: [
          a || null,
          (0, n.jsx)("h3", { children: e }),
          t && "string" == typeof t ? (0, n.jsx)("p", { children: t }) : t,
          l,
        ],
      }),
    "S",
    0,
    a,
  ]);
};
