// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(689391);
  let i = ({ data: r }) => {
      let o = (r) =>
        "object" == typeof r && null !== r
          ? (0, e.jsx)(l, {
              children: Object.entries(r).map(([r, i]) =>
                (0, e.jsxs)(
                  "li",
                  {
                    children: [
                      (0, e.jsxs)("strong", { children: [r, ":"] }),
                      " ",
                      o(i),
                    ],
                  },
                  r,
                ),
              ),
            })
          : (0, e.jsx)("span", { children: String(r) });
      return (0, e.jsx)("div", { children: o(r) });
    },
    a = o.z.div`
  margin-top: 1.5rem;
  background-color: var(--privy-color-background-2);
  border-radius: var(--privy-border-radius-md);
  padding: 12px;
  text-align: left;
  max-height: 310px;
  overflow: scroll;
  white-space: pre-wrap;
  width: 100%;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--privy-color-foreground);
  line-height: 1.5;

  /* hide the scrollbars */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`,
    l = o.z.ul`
  margin-left: 12px !important;
  white-space: nowrap;

  &:first-child {
    margin-left: 0 !important;
  }

  strong {
    font-weight: 500 !important;
  }
`;
  r.s([
    "D",
    0,
    ({ data: r, className: o }) =>
      (0, e.jsx)(a, { className: o, children: (0, e.jsx)(i, { data: r }) }),
    "M",
    0,
    a,
  ]);
};
