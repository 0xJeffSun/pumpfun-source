// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(352386);
  e.i(12692);
  var i = e.i(398902),
    a = e.i(256272),
    s = e.i(463276),
    l = e.i(745018),
    o = e.i(51206),
    u = e.i(607122),
    c = e.i(609926),
    d = e.i(101181),
    m = e.i(778593),
    p = e.i(162918),
    f = e.i(595673),
    g = e.i(280838),
    h = e.i(505563),
    y = e.i(811433),
    b = e.i(182040),
    v = e.i(90832),
    x = e.i(592054);
  function w(e) {
    let r,
      a,
      s,
      l,
      o,
      u,
      c,
      d,
      m = (0, n.c)(26),
      { state: p } = e,
      { t: f } = (0, i.f)(),
      g = p.sellLiquidityCap;
    if ("sell" !== p.side || !g) return null;
    let h = p.coin.symbol ?? "token";
    if (m[0] !== h) {
      let e;
      (m[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = /^\$/), (m[2] = e))
        : (e = m[2]),
        (r = h.replace(e, "")),
        (m[0] = h),
        (m[1] = r));
    } else r = m[1];
    let y = r;
    m[3] !== g.maxSellableUi
      ? ((a = (0, v.p)(g.maxSellableUi, 2)),
        (m[3] = g.maxSellableUi),
        (m[4] = a))
      : (a = m[4]);
    let b = `${a} ${y}`;
    return (
      m[5] !== g.realQuoteUi || m[6] !== p.quoteSymbol || m[7] !== f
        ? ((s = f("web.trade.curve_liquidity_title", {
            amount: (0, x.C)({ value: g.realQuoteUi, symbol: p.quoteSymbol }),
          })),
          (m[5] = g.realQuoteUi),
          (m[6] = p.quoteSymbol),
          (m[7] = f),
          (m[8] = s))
        : (s = m[8]),
      m[9] !== s
        ? ((l = (0, t.jsx)("p", {
            className: "font-medium text-text-warning",
            children: s,
          })),
          (m[9] = s),
          (m[10] = l))
        : (l = m[10]),
      m[11] !== b || m[12] !== p.quoteSymbol || m[13] !== f
        ? ((o = f("web.trade.curve_liquidity_description", {
            amount: b,
            quote: p.quoteSymbol,
          })),
          (m[11] = b),
          (m[12] = p.quoteSymbol),
          (m[13] = f),
          (m[14] = o))
        : (o = m[14]),
      m[15] !== o
        ? ((u = (0, t.jsx)("p", {
            className: "text-text-secondary",
            children: o,
          })),
          (m[15] = o),
          (m[16] = u))
        : (u = m[16]),
      m[17] !== g.maxSellableAtomic ||
      m[18] !== b ||
      m[19] !== p.handleSellCurveMax ||
      m[20] !== f
        ? ((c =
            g.maxSellableAtomic > BigInt(0) &&
            (0, t.jsx)("button", {
              type: "button",
              onClick: p.handleSellCurveMax,
              className:
                "self-start rounded-md bg-bg-quaternary px-2 py-0.5 text-[11px] font-medium text-text-primary transition-colors hover:bg-border-tertiary",
              children: f("web.trade.curve_liquidity_sell_max", { amount: b }),
            })),
          (m[17] = g.maxSellableAtomic),
          (m[18] = b),
          (m[19] = p.handleSellCurveMax),
          (m[20] = f),
          (m[21] = c))
        : (c = m[21]),
      m[22] !== l || m[23] !== u || m[24] !== c
        ? ((d = (0, t.jsxs)("div", {
            role: "note",
            "data-testid": "curve-liquidity-notice",
            className:
              "flex flex-col gap-1.5 rounded-md border border-border-tertiary bg-bg-tertiary px-3 py-2 text-[12px] leading-4",
            children: [l, u, c],
          })),
          (m[22] = l),
          (m[23] = u),
          (m[24] = c),
          (m[25] = d))
        : (d = m[25]),
      d
    );
  }
  var _ = e.i(514029),
    S = e.i(793987),
    A = e.i(693885),
    k = e.i(858133),
    j = e.i(158928),
    T = e.i(769548),
    $ = e.i(599077),
    P = e.i(198825),
    B = e.i(655397),
    E = e.i(743211),
    F = e.i(541917),
    I = e.i(72768),
    U = e.i(862507),
    M = e.i(356283);
  function C(e) {
    let r,
      a,
      s,
      l,
      o,
      u = (0, n.c)(15),
      { estimate: c, tokenSymbol: d } = e,
      { t: m } = (0, i.f)();
    return c
      ? (u[0] !== c.poolFeePercent || u[1] !== m
          ? ((r = m("web.trade.pool_fee_notice_title", {
              percent: (0, M.y)(c.poolFeePercent),
            })),
            (u[0] = c.poolFeePercent),
            (u[1] = m),
            (u[2] = r))
          : (r = u[2]),
        u[3] !== r
          ? ((a = (0, t.jsx)("p", {
              className: "font-medium text-text-warning",
              children: r,
            })),
            (u[3] = r),
            (u[4] = a))
          : (a = u[4]),
        u[5] !== c.payUsd ||
        u[6] !== c.receiveUsdAtSpot ||
        u[7] !== m ||
        u[8] !== d
          ? ((s = m("web.trade.pool_fee_notice_description", {
              receive: (0, v.w)(c.receiveUsdAtSpot),
              symbol: d,
              pay: (0, v.w)(c.payUsd),
            })),
            (u[5] = c.payUsd),
            (u[6] = c.receiveUsdAtSpot),
            (u[7] = m),
            (u[8] = d),
            (u[9] = s))
          : (s = u[9]),
        u[10] !== s
          ? ((l = (0, t.jsx)("p", {
              className: "text-text-secondary",
              children: s,
            })),
            (u[10] = s),
            (u[11] = l))
          : (l = u[11]),
        u[12] !== a || u[13] !== l
          ? ((o = (0, t.jsxs)("div", {
              role: "note",
              "data-testid": "solana-pool-fee-notice",
              className:
                "flex flex-col gap-0.5 rounded-md border border-border-tertiary bg-bg-tertiary px-3 py-2 text-[12px] leading-4",
              children: [a, l],
            })),
            (u[12] = a),
            (u[13] = l),
            (u[14] = o))
          : (o = u[14]),
        o)
      : null;
  }
  var q = e.i(426091),
    N = e.i(865259);
  function K(e) {
    let r,
      a,
      s,
      l,
      o,
      u,
      c,
      d,
      m = (0, n.c)(22),
      { estimate: p, tokenSymbol: f, receiveLabel: g } = e,
      { t: h } = (0, i.f)();
    if (!p || "info" === p.tier) return null;
    if (
      m[0] !== p.tier ||
      m[1] !== p.transferFeeBps ||
      m[2] !== g ||
      m[3] !== h ||
      m[4] !== f
    ) {
      let e,
        n = (0, N.f)(p.transferFeeBps);
      ((s = "note"),
        (l = "solana-transfer-tax-notice"),
        (o =
          "flex flex-col gap-0.5 rounded-md border border-border-tertiary bg-bg-tertiary px-3 py-2 text-[12px] leading-4"));
      let i = "confirm" === p.tier ? "text-loss" : "text-text-warning";
      (m[11] !== i
        ? ((e = (0, q.c)("font-medium", i)), (m[11] = i), (m[12] = e))
        : (e = m[12]),
        (u = (0, t.jsx)("p", {
          className: e,
          children: h("web.trade.transfer_tax_notice_title", { percent: n }),
        })),
        (r = "text-text-secondary"),
        (a = h("web.trade.transfer_tax_notice_description", {
          symbol: f,
          percent: n,
          receive: g,
        })),
        (m[0] = p.tier),
        (m[1] = p.transferFeeBps),
        (m[2] = g),
        (m[3] = h),
        (m[4] = f),
        (m[5] = r),
        (m[6] = a),
        (m[7] = s),
        (m[8] = l),
        (m[9] = o),
        (m[10] = u));
    } else
      ((r = m[5]), (a = m[6]), (s = m[7]), (l = m[8]), (o = m[9]), (u = m[10]));
    return (
      m[13] !== r || m[14] !== a
        ? ((c = (0, t.jsx)("p", { className: r, children: a })),
          (m[13] = r),
          (m[14] = a),
          (m[15] = c))
        : (c = m[15]),
      m[16] !== s || m[17] !== l || m[18] !== o || m[19] !== u || m[20] !== c
        ? ((d = (0, t.jsxs)("div", {
            role: s,
            "data-testid": l,
            className: o,
            children: [u, c],
          })),
          (m[16] = s),
          (m[17] = l),
          (m[18] = o),
          (m[19] = u),
          (m[20] = c),
          (m[21] = d))
        : (d = m[21]),
      d
    );
  }
  var L = e.i(304234),
    R = e.i(743141),
    O = e.i(429675),
    Q = e.i(782421),
    D = e.i(18075);
  function V(e) {
    let s,
      v,
      M,
      q,
      N,
      V,
      W,
      G,
      H,
      J,
      X,
      Z,
      Y,
      ee,
      et,
      en,
      er,
      ei,
      ea,
      es,
      el,
      eo,
      eu,
      ec,
      ed,
      em,
      ep,
      ef,
      eg,
      eh,
      ey,
      eb,
      ev,
      ex,
      ew,
      e_,
      eS,
      eA,
      ek,
      ej,
      eT,
      e$,
      eP,
      eB = (0, n.c)(160),
      {
        state: eE,
        onClose: eF,
        onSellAll: eI,
        compact: eU,
        showFloatingPanelLauncher: eM,
      } = e,
      eC = void 0 !== eU && eU,
      eq = void 0 !== eM && eM,
      { t: eN } = (0, i.f)(),
      eK = (0, y.R)(),
      { paused: eL, targetProps: eR } = (0, d.f)();
    eB[0] !== eL
      ? ((s = { pausePreview: eL }), (eB[0] = eL), (eB[1] = s))
      : (s = eB[1]);
    let eO = (0, T.f)(eE, s);
    eB[2] !== eK || eB[3] !== eE
      ? ((v = { state: eE, analytics: eK }),
        (eB[2] = eK),
        (eB[3] = eE),
        (eB[4] = v))
      : (v = eB[4]);
    let { submit: eQ } = (function (e) {
        let t,
          r,
          i = (0, n.c)(15),
          { state: a, analytics: s } = e,
          { setShowWallet: l, setShowDeposit: o } = (0, P.useConnectWallet)(),
          u = (0, $.useRouter)(),
          {
            isLoggedIn: c,
            coin: d,
            side: m,
            markTradePending: p,
            handlePlaceTrade: f,
            immediateTradeInFlight: g,
            shouldPromptAddQuoteFunds: h,
            isUsdcQuote: y,
          } = a,
          b = a.isUsdcPayment ?? y,
          { trackConnectWalletPress: v } = s;
        i[0] !== d ||
        i[1] !== f ||
        i[2] !== g ||
        i[3] !== c ||
        i[4] !== b ||
        i[5] !== p ||
        i[6] !== u ||
        i[7] !== o ||
        i[8] !== l ||
        i[9] !== h ||
        i[10] !== m ||
        i[11] !== v
          ? ((t = async () => {
              if (!g) {
                if (!c) {
                  (v({ coin: d }), l(!0));
                  return;
                }
                if (h)
                  return b
                    ? void u.push(`/coin/${(0, B.p)().toBase58()}`)
                    : void o(!0);
                (p(m), await f());
              }
            }),
            (i[0] = d),
            (i[1] = f),
            (i[2] = g),
            (i[3] = c),
            (i[4] = b),
            (i[5] = p),
            (i[6] = u),
            (i[7] = o),
            (i[8] = l),
            (i[9] = h),
            (i[10] = m),
            (i[11] = v),
            (i[12] = t))
          : (t = i[12]);
        let x = t;
        return (
          i[13] !== x
            ? ((r = { submit: x }), (i[13] = x), (i[14] = r))
            : (r = i[14]),
          r
        );
      })(v),
      eD = (0, E.g)(eE, eO),
      eV = (0, A.f)();
    (eB[5] !== eE
      ? ((M = (0, S.O)(eE)), (eB[5] = eE), (eB[6] = M))
      : (M = eB[6]),
      eB[7] !== eD.requiresHoldForQuick || eB[8] !== M
        ? ((q = { state: M, requiresHold: eD.requiresHoldForQuick }),
          (eB[7] = eD.requiresHoldForQuick),
          (eB[8] = M),
          (eB[9] = q))
        : (q = eB[9]));
    let ez = (0, j.f)(q),
      eW = (0, k.N)(),
      { presets: eG, activeIndex: eH, setActiveIndex: eJ } = (0, m.f)(),
      eX = eE.isLoggedIn;
    (eB[10] !== eI || eB[11] !== eE.handleSellAll
      ? ((N = () => {
          eI && eI(eE.handleSellAll);
        }),
        (V = [eI, eE.handleSellAll]),
        (eB[10] = eI),
        (eB[11] = eE.handleSellAll),
        (eB[12] = N),
        (eB[13] = V))
      : ((N = eB[12]), (V = eB[13])),
      (0, r.useEffect)(N, V));
    let eZ = eE.coin.mint,
      eY = eE.coin.chain_id,
      e1 = eE.side,
      e0 = !!eF;
    eB[14] !== eE.coin.chain_id ||
    eB[15] !== eE.coin.mint ||
    eB[16] !== eE.side ||
    eB[17] !== e0
      ? ((W = { mint: eZ, chainId: eY, side: e1, isFullScreen: e0 }),
        (eB[14] = eE.coin.chain_id),
        (eB[15] = eE.coin.mint),
        (eB[16] = eE.side),
        (eB[17] = e0),
        (eB[18] = W))
      : (W = eB[18]);
    let e2 = (0, y.U)(W),
      {
        coin: e4,
        side: e3,
        setSide: e5,
        mode: e8,
        solUsdPrice: e7,
        setTypedValue: e6,
        slippage: e9,
        tipAmount: te,
        priorityFee: tt,
        frontRunningProtection: tn,
        solBalanceUi: tr,
        celebration: ti,
        isUsdcQuote: ta,
        quoteSymbol: ts,
        quoteBalanceUi: tl,
      } = eE,
      to = eE.isUsdcPayment ?? ta;
    eB[19] !== tn ||
    eB[20] !== to ||
    eB[21] !== e8 ||
    eB[22] !== tt ||
    eB[23] !== tl ||
    eB[24] !== e9 ||
    eB[25] !== tr ||
    eB[26] !== e7 ||
    eB[27] !== eE.buyAffordability ||
    eB[28] !== eE.isPaymentRouted ||
    eB[29] !== te
      ? ((G = () => {
          if ("token" === e8) return null;
          if (to) {
            if (tl <= 0) return null;
            let e = Math.max(
              0,
              tl - (eE.isPaymentRouted ? Number(c.J) / 1e6 : 0),
            );
            return e <= 0 ? null : e * (0, x.P)(e9);
          }
          let e = (0, x.G)({
            solBalanceUi: tr,
            slippage: e9,
            tipAmount: te,
            frontRunningProtection: tn,
            priorityFeeAmount: tt,
            affordability: eE.buyAffordability,
          });
          return "sol" === e8 ? e : e7 > 0 ? e * e7 : 0;
        }),
        (eB[19] = tn),
        (eB[20] = to),
        (eB[21] = e8),
        (eB[22] = tt),
        (eB[23] = tl),
        (eB[24] = e9),
        (eB[25] = tr),
        (eB[26] = e7),
        (eB[27] = eE.buyAffordability),
        (eB[28] = eE.isPaymentRouted),
        (eB[29] = te),
        (eB[30] = G))
      : (G = eB[30]);
    let tu = G;
    eB[31] !== e6 || eB[32] !== e3 || eB[33] !== tu
      ? ((H = (e) => {
          if ("buy" !== e3) return;
          let t = tu();
          null !== t && e6((e / 100) * t);
        }),
        (eB[31] = e6),
        (eB[32] = e3),
        (eB[33] = tu),
        (eB[34] = H))
      : (H = eB[34]);
    let tc = H;
    eB[35] !== e4.mint || eB[36] !== tc || eB[37] !== e8 || eB[38] !== e3
      ? ((J = () => {
          "buy" !== e3 ||
            ("token" !== e8 &&
              ((0, f.h4)({
                mint: e4.mint,
                tradeDirection: "buy",
                amountLabel: "max",
              }),
              tc(100)));
        }),
        (eB[35] = e4.mint),
        (eB[36] = tc),
        (eB[37] = e8),
        (eB[38] = e3),
        (eB[39] = J))
      : (J = eB[39]);
    let td = J,
      tm = "buy" === e3 ? tu() : null,
      tp = "buy" === e3 ? null === tm || tm <= 0 : !eE.hasTokenBalance;
    eB[40] !== e4.mint || eB[41] !== tc || eB[42] !== e3 || eB[43] !== eE
      ? ((X = (e) => {
          ((0, f.h4)({
            mint: e4.mint,
            tradeDirection: e3,
            amountLabel: `${e}%`,
          }),
            "buy" === e3 ? tc(e) : eE.setAmountFromSellPercentage(e));
        }),
        (eB[40] = e4.mint),
        (eB[41] = tc),
        (eB[42] = e3),
        (eB[43] = eE),
        (eB[44] = X))
      : (X = eB[44]);
    let tf = X,
      tg = eO.quote,
      th = e4.symbol ?? tg?.outputSymbol ?? "";
    if (eB[45] !== th) {
      let e;
      (eB[47] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = /^\$/), (eB[47] = e))
        : (e = eB[47]),
        (Z = th.replace(e, "")),
        (eB[45] = th),
        (eB[46] = Z));
    } else Z = eB[46];
    let ty = Z;
    eB[48] !== ty || eB[49] !== tg
      ? ((Y = tg
          ? (0, t.jsxs)(t.Fragment, {
              children: [
                tg.poolFeeEstimate &&
                  (0, t.jsx)("div", {
                    className: "pt-1",
                    children: (0, t.jsx)(C, {
                      estimate: tg.poolFeeEstimate,
                      tokenSymbol: tg.outputSymbol,
                    }),
                  }),
                tg.transferTax &&
                  "info" !== tg.transferTax.tier &&
                  (0, t.jsx)("div", {
                    className: "pt-1",
                    children: (0, t.jsx)(K, {
                      estimate: tg.transferTax,
                      tokenSymbol: ty,
                      receiveLabel: `${(0, p.x)({ atomic: tg.outputAtomic, decimals: tg.outputDecimals })} ${tg.outputSymbol}`,
                    }),
                  }),
              ],
            })
          : null),
        (eB[48] = ty),
        (eB[49] = tg),
        (eB[50] = Y))
      : (Y = eB[50]);
    let tb = Y;
    (eB[51] !== ti || eB[52] !== e4
      ? ((ee = (0, t.jsx)(O.f, { trigger: ti, coin: e4 })),
        (eB[51] = ti),
        (eB[52] = e4),
        (eB[53] = ee))
      : (ee = eB[53]),
      eB[54] !== eN
        ? ((et = eN("web.trade.side_aria")), (eB[54] = eN), (eB[55] = et))
        : (et = eB[55]),
      eB[56] !== e5 || eB[57] !== e3
        ? ((en = (e) => {
            (e !== e3 && (0, f._i)({ fromValue: e3, toValue: e }), e5(e));
          }),
          (eB[56] = e5),
          (eB[57] = e3),
          (eB[58] = en))
        : (en = eB[58]),
      eB[59] !== eN
        ? ((er = eN("web.trade.buy")), (eB[59] = eN), (eB[60] = er))
        : (er = eB[60]),
      eB[61] !== er
        ? ((ei = { value: "buy", label: er, tone: "mint" }),
          (eB[61] = er),
          (eB[62] = ei))
        : (ei = eB[62]),
      eB[63] !== eN
        ? ((ea = eN("web.trade.sell")), (eB[63] = eN), (eB[64] = ea))
        : (ea = eB[64]),
      eB[65] !== ea
        ? ((es = { value: "sell", label: ea, tone: "loss" }),
          (eB[65] = ea),
          (eB[66] = es))
        : (es = eB[66]),
      eB[67] !== ei || eB[68] !== es
        ? ((el = [ei, es]), (eB[67] = ei), (eB[68] = es), (eB[69] = el))
        : (el = eB[69]),
      eB[70] !== e3 || eB[71] !== et || eB[72] !== en || eB[73] !== el
        ? ((eo = (0, t.jsx)(u.X, {
            density: "terminal",
            size: 32,
            fullWidth: !0,
            "aria-label": et,
            value: e3,
            onValueChange: en,
            options: el,
            className: "min-w-0 flex-1 shrink",
          })),
          (eB[70] = e3),
          (eB[71] = et),
          (eB[72] = en),
          (eB[73] = el),
          (eB[74] = eo))
        : (eo = eB[74]),
      eB[75] !== eq
        ? ((eu = eq ? (0, t.jsx)(_.f, {}) : null), (eB[75] = eq), (eB[76] = eu))
        : (eu = eB[76]));
    let tv = ez.settingsPresets,
      tx = eV.sheet.open,
      tw = eV.onOpenChange,
      t_ = eV.sheet.focusSettingId;
    return (
      eB[77] !== eN
        ? ((ec = eN("web.trade.trade_settings")), (eB[77] = eN), (eB[78] = ec))
        : (ec = eB[78]),
      eB[79] === Symbol.for("react.memo_cache_sentinel")
        ? ((ed = (0, t.jsx)(l.xF, {})), (eB[79] = ed))
        : (ed = eB[79]),
      eB[80] !== ec
        ? ((em = (0, t.jsx)(o._, {
            density: "terminal",
            "aria-label": ec,
            children: ed,
          })),
          (eB[80] = ec),
          (eB[81] = em))
        : (em = eB[81]),
      eB[82] !== ez.settingsPresets ||
      eB[83] !== em ||
      eB[84] !== eV.onOpenChange ||
      eB[85] !== eV.sheet.focusSettingId ||
      eB[86] !== eV.sheet.open
        ? ((ep = (0, t.jsx)(U.m, {
            quickPresets: tv,
            open: tx,
            onOpenChange: tw,
            focusSettingId: t_,
            trigger: em,
          })),
          (eB[82] = ez.settingsPresets),
          (eB[83] = em),
          (eB[84] = eV.onOpenChange),
          (eB[85] = eV.sheet.focusSettingId),
          (eB[86] = eV.sheet.open),
          (eB[87] = ep))
        : (ep = eB[87]),
      eB[88] !== eF || eB[89] !== eN
        ? ((ef =
            eF &&
            (0, t.jsx)(o._, {
              density: "terminal",
              onClick: eF,
              "aria-label": eN("web.trade.close_trade_box"),
              children: (0, t.jsx)(l.x6, {}),
            })),
          (eB[88] = eF),
          (eB[89] = eN),
          (eB[90] = ef))
        : (ef = eB[90]),
      eB[91] !== eo || eB[92] !== eu || eB[93] !== ep || eB[94] !== ef
        ? ((eg = (0, t.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [eo, eu, ep, ef],
          })),
          (eB[91] = eo),
          (eB[92] = eu),
          (eB[93] = ep),
          (eB[94] = ef),
          (eB[95] = eg))
        : (eg = eB[95]),
      eB[96] !== eO || eB[97] !== eE
        ? ((eh = (0, S.N)(eE, eO)), (eB[96] = eO), (eB[97] = eE), (eB[98] = eh))
        : (eh = eB[98]),
      eB[99] !== eH || eB[100] !== eG || eB[101] !== eJ
        ? ((ey =
            eG.length > 1
              ? (0, t.jsx)(D.f, { presets: eG, activeIndex: eH, onSelect: eJ })
              : void 0),
          (eB[99] = eH),
          (eB[100] = eG),
          (eB[101] = eJ),
          (eB[102] = ey))
        : (ey = eB[102]),
      eB[103] !== eW.values || eB[104] !== tf || eB[105] !== tp
        ? ((eb = { percents: eW.values, disabled: tp, onSelect: tf }),
          (eB[103] = eW.values),
          (eB[104] = tf),
          (eB[105] = tp),
          (eB[106] = eb))
        : (eb = eB[106]),
      eB[107] !== ey || eB[108] !== eb
        ? ((ev = (0, t.jsx)(h.Q, { selector: ey, shares: eb })),
          (eB[107] = ey),
          (eB[108] = eb),
          (eB[109] = ev))
        : (ev = eB[109]),
      eB[110] !== eC || eB[111] !== eh || eB[112] !== ev
        ? ((ex = (0, t.jsx)(g.k, { model: eh, compact: eC, footer: ev })),
          (eB[110] = eC),
          (eB[111] = eh),
          (eB[112] = ev),
          (eB[113] = ex))
        : (ex = eB[113]),
      eB[114] !== td ||
      eB[115] !== e8 ||
      eB[116] !== eX ||
      eB[117] !== e3 ||
      eB[118] !== eE
        ? ((ew =
            eX &&
            (0, t.jsx)("div", {
              className: "flex items-center gap-2",
              children: (0, t.jsx)(b.f, {
                model: (0, S.F)(eE),
                onMax:
                  "buy" === e3
                    ? "token" !== e8
                      ? td
                      : void 0
                    : eE.hasTokenBalance
                      ? eE.handleSellMax
                      : void 0,
                className: "min-w-0 flex-1",
              }),
            })),
          (eB[114] = td),
          (eB[115] = e8),
          (eB[116] = eX),
          (eB[117] = e3),
          (eB[118] = eE),
          (eB[119] = ew))
        : (ew = eB[119]),
      eB[120] !== eR ||
      eB[121] !== eL ||
      eB[122] !== tb ||
      eB[123] !== eO ||
      eB[124] !== eE.coin.mint
        ? ((e_ = (0, t.jsx)(F.f, {
            preview: eO,
            mint: eE.coin.mint,
            pauseTargetProps: eR,
            paused: eL,
            notices: tb,
          })),
          (eB[120] = eR),
          (eB[121] = eL),
          (eB[122] = tb),
          (eB[123] = eO),
          (eB[124] = eE.coin.mint),
          (eB[125] = e_))
        : (e_ = eB[125]),
      eB[126] !== eE
        ? ((eS = (0, t.jsx)(w, { state: eE })), (eB[126] = eE), (eB[127] = eS))
        : (eS = eB[127]),
      eB[128] !== eD.guard || eB[129] !== eD.holdRequired
        ? ((eA = (0, t.jsx)(Q.f, {
            guard: eD.guard,
            holdRequired: eD.holdRequired,
          })),
          (eB[128] = eD.guard),
          (eB[129] = eD.holdRequired),
          (eB[130] = eA))
        : (eA = eB[130]),
      eB[131] !== eD || eB[132] !== eE || eB[133] !== eQ
        ? ((ek = (0, t.jsx)(R.z, { state: eE, onSubmit: eQ, guard: eD })),
          (eB[131] = eD),
          (eB[132] = eE),
          (eB[133] = eQ),
          (eB[134] = ek))
        : (ek = eB[134]),
      eB[135] !== e8 ||
      eB[136] !== ts ||
      eB[137] !== eE.canChoosePaymentAsset ||
      eB[138] !== eE.shouldPromptAddQuoteFunds
        ? ((ej = (0, L.K)({
            chain: "solana",
            promptsAddQuoteFunds: eE.shouldPromptAddQuoteFunds,
            mode: (0, S.G)(e8),
            canChoosePaymentAsset: eE.canChoosePaymentAsset,
            quoteSymbol: ts,
          })),
          (eB[135] = e8),
          (eB[136] = ts),
          (eB[137] = eE.canChoosePaymentAsset),
          (eB[138] = eE.shouldPromptAddQuoteFunds),
          (eB[139] = ej))
        : (ej = eB[139]),
      eB[140] !== ej
        ? ((eT = (0, t.jsx)(L.$, { note: ej })), (eB[140] = ej), (eB[141] = eT))
        : (eT = eB[141]),
      eB[142] !== e4.mint ||
      eB[143] !== eC ||
      eB[144] !== ez ||
      eB[145] !== e3 ||
      eB[146] !== eV
        ? ((e$ = eC
            ? ez.hasPosition
              ? (0, t.jsx)(I.f, {
                  quick: ez,
                  resetKey: `${e4.mint}:${e3}`,
                  side: "sell",
                })
              : null
            : (0, t.jsx)(I.f, {
                quick: ez,
                resetKey: `${e4.mint}:${e3}`,
                side: e3,
                onEditPresets: (e) => {
                  e.settingId && eV.openSetting(e.settingId);
                },
              })),
          (eB[142] = e4.mint),
          (eB[143] = eC),
          (eB[144] = ez),
          (eB[145] = e3),
          (eB[146] = eV),
          (eB[147] = e$))
        : (e$ = eB[147]),
      eB[148] !== e2 ||
      eB[149] !== ee ||
      eB[150] !== eg ||
      eB[151] !== ex ||
      eB[152] !== ew ||
      eB[153] !== e_ ||
      eB[154] !== eS ||
      eB[155] !== eA ||
      eB[156] !== ek ||
      eB[157] !== eT ||
      eB[158] !== e$
        ? ((eP = (0, t.jsx)(t.Fragment, {
            children: (0, t.jsxs)(a.g, {
              className: "relative min-w-0 gap-3 overflow-hidden p-3",
              onClick: z,
              onPointerDownCapture: e2,
              onFocusCapture: e2,
              children: [ee, eg, ex, ew, e_, eS, eA, ek, eT, e$],
            }),
          })),
          (eB[148] = e2),
          (eB[149] = ee),
          (eB[150] = eg),
          (eB[151] = ex),
          (eB[152] = ew),
          (eB[153] = e_),
          (eB[154] = eS),
          (eB[155] = eA),
          (eB[156] = ek),
          (eB[157] = eT),
          (eB[158] = e$),
          (eB[159] = eP))
        : (eP = eB[159]),
      eP
    );
  }
  function z(e) {
    return e.stopPropagation();
  }
  var W = e.i(635587);
  let G = r.default.memo(function (e) {
    let r,
      i = (0, n.c)(5),
      a = (0, W.E)();
    if (a && a.coin.mint === e.coin.mint) {
      let n;
      return (
        i[0] !== e || i[1] !== a
          ? ((n = (0, t.jsx)(J, { ...e, state: a })),
            (i[0] = e),
            (i[1] = a),
            (i[2] = n))
          : (n = i[2]),
        n
      );
    }
    return (
      i[3] !== e
        ? ((r = (0, t.jsx)(H, { ...e })), (i[3] = e), (i[4] = r))
        : (r = i[4]),
      r
    );
  });
  function H(e) {
    let r,
      i,
      a = (0, n.c)(5);
    a[0] !== e.coin
      ? ((r = { coin: e.coin }), (a[0] = e.coin), (a[1] = r))
      : (r = a[1]);
    let l = (0, s.f)(r);
    return (
      a[2] !== e || a[3] !== l
        ? ((i = (0, t.jsx)(J, { ...e, state: l })),
          (a[2] = e),
          (a[3] = l),
          (a[4] = i))
        : (i = a[4]),
      i
    );
  }
  function J(e) {
    let r,
      s = (0, n.c)(10),
      {
        state: l,
        onClose: o,
        onSellAll: u,
        compact: c,
        showFloatingPanelLauncher: d,
      } = e,
      { t: m } = (0, i.f)();
    if (l.isUntradeable) {
      let e, n;
      return (
        s[0] !== m
          ? ((e = m("web.trade.not_tradeable_on_pump")), (s[0] = m), (s[1] = e))
          : (e = s[1]),
        s[2] !== e
          ? ((n = (0, t.jsx)(a.g, {
              "data-testid": "trade-box-exotic-quote",
              children: (0, t.jsx)("p", {
                className: "text-sm text-text-tertiary",
                children: e,
              }),
            })),
            (s[2] = e),
            (s[3] = n))
          : (n = s[3]),
        n
      );
    }
    return (
      s[4] !== c || s[5] !== o || s[6] !== u || s[7] !== d || s[8] !== l
        ? ((r = (0, t.jsx)(V, {
            state: l,
            onClose: o,
            onSellAll: u,
            compact: c,
            showFloatingPanelLauncher: d,
          })),
          (s[4] = c),
          (s[5] = o),
          (s[6] = u),
          (s[7] = d),
          (s[8] = l),
          (s[9] = r))
        : (r = s[9]),
      r
    );
  }
  e.s(["TradeBox", 0, G], 429400);
};
