// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(671722),
    r = e.i(810680),
    i = e.i(762316),
    s = e.i(334942),
    n = e.i(994533),
    o = e.i(491208),
    a = e.i(45329),
    l = e.i(551792),
    c = e.i(358893),
    d = e.i(965690),
    u = e.i(214100);
  let p = ({ read: e, write: t, subscribe: r }) => ({
    kind: "external",
    read: e,
    write: t,
    subscribe: r,
  });
  e.s(["f", 0, p], 694840);
  var f = e.i(73383),
    m = e.i(654506),
    b = e.i(529281);
  let h = (e, t) =>
      (0, b.f)({
        id: e,
        section: "feed",
        scope: "device",
        default: null,
        coerce: (e) => ("string" == typeof e ? e : null),
        adapter: (0, m.f)({ key: t, codec: "raw" }),
        control: { kind: "hidden" },
        labelKey: "web.settings.feed.pnl_windows",
      }),
    y = {
      "feed.includeNsfw": (0, b.f)({
        id: "feed.includeNsfw",
        section: "feed",
        scope: "account",
        default: !1,
        coerce: (e) => !0 === e,
        adapter: (0, f.f)({
          store: () => c.W,
          select: (e) => e.includeNsfw,
          write: ({ next: e, state: t }) => {
            e !== t.includeNsfw && t.toggleNsfw();
          },
        }),
        control: { kind: "switch" },
        labelKey: "web.home.nsfw_label",
        descriptionKey: "web.settings.feed.nsfw_description",
        searchTerms: ["nsfw", "adult", "explicit", "filter"],
      }),
      "feed.homeLayout": (0, b.f)({
        id: "feed.homeLayout",
        section: "feed",
        scope: "device",
        default: r.x,
        coerce: (e) => (0, r.g)("string" == typeof e ? e : null),
        adapter: (0, u.f)({
          read: () => (0, r.i)(),
          write: (e) => (0, r.m)(e),
          readServer: (e) => (0, r.b)(e),
        }),
        control: {
          kind: "pills",
          options: [
            {
              value: r.E.GRID,
              labelKey: "web.home.layout_grid",
              preview: "layout-grid",
            },
            {
              value: r.E.TABLE,
              labelKey: "web.home.layout_table",
              preview: "layout-table",
            },
          ],
        },
        labelKey: "web.home.feed_layout_a11y",
        descriptionKey: "web.settings.feed.layout_description",
        searchTerms: ["grid", "table", "list", "layout", "cards"],
      }),
      "feed.showAnimations": (0, b.f)({
        id: "feed.showAnimations",
        section: "feed",
        scope: "device",
        default: !0,
        coerce: (e) => !1 !== e,
        adapter: (0, m.f)({ key: "home.show-animations", codec: "json" }),
        control: { kind: "switch" },
        labelKey: "web.home.animations_label",
        descriptionKey: "settings.animations_desc",
        searchTerms: ["animations", "motion", "shuffle", "flash"],
      }),
      "feed.exploreLenses": (0, b.f)({
        id: "feed.exploreLenses",
        section: "feed",
        scope: "device",
        default: t.X,
        coerce: t.E,
        adapter: (0, m.f)({ key: "explore.lenses.v2", codec: "json" }),
        control: { kind: "hidden" },
        labelKey: "web.home.lens_strip_a11y",
        searchTerms: ["lenses", "explore", "boards", "movers"],
      }),
      "feed.exploreWindow": (0, b.f)({
        id: "feed.exploreWindow",
        section: "feed",
        scope: "device",
        default: d.O,
        coerce: d.u,
        adapter: (0, m.f)({ key: "explore.window", codec: "raw" }),
        control: {
          kind: "pills",
          options: d.D.map((e) => ({ value: e, rawLabel: e })),
        },
        labelKey: "web.settings.feed.explore_window",
        descriptionKey: "web.settings.feed.explore_window_description",
        searchTerms: [
          "window",
          "timeframe",
          "5m",
          "1h",
          "6h",
          "24h",
          "explore",
        ],
      }),
      "feed.exploreRisingRows": (0, b.f)({
        id: "feed.exploreRisingRows",
        section: "feed",
        scope: "device",
        default: !0,
        coerce: (e) => !1 !== e,
        adapter: (0, m.f)({ key: "explore.rising-rows", codec: "json" }),
        control: { kind: "switch" },
        labelKey: "web.settings.feed.explore_rising_rows",
        descriptionKey: "web.settings.feed.explore_rising_rows_description",
        searchTerms: ["rising", "rows", "climb", "glide", "explore", "table"],
      }),
      "feed.infoBar.mode": (0, b.f)({
        id: "feed.infoBar.mode",
        section: "feed",
        scope: "device",
        default: "watchlist",
        coerce: l.Y,
        adapter: (0, f.f)({
          store: () => l.L,
          select: (e) => e.mode,
          write: ({ next: e, state: t }) => t.setMode(e),
        }),
        control: {
          kind: "pills",
          options: [
            { value: "watchlist", labelKey: "home.tabs.watchlist" },
            { value: "positions", labelKey: "web.info_bar.positions" },
            { value: "following", labelKey: "common.following" },
            { value: "recents", labelKey: "profile.recently_viewed" },
          ],
        },
        labelKey: "web.settings.feed.info_bar",
        descriptionKey: "web.settings.feed.info_bar_description",
        searchTerms: ["ticker", "info bar", "topbar", "watchlist", "positions"],
      }),
      "feed.infoBar.dustFloorUsd": (0, b.f)({
        id: "feed.infoBar.dustFloorUsd",
        section: "feed",
        scope: "account",
        default: null,
        coerce: (e) => ("number" == typeof e && e > 0 ? e : null),
        adapter: p({
          read: () => void 0,
          write: () => {},
          subscribe: () => () => {},
        }),
        control: { kind: "custom", component: "info-bar-dust-floor" },
        labelKey: "web.info_bar.dust_floor_label",
        descriptionKey: "web.info_bar.dust_floor_note",
        searchTerms: ["dust", "threshold", "positions", "small", "info bar"],
        resettable: !1,
      }),
      "feed.infoBar.watchlistId": (0, b.f)({
        id: "feed.infoBar.watchlistId",
        section: "feed",
        scope: "device",
        default: (0, l.X)(void 0),
        coerce: l.X,
        adapter: (0, f.f)({
          store: () => l.L,
          select: (e) => e.watchlistId,
          write: ({ next: e, state: t }) => t.setWatchlistId(e),
        }),
        control: { kind: "hidden" },
        labelKey: "web.info_bar.watchlist_picker",
      }),
      "feed.infoBar.pnlPeriod": (0, b.f)({
        id: "feed.infoBar.pnlPeriod",
        section: "feed",
        scope: "device",
        default: (0, l.C)(void 0),
        coerce: l.C,
        adapter: (0, f.f)({
          store: () => l.L,
          select: (e) => e.pnlPeriod,
          write: ({ next: e, state: t }) => t.setPnlPeriod(e),
        }),
        control: {
          kind: "pills",
          options: l.u.map((e) => ({ value: e, rawLabel: l.K[e] })),
        },
        labelKey: "web.info_bar.pnl_window",
        descriptionKey: "web.info_bar.pnl_window_note",
        searchTerms: ["pnl", "profit", "window", "info bar"],
      }),
      "feed.infoBar.hiddenTokens": (0, b.f)({
        id: "feed.infoBar.hiddenTokens",
        section: "feed",
        scope: "device",
        default: {},
        coerce: l.j,
        adapter: (0, f.f)({
          store: () => l.L,
          select: (e) => e.hiddenTokens,
          write: ({ next: e, state: t }) => t.setField("hiddenTokens", e),
        }),
        control: { kind: "custom", component: "info-bar-hidden-tokens" },
        labelKey: "web.info_bar.hidden_tokens",
        searchTerms: ["hidden", "hide token", "unhide", "info bar"],
      }),
      "feed.infoBar.hiddenProfiles": (0, b.f)({
        id: "feed.infoBar.hiddenProfiles",
        section: "feed",
        scope: "device",
        default: {},
        coerce: l.W,
        adapter: (0, f.f)({
          store: () => l.L,
          select: (e) => e.hiddenProfiles,
          write: ({ next: e, state: t }) => t.setField("hiddenProfiles", e),
        }),
        control: { kind: "custom", component: "info-bar-hidden-profiles" },
        labelKey: "web.info_bar.hidden_profiles",
        searchTerms: [
          "hidden",
          "hide account",
          "hide profile",
          "unhide",
          "info bar",
        ],
      }),
      "feed.infoBar.hideStablecoins": (0, b.f)({
        id: "feed.infoBar.hideStablecoins",
        section: "feed",
        scope: "device",
        default: !1,
        coerce: l.G,
        adapter: (0, f.f)({
          store: () => l.L,
          select: (e) => e.hideStablecoins,
          write: ({ next: e, state: t }) => t.setHideStablecoins(e),
        }),
        control: { kind: "switch" },
        labelKey: "web.info_bar.hide_stablecoins",
        descriptionKey: "web.info_bar.hide_stablecoins_note",
        searchTerms: ["stablecoin", "usdc", "usdt", "hide", "info bar"],
      }),
      "feed.positionsView": (0, b.f)({
        id: "feed.positionsView",
        section: "feed",
        scope: "device",
        default: "compressed",
        coerce: (e) => ("expanded" === e ? "expanded" : "compressed"),
        adapter: (0, m.f)({ key: "profile-positions-view-mode", codec: "raw" }),
        control: {
          kind: "pills",
          options: [
            {
              value: "compressed",
              labelKey: "web.settings.feed.positions_view_compact",
              preview: "positions-compact",
            },
            {
              value: "expanded",
              labelKey: "web.settings.feed.positions_view_expanded",
              preview: "positions-expanded",
            },
          ],
        },
        labelKey: "web.settings.feed.positions_view",
        descriptionKey: "web.settings.feed.positions_view_description",
        searchTerms: ["positions", "profile", "density", "compact", "expanded"],
      }),
      "feed.screeners.style": (0, b.f)({
        id: "feed.screeners.style",
        section: "feed",
        scope: "device",
        default: s.X,
        coerce: s.$,
        adapter: (0, f.f)({
          store: () => a.V,
          select: (e) => e.style,
          write: ({ next: e, state: t }) => t.setStyle(e),
        }),
        control: { kind: "custom", component: "screeners-style" },
        labelKey: "web.settings.feed.screeners_style",
        descriptionKey: "web.settings.feed.screeners_style_description",
        searchTerms: [
          "screeners",
          "deck",
          "density",
          "column width",
          "accents",
        ],
      }),
      "feed.trending.board": (0, b.f)({
        id: "feed.trending.board",
        section: "feed",
        scope: "account",
        default: n.X,
        coerce: n.B,
        adapter: (0, m.f)({ key: "trending.board", codec: "raw" }),
        control: {
          kind: "pills",
          options: n.f.map((e) => ({ value: e, labelKey: n.U[e] })),
        },
        labelKey: "web.settings.feed.trending_board",
        descriptionKey: "web.settings.feed.trending_board_description",
        searchTerms: ["trending", "memes", "stocks", "tokenized", "board"],
      }),
      "feed.trending.window": (0, b.f)({
        id: "feed.trending.window",
        section: "feed",
        scope: "account",
        default: o.L,
        coerce: o.U,
        adapter: (0, m.f)({ key: "trending.social-window", codec: "raw" }),
        control: {
          kind: "pills",
          options: o.W.map((e) => ({ value: e, rawLabel: e })),
        },
        labelKey: "web.settings.feed.trending_window",
        descriptionKey: "web.settings.feed.trending_window_description",
        searchTerms: [
          "trending",
          "window",
          "timeframe",
          "1h",
          "4h",
          "12h",
          "24h",
        ],
      }),
      "feed.pnl.leaderboardTab": h(
        "feed.pnl.leaderboardTab",
        i.b.leaderboardTab,
      ),
      "feed.pnl.leaderboardPeriod": h(
        "feed.pnl.leaderboardPeriod",
        i.b.leaderboardPeriod,
      ),
      "feed.pnl.leaderboardSort": h(
        "feed.pnl.leaderboardSort",
        i.b.leaderboardSort,
      ),
      "feed.pnl.leaderboardEarnersPeriod": h(
        "feed.pnl.leaderboardEarnersPeriod",
        i.b.leaderboardEarnersPeriod,
      ),
      "feed.pnl.squadsLeaderboardPeriod": h(
        "feed.pnl.squadsLeaderboardPeriod",
        i.b.squadsLeaderboardPeriod,
      ),
      "feed.pnl.squadsLeaderboardSort": h(
        "feed.pnl.squadsLeaderboardSort",
        i.b.squadsLeaderboardSort,
      ),
      "feed.pnl.profilePortfolioPeriod": h(
        "feed.pnl.profilePortfolioPeriod",
        i.b.profilePortfolioPeriod,
      ),
    };
  e.s(["f", 0, y], 807786);
  let g = new Set(["usd", "sol", "token"]);
  e.s(["f", 0, (e) => "string" == typeof e && g.has(e)], 893823);
  let w = [{ side: "sell", percent: 100 }];
  function _(e) {
    return { side: "sell", percent: Math.min(Math.max(Math.round(e), 1), 100) };
  }
  function k(e, t) {
    return {
      side: "buy",
      sol: Math.min(Math.max(e, 1e-4), 1e3),
      usdc: Math.min(Math.max(t, 0.01), 1e6),
    };
  }
  function v() {
    return w.map((e) => ({ ...e }));
  }
  e.s(
    [
      "P",
      0,
      0.5,
      "y",
      0,
      25,
      "W",
      0,
      100,
      "Z",
      0,
      { side: "sell", percent: 50 },
      "F",
      0,
      w,
      "X",
      0,
      3,
      "e",
      0,
      v,
      "h",
      0,
      k,
      "I",
      0,
      _,
      "m",
      0,
      function (e) {
        if (!Array.isArray(e)) return v();
        let t = [];
        for (let r of e) {
          if (t.length >= 3) break;
          let e = (function (e) {
            if (!e || "object" != typeof e) return null;
            let t = e.side;
            if ("sell" === t) {
              let t = Number(e.percent);
              return !Number.isFinite(t) || t <= 0 ? null : _(t);
            }
            if ("buy" === t) {
              let t = Number(e.sol),
                r = Number(e.usdc);
              return k(
                Number.isFinite(t) && t > 0 ? t : 0.5,
                Number.isFinite(r) && r > 0 ? r : 25,
              );
            }
            return null;
          })(r);
          e && t.push(e);
        }
        return t.length ? t : v();
      },
    ],
    221930,
  );
};
