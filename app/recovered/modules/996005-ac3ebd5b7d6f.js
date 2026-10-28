// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(322315),
    l = e.i(254010),
    s = e.i(365089),
    i = e.i(545063),
    n = e.i(782067),
    o = e.i(352386);
  e.i(12692);
  var d = e.i(398902),
    u = e.i(42413),
    c = e.i(229937),
    f = e.i(538661),
    m = e.i(409954);
  e.i(84455);
  var p = e.i(540805),
    h = e.i(693124),
    g = e.i(779897),
    b = e.i(787773),
    w = e.i(967694),
    y = e.i(133809),
    v = e.i(403352),
    x = e.i(616217),
    j = e.i(864024);
  e.i(267146);
  var _ = e.i(762316),
    A = e.i(416287),
    k = e.i(599432),
    N = e.i(338319);
  let I = [
      { value: "daily", labelKey: "web.leaderboard.period_1d" },
      { value: "weekly", labelKey: "web.leaderboard.period_1w" },
      { value: "monthly", labelKey: "web.leaderboard.period_1m" },
    ],
    C = [
      { value: "combined", labelKey: "coin_details.profit" },
      { value: "realized", labelKey: "web.leaderboard.realized" },
      { value: "unrealized", labelKey: "web.leaderboard.unrealized" },
    ],
    P = I.map((e) => e.value),
    S = C.map((e) => e.value),
    E = (e) => {
      let o,
        d,
        u,
        b,
        w,
        x,
        j,
        _,
        N,
        I,
        C,
        P,
        S,
        E,
        F,
        U,
        T,
        z = (0, r.c)(80),
        {
          entry: K,
          sort: M,
          viewerAddress: R,
          viewerFollowing: L,
          density: B,
          insetClassName: q,
        } = e;
      z[0] !== K.username || z[1] !== K.walletAddress
        ? ((o = K.username || (0, s.d)(K.walletAddress)),
          (z[0] = K.username),
          (z[1] = K.walletAddress),
          (z[2] = o))
        : (o = z[2]);
      let O = o,
        V = (0, l.k)(a.D.WEB_AVATAR_DECORATIONS);
      z[3] !== V || z[4] !== K.walletAddress
        ? ((d = { address: K.walletAddress, enabled: V }),
          (z[3] = V),
          (z[4] = K.walletAddress),
          (z[5] = d))
        : (d = z[5]);
      let { data: D } = (0, n.T)(d),
        W = (0, i.$)(),
        Q = !!R;
      z[6] !== K.isViewer || z[7] !== K.walletAddress || z[8] !== W
        ? ((u = !0 === K.isViewer || W(K.walletAddress)),
          (z[6] = K.isViewer),
          (z[7] = K.walletAddress),
          (z[8] = W),
          (z[9] = u))
        : (u = z[9]);
      let $ = u;
      if (
        z[10] !== B ||
        z[11] !== O ||
        z[12] !== K ||
        z[13] !== q ||
        z[14] !== Q ||
        z[15] !== $ ||
        z[16] !== M ||
        z[17] !== D?.resolved_avatar_decoration ||
        z[18] !== L
      ) {
        let e,
          r,
          a,
          l = (0, A.n)(K, M),
          s = (0, p.k)(l),
          i = !$;
        z[31] !== K.viewerFollows || z[32] !== K.walletAddress || z[33] !== L
          ? ((e = L.isFollowing(K.walletAddress) ?? K.viewerFollows ?? void 0),
            (z[31] = K.viewerFollows),
            (z[32] = K.walletAddress),
            (z[33] = L),
            (z[34] = e))
          : (e = z[34]);
        let n = e;
        ((b = y.j),
          (P = "li"),
          (S = B),
          (E = K.rank),
          (F = q),
          (w = "leaderboard-row"),
          z[35] !== O || z[36] !== K.walletAddress
            ? ((x = (0, t.jsx)(m.o, {
                profileId: K.walletAddress,
                "aria-label": O,
                "data-row-cover": "",
                className: v.a,
              })),
              (z[35] = O),
              (z[36] = K.walletAddress),
              (z[37] = x))
            : (x = z[37]),
          z[38] !== O ||
          z[39] !== K.walletAddress ||
          z[40] !== n ||
          z[41] !== Q ||
          z[42] !== i
            ? ((j = i
                ? (0, t.jsx)(c.f, {
                    userAddress: K.walletAddress,
                    displayName: O,
                    isLoggedIn: Q,
                    initialIsFollowing: !!Q && n,
                    variant: "icon",
                    size: "md",
                    rounded: "md",
                    idle: "ghost",
                    className: v.c,
                  })
                : void 0),
              (z[38] = O),
              (z[39] = K.walletAddress),
              (z[40] = n),
              (z[41] = Q),
              (z[42] = i),
              (z[43] = j))
            : (j = z[43]));
        let o = D?.resolved_avatar_decoration;
        z[44] !== B ||
        z[45] !== K.profileImage ||
        z[46] !== K.username ||
        z[47] !== K.walletAddress ||
        z[48] !== o
          ? ((_ = (0, t.jsx)(f.c, {
              address: K.walletAddress,
              username: K.username,
              profileImage: K.profileImage,
              density: B,
              avatarDecoration: o,
            })),
            (z[44] = B),
            (z[45] = K.profileImage),
            (z[46] = K.username),
            (z[47] = K.walletAddress),
            (z[48] = o),
            (z[49] = _))
          : (_ = z[49]);
        let d = K.walletAddress,
          u = K.username,
          U = K.profileImage,
          T = v.B[B];
        z[50] !== K
          ? ((r = (0, k.f)(K)), (z[50] = K), (z[51] = r))
          : (r = z[51]);
        let R = "terminal" === B ? 16 : 20;
        (z[52] !== B || z[53] !== K.walletAddress || z[54] !== R
          ? ((a = (0, t.jsx)(g.f, {
              address: K.walletAddress,
              density: B,
              size: R,
              testId: "leaderboard-squad-badge",
            })),
            (z[52] = B),
            (z[53] = K.walletAddress),
            (z[54] = R),
            (z[55] = a))
          : (a = z[55]),
          z[56] !== B ||
          z[57] !== K.profileImage ||
          z[58] !== K.username ||
          z[59] !== K.walletAddress ||
          z[60] !== K.xUsername ||
          z[61] !== T ||
          z[62] !== r ||
          z[63] !== a
            ? ((N = (0, t.jsx)(h.S, {
                address: d,
                username: u,
                profileImage: U,
                size: T,
                density: B,
                showAvatar: !1,
                link: !1,
                verified: r,
                xUsername: K.xUsername,
                trailing: a,
                nameClassName: "group-hover:underline",
                className: "relative z-10",
              })),
              (z[56] = B),
              (z[57] = K.profileImage),
              (z[58] = K.username),
              (z[59] = K.walletAddress),
              (z[60] = K.xUsername),
              (z[61] = T),
              (z[62] = r),
              (z[63] = a),
              (z[64] = N))
            : (N = z[64]),
          (I = s),
          (C = null == l ? "—" : (0, p.u)(l)),
          (z[10] = B),
          (z[11] = O),
          (z[12] = K),
          (z[13] = q),
          (z[14] = Q),
          (z[15] = $),
          (z[16] = M),
          (z[17] = D?.resolved_avatar_decoration),
          (z[18] = L),
          (z[19] = b),
          (z[20] = w),
          (z[21] = x),
          (z[22] = j),
          (z[23] = _),
          (z[24] = N),
          (z[25] = I),
          (z[26] = C),
          (z[27] = P),
          (z[28] = S),
          (z[29] = E),
          (z[30] = F));
      } else
        ((b = z[19]),
          (w = z[20]),
          (x = z[21]),
          (j = z[22]),
          (_ = z[23]),
          (N = z[24]),
          (I = z[25]),
          (C = z[26]),
          (P = z[27]),
          (S = z[28]),
          (E = z[29]),
          (F = z[30]));
      return (
        z[65] !== I || z[66] !== C
          ? ((U = (0, t.jsx)("span", { className: I, children: C })),
            (z[65] = I),
            (z[66] = C),
            (z[67] = U))
          : (U = z[67]),
        z[68] !== b ||
        z[69] !== w ||
        z[70] !== x ||
        z[71] !== j ||
        z[72] !== _ ||
        z[73] !== N ||
        z[74] !== U ||
        z[75] !== P ||
        z[76] !== S ||
        z[77] !== E ||
        z[78] !== F
          ? ((T = (0, t.jsx)(b, {
              as: P,
              density: S,
              rank: E,
              insetClassName: F,
              "data-testid": w,
              cover: x,
              action: j,
              leading: _,
              title: N,
              trailing: U,
            })),
            (z[68] = b),
            (z[69] = w),
            (z[70] = x),
            (z[71] = j),
            (z[72] = _),
            (z[73] = N),
            (z[74] = U),
            (z[75] = P),
            (z[76] = S),
            (z[77] = E),
            (z[78] = F),
            (z[79] = T))
          : (T = z[79]),
        T
      );
    },
    F = (e) => {
      let a,
        l,
        s = (0, r.c)(6),
        { rows: i, density: n, insetClassName: o } = e,
        d = void 0 === i ? 6 : i;
      return (
        s[0] !== d
          ? ((a = Array.from({ length: d })), (s[0] = d), (s[1] = a))
          : (a = s[1]),
        s[2] !== n || s[3] !== o || s[4] !== a
          ? ((l = (0, t.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": "leaderboard-skeleton",
              className: "flex flex-col",
              children: a.map((e, r) =>
                (0, t.jsx)(
                  y.p,
                  { density: n, leading: "circle", insetClassName: o },
                  r,
                ),
              ),
            })),
            (s[2] = n),
            (s[3] = o),
            (s[4] = a),
            (s[5] = l))
          : (l = s[5]),
        l
      );
    };
  e.s([
    "f",
    0,
    function (e) {
      let a,
        l,
        s,
        i,
        n,
        c,
        m,
        p,
        h = (0, r.c)(32),
        {
          enabled: g,
          viewerAddress: y,
          viewerFollowing: v,
          refetchIntervalMs: A,
          variant: k,
          pageSize: U,
          filterBarLeading: T,
        } = e,
        { t: z } = (0, d.f)(),
        { density: K, insetClassName: M, filterBarClassName: R } = (0, f.n)(),
        L = "profile" === (void 0 === k ? "home" : k),
        [B, q] = (0, x.f)(_.b.leaderboardPeriod, P, "weekly"),
        [O, V] = (0, x.f)(_.b.leaderboardSort, S, "combined");
      h[0] !== g || h[1] !== B || h[2] !== A || h[3] !== O
        ? ((a = {
            period: B,
            sort: O,
            limit: 100,
            enabled: g,
            refetchIntervalMs: A,
          }),
          (h[0] = g),
          (h[1] = B),
          (h[2] = A),
          (h[3] = O),
          (h[4] = a))
        : (a = h[4]);
      let D = (0, j.f)(a),
        W = D.data?.entries ?? [],
        Q = U ?? (L ? 50 : 20),
        [$, H] = (0, o.useState)(Q),
        J = W.slice(0, $),
        G = $ < W.length,
        X = D.isPending || D.isPlaceholderData;
      if (!g) return null;
      (h[5] !== R
        ? ((l = (0, N.c)(R, "justify-between")), (h[5] = R), (h[6] = l))
        : (l = h[6]),
        h[7] !== V || h[8] !== O
          ? ((s = (0, t.jsx)(f.E, {
              labelKey: "web.leaderboard.ranking_metric",
              value: O,
              options: C,
              onSelect: V,
            })),
            (h[7] = V),
            (h[8] = O),
            (h[9] = s))
          : (s = h[9]),
        h[10] !== B || h[11] !== q
          ? ((i = (0, t.jsx)(f.E, {
              labelKey: "web.leaderboard.time_window",
              value: B,
              options: I,
              onSelect: q,
            })),
            (h[10] = B),
            (h[11] = q),
            (h[12] = i))
          : (i = h[12]),
        h[13] !== s || h[14] !== i
          ? ((n = (0, t.jsxs)("div", {
              "data-testid": "board-filter-controls",
              className: "flex min-w-0 shrink-0 items-center gap-2",
              children: [s, i],
            })),
            (h[13] = s),
            (h[14] = i),
            (h[15] = n))
          : (n = h[15]),
        h[16] !== T || h[17] !== l || h[18] !== n
          ? ((c = (0, t.jsxs)("div", {
              "data-testid": "board-filter-bar",
              className: l,
              children: [T, n],
            })),
            (h[16] = T),
            (h[17] = l),
            (h[18] = n),
            (h[19] = c))
          : (c = h[19]),
        h[20] !== K || h[21] !== M || h[22] !== X || h[23] !== L || h[24] !== $
          ? ((m = X
              ? (0, t.jsx)(F, {
                  rows: Math.min($, L ? 10 : 20),
                  density: K,
                  insetClassName: M,
                })
              : null),
            (h[20] = K),
            (h[21] = M),
            (h[22] = X),
            (h[23] = L),
            (h[24] = $),
            (h[25] = m))
          : (m = h[25]));
      let Z =
          D.isError && 0 === W.length
            ? (0, t.jsx)(w.f, {
                density: K,
                className: M,
                onRetry: () => void D.refetch(),
                children: z("web.leaderboard.error_board"),
              })
            : null,
        Y =
          X || D.isError || 0 !== W.length
            ? null
            : (0, t.jsx)(b.L, {
                density: K,
                className: M,
                children: z("web.leaderboard.empty_board"),
              }),
        ee = X
          ? null
          : (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsx)("ol", {
                  className: "flex flex-col",
                  "aria-label": z("web.leaderboard.ranked_traders"),
                  children: J.map((e) =>
                    (0, t.jsx)(
                      E,
                      {
                        entry: e,
                        sort: O,
                        viewerAddress: y,
                        viewerFollowing: v,
                        density: K,
                        insetClassName: M,
                      },
                      e.walletAddress,
                    ),
                  ),
                }),
                G
                  ? (0, t.jsx)(u.f, {
                      hasNextPage: !0,
                      isFetchingNextPage: !1,
                      onFetchNextPage: () => H((e) => e + Q),
                      label: z("web.feed.load_n_more", {
                        count: Math.min(Q, W.length - $),
                      }),
                    })
                  : null,
              ],
            });
      return (
        h[26] !== ee || h[27] !== c || h[28] !== m || h[29] !== Z || h[30] !== Y
          ? ((p = (0, t.jsxs)(t.Fragment, { children: [c, m, Z, Y, ee] })),
            (h[26] = ee),
            (h[27] = c),
            (h[28] = m),
            (h[29] = Z),
            (h[30] = Y),
            (h[31] = p))
          : (p = h[31]),
        p
      );
    },
  ]);
};
