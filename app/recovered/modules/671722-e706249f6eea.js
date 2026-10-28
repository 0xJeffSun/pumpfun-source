// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(148269);
  let r = [
      "watchlist",
      "trending",
      "movers",
      "calls",
      "live",
      "new",
      "stocks",
      "majors",
      "oldest",
      "charities",
      "custom_pairs",
      "market_cap",
    ],
    i = {
      watchlist: {
        id: "watchlist",
        target: { kind: "watchlist" },
        labelKey: "home.tabs.watchlist",
        descriptionKey: "web.home.lens_watchlist_description",
        placement: "strip",
      },
      trending: {
        id: "trending",
        target: { kind: "sort", sort: t.E.TRENDING },
        labelKey: "web.common.trending",
        descriptionKey: "web.home.lens_trending_description",
        placement: "strip",
      },
      movers: {
        id: "movers",
        target: { kind: "sort", sort: t.E.FEATURED },
        labelKey: "home.movers.title",
        descriptionKey: "web.home.lens_movers_description",
        placement: "strip",
      },
      calls: {
        id: "calls",
        target: { kind: "sort", sort: t.E.CALLS },
        labelKey: "web.home.lens_calls",
        descriptionKey: "web.home.lens_calls_description",
        placement: "strip",
      },
      live: {
        id: "live",
        target: { kind: "sort", sort: t.E.LIVE },
        labelKey: "web.nav.live",
        descriptionKey: "web.home.lens_live_description",
        placement: "strip",
      },
      new: {
        id: "new",
        target: { kind: "sort", sort: t.E.NEWEST },
        labelKey: "common.new",
        descriptionKey: "advanced_search.screener_settings.descriptions.new",
        placement: "url-only",
      },
      oldest: {
        id: "oldest",
        target: { kind: "sort", sort: t.E.OLDEST },
        labelKey: "web.home.tab_oldest",
        placement: "strip",
      },
      charities: {
        id: "charities",
        target: { kind: "sort", sort: t.E.CHARITY },
        labelKey: "web.home.tab_charities",
        placement: "strip",
      },
      custom_pairs: {
        id: "custom_pairs",
        target: { kind: "sort", sort: t.E.CUSTOM_PAIRS },
        labelKey: "web.home.tab_custom_pairs",
        placement: "strip",
      },
      stocks: {
        id: "stocks",
        target: { kind: "sort", sort: t.E.STOCKS },
        labelKey: "web.screeners.trending_stocks",
        descriptionKey: "web.home.lens_stocks_description",
        placement: "strip",
      },
      majors: {
        id: "majors",
        target: { kind: "sort", sort: t.E.MAJORS },
        labelKey: "web.home.lens_majors",
        descriptionKey: "web.home.lens_majors_description",
        placement: "strip",
      },
      market_cap: {
        id: "market_cap",
        target: { kind: "sort", sort: t.E.MARKET_CAP },
        labelKey: "search.sort_options.market_cap",
        placement: "strip",
      },
    },
    s = ["watchlist", "trending", "movers", "calls", "custom_pairs", "live"],
    n = [
      ["watchlist", "movers", "calls", "live"],
      ["watchlist", "trending", "movers", "calls", "live"],
      ["watchlist", "trending", "movers", "custom_pairs", "calls", "live"],
      [
        "watchlist",
        "trending",
        "movers",
        "calls",
        "custom_pairs",
        "stocks",
        "majors",
        "live",
      ],
    ],
    o = ["watchlist"],
    a = r.filter((e) => "strip" === i[e].placement),
    l = (e) => "string" == typeof e && r.includes(e),
    c = (e) => o.includes(e),
    d = (e) => [...o, ...e.filter((e) => !c(e))],
    u = (e, t, r) => {
      let i = e.indexOf(t),
        s = e.indexOf(r);
      if (-1 === i || -1 === s || i === s) return [...e];
      let n = e.filter((e) => e !== t);
      return d([...n.slice(0, s), t, ...n.slice(s)]);
    };
  e.s([
    "X",
    0,
    s,
    "M",
    0,
    i,
    "E",
    0,
    (e) => {
      let t;
      if (!Array.isArray(e)) return [...s];
      let r = d(
        (t = e.filter((e) => l(e) && "strip" === i[e].placement)).filter(
          (e, r) => t.indexOf(e) === r,
        ),
      );
      return n.some(
        (e) => e.length === r.length && e.every((e, t) => e === r[t]),
      )
        ? [...s]
        : r;
    },
    "V",
    0,
    (e) =>
      r.find((t) => {
        let r = i[t].target;
        return "sort" === r.kind && r.sort === e;
      }),
    "I",
    0,
    (e, t) => (c(t) ? [...e] : e.filter((e) => e !== t)),
    "t",
    0,
    (e, r = t._) => "calls" !== e || r.calls,
    "$",
    0,
    l,
    "Z",
    0,
    c,
    "x",
    0,
    (e) => a.filter((t) => !e.includes(t)),
    "y",
    0,
    (e, t, r) => {
      let i = e.indexOf(t),
        s = i + r,
        n = o.filter((t) => e.includes(t)).length;
      return i < n || s < n || s >= e.length ? [...e] : u(e, t, e[s]);
    },
    "n",
    0,
    u,
    "N",
    0,
    (e, t) =>
      e.includes(t) || "strip" !== i[t].placement ? [...e] : d([...e, t]),
  ]);
};
