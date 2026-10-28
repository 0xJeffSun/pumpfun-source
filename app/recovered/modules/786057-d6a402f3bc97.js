// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486);
  let o = (0, r.i(78048).f)("file-check", [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6",
      },
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    ["path", { d: "m9 15 2 2 4-4", key: "1grp1n" }],
  ]);
  var i = r.i(161541);
  r.i(352386);
  var a = r.i(689391),
    l = r.i(995040),
    n = r.i(933185),
    t = r.i(748117),
    c = r.i(636447),
    d = r.i(203793),
    s = r.i(335341);
  (r.i(252494), r.i(785373), r.i(768820), r.i(535391));
  let v = {
      component: () => {
        let { user: r, logout: o } = (0, n.u)(),
          {
            onUserCloseViaDialogOrKeybindRef: i,
            setModalData: a,
            navigate: l,
          } = (0, c.u)(),
          s = (0, n.a)(),
          {
            acceptTerms: v,
            closePrivyModal: u,
            createAnalyticsEvent: h,
          } = (0, t.u)(),
          g = (r) => {
            (r?.preventDefault(), u({ shouldCallAuthOnSuccess: !1 }), o());
          };
        return (
          (i.current = g),
          (0, e.jsx)(p, {
            termsAndConditionsUrl: s?.legal.termsAndConditionsUrl,
            privacyPolicyUrl: s?.legal.privacyPolicyUrl,
            onAccept: async (e) => {
              (e?.preventDefault(),
                await v(),
                r && (0, d.s)(r, s.embeddedWallets)
                  ? (a({
                      createWallet: {
                        onSuccess: () => {},
                        onFailure: (r) => {
                          (console.error(r),
                            h({
                              eventName:
                                "embedded_wallet_creation_failure_logout",
                              payload: {
                                error: r,
                                screen: "AffirmativeConsentScreen",
                              },
                            }),
                            o());
                        },
                        callAuthOnSuccessOnClose: !0,
                      },
                    }),
                    l("EmbeddedWalletOnAccountCreateScreen"))
                  : u());
            },
            onDecline: g,
          })
        );
      },
    },
    p = ({
      termsAndConditionsUrl: r,
      privacyPolicyUrl: a,
      onAccept: n,
      onDecline: t,
      title: c = "One last step",
      subtitle: d = "By signing up, you agree to our terms and privacy policy.",
    }) =>
      (0, e.jsx)(s.S, {
        title: c,
        subtitle: d,
        icon: o,
        primaryCta: { label: "Accept", onClick: n },
        secondaryCta: { label: "No thanks", onClick: t },
        watermark: !0,
        children:
          (r || a) &&
          (0, e.jsxs)(u, {
            children: [
              r &&
                (0, e.jsxs)(l.B, {
                  variant: "muted",
                  href: r,
                  target: "_blank",
                  size: "lg",
                  style: { justifyContent: "space-between" },
                  as: "a",
                  children: [
                    "View Terms",
                    (0, e.jsx)(i.f, {
                      width: 16,
                      height: 16,
                      strokeWidth: 2.25,
                    }),
                  ],
                }),
              a &&
                (0, e.jsxs)(l.B, {
                  variant: "muted",
                  href: a,
                  target: "_blank",
                  size: "lg",
                  style: { justifyContent: "space-between" },
                  as: "a",
                  children: [
                    "View Privacy Policy",
                    (0, e.jsx)(i.f, {
                      width: 16,
                      height: 16,
                      strokeWidth: 2.25,
                    }),
                  ],
                }),
            ],
          }),
      }),
    u = a.z.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: var(--screen-space);
`;
  r.s(
    [
      "AffirmativeConsentScreen",
      0,
      v,
      "AffirmativeConsentScreenView",
      0,
      p,
      "default",
      0,
      v,
    ],
    786057,
  );
};
