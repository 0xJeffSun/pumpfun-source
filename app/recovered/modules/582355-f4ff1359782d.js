// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(78436),
    n = e.i(748117),
    a = e.i(565530),
    i = e.i(933185);
  let o = (e, { chainType: t, walletIndex: r } = {}) =>
      e?.linkedAccounts.filter(
        (e) =>
          "wallet" === e.type &&
          "privy" === e.walletClientType &&
          (void 0 === r || e.walletIndex === r) &&
          (void 0 === t || e.chainType === t),
      ) ?? [],
    s = (0, r.$)(() => ({
      user: null,
      authenticated: !1,
      hasResolvedInitialUser: !1,
    })),
    f = (0, r.$)(() => ({
      ethereumExternal: [],
      areExternalConnectorsReady: !1,
      ethereumEmbedded: [],
    })),
    l = (0, t.createContext)(!1),
    c = (e) => {
      if ("ethereum" === e.chainType)
        return {
          entropyId: e.address,
          entropyIdVerifier: "ethereum-address-verifier",
        };
      if ("solana" === e.chainType)
        return {
          entropyId: e.address,
          entropyIdVerifier: "solana-address-verifier",
        };
      throw Error("Failed to get account entropy details");
    };
  e.s([
    "P",
    0,
    l,
    "a",
    0,
    f,
    "b",
    0,
    s,
    "c",
    0,
    (e) => s.setState({ user: e }),
    "d",
    0,
    (e) => f.setState({ areExternalConnectorsReady: e }),
    "e",
    0,
    (e) => s.setState({ hasResolvedInitialUser: e }),
    "f",
    0,
    () => {
      if ((0, t.useContext)(l))
        throw new a.P(
          "Multiple PrivyProvider instances found",
          "Found multiple instances of PrivyProvider, ensure there is only one mounted in your application tree.",
        );
    },
    "g",
    0,
    (e, t) => {
      if (t?.imported || (t && (0, i.c)(t))) return c(t);
      let r = (0, i.g)(e);
      if (!r) throw Error("Failed to find primary wallet");
      return c(r);
    },
    "h",
    0,
    o,
    "s",
    0,
    (e) => s.setState({ authenticated: e }),
    "t",
    0,
    c,
    "u",
    0,
    function () {
      let e = (0, t.useContext)(l),
        r = (0, n.u)(),
        a = f((e) => e.ethereumEmbedded),
        i = f((e) => e.ethereumExternal),
        c = f((e) => e.areExternalConnectorsReady),
        d = s((e) => e.user),
        u = s((e) => e.hasResolvedInitialUser),
        p = (0, t.useMemo)(
          () => [...a, ...i].sort((e, t) => t.connectedAt - e.connectedAt),
          [a, i],
        ),
        h = o(d, { chainType: "ethereum" }).length > 0,
        g = a.length > 0,
        m = !!c && !!u && !!r.walletProxy && (!h || g);
      return e
        ? (0, t.useMemo)(() => ({ wallets: p, ready: m }), [p, m])
        : (console.warn(
            "`useWallets` was called outside the PrivyProvider component",
          ),
          { wallets: [], ready: !1 });
    },
  ]);
};
