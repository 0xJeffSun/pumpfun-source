// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(574472),
    i = e.i(690877),
    a = e.i(352386);
  e.i(12692);
  var r = e.i(398902),
    s = e.i(536925),
    l = e.i(593293),
    o = e.i(896342),
    u = e.i(895492),
    d = e.i(474294);
  let c = (e) => [
      e.solanaWallet,
      e.evmWallet.toLowerCase(),
      e.chainId,
      e.mint.toLowerCase(),
    ],
    m = (e) => JSON.stringify(c(e)),
    g = (e) =>
      JSON.stringify([
        ...c(e),
        (0, u.S)(e.slippageBps),
        e.funding.kind,
        "usdc" === e.funding.kind ? e.funding.amountIn : e.funding.lamports,
        ...(e.calloutUser ? [e.calloutUser] : []),
      ]),
    p = (e, t) =>
      null !== e.solPriceUsd &&
      e.solPriceUsd > 0 &&
      null != t &&
      t > 0 &&
      1e4 * Math.abs(t / e.solPriceUsd - 1) > 50,
    f = (e, t = Date.now()) => t - e.createdAt > 4e4,
    h = new Map(),
    _ = new Set(),
    b = () => {
      for (let e of _) e();
    },
    y = (e) => (
      _.add(e),
      () => {
        _.delete(e);
      }
    ),
    v = (e) => {
      let t = h.get(e);
      return void 0 !== t && (h.delete(e), t.consumed || t.feed?.close(), !0);
    },
    w = (e, t) =>
      t.consumed !== e.consumed ? !e.consumed : e.signedAt > t.signedAt,
    x = (e) => {
      let t = null;
      for (let n of h.values())
        n.key === e && (null === t || w(n, t)) && (t = n);
      return t;
    },
    z = (e) => {
      for (let [t, n] of h) if (n.created.intent_id === e) return [t, n];
    },
    A = (e) => {
      let t = z(e);
      void 0 !== t && (v(t[0]), b());
    };
  e.s(
    [
      "h",
      0,
      ({ identity: e, solPriceUsd: t, asyncQuote: n = !0 }) => {
        let i = (0, u.k)({
          solanaWallet: e.solanaWallet,
          evmWallet: e.evmWallet,
          chainId: e.chainId,
          mint: e.mint,
          paymentAsset: e.funding.kind,
          atomicAmount: BigInt(
            "usdc" === e.funding.kind ? e.funding.amountIn : e.funding.lamports,
          ),
          solPriceUsd: t,
          slippageBps: e.slippageBps,
          calloutUser: e.calloutUser,
        });
        return null === i ? null : { ...i, async_quote: n };
      },
      "n",
      0,
      g,
      "w",
      0,
      (e) => {
        let t = z(e);
        void 0 !== t && (t[1].consumed = !0);
      },
      "o",
      0,
      A,
      "c",
      0,
      (e) => {
        let t = !1;
        for (let [n, i] of h) i.identity.solanaWallet === e && (v(n), (t = !0));
        t && b();
      },
      "m",
      0,
      x,
      "b",
      0,
      f,
      "R",
      0,
      (e, { spotUsdPrice: t, solPriceUsd: n, now: i = Date.now() } = {}) => {
        let a,
          r = ((e) => {
            try {
              let t = JSON.parse(e);
              return Array.isArray(t) && t.length > 4
                ? JSON.stringify(t.slice(0, 4))
                : null;
            } catch {
              return null;
            }
          })(e),
          s = !1;
        for (let t of h.values())
          m(t.identity) === r &&
            ((s = !0), t.key === e && (void 0 === a || w(t, a)) && (a = t));
        return s
          ? void 0 === a
            ? { miss: "key" }
            : a.consumed
              ? { miss: "consumed" }
              : f(a, i)
                ? { miss: "expired" }
                : (0, d.r)(a, t)
                  ? { miss: "price" }
                  : p(a, n)
                    ? { miss: "sol_price" }
                    : ((a.consumed = !0), { hit: a })
          : { miss: "none" };
      },
      "_",
      0,
      (e) => {
        let t = z(e);
        return void 0 !== t && ((t[1].consumed = !1), !0);
      },
      "T",
      0,
      (e, t) => {
        "failed" === t.status
          ? A(e.created.intent_id)
          : ((e.created = {
              ...e.created,
              quote: {
                ...e.created.quote,
                quote_status: "ready",
                expected_out: t.expectedOut,
                min_out: t.minOut,
                ...(void 0 === t.slippageBps
                  ? {}
                  : { slippage_bps: t.slippageBps }),
              },
            }),
            (e.quoteStatus = "ready"),
            void 0 !== z(e.created.intent_id) && b());
      },
      "D",
      0,
      p,
      "p",
      0,
      (e) => {
        let t = `${m(e.identity)}|${e.lane}`,
          n = h.get(t);
        for (
          void 0 !== n && n !== e && v(t), h.delete(t), h.set(t, e);
          h.size > 4;

        ) {
          let e = h.keys().next().value;
          if (void 0 === e) break;
          v(e);
        }
        b();
      },
      "C",
      0,
      y,
    ],
    769953,
  );
  var S = e.i(969673);
  let k = "bridge",
    I = BigInt(0),
    q = BigInt(1e4),
    $ = (e) => Math.max(1e3, e),
    B = (e) => e?.provider === k,
    N = (e) => {
      try {
        let t = BigInt(e);
        return t >= I ? t : null;
      } catch {
        return null;
      }
    },
    M = (e) => BigInt(Math.max(0, Math.round(e))),
    T = ({ direction: e, atomicAmount: t, solanaAsset: n, solUsdPrice: i }) => {
      if (t <= I) return null;
      if ("sell" === e) return "usdc" === n ? t.toString() : null;
      if ("usdc" === n) return t.toString();
      let a = (0, S.G)({ lamports: t, solPriceUsd: i });
      return "0" === a ? null : a;
    },
    j = ({ quote: e, direction: t, atomicAmount: n, slippageBps: i }) => {
      let a = N(e.expected_out);
      if (null === a || a === I) return null;
      let r = (a * (q - BigInt($(i)))) / q,
        s = Date.parse(e.expires_at),
        l = {
          fromAmount: n.toString(),
          transactions: [],
          provider: k,
          expiresAt: Number.isFinite(s) ? s : void 0,
        };
      if ("sell" === t) {
        if (!e.covers_skim) return null;
        let t = N(e.payout);
        if (null === t || t === I) return null;
        let n = M(e.skim),
          i = r > n ? r - n : I;
        return {
          ...l,
          toAmount: t.toString(),
          toAmountMin: i.toString(),
          fees: { gas: n.toString(), total: n.toString() },
        };
      }
      let o = M(e.fee);
      return {
        ...l,
        toAmount: a.toString(),
        toAmountMin: r.toString(),
        fees: { gas: o.toString(), total: o.toString() },
      };
    };
  e.s(["D", 0, k, "v", 0, T, "N", 0, $, "U", 0, B, "u", 0, j], 902627);
  let U = BigInt(0),
    P = BigInt(1e4),
    E = (e) => {
      if (null == e) return null;
      try {
        let t = BigInt(e);
        return t > U ? t : null;
      } catch {
        return null;
      }
    },
    W = (e) => BigInt(Math.max(0, Math.round(e))),
    D = (e) => {
      let t = Date.parse(e);
      return Number.isFinite(t) ? t : void 0;
    };
  var C = e.i(337749),
    R = e.i(170356),
    F = e.i(51121),
    O = e.i(526317),
    L = e.i(541710),
    K = e.i(299092),
    Q = e.i(399015),
    G = e.i(460261),
    V = e.i(613677),
    X = e.i(342463),
    Z = e.i(297865),
    J = e.i(637782),
    H = e.i(417326),
    Y = e.i(342652);
  let ee = V.z.object({
      to_amount: X.z.string(),
      to_amount_min: X.z.string(),
      fees: V.z.object({
        gas: X.z.string(),
        protocol: X.z.string(),
        total: X.z.string(),
      }),
      from_amount_usd: X.z.string().nullish(),
      to_amount_usd: X.z.string().nullish(),
      total_impact_usd: X.z.string().nullish(),
      total_impact_percent: X.z.string().nullish(),
      swap_impact_usd: X.z.string().nullish(),
      swap_impact_percent: X.z.string().nullish(),
      disable_swap_provider_preference: Z.z.boolean(),
      ttl_seconds: J.z.number(),
      expires_at: J.z.number(),
      sponsored: Z.z.boolean(),
      venue: H.z.literal("relay"),
    }),
    et = V.z.object({
      error: X.z.string().optional(),
      data: V.z.object({ reason: X.z.string().optional() }).optional(),
    });
  async function en(e) {
    let t,
      n,
      i = (n = (0, G.L)(e.chainId))
        ? {
            user: e.solanaWalletAddress,
            evm_chain: n,
            to_token: e.mint,
            amount: e.atomicAmount.toString(),
            denomination: (e.solanaAsset ?? "sol") === "usdc" ? "usd" : "sol",
            recipient_evm: e.evmWalletAddress,
            slippage_bps: e.slippageBps,
            disable_swap_provider_preference: !0,
            ...("buy" === e.direction && e.calloutUser
              ? { callout_user: e.calloutUser }
              : {}),
          }
        : null;
    if (!i)
      return {
        kind: "error",
        reason: "UNSUPPORTED_CHAIN",
        message: "This chain isn't supported for cross-chain trading yet.",
      };
    try {
      t = await (0, Y.b)("transactions/relay-buy-preview", i, {
        retryLimit: 0,
      });
    } catch {
      return { kind: "error", message: "Network error fetching quote." };
    }
    if (t.status < 200 || t.status >= 300) {
      let e = et.safeParse(t.body),
        n = e.success ? e.data : void 0;
      return {
        kind: "error",
        status: t.status,
        reason: n?.data?.reason,
        message: n?.error ?? `Quote failed (${t.status})`,
      };
    }
    let a = ee.safeParse(t.body);
    return a.success
      ? {
          kind: "ok",
          data: {
            fromAmount: i.amount,
            toAmount: a.data.to_amount,
            toAmountMin: a.data.to_amount_min,
            exchangeRate: "",
            fees: a.data.fees,
            transactions: [],
            provider: a.data.venue,
            expiresAt: a.data.expires_at,
            quoteId: "",
            fromAmountUsd: a.data.from_amount_usd ?? void 0,
            toAmountUsd: a.data.to_amount_usd ?? void 0,
            totalImpactUsd: a.data.total_impact_usd ?? void 0,
            totalImpactPercent: a.data.total_impact_percent ?? void 0,
            swapImpactUsd: a.data.swap_impact_usd ?? void 0,
            swapImpactPercent: a.data.swap_impact_percent ?? void 0,
          },
        }
      : {
          kind: "error",
          reason: "QUOTE_PARSE_FAILED",
          message: "Unexpected quote shape.",
        };
  }
  e.s(["f", 0, en], 396364);
  let ei = BigInt(0),
    ea = (e) => {
      let t = y(e),
        n = (0, d.B)(e);
      return () => {
        (t(), n());
      };
    },
    er = () => null,
    es = async ({
      request: e,
      chainId: t,
      solUsdPrice: n,
      t: i,
      signal: a,
    }) => {
      let r,
        s = T({
          direction: e.direction,
          atomicAmount: e.atomicAmount,
          solanaAsset: e.solanaAsset ?? "sol",
          solUsdPrice: n,
        });
      if (null === s) return null;
      let l = { mint: e.mint, chainId: t, direction: e.direction };
      if ((0, C.F)(l)) return null;
      try {
        r = await (0, o.o)(
          {
            direction: e.direction,
            evm_chain_id: t,
            evm_token: e.mint,
            amount_in: s,
          },
          { signal: a },
        );
      } catch (e) {
        if (!(0, O.v)(e)) throw e;
        if (e.code === O.s)
          throw new G.X(i("web.trade.relay_error_region_restricted"), {
            reason: G.f,
            status: e.status,
          });
        return ((0, C.L)({ ...l, code: e.code, status: e.status }), null);
      }
      return j({
        quote: r,
        direction: e.direction,
        atomicAmount: e.atomicAmount,
        slippageBps: e.slippageBps,
      });
    };
  function el() {
    return Date.now();
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let u,
          c,
          m,
          h,
          _,
          b,
          y,
          v,
          w = (0, t.c)(50),
          { t: z } = (0, r.f)(),
          {
            mint: A,
            chainId: S,
            direction: I,
            atomicAmount: q,
            calloutUser: N,
            solanaAsset: M,
            solanaWalletAddress: T,
            evmWalletAddress: j,
            slippageBps: C,
            solUsdPrice: O,
            spotUsdPrice: V,
            enabled: X,
            pausePreview: Z,
            inputDebounceMs: J,
          } = e,
          H = void 0 === M ? "sol" : M,
          Y = void 0 === X || X,
          ee = void 0 === J ? 250 : J,
          { userId: et } = (0, n.F)(),
          eo = "buy" === I ? N : void 0,
          eu = (0, L.l)(),
          ed = (0, G.b)(S),
          ec = (0, l.G)({ chainId: ed, mint: A }),
          em =
            (0, o._)() &&
            null !== ed &&
            (0, R.X)(ed, eu) &&
            !(0, Q.G)(A) &&
            !ec &&
            !!et &&
            !!T,
          eg =
            Y &&
            em &&
            null !== ed &&
            "string" == typeof T &&
            "string" == typeof j &&
            null !== q &&
            q > ei
              ? (({
                  direction: e,
                  mint: t,
                  chainId: n,
                  solanaWallet: i,
                  evmWallet: a,
                  atomicAmount: r,
                  solanaAsset: s,
                  slippageBps: l,
                  calloutUser: o,
                }) => {
                  if ("sell" === e)
                    return (0, d.n)(
                      (0, F.C)({
                        solanaWallet: i,
                        evmWallet: a,
                        chainId: n,
                        mint: t,
                        amountAtomic: r,
                        slippageBps: l,
                        payoutDenomination: (0, F._)(s),
                      }),
                    );
                  let u = (0, K.I)({ paymentAsset: s, atomicAmount: r });
                  return null === u
                    ? null
                    : g({
                        solanaWallet: i,
                        evmWallet: a,
                        chainId: n,
                        mint: t,
                        slippageBps: l,
                        funding: u,
                        ...(o ? { calloutUser: o } : {}),
                      });
                })({
                  direction: I,
                  mint: A,
                  chainId: ed,
                  solanaWallet: T,
                  evmWallet: j,
                  atomicAmount: q,
                  solanaAsset: H,
                  slippageBps: C,
                  calloutUser: eo,
                })
              : null;
        w[0] !== I || w[1] !== eg
          ? ((u = () =>
              ((e, t) => {
                if (null === t) return null;
                if ("buy" === e) {
                  let e = x(t);
                  return null === e
                    ? null
                    : `${e.created.intent_id}|${e.createdAt}|${e.quoteStatus}|${e.consumed}`;
                }
                let n = (0, d.Q)(t);
                return null === n
                  ? null
                  : `${n.created.intent_id}|${n.signedAt}|${n.consumed}`;
              })(I, eg)),
            (w[0] = I),
            (w[1] = eg),
            (w[2] = u))
          : (u = w[2]);
        let ep = (0, a.useSyncExternalStore)(ea, u, er),
          [ef, eh] = (0, a.useState)(el),
          [e_, eb] = (0, a.useState)(ep);
        (e_ !== ep && (eb(ep), eh(Date.now())),
          w[3] !== ep
            ? ((c = () => {
                if (null === ep) return;
                let e = setInterval(() => eh(Date.now()), 5e3);
                return () => clearInterval(e);
              }),
              (m = [ep]),
              (w[3] = ep),
              (w[4] = c),
              (w[5] = m))
            : ((c = w[4]), (m = w[5])),
          (0, a.useEffect)(c, m));
        let ey =
          null === eg || null === ep
            ? null
            : "buy" === I
              ? ((
                  e,
                  { now: t = Date.now(), spotUsdPrice: n, solPriceUsd: i } = {},
                ) => {
                  if (
                    null === e ||
                    "ready" !== e.quoteStatus ||
                    f(e, t) ||
                    (0, d.r)(e, n) ||
                    p(e, i)
                  )
                    return null;
                  let { quote: a } = e.created,
                    r = E(a.expected_out);
                  if (null === r) return null;
                  let s = BigInt($(e.identity.slippageBps)),
                    l = E(a.min_out) ?? (r * (P - s)) / P,
                    o = W(a.fee),
                    { funding: u } = e.identity;
                  return {
                    quote: {
                      fromAmount: "usdc" === u.kind ? u.amountIn : u.lamports,
                      toAmount: r.toString(),
                      toAmountMin: l.toString(),
                      transactions: [],
                      provider: k,
                      expiresAt: D(a.expires_at),
                      fees: { gas: o.toString(), total: o.toString() },
                    },
                    quotedAt: e.createdAt,
                    source: "presign",
                  };
                })(x(eg), { now: ef, spotUsdPrice: V, solPriceUsd: O })
              : ((e, { now: t = Date.now(), spotUsdPrice: n } = {}) => {
                  if (
                    null === e ||
                    "sol" === e.request.payout_denomination ||
                    (0, d.q)(e, t) ||
                    (0, d.s)(e, t) ||
                    (0, d.r)(e, n)
                  )
                    return null;
                  let { quote: i } = e.created,
                    a = E(i.expected_out);
                  if (null === a) return null;
                  let r = W(i.skim),
                    s = a - r;
                  if (s <= U) return null;
                  let l = E(i.min_out) ?? U,
                    o = l > r ? l - r : U;
                  return {
                    quote: {
                      fromAmount: e.request.amount_in,
                      toAmount: s.toString(),
                      toAmountMin: o.toString(),
                      transactions: [],
                      provider: k,
                      expiresAt: D(i.expires_at),
                      fees: { gas: r.toString(), total: r.toString() },
                    },
                    quotedAt: e.signedAt,
                    source: "presign",
                  };
                })((0, d.Q)(eg), { now: ef, spotUsdPrice: V });
        w[6] !== q
          ? ((h = null === q ? null : q.toString()), (w[6] = q), (w[7] = h))
          : (h = w[7]);
        let ev = h,
          [ew] = (0, s.r)(ev, ee),
          ex = 0 === ee ? ev : ew,
          ez = ev === ex,
          eA = !!(Y && A && S && T && j && ex && "0" !== ex);
        (w[8] !== em ||
        w[9] !== eo ||
        w[10] !== S ||
        w[11] !== I ||
        w[12] !== j ||
        w[13] !== A ||
        w[14] !== ex ||
        w[15] !== C ||
        w[16] !== H ||
        w[17] !== T
          ? ((_ = ["relayQuotePreview", A, S, I, ex, H, T, j, C, em, eo]),
            (w[8] = em),
            (w[9] = eo),
            (w[10] = S),
            (w[11] = I),
            (w[12] = j),
            (w[13] = A),
            (w[14] = ex),
            (w[15] = C),
            (w[16] = H),
            (w[17] = T),
            (w[18] = _))
          : (_ = w[18]),
          w[19] !== em ||
          w[20] !== eo ||
          w[21] !== eu ||
          w[22] !== S ||
          w[23] !== I ||
          w[24] !== j ||
          w[25] !== A ||
          w[26] !== ed ||
          w[27] !== ex ||
          w[28] !== C ||
          w[29] !== O ||
          w[30] !== H ||
          w[31] !== T ||
          w[32] !== z ||
          w[33] !== et
            ? ((b = async (e) => {
                let { signal: t } = e,
                  n = {
                    direction: I,
                    mint: A,
                    solanaAsset: H,
                    chainId: S,
                    atomicAmount: BigInt(ex),
                    solanaWalletAddress: T,
                    evmWalletAddress: j,
                    slippageBps: C,
                    ...(eo ? { calloutUser: eo } : {}),
                  };
                if (em && null !== ed) {
                  let e = await es({
                    request: n,
                    chainId: ed,
                    solUsdPrice: O,
                    t: z,
                    signal: t,
                  });
                  if (e) return e;
                }
                let i = (0, R.c)({
                  chainId: ed,
                  userId: et,
                  mint: n.mint,
                  direction: n.direction,
                  gateCode: T ? void 0 : "solana_wallet_missing",
                  exposure: eu,
                });
                if (i) throw (0, R.b)(i, z);
                let a = "buy" === I ? await en(n) : await (0, G.E)(n);
                if ("error" === a.kind)
                  throw new G.X((0, G.s)(a, { chainId: S, t: z }), {
                    reason: a.reason,
                    status: a.status,
                  });
                return a.data;
              }),
              (w[19] = em),
              (w[20] = eo),
              (w[21] = eu),
              (w[22] = S),
              (w[23] = I),
              (w[24] = j),
              (w[25] = A),
              (w[26] = ed),
              (w[27] = ex),
              (w[28] = C),
              (w[29] = O),
              (w[30] = H),
              (w[31] = T),
              (w[32] = z),
              (w[33] = et),
              (w[34] = b))
            : (b = w[34]));
        let eS = !!ez && !(void 0 !== Z && Z) && 12e3;
        w[35] !== eA || w[36] !== eS || w[37] !== _ || w[38] !== b
          ? ((y = {
              queryKey: _,
              queryFn: b,
              enabled: eA,
              retry: !1,
              refetchInterval: eS,
              staleTime: 0,
              gcTime: 3e4,
            }),
            (w[35] = eA),
            (w[36] = eS),
            (w[37] = _),
            (w[38] = b),
            (w[39] = y))
          : (y = w[39]);
        let ek = (0, i.useQuery)(y),
          eI =
            eA && void 0 !== ek.data && null !== ek.data
              ? { quote: ek.data, quotedAt: ek.dataUpdatedAt, source: "fetch" }
              : null,
          eq = ez
            ? ((...e) => {
                let t = null;
                for (let n of e)
                  null !== n &&
                    (null === t || n.quotedAt > t.quotedAt) &&
                    (t = n);
                return t;
              })(ey, eI)
            : (ey ?? eI),
          e$ = eq?.source === "presign",
          eB = null === eq ? null : eq.quote,
          eN = null === eq ? null : eq.source,
          eM =
            null === eq
              ? null
              : B(eq.quote)
                ? "bridge"
                : "buy" === I
                  ? "bapi"
                  : "relay",
          eT = !e$ && ek.isFetching,
          ej = !e$ && eA && ek.error instanceof Error ? ek.error.message : null,
          eU = eA && ek.error instanceof G.X ? (ek.error.reason ?? null) : null,
          eP = Math.max(ek.dataUpdatedAt, ek.errorUpdatedAt),
          eE = eq?.source === "fetch" ? 12e3 : null;
        return (
          w[40] !== ez ||
          w[41] !== eB ||
          w[42] !== eN ||
          w[43] !== eM ||
          w[44] !== eT ||
          w[45] !== ej ||
          w[46] !== eU ||
          w[47] !== eP ||
          w[48] !== eE
            ? ((v = {
                quote: eB,
                quoteSource: eN,
                venue: eM,
                isFetching: eT,
                isInputSettled: ez,
                errorMessage: ej,
                errorReason: eU,
                quoteSyncedAt: eP,
                refreshMs: eE,
              }),
              (w[40] = ez),
              (w[41] = eB),
              (w[42] = eN),
              (w[43] = eM),
              (w[44] = eT),
              (w[45] = ej),
              (w[46] = eU),
              (w[47] = eP),
              (w[48] = eE),
              (w[49] = v))
            : (v = w[49]),
          v
        );
      },
    ],
    331043,
  );
};
