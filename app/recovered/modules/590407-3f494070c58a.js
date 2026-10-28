// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  let t, r;
  var a = e.i(732486),
    s = e.i(445242);
  e.i(12692);
  var l = e.i(398902),
    n = e.i(179537),
    i = e.i(352386),
    d = e.i(42413),
    o = e.i(910976),
    c = e.i(584698),
    u = e.i(322315),
    m = e.i(254010),
    p = e.i(574472),
    x = e.i(364468),
    b = e.i(576766),
    h = e.i(609252),
    f = e.i(303599),
    g = e.i(662986),
    y = e.i(605587);
  function w(e) {
    return !(0, g.o)(e);
  }
  function j(e) {
    return e.coinMint;
  }
  function v(e) {
    return e.userId;
  }
  function N() {
    let e,
      t,
      r,
      g,
      N,
      z,
      I,
      U,
      A,
      S,
      C,
      P,
      q,
      F,
      L = (0, s.c)(48),
      { t: M } = (0, l.f)(),
      [$, E] = (0, i.useState)("daily"),
      [R, T] = (0, i.useState)(20);
    L[0] !== $ || L[1] !== R
      ? ((e = { period: $, visibleCount: R }),
        (L[0] = $),
        (L[1] = R),
        (L[2] = e))
      : (e = L[2]);
    let {
      address: O,
      isLoggedIn: D,
      feed: K,
      visibleCallouts: Z,
      eligibleCallouts: B,
      hasMore: Q,
      coinByMint: V,
      userByAddress: W,
      viewerFollowing: J,
    } = ((e) => {
      let t,
        r,
        a,
        l,
        n,
        i,
        d,
        o,
        c,
        g,
        N,
        _ = (0, s.c)(34),
        { period: k, visibleCount: z } = e,
        { address: I } = (0, p.F)(),
        U = !!I,
        A = (0, f.o)();
      _[0] !== U || _[1] !== k
        ? ((t = { period: k, includeFollowedHolders: U }),
          (_[0] = U),
          (_[1] = k),
          (_[2] = t))
        : (t = _[2]);
      let S = (0, x.y)(t),
        C = (0, m.k)(u.D.WEB_PERPS, !1);
      _[3] !== S.callouts || _[4] !== C
        ? ((r = C ? S.callouts : S.callouts.filter(w)),
          (_[3] = S.callouts),
          (_[4] = C),
          (_[5] = r))
        : (r = _[5]);
      let P = r;
      _[6] !== P || _[7] !== z
        ? ((a = P.slice(0, z)), (_[6] = P), (_[7] = z), (_[8] = a))
        : (a = _[8]);
      let q = a;
      _[9] !== q
        ? ((l = Array.from(new Set(q.map(j)))), (_[9] = q), (_[10] = l))
        : (l = _[10]);
      let F = l;
      _[11] !== q
        ? ((n = Array.from(new Set(q.map(v)))), (_[11] = q), (_[12] = n))
        : (n = _[12]);
      let L = n,
        M = 0 === F.length;
      _[13] !== F || _[14] !== M
        ? ((i = { mints: F, disabled: M }),
          (_[13] = F),
          (_[14] = M),
          (_[15] = i))
        : (i = _[15]);
      let { coins: $ } = (0, h.f)(i);
      if (_[16] !== $) {
        for (let e of ((d = new Map()), $))
          e?.mint && d.set((0, y.c)(e.mint), e);
        ((_[16] = $), (_[17] = d));
      } else d = _[17];
      let E = d;
      _[18] !== L
        ? ((o = { userAddresses: L }), (_[18] = L), (_[19] = o))
        : (o = _[19]);
      let { data: R } = (0, b.f)(o);
      _[20] !== R
        ? ((c = void 0 === R ? [] : R), (_[20] = R), (_[21] = c))
        : (c = _[21]);
      let T = c;
      if (_[22] !== T) {
        for (let e of ((g = new Map()), T)) e?.address && g.set(e.address, e);
        ((_[22] = T), (_[23] = g));
      } else g = _[23];
      let O = g,
        D = z < P.length;
      return (
        _[24] !== I ||
        _[25] !== E ||
        _[26] !== P ||
        _[27] !== S ||
        _[28] !== U ||
        _[29] !== D ||
        _[30] !== O ||
        _[31] !== A ||
        _[32] !== q
          ? ((N = {
              address: I,
              isLoggedIn: U,
              feed: S,
              visibleCallouts: q,
              eligibleCallouts: P,
              hasMore: D,
              coinByMint: E,
              userByAddress: O,
              viewerFollowing: A,
            }),
            (_[24] = I),
            (_[25] = E),
            (_[26] = P),
            (_[27] = S),
            (_[28] = U),
            (_[29] = D),
            (_[30] = O),
            (_[31] = A),
            (_[32] = q),
            (_[33] = N))
          : (N = _[33]),
        N
      );
    })(e);
    (L[3] !== M
      ? ((t = M("web.leaderboard.period_1d")), (L[3] = M), (L[4] = t))
      : (t = L[4]),
      L[5] !== t
        ? ((r = { value: "daily", label: t }), (L[5] = t), (L[6] = r))
        : (r = L[6]),
      L[7] !== M
        ? ((g = M("web.leaderboard.period_1w")), (L[7] = M), (L[8] = g))
        : (g = L[8]),
      L[9] !== g
        ? ((N = { value: "weekly", label: g }), (L[9] = g), (L[10] = N))
        : (N = L[10]),
      L[11] !== r || L[12] !== N
        ? ((z = [r, N]), (L[11] = r), (L[12] = N), (L[13] = z))
        : (z = L[13]));
    let G = z;
    L[14] !== $
      ? ((I = (e) => {
          e !== $ && (E(e), T(20));
        }),
        (L[14] = $),
        (L[15] = I))
      : (I = L[15]);
    let H = I,
      X = K.isLoadingHistory,
      Y = null !== K.error,
      ee = !X && !Y && 0 === B.length,
      et = !X && !Y && B.length > 0;
    return (
      L[16] !== M
        ? ((U = M("web.leaderboard.time_window")), (L[16] = M), (L[17] = U))
        : (U = L[17]),
      L[18] !== H || L[19] !== $ || L[20] !== G || L[21] !== U
        ? ((A = (0, a.jsx)("div", {
            className: "flex items-center gap-2 pb-4",
            children: (0, a.jsx)(c.f, {
              options: G,
              value: $,
              onChange: H,
              ariaLabel: U,
            }),
          })),
          (L[18] = H),
          (L[19] = $),
          (L[20] = G),
          (L[21] = U),
          (L[22] = A))
        : (A = L[22]),
      L[23] !== X
        ? ((S = X ? (0, a.jsx)(k, {}) : null), (L[23] = X), (L[24] = S))
        : (S = L[24]),
      L[25] !== K.refetch || L[26] !== Y || L[27] !== M
        ? ((C = Y
            ? (0, a.jsx)(n.C, {
                message: M("web.feed.error_top"),
                onRetry: K.refetch,
              })
            : null),
          (L[25] = K.refetch),
          (L[26] = Y),
          (L[27] = M),
          (L[28] = C))
        : (C = L[28]),
      L[29] !== ee || L[30] !== M
        ? ((P = ee
            ? (0, a.jsx)(n.D, {
                title: M("kolscan.top_charts.top_callouts_empty_title"),
                description: M(
                  "kolscan.top_charts.top_callouts_empty_subtitle",
                ),
              })
            : null),
          (L[29] = ee),
          (L[30] = M),
          (L[31] = P))
        : (P = L[31]),
      L[32] !== O ||
      L[33] !== V ||
      L[34] !== Q ||
      L[35] !== D ||
      L[36] !== et ||
      L[37] !== M ||
      L[38] !== W ||
      L[39] !== J ||
      L[40] !== Z
        ? ((q = et
            ? (0, a.jsxs)(n.B, {
                ariaLabel: M("web.feed.list_top"),
                children: [
                  (0, a.jsx)("ul", {
                    "aria-label": M("web.feed.list_top"),
                    className: "flex flex-col",
                    children: Z.map((e, t) =>
                      (0, a.jsx)(
                        "li",
                        {
                          "data-testid": "best-callouts-row",
                          children: (0, a.jsx)(o.f, {
                            entry: e,
                            coin: V.get((0, y.c)(e.coinMint)),
                            user: W.get(e.userId),
                            position: t,
                            viewerAddress: O,
                            isLoggedIn: D,
                            viewerFollowing: J,
                            divider: "hairline",
                            className: "px-4",
                          }),
                        },
                        e.key,
                      ),
                    ),
                  }),
                  Q
                    ? (0, a.jsx)("div", {
                        className: "border-t border-border-secondary p-2",
                        children: (0, a.jsx)(d.f, {
                          hasNextPage: !0,
                          isFetchingNextPage: !1,
                          onFetchNextPage: () => T(_),
                          label: M("web.feed.load_n_more", { count: 20 }),
                        }),
                      })
                    : null,
                ],
              })
            : null),
          (L[32] = O),
          (L[33] = V),
          (L[34] = Q),
          (L[35] = D),
          (L[36] = et),
          (L[37] = M),
          (L[38] = W),
          (L[39] = J),
          (L[40] = Z),
          (L[41] = q))
        : (q = L[41]),
      L[42] !== C || L[43] !== P || L[44] !== q || L[45] !== A || L[46] !== S
        ? ((F = (0, a.jsxs)("div", {
            className: "flex flex-col pt-3",
            "data-testid": "best-callouts-board",
            children: [A, S, C, P, q],
          })),
          (L[42] = C),
          (L[43] = P),
          (L[44] = q),
          (L[45] = A),
          (L[46] = S),
          (L[47] = F))
        : (F = L[47]),
      F
    );
  }
  function _(e) {
    return e + 20;
  }
  let k = () => {
    let e,
      t = (0, s.c)(1);
    return (
      t[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, a.jsx)("div", {
            "aria-hidden": !0,
            "data-testid": "best-callouts-skeleton",
            className:
              "overflow-hidden rounded-3xl border border-border-tertiary",
            children: Array.from({ length: 5 }).map(z),
          })),
          (t[0] = e))
        : (e = t[0]),
      e
    );
  };
  function z(e, t) {
    return (0, a.jsxs)(
      "div",
      {
        className:
          "flex flex-col gap-1.5 border-t border-border-secondary px-4 py-3 first:border-t-0",
        children: [
          (0, a.jsxs)("div", {
            className: "flex items-center gap-3",
            children: [
              (0, a.jsx)("div", {
                className: "size-9 animate-pulse rounded-full bg-bg-quaternary",
              }),
              (0, a.jsxs)("div", {
                className: "flex flex-col gap-1.5",
                children: [
                  (0, a.jsx)("div", {
                    className:
                      "h-3.5 w-28 animate-pulse rounded bg-bg-quaternary",
                  }),
                  (0, a.jsx)("div", {
                    className: "h-3 w-48 animate-pulse rounded bg-bg-tertiary",
                  }),
                ],
              }),
            ],
          }),
          (0, a.jsx)("div", {
            className: "ml-12 h-[60px] animate-pulse rounded-xl bg-bg-tertiary",
          }),
        ],
      },
      t,
    );
  }
  var I = e.i(465085),
    U = e.i(983737),
    A = e.i(338319);
  function S(e) {
    let t,
      r,
      n,
      i = (0, s.c)(14),
      { tabs: d, activeTab: o, onChange: c } = e,
      { t: u } = (0, l.f)(),
      m = (0, U.f)() ?? !1;
    if (
      (i[0] !== u
        ? ((t = u("web.leaderboard.tabs")), (i[0] = u), (i[1] = t))
        : (t = i[1]),
      i[2] !== o || i[3] !== c || i[4] !== m || i[5] !== d)
    ) {
      let e;
      (i[7] !== o || i[8] !== c || i[9] !== m
        ? ((e = (e) => {
            let t = e.value === o;
            return (0, a.jsxs)(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": t,
                onClick: () => {
                  t || c(e.value);
                },
                className: (0, A.c)(
                  "relative flex h-full shrink-0 items-center whitespace-nowrap text-sm font-semibold transition-colors",
                  t
                    ? "text-text-primary"
                    : "text-text-tertiary hover:text-text-primary",
                ),
                children: [
                  e.label,
                  t
                    ? (0, a.jsx)(I.f.span, {
                        "aria-hidden": !0,
                        layoutId: "leaderboard-top-tabs-underline",
                        transition: m
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 700, damping: 45 },
                        className:
                          "absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-text-primary",
                      })
                    : null,
                ],
              },
              e.value,
            );
          }),
          (i[7] = o),
          (i[8] = c),
          (i[9] = m),
          (i[10] = e))
        : (e = i[10]),
        (r = d.map(e)),
        (i[2] = o),
        (i[3] = c),
        (i[4] = m),
        (i[5] = d),
        (i[6] = r));
    } else r = i[6];
    return (
      i[11] !== t || i[12] !== r
        ? ((n = (0, a.jsx)("div", {
            role: "tablist",
            "aria-label": t,
            className:
              "flex h-11 items-center gap-5 overflow-x-auto border-b border-border-secondary [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            children: r,
          })),
          (i[11] = t),
          (i[12] = r),
          (i[13] = n))
        : (n = i[13]),
      n
    );
  }
  var C = e.i(146695),
    P = e.i(365089),
    q = e.i(745018),
    F = e.i(182119);
  let L = (e) => {
    let t,
      r,
      l,
      n = (0, s.c)(7),
      { icon: i, text: d } = e;
    return (
      n[0] !== i
        ? ((t = (0, a.jsx)(i, {
            "aria-hidden": !0,
            className: "mt-0.5 size-5 shrink-0 text-text-secondary",
          })),
          (n[0] = i),
          (n[1] = t))
        : (t = n[1]),
      n[2] !== d
        ? ((r = (0, a.jsx)("span", {
            className: "min-w-0 flex-1 text-sm text-text-secondary",
            children: d,
          })),
          (n[2] = d),
          (n[3] = r))
        : (r = n[3]),
      n[4] !== t || n[5] !== r
        ? ((l = (0, a.jsxs)("li", {
            className: "flex items-start gap-3",
            children: [t, r],
          })),
          (n[4] = t),
          (n[5] = r),
          (n[6] = l))
        : (l = n[6]),
      l
    );
  };
  function M(e) {
    let t,
      r,
      n,
      i,
      d,
      o,
      c,
      u,
      m,
      p,
      x,
      b,
      h,
      f = (0, s.c)(32),
      { open: g, onOpenChange: y } = e,
      { t: w } = (0, l.f)();
    return (
      f[0] !== w
        ? ((t = w("web.leaderboard.callout_info_title")),
          (f[0] = w),
          (f[1] = t))
        : (t = f[1]),
      f[2] !== t
        ? ((r = (0, a.jsx)(F.F, {
            className: "text-base font-semibold",
            children: t,
          })),
          (f[2] = t),
          (f[3] = r))
        : (r = f[3]),
      f[4] !== w
        ? ((n = w("web.leaderboard.callout_info_body")), (f[4] = w), (f[5] = n))
        : (n = f[5]),
      f[6] !== n
        ? ((i = (0, a.jsx)(F.C, { className: "sr-only", children: n })),
          (f[6] = n),
          (f[7] = i))
        : (i = f[7]),
      f[8] !== w
        ? ((d = w("web.leaderboard.callout_info_body")), (f[8] = w), (f[9] = d))
        : (d = f[9]),
      f[10] !== d
        ? ((o = (0, a.jsx)(L, { icon: q.EX, text: d })),
          (f[10] = d),
          (f[11] = o))
        : (o = f[11]),
      f[12] !== w
        ? ((c = w("web.leaderboard.callout_info_eligibility")),
          (f[12] = w),
          (f[13] = c))
        : (c = f[13]),
      f[14] !== c
        ? ((u = (0, a.jsx)(L, { icon: q.zN, text: c })),
          (f[14] = c),
          (f[15] = u))
        : (u = f[15]),
      f[16] !== w
        ? ((m = w("web.leaderboard.callout_info_rewards")),
          (f[16] = w),
          (f[17] = m))
        : (m = f[17]),
      f[18] !== m
        ? ((p = (0, a.jsx)(L, { icon: q.Jd, text: m })),
          (f[18] = m),
          (f[19] = p))
        : (p = f[19]),
      f[20] !== p || f[21] !== o || f[22] !== u
        ? ((x = (0, a.jsxs)("ul", {
            className: "flex flex-col gap-4",
            children: [o, u, p],
          })),
          (f[20] = p),
          (f[21] = o),
          (f[22] = u),
          (f[23] = x))
        : (x = f[23]),
      f[24] !== x || f[25] !== r || f[26] !== i
        ? ((b = (0, a.jsxs)(F.d, {
            className:
              "max-w-sm gap-4 rounded-2xl border border-border-secondary bg-bg-primary p-5 text-text-primary",
            "data-testid": "callout-info-dialog",
            children: [r, i, x],
          })),
          (f[24] = x),
          (f[25] = r),
          (f[26] = i),
          (f[27] = b))
        : (b = f[27]),
      f[28] !== y || f[29] !== g || f[30] !== b
        ? ((h = (0, a.jsx)(F.N, { open: g, onOpenChange: y, children: b })),
          (f[28] = y),
          (f[29] = g),
          (f[30] = b),
          (f[31] = h))
        : (h = f[31]),
      h
    );
  }
  var $ = e.i(706615),
    E = e.i(36489),
    R = e.i(592209);
  let T = (e) => {
      let t,
        r,
        l = (0, s.c)(5),
        { title: n, isCardTop: i } = e,
        d = i ? "pt-4" : "pt-2";
      return (
        l[0] !== d
          ? ((t = (0, A.c)(
              "px-4 pb-1 text-xs font-medium uppercase tracking-wider text-text-tertiary",
              d,
            )),
            (l[0] = d),
            (l[1] = t))
          : (t = l[1]),
        l[2] !== t || l[3] !== n
          ? ((r = (0, a.jsx)("h2", { className: t, children: n })),
            (l[2] = t),
            (l[3] = n),
            (l[4] = r))
          : (r = l[4]),
        r
      );
    },
    O = (e) => {
      let t,
        r,
        n,
        i,
        d,
        o = (0, s.c)(9),
        { paidRanks: c } = e,
        { t: u } = (0, l.f)();
      return (
        o[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((t = (0, a.jsx)("span", {
              "aria-hidden": !0,
              className: "h-px flex-1 bg-text-primary",
            })),
            (o[0] = t))
          : (t = o[0]),
        o[1] !== c || o[2] !== u
          ? ((r = u("web.leaderboard.cup.paid_ranks", { count: c })),
            (o[1] = c),
            (o[2] = u),
            (o[3] = r))
          : (r = o[3]),
        o[4] !== r
          ? ((n = (0, a.jsx)("span", {
              className:
                "text-[10px] font-semibold uppercase tracking-wider text-text-primary",
              children: r,
            })),
            (o[4] = r),
            (o[5] = n))
          : (n = o[5]),
        o[6] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (0, a.jsx)("span", {
              "aria-hidden": !0,
              className: "h-px flex-1 bg-text-primary",
            })),
            (o[6] = i))
          : (i = o[6]),
        o[7] !== n
          ? ((d = (0, a.jsxs)("div", {
              className: "flex items-center gap-3 px-4 py-2",
              "data-testid": "cup-payline",
              children: [t, n, i],
            })),
            (o[7] = n),
            (o[8] = d))
          : (d = o[8]),
        d
      );
    },
    D = (e) => {
      let t,
        r,
        i,
        d,
        o,
        c,
        u,
        m = (0, s.c)(20),
        { prize: p } = e,
        { t: x, i18n: b } = (0, l.f)();
      if (
        m[0] !== b.language ||
        m[1] !== p.amount ||
        m[2] !== p.rankFrom ||
        m[3] !== p.rankTo ||
        m[4] !== x
      ) {
        let e,
          s = (0, R.v)(b.language) ?? "en",
          l = p.rankTo > p.rankFrom,
          c = l ? void 0 : n.S[p.rankFrom],
          u = (0, $.k)({ text: p.amount, locale: s });
        ((i = "flex items-center justify-between gap-3 px-4 py-3.5"),
          (d = `cup-tier-${p.rankFrom}`));
        let h = c ?? "text-text-primary";
        (m[10] !== h
          ? ((e = (0, A.c)("text-sm", h)), (m[10] = h), (m[11] = e))
          : (e = m[11]),
          (o = (0, a.jsx)("span", {
            className: e,
            children: l
              ? x("web.leaderboard.cup.tier_range", {
                  from: (0, E.Z)(p.rankFrom, s),
                  to: (0, E.Z)(p.rankTo, s),
                })
              : x("web.leaderboard.cup.tier_single", {
                  rank: (0, E.Z)(p.rankFrom, s),
                }),
          })),
          (t = "text-sm font-semibold text-text-accent"),
          (r = l ? x("web.leaderboard.cup.tier_each", { amount: u }) : u),
          (m[0] = b.language),
          (m[1] = p.amount),
          (m[2] = p.rankFrom),
          (m[3] = p.rankTo),
          (m[4] = x),
          (m[5] = t),
          (m[6] = r),
          (m[7] = i),
          (m[8] = d),
          (m[9] = o));
      } else ((t = m[5]), (r = m[6]), (i = m[7]), (d = m[8]), (o = m[9]));
      return (
        m[12] !== t || m[13] !== r
          ? ((c = (0, a.jsx)("span", { className: t, children: r })),
            (m[12] = t),
            (m[13] = r),
            (m[14] = c))
          : (c = m[14]),
        m[15] !== i || m[16] !== d || m[17] !== o || m[18] !== c
          ? ((u = (0, a.jsxs)("div", {
              className: i,
              "data-testid": d,
              children: [o, c],
            })),
            (m[15] = i),
            (m[16] = d),
            (m[17] = o),
            (m[18] = c),
            (m[19] = u))
          : (u = m[19]),
        u
      );
    },
    K = (e) => {
      let t,
        r,
        l,
        n = (0, s.c)(8),
        { title: i, body: d, testId: o } = e;
      return (
        n[0] !== i
          ? ((t = (0, a.jsx)("p", {
              className: "text-base font-semibold text-text-primary",
              children: i,
            })),
            (n[0] = i),
            (n[1] = t))
          : (t = n[1]),
        n[2] !== d
          ? ((r = (0, a.jsx)("p", {
              className: "text-sm text-text-secondary",
              children: d,
            })),
            (n[2] = d),
            (n[3] = r))
          : (r = n[3]),
        n[4] !== t || n[5] !== r || n[6] !== o
          ? ((l = (0, a.jsxs)("div", {
              className:
                "flex flex-col items-center gap-2 rounded-3xl border border-border-tertiary px-6 py-8 text-center",
              "data-testid": o,
              children: [t, r],
            })),
            (n[4] = t),
            (n[5] = r),
            (n[6] = o),
            (n[7] = l))
          : (l = n[7]),
        l
      );
    };
  var Z = e.i(705313),
    B = e.i(98525),
    Q = e.i(458310),
    V = e.i(741084),
    W = e.i(897665),
    J = e.i(599432),
    G = e.i(69399),
    H = e.i(90832);
  function X(e) {
    let t,
      r,
      i,
      d,
      o,
      c,
      u,
      m,
      p,
      x,
      b,
      h,
      f,
      g,
      y,
      w,
      j,
      v,
      N,
      _,
      k,
      z,
      I = (0, s.c)(63),
      { entry: U, prize: S } = e,
      { t: F } = (0, l.f)(),
      L = "group" === U.kind,
      M = n.S[U.rank];
    I[0] !== U.username || I[1] !== L || I[2] !== F
      ? ((t =
          U.username ??
          F(
            L
              ? "web.leaderboard.squads_unnamed_row"
              : "web.leaderboard.cup.anonymous",
          )),
        (I[0] = U.username),
        (I[1] = L),
        (I[2] = F),
        (I[3] = t))
      : (t = I[3]);
    let $ = t,
      E =
        0 === U.pnlUsd
          ? "text-text-primary"
          : U.pnlUsd > 0
            ? "text-gain"
            : "text-loss",
      R = U.entryId,
      T = M ?? "text-text-tertiary";
    I[4] !== T
      ? ((r = (0, A.c)("w-7 shrink-0 text-xs font-semibold tabular-nums", T)),
        (I[4] = T),
        (I[5] = r))
      : (r = I[5]);
    let O = U.rank > 0 ? U.rank : "–";
    if (
      (I[6] !== r || I[7] !== O
        ? ((i = (0, a.jsx)("span", { className: r, children: O })),
          (I[6] = r),
          (I[7] = O),
          (I[8] = i))
        : (i = I[8]),
      I[9] !== U)
    )
      ((d =
        "group" === U.kind
          ? (0, G.Z)({ groupId: U.participantId, username: U.username })
          : (0, C.$)(U.walletAddress ?? U.participantId)),
        (I[9] = U),
        (I[10] = d));
    else d = I[10];
    let D = U.walletAddress ?? U.participantId,
      K = L ? "rounded-xl" : "rounded-full";
    (I[11] !== K
      ? ((o = (0, A.c)("size-10 shrink-0 object-cover", K)),
        (I[11] = K),
        (I[12] = o))
      : (o = I[12]),
      I[13] !== U.profileImageUrl
        ? ((c = (0, V.f)(U.profileImageUrl)),
          (I[13] = U.profileImageUrl),
          (I[14] = c))
        : (c = I[14]),
      I[15] !== o || I[16] !== c || I[17] !== D
        ? ((u = (0, a.jsx)(Z.f, {
            address: D,
            alt: "",
            className: o,
            height: 40,
            ipfsPrefix: W.f,
            isAnonymous: !1,
            src: c,
            width: 40,
          })),
          (I[15] = o),
          (I[16] = c),
          (I[17] = D),
          (I[18] = u))
        : (u = I[18]));
    let X = M ?? "text-text-primary";
    if (
      (I[19] !== X
        ? ((m = (0, A.c)("truncate text-sm font-semibold hover:underline", X)),
          (I[19] = X),
          (I[20] = m))
        : (m = I[20]),
      I[21] !== $ || I[22] !== m
        ? ((p = (0, a.jsx)("span", { className: m, children: $ })),
          (I[21] = $),
          (I[22] = m),
          (I[23] = p))
        : (p = I[23]),
      I[24] !== U
        ? ((x = (0, J.f)(U) ? (0, a.jsx)(B.f, { size: 18 }) : null),
          (I[24] = U),
          (I[25] = x))
        : (x = I[25]),
      I[26] !== M
        ? ((b = M
            ? (0, a.jsx)(q.zN, {
                "aria-hidden": !0,
                className: (0, A.c)("size-3.5 shrink-0", M),
              })
            : null),
          (I[26] = M),
          (I[27] = b))
        : (b = I[27]),
      I[28] !== p || I[29] !== x || I[30] !== b
        ? ((h = (0, a.jsxs)("span", {
            className: "flex min-w-0 items-center gap-1.5",
            children: [p, x, b],
          })),
          (I[28] = p),
          (I[29] = x),
          (I[30] = b),
          (I[31] = h))
        : (h = I[31]),
      I[32] !== U.memberCount ||
      I[33] !== U.walletAddress ||
      I[34] !== L ||
      I[35] !== F
        ? ((f = L
            ? (0, a.jsx)("span", {
                className: "block truncate text-xs text-text-tertiary",
                children: F("profile.squads.info.member_count", {
                  count: U.memberCount,
                }),
              })
            : U.walletAddress
              ? (0, a.jsx)("span", {
                  className: "block truncate text-xs text-text-tertiary",
                  children: (0, P.d)(U.walletAddress),
                })
              : null),
          (I[32] = U.memberCount),
          (I[33] = U.walletAddress),
          (I[34] = L),
          (I[35] = F),
          (I[36] = f))
        : (f = I[36]),
      I[37] !== h || I[38] !== f
        ? ((g = (0, a.jsxs)("span", {
            className: "min-w-0",
            children: [h, f],
          })),
          (I[37] = h),
          (I[38] = f),
          (I[39] = g))
        : (g = I[39]),
      I[40] !== u || I[41] !== g || I[42] !== d
        ? ((y = (0, a.jsxs)(Q.default, {
            href: d,
            prefetch: !1,
            className: "flex min-w-0 flex-1 items-center gap-3",
            children: [u, g],
          })),
          (I[40] = u),
          (I[41] = g),
          (I[42] = d),
          (I[43] = y))
        : (y = I[43]),
      I[44] !== E
        ? ((w = (0, A.c)("text-sm font-bold tabular-nums", E)),
          (I[44] = E),
          (I[45] = w))
        : (w = I[45]),
      I[46] !== U.pnlUsd)
    ) {
      let e;
      ((e = U.pnlUsd),
        (j = `${e > 0 ? "+" : ""}${(0, H.w)(e)}`),
        (I[46] = U.pnlUsd),
        (I[47] = j));
    } else j = I[47];
    return (
      I[48] !== w || I[49] !== j
        ? ((v = (0, a.jsx)("span", { className: w, children: j })),
          (I[48] = w),
          (I[49] = j),
          (I[50] = v))
        : (v = I[50]),
      I[51] !== S
        ? ((N = S
            ? (0, a.jsx)("span", {
                className:
                  "rounded-full bg-bg-tertiary px-2 py-0.5 text-[10px] font-semibold text-text-primary",
                "data-testid": "cup-entry-prize",
                children: S.amount,
              })
            : null),
          (I[51] = S),
          (I[52] = N))
        : (N = I[52]),
      I[53] !== v || I[54] !== N
        ? ((_ = (0, a.jsxs)("span", {
            className: "ml-auto flex shrink-0 flex-col items-end gap-1",
            children: [v, N],
          })),
          (I[53] = v),
          (I[54] = N),
          (I[55] = _))
        : (_ = I[55]),
      I[56] !== y || I[57] !== _ || I[58] !== i
        ? ((k = (0, a.jsxs)("div", {
            className: "flex items-center gap-3",
            children: [i, y, _],
          })),
          (I[56] = y),
          (I[57] = _),
          (I[58] = i),
          (I[59] = k))
        : (k = I[59]),
      I[60] !== U.entryId || I[61] !== k
        ? ((z = (0, a.jsx)("div", {
            "data-testid": "cup-entry-row",
            "data-entry-id": R,
            className: "px-4 py-3 transition-colors hover:bg-bg-secondary",
            children: k,
          })),
          (I[60] = U.entryId),
          (I[61] = k),
          (I[62] = z))
        : (z = I[62]),
      z
    );
  }
  let Y = (e) => {
      let t,
        r,
        l,
        n,
        i = (0, s.c)(9),
        { value: d, label: o } = e;
      return (
        i[0] !== d
          ? ((t = String(d).padStart(2, "0")), (i[0] = d), (i[1] = t))
          : (t = i[1]),
        i[2] !== t
          ? ((r = (0, a.jsx)("span", {
              className:
                "text-lg font-bold leading-6 tabular-nums text-text-primary",
              children: t,
            })),
            (i[2] = t),
            (i[3] = r))
          : (r = i[3]),
        i[4] !== o
          ? ((l = (0, a.jsx)("span", {
              className:
                "text-[10px] font-medium uppercase tracking-wider text-text-tertiary",
              children: o,
            })),
            (i[4] = o),
            (i[5] = l))
          : (l = i[5]),
        i[6] !== r || i[7] !== l
          ? ((n = (0, a.jsxs)("div", {
              className:
                "flex w-14 flex-col items-center rounded-xl border border-border-secondary bg-bg-primary/80 pb-1 pt-1.5",
              children: [r, l],
            })),
            (i[6] = r),
            (i[7] = l),
            (i[8] = n))
          : (n = i[8]),
        n
      );
    },
    ee = (e) => {
      let t,
        r,
        n,
        d,
        o,
        c,
        u,
        m,
        p,
        x,
        b,
        h,
        f,
        g,
        y,
        w = (0, s.c)(38),
        { target: j } = e,
        { t: v } = (0, l.f)(),
        [N, _] = (0, i.useState)(et);
      (w[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((t = () => {
            let e = setInterval(() => _(Date.now()), 1e3);
            return () => clearInterval(e);
          }),
          (r = []),
          (w[0] = t),
          (w[1] = r))
        : ((t = w[0]), (r = w[1])),
        (0, i.useEffect)(t, r),
        w[2] !== N || w[3] !== j.atMs
          ? ((n = (0, $.v)(j.atMs, N)), (w[2] = N), (w[3] = j.atMs), (w[4] = n))
          : (n = w[4]));
      let k = n;
      (w[5] !== v || w[6] !== j.kind
        ? ((d = v(
            "ends" === j.kind
              ? "web.leaderboard.cup.ends_in"
              : "web.leaderboard.cup.starts_in",
          )),
          (w[5] = v),
          (w[6] = j.kind),
          (w[7] = d))
        : (d = w[7]),
        w[8] !== d
          ? ((o = (0, a.jsx)("span", {
              className:
                "text-xs font-medium uppercase tracking-wider text-text-secondary",
              children: d,
            })),
            (w[8] = d),
            (w[9] = o))
          : (o = w[9]));
      let z = k.days;
      (w[10] !== v
        ? ((c = v("web.leaderboard.cup.unit_days")), (w[10] = v), (w[11] = c))
        : (c = w[11]),
        w[12] !== k.days || w[13] !== c
          ? ((u = (0, a.jsx)(Y, { value: z, label: c })),
            (w[12] = k.days),
            (w[13] = c),
            (w[14] = u))
          : (u = w[14]));
      let I = k.hours;
      (w[15] !== v
        ? ((m = v("web.leaderboard.cup.unit_hours")), (w[15] = v), (w[16] = m))
        : (m = w[16]),
        w[17] !== k.hours || w[18] !== m
          ? ((p = (0, a.jsx)(Y, { value: I, label: m })),
            (w[17] = k.hours),
            (w[18] = m),
            (w[19] = p))
          : (p = w[19]));
      let U = k.minutes;
      (w[20] !== v
        ? ((x = v("web.leaderboard.cup.unit_minutes")),
          (w[20] = v),
          (w[21] = x))
        : (x = w[21]),
        w[22] !== k.minutes || w[23] !== x
          ? ((b = (0, a.jsx)(Y, { value: U, label: x })),
            (w[22] = k.minutes),
            (w[23] = x),
            (w[24] = b))
          : (b = w[24]));
      let A = k.seconds;
      return (
        w[25] !== v
          ? ((h = v("web.leaderboard.cup.unit_seconds")),
            (w[25] = v),
            (w[26] = h))
          : (h = w[26]),
        w[27] !== k.seconds || w[28] !== h
          ? ((f = (0, a.jsx)(Y, { value: A, label: h })),
            (w[27] = k.seconds),
            (w[28] = h),
            (w[29] = f))
          : (f = w[29]),
        w[30] !== p || w[31] !== b || w[32] !== f || w[33] !== u
          ? ((g = (0, a.jsxs)("div", {
              className: "flex gap-1.5",
              children: [u, p, b, f],
            })),
            (w[30] = p),
            (w[31] = b),
            (w[32] = f),
            (w[33] = u),
            (w[34] = g))
          : (g = w[34]),
        w[35] !== g || w[36] !== o
          ? ((y = (0, a.jsxs)("div", {
              className: "flex flex-col gap-2",
              "data-testid": "cup-countdown",
              children: [o, g],
            })),
            (w[35] = g),
            (w[36] = o),
            (w[37] = y))
          : (y = w[37]),
        y
      );
    };
  function et() {
    return Date.now();
  }
  var er = e.i(439587),
    ea = e.i(292686),
    es = e.i(781901),
    el = e.i(403012);
  let en =
    ((t = 0x9e3779b9),
    (r = () => {
      let e = Math.imul((t = (t + 0x6d2b79f5) | 0) ^ (t >>> 15), 1 | t);
      return (
        (((e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e) ^ (e >>> 14)) >>>
          0) /
        0x100000000
      );
    }),
    Array.from({ length: 150 }, () => {
      let e = r();
      return {
        left: 100 * r(),
        opacity: 0.16 + 0.5 * r(),
        size: 1 + Math.round(e ** 3 * 2),
        top: 100 * r(),
      };
    }));
  function ei() {
    let e,
      t = (0, s.c)(1);
    return (
      t[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, a.jsx)("div", {
            "aria-hidden": "true",
            className: "pointer-events-none absolute inset-0",
            children: en.map(ed),
          })),
          (t[0] = e))
        : (e = t[0]),
      e
    );
  }
  function ed(e) {
    return (0, a.jsx)(
      "span",
      {
        className: "absolute rounded-full bg-white",
        style: {
          height: `${e.size}px`,
          left: `${e.left}%`,
          opacity: e.opacity,
          top: `${e.top}%`,
          width: `${e.size}px`,
        },
      },
      `${e.left}-${e.top}`,
    );
  }
  var eo = e.i(296335),
    ec = e.i(152347),
    eu = e.i(595673),
    em = e.i(955332);
  let ep = {
      screen: ea.Ae.LEADERBOARD,
      sourceElement: ea.k9.UPSELL_CARD_GENERIC,
      sourceElementType: ea.eD.BUTTON,
    },
    ex = /pump\.fun/i,
    eb = (e) => {
      let t,
        r,
        l,
        n,
        i,
        d = (0, s.c)(16),
        { text: o } = e;
      d[0] !== o ? ((t = ex.exec(o)), (d[0] = o), (d[1] = t)) : (t = d[1]);
      let c = t;
      if (!c) {
        let e;
        return (
          d[2] !== o
            ? ((e = (0, a.jsx)(a.Fragment, { children: o })),
              (d[2] = o),
              (d[3] = e))
            : (e = d[3]),
          e
        );
      }
      let u = c.index,
        m = u + c[0].length;
      return (
        d[4] !== u || d[5] !== o
          ? ((r = o.slice(0, u)), (d[4] = u), (d[5] = o), (d[6] = r))
          : (r = d[6]),
        d[7] !== c[0]
          ? ((l = (0, a.jsx)("span", {
              className: "text-bg-accent",
              children: c[0],
            })),
            (d[7] = c[0]),
            (d[8] = l))
          : (l = d[8]),
        d[9] !== m || d[10] !== o
          ? ((n = o.slice(m)), (d[9] = m), (d[10] = o), (d[11] = n))
          : (n = d[11]),
        d[12] !== r || d[13] !== l || d[14] !== n
          ? ((i = (0, a.jsxs)(a.Fragment, { children: [r, l, n] })),
            (d[12] = r),
            (d[13] = l),
            (d[14] = n),
            (d[15] = i))
          : (i = d[15]),
        i
      );
    },
    eh = (e) => {
      let t,
        r,
        n,
        i,
        d,
        o = (0, s.c)(16),
        { open: c, onOpenChange: u, href: m } = e,
        { t: p } = (0, l.f)();
      return (
        o[0] !== u ? ((t = (e) => u(e)), (o[0] = u), (o[1] = t)) : (t = o[1]),
        o[2] !== p
          ? ((r = p("web.leaderboard.cup.join_on_app_scan_title")),
            (o[2] = p),
            (o[3] = r))
          : (r = o[3]),
        o[4] !== m || o[5] !== u || o[6] !== c || o[7] !== p
          ? ((n = c
              ? (0, a.jsxs)("div", {
                  className: "relative overflow-hidden bg-[#050806]",
                  children: [
                    (0, a.jsx)("div", {
                      "aria-hidden": !0,
                      className:
                        "pointer-events-none absolute left-1/2 top-1/2 size-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full",
                      style: {
                        background:
                          "radial-gradient(circle, rgba(52,168,112,0.28) 0%, rgba(16,60,40,0.13) 32%, rgba(5,8,6,0) 62%)",
                      },
                    }),
                    (0, a.jsx)(ei, {}),
                    (0, a.jsx)("button", {
                      type: "button",
                      onClick: () => u(!1),
                      "aria-label": p("common.close"),
                      className:
                        "absolute right-3 top-3 z-[1] rounded-full p-2 text-text-tertiary transition-colors hover:bg-white/10 hover:text-text-primary",
                      children: (0, a.jsx)(q.x6, { className: "size-4" }),
                    }),
                    (0, a.jsxs)("div", {
                      className:
                        "relative mx-auto flex w-full max-w-xs flex-col items-center px-6 pb-8 pt-10 text-center",
                      children: [
                        (0, a.jsx)("div", {
                          className:
                            "flex size-16 items-center justify-center rounded-[22%] bg-gradient-to-b from-[#7ee6a6] to-[#3fbf78] shadow-[0_0_44px_-6px_rgba(134,239,172,0.6)]",
                          children: (0, a.jsx)(el.f, {
                            className: "size-9",
                            size: 36,
                          }),
                        }),
                        (0, a.jsxs)("p", {
                          className:
                            "mt-3 text-sm font-semibold text-text-high-em",
                          children: [
                            "pump",
                            (0, a.jsx)("span", {
                              className: "text-bg-accent",
                              children: ".",
                            }),
                            "fun",
                          ],
                        }),
                        (0, a.jsx)("h2", {
                          className:
                            "mt-3 text-balance text-2xl font-semibold leading-tight text-text-high-em",
                          children: (0, a.jsx)(eb, {
                            text: p(
                              "web.leaderboard.cup.join_on_app_scan_title",
                            ),
                          }),
                        }),
                        (0, a.jsx)("p", {
                          className:
                            "mt-2 text-pretty text-xs text-text-mid-em",
                          children: p(
                            "web.leaderboard.cup.join_on_app_scan_body",
                          ),
                        }),
                        (0, a.jsx)("div", {
                          role: "img",
                          "aria-label": p("web.upsell.qr_alt"),
                          "data-testid": "cup-join-qr",
                          className:
                            "mt-6 rounded-xl border border-white/10 bg-white p-2 shadow-[0_0_24px_-8px_rgba(134,239,172,0.45)]",
                          children: (0, a.jsx)(es.default, {
                            value: m,
                            size: 168,
                            bgColor: "#ffffff",
                            fgColor: "#050806",
                            level: "M",
                            style: { height: "168px", width: "168px" },
                          }),
                        }),
                        (0, a.jsxs)("div", {
                          className: "mt-6 flex w-full flex-col gap-3",
                          children: [
                            (0, a.jsxs)("a", {
                              className: eo.g,
                              href: m,
                              target: "_blank",
                              rel: "noopener noreferrer nofollow",
                              "data-testid": "cup-join-app-store",
                              children: [
                                p("web.upsell.download_app_store"),
                                (0, a.jsx)(eo.e, {}),
                              ],
                            }),
                            (0, a.jsxs)("a", {
                              className: eo.g,
                              href: m,
                              target: "_blank",
                              rel: "noopener noreferrer nofollow",
                              "data-testid": "cup-join-google-play",
                              children: [
                                p("web.upsell.download_google_play"),
                                (0, a.jsx)(eo.r, {}),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                })
              : null),
            (o[4] = m),
            (o[5] = u),
            (o[6] = c),
            (o[7] = p),
            (o[8] = n))
          : (n = o[8]),
        o[9] !== r || o[10] !== n
          ? ((i = (0, a.jsx)(er.s, {
              "aria-label": r,
              className:
                "w-full max-w-[400px] gap-0 overflow-hidden border border-white/10 bg-[#050806] p-0",
              "data-testid": "cup-join-dialog",
              children: n,
            })),
            (o[9] = r),
            (o[10] = n),
            (o[11] = i))
          : (i = o[11]),
        o[12] !== c || o[13] !== t || o[14] !== i
          ? ((d = (0, a.jsx)(er.v, {
              isOpen: c,
              onIsOpenChange: t,
              children: i,
            })),
            (o[12] = c),
            (o[13] = t),
            (o[14] = i),
            (o[15] = d))
          : (d = o[15]),
        d
      );
    },
    ef = (e) => {
      let t,
        r,
        n,
        d,
        o,
        c,
        u,
        m,
        p,
        x,
        b = (0, s.c)(21),
        { competition: h, className: f } = e,
        { t: g } = (0, l.f)(),
        y = (0, ec.f)(),
        [w, j] = (0, i.useState)(!1),
        v = h.joinable;
      b[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((t = (0, em.d)(null, "cup_join")), (b[0] = t))
        : (t = b[0]);
      let N = t;
      if (
        (b[1] !== v
          ? ((r = () => {
              v && (0, eu.LR)({ interactionType: "seen", ...ep });
            }),
            (n = [v]),
            (b[1] = v),
            (b[2] = r),
            (b[3] = n))
          : ((r = b[2]), (n = b[3])),
        (0, i.useEffect)(r, n),
        !v)
      )
        return null;
      b[4] !== y
        ? ((d = (e) => {
            ((0, eu.LR)({ interactionType: "click", ...ep }),
              "unknown" !== y ||
                0 !== e.button ||
                e.metaKey ||
                e.ctrlKey ||
                e.shiftKey ||
                e.altKey ||
                (e.preventDefault(), j(!0)));
          }),
          (b[4] = y),
          (b[5] = d))
        : (d = b[5]);
      let _ = d;
      return (
        b[6] !== f ? ((o = (0, A.c)(f)), (b[6] = f), (b[7] = o)) : (o = b[7]),
        b[8] !== g
          ? ((c = g("web.leaderboard.cup.join_on_app")), (b[8] = g), (b[9] = c))
          : (c = b[9]),
        b[10] !== _ || b[11] !== c
          ? ((u = (0, a.jsx)(er.L, {
              href: N,
              rel: "noopener noreferrer nofollow",
              variant: "primary",
              size: 44,
              isFullWidth: !0,
              onClick: _,
              "data-testid": "cup-join-on-app",
              children: c,
            })),
            (b[10] = _),
            (b[11] = c),
            (b[12] = u))
          : (u = b[12]),
        b[13] !== o || b[14] !== u
          ? ((m = (0, a.jsx)("div", { className: o, children: u })),
            (b[13] = o),
            (b[14] = u),
            (b[15] = m))
          : (m = b[15]),
        b[16] !== w
          ? ((p = (0, a.jsx)(eh, { open: w, onOpenChange: j, href: N })),
            (b[16] = w),
            (b[17] = p))
          : (p = b[17]),
        b[18] !== m || b[19] !== p
          ? ((x = (0, a.jsxs)(a.Fragment, { children: [m, p] })),
            (b[18] = m),
            (b[19] = p),
            (b[20] = x))
          : (x = b[20]),
        x
      );
    };
  var eg = e.i(591867);
  let ey = "@container/podium",
    ew =
      "[--podium-scale:0.88] @sm/podium:[--podium-scale:1] @lg/podium:[--podium-scale:1.3] @xl/podium:[--podium-scale:1.5] @2xl/podium:[--podium-scale:1.72]",
    ej = { left: 90, top: 0, width: 276, height: 214 },
    ev = {
      stars: { src: "/leaderboard/star-layer.png", ...ej },
      megaphones: { src: "/leaderboard/megaphone-layer.png", ...ej },
    },
    eN = [
      {
        slot: 1,
        width: 190,
        height: 161,
        left: 167,
        top: 0,
        zIndex: 0,
        clipPath:
          "M9.68 63.19Q10.67 52.24 21.49 50.26L177.45 21.82Q188.28 19.85 187.56 30.83L180.05 146.77Q179.34 157.75 168.34 157.77L12.14 158.01Q1.14 158.02 2.13 147.07Z",
        frameSrc: "/leaderboard/first-frame.png",
        dropShadow: "drop-shadow(0 6px 14px rgba(245,158,11,0.35))",
      },
      {
        slot: 2,
        width: 121,
        height: 109,
        left: 1,
        top: 97,
        zIndex: 3,
        clipPath:
          "M4.45 12.51Q4.70 1.51 15.52 3.48L105.08 19.73Q115.90 21.69 116.20 32.69L117.93 94.96Q118.24 105.95 107.24 105.94L13.35 105.78Q2.35 105.76 2.60 94.76Z",
        frameSrc: "/leaderboard/second-frame.png",
        dropShadow: "drop-shadow(0 3px 8px rgba(229,231,235,0.25))",
      },
      {
        slot: 3,
        width: 119,
        height: 89,
        left: 125,
        top: 117,
        zIndex: 2,
        clipPath:
          "M2.35 13.01Q2.05 2.01 12.94 3.54L104.69 16.37Q115.58 17.89 115.71 28.89L116.26 75.11Q116.39 86.10 105.39 86.09L15.32 85.94Q4.32 85.93 4.02 74.93Z",
        frameSrc: "/leaderboard/third-frame.png",
        dropShadow: "drop-shadow(0 3px 8px rgba(234,88,12,0.3))",
      },
      {
        slot: 4,
        width: 121,
        height: 73,
        left: 246,
        top: 133,
        zIndex: 1,
        clipPath:
          "M4.87 12.25Q4.34 1.26 15.25 2.68L98.94 13.54Q109.85 14.95 111.88 25.76L117.62 56.36Q119.65 67.17 108.65 67.17L18.52 67.17Q7.52 67.17 6.99 56.18Z",
        frameSrc: "/leaderboard/fourth-frame.png",
        dropShadow: "drop-shadow(0 3px 8px rgba(99,102,241,0.3))",
      },
    ],
    e_ = "calc(var(--cup-lead, 0px) + 84px + 204px * var(--podium-scale))",
    ek = () => {
      let e,
        t,
        r,
        a = (0, s.c)(4),
        l = (0, i.useRef)(null),
        n = (0, i.useRef)(null),
        [d, o] = (0, i.useState)(null),
        [c, u] = (0, i.useState)(null);
      (a[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = () => {
            let e = l.current;
            if (!e || "u" < typeof ResizeObserver) return;
            let t = new ResizeObserver(() => {
              let t = e.getBoundingClientRect(),
                r = Math.round(t.width);
              u(r);
              let a = n.current;
              if (!a) return;
              let s = Number.parseFloat(getComputedStyle(e).paddingTop) || 0,
                l = Number.parseFloat(getComputedStyle(a).paddingTop) || 0,
                i = Math.round(a.getBoundingClientRect().top + l - t.top - s);
              o((e) =>
                e?.topPx === i && e.rootWidthPx === r
                  ? e
                  : { topPx: i, rootWidthPx: r },
              );
            });
            return (t.observe(e), () => t.disconnect());
          }),
          (t = []),
          (a[0] = e),
          (a[1] = t))
        : ((e = a[0]), (t = a[1])),
        (0, i.useEffect)(e, t));
      let m = null !== d && d.rootWidthPx === c ? d.topPx : null;
      return (
        a[2] !== m
          ? ((r = { rootRef: l, controlRowRef: n, periodControlTopPx: m }),
            (a[2] = m),
            (a[3] = r))
          : (r = a[3]),
        r
      );
    };
  var ez = e.i(253101);
  let eI = (e, t, r) => ({
      previewUrl: (0, ez.n)(e),
      posterUrl: (0, ez.m)({ videoId: e, width: 540, height: 720 }),
      posterUrlLarge: (0, ez.m)({ videoId: e, width: 1080, height: 1440 }),
      subjectTop: t,
      subjectBottom: r,
    }),
    eU = 400 / 3,
    eA = {
      person: eI("01f531b4efc5c06b67dd06f423045bcc", 0.15, 0.59),
      group: eI("cffc45d0b51b8e6967fde1c85f1c460f", 0.28, 0.56),
    },
    eS = "pt-[calc(var(--cup-control-top)_+_46px)]",
    eC = { person: "pt-[80vw] sm:pt-[64%]", group: "pt-[76vw] sm:pt-[64%]" },
    eP = "[object-position:50%_var(--cup-film-focus)]",
    eq = (e) => {
      let t = e.play();
      t && t.catch(() => void 0);
    },
    eF = (t) => {
      let r,
        l,
        n,
        d,
        o,
        c,
        u,
        m,
        p = (0, s.c)(17),
        { kind: x } = t,
        b = eA[x],
        h = (0, U.f)() ?? !1,
        [f, g] = (0, i.useState)(!1),
        [y, w] = (0, i.useState)(null),
        j = f && !h && y !== b.previewUrl,
        v = (0, i.useRef)(null),
        N = (0, i.useRef)(null);
      (p[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = () => {
            let e = v.current;
            if (!e) return;
            if ("u" < typeof IntersectionObserver) {
              let e = requestAnimationFrame(() => g(!0));
              return () => cancelAnimationFrame(e);
            }
            let t = new IntersectionObserver(
              (e) => {
                let [t] = e;
                if (!t) return;
                let r = N.current;
                t.isIntersecting ? (g(!0), r && eq(r)) : r?.pause();
              },
              { threshold: 0.25 },
            );
            return (t.observe(e), () => t.disconnect());
          }),
          (l = []),
          (p[0] = r),
          (p[1] = l))
        : ((r = p[0]), (l = p[1])),
        (0, i.useEffect)(r, l),
        p[2] !== b.previewUrl || p[3] !== j
          ? ((n = () => {
              var t;
              let r,
                a,
                s = N.current;
              if (!s || !j) return;
              let l = b.previewUrl;
              return (
                (s.muted = !0),
                (t = () => w(l)),
                (a = !1),
                e.A(643576).then(({ default: e }) => {
                  if (a || !s.isConnected) return;
                  if (!e.isSupported())
                    return void (s.canPlayType("application/vnd.apple.mpegurl")
                      ? ((s.src = l), eq(s))
                      : t());
                  let n = new e({ capLevelToPlayerSize: !0 }),
                    i = (e, r) => {
                      r.fatal && t();
                    };
                  (n.on(e.Events.ERROR, i),
                    (r = () => {
                      (n.off(e.Events.ERROR, i), n.destroy());
                    }),
                    n.loadSource(l),
                    n.attachMedia(s),
                    eq(s));
                }),
                () => {
                  ((a = !0), r?.());
                }
              );
            }),
            (d = [b.previewUrl, j]),
            (p[2] = b.previewUrl),
            (p[3] = j),
            (p[4] = n),
            (p[5] = d))
          : ((n = p[4]), (d = p[5])),
        (0, i.useEffect)(n, d));
      let _ = b.posterUrl,
        k = `${b.posterUrl} 540w, ${b.posterUrlLarge} 1080w`;
      return (
        p[6] === Symbol.for("react.memo_cache_sentinel")
          ? ((o = (0, A.c)("absolute inset-0 size-full object-cover", eP)),
            (p[6] = o))
          : (o = p[6]),
        p[7] !== b.posterUrl || p[8] !== k
          ? ((c = (0, a.jsx)("img", {
              src: _,
              srcSet: k,
              sizes: "(min-width: 640px) 768px, 100vw",
              alt: "",
              className: o,
              "data-testid": "cup-hero-poster",
            })),
            (p[7] = b.posterUrl),
            (p[8] = k),
            (p[9] = c))
          : (c = p[9]),
        p[10] !== b.posterUrlLarge || p[11] !== b.previewUrl || p[12] !== j
          ? ((u = j
              ? (0, a.jsx)(
                  "video",
                  {
                    ref: N,
                    autoPlay: !0,
                    loop: !0,
                    muted: !0,
                    playsInline: !0,
                    disablePictureInPicture: !0,
                    preload: "auto",
                    poster: b.posterUrlLarge,
                    "aria-hidden": !0,
                    onError: () => w(b.previewUrl),
                    className: (0, A.c)(
                      "absolute inset-0 size-full object-cover",
                      eP,
                    ),
                    "data-testid": "cup-hero-video",
                  },
                  b.previewUrl,
                )
              : null),
            (p[10] = b.posterUrlLarge),
            (p[11] = b.previewUrl),
            (p[12] = j),
            (p[13] = u))
          : (u = p[13]),
        p[14] !== c || p[15] !== u
          ? ((m = (0, a.jsxs)("div", {
              ref: v,
              className: "absolute inset-0",
              children: [c, u],
            })),
            (p[14] = c),
            (p[15] = u),
            (p[16] = m))
          : (m = p[16]),
        m
      );
    },
    eL = (e) => {
      let t,
        r,
        n,
        i,
        d,
        o,
        c,
        u,
        m,
        p,
        x,
        b = (0, s.c)(31),
        { competition: h, onOpenRules: f } = e,
        { t: g, i18n: y } = (0, l.f)();
      if (b[0] !== h.prizeCopy || b[1] !== h.prizes || b[2] !== y.language) {
        let e = (0, R.v)(y.language) ?? "en",
          r =
            "" !== h.prizeCopy.trim()
              ? h.prizeCopy
              : (h.prizes[0]?.amount ?? null);
        ((t = null === r ? null : (0, $.k)({ text: r, locale: e })),
          (b[0] = h.prizeCopy),
          (b[1] = h.prizes),
          (b[2] = y.language),
          (b[3] = t));
      } else t = b[3];
      let w = t;
      b[4] !== h ? ((r = (0, $.H)(h)), (b[4] = h), (b[5] = r)) : (r = b[5]);
      let j = r,
        v = "ended" === h.phase;
      return (
        b[6] !== h.title
          ? ((n = (0, a.jsx)("span", {
              className:
                "min-w-0 truncate text-sm font-bold uppercase tracking-wide text-text-primary",
              children: h.title,
            })),
            (b[6] = h.title),
            (b[7] = n))
          : (n = b[7]),
        b[8] !== v || b[9] !== g
          ? ((i = v
              ? (0, a.jsx)("span", {
                  "data-testid": "cup-finished",
                  className:
                    "shrink-0 rounded bg-loss/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-loss",
                  children: g("web.leaderboard.cup.finished"),
                })
              : null),
            (b[8] = v),
            (b[9] = g),
            (b[10] = i))
          : (i = b[10]),
        b[11] !== n || b[12] !== i
          ? ((d = (0, a.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [n, i],
            })),
            (b[11] = n),
            (b[12] = i),
            (b[13] = d))
          : (d = b[13]),
        b[14] !== w
          ? ((o = w
              ? (0, a.jsx)("p", {
                  className:
                    "line-clamp-2 text-3xl font-bold leading-tight text-text-accent sm:text-4xl",
                  children: w,
                })
              : null),
            (b[14] = w),
            (b[15] = o))
          : (o = b[15]),
        b[16] !== j
          ? ((c = j
              ? (0, a.jsx)("div", {
                  className: "mt-4",
                  children: (0, a.jsx)(ee, { target: j }),
                })
              : null),
            (b[16] = j),
            (b[17] = c))
          : (c = b[17]),
        b[18] !== g
          ? ((u = g("web.leaderboard.cup.rules.open")),
            (b[18] = g),
            (b[19] = u))
          : (u = b[19]),
        b[20] !== f || b[21] !== u
          ? ((m = (0, a.jsx)("div", {
              className: "mt-3",
              "data-testid": "cup-rules-open",
              children: (0, a.jsx)(eg.f, { message: u, onPress: f, flush: !0 }),
            })),
            (b[20] = f),
            (b[21] = u),
            (b[22] = m))
          : (m = b[22]),
        b[23] !== h
          ? ((p = (0, a.jsx)(ef, { competition: h, className: "mt-4" })),
            (b[23] = h),
            (b[24] = p))
          : (p = b[24]),
        b[25] !== p || b[26] !== d || b[27] !== o || b[28] !== c || b[29] !== m
          ? ((x = (0, a.jsxs)(a.Fragment, { children: [d, o, c, m, p] })),
            (b[25] = p),
            (b[26] = d),
            (b[27] = o),
            (b[28] = c),
            (b[29] = m),
            (b[30] = x))
          : (x = b[30]),
        x
      );
    },
    eM = (e) => {
      let t,
        r,
        n,
        i,
        d,
        o = (0, s.c)(23),
        { isLoading: c, isError: u, onRetry: m } = e,
        { t: p } = (0, l.f)();
      if (u) {
        let e, t, r, s, l;
        return (
          o[0] !== p
            ? ((e = p("web.leaderboard.cup.load_error")),
              (o[0] = p),
              (o[1] = e))
            : (e = o[1]),
          o[2] !== e
            ? ((t = (0, a.jsx)("p", {
                className: "text-lg font-semibold text-text-primary",
                children: e,
              })),
              (o[2] = e),
              (o[3] = t))
            : (t = o[3]),
          o[4] !== p
            ? ((r = p("web.common.try_again")), (o[4] = p), (o[5] = r))
            : (r = o[5]),
          o[6] !== m || o[7] !== r
            ? ((s = (0, a.jsx)("button", {
                type: "button",
                "data-testid": "cup-retry",
                onClick: m,
                className:
                  "mt-3 self-start rounded-full border border-border-tertiary px-4 py-1.5 text-xs font-semibold text-text-primary transition-colors hover:bg-bg-tertiary",
                children: r,
              })),
              (o[6] = m),
              (o[7] = r),
              (o[8] = s))
            : (s = o[8]),
          o[9] !== t || o[10] !== s
            ? ((l = (0, a.jsxs)(a.Fragment, { children: [t, s] })),
              (o[9] = t),
              (o[10] = s),
              (o[11] = l))
            : (l = o[11]),
          l
        );
      }
      return c
        ? null
        : (o[12] !== p
            ? ((t = p("web.leaderboard.cup.empty_title")),
              (o[12] = p),
              (o[13] = t))
            : (t = o[13]),
          o[14] !== t
            ? ((r = (0, a.jsx)("p", {
                className: "text-lg font-semibold text-text-primary",
                children: t,
              })),
              (o[14] = t),
              (o[15] = r))
            : (r = o[15]),
          o[16] !== p
            ? ((n = p("web.leaderboard.cup.empty_body")),
              (o[16] = p),
              (o[17] = n))
            : (n = o[17]),
          o[18] !== n
            ? ((i = (0, a.jsx)("p", {
                className: "text-sm text-text-secondary",
                children: n,
              })),
              (o[18] = n),
              (o[19] = i))
            : (i = o[19]),
          o[20] !== r || o[21] !== i
            ? ((d = (0, a.jsxs)(a.Fragment, { children: [r, i] })),
              (o[20] = r),
              (o[21] = i),
              (o[22] = d))
            : (d = o[22]),
          d);
    },
    e$ = (e) => {
      let t,
        r,
        n,
        i,
        d,
        o,
        c,
        u,
        m,
        p,
        x,
        b,
        h,
        f,
        g,
        y,
        w,
        j = (0, s.c)(49),
        {
          kind: v,
          topControl: N,
          topControlTopPx: _,
          className: k,
          competition: z,
          isLoading: I,
          isError: S,
          onRetry: C,
          onOpenRules: P,
        } = e,
        q = void 0 === _ ? null : _,
        { t: F } = (0, l.f)(),
        L = (0, U.f)() ?? !1,
        M = eA[v];
      if (j[0] !== M)
        ((t = {
          feet: `${(M.subjectBottom * eU).toFixed(2)}cqw`,
          crown: `${(M.subjectTop * eU).toFixed(2)}cqw`,
        }),
          (j[0] = M),
          (j[1] = t));
      else t = j[1];
      let $ = t;
      (j[2] !== z?.title || j[3] !== F
        ? ((r = z?.title ?? F("web.leaderboard.cup.tab_cup")),
          (j[2] = z?.title),
          (j[3] = F),
          (j[4] = r))
        : (r = j[4]),
        j[5] !== k
          ? ((n = (0, A.c)(
              "@container relative -mx-4 overflow-hidden bg-bg-primary sm:rounded-3xl",
              ew,
              k,
            )),
            (j[5] = k),
            (j[6] = n))
          : (n = j[6]));
      let E = null === q ? e_ : `${q}px`;
      j[7] !== E
        ? ((i = { "--cup-control-top": E }), (j[7] = E), (j[8] = i))
        : (i = j[8]);
      let R = i;
      if (
        (j[9] === Symbol.for("react.memo_cache_sentinel")
          ? ((d = (0, A.c)(
              "absolute inset-x-0 top-0 h-[120vw] sm:aspect-[5/4] sm:h-auto",
              "[--cup-film-lift-max:-13.33cqw] sm:[--cup-film-lift-max:-53.33cqw]",
            )),
            (j[9] = d))
          : (d = j[9]),
        j[10] !== M || j[11] !== N)
      ) {
        let e;
        ((o = N
          ? "max(var(--cup-film-lift-max), 16px - var(--cup-film-crown), min(0px, var(--cup-control-top) - 8px - var(--cup-film-feet)))"
          : ((e = M.subjectBottom - 0.48), `${((e / 0.4) * 100).toFixed(1)}%`)),
          (j[10] = M),
          (j[11] = N),
          (j[12] = o));
      } else o = j[12];
      j[13] !== $.crown || j[14] !== $.feet || j[15] !== o
        ? ((c = {
            "--cup-film-focus": o,
            "--cup-film-feet": $.feet,
            "--cup-film-crown": $.crown,
          }),
          (j[13] = $.crown),
          (j[14] = $.feet),
          (j[15] = o),
          (j[16] = c))
        : (c = j[16]);
      let T = c,
        O = !L && "cup-film-in";
      (j[17] !== O
        ? ((u = (0, A.c)("absolute inset-0", O)), (j[17] = O), (j[18] = u))
        : (u = j[18]),
        j[19] !== v
          ? ((m = (0, a.jsx)(eF, { kind: v })), (j[19] = v), (j[20] = m))
          : (m = j[20]),
        j[21] !== u || j[22] !== m
          ? ((p = (0, a.jsx)("div", {
              className: u,
              "data-testid": "cup-hero-film",
              children: m,
            })),
            (j[21] = u),
            (j[22] = m),
            (j[23] = p))
          : (p = j[23]),
        j[24] !== T || j[25] !== p
          ? ((x = (0, a.jsx)("div", {
              className: d,
              style: T,
              "data-testid": "cup-hero-stage",
              children: p,
            })),
            (j[24] = T),
            (j[25] = p),
            (j[26] = x))
          : (x = j[26]),
        j[27] !== N
          ? ((b = N
              ? (0, a.jsx)("div", {
                  className:
                    "absolute left-4 top-[var(--cup-control-top)] z-[1] flex",
                  "data-testid": "cup-hero-control",
                  children: N,
                })
              : null),
            (j[27] = N),
            (j[28] = b))
          : (b = j[28]));
      let D = N ? eS : eC[v];
      return (
        j[29] !== D
          ? ((h = (0, A.c)("relative", D)), (j[29] = D), (j[30] = h))
          : (h = j[30]),
        j[31] === Symbol.for("react.memo_cache_sentinel")
          ? ((f = (0, a.jsx)("div", {
              "aria-hidden": !0,
              className:
                "pointer-events-none absolute inset-x-0 -top-[72px] bottom-0 bg-gradient-to-b from-transparent via-bg-primary/85 to-bg-primary",
            })),
            (j[31] = f))
          : (f = j[31]),
        j[32] !== z ||
        j[33] !== S ||
        j[34] !== I ||
        j[35] !== P ||
        j[36] !== C ||
        j[37] !== L
          ? ((g = (0, a.jsxs)("div", {
              className: "relative px-4 pb-6",
              children: [
                f,
                (0, a.jsx)("div", {
                  className: "relative flex flex-col gap-1",
                  children: z
                    ? (0, a.jsx)(
                        "div",
                        {
                          className: (0, A.c)(
                            "flex flex-col gap-1",
                            !L && "cup-copy-in",
                          ),
                          children: (0, a.jsx)(eL, {
                            competition: z,
                            onOpenRules: P,
                          }),
                        },
                        z.id,
                      )
                    : (0, a.jsx)(eM, { isLoading: I, isError: S, onRetry: C }),
                }),
              ],
            })),
            (j[32] = z),
            (j[33] = S),
            (j[34] = I),
            (j[35] = P),
            (j[36] = C),
            (j[37] = L),
            (j[38] = g))
          : (g = j[38]),
        j[39] !== h || j[40] !== g
          ? ((y = (0, a.jsx)("div", {
              className: h,
              "data-testid": "cup-hero-copy",
              children: g,
            })),
            (j[39] = h),
            (j[40] = g),
            (j[41] = y))
          : (y = j[41]),
        j[42] !== x ||
        j[43] !== b ||
        j[44] !== y ||
        j[45] !== r ||
        j[46] !== n ||
        j[47] !== R
          ? ((w = (0, a.jsx)("div", {
              className: ey,
              children: (0, a.jsxs)("section", {
                "data-testid": "cup-hero",
                "aria-label": r,
                className: n,
                style: R,
                children: [x, b, y],
              }),
            })),
            (j[42] = x),
            (j[43] = b),
            (j[44] = y),
            (j[45] = r),
            (j[46] = n),
            (j[47] = R),
            (j[48] = w))
          : (w = j[48]),
        w
      );
    };
  var eE = e.i(730721),
    eR = e.i(944410),
    eT = e.i(935258),
    eO = e.i(674801);
  let eD = (e) => (e ? { pnlUsd: e.pnlUsd, buySpendUsd: e.buySpendUsd } : null),
    eK = (e) => e.chainId === eO.S,
    eZ = (e, t) => t <= 0 || e >= 0.1 * t,
    eB = (e, t) => e.filter((e) => e.kind === t && e.rank > 0),
    eQ = (e, t) => {
      let r = e.findIndex(t);
      return -1 === r ? [...e] : e.slice(0, r);
    };
  var eV = e.i(639287);
  let eW = null,
    eJ = async (e) => {
      let t = await fetch("/api/profiles/generated-media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: e }),
      });
      if (!t.ok) throw Error(`generated media ${t.status}`);
      return await t.json();
    },
    eG = async () => {
      let e = eW;
      if (((eW = null), !e)) return;
      let t = [...e.keys()];
      for (let r = 0; r < t.length; r += 200) {
        let a = t.slice(r, r + 200);
        try {
          let t = await eJ(a);
          for (let r of a)
            for (let a of e.get(r) ?? []) a.resolve(t[r] ?? null);
        } catch (t) {
          for (let r of a) for (let a of e.get(r) ?? []) a.reject(t);
        }
      }
    },
    eH = (e) => {
      if (!e.isPending) return e.data ?? null;
    },
    eX = (e, t) => {
      let r = (0, eR.useClientServerContract)();
      return (0, eT.f)({
        queries: t.map((t) => ({
          queryKey: eV.f.highlights(e, t.entryId),
          queryFn: ({ signal: a }) =>
            r("GET /competitions/{id}/entries/{entryId}/highlights", {
              params: { id: e, entryId: t.entryId },
              query: { limit: 10 },
              signal: a,
            }),
          staleTime: 6e4,
        })),
        combine: (e) => e.map(eH),
      });
    };
  var eY = e.i(860787);
  let e0 =
      "inline-flex items-center justify-center rounded-xl border border-border-secondary bg-bg-secondary p-2 text-text-tertiary transition-colors hover:bg-bg-tertiary/60 hover:text-text-primary disabled:pointer-events-none disabled:opacity-40",
    e1 = (e, t) => {
      let r = Math.max(172, e.clientWidth - 172),
        a = e.scrollLeft + t * r;
      "function" == typeof e.scrollTo
        ? e.scrollTo({ left: a, behavior: "smooth" })
        : (e.scrollLeft = a);
    },
    e2 = (e) => {
      let t,
        r,
        n,
        i,
        d,
        o,
        c,
        u,
        m,
        p,
        x,
        b,
        h,
        f,
        g,
        y,
        w,
        j,
        v,
        N,
        _,
        k,
        z = (0, s.c)(64),
        { highlight: I, position: U, window: S } = e,
        { t: C } = (0, l.f)();
      z[0] !== I.coinPnl ||
      z[1] !== I.mint ||
      z[2] !== I.pnlUsd ||
      z[3] !== I.username ||
      z[4] !== I.walletAddress ||
      z[5] !== C ||
      z[6] !== S
        ? ((t = I.username ?? C("web.leaderboard.cup.anonymous")),
          (r = I.pnlUsd >= 0 ? "text-gain" : "text-loss"),
          (n = "button"),
          z[12] !== I.coinPnl ||
          z[13] !== I.mint ||
          z[14] !== I.username ||
          z[15] !== I.walletAddress ||
          z[16] !== S
            ? ((i = () => {
                var e;
                return (0, eE.C)({
                  mint: I.mint,
                  walletAddress: I.walletAddress,
                  ownerLabel: I.username ?? void 0,
                  initialTab: "replay",
                  scope: S ?? void 0,
                  headline:
                    ((e = I.coinPnl)
                      ? {
                          netPnlUsd: e.pnlUsd,
                          displayPct:
                            e.buySpendUsd > 0
                              ? (e.pnlUsd / e.buySpendUsd) * 100
                              : null,
                        }
                      : null) ?? void 0,
                });
              }),
              (z[12] = I.coinPnl),
              (z[13] = I.mint),
              (z[14] = I.username),
              (z[15] = I.walletAddress),
              (z[16] = S),
              (z[17] = i))
            : (i = z[17]),
          (d = C("web.leaderboard.cup.play_kill_cam", { name: t })),
          (z[0] = I.coinPnl),
          (z[1] = I.mint),
          (z[2] = I.pnlUsd),
          (z[3] = I.username),
          (z[4] = I.walletAddress),
          (z[5] = C),
          (z[6] = S),
          (z[7] = t),
          (z[8] = r),
          (z[9] = n),
          (z[10] = i),
          (z[11] = d))
        : ((t = z[7]), (r = z[8]), (n = z[9]), (i = z[10]), (d = z[11]));
      let P = I.key;
      if (z[18] !== I.thumbnail) {
        var q;
        let e;
        ((o =
          "avatar_clip" === (q = I.thumbnail).type
            ? ((e = q.uid), (0, ez.m)({ videoId: e, width: 540, height: 960 }))
            : ((0, eY.Z)({ sourceUrl: q.url, width: 320 }) ?? q.url)),
          (z[18] = I.thumbnail),
          (z[19] = o));
      } else o = z[19];
      (z[20] !== o
        ? ((c = (0, a.jsx)("img", {
            src: o,
            alt: "",
            loading: "lazy",
            className: "absolute inset-0 size-full object-cover",
          })),
          (z[20] = o),
          (z[21] = c))
        : (c = z[21]),
        z[22] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = (0, a.jsx)("div", {
              "aria-hidden": !0,
              className:
                "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary/85",
            })),
            (z[22] = u))
          : (u = z[22]),
        z[23] !== U || z[24] !== C
          ? ((m = C("web.leaderboard.cup.tier_single", { rank: U })),
            (z[23] = U),
            (z[24] = C),
            (z[25] = m))
          : (m = z[25]),
        z[26] !== m
          ? ((p = (0, a.jsx)("span", {
              className:
                "self-start rounded bg-text-primary px-1.5 py-0.5 text-[10px] font-semibold text-black",
              children: m,
            })),
            (z[26] = m),
            (z[27] = p))
          : (p = z[27]),
        z[28] !== I.squadName
          ? ((x = I.squadName
              ? (0, a.jsx)("span", {
                  className: "truncate text-sm font-semibold text-text-primary",
                  children: I.squadName,
                })
              : null),
            (z[28] = I.squadName),
            (z[29] = x))
          : (x = z[29]));
      let F = I.walletAddress;
      (z[30] !== I.profileImageUrl
        ? ((b = (0, V.f)(I.profileImageUrl)),
          (z[30] = I.profileImageUrl),
          (z[31] = b))
        : (b = z[31]),
        z[32] !== I.walletAddress || z[33] !== b
          ? ((h = (0, a.jsx)(Z.f, {
              address: F,
              alt: "",
              className: "size-5 shrink-0 rounded-full object-cover",
              height: 20,
              ipfsPrefix: W.f,
              isAnonymous: !1,
              src: b,
              width: 20,
            })),
            (z[32] = I.walletAddress),
            (z[33] = b),
            (z[34] = h))
          : (h = z[34]));
      let L = I.squadName
        ? "text-xs font-medium text-text-secondary"
        : "text-sm font-semibold text-text-primary";
      (z[35] !== L
        ? ((f = (0, A.c)("truncate", L)), (z[35] = L), (z[36] = f))
        : (f = z[36]),
        z[37] !== t || z[38] !== f
          ? ((g = (0, a.jsx)("span", { className: f, children: t })),
            (z[37] = t),
            (z[38] = f),
            (z[39] = g))
          : (g = z[39]),
        z[40] !== h || z[41] !== g
          ? ((y = (0, a.jsxs)("span", {
              className: "flex min-w-0 items-center gap-1.5",
              children: [h, g],
            })),
            (z[40] = h),
            (z[41] = g),
            (z[42] = y))
          : (y = z[42]),
        z[43] !== r
          ? ((w = (0, A.c)("truncate text-xs font-semibold", r)),
            (z[43] = r),
            (z[44] = w))
          : (w = z[44]),
        z[45] !== I.pnlUsd
          ? ((j = (0, H.w)(I.pnlUsd)), (z[45] = I.pnlUsd), (z[46] = j))
          : (j = z[46]));
      let M = `${I.pnlUsd > 0 ? "+" : ""}${j}`;
      return (
        z[47] !== w || z[48] !== M
          ? ((v = (0, a.jsx)("span", { className: w, children: M })),
            (z[47] = w),
            (z[48] = M),
            (z[49] = v))
          : (v = z[49]),
        z[50] !== x || z[51] !== y || z[52] !== v
          ? ((N = (0, a.jsxs)("span", {
              className: "flex min-w-0 flex-col gap-1",
              children: [x, y, v],
            })),
            (z[50] = x),
            (z[51] = y),
            (z[52] = v),
            (z[53] = N))
          : (N = z[53]),
        z[54] !== N || z[55] !== p
          ? ((_ = (0, a.jsxs)("div", {
              className: "relative flex h-full flex-col justify-between p-3",
              children: [p, N],
            })),
            (z[54] = N),
            (z[55] = p),
            (z[56] = _))
          : (_ = z[56]),
        z[57] !== I.key ||
        z[58] !== n ||
        z[59] !== i ||
        z[60] !== _ ||
        z[61] !== d ||
        z[62] !== c
          ? ((k = (0, a.jsxs)("button", {
              type: n,
              onClick: i,
              "aria-label": d,
              "data-testid": "cup-highlight",
              "data-highlight-key": P,
              className:
                "relative aspect-[9/16] w-40 shrink-0 overflow-hidden rounded-md bg-bg-secondary text-left transition-transform hover:scale-[0.99]",
              children: [c, u, _],
            })),
            (z[57] = I.key),
            (z[58] = n),
            (z[59] = i),
            (z[60] = _),
            (z[61] = d),
            (z[62] = c),
            (z[63] = k))
          : (k = z[63]),
        k
      );
    },
    e3 = (e) => {
      let t,
        r,
        n,
        d,
        o,
        c,
        u,
        m,
        p,
        x,
        b,
        h,
        f,
        g,
        y,
        w,
        j,
        v,
        N = (0, s.c)(43),
        { competitionId: _, entries: k, window: z } = e,
        I = void 0 === z ? null : z,
        { t: U } = (0, l.f)();
      N[0] !== _ || N[1] !== k
        ? ((t = { competitionId: _, entries: k }),
          (N[0] = _),
          (N[1] = k),
          (N[2] = t))
        : (t = N[2]);
      let A = (({ competitionId: e, entries: t }) => {
          let r,
            a = ((e, t) => {
              let r,
                a = eB(t, "person")
                  .filter((e) => null !== e.walletAddress)
                  .slice(0, 10),
                s = eB(t, "group").slice(0, 5),
                l = eX(e, a),
                n = eX(e, s),
                i =
                  ((r = (0, eR.useClientServerContract)()),
                  (0, eT.f)({
                    queries: s.map((t) => ({
                      queryKey: eV.f.entry(e, t.entryId),
                      queryFn: ({ signal: a }) =>
                        r("GET /competitions/{id}/entries/{entryId}", {
                          params: { id: e, entryId: t.entryId },
                          signal: a,
                        }),
                      staleTime: 6e4,
                    })),
                    combine: (e) => e.map(eH),
                  }));
              return (({
                traders: e,
                traderReels: t,
                squads: r,
                squadReels: a,
                rosters: s,
              }) => [
                ...eQ(
                  e.map((e, r) => ({ trader: e, reel: t[r] })),
                  ({ reel: e }) => void 0 === e,
                ).flatMap(({ trader: e, reel: t }) => {
                  let r;
                  return null ===
                    (r = ((e, t) => {
                      let r,
                        a =
                          (r = t?.tokens.find((e) => eK(e) && e.pnlUsd > 0)) &&
                          eZ(r.pnlUsd, e.pnlUsd)
                            ? r
                            : null;
                      if (a) return { mint: a.mint, leg: a };
                      if (
                        e.pnlUsd > 0 &&
                        (t?.tokens[0]?.pnlUsd ?? 0) >= 0.1 * e.pnlUsd
                      )
                        return null;
                      let s = e.topPositions.find(eK);
                      return s ? { mint: s.mint, leg: null } : null;
                    })(e, t)) || null === e.walletAddress
                    ? []
                    : [
                        {
                          key: e.entryId,
                          walletAddress: e.walletAddress,
                          username: e.username,
                          profileImageUrl: e.profileImageUrl,
                          squadName: null,
                          pnlUsd: e.pnlUsd,
                          mint: r.mint,
                          coinPnl: eD(r.leg),
                        },
                      ];
                }),
                ...eQ(
                  r.map((e, t) => ({ squad: e, reel: a[t], roster: s[t] })),
                  ({ reel: e, roster: t }) => void 0 === e || void 0 === t,
                ).flatMap(({ squad: e, reel: t, roster: r }) => {
                  var a;
                  return r
                    ? ((a = r.members),
                      t
                        ? [...a]
                            .sort((e, t) => t.pnlUsd - e.pnlUsd)
                            .flatMap((r) => {
                              let a;
                              if (null === r.walletAddress || r.pnlUsd <= 0)
                                return [];
                              let s =
                                (a = t.tokens
                                  .flatMap((e) => {
                                    if (!eK(e)) return [];
                                    let t = e.members.find(
                                      (e) => e.userId === r.userId,
                                    );
                                    return t && t.pnlUsd > 0
                                      ? [{ mint: e.mint, leg: t }]
                                      : [];
                                  })
                                  .reduce(
                                    (e, t) =>
                                      null !== e && e.leg.pnlUsd >= t.leg.pnlUsd
                                        ? e
                                        : t,
                                    null,
                                  )) && eZ(a.leg.pnlUsd, r.pnlUsd)
                                  ? a
                                  : null;
                              return null === s
                                ? []
                                : [
                                    {
                                      key: `${e.entryId}:${r.userId}`,
                                      walletAddress: r.walletAddress,
                                      username: r.username,
                                      profileImageUrl: r.profileImageUrl,
                                      squadName: e.username,
                                      pnlUsd: r.pnlUsd,
                                      mint: s.mint,
                                      coinPnl: eD(s.leg),
                                    },
                                  ];
                            })
                            .slice(0, 2)
                        : [])
                    : [];
                }),
              ])({
                traders: a,
                traderReels: l,
                squads: s,
                squadReels: n,
                rosters: i,
              });
            })(e, t),
            s =
              ((r = [...new Set(a.map((e) => e.walletAddress))]),
              (0, eT.f)({
                queries: r.map((e) => ({
                  queryKey: eV.f.highlightMedia(e),
                  queryFn: () =>
                    new Promise((t, r) => {
                      eW || ((eW = new Map()), queueMicrotask(() => void eG()));
                      let a = eW.get(e) ?? [];
                      (a.push({ resolve: t, reject: r }), eW.set(e, a));
                    }),
                  staleTime: 18e5,
                  retry: !1,
                })),
                combine: (e) =>
                  new Map(
                    r.map((t, r) => {
                      var a;
                      let s;
                      return [
                        t,
                        {
                          isLoading: e[r]?.isPending ?? !0,
                          pnlLoopUid:
                            ((a = e[r]?.data),
                            "string" == typeof (s = a?.pnlLoop?.uid) && "" !== s
                              ? s
                              : null),
                        },
                      ];
                    }),
                  ),
              }));
          return a
            .flatMap((e) => {
              let t = ((e, t) => {
                if (t?.isLoading) return null;
                let r = t?.pnlLoopUid;
                return r
                  ? { type: "avatar_clip", uid: r }
                  : e.profileImageUrl
                    ? { type: "image", url: e.profileImageUrl }
                    : null;
              })(e, s.get(e.walletAddress));
              return t
                ? [
                    {
                      key: e.key,
                      walletAddress: e.walletAddress,
                      username: e.username,
                      profileImageUrl: e.profileImageUrl,
                      squadName: e.squadName,
                      pnlUsd: e.pnlUsd,
                      mint: e.mint,
                      coinPnl: e.coinPnl,
                      thumbnail: t,
                    },
                  ]
                : [];
            })
            .slice(0, 10);
        })(t),
        S = (0, i.useRef)(null),
        { canPrev: C, canNext: P } = ((e, t) => {
          let r,
            a,
            l,
            n = (0, s.c)(6);
          n[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((r = { canPrev: !1, canNext: !1 }), (n[0] = r))
            : (r = n[0]);
          let [d, o] = (0, i.useState)(r);
          return (
            n[1] !== e
              ? ((a = () => {
                  let t = e.current;
                  if (!t) return;
                  let r = () => {
                    let e = t.scrollLeft > 2,
                      r = t.scrollLeft + t.clientWidth < t.scrollWidth - 2;
                    o((t) =>
                      t.canPrev === e && t.canNext === r
                        ? t
                        : { canPrev: e, canNext: r },
                    );
                  };
                  (r(), t.addEventListener("scroll", r, { passive: !0 }));
                  let a =
                    "u" < typeof ResizeObserver ? null : new ResizeObserver(r);
                  return (
                    a?.observe(t),
                    () => {
                      (t.removeEventListener("scroll", r), a?.disconnect());
                    }
                  );
                }),
                (n[1] = e),
                (n[2] = a))
              : (a = n[2]),
            n[3] !== t || n[4] !== e
              ? ((l = [e, t]), (n[3] = t), (n[4] = e), (n[5] = l))
              : (l = n[5]),
            (0, i.useEffect)(a, l),
            d
          );
        })(S, A.length);
      if (0 === A.length) return null;
      (N[3] !== U
        ? ((r = U("web.leaderboard.cup.highlights")), (N[3] = U), (N[4] = r))
        : (r = N[4]),
        N[5] !== U
          ? ((n = U("web.leaderboard.cup.highlights")), (N[5] = U), (N[6] = n))
          : (n = N[6]),
        N[7] !== n
          ? ((d = (0, a.jsx)("h2", {
              className:
                "text-xs font-medium uppercase tracking-wider text-text-tertiary",
              children: n,
            })),
            (N[7] = n),
            (N[8] = d))
          : (d = N[8]),
        N[9] !== U
          ? ((o = U("web.leaderboard.cup.highlights")), (N[9] = U), (N[10] = o))
          : (o = N[10]),
        N[11] !== U
          ? ((c = U("common.back")), (N[11] = U), (N[12] = c))
          : (c = N[12]));
      let F = !C;
      (N[13] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = () => {
            S.current && e1(S.current, -1);
          }),
          (N[13] = u))
        : (u = N[13]),
        N[14] === Symbol.for("react.memo_cache_sentinel")
          ? ((m = (0, a.jsx)(q.S, { className: "size-4" })), (N[14] = m))
          : (m = N[14]),
        N[15] !== c || N[16] !== F
          ? ((p = (0, a.jsx)("button", {
              type: "button",
              "aria-label": c,
              className: e0,
              disabled: F,
              onClick: u,
              "data-testid": "cup-highlights-prev",
              children: m,
            })),
            (N[15] = c),
            (N[16] = F),
            (N[17] = p))
          : (p = N[17]),
        N[18] !== U
          ? ((x = U("common.next")), (N[18] = U), (N[19] = x))
          : (x = N[19]));
      let L = !P;
      if (
        (N[20] === Symbol.for("react.memo_cache_sentinel")
          ? ((b = () => {
              S.current && e1(S.current, 1);
            }),
            (N[20] = b))
          : (b = N[20]),
        N[21] === Symbol.for("react.memo_cache_sentinel")
          ? ((h = (0, a.jsx)(q.kK, { className: "size-4" })), (N[21] = h))
          : (h = N[21]),
        N[22] !== x || N[23] !== L
          ? ((f = (0, a.jsx)("button", {
              type: "button",
              "aria-label": x,
              className: e0,
              disabled: L,
              onClick: b,
              "data-testid": "cup-highlights-next",
              children: h,
            })),
            (N[22] = x),
            (N[23] = L),
            (N[24] = f))
          : (f = N[24]),
        N[25] !== p || N[26] !== f || N[27] !== o
          ? ((g = (0, a.jsxs)("nav", {
              "aria-label": o,
              className: "hidden items-center gap-2 sm:flex",
              children: [p, f],
            })),
            (N[25] = p),
            (N[26] = f),
            (N[27] = o),
            (N[28] = g))
          : (g = N[28]),
        N[29] !== g || N[30] !== d
          ? ((y = (0, a.jsxs)("div", {
              className: "flex items-center justify-between gap-3",
              children: [d, g],
            })),
            (N[29] = g),
            (N[30] = d),
            (N[31] = y))
          : (y = N[31]),
        N[32] !== A || N[33] !== I)
      ) {
        let e;
        (N[35] !== I
          ? ((e = (e, t) =>
              (0, a.jsx)(
                e2,
                { highlight: e, position: t + 1, window: I },
                e.key,
              )),
            (N[35] = I),
            (N[36] = e))
          : (e = N[36]),
          (w = A.map(e)),
          (N[32] = A),
          (N[33] = I),
          (N[34] = w));
      } else w = N[34];
      return (
        N[37] !== w
          ? ((j = (0, a.jsx)("div", {
              ref: S,
              className:
                "flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              "data-testid": "cup-highlights-rail",
              children: w,
            })),
            (N[37] = w),
            (N[38] = j))
          : (j = N[38]),
        N[39] !== y || N[40] !== j || N[41] !== r
          ? ((v = (0, a.jsxs)("section", {
              className: "flex flex-col gap-3",
              "data-testid": "cup-highlights",
              "aria-label": r,
              children: [y, j],
            })),
            (N[39] = y),
            (N[40] = j),
            (N[41] = r),
            (N[42] = v))
          : (v = N[42]),
        v
      );
    };
  var e4 = e.i(363250);
  let e5 = (e, t) => {
      if (null == t) return { label: e, value: "—", tone: "neutral" };
      let r = 0.005 > Math.abs(t) ? 0 : t;
      return {
        label: e,
        value: (0, H.w)(r),
        tone: 0 === r ? "neutral" : r > 0 ? "gain" : "loss",
      };
    },
    e6 = { gain: "text-gain", loss: "text-loss", neutral: "text-text-primary" };
  function e7(e) {
    let t,
      r,
      l,
      n,
      i = (0, s.c)(9),
      { entry: d, className: o } = e;
    i[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((t = {}), (i[0] = t))
      : (t = i[0]);
    let { data: c } = (0, e4.f)(t);
    return (
      i[1] !== o
        ? ((r = (0, A.c)("grid grid-cols-3 gap-2", o)), (i[1] = o), (i[2] = r))
        : (r = i[2]),
      i[3] !== d || i[4] !== c
        ? ((l = (({ entry: e, solPriceUsd: t }) => [
            e5("Realized", e?.realizedPnlUsd),
            e5("Unrealized", e?.unrealizedPnlUsd),
            {
              label: "Volume",
              value:
                e?.buySpendSol != null && t ? (0, H.v)(e.buySpendSol * t) : "—",
              tone: "neutral",
            },
          ])({ entry: d, solPriceUsd: c }).map(e8)),
          (i[3] = d),
          (i[4] = c),
          (i[5] = l))
        : (l = i[5]),
      i[6] !== r || i[7] !== l
        ? ((n = (0, a.jsx)("div", { className: r, children: l })),
          (i[6] = r),
          (i[7] = l),
          (i[8] = n))
        : (n = i[8]),
      n
    );
  }
  function e8(e) {
    return (0, a.jsxs)(
      "div",
      {
        className:
          "flex min-w-0 flex-col gap-0.5 rounded-xl bg-bg-tertiary px-3 py-2",
        children: [
          (0, a.jsx)("span", {
            className:
              "truncate text-[10px] font-medium uppercase tracking-wider text-text-tertiary",
            children: e.label,
          }),
          (0, a.jsx)("span", {
            className: (0, A.c)(
              "truncate text-sm font-semibold tabular-nums",
              e6[e.tone],
            ),
            children: e.value,
          }),
        ],
      },
      e.label,
    );
  }
  function e9(e) {
    let t,
      r,
      n,
      d,
      o,
      c,
      u,
      m,
      p,
      x,
      b,
      h,
      f,
      g,
      y,
      w,
      j,
      v,
      N,
      _,
      k,
      z,
      I,
      U,
      S,
      F,
      L = (0, s.c)(76),
      { entry: M } = e,
      { t: $ } = (0, l.f)(),
      [E, R] = (0, i.useState)(!1),
      T = "group" === M.kind;
    L[0] !== M.username || L[1] !== M.walletAddress || L[2] !== T || L[3] !== $
      ? ((t =
          M.username ??
          (T
            ? $("web.leaderboard.squads_unnamed_row")
            : M.walletAddress
              ? (0, P.d)(M.walletAddress)
              : $("web.leaderboard.cup.anonymous"))),
        (L[0] = M.username),
        (L[1] = M.walletAddress),
        (L[2] = T),
        (L[3] = $),
        (L[4] = t))
      : (t = L[4]);
    let O = t,
      D =
        0 === M.pnlUsd
          ? "text-text-primary"
          : M.pnlUsd > 0
            ? "text-gain"
            : "text-loss";
    L[5] !== M.participantId ||
    L[6] !== M.username ||
    L[7] !== M.walletAddress ||
    L[8] !== T
      ? ((r = T
          ? (0, G.Z)({ groupId: M.participantId, username: M.username })
          : (0, C.$)(M.walletAddress ?? M.participantId)),
        (L[5] = M.participantId),
        (L[6] = M.username),
        (L[7] = M.walletAddress),
        (L[8] = T),
        (L[9] = r))
      : (r = L[9]);
    let K = r,
      B = M.walletAddress ?? M.participantId,
      J = T ? "rounded-xl" : "rounded-full";
    (L[10] !== J
      ? ((n = (0, A.c)("size-10 object-cover", J)), (L[10] = J), (L[11] = n))
      : (n = L[11]),
      L[12] !== M.profileImageUrl
        ? ((d = (0, V.f)(M.profileImageUrl)),
          (L[12] = M.profileImageUrl),
          (L[13] = d))
        : (d = L[13]),
      L[14] !== B || L[15] !== n || L[16] !== d
        ? ((o = (0, a.jsx)(Z.f, {
            address: B,
            alt: "",
            className: n,
            height: 40,
            ipfsPrefix: W.f,
            isAnonymous: !1,
            src: d,
            width: 40,
          })),
          (L[14] = B),
          (L[15] = n),
          (L[16] = d),
          (L[17] = o))
        : (o = L[17]),
      L[18] !== T || L[19] !== $
        ? ((c = T
            ? null
            : (0, a.jsx)("span", {
                className:
                  "absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-white px-1.5 text-[9px] font-bold uppercase leading-[14px] text-black",
                children: $("web.leaderboard.you_badge"),
              })),
          (L[18] = T),
          (L[19] = $),
          (L[20] = c))
        : (c = L[20]),
      L[21] !== O || L[22] !== K || L[23] !== o || L[24] !== c
        ? ((u = (0, a.jsxs)(Q.default, {
            href: K,
            prefetch: !1,
            className: "relative shrink-0",
            "aria-label": O,
            children: [o, c],
          })),
          (L[21] = O),
          (L[22] = K),
          (L[23] = o),
          (L[24] = c),
          (L[25] = u))
        : (u = L[25]),
      L[26] !== O
        ? ((m = (0, a.jsx)("span", {
            className: "truncate text-sm font-semibold text-text-primary",
            children: O,
          })),
          (L[26] = O),
          (L[27] = m))
        : (m = L[27]),
      L[28] !== $
        ? ((p = $("kolscan.top_charts.profit_usd_header")),
          (L[28] = $),
          (L[29] = p))
        : (p = L[29]),
      L[30] !== p
        ? ((x = (0, a.jsx)("span", {
            className:
              "shrink-0 text-[10px] font-medium uppercase tracking-wider text-text-tertiary",
            children: p,
          })),
          (L[30] = p),
          (L[31] = x))
        : (x = L[31]),
      L[32] !== m || L[33] !== x
        ? ((b = (0, a.jsxs)("div", {
            className: "flex items-baseline justify-between gap-2",
            children: [m, x],
          })),
          (L[32] = m),
          (L[33] = x),
          (L[34] = b))
        : (b = L[34]),
      L[35] !== T || L[36] !== $
        ? ((h = $(
            T
              ? "web.leaderboard.cup.your_squad"
              : "kolscan.top_charts.your_rank",
          )),
          (L[35] = T),
          (L[36] = $),
          (L[37] = h))
        : (h = L[37]));
    let X = M.rank > 0 ? `#${M.rank}` : "#—";
    return (
      L[38] !== X
        ? ((f = (0, a.jsx)("span", {
            className: "font-semibold text-gain",
            children: X,
          })),
          (L[38] = X),
          (L[39] = f))
        : (f = L[39]),
      L[40] !== h || L[41] !== f
        ? ((g = (0, a.jsxs)("span", {
            className: "flex items-baseline gap-1 text-xs text-text-tertiary",
            children: [h, f],
          })),
          (L[40] = h),
          (L[41] = f),
          (L[42] = g))
        : (g = L[42]),
      L[43] !== D
        ? ((y = (0, A.c)("shrink-0 text-sm font-bold tabular-nums", D)),
          (L[43] = D),
          (L[44] = y))
        : (y = L[44]),
      L[45] !== M.pnlUsd
        ? ((w = (0, H.w)(M.pnlUsd)), (L[45] = M.pnlUsd), (L[46] = w))
        : (w = L[46]),
      L[47] !== y || L[48] !== w
        ? ((j = (0, a.jsx)("span", {
            className: y,
            "data-testid": "cup-rank-card-pnl",
            children: w,
          })),
          (L[47] = y),
          (L[48] = w),
          (L[49] = j))
        : (j = L[49]),
      L[50] !== g || L[51] !== j
        ? ((v = (0, a.jsxs)("div", {
            className: "flex items-baseline justify-between gap-2",
            children: [g, j],
          })),
          (L[50] = g),
          (L[51] = j),
          (L[52] = v))
        : (v = L[52]),
      L[53] !== b || L[54] !== v
        ? ((N = (0, a.jsxs)("div", {
            className: "min-w-0 flex-1",
            children: [b, v],
          })),
          (L[53] = b),
          (L[54] = v),
          (L[55] = N))
        : (N = L[55]),
      L[56] !== E || L[57] !== $
        ? ((_ = $(
            E
              ? "kolscan.top_charts.hide_stats"
              : "kolscan.top_charts.show_stats",
          )),
          (L[56] = E),
          (L[57] = $),
          (L[58] = _))
        : (_ = L[58]),
      L[59] === Symbol.for("react.memo_cache_sentinel")
        ? ((k = () => R(te)), (L[59] = k))
        : (k = L[59]),
      L[60] !== E
        ? ((z = E
            ? (0, a.jsx)(q.cg, { className: "size-4" })
            : (0, a.jsx)(q.J0, { className: "size-4" })),
          (L[60] = E),
          (L[61] = z))
        : (z = L[61]),
      L[62] !== E || L[63] !== _ || L[64] !== z
        ? ((I = (0, a.jsx)("button", {
            type: "button",
            "aria-expanded": E,
            "aria-label": _,
            onClick: k,
            className:
              "shrink-0 rounded-full p-1.5 text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
            children: z,
          })),
          (L[62] = E),
          (L[63] = _),
          (L[64] = z),
          (L[65] = I))
        : (I = L[65]),
      L[66] !== N || L[67] !== I || L[68] !== u
        ? ((U = (0, a.jsxs)("div", {
            className: "flex items-center gap-3",
            children: [u, N, I],
          })),
          (L[66] = N),
          (L[67] = I),
          (L[68] = u),
          (L[69] = U))
        : (U = L[69]),
      L[70] !== M || L[71] !== E
        ? ((S = E
            ? (0, a.jsx)(e7, {
                entry: M,
                className: "mt-3 border-t border-border-tertiary pt-3",
              })
            : null),
          (L[70] = M),
          (L[71] = E),
          (L[72] = S))
        : (S = L[72]),
      L[73] !== U || L[74] !== S
        ? ((F = (0, a.jsxs)("div", {
            "data-testid": "cup-rank-card",
            className: "rounded-2xl bg-bg-secondary px-4 py-3",
            children: [U, S],
          })),
          (L[73] = U),
          (L[74] = S),
          (L[75] = F))
        : (F = L[75]),
      F
    );
  }
  function te(e) {
    return !e;
  }
  let tt = (e) => {
      let t,
        r,
        l = (0, s.c)(5),
        { title: n, children: i } = e;
      return (
        l[0] !== n
          ? ((t = (0, a.jsx)("h3", {
              className:
                "text-xs font-medium uppercase tracking-wider text-text-tertiary",
              children: n,
            })),
            (l[0] = n),
            (l[1] = t))
          : (t = l[1]),
        l[2] !== i || l[3] !== t
          ? ((r = (0, a.jsxs)("section", {
              className: "flex flex-col gap-2",
              children: [t, i],
            })),
            (l[2] = i),
            (l[3] = t),
            (l[4] = r))
          : (r = l[4]),
        r
      );
    },
    tr = (e) => {
      let t,
        r,
        n,
        i,
        d = (0, s.c)(11),
        { label: o, start: c, end: u } = e,
        { t: m } = (0, l.f)();
      return c && u
        ? (d[0] !== o
            ? ((t = (0, a.jsx)("span", {
                className: "text-sm text-text-secondary",
                children: o,
              })),
              (d[0] = o),
              (d[1] = t))
            : (t = d[1]),
          d[2] !== u || d[3] !== c || d[4] !== m
            ? ((r = m("web.leaderboard.cup.rules.range", { start: c, end: u })),
              (d[2] = u),
              (d[3] = c),
              (d[4] = m),
              (d[5] = r))
            : (r = d[5]),
          d[6] !== r
            ? ((n = (0, a.jsx)("span", {
                className:
                  "min-w-0 flex-1 text-right text-sm text-text-primary",
                children: r,
              })),
              (d[6] = r),
              (d[7] = n))
            : (n = d[7]),
          d[8] !== t || d[9] !== n
            ? ((i = (0, a.jsxs)("div", {
                className: "flex items-start justify-between gap-4",
                children: [t, n],
              })),
              (d[8] = t),
              (d[9] = n),
              (d[10] = i))
            : (i = d[10]),
          i)
        : null;
    },
    ta = (e) => {
      let t,
        r,
        n,
        i,
        d,
        o,
        c = (0, s.c)(25),
        { prize: u, locale: m } = e,
        { t: p } = (0, l.f)(),
        x = u.rankTo > u.rankFrom;
      if (
        c[0] !== x ||
        c[1] !== m ||
        c[2] !== u.amount ||
        c[3] !== u.rankFrom ||
        c[4] !== u.rankTo ||
        c[5] !== p
      ) {
        let e,
          s = (0, $.k)({ text: u.amount, locale: m });
        ((n = "flex items-center justify-between gap-4"),
          c[10] !== x ||
          c[11] !== m ||
          c[12] !== u.rankFrom ||
          c[13] !== u.rankTo ||
          c[14] !== p
            ? ((e = x
                ? p("web.leaderboard.cup.tier_range", {
                    from: (0, E.Z)(u.rankFrom, m),
                    to: (0, E.Z)(u.rankTo, m),
                  })
                : p("web.leaderboard.cup.tier_single", {
                    rank: (0, E.Z)(u.rankFrom, m),
                  })),
              (c[10] = x),
              (c[11] = m),
              (c[12] = u.rankFrom),
              (c[13] = u.rankTo),
              (c[14] = p),
              (c[15] = e))
            : (e = c[15]),
          c[16] !== e
            ? ((i = (0, a.jsx)("span", {
                className: "text-sm text-text-secondary",
                children: e,
              })),
              (c[16] = e),
              (c[17] = i))
            : (i = c[17]),
          (t = "text-sm text-text-primary"),
          (r = x ? p("web.leaderboard.cup.tier_each", { amount: s }) : s),
          (c[0] = x),
          (c[1] = m),
          (c[2] = u.amount),
          (c[3] = u.rankFrom),
          (c[4] = u.rankTo),
          (c[5] = p),
          (c[6] = t),
          (c[7] = r),
          (c[8] = n),
          (c[9] = i));
      } else ((t = c[6]), (r = c[7]), (n = c[8]), (i = c[9]));
      return (
        c[18] !== t || c[19] !== r
          ? ((d = (0, a.jsx)("span", { className: t, children: r })),
            (c[18] = t),
            (c[19] = r),
            (c[20] = d))
          : (d = c[20]),
        c[21] !== n || c[22] !== i || c[23] !== d
          ? ((o = (0, a.jsxs)("div", { className: n, children: [i, d] })),
            (c[21] = n),
            (c[22] = i),
            (c[23] = d),
            (c[24] = o))
          : (o = c[24]),
        o
      );
    },
    ts = (e) => {
      let t,
        r,
        n = (0, s.c)(41),
        { competition: i, locale: d } = e,
        { t: o } = (0, l.f)(),
        c = "group" === i.kind;
      if (
        n[0] !== i.endsAt ||
        n[1] !== i.maxMembers ||
        n[2] !== i.minMembers ||
        n[3] !== i.registrationClosesAt ||
        n[4] !== c ||
        n[5] !== d ||
        n[6] !== o
      ) {
        let e,
          r,
          a,
          s,
          l,
          u,
          m,
          p,
          x = (0, E._)(i.endsAt, d);
        if (
          n[8] !== i.registrationClosesAt ||
          n[9] !== c ||
          n[10] !== d ||
          n[11] !== o
        ) {
          let t = (0, E._)(i.registrationClosesAt, d);
          ((e = "join"),
            (r = c
              ? t
                ? o("web.leaderboard.cup.rules.rule_join_squad", { date: t })
                : o("web.leaderboard.cup.rules.rule_join_squad_undated")
              : t
                ? o("web.leaderboard.cup.rules.rule_join_solo", { date: t })
                : o("web.leaderboard.cup.rules.rule_join_solo_undated")),
            (n[8] = i.registrationClosesAt),
            (n[9] = c),
            (n[10] = d),
            (n[11] = o),
            (n[12] = e),
            (n[13] = r));
        } else ((e = n[12]), (r = n[13]));
        if (
          (n[14] !== e || n[15] !== r
            ? ((a = { id: e, text: r }), (n[14] = e), (n[15] = r), (n[16] = a))
            : (a = n[16]),
          n[17] !== o
            ? ((s = o("web.leaderboard.cup.rules.rule_manipulation")),
              (n[17] = o),
              (n[18] = s))
            : (s = n[18]),
          n[19] !== s
            ? ((l = { id: "manipulation", text: s }), (n[19] = s), (n[20] = l))
            : (l = n[20]),
          n[21] !== o
            ? ((u = o("web.leaderboard.cup.rules.rule_profit_tracked")),
              (n[21] = o),
              (n[22] = u))
            : (u = n[22]),
          n[23] !== u
            ? ((m = { id: "profit_tracked", text: u }),
              (n[23] = u),
              (n[24] = m))
            : (m = n[24]),
          (t = [a, l, m]),
          c)
        ) {
          let e, r;
          (n[25] !== i.maxMembers ||
          n[26] !== i.minMembers ||
          n[27] !== d ||
          n[28] !== o
            ? ((e = o("web.leaderboard.cup.rules.rule_squad_size", {
                min: (0, E.Z)(i.minMembers, d),
                max: (0, E.Z)(i.maxMembers, d),
              })),
              (n[25] = i.maxMembers),
              (n[26] = i.minMembers),
              (n[27] = d),
              (n[28] = o),
              (n[29] = e))
            : (e = n[29]),
            n[30] !== e
              ? ((r = { id: "squad_size", text: e }), (n[30] = e), (n[31] = r))
              : (r = n[31]),
            t.push(r));
        }
        let b = x
          ? o("web.leaderboard.cup.rules.rule_winners", { date: x })
          : o("web.leaderboard.cup.rules.rule_winners_undated");
        if (
          (n[32] !== b
            ? ((p = { id: "winners", text: b }), (n[32] = b), (n[33] = p))
            : (p = n[33]),
          t.push(p),
          c)
        ) {
          let e, r;
          (n[34] !== o
            ? ((e = o("web.leaderboard.cup.rules.rule_squad_pro_rata")),
              (n[34] = o),
              (n[35] = e))
            : (e = n[35]),
            n[36] !== e
              ? ((r = { id: "pro_rata", text: e }), (n[36] = e), (n[37] = r))
              : (r = n[37]),
            t.push(r));
        }
        ((n[0] = i.endsAt),
          (n[1] = i.maxMembers),
          (n[2] = i.minMembers),
          (n[3] = i.registrationClosesAt),
          (n[4] = c),
          (n[5] = d),
          (n[6] = o),
          (n[7] = t));
      } else t = n[7];
      return (
        n[38] !== d || n[39] !== t
          ? ((r = (0, a.jsx)("ol", {
              className: "flex flex-col gap-2",
              "data-testid": "cup-rules-list",
              children: t.map((e, t) =>
                (0, a.jsxs)(
                  "li",
                  {
                    className: "flex items-start gap-3",
                    children: [
                      (0, a.jsx)("span", {
                        className:
                          "w-5 shrink-0 text-sm tabular-nums text-text-tertiary",
                        children: (0, E.Z)(t + 1, d),
                      }),
                      (0, a.jsx)("span", {
                        className: "min-w-0 flex-1 text-sm text-text-secondary",
                        children: e.text,
                      }),
                    ],
                  },
                  e.id,
                ),
              ),
            })),
            (n[38] = d),
            (n[39] = t),
            (n[40] = r))
          : (r = n[40]),
        r
      );
    },
    tl = (e) => {
      let t,
        r,
        n,
        i,
        d,
        o,
        c,
        u,
        m,
        p,
        x,
        b,
        h,
        f,
        g,
        y = (0, s.c)(85),
        { competition: w, onClose: j } = e,
        { t: v, i18n: N } = (0, l.f)();
      if (
        y[0] !== w.description ||
        y[1] !== w.endsAt ||
        y[2] !== w.kind ||
        y[3] !== w.maxEntries ||
        y[4] !== w.maxMembers ||
        y[5] !== w.minMembers ||
        y[6] !== w.prizeCopy ||
        y[7] !== w.prizes ||
        y[8] !== w.registrationClosesAt ||
        y[9] !== w.registrationOpensAt ||
        y[10] !== w.startsAt ||
        y[11] !== w.title ||
        y[12] !== N.language ||
        y[13] !== j ||
        y[14] !== v
      ) {
        let e, s, l, m, p, x, b, h, f, g, _, k, z, I;
        t = (0, R.v)(N.language) ?? "en";
        let U = "group" === w.kind;
        y[23] !== w.description
          ? ((e = w.description.trim()), (y[23] = w.description), (y[24] = e))
          : (e = y[24]);
        let A = e,
          S = (0, $.V)(w.prizes),
          C = w.prizeCopy.trim();
        (y[25] !== v
          ? ((s = v("web.leaderboard.cup.rules.title")),
            (y[25] = v),
            (y[26] = s))
          : (s = y[26]),
          y[27] !== s
            ? ((l = (0, a.jsx)("h2", {
                className: "text-base font-semibold text-text-primary",
                children: s,
              })),
              (y[27] = s),
              (y[28] = l))
            : (l = y[28]),
          y[29] !== v
            ? ((m = v("common.close")), (y[29] = v), (y[30] = m))
            : (m = y[30]),
          y[31] === Symbol.for("react.memo_cache_sentinel")
            ? ((p = (0, a.jsx)(q.x6, { className: "size-4" })), (y[31] = p))
            : (p = y[31]),
          y[32] !== j || y[33] !== m
            ? ((x = (0, a.jsx)("button", {
                type: "button",
                onClick: j,
                "aria-label": m,
                className:
                  "-mr-2 rounded-full p-2 text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
                children: p,
              })),
              (y[32] = j),
              (y[33] = m),
              (y[34] = x))
            : (x = y[34]),
          y[35] !== l || y[36] !== x
            ? ((u = (0, a.jsxs)("div", {
                className:
                  "flex items-center justify-between gap-3 px-5 pb-3 pt-5",
                children: [l, x],
              })),
              (y[35] = l),
              (y[36] = x),
              (y[37] = u))
            : (u = y[37]),
          (r = "flex min-h-0 flex-col gap-5 overflow-y-auto px-5 pb-6"),
          y[38] !== w.title
            ? ((n = (0, a.jsx)("p", {
                className: "text-sm font-semibold text-text-primary",
                children: w.title,
              })),
              (y[38] = w.title),
              (y[39] = n))
            : (n = y[39]),
          y[40] !== v
            ? ((b = v("web.leaderboard.cup.rules.schedule")),
              (y[40] = v),
              (y[41] = b))
            : (b = y[41]),
          y[42] !== v
            ? ((h = v("web.leaderboard.cup.rules.registration")),
              (y[42] = v),
              (y[43] = h))
            : (h = y[43]),
          y[44] !== v
            ? ((f = v("web.leaderboard.cup.rules.competition_window")),
              (y[44] = v),
              (y[45] = f))
            : (f = y[45]),
          (i = (0, a.jsxs)(tt, {
            title: b,
            children: [
              (0, a.jsx)(tr, {
                label: h,
                start: (0, E._)(w.registrationOpensAt, t),
                end: (0, E._)(w.registrationClosesAt, t),
              }),
              (0, a.jsx)(tr, {
                label: f,
                start: (0, E._)(w.startsAt, t),
                end: (0, E._)(w.endsAt, t),
              }),
            ],
          })),
          y[46] !== v
            ? ((g = v("web.leaderboard.cup.rules.scoring")),
              (y[46] = v),
              (y[47] = g))
            : (g = y[47]),
          y[48] !== A || y[49] !== v
            ? ((_ =
                "" !== A ? A : v("web.leaderboard.cup.rules.scoring_default")),
              (y[48] = A),
              (y[49] = v),
              (y[50] = _))
            : (_ = y[50]),
          y[51] !== _
            ? ((k = (0, a.jsx)("p", {
                className: "text-sm text-text-secondary",
                children: _,
              })),
              (y[51] = _),
              (y[52] = k))
            : (k = y[52]),
          y[53] !== g || y[54] !== k
            ? ((d = (0, a.jsx)(tt, { title: g, children: k })),
              (y[53] = g),
              (y[54] = k),
              (y[55] = d))
            : (d = y[55]),
          y[56] !== v
            ? ((z = v("web.leaderboard.cup.rules.entry")),
              (y[56] = v),
              (y[57] = z))
            : (z = y[57]),
          y[58] !== w.maxEntries || y[59] !== v
            ? ((I =
                w.maxEntries > 0
                  ? (0, a.jsx)("p", {
                      className: "text-sm text-text-secondary",
                      children: v("web.leaderboard.cup.rules.entry_cap", {
                        count: w.maxEntries,
                      }),
                    })
                  : null),
              (y[58] = w.maxEntries),
              (y[59] = v),
              (y[60] = I))
            : (I = y[60]),
          (o = (0, a.jsxs)(tt, {
            title: z,
            children: [
              (0, a.jsx)("p", {
                className: "text-sm text-text-secondary",
                children: U
                  ? v("web.leaderboard.cup.rules.entry_squad", {
                      min: (0, E.Z)(w.minMembers, t),
                      max: (0, E.Z)(w.maxMembers, t),
                    })
                  : v("web.leaderboard.cup.rules.entry_solo"),
              }),
              I,
            ],
          })),
          (c =
            w.prizes.length > 0
              ? (0, a.jsxs)(tt, {
                  title: v("web.leaderboard.cup.prize_breakdown"),
                  children: [
                    "" !== C
                      ? (0, a.jsx)("p", {
                          className: "text-sm text-text-primary",
                          children: (0, $.k)({ text: C, locale: t }),
                        })
                      : null,
                    w.prizes.map((e) =>
                      (0, a.jsx)(ta, { prize: e, locale: t }, e.rankFrom),
                    ),
                    S > 0
                      ? (0, a.jsx)("p", {
                          className: "text-xs text-text-tertiary",
                          children: v("web.leaderboard.cup.paid_ranks", {
                            count: S,
                          }),
                        })
                      : null,
                  ],
                })
              : null),
          (y[0] = w.description),
          (y[1] = w.endsAt),
          (y[2] = w.kind),
          (y[3] = w.maxEntries),
          (y[4] = w.maxMembers),
          (y[5] = w.minMembers),
          (y[6] = w.prizeCopy),
          (y[7] = w.prizes),
          (y[8] = w.registrationClosesAt),
          (y[9] = w.registrationOpensAt),
          (y[10] = w.startsAt),
          (y[11] = w.title),
          (y[12] = N.language),
          (y[13] = j),
          (y[14] = v),
          (y[15] = t),
          (y[16] = r),
          (y[17] = n),
          (y[18] = i),
          (y[19] = d),
          (y[20] = o),
          (y[21] = c),
          (y[22] = u));
      } else
        ((t = y[15]),
          (r = y[16]),
          (n = y[17]),
          (i = y[18]),
          (d = y[19]),
          (o = y[20]),
          (c = y[21]),
          (u = y[22]));
      return (
        y[61] !== v
          ? ((m = v("web.leaderboard.cup.rules.list")),
            (y[61] = v),
            (y[62] = m))
          : (m = y[62]),
        y[63] !== w || y[64] !== t
          ? ((p = (0, a.jsx)(ts, { competition: w, locale: t })),
            (y[63] = w),
            (y[64] = t),
            (y[65] = p))
          : (p = y[65]),
        y[66] !== m || y[67] !== p
          ? ((x = (0, a.jsx)(tt, { title: m, children: p })),
            (y[66] = m),
            (y[67] = p),
            (y[68] = x))
          : (x = y[68]),
        y[69] !== v
          ? ((b = v("web.leaderboard.cup.rules.terms_link")),
            (y[69] = v),
            (y[70] = b))
          : (b = y[70]),
        y[71] !== b
          ? ((h = (0, a.jsx)(Q.default, {
              href: E.s,
              target: "_blank",
              rel: "noopener",
              prefetch: !1,
              "data-testid": "cup-rules-terms",
              className:
                "text-sm font-semibold text-text-primary underline underline-offset-4 hover:text-text-hero",
              children: b,
            })),
            (y[71] = b),
            (y[72] = h))
          : (h = y[72]),
        y[73] !== r ||
        y[74] !== x ||
        y[75] !== h ||
        y[76] !== n ||
        y[77] !== i ||
        y[78] !== d ||
        y[79] !== o ||
        y[80] !== c
          ? ((f = (0, a.jsxs)("div", {
              className: r,
              children: [n, i, d, o, c, x, h],
            })),
            (y[73] = r),
            (y[74] = x),
            (y[75] = h),
            (y[76] = n),
            (y[77] = i),
            (y[78] = d),
            (y[79] = o),
            (y[80] = c),
            (y[81] = f))
          : (f = y[81]),
        y[82] !== f || y[83] !== u
          ? ((g = (0, a.jsxs)(a.Fragment, { children: [u, f] })),
            (y[82] = f),
            (y[83] = u),
            (y[84] = g))
          : (g = y[84]),
        g
      );
    };
  function tn(e) {
    let t,
      r,
      n,
      i,
      d,
      o = (0, s.c)(15),
      { open: c, onOpenChange: u, competition: m } = e,
      { t: p } = (0, l.f)();
    return (
      o[0] !== u ? ((t = (e) => u(e)), (o[0] = u), (o[1] = t)) : (t = o[1]),
      o[2] !== p
        ? ((r = p("web.leaderboard.cup.rules.title")), (o[2] = p), (o[3] = r))
        : (r = o[3]),
      o[4] !== m || o[5] !== u || o[6] !== c
        ? ((n = c
            ? (0, a.jsx)(tl, { competition: m, onClose: () => u(!1) })
            : null),
          (o[4] = m),
          (o[5] = u),
          (o[6] = c),
          (o[7] = n))
        : (n = o[7]),
      o[8] !== r || o[9] !== n
        ? ((i = (0, a.jsx)(er.s, {
            "aria-label": r,
            className:
              "flex max-h-[min(88dvh,720px)] w-full max-w-[440px] flex-col gap-0 overflow-hidden p-0",
            "data-testid": "cup-rules-dialog",
            children: n,
          })),
          (o[8] = r),
          (o[9] = n),
          (o[10] = i))
        : (i = o[10]),
      o[11] !== c || o[12] !== t || o[13] !== i
        ? ((d = (0, a.jsx)(er.v, {
            isOpen: c,
            onIsOpenChange: t,
            children: i,
          })),
          (o[11] = c),
          (o[12] = t),
          (o[13] = i),
          (o[14] = d))
        : (d = o[14]),
      d
    );
  }
  var ti = e.i(961415),
    td = e.i(359516);
  function to(e) {
    let t,
      r,
      d,
      o,
      c,
      u,
      m,
      p,
      x,
      b,
      h,
      f,
      g,
      y,
      w,
      j,
      v,
      N = (0, s.c)(37),
      {
        kind: _,
        periodControl: k,
        periodControlTopPx: z,
        periodControlLeadClassName: I,
      } = e,
      S = void 0 === z ? null : z,
      { t: C } = (0, l.f)(),
      P = (() => {
        let e,
          t = (0, s.c)(2),
          { t: r } = (0, l.f)();
        return (
          t[0] !== r
            ? ((e = (e) =>
                "final" === e
                  ? r("web.leaderboard.cup.final_results")
                  : "prizes" === e
                    ? r("web.leaderboard.cup.prize_breakdown")
                    : r("web.leaderboard.cup.standings")),
              (t[0] = r),
              (t[1] = e))
            : (e = t[1]),
          e
        );
      })(),
      q = (0, U.f)() ?? !1,
      [F, L] = (0, i.useState)(!1),
      {
        list: M,
        detail: E,
        competition: R,
      } = ((f = (0, s.c)(10))[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((p = { isVisible: !0 }), (f[0] = p))
        : (p = f[0]),
      (g = (0, td.f)(p)),
      f[1] !== _ || f[2] !== g.data
        ? ((x = (0, $.y)(g.data, _)), (f[1] = _), (f[2] = g.data), (f[3] = x))
        : (x = f[3]),
      (y = x),
      (w = y?.id ?? null),
      f[4] !== w
        ? ((b = { idOrSlug: w, isVisible: !0 }), (f[4] = w), (f[5] = b))
        : (b = f[5]),
      (j = (0, ti.f)(b)),
      (v = j.data?.competition ?? y),
      f[6] !== j || f[7] !== g || f[8] !== v
        ? ((h = { list: g, detail: j, competition: v }),
          (f[6] = j),
          (f[7] = g),
          (f[8] = v),
          (f[9] = h))
        : (h = f[9]),
      h);
    if (
      N[0] !== R ||
      N[1] !== E.data ||
      N[2] !== _ ||
      N[3] !== M ||
      N[4] !== k ||
      N[5] !== I ||
      N[6] !== S ||
      N[7] !== q ||
      N[8] !== P ||
      N[9] !== C
    ) {
      let e,
        s,
        l,
        i,
        u = (({ competition: e, detail: t }) => {
          let r = [{ type: "hero" }];
          if (!e) return r;
          let a = t?.leaderboard.entries ?? [],
            s = a.length > 0;
          (s && r.push({ type: "highlights", competitionId: e.id, entries: a }),
            !s && t && "live" === e.phase && r.push({ type: "pending" }));
          let l = s || e.prizes.length > 0,
            n = t?.viewer?.entry ?? null;
          l && n && r.push({ type: "viewer", entry: n });
          let i = !(l && n);
          if (s) {
            let t = (0, $.V)(e.prizes);
            (r.push({
              type: "section",
              section: "ended" === e.phase ? "final" : "standings",
              isCardTop: i,
            }),
              a.forEach((s, l) => {
                let n = l === a.length - 1;
                (r.push({
                  type: "row",
                  entry: s,
                  prize: (0, $.J)(e.prizes, s.rank),
                  isLast: n,
                }),
                  t > 0 &&
                    s.rank === t &&
                    !n &&
                    r.push({ type: "prize_line", paidRanks: t }));
              }));
          } else
            e.prizes.length > 0 &&
              (r.push({ type: "section", section: "prizes", isCardTop: i }),
              e.prizes.forEach((t, a) => {
                r.push({
                  type: "tier",
                  prize: t,
                  isLast: a === e.prizes.length - 1,
                });
              }));
          return r;
        })({ competition: R, detail: E.data }),
        m = u.filter(tm),
        p = u.some(tu),
        x = u.find(tc),
        b = m.length > 0 || p || void 0 !== x;
      ((t = "flex flex-col gap-4"),
        (r = "cup-leaderboard-board"),
        (d = _),
        N[15] !== M
          ? ((e = () => void M.refetch()), (N[15] = M), (N[16] = e))
          : (e = N[16]),
        N[17] === Symbol.for("react.memo_cache_sentinel")
          ? ((s = () => L(!0)), (N[17] = s))
          : (s = N[17]),
        N[18] !== R ||
        N[19] !== _ ||
        N[20] !== M.isError ||
        N[21] !== M.isLoading ||
        N[22] !== k ||
        N[23] !== I ||
        N[24] !== S ||
        N[25] !== e
          ? ((o = (0, a.jsx)(e$, {
              kind: _,
              topControl: k,
              topControlTopPx: S,
              className: I,
              competition: R,
              isLoading: M.isLoading,
              isError: M.isError,
              onRetry: e,
              onOpenRules: s,
            })),
            (N[18] = R),
            (N[19] = _),
            (N[20] = M.isError),
            (N[21] = M.isLoading),
            (N[22] = k),
            (N[23] = I),
            (N[24] = S),
            (N[25] = e),
            (N[26] = o))
          : (o = N[26]),
        (c = b
          ? (0, a.jsxs)("div", {
              className: (0, A.c)("flex flex-col gap-4", !q && "cup-board-in"),
              "data-testid": "cup-board-below-hero",
              children: [
                x && R
                  ? (0, a.jsx)(e3, {
                      competitionId: x.competitionId,
                      entries: x.entries,
                      window:
                        ((l = R.startsAt ? Date.parse(R.startsAt) : 0 / 0),
                        (i = R.endsAt ? Date.parse(R.endsAt) : 0 / 0),
                        Number.isFinite(l) && Number.isFinite(i) && !(i <= l)
                          ? { fromMs: l, toMs: i }
                          : null),
                    })
                  : null,
                p
                  ? (0, a.jsx)(K, {
                      title: C("web.leaderboard.cup.pending_title"),
                      body: C("web.leaderboard.cup.pending_body"),
                      testId: "cup-pending",
                    })
                  : null,
                m.length > 0
                  ? (0, a.jsx)(n.B, {
                      ariaLabel: C("web.leaderboard.rankings_aria"),
                      testId: "cup-board-card",
                      children: m.map((e, t) =>
                        (0, a.jsxs)(
                          "div",
                          {
                            className: (0, A.c)(
                              t > 0 &&
                                ("row" === e.type || "tier" === e.type) &&
                                "border-t border-border-primary",
                            ),
                            children: [
                              "viewer" === e.type
                                ? (0, a.jsx)("div", {
                                    className: "p-2",
                                    children: (0, a.jsx)(e9, {
                                      entry: e.entry,
                                    }),
                                  })
                                : null,
                              "section" === e.type
                                ? (0, a.jsx)(T, {
                                    title: P(e.section),
                                    isCardTop: e.isCardTop,
                                  })
                                : null,
                              "row" === e.type
                                ? (0, a.jsx)(X, {
                                    entry: e.entry,
                                    prize: e.prize,
                                  })
                                : null,
                              "prize_line" === e.type
                                ? (0, a.jsx)(O, { paidRanks: e.paidRanks })
                                : null,
                              "tier" === e.type
                                ? (0, a.jsx)(D, { prize: e.prize })
                                : null,
                            ],
                          },
                          ((e) => {
                            switch (e.type) {
                              case "row":
                                return `row:${e.entry.entryId}`;
                              case "tier":
                                return `tier:${e.prize.rankFrom}`;
                              case "section":
                                return `section:${e.section}`;
                              default:
                                return e.type;
                            }
                          })(e),
                        ),
                      ),
                    })
                  : null,
              ],
            })
          : null),
        (N[0] = R),
        (N[1] = E.data),
        (N[2] = _),
        (N[3] = M),
        (N[4] = k),
        (N[5] = I),
        (N[6] = S),
        (N[7] = q),
        (N[8] = P),
        (N[9] = C),
        (N[10] = t),
        (N[11] = r),
        (N[12] = d),
        (N[13] = o),
        (N[14] = c));
    } else ((t = N[10]), (r = N[11]), (d = N[12]), (o = N[13]), (c = N[14]));
    return (
      N[27] !== R || N[28] !== F
        ? ((u = R
            ? (0, a.jsx)(tn, { open: F, onOpenChange: L, competition: R })
            : null),
          (N[27] = R),
          (N[28] = F),
          (N[29] = u))
        : (u = N[29]),
      N[30] !== t ||
      N[31] !== r ||
      N[32] !== d ||
      N[33] !== o ||
      N[34] !== c ||
      N[35] !== u
        ? ((m = (0, a.jsxs)("div", {
            className: t,
            "data-testid": r,
            "data-cup-kind": d,
            children: [o, c, u],
          })),
          (N[30] = t),
          (N[31] = r),
          (N[32] = d),
          (N[33] = o),
          (N[34] = c),
          (N[35] = u),
          (N[36] = m))
        : (m = N[36]),
      m
    );
  }
  function tc(e) {
    return "highlights" === e.type;
  }
  function tu(e) {
    return "pending" === e.type;
  }
  function tm(e) {
    return (
      "viewer" === e.type ||
      "section" === e.type ||
      "row" === e.type ||
      "prize_line" === e.type ||
      "tier" === e.type
    );
  }
  var tp = e.i(590757);
  let tx = [
    {
      value: "combined",
      labelKey: "kolscan.top_charts.sort_combined",
      descriptionKey: "kolscan.top_charts.sort_combined_description",
      shortLabelKey: "kolscan.top_charts.sort_combined_short",
    },
    {
      value: "realized",
      labelKey: "kolscan.top_charts.sort_realized",
      descriptionKey: "kolscan.top_charts.sort_realized_description",
      shortLabelKey: "kolscan.top_charts.realized",
    },
    {
      value: "unrealized",
      labelKey: "kolscan.top_charts.sort_unrealized",
      descriptionKey: "kolscan.top_charts.sort_unrealized_description",
      shortLabelKey: "kolscan.top_charts.unrealized",
    },
  ];
  function tb(e) {
    let t,
      r,
      n,
      i,
      d,
      o,
      c,
      u,
      m,
      p,
      x,
      b,
      h,
      f,
      g,
      y,
      w,
      j = (0, s.c)(44),
      { value: v, onSelect: N } = e,
      { t: _ } = (0, l.f)();
    if (j[0] !== _ || j[1] !== v) {
      let e;
      j[12] !== v
        ? ((e = (e) => e.value === v), (j[12] = v), (j[13] = e))
        : (e = j[13]);
      let s = tx.find(e);
      ((r = tp.G),
        (p = !1),
        (t = tp.X),
        (m = !0),
        (n = "button"),
        j[14] !== _
          ? ((i = _("common.sort_by")), (j[14] = _), (j[15] = i))
          : (i = j[15]),
        (d = "leaderboard-sort-pill"),
        (o =
          "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border-secondary px-3 py-1.5 text-xs font-semibold text-text-primary transition-colors hover:bg-bg-secondary"),
        j[16] === Symbol.for("react.memo_cache_sentinel")
          ? ((c = (0, a.jsx)(q.v_, { "aria-hidden": !0, className: "size-3" })),
            (j[16] = c))
          : (c = j[16]),
        (u = s ? _(s.shortLabelKey) : null),
        (j[0] = _),
        (j[1] = v),
        (j[2] = t),
        (j[3] = r),
        (j[4] = n),
        (j[5] = i),
        (j[6] = d),
        (j[7] = o),
        (j[8] = c),
        (j[9] = u),
        (j[10] = m),
        (j[11] = p));
    } else
      ((t = j[2]),
        (r = j[3]),
        (n = j[4]),
        (i = j[5]),
        (d = j[6]),
        (o = j[7]),
        (c = j[8]),
        (u = j[9]),
        (m = j[10]),
        (p = j[11]));
    return (
      j[17] !== n ||
      j[18] !== i ||
      j[19] !== d ||
      j[20] !== o ||
      j[21] !== c ||
      j[22] !== u
        ? ((x = (0, a.jsxs)("button", {
            type: n,
            "aria-label": i,
            "data-testid": d,
            className: o,
            children: [c, u],
          })),
          (j[17] = n),
          (j[18] = i),
          (j[19] = d),
          (j[20] = o),
          (j[21] = c),
          (j[22] = u),
          (j[23] = x))
        : (x = j[23]),
      j[24] !== t || j[25] !== m || j[26] !== x
        ? ((b = (0, a.jsx)(t, { asChild: m, children: x })),
          (j[24] = t),
          (j[25] = m),
          (j[26] = x),
          (j[27] = b))
        : (b = j[27]),
      j[28] !== _
        ? ((h = _("common.sort_by")), (j[28] = _), (j[29] = h))
        : (h = j[29]),
      j[30] !== h
        ? ((f = (0, a.jsx)("p", {
            className: "px-2 pb-2 pt-1 text-xs font-medium text-text-tertiary",
            children: h,
          })),
          (j[30] = h),
          (j[31] = f))
        : (f = j[31]),
      j[32] !== N || j[33] !== _ || j[34] !== v
        ? ((g = tx.map((e) => {
            let t = e.value === v;
            return (0, a.jsxs)(
              tp.r,
              {
                role: "menuitemradio",
                "aria-checked": t,
                onClick: () => N(e.value),
                className: (0, A.c)(
                  "mb-1 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 last:mb-0 focus:bg-bg-tertiary focus:text-text-primary",
                  t ? "bg-bg-tertiary" : "bg-transparent",
                ),
                children: [
                  (0, a.jsxs)("span", {
                    className: "flex min-w-0 flex-1 flex-col gap-0.5",
                    children: [
                      (0, a.jsx)("span", {
                        className: "text-sm font-semibold text-text-primary",
                        children: _(e.labelKey),
                      }),
                      (0, a.jsx)("span", {
                        className: "text-xs text-text-tertiary",
                        children: _(e.descriptionKey),
                      }),
                    ],
                  }),
                  (0, a.jsx)("span", {
                    "aria-hidden": !0,
                    className: (0, A.c)(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                      t ? "border-primary-green" : "border-border-tertiary",
                    ),
                    children: t
                      ? (0, a.jsx)("span", {
                          className: "size-2.5 rounded-full bg-primary-green",
                        })
                      : null,
                  }),
                ],
              },
              e.value,
            );
          })),
          (j[32] = N),
          (j[33] = _),
          (j[34] = v),
          (j[35] = g))
        : (g = j[35]),
      j[36] !== f || j[37] !== g
        ? ((y = (0, a.jsxs)(tp.L, {
            align: "end",
            className: "w-72 rounded-2xl border-border-secondary p-2",
            children: [f, g],
          })),
          (j[36] = f),
          (j[37] = g),
          (j[38] = y))
        : (y = j[38]),
      j[39] !== r || j[40] !== b || j[41] !== y || j[42] !== p
        ? ((w = (0, a.jsxs)(r, { modal: p, children: [b, y] })),
          (j[39] = r),
          (j[40] = b),
          (j[41] = y),
          (j[42] = p),
          (j[43] = w))
        : (w = j[43]),
      w
    );
  }
  var th = e.i(869322),
    tf = e.i(864024),
    tg = e.i(416287),
    ty = e.i(187611),
    tw = e.i(96224),
    tj = e.i(432626),
    tv = e.i(545063),
    tN = e.i(875737),
    t_ = e.i(949060),
    tk = e.i(229937);
  e.i(84455);
  var tz = e.i(540805),
    tI = e.i(779897),
    tU = e.i(936947),
    tA = e.i(425890),
    tS = e.i(10738),
    tC = e.i(369091);
  let tP = { 1: "text-[#FFD700]", 2: "text-[#C0C0C0]", 3: "text-[#CD7F32]" };
  function tq(e) {
    let t,
      r,
      l,
      n,
      d,
      o,
      c,
      u,
      m,
      p,
      x,
      b,
      h,
      f,
      g,
      y,
      w,
      j,
      v,
      N,
      _,
      k,
      z,
      I,
      U,
      S,
      F,
      L,
      M,
      $ = (0, s.c)(92),
      { entry: E, sort: R, viewerAddress: T, viewerFollowing: O } = e,
      [D, K] = (0, i.useState)(!1),
      Z = (0, tv.$)(),
      V = (0, tS.f)("(hover: none)"),
      W = (0, tw.useHasApiClientsConfig)(),
      { ipfsPrefix: G } = (0, tC.useIpfsPrefix)();
    $[0] !== E.username || $[1] !== E.walletAddress
      ? ((t = E.username?.trim() || (0, P.d)(E.walletAddress)),
        ($[0] = E.username),
        ($[1] = E.walletAddress),
        ($[2] = t))
      : (t = $[2]);
    let X = t,
      Y = !!T;
    $[3] !== E.isViewer || $[4] !== E.walletAddress || $[5] !== Z
      ? ((r = !0 === E.isViewer || Z(E.walletAddress)),
        ($[3] = E.isViewer),
        ($[4] = E.walletAddress),
        ($[5] = Z),
        ($[6] = r))
      : (r = $[6]);
    let ee = r,
      et = tP[E.rank];
    $[7] !== E.profileImage
      ? ((l = (0, eY.Z)({ sourceUrl: E.profileImage, width: eY.z.list })),
        ($[7] = E.profileImage),
        ($[8] = l))
      : (l = $[8]);
    let er = l,
      ea = (0, tg.n)(E, R),
      es = (0, tA.f)()
        ? (0, tz.k)(ea)
        : null == ea || 0 === ea
          ? "text-text-primary"
          : ea > 0
            ? "text-gain"
            : "text-loss";
    $[9] !== X
      ? ((n = (0, a.jsx)("span", {
          className:
            "relative z-[2] truncate text-sm font-semibold text-text-primary group-hover:underline",
          "data-testid": "pnl-leaderboard-name",
          children: X,
        })),
        ($[9] = X),
        ($[10] = n))
      : (n = $[10]);
    let el = n,
      en = et ?? "text-text-tertiary";
    ($[11] !== en
      ? ((d = (0, A.c)("w-7 shrink-0 text-xs font-semibold tabular-nums", en)),
        ($[11] = en),
        ($[12] = d))
      : (d = $[12]),
      $[13] !== E.rank || $[14] !== d
        ? ((o = (0, a.jsx)("span", { className: d, children: E.rank })),
          ($[13] = E.rank),
          ($[14] = d),
          ($[15] = o))
        : (o = $[15]),
      $[16] !== E.walletAddress
        ? ((c = (0, C.$)(E.walletAddress)),
          ($[16] = E.walletAddress),
          ($[17] = c))
        : (c = $[17]),
      $[18] !== E.rank
        ? ((u = () => (0, eu.Rz)({ leaderboardRank: E.rank })),
          ($[18] = E.rank),
          ($[19] = u))
        : (u = $[19]),
      $[20] === Symbol.for("react.memo_cache_sentinel")
        ? ((m = { [tU.A]: "" }), ($[20] = m))
        : (m = $[20]),
      $[21] !== X || $[22] !== c || $[23] !== u
        ? ((p = (0, a.jsx)(Q.default, {
            href: c,
            onClick: u,
            "aria-label": X,
            ...m,
            className:
              "absolute inset-0 z-[1] rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary-green/60",
          })),
          ($[21] = X),
          ($[22] = c),
          ($[23] = u),
          ($[24] = p))
        : (p = $[24]),
      $[25] !== er || $[26] !== X
        ? ((x = er
            ? (0, a.jsx)("img", {
                src: er,
                alt: "",
                width: 40,
                height: 40,
                loading: "lazy",
                className: "size-10 shrink-0 rounded-full object-cover",
              })
            : (0, a.jsx)("span", {
                "aria-hidden": !0,
                className:
                  "flex size-10 shrink-0 items-center justify-center rounded-full bg-bg-quaternary text-sm font-semibold text-text-secondary",
                children: X.slice(0, 1).toUpperCase(),
              })),
          ($[25] = er),
          ($[26] = X),
          ($[27] = x))
        : (x = $[27]),
      $[28] !== W ||
      $[29] !== X ||
      $[30] !== E.profileImage ||
      $[31] !== E.userId ||
      $[32] !== E.username ||
      $[33] !== E.walletAddress ||
      $[34] !== G ||
      $[35] !== el ||
      $[36] !== V
        ? ((b =
            W && !V
              ? (0, a.jsx)(tj.f, {
                  align: "start",
                  fallbackAvatarUrl: E.profileImage,
                  fallbackUsername: E.username,
                  followSlot: (0, a.jsx)(t_.f, {
                    displayName: X,
                    userAddress: E.walletAddress,
                  }),
                  ipfsPrefix: G,
                  userAddress: E.walletAddress,
                  userId: E.userId,
                  userProfileLink: (0, C.$)(E.walletAddress),
                  children: el,
                })
              : el),
          ($[28] = W),
          ($[29] = X),
          ($[30] = E.profileImage),
          ($[31] = E.userId),
          ($[32] = E.username),
          ($[33] = E.walletAddress),
          ($[34] = G),
          ($[35] = el),
          ($[36] = V),
          ($[37] = b))
        : (b = $[37]),
      $[38] !== E
        ? ((h = (0, J.f)(E) ? (0, a.jsx)(B.f, { size: 18 }) : null),
          ($[38] = E),
          ($[39] = h))
        : (h = $[39]),
      $[40] !== et
        ? ((f = et
            ? (0, a.jsx)(q.zN, {
                "aria-hidden": !0,
                className: (0, A.c)("size-3.5 shrink-0", et),
              })
            : null),
          ($[40] = et),
          ($[41] = f))
        : (f = $[41]),
      $[42] !== E.xUsername
        ? ((g = E.xUsername
            ? (0, a.jsx)(tN.f, { xUsername: E.xUsername, iconOnly: !0 })
            : null),
          ($[42] = E.xUsername),
          ($[43] = g))
        : (g = $[43]),
      $[44] !== E.walletAddress
        ? ((y = (0, a.jsx)(tI.f, {
            address: E.walletAddress,
            className: "relative z-[2]",
            testId: "leaderboard-squad-badge",
          })),
          ($[44] = E.walletAddress),
          ($[45] = y))
        : (y = $[45]),
      $[46] !== b || $[47] !== h || $[48] !== f || $[49] !== g || $[50] !== y
        ? ((w = (0, a.jsxs)("span", {
            className: "flex min-w-0 items-center gap-1.5",
            children: [b, h, f, g, y],
          })),
          ($[46] = b),
          ($[47] = h),
          ($[48] = f),
          ($[49] = g),
          ($[50] = y),
          ($[51] = w))
        : (w = $[51]),
      $[52] !== E.walletAddress
        ? ((j = (0, P.d)(E.walletAddress)),
          ($[52] = E.walletAddress),
          ($[53] = j))
        : (j = $[53]),
      $[54] !== j
        ? ((v = (0, a.jsx)("span", {
            className: "block truncate text-xs text-text-tertiary",
            children: j,
          })),
          ($[54] = j),
          ($[55] = v))
        : (v = $[55]),
      $[56] !== w || $[57] !== v
        ? ((N = (0, a.jsxs)("span", {
            className: "min-w-0",
            children: [w, v],
          })),
          ($[56] = w),
          ($[57] = v),
          ($[58] = N))
        : (N = $[58]),
      $[59] !== p || $[60] !== x || $[61] !== N
        ? ((_ = (0, a.jsxs)("div", {
            className: "group relative flex min-w-0 flex-1 items-center gap-3",
            onClick: tU.N,
            children: [p, x, N],
          })),
          ($[59] = p),
          ($[60] = x),
          ($[61] = N),
          ($[62] = _))
        : (_ = $[62]));
    let ei = (0, A.c)("ml-auto shrink-0 text-sm font-bold tabular-nums", es),
      ed = null == ea ? "—" : `${ea > 0 ? "+" : ""}${(0, H.w)(ea)}`;
    ($[63] !== ei || $[64] !== ed
      ? ((k = (0, a.jsx)("span", { className: ei, children: ed })),
        ($[63] = ei),
        ($[64] = ed),
        ($[65] = k))
      : (k = $[65]),
      $[66] !== X ||
      $[67] !== E.viewerFollows ||
      $[68] !== E.walletAddress ||
      $[69] !== Y ||
      $[70] !== ee ||
      $[71] !== O
        ? ((z = Y
            ? ee
              ? (0, a.jsx)("span", {
                  "aria-hidden": !0,
                  className: "size-6 shrink-0",
                })
              : (0, a.jsx)(tk.f, {
                  userAddress: E.walletAddress,
                  displayName: X,
                  isLoggedIn: Y,
                  initialIsFollowing:
                    O.isFollowing(E.walletAddress) ?? E.viewerFollows ?? void 0,
                  variant: "icon",
                  size: "sm",
                })
            : null),
          ($[66] = X),
          ($[67] = E.viewerFollows),
          ($[68] = E.walletAddress),
          ($[69] = Y),
          ($[70] = ee),
          ($[71] = O),
          ($[72] = z))
        : (z = $[72]));
    let eo = D ? `Hide stats for ${X}` : `Show stats for ${X}`;
    return (
      $[73] === Symbol.for("react.memo_cache_sentinel")
        ? ((I = () => K(tF)), ($[73] = I))
        : (I = $[73]),
      $[74] !== D
        ? ((U = D
            ? (0, a.jsx)(q.cg, { className: "size-4" })
            : (0, a.jsx)(q.J0, { className: "size-4" })),
          ($[74] = D),
          ($[75] = U))
        : (U = $[75]),
      $[76] !== D || $[77] !== eo || $[78] !== U
        ? ((S = (0, a.jsx)("button", {
            type: "button",
            "aria-expanded": D,
            "aria-label": eo,
            onClick: I,
            className:
              "shrink-0 rounded-full p-1.5 text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
            children: U,
          })),
          ($[76] = D),
          ($[77] = eo),
          ($[78] = U),
          ($[79] = S))
        : (S = $[79]),
      $[80] !== o || $[81] !== _ || $[82] !== k || $[83] !== z || $[84] !== S
        ? ((F = (0, a.jsxs)("div", {
            className: "flex items-center gap-3",
            children: [o, _, k, z, S],
          })),
          ($[80] = o),
          ($[81] = _),
          ($[82] = k),
          ($[83] = z),
          ($[84] = S),
          ($[85] = F))
        : (F = $[85]),
      $[86] !== E || $[87] !== D
        ? ((L = D
            ? (0, a.jsx)(e7, { entry: E, className: "mt-3 pl-10" })
            : null),
          ($[86] = E),
          ($[87] = D),
          ($[88] = L))
        : (L = $[88]),
      $[89] !== F || $[90] !== L
        ? ((M = (0, a.jsxs)("div", {
            "data-testid": "pnl-leaderboard-row",
            className: "px-4 py-3 transition-colors hover:bg-bg-tertiary",
            children: [F, L],
          })),
          ($[89] = F),
          ($[90] = L),
          ($[91] = M))
        : (M = $[91]),
      M
    );
  }
  function tF(e) {
    return !e;
  }
  var tL = e.i(928529);
  let tM = { 1: 0.15, 2: 0.55, 3: 0.7, 4: 0.85 },
    t$ = (e) => `${e > 0 ? "+" : ""}${(0, H.w)(e)}`;
  function tE(e) {
    let t,
      r,
      l,
      n,
      d,
      o,
      c,
      u,
      m,
      p,
      x,
      b,
      h,
      f,
      g,
      y,
      w,
      j,
      v,
      N,
      _,
      k,
      z,
      I = (0, s.c)(62),
      { rows: S, isLoading: C, ariaLabel: P, backdrop: q } = e,
      F = (0, U.f)() ?? !1,
      [L, M] = (0, i.useState)("hidden"),
      [$, E] = (0, i.useState)(!1),
      R = ev[void 0 === q ? "stars" : q];
    (I[0] !== C || I[1] !== L || I[2] !== F
      ? ((t = () => {
          if (C || F || "hidden" !== L) return;
          let e = requestAnimationFrame(() => M("run"));
          return () => cancelAnimationFrame(e);
        }),
        (r = [C, F, L]),
        (I[0] = C),
        (I[1] = L),
        (I[2] = F),
        (I[3] = t),
        (I[4] = r))
      : ((t = I[3]), (r = I[4])),
      (0, i.useEffect)(t, r));
    let T = F || "run" === L,
      O = !F && "run" === L,
      D = S[0],
      K = T ? (D?.pnlUsd ?? 0) : 0,
      Z = !F && !C;
    I[5] !== K || I[6] !== Z
      ? ((l = { value: K, durationMs: 1e3, animate: Z }),
        (I[5] = K),
        (I[6] = Z),
        (I[7] = l))
      : (l = I[7]);
    let B = (function (e) {
      let t,
        r,
        a = (0, s.c)(5),
        { value: l, durationMs: n, animate: d } = e,
        o = void 0 === n ? 1e3 : n,
        c = void 0 === d || d,
        [u, m] = (0, i.useState)(c ? 0 : l),
        p = (0, i.useRef)(c ? 0 : l);
      return (
        a[0] !== c || a[1] !== o || a[2] !== l
          ? ((t = () => {
              if (!c) {
                ((p.current = l), m(l));
                return;
              }
              let e = p.current;
              if (e === l) return;
              let t = 0,
                r = performance.now(),
                a = (s) => {
                  let n = Math.min((s - r) / o, 1),
                    i = n >= 1 ? l : e + (l - e) * (1 - (1 - n) ** 3);
                  ((p.current = i),
                    m(i),
                    n < 1 && (t = requestAnimationFrame(a)));
                };
              return (
                (t = requestAnimationFrame(a)),
                () => cancelAnimationFrame(t)
              );
            }),
            (r = [l, o, c]),
            (a[0] = c),
            (a[1] = o),
            (a[2] = l),
            (a[3] = t),
            (a[4] = r))
          : ((t = a[3]), (r = a[4])),
        (0, i.useEffect)(t, r),
        u
      );
    })(l);
    I[8] === Symbol.for("react.memo_cache_sentinel")
      ? ((n = (0, A.c)("flex flex-col items-center", ey)), (I[8] = n))
      : (n = I[8]);
    let Q = C ? "invisible" : "visible",
      V = O ? "podium-lockup-in" : !T && "opacity-0";
    (I[9] !== Q || I[10] !== V
      ? ((d = (0, A.c)(
          "flex w-full min-w-0 items-end justify-center gap-3 pt-3",
          Q,
          V,
        )),
        (I[9] = Q),
        (I[10] = V),
        (I[11] = d))
      : (d = I[11]),
      I[12] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (0, a.jsx)(tL.default, {
            src: "/leaderboard/number-one.png",
            alt: "",
            "aria-hidden": !0,
            width: 32,
            height: 56,
            className: "h-12 w-7 shrink-0 object-contain",
          })),
          (I[12] = o))
        : (o = I[12]));
    let W = D?.name ?? "";
    (I[13] !== W
      ? ((c = (0, a.jsx)("span", {
          className:
            "min-w-0 truncate pb-0.5 text-2xl font-bold leading-8 tracking-[-0.01px] text-text-primary",
          children: W,
        })),
        (I[13] = W),
        (I[14] = c))
      : (c = I[14]),
      I[15] !== B ? ((u = t$(B)), (I[15] = B), (I[16] = u)) : (u = I[16]),
      I[17] !== u
        ? ((m = (0, a.jsx)("span", {
            className:
              "shrink-0 pb-0.5 text-xl font-bold leading-8 tabular-nums text-gain",
            children: u,
          })),
          (I[17] = u),
          (I[18] = m))
        : (m = I[18]),
      I[19] !== c || I[20] !== m || I[21] !== d
        ? ((p = (0, a.jsxs)("div", { className: d, children: [o, c, m] })),
          (I[19] = c),
          (I[20] = m),
          (I[21] = d),
          (I[22] = p))
        : (p = I[22]),
      I[23] === Symbol.for("react.memo_cache_sentinel")
        ? ((x = (0, A.c)("relative py-3", ew)),
          (b = {
            width: "calc(366px * var(--podium-scale))",
            height: "calc(204px * var(--podium-scale) + 24px)",
          }),
          (I[23] = x),
          (I[24] = b))
        : ((x = I[23]), (b = I[24])));
    let J = C ? "invisible" : "visible";
    (I[25] !== J
      ? ((h = (0, A.c)("absolute left-0 top-3 origin-top-left", J)),
        (I[25] = J),
        (I[26] = h))
      : (h = I[26]),
      I[27] === Symbol.for("react.memo_cache_sentinel")
        ? ((f = {
            width: 366,
            height: 204,
            transform: "scale(var(--podium-scale))",
          }),
          (I[27] = f))
        : (f = I[27]));
    let G = R.src,
      H = R.width,
      X = R.height,
      Y = O ? "podium-backdrop-in" : !T && "opacity-0";
    return (
      I[28] !== Y
        ? ((g = (0, A.c)("absolute", Y)), (I[28] = Y), (I[29] = g))
        : (g = I[29]),
      I[30] !== R.height ||
      I[31] !== R.left ||
      I[32] !== R.top ||
      I[33] !== R.width
        ? ((y = { left: R.left, top: R.top, width: R.width, height: R.height }),
          (I[30] = R.height),
          (I[31] = R.left),
          (I[32] = R.top),
          (I[33] = R.width),
          (I[34] = y))
        : (y = I[34]),
      I[35] !== R.height ||
      I[36] !== R.src ||
      I[37] !== R.width ||
      I[38] !== g ||
      I[39] !== y
        ? ((w = (0, a.jsx)(tL.default, {
            src: G,
            alt: "",
            "aria-hidden": !0,
            width: H,
            height: X,
            className: g,
            style: y,
            priority: !0,
          })),
          (I[35] = R.height),
          (I[36] = R.src),
          (I[37] = R.width),
          (I[38] = g),
          (I[39] = y),
          (I[40] = w))
        : (w = I[40]),
      I[41] !== O || I[42] !== $
        ? ((j =
            O && !$
              ? (0, a.jsx)("div", {
                  "aria-hidden": !0,
                  className: (0, A.c)(
                    "pointer-events-none absolute -inset-[50px] z-10",
                    "podium-glitter-burst",
                  ),
                  onAnimationEnd: (e) => {
                    e.target === e.currentTarget && E(!0);
                  },
                  children: (0, a.jsx)(tL.default, {
                    src: "/leaderboard/glitter.gif",
                    alt: "",
                    fill: !0,
                    sizes: "466px",
                    unoptimized: !0,
                    className: "object-cover",
                  }),
                })
              : null),
          (I[41] = O),
          (I[42] = $),
          (I[43] = j))
        : (j = I[43]),
      I[44] !== O || I[45] !== S || I[46] !== T
        ? ((v = eN.map((e) =>
            (0, a.jsx)(
              tR,
              { config: e, row: S[e.slot - 1], shown: T, animate: O },
              e.slot,
            ),
          )),
          (I[44] = O),
          (I[45] = S),
          (I[46] = T),
          (I[47] = v))
        : (v = I[47]),
      I[48] !== h || I[49] !== w || I[50] !== j || I[51] !== v
        ? ((N = (0, a.jsxs)("div", {
            className: h,
            style: f,
            children: [w, j, v],
          })),
          (I[48] = h),
          (I[49] = w),
          (I[50] = j),
          (I[51] = v),
          (I[52] = N))
        : (N = I[52]),
      I[53] !== C
        ? ((_ = C
            ? (0, a.jsx)("div", {
                "aria-hidden": !0,
                "data-testid": "podium-loading",
                className:
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                children: (0, a.jsx)("div", {
                  className:
                    "size-8 animate-spin rounded-full border-2 border-border-tertiary border-t-white/70",
                }),
              })
            : null),
          (I[53] = C),
          (I[54] = _))
        : (_ = I[54]),
      I[55] !== N || I[56] !== _
        ? ((k = (0, a.jsxs)("div", {
            className: x,
            style: b,
            children: [N, _],
          })),
          (I[55] = N),
          (I[56] = _),
          (I[57] = k))
        : (k = I[57]),
      I[58] !== P || I[59] !== p || I[60] !== k
        ? ((z = (0, a.jsxs)("section", {
            "aria-label": P,
            className: n,
            children: [p, k],
          })),
          (I[58] = P),
          (I[59] = p),
          (I[60] = k),
          (I[61] = z))
        : (z = I[61]),
      z
    );
  }
  function tR(e) {
    let t,
      r,
      l,
      n,
      d,
      o,
      c,
      u,
      m,
      p,
      x,
      b = (0, s.c)(39),
      { config: h, row: f, shown: g, animate: y } = e,
      w = 1 === h.slot,
      [j, v] = (0, i.useState)(!1);
    b[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((t = (e) => {
          e.target === e.currentTarget && v(!0);
        }),
        (b[0] = t))
      : (t = b[0]);
    let N = t;
    b[1] !== f
      ? ((r = f ? (0, eY.Z)({ sourceUrl: f.avatarUrl, width: 192 }) : null),
        (b[1] = f),
        (b[2] = r))
      : (r = b[2]);
    let _ = r,
      k = `path("${h.clipPath}")`;
    (b[3] !== k ? ((l = { clipPath: k }), (b[3] = k), (b[4] = l)) : (l = b[4]),
      b[5] !== _ || b[6] !== h.height || b[7] !== f
        ? ((n =
            f && _
              ? (0, a.jsx)("img", {
                  src: _,
                  alt: "",
                  loading: "lazy",
                  className: "size-full object-cover",
                })
              : f
                ? (0, a.jsx)("span", {
                    className:
                      "flex size-full items-center justify-center font-bold text-white",
                    style: {
                      backgroundColor: `hsl(${((e) => {
                        let t = 0;
                        for (let r = 0; r < e.length; r++)
                          t = (31 * t + e.charCodeAt(r)) | 0;
                        return Math.abs(t) % 360;
                      })(f.key)} 45% 35%)`,
                      fontSize: Math.max(14, Math.floor(0.3 * h.height)),
                    },
                    children: f.name.slice(0, 1).toUpperCase() || "?",
                  })
                : (0, a.jsx)("span", {
                    className: "block size-full bg-bg-tertiary",
                  })),
          (b[5] = _),
          (b[6] = h.height),
          (b[7] = f),
          (b[8] = n))
        : (n = b[8]),
      b[9] !== l || b[10] !== n
        ? ((d = (0, a.jsx)("span", {
            "aria-hidden": !0,
            className: "absolute inset-0 overflow-hidden bg-white/[0.06]",
            style: l,
            children: n,
          })),
          (b[9] = l),
          (b[10] = n),
          (b[11] = d))
        : (d = b[11]),
      b[12] !== h.frameSrc ||
      b[13] !== h.height ||
      b[14] !== h.width ||
      b[15] !== w
        ? ((o = (0, a.jsx)(tL.default, {
            src: h.frameSrc,
            alt: "",
            "aria-hidden": !0,
            width: h.width,
            height: h.height,
            className: "pointer-events-none relative size-full",
            priority: w,
          })),
          (b[12] = h.frameSrc),
          (b[13] = h.height),
          (b[14] = h.width),
          (b[15] = w),
          (b[16] = o))
        : (o = b[16]),
      b[17] !== d || b[18] !== o
        ? ((c = (0, a.jsxs)(a.Fragment, { children: [d, o] })),
          (b[17] = d),
          (b[18] = o),
          (b[19] = c))
        : (c = b[19]));
    let z = c,
      I = y ? (w ? "podium-first-in" : "podium-rise-in") : !g && "opacity-0",
      U = !(y ? j : g) && "pointer-events-none";
    b[20] !== U || b[21] !== I
      ? ((u = (0, A.c)("absolute", I, U)),
        (b[20] = U),
        (b[21] = I),
        (b[22] = u))
      : (u = b[22]);
    let S = y ? `${tM[h.slot]}s` : void 0;
    return (
      b[23] !== h.dropShadow ||
      b[24] !== h.height ||
      b[25] !== h.left ||
      b[26] !== h.top ||
      b[27] !== h.width ||
      b[28] !== h.zIndex ||
      b[29] !== S
        ? ((m = {
            left: h.left,
            top: h.top,
            width: h.width,
            height: h.height,
            zIndex: h.zIndex,
            filter: h.dropShadow,
            animationDelay: S,
          }),
          (b[23] = h.dropShadow),
          (b[24] = h.height),
          (b[25] = h.left),
          (b[26] = h.top),
          (b[27] = h.width),
          (b[28] = h.zIndex),
          (b[29] = S),
          (b[30] = m))
        : (m = b[30]),
      b[31] !== z || b[32] !== h.slot || b[33] !== f
        ? ((p = f?.href
            ? (0, a.jsx)(Q.default, {
                href: f.href,
                "aria-label": `${f.name}, rank ${h.slot}, ${t$(f.pnlUsd)}`,
                onClick: f.onClick,
                className:
                  "block size-full outline-offset-4 transition-transform duration-300 hover:scale-[1.04] focus-visible:scale-[1.04]",
                children: z,
              })
            : (0, a.jsx)("div", {
                className: (0, A.c)("size-full", !f && "opacity-70"),
                "aria-label": f
                  ? `${f.name}, rank ${h.slot}, ${t$(f.pnlUsd)}`
                  : void 0,
                children: z,
              })),
          (b[31] = z),
          (b[32] = h.slot),
          (b[33] = f),
          (b[34] = p))
        : (p = b[34]),
      b[35] !== u || b[36] !== m || b[37] !== p
        ? ((x = (0, a.jsx)("div", {
            className: u,
            style: m,
            onAnimationEnd: N,
            children: p,
          })),
          (b[35] = u),
          (b[36] = m),
          (b[37] = p),
          (b[38] = x))
        : (x = b[38]),
      x
    );
  }
  function tT(e) {
    let t,
      r,
      n,
      d,
      o,
      c,
      u,
      m,
      p,
      x,
      b,
      h,
      f,
      g,
      y,
      w,
      j,
      v,
      N,
      _,
      k,
      z = (0, s.c)(87),
      { viewerAddress: I, viewer: U, sort: S } = e,
      { t: F } = (0, l.f)(),
      [L, M] = (0, i.useState)(!1);
    if (!I) return null;
    let $ = U?.found ? U.entry : void 0,
      E = U?.found ? U.projectedRank : void 0,
      R = U?.found === !0 && !U.onBoard;
    if (
      z[0] !== $ ||
      z[1] !== R ||
      z[2] !== E ||
      z[3] !== S ||
      z[4] !== F ||
      z[5] !== I
    ) {
      let e,
        s,
        l,
        i,
        h,
        f,
        g,
        y,
        w,
        j,
        v = $?.username?.trim() || (0, P.d)(I),
        N = $ ? (0, tg.n)($, S) : void 0,
        _ =
          null == N || 0 === N
            ? "text-text-primary"
            : N > 0
              ? "text-gain"
              : "text-loss";
      ((r = "pnl-viewer-rank-card"),
        (n = "rounded-2xl bg-bg-secondary px-4 py-3"),
        (x = "flex items-center gap-3"),
        z[17] !== I
          ? ((e = (0, C.$)(I)), (z[17] = I), (z[18] = e))
          : (e = z[18]),
        z[19] !== F
          ? ((s = F("web.leaderboard.open_your_profile")),
            (z[19] = F),
            (z[20] = s))
          : (s = z[20]));
      let k = $?.profileImage
        ? (0, a.jsx)("img", {
            src: $.profileImage,
            alt: "",
            width: 40,
            height: 40,
            loading: "lazy",
            className: "size-10 rounded-full object-cover",
          })
        : (0, a.jsx)("span", {
            "aria-hidden": !0,
            className:
              "flex size-10 items-center justify-center rounded-full bg-bg-quaternary text-sm font-semibold text-text-secondary",
            children: v.slice(0, 1).toUpperCase(),
          });
      (z[21] !== F
        ? ((l = F("web.leaderboard.you_badge")), (z[21] = F), (z[22] = l))
        : (l = z[22]),
        z[23] !== l
          ? ((i = (0, a.jsx)("span", {
              className:
                "absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-white px-1.5 text-[9px] font-bold uppercase leading-[14px] text-black",
              children: l,
            })),
            (z[23] = l),
            (z[24] = i))
          : (i = z[24]),
        z[25] !== e || z[26] !== s || z[27] !== k || z[28] !== i
          ? ((b = (0, a.jsxs)(Q.default, {
              href: e,
              className: "relative shrink-0",
              "aria-label": s,
              children: [k, i],
            })),
            (z[25] = e),
            (z[26] = s),
            (z[27] = k),
            (z[28] = i),
            (z[29] = b))
          : (b = z[29]),
        (m = "min-w-0 flex-1"),
        z[30] !== I
          ? ((h = (0, C.$)(I)), (z[30] = I), (z[31] = h))
          : (h = z[31]),
        z[32] !== v || z[33] !== h
          ? ((f = (0, a.jsx)(Q.default, {
              href: h,
              className:
                "truncate text-sm font-semibold text-text-primary hover:underline",
              children: v,
            })),
            (z[32] = v),
            (z[33] = h),
            (z[34] = f))
          : (f = z[34]),
        z[35] !== F
          ? ((g = F("kolscan.top_charts.profit_usd_header")),
            (z[35] = F),
            (z[36] = g))
          : (g = z[36]),
        z[37] !== g
          ? ((y = (0, a.jsx)("span", {
              className:
                "shrink-0 text-[10px] font-medium uppercase tracking-wider text-text-tertiary",
              children: g,
            })),
            (z[37] = g),
            (z[38] = y))
          : (y = z[38]),
        z[39] !== f || z[40] !== y
          ? ((p = (0, a.jsxs)("div", {
              className: "flex items-baseline justify-between gap-2",
              children: [f, y],
            })),
            (z[39] = f),
            (z[40] = y),
            (z[41] = p))
          : (p = z[41]),
        (c = "flex items-baseline justify-between gap-2"),
        z[42] !== R || z[43] !== F
          ? ((w = F(
              R
                ? "kolscan.top_charts.projected_rank"
                : "kolscan.top_charts.your_rank",
            )),
            (z[42] = R),
            (z[43] = F),
            (z[44] = w))
          : (w = z[44]));
      let U = null != E ? `#${E}` : "#—";
      (z[45] !== U
        ? ((j = (0, a.jsx)("span", {
            className: "font-semibold text-gain",
            children: U,
          })),
          (z[45] = U),
          (z[46] = j))
        : (j = z[46]),
        z[47] !== w || z[48] !== j
          ? ((u = (0, a.jsxs)("span", {
              className: "flex items-baseline gap-1 text-xs text-text-tertiary",
              children: [w, j],
            })),
            (z[47] = w),
            (z[48] = j),
            (z[49] = u))
          : (u = z[49]),
        z[50] !== _
          ? ((t = (0, A.c)("shrink-0 text-sm font-bold", _)),
            (z[50] = _),
            (z[51] = t))
          : (t = z[51]),
        (d = "pnl-viewer-rank-pnl"),
        (o = null == N ? "—" : (0, H.w)(N)),
        (z[0] = $),
        (z[1] = R),
        (z[2] = E),
        (z[3] = S),
        (z[4] = F),
        (z[5] = I),
        (z[6] = t),
        (z[7] = r),
        (z[8] = n),
        (z[9] = d),
        (z[10] = o),
        (z[11] = c),
        (z[12] = u),
        (z[13] = m),
        (z[14] = p),
        (z[15] = x),
        (z[16] = b));
    } else
      ((t = z[6]),
        (r = z[7]),
        (n = z[8]),
        (d = z[9]),
        (o = z[10]),
        (c = z[11]),
        (u = z[12]),
        (m = z[13]),
        (p = z[14]),
        (x = z[15]),
        (b = z[16]));
    return (
      z[52] !== t || z[53] !== d || z[54] !== o
        ? ((h = (0, a.jsx)("span", {
            className: t,
            "data-testid": d,
            children: o,
          })),
          (z[52] = t),
          (z[53] = d),
          (z[54] = o),
          (z[55] = h))
        : (h = z[55]),
      z[56] !== h || z[57] !== c || z[58] !== u
        ? ((f = (0, a.jsxs)("div", { className: c, children: [u, h] })),
          (z[56] = h),
          (z[57] = c),
          (z[58] = u),
          (z[59] = f))
        : (f = z[59]),
      z[60] !== f || z[61] !== m || z[62] !== p
        ? ((g = (0, a.jsxs)("div", { className: m, children: [p, f] })),
          (z[60] = f),
          (z[61] = m),
          (z[62] = p),
          (z[63] = g))
        : (g = z[63]),
      z[64] !== L || z[65] !== F
        ? ((y = F(
            L
              ? "kolscan.top_charts.hide_stats"
              : "kolscan.top_charts.show_stats",
          )),
          (z[64] = L),
          (z[65] = F),
          (z[66] = y))
        : (y = z[66]),
      z[67] === Symbol.for("react.memo_cache_sentinel")
        ? ((w = () => M(tO)), (z[67] = w))
        : (w = z[67]),
      z[68] !== L
        ? ((j = L
            ? (0, a.jsx)(q.cg, { className: "size-4" })
            : (0, a.jsx)(q.J0, { className: "size-4" })),
          (z[68] = L),
          (z[69] = j))
        : (j = z[69]),
      z[70] !== L || z[71] !== y || z[72] !== j
        ? ((v = (0, a.jsx)("button", {
            type: "button",
            "aria-expanded": L,
            "aria-label": y,
            onClick: w,
            className:
              "shrink-0 rounded-full p-1.5 text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
            children: j,
          })),
          (z[70] = L),
          (z[71] = y),
          (z[72] = j),
          (z[73] = v))
        : (v = z[73]),
      z[74] !== g || z[75] !== v || z[76] !== x || z[77] !== b
        ? ((N = (0, a.jsxs)("div", { className: x, children: [b, g, v] })),
          (z[74] = g),
          (z[75] = v),
          (z[76] = x),
          (z[77] = b),
          (z[78] = N))
        : (N = z[78]),
      z[79] !== $ || z[80] !== L
        ? ((_ = L
            ? (0, a.jsx)(e7, {
                entry: $,
                className: "mt-3 border-t border-border-tertiary pt-3",
              })
            : null),
          (z[79] = $),
          (z[80] = L),
          (z[81] = _))
        : (_ = z[81]),
      z[82] !== r || z[83] !== n || z[84] !== N || z[85] !== _
        ? ((k = (0, a.jsxs)("div", {
            "data-testid": r,
            className: n,
            children: [N, _],
          })),
          (z[82] = r),
          (z[83] = n),
          (z[84] = N),
          (z[85] = _),
          (z[86] = k))
        : (k = z[86]),
      k
    );
  }
  function tO(e) {
    return !e;
  }
  let tD = "daily",
    tK = [],
    tZ = (e) => ({
      key: e.walletAddress,
      rank: e.rank,
      name: e.username?.trim() || (0, P.d)(e.walletAddress),
      avatarUrl: e.profileImage ?? null,
      href: (0, C.$)(e.walletAddress),
      pnlUsd: e.pnlUsd,
      onClick: () => (0, eu.Rz)({ leaderboardRank: e.rank }),
    });
  function tB(e) {
    let t,
      r,
      o,
      u,
      m,
      x,
      b,
      h,
      g,
      y,
      w,
      j,
      v,
      N,
      _,
      k,
      z,
      I,
      U,
      A,
      S,
      C,
      P,
      q,
      F = (0, s.c)(68);
    F[0] !== e
      ? ((t = void 0 === e ? {} : e), (F[0] = e), (F[1] = t))
      : (t = F[1]);
    let { initialPeriod: L, onPeriodChange: $ } = t,
      { t: E } = (0, l.f)(),
      {
        timeframe: R,
        landing: T,
        setTimeframe: O,
      } = (0, th.b)(tD, "person", void 0 === L ? null : L),
      D = R === th.N,
      K = D ? tD : R,
      [Z, B] = (0, i.useState)("combined"),
      [Q, V] = (0, i.useState)(!1),
      [W, J] = (0, i.useState)(25);
    (F[2] !== E
      ? ((r = E("web.leaderboard.period_1d")), (F[2] = E), (F[3] = r))
      : (r = F[3]),
      F[4] !== r
        ? ((o = { value: "daily", label: r }), (F[4] = r), (F[5] = o))
        : (o = F[5]),
      F[6] !== E
        ? ((u = E("web.leaderboard.period_1w")), (F[6] = E), (F[7] = u))
        : (u = F[7]),
      F[8] !== u
        ? ((m = { value: "weekly", label: u }), (F[8] = u), (F[9] = m))
        : (m = F[9]),
      F[10] !== E
        ? ((x = E("web.leaderboard.period_1m")), (F[10] = E), (F[11] = x))
        : (x = F[11]),
      F[12] !== x
        ? ((b = { value: "monthly", label: x }), (F[12] = x), (F[13] = b))
        : (b = F[13]),
      F[14] !== o || F[15] !== m || F[16] !== b
        ? ((h = [o, m, b]), (F[14] = o), (F[15] = m), (F[16] = b), (F[17] = h))
        : (h = F[17]));
    let G = h,
      H = (0, th.t)(G);
    F[18] !== T || F[19] !== $ || F[20] !== O || F[21] !== R
      ? ((g = (e) => {
          e !== R && (O(e), J(25), $?.(e === T ? null : e));
        }),
        (F[18] = T),
        (F[19] = $),
        (F[20] = O),
        (F[21] = R),
        (F[22] = g))
      : (g = F[22]);
    let X = g;
    F[23] !== Z
      ? ((y = (e) => {
          e !== Z && (B(e), J(25));
        }),
        (F[23] = Z),
        (F[24] = y))
      : (y = F[24]);
    let Y = y,
      { address: ee } = (0, p.F)(),
      et = (0, f.o)(),
      er = !D,
      ea = D ? void 0 : 6e4;
    F[25] !== K || F[26] !== Z || F[27] !== er || F[28] !== ea
      ? ((w = {
          period: K,
          sort: Z,
          limit: 100,
          enabled: er,
          refetchIntervalMs: ea,
        }),
        (F[25] = K),
        (F[26] = Z),
        (F[27] = er),
        (F[28] = ea),
        (F[29] = w))
      : (w = F[29]);
    let es = (0, tf.f)(w),
      el = void 0 !== es.data && !es.isPlaceholderData,
      en = es.isError && !es.isFetching && !el,
      ei = !en && !el && (es.isPending || es.isPlaceholderData || es.isError),
      ed =
        ei || en
          ? tK
          : ((q = es.data?.entries),
            (q ?? []).map((e) => ({
              ...e,
              pnlUsd: (0, tg.n)(e, Z) ?? e.pnlUsd,
            }))),
      eo = ed.slice(0, 4).map(tZ),
      ec = !ei && !en && 0 === ed.length,
      eu = !ei && !en && ed.length > 0,
      em = ed.slice(0, W),
      ep = W < ed.length,
      { rootRef: ex, controlRowRef: eb, periodControlTopPx: eh } = ek();
    (F[30] !== E
      ? ((j = E("web.leaderboard.time_window")), (F[30] = E), (F[31] = j))
      : (j = F[31]),
      F[32] !== X || F[33] !== j || F[34] !== R || F[35] !== H
        ? ((v = (0, a.jsx)(c.f, {
            options: H,
            value: R,
            onChange: X,
            ariaLabel: j,
          })),
          (F[32] = X),
          (F[33] = j),
          (F[34] = R),
          (F[35] = H),
          (F[36] = v))
        : (v = F[36]));
    let ef = v;
    if (D) {
      let e, t;
      return (
        F[37] !== ef || F[38] !== eh
          ? ((e = (0, a.jsx)(to, {
              kind: "person",
              periodControl: ef,
              periodControlTopPx: eh,
              periodControlLeadClassName:
                "[--cup-lead:79px] sm:[--cup-lead:61px] lg:[--cup-lead:43px]",
            })),
            (F[37] = ef),
            (F[38] = eh),
            (F[39] = e))
          : (e = F[39]),
        F[40] !== ex || F[41] !== e
          ? ((t = (0, a.jsx)("div", {
              ref: ex,
              className: "flex flex-col pt-3",
              "data-testid": "traders-leaderboard-board",
              children: e,
            })),
            (F[40] = ex),
            (F[41] = e),
            (F[42] = t))
          : (t = F[42]),
        t
      );
    }
    return (
      F[43] !== E
        ? ((N = E("web.leaderboard.callout_eligibility_note")),
          (F[43] = E),
          (F[44] = N))
        : (N = F[44]),
      F[45] === Symbol.for("react.memo_cache_sentinel")
        ? ((_ = () => V(!0)), (F[45] = _))
        : (_ = F[45]),
      F[46] !== N
        ? ((k = (0, a.jsx)(eg.f, { message: N, onPress: _ })),
          (F[46] = N),
          (F[47] = k))
        : (k = F[47]),
      F[48] !== E
        ? ((z = E("web.leaderboard.top_traders_podium")),
          (F[48] = E),
          (F[49] = z))
        : (z = F[49]),
      F[50] !== Y || F[51] !== Z
        ? ((I = (0, a.jsx)(tb, { value: Z, onSelect: Y })),
          (F[50] = Y),
          (F[51] = Z),
          (F[52] = I))
        : (I = F[52]),
      F[53] !== eb || F[54] !== ef || F[55] !== I
        ? ((U = (0, a.jsxs)("div", {
            ref: eb,
            className: "flex items-center justify-between gap-2 pb-4",
            children: [ef, I],
          })),
          (F[53] = eb),
          (F[54] = ef),
          (F[55] = I),
          (F[56] = U))
        : (U = F[56]),
      F[57] !== ei
        ? ((A = ei
            ? (0, a.jsx)(n.R, { testId: "pnl-leaderboard-skeleton" })
            : null),
          (F[57] = ei),
          (F[58] = A))
        : (A = F[58]),
      F[59] !== en || F[60] !== es || F[61] !== E
        ? ((S = en
            ? (0, a.jsx)(n.C, {
                message: E("web.leaderboard.error_board"),
                onRetry: () => void es.refetch(),
              })
            : null),
          (F[59] = en),
          (F[60] = es),
          (F[61] = E),
          (F[62] = S))
        : (S = F[62]),
      F[63] !== ec || F[64] !== E
        ? ((C = ec
            ? (0, a.jsx)(n.D, { title: E("web.leaderboard.empty_board") })
            : null),
          (F[63] = ec),
          (F[64] = E),
          (F[65] = C))
        : (C = F[65]),
      F[66] !== Q
        ? ((P = (0, a.jsx)(M, { open: Q, onOpenChange: V })),
          (F[66] = Q),
          (F[67] = P))
        : (P = F[67]),
      (0, a.jsxs)("div", {
        ref: ex,
        className: "flex flex-col pt-3",
        "data-testid": "traders-leaderboard-board",
        children: [
          k,
          (0, a.jsx)(tE, { rows: eo, isLoading: ei, ariaLabel: z }),
          U,
          A,
          S,
          C,
          eu
            ? (0, a.jsxs)(n.B, {
                ariaLabel: E("web.leaderboard.rankings_aria"),
                children: [
                  ee
                    ? (0, a.jsx)("div", {
                        className: "p-2",
                        children: (0, a.jsx)(tT, {
                          viewerAddress: ee,
                          viewer: es.data?.viewer,
                          sort: Z,
                        }),
                      })
                    : null,
                  (0, a.jsx)("ol", {
                    "aria-label": E("web.leaderboard.ranked_traders"),
                    className: "flex flex-col",
                    children: em.map((e) =>
                      (0, a.jsx)(
                        "li",
                        {
                          className:
                            "border-t border-border-primary [contain-intrinsic-size:auto_65px] [content-visibility:auto] first:border-t-0",
                          children: (0, a.jsx)(tq, {
                            entry: e,
                            sort: Z,
                            viewerAddress: ee,
                            viewerFollowing: et,
                          }),
                        },
                        e.walletAddress,
                      ),
                    ),
                  }),
                  ep
                    ? (0, a.jsx)("div", {
                        className: "border-t border-border-primary p-2",
                        children: (0, a.jsx)(d.f, {
                          hasNextPage: !0,
                          isFetchingNextPage: !1,
                          onFetchNextPage: () => J(tQ),
                          label: (0, ty.G)(
                            `Show ${Math.min(25, ed.length - W)} more`,
                          ),
                        }),
                      })
                    : null,
                ],
              })
            : null,
          P,
        ],
      })
    );
  }
  function tQ(e) {
    return e + 25;
  }
  var tV = e.i(845167),
    tW = e.i(80559),
    tJ = e.i(493270);
  function tG(e) {
    let t,
      r,
      n,
      i,
      d,
      o,
      c,
      u,
      m,
      x,
      b,
      h,
      f,
      g,
      y,
      w,
      j,
      v,
      N,
      _ = (0, s.c)(46),
      { viewerAddress: k } = e,
      { t: z } = (0, l.f)(),
      { user: I } = (0, p.F)();
    _[0] !== k
      ? ((t = { walletAddress: k, enabled: !0 }), (_[0] = k), (_[1] = t))
      : (t = _[1]);
    let U = (0, tW.U)(t);
    if (_[2] !== I?.profile_image || _[3] !== I?.username || _[4] !== k) {
      let e;
      ((n = I?.username?.trim() || (0, P.d)(k)),
        _[12] !== I?.profile_image
          ? ((e = I?.profile_image?.trim() || null),
            (_[12] = I?.profile_image),
            (_[13] = e))
          : (e = _[13]));
      let t = e;
      ((r = Q.default),
        _[14] !== k
          ? ((o = (0, C.$)(k)), (_[14] = k), (_[15] = o))
          : (o = _[15]),
        (c = "payout-earner-you-card"),
        (u =
          "flex items-center gap-3 rounded-2xl bg-bg-secondary px-4 py-3 transition-colors hover:bg-bg-tertiary"),
        (i = "relative shrink-0"),
        (d = t
          ? (0, a.jsx)("img", {
              src: t,
              alt: "",
              width: 40,
              height: 40,
              loading: "lazy",
              className: "size-10 rounded-full object-cover",
            })
          : (0, a.jsx)("span", {
              "aria-hidden": !0,
              className:
                "flex size-10 items-center justify-center rounded-full bg-bg-quaternary text-sm font-semibold text-text-secondary",
              children: n.slice(0, 1).toUpperCase(),
            })),
        (_[2] = I?.profile_image),
        (_[3] = I?.username),
        (_[4] = k),
        (_[5] = r),
        (_[6] = n),
        (_[7] = i),
        (_[8] = d),
        (_[9] = o),
        (_[10] = c),
        (_[11] = u));
    } else
      ((r = _[5]),
        (n = _[6]),
        (i = _[7]),
        (d = _[8]),
        (o = _[9]),
        (c = _[10]),
        (u = _[11]));
    return (
      _[16] !== z
        ? ((m = z("web.leaderboard.you_badge")), (_[16] = z), (_[17] = m))
        : (m = _[17]),
      _[18] !== m
        ? ((x = (0, a.jsx)("span", {
            className:
              "absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-white px-1.5 text-[9px] font-bold uppercase leading-[14px] text-black",
            children: m,
          })),
          (_[18] = m),
          (_[19] = x))
        : (x = _[19]),
      _[20] !== i || _[21] !== d || _[22] !== x
        ? ((b = (0, a.jsxs)("span", { className: i, children: [d, x] })),
          (_[20] = i),
          (_[21] = d),
          (_[22] = x),
          (_[23] = b))
        : (b = _[23]),
      _[24] !== n
        ? ((h = (0, a.jsx)("span", {
            className:
              "min-w-0 flex-1 truncate text-sm font-semibold text-text-primary",
            children: n,
          })),
          (_[24] = n),
          (_[25] = h))
        : (h = _[25]),
      _[26] !== z
        ? ((f = z("kolscan.top_charts.payouts_earnings")),
          (_[26] = z),
          (_[27] = f))
        : (f = _[27]),
      _[28] !== f
        ? ((g = (0, a.jsx)("span", {
            className:
              "text-[10px] font-medium uppercase tracking-wider text-text-tertiary",
            children: f,
          })),
          (_[28] = f),
          (_[29] = g))
        : (g = _[29]),
      _[30] !== U.data
        ? ((y = null == U.data ? "—" : (0, H.w)(U.data)),
          (_[30] = U.data),
          (_[31] = y))
        : (y = _[31]),
      _[32] !== y
        ? ((w = (0, a.jsx)("span", {
            className: "text-sm font-bold tabular-nums text-gain",
            "data-testid": "payout-earner-you-total",
            children: y,
          })),
          (_[32] = y),
          (_[33] = w))
        : (w = _[33]),
      _[34] !== g || _[35] !== w
        ? ((j = (0, a.jsxs)("span", {
            className: "flex shrink-0 flex-col items-end",
            children: [g, w],
          })),
          (_[34] = g),
          (_[35] = w),
          (_[36] = j))
        : (j = _[36]),
      _[37] === Symbol.for("react.memo_cache_sentinel")
        ? ((v = (0, a.jsx)(q.kK, {
            "aria-hidden": !0,
            className: "size-4 shrink-0 text-text-tertiary",
          })),
          (_[37] = v))
        : (v = _[37]),
      _[38] !== r ||
      _[39] !== h ||
      _[40] !== j ||
      _[41] !== o ||
      _[42] !== c ||
      _[43] !== u ||
      _[44] !== b
        ? ((N = (0, a.jsxs)(r, {
            href: o,
            "data-testid": c,
            className: u,
            children: [b, h, j, v],
          })),
          (_[38] = r),
          (_[39] = h),
          (_[40] = j),
          (_[41] = o),
          (_[42] = c),
          (_[43] = u),
          (_[44] = b),
          (_[45] = N))
        : (N = _[45]),
      N
    );
  }
  var tH = e.i(639374);
  let tX = (e) => e.walletAddress ?? e.wallets.find(tH.f) ?? e.wallets[0] ?? "",
    tY = (e) => {
      if (null === e.userId) return null;
      let t = tX(e);
      return t ? (0, C.$)(t) : null;
    };
  function t0(e) {
    let t,
      r,
      i,
      d,
      o,
      c,
      u,
      m,
      p,
      x,
      b,
      h,
      f,
      g,
      y,
      w,
      j,
      v,
      N,
      _,
      k,
      z,
      I = (0, s.c)(58),
      { entry: U, viewerAddress: S, viewerFollowing: C } = e,
      { t: F } = (0, l.f)(),
      L = (0, tv.$)();
    if (I[0] !== U || I[1] !== L || I[2] !== S) {
      let e,
        s,
        l,
        b = tX(U);
      ((t = U.username?.trim() || (0, P.d)(b)),
        (i = tY(U)),
        (d = !!S),
        (o = !0 === U.isViewer || L(b)),
        (r = null !== U.userId && U.walletAddress ? U.walletAddress : null),
        (c = n.S[U.rank]),
        I[13] !== U.profileImageUrl
          ? ((e = (0, eY.Z)({
              sourceUrl: U.profileImageUrl,
              width: eY.z.list,
            })),
            (I[13] = U.profileImageUrl),
            (I[14] = e))
          : (e = I[14]));
      let h = e;
      ((x = h
        ? (0, a.jsx)("img", {
            src: h,
            alt: "",
            width: 40,
            height: 40,
            loading: "lazy",
            className: "size-10 shrink-0 rounded-full object-cover",
          })
        : (0, a.jsx)("span", {
            "aria-hidden": !0,
            className:
              "flex size-10 shrink-0 items-center justify-center rounded-full bg-bg-quaternary text-sm font-semibold text-text-secondary",
            children: t.slice(0, 1).toUpperCase(),
          })),
        (u = "min-w-0"),
        I[15] !== U
          ? ((s = (0, J.f)(U) ? (0, a.jsx)(B.f, { size: 18 }) : null),
            (I[15] = U),
            (I[16] = s))
          : (s = I[16]),
        I[17] !== c
          ? ((l = c
              ? (0, a.jsx)(q.zN, {
                  "aria-hidden": !0,
                  className: (0, A.c)("size-3.5 shrink-0", c),
                })
              : null),
            (I[17] = c),
            (I[18] = l))
          : (l = I[18]),
        (m = (0, a.jsxs)("span", {
          className: "flex min-w-0 items-center gap-1.5",
          children: [
            (0, a.jsx)("span", {
              className: (0, A.c)(
                "truncate text-sm font-semibold text-text-primary",
                i && "hover:underline",
              ),
              children: t,
            }),
            s,
            l,
          ],
        })),
        (p =
          U.username?.trim() && b
            ? (0, a.jsx)("span", {
                className: "block truncate text-xs text-text-tertiary",
                children: (0, P.d)(b),
              })
            : null),
        (I[0] = U),
        (I[1] = L),
        (I[2] = S),
        (I[3] = t),
        (I[4] = r),
        (I[5] = i),
        (I[6] = d),
        (I[7] = o),
        (I[8] = c),
        (I[9] = u),
        (I[10] = m),
        (I[11] = p),
        (I[12] = x));
    } else
      ((t = I[3]),
        (r = I[4]),
        (i = I[5]),
        (d = I[6]),
        (o = I[7]),
        (c = I[8]),
        (u = I[9]),
        (m = I[10]),
        (p = I[11]),
        (x = I[12]));
    (I[19] !== u || I[20] !== m || I[21] !== p
      ? ((b = (0, a.jsxs)("span", { className: u, children: [m, p] })),
        (I[19] = u),
        (I[20] = m),
        (I[21] = p),
        (I[22] = b))
      : (b = I[22]),
      I[23] !== x || I[24] !== b
        ? ((h = (0, a.jsxs)(a.Fragment, { children: [x, b] })),
          (I[23] = x),
          (I[24] = b),
          (I[25] = h))
        : (h = I[25]));
    let M = h,
      $ = c ?? "text-text-tertiary";
    return (
      I[26] !== $
        ? ((f = (0, A.c)("w-7 shrink-0 text-xs font-semibold tabular-nums", $)),
          (I[26] = $),
          (I[27] = f))
        : (f = I[27]),
      I[28] !== U.rank || I[29] !== f
        ? ((g = (0, a.jsx)("span", { className: f, children: U.rank })),
          (I[28] = U.rank),
          (I[29] = f),
          (I[30] = g))
        : (g = I[30]),
      I[31] !== i || I[32] !== M
        ? ((y = i
            ? (0, a.jsx)(Q.default, {
                href: i,
                className: "flex min-w-0 flex-1 items-center gap-3",
                children: M,
              })
            : (0, a.jsx)("span", {
                className: "flex min-w-0 flex-1 items-center gap-3",
                children: M,
              })),
          (I[31] = i),
          (I[32] = M),
          (I[33] = y))
        : (y = I[33]),
      I[34] !== U.totalPaidUsdc
        ? ((w = (0, H.w)(U.totalPaidUsdc)),
          (I[34] = U.totalPaidUsdc),
          (I[35] = w))
        : (w = I[35]),
      I[36] !== w
        ? ((j = (0, a.jsx)("span", {
            className: "text-sm font-bold tabular-nums text-gain",
            children: w,
          })),
          (I[36] = w),
          (I[37] = j))
        : (j = I[37]),
      I[38] !== U.payoutCount || I[39] !== F
        ? ((v = F("kolscan.top_charts.payouts_row_count", {
            count: U.payoutCount,
          })),
          (I[38] = U.payoutCount),
          (I[39] = F),
          (I[40] = v))
        : (v = I[40]),
      I[41] !== v
        ? ((N = (0, a.jsx)("span", {
            className: "text-xs text-text-tertiary",
            children: v,
          })),
          (I[41] = v),
          (I[42] = N))
        : (N = I[42]),
      I[43] !== j || I[44] !== N
        ? ((_ = (0, a.jsxs)("span", {
            className: "ml-auto flex shrink-0 flex-col items-end",
            children: [j, N],
          })),
          (I[43] = j),
          (I[44] = N),
          (I[45] = _))
        : (_ = I[45]),
      I[46] !== t ||
      I[47] !== U.viewerFollows ||
      I[48] !== r ||
      I[49] !== d ||
      I[50] !== o ||
      I[51] !== C
        ? ((k = d
            ? r && !o
              ? (0, a.jsx)(tk.f, {
                  userAddress: r,
                  displayName: t,
                  isLoggedIn: d,
                  initialIsFollowing:
                    C.isFollowing(r) ?? U.viewerFollows ?? void 0,
                  variant: "icon",
                  size: "sm",
                })
              : (0, a.jsx)("span", {
                  "aria-hidden": !0,
                  className: "size-6 shrink-0",
                })
            : null),
          (I[46] = t),
          (I[47] = U.viewerFollows),
          (I[48] = r),
          (I[49] = d),
          (I[50] = o),
          (I[51] = C),
          (I[52] = k))
        : (k = I[52]),
      I[53] !== y || I[54] !== _ || I[55] !== k || I[56] !== g
        ? ((z = (0, a.jsx)("div", {
            "data-testid": "payout-leaderboard-row",
            className: "px-4 py-3 transition-colors hover:bg-bg-tertiary",
            children: (0, a.jsxs)("div", {
              className: "flex items-center gap-3",
              children: [g, y, _, k],
            }),
          })),
          (I[53] = y),
          (I[54] = _),
          (I[55] = k),
          (I[56] = g),
          (I[57] = z))
        : (z = I[57]),
      z
    );
  }
  let t1 = (e) => ({
    key: (0, tJ.z)(e),
    rank: e.rank,
    name: e.username?.trim() || (0, P.d)(tX(e)),
    avatarUrl: e.profileImageUrl,
    href: tY(e),
    pnlUsd: e.totalPaidUsdc,
  });
  function t2() {
    let e,
      t,
      r,
      o,
      u,
      m,
      x,
      b,
      h,
      g,
      y,
      w,
      j,
      v,
      N,
      _,
      k,
      z,
      I,
      U,
      A,
      S,
      C,
      P,
      q,
      F,
      L,
      M,
      $,
      E,
      R = (0, s.c)(86),
      { t: T } = (0, l.f)(),
      { address: O } = (0, p.F)(),
      D = !!O,
      [K, Z] = (0, i.useState)("1d"),
      [B, Q] = (0, i.useState)(!1),
      V = (0, f.o)();
    (R[0] !== T ? ((e = T("common.all")), (R[0] = T), (R[1] = e)) : (e = R[1]),
      R[2] !== e
        ? ((t = { value: "all", label: e }), (R[2] = e), (R[3] = t))
        : (t = R[3]),
      R[4] !== T
        ? ((r = T("web.leaderboard.period_1d")), (R[4] = T), (R[5] = r))
        : (r = R[5]),
      R[6] !== r
        ? ((o = { value: "1d", label: r }), (R[6] = r), (R[7] = o))
        : (o = R[7]),
      R[8] !== T
        ? ((u = T("web.leaderboard.period_1w")), (R[8] = T), (R[9] = u))
        : (u = R[9]),
      R[10] !== u
        ? ((m = { value: "1w", label: u }), (R[10] = u), (R[11] = m))
        : (m = R[11]),
      R[12] !== T
        ? ((x = T("web.leaderboard.period_1m")), (R[12] = T), (R[13] = x))
        : (x = R[13]),
      R[14] !== x
        ? ((b = { value: "1m", label: x }), (R[14] = x), (R[15] = b))
        : (b = R[15]),
      R[16] !== t || R[17] !== o || R[18] !== m || R[19] !== b
        ? ((h = [t, o, m, b]),
          (R[16] = t),
          (R[17] = o),
          (R[18] = m),
          (R[19] = b),
          (R[20] = h))
        : (h = R[20]));
    let W = h;
    R[21] !== D || R[22] !== K
      ? ((g = {
          period: K,
          isLoggedIn: D,
          enabled: !0,
          refetchIntervalMs: 6e4,
        }),
        (R[21] = D),
        (R[22] = K),
        (R[23] = g))
      : (g = R[23]);
    let J = (0, tW.a)(g);
    if (
      R[24] !== J.data?.entries ||
      R[25] !== J.error ||
      R[26] !== J.isError ||
      R[27] !== J.isFetching ||
      R[28] !== J.isPending ||
      R[29] !== J.isSuccess
    ) {
      y = J.data?.entries ?? [];
      let e = J.error instanceof tJ.j && 401 === J.error.status;
      ((v =
        !(w = J.isPending || (J.isError && J.isFetching && 0 === y.length)) &&
        J.isError &&
        !e &&
        0 === y.length),
        (N = !w && e && 0 === y.length),
        (j = !w && J.isSuccess && 0 === y.length),
        (_ = !w && y.length > 0),
        (k = y.slice(0, 4).map(t1)),
        (R[24] = J.data?.entries),
        (R[25] = J.error),
        (R[26] = J.isError),
        (R[27] = J.isFetching),
        (R[28] = J.isPending),
        (R[29] = J.isSuccess),
        (R[30] = y),
        (R[31] = w),
        (R[32] = j),
        (R[33] = v),
        (R[34] = N),
        (R[35] = _),
        (R[36] = k));
    } else
      ((y = R[30]),
        (w = R[31]),
        (j = R[32]),
        (v = R[33]),
        (N = R[34]),
        (_ = R[35]),
        (k = R[36]));
    let G = k;
    return (
      R[37] !== T
        ? ((z = T("kolscan.top_charts.payouts_info")), (R[37] = T), (R[38] = z))
        : (z = R[38]),
      R[39] === Symbol.for("react.memo_cache_sentinel")
        ? ((I = () => Q(!0)), (R[39] = I))
        : (I = R[39]),
      R[40] !== z
        ? ((U = (0, a.jsx)(eg.f, { message: z, onPress: I })),
          (R[40] = z),
          (R[41] = U))
        : (U = R[41]),
      R[42] !== w ||
      R[43] !== j ||
      R[44] !== v ||
      R[45] !== N ||
      R[46] !== G ||
      R[47] !== T
        ? ((A =
            j || N || v
              ? null
              : (0, a.jsx)(tE, {
                  rows: G,
                  isLoading: w,
                  ariaLabel: T("web.leaderboard.top_rewards_podium"),
                  backdrop: "megaphones",
                })),
          (R[42] = w),
          (R[43] = j),
          (R[44] = v),
          (R[45] = N),
          (R[46] = G),
          (R[47] = T),
          (R[48] = A))
        : (A = R[48]),
      R[49] !== T
        ? ((S = T("web.leaderboard.payout_window")), (R[49] = T), (R[50] = S))
        : (S = R[50]),
      R[51] !== K || R[52] !== W || R[53] !== S
        ? ((C = (0, a.jsx)("div", {
            className: "flex items-center gap-2 pb-4 pt-2",
            children: (0, a.jsx)(c.f, {
              options: W,
              value: K,
              onChange: Z,
              ariaLabel: S,
            }),
          })),
          (R[51] = K),
          (R[52] = W),
          (R[53] = S),
          (R[54] = C))
        : (C = R[54]),
      R[55] !== w
        ? ((P = w
            ? (0, a.jsx)(n.R, { testId: "payout-leaderboard-skeleton" })
            : null),
          (R[55] = w),
          (R[56] = P))
        : (P = R[56]),
      R[57] !== J || R[58] !== v || R[59] !== T
        ? ((q = v
            ? (0, a.jsx)(n.C, {
                message: T("kolscan.top_charts.payouts_error"),
                onRetry: () => void J.refetch(),
              })
            : null),
          (R[57] = J),
          (R[58] = v),
          (R[59] = T),
          (R[60] = q))
        : (q = R[60]),
      R[61] !== N || R[62] !== T
        ? ((F = N
            ? (0, a.jsx)(n.D, {
                title: T("web.leaderboard.signed_out_earners"),
              })
            : null),
          (R[61] = N),
          (R[62] = T),
          (R[63] = F))
        : (F = R[63]),
      R[64] !== j || R[65] !== T
        ? ((L = j
            ? (0, a.jsx)(n.D, {
                title: T("kolscan.top_charts.payouts_empty_title"),
                description: T("kolscan.top_charts.payouts_empty_subtitle"),
              })
            : null),
          (R[64] = j),
          (R[65] = T),
          (R[66] = L))
        : (L = R[66]),
      R[67] !== O ||
      R[68] !== J ||
      R[69] !== y ||
      R[70] !== _ ||
      R[71] !== T ||
      R[72] !== V
        ? ((M = _
            ? (0, a.jsxs)(n.B, {
                ariaLabel: T("web.leaderboard.top_rewards"),
                children: [
                  O
                    ? (0, a.jsx)("div", {
                        className: "p-2",
                        children: (0, a.jsx)(tG, { viewerAddress: O }),
                      })
                    : null,
                  (0, a.jsx)("ol", {
                    "aria-label": T("web.leaderboard.ranked_earners"),
                    className: "flex flex-col",
                    children: y.map((e) =>
                      (0, a.jsx)(
                        "li",
                        {
                          className:
                            "border-t border-border-primary [contain-intrinsic-size:auto_65px] [content-visibility:auto] first:border-t-0",
                          children: (0, a.jsx)(t0, {
                            entry: e,
                            viewerAddress: O,
                            viewerFollowing: V,
                          }),
                        },
                        (0, tJ.z)(e),
                      ),
                    ),
                  }),
                  J.hasNextPage
                    ? (0, a.jsx)("div", {
                        className: "border-t border-border-primary p-2",
                        children: (0, a.jsx)(d.f, {
                          hasNextPage: !0,
                          isFetchingNextPage: J.isFetchingNextPage,
                          onFetchNextPage: () => void J.fetchNextPage(),
                          label: T("web.feed.load_more"),
                          autoLoad: !0,
                        }),
                      })
                    : null,
                ],
              })
            : null),
          (R[67] = O),
          (R[68] = J),
          (R[69] = y),
          (R[70] = _),
          (R[71] = T),
          (R[72] = V),
          (R[73] = M))
        : (M = R[73]),
      R[74] !== B
        ? (($ = (0, a.jsx)(tV.f, { isOpen: B, onOpenChange: Q })),
          (R[74] = B),
          (R[75] = $))
        : ($ = R[75]),
      R[76] !== U ||
      R[77] !== A ||
      R[78] !== C ||
      R[79] !== P ||
      R[80] !== q ||
      R[81] !== F ||
      R[82] !== L ||
      R[83] !== M ||
      R[84] !== $
        ? ((E = (0, a.jsxs)("div", {
            className: "flex flex-col pt-3",
            "data-testid": "rewards-leaderboard-board",
            children: [U, A, C, P, q, F, L, M, $],
          })),
          (R[76] = U),
          (R[77] = A),
          (R[78] = C),
          (R[79] = P),
          (R[80] = q),
          (R[81] = F),
          (R[82] = L),
          (R[83] = M),
          (R[84] = $),
          (R[85] = E))
        : (E = R[85]),
      E
    );
  }
  var t3 = e.i(816897),
    t4 = e.i(659427),
    t5 = e.i(956683),
    t6 = e.i(599077),
    t7 = e.i(626540);
  let t8 = { daily: "1d", weekly: "1w", monthly: "1m" };
  function t9(e) {
    let t,
      r,
      n,
      d,
      o,
      c,
      u,
      m,
      p,
      x,
      b,
      h,
      f,
      g,
      y,
      w,
      j,
      v,
      N,
      _,
      k,
      z = (0, s.c)(66),
      { squad: I, inviteCount: U, period: A, sort: S, boardPnlUsd: C } = e,
      { t: P } = (0, l.f)(),
      [F, L] = (0, i.useState)(!1);
    z[0] !== U
      ? ((t = (0, a.jsx)(rt, { inviteCount: U })), (z[0] = U), (z[1] = t))
      : (t = z[1]);
    let M = t;
    if (!I) {
      let e, t, r;
      return (
        z[2] !== P
          ? ((e = P("web.leaderboard.my_squad_empty_prompt")),
            (z[2] = P),
            (z[3] = e))
          : (e = z[3]),
        z[4] !== e
          ? ((t = (0, a.jsx)("p", {
              className: "text-center text-sm font-semibold text-text-primary",
              children: e,
            })),
            (z[4] = e),
            (z[5] = t))
          : (t = z[5]),
        z[6] !== M || z[7] !== t
          ? ((r = (0, a.jsxs)("div", {
              className:
                "flex flex-col items-center gap-3 rounded-2xl bg-bg-secondary p-3",
              "data-testid": "squads-leaderboard-my-card-nosquad",
              children: [t, M],
            })),
            (z[6] = M),
            (z[7] = t),
            (z[8] = r))
          : (r = z[8]),
        r
      );
    }
    (z[9] !== I.userId || z[10] !== I.username
      ? ((r = (0, G.Z)({ groupId: I.userId, username: I.username })),
        (z[9] = I.userId),
        (z[10] = I.username),
        (z[11] = r))
      : (r = z[11]),
      z[12] !== I.username || z[13] !== P
        ? ((n = I.username || P("web.leaderboard.squads_unnamed_row")),
          (z[12] = I.username),
          (z[13] = P),
          (z[14] = n))
        : (n = z[14]));
    let $ = I.userId;
    return (
      z[15] !== I.profileImage
        ? ((d = (0, V.f)(I.profileImage)),
          (z[15] = I.profileImage),
          (z[16] = d))
        : (d = z[16]),
      z[17] !== I.userId || z[18] !== d
        ? ((o = (0, a.jsx)(Z.f, {
            address: $,
            alt: "",
            className: "size-10 rounded-xl object-cover",
            height: 40,
            ipfsPrefix: W.f,
            isAnonymous: !1,
            src: d,
            width: 40,
          })),
          (z[17] = I.userId),
          (z[18] = d),
          (z[19] = o))
        : (o = z[19]),
      z[20] !== r || z[21] !== n || z[22] !== o
        ? ((c = (0, a.jsx)(Q.default, {
            href: r,
            prefetch: !1,
            "aria-label": n,
            "data-testid": "squads-leaderboard-my-card-open",
            className: "shrink-0",
            children: o,
          })),
          (z[20] = r),
          (z[21] = n),
          (z[22] = o),
          (z[23] = c))
        : (c = z[23]),
      z[24] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = () => L(re)), (z[24] = u))
        : (u = z[24]),
      z[25] !== I.username || z[26] !== P
        ? ((m = I.username || P("web.leaderboard.squads_unnamed_row")),
          (z[25] = I.username),
          (z[26] = P),
          (z[27] = m))
        : (m = z[27]),
      z[28] !== m
        ? ((p = (0, a.jsx)("span", {
            className: "block truncate text-sm font-semibold text-text-primary",
            children: m,
          })),
          (z[28] = m),
          (z[29] = p))
        : (p = z[29]),
      z[30] !== I.memberCount || z[31] !== P
        ? ((x = P("profile.squads.info.member_count", {
            count: I.memberCount,
          })),
          (z[30] = I.memberCount),
          (z[31] = P),
          (z[32] = x))
        : (x = z[32]),
      z[33] !== x
        ? ((b = (0, a.jsx)("span", {
            className: "block truncate text-xs text-text-tertiary",
            children: x,
          })),
          (z[33] = x),
          (z[34] = b))
        : (b = z[34]),
      z[35] !== p || z[36] !== b
        ? ((h = (0, a.jsxs)("span", {
            className: "min-w-0 flex-1",
            children: [p, b],
          })),
          (z[35] = p),
          (z[36] = b),
          (z[37] = h))
        : (h = z[37]),
      z[38] !== P
        ? ((f = P("kolscan.top_charts.profit_usd_header")),
          (z[38] = P),
          (z[39] = f))
        : (f = z[39]),
      z[40] !== f
        ? ((g = (0, a.jsx)("span", {
            className:
              "text-[10px] font-medium uppercase tracking-wider text-text-tertiary",
            children: f,
          })),
          (z[40] = f),
          (z[41] = g))
        : (g = z[41]),
      z[42] !== C || z[43] !== A || z[44] !== S || z[45] !== I.userId
        ? ((y = (0, a.jsx)(rr, {
            groupId: I.userId,
            period: A,
            sort: S,
            boardPnlUsd: C,
          })),
          (z[42] = C),
          (z[43] = A),
          (z[44] = S),
          (z[45] = I.userId),
          (z[46] = y))
        : (y = z[46]),
      z[47] !== g || z[48] !== y
        ? ((w = (0, a.jsxs)("span", {
            className: "flex shrink-0 flex-col items-end",
            children: [g, y],
          })),
          (z[47] = g),
          (z[48] = y),
          (z[49] = w))
        : (w = z[49]),
      z[50] !== F
        ? ((j = F
            ? (0, a.jsx)(q.cg, {
                "aria-hidden": !0,
                className: "size-5 shrink-0 text-text-tertiary",
              })
            : (0, a.jsx)(q.J0, {
                "aria-hidden": !0,
                className: "size-5 shrink-0 text-text-tertiary",
              })),
          (z[50] = F),
          (z[51] = j))
        : (j = z[51]),
      z[52] !== F || z[53] !== h || z[54] !== w || z[55] !== j
        ? ((v = (0, a.jsxs)("button", {
            type: "button",
            "aria-expanded": F,
            onClick: u,
            "data-testid": "squads-leaderboard-my-card-toggle",
            className: "flex min-w-0 flex-1 items-center gap-3 text-left",
            children: [h, w, j],
          })),
          (z[52] = F),
          (z[53] = h),
          (z[54] = w),
          (z[55] = j),
          (z[56] = v))
        : (v = z[56]),
      z[57] !== v || z[58] !== c
        ? ((N = (0, a.jsxs)("div", {
            className: "flex items-center gap-3",
            children: [c, v],
          })),
          (z[57] = v),
          (z[58] = c),
          (z[59] = N))
        : (N = z[59]),
      z[60] !== M || z[61] !== F
        ? ((_ = F
            ? (0, a.jsxs)(a.Fragment, {
                children: [
                  (0, a.jsx)("div", { className: "h-px bg-border-secondary" }),
                  M,
                ],
              })
            : null),
          (z[60] = M),
          (z[61] = F),
          (z[62] = _))
        : (_ = z[62]),
      z[63] !== N || z[64] !== _
        ? ((k = (0, a.jsxs)("div", {
            className:
              "flex flex-col gap-2.5 rounded-2xl bg-bg-secondary px-4 py-3",
            "data-testid": "squads-leaderboard-my-card",
            children: [N, _],
          })),
          (z[63] = N),
          (z[64] = _),
          (z[65] = k))
        : (k = z[65]),
      k
    );
  }
  function re(e) {
    return !e;
  }
  function rt(e) {
    let t,
      r,
      n,
      i,
      d,
      o,
      c,
      u = (0, s.c)(20),
      { inviteCount: m } = e,
      { t: p } = (0, l.f)(),
      { push: x } = (0, t6.useRouter)(),
      b = m > 0;
    (u[0] !== x
      ? ((t = () => x("/squads/create")), (u[0] = x), (u[1] = t))
      : (t = u[1]),
      u[2] !== p
        ? ((r = p("profile.squads.create.cta")), (u[2] = p), (u[3] = r))
        : (r = u[3]),
      u[4] !== t || u[5] !== r
        ? ((n = (0, a.jsx)(er.K, {
            variant: "primary",
            size: 40,
            className: "flex-1",
            onClick: t,
            "data-testid": "squads-leaderboard-my-card-create",
            children: r,
          })),
          (u[4] = t),
          (u[5] = r),
          (u[6] = n))
        : (n = u[6]));
    let h = !b;
    return (
      u[7] !== x
        ? ((i = () => x("/squads/invitations")), (u[7] = x), (u[8] = i))
        : (i = u[8]),
      u[9] !== b || u[10] !== m || u[11] !== p
        ? ((d = b
            ? p("web.leaderboard.my_squad_view_invites", { count: m })
            : p("web.leaderboard.my_squad_no_invites")),
          (u[9] = b),
          (u[10] = m),
          (u[11] = p),
          (u[12] = d))
        : (d = u[12]),
      u[13] !== h || u[14] !== i || u[15] !== d
        ? ((o = (0, a.jsx)(er.K, {
            variant: "secondary",
            size: 40,
            className: "flex-1",
            isDisabled: h,
            onClick: i,
            "data-testid": "squads-leaderboard-my-card-invites",
            children: d,
          })),
          (u[13] = h),
          (u[14] = i),
          (u[15] = d),
          (u[16] = o))
        : (o = u[16]),
      u[17] !== n || u[18] !== o
        ? ((c = (0, a.jsxs)("div", {
            className: "flex w-full items-start gap-3",
            children: [n, o],
          })),
          (u[17] = n),
          (u[18] = o),
          (u[19] = c))
        : (c = u[19]),
      c
    );
  }
  function rr(e) {
    let t,
      r,
      l,
      n,
      i = (0, s.c)(11),
      { groupId: d, period: o, sort: c, boardPnlUsd: u } = e,
      m = void 0 === u,
      p = t8[o],
      x = m && "combined" === c;
    i[0] !== d || i[1] !== p || i[2] !== x
      ? ((t = { groupId: d, period: p, enabled: x }),
        (i[0] = d),
        (i[1] = p),
        (i[2] = x),
        (i[3] = t))
      : (t = i[3]);
    let b = (0, t7.f)(t),
      h = m ? ("combined" === c ? b.data.pnlUsd : null) : u,
      f =
        null == h || 0 === h
          ? "text-text-primary"
          : h > 0
            ? "text-gain"
            : "text-loss";
    if (
      (i[4] !== f
        ? ((r = (0, A.c)("text-sm font-bold tabular-nums", f)),
          (i[4] = f),
          (i[5] = r))
        : (r = i[5]),
      i[6] !== h)
    )
      ((l = null == h ? "—" : `${h >= 0 ? "+" : ""}${(0, H.w)(h)}`),
        (i[6] = h),
        (i[7] = l));
    else l = i[7];
    return (
      i[8] !== r || i[9] !== l
        ? ((n = (0, a.jsx)("span", {
            className: r,
            "data-testid": "squads-leaderboard-my-card-pnl",
            children: l,
          })),
          (i[8] = r),
          (i[9] = l),
          (i[10] = n))
        : (n = i[10]),
      n
    );
  }
  function ra(e) {
    let t,
      r,
      i,
      d,
      o,
      c,
      u,
      m,
      p,
      x,
      b,
      h = (0, s.c)(67),
      { entry: f, sort: g } = e,
      { t: y } = (0, l.f)(),
      w = n.S[f.rank];
    h[0] !== f.username || h[1] !== y
      ? ((t = f.username || y("web.leaderboard.squads_unnamed_row")),
        (h[0] = f.username),
        (h[1] = y),
        (h[2] = t))
      : (t = h[2]);
    let j = t;
    if (h[3] !== f || h[4] !== j || h[5] !== w || h[6] !== g || h[7] !== y) {
      let e,
        t,
        s,
        l,
        n,
        p,
        x,
        b,
        v,
        N,
        _,
        k,
        z = (0, t5.C)(f, g),
        I = 0 === z ? "text-text-primary" : z > 0 ? "text-gain" : "text-loss";
      ((u = "squad-leaderboard-row"),
        (m = "px-4 py-3 transition-colors hover:bg-bg-secondary"),
        (d = "flex items-center gap-3"));
      let U = w ?? "text-text-tertiary";
      (h[15] !== U
        ? ((e = (0, A.c)("w-7 shrink-0 text-xs font-semibold tabular-nums", U)),
          (h[15] = U),
          (h[16] = e))
        : (e = h[16]),
        h[17] !== f.rank || h[18] !== e
          ? ((o = (0, a.jsx)("span", { className: e, children: f.rank })),
            (h[17] = f.rank),
            (h[18] = e),
            (h[19] = o))
          : (o = h[19]),
        h[20] !== f.groupId || h[21] !== f.username
          ? ((t = (0, G.Z)({ groupId: f.groupId, username: f.username })),
            (h[20] = f.groupId),
            (h[21] = f.username),
            (h[22] = t))
          : (t = h[22]));
      let S = f.groupId;
      (h[23] !== f.profileImageUrl
        ? ((s = (0, V.f)(f.profileImageUrl)),
          (h[23] = f.profileImageUrl),
          (h[24] = s))
        : (s = h[24]),
        h[25] !== f.groupId || h[26] !== s
          ? ((l = (0, a.jsx)(Z.f, {
              address: S,
              alt: "",
              className: "size-10 shrink-0 rounded-xl object-cover",
              height: 40,
              ipfsPrefix: W.f,
              isAnonymous: !1,
              src: s,
              width: 40,
            })),
            (h[25] = f.groupId),
            (h[26] = s),
            (h[27] = l))
          : (l = h[27]));
      let C = w ?? "text-text-primary";
      (h[28] !== C
        ? ((n = (0, A.c)("truncate text-sm font-semibold hover:underline", C)),
          (h[28] = C),
          (h[29] = n))
        : (n = h[29]),
        h[30] !== j || h[31] !== n
          ? ((p = (0, a.jsx)("span", { className: n, children: j })),
            (h[30] = j),
            (h[31] = n),
            (h[32] = p))
          : (p = h[32]),
        h[33] !== f
          ? ((x = (0, J.f)(f) ? (0, a.jsx)(B.f, { size: 18 }) : null),
            (h[33] = f),
            (h[34] = x))
          : (x = h[34]),
        h[35] !== w
          ? ((b = w
              ? (0, a.jsx)(q.zN, {
                  "aria-hidden": !0,
                  className: (0, A.c)("size-3.5 shrink-0", w),
                })
              : null),
            (h[35] = w),
            (h[36] = b))
          : (b = h[36]),
        h[37] !== p || h[38] !== x || h[39] !== b
          ? ((v = (0, a.jsxs)("span", {
              className: "flex min-w-0 items-center gap-1.5",
              children: [p, x, b],
            })),
            (h[37] = p),
            (h[38] = x),
            (h[39] = b),
            (h[40] = v))
          : (v = h[40]),
        h[41] !== f.memberCount || h[42] !== y
          ? ((N = y("profile.squads.info.member_count", {
              count: f.memberCount,
            })),
            (h[41] = f.memberCount),
            (h[42] = y),
            (h[43] = N))
          : (N = h[43]),
        h[44] !== N
          ? ((_ = (0, a.jsx)("span", {
              className: "block truncate text-xs text-text-tertiary",
              children: N,
            })),
            (h[44] = N),
            (h[45] = _))
          : (_ = h[45]),
        h[46] !== v || h[47] !== _
          ? ((k = (0, a.jsxs)("span", {
              className: "min-w-0",
              children: [v, _],
            })),
            (h[46] = v),
            (h[47] = _),
            (h[48] = k))
          : (k = h[48]),
        h[49] !== t || h[50] !== l || h[51] !== k
          ? ((c = (0, a.jsxs)(Q.default, {
              href: t,
              prefetch: !1,
              className: "flex min-w-0 flex-1 items-center gap-3",
              children: [l, k],
            })),
            (h[49] = t),
            (h[50] = l),
            (h[51] = k),
            (h[52] = c))
          : (c = h[52]),
        h[53] !== I
          ? ((r = (0, A.c)(
              "ml-auto shrink-0 text-sm font-bold tabular-nums",
              I,
            )),
            (h[53] = I),
            (h[54] = r))
          : (r = h[54]),
        (i = `${z > 0 ? "+" : ""}${(0, H.w)(z)}`),
        (h[3] = f),
        (h[4] = j),
        (h[5] = w),
        (h[6] = g),
        (h[7] = y),
        (h[8] = r),
        (h[9] = i),
        (h[10] = d),
        (h[11] = o),
        (h[12] = c),
        (h[13] = u),
        (h[14] = m));
    } else
      ((r = h[8]),
        (i = h[9]),
        (d = h[10]),
        (o = h[11]),
        (c = h[12]),
        (u = h[13]),
        (m = h[14]));
    return (
      h[55] !== r || h[56] !== i
        ? ((p = (0, a.jsx)("span", { className: r, children: i })),
          (h[55] = r),
          (h[56] = i),
          (h[57] = p))
        : (p = h[57]),
      h[58] !== d || h[59] !== o || h[60] !== c || h[61] !== p
        ? ((x = (0, a.jsxs)("div", { className: d, children: [o, c, p] })),
          (h[58] = d),
          (h[59] = o),
          (h[60] = c),
          (h[61] = p),
          (h[62] = x))
        : (x = h[62]),
      h[63] !== x || h[64] !== u || h[65] !== m
        ? ((b = (0, a.jsx)("div", {
            "data-testid": u,
            className: m,
            children: x,
          })),
          (h[63] = x),
          (h[64] = u),
          (h[65] = m),
          (h[66] = b))
        : (b = h[66]),
      b
    );
  }
  let rs = "daily",
    rl = [];
  function rn() {
    let e,
      t,
      r,
      d,
      o,
      u,
      m,
      x,
      b,
      h,
      f,
      g,
      y,
      w,
      j,
      v,
      N,
      _,
      k,
      z,
      I,
      U = (0, s.c)(83),
      { t: A } = (0, l.f)(),
      { address: S } = (0, p.F)(),
      { timeframe: C, setTimeframe: P } = (0, th.b)(rs, "group"),
      q = C === th.N,
      F = q ? rs : C,
      [L, M] = (0, i.useState)("combined");
    (U[0] !== A
      ? ((e = A("web.leaderboard.period_1d")), (U[0] = A), (U[1] = e))
      : (e = U[1]),
      U[2] !== e
        ? ((t = { value: "daily", label: e }), (U[2] = e), (U[3] = t))
        : (t = U[3]),
      U[4] !== A
        ? ((r = A("web.leaderboard.period_1w")), (U[4] = A), (U[5] = r))
        : (r = U[5]),
      U[6] !== r
        ? ((d = { value: "weekly", label: r }), (U[6] = r), (U[7] = d))
        : (d = U[7]),
      U[8] !== A
        ? ((o = A("web.leaderboard.period_1m")), (U[8] = A), (U[9] = o))
        : (o = U[9]),
      U[10] !== o
        ? ((u = { value: "monthly", label: o }), (U[10] = o), (U[11] = u))
        : (u = U[11]),
      U[12] !== t || U[13] !== d || U[14] !== u
        ? ((m = [t, d, u]), (U[12] = t), (U[13] = d), (U[14] = u), (U[15] = m))
        : (m = U[15]));
    let $ = m,
      E = (0, th.t)($),
      R = !q,
      T = q ? void 0 : 6e4;
    U[16] !== F || U[17] !== L || U[18] !== R || U[19] !== T
      ? ((x = { period: F, sort: L, enabled: R, refetchIntervalMs: T }),
        (U[16] = F),
        (U[17] = L),
        (U[18] = R),
        (U[19] = T),
        (U[20] = x))
      : (x = U[20]);
    let O = (0, t4.f)(x),
      D = void 0 !== O.data && !O.isPlaceholderData,
      K = O.isError && !O.isFetching && !D,
      Z = !K && !D && (O.isPending || O.isPlaceholderData || O.isError),
      B = D ? (O.data?.entries ?? rl) : rl,
      Q = !Z && !K && 0 === B.length,
      V = !Z && !K && B.length > 0;
    if (U[21] !== B || U[22] !== L || U[23] !== A) {
      let e = A("web.leaderboard.squads_unnamed_row");
      ((b = B.slice(0, 4).map((t) => ({
        key: t.groupId,
        rank: t.rank,
        name: t.username || e,
        avatarUrl: t.profileImageUrl,
        href: (0, G.Z)({ groupId: t.groupId, username: t.username }),
        pnlUsd: (0, t5.C)(t, L),
      }))),
        (U[21] = B),
        (U[22] = L),
        (U[23] = A),
        (U[24] = b));
    } else b = U[24];
    let W = b,
      J = !!S;
    U[25] !== J
      ? ((h = { enabled: J }), (U[25] = J), (U[26] = h))
      : (h = U[26]);
    let { squad: H, inviteCount: X, isResolved: Y } = (0, t3.f)(h),
      ee = !!S && Y,
      et = H?.squad ?? null;
    if (
      U[27] !== B ||
      U[28] !== ee ||
      U[29] !== X ||
      U[30] !== et ||
      U[31] !== F ||
      U[32] !== L
    ) {
      let e = et ? B.find((e) => e.groupId === et.userId) : void 0;
      ((f = ee
        ? (0, a.jsx)(t9, {
            squad: et,
            inviteCount: X,
            period: F,
            sort: L,
            boardPnlUsd: e ? (0, t5.C)(e, L) : void 0,
          })
        : null),
        (U[27] = B),
        (U[28] = ee),
        (U[29] = X),
        (U[30] = et),
        (U[31] = F),
        (U[32] = L),
        (U[33] = f));
    } else f = U[33];
    let er = f,
      { rootRef: ea, controlRowRef: es, periodControlTopPx: el } = ek();
    (U[34] !== A
      ? ((g = A("web.leaderboard.time_window")), (U[34] = A), (U[35] = g))
      : (g = U[35]),
      U[36] !== P || U[37] !== g || U[38] !== C || U[39] !== E
        ? ((y = (0, a.jsx)(c.f, {
            options: E,
            value: C,
            onChange: P,
            ariaLabel: g,
          })),
          (U[36] = P),
          (U[37] = g),
          (U[38] = C),
          (U[39] = E),
          (U[40] = y))
        : (y = U[40]));
    let en = y;
    if (q) {
      let e, t;
      return (
        U[41] !== en || U[42] !== el
          ? ((e = (0, a.jsx)(to, {
              kind: "group",
              periodControl: en,
              periodControlTopPx: el,
              periodControlLeadClassName: "[--cup-lead:8px]",
            })),
            (U[41] = en),
            (U[42] = el),
            (U[43] = e))
          : (e = U[43]),
        U[44] !== ea || U[45] !== e
          ? ((t = (0, a.jsx)("div", {
              ref: ea,
              className: "flex flex-col pt-3",
              "data-testid": "squads-leaderboard-board",
              children: e,
            })),
            (U[44] = ea),
            (U[45] = e),
            (U[46] = t))
          : (t = U[46]),
        t
      );
    }
    return (
      U[47] !== Z || U[48] !== Q || U[49] !== K || U[50] !== W || U[51] !== A
        ? ((w =
            Q || K
              ? null
              : (0, a.jsx)(tE, {
                  rows: W,
                  isLoading: Z,
                  ariaLabel: A("web.leaderboard.top_squads_podium"),
                })),
          (U[47] = Z),
          (U[48] = Q),
          (U[49] = K),
          (U[50] = W),
          (U[51] = A),
          (U[52] = w))
        : (w = U[52]),
      U[53] !== L
        ? ((j = (0, a.jsx)(tb, { value: L, onSelect: M })),
          (U[53] = L),
          (U[54] = j))
        : (j = U[54]),
      U[55] !== es || U[56] !== en || U[57] !== j
        ? ((v = (0, a.jsxs)("div", {
            ref: es,
            className: "flex items-center justify-between gap-2 pb-4 pt-2",
            children: [en, j],
          })),
          (U[55] = es),
          (U[56] = en),
          (U[57] = j),
          (U[58] = v))
        : (v = U[58]),
      U[59] !== Z
        ? ((N = Z
            ? (0, a.jsx)(n.R, { testId: "squads-leaderboard-skeleton" })
            : null),
          (U[59] = Z),
          (U[60] = N))
        : (N = U[60]),
      U[61] !== O || U[62] !== K || U[63] !== A
        ? ((_ = K
            ? (0, a.jsx)(n.C, {
                message: A("web.leaderboard.squads_error"),
                onRetry: () => void O.refetch(),
              })
            : null),
          (U[61] = O),
          (U[62] = K),
          (U[63] = A),
          (U[64] = _))
        : (_ = U[64]),
      U[65] !== Q || U[66] !== er || U[67] !== A
        ? ((k = Q
            ? (0, a.jsxs)(a.Fragment, {
                children: [
                  er
                    ? (0, a.jsx)("div", {
                        className:
                          "mb-4 rounded-3xl border border-border-secondary p-2",
                        children: er,
                      })
                    : null,
                  (0, a.jsx)(n.D, {
                    title: A("web.leaderboard.squads_empty_title"),
                    description: A("web.leaderboard.squads_empty_subtitle"),
                  }),
                ],
              })
            : null),
          (U[65] = Q),
          (U[66] = er),
          (U[67] = A),
          (U[68] = k))
        : (k = U[68]),
      U[69] !== B || U[70] !== er || U[71] !== V || U[72] !== L || U[73] !== A
        ? ((z = V
            ? (0, a.jsxs)(n.B, {
                ariaLabel: A("web.leaderboard.top_squads"),
                children: [
                  er
                    ? (0, a.jsx)("div", { className: "p-2", children: er })
                    : null,
                  (0, a.jsx)("ol", {
                    "aria-label": A("web.leaderboard.ranked_squads"),
                    className: "flex flex-col",
                    children: B.map((e) =>
                      (0, a.jsx)(
                        "li",
                        {
                          className:
                            "border-t border-border-primary first:border-t-0",
                          children: (0, a.jsx)(ra, { entry: e, sort: L }),
                        },
                        e.groupId,
                      ),
                    ),
                  }),
                ],
              })
            : null),
          (U[69] = B),
          (U[70] = er),
          (U[71] = V),
          (U[72] = L),
          (U[73] = A),
          (U[74] = z))
        : (z = U[74]),
      U[75] !== ea ||
      U[76] !== w ||
      U[77] !== v ||
      U[78] !== N ||
      U[79] !== _ ||
      U[80] !== k ||
      U[81] !== z
        ? ((I = (0, a.jsxs)("div", {
            ref: ea,
            className: "flex flex-col pt-3",
            "data-testid": "squads-leaderboard-board",
            children: [w, v, N, _, k, z],
          })),
          (U[75] = ea),
          (U[76] = w),
          (U[77] = v),
          (U[78] = N),
          (U[79] = _),
          (U[80] = k),
          (U[81] = z),
          (U[82] = I))
        : (I = U[82]),
      I
    );
  }
  var ri = e.i(747911),
    rd = e.i(311282),
    ro = e.i(986071);
  let rc = ["traders", "squads", "rewards", "callouts"],
    ru = "traders";
  var rm = e.i(662610);
  e.s(
    [
      "LeaderboardPage",
      0,
      function (e) {
        let t,
          r,
          i,
          d,
          o,
          c,
          u,
          m,
          p,
          x,
          b,
          h,
          f,
          g,
          y,
          w,
          j,
          v,
          _,
          k,
          z = (0, s.c)(55),
          { squadsEnabledServer: I, serverIsMobile: U } = e,
          A = void 0 !== U && U,
          { t: C } = (0, l.f)(),
          P = (0, rm.f)(void 0 !== I && I),
          { urlTab: q, setUrlTab: F } = (function () {
            let e,
              t,
              r,
              a = (0, s.c)(6);
            a[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = (0, rd.b)(rc)), (a[0] = e))
              : (e = a[0]);
            let [l, n] = (0, rd.o)(ro.f.LEADERBOARD.TAB, e);
            a[1] !== n
              ? ((t = (e) => {
                  n(e === ru ? null : e);
                }),
                (a[1] = n),
                (a[2] = t))
              : (t = a[2]);
            let i = t;
            return (
              a[3] !== i || a[4] !== l
                ? ((r = { urlTab: l, setUrlTab: i }),
                  (a[3] = i),
                  (a[4] = l),
                  (a[5] = r))
                : (r = a[5]),
              r
            );
          })(),
          { urlPeriod: L, setUrlPeriod: M } = (0, ri.t)();
        z[0] !== A
          ? ((t = { serverFallback: A }), (z[0] = A), (z[1] = t))
          : (t = z[1]);
        let $ = !(0, tS.f)("(max-width: 1279.98px)", t),
          E = q ?? ru,
          R = ("squads" === E && !P) || ("callouts" === E && $) ? ru : E;
        (z[2] !== C
          ? ((r = C("web.leaderboard.tab_traders")), (z[2] = C), (z[3] = r))
          : (r = z[3]),
          z[4] !== r
            ? ((i = { value: "traders", label: r }), (z[4] = r), (z[5] = i))
            : (i = z[5]),
          z[6] !== P || z[7] !== C
            ? ((d = P
                ? [{ value: "squads", label: C("web.leaderboard.tab_squads") }]
                : []),
              (z[6] = P),
              (z[7] = C),
              (z[8] = d))
            : (d = z[8]),
          z[9] !== C
            ? ((o = C("web.leaderboard.tab_rewards")), (z[9] = C), (z[10] = o))
            : (o = z[10]),
          z[11] !== o
            ? ((c = { value: "rewards", label: o }), (z[11] = o), (z[12] = c))
            : (c = z[12]),
          z[13] !== $ || z[14] !== C
            ? ((u = $
                ? []
                : [
                    {
                      value: "callouts",
                      label: C("kolscan.top_charts.tab_callouts"),
                    },
                  ]),
              (z[13] = $),
              (z[14] = C),
              (z[15] = u))
            : (u = z[15]),
          z[16] !== i || z[17] !== d || z[18] !== c || z[19] !== u
            ? ((m = [i, ...d, c, ...u]),
              (z[16] = i),
              (z[17] = d),
              (z[18] = c),
              (z[19] = u),
              (z[20] = m))
            : (m = z[20]));
        let T = m;
        return (
          z[21] !== C
            ? ((p = C("web.leaderboard.heading")), (z[21] = C), (z[22] = p))
            : (p = z[22]),
          z[23] !== p
            ? ((x = (0, a.jsx)("h1", {
                className: "pb-3 text-2xl font-semibold text-text-primary",
                children: p,
              })),
              (z[23] = p),
              (z[24] = x))
            : (x = z[24]),
          z[25] !== R || z[26] !== F || z[27] !== T
            ? ((b = (0, a.jsx)(S, { tabs: T, activeTab: R, onChange: F })),
              (z[25] = R),
              (z[26] = F),
              (z[27] = T),
              (z[28] = b))
            : (b = z[28]),
          z[29] !== x || z[30] !== b
            ? ((h = (0, a.jsxs)("header", {
                className: "pt-6",
                children: [x, b],
              })),
              (z[29] = x),
              (z[30] = b),
              (z[31] = h))
            : (h = z[31]),
          z[32] !== R || z[33] !== M || z[34] !== L
            ? ((f =
                "traders" === R
                  ? (0, a.jsx)(tB, { initialPeriod: L, onPeriodChange: M })
                  : null),
              (z[32] = R),
              (z[33] = M),
              (z[34] = L),
              (z[35] = f))
            : (f = z[35]),
          z[36] !== R
            ? ((g = "rewards" === R ? (0, a.jsx)(t2, {}) : null),
              (z[36] = R),
              (z[37] = g))
            : (g = z[37]),
          z[38] !== R
            ? ((y = "callouts" === R ? (0, a.jsx)(N, {}) : null),
              (z[38] = R),
              (z[39] = y))
            : (y = z[39]),
          z[40] !== R
            ? ((w = "squads" === R ? (0, a.jsx)(rn, {}) : null),
              (z[40] = R),
              (z[41] = w))
            : (w = z[41]),
          z[42] !== h ||
          z[43] !== f ||
          z[44] !== g ||
          z[45] !== y ||
          z[46] !== w
            ? ((j = (0, a.jsxs)("div", {
                className:
                  "flex w-full min-w-0 flex-1 flex-col xl:max-w-3xl 2xl:max-w-4xl",
                children: [h, f, g, y, w],
              })),
              (z[42] = h),
              (z[43] = f),
              (z[44] = g),
              (z[45] = y),
              (z[46] = w),
              (z[47] = j))
            : (j = z[47]),
          z[48] !== $ || z[49] !== C
            ? ((v = $
                ? (0, a.jsxs)("aside", {
                    className:
                      "hidden w-[360px] shrink-0 flex-col pt-6 xl:flex",
                    "aria-labelledby": "leaderboard-callouts-rail-title",
                    "data-testid": "leaderboard-callouts-rail",
                    children: [
                      (0, a.jsx)("h2", {
                        id: "leaderboard-callouts-rail-title",
                        className:
                          "pb-3 text-2xl font-semibold text-text-primary",
                        children: C("kolscan.top_charts.tab_callouts"),
                      }),
                      (0, a.jsx)(N, {}),
                    ],
                  })
                : null),
              (z[48] = $),
              (z[49] = C),
              (z[50] = v))
            : (v = z[50]),
          z[51] === Symbol.for("react.memo_cache_sentinel")
            ? ((_ = (0, a.jsx)(n.Y, {})), (z[51] = _))
            : (_ = z[51]),
          z[52] !== j || z[53] !== v
            ? ((k = (0, a.jsxs)("main", {
                className:
                  "mx-auto flex w-full max-w-2xl flex-col px-4 pb-16 lg:max-w-3xl xl:max-w-[1160px] xl:flex-row xl:items-start xl:gap-8 2xl:max-w-[1288px]",
                children: [j, v, _],
              })),
              (z[52] = j),
              (z[53] = v),
              (z[54] = k))
            : (k = z[54]),
          k
        );
      },
    ],
    590407,
  );
};
