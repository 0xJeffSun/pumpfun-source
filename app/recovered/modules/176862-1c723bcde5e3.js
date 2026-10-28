// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    o = e.i(352386);
  let t = o.forwardRef(function ({ title: e, titleId: r, ...t }, i) {
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
          ref: i,
          "aria-labelledby": r,
        },
        t,
      ),
      e ? o.createElement("title", { id: r }, e) : null,
      o.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z",
      }),
    );
  });
  var i = e.i(689391);
  let a = i.z.div`
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
    n = i.z.div`
  color: ${(e) => ("dark" === e.$theme ? "var(--privy-color-foreground-2)" : "var(--privy-color-foreground)")};
  flex: 1;
  text-align: left;

  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.125rem;
  font-feature-settings:
    'calt' 0,
    'kern' 0;
`;
  e.s(
    [
      "I",
      0,
      ({ children: e, theme: o, className: i }) =>
        (0, r.jsxs)(a, {
          $theme: o,
          className: i,
          children: [
            (0, r.jsx)(t, {
              width: "16px",
              height: "16px",
              color: "var(--privy-color-foreground-2)",
              strokeWidth: 2,
              style: { flexShrink: 0 },
            }),
            (0, r.jsx)(n, { $theme: o, children: e }),
          ],
        }),
    ],
    176862,
  );
};
