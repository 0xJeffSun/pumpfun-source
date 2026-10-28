// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    o = e.i(689391);
  let a = ({ title: e, description: o, children: a, ...i }) =>
    (0, r.jsx)(t, {
      ...i,
      children: (0, r.jsxs)(r.Fragment, {
        children: [
          (0, r.jsx)("h3", { children: e }),
          "string" == typeof o ? (0, r.jsx)("p", { children: o }) : o,
          a,
        ],
      }),
    });
  (0, o.z)(a)`
  margin-bottom: 24px;
`;
  let t = o.z.div`
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
    i = (0, o.z)(t)`
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
    ({ title: e, description: o, icon: a, children: t, ...l }) =>
      (0, r.jsxs)(i, {
        ...l,
        children: [
          a || null,
          (0, r.jsx)("h3", { children: e }),
          o && "string" == typeof o ? (0, r.jsx)("p", { children: o }) : o,
          t,
        ],
      }),
    "S",
    0,
    a,
  ]);
};
