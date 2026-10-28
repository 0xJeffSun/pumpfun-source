// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(494780),
    i = r.i(352386),
    a = r.i(689391),
    t = r.i(933185),
    n = r.i(995040),
    l = r.i(727472),
    c = r.i(747006),
    d = r.i(616800),
    s = r.i(565530),
    v = r.i(748117),
    p = r.i(636447),
    u = r.i(612269);
  (r.i(252494), r.i(785373), r.i(768820), r.i(535391));
  let h = {
      component: () => {
        let [r, a] = (0, i.useState)(!0),
          { authenticated: n, user: h } = (0, t.u)(),
          {
            walletProxy: b,
            closePrivyModal: y,
            createAnalyticsEvent: m,
            client: w,
          } = (0, v.u)(),
          {
            navigate: k,
            data: j,
            onUserCloseViaDialogOrKeybindRef: z,
          } = (0, p.u)(),
          [$, C] = (0, i.useState)(void 0),
          [M, S] = (0, i.useState)(""),
          [E, Z] = (0, i.useState)(!1),
          {
            entropyId: A,
            entropyIdVerifier: B,
            onCompleteNavigateTo: L,
            onSuccess: V,
            onFailure: T,
          } = j.recoverWallet,
          R = (r = "User exited before their wallet could be recovered") => {
            (y({ shouldCallAuthOnSuccess: !1 }),
              T("string" == typeof r ? new s.k(r) : r));
          };
        return (
          (z.current = R),
          (0, i.useEffect)(() => {
            if (!n)
              return R(
                "User must be authenticated and have a Privy wallet before it can be recovered",
              );
          }, [n]),
          (0, e.jsxs)(u.S, {
            children: [
              (0, e.jsx)(u.S.Header, {
                icon: o.f,
                title: "Enter your password",
                subtitle:
                  "Please provision your account on this new device. To continue, enter your recovery password.",
                showClose: !0,
                onClose: R,
              }),
              (0, e.jsx)(u.S.Body, {
                children: (0, e.jsx)(g, {
                  children: (0, e.jsxs)("div", {
                    children: [
                      (0, e.jsxs)(c.P, {
                        children: [
                          (0, e.jsx)(c.a, {
                            type: r ? "password" : "text",
                            onChange: (r) => {
                              var e;
                              (e = r.target.value) && C(e);
                            },
                            disabled: E,
                            style: { paddingRight: "2.3rem" },
                          }),
                          (0, e.jsx)(c.I, {
                            style: { right: "0.75rem" },
                            children: r
                              ? (0, e.jsx)(c.H, { onClick: () => a(!1) })
                              : (0, e.jsx)(c.S, { onClick: () => a(!0) }),
                          }),
                        ],
                      }),
                      !!M && (0, e.jsx)(f, { children: M }),
                    ],
                  }),
                }),
              }),
              (0, e.jsxs)(u.S.Footer, {
                children: [
                  (0, e.jsx)(u.S.HelpText, {
                    children: (0, e.jsxs)(l.S, {
                      children: [
                        (0, e.jsx)("h4", {
                          children: "Why is this necessary?",
                        }),
                        (0, e.jsx)("p", {
                          children:
                            "You previously set a password for this wallet. This helps ensure only you can access it",
                        }),
                      ],
                    }),
                  }),
                  (0, e.jsx)(u.S.Actions, {
                    children: (0, e.jsx)(x, {
                      loading: E || !b,
                      disabled: !$,
                      onClick: async () => {
                        Z(!0);
                        let r = await w.getAccessToken(),
                          e = (0, t.k)(h, A);
                        if (!r || !e || null === $)
                          return R(
                            "User must be authenticated and have a Privy wallet before it can be recovered",
                          );
                        try {
                          (m({
                            eventName: "embedded_wallet_recovery_started",
                            payload: { walletAddress: e.address },
                          }),
                            await b?.recover({
                              accessToken: r,
                              entropyId: A,
                              entropyIdVerifier: B,
                              recoveryPassword: $,
                            }),
                            S(""),
                            L ? k(L) : y({ shouldCallAuthOnSuccess: !1 }),
                            V?.(e),
                            m({
                              eventName: "embedded_wallet_recovery_completed",
                              payload: { walletAddress: e.address },
                            }));
                        } catch (r) {
                          (0, d.m)(r)
                            ? S("Invalid recovery password, please try again.")
                            : S("An error has occurred, please try again.");
                        } finally {
                          Z(!1);
                        }
                      },
                      $hideAnimations: !A && E,
                      children: "Recover your account",
                    }),
                  }),
                  (0, e.jsx)(u.S.Watermark, {}),
                ],
              }),
            ],
          })
        );
      },
    },
    g = a.z.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,
    f = a.z.div`
  line-height: 20px;
  height: 20px;
  font-size: 13px;
  color: var(--privy-color-error);
  text-align: left;
  margin-top: 0.5rem;
`,
    x = (0, a.z)(n.P)`
  ${({ $hideAnimations: r }) =>
    r &&
    a.m`
      && {
        /* Remove animations because the recoverWallet task on the iframe partially
           blocks the renderer, so the animation stutters and doesn't look good */
        transition: none;
      }
    `}
`;
  r.s(["PasswordRecoveryScreen", 0, h, "default", 0, h]);
};
