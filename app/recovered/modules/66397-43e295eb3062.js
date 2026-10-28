// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(322315),
    l = e.i(254010),
    s = e.i(365089),
    i = e.i(782067),
    n = e.i(352386);
  e.i(12692);
  var o = e.i(398902),
    d = e.i(42413),
    u = e.i(229937),
    c = e.i(538661),
    f = e.i(591867),
    m = e.i(409954),
    p = e.i(845167),
    h = e.i(693124),
    g = e.i(606178),
    b = e.i(787773),
    w = e.i(967694),
    y = e.i(133809),
    v = e.i(403352),
    x = e.i(634661),
    j = e.i(80559),
    _ = e.i(616217),
    A = e.i(493270);
  e.i(267146);
  var k = e.i(540805),
    N = e.i(762316),
    I = e.i(599432),
    C = e.i(338319);
  let P = [
      { value: "all", labelKey: "common.all" },
      { value: "1d", labelKey: "web.leaderboard.period_1d" },
      { value: "1w", labelKey: "web.leaderboard.period_1w" },
      { value: "1m", labelKey: "web.leaderboard.period_1m" },
    ],
    S = P.map((e) => e.value);
  function E(e) {
    let n,
      d,
      f,
      p,
      g,
      b,
      w,
      j,
      _,
      A,
      N,
      P,
      S,
      E,
      F,
      U,
      T,
      z = (0, r.c)(65),
      {
        entry: K,
        density: M,
        insetClassName: R,
        viewerAddress: L,
        viewerFollowing: B,
      } = e,
      { t: q } = (0, o.f)(),
      O = K.walletAddress ?? K.wallets[0] ?? "";
    z[0] !== K.username || z[1] !== O
      ? ((n = K.username || (0, s.d)(O)),
        (z[0] = K.username),
        (z[1] = O),
        (z[2] = n))
      : (n = z[2]);
    let V = n,
      D = null === K.userId,
      W = (0, l.k)(a.D.WEB_AVATAR_DECORATIONS) && !D && "" !== O;
    z[3] !== W || z[4] !== O
      ? ((d = { address: O, enabled: W }), (z[3] = W), (z[4] = O), (z[5] = d))
      : (d = z[5]);
    let { data: Q } = (0, i.T)(d),
      $ = !!L;
    z[6] !== L ? ((f = L?.toLowerCase()), (z[6] = L), (z[7] = f)) : (f = z[7]);
    let H = f;
    z[8] !== K.walletAddress || z[9] !== K.wallets || z[10] !== H
      ? ((p =
          void 0 !== H &&
          [K.walletAddress, ...K.wallets].some((e) => e?.toLowerCase() === H)),
        (z[8] = K.walletAddress),
        (z[9] = K.wallets),
        (z[10] = H),
        (z[11] = p))
      : (p = z[11]);
    let J = p,
      G = !D && !J && "" !== O;
    z[12] !== $ || z[13] !== B || z[14] !== O
      ? ((g = !!$ && (B?.isFollowing(O) ?? void 0)),
        (z[12] = $),
        (z[13] = B),
        (z[14] = O),
        (z[15] = g))
      : (g = z[15]);
    let X = g,
      Z = K.rank;
    (z[16] !== V || z[17] !== D || z[18] !== O
      ? ((b = D
          ? null
          : (0, t.jsx)(m.o, {
              profileId: O,
              "aria-label": V,
              "data-row-cover": "",
              className: v.a,
            })),
        (z[16] = V),
        (z[17] = D),
        (z[18] = O),
        (z[19] = b))
      : (b = z[19]),
      z[20] !== V || z[21] !== X || z[22] !== $ || z[23] !== G || z[24] !== O
        ? ((w = G
            ? (0, t.jsx)(u.f, {
                userAddress: O,
                displayName: V,
                isLoggedIn: $,
                initialIsFollowing: X,
                variant: "icon",
                size: "md",
                rounded: "md",
                idle: "ghost",
                className: v.c,
              })
            : void 0),
          (z[20] = V),
          (z[21] = X),
          (z[22] = $),
          (z[23] = G),
          (z[24] = O),
          (z[25] = w))
        : (w = z[25]));
    let Y = Q?.resolved_avatar_decoration;
    z[26] !== M ||
    z[27] !== K.profileImageUrl ||
    z[28] !== K.username ||
    z[29] !== Y ||
    z[30] !== O
      ? ((j = (0, t.jsx)(c.c, {
          address: O,
          username: K.username,
          profileImage: K.profileImageUrl,
          density: M,
          avatarDecoration: Y,
        })),
        (z[26] = M),
        (z[27] = K.profileImageUrl),
        (z[28] = K.username),
        (z[29] = Y),
        (z[30] = O),
        (z[31] = j))
      : (j = z[31]);
    let ee = O || null,
      et = K.username,
      er = K.profileImageUrl,
      ea = v.B[M],
      el = !D;
    z[32] !== K ? ((_ = (0, I.f)(K)), (z[32] = K), (z[33] = _)) : (_ = z[33]);
    let es = D ? void 0 : "group-hover:underline";
    return (
      z[34] !== M ||
      z[35] !== K.profileImageUrl ||
      z[36] !== K.username ||
      z[37] !== ee ||
      z[38] !== ea ||
      z[39] !== el ||
      z[40] !== _ ||
      z[41] !== es
        ? ((A = (0, t.jsx)(h.S, {
            address: ee,
            username: et,
            profileImage: er,
            size: ea,
            density: M,
            showAvatar: !1,
            link: !1,
            hoverCard: el,
            verified: _,
            nameClassName: es,
            className: "relative z-10",
          })),
          (z[34] = M),
          (z[35] = K.profileImageUrl),
          (z[36] = K.username),
          (z[37] = ee),
          (z[38] = ea),
          (z[39] = el),
          (z[40] = _),
          (z[41] = es),
          (z[42] = A))
        : (A = z[42]),
      z[43] !== K.totalPaidUsdc
        ? ((N = (0, k.w)(K.totalPaidUsdc)),
          (z[43] = K.totalPaidUsdc),
          (z[44] = N))
        : (N = z[44]),
      z[45] !== N
        ? ((P = (0, t.jsx)("span", {
            className: "shrink-0 text-text-primary",
            children: N,
          })),
          (z[45] = N),
          (z[46] = P))
        : (P = z[46]),
      z[47] === Symbol.for("react.memo_cache_sentinel")
        ? ((S = (0, C.c)(x.o, "min-w-0 shrink truncate")), (z[47] = S))
        : (S = z[47]),
      z[48] !== K.payoutCount || z[49] !== q
        ? ((E = q("kolscan.top_charts.payouts_row_count", {
            count: K.payoutCount,
          })),
          (z[48] = K.payoutCount),
          (z[49] = q),
          (z[50] = E))
        : (E = z[50]),
      z[51] !== E
        ? ((F = (0, t.jsx)("span", { className: S, children: E })),
          (z[51] = E),
          (z[52] = F))
        : (F = z[52]),
      z[53] !== P || z[54] !== F
        ? ((U = (0, t.jsxs)(t.Fragment, { children: [P, F] })),
          (z[53] = P),
          (z[54] = F),
          (z[55] = U))
        : (U = z[55]),
      z[56] !== M ||
      z[57] !== K.rank ||
      z[58] !== R ||
      z[59] !== j ||
      z[60] !== A ||
      z[61] !== U ||
      z[62] !== b ||
      z[63] !== w
        ? ((T = (0, t.jsx)(y.j, {
            as: "li",
            density: M,
            rank: Z,
            insetClassName: R,
            "data-testid": "payout-earner-row",
            cover: b,
            action: w,
            leading: j,
            title: A,
            trailingClassName: "min-w-0",
            trailing: U,
          })),
          (z[56] = M),
          (z[57] = K.rank),
          (z[58] = R),
          (z[59] = j),
          (z[60] = A),
          (z[61] = U),
          (z[62] = b),
          (z[63] = w),
          (z[64] = T))
        : (T = z[64]),
      T
    );
  }
  let F = (e) => {
    let a,
      l,
      s = (0, r.c)(6),
      { rows: i, density: n, insetClassName: o } = e,
      d = void 0 === i ? 8 : i;
    return (
      s[0] !== d
        ? ((a = Array.from({ length: d })), (s[0] = d), (s[1] = a))
        : (a = s[1]),
      s[2] !== n || s[3] !== o || s[4] !== a
        ? ((l = (0, t.jsx)("div", {
            "aria-hidden": !0,
            "data-testid": "payout-earners-skeleton",
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
        u,
        m,
        h,
        y,
        I,
        U,
        T,
        z,
        K,
        M,
        R,
        L,
        B,
        q = (0, r.c)(73),
        {
          viewerAddress: O,
          viewerFollowing: V,
          refetchIntervalMs: D,
          filterBarLeading: W,
        } = e,
        { t: Q } = (0, o.f)(),
        { density: $, insetClassName: H, filterBarClassName: J } = (0, c.n)(),
        [G, X] = (0, _.f)(N.b.leaderboardEarnersPeriod, S, "all"),
        Z = !!O,
        [Y, ee] = (0, n.useState)(!1);
      q[0] !== Z || q[1] !== G || q[2] !== D
        ? ((a = {
            period: G,
            isLoggedIn: Z,
            enabled: !0,
            refetchIntervalMs: D,
          }),
          (q[0] = Z),
          (q[1] = G),
          (q[2] = D),
          (q[3] = a))
        : (a = q[3]);
      let et = (0, j.a)(a);
      q[4] !== Z || q[5] !== O
        ? ((l = { walletAddress: O, enabled: Z }),
          (q[4] = Z),
          (q[5] = O),
          (q[6] = l))
        : (l = q[6]);
      let er = (0, j.U)(l);
      q[7] !== et.data?.entries
        ? ((s = et.data?.entries ?? []), (q[7] = et.data?.entries), (q[8] = s))
        : (s = q[8]);
      let ea = s,
        el = et.isPending,
        es = et.error instanceof A.j && 401 === et.error.status;
      return (
        q[9] !== Q
          ? ((i = Q("kolscan.top_charts.payouts_info")),
            (q[9] = Q),
            (q[10] = i))
          : (i = q[10]),
        q[11] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = () => ee(!0)), (q[11] = u))
          : (u = q[11]),
        q[12] !== i
          ? ((m = (0, t.jsx)(f.f, { message: i, onPress: u })),
            (q[12] = i),
            (q[13] = m))
          : (m = q[13]),
        q[14] !== J
          ? ((h = (0, C.c)(J, "justify-between")), (q[14] = J), (q[15] = h))
          : (h = q[15]),
        q[16] !== G || q[17] !== X
          ? ((y = (0, t.jsx)("div", {
              "data-testid": "board-filter-controls",
              className: "flex min-w-0 shrink-0 items-center gap-2",
              children: (0, t.jsx)(c.E, {
                labelKey: "web.leaderboard.payout_window",
                value: G,
                options: P,
                onSelect: X,
              }),
            })),
            (q[16] = G),
            (q[17] = X),
            (q[18] = y))
          : (y = q[18]),
        q[19] !== W || q[20] !== h || q[21] !== y
          ? ((I = (0, t.jsxs)("div", {
              "data-testid": "board-filter-bar",
              className: h,
              children: [W, y],
            })),
            (q[19] = W),
            (q[20] = h),
            (q[21] = y),
            (q[22] = I))
          : (I = q[22]),
        q[23] !== $ || q[24] !== H || q[25] !== Q || q[26] !== O || q[27] !== er
          ? ((U = O
              ? (0, t.jsxs)("div", {
                  "data-testid": "payout-earners-you-card",
                  "data-density": $,
                  className: (0, C.c)(x.t, x.F[$], H ?? g.U[$]),
                  children: [
                    (0, t.jsx)("span", {
                      className: x.s[$],
                      children: Q("kolscan.top_charts.payouts_earnings"),
                    }),
                    (0, t.jsx)("span", {
                      className: (0, C.c)(v.W[$], "text-text-primary"),
                      children: null == er.data ? "—" : (0, k.w)(er.data),
                    }),
                  ],
                })
              : null),
            (q[23] = $),
            (q[24] = H),
            (q[25] = Q),
            (q[26] = O),
            (q[27] = er),
            (q[28] = U))
          : (U = q[28]),
        q[29] !== $ || q[30] !== H || q[31] !== el
          ? ((T = el ? (0, t.jsx)(F, { density: $, insetClassName: H }) : null),
            (q[29] = $),
            (q[30] = H),
            (q[31] = el),
            (q[32] = T))
          : (T = q[32]),
        q[33] !== $ ||
        q[34] !== ea.length ||
        q[35] !== H ||
        q[36] !== es ||
        q[37] !== Q
          ? ((z =
              es && 0 === ea.length
                ? (0, t.jsx)(b.L, {
                    density: $,
                    className: H,
                    children: Q("web.leaderboard.signed_out_earners"),
                  })
                : null),
            (q[33] = $),
            (q[34] = ea.length),
            (q[35] = H),
            (q[36] = es),
            (q[37] = Q),
            (q[38] = z))
          : (z = q[38]),
        q[39] !== et ||
        q[40] !== $ ||
        q[41] !== ea.length ||
        q[42] !== H ||
        q[43] !== es ||
        q[44] !== Q
          ? ((K =
              et.isError && !es && 0 === ea.length
                ? (0, t.jsx)(w.f, {
                    density: $,
                    className: H,
                    onRetry: () => void et.refetch(),
                    children: Q("kolscan.top_charts.payouts_error"),
                  })
                : null),
            (q[39] = et),
            (q[40] = $),
            (q[41] = ea.length),
            (q[42] = H),
            (q[43] = es),
            (q[44] = Q),
            (q[45] = K))
          : (K = q[45]),
        q[46] !== et.isError ||
        q[47] !== $ ||
        q[48] !== ea.length ||
        q[49] !== H ||
        q[50] !== el ||
        q[51] !== Q
          ? ((M =
              el || et.isError || 0 !== ea.length
                ? null
                : (0, t.jsx)(b.L, {
                    density: $,
                    className: H,
                    title: Q("kolscan.top_charts.payouts_empty_title"),
                    children: Q("kolscan.top_charts.payouts_empty_subtitle"),
                  })),
            (q[46] = et.isError),
            (q[47] = $),
            (q[48] = ea.length),
            (q[49] = H),
            (q[50] = el),
            (q[51] = Q),
            (q[52] = M))
          : (M = q[52]),
        q[53] !== et ||
        q[54] !== $ ||
        q[55] !== ea ||
        q[56] !== H ||
        q[57] !== Q ||
        q[58] !== O ||
        q[59] !== V
          ? ((R =
              ea.length > 0
                ? (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsx)("ol", {
                        className: "flex flex-col",
                        "aria-label": Q("web.leaderboard.top_rewards"),
                        children: ea.map((e) =>
                          (0, t.jsx)(
                            E,
                            {
                              entry: e,
                              density: $,
                              insetClassName: H,
                              viewerAddress: O,
                              viewerFollowing: V,
                            },
                            (0, A.z)(e),
                          ),
                        ),
                      }),
                      et.hasNextPage
                        ? (0, t.jsx)(d.f, {
                            hasNextPage: !0,
                            isFetchingNextPage: et.isFetchingNextPage,
                            onFetchNextPage: () => void et.fetchNextPage(),
                            label: Q("web.feed.load_more"),
                          })
                        : null,
                    ],
                  })
                : null),
            (q[53] = et),
            (q[54] = $),
            (q[55] = ea),
            (q[56] = H),
            (q[57] = Q),
            (q[58] = O),
            (q[59] = V),
            (q[60] = R))
          : (R = q[60]),
        q[61] !== Y
          ? ((L = (0, t.jsx)(p.f, { isOpen: Y, onOpenChange: ee })),
            (q[61] = Y),
            (q[62] = L))
          : (L = q[62]),
        q[63] !== U ||
        q[64] !== T ||
        q[65] !== z ||
        q[66] !== K ||
        q[67] !== M ||
        q[68] !== R ||
        q[69] !== L ||
        q[70] !== m ||
        q[71] !== I
          ? ((B = (0, t.jsxs)("div", {
              className: "flex flex-col",
              "data-testid": "payout-earners-board",
              children: [m, I, U, T, z, K, M, R, L],
            })),
            (q[63] = U),
            (q[64] = T),
            (q[65] = z),
            (q[66] = K),
            (q[67] = M),
            (q[68] = R),
            (q[69] = L),
            (q[70] = m),
            (q[71] = I),
            (q[72] = B))
          : (B = q[72]),
        B
      );
    },
  ]);
};
