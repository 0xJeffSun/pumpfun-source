// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(269722),
    i = r.i(572280),
    a = r.i(352386),
    l = r.i(616800),
    t = r.i(636447),
    n = r.i(335341);
  (r.i(252494), r.i(785373), r.i(768820), r.i(535391));
  let c = ({
      status: r,
      title: l,
      description: t,
      userIntentRequired: c,
      retriesRemaining: s,
      hasSelectedCta: d,
      onContinue: v,
      onRetry: p,
    }) => {
      let u = (0, a.useMemo)(() => {
          switch (r) {
            case "loading":
            default:
              return;
            case "success":
              return c
                ? {
                    label: d ? "Continuing..." : "Continue",
                    onClick: v,
                    disabled: d,
                    loading: d,
                  }
                : void 0;
            case "error":
              return s > 0 ? { label: "Retry", onClick: p } : void 0;
          }
        }, [r, d, v, p]),
        h = (0, a.useMemo)(
          () =>
            ({
              loading: "loading",
              ready: "subtle",
              disabled: "subtle",
              success: "success",
              error: "error",
            })[r] || "loading",
          [r],
        );
      return (0, e.jsx)(n.S, {
        icon:
          "loading" === r || "ready" === r
            ? void 0
            : "success" === r
              ? o.f
              : i.f,
        iconVariant: h,
        title: l,
        subtitle: t,
        primaryCta: u,
        watermark: !0,
      });
    },
    s = {
      component: () => {
        let {
            lastScreen: r,
            data: o,
            navigate: i,
            setModalData: n,
          } = (0, t.u)(),
          {
            status: s,
            token: d,
            waitForResult: v,
            reset: p,
            execute: u,
          } = (0, l.a)(),
          h = (0, a.useRef)([]),
          g = (r) => {
            h.current = [r, ...h.current];
          },
          [b, f] = (0, a.useState)(!0);
        (0, a.useEffect)(
          () => (
            g(setTimeout(f, 1e3, !1)),
            () => {
              (h.current.forEach((r) => clearTimeout(r)), (h.current = []));
            }
          ),
          [],
        );
        let [x, y] = (0, a.useState)(""),
          [m, k] = (0, a.useState)("Checking that you are a human..."),
          [w, j] = (0, a.useState)(!1),
          [z, $] = (0, a.useState)(3),
          C = o?.captchaModalData,
          S = async (e) => {
            try {
              (await C?.callback(e),
                C?.onSuccessNavigateTo && i(C?.onSuccessNavigateTo, !1));
            } catch (e) {
              if (e instanceof l.C) return;
              (n({
                errorModalData: {
                  error: e,
                  previousScreen: r || "LandingScreen",
                },
              }),
                i(C?.onErrorNavigateTo || "ErrorScreen", !1));
            }
          };
        return (
          (0, a.useEffect)(() => {
            "success" === s
              ? g(
                  setTimeout(async () => {
                    let r = await v();
                    !r || C?.userIntentRequired || S(r);
                  }, 1e3),
                )
              : "ready" === s &&
                g(
                  setTimeout(() => {
                    "ready" === s && u();
                  }, 500),
                );
          }, [s]),
          (0, a.useEffect)(() => {
            if (!b)
              switch (s) {
                case "success":
                  (y("Success!"),
                    k("CAPTCHA passed successfully."),
                    C?.userIntentRequired ||
                      setTimeout(() => {
                        (j(!0), S(d));
                      }, 2e3));
                  break;
                case "loading":
                  (y(""), k("Checking that you are a human..."));
                  break;
                case "error":
                  (y("Something went wrong"),
                    k(
                      z <= 0
                        ? "If you use an adblocker or VPN, try disabling and re-attempting."
                        : "You did not pass CAPTCHA. Please try again.",
                    ));
              }
          }, [s, b, w]),
          (0, e.jsx)(c, {
            status: s,
            title: x,
            description: m,
            userIntentRequired: C?.userIntentRequired,
            retriesRemaining: z,
            hasSelectedCta: w,
            onContinue: () => {
              (j(!0), S(d));
            },
            onRetry: async () => {
              if (z <= 0) return;
              ($((r) => r - 1), p(), u());
              let r = await v();
              !r || C?.userIntentRequired || S(r);
            },
          })
        );
      },
    };
  r.s(["CaptchaScreen", 0, s, "CaptchaScreenView", 0, c, "default", 0, s]);
};
