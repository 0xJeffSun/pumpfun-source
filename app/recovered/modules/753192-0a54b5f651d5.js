// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(421087),
    a = e.i(513579),
    i = e.i(541710),
    n = e.i(791898),
    l = e.i(937863),
    s = e.i(994112),
    o = e.i(943331),
    d = e.i(743786),
    u = e.i(595673),
    c = e.i(45329);
  let m = (e) => e?.announce !== !1,
    p = (e) => e.panes[0]?.view ?? "trending",
    h = (e) => (0, c.O)(c.V.getState()).find((t) => t.id === e)?.panes.length;
  e.s([
    "f",
    0,
    function () {
      let e = (0, c.V)((e) => e.addColumn),
        f = (0, c.V)((e) => e.removeColumn),
        g = (0, c.V)((e) => e.setColumnOrder),
        b = (0, c.V)((e) => e.dockColumnToSide),
        y = (0, c.V)((e) => e.adoptColumn),
        v = (0, a.G)(),
        w = (0, t.useCallback)(
          (t, a, i, l) => {
            let s = new Set((0, c.O)(c.V.getState()).map((e) => e.id));
            e(t, a, i);
            let o = (0, c.O)(c.V.getState()),
              d = o.findIndex((e) => !s.has(e.id));
            -1 === d ||
              ((0, u.L9)({
                action: "add",
                columnType: t,
                hasParam: !!n.J[t].param,
              }),
              m(l) &&
                v(
                  (0, r.E)({
                    title: n.J[t].label,
                    position: d + 1,
                    total: o.length,
                  }),
                ));
          },
          [e, v],
        ),
        k = (0, t.useCallback)(
          (e, t) => {
            let a = (0, c.O)(c.V.getState()).length;
            (f(e.id),
              (0, c.O)(c.V.getState()).length === a ||
                ((0, u.L9)({ action: "remove", columnType: p(e) }),
                m(t) && v((0, r.s)({ title: (0, s.S)(e) }))));
          },
          [f, v],
        ),
        C = (0, t.useCallback)(
          (e, t, a) => {
            g(e, t.id);
            let i = (0, c.O)(c.V.getState()),
              n = i.findIndex((e) => e.id === t.id);
            -1 === n ||
              ((0, u.L9)({ action: "reorder", columnType: p(t) }),
              m(a) &&
                v(
                  (0, r.J)({
                    title: (0, s.S)(t),
                    position: n + 1,
                    total: i.length,
                  }),
                ));
          },
          [g, v],
        ),
        x = (0, t.useCallback)(
          (e, t, a) => {
            let i = (0, c.O)(c.V.getState()).length;
            (b(e.id, t),
              (0, c.O)(c.V.getState()).length === i ||
                ((0, u.L9)({ action: "dock", columnType: p(e) }),
                m(a) && v((0, r.k)({ title: (0, s.S)(e), side: t }))));
          },
          [b, v],
        ),
        I = (0, c.V)((e) => e.setPaneView),
        _ = (0, t.useCallback)(
          (e, t, r, a) => {
            (I(e, t.id, r, a),
              (0, u.L9)({
                action: "pane-view",
                columnType: r,
                hasParam: !!n.J[r].param,
              }),
              v(`Showing ${n.J[r].label}.`));
          },
          [I, v],
        ),
        T = (0, c.V)((e) => e.togglePanePin),
        E = (0, t.useCallback)(
          (e, t, r) => {
            let a = (0, l.x)(t, r);
            T(e, t.id, r);
            let i = (0, c.O)(c.V.getState())
              .find((t) => t.id === e)
              ?.panes.find((e) => e.id === t.id);
            i &&
              (0, l.x)(i, r) !== a &&
              (0, u.L9)({
                action: "pane-pin",
                columnType: r,
                detail: a ? "unpin" : "pin",
              });
          },
          [T],
        ),
        S = (0, c.V)((e) => e.setPaneFilters),
        A = (0, i.l)(),
        V = (0, t.useCallback)(
          (e, t, r) => {
            (S(e, t.id, r, A),
              (0, u.L9)({ action: "pane-filter", columnType: t.view }));
          },
          [S, A],
        ),
        L = (0, c.V)((e) => e.setPaneBoard),
        P = (0, t.useCallback)(
          (e, t, r) => {
            (L(e, t.id, r),
              (0, u.L9)({
                action: "pane-board",
                columnType: t.view,
                detail: r,
              }));
          },
          [L],
        ),
        j = (0, c.V)((e) => e.setPaneTrending),
        N = (0, t.useCallback)(
          (e, t, r) => {
            j(e, t.id, r);
          },
          [j],
        ),
        U = (0, c.V)((e) => e.setPaneSound),
        M = (0, t.useCallback)(
          (e, t, r) => {
            (U(e, t.id, r), (0, u.L9)({ action: "sound", columnType: t.view }));
          },
          [U],
        ),
        O = (0, c.V)((e) => e.setPaneAccent),
        $ = (0, t.useCallback)(
          (e, t, r) => {
            (O(e, t.id, r),
              (0, u.L9)({ action: "pane-accent", columnType: t.view }));
          },
          [O],
        ),
        q = (0, c.V)((e) => e.setPaneTitle),
        F = (0, t.useCallback)(
          (e, t, r) => {
            (q(e, t.id, r),
              (0, u.L9)({ action: "pane-rename", columnType: t.view }));
          },
          [q],
        ),
        D = (0, c.V)((e) => e.addPane),
        R = (0, t.useCallback)(
          (e, t, r, a) => {
            let i = h(e.id);
            (D(e.id, t, r),
              h(e.id) === i ||
                ((0, u.L9)({
                  action: "pane-add",
                  columnType: t,
                  hasParam: !!n.J[t].param,
                }),
                m(a) &&
                  v(`Added ${n.J[t].label} as a pane of ${(0, s.S)(e)}.`)));
          },
          [D, v],
        ),
        B = (0, c.V)((e) => e.movePane),
        G = (0, t.useCallback)(
          (e, t, r, a, i) => {
            let l = (0, c.O)(c.V.getState())
              .find((t) => t.id === e)
              ?.panes.find((e) => e.id === t);
            (B(e, t, r, a),
              !l ||
                ((0, u.L9)({ action: "pane-move", columnType: l.view }),
                m(i) &&
                  v(
                    e === r
                      ? `${n.J[l.view].label} pane moved to slot ${a + 1}.`
                      : `${n.J[l.view].label} pane moved to another column.`,
                  )));
          },
          [B, v],
        ),
        z = (0, c.V)((e) => e.extractPane),
        H = (0, t.useCallback)(
          (e, t, r, a) => {
            let i = (0, c.O)(c.V.getState())
              .find((t) => t.id === e)
              ?.panes.find((e) => e.id === t);
            (z(e, t, r),
              !i ||
                ((0, u.L9)({ action: "pane-extract", columnType: i.view }),
                m(a) && v(`${n.J[i.view].label} moved into its own column.`)));
          },
          [z, v],
        ),
        K = (0, c.V)((e) => e.stackColumns),
        W = (0, t.useCallback)(
          (e, t, r = "end", a) => {
            let i = (0, c.O)(c.V.getState()).length,
              n = (0, c.O)(c.V.getState()).find((t) => t.id === e);
            (K(e, t, r),
              (0, c.O)(c.V.getState()).length === i ||
                ((0, u.L9)({
                  action: "stack",
                  columnType: n ? p(n) : "trending",
                }),
                m(a) && v("Columns stacked.")));
          },
          [K, v],
        ),
        Q = (0, c.V)((e) => e.setColumnWidth),
        J = (0, t.useCallback)(
          (e, t) => {
            (Q(e.id, t), (0, u.L9)({ action: "resize", columnType: p(e) }));
          },
          [Q],
        ),
        Y = (0, c.V)((e) => e.setPaneSizes),
        Z = (0, t.useCallback)(
          (e, t) => {
            (Y(e.id, t), (0, u.L9)({ action: "resize", columnType: p(e) }));
          },
          [Y],
        ),
        X = (0, c.V)((e) => e.splitPane),
        ee = (0, t.useCallback)(
          (e, t) => {
            let r = (0, c.O)(c.V.getState()).find((t) => t.id === e)?.panes
              .length;
            X(e, t.id);
            let a = (0, c.O)(c.V.getState()).find((t) => t.id === e)?.panes
              .length;
            void 0 !== a &&
              a !== r &&
              ((0, u.L9)({ action: "pane-split", columnType: t.view }),
              v(`Column split — ${a} panes.`));
          },
          [X, v],
        ),
        et = (0, c.V)((e) => e.removePane),
        er = (0, t.useCallback)(
          (e, t) => {
            (et(e, t.id),
              (0, u.L9)({ action: "pane-close", columnType: t.view }),
              v(`${n.J[t.view].label} pane closed.`));
          },
          [et, v],
        ),
        ea = (0, c.V)((e) => e.removeWidget),
        ei = (0, t.useCallback)(
          (e) => {
            (ea(e.id),
              (0, u.L9)({ action: "widget-toggle", columnType: e.pane.view }),
              v(`${(0, s.j)(e.pane)} widget closed.`));
          },
          [ea, v],
        ),
        en = (0, c.V)((e) => e.moveWidget),
        el = (0, t.useCallback)(
          (e, t, r) => {
            (en(e.id, t, r),
              (0, u.L9)({ action: "widget-move", columnType: e.pane.view }),
              v(`${(0, s.j)(e.pane)} widget docked ${t}.`));
          },
          [en, v],
        ),
        es = (0, c.V)((e) => e.setWidgetView),
        eo = (0, t.useCallback)(
          (e, t, r) => {
            (es(e.id, t, r),
              (0, u.L9)({
                action: "widget-view",
                columnType: t,
                hasParam: !!n.J[t].param,
              }),
              v(`Showing ${n.J[t].label}.`));
          },
          [es, v],
        ),
        ed = (0, c.V)((e) => e.setWidgetBoard),
        eu = (0, t.useCallback)(
          (e, t) => {
            (ed(e.id, t),
              (0, u.L9)({
                action: "widget-board",
                columnType: e.pane.view,
                detail: t,
              }));
          },
          [ed],
        ),
        ec = (0, c.V)((e) => e.setWidgetTrending),
        em = (0, t.useCallback)(
          (e, t) => {
            ec(e.id, t);
          },
          [ec],
        ),
        ep = (0, c.V)((e) => e.toggleWidgetShade),
        eh = (0, t.useCallback)(
          (e) => {
            (ep(e.id),
              (0, u.L9)({
                action: e.shaded ? "widget-restore" : "widget-minimize",
                columnType: e.pane.view,
              }),
              v(
                `${n.J[e.pane.view].label} ${e.shaded ? "restored" : "minimized"}.`,
              ));
          },
          [ep, v],
        ),
        ef = (0, c.V)((e) => e.floatWidget),
        eg = (0, t.useCallback)(
          (e, t) => {
            (ef(e.id, t),
              (0, u.L9)({ action: "widget-float", columnType: e.pane.view }),
              v(`${(0, s.j)(e.pane)} floating.`));
          },
          [ef, v],
        ),
        eb = (0, c.V)((e) => e.floatWidget),
        ey = (0, t.useCallback)(
          (e, t) => {
            (eb(e.id, t),
              (0, u.L9)({ action: "widget-resize", columnType: e.pane.view }));
          },
          [eb],
        ),
        ev = (0, c.V)((e) => e.bringWidgetToFront),
        ew = (0, c.V)((e) => e.setWidgetSideWidth),
        ek = (0, t.useCallback)(
          (e, t) => {
            (ew(e, t),
              (0, u.L9)({ action: "dock-resize", columnType: "deck" }));
          },
          [ew],
        ),
        eC = (0, t.useCallback)(
          (t, r) => {
            let a = (0, c.O)(c.V.getState()).findIndex((e) => e.id === t.id),
              i = (0, s.G)(r);
            (t.auto && y(t.id),
              e(r.view, i.params, -1 === a ? void 0 : a + 1),
              (0, u.L9)({ action: "pane-split", columnType: r.view }),
              v(`${(0, s.j)(r)} split right.`));
          },
          [e, y, v],
        ),
        ex = (0, c.V)((e) => e.toggleSidePanel),
        eI = (0, t.useCallback)(
          (e) => {
            (ex(e), (0, u.L9)({ action: "side-toggle", columnType: e }));
          },
          [ex],
        ),
        e_ = (0, c.V)((e) => e.addList),
        eT = (0, t.useCallback)(
          (e, t, r) => {
            let a = (0, o.p)(e, t, r);
            return (
              e_(a),
              (0, u.L9)({ action: "custom-list-create", columnType: t }),
              v(`${a.name} list created.`),
              a
            );
          },
          [e_, v],
        ),
        eE = (0, c.V)((e) => e.updateList),
        eS = (0, t.useCallback)(
          (e, t) => {
            (eE(e.id, t),
              (0, u.L9)({ action: "custom-list-update", columnType: e.kind }));
          },
          [eE],
        ),
        eA = (0, c.V)((e) => e.deleteList),
        eV = (0, t.useCallback)(
          (e) => {
            (eA(e.id),
              (0, u.L9)({ action: "custom-list-delete", columnType: e.kind }),
              v(`${e.name} list deleted.`));
          },
          [eA, v],
        ),
        eL = (0, c.V)((e) => e.createDeck),
        eP = (0, t.useCallback)(
          (e, t) => {
            let r = c.V.getState().decks.length;
            eL(e, t);
            let a = c.V.getState();
            a.decks.length !== r &&
              ((0, u.L9)({ action: "list-create", columnType: "list" }),
              v(`Created list ${a.decks[a.decks.length - 1].name}.`));
          },
          [eL, v],
        ),
        ej = (0, c.V)((e) => e.switchDeck),
        eN = (0, t.useCallback)(
          (e) => {
            let t = c.V.getState().activeDeckId;
            ej(e);
            let r = c.V.getState();
            if (r.activeDeckId === t) return;
            (0, u.L9)({ action: "list-switch", columnType: "list" });
            let a = r.decks.find((t) => t.id === e);
            a && v(`Switched to list ${a.name}.`);
          },
          [ej, v],
        ),
        eU = (0, c.V)((e) => e.renameDeck),
        eM = (0, t.useCallback)(
          (e, t) => {
            (eU(e, t),
              (0, u.L9)({ action: "list-rename", columnType: "list" }));
          },
          [eU],
        ),
        eO = (0, c.V)((e) => e.deleteDeck),
        e$ = (0, t.useCallback)(
          (e) => {
            let t = c.V.getState().decks.length;
            (eO(e),
              c.V.getState().decks.length !== t &&
                ((0, u.L9)({ action: "list-delete", columnType: "list" }),
                v("List deleted.")));
          },
          [eO, v],
        ),
        eq = (0, c.V)((e) => e.setStyle),
        eF = (0, t.useCallback)(
          (e) => {
            (eq(e), (0, u.L9)({ action: "style", columnType: "board" }));
          },
          [eq],
        ),
        eD =
          (e, t) =>
          (...r) => {
            let a = void 0 === t ? void 0 : r[t];
            a?.transition === !1 ? e(...r) : (0, d.S)(() => e(...r));
          };
      return {
        addColumn: eD(w),
        addPane: eD(R),
        removeColumn: eD(k),
        setColumnOrder: eD(C, 2),
        dockColumnToSide: eD(x, 2),
        setPaneView: eD(_),
        togglePanePin: E,
        setPaneFilters: V,
        setPaneBoard: P,
        setPaneTrending: N,
        setPaneSound: M,
        setPaneAccent: $,
        setPaneTitle: F,
        splitPane: eD(ee),
        splitColumnRight: eD(eC),
        removePane: eD(er),
        movePane: eD(G),
        extractPane: eD(H),
        stackColumns: eD(W, 3),
        setColumnWidth: J,
        setPaneSizes: Z,
        removeWidget: eD(ei),
        moveWidget: eD(el),
        floatWidget: eD(eg),
        setWidgetView: eD(eo),
        setWidgetBoard: eu,
        setWidgetTrending: em,
        toggleWidgetShade: eD(eh),
        resizeFloatWidget: ey,
        bringWidgetToFront: ev,
        setWidgetSideWidth: ek,
        toggleSidePanel: eD(eI),
        createList: eT,
        updateList: eS,
        deleteList: eV,
        createDeck: eP,
        switchDeck: eN,
        renameDeck: eM,
        deleteDeck: e$,
        setStyle: eF,
      };
    },
  ]);
};
