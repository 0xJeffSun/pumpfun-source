// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386),
    n = e.i(78436),
    l = e.i(634103),
    i = e.i(530501),
    a = e.i(811198);
  let s = [
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
    u = ["flows"],
    d = s.filter((e) => !u.includes(e.id));
  s.filter((e) => !o.includes(e.id));
  let c = ({ config: e, stored: t }) =>
    (0, a.i)({ config: e, stored: t, id: "fundedBy", anchor: "heldFor" });
  e.s(["q", 0, s, "J", 0, d, "m", 0, c], 386986);
  let m = (e) => {
      if (null == e || "" === e) return null;
      let t = "number" == typeof e ? e : Number(e);
      return Number.isFinite(t) ? t : null;
    },
    f = ({ isEvm: e }) => [
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
          let r;
          return Number.isFinite(
            (r =
              (t = e.timestamp) instanceof Date
                ? t.getTime()
                : new Date(t).getTime()),
          )
            ? r
            : null;
        },
      },
      { id: "txn", labelKey: "web.coin.trades_column_txn", align: "right" },
    ],
    p = f({ isEvm: !1 });
  (f({ isEvm: !0 }),
    e.s(
      [
        "W",
        0,
        p,
        "P",
        0,
        f,
        "F",
        0,
        ({ trade: e, supply: t }) => {
          let r = m(e.priceUsd);
          return null !== r && r > 0 && t > 0 ? r * t : null;
        },
      ],
      249113,
    ));
  var h = e.i(800855);
  let b = { trades: p, holders: s, explore: i.Z },
    g = {
      trades: (0, a.y)({ catalog: p }),
      holders: (0, a.y)({ catalog: s }),
      explore: (0, a.y)({ catalog: i.Z }),
    },
    x = (e) => "object" == typeof e && null !== e,
    y = (e) => {
      let t = "object" == typeof e && null !== e ? e : {};
      return {
        trades: (0, a.v)({ value: t.trades, catalog: p }),
        holders: c({
          config: (0, a.v)({ value: t.holders, catalog: s }),
          stored: t.holders,
        }),
        explore: (0, i.W)({
          config: (0, i.d)({
            config: (0, a.v)({ value: t.explore, catalog: i.Z }),
            stored: t.explore,
          }),
          stored: t.explore,
        }),
      };
    },
    v = (0, n.$)()(
      (0, l.V)(
        (e) => {
          let t = (t, r) =>
            e((e) => ({
              tables: {
                ...e.tables,
                [t]: (0, a.v)({ value: r(e.tables[t]), catalog: b[t] }),
              },
            }));
          return {
            tables: g,
            setColumnHidden: ({ table: e, id: r, hidden: n }) =>
              t(e, (e) => ({
                ...e,
                hidden: n
                  ? e.hidden.includes(r)
                    ? e.hidden
                    : [...e.hidden, r]
                  : e.hidden.filter((e) => e !== r),
              })),
            moveColumn: ({ table: e, id: r, direction: n, neighborId: l }) =>
              t(e, (e) => ({
                ...e,
                order:
                  void 0 === l
                    ? (0, a.o)({ order: e.order, id: r, direction: n })
                    : (0, a.w)({ order: e.order, id: r, withId: l }),
              })),
            setDensity: ({ table: e, density: r }) =>
              t(e, (e) => ({ ...e, density: (0, a.J)(r) })),
            setSort: ({ table: e, sort: r }) =>
              t(e, (t) => ({
                ...t,
                sort: (0, a.T)({ value: r, catalog: b[e] }),
              })),
            toggleSort: ({ table: e, id: r }) =>
              t(e, (e) => ({
                ...e,
                sort: (0, a.s)({ current: e.sort, id: r }),
              })),
            resetTable: ({ table: t }) =>
              e((e) => ({ tables: { ...e.tables, [t]: g[t] } })),
          };
        },
        {
          name: "coin-table-config",
          storage: (0, h.I)({ defaultPersisted: { tables: g } }),
          skipHydration: !0,
          version: 2,
          partialize: (e) => ({ tables: e.tables }),
          migrate: (e) => ({
            tables: y(
              ((e) => {
                if (!x(e) || !x(e.trades)) return e;
                let t = e.trades.order;
                if (!Array.isArray(t) || t.includes("mcap")) return e;
                let r = t.indexOf("time");
                if (-1 === r) return e;
                let n = [...t];
                return (
                  n.splice(r, 0, "mcap"),
                  { ...e, trades: { ...e.trades, order: n } }
                );
              })(x(e) ? e.tables : {}),
            ),
          }),
          merge: (e, t) => ({ ...t, tables: y((e ?? {}).tables) }),
        },
      ),
    );
  ((0, h.m)(v),
    e.s(
      [
        "c",
        0,
        g,
        "M",
        0,
        (e) => {
          let r,
            n = (0, t.c)(2);
          return (
            n[0] !== e
              ? ((r = (t) => t.tables[e]), (n[0] = e), (n[1] = r))
              : (r = n[1]),
            v(r)
          );
        },
        "g",
        0,
        () => {
          let e,
            n,
            l = (0, t.c)(2),
            [i, a] = (0, r.useState)(!1);
          return (
            l[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = () =>
                  v.persist?.hasHydrated()
                    ? void a(!0)
                    : v.persist?.onFinishHydration(() => {
                        a(!0);
                      })),
                (n = []),
                (l[0] = e),
                (l[1] = n))
              : ((e = l[0]), (n = l[1])),
            (0, r.useEffect)(e, n),
            i
          );
        },
        "w",
        0,
        v,
      ],
      324787,
    ));
};
