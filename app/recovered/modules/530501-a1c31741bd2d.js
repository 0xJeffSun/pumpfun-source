// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var r = e.i(148269);
  let n = ["compact", "comfy"],
    l = "comfy",
    i = (e) => "object" == typeof e && null !== e,
    a = (e) => e.map((e) => e.id),
    s = ({ value: e, catalog: t }) => {
      if (!Array.isArray(e)) return [];
      let r = new Set(a(t)),
        n = [];
      for (let t of e)
        "string" == typeof t && r.has(t) && (n.includes(t) || n.push(t));
      return n;
    },
    o = (e) => (n.includes(e) ? e : l),
    u = ({ value: e, catalog: t }) => {
      if (!i(e)) return null;
      let { id: r, dir: n } = e;
      if ("asc" !== n && "desc" !== n) return null;
      let l = t.find((e) => e.id === r);
      return l?.sortValue ? { id: l.id, dir: n } : null;
    },
    d = ({ config: e, stored: t, id: r, anchor: n }) => {
      let l = ((e) => {
        if ("object" != typeof e || null === e) return null;
        let { order: t } = e;
        return Array.isArray(t) ? t : null;
      })(t);
      if (null === l || l.includes(r)) return e;
      let i = e.order.filter((e) => e !== r);
      if (i.length === e.order.length) return e;
      let a = i.indexOf(n),
        s = -1 === a ? i.length : a + 1;
      return { ...e, order: [...i.slice(0, s), r, ...i.slice(s)] };
    };
  e.s(
    [
      "v",
      0,
      ({ value: e, catalog: t }) => {
        let r = i(e) ? e : {},
          n = new Set(t.filter((e) => e.lockedVisible).map((e) => e.id)),
          l = s({ value: r.hidden, catalog: t }).filter((e) => !n.has(e)),
          d = s({ value: r.order, catalog: t });
        for (let e of a(t)) d.includes(e) || d.push(e);
        return {
          hidden: l,
          order: d,
          density: o(r.density),
          sort: u({ value: r.sort, catalog: t }),
        };
      },
      "J",
      0,
      o,
      "T",
      0,
      u,
      "s",
      0,
      ({ current: e, id: t }) =>
        e && e.id === t
          ? "desc" === e.dir
            ? { id: t, dir: "asc" }
            : null
          : { id: t, dir: "desc" },
      "y",
      0,
      ({ catalog: e }) => ({ hidden: [], order: a(e), density: l, sort: null }),
      "o",
      0,
      ({ order: e, id: t, direction: r }) => {
        let n = e.indexOf(t),
          l = "up" === r ? n - 1 : n + 1;
        if (-1 === n || l < 0 || l >= e.length) return [...e];
        let i = [...e];
        return ((i[n] = e[l]), (i[l] = e[n]), i);
      },
      "u",
      0,
      ({ config: e, catalog: t }) => {
        let r = new Map(t.map((e) => [e.id, e])),
          n = new Set(e.hidden),
          l = [];
        for (let t of e.order) {
          let e = r.get(t);
          !e || (n.has(t) && !e.lockedVisible) || l.push(e);
        }
        return l;
      },
      "i",
      0,
      d,
      "w",
      0,
      ({ order: e, id: t, withId: r }) => {
        let n = e.indexOf(t),
          l = e.indexOf(r);
        if (-1 === n || -1 === l || n === l) return [...e];
        let i = [...e];
        return ((i[n] = e[l]), (i[l] = e[n]), i);
      },
    ],
    811198,
  );
  let c = [
      "coin",
      "graph",
      "market_cap",
      "change",
      "volume",
      "txns",
      "traders",
      "holders",
      "buy",
    ],
    m = ["calls", "change", "volume", "txns", "traders"],
    f = ["market_cap", "change", "volume", "txns", "traders", "holders"],
    p = [
      { id: "coin", labelKey: "common.coin", lockedVisible: !0 },
      { id: "graph", labelKey: "web.home.table_col_graph" },
      {
        id: "calls",
        labelKey: "web.home.lens_calls",
        hintKey: "web.home.table_calls_hint",
        align: "right",
      },
      {
        id: "market_cap",
        labelKey: "web.common.market_cap",
        align: "right",
        sortValue: (e) => e.usd_market_cap ?? null,
      },
      { id: "change", labelKey: "web.home.table_col_change", align: "right" },
      {
        id: "volume",
        labelKey: "web.explore.filter_vol_label",
        align: "right",
      },
      { id: "txns", labelKey: "web.home.table_col_txns", align: "right" },
      {
        id: "traders",
        labelKey: "web.leaderboard.tab_traders",
        align: "right",
      },
      {
        id: "holders",
        labelKey: "advanced_search.holders",
        align: "right",
        sortValue: (e) => e.holder_count ?? null,
      },
      { id: "buy", labelKey: "web.trade.buy", lockedVisible: !0 },
    ],
    h = [r.E.FEATURED, r.E.TRENDING],
    b = [r.E.CALLS],
    g = ({ sort: e, isWatchlistView: t = !1, hasSearchTerm: r = !1 }) =>
      !t && !r && b.includes(e),
    x = (e) => e.map((e) => e.id),
    y = ((t = ["calls"]), p.filter((e) => !t.includes(e.id))),
    v = x(p),
    w = x(p);
  e.s(
    [
      "Z",
      0,
      p,
      "t",
      0,
      c,
      "A",
      0,
      (e) => {
        let t = p.find((t) => t.id === e);
        if (!t) throw Error(`Unknown explore column "${e}"`);
        return t;
      },
      "R",
      0,
      (e) => (g(e) ? v : c),
      "b",
      0,
      (e) => (g(e) ? p : y),
      "n",
      0,
      g,
      "B",
      0,
      (e) => "string" == typeof e && w.includes(e),
      "c",
      0,
      ({
        sort: e,
        isWatchlistView: t = !1,
        hasSearchTerm: r = !1,
        hasActiveFilters: n = !1,
      }) => !t && !r && !n && h.includes(e),
      "m",
      0,
      (e) => f.includes(e),
      "h",
      0,
      (e) => m.includes(e),
      "d",
      0,
      ({ config: e, stored: t }) =>
        d({ config: e, stored: t, id: "calls", anchor: "graph" }),
      "W",
      0,
      ({ config: e, stored: t }) =>
        d({ config: e, stored: t, id: "holders", anchor: "traders" }),
    ],
    530501,
  );
};
