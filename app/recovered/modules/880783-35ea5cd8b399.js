// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(997887),
    r = e.i(12345);
  let n = "non_launchpad",
    a = (e) => e.program === n && !e.mint?.startsWith("0x"),
    i = /^\d+(\.\d+)?$/,
    s = (e) =>
      [e.circulatingSupply, e.totalSupply].find(
        (e) => "string" == typeof e && i.test(e) && Number(e) > 0,
      ) ?? null;
  e.s([
    "u",
    0,
    n,
    "H",
    0,
    function (e, a = {}) {
      let i = e.decimals ?? 6,
        o = s(e),
        l = o ? Math.round(Number(o) * 10 ** i) : 0,
        u =
          null != a.usdMarketCap &&
          Number.isFinite(a.usdMarketCap) &&
          a.usdMarketCap > 0
            ? a.usdMarketCap
            : 0,
        d = e.symbol?.trim() ?? "",
        c = e.name?.trim() || d;
      return {
        mint: e.address,
        name: c,
        symbol: d,
        description: e.description ?? "",
        ...((e) => {
          if ("pump" === e.launchpad) {
            let t =
              e.bannerImageUri && !(0, r.e)(e.bannerImageUri)
                ? e.bannerImageUri
                : void 0;
            return {
              image_uri: e.imageUri ?? (0, r.I)(e) ?? "",
              banner_uri: t,
            };
          }
          return {
            image_uri: (0, r.I)(e) ?? "",
            banner_uri: e.bannerImageUri ?? void 0,
          };
        })(e),
        video_uri: null,
        metadata_uri: "",
        twitter: e.twitter ?? void 0,
        telegram: e.telegram ?? void 0,
        website: e.website ?? void 0,
        bonding_curve: "",
        associated_bonding_curve: "",
        creator: e.creatorAddress ?? "",
        created_timestamp: (0, t.i)(e.createdAt),
        updated_at: Date.now(),
        raydium_pool: null,
        complete: !0,
        virtual_sol_reserves: 0,
        virtual_token_reserves: 0,
        total_supply: l,
        show_name: !0,
        market_cap: u,
        usd_market_cap: u,
        nsfw: !1,
        is_banned: !1,
        hide_banner: !1,
        is_currently_live: !1,
        livestream_ban_expiry: 0,
        program: n,
        platform: "non_launchpad",
        base_decimals: i,
        has_external_swap_route: !0,
        is_validated_mint: !0 === e.isValidated,
        is_multichain_fallback: !0,
      };
    },
    "B",
    0,
    a,
    "n",
    0,
    (e) => a(e) && !0 === e.is_multichain_fallback,
    "S",
    0,
    (e, t) => {
      if (null == e || null == t) return 0;
      let r = Number(e);
      if (!Number.isFinite(r) || r <= 0) return 0;
      let n = r * Number(t);
      return Number.isFinite(n) && n > 0 ? n : 0;
    },
    "Q",
    0,
    s,
    "X",
    0,
    (e) => (e && e !== n ? e : void 0),
  ]);
};
