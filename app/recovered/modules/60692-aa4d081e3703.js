// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(5727),
    i = r.i(352386),
    a = r.i(689391),
    l = r.i(933185),
    t = r.i(565530),
    n = r.i(748117),
    c = r.i(636447),
    s = r.i(203793),
    d = r.i(335341);
  (r.i(252494), r.i(785373), r.i(768820), r.i(535391));
  let v = ({ status: r, passkeySignupFlow: i = !1, error: a, onRetry: l }) =>
      (0, e.jsx)(d.S, {
        title: (() => {
          switch (r) {
            case "loading":
              return "Waiting for passkey";
            case "success":
              return "Success";
            case "error":
              return "Something went wrong";
          }
        })(),
        subtitle: (0, e.jsx)(u, {
          children: (() => {
            switch (r) {
              case "loading":
                return i
                  ? "Please follow prompts to register your passkey."
                  : "Please follow prompts to verify your passkey.\nYou will have to sign up with another method first to register a passkey for your account.";
              case "success":
                return "You've successfully logged in with your passkey.";
              case "error":
                if (a instanceof t.b) {
                  if (a.privyErrorCode === t.a.CANNOT_LINK_MORE_OF_TYPE)
                    return "Cannot link more passkeys to account.";
                  if (a.privyErrorCode === t.a.PASSKEY_NOT_ALLOWED)
                    return "Passkey request timed out or rejected by user.\nYou will have to sign up with another method first to register a passkey for your account.";
                }
                return "An unknown error occurred.\nYou will have to sign up with another method first to register a passkey for your account.";
            }
          })(),
        }),
        icon: o.f,
        iconVariant: "loading",
        iconLoadingStatus: { success: "success" === r, fail: "error" === r },
        primaryCta:
          "error" === r && l
            ? { label: "Retry", onClick: l }
            : "success" === r
              ? { label: "Continue", disabled: !0 }
              : void 0,
        watermark: !0,
      }),
    p = {
      component: () => {
        let { data: r, setModalData: o, navigate: a } = (0, c.u)(),
          d = (0, l.a)(),
          {
            loginWithPasskey: p,
            signupWithPasskey: u,
            closePrivyModal: h,
            createAnalyticsEvent: g,
          } = (0, n.u)(),
          { user: b, logout: f, ready: y, authenticated: x } = (0, l.u)(),
          { passkeySignupFlow: m } = r?.passkeyAuthModalData ?? {},
          k = l.Q - 500,
          [w, j] = (0, i.useState)("loading"),
          [z, $] = (0, i.useState)(null),
          S = (0, i.useRef)([]),
          C = (r) => {
            S.current = [r, ...S.current];
          };
        (0, i.useEffect)(
          () => () => {
            (S.current.forEach((r) => clearTimeout(r)), (S.current = []));
          },
          [],
        );
        let E = async () => {
          j("loading");
          try {
            (m ? await u() : await p(), j("success"));
          } catch (r) {
            if (r?.privyErrorCode === t.a.USER_DOES_NOT_EXIST)
              return void a("AccountNotFoundScreen");
            if (r?.privyErrorCode === t.a.ALLOWLIST_REJECTED)
              return void a("AllowlistRejectionScreen");
            if (r?.privyErrorCode === t.a.USER_LIMIT_REACHED)
              return void a("UserLimitReachedScreen");
            ($(r), j("error"));
          }
        };
        return (
          (0, i.useEffect)(() => {
            if (y && x && "success" === w && b) {
              if (d?.legal.requireUsersAcceptTerms && !b.hasAcceptedTerms)
                return void C(
                  setTimeout(() => {
                    a("AffirmativeConsentScreen");
                  }, k),
                );
              if (!(0, s.s)(b, d?.embeddedWallets))
                return void C(
                  setTimeout(() => {
                    h({ shouldCallAuthOnSuccess: !0, isSuccess: !0 });
                  }, l.Q),
                );
              C(
                setTimeout(() => {
                  (o({
                    createWallet: {
                      onSuccess: () => {},
                      onFailure: (r) => {
                        (console.error(r),
                          g({
                            eventName:
                              "embedded_wallet_creation_failure_logout",
                            payload: {
                              error: r,
                              screen: "PasskeyStatusScreen",
                            },
                          }),
                          f());
                      },
                      callAuthOnSuccessOnClose: !0,
                    },
                  }),
                    a("EmbeddedWalletOnAccountCreateScreen"));
                }, k),
              );
            }
          }, [y, x, b, w]),
          (0, i.useEffect)(() => {
            E();
          }, []),
          (0, e.jsx)(v, {
            status: w,
            passkeySignupFlow: m,
            error: z,
            onRetry: E,
          })
        );
      },
    },
    u = a.z.span`
  white-space: pre-wrap;
`;
  r.s([
    "PasskeyStatusScreen",
    0,
    p,
    "PasskeyStatusScreenView",
    0,
    v,
    "default",
    0,
    p,
  ]);
};
