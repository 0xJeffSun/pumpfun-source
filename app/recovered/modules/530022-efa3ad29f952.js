// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["f", () => c], 530022);
  var t = e.i(359702),
    i = e.i(603797),
    s = e.i(770924);
  let r = (0, t.s)({
      walletImages: {},
      networkImages: {},
      chainImages: {},
      connectorImages: {},
      tokenImages: {},
      currencyImages: {},
    }),
    a = {
      state: r,
      subscribeNetworkImages: (e) =>
        (0, t.i)(r.networkImages, () => e(r.networkImages)),
      subscribeKey: (e, t) => (0, s.T)(r, e, t),
      subscribe: (e) => (0, t.i)(r, () => e(r)),
      setWalletImage(e, t) {
        r.walletImages[e] = t;
      },
      setNetworkImage(e, t) {
        r.networkImages[e] = t;
      },
      setChainImage(e, t) {
        r.chainImages[e] = t;
      },
      setConnectorImage(e, t) {
        r.connectorImages = { ...r.connectorImages, [e]: t };
      },
      setTokenImage(e, t) {
        r.tokenImages[e] = t;
      },
      setCurrencyImage(e, t) {
        r.currencyImages[e] = t;
      },
    };
  e.s(["f", 0, a], 143301);
  let n = {
      eip155: "ba0ba0cd-17c6-4806-ad93-f9d174f17900",
      solana: "a1b58899-f671-4276-6a5e-56ca5bd59700",
      polkadot: "",
      bip122: "0b4838db-0161-4ffe-022d-532bf03dba00",
    },
    o = (0, t.s)({ networkImagePromises: {} }),
    c = {
      async fetchWalletImage(e) {
        if (e)
          return (await i.f._fetchWalletImage(e), this.getWalletImageById(e));
      },
      async fetchNetworkImage(e) {
        if (!e) return;
        let t = this.getNetworkImageById(e);
        return (
          t ||
          (o.networkImagePromises[e] ||
            (o.networkImagePromises[e] = i.f._fetchNetworkImage(e)),
          await o.networkImagePromises[e],
          this.getNetworkImageById(e))
        );
      },
      getWalletImageById(e) {
        if (e) return a.state.walletImages[e];
      },
      getWalletImage: (e) =>
        e?.image_url
          ? e?.image_url
          : e?.image_id
            ? a.state.walletImages[e.image_id]
            : void 0,
      getNetworkImage: (e) =>
        e?.assets?.imageUrl
          ? e?.assets?.imageUrl
          : e?.assets?.imageId
            ? a.state.networkImages[e.assets.imageId]
            : void 0,
      getNetworkImageById(e) {
        if (e) return a.state.networkImages[e];
      },
      getConnectorImage: (e) =>
        e?.imageUrl
          ? e.imageUrl
          : e?.imageId
            ? a.state.connectorImages[e.imageId]
            : void 0,
      getChainImage: (e) => a.state.networkImages[n[e]],
    };
};
