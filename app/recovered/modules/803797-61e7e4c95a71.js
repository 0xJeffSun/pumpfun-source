// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(526080),
    i = e.i(653805),
    a = e.i(605587),
    r = e.i(54567);
  let n = new Map(),
    l = (e) => void 0 !== e && Number.isFinite(e) && e > 0;
  e.s([
    "i",
    0,
    ({ mint: e, priceUsd: t, bucketAt: a, supplyUsed: n }) => {
      try {
        if (!(t > 0) || !Number.isFinite(a)) return !1;
        let r = i.x.getState(),
          l = r.peekCoin(e)?.lastTradeTimestamp;
        if ("number" == typeof l && l >= a) return !1;
        let s = void 0 !== n && n > 0 ? t * n : 0;
        return (
          r.updateCoin(e, {
            ...(s > 0 ? { usdMarketCap: s } : {}),
            priceUsd: t,
            lastTradeTimestamp: a,
          }),
          !0
        );
      } catch (t) {
        return (
          r.logger.error("applyCandlePrintToCoinMarketData: print rejected", {
            mint: e,
            error: t,
          }),
          !1
        );
      }
    },
    "T",
    0,
    ({ mint: e, update: t }) => {
      let { usdMarketCap: a, usdAthMarketCap: r, ...n } = t;
      i.x
        .getState()
        .updateCoin(e, {
          ...n,
          ...(l(a) ? { usdMarketCap: a } : {}),
          ...(l(r) ? { usdAthMarketCap: r } : {}),
        });
    },
    "x",
    0,
    ({ mint: e, event: l }) => {
      try {
        let r = Number(l.marketCapUsd),
          s = Number.isFinite(r) && r > 0 ? r : Number(l.marketCap),
          o = Number(l.priceUsd),
          d = i.x.getState(),
          c = d.peekCoin(e)?.usdAthMarketCap,
          u = (0, a.N)({ mint: e }) ? 0 : (0, t.M)(l.supply),
          m = Number(l.priceSol),
          p = Number.isFinite(o) && o > 0,
          h = {
            ...(p && s > 0 ? { usdMarketCap: s } : {}),
            ...(u > 0 ? { wireSupply: u } : {}),
            ...(p ? { priceUsd: o } : {}),
            ...(Number.isFinite(m) && m > 0 ? { priceSol: m } : {}),
            lastTradeTimestamp: new Date(l.timestamp).getTime(),
            lastTradeIsBuy: "buy" === l.type,
          };
        (p && c && s > c
          ? (h.usdAthMarketCap = s)
          : p && !c && s > 0 && n.set(e, Math.max(n.get(e) ?? 0, s)),
          d.updateCoin(e, h));
      } catch (t) {
        r.logger.error(
          "applyTradeEventToCoinMarketData: trade event rejected",
          { mint: e, error: t },
        );
      }
    },
    "j",
    0,
    ({ mint: e, snapshot: t, arrivedAt: a }) => {
      let r = i.x.getState(),
        l = r.peekCoin(e),
        s = n.get(e),
        o =
          void 0 === t.usdAthMarketCap
            ? void 0
            : Math.max(t.usdAthMarketCap, s ?? 0);
      void 0 !== o && n.delete(e);
      let d = t.isFresh ? (t.lastTradeTimestamp ?? void 0) : void 0;
      if (!l)
        return void r.setCoin({
          mint: e,
          usdMarketCap: t.usdMarketCap || 0,
          usdAthMarketCap: o,
          lastTradeTimestamp: d,
          seedSupply: t.wholeTokenSupply,
          lastUpdated: Date.now(),
          isLiveData: !1,
        });
      let c = o && o > (l.usdAthMarketCap ?? 0) ? o : void 0,
        u = t.usdMarketCap ?? 0,
        m =
          l.isLiveData &&
          "number" == typeof l.lastTradeTimestamp &&
          "number" == typeof t.lastTradeTimestamp &&
          l.lastTradeTimestamp >= t.lastTradeTimestamp;
      !0 === t.isFresh && u > 0 && l.lastUpdated < a && !m
        ? r.setCoin({
            ...l,
            usdMarketCap: u,
            usdAthMarketCap: c ?? l.usdAthMarketCap,
            lastTradeTimestamp: d ?? l.lastTradeTimestamp,
            seedSupply: t.wholeTokenSupply,
            priceUsd: void 0,
            priceSol: void 0,
            isLiveData: !1,
          })
        : c && r.updateCoin(e, { usdAthMarketCap: c });
    },
  ]);
};
