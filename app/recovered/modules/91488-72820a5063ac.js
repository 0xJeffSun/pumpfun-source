// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(332835);
  let a = (0, r.i(78048).f)("phone", [
    [
      "path",
      {
        d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
        key: "9njp5v",
      },
    ],
  ]);
  var i = r.i(465120),
    t = r.i(689391),
    n = r.i(933185),
    l = r.i(616800),
    c = r.i(565530),
    s = r.i(636447),
    d = r.i(385937),
    v = r.i(839094),
    p = r.i(335341);
  (r.i(352386), r.i(252494), r.i(785373), r.i(768820), r.i(535391));
  let u = ({
      error: r,
      allowlistConfig: t,
      onRetry: n,
      onCaptchaReset: s,
      onBack: u,
    }) => {
      let h = ((r, t) => {
        if (r instanceof d.R)
          return {
            title: "Transaction failed",
            detail: (0, e.jsxs)(e.Fragment, {
              children: [
                (0, e.jsx)("span", { children: r.message }),
                (0, e.jsxs)("span", {
                  children: [
                    " ",
                    "Check the",
                    " ",
                    (0, e.jsx)(g, {
                      href: r.relayLink,
                      target: "_blank",
                      children: "refund status",
                    }),
                    ".",
                  ],
                }),
              ],
            }),
            ctaText: "Try again",
            icon: o.f,
          };
        if (r instanceof c.P)
          switch (r.privyErrorCode) {
            case c.a.CLIENT_REQUEST_TIMEOUT:
              return {
                title: "Timed out",
                detail: r.message,
                ctaText: "Try again",
                icon: o.f,
              };
            case c.a.INSUFFICIENT_BALANCE:
              return {
                title: "Insufficient balance",
                detail: r.message,
                ctaText: "Try again",
                icon: o.f,
              };
            case c.a.TRANSACTION_FAILURE:
              return {
                title: "Transaction failure",
                detail: r.message,
                ctaText: "Try again",
                icon: o.f,
              };
            default:
              return {
                title: "Something went wrong",
                detail: "Try again later",
                ctaText: "Try again",
                icon: o.f,
              };
          }
        if (r instanceof l.P && "twilio_verification_failed" === r.type)
          return {
            title: "Something went wrong",
            detail: r.message,
            ctaText: "Try again",
            icon: a,
          };
        if (!(r instanceof c.b))
          return r instanceof c.c && r.status && [400, 422].includes(r.status)
            ? {
                title: "Something went wrong",
                detail: r.message,
                ctaText: "Try again",
                icon: o.f,
              }
            : {
                title: "Something went wrong",
                detail: "Try again later",
                ctaText: "Try again",
                icon: o.f,
              };
        switch (r.privyErrorCode) {
          case c.a.INVALID_CAPTCHA:
            return {
              title: "Something went wrong",
              detail: "Please try again.",
              ctaText: "Try again",
              icon: o.f,
            };
          case c.a.DISALLOWED_LOGIN_METHOD:
            return {
              title: "Not allowed",
              detail: r.message,
              ctaText: "Try another method",
              icon: o.f,
            };
          case c.a.ALLOWLIST_REJECTED:
            return {
              title: t.errorTitle || "You don't have access to this app",
              detail: t.errorDetail || "Have you been invited?",
              ctaText: t.errorCtaText || "Try another account",
              icon: i.f,
            };
          case c.a.CAPTCHA_FAILURE:
            return {
              title: "Something went wrong",
              detail: "You did not pass CAPTCHA. Please try again.",
              ctaText: "Try again",
              icon: null,
            };
          case c.a.CAPTCHA_TIMEOUT:
            return {
              title: "Something went wrong",
              detail: "Something went wrong! Please try again later.",
              ctaText: "Try again",
              icon: null,
            };
          case c.a.LINKED_TO_ANOTHER_USER:
            return {
              title: "Authentication failed",
              detail: "This account has already been linked to another user.",
              ctaText: "Try again",
              icon: o.f,
            };
          case c.a.NOT_SUPPORTED:
            return {
              title: "This region is not supported",
              detail: "SMS authentication from this region is not available",
              ctaText: "Try another method",
              icon: o.f,
            };
          case c.a.TOO_MANY_REQUESTS:
            return {
              title: "Request failed",
              detail: "Too many attempts.",
              ctaText: "Try again later",
              icon: o.f,
            };
          default:
            return {
              title: "Something went wrong",
              detail: "Try again later",
              ctaText: "Try again",
              icon: o.f,
            };
        }
      })(r, t);
      return (0, e.jsx)(p.S, {
        title: h.title,
        subtitle: h.detail,
        icon: h.icon,
        onBack: u,
        iconVariant: "error",
        primaryCta: {
          label: h.ctaText,
          onClick: () => {
            if (
              r instanceof c.b &&
              (r.privyErrorCode === c.a.INVALID_CAPTCHA && s?.(),
              r.privyErrorCode === c.a.ALLOWLIST_REJECTED)
            ) {
              let r = (0, v.t)(t.errorCtaLink);
              if (r)
                return void window.open(r, "_blank", "noopener,noreferrer");
            }
            n?.();
          },
          variant: "error",
        },
        watermark: !0,
      });
    },
    h = {
      component: () => {
        let {
            navigate: r,
            data: o,
            lastScreen: a,
            currentScreen: i,
          } = (0, s.u)(),
          t = (0, n.a)(),
          { reset: c } = (0, l.a)(),
          d = o?.errorModalData?.previousScreen || (a === i ? void 0 : a);
        return (0, e.jsx)(u, {
          error: o?.errorModalData?.error || Error(),
          allowlistConfig: t.allowlistConfig,
          onRetry: () => {
            r(d || "LandingScreen", !1);
          },
          onCaptchaReset: c,
        });
      },
    },
    g = t.z.a`
  color: var(--privy-color-accent) !important;
  font-weight: 600;
`;
  r.s(["ErrorScreen", 0, h, "ErrorScreenView", 0, u, "default", 0, h], 91488);
};
