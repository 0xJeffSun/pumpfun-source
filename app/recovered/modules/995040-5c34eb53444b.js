// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    i = e.i(689391),
    o = e.i(541021),
    a = e.i(387556),
    t = e.i(839326),
    l = e.i(352386);
  let n = l.forwardRef(function ({ title: e, titleId: r, ...i }, o) {
    return l.createElement(
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
          ref: o,
          "aria-labelledby": r,
        },
        i,
      ),
      e ? l.createElement("title", { id: r }, e) : null,
      l.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M6 18 18 6M6 6l12 12",
      }),
    );
  });
  var s = e.i(933185),
    c = e.i(748117);
  let d = i.z.button`
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
    p = ({
      children: e,
      loading: i,
      disabled: a,
      success: t,
      size: l = "lg",
      loadingText: n = "Loading...",
      as: s,
      onClick: c,
      ...d
    }) => {
      let p = "a" === s,
        h = !(!i && !a);
      return (0, r.jsx)(g, {
        as: s,
        disabled: p ? void 0 : h,
        "aria-disabled": p ? h : void 0,
        $success: t,
        $size: l,
        onClick: (e) => {
          p && h ? e.preventDefault() : c?.(e);
        },
        ...d,
        children: i
          ? (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsx)(o.B, {}),
                n
                  ? (0, r.jsx)("span", {
                      style: { marginLeft: "8px" },
                      children: n,
                    })
                  : null,
              ],
            })
          : e,
      });
    },
    h = (0, i.z)(d)`
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
    g = (0, i.z)(d)`
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
    i.m`
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
    u = ({
      children: e,
      loading: i,
      disabled: a,
      size: t = "lg",
      loadingText: l = "Loading...",
      as: n,
      onClick: s,
      ...c
    }) => {
      let d = "a" === n,
        p = !(!i && !a);
      return (0, r.jsx)(f, {
        as: n,
        disabled: d ? void 0 : p,
        "aria-disabled": d ? p : void 0,
        $size: t,
        onClick: (e) => {
          d && p ? e.preventDefault() : s?.(e);
        },
        ...c,
        children: i
          ? (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsx)(o.B, {}),
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
    v = ({
      children: e,
      loading: i,
      disabled: a,
      size: t = "lg",
      loadingText: l = "Loading...",
      as: n,
      onClick: s,
      ...c
    }) => {
      let d = "a" === n,
        p = !(!i && !a);
      return (0, r.jsx)(x, {
        as: n,
        disabled: d ? void 0 : p,
        "aria-disabled": d ? p : void 0,
        $size: t,
        onClick: (e) => {
          d && p ? e.preventDefault() : s?.(e);
        },
        ...c,
        children: i
          ? (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsx)(o.B, {}),
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
    f = (0, i.z)(d)`
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
    i.m`
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
    x = (0, i.z)(d)`
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
    i.m`
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
    m = i.z.button`
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
      i.m`
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
  i.z.div`
  /* Set to match height of SoftCtaButton to avoid reflow if conditionally rendered */
  height: 44px;
`;
  let b = i.z.button`
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
    y = ({ backFn: e, disabled: i = !1, "aria-label": o }) =>
      (0, r.jsx)("div", {
        children: (0, r.jsx)(j, {
          type: "button",
          "aria-label": o,
          disabled: i,
          onClick: i ? void 0 : e,
          children: (0, r.jsx)(a.f, {
            height: "16px",
            width: "16px",
            strokeWidth: 2,
          }),
        }),
      }),
    w = ({ infoFn: e }) =>
      (0, r.jsx)("div", {
        children: (0, r.jsx)(A, {
          "aria-label": "info",
          onClick: e,
          children: (0, r.jsx)(t.f, {
            height: "22px",
            width: "22px",
            strokeWidth: 2,
          }),
        }),
      }),
    C = (e) =>
      (0, r.jsx)("div", {
        children: (0, r.jsx)(j, {
          type: "button",
          "aria-label": e["aria-label"] ?? "close modal",
          onClick: e.onClose,
          children: (0, r.jsx)(n, {
            height: "16px",
            width: "16px",
            strokeWidth: 2,
          }),
        }),
      }),
    j = i.z.button`
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
    A = (0, i.z)(j)`
  && {
    background-color: transparent;
  }
`,
    k = i.z.div`
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
    M = i.z.div`
  flex: 1;
  align-items: center;
  display: flex;
  gap: 8px;
`,
    S = i.z.div`
  display: flex;
  justify-content: flex-end;
`,
    z = i.z.div`
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
    L = i.z.div`
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
        size: i = "lg",
        children: o,
        success: a,
        ...t
      }) => {
        switch (e) {
          case "secondary":
            return (0, r.jsx)(u, { size: i, ...t, children: o });
          case "error":
            return (0, r.jsx)(u, { $warn: !0, size: i, ...t, children: o });
          case "muted":
            return (0, r.jsx)(v, { size: i, ...t, children: o });
          default:
            return (0, r.jsx)(p, { size: i, success: a, ...t, children: o });
        }
      },
      "E",
      0,
      ({ children: e, onClick: i, disabled: a, isSubmitting: t, ...l }) =>
        (0, r.jsxs)(b, {
          $isSubmitting: t,
          onClick: i,
          disabled: a,
          ...l,
          children: [
            (0, r.jsx)("span", { children: e }),
            (0, r.jsx)("span", { children: (0, r.jsx)(o.B, {}) }),
          ],
        }),
      "M",
      0,
      ({
        backFn: e,
        infoFn: i,
        onClose: o,
        title: a,
        eyebrow: t,
        closeable: l = !0,
        className: n,
      }) => {
        let { closePrivyModal: d } = (0, c.u)(),
          p = (0, s.a)();
        return (0, r.jsxs)(k, {
          className: n,
          children: [
            (0, r.jsxs)(M, {
              children: [
                e && (0, r.jsx)(y, { backFn: e }),
                t && (0, r.jsx)(L, { children: t }),
                !t &&
                  a &&
                  (0, r.jsx)(z, { id: "privy-dialog-title", children: a }),
                (0, r.jsx)("div", { style: { height: 24 } }),
                i && (0, r.jsx)(w, { infoFn: i }),
              ],
            }),
            (0, r.jsx)(S, {
              children:
                !p.render.standalone &&
                l &&
                (0, r.jsx)(C, { onClose: o || (() => d()) }),
            }),
          ],
        });
      },
      "P",
      0,
      p,
      "S",
      0,
      u,
      "b",
      0,
      ({ children: e, loading: i, disabled: a, ...t }) =>
        (0, r.jsx)(h, {
          disabled: a,
          ...t,
          children: i
            ? (0, r.jsx)(o.B, { color: "var(--privy-color-foreground-accent)" })
            : e,
        }),
      "c",
      0,
      m,
      "d",
      0,
      v,
    ],
    995040,
  );
};
