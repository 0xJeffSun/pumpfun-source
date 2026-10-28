// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var l = e.i(814582);
  let t = (e, t, n) =>
      Math.max(
        "number" == typeof e && Number.isInteger(e) && e >= 0 ? 10 ** -e : 0,
        1e-9,
        0.001 * Math.max((0, l.C)(t) ?? 0, (0, l.C)(n) ?? 0),
      ),
    n = (e) => {
      if ("string" != typeof e) return null;
      let l = e.trim();
      return 0 === l.length ? null : l.slice(0, 12).padStart(12, "0");
    },
    s = (e, l) => {
      let t = Math.max(e.length, l.length),
        n = e.padStart(t, "0"),
        s = l.padStart(t, "0");
      return n < s ? -1 : +(n > s);
    },
    r = (e, n) => {
      if (e.hasTransfers) return !1;
      let s = (0, l.C)(e.lifetimeBoughtTokens),
        r = e.remainingBasisTokens;
      return null != s && !!(0, l.I)(r) && Math.abs(s - r) <= t(n, s, r);
    },
    i = (e, l, t) => !!e.transitionalZero && (null == l || t - l < 9e4),
    u = (e, l, t) =>
      !!e.reportsClosed &&
      (("cc" === e.source && l - e.cursor.at < 3e4) ||
        i(e, t ?? e.cursor.at, l)),
    o = (e, { exit: n, now: s, transitionalZeroSince: r }) => {
      if ("walk" === e.source || "optimistic" === e.source || !e.reportsClosed)
        return !1;
      let u = !0 === e.untrustedUsdBasis;
      if (
        (!(0, l.I)(e.realizedUsd) && !u) ||
        i(e, n?.at ?? r, s) ||
        ("cc" === e.source &&
          (null != (0, l.C)(e.remainingBasisUsd) ||
            null != (0, l.C)(e.remainingBasisTokens)))
      )
        return !1;
      if (null == n) return !0;
      if (
        ("cc" === e.source &&
          null == e.cursor.slot &&
          e.cursor.at < n.at - 5e3) ||
        (null != n.requiredLifetimeBoughtTokens &&
          null != e.lifetimeBoughtTokens &&
          s - n.at < 6e4 &&
          e.lifetimeBoughtTokens <
            n.requiredLifetimeBoughtTokens -
              t(null, e.lifetimeBoughtTokens, n.requiredLifetimeBoughtTokens))
      )
        return !1;
      let o =
          "cc" === e.source &&
          null != n.ccUpdatedAt &&
          (null == e.cursor.slot) != (null == n.slotCursor),
        a =
          null != e.cursor.slot &&
          (null != n.slotCursor || null == n.ccUpdatedAt || "v2" === e.source),
        d =
          !n.ledgerReportedClosed ||
          (!o &&
            (a
              ? e.cursor.slot !== n.slotCursor
              : "cc" === e.source && e.cursor.at !== n.ccUpdatedAt)),
        c =
          null != n.lifetimeBoughtTokens &&
          null != e.lifetimeBoughtTokens &&
          e.lifetimeBoughtTokens >
            n.lifetimeBoughtTokens +
              t(null, e.lifetimeBoughtTokens, n.lifetimeBoughtTokens);
      return d || c;
    },
    a = (e, n, s) =>
      null == e
        ? null
        : null != n &&
            null != e.amountHeld &&
            !e.hasTransfers &&
            Math.abs(n - e.amountHeld) <= t(s, n, e.amountHeld)
          ? n
          : ((0, l.C)(e.remainingBasisTokens) ?? (0, l.C)(e.amountHeld));
  e.s(
    [
      "W",
      0,
      3e4,
      "A",
      0,
      6e4,
      "w",
      0,
      9e4,
      "B",
      0,
      u,
      "t",
      0,
      s,
      "X",
      0,
      (
        e,
        {
          fill: l = null,
          exit: r = null,
          chainTokens: i,
          decimals: u,
          now: a,
          transitionalZeroSince: d,
        },
      ) => {
        if ("walk" === e.source) return !1;
        let c = n(l?.slot),
          f = e.cursor.slot,
          m = null != c && null != f;
        if (
          null != l &&
          "cc" === e.source &&
          null == f &&
          e.cursor.at < l.at - 5e3
        )
          return !1;
        if (m) return s(f, c) >= 0;
        let p = t(u, i, e.amountHeld),
          g =
            null != r ||
            (null != i && i <= p) ||
            (l?.direction === "sell" &&
              null != l.chainTokensAfter &&
              l.chainTokensAfter <= p);
        return (
          !!(
            !g &&
            null != i &&
            null != e.amountHeld &&
            Math.abs(e.amountHeld - i) <= p
          ) ||
          (!!g && o(e, { exit: r, now: a, transitionalZeroSince: d }))
        );
      },
      "c",
      0,
      o,
      "G",
      0,
      r,
      "T",
      0,
      a,
      "F",
      0,
      n,
      "K",
      0,
      t,
    ],
    251397,
  );
  let d = {
      source: "optimistic",
      cursor: { slot: null, at: 0 },
      amountHeld: 0,
      remainingBasisUsd: 0,
      remainingBasisTokens: 0,
      realizedUsd: 0,
      lifetimeSpentUsd: 0,
      lifetimeBoughtTokens: 0,
      unrealizedMarkUsd: null,
      hasTransfers: !1,
      untrustedBasis: !1,
      reportsClosed: !1,
      heldBefore: !0,
      transitionalZero: !1,
    },
    c = (e, t, n) => ((0, l.I)(e) ? e + t : n ? t : null),
    f = (e, n, s) =>
      n.reduce(
        (e, n) =>
          ((e, n, { priceUsd: s, decimals: i }) => {
            let u;
            if (null != e && e.hasTransfers) return e;
            let o =
              null != (u = (0, l.C)(n.tokens))
                ? u
                : "sell" === n.direction &&
                    e?.amountHeld != null &&
                    null != n.chainTokensAfter
                  ? (0, l.C)(e.amountHeld - n.chainTokensAfter)
                  : null;
            if (null == o) return e;
            let a = ((e, t, n) => {
              let s = (0, l.C)(e.usd);
              if (null != s) return s;
              let r = (0, l.C)(e.priceUsd) ?? (0, l.C)(n);
              return null != r ? t * r : null;
            })(n, o, s);
            if ("buy" === n.direction) {
              let l, t, s;
              return (
                (l = e ?? d),
                (s = (t = null == e) || l.reportsClosed),
                {
                  source: "optimistic",
                  cursor: { slot: l.cursor.slot, at: n.at },
                  amountHeld: s ? o : c(l.amountHeld, o, !1),
                  remainingBasisUsd:
                    null == a ? null : s ? a : c(l.remainingBasisUsd, a, !1),
                  remainingBasisTokens: s
                    ? o
                    : c(l.remainingBasisTokens, o, !1),
                  realizedUsd: l.realizedUsd ?? (t ? 0 : null),
                  lifetimeSpentUsd:
                    null == a ? null : c(l.lifetimeSpentUsd, a, t),
                  lifetimeBoughtTokens: c(l.lifetimeBoughtTokens, o, t),
                  unrealizedMarkUsd: null,
                  hasTransfers: l.hasTransfers,
                  untrustedBasis: l.untrustedBasis,
                  reportsClosed: !1,
                  heldBefore: !0,
                  transitionalZero: !1,
                }
              );
            }
            return null == e
              ? null
              : ((e, n, s, i, u) => {
                  let o = (0, l.C)(e.remainingBasisTokens),
                    a = e.remainingBasisUsd,
                    d = e.realizedUsd ?? (r(e, u) ? 0 : null),
                    c = e.remainingBasisUsd,
                    f = e.remainingBasisTokens;
                  if (null != o && (0, l.I)(a)) {
                    let e = Math.min(s, o),
                      l = (a / o) * e,
                      t = null == i ? null : (e / s) * i;
                    ((d = null != d && null != t ? d + t - l : null),
                      (c = Math.max(0, a - l)),
                      (f = Math.max(0, o - e)));
                  } else
                    ((d = null),
                      null != o && (f = Math.max(0, o - Math.min(s, o))));
                  let m =
                      null == e.amountHeld
                        ? null
                        : Math.max(0, e.amountHeld - s),
                    p = m ?? f,
                    g = t(u, e.amountHeld, o),
                    k = null != p && p <= g;
                  return {
                    ...e,
                    source: "optimistic",
                    cursor: { slot: e.cursor.slot, at: n.at },
                    amountHeld: m,
                    remainingBasisUsd: k && null != c ? 0 : c,
                    remainingBasisTokens: k && null != f ? 0 : f,
                    realizedUsd: d,
                    unrealizedMarkUsd: null,
                    reportsClosed: k,
                    heldBefore: !0,
                    transitionalZero: !1,
                  };
                })(e, n, o, a, i);
          })(e, n, s),
        e,
      );
  e.s(["f", 0, f], 345924);
  let m = { kind: "unresolved" },
    p = { kind: "none" },
    g = { spentUsd: null, avgEntryPriceUsd: null },
    k = (e) =>
      "resolved" === e.status ? e.tokens + (e.offAtaTokens ?? 0) : null,
    h = (e, l) =>
      f(e.ledger, e.pendingFills, {
        priceUsd: l,
        decimals: e.subject.decimals ?? null,
      }),
    y = (e, t, n) => {
      if (!(0, l.I)(e) || null == t) return null;
      let s = Math.max(
        (0, l.C)(t.lifetimeSpentUsd) ?? 0,
        n ? ((0, l.C)(t.remainingBasisUsd) ?? 0) : 0,
      );
      return s > 0 ? Math.max(-100, (e / s) * 100) : null;
    },
    v = (e) => {
      if (null == e || "walk" === e.source) return g;
      let t = (0, l.C)(e.lifetimeSpentUsd),
        n = (0, l.C)(e.lifetimeBoughtTokens);
      if (null != t && null != n)
        return { spentUsd: t, avgEntryPriceUsd: t / n };
      let s = (0, l.C)(e.remainingBasisUsd),
        r = (0, l.C)(e.remainingBasisTokens);
      return null != s && null != r
        ? { spentUsd: s, avgEntryPriceUsd: s / r }
        : { spentUsd: t ?? s, avgEntryPriceUsd: null };
    },
    U = (e, n, { tokens: s, price: i, decimals: u, chainLive: o }) => {
      let d = t(u, s, n?.amountHeld ?? null),
        c = null != n && !(n.reportsClosed && null != s && s > d),
        f = c ? a(n, s, u) : null,
        m = c ? n.remainingBasisUsd : null,
        p = null != f && null != i && null != m && m > 0,
        g = p
          ? f * i - m
          : c && null != n.unrealizedMarkUsd
            ? n.unrealizedMarkUsd
            : null,
        k =
          null == n || "walk" === n.source
            ? null
            : (0, l.I)(n.realizedUsd)
              ? n.realizedUsd
              : r(n, u)
                ? 0
                : null,
        h = null != g && null != k ? g + k : null,
        U =
          null == n
            ? "error" === e.ledgerStatus
              ? "error"
              : "pending"
            : c
              ? "optimistic" === n.source
                ? "optimistic"
                : e.pendingFills.length > 0
                  ? "pending"
                  : "indexed"
              : "pending";
      return {
        kind: "open",
        tokens: s,
        valueUsd: null != s && null != i ? s * i : null,
        netPnlUsd: h,
        pct: y(h, n, !0),
        unrealizedUsd: g,
        realizedUsd: k,
        ...v(n),
        basisStatus: U,
        isLive: o && p,
      };
    },
    T = (e, l, t) =>
      e.pendingFills.some(
        (e) =>
          "sell" === e.direction &&
          null != e.chainTokensAfter &&
          e.chainTokensAfter <= t &&
          e.at > l.at,
      );
  e.s(
    [
      "J",
      0,
      k,
      "i",
      0,
      h,
      "V",
      0,
      (e, { priceUsd: n, now: s }) => {
        let r = (0, l.C)(n),
          i = e.subject.decimals ?? null,
          a = h(e, r),
          { balance: d } = e;
        if ("unresolved" === d.status) return m;
        if ("lost" === d.status) {
          let l = a?.amountHeld ?? null,
            n = t(i, null, l);
          return null != a && null != l && l > n && !a.reportsClosed
            ? U(e, a, { tokens: l, price: r, decimals: i, chainLive: !1 })
            : m;
        }
        let c = k(d) ?? 0,
          f = t(i, c, a?.amountHeld ?? null),
          { tokens: g, fromOverlay: b } = ((e, l, t, n) => {
            let s = { tokens: t, fromOverlay: !1 };
            if (
              l?.source !== "optimistic" ||
              null == l.amountHeld ||
              e.pendingFills.every((e) => null != e.chainTokensAfter)
            )
              return s;
            let r = e.pendingFills
              .map((e) => e.chainTokensAfter)
              .filter((e) => null != e);
            if (
              !(r.length > 0
                ? r.some((e) => Math.abs(t - e) <= n)
                : e.ledger?.amountHeld == null
                  ? t <= n
                  : Math.abs(t - e.ledger.amountHeld) <= n)
            )
              return s;
            let i = 0;
            for (let t of e.pendingFills)
              if (null == t.chainTokensAfter && !T(e, t, n)) {
                if (null == t.tokens)
                  return { tokens: l.amountHeld, fromOverlay: !0 };
                i += "buy" === t.direction ? t.tokens : -t.tokens;
              }
            return { tokens: Math.max(0, t + i), fromOverlay: !0 };
          })(e, a, c, f);
        if (g > f)
          return U(e, a, { tokens: g, price: r, decimals: i, chainLive: !b });
        let B = a?.source === "optimistic" ? a.amountHeld : null;
        if (
          e.pendingFills.some(
            (l) =>
              "buy" === l.direction &&
              null == l.chainTokensAfter &&
              !T(e, l, f),
          ) &&
          !(null != B && B <= f)
        ) {
          let t =
            B ??
            ((e) => {
              for (let t of e.pendingFills)
                if ("buy" === t.direction && null != (0, l.C)(t.tokens))
                  return t.tokens;
              return null;
            })(e);
          return U(e, a, { tokens: t, price: r, decimals: i, chainLive: !1 });
        }
        let A = e.pendingFills.some((e) => "sell" === e.direction);
        if (
          e.sawHeld ||
          null != e.exit ||
          A ||
          a?.heldBefore === !0 ||
          a?.reportsClosed === !0
        ) {
          let l, t, n, r;
          return (
            (l =
              null != a &&
              0 === e.pendingFills.length &&
              o(a, {
                exit: e.exit,
                now: s,
                transitionalZeroSince: e.transitionalZeroSince,
              })),
            (t =
              null != a && null == e.exit && u(a, s, e.transitionalZeroSince)),
            (n = !l || t),
            {
              kind: "closed",
              realizedUsd: (r =
                (l && !t) ||
                (a?.source === "optimistic" &&
                  e.pendingFills.some((e) => "sell" === e.direction))
                  ? a.realizedUsd
                  : null),
              pct: y(r, a, !1),
              ...v(a),
              settling: n,
              lastKnownNetPnlUsd: e.lastKnownNetPnlUsd,
            }
          );
        }
        return e.ledgerEmpty && null == e.ledger ? p : m;
      },
    ],
    83421,
  );
};
