// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(250686),
    r = e.i(212251),
    i = e.i(638202),
    s = e.i(510632),
    n = e.i(911372),
    o = e.i(196498),
    a = e.i(383840),
    l = e.i(379943);
  e.i(267146);
  var c = e.i(540805),
    d = e.i(654506),
    u = e.i(529281);
  let p = [
      "1s",
      "15s",
      "30s",
      "1m",
      "5m",
      "15m",
      "30m",
      "1h",
      "4h",
      "6h",
      "12h",
      "1d",
      "1w",
    ],
    f = (e) => p.includes(e),
    m = (e) => {
      let t = e ?? {},
        r = {};
      if (t.byMint && "object" == typeof t.byMint)
        for (let [e, i] of Object.entries(t.byMint)) f(i) && (r[e] = i);
      return f(t.lastSelected)
        ? { lastSelected: t.lastSelected, byMint: r }
        : { byMint: r };
    },
    b = (0, d.f)({ key: "coinTradingView_chartInterval", codec: "json" }),
    h = [
      { value: "auto", labelKey: "web.settings.chart.interval_auto" },
      ...p.map((e) => ({ value: e, rawLabel: e })),
    ],
    y = ({ id: e, key: t, fallback: r, labelKey: i, searchTerms: s }) =>
      (0, u.f)({
        id: e,
        section: "chart",
        scope: "account",
        default: r,
        coerce: (e) => ("boolean" == typeof e ? e : r),
        adapter: (0, d.f)({ key: t, codec: "json" }),
        control: { kind: "switch" },
        labelKey: i,
        descriptionKey: "web.settings.chart.bubbles_description",
        searchTerms: [
          "markers",
          "chart markers",
          "marks",
          "bubbles",
          "trade display",
          ...s,
        ],
      }),
    g = {
      "chart.axis": (0, u.f)({
        id: "chart.axis",
        section: "chart",
        scope: "account",
        default: "marketcap",
        coerce: (e) => ("price" === e ? "price" : "marketcap"),
        adapter: (0, d.f)({
          key: "coinTradingView_chartDisplayMode",
          codec: "raw",
        }),
        control: {
          kind: "pills",
          options: [
            {
              value: "marketcap",
              labelKey: "web.chart.market_cap",
              preview: "axis-marketcap",
            },
            {
              value: "price",
              labelKey: "web.settings.chart.price",
              preview: "axis-price",
            },
          ],
        },
        labelKey: "web.settings.chart.axis",
        descriptionKey: "web.settings.chart.axis_description",
        searchTerms: ["market cap", "price", "mcap", "axis", "display mode"],
      }),
      "chart.seriesType": (0, u.f)({
        id: "chart.seriesType",
        section: "chart",
        scope: "account",
        default: 1,
        coerce: (e) => {
          let t = "string" == typeof e ? Number(e) : e;
          return (0, o.f)(t) ? t : 1;
        },
        adapter: (0, d.f)({
          key: "coinTradingView_chartSeriesType",
          codec: "raw",
        }),
        control: {
          kind: "pills",
          options: [
            {
              value: 1,
              labelKey: "web.settings.chart.style_candles",
              preview: "series-candles",
            },
            {
              value: 0,
              labelKey: "web.settings.chart.style_bars",
              preview: "series-bars",
            },
            {
              value: 2,
              labelKey: "web.settings.chart.style_line",
              preview: "series-line",
            },
            {
              value: 8,
              labelKey: "web.settings.chart.style_heikin_ashi",
              preview: "series-heikin",
            },
          ],
        },
        labelKey: "web.settings.chart.series_type",
        descriptionKey: "web.settings.chart.series_type_description",
        searchTerms: ["candles", "bars", "line", "heikin ashi", "chart style"],
      }),
      "chart.interval": (0, u.f)({
        id: "chart.interval",
        section: "chart",
        scope: "account",
        default: { byMint: {} },
        coerce: m,
        adapter: b,
        control: { kind: "custom", component: "chart-interval" },
        labelKey: "web.settings.chart.interval",
        descriptionKey: "web.settings.chart.interval_description",
        searchTerms: ["interval", "timeframe", "candle", "1s", "1m", "5m"],
        reset: () => {
          let e = m(b.read());
          b.write({ byMint: e.byMint });
        },
        neverSync: !0,
      }),
      "chart.favoriteIntervals": (0, u.f)({
        id: "chart.favoriteIntervals",
        section: "chart",
        scope: "account",
        default: s.M,
        coerce: (e) => (0, s.e)(e) ?? s.M,
        adapter: (0, d.f)({
          key: "coinTradingView_favoriteIntervals",
          codec: "json",
        }),
        control: { kind: "custom", component: "favorite-intervals" },
        labelKey: "web.settings.chart.favorite_intervals",
        descriptionKey: "web.settings.chart.favorite_intervals_description",
        searchTerms: ["favorites", "starred", "intervals", "toolbar"],
      }),
      "chart.appearance": (0, u.f)({
        id: "chart.appearance",
        section: "chart",
        scope: "account",
        default: {},
        coerce: t.M,
        adapter: (0, d.f)({ key: t.L, codec: "json" }),
        control: { kind: "hidden" },
        labelKey: "web.settings.chart.appearance",
      }),
      "chart.studyTemplate": (0, u.f)({
        id: "chart.studyTemplate",
        section: "chart",
        scope: "account",
        default: a.Q,
        coerce: a.C,
        adapter: (0, d.f)({ key: a.s, codec: "json" }),
        control: { kind: "hidden" },
        labelKey: "web.settings.chart.indicators",
      }),
      "chart.drawingTools": (0, u.f)({
        id: "chart.drawingTools",
        section: "chart",
        scope: "account",
        default: i.$,
        coerce: i.q,
        adapter: (0, d.f)({ key: i.T, codec: "json" }),
        control: { kind: "hidden" },
        labelKey: "web.settings.chart.drawing_tools",
      }),
      "chart.timeHoursFormat": (0, u.f)({
        id: "chart.timeHoursFormat",
        section: "chart",
        scope: "account",
        default: l.O,
        coerce: l.y,
        adapter: (0, d.f)({ key: l.A, codec: "json" }),
        control: { kind: "hidden" },
        labelKey: "web.settings.chart.time_format",
      }),
      "chart.positionLines": (0, u.f)({
        id: "chart.positionLines",
        section: "chart",
        scope: "account",
        default: !0,
        coerce: (e) => "false" !== e && !1 !== e,
        adapter: (0, d.f)({
          key: "coinTradingView_positionLinesEnabled",
          codec: "raw",
        }),
        control: { kind: "switch" },
        labelKey: "web.chart.position_lines",
        descriptionKey: "web.settings.chart.position_lines_description",
        searchTerms: ["avg entry", "avg exit", "position lines", "average"],
      }),
      "chart.markers.myTrades": y({
        id: "chart.markers.myTrades",
        key: "coinTradingView_myTradesEnabled",
        fallback: !0,
        labelKey: "web.chart.my_trades",
        searchTerms: ["my trades", "own"],
      }),
      "chart.markers.devTrades": y({
        id: "chart.markers.devTrades",
        key: "coinTradingView_devTradesEnabled",
        fallback: !0,
        labelKey: "web.chart.dev_trades",
        searchTerms: ["dev", "creator"],
      }),
      "chart.markers.trackedTrades": y({
        id: "chart.markers.trackedTrades",
        key: "coinTradingView_trackedTradesEnabled",
        fallback: !0,
        labelKey: "web.chart.tracked_trades",
        searchTerms: ["tracked wallets"],
      }),
      "chart.markers.mayhemTrades": y({
        id: "chart.markers.mayhemTrades",
        key: "coinTradingView_mayhemTradesEnabled",
        fallback: !0,
        labelKey: "web.chart.mayhem_trades",
        searchTerms: ["mayhem"],
      }),
      "chart.markers.callouts": y({
        id: "chart.markers.callouts",
        key: "coinTradingView_calloutsEnabled",
        fallback: !0,
        labelKey: "web.settings.chart.bubble_callouts",
        searchTerms: ["callouts", "calls"],
      }),
      "chart.markers.calloutMinPositionUsd": (0, u.f)({
        id: "chart.markers.calloutMinPositionUsd",
        section: "chart",
        scope: "account",
        default: r.e,
        coerce: r.S,
        adapter: (0, d.f)({
          key: "coinTradingView_calloutMinPositionUsd",
          codec: "json",
        }),
        control: {
          kind: "pills",
          options: r.m.map((e) => ({ value: e, rawLabel: (0, c.l)(e) })),
        },
        labelKey: "web.settings.chart.callout_min_position",
        descriptionKey: "web.settings.chart.callout_min_position_description",
        searchTerms: [
          "callouts",
          "bubbles",
          "min position",
          "position size",
          "floor",
        ],
      }),
      "chart.markers.bounties": y({
        id: "chart.markers.bounties",
        key: "coinTradingView_bountiesEnabled",
        fallback: !1,
        labelKey: "web.settings.chart.bubble_bounties",
        searchTerms: ["bounties"],
      }),
      "chart.markers.kolTrades": y({
        id: "chart.markers.kolTrades",
        key: "coinTradingView_kolTradesEnabled",
        fallback: !0,
        labelKey: "coin_details.chart.settings.mark_top_traders",
        searchTerms: ["kol", "influencer", "kolscan", "top traders"],
      }),
      "chart.markers.followingTrades": y({
        id: "chart.markers.followingTrades",
        key: "coinTradingView_followingTradesEnabled",
        fallback: !0,
        labelKey: "web.chart.following_trades",
        searchTerms: ["following", "friends"],
      }),
      "chart.markers.verifiedTrades": y({
        id: "chart.markers.verifiedTrades",
        key: "coinTradingView_verifiedTradesEnabled",
        fallback: !1,
        labelKey: "web.chart.verified_trades",
        searchTerms: ["verified"],
      }),
      "chart.markers.groupThreshold": (0, u.f)({
        id: "chart.markers.groupThreshold",
        section: "chart",
        scope: "account",
        default: n.l,
        coerce: n.$,
        adapter: (0, d.f)({
          key: "coinTradingView_markerGroupThreshold",
          codec: "json",
        }),
        control: {
          kind: "pills",
          options: [
            { value: n.p, labelKey: "common.off" },
            ...n.N.map((e) => ({ value: e, rawLabel: (0, n.s)(e) })),
          ],
        },
        labelKey: "web.settings.chart.marker_grouping",
        descriptionKey: "web.settings.chart.marker_grouping_description",
        searchTerms: [
          "group",
          "grouping",
          "repeat trades",
          "spam",
          "collapse",
          "merge",
          "count",
          "bubbles",
          "markers",
        ],
      }),
    };
  e.s(["O", 0, h, "$", 0, g]);
};
