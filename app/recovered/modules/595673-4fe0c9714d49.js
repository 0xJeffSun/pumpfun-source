// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(292686),
    n = e.i(26101);
  let o = BigInt(15e5),
    r = "insufficient funds, transaction not sent";
  e.s(
    [
      "J",
      0,
      o,
      "v",
      0,
      0.01,
      "w",
      0,
      1,
      "l",
      0,
      "holder-reward coins are not enabled",
      "R",
      0,
      r,
    ],
    609926,
  );
  var i = e.i(819757),
    s = e.i(646908),
    a = e.i(584229),
    c = e.i(466931),
    u = e.i(254667),
    l = e.i(426091),
    E = e.i(914549),
    m = e.i(641947),
    p = e.i(21617);
  let T = new Set([
      "no_route",
      "no_market",
      "insufficient_liquidity",
      "venue_rejected",
    ]),
    d = {
      no_route: "SWAP_BUILD_NO_ROUTE",
      no_market: "SWAP_BUILD_NO_MARKET",
      insufficient_liquidity: "SWAP_BUILD_INSUFFICIENT_LIQUIDITY",
      venue_rejected: "SWAP_BUILD_VENUE_REJECTED",
    },
    I = new Set(Object.values(d)),
    _ = (e) => "string" == typeof e && I.has(e),
    A = "swap-build-no-route",
    C = new Map([
      ["jupiter_no_route", "no_route"],
      ["SWAP_IMPACT_TOO_HIGH", "insufficient_liquidity"],
      ["jupiter_rejected", "venue_rejected"],
    ]),
    O = [
      /no routes? found/i,
      /could not find any route/i,
      /COULD_NOT_FIND_ANY_ROUTE/,
      /failed to get quotes?/i,
      /\bno route\b/i,
    ],
    S = [
      /has no on-chain market/i,
      /not a tradeable coin/i,
      /not tradab?le/i,
      /TOKEN_NOT_TRADABLE/,
      /MARKET_NOT_FOUND/,
      /token not found/i,
    ],
    f = [
      /insufficient liquidity/i,
      /not enough liquidity/i,
      /ROUTE_PLAN_DOES_NOT_CONSUME_ALL_THE_AMOUNT/,
    ],
    h = (e, t) => e.some((e) => e.test(t));
  e.s(
    [
      "g",
      0,
      A,
      "x",
      0,
      d,
      "E",
      0,
      "SWAP_BUILD_SESSION_EXPIRED",
      "D",
      0,
      function ({ status: e, message: t, reasonCode: n }) {
        if (401 === e) return "unauthenticated";
        let o = n ? C.get(n) : void 0;
        if (o) return o;
        let r = t?.trim() ?? "";
        return r
          ? h(f, r)
            ? "insufficient_liquidity"
            : h(S, r)
              ? "no_market"
              : h(O, r)
                ? "no_route"
                : "unknown"
          : "unknown";
      },
      "n",
      0,
      (e) => T.has(e),
      "I",
      0,
      _,
    ],
    992829,
  );
  var L = e.i(338319),
    N = e.i(564035);
  let R = ({ chainId: e, provider: t }) => e === p.g || "hyperliquid" === t,
    y = { pumpswap: "pump_swap", internal_bridge: "bridge" },
    D = /^(0x)?[0-9a-f]{64}$/i,
    w = (e, t) => {
      if (void 0 === t) return;
      let n = Object.entries(e).find(([, e]) => e === t);
      return n?.[0];
    },
    k = (e) => {
      try {
        return e();
      } catch {
        return;
      }
    },
    P = (e, n) => {
      let o,
        r,
        i = (e.signatures ?? []).filter((e) => e && !D.test(e)),
        s = e.provider,
        a = e.usdAmount ?? e.paymentUsdAmount;
      return {
        "dd.metric_eligible": !0,
        platform: "web",
        network: m.A ? "mainnet" : "devnet",
        direction: e.direction,
        mint: e.mint,
        lane: e.chainId,
        venue: e.venue ?? (s ? (y[s] ?? s) : void 0),
        provider: s,
        route: e.route,
        ...((r = "privy" === (o = k(l.Y)?.toLowerCase())),
        {
          wallet_address: k(L.e),
          wallet_type: r ? "privy" : o ? "non_custodial" : "unknown",
          wallet_name: o,
          wallet_auto_approve: r ? k(E.V) : void 0,
        }),
        denomination: e.denomination ?? (void 0 !== a ? "usdc" : "sol"),
        solAmount: e.solAmount,
        usdcAmount: a,
        tokenAmount: e.tokenAmount,
        signature: i[0],
        signatures: i.length > 1 ? i : void 0,
        is_coin_creation: e.isCoinCreation,
        blockchain_store: e.blockchainStore,
        transactions_via_api_service: e.transactionsViaApiService,
        fee_mode: e.feeMode,
        swap_source: w(t.Ae, e.screen ?? t.Ae.COIN_DETAILS),
        source_element: w(t.k9, e.sourceElement),
        time_to_swap_e2e_ms: n,
      };
    },
    M = (e) => {
      if (void 0 === e) return;
      let t = Number(e);
      return Number.isFinite(t) ? t : void 0;
    },
    U = (e) => (e.length > 300 ? `${e.slice(0, 300)}…` : e),
    g = (e) =>
      Object.fromEntries(
        Object.entries(e).flatMap(([e, t]) => {
          if (void 0 === t) return [];
          if (null !== t && "object" == typeof t && !Array.isArray(t)) {
            let n = g(t);
            return Object.keys(n).length > 0 ? [[e, n]] : [];
          }
          return [[e, t]];
        }),
      ),
    b = (e, t) => {
      try {
        u.y.log("*", e, g(t()));
      } catch {}
    },
    G = /custom program error: 0x1788\b|"Custom":\s*6024\b/i,
    v =
      /custom program error: 0x1775\b|"Custom":\s*6005\b|bonding ?curve (is |has )?complete|BondingCurveComplete/i,
    j = /custom program error: 0x1(?![0-9a-f])/i,
    F = /custom program error: 0x([0-9a-f]+)\b|"Custom":\s*(\d+)\b/i,
    B = new Map([
      ["slippage", "slippage"],
      ["insufficient_funds", "user_state"],
      ["insufficient_funds_for_rent", "user_state"],
      ["insufficient_tokens_to_sell", "user_state"],
      ["insufficient_tokens_to_buy", "user_state"],
      ["venue_insufficient_liquidity", "venue"],
      ["attempt_to_trade_graduated_token_as_ungraduated", "venue"],
      ["jupiter_no_route", "venue"],
      ["jupiter_rejected", "venue"],
      ["SWAP_IMPACT_TOO_HIGH", "venue"],
      ["jupiter_unavailable", "network"],
      ["jupiter_rate_limited", "network"],
      ["simulation_reverted", "network"],
    ]),
    V = /\[reason: ([A-Za-z_]+)\]$/,
    H = "transaction expired: not confirmed within",
    K =
      (...e) =>
      (t) =>
        e.some((e) => e.test(t)),
    Y =
      (...e) =>
      (t) =>
        e.includes(t),
    W = [
      {
        klass: "user_state",
        test: (e) =>
          Y(
            r,
            "bonding_curve_complete",
            "balance_changed",
            "bridge_intent_held",
            "token_unsellable",
          )(e) ||
          K(
            /insufficient (funds|lamports|balance)|InsufficientFunds|account has 0 SOL/i,
            /holder-reward coins are not enabled/i,
            /approval outlived the blockhash/i,
            j,
            /\binsufficient_(funds(_for_rent)?|tokens_to_(sell|buy))\b/,
            /debit an account|no record of a prior credit/i,
          )(e),
      },
      {
        klass: "slippage",
        test: K(
          /slippage|ExceededSlippage|TooMuchSolRequired|TooLittleSolReceived/i,
          /custom program error: 0x(177[1234]|178[57]|1798|179a)\b/i,
          /"Custom":\s*(600[1234]|602[13]|6040|6042)\b/,
          /^(relay_execute_slippage|quote_stale|min_out_below_floor)$/,
        ),
      },
      {
        klass: "server",
        test: Y("SPONSOR_GUARD_FAILED", "SPONSORSHIP_CAP_EXCEEDED"),
      },
      {
        klass: "venue",
        test: (e) =>
          Y(
            ...Object.values(d),
            "relay_recovery_watch_expired",
            "UNSUPPORTED_CURRENCY",
            "REGION_RESTRICTED",
            "SWAP_IMPACT_TOO_HIGH",
            "NO_SWAP_ROUTES_FOUND",
            "INSUFFICIENT_LIQUIDITY",
            "UNSUPPORTED_ROUTE",
            "UNSUPPORTED_CHAIN",
            "jupiter_no_route",
            "jupiter_rejected",
          )(e) ||
          K(
            G,
            v,
            /\bvenue_insufficient_liquidity\b|attempt_to_trade_graduated_token_as_ungraduated/,
            /doesn't hold enough liquidity|no routes? found|insufficient liquidity/i,
            /^relay_|^settlement_|^bridge_(refunded|expired|failed)\b/,
            /transaction reverted on-chain/i,
          )(e),
      },
      {
        klass: "client",
        test: K(
          /fee payer is not the connected wallet|wallet (rebuilt|dropped) the|sponsor signature|rebuilt an unsigned|Missing signed transaction in batch/i,
        ),
      },
      {
        klass: "network",
        test: Y(
          N.C,
          "jupiter_unavailable",
          "jupiter_rate_limited",
          "simulation_reverted",
        ),
      },
      {
        klass: "network",
        test: K(
          /^(Transaction failed to send|failed_to_confirm_transaction)$/,
          /not confirmed within|timed? ?out|block ?height exceeded|blockhash|could not broadcast|did not land|has expired|transaction expired|Failed to fetch|fetch failed|NetworkError/i,
        ),
      },
    ],
    x = (e) => (e && "unknown" !== e ? e : void 0);
  function X(e) {
    if (R(e)) return;
    let { signals: t } = e,
      n = e.timeToConfirmEndToEnd ?? t?.durationMs;
    b("swap_success_web", () => ({
      ...P(e, n),
      other: {
        timeToBuild: t?.timeToBuildMs,
        timeToSign: t?.timeToSignMs,
        timeToSendAndConfirm: e.timeToConfirm ?? t?.timeToConfirmMs,
        timeToConfirm: t?.durationMs,
        timeToConfirmEndToEnd: n,
        quoteAgeMs: t?.quoteAgeMs,
      },
    }));
  }
  function q(e) {
    if (R(e)) return;
    let { signals: t } = e;
    b("swap_error_web", () => {
      let { errorClass: n, solanaErrorCode: o } = (function ({
        errorReason: e,
        operation: t,
        bapiReason: n,
      }) {
        let o = F.exec(e),
          r = o
            ? void 0 !== o[1]
              ? Number.parseInt(o[1], 16)
              : Number.parseInt(o[2], 10)
            : void 0;
        if (e.startsWith(H))
          return { errorClass: "network", solanaErrorCode: r };
        let i = n ?? V.exec(e)?.[1],
          s = void 0 === i ? void 0 : B.get(i);
        if (s) return { errorClass: s, solanaErrorCode: r };
        if (t === A) return { errorClass: "venue", solanaErrorCode: r };
        let a = W.find(({ test: t }) => t(e));
        return a
          ? { errorClass: a.klass, solanaErrorCode: r }
          : "swap-build" === t
            ? { errorClass: "server", solanaErrorCode: r }
            : { errorClass: "unknown", solanaErrorCode: r };
      })({
        errorReason: e.errorReason,
        operation: e.operation,
        bapiReason: e.bapiReason,
      });
      return {
        ...P(e, t?.durationMs),
        error_reason: U(e.errorReason),
        error_class: n,
        error_code: e.errorCode,
        bapi_reason: e.bapiReason,
        other: {
          timeToError: t?.durationMs,
          timeToBuild: t?.timeToBuildMs,
          timeToSign: t?.timeToSignMs,
          quoteAgeMs: t?.quoteAgeMs,
          slippage: M(e.slippage),
          priceDriftBps: t?.priceDriftBps,
          solana_error_code: o,
        },
      };
    });
  }
  function $(e) {
    if (R(e)) return;
    let { signals: t } = e;
    b("swap_cancelled_web", () => ({
      ...P(e, t?.durationMs),
      error_reason: U(e.errorReason),
      error_class: "user_state",
      error_code: e.errorCode,
      other: {
        timeToCancel: t?.durationMs,
        timeToBuild: t?.timeToBuildMs,
        timeToSign: t?.timeToSignMs,
        quoteAgeMs: t?.quoteAgeMs,
        slippage: M(e.slippage),
        priceDriftBps: t?.priceDriftBps,
      },
    }));
  }
  e.s(
    [
      "e",
      0,
      function ({
        confirmed: e,
        error: t,
        reason: n,
        reasonDetail: o,
        timeoutMs: r,
      }) {
        let i;
        if (!e) {
          let e = ((e) => {
              let t = "post-mortem:",
                n = e ? e.indexOf(t) : -1;
              if (e && !(n < 0))
                return (
                  e
                    .slice(n + t.length)
                    .trim()
                    .replace(/\)\s*$/, "") || void 0
                );
            })(t),
            n = e ? ` (post-mortem: ${e})` : "";
          return { message: `${H} ${r ?? 3e4}ms${n}` };
        }
        let s = x(o),
          a = s && B.has(s) ? s : x(n),
          c = t?.trim() || "transaction reverted on-chain";
        if (!a) return { message: U(c) };
        let u = ` [reason: ${a}]`;
        return {
          message: `${((i = 300 - u.length), c.length > i ? `${c.slice(0, i - 1)}…` : c)}${u}`,
          bapiReason: a,
        };
      },
      "f",
      0,
      $,
      "g",
      0,
      q,
      "a",
      0,
      X,
    ],
    191754,
  );
  var Q = e.i(806846);
  function z(e, n) {
    return (e !== t.k9.TRENDING || !n) && void 0;
  }
  e.s(["f", 0, z], 374589);
  var Z = e.i(786480);
  let J = /^([1-9A-HJ-NP-Za-km-z]{32,44}|0x[0-9a-fA-F]{40})$/;
  function ee({ attributionId: e, ccUserId: t }) {
    let n = J.test(e) ? e : void 0,
      o = t ?? ((0, Z.f)(e) ? e : void 0);
    return o
      ? {
          viewedUserId: o,
          ...(n ? { viewedWalletAddress: n } : {}),
          isWalletLookup: !1,
        }
      : n
        ? { viewedUserId: n, viewedWalletAddress: n, isWalletLookup: !0 }
        : { viewedUserId: e, isWalletLookup: !1 };
  }
  e.s(
    [
      "N",
      0,
      function ({ address: e, ccUserId: t }) {
        let n = e && J.test(e) ? e : void 0,
          o = t ?? (e && (0, Z.f)(e) ? e : void 0);
        return n || o
          ? {
              ...(n ? { profileId: n } : {}),
              ...(o ? { viewedUserId: o } : {}),
            }
          : null;
      },
      "t",
      0,
      ee,
    ],
    594709,
  );
  var et = e.i(267350),
    en = e.i(605587);
  function eo({
    sourceScreen: e,
    sourceElement: n = t.k9.UNSPECIFIED,
    sourceElementType: o = t.eD.UNSPECIFIED,
    ownershipGroup: r,
  }) {
    return {
      sourceScreen: e,
      sourceElement: n,
      sourceElementType: o,
      ownershipGroup: r,
    };
  }
  function er(e) {
    switch (e?.toLowerCase()) {
      case "pump":
        return t.SI.PUMP;
      case "pump_amm":
        return t.SI.PUMP_AMM;
      case "raydium_launchpad":
      case "raydium_cpmm":
      case "raydium":
        return t.SI.RAYDIUM;
      case "bonk":
        return t.SI.BONK;
      default:
        return t.SI.UNSPECIFIED;
    }
  }
  let ei = "solana",
    es = {
      "/": t.Ae.CALLOUTS,
      "/explore": t.Ae.HOME,
      "/coin/": t.Ae.COIN_DETAILS,
      "/token/": t.Ae.COIN_DETAILS,
      "/pump-token": t.Ae.PUMP_TOKEN,
      "/profile": t.Ae.PROFILE,
      "/search": t.Ae.SEARCH,
      "/watchlist": t.Ae.WATCHLIST,
      "/live": t.Ae.LIVESTREAM,
      "/notifications": t.Ae.NOTIFICATIONS,
      "/create": t.Ae.CREATE_COIN,
      "/leaderboard": t.Ae.LEADERBOARD,
      "/callouts": t.Ae.CALLOUTS,
      "/mayhem": t.Ae.MAYHEM,
      "/u/": t.Ae.REFERRALS_APPLY,
      "/join": t.Ae.REFERRALS_APPLY,
      "/packs/card/": t.Ae.GACHA_CARD,
      "/packs/all": t.Ae.GACHA_ALL_PACKS,
      "/packs/binder": t.Ae.GACHA_BINDER,
      "/packs/market": t.Ae.GACHA_MARKET,
      "/packs": t.Ae.GACHA_HUB,
    },
    ea = {
      featured: t.Ae.FEATURED,
      watchlist: t.Ae.WATCHLIST,
      search: t.Ae.SEARCH,
      profile: t.Ae.PROFILE,
      livestream: t.Ae.LIVESTREAM,
      watch_live: t.Ae.LIVESTREAM,
      "for-you": t.Ae.MOVERS,
      homepage: t.Ae.HOME,
      movers: t.Ae.MOVERS,
      trending: t.Ae.SEARCH,
    },
    ec = new Set([
      "action-items",
      "attention",
      "bounties",
      "drafts",
      "explore",
      "mine",
      "open",
      "submissions",
    ]);
  function eu(e) {
    let t = e.trim();
    if (!t) return null;
    try {
      let e = t.startsWith("http")
        ? new URL(t)
        : new URL(t, "http://localhost");
      return { pathname: e.pathname, searchParams: e.searchParams, rawPath: t };
    } catch {
      let e = t.split("#")[0] ?? t,
        n = e.split("?")[0] ?? e;
      return { pathname: n, searchParams: new URLSearchParams(), rawPath: n };
    }
  }
  function el(e) {
    let n = eu(e);
    if (!n) return t.Ae.UNSPECIFIED;
    let o = n.searchParams.get("feed");
    if (o) {
      let e = (function (e, n = t.Ae.UNSPECIFIED) {
        return ea[e.toLowerCase()] ?? n;
      })(o);
      if (e !== t.Ae.UNSPECIFIED) return e;
    }
    return (function (e, n = t.Ae.UNSPECIFIED) {
      let o = e.toLowerCase();
      if ("/" === o) return es["/"];
      let r = (function (e) {
        if ("/go" !== e && !e.startsWith("/go/")) return;
        let n = e.split("/")[2] ?? "";
        return !n || ec.has(n) ? t.Ae.BOUNTIES : t.Ae.BOUNTY_DETAILS;
      })(o);
      if (void 0 !== r) return r;
      for (let [e, t] of Object.entries(es))
        if ("/" !== e && o.startsWith(e)) return t;
      return n;
    })(n.pathname);
  }
  let eE = "pump-session-start-sent",
    em = new Set(),
    ep = {
      created_timestamp: t.k9.NEW_COINS_SCREENER_FEED,
      market_cap: t.k9.MARKET_CAP_SCREENER_FEED,
      price_change_24h: t.k9.MOVERS_FEED,
      oldest_coins: t.k9.OLDEST_COINS_SCREENER_FEED,
      last_trade_timestamp: t.k9.LAST_TRADE_COINS_SCREENER_FEED,
      charity: t.k9.CHARITY_COINS_SCREENER_FEED,
      live: t.k9.LIVE_COINS_SCREENER_FEED,
      trending: t.k9.TRENDING,
      watchlist: t.k9.WATCHLIST_LIST,
      featured: t.k9.MOVERS_FEED,
      "for-you": t.k9.MOVERS_FEED,
    };
  function eT(e, n) {
    return n ? t.k9.WATCHLIST_LIST : ep[e];
  }
  let ed = { grid: t.A.GRID, table: t.A.TABLE };
  function eI({ isMayhemMode: e, mode: n }) {
    if (e) {
      if ("manual" === n) return t.Oh.MANUAL;
      if ("auto" === n) return t.Oh.AUTO;
    }
  }
  function e_(e) {
    return void 0 !== e
      ? e
      : el(window.location.pathname + window.location.search);
  }
  let eA = {
    watchlist: t.k9.TOP_BAR_WATCHLIST,
    positions: t.k9.TOP_BAR_POSITIONS,
    recents: t.k9.TOP_BAR_RECENTS,
    following: t.k9.UNSPECIFIED,
  };
  function eC(e) {
    return eo({
      sourceScreen: t.Ae.PROFILE,
      sourceElement: e ? t.k9.PROFILE_CONTENT_MINE : t.k9.PROFILE_CONTENT_OTHER,
      sourceElementType: t.eD.BUTTON,
      ownershipGroup: "PROFILES",
    });
  }
  function eO(e) {
    return eo({
      sourceScreen: t.Ae.HOME,
      sourceElement: e,
      sourceElementType: t.eD.MODAL,
      ownershipGroup: "ONBOARDING_AND_FUNDING",
    });
  }
  function eS(e) {
    switch (e) {
      case "home_ticker":
        return {
          sourceScreen: t.Ae.HOME,
          sourceElement: t.k9.TOP_CALLERS_CAROUSEL,
          sourceElementType: t.eD.LIST_ITEM,
        };
      case "home_feed":
        return {
          sourceScreen: t.Ae.POSITION_FEED,
          sourceElement: t.k9.POSITION_FEED_CALLOUT_ROW,
          sourceElementType: t.eD.LIST_ITEM,
        };
      case "global_feed":
      case "callout_detail_feed":
        return {
          sourceScreen: t.Ae.CALLOUTS,
          sourceElement: t.k9.CALLOUTS_FEED_OTHER,
          sourceElementType: t.eD.LIST_ITEM,
        };
      case "callout_detail":
        return {
          sourceScreen: t.Ae.CALLOUTS,
          sourceElement: t.k9.CALLOUTS_CARD_OTHER,
          sourceElementType: t.eD.CARD,
        };
      case "squad_profile":
        return {
          sourceScreen: t.Ae.SQUAD_PROFILE,
          sourceElement: t.k9.CALLOUTS_FEED_OTHER,
          sourceElementType: t.eD.LIST_ITEM,
        };
      case "coin_callouts_feed":
      case "coin_following_rail":
        return {
          sourceScreen: t.Ae.COIN_DETAILS,
          sourceElement: t.k9.CALLOUTS_FEED_OTHER,
          sourceElementType: t.eD.LIST_ITEM,
        };
      case "screeners":
        return {
          sourceScreen: t.Ae.COIN_SCREENERS,
          sourceElement: t.k9.CALLOUTS_FEED_OTHER,
          sourceElementType: t.eD.LIST_ITEM,
        };
    }
  }
  let ef = {
    solana: t.Sa.SOLANA,
    ethereum: t.Sa.ETHEREUM,
    base: t.Sa.BASE,
    bsc: t.Sa.BSC,
    monad: t.Sa.MONAD,
    robinhood: t.Sa.ROBINHOOD,
    near: t.Sa.NEAR,
    ton: t.Sa.TON,
  };
  function eh(e) {
    return e ? ef[e.toLowerCase()] : void 0;
  }
  function eL() {
    return eo({
      sourceScreen: e_(),
      sourceElement: t.k9.UPSELL_CARD_CALLOUT,
      sourceElementType: t.eD.MODAL,
      ownershipGroup: "GROWTH",
    });
  }
  function eN(e) {
    let o = (0, n.fZ)({
        interactionType: t.EG.CLICK,
        shareType: e.shareType,
        shareMethod: e.shareMethod,
        mint: e.mint,
        shareUrl: e.shareUrl,
        wrappedWalletAddresses: [],
      }),
      r = eo({
        sourceScreen: e.source?.sourceScreen ?? e_(),
        sourceElement: e.source?.sourceElement ?? t.k9.EXPLICIT_NO_ELEMENT,
        sourceElementType: e.source?.sourceElementType ?? t.eD.MODAL,
        ownershipGroup: e.source?.ownershipGroup ?? "GROWTH",
      });
    (0, Q.j)(o, r);
  }
  function eR(e) {
    return eo({
      sourceScreen: e?.sourceScreen ?? e_(),
      sourceElement: e?.sourceElement ?? t.k9.CREATOR_REWARDS_CARD,
      sourceElementType: e?.sourceElementType ?? t.eD.BUTTON,
      ownershipGroup: e?.ownershipGroup ?? "BLOCKCHAIN",
    });
  }
  let ey = "ONBOARDING_AND_FUNDING";
  function eD(e = t.eD.POPOVER) {
    return eo({
      sourceScreen: e_(),
      sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
      sourceElementType: e,
      ownershipGroup: ey,
    });
  }
  function ew(e) {
    return eo({
      sourceScreen: e_(e),
      sourceElement: t.k9.WALLET_MODAL,
      sourceElementType: t.eD.MODAL,
      ownershipGroup: ey,
    });
  }
  function ek() {
    return eo({
      sourceScreen: e_(),
      sourceElement: t.k9.WITHDRAWAL_MODAL,
      sourceElementType: t.eD.MODAL,
      ownershipGroup: ey,
    });
  }
  function eP(e) {
    return eo({
      sourceScreen: e?.screen ?? t.Ae.COIN_DETAILS,
      sourceElement: e?.sourceElement ?? t.k9.COIN_HEADER,
      sourceElementType: e?.sourceElementType ?? t.eD.BUTTON,
      ownershipGroup: "COIN_DETAILS",
    });
  }
  function eM(e) {
    return eo({
      sourceScreen: e.screen ?? t.Ae.COIN_DETAILS,
      sourceElement: e.sourceElement,
      sourceElementType: e.sourceElementType ?? t.eD.BUTTON,
      ownershipGroup: "COIN_DETAILS",
    });
  }
  let eU = {
      tab: t.eP.HOLDER_DISTRIBUTION,
      sourceElement: t.k9.COIN_DETAILS_HOLDERS,
    },
    eg = { tab: t.eP.ACTIVITY, sourceElement: t.k9.COIN_DETAILS_ACTIVITY },
    eb = { tab: t.eP.UNSPECIFIED, sourceElement: t.k9.CALLOUTS_FEED_OTHER },
    eG = { tab: t.eP.INFO, sourceElement: t.k9.COIN_DETAILS_SUMMARY_CARD },
    ev = {
      tab: t.eP.UNSPECIFIED,
      sourceElement: t.k9.COIN_DETAILS_FEATURED_COINS_FEED,
    },
    ej = { tab: t.eP.ACTIVITY, sourceElement: t.k9.UNSPECIFIED };
  function eF(e) {
    let o = (0, n.hS)({
        upsellType: t.Nb.PUMP_APP,
        interactionType:
          "seen" === e.interactionType
            ? t.EG.VIEWED
            : "dismiss" === e.interactionType
              ? t.EG.DISMISS
              : t.EG.CLICK,
      }),
      r = eo({
        sourceScreen: e_(e.screen),
        sourceElement: e.sourceElement ?? t.k9.EXPLICIT_NO_ELEMENT,
        sourceElementType: e.sourceElementType ?? t.eD.MODAL,
        ownershipGroup: "GROWTH",
      });
    (0, Q.j)(o, r);
  }
  let eB = {
      my_trades: t.WQ.SHOW_YOUR_TRADES,
      dev_trades: t.WQ.SHOW_DEV_TRADES,
      tracked_trades: t.WQ.UNSPECIFIED,
      following_trades: t.WQ.SHOW_FOLLOWING_TRADES,
      kol_trades: t.WQ.SHOW_KOL_TRADES,
      mayhem_trades: t.WQ.SHOW_MAYHEM_TRADES,
    },
    eV = {
      you: t.jH.YOU,
      creator: t.jH.CREATOR,
      following: t.jH.FOLLOWING,
      kol: t.jH.KOL,
      mayhem_bot: t.jH.MAYHEM_BOT,
    };
  function eH(e) {
    return "quick_trade" === e
      ? {
          settingType: t.go.QUICK_TRADE,
          sourceScreen: t.Ae.HOME,
          sourceElement: t.k9.QUICK_TRADE,
        }
      : {
          settingType: t.go.TRADE_MODAL,
          sourceScreen: t.Ae.COIN_DETAILS,
          sourceElement: t.k9.TRADE_MODAL,
        };
  }
  let eK = {
      slippage: t.pB.SLIPPAGE,
      priority_fee: t.pB.PRIORITY_FEE,
      front_running_protection: t.pB.FRONT_RUNNING_PROTECTION,
      auto_approve: t.pB.AUTO_SETTING,
      buy_amount: t.pB.BUY_AMOUNT,
      sell_amount: t.pB.SELL_AMOUNT,
    },
    eY = { coins: t.YY.COINS, accounts: t.YY.ACCOUNTS, squads: t.YY.SQUADS },
    eW = {
      1: "ethereum",
      8453: "base",
      56: "bsc",
      143: "monad",
      4663: "robinhood",
      999: "hyperevm",
      57073: "ink",
      5042: "arc",
      4326: "megaeth",
      196: "xlayer",
      137: "polygon",
      42161: "arbitrum",
    };
  function ex(e) {
    return "inbox" === e
      ? eo({
          sourceScreen: t.Ae.NOTIFICATIONS,
          sourceElement: t.k9.NOTIFICATIONS_LIST,
          sourceElementType: t.eD.LIST_ITEM,
          ownershipGroup: "NOTIFICATIONS",
        })
      : eo({
          sourceScreen: t.Ae.RECENT_NOTIFICATIONS_LIST,
          sourceElement: t.k9.NOTIFICATION_INAPP_RECENT_NOTIFICATIONS,
          sourceElementType: t.eD.LIST_ITEM,
          ownershipGroup: "NOTIFICATIONS",
        });
  }
  function eX(e) {
    let t = e.type || "unknown",
      n = (e.title || t).slice(0, 64),
      o = (e.body || e.title || t).slice(0, 512);
    return {
      notifId: e.id,
      notifType: t,
      title: n,
      message: o,
      mint: e.mintAddress || void 0,
    };
  }
  let eq = {
      sourceScreen: t.Ae.REFERRALS_APPLY,
      sourceElement: t.k9.REFERRAL_APPLY_FORM,
      sourceElementType: t.eD.BUTTON,
      ownershipGroup: "GROWTH",
    },
    e$ = {
      sourceScreen: t.Ae.REFERRALS_APPLY,
      sourceElement: t.k9.REFERRAL_APPLY_FORM,
      sourceElementType: t.eD.FORM,
      ownershipGroup: "GROWTH",
    },
    eQ = (e) => eo("onboarding" === e ? e$ : eq),
    ez = {
      picker: {
        sourceScreen: t.Ae.DM_SHARE_PICKER,
        sourceElement: t.k9.DM_SHARE_PICKER_ROW,
        sourceElementType: t.eD.ROW,
        ownershipGroup: "CHAT",
      },
      strip: {
        sourceScreen: t.Ae.UNSPECIFIED,
        sourceElement: t.k9.DM_SHARE_PICKER_ROW,
        sourceElementType: t.eD.IMAGE,
        ownershipGroup: "CHAT",
      },
    },
    eZ = "app-competition-terms",
    eJ = [t.TH.TRADE_COMPETITION],
    e0 = eo({
      sourceScreen: t.Ae.EXPLICIT_NO_SCREEN,
      sourceElementType: t.eD.MODAL,
      ownershipGroup: "FOUNDATION",
    });
  e.s(
    [
      "rc",
      0,
      eh,
      "oj",
      0,
      eS,
      "i9",
      0,
      function (e, t) {
        if ((0, s.L)(t)) return s.z;
        if ((0, s.B)(t)) return s.Q;
        if ((0, en.N)({ mint: e, chainId: t })) {
          let e = (0, en.w)(t);
          return e ? eW[e] : void 0;
        }
        return "solana";
      },
      "gW",
      0,
      function (e) {
        if ("object" == typeof e && null !== e) {
          if (
            "errorContext" in e &&
            "object" == typeof e.errorContext &&
            null !== e.errorContext &&
            "signature" in e.errorContext &&
            "string" == typeof e.errorContext.signature
          )
            return e.errorContext.signature;
          if ("signature" in e && "string" == typeof e.signature)
            return e.signature;
          if (
            "context" in e &&
            "object" == typeof e.context &&
            null !== e.context &&
            "signature" in e.context &&
            "string" == typeof e.context.signature
          )
            return e.context.signature;
        }
      },
      "LN",
      0,
      er,
      "ia",
      0,
      function (e) {
        switch (e) {
          case "google":
            return t.Db.GOOGLE;
          case "apple":
            return t.Db.APPLE;
          case "twitter":
            return t.Db.TWITTER;
          case "github":
            return t.Db.GITHUB;
          case "email":
            return t.Db.EMAIL;
          default:
            return t.Db.UNSPECIFIED;
        }
      },
      "If",
      0,
      function (e) {
        switch (e) {
          case "google":
            return t.U.GOOGLE;
          case "apple":
            return t.U.APPLE;
          case "twitter":
            return t.U.TWITTER;
          case "github":
            return t.U.GITHUB;
          case "email":
            return t.U.EMAIL;
          default:
            return t.U.UNSPECIFIED;
        }
      },
      "v5",
      0,
      eT,
      "kz",
      0,
      function (e) {
        switch (e) {
          case "Phantom":
            return t.U.PHANTOM;
          case "Coinbase Wallet":
            return t.U.COINBASE_WALLET;
          case "Solflare":
            return t.U.SOLFLARE;
          case "Magic Eden":
            return t.U.MAGIC_EDEN;
          case "WalletConnect":
            return t.U.WALLETCONNECT;
          case "Solana Mobile Stack":
          case "Saga":
          case "Seeker":
            return t.U.SOLANA_PHONE;
          default:
            return t.U.OTHER;
        }
      },
      "jT",
      0,
      function () {
        return e_();
      },
      "Wz",
      0,
      function (e) {
        let o = (0, n.pK)({
            authVariant: e.authVariant ?? t.LF.V2,
            errorCategory: e.errorCategory,
            flowType: e.flowType ?? t.LB.LOGIN,
            errorReason: e.errorReason,
            authMethod: e.authMethod,
            authType: e.authType,
          }),
          r = eo({
            sourceScreen: e.screen ?? t.Ae.AUTHENTICATION,
            sourceElement: e.sourceElement ?? t.k9.LOGIN_START,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "FOUNDATION",
          }),
          i = e.walletAddress ? { walletAddress: e.walletAddress } : void 0;
        ((0, Q.j)(o, r, i),
          (0, c.l)({
            error: e.errorReason ?? `auth error: ${e.errorCategory}`,
            feature: "auth",
            operation: "login",
            context: {
              errorCategory: e.errorCategory,
              errorReason: e.errorReason,
              authMethod: e.authMethod,
              authType: e.authType,
              authVariant: e.authVariant ?? t.LF.V2,
              flowType: e.flowType ?? t.LB.LOGIN,
              walletAddress: e.walletAddress,
            },
          }));
      },
      "HX",
      0,
      function (e) {
        let o = (0, n.Ao)({
            authVariant: e.authVariant ?? t.LF.V2,
            flowType: e.flowType ?? t.LB.LOGIN,
            authMethod: e.authMethod,
            authType: e.authType,
          }),
          r = eo({
            sourceScreen: t.Ae.AUTHENTICATION,
            sourceElement: e.sourceElement,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "FOUNDATION",
          });
        (0, Q.j)(o, r);
      },
      "P4",
      0,
      function (e) {
        let o = (0, n.C2)({
            authVariant: e?.authVariant ?? t.LF.V2,
            flowType: e?.flowType ?? t.LB.LOGIN,
            authMethod: e?.authMethod,
            authType: e?.authType,
          }),
          r = eo({
            sourceScreen: e?.screen ?? t.Ae.AUTHENTICATION,
            sourceElement: e?.sourceElement ?? t.k9.LOGIN_START,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "FOUNDATION",
          }),
          i = e?.walletAddress ? { walletAddress: e.walletAddress } : void 0;
        (0, Q.j)(o, r, i);
      },
      "hH",
      0,
      function (e) {
        let o = (0, n.UV)({
          buttonId:
            "create" === e.surface
              ? "callout_attach_image_create"
              : "callout_attach_image_update",
          routePath: window.location.pathname,
        });
        (0, Q.j)(o, {
          sourceScreen: e_(),
          sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
          sourceElementType: t.eD.MODAL,
          ownershipGroup: "DISCOVERY",
        });
      },
      "dE",
      0,
      function (e) {
        let o = (() => {
            switch (e.reason) {
              case "moderation":
                return "callout_create_error_moderation";
              case "media":
                return "callout_create_error_media";
              case "ineligible":
                return "callout_create_error_ineligible";
              case "session":
                return "callout_create_error_session";
              case "network":
                return "callout_create_error_network";
              case "unknown":
                return "callout_create_error_unknown";
            }
          })(),
          r = (0, n.UV)({ buttonId: o, routePath: window.location.pathname });
        ((0, Q.j)(r, {
          sourceScreen: e_(),
          sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
          sourceElementType: t.eD.MODAL,
          ownershipGroup: "DISCOVERY",
        }),
          ("session" === e.reason ||
            "network" === e.reason ||
            "unknown" === e.reason) &&
            (0, c.l)({
              error: e.error ?? `callout create error: ${e.reason}`,
              feature: "callout",
              operation: "create",
              context: { reason: e.reason, mint: e.mint, ...(0, i.M)(e.error) },
            }));
      },
      "bH",
      0,
      function (e) {
        let o = (0, n.UV)({
          buttonId: e.hasImage
            ? "callout_created_with_image"
            : e.hasNote
              ? "callout_created_with_note"
              : "callout_created_no_note",
          routePath: window.location.pathname,
        });
        (0, Q.j)(o, {
          sourceScreen: e_(),
          sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
          sourceElementType: t.eD.MODAL,
          ownershipGroup: "DISCOVERY",
        });
      },
      "au",
      0,
      function (e) {
        let o = (0, n.zI)({
          mint: e.mint,
          fromValue: e.fromValue,
          toValue: e.toValue,
          tab: t.eP.COMMENTS,
        });
        (0, Q.j)(o, eM({ sourceElement: eb.sourceElement }));
      },
      "PF",
      0,
      function (e) {
        let o = (0, n.zI)({
          mint: e.mint,
          fromValue: e.fromValue,
          toValue: e.toValue,
          tab: t.eP.COMMENTS,
        });
        (0, Q.j)(o, eM({ sourceElement: eb.sourceElement }));
      },
      "uP",
      0,
      function (e) {
        let o = (0, n.Pf)({
          mint: e.mint,
          fromValueString: e.fromValue,
          toValueString: e.toValue,
          changeType:
            "chart_type" === e.changeType ? t.y6.CHART_TYPE : t.y6.TIMEFRAME,
        });
        (0, Q.j)(o, eM({ sourceElement: t.k9.CHART }));
      },
      "j$",
      0,
      function (e) {
        let o = (0, n.i)({
          type: t.WQ.Y_AXIS,
          fromValue: e.fromValue,
          toValue: e.toValue,
          mint: e.mint,
        });
        (0, Q.j)(o, eM({ sourceElement: t.k9.CHART }));
      },
      "hl",
      0,
      function (e) {
        let o = (0, n.i)({
          type: eB[e.setting],
          fromValue: e.enabled ? "off" : "on",
          toValue: e.enabled ? "on" : "off",
          mint: e.mint,
        });
        (0, Q.j)(o, eM({ sourceElement: t.k9.CHART_SETTINGS_MODAL }));
      },
      "bl",
      0,
      function (e) {
        let o = (0, n.jT)({
          mint: e.mint,
          fromValueString: e.fromTimeframe,
          toValueString: e.toTimeframe,
          changeType: t.jQ.TIMEFRAME,
        });
        (0, Q.j)(o, eM({ sourceElement: t.k9.UNSPECIFIED }));
      },
      "TK",
      0,
      function (e) {
        let t = (0, n.zI)({
          mint: e.mint,
          fromValue: e.fromValue,
          toValue: e.toValue,
          tab: eU.tab,
        });
        (0, Q.j)(t, eM({ sourceElement: eU.sourceElement }));
      },
      "qm",
      0,
      function (e) {
        let o = (0, n.ut)({
          metrics: e.hasMetricsFilter ?? !1,
          audit: !1,
          socials: !1,
          bondingCurve: !1,
          searchTerm: !1,
          exclTerm: !1,
          filtersSet: e.filtersSet,
          status: "apply" === e.status ? t.eI.APPLY : t.eI.CLEAR,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.HOME,
            sourceElement: t.k9.UNSPECIFIED,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "DISCOVERY",
          }),
        );
      },
      "ze",
      0,
      function (e) {
        let o = (0, n.vB)({
          fromLayout: ed[e.fromLayout],
          toLayout: ed[e.toLayout],
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.HOME,
            sourceElement: t.k9.UNSPECIFIED,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "DISCOVERY",
          }),
        );
      },
      "_i",
      0,
      function (e) {
        let o = (0, n.np)({
          type: t.Z3.TRADE_DIRECTION,
          fromValue: e.fromValue,
          toValue: e.toValue,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.COIN_DETAILS,
            sourceElement: t.k9.TRADE_MODAL,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "BLOCKCHAIN",
          }),
        );
      },
      "UJ",
      0,
      function (e) {
        let {
            settingType: o,
            sourceScreen: r,
            sourceElement: i,
          } = eH(e.surface),
          s = "buy_amount" === e.type || "sell_amount" === e.type,
          a = (0, n.C4)({
            type: eK[e.type],
            fromValues: s ? e.fromValues : [],
            toValues: s ? e.toValues : [],
            fromBool: "auto_approve" === e.type ? e.fromBool : void 0,
            toBool: "auto_approve" === e.type ? e.toBool : void 0,
            fromText: "fromText" in e ? e.fromText : void 0,
            toText: "toText" in e ? e.toText : void 0,
            settingType: o,
          });
        (0, Q.j)(
          a,
          eo({
            sourceScreen: r,
            sourceElement: i,
            sourceElementType: t.eD.MODAL,
            ownershipGroup: "BLOCKCHAIN",
          }),
        );
      },
      "jK",
      0,
      function (e) {
        let t = (0, n.OK)({
          mint: e.mint,
          fromValue: e.fromValue,
          toValue: e.toValue,
          tab: eg.tab,
        });
        (0, Q.j)(t, eM({ sourceElement: eg.sourceElement }));
      },
      "DH",
      0,
      function (e) {
        let o = (0, n.$k)({
          operationStatus: "success" === e.status ? t.Cj.SUCCESS : t.Cj.FAIL,
          rewardsType: e.rewardsType,
          usdAmount: e.usdAmount,
          solAmount: e.solAmount,
          message: e.message,
        });
        (0, Q.j)(o, eR(e.source));
      },
      "eT",
      0,
      function (e) {
        let o = "line" === e.view,
          r = (0, n.r0)({
            mint: e.mint,
            provider: o ? t.ex.LIVELINE : t.ex.TRADING_VIEW,
            type: o ? t.vv.LINE : t.vv.CANDLESTICK,
          });
        (0, Q.j)(r, eM({ sourceElement: t.k9.CHART }));
      },
      "V$",
      0,
      function (e) {
        let o = (0, n.Qe)({
          mint: e.mint,
          contentId: e.contentId,
          chain: eh(e.chain),
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: e_(),
            sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.FORM,
            ownershipGroup: "DISCOVERY",
          }),
        );
      },
      "rE",
      0,
      function (e) {
        let o = "applied" === e.outcome || "alreadyReferred" === e.outcome,
          r = (0, n.pB)({
            referralCode: e.code,
            entryType: e.entryType ?? t.ow.MANUAL,
            referrerAddress: "",
            status: o ? t.pr.SUCCESS : t.pr.FAIL,
            message: e.outcome,
            operationStatus: o ? t.Cj.SUCCESS : t.Cj.FAIL,
          });
        (0, Q.j)(r, eQ(e.source ?? "profile"));
      },
      "Oo",
      0,
      function (e) {
        let t = (0, n.Cb)({
          amount: e.amount,
          mint: e.mint,
          tokenName: e.tokenName,
          recipientAddress: e.recipientAddress,
          usdAmount: e.usdAmount,
        });
        (0, Q.j)(t, ek());
      },
      "iV",
      0,
      function (e) {
        var o;
        let r, i;
        ((o = {
          mint: e.coinId,
          screen: e.sourceScreen,
          usdMarketCap: e.marketCap,
          absolutePosition: e.itemPosition,
          recommendationId: e.rec_id,
          recommendationRank: e.recommendationRank,
          program: t.SI.PUMP,
          sourceElement: e.sourceElement,
          isLivestreamActive: e.isLivestreamActive,
        }),
          (r = (0, n.KE)({
            interactionType: o.interactionType || t.EG.CLICK,
            mint: o.mint,
            usdMarketCap: o.usdMarketCap,
            program: o.program,
            isLivestreamActive: o.isLivestreamActive,
            absolutePosition: o.absolutePosition,
            relativePosition: o.relativePosition,
            recommendationRank: o.recommendationRank,
            recommendationId: o.recommendationId,
            recommendationScore: o.recommendationScore,
            isPinned: o.isPinned ?? z(o.sourceElement, o.recommendationId),
          })),
          (i = eo({
            sourceScreen: o.screen,
            sourceElement: o.sourceElement || t.k9.COIN_ROW,
            sourceElementType: t.eD.LIST_ITEM,
            ownershipGroup: "DISCOVERY",
          })),
          (0, Q.j)(r, i));
      },
      "$X",
      0,
      function (e) {
        let o =
            e.feeSharing && !e.error.startsWith("[fee-sharing]")
              ? `[fee-sharing] ${e.error}`
              : e.error,
          r = (0, n.Wa)({
            isFree: e.isFree,
            tokensBought: e.tokensBought,
            solPaid: e.solPaid,
            isMayhemMode: e.isMayhemMode ?? !1,
            mayhemTriggerMode: eI({
              isMayhemMode: e.isMayhemMode ?? !1,
              mode: e.mayhemTriggerMode,
            }),
            recreateCoinMayhem: e.recreateCoinMayhem ?? !1,
            isTokenizedAgentMint: e.isTokenizedAgent ?? !1,
            tokenizedAgentBuybackBps: e.buybackBps ?? 0,
            error: o,
            signature: e.signature,
            assetType: e.assetType,
          }),
          i = eo({
            sourceScreen: e.screen || t.Ae.CREATE_COIN,
            sourceElement: t.k9.UNSPECIFIED,
            sourceElementType: t.eD.UNSPECIFIED,
            ownershipGroup: "BLOCKCHAIN",
          });
        ((0, Q.j)(r, i),
          (0, c.l)({
            error: o,
            feature: "coin-creation",
            operation: e.isFree ? "create-free" : "create-paid",
            context: {
              isMayhemMode: e.isMayhemMode,
              isTokenizedAgent: e.isTokenizedAgent,
              feeSharing: e.feeSharing,
              assetType: e.assetType,
              signature: e.signature,
              quoteMint: e.quoteMint,
              prepSignature: e.prepSignature,
            },
          }));
      },
      "vR",
      0,
      function (e) {
        let o = (0, n.O_)({
            mint: e.mint,
            isFree: e.isFree,
            tokensBought: e.tokensBought,
            solPaid: e.solPaid,
            isMayhemMode: e.isMayhemMode ?? !1,
            recreateCoinMayhem: e.recreateCoinMayhem ?? !1,
            isTokenizedAgentMint: e.isTokenizedAgent ?? !1,
            tokenizedAgentBuybackBps: e.buybackBps ?? 0,
            signature: e.signature,
            assetType: e.assetType,
            timeToConfirm: e.timeToConfirm,
            mayhemTriggerMode: eI({
              isMayhemMode: e.isMayhemMode ?? !1,
              mode: e.mayhemTriggerMode,
            }),
          }),
          r = eo({
            sourceScreen: e.screen || t.Ae.CREATE_COIN,
            sourceElement: t.k9.UNSPECIFIED,
            sourceElementType: t.eD.UNSPECIFIED,
            ownershipGroup: "BLOCKCHAIN",
          });
        (0, Q.j)(o, r);
      },
      "DI",
      0,
      function (e) {
        let o = (0, n.UV)({
          buttonId: `CoinShareBlocked:${e.inAppBrowser}`,
          routePath: window.location.pathname,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.COIN_DETAILS,
            sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.SCREEN,
            ownershipGroup: "FOUNDATION",
          }),
        );
      },
      "lT",
      0,
      function (e) {
        let o = "explore" === e.table,
          r = (0, n.ut)({
            metrics: !1,
            audit: !1,
            socials: !1,
            bondingCurve: !1,
            searchTerm: !1,
            exclTerm: !1,
            filtersSet: {
              table: e.table,
              action: e.action,
              columnId: e.columnId ?? "",
              value: e.value ?? "",
            },
            status: t.eI.APPLY,
          });
        (0, Q.j)(
          r,
          eo({
            sourceScreen: e.sourceScreen ?? (o ? t.Ae.HOME : t.Ae.COIN_DETAILS),
            sourceElement: t.k9.UNSPECIFIED,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: o ? "DISCOVERY" : "COIN_DETAILS",
          }),
        );
      },
      "FI",
      0,
      function () {
        (0, Q.j)(
          (0, n.gV)({
            tosVersion: eZ,
            agreements: eJ,
            actionType: t.su.AGREED,
          }),
          e0,
        );
      },
      "_O",
      0,
      function () {
        (0, Q.j)((0, n.tF)({ tosVersion: eZ, agreements: eJ }), e0);
      },
      "Lw",
      0,
      function (e) {
        let o = (0, n.UV)({
            buttonId: `ConnectWallet:${e.source}`,
            routePath: window.location.pathname,
          }),
          r = eo({
            sourceScreen: e_(e.screen),
            sourceElement: t.k9.LOGIN_BUTTON,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "FOUNDATION",
          });
        (0, Q.j)(o, r);
      },
      "uo",
      0,
      function (e) {
        let o = (0, n.UV)({
          buttonId: "PositionsDustFloorSave",
          routePath: window.location.pathname,
        });
        (0, Q.j)(
          o,
          "info-bar" === e.surface
            ? eo({
                sourceScreen: e_(),
                sourceElement: eA.positions,
                sourceElementType: t.eD.BUTTON,
                ownershipGroup: "DISCOVERY",
              })
            : eC(!0),
        );
      },
      "EO",
      0,
      function () {
        let e = (0, n.n2)({});
        (0, Q.j)(e, eo(e$));
      },
      "kv",
      0,
      function (e) {
        let o = (0, n.UV)({
          buttonId: {
            hide: "InfoBarHideToken",
            unhide: "InfoBarUnhideToken",
            "unhide-all": "InfoBarUnhideAllTokens",
            "hide-stablecoins-on": "InfoBarHideStablecoins",
            "hide-stablecoins-off": "InfoBarShowStablecoins",
            "hide-position": "InfoBarHidePosition",
            "unhide-position": "InfoBarUnhidePosition",
            "hide-profile": "InfoBarHideProfile",
            "unhide-profile": "InfoBarUnhideProfile",
            "unhide-all-profiles": "InfoBarUnhideAllProfiles",
          }[e.action],
          routePath: window.location.pathname,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: e_(),
            sourceElement: eA[e.mode],
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "DISCOVERY",
          }),
        );
      },
      "oN",
      0,
      function (e) {
        let o = (0, n.BN)({
          interactionType: e.interactionType ?? t.EG.CLICK,
          profileId: e.profileId,
          viewedUserId: e.viewedUserId,
          socialType: e.socialType,
          isOwn: e.isOwn,
        });
        (0, Q.j)(o, eC(e.isOwn));
      },
      "Op",
      0,
      function (e) {
        let o = (0, n.wd)({
          interactionType: t.EG.CLICK,
          mint: e.mint,
          watchlistType: t.TK.COIN,
        });
        (0, Q.j)(o, eP({ screen: e.screen, sourceElement: e.sourceElement }));
      },
      "jV",
      0,
      function (e) {
        let o = (0, n.D2)({
          referralCode: e.code,
          interactionType: t.EG.CLICK,
        });
        (0, Q.j)(o, eQ(e.source ?? "profile"));
      },
      "YS",
      0,
      function (e) {
        let o = (0, n.cN)({
          interactionType: t.EG.CLICK,
          mint: e.mint,
          isInline: !1,
          tab: eU.tab,
        });
        (0, Q.j)(o, eM({ sourceElement: eU.sourceElement }));
      },
      "ie",
      0,
      function (e) {
        let o = eS(e.surface),
          r = (0, n.KE)({
            interactionType: t.EG.CLICK,
            mint: e.mint,
            calloutId: e.calloutId,
            usdMarketCap: e.usdMarketCap,
            program: t.SI.PUMP,
            absolutePosition: e.absolutePosition ?? 0,
            relativePosition: e.relativePosition,
            recommendationId: e.recommendationId,
            recommendationRank: e.recommendationRank,
            positionId: e.positionId,
            chain: e.chain,
          });
        (0, Q.j)(r, { ...o, ownershipGroup: "DISCOVERY" });
      },
      "Ke",
      0,
      function (e) {
        let o = e?.interactionType === "dismiss",
          r = (0, n.hS)({
            upsellType: t.Nb.PUMP_APP,
            interactionType: o ? t.EG.DISMISS : t.EG.CLICK,
          });
        (0, Q.j)(r, eL());
      },
      "D",
      0,
      function (e) {
        let o = eS(e.surface),
          r = (0, n.uY)({
            interactionType: t.EG.CLICK,
            mint: e.mint,
            profileUserId: e.profileUserId,
            calloutId: e.calloutId,
            chain: e.chain,
            recommendationId: e.recommendationId,
            recommendationRank: e.recommendationRank,
            positionId: e.positionId,
          });
        (0, Q.j)(r, { ...o, ownershipGroup: "PROFILES" });
      },
      "fy",
      0,
      function (e) {
        let o = (0, n.jg)({
          interactionType: t.EG.CLICK,
          isEnabled: e.isEnabled,
        });
        (0, Q.j)(o, eM({ sourceElement: t.k9.CHART_SETTINGS_MODAL }));
      },
      "wP",
      0,
      function (e) {
        var o;
        let r =
            ((o = { mint: e.mint, actionType: e.actionType }), (0, n.QX)(o)),
          i = eo({
            sourceScreen: t.Ae.COIN_DETAILS,
            sourceElement: 211,
            sourceElementType: t.eD.MODAL,
            ownershipGroup: "BLOCKCHAIN",
          });
        (0, Q.j)(r, i);
      },
      "dQ",
      0,
      function (e) {
        let o = (0, n.G8)({
            linkType: 3,
            interactionType: e?.interactionType ?? t.EG.CLICK,
          }),
          r = eo({
            sourceScreen: t.Ae.COIN_DETAILS,
            sourceElement: 212,
            sourceElementType: t.eD.MODAL,
            ownershipGroup: "BLOCKCHAIN",
          });
        (0, Q.j)(o, r);
      },
      "Pd",
      0,
      function (e) {
        let o = (0, n.A)({
          interactionType: t.EG.CLICK,
          mint: e.mint,
          userType: eV[e.userType],
          displayType: t.rn.SINGLE_USER,
        });
        (0, Q.j)(o, eM({ sourceElement: t.k9.CHART }));
      },
      "km",
      0,
      function (e) {
        let o = (0, n.yI)({
          interactionType: t.EG.PRESS,
          rewardsType: e.rewardsType,
          usdAmount: e.usdAmount,
          solAmount: e.solAmount,
        });
        (0, Q.j)(o, eR(e.source));
      },
      "bG",
      0,
      function (e) {
        let o = (0, n.F8)({
          interactionType: e.interactionType ?? t.EG.CLICK,
          searchTerm: e.searchTerm.trim() || void 0,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.SEARCH,
            sourceElement: t.k9.SEARCH_INPUT,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "DISCOVERY",
          }),
        );
      },
      "gC",
      0,
      function (e) {
        let o = (0, n.LT)({ interactionType: t.EG.CLOSE, mint: e.mint });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.COIN_DETAILS,
            sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.SCREEN,
            ownershipGroup: "COIN_DETAILS",
          }),
        );
      },
      "em",
      0,
      function (e) {
        let o = (0, n.uY)({
          interactionType: t.EG.CLICK,
          mint: e.mint,
          profileUserId: e.profileUserId,
          tab: eU.tab,
          source: "coin_holders",
        });
        (0, Q.j)(o, eM({ sourceElement: eU.sourceElement }));
      },
      "c8",
      0,
      function (e) {
        let o = (0, n.zS)({ interactionType: t.EG.CLICK, mint: e.mint });
        (0, Q.j)(o, eM({ sourceElement: t.k9.COIN_HEADER }));
      },
      "M5",
      0,
      function (e) {
        eN({
          shareType: t.qp.COIN,
          shareMethod: e.shareMethod,
          mint: e.mint,
          shareUrl: e.shareUrl,
          source: {
            sourceScreen: e.screen ?? t.Ae.COIN_DETAILS,
            sourceElement: t.k9.COIN_HEADER,
            sourceElementType: t.eD.MODAL,
            ownershipGroup: "COIN_DETAILS",
          },
        });
      },
      "Vh",
      0,
      function (e) {
        let o = (0, n.ox)({
          interactionType: t.EG.CLICK,
          mint: e.mint,
          target: e.target,
          tab: t.eP.INFO,
        });
        (0, Q.j)(o, eM({ sourceElement: t.k9.COIN_DETAILS_SUMMARY_CARD }));
      },
      "kJ",
      0,
      function (e) {
        let o =
            "holders" === e.tab
              ? eU
              : "callouts" === e.tab
                ? eb
                : "about" === e.tab
                  ? eG
                  : "communities" === e.tab
                    ? ev
                    : "yours" === e.tab
                      ? ej
                      : eg,
          r = (0, n.jy)({
            interactionType: t.EG.CLICK,
            mint: e.mint,
            tab: o.tab,
          });
        (0, Q.j)(r, eM({ sourceElement: o.sourceElement }));
      },
      "Hr",
      0,
      function (e) {
        let o = (0, n.uY)({
          interactionType: t.EG.CLICK,
          mint: e.mint,
          profileUserId: e.profileUserId,
          tab: eg.tab,
          source: "coin_trades",
        });
        (0, Q.j)(o, eM({ sourceElement: eg.sourceElement }));
      },
      "ew",
      0,
      function (e) {
        let o = (0, n.Sv)({ interactionType: e.interactionType ?? t.EG.CLICK }),
          r = eo({
            sourceScreen: t.Ae.AUTHENTICATION,
            sourceElement: e.sourceElement,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "FOUNDATION",
          });
        (0, Q.j)(o, r);
      },
      "Lg",
      0,
      function (e) {
        let o = (0, n.Vh)({
          interactionType: t.EG.CLICK,
          type: t.dK.COIN_ADDRESS,
          mint: e.mint,
          message: e.mint,
        });
        (0, Q.j)(o, eP({ screen: e.screen, sourceElement: e.sourceElement }));
      },
      "Sl",
      0,
      function (e) {
        let o = (0, n.Vh)({
          interactionType: t.EG.CLICK,
          type: t.dK.COIN_ADDRESS,
          mint: e.mint,
          message: e.mint,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: e_(),
            sourceElement: e.sourceElement,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "PROFILES",
          }),
        );
      },
      "J1",
      0,
      function (e) {
        let o = (0, n.Vh)({
          interactionType: t.EG.CLICK,
          type: t.dK.REFERRAL_CODE,
          message: e.code,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.REFERRALS_REFER,
            sourceElement: t.k9.REFERRAL_CODE_BOX,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "GROWTH",
          }),
        );
      },
      "_2",
      0,
      function (e) {
        let o = (0, n.Vh)({
          interactionType: t.EG.CLICK,
          type: t.dK.PROFILE_SHARE_LINK,
          message: e.code,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.REFERRALS_REFER,
            sourceElement: t.k9.REFERRAL_SHARE,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "GROWTH",
          }),
        );
      },
      "Af",
      0,
      function (e) {
        let o = (0, n.Vh)({
          interactionType: t.EG.CLICK,
          type: t.dK.REFERRAL_CODE,
          message: e.code,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.REFERRALS_APPLY,
            sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "FOUNDATION",
          }),
        );
      },
      "nI",
      0,
      function (e) {
        let o = (0, n.Vh)({
          interactionType: t.EG.CLICK,
          type: t.dK.WALLET_ADDRESS,
          message: e?.address ?? "",
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: e_(e?.screen),
            sourceElement: e?.sourceElement ?? t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: e?.sourceElementType ?? t.eD.BUTTON,
            ownershipGroup: ey,
          }),
        );
      },
      "SX",
      0,
      function (e) {
        let o = (0, n.xn)({
          mint: e.mint,
          calloutId: e.calloutId,
          parentReplyId: e.parentReplyId,
          chain: e.chain,
          recommendationId: e.recommendationId,
          recommendationRank: e.recommendationRank,
          positionId: e.positionId,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: e_(),
            sourceElement: t.k9.CALLOUTS_CARD_OTHER,
            sourceElementType: t.eD.FORM,
            ownershipGroup: "DISCOVERY",
          }),
        );
      },
      "Sw",
      0,
      function (e) {
        let t = eS(e.surface),
          o = (0, n.NE)({
            mint: e.mint,
            calloutId: e.calloutId,
            isQuote: e.isQuote,
            recommendationId: e.recommendationId,
            recommendationRank: e.recommendationRank,
            positionId: e.positionId,
          });
        (0, Q.j)(o, { ...t, ownershipGroup: "DISCOVERY" });
      },
      "xm",
      0,
      function (e) {
        let o = (0, n.GY)({
          interactionType: t.EG.CLICK,
          token: e?.token ?? "SOL",
          depositMethod: e?.depositProviderType ?? t.IA.MANUAL,
        });
        (0, Q.j)(o, ew());
      },
      "ih",
      0,
      function (e) {
        let o = (0, n.ht)({
          interactionType: t.EG.CLICK,
          provider: t.WW.MANUAL,
          blockchain: e.blockchain,
        });
        (0, Q.j)(o, ew());
      },
      "Z7",
      0,
      function (e) {
        let o = e?.source === "topbar",
          r = (0, n.O$)({
            interactionType: t.EG.CLICK,
            actionType: t.St.EDIT_PROFILE,
          });
        (0, Q.j)(
          r,
          eo({
            sourceScreen: o ? e_() : t.Ae.PROFILE,
            sourceElement: o
              ? t.k9.EXPLICIT_NO_ELEMENT
              : t.k9.PROFILE_CONTENT_MINE,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "PROFILES",
          }),
        );
      },
      "Gu",
      0,
      function () {
        let e = (0, n.UV)({
          buttonId: "ExportWallet",
          routePath: window.location.pathname,
        });
        (0, Q.j)(e, eD());
      },
      "L8",
      0,
      function (e) {
        let o = (0, n.H4)({
          interactionType: t.EG.CLICK,
          profileId: e.profileId,
          viewedUserId: e.viewedUserId,
          actionType: "follow" === e.action ? t.M3.FOLLOW : t.M3.UNFOLLOW,
          mint: e.attribution?.mint,
          calloutId: e.attribution?.calloutId,
          chain: e.attribution?.chain,
          recommendationId: e.attribution?.recommendationId,
          recommendationRank: e.attribution?.recommendationRank,
          positionId: e.attribution?.positionId,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: e_(),
            sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "PROFILES",
          }),
        );
      },
      "$j",
      0,
      function (e) {
        let o = (0, n.RO)({ interactionType: t.EG.CLICK, tabName: e.toValue });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.HOME,
            sourceElement: t.k9.UNSPECIFIED,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "DISCOVERY",
          }),
        );
      },
      "Ui",
      0,
      function (e) {
        let o = eS(e.surface),
          r = (0, n.sk)({
            interactionType: t.EG.CLICK,
            mint: e.mint,
            calloutId: e.calloutId,
            isLiked: e.isLiked,
            chain: e.chain,
            thesisText: e.thesisText || void 0,
            recommendationId: e.recommendationId,
            recommendationRank: e.recommendationRank,
            positionId: e.positionId,
          });
        (0, Q.j)(r, { ...o, ownershipGroup: "DISCOVERY" });
      },
      "Rp",
      0,
      function (e) {
        let o = (0, n.s3)({
            interactionType: e.interactionType ?? t.EG.CLICK,
            loginType: e.loginType,
            loginMethod: e.loginMethod,
          }),
          r = eo({
            sourceScreen: t.Ae.AUTHENTICATION,
            sourceElement: e.sourceElement,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "FOUNDATION",
          });
        (0, Q.j)(o, r);
      },
      "Qz",
      0,
      function (e) {
        let o = (0, n.ej)({
            interactionType: t.EG.CLICK,
            profileId: e.address,
            leaderboardRank: e.leaderboardRank,
          }),
          r = eo({
            sourceScreen: t.Ae.MAYHEM,
            sourceElement: t.k9.MAYHEM_TOP_TRADERS_FEED,
            sourceElementType: t.eD.LIST_ITEM,
            ownershipGroup: "MAYHEM",
          });
        (0, Q.j)(o, r);
      },
      "j_",
      0,
      function (e) {
        let o = (0, n.JZ)({ ...eX(e.item), action: t.lg.PRIMARY });
        (0, Q.j)(o, ex(e.surface));
      },
      "WA",
      0,
      function () {
        let e = (0, n.yd)({ interactionType: t.EG.CLICK });
        (0, Q.j)(
          e,
          eo({
            sourceScreen: t.Ae.PROFILE,
            sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "PROFILES",
          }),
        );
      },
      "Do",
      0,
      function (e) {
        let o = (0, n.KE)({ interactionType: t.EG.CLICK, mint: e });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.NOTIFICATION_TOAST,
            sourceElement: t.k9.NOTIFICATION_WEB_TOAST,
            sourceElementType: t.eD.LINK,
            ownershipGroup: "NOTIFICATIONS",
          }),
        );
      },
      "Te",
      0,
      function (e) {
        let o = (0, n.KE)({ interactionType: t.EG.CLICK, mint: e });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.HOME,
            sourceElement: t.k9.COIN_ROW_QUICK_BUY,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "DISCOVERY",
          }),
        );
      },
      "Yz",
      0,
      function (e) {
        let o = (0, n.RT)({
          shareType: e?.shareType ?? t.qp.COIN,
          wrappedWalletAddresses: [],
        });
        (0, Q.j)(o, eP({ screen: e?.screen, sourceElement: e?.sourceElement }));
      },
      "VL",
      0,
      function (e) {
        let t = (0, n.UV)({
          buttonId:
            "usdc" === e.from
              ? "positions_usdc_balance"
              : "positions_sol_balance",
          routePath: window.location.pathname,
        });
        (0, Q.j)(t, ew());
      },
      "EN",
      0,
      function (e) {
        let o = (0, n.RT)({
          shareType: e.shareType,
          wrappedWalletAddresses: [],
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: e.source?.sourceScreen ?? e_(),
            sourceElement: e.source?.sourceElement ?? t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: e.source?.sourceElementType ?? t.eD.BUTTON,
            ownershipGroup: e.source?.ownershipGroup ?? "GROWTH",
          }),
        );
      },
      "Ie",
      0,
      function (e) {
        let o = (0, n.ov)({
          interactionType: e.interactionType ?? t.EG.CLICK,
          mint: e.mint,
          usdMarketCap: e.usdMarketCap,
          program: e.program ? er(e.program) : void 0,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: e.sourceScreen ?? t.Ae.HOME,
            sourceElement: e.sourceElement ?? t.k9.COIN_ROW_QUICK_BUY,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "DISCOVERY",
          }),
        );
      },
      "Kj",
      0,
      function () {
        let e = (0, n.UV)({
          buttonId: "positions_spending_power",
          routePath: window.location.pathname,
        });
        (0, Q.j)(e, ew());
      },
      "_j",
      0,
      function (e) {
        let o = (0, n.A5)({ interactionType: t.EG.CLICK });
        (0, Q.j)(o, ew(e?.screen));
      },
      "Cv",
      0,
      function (e) {
        let o = (0, n.o_)({ interactionType: t.EG.CLICK, wallet: e.wallet });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.SEARCH,
            sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.FORM,
            ownershipGroup: "DISCOVERY",
          }),
        );
      },
      "pL",
      0,
      function (e) {
        let o = (0, n.it)({ interactionType: t.EG.CLICK, mint: e.mint });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.SEARCH,
            sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.FORM,
            ownershipGroup: "DISCOVERY",
          }),
        );
      },
      "Io",
      0,
      function (e) {
        let o = (0, n.RO)({ interactionType: t.EG.CLICK, tabName: e.tabName });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.PROFILE,
            sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "PROFILES",
          }),
        );
      },
      "P8",
      0,
      function () {
        let e = (0, n.Zq)({ interactionType: t.EG.CLICK });
        (0, Q.j)(
          e,
          eo({
            sourceScreen: t.Ae.SEARCH,
            sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.FORM,
            ownershipGroup: "DISCOVERY",
          }),
        );
      },
      "iu",
      0,
      function (e) {
        let o = e.searchTerm.trim();
        if (!o) return;
        let r = (0, n.D3)({
          searchType: e.searchType,
          searchTerm: o,
          timeToLoad: e.timeToLoadMs,
          resultCount: e.resultCount,
          chains: [],
          launchpadFilters: [],
        });
        (0, Q.j)(
          r,
          eo({
            sourceScreen: t.Ae.SEARCH,
            sourceElement: t.k9.SEARCH_INPUT,
            sourceElementType: t.eD.FORM,
            ownershipGroup: "DISCOVERY",
          }),
        );
      },
      "mM",
      0,
      function (e) {
        let o = (0, n.dB)({ interactionType: t.EG.CLICK, tab: eY[e.tab] });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.SEARCH,
            sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "DISCOVERY",
          }),
        );
      },
      "ch",
      0,
      function (e) {
        let o = (0, n.UV)({
          buttonId: `SelectWallet:${e.walletName}`,
          routePath: window.location.pathname,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: e_(),
            sourceElement: t.k9.ACCOUNT_LIST,
            sourceElementType: t.eD.MODAL,
            ownershipGroup: ey,
          }),
        );
      },
      "fG",
      0,
      eN,
      "t4",
      0,
      function (e) {
        let o = eS(e.surface),
          r = (0, n.YJ)({
            interactionType: t.EG.CLICK,
            mint: e.mint,
            shareType: t.qp.COIN,
            calloutId: e.calloutId,
            chain: e.chain,
            recommendationId: e.recommendationId,
            recommendationRank: e.recommendationRank,
            positionId: e.positionId,
          });
        (0, Q.j)(r, {
          ...o,
          sourceElementType: t.eD.MODAL,
          ownershipGroup: "DISCOVERY",
        });
      },
      "vT",
      0,
      function () {
        let e = (0, n.UV)({
          buttonId: "referral_code_skip",
          routePath: window.location.pathname,
        });
        (0, Q.j)(e, eo(e$));
      },
      "rX",
      0,
      function (e) {
        let t = (0, n.UV)({
          buttonId:
            "usdc" === e.asset
              ? "spending_power_deposit_usdc"
              : "spending_power_deposit_sol",
          routePath: window.location.pathname,
        });
        (0, Q.j)(t, ew());
      },
      "Ng",
      0,
      function (e) {
        let o = (0, n.RO)({ interactionType: t.EG.CLICK, tabName: e.tabName });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.PROFILE,
            sourceElement: t.k9.UNSPECIFIED,
            sourceElementType: t.eD.TAB,
            ownershipGroup: "PROFILES",
          }),
        );
      },
      "FN",
      0,
      function (e) {
        let o = (0, n.UX)({ interactionType: t.EG.CLICK }),
          r = eo({
            sourceScreen: e_(e?.screen),
            sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "FOUNDATION",
          });
        (0, Q.j)(o, r);
      },
      "tu",
      0,
      function (e) {
        let o = {
            interactionType: t.EG.CLICK,
            mint: e.mint,
            replyId: e.replyId,
            tab: t.eP.COMMENTS,
            recommendationId: e.recommendationId,
            recommendationRank: e.recommendationRank,
          },
          r = e.isLiked ? (0, n.eA)(o) : (0, n.m8)(o);
        (0, Q.j)(
          r,
          e.surface
            ? { ...eS(e.surface), ownershipGroup: "DISCOVERY" }
            : eo({
                sourceScreen: e_(),
                sourceElement: t.k9.CALLOUTS_FEED_OTHER,
                sourceElementType: t.eD.LIST_ITEM,
                ownershipGroup: "DISCOVERY",
              }),
        );
      },
      "h4",
      0,
      function (e) {
        let {
            settingType: o,
            sourceScreen: r,
            sourceElement: i,
          } = eH(e.surface ?? "trade_modal"),
          s = "buy" === e.tradeDirection,
          a = (0, n.kW)({
            interactionType: t.EG.CLICK,
            mint: e.mint,
            tradeDirection: s ? t.R1.BUY : t.R1.SELL,
            buyAmount: s ? e.amountLabel : void 0,
            sellPercentage: s ? void 0 : e.amountLabel,
            tradeType: o,
          });
        (0, Q.j)(
          a,
          eo({
            sourceScreen: r,
            sourceElement: i,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "BLOCKCHAIN",
          }),
        );
      },
      "BB",
      0,
      function (e) {
        let o = (0, n.lj)({
          interactionType: t.EG.CLICK,
          numTokens: e.numTokens,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.PROFILE,
            sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "PROFILES",
          }),
        );
      },
      "lG",
      0,
      function (e) {
        let o = (0, n.T)({
          interactionType: t.EG.CLICK,
          mint: e.mint,
          tradeDirection: "buy" === e.tradeDirection ? t.R1.BUY : t.R1.SELL,
          isFullScreen: e.isFullScreen,
          chain: eh(e.chain),
          recommendationId: e.recommendationId,
          calloutId: e.calloutId,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.COIN_DETAILS,
            sourceElement: t.k9.TRADE_MODAL,
            sourceElementType: t.eD.FORM,
            ownershipGroup: "BLOCKCHAIN",
          }),
        );
      },
      "iK",
      0,
      function () {
        let e = (0, n.UV)({
          buttonId: "TwoFactorManage",
          routePath: window.location.pathname,
        });
        (0, Q.j)(e, eD());
      },
      "GK",
      0,
      function () {
        let e = (0, n.UV)({
          buttonId: "TwoFactorSetup",
          routePath: window.location.pathname,
        });
        (0, Q.j)(e, eD());
      },
      "H0",
      0,
      function (e) {
        let o = (0, n.mX)({
          interactionType: t.EG.CLICK,
          mint: e.mint,
          calloutId: e.calloutId,
          entryPoint: e.entryPoint,
          chain: e.chain,
          recommendationId: e.recommendationId,
          recommendationRank: e.recommendationRank,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: e_(),
            sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "DISCOVERY",
          }),
        );
      },
      "Kw",
      0,
      function (e) {
        let o = "dismiss" === e.interactionType,
          r = (0, n.cq)({
            interactionType: o ? t.EG.DISMISS : t.EG.CLICK,
            ctaType: 25,
            actionType: o
              ? t.cP.CTA_ACTION_TYPE_DISMISS
              : t.cP.CTA_ACTION_TYPE_CLICK,
            ctaId: "welcome_to_pump",
          });
        (0, Q.j)(r, eO(213));
      },
      "jU",
      0,
      function (e) {
        let o = (0, n.G8)({
          linkType: e.linkType,
          interactionType: t.EG.CLICK,
        });
        (0, Q.j)(o, eO(214));
      },
      "sT",
      0,
      function (e) {
        let o = (0, n.cP)({
          interactionType: t.EG.CLICK,
          isOwn: !0,
          profileId: e?.profileId ?? "",
        });
        (0, Q.j)(o, eD());
      },
      "wO",
      0,
      function (e) {
        let o = (0, n._n)({
          interactionType: t.EG.CLICK,
          amount: e.amount,
          mint: e.mint,
          tokenName: e.tokenName,
          recipientAddress: e.recipientAddress,
          usdAmount: e.usdAmount,
        });
        (0, Q.j)(o, ek());
      },
      "Et",
      0,
      function (e) {
        let o = (0, n.UV)({
            buttonId: "Login",
            routePath: window.location.pathname,
          }),
          r = eo({
            sourceScreen: e_(e),
            sourceElement: t.k9.LOGIN_BUTTON,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "FOUNDATION",
          });
        (0, Q.j)(o, r);
      },
      "Nb",
      0,
      function (e) {
        let o = (0, n.iy)({
            interactionType: t.EG.CLICK,
            authMethod: e?.authMethod,
            authType: e?.authType,
          }),
          r = eo({
            sourceScreen: e_(e?.screen),
            sourceElement: t.k9.LOGOUT_BUTTON,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "FOUNDATION",
          }),
          i = e?.walletAddress ? { walletAddress: e.walletAddress } : void 0;
        (0, Q.j)(o, r, i);
      },
      "QO",
      0,
      function (e) {
        let o = (0, n.gm)({ authMethod: e?.authMethod, authType: e?.authType }),
          r = eo({
            sourceScreen: e_(e?.screen),
            sourceElement: t.k9.LOGOUT_BUTTON,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "FOUNDATION",
          }),
          i = e?.walletAddress ? { walletAddress: e.walletAddress } : void 0;
        (0, Q.j)(o, r, i);
      },
      "V4",
      0,
      function (e) {
        let o = (0, n.UV)({
            buttonId: e.buttonName,
            routePath: window.location.pathname,
          }),
          r = eo({
            sourceScreen: t.Ae.MAYHEM,
            sourceElement: e.sourceElement,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "MAYHEM",
          });
        (0, Q.j)(o, r);
      },
      "gh",
      0,
      function (e) {
        let o = (0, n.RO)({ interactionType: t.EG.CLICK, tabName: e.tabName }),
          r = eo({
            sourceScreen: t.Ae.MAYHEM,
            sourceElement: e.sourceElement,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "MAYHEM",
          });
        (0, Q.j)(o, r);
      },
      "LR",
      0,
      eF,
      "bh",
      0,
      function (e) {
        let o = (0, n.UV)({
          buttonId: "open_create_callout",
          routePath: window.location.pathname,
        });
        (0, Q.j)(o, {
          sourceScreen: e_(e?.screen),
          sourceElement: e?.sourceElement ?? t.k9.EXPLICIT_NO_ELEMENT,
          sourceElementType: t.eD.BUTTON,
          ownershipGroup: "DISCOVERY",
        });
      },
      "x9",
      0,
      function (e, o) {
        let r = o?.destinationScreen || el(e),
          i = (0, n.Di)({
            originPath: o?.originPath || document.referrer || "",
            destinationPath: e,
            destinationScreen: r,
            metadata: {},
          }),
          s = eo({
            sourceScreen: r,
            sourceElement:
              (function (e) {
                let n = eu(e);
                if (!n) return;
                let o = n.searchParams.get("feed")?.toLowerCase() || "",
                  r = n.searchParams.get("tab")?.toLowerCase() || "";
                return "watchlist" === o
                  ? t.k9.WATCHLIST_LIST
                  : r
                    ? eT(r, "watchlist" === o)
                    : void 0;
              })(e) ?? t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.SCREEN,
            ownershipGroup: "FOUNDATION",
          });
        (0, Q.j)(i, s);
      },
      "Rz",
      0,
      function (e) {
        let o = (0, n.vg)({
            interactionType: t.EG.CLICK,
            leaderboardRank: e.leaderboardRank,
          }),
          r = eo({
            sourceScreen: t.Ae.LEADERBOARD,
            sourceElement: t.k9.KOL_HOLDINGS_LIST,
            sourceElementType: t.eD.LIST,
            ownershipGroup: "DISCOVERY",
          });
        (0, Q.j)(o, r);
      },
      "ri",
      0,
      function (e) {
        let o = (0, n.UV)({
            buttonId: e.buttonId,
            routePath: window.location.pathname,
          }),
          r = eo({
            sourceScreen: e_(e.screen),
            sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "FOUNDATION",
          });
        (0, Q.j)(o, r);
      },
      "gt",
      0,
      function (e) {
        let o = (0, n.UV)({
            buttonId: `CreateCoin:${e.source}`,
            routePath: window.location.pathname,
          }),
          r = eo({
            sourceScreen: e_(),
            sourceElement:
              "navbar" === e.source
                ? t.k9.CREATE_COIN_HEADER_OPTION
                : t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "BLOCKCHAIN",
          });
        (0, Q.j)(o, r);
      },
      "aD",
      0,
      function (e) {
        let o = "dismiss" === e.interactionType,
          r =
            "seen" === e.interactionType
              ? (0, n.Ew)({ ctaType: t.ZH.CTA_TYPE_REFERRAL })
              : (0, n.cq)({
                  interactionType: o ? t.EG.DISMISS : t.EG.CLICK,
                  ctaType: t.ZH.CTA_TYPE_REFERRAL,
                  actionType: o
                    ? t.cP.CTA_ACTION_TYPE_DISMISS
                    : t.cP.CTA_ACTION_TYPE_CLICK,
                  ctaId: `profile_referral_upsell:${e.target}`,
                }),
          i = eo({
            sourceScreen: t.Ae.PROFILE,
            sourceElement: t.k9.UPSELL_CARD_GENERIC,
            sourceElementType: t.eD.MODAL,
            ownershipGroup: "GROWTH",
          });
        ((0, Q.j)(r, i),
          "web_sign_up" !== e.target &&
            eF({
              interactionType: e.interactionType,
              screen: t.Ae.PROFILE,
              sourceElement: t.k9.UPSELL_CARD_GENERIC,
              sourceElementType: t.eD.MODAL,
            }));
      },
      "Z9",
      0,
      function (e) {
        let o = (0, n.UV)({
          buttonId: `ReferralInviteBlocked:${e.inAppBrowser}`,
          routePath: window.location.pathname,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.REFERRALS_APPLY,
            sourceElement: t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.SCREEN,
            ownershipGroup: "FOUNDATION",
          }),
        );
      },
      "L9",
      0,
      function (e) {
        let o = (0, n.ut)({
          metrics: !1,
          audit: !1,
          socials: !1,
          bondingCurve: !1,
          searchTerm: !1,
          exclTerm: !1,
          filtersSet: {
            action: e.action,
            columnType: e.columnType,
            hasParam: e.hasParam ?? !1,
            ...(void 0 !== e.detail ? { detail: e.detail } : {}),
          },
          status: t.eI.APPLY,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: t.Ae.COIN_SCREENERS,
            sourceElement: t.k9.UNSPECIFIED,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "DISCOVERY",
          }),
        );
      },
      "Pa",
      0,
      function (e) {
        let t = (0, n.Ni)({
          profileId: e.profileId,
          viewedUserId: e.viewedUserId,
          socialType: e.socialType,
          isOwn: e.isOwn,
        });
        (0, Q.j)(t, eC(e.isOwn));
      },
      "Ve",
      0,
      function (e) {
        let o = { ...eS(e.surface), ownershipGroup: "DISCOVERY" },
          r = (0, n.B8)({
            interactionType: t.EG.VIEWED,
            mint: e.mint,
            calloutId: e.calloutId,
            usdMarketCap: e.usdMarketCap,
            program: t.SI.PUMP,
            absolutePosition: e.absolutePosition ?? 0,
            relativePosition: e.relativePosition,
            recommendationId: e.recommendationId,
            recommendationRank: e.recommendationRank,
            positionId: e.positionId,
            chain: e.chain,
          });
        (0, Q.j)(r, o);
        let i =
            "home_feed" === e.surface
              ? {
                  recommendationId: e.recommendationId,
                  recommendationRank: e.recommendationRank,
                  positionId: e.positionId,
                  chain: e.chain,
                }
              : {},
          s = (0, n.z_)({
            ...ee({
              attributionId: e.authorUserId,
              ccUserId: e.authorCcUserId,
            }),
            mint: e.mint,
            calloutId: e.calloutId,
            absolutePosition: e.absolutePosition ?? 0,
            relativePosition: e.relativePosition,
            ...i,
          });
        (0, Q.j)(s, o);
      },
      "M6",
      0,
      function () {
        let e = (0, n.hS)({
          upsellType: t.Nb.PUMP_APP,
          interactionType: t.EG.VIEWED,
        });
        (0, Q.j)(e, eL());
      },
      "kS",
      0,
      function (e) {
        let o = (0, n.Ru)({
            board: e.board,
            recommendationId: e.recommendationId,
            window: e.window,
            scoreVersion: e.scoreVersion,
            hotMode: e.hotMode,
            coins: e.coins.map((e) => ({
              mint: e.mint,
              isPinned: e.isPinned,
              rank: e.rank,
            })),
          }),
          r = eo({
            sourceScreen: e.screen,
            sourceElement: e.sourceElement ?? t.k9.UNSPECIFIED,
            sourceElementType: t.eD.LIST,
            ownershipGroup: "DISCOVERY",
          });
        (0, Q.j)(o, r);
      },
      "pn",
      0,
      function (e) {
        e.forEach((e) => {
          var o;
          let r, i;
          ((o = {
            mint: e.coinId,
            screen: e.sourceScreen,
            usdMarketCap: e.marketCap,
            absolutePosition: e.itemPosition,
            recommendationId: e.rec_id,
            recommendationRank: e.recommendationRank,
            sourceElement: e.sourceElement,
            program: t.SI.PUMP,
          }),
            (r = (0, n.B8)({
              interactionType: o.interactionType || t.EG.VIEWED,
              mint: o.mint,
              usdMarketCap: o.usdMarketCap,
              program: o.program,
              isLivestreamActive: o.isLivestreamActive,
              absolutePosition: o.absolutePosition,
              relativePosition: o.relativePosition,
              recommendationRank: o.recommendationRank,
              recommendationId: o.recommendationId,
              recommendationScore: o.recommendationScore,
              isPinned: o.isPinned ?? z(o.sourceElement, o.recommendationId),
            })),
            (i = eo({
              sourceScreen: o.screen,
              sourceElement: o.sourceElement || t.k9.COIN_ROW,
              sourceElementType: t.eD.LIST_ITEM,
              ownershipGroup: "DISCOVERY",
            })),
            (0, Q.j)(r, i));
        });
      },
      "vq",
      0,
      function (e) {
        let t = (0, n.To)(eX(e.item));
        (0, Q.j)(t, ex(e.surface));
      },
      "Qw",
      0,
      function () {
        let e = (0, n.Ew)({ ctaType: 25 });
        (0, Q.j)(e, eO(213));
      },
      "B2",
      0,
      function (e) {
        let o,
          r,
          i = e || (0, et.d)();
        if ((0, et.V)())
          try {
            if (localStorage.getItem(eE) === i) return;
          } catch {}
        if (em.has(i)) return;
        em.add(i);
        let s = (0, et.z)(),
          a = (0, n.IW)(s),
          c =
            ((r =
              (o = el(window.location.pathname)) === t.Ae.MOVERS
                ? t.k9.MOVERS_FEED
                : t.k9.EXPLICIT_NO_ELEMENT),
            eo({
              sourceScreen: o,
              sourceElement: r,
              sourceElementType: t.eD.SCREEN,
              ownershipGroup: "FOUNDATION",
            }));
        ((0, Q.j)(a, c, {
          onFlushed: () =>
            (function (e) {
              if ((0, et.V)())
                try {
                  localStorage.setItem(eE, e);
                } catch {}
            })(i),
          onFailed: () => em.delete(i),
        }),
          (function (e, t) {
            if (void 0 === e.attribution) return;
            let o = (0, n.Lq)({
              attribution: e.attribution,
              ...(e.deeplinkAttribution
                ? { deeplinkAttribution: e.deeplinkAttribution }
                : {}),
            });
            (0, Q.j)(o, t);
          })(s, c));
      },
      "oQ",
      0,
      function (e) {
        let o = (0, n.My)({
          peerId: e.peerId,
          shareContentType: ((e) => {
            switch (e) {
              case "coin":
                return t.Dc.COIN;
              case "profile":
                return t.Dc.PROFILE;
              case "callout":
              case "reply":
                return t.Dc.CALLOUT;
              default:
                return t.Dc.UNSPECIFIED;
            }
          })(e.kind),
          mint: e.mint,
          isExistingConversation: e.isExistingConversation,
          status: e.status,
        });
        (0, Q.j)(o, eo(ez[e.surface]));
      },
      "Sd",
      0,
      function (e) {
        let o = !_(e.error) && (0, a.S)(e.error, { code: e.errorCode }),
          i = o ? a.k : e.error,
          s = e.rum?.error ?? i,
          u = e.chainId ?? ei,
          l = (0, n.KM)({
            tradeDirection: "buy" === e.tradeDirection ? t.R1.BUY : t.R1.SELL,
            mint: e.mint,
            signatures: e.signatures || [],
            error: i,
            isCoinCreation: e.isCoinCreation,
            provider: e.provider,
            slippage: e.slippage,
            usdAmount: e.usdAmount,
            blockchainStore: e.blockchainStore,
            chainId: u,
            transactionsViaApiService: e.transactionsViaApiService,
          }),
          E = eo({
            sourceScreen: e.screen || t.Ae.COIN_DETAILS,
            sourceElement: e.sourceElement ?? t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.FORM,
            ownershipGroup: "BLOCKCHAIN",
          });
        (0, Q.j)(l, E);
        let m = {
          direction: e.tradeDirection,
          mint: e.mint,
          chainId: u,
          provider: e.provider,
          usdAmount: e.usdAmount,
          paymentUsdAmount: e.paymentUsdAmount,
          denomination: e.paymentDenomination,
          signatures: e.signatures,
          slippage: e.slippage,
          isCoinCreation: e.isCoinCreation,
          blockchainStore: e.blockchainStore,
          transactionsViaApiService: e.transactionsViaApiService,
          route: e.route,
          venue: e.venue,
          screen: e.screen,
          sourceElement: e.sourceElement,
          signals: e.signals,
          errorCode: e.errorCode,
          feeMode: e.feeMode,
        };
        if (
          (o
            ? $({ ...m, errorReason: e.error })
            : q({
                ...m,
                errorReason: i,
                operation: e.rum?.operation,
                bapiReason: e.bapiReason,
              }),
          e.rum?.skip)
        )
          return;
        let p = {
          feature: "trade",
          operation: e.rum?.operation ?? e.tradeDirection,
          context: {
            mint: e.mint,
            chainId: u,
            tradeDirection: e.tradeDirection,
            provider: e.provider,
            slippage: e.slippage,
            isCoinCreation: e.isCoinCreation,
            blockchainStore: e.blockchainStore,
            transactionsViaApiService: e.transactionsViaApiService,
            route: e.route,
            venue: e.venue,
            bapiReason: e.bapiReason,
            durationMs: e.signals?.durationMs,
            quoteAgeMs: e.signals?.quoteAgeMs,
            priceDriftBps: e.signals?.priceDriftBps,
            timeToBuildMs: e.signals?.timeToBuildMs,
            timeToSignMs: e.signals?.timeToSignMs,
            ...e.rum?.context,
          },
        };
        o
          ? (0, c.B)({ name: "swap-declined", ...p })
          : i === r
            ? (0, c.B)({
                name: "swap-blocked",
                ...p,
                context: { reason: i, ...p.context },
              })
            : (0, c.l)({ error: s, ...p });
      },
      "V9",
      0,
      function (e) {
        let o = e.chainId ?? ei,
          r = (0, n.fO)({
            tradeDirection: "buy" === e.tradeDirection ? t.R1.BUY : t.R1.SELL,
            mint: e.mint,
            solAmount: e.solAmount,
            usdAmount: e.usdAmount,
            tokenAmount: e.tokenAmount,
            signatures: e.signatures ?? (e.signature ? [e.signature] : []),
            provider: e.provider,
            isCoinCreation: e.isCoinCreation,
            livestreamStatus: e.isLivestreamActive,
            timeToConfirm: e.timeToConfirm ?? e.signals?.timeToConfirmMs,
            timeToConfirmEndToEnd: e.timeToConfirmEndToEnd,
            blockchainStore: e.blockchainStore,
            chainId: o,
            transactionsViaApiService: e.transactionsViaApiService,
            recommendationId: e.recommendationId,
            recommendationRank: e.recommendationRank,
            absolutePosition: e.absolutePosition,
            ...e.perp,
          }),
          i = eo({
            sourceScreen: e.screen || t.Ae.COIN_DETAILS,
            sourceElement: e.sourceElement ?? t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.FORM,
            ownershipGroup: "BLOCKCHAIN",
          });
        ((0, Q.j)(r, i),
          X({
            direction: e.tradeDirection,
            mint: e.mint,
            chainId: o,
            provider: e.provider,
            solAmount: e.solAmount,
            usdAmount: e.usdAmount,
            paymentUsdAmount: e.paymentUsdAmount,
            denomination: e.paymentDenomination,
            tokenAmount: e.tokenAmount,
            signatures: e.signatures ?? (e.signature ? [e.signature] : []),
            isCoinCreation: e.isCoinCreation,
            blockchainStore: e.blockchainStore,
            transactionsViaApiService: e.transactionsViaApiService,
            route: e.route,
            venue: e.venue,
            screen: e.screen,
            sourceElement: e.sourceElement,
            timeToConfirm: e.timeToConfirm,
            timeToConfirmEndToEnd: e.timeToConfirmEndToEnd,
            signals: e.signals,
            feeMode: e.feeMode,
          }),
          (0, c.B)({
            name: "trade-success",
            feature: "trade",
            operation: e.tradeDirection,
            context: {
              mint: e.mint,
              chainId: o,
              provider: e.provider,
              isCoinCreation: e.isCoinCreation,
              blockchainStore: e.blockchainStore,
              transactionsViaApiService: e.transactionsViaApiService,
              route: e.route,
              venue: e.venue,
              durationMs: e.signals?.durationMs,
              quoteAgeMs: e.signals?.quoteAgeMs,
              timeToConfirmMs: e.signals?.timeToConfirmMs,
              timeToBuildMs: e.signals?.timeToBuildMs,
              timeToSignMs: e.signals?.timeToSignMs,
            },
          }));
      },
      "Px",
      0,
      function (e) {
        let o = (0, n.hS)({
            upsellType: t.Nb.TERMINAL,
            interactionType: t.EG.CLICK,
          }),
          r = eo({
            sourceScreen: e_(),
            sourceElement: e?.sourceElement ?? t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "GROWTH",
          });
        (0, Q.j)(o, r);
      },
      "jC",
      0,
      function (e) {
        let o = (0, n.UV)({
          buttonId: e.nowHidden ? "HidePersonalInfo" : "ShowPersonalInfo",
          routePath: window.location.pathname,
        });
        (0, Q.j)(
          o,
          eo({
            sourceScreen: e_(t.Ae.PROFILE),
            sourceElement: t.k9.PROFILE_CONTENT_MINE,
            sourceElementType: t.eD.BUTTON,
            ownershipGroup: "PROFILES",
          }),
        );
      },
      "u_",
      0,
      function (e) {
        let o = (0, n.SB)({
            interactionType: t.EG.CLICK,
            mint: e.mint,
            calloutId: e.calloutId,
            tradeDirection: "buy" === e.tradeDirection ? t.R1.BUY : t.R1.SELL,
            solAmount: e.solAmount,
            usdAmount: e.usdAmount,
            tokenAmount: e.tokenAmount,
            usdMarketCap: e.usdMarketCap,
            program: e.program,
            isLivestreamActive: e.isLivestreamActive,
            absolutePosition: e.absolutePosition || 0,
            relativePosition: e.relativePosition,
            recommendationRank: e.recommendationRank,
            recommendationId: e.recommendationId,
            recommendationScore: e.recommendationScore,
            isPinned: e.isPinned ?? z(e.sourceElement, e.recommendationId),
            positionId: e.positionId,
          }),
          r = eo({
            sourceScreen: e.screen || t.Ae.COIN_DETAILS,
            sourceElement: e.sourceElement ?? t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType: t.eD.FORM,
            ownershipGroup: "BLOCKCHAIN",
          });
        (0, Q.j)(o, r);
      },
      "yt",
      0,
      function (e) {
        let o = [
            "wallet_deprecation",
            e.surface,
            e.interactionType,
            ...(e.cta ? [e.cta] : []),
          ].join(":"),
          r = (0, n.UV)({ buttonId: o, routePath: window.location.pathname }),
          i = eo({
            sourceScreen: e_(e.screen),
            sourceElement:
              "wall" === e.surface
                ? t.k9.WALLET_MODAL
                : t.k9.EXPLICIT_NO_ELEMENT,
            sourceElementType:
              "banner" === e.surface
                ? t.eD.BANNER
                : "wall" === e.surface
                  ? t.eD.SCREEN
                  : t.eD.MODAL,
            ownershipGroup: "FOUNDATION",
          });
        (0, Q.j)(r, i);
      },
    ],
    595673,
  );
};
