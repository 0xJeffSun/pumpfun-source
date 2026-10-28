// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(745018),
    i = e.i(98525),
    n = e.i(458310),
    l = e.i(352386);
  e.i(12692);
  var s = e.i(398902),
    o = e.i(42413),
    d = e.i(538661);
  e.i(84455);
  var u = e.i(540805),
    c = e.i(693124),
    m = e.i(787773),
    p = e.i(967694),
    h = e.i(133809),
    f = e.i(403352),
    g = e.i(634661),
    b = e.i(616217),
    y = e.i(659427);
  e.i(267146);
  var v = e.i(762316),
    w = e.i(599432),
    k = e.i(956683),
    C = e.i(69399),
    x = e.i(338319);
  let I = [
      { value: "daily", labelKey: "web.leaderboard.period_1d" },
      { value: "weekly", labelKey: "web.leaderboard.period_1w" },
    ],
    _ = [
      { value: "combined", labelKey: "coin_details.profit" },
      { value: "realized", labelKey: "web.leaderboard.realized" },
      { value: "unrealized", labelKey: "web.leaderboard.unrealized" },
    ],
    T = I.map((e) => e.value),
    E = _.map((e) => e.value);
  function S(e) {
    return e + 50;
  }
  function A(e) {
    let l,
      o,
      m,
      p,
      g,
      b,
      y,
      v,
      x,
      I,
      _,
      T,
      E,
      S,
      A,
      V,
      L,
      P = (0, r.c)(70),
      { entry: j, sort: N, isCurrent: U, density: M, insetClassName: O } = e,
      { t: $ } = (0, s.f)();
    P[0] !== j.username || P[1] !== $
      ? ((l = j.username || $("profile.squads.profile.pill")),
        (P[0] = j.username),
        (P[1] = $),
        (P[2] = l))
      : (l = P[2]);
    let q = l,
      F = j.rank <= 3;
    if (
      P[3] !== M ||
      P[4] !== j ||
      P[5] !== O ||
      P[6] !== U ||
      P[7] !== F ||
      P[8] !== q ||
      P[9] !== N ||
      P[10] !== $
    ) {
      let e,
        r,
        l,
        s,
        V,
        L = (0, k.C)(j, N),
        D = f.B[M];
      ((o = h.j),
        (I = "li"),
        (_ = M),
        (T = 2),
        (E = j.rank),
        (S = O),
        (A = U ? "bg-bg-tertiary" : void 0),
        (m = "squads-leaderboard-row"),
        P[25] !== j.groupId || P[26] !== j.username
          ? ((e = (0, C.Z)({ groupId: j.groupId, username: j.username })),
            (P[25] = j.groupId),
            (P[26] = j.username),
            (P[27] = e))
          : (e = P[27]));
      let R = U ? "page" : void 0;
      (P[28] !== q || P[29] !== e || P[30] !== R
        ? ((p = (0, t.jsx)(n.default, {
            href: e,
            prefetch: !1,
            "aria-label": q,
            "aria-current": R,
            "data-row-cover": "",
            className: f.a,
          })),
          (P[28] = q),
          (P[29] = e),
          (P[30] = R),
          (P[31] = p))
        : (p = P[31]),
        P[32] !== M ||
        P[33] !== j.groupId ||
        P[34] !== j.profileImageUrl ||
        P[35] !== q
          ? ((g = (0, t.jsx)(d.c, {
              address: j.groupId,
              username: q,
              profileImage: j.profileImageUrl,
              density: M,
              shape: "squircle",
            })),
            (P[32] = M),
            (P[33] = j.groupId),
            (P[34] = j.profileImageUrl),
            (P[35] = q),
            (P[36] = g))
          : (g = P[36]),
        P[37] !== q
          ? ((r = (0, t.jsx)("span", {
              className: "min-w-0 truncate group-hover:underline",
              children: q,
            })),
            (P[37] = q),
            (P[38] = r))
          : (r = P[38]),
        P[39] !== D || P[40] !== j
          ? ((l = (0, w.f)(j) ? (0, t.jsx)(i.f, { size: c.C[D] }) : null),
            (P[39] = D),
            (P[40] = j),
            (P[41] = l))
          : (l = P[41]),
        P[42] !== F
          ? ((s = F
              ? (0, t.jsx)(a.zN, {
                  "aria-hidden": !0,
                  "data-testid": "squads-leaderboard-crown",
                  className: "size-3 shrink-0 text-text-tertiary",
                })
              : null),
            (P[42] = F),
            (P[43] = s))
          : (s = P[43]),
        P[44] !== r || P[45] !== l || P[46] !== s
          ? ((b = (0, t.jsxs)(t.Fragment, { children: [r, l, s] })),
            (P[44] = r),
            (P[45] = l),
            (P[46] = s),
            (P[47] = b))
          : (b = P[47]),
        P[48] !== j.memberCount || P[49] !== $
          ? ((V = $("profile.squads.info.member_count", {
              count: j.memberCount,
            })),
            (P[48] = j.memberCount),
            (P[49] = $),
            (P[50] = V))
          : (V = P[50]),
        P[51] !== V
          ? ((y = (0, t.jsx)("span", { children: V })),
            (P[51] = V),
            (P[52] = y))
          : (y = P[52]),
        (v = (0, u.k)(L)),
        (x = (0, u.u)(L)),
        (P[3] = M),
        (P[4] = j),
        (P[5] = O),
        (P[6] = U),
        (P[7] = F),
        (P[8] = q),
        (P[9] = N),
        (P[10] = $),
        (P[11] = o),
        (P[12] = m),
        (P[13] = p),
        (P[14] = g),
        (P[15] = b),
        (P[16] = y),
        (P[17] = v),
        (P[18] = x),
        (P[19] = I),
        (P[20] = _),
        (P[21] = T),
        (P[22] = E),
        (P[23] = S),
        (P[24] = A));
    } else
      ((o = P[11]),
        (m = P[12]),
        (p = P[13]),
        (g = P[14]),
        (b = P[15]),
        (y = P[16]),
        (v = P[17]),
        (x = P[18]),
        (I = P[19]),
        (_ = P[20]),
        (T = P[21]),
        (E = P[22]),
        (S = P[23]),
        (A = P[24]));
    return (
      P[53] !== v || P[54] !== x
        ? ((V = (0, t.jsx)("span", { className: v, children: x })),
          (P[53] = v),
          (P[54] = x),
          (P[55] = V))
        : (V = P[55]),
      P[56] !== o ||
      P[57] !== m ||
      P[58] !== p ||
      P[59] !== g ||
      P[60] !== b ||
      P[61] !== y ||
      P[62] !== V ||
      P[63] !== I ||
      P[64] !== _ ||
      P[65] !== T ||
      P[66] !== E ||
      P[67] !== S ||
      P[68] !== A
        ? ((L = (0, t.jsx)(o, {
            as: I,
            density: _,
            lines: T,
            rank: E,
            insetClassName: S,
            className: A,
            "data-testid": m,
            cover: p,
            leading: g,
            title: b,
            subtitle: y,
            trailing: V,
          })),
          (P[56] = o),
          (P[57] = m),
          (P[58] = p),
          (P[59] = g),
          (P[60] = b),
          (P[61] = y),
          (P[62] = V),
          (P[63] = I),
          (P[64] = _),
          (P[65] = T),
          (P[66] = E),
          (P[67] = S),
          (P[68] = A),
          (P[69] = L))
        : (L = P[69]),
      L
    );
  }
  let V = (e) => {
    let a,
      i,
      n = (0, r.c)(6),
      { rows: l, density: s, insetClassName: o } = e;
    return (
      n[0] !== l
        ? ((a = Array.from({ length: l })), (n[0] = l), (n[1] = a))
        : (a = n[1]),
      n[2] !== s || n[3] !== o || n[4] !== a
        ? ((i = (0, t.jsx)("div", {
            "aria-hidden": !0,
            "data-testid": "squads-leaderboard-skeleton",
            className: "flex flex-col",
            children: a.map((e, r) =>
              (0, t.jsx)(
                h.p,
                { density: s, lines: 2, leading: "art", insetClassName: o },
                r,
              ),
            ),
          })),
          (n[2] = s),
          (n[3] = o),
          (n[4] = a),
          (n[5] = i))
        : (i = n[5]),
      i
    );
  };
  e.s([
    "f",
    0,
    function (e) {
      let a,
        i,
        n,
        u,
        c,
        h,
        f,
        w,
        k,
        C,
        L = (0, r.c)(39),
        {
          currentGroupId: P,
          showHeader: j,
          refetchIntervalMs: N,
          filterBarLeading: U,
        } = e,
        M = void 0 === j || j,
        { t: O } = (0, s.f)(),
        { density: $, insetClassName: q, filterBarClassName: F } = (0, d.n)(),
        [D, R] = (0, b.f)(v.b.squadsLeaderboardPeriod, T, "daily"),
        [B, G] = (0, b.f)(v.b.squadsLeaderboardSort, E, "combined");
      L[0] !== D || L[1] !== N || L[2] !== B
        ? ((a = { period: D, sort: B, refetchIntervalMs: N }),
          (L[0] = D),
          (L[1] = N),
          (L[2] = B),
          (L[3] = a))
        : (a = L[3]);
      let z = (0, y.f)(a),
        H = z.data?.entries ?? [],
        [K, W] = (0, l.useState)(50),
        Q = H.slice(0, K),
        J = K < H.length,
        Y = z.isPending || z.isPlaceholderData;
      (L[4] !== O
        ? ((i = O("web.leaderboard.top_squads")), (L[4] = O), (L[5] = i))
        : (i = L[5]),
        L[6] !== $ || L[7] !== q || L[8] !== M || L[9] !== O
          ? ((n = M
              ? (0, t.jsx)(g._, {
                  density: $,
                  title: O("web.leaderboard.top_squads"),
                  titleAs: "h2",
                  className: q,
                })
              : null),
            (L[6] = $),
            (L[7] = q),
            (L[8] = M),
            (L[9] = O),
            (L[10] = n))
          : (n = L[10]),
        L[11] !== F
          ? ((u = (0, x.c)(F, "justify-between")), (L[11] = F), (L[12] = u))
          : (u = L[12]),
        L[13] !== G || L[14] !== B
          ? ((c = (0, t.jsx)(d.E, {
              labelKey: "web.leaderboard.ranking_metric",
              value: B,
              options: _,
              onSelect: G,
            })),
            (L[13] = G),
            (L[14] = B),
            (L[15] = c))
          : (c = L[15]),
        L[16] !== D || L[17] !== R
          ? ((h = (0, t.jsx)(d.E, {
              labelKey: "web.leaderboard.time_window",
              value: D,
              options: I,
              onSelect: R,
            })),
            (L[16] = D),
            (L[17] = R),
            (L[18] = h))
          : (h = L[18]),
        L[19] !== c || L[20] !== h
          ? ((f = (0, t.jsxs)("div", {
              "data-testid": "board-filter-controls",
              className: "flex min-w-0 shrink-0 items-center gap-2",
              children: [c, h],
            })),
            (L[19] = c),
            (L[20] = h),
            (L[21] = f))
          : (f = L[21]),
        L[22] !== U || L[23] !== f || L[24] !== u
          ? ((w = (0, t.jsxs)("div", {
              "data-testid": "board-filter-bar",
              className: u,
              children: [U, f],
            })),
            (L[22] = U),
            (L[23] = f),
            (L[24] = u),
            (L[25] = w))
          : (w = L[25]),
        L[26] !== $ || L[27] !== q || L[28] !== Y || L[29] !== K
          ? ((k = Y
              ? (0, t.jsx)(V, {
                  rows: Math.min(K, 10),
                  density: $,
                  insetClassName: q,
                })
              : null),
            (L[26] = $),
            (L[27] = q),
            (L[28] = Y),
            (L[29] = K),
            (L[30] = k))
          : (k = L[30]));
      let Z =
          z.isError && 0 === H.length
            ? (0, t.jsx)(p.f, {
                density: $,
                className: q,
                children: O("web.leaderboard.error_board"),
              })
            : null,
        X =
          Y || z.isError || 0 !== H.length
            ? null
            : (0, t.jsx)(m.L, {
                density: $,
                className: q,
                children: O("web.leaderboard.empty_squads"),
              }),
        ee = Y
          ? null
          : (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsx)("ol", {
                  className: "flex flex-col",
                  "aria-label": O("web.leaderboard.ranked_squads"),
                  children: Q.map((e) =>
                    (0, t.jsx)(
                      A,
                      {
                        entry: e,
                        sort: B,
                        isCurrent: e.groupId === P,
                        density: $,
                        insetClassName: q,
                      },
                      e.groupId,
                    ),
                  ),
                }),
                J
                  ? (0, t.jsx)(o.f, {
                      hasNextPage: !0,
                      isFetchingNextPage: !1,
                      onFetchNextPage: () => W(S),
                      label: O("web.feed.load_n_more", { count: 50 }),
                    })
                  : null,
              ],
            });
      return (
        L[31] !== w ||
        L[32] !== k ||
        L[33] !== Z ||
        L[34] !== X ||
        L[35] !== ee ||
        L[36] !== i ||
        L[37] !== n
          ? ((C = (0, t.jsxs)("section", {
              "aria-label": i,
              className: "flex flex-col",
              "data-testid": "squads-leaderboard",
              children: [n, w, k, Z, X, ee],
            })),
            (L[31] = w),
            (L[32] = k),
            (L[33] = Z),
            (L[34] = X),
            (L[35] = ee),
            (L[36] = i),
            (L[37] = n),
            (L[38] = C))
          : (C = L[38]),
        C
      );
    },
  ]);
};
