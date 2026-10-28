// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(352386),
    a = e.i(78436),
    n = e.i(634103);
  let s = (e) => "number" == typeof e && Number.isFinite(e),
    r = (e) => {
      if ("object" != typeof e || null === e) return !1;
      let { x: t, y: i, w: a, h: n } = e;
      return [t, i, a, n].every(s);
    };
  var l = e.i(800855),
    o = e.i(881324);
  let d = {
      buySol: [0.1, 0.25, 0.5, 1, 2, 5, 10, 20],
      buyUsd: [10, 25, 50, 100, 250, 500, 1e3, 2500],
      sellPct: [10, 25, 50, 100, 0, 0, 0, 0],
    },
    c = { buySol: o.v, buyUsd: o.m, sellPct: o.k },
    u = {
      isOpen: !1,
      shaded: !1,
      rect: null,
      denomination: "sol",
      hotkeysEnabled: !1,
      isEditing: !1,
      grids: d,
    },
    m = (e, t) => {
      let i = Number(e);
      return !Number.isFinite(i) || i <= 0 ? 0 : c[t](i);
    },
    f = (e, t) => {
      let i = d[t];
      if (!Array.isArray(e)) return i;
      let a = [...i];
      for (let i = 0; i < 8; i++) a[i] = m(e[i], t);
      return a;
    },
    p = (e) => "sol" === e || "usd" === e,
    b = (0, a.$)()(
      (0, n.V)(
        (e) => ({
          ...u,
          open: () => e({ isOpen: !0 }),
          close: () => e({ isOpen: !1, isEditing: !1 }),
          toggleOpen: () => e((e) => ({ isOpen: !e.isOpen, isEditing: !1 })),
          setEditing: (t) => e({ isEditing: !0 === t }),
          setShaded: (t) => e({ shaded: t }),
          setRect: (t) => e({ rect: r(t) ? t : null }),
          setDenomination: (t) => e({ denomination: p(t) ? t : "sol" }),
          setHotkeysEnabled: (t) => e({ hotkeysEnabled: !0 === t }),
          setGridSlot: ({ grid: t, index: i, value: a }) =>
            e((e) => {
              if (!Number.isInteger(i) || i < 0 || i >= 8) return e;
              let n = [...e.grids[t]];
              return ((n[i] = m(a, t)), { grids: { ...e.grids, [t]: n } });
            }),
          resetGrids: () => e({ grids: d }),
        }),
        {
          name: "coin-floating-trade",
          version: 1,
          storage: (0, l.I)({
            defaultPersisted: {
              isOpen: u.isOpen,
              shaded: u.shaded,
              rect: u.rect,
              denomination: u.denomination,
              hotkeysEnabled: u.hotkeysEnabled,
              grids: u.grids,
            },
          }),
          skipHydration: !0,
          partialize: ({
            isOpen: e,
            shaded: t,
            rect: i,
            denomination: a,
            hotkeysEnabled: n,
            grids: s,
          }) => ({
            isOpen: e,
            shaded: t,
            rect: i,
            denomination: a,
            hotkeysEnabled: n,
            grids: s,
          }),
          merge: (e, t) => {
            var i;
            let a, n;
            return {
              ...t,
              ...{
                isOpen: !0 === (a = e ?? {}).isOpen,
                shaded: !0 === a.shaded,
                rect: r(a.rect) ? a.rect : null,
                denomination: p(a.denomination) ? a.denomination : "sol",
                hotkeysEnabled: !0 === a.hotkeysEnabled,
                grids: {
                  buySol: f(
                    (n = (Array.isArray((i = a.grids)) ? i[0] : i) ?? {})
                      .buySol,
                    "buySol",
                  ),
                  buyUsd: f(n.buyUsd, "buyUsd"),
                  sellPct: f(n.sellPct, "sellPct"),
                },
                isEditing: !1,
              },
            };
          },
        },
      ),
    );
  ((0, l.m)(b),
    e.s(
      [
        "F",
        0,
        360,
        "k",
        0,
        () => {
          let e,
            a,
            n = (0, t.c)(2),
            [s, r] = (0, i.useState)(!1);
          return (
            n[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = () =>
                  b.persist?.hasHydrated()
                    ? void r(!0)
                    : b.persist?.onFinishHydration(() => {
                        r(!0);
                      })),
                (a = []),
                (n[0] = e),
                (n[1] = a))
              : ((e = n[0]), (a = n[1])),
            (0, i.useEffect)(e, a),
            s
          );
        },
        "E",
        0,
        b,
      ],
      831115,
    ));
};
