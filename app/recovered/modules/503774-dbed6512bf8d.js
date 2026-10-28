// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(541710),
    r = e.i(646908),
    n = e.i(668487),
    i = e.i(605587);
  let a = (e) => ("number" == typeof e && Number.isFinite(e) ? e : void 0),
    l = (e) => !0 === e || ("string" == typeof e && e.length > 0);
  function o(e) {
    let t = (0, i.N)({ mint: e.m, chainId: e.c }),
      r = (e) => {
        let r = a(e);
        return t && !r ? void 0 : r;
      },
      n = !t && (a(e.nh) ?? 0) > 0 && !a(e.t10);
    return {
      volumeUsd24h: e.vUsd24h && e.vUsd24h > 0 ? a(e.vUsd24h) : void 0,
      bondingCurveProgress: (e.gd ?? 0) > 0 ? 100 : a(e.p),
      numHolders: r(e.nh),
      buyTxCount: a(e.bc),
      sellTxCount: a(e.sc),
      totalTxCount: a(e.txc),
      topTenHoldersPct: n ? void 0 : r(e.t10),
      creatorAllocationPct: n ? void 0 : r(e.dh),
      sniperPct: a(e.so),
      bundlerPct: a(e.bo),
      totalFeesSol: r(e.tf),
      isHot: !0 === e.ih,
      hasTwitter: l(e.tw),
      hasWebsite: l(e.ws),
      hasTelegram: l(e.tg),
    };
  }
  let s = new Map();
  function d(e, l = {}) {
    let o,
      u = ((e, t) => {
        if ("number" != typeof e.age || !Number.isFinite(e.age)) return null;
        let r = t - 1e3 * e.age,
          n = e.m;
        if (!n) return r;
        let i = s.get(n);
        if (void 0 !== i && 6e4 > Math.abs(i - r)) return i;
        if (s.size >= 4e3) {
          let e = s.keys().next().value;
          void 0 !== e && s.delete(e);
        }
        return (s.delete(n), s.set(n, r), r);
      })(e, l.nowMs ?? (0, n.t)()),
      c = (0, i.N)({ mint: e.m ?? "", chainId: e.c }),
      p = {
        mint: e.m ?? "",
        name: e.n ?? "",
        symbol: e.t ?? "",
        image_uri: e.i ?? "",
        usd_market_cap: "number" == typeof e.mc ? e.mc : 0,
        created_timestamp: u,
        complete: (e.gd ?? 0) > 0,
        platform: e.pl,
        creator: e.dw ?? "",
        is_currently_live: !0 === e.lv,
        description: e.desc ?? "",
        video_uri: e.vid ?? "",
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
        program: (function ({ pg: e, isEvm: t, board: r }) {
          switch (e) {
            case "pump":
            case "meteora_dbc":
            case "raydium_launchpad":
            case "raydium_launchpad_bonk":
            case "loadout":
            case "meme_fun":
            case "stonkfun":
            case "raydium_cpmm":
              return e;
            case void 0:
            case "":
            case "pump_amm":
              return "pump";
            default:
              return t || "trending" !== r ? "pump" : "non_launchpad";
          }
        })({ pg: e.pg, isEvm: c, board: l.board }),
        board_program: e.pg ?? "",
        holder_count: (({ nh: e, isEvm: t }) => {
          let r = a(e);
          return t && !r ? void 0 : r;
        })({ nh: e.nh, isEvm: c }),
        raydium_pool: "",
        show_name: !0,
        total_supply: 0,
        virtual_sol_reserves: 0,
        virtual_token_reserves: 0,
      };
    return (
      !0 === e.ic && (p.is_charity = !0),
      !0 === e.hr && (p.is_holder_reward = !0),
      e.rid && (p.rec_id = e.rid),
      void 0 !== l.servedRank && (p.rec_rank = l.servedRank),
      e.ms && (p.mayhem_state = e.ms),
      !0 === e.mp && (p.mayhem_is_multiplayer = !0),
      ((0, i.g)(e.c) || (0, r.L)(e.c) || null != (0, t.T)(e.c)) &&
        (p.chain_id = e.c),
      e.pg && c && (p.protocol = e.pg),
      e.lp && (p.board_launchpad = e.lp),
      void 0 !== e.fh &&
        (p.followed_holders =
          null === (o = e.fh)
            ? null
            : {
                totalCount: o.totalCount,
                holders: o.holders.map((e) => ({
                  ...e,
                  verifiedBadgeVisible: e.verifiedBadgeVisible ?? !0,
                  walletAddress: e.walletAddress ?? null,
                })),
              }),
      p
    );
  }
  e.s([
    "H",
    0,
    (e) => {
      let t = e.pl || void 0;
      return (0, i.N)({ mint: e.m ?? "", chainId: e.c })
        ? { protocol: e.pg || void 0, platform: t }
        : {
            program: "pump_amm" === e.pg ? "pump" : e.pg || void 0,
            platform: t,
          };
    },
    "J",
    0,
    function (e, t) {
      return { coin: d(e, t), stats: o(e) };
    },
    "q",
    0,
    function (e, t) {
      if (!e || !Array.isArray(e.entries)) return [];
      let r =
        "number" == typeof e?.serverTs &&
        Number.isFinite(e.serverTs) &&
        e.serverTs > 0
          ? e.serverTs
          : void 0;
      return e.entries.map((n, i) =>
        d(n, {
          nowMs: r,
          board: e.board,
          servedRank: void 0 === t ? void 0 : t + i + 1,
        }),
      );
    },
    "Z",
    0,
    function (e) {
      let t = {};
      if (!e || !Array.isArray(e.entries)) return t;
      for (let r of e.entries)
        "string" == typeof r?.m && r.m.length > 0 && (t[r.m] = o(r));
      return t;
    },
    "t",
    0,
    (e) =>
      void 0 === e || (null == e.volumeUsd24h && (e.totalTxCount ?? 0) > 0),
    "$",
    0,
    (e) => {
      for (let t of e) {
        let e = t.created_timestamp;
        if (
          !(!t.mint || s.has(t.mint)) &&
          "number" == typeof e &&
          Number.isFinite(e) &&
          !(e <= 0)
        ) {
          if (s.size >= 4e3) {
            let e = s.keys().next().value;
            void 0 !== e && s.delete(e);
          }
          s.set(t.mint, e);
        }
      }
    },
  ]);
};
