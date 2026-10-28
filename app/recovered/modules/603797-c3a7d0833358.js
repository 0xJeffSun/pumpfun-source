// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["f", () => f]);
  var t = e.i(359702),
    i = e.i(770924),
    s = e.i(530022),
    r = e.i(376744),
    a = e.i(683767),
    n = e.i(489083),
    o = e.i(143301),
    c = e.i(8242),
    l = e.i(650883),
    h = e.i(931120),
    u = e.i(191529);
  let d = r.f.getApiUrl(),
    p = new a.f({ baseUrl: d, clientId: null }),
    g = (0, t.s)({
      promises: {},
      page: 1,
      count: 0,
      featured: [],
      allFeatured: [],
      recommended: [],
      allRecommended: [],
      wallets: [],
      search: [],
      isAnalyticsEnabled: !1,
      excludedWallets: [],
      isFetchingRecommendedWallets: !1,
    }),
    f = {
      state: g,
      subscribeKey: (e, t) => (0, i.T)(g, e, t),
      _getSdkProperties() {
        let { projectId: e, sdkType: t, sdkVersion: i } = u.f.state;
        return { projectId: e, st: t || "appkit", sv: i || "html-wagmi-4.2.2" };
      },
      _filterOutExtensions: (e) =>
        u.f.state.isUniversalProvider
          ? e.filter(
              (e) => !!(e.mobile_link || e.desktop_link || e.webapp_link),
            )
          : e,
      async _fetchWalletImage(e) {
        let t = `${p.baseUrl}/getWalletImage/${e}`,
          i = await p.getBlob({ path: t, params: f._getSdkProperties() });
        o.f.setWalletImage(e, URL.createObjectURL(i));
      },
      async _fetchNetworkImage(e) {
        let t = `${p.baseUrl}/public/getAssetImage/${e}`,
          i = await p.getBlob({ path: t, params: f._getSdkProperties() });
        o.f.setNetworkImage(e, URL.createObjectURL(i));
      },
      async _fetchConnectorImage(e) {
        let t = `${p.baseUrl}/public/getAssetImage/${e}`,
          i = await p.getBlob({ path: t, params: f._getSdkProperties() });
        o.f.setConnectorImage(e, URL.createObjectURL(i));
      },
      async _fetchCurrencyImage(e) {
        let t = `${p.baseUrl}/public/getCurrencyImage/${e}`,
          i = await p.getBlob({ path: t, params: f._getSdkProperties() });
        o.f.setCurrencyImage(e, URL.createObjectURL(i));
      },
      async _fetchTokenImage(e) {
        let t = `${p.baseUrl}/public/getTokenImage/${e}`,
          i = await p.getBlob({ path: t, params: f._getSdkProperties() });
        o.f.setTokenImage(e, URL.createObjectURL(i));
      },
      async fetchNetworkImages() {
        let e = c.f.getAllRequestedCaipNetworks(),
          t = e
            ?.map(({ assets: e }) => e?.imageId)
            .filter(Boolean)
            .filter((e) => !s.f.getNetworkImageById(e));
        t && (await Promise.allSettled(t.map((e) => f._fetchNetworkImage(e))));
      },
      async fetchConnectorImages() {
        let { connectors: e } = l.f.state,
          t = e.map(({ imageId: e }) => e).filter(Boolean);
        await Promise.allSettled(t.map((e) => f._fetchConnectorImage(e)));
      },
      async fetchCurrencyImages(e = []) {
        await Promise.allSettled(e.map((e) => f._fetchCurrencyImage(e)));
      },
      async fetchTokenImages(e = []) {
        await Promise.allSettled(e.map((e) => f._fetchTokenImage(e)));
      },
      async fetchFeaturedWallets() {
        let { featuredWalletIds: e } = u.f.state;
        if (e?.length) {
          let { data: t } = await p.get({
            path: "/getWallets",
            params: {
              ...f._getSdkProperties(),
              page: "1",
              entries: e?.length ? String(e.length) : "4",
              include: e?.join(","),
            },
          });
          t.sort((t, i) => e.indexOf(t.id) - e.indexOf(i.id));
          let i = t.map((e) => e.image_id).filter(Boolean);
          (await Promise.allSettled(i.map((e) => f._fetchWalletImage(e))),
            (g.featured = t),
            (g.allFeatured = t));
        }
      },
      async fetchRecommendedWallets() {
        try {
          g.isFetchingRecommendedWallets = !0;
          let {
              includeWalletIds: e,
              excludeWalletIds: t,
              featuredWalletIds: i,
            } = u.f.state,
            s = [...(t ?? []), ...(i ?? [])].filter(Boolean),
            r = c.f.getRequestedCaipNetworkIds().join(","),
            { data: a, count: o } = await p.get({
              path: "/getWallets",
              params: {
                ...f._getSdkProperties(),
                page: "1",
                chains: r,
                entries: "4",
                include: e?.join(","),
                exclude: s?.join(","),
              },
            }),
            l = n.f.getRecentWallets(),
            h = a.map((e) => e.image_id).filter(Boolean),
            d = l.map((e) => e.image_id).filter(Boolean);
          (await Promise.allSettled(
            [...h, ...d].map((e) => f._fetchWalletImage(e)),
          ),
            (g.recommended = a),
            (g.allRecommended = a),
            (g.count = o ?? 0));
        } catch {
        } finally {
          g.isFetchingRecommendedWallets = !1;
        }
      },
      async fetchWallets({ page: e }) {
        let {
            includeWalletIds: t,
            excludeWalletIds: i,
            featuredWalletIds: s,
          } = u.f.state,
          a = c.f.getRequestedCaipNetworkIds().join(","),
          n = [
            ...g.recommended.map(({ id: e }) => e),
            ...(i ?? []),
            ...(s ?? []),
          ].filter(Boolean),
          { data: o, count: l } = await p.get({
            path: "/getWallets",
            params: {
              ...f._getSdkProperties(),
              page: String(e),
              entries: "40",
              chains: a,
              include: t?.join(","),
              exclude: n.join(","),
            },
          }),
          h = o
            .slice(0, 20)
            .map((e) => e.image_id)
            .filter(Boolean);
        (await Promise.allSettled(h.map((e) => f._fetchWalletImage(e))),
          (g.wallets = r.f.uniqueBy(
            [...g.wallets, ...f._filterOutExtensions(o)],
            "id",
          )),
          (g.count = l > g.count ? l : g.count),
          (g.page = e));
      },
      async initializeExcludedWallets({ ids: e }) {
        let t = c.f.getRequestedCaipNetworkIds().join(","),
          { data: i } = await p.get({
            path: "/getWallets",
            params: {
              ...f._getSdkProperties(),
              page: "1",
              entries: String(e.length),
              chains: t,
              include: e?.join(","),
            },
          });
        i &&
          i.forEach((e) => {
            e?.rdns && g.excludedWallets.push({ rdns: e.rdns, name: e.name });
          });
      },
      async searchWallet({ search: e, badge: t }) {
        let { includeWalletIds: i, excludeWalletIds: s } = u.f.state;
        g.search = [];
        let a = c.f.getRequestedCaipNetworkIds().join(","),
          { data: n } = await p.get({
            path: "/getWallets",
            params: {
              ...f._getSdkProperties(),
              page: "1",
              entries: "100",
              search: e?.trim(),
              badge_type: t,
              chains: a,
              include: i?.join(","),
              exclude: s?.join(","),
            },
          });
        h.f.sendEvent({
          type: "track",
          event: "SEARCH_WALLET",
          properties: { badge: t ?? "", search: e ?? "" },
        });
        let o = n.map((e) => e.image_id).filter(Boolean);
        (await Promise.allSettled([
          ...o.map((e) => f._fetchWalletImage(e)),
          r.f.wait(300),
        ]),
          (g.search = f._filterOutExtensions(n)));
      },
      initPromise(e, t) {
        let i = g.promises[e];
        return i || (g.promises[e] = t());
      },
      prefetch: ({
        fetchConnectorImages: e = !0,
        fetchFeaturedWallets: t = !0,
        fetchRecommendedWallets: i = !0,
        fetchNetworkImages: s = !0,
      } = {}) =>
        Promise.allSettled(
          [
            e && f.initPromise("connectorImages", f.fetchConnectorImages),
            t && f.initPromise("featuredWallets", f.fetchFeaturedWallets),
            i && f.initPromise("recommendedWallets", f.fetchRecommendedWallets),
            s && f.initPromise("networkImages", f.fetchNetworkImages),
          ].filter(Boolean),
        ),
      prefetchAnalyticsConfig() {
        u.f.state.features?.analytics && f.fetchAnalyticsConfig();
      },
      async fetchAnalyticsConfig() {
        try {
          let { isAnalyticsEnabled: e } = await p.get({
            path: "/getAnalyticsConfig",
            params: f._getSdkProperties(),
          });
          u.f.setFeatures({ analytics: e });
        } catch (e) {
          u.f.setFeatures({ analytics: !1 });
        }
      },
      setFilterByNamespace(e) {
        if (!e) {
          ((g.featured = g.allFeatured), (g.recommended = g.allRecommended));
          return;
        }
        let t = c.f.getRequestedCaipNetworkIds().join(",");
        ((g.featured = g.allFeatured.filter((e) =>
          e.chains?.some((e) => t.includes(e)),
        )),
          (g.recommended = g.allRecommended.filter((e) =>
            e.chains?.some((e) => t.includes(e)),
          )));
      },
    };
};
