// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(745018),
    i = e.i(439587),
    a = e.i(426091),
    s = e.i(928529),
    l = e.i(352386);
  e.i(12692);
  var o = e.i(398902),
    u = e.i(441315),
    c = e.i(167958),
    d = e.i(724423),
    m = e.i(51206),
    f = e.i(248496),
    p = e.i(163742),
    g = e.i(90832),
    h = e.i(196551),
    v = e.i(292686),
    b = e.i(574472),
    y = e.i(96362),
    _ = e.i(901665),
    w = e.i(102824),
    x = e.i(98830),
    S = e.i(505102),
    A = e.i(111740),
    k = e.i(97326),
    j = e.i(918120),
    I = e.i(595673),
    B = e.i(367310);
  let E = "comfortable",
    $ = (e, t) =>
      "sol" === t.asset
        ? `${(0, g.m)(e, 4)} ${t.symbol}`
        : `${(0, g.p)(e, 2)} ${t.symbol}`,
    N = (0, a.c)(
      (0, u.C)({ density: E, variant: "raised", interactive: !0 }),
      "min-w-0 flex-1 justify-center tabular-nums disabled:hover:!bg-bg-tertiary",
    );
  function T(e) {
    let r,
      i = (0, n.c)(2),
      { leg: a } = e;
    return (
      i[0] !== a.imageUri
        ? ((r = (0, t.jsx)(s.default, {
            src: a.imageUri,
            alt: "",
            width: 20,
            height: 20,
            className: "size-5 shrink-0 rounded-full object-cover",
          })),
          (i[0] = a.imageUri),
          (i[1] = r))
        : (r = i[1]),
      r
    );
  }
  function M(e) {
    let r,
      i,
      a,
      s = (0, n.c)(12),
      { label: l, leg: u, balance: c, balanceId: d } = e,
      { t: m } = (0, o.f)();
    return (
      s[0] !== u
        ? ((r = (0, t.jsx)(T, { leg: u })), (s[0] = u), (s[1] = r))
        : (r = s[1]),
      s[2] !== c || s[3] !== d || s[4] !== u || s[5] !== m
        ? ((i =
            void 0 !== c
              ? (0, t.jsxs)("span", {
                  id: d,
                  "data-testid": "convert-from-balance",
                  className:
                    "ml-auto text-xs leading-4 tabular-nums text-text-tertiary",
                  children: [
                    m("common.balance"),
                    ":",
                    " ",
                    null === c ? "—" : $(c, u),
                  ],
                })
              : void 0),
          (s[2] = c),
          (s[3] = d),
          (s[4] = u),
          (s[5] = m),
          (s[6] = i))
        : (i = s[6]),
      s[7] !== l || s[8] !== u.symbol || s[9] !== r || s[10] !== i
        ? ((a = (0, t.jsx)(h.f, {
            label: l,
            art: r,
            symbol: u.symbol,
            trailing: i,
          })),
          (s[7] = l),
          (s[8] = u.symbol),
          (s[9] = r),
          (s[10] = i),
          (s[11] = a))
        : (a = s[11]),
      a
    );
  }
  function U(e) {
    let r,
      i,
      a,
      s,
      l,
      u,
      c,
      d = (0, n.c)(28),
      { model: m } = e,
      { t: p } = (0, o.f)(),
      { legs: g, preview: h, amountAtomic: v, isInsufficient: b } = m,
      y = null !== v && v > BigInt(0),
      _ = y && !b && null === h.outputUi && !h.isError;
    return (
      d[0] !== p
        ? ((r = p("trade.price_impact_override.you_receive")),
          (d[0] = p),
          (d[1] = r))
        : (r = d[1]),
      d[2] !== r
        ? ((i = (0, t.jsx)("span", {
            className: "text-sm leading-5 text-text-secondary",
            children: r,
          })),
          (d[2] = r),
          (d[3] = i))
        : (i = d[3]),
      d[4] !== y ||
      d[5] !== b ||
      d[6] !== _ ||
      d[7] !== g ||
      d[8] !== h.outputUi
        ? ((a = _
            ? (0, t.jsx)(f.l, { height: 20, width: 112 })
            : (0, t.jsx)("span", {
                "data-testid": "convert-receive-amount",
                className:
                  "text-xl font-medium leading-7 tabular-nums text-text-primary",
                children:
                  y && !b && null !== h.outputUi
                    ? `≈ ${$(h.outputUi, g.to)}`
                    : `— ${g.to.symbol}`,
              })),
          (d[4] = y),
          (d[5] = b),
          (d[6] = _),
          (d[7] = g),
          (d[8] = h.outputUi),
          (d[9] = a))
        : (a = d[9]),
      d[10] !== i || d[11] !== a
        ? ((s = (0, t.jsxs)("div", {
            className: "flex h-11 items-center justify-between gap-3",
            children: [i, a],
          })),
          (d[10] = i),
          (d[11] = a),
          (d[12] = s))
        : (s = d[12]),
      d[13] !== y ||
      d[14] !== b ||
      d[15] !== g ||
      d[16] !== h.minOutputUi ||
      d[17] !== p
        ? ((l =
            null !== h.minOutputUi && y && !b
              ? (0, t.jsxs)("div", {
                  className:
                    "flex items-center justify-between gap-3 text-xs leading-4 text-text-tertiary",
                  children: [
                    (0, t.jsx)("span", {
                      children: p("web.trade.min_received"),
                    }),
                    (0, t.jsx)("span", {
                      "data-testid": "convert-min-received",
                      className: "tabular-nums",
                      children: $(h.minOutputUi, g.to),
                    }),
                  ],
                })
              : null),
          (d[13] = y),
          (d[14] = b),
          (d[15] = g),
          (d[16] = h.minOutputUi),
          (d[17] = p),
          (d[18] = l))
        : (l = d[18]),
      d[19] !== y || d[20] !== b || d[21] !== h.isError || d[22] !== p
        ? ((u =
            h.isError && y && !b
              ? (0, t.jsx)("p", {
                  role: "alert",
                  "data-testid": "convert-quote-error",
                  className: "text-xs leading-4 text-loss",
                  children: p("web.trade.swap_no_route_title"),
                })
              : null),
          (d[19] = y),
          (d[20] = b),
          (d[21] = h.isError),
          (d[22] = p),
          (d[23] = u))
        : (u = d[23]),
      d[24] !== s || d[25] !== l || d[26] !== u
        ? ((c = (0, t.jsxs)("div", {
            className: "flex flex-col gap-1",
            "data-testid": "convert-receive",
            "aria-live": "polite",
            children: [s, l, u],
          })),
          (d[24] = s),
          (d[25] = l),
          (d[26] = u),
          (d[27] = c))
        : (c = d[27]),
      c
    );
  }
  function z(e) {
    let a,
      s,
      u,
      f,
      g,
      h,
      v,
      b,
      y,
      _,
      w,
      x,
      S,
      A,
      k,
      j,
      I,
      B,
      $,
      T,
      z,
      C,
      F,
      O,
      P,
      K,
      L,
      D,
      R,
      q,
      V = (0, n.c)(98),
      { model: W, onCancel: Q } = e,
      { t: J } = (0, o.f)(),
      G = (0, l.useId)(),
      Y = (0, l.useId)(),
      {
        legs: Z,
        amount: H,
        setAmount: X,
        fillShare: ee,
        flip: et,
        fromBalanceAtomic: en,
        fromBalanceUi: er,
        isInsufficient: ei,
        canSubmit: ea,
        isSubmitting: es,
        submit: el,
      } = W,
      eo = null !== en && en > BigInt(0);
    V[0] !== Z.from.symbol || V[1] !== J
      ? ((a = J("profile.spending_power.convert_to", {
          symbol: Z.from.symbol,
        })),
        (V[0] = Z.from.symbol),
        (V[1] = J),
        (V[2] = a))
      : (a = V[2]);
    let eu = a;
    (V[3] !== J ? ((s = J("common.from")), (V[3] = J), (V[4] = s)) : (s = V[4]),
      V[5] !== Y || V[6] !== er || V[7] !== Z.from || V[8] !== s
        ? ((u = (0, t.jsx)(M, {
            label: s,
            leg: Z.from,
            balance: er,
            balanceId: Y,
          })),
          (V[5] = Y),
          (V[6] = er),
          (V[7] = Z.from),
          (V[8] = s),
          (V[9] = u))
        : (u = V[9]),
      V[10] !== Z.from.symbol || V[11] !== J
        ? ((f = J("web.wallet.amount_label", { symbol: Z.from.symbol })),
          (V[10] = Z.from.symbol),
          (V[11] = J),
          (V[12] = f))
        : (f = V[12]),
      V[13] !== G || V[14] !== f
        ? ((g = (0, t.jsx)("label", {
            htmlFor: G,
            className: "sr-only",
            children: f,
          })),
          (V[13] = G),
          (V[14] = f),
          (V[15] = g))
        : (g = V[15]),
      V[16] !== Z.from.symbol || V[17] !== J
        ? ((h = J("trade.enter_amount_in_currency", { symbol: Z.from.symbol })),
          (V[16] = Z.from.symbol),
          (V[17] = J),
          (V[18] = h))
        : (h = V[18]),
      V[19] !== ei || V[20] !== J
        ? ((v = ei ? J("trade.errors.insufficient_funds") : null),
          (V[19] = ei),
          (V[20] = J),
          (V[21] = v))
        : (v = V[21]),
      V[22] !== Z.from.symbol
        ? ((b = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className: "text-xs font-medium leading-4 text-text-tertiary",
            children: Z.from.symbol,
          })),
          (V[22] = Z.from.symbol),
          (V[23] = b))
        : (b = V[23]),
      V[24] !== ee
        ? ((y = () => ee(100)), (V[24] = ee), (V[25] = y))
        : (y = V[25]));
    let ec = !eo || es;
    (V[26] !== J
      ? ((_ = J("common.max")), (V[26] = J), (V[27] = _))
      : (_ = V[27]),
      V[28] !== ec || V[29] !== _ || V[30] !== y
        ? ((w = (0, t.jsx)(i.K, {
            variant: "ghost",
            size: 32,
            "data-testid": "convert-max",
            onClick: y,
            isDisabled: ec,
            children: _,
          })),
          (V[28] = ec),
          (V[29] = _),
          (V[30] = y),
          (V[31] = w))
        : (w = V[31]),
      V[32] !== w || V[33] !== b
        ? ((x = (0, t.jsxs)(t.Fragment, { children: [b, w] })),
          (V[32] = w),
          (V[33] = b),
          (V[34] = x))
        : (x = V[34]),
      V[35] !== H ||
      V[36] !== G ||
      V[37] !== Y ||
      V[38] !== ei ||
      V[39] !== es ||
      V[40] !== X ||
      V[41] !== x ||
      V[42] !== h ||
      V[43] !== v
        ? ((S = (0, t.jsx)(d.N, {
            density: E,
            id: G,
            "data-testid": "convert-amount",
            type: "text",
            inputMode: "decimal",
            autoComplete: "off",
            spellCheck: !1,
            value: H,
            onValueChange: X,
            disabled: es,
            placeholder: "0",
            "aria-label": h,
            "aria-describedby": Y,
            invalid: ei,
            helper: v,
            inputClassName: "font-medium caret-text-primary",
            className: "pr-1.5",
            trailing: x,
          })),
          (V[35] = H),
          (V[36] = G),
          (V[37] = Y),
          (V[38] = ei),
          (V[39] = es),
          (V[40] = X),
          (V[41] = x),
          (V[42] = h),
          (V[43] = v),
          (V[44] = S))
        : (S = V[44]),
      V[45] !== J
        ? ((A = J("web.trade.quick_amounts")), (V[45] = J), (V[46] = A))
        : (A = V[46]),
      V[47] !== ee || V[48] !== eo || V[49] !== es || V[50] !== J
        ? ((k = p.S.map((e) =>
            (0, t.jsx)(
              "button",
              {
                type: "button",
                "data-testid": `convert-percent-${e}`,
                className: N,
                disabled: !eo || es,
                onClick: () => ee(e),
                children: 100 === e ? J("common.max") : `${e}%`,
              },
              e,
            ),
          )),
          (V[47] = ee),
          (V[48] = eo),
          (V[49] = es),
          (V[50] = J),
          (V[51] = k))
        : (k = V[51]),
      V[52] !== A || V[53] !== k
        ? ((j = (0, t.jsx)("div", {
            role: "group",
            "aria-label": A,
            "data-testid": "convert-presets",
            className: "flex gap-1",
            children: k,
          })),
          (V[52] = A),
          (V[53] = k),
          (V[54] = j))
        : (j = V[54]),
      V[55] === Symbol.for("react.memo_cache_sentinel")
        ? ((I = (0, t.jsx)(c.a, { className: "my-1" })), (V[55] = I))
        : (I = V[55]),
      V[56] === Symbol.for("react.memo_cache_sentinel")
        ? ((B = (0, t.jsx)(r.pn, { "aria-hidden": !0 })), (V[56] = B))
        : (B = V[56]),
      V[57] !== et || V[58] !== eu || V[59] !== es
        ? (($ = (0, t.jsxs)("div", {
            className: "relative",
            children: [
              I,
              (0, t.jsx)(m._, {
                density: E,
                size: 32,
                variant: "secondary",
                "aria-label": eu,
                "data-testid": "convert-flip",
                onClick: et,
                disabled: es,
                className:
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                children: B,
              }),
            ],
          })),
          (V[57] = et),
          (V[58] = eu),
          (V[59] = es),
          (V[60] = $))
        : ($ = V[60]),
      V[61] !== J
        ? ((T = J("common.to")), (V[61] = J), (V[62] = T))
        : (T = V[62]),
      V[63] !== Z.to || V[64] !== T
        ? ((z = (0, t.jsx)(M, { label: T, leg: Z.to })),
          (V[63] = Z.to),
          (V[64] = T),
          (V[65] = z))
        : (z = V[65]),
      V[66] !== W
        ? ((C = (0, t.jsx)(U, { model: W })), (V[66] = W), (V[67] = C))
        : (C = V[67]),
      V[68] !== S ||
      V[69] !== j ||
      V[70] !== $ ||
      V[71] !== z ||
      V[72] !== C ||
      V[73] !== u ||
      V[74] !== g
        ? ((F = (0, t.jsxs)(c.K, {
            className: "flex flex-col gap-3",
            children: [u, g, S, j, $, z, C],
          })),
          (V[68] = S),
          (V[69] = j),
          (V[70] = $),
          (V[71] = z),
          (V[72] = C),
          (V[73] = u),
          (V[74] = g),
          (V[75] = F))
        : (F = V[75]),
      V[76] !== J
        ? ((O = J("common.cancel")), (V[76] = J), (V[77] = O))
        : (O = V[77]),
      V[78] !== es || V[79] !== Q || V[80] !== O
        ? ((P = (0, t.jsx)(i.K, {
            variant: "secondary",
            size: c.Z,
            "data-testid": "convert-cancel",
            onClick: Q,
            isDisabled: es,
            children: O,
          })),
          (V[78] = es),
          (V[79] = Q),
          (V[80] = O),
          (V[81] = P))
        : (P = V[81]),
      V[82] !== el
        ? ((K = () => void el()), (V[82] = el), (V[83] = K))
        : (K = V[83]));
    let ed = !ea;
    return (
      V[84] !== Z.to.symbol || V[85] !== J
        ? ((L = J("profile.spending_power.convert_to", {
            symbol: Z.to.symbol,
          })),
          (V[84] = Z.to.symbol),
          (V[85] = J),
          (V[86] = L))
        : (L = V[86]),
      V[87] !== es || V[88] !== K || V[89] !== ed || V[90] !== L
        ? ((D = (0, t.jsx)(i.K, {
            variant: "primary",
            size: c.$,
            "data-testid": "convert-submit",
            onClick: K,
            isDisabled: ed,
            isLoading: es,
            children: L,
          })),
          (V[87] = es),
          (V[88] = K),
          (V[89] = ed),
          (V[90] = L),
          (V[91] = D))
        : (D = V[91]),
      V[92] !== P || V[93] !== D
        ? ((R = (0, t.jsxs)(c.c, { children: [P, D] })),
          (V[92] = P),
          (V[93] = D),
          (V[94] = R))
        : (R = V[94]),
      V[95] !== F || V[96] !== R
        ? ((q = (0, t.jsxs)(t.Fragment, { children: [F, R] })),
          (V[95] = F),
          (V[96] = R),
          (V[97] = q))
        : (q = V[97]),
      q
    );
  }
  function C(e) {
    let r,
      i,
      a,
      s,
      o = (0, n.c)(11),
      { initialFrom: u, onOpenChange: c, onSubmittingChange: d } = e;
    (o[0] !== c ? ((r = () => c(!1)), (o[0] = c), (o[1] = r)) : (r = o[1]),
      o[2] !== u || o[3] !== d || o[4] !== r
        ? ((i = {
            open: !0,
            initialFrom: u,
            onSubmitted: r,
            onSubmittingChange: d,
          }),
          (o[2] = u),
          (o[3] = d),
          (o[4] = r),
          (o[5] = i))
        : (i = o[5]));
    let m = (function ({
      open: e,
      initialFrom: t,
      onSubmitted: n,
      onSubmittingChange: r,
    }) {
      let { address: i } = (0, b.F)(),
        [a, s] = (0, l.useState)(() => (0, p.R)(t)),
        [o, u] = (0, l.useState)(""),
        [c, d] = (0, l.useState)(!1),
        m = (0, p.T)(a),
        { solBalance: f, solBalanceLoaded: g, usdcBalance: h } = (0, w.f)(),
        E = (0, S.G)({
          wallet: i,
          enabled: e && !!i && null === h,
          refetchIntervalMs: _.O,
        }),
        $ = null !== h ? h.balanceRaw : (E.data?.atomicAmount ?? null),
        N = g ? BigInt(Math.trunc(f)) : null,
        T = "usdc" === m.from.asset ? $ : N,
        M = null === T ? null : (0, p.E)(T, m.from.decimals),
        U = (0, p.n)(o, m.from.decimals),
        z = null !== U && U > BigInt(0),
        C = z && null !== T && U > T,
        F = z && null !== T && T > BigInt(0) && U === T,
        O = (0, l.useCallback)((e) => {
          (0, p.c)(e) && u(e);
        }, []),
        P = (0, l.useCallback)(
          (e) => {
            null === T ||
              T <= BigInt(0) ||
              u((0, p.e)((0, p.i)(T, e), m.from.decimals));
          },
          [T, m.from.decimals],
        ),
        K = (0, l.useCallback)(() => {
          (s((e) => (0, p.k)(e)), u(""));
        }, []),
        { slippage: L } = (0, k.f)(),
        { tipAmount: D } = (0, j.f)(),
        { frontRunningProtection: R } = (0, A.f)(),
        q = (0, l.useMemo)(p.M, []),
        V = (0, y.f)({
          mint: q.mint,
          amountAtomic: U ?? BigInt(0),
          isBuy: m.isBuy,
          paymentAsset: p.Z,
          outputDecimals: m.to.decimals,
          slippage: L,
          venueHint: p.D,
          enabled: e && z && !C,
        }),
        { placeSwapBuildTrade: W } = (0, x.f)({
          coin: q,
          paymentAsset: p.Z,
          venueHint: p.D,
          slippage: L,
          tipAmount: D,
          frontRunningProtection: R,
        }),
        Q = (0, B.E)(),
        J = z && !C && null !== T && !c,
        G = (0, l.useCallback)(async () => {
          if (!J || null === U) return;
          let e = !m.isBuy && F;
          (d(!0), r?.(!0));
          try {
            await W({
              amountAtomic: U,
              isBuy: m.isBuy,
              sourceScreen: (0, I.jT)(),
              sourceElement: v.k9.SPENDING_POWER_SHEET,
              onTradeSubmitted: () => {
                (e && Q(!0), n());
              },
            });
          } finally {
            (d(!1), r?.(!1));
          }
        }, [U, J, F, m.isBuy, n, r, W, Q]);
      return {
        direction: a,
        legs: m,
        amount: o,
        setAmount: O,
        fillShare: P,
        flip: K,
        fromBalanceAtomic: T,
        fromBalanceUi: M,
        amountAtomic: U,
        isInsufficient: C,
        isMax: F,
        preview: V,
        canSubmit: J,
        isSubmitting: c,
        submit: G,
      };
    })(i);
    return (
      o[6] !== c ? ((a = () => c(!1)), (o[6] = c), (o[7] = a)) : (a = o[7]),
      o[8] !== m || o[9] !== a
        ? ((s = (0, t.jsx)(z, { model: m, onCancel: a })),
          (o[8] = m),
          (o[9] = a),
          (o[10] = s))
        : (s = o[10]),
      s
    );
  }
  e.s(
    [
      "ConvertSpendingAssetDialog",
      0,
      function (e) {
        let r,
          i,
          a,
          s,
          u = (0, n.c)(15),
          { open: d, onOpenChange: m, initialFrom: f } = e,
          p = void 0 === f ? "usdc" : f,
          { t: g } = (0, o.f)(),
          [h, v] = (0, l.useState)(!1);
        return (
          !d && h && v(!1),
          u[0] !== h || u[1] !== m
            ? ((r = (e) => {
                (e || !h) && m(e);
              }),
              (u[0] = h),
              (u[1] = m),
              (u[2] = r))
            : (r = u[2]),
          u[3] !== g
            ? ((i = g("common.convert")), (u[3] = g), (u[4] = i))
            : (i = u[4]),
          u[5] !== p || u[6] !== m || u[7] !== d
            ? ((a = d
                ? (0, t.jsx)(C, {
                    initialFrom: p,
                    onOpenChange: m,
                    onSubmittingChange: v,
                  })
                : null),
              (u[5] = p),
              (u[6] = m),
              (u[7] = d),
              (u[8] = a))
            : (a = u[8]),
          u[9] !== h || u[10] !== d || u[11] !== r || u[12] !== i || u[13] !== a
            ? ((s = (0, t.jsx)(c.N, {
                open: d,
                onOpenChange: r,
                density: E,
                size: "sm",
                title: i,
                hideClose: h,
                "data-testid": "convert-dialog",
                children: a,
              })),
              (u[9] = h),
              (u[10] = d),
              (u[11] = r),
              (u[12] = i),
              (u[13] = a),
              (u[14] = s))
            : (s = u[14]),
          s
        );
      },
      "ConvertSpendingAssetForm",
      0,
      z,
    ],
    482594,
  );
};
