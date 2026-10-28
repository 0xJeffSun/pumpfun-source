// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(635234),
    r = e.i(54567);
  let n = (e) =>
      null == e || !Number.isFinite(e) || e <= 0 || e > 0x2540be3ff
        ? ""
        : new Date(1e3 * e).toISOString(),
    i = (e) => {
      let t,
        r = n(e.created_at),
        i = n(e.executed_at);
      return {
        orderId: e.order_id,
        mint: e.mint,
        action: (e.direction ?? "sell").toUpperCase(),
        quantity: ((e) => {
          if (null == e || !/^\d+$/.test(e)) return "";
          let t = BigInt(e).toString();
          if (t.length <= 6) return `0.${t.padStart(6, "0")}`;
          let r = t.length - 6;
          return `${t.slice(0, r)}.${t.slice(r)}`;
        })(e.amount_in),
        quantityAtomic:
          null != (t = e.amount_in) && /^\d+$/.test(t) ? t : void 0,
        status: e.status,
        createdAt: r,
        updatedAt: "" === i ? r : i,
        reason: e.failure_reason ?? "",
        orderType: e.order_type,
        SK: e.on_chain_order_id,
        txHash: e.tx_signature,
        triggerMcapUsd:
          null != e.trigger_mcap && Number.isFinite(e.trigger_mcap)
            ? e.trigger_mcap
            : void 0,
        displayError: e.display_error,
        cancelReason: e.cancel_reason,
      };
    },
    l = (e) => (0, t.O)("list-limit", e, { retries: 2 }),
    a = async (e, t = l) => {
      let n,
        a = [],
        o = !1;
      for (let r = 0; r < 20; r += 1) {
        let r = await t({
          user: e.user,
          limit: 100,
          ...(null != e.mint ? { mint: e.mint } : {}),
          ...(null != n ? { cursor: n } : {}),
        });
        if ((a.push(...r.orders), !r.next_cursor)) {
          o = !0;
          break;
        }
        n = r.next_cursor;
      }
      return (
        o ||
          r.logger.warn("[fetchLimitOrders] page_cap_truncated", {
            user: e.user,
            mint: e.mint,
            pages: 20,
            rows: a.length,
          }),
        a.map(i)
      );
    };
  e.s(["f", 0, a]);
};
