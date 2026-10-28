// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(292686),
    i = e.i(254667),
    a = e.i(426091),
    s = e.i(574472),
    o = e.i(92245),
    r = e.i(914549),
    l = e.i(971370),
    u = e.i(606933),
    m = e.i(424509);
  e.i(12692);
  var c = e.i(398902),
    d = e.i(974658),
    p = e.i(78009),
    y = e.i(240763),
    g = e.i(609926);
  e.i(70833);
  var b = e.i(66961),
    f = e.i(116458),
    w = e.i(777887),
    _ = e.i(363250),
    k = e.i(674121),
    v = e.i(385916),
    A = e.i(178496),
    h = e.i(257004),
    S = e.i(584229),
    B = e.i(466931),
    T = e.i(191754),
    C = e.i(366125),
    q = e.i(545177),
    D = e.i(252911),
    M = e.i(330665),
    P = e.i(349417),
    x = e.i(992829),
    E = e.i(825015),
    I = e.i(70596),
    U = e.i(480133),
    N = e.i(778396),
    R = e.i(84976),
    O = e.i(427140),
    j = e.i(137123),
    F = e.i(865259),
    L = e.i(946550),
    $ = e.i(163742),
    H = e.i(374240),
    K = e.i(93903),
    Y = e.i(910222),
    J = e.i(595673),
    W = e.i(198825),
    Q = e.i(569526),
    Z = e.i(561667),
    V = e.i(51954),
    X = e.i(653805),
    G = e.i(102250),
    z = e.i(90832),
    ee = e.i(449597);
  let et = (e, t) => ({
      type: t.isBuy ? "buy" : "sell",
      isBuy: t.isBuy,
      mint: e.coin.mint,
      paymentTicker: "usdc" === e.paymentAsset ? "USDC" : "SOL",
      paymentDecimals: "usdc" === e.paymentAsset ? 6 : 9,
      tokenDecimals: e.coin.base_decimals ?? 6,
      tokenSymbol: (e.coin.symbol ?? e.coin.mint).replace(/^\$/, ""),
      screen: t.sourceScreen ?? n.Ae.COIN_DETAILS,
      sourceElement: t.sourceElement,
      sellBps: t.sellBps,
      batchSign: t.batchSign ?? !1,
      isMigrationTrade: t.isMigrationTrade ?? !1,
      isNativeSolConvert: (0, $.m)(e.coin.mint),
    }),
    en = (e) => {
      var t;
      return {
        blockchainStore: !1,
        transactionsViaApiService: !0,
        ...(e && {
          provider:
            "pump_swap" === (t = e.venue)
              ? "pumpswap"
              : "jupiter" === t
                ? "raydium"
                : "bonding_curve",
          route: e.route,
          venue: e.venue,
        }),
      };
    },
    ei = (e, t) => ({
      tipAmountLamports: t ? (t.tip_amount ?? "server") : void 0,
      sellBps: e.sellBps,
      isMigrationTrade: e.isMigrationTrade,
      batchSign: e.batchSign,
      freeCoinCreate: t?.is_free_coin_creation === !0,
    }),
    ea = (e, t) => t && !1 === e.initialized,
    es = (e) => {
      let t = ["name", "symbol", "metadata_uri", "creator"].filter(
        (t) => !e[t],
      );
      return t.length > 0
        ? { kind: "missing", missing: [...t] }
        : {
            kind: "ok",
            fields: {
              name: e.name,
              symbol: e.symbol,
              uri: e.metadata_uri,
              creator: e.creator,
              quote_mint: e.quote_mint ?? ee.X,
              is_mayhem_mode: null != e.mayhem,
              ...("boolean" == typeof e.is_cashback_enabled && {
                is_cashback_enabled: e.is_cashback_enabled,
              }),
              is_free_coin_creation: !0,
            },
          };
    },
    eo = (e, t, n) => {
      let i = (0, E.i)({
        frontRunningProtection: e.frontRunningProtection,
        tipAmount: e.tipAmount,
      });
      return {
        mint: t.mint,
        amount_in: (0, P.d)(n.amountAtomic),
        side: t.type,
        denomination: e.paymentAsset,
        user: n.user,
        slippage_bps: (0, E.q)(e.slippage),
        venue_hint: e.venueHint,
        fetch_user_states: !0,
        client_can_partial_sign: !0,
        client_supports_transactions: !0,
        ...(void 0 !== i && { tip_amount: i }),
        ...(void 0 !== t.sellBps && !t.isBuy && { sell_bps: t.sellBps }),
        ...(t.batchSign && { prefer_lower_tips: !0 }),
        ...(t.isBuy &&
          !n.create &&
          e.calloutUser && { callout_user: e.calloutUser }),
        ...n.create,
      };
    },
    er = (e, t) => async () => {
      try {
        let n = await (0, P.y)({ ...e, client_can_partial_sign: !1 });
        if ("ok" !== n.kind) return null;
        return (t.set(n.data, performance.now()), n.data);
      } catch {
        return null;
      }
    },
    el = async (e, t, n) => {
      let i;
      if (n <= BigInt(0)) return null;
      try {
        i = await V.f
          .getState()
          .getQuote({
            direction: "buy",
            uiAmount: Number(n) / 10 ** t.tokenDecimals,
            inputAtomicAmount: n,
            slippagePercentage: e.slippage,
            mint: t.mint,
            coin: e.coin,
            inputSide: "token",
          });
      } catch {
        i = null;
      }
      if (!i) return null;
      let a = i.quote.maxInputAmount;
      if (((0, ee.Y)(e.coin.quote_mint) ? "usdc" : "sol") === e.paymentAsset)
        return a > BigInt(0) ? a : null;
      if (!(e.solPrice > 0)) return null;
      let s =
        "usdc" === e.paymentAsset
          ? Math.ceil((Number(a) * e.solPrice) / 1e3)
          : Math.ceil((Number(a) / e.solPrice) * 1e3);
      return s > 0 ? BigInt(s) : null;
    },
    eu = (e, t, n) =>
      (0, J.Sd)({
        tradeDirection: t.type,
        mint: t.mint,
        error: "quote_unavailable",
        paymentDenomination: e.paymentAsset,
        slippage: e.slippage.toString(),
        ...en(),
        screen: t.screen,
        sourceElement: t.sourceElement,
        signals: { durationMs: (0, H.v)(n) },
        rum: {
          operation: "swap-build-token-input-quote",
          context: {
            program: e.coin.program,
            denomination: e.paymentAsset,
            walletName: (0, a.Y)(),
            ...ei(t),
          },
        },
      }),
    em = (e, t, n, i) =>
      (0, J.Sd)({
        tradeDirection: t.type,
        mint: t.mint,
        error: "free coin create metadata missing",
        paymentDenomination: e.paymentAsset,
        slippage: e.slippage.toString(),
        ...en(),
        screen: t.screen,
        sourceElement: t.sourceElement,
        signals: { durationMs: (0, H.v)(i) },
        rum: {
          operation: "swap-build-create",
          context: {
            program: e.coin.program,
            denomination: e.paymentAsset,
            missing: n.join(","),
            walletName: (0, a.Y)(),
            ...ei(t),
          },
        },
      }),
    ec = (e, t, n) => {
      let { t: i, coin: s, paymentAsset: o } = e,
        {
          result: r,
          request: l,
          amountAtomic: u,
          tradeStartedAt: m,
          buildReadyAt: c,
        } = n,
        d = {
          tradeDirection: t.type,
          mint: t.mint,
          ...{
            paymentDenomination: e.paymentAsset,
            paymentUsdAmount:
              "usdc" === e.paymentAsset && t.isBuy
                ? Number(u) / 10 ** t.paymentDecimals
                : void 0,
          },
          slippage: e.slippage.toString(),
          ...en(),
          screen: t.screen,
          sourceElement: t.sourceElement,
          signals: { durationMs: (0, H.v)(m), timeToBuildMs: (0, H._)(m, c) },
        },
        p = ei(t, l);
      switch (r.kind) {
        case "insufficient_funds":
          return (
            (0, J.Sd)({ ...d, error: g.R }),
            (0, Y.j)({ t: i, symbol: t.paymentTicker })
          );
        case "unauthenticated":
          return (
            (0, B.l)({
              error: x.E,
              feature: "auth",
              operation: "swap-build-session",
              context: {
                mint: t.mint,
                denomination: o,
                tradeDirection: t.type,
                walletName: (0, a.Y)(),
              },
            }),
            e.revalidateSession(),
            {
              message: i("web.trade.swap_session_expired_title"),
              description: i("web.trade.swap_session_expired_description"),
            }
          );
        case "expected":
          switch (
            ((0, J.Sd)({
              ...d,
              error: x.x[r.reason],
              rum: {
                operation: x.g,
                context: {
                  reason: r.reason,
                  program: s.program,
                  denomination: o,
                  venueHint: e.venueHint,
                  venueMessage: r.message,
                  walletName: (0, a.Y)(),
                  ...p,
                },
              },
            }),
            r.reason)
          ) {
            case "no_route":
            case "venue_rejected":
              return {
                message: i("web.trade.swap_no_route_title"),
                description: i("web.trade.swap_no_route_description"),
              };
            case "no_market":
              return {
                message: i("web.errors.coin_indexing_title"),
                description: i("web.errors.coin_indexing_description"),
              };
            case "insufficient_liquidity":
              return { message: i("web.trade.relay_error_impact_too_high") };
          }
          return;
        case "error":
          return (
            (0, J.Sd)({
              ...d,
              error: r.message,
              rum: {
                operation: "swap-build",
                context: {
                  program: s.program,
                  denomination: o,
                  walletName: (0, a.Y)(),
                  status: r.status,
                  responseBody: r.message,
                  ...p,
                },
              },
            }),
            (0, Y.D)({
              t: i,
              side: t.type,
              symbol: s.symbol ?? s.mint,
              reason: r.message,
            })
          );
      }
    },
    ed = (e, t) =>
      null != e.clampedAmountIn ? BigInt(Math.trunc(e.clampedAmountIn)) : t,
    ep = (e, t) => (e.ui > 0 ? e.ui : e.atomic / 10 ** t),
    ey = (e, t, n, i) => {
      let a = ed(n, i),
        s = ep(n.amountOut, t.isBuy ? t.tokenDecimals : t.paymentDecimals),
        o = Number(a) / 10 ** t.paymentDecimals,
        r = t.isBuy ? s : Number(a) / 10 ** t.tokenDecimals,
        u = t.isBuy ? o : s,
        c = "sol" === e.paymentAsset ? u : e.solPrice > 0 ? u / e.solPrice : 0;
      return {
        effectiveAmountAtomic: a,
        amountOutUi: s,
        tokenAmountHuman: r,
        quoteSideHuman: u,
        paymentLabel: `${(0, z.p)(u)} ${t.paymentTicker}`,
        solEquivalent: c,
        solEquivalentBn: new m.default(Math.floor(c * l.LAMPORTS_PER_SOL)),
      };
    },
    eg = (e) => ({
      tokenUsd: () =>
        (0, O.f)(e.coin, X.x.getState().getCoin(e.coin.mint)).tokenUsdPrice,
      payUsd: () => (0, R.n)(e.paymentAsset, e.solPrice),
    }),
    eb = (e) =>
      (0, F.L)({
        mintBps: (0, I.f)(
          e.mint,
          V.f.getState().coinsByMint[e.mint]?.mintAccount?.accountInfo,
        ),
        coinBps: e.transfer_fee_bps,
      }),
    ef = (e, t, { build: n, amountAtomic: i, rebuild: a, fallbackRate: s }) => {
      let o = eg(e),
        r = t.isBuy ? t.tokenDecimals : t.paymentDecimals;
      return (0, L.s)({
        mint: t.mint,
        tradeDirection: t.type,
        paySymbol: t.isBuy ? t.paymentTicker : t.tokenSymbol,
        receiveSymbol: t.isBuy ? t.tokenSymbol : t.paymentTicker,
        fallbackRate: s,
        getPayUsdPrice: t.isBuy ? o.payUsd : o.tokenUsd,
        getReceiveUsdPrice: t.isBuy ? o.tokenUsd : o.payUsd,
        build: n,
        describe: (e) => ({
          transferFeeBps: e.transferFeeBps,
          receiveIsNet: (0, F.v)(e.venue),
          payUiAmount:
            Number(ed(e, i)) /
            10 ** (t.isBuy ? t.paymentDecimals : t.tokenDecimals),
          receiveUiAmount: ep(e.amountOut, r),
          minReceiveUiAmount: ep(e.minAmountOut, r),
        }),
        rebuild: a,
      });
    },
    ew = async (e, t, n, i) => {
      let s,
        { data: o, marks: r, beforePrompt: l } = i,
        u = o.prepTransaction
          ? [o.prepTransaction, o.transaction]
          : [o.transaction],
        m = u.map(D.U),
        c =
          "function" == typeof t.signAllTransactions
            ? (e) => t.signAllTransactions(e)
            : void 0,
        d = () => {
          r.signStartedAt = performance.now();
        };
      try {
        s = n.batchSign
          ? await (0, w.d)({
              transactions: u,
              walletKey: t.publicKey.toBase58(),
              signAllTransactions: c,
              signTransaction: (e) => t.signTransaction(e),
              onSigningStarted: d,
            })
          : await (0, w._)(async () => {
              if (l && !l()) return null;
              if ((d(), u.length > 1 && c)) return c(u);
              let e = [];
              for (let n of u) e.push(await t.signTransaction(n));
              return e;
            });
      } catch (e) {
        if (o.partialSign && (0, D.f)(e)) throw new D.E(D.m);
        throw e;
      }
      if (null === s) return null;
      r.signedTimestamp = performance.now();
      let p = s.map((e, t) =>
        o.partialSign
          ? ((0, D.a)(m[t], e), { kind: "intact" })
          : (0, D._)(m[t], e),
      );
      o.partialSign && (0, D.D)(s[s.length - 1]);
      let y = p.flatMap((e) =>
        "rebuilt-unsigned" === e.kind ? [e.report] : [],
      );
      return (
        y.length > 0 &&
          (0, B.B)({
            name: "swap-build-message-rebuilt",
            feature: "trade",
            operation: "swap-build-sign",
            context: {
              mint: n.mint,
              tradeDirection: n.type,
              denomination: e.paymentAsset,
              venueHint: e.venueHint,
              customPair: (0, ee.i)(e.coin.quote_mint),
              walletName: (0, a.Y)(),
              legs: p.length,
              rebuiltLegs: y.length,
              messageMutation: [...new Set(y.flatMap((e) => e.kinds))].join(
                ",",
              ),
              messageMutationSummary: y.map((e) => e.summary).join(" | "),
            },
          }),
        { signedTxs: s }
      );
    },
    e_ = (e) => {
      let t = (0, T.e)({
        confirmed: e.confirmed,
        succeeded: e.succeeded,
        error: e.error,
        reason: e.reason,
        reasonDetail: e.reason_detail,
        timeoutMs: 3e4,
      });
      return Object.assign(Error(t.message), { bapiReason: t.bapiReason });
    },
    ek = async (e, t) => {
      if (e.confirmed) {
        if (!e.succeeded) throw e_(e);
        return { err: null };
      }
      if (await (0, q._)(e, t)) return { err: null };
      throw e_(e);
    },
    ev = async (e, t) => {
      let { data: n, signedTxs: i } = t,
        { connection: a } = e,
        s = { route: n.route, options: n.optionsForSend },
        o = i.length - 1;
      if (n.prepTransaction) {
        let e = await (0, q.l)(i, s);
        if ("error" === e.kind) throw Error(e.message);
        let t = e.data.results?.[0] ?? e.data;
        if (!(0, q.M)(t))
          throw t.confirmed
            ? e_(t)
            : Error("setup transaction did not land — please try again");
        return { signature: (0, U.w)(i[o]), settled: ek(e.data, a) };
      }
      return {
        signature: (0, U.w)(i[o]),
        settled: (0, q.s)(i[o], s).then((e) => {
          if ("error" === e.kind) throw Error(e.message);
          return ek(e.data, a);
        }),
      };
    },
    eA = (e) => ({
      durationMs: (0, H.v)(e.tradeStartedAt),
      quoteAgeMs: (0, H.v)(e.quoteBuiltAt),
      timeToBuildMs: (0, H._)(e.tradeStartedAt, e.buildReadyAt),
      timeToSignMs: (0, H._)(e.signStartedAt, e.signedTimestamp),
    }),
    eh = (e, t, n) => {
      try {
        (0, J.u_)({
          mint: t.mint,
          tradeDirection: t.type,
          solAmount: n.solAmount,
          usdMarketCap: e.coin.usd_market_cap,
          program: (0, J.LN)(e.coin.program),
          isLivestreamActive: e.coin.is_currently_live,
          absolutePosition: n.absolutePosition,
          recommendationId: n.recommendationId,
          recommendationRank: n.recommendationRank,
          isPinned: n.isPinned,
          calloutId: n.calloutId,
          screen: t.screen,
          sourceElement: t.sourceElement,
        });
      } catch (e) {
        i.y.error("[Analytics] Failed to track trade initiation", { error: e });
      }
    },
    eS = (e, t) =>
      t.isBuy && e.viewer && !t.isNativeSolConvert
        ? {
            mint: t.mint,
            existingCalloutPromise: (0, f.n)(e.queryClient, e.viewer, t.mint),
            screen: t.screen,
          }
        : void 0,
    eB = (e, t) => {
      (e.recentTrade.handleRecentTrade(t.mint),
        e.recentTrade.setRecentlyTraded(!0),
        t.isBuy && e.recentTrade.handleFirstTrade(),
        e.address &&
          ((0, k.r)(e.queryClient, e.address, t.mint),
          (0, v.f)(e.queryClient, e.address)));
    },
    eT = (e, t, n) => {
      let i,
        {
          data: a,
          amounts: s,
          signature: o,
          marks: r,
          balanceBeforeAtomic: l,
          attribution: u,
        } = n;
      (e.address &&
        (0, K.K)({
          mint: t.mint,
          walletAddress: e.address,
          direction: t.type,
          signature: o,
          ...(t.isBuy
            ? (0, K.Q)({
                boughtAtomic: Number.isFinite(
                  (i =
                    a.amountOut.atomic > 0
                      ? a.amountOut.atomic
                      : s.amountOutUi * 10 ** t.tokenDecimals),
                )
                  ? BigInt(Math.round(i)).toString()
                  : "0",
                quoteSpentAtomic: s.effectiveAmountAtomic.toString(),
                quoteMint: (0, R.F)(e.paymentAsset),
                solUsdPrice: e.solPrice,
                tokenDecimals: e.coin.base_decimals,
              })
            : {
                soldAtomic: s.effectiveAmountAtomic.toString(),
                balanceBeforeAtomic: l,
                tokenDecimals: e.coin.base_decimals ?? void 0,
              }),
        }),
        (0, J.V9)({
          tradeDirection: t.type,
          mint: t.mint,
          solAmount: s.solEquivalent,
          paymentUsdAmount:
            "usdc" === e.paymentAsset ? s.quoteSideHuman : void 0,
          paymentDenomination: e.paymentAsset,
          tokenAmount: s.tokenAmountHuman,
          signature: o,
          ...en(a),
          isLivestreamActive: e.coin.is_currently_live,
          screen: t.screen,
          sourceElement: t.sourceElement,
          recommendationId: u.recommendationId,
          recommendationRank: u.recommendationRank,
          absolutePosition: u.absolutePosition,
          signals: { ...eA(r), timeToConfirmMs: (0, H._)(r.signedTimestamp) },
        }));
    },
    eC = (e, t, n) => {
      let {
          error: i,
          data: s,
          request: o,
          amounts: r,
          marks: l,
          operation: u,
          signature: m,
        } = n,
        c = i instanceof D.e ? i : null;
      return (
        c && (0, G.R)(),
        (0, J.Sd)({
          tradeDirection: t.type,
          mint: t.mint,
          error: (0, S.A)(i) || "Unknown error",
          errorCode: (0, S.N)(i),
          ...(m && { signatures: [m] }),
          ...en(s),
          bapiReason:
            i instanceof Error && "string" == typeof i.bapiReason
              ? i.bapiReason
              : void 0,
          paymentUsdAmount:
            "usdc" === e.paymentAsset ? r.quoteSideHuman : void 0,
          paymentDenomination: e.paymentAsset,
          slippage: e.slippage.toString(),
          screen: t.screen,
          sourceElement: t.sourceElement,
          signals: eA(l),
          rum: {
            error: i,
            operation: u,
            context: {
              program: e.coin.program,
              denomination: e.paymentAsset,
              sponsored: "usdc" === e.paymentAsset,
              partialSign: s.partialSign,
              walletName: (0, a.Y)(),
              messageMutation: c?.kinds.join(","),
              ...ei(t, o),
            },
          },
        }),
        c
      );
    };
  async function eq(e, t) {
    let n,
      { coin: a, wallet: s, t: o, paymentAsset: l } = e,
      u = et(e, {
        isBuy: t.isBuy,
        sourceScreen: t.sourceScreen,
        sourceElement: t.sourceElement,
        sellBps: t.sellBps,
        batchSign: t.batchSign,
        isMigrationTrade: t.isMigrationTrade,
      }),
      { type: m, isBuy: c, mint: p } = u;
    if (!s) {
      ((0, J.Lw)({ source: "tradebox" }), e.setShowWallet(!0));
      return;
    }
    (0, C.f)({
      signerAddress: s.publicKey.toBase58(),
      sessionAddress: e.decodedJwt?.address,
      operation: m,
      mint: p,
    });
    let g = performance.now(),
      b = t.amountAtomic;
    if (c && t.tokenInput) {
      let n = await el(e, u, t.tokenInput.tokenAtomic);
      if (null === n) {
        (eu(e, u, g), (0, y.J)((0, Y.y)({ t: o })));
        return;
      }
      b = n;
    }
    if (b <= BigInt(0)) return void (0, y.J)((0, Y.y)({ t: o }));
    if ((0, r.y)({ isPrivyWallet: e.shouldUsePrivy })) {
      let e = await (0, A.M)({ tradeType: m, coinSymbol: a.symbol ?? a.mint });
      if ("cancel" === e) return;
      ("enable" === e && (0, r.C)(!0), (0, r.O)(!0));
    }
    let f = performance.now(),
      w = ea(a, c) ? es(a) : void 0;
    if (w?.kind === "missing") {
      (em(e, u, w.missing, f),
        (0, y.J)(
          (0, Y.D)({
            t: o,
            side: m,
            symbol: a.symbol ?? a.mint,
            reason: o("web.toasts.quick_trade_launch_failed"),
          }),
        ));
      return;
    }
    let _ = eo(e, u, {
        user: s.publicKey.toBase58(),
        amountAtomic: b,
        create: w?.fields,
      }),
      k = await (0, P.y)(_),
      v = performance.now();
    if ("ok" !== k.kind)
      return void (0, y.J)(
        ec(e, u, {
          result: k,
          request: _,
          amountAtomic: b,
          tradeStartedAt: f,
          buildReadyAt: v,
        }),
      );
    let h = new WeakMap(),
      B = { amountAtomic: b, rebuild: er(_, h), fallbackRate: eb(a) };
    try {
      ((n = await ef(e, u, { ...B, build: k.data })),
        (n =
          c && !u.isNativeSolConvert
            ? await ((
                e,
                t,
                { build: n, amountAtomic: a, rebuild: s, fallbackRate: o },
              ) => {
                let r = eg(e);
                return (0, j.d)({
                  mint: t.mint,
                  tokenSymbol: t.tokenSymbol,
                  payDenomination: e.paymentAsset,
                  getTokenUsdPrice: r.tokenUsd,
                  getPayUsdPrice: r.payUsd,
                  build: n,
                  describe: (n) => {
                    let s;
                    return (s = n.networkFee?.denomination) &&
                      s !== e.paymentAsset
                      ? (i.y.warn(
                          "[solanaPoolFeeGate] pool_fee_valuation_skipped",
                          {
                            mint: t.mint,
                            reason: "denomination_mismatch",
                            requested_denomination: e.paymentAsset,
                            built_denomination: s,
                            venue: n.venue,
                          },
                        ),
                        null)
                      : (n.amountOut.ui <= 0 || n.minAmountOut.ui <= 0) &&
                          null == e.coin.base_decimals
                        ? (i.y.warn(
                            "[solanaPoolFeeGate] pool_fee_valuation_skipped",
                            {
                              mint: t.mint,
                              reason: "unknown_token_decimals",
                              venue: n.venue,
                            },
                          ),
                          null)
                        : {
                            venue: n.venue,
                            priceImpact: n.priceImpact,
                            transferFeeBps:
                              ((0, F.L)({ quoteBps: n.transferFeeBps }) ?? o)
                                ?.bps ?? null,
                            payUiAmount:
                              Number(ed(n, a)) / 10 ** t.paymentDecimals,
                            receiveUiAmount: ep(n.amountOut, t.tokenDecimals),
                            minReceiveUiAmount: ep(
                              n.minAmountOut,
                              t.tokenDecimals,
                            ),
                          };
                  },
                  rebuild: s,
                });
              })(e, u, { ...B, build: n })
            : n));
    } catch (e) {
      if (e instanceof N.l) return;
      throw e;
    }
    null != n.clampedAmountIn &&
      t.onAmountClamped?.(n.clampedAmountIn / 10 ** u.paymentDecimals);
    let T = { tradeStartedAt: f, buildReadyAt: v, quoteBuiltAt: h.get(n) ?? v },
      q = ey(e, u, n, b),
      D = V.f.getState().getTokenBalance(p)?.balanceRaw.toString(),
      x = {
        absolutePosition: t.absolutePosition,
        recommendationId: t.recommendationId,
        recommendationRank: t.recommendationRank,
        isPinned: t.isPinned,
      };
    eh(e, u, { solAmount: q.solEquivalent, ...x });
    let E = "usdc" === l ? q.paymentLabel : void 0,
      I = u.isNativeSolConvert
        ? c
          ? { fromSymbol: u.paymentTicker, toSymbol: u.tokenSymbol }
          : { fromSymbol: u.tokenSymbol, toSymbol: u.paymentTicker }
        : void 0,
      U = c ? d.b : d.D,
      { toastId: R, interval: O } = I
        ? U(q.tokenAmountHuman, a.symbol ?? a.mint, q.solEquivalentBn, E, a, I)
        : U(q.tokenAmountHuman, a.symbol ?? a.mint, q.solEquivalentBn, E, a);
    try {
      let i = await ew(e, s, u, { data: n, marks: T });
      if (!i) return;
      let o = await ev(e, { data: n, signedTxs: i.signedTxs });
      (t.onTradeSubmitted?.(),
        (0, y.Q)({
          type: m,
          mint: p,
          coin: a,
          amount: q.tokenAmountHuman,
          symbol: a.symbol ?? a.mint,
          solAmount: q.solEquivalentBn,
          signature: o.signature,
          interval: O,
          toastId: R,
          confirmTxPromise: o.settled,
          signedTimestamp: T.signedTimestamp ?? performance.now(),
          showOpenCoin: e.showOpenCoinToast,
          buyCalloutCta: eS(e, u),
          shareCta:
            e.address && !u.isNativeSolConvert
              ? { coin: a, holderAddress: e.address }
              : void 0,
          paymentLabel: E,
          convert: I,
          onShowToastSuccess: () =>
            eT(e, u, {
              data: n,
              amounts: q,
              signature: o.signature,
              marks: T,
              balanceBeforeAtomic: D,
              attribution: x,
            }),
          onShowToastError: (t) => {
            eC(e, u, {
              error: t,
              data: n,
              request: _,
              amounts: q,
              marks: T,
              signature: o.signature,
              operation: "swap-build-confirm",
            });
          },
        }),
        eB(e, u));
    } catch (i) {
      clearInterval(O);
      let t = eC(e, u, {
        error: i,
        data: n,
        request: _,
        amounts: q,
        marks: T,
        operation: "swap-build-send",
      });
      (0, y.J)({
        ...(0, Y.D)({
          t: o,
          side: m,
          symbol: a.symbol ?? a.mint,
          reason: t
            ? (0, Y.X)({ t: o })
            : i instanceof M.Z
              ? (0, Y.O)({ t: o })
              : (0, S.A)(i) || void 0,
        }),
        id: R,
      });
    }
  }
  async function eD(e, t, i, a, s) {
    let o,
      r,
      l,
      { coin: u, wallet: c, t: d, paymentAsset: y, solPrice: g } = e,
      b = et(e, {
        isBuy: i,
        sourceScreen: s?.sourceScreen,
        sourceElement: s?.sourceElement ?? n.k9.QUICK_TRADE,
      }),
      { type: f, isBuy: w, mint: _ } = b;
    if (!c) {
      ((0, J.Lw)({ source: "tradebox" }), e.setShowWallet(!0));
      return;
    }
    if (t.lten(0)) return;
    (0, C.f)({
      signerAddress: c.publicKey.toBase58(),
      sessionAddress: e.decodedJwt?.address,
      operation: f,
      mint: _,
    });
    let k = w && a,
      v = (0, p.f)({
        type: f,
        symbol: u.symbol ?? u.mint,
        tokenAmount: k ? 0 : Number(t.toString()) / 10 ** b.tokenDecimals,
        solAmount: k
          ? "sol" === y
            ? t.clone()
            : new m.default(g > 0 ? Math.floor(Number(t.toString()) / g) : 0)
          : new m.default(0),
        mint: _,
        showOpenCoin: e.showOpenCoinToast,
        buyCalloutCta: eS(e, b),
      }),
      A = performance.now();
    if (w && !a) {
      let n = await el(e, b, BigInt(t.toString()));
      if (null === n) {
        (eu(e, b, A), v.markFailed(d("web.toasts.quick_trade_build_failed")));
        return;
      }
      o = n;
    } else
      o =
        w && "sol" !== y
          ? BigInt(t.divn(1e3).toString())
          : BigInt(t.toString());
    let h = ea(u, w) ? es(u) : void 0;
    if (h?.kind === "missing") {
      (em(e, b, h.missing, A),
        v.markFailed(d("web.toasts.quick_trade_launch_failed")));
      return;
    }
    let B = eo(e, b, {
        user: c.publicKey.toBase58(),
        amountAtomic: o,
        create: h?.fields,
      }),
      T = await (0, P.y)(B),
      q = performance.now();
    if ("ok" !== T.kind) {
      let t = ec(e, b, {
        result: T,
        request: B,
        amountAtomic: o,
        tradeStartedAt: A,
        buildReadyAt: q,
      });
      v.markFailed(t.description ?? t.message);
      return;
    }
    let D = new WeakMap();
    try {
      r = await ef(e, b, {
        build: T.data,
        amountAtomic: o,
        rebuild: er(B, D),
        fallbackRate: eb(u),
      });
    } catch (e) {
      if (e instanceof N.l) return void v.markCancelled();
      throw e;
    }
    let x = { tradeStartedAt: A, buildReadyAt: q, quoteBuiltAt: D.get(r) ?? q },
      E = ey(e, b, r, o);
    v.updateAmounts({
      tokenAmount: E.tokenAmountHuman,
      solAmount: E.solEquivalentBn,
    });
    let I = V.f.getState().getTokenBalance(_)?.balanceRaw.toString(),
      U = {
        absolutePosition: s?.absolutePosition,
        recommendationId: s?.recommendationId,
        recommendationRank: s?.recommendationRank,
        isPinned: s?.isPinned,
      };
    eh(e, b, { solAmount: E.solEquivalent, ...U, calloutId: s?.calloutId });
    try {
      let t = await ew(e, c, b, {
        data: r,
        marks: x,
        beforePrompt: () => !v.isCancelled() && (v.markSigning(), !0),
      });
      if (!t) return void v.markCancelled();
      l = await ev(e, { data: r, signedTxs: t.signedTxs });
    } catch (n) {
      let t = eC(e, b, {
        error: n,
        data: r,
        request: B,
        amounts: E,
        marks: x,
        operation: "quick-swap-build-send",
      });
      v.markFailed(
        t
          ? (0, Y.X)({ t: d })
          : n instanceof M.Z
            ? (0, Y.O)({ t: d })
            : (0, S.A)(n) || void 0,
      );
      return;
    }
    (v.markSubmitted(l.signature), s?.onTradeSubmitted?.(), eB(e, b));
    try {
      (await l.settled,
        v.markConfirmed(),
        eT(e, b, {
          data: r,
          amounts: E,
          signature: l.signature,
          marks: x,
          balanceBeforeAtomic: I,
          attribution: U,
        }));
    } catch (t) {
      (eC(e, b, {
        error: t,
        data: r,
        request: B,
        amounts: E,
        marks: x,
        signature: l.signature,
        operation: "quick-swap-build-confirm",
      }),
        v.markFailed((0, S.A)(t) || void 0));
    }
  }
  e.s([
    "f",
    0,
    function (e) {
      let n,
        i,
        a,
        r,
        l,
        m,
        d,
        p,
        y = (0, t.c)(41),
        {
          coin: g,
          paymentAsset: f,
          venueHint: w,
          slippage: k,
          tipAmount: v,
          frontRunningProtection: A,
          showOpenCoinToast: S,
        } = e,
        B = void 0 !== S && S,
        {
          address: T,
          userId: C,
          wallet: q,
          shouldUsePrivy: D,
          isPrivyEmbeddedSigner: M,
          decodedJwt: P,
          revalidateSession: x,
        } = (0, s.F)(),
        { t: E } = (0, c.f)();
      y[0] !== T || y[1] !== C
        ? ((n = (0, o.$)({ userId: C, address: T })),
          (y[0] = T),
          (y[1] = C),
          (y[2] = n))
        : (n = y[2]);
      let I = n,
        U = (0, Q.b)(),
        N = "usdc" === f;
      y[3] !== g.mint || y[4] !== M || y[5] !== U || y[6] !== N
        ? ((i = (0, h.$)({
            lastClickImpression: U,
            mint: g.mint,
            sponsored: N,
            isPrivyEmbeddedSigner: M,
          })),
          (y[3] = g.mint),
          (y[4] = M),
          (y[5] = U),
          (y[6] = N),
          (y[7] = i))
        : (i = y[7]);
      let R = i,
        { connection: O } = (0, b.f)(),
        { setShowWallet: j } = (0, W.useConnectWallet)(),
        {
          setRecentlyTraded: F,
          handleRecentTrade: L,
          handleFirstTrade: $,
        } = (0, Z.L)(),
        H = (0, u.useQueryClient)();
      y[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = {}), (y[8] = a))
        : (a = y[8]);
      let { data: K } = (0, _.f)(a),
        Y = void 0 === K ? 0 : K;
      (y[9] !== $ || y[10] !== L || y[11] !== F
        ? ((r = {
            setRecentlyTraded: F,
            handleRecentTrade: L,
            handleFirstTrade: $,
          }),
          (y[9] = $),
          (y[10] = L),
          (y[11] = F),
          (y[12] = r))
        : (r = y[12]),
        y[13] !== T ||
        y[14] !== R ||
        y[15] !== g ||
        y[16] !== O ||
        y[17] !== P ||
        y[18] !== A ||
        y[19] !== f ||
        y[20] !== H ||
        y[21] !== x ||
        y[22] !== j ||
        y[23] !== D ||
        y[24] !== B ||
        y[25] !== k ||
        y[26] !== Y ||
        y[27] !== E ||
        y[28] !== r ||
        y[29] !== v ||
        y[30] !== w ||
        y[31] !== I ||
        y[32] !== q
          ? ((l = {
              coin: g,
              paymentAsset: f,
              venueHint: w,
              slippage: k,
              tipAmount: v,
              frontRunningProtection: A,
              showOpenCoinToast: B,
              wallet: q,
              address: T,
              decodedJwt: P,
              viewer: I,
              shouldUsePrivy: D,
              revalidateSession: x,
              t: E,
              connection: O,
              setShowWallet: j,
              recentTrade: r,
              queryClient: H,
              solPrice: Y,
              calloutUser: R,
            }),
            (y[13] = T),
            (y[14] = R),
            (y[15] = g),
            (y[16] = O),
            (y[17] = P),
            (y[18] = A),
            (y[19] = f),
            (y[20] = H),
            (y[21] = x),
            (y[22] = j),
            (y[23] = D),
            (y[24] = B),
            (y[25] = k),
            (y[26] = Y),
            (y[27] = E),
            (y[28] = r),
            (y[29] = v),
            (y[30] = w),
            (y[31] = I),
            (y[32] = q),
            (y[33] = l))
          : (l = y[33]));
      let J = l;
      y[34] !== J
        ? ((m = (e) => eq(J, e)), (y[34] = J), (y[35] = m))
        : (m = y[35]);
      let V = m;
      y[36] !== J
        ? ((d = (e, t, n, i) => eD(J, e, t, n, i)), (y[36] = J), (y[37] = d))
        : (d = y[37]);
      let X = d;
      return (
        y[38] !== X || y[39] !== V
          ? ((p = { placeSwapBuildTrade: V, enqueueSwapBuildQuickTrade: X }),
            (y[38] = X),
            (y[39] = V),
            (y[40] = p))
          : (p = y[40]),
        p
      );
    },
  ]);
};
