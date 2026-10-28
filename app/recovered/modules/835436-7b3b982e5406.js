// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var r = e.i(254667),
    i = e.i(584229),
    a = e.i(466931),
    s = e.i(225499),
    n = e.i(21617),
    o = e.i(577696),
    d = e.i(613677),
    l = e.i(637782),
    u = e.i(342652);
  let p = "transactions/perp-fees",
    _ = d.z.object({
      builder_fee_tenth_bps: l.z.number().int().min(0).max(n.w),
    }),
    c = async ({ signal: e } = {}) => {
      let i;
      try {
        i = await (0, u.p)(p, { signal: e, retryLimit: 0 });
      } catch (t) {
        if (e?.aborted) throw t;
        return (
          r.y.warn(`[perps] ${p} failed`, { path: p, code: "network" }),
          n.H
        );
      }
      if (i.status < 200 || i.status >= 300)
        return (
          r.y.warn(`[perps] ${p} failed`, { path: p, code: i.status }),
          n.H
        );
      let a = _.safeParse(i.body);
      return a.success
        ? ((t = a.data.builder_fee_tenth_bps), a.data.builder_fee_tenth_bps)
        : (r.y.error(`[perps] ${p}: unexpected response shape`, {
            path: p,
            issues: a.error.issues.length,
          }),
          n.H);
    },
    m = () => t ?? n.H;
  e.s(["D", 0, c, "P", 0, m], 526294);
  let w = new Set([
      "insufficient_funds",
      "insufficient_withdrawable",
      "withdraw_amount_exceeds_withdrawable",
    ]),
    g = new Set([
      "perps_disabled",
      "perps_not_configured",
      "relay_not_configured",
      "bridge_not_configured",
      "market_data_unavailable",
      "blockhash_unavailable",
      "bridge_held",
      "recipient_refused",
    ]),
    h = new Set(["payout_window_closed", "payout_not_sent"]),
    f = new Set([
      "template_expired",
      "template_invalid",
      "template_digest_mismatch",
      "wallet_mismatch",
      "signer_mismatch",
      "signature_malformed",
      "nonce_order",
    ]),
    y = "REGION_RESTRICTED",
    b = new Set([
      "NO_SWAP_ROUTES_FOUND",
      "INSUFFICIENT_LIQUIDITY",
      "SWAP_IMPACT_TOO_HIGH",
      "TRANSACTION_TOO_LARGE",
    ]),
    v = new Set([
      "SPONSOR_GUARD_FAILED",
      "SPONSORSHIP_CAP_EXCEEDED",
      "SPONSOR_SIGNING_FAILED",
    ]),
    z = new Set([
      "hl_rejected",
      "order_rejected",
      "position_exists",
      "no_position",
      "tpsl_exists",
      "unknown_oid",
      "batch_invalid",
      "leverage_out_of_range",
      "slippage_out_of_range",
      "unknown_coin",
      "coin_delisted",
    ]);
  class k extends Error {
    reason;
    errorContext = {};
    originalError;
    minimumUsd;
    landedActions = [];
    constructor() {
      (super("Hyperliquid perps trade failed"), (this.name = "PerpTradeError"));
    }
    updateContext(e) {
      this.errorContext = { ...this.errorContext, ...e };
    }
    attachLandedActions(e) {
      ((this.landedActions = e),
        this.updateContext({ landedKinds: e.map((e) => e.kind).join(",") }));
    }
    fatal({ reason: e, cause: t, operation: s }) {
      ((this.originalError = t),
        (this.reason ??= e),
        t instanceof o.b &&
          ((this.errorContext = {
            ...this.errorContext,
            serverReason: this.errorContext.serverReason ?? t.reason,
          }),
          (this.minimumUsd ??= t.minimumUsd)),
        (this.message = `Hyperliquid perps trade failed: ${this.reason}`));
      let n = {
        swapId: this.errorContext.swapId,
        requestId: this.errorContext.requestId,
        evmWallet: this.errorContext.evmWallet,
        coin: this.errorContext.coin,
        side: this.errorContext.side,
        leverage: this.errorContext.leverage,
        stage: this.errorContext.stage,
        actionKind: this.errorContext.actionKind,
        actionError: this.errorContext.actionError,
        serverReason: this.errorContext.serverReason,
        relayStatus: this.errorContext.relayStatus,
        solSignature: this.errorContext.solSignature,
        messageMutation: this.errorContext.messageMutation,
        landedKinds: this.errorContext.landedKinds,
      };
      (r.y.error("[PerpTradeError] fatal", {
        error: e,
        reason: this.reason,
        ...n,
        cause: (0, i.A)(t),
      }),
        (({ reason: e, cause: t }) =>
          "failed_to_sign_transaction" === e && (0, i.S)(t))({
          reason: e,
          cause: t,
        }) ||
          (0, a.l)({
            error: t instanceof Error ? t : this,
            feature: "perps",
            operation: s ?? this.errorContext.stage ?? "unknown",
            context: { ...n, reason: this.reason, error: e },
          }));
    }
  }
  let x = (e) =>
    void 0 !== e.minimumUsd
      ? e.minimumUsd
      : "perp_below_min_order" === e.reason
        ? (0, s.f)(e.errorContext.leverage ?? 1, m())
        : n.l;
  e.s(
    [
      "M",
      0,
      b,
      "W",
      0,
      y,
      "I",
      0,
      k,
      "F",
      0,
      x,
      "X",
      0,
      ({ error: e, refused: t }) =>
        e instanceof o.b &&
        void 0 === e.reason &&
        (void 0 === e.status || e.status >= 500)
          ? "perp_outcome_unknown"
          : t,
      "j",
      0,
      ({ error: e, carrier: t, fallback: r = "unknown", operation: i }) => {
        if (e instanceof k)
          return (e.updateContext({ ...t.errorContext, ...e.errorContext }), e);
        let a =
          e instanceof o.b
            ? (({ error: e, fallback: t }) => {
                let r = e.reason;
                return void 0 === r
                  ? t
                  : "hl_outcome_unknown" === r
                    ? "perp_outcome_unknown"
                    : "leverage_mismatch" === r
                      ? "perp_leverage_mismatch"
                      : "close_size_too_small" === r
                        ? "perp_close_size_too_small"
                        : "notional_too_small" === r
                          ? "perp_below_min_order"
                          : "AMOUNT_TOO_LOW" === r
                            ? "perp_amount_too_small"
                            : r === y || "region_restricted" === r
                              ? "perp_region_restricted"
                              : "payout_in_progress" === r
                                ? "perp_withdraw_pending"
                                : h.has(r)
                                  ? "failed_to_send_transaction"
                                  : g.has(r)
                                    ? "perps_unavailable"
                                    : f.has(r)
                                      ? "perp_session_expired"
                                      : b.has(r)
                                        ? "perp_no_route"
                                        : v.has(r)
                                          ? "perp_sponsor_failed"
                                          : w.has(r)
                                            ? "insufficient_funds"
                                            : z.has(r)
                                              ? "perp_action_rejected"
                                              : t;
              })({ error: e, fallback: r })
            : r;
        return (t.fatal({ reason: a, cause: e, operation: i }), t);
      },
    ],
    835436,
  );
  let q = new Set([
      "trade_provider_info_missing",
      "evm_signer_wallet_mismatch",
      "failed_to_sign_transaction",
      "failed_to_send_transaction",
      "failed_to_confirm_transaction",
      "insufficient_funds",
      "perp_deposit_refund",
      "perp_deposit_failure",
      "perp_deposit_pending",
      "perp_action_rejected",
      "perp_outcome_unknown",
      "perp_close_partial",
      "perp_withdraw_pending",
      "perps_unavailable",
      "perp_session_expired",
      "perp_amount_too_small",
      "perp_below_min_order",
      "perp_no_route",
      "perp_region_restricted",
      "perp_sponsor_failed",
      "perp_leverage_mismatch",
      "perp_close_size_too_small",
      "perp_tpsl_cancelled_not_set",
      "unknown",
    ]),
    A = (e) => {
      if ("object" != typeof e || null === e) return;
      let t = Reflect.get(e, "reason");
      return "string" == typeof t && t.length > 0 ? t : void 0;
    },
    S = /(tp_px|sl_px) must be (below|above) the mark price (\d+(?:\.\d+)?)/;
  e.s(
    [
      "J",
      0,
      (e) => {
        let t = A(e),
          r = void 0 !== t && q.has(t) ? t : "unknown",
          i = `web.perps.errors.${r ?? "unknown"}`;
        return "perp_below_min_order" !== r && "perp_close_size_too_small" !== r
          ? { key: i }
          : { key: i, minimumUsd: e instanceof k ? x(e) : n.l };
      },
      "y",
      0,
      ({ error: e, leverage: t, builderFeeTenthBps: r }) => {
        let a = A(e);
        if (void 0 !== a && b.has(a))
          return { key: "web.perps.errors.perp_no_route" };
        switch (a) {
          case "invalid_request": {
            let t = ((e) => {
              let t = S.exec((0, i.A)(e));
              if (!t) return null;
              let [, r, a, s] = t,
                n = Number(s);
              return !Number.isFinite(n) || n <= 0
                ? null
                : {
                    leg: "tp_px" === r ? "tp" : "sl",
                    direction: "below" === a ? "below" : "above",
                    price: s,
                  };
            })(e);
            if (null === t) return { key: "web.perps.trade.preview_error" };
            return {
              key:
                "below" === t.direction
                  ? "web.perps.trade.tpsl_must_be_below"
                  : "web.perps.trade.tpsl_must_be_above",
              refusal: t,
            };
          }
          case "notional_too_small":
            return {
              key: "web.perps.errors.perp_below_min_order",
              minimumUsd: (({
                error: e,
                leverage: t,
                builderFeeTenthBps: r,
              }) =>
                e instanceof o.b && void 0 !== e.minimumUsd
                  ? e.minimumUsd
                  : (0, s.f)(t, r))({
                error: e,
                leverage: t,
                builderFeeTenthBps: r,
              }),
            };
          case "insufficient_withdrawable":
          case "insufficient_funds":
            return { key: "web.perps.errors.insufficient_funds" };
          case "AMOUNT_TOO_LOW":
            return { key: "web.perps.errors.perp_amount_too_small" };
          case "position_exists":
            return { key: "web.perps.trade.position_exists" };
          case "leverage_mismatch":
            return { key: "web.perps.errors.perp_leverage_mismatch" };
          case "coin_delisted":
            return { key: "web.perps.trade.delisted" };
          case y:
            return { key: "web.perps.errors.perp_region_restricted" };
          case "perps_disabled":
          case "perps_not_configured":
          case "relay_not_configured":
          case "market_data_unavailable":
            return { key: "web.perps.errors.perps_unavailable" };
          default:
            return { key: "web.perps.trade.preview_error" };
        }
      },
    ],
    711792,
  );
  let E = (e) => Math.round(performance.now() - e),
    I = () => {
      let e = Error("perps flow aborted");
      return ((e.name = "AbortError"), e);
    };
  e.s(
    [
      "r",
      0,
      "hyperliquid",
      "j",
      0,
      I,
      "e",
      0,
      (e) => {
        let t = e ? { presigned: !1 } : void 0;
        return {
          update: (e) => {
            void 0 !== t && (t = { ...t, ...e });
          },
          read: () => (void 0 === t ? void 0 : { ...t }),
        };
      },
      "B",
      0,
      () => {
        let e = {};
        return {
          mark: ({ key: t, since: r }) => {
            e = { ...e, [t]: E(r) };
          },
          timings: () => ({ ...e }),
        };
      },
      "h",
      0,
      ({ flow: e, tradeError: t, onStage: i }) =>
        (a) => {
          (t.updateContext({ stage: a }),
            r.y.info(`perp_${e}_stage`, {
              flow: e,
              stage: a,
              swap_id: t.errorContext.swapId,
              request_id: t.errorContext.requestId,
              evm_wallet: t.errorContext.evmWallet,
              coin: t.errorContext.coin,
            }),
            i?.(a));
        },
      "v",
      0,
      E,
      "c",
      0,
      (e) => "object" == typeof e && null !== e && "AbortError" === e.name,
      "p",
      0,
      ({ requestedSize: e, filledSize: t }) => {
        if (void 0 === e || void 0 === t) return !1;
        let r = Number(e),
          i = Number(t);
        return !!Number.isFinite(r) && !!Number.isFinite(i) && i < r;
      },
      "E",
      0,
      (e) => {
        let t, i, a, s;
        r.y.info("perp_flow_result", {
          flow: e.flow,
          denomination: e.denomination,
          payout_resumed: e.payoutResumed,
          outcome: e.outcome,
          swap_id: e.swapId,
          request_id: e.requestId,
          evm_wallet: e.evmWallet,
          coin: e.coin,
          side: e.side,
          leverage: e.leverage,
          stage: e.stage,
          reason: e.reason,
          action_kind: e.actionKind,
          relay_status: e.relayStatus,
          time_to_build_ms: e.timings.timeToBuildMs,
          time_to_sign_ms: e.timings.timeToSignMs,
          time_to_funded_ms: e.timings.timeToFundedMs,
          time_to_actions_ms: e.timings.timeToActionsMs,
          account_activated: e.accountActivated,
          trigger_errors: e.triggerErrors,
          margin_top_up: e.marginTopUp?.status,
          margin_top_up_reason:
            void 0 === (t = e.marginTopUp) || "added" === t.status
              ? void 0
              : t.reason,
          margin_top_up_stage:
            e.marginTopUp?.status === "failed" ? e.marginTopUp.stage : void 0,
          margin_top_up_usd:
            ((i = e.marginTopUp), i?.status === "added" ? i.amountUsd : void 0),
          time_to_margin_top_up_ms: e.timings.timeToMarginTopUpMs,
          ...(void 0 === (a = e.entry)
            ? {}
            : {
                entry_presigned: a.presigned,
                entry_fallback: a.fallback,
                await_funding_ms: a.awaitFundingMs,
              }),
          ...(void 0 === (s = e.presign)
            ? {}
            : {
                presign: s.outcome,
                presign_source: s.source,
                presign_age_ms: s.ageMs,
                presign_wait_ms: s.waitMs,
                presign_fallback: s.fallback,
                presign_confirm: s.confirm,
                presign_confirm_result: s.confirmResult,
                presign_confirm_ms: s.confirmMs,
                presign_withdraw: s.withdraw,
              }),
          payout_fast_sign: e.payoutFastSign,
          payout_build_first_wait_ms: e.payoutBuildFirstWaitMs,
          rail: e.rail,
          rail_requested: e.railRequested,
          rail_fallback_reason: e.railFallbackReason,
          payout_asset: e.payoutAsset,
          send_attempts: e.sendAttempts,
          spot_model: e.spotModel,
          total_ms: e.totalMs,
        });
      },
      "_",
      0,
      (e, t) => ("withdrawn" === e.status ? (e.denominationOut ?? t) : t),
      "s",
      0,
      (e, t) => {
        let r = e?.[t];
        return "string" == typeof r
          ? r
          : "number" == typeof r && Number.isFinite(r)
            ? ((e) => {
                let t = /^(-?)(\d+)(?:\.(\d+))?e([+-]?\d+)$/i.exec(e);
                if (!t) return e;
                let [, r = "", i = "", a = "", s = "0"] = t,
                  n = `${i}${a}`,
                  o = Number(s) - a.length;
                if (o >= 0) return `${r}${n}${"0".repeat(o)}`;
                let d = n.length + o;
                return d > 0
                  ? `${r}${n.slice(0, d)}.${n.slice(d)}`
                  : `${r}0.${"0".repeat(-d)}${n}`;
              })(String(r))
            : void 0;
      },
      "t",
      0,
      ({ ms: e, signal: t }) =>
        new Promise((r, i) => {
          if (t?.aborted) return void i(I());
          let a = () => {
              (clearTimeout(s), i(I()));
            },
            s = setTimeout(() => {
              (t?.removeEventListener("abort", a), r());
            }, e);
          t?.addEventListener("abort", a, { once: !0 });
        }),
      "W",
      0,
      (e) => {
        if (e?.aborted) throw e.reason ?? I();
      },
    ],
    967936,
  );
};
