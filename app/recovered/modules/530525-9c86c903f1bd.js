// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    r = e.i(418096),
    i = e.i(342463),
    a = e.i(613677),
    s = e.i(637782),
    n = e.i(727464),
    o = e.i(751228),
    d = e.i(33508),
    l = e.i(577696),
    u = e.i(892004),
    p = e.i(589750);
  let _ = r.z
      .enum(["perps", "spot"])
      .nullish()
      .catch(void 0),
    c = {
      amount_usdc: i.z.string(),
      balance_source: _,
      out_amount: i.z.string(),
      out_amount_min: i.z.string(),
      out_amount_usd: i.z.string().nullish(),
      fees: a.z.object({
        relayer: i.z.string(),
        app: i.z.string(),
        total_usd: i.z.string(),
      }),
      ttl_seconds: s.z.number(),
      expires_at: s.z.number(),
      rail: p.f,
      rail_fallback_reason: i.z.string().nullish(),
    },
    m = a.z.object({
      request_id: i.z.string(),
      nonce_mapping: a.z.object({ typed_data: n.z.unknown() }).nullish(),
      send_asset: a.z.object({ typed_data: n.z.unknown() }),
      template: n.z.unknown(),
      ...c,
    }),
    w = a.z.object(c),
    g = (e) => ({
      amountUsdc: e.amount_usdc,
      balanceSource: e.balance_source ?? void 0,
      outAmount: e.out_amount,
      outAmountMin: e.out_amount_min,
      outAmountUsd: e.out_amount_usd ?? void 0,
      fees: {
        relayer: e.fees.relayer,
        app: e.fees.app,
        totalUsd: e.fees.total_usd,
      },
      ttlSeconds: e.ttl_seconds,
      expiresAt: e.expires_at,
      rail: e.rail ?? void 0,
      railFallbackReason: e.rail_fallback_reason ?? void 0,
    }),
    h = async ({ request: e, signal: r }) => {
      let i = await (0, d.m)({
          path: d.b.withdrawBuild,
          json: e,
          signal: r,
          logLevel: "refusal-warn",
        }),
        a = (0, d.E)({ schema: m, body: i, label: "build perp withdraw" }),
        s = (0, o.W)(a.rail ?? void 0),
        n = null != a.nonce_mapping,
        p =
          (0, u.S)({ rail: s, hasNonceMapping: n }) ??
          ("bridge" === s
            ? (0, u.Q)({
                sendAssetTypedData: a.send_asset.typed_data,
                amountUsdc: a.amount_usdc,
                balanceSource: a.balance_source ?? void 0,
                evmWallet: e.evm_wallet,
              })
            : null);
      if (null !== p)
        throw (
          t.y.warn("[perpWithdrawBuild] payout_rail_check_failed", {
            rail: s,
            check: p,
            request_id: a.request_id,
            evm_wallet: e.evm_wallet,
          }),
          new l.b({
            retryable: !1,
            message: `Failed to build perp withdraw: ${p}`,
          })
        );
      return {
        ...g(a),
        requestId: a.request_id,
        ...(n
          ? { nonceMapping: { typedData: a.nonce_mapping?.typed_data } }
          : {}),
        sendAsset: { typedData: a.send_asset.typed_data },
        template: a.template,
      };
    },
    f = async ({ request: e, signal: t }) => {
      let r = await (0, d.m)({
        path: d.b.withdrawBuild,
        json: { ...e, rail: "bridge", quote_only: !0 },
        signal: t,
        logLevel: "refusal-warn",
      });
      return g((0, d.E)({ schema: w, body: r, label: "quote perp withdraw" }));
    };
  e.s(["S", 0, h, "T", 0, f], 530525);
  let y = a.z.object({
      request_id: i.z.string(),
      hl_status: i.z.string(),
      rail: p.f,
      rail_fallback_reason: i.z.string().nullish(),
    }),
    b = async ({ request: e, signal: t }) => {
      let r = await (0, d.m)({
          path: d.b.withdrawSend,
          json: e,
          retryLimit: 0,
          timeoutMs: d.t,
          signal: t,
        }),
        i = (0, d.E)({ schema: y, body: r, label: "send perp withdraw" });
      return {
        requestId: i.request_id,
        hlStatus: i.hl_status,
        rail: i.rail ?? void 0,
      };
    };
  e.s(["f", 0, b], 881921);
};
