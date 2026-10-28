// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(689391);
  let a = ({ data: e }) => {
      let n = (e) =>
        "object" == typeof e && null !== e
          ? (0, t.jsx)(s, {
              children: Object.entries(e).map(([e, a]) =>
                (0, t.jsxs)(
                  "li",
                  {
                    children: [
                      (0, t.jsxs)("strong", { children: [e, ":"] }),
                      " ",
                      n(a),
                    ],
                  },
                  e,
                ),
              ),
            })
          : (0, t.jsx)("span", { children: String(e) });
      return (0, t.jsx)("div", { children: n(e) });
    },
    i = n.z.div`
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
    s = n.z.ul`
  margin-left: 12px !important;
  white-space: nowrap;

  &:first-child {
    margin-left: 0 !important;
  }

  strong {
    font-weight: 500 !important;
  }
`;
  e.s([
    "D",
    0,
    ({ data: e, className: n }) =>
      (0, t.jsx)(i, { className: n, children: (0, t.jsx)(a, { data: e }) }),
    "M",
    0,
    i,
  ]);
};
