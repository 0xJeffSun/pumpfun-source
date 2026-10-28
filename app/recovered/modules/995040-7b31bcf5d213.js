// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var o = r.i(732486),
    e = r.i(689391),
    a = r.i(541021),
    l = r.i(387556),
    i = r.i(839326),
    c = r.i(352386);
  let n = c.forwardRef(function ({ title: r, titleId: o, ...e }, a) {
    return c.createElement(
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
          "aria-labelledby": o,
        },
        e,
      ),
      r ? c.createElement("title", { id: o }, r) : null,
      c.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M6 18 18 6M6 6l12 12",
      }),
    );
  });
  var t = r.i(933185),
    d = r.i(748117);
  let s = e.z.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  user-select: none;

  & {
    width: auto;
    cursor: pointer;
    border-radius: ${({ $size: r }) => ("sm" === r ? "6px" : "var(--privy-border-radius-sm)")};

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: -0.016px;
  }

  && {
    height: ${({ $size: r }) => ("sm" === r ? "28px" : "48px")};
    padding: 0 ${({ $size: r }) => ("sm" === r ? "10px" : "16px")};
  }
`,
    v = ({
      children: r,
      loading: e,
      disabled: l,
      success: i,
      size: c = "lg",
      loadingText: n = "Loading...",
      as: t,
      onClick: d,
      ...s
    }) => {
      let v = "a" === t,
        u = !(!e && !l);
      return (0, o.jsx)(p, {
        as: t,
        disabled: v ? void 0 : u,
        "aria-disabled": v ? u : void 0,
        $success: i,
        $size: c,
        onClick: (r) => {
          v && u ? r.preventDefault() : d?.(r);
        },
        ...s,
        children: e
          ? (0, o.jsxs)(o.Fragment, {
              children: [
                (0, o.jsx)(a.B, {}),
                n
                  ? (0, o.jsx)("span", {
                      style: { marginLeft: "8px" },
                      children: n,
                    })
                  : null,
              ],
            })
          : r,
      });
    },
    u = (0, e.z)(s)`
  position: relative;

  && {
    background-color: var(--privy-color-accent);
    color: var(--privy-color-foreground-accent);

    transition: background-color 200ms ease;
  }

  &:hover {
    background-color: var(--privy-color-accent-dark);
  }

  &:active {
    background-color: var(--privy-color-accent-dark);
  }

  &:disabled,
  &:hover:disabled,
  &:active:disabled {
    cursor: not-allowed;
    color: var(--privy-color-foreground-disabled);
    background-color: var(--privy-color-accent-dark);
  }
`,
    p = (0, e.z)(s)`
  position: relative;

  && {
    background-color: ${(r) => (r.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent)")};
    color: var(--privy-color-foreground-accent);

    transition: background-color 200ms ease;
  }

  &:hover {
    background-color: ${(r) => (r.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent-dark)")};
  }

  &:active {
    background-color: ${(r) => (r.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent-dark)")};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--privy-shadow-focus-ring);
  }

  &:disabled {
    background-color: var(--privy-color-background-2);
    border: 1px solid var(--privy-color-border-default);
    color: var(--privy-color-foreground-disabled);
    cursor: not-allowed;
  }

  &:hover:disabled,
  &:active:disabled {
    background-color: var(--privy-color-background-2);
    border: 1px solid var(--privy-color-border-default);
    color: var(--privy-color-foreground-disabled);
    cursor: not-allowed;
  }

  /* Emulate disabled look for anchors via the prop */
  ${(r) =>
    r.disabled &&
    e.m`
      &&&,
      &&&:hover,
      &&&:active {
        background-color: var(--privy-color-background-2);
        border: 1px solid var(--privy-color-border-default);
        color: var(--privy-color-foreground-disabled);
        cursor: not-allowed;
      }
    `}
`,
    h = ({
      children: r,
      loading: e,
      disabled: l,
      size: i = "lg",
      loadingText: c = "Loading...",
      as: n,
      onClick: t,
      ...d
    }) => {
      let s = "a" === n,
        v = !(!e && !l);
      return (0, o.jsx)(b, {
        as: n,
        disabled: s ? void 0 : v,
        "aria-disabled": s ? v : void 0,
        $size: i,
        onClick: (r) => {
          s && v ? r.preventDefault() : t?.(r);
        },
        ...d,
        children: e
          ? (0, o.jsxs)(o.Fragment, {
              children: [
                (0, o.jsx)(a.B, {}),
                c
                  ? (0, o.jsx)("span", {
                      style: { marginLeft: "8px" },
                      children: c,
                    })
                  : null,
              ],
            })
          : r,
      });
    },
    g = ({
      children: r,
      loading: e,
      disabled: l,
      size: i = "lg",
      loadingText: c = "Loading...",
      as: n,
      onClick: t,
      ...d
    }) => {
      let s = "a" === n,
        v = !(!e && !l);
      return (0, o.jsx)(y, {
        as: n,
        disabled: s ? void 0 : v,
        "aria-disabled": s ? v : void 0,
        $size: i,
        onClick: (r) => {
          s && v ? r.preventDefault() : t?.(r);
        },
        ...d,
        children: e
          ? (0, o.jsxs)(o.Fragment, {
              children: [
                (0, o.jsx)(a.B, {}),
                c
                  ? (0, o.jsx)("span", {
                      style: { marginLeft: "8px" },
                      children: c,
                    })
                  : null,
              ],
            })
          : r,
      });
    },
    b = (0, e.z)(s)`
  && {
    border-width: 1px;
    border-style: solid;
    border-color: ${(r) => (r.$warn ? "var(--privy-color-border-error)" : "var(--privy-color-accent)")};
    background-color: var(--privy-color-background);
    color: ${(r) => (r.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent)")};
    transition:
      border-color 200ms ease,
      color 200ms ease,
      background-color 200ms ease;
  }

  &:hover {
    border-color: ${(r) => (r.$warn ? "var(--privy-color-border-error)" : "var(--privy-color-border-interactive-hover)")};
    background-color: ${(r) => (r.$warn ? "var(--privy-color-error-light)" : "var(--privy-color-info-bg-hover)")};
    color: ${(r) => (r.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent)")};
  }

  &:active {
    border-color: ${(r) => (r.$warn ? "var(--privy-color-border-error)" : "var(--privy-color-border-interactive)")};
    background-color: ${(r) => (r.$warn ? "var(--privy-color-error-bg-hover)" : "var(--privy-color-info-bg)")};
    color: ${(r) => (r.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent)")};
  }

  &:disabled {
    border-color: var(--privy-color-border-default);
    background-color: var(--privy-color-background-2);
    color: var(--privy-color-foreground-disabled);
    cursor: not-allowed;
  }

  &:hover:disabled,
  &:active:disabled {
    border-color: var(--privy-color-border-default);
    background-color: var(--privy-color-background-2);
    color: var(--privy-color-foreground-disabled);
    cursor: not-allowed;
  }

  /* Anchor disabled look (prop-driven) */
  ${(r) =>
    r.disabled &&
    e.m`
      &&&,
      &&&:hover,
      &&&:active {
        border-color: var(--privy-color-border-default);
        background-color: var(--privy-color-background-2);
        color: var(--privy-color-foreground-disabled);
        cursor: not-allowed;
      }
    `}
`,
    y = (0, e.z)(s)`
  && {
    border-width: 1px;
    border-style: solid;
    border-color: var(--privy-color-border-default);
    background-color: transparent;
    color: var(--privy-color-foreground-2);

    transition:
      border-color 200ms ease,
      color 200ms ease,
      background-color 200ms ease;
  }

  &:hover {
    border-color: var(--privy-color-border-default);
    background-color: var(--privy-color-info-bg-hover);
    color: var(--privy-color-foreground-2);
  }

  &:active {
    border-color: var(--privy-color-border-default);
    background-color: var(--privy-color-info-bg);
    color: var(--privy-color-foreground-2);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--privy-shadow-focus-ring);
  }

  &:disabled {
    border-color: var(--privy-color-border-default);
    background-color: var(--privy-color-background-2);
    color: var(--privy-color-foreground-disabled);
    cursor: not-allowed;
  }

  &:hover:disabled,
  &:active:disabled {
    border-color: var(--privy-color-border-default);
    background-color: var(--privy-color-background-2);
    color: var(--privy-color-foreground-disabled);
    cursor: not-allowed;
  }

  /* Anchor disabled look (prop-driven) */
  ${(r) =>
    r.disabled &&
    e.m`
      &&&,
      &&&:hover,
      &&&:active {
        border-color: var(--privy-color-border-default);
        background-color: var(--privy-color-background-2);
        color: var(--privy-color-foreground-disabled);
        cursor: not-allowed;
      }
    `}
`,
    f = e.z.button`
  && {
    padding: 12px 16px;
    font-weight: 500;
    text-align: center;
    color: var(--privy-color-foreground-accent);
    background-color: var(--privy-color-accent);
    border-radius: var(--privy-border-radius-sm);
    min-width: 144px;
    opacity: ${(r) => (r.invisible ? "0" : "1")};
    transition:
      opacity 200ms ease,
      background-color 200ms ease,
      color 200ms ease;
    user-select: none;

    ${(r) =>
      r.invisible &&
      e.m`
        pointer-events: none;
      `}

    &:hover {
      background-color: var(--privy-color-accent-dark);
    }
    &:active {
      background-color: var(--privy-color-accent-dark);
    }

    &:hover:disabled,
    &:active:disabled {
      background-color: var(--privy-color-background-2);
      color: var(--privy-color-foreground-disabled);
      cursor: not-allowed;
    }
  }
`;
  e.z.div`
  /* Set to match height of SoftCtaButton to avoid reflow if conditionally rendered */
  height: 44px;
`;
  let x = e.z.button`
  && {
    color: var(--privy-color-accent);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    cursor: pointer;
    border-radius: 0 var(--privy-border-radius-mdlg) var(--privy-border-radius-mdlg) 0;
    border: none;
    transition: color 200ms ease;

    /* Tablet and Up */
    @media (min-width: 441px) {
      font-size: 14px;
    }

    :hover {
      color: var(--privy-color-accent-dark);
    }

    && > :first-child {
      opacity: ${(r) => +!r.$isSubmitting};
    }

    && > :last-child {
      position: absolute;
      display: flex;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);

      /** Will map to the opposite of first span */
      opacity: ${(r) => +!!r.$isSubmitting};
    }

    :disabled,
    :hover:disabled {
      color: var(--privy-color-foreground-disabled);
      cursor: not-allowed;
    }
  }
`,
    m = ({ backFn: r, disabled: e = !1, "aria-label": a }) =>
      (0, o.jsx)("div", {
        children: (0, o.jsx)(j, {
          type: "button",
          "aria-label": a,
          disabled: e,
          onClick: e ? void 0 : r,
          children: (0, o.jsx)(l.f, {
            height: "16px",
            width: "16px",
            strokeWidth: 2,
          }),
        }),
      }),
    k = ({ infoFn: r }) =>
      (0, o.jsx)("div", {
        children: (0, o.jsx)($, {
          "aria-label": "info",
          onClick: r,
          children: (0, o.jsx)(i.f, {
            height: "22px",
            width: "22px",
            strokeWidth: 2,
          }),
        }),
      }),
    w = (r) =>
      (0, o.jsx)("div", {
        children: (0, o.jsx)(j, {
          type: "button",
          "aria-label": r["aria-label"] ?? "close modal",
          onClick: r.onClose,
          children: (0, o.jsx)(n, {
            height: "16px",
            width: "16px",
            strokeWidth: 2,
          }),
        }),
      }),
    j = e.z.button`
  && {
    cursor: pointer;
    display: flex;
    opacity: 0.6;

    background-color: var(--privy-color-background-2);
    border-radius: var(--privy-border-radius-full);
    padding: 4px;

    > svg {
      margin: auto;
      color: var(--privy-color-foreground);
    }

    :hover {
      opacity: 1;
    }

    :disabled {
      cursor: default;
      opacity: 0.3;
    }

    :disabled:hover {
      opacity: 0.3;
    }
  }
`,
    $ = (0, e.z)(j)`
  && {
    background-color: transparent;
  }
`,
    z = e.z.div`
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    color: var(--privy-color-foreground);
  }
`,
    M = e.z.div`
  flex: 1;
  align-items: center;
  display: flex;
  gap: 8px;
`,
    C = e.z.div`
  display: flex;
  justify-content: flex-end;
`,
    Z = e.z.div`
  color: var(--privy-color-foreground);

  font-kerning: none;
  font-feature-settings: 'calt' off;
  /* text-xl/font-semiBold */
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2rem; /* 160% */

  text-align: left;

  margin-left: 0.5rem;
`,
    S = e.z.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--privy-color-foreground);
`;
  r.s(
    [
      "B",
      0,
      ({
        variant: r = "primary",
        size: e = "lg",
        children: a,
        success: l,
        ...i
      }) => {
        switch (r) {
          case "secondary":
            return (0, o.jsx)(h, { size: e, ...i, children: a });
          case "error":
            return (0, o.jsx)(h, { $warn: !0, size: e, ...i, children: a });
          case "muted":
            return (0, o.jsx)(g, { size: e, ...i, children: a });
          default:
            return (0, o.jsx)(v, { size: e, success: l, ...i, children: a });
        }
      },
      "E",
      0,
      ({ children: r, onClick: e, disabled: l, isSubmitting: i, ...c }) =>
        (0, o.jsxs)(x, {
          $isSubmitting: i,
          onClick: e,
          disabled: l,
          ...c,
          children: [
            (0, o.jsx)("span", { children: r }),
            (0, o.jsx)("span", { children: (0, o.jsx)(a.B, {}) }),
          ],
        }),
      "M",
      0,
      ({
        backFn: r,
        infoFn: e,
        onClose: a,
        title: l,
        eyebrow: i,
        closeable: c = !0,
        className: n,
      }) => {
        let { closePrivyModal: s } = (0, d.u)(),
          v = (0, t.a)();
        return (0, o.jsxs)(z, {
          className: n,
          children: [
            (0, o.jsxs)(M, {
              children: [
                r && (0, o.jsx)(m, { backFn: r }),
                i && (0, o.jsx)(S, { children: i }),
                !i &&
                  l &&
                  (0, o.jsx)(Z, { id: "privy-dialog-title", children: l }),
                (0, o.jsx)("div", { style: { height: 24 } }),
                e && (0, o.jsx)(k, { infoFn: e }),
              ],
            }),
            (0, o.jsx)(C, {
              children:
                !v.render.standalone &&
                c &&
                (0, o.jsx)(w, { onClose: a || (() => s()) }),
            }),
          ],
        });
      },
      "P",
      0,
      v,
      "S",
      0,
      h,
      "b",
      0,
      ({ children: r, loading: e, disabled: l, ...i }) =>
        (0, o.jsx)(u, {
          disabled: l,
          ...i,
          children: e
            ? (0, o.jsx)(a.B, { color: "var(--privy-color-foreground-accent)" })
            : r,
        }),
      "c",
      0,
      f,
      "d",
      0,
      g,
    ],
    995040,
  );
};
