// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    i = e.i(352386),
    o = e.i(689391),
    a = e.i(541021),
    t = e.i(25047),
    l = e.i(995040),
    n = e.i(226439);
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
    p = (0, o.z)(l.M)`
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
  ${({ $colorScheme: e }) => ("light" === e ? "background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.06)) bottom;" : "dark" === e ? "background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.06)) bottom;" : void 0)}

  background-repeat: no-repeat;
  background-size:
    100% 32px,
    100% 16px;
  background-attachment: local, scroll;
`,
    g = o.z.div`
  display: flex;
  flex-direction: column;
  gap: var(--screen-space-lg);
  margin-top: 1.5rem;
`,
    u = o.z.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--screen-space);
`,
    v = o.z.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,
    f = o.z.h3`
  && {
    font-size: 20px;
    line-height: 32px;
    font-weight: 500;
    color: var(--privy-color-foreground);
    margin: 0;
  }
`,
    x = o.z.p`
  && {
    margin: 0;
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    color: var(--privy-color-foreground);
  }
`,
    m = o.z.div`
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
    b = o.z.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img,
  svg {
    max-height: 90px;
    max-width: 180px;
  }
`,
    y = o.z.div`
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
    w = ({ children: e, ...i }) =>
      (0, r.jsx)(s, { children: (0, r.jsx)(c, { ...i, children: e }) }),
    C = o.z.div`
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
    j = (0, o.z)(t.B)`
  padding: 0;
  && a {
    padding: 0;
    color: var(--privy-color-foreground-3);
  }
`,
    A = o.z.div`
  height: 100%;
  width: ${({ pct: e }) => e}%;
  background: var(--privy-color-foreground-3);
  border-radius: 2px;
  transition: width 300ms ease-in-out;
`,
    k = ({ step: e }) =>
      e
        ? (0, r.jsx)(C, {
            children: (0, r.jsx)(A, {
              pct: Math.min(100, (e.current / e.total) * 100),
            }),
          })
        : null;
  ((w.Header = ({
    title: e,
    subtitle: i,
    icon: o,
    iconVariant: a,
    iconLoadingStatus: t,
    showBack: l,
    onBack: n,
    showInfo: s,
    onInfo: c,
    showClose: h,
    onClose: g,
    step: m,
    headerTitle: b,
    eyebrow: y,
    ...C
  }) =>
    (0, r.jsxs)(d, {
      ...C,
      children: [
        (0, r.jsx)(p, {
          backFn: l ? n : void 0,
          infoFn: s ? c : void 0,
          onClose: h ? g : void 0,
          title: b,
          eyebrow: y,
          closeable: h,
        }),
        (o || a || e || i) &&
          (0, r.jsxs)(u, {
            children: [
              o || a
                ? (0, r.jsx)(w.Icon, { icon: o, variant: a, loadingStatus: t })
                : null,
              !(!e && !i) &&
                (0, r.jsxs)(v, {
                  children: [
                    e && (0, r.jsx)(f, { children: e }),
                    i && (0, r.jsx)(x, { children: i }),
                  ],
                }),
            ],
          }),
        m && (0, r.jsx)(k, { step: m }),
      ],
    })),
    ((w.Body = i.default.forwardRef(({ children: e, ...i }, o) =>
      (0, r.jsx)(h, { ref: o, ...i, children: e }),
    )).displayName = "Screen.Body"),
    (w.Footer = ({ children: e, ...i }) =>
      (0, r.jsx)(g, {
        id: "privy-content-footer-container",
        ...i,
        children: e,
      })),
    (w.Actions = ({ children: e, ...i }) =>
      (0, r.jsx)(M, { ...i, children: e })),
    (w.HelpText = ({ children: e, ...i }) =>
      (0, r.jsx)(S, { ...i, children: e })),
    (w.FooterText = ({ children: e, ...i }) =>
      (0, r.jsx)(z, { ...i, children: e })),
    (w.Watermark = () => (0, r.jsx)(j, {})),
    (w.Icon = ({ icon: e, variant: o = "subtle", loadingStatus: t }) =>
      "logo" === o && e
        ? (0, r.jsx)(
            b,
            "string" == typeof e
              ? { children: (0, r.jsx)("img", { src: e, alt: "" }) }
              : i.default.isValidElement(e)
                ? { children: e }
                : { children: i.default.createElement(e) },
          )
        : "loading" === o
          ? e
            ? (0, r.jsx)(y, {
                children: (0, r.jsxs)("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  children: [
                    (0, r.jsx)(a.C, { success: t?.success, fail: t?.fail }),
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
                      : i.default.isValidElement(e)
                        ? i.default.cloneElement(e, {
                            style: { width: "38px", height: "38px" },
                          })
                        : i.default.createElement(e, {
                            style: { width: "38px", height: "38px" },
                          }),
                  ],
                }),
              })
            : (0, r.jsx)(m, {
                $variant: o,
                children: (0, r.jsx)(n.N, { size: "64px" }),
              })
          : (0, r.jsx)(m, {
              $variant: o,
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
                  : i.default.isValidElement(e)
                    ? e
                    : i.default.createElement(e, {
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
  let M = o.z.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) / 2);
`,
    S = o.z.div`
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
    z = o.z.div`
  && {
    margin-top: -1rem;
    width: 100%;
    text-align: center;
    color: var(--privy-color-foreground-2);
    font-size: 0.6875rem; /* 11px */
    line-height: 1rem; /* 16px */
  }
`;
  e.s(["S", 0, w]);
};
