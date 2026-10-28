// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(352386),
    i = r.i(689391);
  let a = i.z.a`
  display: flex;
  align-items: center;
  gap: 6px;

  && {
    margin: 8px 2px;
    font-size: 14px;
    color: ${(r) => (r.justOpened ? "var(--privy-color-foreground)" : r.color || "var(--privy-color-foreground-3)")};
    font-weight: ${(r) => (r.justOpened ? 500 : "normal")};
    transition: color 350ms ease;

    :focus,
    :active {
      background-color: transparent;
      border: none;
      outline: none;
      box-shadow: none;
    }

    :hover {
      color: ${(r) => (r.justOpened ? "var(--privy-color-foreground)" : "var(--privy-color-foreground-2)")};
    }

    :active {
      color: var(--privy-color-foreground);
      font-weight: 500;
    }

    @media (max-width: 440px) {
      margin: 12px 2px;
    }
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;
  r.s([
    "O",
    0,
    (r) => {
      let [i, l] = (0, o.useState)(!1);
      return (0, e.jsx)(a, {
        color: r.color,
        href: r.url,
        target: "_blank",
        rel: "noreferrer noopener",
        onClick: () => {
          (l(!0), setTimeout(() => l(!1), 1500));
        },
        justOpened: i,
        children: r.text,
      });
    },
  ]);
};
