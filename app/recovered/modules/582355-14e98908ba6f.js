// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(78436),
    r = e.i(748117),
    a = e.i(565530),
    i = e.i(933185);
  let o = (e, { chainType: t, walletIndex: n } = {}) =>
      e?.linkedAccounts.filter(
        (e) =>
          "wallet" === e.type &&
          "privy" === e.walletClientType &&
          (void 0 === n || e.walletIndex === n) &&
          (void 0 === t || e.chainType === t),
      ) ?? [],
    l = (0, n.$)(() => ({
      user: null,
      authenticated: !1,
      hasResolvedInitialUser: !1,
    })),
    s = (0, n.$)(() => ({
      ethereumExternal: [],
      areExternalConnectorsReady: !1,
      ethereumEmbedded: [],
    })),
    d = (0, t.createContext)(!1),
    u = (e) => {
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
    d,
    "a",
    0,
    s,
    "b",
    0,
    l,
    "c",
    0,
    (e) => l.setState({ user: e }),
    "d",
    0,
    (e) => s.setState({ areExternalConnectorsReady: e }),
    "e",
    0,
    (e) => l.setState({ hasResolvedInitialUser: e }),
    "f",
    0,
    () => {
      if ((0, t.useContext)(d))
        throw new a.P(
          "Multiple PrivyProvider instances found",
          "Found multiple instances of PrivyProvider, ensure there is only one mounted in your application tree.",
        );
    },
    "g",
    0,
    (e, t) => {
      if (t?.imported || (t && (0, i.c)(t))) return u(t);
      let n = (0, i.g)(e);
      if (!n) throw Error("Failed to find primary wallet");
      return u(n);
    },
    "h",
    0,
    o,
    "s",
    0,
    (e) => l.setState({ authenticated: e }),
    "t",
    0,
    u,
    "u",
    0,
    function () {
      let e = (0, t.useContext)(d),
        n = (0, r.u)(),
        a = s((e) => e.ethereumEmbedded),
        i = s((e) => e.ethereumExternal),
        u = s((e) => e.areExternalConnectorsReady),
        c = l((e) => e.user),
        p = l((e) => e.hasResolvedInitialUser),
        f = (0, t.useMemo)(
          () => [...a, ...i].sort((e, t) => t.connectedAt - e.connectedAt),
          [a, i],
        ),
        g = o(c, { chainType: "ethereum" }).length > 0,
        h = a.length > 0,
        m = !!u && !!p && !!n.walletProxy && (!g || h);
      return e
        ? (0, t.useMemo)(() => ({ wallets: f, ready: m }), [f, m])
        : (console.warn(
            "`useWallets` was called outside the PrivyProvider component",
          ),
          { wallets: [], ready: !1 });
    },
  ]);
};
