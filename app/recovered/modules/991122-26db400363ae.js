// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    n = e.i(449597),
    i = e.i(486813);
  let r = /^\d+$/,
    s = (e) => {
      let t = e.payout_amount;
      if ("string" != typeof t || !r.test(t)) return null;
      switch (e.payout_asset) {
        case "sol":
          return { asset: "sol", amount: BigInt(t) };
        case "stable":
          return { asset: "stable", amount: BigInt(t) };
        default:
          return null;
      }
    },
    o = (e) => new Promise((t) => setTimeout(t, e)),
    a = async (e, t) => {
      for (let n = 0; n < 4; n++) {
        n > 0 && (await o(1500));
        let i = await e
          .getTransaction(t, { maxSupportedTransactionVersion: 0 })
          .catch(() => null);
        if (i) return i;
      }
      return null;
    },
    l = (e, t) =>
      (e ?? [])
        .filter((e) => e.owner === t && e.mint === n.j)
        .reduce((e, t) => {
          let n = t.uiTokenAmount.amount;
          return r.test(n) ? e + BigInt(n) : e;
        }, BigInt(0)),
    d = async ({ connection: e, intent: n, wallet: r }) => {
      let o = s(n);
      if (o)
        return (
          t.y.info("[bridgePayoutDelivery] payout_delivery", {
            intent_id: n.intent_id,
            payout_source: "row",
            payout_asset: o.asset,
          }),
          o
        );
      let d = n.payout_tx;
      if ("string" != typeof d || 0 === d.length) return null;
      let u = await a(e, d),
        c = u?.meta;
      if (!u || !c) {
        let e = { intent_id: n.intent_id, payout_tx: d };
        return (
          t.y.warn("[bridgePayoutDelivery] payout_tx_not_found", e),
          (0, i.f)({
            error: Error("bridge payout transaction not readable"),
            operation: "payout-delivery-read",
            context: e,
          }),
          null
        );
      }
      let _ = l(c.postTokenBalances, r) - l(c.preTokenBalances, r);
      if (_ > BigInt(0))
        return (
          t.y.info("[bridgePayoutDelivery] payout_delivery", {
            intent_id: n.intent_id,
            payout_source: "tx",
            payout_asset: "stable",
          }),
          { asset: "stable", amount: _ }
        );
      let m =
        ((e) => {
          let { message: t } = e.transaction;
          try {
            return (
              "legacy" === t.version
                ? t.getAccountKeys()
                : t.getAccountKeys({
                    accountKeysFromLookups: e.meta?.loadedAddresses ?? void 0,
                  })
            )
              .keySegments()
              .flat()
              .map((e) => e.toBase58());
          } catch {
            return null;
          }
        })(u)?.indexOf(r) ?? -1;
      if (m < 0)
        return (
          t.y.warn("[bridgePayoutDelivery] wallet_not_in_payout_tx", {
            intent_id: n.intent_id,
            payout_tx: d,
          }),
          null
        );
      let p = BigInt(c.postBalances[m] ?? 0) - BigInt(c.preBalances[m] ?? 0);
      return p <= BigInt(0)
        ? (t.y.warn("[bridgePayoutDelivery] no_credit_in_payout_tx", {
            intent_id: n.intent_id,
            payout_tx: d,
          }),
          null)
        : (t.y.info("[bridgePayoutDelivery] payout_delivery", {
            intent_id: n.intent_id,
            payout_source: "tx",
            payout_asset: "sol",
          }),
          { asset: "sol", amount: p });
    };
  e.s(["O", 0, s, "A", 0, d]);
};
