// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(599077),
    n = e.i(352386);
  e.i(12692);
  var a = e.i(398902),
    r = e.i(347269),
    s = e.i(411657);
  let o = [
    "account",
    "advanced_search.tabs",
    "common",
    "geo_block",
    "home.tabs",
    "home.movers",
    "numbers",
    "profile.recently_viewed",
    "search",
    "settings",
    "time",
    "web.account",
    "web.app_update",
    "web.auth",
    "web.common",
    "web.consent",
    "web.errors",
    "web.fees",
    "web.footer",
    "web.geo_block",
    "web.info_bar",
    "web.leave_site",
    "web.nav",
    "web.notifications",
    "web.achievements",
    "web.pagination",
    "web.search",
    "web.session",
    "web.settings",
    "web.sidebar",
    "web.wallets",
    "web.tos",
    "web.topbar",
    "web.ui",
    "web.upsell",
    "web.wallet",
    "web.wallet_deprecation",
  ];
  var c = e.i(592209),
    d = e.i(187611);
  function u(e) {
    let i = c.L[e],
      l = i.englishLabel !== i.label;
    return (0, t.jsx)(
      r.T,
      {
        value: e,
        textValue: i.label,
        "data-testid": `language-option-${e}`,
        children: (0, t.jsxs)("span", {
          className: "flex items-baseline gap-2",
          children: [
            (0, t.jsx)("span", { "aria-hidden": !0, children: i.flag }),
            (0, t.jsx)("span", {
              className: "text-sm font-medium",
              children: (0, d.T)(i.label, "language-value"),
            }),
            l
              ? (0, t.jsx)("span", {
                  className: "text-xs text-text-tertiary",
                  children: (0, d.T)(i.englishLabel, "language-value"),
                })
              : null,
          ],
        }),
      },
      e,
    );
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let x,
          m,
          f,
          b,
          p,
          _,
          g,
          h,
          y,
          w = (0, i.c)(27),
          { className: j } = e,
          { i18n: k } = (0, a.f)(),
          { refresh: v } = (0, l.useRouter)(),
          [N, C] = (0, n.useState)(null),
          [T, S] = (0, n.useTransition)(),
          O = null !== N || T;
        w[0] !== k.language
          ? ((x = (0, c.v)(k.language) ?? c.T), (w[0] = k.language), (w[1] = x))
          : (x = w[1]);
        let L = x,
          A = c.L[L];
        w[2] !== L || w[3] !== k || w[4] !== O || w[5] !== v
          ? ((m = (e) => {
              let t = (0, c.v)(e);
              t &&
                t !== L &&
                !O &&
                (C(t),
                (0, s.C)({
                  instance: k,
                  locale: t,
                  namespaces: o,
                  router: { refresh: () => S(() => v()) },
                }).finally(() => {
                  C(null);
                }));
            }),
            (w[2] = L),
            (w[3] = k),
            (w[4] = O),
            (w[5] = v),
            (w[6] = m))
          : (m = w[6]);
        let E = m,
          D = O || void 0,
          I =
            j ??
            "h-11 w-full rounded-md border-border-tertiary bg-bg-tertiary px-3 text-sm text-text-primary shadow-none";
        return (
          w[7] !== A.flag || w[8] !== O
            ? ((f = O
                ? (0, t.jsx)("span", {
                    "aria-hidden": !0,
                    className:
                      "size-4 animate-spin rounded-full border-2 border-current border-t-transparent text-text-tertiary",
                  })
                : (0, t.jsx)("span", { "aria-hidden": !0, children: A.flag })),
              (w[7] = A.flag),
              (w[8] = O),
              (w[9] = f))
            : (f = w[9]),
          w[10] !== A.label
            ? ((b = (0, d.T)(A.label, "language-value")),
              (w[10] = A.label),
              (w[11] = b))
            : (b = w[11]),
          w[12] !== b
            ? ((p = (0, t.jsx)("span", {
                className: "font-medium",
                children: b,
              })),
              (w[12] = b),
              (w[13] = p))
            : (p = w[13]),
          w[14] !== f || w[15] !== p
            ? ((_ = (0, t.jsx)(r.U, {
                children: (0, t.jsxs)("span", {
                  className: "flex items-center gap-2",
                  children: [f, p],
                }),
              })),
              (w[14] = f),
              (w[15] = p),
              (w[16] = _))
            : (_ = w[16]),
          w[17] !== D || w[18] !== I || w[19] !== _
            ? ((g = (0, t.jsx)(r.P, {
                "aria-busy": D,
                "data-testid": "language-select-trigger",
                className: I,
                chevronClassName: "size-3 text-text-quaternary opacity-100",
                children: _,
              })),
              (w[17] = D),
              (w[18] = I),
              (w[19] = _),
              (w[20] = g))
            : (g = w[20]),
          w[21] === Symbol.for("react.memo_cache_sentinel")
            ? ((h = (0, t.jsx)(r.r, {
                className:
                  "max-h-[min(var(--radix-select-content-available-height),480px)]",
                children: c.O.map(u),
              })),
              (w[21] = h))
            : (h = w[21]),
          w[22] !== L || w[23] !== E || w[24] !== O || w[25] !== g
            ? ((y = (0, t.jsxs)(r.d, {
                value: L,
                onValueChange: E,
                disabled: O,
                children: [g, h],
              })),
              (w[22] = L),
              (w[23] = E),
              (w[24] = O),
              (w[25] = g),
              (w[26] = y))
            : (y = w[26]),
          y
        );
      },
    ],
    447890,
  );
  var x = e.i(745018),
    m = e.i(439587),
    f = e.i(605255),
    b = e.i(548630),
    p = e.i(167958),
    _ = e.i(724423),
    g = e.i(51206),
    h = e.i(607122),
    y = e.i(869134);
  let w = [
    { value: "buy", labelKey: "web.profile.action_buy" },
    { value: "sell", labelKey: "web.profile.action_sell" },
  ];
  function j(e) {
    let l,
      n,
      r = (0, i.c)(7),
      { value: s, onChange: o, label: c } = e,
      { t: d } = (0, a.f)();
    return (
      r[0] !== d
        ? ((l = w.map((e) => ({
            value: e.value,
            label: d(e.labelKey),
            tone: "buy" === e.value ? "gain" : "loss",
          }))),
          (r[0] = d),
          (r[1] = l))
        : (l = r[1]),
      r[2] !== c || r[3] !== o || r[4] !== l || r[5] !== s
        ? ((n = (0, t.jsx)(h.X, {
            density: "comfortable",
            size: 32,
            "aria-label": c,
            value: s,
            onValueChange: o,
            options: l,
          })),
          (r[2] = c),
          (r[3] = o),
          (r[4] = l),
          (r[5] = s),
          (r[6] = n))
        : (n = r[6]),
      n
    );
  }
  function k(e) {
    let l,
      a,
      r,
      s,
      o = (0, i.c)(17),
      { value: c, unit: d, decimal: u, ariaLabel: x, onCommit: m } = e,
      [f, b] = (0, n.useState)(String(c)),
      [p, g] = (0, n.useState)(c);
    (p !== c && (g(c), b(String(c))),
      o[0] !== f || o[1] !== m || o[2] !== c
        ? ((l = () => {
            let e = Number(f);
            Number.isFinite(e) && e > 0 ? m(e) : b(String(c));
          }),
          (o[0] = f),
          (o[1] = m),
          (o[2] = c),
          (o[3] = l))
        : (l = o[3]));
    let h = l,
      y = u ? "decimal" : "numeric",
      w = u ? 1e-4 : 1,
      j = u ? 0.1 : 1;
    return (
      o[4] !== h
        ? ((a = (e) => {
            "Enter" === e.key && (e.preventDefault(), h());
          }),
          (o[4] = h),
          (o[5] = a))
        : (a = o[5]),
      o[6] !== d
        ? ((r = (0, t.jsx)("span", { className: "text-xs", children: d })),
          (o[6] = d),
          (o[7] = r))
        : (r = o[7]),
      o[8] !== x ||
      o[9] !== h ||
      o[10] !== f ||
      o[11] !== y ||
      o[12] !== w ||
      o[13] !== j ||
      o[14] !== a ||
      o[15] !== r
        ? ((s = (0, t.jsx)(_.N, {
            density: "terminal",
            className: "flex-1",
            inputClassName: "text-right",
            type: "number",
            inputMode: y,
            min: w,
            step: j,
            value: f,
            onValueChange: b,
            onBlur: h,
            onKeyDown: a,
            "aria-label": x,
            trailing: r,
          })),
          (o[8] = x),
          (o[9] = h),
          (o[10] = f),
          (o[11] = y),
          (o[12] = w),
          (o[13] = j),
          (o[14] = a),
          (o[15] = r),
          (o[16] = s))
        : (s = o[16]),
      s
    );
  }
  function v(e) {
    let l,
      n,
      r,
      s,
      o,
      c,
      d,
      u = (0, i.c)(28),
      {
        index: m,
        button: f,
        canRemove: b,
        onSideChange: p,
        onSellPercent: _,
        onBuyAmount: h,
        onRemove: y,
      } = e,
      { t: w } = (0, a.f)(),
      v = f.side,
      N = m + 1;
    (u[0] !== w || u[1] !== N
      ? ((l = w("web.profile.quick_trade_button_direction", { number: N })),
        (u[0] = w),
        (u[1] = N),
        (u[2] = l))
      : (l = u[2]),
      u[3] !== f.side || u[4] !== p || u[5] !== l
        ? ((n = (0, t.jsx)(j, { value: v, onChange: p, label: l })),
          (u[3] = f.side),
          (u[4] = p),
          (u[5] = l),
          (u[6] = n))
        : (n = u[6]),
      u[7] !== f.percent ||
      u[8] !== f.side ||
      u[9] !== f.sol ||
      u[10] !== f.usdc ||
      u[11] !== m ||
      u[12] !== h ||
      u[13] !== _ ||
      u[14] !== w
        ? ((r =
            "sell" === f.side
              ? (0, t.jsx)(k, {
                  value: f.percent,
                  unit: "%",
                  decimal: !1,
                  ariaLabel: w("web.profile.quick_trade_button_sell_percent", {
                    number: m + 1,
                  }),
                  onCommit: _,
                })
              : (0, t.jsxs)("div", {
                  className: "flex flex-1 items-center gap-2",
                  children: [
                    (0, t.jsx)(k, {
                      value: f.sol,
                      unit: "SOL",
                      decimal: !0,
                      ariaLabel: w(
                        "web.profile.quick_trade_button_buy_amount",
                        { number: m + 1, currency: "SOL" },
                      ),
                      onCommit: (e) => h("sol", e),
                    }),
                    (0, t.jsx)(k, {
                      value: f.usdc,
                      unit: "USDC",
                      decimal: !0,
                      ariaLabel: w(
                        "web.profile.quick_trade_button_buy_amount",
                        { number: m + 1, currency: "USDC" },
                      ),
                      onCommit: (e) => h("usdc", e),
                    }),
                  ],
                })),
          (u[7] = f.percent),
          (u[8] = f.side),
          (u[9] = f.sol),
          (u[10] = f.usdc),
          (u[11] = m),
          (u[12] = h),
          (u[13] = _),
          (u[14] = w),
          (u[15] = r))
        : (r = u[15]));
    let C = !b,
      T = m + 1;
    return (
      u[16] !== w || u[17] !== T
        ? ((s = w("web.profile.quick_trade_remove_button", { number: T })),
          (u[16] = w),
          (u[17] = T),
          (u[18] = s))
        : (s = u[18]),
      u[19] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (0, t.jsx)(x.AD, { "aria-hidden": !0 })), (u[19] = o))
        : (o = u[19]),
      u[20] !== y || u[21] !== C || u[22] !== s
        ? ((c = (0, t.jsx)(g._, {
            density: "comfortable",
            variant: "outlined",
            onClick: y,
            disabled: C,
            "aria-label": s,
            children: o,
          })),
          (u[20] = y),
          (u[21] = C),
          (u[22] = s),
          (u[23] = c))
        : (c = u[23]),
      u[24] !== c || u[25] !== n || u[26] !== r
        ? ((d = (0, t.jsxs)("div", {
            className: "flex flex-wrap items-center gap-2",
            children: [n, r, c],
          })),
          (u[24] = c),
          (u[25] = n),
          (u[26] = r),
          (u[27] = d))
        : (d = u[27]),
      d
    );
  }
  function N() {
    let e,
      l,
      n,
      r,
      s,
      o,
      c,
      d,
      u,
      f = (0, i.c)(33),
      { t: b } = (0, a.f)(),
      {
        values: p,
        setSide: _,
        setSellPercent: g,
        setBuyAmount: h,
        addButton: w,
        removeButton: j,
        reset: k,
        canAddButton: N,
        canRemoveButton: C,
      } = (0, y.f)();
    if (
      f[0] !== C ||
      f[1] !== j ||
      f[2] !== h ||
      f[3] !== g ||
      f[4] !== _ ||
      f[5] !== p
    ) {
      let i;
      (f[7] !== C || f[8] !== j || f[9] !== h || f[10] !== g || f[11] !== _
        ? ((i = (e, i) =>
            (0, t.jsx)(
              v,
              {
                index: i,
                button: e,
                canRemove: C,
                onSideChange: (e) => _(i, e),
                onSellPercent: (e) => g(i, e),
                onBuyAmount: (e, t) => h(i, e, t),
                onRemove: () => j(i),
              },
              i,
            )),
          (f[7] = C),
          (f[8] = j),
          (f[9] = h),
          (f[10] = g),
          (f[11] = _),
          (f[12] = i))
        : (i = f[12]),
        (e = p.map(i)),
        (f[0] = C),
        (f[1] = j),
        (f[2] = h),
        (f[3] = g),
        (f[4] = _),
        (f[5] = p),
        (f[6] = e));
    } else e = f[6];
    f[13] !== e
      ? ((l = (0, t.jsx)("div", {
          className: "flex flex-col gap-2",
          children: e,
        })),
        (f[13] = e),
        (f[14] = l))
      : (l = f[14]);
    let T = !N;
    return (
      f[15] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, t.jsx)(x.HB, { size: 16 })), (f[15] = n))
        : (n = f[15]),
      f[16] !== b
        ? ((r = b("web.profile.quick_trade_add_button")),
          (f[16] = b),
          (f[17] = r))
        : (r = f[17]),
      f[18] !== w || f[19] !== T || f[20] !== r
        ? ((s = (0, t.jsx)(m.K, {
            variant: "secondary",
            size: 32,
            isDisabled: T,
            iconStart: n,
            onClick: w,
            children: r,
          })),
          (f[18] = w),
          (f[19] = T),
          (f[20] = r),
          (f[21] = s))
        : (s = f[21]),
      f[22] !== b
        ? ((o = b("coin_details.chart.settings.reset")),
          (f[22] = b),
          (f[23] = o))
        : (o = f[23]),
      f[24] !== k || f[25] !== o
        ? ((c = (0, t.jsx)(m.K, {
            variant: "secondary",
            size: 32,
            onClick: k,
            children: o,
          })),
          (f[24] = k),
          (f[25] = o),
          (f[26] = c))
        : (c = f[26]),
      f[27] !== s || f[28] !== c
        ? ((d = (0, t.jsxs)("footer", {
            className: "flex items-center justify-between gap-2 pt-1",
            children: [s, c],
          })),
          (f[27] = s),
          (f[28] = c),
          (f[29] = d))
        : (d = f[29]),
      f[30] !== l || f[31] !== d
        ? ((u = (0, t.jsxs)("div", {
            className: "flex flex-col gap-4",
            children: [l, d],
          })),
          (f[30] = l),
          (f[31] = d),
          (f[32] = u))
        : (u = f[32]),
      u
    );
  }
  function C() {
    let e,
      l,
      r,
      s,
      o,
      c,
      d,
      u,
      b,
      _,
      g,
      h = (0, i.c)(22),
      { t: y } = (0, a.f)(),
      [w, j] = (0, n.useState)(!1);
    return (
      h[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)(x.cL, { size: 16 })),
          (l = () => j(!0)),
          (h[0] = e),
          (h[1] = l))
        : ((e = h[0]), (l = h[1])),
      h[2] !== y
        ? ((r = y("web.profile.quick_trade_title")), (h[2] = y), (h[3] = r))
        : (r = h[3]),
      h[4] !== r
        ? ((s = (0, t.jsx)(m.K, {
            variant: "secondary",
            size: f.j3,
            iconStart: e,
            onClick: l,
            children: r,
          })),
          (h[4] = r),
          (h[5] = s))
        : (s = h[5]),
      h[6] !== y
        ? ((o = y("web.profile.quick_trade_title")), (h[6] = y), (h[7] = o))
        : (o = h[7]),
      h[8] !== y
        ? ((c = y("web.profile.quick_trade_description")),
          (h[8] = y),
          (h[9] = c))
        : (c = h[9]),
      h[10] !== c
        ? ((d = (0, t.jsx)("p", {
            className: "text-[13px] leading-[18px] text-text-tertiary",
            children: c,
          })),
          (h[10] = c),
          (h[11] = d))
        : (d = h[11]),
      h[12] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = (0, t.jsx)(N, {})), (h[12] = u))
        : (u = h[12]),
      h[13] !== d
        ? ((b = (0, t.jsxs)(p.K, {
            className: "flex flex-col gap-4",
            children: [d, u],
          })),
          (h[13] = d),
          (h[14] = b))
        : (b = h[14]),
      h[15] !== w || h[16] !== o || h[17] !== b
        ? ((_ = (0, t.jsx)(p.N, {
            open: w,
            onOpenChange: j,
            size: "md",
            title: o,
            children: b,
          })),
          (h[15] = w),
          (h[16] = o),
          (h[17] = b),
          (h[18] = _))
        : (_ = h[18]),
      h[19] !== s || h[20] !== _
        ? ((g = (0, t.jsxs)(t.Fragment, { children: [s, _] })),
          (h[19] = s),
          (h[20] = _),
          (h[21] = g))
        : (g = h[21]),
      g
    );
  }
  e.s(
    [
      "I",
      0,
      N,
      "k",
      0,
      function () {
        let e,
          l,
          n,
          r,
          s,
          o = (0, i.c)(8),
          { t: c } = (0, a.f)();
        o[0] !== c
          ? ((e = c("web.profile.quick_trade_title")), (o[0] = c), (o[1] = e))
          : (e = o[1]);
        let d = e;
        return (
          o[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((l = (0, t.jsx)(x.cL, { "aria-hidden": !0 })), (o[2] = l))
            : (l = o[2]),
          o[3] !== d
            ? ((n = (0, t.jsx)(g._, {
                density: "comfortable",
                size: 28,
                "aria-label": d,
                title: d,
                children: l,
              })),
              (o[3] = d),
              (o[4] = n))
            : (n = o[4]),
          o[5] === Symbol.for("react.memo_cache_sentinel")
            ? ((r = (0, t.jsx)(C, {})), (o[5] = r))
            : (r = o[5]),
          o[6] !== n
            ? ((s = (0, t.jsx)(b.S, {
                section: "trading",
                settingId: "trading.profileQuickTradeButtons",
                trigger: n,
                children: r,
              })),
              (o[6] = n),
              (o[7] = s))
            : (s = o[7]),
          s
        );
      },
    ],
    749099,
  );
};
