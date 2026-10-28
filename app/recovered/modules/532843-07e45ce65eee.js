// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var a = e.i(732486),
    t = e.i(445242),
    s = e.i(439587),
    r = e.i(365089);
  e.i(12692);
  var i = e.i(398902),
    o = e.i(982047),
    l = e.i(730721),
    c = e.i(257505);
  let n = [
      "advanced_search",
      "creator_fees.charity",
      "home",
      "trending",
      "web.home",
      "web.market_rail",
      "web.perps",
      "web.screeners",
      "web.trade",
      "web.watchlist",
    ],
    b = {
      home: [
        "callouts",
        "coin_details.position",
        "coin_details.profit",
        "home",
        "kolscan",
        "profile.squads",
        "trending",
        "web.callouts",
        "web.coin",
        "web.feed",
        "web.home",
        "web.leaderboard",
        "web.market_rail",
        "web.screeners",
        "web.watchlist",
      ],
      coin: [
        "advanced_search",
        "callouts",
        "coin_create.creator_rewards",
        "coin_create.description",
        "coin_create.website",
        "coin_details",
        "web.coin_details",
        "creator_fees.cto",
        "creator_fees.distribution_header",
        "creator_fees.charity",
        "creator_fees.claim_and_donate",
        "creator_fees.claim_rewards_for_all",
        "creator_fees.creator",
        "creator_fees.creator_rewards",
        "creator_fees.edit_distribution",
        "creator_fees.rewards_share",
        "creator_fees.rewards_still_accumulating",
        "creator_fees.unclaimed",
        "creator_fees.your_creator_rewards",
        "home.alerts_feed",
        "home.bounties",
        "home.feed_tabs",
        "home.movers",
        "home.tabs",
        "kolscan",
        "livestream",
        "mayhem_mode",
        "news.tiktok_embed",
        "notifications.toast",
        "position_sheet",
        "profile.metric_tags",
        "web.profile",
        "profile.narrative",
        "profile.positions_card",
        "profile.reposts",
        "share",
        "tokenized_agent",
        "trade",
        "web.agent",
        "web.callouts",
        "web.chart",
        "web.coin",
        "web.creator",
        "web.orders",
        "web.embeds",
        "web.feed",
        "web.holders",
        "web.share",
        "web.leaderboard",
        "web.market_rail",
        "web.mayhem",
        "web.report",
        "web.screeners",
        "web.trade",
        "web.watchlist",
      ],
      profile: [
        "account.evm_wallet",
        "account.solana_wallet",
        "activation.streaks",
        "callouts",
        "chat.dms",
        "coin_details",
        "web.coin_details",
        "creator_fees",
        "home.thesis_feed",
        "inputs",
        "kolscan.top_charts",
        "mayhem_mode",
        "not_found",
        "notifications.toast",
        "profile",
        "profile.collectibles",
        "share",
        "settings.export_wallet",
        "time.weekdays_short",
        "trade",
        "transactions",
        "wallets.manage",
        "web.auth",
        "web.callouts",
        "web.chart",
        "web.coin",
        "web.creator",
        "web.feed",
        "web.filters",
        "web.leaderboard",
        "web.market_rail",
        "web.orders",
        "web.perps",
        "web.profile",
        "web.report",
        "web.screeners",
        "web.share",
        "web.trade",
        "web.videos",
        "web.x_link",
      ],
      calloutDetail: [
        "callouts",
        "coin_details",
        "web.coin_details",
        "home.alerts_feed",
        "home.bounties",
        "trade",
        "trending",
        "web.callouts",
        "web.perps",
        "web.chart",
        "web.coin",
        "web.leaderboard",
        "web.market_rail",
        "web.screeners",
        "web.replay",
        "web.trade",
      ],
      replay: [
        "callouts.position_card",
        "callouts.reply",
        "callouts.repost",
        "callouts.thread",
        "callouts.tos",
        "callouts.update",
        "coin_details.position",
        "coin_details.profit",
        "coin_details.sections",
        "common.copy_link",
        "home.alerts_feed",
        "share.coin",
        "trade.order_details",
        "web.callouts",
        "web.chart",
        "web.coin",
        "web.replay",
        "web.trade",
      ],
      bounties: ["home", "web.bounties"],
      explore: n,
      exploreSocialTerminal: [
        ...n,
        "coin_details.actions",
        "livestream.controls",
        "notifications.list_item",
        "web.callouts",
        "web.coin",
        "web.explore",
        "web.leaderboard",
      ],
      create: [
        "coin_create",
        "creator_fees.charity",
        "funding",
        "mayhem_mode.creation",
        "mayhem_mode.filters",
        "mayhem_mode.summary_pills",
        "web.create",
        "web.creator",
        "web.mayhem",
        "web.market_rail",
        "web.screeners",
      ],
      mayhem: ["coin_create", "mayhem_mode", "web.mayhem"],
      pumpToken: [
        "creator_fees",
        "web.pump_token",
        "coin_details.holders",
        "web.chart",
        "web.market_rail",
        "web.screeners",
      ],
      holderRewards: [
        "coin_details.info",
        "web.coin",
        "web.holder_rewards",
        "web.market_rail",
        "web.screeners",
      ],
      leaderboard: [
        "callouts",
        "coin_details.position",
        "coin_details.profit",
        "kolscan.top_charts",
        "profile.squads",
        "web.callouts",
        "web.coin",
        "web.feed",
        "web.leaderboard",
      ],
      squads: [
        "callouts",
        "coin_details",
        "web.coin_details",
        "home.bounties",
        "profile.follow",
        "profile.metric_tags",
        "profile.narrative",
        "profile.positions_card",
        "profile.edit",
        "profile.squads",
        "web.callouts",
        "web.profile_edit",
        "web.feed",
        "web.leaderboard",
        "web.market_rail",
        "web.profile",
        "web.screeners",
        "web.share",
        "web.squads",
      ],
      messages: ["chat.dms", "web.messages"],
      live: ["livestream", "web.live", "web.livestream"],
      seoBoards: ["web.explore"],
      watchlist: ["bookmarks", "home", "web.watchlist"],
      notifications: ["notifications", "web.notification_settings"],
      achievements: ["profile.achievements", "web.profile"],
      orders: ["coin_details.manage_orders", "web.orders"],
      rewards: [
        "account.reclaim_sol",
        "callouts.rewards",
        "callouts.tos",
        "creator_fees",
        "profile.cashback",
        "profile.created_coins_empty",
        "profile.creator",
        "profile.rewards",
        "profile.total_rewards",
        "transactions.history",
        "web.callouts",
        "web.profile",
        "web.rewards",
        "web.share",
      ],
      referrals: [
        "onboarding.referral_code",
        "profile.creator",
        "profile.referral",
        "profile.rewards",
        "web.profile",
        "web.referrals",
      ],
      accountManagement: [
        "account.management",
        "account.privy_link",
        "auth.x_backup_gate",
        "profile.edit",
        "web.account",
        "web.auth",
        "web.wallet_deprecation",
        "web.market_rail",
        "web.screeners",
      ],
      perps: ["web.perps", "web.screeners"],
      packs: [
        "home.gacha",
        "profile.collectibles",
        "position_sheet",
        "callouts.update",
        "web.packs",
        "web.screeners",
      ],
      apikey: ["web.apikey"],
      landing: ["web.landing"],
      join: ["web.join"],
    };
  function m(e) {
    let s,
      r,
      i,
      n,
      m = (0, t.c)(16),
      { request: w, ownerLabel: d, onClose: u } = e;
    if (
      (m[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = { releaseOnFailure: !0 }), (m[0] = s))
        : (s = m[0]),
      !(0, c.f)(b.replay, s))
    ) {
      let e;
      return (
        m[1] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, a.jsx)("div", {
              className:
                "h-[60dvh] w-full animate-pulse bg-bg-secondary/60 md:h-[600px] md:w-[760px]",
              "data-testid": "position-replay-copy-loading",
              "aria-busy": "true",
            })),
            (m[1] = e))
          : (e = m[1]),
        e
      );
    }
    return (
      m[2] !== w ? ((r = (0, l.s)(w)), (m[2] = w), (m[3] = r)) : (r = m[3]),
      m[4] !== u ||
      m[5] !== d ||
      m[6] !== w.coin ||
      m[7] !== w.headline ||
      m[8] !== w.initialTab ||
      m[9] !== w.mint ||
      m[10] !== w.scope ||
      m[11] !== w.walletAddress
        ? ((i = (0, a.jsx)(o.f, {
            mint: w.mint,
            walletAddress: w.walletAddress,
            ownerLabel: d,
            coin: w.coin,
            chrome: "bare",
            initialMediaTab: w.initialTab,
            scope: w.scope,
            headline: w.headline,
            onClose: u,
          })),
          (m[4] = u),
          (m[5] = d),
          (m[6] = w.coin),
          (m[7] = w.headline),
          (m[8] = w.initialTab),
          (m[9] = w.mint),
          (m[10] = w.scope),
          (m[11] = w.walletAddress),
          (m[12] = i))
        : (i = m[12]),
      m[13] !== r || m[14] !== i
        ? ((n = (0, a.jsx)(
            "div",
            {
              className: "min-h-0 flex-1 overflow-y-auto overscroll-contain",
              children: i,
            },
            r,
          )),
          (m[13] = r),
          (m[14] = i),
          (m[15] = n))
        : (n = m[15]),
      n
    );
  }
  e.s(
    [
      "PositionReplayDialog",
      0,
      function (e) {
        let o,
          l,
          c,
          n,
          b,
          w = (0, t.c)(16),
          { request: d, openedAt: u, onClose: h } = e,
          { t: p } = (0, i.f)();
        w[0] !== u
          ? ((o = (e) => {
              Date.now() - u < 400 && (e.preventDefault(), e.stopPropagation());
            }),
            (w[0] = u),
            (w[1] = o))
          : (o = w[1]);
        let _ = o;
        w[2] !== d
          ? ((l =
              d?.ownerLabel?.trim() ||
              (d ? (0, r.d)(d.walletAddress, 4, 4) : "")),
            (w[2] = d),
            (w[3] = l))
          : (l = w[3]);
        let f = l,
          k = null != d;
        return (
          w[4] !== h
            ? ((c = (e) => {
                e || h();
              }),
              (w[4] = h),
              (w[5] = c))
            : (c = w[5]),
          w[6] !== _ || w[7] !== h || w[8] !== f || w[9] !== d || w[10] !== p
            ? ((n = d
                ? (0, a.jsx)(s.s, {
                    className:
                      "flex w-full max-h-[min(92dvh,calc(100vh-48px))] flex-col gap-0 overflow-hidden border-border-secondary bg-bg-primary p-0 md:w-auto md:max-w-[calc(100vw-32px)]",
                    "aria-label": p("web.replay.title"),
                    onClickCapture: _,
                    children: (0, a.jsx)(m, {
                      request: d,
                      ownerLabel: f,
                      onClose: h,
                    }),
                  })
                : null),
              (w[6] = _),
              (w[7] = h),
              (w[8] = f),
              (w[9] = d),
              (w[10] = p),
              (w[11] = n))
            : (n = w[11]),
          w[12] !== k || w[13] !== c || w[14] !== n
            ? ((b = (0, a.jsx)(s.v, {
                isOpen: k,
                onIsOpenChange: c,
                children: n,
              })),
              (w[12] = k),
              (w[13] = c),
              (w[14] = n),
              (w[15] = b))
            : (b = w[15]),
          b
        );
      },
    ],
    532843,
  );
};
