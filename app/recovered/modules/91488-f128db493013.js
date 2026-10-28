// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    n = e.i(332835);
  let i = (0, e.i(78048).f)("phone", [
    [
      "path",
      {
        d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
        key: "9njp5v",
      },
    ],
  ]);
  var t = e.i(465120),
    s = e.i(689391),
    a = e.i(933185),
    o = e.i(616800),
    l = e.i(565530),
    c = e.i(636447),
    d = e.i(385937),
    h = e.i(839094),
    x = e.i(335341);
  (e.i(352386), e.i(252494), e.i(785373), e.i(768820), e.i(535391));
  let u = ({
      error: e,
      allowlistConfig: s,
      onRetry: a,
      onCaptchaReset: c,
      onBack: u,
    }) => {
      let p = ((e, s) => {
        if (e instanceof d.R)
          return {
            title: "Transaction failed",
            detail: (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsx)("span", { children: e.message }),
                (0, r.jsxs)("span", {
                  children: [
                    " ",
                    "Check the",
                    " ",
                    (0, r.jsx)(m, {
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
            icon: n.f,
          };
        if (e instanceof l.P)
          switch (e.privyErrorCode) {
            case l.a.CLIENT_REQUEST_TIMEOUT:
              return {
                title: "Timed out",
                detail: e.message,
                ctaText: "Try again",
                icon: n.f,
              };
            case l.a.INSUFFICIENT_BALANCE:
              return {
                title: "Insufficient balance",
                detail: e.message,
                ctaText: "Try again",
                icon: n.f,
              };
            case l.a.TRANSACTION_FAILURE:
              return {
                title: "Transaction failure",
                detail: e.message,
                ctaText: "Try again",
                icon: n.f,
              };
            default:
              return {
                title: "Something went wrong",
                detail: "Try again later",
                ctaText: "Try again",
                icon: n.f,
              };
          }
        if (e instanceof o.P && "twilio_verification_failed" === e.type)
          return {
            title: "Something went wrong",
            detail: e.message,
            ctaText: "Try again",
            icon: i,
          };
        if (!(e instanceof l.b))
          return e instanceof l.c && e.status && [400, 422].includes(e.status)
            ? {
                title: "Something went wrong",
                detail: e.message,
                ctaText: "Try again",
                icon: n.f,
              }
            : {
                title: "Something went wrong",
                detail: "Try again later",
                ctaText: "Try again",
                icon: n.f,
              };
        switch (e.privyErrorCode) {
          case l.a.INVALID_CAPTCHA:
            return {
              title: "Something went wrong",
              detail: "Please try again.",
              ctaText: "Try again",
              icon: n.f,
            };
          case l.a.DISALLOWED_LOGIN_METHOD:
            return {
              title: "Not allowed",
              detail: e.message,
              ctaText: "Try another method",
              icon: n.f,
            };
          case l.a.ALLOWLIST_REJECTED:
            return {
              title: s.errorTitle || "You don't have access to this app",
              detail: s.errorDetail || "Have you been invited?",
              ctaText: s.errorCtaText || "Try another account",
              icon: t.f,
            };
          case l.a.CAPTCHA_FAILURE:
            return {
              title: "Something went wrong",
              detail: "You did not pass CAPTCHA. Please try again.",
              ctaText: "Try again",
              icon: null,
            };
          case l.a.CAPTCHA_TIMEOUT:
            return {
              title: "Something went wrong",
              detail: "Something went wrong! Please try again later.",
              ctaText: "Try again",
              icon: null,
            };
          case l.a.LINKED_TO_ANOTHER_USER:
            return {
              title: "Authentication failed",
              detail: "This account has already been linked to another user.",
              ctaText: "Try again",
              icon: n.f,
            };
          case l.a.NOT_SUPPORTED:
            return {
              title: "This region is not supported",
              detail: "SMS authentication from this region is not available",
              ctaText: "Try another method",
              icon: n.f,
            };
          case l.a.TOO_MANY_REQUESTS:
            return {
              title: "Request failed",
              detail: "Too many attempts.",
              ctaText: "Try again later",
              icon: n.f,
            };
          default:
            return {
              title: "Something went wrong",
              detail: "Try again later",
              ctaText: "Try again",
              icon: n.f,
            };
        }
      })(e, s);
      return (0, r.jsx)(x.S, {
        title: p.title,
        subtitle: p.detail,
        icon: p.icon,
        onBack: u,
        iconVariant: "error",
        primaryCta: {
          label: p.ctaText,
          onClick: () => {
            if (
              e instanceof l.b &&
              (e.privyErrorCode === l.a.INVALID_CAPTCHA && c?.(),
              e.privyErrorCode === l.a.ALLOWLIST_REJECTED)
            ) {
              let e = (0, h.t)(s.errorCtaLink);
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
    p = {
      component: () => {
        let {
            navigate: e,
            data: n,
            lastScreen: i,
            currentScreen: t,
          } = (0, c.u)(),
          s = (0, a.a)(),
          { reset: l } = (0, o.a)(),
          d = n?.errorModalData?.previousScreen || (i === t ? void 0 : i);
        return (0, r.jsx)(u, {
          error: n?.errorModalData?.error || Error(),
          allowlistConfig: s.allowlistConfig,
          onRetry: () => {
            e(d || "LandingScreen", !1);
          },
          onCaptchaReset: l,
        });
      },
    },
    m = s.z.a`
  color: var(--privy-color-accent) !important;
  font-weight: 600;
`;
  e.s(["ErrorScreen", 0, p, "ErrorScreenView", 0, u, "default", 0, p], 91488);
};
