// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(426091);
  e.i(12692);
  var n = e.i(398902),
    s = e.i(90832),
    r = e.i(939150),
    l = e.i(855659);
  function o(e) {
    let s,
      r,
      o,
      d = (0, i.c)(8),
      { onClick: c, className: u } = e,
      { t: m } = (0, n.f)();
    return (
      d[0] !== u
        ? ((s = (0, a.c)(l.l, u)), (d[0] = u), (d[1] = s))
        : (s = d[1]),
      d[2] !== m ? ((r = m("common.max")), (d[2] = m), (d[3] = r)) : (r = d[3]),
      d[4] !== c || d[5] !== s || d[6] !== r
        ? ((o = (0, t.jsx)("button", {
            type: "button",
            onClick: c,
            "data-testid": "trade-max-button",
            className: s,
            children: r,
          })),
          (d[4] = c),
          (d[5] = s),
          (d[6] = r),
          (d[7] = o))
        : (o = d[7]),
      o
    );
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let n,
          l,
          d,
          c,
          u,
          m,
          f = (0, i.c)(21),
          { model: p, onMax: b, className: x } = e,
          {
            isLoggedIn: y,
            side: h,
            funding: g,
            token: _,
            selector: v,
            suffix: j,
          } = p;
        if (!y) return null;
        let w = "buy" === h;
        f[0] !== g || f[1] !== w || f[2] !== _
          ? ((n = w
              ? `${(0, s.p)(g.amount, g.maxFractionDigits)} ${g.symbol}`
              : `${null === _.amount ? "—" : (0, s.p)(_.amount, 2)} ${_.symbol}`),
            (f[0] = g),
            (f[1] = w),
            (f[2] = _),
            (f[3] = n))
          : (n = f[3]);
        let k = n;
        f[4] !== g || f[5] !== w
          ? ((l = w && null !== g.usd ? (0, s.w)(g.usd) : void 0),
            (f[4] = g),
            (f[5] = w),
            (f[6] = l))
          : (l = f[6]);
        let N = l,
          S = w ? null : j;
        return (
          f[7] !== x
            ? ((d = (0, a.c)(
                "flex items-center justify-between text-[12px] text-text-quaternary",
                x,
              )),
              (f[7] = x),
              (f[8] = d))
            : (d = f[8]),
          f[9] !== w || f[10] !== k || f[11] !== N || f[12] !== v || f[13] !== S
            ? ((c =
                w && v
                  ? (0, t.jsx)(r.f, {
                      paymentAsset: v.value,
                      solBalanceUi: v.solBalanceUi,
                      usdcBalanceUi: v.usdcBalanceUi,
                      solUsdPrice: v.solUsdPrice,
                      onSelect: v.onChange,
                    })
                  : (0, t.jsxs)("span", {
                      className: "flex h-7 items-center gap-1.5",
                      children: [
                        (0, t.jsx)("span", {
                          className:
                            "font-medium tabular-nums text-text-tertiary",
                          children: k,
                        }),
                        N &&
                          (0, t.jsxs)("span", {
                            className: "tabular-nums text-text-quaternary",
                            children: ["(", N, ")"],
                          }),
                        S
                          ? (0, t.jsx)("span", {
                              className: "text-text-quaternary",
                              children: S,
                            })
                          : null,
                      ],
                    })),
              (f[9] = w),
              (f[10] = k),
              (f[11] = N),
              (f[12] = v),
              (f[13] = S),
              (f[14] = c))
            : (c = f[14]),
          f[15] !== b
            ? ((u = b && (0, t.jsx)(o, { onClick: b })),
              (f[15] = b),
              (f[16] = u))
            : (u = f[16]),
          f[17] !== d || f[18] !== c || f[19] !== u
            ? ((m = (0, t.jsxs)("div", {
                "data-testid": "balance-row",
                className: d,
                children: [c, u],
              })),
              (f[17] = d),
              (f[18] = c),
              (f[19] = u),
              (f[20] = m))
            : (m = f[20]),
          m
        );
      },
    ],
    182040,
  );
  var d = e.i(790431),
    c = e.i(280838),
    u = e.i(592054);
  let m = (e) => ("sol" === e ? "funding" : e),
    f = (e) => {
      let t = e.isUsdcPayment ?? e.isUsdcQuote;
      return {
        isUsdcPayment: t,
        paymentTicker: e.paymentTicker ?? e.quoteSymbol,
        paymentDecimals: e.paymentDecimals ?? e.quoteDecimals,
        isPaymentRouted: e.isPaymentRouted ?? !1,
        usdAmount: t
          ? e.solAmount
          : e.solUsdPrice > 0
            ? e.solAmount * e.solUsdPrice
            : 0,
      };
    },
    p = (e) => {
      let { paymentTicker: t, usdAmount: i } = f(e),
        a = [];
      return (
        e.isSolBalanceInsufficient && a.push("funding_insufficient"),
        e.isTokenBalanceInsufficient && a.push("token_insufficient"),
        e.isSellOverCurveLiquidity && a.push("curve_liquidity_exceeded"),
        {
          side: e.side,
          isLoggedIn: e.isLoggedIn,
          isSubmitting: !!e.isFormTradeLoading,
          isTradeInFlight: !!e.isTradeLoading || !!e.immediateTradeInFlight,
          isMigrationTrade: !!e.isMigrationTrade,
          prompt: e.shouldPromptAddQuoteFunds ? "add_funds" : null,
          blocks: a,
          amount: {
            mode: m(e.mode),
            typed: e.typedValue,
            usd: i,
            funding: e.solAmount,
            token: e.tokenAmount,
          },
          token: { symbol: (0, u.I)(e.coin.symbol) },
          funding: { symbol: t },
        }
      );
    };
  e.s(
    [
      "G",
      0,
      m,
      "N",
      0,
      (e, t) => {
        let {
            isUsdcPayment: i,
            paymentTicker: a,
            paymentDecimals: n,
            isPaymentRouted: s,
            usdAmount: r,
          } = f(e),
          l = t?.quote ?? null,
          o = !(0, d.c)({
            isPaymentRouted: s,
            isUsdcPayment: i,
            isUsdcQuote: e.isUsdcQuote,
          }),
          p = "buy" === e.side,
          b = l
            ? Number(l.outputAtomic) / 10 ** l.outputDecimals
            : o
              ? p
                ? e.tokenAmount
                : e.solAmount
              : 0,
          x = p
            ? { usd: r, funding: e.solAmount, token: b }
            : {
                usd: l ? (l.outputUsd ?? 0) : o ? r : 0,
                funding: b,
                token: e.tokenAmount,
              };
        return {
          value: e.typedValue > 0 ? String(e.typedValue) : "",
          setValue: (t) => {
            let i = (0, c.p)(t);
            null !== i && e.setTypedValue(i);
          },
          mode: m(e.mode),
          cycleMode: e.cycleMode,
          canCycleMode:
            e.canCycleMode ??
            !(
              p &&
              (0, d.c)({
                isPaymentRouted: s,
                isUsdcPayment: i,
                isUsdcQuote: e.isUsdcQuote,
              })
            ),
          funding: { symbol: a, decimals: n, isUsdPegged: i },
          token: { symbol: (0, u.I)(e.coin.symbol), decimals: 6 },
          conversions: x,
          disabled: !!e.isFormTradeLoading,
        };
      },
      "F",
      0,
      (e) => ({
        isLoggedIn: e.isLoggedIn,
        side: e.side,
        funding: e.isUsdcPayment
          ? {
              amount: e.quoteBalanceUi,
              symbol: e.paymentTicker,
              maxFractionDigits: 2,
              usd: null,
            }
          : {
              amount: e.solBalanceUi,
              symbol: "SOL",
              maxFractionDigits: 3,
              usd: e.solUsdPrice > 0 ? e.solBalanceUi * e.solUsdPrice : null,
            },
        token: { amount: e.tokenBalanceUi, symbol: (0, u.I)(e.coin.symbol) },
        selector: e.canChoosePaymentAsset
          ? {
              value: e.paymentAsset,
              solBalanceUi: e.solBalanceUi,
              usdcBalanceUi: e.usdcBalanceUi,
              solUsdPrice: e.solUsdPrice,
            }
          : null,
      }),
      "O",
      0,
      (e) => ({
        isUsdcQuote: e.isUsdcQuote,
        isUsdDenomUnavailable: e.isUsdDenomUnavailable,
        isUsdcPayment: e.isUsdcPayment,
        isPaymentRouted: e.isPaymentRouted,
        isCrossCurrencyTrade: e.isCrossCurrencyTrade,
        healStoredDisplayMode: !1,
        hasTokenBalance: e.hasTokenBalance,
        isTradeLoading: e.isTradeLoading,
        immediateTradeInFlight: e.immediateTradeInFlight,
        spamQuickTrade: e.spamQuickTrade,
        activeQuickTrade: e.activeQuickTrade,
        executeQuickBuyPreset: e.executeQuickBuyPreset,
        executeQuickSellPreset: e.executeQuickSellPreset,
        isQuickBuyPresetInsufficient: e.isQuickBuyPresetInsufficient,
      }),
      "h",
      0,
      p,
    ],
    793987,
  );
  var b = e.i(388625),
    x = e.i(152584),
    y = e.i(427140),
    h = e.i(63225);
  function g(e) {
    let t,
      a,
      n,
      s = (0, i.c)(13),
      {
        hasAmount: r,
        tradeSizeUsd: l,
        marketCapUsd: o,
        valueLostPercent: d,
      } = e,
      { holdToConfirm: c } = (0, b.f)();
    s[0] !== r || s[1] !== o || s[2] !== l || s[3] !== d
      ? ((t = r
          ? (0, h.B)({ tradeSizeUsd: l, marketCapUsd: o, valueLostPercent: d })
          : null),
        (s[0] = r),
        (s[1] = o),
        (s[2] = l),
        (s[3] = d),
        (s[4] = t))
      : (t = s[4]);
    let u = t,
      m = c && null !== u && u.reasons.length > 0;
    return (
      s[5] !== c || s[6] !== o
        ? ((a = (e) => c && (0, h.W)(e, o)), (s[5] = c), (s[6] = o), (s[7] = a))
        : (a = s[7]),
      s[8] !== u || s[9] !== c || s[10] !== m || s[11] !== a
        ? ((n = {
            guard: u,
            holdRequired: m,
            holdToConfirm: c,
            requiresHoldForQuickSize: a,
          }),
          (s[8] = u),
          (s[9] = c),
          (s[10] = m),
          (s[11] = a),
          (s[12] = n))
        : (n = s[12]),
      n
    );
  }
  let _ = (e) =>
      "number" == typeof e && Number.isFinite(e) && e > 0 ? e : void 0,
    v = (e, t) => _(e?.usdMarketCap) ?? _(t.usd_market_cap);
  e.s(
    [
      "y",
      0,
      v,
      "g",
      0,
      function (e, t) {
        let a,
          n,
          s,
          r,
          l,
          o,
          d,
          c,
          u = (0, i.c)(30),
          {
            coin: m,
            side: f,
            solAmount: p,
            tokenAmount: b,
            solUsdPrice: j,
            tokenBalanceUi: w,
          } = e,
          k = e.isUsdcPayment ?? e.isUsdcQuote,
          N = (0, x.f)(m.mint);
        u[0] !== m || u[1] !== N
          ? ((a = (0, y.f)(m, N)), (u[0] = m), (u[1] = N), (u[2] = a))
          : (a = u[2]);
        let S = a.tokenUsdPrice;
        u[3] !== m || u[4] !== N
          ? ((n = v(N, m)), (u[3] = m), (u[4] = N), (u[5] = n))
          : (n = u[5]);
        let U = n,
          P = k ? p : j > 0 ? p * j : 0,
          F = "buy" === f,
          C = (F && p > 0) || b > 0,
          I = S > 0 ? b * S : void 0;
        u[6] !== F || u[7] !== P || u[8] !== I
          ? ((s = F ? _(P) : I), (u[6] = F), (u[7] = P), (u[8] = I), (u[9] = s))
          : (s = u[9]);
        let q = s,
          $ = t.quote;
        u[10] !== $ || u[11] !== F || u[12] !== P || u[13] !== I
          ? ((r = $
              ? (0, h.f)(
                  null === $.impactPercent ? null : Math.abs($.impactPercent),
                  (0, h.H)({
                    paidUsd: F ? ($.inputUsd ?? P) : I,
                    receivedUsd: $.outputUsd,
                  }),
                )
              : null),
            (u[10] = $),
            (u[11] = F),
            (u[12] = P),
            (u[13] = I),
            (u[14] = r))
          : (r = u[14]);
        let T = r;
        u[15] !== C || u[16] !== U || u[17] !== q || u[18] !== T
          ? ((l = {
              hasAmount: C,
              tradeSizeUsd: q,
              marketCapUsd: U,
              valueLostPercent: T,
            }),
            (u[15] = C),
            (u[16] = U),
            (u[17] = q),
            (u[18] = T),
            (u[19] = l))
          : (l = u[19]);
        let A = g(l);
        u[20] !== j || u[21] !== S || u[22] !== w
          ? ((o = (e, t, i) =>
              "sell" === e
                ? S > 0
                  ? (t / 100) * w * S
                  : void 0
                : "usd" === i
                  ? t
                  : j > 0
                    ? t * j
                    : void 0),
            (u[20] = j),
            (u[21] = S),
            (u[22] = w),
            (u[23] = o))
          : (o = u[23]);
        let B = o;
        return (
          u[24] !== B || u[25] !== A
            ? ((d = (e, t, i) => A.requiresHoldForQuickSize(B(e, t, i))),
              (u[24] = B),
              (u[25] = A),
              (u[26] = d))
            : (d = u[26]),
          u[27] !== d || u[28] !== A
            ? ((c = { ...A, requiresHoldForQuick: d }),
              (u[27] = d),
              (u[28] = A),
              (u[29] = c))
            : (c = u[29]),
          c
        );
      },
      "Z",
      0,
      g,
    ],
    743211,
  );
  var j = e.i(847407),
    w = e.i(833119);
  let k = {
      region_restricted: "both",
      asset_refused: "both",
      buy_blocked: "buy",
      needs_authorization: "both",
      wallet_loading: "both",
      funding_insufficient: "buy",
      token_insufficient: "sell",
      curve_liquidity_exceeded: "sell",
    },
    N = ({ side: e, blocks: t }) =>
      t.filter((t) => {
        let i = k[t];
        return "both" === i || i === e;
      });
  function S(e) {
    let { side: t, amount: i, token: a, funding: n } = e,
      r = `${(0, s.p)(i.token, 2)} ${a.symbol}`;
    if ("usd" === i.mode) {
      let e = i.typed > 0 ? i.typed : i.usd;
      return "sell" === t && e <= 0 && i.token > 0 ? r : (0, s.w)(e);
    }
    if ("funding" === i.mode) {
      let e = i.typed > 0 ? i.typed : i.funding;
      return "sell" === t && e <= 0 && i.token > 0
        ? r
        : `${(0, s.m)(e, 4)} ${n.symbol}`;
    }
    let l = i.typed > 0 ? i.typed : i.token;
    return `${(0, s.p)(l, 2)} ${a.symbol}`;
  }
  let U = (e) => {
    let { isLoggedIn: t, isSubmitting: i, isTradeInFlight: a, prompt: n } = e;
    return (
      i ||
      a ||
      (t &&
        null === n &&
        (!(({ side: e, amount: t }) =>
          "sell" === e
            ? t.token > 0
            : t.token > 0 || t.funding > 0 || t.typed > 0)(e) ||
          N(e).length > 0))
    );
  };
  function P(e) {
    let a,
      s,
      r,
      l,
      o = (0, i.c)(30),
      { input: d, onSubmit: c, holdRequired: u } = e,
      { t: m } = (0, n.f)();
    o[0] !== d || o[1] !== m
      ? ((a = (function (e, t) {
          let {
              side: i,
              isLoggedIn: a,
              isSubmitting: n,
              isMigrationTrade: s,
              prompt: r,
              amount: l,
              token: o,
              funding: d,
            } = e,
            c = N(e);
          if (c.includes("region_restricted"))
            return t("web.trade.relay_error_region_restricted");
          if (c.includes("asset_refused"))
            return t("web.trade.not_tradeable_on_pump_yet");
          if (c.includes("buy_blocked"))
            return t("coin_details.scam_warning.reasons.cannot_buy");
          if (!a) return t("web.trade.connect_wallet_to_trade");
          if (n)
            return t("buy" === i ? "web.trade.buying" : "web.trade.selling");
          if (c.includes("needs_authorization"))
            return t("web.trade.wallet_not_ready");
          if (c.includes("wallet_loading"))
            return t("web.trade.loading_wallet");
          if ("buy" === i && "add_funds" === r)
            return t("web.trade.add_symbol", { symbol: d.symbol });
          if (c.includes("funding_insufficient"))
            return t("web.trade.insufficient_symbol", { symbol: d.symbol });
          if (c.includes("token_insufficient"))
            return t("web.trade.insufficient_symbol", { symbol: o.symbol });
          if (c.includes("curve_liquidity_exceeded"))
            return t("trade.errors.insufficient_sell_liquidity");
          if (!l.typed && !l.funding && !l.token)
            return t(
              "buy" === i
                ? "web.common.enter_an_amount"
                : "web.trade.enter_amount_to_sell",
            );
          let u = S(e);
          return t(
            s
              ? "buy" === i
                ? "web.trade.migrate_and_buy_amount"
                : "web.trade.migrate_and_sell_amount"
              : "buy" === i
                ? "web.trade.buy_amount"
                : "web.trade.sell_amount",
            { amount: u },
          );
        })(d, m)),
        (o[0] = d),
        (o[1] = m),
        (o[2] = a))
      : (a = o[2]);
    let f = a;
    if (u && d.isLoggedIn && null === d.prompt && !U(d)) {
      let e, i, a, n, s, r, l;
      if (o[3] !== d || o[4] !== m) {
        let t = S(d);
        ((i = "buy" === d.side),
          (e = j.f),
          (a = d.side),
          (n = i
            ? m("web.trade.hold_to_buy_amount", { amount: t })
            : m("web.trade.hold_to_sell_amount", { amount: t })),
          (o[3] = d),
          (o[4] = m),
          (o[5] = e),
          (o[6] = i),
          (o[7] = a),
          (o[8] = n));
      } else ((e = o[5]), (i = o[6]), (a = o[7]), (n = o[8]));
      return (
        o[9] !== i || o[10] !== m
          ? ((s = (e) =>
              i
                ? m("web.trade.holding_buy_countdown", { seconds: e })
                : m("web.trade.holding_sell_countdown", { seconds: e })),
            (o[9] = i),
            (o[10] = m),
            (o[11] = s))
          : (s = o[11]),
        o[12] !== c
          ? ((r = () => void c({ held: !0 })), (o[12] = c), (o[13] = r))
          : (r = o[13]),
        o[14] !== e || o[15] !== a || o[16] !== n || o[17] !== s || o[18] !== r
          ? ((l = (0, t.jsx)(e, {
              side: a,
              idleLabel: n,
              holdingLabel: s,
              onConfirm: r,
              "data-testid": "trade-cta-hold",
            })),
            (o[14] = e),
            (o[15] = a),
            (o[16] = n),
            (o[17] = s),
            (o[18] = r),
            (o[19] = l))
          : (l = o[19]),
        l
      );
    }
    let p = d.side;
    return (
      o[20] !== d ? ((s = U(d)), (o[20] = d), (o[21] = s)) : (s = o[21]),
      o[22] !== c
        ? ((r = () => void c()), (o[22] = c), (o[23] = r))
        : (r = o[23]),
      o[24] !== f ||
      o[25] !== d.isSubmitting ||
      o[26] !== d.side ||
      o[27] !== s ||
      o[28] !== r
        ? ((l = (0, t.jsx)(w.u, {
            side: p,
            isDisabled: s,
            isLoading: d.isSubmitting,
            onClick: r,
            children: f,
          })),
          (o[24] = f),
          (o[25] = d.isSubmitting),
          (o[26] = d.side),
          (o[27] = s),
          (o[28] = r),
          (o[29] = l))
        : (l = o[29]),
      l
    );
  }
  e.s(
    [
      "H",
      0,
      P,
      "z",
      0,
      function (e) {
        let a,
          n,
          s = (0, i.c)(6),
          { state: r, onSubmit: l, guard: o } = e;
        s[0] !== r ? ((a = p(r)), (s[0] = r), (s[1] = a)) : (a = s[1]);
        let d = o?.holdRequired ?? !1;
        return (
          s[2] !== l || s[3] !== a || s[4] !== d
            ? ((n = (0, t.jsx)(P, { input: a, onSubmit: l, holdRequired: d })),
              (s[2] = l),
              (s[3] = a),
              (s[4] = d),
              (s[5] = n))
            : (n = s[5]),
          n
        );
      },
    ],
    743141,
  );
};
