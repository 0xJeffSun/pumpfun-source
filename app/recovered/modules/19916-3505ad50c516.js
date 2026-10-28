// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(561347),
    i = r.i(653327),
    a = r.i(352386),
    l = r.i(689391);
  let n = l.z.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px; /* 10px gap between items */
  padding-left: 8px; /* 8px indentation container */
`;
  l.z.div`
  &&& {
    margin-left: 6px; /* Center the line under the checkbox (12px/2) */
    border-left: 2px solid var(--privy-color-foreground-4);
    height: 10px; /* 10px H padding between paragraphs */
    margin-top: 0;
    margin-bottom: 0;
  }
`;
  let t = l.z.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ $variant: r }) => {
    switch (r) {
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
    c = l.z.div`
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
  r.s([
    "T",
    0,
    n,
    "a",
    0,
    ({ children: r, variant: l = "default", icon: n }) => {
      let d = () => {
        switch (l) {
          case "success":
            return "var(--privy-color-icon-success)";
          case "error":
            return "var(--privy-color-icon-error)";
          default:
            return "var(--privy-color-icon-muted)";
        }
      };
      return (0, e.jsxs)(c, {
        children: [
          (0, e.jsx)(t, {
            $variant: l,
            "data-variant": l,
            children: (() => {
              if (n)
                return a.default.isValidElement(n)
                  ? a.default.cloneElement(n, { stroke: d(), strokeWidth: 2 })
                  : n;
              switch (l) {
                case "success":
                default:
                  return (0, e.jsx)(i.f, {
                    size: 12,
                    stroke: d(),
                    strokeWidth: 3,
                  });
                case "error":
                  return (0, e.jsx)(o.X, {
                    size: 12,
                    stroke: d(),
                    strokeWidth: 3,
                  });
              }
            })(),
          }),
          r,
        ],
      });
    },
  ]);
};
