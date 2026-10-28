// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(690877),
    r = e.i(613677),
    a = e.i(342463),
    n = e.i(637782),
    s = e.i(866890),
    l = e.i(38279),
    o = e.i(503630),
    c = e.i(449597);
  let m = r.z.object({
      mint: a.z.string(),
      decimals: n.z.number(),
      symbol: a.z.string(),
      ticker: a.z.string(),
      image_url: a.z.string().nullish(),
      minimum_sol_buy: n.z.number().nullish(),
      minimum_usdc_buy: n.z.number().nullish(),
      price_usd: n.z.number().nullish(),
      market_cap_usd: n.z.number().nullish(),
      liquidity_usd: n.z.number().nullish(),
      asset_type: a.z.string().nullish(),
    }),
    d = ["rwa", "native", "stablecoin", "crypto", "meme"];
  async function h() {
    let e = (0, o.e)().replace(/\/+$/, ""),
      t = await fetch(`${e}/supported/coin-create-mints`, {
        signal: AbortSignal.timeout(15e3),
      });
    if (!t.ok) throw Error(`coin-create-mints request failed (${t.status})`);
    return s.z
      .array(m)
      .parse(await t.json())
      .map((e) => {
        let t;
        return {
          mint: e.mint,
          decimals: e.decimals,
          symbol: e.symbol,
          ticker: e.ticker,
          imageUrl: e.image_url ?? void 0,
          minimumSolBuy: e.minimum_sol_buy ?? void 0,
          minimumUsdcBuy: e.minimum_usdc_buy ?? void 0,
          priceUsd: e.price_usd ?? void 0,
          marketCapUsd: e.market_cap_usd ?? void 0,
          liquidityUsd: e.liquidity_usd ?? void 0,
          assetType: ((t = e.asset_type), d.find((e) => e === t)),
        };
      });
  }
  let u = (e) => e.mint !== c.X && !(0, c.Y)(e.mint),
    f = (e) => e.filter(u),
    x = {
      queryKey: l.Q.COIN_CREATE_MINTS,
      queryFn: h,
      staleTime: 0,
      retry: 1,
      refetchOnWindowFocus: !1,
    };
  e.s([
    "u",
    0,
    function (e) {
      let r,
        a = (0, t.c)(2),
        n = e?.enabled ?? !0;
      return (
        a[0] !== n
          ? ((r = { ...x, enabled: n }), (a[0] = n), (a[1] = r))
          : (r = a[1]),
        (0, i.useQuery)(r)
      );
    },
    "s",
    0,
    function () {
      let e,
        r = (0, t.c)(1);
      return (
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = { ...x, select: f }), (r[0] = e))
          : (e = r[0]),
        (0, i.useQuery)(e)
      );
    },
  ]);
};
