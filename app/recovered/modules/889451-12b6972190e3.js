// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(361284);
  let n = (e) =>
      "number" == typeof e && Number.isFinite(e) && e > 0 ? e : null,
    s = (e) => ("number" == typeof e && Number.isFinite(e) ? e : null),
    i = (e, t) => {
      let s = Math.max(
        (n(t.amountBoughtUsd) ?? 0) + (n(t.receiptBasisUsd) ?? 0),
        t.isExited ? 0 : (n(t.costBasisUsd) ?? 0),
      );
      return s > 0 && Number.isFinite(e) ? Math.max(-100, (e / s) * 100) : null;
    },
    r = (e) =>
      !(!0 !== e.isExited && (e.amountHeld ?? 0) > 0) && null != e.pnlUsd;
  function a(e) {
    if (
      !(function (e) {
        if (!0 === e.hasTransfers) return !1;
        let t = n(e.amountBought),
          i = n(e.costBasisAmount),
          r = s(e.amountHeld);
        return null != t && null != i && null != r && r > 1.001 * t;
      })(e)
    )
      return e;
    let t = e.amountHeld,
      r = e.costBasisAmount,
      a = e.amountBought,
      l = n(e.tokenPriceUsd),
      u = n(e.valueUsd),
      o = l ?? (null != u ? u / t : null),
      d = null != o ? r * o : null,
      p = s(e.costBasisUsd),
      c = Math.abs(a - r) <= 0.001 * a,
      m = s(e.realizedPnlUsd) ?? (c ? 0 : null),
      y = null != d && null != p && null != m ? m + d - p : null,
      f = null != y ? i(y, e) : null;
    return { ...e, amountHeld: r, valueUsd: d, pnlUsd: y, pnlPercentage: f };
  }
  function l(e, t) {
    let [s, i] = t
      ? [n(e.amountBoughtUsd), n(e.amountBought)]
      : [n(e.costBasisUsd), n(e.costBasisAmount)];
    if (null == s || null == i) return null;
    let r = s / i;
    return Number.isFinite(r) ? r : null;
  }
  function u(e) {
    if (!e || !r(e) || !0 === e.hasTransfers) return null;
    let t = n(e.amountBoughtUsd);
    if (null == t) return null;
    let i = s(e.realizedPnlUsd) ?? s(e.pnlUsd);
    if (null == i) return null;
    let a = t - (n(e.costBasisUsd) ?? 0) + i;
    return Number.isFinite(a) && a >= 0 ? a : null;
  }
  function o(e) {
    if (!e || !0 === e.hasTransfers) return null;
    let t = n(e.amountBought);
    if (null == t) return null;
    let s = t - (n(e.costBasisAmount) ?? 0);
    return s <= 1e-6 * t ? 0 : Math.min(1, s / t);
  }
  let d = (e, t, n) =>
    null == e || null == t || 0 === t || n === t ? (e ?? null) : (n / t) * e;
  e.s([
    "i",
    0,
    i,
    "j",
    0,
    function (e, s) {
      if (!e || !0 === e.isExited || null == s || !Number.isFinite(s) || s <= 0)
        return null;
      let i = a(e),
        { amountHeld: r, pnlUsd: u } = i;
      if (null == r || !(r > 0)) return null;
      let p =
          null != i.valueUsd && Number.isFinite(i.valueUsd) && 0 !== i.valueUsd
            ? i.valueUsd
            : null,
        c = null != p && p > 0 ? p / r : null,
        m = null != c && c > 0 ? (u ?? 0) + r * (s - c) : u;
      return null != m && Number.isFinite(m)
        ? {
            positionUsd: r * s,
            netPnlUsd: m,
            displayPct: (0, t.f)(d(i.pnlPercentage, u, m)),
            isClosed: !1,
            spentUsd: n(i.amountBoughtUsd),
            avgEntryPriceUsd: l(i, !1),
            exitProceedsUsd: null,
            soldFraction: o(i),
            receiptBasisUsd: i.receiptBasisUsd ?? null,
            costBasisUsd: i.costBasisUsd ?? null,
            isExited: i.isExited ?? null,
          }
        : null;
    },
    "I",
    0,
    l,
    "T",
    0,
    function (e) {
      if (!e || !0 === e.hasTransfers) return null;
      let t = n(e.amountBoughtUsd),
        i = n(e.amountBought);
      if (null == t || null == i) return null;
      let a = n(e.costBasisUsd) ?? 0,
        l = i - (n(e.costBasisAmount) ?? 0);
      if (l <= 1e-6 * i) return null;
      let u = s(e.realizedPnlUsd) ?? (r(e) ? s(e.pnlUsd) : null);
      if (null == u) return null;
      let o = t - a + u;
      if (!Number.isFinite(o) || o < 0) return null;
      let d = o / l;
      return Number.isFinite(d) && d > 0 ? d : null;
    },
    "c",
    0,
    u,
    "N",
    0,
    a,
    "p",
    0,
    d,
    "y",
    0,
    function (e, s) {
      if (!e) return null;
      let i = a(e),
        r = i.amountHeld ?? 0,
        d = i.pnlUsd ?? null,
        p = !0 !== i.isExited && r > 0;
      if (!p && null == d) return null;
      let c = (0, t.f)(i.pnlPercentage),
        m = n(i.amountBoughtUsd);
      if (!p)
        return {
          positionUsd: null,
          netPnlUsd: d,
          displayPct: c,
          isClosed: !0,
          spentUsd: m,
          avgEntryPriceUsd: l(i, !0),
          exitProceedsUsd: u(i),
          soldFraction: o(i),
          receiptBasisUsd: i.receiptBasisUsd ?? null,
          costBasisUsd: i.costBasisUsd ?? null,
          isExited: i.isExited ?? null,
        };
      let y = null != s && Number.isFinite(s) ? r * s : null;
      return {
        positionUsd:
          (null != i.valueUsd && Number.isFinite(i.valueUsd)
            ? i.valueUsd
            : null) ?? y,
        netPnlUsd: d,
        displayPct: c,
        isClosed: !1,
        spentUsd: m,
        avgEntryPriceUsd: l(i, !1),
        exitProceedsUsd: null,
        soldFraction: o(i),
        receiptBasisUsd: i.receiptBasisUsd ?? null,
        costBasisUsd: i.costBasisUsd ?? null,
        isExited: i.isExited ?? null,
      };
    },
  ]);
};
