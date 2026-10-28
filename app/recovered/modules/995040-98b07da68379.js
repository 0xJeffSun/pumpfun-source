// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    i = r.i(689391),
    o = r.i(541021),
    t = r.i(387556),
    a = r.i(839326),
    n = r.i(352386);
  let l = n.forwardRef(function ({ title: r, titleId: e, ...i }, o) {
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
          "aria-labelledby": e,
        },
        i,
      ),
      r ? n.createElement("title", { id: e }, r) : null,
      n.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M6 18 18 6M6 6l12 12",
      }),
    );
  });
  var s = r.i(933185),
    c = r.i(748117);
  let d = i.z.button`
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
    p = ({
      children: r,
      loading: i,
      disabled: t,
      success: a,
      size: n = "lg",
      loadingText: l = "Loading...",
      as: s,
      onClick: c,
      ...d
    }) => {
      let p = "a" === s,
        h = !(!i && !t);
      return (0, e.jsx)(v, {
        as: s,
        disabled: p ? void 0 : h,
        "aria-disabled": p ? h : void 0,
        $success: a,
        $size: n,
        onClick: (r) => {
          p && h ? r.preventDefault() : c?.(r);
        },
        ...d,
        children: i
          ? (0, e.jsxs)(e.Fragment, {
              children: [
                (0, e.jsx)(o.B, {}),
                l
                  ? (0, e.jsx)("span", {
                      style: { marginLeft: "8px" },
                      children: l,
                    })
                  : null,
              ],
            })
          : r,
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
    v = (0, i.z)(d)`
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
      children: r,
      loading: i,
      disabled: t,
      size: a = "lg",
      loadingText: n = "Loading...",
      as: l,
      onClick: s,
      ...c
    }) => {
      let d = "a" === l,
        p = !(!i && !t);
      return (0, e.jsx)(x, {
        as: l,
        disabled: d ? void 0 : p,
        "aria-disabled": d ? p : void 0,
        $size: a,
        onClick: (r) => {
          d && p ? r.preventDefault() : s?.(r);
        },
        ...c,
        children: i
          ? (0, e.jsxs)(e.Fragment, {
              children: [
                (0, e.jsx)(o.B, {}),
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
    u = ({
      children: r,
      loading: i,
      disabled: t,
      size: a = "lg",
      loadingText: n = "Loading...",
      as: l,
      onClick: s,
      ...c
    }) => {
      let d = "a" === l,
        p = !(!i && !t);
      return (0, e.jsx)(f, {
        as: l,
        disabled: d ? void 0 : p,
        "aria-disabled": d ? p : void 0,
        $size: a,
        onClick: (r) => {
          d && p ? r.preventDefault() : s?.(r);
        },
        ...c,
        children: i
          ? (0, e.jsxs)(e.Fragment, {
              children: [
                (0, e.jsx)(o.B, {}),
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
    x = (0, i.z)(d)`
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
  ${(r) =>
    r.disabled &&
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
    y = i.z.button`
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
  let m = i.z.button`
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
    b = ({ backFn: r, disabled: i = !1, "aria-label": o }) =>
      (0, e.jsx)("div", {
        children: (0, e.jsx)(k, {
          type: "button",
          "aria-label": o,
          disabled: i,
          onClick: i ? void 0 : r,
          children: (0, e.jsx)(t.f, {
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
          children: (0, e.jsx)(a.f, {
            height: "22px",
            width: "22px",
            strokeWidth: 2,
          }),
        }),
      }),
    j = (r) =>
      (0, e.jsx)("div", {
        children: (0, e.jsx)(k, {
          type: "button",
          "aria-label": r["aria-label"] ?? "close modal",
          onClick: r.onClose,
          children: (0, e.jsx)(l, {
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
    C = i.z.div`
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
    L = i.z.div`
  flex: 1;
  align-items: center;
  display: flex;
  gap: 8px;
`,
    M = i.z.div`
  display: flex;
  justify-content: flex-end;
`,
    $ = i.z.div`
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
    S = i.z.div`
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
        size: i = "lg",
        children: o,
        success: t,
        ...a
      }) => {
        switch (r) {
          case "secondary":
            return (0, e.jsx)(g, { size: i, ...a, children: o });
          case "error":
            return (0, e.jsx)(g, { $warn: !0, size: i, ...a, children: o });
          case "muted":
            return (0, e.jsx)(u, { size: i, ...a, children: o });
          default:
            return (0, e.jsx)(p, { size: i, success: t, ...a, children: o });
        }
      },
      "E",
      0,
      ({ children: r, onClick: i, disabled: t, isSubmitting: a, ...n }) =>
        (0, e.jsxs)(m, {
          $isSubmitting: a,
          onClick: i,
          disabled: t,
          ...n,
          children: [
            (0, e.jsx)("span", { children: r }),
            (0, e.jsx)("span", { children: (0, e.jsx)(o.B, {}) }),
          ],
        }),
      "M",
      0,
      ({
        backFn: r,
        infoFn: i,
        onClose: o,
        title: t,
        eyebrow: a,
        closeable: n = !0,
        className: l,
      }) => {
        let { closePrivyModal: d } = (0, c.u)(),
          p = (0, s.a)();
        return (0, e.jsxs)(C, {
          className: l,
          children: [
            (0, e.jsxs)(L, {
              children: [
                r && (0, e.jsx)(b, { backFn: r }),
                a && (0, e.jsx)(S, { children: a }),
                !a &&
                  t &&
                  (0, e.jsx)($, { id: "privy-dialog-title", children: t }),
                (0, e.jsx)("div", { style: { height: 24 } }),
                i && (0, e.jsx)(w, { infoFn: i }),
              ],
            }),
            (0, e.jsx)(M, {
              children:
                !p.render.standalone &&
                n &&
                (0, e.jsx)(j, { onClose: o || (() => d()) }),
            }),
          ],
        });
      },
      "P",
      0,
      p,
      "S",
      0,
      g,
      "b",
      0,
      ({ children: r, loading: i, disabled: t, ...a }) =>
        (0, e.jsx)(h, {
          disabled: t,
          ...a,
          children: i
            ? (0, e.jsx)(o.B, { color: "var(--privy-color-foreground-accent)" })
            : r,
        }),
      "c",
      0,
      y,
      "d",
      0,
      u,
    ],
    995040,
  );
};
