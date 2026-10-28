// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    o = e.i(689391),
    i = e.i(541021),
    a = e.i(387556),
    n = e.i(839326),
    t = e.i(352386);
  let l = t.forwardRef(function ({ title: e, titleId: r, ...o }, i) {
    return t.createElement(
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
        o,
      ),
      e ? t.createElement("title", { id: r }, e) : null,
      t.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M6 18 18 6M6 6l12 12",
      }),
    );
  });
  var c = e.i(933185),
    d = e.i(748117);
  let s = o.z.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  user-select: none;

  & {
    width: auto;
    cursor: pointer;
    border-radius: ${({ $size: e }) => ("sm" === e ? "6px" : "var(--privy-border-radius-sm)")};

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: -0.016px;
  }

  && {
    height: ${({ $size: e }) => ("sm" === e ? "28px" : "48px")};
    padding: 0 ${({ $size: e }) => ("sm" === e ? "10px" : "16px")};
  }
`,
    v = ({
      children: e,
      loading: o,
      disabled: a,
      success: n,
      size: t = "lg",
      loadingText: l = "Loading...",
      as: c,
      onClick: d,
      ...s
    }) => {
      let v = "a" === c,
        p = !(!o && !a);
      return (0, r.jsx)(u, {
        as: c,
        disabled: v ? void 0 : p,
        "aria-disabled": v ? p : void 0,
        $success: n,
        $size: t,
        onClick: (e) => {
          v && p ? e.preventDefault() : d?.(e);
        },
        ...s,
        children: o
          ? (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsx)(i.B, {}),
                l
                  ? (0, r.jsx)("span", {
                      style: { marginLeft: "8px" },
                      children: l,
                    })
                  : null,
              ],
            })
          : e,
      });
    },
    p = (0, o.z)(s)`
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
    u = (0, o.z)(s)`
  position: relative;

  && {
    background-color: ${(e) => (e.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent)")};
    color: var(--privy-color-foreground-accent);

    transition: background-color 200ms ease;
  }

  &:hover {
    background-color: ${(e) => (e.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent-dark)")};
  }

  &:active {
    background-color: ${(e) => (e.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent-dark)")};
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
  ${(e) =>
    e.disabled &&
    o.m`
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
      children: e,
      loading: o,
      disabled: a,
      size: n = "lg",
      loadingText: t = "Loading...",
      as: l,
      onClick: c,
      ...d
    }) => {
      let s = "a" === l,
        v = !(!o && !a);
      return (0, r.jsx)(x, {
        as: l,
        disabled: s ? void 0 : v,
        "aria-disabled": s ? v : void 0,
        $size: n,
        onClick: (e) => {
          s && v ? e.preventDefault() : c?.(e);
        },
        ...d,
        children: o
          ? (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsx)(i.B, {}),
                t
                  ? (0, r.jsx)("span", {
                      style: { marginLeft: "8px" },
                      children: t,
                    })
                  : null,
              ],
            })
          : e,
      });
    },
    g = ({
      children: e,
      loading: o,
      disabled: a,
      size: n = "lg",
      loadingText: t = "Loading...",
      as: l,
      onClick: c,
      ...d
    }) => {
      let s = "a" === l,
        v = !(!o && !a);
      return (0, r.jsx)(f, {
        as: l,
        disabled: s ? void 0 : v,
        "aria-disabled": s ? v : void 0,
        $size: n,
        onClick: (e) => {
          s && v ? e.preventDefault() : c?.(e);
        },
        ...d,
        children: o
          ? (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsx)(i.B, {}),
                t
                  ? (0, r.jsx)("span", {
                      style: { marginLeft: "8px" },
                      children: t,
                    })
                  : null,
              ],
            })
          : e,
      });
    },
    x = (0, o.z)(s)`
  && {
    border-width: 1px;
    border-style: solid;
    border-color: ${(e) => (e.$warn ? "var(--privy-color-border-error)" : "var(--privy-color-accent)")};
    background-color: var(--privy-color-background);
    color: ${(e) => (e.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent)")};
    transition:
      border-color 200ms ease,
      color 200ms ease,
      background-color 200ms ease;
  }

  &:hover {
    border-color: ${(e) => (e.$warn ? "var(--privy-color-border-error)" : "var(--privy-color-border-interactive-hover)")};
    background-color: ${(e) => (e.$warn ? "var(--privy-color-error-light)" : "var(--privy-color-info-bg-hover)")};
    color: ${(e) => (e.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent)")};
  }

  &:active {
    border-color: ${(e) => (e.$warn ? "var(--privy-color-border-error)" : "var(--privy-color-border-interactive)")};
    background-color: ${(e) => (e.$warn ? "var(--privy-color-error-bg-hover)" : "var(--privy-color-info-bg)")};
    color: ${(e) => (e.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent)")};
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
  ${(e) =>
    e.disabled &&
    o.m`
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
    f = (0, o.z)(s)`
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
  ${(e) =>
    e.disabled &&
    o.m`
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
    b = o.z.button`
  && {
    padding: 12px 16px;
    font-weight: 500;
    text-align: center;
    color: var(--privy-color-foreground-accent);
    background-color: var(--privy-color-accent);
    border-radius: var(--privy-border-radius-sm);
    min-width: 144px;
    opacity: ${(e) => (e.invisible ? "0" : "1")};
    transition:
      opacity 200ms ease,
      background-color 200ms ease,
      color 200ms ease;
    user-select: none;

    ${(e) =>
      e.invisible &&
      o.m`
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
  o.z.div`
  /* Set to match height of SoftCtaButton to avoid reflow if conditionally rendered */
  height: 44px;
`;
  let y = o.z.button`
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
      opacity: ${(e) => +!e.$isSubmitting};
    }

    && > :last-child {
      position: absolute;
      display: flex;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);

      /** Will map to the opposite of first span */
      opacity: ${(e) => +!!e.$isSubmitting};
    }

    :disabled,
    :hover:disabled {
      color: var(--privy-color-foreground-disabled);
      cursor: not-allowed;
    }
  }
`,
    m = ({ backFn: e, disabled: o = !1, "aria-label": i }) =>
      (0, r.jsx)("div", {
        children: (0, r.jsx)(w, {
          type: "button",
          "aria-label": i,
          disabled: o,
          onClick: o ? void 0 : e,
          children: (0, r.jsx)(a.f, {
            height: "16px",
            width: "16px",
            strokeWidth: 2,
          }),
        }),
      }),
    k = ({ infoFn: e }) =>
      (0, r.jsx)("div", {
        children: (0, r.jsx)(z, {
          "aria-label": "info",
          onClick: e,
          children: (0, r.jsx)(n.f, {
            height: "22px",
            width: "22px",
            strokeWidth: 2,
          }),
        }),
      }),
    j = (e) =>
      (0, r.jsx)("div", {
        children: (0, r.jsx)(w, {
          type: "button",
          "aria-label": e["aria-label"] ?? "close modal",
          onClick: e.onClose,
          children: (0, r.jsx)(l, {
            height: "16px",
            width: "16px",
            strokeWidth: 2,
          }),
        }),
      }),
    w = o.z.button`
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
    z = (0, o.z)(w)`
  && {
    background-color: transparent;
  }
`,
    $ = o.z.div`
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
    S = o.z.div`
  flex: 1;
  align-items: center;
  display: flex;
  gap: 8px;
`,
    P = o.z.div`
  display: flex;
  justify-content: flex-end;
`,
    C = o.z.div`
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
    F = o.z.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--privy-color-foreground);
`;
  e.s(
    [
      "B",
      0,
      ({
        variant: e = "primary",
        size: o = "lg",
        children: i,
        success: a,
        ...n
      }) => {
        switch (e) {
          case "secondary":
            return (0, r.jsx)(h, { size: o, ...n, children: i });
          case "error":
            return (0, r.jsx)(h, { $warn: !0, size: o, ...n, children: i });
          case "muted":
            return (0, r.jsx)(g, { size: o, ...n, children: i });
          default:
            return (0, r.jsx)(v, { size: o, success: a, ...n, children: i });
        }
      },
      "E",
      0,
      ({ children: e, onClick: o, disabled: a, isSubmitting: n, ...t }) =>
        (0, r.jsxs)(y, {
          $isSubmitting: n,
          onClick: o,
          disabled: a,
          ...t,
          children: [
            (0, r.jsx)("span", { children: e }),
            (0, r.jsx)("span", { children: (0, r.jsx)(i.B, {}) }),
          ],
        }),
      "M",
      0,
      ({
        backFn: e,
        infoFn: o,
        onClose: i,
        title: a,
        eyebrow: n,
        closeable: t = !0,
        className: l,
      }) => {
        let { closePrivyModal: s } = (0, d.u)(),
          v = (0, c.a)();
        return (0, r.jsxs)($, {
          className: l,
          children: [
            (0, r.jsxs)(S, {
              children: [
                e && (0, r.jsx)(m, { backFn: e }),
                n && (0, r.jsx)(F, { children: n }),
                !n &&
                  a &&
                  (0, r.jsx)(C, { id: "privy-dialog-title", children: a }),
                (0, r.jsx)("div", { style: { height: 24 } }),
                o && (0, r.jsx)(k, { infoFn: o }),
              ],
            }),
            (0, r.jsx)(P, {
              children:
                !v.render.standalone &&
                t &&
                (0, r.jsx)(j, { onClose: i || (() => s()) }),
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
      ({ children: e, loading: o, disabled: a, ...n }) =>
        (0, r.jsx)(p, {
          disabled: a,
          ...n,
          children: o
            ? (0, r.jsx)(i.B, { color: "var(--privy-color-foreground-accent)" })
            : e,
        }),
      "c",
      0,
      b,
      "d",
      0,
      g,
    ],
    995040,
  );
};
