// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(156741),
    a = e.i(198285),
    i = e.i(322315),
    n = e.i(254010),
    r = e.i(254667),
    s = e.i(914549),
    o = e.i(574472),
    l = e.i(132838),
    d = e.i(606933);
  e.i(12692);
  var c = e.i(398902),
    u = e.i(63289),
    m = e.i(944322),
    _ = e.i(593293),
    g = e.i(923427),
    f = e.i(777887),
    p = e.i(130379),
    h = e.i(674121),
    w = e.i(896342),
    y = e.i(618119),
    b = e.i(203941),
    v = e.i(324548),
    S = e.i(691542),
    A = e.i(991122),
    I = e.i(553942),
    x = e.i(474294),
    q = e.i(337749),
    k = e.i(170356),
    W = e.i(486813),
    R = e.i(51121),
    B = e.i(526317),
    U = e.i(541710),
    P = e.i(584229),
    E = e.i(466931),
    M = e.i(670550),
    T = e.i(534710),
    F = e.i(971860),
    C = e.i(293341),
    D = e.i(69056),
    H = e.i(27820);
  class L extends Error {
    reason;
    constructor(e, t, a) {
      (super(t), (this.reason = e), (this.cause = a?.cause));
    }
  }
  async function V({
    calls: e,
    chainId: t,
    evmWalletAddress: a,
    relayRequestId: i,
    signAuthorization: n,
    signTypedData: r,
  }) {
    let s,
      o,
      l,
      d,
      c = (0, H.getEvmPublicClient)(t),
      u = c
        .readContract({
          address: a,
          abi: D.c,
          functionName: "getSeq",
          args: [BigInt(0)],
        })
        .then((e) => ({ ok: !0, seq: e }))
        .catch(() => ({ ok: !1 })),
      [m, _, g] = await Promise.all([
        c.getCode({ address: a }),
        c.getTransactionCount({ address: a }),
        u,
      ]);
    if (
      !(d = (m ?? "0x").toLowerCase()).startsWith("0xef0100") ||
      d.slice(8) !== D.B.toLowerCase().slice(2)
    ) {
      let e;
      try {
        e = await n({ contractAddress: D.B, chainId: t, nonce: _ });
      } catch (e) {
        throw new L(
          "failed_to_sign_transaction",
          e instanceof Error ? e.message : "Authorization sign failed",
          { cause: e },
        );
      }
      s = [
        {
          chainId: t,
          address: D.B,
          nonce: _,
          yParity: e.yParity,
          r: e.r,
          s: e.s,
        },
      ];
    }
    if (g.ok) o = g.seq;
    else
      try {
        let e = await c.getCode({ address: D.B });
        if (!e) throw Error("No Calibur code on chain");
        o = await c.readContract({
          address: a,
          abi: D.c,
          functionName: "getSeq",
          args: [BigInt(0)],
          stateOverride: [{ address: a, code: e }],
        });
      } catch {
        throw new L(
          "calibur_nonce_unavailable",
          "Couldn't read the wallet's batch sequence. Try again.",
        );
      }
    let f = {
      batchedCall: {
        calls: e.map((e) => ({ to: e.to, value: e.value, data: e.data })),
        revertOnFailure: !0,
      },
      nonce: o,
      keyHash: D.f,
      executor: D.s,
      deadline: BigInt(0),
    };
    try {
      l = await r({
        domain: {
          name: "Calibur",
          version: "1.0.0",
          chainId: t,
          verifyingContract: a,
          salt: (0, D.L)(),
        },
        types: D.q,
        primaryType: "SignedBatchedCall",
        message: {
          batchedCall: {
            calls: e.map((e) => ({
              to: e.to,
              value: e.value.toString(),
              data: e.data,
            })),
            revertOnFailure: !0,
          },
          nonce: o.toString(),
          keyHash: D.f,
          executor: D.s,
          deadline: "0",
        },
      });
    } catch (e) {
      throw new L(
        "failed_to_sign_transaction",
        e instanceof Error ? e.message : "Batch sign failed",
        { cause: e },
      );
    }
    let p = (0, F.N)(
      [{ type: "bytes" }, { type: "bytes" }],
      [l.signature, "0x"],
    );
    return {
      executionKind: "rawCalls",
      data: {
        chainId: t,
        to: a,
        data: (0, C.f)({ abi: D.c, functionName: "execute", args: [f, p] }),
        value: "0",
        ...(s && { authorizationList: s }),
      },
      executionOptions: { referrer: "pump.fun", subsidizeFees: !0 },
      requestId: i,
    };
  }
  var z = e.i(532617),
    O = e.i(960872),
    N = e.i(58904),
    G = e.i(613677),
    $ = e.i(417326),
    K = e.i(866890),
    Q = e.i(637782),
    j = e.i(342463),
    Y = e.i(342652);
  let J = G.z.object({
    mode: $.z.literal("eoa"),
    transactions: K.z.array(
      G.z.object({
        chain_id: Q.z.number(),
        to: j.z.string(),
        value: j.z.string(),
        data: j.z.string(),
        nonce: Q.z.number(),
        gas: Q.z.number(),
        max_fee_per_gas: j.z.string(),
        max_priority_fee_per_gas: j.z.string(),
      }),
    ),
    gas: G.z.object({
      required_wei: j.z.string(),
      balance_wei: j.z.string(),
      shortfall_wei: j.z.string(),
    }),
    request_id: j.z.string().nullish(),
    to_amount: j.z.string().nullish(),
    to_amount_min: j.z.string().nullish(),
  });
  class Z extends Error {
    status;
    reason;
    relayDetail;
    retryable;
    constructor(e) {
      (super(e.message ?? e.reason ?? "EVM sell build failed"),
        (this.name = "BuildEvmSellError"),
        (this.status = e.status),
        (this.reason = e.reason),
        (this.relayDetail = e.relayDetail),
        (this.retryable =
          void 0 === e.status || e.status >= 500 || 429 === e.status));
    }
  }
  let X = G.z.object({
    error: j.z.string().optional(),
    relay_detail: j.z.string().optional(),
  });
  async function ee(e) {
    let t, a;
    try {
      t = await (0, Y.b)("evm/build-sell", e);
    } catch (e) {
      throw new Z({
        message: e instanceof Error ? e.message : "Network error building sell",
      });
    }
    if (t.status < 200 || t.status >= 300) {
      let e = X.safeParse(t.body),
        a = e.success ? e.data : void 0;
      throw new Z({
        status: t.status,
        reason: a?.error,
        relayDetail: a?.relay_detail,
        message: a?.error ?? `EVM sell build failed (${t.status})`,
      });
    }
    let i = J.safeParse(t.body);
    if (!i.success)
      throw new Z({
        message: "Failed to build EVM sell: unexpected response shape",
      });
    try {
      a = {
        transactions: i.data.transactions.map((e) => ({
          chainId: e.chain_id,
          to: e.to,
          value: BigInt(e.value),
          data: e.data,
          nonce: e.nonce,
          gas: BigInt(e.gas),
          maxFeePerGas: BigInt(e.max_fee_per_gas),
          maxPriorityFeePerGas: BigInt(e.max_priority_fee_per_gas),
        })),
        requiredWei: BigInt(i.data.gas.required_wei),
        balanceWei: BigInt(i.data.gas.balance_wei),
        shortfallWei: BigInt(i.data.gas.shortfall_wei),
        requestId: i.data.request_id ?? void 0,
        toAmount: i.data.to_amount ?? void 0,
        toAmountMin: i.data.to_amount_min ?? void 0,
      };
    } catch {
      throw new Z({
        message: "Failed to build EVM sell: unparseable numeric field",
      });
    }
    return a;
  }
  class et extends Error {
    check;
    amountWei;
    actualWei;
    constructor({ check: e, amountWei: t, actualWei: a }) {
      (super(`Native sell refused (${e}): ${a} wei against ${t} wei`),
        (this.name = "NativeSellValueRefusedError"),
        (this.check = e),
        (this.amountWei = t),
        (this.actualWei = a));
    }
  }
  let ea = (e) => e.reduce((e, t) => e + t.value, BigInt(0)),
    ei = ({ check: e, amountWei: t, actualWei: a, subject: i }) => {
      throw (
        r.y.error("[nativeSellValueGuard] native_sell_value_refused", {
          check: e,
          amount_wei: t.toString(),
          actual_wei: a,
          mint: i.mint,
          chain_id: i.chainId,
        }),
        new et({ check: e, amountWei: t.toString(), actualWei: a })
      );
    };
  var en = e.i(456183);
  let er = BigInt(130),
    es = BigInt(100),
    eo = BigInt(6e5),
    el = "token_transfer_taxed",
    ed =
      /TRANSFER(?:_FROM)?[_ ]FAILED|insufficient balance|exceeds balance|transfer amount exceeds|:\s*k\b/i;
  class ec extends Error {
    reason;
    txHash;
    executedViaApiService;
    constructor(e, t, a, i) {
      (super(t),
        (this.reason = e),
        (this.txHash = a),
        (this.executedViaApiService = i));
    }
  }
  class eu extends Error {
    shortfallWei;
    requiredWei;
    constructor(e) {
      (super(
        `HyperEVM sell needs ${e.requiredWei} wei of HYPE (${e.shortfallWei} short)`,
      ),
        (this.name = "HypeGasShortfallError"),
        (this.shortfallWei = e.shortfallWei),
        (this.requiredWei = e.requiredWei));
    }
  }
  class em extends Error {
    constructor() {
      (super("Relay's impact guard refused the server sell quote"),
        (this.name = "ServerSellImpactRefusedError"));
    }
  }
  async function e_({
    calls: e,
    chainId: t,
    evmWalletAddress: a,
    mint: i,
    amountRaw: n,
    relayRequestId: s,
    signEvmTransaction: o,
    serverSell: l,
    maxNativeValueWei: d,
  }) {
    let c,
      u = (0, H.getEvmPublicClient)(t),
      [m, _] = await Promise.all([
        u.getTransactionCount({ address: a, blockTag: "pending" }),
        u.getTransactionCount({ address: a, blockTag: "latest" }),
      ]);
    if (m > _)
      throw new ec(
        "pending_transaction",
        "A previous transaction is still pending on Hyperliquid — wait for it to settle, then retry.",
      );
    let g =
        void 0 === l
          ? null
          : await ep({ chainId: t, evmWalletAddress: a, serverSell: l }),
      f = null !== g;
    if (
      (g &&
        void 0 !== d &&
        (function ({ transactions: e, amountWei: t, subject: a }) {
          let i = ea(e);
          i > t &&
            ei({
              check: "server_value",
              amountWei: t,
              actualWei: i.toString(),
              subject: a,
            });
        })({
          transactions: g.transactions,
          amountWei: d,
          subject: { mint: i, chainId: t },
        }),
      g)
    )
      c = g.requiredWei;
    else {
      let t = await u.estimateFeesPerGas(),
        a = BigInt(0);
      for (let t of e) a += t.value;
      c = a + eo * t.maxFeePerGas;
    }
    let p = BigInt(0);
    for (
      let e = 0;
      e < 8 && !((p = await u.getBalance({ address: a })) >= c);
      e++
    )
      await new Promise((e) => setTimeout(e, 1500));
    if (p < c) {
      if (g) throw new eu({ shortfallWei: c - p, requiredWei: c });
      throw new ec(
        "hyperevm_gas_unfunded",
        "Your wallet doesn't hold enough HYPE for network fees yet — try again in a minute.",
      );
    }
    let h = g?.requestId ?? s,
      w = null,
      y = async (e) => {
        let t, a;
        try {
          t = await o(e);
        } catch (e) {
          throw e instanceof Error ? e : Error(String(e));
        }
        try {
          a = await u.sendRawTransaction({ serializedTransaction: t });
        } catch (e) {
          throw new ec(
            "failed_to_send_transaction",
            `Broadcasting the transaction failed: ${e instanceof Error ? e.message : String(e)}`,
            void 0,
            f,
          );
        }
        r.y.info("[executeHyperevmEoaSell] transaction sent", {
          requestId: h,
          server_built: f,
          to: e.to,
          txHash: a,
        });
        let i = await ew(u, a);
        if (!i)
          throw new ec(
            "transaction_confirmation_indeterminate",
            "The transaction was broadcast but hasn't confirmed yet — it may still land. Check back before retrying.",
            a,
            f,
          );
        if ("success" !== i.status)
          throw new ec(
            "failed_to_confirm_transaction",
            "The transaction reverted on Hyperliquid.",
            a,
            f,
          );
        w = a;
      };
    if (g)
      for (let e of g.transactions)
        await y({
          type: "eip1559",
          chainId: e.chainId,
          to: e.to,
          data: e.data,
          value: e.value,
          nonce: e.nonce,
          gas: e.gas,
          maxFeePerGas: e.maxFeePerGas,
          maxPriorityFeePerGas: e.maxPriorityFeePerGas,
        });
    else
      for (let r of await ey(u, e, a)) {
        let [e, s, o] = await Promise.all([
          u.getTransactionCount({ address: a, blockTag: "pending" }),
          u
            .estimateGas({ account: a, to: r.to, data: r.data, value: r.value })
            .catch(async (e) => {
              throw await eh({
                publicClient: u,
                error: e,
                mint: i,
                owner: a,
                amountRaw: n,
                executedViaApiService: f,
              });
            }),
          u.estimateFeesPerGas(),
        ]);
        await y({
          type: "eip1559",
          chainId: t,
          to: r.to,
          data: r.data,
          value: r.value,
          nonce: e,
          gas: (s * er) / es,
          maxFeePerGas: o.maxFeePerGas,
          maxPriorityFeePerGas: o.maxPriorityFeePerGas,
        });
      }
    if (null === w)
      throw new ec(
        "no_deposit_call",
        "No sell transaction was needed — the quote is stale. Try again.",
        void 0,
        f,
      );
    return (
      (0, en.h)({ requestId: h, chainId: t, txHash: w }),
      { lastTxHash: w, effectiveRequestId: h, executedViaApiService: f }
    );
  }
  let eg = new Set([
      "route_gas_exceeds_chain_cap",
      "transaction_confirmation_indeterminate",
    ]),
    ef = {
      route_gas_exceeds_chain_cap:
        "This amount needs more network gas than HyperEVM allows in one block. Try a smaller amount.",
      transaction_confirmation_indeterminate:
        "A previous transaction is still pending on Hyperliquid — wait for it to settle, then retry.",
    };
  async function ep({ chainId: e, evmWalletAddress: t, serverSell: a }) {
    let i;
    try {
      i = await ee({
        chain_id: e,
        evm_wallet: t,
        sell: {
          recipient: a.user,
          from_token: a.fromToken,
          amount: a.amount,
          slippage_bps: a.slippageBps,
          settlement: a.settlement,
          override_price_impact: a.overridePriceImpact,
          disable_swap_provider_preference: a.disableSwapProviderPreference,
        },
      });
    } catch (e) {
      if (e instanceof Z && 409 === e.status) {
        if ("relay_quote_swap_impact_too_high" === e.reason) throw new em();
        if (eg.has(e.reason ?? ""))
          throw new ec(
            e.reason ?? "failed_to_send_transaction",
            ef[e.reason ?? ""] ?? e.message,
            void 0,
            !0,
          );
        return (
          r.y.warn("[executeHyperevmEoaSell] server build fell back to local", {
            cause: e.reason ?? "verdict_409",
            mint: a.fromToken,
          }),
          null
        );
      }
      return (
        r.y.warn("[executeHyperevmEoaSell] server build fell back to local", {
          cause:
            e instanceof Z
              ? (e.reason ?? `http_${e.status ?? "network"}`)
              : "unknown",
          mint: a.fromToken,
        }),
        null
      );
    }
    if (0 === i.transactions.length)
      return (
        r.y.warn("[executeHyperevmEoaSell] server build fell back to local", {
          cause: "empty_transactions",
          mint: a.fromToken,
        }),
        null
      );
    if (!i.requestId)
      return (
        r.y.warn("[executeHyperevmEoaSell] server build fell back to local", {
          cause: "missing_request_id",
          mint: a.fromToken,
        }),
        null
      );
    if (a.clientMinOut) {
      let e = !1,
        t = !!i.toAmountMin;
      if (t)
        try {
          e = BigInt(i.toAmountMin ?? "") >= BigInt(a.clientMinOut);
        } catch {
          t = !1;
        }
      if (!e)
        return (
          r.y.warn("[executeHyperevmEoaSell] server build fell back to local", {
            cause: t ? "below_displayed_minimum" : "server_minimum_unreadable",
            mint: a.fromToken,
            client_min_out: a.clientMinOut,
            server_min_out: i.toAmountMin,
          }),
          null
        );
    }
    return (
      r.y.info("[executeHyperevmEoaSell] server build accepted", {
        mint: a.fromToken,
        requestId: i.requestId,
        transactions: i.transactions.length,
        required_wei: i.requiredWei.toString(),
        shortfall_wei: i.shortfallWei.toString(),
      }),
      i
    );
  }
  async function eh({
    publicClient: e,
    error: t,
    mint: a,
    owner: i,
    amountRaw: n,
    executedViaApiService: s,
  }) {
    if (!(t instanceof z.f)) return t;
    let o = t.walk((e) => e instanceof O.s);
    if (!(o instanceof O.s))
      return new ec("estimate_gas_failed", t.shortMessage, void 0, s);
    if (ed.test(o.shortMessage)) {
      let t = await e
        .readContract({
          address: a,
          abi: N.q,
          functionName: "balanceOf",
          args: [i],
        })
        .catch(() => null);
      if (null !== t && t >= n)
        return (
          r.y.warn("[executeHyperevmEoaSell] taxed_transfer_sell_revert", {
            mint: a,
            revert_reason: o.shortMessage,
            amount_raw: n.toString(),
            live_balance_raw: t.toString(),
          }),
          new ec(el, o.shortMessage, void 0, s)
        );
    }
    return new ec("estimate_gas_reverted", o.shortMessage, void 0, s);
  }
  async function ew(e, t) {
    let a = Date.now() + 6e4;
    for (;;) {
      try {
        return await e.getTransactionReceipt({ hash: t });
      } catch {}
      if (Date.now() >= a) return null;
      await new Promise((e) => setTimeout(e, 1500));
    }
  }
  async function ey(e, t, a) {
    let i = [];
    for (let n of t) {
      if (n.data.startsWith("0x095ea7b3") && n.data.length >= 138) {
        let t = `0x${n.data.slice(34, 74)}`,
          i = BigInt(`0x${n.data.slice(74, 138)}`);
        try {
          let s = await e.readContract({
            address: n.to,
            abi: N.q,
            functionName: "allowance",
            args: [a, t],
          });
          if (i > BigInt(0) && s >= i) {
            r.y.info(
              "[executeHyperevmEoaSell] approval already in place; skipping",
              { token: n.to, spender: t },
            );
            continue;
          }
        } catch {}
      }
      i.push(n);
    }
    return i;
  }
  var eb = e.i(187468),
    ev = e.i(414470),
    eS = e.i(729569),
    eA = e.i(778396);
  class eI extends eA.l {
    constructor() {
      (super(), (this.name = "HypeGasTopupDeclinedError"));
    }
  }
  let ex = BigInt(5e4),
    eq = [2e3, 4e3, 8e3],
    ek = (e) => new Promise((t) => setTimeout(t, e));
  var eW = e.i(715450),
    eR = e.i(399015),
    eB = e.i(460261),
    eU = e.i(410318),
    eP = e.i(80126),
    eE = e.i(167156),
    eM = e.i(84976),
    eT = e.i(431004),
    eF = e.i(961659),
    eC = e.i(93903),
    eD = e.i(910222),
    eH = e.i(569526),
    eL = e.i(51954),
    eV = e.i(655397),
    ez = e.i(707138);
  let eO = "relay-sell",
    eN = ["relay", "sell"],
    eG = (e, t) => {
      switch (e.code) {
        case "bridge_refunded":
          return t("web.trade.bridge_sell_refunded");
        case "bridge_expired":
          return t("web.trade.bridge_expired");
        default:
          return t("web.trade.bridge_failed");
      }
    },
    e$ = ({ t: e, coinSymbol: t, convert: a }) =>
      a
        ? (0, eD.N)({ t: e, convert: a })
        : (0, eD.J)({ t: e, side: "sell", symbol: t }),
    eK = ({ t: e, coinSymbol: t, convert: a, reason: i }) =>
      a
        ? (0, eD.V)({ t: e, convert: a, reason: i })
        : (0, eD.D)({ t: e, side: "sell", symbol: t, reason: i });
  (e.s(
    [
      "z",
      0,
      eN,
      "_",
      0,
      function () {
        let { t: e } = (0, c.f)(),
          { signTypedData: F } = (0, a.f)(),
          { signTransaction: C } = (0, t.f)(),
          D = (0, p.f)(),
          { wallet: H, userId: z } = (0, o.F)(),
          O = (0, U.l)(),
          N = (0, _.s)(),
          G = (0, d.useQueryClient)(),
          { lastClickImpression: $ } = (0, eH.y)(),
          K = (0, n.k)(i.D.WEB_TRADE_SPOT_REFRESH);
        return (0, l.f)({
          mutationKey: eN,
          mutationFn: async ({
            quoteRequest: t,
            coinSymbol: a,
            coin: i,
            isSellAll: n,
            spotReference: o,
            spotRefresh: l,
            usdIntent: d,
            impactConsent: c = null,
            analytics: _,
            convert: p,
            onSubmitted: U,
          }) => {
            let T,
              L,
              Q,
              j,
              Y = (0, eM.g)({
                mint: t.mint,
                direction: t.direction,
                preferredAsset: t.solanaAsset,
              }),
              J = { ...t, solanaAsset: Y },
              Z = (0, eB.b)(J.chainId);
            if (!Z) throw Error("Unsupported chain");
            let X = () => {
                try {
                  U?.();
                } catch (e) {
                  r.y.warn("[useSubmitRelaySell] on_submitted_failed", {
                    mint: J.mint,
                    error: e instanceof Error ? e.message : String(e),
                  });
                }
              },
              ee = { startedAt: performance.now() },
              et = (0, eE.s)($, J.mint);
            (0, eE.f)({ quoteRequest: J, analytics: _, attribution: et });
            let en = await (0, ez.t)(J.mint, Z, J.evmWalletAddress),
              er = (0, M.K)({
                balanceRaw: en.balanceRaw,
                reserveRaw: (0, M.y)({ token: J.mint, chainId: Z }),
              }),
              es = n ? er : J.atomicAmount,
              eo = es > er ? er : es;
            if (eo <= BigInt(0))
              throw Error("Balance changed — nothing left to sell.");
            let el = (0, eB.J)(J.chainId),
              ed = (0, eR.G)(J.mint),
              ec =
                K && !ed
                  ? await (0, eb.f)({
                      captured: o,
                      mint: J.mint,
                      chainId: J.chainId,
                      poolAddress: l?.poolAddress ?? null,
                      tokenDecimals: en.decimals,
                      settlementUsdPrice:
                        l?.settlementUsdPrice ?? o?.settlementUsdPrice ?? 0,
                      settlementDecimals:
                        l?.settlementDecimals ??
                        o?.settlementDecimals ??
                        (0, eM.q)(Y),
                      queryClient: G,
                    })
                  : (o ?? null),
              eg = "usdc" === Y ? "usd" : "sol",
              ef =
                H?.signTransaction === void 0
                  ? null
                  : (e) => (0, f._)(() => H.signTransaction(e)),
              ep = async (e) => {
                let t = new AbortController(),
                  a = null === e ? null : setTimeout(() => t.abort(), e);
                try {
                  return {
                    build: await (0, ev.z)(
                      {
                        user: J.solanaWalletAddress,
                        recipient_evm: J.evmWalletAddress,
                        denomination: eg,
                      },
                      { signal: t.signal },
                    ),
                    receivedAt: Date.now(),
                  };
                } catch (e) {
                  return (
                    r.y.warn("[useSubmitRelaySell] hype_gas_topup_gate", {
                      mint: J.mint,
                      gate_action: "build_failed_fall_through",
                      error: e instanceof Error ? e.message : String(e),
                    }),
                    null
                  );
                } finally {
                  null !== a && clearTimeout(a);
                }
              },
              eh = (e) => {
                let { user: t, tokenBalanceByMint: a } = eL.f.getState(),
                  i = a[(0, eV.p)().toBase58()];
                var n = {
                  denomination: eg,
                  chargeLamports: e.chargeLamports,
                  chargeUsdcAtomic: e.chargeUsdcAtomic,
                  solBalanceLamports: BigInt(Math.floor(t.solBalance)),
                  solBalanceLoaded: t.solBalanceLoaded,
                  usdcBalanceRaw: i ? i.balanceRaw : null,
                };
                if ("sol" === n.denomination) {
                  let e = BigInt(n.chargeLamports ?? 0) + ex;
                  return n.solBalanceLoaded && n.solBalanceLamports < e
                    ? "insufficient_sol"
                    : "affordable";
                }
                return null !== n.usdcBalanceRaw &&
                  n.usdcBalanceRaw < BigInt(n.chargeUsdcAtomic ?? 0)
                  ? "insufficient_usdc"
                  : n.solBalanceLoaded && n.solBalanceLamports < ex
                    ? "insufficient_sol"
                    : "affordable";
              },
              ew = async ({ build: e, receivedAt: t }, a) => {
                let i = eh(e);
                if ("affordable" !== i || !ef)
                  return (
                    r.y.warn("[useSubmitRelaySell] hype_gas_topup_gate", {
                      mint: J.mint,
                      gate_action: "charge_unaffordable",
                      source: a,
                      charge_usd: e.chargeUsd,
                      affordability: i,
                      has_signer: null !== ef,
                    }),
                    !1
                  );
                let n = (({
                  user: e,
                  recipientEvm: t,
                  denomination: a,
                  signTransaction: i,
                  initialBuild: n,
                  receivedAt: s,
                  sleep: o = ek,
                  now: l = Date.now,
                }) => {
                  let d = { build: n, receivedAt: s ?? l() },
                    c = n.chargeLamports,
                    u = n.chargeUsdcAtomic,
                    m = null,
                    _ = "post_payment",
                    g = null,
                    f = async (a, i) => {
                      let n = i,
                        r = null,
                        s = !0;
                      for (let i = 0; i < 3; i++) {
                        let l;
                        i > 0 && (await o(eq[i - 1] ?? 8e3));
                        try {
                          l = await (0, ev.l)({
                            user: e,
                            recipientEvm: t,
                            signature: a,
                          });
                        } catch (e) {
                          if (!(e instanceof ev.C)) throw e;
                          if (
                            ((r = e),
                            (0, ev._)(e.reason) || (s = !1),
                            (0, ev.F)(e.reason))
                          )
                            throw ((m = null), (d = null), e);
                          if (
                            ((0, ev.S)(e.reason) &&
                              ((n = "post_payment"), (_ = "post_payment")),
                            !(
                              (0, ev.j)(e.reason) ||
                              (0, ev._)(e.reason) ||
                              e.retryable
                            ))
                          )
                            throw e;
                          continue;
                        }
                        return l.status;
                      }
                      throw (
                        s && "ambiguous" === n && ((m = null), (d = null)),
                        r ?? new ev.C({ message: "claim retry budget spent" })
                      );
                    },
                    p = async () => {
                      let n,
                        s = m;
                      if (s) return { kind: await f(s, _) };
                      let o = d,
                        g =
                          null !== o &&
                          l() >= o.receivedAt + 1e3 * o.build.ttlSeconds - 5e3;
                      if (null === o || g) {
                        let i = await (0, ev.z)({
                          user: e,
                          recipient_evm: t,
                          denomination: a,
                        });
                        if (
                          ((d = o = { build: i, receivedAt: l() }),
                          "already_funded" === i.status)
                        )
                          return { kind: "already_funded" };
                        if (i.chargeLamports !== c || i.chargeUsdcAtomic !== u)
                          return (
                            (c = i.chargeLamports),
                            (u = i.chargeUsdcAtomic),
                            {
                              kind: "charge_updated",
                              chargeUsd: i.chargeUsd,
                              chargeLamports: i.chargeLamports,
                              chargeUsdcAtomic: i.chargeUsdcAtomic,
                            }
                          );
                      }
                      let p = o.build.transaction;
                      if (!p)
                        throw new ev.C({
                          message: "charge transaction missing",
                        });
                      let h = await i(p),
                        w = (0, ev.q)(h);
                      try {
                        n = await (0, ev.l)({
                          user: e,
                          recipientEvm: t,
                          transaction: h,
                        });
                      } catch (t) {
                        if (!(t instanceof ev.C))
                          throw ((m = w), (_ = "ambiguous"), t);
                        if ((0, ev.A)(t.reason)) throw ((d = null), t);
                        let e = (0, ev.S)(t.reason)
                          ? "post_payment"
                          : "ambiguous";
                        return (
                          (m = w),
                          (_ = e),
                          r.y.warn(
                            "[hypeGasTopup] claim failed after handoff, resuming by signature",
                            { reason: t.reason ?? "ambiguous", entry: e },
                          ),
                          { kind: await f(w, e) }
                        );
                      }
                      return { kind: n.status };
                    };
                  return {
                    run: () => {
                      let e = g;
                      if (e) return e;
                      let t = p();
                      g = t;
                      let a = () => {
                        g = null;
                      };
                      return (t.then(a, a), t);
                    },
                  };
                })({
                  user: J.solanaWalletAddress,
                  recipientEvm: J.evmWalletAddress,
                  denomination: eg,
                  signTransaction: ef,
                  initialBuild: e,
                  receivedAt: t,
                });
                r.y.warn("[useSubmitRelaySell] hype_gas_topup_gate", {
                  mint: J.mint,
                  gate_action: "dialog_shown",
                  source: a,
                  charge_usd: e.chargeUsd,
                  shortfall_wei: e.shortfallWei.toString(),
                  denomination: eg,
                });
                let s = await eW.f
                  .getState()
                  .ask({
                    mode: "charge",
                    requestId: `hype-gas-${Date.now()}`,
                    denomination: eg,
                    chargeUsd: e.chargeUsd,
                    chargeLamports: e.chargeLamports,
                    chargeUsdcAtomic: e.chargeUsdcAtomic,
                    runner: n,
                  });
                return (
                  r.y.warn("[useSubmitRelaySell] hype_gas_topup_gate", {
                    mint: J.mint,
                    gate_action: s ?? "declined",
                    source: a,
                    charge_usd: e.chargeUsd,
                  }),
                  null !== s
                );
              },
              ey = async () => {
                let e,
                  t = await ep(4e3);
                if (t?.build.status === "already_funded") return;
                try {
                  e = await (0, eS.J)(J.evmWalletAddress);
                } catch (e) {
                  r.y.warn("[useSubmitRelaySell] hype_gas_topup_gate", {
                    mint: J.mint,
                    gate_action: "local_read_failed_fall_through",
                    error: e instanceof Error ? e.message : String(e),
                  });
                  return;
                }
                let a = t?.build.status === "charge_required" ? t.build : null;
                if (null === a && e.shortfallWei === BigInt(0)) return;
                let i = a ? eh(a) : null,
                  n = null !== a && "affordable" === i && null !== ef;
                if (
                  ((0, E.l)({
                    error: Error("HyperEVM sell blocked on HYPE gas"),
                    feature: "relay",
                    operation: "hyperevm_sell_gas_short",
                    context: {
                      mint: J.mint,
                      chainId: J.chainId,
                      evmWalletAddress: J.evmWalletAddress,
                      balanceWei: (a ?? e).balanceWei.toString(),
                      requiredWei: e.requiredWei.toString(),
                      targetWei: a?.targetWei.toString(),
                      shortfallWei: (a ?? e).shortfallWei.toString(),
                      gateSource: a ? "server" : "local",
                      topupOffered: n,
                      affordability: i,
                      chargeUsd: a?.chargeUsd,
                    },
                  }),
                  n && t)
                ) {
                  if ((await ew(t, "gate")) || e.shortfallWei === BigInt(0))
                    return;
                  throw new eI();
                }
                if (e.shortfallWei === BigInt(0)) return;
                let s = await eW.f
                  .getState()
                  .ask({
                    mode: "wait",
                    requestId: `hype-gas-${Date.now()}`,
                    reason: a ? "unaffordable" : "unavailable",
                    chargeUsd: a?.chargeUsd ?? null,
                    chargeSymbol: "usd" === eg ? "USDC" : "SOL",
                    evmWalletAddress: J.evmWalletAddress,
                    balanceWei: e.balanceWei,
                    requiredWei: e.requiredWei,
                    waitForFunding: (t) =>
                      (0, eS.R)({
                        evmWalletAddress: J.evmWalletAddress,
                        requiredWei: e.requiredWei,
                        signal: t,
                      }),
                  });
                if (
                  (r.y.warn("[useSubmitRelaySell] hype_gas_topup_gate", {
                    mint: J.mint,
                    gate_action: s ?? "declined",
                    source: "wait",
                    reason: a ? "unaffordable" : "unavailable",
                  }),
                  null === s)
                )
                  throw new eI();
              };
            el && (await ey());
            let eD = !1,
              eH = !1,
              eN = !1,
              e$ = (e) =>
                (0, eB.E)({
                  ...J,
                  atomicAmount: eo,
                  overridePriceImpact: e || eD,
                }),
              eQ = (e) =>
                (0, eA.q)(e, {
                  direction: "sell",
                  spotReference: ec,
                  nowMs: Date.now(),
                }),
              ej = async (e, t = eo) => {
                if (!d) return;
                let i = eQ(e),
                  n = (0, eF.X)({
                    intent: d,
                    atomicAmount: t,
                    tokenDecimals: en.decimals,
                    quote: e,
                    quotedSellValueUsd: (0, eF.f)(e),
                    settlementDecimals: (0, eM.q)(Y),
                  });
                if (
                  n.reason &&
                  ((0, eF.h)("useSubmitRelaySell", n, d, {
                    mint: J.mint,
                    chainId: J.chainId,
                    spotReferenceAgeMs: i.spotReferenceAgeMs,
                  }),
                  !(await eF.Y.getState().ask({ coinSymbol: a, verdict: n })))
                )
                  throw new eF.W();
              },
              eY = crypto.randomUUID(),
              eJ = (0, R._)(Y),
              eZ = J.evmWalletAddress,
              eX = D.isReadyFor(eZ),
              e0 = D.describe(eZ),
              e1 = (e, t, a = {}) => {
                (0, P.S)(t) ||
                  (0, W.f)({
                    error: t,
                    operation: e,
                    context: {
                      mint: J.mint,
                      chainId: J.chainId,
                      evmWalletAddress: eZ,
                      swapId: eY,
                      payoutDenomination: eJ,
                      ...a,
                    },
                  });
              },
              e4 = (e) =>
                (0, R.C)({
                  solanaWallet: J.solanaWalletAddress,
                  evmWallet: eZ,
                  chainId: Z,
                  mint: J.mint,
                  amountAtomic: e,
                  slippageBps: J.slippageBps,
                  payoutDenomination: eJ,
                }),
              e3 = (t = {}) =>
                new R.d(
                  "token_unsellable",
                  e("trade.errors.token_unsellable"),
                  t,
                ),
              e9 = async (t, a, i) => {
                let n,
                  s = performance.now();
                try {
                  n = await (0, w.f)(e4(eo), { idempotencyKey: eY });
                } catch (c) {
                  if ((0, B.v)(c) && "insufficient_balance" === c.code)
                    throw (
                      r.y.warn(
                        "[useSubmitRelaySell] bridge_sell_balance_empty",
                        {
                          mint: J.mint,
                          chain_id: Z,
                          swap_id: eY,
                          amount_in: eo.toString(),
                        },
                      ),
                      new R.d(
                        "balance_changed",
                        e("web.trade.bridge_balance_changed"),
                        { cause: c },
                      )
                    );
                  let n = (0, k.R)(c);
                  if ("region_restricted" === n)
                    throw new eB.X(
                      e("web.trade.relay_error_region_restricted"),
                      { reason: eB.f, status: (0, B.v)(c) ? c.status : void 0 },
                    );
                  let o = (0, B.v)(c) ? c.code : void 0,
                    l = (0, B.v)(c) ? c.status : void 0,
                    d = "token_unsellable" === n;
                  if (
                    ((0, k.W)({
                      direction: "sell",
                      mint: J.mint,
                      chain_id: Z,
                      swap_id: eY,
                      decision: d ? "bridge_only_refused" : "relay_fallback",
                      fallback_stage: "create",
                      fallback_code: o,
                      fallback_http_status: l,
                      fallback_message:
                        c instanceof Error ? c.message : String(c),
                      time_to_quote: performance.now() - s,
                      quote_source: "server",
                      presign: t,
                      presign_wait_ms: a,
                      presign_lane_state: i,
                    }),
                    d)
                  )
                    throw e3({ cause: c });
                  return ((T = o), null);
                }
                if ((0, B.W)(n))
                  throw (
                    (0, k.W)({
                      direction: "sell",
                      mint: J.mint,
                      chain_id: Z,
                      swap_id: eY,
                      decision: "bridge",
                      time_to_quote: performance.now() - s,
                      quote_source: "server",
                      presign: t,
                      presign_wait_ms: a,
                      presign_lane_state: i,
                    }),
                    new R.d("held", e("web.trade.bridge_held"), {
                      intentId: n.intent_id,
                    })
                  );
                let o = (e) => (
                  (0, k.W)({
                    direction: "sell",
                    mint: J.mint,
                    chain_id: Z,
                    swap_id: eY,
                    decision: "relay_fallback",
                    fallback_stage: "sell_prepare",
                    fallback_message: e,
                    time_to_quote: performance.now() - s,
                    quote_source: "server",
                    presign: t,
                    presign_wait_ms: a,
                    presign_lane_state: i,
                  }),
                  null
                );
                return "evm_calibur" !== n.unsigned_tx.chain
                  ? o(
                      `sell intent returned a ${n.unsigned_tx.chain} transaction`,
                    )
                  : null == n.quote.expected_out
                    ? o(
                        "the create returned no expected_out to judge the fill by",
                      )
                    : "sol" !== eJ || Number(n.quote.sol_min_out) > 0
                      ? ((ee.quotedAt = performance.now()),
                        r.y.info("[useSubmitRelaySell] bridge_intent_created", {
                          intent_id: n.intent_id,
                          intent_status: n.status,
                          direction: "sell",
                          chain_id: Z,
                          mint: J.mint,
                          swap_id: eY,
                          amount_in: n.quote.amount_in,
                          requested_amount_in:
                            n.quote.requested_amount_in ?? void 0,
                          min_out: n.quote.min_out,
                          slippage_bps: n.quote.slippage_bps,
                          slippage_source: n.quote.slippage_source ?? void 0,
                          payout: eJ,
                          sol_min_out: n.quote.sol_min_out ?? void 0,
                          delegated: n.unsigned_tx.delegated,
                          create_ms: Math.round(performance.now() - s),
                        }),
                        n)
                      : o(
                          "the create returned no sol_min_out for a SOL payout",
                        );
              },
              e2 = async ({
                created: t,
                attempt: a,
                allowRecreate: i,
                presigned: n,
              }) => {
                let o,
                  l,
                  d,
                  c = t.intent_id,
                  u = t.unsigned_tx,
                  m = void 0 !== n && n.created.intent_id === c;
                if ("evm_calibur" !== u.chain) {
                  let t = new R.U("refused", e("web.trade.bridge_failed"), {
                    intentId: c,
                    attempts: a,
                  });
                  throw (
                    e1("sell_sign", t, {
                      intentId: c,
                      reason: "unexpected_tx_chain",
                    }),
                    t
                  );
                }
                if (m) ((l = n.signature), (o = n.authorization));
                else {
                  let t;
                  try {
                    t = (0, R.q)({ unsigned: u, expectedWallet: eZ });
                  } catch (t) {
                    throw (
                      e1("sell_sign", t, {
                        intentId: c,
                        reason: "malformed_typed_data",
                      }),
                      new R.U("refused", e("web.trade.bridge_failed"), {
                        intentId: c,
                        attempts: a,
                        cause: t,
                      })
                    );
                  }
                  if (!u.delegated) {
                    let t = u.authorization;
                    if (!t) {
                      let t = new R.U("refused", e("web.trade.bridge_failed"), {
                        intentId: c,
                        attempts: a,
                      });
                      throw (
                        e1("sell_sign", t, {
                          intentId: c,
                          reason: "undelegated_without_authorization",
                        }),
                        t
                      );
                    }
                    try {
                      let e = await D.signAuthorization(
                        {
                          contractAddress: t.address,
                          chainId: t.chain_id,
                          nonce: t.nonce,
                        },
                        { address: eZ },
                      );
                      o = (0, R.L)(e);
                    } catch (e) {
                      throw (
                        e1("sell_sign", e, {
                          intentId: c,
                          step: "authorization",
                        }),
                        e
                      );
                    }
                  }
                  try {
                    l = (
                      await F(t, {
                        address: eZ,
                        uiOptions: { showWalletUIs: (0, s.F)() },
                      })
                    ).signature;
                  } catch (e) {
                    throw (
                      e1("sell_sign", e, { intentId: c, step: "typed_data" }),
                      e
                    );
                  }
                }
                ee.signedAt = performance.now();
                try {
                  m && (0, x.x)(c);
                  let e = await (0, w.x)(c, { signature: l, authorization: o });
                  return (
                    r.y.info("[useSubmitRelaySell] bridge_batch_executed", {
                      intent_id: c,
                      intent_status: e.status,
                      swap_tx: e.swap_tx,
                      sponsored: e.sponsored,
                      delegated_before: u.delegated,
                      execute_attempts: a,
                      presigned: m,
                      swap_id: eY,
                    }),
                    {
                      kind: "executed",
                      swapTx: e.swap_tx,
                      delegatedBefore: u.delegated,
                      presigned: m,
                    }
                  );
                } catch (t) {
                  if ((0, R.V)(t)) {
                    r.y.warn(
                      "[useSubmitRelaySell] bridge_execute_response_lost",
                      {
                        intent_id: c,
                        swap_id: eY,
                        attempt: a,
                        error: t instanceof Error ? t.message : String(t),
                      },
                    );
                    let i = await (0, R.S)({ intentId: c });
                    if ("taken" === i.kind)
                      return (
                        r.y.info(
                          "[useSubmitRelaySell] bridge_execute_recovered_from_row",
                          {
                            intent_id: c,
                            swap_id: eY,
                            attempt: a,
                            intent_status: i.intent.status,
                          },
                        ),
                        {
                          kind: "executed",
                          swapTx: i.intent.swap_tx ?? void 0,
                          delegatedBefore: u.delegated,
                          presigned: m,
                        }
                      );
                    if ("unsent" === i.kind)
                      throw (
                        e1("sell_execute", t, {
                          intentId: c,
                          attempt: a,
                          resolution: "unsent",
                        }),
                        new R.U("unsent", e("web.trade.bridge_failed"), {
                          intentId: c,
                          attempts: a,
                          cause: t,
                        })
                      );
                    d = { code: i.code, status: void 0 };
                  } else {
                    let e = (0, B.v)(t) ? t : void 0;
                    d = { code: e?.code ?? "", status: e?.status };
                  }
                }
                if (i && (0, R.Y)(d.code))
                  return { kind: "recreate", code: d.code, status: d.status };
                let _ = R.$.has(d.code) || (!i && (0, R.Y)(d.code)),
                  g = new R.U(
                    _ ? "slippage" : "refused",
                    _
                      ? e("web.trade.relay_settlement_slippage_sell")
                      : e("web.trade.bridge_failed"),
                    {
                      intentId: c,
                      code: d.code || void 0,
                      status: d.status,
                      attempts: a,
                    },
                  );
                throw (
                  e1("sell_execute", g, {
                    intentId: c,
                    attempt: a,
                    code: d.code || void 0,
                    status: d.status,
                  }),
                  g
                );
              },
              e5 = async ({ previous: t, refusal: a, attempt: i }) => {
                let n;
                try {
                  n = await (0, w.f)(e4(BigInt(t.quote.amount_in)), {
                    idempotencyKey: `${eY}:recreate-${i}`,
                  });
                } catch (o) {
                  if (
                    (r.y.warn(
                      "[useSubmitRelaySell] bridge_intent_recreate_failed",
                      {
                        intent_id: t.intent_id,
                        swap_id: eY,
                        refusal_code: a.code,
                        error: o instanceof Error ? o.message : String(o),
                      },
                    ),
                    "token_unsellable" === (0, k.R)(o))
                  )
                    throw e3({ intentId: t.intent_id, cause: o });
                  let n = R.$.has(a.code),
                    s = new R.U(
                      n ? "slippage" : "refused",
                      n
                        ? e("web.trade.relay_settlement_slippage_sell")
                        : e("web.trade.bridge_failed"),
                      {
                        intentId: t.intent_id,
                        code: a.code,
                        status: a.status,
                        attempts: i,
                        cause: o,
                      },
                    );
                  throw (
                    e1("sell_create", o, {
                      intentId: t.intent_id,
                      attempt: i,
                      recreate: !0,
                      refusalCode: a.code,
                    }),
                    s
                  );
                }
                if ((0, B.W)(n))
                  throw new R.d("held", e("web.trade.bridge_held"), {
                    intentId: n.intent_id,
                  });
                return (
                  r.y.info("[useSubmitRelaySell] bridge_intent_recreated", {
                    previous_intent_id: t.intent_id,
                    intent_id: n.intent_id,
                    swap_id: eY,
                    refusal_code: a.code,
                    refusal_http_status: a.status,
                    mint: J.mint,
                    chain_id: Z,
                  }),
                  n
                );
              },
              e6 = async ({ presignKey: t, releaseTapKey: n }) => {
                let l,
                  f,
                  h,
                  w = ((h = Date.now()),
                  null != ec &&
                    "number" == typeof ec.observedAtMs &&
                    Number.isFinite(ec.observedAtMs) &&
                    ec.observedAtMs > 0 &&
                    h - ec.observedAtMs <= eA.y)
                    ? ec
                    : null,
                  q = await (0, g.w)("sell", t),
                  W = (0, s.F)() ? "silent_off" : (0, g.f)("sell", t, J.mint),
                  B = (0, x.V)(t, { spotUsdPrice: w?.tokenUsdPrice ?? null });
                n();
                let U = B.hit,
                  P = q.waited ? q.waitedMs : void 0,
                  E =
                    void 0 === B.hit
                      ? B.miss
                      : q.waited
                        ? "inflight_hit"
                        : "hit",
                  M = void 0 === U ? void 0 : Date.now() - U.signedAt;
                if (
                  void 0 === B.hit &&
                  "token_unsellable" === (0, k.t)(q.refusalCode)
                )
                  throw (
                    (0, k.W)({
                      direction: "sell",
                      mint: J.mint,
                      chain_id: Z,
                      swap_id: eY,
                      decision: "bridge_only_refused",
                      fallback_stage: "create",
                      fallback_code: q.refusalCode,
                      quote_source: "server",
                      presign: B.miss,
                      presign_wait_ms: P,
                      presign_lane_state: W,
                    }),
                    e3()
                  );
                if (void 0 === B.hit) {
                  let e = await e9(B.miss, P, W);
                  if (null === e) return null;
                  l = e;
                } else
                  ((l = B.hit.created),
                    (ee.quotedAt = performance.now()),
                    r.y.info("[useSubmitRelaySell] bridge_intent_presigned", {
                      intent_id: l.intent_id,
                      intent_status: l.status,
                      direction: "sell",
                      chain_id: Z,
                      mint: J.mint,
                      swap_id: eY,
                      amount_in: l.quote.amount_in,
                      min_out: l.quote.min_out,
                      slippage_bps: l.quote.slippage_bps,
                      payout: eJ,
                      delegated: B.hit.delegated,
                      create_ms: 0,
                      presign_lane: B.hit.lane,
                      presign_age_ms: M,
                      presign_wait_ms: P,
                      presign_create_ms: Math.round(B.hit.createMs),
                      presign_sign_ms: Math.round(B.hit.signMs),
                    }));
                let T = l.quote.amount_in,
                  F =
                    "usdc" === Y
                      ? 1
                      : (w?.settlementUsdPrice ?? d?.settlementUsdPrice ?? 0),
                  C = (0, R.O)({
                    intentId: l.intent_id,
                    quote: l.quote,
                    amountIn: T,
                    settlementAsset: Y,
                    settlementUsdPrice: F,
                  }),
                  D = (0, eA.q)(C, {
                    direction: "sell",
                    spotReference: w,
                    nowMs: Date.now(),
                  });
                null === D.impactPercent &&
                  r.y.warn("[useSubmitRelaySell] unpriced_bridge_fill", {
                    intent_id: l.intent_id,
                    swap_id: eY,
                    mint: J.mint,
                    chain_id: Z,
                    amount_in: T,
                    quoted_out_usd: C.toAmountUsd,
                    spot_captured: null != o,
                    spot_reference_age_ms: D.spotReferenceAgeMs,
                    spot_stale: D.spotStale,
                    spot_refresh_enabled: K,
                  });
                let H = performance.now();
                try {
                  (await (0, eA.n)({
                    chainId: J.chainId,
                    direction: "sell",
                    coinSymbol: a,
                    fetchQuote: async () => ({ kind: "ok", data: C }),
                    spotReference: w,
                    t: e,
                    impactConsent: c,
                  }),
                    await ej(C, BigInt(T)));
                } catch (e) {
                  throw (void 0 !== U && (0, x.S)(U.created.intent_id), e);
                }
                (0, k.W)({
                  direction: "sell",
                  mint: J.mint,
                  chain_id: Z,
                  swap_id: eY,
                  decision: "bridge",
                  time_to_quote: (ee.quotedAt ?? H) - ee.startedAt,
                  quote_source: "server",
                  slippage_bps: l.quote.slippage_bps,
                  effective_slippage_bps: l.quote.slippage_bps,
                  presign: E,
                  presign_age_ms: M,
                  presign_wait_ms: P,
                  presign_lane_state: W,
                  evm_signer: e0,
                });
                let L = Number(T) / 10 ** en.decimals,
                  V = async (e, t) => {
                    let a,
                      i = null;
                    if ("sol" === eJ) {
                      null === (i = (0, A.O)(e)) &&
                        t &&
                        ("sol" === t.asset || "stable" === t.asset) &&
                        /^\d+$/.test(t.amount) &&
                        (i = { asset: t.asset, amount: BigInt(t.amount) });
                      let { connection: a } = eL.f.getState();
                      null === i &&
                        a &&
                        (i = await (0, A.A)({
                          connection: a,
                          intent: e,
                          wallet: J.solanaWalletAddress,
                        }));
                    }
                    let n = i
                        ? "sol" === (a = i).asset
                          ? {
                              asset: "sol",
                              amountUi:
                                Number(a.amount) / 10 ** (0, eM.q)("sol"),
                            }
                          : { asset: "usdc", amountUi: Number(a.amount) / 1e6 }
                        : null,
                      r = n?.asset ?? "usdc",
                      s = n?.amountUi ?? Number((0, v.i)(e) ?? BigInt(0)) / 1e6;
                    return {
                      deliveredAsset: r,
                      amountUi: s,
                      settlementSymbol: "usdc" === r ? "USDC" : "SOL",
                      settlementLeg: (0, eE.H)({
                        atomicAmount: Math.round(s * 10 ** (0, eM.q)(r)),
                        solanaAsset: r,
                      }),
                      payoutDemoted: "sol" === eJ && n?.asset === "usdc",
                    };
                  },
                  z = ({ outcome: t, intent: n }) => {
                    (async () => {
                      let r = { intentId: n.intent_id, quoteSource: "server" },
                        s = [n.swap_tx, n.payout_tx];
                      if ("success" !== t.kind) {
                        let i = new v.B(n, t),
                          o = eK({
                            t: e,
                            coinSymbol: a,
                            convert: p,
                            reason: eG(i, e),
                          });
                        (u.c.error(o.message, {
                          id: eO,
                          description: o.description,
                        }),
                          e1("sell_settle", i, {
                            intentId: n.intent_id,
                            status: n.status,
                            failReason: t.failReason,
                            late: !0,
                          }),
                          (0, eE.d)({
                            quoteRequest: J,
                            analytics: _,
                            error: i,
                            executedViaApiService: !1,
                            signatures: s,
                            provider: "internal_bridge",
                            bridge: r,
                            rum: {
                              operation: "place-trade",
                              context: { route: "bridge", late: !0 },
                            },
                          }));
                        return;
                      }
                      let o = await V(n, void 0);
                      ((0, m.P)({
                        mint: J.mint,
                        coin: i,
                        type: "sell",
                        symbol: a,
                        tokenAmountUi: L,
                        solAmountUi: o.amountUi,
                        settlementSymbol: o.settlementSymbol,
                        signature: n.payout_tx ?? void 0,
                        replaceToastId: eO,
                        convert: p,
                      }),
                        (0, eC.K)({
                          mint: J.mint,
                          walletAddress: J.solanaWalletAddress,
                          direction: "sell",
                          chainId: J.chainId,
                          signature: n.payout_tx ?? void 0,
                          soldAtomic: T,
                          balanceBeforeAtomic: en.balanceRaw.toString(),
                          tokenDecimals: en.decimals,
                        }),
                        o.payoutDemoted &&
                          u.c.info(e("web.trade.bridge_payout_demoted")),
                        (0, eE.A)({
                          quoteRequest: J,
                          analytics: _,
                          tokenAmount: L,
                          settlementLeg: o.settlementLeg,
                          signatures: s,
                          executedViaApiService: !1,
                          timing: ee,
                          settledAt: performance.now(),
                          provider: "internal_bridge",
                          bridge: r,
                          attribution: et,
                        }),
                        G.invalidateQueries({
                          queryKey: (0, ez.r)(J.mint, Z, eZ),
                        }));
                    })();
                  },
                  O = (0, b.o)() ?? (0, y.r)(),
                  N = l,
                  $ = 1;
                try {
                  for (
                    f = await e2({
                      created: N,
                      attempt: $,
                      allowRecreate: $ < R.Z,
                      presigned: U,
                    });
                    "recreate" === f.kind;

                  )
                    (r.y.warn(
                      "[useSubmitRelaySell] bridge_execute_refused_recreating",
                      {
                        intent_id: N.intent_id,
                        swap_id: eY,
                        code: f.code,
                        http_status: f.status,
                        attempt: $,
                      },
                    ),
                      (N = await e5({
                        previous: N,
                        refusal: { code: f.code, status: f.status },
                        attempt: $,
                      })),
                      ($ += 1),
                      (f = await e2({
                        created: N,
                        attempt: $,
                        allowRecreate: $ < R.Z,
                        presigned: U,
                      })));
                } catch (e) {
                  throw (O?.close(), e);
                }
                let { swapTx: Q, delegatedBefore: j, presigned: ea } = f,
                  ei = N.intent_id;
                return (
                  X(),
                  await (0, m.S)(
                    {
                      toastId: eO,
                      side: "sell",
                      symbol: a,
                      chainId: J.chainId,
                      coin: i,
                      tokenAmountUi: Number(eo) / 10 ** en.decimals,
                      convert: p,
                    },
                    async () => {
                      let e;
                      try {
                        e = await (0, S.H)({
                          intentId: ei,
                          direction: "sell",
                          payoutDenomination: eJ,
                          feed: O,
                          settleFromEvent: !0,
                          onIntent: (e, t) => {
                            r.y.info(
                              "[useSubmitRelaySell] bridge_intent_status",
                              {
                                intent_id: e.intent_id,
                                intent_status: e.status,
                                payout_tx: e.payout_tx ?? void 0,
                                source: t,
                                swap_id: eY,
                              },
                            );
                          },
                        });
                      } catch (e) {
                        if (e instanceof S.F)
                          throw (
                            (0, I.f)({
                              intentId: ei,
                              direction: "sell",
                              payoutDenomination: eJ,
                              onOutcome: z,
                            }),
                            e
                          );
                        throw (e1("sell_settle", e, { intentId: ei }), e);
                      }
                      let { intent: t } = e,
                        a = (0, v.Z)(t);
                      if ("success" !== a.kind) {
                        let e = new v.B(t, a);
                        throw (
                          e1("sell_settle", e, {
                            intentId: ei,
                            status: t.status,
                            failReason: a.failReason,
                          }),
                          e
                        );
                      }
                      let i = performance.now(),
                        n = await V(t, e.provisionalPayout);
                      return {
                        requestId: t.intent_id,
                        executedViaApiService: !1,
                        settlement: {
                          status: "success",
                          inTxHashes: Q ? [Q] : [],
                          txHashes: t.payout_tx ? [t.payout_tx] : [],
                        },
                        tokenAmountUi: L,
                        solAmountUi: n.amountUi,
                        settlementSymbol: n.settlementSymbol,
                        settlementLeg: n.settlementLeg,
                        timing: ee,
                        settledAt: i,
                        venue: "bridge",
                        attribution: et,
                        soldAtomic: T,
                        balanceBeforeAtomic: en.balanceRaw.toString(),
                        tokenDecimals: en.decimals,
                        bridge: {
                          intentId: t.intent_id,
                          settledFrom: e.settledFrom,
                          settleWaitMs: e.waitMs,
                          polls: e.polls,
                          pushes: e.pushes,
                          socketOpenMs: e.socketOpenMs,
                          quoteSource: "server",
                          presigned: ea,
                          presignAgeMs: ea ? M : void 0,
                          executeAttempts: $,
                          delegatedBefore: j,
                          payoutDemoted: n.payoutDemoted,
                        },
                      };
                    },
                  )
                );
              },
              e7 = async () => {
                let e =
                  (0, w._)() && (0, k.X)(Z, O)
                    ? ed
                      ? "native_token"
                      : el
                        ? "hyperevm"
                        : N({ chainId: Z, mint: J.mint })
                          ? B.r
                          : z
                            ? eX
                              ? (0, q.F)({
                                  mint: J.mint,
                                  chainId: Z,
                                  direction: "sell",
                                })
                                ? "recent_quote_refusal"
                                : null
                              : "evm_signer_not_ready"
                            : "no_user_id"
                    : "";
                if (null !== e)
                  return (
                    "" !== e &&
                      ((L = e),
                      (0, k.W)({
                        direction: "sell",
                        mint: J.mint,
                        chain_id: Z,
                        swap_id: eY,
                        decision: "relay_fallback",
                        fallback_stage: "gate",
                        fallback_message: e,
                        presign: !1,
                        evm_signer: e0,
                      })),
                    null
                  );
                let t = (0, x.n)(e4(eo)),
                  a = (0, g.M)("sell", t),
                  i = (0, g.U)();
                try {
                  return await e6({ presignKey: t, releaseTapKey: a });
                } finally {
                  (a(), i());
                }
              };
            try {
              Q = await e7();
            } catch (e) {
              throw (0, R.W)(e);
            }
            if (null !== Q) return Q;
            let e8 = (0, k.c)({
              chainId: Z,
              userId: z,
              mint: J.mint,
              direction: "sell",
              gateCode: L,
              exposure: O,
            });
            if (e8) throw (0, k.b)(e8, e);
            let te = async () => {
                let t = await (0, eA.n)({
                  chainId: J.chainId,
                  direction: "sell",
                  coinSymbol: a,
                  fetchQuote: e$,
                  spotReference: ec,
                  t: e,
                  impactConsent: c,
                });
                return (
                  t.overridePriceImpact && (eD = !0),
                  (ee.quotedAt = performance.now()),
                  t.quote
                );
              },
              tt = async (t) => {
                let i = (0, eB.i)(t);
                if (!i) throw Error("No sell route available right now.");
                let n = { mint: J.mint, chainId: J.chainId };
                if (
                  (ed
                    ? !(function ({
                        fromAmount: e,
                        calls: t,
                        amountWei: a,
                        subject: i,
                      }) {
                        e !== a.toString() &&
                          ei({
                            check: "quote_amount",
                            amountWei: a,
                            actualWei: e,
                            subject: i,
                          });
                        let n = ea(t);
                        n > a &&
                          ei({
                            check: "call_value",
                            amountWei: a,
                            actualWei: n.toString(),
                            subject: i,
                          });
                      })({
                        fromAmount: t.fromAmount,
                        calls: i.calls,
                        amountWei: eo,
                        subject: n,
                      })
                    : !(function ({ calls: e, subject: t, requestId: a }) {
                        let i = ea(e);
                        i <= BigInt(0) ||
                          (0, E.B)({
                            name: "relay-sell-call-value",
                            feature: "relay",
                            operation: "sell",
                            context: {
                              mint: t.mint,
                              chainId: t.chainId,
                              valueWei: i.toString(),
                              requestId: a,
                            },
                          });
                      })({
                        calls: i.calls,
                        subject: n,
                        requestId: i.requestId,
                      }),
                  !(0, eB.J)(J.chainId))
                ) {
                  let e = await V({
                      calls: i.calls,
                      chainId: Z,
                      evmWalletAddress: J.evmWalletAddress,
                      relayRequestId: i.requestId,
                      signAuthorization: (e) =>
                        D.signAuthorization(e, { address: J.evmWalletAddress }),
                      signTypedData: (e) =>
                        F(e, {
                          address: J.evmWalletAddress,
                          uiOptions: { showWalletUIs: (0, s.F)() },
                        }),
                    }),
                    t = await (0, eB.W)(e);
                  if ("error" === t.kind) throw Error(t.message);
                  return {
                    effectiveRequestId: i.requestId,
                    executedViaApiService: !1,
                  };
                }
                let o = (e) => {
                  let a = e
                    ? void 0
                    : {
                        user: J.solanaWalletAddress,
                        fromToken: J.mint,
                        amount: eo.toString(),
                        slippageBps: J.slippageBps,
                        settlement: Y,
                        overridePriceImpact: eD || void 0,
                        disableSwapProviderPreference: !0,
                        clientMinOut: t.toAmountMin,
                      };
                  return e_({
                    calls: i.calls,
                    chainId: Z,
                    evmWalletAddress: J.evmWalletAddress,
                    mint: J.mint,
                    amountRaw: eo,
                    relayRequestId: i.requestId,
                    serverSell: a,
                    maxNativeValueWei: ed ? eo : void 0,
                    signEvmTransaction: async (e) => {
                      let { signature: t } = await C(
                        {
                          type: 2,
                          chainId: e.chainId,
                          to: e.to ?? void 0,
                          data: e.data,
                          value: e.value,
                          nonce: e.nonce,
                          gasLimit: e.gas,
                          maxFeePerGas: e.maxFeePerGas,
                          maxPriorityFeePerGas: e.maxPriorityFeePerGas,
                        },
                        {
                          address: J.evmWalletAddress,
                          uiOptions: { showWalletUIs: (0, s.F)() },
                        },
                      );
                      return t;
                    },
                  });
                };
                try {
                  let e = await o(eH);
                  return {
                    effectiveRequestId: e.effectiveRequestId,
                    executedViaApiService: e.executedViaApiService,
                  };
                } catch (i) {
                  if (i instanceof eu) {
                    if (
                      (r.y.warn(
                        "[useSubmitRelaySell] hype_gas_shortfall_topup",
                        {
                          mint: J.mint,
                          gate_action: "server_preflight_shortfall",
                          shortfall_wei: i.shortfallWei.toString(),
                          required_wei: i.requiredWei.toString(),
                        },
                      ),
                      !eN)
                    ) {
                      eN = !0;
                      let e = await ep(null);
                      if (
                        e?.build.status === "charge_required" &&
                        (await ew(e, "server_preflight"))
                      )
                        return await tt(t);
                    }
                    eH = !0;
                    let e = await o(!0);
                    return {
                      effectiveRequestId: e.effectiveRequestId,
                      executedViaApiService: e.executedViaApiService,
                    };
                  }
                  if (i instanceof em) {
                    if (eD)
                      throw Error(e("web.trade.relay_error_impact_too_high"));
                    let t = await e$(!0);
                    if ("error" === t.kind)
                      throw Error((0, eB.s)(t, { chainId: J.chainId, t: e }));
                    let i = (0, eA.B)(t.data, {
                      direction: "sell",
                      spotReference: ec,
                      nowMs: Date.now(),
                    });
                    if (null === i)
                      throw Error(e("web.trade.relay_error_impact_too_high"));
                    let n = null !== c && (0, eA.t)(c, i);
                    if (
                      (i.isPastCeiling &&
                        !n &&
                        ((t, i) => {
                          throw (
                            (0, eA.r)(t, "sell", i),
                            new eA.H({
                              assessment: i,
                              direction: "sell",
                              message: (0, eA.d)({
                                assessment: i,
                                coinSymbol: a,
                                t: e,
                              }),
                            })
                          );
                        })("useSubmitRelaySell", i),
                      n && c)
                    )
                      (0, eA.Q)("useSubmitRelaySell", "sell", i, c);
                    else if (
                      ((0, eA.I)("useSubmitRelaySell", "sell", i),
                      !(await eA.w
                        .getState()
                        .ask({
                          coinSymbol: a,
                          direction: "sell",
                          assessment: i,
                        })))
                    )
                      throw new eA.l();
                    return ((eD = !0), await tt(t.data));
                  }
                  throw i;
                }
              };
            try {
              j = await te();
            } catch (e) {
              throw (
                (0, k.w)({
                  swapId: eY,
                  mint: J.mint,
                  chainId: Z,
                  direction: "sell",
                  bridgeCode: T,
                  relayError: e,
                }),
                e
              );
            }
            await ej(j);
            let ta = await tt(j);
            return (
              (ee.signedAt = performance.now()),
              X(),
              await (0, m.S)(
                {
                  toastId: eO,
                  side: "sell",
                  symbol: a,
                  chainId: J.chainId,
                  coin: i,
                  tokenAmountUi: Number(eo) / 10 ** en.decimals,
                  convert: p,
                },
                async () => {
                  let t = async (t, i) => {
                    let n = await (0, eB.t)(i.effectiveRequestId);
                    if (!n)
                      throw (
                        (0, eU.f)({
                          requestId: i.effectiveRequestId,
                          context: {
                            side: "sell",
                            coinSymbol: a,
                            mint: J.mint,
                            chainId: J.chainId,
                            evmWalletAddress: J.evmWalletAddress,
                            queryClient: G,
                            analytics: {
                              quoteRequest: J,
                              analytics: _,
                              tokenAmount: Number(eo) / 10 ** en.decimals,
                              settlementLeg: (0, eE.H)({
                                atomicAmount: t.toAmount,
                                solanaAsset: J.solanaAsset,
                              }),
                              originSignatures: [],
                              executedViaApiService: i.executedViaApiService,
                              timing: ee,
                            },
                            convert: p
                              ? {
                                  copy: p,
                                  t: e,
                                  onSettled: () =>
                                    (0, h.g)(G, J.solanaWalletAddress),
                                }
                              : void 0,
                          },
                        }),
                        new eT.P(i.effectiveRequestId)
                      );
                    if ("success" !== n.status)
                      throw (0, eT.w)({
                        settlement: n,
                        direction: "sell",
                        executedViaApiService: i.executedViaApiService,
                        signatures: n.inTxHashes,
                        t: e,
                      });
                    return {
                      requestId: i.effectiveRequestId,
                      executedViaApiService: i.executedViaApiService,
                      settlement: n,
                      tokenAmountUi: Number(eo) / 10 ** en.decimals,
                      solAmountUi: Number(t.toAmount) / 10 ** (0, eM.q)(Y),
                      settlementSymbol: "usdc" === Y ? "USDC" : "SOL",
                      settlementLeg: (0, eE.H)({
                        atomicAmount: t.toAmount,
                        solanaAsset: J.solanaAsset,
                      }),
                      timing: ee,
                      settledAt: performance.now(),
                      venue: "relay",
                      attribution: et,
                      soldAtomic: eo.toString(),
                      balanceBeforeAtomic: en.balanceRaw.toString(),
                      tokenDecimals: en.decimals,
                    };
                  };
                  try {
                    return await t(j, ta);
                  } catch (u) {
                    let i;
                    if (!(0, eP.y)(u)) throw u;
                    r.y.warn("[useSubmitRelaySell] relay_slippage_auto_retry", {
                      mint: J.mint,
                      trade_direction: "sell",
                      relay_fail_reason: u.failReason,
                    });
                    let n = await e$(!1);
                    if ("error" === n.kind)
                      throw (
                        r.y.error(
                          "[useSubmitRelaySell] relay_slippage_auto_retry_requote_failed",
                          { mint: J.mint, requote_error: n.message },
                        ),
                        u
                      );
                    let s = n.data;
                    ee.quotedAt = performance.now();
                    let o = (0, eP.x)(j.toAmountMin);
                    if (!(0, eP.G)(s.toAmountMin, o))
                      throw (
                        r.y.warn(
                          "[useSubmitRelaySell] relay_auto_retry_below_floor",
                          {
                            mint: J.mint,
                            trade_direction: "sell",
                            relay_fail_reason: u.failReason,
                            original_min_out: o,
                            fresh_min_out: s.toAmountMin,
                          },
                        ),
                        (0, eT.w)({
                          settlement: {
                            status: u.status,
                            failReason: u.failReason,
                            details: u.details,
                          },
                          direction: "sell",
                          executedViaApiService: u.executedViaApiService,
                          signatures: u.signatures,
                          messageOverride: eP.B.sell,
                          t: e,
                        })
                      );
                    let l = eQ(s),
                      d = null !== c && (0, eA.t)(c, l);
                    if (l.isPastCeiling && !d)
                      throw (
                        (0, eA.r)("useSubmitRelaySell:retry", "sell", l),
                        u
                      );
                    if ((l.isExtreme || l.isWarn) && !eD) {
                      if (d && c)
                        (0, eA.Q)("useSubmitRelaySell:retry", "sell", l, c);
                      else if (
                        ((0, eA.I)("useSubmitRelaySell", "sell", l),
                        !(await eA.w
                          .getState()
                          .ask({
                            coinSymbol: a,
                            direction: "sell",
                            assessment: l,
                          })))
                      )
                        throw u;
                      eD = !0;
                    }
                    try {
                      i = await tt(s);
                    } catch (e) {
                      if (e instanceof eA.l) throw u;
                      throw e;
                    }
                    return ((ee.signedAt = performance.now()), await t(s, i));
                  }
                },
              )
            );
          },
          onSuccess: (
            t,
            {
              coinSymbol: a,
              coin: i,
              quoteRequest: n,
              analytics: s,
              convert: o,
            },
          ) => {
            ((0, m.P)({
              mint: n.mint,
              coin: i,
              type: "sell",
              symbol: a,
              tokenAmountUi: t.tokenAmountUi,
              solAmountUi: t.solAmountUi,
              settlementSymbol: t.settlementSymbol,
              signature: t.settlement.txHashes?.[0],
              replaceToastId: eO,
              convert: o,
            }),
              (0, eC.K)({
                mint: n.mint,
                walletAddress: n.solanaWalletAddress,
                direction: "sell",
                chainId: n.chainId,
                signature: t.settlement.txHashes?.[0],
                soldAtomic: t.soldAtomic,
                balanceBeforeAtomic: t.balanceBeforeAtomic,
                tokenDecimals: t.tokenDecimals,
              }),
              t.bridge &&
                (t.bridge.payoutDemoted &&
                  u.c.info(e("web.trade.bridge_payout_demoted")),
                r.y.info("[useSubmitRelaySell] bridge_sell_settled", {
                  intent_id: t.bridge.intentId,
                  mint: n.mint,
                  execute_attempts: t.bridge.executeAttempts,
                  delegated_before: t.bridge.delegatedBefore,
                  payout_demoted: t.bridge.payoutDemoted,
                  settled_from: t.bridge.settledFrom,
                  settle_wait_ms: t.bridge.settleWaitMs,
                  presigned: t.bridge.presigned,
                  presign_age_ms: t.bridge.presignAgeMs,
                })),
              (0, eE.A)({
                quoteRequest: n,
                analytics: s,
                tokenAmount: t.tokenAmountUi,
                settlementLeg: t.settlementLeg,
                signatures: [
                  ...(t.settlement.inTxHashes ?? []),
                  ...(t.settlement.txHashes ?? []),
                ],
                executedViaApiService: t.executedViaApiService,
                timing: t.timing,
                settledAt: t.settledAt,
                provider: "bridge" === t.venue ? "internal_bridge" : "relay",
                bridge: t.bridge
                  ? {
                      intentId: t.bridge.intentId,
                      settledFrom: t.bridge.settledFrom,
                      settleWaitMs: t.bridge.settleWaitMs,
                      polls: t.bridge.polls,
                      pushes: t.bridge.pushes,
                      socketOpenMs: t.bridge.socketOpenMs,
                      quoteSource: t.bridge.quoteSource,
                      presigned: t.bridge.presigned,
                      presignAgeMs: t.bridge.presignAgeMs,
                    }
                  : void 0,
                attribution: t.attribution,
              }),
              G.invalidateQueries({
                queryKey: (0, ez.r)(
                  n.mint,
                  (0, eB.b)(n.chainId),
                  n.evmWalletAddress,
                ),
              }),
              o && (0, h.g)(G, n.solanaWalletAddress));
          },
          onError: (
            t,
            { coinSymbol: a, quoteRequest: i, analytics: n, convert: r },
          ) => {
            let s = (0, R.b)(t) || t instanceof v.B || t instanceof S.F,
              o = s ? "internal_bridge" : "relay",
              l =
                t instanceof R.U || t instanceof R.d || t instanceof S.F
                  ? t.intentId
                  : t instanceof v.B
                    ? t.intent.intent_id
                    : void 0,
              d =
                s && void 0 !== l
                  ? { intentId: l, quoteSource: "server" }
                  : void 0,
              c = {
                bridgeIntentId: l,
                bridgeCode: t instanceof R.U ? t.code : void 0,
                bridgeOutcome:
                  t instanceof R.U || t instanceof R.d ? t.outcome : void 0,
                bridgeExecuteAttempts: t instanceof R.U ? t.attempts : void 0,
              };
            if (t instanceof eA.H) {
              (u.c.error(e("web.trade.sell_impact_ceiling_title"), {
                id: eO,
                description: t.message,
              }),
                (0, E.l)({
                  error: Error(
                    "Relay sell refused at the price-impact ceiling",
                  ),
                  feature: "relay",
                  operation: "sell_impact_ceiling_refused",
                  context: {
                    mint: i.mint,
                    chainId: i.chainId,
                    venue: s ? "bridge" : "relay",
                    ceilingPercent: eA.h,
                    impactPercent: t.assessment.impactPercent,
                    valueLostUsd: t.assessment.valueLostUsd,
                    fromAmountUsd: t.assessment.fromAmountUsd,
                    toAmountUsd: t.assessment.toAmountUsd,
                    impactSource: t.assessment.impactSource,
                    relayQuotedLostPercent: t.assessment.relayQuotedLostPercent,
                  },
                }));
              return;
            }
            if (t instanceof eA.l || t instanceof eF.W)
              return void u.c.dismiss(eO);
            if ((0, P.S)(t)) {
              ((0, eE.d)({
                quoteRequest: i,
                analytics: n,
                error: t,
                executedViaApiService: !s && (0, eB.J)(i.chainId),
                provider: o,
                bridge: d,
              }),
                u.c.dismiss(eO));
              return;
            }
            if (t instanceof eT.P) {
              let n = e$({ t: e, coinSymbol: a, convert: r });
              (u.c.info(n.message, { id: eO, description: n.description }),
                (0, E.l)({
                  error: t,
                  feature: "trade",
                  operation: "place-trade",
                  context: {
                    route: "relay",
                    tradeDirection: "sell",
                    mint: i.mint,
                    chainId: i.chainId,
                    settlementStatus: "pending_timeout",
                  },
                }));
              return;
            }
            if (t instanceof S.F) {
              let n = e$({ t: e, coinSymbol: a, convert: r });
              (u.c.info(n.message, { id: eO, description: n.description }),
                (0, W.f)({
                  error: t,
                  operation: "sell_settle",
                  context: {
                    tradeDirection: "sell",
                    mint: i.mint,
                    chainId: i.chainId,
                    intentId: t.intentId,
                    lastStatus: t.lastStatus,
                    settlementStatus: "pending_timeout",
                  },
                }));
              return;
            }
            let m = (0, T.Z)(t),
              _ = t instanceof Error ? t.message : void 0,
              g = eK({
                t: e,
                coinSymbol: a,
                convert: r,
                reason: m
                  ? (0, T.e)(m, e)
                  : t instanceof v.B
                    ? eG(t, e)
                    : t instanceof ec && t.reason === el
                      ? e("trade.errors.fee_on_transfer")
                      : t instanceof et
                        ? e("web.trade.relay_error_unavailable")
                        : _,
              });
            u.c.error(g.message, { id: eO, description: g.description });
            let f =
                t instanceof ec || t instanceof eT.O
                  ? t.executedViaApiService
                  : void 0,
              p = t instanceof R.d && "token_unsellable" === t.outcome;
            (0, eE.d)({
              quoteRequest: i,
              analytics: n,
              error: t,
              executedViaApiService: f ?? (!s && (0, eB.J)(i.chainId)),
              signatures:
                t instanceof ec
                  ? [t.txHash]
                  : t instanceof eT.O
                    ? t.signatures
                    : t instanceof v.B
                      ? [t.intent.swap_tx, t.intent.payout_tx]
                      : void 0,
              provider: o,
              bridge: d,
              rum: {
                operation: "place-trade",
                skip: p,
                context: {
                  route: s ? "bridge" : "relay",
                  caliburReason: t instanceof L ? t.reason : void 0,
                  embeddedWalletUnavailable:
                    m?.kind === "unavailable" || void 0,
                  embeddedProviderMasked: m?.kind === "masked" || void 0,
                  embeddedProviderCause: m?.cause,
                  hyperevmReason: t instanceof ec ? t.reason : void 0,
                  hyperevmTxHash: t instanceof ec ? t.txHash : void 0,
                  ...c,
                  ...(t instanceof v.B
                    ? {
                        bridgeIntentStatus: t.intent.status,
                        bridgeFailReason: t.intent.fail_reason ?? void 0,
                      }
                    : {}),
                  ...(0, eT.s)(t),
                  ...(t instanceof et
                    ? {
                        nativeValueCheck: t.check,
                        nativeValueAmountWei: t.amountWei,
                        nativeValueActualWei: t.actualWei,
                      }
                    : {}),
                },
              },
            });
          },
        });
      },
    ],
    892994,
  ),
    e.s(
      ["f", 0, (e) => Math.min(Math.max(Math.round(100 * e), 1), 5e3)],
      844469,
    ));
};
