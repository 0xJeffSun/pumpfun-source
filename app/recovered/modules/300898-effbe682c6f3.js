// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = {
      google: "Google",
      apple: "Apple",
      twitter: "X",
      github: "GitHub",
      email: "Email",
    },
    r = (e) => t[e];
  e.s([
    "t",
    0,
    (e) => {
      if ("embedded" !== e.kind) return;
      let t = e.accounts.find((t) => t.provider === e.provider);
      if (t?.identifier)
        return { value: t.identifier.value, provider: t.provider };
      let r = e.accounts.find((e) => e.identifier?.kind === "email");
      if (r?.identifier)
        return { value: r.identifier.value, provider: r.provider };
    },
    "B",
    0,
    (e) => {
      switch (e.kind) {
        case "none":
          return "";
        case "resolving":
          return "Checking…";
        case "external":
          return e.walletName ?? "External wallet";
        case "embedded":
          return e.provider
            ? `Pump wallet \xb7 ${r(e.provider)}`
            : "Pump wallet";
      }
    },
    "c",
    0,
    r,
    "a",
    0,
    ({
      sessionAddress: e,
      privyReady: t,
      privyAuthenticated: r,
      privyAuthAccounts: n,
      privyChains: i,
      adapterAddress: l,
      adapterName: a,
      adapterIcon: o,
      privySessionActive: s = !1,
      rememberedWalletName: u,
      rememberedProvider: d,
      storageRead: c,
    }) => {
      if (!e) return { kind: "none" };
      if (l && l === e) {
        if (!t || (r && null === n)) return { kind: "resolving" };
        if (!s)
          return {
            kind: "external",
            ...(a ? { walletName: a } : {}),
            ...(o ? { walletIcon: o } : {}),
            connected: !0,
          };
      }
      if (!t) return { kind: "resolving" };
      if (r) {
        let e = n ?? [],
          t = (({ accounts: e, rememberedProvider: t }) =>
            t && e.some((e) => e.provider === t) ? t : e[0]?.provider)({
            accounts: e,
            rememberedProvider: d,
          });
        return {
          kind: "embedded",
          ...(t ? { provider: t } : {}),
          accounts: e,
          chains: i ?? { solana: !1, evm: !1 },
        };
      }
      return c
        ? { kind: "external", ...(u ? { walletName: u } : {}), connected: !1 }
        : { kind: "resolving" };
    },
  ]);
};
