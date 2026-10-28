// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(561347),
    n = e.i(653327),
    r = e.i(352386),
    a = e.i(689391);
  let s = a.z.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px; /* 10px gap between items */
  padding-left: 8px; /* 8px indentation container */
`;
  a.z.div`
  &&& {
    margin-left: 6px; /* Center the line under the checkbox (12px/2) */
    border-left: 2px solid var(--privy-color-foreground-4);
    height: 10px; /* 10px H padding between paragraphs */
    margin-top: 0;
    margin-bottom: 0;
  }
`;
  let o = a.z.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ $variant: e }) => {
    switch (e) {
      case "success":
        return "var(--privy-color-success-bg)";
      case "error":
        return "var(--privy-color-error-bg)";
      default:
        return "var(--privy-color-background-2)";
    }
  }};
  flex-shrink: 0;
`,
    l = a.z.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start; /* Align all elements to the top */
  text-align: left;
  gap: 8px;

  && {
    a {
      color: var(--privy-color-accent);
    }
  }
`;
  e.s([
    "T",
    0,
    s,
    "a",
    0,
    ({ children: e, variant: a = "default", icon: s }) => {
      let d = () => {
        switch (a) {
          case "success":
            return "var(--privy-color-icon-success)";
          case "error":
            return "var(--privy-color-icon-error)";
          default:
            return "var(--privy-color-icon-muted)";
        }
      };
      return (0, t.jsxs)(l, {
        children: [
          (0, t.jsx)(o, {
            $variant: a,
            "data-variant": a,
            children: (() => {
              if (s)
                return r.default.isValidElement(s)
                  ? r.default.cloneElement(s, { stroke: d(), strokeWidth: 2 })
                  : s;
              switch (a) {
                case "success":
                default:
                  return (0, t.jsx)(n.f, {
                    size: 12,
                    stroke: d(),
                    strokeWidth: 3,
                  });
                case "error":
                  return (0, t.jsx)(i.X, {
                    size: 12,
                    stroke: d(),
                    strokeWidth: 3,
                  });
              }
            })(),
          }),
          e,
        ],
      });
    },
  ]);
};
