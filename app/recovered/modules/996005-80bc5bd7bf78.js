// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var a = e.i(732486),
    t = e.i(445242),
    r = e.i(322315),
    s = e.i(254010),
    l = e.i(365089),
    i = e.i(545063),
    n = e.i(782067),
    o = e.i(352386);
  e.i(12692);
  var d = e.i(398902),
    u = e.i(42413),
    c = e.i(229937),
    m = e.i(538661),
    f = e.i(409954);
  e.i(84455);
  var p = e.i(540805),
    h = e.i(693124),
    g = e.i(779897),
    x = e.i(787773),
    v = e.i(967694),
    w = e.i(133809),
    y = e.i(403352),
    b = e.i(616217),
    j = e.i(864024);
  e.i(267146);
  var N = e.i(762316),
    _ = e.i(416287),
    A = e.i(599432),
    k = e.i(338319);
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
    E = I.map((e) => e.value),
    F = C.map((e) => e.value),
    P = (e) => {
      let o,
        d,
        u,
        x,
        v,
        b,
        j,
        N,
        k,
        I,
        C,
        E,
        F,
        P,
        S,
        T,
        U,
        L = (0, t.c)(80),
        {
          entry: M,
          sort: z,
          viewerAddress: R,
          viewerFollowing: B,
          density: K,
          insetClassName: D,
        } = e;
      L[0] !== M.username || L[1] !== M.walletAddress
        ? ((o = M.username || (0, l.d)(M.walletAddress)),
          (L[0] = M.username),
          (L[1] = M.walletAddress),
          (L[2] = o))
        : (o = L[2]);
      let q = o,
        O = (0, s.k)(r.D.WEB_AVATAR_DECORATIONS);
      L[3] !== O || L[4] !== M.walletAddress
        ? ((d = { address: M.walletAddress, enabled: O }),
          (L[3] = O),
          (L[4] = M.walletAddress),
          (L[5] = d))
        : (d = L[5]);
      let { data: V } = (0, n.T)(d),
        Q = (0, i.$)(),
        W = !!R;
      L[6] !== M.isViewer || L[7] !== M.walletAddress || L[8] !== Q
        ? ((u = !0 === M.isViewer || Q(M.walletAddress)),
          (L[6] = M.isViewer),
          (L[7] = M.walletAddress),
          (L[8] = Q),
          (L[9] = u))
        : (u = L[9]);
      let H = u;
      if (
        L[10] !== K ||
        L[11] !== q ||
        L[12] !== M ||
        L[13] !== D ||
        L[14] !== W ||
        L[15] !== H ||
        L[16] !== z ||
        L[17] !== V?.resolved_avatar_decoration ||
        L[18] !== B
      ) {
        let e,
          t,
          r,
          s = (0, _.n)(M, z),
          l = (0, p.k)(s),
          i = !H;
        L[31] !== M.viewerFollows || L[32] !== M.walletAddress || L[33] !== B
          ? ((e = B.isFollowing(M.walletAddress) ?? M.viewerFollows ?? void 0),
            (L[31] = M.viewerFollows),
            (L[32] = M.walletAddress),
            (L[33] = B),
            (L[34] = e))
          : (e = L[34]);
        let n = e;
        ((x = w.j),
          (E = "li"),
          (F = K),
          (P = M.rank),
          (S = D),
          (v = "leaderboard-row"),
          L[35] !== q || L[36] !== M.walletAddress
            ? ((b = (0, a.jsx)(f.o, {
                profileId: M.walletAddress,
                "aria-label": q,
                "data-row-cover": "",
                className: y.a,
              })),
              (L[35] = q),
              (L[36] = M.walletAddress),
              (L[37] = b))
            : (b = L[37]),
          L[38] !== q ||
          L[39] !== M.walletAddress ||
          L[40] !== n ||
          L[41] !== W ||
          L[42] !== i
            ? ((j = i
                ? (0, a.jsx)(c.f, {
                    userAddress: M.walletAddress,
                    displayName: q,
                    isLoggedIn: W,
                    initialIsFollowing: !!W && n,
                    variant: "icon",
                    size: "md",
                    rounded: "md",
                    idle: "ghost",
                    className: y.c,
                  })
                : void 0),
              (L[38] = q),
              (L[39] = M.walletAddress),
              (L[40] = n),
              (L[41] = W),
              (L[42] = i),
              (L[43] = j))
            : (j = L[43]));
        let o = V?.resolved_avatar_decoration;
        L[44] !== K ||
        L[45] !== M.profileImage ||
        L[46] !== M.username ||
        L[47] !== M.walletAddress ||
        L[48] !== o
          ? ((N = (0, a.jsx)(m.c, {
              address: M.walletAddress,
              username: M.username,
              profileImage: M.profileImage,
              density: K,
              avatarDecoration: o,
            })),
            (L[44] = K),
            (L[45] = M.profileImage),
            (L[46] = M.username),
            (L[47] = M.walletAddress),
            (L[48] = o),
            (L[49] = N))
          : (N = L[49]);
        let d = M.walletAddress,
          u = M.username,
          T = M.profileImage,
          U = y.B[K];
        L[50] !== M
          ? ((t = (0, A.f)(M)), (L[50] = M), (L[51] = t))
          : (t = L[51]);
        let R = "terminal" === K ? 16 : 20;
        (L[52] !== K || L[53] !== M.walletAddress || L[54] !== R
          ? ((r = (0, a.jsx)(g.f, {
              address: M.walletAddress,
              density: K,
              size: R,
              testId: "leaderboard-squad-badge",
            })),
            (L[52] = K),
            (L[53] = M.walletAddress),
            (L[54] = R),
            (L[55] = r))
          : (r = L[55]),
          L[56] !== K ||
          L[57] !== M.profileImage ||
          L[58] !== M.username ||
          L[59] !== M.walletAddress ||
          L[60] !== M.xUsername ||
          L[61] !== U ||
          L[62] !== t ||
          L[63] !== r
            ? ((k = (0, a.jsx)(h.S, {
                address: d,
                username: u,
                profileImage: T,
                size: U,
                density: K,
                showAvatar: !1,
                link: !1,
                verified: t,
                xUsername: M.xUsername,
                trailing: r,
                nameClassName: "group-hover:underline",
                className: "relative z-10",
              })),
              (L[56] = K),
              (L[57] = M.profileImage),
              (L[58] = M.username),
              (L[59] = M.walletAddress),
              (L[60] = M.xUsername),
              (L[61] = U),
              (L[62] = t),
              (L[63] = r),
              (L[64] = k))
            : (k = L[64]),
          (I = l),
          (C = null == s ? "—" : (0, p.u)(s)),
          (L[10] = K),
          (L[11] = q),
          (L[12] = M),
          (L[13] = D),
          (L[14] = W),
          (L[15] = H),
          (L[16] = z),
          (L[17] = V?.resolved_avatar_decoration),
          (L[18] = B),
          (L[19] = x),
          (L[20] = v),
          (L[21] = b),
          (L[22] = j),
          (L[23] = N),
          (L[24] = k),
          (L[25] = I),
          (L[26] = C),
          (L[27] = E),
          (L[28] = F),
          (L[29] = P),
          (L[30] = S));
      } else
        ((x = L[19]),
          (v = L[20]),
          (b = L[21]),
          (j = L[22]),
          (N = L[23]),
          (k = L[24]),
          (I = L[25]),
          (C = L[26]),
          (E = L[27]),
          (F = L[28]),
          (P = L[29]),
          (S = L[30]));
      return (
        L[65] !== I || L[66] !== C
          ? ((T = (0, a.jsx)("span", { className: I, children: C })),
            (L[65] = I),
            (L[66] = C),
            (L[67] = T))
          : (T = L[67]),
        L[68] !== x ||
        L[69] !== v ||
        L[70] !== b ||
        L[71] !== j ||
        L[72] !== N ||
        L[73] !== k ||
        L[74] !== T ||
        L[75] !== E ||
        L[76] !== F ||
        L[77] !== P ||
        L[78] !== S
          ? ((U = (0, a.jsx)(x, {
              as: E,
              density: F,
              rank: P,
              insetClassName: S,
              "data-testid": v,
              cover: b,
              action: j,
              leading: N,
              title: k,
              trailing: T,
            })),
            (L[68] = x),
            (L[69] = v),
            (L[70] = b),
            (L[71] = j),
            (L[72] = N),
            (L[73] = k),
            (L[74] = T),
            (L[75] = E),
            (L[76] = F),
            (L[77] = P),
            (L[78] = S),
            (L[79] = U))
          : (U = L[79]),
        U
      );
    },
    S = (e) => {
      let r,
        s,
        l = (0, t.c)(6),
        { rows: i, density: n, insetClassName: o } = e,
        d = void 0 === i ? 6 : i;
      return (
        l[0] !== d
          ? ((r = Array.from({ length: d })), (l[0] = d), (l[1] = r))
          : (r = l[1]),
        l[2] !== n || l[3] !== o || l[4] !== r
          ? ((s = (0, a.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": "leaderboard-skeleton",
              className: "flex flex-col",
              children: r.map((e, t) =>
                (0, a.jsx)(
                  w.p,
                  { density: n, leading: "circle", insetClassName: o },
                  t,
                ),
              ),
            })),
            (l[2] = n),
            (l[3] = o),
            (l[4] = r),
            (l[5] = s))
          : (s = l[5]),
        s
      );
    };
  e.s([
    "f",
    0,
    function (e) {
      let r,
        s,
        l,
        i,
        n,
        c,
        f,
        p,
        h = (0, t.c)(32),
        {
          enabled: g,
          viewerAddress: w,
          viewerFollowing: y,
          refetchIntervalMs: _,
          variant: A,
          pageSize: T,
          filterBarLeading: U,
        } = e,
        { t: L } = (0, d.f)(),
        { density: M, insetClassName: z, filterBarClassName: R } = (0, m.n)(),
        B = "profile" === (void 0 === A ? "home" : A),
        [K, D] = (0, b.f)(N.b.leaderboardPeriod, E, "weekly"),
        [q, O] = (0, b.f)(N.b.leaderboardSort, F, "combined");
      h[0] !== g || h[1] !== K || h[2] !== _ || h[3] !== q
        ? ((r = {
            period: K,
            sort: q,
            limit: 100,
            enabled: g,
            refetchIntervalMs: _,
          }),
          (h[0] = g),
          (h[1] = K),
          (h[2] = _),
          (h[3] = q),
          (h[4] = r))
        : (r = h[4]);
      let V = (0, j.f)(r),
        Q = V.data?.entries ?? [],
        W = T ?? (B ? 50 : 20),
        [H, $] = (0, o.useState)(W),
        G = Q.slice(0, H),
        J = H < Q.length,
        Z = V.isPending || V.isPlaceholderData;
      if (!g) return null;
      (h[5] !== R
        ? ((s = (0, k.c)(R, "justify-between")), (h[5] = R), (h[6] = s))
        : (s = h[6]),
        h[7] !== O || h[8] !== q
          ? ((l = (0, a.jsx)(m.E, {
              labelKey: "web.leaderboard.ranking_metric",
              value: q,
              options: C,
              onSelect: O,
            })),
            (h[7] = O),
            (h[8] = q),
            (h[9] = l))
          : (l = h[9]),
        h[10] !== K || h[11] !== D
          ? ((i = (0, a.jsx)(m.E, {
              labelKey: "web.leaderboard.time_window",
              value: K,
              options: I,
              onSelect: D,
            })),
            (h[10] = K),
            (h[11] = D),
            (h[12] = i))
          : (i = h[12]),
        h[13] !== l || h[14] !== i
          ? ((n = (0, a.jsxs)("div", {
              "data-testid": "board-filter-controls",
              className: "flex min-w-0 shrink-0 items-center gap-2",
              children: [l, i],
            })),
            (h[13] = l),
            (h[14] = i),
            (h[15] = n))
          : (n = h[15]),
        h[16] !== U || h[17] !== s || h[18] !== n
          ? ((c = (0, a.jsxs)("div", {
              "data-testid": "board-filter-bar",
              className: s,
              children: [U, n],
            })),
            (h[16] = U),
            (h[17] = s),
            (h[18] = n),
            (h[19] = c))
          : (c = h[19]),
        h[20] !== M || h[21] !== z || h[22] !== Z || h[23] !== B || h[24] !== H
          ? ((f = Z
              ? (0, a.jsx)(S, {
                  rows: Math.min(H, B ? 10 : 20),
                  density: M,
                  insetClassName: z,
                })
              : null),
            (h[20] = M),
            (h[21] = z),
            (h[22] = Z),
            (h[23] = B),
            (h[24] = H),
            (h[25] = f))
          : (f = h[25]));
      let X =
          V.isError && 0 === Q.length
            ? (0, a.jsx)(v.f, {
                density: M,
                className: z,
                onRetry: () => void V.refetch(),
                children: L("web.leaderboard.error_board"),
              })
            : null,
        Y =
          Z || V.isError || 0 !== Q.length
            ? null
            : (0, a.jsx)(x.L, {
                density: M,
                className: z,
                children: L("web.leaderboard.empty_board"),
              }),
        ee = Z
          ? null
          : (0, a.jsxs)(a.Fragment, {
              children: [
                (0, a.jsx)("ol", {
                  className: "flex flex-col",
                  "aria-label": L("web.leaderboard.ranked_traders"),
                  children: G.map((e) =>
                    (0, a.jsx)(
                      P,
                      {
                        entry: e,
                        sort: q,
                        viewerAddress: w,
                        viewerFollowing: y,
                        density: M,
                        insetClassName: z,
                      },
                      e.walletAddress,
                    ),
                  ),
                }),
                J
                  ? (0, a.jsx)(u.f, {
                      hasNextPage: !0,
                      isFetchingNextPage: !1,
                      onFetchNextPage: () => $((e) => e + W),
                      label: L("web.feed.load_n_more", {
                        count: Math.min(W, Q.length - H),
                      }),
                    })
                  : null,
              ],
            });
      return (
        h[26] !== ee || h[27] !== c || h[28] !== f || h[29] !== X || h[30] !== Y
          ? ((p = (0, a.jsxs)(a.Fragment, { children: [c, f, X, Y, ee] })),
            (h[26] = ee),
            (h[27] = c),
            (h[28] = f),
            (h[29] = X),
            (h[30] = Y),
            (h[31] = p))
          : (p = h[31]),
        p
      );
    },
  ]);
};
