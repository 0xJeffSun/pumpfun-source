// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(352386);
  let i = o.forwardRef(function ({ title: r, titleId: e, ...i }, a) {
    return o.createElement(
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
          ref: a,
          "aria-labelledby": e,
        },
        i,
      ),
      r ? o.createElement("title", { id: e }, r) : null,
      o.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z",
      }),
    );
  });
  var a = r.i(689391);
  let l = a.z.div`
  display: flex;
  gap: 0.5rem;
  background-color: var(--privy-color-info-bg);
  border: 1px solid var(--privy-color-border-info);
  align-items: flex-start;
  padding: 0.75rem;
  border-radius: 0.5rem;
  overflow: clip;
  width: 100%;
`,
    n = a.z.div`
  color: ${(r) => ("dark" === r.$theme ? "var(--privy-color-foreground-2)" : "var(--privy-color-foreground)")};
  flex: 1;
  text-align: left;

  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.125rem;
  font-feature-settings:
    'calt' 0,
    'kern' 0;
`;
  r.s(
    [
      "I",
      0,
      ({ children: r, theme: o, className: a }) =>
        (0, e.jsxs)(l, {
          $theme: o,
          className: a,
          children: [
            (0, e.jsx)(i, {
              width: "16px",
              height: "16px",
              color: "var(--privy-color-foreground-2)",
              strokeWidth: 2,
              style: { flexShrink: 0 },
            }),
            (0, e.jsx)(n, { $theme: o, children: r }),
          ],
        }),
    ],
    176862,
  );
};
