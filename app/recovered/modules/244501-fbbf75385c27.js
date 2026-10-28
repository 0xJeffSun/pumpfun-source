// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    r = e.i(745018),
    n = e.i(439587),
    i = e.i(426091),
    a = e.i(352386);
  e.i(12692);
  var s = e.i(398902),
    o = e.i(259948);
  let c = (e) => {
    let r,
      n,
      a,
      s,
      c,
      d,
      u,
      m,
      f = (0, l.c)(23),
      {
        value: x,
        min: h,
        onChange: p,
        disabled: g,
        tone: b,
        "aria-label": v,
      } = e,
      y = void 0 === h ? 0 : h,
      _ = void 0 !== g && g,
      j = "negative" === b ? "bg-loss" : "bg-bg-accent",
      w = _ && "opacity-40";
    return (
      f[0] !== w
        ? ((r = (0, i.c)(
            "relative flex h-8 w-full touch-none select-none items-center",
            w,
          )),
          (f[0] = w),
          (f[1] = r))
        : (r = f[1]),
      f[2] !== x ? ((n = [x]), (f[2] = x), (f[3] = n)) : (n = f[3]),
      f[4] !== p ? ((a = (e) => p(e[0])), (f[4] = p), (f[5] = a)) : (a = f[5]),
      f[6] !== j
        ? ((s = (0, i.c)("absolute h-full", j)), (f[6] = j), (f[7] = s))
        : (s = f[7]),
      f[8] !== s
        ? ((c = (0, t.jsx)(o.m, {
            className:
              "relative h-1.5 w-full grow overflow-hidden rounded-sm bg-bg-tertiary",
            children: (0, t.jsx)(o.h, { className: s }),
          })),
          (f[8] = s),
          (f[9] = c))
        : (c = f[9]),
      f[10] !== j
        ? ((d = (0, i.c)(
            "block size-4 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary/40 disabled:pointer-events-none",
            j,
          )),
          (f[10] = j),
          (f[11] = d))
        : (d = f[11]),
      f[12] !== v || f[13] !== d
        ? ((u = (0, t.jsx)(o.w, { "aria-label": v, className: d })),
          (f[12] = v),
          (f[13] = d),
          (f[14] = u))
        : (u = f[14]),
      f[15] !== _ ||
      f[16] !== y ||
      f[17] !== u ||
      f[18] !== r ||
      f[19] !== n ||
      f[20] !== a ||
      f[21] !== c
        ? ((m = (0, t.jsxs)(o.F, {
            className: r,
            value: n,
            min: y,
            max: 100,
            step: 1,
            disabled: _,
            onValueChange: a,
            children: [c, u],
          })),
          (f[15] = _),
          (f[16] = y),
          (f[17] = u),
          (f[18] = r),
          (f[19] = n),
          (f[20] = a),
          (f[21] = c),
          (f[22] = m))
        : (m = f[22]),
      m
    );
  };
  e.i(84455);
  var d = e.i(678730),
    u = e.i(441315),
    m = e.i(724423),
    f = e.i(51206),
    x = e.i(607122);
  e.i(267146);
  var h = e.i(540805),
    p = e.i(695705);
  let g = (e, t) => {
      if (void 0 === e || "" === e) return null;
      let l = Number(e);
      return !Number.isFinite(l) || l <= 0
        ? null
        : t <= 0
          ? 1 / 0
          : (l / t) * 100;
    },
    b = /^\d+$/,
    v = (e, t) => {
      if (void 0 === e || !b.test(e) || void 0 === t || !b.test(t)) return null;
      let l = BigInt(e);
      if (l <= BigInt(0)) return null;
      let r = BigInt(t);
      if (r <= BigInt(0)) return 1 / 0;
      let n = l * BigInt(1e4),
        i = n % r === BigInt(0) ? BigInt(0) : BigInt(1);
      return Number(n / r + i) / 100;
    };
  e.s(["q", 0, g, "T", 0, v], 886403);
  var y = e.i(148885),
    _ = e.i(890088);
  let j = (e, t) =>
    (0, _.R)(t, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number.isFinite(e) ? e : 0);
  var w = e.i(159709),
    N = e.i(313986);
  let k = [50, 100, 200, 500],
    S = [-10, -25, -50, -75],
    C = (0, i.c)(m.F, m.X.terminal),
    M = (0, i.c)(m.z, m.g.terminal, "font-medium"),
    I = (0, i.c)(
      (0, u.C)({ density: "terminal", variant: "outlined", interactive: !0 }),
      "justify-center gap-0.5 px-1 tabular-nums",
    ),
    P = (e) => {
      let n,
        o,
        u,
        p,
        g,
        b,
        v,
        y,
        _,
        P,
        E,
        T,
        R,
        U,
        D,
        F,
        L,
        B,
        O,
        q,
        z,
        K,
        V,
        Q,
        H,
        W,
        Y,
        X,
        G,
        J,
        Z,
        ee,
        et,
        el,
        er = (0, l.c)(130),
        {
          legLabel: en,
          draft: ei,
          liveMcapUsd: ea,
          showValidationError: es,
          minSellPercent: eo,
          isBusy: ec,
          cancelAffordance: ed,
        } = e,
        { t: eu, i18n: em } = (0, s.f)(),
        ef = em.language,
        ex = (0, a.useRef)(null),
        eh = "tp" === ei.kind,
        ep = "percent" === ei.entryMode,
        eg = ep ? ei.percentValue : ei.mcapValue,
        eb = "" !== eg,
        ev = eh ? k : S;
      er[0] !== eh || er[1] !== eu
        ? ((n = eh
            ? eu("coin_details.add_tp_sl_error_tp_below_min", {
                percent: (0, w.v)(),
              })
            : eu("coin_details.add_tp_sl_error_sl_above_max", {
                percent: (0, w.Y)(),
              })),
          (er[0] = eh),
          (er[1] = eu),
          (er[2] = n))
        : (n = er[2]);
      let ey = n;
      e: {
        let e;
        if (null == ei.mcapUsd || ei.mcapUsd <= 0) {
          o = null;
          break e;
        }
        if (ep) {
          let e, t;
          (er[3] !== ei.mcapUsd || er[4] !== ef
            ? ((e = j(ei.mcapUsd, ef)),
              (er[3] = ei.mcapUsd),
              (er[4] = ef),
              (er[5] = e))
            : (e = er[5]),
            er[6] !== eu
              ? ((t = eu("common.market_cap_short")), (er[6] = eu), (er[7] = t))
              : (t = er[7]),
            (o = `${e} ${t}`));
          break e;
        }
        if (er[8] !== ei.mcapUsd || er[9] !== ea) {
          let t = (0, N.l)(ei.mcapUsd, ea);
          ((e = null == t ? null : (0, h.c)(t, { fractionDigits: 0 })),
            (er[8] = ei.mcapUsd),
            (er[9] = ea),
            (er[10] = e));
        } else e = er[10];
        o = e;
      }
      let e_ = o;
      er[11] !== ei
        ? ((u = () => {
            let e = ei.isFocused;
            (ei.clear(), e && ex.current?.focus());
          }),
          (er[11] = ei),
          (er[12] = u))
        : (u = er[12]);
      let ej = u;
      er[13] !== en
        ? ((p = (0, t.jsx)("h3", {
            className:
              "min-w-0 flex-1 truncate text-[13px] font-medium leading-4 text-text-primary",
            children: en,
          })),
          (er[13] = en),
          (er[14] = p))
        : (p = er[14]);
      let ew = ei.entryMode;
      (er[15] !== ei
        ? ((g = (e) => ei.setEntryMode(e)), (er[15] = ei), (er[16] = g))
        : (g = er[16]),
        er[17] !== eu
          ? ((b = eu("coin_details.add_tp_sl_entry_mode_percent")),
            (er[17] = eu),
            (er[18] = b))
          : (b = er[18]),
        er[19] !== ec || er[20] !== b
          ? ((v = { value: "percent", label: b, disabled: ec }),
            (er[19] = ec),
            (er[20] = b),
            (er[21] = v))
          : (v = er[21]),
        er[22] !== eu
          ? ((y = eu("common.market_cap_short")), (er[22] = eu), (er[23] = y))
          : (y = er[23]),
        er[24] !== ec || er[25] !== y
          ? ((_ = { value: "mcap", label: y, disabled: ec }),
            (er[24] = ec),
            (er[25] = y),
            (er[26] = _))
          : (_ = er[26]),
        er[27] !== _ || er[28] !== v
          ? ((P = [v, _]), (er[27] = _), (er[28] = v), (er[29] = P))
          : (P = er[29]),
        er[30] !== ei.entryMode || er[31] !== en || er[32] !== P || er[33] !== g
          ? ((E = (0, t.jsx)(x.X, {
              density: "terminal",
              size: 28,
              "aria-label": en,
              value: ew,
              onValueChange: g,
              options: P,
            })),
            (er[30] = ei.entryMode),
            (er[31] = en),
            (er[32] = P),
            (er[33] = g),
            (er[34] = E))
          : (E = er[34]),
        er[35] !== ed || er[36] !== E || er[37] !== p
          ? ((T = (0, t.jsxs)("div", {
              className: "flex items-center gap-3",
              children: [p, ed, E],
            })),
            (er[35] = ed),
            (er[36] = E),
            (er[37] = p),
            (er[38] = T))
          : (T = er[38]));
      let eN = es ? m.D.invalid : m.D.valid;
      (er[39] !== eN
        ? ((R = (0, i.c)(C, eN)), (er[39] = eN), (er[40] = R))
        : (R = er[40]),
        er[41] !== ei.kind || er[42] !== eb || er[43] !== ep
          ? ((U = ep ? (0, t.jsx)($, { kind: ei.kind, toned: eb }) : null),
            (er[41] = ei.kind),
            (er[42] = eb),
            (er[43] = ep),
            (er[44] = U))
          : (U = er[44]));
      let ek = ep ? "numeric" : "decimal",
        eS = ep ? "w-auto shrink" : "flex-1";
      if (
        (er[45] !== eS
          ? ((D = (0, i.c)(M, eS)), (er[45] = eS), (er[46] = D))
          : (D = er[46]),
        er[47] !== eg || er[48] !== ep
          ? ((F = ep ? { width: `${Math.max(1, eg.length)}ch` } : void 0),
            (er[47] = eg),
            (er[48] = ep),
            (er[49] = F))
          : (F = er[49]),
        er[50] !== ep || er[51] !== ef
          ? ((L = ep ? "0" : j(0, ef)),
            (er[50] = ep),
            (er[51] = ef),
            (er[52] = L))
          : (L = er[52]),
        er[53] !== ei
          ? ((B = (e) => ei.handleChangeText(e.target.value)),
            (er[53] = ei),
            (er[54] = B))
          : (B = er[54]),
        er[55] !== ei.handleBlur ||
        er[56] !== ei.handleFocus ||
        er[57] !== eg ||
        er[58] !== ec ||
        er[59] !== en ||
        er[60] !== es ||
        er[61] !== ek ||
        er[62] !== D ||
        er[63] !== F ||
        er[64] !== L ||
        er[65] !== B
          ? ((O = (0, t.jsx)("input", {
              ref: ex,
              type: "text",
              inputMode: ek,
              className: D,
              style: F,
              placeholder: L,
              value: eg,
              disabled: ec,
              onChange: B,
              onFocus: ei.handleFocus,
              onBlur: ei.handleBlur,
              "aria-invalid": es,
              "aria-label": en,
            })),
            (er[55] = ei.handleBlur),
            (er[56] = ei.handleFocus),
            (er[57] = eg),
            (er[58] = ec),
            (er[59] = en),
            (er[60] = es),
            (er[61] = ek),
            (er[62] = D),
            (er[63] = F),
            (er[64] = L),
            (er[65] = B),
            (er[66] = O))
          : (O = er[66]),
        er[67] !== ep || er[68] !== eu
          ? ((q = ep
              ? (0, t.jsx)("span", {
                  className: "text-[13px] leading-4 text-text-tertiary",
                  children: eu("coin_details.add_tp_sl_entry_mode_percent"),
                })
              : null),
            (er[67] = ep),
            (er[68] = eu),
            (er[69] = q))
          : (q = er[69]),
        er[70] !== U || er[71] !== O || er[72] !== q
          ? ((z = (0, t.jsxs)("label", {
              className:
                "flex min-w-0 flex-1 cursor-text items-center gap-2 self-stretch",
              children: [U, O, q],
            })),
            (er[70] = U),
            (er[71] = O),
            (er[72] = q),
            (er[73] = z))
          : (z = er[73]),
        er[74] !== e_
          ? ((K = e_
              ? (0, t.jsx)("span", {
                  className:
                    "shrink truncate text-[12px] leading-4 text-text-tertiary tabular-nums",
                  children: e_,
                })
              : null),
            (er[74] = e_),
            (er[75] = K))
          : (K = er[75]),
        er[76] !== ej || er[77] !== eb || er[78] !== ec || er[79] !== eu
          ? ((V = eb
              ? (0, t.jsx)(f._, {
                  density: "terminal",
                  size: 20,
                  className: "-mr-1",
                  "aria-label": eu("coin_details.add_tp_sl_clear_input_a11y"),
                  disabled: ec,
                  onClick: ej,
                  children: (0, t.jsx)(r.AD, { "aria-hidden": !0 }),
                })
              : null),
            (er[76] = ej),
            (er[77] = eb),
            (er[78] = ec),
            (er[79] = eu),
            (er[80] = V))
          : (V = er[80]),
        er[81] !== R || er[82] !== z || er[83] !== K || er[84] !== V
          ? ((Q = (0, t.jsxs)("div", { className: R, children: [z, K, V] })),
            (er[81] = R),
            (er[82] = z),
            (er[83] = K),
            (er[84] = V),
            (er[85] = Q))
          : (Q = er[85]),
        er[86] !== ey || er[87] !== es
          ? ((H = es
              ? (0, t.jsx)("p", {
                  className: "text-[12px] leading-4 text-text-error",
                  children: ey,
                })
              : null),
            (er[86] = ey),
            (er[87] = es),
            (er[88] = H))
          : (H = er[88]),
        er[89] !== ei || er[90] !== ec || er[91] !== eh || er[92] !== ev)
      ) {
        let e;
        (er[94] !== ei || er[95] !== ec || er[96] !== eh
          ? ((e = (e) =>
              (0, t.jsxs)(
                "button",
                {
                  type: "button",
                  className: I,
                  disabled: ec,
                  "aria-label": `${e > 0 ? "+" : "-"}${Math.abs(e)}%`,
                  onClick: () => ei.applyPresetPercent(e),
                  children: [
                    eh
                      ? (0, t.jsx)(r.YC, {
                          className: "size-3 text-text-accent",
                        })
                      : (0, t.jsx)(r.Ek, {
                          className: (0, i.c)("size-3", (0, d.F)("sell")),
                        }),
                    Math.abs(e),
                    "%",
                  ],
                },
                e,
              )),
            (er[94] = ei),
            (er[95] = ec),
            (er[96] = eh),
            (er[97] = e))
          : (e = er[97]),
          (W = ev.map(e)),
          (er[89] = ei),
          (er[90] = ec),
          (er[91] = eh),
          (er[92] = ev),
          (er[93] = W));
      } else W = er[93];
      er[98] !== W
        ? ((Y = (0, t.jsx)("div", {
            className: "grid auto-cols-fr grid-flow-col gap-1",
            children: W,
          })),
          (er[98] = W),
          (er[99] = Y))
        : (Y = er[99]);
      let eC = !eb;
      (er[100] !== ei.sellPercent || er[101] !== eo || er[102] !== eu
        ? ((X =
            eo > 0 && ei.sellPercent <= eo
              ? eu("coin_details.add_tp_sl_exit_minimum_tag", {
                  min_amount: `$${w.m}`,
                })
              : null),
          (er[100] = ei.sellPercent),
          (er[101] = eo),
          (er[102] = eu),
          (er[103] = X))
        : (X = er[103]),
        er[104] !== ei.sellPercent || er[105] !== eC || er[106] !== X
          ? ((G = (0, t.jsx)(A, {
              percent: ei.sellPercent,
              isDisabled: eC,
              minTag: X,
            })),
            (er[104] = ei.sellPercent),
            (er[105] = eC),
            (er[106] = X),
            (er[107] = G))
          : (G = er[107]));
      let eM = Math.max(ei.sellPercent, eo),
        eI = Math.max(1, eo),
        eP = ec || !eb,
        eE = eh ? "accent" : "negative";
      return (
        er[108] !== ei || er[109] !== eo
          ? ((J = (e) => ei.setSellPercent(Math.max(e, eo))),
            (er[108] = ei),
            (er[109] = eo),
            (er[110] = J))
          : (J = er[110]),
        er[111] !== eu
          ? ((Z = eu("coin_details.add_tp_sl_exit_amount_label")),
            (er[111] = eu),
            (er[112] = Z))
          : (Z = er[112]),
        er[113] !== eM ||
        er[114] !== eI ||
        er[115] !== eP ||
        er[116] !== eE ||
        er[117] !== J ||
        er[118] !== Z
          ? ((ee = (0, t.jsx)("div", {
              className: "min-w-0 flex-1",
              children: (0, t.jsx)(c, {
                value: eM,
                min: eI,
                disabled: eP,
                tone: eE,
                onChange: J,
                "aria-label": Z,
              }),
            })),
            (er[113] = eM),
            (er[114] = eI),
            (er[115] = eP),
            (er[116] = eE),
            (er[117] = J),
            (er[118] = Z),
            (er[119] = ee))
          : (ee = er[119]),
        er[120] !== G || er[121] !== ee
          ? ((et = (0, t.jsxs)("div", {
              className: "flex items-center gap-3 pt-1",
              children: [G, ee],
            })),
            (er[120] = G),
            (er[121] = ee),
            (er[122] = et))
          : (et = er[122]),
        er[123] !== en ||
        er[124] !== T ||
        er[125] !== Q ||
        er[126] !== H ||
        er[127] !== Y ||
        er[128] !== et
          ? ((el = (0, t.jsxs)("section", {
              "aria-label": en,
              className: "flex flex-col gap-2",
              children: [T, Q, H, Y, et],
            })),
            (er[123] = en),
            (er[124] = T),
            (er[125] = Q),
            (er[126] = H),
            (er[127] = Y),
            (er[128] = et),
            (er[129] = el))
          : (el = er[129]),
        el
      );
    },
    E = (e) => {
      let r,
        a,
        o,
        c,
        d,
        u,
        m,
        f,
        x,
        b,
        _ = (0, l.c)(72),
        {
          legLabel: w,
          order: k,
          liveMcapUsd: S,
          tokenBalanceUi: M,
          tokenBalanceAtoms: I,
          mintDecimals: P,
          isCancelPending: E,
          cancelA11yLabel: $,
          onRequestCancel: T,
        } = e,
        { t: R, i18n: U } = (0, s.f)(),
        D = U.language;
      _[0] !== k.status
        ? ((r = (0, p.D)(k.status)), (_[0] = k.status), (_[1] = r))
        : (r = _[1]);
      let F = r;
      _[2] !== P || _[3] !== k.quantityAtomic
        ? ((a = (0, y.W)(k.quantityAtomic, P)),
          (_[2] = P),
          (_[3] = k.quantityAtomic),
          (_[4] = a))
        : (a = _[4]);
      let L = a;
      if (
        _[5] !== $ ||
        _[6] !== F ||
        _[7] !== E ||
        _[8] !== w ||
        _[9] !== S ||
        _[10] !== D ||
        _[11] !== T ||
        _[12] !== k.quantity ||
        _[13] !== k.quantityAtomic ||
        _[14] !== k.triggerMcapUsd ||
        _[15] !== L ||
        _[16] !== R ||
        _[17] !== I ||
        _[18] !== M
      ) {
        let e,
          l,
          r,
          a =
            null != I && void 0 !== k.quantityAtomic
              ? v(k.quantityAtomic, I)
              : null == M
                ? null
                : g(null == L ? k.quantity : String(L), M),
          s = null != a && a > 100;
        if (
          _[25] !== $ ||
          _[26] !== s ||
          _[27] !== F ||
          _[28] !== E ||
          _[29] !== w ||
          _[30] !== S ||
          _[31] !== D ||
          _[32] !== T ||
          _[33] !== k.triggerMcapUsd ||
          _[34] !== R
        ) {
          let a,
            o,
            c,
            f = null != k.triggerMcapUsd ? (0, N.l)(k.triggerMcapUsd, S) : null;
          ((d = w),
            (u = "flex flex-col gap-2"),
            _[41] !== w
              ? ((a = (0, t.jsx)("h3", {
                  className:
                    "min-w-0 flex-1 truncate text-[13px] font-medium leading-4 text-text-primary",
                  children: w,
                })),
                (_[41] = w),
                (_[42] = a))
              : (a = _[42]),
            _[43] !== $ ||
            _[44] !== F ||
            _[45] !== E ||
            _[46] !== T ||
            _[47] !== R
              ? ((o = F
                  ? null
                  : (0, t.jsx)(n.K, {
                      variant: "secondary",
                      size: 32,
                      className: "shrink-0 text-text-error",
                      isDisabled: E,
                      "aria-label": $,
                      onClick: T,
                      children: R("coin_details.add_tp_sl_cancel_order"),
                    })),
                (_[43] = $),
                (_[44] = F),
                (_[45] = E),
                (_[46] = T),
                (_[47] = R),
                (_[48] = o))
              : (o = _[48]),
            _[49] !== a || _[50] !== o
              ? ((m = (0, t.jsxs)("div", {
                  className: "flex items-center gap-3",
                  children: [a, o],
                })),
                (_[49] = a),
                (_[50] = o),
                (_[51] = m))
              : (m = _[51]));
          let x = s && "opacity-50";
          (_[52] !== x
            ? ((r = (0, i.c)(C, "border-transparent", x)),
              (_[52] = x),
              (_[53] = r))
            : (r = _[53]),
            _[54] !== D || _[55] !== k.triggerMcapUsd
              ? ((c = null != k.triggerMcapUsd ? j(k.triggerMcapUsd, D) : "—"),
                (_[54] = D),
                (_[55] = k.triggerMcapUsd),
                (_[56] = c))
              : (c = _[56]),
            _[57] !== c
              ? ((e = (0, t.jsx)("span", {
                  className:
                    "min-w-0 flex-1 truncate text-[13px] leading-4 font-medium text-text-primary tabular-nums",
                  children: c,
                })),
                (_[57] = c),
                (_[58] = e))
              : (e = _[58]),
            (l = F
              ? (0, t.jsx)("span", {
                  className:
                    "shrink-0 text-[12px] leading-4 text-text-tertiary",
                  children: R("coin_details.manage_orders.status_executing"),
                })
              : null != f
                ? (0, t.jsx)("span", {
                    className:
                      "shrink-0 text-[12px] leading-4 text-text-tertiary tabular-nums",
                    children: (0, h.c)(f, { fractionDigits: 0 }),
                  })
                : null),
            (_[25] = $),
            (_[26] = s),
            (_[27] = F),
            (_[28] = E),
            (_[29] = w),
            (_[30] = S),
            (_[31] = D),
            (_[32] = T),
            (_[33] = k.triggerMcapUsd),
            (_[34] = R),
            (_[35] = e),
            (_[36] = l),
            (_[37] = d),
            (_[38] = u),
            (_[39] = m),
            (_[40] = r));
        } else
          ((e = _[35]),
            (l = _[36]),
            (d = _[37]),
            (u = _[38]),
            (m = _[39]),
            (r = _[40]));
        (_[59] !== e || _[60] !== l || _[61] !== r
          ? ((f = (0, t.jsxs)("div", { className: r, children: [e, l] })),
            (_[59] = e),
            (_[60] = l),
            (_[61] = r),
            (_[62] = f))
          : (f = _[62]),
          (o = "pt-1"),
          (c = s
            ? (0, t.jsx)("p", {
                className: "text-[12px] leading-4 text-text-error",
                children: R("coin_details.add_tp_sl_coverage_exceeds"),
              })
            : null != a && Number.isFinite(a)
              ? (0, t.jsx)(A, {
                  percent: Math.round(a),
                  isDisabled: !1,
                  minTag: null,
                })
              : null),
          (_[5] = $),
          (_[6] = F),
          (_[7] = E),
          (_[8] = w),
          (_[9] = S),
          (_[10] = D),
          (_[11] = T),
          (_[12] = k.quantity),
          (_[13] = k.quantityAtomic),
          (_[14] = k.triggerMcapUsd),
          (_[15] = L),
          (_[16] = R),
          (_[17] = I),
          (_[18] = M),
          (_[19] = o),
          (_[20] = c),
          (_[21] = d),
          (_[22] = u),
          (_[23] = m),
          (_[24] = f));
      } else
        ((o = _[19]),
          (c = _[20]),
          (d = _[21]),
          (u = _[22]),
          (m = _[23]),
          (f = _[24]));
      return (
        _[63] !== o || _[64] !== c
          ? ((x = (0, t.jsx)("div", { className: o, children: c })),
            (_[63] = o),
            (_[64] = c),
            (_[65] = x))
          : (x = _[65]),
        _[66] !== d || _[67] !== u || _[68] !== m || _[69] !== f || _[70] !== x
          ? ((b = (0, t.jsxs)("section", {
              "aria-label": d,
              className: u,
              children: [m, f, x],
            })),
            (_[66] = d),
            (_[67] = u),
            (_[68] = m),
            (_[69] = f),
            (_[70] = x),
            (_[71] = b))
          : (b = _[71]),
        b
      );
    },
    A = (e) => {
      let r,
        n,
        a,
        o,
        c,
        d,
        u = (0, l.c)(16),
        { percent: m, isDisabled: f, minTag: x } = e,
        { t: h } = (0, s.f)(),
        p = f ? "text-text-quaternary" : "text-text-tertiary";
      (u[0] !== h
        ? ((r = h("coin_details.add_tp_sl_exit_amount_label")),
          (u[0] = h),
          (u[1] = r))
        : (r = u[1]),
        u[2] !== p || u[3] !== r
          ? ((n = (0, t.jsx)("span", { className: p, children: r })),
            (u[2] = p),
            (u[3] = r),
            (u[4] = n))
          : (n = u[4]));
      let g = f ? "text-text-quaternary" : "text-text-primary";
      return (
        u[5] !== g
          ? ((a = (0, i.c)("tabular-nums", g)), (u[5] = g), (u[6] = a))
          : (a = u[6]),
        u[7] !== m || u[8] !== a
          ? ((o = (0, t.jsxs)("span", { className: a, children: [m, "%"] })),
            (u[7] = m),
            (u[8] = a),
            (u[9] = o))
          : (o = u[9]),
        u[10] !== x
          ? ((c = x
              ? (0, t.jsxs)("span", {
                  className: "font-normal text-text-tertiary",
                  children: ["· ", x],
                })
              : null),
            (u[10] = x),
            (u[11] = c))
          : (c = u[11]),
        u[12] !== n || u[13] !== o || u[14] !== c
          ? ((d = (0, t.jsxs)("div", {
              className:
                "flex shrink-0 items-center gap-1 text-[12px] font-medium leading-4",
              children: [n, o, c],
            })),
            (u[12] = n),
            (u[13] = o),
            (u[14] = c),
            (u[15] = d))
          : (d = u[15]),
        d
      );
    },
    $ = (e) => {
      let n,
        a,
        s = (0, l.c)(6),
        { kind: o, toned: c } = e,
        u = "sl" === o ? r.Ek : r.YC;
      return (
        s[0] !== o || s[1] !== c
          ? ((n = (0, i.c)(
              "size-3.5 shrink-0",
              c
                ? "sl" === o
                  ? (0, d.F)("sell")
                  : "text-text-accent"
                : "text-text-tertiary",
            )),
            (s[0] = o),
            (s[1] = c),
            (s[2] = n))
          : (n = s[2]),
        s[3] !== u || s[4] !== n
          ? ((a = (0, t.jsx)(u, { "aria-hidden": !0, className: n })),
            (s[3] = u),
            (s[4] = n),
            (s[5] = a))
          : (a = s[5]),
        a
      );
    };
  e.s(
    [
      "f",
      0,
      (e) => {
        let r,
          i,
          a,
          o,
          c,
          d = (0, l.c)(35),
          {
            draft: u,
            liveMcapUsd: m,
            activeOrder: f,
            tokenBalanceUi: x,
            tokenBalanceAtoms: h,
            mintDecimals: p,
            isCancelPending: g,
            onRequestCancel: b,
            showValidationError: v,
            minSellPercent: y,
            isEditable: _,
            isBusy: j,
          } = e,
          w = void 0 === h ? null : h,
          N = void 0 === p ? 6 : p,
          k = void 0 === y ? 0 : y,
          S = void 0 !== j && j,
          { t: C } = (0, s.f)(),
          M = "tp" === u.kind;
        d[0] !== M || d[1] !== C
          ? ((r = C(
              M
                ? "coin_details.add_tp_sl_take_profit_order_label"
                : "coin_details.add_tp_sl_stop_loss_order_label",
            )),
            (d[0] = M),
            (d[1] = C),
            (d[2] = r))
          : (r = d[2]);
        let I = r;
        d[3] !== M || d[4] !== C
          ? ((i = C(M ? "common.take_profit" : "common.stop_loss")),
            (d[3] = M),
            (d[4] = C),
            (d[5] = i))
          : (i = d[5]);
        let A = i;
        d[6] !== M || d[7] !== C
          ? ((a = C(
              M
                ? "coin_details.add_tp_sl_cancel_active_take_profit_a11y"
                : "coin_details.add_tp_sl_cancel_active_stop_loss_a11y",
            )),
            (d[6] = M),
            (d[7] = C),
            (d[8] = a))
          : (a = d[8]);
        let $ = a,
          T = null != f && void 0 !== _ && _;
        if (f && !T) {
          let e;
          return (
            d[9] !== f ||
            d[10] !== $ ||
            d[11] !== u.kind ||
            d[12] !== g ||
            d[13] !== I ||
            d[14] !== m ||
            d[15] !== N ||
            d[16] !== b ||
            d[17] !== w ||
            d[18] !== x
              ? ((e = (0, t.jsx)(E, {
                  legLabel: I,
                  kind: u.kind,
                  order: f,
                  liveMcapUsd: m,
                  tokenBalanceUi: x,
                  tokenBalanceAtoms: w,
                  mintDecimals: N,
                  isCancelPending: g,
                  cancelA11yLabel: $,
                  onRequestCancel: b,
                })),
                (d[9] = f),
                (d[10] = $),
                (d[11] = u.kind),
                (d[12] = g),
                (d[13] = I),
                (d[14] = m),
                (d[15] = N),
                (d[16] = b),
                (d[17] = w),
                (d[18] = x),
                (d[19] = e))
              : (e = d[19]),
            e
          );
        }
        let R = T ? I : A;
        return (
          d[20] !== $ ||
          d[21] !== S ||
          d[22] !== g ||
          d[23] !== T ||
          d[24] !== b ||
          d[25] !== C
            ? ((o = T
                ? (0, t.jsx)(n.K, {
                    variant: "ghost",
                    size: 32,
                    className: "shrink-0",
                    isDisabled: g || S,
                    "aria-label": $,
                    onClick: b,
                    children: C("common.cancel"),
                  })
                : null),
              (d[20] = $),
              (d[21] = S),
              (d[22] = g),
              (d[23] = T),
              (d[24] = b),
              (d[25] = C),
              (d[26] = o))
            : (o = d[26]),
          d[27] !== u ||
          d[28] !== S ||
          d[29] !== m ||
          d[30] !== k ||
          d[31] !== v ||
          d[32] !== o ||
          d[33] !== R
            ? ((c = (0, t.jsx)(P, {
                legLabel: R,
                draft: u,
                liveMcapUsd: m,
                showValidationError: v,
                minSellPercent: k,
                isBusy: S,
                cancelAffordance: o,
              })),
              (d[27] = u),
              (d[28] = S),
              (d[29] = m),
              (d[30] = k),
              (d[31] = v),
              (d[32] = o),
              (d[33] = R),
              (d[34] = c))
            : (c = d[34]),
          c
        );
      },
    ],
    244501,
  );
};
