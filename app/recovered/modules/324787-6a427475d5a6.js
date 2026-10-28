// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(352386),
    i = e.i(78436),
    r = e.i(634103),
    s = e.i(530501),
    a = e.i(811198);
  let n = [
      { id: "holder", labelKey: "web.coin.holder", lockedVisible: !0 },
      { id: "held", labelKey: "web.coin.holders_column_held", align: "right" },
      { id: "supply", labelKey: "web.coin.supply_percent", align: "right" },
      { id: "position", labelKey: "coin_details.position", align: "right" },
      { id: "pnl", labelKey: "web.coin.pnl", align: "right" },
      {
        id: "avgEntry",
        labelKey: "web.coin.holders_column_avg_entry",
        align: "right",
      },
      {
        id: "flows",
        labelKey: "web.coin.holders_column_flows",
        align: "right",
      },
      { id: "bought", labelKey: "web.coin.holders_bought", align: "right" },
      { id: "sold", labelKey: "web.coin.holders_sold", align: "right" },
      {
        id: "heldFor",
        labelKey: "web.coin.holders_column_held_for",
        align: "right",
      },
      {
        id: "fundedBy",
        labelKey: "web.coin.holders_column_funded_by",
        align: "right",
      },
      {
        id: "actions",
        labelKey: "web.coin.holders_column_actions",
        align: "right",
      },
    ],
    o = ["supply", "bought", "sold"],
    d = ["flows"],
    c = n.filter((e) => !d.includes(e.id));
  n.filter((e) => !o.includes(e.id));
  let u = ({ config: e, stored: t }) =>
    (0, a.i)({ config: e, stored: t, id: "fundedBy", anchor: "heldFor" });
  e.s(["q", 0, n, "J", 0, c, "m", 0, u], 386986);
  let m = (e) => {
      if (null == e || "" === e) return null;
      let t = "number" == typeof e ? e : Number(e);
      return Number.isFinite(t) ? t : null;
    },
    b = ({ isEvm: e }) => [
      {
        id: "account",
        labelKey: "web.coin.trades_column_account",
        lockedVisible: !0,
      },
      {
        id: "type",
        labelKey: "web.coin.trades_column_type",
        sortValue: (e) => +("buy" !== e.type),
      },
      {
        id: "amount",
        labelKey: "web.coin.table_column_amount",
        align: "right",
        sortValue: (t) => m(e ? t.amountUsd : t.amountSol),
      },
      {
        id: "tokens",
        labelKey: "web.coin.table_column_token_amount",
        align: "right",
        sortValue: (e) => m(e.baseAmount),
      },
      {
        id: "mcap",
        labelKey: "web.coin.market_cap_label",
        align: "right",
        sortValue: (e) => m(e.priceUsd),
      },
      {
        id: "time",
        labelKey: "web.coin.trades_column_time",
        align: "right",
        sortValue: (e) => {
          var t;
          let l;
          return Number.isFinite(
            (l =
              (t = e.timestamp) instanceof Date
                ? t.getTime()
                : new Date(t).getTime()),
          )
            ? l
            : null;
        },
      },
      { id: "txn", labelKey: "web.coin.trades_column_txn", align: "right" },
    ],
    p = b({ isEvm: !1 });
  (b({ isEvm: !0 }),
    e.s(
      [
        "W",
        0,
        p,
        "P",
        0,
        b,
        "F",
        0,
        ({ trade: e, supply: t }) => {
          let l = m(e.priceUsd);
          return null !== l && l > 0 && t > 0 ? l * t : null;
        },
      ],
      249113,
    ));
  var f = e.i(800855);
  let h = { trades: p, holders: n, explore: s.Z },
    x = {
      trades: (0, a.y)({ catalog: p }),
      holders: (0, a.y)({ catalog: n }),
      explore: (0, a.y)({ catalog: s.Z }),
    },
    y = (e) => "object" == typeof e && null !== e,
    v = (e) => {
      let t = "object" == typeof e && null !== e ? e : {};
      return {
        trades: (0, a.v)({ value: t.trades, catalog: p }),
        holders: u({
          config: (0, a.v)({ value: t.holders, catalog: n }),
          stored: t.holders,
        }),
        explore: (0, s.W)({
          config: (0, s.d)({
            config: (0, a.v)({ value: t.explore, catalog: s.Z }),
            stored: t.explore,
          }),
          stored: t.explore,
        }),
      };
    },
    g = (0, i.$)()(
      (0, r.V)(
        (e) => {
          let t = (t, l) =>
            e((e) => ({
              tables: {
                ...e.tables,
                [t]: (0, a.v)({ value: l(e.tables[t]), catalog: h[t] }),
              },
            }));
          return {
            tables: x,
            setColumnHidden: ({ table: e, id: l, hidden: i }) =>
              t(e, (e) => ({
                ...e,
                hidden: i
                  ? e.hidden.includes(l)
                    ? e.hidden
                    : [...e.hidden, l]
                  : e.hidden.filter((e) => e !== l),
              })),
            moveColumn: ({ table: e, id: l, direction: i, neighborId: r }) =>
              t(e, (e) => ({
                ...e,
                order:
                  void 0 === r
                    ? (0, a.o)({ order: e.order, id: l, direction: i })
                    : (0, a.w)({ order: e.order, id: l, withId: r }),
              })),
            setDensity: ({ table: e, density: l }) =>
              t(e, (e) => ({ ...e, density: (0, a.J)(l) })),
            setSort: ({ table: e, sort: l }) =>
              t(e, (t) => ({
                ...t,
                sort: (0, a.T)({ value: l, catalog: h[e] }),
              })),
            toggleSort: ({ table: e, id: l }) =>
              t(e, (e) => ({
                ...e,
                sort: (0, a.s)({ current: e.sort, id: l }),
              })),
            resetTable: ({ table: t }) =>
              e((e) => ({ tables: { ...e.tables, [t]: x[t] } })),
          };
        },
        {
          name: "coin-table-config",
          storage: (0, f.I)({ defaultPersisted: { tables: x } }),
          skipHydration: !0,
          version: 2,
          partialize: (e) => ({ tables: e.tables }),
          migrate: (e) => ({
            tables: v(
              ((e) => {
                if (!y(e) || !y(e.trades)) return e;
                let t = e.trades.order;
                if (!Array.isArray(t) || t.includes("mcap")) return e;
                let l = t.indexOf("time");
                if (-1 === l) return e;
                let i = [...t];
                return (
                  i.splice(l, 0, "mcap"),
                  { ...e, trades: { ...e.trades, order: i } }
                );
              })(y(e) ? e.tables : {}),
            ),
          }),
          merge: (e, t) => ({ ...t, tables: v((e ?? {}).tables) }),
        },
      ),
    );
  ((0, f.m)(g),
    e.s(
      [
        "c",
        0,
        x,
        "M",
        0,
        (e) => {
          let l,
            i = (0, t.c)(2);
          return (
            i[0] !== e
              ? ((l = (t) => t.tables[e]), (i[0] = e), (i[1] = l))
              : (l = i[1]),
            g(l)
          );
        },
        "g",
        0,
        () => {
          let e,
            i,
            r = (0, t.c)(2),
            [s, a] = (0, l.useState)(!1);
          return (
            r[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = () =>
                  g.persist?.hasHydrated()
                    ? void a(!0)
                    : g.persist?.onFinishHydration(() => {
                        a(!0);
                      })),
                (i = []),
                (r[0] = e),
                (r[1] = i))
              : ((e = r[0]), (i = r[1])),
            (0, l.useEffect)(e, i),
            s
          );
        },
        "w",
        0,
        g,
      ],
      324787,
    ));
};
