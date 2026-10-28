// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(187611);
  let r = {
      google: "Google",
      apple: "Apple",
      email: "Email",
      github: "GitHub",
      twitter: "X",
    },
    i = (e) => r[e.toLowerCase()] ?? e;
  e.s([
    "r",
    0,
    "wallet-login-refusal",
    "c",
    0,
    i,
    "D",
    0,
    (e, r, a) => ({
      title: e("web.wallet_deprecation.notice_title"),
      body:
        "signupBlocked" === r
          ? e("web.wallet_deprecation.signup_blocked")
          : a
            ? e("web.wallet_deprecation.privy_owned", {
                provider: (0, t.T)(i(a), "brand-name"),
              })
            : e("web.wallet_deprecation.privy_owned_generic"),
    }),
  ]);
};
