// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var a = e.i(732486),
    t = e.i(445242),
    r = e.i(322315),
    s = e.i(254010),
    l = e.i(365089),
    i = e.i(782067),
    n = e.i(352386);
  e.i(12692);
  var o = e.i(398902),
    d = e.i(42413),
    u = e.i(229937),
    c = e.i(538661),
    m = e.i(591867),
    f = e.i(409954),
    p = e.i(845167),
    h = e.i(693124),
    g = e.i(606178),
    x = e.i(787773),
    v = e.i(967694),
    w = e.i(133809),
    y = e.i(403352),
    b = e.i(634661),
    j = e.i(80559),
    N = e.i(616217),
    _ = e.i(493270);
  e.i(267146);
  var A = e.i(540805),
    k = e.i(762316),
    I = e.i(599432),
    C = e.i(338319);
  let E = [
      { value: "all", labelKey: "common.all" },
      { value: "1d", labelKey: "web.leaderboard.period_1d" },
      { value: "1w", labelKey: "web.leaderboard.period_1w" },
      { value: "1m", labelKey: "web.leaderboard.period_1m" },
    ],
    F = E.map((e) => e.value);
  function P(e) {
    let n,
      d,
      m,
      p,
      g,
      x,
      v,
      j,
      N,
      _,
      k,
      E,
      F,
      P,
      S,
      T,
      U,
      L = (0, t.c)(65),
      {
        entry: M,
        density: z,
        insetClassName: R,
        viewerAddress: B,
        viewerFollowing: K,
      } = e,
      { t: D } = (0, o.f)(),
      q = M.walletAddress ?? M.wallets[0] ?? "";
    L[0] !== M.username || L[1] !== q
      ? ((n = M.username || (0, l.d)(q)),
        (L[0] = M.username),
        (L[1] = q),
        (L[2] = n))
      : (n = L[2]);
    let O = n,
      V = null === M.userId,
      Q = (0, s.k)(r.D.WEB_AVATAR_DECORATIONS) && !V && "" !== q;
    L[3] !== Q || L[4] !== q
      ? ((d = { address: q, enabled: Q }), (L[3] = Q), (L[4] = q), (L[5] = d))
      : (d = L[5]);
    let { data: W } = (0, i.T)(d),
      H = !!B;
    L[6] !== B ? ((m = B?.toLowerCase()), (L[6] = B), (L[7] = m)) : (m = L[7]);
    let $ = m;
    L[8] !== M.walletAddress || L[9] !== M.wallets || L[10] !== $
      ? ((p =
          void 0 !== $ &&
          [M.walletAddress, ...M.wallets].some((e) => e?.toLowerCase() === $)),
        (L[8] = M.walletAddress),
        (L[9] = M.wallets),
        (L[10] = $),
        (L[11] = p))
      : (p = L[11]);
    let G = p,
      J = !V && !G && "" !== q;
    L[12] !== H || L[13] !== K || L[14] !== q
      ? ((g = !!H && (K?.isFollowing(q) ?? void 0)),
        (L[12] = H),
        (L[13] = K),
        (L[14] = q),
        (L[15] = g))
      : (g = L[15]);
    let Z = g,
      X = M.rank;
    (L[16] !== O || L[17] !== V || L[18] !== q
      ? ((x = V
          ? null
          : (0, a.jsx)(f.o, {
              profileId: q,
              "aria-label": O,
              "data-row-cover": "",
              className: y.a,
            })),
        (L[16] = O),
        (L[17] = V),
        (L[18] = q),
        (L[19] = x))
      : (x = L[19]),
      L[20] !== O || L[21] !== Z || L[22] !== H || L[23] !== J || L[24] !== q
        ? ((v = J
            ? (0, a.jsx)(u.f, {
                userAddress: q,
                displayName: O,
                isLoggedIn: H,
                initialIsFollowing: Z,
                variant: "icon",
                size: "md",
                rounded: "md",
                idle: "ghost",
                className: y.c,
              })
            : void 0),
          (L[20] = O),
          (L[21] = Z),
          (L[22] = H),
          (L[23] = J),
          (L[24] = q),
          (L[25] = v))
        : (v = L[25]));
    let Y = W?.resolved_avatar_decoration;
    L[26] !== z ||
    L[27] !== M.profileImageUrl ||
    L[28] !== M.username ||
    L[29] !== Y ||
    L[30] !== q
      ? ((j = (0, a.jsx)(c.c, {
          address: q,
          username: M.username,
          profileImage: M.profileImageUrl,
          density: z,
          avatarDecoration: Y,
        })),
        (L[26] = z),
        (L[27] = M.profileImageUrl),
        (L[28] = M.username),
        (L[29] = Y),
        (L[30] = q),
        (L[31] = j))
      : (j = L[31]);
    let ee = q || null,
      ea = M.username,
      et = M.profileImageUrl,
      er = y.B[z],
      es = !V;
    L[32] !== M ? ((N = (0, I.f)(M)), (L[32] = M), (L[33] = N)) : (N = L[33]);
    let el = V ? void 0 : "group-hover:underline";
    return (
      L[34] !== z ||
      L[35] !== M.profileImageUrl ||
      L[36] !== M.username ||
      L[37] !== ee ||
      L[38] !== er ||
      L[39] !== es ||
      L[40] !== N ||
      L[41] !== el
        ? ((_ = (0, a.jsx)(h.S, {
            address: ee,
            username: ea,
            profileImage: et,
            size: er,
            density: z,
            showAvatar: !1,
            link: !1,
            hoverCard: es,
            verified: N,
            nameClassName: el,
            className: "relative z-10",
          })),
          (L[34] = z),
          (L[35] = M.profileImageUrl),
          (L[36] = M.username),
          (L[37] = ee),
          (L[38] = er),
          (L[39] = es),
          (L[40] = N),
          (L[41] = el),
          (L[42] = _))
        : (_ = L[42]),
      L[43] !== M.totalPaidUsdc
        ? ((k = (0, A.w)(M.totalPaidUsdc)),
          (L[43] = M.totalPaidUsdc),
          (L[44] = k))
        : (k = L[44]),
      L[45] !== k
        ? ((E = (0, a.jsx)("span", {
            className: "shrink-0 text-text-primary",
            children: k,
          })),
          (L[45] = k),
          (L[46] = E))
        : (E = L[46]),
      L[47] === Symbol.for("react.memo_cache_sentinel")
        ? ((F = (0, C.c)(b.o, "min-w-0 shrink truncate")), (L[47] = F))
        : (F = L[47]),
      L[48] !== M.payoutCount || L[49] !== D
        ? ((P = D("kolscan.top_charts.payouts_row_count", {
            count: M.payoutCount,
          })),
          (L[48] = M.payoutCount),
          (L[49] = D),
          (L[50] = P))
        : (P = L[50]),
      L[51] !== P
        ? ((S = (0, a.jsx)("span", { className: F, children: P })),
          (L[51] = P),
          (L[52] = S))
        : (S = L[52]),
      L[53] !== E || L[54] !== S
        ? ((T = (0, a.jsxs)(a.Fragment, { children: [E, S] })),
          (L[53] = E),
          (L[54] = S),
          (L[55] = T))
        : (T = L[55]),
      L[56] !== z ||
      L[57] !== M.rank ||
      L[58] !== R ||
      L[59] !== j ||
      L[60] !== _ ||
      L[61] !== T ||
      L[62] !== x ||
      L[63] !== v
        ? ((U = (0, a.jsx)(w.j, {
            as: "li",
            density: z,
            rank: X,
            insetClassName: R,
            "data-testid": "payout-earner-row",
            cover: x,
            action: v,
            leading: j,
            title: _,
            trailingClassName: "min-w-0",
            trailing: T,
          })),
          (L[56] = z),
          (L[57] = M.rank),
          (L[58] = R),
          (L[59] = j),
          (L[60] = _),
          (L[61] = T),
          (L[62] = x),
          (L[63] = v),
          (L[64] = U))
        : (U = L[64]),
      U
    );
  }
  let S = (e) => {
    let r,
      s,
      l = (0, t.c)(6),
      { rows: i, density: n, insetClassName: o } = e,
      d = void 0 === i ? 8 : i;
    return (
      l[0] !== d
        ? ((r = Array.from({ length: d })), (l[0] = d), (l[1] = r))
        : (r = l[1]),
      l[2] !== n || l[3] !== o || l[4] !== r
        ? ((s = (0, a.jsx)("div", {
            "aria-hidden": !0,
            "data-testid": "payout-earners-skeleton",
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
        u,
        f,
        h,
        w,
        I,
        T,
        U,
        L,
        M,
        z,
        R,
        B,
        K,
        D = (0, t.c)(73),
        {
          viewerAddress: q,
          viewerFollowing: O,
          refetchIntervalMs: V,
          filterBarLeading: Q,
        } = e,
        { t: W } = (0, o.f)(),
        { density: H, insetClassName: $, filterBarClassName: G } = (0, c.n)(),
        [J, Z] = (0, N.f)(k.b.leaderboardEarnersPeriod, F, "all"),
        X = !!q,
        [Y, ee] = (0, n.useState)(!1);
      D[0] !== X || D[1] !== J || D[2] !== V
        ? ((r = {
            period: J,
            isLoggedIn: X,
            enabled: !0,
            refetchIntervalMs: V,
          }),
          (D[0] = X),
          (D[1] = J),
          (D[2] = V),
          (D[3] = r))
        : (r = D[3]);
      let ea = (0, j.a)(r);
      D[4] !== X || D[5] !== q
        ? ((s = { walletAddress: q, enabled: X }),
          (D[4] = X),
          (D[5] = q),
          (D[6] = s))
        : (s = D[6]);
      let et = (0, j.U)(s);
      D[7] !== ea.data?.entries
        ? ((l = ea.data?.entries ?? []), (D[7] = ea.data?.entries), (D[8] = l))
        : (l = D[8]);
      let er = l,
        es = ea.isPending,
        el = ea.error instanceof _.j && 401 === ea.error.status;
      return (
        D[9] !== W
          ? ((i = W("kolscan.top_charts.payouts_info")),
            (D[9] = W),
            (D[10] = i))
          : (i = D[10]),
        D[11] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = () => ee(!0)), (D[11] = u))
          : (u = D[11]),
        D[12] !== i
          ? ((f = (0, a.jsx)(m.f, { message: i, onPress: u })),
            (D[12] = i),
            (D[13] = f))
          : (f = D[13]),
        D[14] !== G
          ? ((h = (0, C.c)(G, "justify-between")), (D[14] = G), (D[15] = h))
          : (h = D[15]),
        D[16] !== J || D[17] !== Z
          ? ((w = (0, a.jsx)("div", {
              "data-testid": "board-filter-controls",
              className: "flex min-w-0 shrink-0 items-center gap-2",
              children: (0, a.jsx)(c.E, {
                labelKey: "web.leaderboard.payout_window",
                value: J,
                options: E,
                onSelect: Z,
              }),
            })),
            (D[16] = J),
            (D[17] = Z),
            (D[18] = w))
          : (w = D[18]),
        D[19] !== Q || D[20] !== h || D[21] !== w
          ? ((I = (0, a.jsxs)("div", {
              "data-testid": "board-filter-bar",
              className: h,
              children: [Q, w],
            })),
            (D[19] = Q),
            (D[20] = h),
            (D[21] = w),
            (D[22] = I))
          : (I = D[22]),
        D[23] !== H || D[24] !== $ || D[25] !== W || D[26] !== q || D[27] !== et
          ? ((T = q
              ? (0, a.jsxs)("div", {
                  "data-testid": "payout-earners-you-card",
                  "data-density": H,
                  className: (0, C.c)(b.t, b.F[H], $ ?? g.U[H]),
                  children: [
                    (0, a.jsx)("span", {
                      className: b.s[H],
                      children: W("kolscan.top_charts.payouts_earnings"),
                    }),
                    (0, a.jsx)("span", {
                      className: (0, C.c)(y.W[H], "text-text-primary"),
                      children: null == et.data ? "—" : (0, A.w)(et.data),
                    }),
                  ],
                })
              : null),
            (D[23] = H),
            (D[24] = $),
            (D[25] = W),
            (D[26] = q),
            (D[27] = et),
            (D[28] = T))
          : (T = D[28]),
        D[29] !== H || D[30] !== $ || D[31] !== es
          ? ((U = es ? (0, a.jsx)(S, { density: H, insetClassName: $ }) : null),
            (D[29] = H),
            (D[30] = $),
            (D[31] = es),
            (D[32] = U))
          : (U = D[32]),
        D[33] !== H ||
        D[34] !== er.length ||
        D[35] !== $ ||
        D[36] !== el ||
        D[37] !== W
          ? ((L =
              el && 0 === er.length
                ? (0, a.jsx)(x.L, {
                    density: H,
                    className: $,
                    children: W("web.leaderboard.signed_out_earners"),
                  })
                : null),
            (D[33] = H),
            (D[34] = er.length),
            (D[35] = $),
            (D[36] = el),
            (D[37] = W),
            (D[38] = L))
          : (L = D[38]),
        D[39] !== ea ||
        D[40] !== H ||
        D[41] !== er.length ||
        D[42] !== $ ||
        D[43] !== el ||
        D[44] !== W
          ? ((M =
              ea.isError && !el && 0 === er.length
                ? (0, a.jsx)(v.f, {
                    density: H,
                    className: $,
                    onRetry: () => void ea.refetch(),
                    children: W("kolscan.top_charts.payouts_error"),
                  })
                : null),
            (D[39] = ea),
            (D[40] = H),
            (D[41] = er.length),
            (D[42] = $),
            (D[43] = el),
            (D[44] = W),
            (D[45] = M))
          : (M = D[45]),
        D[46] !== ea.isError ||
        D[47] !== H ||
        D[48] !== er.length ||
        D[49] !== $ ||
        D[50] !== es ||
        D[51] !== W
          ? ((z =
              es || ea.isError || 0 !== er.length
                ? null
                : (0, a.jsx)(x.L, {
                    density: H,
                    className: $,
                    title: W("kolscan.top_charts.payouts_empty_title"),
                    children: W("kolscan.top_charts.payouts_empty_subtitle"),
                  })),
            (D[46] = ea.isError),
            (D[47] = H),
            (D[48] = er.length),
            (D[49] = $),
            (D[50] = es),
            (D[51] = W),
            (D[52] = z))
          : (z = D[52]),
        D[53] !== ea ||
        D[54] !== H ||
        D[55] !== er ||
        D[56] !== $ ||
        D[57] !== W ||
        D[58] !== q ||
        D[59] !== O
          ? ((R =
              er.length > 0
                ? (0, a.jsxs)(a.Fragment, {
                    children: [
                      (0, a.jsx)("ol", {
                        className: "flex flex-col",
                        "aria-label": W("web.leaderboard.top_rewards"),
                        children: er.map((e) =>
                          (0, a.jsx)(
                            P,
                            {
                              entry: e,
                              density: H,
                              insetClassName: $,
                              viewerAddress: q,
                              viewerFollowing: O,
                            },
                            (0, _.z)(e),
                          ),
                        ),
                      }),
                      ea.hasNextPage
                        ? (0, a.jsx)(d.f, {
                            hasNextPage: !0,
                            isFetchingNextPage: ea.isFetchingNextPage,
                            onFetchNextPage: () => void ea.fetchNextPage(),
                            label: W("web.feed.load_more"),
                          })
                        : null,
                    ],
                  })
                : null),
            (D[53] = ea),
            (D[54] = H),
            (D[55] = er),
            (D[56] = $),
            (D[57] = W),
            (D[58] = q),
            (D[59] = O),
            (D[60] = R))
          : (R = D[60]),
        D[61] !== Y
          ? ((B = (0, a.jsx)(p.f, { isOpen: Y, onOpenChange: ee })),
            (D[61] = Y),
            (D[62] = B))
          : (B = D[62]),
        D[63] !== T ||
        D[64] !== U ||
        D[65] !== L ||
        D[66] !== M ||
        D[67] !== z ||
        D[68] !== R ||
        D[69] !== B ||
        D[70] !== f ||
        D[71] !== I
          ? ((K = (0, a.jsxs)("div", {
              className: "flex flex-col",
              "data-testid": "payout-earners-board",
              children: [f, I, T, U, L, M, z, R, B],
            })),
            (D[63] = T),
            (D[64] = U),
            (D[65] = L),
            (D[66] = M),
            (D[67] = z),
            (D[68] = R),
            (D[69] = B),
            (D[70] = f),
            (D[71] = I),
            (D[72] = K))
          : (K = D[72]),
        K
      );
    },
  ]);
};
