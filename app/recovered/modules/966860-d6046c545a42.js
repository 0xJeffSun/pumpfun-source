// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(352386),
    i = r.i(933185),
    t = r.i(682618),
    a = r.i(201338),
    l = r.i(349030),
    n = r.i(42536),
    c = r.i(565530),
    s = r.i(748117),
    d = r.i(636447),
    v = r.i(203793),
    h = r.i(335341),
    g = r.i(898260),
    p = r.i(616800);
  (r.i(252494), r.i(785373), r.i(768820), r.i(535391));
  let u = ({ style: r }) =>
      (0, e.jsx)(a.f, { style: { color: "var(--privy-color-error)", ...r } }),
    f = {
      google: { name: "Google", component: t.G },
      discord: { name: "Discord", component: t.D },
      github: { name: "Github", component: t.b },
      linkedin: { name: "LinkedIn", component: t.L },
      twitter: { name: "Twitter", component: t.a },
      spotify: { name: "Spotify", component: t.S },
      instagram: { name: "Instagram", component: t.I },
      tiktok: { name: "Tiktok", component: t.T },
      line: { name: "LINE", component: l.L },
      twitch: { name: "Twitch", component: l.T },
      apple: { name: "Apple", component: t.A },
      telegram: { name: "Telegram", component: n.T },
    },
    x = ({ iconUrl: r, ...e }) =>
      o.default.createElement(
        "svg",
        {
          width: "33",
          height: "32",
          viewBox: "0 0 33 32",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          ...e,
        },
        o.default.createElement(
          "foreignObject",
          { x: "2", y: "2", width: "29", height: "28" },
          o.default.createElement("img", {
            src: r,
            width: "29",
            height: "28",
            style: {
              display: "block",
              objectFit: "contain",
              borderRadius: "4px",
            },
            alt: "Provider icon",
          }),
        ),
      ),
    A = (r, e) => {
      if (r in f) return f[r];
      if ((0, i.i)(r) && e) {
        let i = e.find((e) => e.provider === r);
        if (i)
          return {
            name: i.provider_display_name,
            component: (r) =>
              o.default.createElement(x, {
                ...r,
                iconUrl: i.provider_icon_url,
              }),
          };
      }
      return { name: "Unknown", component: u };
    },
    b = ({
      providerName: r,
      ProviderLogo: o,
      success: i,
      errorMessage: t,
      onRetry: a,
    }) => {
      let l = i
        ? `Successfully connected with ${r}`
        : t
          ? t.message
          : `Verifying connection to ${r}`;
      return (0, e.jsx)(h.S, {
        title: l,
        subtitle: i
          ? "You're good to go!"
          : t
            ? t.detail
            : "Just a few moments more",
        icon: o,
        iconVariant: "loading",
        iconLoadingStatus: { success: i, fail: !!t },
        secondaryCta:
          t?.retryable && a ? { label: "Retry", onClick: a } : void 0,
        watermark: !0,
      });
    },
    m = {
      component: () => {
        let { authenticated: r, logout: t, ready: a, user: l } = (0, i.u)(),
          { setModalData: n, navigate: h, resetNavigation: u } = (0, d.u)(),
          f = (0, i.a)(),
          {
            getAuthMeta: x,
            initLoginWithOAuth: m,
            loginWithOAuth: C,
            updateWallets: w,
            setReadyToTrue: y,
            closePrivyModal: j,
            createAnalyticsEvent: k,
          } = (0, s.u)(),
          [z, E] = (0, o.useState)(!1),
          [B, M] = (0, o.useState)(void 0),
          S = x()?.provider || "google",
          { name: L, component: H } = A(S, f.customOAuthProviders);
        return (
          (0, o.useEffect)(() => {
            C(S)
              .then(() => {
                (E(!0), y(!0));
              })
              .catch((r) => {
                if ((y(!1), r?.privyErrorCode === c.a.ALLOWLIST_REJECTED))
                  return (M(void 0), u(), void h("AllowlistRejectionScreen"));
                if (r?.privyErrorCode === c.a.USER_LIMIT_REACHED)
                  return (
                    console.error(new c.j(r).toString()),
                    M(void 0),
                    u(),
                    void h("UserLimitReachedScreen")
                  );
                if (r?.privyErrorCode === c.a.USER_DOES_NOT_EXIST)
                  return (M(void 0), u(), void h("AccountNotFoundScreen"));
                if (
                  r?.privyErrorCode === c.a.ACCOUNT_TRANSFER_REQUIRED &&
                  r.data?.data?.nonce
                )
                  return (
                    M(void 0),
                    u(),
                    n({
                      accountTransfer: {
                        nonce: r.data?.data?.nonce,
                        account: r.data?.data?.subject,
                        displayName: r.data?.data?.account?.displayName,
                        linkMethod: x()?.provider,
                        embeddedWalletAddress:
                          r.data?.data?.otherUser?.embeddedWalletAddress,
                        oAuthUserInfo: r.data?.data?.otherUser?.oAuthUserInfo,
                      },
                    }),
                    void h("LinkConflictScreen")
                  );
                let { retryable: e, detail: o } = (function (r, e, o) {
                  let i = { detail: "", retryable: !1 },
                    t = (0, g.e)(e);
                  if (
                    (r?.privyErrorCode === c.a.LINKED_TO_ANOTHER_USER &&
                      (i.detail =
                        "This account has already been linked to another user."),
                    r?.privyErrorCode === c.a.INVALID_CREDENTIALS &&
                      ((i.retryable = !0),
                      (i.detail = "Something went wrong. Try again.")),
                    r.privyErrorCode === c.a.OAUTH_USER_DENIED &&
                      ((i.detail = `Retry and check ${t} to finish connecting your account.`),
                      (i.retryable = !0)),
                    r?.privyErrorCode === c.a.TOO_MANY_REQUESTS &&
                      (i.detail =
                        "Too many requests. Please wait before trying again."),
                    r?.privyErrorCode === c.a.TOO_MANY_REQUESTS &&
                      r.message.includes("provider rate limit"))
                  ) {
                    let r = A(e, o).name;
                    i.detail = `Request limit reached for ${r}. Please wait a moment and try again.`;
                  }
                  if (r?.privyErrorCode === c.a.OAUTH_ACCOUNT_SUSPENDED) {
                    let r = A(e, o).name;
                    i.detail = `Your ${r} account is suspended. Please try another login method.`;
                  }
                  return (
                    r?.privyErrorCode === c.a.CANNOT_LINK_MORE_OF_TYPE &&
                      (i.detail =
                        "You cannot authorize more than one account for this user."),
                    r?.privyErrorCode === c.a.OAUTH_UNEXPECTED &&
                      e.startsWith("privy:") &&
                      (i.detail = "Something went wrong. Please try again."),
                    i
                  );
                })(r, S, f.customOAuthProviders);
                M({
                  retryable: e,
                  detail: o,
                  message: "Authentication failed",
                });
              })
              .finally(() => {
                (0, p.k)();
              });
          }, [L, S]),
          (0, o.useEffect)(() => {
            if (a && r && z && l) {
              if (f?.legal.requireUsersAcceptTerms && !l.hasAcceptedTerms) {
                let r = setTimeout(() => {
                  h("AffirmativeConsentScreen");
                }, i.Q);
                return () => clearTimeout(r);
              }
              if ((0, v.s)(l, f.embeddedWallets)) {
                let r = setTimeout(() => {
                  (n({
                    createWallet: {
                      onSuccess: () => {},
                      onFailure: (r) => {
                        (console.error(r),
                          k({
                            eventName:
                              "embedded_wallet_creation_failure_logout",
                            payload: {
                              error: r,
                              provider: S,
                              screen: "OAuthStatusScreen",
                            },
                          }),
                          t());
                      },
                      callAuthOnSuccessOnClose: !0,
                    },
                  }),
                    h("EmbeddedWalletOnAccountCreateScreen"));
                }, i.Q);
                return () => clearTimeout(r);
              }
              {
                let r = setTimeout(
                  () => j({ shouldCallAuthOnSuccess: !0, isSuccess: !0 }),
                  i.Q,
                );
                return (w(), () => clearTimeout(r));
              }
            }
          }, [a, r, z, l]),
          (0, e.jsx)(b, {
            providerName: L,
            ProviderLogo: H,
            success: z,
            errorMessage: B,
            onRetry: B?.retryable
              ? () => {
                  ((0, p.k)(), m(S), M(void 0));
                }
              : void 0,
          })
        );
      },
      isShownBeforeReady: !0,
    };
  r.s([
    "OAuthStatusScreen",
    0,
    m,
    "OAuthStatusScreenView",
    0,
    b,
    "default",
    0,
    m,
  ]);
};
