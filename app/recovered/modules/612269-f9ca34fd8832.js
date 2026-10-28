// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(352386),
    i = r.i(689391),
    a = r.i(541021),
    t = r.i(25047),
    l = r.i(995040),
    n = r.i(226439);
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
    s = i.z.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) * 1.5);
  width: 100%;
  background: var(--privy-color-background);
  padding: 0 var(--screen-space-lg) var(--screen-space);
  height: 100%;
  border-radius: var(--privy-border-radius-lg);
`,
    d = i.z.div`
  position: relative;
  display: flex;
  flex-direction: column;
`,
    p = (0, i.z)(l.M)`
  margin: 0 -8px;
`,
    v = i.z.div`
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
  ${({ $colorScheme: r }) => ("light" === r ? "background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.06)) bottom;" : "dark" === r ? "background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.06)) bottom;" : void 0)}

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
    f = i.z.h3`
  && {
    font-size: 20px;
    line-height: 32px;
    font-weight: 500;
    color: var(--privy-color-foreground);
    margin: 0;
  }
`,
    x = i.z.p`
  && {
    margin: 0;
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    color: var(--privy-color-foreground);
  }
`,
    b = i.z.div`
  background: ${({ $variant: r }) => {
    switch (r) {
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
    m = i.z.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img,
  svg {
    max-height: 90px;
    max-width: 180px;
  }
`,
    y = i.z.div`
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
    w = ({ children: r, ...o }) =>
      (0, e.jsx)(c, { children: (0, e.jsx)(s, { ...o, children: r }) }),
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
    k = (0, i.z)(t.B)`
  padding: 0;
  && a {
    padding: 0;
    color: var(--privy-color-foreground-3);
  }
`,
    z = i.z.div`
  height: 100%;
  width: ${({ pct: r }) => r}%;
  background: var(--privy-color-foreground-3);
  border-radius: 2px;
  transition: width 300ms ease-in-out;
`,
    C = ({ step: r }) =>
      r
        ? (0, e.jsx)(j, {
            children: (0, e.jsx)(z, {
              pct: Math.min(100, (r.current / r.total) * 100),
            }),
          })
        : null;
  ((w.Header = ({
    title: r,
    subtitle: o,
    icon: i,
    iconVariant: a,
    iconLoadingStatus: t,
    showBack: l,
    onBack: n,
    showInfo: c,
    onInfo: s,
    showClose: v,
    onClose: u,
    step: b,
    headerTitle: m,
    eyebrow: y,
    ...j
  }) =>
    (0, e.jsxs)(d, {
      ...j,
      children: [
        (0, e.jsx)(p, {
          backFn: l ? n : void 0,
          infoFn: c ? s : void 0,
          onClose: v ? u : void 0,
          title: m,
          eyebrow: y,
          closeable: v,
        }),
        (i || a || r || o) &&
          (0, e.jsxs)(h, {
            children: [
              i || a
                ? (0, e.jsx)(w.Icon, { icon: i, variant: a, loadingStatus: t })
                : null,
              !(!r && !o) &&
                (0, e.jsxs)(g, {
                  children: [
                    r && (0, e.jsx)(f, { children: r }),
                    o && (0, e.jsx)(x, { children: o }),
                  ],
                }),
            ],
          }),
        b && (0, e.jsx)(C, { step: b }),
      ],
    })),
    ((w.Body = o.default.forwardRef(({ children: r, ...o }, i) =>
      (0, e.jsx)(v, { ref: i, ...o, children: r }),
    )).displayName = "Screen.Body"),
    (w.Footer = ({ children: r, ...o }) =>
      (0, e.jsx)(u, {
        id: "privy-content-footer-container",
        ...o,
        children: r,
      })),
    (w.Actions = ({ children: r, ...o }) =>
      (0, e.jsx)($, { ...o, children: r })),
    (w.HelpText = ({ children: r, ...o }) =>
      (0, e.jsx)(S, { ...o, children: r })),
    (w.FooterText = ({ children: r, ...o }) =>
      (0, e.jsx)(E, { ...o, children: r })),
    (w.Watermark = () => (0, e.jsx)(k, {})),
    (w.Icon = ({ icon: r, variant: i = "subtle", loadingStatus: t }) =>
      "logo" === i && r
        ? (0, e.jsx)(
            m,
            "string" == typeof r
              ? { children: (0, e.jsx)("img", { src: r, alt: "" }) }
              : o.default.isValidElement(r)
                ? { children: r }
                : { children: o.default.createElement(r) },
          )
        : "loading" === i
          ? r
            ? (0, e.jsx)(y, {
                children: (0, e.jsxs)("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  children: [
                    (0, e.jsx)(a.C, { success: t?.success, fail: t?.fail }),
                    "string" == typeof r
                      ? (0, e.jsx)("span", {
                          style: {
                            background: `url('${r}') 0 0 / contain`,
                            height: "38px",
                            width: "38px",
                            borderRadius: "6px",
                            margin: "auto",
                            backgroundSize: "contain",
                          },
                        })
                      : o.default.isValidElement(r)
                        ? o.default.cloneElement(r, {
                            style: { width: "38px", height: "38px" },
                          })
                        : o.default.createElement(r, {
                            style: { width: "38px", height: "38px" },
                          }),
                  ],
                }),
              })
            : (0, e.jsx)(b, {
                $variant: i,
                children: (0, e.jsx)(n.N, { size: "64px" }),
              })
          : (0, e.jsx)(b, {
              $variant: i,
              children:
                r &&
                ("string" == typeof r
                  ? (0, e.jsx)("img", {
                      src: r,
                      alt: "",
                      style: {
                        width: "32px",
                        height: "32px",
                        borderRadius: "6px",
                      },
                    })
                  : o.default.isValidElement(r)
                    ? r
                    : o.default.createElement(r, {
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
  let $ = i.z.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) / 2);
`,
    S = i.z.div`
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
    E = i.z.div`
  && {
    margin-top: -1rem;
    width: 100%;
    text-align: center;
    color: var(--privy-color-foreground-2);
    font-size: 0.6875rem; /* 11px */
    line-height: 1rem; /* 16px */
  }
`;
  r.s(["S", 0, w]);
};
