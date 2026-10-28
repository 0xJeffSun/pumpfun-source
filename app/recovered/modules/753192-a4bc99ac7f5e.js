// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    a = e.i(421087),
    i = e.i(513579),
    l = e.i(541710),
    r = e.i(791898),
    n = e.i(937863),
    o = e.i(994112),
    s = e.i(943331),
    d = e.i(743786),
    c = e.i(595673),
    u = e.i(45329);
  let m = (e) => e?.announce !== !1,
    p = (e) => e.panes[0]?.view ?? "trending",
    h = (e) => (0, u.O)(u.V.getState()).find((t) => t.id === e)?.panes.length;
  e.s([
    "f",
    0,
    function () {
      let e = (0, u.V)((e) => e.addColumn),
        f = (0, u.V)((e) => e.removeColumn),
        g = (0, u.V)((e) => e.setColumnOrder),
        y = (0, u.V)((e) => e.dockColumnToSide),
        v = (0, u.V)((e) => e.adoptColumn),
        b = (0, i.G)(),
        I = (0, t.useCallback)(
          (t, i, l, n) => {
            let o = new Set((0, u.O)(u.V.getState()).map((e) => e.id));
            e(t, i, l);
            let s = (0, u.O)(u.V.getState()),
              d = s.findIndex((e) => !o.has(e.id));
            -1 === d ||
              ((0, c.L9)({
                action: "add",
                columnType: t,
                hasParam: !!r.J[t].param,
              }),
              m(n) &&
                b(
                  (0, a.E)({
                    title: r.J[t].label,
                    position: d + 1,
                    total: s.length,
                  }),
                ));
          },
          [e, b],
        ),
        w = (0, t.useCallback)(
          (e, t) => {
            let i = (0, u.O)(u.V.getState()).length;
            (f(e.id),
              (0, u.O)(u.V.getState()).length === i ||
                ((0, c.L9)({ action: "remove", columnType: p(e) }),
                m(t) && b((0, a.s)({ title: (0, o.S)(e) }))));
          },
          [f, b],
        ),
        C = (0, t.useCallback)(
          (e, t, i) => {
            g(e, t.id);
            let l = (0, u.O)(u.V.getState()),
              r = l.findIndex((e) => e.id === t.id);
            -1 === r ||
              ((0, c.L9)({ action: "reorder", columnType: p(t) }),
              m(i) &&
                b(
                  (0, a.J)({
                    title: (0, o.S)(t),
                    position: r + 1,
                    total: l.length,
                  }),
                ));
          },
          [g, b],
        ),
        k = (0, t.useCallback)(
          (e, t, i) => {
            let l = (0, u.O)(u.V.getState()).length;
            (y(e.id, t),
              (0, u.O)(u.V.getState()).length === l ||
                ((0, c.L9)({ action: "dock", columnType: p(e) }),
                m(i) && b((0, a.k)({ title: (0, o.S)(e), side: t }))));
          },
          [y, b],
        ),
        x = (0, u.V)((e) => e.setPaneView),
        T = (0, t.useCallback)(
          (e, t, a, i) => {
            (x(e, t.id, a, i),
              (0, c.L9)({
                action: "pane-view",
                columnType: a,
                hasParam: !!r.J[a].param,
              }),
              b(`Showing ${r.J[a].label}.`));
          },
          [x, b],
        ),
        _ = (0, u.V)((e) => e.togglePanePin),
        E = (0, t.useCallback)(
          (e, t, a) => {
            let i = (0, n.x)(t, a);
            _(e, t.id, a);
            let l = (0, u.O)(u.V.getState())
              .find((t) => t.id === e)
              ?.panes.find((e) => e.id === t.id);
            l &&
              (0, n.x)(l, a) !== i &&
              (0, c.L9)({
                action: "pane-pin",
                columnType: a,
                detail: i ? "unpin" : "pin",
              });
          },
          [_],
        ),
        N = (0, u.V)((e) => e.setPaneFilters),
        S = (0, l.l)(),
        M = (0, t.useCallback)(
          (e, t, a) => {
            (N(e, t.id, a, S),
              (0, c.L9)({ action: "pane-filter", columnType: t.view }));
          },
          [N, S],
        ),
        P = (0, u.V)((e) => e.setPaneBoard),
        U = (0, t.useCallback)(
          (e, t, a) => {
            (P(e, t.id, a),
              (0, c.L9)({
                action: "pane-board",
                columnType: t.view,
                detail: a,
              }));
          },
          [P],
        ),
        A = (0, u.V)((e) => e.setPaneTrending),
        j = (0, t.useCallback)(
          (e, t, a) => {
            A(e, t.id, a);
          },
          [A],
        ),
        V = (0, u.V)((e) => e.setPaneSound),
        L = (0, t.useCallback)(
          (e, t, a) => {
            (V(e, t.id, a), (0, c.L9)({ action: "sound", columnType: t.view }));
          },
          [V],
        ),
        $ = (0, u.V)((e) => e.setPaneAccent),
        O = (0, t.useCallback)(
          (e, t, a) => {
            ($(e, t.id, a),
              (0, c.L9)({ action: "pane-accent", columnType: t.view }));
          },
          [$],
        ),
        q = (0, u.V)((e) => e.setPaneTitle),
        F = (0, t.useCallback)(
          (e, t, a) => {
            (q(e, t.id, a),
              (0, c.L9)({ action: "pane-rename", columnType: t.view }));
          },
          [q],
        ),
        D = (0, u.V)((e) => e.addPane),
        B = (0, t.useCallback)(
          (e, t, a, i) => {
            let l = h(e.id);
            (D(e.id, t, a),
              h(e.id) === l ||
                ((0, c.L9)({
                  action: "pane-add",
                  columnType: t,
                  hasParam: !!r.J[t].param,
                }),
                m(i) &&
                  b(`Added ${r.J[t].label} as a pane of ${(0, o.S)(e)}.`)));
          },
          [D, b],
        ),
        R = (0, u.V)((e) => e.movePane),
        z = (0, t.useCallback)(
          (e, t, a, i, l) => {
            let n = (0, u.O)(u.V.getState())
              .find((t) => t.id === e)
              ?.panes.find((e) => e.id === t);
            (R(e, t, a, i),
              !n ||
                ((0, c.L9)({ action: "pane-move", columnType: n.view }),
                m(l) &&
                  b(
                    e === a
                      ? `${r.J[n.view].label} pane moved to slot ${i + 1}.`
                      : `${r.J[n.view].label} pane moved to another column.`,
                  )));
          },
          [R, b],
        ),
        G = (0, u.V)((e) => e.extractPane),
        Q = (0, t.useCallback)(
          (e, t, a, i) => {
            let l = (0, u.O)(u.V.getState())
              .find((t) => t.id === e)
              ?.panes.find((e) => e.id === t);
            (G(e, t, a),
              !l ||
                ((0, c.L9)({ action: "pane-extract", columnType: l.view }),
                m(i) && b(`${r.J[l.view].label} moved into its own column.`)));
          },
          [G, b],
        ),
        W = (0, u.V)((e) => e.stackColumns),
        K = (0, t.useCallback)(
          (e, t, a = "end", i) => {
            let l = (0, u.O)(u.V.getState()).length,
              r = (0, u.O)(u.V.getState()).find((t) => t.id === e);
            (W(e, t, a),
              (0, u.O)(u.V.getState()).length === l ||
                ((0, c.L9)({
                  action: "stack",
                  columnType: r ? p(r) : "trending",
                }),
                m(i) && b("Columns stacked.")));
          },
          [W, b],
        ),
        H = (0, u.V)((e) => e.setColumnWidth),
        J = (0, t.useCallback)(
          (e, t) => {
            (H(e.id, t), (0, c.L9)({ action: "resize", columnType: p(e) }));
          },
          [H],
        ),
        Y = (0, u.V)((e) => e.setPaneSizes),
        Z = (0, t.useCallback)(
          (e, t) => {
            (Y(e.id, t), (0, c.L9)({ action: "resize", columnType: p(e) }));
          },
          [Y],
        ),
        X = (0, u.V)((e) => e.splitPane),
        ee = (0, t.useCallback)(
          (e, t) => {
            let a = (0, u.O)(u.V.getState()).find((t) => t.id === e)?.panes
              .length;
            X(e, t.id);
            let i = (0, u.O)(u.V.getState()).find((t) => t.id === e)?.panes
              .length;
            void 0 !== i &&
              i !== a &&
              ((0, c.L9)({ action: "pane-split", columnType: t.view }),
              b(`Column split — ${i} panes.`));
          },
          [X, b],
        ),
        et = (0, u.V)((e) => e.removePane),
        ea = (0, t.useCallback)(
          (e, t) => {
            (et(e, t.id),
              (0, c.L9)({ action: "pane-close", columnType: t.view }),
              b(`${r.J[t.view].label} pane closed.`));
          },
          [et, b],
        ),
        ei = (0, u.V)((e) => e.removeWidget),
        el = (0, t.useCallback)(
          (e) => {
            (ei(e.id),
              (0, c.L9)({ action: "widget-toggle", columnType: e.pane.view }),
              b(`${(0, o.j)(e.pane)} widget closed.`));
          },
          [ei, b],
        ),
        er = (0, u.V)((e) => e.moveWidget),
        en = (0, t.useCallback)(
          (e, t, a) => {
            (er(e.id, t, a),
              (0, c.L9)({ action: "widget-move", columnType: e.pane.view }),
              b(`${(0, o.j)(e.pane)} widget docked ${t}.`));
          },
          [er, b],
        ),
        eo = (0, u.V)((e) => e.setWidgetView),
        es = (0, t.useCallback)(
          (e, t, a) => {
            (eo(e.id, t, a),
              (0, c.L9)({
                action: "widget-view",
                columnType: t,
                hasParam: !!r.J[t].param,
              }),
              b(`Showing ${r.J[t].label}.`));
          },
          [eo, b],
        ),
        ed = (0, u.V)((e) => e.setWidgetBoard),
        ec = (0, t.useCallback)(
          (e, t) => {
            (ed(e.id, t),
              (0, c.L9)({
                action: "widget-board",
                columnType: e.pane.view,
                detail: t,
              }));
          },
          [ed],
        ),
        eu = (0, u.V)((e) => e.setWidgetTrending),
        em = (0, t.useCallback)(
          (e, t) => {
            eu(e.id, t);
          },
          [eu],
        ),
        ep = (0, u.V)((e) => e.toggleWidgetShade),
        eh = (0, t.useCallback)(
          (e) => {
            (ep(e.id),
              (0, c.L9)({
                action: e.shaded ? "widget-restore" : "widget-minimize",
                columnType: e.pane.view,
              }),
              b(
                `${r.J[e.pane.view].label} ${e.shaded ? "restored" : "minimized"}.`,
              ));
          },
          [ep, b],
        ),
        ef = (0, u.V)((e) => e.floatWidget),
        eg = (0, t.useCallback)(
          (e, t) => {
            (ef(e.id, t),
              (0, c.L9)({ action: "widget-float", columnType: e.pane.view }),
              b(`${(0, o.j)(e.pane)} floating.`));
          },
          [ef, b],
        ),
        ey = (0, u.V)((e) => e.floatWidget),
        ev = (0, t.useCallback)(
          (e, t) => {
            (ey(e.id, t),
              (0, c.L9)({ action: "widget-resize", columnType: e.pane.view }));
          },
          [ey],
        ),
        eb = (0, u.V)((e) => e.bringWidgetToFront),
        eI = (0, u.V)((e) => e.setWidgetSideWidth),
        ew = (0, t.useCallback)(
          (e, t) => {
            (eI(e, t),
              (0, c.L9)({ action: "dock-resize", columnType: "deck" }));
          },
          [eI],
        ),
        eC = (0, t.useCallback)(
          (t, a) => {
            let i = (0, u.O)(u.V.getState()).findIndex((e) => e.id === t.id),
              l = (0, o.G)(a);
            (t.auto && v(t.id),
              e(a.view, l.params, -1 === i ? void 0 : i + 1),
              (0, c.L9)({ action: "pane-split", columnType: a.view }),
              b(`${(0, o.j)(a)} split right.`));
          },
          [e, v, b],
        ),
        ek = (0, u.V)((e) => e.toggleSidePanel),
        ex = (0, t.useCallback)(
          (e) => {
            (ek(e), (0, c.L9)({ action: "side-toggle", columnType: e }));
          },
          [ek],
        ),
        eT = (0, u.V)((e) => e.addList),
        e_ = (0, t.useCallback)(
          (e, t, a) => {
            let i = (0, s.p)(e, t, a);
            return (
              eT(i),
              (0, c.L9)({ action: "custom-list-create", columnType: t }),
              b(`${i.name} list created.`),
              i
            );
          },
          [eT, b],
        ),
        eE = (0, u.V)((e) => e.updateList),
        eN = (0, t.useCallback)(
          (e, t) => {
            (eE(e.id, t),
              (0, c.L9)({ action: "custom-list-update", columnType: e.kind }));
          },
          [eE],
        ),
        eS = (0, u.V)((e) => e.deleteList),
        eM = (0, t.useCallback)(
          (e) => {
            (eS(e.id),
              (0, c.L9)({ action: "custom-list-delete", columnType: e.kind }),
              b(`${e.name} list deleted.`));
          },
          [eS, b],
        ),
        eP = (0, u.V)((e) => e.createDeck),
        eU = (0, t.useCallback)(
          (e, t) => {
            let a = u.V.getState().decks.length;
            eP(e, t);
            let i = u.V.getState();
            i.decks.length !== a &&
              ((0, c.L9)({ action: "list-create", columnType: "list" }),
              b(`Created list ${i.decks[i.decks.length - 1].name}.`));
          },
          [eP, b],
        ),
        eA = (0, u.V)((e) => e.switchDeck),
        ej = (0, t.useCallback)(
          (e) => {
            let t = u.V.getState().activeDeckId;
            eA(e);
            let a = u.V.getState();
            if (a.activeDeckId === t) return;
            (0, c.L9)({ action: "list-switch", columnType: "list" });
            let i = a.decks.find((t) => t.id === e);
            i && b(`Switched to list ${i.name}.`);
          },
          [eA, b],
        ),
        eV = (0, u.V)((e) => e.renameDeck),
        eL = (0, t.useCallback)(
          (e, t) => {
            (eV(e, t),
              (0, c.L9)({ action: "list-rename", columnType: "list" }));
          },
          [eV],
        ),
        e$ = (0, u.V)((e) => e.deleteDeck),
        eO = (0, t.useCallback)(
          (e) => {
            let t = u.V.getState().decks.length;
            (e$(e),
              u.V.getState().decks.length !== t &&
                ((0, c.L9)({ action: "list-delete", columnType: "list" }),
                b("List deleted.")));
          },
          [e$, b],
        ),
        eq = (0, u.V)((e) => e.setStyle),
        eF = (0, t.useCallback)(
          (e) => {
            (eq(e), (0, c.L9)({ action: "style", columnType: "board" }));
          },
          [eq],
        ),
        eD =
          (e, t) =>
          (...a) => {
            let i = void 0 === t ? void 0 : a[t];
            i?.transition === !1 ? e(...a) : (0, d.S)(() => e(...a));
          };
      return {
        addColumn: eD(I),
        addPane: eD(B),
        removeColumn: eD(w),
        setColumnOrder: eD(C, 2),
        dockColumnToSide: eD(k, 2),
        setPaneView: eD(T),
        togglePanePin: E,
        setPaneFilters: M,
        setPaneBoard: U,
        setPaneTrending: j,
        setPaneSound: L,
        setPaneAccent: O,
        setPaneTitle: F,
        splitPane: eD(ee),
        splitColumnRight: eD(eC),
        removePane: eD(ea),
        movePane: eD(z),
        extractPane: eD(Q),
        stackColumns: eD(K, 3),
        setColumnWidth: J,
        setPaneSizes: Z,
        removeWidget: eD(el),
        moveWidget: eD(en),
        floatWidget: eD(eg),
        setWidgetView: eD(es),
        setWidgetBoard: ec,
        setWidgetTrending: em,
        toggleWidgetShade: eD(eh),
        resizeFloatWidget: ev,
        bringWidgetToFront: eb,
        setWidgetSideWidth: ew,
        toggleSidePanel: eD(ex),
        createList: e_,
        updateList: eN,
        deleteList: eM,
        createDeck: eU,
        switchDeck: ej,
        renameDeck: eL,
        deleteDeck: eO,
        setStyle: eF,
      };
    },
  ]);
};
