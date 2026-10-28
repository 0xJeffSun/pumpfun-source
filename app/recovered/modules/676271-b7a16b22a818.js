// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(690877),
    n = e.i(38279);
  function i(e) {
    return e.data.map(a);
  }
  function a(e) {
    return {
      wallet: e.wallet,
      mint: e.mint,
      unrealized: e.unrealized
        ? {
            costBasis: e.unrealized.cost_basis,
            pnl: e.unrealized.pnl,
            percentage: e.unrealized.percentage,
            amountHeld: e.unrealized.amount_held,
          }
        : null,
      realized: e.realized
        ? {
            pnl: e.realized.pnl,
            percentage: e.realized.percentage,
            avgBuyPrice: e.realized.avg_buy_price,
            avgSellPrice: e.realized.avg_sell_price,
            amountSold: e.realized.amount_sold,
            totalIn: e.realized.total_in,
            totalOut: e.realized.total_out,
          }
        : null,
    };
  }
  let r = {
      totalPnlUsd: null,
      pnlPercent: null,
      unrealizedPnlUsd: null,
      unrealizedPnlPercent: null,
      realizedPnlUsd: null,
      realizedPnlPercent: null,
      costBasisUsd: null,
      heldValueUsd: null,
      avgEntryUsdPerToken: null,
      isLoading: !1,
      isPositionClosed: !1,
    },
    s = (e) => (null != e && Number.isFinite(e) ? e : null);
  function o(e) {
    return [e.wallet, e];
  }
  function d(e) {
    return e.address;
  }
  function u(e) {
    return !e.skipPnl;
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let a,
          c,
          m,
          f,
          p = (0, t.c)(12),
          { mint: h, holders: g } = e;
        p[0] !== g ? ((a = g.filter(u)), (p[0] = g), (p[1] = a)) : (a = p[1]);
        let x = a;
        p[2] !== x ? ((c = x.map(d)), (p[2] = x), (p[3] = c)) : (c = p[3]);
        let b = c;
        p[4] !== h || p[5] !== b
          ? ((m = {
              mint: h,
              holders: b,
              staleTimeMs: 3e4,
              refetchIntervalMs: 3e4,
            }),
            (p[4] = h),
            (p[5] = b),
            (p[6] = m))
          : (m = p[6]);
        let y = (function (e) {
          let a,
            r,
            s,
            o,
            d = (0, t.c)(14),
            {
              mint: u,
              holders: c,
              enabled: m,
              refetchIntervalMs: f,
              staleTimeMs: p,
            } = e,
            h = void 0 !== f && f,
            g = void 0 === p ? 3e5 : p;
          if (d[0] !== c) {
            let e = new Set();
            for (let t of c) t && e.add(t);
            ((a = Array.from(e).sort()), (d[0] = c), (d[1] = a));
          } else a = d[1];
          let x = a;
          d[2] !== u || d[3] !== x
            ? ((r = ["coin", u, "holdersPnl", x]),
              (d[2] = u),
              (d[3] = x),
              (d[4] = r))
            : (r = d[4]);
          let b = r;
          d[5] !== u || d[6] !== x
            ? ((s = async () => {
                if (!u || 0 === x.length) return [];
                let e = `${n.C.PROFILE}/pnl/coin/${encodeURIComponent(u)}/holders`,
                  t = (function (e) {
                    let t = [];
                    for (let l = 0; l < e.length; l += 20)
                      t.push(e.slice(l, l + 20));
                    return t;
                  })(x);
                return (
                  await Promise.all(
                    t.map(async (t) => {
                      let l = await fetch(e, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ holders: t }),
                      });
                      if (!l.ok)
                        throw Error(
                          `Failed to fetch coin holders PnL: ${l.status} ${l.statusText}`,
                        );
                      let n = await l.json();
                      if (!n.success)
                        throw Error("Failed to fetch coin holders PnL data");
                      return n;
                    }),
                  )
                ).flatMap(i);
              }),
              (d[5] = u),
              (d[6] = x),
              (d[7] = s))
            : (s = d[7]);
          let y = !!((void 0 === m || m) && u && x.length > 0);
          return (
            d[8] !== h ||
            d[9] !== g ||
            d[10] !== b ||
            d[11] !== s ||
            d[12] !== y
              ? ((o = {
                  queryKey: b,
                  queryFn: s,
                  enabled: y,
                  staleTime: g,
                  refetchInterval: h,
                  retry: 2,
                }),
                (d[8] = h),
                (d[9] = g),
                (d[10] = b),
                (d[11] = s),
                (d[12] = y),
                (d[13] = o))
              : (o = d[13]),
            (0, l.useQuery)(o)
          );
        })(m);
        if (
          p[7] !== y.data ||
          p[8] !== y.isFetching ||
          p[9] !== y.isPending ||
          p[10] !== g
        ) {
          let e = new Map((y.data ?? []).map(o));
          for (let t of ((f = new Map()), g)) {
            if (t.skipPnl) {
              f.set(t.address, r);
              continue;
            }
            if (void 0 === y.data && (y.isPending || y.isFetching)) {
              f.set(t.address, { ...r, isLoading: !0 });
              continue;
            }
            let l = e.get(t.address);
            if (!l) {
              f.set(t.address, r);
              continue;
            }
            let n = s(l.unrealized?.costBasis.usd),
              i = l.unrealized?.amountHeld ?? 0,
              a = Number.isFinite(i) && i > 0,
              o = !a && null !== l.realized,
              d =
                null != n && n > 0 && Number.isFinite(i) && i > 0
                  ? n / i
                  : null,
              u = s(l.unrealized?.pnl.usd),
              c = s(l.unrealized?.percentage.usd),
              m = s(l.realized?.pnl.usd),
              p = s(l.realized?.percentage.usd),
              h = null != n && null != u ? n + u : null;
            if (null === l.unrealized && null === l.realized) {
              f.set(t.address, {
                ...r,
                costBasisUsd: n,
                heldValueUsd: h,
                avgEntryUsdPerToken: d,
              });
              continue;
            }
            let g =
                (null == u && null == m) || (a && null == u)
                  ? null
                  : (u ?? 0) + (m ?? 0),
              x = o ? p : c;
            f.set(t.address, {
              totalPnlUsd: g,
              pnlPercent: x,
              unrealizedPnlUsd: u,
              unrealizedPnlPercent: c,
              realizedPnlUsd: m,
              realizedPnlPercent: p,
              costBasisUsd: n,
              heldValueUsd: h,
              avgEntryUsdPerToken: d,
              isLoading: !1,
              isPositionClosed: o,
            });
          }
          ((p[7] = y.data),
            (p[8] = y.isFetching),
            (p[9] = y.isPending),
            (p[10] = g),
            (p[11] = f));
        } else f = p[11];
        return f;
      },
    ],
    676271,
  );
};
