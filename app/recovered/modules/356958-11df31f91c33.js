// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(352386),
    i = r.i(768820),
    a = r.i(689391),
    t = r.i(541021),
    l = r.i(842287),
    n = r.i(594022),
    c = r.i(653327),
    s = r.i(574695),
    d = r.i(995040),
    p = r.i(744894),
    v = r.i(933185),
    u = r.i(565530),
    h = r.i(748117),
    g = r.i(636447),
    f = r.i(203793),
    x = r.i(335341),
    b = r.i(56322);
  (r.i(698870), r.i(252494), r.i(785373), r.i(535391));
  let m = a.z.div`
  width: 100%;
`,
    y = a.z.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem;
  height: 56px;
  background: ${(r) => (r.$disabled ? "var(--privy-color-background-2)" : "var(--privy-color-background)")};
  border: 1px solid var(--privy-color-foreground-4);
  border-radius: var(--privy-border-radius-md);

  &:hover {
    border-color: ${(r) => (r.$disabled ? "var(--privy-color-foreground-4)" : "var(--privy-color-foreground-3)")};
  }
`,
    w = a.z.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
`,
    j = a.z.span`
  display: block;
  font-size: 16px;
  line-height: 24px;
  color: ${(r) => (r.$disabled ? "var(--privy-color-foreground-2)" : "var(--privy-color-foreground)")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* Single-line truncation: as a flex item this would otherwise be floored at its
     min-content width, so min-width: 0 lets it shrink and the ellipsis land at the
     container edge. */
  min-width: 0;

  @media (min-width: 441px) {
    font-size: 14px;
    line-height: 20px;
  }
`,
    k = (0, a.z)(j)`
  color: var(--privy-color-foreground-3);
  font-style: italic;
`,
    z = (0, a.z)(p.L)`
  margin-bottom: 0.5rem;
`,
    C = (0, a.z)(d.S)`
  && {
    gap: 0.375rem;
    font-size: 14px;
    flex-shrink: 0;
  }
`,
    $ = ({
      value: r,
      title: i,
      placeholder: a,
      className: t,
      showCopyButton: l = !0,
      truncate: n,
      maxLength: d = 40,
      disabled: p = !1,
    }) => {
      let [v, u] = (0, o.useState)(!1),
        h =
          n && r
            ? ((r, e, o) => {
                if ((r = r.startsWith("https://") ? r.slice(8) : r).length <= o)
                  return r;
                if ("middle" === e) {
                  let e = Math.ceil(o / 2) - 2,
                    i = Math.floor(o / 2) - 1;
                  return `${r.slice(0, e)}...${r.slice(-i)}`;
                }
                return `${r.slice(0, o - 3)}...`;
              })(r, n, d)
            : r;
      return (
        (0, o.useEffect)(() => {
          if (v) {
            let r = setTimeout(() => u(!1), 3e3);
            return () => clearTimeout(r);
          }
        }, [v]),
        (0, e.jsxs)(m, {
          className: t,
          children: [
            i && (0, e.jsx)(z, { children: i }),
            (0, e.jsxs)(y, {
              $disabled: p,
              children: [
                (0, e.jsx)(w, {
                  children: r
                    ? (0, e.jsx)(j, { $disabled: p, title: r, children: h })
                    : (0, e.jsx)(k, {
                        $disabled: p,
                        children: a || "No value",
                      }),
                }),
                l &&
                  r &&
                  (0, e.jsx)(C, {
                    onClick: function (e) {
                      (e.stopPropagation(),
                        navigator.clipboard
                          .writeText(r)
                          .then(() => u(!0))
                          .catch(console.error));
                    },
                    size: "sm",
                    children: (0, e.jsxs)(
                      e.Fragment,
                      v
                        ? {
                            children: ["Copied", (0, e.jsx)(c.f, { size: 14 })],
                          }
                        : { children: ["Copy", (0, e.jsx)(s.f, { size: 14 })] },
                    ),
                  }),
              ],
            }),
          ],
        })
      );
    },
    S = ({
      connectUri: r,
      loading: o,
      success: a,
      errorMessage: c,
      onBack: s,
      onClose: d,
      onOpenFarcaster: p,
    }) =>
      (0, e.jsx)(
        x.S,
        i.isMobile || o
          ? i.isIOS
            ? {
                title: c ? c.message : "Sign in with Farcaster",
                subtitle: c
                  ? c.detail
                  : "To sign in with Farcaster, please open the Farcaster app.",
                icon: b.F,
                iconVariant: "loading",
                iconLoadingStatus: { success: a, fail: !!c },
                primaryCta:
                  r && p ? { label: "Open Farcaster app", onClick: p } : void 0,
                onBack: s,
                onClose: d,
                watermark: !0,
              }
            : {
                title: c ? c.message : "Signing in with Farcaster",
                subtitle: c ? c.detail : "This should only take a moment",
                icon: b.F,
                iconVariant: "loading",
                iconLoadingStatus: { success: a, fail: !!c },
                onBack: s,
                onClose: d,
                watermark: !0,
                children:
                  r &&
                  i.isMobile &&
                  (0, e.jsx)(F, {
                    children: (0, e.jsx)(l.O, {
                      text: "Take me to Farcaster",
                      url: r,
                      color: "#8a63d2",
                    }),
                  }),
              }
          : {
              title: "Sign in with Farcaster",
              subtitle: "Scan with your phone's camera to continue.",
              onBack: s,
              onClose: d,
              watermark: !0,
              children: (0, e.jsxs)(T, {
                children: [
                  (0, e.jsx)(_, {
                    children: r
                      ? (0, e.jsx)(n.Q, {
                          url: r,
                          size: 275,
                          squareLogoElement: b.F,
                        })
                      : (0, e.jsx)(L, { children: (0, e.jsx)(t.L, {}) }),
                  }),
                  (0, e.jsxs)(M, {
                    children: [
                      (0, e.jsx)(A, {
                        children:
                          "Or copy this link and paste it into a phone browser to open the Farcaster app.",
                      }),
                      r &&
                        (0, e.jsx)($, {
                          value: r,
                          truncate: "end",
                          maxLength: 30,
                          showCopyButton: !0,
                          disabled: !0,
                        }),
                    ],
                  }),
                ],
              }),
            },
      ),
    E = {
      component: () => {
        let { authenticated: r, logout: i, ready: a, user: t } = (0, v.u)(),
          {
            lastScreen: l,
            navigate: n,
            navigateBack: c,
            setModalData: s,
          } = (0, g.u)(),
          d = (0, v.a)(),
          {
            getAuthFlow: p,
            loginWithFarcaster: x,
            closePrivyModal: b,
            createAnalyticsEvent: m,
          } = (0, h.u)(),
          [y, w] = (0, o.useState)(void 0),
          [j, k] = (0, o.useState)(!1),
          [z, C] = (0, o.useState)(!1),
          $ = (0, o.useRef)([]),
          E = p(),
          F = E?.meta.connectUri;
        return (
          (0, o.useEffect)(() => {
            let r = Date.now(),
              e = setInterval(async () => {
                let o = await E.pollForReady.execute(),
                  i = Date.now() - r;
                if (o) {
                  (clearInterval(e), k(!0));
                  try {
                    (await x(), C(!0));
                  } catch (e) {
                    let r = { retryable: !1, message: "Authentication failed" };
                    if (e?.privyErrorCode === u.a.ALLOWLIST_REJECTED)
                      return void n("AllowlistRejectionScreen");
                    if (e?.privyErrorCode === u.a.USER_LIMIT_REACHED)
                      return (
                        console.error(new u.j(e).toString()),
                        void n("UserLimitReachedScreen")
                      );
                    if (e?.privyErrorCode === u.a.USER_DOES_NOT_EXIST)
                      return void n("AccountNotFoundScreen");
                    if (e?.privyErrorCode === u.a.LINKED_TO_ANOTHER_USER)
                      r.detail =
                        e.message ??
                        "This account has already been linked to another user.";
                    else {
                      if (
                        e?.privyErrorCode === u.a.ACCOUNT_TRANSFER_REQUIRED &&
                        e.data?.data?.nonce
                      )
                        return (
                          s({
                            accountTransfer: {
                              nonce: e.data?.data?.nonce,
                              account: e.data?.data?.subject,
                              displayName: e.data?.data?.account?.displayName,
                              linkMethod: "farcaster",
                              embeddedWalletAddress:
                                e.data?.data?.otherUser?.embeddedWalletAddress,
                              farcasterEmbeddedAddress:
                                e.data?.data?.otherUser
                                  ?.farcasterEmbeddedAddress,
                            },
                          }),
                          void n("LinkConflictScreen")
                        );
                      e?.privyErrorCode === u.a.INVALID_CREDENTIALS
                        ? ((r.retryable = !0),
                          (r.detail = "Something went wrong. Try again."))
                        : e?.privyErrorCode === u.a.TOO_MANY_REQUESTS &&
                          (r.detail =
                            "Too many requests. Please wait before trying again.");
                    }
                    w(r);
                  }
                } else
                  i > 12e4 &&
                    (clearInterval(e),
                    w({
                      retryable: !0,
                      message: "Authentication failed",
                      detail: "The request timed out. Try again.",
                    }));
              }, 2e3);
            return () => {
              (clearInterval(e), $.current.forEach((r) => clearTimeout(r)));
            };
          }, []),
          (0, o.useEffect)(() => {
            if (a && r && z && t) {
              if (d?.legal.requireUsersAcceptTerms && !t.hasAcceptedTerms) {
                let r = setTimeout(() => {
                  n("AffirmativeConsentScreen");
                }, v.Q);
                return () => clearTimeout(r);
              }
              z &&
                ((0, f.s)(t, d.embeddedWallets)
                  ? $.current.push(
                      setTimeout(() => {
                        (s({
                          createWallet: {
                            onSuccess: () => {},
                            onFailure: (r) => {
                              (console.error(r),
                                m({
                                  eventName:
                                    "embedded_wallet_creation_failure_logout",
                                  payload: {
                                    error: r,
                                    screen: "FarcasterConnectStatusScreen",
                                  },
                                }),
                                i());
                            },
                            callAuthOnSuccessOnClose: !0,
                          },
                        }),
                          n("EmbeddedWalletOnAccountCreateScreen"));
                      }, v.Q),
                    )
                  : $.current.push(
                      setTimeout(
                        () => b({ shouldCallAuthOnSuccess: !0, isSuccess: !0 }),
                        v.Q,
                      ),
                    ));
            }
          }, [z, a, r, t]),
          (0, e.jsx)(S, {
            connectUri: F,
            loading: j,
            success: z,
            errorMessage: y,
            onBack: l ? c : void 0,
            onClose: b,
            onOpenFarcaster: () => {
              F && (window.location.href = F);
            },
          })
        );
      },
    },
    F = a.z.div`
  margin-top: 24px;
`,
    T = a.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,
    _ = a.z.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 275px;
`,
    M = a.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`,
    A = a.z.div`
  font-size: 0.875rem;
  text-align: center;
  color: var(--privy-color-foreground-2);
`,
    L = a.z.div`
  position: relative;
  width: 82px;
  height: 82px;
`;
  r.s([
    "FarcasterConnectStatusScreen",
    0,
    E,
    "FarcasterConnectStatusView",
    0,
    S,
    "default",
    0,
    E,
  ]);
};
