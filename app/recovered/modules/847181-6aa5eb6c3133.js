// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var o = r.i(732486),
    e = r.i(689391);
  let l = ({ title: r, description: e, children: l, ...a }) =>
    (0, o.jsx)(i, {
      ...a,
      children: (0, o.jsxs)(o.Fragment, {
        children: [
          (0, o.jsx)("h3", { children: r }),
          "string" == typeof e ? (0, o.jsx)("p", { children: e }) : e,
          l,
        ],
      }),
    });
  (0, e.z)(l)`
  margin-bottom: 24px;
`;
  let i = e.z.div`
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
    a = (0, e.z)(i)`
  align-items: center;
  text-align: center;
  gap: 16px;

  h3 {
    margin-bottom: 24px;
  }
`;
  r.s([
    "C",
    0,
    ({ title: r, description: e, icon: l, children: i, ...c }) =>
      (0, o.jsxs)(a, {
        ...c,
        children: [
          l || null,
          (0, o.jsx)("h3", { children: r }),
          e && "string" == typeof e ? (0, o.jsx)("p", { children: e }) : e,
          i,
        ],
      }),
    "S",
    0,
    l,
  ]);
};
