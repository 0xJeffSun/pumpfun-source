// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = [
      "trending",
      "global-callouts",
      "leaderboard",
      "my-alerts",
      "watchlist",
      "your-positions",
      "latest-callouts",
      "movers",
      "user-callouts",
      "user-trades",
      "coin-trades",
      "coin-callouts",
      "list-callouts",
    ],
    a = { key: "user", kind: "user" },
    i = { key: "mint", kind: "coin" },
    n = {
      trending: {
        type: "trending",
        label: "Trending",
        description: "Coins the whole site is moving on right now",
      },
      "global-callouts": {
        type: "global-callouts",
        label: "Hot callouts",
        description: "Hot callouts across the site, ranked for you",
      },
      leaderboard: {
        type: "leaderboard",
        label: "Leaderboard",
        description:
          "Top traders, callout earners and squads, ranked — switch the board inside",
      },
      "my-alerts": {
        type: "my-alerts",
        label: "Friends",
        description: "Live trades and callouts from people you follow",
        requiresAuth: !0,
      },
      watchlist: {
        type: "watchlist",
        label: "Watchlist",
        description: "Coins you've starred, with live market caps",
        requiresAuth: !0,
      },
      "your-positions": {
        type: "your-positions",
        label: "Your positions",
        description:
          "Your open and closed positions — the profile page's boards",
        requiresAuth: !0,
      },
      "latest-callouts": {
        type: "latest-callouts",
        label: "Latest callouts",
        description:
          "Callouts from the last 24 hours, newest first, above your position-size and market-cap floors",
      },
      movers: {
        type: "movers",
        label: "Pro screener",
        description:
          "Every coin board, with holder, dev and volume stats on each coin",
      },
      "user-callouts": {
        type: "user-callouts",
        label: "Callouts by user",
        description: "Every callout a specific user posts",
        param: a,
        group: "advanced",
      },
      "user-trades": {
        type: "user-trades",
        label: "Trades by user",
        description: "A specific user's trade history",
        param: a,
        group: "advanced",
      },
      "coin-trades": {
        type: "coin-trades",
        label: "Trades on coin",
        description: "Live trade tape for a specific coin",
        param: i,
        group: "advanced",
      },
      "coin-callouts": {
        type: "coin-callouts",
        label: "Callouts on coin",
        description: "Callouts posted on a specific coin",
        param: i,
        group: "advanced",
      },
      "list-callouts": {
        type: "list-callouts",
        label: "List feed",
        description: "Callouts from a custom list of users or coins",
        param: { key: "list", kind: "list" },
        group: "advanced",
      },
    },
    r = (e) => "advanced" === n[e].group;
  (t.filter(r),
    e.s([
      "b",
      0,
      6,
      "J",
      0,
      n,
      "z",
      0,
      t,
      "l",
      0,
      r,
      "g",
      0,
      (e) => "string" == typeof e && t.includes(e),
    ]));
};
