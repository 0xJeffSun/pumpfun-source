// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(332835);
  let i = (0, e.i(78048).f)("phone", [
    [
      "path",
      {
        d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
        key: "9njp5v",
      },
    ],
  ]);
  var n = e.i(465120),
    o = e.i(689391),
    a = e.i(933185),
    l = e.i(616800),
    s = e.i(565530),
    c = e.i(636447),
    d = e.i(385937),
    h = e.i(839094),
    p = e.i(335341);
  (e.i(352386), e.i(252494), e.i(785373), e.i(768820), e.i(535391));
  let u = ({
      error: e,
      allowlistConfig: o,
      onRetry: a,
      onCaptchaReset: c,
      onBack: u,
    }) => {
      let x = ((e, o) => {
        if (e instanceof d.R)
          return {
            title: "Transaction failed",
            detail: (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsx)("span", { children: e.message }),
                (0, t.jsxs)("span", {
                  children: [
                    " ",
                    "Check the",
                    " ",
                    (0, t.jsx)(g, {
                      href: e.relayLink,
                      target: "_blank",
                      children: "refund status",
                    }),
                    ".",
                  ],
                }),
              ],
            }),
            ctaText: "Try again",
            icon: r.f,
          };
        if (e instanceof s.P)
          switch (e.privyErrorCode) {
            case s.a.CLIENT_REQUEST_TIMEOUT:
              return {
                title: "Timed out",
                detail: e.message,
                ctaText: "Try again",
                icon: r.f,
              };
            case s.a.INSUFFICIENT_BALANCE:
              return {
                title: "Insufficient balance",
                detail: e.message,
                ctaText: "Try again",
                icon: r.f,
              };
            case s.a.TRANSACTION_FAILURE:
              return {
                title: "Transaction failure",
                detail: e.message,
                ctaText: "Try again",
                icon: r.f,
              };
            default:
              return {
                title: "Something went wrong",
                detail: "Try again later",
                ctaText: "Try again",
                icon: r.f,
              };
          }
        if (e instanceof l.P && "twilio_verification_failed" === e.type)
          return {
            title: "Something went wrong",
            detail: e.message,
            ctaText: "Try again",
            icon: i,
          };
        if (!(e instanceof s.b))
          return e instanceof s.c && e.status && [400, 422].includes(e.status)
            ? {
                title: "Something went wrong",
                detail: e.message,
                ctaText: "Try again",
                icon: r.f,
              }
            : {
                title: "Something went wrong",
                detail: "Try again later",
                ctaText: "Try again",
                icon: r.f,
              };
        switch (e.privyErrorCode) {
          case s.a.INVALID_CAPTCHA:
            return {
              title: "Something went wrong",
              detail: "Please try again.",
              ctaText: "Try again",
              icon: r.f,
            };
          case s.a.DISALLOWED_LOGIN_METHOD:
            return {
              title: "Not allowed",
              detail: e.message,
              ctaText: "Try another method",
              icon: r.f,
            };
          case s.a.ALLOWLIST_REJECTED:
            return {
              title: o.errorTitle || "You don't have access to this app",
              detail: o.errorDetail || "Have you been invited?",
              ctaText: o.errorCtaText || "Try another account",
              icon: n.f,
            };
          case s.a.CAPTCHA_FAILURE:
            return {
              title: "Something went wrong",
              detail: "You did not pass CAPTCHA. Please try again.",
              ctaText: "Try again",
              icon: null,
            };
          case s.a.CAPTCHA_TIMEOUT:
            return {
              title: "Something went wrong",
              detail: "Something went wrong! Please try again later.",
              ctaText: "Try again",
              icon: null,
            };
          case s.a.LINKED_TO_ANOTHER_USER:
            return {
              title: "Authentication failed",
              detail: "This account has already been linked to another user.",
              ctaText: "Try again",
              icon: r.f,
            };
          case s.a.NOT_SUPPORTED:
            return {
              title: "This region is not supported",
              detail: "SMS authentication from this region is not available",
              ctaText: "Try another method",
              icon: r.f,
            };
          case s.a.TOO_MANY_REQUESTS:
            return {
              title: "Request failed",
              detail: "Too many attempts.",
              ctaText: "Try again later",
              icon: r.f,
            };
          default:
            return {
              title: "Something went wrong",
              detail: "Try again later",
              ctaText: "Try again",
              icon: r.f,
            };
        }
      })(e, o);
      return (0, t.jsx)(p.S, {
        title: x.title,
        subtitle: x.detail,
        icon: x.icon,
        onBack: u,
        iconVariant: "error",
        primaryCta: {
          label: x.ctaText,
          onClick: () => {
            if (
              e instanceof s.b &&
              (e.privyErrorCode === s.a.INVALID_CAPTCHA && c?.(),
              e.privyErrorCode === s.a.ALLOWLIST_REJECTED)
            ) {
              let e = (0, h.t)(o.errorCtaLink);
              if (e)
                return void window.open(e, "_blank", "noopener,noreferrer");
            }
            a?.();
          },
          variant: "error",
        },
        watermark: !0,
      });
    },
    x = {
      component: () => {
        let {
            navigate: e,
            data: r,
            lastScreen: i,
            currentScreen: n,
          } = (0, c.u)(),
          o = (0, a.a)(),
          { reset: s } = (0, l.a)(),
          d = r?.errorModalData?.previousScreen || (i === n ? void 0 : i);
        return (0, t.jsx)(u, {
          error: r?.errorModalData?.error || Error(),
          allowlistConfig: o.allowlistConfig,
          onRetry: () => {
            e(d || "LandingScreen", !1);
          },
          onCaptchaReset: s,
        });
      },
    },
    g = o.z.a`
  color: var(--privy-color-accent) !important;
  font-weight: 600;
`;
  e.s(["ErrorScreen", 0, x, "ErrorScreenView", 0, u, "default", 0, x], 91488);
};
