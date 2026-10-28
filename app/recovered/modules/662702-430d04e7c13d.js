// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["f", () => h]);
  var t = e.i(450314),
    r = e.i(603797),
    s = e.i(8242),
    n = e.i(752954),
    o = e.i(650883),
    i = e.i(376744),
    a = e.i(191529),
    c = e.i(489083),
    l = e.i(875676),
    u = e.i(140881);
  let h = {
    getConnectorsByType(e, t, r) {
      let { customWallets: s } = a.f.state,
        n = c.f.getRecentWallets(),
        o = u.f.filterOutDuplicateWallets(t),
        i = u.f.filterOutDuplicateWallets(r),
        l = e.filter((e) => "MULTI_CHAIN" === e.type),
        h = e.filter((e) => "ANNOUNCED" === e.type),
        d = e.filter((e) => "INJECTED" === e.type);
      return {
        custom: s,
        recent: n,
        external: e.filter((e) => "EXTERNAL" === e.type),
        multiChain: l,
        announced: h,
        injected: d,
        recommended: o,
        featured: i,
      };
    },
    showConnector(e) {
      let t = e.info?.rdns,
        s = !!t && r.f.state.excludedWallets.some((e) => e.rdns === t),
        o =
          !!e.name &&
          r.f.state.excludedWallets.some((t) =>
            l.f.isLowerCaseMatch(t.name, e.name),
          );
      return (
        ("INJECTED" !== e.type ||
          ((!!i.f.isMobile() || "Browser Wallet" !== e.name) &&
            (!!t || !!n.f.checkInstalled()) &&
            !s &&
            !o)) &&
        ("ANNOUNCED" !== e.type || (!s && !o))
      );
    },
    getIsConnectedWithWC: () =>
      Array.from(s.f.state.chains.values()).some(
        (e) =>
          o.f.getConnectorId(e.namespace) === t.f.CONNECTOR_ID.WALLET_CONNECT,
      ),
    getConnectorTypeOrder({
      recommended: e,
      featured: t,
      custom: r,
      recent: s,
      announced: n,
      injected: o,
      multiChain: i,
      external: c,
      overriddenConnectors: l = a.f.state.features?.connectorTypeOrder ?? [],
    }) {
      let u = h.getIsConnectedWithWC(),
        d = [
          {
            type: "walletConnect",
            isEnabled: a.f.state.enableWalletConnect && !u,
          },
          { type: "recent", isEnabled: s.length > 0 },
          { type: "injected", isEnabled: [...o, ...n, ...i].length > 0 },
          { type: "featured", isEnabled: t.length > 0 },
          { type: "custom", isEnabled: r && r.length > 0 },
          { type: "external", isEnabled: c.length > 0 },
          { type: "recommended", isEnabled: e.length > 0 },
        ].filter((e) => e.isEnabled),
        f = new Set(d.map((e) => e.type)),
        p = l.filter((e) => f.has(e)).map((e) => ({ type: e, isEnabled: !0 })),
        g = d.filter(({ type: e }) => !p.some(({ type: t }) => t === e));
      return Array.from(new Set([...p, ...g].map(({ type: e }) => e)));
    },
  };
};
