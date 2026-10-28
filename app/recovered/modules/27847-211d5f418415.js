// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = ["ping", "pop", "chime", "zap", "knock"];
  e.s(
    [
      "Y",
      0,
      t,
      "S",
      0,
      { ping: "Ping", pop: "Pop", chime: "Chime", zap: "Zap", knock: "Knock" },
      "n",
      0,
      {
        ping: [
          {
            type: "sine",
            from: 880,
            to: 1320,
            at: 0,
            duration: 0.18,
            gain: 0.14,
          },
        ],
        pop: [
          {
            type: "triangle",
            from: 520,
            to: 160,
            at: 0,
            duration: 0.12,
            gain: 0.2,
          },
        ],
        chime: [
          {
            type: "sine",
            from: 660,
            to: 660,
            at: 0,
            duration: 0.25,
            gain: 0.11,
          },
          {
            type: "sine",
            from: 990,
            to: 990,
            at: 0.09,
            duration: 0.3,
            gain: 0.09,
          },
        ],
        zap: [
          {
            type: "sawtooth",
            from: 1400,
            to: 220,
            at: 0,
            duration: 0.14,
            gain: 0.08,
          },
        ],
        knock: [
          {
            type: "square",
            from: 190,
            to: 130,
            at: 0,
            duration: 0.07,
            gain: 0.16,
          },
          {
            type: "square",
            from: 190,
            to: 130,
            at: 0.12,
            duration: 0.07,
            gain: 0.16,
          },
        ],
      },
      "_",
      0,
      2500,
      "a",
      0,
      (e) => "string" == typeof e && t.includes(e),
    ],
    27847,
  );
  let a = ["traders", "earners", "squads"],
    i = "traders",
    n = (e) => "string" == typeof e && a.includes(e);
  e.s(
    [
      "p",
      0,
      i,
      "z",
      0,
      a,
      "q",
      0,
      {
        traders: "web.screeners.leaderboard_traders",
        earners: "web.screeners.leaderboard_earners",
        squads: "web.screeners.leaderboard_squads",
      },
      "K",
      0,
      n,
    ],
    699738,
  );
  let r = ["new", "graduating", "graduated", "movers"],
    l = "trending",
    s = [...r, l],
    o = "movers",
    d = (e) => "string" == typeof e && s.includes(e);
  e.s(
    [
      "b",
      0,
      o,
      "M",
      0,
      r,
      "B",
      0,
      s,
      "N",
      0,
      {
        new: "common.new",
        graduating: "advanced_search.tabs.soon",
        graduated: "advanced_search.tabs.graduated",
        movers: "home.movers.title",
        trending: "web.common.trending",
      },
      "c",
      0,
      l,
      "y",
      0,
      d,
    ],
    894327,
  );
  let u = { movers: { is: d, default: o }, leaderboard: { is: n, default: i } };
  e.s(
    [
      "X",
      0,
      (e, t) => {
        let a = u[e];
        return a && a.is(t) && t !== a.default ? t : void 0;
      },
      "J",
      0,
      (e, t) => u[e]?.is(t) ?? !1,
    ],
    849152,
  );
  var c = e.i(637172),
    p = e.i(464649),
    m = e.i(389270);
  let h = ({ id: e, label: t, chains: a, programAliases: i }) => ({
      id: e,
      label: t,
      chains: a,
      mark: e,
      program: e,
      ...(i ? { programAliases: i } : {}),
    }),
    f = [
      {
        id: "pump",
        label: "Pump",
        chains: ["solana"],
        mark: "pump",
        program: "pump",
      },
      {
        id: "raydium",
        label: "Launchlab",
        chains: ["solana"],
        mark: "launchlab",
        program: "raydium_launchpad",
      },
      {
        id: "believe",
        label: "Believe",
        chains: ["solana"],
        mark: "believe",
        program: "meteora_dbc",
        platform: "believe",
      },
      {
        id: "moonshot",
        label: "Moonshot",
        chains: ["solana"],
        mark: "moonshot",
        program: "meteora_dbc",
        platform: "moonshot",
      },
      {
        id: "bonk",
        label: "Bonkfun",
        chains: ["solana"],
        mark: "bonk",
        program: "raydium_launchpad",
        platform: "bonk",
      },
      {
        id: "bags",
        label: "Bags",
        chains: ["solana"],
        mark: "bags",
        program: "meteora_dbc",
        platform: "bags",
      },
      {
        id: "jup_studio",
        label: "Jup Studio",
        chains: ["solana"],
        mark: "jup_studio",
        program: "meteora_dbc",
        platform: "jup_studio",
      },
      {
        id: "meteora_dbc",
        label: "Meteora",
        chains: ["solana"],
        mark: "meteora",
        program: "meteora_dbc",
        platform: "dbc",
      },
      {
        id: "loadout",
        label: "Loadout",
        chains: ["solana"],
        mark: "loadout",
        program: "loadout",
      },
      {
        id: "meme_fun",
        label: "meme.fun",
        chains: ["solana"],
        mark: "meme_fun",
        program: "meme_fun",
      },
      h({ id: "pons", label: "Pons", chains: ["robinhood"] }),
      h({
        id: "uniswap_cca",
        label: "Uniswap CCA",
        chains: ["robinhood", "arbitrum"],
      }),
      h({ id: "doppler", label: "Doppler", chains: ["robinhood", "base"] }),
      h({ id: "flap", label: "Flap", chains: ["bsc", "robinhood"] }),
      h({
        id: "four_meme",
        label: "Fourmeme",
        chains: ["bsc"],
        programAliases: ["open_four"],
      }),
      h({ id: "inkypump", label: "InkyPump", chains: ["ink"] }),
      h({ id: "liquid_launch", label: "LiquidLaunch", chains: ["hyperevm"] }),
      h({ id: "argus_launchpad", label: "Argus", chains: ["arc"] }),
      h({ id: "tolly_launchpad", label: "Tolly", chains: ["arc"] }),
      h({ id: "lift_launchpad", label: "Lift", chains: ["arc"] }),
      h({ id: "minara_launchpad", label: "Minara", chains: ["arc"] }),
      h({ id: "warp_launchpad", label: "Warp", chains: ["arc"] }),
      h({ id: "lotus_launchpad", label: "Lotus", chains: ["arc"] }),
      h({
        id: "uniswap_liquidity_launcher",
        label: "Uniswap Launcher",
        chains: ["arc"],
      }),
      h({ id: "kumbaya_fire", label: "Kumbaya Fire", chains: ["megaeth"] }),
      h({ id: "ignix", label: "Ignix", chains: ["xlayer"] }),
      h({ id: "dyorpump", label: "DyorPump", chains: ["xlayer"] }),
      h({ id: "nadfun", label: "nad.fun", chains: ["monad"] }),
      h({ id: "abyss_launchpad", label: "Abyss", chains: ["robinhood"] }),
      h({ id: "printr", label: "Printr", chains: ["arbitrum"] }),
      h({ id: "bcl", label: "BCL", chains: ["ton"] }),
      h({ id: "blum", label: "Blum", chains: ["ton"] }),
      h({ id: "gaspump", label: "GasPump", chains: ["ton"] }),
      h({ id: "memeslab", label: "MemesLab", chains: ["ton"] }),
      h({ id: "moon", label: "Moon", chains: ["ton"] }),
      h({ id: "uranus", label: "Uranus", chains: ["ton"] }),
      h({ id: "justhoot", label: "JustHoot", chains: ["near"] }),
      h({ id: "meme_cooking", label: "Meme Cooking", chains: ["near"] }),
      h({ id: "nearly_trade", label: "nearly.trade", chains: ["near"] }),
      h({ id: "ascend", label: "Ascend", chains: ["starknet"] }),
      h({ id: "launchy", label: "Launchy", chains: ["starknet"] }),
      h({ id: "slay", label: "Slay", chains: ["starknet"] }),
      h({
        id: "stark_industry",
        label: "Stark Industry",
        chains: ["starknet"],
      }),
      h({ id: "starkovia", label: "Starkovia", chains: ["starknet"] }),
      h({ id: "strk_launch", label: "Strk Launch", chains: ["starknet"] }),
      h({ id: "strkpump", label: "StrkPump", chains: ["starknet"] }),
      h({ id: "unruggable", label: "Unruggable", chains: ["starknet"] }),
    ],
    g = new Set(f.map((e) => e.id)),
    b = (e) => "string" == typeof e && g.has(e),
    v = (e) =>
      void 0 !== e.platform
        ? [e.platform]
        : [e.program, ...(e.programAliases ?? [])],
    y = new Map(
      f.flatMap((e) => (void 0 === e.platform ? [] : [[e.platform, e.id]])),
    ),
    k = new Map(
      f.flatMap((e) =>
        void 0 === e.platform ? v(e).map((t) => [t, e.id]) : [],
      ),
    ),
    w = (e, t) => {
      let a = t?.trim().toLowerCase();
      return a ? e.get(a) : void 0;
    },
    C = ({ platform: e, launchpad: t, program: a }) =>
      w(y, e) ?? w(k, t) ?? w(k, a) ?? w(k, e),
    _ = (e) =>
      C({
        platform: e.platform,
        launchpad: e.board_launchpad,
        program: e.board_program,
      }),
    M = (e) => f.filter((t) => t.chains.some((t) => e.includes(t)));
  e.s(
    [
      "V",
      0,
      f,
      "L",
      0,
      _,
      "q",
      0,
      b,
      "_",
      0,
      (e) =>
        (0, m.s)(e.mark) ?? {
          iconSrc: p.T[e.chains[0] ?? "solana"],
          isTile: !1,
        },
      "T",
      0,
      C,
      "$",
      0,
      M,
      "B",
      0,
      v,
    ],
    146255,
  );
  var U = e.i(583448);
  let x = (e, t) => (0, c.W)("new" === e ? c.B : U.D, t),
    T = x("movers"),
    A = (e) => {
      if (!e) return;
      let t = new Set();
      for (let a of e) {
        let e = a.trim().toLowerCase();
        e && t.add(e);
      }
      return t.size > 0 ? Array.from(t) : void 0;
    };
  e.s(
    [
      "B",
      0,
      x,
      "O",
      0,
      (e, t = T) => {
        let a,
          i = {},
          n =
            ((a = e.platforms),
            A(f.filter((e) => a?.includes(e.id)).flatMap((e) => [...v(e)])));
        n && (i.launchpads = n);
        let r = A(e.whitelist);
        r && (i.searchKeywords = r);
        let l = A(e.blacklist);
        (l && (i.excludeKeywords = l),
          void 0 !== e.bondingCurveFrom && (i.pMin = e.bondingCurveFrom),
          void 0 !== e.bondingCurveTo && (i.pMax = e.bondingCurveTo),
          void 0 !== e.volumeFrom && (i.vol24hUsdMin = e.volumeFrom),
          void 0 !== e.volumeTo && (i.vol24hUsdMax = e.volumeTo),
          void 0 !== e.marketCapFrom && (i.mcMin = e.marketCapFrom),
          void 0 !== e.marketCapTo && (i.mcMax = e.marketCapTo),
          e.buyTransactions?.min !== void 0 &&
            (i.buyTxMin = e.buyTransactions.min),
          e.buyTransactions?.max !== void 0 &&
            (i.buyTxMax = e.buyTransactions.max),
          e.sellTransactions?.min !== void 0 &&
            (i.sellTxMin = e.sellTransactions.min),
          e.sellTransactions?.max !== void 0 &&
            (i.sellTxMax = e.sellTransactions.max),
          e.transactions?.min !== void 0 && (i.totalTxMin = e.transactions.min),
          e.transactions?.max !== void 0 && (i.totalTxMax = e.transactions.max),
          e.totalFee?.min !== void 0 && (i.totalFeeMin = e.totalFee.min),
          e.totalFee?.max !== void 0 && (i.totalFeeMax = e.totalFee.max),
          void 0 !== e.numHoldersFrom && (i.holdersMin = e.numHoldersFrom),
          void 0 !== e.numHoldersTo && (i.holdersMax = e.numHoldersTo),
          void 0 !== e.creationFrom && (i.ageMin = 60 * e.creationFrom),
          void 0 !== e.creationTo && (i.ageMax = 60 * e.creationTo),
          e.topTenHoldersOwnedAmount?.min !== void 0 &&
            (i.top10Min = e.topTenHoldersOwnedAmount.min),
          e.topTenHoldersOwnedAmount?.max !== void 0 &&
            (i.top10Max = e.topTenHoldersOwnedAmount.max),
          e.devHoldingAmount?.min !== void 0 &&
            (i.devHoldMin = e.devHoldingAmount.min),
          e.devHoldingAmount?.max !== void 0 &&
            (i.devHoldMax = e.devHoldingAmount.max),
          e.snipersOwnedAmount?.min !== void 0 &&
            (i.snipersOwnedMin = e.snipersOwnedAmount.min),
          e.snipersOwnedAmount?.max !== void 0 &&
            (i.snipersOwnedMax = e.snipersOwnedAmount.max),
          e.bundlerOwnedAmount?.min !== void 0 &&
            (i.bundlerOwnedMin = e.bundlerOwnedAmount.min),
          e.bundlerOwnedAmount?.max !== void 0 &&
            (i.bundlerOwnedMax = e.bundlerOwnedAmount.max));
        let s = A(e.devBlacklist);
        return (
          s && (i.devBlacklist = s),
          !0 === e.hasTwitter && (i.hasTwitter = !0),
          !0 === e.isWebsite && (i.hasWebsite = !0),
          !0 === e.hasTelegram && (i.hasTelegram = !0),
          !0 === e.hasSocial && (i.hasAnySocial = !0),
          !0 === e.includeMayhem && (i.includeMayhem = !0),
          ("SOL" === e.pair || "USDC" === e.pair) && (i.pairs = [e.pair]),
          (i.chains = ((e, t = T) => {
            let a = new Set(t),
              i = (e ?? []).filter((e) => a.has(e));
            return i.length > 0 ? i : [...t];
          })(e.chains, t).map(c.r)),
          i
        );
      },
      "K",
      0,
      (e, t) => {
        let a = !1 === t.includeMayhem,
          i = t.platforms?.length ? new Set(t.platforms) : null;
        return a || i
          ? e.filter((e) => {
              if (a && e.mh) return !1;
              if (i) {
                let t = C({ platform: e.pl, launchpad: e.lp, program: e.pg });
                if (void 0 === t || !i.has(t)) return !1;
              }
              return !0;
            })
          : e;
      },
      "E",
      0,
      (e) => {
        let t = Object.entries(e)
          .filter(([, e]) => void 0 !== e)
          .map(([e, t]) => {
            let a = Array.isArray(t) ? [...t].sort().join(",") : String(t);
            return `${e}=${a}`;
          })
          .sort((e, t) => e.localeCompare(t));
        return t.length > 0 ? t.join("|") : "default";
      },
    ],
    569438,
  );
  var S = e.i(78436),
    I = e.i(634103),
    F = e.i(735821),
    j = e.i(800855);
  let B = ["callout", "update", "trade", "collectible"],
    P = { callout: !0, update: !0, trade: !0, collectible: !0 },
    E = {
      minTradeAmountUsd: F.O,
      minMarketCapUsd: null,
      maxMarketCapUsd: null,
    },
    L = Object.keys(E),
    O = (e) => (null !== e && Number.isFinite(e) && e >= 0 ? e : null),
    D = (0, j.m)(
      (0, S.$)()(
        (0, I.V)(
          (e, t) => ({
            enabled: P,
            filters: E,
            saveAlertsRailSelection: (a, i) => {
              if (0 === N(a).length) return;
              let n = {
                minTradeAmountUsd: O(i.minTradeAmountUsd),
                minMarketCapUsd: O(i.minMarketCapUsd),
                maxMarketCapUsd: O(i.maxMarketCapUsd),
              };
              null !== n.minMarketCapUsd &&
                null !== n.maxMarketCapUsd &&
                n.minMarketCapUsd > n.maxMarketCapUsd &&
                (n = { ...n, minMarketCapUsd: null, maxMarketCapUsd: null });
              let r = t(),
                l = !B.every((e) => r.enabled[e] === a[e]),
                s = !L.every((e) => r.filters[e] === n[e]);
              (l || s) &&
                e({
                  enabled: l ? { ...a } : r.enabled,
                  filters: s ? n : r.filters,
                });
            },
          }),
          {
            name: "coin-alerts-rail-filters",
            storage: (0, j.I)({ defaultPersisted: { enabled: P, filters: E } }),
            skipHydration: !0,
            version: 1,
            merge: (e, t) => {
              let a = e && "object" == typeof e ? e : void 0;
              return {
                ...t,
                enabled: { ...P, ...a?.enabled },
                filters: { ...E, ...a?.filters },
              };
            },
          },
        ),
      ),
    ),
    N = (e) => B.filter((t) => e[t]);
  e.s(["E", 0, B, "r", 0, D, "y", 0, (e) => N(e).join(",")], 79402);
  let W = {
      trending: ["chains", "mcap"],
      movers: ["chains", "launchpads", "mcap"],
      watchlist: ["chains", "mcap"],
      "global-callouts": ["chains", "mcap", "excludeUsers"],
      "latest-callouts": ["chains", "latestFloors"],
      "my-alerts": ["chains", "alertKinds", "mcap", "excludeUsers"],
      "user-callouts": ["mcap", "excludeUsers"],
      "list-callouts": ["mcap", "excludeUsers"],
      "coin-callouts": ["mcap", "excludeUsers"],
      "coin-trades": ["trade"],
      "user-trades": ["trade"],
    },
    H = (e) => "number" == typeof e && Number.isFinite(e),
    R = ({ view: e, board: t }) => {
      let a = W[e];
      return a &&
        "movers" === e &&
        t &&
        "movers" !== t &&
        "new" !== t &&
        t !== l
        ? a.filter((e) => "chains" !== e)
        : a;
    },
    q = [c.l, ...c.w],
    $ = {
      chains: ["chains"],
      launchpads: ["launchpads"],
      mcap: ["minMcapUsd", "maxMcapUsd"],
      excludeUsers: ["excludeUsers"],
      trade: ["side", "minTradeUsd"],
      latestFloors: [
        "minCostBasisUsd",
        "minCalloutMarketCapUsd",
        "maxCostBasisUsd",
        "maxCalloutMarketCapUsd",
      ],
      alertKinds: ["alertKinds", "minTradeUsd"],
    },
    V = (e, t) => {
      if (!e) return;
      let a = {};
      for (let i of Object.keys(e)) t(i) && Object.assign(a, { [i]: e[i] });
      return Object.keys(a).length > 0 ? a : void 0;
    },
    z = (e) => new Set((e ?? []).flatMap((e) => $[e])),
    G = { minCostBasisUsd: 5, minCalloutMarketCapUsd: 5e3 },
    J = { minCostBasisUsd: 100, minCalloutMarketCapUsd: 3e4 },
    K = (e, t) => {
      if (!H(e) || e <= 0) return;
      let a = Math.max(e, G[t]);
      return a === J[t] ? void 0 : a;
    },
    X = (e, t) => !t?.length || t.some((t) => (0, c.N)(e, t));
  e.s(
    [
      "G",
      0,
      J,
      "T",
      0,
      G,
      "o",
      0,
      (e, t) =>
        !t ||
        (!(
          (t.chains &&
            t.chains.length > 0 &&
            !(e.chainSlug
              ? t.chains.includes(e.chainSlug)
              : X({ coinMint: e.coinMint, chainId: e.chainId }, t.chains))) ||
          (t.excludeUsers &&
            t.excludeUsers.length > 0 &&
            [e.userId, e.username]
              .filter((e) => !!e)
              .map((e) => e.toLowerCase())
              .some((e) => t.excludeUsers?.includes(e)))
        ) &&
          (void 0 === t.minMcapUsd ||
            void 0 === e.mcapUsd ||
            !(e.mcapUsd < t.minMcapUsd)) &&
          (void 0 === t.maxMcapUsd ||
            void 0 === e.mcapUsd ||
            !(e.mcapUsd > t.maxMcapUsd))),
      "V",
      0,
      (e, t, a = c.w) => {
        if ("object" != typeof e || null === e) return;
        let i = {};
        if (Array.isArray(e.chains)) {
          let n = (0, c.W)(a, t),
            r = Array.from(new Set(e.chains.filter((e) => n.includes(e))));
          r.length > 0 && r.length < n.length && (i.chains = r);
        }
        if (Array.isArray(e.launchpads)) {
          let t = new Set(e.launchpads.filter(b)),
            a = f.filter((e) => t.has(e.id)).map((e) => e.id);
          a.length > 0 && (i.launchpads = a);
        }
        if (
          (H(e.minMcapUsd) && e.minMcapUsd > 0 && (i.minMcapUsd = e.minMcapUsd),
          H(e.maxMcapUsd) && e.maxMcapUsd > 0 && (i.maxMcapUsd = e.maxMcapUsd),
          Array.isArray(e.excludeUsers))
        ) {
          let t = e.excludeUsers
            .filter((e) => "string" == typeof e)
            .map((e) => e.trim().toLowerCase())
            .filter(Boolean)
            .slice(0, 50);
          t.length > 0 && (i.excludeUsers = Array.from(new Set(t)));
        }
        if (Array.isArray(e.alertKinds)) {
          let t = e.alertKinds.filter((e) => B.includes(e));
          t.length > 0 &&
            t.length < B.length &&
            (i.alertKinds = B.filter((e) => t.includes(e)));
        }
        (("buy" === e.side || "sell" === e.side) && (i.side = e.side),
          H(e.minTradeUsd) &&
            e.minTradeUsd > 0 &&
            (i.minTradeUsd = e.minTradeUsd));
        let n = K(e.minCostBasisUsd, "minCostBasisUsd");
        void 0 !== n && (i.minCostBasisUsd = n);
        let r = K(e.minCalloutMarketCapUsd, "minCalloutMarketCapUsd");
        return (
          void 0 !== r && (i.minCalloutMarketCapUsd = r),
          H(e.maxCostBasisUsd) &&
            e.maxCostBasisUsd >= (i.minCostBasisUsd ?? J.minCostBasisUsd) &&
            (i.maxCostBasisUsd = e.maxCostBasisUsd),
          H(e.maxCalloutMarketCapUsd) &&
            e.maxCalloutMarketCapUsd >=
              (i.minCalloutMarketCapUsd ?? J.minCalloutMarketCapUsd) &&
            (i.maxCalloutMarketCapUsd = e.maxCalloutMarketCapUsd),
          Object.keys(i).length > 0 ? i : void 0
        );
      },
      "E",
      0,
      (e, t) => {
        if (!t) return !0;
        if (!X({ coinMint: e.mint, chainId: e.chain_id }, t.chains)) return !1;
        if (t.launchpads?.length) {
          let a = _(e);
          if (void 0 === a || !t.launchpads.includes(a)) return !1;
        }
        let a = e.usd_market_cap;
        return (
          (void 0 === t.minMcapUsd || (void 0 !== a && !(a < t.minMcapUsd))) &&
          (void 0 === t.maxMcapUsd || (void 0 !== a && !(a > t.maxMcapUsd)))
        );
      },
      "g",
      0,
      (e) => {
        if (!e) return 0;
        let t = 0;
        return (
          e.chains?.length && (t += 1),
          e.launchpads?.length && (t += 1),
          e.alertKinds?.length && (t += 1),
          void 0 !== e.minMcapUsd && (t += 1),
          void 0 !== e.maxMcapUsd && (t += 1),
          e.excludeUsers?.length && (t += 1),
          void 0 !== e.side && (t += 1),
          void 0 !== e.minTradeUsd && (t += 1),
          void 0 !== e.minCostBasisUsd && (t += 1),
          void 0 !== e.minCalloutMarketCapUsd && (t += 1),
          void 0 !== e.maxCostBasisUsd && (t += 1),
          void 0 !== e.maxCalloutMarketCapUsd && (t += 1),
          t
        );
      },
      "p",
      0,
      R,
      "J",
      0,
      (e, t) => {
        let a = z(t);
        return V(e, (e) => a.has(e));
      },
      "q",
      0,
      (e, t) => {
        if (!e?.chains?.length) return e;
        let a = e.chains.filter((e) => t.includes(e));
        if (a.length === e.chains.length) return e;
        let { chains: i, ...n } = e,
          r = a.length > 0 ? { ...n, chains: a } : n;
        return Object.keys(r).length > 0 ? r : void 0;
      },
      "z",
      0,
      (e, t) => {
        let a = z(t);
        return V(e, (e) => !a.has(e));
      },
      "x",
      0,
      (e, t) => {
        let a = e?.launchpads;
        if (!e || !a) return e;
        let i = (({ picks: e, options: t }) => {
          if (!e?.length || t.length < 2) return;
          let a = t.filter((t) => e.includes(t.id)).map((e) => e.id);
          return a.length > 0 && a.length < t.length ? a : void 0;
        })({ picks: a, options: t });
        if (i?.length === a.length && i.every((e, t) => e === a[t])) return e;
        let { launchpads: n, ...r } = e,
          l = i ? { ...r, launchpads: i } : r;
        return Object.keys(l).length > 0 ? l : void 0;
      },
      "r",
      0,
      (e) => {
        if (!e?.launchpads) return e;
        let { launchpads: t, ...a } = e;
        return Object.keys(a).length > 0 ? a : void 0;
      },
      "a",
      0,
      (e) => void 0 !== e && Object.keys(e).length > 0,
      "_",
      0,
      ({ picks: e, options: t }) => {
        let a = new Set(t.map((e) => e.id));
        return (e ?? []).filter((e) => !a.has(e));
      },
      "e",
      0,
      ({ picks: e, before: t, after: a }) => {
        let i = new Set(t.map((e) => e.id)),
          n = a.map((e) => e.id).filter((e) => !i.has(e));
        return 0 === n.length
          ? [...e]
          : e.some((e) => i.has(e))
            ? [...e, ...n.filter((t) => !e.includes(t))]
            : e.filter((e) => !n.includes(e));
      },
      "O",
      0,
      (e, t) => {
        if (!e?.length) return;
        let a = t ? [...e] : e.filter(c.e);
        return a.length > 0 ? a : void 0;
      },
      "Q",
      0,
      (e) =>
        "my-alerts" === e ? q : "movers" === e || "trending" === e ? c.B : c.w,
      "M",
      0,
      ({ view: e, board: t, chains: a, exposure: i }) => {
        let n = R({ view: e, board: t });
        if (!n?.includes("launchpads")) return [];
        if (!n.includes("chains")) return M(["solana"]);
        let r = x(t ?? o, i),
          l = r.filter((e) => a?.includes(e));
        return M(l.length > 0 ? l : r);
      },
      "v",
      0,
      X,
      "B",
      0,
      (e) => {
        let t = e?.minCostBasisUsd ?? J.minCostBasisUsd,
          a = e?.minCalloutMarketCapUsd ?? J.minCalloutMarketCapUsd,
          i = { minCostBasisUsd: t, minCalloutMarketCapUsd: a };
        return (
          e?.maxCostBasisUsd !== void 0 &&
            e.maxCostBasisUsd >= t &&
            (i.maxCostBasisUsd = e.maxCostBasisUsd),
          e?.maxCalloutMarketCapUsd !== void 0 &&
            e.maxCalloutMarketCapUsd >= a &&
            (i.maxCalloutMarketCapUsd = e.maxCalloutMarketCapUsd),
          i
        );
      },
      "t",
      0,
      (e, t) =>
        !t ||
        (("buy" !== t.side || !!e.isBuy) &&
          ("sell" !== t.side || !e.isBuy) &&
          (void 0 === t.minTradeUsd ||
            (null != e.amountUsd && !(e.amountUsd < t.minTradeUsd)))),
      "S",
      0,
      (e, t) => {
        let a = {};
        (e?.minMcapUsd !== void 0 && (a.marketCapFrom = e.minMcapUsd),
          e?.maxMcapUsd !== void 0 && (a.marketCapTo = e.maxMcapUsd),
          e?.launchpads?.length && (a.platforms = [...e.launchpads]));
        let i = e?.chains?.filter(c.e);
        return (
          ("new" === t || "movers" === t || t === l) &&
            i?.length &&
            (a.chains = i),
          a
        );
      },
    ],
    828424,
  );
};
