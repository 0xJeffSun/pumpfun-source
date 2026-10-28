// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(424509),
    n = e.i(352386);
  function i(e, t, n) {
    return void 0 === e ? (t ?? n) : t;
  }
  e.i(353110);
  var o = e.i(648470),
    r = e.i(292686),
    a = e.i(574472),
    s = e.i(92245),
    u = e.i(914549),
    l = e.i(971370),
    m = e.i(606933);
  e.i(12692);
  var c = e.i(398902),
    d = e.i(974658),
    p = e.i(78009),
    g = e.i(240763),
    f = e.i(609926);
  e.i(70833);
  var b = e.i(840585),
    S = e.i(116458),
    A = e.i(777887),
    y = e.i(728141),
    v = e.i(959719),
    _ = e.i(518664),
    k = e.i(762193),
    w = e.i(480133);
  let B = BigInt(0),
    L = BigInt(1),
    I = BigInt(2),
    P = BigInt(1e6),
    h = BigInt(5e3),
    C = BigInt(650240),
    M = BigInt(5080),
    T = (e, t) => {
      if (!Number.isSafeInteger(t) || t < 0)
        throw RangeError(
          `${e} must be a non-negative safe integer, got ${String(t)}`,
        );
    },
    R = (e, t) => {
      if ("bigint" != typeof t || t < B)
        throw RangeError(
          `${e} must be a non-negative bigint, got ${String(t)}`,
        );
    },
    E = (e) => (T("bytes", e), C + BigInt(e) * M),
    q = E(165),
    N = E(137),
    O = "default";
  var D = e.i(548127),
    U = e.i(574682),
    x = e.i(51954),
    F = e.i(655397);
  function Q(e) {
    if (!e) return "unknown";
    if (
      !e.pool &&
      e.raydium?.poolKeys &&
      e.raydium.baseVaultAccount &&
      e.raydium.quoteVaultAccount &&
      (!e.bondingCurve || !0 === e.bondingCurve.complete)
    )
      return "raydium";
    if (e.bondingCurve && e.bondingCurveAccountInfo && !e.bondingCurve.complete)
      return "bondingCurve";
    let t = (0, U.f)({
      hasBondingCurve: !!e.bondingCurve,
      bondingCurveComplete: e.bondingCurve?.complete,
      hasBaseMintAccount: !!e.mintAccount,
      hasPool: !!e.pool,
      hasPoolBaseTokenAccount: !!e.poolBaseTokenAccount,
      hasPoolQuoteTokenAccount: !!e.poolQuoteTokenAccount,
    });
    return "pumpSwap" === t || "estimatedPumpSwap" === t
      ? "pumpSwap"
      : "unknown";
  }
  function K(e) {
    return "raydium" === e ? D.L : "pumpSwap" === e ? D.t : D.i;
  }
  let $ = (e) => Number(e) / l.LAMPORTS_PER_SOL,
    W = (e, t) => {
      let n;
      try {
        n = e?.bondingCurve?.quoteMint ?? (0, F.H)(t);
      } catch {
        n = void 0;
      }
      return (0, F.k)(n);
    },
    V = new Map(),
    J = (e, t) => `${e.toBase58()}:${t.toBase58()}`;
  function j(e) {
    return "bondingCurve" === e ? y.n : "pumpSwap" === e ? y.y : null;
  }
  function z({ connection: e, wallet: t, program: n }) {
    let i = J(t, n),
      o = V.get(i);
    if ("boolean" == typeof o) return Promise.resolve(o);
    if (!e) return Promise.resolve(null);
    let r = o;
    if (!r) {
      let o;
      try {
        o = (0, y.h)(t, n);
      } catch {
        return Promise.resolve(null);
      }
      let a = Promise.resolve()
        .then(() => e.getAccountInfo(o))
        .then((e) => {
          let t = null !== e;
          return (V.set(i, t), t);
        });
      (a.catch(() => {
        V.get(i) === a && V.delete(i);
      }),
        V.set(i, a),
        (r = a));
    }
    return (0, k.k)({
      promise: r,
      ms: 1500,
      label: "the volume accumulator read",
    }).catch(() => null);
  }
  function G({ wallet: e, venue: t }) {
    let n = j(t);
    n && V.set(J(e, n), !0);
  }
  function H({
    coinState: e,
    coin: t,
    side: n,
    venue: i,
    userWsolAccountInfo: o,
    tokenBalanceByMint: r,
    userVolumeAccumulatorExists: a,
  }) {
    let s = e?.mintAccount?.accountInfo.owner ?? e?.tokenProgram ?? null,
      u =
        s &&
        ((e, t) => {
          try {
            return e.equals(t);
          } catch {
            return !1;
          }
        })(s, v.S)
          ? 256
          : 165,
      m = !!e?.associatedUserAccountInfo || null,
      c = W(e, t),
      d = (0, F.i)(c),
      p = "pumpSwap" === i || "raydium" === i,
      g = null;
    p && (g = d ? !!o || null : !!r[c.toBase58()] || null);
    let f = {
      baseAtaExists: m,
      baseAtaBytes: u,
      wsolAtaNeeded: p,
      wsolAtaExists: g,
      userVolumeAccumulatorExists: "raydium" === i || a,
    };
    return (
      "buy" === n &&
        "unknown" !== i &&
        (f.creatorFee = {
          venue: i,
          hasCreator: ((e) => {
            if (!e) return !1;
            try {
              return !e.equals(l.PublicKey.default);
            } catch {
              return !0;
            }
          })(e?.bondingCurve?.creator),
          isCashbackCoin: e?.bondingCurve?.isCashbackCoin ?? !1,
          isSolQuoted: d,
        }),
      f
    );
  }
  async function X(e, t) {
    let { tokenInput: n } = t;
    if (!n) return null;
    try {
      let i = await e.getQuote({
          direction: "buy",
          uiAmount: n.uiAmount,
          inputAtomicAmount: n.inputAtomicAmount,
          slippagePercentage: n.slippagePercentage,
          mint: t.mint,
          coin: t.coin,
          inputSide: "token",
        }),
        o = i?.quote;
      if (!o) return null;
      let r = o.maxInputAmount ?? o.inputAmountUsed ?? o.amount;
      return BigInt(r.toString());
    } catch {
      return null;
    }
  }
  async function Z(e) {
    var t;
    let n = x.f.getState(),
      i = n.coinsByMint[e.mint],
      o = Q(i),
      r = n.user.address;
    if (!r || !n.user.solBalanceLoaded || !i) {
      let t, n;
      return (
        (t = e.side),
        (n = e.amountLamports),
        {
          kind: "ok",
          side: t,
          feeMode: "default",
          amountLamports: n,
          gasPerTxLamports: BigInt(0),
          reserveLamports: BigInt(0),
          gated: !1,
          venue: o,
        }
      );
    }
    let a = W(i, e.coin),
      s = "buy" === e.side && (0, F.i)(a),
      u = s ? e.amountLamports : BigInt(0);
    if (s && e.tokenInput) {
      let t = await X(n, e);
      if (null === t)
        return { kind: "unquoted", side: "buy", gated: !0, venue: o };
      u = t;
    }
    let m = j(o),
      c = m
        ? await z({ connection: n.connection, wallet: r, program: m })
        : null,
      d = K(o);
    return {
      ...((e) => {
        var t, n, i;
        let o, r;
        (R("amountLamports", e.amountLamports),
          R("solBalanceLamports", e.solBalanceLamports));
        let a =
            (T("computeUnitLimit", e.computeUnitLimit),
            T("computeUnitPriceMicroLamports", e.computeUnitPriceMicroLamports),
            R("tipLamports", e.tipLamports),
            h +
              (BigInt(e.computeUnitLimit) *
                BigInt(e.computeUnitPriceMicroLamports) +
                P -
                L) /
                P +
              e.tipLamports),
          s =
            ((t = e.accounts),
            (n = e.side),
            T("baseAtaBytes", t.baseAtaBytes),
            (o = B),
            "buy" === n && !0 !== t.baseAtaExists && (o += E(t.baseAtaBytes)),
            t.wsolAtaNeeded && !0 !== t.wsolAtaExists && (o += q),
            !0 !== t.userVolumeAccumulatorExists && (o += N),
            "buy" === n &&
              t.creatorFee &&
              (o +=
                ((i = t.creatorFee),
                (r = B),
                "bondingCurve" === i.venue && i.hasCreator
                  ? (r += C + q)
                  : "pumpSwap" === i.venue && (r += q),
                i.isCashbackCoin &&
                  i.hasCreator &&
                  ("pumpSwap" === i.venue ||
                    ("bondingCurve" === i.venue && !i.isSolQuoted)) &&
                  (r += q),
                r)),
            o),
          u = e.solBalanceLamports;
        if ("buy" === e.side) {
          let t = I * a + s,
            n = u - t;
          if (n <= B) {
            let n = e.amountLamports + t;
            return {
              kind: "insufficient",
              side: "buy",
              requiredLamports: n,
              reserveLamports: t,
              shortfallLamports: n - u,
            };
          }
          return e.amountLamports > n
            ? {
                kind: "clamped",
                side: "buy",
                feeMode: O,
                amountLamports: n,
                requestedLamports: e.amountLamports,
                gasPerTxLamports: a,
                reserveLamports: t,
              }
            : {
                kind: "ok",
                side: "buy",
                feeMode: O,
                amountLamports: e.amountLamports,
                gasPerTxLamports: a,
                reserveLamports: t,
              };
        }
        let l = a + s;
        if (u >= l)
          return {
            kind: "ok",
            side: "sell",
            feeMode: O,
            amountLamports: e.amountLamports,
            gasPerTxLamports: a,
            reserveLamports: l,
          };
        let m = h + s;
        return u >= m
          ? {
              kind: "dust",
              side: "sell",
              feeMode: "dust",
              gasPerTxLamports: h,
              reserveLamports: m,
            }
          : {
              kind: "insufficient",
              side: "sell",
              requiredLamports: l,
              reserveLamports: l,
              shortfallLamports: l - u,
            };
      })({
        side: e.side,
        amountLamports: u,
        solBalanceLamports: n.getSolBalance().balanceLamports,
        computeUnitLimit: d,
        computeUnitPriceMicroLamports: (function ({
          priorityFeeLamports: e,
          computeUnitLimit: t,
        }) {
          return Math.floor((1e6 * e) / t);
        })({
          priorityFeeLamports:
            null != (t = e.priorityFeeAmount) && Number.isFinite(t)
              ? Math.floor(t * l.LAMPORTS_PER_SOL)
              : D.u,
          computeUnitLimit: d,
        }),
        tipLamports: BigInt((0, w.j)(e.frontRunningProtection, e.tipAmount)),
        accounts: H({
          coinState: i,
          coin: e.coin,
          side: e.side,
          venue: o,
          userWsolAccountInfo: n.user.userWsolAccountInfo,
          tokenBalanceByMint: n.tokenBalanceByMint,
          userVolumeAccumulatorExists: c,
        }),
      }),
      gated: !0,
      venue: o,
    };
  }
  e.s(
    [
      "y",
      0,
      Z,
      "n",
      0,
      $,
      "Z",
      0,
      G,
      "c",
      0,
      function (e) {
        let t = (0, n.useCallback)((t) => t.coinsByMint[e.mint], [e.mint]),
          i = (0, _.f)(x.f, t),
          o = (0, x.f)((e) => e.user.address),
          r = (0, x.f)((e) => e.user.userWsolAccountInfo),
          a = (0, x.f)((e) => e.tokenBalanceByMint),
          s = (0, x.f)((e) => e.connection),
          u = Q(i),
          l = j(u),
          [m, c] = (0, n.useState)(null);
        return (
          (0, n.useEffect)(() => {
            if (!o || !l) return void c(null);
            let e = (function ({ wallet: e, program: t }) {
              let n = V.get(J(e, t));
              return "boolean" == typeof n ? n : null;
            })({ wallet: o, program: l });
            if ((c(e), null !== e)) return;
            let t = !1;
            return (
              z({ connection: s, wallet: o, program: l }).then((e) => {
                t || c(e);
              }),
              () => {
                t = !0;
              }
            );
          }, [s, l, o]),
          {
            computeUnitLimit: K(u),
            accounts: H({
              coinState: i,
              coin: e,
              side: "buy",
              venue: u,
              userWsolAccountInfo: r ?? null,
              tokenBalanceByMint: a ?? {},
              userVolumeAccumulatorExists: m,
            }),
          }
        );
      },
    ],
    68700,
  );
  var Y = e.i(38279),
    ee = e.i(674121),
    et = e.i(385916),
    en = e.i(178496),
    ei = e.i(503630),
    eo = e.i(584229),
    er = e.i(466931),
    ea = e.i(366125);
  e.i(753134);
  var es = e.i(679925),
    eu = e.i(412296),
    el = e.i(778396),
    em = e.i(427140),
    ec = e.i(70596),
    ed = e.i(865259),
    ep = e.i(946550);
  let eg = (e, t) => Number(e.toString()) / 10 ** t,
    ef = async ({
      coin: e,
      tradeDirection: t,
      slippagePercent: n,
      build: i,
      mintAccountInfo: o,
      rebuild: r,
      getSolUsdPrice: a,
      getTokenUsdPrice: s,
      ask: u,
    }) => {
      let l = "buy" === t,
        m = e.base_decimals ?? 6,
        c = (0, F.k)((0, F.H)(e)),
        d = (0, F.N)(c, e.quote_decimals),
        p = (0, F.w)(c),
        g = p ? "USDC" : "SOL",
        f = d ?? (p ? 6 : 9),
        b = (e.symbol ?? "").replace(/^\$/, ""),
        S = () => (p ? 1 : a?.()),
        A = () => s?.(),
        y = Math.max(0, 1 - n / 100);
      return (0, ep.s)({
        mint: e.mint,
        tradeDirection: t,
        paySymbol: l ? g : b,
        receiveSymbol: l ? b : g,
        fallbackRate: (0, ed.L)({
          mintBps: (0, ec.f)(e.mint, o),
          coinBps: e.transfer_fee_bps,
        }),
        getPayUsdPrice: l ? S : A,
        getReceiveUsdPrice: l ? A : S,
        build: i,
        describe: (e) => {
          let t = eg(e.amountBn, m),
            n = eg(e.solAmountBn, f),
            i = l ? t : n;
          return {
            transferFeeBps: null,
            receiveIsNet: !1,
            payUiAmount: l ? n : t,
            receiveUiAmount: i,
            minReceiveUiAmount: i * y,
          };
        },
        rebuild: r,
        ask: u,
      });
    };
  var eb = e.i(110823),
    eb = eb,
    eS = e.i(374240),
    eA = e.i(93903),
    ey = e.i(910222),
    ev = e.i(595673),
    e_ = e.i(374589),
    ek = e.i(198825),
    ew = e.i(569526),
    eB = e.i(561667),
    eL = e.i(456753),
    eI = e.i(564035),
    eP = e.i(653805);
  class eh extends Error {}
  async function eC({
    transaction: e,
    clientServerUrl: t,
    coin: n,
    operation: i,
  }) {
    try {
      return await (0, k.k)({
        promise: (0, es.k)(t, {
          serializedTx: (0, w.Z)(e),
          mint: n.mint,
          isFreeCoinCreation: !0,
        }),
        ms: 1e4,
        label: "the coin creation signature",
      });
    } catch (e) {
      throw (
        (0, er.l)({
          error: e,
          feature: "trade",
          operation: i,
          context: { mint: n.mint, program: n.program },
        }),
        new eh((0, eo.A)(e), { cause: e })
      );
    }
  }
  let eM = (e) => "network-error" === e || "no-blockhash" === e,
    eT = ({ error: e, t }) =>
      (0, eI.D)(e) ? t("web.toasts.build_network_error") : e?.message,
    eR = (e, t = 6) => {
      let [n, i = ""] = e.split("."),
        r = i.padEnd(t, "0").slice(0, t);
      return new o.BN(`${n}${r}`);
    },
    eE = (e, t, n) =>
      t && n
        ? {
            solAmountBn: new o.BN((e.inputAmountUsed ?? BigInt(0)).toString()),
            amountBn: new o.BN(e.amount.toString()),
          }
        : {
            amountBn: new o.BN((e.inputAmountUsed ?? BigInt(0)).toString()),
            solAmountBn: new o.BN(e.amount.toString()),
          },
    eq = (e, t, n, i) =>
      (0, eA.Q)({
        boughtAtomic: t.toString(),
        quoteSpentAtomic: n.toString(),
        quoteMint: e.quote_mint,
        quoteDecimals: e.quote_decimals,
        solUsdPrice: i,
        tokenDecimals: e.base_decimals,
      }),
    eN = (e, t, n) =>
      !e.quote || !e.transaction || e.isMigration || e.isFreeCoinCreation
        ? null
        : { transaction: e.transaction, ...eE(e.quote.quote, t, n) },
    eO = (e) =>
      e.pump_swap_pool || e.pool_address
        ? "pumpswap"
        : e.raydium_pool
          ? "raydium"
          : "bonding_curve",
    eD = "affordability-gate",
    eU = (e, t) =>
      (0, er.l)({
        error: "Affordability gate held a token-input buy: no cached quote",
        feature: "trade",
        operation: eD,
        context: { mint: e.mint, program: e.program, venue: t },
      }),
    ex = ({
      tradeDirection: e,
      coin: t,
      slippage: n,
      screen: i,
      sourceElement: o,
      startedAt: r,
    }) =>
      (0, ev.Sd)({
        tradeDirection: e,
        mint: t.mint,
        error: f.R,
        provider: eO(t),
        slippage: n.toString(),
        blockchainStore: !0,
        screen: i,
        sourceElement: o,
        signals: { durationMs: (0, eS.v)(r) },
        feeMode: eb.f,
        rum: { skip: !0, operation: eD },
      });
  function eF({
    coin: e,
    frontRunningProtection: t,
    tipAmount: f,
    priorityFeeAmount: y,
    slippage: v,
    isBuySelected: _,
    setIsBuySelected: k,
    showOpenCoinToast: w = !1,
  }) {
    let { t: B } = (0, c.f)(),
      [L, I] = (0, n.useState)(!1),
      {
        amount: P,
        setAmount: h,
        clearAmountInputAtomic: C,
        solAmount: M,
        setSolAmount: T,
        nativeSelected: R,
        setNativeSelected: E,
        inputSolValueArrow: q,
        setInputSolValueArrow: N,
        isQuoting: O,
        quoteError: D,
        priceImpactPercent: U,
      } = (0, b.f)({ isBuySelected: _, coin: e, slippagePercentage: v }),
      F = (0, x.f)((e) => e.getSolBalance),
      Q = (0, x.f)((e) => e.getTokenBalance),
      K = (0, n.useCallback)(
        ({ isBuySelected: e, nativeSelected: t, solAmount: n }) => {
          if (!e || !t) return !1;
          let i = F(),
            o = n * l.LAMPORTS_PER_SOL;
          return Number(i.balanceLamports) < o;
        },
        [F],
      ),
      W = (0, n.useCallback)(
        ({ isBuySelected: t, amount: n }) => {
          if (t) return !1;
          let i = Q(e.mint);
          if (!i) return !0;
          let r = eR(n.toString(), e.base_decimals);
          return new o.BN(i.balanceRaw.toString()).lt(r);
        },
        [Q, e.mint, e.base_decimals],
      ),
      V = (0, m.useQueryClient)(),
      {
        address: J,
        userId: j,
        wallet: z,
        shouldUsePrivy: H,
        decodedJwt: X,
      } = (0, a.F)(),
      es = (0, s.$)({ userId: j, address: J }),
      ec = (0, x.f)((e) => e.getSwapTx),
      ed = (0, n.useRef)(new Set()),
      ep = (0, x.f)((e) => e.getQuote),
      eg = (0, x.f)((e) => e.signAndSendTransaction),
      eI = (0, x.f)((e) => e.sendSignedTransaction),
      { getCurrentBatchId: eD } = (0, eL.j)(),
      { setShowWallet: eQ } = (0, ek.useConnectWallet)(),
      {
        setRecentlyTraded: eK,
        handleRecentTrade: e$,
        handleFirstTrade: eW,
      } = (0, eB.L)(),
      { lastClickImpression: eV } = (0, ew.y)(),
      eJ = (0, n.useCallback)(
        async ({
          startedAt: t,
          buildReadyAt: n,
          quoteBuiltAt: i,
          quotedOutput: o,
          signStartedAt: r,
          signedAt: a,
          direction: s,
          uiAmount: u,
          inputSide: l,
          inputAtomicAmount: m,
        }) => {
          let c = {
            durationMs: (0, eS.v)(t),
            quoteAgeMs: (0, eS.v)(i),
            timeToBuildMs: (0, eS._)(t, n),
            timeToSignMs: (0, eS._)(r, a),
          };
          try {
            let t = await ep({
              direction: s,
              uiAmount: u,
              inputAtomicAmount: m,
              slippagePercentage: v,
              mint: e.mint,
              coin: e,
              inputSide: l,
            });
            if (t?.quote) {
              let e = (0, eS.o)(o, BigInt(t.quote.amount.toString()));
              void 0 !== e && (c.priceDriftBps = e);
            }
          } catch {}
          return c;
        },
        [e, ep, v],
      ),
      ej = (0, n.useCallback)(
        async (n, a, s, m) => {
          let c,
            p,
            b,
            _,
            P,
            C = m?.syncFormState ?? !0,
            M = m?.onTradeSubmitted,
            R = m?.sourceElement,
            E = e.mint;
          if (!z) {
            ((0, ev.Lw)({ source: "tradebox" }), eQ(!0), I(!1));
            return;
          }
          (0, ea.f)({
            signerAddress: z.publicKey.toBase58(),
            sessionAddress: X?.address,
            operation: a ? "buy" : "sell",
            mint: E,
          });
          let q = a ? "buy" : "sell",
            N = performance.now(),
            O = n,
            D = s,
            U = eb.f,
            F = "unknown";
          if (n.gtn(0)) {
            let i = await Z({
              side: q,
              mint: E,
              coin: e,
              amountLamports: a && s ? BigInt(n.toString()) : BigInt(0),
              tokenInput:
                a && !s
                  ? {
                      uiAmount: Number(n.toString()) / 1e6,
                      inputAtomicAmount: BigInt(n.toString()),
                      slippagePercentage: v,
                    }
                  : void 0,
              frontRunningProtection: t,
              tipAmount: f,
              priorityFeeAmount: y,
            });
            if (((F = i.venue), "insufficient" === i.kind))
              return (
                ex({
                  tradeDirection: q,
                  coin: e,
                  slippage: v,
                  screen: m?.sourceScreen ?? r.Ae.COIN_DETAILS,
                  sourceElement: R,
                  startedAt: N,
                }),
                (0, g.J)({
                  ...(0, ey.D)({
                    t: B,
                    side: q,
                    symbol: e.symbol ?? e.mint,
                    reason: B("web.toasts.insufficient_sol_for_fees"),
                  }),
                  id: "insufficient-sol-for-fees",
                }),
                I(!1),
                { refused: "insufficient-sol" }
              );
            if ("unquoted" === i.kind)
              return (
                eU(e, i.venue),
                (0, g.J)({
                  ...(0, ey.D)({
                    t: B,
                    side: q,
                    symbol: e.symbol ?? e.mint,
                    reason: B("web.toasts.build_failed"),
                  }),
                  id: "affordability-unquoted",
                }),
                I(!1),
                { refused: "unquoted" }
              );
            ("clamped" === i.kind &&
              ((c = i.amountLamports),
              (O = new o.BN(i.amountLamports.toString())),
              (D = !0),
              m?.onAmountClamped?.($(i.amountLamports))),
              "dust" === i.kind && (U = "dust"));
          }
          if ((0, u.y)({ isPrivyWallet: H })) {
            I(!0);
            let t = await (0, en.M)({
              tradeType: a ? "buy" : "sell",
              coinSymbol: e.symbol ?? e.mint,
            });
            if ("cancel" === t) return void I(!1);
            ("enable" === t && (0, u.C)(!0), (0, u.O)(!0));
          }
          let K = Number(O.toString()),
            W = a && D ? K / l.LAMPORTS_PER_SOL : K / 1e6,
            j = null,
            ed = performance.now(),
            ep = a ? c : BigInt(O.toString()),
            ek = D ? "native" : "token",
            ew = {
              mint: e.mint,
              coin: e,
              creator: e.creator,
              uiAmount: W,
              inputAtomicAmount: ep,
              tradeDirection: a ? "buy" : "sell",
              slippagePercentage: v,
              frontRunningProtection: t,
              tipAmount: f,
              priorityFeeAmount: y,
              feeMode: U,
              newCoinMetadata:
                void 0 !== e.name &&
                void 0 !== e.symbol &&
                void 0 !== e.metadata_uri
                  ? { name: e.name, symbol: e.symbol, uri: e.metadata_uri }
                  : void 0,
              inputSide: ek,
            },
            eB = await ec(ew),
            eL = performance.now(),
            eR = new WeakMap(),
            eF = eL;
          if (!eB.quote || !eB.transaction) {
            let t = {
              mint: E,
              program: e.program,
              tradeDirection: a ? "buy" : "sell",
              inputSide: D ? "native" : "token",
              reason: eB.failureReason,
            };
            (eM(eB.failureReason)
              ? (0, er.B)({
                  name: "trade-build-unreachable",
                  feature: "trade",
                  operation: "build-transaction",
                  context: t,
                })
              : (0, er.l)({
                  error: "Could not get quote or build transaction",
                  feature: "trade",
                  operation: "build-transaction",
                  context: t,
                }),
              (0, g.J)(
                (0, ey.D)({
                  t: B,
                  side: a ? "buy" : "sell",
                  symbol: e.symbol ?? e.mint,
                  reason: (({ reason: e, t }) =>
                    t(
                      eM(e)
                        ? "web.toasts.build_network_error"
                        : "web.toasts.build_failed",
                    ))({ reason: eB.failureReason, t: B }),
                }),
              ),
              I(!1));
            return;
          }
          if (((p = a ? "buy" : "sell"), eB.isMigration))
            ((j = eB.transaction), (b = new o.BN(0)), (_ = new o.BN(0)));
          else if (eB.isFreeCoinCreation) {
            let t = (0, ei.R)();
            if (!t) {
              ((0, g.J)((0, ey.a)({ t: B, cause: "not_configured" })), I(!1));
              return;
            }
            ((j = eB.transaction),
              (P = (n) =>
                eC({
                  transaction: n,
                  clientServerUrl: t,
                  coin: e,
                  operation: "sign-create-tx",
                })));
          } else j = eB.transaction;
          let ej = eB.quote.quote,
            ez = BigInt(ej.amount.toString());
          ({ amountBn: b, solAmountBn: _ } = eE(ej, a, D));
          let eG = b.toNumber() / 1e6,
            eH = _.toNumber() / l.LAMPORTS_PER_SOL;
          if ((C && (k(a), h(eG), T(eH)), !L)) {
            if ((I(!0), !eB.isMigration && !eB.isFreeCoinCreation && j))
              try {
                let t = await ef({
                  coin: e,
                  tradeDirection: a ? "buy" : "sell",
                  slippagePercent: v,
                  build: { transaction: j, amountBn: b, solAmountBn: _ },
                  mintAccountInfo:
                    x.f.getState().coinsByMint[e.mint]?.mintAccount
                      ?.accountInfo,
                  getSolUsdPrice: () => V.getQueryData(Y.Q.SOL_PRICE),
                  getTokenUsdPrice: () =>
                    (0, em.f)(e, eP.x.getState().getCoin(e.mint)).tokenUsdPrice,
                  rebuild: async () => {
                    try {
                      let e = eN(await ec(ew), a, D);
                      return (e && eR.set(e.transaction, performance.now()), e);
                    } catch {
                      return null;
                    }
                  },
                });
                ((j = t.transaction),
                  (b = t.amountBn),
                  (_ = t.solAmountBn),
                  (eF = eR.get(t.transaction) ?? eL));
              } catch (e) {
                if (e instanceof el.l) return void I(!1);
                throw e;
              }
            try {
              if (O.lten(0)) {
                ((0, g.J)((0, ey.y)({ t: B })), I(!1));
                return;
              }
              let n = async () => {
                try {
                  let n;
                  if (!z) return;
                  let o = m?.sourceScreen ?? r.Ae.COIN_DETAILS,
                    s = eV?.mint === e.mint ? eV.impression : void 0,
                    u = {
                      absolutePosition: m?.absolutePosition ?? s?.itemPosition,
                      recommendationId: m?.recommendationId ?? s?.rec_id,
                      recommendationRank: i(
                        m?.recommendationId,
                        m?.recommendationRank,
                        s?.recommendationRank,
                      ),
                    };
                  try {
                    s
                      ? (0, ev.u_)({
                          mint: e.mint,
                          tradeDirection: a ? "buy" : "sell",
                          solAmount: _.toNumber() / l.LAMPORTS_PER_SOL,
                          usdMarketCap: e.usd_market_cap,
                          program: (0, ev.LN)(e.program),
                          isLivestreamActive: e.is_currently_live,
                          ...u,
                          isPinned:
                            m?.recommendationId === void 0
                              ? (0, e_.f)(s.sourceElement, s.rec_id)
                              : void 0,
                          positionId: s.positionId,
                          calloutId: m?.calloutId ?? s.calloutId,
                          screen: o,
                          sourceElement: R,
                        })
                      : (0, ev.u_)({
                          mint: e.mint,
                          tradeDirection: a ? "buy" : "sell",
                          solAmount: _.toNumber() / l.LAMPORTS_PER_SOL,
                          usdMarketCap: e.usd_market_cap,
                          program: (0, ev.LN)(e.program),
                          isLivestreamActive: e.is_currently_live,
                          ...u,
                          calloutId: m?.calloutId,
                          screen: o,
                          sourceElement: R,
                        });
                  } catch (e) {
                    console.error(
                      "[Analytics] Failed to track trade initiation:",
                      e,
                    );
                  }
                  let c = e.mint,
                    f = Q(e.mint)?.balanceRaw.toString(),
                    y = _.toNumber(),
                    k = b.divn(1e6).toNumber(),
                    { toastId: L, interval: h } =
                      "buy" === p
                        ? (0, d.b)(k, e.symbol ?? e.mint, _, void 0, e)
                        : (0, d.D)(k, e.symbol ?? e.mint, _, void 0, e);
                  try {
                    let i = eD().id,
                      r = m?.batchSign
                        ? await (0, A.B)({
                            transaction: j,
                            frontRunningProtection: t,
                            walletKey: z.publicKey.toBase58(),
                            signAllTransactions: z.signAllTransactions
                              ? (e) => z.signAllTransactions(e)
                              : void 0,
                            signTransaction: (e) => z.signTransaction(e),
                            prepareTransaction: async (e) => {
                              let t = x.f.getState().connection;
                              if (!t) throw Error("No connection available");
                              let n = await (0, eu.c)({
                                connection: t,
                                transaction: e,
                              });
                              if (!P) return n;
                              let i = await P(n);
                              return ((0, eu.s)({ from: n, to: i }), i);
                            },
                            sendSignedTransaction: eI,
                            onSigningStarted: () => {
                              n = performance.now();
                            },
                          })
                        : await (0, A._)(() =>
                            eg({
                              transaction: j,
                              coSignTransaction: P,
                              onSigningStarted: () => {
                                n = performance.now();
                              },
                              wallet: z,
                              frontRunningProtection: t,
                              batchId: i,
                            }),
                          );
                    if (!r) throw Error("Transaction failed to send");
                    M?.();
                    let {
                        signature: a,
                        confirmTxPromise: s,
                        signedTimestamp: d,
                      } = r,
                      B =
                        "buy" === p && es
                          ? {
                              mint: c,
                              existingCalloutPromise: (0, S.n)(V, es, c),
                              screen: o,
                            }
                          : void 0;
                    (0, g.Q)({
                      type: p,
                      mint: c,
                      coin: e,
                      amount: k,
                      symbol: e.symbol ?? e.mint,
                      solAmount: _,
                      signature: a,
                      interval: h,
                      toastId: L,
                      confirmTxPromise: s,
                      signedTimestamp: d,
                      showOpenCoin: w,
                      buyCalloutCta: B,
                      shareCta: J ? { coin: e, holderAddress: J } : void 0,
                      onShowToastSuccess: () => {
                        (J &&
                          (0, eA.K)({
                            mint: c,
                            walletAddress: J,
                            direction: p,
                            signature: a,
                            ...("sell" === p
                              ? {
                                  soldAtomic: b.toString(),
                                  balanceBeforeAtomic: f,
                                  tokenDecimals: e.base_decimals ?? void 0,
                                }
                              : eq(e, b, _, V.getQueryData(Y.Q.SOL_PRICE))),
                          }),
                          G({ wallet: z.publicKey, venue: F }),
                          (0, ev.V9)({
                            tradeDirection: p,
                            mint: c,
                            solAmount: y / l.LAMPORTS_PER_SOL,
                            tokenAmount: k,
                            signature: a,
                            provider: eO(e),
                            isLivestreamActive: e.is_currently_live,
                            blockchainStore: !0,
                            screen: o,
                            sourceElement: R,
                            ...u,
                            feeMode: U,
                            signals: {
                              durationMs: (0, eS.v)(ed),
                              quoteAgeMs: (0, eS.v)(eF),
                              timeToConfirmMs: (0, eS.v)(d),
                              timeToBuildMs: (0, eS._)(ed, eL),
                              timeToSignMs: (0, eS._)(n, d),
                            },
                          }));
                      },
                      onShowToastError: (t) => {
                        (0, ev.Sd)({
                          tradeDirection: p,
                          mint: e.mint,
                          error: (0, eo.A)(t) || "Unknown error",
                          errorCode: (0, eo.N)(t),
                          signatures: [a],
                          provider: eO(e),
                          slippage: v.toString(),
                          blockchainStore: !0,
                          screen: o,
                          sourceElement: R,
                          feeMode: U,
                          signals: {
                            durationMs: (0, eS.v)(ed),
                            quoteAgeMs: (0, eS.v)(eF),
                            timeToBuildMs: (0, eS._)(ed, eL),
                            timeToSignMs: (0, eS._)(n, d),
                          },
                          rum: { error: t, operation: "confirm-transaction" },
                        });
                      },
                    });
                  } catch (i) {
                    (console.error(`could not ${p}`, i), clearInterval(h));
                    let t = await eJ({
                      startedAt: ed,
                      buildReadyAt: eL,
                      quoteBuiltAt: eF,
                      signStartedAt: n,
                      quotedOutput: ez,
                      direction: p,
                      uiAmount: W,
                      inputSide: ek,
                      inputAtomicAmount: ep,
                    });
                    ((0, ev.Sd)({
                      tradeDirection: p,
                      mint: e.mint,
                      error: i?.message || "Unknown error",
                      errorCode: (0, eo.N)(i),
                      provider: eO(e),
                      slippage: v.toString(),
                      blockchainStore: !0,
                      screen: o,
                      sourceElement: R,
                      feeMode: U,
                      signals: t,
                    }),
                      (0, g.J)({
                        ...(i instanceof eh
                          ? (0, ey.a)({ t: B, cause: "server_signature" })
                          : (0, ey.D)({
                              t: B,
                              side: p,
                              symbol: e.symbol ?? e.mint,
                              reason: eT({ error: i, t: B }),
                            })),
                        id: L,
                      }),
                      I(!1));
                    return;
                  }
                  (e$(e.mint),
                    eK(!0),
                    a && eW(),
                    J && ((0, ee.r)(V, J, e.mint), (0, et.f)(V, J)));
                } catch (e) {
                  console.error("Trade failed:", e);
                }
              };
              await n();
            } catch (t) {
              (console.error("Trade failed:", t),
                (0, er.l)({
                  error: (0, eo.S)(t) ? eo.k : t,
                  feature: "trade",
                  operation: "place-trade",
                  context: {
                    mint: E,
                    program: e.program,
                    tradeDirection: a ? "buy" : "sell",
                  },
                }));
            } finally {
              I(!1);
            }
          }
        },
        [
          J,
          es,
          e,
          X,
          t,
          eD,
          ec,
          eW,
          e$,
          L,
          eV,
          eJ,
          V,
          h,
          k,
          eK,
          eQ,
          T,
          H,
          eg,
          eI,
          Q,
          w,
          v,
          f,
          y,
          z,
          B,
        ],
      ),
      ez = (0, n.useCallback)(
        async (n, a, s, u) => {
          let m,
            c,
            d,
            g,
            b = u?.onTradeSubmitted,
            _ = e.mint,
            k = u?.sourceElement ?? r.k9.QUICK_TRADE,
            L = u?.sourceScreen ?? r.Ae.COIN_DETAILS,
            I =
              u?.absolutePosition ??
              (eV?.mint === e.mint ? eV.impression.itemPosition : void 0),
            P =
              u?.recommendationId ??
              (eV?.mint === e.mint ? eV.impression.rec_id : void 0),
            h = i(
              u?.recommendationId,
              u?.recommendationRank,
              eV?.mint === e.mint ? eV.impression.recommendationRank : void 0,
            ),
            C =
              u?.calloutId ??
              (eV?.mint === e.mint ? eV.impression.calloutId : void 0),
            M = eV?.mint === e.mint ? eV.impression.positionId : void 0;
          if (!z) return void eQ(!0);
          if (n.lten(0)) return;
          let T = a ? "buy" : "sell",
            R = Number(n.toString()),
            E = a && s ? R / l.LAMPORTS_PER_SOL : R / 1e6,
            q = (0, p.f)({
              type: T,
              symbol: e.symbol ?? e.mint,
              tokenAmount: a && s ? 0 : R / 1e6,
              solAmount: a && s ? n.clone() : new o.BN(0),
              mint: _,
              showOpenCoin: w,
              buyCalloutCta:
                "buy" === T && es
                  ? {
                      mint: _,
                      existingCalloutPromise: (0, S.n)(V, es, _),
                      screen: L,
                    }
                  : void 0,
            }),
            N = performance.now(),
            O = n,
            D = s,
            U = eb.f,
            F = await Z({
              side: T,
              mint: _,
              coin: e,
              amountLamports: a && s ? BigInt(n.toString()) : BigInt(0),
              tokenInput:
                a && !s
                  ? {
                      uiAmount: E,
                      inputAtomicAmount: BigInt(n.toString()),
                      slippagePercentage: v,
                    }
                  : void 0,
              frontRunningProtection: t,
              tipAmount: f,
              priorityFeeAmount: y,
            }),
            K = F.venue;
          if ("insufficient" === F.kind) {
            (ex({
              tradeDirection: T,
              coin: e,
              slippage: v,
              screen: L,
              sourceElement: k,
              startedAt: N,
            }),
              q.markFailed(B("web.toasts.insufficient_sol_for_fees")));
            return;
          }
          if ("unquoted" === F.kind) {
            (eU(e, F.venue),
              q.markFailed(B("web.toasts.quick_trade_build_failed")));
            return;
          }
          ("clamped" === F.kind &&
            ((m = F.amountLamports),
            (O = new o.BN(F.amountLamports.toString())),
            (D = !0),
            (E = Number(O.toString()) / l.LAMPORTS_PER_SOL),
            q.updateAmounts({ tokenAmount: 0, solAmount: O.clone() })),
            "dust" === F.kind && (U = "dust"));
          let $ = performance.now(),
            W = Q(_)?.balanceRaw.toString(),
            j = a ? m : BigInt(O.toString()),
            H = D ? "native" : "token",
            X = {
              mint: e.mint,
              coin: e,
              creator: e.creator,
              uiAmount: E,
              inputAtomicAmount: j,
              tradeDirection: a ? "buy" : "sell",
              slippagePercentage: v,
              frontRunningProtection: t,
              tipAmount: f,
              priorityFeeAmount: y,
              feeMode: U,
              newCoinMetadata:
                void 0 !== e.name &&
                void 0 !== e.symbol &&
                void 0 !== e.metadata_uri
                  ? { name: e.name, symbol: e.symbol, uri: e.metadata_uri }
                  : void 0,
              inputSide: H,
            };
          try {
            c = await ec(X);
          } catch (t) {
            ((0, er.l)({
              error: t,
              feature: "trade",
              operation: "quick-build-transaction",
              context: {
                mint: _,
                program: e.program,
                tradeDirection: T,
                inputSide: s ? "native" : "token",
              },
            }),
              q.markFailed(B("web.toasts.quick_trade_build_failed")));
            return;
          }
          if (!c.quote || !c.transaction || c.isMigration) {
            if (eM(c.failureReason)) {
              ((0, er.B)({
                name: "trade-build-unreachable",
                feature: "trade",
                operation: "quick-build-transaction",
                context: {
                  mint: _,
                  program: e.program,
                  tradeDirection: T,
                  inputSide: s ? "native" : "token",
                  reason: c.failureReason,
                },
              }),
                q.markFailed(B("web.toasts.build_network_error")));
              return;
            }
            q.markFailed(
              !1 === e.initialized
                ? a
                  ? B("web.toasts.quick_trade_coin_not_onchain_buy")
                  : B("web.toasts.quick_trade_coin_not_onchain_sell")
                : B("web.toasts.quick_trade_unavailable"),
            );
            return;
          }
          let en = performance.now(),
            ea = new WeakMap(),
            eu = en,
            ep = c.transaction,
            ey = !0 === c.isFreeCoinCreation;
          if (ey) {
            if (ed.current.has(_))
              return void q.markFailed(
                B("web.toasts.quick_trade_coin_launching"),
              );
            let t = (0, ei.R)();
            if (!t)
              return void q.markFailed(
                B("web.toasts.quick_trade_launch_failed"),
              );
            (ed.current.add(_),
              (d = (n) =>
                eC({
                  transaction: n,
                  clientServerUrl: t,
                  coin: e,
                  operation: "quick-sign-create-tx",
                })));
          }
          let ek = () => {
              ey && ed.current.delete(_);
            },
            ew = c.quote.quote,
            eB = BigInt(ew.amount.toString()),
            { amountBn: eL, solAmountBn: eI } = eE(ew, a, D);
          if (!ey)
            try {
              let t = await ef({
                coin: e,
                tradeDirection: T,
                slippagePercent: v,
                build: { transaction: ep, amountBn: eL, solAmountBn: eI },
                mintAccountInfo:
                  x.f.getState().coinsByMint[e.mint]?.mintAccount?.accountInfo,
                getSolUsdPrice: () => V.getQueryData(Y.Q.SOL_PRICE),
                getTokenUsdPrice: () =>
                  (0, em.f)(e, eP.x.getState().getCoin(e.mint)).tokenUsdPrice,
                rebuild: async () => {
                  try {
                    let e = eN(await ec(X), a, D);
                    return (e && ea.set(e.transaction, performance.now()), e);
                  } catch {
                    return null;
                  }
                },
              });
              ((ep = t.transaction),
                (eL = t.amountBn),
                (eI = t.solAmountBn),
                (eu = ea.get(t.transaction) ?? en));
            } catch (e) {
              if (e instanceof el.l) {
                (ek(), q.markCancelled());
                return;
              }
              throw e;
            }
          let eR = eL.divn(1e6).toNumber();
          q.updateAmounts({ tokenAmount: eR, solAmount: eI.clone() });
          try {
            (0, ev.u_)({
              mint: e.mint,
              tradeDirection: T,
              solAmount: eI.toNumber() / l.LAMPORTS_PER_SOL,
              usdMarketCap: e.usd_market_cap,
              program: (0, ev.LN)(e.program),
              isLivestreamActive: e.is_currently_live,
              absolutePosition: I,
              recommendationId: P,
              recommendationRank: h,
              isPinned:
                u?.recommendationId === void 0 && eV?.mint === e.mint
                  ? (0, e_.f)(eV.impression.sourceElement, eV.impression.rec_id)
                  : void 0,
              positionId: M,
              calloutId: C,
              screen: L,
              sourceElement: k,
            });
          } catch (e) {
            console.error("[Analytics] Failed to track trade initiation:", e);
          }
          let eF = null;
          try {
            eF = await (0, A._)(async () => {
              if (q.isCancelled()) return null;
              q.markSigning();
              let e = eD().id,
                n = await eg({
                  transaction: ep,
                  coSignTransaction: d,
                  onSigningStarted: () => {
                    g = performance.now();
                  },
                  wallet: z,
                  frontRunningProtection: t,
                  batchId: e,
                });
              if (!n) throw Error("Transaction failed to send");
              return n;
            });
          } catch (n) {
            let t = await eJ({
              startedAt: $,
              buildReadyAt: en,
              quoteBuiltAt: eu,
              signStartedAt: g,
              quotedOutput: eB,
              direction: T,
              uiAmount: E,
              inputSide: H,
              inputAtomicAmount: j,
            });
            ((0, ev.Sd)({
              tradeDirection: T,
              mint: e.mint,
              error: n?.message || "Unknown error",
              errorCode: (0, eo.N)(n),
              provider: eO(e),
              slippage: v.toString(),
              blockchainStore: !0,
              screen: L,
              sourceElement: k,
              feeMode: U,
              signals: t,
              rum: {
                error: n,
                operation: "quick-send-transaction",
                context: { program: e.program, ...t },
              },
            }),
              ek(),
              q.markFailed(
                n instanceof eh
                  ? B("web.toasts.quick_trade_launch_failed")
                  : eT({ error: n, t: B }),
              ));
            return;
          }
          if (!eF) {
            (ek(), q.markCancelled());
            return;
          }
          let { signature: ej, confirmTxPromise: ez, signedTimestamp: eG } = eF;
          (q.markSubmitted(ej),
            b?.(),
            e$(e.mint),
            eK(!0),
            a && eW(),
            J && ((0, ee.r)(V, J, e.mint), (0, et.f)(V, J)));
          try {
            (await ez,
              ek(),
              q.markConfirmed(),
              J &&
                (0, eA.K)({
                  mint: _,
                  walletAddress: J,
                  direction: T,
                  signature: ej,
                  ...("sell" === T
                    ? {
                        soldAtomic: eL.toString(),
                        balanceBeforeAtomic: W,
                        tokenDecimals: e.base_decimals ?? void 0,
                      }
                    : eq(e, eL, eI, V.getQueryData(Y.Q.SOL_PRICE))),
                }),
              G({ wallet: z.publicKey, venue: K }),
              (0, ev.V9)({
                tradeDirection: T,
                mint: e.mint,
                solAmount: eI.toNumber() / l.LAMPORTS_PER_SOL,
                tokenAmount: eR,
                signature: ej,
                provider: eO(e),
                isLivestreamActive: e.is_currently_live,
                blockchainStore: !0,
                screen: L,
                sourceElement: k,
                recommendationId: P,
                recommendationRank: h,
                absolutePosition: I,
                feeMode: U,
                signals: {
                  durationMs: (0, eS.v)($),
                  quoteAgeMs: (0, eS.v)(eu),
                  timeToConfirmMs: (0, eS.v)(eG),
                  timeToBuildMs: (0, eS._)($, en),
                  timeToSignMs: (0, eS._)(g, eG),
                },
              }));
          } catch (n) {
            let t = await eJ({
              startedAt: $,
              buildReadyAt: en,
              quoteBuiltAt: eu,
              signStartedAt: g,
              signedAt: eG,
              quotedOutput: eB,
              direction: T,
              uiAmount: E,
              inputSide: H,
              inputAtomicAmount: j,
            });
            ((0, ev.Sd)({
              tradeDirection: T,
              mint: e.mint,
              error: n?.message || "Unknown error",
              errorCode: (0, eo.N)(n),
              signatures: [ej],
              provider: eO(e),
              slippage: v.toString(),
              blockchainStore: !0,
              screen: L,
              sourceElement: k,
              feeMode: U,
              signals: t,
            }),
              ek(),
              q.markFailed(n?.message));
          }
        },
        [
          J,
          es,
          e,
          t,
          eD,
          ec,
          eW,
          e$,
          eV,
          eJ,
          y,
          V,
          eK,
          eQ,
          w,
          eg,
          v,
          f,
          z,
          Q,
          B,
        ],
      ),
      eG = (0, n.useCallback)(
        (t) => {
          let n = R
              ? new o.BN(
                  Math.min(Math.floor(1e9 * (M || 0)), Number.MAX_SAFE_INTEGER),
                )
              : eR(P.toString(), e.base_decimals),
            i =
              "function" == typeof t?.onAmountClamped
                ? t.onAmountClamped
                : void 0;
          return ej(n, _, R, i ? { onAmountClamped: i } : void 0);
        },
        [P, e.base_decimals, ej, _, R, M],
      ),
      eH = (0, n.useMemo)(
        () => K({ isBuySelected: _, nativeSelected: R, solAmount: M }),
        [_, K, R, M],
      ),
      eX = (0, n.useMemo)(() => W({ isBuySelected: _, amount: P }), [P, _, W]);
    return {
      handlePlaceTradeWithInputs: ej,
      enqueueQuickTrade: ez,
      handlePlaceTrade: eG,
      amount: P,
      setAmount: h,
      clearAmountInputAtomic: C,
      solAmount: M,
      setSolAmount: T,
      nativeSelected: R,
      setNativeSelected: E,
      isTradeLoading: L,
      setIsTradeLoading: I,
      inputSolValueArrow: q,
      setInputSolValueArrow: N,
      isQuoting: O,
      quoteError: D,
      priceImpactPercent: U,
      isBuySelected: _,
      setIsBuySelected: k,
      isSolBalanceInsufficient: eH,
      isTokenBalanceInsufficient: eX,
      isNewStore: !0,
    };
  }
  e.s(["j", 0, eR, "W", 0, eF], 151799);
  var eQ = e.i(98830),
    eK = e.i(111740),
    e$ = e.i(268888),
    eW = e.i(97326),
    eV = e.i(918120),
    eJ = e.i(790431),
    ej = e.i(367310),
    ez = e.i(102250),
    eG = e.i(449597);
  e.s(
    [
      "f",
      0,
      function (e, o, r, a) {
        let { frontRunningProtection: s } = (0, eK.f)(),
          { slippage: u } = (0, eW.f)(),
          { tipAmount: l } = (0, eV.f)(),
          { priorityFee: m } = (0, e$.f)(),
          c = a?.tradeSettings,
          d = c?.frontRunningProtection ?? s,
          p = c?.slippage ?? u,
          g = c?.tipAmount ?? l,
          f = c?.priorityFee ?? m,
          b = a?.showOpenCoinToast ?? !1,
          S = eF(
            (0, n.useMemo)(
              () => ({
                coin: e,
                surface: "retail",
                frontRunningProtection: d,
                tipAmount: g,
                priorityFeeAmount: f,
                slippage: p,
                isBuySelected: o,
                setIsBuySelected: r,
                showOpenCoinToast: b,
              }),
              [e, d, g, f, p, o, r, b],
            ),
          ),
          A = (0, ej.k)(),
          y = (0, ez.o)(),
          v = (0, ew.b)(),
          _ = v?.mint === e.mint ? v.impression : void 0,
          k = a?.resolvedQuoteMint ?? e.quote_mint,
          w = (0, eG.Y)(k),
          B = (0, eG.i)(k),
          L = (0, eJ.d)(e),
          I = "pump" === L,
          P = !1 !== e.initialized,
          h = a?.isMigrationTrade ?? !1,
          C = a?.spendInQuoteAsset ?? a?.disablePaymentRouting ?? !1,
          M = (0, eJ.T)(e.mint),
          T = (0, eJ.r)({
            prefersUsdc: A,
            isUsdcQuote: w,
            isPumpVenue: I,
            isEstablished: P,
            isMigration: h,
            paymentRoutingDisabled: C,
            walletFailsSponsoredSigning: y,
            selfAsset: M,
          }),
          R = (0, eJ.b)({
            paymentAsset: T,
            isUsdcQuote: w,
            isExoticQuote: B,
            isPumpVenue: I,
            isEstablished: P,
            isMigration: h,
            surfaceOptedOut: C,
            walletFailsSponsoredSigning: y,
          }),
          { placeSwapBuildTrade: E, enqueueSwapBuildQuickTrade: q } = (0, eQ.f)(
            {
              coin: e,
              paymentAsset: T,
              venueHint: L,
              slippage: p,
              tipAmount: g,
              frontRunningProtection: d,
              showOpenCoinToast: b,
            },
          ),
          N = async (e, t, n, o) => {
            if (S.isTradeLoading) return;
            let r = t && !n ? { tokenAtomic: BigInt(e.toString()) } : void 0,
              a = !1;
            S.setIsTradeLoading(!0);
            try {
              await E({
                amountAtomic: r
                  ? BigInt(0)
                  : t && "sol" !== T
                    ? BigInt(e.divn(1e3).toString())
                    : BigInt(e.toString()),
                isBuy: t,
                tokenInput: r,
                sellBps: o?.sellBps,
                batchSign: o?.batchSign,
                onAmountClamped: o?.onAmountClamped,
                isMigrationTrade: h,
                onTradeSubmitted: () => {
                  ((a = !0), o?.onTradeSubmitted?.());
                },
                sourceElement: o?.sourceElement,
                sourceScreen: o?.sourceScreen,
                absolutePosition: o?.absolutePosition ?? _?.itemPosition,
                recommendationId: o?.recommendationId ?? _?.rec_id,
                recommendationRank: i(
                  o?.recommendationId,
                  o?.recommendationRank,
                  _?.recommendationRank,
                ),
                isPinned:
                  o?.recommendationId === void 0
                    ? (0, e_.f)(_?.sourceElement, _?.rec_id)
                    : void 0,
              });
            } finally {
              S.setIsTradeLoading(!1);
            }
            if (!a) return { refused: "not-sent" };
          };
        return {
          ...S,
          handlePlaceTradeWithInputs: N,
          enqueueQuickTrade: (e, t, n, o) =>
            q(e, t, n, {
              ...o,
              absolutePosition: o?.absolutePosition ?? _?.itemPosition,
              recommendationId: o?.recommendationId ?? _?.rec_id,
              recommendationRank: i(
                o?.recommendationId,
                o?.recommendationRank,
                _?.recommendationRank,
              ),
              calloutId: o?.calloutId ?? _?.calloutId,
              isPinned:
                o?.recommendationId === void 0
                  ? (0, e_.f)(_?.sourceElement, _?.rec_id)
                  : void 0,
            }),
          handlePlaceTrade: (n) => {
            let i = S.nativeSelected
                ? new t.default(
                    Math.min(
                      Math.floor(1e9 * (S.solAmount || 0)),
                      Number.MAX_SAFE_INTEGER,
                    ),
                  )
                : eR(S.amount.toString(), e.base_decimals),
              r = n?.onAmountClamped;
            return N(
              i,
              o,
              S.nativeSelected,
              r ? { onAmountClamped: r } : void 0,
            );
          },
          paymentAsset: T,
          isPaymentRouted: R,
          isUntradeable: B && !R,
          canChoosePaymentAsset: P && !h && !C && !y && null == M,
        };
      },
    ],
    988801,
  );
};
