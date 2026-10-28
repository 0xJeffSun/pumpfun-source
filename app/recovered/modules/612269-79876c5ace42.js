// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    o = e.i(352386),
    i = e.i(689391),
    a = e.i(541021),
    n = e.i(25047),
    t = e.i(995040),
    l = e.i(226439);
  let c = i.z.div`
  /* spacing tokens */
  --screen-space: 16px; /* base 1x = 16 */
  --screen-space-lg: calc(var(--screen-space) * 1.5); /* 24px */

  position: relative;
  overflow: hidden;
  margin: 0 calc(-1 * var(--screen-space)); /* extends over modal padding */
  height: 100%;
  border-radius: var(--privy-border-radius-lg);
`,
    d = i.z.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) * 1.5);
  width: 100%;
  background: var(--privy-color-background);
  padding: 0 var(--screen-space-lg) var(--screen-space);
  height: 100%;
  border-radius: var(--privy-border-radius-lg);
`,
    s = i.z.div`
  position: relative;
  display: flex;
  flex-direction: column;
`,
    v = (0, i.z)(t.M)`
  margin: 0 -8px;
`,
    p = i.z.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;

  /* Enable scrolling */
  overflow-y: auto;

  /* Hide scrollbar but keep functionality when scrollable */
  /* Add padding for focus outline space, offset with negative margin */
  padding: 3px;
  margin: -3px;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-gutter: stable both-edges;
  scrollbar-width: none;
  -ms-overflow-style: none;

  /* Gradient effect for scroll indication */
  ${({ $colorScheme: e }) => ("light" === e ? "background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.06)) bottom;" : "dark" === e ? "background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.06)) bottom;" : void 0)}

  background-repeat: no-repeat;
  background-size:
    100% 32px,
    100% 16px;
  background-attachment: local, scroll;
`,
    u = i.z.div`
  display: flex;
  flex-direction: column;
  gap: var(--screen-space-lg);
  margin-top: 1.5rem;
`,
    h = i.z.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--screen-space);
`,
    g = i.z.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,
    x = i.z.h3`
  && {
    font-size: 20px;
    line-height: 32px;
    font-weight: 500;
    color: var(--privy-color-foreground);
    margin: 0;
  }
`,
    f = i.z.p`
  && {
    margin: 0;
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    color: var(--privy-color-foreground);
  }
`,
    b = i.z.div`
  background: ${({ $variant: e }) => {
    switch (e) {
      case "success":
        return "var(--privy-color-success-bg)";
      case "warning":
        return "var(--privy-color-warn)";
      case "error":
        return "var(--privy-color-error-bg)";
      case "loading":
      case "logo":
        return "transparent";
      default:
        return "var(--privy-color-background-2)";
    }
  }};

  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`,
    y = i.z.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img,
  svg {
    max-height: 90px;
    max-width: 180px;
  }
`,
    m = i.z.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 82px;

  > div {
    position: relative;
  }

  > div > :first-child {
    position: relative;
  }

  > div > :last-child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`,
    k = ({ children: e, ...o }) =>
      (0, r.jsx)(c, { children: (0, r.jsx)(d, { ...o, children: e }) }),
    j = i.z.div`
  position: absolute;
  top: 0;
  left: calc(-1 * var(--screen-space-lg));
  width: calc(100% + calc(var(--screen-space-lg) * 2));
  height: 4px;
  background: var(--privy-color-background-2);
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  overflow: hidden;
`,
    w = (0, i.z)(n.B)`
  padding: 0;
  && a {
    padding: 0;
    color: var(--privy-color-foreground-3);
  }
`,
    z = i.z.div`
  height: 100%;
  width: ${({ pct: e }) => e}%;
  background: var(--privy-color-foreground-3);
  border-radius: 2px;
  transition: width 300ms ease-in-out;
`,
    $ = ({ step: e }) =>
      e
        ? (0, r.jsx)(j, {
            children: (0, r.jsx)(z, {
              pct: Math.min(100, (e.current / e.total) * 100),
            }),
          })
        : null;
  ((k.Header = ({
    title: e,
    subtitle: o,
    icon: i,
    iconVariant: a,
    iconLoadingStatus: n,
    showBack: t,
    onBack: l,
    showInfo: c,
    onInfo: d,
    showClose: p,
    onClose: u,
    step: b,
    headerTitle: y,
    eyebrow: m,
    ...j
  }) =>
    (0, r.jsxs)(s, {
      ...j,
      children: [
        (0, r.jsx)(v, {
          backFn: t ? l : void 0,
          infoFn: c ? d : void 0,
          onClose: p ? u : void 0,
          title: y,
          eyebrow: m,
          closeable: p,
        }),
        (i || a || e || o) &&
          (0, r.jsxs)(h, {
            children: [
              i || a
                ? (0, r.jsx)(k.Icon, { icon: i, variant: a, loadingStatus: n })
                : null,
              !(!e && !o) &&
                (0, r.jsxs)(g, {
                  children: [
                    e && (0, r.jsx)(x, { children: e }),
                    o && (0, r.jsx)(f, { children: o }),
                  ],
                }),
            ],
          }),
        b && (0, r.jsx)($, { step: b }),
      ],
    })),
    ((k.Body = o.default.forwardRef(({ children: e, ...o }, i) =>
      (0, r.jsx)(p, { ref: i, ...o, children: e }),
    )).displayName = "Screen.Body"),
    (k.Footer = ({ children: e, ...o }) =>
      (0, r.jsx)(u, {
        id: "privy-content-footer-container",
        ...o,
        children: e,
      })),
    (k.Actions = ({ children: e, ...o }) =>
      (0, r.jsx)(S, { ...o, children: e })),
    (k.HelpText = ({ children: e, ...o }) =>
      (0, r.jsx)(P, { ...o, children: e })),
    (k.FooterText = ({ children: e, ...o }) =>
      (0, r.jsx)(C, { ...o, children: e })),
    (k.Watermark = () => (0, r.jsx)(w, {})),
    (k.Icon = ({ icon: e, variant: i = "subtle", loadingStatus: n }) =>
      "logo" === i && e
        ? (0, r.jsx)(
            y,
            "string" == typeof e
              ? { children: (0, r.jsx)("img", { src: e, alt: "" }) }
              : o.default.isValidElement(e)
                ? { children: e }
                : { children: o.default.createElement(e) },
          )
        : "loading" === i
          ? e
            ? (0, r.jsx)(m, {
                children: (0, r.jsxs)("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  children: [
                    (0, r.jsx)(a.C, { success: n?.success, fail: n?.fail }),
                    "string" == typeof e
                      ? (0, r.jsx)("span", {
                          style: {
                            background: `url('${e}') 0 0 / contain`,
                            height: "38px",
                            width: "38px",
                            borderRadius: "6px",
                            margin: "auto",
                            backgroundSize: "contain",
                          },
                        })
                      : o.default.isValidElement(e)
                        ? o.default.cloneElement(e, {
                            style: { width: "38px", height: "38px" },
                          })
                        : o.default.createElement(e, {
                            style: { width: "38px", height: "38px" },
                          }),
                  ],
                }),
              })
            : (0, r.jsx)(b, {
                $variant: i,
                children: (0, r.jsx)(l.N, { size: "64px" }),
              })
          : (0, r.jsx)(b, {
              $variant: i,
              children:
                e &&
                ("string" == typeof e
                  ? (0, r.jsx)("img", {
                      src: e,
                      alt: "",
                      style: {
                        width: "32px",
                        height: "32px",
                        borderRadius: "6px",
                      },
                    })
                  : o.default.isValidElement(e)
                    ? e
                    : o.default.createElement(e, {
                        width: 32,
                        height: 32,
                        stroke: (() => {
                          switch (i) {
                            case "success":
                              return "var(--privy-color-icon-success)";
                            case "warning":
                              return "var(--privy-color-icon-warning)";
                            case "error":
                              return "var(--privy-color-icon-error)";
                            default:
                              return "var(--privy-color-icon-muted)";
                          }
                        })(),
                        strokeWidth: 2,
                      })),
            })));
  let S = i.z.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) / 2);
`,
    P = i.z.div`
  && {
    margin: 0;
    width: 100%;
    text-align: center;
    color: var(--privy-color-foreground-2);
    font-size: 13px;
    line-height: 20px;

    & a {
      text-decoration: underline;
    }
  }
`,
    C = i.z.div`
  && {
    margin-top: -1rem;
    width: 100%;
    text-align: center;
    color: var(--privy-color-foreground-2);
    font-size: 0.6875rem; /* 11px */
    line-height: 1rem; /* 16px */
  }
`;
  e.s(["S", 0, k]);
};
