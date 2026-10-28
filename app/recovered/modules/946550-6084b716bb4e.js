// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    r = e.i(78436),
    n = e.i(778396),
    i = e.i(356283),
    l = e.i(865259);
  let a = (0, r.$)((e, t) => ({
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
    s = (e, t) =>
      (0, l.U)({
        rate: (0, l.L)({ quoteBps: e.transferFeeBps }) ?? t,
        quotedReceive: e.receiveUiAmount,
        quoteIsNet: e.receiveIsNet,
      }),
    o = (e, t) => ((0, i.C)(t) ? e * t : null),
    u = (e, t, r) => ({
      tradeDirection: r.tradeDirection,
      paySymbol: r.paySymbol,
      payUiAmount: e.payUiAmount,
      payUsd: o(e.payUiAmount, r.getPayUsdPrice()),
      receiveSymbol: r.receiveSymbol,
      receiveUiAmount: t.netReceive,
      receiveUsd: o(t.netReceive, r.getReceiveUsdPrice()),
      minReceiveUiAmount: e.receiveIsNet
        ? e.minReceiveUiAmount
        : (0, l.q)({
            grossReceive: e.minReceiveUiAmount,
            transferFeeBps: t.transferFeeBps,
          }),
      transferFeeBps: t.transferFeeBps,
      taxPercent: t.taxPercent,
    }),
    d = async (e) => {
      let {
          mint: r,
          tradeDirection: i,
          fallbackRate: o,
          build: d,
          describe: c,
          rebuild: m,
          ask: p = (e) => a.getState().ask(e),
        } = e,
        f = c(d);
      if (!f) return d;
      let _ = s(f, o);
      if (!(0, l.b)(_)) return d;
      t.y.warn("[solanaTransferTaxGate] transfer_tax_warning", {
        mint: r,
        trade_direction: i,
        transfer_fee_bps: _.transferFeeBps,
        rate_source: _.source,
        receive_is_net: f.receiveIsNet,
        quoted_receive: f.receiveUiAmount,
        net_receive: _.netReceive,
      });
      let v = new Map(),
        g = u(f, _, e);
      v.set(g, d);
      let h = await p({
        mint: r,
        summary: g,
        refreshSummary: async () => {
          let t = await m();
          if (null === t) return null;
          let r = c(t);
          if (null === r) return null;
          let n = s(r, o);
          if (null === n) return null;
          let i = u(r, n, e);
          return (v.set(i, t), i);
        },
      });
      if (
        (t.y.info("[solanaTransferTaxGate] transfer_tax_decision", {
          mint: r,
          trade_direction: i,
          decision: null === h ? "cancelled" : "confirmed",
          transfer_fee_bps: (h ?? g).transferFeeBps,
        }),
        null === h)
      )
        throw new n.l();
      let w = v.get(h);
      if (void 0 === w) throw new n.l();
      return w;
    };
  e.s(["s", 0, d, "l", 0, a]);
};
