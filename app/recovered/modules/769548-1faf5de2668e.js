// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242);
  e.i(12692);
  var r = e.i(398902),
    n = e.i(790431),
    u = e.i(162918),
    l = e.i(254667),
    i = e.i(352386),
    s = e.i(526080),
    o = e.i(151799),
    a = e.i(50133),
    c = e.i(356283),
    m = e.i(865259),
    f = e.i(96362);
  let d = { bonding_curve: "curve", pump_swap: "pumpswap", jupiter: "jupiter" };
  function p(e) {
    return null != e && Number.isFinite(e) ? -Math.abs(e) : null;
  }
  e.s(
    [
      "f",
      0,
      function (e, b) {
        let v,
          _,
          S = (0, t.c)(40);
        S[0] !== b
          ? ((v = void 0 === b ? {} : b), (S[0] = b), (S[1] = v))
          : (v = S[1]);
        let k = v,
          { t: g } = (0, r.f)(),
          y = (function (e, r) {
            var u;
            let b,
              v,
              _,
              S,
              k,
              g,
              y,
              E,
              B,
              R,
              A,
              I,
              P,
              h,
              C,
              M,
              F,
              w = (0, t.c)(122),
              { pausePreview: U } = void 0 === r ? {} : r,
              {
                side: T,
                tokenAmount: q,
                solAmount: N,
                solUsdPrice: x,
                slippage: Q,
                tipAmount: O,
                priorityFee: L,
                frontRunningProtection: $,
                coin: D,
                isUsdcQuote: K,
                isUsdcPayment: j,
                paymentAsset: G,
                paymentTicker: H,
                isPaymentRouted: X,
                isExoticQuote: W,
              } = e,
              Z = e.mintTransferFeeBps ?? null,
              z = D.transfer_fee_bps ?? null,
              J = (0, n.d)(D),
              V = (0, n.e)({
                isPaymentRouted: X,
                venueHint: J,
                isExoticQuote: W,
                isUsdcPayment: j,
                isUsdcQuote: K,
              }),
              Y = "buy" === T,
              ee = D.base_decimals ?? 6,
              et = Y
                ? ((u = j ? 6 : 9),
                  !Number.isFinite(N) || N <= 0
                    ? BigInt(0)
                    : BigInt(
                        Math.min(
                          Math.floor(N * 10 ** u),
                          Number.MAX_SAFE_INTEGER,
                        ),
                      ))
                : BigInt((0, o.j)(q.toString(), ee).toString()),
              er = j ? 6 : 9,
              en = (0, f.f)({
                mint: D.mint,
                amountAtomic: et,
                isBuy: Y,
                paymentAsset: G,
                outputDecimals: Y ? ee : er,
                slippage: Q,
                venueHint: J,
                enabled: V,
                paused: void 0 !== U && U,
              }),
              eu = en.outputUi,
              el = en.minOutputUi,
              ei = en.venue,
              es = en.priceImpact,
              eo = en.transferFeeBps,
              ea = en.isFetching,
              ec = en.isError,
              em = en.errorKind,
              ef = en.isSettled,
              ed = en.dataUpdatedAt,
              ep = e.isQuoting ?? !1,
              eb = e.quoteError ?? null,
              ev = e.priceImpactPercent ?? null,
              e_ = (function ({ serverVenue: e, isServerQuoted: t, coin: r }) {
                return e
                  ? d[e]
                  : t
                    ? "swap-build"
                    : r.raydium_pool && !r.pump_swap_pool
                      ? "raydium"
                      : r.pump_swap_pool ||
                          "pump_amm" === r.program ||
                          r.complete
                        ? "pumpswap"
                        : null == r.program || "pump" === r.program
                          ? "curve"
                          : null;
              })({ serverVenue: ei, isServerQuoted: V, coin: D }),
              eS = en.referralFeeKind,
              ek =
                null !== en.pricedInputAtomic
                  ? en.pricedInputAtomic / 10 ** er
                  : N,
              eg = null === en.builtDenomination || en.builtDenomination === G,
              ey = (0, a.f)(D),
              eE = ey.tokenUsdPrice,
              eB = ey.source,
              eR = ey.observedAtMs,
              eA = null != D.base_decimals;
            w[0] !== D
              ? ((b = (0, s.u)(D) ? (0, s.B)(D) : 0), (w[0] = D), (w[1] = b))
              : (b = w[1]);
            let eI = b,
              eP = "buy" === T,
              eh = eP ? q : N,
              eC = eu ?? eh;
            if (
              w[2] !== D.symbol ||
              w[3] !== z ||
              w[4] !== $ ||
              w[5] !== eA ||
              w[6] !== eP ||
              w[7] !== eg ||
              w[8] !== j ||
              w[9] !== Z ||
              w[10] !== H ||
              w[11] !== ek ||
              w[12] !== L ||
              w[13] !== eC ||
              w[14] !== el ||
              w[15] !== eu ||
              w[16] !== es ||
              w[17] !== eo ||
              w[18] !== ei ||
              w[19] !== T ||
              w[20] !== Q ||
              w[21] !== N ||
              w[22] !== x ||
              w[23] !== eE ||
              w[24] !== O
            ) {
              let e,
                t = null != eu && (0, m.v)(ei);
              ((R = (0, m.U)({
                rate: (0, m.L)({ quoteBps: eo, mintBps: Z, coinBps: z }),
                quotedReceive: eC,
                quoteIsNet: t,
              })),
                (g = R?.netReceive ?? eC),
                w[34] !== D.symbol || w[35] !== eP || w[36] !== H
                  ? ((e = eP ? (D.symbol ?? "token").replace(/^\$/, "") : H),
                    (w[34] = D.symbol),
                    (w[35] = eP),
                    (w[36] = H),
                    (w[37] = e))
                  : (e = w[37]),
                (y = e));
              let r = el ?? eC * (1 - Q / 100);
              ((_ =
                R && !t
                  ? (0, m.q)({
                      grossReceive: r,
                      transferFeeBps: R.transferFeeBps,
                    })
                  : r),
                (S = 5e-6 + L + ($ ? O : 0)),
                (k = x > 0 ? S * x : 0),
                (v = j ? N : x > 0 ? N * x : 0));
              let n = j ? ek : x > 0 ? ek * x : 0,
                u = {
                  payUsd: eg ? n : null,
                  receiveUsdAtSpot:
                    eP && null != eu && eE > 0 && eA ? eu * eE : null,
                  routerImpactPercent: es,
                  transferFeeBps: R?.transferFeeBps ?? eo,
                };
              ((E = (0, c.R)({ venue: ei, tradeDirection: T, ...u })),
                (B = eP && "jupiter" === ei ? (0, c.u)(u) : null),
                (w[2] = D.symbol),
                (w[3] = z),
                (w[4] = $),
                (w[5] = eA),
                (w[6] = eP),
                (w[7] = eg),
                (w[8] = j),
                (w[9] = Z),
                (w[10] = H),
                (w[11] = ek),
                (w[12] = L),
                (w[13] = eC),
                (w[14] = el),
                (w[15] = eu),
                (w[16] = es),
                (w[17] = eo),
                (w[18] = ei),
                (w[19] = T),
                (w[20] = Q),
                (w[21] = N),
                (w[22] = x),
                (w[23] = eE),
                (w[24] = O),
                (w[25] = v),
                (w[26] = _),
                (w[27] = S),
                (w[28] = k),
                (w[29] = g),
                (w[30] = y),
                (w[31] = E),
                (w[32] = B),
                (w[33] = R));
            } else
              ((v = w[25]),
                (_ = w[26]),
                (S = w[27]),
                (k = w[28]),
                (g = w[29]),
                (y = w[30]),
                (E = w[31]),
                (B = w[32]),
                (R = w[33]));
            let eM = B,
              eF =
                (0, n.c)({
                  isPaymentRouted: X,
                  isUsdcPayment: j,
                  isUsdcQuote: K,
                }) && null == eu,
              ew = null != eu ? p(es) : eF || eh <= 0 ? null : p(ev),
              eU = eP ? g : q,
              eT = eI > 0 && eU > 0 ? (eU / eI) * 100 : null;
            w[38] !== eA ||
            w[39] !== eP ||
            w[40] !== j ||
            w[41] !== g ||
            w[42] !== eu ||
            w[43] !== x ||
            w[44] !== eE
              ? ((A =
                  g <= 0
                    ? null
                    : eP
                      ? (null == eu || eA) && eE > 0
                        ? g * eE
                        : null
                      : j
                        ? g
                        : x > 0
                          ? g * x
                          : null),
                (w[38] = eA),
                (w[39] = eP),
                (w[40] = j),
                (w[41] = g),
                (w[42] = eu),
                (w[43] = x),
                (w[44] = eE),
                (w[45] = A))
              : (A = w[45]);
            let eq = A,
              eN = ec || null !== eb,
              ex = ec
                ? "insufficient_funds" === em
                  ? "insufficient_funds"
                  : "swap_build_preview_failed"
                : null !== eb
                  ? "client_quote_failed"
                  : null,
              eQ = null != eu,
              eO = ea || ep,
              eL = !V || ef,
              e$ = null != eu ? ed : 0;
            w[46] !== ex ||
            w[47] !== v ||
            w[48] !== eN ||
            w[49] !== _ ||
            w[50] !== S ||
            w[51] !== k ||
            w[52] !== g ||
            w[53] !== y ||
            w[54] !== eq ||
            w[55] !== E ||
            w[56] !== ew ||
            w[57] !== eS ||
            w[58] !== N ||
            w[59] !== eT ||
            w[60] !== eQ ||
            w[61] !== eO ||
            w[62] !== eL ||
            w[63] !== e$ ||
            w[64] !== q ||
            w[65] !== R ||
            w[66] !== eM ||
            w[67] !== e_
              ? ((I = {
                  inputUsd: v,
                  outputAmount: g,
                  outputSymbol: y,
                  isServerPriced: eQ,
                  minOutputAmount: _,
                  solSide: N,
                  tokenSide: q,
                  networkCostSol: S,
                  networkCostUsd: k,
                  poolFeeEstimate: E,
                  valuedAtSpot: eM,
                  transferTax: R,
                  priceImpactPercent: ew,
                  supplySharePercent: eT,
                  outputUsd: eq,
                  isFetching: eO,
                  isError: eN,
                  errorReason: ex,
                  isInputSettled: eL,
                  quotedAt: e$,
                  venue: e_,
                  referralFeeKind: eS,
                }),
                (w[46] = ex),
                (w[47] = v),
                (w[48] = eN),
                (w[49] = _),
                (w[50] = S),
                (w[51] = k),
                (w[52] = g),
                (w[53] = y),
                (w[54] = eq),
                (w[55] = E),
                (w[56] = ew),
                (w[57] = eS),
                (w[58] = N),
                (w[59] = eT),
                (w[60] = eQ),
                (w[61] = eO),
                (w[62] = eL),
                (w[63] = e$),
                (w[64] = q),
                (w[65] = R),
                (w[66] = eM),
                (w[67] = e_),
                (w[68] = I))
              : (I = w[68]);
            let eD = I,
              { valuedAtSpot: eK, poolFeeEstimate: ej, transferTax: eG } = eD,
              eH = (0, i.useRef)(null),
              eX = en.builtDenomination;
            (w[69] !== eX ||
            w[70] !== D.mint ||
            w[71] !== eg ||
            w[72] !== G ||
            w[73] !== ei
              ? ((P = () => {
                  if (eg) return;
                  let e = `${D.mint}|${G}|${eX}`;
                  eH.current !== e &&
                    ((eH.current = e),
                    l.y.warn("[solanaPoolFee] pool_fee_valuation_skipped", {
                      mint: D.mint,
                      reason: "denomination_mismatch",
                      requested_denomination: G,
                      built_denomination: eX,
                      venue: ei,
                    }));
                }),
                (h = [eX, D.mint, eg, G, ei]),
                (w[69] = eX),
                (w[70] = D.mint),
                (w[71] = eg),
                (w[72] = G),
                (w[73] = ei),
                (w[74] = P),
                (w[75] = h))
              : ((P = w[74]), (h = w[75])),
              (0, i.useEffect)(P, h),
              w[76] !== eA ||
              w[77] !== G ||
              w[78] !== ej ||
              w[79] !== ei ||
              w[80] !== eB ||
              w[81] !== eK
                ? ((C = eK
                    ? [
                        ei,
                        G,
                        eB,
                        eA,
                        Math.round(eK.valueLostPercent),
                        Math.round(eK.poolFeePercent),
                        null !== ej,
                      ].join("|")
                    : null),
                  (w[76] = eA),
                  (w[77] = G),
                  (w[78] = ej),
                  (w[79] = ei),
                  (w[80] = eB),
                  (w[81] = eK),
                  (w[82] = C))
                : (C = w[82]));
            let eW = C,
              eZ = (0, i.useRef)(null);
            return (
              w[83] !== D.base_decimals ||
              w[84] !== D.mint ||
              w[85] !== j ||
              w[86] !== G ||
              w[87] !== ej ||
              w[88] !== ek ||
              w[89] !== eu ||
              w[90] !== es ||
              w[91] !== eo ||
              w[92] !== ei ||
              w[93] !== N ||
              w[94] !== x ||
              w[95] !== eR ||
              w[96] !== eB ||
              w[97] !== eE ||
              w[98] !== eG?.source ||
              w[99] !== eG?.transferFeeBps ||
              w[100] !== eW ||
              w[101] !== eK
                ? ((M = () => {
                    if (null === eW || !eK || eZ.current === eW) return;
                    eZ.current = eW;
                    let e = ej ? "warn" : "debug";
                    l.y[e]("[solanaPoolFee] valued_at_spot", {
                      mint: D.mint,
                      venue: ei,
                      pay_denomination: G,
                      pay_ui_amount: ek,
                      typed_pay_ui_amount: N,
                      pay_usd_price: j ? 1 : x,
                      pay_usd: eK.payUsd,
                      receive_ui_amount: eu,
                      token_decimals: D.base_decimals ?? null,
                      token_usd_price: eE,
                      spot_source: eB,
                      spot_observed_at_ms: eR,
                      spot_receive_usd: eK.receiveUsdAtSpot,
                      price_impact_percent: es,
                      transfer_fee_bps: eG?.transferFeeBps ?? eo,
                      transfer_fee_source: eG?.source ?? null,
                      value_lost_percent: eK.valueLostPercent,
                      pool_fee_percent: eK.poolFeePercent,
                      notice_shown: null !== ej,
                    });
                  }),
                  (w[83] = D.base_decimals),
                  (w[84] = D.mint),
                  (w[85] = j),
                  (w[86] = G),
                  (w[87] = ej),
                  (w[88] = ek),
                  (w[89] = eu),
                  (w[90] = es),
                  (w[91] = eo),
                  (w[92] = ei),
                  (w[93] = N),
                  (w[94] = x),
                  (w[95] = eR),
                  (w[96] = eB),
                  (w[97] = eE),
                  (w[98] = eG?.source),
                  (w[99] = eG?.transferFeeBps),
                  (w[100] = eW),
                  (w[101] = eK),
                  (w[102] = M))
                : (M = w[102]),
              w[103] !== D.base_decimals ||
              w[104] !== D.mint ||
              w[105] !== j ||
              w[106] !== G ||
              w[107] !== ej ||
              w[108] !== ek ||
              w[109] !== eu ||
              w[110] !== es ||
              w[111] !== eo ||
              w[112] !== ei ||
              w[113] !== N ||
              w[114] !== x ||
              w[115] !== eR ||
              w[116] !== eB ||
              w[117] !== eE ||
              w[118] !== eG ||
              w[119] !== eW ||
              w[120] !== eK
                ? ((F = [
                    D.base_decimals,
                    D.mint,
                    j,
                    G,
                    ej,
                    ek,
                    eu,
                    es,
                    eo,
                    ei,
                    N,
                    x,
                    eR,
                    eB,
                    eE,
                    eG,
                    eW,
                    eK,
                  ]),
                  (w[103] = D.base_decimals),
                  (w[104] = D.mint),
                  (w[105] = j),
                  (w[106] = G),
                  (w[107] = ej),
                  (w[108] = ek),
                  (w[109] = eu),
                  (w[110] = es),
                  (w[111] = eo),
                  (w[112] = ei),
                  (w[113] = N),
                  (w[114] = x),
                  (w[115] = eR),
                  (w[116] = eB),
                  (w[117] = eE),
                  (w[118] = eG),
                  (w[119] = eW),
                  (w[120] = eK),
                  (w[121] = F))
                : (F = w[121]),
              (0, i.useEffect)(M, F),
              eD
            );
          })(e, k),
          {
            side: E,
            slippage: B,
            frontRunningProtection: R,
            coin: A,
            isUsdcQuote: I,
            isPaymentRouted: P,
            isSellOverCurveLiquidity: h,
          } = e,
          C = e.isUsdcPayment ?? I,
          M = A.base_decimals ?? 6;
        e: {
          let e, t, r, l;
          if (h) {
            let e;
            (S[2] !== y.isInputSettled
              ? ((e = { ...u.R, isInputSettled: y.isInputSettled }),
                (S[2] = y.isInputSettled),
                (S[3] = e))
              : (e = S[3]),
              (_ = e));
            break e;
          }
          S[4] !== P || S[5] !== C || S[6] !== I || S[7] !== y.isServerPriced
            ? ((e =
                (0, n.c)({
                  isPaymentRouted: P,
                  isUsdcPayment: C,
                  isUsdcQuote: I,
                }) && !y.isServerPriced),
              (S[4] = P),
              (S[5] = C),
              (S[6] = I),
              (S[7] = y.isServerPriced),
              (S[8] = e))
            : (e = S[8]);
          let i = e,
            s = y.outputAmount > 0 && !i,
            o = "buy" === E ? M : C ? 6 : 9;
          S[9] !== R ||
          S[10] !== s ||
          S[11] !== o ||
          S[12] !== y.inputUsd ||
          S[13] !== y.minOutputAmount ||
          S[14] !== y.networkCostSol ||
          S[15] !== y.networkCostUsd ||
          S[16] !== y.outputAmount ||
          S[17] !== y.outputSymbol ||
          S[18] !== y.outputUsd ||
          S[19] !== y.poolFeeEstimate ||
          S[20] !== y.priceImpactPercent ||
          S[21] !== y.referralFeeKind ||
          S[22] !== y.supplySharePercent ||
          S[23] !== y.transferTax ||
          S[24] !== y.venue ||
          S[25] !== B
            ? ((t = s
                ? {
                    outputAtomic: (0, u.y)({
                      value: y.outputAmount,
                      decimals: o,
                    }),
                    outputDecimals: o,
                    outputSymbol: y.outputSymbol,
                    minOutputAtomic:
                      y.minOutputAmount > 0
                        ? (0, u.y)({ value: y.minOutputAmount, decimals: o })
                        : null,
                    inputUsd: y.inputUsd > 0 ? y.inputUsd : null,
                    outputUsd: y.outputUsd,
                    impactPercent: y.priceImpactPercent,
                    bindingSlippageBps: Math.round(100 * B),
                    supplySharePercent: y.supplySharePercent,
                    networkCost: {
                      sol: y.networkCostSol,
                      usd: y.networkCostUsd,
                    },
                    venue: y.venue,
                    poolFeeEstimate: y.poolFeeEstimate,
                    transferTax: y.transferTax,
                    mevProtection: R,
                    referralFeeKind: y.referralFeeKind,
                  }
                : null),
              (S[9] = R),
              (S[10] = s),
              (S[11] = o),
              (S[12] = y.inputUsd),
              (S[13] = y.minOutputAmount),
              (S[14] = y.networkCostSol),
              (S[15] = y.networkCostUsd),
              (S[16] = y.outputAmount),
              (S[17] = y.outputSymbol),
              (S[18] = y.outputUsd),
              (S[19] = y.poolFeeEstimate),
              (S[20] = y.priceImpactPercent),
              (S[21] = y.referralFeeKind),
              (S[22] = y.supplySharePercent),
              (S[23] = y.transferTax),
              (S[24] = y.venue),
              (S[25] = B),
              (S[26] = t))
            : (t = S[26]);
          let a = t,
            c = null === a ? null : y.isServerPriced ? "fetch" : "local",
            m = "insufficient_funds" === y.errorReason;
          S[27] !== a || S[28] !== m || S[29] !== y.isError || S[30] !== g
            ? ((r =
                null === a && y.isError && !m
                  ? g("web.trade.quote_unavailable")
                  : null),
              (S[27] = a),
              (S[28] = m),
              (S[29] = y.isError),
              (S[30] = g),
              (S[31] = r))
            : (r = S[31]);
          let f = y.isError ? y.errorReason : null,
            d = null !== a && y.isServerPriced ? y.quotedAt : 0;
          (S[32] !== a ||
          S[33] !== y.isFetching ||
          S[34] !== y.isInputSettled ||
          S[35] !== c ||
          S[36] !== r ||
          S[37] !== f ||
          S[38] !== d
            ? ((l = {
                quote: a,
                quoteSource: c,
                isFetching: y.isFetching,
                isInputSettled: y.isInputSettled,
                errorMessage: r,
                errorReason: f,
                quoteSyncedAt: d,
                refreshMs: null,
              }),
              (S[32] = a),
              (S[33] = y.isFetching),
              (S[34] = y.isInputSettled),
              (S[35] = c),
              (S[36] = r),
              (S[37] = f),
              (S[38] = d),
              (S[39] = l))
            : (l = S[39]),
            (_ = l));
        }
        return _;
      },
    ],
    769548,
  );
};
