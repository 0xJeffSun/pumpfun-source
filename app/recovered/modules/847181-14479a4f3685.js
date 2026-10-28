// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    i = r.i(689391);
  let o = ({ title: r, description: i, children: o, ...a }) =>
    (0, e.jsx)(t, {
      ...a,
      children: (0, e.jsxs)(e.Fragment, {
        children: [
          (0, e.jsx)("h3", { children: r }),
          "string" == typeof i ? (0, e.jsx)("p", { children: i }) : i,
          o,
        ],
      }),
    });
  (0, i.z)(o)`
  margin-bottom: 24px;
`;
  let t = i.z.div`
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
    a = (0, i.z)(t)`
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
    ({ title: r, description: i, icon: o, children: t, ...n }) =>
      (0, e.jsxs)(a, {
        ...n,
        children: [
          o || null,
          (0, e.jsx)("h3", { children: r }),
          i && "string" == typeof i ? (0, e.jsx)("p", { children: i }) : i,
          t,
        ],
      }),
    "S",
    0,
    o,
  ]);
};
