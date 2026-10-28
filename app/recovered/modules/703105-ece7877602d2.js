// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    n = e.i(116549),
    a = e.i(844510),
    s = e.i(51206),
    r = e.i(813792);
  function i(e) {
    let i,
      d,
      c = (0, l.c)(13),
      { label: o, testId: u, onClick: p, pressed: m, children: h } = e,
      x = (0, n.x)(),
      f = a.t[x],
      g = m ? "bg-bg-tertiary text-text-primary" : void 0;
    return (
      c[0] !== h ||
      c[1] !== x ||
      c[2] !== o ||
      c[3] !== p ||
      c[4] !== m ||
      c[5] !== f ||
      c[6] !== g ||
      c[7] !== u
        ? ((i = (0, t.jsx)(s._, {
            density: x,
            size: f,
            "aria-label": o,
            "aria-pressed": m,
            "data-testid": u,
            onClick: p,
            className: g,
            children: h,
          })),
          (c[0] = h),
          (c[1] = x),
          (c[2] = o),
          (c[3] = p),
          (c[4] = m),
          (c[5] = f),
          (c[6] = g),
          (c[7] = u),
          (c[8] = i))
        : (i = c[8]),
      c[9] !== x || c[10] !== o || c[11] !== i
        ? ((d = (0, t.jsx)(r.f, { content: o, density: x, children: i })),
          (c[9] = x),
          (c[10] = o),
          (c[11] = i),
          (c[12] = d))
        : (d = c[12]),
      d
    );
  }
  e.s(["f", 0, i], 703105);
  var d = e.i(745018),
    c = e.i(439587),
    o = e.i(322315),
    u = e.i(254010),
    p = e.i(365089),
    m = e.i(352386);
  e.i(12692);
  var h = e.i(398902),
    x = e.i(818724),
    f = e.i(441315),
    g = e.i(724423);
  function b(e) {
    let n,
      a = (0, l.c)(7),
      {
        density: s,
        checked: r,
        onToggle: i,
        leading: d,
        testId: c,
        children: o,
      } = e;
    return (
      a[0] !== r ||
      a[1] !== o ||
      a[2] !== s ||
      a[3] !== d ||
      a[4] !== i ||
      a[5] !== c
        ? ((n = (0, t.jsx)(f.p, {
            density: s,
            pressed: r,
            onClick: i,
            leading: d,
            "data-testid": c,
            children: o,
          })),
          (a[0] = r),
          (a[1] = o),
          (a[2] = s),
          (a[3] = d),
          (a[4] = i),
          (a[5] = c),
          (a[6] = n))
        : (n = a[6]),
      n
    );
  }
  function y(e) {
    let n,
      a,
      s = (0, l.c)(13),
      {
        density: r,
        value: i,
        onChange: d,
        placeholder: c,
        ariaLabel: o,
        id: u,
        invalid: p,
      } = e,
      m = "terminal" === r,
      h = m ? "text-xs leading-4" : "text-[13px] leading-[18px]";
    s[0] !== h
      ? ((n = (0, t.jsx)("span", { className: h, children: "$" })),
        (s[0] = h),
        (s[1] = n))
      : (n = s[1]);
    let x = m ? "h-7 px-2" : void 0,
      f = m ? "text-xs leading-4" : void 0;
    return (
      s[2] !== o ||
      s[3] !== r ||
      s[4] !== u ||
      s[5] !== p ||
      s[6] !== d ||
      s[7] !== c ||
      s[8] !== n ||
      s[9] !== x ||
      s[10] !== f ||
      s[11] !== i
        ? ((a = (0, t.jsx)("div", {
            className: "min-w-0 flex-1",
            children: (0, t.jsx)(g.N, {
              density: r,
              id: u,
              type: "text",
              inputMode: "decimal",
              value: i,
              onValueChange: d,
              placeholder: c,
              "aria-label": o,
              invalid: p,
              leading: n,
              className: x,
              inputClassName: f,
            }),
          })),
          (s[2] = o),
          (s[3] = r),
          (s[4] = u),
          (s[5] = p),
          (s[6] = d),
          (s[7] = c),
          (s[8] = n),
          (s[9] = x),
          (s[10] = f),
          (s[11] = i),
          (s[12] = a))
        : (a = s[12]),
      a
    );
  }
  var v = e.i(928529),
    w = e.i(828424),
    _ = e.i(146255),
    j = e.i(338319);
  let C = ({ scope: e, chains: t }) => (0, w.M)({ ...e, chains: t }),
    N = ({ controls: e, options: t }) =>
      e.includes("launchpads") && t.length > 1;
  function U(e) {
    let n,
      a,
      s = (0, l.c)(5),
      { option: r } = e;
    s[0] !== r ? ((n = (0, _._)(r)), (s[0] = r), (s[1] = n)) : (n = s[1]);
    let i = n,
      d = i.isTile ? "size-3.5 object-cover" : "size-2.5 object-contain";
    return (
      s[2] !== i.iconSrc || s[3] !== d
        ? ((a = (0, t.jsx)("span", {
            className:
              "flex size-3.5 items-center justify-center overflow-hidden rounded-full bg-bg-primary",
            children: (0, t.jsx)(v.default, {
              src: i.iconSrc,
              alt: "",
              width: 32,
              height: 32,
              className: d,
            }),
          })),
          (s[2] = i.iconSrc),
          (s[3] = d),
          (s[4] = a))
        : (a = s[4]),
      a
    );
  }
  function k(e) {
    let n,
      a,
      s,
      r,
      i,
      d,
      c,
      o,
      u,
      p = (0, l.c)(49),
      {
        scope: m,
        controls: x,
        density: f,
        labelClass: g,
        draft: y,
        setDraft: v,
      } = e,
      { t: _ } = (0, h.f)();
    if (
      p[0] !== x ||
      p[1] !== f ||
      p[2] !== y.chains ||
      p[3] !== y.launchpads ||
      p[4] !== g ||
      p[5] !== m ||
      p[6] !== v ||
      p[7] !== _
    ) {
      c = Symbol.for("react.early_return_sentinel");
      e: {
        let e,
          l,
          o,
          u,
          h,
          k,
          M,
          z = C({ scope: m, chains: y.chains });
        if (!N({ controls: x, options: z })) {
          c = null;
          break e;
        }
        p[15] !== y.launchpads
          ? ((e = (e) => y.launchpads.includes(e.id)),
            (p[15] = y.launchpads),
            (p[16] = e))
          : (e = p[16]);
        let S = z.some(e);
        p[17] !== v
          ? ((l = (e) =>
              v((t) => ({
                ...t,
                launchpads: t.launchpads.includes(e)
                  ? t.launchpads.filter((t) => t !== e)
                  : [...t.launchpads, e],
              }))),
            (p[17] = v),
            (p[18] = l))
          : (l = p[18]);
        let I = l;
        p[19] !== m || p[20] !== v
          ? ((o = () =>
              v((e) => ({
                ...e,
                launchpads: (0, w._)({
                  picks: e.launchpads,
                  options: C({ scope: m, chains: e.chains }),
                }),
              }))),
            (p[19] = m),
            (p[20] = v),
            (p[21] = o))
          : (o = p[21]);
        let K = o;
        ((r = "flex flex-col gap-1.5"),
          (i = "screeners-launchpads"),
          p[22] !== g
            ? ((u = (0, j.c)(g, "pb-1")), (p[22] = g), (p[23] = u))
            : (u = p[23]),
          p[24] !== _
            ? ((h = _("advanced_search.launchpads")), (p[24] = _), (p[25] = h))
            : (h = p[25]),
          p[26] !== u || p[27] !== h
            ? ((d = (0, t.jsx)("legend", { className: u, children: h })),
              (p[26] = u),
              (p[27] = h),
              (p[28] = d))
            : (d = p[28]),
          (n = "flex flex-wrap gap-1.5"));
        let E = !S;
        (p[29] !== _
          ? ((k = _("common.all")), (p[29] = _), (p[30] = k))
          : (k = p[30]),
          p[31] !== f || p[32] !== K || p[33] !== E || p[34] !== k
            ? ((a = (0, t.jsx)(b, {
                density: f,
                checked: E,
                onToggle: K,
                testId: "screeners-launchpad-all",
                children: k,
              })),
              (p[31] = f),
              (p[32] = K),
              (p[33] = E),
              (p[34] = k),
              (p[35] = a))
            : (a = p[35]),
          p[36] !== f || p[37] !== y.launchpads || p[38] !== I
            ? ((M = (e) =>
                (0, t.jsx)(
                  b,
                  {
                    density: f,
                    checked: y.launchpads.includes(e.id),
                    onToggle: () => I(e.id),
                    testId: `screeners-launchpad-${e.id}`,
                    leading: (0, t.jsx)(U, { option: e }),
                    children: e.label,
                  },
                  e.id,
                )),
              (p[36] = f),
              (p[37] = y.launchpads),
              (p[38] = I),
              (p[39] = M))
            : (M = p[39]),
          (s = z.map(M)));
      }
      ((p[0] = x),
        (p[1] = f),
        (p[2] = y.chains),
        (p[3] = y.launchpads),
        (p[4] = g),
        (p[5] = m),
        (p[6] = v),
        (p[7] = _),
        (p[8] = n),
        (p[9] = a),
        (p[10] = s),
        (p[11] = r),
        (p[12] = i),
        (p[13] = d),
        (p[14] = c));
    } else
      ((n = p[8]),
        (a = p[9]),
        (s = p[10]),
        (r = p[11]),
        (i = p[12]),
        (d = p[13]),
        (c = p[14]));
    return c !== Symbol.for("react.early_return_sentinel")
      ? c
      : (p[40] !== n || p[41] !== a || p[42] !== s
          ? ((o = (0, t.jsxs)("div", { className: n, children: [a, s] })),
            (p[40] = n),
            (p[41] = a),
            (p[42] = s),
            (p[43] = o))
          : (o = p[43]),
        p[44] !== r || p[45] !== i || p[46] !== d || p[47] !== o
          ? ((u = (0, t.jsxs)("fieldset", {
              className: r,
              "data-testid": i,
              children: [d, o],
            })),
            (p[44] = r),
            (p[45] = i),
            (p[46] = d),
            (p[47] = o),
            (p[48] = u))
          : (u = p[48]),
        u);
  }
  var M = e.i(289638),
    z = e.i(607122),
    S = e.i(634661),
    I = e.i(637172);
  e.i(267146);
  var K = e.i(540805),
    E = e.i(541710),
    T = e.i(261848),
    X = e.i(79402);
  let $ = (e) => e.split(/[\s,]+/).filter(Boolean),
    B = (e) => ({
      chains: e?.chains ?? [],
      launchpads: e?.launchpads ?? [],
      alertKinds: e?.alertKinds ?? [...X.E],
      minMcapUsd: e?.minMcapUsd?.toString() ?? "",
      maxMcapUsd: e?.maxMcapUsd?.toString() ?? "",
      excludeUsers: e?.excludeUsers?.join(", ") ?? "",
      side: e?.side ?? "any",
      minTradeUsd: e?.minTradeUsd?.toString() ?? "",
      minCostBasisUsd: String(e?.minCostBasisUsd ?? w.G.minCostBasisUsd),
      minCalloutMarketCapUsd: String(
        e?.minCalloutMarketCapUsd ?? w.G.minCalloutMarketCapUsd,
      ),
      maxCostBasisUsd: e?.maxCostBasisUsd?.toString() ?? "",
      maxCalloutMarketCapUsd: e?.maxCalloutMarketCapUsd?.toString() ?? "",
    }),
    Y = {
      terminal: "flex min-h-0 flex-col gap-3 px-3 pb-2 pt-3",
      comfortable: "flex min-h-0 flex-col gap-4 px-4 pb-3 pt-4",
    },
    L = {
      terminal: "-mx-3 flex min-h-0 flex-col gap-3 overflow-y-auto px-3",
      comfortable: "-mx-4 flex min-h-0 flex-col gap-4 overflow-y-auto px-4",
    },
    W = {
      terminal:
        "-mx-3 flex shrink-0 items-center justify-between gap-2 border-t border-solid border-border-secondary px-3 pt-2",
      comfortable:
        "-mx-4 flex shrink-0 items-center justify-between gap-2 border-t border-solid border-border-secondary px-4 pt-3",
    },
    R = `${g.E} ${g.m.invalid}`,
    A = (e, t) => {
      let l = e.trim(),
        n = Number(l);
      return "" === l || !Number.isFinite(n) || n < t;
    },
    F = (e, t) => {
      let l = e.trim();
      if ("" === l) return !1;
      let n = Number(l),
        a = Number(t.trim());
      return !Number.isFinite(n) || (Number.isFinite(a) && n < a);
    },
    P = ["any", "buy", "sell"];
  function O() {
    return [];
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let i,
          f,
          v,
          _,
          U,
          D,
          V,
          q,
          G,
          J,
          Q,
          Z,
          H,
          ee,
          et,
          el,
          en,
          ea,
          es,
          er,
          ei,
          ed,
          ec,
          eo,
          eu,
          ep,
          em,
          eh = (0, l.c)(88),
          { view: ex, board: ef, filters: eg, onApply: eb, accounts: ey } = e,
          ev = (0, w.p)({ view: ex, board: ef }),
          ew = (0, E.l)(),
          e_ = (0, u.k)(o.D.WEB_PERPS, !1)
            ? (0, w.Q)(ex)
            : (0, w.Q)(ex).filter(I.e),
          ej = (0, I.W)(e_, ew),
          eC = (0, w.q)(eg, e_),
          eN = { view: ex, board: ef, exposure: ew },
          eU = (0, w.J)(
            (({ scope: e, filters: t }) =>
              (0, w.x)(t, C({ scope: e, chains: t?.chains })))({
              scope: eN,
              filters: eC,
            }),
            ev,
          ),
          ek = (0, w.a)(eU),
          [eM, ez] = (0, m.useState)(!1),
          eS = (0, m.useRef)(null),
          [eI, eK] = (0, m.useState)(null),
          { t: eE } = (0, h.f)(),
          eT = (0, n.x)(),
          [eX, e$] = (0, m.useState)(() => B(eC)),
          eB = "terminal" === eT,
          eY = a.L[eT];
        if (!ev) return null;
        eh[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (e) => e$((t) => ({ ...t, ...e }))), (eh[0] = i))
          : (i = eh[0]);
        let eL = i,
          eW = (e) =>
            e$((t) =>
              (({ scope: e, draft: t, chains: l }) => ({
                ...t,
                chains: l,
                launchpads: (0, w.e)({
                  picks: t.launchpads,
                  before: C({ scope: e, chains: t.chains }),
                  after: C({ scope: e, chains: l }),
                }),
              }))({ scope: eN, draft: t, chains: e(t.chains) }),
            ),
          eR = $(eX.excludeUsers);
        eh[1] === Symbol.for("react.memo_cache_sentinel")
          ? ((f = (e) =>
              e$((t) => {
                let l = $(t.excludeUsers),
                  n = (0, T.k)(e, l)
                    ? l.filter((t) => !(0, T.p)(e, t))
                    : [...l, (0, T.D)(e)];
                return { ...t, excludeUsers: n.join(", ") };
              })),
            (eh[1] = f))
          : (f = eh[1]);
        let eA = f;
        eh[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((v = (e) =>
              e$((t) => ({
                ...t,
                alertKinds: t.alertKinds.includes(e)
                  ? t.alertKinds.filter((t) => t !== e)
                  : [...t.alertKinds, e],
              }))),
            (eh[2] = v))
          : (v = eh[2]);
        let eF = v;
        (eh[3] !== eE
          ? ((_ = eE("home.alerts_feed.filter_sheet.callout")),
            (eh[3] = eE),
            (eh[4] = _))
          : (_ = eh[4]),
          eh[5] !== eE
            ? ((U = eE("home.alerts_feed.filter_sheet.update")),
              (eh[5] = eE),
              (eh[6] = U))
            : (U = eh[6]),
          eh[7] !== eE
            ? ((D = eE("web.coin.trades_tab")), (eh[7] = eE), (eh[8] = D))
            : (D = eh[8]),
          eh[9] !== eE
            ? ((V = eE("web.screeners.alert_kind_cards")),
              (eh[9] = eE),
              (eh[10] = V))
            : (V = eh[10]),
          eh[11] !== _ || eh[12] !== U || eh[13] !== D || eh[14] !== V
            ? ((q = { callout: _, update: U, trade: D, collectible: V }),
              (eh[11] = _),
              (eh[12] = U),
              (eh[13] = D),
              (eh[14] = V),
              (eh[15] = q))
            : (q = eh[15]));
        let eP = q,
          eO = ev.includes("alertKinds"),
          eD = eO && 0 === eX.alertKinds.length,
          eV = ev.includes("latestFloors"),
          eq = eV && A(eX.minCostBasisUsd, w.T.minCostBasisUsd),
          eG = eV && A(eX.minCalloutMarketCapUsd, w.T.minCalloutMarketCapUsd),
          eJ = eV && F(eX.maxCostBasisUsd, eX.minCostBasisUsd),
          eQ = eV && F(eX.maxCalloutMarketCapUsd, eX.minCalloutMarketCapUsd),
          eZ = eD || eq || eG || eJ || eQ,
          eH = { any: "Any", buy: "Buys", sell: "Sells" },
          e0 = (0, w.g)(eU),
          e1 = ek ? "Filters (active)" : "Filters",
          e2 = ek
            ? (0, t.jsx)("span", {
                "aria-hidden": !0,
                "data-testid": "screeners-pane-filter-active-dot",
                className:
                  "absolute -right-0.5 -top-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-bg-accent px-0.5 text-[11px] font-medium leading-none text-text-on-accent",
                children: e0,
              })
            : null,
          e3 = () => {
            let e = (({ scope: e, controls: t, filters: l }) => {
              let n = (0, w.z)(l, t),
                a = (0, w._)({
                  picks: l?.launchpads,
                  options: C({
                    scope: e,
                    chains: t.includes("chains") ? void 0 : l?.chains,
                  }),
                });
              return a.length > 0 ? { ...n, launchpads: a } : n;
            })({ scope: eN, controls: ev, filters: eg });
            (eb(e), e$(B(e)), ez(!1));
          };
        eh[16] === Symbol.for("react.memo_cache_sentinel")
          ? ((G = (0, t.jsx)("span", {
              "aria-hidden": !0,
              className: "text-xs leading-4 text-text-quaternary",
              children: "–",
            })),
            (eh[16] = G))
          : (G = eh[16]);
        let e4 = G;
        eh[17] !== eE
          ? ((J = eE("web.ui.filters")), (eh[17] = eE), (eh[18] = J))
          : (J = eh[18]);
        let e5 = a.t[eT];
        (eh[19] === Symbol.for("react.memo_cache_sentinel")
          ? ((Q = (0, t.jsx)(d.w3, { "aria-hidden": !0 })), (eh[19] = Q))
          : (Q = eh[19]),
          eh[20] !== e2 || eh[21] !== eT || eh[22] !== e5 || eh[23] !== e1
            ? ((Z = (0, t.jsxs)(s._, {
                density: eT,
                size: e5,
                "aria-label": e1,
                className: "relative",
                children: [Q, e2],
              })),
              (eh[20] = e2),
              (eh[21] = eT),
              (eh[22] = e5),
              (eh[23] = e1),
              (eh[24] = Z))
            : (Z = eh[24]),
          eh[25] !== Z || eh[26] !== e1
            ? ((H = (0, t.jsx)(M.J, {
                ref: eS,
                "aria-label": e1,
                "data-testid": "screeners-pane-filter-toggle",
                render: Z,
              })),
              (eh[25] = Z),
              (eh[26] = e1),
              (eh[27] = H))
            : (H = eh[27]),
          eh[28] !== eT || eh[29] !== H || eh[30] !== J
            ? ((ee = (0, t.jsx)(r.f, { content: J, density: eT, children: H })),
              (eh[28] = eT),
              (eh[29] = H),
              (eh[30] = J),
              (eh[31] = ee))
            : (ee = eh[31]));
        let e6 = !eB && "px-4";
        eh[32] !== e6
          ? ((et = (0, j.c)("shrink-0", e6)), (eh[32] = e6), (eh[33] = et))
          : (et = eh[33]);
        let e8 = eB ? "size-3.5" : "size-4";
        (eh[34] !== e8
          ? ((el = (0, j.c)("text-text-tertiary", e8)),
            (eh[34] = e8),
            (eh[35] = el))
          : (el = eh[35]),
          eh[36] !== el
            ? ((en = (0, t.jsx)(d.w3, { "aria-hidden": !0, className: el })),
              (eh[36] = el),
              (eh[37] = en))
            : (en = eh[37]),
          eh[38] !== eE
            ? ((ea = eE("web.ui.filters")), (eh[38] = eE), (eh[39] = ea))
            : (ea = eh[39]),
          eh[40] !== en || eh[41] !== ea
            ? ((es = (0, t.jsxs)("span", {
                className: "flex items-center gap-2",
                children: [en, ea],
              })),
              (eh[40] = en),
              (eh[41] = ea),
              (eh[42] = es))
            : (es = eh[42]),
          eh[43] !== eP ||
          eh[44] !== eD ||
          eh[45] !== eT ||
          eh[46] !== eX.alertKinds ||
          eh[47] !== eX.minTradeUsd ||
          eh[48] !== eY ||
          eh[49] !== eO ||
          eh[50] !== eE
            ? ((er = eO
                ? (0, t.jsxs)("fieldset", {
                    className: "flex flex-col gap-1.5",
                    "data-testid": "screeners-alert-kinds",
                    children: [
                      (0, t.jsx)("legend", {
                        className: (0, j.c)(eY, "pb-1"),
                        children: eE("web.coin.alerts_filter_title"),
                      }),
                      (0, t.jsx)("div", {
                        className: "flex flex-wrap gap-1.5",
                        children: X.E.map((e) =>
                          (0, t.jsx)(
                            b,
                            {
                              density: eT,
                              checked: eX.alertKinds.includes(e),
                              onToggle: () => eF(e),
                              children: eP[e],
                            },
                            e,
                          ),
                        ),
                      }),
                      eD
                        ? (0, t.jsx)("p", {
                            className: R,
                            children: eE("web.screeners.alert_kinds_empty"),
                          })
                        : null,
                      eX.alertKinds.includes("trade")
                        ? (0, t.jsxs)("div", {
                            className: "flex flex-col gap-1.5 pt-1",
                            children: [
                              (0, t.jsx)("p", {
                                className: eY,
                                children: eE(
                                  "web.coin.alerts_filter_min_trade_size",
                                ),
                              }),
                              (0, t.jsx)(y, {
                                density: eT,
                                value: eX.minTradeUsd,
                                onChange: (e) => eL({ minTradeUsd: e }),
                                placeholder: "Min",
                                ariaLabel: eE(
                                  "web.coin.alerts_filter_min_trade_size",
                                ),
                              }),
                            ],
                          })
                        : null,
                    ],
                  })
                : null),
              (eh[43] = eP),
              (eh[44] = eD),
              (eh[45] = eT),
              (eh[46] = eX.alertKinds),
              (eh[47] = eX.minTradeUsd),
              (eh[48] = eY),
              (eh[49] = eO),
              (eh[50] = eE),
              (eh[51] = er))
            : (er = eh[51]),
          eh[52] !== ev ||
          eh[53] !== eT ||
          eh[54] !== eX.maxMcapUsd ||
          eh[55] !== eX.minMcapUsd ||
          eh[56] !== eY ||
          eh[57] !== eE
            ? ((ei = ev.includes("mcap")
                ? (0, t.jsxs)("div", {
                    className: "flex flex-col gap-1.5",
                    children: [
                      (0, t.jsx)("p", {
                        className: eY,
                        children: eE("web.screeners.market_cap_usd"),
                      }),
                      (0, t.jsxs)("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                          (0, t.jsx)(y, {
                            density: eT,
                            value: eX.minMcapUsd,
                            onChange: (e) => eL({ minMcapUsd: e }),
                            placeholder: "Min",
                            ariaLabel: eE("web.screeners.min_market_cap"),
                          }),
                          e4,
                          (0, t.jsx)(y, {
                            density: eT,
                            value: eX.maxMcapUsd,
                            onChange: (e) => eL({ maxMcapUsd: e }),
                            placeholder: "Max",
                            ariaLabel: eE("web.screeners.max_market_cap"),
                          }),
                        ],
                      }),
                    ],
                  })
                : null),
              (eh[52] = ev),
              (eh[53] = eT),
              (eh[54] = eX.maxMcapUsd),
              (eh[55] = eX.minMcapUsd),
              (eh[56] = eY),
              (eh[57] = eE),
              (eh[58] = ei))
            : (ei = eh[58]),
          eh[59] !== eQ ||
          eh[60] !== eG ||
          eh[61] !== eJ ||
          eh[62] !== eq ||
          eh[63] !== eT ||
          eh[64] !== eX.maxCalloutMarketCapUsd ||
          eh[65] !== eX.maxCostBasisUsd ||
          eh[66] !== eX.minCalloutMarketCapUsd ||
          eh[67] !== eX.minCostBasisUsd ||
          eh[68] !== eY ||
          eh[69] !== eV ||
          eh[70] !== eE ||
          eh[71] !== ex
            ? ((ed = eV
                ? (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsxs)("div", {
                        className: "flex flex-col gap-1.5",
                        children: [
                          (0, t.jsx)("p", {
                            className: eY,
                            children: eE("web.screeners.position_size_usd"),
                          }),
                          (0, t.jsxs)("div", {
                            className: "flex items-center gap-1.5",
                            children: [
                              (0, t.jsx)(y, {
                                density: eT,
                                id: `screeners-min-position-${ex}`,
                                value: eX.minCostBasisUsd,
                                onChange: (e) => eL({ minCostBasisUsd: e }),
                                placeholder: String(w.G.minCostBasisUsd),
                                ariaLabel: eE(
                                  "web.screeners.min_position_size",
                                ),
                                invalid: eq,
                              }),
                              e4,
                              (0, t.jsx)(y, {
                                density: eT,
                                value: eX.maxCostBasisUsd,
                                onChange: (e) => eL({ maxCostBasisUsd: e }),
                                placeholder: "Max",
                                ariaLabel: eE(
                                  "web.screeners.max_position_size",
                                ),
                                invalid: eJ,
                              }),
                            ],
                          }),
                          eq
                            ? (0, t.jsx)("p", {
                                role: "alert",
                                "data-testid": "screeners-floor-error-position",
                                className: R,
                                children: eE("web.screeners.min_value_error", {
                                  min_value: (0, K.l)(w.T.minCostBasisUsd),
                                }),
                              })
                            : eJ
                              ? (0, t.jsx)("p", {
                                  role: "alert",
                                  "data-testid":
                                    "screeners-ceiling-error-position",
                                  className: R,
                                  children: eE(
                                    "web.screeners.max_below_min_error",
                                  ),
                                })
                              : null,
                        ],
                      }),
                      (0, t.jsxs)("div", {
                        className: "flex flex-col gap-1.5",
                        children: [
                          (0, t.jsx)("p", {
                            className: eY,
                            children: eE(
                              "web.screeners.callout_market_cap_usd",
                            ),
                          }),
                          (0, t.jsxs)("div", {
                            className: "flex items-center gap-1.5",
                            children: [
                              (0, t.jsx)(y, {
                                density: eT,
                                id: `screeners-min-callout-mcap-${ex}`,
                                value: eX.minCalloutMarketCapUsd,
                                onChange: (e) =>
                                  eL({ minCalloutMarketCapUsd: e }),
                                placeholder: String(w.G.minCalloutMarketCapUsd),
                                ariaLabel: eE(
                                  "web.screeners.min_callout_market_cap",
                                ),
                                invalid: eG,
                              }),
                              e4,
                              (0, t.jsx)(y, {
                                density: eT,
                                value: eX.maxCalloutMarketCapUsd,
                                onChange: (e) =>
                                  eL({ maxCalloutMarketCapUsd: e }),
                                placeholder: "Max",
                                ariaLabel: eE(
                                  "web.screeners.max_callout_market_cap",
                                ),
                                invalid: eQ,
                              }),
                            ],
                          }),
                          eG
                            ? (0, t.jsx)("p", {
                                role: "alert",
                                "data-testid": "screeners-floor-error-mcap",
                                className: R,
                                children: eE("web.screeners.min_value_error", {
                                  min_value: (0, K.l)(
                                    w.T.minCalloutMarketCapUsd,
                                  ),
                                }),
                              })
                            : eQ
                              ? (0, t.jsx)("p", {
                                  role: "alert",
                                  "data-testid": "screeners-ceiling-error-mcap",
                                  className: R,
                                  children: eE(
                                    "web.screeners.max_below_min_error",
                                  ),
                                })
                              : null,
                        ],
                      }),
                    ],
                  })
                : null),
              (eh[59] = eQ),
              (eh[60] = eG),
              (eh[61] = eJ),
              (eh[62] = eq),
              (eh[63] = eT),
              (eh[64] = eX.maxCalloutMarketCapUsd),
              (eh[65] = eX.maxCostBasisUsd),
              (eh[66] = eX.minCalloutMarketCapUsd),
              (eh[67] = eX.minCostBasisUsd),
              (eh[68] = eY),
              (eh[69] = eV),
              (eh[70] = eE),
              (eh[71] = ex),
              (eh[72] = ed))
            : (ed = eh[72]));
        let e7 = W[eT];
        (eh[73] !== eE
          ? ((ec = eE("common.clear")), (eh[73] = eE), (eh[74] = ec))
          : (ec = eh[74]),
          eh[75] !== e3 || eh[76] !== ec
            ? ((eo = (0, t.jsx)(c.K, {
                type: "button",
                variant: "ghost",
                size: 32,
                onClick: e3,
                "data-testid": "screeners-pane-filter-clear",
                children: ec,
              })),
              (eh[75] = e3),
              (eh[76] = ec),
              (eh[77] = eo))
            : (eo = eh[77]));
        let e9 = eB ? 32 : 36;
        return (
          eh[78] !== eE
            ? ((eu = eE("web.common.apply")), (eh[78] = eE), (eh[79] = eu))
            : (eu = eh[79]),
          eh[80] !== eZ || eh[81] !== e9 || eh[82] !== eu
            ? ((ep = (0, t.jsx)(c.K, {
                type: "submit",
                variant: "primary",
                size: e9,
                isDisabled: eZ,
                "data-testid": "screeners-pane-filter-apply",
                children: eu,
              })),
              (eh[80] = eZ),
              (eh[81] = e9),
              (eh[82] = eu),
              (eh[83] = ep))
            : (ep = eh[83]),
          eh[84] !== e7 || eh[85] !== eo || eh[86] !== ep
            ? ((em = (0, t.jsxs)("div", { className: e7, children: [eo, ep] })),
              (eh[84] = e7),
              (eh[85] = eo),
              (eh[86] = ep),
              (eh[87] = em))
            : (em = eh[87]),
          (0, t.jsxs)(M.V, {
            open: eM,
            onOpenChange: (e) => {
              (ez(e),
                e &&
                  (e$(B(eC)),
                  eK(eS.current?.closest("[data-popover-bounds]") ?? null)));
            },
            children: [
              ee,
              (0, t.jsxs)(M.T, {
                align: "end",
                sideOffset: 6,
                density: eT,
                collisionBoundary: eI ?? void 0,
                collisionPadding: eI ? 6 : 12,
                className:
                  "flex max-h-[var(--available-height)] w-72 flex-col overflow-hidden p-0",
                "data-testid": "screeners-pane-filter-popover",
                children: [
                  (0, t.jsx)(S._, {
                    density: eT,
                    titleAs: "span",
                    className: et,
                    title: es,
                    aside: ek ? e0 : void 0,
                  }),
                  (0, t.jsxs)("form", {
                    className: Y[eT],
                    onSubmit: (e) => {
                      if ((e.preventDefault(), !eZ)) {
                        let e;
                        (eb(
                          ((e = (({ scope: e, controls: t, draft: l }) => {
                            let n = C({ scope: e, chains: l.chains });
                            return N({ controls: t, options: n }) &&
                              n.every((e) => l.launchpads.includes(e.id))
                              ? {
                                  ...l,
                                  launchpads: (0, w._)({
                                    picks: l.launchpads,
                                    options: n,
                                  }),
                                }
                              : l;
                          })({ scope: eN, controls: ev, draft: eX })),
                          (0, w.V)(
                            {
                              chains: e.chains,
                              launchpads: e.launchpads,
                              alertKinds: e.alertKinds,
                              minMcapUsd: Number(e.minMcapUsd),
                              maxMcapUsd: Number(e.maxMcapUsd),
                              excludeUsers: e.excludeUsers.split(/[\s,]+/),
                              side: "any" === e.side ? void 0 : e.side,
                              minTradeUsd: Number(e.minTradeUsd),
                              minCostBasisUsd: Number(e.minCostBasisUsd),
                              minCalloutMarketCapUsd: Number(
                                e.minCalloutMarketCapUsd,
                              ),
                              maxCostBasisUsd: Number(e.maxCostBasisUsd),
                              maxCalloutMarketCapUsd: Number(
                                e.maxCalloutMarketCapUsd,
                              ),
                            },
                            ew,
                            e_,
                          )),
                        ),
                          ez(!1));
                      }
                    },
                    children: [
                      (0, t.jsxs)("div", {
                        className: L[eT],
                        "data-testid": "screeners-pane-filter-fields",
                        children: [
                          ev.includes("chains")
                            ? (0, t.jsxs)("fieldset", {
                                className: "flex flex-col gap-1.5",
                                children: [
                                  (0, t.jsx)("legend", {
                                    className: (0, j.c)(eY, "pb-1"),
                                    children: eE("web.screeners.chains"),
                                  }),
                                  (0, t.jsxs)("div", {
                                    className: "flex flex-wrap gap-1.5",
                                    children: [
                                      (0, t.jsx)(b, {
                                        density: eT,
                                        checked: 0 === eX.chains.length,
                                        onToggle: () => eW(O),
                                        testId: "screeners-chain-all",
                                        children: eE("common.all"),
                                      }),
                                      ej.map((e) =>
                                        (0, t.jsx)(
                                          b,
                                          {
                                            density: eT,
                                            checked: eX.chains.includes(e),
                                            onToggle: () =>
                                              eW((t) =>
                                                t.includes(e)
                                                  ? t.filter((t) => t !== e)
                                                  : [...t, e],
                                              ),
                                            testId: `screeners-chain-${e}`,
                                            leading: (0, t.jsx)(x.h, {
                                              chain: e,
                                              sizeClassName: "size-3.5",
                                              glyphClassName: "size-2.5",
                                            }),
                                            children: I.z[e],
                                          },
                                          e,
                                        ),
                                      ),
                                    ],
                                  }),
                                ],
                              })
                            : null,
                          (0, t.jsx)(k, {
                            scope: eN,
                            controls: ev,
                            density: eT,
                            labelClass: eY,
                            draft: eX,
                            setDraft: e$,
                          }),
                          er,
                          ei,
                          ed,
                          ev.includes("excludeUsers")
                            ? (0, t.jsxs)("div", {
                                className: "flex flex-col gap-1.5",
                                children: [
                                  (0, t.jsx)("label", {
                                    htmlFor: `screeners-exclude-users-${ex}`,
                                    className: eY,
                                    children: eE(
                                      "web.screeners.exclude_accounts",
                                    ),
                                  }),
                                  (0, t.jsx)(g.N, {
                                    density: eT,
                                    id: `screeners-exclude-users-${ex}`,
                                    type: "text",
                                    value: eX.excludeUsers,
                                    onValueChange: (e) =>
                                      eL({ excludeUsers: e }),
                                    placeholder: eE(
                                      "web.screeners.exclude_placeholder",
                                    ),
                                    className: eB ? "h-7 px-2" : void 0,
                                    inputClassName: eB
                                      ? "text-xs leading-4"
                                      : void 0,
                                  }),
                                  ey?.length
                                    ? (0, t.jsxs)("fieldset", {
                                        className: "flex flex-col gap-1.5 pt-1",
                                        "data-testid":
                                          "screeners-feed-accounts",
                                        children: [
                                          (0, t.jsx)("legend", {
                                            className: (0, j.c)(g.E, "pb-1"),
                                            children: eE(
                                              "web.screeners.feed_accounts_hint",
                                            ),
                                          }),
                                          (0, t.jsx)("div", {
                                            className: "flex flex-wrap gap-1.5",
                                            children: ey.map((e) =>
                                              (0, t.jsx)(
                                                b,
                                                {
                                                  density: eT,
                                                  checked: (0, T.k)(e, eR),
                                                  onToggle: () => eA(e),
                                                  testId: `screeners-feed-account-${e.key}`,
                                                  children:
                                                    e.name ??
                                                    (e.address
                                                      ? (0, p.J)(e.address)
                                                      : e.key),
                                                },
                                                e.key,
                                              ),
                                            ),
                                          }),
                                        ],
                                      })
                                    : null,
                                ],
                              })
                            : null,
                          ev.includes("trade")
                            ? (0, t.jsxs)(t.Fragment, {
                                children: [
                                  (0, t.jsxs)("fieldset", {
                                    className: "flex flex-col gap-1.5",
                                    children: [
                                      (0, t.jsx)("legend", {
                                        className: (0, j.c)(eY, "pb-1"),
                                        children: eE("web.screeners.side"),
                                      }),
                                      (0, t.jsx)(z.X, {
                                        density: eT,
                                        "aria-label": eE("web.screeners.side"),
                                        value: eX.side,
                                        onValueChange: (e) => eL({ side: e }),
                                        options: P.map((e) => ({
                                          value: e,
                                          label: eH[e],
                                        })),
                                        fullWidth: !0,
                                      }),
                                    ],
                                  }),
                                  (0, t.jsxs)("div", {
                                    className: "flex flex-col gap-1.5",
                                    children: [
                                      (0, t.jsx)("label", {
                                        htmlFor: `screeners-min-trade-${ex}`,
                                        className: eY,
                                        children: eE(
                                          "web.screeners.min_trade_size",
                                        ),
                                      }),
                                      (0, t.jsx)(y, {
                                        density: eT,
                                        id: `screeners-min-trade-${ex}`,
                                        value: eX.minTradeUsd,
                                        onChange: (e) => eL({ minTradeUsd: e }),
                                        placeholder: eE(
                                          "web.screeners.min_trade_placeholder",
                                        ),
                                        ariaLabel: eE(
                                          "web.screeners.min_trade_size",
                                        ),
                                      }),
                                    ],
                                  }),
                                ],
                              })
                            : null,
                        ],
                      }),
                      em,
                    ],
                  }),
                ],
              }),
            ],
          })
        );
      },
    ],
    461201,
  );
  var D = e.i(117330),
    V = e.i(827111),
    q = e.i(791898);
  e.s(
    [
      "f",
      0,
      function (e) {
        let s,
          r,
          d,
          c,
          o,
          u,
          p,
          m = (0, l.c)(29),
          { pane: x, onPick: f, layout: g, testIdPrefix: b } = e,
          y = void 0 === g ? "adaptive" : g,
          v = void 0 === b ? "screeners-pane" : b,
          { t: w } = (0, h.f)(),
          _ = (0, n.x)(),
          j = (0, V.f)();
        if (
          m[0] !== j ||
          m[1] !== _ ||
          m[2] !== y ||
          m[3] !== f ||
          m[4] !== x.pins ||
          m[5] !== x.view ||
          m[6] !== w ||
          m[7] !== v
        ) {
          u = Symbol.for("react.early_return_sentinel");
          e: {
            let e, l;
            m[14] !== j || m[15] !== x.view
              ? ((e = (e) => e === x.view || j.includes(e)),
                (m[14] = j),
                (m[15] = x.view),
                (m[16] = e))
              : (e = m[16]);
            let n = (x.pins ?? []).filter(e);
            if (0 === n.length) {
              u = null;
              break e;
            }
            ((s = "group"),
              m[17] !== w
                ? ((r = w("web.screeners.pinned_views_a11y")),
                  (m[17] = w),
                  (m[18] = r))
                : (r = m[18]),
              (d = `${v}-pins`),
              (c = "rail" === y ? a.E : a.X[_]),
              m[19] !== f || m[20] !== x.view || m[21] !== v
                ? ((l = (e) => {
                    let l = D.Y[e]?.icon;
                    return (0, t.jsx)(
                      i,
                      {
                        label: q.J[e].label,
                        testId: `${v}-pin-${e}`,
                        pressed: e === x.view,
                        onClick: () => f(e),
                        children: l
                          ? (0, t.jsx)(l, { "aria-hidden": !0 })
                          : null,
                      },
                      e,
                    );
                  }),
                  (m[19] = f),
                  (m[20] = x.view),
                  (m[21] = v),
                  (m[22] = l))
                : (l = m[22]),
              (o = n.map(l)));
          }
          ((m[0] = j),
            (m[1] = _),
            (m[2] = y),
            (m[3] = f),
            (m[4] = x.pins),
            (m[5] = x.view),
            (m[6] = w),
            (m[7] = v),
            (m[8] = s),
            (m[9] = r),
            (m[10] = d),
            (m[11] = c),
            (m[12] = o),
            (m[13] = u));
        } else
          ((s = m[8]),
            (r = m[9]),
            (d = m[10]),
            (c = m[11]),
            (o = m[12]),
            (u = m[13]));
        return u !== Symbol.for("react.early_return_sentinel")
          ? u
          : (m[23] !== s ||
            m[24] !== r ||
            m[25] !== d ||
            m[26] !== c ||
            m[27] !== o
              ? ((p = (0, t.jsx)("div", {
                  role: s,
                  "aria-label": r,
                  "data-testid": d,
                  className: c,
                  children: o,
                })),
                (m[23] = s),
                (m[24] = r),
                (m[25] = d),
                (m[26] = c),
                (m[27] = o),
                (m[28] = p))
              : (p = m[28]),
            p);
      },
    ],
    354776,
  );
};
