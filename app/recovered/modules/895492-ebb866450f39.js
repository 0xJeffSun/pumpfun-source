// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(971370),
    n = e.i(344048),
    i = e.i(545177),
    a = e.i(22675),
    r = e.i(233404),
    s = e.i(84976);
  let l = BigInt(1e6),
    o = ({ lamports: e, solPriceUsd: t }) => {
      var n;
      return e <= BigInt(0) || null == t || !Number.isFinite(t) || t <= 0
        ? "0"
        : !Number.isFinite(
              (n =
                ((Number(e) / 1e9) * t * 0.995) / (1 + (0.01 / 0.99 + 0.01))),
            ) || n <= 0
          ? "0"
          : String(BigInt(Math.floor(n * Number(l))));
    };
  e.s(["a", 0, 100, "G", 0, o], 969673);
  let u = (e) => (Number.isFinite(e) ? Math.max(Math.round(e), 300) : 300),
    d = (0, s.q)("usdc"),
    c = 400,
    m = async (e, { retryDelayMs: t = c } = {}) => {
      let n = await (0, i.s)(e, { nonTradeTx: !0 });
      if ("ok" === n.kind) return { kind: "sent", result: n.data, attempts: 1 };
      await new Promise((e) => setTimeout(e, t));
      let a = await (0, i.s)(e, { nonTradeTx: !0 });
      return "ok" === a.kind
        ? { kind: "sent", result: a.data, attempts: 2 }
        : { kind: "failed", message: a.message, attempts: 2 };
    };
  e.s(
    [
      "h",
      0,
      {
        bridge_held: "web.trade.bridge_held",
        bridge_refunded: "web.trade.bridge_buy_refunded",
        bridge_expired: "web.trade.bridge_expired",
        bridge_failed: "web.trade.bridge_failed",
      },
      "p",
      0,
      class extends Error {
        reason;
        operation;
        intentId;
        signatures;
        pending;
        constructor({
          message: e,
          reason: t,
          operation: n,
          intentId: i,
          signatures: a = [],
          cause: r,
        }) {
          (super(e, { cause: r }),
            (this.name = "BridgeBuyError"),
            (this.reason = t),
            (this.operation = n),
            (this.intentId = i),
            (this.signatures = a),
            (this.pending = "bridge_confirmation_pending" === t));
        }
      },
      "X",
      0,
      (e) => ("usdc" === e ? "usdc" : "sol"),
      "S",
      0,
      u,
      "i",
      0,
      ({ created: e, amountIn: t, fill: n }) => {
        let i,
          a = Date.parse(e.quote.expires_at);
        return {
          fromAmount: t,
          toAmount: n?.expectedOut ?? e.quote.expected_out ?? "0",
          toAmountMin: n?.minOut ?? e.quote.min_out,
          exchangeRate: "",
          transactions: [],
          provider: "bridge",
          quoteId: e.intent_id,
          expiresAt: Number.isFinite(a) ? a : void 0,
          fromAmountUsd:
            Number.isFinite((i = Number(t))) && i >= 0
              ? String(i / 10 ** d)
              : void 0,
        };
      },
      "q",
      0,
      (e) => (e ? { ...e, settlementUsdPrice: 1, settlementDecimals: d } : e),
      "k",
      0,
      ({
        solanaWallet: e,
        evmWallet: t,
        chainId: n,
        mint: i,
        paymentAsset: a,
        atomicAmount: s,
        solPriceUsd: l,
        slippageBps: d,
        calloutUser: c,
      }) => {
        let m = {
          solana_wallet: e,
          evm_wallet: t,
          direction: "buy",
          evm_chain_id: n,
          evm_token: i,
          slippage_bps: u(d),
          async_quote: !0,
          ...(c ? { callout_user: c } : {}),
        };
        if ("usdc" === a) return { ...m, amount_in: s.toString() };
        let g = o({ lamports: s, solPriceUsd: l });
        return "0" === g
          ? null
          : {
              ...m,
              amount_in: g,
              funding: "sol",
              funding_slippage_bps: 100,
              ...((0, r.b)() ? { client_supports_v1: !0 } : {}),
            };
      },
      "H",
      0,
      (e) =>
        "base64" === e.encoding
          ? (0, a.m)(e.transaction)
          : t.VersionedTransaction.deserialize(n.f.decode(e.transaction)),
      "s",
      0,
      m,
    ],
    895492,
  );
};
