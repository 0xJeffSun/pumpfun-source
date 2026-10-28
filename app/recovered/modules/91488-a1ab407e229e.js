// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    i = e.i(332835);
  let o = (0, e.i(78048).f)("phone", [
    [
      "path",
      {
        d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
        key: "9njp5v",
      },
    ],
  ]);
  var n = e.i(465120),
    t = e.i(689391),
    a = e.i(933185),
    s = e.i(616800),
    l = e.i(565530),
    c = e.i(636447),
    d = e.i(385937),
    h = e.i(839094),
    p = e.i(335341);
  (e.i(352386), e.i(252494), e.i(785373), e.i(768820), e.i(535391));
  let x = ({
      error: e,
      allowlistConfig: t,
      onRetry: a,
      onCaptchaReset: c,
      onBack: x,
    }) => {
      let u = ((e, t) => {
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
                    (0, r.jsx)(g, {
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
            icon: i.f,
          };
        if (e instanceof l.P)
          switch (e.privyErrorCode) {
            case l.a.CLIENT_REQUEST_TIMEOUT:
              return {
                title: "Timed out",
                detail: e.message,
                ctaText: "Try again",
                icon: i.f,
              };
            case l.a.INSUFFICIENT_BALANCE:
              return {
                title: "Insufficient balance",
                detail: e.message,
                ctaText: "Try again",
                icon: i.f,
              };
            case l.a.TRANSACTION_FAILURE:
              return {
                title: "Transaction failure",
                detail: e.message,
                ctaText: "Try again",
                icon: i.f,
              };
            default:
              return {
                title: "Something went wrong",
                detail: "Try again later",
                ctaText: "Try again",
                icon: i.f,
              };
          }
        if (e instanceof s.P && "twilio_verification_failed" === e.type)
          return {
            title: "Something went wrong",
            detail: e.message,
            ctaText: "Try again",
            icon: o,
          };
        if (!(e instanceof l.b))
          return e instanceof l.c && e.status && [400, 422].includes(e.status)
            ? {
                title: "Something went wrong",
                detail: e.message,
                ctaText: "Try again",
                icon: i.f,
              }
            : {
                title: "Something went wrong",
                detail: "Try again later",
                ctaText: "Try again",
                icon: i.f,
              };
        switch (e.privyErrorCode) {
          case l.a.INVALID_CAPTCHA:
            return {
              title: "Something went wrong",
              detail: "Please try again.",
              ctaText: "Try again",
              icon: i.f,
            };
          case l.a.DISALLOWED_LOGIN_METHOD:
            return {
              title: "Not allowed",
              detail: e.message,
              ctaText: "Try another method",
              icon: i.f,
            };
          case l.a.ALLOWLIST_REJECTED:
            return {
              title: t.errorTitle || "You don't have access to this app",
              detail: t.errorDetail || "Have you been invited?",
              ctaText: t.errorCtaText || "Try another account",
              icon: n.f,
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
              icon: i.f,
            };
          case l.a.NOT_SUPPORTED:
            return {
              title: "This region is not supported",
              detail: "SMS authentication from this region is not available",
              ctaText: "Try another method",
              icon: i.f,
            };
          case l.a.TOO_MANY_REQUESTS:
            return {
              title: "Request failed",
              detail: "Too many attempts.",
              ctaText: "Try again later",
              icon: i.f,
            };
          default:
            return {
              title: "Something went wrong",
              detail: "Try again later",
              ctaText: "Try again",
              icon: i.f,
            };
        }
      })(e, t);
      return (0, r.jsx)(p.S, {
        title: u.title,
        subtitle: u.detail,
        icon: u.icon,
        onBack: x,
        iconVariant: "error",
        primaryCta: {
          label: u.ctaText,
          onClick: () => {
            if (
              e instanceof l.b &&
              (e.privyErrorCode === l.a.INVALID_CAPTCHA && c?.(),
              e.privyErrorCode === l.a.ALLOWLIST_REJECTED)
            ) {
              let e = (0, h.t)(t.errorCtaLink);
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
    u = {
      component: () => {
        let {
            navigate: e,
            data: i,
            lastScreen: o,
            currentScreen: n,
          } = (0, c.u)(),
          t = (0, a.a)(),
          { reset: l } = (0, s.a)(),
          d = i?.errorModalData?.previousScreen || (o === n ? void 0 : o);
        return (0, r.jsx)(x, {
          error: i?.errorModalData?.error || Error(),
          allowlistConfig: t.allowlistConfig,
          onRetry: () => {
            e(d || "LandingScreen", !1);
          },
          onCaptchaReset: l,
        });
      },
    },
    g = t.z.a`
  color: var(--privy-color-accent) !important;
  font-weight: 600;
`;
  e.s(["ErrorScreen", 0, u, "ErrorScreenView", 0, x, "default", 0, u], 91488);
};
