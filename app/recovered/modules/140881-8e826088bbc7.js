// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["f", () => c]);
  var t = e.i(603797),
    r = e.i(650883),
    s = e.i(376744),
    n = e.i(191529),
    o = e.i(489083),
    i = e.i(662702),
    a = e.i(231109);
  let c = {
    filterOutDuplicatesByRDNS(e) {
      let t = n.f.state.enableEIP6963 ? r.f.state.connectors : [],
        i = o.f.getRecentWallets(),
        a = t.map((e) => e.info?.rdns).filter(Boolean),
        c = i.map((e) => e.rdns).filter(Boolean),
        l = a.concat(c);
      if (l.includes("io.metamask.mobile") && s.f.isMobile()) {
        let e = l.indexOf("io.metamask.mobile");
        l[e] = "io.metamask";
      }
      return e.filter((e) => !l.includes(String(e?.rdns)));
    },
    filterOutDuplicatesByIds(e) {
      let t = r.f.state.connectors.filter(
          (e) => "ANNOUNCED" === e.type || "INJECTED" === e.type,
        ),
        s = o.f.getRecentWallets(),
        n = t.map((e) => e.explorerId),
        i = s.map((e) => e.id),
        a = n.concat(i);
      return e.filter((e) => !a.includes(e?.id));
    },
    filterOutDuplicateWallets(e) {
      let t = this.filterOutDuplicatesByRDNS(e);
      return this.filterOutDuplicatesByIds(t);
    },
    markWalletsAsInstalled(e) {
      let { connectors: t } = r.f.state,
        s = t
          .filter((e) => "ANNOUNCED" === e.type)
          .reduce((e, t) => (t.info?.rdns && (e[t.info.rdns] = !0), e), {});
      return e
        .map((e) => ({ ...e, installed: !!e.rdns && !!s[e.rdns ?? ""] }))
        .sort((e, t) => Number(t.installed) - Number(e.installed));
    },
    getConnectOrderMethod(e, s) {
      let o = e?.connectMethodsOrder || n.f.state.features?.connectMethodsOrder,
        c = s || r.f.state.connectors;
      if (o) return o;
      let { injected: l, announced: u } = i.f.getConnectorsByType(
          c,
          t.f.state.recommended,
          t.f.state.featured,
        ),
        h = l.filter(i.f.showConnector),
        d = u.filter(i.f.showConnector);
      return h.length || d.length
        ? ["wallet", "email", "social"]
        : a.f.DEFAULT_CONNECT_METHOD_ORDER;
    },
  };
};
