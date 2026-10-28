// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    a = e.i(352386),
    i = e.i(78436),
    n = e.i(634103),
    r = e.i(334942),
    l = e.i(791898),
    s = e.i(27847),
    o = e.i(654748),
    d = e.i(849152),
    u = e.i(828424),
    c = e.i(937863),
    p = e.i(994112),
    m = e.i(943331),
    h = e.i(431798);
  let f = (e) => e.decks.find((t) => t.id === e.activeDeckId) ?? e.decks[0],
    g = (e) => f(e)?.columns ?? [],
    b = (e, t) =>
      e.decks.map((a) => (a.id === e.activeDeckId ? { ...a, columns: t } : a)),
    v = (e, t, a, i) => {
      let n = g(e),
        r = n.find((e) => e.id === t),
        l = r?.panes.find((e) => e.id === a);
      if (!r || !l) return null;
      let s = i(l);
      return s
        ? n.map((e) =>
            e.id === t
              ? (0, o.T)({
                  ...e,
                  panes: e.panes.map((e) => (e.id === a ? s : e)),
                })
              : e,
          )
        : null;
    },
    y = (e, t) => e.map((e) => (e.id === t ? (0, o.T)(e) : e)),
    k = (e, t) =>
      e.decks.map((a) =>
        a.id !== e.activeDeckId
          ? a
          : null === e.deckRowPx
            ? { ...a, columns: t }
            : { ...a, columns: t, fillPausedBelowPx: e.deckRowPx },
      ),
    w = (e) => {
      let t = (0, o.U)(e.columns);
      return t === e.columns ? e : { ...e, columns: t };
    },
    C = (e) => {
      if (e.length < l.b) return e;
      let t = e.map((e) => !0 === e.auto).lastIndexOf(!0);
      return -1 === t ? null : e.filter((e, a) => a !== t);
    },
    _ = (e, t, a) => {
      let i = { ...e.byView };
      Object.keys(a).length > 0 ? (i[t] = a) : delete i[t];
      let { byView: n, ...r } = e;
      return Object.keys(i).length > 0 ? { ...r, byView: i } : r;
    },
    M = (e, t) => {
      let { trending: a, ...i } = e,
        n = (0, h.T)(a, t);
      return n ? { ...i, trending: n } : i;
    },
    U = (e, t, a) => {
      let { board: i, ...n } = t,
        r = (0, d.X)(e, a);
      return r ? { ...n, board: r } : n;
    },
    x = [
      "global-callouts",
      "trending",
      "movers",
      "leaderboard",
      "watchlist",
      "my-alerts",
    ],
    T = (e) => Math.min(Math.max(Math.round(e), 300), 560),
    A = (e) => {
      if ("object" != typeof e || null === e) return {};
      let t = {};
      for (let a of ["left", "right"]) !0 === e[a] && (t[a] = !0);
      return t;
    },
    S = (e, t) =>
      0 === t.length
        ? e
        : Object.fromEntries(Object.entries(e).filter(([e]) => !t.includes(e))),
    I = (e) => {
      if ("object" != typeof e || null === e) return {};
      let t = {};
      for (let a of ["left", "right"]) {
        let i = e[a];
        "number" == typeof i && Number.isFinite(i) && (t[a] = T(i));
      }
      return t;
    },
    F = (e, t, a, i) => {
      let n = (e) => e.side === a && !e.float;
      if (e.filter(n).length >= p._) return null;
      let { float: r, ...l } = t,
        s = { ...l, side: a },
        o = e.filter(n).map((e) => e.id)[Math.max(0, Math.trunc(i))],
        d = [],
        u = !1;
      for (let t of e) (t.id === o && (d.push(s), (u = !0)), d.push(t));
      return (u || d.push(s), d);
    },
    j = (0, i.$)()(
      (0, n.V)(
        (e) => {
          let t;
          return {
            ...{
              decks: [(t = (0, p.C)())],
              activeDeckId: t.id,
              widgets: [],
              widgetWidths: {},
              sideCollapsed: {},
              lists: [],
              style: r.X,
              deckRowPx: null,
            },
            addColumn: (t, a, i) =>
              e((e) => {
                let [n] = (0, p.D)([(0, p.B)(t, a)]);
                if (!n) return e;
                let r = C(g(e));
                if (!r) return e;
                let l = [...r],
                  s =
                    void 0 === i
                      ? l.length
                      : Math.max(0, Math.min(Math.trunc(i), l.length));
                return (l.splice(s, 0, n), { decks: b(e, l) });
              }),
            removeColumn: (t) =>
              e((e) => {
                let a = g(e);
                return a.some((e) => e.id === t)
                  ? {
                      decks: k(
                        e,
                        a.filter((e) => e.id !== t),
                      ),
                    }
                  : e;
              }),
            setColumnOrder: (t, a) =>
              e((e) => {
                let i = g(e);
                if (t.length !== i.length || new Set(t).size !== t.length)
                  return e;
                let n = new Map(i.map((e) => [e.id, e])),
                  r = [];
                for (let a of t) {
                  let t = n.get(a);
                  if (!t) return e;
                  r.push(t);
                }
                return { decks: b(e, void 0 === a ? r : y(r, a)) };
              }),
            dockColumnToSide: (t, a) =>
              e((e) => {
                let i = g(e),
                  n = i.find((e) => e.id === t),
                  r = n?.panes[0];
                if (!n || !r) return e;
                let l = e.widgets.find((e) => e.pane.view === r.view),
                  s = F(
                    e.widgets.filter((e) => e.id !== l?.id),
                    l ?? { id: (0, p.f)(), pane: r, side: a },
                    a,
                    0,
                  );
                return s
                  ? {
                      decks: k(
                        e,
                        i.filter((e) => e.id !== t),
                      ),
                      widgets: s,
                      sideCollapsed: { ...e.sideCollapsed, [a]: !1 },
                    }
                  : e;
              }),
            setPaneView: (t, a, i, n) =>
              e((e) => {
                let r = v(e, t, a, (e) => {
                  let t = e.byView?.[i] ?? {},
                    a = (0, p.e)(i, n),
                    r = a ? { ...t, params: a } : t;
                  return (0, p.r)(i, r) ? { ..._(e, i, r), view: i } : null;
                });
                return r ? { decks: b(e, r) } : e;
              }),
            togglePanePin: (t, a, i) =>
              e((e) => {
                let n = v(e, t, a, (e) => {
                  let t = (0, c.Z)(e, i);
                  return t === e ? null : t;
                });
                return n ? { decks: b(e, n) } : e;
              }),
            setPaneFilters: (t, a, i, n) =>
              e((e) => {
                let r = v(e, t, a, (e) => {
                  let t = e.byView?.[e.view] ?? {},
                    a = (0, u.V)(i, n, (0, u.Q)(e.view)),
                    { filters: r, ...l } = t,
                    s = a ? { ...l, filters: a } : l;
                  return _(e, e.view, s);
                });
                return r ? { decks: b(e, r) } : e;
              }),
            setPaneAccent: (t, a, i) =>
              e((e) => {
                if (void 0 !== i && !(0, p.Q)(i)) return e;
                let n = v(e, t, a, (e) => {
                  let { accent: t, ...a } = e;
                  return void 0 === i ? a : { ...a, accent: i };
                });
                return n ? { decks: b(e, n) } : e;
              }),
            setPaneTitle: (t, a, i) =>
              e((e) => {
                let n = (0, p.J)(i),
                  r = v(e, t, a, (e) => {
                    let { title: t, ...a } = e;
                    return void 0 === n ? a : { ...a, title: n };
                  });
                return r ? { decks: b(e, r) } : e;
              }),
            setPaneBoard: (t, a, i) =>
              e((e) => {
                let n = v(e, t, a, (e) =>
                  (0, d.J)(e.view, i)
                    ? _(e, e.view, U(e.view, e.byView?.[e.view] ?? {}, i))
                    : e,
                );
                return n ? { decks: b(e, n) } : e;
              }),
            setPaneTrending: (t, a, i) =>
              e((e) => {
                let n = v(e, t, a, (e) =>
                  (0, h.r)(e.view)
                    ? _(e, e.view, M(e.byView?.[e.view] ?? {}, i))
                    : null,
                );
                return n ? { decks: b(e, n) } : e;
              }),
            setPaneSound: (t, a, i) =>
              e((e) => {
                if (void 0 !== i && !(0, s.a)(i)) return e;
                let n = v(e, t, a, (e) => {
                  let { sound: t, ...a } = e;
                  return void 0 === i ? a : { ...a, sound: i };
                });
                return n ? { decks: b(e, n) } : e;
              }),
            splitPane: (t, a) =>
              e((e) => {
                let i = g(e),
                  n = i.find((e) => e.id === t);
                if (!n || n.panes.length >= p.p) return e;
                let r = n.panes.findIndex((e) => e.id === a);
                if (-1 === r) return e;
                let l = n.panes[r],
                  s = { id: (0, p.f)(), view: l.view };
                l.byView &&
                  (s.byView = Object.fromEntries(
                    Object.entries(l.byView).map(([e, t]) => [e, { ...t }]),
                  ));
                let d = [...n.panes];
                return (
                  d.splice(r + 1, 0, s),
                  {
                    decks: b(
                      e,
                      i.map((e) =>
                        e.id === t ? (0, o.T)({ ...e, panes: d }) : e,
                      ),
                    ),
                  }
                );
              }),
            removePane: (t, a) =>
              e((e) => {
                let i = g(e),
                  n = i.find((e) => e.id === t);
                return n && n.panes.some((e) => e.id === a)
                  ? 1 === n.panes.length
                    ? {
                        decks: k(
                          e,
                          i.filter((e) => e.id !== t),
                        ),
                      }
                    : {
                        decks: b(
                          e,
                          i.map((e) =>
                            e.id === t
                              ? (0, o.T)({
                                  ...e,
                                  panes: e.panes.filter((e) => e.id !== a),
                                })
                              : e,
                          ),
                        ),
                      }
                  : e;
              }),
            movePane: (t, a, i, n) =>
              e((e) => {
                let r = g(e),
                  l = r.find((e) => e.id === t),
                  s = r.find((e) => e.id === i),
                  d = l?.panes.find((e) => e.id === a);
                if (!l || !s || !d) return e;
                if (l.id === s.id) {
                  let t = l.panes.findIndex((e) => e.id === a),
                    i = [...l.panes];
                  i.splice(t, 1);
                  let s = Math.max(0, Math.min(Math.trunc(n), i.length));
                  return s === t
                    ? e
                    : (i.splice(s, 0, d),
                      {
                        decks: b(
                          e,
                          r.map((e) =>
                            e.id === l.id ? (0, o.T)({ ...e, panes: i }) : e,
                          ),
                        ),
                      });
                }
                if (s.panes.length >= p.p) return e;
                let u = [...s.panes],
                  c = Math.max(0, Math.min(Math.trunc(n), u.length));
                u.splice(c, 0, d);
                let m = l.panes.filter((e) => e.id !== a),
                  h = r
                    .map((e) =>
                      e.id === s.id
                        ? (0, o.T)({ ...e, panes: u })
                        : e.id === l.id
                          ? (0, o.T)({ ...e, panes: m })
                          : e,
                    )
                    .filter((e) => e.panes.length > 0);
                return { decks: 0 === m.length ? k(e, h) : b(e, h) };
              }),
            extractPane: (t, a, i) =>
              e((e) => {
                let n = g(e),
                  r = n.find((e) => e.id === t),
                  l = r?.panes.find((e) => e.id === a);
                if (!r || !l) return e;
                if (1 === r.panes.length) {
                  let t = n.filter((e) => e.id !== r.id),
                    a = Math.max(0, Math.min(Math.trunc(i), t.length));
                  return (t.splice(a, 0, (0, o.T)(r)), { decks: b(e, t) });
                }
                let s = C(n);
                if (!s) return e;
                let { size: d, ...u } = l,
                  c = { id: (0, p.f)(), panes: [u] },
                  m = s.map((e) =>
                    e.id === r.id
                      ? (0, o.T)({
                          ...e,
                          panes: e.panes.filter((e) => e.id !== a),
                        })
                      : e,
                  ),
                  h = Math.max(0, Math.min(Math.trunc(i), m.length));
                return (m.splice(h, 0, c), { decks: b(e, m) });
              }),
            stackColumns: (t, a, i = "end") =>
              e((e) => {
                if (t === a) return e;
                let n = g(e),
                  r = n.find((e) => e.id === t),
                  l = n.find((e) => e.id === a);
                return r && l && !(r.panes.length + l.panes.length > p.p)
                  ? {
                      decks: k(
                        e,
                        n
                          .map((e) =>
                            e.id === l.id
                              ? (0, o.T)({
                                  ...e,
                                  panes:
                                    "start" === i
                                      ? [...r.panes, ...e.panes]
                                      : [...e.panes, ...r.panes],
                                })
                              : e.id === r.id
                                ? { ...e, panes: [] }
                                : e,
                          )
                          .filter((e) => e.panes.length > 0),
                      ),
                    }
                  : e;
              }),
            addPane: (t, a, i) =>
              e((e) => {
                let n = g(e),
                  r = n.find((e) => e.id === t);
                if (!r || r.panes.length >= p.p) return e;
                let l = (0, p.T)(a, (0, p.e)(a, i));
                return (0, p.r)(l.view, l.byView?.[a] ?? {})
                  ? {
                      decks: b(
                        e,
                        n.map((e) =>
                          e.id === t
                            ? (0, o.T)({ ...e, panes: [...e.panes, l] })
                            : e,
                        ),
                      ),
                    }
                  : e;
              }),
            removeWidget: (t) =>
              e((e) =>
                e.widgets.some((e) => e.id === t)
                  ? { widgets: e.widgets.filter((e) => e.id !== t) }
                  : e,
              ),
            moveWidget: (t, a, i) =>
              e((e) => {
                let n = e.widgets.find((e) => e.id === t);
                if (!n) return e;
                let r = F(
                  e.widgets.filter((e) => e.id !== t),
                  n,
                  a,
                  i,
                );
                return r
                  ? {
                      widgets: r,
                      sideCollapsed: { ...e.sideCollapsed, [a]: !1 },
                    }
                  : e;
              }),
            floatWidget: (t, a) =>
              e((e) => {
                let i = e.widgets.find((e) => e.id === t),
                  n = (0, p.s)(a);
                return i &&
                  n &&
                  (i.float || !(e.widgets.filter((e) => e.float).length >= p.t))
                  ? {
                      widgets: [
                        ...e.widgets.filter((e) => e.id !== t),
                        { ...i, float: n },
                      ],
                    }
                  : e;
              }),
            bringWidgetToFront: (t) =>
              e((e) => {
                let a = e.widgets.find((e) => e.id === t);
                return a && e.widgets.at(-1)?.id !== t
                  ? { widgets: [...e.widgets.filter((e) => e.id !== t), a] }
                  : e;
              }),
            setWidgetView: (t, a, i) =>
              e((e) => {
                let n = e.widgets.find((e) => e.id === t);
                if (
                  !n ||
                  e.widgets.some((e) => e.id !== t && e.pane.view === a)
                )
                  return e;
                let r = n.pane.byView?.[a] ?? {},
                  l = (0, p.e)(a, i),
                  s = l ? { ...r, params: l } : r;
                if (!(0, p.r)(a, s)) return e;
                let o = { ..._(n.pane, a, s), view: a };
                return {
                  widgets: e.widgets.map((e) =>
                    e.id === t ? { ...e, pane: o } : e,
                  ),
                };
              }),
            setWidgetBoard: (t, a) =>
              e((e) => {
                let i = e.widgets.find((e) => e.id === t);
                if (!i || !(0, d.J)(i.pane.view, a)) return e;
                let n = _(
                  i.pane,
                  i.pane.view,
                  U(i.pane.view, i.pane.byView?.[i.pane.view] ?? {}, a),
                );
                return {
                  widgets: e.widgets.map((e) =>
                    e.id === t ? { ...e, pane: n } : e,
                  ),
                };
              }),
            setWidgetTrending: (t, a) =>
              e((e) => {
                let i = e.widgets.find((e) => e.id === t);
                if (!i || !(0, h.r)(i.pane.view)) return e;
                let n = _(
                  i.pane,
                  i.pane.view,
                  M(i.pane.byView?.[i.pane.view] ?? {}, a),
                );
                return {
                  widgets: e.widgets.map((e) =>
                    e.id === t ? { ...e, pane: n } : e,
                  ),
                };
              }),
            toggleWidgetShade: (t) =>
              e((e) => {
                let a = e.widgets.find((e) => e.id === t);
                if (!a) return e;
                let { shaded: i, ...n } = a,
                  r = i ? n : { ...n, shaded: !0 };
                return { widgets: e.widgets.map((e) => (e.id === t ? r : e)) };
              }),
            setWidgetSideWidth: (t, a) =>
              e((e) => {
                let i = T(a);
                return e.widgetWidths[t] === i
                  ? e
                  : { widgetWidths: { ...e.widgetWidths, [t]: i } };
              }),
            toggleSidePanel: (t) =>
              e((e) => {
                if (e.sideCollapsed[t])
                  return { sideCollapsed: { ...e.sideCollapsed, [t]: !1 } };
                if (
                  e.widgets.filter((e) => e.side === t && !e.float).length > 0
                )
                  return { sideCollapsed: { ...e.sideCollapsed, [t]: !0 } };
                let a = new Set([
                    ...e.widgets
                      .filter((e) => !e.float)
                      .map((e) => e.pane.view),
                    ...g(e).flatMap((e) => e.panes.map((e) => e.view)),
                  ]),
                  i = x.find((e) => !a.has(e));
                if (!i) return e;
                let n = F(e.widgets, (0, p.g)(i), t, 0);
                return n ? { widgets: n } : e;
              }),
            addList: (t) =>
              e((e) => {
                if (e.lists.length >= m.M || e.lists.some((e) => e.id === t.id))
                  return e;
                let a = (0, m.P)([t]);
                return a.length ? { lists: [...e.lists, a[0]] } : e;
              }),
            updateList: (t, a) =>
              e((e) => {
                let i = e.lists.findIndex((e) => e.id === t);
                if (-1 === i) return e;
                let n = e.lists[i],
                  r = void 0 !== a.name ? ((0, m.C)(a.name) ?? n.name) : n.name,
                  l = void 0 !== a.members ? (0, m.L)(a.members) : n.members,
                  s = [...e.lists];
                return ((s[i] = { ...n, name: r, members: l }), { lists: s });
              }),
            deleteList: (t) =>
              e((e) =>
                e.lists.some((e) => e.id === t)
                  ? { lists: e.lists.filter((e) => e.id !== t) }
                  : e,
              ),
            setColumnWidth: (t, a) =>
              e((e) => {
                let i = g(e);
                return i.find((e) => e.id === t) &&
                  (void 0 === a || Number.isFinite(a))
                  ? {
                      decks: b(
                        e,
                        i.map((e) => {
                          if (e.id !== t) return e;
                          let { width: i, ...n } = e;
                          return (0, o.T)(
                            void 0 === a ? n : { ...n, width: (0, p.q)(a) },
                          );
                        }),
                      ),
                    }
                  : e;
              }),
            setPaneSizes: (t, a) =>
              e((e) => {
                let i = g(e),
                  n = i.find((e) => e.id === t);
                return !n ||
                  a.length !== n.panes.length ||
                  a.some((e) => !Number.isFinite(e) || e <= 0)
                  ? e
                  : {
                      decks: b(
                        e,
                        i.map((e) =>
                          e.id === t
                            ? (0, o.T)({
                                ...e,
                                panes: e.panes.map((e, t) => ({
                                  ...e,
                                  size: (0, p.o)(a[t]),
                                })),
                              })
                            : e,
                        ),
                      ),
                    };
              }),
            syncDeckFill: (t, a) =>
              e((e) => {
                let i = f(e),
                  n = i?.columns ?? [],
                  r = (0, o.O)({
                    columns: n,
                    rowPx: t,
                    candidates: a,
                    pausedBelowPx: i?.fillPausedBelowPx,
                  });
                return r === n
                  ? e.deckRowPx === t
                    ? e
                    : { deckRowPx: t }
                  : { deckRowPx: t, decks: b(e, r) };
              }),
            clearDeckFill: () =>
              e((e) => {
                let t = e.decks.map(w),
                  a = t.every((t, a) => t === e.decks[a]);
                return a && null === e.deckRowPx
                  ? e
                  : { deckRowPx: null, decks: a ? e.decks : t };
              }),
            adoptColumn: (t) =>
              e((e) => {
                let a = g(e);
                return a.some((e) => e.id === t && e.auto)
                  ? { decks: b(e, y(a, t)) }
                  : e;
              }),
            createDeck: (t, a) =>
              e((e) => {
                if (e.decks.length >= p.i) return e;
                let i = f(e),
                  n = {
                    id: (0, p.f)(),
                    name: (0, p.Y)(t, `List ${e.decks.length + 1}`),
                    columns: a?.cloneActive
                      ? (0, o.U)(i.columns).map((e) => ({
                          ...e,
                          id: (0, p.f)(),
                        }))
                      : [],
                  };
                return { decks: [...e.decks, n], activeDeckId: n.id };
              }),
            switchDeck: (t) =>
              e((e) =>
                t !== e.activeDeckId && e.decks.find((e) => e.id === t)
                  ? { activeDeckId: t }
                  : e,
              ),
            renameDeck: (t, a) =>
              e((e) => {
                let i = e.decks.find((e) => e.id === t);
                return i
                  ? {
                      decks: e.decks.map((e) =>
                        e.id === t ? { ...e, name: (0, p.Y)(a, i.name) } : e,
                      ),
                    }
                  : e;
              }),
            deleteDeck: (t) =>
              e((e) => {
                if (e.decks.length <= 1 || !e.decks.some((e) => e.id === t))
                  return e;
                let a = e.decks.filter((e) => e.id !== t);
                if (t !== e.activeDeckId) return { decks: a };
                let i = a[0];
                return { decks: a, activeDeckId: i.id };
              }),
            setStyle: (t) =>
              e((e) => ({ style: (0, r.$)({ ...e.style, ...t }) })),
          };
        },
        {
          name: "screeners-deck",
          storage: (0, n.j)(() => localStorage),
          version: 6,
          migrate: (e, t) => {
            if (null == e || "object" != typeof e) return e;
            let a = e;
            if (t < 3) {
              let { docked: e, dockSides: t, ...i } = a;
              a = i;
            }
            if (t < 2) {
              let { decks: e, activeDeckId: t, style: i, columns: n, ...r } = a;
              a = r;
            }
            if (t < 6 && (0, p.Z)(a.decks)) {
              let [e] = a.decks;
              a = { ...a, decks: [{ ...e, columns: (0, p.c)() }] };
            }
            return a;
          },
          partialize: ({
            decks: e,
            activeDeckId: t,
            widgets: a,
            widgetWidths: i,
            sideCollapsed: n,
            lists: r,
            style: l,
          }) => ({
            decks: e.map(w),
            activeDeckId: t,
            widgets: a,
            widgetWidths: i,
            sideCollapsed: n,
            lists: r,
            style: l,
          }),
          merge: (e, t) => {
            if (null == e) return t;
            if (!("decks" in e) && Array.isArray(e.columns)) {
              let a = (0, p.D)(e.columns),
                i = { ...(0, p.C)(), columns: a },
                n = (0, p.X)(e.widgets);
              return {
                ...t,
                decks: [i],
                activeDeckId: i.id,
                widgets: n,
                widgetWidths: I(e.widgetWidths),
                sideCollapsed: S(A(e.sideCollapsed), (0, p.y)(e.widgets, n)),
                lists: (0, m.P)(e.lists),
                style: (0, r.$)(e.style),
              };
            }
            let a = (0, p.u)(e.decks);
            0 === a.length && (a = [(0, p.C)()]);
            let i = a.some((t) => t.id === e.activeDeckId)
                ? e.activeDeckId
                : a[0].id,
              n = (0, p.X)(e.widgets);
            return {
              ...t,
              decks: a,
              activeDeckId: i,
              widgets: n,
              widgetWidths: I(e.widgetWidths),
              sideCollapsed: S(A(e.sideCollapsed), (0, p.y)(e.widgets, n)),
              lists: (0, m.P)(e.lists),
              style: (0, r.$)(e.style),
            };
          },
        },
      ),
    );
  e.s([
    "x",
    0,
    560,
    "B",
    0,
    300,
    "O",
    0,
    g,
    "p",
    0,
    f,
    "b",
    0,
    (e, t) =>
      e.widgets.flatMap((e) => (e.float && e.id !== t ? [e.float] : [])),
    "f",
    0,
    (e, t, a) =>
      e.widgets.filter((e) => e.side === t && !e.float && e.pane.view !== a)
        .length < p._,
    "a",
    0,
    () => {
      let e,
        i,
        n = (0, t.c)(2),
        [r, l] = (0, a.useState)(!1);
      return (
        n[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = () =>
              j.persist?.hasHydrated()
                ? void l(!0)
                : j.persist?.onFinishHydration(() => {
                    l(!0);
                  })),
            (i = []),
            (n[0] = e),
            (n[1] = i))
          : ((e = n[0]), (i = n[1])),
        (0, a.useEffect)(e, i),
        r
      );
    },
    "V",
    0,
    j,
  ]);
};
