// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(689391),
    r = e.i(541021),
    n = e.i(387556),
    o = e.i(839326),
    a = e.i(352386);
  let l = a.forwardRef(function ({ title: e, titleId: t, ...i }, r) {
    return a.createElement(
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
          ref: r,
          "aria-labelledby": t,
        },
        i,
      ),
      e ? a.createElement("title", { id: t }, e) : null,
      a.createElement("path", {
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
    h = ({
      children: e,
      loading: i,
      disabled: n,
      success: o,
      size: a = "lg",
      loadingText: l = "Loading...",
      as: s,
      onClick: c,
      ...d
    }) => {
      let h = "a" === s,
        u = !(!i && !n);
      return (0, t.jsx)(p, {
        as: s,
        disabled: h ? void 0 : u,
        "aria-disabled": h ? u : void 0,
        $success: o,
        $size: a,
        onClick: (e) => {
          h && u ? e.preventDefault() : c?.(e);
        },
        ...d,
        children: i
          ? (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsx)(r.B, {}),
                l
                  ? (0, t.jsx)("span", {
                      style: { marginLeft: "8px" },
                      children: l,
                    })
                  : null,
              ],
            })
          : e,
      });
    },
    u = (0, i.z)(d)`
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
    p = (0, i.z)(d)`
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
    g = ({
      children: e,
      loading: i,
      disabled: n,
      size: o = "lg",
      loadingText: a = "Loading...",
      as: l,
      onClick: s,
      ...c
    }) => {
      let d = "a" === l,
        h = !(!i && !n);
      return (0, t.jsx)(v, {
        as: l,
        disabled: d ? void 0 : h,
        "aria-disabled": d ? h : void 0,
        $size: o,
        onClick: (e) => {
          d && h ? e.preventDefault() : s?.(e);
        },
        ...c,
        children: i
          ? (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsx)(r.B, {}),
                a
                  ? (0, t.jsx)("span", {
                      style: { marginLeft: "8px" },
                      children: a,
                    })
                  : null,
              ],
            })
          : e,
      });
    },
    m = ({
      children: e,
      loading: i,
      disabled: n,
      size: o = "lg",
      loadingText: a = "Loading...",
      as: l,
      onClick: s,
      ...c
    }) => {
      let d = "a" === l,
        h = !(!i && !n);
      return (0, t.jsx)(f, {
        as: l,
        disabled: d ? void 0 : h,
        "aria-disabled": d ? h : void 0,
        $size: o,
        onClick: (e) => {
          d && h ? e.preventDefault() : s?.(e);
        },
        ...c,
        children: i
          ? (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsx)(r.B, {}),
                a
                  ? (0, t.jsx)("span", {
                      style: { marginLeft: "8px" },
                      children: a,
                    })
                  : null,
              ],
            })
          : e,
      });
    },
    v = (0, i.z)(d)`
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
    f = (0, i.z)(d)`
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
    w = i.z.button`
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
  let y = i.z.button`
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
    b = ({ backFn: e, disabled: i = !1, "aria-label": r }) =>
      (0, t.jsx)("div", {
        children: (0, t.jsx)(k, {
          type: "button",
          "aria-label": r,
          disabled: i,
          onClick: i ? void 0 : e,
          children: (0, t.jsx)(n.f, {
            height: "16px",
            width: "16px",
            strokeWidth: 2,
          }),
        }),
      }),
    x = ({ infoFn: e }) =>
      (0, t.jsx)("div", {
        children: (0, t.jsx)(z, {
          "aria-label": "info",
          onClick: e,
          children: (0, t.jsx)(o.f, {
            height: "22px",
            width: "22px",
            strokeWidth: 2,
          }),
        }),
      }),
    C = (e) =>
      (0, t.jsx)("div", {
        children: (0, t.jsx)(k, {
          type: "button",
          "aria-label": e["aria-label"] ?? "close modal",
          onClick: e.onClose,
          children: (0, t.jsx)(l, {
            height: "16px",
            width: "16px",
            strokeWidth: 2,
          }),
        }),
      }),
    k = i.z.button`
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
    z = (0, i.z)(k)`
  && {
    background-color: transparent;
  }
`,
    j = i.z.div`
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
    S = i.z.div`
  flex: 1;
  align-items: center;
  display: flex;
  gap: 8px;
`,
    T = i.z.div`
  display: flex;
  justify-content: flex-end;
`,
    V = i.z.div`
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
    D = i.z.div`
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
        children: r,
        success: n,
        ...o
      }) => {
        switch (e) {
          case "secondary":
            return (0, t.jsx)(g, { size: i, ...o, children: r });
          case "error":
            return (0, t.jsx)(g, { $warn: !0, size: i, ...o, children: r });
          case "muted":
            return (0, t.jsx)(m, { size: i, ...o, children: r });
          default:
            return (0, t.jsx)(h, { size: i, success: n, ...o, children: r });
        }
      },
      "E",
      0,
      ({ children: e, onClick: i, disabled: n, isSubmitting: o, ...a }) =>
        (0, t.jsxs)(y, {
          $isSubmitting: o,
          onClick: i,
          disabled: n,
          ...a,
          children: [
            (0, t.jsx)("span", { children: e }),
            (0, t.jsx)("span", { children: (0, t.jsx)(r.B, {}) }),
          ],
        }),
      "M",
      0,
      ({
        backFn: e,
        infoFn: i,
        onClose: r,
        title: n,
        eyebrow: o,
        closeable: a = !0,
        className: l,
      }) => {
        let { closePrivyModal: d } = (0, c.u)(),
          h = (0, s.a)();
        return (0, t.jsxs)(j, {
          className: l,
          children: [
            (0, t.jsxs)(S, {
              children: [
                e && (0, t.jsx)(b, { backFn: e }),
                o && (0, t.jsx)(D, { children: o }),
                !o &&
                  n &&
                  (0, t.jsx)(V, { id: "privy-dialog-title", children: n }),
                (0, t.jsx)("div", { style: { height: 24 } }),
                i && (0, t.jsx)(x, { infoFn: i }),
              ],
            }),
            (0, t.jsx)(T, {
              children:
                !h.render.standalone &&
                a &&
                (0, t.jsx)(C, { onClose: r || (() => d()) }),
            }),
          ],
        });
      },
      "P",
      0,
      h,
      "S",
      0,
      g,
      "b",
      0,
      ({ children: e, loading: i, disabled: n, ...o }) =>
        (0, t.jsx)(u, {
          disabled: n,
          ...o,
          children: i
            ? (0, t.jsx)(r.B, { color: "var(--privy-color-foreground-accent)" })
            : e,
        }),
      "c",
      0,
      w,
      "d",
      0,
      m,
    ],
    995040,
  );
};
