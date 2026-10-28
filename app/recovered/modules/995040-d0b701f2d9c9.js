// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(689391),
    a = r.i(541021),
    i = r.i(387556),
    l = r.i(839326),
    t = r.i(352386);
  let n = t.forwardRef(function ({ title: r, titleId: e, ...o }, a) {
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
          ref: a,
          "aria-labelledby": e,
        },
        o,
      ),
      r ? t.createElement("title", { id: e }, r) : null,
      t.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M6 18 18 6M6 6l12 12",
      }),
    );
  });
  var c = r.i(933185),
    d = r.i(748117);
  let s = o.z.button`
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
      loading: o,
      disabled: i,
      success: l,
      size: t = "lg",
      loadingText: n = "Loading...",
      as: c,
      onClick: d,
      ...s
    }) => {
      let v = "a" === c,
        p = !(!o && !i);
      return (0, e.jsx)(u, {
        as: c,
        disabled: v ? void 0 : p,
        "aria-disabled": v ? p : void 0,
        $success: l,
        $size: t,
        onClick: (r) => {
          v && p ? r.preventDefault() : d?.(r);
        },
        ...s,
        children: o
          ? (0, e.jsxs)(e.Fragment, {
              children: [
                (0, e.jsx)(a.B, {}),
                n
                  ? (0, e.jsx)("span", {
                      style: { marginLeft: "8px" },
                      children: n,
                    })
                  : null,
              ],
            })
          : r,
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
      children: r,
      loading: o,
      disabled: i,
      size: l = "lg",
      loadingText: t = "Loading...",
      as: n,
      onClick: c,
      ...d
    }) => {
      let s = "a" === n,
        v = !(!o && !i);
      return (0, e.jsx)(b, {
        as: n,
        disabled: s ? void 0 : v,
        "aria-disabled": s ? v : void 0,
        $size: l,
        onClick: (r) => {
          s && v ? r.preventDefault() : c?.(r);
        },
        ...d,
        children: o
          ? (0, e.jsxs)(e.Fragment, {
              children: [
                (0, e.jsx)(a.B, {}),
                t
                  ? (0, e.jsx)("span", {
                      style: { marginLeft: "8px" },
                      children: t,
                    })
                  : null,
              ],
            })
          : r,
      });
    },
    g = ({
      children: r,
      loading: o,
      disabled: i,
      size: l = "lg",
      loadingText: t = "Loading...",
      as: n,
      onClick: c,
      ...d
    }) => {
      let s = "a" === n,
        v = !(!o && !i);
      return (0, e.jsx)(y, {
        as: n,
        disabled: s ? void 0 : v,
        "aria-disabled": s ? v : void 0,
        $size: l,
        onClick: (r) => {
          s && v ? r.preventDefault() : c?.(r);
        },
        ...d,
        children: o
          ? (0, e.jsxs)(e.Fragment, {
              children: [
                (0, e.jsx)(a.B, {}),
                t
                  ? (0, e.jsx)("span", {
                      style: { marginLeft: "8px" },
                      children: t,
                    })
                  : null,
              ],
            })
          : r,
      });
    },
    b = (0, o.z)(s)`
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
    y = (0, o.z)(s)`
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
    f = o.z.button`
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
  let x = o.z.button`
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
    m = ({ backFn: r, disabled: o = !1, "aria-label": a }) =>
      (0, e.jsx)("div", {
        children: (0, e.jsx)(j, {
          type: "button",
          "aria-label": a,
          disabled: o,
          onClick: o ? void 0 : r,
          children: (0, e.jsx)(i.f, {
            height: "16px",
            width: "16px",
            strokeWidth: 2,
          }),
        }),
      }),
    w = ({ infoFn: r }) =>
      (0, e.jsx)("div", {
        children: (0, e.jsx)(z, {
          "aria-label": "info",
          onClick: r,
          children: (0, e.jsx)(l.f, {
            height: "22px",
            width: "22px",
            strokeWidth: 2,
          }),
        }),
      }),
    k = (r) =>
      (0, e.jsx)("div", {
        children: (0, e.jsx)(j, {
          type: "button",
          "aria-label": r["aria-label"] ?? "close modal",
          onClick: r.onClose,
          children: (0, e.jsx)(n, {
            height: "16px",
            width: "16px",
            strokeWidth: 2,
          }),
        }),
      }),
    j = o.z.button`
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
    z = (0, o.z)(j)`
  && {
    background-color: transparent;
  }
`,
    C = o.z.div`
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
    $ = o.z.div`
  flex: 1;
  align-items: center;
  display: flex;
  gap: 8px;
`,
    S = o.z.div`
  display: flex;
  justify-content: flex-end;
`,
    M = o.z.div`
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
    A = o.z.div`
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
        size: o = "lg",
        children: a,
        success: i,
        ...l
      }) => {
        switch (r) {
          case "secondary":
            return (0, e.jsx)(h, { size: o, ...l, children: a });
          case "error":
            return (0, e.jsx)(h, { $warn: !0, size: o, ...l, children: a });
          case "muted":
            return (0, e.jsx)(g, { size: o, ...l, children: a });
          default:
            return (0, e.jsx)(v, { size: o, success: i, ...l, children: a });
        }
      },
      "E",
      0,
      ({ children: r, onClick: o, disabled: i, isSubmitting: l, ...t }) =>
        (0, e.jsxs)(x, {
          $isSubmitting: l,
          onClick: o,
          disabled: i,
          ...t,
          children: [
            (0, e.jsx)("span", { children: r }),
            (0, e.jsx)("span", { children: (0, e.jsx)(a.B, {}) }),
          ],
        }),
      "M",
      0,
      ({
        backFn: r,
        infoFn: o,
        onClose: a,
        title: i,
        eyebrow: l,
        closeable: t = !0,
        className: n,
      }) => {
        let { closePrivyModal: s } = (0, d.u)(),
          v = (0, c.a)();
        return (0, e.jsxs)(C, {
          className: n,
          children: [
            (0, e.jsxs)($, {
              children: [
                r && (0, e.jsx)(m, { backFn: r }),
                l && (0, e.jsx)(A, { children: l }),
                !l &&
                  i &&
                  (0, e.jsx)(M, { id: "privy-dialog-title", children: i }),
                (0, e.jsx)("div", { style: { height: 24 } }),
                o && (0, e.jsx)(w, { infoFn: o }),
              ],
            }),
            (0, e.jsx)(S, {
              children:
                !v.render.standalone &&
                t &&
                (0, e.jsx)(k, { onClose: a || (() => s()) }),
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
      ({ children: r, loading: o, disabled: i, ...l }) =>
        (0, e.jsx)(p, {
          disabled: i,
          ...l,
          children: o
            ? (0, e.jsx)(a.B, { color: "var(--privy-color-foreground-accent)" })
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
