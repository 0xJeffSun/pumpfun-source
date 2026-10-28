// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(732486),
    r = t.i(445242),
    a = t.i(157633),
    i = t.i(745018),
    n = t.i(439587),
    o = t.i(458310);
  t.i(12692);
  var s = t.i(398902),
    u = t.i(78436),
    c = t.i(744854),
    l = t.i(612559),
    d = t.i(705672);
  let h = (t) =>
      `rounded-[10px] border px-3 py-2 text-xs font-semibold transition-colors ${t ? "border-border-secondary bg-bg-accent text-primary-black" : "border-border-secondary text-text-tertiary hover:bg-bg-tertiary hover:text-text-primary"}`,
    p = (0, u.$)((t) => ({
      isMayhemEnabled: !1,
      setIsMayhemEnabled: (e) => t({ isMayhemEnabled: e }),
      isMayhemManualMode: !1,
      setIsMayhemManualMode: (e) =>
        t({ isMayhemManualMode: e, isMultiplayer: !1 }),
      isMultiplayer: !1,
      setIsMultiplayer: (e) =>
        t(
          e
            ? { isMayhemManualMode: !0, isMultiplayer: !0 }
            : { isMultiplayer: !1 },
        ),
      isHolderReward: !1,
      setIsHolderReward: (e) => t({ isHolderReward: e }),
    }));
  t.s([
    "o",
    0,
    function () {
      let t,
        a,
        o,
        u,
        c,
        l,
        d,
        h,
        w,
        f,
        g,
        m,
        y,
        T,
        k,
        $ = (0, r.c)(35),
        { t: R } = (0, s.f)(),
        { isHolderReward: b, setIsHolderReward: _ } = p();
      ($[0] !== R
        ? ((t = R("web.create.creator_rewards_label")), ($[0] = R), ($[1] = t))
        : (t = $[1]),
        $[2] !== t
          ? ((a = (0, e.jsx)("p", {
              className: "text-xs font-semibold text-text-primary",
              children: t,
            })),
            ($[2] = t),
            ($[3] = a))
          : (a = $[3]));
      let E = b ? "holders" : "creator";
      return (
        $[4] !== _
          ? ((o = (t) => _("holders" === t)), ($[4] = _), ($[5] = o))
          : (o = $[5]),
        $[6] !== R
          ? ((u = R("web.create.creator_rewards_label")),
            ($[6] = R),
            ($[7] = u))
          : (u = $[7]),
        $[8] === Symbol.for("react.memo_cache_sentinel")
          ? ((c = (0, e.jsx)(i.Go, { size: 16 })), ($[8] = c))
          : (c = $[8]),
        $[9] !== R
          ? ((l = R("web.create.creator_rewards_creator")),
            ($[9] = R),
            ($[10] = l))
          : (l = $[10]),
        $[11] !== l
          ? ((d = (0, e.jsxs)(n.T, {
              value: "creator",
              className: "flex-1 gap-1.5 rounded-lg text-sm text-text-tertiary",
              children: [c, l],
            })),
            ($[11] = l),
            ($[12] = d))
          : (d = $[12]),
        $[13] === Symbol.for("react.memo_cache_sentinel")
          ? ((h = (0, e.jsx)(i.PZ, { size: 16 })), ($[13] = h))
          : (h = $[13]),
        $[14] !== R
          ? ((w = R("web.create.creator_rewards_holders")),
            ($[14] = R),
            ($[15] = w))
          : (w = $[15]),
        $[16] !== w
          ? ((f = (0, e.jsxs)(n.T, {
              value: "holders",
              className: "flex-1 gap-1.5 rounded-lg text-sm text-text-tertiary",
              children: [h, w],
            })),
            ($[16] = w),
            ($[17] = f))
          : (f = $[17]),
        $[18] !== f || $[19] !== u || $[20] !== d
          ? ((g = (0, e.jsxs)(n.X, {
              "aria-label": u,
              className:
                "h-12 w-full rounded-xl border border-border-secondary bg-transparent p-1 [&>[data-slot=tabs-segmented-indicator]]:bg-bg-tertiary",
              children: [d, f],
            })),
            ($[18] = f),
            ($[19] = u),
            ($[20] = d),
            ($[21] = g))
          : (g = $[21]),
        $[22] !== g || $[23] !== E || $[24] !== o
          ? ((m = (0, e.jsx)(n.i, { value: E, onValueChange: o, children: g })),
            ($[22] = g),
            ($[23] = E),
            ($[24] = o),
            ($[25] = m))
          : (m = $[25]),
        $[26] !== b || $[27] !== R
          ? ((y = R(
              b
                ? "web.create.creator_rewards_holders_description"
                : "web.create.creator_rewards_creator_description",
            )),
            ($[26] = b),
            ($[27] = R),
            ($[28] = y))
          : (y = $[28]),
        $[29] !== y
          ? ((T = (0, e.jsx)("p", {
              className: "text-xs text-text-secondary",
              children: y,
            })),
            ($[29] = y),
            ($[30] = T))
          : (T = $[30]),
        $[31] !== a || $[32] !== m || $[33] !== T
          ? ((k = (0, e.jsxs)("div", {
              className: "flex flex-col gap-2",
              children: [a, m, T],
            })),
            ($[31] = a),
            ($[32] = m),
            ($[33] = T),
            ($[34] = k))
          : (k = $[34]),
        k
      );
    },
    "U",
    0,
    function (t) {
      let i,
        u,
        d,
        h,
        w,
        f,
        g,
        m,
        y,
        T,
        k,
        $,
        R,
        b,
        _,
        E = (0, r.c)(34),
        { isDisabled: H } = t,
        U = void 0 !== H && H,
        { t: A } = (0, s.f)(),
        { isMayhemEnabled: P, setIsMayhemEnabled: v } = p(),
        { setIsOpen: S } = (0, c.useMayhemModeDialogEnabledStore)();
      return (
        E[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (0, e.jsx)("div", {
              className: "shrink-0",
              children: (0, e.jsx)(l.f, {}),
            })),
            (E[0] = i))
          : (i = E[0]),
        E[1] !== A
          ? ((u = A("web.mayhem.mayhem_mode")), (E[1] = A), (E[2] = u))
          : (u = E[2]),
        E[3] !== u
          ? ((d = (0, e.jsx)("div", {
              className: "flex items-center gap-x-1.5",
              children: (0, e.jsx)("p", {
                className: "text-xs font-semibold text-text-primary",
                children: u,
              }),
            })),
            (E[3] = u),
            (E[4] = d))
          : (d = E[4]),
        E[5] !== A
          ? ((h = A("web.mayhem.increased_price_volume")),
            (E[5] = A),
            (E[6] = h))
          : (h = E[6]),
        E[7] !== h
          ? ((w = (0, e.jsx)("p", {
              className: "text-xs text-text-tertiary",
              children: h,
            })),
            (E[7] = h),
            (E[8] = w))
          : (w = E[8]),
        E[9] !== d || E[10] !== w
          ? ((f = (0, e.jsxs)("div", {
              className: "flex w-full flex-col gap-y-px",
              children: [d, w],
            })),
            (E[9] = d),
            (E[10] = w),
            (E[11] = f))
          : (f = E[11]),
        E[12] !== U || E[13] !== P || E[14] !== v
          ? ((g = (0, e.jsx)("div", {
              className: "shrink-0",
              children: (0, e.jsx)(n.Z, {
                isChecked: P,
                isDisabled: U,
                onCheckedChange: v,
              }),
            })),
            (E[12] = U),
            (E[13] = P),
            (E[14] = v),
            (E[15] = g))
          : (g = E[15]),
        E[16] !== f || E[17] !== g
          ? ((m = (0, e.jsxs)("div", {
              className:
                "flex items-center gap-x-2 rounded-xl border border-border-secondary bg-bg-secondary p-3",
              children: [i, f, g],
            })),
            (E[16] = f),
            (E[17] = g),
            (E[18] = m))
          : (m = E[18]),
        E[19] !== S
          ? ((y = () => S(!0)), (E[19] = S), (E[20] = y))
          : (y = E[20]),
        E[21] === Symbol.for("react.memo_cache_sentinel")
          ? ((T = (0, e.jsx)(a.wB, { className: "shrink-0", size: 14 })),
            (E[21] = T))
          : (T = E[21]),
        E[22] !== y
          ? ((k = (0, e.jsx)("button", {
              className: "transition-colors hover:text-text-primary",
              onClick: y,
              type: "button",
              children: T,
            })),
            (E[22] = y),
            (E[23] = k))
          : (k = E[23]),
        E[24] !== U || E[25] !== A
          ? (($ = U
              ? (0, e.jsx)("p", {
                  className: "text-xs text-text-secondary",
                  children: A("web.create.pair_stock_mayhem_unsupported"),
                })
              : (0, e.jsxs)("p", {
                  className: "text-xs text-text-secondary",
                  children: [
                    A("web.mayhem.create_toggle_explainer"),
                    " ",
                    (0, e.jsx)(o.default, {
                      className: "text-text-accent hover:underline",
                      href: "/docs/mayhem-mode",
                      rel: "noopener noreferrer",
                      target: "_blank",
                      children: A("common.learn_more"),
                    }),
                  ],
                })),
            (E[24] = U),
            (E[25] = A),
            (E[26] = $))
          : ($ = E[26]),
        E[27] !== k || E[28] !== $
          ? ((R = (0, e.jsxs)("div", {
              className: "flex items-center gap-x-1 text-text-tertiary",
              children: [k, $],
            })),
            (E[27] = k),
            (E[28] = $),
            (E[29] = R))
          : (R = E[29]),
        E[30] === Symbol.for("react.memo_cache_sentinel")
          ? ((b = (0, e.jsx)(c.MayhemModeDialogEnabled, {})), (E[30] = b))
          : (b = E[30]),
        E[31] !== R || E[32] !== m
          ? ((_ = (0, e.jsxs)("div", {
              className: "flex flex-col gap-y-2",
              children: [m, R, b],
            })),
            (E[31] = R),
            (E[32] = m),
            (E[33] = _))
          : (_ = E[33]),
        _
      );
    },
    "G",
    0,
    function () {
      let t,
        a,
        i,
        n,
        u,
        c,
        l,
        w,
        f,
        g,
        m,
        y,
        T,
        k,
        $,
        R,
        b,
        _ = (0, r.c)(49),
        { t: E } = (0, s.f)(),
        {
          isMayhemEnabled: H,
          isMayhemManualMode: U,
          isMultiplayer: A,
          setIsMayhemManualMode: P,
          setIsMultiplayer: v,
        } = p(),
        S = (0, d.f)();
      if (!H) return null;
      let x = S && U && A,
        O = U && !x;
      (_[0] !== E
        ? ((t = E("mayhem_mode.creation.starting_mode_title")),
          (_[0] = E),
          (_[1] = t))
        : (t = _[1]),
        _[2] !== t
          ? ((a = (0, e.jsx)("p", {
              className: "text-xs font-semibold text-text-primary",
              children: t,
            })),
            (_[2] = t),
            (_[3] = a))
          : (a = _[3]));
      let q = `mt-2 grid gap-2 ${S ? "grid-cols-3" : "grid-cols-2"}`,
        j = !U;
      return (
        _[4] !== j ? ((i = h(j)), (_[4] = j), (_[5] = i)) : (i = _[5]),
        _[6] !== P ? ((n = () => P(!1)), (_[6] = P), (_[7] = n)) : (n = _[7]),
        _[8] !== E
          ? ((u = E("mayhem_mode.filters.auto")), (_[8] = E), (_[9] = u))
          : (u = _[9]),
        _[10] !== i || _[11] !== n || _[12] !== u
          ? ((c = (0, e.jsx)("button", {
              className: i,
              onClick: n,
              type: "button",
              children: u,
            })),
            (_[10] = i),
            (_[11] = n),
            (_[12] = u),
            (_[13] = c))
          : (c = _[13]),
        _[14] !== O ? ((l = h(O)), (_[14] = O), (_[15] = l)) : (l = _[15]),
        _[16] !== P
          ? ((w = () => P(!0)), (_[16] = P), (_[17] = w))
          : (w = _[17]),
        _[18] !== E
          ? ((f = E("mayhem_mode.filters.manual")), (_[18] = E), (_[19] = f))
          : (f = _[19]),
        _[20] !== f || _[21] !== l || _[22] !== w
          ? ((g = (0, e.jsx)("button", {
              className: l,
              onClick: w,
              type: "button",
              children: f,
            })),
            (_[20] = f),
            (_[21] = l),
            (_[22] = w),
            (_[23] = g))
          : (g = _[23]),
        _[24] !== x || _[25] !== v || _[26] !== S || _[27] !== E
          ? ((m = S
              ? (0, e.jsx)("button", {
                  className: h(x),
                  onClick: () => v(!0),
                  type: "button",
                  children: E("web.mayhem.mode_multiplayer"),
                })
              : null),
            (_[24] = x),
            (_[25] = v),
            (_[26] = S),
            (_[27] = E),
            (_[28] = m))
          : (m = _[28]),
        _[29] !== g || _[30] !== m || _[31] !== q || _[32] !== c
          ? ((y = (0, e.jsxs)("div", { className: q, children: [c, g, m] })),
            (_[29] = g),
            (_[30] = m),
            (_[31] = q),
            (_[32] = c),
            (_[33] = y))
          : (y = _[33]),
        _[34] !== U || _[35] !== x || _[36] !== E
          ? ((T = E(
              x
                ? "web.mayhem.mode_multiplayer_description"
                : U
                  ? "mayhem_mode.creation.starting_mode_manual_description"
                  : "mayhem_mode.creation.starting_mode_auto_description",
            )),
            (_[34] = U),
            (_[35] = x),
            (_[36] = E),
            (_[37] = T))
          : (T = _[37]),
        _[38] !== E
          ? ((k = E("common.learn_more")), (_[38] = E), (_[39] = k))
          : (k = _[39]),
        _[40] !== k
          ? (($ = (0, e.jsx)(o.default, {
              className: "text-text-accent hover:underline",
              href: "/docs/mayhem-mode",
              rel: "noopener noreferrer",
              target: "_blank",
              children: k,
            })),
            (_[40] = k),
            (_[41] = $))
          : ($ = _[41]),
        _[42] !== T || _[43] !== $
          ? ((R = (0, e.jsxs)("p", {
              className: "mt-2 text-xs text-text-secondary",
              children: [T, " ", $],
            })),
            (_[42] = T),
            (_[43] = $),
            (_[44] = R))
          : (R = _[44]),
        _[45] !== a || _[46] !== y || _[47] !== R
          ? ((b = (0, e.jsxs)("div", {
              className:
                "rounded-xl border border-border-secondary bg-bg-secondary p-3",
              children: [a, y, R],
            })),
            (_[45] = a),
            (_[46] = y),
            (_[47] = R),
            (_[48] = b))
          : (b = _[48]),
        b
      );
    },
    "i",
    0,
    p,
  ]);
};
