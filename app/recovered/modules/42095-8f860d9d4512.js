// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(289515),
    n = e.i(449597);
  let i = "So11111111111111111111111111111111111111112";
  function l(e, t) {
    let n = e?.last_trade_timestamp;
    return (
      "number" == typeof n &&
      !!Number.isFinite(n) &&
      !(n <= 0) &&
      !!Number.isFinite(t) &&
      !(t <= 0) &&
      t - n > 6048e5
    );
  }
  function r(e, t) {
    let n = t?.priceUsd;
    return (
      "number" == typeof n &&
      n > 0 &&
      (t?.lastTradeTimestamp ?? 0) >= e.fetchedAt - 12e4
    );
  }
  let a = (e) => {
      let n = "string" == typeof e.token_name ? e.token_name : "",
        i = "string" == typeof e.token_symbol ? e.token_symbol : "";
      if (n.trim() && i.trim()) return { name: n, symbol: i };
      let l = (0, t.w)({
        token_mint: "string" == typeof e.token_mint ? e.token_mint : "",
        network_id: e.network_id,
        token_name: n,
        token_symbol: i,
      });
      return {
        name: n.trim() ? n : l.name.trim() || "Unknown",
        symbol: i.trim() ? i : l.symbol.trim() || i,
      };
    },
    u = (e) =>
      "number" == typeof e && Number.isFinite(e) ? e.toString() : "0",
    o = (e) => "number" == typeof e?.usd && Number.isFinite(e.usd),
    s = (e) => {
      if (!0 === e.has_untrusted_usd_basis) return !1;
      let t = e.unrealized;
      if (!t || (0 !== t.amount_held && !o(t.pnl))) return !1;
      let n = e.realized;
      return !n || o(n.pnl);
    };
  e.s([
    "o",
    0,
    0.01,
    "v",
    0,
    i,
    "X",
    0,
    (e, t) => {
      if (!t) return e;
      if (!s(t)) {
        let n = t.unrealized?.cost_basis?.usd,
          i =
            !0 !== t.has_untrusted_usd_basis &&
            "number" == typeof n &&
            Number.isFinite(n)
              ? n
              : void 0;
        if (!e.pnl && e.costBasisUsd === i) return e;
        let { costBasisUsd: l, ...r } = e;
        return void 0 === i
          ? { ...r, pnl: void 0 }
          : { ...r, pnl: void 0, costBasisUsd: i };
      }
      let { unrealized: n, realized: i } = t,
        l = n.pnl?.usd ?? 0,
        r = i?.pnl?.usd ?? 0,
        a = l + r,
        o = n.cost_basis?.usd ?? 0,
        d = o + (i?.total_in?.usd ?? 0),
        c = d > 0 ? u((a / d) * 100) : u(n.percentage?.usd);
      return {
        ...e,
        pnl: {
          realized_pnl: { percent: u(i?.percentage?.usd), usd: r },
          unrealized_pnl: { percent: u(n.percentage?.usd), usd: l },
          total_pnl: { percent: c, usd: a },
          total_usd_in: o,
          total_usd_out: 0,
        },
      };
    },
    "f",
    0,
    function (e, t = !1) {
      return (e ?? []).filter((e) =>
        (function (e, t = !1) {
          return (
            e.mint !== i &&
            !(t && (0, n.Y)(e.mint)) &&
            e.balance > 0 &&
            (Number(e.balanceUSD) || 0) >= 0.01
          );
        })(e, t),
      );
    },
    "R",
    0,
    (e) => {
      if (e && void 0 !== e.page && void 0 !== e.totalPages)
        return e.page < e.totalPages ? e.page + 1 : void 0;
    },
    "_",
    0,
    r,
    "I",
    0,
    l,
    "u",
    0,
    ({ coins: e, batchByMint: t }) => {
      let n = [];
      for (let i of e) {
        let e = t.get(i.mint),
          l = e?.unrealized;
        if (!e || !l || !(l.amount_held > 0)) continue;
        let r = l.amount_held,
          u = l.cost_basis?.usd,
          o = l.pnl?.usd,
          d = s(e) && null != u && null != o,
          c = d ? u + o : 0,
          f = i.usd_market_cap ?? i.market_cap ?? 0,
          p = a({
            token_mint: i.mint,
            token_name: i.name,
            token_symbol: i.symbol,
          });
        n.push({
          mint: i.mint,
          balance: r,
          price: d && r > 0 ? c / r : 0,
          fetchedAt: Date.now(),
          balanceUSD: c,
          ...(d ? {} : { quoteUnavailable: !0 }),
          coin: {
            mint: i.mint,
            name: p.name,
            symbol: p.symbol,
            image_uri: "string" == typeof i.image_uri ? i.image_uri : "",
            creator: "string" == typeof i.creator ? i.creator : "",
            is_banned: i.is_banned,
            market_cap: f,
            usd_market_cap: f,
          },
        });
      }
      return n;
    },
    "r",
    0,
    function (e, t) {
      return r(e, t) ? t.priceUsd * e.balance : Number(e.balanceUSD) || 0;
    },
    "S",
    0,
    (e) => {
      let { name: t, symbol: n } = a(e),
        i = "string" == typeof e.token_image ? e.token_image : "",
        l = "string" == typeof e.token_creator ? e.token_creator : "",
        r =
          "number" == typeof e.token_price
            ? e.token_price
            : Number(e.token_price ?? 0),
        u = "number" == typeof e.balance ? e.balance : Number(e.balance ?? 0),
        o = "number" == typeof e.value ? e.value : Number(e.value ?? 0),
        s =
          "number" == typeof e.usd_market_cap
            ? e.usd_market_cap
            : Number(e.usd_market_cap ?? 0),
        d =
          null === e.network_id || void 0 === e.network_id
            ? void 0
            : String(e.network_id),
        c = e.tokenPnL,
        f = c?.unrealized_usd,
        p = c?.percentage_usd ?? c?.percentage,
        m = c?.realized_pnl_usd,
        h = null != c && (null != f || null != p || (null != m && 0 !== m)),
        b = null != p && Number.isFinite(p) ? p.toString() : "0";
      return {
        mint: e.token_mint,
        ...(d ? { chainId: d } : {}),
        balance: u,
        price: r,
        fetchedAt: Date.now(),
        balanceUSD: o,
        coin: {
          mint: e.token_mint,
          name: t,
          symbol: n,
          image_uri: i,
          creator: l,
          market_cap: s,
          usd_market_cap: s,
        },
        pnl: h
          ? {
              realized_pnl: { percent: "0", usd: m ?? 0 },
              unrealized_pnl: { percent: b, usd: f ?? 0 },
              total_pnl: { percent: b, usd: (f ?? 0) + (m ?? 0) },
              total_usd_in: c?.cost_basis_usd ?? 0,
              total_usd_out: 0,
            }
          : void 0,
      };
    },
    "p",
    0,
    function (e, t) {
      let n = 0;
      for (let i of e ?? [])
        l(t.get(i.mint), i.fetchedAt) || (n += Number(i.balanceUSD) || 0);
      return n;
    },
  ]);
};
