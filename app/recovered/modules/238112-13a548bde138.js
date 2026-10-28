// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242);
  e.i(12692);
  var n = e.i(398902),
    a = e.i(334487),
    i = e.i(200165),
    o = e.i(732392),
    l = e.i(971370),
    u = e.i(102824),
    s = e.i(994598),
    c = e.i(574472),
    d = e.i(289515);
  function f() {
    let e,
      t,
      n,
      a = (0, r.c)(7),
      { address: i } = (0, c.F)();
    a[0] !== i
      ? ((e = { address: i, limit: 50, offset: 0, showDustCoin: !1 }),
        (a[0] = i),
        (a[1] = e))
      : (e = a[1]);
    let { balances: o, isLoading: l } = (0, d.W)(e);
    a[2] !== o
      ? ((t = Array.from(new Map(o.filter(b).map(h)).values())
          .sort(p)
          .map(m)),
        (a[2] = o),
        (a[3] = t))
      : (t = a[3]);
    let u = t;
    return (
      a[4] !== l || a[5] !== u
        ? ((n = { walletCoinOptions: u, isLoadingWalletBalances: l }),
          (a[4] = l),
          (a[5] = u),
          (a[6] = n))
        : (n = a[6]),
      n
    );
  }
  function m(e) {
    let { value: t, ...r } = e;
    return r;
  }
  function p(e, t) {
    return t.value - e.value;
  }
  function h(e) {
    return [
      e.mint,
      {
        id: e.mint,
        imageUri: e.image_uri,
        mint: e.mint,
        name: e.name,
        symbol: e.symbol || "TOKEN",
        balance: e.balance,
        priceUsd:
          e.balance > 0 && Number.isFinite(e.value) ? e.value / e.balance : 0,
        value: e.value,
      },
    ];
  }
  function b(e) {
    return !!e.mint;
  }
  function v() {
    let e,
      t,
      n,
      a = (0, r.c)(8),
      { walletCoinOptions: i } = f(),
      { solBalance: o } = (0, u.f)();
    a[0] !== o || a[1] !== i
      ? ((e = (e) => {
          if ("SOL" === e.kind) return o > 0 ? o / l.LAMPORTS_PER_SOL : 0;
          if ("PUMP" === e.kind)
            return i.find((t) => t.mint === (0, s.r)(e))?.balance ?? 0;
          let t = (0, s.r)(e);
          if (t) return i.find((e) => e.mint === t)?.balance;
        }),
        (a[0] = o),
        (a[1] = i),
        (a[2] = e))
      : (e = a[2]);
    let c = e;
    a[3] !== c
      ? ((t = (e, t) => {
          let r = c(e);
          return null == r
            ? void 0
            : (0, s.r)(e)
              ? Math.max(0, r - (0, s.o)(e, t))
              : r;
        }),
        (a[3] = c),
        (a[4] = t))
      : (t = a[4]);
    let d = t;
    return (
      a[5] !== d || a[6] !== c
        ? ((n = { getForPool: c, getAvailableForPool: d }),
          (a[5] = d),
          (a[6] = c),
          (a[7] = n))
        : (n = a[7]),
      n
    );
  }
  (e.s(["f", 0, f], 665010), e.s(["f", 0, v], 907704));
  let g = [100, 50, 20, 10, 5];
  e.s(
    [
      "f",
      0,
      function (e) {
        let l,
          u = (0, r.c)(15),
          { t: s } = (0, n.f)(),
          { pool: c, onChange: d } = e,
          { getForPool: f } = v();
        if (u[0] !== f || u[1] !== d || u[2] !== c || u[3] !== s) {
          let e,
            r,
            n,
            m,
            p,
            h = f(c);
          (u[5] !== s
            ? ((e = s("home.bounties.create.reward_amount_placeholder")),
              (u[5] = s),
              (u[6] = e))
            : (e = u[6]),
            u[7] === Symbol.for("react.memo_cache_sentinel")
              ? ((r = (0, t.jsx)("span", {
                  "aria-hidden": !0,
                  className: "text-text-error",
                  children: "*",
                })),
                (u[7] = r))
              : (r = u[7]),
            u[8] !== e
              ? ((n = (0, t.jsxs)(o.f, {
                  className: "mb-2 block text-white",
                  children: [e, " ", r],
                })),
                (u[8] = e),
                (u[9] = n))
              : (n = u[9]),
            u[10] !== d
              ? ((m = (e) => {
                  let { value: t } = e;
                  return d({ humanAmount: t });
                }),
                (u[10] = d),
                (u[11] = m))
              : (m = u[11]),
            u[12] !== c.humanAmount || u[13] !== m
              ? ((p = (0, t.jsx)(a.f, {
                  allowLeadingZeros: !1,
                  allowNegative: !1,
                  className:
                    "h-11 rounded-[14px] border-border-secondary bg-bg-secondary text-white placeholder:text-text-tertiary focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:ring-offset-0 dark:border-border-secondary dark:bg-bg-secondary",
                  customInput: i.f,
                  decimalScale: 9,
                  inputMode: "decimal",
                  onValueChange: m,
                  placeholder: "0.00",
                  thousandSeparator: !0,
                  value: c.humanAmount,
                })),
                (u[12] = c.humanAmount),
                (u[13] = m),
                (u[14] = p))
              : (p = u[14]),
            (l = (0, t.jsxs)("div", {
              children: [
                n,
                p,
                null != h &&
                  h > 0 &&
                  (0, t.jsx)("div", {
                    className: "mt-2 flex w-full gap-2",
                    children: g.map((e) =>
                      (0, t.jsxs)(
                        "button",
                        {
                          className:
                            "h-10 min-w-[64px] flex-1 rounded-[10px] border border-border-secondary bg-bg-secondary text-sm font-medium text-text-secondary transition-colors hover:border-border-secondary hover:text-white",
                          onClick: () =>
                            d({
                              humanAmount: (
                                Math.floor((e / 100) * h * 1e9) / 1e9
                              ).toString(),
                            }),
                          type: "button",
                          children: [e, "%"],
                        },
                        e,
                      ),
                    ),
                  }),
              ],
            })),
            (u[0] = f),
            (u[1] = d),
            (u[2] = c),
            (u[3] = s),
            (u[4] = l));
        } else l = u[4];
        return l;
      },
    ],
    238112,
  );
  var y = e.i(462024);
  let x = `https://pump.fun/coin/${y.i.PUMP.mint}`;
  e.s(
    [
      "f",
      0,
      function () {
        let e,
          a,
          i,
          o,
          l = (0, r.c)(9),
          { t: u } = (0, n.f)();
        return (
          l[0] !== u
            ? ((e = u("web.bounties.buy_pump")), (l[0] = u), (l[1] = e))
            : (e = l[1]),
          l[2] !== u
            ? ((a = u("web.bounties.buy_pump_here")), (l[2] = u), (l[3] = a))
            : (a = l[3]),
          l[4] !== a
            ? ((i = (0, t.jsx)("a", {
                className:
                  "font-medium text-positive underline underline-offset-2 hover:opacity-80",
                href: x,
                rel: "noopener noreferrer",
                target: "_blank",
                children: a,
              })),
              (l[4] = a),
              (l[5] = i))
            : (i = l[5]),
          l[6] !== e || l[7] !== i
            ? ((o = (0, t.jsxs)("p", {
                className: "mt-2 text-xs text-text-secondary",
                "data-testid": "pump-buy-tradebox",
                children: [e, " ", i],
              })),
              (l[6] = e),
              (l[7] = i),
              (l[8] = o))
            : (o = l[8]),
          o
        );
      },
    ],
    47831,
  );
};
