// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(689391);
  let i = o.z.a`
  && {
    color: ${({ $variant: r }) => ("underlined" === r ? "var(--privy-color-foreground)" : "var(--privy-link-navigation-color, var(--privy-color-accent))")};
    font-weight: 400;
    text-decoration: ${({ $variant: r }) => ("underlined" === r ? "underline" : "var(--privy-link-navigation-decoration, none)")};
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
    cursor: ${({ $disabled: r }) => (r ? "not-allowed" : "pointer")};
    opacity: ${({ $disabled: r }) => (r ? 0.5 : 1)};

    font-size: ${({ $size: r }) => {
      switch (r) {
        case "xs":
          return "12px";
        case "sm":
          return "14px";
        default:
          return "16px";
      }
    }};

    line-height: ${({ $size: r }) => {
      switch (r) {
        case "xs":
          return "18px";
        case "sm":
          return "22px";
        default:
          return "24px";
      }
    }};

    transition:
      color 200ms ease,
      text-decoration-color 200ms ease,
      opacity 200ms ease;

    &:hover {
      color: ${({ $variant: r, $disabled: e }) => ("underlined" === r ? "var(--privy-color-foreground)" : "var(--privy-link-navigation-color, var(--privy-color-accent))")};
      text-decoration: ${({ $disabled: r }) => (r ? "none" : "underline")};
      text-underline-offset: 4px;
    }

    &:active {
      color: ${({ $variant: r, $disabled: e }) => (e ? ("underlined" === r ? "var(--privy-color-foreground)" : "var(--privy-link-navigation-color, var(--privy-color-accent))") : "var(--privy-color-foreground)")};
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--privy-shadow-focus-ring);
      border-radius: 2px;
    }
  }
`;
  r.s([
    "L",
    0,
    ({
      size: r = "md",
      variant: o = "navigation",
      disabled: a = !1,
      as: l,
      children: n,
      onClick: t,
      ...c
    }) =>
      (0, e.jsx)(i, {
        as: l,
        $size: r,
        $variant: o,
        $disabled: a,
        onClick: (r) => {
          a ? r.preventDefault() : t?.(r);
        },
        ...c,
        children: n,
      }),
  ]);
};
