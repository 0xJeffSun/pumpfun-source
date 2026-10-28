// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    r =
      (((t = {}).CALLS = "calls"),
      (t.CHARITY = "charity"),
      (t.CLOSEST_MATCH = "relevance"),
      (t.CUSTOM_PAIRS = "custom_pairs"),
      (t.FEATURED = "featured"),
      (t.LIVE = "live"),
      (t.MAJORS = "majors"),
      (t.MARKET_CAP = "market_cap"),
      (t.NEWEST = "created_timestamp"),
      (t.OLDEST = "oldest_coins"),
      (t.STOCKS = "stocks"),
      (t.TOP = "top"),
      (t.TRADE = "last_trade_timestamp"),
      (t.TRENDING = "trending"),
      t);
  let i = "featured",
    s = (e) => ("relevance" === e ? i : e),
    n = [
      "charity",
      "relevance",
      "custom_pairs",
      "featured",
      "market_cap",
      "created_timestamp",
      "oldest_coins",
      "last_trade_timestamp",
    ],
    o = { calls: !0 },
    a = (e) => ({ sort: e, notice: null }),
    l = (e, t, r) => ({ sort: e, notice: { kind: t, from: r } }),
    c = (e) => a(n.includes(e) ? e : i),
    d = ["trending", "calls", "live", "currently_live", "stocks", "majors"];
  e.s([
    "Q",
    0,
    i,
    "_",
    0,
    o,
    "E",
    () => r,
    "H",
    0,
    s,
    "D",
    0,
    (e) => (n.includes(e) || d.includes(e) ? e : c(e).sort),
    "P",
    0,
    (e, t) => {
      let r = e ?? "",
        i =
          "social-terminal" !== t.variant
            ? c(r)
            : ((e, t) => {
                switch (e) {
                  case "":
                  case "featured":
                  case "top":
                  default:
                    return a("featured");
                  case "trending":
                    return a("trending");
                  case "calls":
                    return a(t.calls ? "calls" : "featured");
                  case "live":
                  case "currently_live":
                    return a("live");
                  case "stocks":
                  case "majors":
                  case "oldest_coins":
                  case "charity":
                  case "custom_pairs":
                  case "market_cap":
                    return a(e);
                  case "created_timestamp":
                    return l("created_timestamp", "new", e);
                  case "last_trade_timestamp":
                    return l("featured", "generic", e);
                  case "mayhem":
                    return l("featured", "mayhem", e);
                  case "relevance":
                    return a("relevance");
                }
              })(r, t.availability ?? o);
      return t.hasSearchTerm
        ? a(i.sort)
        : "relevance" === i.sort
          ? a(s(i.sort))
          : i;
    },
  ]);
};
