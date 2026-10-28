// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var r = e.i(148269);
  let a = ["compact", "comfy"],
    i = "comfy",
    l = (e) => "object" == typeof e && null !== e,
    n = (e) => e.map((e) => e.id),
    o = ({ value: e, catalog: t }) => {
      if (!Array.isArray(e)) return [];
      let r = new Set(n(t)),
        a = [];
      for (let t of e)
        "string" == typeof t && r.has(t) && (a.includes(t) || a.push(t));
      return a;
    },
    s = (e) => (a.includes(e) ? e : i),
    d = ({ value: e, catalog: t }) => {
      if (!l(e)) return null;
      let { id: r, dir: a } = e;
      if ("asc" !== a && "desc" !== a) return null;
      let i = t.find((e) => e.id === r);
      return i?.sortValue ? { id: i.id, dir: a } : null;
    },
    c = ({ config: e, stored: t, id: r, anchor: a }) => {
      let i = ((e) => {
        if ("object" != typeof e || null === e) return null;
        let { order: t } = e;
        return Array.isArray(t) ? t : null;
      })(t);
      if (null === i || i.includes(r)) return e;
      let l = e.order.filter((e) => e !== r);
      if (l.length === e.order.length) return e;
      let n = l.indexOf(a),
        o = -1 === n ? l.length : n + 1;
      return { ...e, order: [...l.slice(0, o), r, ...l.slice(o)] };
    };
  e.s(
    [
      "v",
      0,
      ({ value: e, catalog: t }) => {
        let r = l(e) ? e : {},
          a = new Set(t.filter((e) => e.lockedVisible).map((e) => e.id)),
          i = o({ value: r.hidden, catalog: t }).filter((e) => !a.has(e)),
          c = o({ value: r.order, catalog: t });
        for (let e of n(t)) c.includes(e) || c.push(e);
        return {
          hidden: i,
          order: c,
          density: s(r.density),
          sort: d({ value: r.sort, catalog: t }),
        };
      },
      "J",
      0,
      s,
      "T",
      0,
      d,
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
      ({ catalog: e }) => ({ hidden: [], order: n(e), density: i, sort: null }),
      "o",
      0,
      ({ order: e, id: t, direction: r }) => {
        let a = e.indexOf(t),
          i = "up" === r ? a - 1 : a + 1;
        if (-1 === a || i < 0 || i >= e.length) return [...e];
        let l = [...e];
        return ((l[a] = e[i]), (l[i] = e[a]), l);
      },
      "u",
      0,
      ({ config: e, catalog: t }) => {
        let r = new Map(t.map((e) => [e.id, e])),
          a = new Set(e.hidden),
          i = [];
        for (let t of e.order) {
          let e = r.get(t);
          !e || (a.has(t) && !e.lockedVisible) || i.push(e);
        }
        return i;
      },
      "i",
      0,
      c,
      "w",
      0,
      ({ order: e, id: t, withId: r }) => {
        let a = e.indexOf(t),
          i = e.indexOf(r);
        if (-1 === a || -1 === i || a === i) return [...e];
        let l = [...e];
        return ((l[a] = e[i]), (l[i] = e[a]), l);
      },
    ],
    811198,
  );
  let u = [
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
    f = ["calls", "change", "volume", "txns", "traders"],
    m = ["market_cap", "change", "volume", "txns", "traders", "holders"],
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
    b = [r.E.FEATURED, r.E.TRENDING],
    h = [r.E.CALLS],
    v = ({ sort: e, isWatchlistView: t = !1, hasSearchTerm: r = !1 }) =>
      !t && !r && h.includes(e),
    x = (e) => e.map((e) => e.id),
    g = ((t = ["calls"]), p.filter((e) => !t.includes(e.id))),
    y = x(p),
    w = x(p);
  e.s(
    [
      "Z",
      0,
      p,
      "t",
      0,
      u,
      "A",
      0,
      (e) => {
        let t = p.find((t) => t.id === e);
        if (!t) throw Error(`Unknown explore column "${e}"`);
        return t;
      },
      "R",
      0,
      (e) => (v(e) ? y : u),
      "b",
      0,
      (e) => (v(e) ? p : g),
      "n",
      0,
      v,
      "B",
      0,
      (e) => "string" == typeof e && w.includes(e),
      "c",
      0,
      ({
        sort: e,
        isWatchlistView: t = !1,
        hasSearchTerm: r = !1,
        hasActiveFilters: a = !1,
      }) => !t && !r && !a && b.includes(e),
      "m",
      0,
      (e) => m.includes(e),
      "h",
      0,
      (e) => f.includes(e),
      "d",
      0,
      ({ config: e, stored: t }) =>
        c({ config: e, stored: t, id: "calls", anchor: "graph" }),
      "W",
      0,
      ({ config: e, stored: t }) =>
        c({ config: e, stored: t, id: "holders", anchor: "traders" }),
    ],
    530501,
  );
};
