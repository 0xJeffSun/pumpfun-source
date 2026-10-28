// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(352386),
    a = r.i(933185),
    i = r.i(827432),
    l = r.i(565530),
    n = r.i(748117),
    t = r.i(636447),
    c = r.i(315430),
    d = r.i(203793),
    s = r.i(335341);
  (r.i(252494), r.i(785373), r.i(768820), r.i(535391));
  let v = ({ providerApp: r, success: a, error: i, onClose: l }) => {
      let { title: n, subtitle: t } = (0, o.useMemo)(
        () =>
          a
            ? {
                title: `Successfully connected with ${r.name}`,
                subtitle: "You're good to go!",
              }
            : i
              ? { title: "Authentication failed", subtitle: i.message }
              : {
                  title: `Connecting to ${r.name}`,
                  subtitle: `Please check the pop-up from ${r.name} to continue`,
                },
        [a, i, r.name],
      );
      return (0, e.jsx)(s.S, {
        title: n,
        subtitle: t,
        icon: r.logoUrl,
        iconVariant: "loading",
        iconLoadingStatus: { success: a, fail: !!i },
        onBack: l,
        watermark: !0,
      });
    },
    p = {
      component: () => {
        let r = (0, a.a)(),
          {
            data: s,
            navigate: p,
            setModalData: u,
            onUserCloseViaDialogOrKeybindRef: h,
          } = (0, t.u)(),
          {
            crossAppAuthFlow: g,
            updateWallets: b,
            closePrivyModal: f,
            createAnalyticsEvent: x,
          } = (0, n.u)(),
          { logout: y } = (0, c.f)(),
          [m, k] = (0, o.useState)({}),
          w = s?.crossAppAuth,
          j = new l.P(
            `There was an issue connecting your ${w?.name} account. Please try again.`,
          ),
          z = new i.R(async (r) => {
            if (w?.popup)
              try {
                let e = await g({
                  appId: r,
                  popup: w.popup,
                  action: w.action,
                  disableSignup: w.disableSignup,
                });
                k({ data: e });
              } catch (r) {
                if (r instanceof l.P) k({ error: r });
                else if (r instanceof l.c) {
                  if (
                    r.privyErrorCode === l.a.ACCOUNT_TRANSFER_REQUIRED &&
                    r.data?.data?.nonce
                  )
                    return (
                      u({
                        accountTransfer: {
                          nonce: r.data?.data?.nonce,
                          account: r.data?.data?.subject,
                          displayName: r.data?.data?.account?.displayName,
                          linkMethod: `privy:${w.appId}`,
                          embeddedWalletAddress:
                            r.data?.data?.otherUser?.embeddedWalletAddress,
                          oAuthUserInfo: r.data?.data?.otherUser?.oAuthUserInfo,
                        },
                      }),
                      void p("LinkConflictScreen")
                    );
                  (w.popup && w.popup.close(), k({ error: j }));
                } else k({ error: j });
              }
            else k({ error: j });
          }),
          $ = () => {
            (m.data &&
              (b(),
              w?.onSuccess(m.data),
              f({ shouldCallAuthOnSuccess: !0, isSuccess: !0 })),
              w?.onError(m.error ?? new l.P("User canceled flow")),
              f({ shouldCallAuthOnSuccess: !1, isSuccess: !1 }));
          };
        return (
          (h.current = $),
          (0, o.useEffect)(() => {
            w?.appId?.length && z.execute(w.appId);
          }, [w?.appId]),
          (0, o.useEffect)(() => {
            if (!m.data) return;
            let e = m.data;
            if (r.legal.requireUsersAcceptTerms && !e.hasAcceptedTerms) {
              let r = setTimeout(() => {
                p("AffirmativeConsentScreen");
              }, a.Q);
              return () => clearTimeout(r);
            }
            if ((0, d.s)(e, r.embeddedWallets)) {
              let r = setTimeout(() => {
                (u({
                  createWallet: {
                    onSuccess: () => {},
                    onFailure: (r) => {
                      (console.error(r),
                        x({
                          eventName: "embedded_wallet_creation_failure_logout",
                          payload: {
                            error: r,
                            provider: `privy:${w?.appId}`,
                            screen: "CrossAppAuthScreen",
                          },
                        }),
                        y());
                    },
                    callAuthOnSuccessOnClose: !0,
                  },
                }),
                  p("EmbeddedWalletOnAccountCreateScreen"));
              }, a.Q);
              return () => clearTimeout(r);
            }
            let o = setTimeout($, a.Q);
            return () => clearTimeout(o);
          }, [m.data]),
          w?.appId
            ? (0, e.jsx)(v, {
                providerApp: {
                  id: w?.appId,
                  logoUrl: w?.logoUrl,
                  name: w?.name,
                },
                success: !!m.data,
                error: m.error,
                onClose: $,
              })
            : (console.warn("Missing data for Screen"), null)
        );
      },
      isShownBeforeReady: !0,
    };
  r.s([
    "CrossAppAuthScreen",
    0,
    p,
    "CrossAppAuthScreenView",
    0,
    v,
    "default",
    0,
    p,
  ]);
};
