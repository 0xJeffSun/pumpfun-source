// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    i = r.i(352386),
    o = r.i(689391),
    t = r.i(541021),
    a = r.i(25047),
    n = r.i(995040),
    l = r.i(226439);
  let s = o.z.div`
  /* spacing tokens */
  --screen-space: 16px; /* base 1x = 16 */
  --screen-space-lg: calc(var(--screen-space) * 1.5); /* 24px */

  position: relative;
  overflow: hidden;
  margin: 0 calc(-1 * var(--screen-space)); /* extends over modal padding */
  height: 100%;
  border-radius: var(--privy-border-radius-lg);
`,
    c = o.z.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) * 1.5);
  width: 100%;
  background: var(--privy-color-background);
  padding: 0 var(--screen-space-lg) var(--screen-space);
  height: 100%;
  border-radius: var(--privy-border-radius-lg);
`,
    d = o.z.div`
  position: relative;
  display: flex;
  flex-direction: column;
`,
    p = (0, o.z)(n.M)`
  margin: 0 -8px;
`,
    h = o.z.div`
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
    v = o.z.div`
  display: flex;
  flex-direction: column;
  gap: var(--screen-space-lg);
  margin-top: 1.5rem;
`,
    g = o.z.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--screen-space);
`,
    u = o.z.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,
    x = o.z.h3`
  && {
    font-size: 20px;
    line-height: 32px;
    font-weight: 500;
    color: var(--privy-color-foreground);
    margin: 0;
  }
`,
    f = o.z.p`
  && {
    margin: 0;
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    color: var(--privy-color-foreground);
  }
`,
    y = o.z.div`
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
    m = o.z.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img,
  svg {
    max-height: 90px;
    max-width: 180px;
  }
`,
    b = o.z.div`
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
    w = ({ children: r, ...i }) =>
      (0, e.jsx)(s, { children: (0, e.jsx)(c, { ...i, children: r }) }),
    j = o.z.div`
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
    k = (0, o.z)(a.B)`
  padding: 0;
  && a {
    padding: 0;
    color: var(--privy-color-foreground-3);
  }
`,
    z = o.z.div`
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
    subtitle: i,
    icon: o,
    iconVariant: t,
    iconLoadingStatus: a,
    showBack: n,
    onBack: l,
    showInfo: s,
    onInfo: c,
    showClose: h,
    onClose: v,
    step: y,
    headerTitle: m,
    eyebrow: b,
    ...j
  }) =>
    (0, e.jsxs)(d, {
      ...j,
      children: [
        (0, e.jsx)(p, {
          backFn: n ? l : void 0,
          infoFn: s ? c : void 0,
          onClose: h ? v : void 0,
          title: m,
          eyebrow: b,
          closeable: h,
        }),
        (o || t || r || i) &&
          (0, e.jsxs)(g, {
            children: [
              o || t
                ? (0, e.jsx)(w.Icon, { icon: o, variant: t, loadingStatus: a })
                : null,
              !(!r && !i) &&
                (0, e.jsxs)(u, {
                  children: [
                    r && (0, e.jsx)(x, { children: r }),
                    i && (0, e.jsx)(f, { children: i }),
                  ],
                }),
            ],
          }),
        y && (0, e.jsx)(C, { step: y }),
      ],
    })),
    ((w.Body = i.default.forwardRef(({ children: r, ...i }, o) =>
      (0, e.jsx)(h, { ref: o, ...i, children: r }),
    )).displayName = "Screen.Body"),
    (w.Footer = ({ children: r, ...i }) =>
      (0, e.jsx)(v, {
        id: "privy-content-footer-container",
        ...i,
        children: r,
      })),
    (w.Actions = ({ children: r, ...i }) =>
      (0, e.jsx)(L, { ...i, children: r })),
    (w.HelpText = ({ children: r, ...i }) =>
      (0, e.jsx)(M, { ...i, children: r })),
    (w.FooterText = ({ children: r, ...i }) =>
      (0, e.jsx)($, { ...i, children: r })),
    (w.Watermark = () => (0, e.jsx)(k, {})),
    (w.Icon = ({ icon: r, variant: o = "subtle", loadingStatus: a }) =>
      "logo" === o && r
        ? (0, e.jsx)(
            m,
            "string" == typeof r
              ? { children: (0, e.jsx)("img", { src: r, alt: "" }) }
              : i.default.isValidElement(r)
                ? { children: r }
                : { children: i.default.createElement(r) },
          )
        : "loading" === o
          ? r
            ? (0, e.jsx)(b, {
                children: (0, e.jsxs)("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  children: [
                    (0, e.jsx)(t.C, { success: a?.success, fail: a?.fail }),
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
                      : i.default.isValidElement(r)
                        ? i.default.cloneElement(r, {
                            style: { width: "38px", height: "38px" },
                          })
                        : i.default.createElement(r, {
                            style: { width: "38px", height: "38px" },
                          }),
                  ],
                }),
              })
            : (0, e.jsx)(y, {
                $variant: o,
                children: (0, e.jsx)(l.N, { size: "64px" }),
              })
          : (0, e.jsx)(y, {
              $variant: o,
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
                  : i.default.isValidElement(r)
                    ? r
                    : i.default.createElement(r, {
                        width: 32,
                        height: 32,
                        stroke: (() => {
                          switch (o) {
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
  let L = o.z.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) / 2);
`,
    M = o.z.div`
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
    $ = o.z.div`
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
