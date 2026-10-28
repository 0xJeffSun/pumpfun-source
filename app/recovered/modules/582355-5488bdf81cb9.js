// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(78436),
    r = e.i(748117),
    i = e.i(565530),
    a = e.i(933185);
  let o = (e, { chainType: t, walletIndex: n } = {}) =>
      e?.linkedAccounts.filter(
        (e) =>
          "wallet" === e.type &&
          "privy" === e.walletClientType &&
          (void 0 === n || e.walletIndex === n) &&
          (void 0 === t || e.chainType === t),
      ) ?? [],
    s = (0, n.$)(() => ({
      user: null,
      authenticated: !1,
      hasResolvedInitialUser: !1,
    })),
    l = (0, n.$)(() => ({
      ethereumExternal: [],
      areExternalConnectorsReady: !1,
      ethereumEmbedded: [],
    })),
    c = (0, t.createContext)(!1),
    f = (e) => {
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
    c,
    "a",
    0,
    l,
    "b",
    0,
    s,
    "c",
    0,
    (e) => s.setState({ user: e }),
    "d",
    0,
    (e) => l.setState({ areExternalConnectorsReady: e }),
    "e",
    0,
    (e) => s.setState({ hasResolvedInitialUser: e }),
    "f",
    0,
    () => {
      if ((0, t.useContext)(c))
        throw new i.P(
          "Multiple PrivyProvider instances found",
          "Found multiple instances of PrivyProvider, ensure there is only one mounted in your application tree.",
        );
    },
    "g",
    0,
    (e, t) => {
      if (t?.imported || (t && (0, a.c)(t))) return f(t);
      let n = (0, a.g)(e);
      if (!n) throw Error("Failed to find primary wallet");
      return f(n);
    },
    "h",
    0,
    o,
    "s",
    0,
    (e) => s.setState({ authenticated: e }),
    "t",
    0,
    f,
    "u",
    0,
    function () {
      let e = (0, t.useContext)(c),
        n = (0, r.u)(),
        i = l((e) => e.ethereumEmbedded),
        a = l((e) => e.ethereumExternal),
        f = l((e) => e.areExternalConnectorsReady),
        d = s((e) => e.user),
        u = s((e) => e.hasResolvedInitialUser),
        p = (0, t.useMemo)(
          () => [...i, ...a].sort((e, t) => t.connectedAt - e.connectedAt),
          [i, a],
        ),
        h = o(d, { chainType: "ethereum" }).length > 0,
        g = i.length > 0,
        w = !!f && !!u && !!n.walletProxy && (!h || g);
      return e
        ? (0, t.useMemo)(() => ({ wallets: p, ready: w }), [p, w])
        : (console.warn(
            "`useWallets` was called outside the PrivyProvider component",
          ),
          { wallets: [], ready: !1 });
    },
  ]);
};
