// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(352386),
    i = r.i(636447),
    a = r.i(933185),
    l = r.i(335341);
  r.i(252494);
  let n = ({
      title: r,
      subtitle: o,
      buttonText: i,
      buttonHref: a,
      isLoading: n = !1,
      helpText: t,
      onButtonClick: c,
    }) =>
      (0, e.jsx)(l.S, {
        title: r,
        subtitle: o,
        primaryCta: {
          label: i,
          onClick: () => {
            (a && window.open(a, "_self"), c?.());
          },
          disabled: n,
        },
        helpText: t,
        watermark: !0,
      }),
    t = {
      component: () => {
        let { ready: r } = (0, a.u)(),
          { data: l } = (0, i.u)(),
          [t, c] = (0, o.useState)(!1);
        if (!l?.installWalletModalData) throw Error("Wallet data is missing");
        let {
            walletConfig: d,
            connectOnly: s,
            chainType: v,
          } = l.installWalletModalData,
          p = d.getMobileRedirect({
            useUniversalLink: !t,
            isSolana: "solana" === v,
            connectOnly: s,
          }),
          u = d.name.replace(/ wallet/gi, ""),
          h = {
            title: `Redirecting to ${u} Mobile Wallet`,
            description: `We'll take you to the ${u} Mobile Wallet app to continue your login experience.`,
            footnote: "",
          };
        return (
          r &&
            ((h.description = `For the best experience, we'll automatically log you into the ${u} Mobile Wallet in-app browser.`),
            (h.footnote =
              "You can always return here to login via other methods.")),
          t &&
            ((h.title = "Still here?"),
            (h.description = `You may need to install the ${d.name} mobile app.`),
            (h.footnote = `Once you're done, you can connect with ${d.name} wallet to complete the login.`)),
          (0, e.jsx)(n, {
            title: h.title,
            subtitle: h.description,
            buttonText: t ? "Go to App Store" : "Continue",
            buttonHref: p,
            isLoading: r && !p,
            helpText: h.footnote || void 0,
            onButtonClick: () => {
              setTimeout(() => c(!0), 1e3);
            },
          })
        );
      },
    };
  r.s([
    "WalletInterstitialScreen",
    0,
    t,
    "WalletInterstitialScreenView",
    0,
    n,
    "default",
    0,
    t,
  ]);
};
