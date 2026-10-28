// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(732486),
    s = e.i(445242),
    a = e.i(745018),
    r = e.i(439587);
  e.i(12692);
  var n = e.i(398902),
    l = e.i(426091),
    i = e.i(244269);
  function o() {
    let e,
      a,
      r,
      l,
      o,
      d = (0, s.c)(12),
      { t: m } = (0, n.f)(),
      x = (0, i.useDeveloperPortal)();
    return (
      d[0] !== m
        ? ((e = m("web.bounties.developer_portal_prompt")),
          (d[0] = m),
          (d[1] = e))
        : (e = d[1]),
      d[2] !== x ? ((a = () => x.open()), (d[2] = x), (d[3] = a)) : (a = d[3]),
      d[4] !== m
        ? ((r = m("web.bounties.developer_portal_link")),
          (d[4] = m),
          (d[5] = r))
        : (r = d[5]),
      d[6] !== a || d[7] !== r
        ? ((l = (0, t.jsx)("button", {
            className:
              "font-medium text-blue-400 underline underline-offset-2 hover:text-blue-300",
            onClick: a,
            type: "button",
            children: r,
          })),
          (d[6] = a),
          (d[7] = r),
          (d[8] = l))
        : (l = d[8]),
      d[9] !== e || d[10] !== l
        ? ((o = (0, t.jsxs)("p", {
            className: "text-center text-xs leading-5 text-text-secondary",
            "data-testid": "bounties-developer-portal-link",
            children: [e, " ", l, "."],
          })),
          (d[9] = e),
          (d[10] = l),
          (d[11] = o))
        : (o = d[11]),
      o
    );
  }
  var d = e.i(458310),
    m = e.i(146742),
    x = e.i(959193),
    c = e.i(462024),
    p = e.i(409355),
    u = e.i(260095);
  let b = ["runner-up", "third"];
  function h() {
    let e,
      r,
      l,
      i,
      o,
      c,
      b,
      h,
      y,
      j,
      N,
      _,
      v = (0, s.c)(25),
      { t: k } = (0, n.f)();
    v[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((e = { phase: x.d, sort: "rewardTotalUsd", order: "desc", limit: 3 }),
        (v[0] = e))
      : (e = v[0]);
    let { data: A, isLoading: S, isError: U } = (0, m.Q)(e);
    (v[1] !== A?.items
      ? ((r = A?.items ?? []), (v[1] = A?.items), (v[2] = r))
      : (r = v[2]),
      v[3] !== r ? ((l = r.filter(f)), (v[3] = r), (v[4] = l)) : (l = v[4]));
    let z = l,
      { bounties: C } = (0, u.E)(z);
    return U
      ? null
      : (v[5] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (0, t.jsx)(a.H2, {
              "aria-hidden": !0,
              className: "size-2.5 text-positive sm:size-3",
            })),
            (v[5] = i))
          : (i = v[5]),
        v[6] !== k
          ? ((o = k("home.bounties.leaderboard.highest_value_title")),
            (v[6] = k),
            (v[7] = o))
          : (o = v[7]),
        v[8] !== o
          ? ((c = (0, t.jsx)("h4", {
              className:
                "m-0 text-[9px] font-semibold uppercase tracking-[0.08em] text-text-tertiary sm:text-[10px]",
              id: "bounties-highest-value-open-heading",
              children: o,
            })),
            (v[8] = o),
            (v[9] = c))
          : (c = v[9]),
        v[10] === Symbol.for("react.memo_cache_sentinel")
          ? ((b = (0, t.jsx)("span", { className: "flex-1" })), (v[10] = b))
          : (b = v[10]),
        v[11] !== k
          ? ((h = k("web.bounties.all_open_cta")), (v[11] = k), (v[12] = h))
          : (h = v[12]),
        v[13] !== h
          ? ((y = (0, t.jsx)(d.default, {
              className:
                "text-[9.5px] font-semibold text-positive transition-opacity hover:opacity-80 sm:text-[10.5px]",
              href: p.c,
              children: h,
            })),
            (v[13] = h),
            (v[14] = y))
          : (y = v[14]),
        v[15] !== c || v[16] !== y
          ? ((j = (0, t.jsxs)("header", {
              className:
                "flex items-center gap-1.5 border-b border-border-tertiary pb-1.5 sm:pb-2",
              children: [i, c, b, y],
            })),
            (v[15] = c),
            (v[16] = y),
            (v[17] = j))
          : (j = v[17]),
        v[18] !== C || v[19] !== S || v[20] !== k
          ? ((N =
              S && 0 === C.length
                ? (0, t.jsx)(w, {})
                : 0 === C.length
                  ? (0, t.jsx)("p", {
                      className:
                        "px-1 py-3 text-center text-[10.5px] text-text-tertiary sm:py-4 sm:text-[11.5px]",
                      children: k(
                        "home.bounties.leaderboard.highest_value_empty",
                      ),
                    })
                  : (0, t.jsx)("ol", {
                      className: "m-0 flex list-none flex-col p-0",
                      children: C.map(g),
                    })),
            (v[18] = C),
            (v[19] = S),
            (v[20] = k),
            (v[21] = N))
          : (N = v[21]),
        v[22] !== N || v[23] !== j
          ? ((_ = (0, t.jsxs)("section", {
              "aria-labelledby": "bounties-highest-value-open-heading",
              className:
                "flex flex-col gap-1.5 rounded-[14px] border border-border-tertiary bg-bg-tertiary p-2.5 sm:gap-2 sm:rounded-[18px] sm:p-3",
              "data-testid": "bounties-highest-value-open-widget",
              children: [j, N],
            })),
            (v[22] = N),
            (v[23] = j),
            (v[24] = _))
          : (_ = v[24]),
        _);
  }
  function g(e, s) {
    return 0 === s
      ? (0, t.jsx)(y, { bounty: e }, e.id)
      : (0, t.jsx)(
          j,
          { bounty: e, className: "hidden sm:list-item", index: s },
          e.id,
        );
  }
  function f(e) {
    return (e.rewardTotalUsd ?? 0) > 0;
  }
  function y(e) {
    let r,
      l,
      i,
      o,
      m,
      x,
      p,
      u,
      b,
      h,
      g = (0, s.c)(27),
      { bounty: f } = e,
      { t: y } = (0, n.f)(),
      j = f.rewardTotalUsd ?? 0;
    g[0] !== f.token?.symbol
      ? ((r = f.token?.symbol?.trim()), (g[0] = f.token?.symbol), (g[1] = r))
      : (r = g[1]);
    let w = r;
    g[2] !== f.expiresAt
      ? ((l = f.expiresAt ? (0, c.o)(f.expiresAt) : null),
        (g[2] = f.expiresAt),
        (g[3] = l))
      : (l = g[3]);
    let _ = l,
      v = f.submissionCount,
      k = !!(w || _ || v > 0),
      A = `/go/${f.id}`;
    return (
      g[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className:
              "inline-flex h-4 w-4 items-center justify-center rounded-full bg-positive text-[9px] font-extrabold text-black sm:h-[18px] sm:w-[18px] sm:text-[10px]",
            children: "1",
          })),
          (g[4] = i))
        : (i = g[4]),
      g[5] !== y
        ? ((o = y("home.bounties.leaderboard.top_open_bounty")),
          (g[5] = y),
          (g[6] = o))
        : (o = g[6]),
      g[7] !== o
        ? ((m = (0, t.jsxs)("div", {
            className: "flex items-center gap-1.5",
            children: [
              i,
              (0, t.jsx)("span", {
                className:
                  "text-[8px] font-bold uppercase tracking-[0.1em] text-positive sm:text-[9px]",
                children: o,
              }),
            ],
          })),
          (g[7] = o),
          (g[8] = m))
        : (m = g[8]),
      g[9] !== j ? ((x = (0, c.n)(j)), (g[9] = j), (g[10] = x)) : (x = g[10]),
      g[11] !== x
        ? ((p = (0, t.jsx)("div", {
            className:
              "text-[20px] font-extrabold leading-none tracking-[-0.025em] tabular-nums text-positive sm:text-[28px]",
            children: x,
          })),
          (g[11] = x),
          (g[12] = p))
        : (p = g[12]),
      g[13] !== f.title
        ? ((u = (0, t.jsx)("div", {
            className:
              "line-clamp-2 text-[12px] font-semibold leading-[1.3] text-text-primary sm:text-[13px]",
            children: f.title,
          })),
          (g[13] = f.title),
          (g[14] = u))
        : (u = g[14]),
      g[15] !== w || g[16] !== k || g[17] !== v || g[18] !== y || g[19] !== _
        ? ((b = k
            ? (0, t.jsxs)("div", {
                className:
                  "flex flex-wrap items-center gap-1 text-[9.5px] text-text-tertiary sm:gap-1.5 sm:text-[10.5px]",
                children: [
                  w
                    ? (0, t.jsxs)("span", {
                        className: "font-semibold text-text-secondary",
                        children: ["$", w],
                      })
                    : null,
                  w && _ ? (0, t.jsx)(N, {}) : null,
                  _
                    ? (0, t.jsxs)("span", {
                        className:
                          "inline-flex items-center gap-1 tabular-nums",
                        children: [
                          (0, t.jsx)(a.E$, {
                            "aria-hidden": !0,
                            className: "size-2.5",
                          }),
                          _,
                        ],
                      })
                    : null,
                  (w || _) && v > 0 ? (0, t.jsx)(N, {}) : null,
                  v > 0
                    ? (0, t.jsxs)("span", {
                        className:
                          "inline-flex items-center gap-1 tabular-nums",
                        children: [
                          (0, t.jsx)(a.w7, {
                            "aria-hidden": !0,
                            className: "size-2.5",
                          }),
                          y("home.bounties.leaderboard.sub_count", {
                            count: v,
                          }),
                        ],
                      })
                    : null,
                ],
              })
            : null),
          (g[15] = w),
          (g[16] = k),
          (g[17] = v),
          (g[18] = y),
          (g[19] = _),
          (g[20] = b))
        : (b = g[20]),
      g[21] !== b || g[22] !== A || g[23] !== m || g[24] !== p || g[25] !== u
        ? ((h = (0, t.jsx)("li", {
            children: (0, t.jsxs)(d.default, {
              className:
                "flex flex-col gap-1.5 rounded-[9px] border border-positive/20 bg-gradient-to-b from-positive/[0.12] to-transparent px-2.5 pb-2 pt-2 transition-colors hover:from-positive/[0.18] sm:gap-2 sm:rounded-[10px] sm:px-3 sm:pb-3 sm:pt-2.5",
              href: A,
              children: [m, p, u, b],
            }),
          })),
          (g[21] = b),
          (g[22] = A),
          (g[23] = m),
          (g[24] = p),
          (g[25] = u),
          (g[26] = h))
        : (h = g[26]),
      h
    );
  }
  function j(e) {
    let a,
      r,
      n,
      l,
      i,
      o,
      m,
      x,
      p,
      u,
      b = (0, s.c)(26),
      { bounty: h, index: g, className: f } = e,
      y = h.rewardTotalUsd ?? 0;
    b[0] !== h.token?.symbol
      ? ((a = h.token?.symbol?.trim()), (b[0] = h.token?.symbol), (b[1] = a))
      : (a = b[1]);
    let j = a;
    b[2] !== h.expiresAt
      ? ((r = h.expiresAt ? (0, c.o)(h.expiresAt) : null),
        (b[2] = h.expiresAt),
        (b[3] = r))
      : (r = b[3]);
    let N = r,
      w = `/go/${h.id}`,
      _ = g + 1;
    return (
      b[4] !== _
        ? ((n = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className:
              "inline-flex h-4 w-4 items-center justify-center rounded-full border border-border-tertiary bg-bg-tertiary text-[9px] font-bold text-text-secondary sm:h-[18px] sm:w-[18px] sm:text-[10px]",
            children: _,
          })),
          (b[4] = _),
          (b[5] = n))
        : (n = b[5]),
      b[6] !== h.title
        ? ((l = (0, t.jsx)("span", {
            className:
              "truncate text-[11px] font-semibold leading-tight text-text-primary sm:text-[12px]",
            children: h.title,
          })),
          (b[6] = h.title),
          (b[7] = l))
        : (l = b[7]),
      b[8] !== j || b[9] !== N
        ? ((i =
            j || N
              ? (0, t.jsxs)("span", {
                  className:
                    "truncate text-[9.5px] text-text-tertiary sm:text-[10px]",
                  children: [
                    j
                      ? (0, t.jsxs)("span", {
                          className: "font-semibold text-text-secondary",
                          children: ["$", j],
                        })
                      : null,
                    j && N
                      ? (0, t.jsx)("span", {
                          className: "mx-1 opacity-40",
                          children: "·",
                        })
                      : null,
                    N
                      ? (0, t.jsx)("span", {
                          className: "tabular-nums",
                          children: N,
                        })
                      : null,
                  ],
                })
              : null),
          (b[8] = j),
          (b[9] = N),
          (b[10] = i))
        : (i = b[10]),
      b[11] !== l || b[12] !== i
        ? ((o = (0, t.jsxs)("span", {
            className: "flex min-w-0 flex-col gap-0.5",
            children: [l, i],
          })),
          (b[11] = l),
          (b[12] = i),
          (b[13] = o))
        : (o = b[13]),
      b[14] !== y ? ((m = (0, c.n)(y)), (b[14] = y), (b[15] = m)) : (m = b[15]),
      b[16] !== m
        ? ((x = (0, t.jsx)("span", {
            className:
              "text-[12px] font-bold tabular-nums text-positive sm:text-[14px]",
            children: m,
          })),
          (b[16] = m),
          (b[17] = x))
        : (x = b[17]),
      b[18] !== x || b[19] !== w || b[20] !== n || b[21] !== o
        ? ((p = (0, t.jsxs)(d.default, {
            className:
              "grid grid-cols-[16px_minmax(0,1fr)_auto] items-center gap-2 rounded-lg px-0.5 py-1.5 transition-colors hover:bg-bg-tertiary sm:grid-cols-[18px_minmax(0,1fr)_auto] sm:gap-2.5 sm:px-1 sm:py-2",
            href: w,
            children: [n, o, x],
          })),
          (b[18] = x),
          (b[19] = w),
          (b[20] = n),
          (b[21] = o),
          (b[22] = p))
        : (p = b[22]),
      b[23] !== f || b[24] !== p
        ? ((u = (0, t.jsx)("li", { className: f, children: p })),
          (b[23] = f),
          (b[24] = p),
          (b[25] = u))
        : (u = b[25]),
      u
    );
  }
  function N() {
    let e,
      a = (0, s.c)(1);
    return (
      a[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className: "opacity-40",
            children: "·",
          })),
          (a[0] = e))
        : (e = a[0]),
      e
    );
  }
  function w() {
    let e,
      a,
      r,
      l,
      i,
      o,
      d,
      m = (0, s.c)(9),
      { t: x } = (0, n.f)();
    return (
      m[0] !== x
        ? ((e = x("web.bounties.loading_top_open_bounties")),
          (m[0] = x),
          (m[1] = e))
        : (e = m[1]),
      m[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsxs)("div", {
            className: "flex items-center gap-1.5",
            children: [
              (0, t.jsx)("span", {
                className:
                  "h-4 w-4 rounded-full bg-bg-quaternary sm:h-[18px] sm:w-[18px]",
              }),
              (0, t.jsx)("span", {
                className: "h-2.5 w-24 rounded bg-bg-quaternary",
              }),
            ],
          })),
          (r = (0, t.jsx)("div", {
            className: "h-5 w-24 rounded bg-bg-quaternary sm:h-7 sm:w-28",
          })),
          (m[2] = a),
          (m[3] = r))
        : ((a = m[2]), (r = m[3])),
      m[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (0, t.jsx)("span", {
            className: "flex h-[17px] items-center",
            children: (0, t.jsx)("span", {
              className: "block h-3 w-full rounded bg-bg-quaternary",
            }),
          })),
          (m[4] = l))
        : (l = m[4]),
      m[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsxs)("div", {
            className:
              "flex flex-col gap-1.5 rounded-[9px] border border-border-tertiary bg-bg-tertiary px-2.5 pb-2 pt-2 sm:gap-2 sm:rounded-[10px] sm:px-3 sm:pb-3 sm:pt-2.5",
            children: [
              a,
              r,
              (0, t.jsxs)("div", {
                className: "flex flex-col",
                children: [
                  l,
                  (0, t.jsx)("span", {
                    className: "flex h-[17px] items-center",
                    children: (0, t.jsx)("span", {
                      className: "block h-3 w-2/3 rounded bg-bg-quaternary",
                    }),
                  }),
                ],
              }),
              (0, t.jsx)("div", {
                className: "h-4 w-32 rounded bg-bg-quaternary",
              }),
            ],
          })),
          (o = b.map(_)),
          (m[5] = i),
          (m[6] = o))
        : ((i = m[5]), (o = m[6])),
      m[7] !== e
        ? ((d = (0, t.jsxs)("div", {
            "aria-busy": !0,
            "aria-label": e,
            "data-testid": "bounties-highest-value-open-skeleton",
            children: [i, o],
          })),
          (m[7] = e),
          (m[8] = d))
        : (d = m[8]),
      d
    );
  }
  function _(e) {
    return (0, t.jsxs)(
      "div",
      {
        className:
          "hidden grid-cols-[18px_minmax(0,1fr)_auto] items-center gap-2.5 px-1 py-2 sm:grid",
        children: [
          (0, t.jsx)("span", {
            className: "size-[18px] rounded-full bg-bg-tertiary",
          }),
          (0, t.jsxs)("span", {
            className: "flex flex-col gap-0.5",
            children: [
              (0, t.jsx)("span", {
                className: "flex h-[15px] items-center",
                children: (0, t.jsx)("span", {
                  className: "block h-3 w-3/4 rounded bg-bg-tertiary",
                }),
              }),
              (0, t.jsx)("span", {
                className: "flex h-[15px] items-center",
                children: (0, t.jsx)("span", {
                  className: "block h-2.5 w-1/3 rounded bg-bg-tertiary",
                }),
              }),
            ],
          }),
          (0, t.jsx)("span", {
            className: "h-3.5 w-10 rounded bg-bg-tertiary",
          }),
        ],
      },
      e,
    );
  }
  var v = e.i(705313),
    k = e.i(983737),
    A = e.i(352386),
    S = e.i(944410),
    U = e.i(690877),
    z = e.i(38279),
    C = e.i(613677),
    T = e.i(342463),
    I = e.i(637782),
    $ = e.i(866890);
  let q = C.z.object({
      address: T.z.string(),
      amountUsd: I.z.number(),
      payedOutAt: T.z.string(),
      taskId: T.z.string(),
      mintAddress: T.z.string(),
    }),
    O = C.z.object({ items: $.z.array(q), computedAt: T.z.string().nullish() });
  var P = e.i(369091),
    E = e.i(576766);
  let B = (e) => {
    let t,
      a,
      r,
      n,
      l = (0, s.c)(8);
    (l[0] !== e
      ? ((t = new Set(e.filter(Boolean))), (l[0] = e), (l[1] = t))
      : (t = l[1]),
      l[2] !== t ? ((a = [...t]), (l[2] = t), (l[3] = a)) : (a = l[3]));
    let i = a;
    l[4] !== i
      ? ((r = { userAddresses: i }), (l[4] = i), (l[5] = r))
      : (r = l[5]);
    let { data: o } = (0, E.f)(r);
    if (l[6] !== o) {
      for (let e of ((n = new Map()), o ?? []))
        n.set(e.address.toLowerCase(), e);
      ((l[6] = o), (l[7] = n));
    } else n = l[7];
    return n;
  };
  function L() {
    let { t: e } = (0, n.f)(),
      {
        data: r,
        isLoading: l,
        isError: i,
      } = ((e) => {
        let t,
          a,
          r = (0, s.c)(8),
          { limit: n, enabled: l, queryOptions: i } = void 0 === e ? {} : e,
          o = void 0 === l || l,
          d = (0, S.useLivestreamApiClient)(),
          m = z.Q.BOUNTY_RECENT_PAYOUTS({ limit: n });
        return (
          r[0] !== d || r[1] !== n
            ? ((t = async () => {
                let e = {};
                null != n && (e.limit = String(n));
                let t = await d
                  .get("bounties/v2/recent-payouts", { searchParams: e })
                  .json();
                return O.parse(t);
              }),
              (r[0] = d),
              (r[1] = n),
              (r[2] = t))
            : (t = r[2]),
          r[3] !== o || r[4] !== i || r[5] !== m || r[6] !== t
            ? ((a = {
                enabled: o,
                queryKey: m,
                queryFn: t,
                refetchInterval: 6e4,
                refetchIntervalInBackground: !1,
                staleTime: 6e4,
                ...i,
              }),
              (r[3] = o),
              (r[4] = i),
              (r[5] = m),
              (r[6] = t),
              (r[7] = a))
            : (a = r[7]),
          (0, U.useQuery)(a)
        );
      })({ limit: 12 }),
      o = (0, A.useMemo)(() => r?.items ?? [], [r]),
      d = B((0, A.useMemo)(() => o.map((e) => e.address), [o])),
      m = l && 0 === o.length,
      x = (0, k.f)() ?? !1,
      c = o.length >= 4 && !x,
      p = Math.max(16, Math.round(3.2 * o.length));
    return i
      ? null
      : (0, t.jsxs)("section", {
          "aria-labelledby": "bounties-recent-payouts-heading",
          className:
            "flex flex-col gap-1.5 rounded-[14px] border border-border-tertiary bg-bg-tertiary p-2.5 sm:gap-2 sm:rounded-[18px] sm:p-3",
          "data-testid": "bounties-recent-payouts-widget",
          children: [
            (0, t.jsxs)("header", {
              className:
                "flex items-center gap-1.5 border-b border-border-tertiary pb-1.5 sm:pb-2",
              children: [
                (0, t.jsx)(a.tj, {
                  "aria-hidden": !0,
                  className: "h-2.5 w-2.5 text-positive sm:h-3 sm:w-3",
                }),
                (0, t.jsx)("h4", {
                  className:
                    "m-0 text-[9px] font-semibold uppercase tracking-[0.08em] text-text-tertiary sm:text-[10px]",
                  id: "bounties-recent-payouts-heading",
                  children: e("web.bounties.recent_payouts_title"),
                }),
                (0, t.jsx)("span", {
                  "aria-hidden": !0,
                  className:
                    "ml-auto inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-positive",
                }),
              ],
            }),
            m
              ? (0, t.jsx)(M, {})
              : 0 === o.length
                ? (0, t.jsx)("p", {
                    className:
                      "px-1 py-3 text-center text-[10.5px] text-text-tertiary sm:py-4 sm:text-[11.5px]",
                    children: e("web.bounties.recent_payouts_empty"),
                  })
                : c
                  ? (0, t.jsx)("div", {
                      className:
                        "group/payouts relative h-[164px] overflow-hidden [mask-image:linear-gradient(180deg,transparent,black_12%,black_88%,transparent)] sm:h-[180px]",
                      "data-testid": "bounties-recent-payouts-marquee",
                      style: { "--payouts-marquee-duration": `${p}s` },
                      children: (0, t.jsx)("ul", {
                        className:
                          "m-0 flex animate-payouts-marquee-vertical list-none flex-col p-0 group-hover/payouts:[animation-play-state:paused] motion-reduce:animate-none",
                        children: [0, 1].map((e) =>
                          (0, t.jsx)(
                            "li",
                            {
                              "aria-hidden": 1 === e,
                              children: (0, t.jsx)("ul", {
                                className: "m-0 flex list-none flex-col p-0",
                                children: o.map((s) =>
                                  (0, t.jsx)(
                                    R,
                                    {
                                      payout: s,
                                      user: d.get(s.address.toLowerCase()),
                                    },
                                    `${e}-${s.taskId}-${s.address}-${s.payedOutAt}`,
                                  ),
                                ),
                              }),
                            },
                            e,
                          ),
                        ),
                      }),
                    })
                  : (0, t.jsx)("ul", {
                      className: "m-0 flex list-none flex-col p-0",
                      children: o.map((e) =>
                        (0, t.jsx)(
                          R,
                          { payout: e, user: d.get(e.address.toLowerCase()) },
                          `${e.taskId}-${e.address}-${e.payedOutAt}`,
                        ),
                      ),
                    }),
          ],
        });
  }
  function R(e) {
    let a,
      r,
      n,
      l,
      i,
      o,
      m = (0, s.c)(19),
      { payout: x, user: p } = e,
      { ipfsPrefix: u } = (0, P.useIpfsPrefix)(),
      b = p?.username ?? null;
    m[0] !== x.address || m[1] !== b
      ? ((a = (0, c.B)({ address: x.address, username: b })),
        (m[0] = x.address),
        (m[1] = b),
        (m[2] = a))
      : (a = m[2]);
    let h = a,
      g = `/go/${x.taskId}`,
      f = p?.profile_image ?? void 0;
    return (
      m[3] !== h || m[4] !== u || m[5] !== x.address || m[6] !== f
        ? ((r = (0, t.jsx)(v.f, {
            address: x.address,
            alt: h,
            className: "h-6 w-6 rounded-full object-cover",
            height: 24,
            ipfsPrefix: u,
            isAnonymous: !1,
            src: f,
            width: 24,
          })),
          (m[3] = h),
          (m[4] = u),
          (m[5] = x.address),
          (m[6] = f),
          (m[7] = r))
        : (r = m[7]),
      m[8] !== h
        ? ((n = (0, t.jsx)("span", {
            className:
              "min-w-0 truncate text-[12px] font-semibold leading-tight text-text-primary",
            children: h,
          })),
          (m[8] = h),
          (m[9] = n))
        : (n = m[9]),
      m[10] !== x.amountUsd
        ? ((l = (0, c.n)(x.amountUsd)), (m[10] = x.amountUsd), (m[11] = l))
        : (l = m[11]),
      m[12] !== l
        ? ((i = (0, t.jsxs)("span", {
            className:
              "text-[13px] font-extrabold tracking-[-0.01em] tabular-nums text-positive",
            children: ["+", l],
          })),
          (m[12] = l),
          (m[13] = i))
        : (i = m[13]),
      m[14] !== g || m[15] !== r || m[16] !== n || m[17] !== i
        ? ((o = (0, t.jsx)("li", {
            children: (0, t.jsxs)(d.default, {
              className:
                "grid grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-2 rounded-lg px-0.5 py-1.5 transition-colors hover:bg-bg-tertiary",
              href: g,
              children: [r, n, i],
            }),
          })),
          (m[14] = g),
          (m[15] = r),
          (m[16] = n),
          (m[17] = i),
          (m[18] = o))
        : (o = m[18]),
      o
    );
  }
  function M() {
    let e,
      a,
      r,
      l = (0, s.c)(5),
      { t: i } = (0, n.f)();
    return (
      l[0] !== i
        ? ((e = i("web.bounties.loading_recent_payouts")),
          (l[0] = i),
          (l[1] = e))
        : (e = l[1]),
      l[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = Array.from({ length: 4 }).map(Q)), (l[2] = a))
        : (a = l[2]),
      l[3] !== e
        ? ((r = (0, t.jsx)("div", {
            "aria-busy": !0,
            "aria-label": e,
            className: "flex flex-col",
            "data-testid": "bounties-recent-payouts-skeleton",
            children: a,
          })),
          (l[3] = e),
          (l[4] = r))
        : (r = l[4]),
      r
    );
  }
  function Q(e, s) {
    return (0, t.jsxs)(
      "div",
      {
        className:
          "grid grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-2 px-0.5 py-1.5",
        children: [
          (0, t.jsx)("span", {
            className: "h-6 w-6 rounded-full bg-bg-tertiary",
          }),
          (0, t.jsx)("span", {
            className: "block h-3 min-w-0 w-3/4 rounded bg-bg-tertiary",
          }),
          (0, t.jsx)("span", {
            className: "h-3.5 w-10 rounded bg-bg-tertiary",
          }),
        ],
      },
      s,
    );
  }
  var D = e.i(909318),
    K = e.i(56087);
  let Y = C.z.object({
      address: T.z.string(),
      payoutCount: I.z.number(),
      lastPayedOutAt: T.z.string(),
    }),
    F = Y.extend({ totalEarnedUsd: I.z.number() }),
    W = Y.extend({ totalSpentUsd: I.z.number() }),
    G = C.z.object({
      items: $.z.array(F),
      windowDays: I.z.number(),
      computedAt: T.z.string().nullable(),
    }),
    H = C.z.object({
      items: $.z.array(W),
      windowDays: I.z.number(),
      computedAt: T.z.string().nullable(),
    }),
    J = C.z.object({
      coinAddress: T.z.string(),
      totalRewardUsd: I.z.number(),
      bountyCount: I.z.number(),
    }),
    V = C.z.object({
      items: $.z.array(J),
      windowDays: I.z.number(),
      computedAt: T.z.string().nullable(),
    });
  var X = e.i(850175),
    Z = e.i(242663);
  let ee = ["🥇", "🥈", "🥉"];
  function et() {
    let e,
      r,
      l,
      i,
      o,
      d,
      m,
      x,
      c = (0, s.c)(18),
      { t: p } = (0, n.f)();
    c[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((e = { limit: 3 }), (c[0] = e))
      : (e = c[0]);
    let {
      data: u,
      isLoading: b,
      isError: h,
    } = ((e) => {
      let t,
        a,
        r = (0, s.c)(8),
        { limit: n, enabled: l, queryOptions: i } = void 0 === e ? {} : e,
        o = void 0 === l || l,
        d = (0, S.useLivestreamApiClient)(),
        m = z.Q.BOUNTY_TOP_COINS({ limit: n });
      return (
        r[0] !== d || r[1] !== n
          ? ((t = async () => {
              let e = {};
              null != n && (e.limit = String(n));
              let t = await d
                .get("bounties/v2/top-coins", { searchParams: e })
                .json();
              return V.parse(t);
            }),
            (r[0] = d),
            (r[1] = n),
            (r[2] = t))
          : (t = r[2]),
        r[3] !== o || r[4] !== i || r[5] !== m || r[6] !== t
          ? ((a = { enabled: o, queryKey: m, queryFn: t, ...i }),
            (r[3] = o),
            (r[4] = i),
            (r[5] = m),
            (r[6] = t),
            (r[7] = a))
          : (a = r[7]),
        (0, U.useQuery)(a)
      );
    })(e);
    c[1] !== u?.items
      ? ((r = u?.items ?? []), (c[1] = u?.items), (c[2] = r))
      : (r = c[2]);
    let g = r;
    c[3] !== g ? ((l = g.map(es)), (c[3] = g), (c[4] = l)) : (l = c[4]);
    let f = l,
      { liveTokens: y } = (0, Z.f)(f),
      j = b && 0 === g.length;
    return h
      ? null
      : (c[5] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (0, t.jsx)(a.Jd, {
              "aria-hidden": !0,
              className: "h-2.5 w-2.5 text-positive sm:h-3 sm:w-3",
            })),
            (c[5] = i))
          : (i = c[5]),
        c[6] !== p
          ? ((o = p("home.bounties.leaderboard.top_coins_title", { days: 30 })),
            (c[6] = p),
            (c[7] = o))
          : (o = c[7]),
        c[8] !== o
          ? ((d = (0, t.jsxs)("header", {
              className:
                "flex items-center gap-1.5 border-b border-border-tertiary pb-1.5 sm:pb-2",
              children: [
                i,
                (0, t.jsx)("h4", {
                  className:
                    "m-0 text-[9px] font-semibold uppercase tracking-[0.08em] text-text-tertiary sm:text-[10px]",
                  id: "bounties-top-coins-heading",
                  children: o,
                }),
              ],
            })),
            (c[8] = o),
            (c[9] = d))
          : (d = c[9]),
        c[10] !== g || c[11] !== y || c[12] !== j || c[13] !== p
          ? ((m = j
              ? (0, t.jsx)(er, {})
              : 0 === g.length
                ? (0, t.jsx)("p", {
                    className:
                      "px-1 py-3 text-center text-[10.5px] text-text-tertiary sm:py-4 sm:text-[11.5px]",
                    children: p("home.bounties.leaderboard.top_coins_empty"),
                  })
                : (0, t.jsx)("ol", {
                    className:
                      "m-0 flex list-none flex-col gap-0.5 p-0 sm:gap-1",
                    children: g.map((e, s) => {
                      var a;
                      return (0, t.jsx)(
                        ea,
                        {
                          coin: e,
                          index: s,
                          token: y.get(e.coinAddress) ?? {
                            id: (a = e.coinAddress),
                            mint: a,
                            name: a,
                            symbol: a.slice(0, 4),
                            imageUri: "",
                            liveMarketCap: 0,
                            liveName: a,
                            liveSymbol: a.slice(0, 4),
                            liveImageUri: "",
                            livePriceUsd: 0,
                          },
                        },
                        e.coinAddress,
                      );
                    }),
                  })),
            (c[10] = g),
            (c[11] = y),
            (c[12] = j),
            (c[13] = p),
            (c[14] = m))
          : (m = c[14]),
        c[15] !== d || c[16] !== m
          ? ((x = (0, t.jsxs)("section", {
              "aria-labelledby": "bounties-top-coins-heading",
              className:
                "flex flex-col gap-1.5 rounded-[14px] border border-border-tertiary bg-bg-tertiary p-2.5 sm:gap-2 sm:rounded-[18px] sm:p-3",
              "data-testid": "bounties-top-coins-widget",
              children: [d, m],
            })),
            (c[15] = d),
            (c[16] = m),
            (c[17] = x))
          : (x = c[17]),
        x);
  }
  function es(e) {
    return {
      id: e.coinAddress,
      mint: e.coinAddress,
      name: e.coinAddress,
      symbol: e.coinAddress.slice(0, 4),
      imageUri: "",
    };
  }
  function ea(e) {
    let a,
      r,
      n,
      l,
      i,
      o,
      m,
      x,
      p,
      u,
      b = (0, s.c)(31),
      { coin: h, index: g, token: f } = e,
      y = ee[g];
    b[0] !== h.coinAddress
      ? ((a = (0, X.e)(h.coinAddress)), (b[0] = h.coinAddress), (b[1] = a))
      : (a = b[1]);
    let { prefetch: j, hoverProps: N } = (0, X.W)(a),
      w = `/coin/${h.coinAddress}`,
      _ = `${f.liveSymbol} logo`;
    (b[2] !== h.coinAddress || b[3] !== _ || b[4] !== f.liveImageUri
      ? ((r = (0, t.jsx)(D.f, {
          alt: _,
          className: "h-7 w-7 rounded-full object-cover sm:h-8 sm:w-8",
          height: 32,
          imageType: K.d.COIN_IMAGE,
          mint: h.coinAddress,
          sourceImageUrl: f.liveImageUri,
          width: 32,
        })),
        (b[2] = h.coinAddress),
        (b[3] = _),
        (b[4] = f.liveImageUri),
        (b[5] = r))
      : (r = b[5]),
      b[6] !== g || b[7] !== y
        ? ((n = y
            ? (0, t.jsx)("span", {
                "aria-hidden": !0,
                className:
                  "absolute -bottom-0.5 -right-1 text-[11px] leading-none sm:text-[12px]",
                children: y,
              })
            : (0, t.jsx)("span", {
                "aria-hidden": !0,
                className:
                  "absolute -bottom-0.5 -right-1 inline-flex h-[13px] w-[13px] items-center justify-center rounded-full border border-border-tertiary bg-bg-tertiary text-[8px] font-bold text-text-secondary sm:h-[14px] sm:w-[14px] sm:text-[9px]",
                children: g + 1,
              })),
          (b[6] = g),
          (b[7] = y),
          (b[8] = n))
        : (n = b[8]),
      b[9] !== r || b[10] !== n
        ? ((l = (0, t.jsxs)("span", {
            className: "relative inline-flex",
            children: [r, n],
          })),
          (b[9] = r),
          (b[10] = n),
          (b[11] = l))
        : (l = b[11]),
      b[12] !== f.liveSymbol
        ? ((i = (0, t.jsxs)("span", {
            className:
              "truncate text-[12px] font-semibold leading-tight text-text-primary sm:text-[13px]",
            children: ["$", f.liveSymbol],
          })),
          (b[12] = f.liveSymbol),
          (b[13] = i))
        : (i = b[13]));
    let v = 1 === h.bountyCount ? "bounty" : "bounties";
    return (
      b[14] !== h.bountyCount || b[15] !== v
        ? ((o = (0, t.jsxs)("span", {
            className:
              "truncate text-[10px] text-text-tertiary tabular-nums sm:text-[10.5px]",
            children: [h.bountyCount, " ", v],
          })),
          (b[14] = h.bountyCount),
          (b[15] = v),
          (b[16] = o))
        : (o = b[16]),
      b[17] !== i || b[18] !== o
        ? ((m = (0, t.jsxs)("span", {
            className: "flex min-w-0 flex-col gap-0.5",
            children: [i, o],
          })),
          (b[17] = i),
          (b[18] = o),
          (b[19] = m))
        : (m = b[19]),
      b[20] !== h.totalRewardUsd
        ? ((x = (0, c.n)(h.totalRewardUsd)),
          (b[20] = h.totalRewardUsd),
          (b[21] = x))
        : (x = b[21]),
      b[22] !== x
        ? ((p = (0, t.jsx)("span", {
            className:
              "text-[13px] font-extrabold tracking-[-0.01em] tabular-nums text-positive sm:text-[15px]",
            children: x,
          })),
          (b[22] = x),
          (b[23] = p))
        : (p = b[23]),
      b[24] !== N ||
      b[25] !== j ||
      b[26] !== m ||
      b[27] !== p ||
      b[28] !== w ||
      b[29] !== l
        ? ((u = (0, t.jsx)("li", {
            children: (0, t.jsxs)(d.default, {
              className:
                "grid grid-cols-[30px_minmax(0,1fr)_auto] items-center gap-2 rounded-lg px-0.5 py-1 transition-colors hover:bg-bg-tertiary sm:grid-cols-[34px_minmax(0,1fr)_auto] sm:gap-2.5 sm:px-1 sm:py-1.5",
              href: w,
              prefetch: j,
              ...N,
              children: [l, m, p],
            }),
          })),
          (b[24] = N),
          (b[25] = j),
          (b[26] = m),
          (b[27] = p),
          (b[28] = w),
          (b[29] = l),
          (b[30] = u))
        : (u = b[30]),
      u
    );
  }
  function er() {
    let e,
      a,
      r,
      l = (0, s.c)(5),
      { t: i } = (0, n.f)();
    return (
      l[0] !== i
        ? ((e = i("web.bounties.loading_top_coins")), (l[0] = i), (l[1] = e))
        : (e = l[1]),
      l[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = Array.from({ length: 3 }).map(en)), (l[2] = a))
        : (a = l[2]),
      l[3] !== e
        ? ((r = (0, t.jsx)("div", {
            "aria-busy": !0,
            "aria-label": e,
            className: "flex flex-col gap-0.5 sm:gap-1",
            "data-testid": "bounties-top-coins-skeleton",
            children: a,
          })),
          (l[3] = e),
          (l[4] = r))
        : (r = l[4]),
      r
    );
  }
  function en(e, s) {
    return (0, t.jsxs)(
      "div",
      {
        className:
          "grid grid-cols-[30px_minmax(0,1fr)_auto] items-center gap-2 px-0.5 py-1 sm:grid-cols-[34px_minmax(0,1fr)_auto] sm:gap-2.5 sm:px-1 sm:py-1.5",
        children: [
          (0, t.jsx)("span", {
            className: "h-7 w-7 rounded-full bg-bg-tertiary sm:h-8 sm:w-8",
          }),
          (0, t.jsxs)("span", {
            className: "flex flex-col gap-0.5",
            children: [
              (0, t.jsx)("span", {
                className: "flex h-4 items-center",
                children: (0, t.jsx)("span", {
                  className: "block h-3.5 w-3/4 rounded bg-bg-tertiary",
                }),
              }),
              (0, t.jsx)("span", {
                className: "flex h-4 items-center",
                children: (0, t.jsx)("span", {
                  className: "block h-3 w-1/3 rounded bg-bg-tertiary",
                }),
              }),
            ],
          }),
          (0, t.jsx)("span", { className: "h-4 w-12 rounded bg-bg-tertiary" }),
        ],
      },
      s,
    );
  }
  var el = e.i(146695);
  let ei = ["🥇", "🥈", "🥉"];
  function eo() {
    let e,
      r,
      l,
      i,
      o,
      d,
      m,
      x,
      c = (0, s.c)(18),
      { t: p } = (0, n.f)();
    c[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((e = { limit: 3 }), (c[0] = e))
      : (e = c[0]);
    let {
      data: u,
      isLoading: b,
      isError: h,
    } = ((e) => {
      let t,
        a,
        r = (0, s.c)(8),
        { limit: n, enabled: l, queryOptions: i } = void 0 === e ? {} : e,
        o = void 0 === l || l,
        d = (0, S.useLivestreamApiClient)(),
        m = z.Q.BOUNTY_TOP_EARNERS({ limit: n });
      return (
        r[0] !== d || r[1] !== n
          ? ((t = async () => {
              let e = {};
              null != n && (e.limit = String(n));
              let t = await d
                .get("bounties/v2/top-earners", { searchParams: e })
                .json();
              return G.parse(t);
            }),
            (r[0] = d),
            (r[1] = n),
            (r[2] = t))
          : (t = r[2]),
        r[3] !== o || r[4] !== i || r[5] !== m || r[6] !== t
          ? ((a = { enabled: o, queryKey: m, queryFn: t, ...i }),
            (r[3] = o),
            (r[4] = i),
            (r[5] = m),
            (r[6] = t),
            (r[7] = a))
          : (a = r[7]),
        (0, U.useQuery)(a)
      );
    })(e);
    c[1] !== u?.items
      ? ((r = u?.items ?? []), (c[1] = u?.items), (c[2] = r))
      : (r = c[2]);
    let g = r;
    c[3] !== g ? ((l = g.map(ed)), (c[3] = g), (c[4] = l)) : (l = c[4]);
    let f = B(l),
      y = b && 0 === g.length;
    return h
      ? null
      : (c[5] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (0, t.jsx)(a.DD, {
              "aria-hidden": !0,
              className: "h-2.5 w-2.5 text-positive sm:h-3 sm:w-3",
            })),
            (c[5] = i))
          : (i = c[5]),
        c[6] !== p
          ? ((o = p("home.bounties.leaderboard.top_earners_title", {
              days: 30,
            })),
            (c[6] = p),
            (c[7] = o))
          : (o = c[7]),
        c[8] !== o
          ? ((d = (0, t.jsxs)("header", {
              className:
                "flex items-center gap-1.5 border-b border-border-tertiary pb-1.5 sm:pb-2",
              children: [
                i,
                (0, t.jsx)("h4", {
                  className:
                    "m-0 text-[9px] font-semibold uppercase tracking-[0.08em] text-text-tertiary sm:text-[10px]",
                  id: "bounties-top-earners-heading",
                  children: o,
                }),
              ],
            })),
            (c[8] = o),
            (c[9] = d))
          : (d = c[9]),
        c[10] !== g || c[11] !== f || c[12] !== y || c[13] !== p
          ? ((m = y
              ? (0, t.jsx)(ex, {})
              : 0 === g.length
                ? (0, t.jsx)("p", {
                    className:
                      "px-1 py-3 text-center text-[10.5px] text-text-tertiary sm:py-4 sm:text-[11.5px]",
                    children: p("home.bounties.leaderboard.top_earners_empty"),
                  })
                : (0, t.jsx)("ol", {
                    className:
                      "m-0 flex list-none flex-col gap-0.5 p-0 sm:gap-1",
                    children: g.map((e, s) =>
                      (0, t.jsx)(
                        em,
                        {
                          earner: e,
                          index: s,
                          user: f.get(e.address.toLowerCase()),
                        },
                        e.address,
                      ),
                    ),
                  })),
            (c[10] = g),
            (c[11] = f),
            (c[12] = y),
            (c[13] = p),
            (c[14] = m))
          : (m = c[14]),
        c[15] !== d || c[16] !== m
          ? ((x = (0, t.jsxs)("section", {
              "aria-labelledby": "bounties-top-earners-heading",
              className:
                "flex flex-col gap-1.5 rounded-[14px] border border-border-tertiary bg-bg-tertiary p-2.5 sm:gap-2 sm:rounded-[18px] sm:p-3",
              "data-testid": "bounties-top-earners-widget",
              children: [d, m],
            })),
            (c[15] = d),
            (c[16] = m),
            (c[17] = x))
          : (x = c[17]),
        x);
  }
  function ed(e) {
    return e.address;
  }
  function em(e) {
    let a,
      r,
      n,
      l,
      i,
      o,
      m,
      x,
      p,
      u,
      b,
      h = (0, s.c)(34),
      { earner: g, index: f, user: y } = e,
      { ipfsPrefix: j } = (0, P.useIpfsPrefix)(),
      N = y?.username ?? null;
    h[0] !== g.address || h[1] !== N
      ? ((a = (0, c.B)({ address: g.address, username: N })),
        (h[0] = g.address),
        (h[1] = N),
        (h[2] = a))
      : (a = h[2]);
    let w = a,
      _ = y?.username ?? null;
    h[3] !== g.address || h[4] !== _
      ? ((r = (0, el.d)(g.address, _)),
        (h[3] = g.address),
        (h[4] = _),
        (h[5] = r))
      : (r = h[5]);
    let k = r,
      A = ei[f],
      S = y?.profile_image ?? void 0;
    (h[6] !== w || h[7] !== g.address || h[8] !== j || h[9] !== S
      ? ((n = (0, t.jsx)(v.f, {
          address: g.address,
          alt: w,
          className: "h-7 w-7 rounded-full object-cover sm:h-8 sm:w-8",
          height: 32,
          ipfsPrefix: j,
          isAnonymous: !1,
          src: S,
          width: 32,
        })),
        (h[6] = w),
        (h[7] = g.address),
        (h[8] = j),
        (h[9] = S),
        (h[10] = n))
      : (n = h[10]),
      h[11] !== f || h[12] !== A
        ? ((l = A
            ? (0, t.jsx)("span", {
                "aria-hidden": !0,
                className:
                  "absolute -bottom-0.5 -right-1 text-[11px] leading-none sm:text-[12px]",
                children: A,
              })
            : (0, t.jsx)("span", {
                "aria-hidden": !0,
                className:
                  "absolute -bottom-0.5 -right-1 inline-flex h-[13px] w-[13px] items-center justify-center rounded-full border border-border-tertiary bg-bg-tertiary text-[8px] font-bold text-text-secondary sm:h-[14px] sm:w-[14px] sm:text-[9px]",
                children: f + 1,
              })),
          (h[11] = f),
          (h[12] = A),
          (h[13] = l))
        : (l = h[13]),
      h[14] !== n || h[15] !== l
        ? ((i = (0, t.jsxs)("span", {
            className: "relative inline-flex",
            children: [n, l],
          })),
          (h[14] = n),
          (h[15] = l),
          (h[16] = i))
        : (i = h[16]),
      h[17] !== w
        ? ((o = (0, t.jsx)("span", {
            className:
              "truncate text-[12px] font-semibold leading-tight text-text-primary sm:text-[13px]",
            children: w,
          })),
          (h[17] = w),
          (h[18] = o))
        : (o = h[18]));
    let U = 1 === g.payoutCount ? "payout" : "payouts";
    return (
      h[19] !== g.payoutCount || h[20] !== U
        ? ((m = (0, t.jsxs)("span", {
            className:
              "truncate text-[10px] text-text-tertiary tabular-nums sm:text-[10.5px]",
            children: [g.payoutCount, " ", U],
          })),
          (h[19] = g.payoutCount),
          (h[20] = U),
          (h[21] = m))
        : (m = h[21]),
      h[22] !== m || h[23] !== o
        ? ((x = (0, t.jsxs)("span", {
            className: "flex min-w-0 flex-col gap-0.5",
            children: [o, m],
          })),
          (h[22] = m),
          (h[23] = o),
          (h[24] = x))
        : (x = h[24]),
      h[25] !== g.totalEarnedUsd
        ? ((p = (0, c.n)(g.totalEarnedUsd)),
          (h[25] = g.totalEarnedUsd),
          (h[26] = p))
        : (p = h[26]),
      h[27] !== p
        ? ((u = (0, t.jsx)("span", {
            className:
              "text-[13px] font-extrabold tracking-[-0.01em] tabular-nums text-positive sm:text-[15px]",
            children: p,
          })),
          (h[27] = p),
          (h[28] = u))
        : (u = h[28]),
      h[29] !== k || h[30] !== x || h[31] !== u || h[32] !== i
        ? ((b = (0, t.jsx)("li", {
            children: (0, t.jsxs)(d.default, {
              className:
                "grid grid-cols-[30px_minmax(0,1fr)_auto] items-center gap-2 rounded-lg px-0.5 py-1 transition-colors hover:bg-bg-tertiary sm:grid-cols-[34px_minmax(0,1fr)_auto] sm:gap-2.5 sm:px-1 sm:py-1.5",
              href: k,
              children: [i, x, u],
            }),
          })),
          (h[29] = k),
          (h[30] = x),
          (h[31] = u),
          (h[32] = i),
          (h[33] = b))
        : (b = h[33]),
      b
    );
  }
  function ex() {
    let e,
      a,
      r,
      l = (0, s.c)(5),
      { t: i } = (0, n.f)();
    return (
      l[0] !== i
        ? ((e = i("web.bounties.loading_top_earners")), (l[0] = i), (l[1] = e))
        : (e = l[1]),
      l[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = Array.from({ length: 3 }).map(ec)), (l[2] = a))
        : (a = l[2]),
      l[3] !== e
        ? ((r = (0, t.jsx)("div", {
            "aria-busy": !0,
            "aria-label": e,
            className: "flex flex-col gap-0.5 sm:gap-1",
            "data-testid": "bounties-top-earners-skeleton",
            children: a,
          })),
          (l[3] = e),
          (l[4] = r))
        : (r = l[4]),
      r
    );
  }
  function ec(e, s) {
    return (0, t.jsxs)(
      "div",
      {
        className:
          "grid grid-cols-[30px_minmax(0,1fr)_auto] items-center gap-2 px-0.5 py-1 sm:grid-cols-[34px_minmax(0,1fr)_auto] sm:gap-2.5 sm:px-1 sm:py-1.5",
        children: [
          (0, t.jsx)("span", {
            className: "h-7 w-7 rounded-full bg-bg-tertiary sm:h-8 sm:w-8",
          }),
          (0, t.jsxs)("span", {
            className: "flex flex-col gap-0.5",
            children: [
              (0, t.jsx)("span", {
                className: "flex h-4 items-center",
                children: (0, t.jsx)("span", {
                  className: "block h-3.5 w-3/4 rounded bg-bg-tertiary",
                }),
              }),
              (0, t.jsx)("span", {
                className: "flex h-4 items-center",
                children: (0, t.jsx)("span", {
                  className: "block h-3 w-1/3 rounded bg-bg-tertiary",
                }),
              }),
            ],
          }),
          (0, t.jsx)("span", { className: "h-4 w-12 rounded bg-bg-tertiary" }),
        ],
      },
      s,
    );
  }
  function ep() {
    let e,
      r,
      l,
      i,
      o,
      d,
      m,
      x,
      c,
      p = (0, s.c)(21),
      { t: u } = (0, n.f)();
    p[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((e = { limit: 3 }), (p[0] = e))
      : (e = p[0]);
    let {
      data: b,
      isLoading: h,
      isError: g,
    } = ((e) => {
      let t,
        a,
        r = (0, s.c)(8),
        { limit: n, enabled: l, queryOptions: i } = void 0 === e ? {} : e,
        o = void 0 === l || l,
        d = (0, S.useLivestreamApiClient)(),
        m = z.Q.BOUNTY_TOP_SPENDERS({ limit: n });
      return (
        r[0] !== d || r[1] !== n
          ? ((t = async () => {
              let e = {};
              null != n && (e.limit = String(n));
              let t = await d
                .get("bounties/v2/top-spenders", { searchParams: e })
                .json();
              return H.parse(t);
            }),
            (r[0] = d),
            (r[1] = n),
            (r[2] = t))
          : (t = r[2]),
        r[3] !== o || r[4] !== i || r[5] !== m || r[6] !== t
          ? ((a = { enabled: o, queryKey: m, queryFn: t, ...i }),
            (r[3] = o),
            (r[4] = i),
            (r[5] = m),
            (r[6] = t),
            (r[7] = a))
          : (a = r[7]),
        (0, U.useQuery)(a)
      );
    })(e);
    p[1] !== b?.items
      ? ((r = b?.items ?? []), (p[1] = b?.items), (p[2] = r))
      : (r = p[2]);
    let f = r;
    p[3] !== f ? ((l = f.map(eb)), (p[3] = f), (p[4] = l)) : (l = p[4]);
    let y = B(l);
    p[5] !== f ? ((i = f.reduce(eu, 0)), (p[5] = f), (p[6] = i)) : (i = p[6]);
    let j = i;
    return g
      ? null
      : (p[7] === Symbol.for("react.memo_cache_sentinel")
          ? ((o = (0, t.jsx)(a.kg, {
              "aria-hidden": !0,
              className: "h-2.5 w-2.5 text-text-secondary sm:h-3 sm:w-3",
            })),
            (p[7] = o))
          : (o = p[7]),
        p[8] !== u
          ? ((d = u("home.bounties.leaderboard.top_spenders_title", {
              days: 30,
            })),
            (p[8] = u),
            (p[9] = d))
          : (d = p[9]),
        p[10] !== d
          ? ((m = (0, t.jsxs)("header", {
              className:
                "flex items-center gap-1.5 border-b border-border-tertiary pb-1.5 sm:pb-2",
              children: [
                o,
                (0, t.jsx)("h4", {
                  className:
                    "m-0 text-[9px] font-semibold uppercase tracking-[0.08em] text-text-tertiary sm:text-[10px]",
                  id: "bounties-top-spenders-heading",
                  children: d,
                }),
              ],
            })),
            (p[10] = d),
            (p[11] = m))
          : (m = p[11]),
        p[12] !== h || p[13] !== f || p[14] !== j || p[15] !== y || p[16] !== u
          ? ((x =
              h && 0 === f.length
                ? (0, t.jsx)(eg, {})
                : 0 === f.length
                  ? (0, t.jsx)("p", {
                      className:
                        "px-1 py-3 text-center text-[10.5px] text-text-tertiary sm:py-4 sm:text-[11.5px]",
                      children: u(
                        "home.bounties.leaderboard.top_spenders_empty",
                      ),
                    })
                  : (0, t.jsx)("ol", {
                      className:
                        "m-0 flex list-none flex-col gap-1.5 p-0 sm:gap-2.5",
                      children: f.map((e, s) =>
                        (0, t.jsx)(
                          eh,
                          {
                            index: s,
                            maxSpent: j,
                            spender: e,
                            user: y.get(e.address.toLowerCase()),
                          },
                          e.address,
                        ),
                      ),
                    })),
            (p[12] = h),
            (p[13] = f),
            (p[14] = j),
            (p[15] = y),
            (p[16] = u),
            (p[17] = x))
          : (x = p[17]),
        p[18] !== m || p[19] !== x
          ? ((c = (0, t.jsxs)("section", {
              "aria-labelledby": "bounties-top-spenders-heading",
              className:
                "flex flex-col gap-1.5 rounded-[14px] border border-border-tertiary bg-bg-tertiary p-2.5 sm:gap-2 sm:rounded-[18px] sm:p-3",
              "data-testid": "bounties-top-spenders-widget",
              children: [m, x],
            })),
            (p[18] = m),
            (p[19] = x),
            (p[20] = c))
          : (c = p[20]),
        c);
  }
  function eu(e, t) {
    return Math.max(e, t.totalSpentUsd);
  }
  function eb(e) {
    return e.address;
  }
  function eh(e) {
    let a,
      r,
      n,
      l,
      i,
      o,
      m,
      x,
      p,
      u,
      b,
      h,
      g = (0, s.c)(37),
      { spender: f, index: y, maxSpent: j, user: N } = e,
      { ipfsPrefix: w } = (0, P.useIpfsPrefix)(),
      _ = N?.username ?? null;
    g[0] !== f.address || g[1] !== _
      ? ((a = (0, c.B)({ address: f.address, username: _ })),
        (g[0] = f.address),
        (g[1] = _),
        (g[2] = a))
      : (a = g[2]);
    let k = a,
      A = N?.username ?? null;
    g[3] !== f.address || g[4] !== A
      ? ((r = (0, el.d)(f.address, A)),
        (g[3] = f.address),
        (g[4] = A),
        (g[5] = r))
      : (r = g[5]);
    let S = r,
      U = j > 0 ? Math.max(6, (f.totalSpentUsd / j) * 100) : 6,
      z = y + 1;
    g[6] !== z
      ? ((n = (0, t.jsx)("span", {
          className:
            "w-2 text-right text-[9px] font-bold tabular-nums text-text-tertiary sm:w-2.5 sm:text-[10px]",
          children: z,
        })),
        (g[6] = z),
        (g[7] = n))
      : (n = g[7]);
    let C = N?.profile_image ?? void 0;
    (g[8] !== k || g[9] !== w || g[10] !== f.address || g[11] !== C
      ? ((l = (0, t.jsx)(v.f, {
          address: f.address,
          alt: k,
          className:
            "h-[18px] w-[18px] rounded-full object-cover sm:h-5 sm:w-5",
          height: 20,
          ipfsPrefix: w,
          isAnonymous: !1,
          src: C,
          width: 20,
        })),
        (g[8] = k),
        (g[9] = w),
        (g[10] = f.address),
        (g[11] = C),
        (g[12] = l))
      : (l = g[12]),
      g[13] !== k
        ? ((i = (0, t.jsx)("span", {
            className:
              "min-w-0 flex-1 truncate font-semibold text-text-primary",
            children: k,
          })),
          (g[13] = k),
          (g[14] = i))
        : (i = g[14]));
    let T = 1 === f.payoutCount ? "payout" : "payouts";
    (g[15] !== f.payoutCount || g[16] !== T
      ? ((o = (0, t.jsxs)("span", {
          className:
            "hidden text-[10.5px] tabular-nums text-text-tertiary sm:inline",
          children: [f.payoutCount, " ", T],
        })),
        (g[15] = f.payoutCount),
        (g[16] = T),
        (g[17] = o))
      : (o = g[17]),
      g[18] !== f.totalSpentUsd
        ? ((m = (0, c.n)(f.totalSpentUsd)),
          (g[18] = f.totalSpentUsd),
          (g[19] = m))
        : (m = g[19]),
      g[20] !== m
        ? ((x = (0, t.jsx)("span", {
            className:
              "min-w-[40px] text-right text-[12px] font-bold tabular-nums text-text-primary sm:min-w-[44px] sm:text-[13px]",
            children: m,
          })),
          (g[20] = m),
          (g[21] = x))
        : (x = g[21]),
      g[22] !== o || g[23] !== x || g[24] !== n || g[25] !== l || g[26] !== i
        ? ((p = (0, t.jsxs)("div", {
            className:
              "flex items-center gap-1.5 text-[11px] sm:gap-2 sm:text-[12px]",
            children: [n, l, i, o, x],
          })),
          (g[22] = o),
          (g[23] = x),
          (g[24] = n),
          (g[25] = l),
          (g[26] = i),
          (g[27] = p))
        : (p = g[27]));
    let I =
        0 === y
          ? "h-full rounded-full bg-positive transition-[width] duration-300"
          : "h-full rounded-full bg-positive/45 transition-[width] duration-300",
      $ = `${U}%`;
    return (
      g[28] !== $
        ? ((u = { width: $ }), (g[28] = $), (g[29] = u))
        : (u = g[29]),
      g[30] !== I || g[31] !== u
        ? ((b = (0, t.jsx)("div", {
            "aria-hidden": !0,
            className:
              "ml-5 h-0.5 overflow-hidden rounded-full bg-bg-tertiary sm:ml-6 sm:h-1",
            children: (0, t.jsx)("div", { className: I, style: u }),
          })),
          (g[30] = I),
          (g[31] = u),
          (g[32] = b))
        : (b = g[32]),
      g[33] !== S || g[34] !== p || g[35] !== b
        ? ((h = (0, t.jsx)("li", {
            children: (0, t.jsxs)(d.default, {
              className:
                "flex flex-col gap-1 rounded-lg px-0.5 py-1 transition-colors hover:bg-bg-tertiary sm:gap-1.5 sm:px-1",
              href: S,
              children: [p, b],
            }),
          })),
          (g[33] = S),
          (g[34] = p),
          (g[35] = b),
          (g[36] = h))
        : (h = g[36]),
      h
    );
  }
  function eg() {
    let e,
      a,
      r,
      l = (0, s.c)(5),
      { t: i } = (0, n.f)();
    return (
      l[0] !== i
        ? ((e = i("web.bounties.loading_top_spenders")), (l[0] = i), (l[1] = e))
        : (e = l[1]),
      l[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = Array.from({ length: 3 }).map(ef)), (l[2] = a))
        : (a = l[2]),
      l[3] !== e
        ? ((r = (0, t.jsx)("div", {
            "aria-busy": !0,
            "aria-label": e,
            className: "flex flex-col gap-1.5 sm:gap-2.5",
            "data-testid": "bounties-top-spenders-skeleton",
            children: a,
          })),
          (l[3] = e),
          (l[4] = r))
        : (r = l[4]),
      r
    );
  }
  function ef(e, s) {
    return (0, t.jsxs)(
      "div",
      {
        className: "flex flex-col gap-1 px-0.5 py-1 sm:gap-1.5 sm:px-1",
        children: [
          (0, t.jsxs)("div", {
            className: "flex h-[18px] items-center gap-1.5 sm:h-5 sm:gap-2",
            children: [
              (0, t.jsx)("span", { className: "w-2 sm:w-2.5" }),
              (0, t.jsx)("span", {
                className:
                  "h-[18px] w-[18px] rounded-full bg-bg-tertiary sm:h-5 sm:w-5",
              }),
              (0, t.jsx)("span", {
                className: "block h-3 flex-1 rounded bg-bg-tertiary",
              }),
              (0, t.jsx)("span", {
                className: "block h-3 w-10 rounded bg-bg-tertiary",
              }),
            ],
          }),
          (0, t.jsx)("div", {
            className: "ml-5 h-0.5 rounded-full bg-bg-tertiary sm:ml-6 sm:h-1",
          }),
        ],
      },
      s,
    );
  }
  function ey(e) {
    let a,
      r,
      i,
      d,
      m,
      x,
      c,
      p,
      u,
      b,
      g = (0, s.c)(15),
      { className: f } = e,
      { t: y } = (0, n.f)();
    return (
      g[0] !== f
        ? ((a = (0, l.c)("flex flex-col gap-3", f)), (g[0] = f), (g[1] = a))
        : (a = g[1]),
      g[2] !== y
        ? ((r = y("web.bounties.leaderboard_widgets_label")),
          (g[2] = y),
          (g[3] = r))
        : (r = g[3]),
      g[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsx)(h, {})),
          (d = (0, t.jsx)(L, {})),
          (m = (0, t.jsx)(eo, {})),
          (x = (0, t.jsx)(ep, {})),
          (c = (0, t.jsx)(et, {})),
          (g[4] = i),
          (g[5] = d),
          (g[6] = m),
          (g[7] = x),
          (g[8] = c))
        : ((i = g[4]), (d = g[5]), (m = g[6]), (x = g[7]), (c = g[8])),
      g[9] !== r
        ? ((p = (0, t.jsxs)("div", {
            "aria-label": r,
            className:
              "flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-1 pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*]:w-[236px] [&>*]:shrink-0 [&>*]:snap-start sm:flex-col sm:gap-3 sm:overflow-visible sm:pb-0 sm:pr-0 sm:snap-none sm:[&>*]:w-auto sm:[&>*]:shrink",
            "data-testid": "bounties-leaderboard-widgets-rail",
            children: [i, d, m, x, c],
          })),
          (g[9] = r),
          (g[10] = p))
        : (p = g[10]),
      g[11] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = (0, t.jsx)(o, {})), (g[11] = u))
        : (u = g[11]),
      g[12] !== a || g[13] !== p
        ? ((b = (0, t.jsxs)("div", { className: a, children: [p, u] })),
          (g[12] = a),
          (g[13] = p),
          (g[14] = b))
        : (b = g[14]),
      b
    );
  }
  (e.s(["f", 0, ey], 691103),
    e.s(
      [
        "f",
        0,
        function (e) {
          let l,
            i,
            o,
            d,
            m,
            x = (0, s.c)(11),
            { onPostBounty: c, showLeaderboardWidgets: p } = e,
            u = void 0 !== p && p,
            { t: b } = (0, n.f)();
          return (
            x[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((l = (0, t.jsx)(a.YC, {})), (x[0] = l))
              : (l = x[0]),
            x[1] !== b
              ? ((i = b("web.bounties.create_bounty")), (x[1] = b), (x[2] = i))
              : (i = x[2]),
            x[3] !== c || x[4] !== i
              ? ((o = (0, t.jsx)(r.K, {
                  className: "w-full",
                  iconStart: l,
                  onClick: c,
                  variant: "primary",
                  children: i,
                })),
                (x[3] = c),
                (x[4] = i),
                (x[5] = o))
              : (o = x[5]),
            x[6] !== u
              ? ((d = u ? (0, t.jsx)(ey, {}) : null), (x[6] = u), (x[7] = d))
              : (d = x[7]),
            x[8] !== o || x[9] !== d
              ? ((m = (0, t.jsxs)("aside", {
                  className: "flex flex-col gap-3.5",
                  children: [o, d],
                })),
                (x[8] = o),
                (x[9] = d),
                (x[10] = m))
              : (m = x[10]),
            m
          );
        },
      ],
      956047,
    ));
};
