// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(352386),
    a = r.i(616800),
    i = r.i(933185),
    l = r.i(565530),
    t = r.i(748117),
    n = r.i(636447),
    c = r.i(203793),
    d = r.i(335341),
    s = r.i(42536);
  (r.i(785373), r.i(768820), r.i(535391), r.i(252494));
  let v = ({ success: r, errorMessage: o, onRetry: a }) => {
      let i = r
        ? "Successfully connected with Telegram"
        : o
          ? o.message
          : "Verifying connection to Telegram";
      return (0, e.jsx)(d.S, {
        title: i,
        subtitle: r
          ? "You're good to go!"
          : o
            ? o.detail
            : "Just a few moments more",
        icon: s.T,
        iconVariant: "loading",
        iconLoadingStatus: { success: r, fail: !!o },
        secondaryCta:
          o?.retryable && a ? { label: "Retry", onClick: a } : void 0,
        watermark: !0,
      });
    },
    p = {
      component: () => {
        let { authenticated: r, logout: d, ready: s, user: p } = (0, i.u)(),
          {
            setModalData: u,
            navigate: h,
            resetNavigation: g,
            data: b,
          } = (0, n.u)(),
          f = (0, i.a)(),
          {
            initLoginWithTelegram: x,
            loginWithTelegram: y,
            updateWallets: m,
            setReadyToTrue: w,
            closePrivyModal: k,
            createAnalyticsEvent: j,
            getAuthMeta: z,
          } = (0, t.u)(),
          [$, S] = (0, o.useState)(!1),
          [C, T] = (0, o.useState)(void 0),
          A = (0, a.a)();
        async function M() {
          try {
            let e = await (async function () {
              let e;
              if (!r) {
                if (A.enabled && "error" === A.status)
                  throw new a.C(A.error, null, l.a.CAPTCHA_FAILURE);
                return (
                  A.enabled &&
                    "success" !== A.status &&
                    (A.execute(), (e = await A.waitForResult())),
                  e
                );
              }
            })();
            (await y({ captchaToken: e }), S(!0), w(!0));
          } catch (o) {
            if (o?.privyErrorCode === l.a.ALLOWLIST_REJECTED)
              return (T(void 0), g(), void h("AllowlistRejectionScreen"));
            if (o?.privyErrorCode === l.a.USER_LIMIT_REACHED)
              return (
                console.error(new l.j(o).toString()),
                T(void 0),
                g(),
                void h("UserLimitReachedScreen")
              );
            if (o?.privyErrorCode === l.a.USER_DOES_NOT_EXIST)
              return (T(void 0), g(), void h("AccountNotFoundScreen"));
            if (
              o?.privyErrorCode === l.a.ACCOUNT_TRANSFER_REQUIRED &&
              o.data?.data?.nonce
            )
              return (
                T(void 0),
                g(),
                u({
                  accountTransfer: {
                    nonce: o.data?.data?.nonce,
                    account: o.data?.data?.subject,
                    telegramAuthResult: z()?.telegramAuthResult,
                    telegramWebAppData: z()?.telegramWebAppData,
                    displayName: o.data?.data?.account?.displayName,
                    linkMethod: "telegram",
                    embeddedWalletAddress:
                      o.data?.data?.otherUser?.embeddedWalletAddress,
                  },
                }),
                void h("LinkConflictScreen")
              );
            let { retryable: r, detail: e } = (0, a.l)(o);
            T({ retryable: r, detail: e, message: "Authentication failed" });
          }
        }
        return (
          (0, o.useEffect)(() => {
            M();
          }, []),
          (0, o.useEffect)(() => {
            if (!(s && r && $ && p)) return;
            if (f?.legal.requireUsersAcceptTerms && !p.hasAcceptedTerms) {
              let r = setTimeout(() => {
                h("AffirmativeConsentScreen");
              }, i.Q);
              return () => clearTimeout(r);
            }
            if ((0, c.s)(p, f.embeddedWallets)) {
              let r = setTimeout(() => {
                (u({
                  createWallet: {
                    onSuccess: () => {},
                    onFailure: (r) => {
                      (console.error(r),
                        j({
                          eventName: "embedded_wallet_creation_failure_logout",
                          payload: {
                            error: r,
                            provider: "telegram",
                            screen: "TelegramAuthScreen",
                          },
                        }),
                        d());
                    },
                    callAuthOnSuccessOnClose: !0,
                  },
                }),
                  h("EmbeddedWalletOnAccountCreateScreen"));
              }, i.Q);
              return () => clearTimeout(r);
            }
            m();
            let e = setTimeout(
              () => k({ shouldCallAuthOnSuccess: !0, isSuccess: !0 }),
              i.Q,
            );
            return () => clearTimeout(e);
          }, [s, r, $, p]),
          (0, e.jsx)(v, {
            success: $,
            errorMessage: C,
            onRetry: C?.retryable
              ? async () => {
                  try {
                    (T(void 0),
                      b?.telegramAuthModalData?.seamlessAuth ||
                        (await x(void 0, b?.login?.disableSignup)),
                      await M());
                  } catch (o) {
                    let { retryable: r, detail: e } = (0, a.l)(o);
                    T({
                      retryable: r,
                      detail: e,
                      message: "Authentication failed",
                    });
                  }
                }
              : void 0,
          })
        );
      },
      isCaptchaRequired: !0,
      isShownBeforeReady: !0,
    };
  r.s([
    "TelegramAuthScreen",
    0,
    p,
    "TelegramAuthScreenView",
    0,
    v,
    "default",
    0,
    p,
  ]);
};
