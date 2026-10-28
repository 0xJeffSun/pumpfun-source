// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    r = e.i(78436),
    n = e.i(778396),
    i = e.i(356283);
  let l = (0, r.$)((e, t) => ({
      request: null,
      resolve: null,
      ask: (r) =>
        t().resolve
          ? Promise.resolve(null)
          : new Promise((t) => {
              e({ request: r, resolve: t });
            }),
      settle: (r) => {
        let { resolve: n } = t();
        (e({ request: null, resolve: null }), n?.(r));
      },
    })),
    a = (e, t, r) => ({
      payUsd: (0, i.C)(r) ? e.payUiAmount * r : null,
      receiveUsdAtSpot: (0, i.C)(t) ? e.receiveUiAmount * t : null,
      routerImpactPercent: e.priceImpact,
      transferFeeBps: e.transferFeeBps,
    }),
    s = (e, t, r, n) => ({
      paySymbol: "usdc" === n ? "USDC" : "SOL",
      payUiAmount: e.payUiAmount,
      payUsd: t.payUsd,
      receiveSymbol: r,
      receiveUiAmount: e.receiveUiAmount,
      receiveUsdAtSpot: t.receiveUsdAtSpot,
      minReceiveUiAmount: e.minReceiveUiAmount,
      valueLostPercent: t.valueLostPercent,
      valueLostUsd: t.payUsd - t.receiveUsdAtSpot,
      poolFeePercent: t.poolFeePercent,
      poolFeeUsd: t.poolFeeUsd,
      routerImpactPercent:
        null !== e.priceImpact &&
        void 0 !== e.priceImpact &&
        Number.isFinite(e.priceImpact)
          ? e.priceImpact
          : null,
    }),
    o = async ({
      mint: e,
      tokenSymbol: r,
      payDenomination: o,
      getTokenUsdPrice: u,
      getPayUsdPrice: d,
      build: c,
      describe: m,
      rebuild: p,
      ask: f = (e) => l.getState().ask(e),
    }) => {
      let _ = m(c);
      if (!_) return c;
      let v = u(),
        g = d(),
        h = (0, i.R)({ venue: _.venue, tradeDirection: "buy", ...a(_, v, g) });
      if (!(0, i.D)(h)) return c;
      t.y.warn("[solanaPoolFeeGate] pool_fee_buy_warning", {
        mint: e,
        venue: _.venue,
        pay_denomination: o,
        pay_ui_amount: _.payUiAmount,
        pay_usd_price: g,
        pay_usd: h.payUsd,
        receive_ui_amount: _.receiveUiAmount,
        token_usd_price: v,
        spot_receive_usd: h.receiveUsdAtSpot,
        price_impact_percent: _.priceImpact,
        transfer_fee_bps: _.transferFeeBps ?? null,
        value_lost_percent: h.valueLostPercent,
        pool_fee_percent: h.poolFeePercent,
      });
      let w = new Map(),
        y = s(_, h, r, o);
      w.set(y, c);
      let b = await f({
        mint: e,
        summary: y,
        refreshSummary: async () => {
          let e = await p();
          if (null === e) return null;
          let t = m(e);
          if (null === t) return null;
          let n = (0, i.u)(a(t, u(), d()));
          if (null === n) return null;
          let l = s(t, n, r, o);
          return (w.set(l, e), l);
        },
      });
      if (
        (t.y.info("[solanaPoolFeeGate] pool_fee_buy_decision", {
          mint: e,
          decision: null === b ? "cancelled" : "confirmed",
          pool_fee_percent: (b ?? y).poolFeePercent,
          value_lost_percent: (b ?? y).valueLostPercent,
        }),
        null === b)
      )
        throw new n.l();
      let S = w.get(b);
      if (void 0 === S) throw new n.l();
      return S;
    };
  e.s(["d", 0, o, "Q", 0, l]);
};
