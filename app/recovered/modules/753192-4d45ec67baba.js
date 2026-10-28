// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    i = e.i(421087),
    a = e.i(513579),
    n = e.i(541710),
    r = e.i(791898),
    s = e.i(937863),
    l = e.i(994112),
    o = e.i(943331),
    c = e.i(743786),
    d = e.i(595673),
    m = e.i(45329);
  let u = (e) => e?.announce !== !1,
    p = (e) => e.panes[0]?.view ?? "trending",
    f = (e) => (0, m.O)(m.V.getState()).find((t) => t.id === e)?.panes.length;
  e.s([
    "f",
    0,
    function () {
      let e = (0, m.V)((e) => e.addColumn),
        x = (0, m.V)((e) => e.removeColumn),
        g = (0, m.V)((e) => e.setColumnOrder),
        h = (0, m.V)((e) => e.dockColumnToSide),
        b = (0, m.V)((e) => e.adoptColumn),
        y = (0, a.G)(),
        v = (0, t.useCallback)(
          (t, a, n, s) => {
            let l = new Set((0, m.O)(m.V.getState()).map((e) => e.id));
            e(t, a, n);
            let o = (0, m.O)(m.V.getState()),
              c = o.findIndex((e) => !l.has(e.id));
            -1 === c ||
              ((0, d.L9)({
                action: "add",
                columnType: t,
                hasParam: !!r.J[t].param,
              }),
              u(s) &&
                y(
                  (0, i.E)({
                    title: r.J[t].label,
                    position: c + 1,
                    total: o.length,
                  }),
                ));
          },
          [e, y],
        ),
        w = (0, t.useCallback)(
          (e, t) => {
            let a = (0, m.O)(m.V.getState()).length;
            (x(e.id),
              (0, m.O)(m.V.getState()).length === a ||
                ((0, d.L9)({ action: "remove", columnType: p(e) }),
                u(t) && y((0, i.s)({ title: (0, l.S)(e) }))));
          },
          [x, y],
        ),
        _ = (0, t.useCallback)(
          (e, t, a) => {
            g(e, t.id);
            let n = (0, m.O)(m.V.getState()),
              r = n.findIndex((e) => e.id === t.id);
            -1 === r ||
              ((0, d.L9)({ action: "reorder", columnType: p(t) }),
              u(a) &&
                y(
                  (0, i.J)({
                    title: (0, l.S)(t),
                    position: r + 1,
                    total: n.length,
                  }),
                ));
          },
          [g, y],
        ),
        k = (0, t.useCallback)(
          (e, t, a) => {
            let n = (0, m.O)(m.V.getState()).length;
            (h(e.id, t),
              (0, m.O)(m.V.getState()).length === n ||
                ((0, d.L9)({ action: "dock", columnType: p(e) }),
                u(a) && y((0, i.k)({ title: (0, l.S)(e), side: t }))));
          },
          [h, y],
        ),
        j = (0, m.V)((e) => e.setPaneView),
        C = (0, t.useCallback)(
          (e, t, i, a) => {
            (j(e, t.id, i, a),
              (0, d.L9)({
                action: "pane-view",
                columnType: i,
                hasParam: !!r.J[i].param,
              }),
              y(`Showing ${r.J[i].label}.`));
          },
          [j, y],
        ),
        N = (0, m.V)((e) => e.togglePanePin),
        S = (0, t.useCallback)(
          (e, t, i) => {
            let a = (0, s.x)(t, i);
            N(e, t.id, i);
            let n = (0, m.O)(m.V.getState())
              .find((t) => t.id === e)
              ?.panes.find((e) => e.id === t.id);
            n &&
              (0, s.x)(n, i) !== a &&
              (0, d.L9)({
                action: "pane-pin",
                columnType: i,
                detail: a ? "unpin" : "pin",
              });
          },
          [N],
        ),
        P = (0, m.V)((e) => e.setPaneFilters),
        V = (0, n.l)(),
        A = (0, t.useCallback)(
          (e, t, i) => {
            (P(e, t.id, i, V),
              (0, d.L9)({ action: "pane-filter", columnType: t.view }));
          },
          [P, V],
        ),
        T = (0, m.V)((e) => e.setPaneBoard),
        L = (0, t.useCallback)(
          (e, t, i) => {
            (T(e, t.id, i),
              (0, d.L9)({
                action: "pane-board",
                columnType: t.view,
                detail: i,
              }));
          },
          [T],
        ),
        $ = (0, m.V)((e) => e.setPaneTrending),
        z = (0, t.useCallback)(
          (e, t, i) => {
            $(e, t.id, i);
          },
          [$],
        ),
        O = (0, m.V)((e) => e.setPaneSound),
        W = (0, t.useCallback)(
          (e, t, i) => {
            (O(e, t.id, i), (0, d.L9)({ action: "sound", columnType: t.view }));
          },
          [O],
        ),
        I = (0, m.V)((e) => e.setPaneAccent),
        F = (0, t.useCallback)(
          (e, t, i) => {
            (I(e, t.id, i),
              (0, d.L9)({ action: "pane-accent", columnType: t.view }));
          },
          [I],
        ),
        R = (0, m.V)((e) => e.setPaneTitle),
        K = (0, t.useCallback)(
          (e, t, i) => {
            (R(e, t.id, i),
              (0, d.L9)({ action: "pane-rename", columnType: t.view }));
          },
          [R],
        ),
        q = (0, m.V)((e) => e.addPane),
        D = (0, t.useCallback)(
          (e, t, i, a) => {
            let n = f(e.id);
            (q(e.id, t, i),
              f(e.id) === n ||
                ((0, d.L9)({
                  action: "pane-add",
                  columnType: t,
                  hasParam: !!r.J[t].param,
                }),
                u(a) &&
                  y(`Added ${r.J[t].label} as a pane of ${(0, l.S)(e)}.`)));
          },
          [q, y],
        ),
        Q = (0, m.V)((e) => e.movePane),
        U = (0, t.useCallback)(
          (e, t, i, a, n) => {
            let s = (0, m.O)(m.V.getState())
              .find((t) => t.id === e)
              ?.panes.find((e) => e.id === t);
            (Q(e, t, i, a),
              !s ||
                ((0, d.L9)({ action: "pane-move", columnType: s.view }),
                u(n) &&
                  y(
                    e === i
                      ? `${r.J[s.view].label} pane moved to slot ${a + 1}.`
                      : `${r.J[s.view].label} pane moved to another column.`,
                  )));
          },
          [Q, y],
        ),
        E = (0, m.V)((e) => e.extractPane),
        J = (0, t.useCallback)(
          (e, t, i, a) => {
            let n = (0, m.O)(m.V.getState())
              .find((t) => t.id === e)
              ?.panes.find((e) => e.id === t);
            (E(e, t, i),
              !n ||
                ((0, d.L9)({ action: "pane-extract", columnType: n.view }),
                u(a) && y(`${r.J[n.view].label} moved into its own column.`)));
          },
          [E, y],
        ),
        B = (0, m.V)((e) => e.stackColumns),
        H = (0, t.useCallback)(
          (e, t, i = "end", a) => {
            let n = (0, m.O)(m.V.getState()).length,
              r = (0, m.O)(m.V.getState()).find((t) => t.id === e);
            (B(e, t, i),
              (0, m.O)(m.V.getState()).length === n ||
                ((0, d.L9)({
                  action: "stack",
                  columnType: r ? p(r) : "trending",
                }),
                u(a) && y("Columns stacked.")));
          },
          [B, y],
        ),
        M = (0, m.V)((e) => e.setColumnWidth),
        G = (0, t.useCallback)(
          (e, t) => {
            (M(e.id, t), (0, d.L9)({ action: "resize", columnType: p(e) }));
          },
          [M],
        ),
        X = (0, m.V)((e) => e.setPaneSizes),
        Y = (0, t.useCallback)(
          (e, t) => {
            (X(e.id, t), (0, d.L9)({ action: "resize", columnType: p(e) }));
          },
          [X],
        ),
        Z = (0, m.V)((e) => e.splitPane),
        ee = (0, t.useCallback)(
          (e, t) => {
            let i = (0, m.O)(m.V.getState()).find((t) => t.id === e)?.panes
              .length;
            Z(e, t.id);
            let a = (0, m.O)(m.V.getState()).find((t) => t.id === e)?.panes
              .length;
            void 0 !== a &&
              a !== i &&
              ((0, d.L9)({ action: "pane-split", columnType: t.view }),
              y(`Column split — ${a} panes.`));
          },
          [Z, y],
        ),
        et = (0, m.V)((e) => e.removePane),
        ei = (0, t.useCallback)(
          (e, t) => {
            (et(e, t.id),
              (0, d.L9)({ action: "pane-close", columnType: t.view }),
              y(`${r.J[t.view].label} pane closed.`));
          },
          [et, y],
        ),
        ea = (0, m.V)((e) => e.removeWidget),
        en = (0, t.useCallback)(
          (e) => {
            (ea(e.id),
              (0, d.L9)({ action: "widget-toggle", columnType: e.pane.view }),
              y(`${(0, l.j)(e.pane)} widget closed.`));
          },
          [ea, y],
        ),
        er = (0, m.V)((e) => e.moveWidget),
        es = (0, t.useCallback)(
          (e, t, i) => {
            (er(e.id, t, i),
              (0, d.L9)({ action: "widget-move", columnType: e.pane.view }),
              y(`${(0, l.j)(e.pane)} widget docked ${t}.`));
          },
          [er, y],
        ),
        el = (0, m.V)((e) => e.setWidgetView),
        eo = (0, t.useCallback)(
          (e, t, i) => {
            (el(e.id, t, i),
              (0, d.L9)({
                action: "widget-view",
                columnType: t,
                hasParam: !!r.J[t].param,
              }),
              y(`Showing ${r.J[t].label}.`));
          },
          [el, y],
        ),
        ec = (0, m.V)((e) => e.setWidgetBoard),
        ed = (0, t.useCallback)(
          (e, t) => {
            (ec(e.id, t),
              (0, d.L9)({
                action: "widget-board",
                columnType: e.pane.view,
                detail: t,
              }));
          },
          [ec],
        ),
        em = (0, m.V)((e) => e.setWidgetTrending),
        eu = (0, t.useCallback)(
          (e, t) => {
            em(e.id, t);
          },
          [em],
        ),
        ep = (0, m.V)((e) => e.toggleWidgetShade),
        ef = (0, t.useCallback)(
          (e) => {
            (ep(e.id),
              (0, d.L9)({
                action: e.shaded ? "widget-restore" : "widget-minimize",
                columnType: e.pane.view,
              }),
              y(
                `${r.J[e.pane.view].label} ${e.shaded ? "restored" : "minimized"}.`,
              ));
          },
          [ep, y],
        ),
        ex = (0, m.V)((e) => e.floatWidget),
        eg = (0, t.useCallback)(
          (e, t) => {
            (ex(e.id, t),
              (0, d.L9)({ action: "widget-float", columnType: e.pane.view }),
              y(`${(0, l.j)(e.pane)} floating.`));
          },
          [ex, y],
        ),
        eh = (0, m.V)((e) => e.floatWidget),
        eb = (0, t.useCallback)(
          (e, t) => {
            (eh(e.id, t),
              (0, d.L9)({ action: "widget-resize", columnType: e.pane.view }));
          },
          [eh],
        ),
        ey = (0, m.V)((e) => e.bringWidgetToFront),
        ev = (0, m.V)((e) => e.setWidgetSideWidth),
        ew = (0, t.useCallback)(
          (e, t) => {
            (ev(e, t),
              (0, d.L9)({ action: "dock-resize", columnType: "deck" }));
          },
          [ev],
        ),
        e_ = (0, t.useCallback)(
          (t, i) => {
            let a = (0, m.O)(m.V.getState()).findIndex((e) => e.id === t.id),
              n = (0, l.G)(i);
            (t.auto && b(t.id),
              e(i.view, n.params, -1 === a ? void 0 : a + 1),
              (0, d.L9)({ action: "pane-split", columnType: i.view }),
              y(`${(0, l.j)(i)} split right.`));
          },
          [e, b, y],
        ),
        ek = (0, m.V)((e) => e.toggleSidePanel),
        ej = (0, t.useCallback)(
          (e) => {
            (ek(e), (0, d.L9)({ action: "side-toggle", columnType: e }));
          },
          [ek],
        ),
        eC = (0, m.V)((e) => e.addList),
        eN = (0, t.useCallback)(
          (e, t, i) => {
            let a = (0, o.p)(e, t, i);
            return (
              eC(a),
              (0, d.L9)({ action: "custom-list-create", columnType: t }),
              y(`${a.name} list created.`),
              a
            );
          },
          [eC, y],
        ),
        eS = (0, m.V)((e) => e.updateList),
        eP = (0, t.useCallback)(
          (e, t) => {
            (eS(e.id, t),
              (0, d.L9)({ action: "custom-list-update", columnType: e.kind }));
          },
          [eS],
        ),
        eV = (0, m.V)((e) => e.deleteList),
        eA = (0, t.useCallback)(
          (e) => {
            (eV(e.id),
              (0, d.L9)({ action: "custom-list-delete", columnType: e.kind }),
              y(`${e.name} list deleted.`));
          },
          [eV, y],
        ),
        eT = (0, m.V)((e) => e.createDeck),
        eL = (0, t.useCallback)(
          (e, t) => {
            let i = m.V.getState().decks.length;
            eT(e, t);
            let a = m.V.getState();
            a.decks.length !== i &&
              ((0, d.L9)({ action: "list-create", columnType: "list" }),
              y(`Created list ${a.decks[a.decks.length - 1].name}.`));
          },
          [eT, y],
        ),
        e$ = (0, m.V)((e) => e.switchDeck),
        ez = (0, t.useCallback)(
          (e) => {
            let t = m.V.getState().activeDeckId;
            e$(e);
            let i = m.V.getState();
            if (i.activeDeckId === t) return;
            (0, d.L9)({ action: "list-switch", columnType: "list" });
            let a = i.decks.find((t) => t.id === e);
            a && y(`Switched to list ${a.name}.`);
          },
          [e$, y],
        ),
        eO = (0, m.V)((e) => e.renameDeck),
        eW = (0, t.useCallback)(
          (e, t) => {
            (eO(e, t),
              (0, d.L9)({ action: "list-rename", columnType: "list" }));
          },
          [eO],
        ),
        eI = (0, m.V)((e) => e.deleteDeck),
        eF = (0, t.useCallback)(
          (e) => {
            let t = m.V.getState().decks.length;
            (eI(e),
              m.V.getState().decks.length !== t &&
                ((0, d.L9)({ action: "list-delete", columnType: "list" }),
                y("List deleted.")));
          },
          [eI, y],
        ),
        eR = (0, m.V)((e) => e.setStyle),
        eK = (0, t.useCallback)(
          (e) => {
            (eR(e), (0, d.L9)({ action: "style", columnType: "board" }));
          },
          [eR],
        ),
        eq =
          (e, t) =>
          (...i) => {
            let a = void 0 === t ? void 0 : i[t];
            a?.transition === !1 ? e(...i) : (0, c.S)(() => e(...i));
          };
      return {
        addColumn: eq(v),
        addPane: eq(D),
        removeColumn: eq(w),
        setColumnOrder: eq(_, 2),
        dockColumnToSide: eq(k, 2),
        setPaneView: eq(C),
        togglePanePin: S,
        setPaneFilters: A,
        setPaneBoard: L,
        setPaneTrending: z,
        setPaneSound: W,
        setPaneAccent: F,
        setPaneTitle: K,
        splitPane: eq(ee),
        splitColumnRight: eq(e_),
        removePane: eq(ei),
        movePane: eq(U),
        extractPane: eq(J),
        stackColumns: eq(H, 3),
        setColumnWidth: G,
        setPaneSizes: Y,
        removeWidget: eq(en),
        moveWidget: eq(es),
        floatWidget: eq(eg),
        setWidgetView: eq(eo),
        setWidgetBoard: ed,
        setWidgetTrending: eu,
        toggleWidgetShade: eq(ef),
        resizeFloatWidget: eb,
        bringWidgetToFront: ey,
        setWidgetSideWidth: ew,
        toggleSidePanel: eq(ej),
        createList: eN,
        updateList: eP,
        deleteList: eA,
        createDeck: eL,
        switchDeck: ez,
        renameDeck: eW,
        deleteDeck: eF,
        setStyle: eK,
      };
    },
  ]);
};
