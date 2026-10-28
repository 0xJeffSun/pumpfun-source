// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(793793),
    r = e.i(559015);
  let a = "/api/relay/rpc/stocks";
  class o extends Error {
    status;
    constructor(e) {
      (super(`rpc/stocks failed: ${e}`),
        (this.name = "StocksFeedError"),
        (this.status = e));
    }
  }
  let i = (e) =>
    e ? `${a}?includeFollowedHolders=true&followedHoldersLimit=${r.A}` : a;
  async function n({ includeFollowedHolders: e = !1, signal: r } = {}) {
    let a = new AbortController(),
      s = () => a.abort();
    r?.aborted ? s() : r?.addEventListener("abort", s, { once: !0 });
    let l = setTimeout(s, 1e4);
    try {
      let r = await fetch(i(e), {
        method: "GET",
        credentials: "include",
        headers: { accept: "application/json" },
        signal: a.signal,
      });
      if (!r.ok) throw new o(r.status);
      let n = await r.json();
      if (!n || !Array.isArray(n.rows))
        throw Error("rpc/stocks: malformed body");
      let s = (0, t.f)(r.headers.get("cache-control"));
      return {
        rows: n.rows,
        asOf: "string" == typeof n.asOf ? n.asOf : "",
        ...(void 0 === s ? {} : { maxAgeMs: s }),
      };
    } finally {
      (clearTimeout(l), r?.removeEventListener("abort", s));
    }
  }
  let s = (e) => ("number" == typeof e && Number.isFinite(e) ? e : null),
    l = (e) => {
      let t = s(e);
      return null !== t && t > 0 ? t : null;
    };
  function d(e) {
    if (!e || !Array.isArray(e.rows)) return [];
    let t = [];
    for (let r of e.rows)
      "string" == typeof r?.mint &&
        0 !== r.mint.length &&
        t.push({
          coin: {
            ...(void 0 !== r.followedHolders
              ? { followed_holders: r.followedHolders }
              : {}),
            mint: r.mint,
            name: r.name ?? r.symbol ?? r.underlyingSymbol,
            symbol: r.underlyingSymbol,
            image_uri: r.imageUri ?? "",
            usd_market_cap: l(r.tokenMarketCapUsd) ?? 0,
            created_timestamp: null,
            complete: !1,
            creator: "",
            is_currently_live: !1,
            description: "",
            video_uri: "",
            associated_bonding_curve: "",
            bonding_curve: "",
            hidden: null,
            hide_banner: !1,
            is_banned: !1,
            last_trade_timestamp: null,
            livestream_ban_expiry: 0,
            market_cap: 0,
            metadata_uri: "",
            nsfw: !1,
            program: "pump",
            raydium_pool: "",
            show_name: !0,
            total_supply: 0,
            virtual_sol_reserves: 0,
            virtual_token_reserves: 0,
          },
          priceUsd: l(r.priceUsd),
          priceChange24hPct: s(r.priceChange24hPct),
          assetClass: r.assetClass,
          underlyingMarketCapUsd: l(r.underlyingMarketCapUsd),
        });
    return t;
  }
  e.s([
    "J",
    0,
    3e4,
    "r",
    0,
    2e4,
    "d",
    0,
    o,
    "X",
    0,
    n,
    "N",
    0,
    d,
    "K",
    0,
    (e) => d(e).map((e) => ({ ...e.coin, program: "non_launchpad" })),
    "m",
    0,
    i,
  ]);
};
