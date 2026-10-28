// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(313017),
    r = e.i(646908);
  let n = /^\d+$/,
    i = (e) => null != e && Number.isFinite(e) && e > 0 && e <= 0x2540be3ff,
    l = (e) => (i(e) ? new Date(1e3 * e).toISOString() : ""),
    a = (e) => (null != e && n.test(e) ? e : void 0),
    o = (e) => {
      var t;
      let n,
        o,
        s = l(e.created_at),
        u = l(e.executed_at);
      return {
        orderId: e.order_address,
        mint: e.token,
        action: "SELL",
        quantity: ((e, t) => {
          let r = a(e);
          if (void 0 === r || null == t || !Number.isInteger(t) || t < 0)
            return "";
          let n = BigInt(r).toString();
          if (0 === t) return n;
          if (n.length <= t) return `0.${n.padStart(t, "0")}`;
          let i = n.length - t;
          return `${n.slice(0, i)}.${n.slice(i)}`;
        })(e.amount, e.token_decimals),
        quantityAtomic: a(e.amount),
        status:
          ((n = Math.floor(Date.now() / 1e3)),
          "OPEN" === e.status && i(e.deadline) && e.deadline <= n
            ? "EXPIRED"
            : e.status),
        createdAt: s,
        updatedAt: "" === u ? s : u,
        reason: e.failure_reason ?? "",
        orderType: e.order_type,
        SK: e.order_id,
        txHash: e.fill_tx_hash,
        triggerMcapUsd:
          null != e.trigger_mcap_usd && Number.isFinite(e.trigger_mcap_usd)
            ? e.trigger_mcap_usd
            : void 0,
        displayError: e.display_error,
        cancelReason: e.cancel_reason,
        evm: {
          chainId: e.chain_id,
          chainSlug:
            ((t = e.chain_id),
            null === (o = (0, r.U)(t)) || "solana" === o ? null : o),
          orderAddress: e.order_address,
          orderId: e.order_id,
          deadline: i(e.deadline) ? e.deadline : void 0,
          tokenDecimals: e.token_decimals,
          quoteTokenDecimals: e.quote_token_decimals,
          triggerPriceUsd: e.trigger_price_usd,
          minQuoteOut: e.min_quote_out,
          settlement: e.settlement_status
            ? {
                status: e.settlement_status,
                proceeds: e.proceeds,
                payoutTx: e.payout_tx,
                payoutAmount: e.payout_amount,
              }
            : null,
        },
      };
    };
  var s = e.i(25572),
    u = e.i(54567);
  let d = {
      unsupportedChain: "unsupported_chain",
      notCancellable: "not_cancellable",
      userIdRequired: "user_id_required",
      sameTypeActive: "same_type_active",
      positionExecuting: "position_executing",
      wrongSide: "wrong_side",
      tooSmall: "too_small",
      factoryNotConfigured: "factory_not_configured",
      tableSchemaUnverified: "table_schema_unverified",
      bridgeProbeRejected: "bridge_probe_rejected",
      bridgeAuthRejected: "bridge_auth_rejected",
      bridgeUnavailable: "bridge_unavailable",
      bridgeChainUnsupported: "bridge_chain_unsupported",
      bridgeNotConfigured: "bridge_not_configured",
    },
    c = [d.factoryNotConfigured, d.tableSchemaUnverified],
    p = (e) => m(e) && void 0 !== e.reason && c.includes(e.reason);
  class f extends Error {
    route;
    status;
    reason;
    retryable;
    constructor(e) {
      (super(e.message),
        (this.name = "EvmLimitApiError"),
        (this.route = e.route),
        (this.status = e.status),
        (this.reason = e.reason),
        (this.retryable = e.retryable));
    }
  }
  let m = (e) => e instanceof f,
    g = ({ error: e, reason: t }) => m(e) && e.reason === t,
    h = (e) => `[evmLimitOrder] ${e.replace(/-/g, "_")}_failed`,
    y = async ({
      route: e,
      body: r,
      logContext: n = {},
      expectedReasons: i = [],
    }) => {
      let l;
      try {
        l = await fetch(`/api/blockchain-limit/transactions/evm/${e}`, {
          method: "POST",
          headers: { "content-type": "application/json", ...(0, t.z)() },
          body: JSON.stringify(r),
        });
      } catch (r) {
        let t = r instanceof Error ? r.message : "network error";
        throw (
          u.logger.error(h(e), {
            ...n,
            status: void 0,
            reason: void 0,
            error: t,
          }),
          new f({ message: t, route: e, retryable: !1 })
        );
      }
      if (l.ok) return await l.json();
      let a = null;
      try {
        a = await l.text();
      } catch {}
      let o = ((e) => {
          let t;
          if (null === e) return { message: null };
          let r = e.trim();
          if (!r) return { message: null };
          try {
            t = JSON.parse(r);
          } catch {
            return { message: r };
          }
          if (!t || "object" != typeof t || Array.isArray(t))
            return { message: r };
          let n = t,
            i =
              "string" == typeof n.error
                ? n.error
                : "string" == typeof n.message
                  ? n.message
                  : Array.isArray(n.message)
                    ? n.message.join(", ")
                    : r,
            l = n.data;
          if (!l || "object" != typeof l || Array.isArray(l))
            return { message: i };
          let { reason: a, retryable: o } = l;
          return {
            message: i,
            ...("string" == typeof a ? { reason: a } : {}),
            ...("boolean" == typeof o ? { retryable: o } : {}),
          };
        })(a),
        s = o.message ?? `request failed (${l.status})`;
      throw (
        (void 0 !== o.reason && i.includes(o.reason)) ||
          u.logger.error(h(e), {
            ...n,
            status: l.status,
            reason: o.reason,
            error: s,
          }),
        new f({
          message: s,
          route: e,
          status: l.status,
          reason: o.reason,
          retryable: !0 === o.retryable,
        })
      );
    },
    _ = !1,
    v = (e) => {
      _ ||
        ((_ = !0),
        u.logger.warn("[evmLimitOrder] list_limit_unconfigured", {
          status: e.status,
          reason: e.reason,
          error: e.message,
        }));
    },
    w = async ({ owner: e, chainId: t, token: r }) => {
      let n;
      if (r && !t)
        throw Error("fetchEvmLimitOrders: `token` requires `chainId`");
      let i = [],
        l = !1;
      for (let a = 0; a < 20; a += 1) {
        let o,
          s = {
            owner: e,
            limit: 100,
            ...(t ? { chain_id: t } : {}),
            ...(r ? { token: r } : {}),
            ...(n ? { cursor: n } : {}),
          };
        try {
          o = await y({
            route: "list-limit",
            body: s,
            logContext: { chainId: t, token: r, page: a + 1 },
            expectedReasons: [...c, ...(t ? [d.unsupportedChain] : [])],
          });
        } catch (e) {
          if (t && g({ error: e, reason: d.unsupportedChain })) return [];
          throw (p(e) && v(e), e);
        }
        if ((i.push(...o.orders), !o.next_cursor)) {
          l = !0;
          break;
        }
        n = o.next_cursor;
      }
      return (
        l ||
          u.logger.warn("[evmLimitOrder] list_limit_page_cap_truncated", {
            owner: e.length > 8 ? `${e.slice(0, 4)}…${e.slice(-4)}` : e,
            chainId: t,
            token: r,
            pages: 20,
            rows: i.length,
          }),
        i.map(o)
      );
    };
  e.s(
    [
      "Y",
      0,
      d,
      "l",
      0,
      ({ owner: e, chainId: t, token: r, evmWallet: n }) =>
        y({
          route: "limit-eligibility",
          body: {
            owner: e,
            chain_id: t,
            token: r,
            ...(n ? { evm_wallet: n } : {}),
          },
          logContext: { chainId: t, token: r },
        }),
      "n",
      0,
      w,
      "f",
      0,
      g,
      "$",
      0,
      m,
      "s",
      0,
      (e) => m(e) && e.reason === d.bridgeProbeRejected,
      "o",
      0,
      (e) => m(e) && e.reason === d.bridgeAuthRejected,
      "b",
      0,
      ({ chainId: e, orderAddress: t, orderId: r }) =>
        y({
          route: "cancel-limit",
          body: { chain_id: e, order_address: t, order_id: r },
          logContext: { chainId: e, orderAddress: t, orderId: r },
        }),
      "u",
      0,
      (e) =>
        y({
          route: "limit-build",
          body: {
            owner: e.owner,
            evm_wallet: e.evm_wallet,
            chain_id: e.chain_id,
            token: e.token,
            order_type: e.order_type,
            trigger_mcap_usd: e.trigger_mcap_usd,
            amount: e.amount,
          },
          logContext: {
            chainId: e.chain_id,
            token: e.token,
            orderType: e.order_type,
          },
        }),
      "W",
      0,
      ({ body: e, chainId: t, token: r, orderAddress: n, orderId: i }) =>
        y({
          route: "limit-send",
          body: { ...e, ...(0, s.c)() },
          logContext: { chainId: t, token: r, orderAddress: n, orderId: i },
        }),
    ],
    339179,
  );
  var b = e.i(605587);
  let k = {
    byOwner: (e) => ["evmLimitOrders", "byOwner", e],
    byOwnerChainToken: ({ owner: e, chainId: t, token: r }) => [
      "evmLimitOrders",
      "byOwnerChainToken",
      e,
      t,
      (0, b.c)(r),
    ],
    eligibility: ({ owner: e, chainId: t, token: r, evmWallet: n }) => [
      ...k.eligibilityForToken({ owner: e, chainId: t, token: r }),
      (0, b.c)(n),
    ],
    eligibilityForToken: ({ owner: e, chainId: t, token: r }) => [
      "evmLimitOrders",
      "eligibility",
      e,
      t,
      (0, b.c)(r),
    ],
  };
  e.s(["f", 0, k], 485759);
};
