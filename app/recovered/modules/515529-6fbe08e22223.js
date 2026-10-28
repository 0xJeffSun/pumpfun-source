// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(292686),
    i = e.i(322315),
    n = e.i(254010),
    s = e.i(254667),
    a = e.i(426091),
    r = e.i(914549),
    o = e.i(574472),
    d = e.i(92245),
    u = e.i(132838),
    l = e.i(606933);
  e.i(12692);
  var c = e.i(398902),
    m = e.i(63289),
    p = e.i(944322);
  e.i(70833);
  var _ = e.i(66961),
    g = e.i(593293),
    f = e.i(923427),
    y = e.i(116458),
    b = e.i(777887),
    w = e.i(38279),
    h = e.i(111740),
    v = e.i(896342),
    q = e.i(895492),
    A = e.i(618119),
    I = e.i(203941),
    S = e.i(324548),
    x = e.i(691542),
    R = e.i(553942),
    P = e.i(769953),
    U = e.i(337749),
    k = e.i(276300),
    E = e.i(170356),
    B = e.i(486813),
    M = e.i(526317),
    O = e.i(257004),
    z = e.i(541710),
    D = e.i(584229),
    T = e.i(466931),
    W = e.i(252911),
    F = e.i(330665),
    C = e.i(480133),
    H = e.i(187468),
    Q = e.i(399015),
    N = e.i(456183),
    $ = e.i(778396),
    L = e.i(460261),
    V = e.i(613677),
    j = e.i(342463),
    K = e.i(297865),
    X = e.i(637782),
    G = e.i(417326),
    J = e.i(22675),
    Z = e.i(342652);
  let Y = V.z.object({
    transaction: j.z.string(),
    request_id: j.z.string(),
    to_amount: j.z.string(),
    to_amount_min: j.z.string(),
    fees: V.z.object({
      gas: j.z.string(),
      protocol: j.z.string(),
      total: j.z.string(),
    }),
    from_amount_usd: j.z.string().nullish(),
    to_amount_usd: j.z.string().nullish(),
    total_impact_usd: j.z.string().nullish(),
    total_impact_percent: j.z.string().nullish(),
    swap_impact_usd: j.z.string().nullish(),
    swap_impact_percent: j.z.string().nullish(),
    disable_swap_provider_preference: K.z.boolean(),
    ttl_seconds: X.z.number(),
    expires_at: X.z.number(),
    sponsored: K.z.boolean(),
    venue: G.z.literal("relay"),
    deduped: K.z.boolean().optional(),
  });
  class ee extends Error {
    status;
    reason;
    retryable;
    constructor(e) {
      (super(e.message ?? e.reason ?? "Relay buy build failed"),
        (this.name = "RelayBuyBuildError"),
        (this.status = e.status),
        (this.reason = e.reason),
        (this.retryable =
          e.retryable ??
          (void 0 === e.status || e.status >= 500 || 429 === e.status)));
    }
  }
  let et = V.z.object({
    error: j.z.string().optional(),
    data: V.z
      .object({
        reason: j.z.string().optional(),
        retryable: K.z.boolean().optional(),
      })
      .optional(),
  });
  async function ei(e) {
    let t, i;
    try {
      t = await (0, Z.b)("transactions/relay-buy-build", e);
    } catch (e) {
      throw new ee({
        retryable: !0,
        message: e instanceof Error ? e.message : "Network error building buy",
      });
    }
    if (t.status < 200 || t.status >= 300) {
      var n, s;
      let e, i;
      throw (
        (n = t.status),
        (s = t.body),
        (i = (e = et.safeParse(s)).success ? e.data : void 0),
        new ee({
          status: n,
          reason: i?.data?.reason,
          retryable: i?.data?.retryable,
          message: i?.error ?? `Relay buy build failed (${n})`,
        })
      );
    }
    let a = Y.safeParse(t.body);
    if (!a.success)
      throw new ee({
        message:
          "Failed to relay-buy-build transaction: unexpected response shape",
      });
    try {
      i = (0, J.m)(a.data.transaction);
    } catch {
      throw new ee({
        message: "Could not decode the server-built deposit transaction",
      });
    }
    return {
      transaction: i,
      requestId: a.data.request_id,
      toAmount: a.data.to_amount,
      toAmountMin: a.data.to_amount_min,
      fees: a.data.fees,
      fromAmountUsd: a.data.from_amount_usd ?? void 0,
      toAmountUsd: a.data.to_amount_usd ?? void 0,
      totalImpactUsd: a.data.total_impact_usd ?? void 0,
      totalImpactPercent: a.data.total_impact_percent ?? void 0,
      swapImpactUsd: a.data.swap_impact_usd ?? void 0,
      swapImpactPercent: a.data.swap_impact_percent ?? void 0,
      disableSwapProviderPreference: a.data.disable_swap_provider_preference,
      ttlSeconds: a.data.ttl_seconds,
      expiresAt: a.data.expires_at,
      sponsored: a.data.sponsored,
      venue: a.data.venue,
      deduped: !0 === a.data.deduped,
    };
  }
  var en = e.i(410318),
    es = e.i(80126),
    ea = e.i(167156),
    er = e.i(84976),
    eo = e.i(431004),
    ed = e.i(741963),
    eu = e.i(93903),
    el = e.i(910222),
    ec = e.i(569526),
    em = e.i(51954),
    ep = e.i(707138),
    e_ = e.i(873445);
  let eg = "relay-buy",
    ef = {
      failed_to_sign_transaction: "web.toasts.bridge_deposit_sign_failed",
      failed_to_confirm_transaction: "web.toasts.bridge_intent_confirm_failed",
    };
  (e.s(
    [
      "f",
      0,
      function () {
        let { t: e } = (0, c.f)(),
          {
            wallet: V,
            address: j,
            userId: K,
            isPrivyEmbeddedSigner: X,
          } = (0, o.F)(),
          G = (0, z.l)(),
          J = (0, g.s)(),
          Z = (0, d.$)({ userId: K, address: j }),
          Y = (0, e_.f)(),
          { connection: et } = (0, _.f)(),
          { frontRunningProtection: ey } = (0, h.f)(),
          eb = (0, l.useQueryClient)(),
          ew = (0, n.k)(i.D.WEB_TRADE_SPOT_REFRESH),
          { lastClickImpression: eh } = (0, ec.y)(),
          ev = (e) =>
            void eb.invalidateQueries({
              queryKey: (0, ep.r)(
                e.mint,
                (0, L.b)(e.chainId),
                e.evmWalletAddress,
              ),
            });
        return (0, u.f)({
          mutationFn: async ({
            quoteRequest: i,
            coinSymbol: n,
            coin: o,
            tokenDecimals: d,
            spotReference: u,
            spotRefresh: l,
            impactConsent: c = null,
            analytics: _,
          }) => {
            let g, h, z;
            if (!V?.signTransaction || !j) throw Error("Wallet not connected");
            let F = (0, O.$)({
                lastClickImpression: eh,
                mint: i.mint,
                sponsored: "usdc" === i.solanaAsset,
                isPrivyEmbeddedSigner: X,
              }),
              Y = F ? { ...i, calloutUser: F } : i;
            if (!et) throw Error("No Solana connection");
            let ed = { startedAt: performance.now() },
              ec = (0, ea.s)(eh, Y.mint);
            (0, ea.f)({ quoteRequest: Y, analytics: _, attribution: ec });
            let ep = (0, ea.H)(Y),
              e_ = ew
                ? await (0, H.f)({
                    captured: u,
                    mint: Y.mint,
                    chainId: Y.chainId,
                    poolAddress: l?.poolAddress ?? null,
                    tokenDecimals: d,
                    settlementUsdPrice:
                      l?.settlementUsdPrice ?? u?.settlementUsdPrice ?? 0,
                    settlementDecimals:
                      l?.settlementDecimals ?? u?.settlementDecimals ?? 0,
                    queryClient: eb,
                  })
                : (u ?? null),
              ef = !1,
              eq = crypto.randomUUID(),
              eA = (e) =>
                (0, $.q)(e, {
                  direction: "buy",
                  spotReference: e_,
                  nowMs: Date.now(),
                }),
              eI = (e) =>
                c && (0, $.t)(c, e)
                  ? ((0, $.Q)("useSubmitRelayBuy", "buy", e, c),
                    Promise.resolve(!0))
                  : ((0, $.I)("useSubmitRelayBuy", "buy", e),
                    $.w
                      .getState()
                      .ask({ coinSymbol: n, direction: "buy", assessment: e })),
              eS = (0, L.b)(Y.chainId),
              ex = (0, q.X)(Y.solanaAsset),
              eR = (0, v._)() && (0, E.X)(eS, G),
              eP = (0, Q.G)(Y.mint),
              eU = eR && !eP,
              ek = { presign: !1 },
              eE = (e) =>
                (0, E.W)({
                  direction: "buy",
                  mint: Y.mint,
                  chain_id: eS,
                  swap_id: eq,
                  funding: ex,
                  quote_source: "server",
                  ...ek,
                  ...e,
                }),
              eB = (e) => {
                (0, P._)(e.created.intent_id) || e.feed?.close();
              },
              eM = (e, t = {}, i = {}) => (
                (z = t.code),
                eE({
                  decision: "relay_fallback",
                  fallback_stage: e,
                  fallback_code: t.code,
                  fallback_http_status: t.status,
                  fallback_message: t.message,
                  time_to_quote: performance.now() - ed.startedAt,
                  ...i,
                }),
                null
              ),
              eO = (e, t, i = {}) =>
                (0, B.f)({
                  error: e,
                  operation: t,
                  context: {
                    mint: Y.mint,
                    chainId: Y.chainId,
                    funding: ex,
                    swapId: eq,
                    ...i,
                  },
                }),
              ez = async (e) => {
                let t = (0, $.q)(e, {
                  direction: "buy",
                  spotReference: (0, q.q)(e_),
                  nowMs: Date.now(),
                });
                if (null === t.impactPercent)
                  return void s.y.warn(
                    "[useSubmitRelayBuy] unpriced_bridge_fill",
                    {
                      intent_id: e.quoteId,
                      swap_id: eq,
                      mint: Y.mint,
                      chain_id: eS,
                      amount_in_usd: e.fromAmountUsd,
                      spot_captured: null != u,
                      spot_reference_age_ms: t.spotReferenceAgeMs,
                      spot_stale: t.spotStale,
                      spot_refresh_enabled: ew,
                      gate_action: "fail_open",
                    },
                  );
                if ((t.isExtreme || t.isWarn) && !ef) {
                  if (!(await eI(t))) throw new $.l();
                  ef = !0;
                }
              },
              eD = async (t, i) => {
                let n,
                  a,
                  r = (0, P.h)({ identity: t, solPriceUsd: i });
                if (!r) return eM("sol_price", { code: "sol_price_unknown" });
                try {
                  n = await (0, v.f)(r, { idempotencyKey: eq });
                } catch (t) {
                  if ("region_restricted" === (0, E.R)(t))
                    throw new L.X(
                      (0, L.s)(
                        { status: 403, reason: L.f, message: (0, D.A)(t) },
                        { chainId: Y.chainId, t: e },
                      ),
                      { reason: L.f, status: 403 },
                    );
                  return (
                    (!(0, M.v)(t) || t.retryable) && eO(t, "create"),
                    eM("create", {
                      code: (0, M.v)(t) ? t.code : void 0,
                      status: (0, M.v)(t) ? t.status : void 0,
                      message: (0, D.A)(t) || void 0,
                    })
                  );
                }
                let o = performance.now() - ed.startedAt;
                if ((0, M.W)(n))
                  throw (
                    eE({ decision: "bridge", time_to_quote: o }),
                    new q.p({
                      message: e(q.h.bridge_held),
                      reason: "bridge_held",
                      operation: "create",
                      intentId: n.intent_id,
                      cause: Error(n.message),
                    })
                  );
                let d = n.unsigned_tx;
                if ("solana" !== d.chain)
                  return (
                    eO(
                      Error(`buy intent returned a ${d.chain} transaction`),
                      "create",
                      { intentId: n.intent_id },
                    ),
                    eM("create", { code: "unexpected_tx" })
                  );
                if (
                  "pending" !== n.quote.quote_status &&
                  null == n.quote.expected_out
                )
                  return (
                    eO(
                      Error(
                        "the create returned no expected_out to judge the fill by",
                      ),
                      "create",
                      { intentId: n.intent_id },
                    ),
                    eM("create", { code: "no_expected_out" })
                  );
                try {
                  a = (0, q.H)(d);
                } catch (e) {
                  return (
                    eO(e, "create", {
                      intentId: n.intent_id,
                      encoding: d.encoding ?? "base58",
                    }),
                    eM("create", {
                      code: "decode_failed",
                      message: (0, D.A)(e) || void 0,
                    })
                  );
                }
                return (
                  s.y.info("[useSubmitRelayBuy] bridge_intent_created", {
                    intent_id: n.intent_id,
                    intent_status: n.status,
                    swap_id: eq,
                    mint: Y.mint,
                    chain_id: eS,
                    amount_in: n.quote.amount_in,
                    requested_amount_in: n.quote.requested_amount_in ?? void 0,
                    min_out: n.quote.min_out,
                    slippage_bps: n.quote.slippage_bps,
                    quote_status: n.quote.quote_status ?? "sync",
                    funding: n.quote.funding ?? ex,
                    sponsored: null != d.fee_payer,
                    encoding: d.encoding ?? "base58",
                    time_to_quote: o,
                  }),
                  {
                    created: n,
                    transaction: a,
                    feed: (0, I.o)() ?? (0, A.r)(),
                    timeToQuote: o,
                  }
                );
              },
              eT = async (e) => {
                let t, i, n, a, o, d;
                if (eR && eP) return eM("gate", { code: "native_token" });
                if (!eU || null === eS) return null;
                if (J({ chainId: eS, mint: Y.mint }))
                  return eM("gate", { code: M.r });
                if (!K) return eM("gate", { code: "no_user_id" });
                if (!Y.evmWalletAddress)
                  return eM("gate", { code: "evm_wallet_missing" });
                if ((0, U.F)({ mint: Y.mint, chainId: eS, direction: "buy" }))
                  return eM("gate", { code: "quote_refusal_cached" });
                let u = {
                    solanaWallet: j,
                    evmWallet: Y.evmWalletAddress,
                    chainId: eS,
                    mint: Y.mint,
                    slippageBps: Y.slippageBps,
                    funding:
                      "usdc" === ex
                        ? { kind: "usdc", amountIn: Y.atomicAmount.toString() }
                        : { kind: "sol", lamports: Y.atomicAmount.toString() },
                    ...(Y.calloutUser ? { calloutUser: Y.calloutUser } : {}),
                  },
                  l = (0, P.n)(u),
                  c = eb.getQueryData(w.Q.SOL_PRICE),
                  m = () =>
                    (0, P.R)(l, {
                      spotUsdPrice: e_?.tokenUsdPrice ?? null,
                      solPriceUsd: c,
                    });
                if (void 0 !== e) t = e;
                else {
                  let e = (0, f.M)("buy", l);
                  g = e;
                  try {
                    let e = () =>
                      (0, r.F)() ? "silent_off" : (0, f.f)("buy", l, Y.mint);
                    if (
                      ((h = e()),
                      (t = m()),
                      void 0 === t.hit &&
                        ("none" === t.miss || "key" === t.miss))
                    ) {
                      let n = await (0, f.w)("buy", l);
                      n.waited &&
                        ((i = n.waitedMs), (h = e()), n.kept && (t = m()));
                    }
                  } finally {
                    e();
                  }
                }
                let p = t.hit;
                if (
                  ((ek = {
                    presign:
                      void 0 === p
                        ? t.miss
                        : void 0 === i
                          ? "hit"
                          : "inflight_hit",
                    ...(void 0 === p
                      ? {}
                      : {
                          presign_lane: p.lane,
                          presign_age_ms: Date.now() - p.signedAt,
                        }),
                    ...(void 0 === i ? {} : { presign_wait_ms: i }),
                    ...(void 0 === h ? {} : { presign_lane_state: h }),
                  }),
                  void 0 !== p)
                ) {
                  ((n = p.created), (a = p.signedTx));
                  let e = p.feed;
                  (null !== e &&
                    e.live?.() === !1 &&
                    (e.close(), (p.feed = (0, I.o)() ?? (0, A.r)())),
                    (o = p.feed),
                    (d = performance.now() - ed.startedAt),
                    s.y.info("[useSubmitRelayBuy] bridge_intent_presigned", {
                      intent_id: n.intent_id,
                      intent_status: n.status,
                      swap_id: eq,
                      mint: Y.mint,
                      chain_id: eS,
                      amount_in: n.quote.amount_in,
                      min_out: n.quote.min_out,
                      slippage_bps: n.quote.slippage_bps,
                      quote_status: p.quoteStatus,
                      funding: p.identity.funding.kind,
                      lane: p.lane,
                      presign_lane: p.lane,
                      presign_age_ms: ek.presign_age_ms,
                      presign_wait_ms: i,
                      presign_create_ms: Math.round(p.createMs),
                      presign_sign_ms: Math.round(p.signMs),
                      time_to_quote: d,
                    }));
                } else {
                  let e = await eD(u, c);
                  if (null === e) return null;
                  ({ created: n, transaction: a, feed: o, timeToQuote: d } = e);
                }
                let _ =
                    void 0 === p
                      ? "pending" === n.quote.quote_status
                      : "pending" === p.quoteStatus,
                  y = n.quote.amount_in,
                  b = (0, q.i)({ created: n, amountIn: y });
                if (!_) {
                  try {
                    await ez(b);
                  } catch (e) {
                    throw (void 0 !== p ? eB(p) : o?.close(), e);
                  }
                  if (void 0 !== p && (0, P.b)(p))
                    return (
                      eB(p),
                      s.y.info("[useSubmitRelayBuy] presign_aged_in_gate", {
                        intent_id: n.intent_id,
                        age_ms: Date.now() - p.createdAt,
                        swap_id: eq,
                        mint: Y.mint,
                        chain_id: eS,
                      }),
                      eT({ miss: "expired" })
                    );
                  eE({
                    decision: "bridge",
                    time_to_quote: d,
                    slippage_bps: n.quote.slippage_bps,
                    effective_slippage_bps: n.quote.slippage_bps,
                    async_quote: !1,
                  });
                }
                return (
                  (ed.quotedAt = performance.now()),
                  {
                    venue: "bridge",
                    transaction: a,
                    requestId: n.intent_id,
                    quote: b,
                    bridge: {
                      created: n,
                      feed: o,
                      funding: ex,
                      amountIn: y,
                      quotePending: _,
                      presigned: p,
                      presign: ek,
                    },
                  }
                );
              },
              eW = async (e) => {
                let t,
                  i,
                  {
                    created: n,
                    feed: a,
                    quotePending: r,
                    amountIn: o,
                    presigned: d,
                  } = e.bridge,
                  u = n.intent_id,
                  l = new AbortController(),
                  c = r
                    ? (0, k.Z)({ intentId: u, feed: a, signal: l.signal })
                    : void 0;
                if ((c?.catch(() => void 0), void 0 !== d))
                  ((t = e.transaction),
                    (i = d.depositSignature),
                    (ed.signedAt = performance.now()));
                else {
                  try {
                    t = await eQ(e);
                  } catch (e) {
                    throw (
                      l.abort(),
                      a?.close(),
                      new q.p({
                        message: (0, D.A)(e) || "Failed to sign the deposit",
                        reason: "failed_to_sign_transaction",
                        operation: "sign",
                        intentId: u,
                        cause: e,
                      })
                    );
                  }
                  i = (0, C.w)(t);
                }
                let m = e;
                if (c) {
                  let t;
                  try {
                    t = await c;
                  } catch (e) {
                    return (
                      a?.close(),
                      void 0 !== d && (0, P.o)(u),
                      eO(e, "quote_wait", { intentId: u }),
                      eM(
                        "async_quote",
                        {
                          code: "quote_unreadable",
                          message: (0, D.A)(e) || void 0,
                        },
                        { async_quote: !0 },
                      )
                    );
                  }
                  if ("failed" === t.status)
                    return (
                      a?.close(),
                      void 0 !== d && (0, P.o)(u),
                      eM("async_quote", { code: t.code }, { async_quote: !0 })
                    );
                  void 0 !== d &&
                    (0, P.T)(d, {
                      status: "ready",
                      expectedOut: t.expectedOut,
                      minOut: t.minOut,
                      slippageBps: t.slippageBps,
                    });
                  let i = (0, q.i)({
                    created: n,
                    amountIn: o,
                    fill: { expectedOut: t.expectedOut, minOut: t.minOut },
                  });
                  try {
                    await ez(i);
                  } catch (e) {
                    throw (void 0 !== d ? eB(d) : a?.close(), e);
                  }
                  (eE({
                    decision: "bridge",
                    time_to_quote: performance.now() - ed.startedAt,
                    slippage_bps: t.slippageBps,
                    effective_slippage_bps: t.slippageBps,
                    async_quote: !0,
                  }),
                    (m = { ...e, quote: i }));
                }
                void 0 !== d && (0, P.w)(u);
                let p = performance.now(),
                  _ = await (0, q.s)(t);
                if ("failed" === _.kind)
                  throw (
                    a?.close(),
                    new q.p({
                      message: _.message,
                      reason: "failed_to_send_transaction",
                      operation: "send",
                      intentId: u,
                      signatures: [i],
                      cause: Error(_.message),
                    })
                  );
                let g = _.result.signature || i;
                if (_.result.confirmed && !_.result.succeeded) {
                  a?.close();
                  let e =
                    _.result.error ?? "deposit transaction failed on-chain";
                  throw new q.p({
                    message: e,
                    reason: "failed_to_send_transaction",
                    operation: "send",
                    intentId: u,
                    signatures: [g],
                    cause: Error(e),
                  });
                }
                return (
                  s.y.info("[useSubmitRelayBuy] bridge_deposit_sent", {
                    intent_id: u,
                    signature: g,
                    confirmed: _.result.confirmed,
                    swap_id: eq,
                    mint: Y.mint,
                    chain_id: eS,
                    funding: e.bridge.funding,
                    async_quote: r,
                    send_attempts: _.attempts,
                    send_ms: performance.now() - p,
                    presigned: void 0 !== d,
                    ...e.bridge.presign,
                  }),
                  {
                    venue: "bridge",
                    attempt: m,
                    signature: g,
                    sendResult: _.result,
                    sendAttempts: _.attempts,
                  }
                );
              },
              eF = async ({ attempt: t, signature: i, sendAttempts: a }) => {
                let r,
                  {
                    created: u,
                    feed: l,
                    funding: c,
                    quotePending: _,
                  } = t.bridge,
                  g = u.intent_id,
                  f = ({ reason: t, cause: n, txHashes: s = [] }) =>
                    new q.p({
                      message: e(q.h[t]),
                      reason: t,
                      operation: "settle",
                      intentId: g,
                      signatures: [i, ...s],
                      cause: n,
                    });
                try {
                  r = await (0, x.H)({
                    intentId: g,
                    direction: "buy",
                    feed: l,
                    settleFromEvent: !0,
                  });
                } catch (t) {
                  if (t instanceof x.F)
                    throw (
                      (0, R.f)({
                        intentId: g,
                        direction: "buy",
                        onOutcome: ({ outcome: t, intent: s }) =>
                          (({ outcome: t, intent: i, signature: s }) => {
                            if ("success" === t.kind) {
                              let e = Y.solanaAsset ?? "sol";
                              ((0, p.P)({
                                mint: Y.mint,
                                coin: o,
                                type: "buy",
                                symbol: n,
                                tokenAmountUi:
                                  Number((0, S.i)(i) ?? BigInt(0)) / 10 ** d,
                                solAmountUi:
                                  Number(Y.atomicAmount) / 10 ** (0, er.q)(e),
                                settlementSymbol: "usdc" === e ? "USDC" : "SOL",
                                signature: s,
                                replaceToastId: eg,
                              }),
                                (0, eu.K)({
                                  mint: Y.mint,
                                  walletAddress: Y.solanaWalletAddress,
                                  direction: "buy",
                                  chainId: Y.chainId,
                                  signature: (0, S.a)(i).txHashes[0],
                                  ...(0, eu.Q)({
                                    boughtAtomic: (
                                      (0, S.i)(i) ?? BigInt(0)
                                    ).toString(),
                                    quoteSpentAtomic: Y.atomicAmount.toString(),
                                    quoteMint: (0, er.F)(e),
                                    solUsdPrice: eb.getQueryData(w.Q.SOL_PRICE),
                                    tokenDecimals: d,
                                  }),
                                }),
                                ev(Y));
                              return;
                            }
                            let a = (0, el.D)({
                              t: e,
                              side: "buy",
                              symbol: n,
                              reason: e(q.h[t.code]),
                            });
                            m.c.error(a.message, {
                              id: eg,
                              description: a.description,
                            });
                          })({ outcome: t, intent: s, signature: i }),
                      }),
                      new q.p({
                        message: e("web.trade.bridge_pending_body"),
                        reason: "bridge_confirmation_pending",
                        operation: "settle",
                        intentId: g,
                        signatures: [i],
                        cause: t,
                      })
                    );
                  if (t instanceof S.B) throw f({ reason: t.code, cause: t });
                  throw new q.p({
                    message:
                      (0, D.A)(t) || "Failed to confirm the bridge intent",
                    reason: "failed_to_confirm_transaction",
                    operation: "settle",
                    intentId: g,
                    signatures: [i],
                    cause: t,
                  });
                } finally {
                  l?.close();
                }
                let y = r.intent,
                  { inTxHashes: b, txHashes: h } = (0, S.a)(y),
                  v = (0, S.Z)(y);
                if ("success" !== v.kind)
                  throw f({
                    reason: v.code,
                    cause: Error(v.failReason ?? `bridge intent ${y.status}`),
                    txHashes: h,
                  });
                let A = {
                  intentId: g,
                  settledFrom: r.settledFrom,
                  settleWaitMs: r.waitMs,
                  polls: r.polls,
                  pushes: r.pushes,
                  socketOpenMs: r.socketOpenMs,
                  funding: c,
                  quoteSource: "server",
                  asyncQuote: _,
                  presigned: void 0 !== t.bridge.presigned,
                  presignAgeMs: t.bridge.presign.presign_age_ms,
                  presignLane: t.bridge.presigned?.lane,
                };
                s.y.info("[useSubmitRelayBuy] bridge_intent_settled", {
                  intent_id: g,
                  intent_status: y.status,
                  swap_id: eq,
                  settle_from: r.settledFrom,
                  settle_wait_ms: r.waitMs,
                  settle_polls: r.polls,
                  settle_pushes: r.pushes,
                  socket_open_ms: r.socketOpenMs,
                  send_attempts: a,
                });
                let I = (0, S.i)(y),
                  P = { status: "success", inTxHashes: [i, ...b], txHashes: h };
                return {
                  attempt: t,
                  signature: i,
                  quote: {
                    ...t.quote,
                    toAmount: null === I ? t.quote.toAmount : I.toString(),
                  },
                  settlement: P,
                  bridge: A,
                };
              },
              eC = async (t) => {
                var i;
                let n,
                  a = +(void 0 !== t),
                  r = (({ tapId: e, attempt: t }) =>
                    0 === t ? e : `${e}:${t}`)({ tapId: eq, attempt: a }),
                  o = (function ({
                    quoteRequest: e,
                    overridePriceImpact: t,
                    swapId: i,
                  }) {
                    let n = (0, L.L)(e.chainId);
                    if (!n) return null;
                    let s = {
                      user: e.solanaWalletAddress,
                      evm_chain: n,
                      to_token: e.mint,
                      amount: e.atomicAmount.toString(),
                      denomination:
                        (e.solanaAsset ?? "sol") === "usdc" ? "usd" : "sol",
                      recipient_evm: e.evmWalletAddress,
                      slippage_bps: e.slippageBps,
                      disable_swap_provider_preference: !0,
                      ...("buy" === e.direction && e.calloutUser
                        ? { callout_user: e.calloutUser }
                        : {}),
                    };
                    return (
                      t && (s.override_price_impact = !0),
                      i && (s.swap_id = i),
                      s
                    );
                  })({ quoteRequest: Y, overridePriceImpact: ef, swapId: r });
                if (!o)
                  throw Error(
                    "This chain isn't supported for cross-chain trading yet.",
                  );
                let d = (t) =>
                  new L.X(
                    (0, L.s)(
                      {
                        status: t.status,
                        reason: t.reason,
                        message: t.message,
                      },
                      { chainId: Y.chainId, t: e },
                    ),
                    { reason: t.reason, status: t.status },
                  );
                try {
                  n = await ei(o);
                } catch (e) {
                  if (
                    e instanceof ee &&
                    "SWAP_IMPACT_TOO_HIGH" === e.reason &&
                    !ef &&
                    void 0 === t
                  ) {
                    let t = await (0, L.E)({ ...Y, overridePriceImpact: !0 });
                    if ("error" === t.kind) throw d(e);
                    if (!(await eI(eA(t.data)))) throw new $.l();
                    ef = !0;
                    try {
                      n = await ei({ ...o, override_price_impact: !0 });
                    } catch (e) {
                      throw e instanceof ee ? d(e) : e;
                    }
                  } else if (e instanceof ee) throw d(e);
                  else throw e;
                }
                (n.deduped &&
                  s.y.warn("[useSubmitRelayBuy] dedup_coalesced_submission", {
                    mint: Y.mint,
                    requestId: n.requestId,
                    swap_id: r,
                    attempt: a,
                  }),
                  t &&
                    !(0, es.G)(n.toAmountMin, t.floor) &&
                    ((t) => {
                      throw (
                        s.y.warn(
                          "[useSubmitRelayBuy] relay_auto_retry_below_floor",
                          {
                            mint: Y.mint,
                            trade_direction: "buy",
                            via_api_service: !0,
                            original_min_out: t.retry.floor,
                            fresh_min_out: t.freshMinOut,
                          },
                        ),
                        (0, eo.w)({
                          settlement: t.retry.attempt0Failure,
                          direction: "buy",
                          executedViaApiService: !0,
                          signatures: t.retry.attempt0Failure.signatures,
                          messageOverride: es.B.buy,
                          t: e,
                        })
                      );
                    })({ retry: t, freshMinOut: n.toAmountMin }));
                let u =
                    ((i = n),
                    {
                      fromAmount: Y.atomicAmount.toString(),
                      toAmount: i.toAmount,
                      toAmountMin: i.toAmountMin,
                      exchangeRate: "",
                      fees: i.fees,
                      transactions: [],
                      provider: i.venue,
                      expiresAt: i.expiresAt,
                      quoteId: i.requestId,
                      fromAmountUsd: i.fromAmountUsd,
                      toAmountUsd: i.toAmountUsd,
                      totalImpactUsd: i.totalImpactUsd,
                      totalImpactPercent: i.totalImpactPercent,
                      swapImpactUsd: i.swapImpactUsd,
                      swapImpactPercent: i.swapImpactPercent,
                    }),
                  l = eA(u);
                if ((l.isExtreme || l.isWarn) && !ef) {
                  if (!(await eI(l))) throw new $.l();
                  ef = !0;
                }
                return {
                  venue: "relay",
                  transaction: n.transaction,
                  requestId: n.requestId,
                  quote: u,
                };
              },
              eH = async (e) => {
                let t = await eC(e);
                return ((ed.quotedAt = performance.now()), t);
              },
              eQ = async (e) => {
                let t = (0, W.U)(e.transaction),
                  i = await (0, b._)(() => V.signTransaction(e.transaction));
                ed.signedAt = performance.now();
                let n = (0, W._)(t, i);
                if ("rebuilt-unsigned" === n.kind) {
                  let t = {
                    mint: Y.mint,
                    chainId: Y.chainId,
                    denomination: Y.solanaAsset ?? "sol",
                    requestId: e.requestId,
                    walletName: (0, a.Y)(),
                    messageMutation: n.report.kinds.join(","),
                    messageMutationSummary: n.report.summary,
                  };
                  "bridge" === e.venue
                    ? (0, B.f)({
                        error: Error(
                          "wallet rebuilt an unsigned bridge deposit message",
                        ),
                        operation: "sign",
                        context: t,
                      })
                    : (0, T.l)({
                        error: Error(
                          "wallet rebuilt an unsigned relay deposit message",
                        ),
                        feature: "relay",
                        operation: "relay-buy-sign",
                        context: t,
                      });
                }
                return i;
              },
              eN = async (e) => {
                let t = await eQ(e),
                  i = (0, L.t)(e.requestId),
                  n = await em.f
                    .getState()
                    .sendSignedTransaction({
                      signedTx: t,
                      frontRunningProtection: ey,
                    });
                if (!n) throw Error("Failed to broadcast deposit transaction");
                return {
                  venue: "relay",
                  attempt: e,
                  sendResult: n,
                  settlementPromise: i,
                };
              },
              e$ = async ({
                attempt: t,
                sendResult: i,
                settlementPromise: s,
              }) => {
                (await i.confirmTxPromise,
                  (0, N.h)({
                    requestId: t.requestId,
                    chainId: N.D,
                    txHash: i.signature,
                  }));
                let a = await s;
                if (!a)
                  throw (
                    (0, en.f)({
                      requestId: t.requestId,
                      context: {
                        side: "buy",
                        coinSymbol: n,
                        mint: Y.mint,
                        chainId: Y.chainId,
                        evmWalletAddress: Y.evmWalletAddress,
                        queryClient: eb,
                        analytics: {
                          quoteRequest: Y,
                          analytics: _,
                          tokenAmount: Number(t.quote.toAmount) / 10 ** d,
                          settlementLeg: ep,
                          originSignatures: [i.signature],
                          executedViaApiService: !0,
                          timing: ed,
                        },
                      },
                    }),
                    new eo.P(t.requestId)
                  );
                if ("success" !== a.status)
                  throw (0, eo.w)({
                    settlement: a,
                    direction: "buy",
                    executedViaApiService: !0,
                    signatures: [i.signature],
                    t: e,
                  });
                return {
                  attempt: t,
                  signature: i.signature,
                  quote: t.quote,
                  settlement: a,
                  bridge: void 0,
                };
              },
              eL = () =>
                Z && !eP
                  ? {
                      mint: Y.mint,
                      existingCalloutPromise: (0, y.n)(eb, Z, Y.mint),
                      screen: t.Ae.COIN_DETAILS,
                    }
                  : void 0,
              eV = async (e, t) => {
                let i = await ("bridge" === e.venue ? eF(e) : e$(e));
                return {
                  signature: i.signature,
                  settlement: i.settlement,
                  quote: i.quote,
                  buyCalloutCta: t,
                  settlementLeg: ep,
                  timing: ed,
                  settledAt: performance.now(),
                  venue: i.attempt.venue,
                  bridge: i.bridge,
                  attribution: ec,
                };
              },
              ej = eU ? (0, f.U)() : void 0,
              eK = (e) => {
                let t = Number(e.quote.toAmount) / 10 ** d;
                return Number.isFinite(t) && t > 0 ? t : null;
              },
              eX = async () => {
                let t = await eT(),
                  i = t ? await eW(t) : null;
                if (i)
                  return await (0, p.S)(
                    {
                      toastId: eg,
                      side: "buy",
                      symbol: n,
                      chainId: Y.chainId,
                      coin: o,
                      tokenAmountUi: eK(i.attempt),
                    },
                    () => eV(i, eL()),
                  );
                let a = (0, E.c)({
                  chainId: eS,
                  userId: K,
                  mint: Y.mint,
                  direction: "buy",
                  gateCode: z,
                  exposure: G,
                });
                if (a) throw (0, E.b)(a, e);
                ef = !1;
                let r = await eH(),
                  d = await eN(r);
                return await (0, p.S)(
                  {
                    toastId: eg,
                    side: "buy",
                    symbol: n,
                    chainId: Y.chainId,
                    coin: o,
                    tokenAmountUi: eK(r),
                  },
                  async () => {
                    let e = eL();
                    try {
                      return await eV(d, e);
                    } catch (n) {
                      let t;
                      if (!(0, es.y)(n)) throw n;
                      s.y.warn(
                        "[useSubmitRelayBuy] relay_slippage_auto_retry",
                        {
                          mint: Y.mint,
                          trade_direction: "buy",
                          via_api_service: !0,
                          relay_fail_reason: n.failReason,
                        },
                      );
                      let i = {
                        status: n.status,
                        failReason: n.failReason,
                        details: n.details,
                        signatures: n.signatures,
                      };
                      try {
                        t = await eH({
                          floor: (0, es.x)(r.quote.toAmountMin),
                          attempt0Failure: i,
                        });
                      } catch (e) {
                        if (e instanceof eo.O) throw e;
                        throw (
                          e instanceof $.l ||
                            s.y.error(
                              "[useSubmitRelayBuy] relay_slippage_auto_retry_requote_failed",
                              {
                                mint: Y.mint,
                                requote_error:
                                  e instanceof Error ? e.message : String(e),
                              },
                            ),
                          n
                        );
                      }
                      return await eV(await eN(t), e);
                    }
                  },
                );
              },
              eG = !1;
            try {
              return await eX();
            } catch (e) {
              throw ((eG = e instanceof $.l), e);
            } finally {
              (g?.(), ej?.(), j && !eG && (0, P.c)(j));
            }
          },
          onSuccess: (
            e,
            {
              coinSymbol: t,
              coin: i,
              quoteRequest: n,
              tokenDecimals: s,
              analytics: a,
            },
          ) => {
            let r = n.solanaAsset ?? "sol",
              o = Number(e.quote.toAmount) / 10 ** s;
            ((0, p.P)({
              mint: n.mint,
              coin: i,
              type: "buy",
              symbol: t,
              tokenAmountUi: o,
              solAmountUi: Number(n.atomicAmount) / 10 ** (0, er.q)(r),
              settlementSymbol: "usdc" === r ? "USDC" : "SOL",
              signature: e.signature,
              replaceToastId: eg,
              buyCalloutCta: e.buyCalloutCta,
            }),
              (0, eu.K)({
                mint: n.mint,
                walletAddress: n.solanaWalletAddress,
                direction: "buy",
                chainId: n.chainId,
                signature: e.settlement.txHashes?.[0],
                ...(0, eu.Q)({
                  boughtAtomic: e.quote.toAmount,
                  quoteSpentAtomic: n.atomicAmount.toString(),
                  quoteMint: (0, er.F)(r),
                  solUsdPrice: eb.getQueryData(w.Q.SOL_PRICE),
                  tokenDecimals: s,
                }),
              }),
              (0, ea.A)({
                quoteRequest: n,
                analytics: a,
                tokenAmount: o,
                settlementLeg: e.settlementLeg,
                signatures: [
                  e.signature,
                  ...(e.settlement.inTxHashes ?? []),
                  ...(e.settlement.txHashes ?? []),
                ],
                executedViaApiService: !0,
                timing: e.timing,
                settledAt: e.settledAt,
                provider: "bridge" === e.venue ? ea.$ : void 0,
                bridge: e.bridge,
                attribution: e.attribution,
              }),
              ev(n),
              (0, ed.B)({
                solAddress: j,
                evmAddress: n.evmWalletAddress,
                signProof: Y,
              }));
          },
          onError: (t, { coinSymbol: i, quoteRequest: n, analytics: s }) => {
            if (t instanceof $.l) return void m.c.dismiss(eg);
            if (t instanceof q.p) {
              let r = { intentId: t.intentId };
              if ((0, D.S)(t.cause)) {
                ((0, ea.d)({
                  quoteRequest: n,
                  analytics: s,
                  error: t.cause,
                  executedViaApiService: !0,
                  provider: ea.$,
                  bridge: r,
                }),
                  m.c.dismiss(eg));
                return;
              }
              if (t.pending) {
                let t = (0, el.J)({ t: e, side: "buy", symbol: i });
                m.c.info(t.message, { id: eg, description: t.description });
              } else {
                var a;
                let n = (0, el.D)({
                  t: e,
                  side: "buy",
                  symbol: i,
                  reason:
                    (a = t).cause instanceof F.Z
                      ? (0, el.O)({ t: e })
                      : a.reason in ef
                        ? (0, D.A)(a.cause) || e(ef[a.reason])
                        : a.message,
                });
                m.c.error(n.message, { id: eg, description: n.description });
              }
              (0, ea.d)({
                quoteRequest: n,
                analytics: s,
                error: t,
                executedViaApiService: !0,
                signatures: t.signatures,
                provider: ea.$,
                bridge: r,
                rum: {
                  operation: `bridge-${t.operation}`,
                  context: {
                    route: "bridge",
                    bridgeReason: t.reason,
                    settlementStatus: t.pending ? "pending_timeout" : void 0,
                  },
                },
              });
              return;
            }
            if ((0, D.S)(t)) {
              ((0, ea.d)({
                quoteRequest: n,
                analytics: s,
                error: t,
                executedViaApiService: !0,
              }),
                m.c.dismiss(eg));
              return;
            }
            if (t instanceof eo.P) {
              let s = (0, el.J)({ t: e, side: "buy", symbol: i });
              (m.c.info(s.message, { id: eg, description: s.description }),
                (0, T.l)({
                  error: t,
                  feature: "trade",
                  operation: "place-trade",
                  context: {
                    route: "relay",
                    tradeDirection: "buy",
                    mint: n.mint,
                    chainId: n.chainId,
                    settlementStatus: "pending_timeout",
                  },
                }));
              return;
            }
            let r = (0, el.D)({
              t: e,
              side: "buy",
              symbol: i,
              reason: t instanceof Error ? t.message : void 0,
            });
            (m.c.error(r.message, { id: eg, description: r.description }),
              (0, ea.d)({
                quoteRequest: n,
                analytics: s,
                error: t,
                executedViaApiService: !0,
                signatures: t instanceof eo.O ? t.signatures : void 0,
                rum: {
                  operation: "place-trade",
                  context: {
                    route: "relay",
                    relayBuildReason: t instanceof ee ? t.reason : void 0,
                    ...(0, eo.s)(t),
                  },
                },
              }));
          },
        });
      },
    ],
    515529,
  ),
    e.s(
      [
        "f",
        0,
        function (e, t) {
          return (0, L.J)(e) ? ("usdc" === t ? 0.1 : 0.002) : 0;
        },
      ],
      690230,
    ));
};
