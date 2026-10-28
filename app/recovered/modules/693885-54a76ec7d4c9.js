// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(352386),
    l = e.i(402732),
    i = e.i(487832);
  e.s(
    [
      "f",
      0,
      function () {
        let e,
          a,
          r,
          s,
          o = (0, t.c)(7),
          u = (0, l.f)();
        o[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = { open: !1, focusSettingId: null }), (o[0] = e))
          : (e = o[0]);
        let [c, d] = (0, n.useState)(e);
        o[1] === Symbol.for("react.memo_cache_sentinel")
          ? ((a = (e) =>
              d((t) => ({
                open: e,
                focusSettingId: e ? t.focusSettingId : null,
              }))),
            (o[1] = a))
          : (a = o[1]);
        let m = a;
        o[2] !== u
          ? ((r = (e) => {
              u
                ? (0, i.v)({ section: "trading", settingId: e })
                : d({ open: !0, focusSettingId: e });
            }),
            (o[2] = u),
            (o[3] = r))
          : (r = o[3]);
        let b = r;
        return (
          o[4] !== b || o[5] !== c
            ? ((s = { sheet: c, onOpenChange: m, openSetting: b }),
              (o[4] = b),
              (o[5] = c),
              (o[6] = s))
            : (s = o[6]),
          s
        );
      },
    ],
    693885,
  );
  var a = e.i(292686);
  e.i(12692);
  var r = e.i(398902),
    s = e.i(790431),
    o = e.i(858133),
    u = e.i(165816);
  function c(e) {
    return `${e}%`;
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let n,
          l,
          i,
          d,
          m,
          b,
          f,
          y,
          h,
          v,
          p,
          g,
          x,
          _,
          k,
          w,
          S,
          N,
          q,
          C,
          I,
          j = (0, t.c)(75),
          { state: $, requiresHold: E } = e,
          { t: L } = (0, r.f)(),
          {
            isUsdcQuote: P,
            isUsdDenomUnavailable: R,
            executeQuickBuyPreset: D,
            executeQuickSellPreset: T,
            hasTokenBalance: A,
            isQuickBuyPresetInsufficient: F,
            isTradeLoading: U,
            immediateTradeInFlight: B,
            activeQuickTrade: M,
            spamQuickTrade: O,
            previewQuickBuyPreset: z,
            isQuickTradeUnavailable: H,
            isQuickBuyBlocked: V,
          } = $,
          K = void 0 !== H && H,
          W = !!(!O && (U || B));
        j[0] !== M
          ? ((n = (e) =>
              M?.tone === e && M.sourceElement === a.k9.QUICK_TRADE
                ? M.value
                : null),
            (j[0] = M),
            (j[1] = n))
          : (n = j[1]);
        let Q = n,
          G = $.isUsdcPayment ?? P;
        j[2] !== G ||
        j[3] !== P ||
        j[4] !== $.isCrossCurrencyTrade ||
        j[5] !== $.isPaymentRouted
          ? ((l =
              $.isCrossCurrencyTrade ??
              (0, s.c)({
                isPaymentRouted: $.isPaymentRouted ?? !1,
                isUsdcPayment: G,
                isUsdcQuote: P,
              })),
            (j[2] = G),
            (j[3] = P),
            (j[4] = $.isCrossCurrencyTrade),
            (j[5] = $.isPaymentRouted),
            (j[6] = l))
          : (l = j[6]);
        let J = l,
          Z = $.healStoredDisplayMode ?? !0,
          { mode: Y } = (0, u.f)("buy", G, R, J, Z),
          X = (0, o.o)(),
          ee = (0, o.d)(),
          et = (0, o.k)(),
          en = (0, o.N)(),
          el = "usd" === Y ? "usd" : "sol" === Y ? "sol" : G ? "usd" : "sol",
          ei = "usd" === el ? X : ee;
        j[7] !== el
          ? ((i = (e) => ("usd" === el ? `$${e}` : `${e} SOL`)),
            (j[7] = el),
            (j[8] = i))
          : (i = j[8]);
        let ea = i,
          er =
            "usd" === el
              ? "trading.quickBuy.presets.usd"
              : "trading.quickBuy.presets.sol",
          es = ei.values;
        (j[9] !== ea || j[10] !== L
          ? ((d = (e) => L("web.trade.quick_buy_amount", { amount: ea(e) })),
            (m = (e) => L("web.trade.quick_buy_confirm", { amount: ea(e) })),
            (j[9] = ea),
            (j[10] = L),
            (j[11] = d),
            (j[12] = m))
          : ((d = j[11]), (m = j[12])),
          j[13] !== el || j[14] !== D
            ? ((b = (e) => {
                D(e, el);
              }),
              (j[13] = el),
              (j[14] = D),
              (j[15] = b))
            : (b = j[15]));
        let eo = W || K || (void 0 !== V && V);
        (j[16] !== Q ? ((f = Q("buy")), (j[16] = Q), (j[17] = f)) : (f = j[17]),
          j[18] !== el || j[19] !== F
            ? ((y = (e) => F(e, el)), (j[18] = el), (j[19] = F), (j[20] = y))
            : (y = j[20]),
          j[21] !== el || j[22] !== z
            ? ((h = z && { onPreview: (e) => z(e, el) }),
              (j[21] = el),
              (j[22] = z),
              (j[23] = h))
            : (h = j[23]),
          j[24] !== el || j[25] !== E
            ? ((v = E && { requiresHold: (e) => E("buy", e, el) }),
              (j[24] = el),
              (j[25] = E),
              (j[26] = v))
            : (v = j[26]),
          j[27] !== ea || j[28] !== L
            ? ((p = (e) =>
                L("web.trade.hold_to_buy_amount", { amount: ea(e) })),
              (j[27] = ea),
              (j[28] = L),
              (j[29] = p))
            : (p = j[29]),
          j[30] !== ei.values ||
          j[31] !== ea ||
          j[32] !== b ||
          j[33] !== eo ||
          j[34] !== f ||
          j[35] !== y ||
          j[36] !== h ||
          j[37] !== v ||
          j[38] !== p ||
          j[39] !== er ||
          j[40] !== d ||
          j[41] !== m
            ? ((g = {
                tone: "buy",
                settingId: er,
                values: es,
                formatLabel: ea,
                actionLabel: d,
                confirmLabel: m,
                onApply: b,
                disabled: eo,
                busyValue: f,
                isPillDisabled: y,
                ...h,
                ...v,
                holdLabel: p,
              }),
              (j[30] = ei.values),
              (j[31] = ea),
              (j[32] = b),
              (j[33] = eo),
              (j[34] = f),
              (j[35] = y),
              (j[36] = h),
              (j[37] = v),
              (j[38] = p),
              (j[39] = er),
              (j[40] = d),
              (j[41] = m),
              (j[42] = g))
            : (g = j[42]));
        let eu = g,
          ec = et.values;
        (j[43] !== L
          ? ((x = (e) => L("web.trade.quick_sell_percent", { percent: e })),
            (_ = (e) => L("web.trade.quick_sell_confirm", { percent: e })),
            (j[43] = L),
            (j[44] = x),
            (j[45] = _))
          : ((x = j[44]), (_ = j[45])),
          j[46] !== T
            ? ((k = (e) => {
                T(e);
              }),
              (j[46] = T),
              (j[47] = k))
            : (k = j[47]));
        let ed = W || K || !A;
        (j[48] !== Q
          ? ((w = Q("sell")), (j[48] = Q), (j[49] = w))
          : (w = j[49]),
          j[50] !== E
            ? ((S = E && { requiresHold: (e) => E("sell", e, "usd") }),
              (j[50] = E),
              (j[51] = S))
            : (S = j[51]),
          j[52] !== L
            ? ((N = (e) =>
                L("web.trade.hold_to_sell_amount", { amount: `${e}%` })),
              (j[52] = L),
              (j[53] = N))
            : (N = j[53]),
          j[54] !== et.values ||
          j[55] !== x ||
          j[56] !== _ ||
          j[57] !== k ||
          j[58] !== ed ||
          j[59] !== w ||
          j[60] !== S ||
          j[61] !== N
            ? ((q = {
                tone: "sell",
                settingId: "trading.quickSell.presets",
                values: ec,
                formatLabel: c,
                actionLabel: x,
                confirmLabel: _,
                onApply: k,
                disabled: ed,
                busyValue: w,
                ...S,
                holdLabel: N,
              }),
              (j[54] = et.values),
              (j[55] = x),
              (j[56] = _),
              (j[57] = k),
              (j[58] = ed),
              (j[59] = w),
              (j[60] = S),
              (j[61] = N),
              (j[62] = q))
            : (q = j[62]));
        let em = q,
          eb = !(P || J);
        j[63] !== en ||
        j[64] !== et ||
        j[65] !== ee ||
        j[66] !== L ||
        j[67] !== eb ||
        j[68] !== X
          ? ((C = (function ({
              t: e,
              solPresets: t,
              usdPresets: n,
              sellPresets: l,
              chipPresets: i,
              includeSolBuy: a,
            }) {
              let r = {
                  values: t.values,
                  title: e("web.trade.quick_buy_sol_title"),
                  subtitle: e("web.trade.quick_buy_sol_subtitle"),
                  unit: "SOL",
                  changeType: "buy_amount",
                  settingId: "trading.quickBuy.presets.sol",
                  onEdit: t.setValue,
                  onReset: t.reset,
                },
                s = {
                  values: n.values,
                  title: e("web.trade.quick_buy_usd_title"),
                  subtitle: e("web.trade.quick_buy_usd_subtitle"),
                  unit: "USD",
                  changeType: "buy_amount",
                  settingId: "trading.quickBuy.presets.usd",
                  onEdit: n.setValue,
                  onReset: n.reset,
                },
                o = {
                  values: l.values,
                  title: e("web.trade.quick_sell_title"),
                  subtitle: e("web.trade.quick_sell_subtitle"),
                  unit: "%",
                  changeType: "sell_amount",
                  settingId: "trading.quickSell.presets",
                  onEdit: l.setValue,
                  onReset: l.reset,
                },
                u = i
                  ? {
                      values: i.values,
                      title: e("web.trade.amount_chips_title"),
                      subtitle: e("web.trade.amount_chips_subtitle"),
                      unit: "%",
                      settingId: "trading.amountChips",
                      onEdit: i.setValue,
                      onReset: i.reset,
                    }
                  : null,
                c = a ? [r, s, o] : [s, o];
              return u ? [...c, u] : c;
            })({
              t: L,
              solPresets: ee,
              usdPresets: X,
              sellPresets: et,
              chipPresets: en,
              includeSolBuy: eb,
            })),
            (j[63] = en),
            (j[64] = et),
            (j[65] = ee),
            (j[66] = L),
            (j[67] = eb),
            (j[68] = X),
            (j[69] = C))
          : (C = j[69]);
        let ef = C;
        return (
          j[70] !== eu || j[71] !== A || j[72] !== em || j[73] !== ef
            ? ((I = { buy: eu, sell: em, settingsPresets: ef, hasPosition: A }),
              (j[70] = eu),
              (j[71] = A),
              (j[72] = em),
              (j[73] = ef),
              (j[74] = I))
            : (I = j[74]),
          I
        );
      },
    ],
    158928,
  );
  var d = e.i(732486),
    m = e.i(745018),
    b = e.i(426091),
    f = e.i(256272),
    y = e.i(51206),
    h = e.i(813792),
    v = e.i(847407),
    p = e.i(887009),
    g = e.i(407121),
    x = e.i(855659);
  let _ = (e, t) =>
      t.hold
        ? (e.holdLabel?.(t.value) ?? e.confirmLabel(t.value))
        : e.confirmLabel(t.value),
    k = (0, b.c)(g.S, "gap-1 border-transparent"),
    w = {
      buy: "bg-bg-accent/[0.12] text-text-accent hover:bg-bg-accent/20 hover:text-text-accent focus-visible:bg-bg-accent/20 disabled:hover:bg-bg-accent/[0.12] disabled:hover:text-text-accent",
      sell: "bg-loss/[0.12] text-loss hover:bg-loss/20 hover:text-loss focus-visible:bg-loss/20 disabled:hover:bg-loss/[0.12] disabled:hover:text-loss",
    };
  function S(e) {
    let n,
      l,
      i,
      a,
      r,
      s = (0, t.c)(21),
      {
        label: o,
        ariaLabel: u,
        onClick: c,
        onPreview: f,
        disabled: y,
        busy: h,
        tone: v,
      } = e,
      p = void 0 !== h && h,
      g = y || p,
      x = !!p || void 0,
      _ = w[v],
      S = p && "disabled:cursor-progress disabled:opacity-100";
    s[0] !== _ || s[1] !== S
      ? ((n = (0, b.c)(k, _, S)), (s[0] = _), (s[1] = S), (s[2] = n))
      : (n = s[2]);
    let N = `quick-${v}-bolt`;
    return (
      s[3] !== N
        ? ((l = (0, d.jsx)(m.$U, {
            "aria-hidden": !0,
            "data-testid": N,
            className: "size-3 shrink-0",
          })),
          (s[3] = N),
          (s[4] = l))
        : (l = s[4]),
      s[5] !== o
        ? ((i = (0, d.jsx)("span", {
            className: "min-w-0 truncate",
            children: o,
          })),
          (s[5] = o),
          (s[6] = i))
        : (i = s[6]),
      s[7] !== p || s[8] !== v
        ? ((a = p
            ? (0, d.jsx)(m.Wh, {
                "aria-hidden": !0,
                "data-testid": `quick-${v}-busy`,
                className: "size-3 shrink-0 animate-spin",
              })
            : null),
          (s[7] = p),
          (s[8] = v),
          (s[9] = a))
        : (a = s[9]),
      s[10] !== u ||
      s[11] !== c ||
      s[12] !== f ||
      s[13] !== a ||
      s[14] !== g ||
      s[15] !== x ||
      s[16] !== n ||
      s[17] !== l ||
      s[18] !== i ||
      s[19] !== v
        ? ((r = (0, d.jsxs)("button", {
            type: "button",
            onClick: c,
            onMouseEnter: f,
            onFocus: f,
            disabled: g,
            "aria-label": u,
            "aria-busy": x,
            "data-tone": v,
            className: n,
            children: [l, i, a],
          })),
          (s[10] = u),
          (s[11] = c),
          (s[12] = f),
          (s[13] = a),
          (s[14] = g),
          (s[15] = x),
          (s[16] = n),
          (s[17] = l),
          (s[18] = i),
          (s[19] = v),
          (s[20] = r))
        : (r = s[20]),
      r
    );
  }
  function N(e) {
    let l,
      i,
      a,
      s,
      o,
      u,
      c,
      p,
      k = (0, t.c)(46),
      {
        row: w,
        armed: N,
        onTap: q,
        onConfirm: C,
        onCancel: I,
        onHoldChange: j,
        onEdit: $,
      } = e,
      { t: E } = (0, r.f)(),
      L = (0, x.q)((0, f.u)()),
      P = (0, n.useRef)(null),
      R = "buy" === w.tone ? "Quick buy" : "Quick sell";
    if (
      (k[0] !== N
        ? ((l = () => {
            null !== N && P.current?.focus();
          }),
          (i = [N]),
          (k[0] = N),
          (k[1] = l),
          (k[2] = i))
        : ((l = k[1]), (i = k[2])),
      (0, n.useEffect)(l, i),
      null === N)
    ) {
      let e,
        t,
        n,
        l,
        i,
        a,
        r,
        s,
        o = $ && "min-w-0 flex-1";
      (k[3] !== o
        ? ((e = (0, b.c)(g.m, o)), (k[3] = o), (k[4] = e))
        : (e = k[4]),
        k[5] !== q || k[6] !== w
          ? ((t = w.values.map((e, t) =>
              (0, d.jsx)(
                S,
                {
                  label: w.formatLabel(e),
                  ariaLabel: w.actionLabel(e),
                  onClick: () => q(e),
                  onPreview: w.onPreview && (() => w.onPreview?.(e)),
                  disabled: w.disabled || w.isPillDisabled?.(e),
                  busy: w.busyValue === e,
                  tone: w.tone,
                },
                `${w.tone}-${t}`,
              ),
            )),
            (k[5] = q),
            (k[6] = w),
            (k[7] = t))
          : (t = k[7]),
        k[8] !== R || k[9] !== e || k[10] !== t
          ? ((n = (0, d.jsx)("div", {
              className: e,
              role: "group",
              "aria-label": R,
              children: t,
            })),
            (k[8] = R),
            (k[9] = e),
            (k[10] = t),
            (k[11] = n))
          : (n = k[11]));
      let u = n;
      if (!$) return u;
      k[12] !== w.tone || k[13] !== E
        ? ((l =
            "buy" === w.tone
              ? E("web.trade.edit_quick_buy_amounts")
              : E("web.trade.edit_quick_sell_percentages")),
          (k[12] = w.tone),
          (k[13] = E),
          (k[14] = l))
        : (l = k[14]);
      let c = l,
        f = `quick-${w.tone}-edit`;
      return (
        k[15] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (0, d.jsx)(m.yR, {})), (k[15] = i))
          : (i = k[15]),
        k[16] !== c || k[17] !== $ || k[18] !== f
          ? ((a = (0, d.jsx)(y._, {
              density: "terminal",
              size: 24,
              "aria-label": c,
              onClick: $,
              "data-testid": f,
              children: i,
            })),
            (k[16] = c),
            (k[17] = $),
            (k[18] = f),
            (k[19] = a))
          : (a = k[19]),
        k[20] !== c || k[21] !== a
          ? ((r = (0, d.jsx)(h.f, {
              content: c,
              density: "terminal",
              children: a,
            })),
            (k[20] = c),
            (k[21] = a),
            (k[22] = r))
          : (r = k[22]),
        k[23] !== u || k[24] !== r
          ? ((s = (0, d.jsxs)("div", {
              className: "flex items-center gap-1",
              children: [u, r],
            })),
            (k[23] = u),
            (k[24] = r),
            (k[25] = s))
          : (s = k[25]),
        s
      );
    }
    k[26] !== N || k[27] !== w
      ? ((a = _(w, N)), (k[26] = N), (k[27] = w), (k[28] = a))
      : (a = k[28]);
    let D = a,
      T = `quick-${w.tone}-armed`;
    k[29] !== N.hold || k[30] !== I || k[31] !== C
      ? ((s = (e) => {
          "Escape" === e.key
            ? (e.preventDefault(), I())
            : "Enter" !== e.key ||
              N.hold ||
              e.target === e.currentTarget.lastElementChild ||
              (e.preventDefault(), C());
        }),
        (k[29] = N.hold),
        (k[30] = I),
        (k[31] = C),
        (k[32] = s))
      : (s = k[32]);
    let A = N.hold
      ? (0, d.jsx)(v.f, {
          ref: P,
          size: 24,
          side: w.tone,
          idleLabel: D,
          holdingLabel: (e) =>
            "buy" === w.tone
              ? E("web.trade.holding_buy_countdown", { seconds: e })
              : E("web.trade.holding_sell_countdown", { seconds: e }),
          onConfirm: C,
          onHoldChange: j,
          disabled: w.disabled,
          "data-testid": `quick-${w.tone}-confirm`,
          className: "min-w-0 flex-1",
        })
      : (0, d.jsx)("button", {
          ref: P,
          type: "button",
          onClick: C,
          disabled: w.disabled,
          "data-testid": `quick-${w.tone}-confirm`,
          className: (0, b.c)(
            "flex h-6 min-w-0 flex-1 items-center justify-center truncate rounded-md px-2 text-xs font-medium leading-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent disabled:opacity-50",
            L.thumb[w.tone],
            "buy" === w.tone
              ? "text-text-on-accent hover:bg-bg-accent/75"
              : "text-text-on-error hover:bg-loss/75",
          ),
          children: D,
        });
    k[33] !== E
      ? ((o = E("common.cancel")), (k[33] = E), (k[34] = o))
      : (o = k[34]);
    let F = `quick-${w.tone}-cancel`;
    return (
      k[35] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = (0, d.jsx)(m.x6, {})), (k[35] = u))
        : (u = k[35]),
      k[36] !== I || k[37] !== F || k[38] !== o
        ? ((c = (0, d.jsx)(y._, {
            density: "terminal",
            size: 24,
            onClick: I,
            "aria-label": o,
            "data-testid": F,
            children: u,
          })),
          (k[36] = I),
          (k[37] = F),
          (k[38] = o),
          (k[39] = c))
        : (c = k[39]),
      k[40] !== R || k[41] !== c || k[42] !== T || k[43] !== s || k[44] !== A
        ? ((p = (0, d.jsxs)("div", {
            role: "group",
            "aria-label": R,
            "data-testid": T,
            className: "flex h-6 items-center gap-1",
            onKeyDown: s,
            children: [A, c],
          })),
          (k[40] = R),
          (k[41] = c),
          (k[42] = T),
          (k[43] = s),
          (k[44] = A),
          (k[45] = p))
        : (p = k[45]),
      p
    );
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let l,
          i,
          a,
          r,
          s,
          o,
          u,
          c,
          m,
          b,
          f,
          y = (0, t.c)(26),
          { quick: h, side: v, onEditPresets: g, resetKey: x } = e,
          { autoApprove: k } = (0, p.f)(),
          [w, S] = (0, n.useState)(null),
          [q, C] = (0, n.useState)(!1),
          I = `${x ?? ""}|${k}`,
          [j, $] = (0, n.useState)(I);
        if (
          (j !== I && ($(I), S(null)),
          y[0] !== w || y[1] !== q
            ? ((l = () => {
                if (!w || q) return;
                let e = setTimeout(() => S(null), 5e3);
                return () => clearTimeout(e);
              }),
              (i = [w, q]),
              (y[0] = w),
              (y[1] = q),
              (y[2] = l),
              (y[3] = i))
            : ((l = y[2]), (i = y[3])),
          (0, n.useEffect)(l, i),
          y[4] !== w || y[5] !== k || y[6] !== g || y[7] !== h || y[8] !== v)
        ) {
          let e = v ? [h[v]] : [h.buy, h.sell],
            t = w ? e.find((e) => e.tone === w.tone) : null,
            n = () => {
              if (!w || !t || t.disabled) return;
              let { value: e } = w;
              (S(null), t.onApply(e));
            };
          ((c = "flex flex-col gap-1"),
            (m = e.map((e) =>
              (0, d.jsx)(
                N,
                {
                  row: e,
                  armed: w?.tone === e.tone ? w : null,
                  onTap: (t) => {
                    let n;
                    (n = !!e.requiresHold?.(t)) ||
                    (({ tone: e, autoApprove: t }) => "sell" === e && !t)({
                      tone: e.tone,
                      autoApprove: k,
                    })
                      ? S({ tone: e.tone, value: t, hold: n })
                      : (S(null), e.onApply(t));
                  },
                  onConfirm: n,
                  onCancel: () => S(null),
                  onHoldChange: C,
                  onEdit: g && e.settingId ? () => g(e) : void 0,
                },
                e.tone,
              ),
            )),
            (a = "status"),
            (r = "polite"),
            (s = "sr-only"),
            (o = "quick-trade-announcement"),
            (u = w && t ? _(t, w) : ""),
            (y[4] = w),
            (y[5] = k),
            (y[6] = g),
            (y[7] = h),
            (y[8] = v),
            (y[9] = a),
            (y[10] = r),
            (y[11] = s),
            (y[12] = o),
            (y[13] = u),
            (y[14] = c),
            (y[15] = m));
        } else
          ((a = y[9]),
            (r = y[10]),
            (s = y[11]),
            (o = y[12]),
            (u = y[13]),
            (c = y[14]),
            (m = y[15]));
        return (
          y[16] !== a ||
          y[17] !== r ||
          y[18] !== s ||
          y[19] !== o ||
          y[20] !== u
            ? ((b = (0, d.jsx)("span", {
                role: a,
                "aria-live": r,
                className: s,
                "data-testid": o,
                children: u,
              })),
              (y[16] = a),
              (y[17] = r),
              (y[18] = s),
              (y[19] = o),
              (y[20] = u),
              (y[21] = b))
            : (b = y[21]),
          y[22] !== b || y[23] !== c || y[24] !== m
            ? ((f = (0, d.jsxs)("div", { className: c, children: [m, b] })),
              (y[22] = b),
              (y[23] = c),
              (y[24] = m),
              (y[25] = f))
            : (f = y[25]),
          f
        );
      },
    ],
    72768,
  );
};
