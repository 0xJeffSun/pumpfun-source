// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    i = e.i(689391);
  let o = i.z.a`
  && {
    color: ${({ $variant: e }) => ("underlined" === e ? "var(--privy-color-foreground)" : "var(--privy-link-navigation-color, var(--privy-color-accent))")};
    font-weight: 400;
    text-decoration: ${({ $variant: e }) => ("underlined" === e ? "underline" : "var(--privy-link-navigation-decoration, none)")};
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
    cursor: ${({ $disabled: e }) => (e ? "not-allowed" : "pointer")};
    opacity: ${({ $disabled: e }) => (e ? 0.5 : 1)};

    font-size: ${({ $size: e }) => {
      switch (e) {
        case "xs":
          return "12px";
        case "sm":
          return "14px";
        default:
          return "16px";
      }
    }};

    line-height: ${({ $size: e }) => {
      switch (e) {
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
      color: ${({ $variant: e, $disabled: r }) => ("underlined" === e ? "var(--privy-color-foreground)" : "var(--privy-link-navigation-color, var(--privy-color-accent))")};
      text-decoration: ${({ $disabled: e }) => (e ? "none" : "underline")};
      text-underline-offset: 4px;
    }

    &:active {
      color: ${({ $variant: e, $disabled: r }) => (r ? ("underlined" === e ? "var(--privy-color-foreground)" : "var(--privy-link-navigation-color, var(--privy-color-accent))") : "var(--privy-color-foreground)")};
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
  e.s([
    "L",
    0,
    ({
      size: e = "md",
      variant: i = "navigation",
      disabled: t = !1,
      as: a,
      children: n,
      onClick: l,
      ...c
    }) =>
      (0, r.jsx)(o, {
        as: a,
        $size: e,
        $variant: i,
        $disabled: t,
        onClick: (e) => {
          t ? e.preventDefault() : l?.(e);
        },
        ...c,
        children: n,
      }),
  ]);
};
