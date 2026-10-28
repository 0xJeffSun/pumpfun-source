// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var l = e.i(445242),
    t = e.i(690877),
    n = e.i(85324),
    s = e.i(211670);
  e.s(
    [
      "f",
      0,
      (e) => {
        let r,
          i,
          u,
          o = (0, l.c)(12),
          { wallet: a, mint: d, enabled: c, refetchInterval: f } = e,
          m = (void 0 === c || c) && !!a && !!d,
          p = (0, n.q)(f, m);
        (o[0] !== d || o[1] !== a
          ? ((r = s.V.token(a, d)), (o[0] = d), (o[1] = a), (o[2] = r))
          : (r = o[2]),
          o[3] !== d || o[4] !== a
            ? ((i = (e) => {
                let { signal: l } = e;
                return (0, s.$)({ wallet: a, mint: d, signal: l });
              }),
              (o[3] = d),
              (o[4] = a),
              (o[5] = i))
            : (i = o[5]));
        let g = 6e4 * (void 0 === f);
        return (
          o[6] !== m || o[7] !== p || o[8] !== r || o[9] !== i || o[10] !== g
            ? ((u = {
                queryKey: r,
                queryFn: i,
                enabled: m,
                refetchInterval: p,
                staleTime: g,
              }),
              (o[6] = m),
              (o[7] = p),
              (o[8] = r),
              (o[9] = i),
              (o[10] = g),
              (o[11] = u))
            : (u = o[11]),
          (0, t.useQuery)(u)
        );
      },
    ],
    175649,
  );
  var r = e.i(814582),
    i = e.i(251397);
  (e.s(
    [
      "f",
      0,
      (e, l) => {
        let t =
            !0 === e.isExited || ((e.amountHeld ?? 0) <= 0 && null != e.pnlUsd),
          n = (0, r.H)(e.realizedPnlUsd) ?? (t ? (0, r.H)(e.pnlUsd) : null),
          s = (0, r.H)(e.amountHeld),
          u = (0, r.H)(e.amountBoughtUsd),
          o = (0, r.H)(e.amountBought),
          a = (0, r.H)(e.costBasisUsd),
          d = (0, r.H)(e.pnlUsd),
          c = (0, r.H)(e.valueUsd),
          f = Date.parse(e.updatedAt ?? ""),
          m =
            t ||
            null != (0, r.C)(s) ||
            null != (0, r.C)(o) ||
            null != (0, r.C)(u) ||
            null != (0, r.C)(a) ||
            null != d ||
            null != n,
          p = t
            ? null
            : null != d && null != n
              ? d - n
              : null != c && null != a
                ? c - a
                : null;
        return {
          source: "cc",
          cursor: {
            slot: (0, i.F)(e.lastSlotIndexId),
            at: Number.isFinite(f) ? f : l,
          },
          amountHeld: s,
          remainingBasisUsd: a,
          remainingBasisTokens: (0, r.H)(e.costBasisAmount),
          realizedUsd: n,
          lifetimeSpentUsd: u,
          lifetimeBoughtTokens: o,
          unrealizedMarkUsd: p,
          hasTransfers: !0 === e.hasTransfers,
          untrustedBasis: !1,
          reportsClosed: t,
          heldBefore: m,
          transitionalZero: t && 0 === n,
        };
      },
    ],
    421906,
  ),
    e.s(
      [
        "f",
        0,
        (e, l) => {
          if (null == e) return "empty";
          let t =
            null != (0, r.C)(e.total_buy_amount) ||
            null != (0, r.C)(e.cost_basis_usd) ||
            null != e.realized_pnl_usd ||
            null != (0, r.C)(e.amount_held) ||
            null != e.unrealized_pnl_usd ||
            !0 === e.has_untrusted_usd_basis;
          if (!t) return "empty";
          let n = (0, r.H)(e.realized_pnl_usd),
            s = (0, r.H)(e.total_buy_amount),
            u =
              null == e.unrealized_pnl_usd &&
              (e.cost_basis_usd ?? 0) <= 0 &&
              (e.amount_held ?? 0) <= 0;
          return {
            source: "v2",
            cursor: { slot: (0, i.F)(e.last_slot_index_id), at: l },
            amountHeld: (0, r.H)(e.amount_held),
            remainingBasisUsd: (0, r.H)(e.cost_basis_usd),
            remainingBasisTokens: (0, r.H)(e.cost_basis_amount),
            realizedUsd: n,
            lifetimeSpentUsd: (0, r.H)(e.total_buy_spend_usd),
            lifetimeBoughtTokens: s,
            unrealizedMarkUsd: (0, r.H)(e.unrealized_pnl_usd),
            hasTransfers: !0 === e.has_transfers,
            untrustedBasis: !0 === e.has_untrusted_basis,
            untrustedUsdBasis: !0 === e.has_untrusted_usd_basis,
            reportsClosed: u,
            heldBefore: t,
            transitionalZero: u && 0 === n,
          };
        },
      ],
      311872,
    ));
  var u = e.i(250311);
  e.s(
    [
      "f",
      0,
      (e, l) =>
        null != e && (e.hasBuys || e.hasSells)
          ? {
              source: "walk",
              cursor: { slot: null, at: l },
              amountHeld: (0, r.H)(e.remainingTokens),
              remainingBasisUsd: (0, r.H)(e.remainingCostBasisUSD),
              remainingBasisTokens: (0, r.H)(e.remainingTokens),
              realizedUsd: (0, r.H)(e.realizedUSD),
              lifetimeSpentUsd: (0, r.C)(e.totalBuysUSD),
              lifetimeBoughtTokens: (0, r.C)(e.totalBuysTokens),
              unrealizedMarkUsd: null,
              hasTransfers: !1,
              untrustedBasis: !0,
              reportsClosed: (0, u.t)(e),
              heldBefore: e.hasBuys,
              transitionalZero: !1,
            }
          : "empty",
    ],
    943141,
  );
};
