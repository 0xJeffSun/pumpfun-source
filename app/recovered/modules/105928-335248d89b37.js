// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    i = e.i(689391);
  i.z.label`
  && {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    text-align: left;
    border-radius: 0.5rem;
    border: 1px solid var(--privy-color-foreground-4);
    width: 100%;
  }
`;
  let o = i.z.div`
  display: inline-block;
  vertical-align: middle;
`,
    n = i.z.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`,
    t = i.z.input.attrs({ type: "checkbox" })`
  border: 0;
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`,
    a = i.z.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  transition: all 150ms;
  cursor: pointer;
  border-color: ${(e) => e.color};
  border-radius: 3px;
  background: ${(e) => (e.checked ? e.color : "var(--privy-color-background)")};

  && {
    /* This is necessary to override css reset for border width */
    border-width: 1px;
  }

  ${t}:focus + & {
    box-shadow: 0 0 0 1px ${(e) => e.color};
  }

  ${n} {
    visibility: ${(e) => (e.checked ? "visible" : "hidden")};
  }
`;
  e.s(
    [
      "C",
      0,
      ({
        className: e,
        checked: i,
        color: s = "var(--privy-color-accent)",
        ...l
      }) =>
        (0, r.jsx)("label", {
          children: (0, r.jsxs)(o, {
            className: e,
            children: [
              (0, r.jsx)(t, { checked: i, ...l }),
              (0, r.jsx)(a, {
                color: s,
                checked: i,
                children: (0, r.jsx)(n, {
                  viewBox: "0 0 24 24",
                  children: (0, r.jsx)("polyline", {
                    points: "20 6 9 17 4 12",
                  }),
                }),
              }),
            ],
          }),
        }),
    ],
    105928,
  );
  var s = e.i(352386);
  let l = s.forwardRef(function ({ title: e, titleId: r, ...i }, o) {
    return s.createElement(
      "svg",
      Object.assign(
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          "aria-hidden": "true",
          "data-slot": "icon",
          ref: o,
          "aria-labelledby": r,
        },
        i,
      ),
      e ? s.createElement("title", { id: r }, e) : null,
      s.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75",
      }),
    );
  });
  e.s(["f", 0, l], 171762);
};
