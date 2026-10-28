// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(464649),
    n = e.i(656846),
    r = e.i(880783),
    i = e.i(228935),
    a = e.i(449597);
  let s = { asset: "sol", symbol: "SOL", decimals: a.K, imageUri: t.T.solana },
    l = {
      asset: "usdc",
      symbol: "USDC",
      decimals: a.J,
      imageUri: n.f.imageUri,
    },
    o = /^(\d*)(?:\.(\d*))?$/,
    u = /^\d*\.?\d*$/;
  e.s([
    "Z",
    0,
    "usdc",
    "S",
    0,
    [25, 50, 75, 100],
    "D",
    0,
    "external",
    "M",
    0,
    () => ({
      mint: a.X,
      name: "Solana",
      symbol: "SOL",
      description: "",
      image_uri: t.T.solana,
      video_uri: null,
      metadata_uri: "",
      bonding_curve: "",
      associated_bonding_curve: "",
      creator: "",
      created_timestamp: null,
      raydium_pool: null,
      complete: !0,
      virtual_sol_reserves: 0,
      virtual_token_reserves: 0,
      total_supply: 0,
      show_name: !0,
      market_cap: 0,
      usd_market_cap: 0,
      nsfw: !1,
      is_banned: !1,
      hide_banner: !1,
      is_currently_live: !1,
      livestream_ban_expiry: 0,
      program: r.u,
      platform: "non_launchpad",
      base_decimals: a.K,
      quote_mint: n.f.mint,
      has_external_swap_route: !0,
    }),
    "E",
    0,
    (e, t) => (0, i.f)(e, t),
    "R",
    0,
    (e) => ("usdc" === e ? "usdc_to_sol" : "sol_to_usdc"),
    "T",
    0,
    (e) =>
      "usdc_to_sol" === e
        ? { from: l, to: s, isBuy: !0 }
        : { from: s, to: l, isBuy: !1 },
    "k",
    0,
    (e) => ("usdc_to_sol" === e ? "sol_to_usdc" : "usdc_to_sol"),
    "e",
    0,
    (e, t) => {
      if (e <= BigInt(0)) return "";
      let n = e.toString().padStart(t + 1, "0"),
        r = n.slice(0, n.length - t),
        i = n.slice(n.length - t).replace(/0+$/, "");
      return i ? `${r}.${i}` : r;
    },
    "c",
    0,
    (e) => u.test(e),
    "m",
    0,
    (e) => e === a.X,
    "n",
    0,
    (e, t) => {
      let n = o.exec(e.trim());
      if (!n) return null;
      let [, r = "", i = ""] = n;
      return "" === r && "" === i
        ? null
        : BigInt(`${r || "0"}${i.slice(0, t).padEnd(t, "0")}`);
    },
    "i",
    0,
    (e, t) => (e * BigInt(t)) / BigInt(100),
  ]);
};
