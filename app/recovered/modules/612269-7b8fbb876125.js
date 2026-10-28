// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    i = e.i(352386),
    o = e.i(689391),
    t = e.i(541021),
    a = e.i(25047),
    n = e.i(995040),
    l = e.i(226439);
  let c = o.z.div`
  /* spacing tokens */
  --screen-space: 16px; /* base 1x = 16 */
  --screen-space-lg: calc(var(--screen-space) * 1.5); /* 24px */

  position: relative;
  overflow: hidden;
  margin: 0 calc(-1 * var(--screen-space)); /* extends over modal padding */
  height: 100%;
  border-radius: var(--privy-border-radius-lg);
`,
    s = o.z.div`
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
    u = o.z.div`
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
    h = o.z.div`
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
    v = o.z.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,
    m = o.z.h3`
  && {
    font-size: 20px;
    line-height: 32px;
    font-weight: 500;
    color: var(--privy-color-foreground);
    margin: 0;
  }
`,
    w = o.z.p`
  && {
    margin: 0;
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    color: var(--privy-color-foreground);
  }
`,
    y = o.z.div`
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
    f = o.z.div`
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
    x = ({ children: e, ...i }) =>
      (0, r.jsx)(c, { children: (0, r.jsx)(s, { ...i, children: e }) }),
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
    k = (0, o.z)(a.B)`
  padding: 0;
  && a {
    padding: 0;
    color: var(--privy-color-foreground-3);
  }
`,
    j = o.z.div`
  height: 100%;
  width: ${({ pct: e }) => e}%;
  background: var(--privy-color-foreground-3);
  border-radius: 2px;
  transition: width 300ms ease-in-out;
`,
    z = ({ step: e }) =>
      e
        ? (0, r.jsx)(C, {
            children: (0, r.jsx)(j, {
              pct: Math.min(100, (e.current / e.total) * 100),
            }),
          })
        : null;
  ((x.Header = ({
    title: e,
    subtitle: i,
    icon: o,
    iconVariant: t,
    iconLoadingStatus: a,
    showBack: n,
    onBack: l,
    showInfo: c,
    onInfo: s,
    showClose: u,
    onClose: h,
    step: y,
    headerTitle: f,
    eyebrow: b,
    ...C
  }) =>
    (0, r.jsxs)(d, {
      ...C,
      children: [
        (0, r.jsx)(p, {
          backFn: n ? l : void 0,
          infoFn: c ? s : void 0,
          onClose: u ? h : void 0,
          title: f,
          eyebrow: b,
          closeable: u,
        }),
        (o || t || e || i) &&
          (0, r.jsxs)(g, {
            children: [
              o || t
                ? (0, r.jsx)(x.Icon, { icon: o, variant: t, loadingStatus: a })
                : null,
              !(!e && !i) &&
                (0, r.jsxs)(v, {
                  children: [
                    e && (0, r.jsx)(m, { children: e }),
                    i && (0, r.jsx)(w, { children: i }),
                  ],
                }),
            ],
          }),
        y && (0, r.jsx)(z, { step: y }),
      ],
    })),
    ((x.Body = i.default.forwardRef(({ children: e, ...i }, o) =>
      (0, r.jsx)(u, { ref: o, ...i, children: e }),
    )).displayName = "Screen.Body"),
    (x.Footer = ({ children: e, ...i }) =>
      (0, r.jsx)(h, {
        id: "privy-content-footer-container",
        ...i,
        children: e,
      })),
    (x.Actions = ({ children: e, ...i }) =>
      (0, r.jsx)(S, { ...i, children: e })),
    (x.HelpText = ({ children: e, ...i }) =>
      (0, r.jsx)(T, { ...i, children: e })),
    (x.FooterText = ({ children: e, ...i }) =>
      (0, r.jsx)(V, { ...i, children: e })),
    (x.Watermark = () => (0, r.jsx)(k, {})),
    (x.Icon = ({ icon: e, variant: o = "subtle", loadingStatus: a }) =>
      "logo" === o && e
        ? (0, r.jsx)(
            f,
            "string" == typeof e
              ? { children: (0, r.jsx)("img", { src: e, alt: "" }) }
              : i.default.isValidElement(e)
                ? { children: e }
                : { children: i.default.createElement(e) },
          )
        : "loading" === o
          ? e
            ? (0, r.jsx)(b, {
                children: (0, r.jsxs)("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  children: [
                    (0, r.jsx)(t.C, { success: a?.success, fail: a?.fail }),
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
            : (0, r.jsx)(y, {
                $variant: o,
                children: (0, r.jsx)(l.N, { size: "64px" }),
              })
          : (0, r.jsx)(y, {
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
  let S = o.z.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) / 2);
`,
    T = o.z.div`
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
    V = o.z.div`
  && {
    margin-top: -1rem;
    width: 100%;
    text-align: center;
    color: var(--privy-color-foreground-2);
    font-size: 0.6875rem; /* 11px */
    line-height: 1rem; /* 16px */
  }
`;
  e.s(["S", 0, x]);
};
