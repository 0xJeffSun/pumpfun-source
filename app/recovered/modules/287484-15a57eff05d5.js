// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(5727),
    a = r.i(616800),
    i = r.i(748117),
    l = r.i(636447),
    n = r.i(335341);
  (r.i(352386), r.i(252494), r.i(785373), r.i(768820), r.i(535391));
  let t = ({
      title: r = "Log in or create a new account?",
      subtitle:
        a = "Create a new account with a passkey or use a passkey to log in to an existing account.",
      onSignup: i,
      onLogin: l,
    }) =>
      (0, e.jsx)(n.S, {
        title: r,
        subtitle: a,
        icon: o.f,
        primaryCta: { label: "Create new account", onClick: i },
        secondaryCta: { label: "Log in with a passkey", onClick: l },
        watermark: !0,
      }),
    c = {
      component: () => {
        let { enabled: r, token: o } = (0, a.a)(),
          { navigate: n, setModalData: c } = (0, l.u)(),
          { initSignupWithPasskey: d, initLoginWithPasskey: s } = (0, i.u)();
        return (0, e.jsx)(t, {
          onSignup: async () => {
            r && !o
              ? (c({
                  passkeyAuthModalData: { passkeySignupFlow: !0 },
                  captchaModalData: {
                    callback: (r) => d({ captchaToken: r, withPrivyUi: !0 }),
                    userIntentRequired: !1,
                    onSuccessNavigateTo: "PasskeyStatusScreen",
                    onErrorNavigateTo: "ErrorScreen",
                  },
                }),
                n("CaptchaScreen"))
              : (await d({ withPrivyUi: !0, captchaToken: o }),
                c({ passkeyAuthModalData: { passkeySignupFlow: !0 } }),
                n("PasskeyStatusScreen"));
          },
          onLogin: async () => {
            r && !o
              ? (c({
                  passkeyAuthModalData: { passkeySignupFlow: !1 },
                  captchaModalData: {
                    callback: (r) => s({ captchaToken: r, withPrivyUi: !0 }),
                    userIntentRequired: !1,
                    onSuccessNavigateTo: "PasskeyStatusScreen",
                    onErrorNavigateTo: "ErrorScreen",
                  },
                }),
                n("CaptchaScreen"))
              : (await s({ withPrivyUi: !0, captchaToken: o }),
                c({ passkeyAuthModalData: { passkeySignupFlow: !1 } }),
                n("PasskeyStatusScreen"));
          },
        });
      },
    };
  r.s([
    "PasskeySelectSignupOrLogin",
    0,
    c,
    "PasskeySelectSignupOrLoginView",
    0,
    t,
    "default",
    0,
    c,
  ]);
};
