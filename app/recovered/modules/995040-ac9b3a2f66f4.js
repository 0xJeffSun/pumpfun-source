// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    a = e.i(689391),
    o = e.i(541021),
    i = e.i(387556),
    t = e.i(839326),
    n = e.i(352386);
  let l = n.forwardRef(function ({ title: e, titleId: r, ...a }, o) {
    return n.createElement(
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
        a,
      ),
      e ? n.createElement("title", { id: r }, e) : null,
      n.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M6 18 18 6M6 6l12 12",
      }),
    );
  });
  var c = e.i(933185),
    s = e.i(748117);
  let d = a.z.button`
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
    u = ({
      children: e,
      loading: a,
      disabled: i,
      success: t,
      size: n = "lg",
      loadingText: l = "Loading...",
      as: c,
      onClick: s,
      ...d
    }) => {
      let u = "a" === c,
        p = !(!a && !i);
      return (0, r.jsx)(g, {
        as: c,
        disabled: u ? void 0 : p,
        "aria-disabled": u ? p : void 0,
        $success: t,
        $size: n,
        onClick: (e) => {
          u && p ? e.preventDefault() : s?.(e);
        },
        ...d,
        children: a
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
    p = (0, a.z)(d)`
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
    g = (0, a.z)(d)`
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
    a.m`
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
    v = ({
      children: e,
      loading: a,
      disabled: i,
      size: t = "lg",
      loadingText: n = "Loading...",
      as: l,
      onClick: c,
      ...s
    }) => {
      let d = "a" === l,
        u = !(!a && !i);
      return (0, r.jsx)(b, {
        as: l,
        disabled: d ? void 0 : u,
        "aria-disabled": d ? u : void 0,
        $size: t,
        onClick: (e) => {
          d && u ? e.preventDefault() : c?.(e);
        },
        ...s,
        children: a
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
    h = ({
      children: e,
      loading: a,
      disabled: i,
      size: t = "lg",
      loadingText: n = "Loading...",
      as: l,
      onClick: c,
      ...s
    }) => {
      let d = "a" === l,
        u = !(!a && !i);
      return (0, r.jsx)(m, {
        as: l,
        disabled: d ? void 0 : u,
        "aria-disabled": d ? u : void 0,
        $size: t,
        onClick: (e) => {
          d && u ? e.preventDefault() : c?.(e);
        },
        ...s,
        children: a
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
    b = (0, a.z)(d)`
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
    a.m`
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
    m = (0, a.z)(d)`
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
    a.m`
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
    y = a.z.button`
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
      a.m`
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
  a.z.div`
  /* Set to match height of SoftCtaButton to avoid reflow if conditionally rendered */
  height: 44px;
`;
  let w = a.z.button`
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
    f = ({ backFn: e, disabled: a = !1, "aria-label": o }) =>
      (0, r.jsx)("div", {
        children: (0, r.jsx)(k, {
          type: "button",
          "aria-label": o,
          disabled: a,
          onClick: a ? void 0 : e,
          children: (0, r.jsx)(i.f, {
            height: "16px",
            width: "16px",
            strokeWidth: 2,
          }),
        }),
      }),
    x = ({ infoFn: e }) =>
      (0, r.jsx)("div", {
        children: (0, r.jsx)(S, {
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
        children: (0, r.jsx)(k, {
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
    k = a.z.button`
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
    S = (0, a.z)(k)`
  && {
    background-color: transparent;
  }
`,
    V = a.z.div`
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
    T = a.z.div`
  flex: 1;
  align-items: center;
  display: flex;
  gap: 8px;
`,
    D = a.z.div`
  display: flex;
  justify-content: flex-end;
`,
    j = a.z.div`
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
    z = a.z.div`
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
        size: a = "lg",
        children: o,
        success: i,
        ...t
      }) => {
        switch (e) {
          case "secondary":
            return (0, r.jsx)(v, { size: a, ...t, children: o });
          case "error":
            return (0, r.jsx)(v, { $warn: !0, size: a, ...t, children: o });
          case "muted":
            return (0, r.jsx)(h, { size: a, ...t, children: o });
          default:
            return (0, r.jsx)(u, { size: a, success: i, ...t, children: o });
        }
      },
      "E",
      0,
      ({ children: e, onClick: a, disabled: i, isSubmitting: t, ...n }) =>
        (0, r.jsxs)(w, {
          $isSubmitting: t,
          onClick: a,
          disabled: i,
          ...n,
          children: [
            (0, r.jsx)("span", { children: e }),
            (0, r.jsx)("span", { children: (0, r.jsx)(o.B, {}) }),
          ],
        }),
      "M",
      0,
      ({
        backFn: e,
        infoFn: a,
        onClose: o,
        title: i,
        eyebrow: t,
        closeable: n = !0,
        className: l,
      }) => {
        let { closePrivyModal: d } = (0, s.u)(),
          u = (0, c.a)();
        return (0, r.jsxs)(V, {
          className: l,
          children: [
            (0, r.jsxs)(T, {
              children: [
                e && (0, r.jsx)(f, { backFn: e }),
                t && (0, r.jsx)(z, { children: t }),
                !t &&
                  i &&
                  (0, r.jsx)(j, { id: "privy-dialog-title", children: i }),
                (0, r.jsx)("div", { style: { height: 24 } }),
                a && (0, r.jsx)(x, { infoFn: a }),
              ],
            }),
            (0, r.jsx)(D, {
              children:
                !u.render.standalone &&
                n &&
                (0, r.jsx)(C, { onClose: o || (() => d()) }),
            }),
          ],
        });
      },
      "P",
      0,
      u,
      "S",
      0,
      v,
      "b",
      0,
      ({ children: e, loading: a, disabled: i, ...t }) =>
        (0, r.jsx)(p, {
          disabled: i,
          ...t,
          children: a
            ? (0, r.jsx)(o.B, { color: "var(--privy-color-foreground-accent)" })
            : e,
        }),
      "c",
      0,
      y,
      "d",
      0,
      h,
    ],
    995040,
  );
};
