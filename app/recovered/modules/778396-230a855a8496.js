// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    r = e.i(78436),
    n = e.i(90832),
    i = e.i(460261);
  let l = (e, t) =>
      !!e &&
      !!Number.isFinite(e.shownLossPercent) &&
      null !== t.impactPercent &&
      -t.impactPercent <= e.shownLossPercent + 15,
    a = (e, r, n, i) => {
      t.y.warn(`[${e}] held_consent_covered_impact`, {
        trade_direction: r,
        shown_loss_percent: i.shownLossPercent,
        tolerance_pp: 15,
        value_lost_percent: n.impactPercent,
        value_lost_usd: n.valueLostUsd,
        impact_source: n.impactSource,
        past_ceiling: n.isPastCeiling,
      });
    },
    s = (e) => {
      if (null == e) return null;
      let t = Number(e);
      return Number.isFinite(t) ? t : null;
    },
    o = (e, t, r) => {
      if (null == e) return null;
      let n = Number(e);
      return !Number.isFinite(n) || n < 0 ? null : (n / 10 ** t) * r;
    };
  function u(e, t) {
    let r,
      n,
      i,
      l,
      a,
      u = s(e.fromAmountUsd),
      d = s(e.toAmountUsd),
      c = null !== u && null !== d && u > 0,
      m = c ? ((d - u) / u) * 100 : null,
      p = t?.spotReference,
      f = null,
      _ = null;
    if (t && p && p.tokenUsdPrice > 0 && p.settlementUsdPrice > 0) {
      let r = (e) => o(e, p.tokenDecimals, p.tokenUsdPrice),
        n = (e) => o(e, p.settlementDecimals, p.settlementUsdPrice);
      ((f = "buy" === t.direction ? n(e.fromAmount) : r(e.fromAmount)),
        (_ = "buy" === t.direction ? r(e.toAmount) : n(e.toAmount)));
    }
    let v = null !== f && null !== _ && f > 0 ? ((_ - f) / f) * 100 : null,
      g = null !== v,
      h = p?.observedAtMs,
      w = t?.nowMs,
      y =
        "number" == typeof h &&
        Number.isFinite(h) &&
        h > 0 &&
        "number" == typeof w &&
        Number.isFinite(w) &&
        w > 0
          ? w - h
          : null,
      b = null !== y && y <= 6e5,
      S = g && !b,
      A = 0 === d,
      x = null !== m && null !== v && Math.abs(m - v) > 25,
      U = S && (!c || A);
    g && b && (!c || A || x)
      ? ((r = v),
        (n = null !== _ && null !== f ? _ - f : null),
        (i = f),
        (l = _),
        (a = "app_spot"))
      : (U
          ? ((r = null),
            (n = null),
            (i = null !== u && u > 0 ? u : null),
            (l = null))
          : ((r = s(e.totalImpactPercent)),
            (n = s(e.totalImpactUsd)),
            (null === r || null === n) && c && ((r ??= m), (n ??= d - u)),
            (i = u),
            (l = d)),
        (a = "relay_usd"));
    let P = null !== r && null !== n && r <= -30 && -n >= 1,
      E = P && null !== r && r <= -40;
    return {
      isExtreme: P,
      isPastCeiling: E,
      isWarn: U || (null !== r && null !== n && r <= -12 && -n >= 2),
      impactPercent: r,
      valueLostUsd: n,
      fromAmountUsd: i,
      toAmountUsd: l,
      impactSource: a,
      relayQuotedLostPercent: m,
      spotReferenceAgeMs: y,
      spotStale: S,
    };
  }
  let d = (e, r, n) => {
    t.y.warn(`[${e}] proactive_price_impact_gate`, {
      trade_direction: r,
      value_lost_percent: n.impactPercent,
      value_lost_usd: n.valueLostUsd,
      impact_source: n.impactSource,
      relay_quoted_lost_percent: n.relayQuotedLostPercent,
      spot_reference_age_ms: n.spotReferenceAgeMs,
      spot_stale: n.spotStale,
    });
  };
  function c(e, t) {
    let r = u(e, { direction: t.direction, nowMs: t.nowMs });
    if (
      null !== r.fromAmountUsd &&
      r.fromAmountUsd > 0 &&
      null !== r.toAmountUsd &&
      r.toAmountUsd > 0
    )
      return r;
    let n = u(e, t);
    return null !== n.fromAmountUsd && null !== n.toAmountUsd ? n : null;
  }
  let m = (e, r, n) => {
    t.y.warn(`[${e}] relay_impact_ceiling_refused`, {
      trade_direction: r,
      ceiling_percent: -40,
      value_lost_percent: n.impactPercent,
      value_lost_usd: n.valueLostUsd,
      from_amount_usd: n.fromAmountUsd,
      to_amount_usd: n.toAmountUsd,
      impact_source: n.impactSource,
      relay_quoted_lost_percent: n.relayQuotedLostPercent,
    });
  };
  class p extends Error {
    constructor() {
      super("Price impact confirmation declined");
    }
  }
  class f extends p {
    assessment;
    direction;
    constructor({ assessment: e, direction: t, message: r }) {
      (super(),
        (this.name = "ImpactCeilingRefusedError"),
        (this.message = r),
        (this.assessment = e),
        (this.direction = t));
    }
  }
  let _ = ({ assessment: e, coinSymbol: t, t: r }) => {
      let i = `${Math.abs(e.impactPercent ?? -40).toFixed(1)}%`,
        l = `${Math.abs(-40)}%`;
      return null !== e.fromAmountUsd && null !== e.toAmountUsd
        ? r("web.trade.sell_impact_ceiling_description", {
            symbol: t,
            from_amount: (0, n.w)(e.fromAmountUsd),
            to_amount: (0, n.w)(e.toAmountUsd),
            impact: i,
            limit: l,
          })
        : r("web.trade.sell_impact_ceiling_description_no_figures", {
            symbol: t,
            impact: i,
            limit: l,
          });
    },
    v = (0, r.$)((e, t) => ({
      request: null,
      resolve: null,
      ask: (r) =>
        t().resolve
          ? Promise.resolve(!1)
          : new Promise((t) => {
              e({ request: r, resolve: t });
            }),
      settle: (r) => {
        let { resolve: n } = t();
        (e({ request: null, resolve: null }), n?.(r));
      },
    }));
  async function g({
    direction: e,
    coinSymbol: r,
    chainId: n,
    fetchQuote: s,
    spotReference: o,
    nowMs: h,
    t: w,
    ask: y = (e) => v.getState().ask(e),
    impactConsent: b = null,
  }) {
    let S = await s(!1),
      A = h ?? Date.now(),
      x = "sell" === e,
      U = (t) => {
        throw (
          m("resolveQuoteWithImpactGate", e, t),
          new f({
            assessment: t,
            direction: e,
            message: _({ assessment: t, coinSymbol: r, t: w }),
          })
        );
      };
    if ("error" === S.kind) {
      if ("SWAP_IMPACT_TOO_HIGH" !== S.reason)
        throw new i.X((0, i.s)(S, { chainId: n, t: w }), {
          reason: S.reason,
          status: S.status,
        });
      let u = () =>
          new i.X((0, i.s)(S, { chainId: n, t: w }), {
            reason: S.reason,
            status: S.status,
          }),
        m = await s(!0);
      if ("error" === m.kind) throw u();
      let f = c(m.data, { direction: e, spotReference: o, nowMs: A });
      if (null === f)
        throw (
          t.y.warn("[resolveQuoteWithImpactGate] override_requote_unpriced", {
            trade_direction: e,
          }),
          u()
        );
      let _ = null !== b && l(b, f);
      if ((x && f.isPastCeiling && !_ && U(f), _ && b))
        return (
          a("resolveQuoteWithImpactGate", e, f, b),
          { quote: m.data, overridePriceImpact: !0 }
        );
      if (
        (d("resolveQuoteWithImpactGate", e, f),
        !(await y({ coinSymbol: r, direction: e, assessment: f })))
      )
        throw new p();
      return { quote: m.data, overridePriceImpact: !0 };
    }
    let P = u(S.data, { direction: e, spotReference: o, nowMs: A }),
      E = null !== b && l(b, P);
    if ((x && P.isPastCeiling && !E && U(P), P.isExtreme || P.isWarn)) {
      if (E && b)
        return (
          a("resolveQuoteWithImpactGate", e, P, b),
          { quote: S.data, overridePriceImpact: !0 }
        );
      if (
        (d("resolveQuoteWithImpactGate", e, P),
        !(await y({ coinSymbol: r, direction: e, assessment: P })))
      )
        throw new p();
      return { quote: S.data, overridePriceImpact: !0 };
    }
    return { quote: S.data, overridePriceImpact: !1 };
  }
  e.s([
    "h",
    0,
    -40,
    "H",
    0,
    f,
    "l",
    0,
    p,
    "y",
    0,
    6e5,
    "B",
    0,
    c,
    "q",
    0,
    u,
    "t",
    0,
    l,
    "d",
    0,
    _,
    "Q",
    0,
    a,
    "r",
    0,
    m,
    "I",
    0,
    d,
    "n",
    0,
    g,
    "w",
    0,
    v,
  ]);
};
