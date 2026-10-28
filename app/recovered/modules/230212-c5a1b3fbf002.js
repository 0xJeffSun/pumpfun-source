// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    r = e.i(613677),
    i = e.i(342463),
    a = e.i(866890),
    s = e.i(727464),
    n = e.i(418096),
    o = e.i(169119),
    d = e.i(637782),
    l = e.i(33508);
  let u = ["", "spot"],
    p = /^0x[0-9a-fA-F]{40}$/,
    _ = r.z
      .object({
        message: r.z
          .object({
            destination: i.z.string(),
            sourceDex: i.z.string(),
            destinationDex: i.z.string(),
            token: i.z.string(),
            amount: i.z.string(),
          })
          .passthrough(),
      })
      .passthrough(),
    c = (e) => {
      let t = e.trim();
      if (!/^\d+(\.\d+)?$/.test(t)) return null;
      let [r = "0", i = ""] = t.split("."),
        a = r.replace(/^0+(?=\d)/, ""),
        s = i.replace(/0+$/, "");
      return 0 === s.length ? a : `${a}.${s}`;
    },
    m = ({
      sendAssetTypedData: e,
      amountUsdc: t,
      balanceSource: r,
      evmWallet: i,
    }) => {
      var a;
      let s,
        n,
        o = _.safeParse(e);
      if (!o.success) return "send_asset_unreadable";
      let { message: d } = o.data;
      if (
        ((a = d.amount),
        (s = c(a)),
        (n = c(t)),
        null === s || null === n || s !== n)
      )
        return "amount_mismatch";
      if ("USDC:0x6d1e7cde53ba9467b783cb7c530ce054" !== d.token)
        return "token_mismatch";
      let l = void 0 === r ? void 0 : "spot" === r ? "spot" : "";
      return u.includes(d.sourceDex) && (void 0 === l || d.sourceDex === l)
        ? "spot" !== d.destinationDex
          ? "destination_dex_mismatch"
          : p.test(d.destination)
            ? d.destination.toLowerCase() === i.toLowerCase()
              ? "destination_is_own_wallet"
              : null
            : "destination_invalid"
        : "source_dex_mismatch";
    };
  e.s(
    [
      "Q",
      0,
      m,
      "S",
      0,
      ({ rail: e, hasNonceMapping: t }) =>
        "bridge" === e && t
          ? "bridge_with_nonce_mapping"
          : "relay" !== e || t
            ? null
            : "relay_without_nonce_mapping",
    ],
    892004,
  );
  let w = "withdraw_unreadable",
    g = r.z.object({
      request_id: i.z.string(),
      templates: a.z.array(s.z.unknown()),
      typed_data: a.z.array(s.z.unknown()),
      amount_usdc: i.z.string(),
      out_amount: i.z.string(),
      denomination_out: n.z.enum(["sol", "usdc"]),
      close_notional_usdc: i.z.string().nullish(),
    }),
    h = r.z.object({ reason: i.z.string(), message: i.z.string() }),
    f = r.z.object({
      actions: a.z.array(
        r.z.object({
          kind: i.z.string(),
          status: n.z.enum(["ready", "skipped"]),
          typed_data: s.z.unknown(),
          template: s.z.unknown(),
          summary: o.z.record(i.z.string(), s.z.unknown()),
          skip_reason: i.z.string().nullish(),
        }),
      ),
      nonce_base: d.z.number(),
      expires_after: d.z.number(),
      withdraw: s.z.unknown().optional(),
      withdraw_error: s.z.unknown().optional(),
    }),
    y = async ({ request: e, signal: r }) => {
      let i = await (0, l.m)({ path: l.b.actionsBuild, json: e, signal: r }),
        a = (0, l.E)({ schema: f, body: i, label: "build perp actions" });
      return {
        ...b(a),
        ...(({ withdraw: e, withdrawError: r, asked: i, evmWallet: a }) => {
          if (null != e) {
            let r,
              i = g.safeParse(e);
            if (
              !i.success ||
              2 !== i.data.templates.length ||
              2 !== i.data.typed_data.length
            ) {
              let e = i.success
                ? "two templates and two typed datas expected"
                : i.error.message;
              return (
                t.y.error("[perpActionsBuild] withdraw_unreadable", {
                  error: e,
                }),
                { withdrawError: { reason: w, message: e } }
              );
            }
            let [s, n] = i.data.typed_data,
              [o, d] = i.data.templates,
              l =
                m({
                  sendAssetTypedData: s,
                  amountUsdc: i.data.amount_usdc,
                  evmWallet: a,
                }) ??
                m({
                  sendAssetTypedData: n,
                  amountUsdc: i.data.amount_usdc,
                  evmWallet: a,
                });
            return null !== l
              ? (t.y.warn("[perpActionsBuild] withdraw_rail_check_failed", {
                  check: l,
                  request_id: i.data.request_id,
                  evm_wallet: a,
                }),
                {
                  withdrawError: {
                    reason: "withdraw_unsignable",
                    message: `withdraw transfer refused: ${l}`,
                  },
                })
              : {
                  withdraw: {
                    requestId: i.data.request_id,
                    templates: [o, d],
                    typedData: [s, n],
                    amountUsdc: i.data.amount_usdc,
                    outAmount: i.data.out_amount,
                    denominationOut: i.data.denomination_out,
                    closeNotionalUsdc:
                      null != (r = i.data.close_notional_usdc) && Number(r) > 0
                        ? r
                        : void 0,
                  },
                };
          }
          if (null != r) {
            let e = h.safeParse(r);
            return {
              withdrawError: e.success
                ? e.data
                : { reason: w, message: e.error.message },
            };
          }
          return i
            ? {
                withdrawError: {
                  reason: "withdraw_not_served",
                  message: "the build served no withdraw beside the close",
                },
              }
            : {};
        })({
          withdraw: a.withdraw,
          withdrawError: a.withdraw_error,
          asked: void 0 !== e.withdraw,
          evmWallet: e.evm_wallet,
        }),
      };
    },
    b = (e) => ({
      actions: e.actions.map((e) => ({
        kind: e.kind,
        status: e.status,
        typedData: e.typed_data,
        template: e.template,
        summary: e.summary,
        skipReason: e.skip_reason ?? void 0,
      })),
      nonceBase: e.nonce_base,
      expiresAfter: e.expires_after,
    });
  e.s(["m", 0, b, "c", 0, y, "$", 0, f], 230212);
  var v = e.i(297865);
  let z = r.z.object({
      results: a.z.array(
        r.z.object({
          kind: i.z.string(),
          status: n.z.enum(["ok", "error", "skipped"]),
          oid: d.z.number().nullish(),
          filled: r.z
            .object({ total_sz: i.z.string(), avg_px: i.z.string() })
            .nullish(),
          resting: v.z.boolean().nullish(),
          error: r.z
            .object({
              reason: i.z.string(),
              retryable: v.z.boolean(),
              message: i.z.string(),
            })
            .nullish(),
          trigger_errors: a.z.array(i.z.string()).optional(),
        }),
      ),
      stopped_at: d.z.number().nullish(),
      withdraw: r.z
        .object({ request_id: i.z.string(), status: i.z.string() })
        .nullish()
        .catch(void 0),
    }),
    k = async ({ request: e, signal: t }) => {
      let r = await (0, l.m)({
          path: l.b.actionsSend,
          json: e,
          retryLimit: 0,
          timeoutMs: l.t,
          signal: t,
        }),
        i = (0, l.E)({ schema: z, body: r, label: "send perp actions" });
      return {
        results: i.results.map((e) => ({
          kind: e.kind,
          status: e.status,
          oid: e.oid ?? void 0,
          filled: e.filled
            ? { totalSz: e.filled.total_sz, avgPx: e.filled.avg_px }
            : void 0,
          resting: e.resting ?? void 0,
          error: e.error ?? void 0,
          triggerErrors:
            e.trigger_errors && e.trigger_errors.length > 0
              ? e.trigger_errors
              : void 0,
        })),
        stoppedAt: i.stopped_at ?? void 0,
        ...(i.withdraw
          ? {
              withdraw: {
                requestId: i.withdraw.request_id,
                status: i.withdraw.status,
              },
            }
          : {}),
      };
    };
  e.s(["f", 0, k], 692992);
  var x = e.i(971370),
    q = e.i(344048),
    A = e.i(577696),
    S = e.i(417326);
  let E = r.z.object({
      deposit_usdc: i.z.string(),
      deposit_usdc_formatted: i.z.string(),
      fees: r.z.object({
        relay_gas: i.z.string(),
        relayer: i.z.string(),
        activation_fee_usd: i.z.string().nullish(),
        app_fee: i.z.string(),
        app_fee_usd: i.z.string().nullish(),
        total_usd: i.z.string(),
      }),
      account_exists: v.z.boolean(),
      estimated_position: r.z.object({
        coin: i.z.string(),
        side: n.z.enum(["long", "short"]),
        leverage: d.z.number(),
        entry_px_est: i.z.string(),
        limit_px: i.z.string().optional(),
        size: i.z.string(),
        notional_usd: i.z.string(),
        margin_usd: i.z.string(),
        est_liquidation_px: i.z.string(),
        builder_fee_usd: i.z.string(),
        taker_fee_usd: i.z.string(),
        price_impact_bps: d.z.number().nullish(),
        book_depth_exceeded: v.z.boolean().nullish(),
      }),
      combined_position: r.z
        .object({
          size: i.z.string(),
          avg_entry_px_est: i.z.string(),
          notional_usd: i.z.string(),
          margin_usd: i.z.string(),
          est_liquidation_px: i.z.string(),
        })
        .nullish(),
      ttl_seconds: d.z.number(),
      expires_at: d.z.number(),
      sponsored: v.z.boolean(),
      venue: S.z.literal("hyperliquid"),
      limits: r.z
        .object({ min_order_usd: d.z.number(), min_deposit_usd: d.z.number() })
        .nullish(),
      rail: n.z
        .enum(["relay", "bridge"])
        .nullish()
        .catch(void 0),
      rail_fallback_reason: i.z.string().nullish(),
    }),
    I = (e) => ({
      depositUsdc: e.deposit_usdc,
      depositUsdcFormatted: e.deposit_usdc_formatted,
      fees: {
        relayGas: e.fees.relay_gas,
        relayer: e.fees.relayer,
        activationFeeUsd: e.fees.activation_fee_usd ?? void 0,
        appFee: e.fees.app_fee,
        appFeeUsd: e.fees.app_fee_usd ?? void 0,
        totalUsd: e.fees.total_usd,
      },
      accountExists: e.account_exists,
      estimatedPosition: {
        coin: e.estimated_position.coin,
        side: e.estimated_position.side,
        leverage: e.estimated_position.leverage,
        entryPxEst: e.estimated_position.entry_px_est,
        limitPx: e.estimated_position.limit_px,
        size: e.estimated_position.size,
        notionalUsd: e.estimated_position.notional_usd,
        marginUsd: e.estimated_position.margin_usd,
        estLiquidationPx: e.estimated_position.est_liquidation_px,
        builderFeeUsd: e.estimated_position.builder_fee_usd,
        takerFeeUsd: e.estimated_position.taker_fee_usd,
        priceImpactBps: e.estimated_position.price_impact_bps ?? void 0,
        bookDepthExceeded: e.estimated_position.book_depth_exceeded ?? void 0,
      },
      ttlSeconds: e.ttl_seconds,
      expiresAt: e.expires_at,
      sponsored: e.sponsored,
      venue: e.venue,
      limits: e.limits
        ? {
            minOrderUsd: e.limits.min_order_usd,
            minDepositUsd: e.limits.min_deposit_usd,
          }
        : void 0,
      combinedPosition: e.combined_position
        ? {
            size: e.combined_position.size,
            avgEntryPxEst: e.combined_position.avg_entry_px_est,
            notionalUsd: e.combined_position.notional_usd,
            marginUsd: e.combined_position.margin_usd,
            estLiquidationPx: e.combined_position.est_liquidation_px,
          }
        : void 0,
      rail: e.rail ?? void 0,
      railFallbackReason: e.rail_fallback_reason ?? void 0,
    }),
    T = async ({ request: e, signal: t }) => {
      let r = await (0, l.m)({
        path: l.b.openPreview,
        json: e,
        retryLimit: 0,
        signal: t,
        logLevel: "warn",
      });
      return I((0, l.E)({ schema: E, body: r, label: "preview perp open" }));
    };
  e.s(["t", 0, I, "T", 0, T, "B", 0, E], 588807);
  let C = "entry_unreadable",
    M = E.extend({
      transaction: i.z.string(),
      request_id: i.z.string(),
      deduped: v.z.boolean(),
      entry: s.z.unknown().optional(),
      entry_error: s.z.unknown().optional(),
    }),
    U = r.z.object({ reason: i.z.string(), message: i.z.string() }),
    j = async ({ request: e, signal: r }) => {
      let i,
        a = await (0, l.m)({
          path: l.b.openBuild,
          json: e,
          txEncoding: "base58",
          signal: r,
        }),
        s = (0, l.E)({ schema: M, body: a, label: "build perp open" });
      try {
        i = x.VersionedTransaction.deserialize(q.f.decode(s.transaction));
      } catch {
        throw new A.b({
          message: "Could not decode the server-built deposit transaction",
          retryable: !1,
        });
      }
      return {
        ...I(s),
        transaction: i,
        requestId: s.request_id,
        deduped: s.deduped,
        ...(({ entry: e, entryError: r }) => {
          if (null != e) {
            let r = f.safeParse(e);
            return r.success
              ? { entry: b(r.data) }
              : (t.y.error("[perpOpenBuild] entry_unreadable", {
                  error: r.error.message,
                }),
                { entryError: { reason: C, message: r.error.message } });
          }
          if (null == r) return {};
          let i = U.safeParse(r);
          return {
            entryError: i.success
              ? i.data
              : { reason: C, message: i.error.message },
          };
        })({ entry: s.entry, entryError: s.entry_error }),
      };
    };
  e.s(["f", 0, j], 157243);
};
