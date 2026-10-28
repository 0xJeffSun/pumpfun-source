// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    a = e.i(445242),
    i = e.i(745018),
    l = e.i(98525),
    r = e.i(458310),
    n = e.i(352386);
  e.i(12692);
  var o = e.i(398902),
    s = e.i(42413),
    d = e.i(538661);
  e.i(84455);
  var c = e.i(540805),
    u = e.i(693124),
    m = e.i(787773),
    p = e.i(967694),
    h = e.i(133809),
    f = e.i(403352),
    g = e.i(634661),
    y = e.i(616217),
    v = e.i(659427);
  e.i(267146);
  var b = e.i(762316),
    I = e.i(599432),
    w = e.i(956683),
    C = e.i(69399),
    k = e.i(338319);
  let x = [
      { value: "daily", labelKey: "web.leaderboard.period_1d" },
      { value: "weekly", labelKey: "web.leaderboard.period_1w" },
    ],
    T = [
      { value: "combined", labelKey: "coin_details.profit" },
      { value: "realized", labelKey: "web.leaderboard.realized" },
      { value: "unrealized", labelKey: "web.leaderboard.unrealized" },
    ],
    _ = x.map((e) => e.value),
    E = T.map((e) => e.value);
  function N(e) {
    return e + 50;
  }
  function S(e) {
    let n,
      s,
      m,
      p,
      g,
      y,
      v,
      b,
      k,
      x,
      T,
      _,
      E,
      N,
      S,
      M,
      P,
      U = (0, a.c)(70),
      { entry: A, sort: j, isCurrent: V, density: L, insetClassName: $ } = e,
      { t: O } = (0, o.f)();
    U[0] !== A.username || U[1] !== O
      ? ((n = A.username || O("profile.squads.profile.pill")),
        (U[0] = A.username),
        (U[1] = O),
        (U[2] = n))
      : (n = U[2]);
    let q = n,
      F = A.rank <= 3;
    if (
      U[3] !== L ||
      U[4] !== A ||
      U[5] !== $ ||
      U[6] !== V ||
      U[7] !== F ||
      U[8] !== q ||
      U[9] !== j ||
      U[10] !== O
    ) {
      let e,
        a,
        n,
        o,
        M,
        P = (0, w.C)(A, j),
        D = f.B[L];
      ((s = h.j),
        (x = "li"),
        (T = L),
        (_ = 2),
        (E = A.rank),
        (N = $),
        (S = V ? "bg-bg-tertiary" : void 0),
        (m = "squads-leaderboard-row"),
        U[25] !== A.groupId || U[26] !== A.username
          ? ((e = (0, C.Z)({ groupId: A.groupId, username: A.username })),
            (U[25] = A.groupId),
            (U[26] = A.username),
            (U[27] = e))
          : (e = U[27]));
      let B = V ? "page" : void 0;
      (U[28] !== q || U[29] !== e || U[30] !== B
        ? ((p = (0, t.jsx)(r.default, {
            href: e,
            prefetch: !1,
            "aria-label": q,
            "aria-current": B,
            "data-row-cover": "",
            className: f.a,
          })),
          (U[28] = q),
          (U[29] = e),
          (U[30] = B),
          (U[31] = p))
        : (p = U[31]),
        U[32] !== L ||
        U[33] !== A.groupId ||
        U[34] !== A.profileImageUrl ||
        U[35] !== q
          ? ((g = (0, t.jsx)(d.c, {
              address: A.groupId,
              username: q,
              profileImage: A.profileImageUrl,
              density: L,
              shape: "squircle",
            })),
            (U[32] = L),
            (U[33] = A.groupId),
            (U[34] = A.profileImageUrl),
            (U[35] = q),
            (U[36] = g))
          : (g = U[36]),
        U[37] !== q
          ? ((a = (0, t.jsx)("span", {
              className: "min-w-0 truncate group-hover:underline",
              children: q,
            })),
            (U[37] = q),
            (U[38] = a))
          : (a = U[38]),
        U[39] !== D || U[40] !== A
          ? ((n = (0, I.f)(A) ? (0, t.jsx)(l.f, { size: u.C[D] }) : null),
            (U[39] = D),
            (U[40] = A),
            (U[41] = n))
          : (n = U[41]),
        U[42] !== F
          ? ((o = F
              ? (0, t.jsx)(i.zN, {
                  "aria-hidden": !0,
                  "data-testid": "squads-leaderboard-crown",
                  className: "size-3 shrink-0 text-text-tertiary",
                })
              : null),
            (U[42] = F),
            (U[43] = o))
          : (o = U[43]),
        U[44] !== a || U[45] !== n || U[46] !== o
          ? ((y = (0, t.jsxs)(t.Fragment, { children: [a, n, o] })),
            (U[44] = a),
            (U[45] = n),
            (U[46] = o),
            (U[47] = y))
          : (y = U[47]),
        U[48] !== A.memberCount || U[49] !== O
          ? ((M = O("profile.squads.info.member_count", {
              count: A.memberCount,
            })),
            (U[48] = A.memberCount),
            (U[49] = O),
            (U[50] = M))
          : (M = U[50]),
        U[51] !== M
          ? ((v = (0, t.jsx)("span", { children: M })),
            (U[51] = M),
            (U[52] = v))
          : (v = U[52]),
        (b = (0, c.k)(P)),
        (k = (0, c.u)(P)),
        (U[3] = L),
        (U[4] = A),
        (U[5] = $),
        (U[6] = V),
        (U[7] = F),
        (U[8] = q),
        (U[9] = j),
        (U[10] = O),
        (U[11] = s),
        (U[12] = m),
        (U[13] = p),
        (U[14] = g),
        (U[15] = y),
        (U[16] = v),
        (U[17] = b),
        (U[18] = k),
        (U[19] = x),
        (U[20] = T),
        (U[21] = _),
        (U[22] = E),
        (U[23] = N),
        (U[24] = S));
    } else
      ((s = U[11]),
        (m = U[12]),
        (p = U[13]),
        (g = U[14]),
        (y = U[15]),
        (v = U[16]),
        (b = U[17]),
        (k = U[18]),
        (x = U[19]),
        (T = U[20]),
        (_ = U[21]),
        (E = U[22]),
        (N = U[23]),
        (S = U[24]));
    return (
      U[53] !== b || U[54] !== k
        ? ((M = (0, t.jsx)("span", { className: b, children: k })),
          (U[53] = b),
          (U[54] = k),
          (U[55] = M))
        : (M = U[55]),
      U[56] !== s ||
      U[57] !== m ||
      U[58] !== p ||
      U[59] !== g ||
      U[60] !== y ||
      U[61] !== v ||
      U[62] !== M ||
      U[63] !== x ||
      U[64] !== T ||
      U[65] !== _ ||
      U[66] !== E ||
      U[67] !== N ||
      U[68] !== S
        ? ((P = (0, t.jsx)(s, {
            as: x,
            density: T,
            lines: _,
            rank: E,
            insetClassName: N,
            className: S,
            "data-testid": m,
            cover: p,
            leading: g,
            title: y,
            subtitle: v,
            trailing: M,
          })),
          (U[56] = s),
          (U[57] = m),
          (U[58] = p),
          (U[59] = g),
          (U[60] = y),
          (U[61] = v),
          (U[62] = M),
          (U[63] = x),
          (U[64] = T),
          (U[65] = _),
          (U[66] = E),
          (U[67] = N),
          (U[68] = S),
          (U[69] = P))
        : (P = U[69]),
      P
    );
  }
  let M = (e) => {
    let i,
      l,
      r = (0, a.c)(6),
      { rows: n, density: o, insetClassName: s } = e;
    return (
      r[0] !== n
        ? ((i = Array.from({ length: n })), (r[0] = n), (r[1] = i))
        : (i = r[1]),
      r[2] !== o || r[3] !== s || r[4] !== i
        ? ((l = (0, t.jsx)("div", {
            "aria-hidden": !0,
            "data-testid": "squads-leaderboard-skeleton",
            className: "flex flex-col",
            children: i.map((e, a) =>
              (0, t.jsx)(
                h.p,
                { density: o, lines: 2, leading: "art", insetClassName: s },
                a,
              ),
            ),
          })),
          (r[2] = o),
          (r[3] = s),
          (r[4] = i),
          (r[5] = l))
        : (l = r[5]),
      l
    );
  };
  e.s([
    "f",
    0,
    function (e) {
      let i,
        l,
        r,
        c,
        u,
        h,
        f,
        I,
        w,
        C,
        P = (0, a.c)(39),
        {
          currentGroupId: U,
          showHeader: A,
          refetchIntervalMs: j,
          filterBarLeading: V,
        } = e,
        L = void 0 === A || A,
        { t: $ } = (0, o.f)(),
        { density: O, insetClassName: q, filterBarClassName: F } = (0, d.n)(),
        [D, B] = (0, y.f)(b.b.squadsLeaderboardPeriod, _, "daily"),
        [R, z] = (0, y.f)(b.b.squadsLeaderboardSort, E, "combined");
      P[0] !== D || P[1] !== j || P[2] !== R
        ? ((i = { period: D, sort: R, refetchIntervalMs: j }),
          (P[0] = D),
          (P[1] = j),
          (P[2] = R),
          (P[3] = i))
        : (i = P[3]);
      let G = (0, v.f)(i),
        Q = G.data?.entries ?? [],
        [W, K] = (0, n.useState)(50),
        H = Q.slice(0, W),
        J = W < Q.length,
        Y = G.isPending || G.isPlaceholderData;
      (P[4] !== $
        ? ((l = $("web.leaderboard.top_squads")), (P[4] = $), (P[5] = l))
        : (l = P[5]),
        P[6] !== O || P[7] !== q || P[8] !== L || P[9] !== $
          ? ((r = L
              ? (0, t.jsx)(g._, {
                  density: O,
                  title: $("web.leaderboard.top_squads"),
                  titleAs: "h2",
                  className: q,
                })
              : null),
            (P[6] = O),
            (P[7] = q),
            (P[8] = L),
            (P[9] = $),
            (P[10] = r))
          : (r = P[10]),
        P[11] !== F
          ? ((c = (0, k.c)(F, "justify-between")), (P[11] = F), (P[12] = c))
          : (c = P[12]),
        P[13] !== z || P[14] !== R
          ? ((u = (0, t.jsx)(d.E, {
              labelKey: "web.leaderboard.ranking_metric",
              value: R,
              options: T,
              onSelect: z,
            })),
            (P[13] = z),
            (P[14] = R),
            (P[15] = u))
          : (u = P[15]),
        P[16] !== D || P[17] !== B
          ? ((h = (0, t.jsx)(d.E, {
              labelKey: "web.leaderboard.time_window",
              value: D,
              options: x,
              onSelect: B,
            })),
            (P[16] = D),
            (P[17] = B),
            (P[18] = h))
          : (h = P[18]),
        P[19] !== u || P[20] !== h
          ? ((f = (0, t.jsxs)("div", {
              "data-testid": "board-filter-controls",
              className: "flex min-w-0 shrink-0 items-center gap-2",
              children: [u, h],
            })),
            (P[19] = u),
            (P[20] = h),
            (P[21] = f))
          : (f = P[21]),
        P[22] !== V || P[23] !== f || P[24] !== c
          ? ((I = (0, t.jsxs)("div", {
              "data-testid": "board-filter-bar",
              className: c,
              children: [V, f],
            })),
            (P[22] = V),
            (P[23] = f),
            (P[24] = c),
            (P[25] = I))
          : (I = P[25]),
        P[26] !== O || P[27] !== q || P[28] !== Y || P[29] !== W
          ? ((w = Y
              ? (0, t.jsx)(M, {
                  rows: Math.min(W, 10),
                  density: O,
                  insetClassName: q,
                })
              : null),
            (P[26] = O),
            (P[27] = q),
            (P[28] = Y),
            (P[29] = W),
            (P[30] = w))
          : (w = P[30]));
      let Z =
          G.isError && 0 === Q.length
            ? (0, t.jsx)(p.f, {
                density: O,
                className: q,
                children: $("web.leaderboard.error_board"),
              })
            : null,
        X =
          Y || G.isError || 0 !== Q.length
            ? null
            : (0, t.jsx)(m.L, {
                density: O,
                className: q,
                children: $("web.leaderboard.empty_squads"),
              }),
        ee = Y
          ? null
          : (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsx)("ol", {
                  className: "flex flex-col",
                  "aria-label": $("web.leaderboard.ranked_squads"),
                  children: H.map((e) =>
                    (0, t.jsx)(
                      S,
                      {
                        entry: e,
                        sort: R,
                        isCurrent: e.groupId === U,
                        density: O,
                        insetClassName: q,
                      },
                      e.groupId,
                    ),
                  ),
                }),
                J
                  ? (0, t.jsx)(s.f, {
                      hasNextPage: !0,
                      isFetchingNextPage: !1,
                      onFetchNextPage: () => K(N),
                      label: $("web.feed.load_n_more", { count: 50 }),
                    })
                  : null,
              ],
            });
      return (
        P[31] !== I ||
        P[32] !== w ||
        P[33] !== Z ||
        P[34] !== X ||
        P[35] !== ee ||
        P[36] !== l ||
        P[37] !== r
          ? ((C = (0, t.jsxs)("section", {
              "aria-label": l,
              className: "flex flex-col",
              "data-testid": "squads-leaderboard",
              children: [r, I, w, Z, X, ee],
            })),
            (P[31] = I),
            (P[32] = w),
            (P[33] = Z),
            (P[34] = X),
            (P[35] = ee),
            (P[36] = l),
            (P[37] = r),
            (P[38] = C))
          : (C = P[38]),
        C
      );
    },
  ]);
};
