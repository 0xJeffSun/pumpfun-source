// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(352386),
    s = e.i(745018),
    n = e.i(292686),
    l = e.i(322315),
    i = e.i(254010),
    c = e.i(786480),
    o = e.i(146695),
    d = e.i(975982),
    u = e.i(179736),
    m = e.i(782067),
    h = e.i(935258),
    f = e.i(458310),
    x = e.i(599077);
  e.i(12692);
  var p = e.i(398902),
    g = e.i(679553),
    b = e.i(157633),
    w = e.i(705313),
    _ = e.i(741084);
  let v = (e) => {
    let a,
      s,
      n = (0, r.c)(3),
      { className: l } = e;
    return (
      n[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)("path", {
            d: "M6 6V5.25C6 3.317 4.433 1.75 2.5 1.75H1.75V2.5C1.75 4.433 3.317 6 5.25 6H6ZM6 6V10.25M9.5 3.25H10.25V4C10.25 5.933 8.683 7.5 6.75 7.5H6V6.75C6 4.817 7.567 3.25 9.5 3.25Z",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          })),
          (n[0] = a))
        : (a = n[0]),
      n[1] !== l
        ? ((s = (0, t.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "12",
            height: "12",
            viewBox: "0 0 12 12",
            fill: "none",
            className: l,
            children: a,
          })),
          (n[1] = l),
          (n[2] = s))
        : (s = n[2]),
      s
    );
  };
  var k = e.i(951425),
    y = e.i(149845),
    j = e.i(522906);
  e.i(12641);
  var N = e.i(34011),
    C = e.i(116830),
    S = e.i(924631);
  e.i(107240);
  var A = e.i(693124),
    E = e.i(529841),
    I = e.i(606178),
    T = e.i(248496),
    q = e.i(634661),
    R = e.i(850175),
    M = e.i(235364),
    L = e.i(666863);
  e.i(267146);
  var P = e.i(540805),
    O = e.i(662093),
    U = e.i(333757),
    D = e.i(21617),
    z = e.i(595673),
    H = e.i(338319),
    B = e.i(569526);
  let K = "comfortable",
    $ = k.s.comfortable,
    F = (0, H.c)(k.w.comfortable, I.U.comfortable),
    W = "absolute inset-0 z-[1] focus-inset",
    V = `${q.o} transition-colors hover:text-text-primary disabled:cursor-default disabled:opacity-40 disabled:hover:text-text-quaternary`,
    Q = "border-b-0",
    G = "flex flex-col gap-2",
    J = { coins: "art", users: "circle", squads: "art" },
    X = (e) => {
      let a,
        s,
        n,
        l = (0, r.c)(8),
        { market: i, index: c, onClick: o } = e;
      return (
        l[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((a = (0, t.jsx)("span", {
              "aria-hidden": !0,
              "data-testid": "search-perp-row-lead",
              className: "w-5 shrink-0",
            })),
            (l[0] = a))
          : (a = l[0]),
        l[1] !== c || l[2] !== i || l[3] !== o
          ? ((s = (0, t.jsx)(j.f, {
              market: i,
              density: K,
              index: c,
              onNavigate: o,
              isListItem: !1,
              wash: !1,
              className: I.U[K],
              leading: a,
            })),
            (l[1] = c),
            (l[2] = i),
            (l[3] = o),
            (l[4] = s))
          : (s = l[4]),
        l[5] !== i.coin || l[6] !== s
          ? ((n = (0, t.jsx)("div", {
              "data-search-row": !0,
              "data-testid": "search-perp-row",
              "data-coin": i.coin,
              children: s,
            })),
            (l[5] = i.coin),
            (l[6] = s),
            (l[7] = n))
          : (n = l[7]),
        n
      );
    },
    Z = (e) => {
      let a,
        s = (0, r.c)(8);
      if ((0, D.x)(e.coin)) {
        let r, a;
        s[0] !== e.coin
          ? ((r = (0, U.K)(e.coin)), (s[0] = e.coin), (s[1] = r))
          : (r = s[1]);
        let n = r;
        return (
          s[2] !== n || s[3] !== e.index || s[4] !== e.onClick
            ? ((a = n
                ? (0, t.jsx)(X, {
                    market: n,
                    index: e.index,
                    onClick: e.onClick,
                  })
                : null),
              (s[2] = n),
              (s[3] = e.index),
              (s[4] = e.onClick),
              (s[5] = a))
            : (a = s[5]),
          a
        );
      }
      return (
        s[6] !== e
          ? ((a = (0, t.jsx)(Y, { ...e })), (s[6] = e), (s[7] = a))
          : (a = s[7]),
        a
      );
    },
    Y = (e) => {
      let a,
        s,
        l,
        i,
        c,
        o,
        d,
        u,
        m,
        h,
        x,
        g,
        b,
        w,
        _,
        j,
        A,
        I,
        T,
        q,
        U,
        D,
        W,
        V,
        Q,
        G = (0, r.c)(70),
        {
          coin: J,
          onClick: X,
          index: Z,
          sourceScreen: Y,
          sourceElement: ee,
          searchTerm: et,
        } = e,
        er = void 0 === Y ? n.Ae.SEARCH : Y,
        ea = void 0 === ee ? n.k9.ACTIVE_SEARCH_COIN_SEARCH_FEED : ee,
        { t: es } = (0, p.f)();
      G[0] !== J
        ? ((a = {
            mint: J.mint,
            chainId: J.chain_id,
            fallbackMarketCap: J.usd_market_cap,
            coin: J,
          }),
          (G[0] = J),
          (G[1] = a))
        : (a = G[1]);
      let en = (0, O.h)(a);
      (G[2] !== J.usd_market_cap
        ? ((s = J.usd_market_cap ? Number(J.usd_market_cap.toFixed(2)) : 0),
          (G[2] = J.usd_market_cap),
          (G[3] = s))
        : (s = G[3]),
        G[4] !== J.rec_id ||
        G[5] !== Z ||
        G[6] !== ea ||
        G[7] !== er ||
        G[8] !== s
          ? ((l = {
              itemPosition: Z,
              marketCap: s,
              sourceScreen: er,
              rec_id: J.rec_id,
              sourceElement: ea,
            }),
            (G[4] = J.rec_id),
            (G[5] = Z),
            (G[6] = ea),
            (G[7] = er),
            (G[8] = s),
            (G[9] = l))
          : (l = G[9]));
      let el = l,
        ei = (0, L.f)(J.mint, el, et, ea),
        { handleCoinClick: ec } = (0, M.f)(),
        { setLastClickImpression: eo } = (0, B.y)(),
        { prefetch: ed, hoverProps: eu } = (0, R.W)(J);
      G[10] !== ea || G[11] !== er
        ? ((i = {
            trackBookmarkToggle: (e, t) => {
              "add" === t &&
                (0, z.Op)({ mint: e, screen: er, sourceElement: ea });
            },
          }),
          (G[10] = ea),
          (G[11] = er),
          (G[12] = i))
        : (i = G[12]);
      let em = i;
      G[13] !== J.symbol
        ? ((c = (0, S.W)(J.symbol)), (G[13] = J.symbol), (G[14] = c))
        : (c = G[14]);
      let eh = c;
      G[15] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (0, H.c)(F, "group gap-2")), (G[15] = o))
        : (o = G[15]);
      let ef = Z + 1;
      G[16] !== J || G[17] !== ef || G[18] !== em
        ? ((d = (0, t.jsx)(y.f, {
            coin: J,
            align: "start",
            position: ef,
            analytics: em,
          })),
          (G[16] = J),
          (G[17] = ef),
          (G[18] = em),
          (G[19] = d))
        : (d = G[19]);
      let ex = `/coin/${J.mint}`;
      (G[20] !== J.mint ||
      G[21] !== ec ||
      G[22] !== el ||
      G[23] !== X ||
      G[24] !== et ||
      G[25] !== eo
        ? ((u = () => {
            (el && (eo(J.mint, el, et), ec(J.mint, el, et)), X());
          }),
          (G[20] = J.mint),
          (G[21] = ec),
          (G[22] = el),
          (G[23] = X),
          (G[24] = et),
          (G[25] = eo),
          (G[26] = u))
        : (u = G[26]),
        G[27] !== J
          ? ((m = (0, t.jsx)(N.CoinAvatar, { coin: J, size: $ })),
            (G[27] = J),
            (G[28] = m))
          : (m = G[28]),
        G[29] !== J
          ? ((h = (0, t.jsx)("span", {
              className: k.x[K],
              children: (0, t.jsx)(C.f, { coin: J, nameClassName: k.n[K] }),
            })),
            (G[29] = J),
            (G[30] = h))
          : (h = G[30]),
        G[31] === Symbol.for("react.memo_cache_sentinel")
          ? ((x = (0, H.c)("flex min-w-0 items-center", k.B[K], k.Y[K])),
            (G[31] = x))
          : (x = G[31]),
        G[32] !== eh
          ? ((g = eh
              ? (0, t.jsxs)("span", {
                  className: "shrink-0",
                  children: ["$", eh],
                })
              : null),
            (G[32] = eh),
            (G[33] = g))
          : (g = G[33]),
        G[34] !== J.mint
          ? ((b = (0, S.e)(J.mint)), (G[34] = J.mint), (G[35] = b))
          : (b = G[35]),
        G[36] !== b
          ? ((w = (0, t.jsx)("span", {
              className: "min-w-0 truncate tabular-nums",
              children: b,
            })),
            (G[36] = b),
            (G[37] = w))
          : (w = G[37]),
        G[38] !== g || G[39] !== w
          ? ((_ = (0, t.jsxs)("span", { className: x, children: [g, w] })),
            (G[38] = g),
            (G[39] = w),
            (G[40] = _))
          : (_ = G[40]),
        G[41] !== h || G[42] !== _
          ? ((j = (0, t.jsxs)("div", {
              className: "flex min-w-0 flex-1 flex-col",
              children: [h, _],
            })),
            (G[41] = h),
            (G[42] = _),
            (G[43] = j))
          : (j = G[43]));
      let ep = en ?? J.usd_market_cap;
      return (
        G[44] !== ep
          ? ((A = (0, P.l)(ep)), (G[44] = ep), (G[45] = A))
          : (A = G[45]),
        G[46] !== A
          ? ((I = (0, t.jsx)("span", {
              "data-testid": "search-coin-row-mcap",
              className: k.e[K],
              children: A,
            })),
            (G[46] = A),
            (G[47] = I))
          : (I = G[47]),
        G[48] === Symbol.for("react.memo_cache_sentinel")
          ? ((T = (0, H.c)(k.N, k.C[K], "gap-1 text-text-quaternary")),
            (q = (0, t.jsx)(v, { className: "size-3 shrink-0" })),
            (G[48] = T),
            (G[49] = q))
          : ((T = G[48]), (q = G[49])),
        G[50] !== J.created_timestamp || G[51] !== es
          ? ((U = J.created_timestamp
              ? (0, t.jsx)(E.f, {
                  timestamp: J.created_timestamp,
                  density: K,
                  suffix: !1,
                })
              : es("web.search.unknown_creation_date")),
            (G[50] = J.created_timestamp),
            (G[51] = es),
            (G[52] = U))
          : (U = G[52]),
        G[53] !== U
          ? ((D = (0, t.jsxs)("span", {
              "data-search-row-age": !0,
              className: T,
              children: [q, U],
            })),
            (G[53] = U),
            (G[54] = D))
          : (D = G[54]),
        G[55] !== I || G[56] !== D
          ? ((W = (0, t.jsxs)("div", {
              className: "flex shrink-0 flex-col items-end",
              children: [I, D],
            })),
            (G[55] = I),
            (G[56] = D),
            (G[57] = W))
          : (W = G[57]),
        G[58] !== eu ||
        G[59] !== ed ||
        G[60] !== ex ||
        G[61] !== u ||
        G[62] !== m ||
        G[63] !== j ||
        G[64] !== W
          ? ((V = (0, t.jsxs)(f.default, {
              href: ex,
              prefetch: ed,
              ...eu,
              onClick: u,
              className: "focus-inset flex min-w-0 flex-1 items-center gap-3",
              children: [m, j, W],
            })),
            (G[58] = eu),
            (G[59] = ed),
            (G[60] = ex),
            (G[61] = u),
            (G[62] = m),
            (G[63] = j),
            (G[64] = W),
            (G[65] = V))
          : (V = G[65]),
        G[66] !== ei || G[67] !== V || G[68] !== d
          ? ((Q = (0, t.jsxs)("div", {
              ref: ei,
              "data-search-row": !0,
              className: o,
              children: [d, V],
            })),
            (G[66] = ei),
            (G[67] = V),
            (G[68] = d),
            (G[69] = Q))
          : (Q = G[69]),
        Q
      );
    },
    ee = (e) => {
      let a,
        s,
        n,
        l,
        i,
        c,
        d = (0, r.c)(29),
        { user: m, onClick: h } = e,
        { t: x } = (0, p.f)(),
        g = (0, u.s)(m.userId ?? m.address);
      d[0] !== m.address || d[1] !== m.userId
        ? ((a = (0, o.$)({ address: m.address, userId: m.userId })),
          (d[0] = m.address),
          (d[1] = m.userId),
          (d[2] = a))
        : (a = d[2]);
      let b = a;
      d[3] !== x ||
      d[4] !== m.address ||
      d[5] !== m.username ||
      d[6] !== m.wallet_label
        ? ((s =
            m.wallet_label ||
            m.username ||
            m.address?.slice(0, 6) ||
            x("web.search.anonymous_fallback")),
          (d[3] = x),
          (d[4] = m.address),
          (d[5] = m.username),
          (d[6] = m.wallet_label),
          (d[7] = s))
        : (s = d[7]);
      let w = s;
      d[8] !== b || d[9] !== w || d[10] !== h
        ? ((n = b
            ? (0, t.jsx)(f.default, {
                href: b,
                onClick: h,
                "aria-label": w,
                className: W,
              })
            : null),
          (d[8] = b),
          (d[9] = w),
          (d[10] = h),
          (d[11] = n))
        : (n = d[11]);
      let _ = m.address ?? null,
        v = m.userId,
        k = m.username,
        y = m.profile_image,
        j = m.resolved_avatar_decoration,
        N = m.x_username,
        C = !1 === m.is_pump_user;
      if (d[12] !== x || d[13] !== m)
        ((l =
          void 0 === m.wallet_label
            ? x("common.followers_count", {
                count: m.followers ?? 0,
                compact_count: (0, P.O)(m.followers ?? 0),
              })
            : !1 === m.is_pump_user
              ? x("search.external_wallet.subtitle")
              : m.address?.slice(0, 6)),
          (d[12] = x),
          (d[13] = m),
          (d[14] = l));
      else l = d[14];
      return (
        d[15] !== g ||
        d[16] !== w ||
        d[17] !== C ||
        d[18] !== l ||
        d[19] !== _ ||
        d[20] !== m.profile_image ||
        d[21] !== m.resolved_avatar_decoration ||
        d[22] !== m.userId ||
        d[23] !== m.username ||
        d[24] !== m.x_username
          ? ((i = (0, t.jsx)(A.S, {
              address: _,
              userId: v,
              username: k,
              profileImage: y,
              avatarDecoration: j,
              nameOverride: w,
              size: $,
              density: K,
              link: !1,
              hoverCard: !1,
              verified: g,
              xUsername: N,
              outsideWallet: C,
              description: l,
              className: "min-w-0 flex-1",
            })),
            (d[15] = g),
            (d[16] = w),
            (d[17] = C),
            (d[18] = l),
            (d[19] = _),
            (d[20] = m.profile_image),
            (d[21] = m.resolved_avatar_decoration),
            (d[22] = m.userId),
            (d[23] = m.username),
            (d[24] = m.x_username),
            (d[25] = i))
          : (i = d[25]),
        d[26] !== i || d[27] !== n
          ? ((c = (0, t.jsxs)("div", {
              "data-search-row": !0,
              className: F,
              children: [n, i],
            })),
            (d[26] = i),
            (d[27] = n),
            (d[28] = c))
          : (c = d[28]),
        c
      );
    },
    et = (e) => {
      let a,
        s = (0, r.c)(5),
        { rows: n, variant: l } = e;
      if (s[0] !== n || s[1] !== l) {
        let e;
        (s[3] !== l
          ? ((e = (e, r) =>
              (0, t.jsxs)(
                "div",
                {
                  className: (0, H.c)(F, "hover:bg-transparent"),
                  children: [
                    (0, t.jsx)(T.l, { variant: l, size: $ }),
                    (0, t.jsxs)("div", {
                      className: "flex min-w-0 flex-1 flex-col gap-1 py-0.5",
                      children: [
                        (0, t.jsx)(T.l, { height: 14, width: 112 }),
                        (0, t.jsx)(T.l, { height: 12, width: 48 }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      className:
                        "flex shrink-0 flex-col items-end gap-1 py-0.5",
                      children: [
                        (0, t.jsx)(T.l, { height: 14, width: 48 }),
                        (0, t.jsx)(T.l, { height: 12, width: 40 }),
                      ],
                    }),
                  ],
                },
                r,
              )),
            (s[3] = l),
            (s[4] = e))
          : (e = s[4]),
          (a = (0, t.jsx)("div", {
            "aria-hidden": !0,
            className: "flex flex-col",
            "data-testid": "search-results-skeleton",
            children: Array.from({ length: n }, e),
          })),
          (s[0] = n),
          (s[1] = l),
          (s[2] = a));
      } else a = s[2];
      return a;
    };
  var er = e.i(908163),
    ea = e.i(897665),
    es = e.i(69399);
  function en(e) {
    let a,
      s,
      n,
      l,
      i,
      c,
      o,
      d,
      u,
      m,
      h,
      x,
      g,
      v = (0, r.c)(32),
      { squad: k, onClick: y } = e,
      { t: j } = (0, p.f)();
    v[0] !== j
      ? ((a = j("profile.squads.profile.pill")), (v[0] = j), (v[1] = a))
      : (a = v[1]);
    let N = a,
      C = k.username || N;
    (v[2] === Symbol.for("react.memo_cache_sentinel")
      ? ((s = (0, H.c)(F, "focus-inset")), (v[2] = s))
      : (s = v[2]),
      v[3] !== k.groupId || v[4] !== k.username
        ? ((n = (0, es.Z)({ groupId: k.groupId, username: k.username })),
          (v[3] = k.groupId),
          (v[4] = k.username),
          (v[5] = n))
        : (n = v[5]));
    let S = k.groupId;
    return (
      v[6] !== k.profileImage
        ? ((l = (0, _.f)(k.profileImage)), (v[6] = k.profileImage), (v[7] = l))
        : (l = v[7]),
      v[8] !== k.groupId || v[9] !== l
        ? ((i = (0, t.jsx)(w.f, {
            address: S,
            alt: "",
            className: "size-7 shrink-0 rounded-md object-cover",
            height: $,
            ipfsPrefix: ea.f,
            isAnonymous: !1,
            src: l,
            width: $,
          })),
          (v[8] = k.groupId),
          (v[9] = l),
          (v[10] = i))
        : (i = v[10]),
      v[11] !== C
        ? ((c = (0, t.jsx)("span", {
            className:
              "min-w-0 truncate text-sm font-medium leading-5 text-text-primary",
            children: C,
          })),
          (v[11] = C),
          (v[12] = c))
        : (c = v[12]),
      v[13] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (0, t.jsx)(b.BQ, { "aria-hidden": !0, size: 12 })), (v[13] = o))
        : (o = v[13]),
      v[14] !== N
        ? ((d = (0, t.jsxs)(er.E, {
            density: K,
            tone: "mint",
            children: [o, N],
          })),
          (v[14] = N),
          (v[15] = d))
        : (d = v[15]),
      v[16] !== c || v[17] !== d
        ? ((u = (0, t.jsxs)("span", {
            className: "flex h-5 min-w-0 items-center gap-1.5",
            children: [c, d],
          })),
          (v[16] = c),
          (v[17] = d),
          (v[18] = u))
        : (u = v[18]),
      v[19] !== k.memberCount || v[20] !== j
        ? ((m = j("profile.squads.info.member_count", {
            count: k.memberCount,
          })),
          (v[19] = k.memberCount),
          (v[20] = j),
          (v[21] = m))
        : (m = v[21]),
      v[22] !== m
        ? ((h = (0, t.jsx)("span", {
            className: "truncate text-xs leading-4 text-text-tertiary",
            children: m,
          })),
          (v[22] = m),
          (v[23] = h))
        : (h = v[23]),
      v[24] !== u || v[25] !== h
        ? ((x = (0, t.jsxs)("div", {
            className: "flex min-w-0 flex-1 flex-col",
            children: [u, h],
          })),
          (v[24] = u),
          (v[25] = h),
          (v[26] = x))
        : (x = v[26]),
      v[27] !== y || v[28] !== x || v[29] !== n || v[30] !== i
        ? ((g = (0, t.jsxs)(f.default, {
            className: s,
            "data-testid": "search-squad-row",
            href: n,
            onClick: y,
            prefetch: !1,
            children: [i, x],
          })),
          (v[27] = y),
          (v[28] = x),
          (v[29] = n),
          (v[30] = i),
          (v[31] = g))
        : (g = v[31]),
      g
    );
  }
  var el = e.i(436057),
    ei = e.i(839931);
  function ec(e) {
    let a,
      s,
      n,
      l,
      i,
      c,
      o,
      d,
      u,
      m,
      h,
      x = (0, r.c)(26),
      { card: g, onClick: b } = e,
      { t: w } = (0, p.f)();
    x[0] !== g.grade || x[1] !== w
      ? ((a =
          null === g.grade
            ? w("search.card")
            : w("search.card_with_grade", { grade: g.grade })),
        (x[0] = g.grade),
        (x[1] = w),
        (x[2] = a))
      : (a = x[2]);
    let _ = a,
      v = g.nftAddress;
    (x[3] === Symbol.for("react.memo_cache_sentinel")
      ? ((s = (0, H.c)(F, "gap-3")), (x[3] = s))
      : (s = x[3]),
      x[4] !== g.nftAddress
        ? ((n = (0, ei.o)(g.nftAddress, "market")),
          (x[4] = g.nftAddress),
          (x[5] = n))
        : (n = x[5]),
      x[6] !== g.name || x[7] !== b || x[8] !== n
        ? ((l = (0, t.jsx)(f.default, {
            href: n,
            onClick: b,
            "aria-label": g.name,
            className: W,
          })),
          (x[6] = g.name),
          (x[7] = b),
          (x[8] = n),
          (x[9] = l))
        : (l = x[9]));
    let y = g.image ?? void 0;
    return (
      x[10] !== y
        ? ((i = (0, t.jsx)(el.f, {
            src: y,
            alt: "",
            className: "aspect-auto size-7 shrink-0 rounded-md",
          })),
          (x[10] = y),
          (x[11] = i))
        : (i = x[11]),
      x[12] === Symbol.for("react.memo_cache_sentinel")
        ? ((c = (0, H.c)(k.n[K], "truncate")), (x[12] = c))
        : (c = x[12]),
      x[13] !== g.name
        ? ((o = (0, t.jsx)("span", {
            className: k.x[K],
            children: (0, t.jsx)("span", { className: c, children: g.name }),
          })),
          (x[13] = g.name),
          (x[14] = o))
        : (o = x[14]),
      x[15] === Symbol.for("react.memo_cache_sentinel")
        ? ((d = (0, H.c)("min-w-0 truncate", k.B[K])), (x[15] = d))
        : (d = x[15]),
      x[16] !== _
        ? ((u = (0, t.jsx)("span", {
            "data-testid": "search-card-row-kind",
            className: d,
            children: _,
          })),
          (x[16] = _),
          (x[17] = u))
        : (u = x[17]),
      x[18] !== u || x[19] !== o
        ? ((m = (0, t.jsxs)("div", {
            className: "flex min-w-0 flex-1 flex-col",
            children: [o, u],
          })),
          (x[18] = u),
          (x[19] = o),
          (x[20] = m))
        : (m = x[20]),
      x[21] !== g.nftAddress || x[22] !== m || x[23] !== l || x[24] !== i
        ? ((h = (0, t.jsxs)("div", {
            "data-search-row": !0,
            "data-testid": "search-card-row",
            "data-nft": v,
            className: s,
            children: [l, i, m],
          })),
          (x[21] = g.nftAddress),
          (x[22] = m),
          (x[23] = l),
          (x[24] = i),
          (x[25] = h))
        : (h = x[25]),
      h
    );
  }
  var eo = e.i(760447);
  let ed = (e) => {
      let a,
        s,
        n,
        l,
        i = (0, r.c)(16),
        { tab: c, title: o, section: d, onSeeAll: u, children: m } = e,
        { t: h } = (0, p.f)(),
        f = `search-preview-${c}`;
      return (
        i[0] !== u || i[1] !== d.hasMore || i[2] !== h || i[3] !== c
          ? ((a = d.hasMore
              ? (0, t.jsx)("button", {
                  type: "button",
                  className: V,
                  onClick: () => u(c),
                  children: h("common.see_all"),
                })
              : void 0),
            (i[0] = u),
            (i[1] = d.hasMore),
            (i[2] = h),
            (i[3] = c),
            (i[4] = a))
          : (a = i[4]),
        i[5] !== a || i[6] !== o
          ? ((s = (0, t.jsx)(q._, {
              density: K,
              title: o,
              className: Q,
              aside: a,
            })),
            (i[5] = a),
            (i[6] = o),
            (i[7] = s))
          : (s = i[7]),
        i[8] !== m || i[9] !== d.loading || i[10] !== c
          ? ((n = d.loading
              ? (0, t.jsx)(et, { rows: 2, variant: J[c] })
              : (0, t.jsx)("div", { className: "flex flex-col", children: m })),
            (i[8] = m),
            (i[9] = d.loading),
            (i[10] = c),
            (i[11] = n))
          : (n = i[11]),
        i[12] !== f || i[13] !== s || i[14] !== n
          ? ((l = (0, t.jsxs)("section", {
              className: "flex flex-col",
              "data-testid": f,
              children: [s, n],
            })),
            (i[12] = f),
            (i[13] = s),
            (i[14] = n),
            (i[15] = l))
          : (l = i[15]),
        l
      );
    },
    eu = (e) => {
      let a,
        s,
        n,
        l,
        i = (0, r.c)(20),
        {
          searchTerm: c,
          coins: o,
          users: d,
          squads: u,
          onSeeAll: m,
          onCoinClick: h,
          onUserClick: f,
          onSquadClick: x,
        } = e,
        { t: g } = (0, p.f)();
      return (
        i[0] !== o || i[1] !== h || i[2] !== m || i[3] !== c || i[4] !== g
          ? ((a = o.visible
              ? (0, t.jsx)(ed, {
                  tab: "coins",
                  title: g("search.coins"),
                  section: o,
                  onSeeAll: m,
                  children: o.rows.map((e, r) =>
                    (0, t.jsx)(
                      Z,
                      { coin: e, index: r, searchTerm: c, onClick: () => h(e) },
                      e.mint,
                    ),
                  ),
                })
              : null),
            (i[0] = o),
            (i[1] = h),
            (i[2] = m),
            (i[3] = c),
            (i[4] = g),
            (i[5] = a))
          : (a = i[5]),
        i[6] !== m || i[7] !== f || i[8] !== g || i[9] !== d
          ? ((s = d.visible
              ? (0, t.jsx)(ed, {
                  tab: "users",
                  title: g("search.users"),
                  section: d,
                  onSeeAll: m,
                  children: d.rows.map((e) =>
                    (0, t.jsx)(
                      ee,
                      { user: e, onClick: () => f(e) },
                      e.userId ?? e.address,
                    ),
                  ),
                })
              : null),
            (i[6] = m),
            (i[7] = f),
            (i[8] = g),
            (i[9] = d),
            (i[10] = s))
          : (s = i[10]),
        i[11] !== m || i[12] !== x || i[13] !== u || i[14] !== g
          ? ((n = u.visible
              ? (0, t.jsx)(ed, {
                  tab: "squads",
                  title: g("search.squads"),
                  section: u,
                  onSeeAll: m,
                  children: u.rows.map((e) =>
                    (0, t.jsx)(
                      en,
                      { squad: (0, eo.h)(e), onClick: () => x(e) },
                      e.userId,
                    ),
                  ),
                })
              : null),
            (i[11] = m),
            (i[12] = x),
            (i[13] = u),
            (i[14] = g),
            (i[15] = n))
          : (n = i[15]),
        i[16] !== a || i[17] !== s || i[18] !== n
          ? ((l = (0, t.jsxs)("div", {
              className: G,
              "data-testid": "search-results-preview",
              children: [a, s, n],
            })),
            (i[16] = a),
            (i[17] = s),
            (i[18] = n),
            (i[19] = l))
          : (l = i[19]),
        l
      );
    };
  var em = e.i(51206);
  function eh() {
    return 3;
  }
  function ef() {}
  function ex(e) {
    let a,
      n,
      l,
      i,
      c,
      o,
      d,
      u = (0, r.c)(19),
      { density: m, atStart: h, atEnd: f, pagePrevious: x, pageNext: g } = e,
      { t: b } = (0, p.f)();
    return (
      u[0] !== b
        ? ((a = b("web.pagination.previous_page")), (u[0] = b), (u[1] = a))
        : (a = u[1]),
      u[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, t.jsx)(s.S, { "aria-hidden": !0 })), (u[2] = n))
        : (n = u[2]),
      u[3] !== h || u[4] !== m || u[5] !== x || u[6] !== a
        ? ((l = (0, t.jsx)(em._, {
            density: m,
            size: 24,
            variant: "ghost",
            "aria-label": a,
            disabled: h,
            onClick: x,
            "data-search-strip-arrow": "previous",
            children: n,
          })),
          (u[3] = h),
          (u[4] = m),
          (u[5] = x),
          (u[6] = a),
          (u[7] = l))
        : (l = u[7]),
      u[8] !== b
        ? ((i = b("web.pagination.next_page")), (u[8] = b), (u[9] = i))
        : (i = u[9]),
      u[10] === Symbol.for("react.memo_cache_sentinel")
        ? ((c = (0, t.jsx)(s.kK, { "aria-hidden": !0 })), (u[10] = c))
        : (c = u[10]),
      u[11] !== f || u[12] !== m || u[13] !== g || u[14] !== i
        ? ((o = (0, t.jsx)(em._, {
            density: m,
            size: 24,
            variant: "ghost",
            "aria-label": i,
            disabled: f,
            onClick: g,
            "data-search-strip-arrow": "next",
            children: c,
          })),
          (u[11] = f),
          (u[12] = m),
          (u[13] = g),
          (u[14] = i),
          (u[15] = o))
        : (o = u[15]),
      u[16] !== l || u[17] !== o
        ? ((d = (0, t.jsxs)("span", {
            className: "flex items-center gap-1",
            children: [l, o],
          })),
          (u[16] = l),
          (u[17] = o),
          (u[18] = d))
        : (d = u[18]),
      d
    );
  }
  let ep = "search.idle-strip",
    eg = "hot-coins",
    eb = () => {
      try {
        let e = window.sessionStorage.getItem(ep);
        return "hot-coins" === e || "top-traders" === e ? e : eg;
      } catch {
        return eg;
      }
    };
  e.i(84455);
  var ew = e.i(167958),
    e_ = e.i(787773),
    ev = e.i(137949),
    ek = e.i(935302),
    ey = e.i(607122),
    ej = e.i(66819),
    eN = e.i(521368),
    eC = e.i(38279),
    eS = e.i(997887),
    eA = e.i(620268),
    eE = e.i(690877),
    eI = e.i(759257);
  async function eT(e) {
    let { fetchOptions: t, ...r } = e;
    return (0, eI.j)()("GET /pnl-leaderboard", {
      query: r,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      ...t,
      throwHttpErrors: !1,
      hooks: {
        afterResponse: [
          (e, t, r) => {
            if (!r.ok) throw Error("Failed to fetch PnL leaderboard");
          },
        ],
      },
    });
  }
  async function eq(e = {}) {
    let { fetchOptions: t } = e,
      r = await (0, eI.j)()("GET /coins/great-coins", {
        query: {},
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        ...t,
        throwHttpErrors: !1,
        hooks: {
          afterResponse: [
            (e, t, r) => {
              if (!r.ok) throw Error("Failed to fetch trending coins");
            },
          ],
        },
      });
    return (0, eS.l)(r);
  }
  function eR() {
    return eq();
  }
  var eM = e.i(536925),
    eL = e.i(669028),
    eP = e.i(117339),
    eO = e.i(944410),
    eU = e.i(213618),
    eD = e.i(761459),
    ez = e.i(606933),
    eH = e.i(662610),
    eB = e.i(560328),
    eK = e.i(989582);
  let e$ = [];
  function eF(e, t) {
    return e + t.length;
  }
  function eW(e) {
    return e.pages.flat();
  }
  var eV = e.i(379705),
    eQ = e.i(785212);
  function eG(e) {
    return e.toLowerCase();
  }
  var eJ = e.i(48485),
    eX = e.i(600775),
    eZ = e.i(541710),
    eY = e.i(646908),
    e0 = e.i(253623),
    e1 = e.i(464403);
  let e2 = 4,
    e3 = ({ rows: e, loading: t, skipped: r = !1, limit: a = e2 }) => {
      if (r) return { rows: [], hasMore: !1, visible: !1, loading: !1 };
      let s = e.slice(0, a);
      return {
        rows: s,
        hasMore: e.length > a,
        visible: s.length > 0 || t,
        loading: 0 === s.length && t,
      };
    },
    e4 = async (e, t) => {
      let r;
      try {
        r = (
          await (0, eI.j)()("GET /search/resolve", {
            query: { identifiers: [e] },
            signal: t,
          })
        ).results[0];
      } catch {
        return { kind: "fallback" };
      }
      if (!r || !r.definitive) return { kind: "fallback" };
      if ("coin" === r.kind) {
        let e = r.coin?.mint;
        return e
          ? { kind: "coin", mint: e, chain: r.chain ?? null }
          : { kind: "fallback" };
      }
      return "user" === r.kind
        ? { kind: "user" }
        : "external_wallet" === r.kind
          ? { kind: "external_wallet" }
          : { kind: "fallback" };
    },
    e5 = ["coins", "users", "squads"],
    e6 = /^0x[0-9a-fA-F]{41,64}$/,
    e7 = (e) => {
      let t = e.trim();
      return e6.test(t) ? (0, eY.Y)(t) : null;
    };
  var e8 = e.i(617614),
    e9 = e.i(358893),
    te = e.i(605587),
    tt = e.i(820190),
    tr = e.i(639374);
  let ta =
      "relative flex flex-col gap-2 rounded-md bg-bg-tertiary p-3 transition-colors hover:bg-bg-quaternary",
    ts = "bg-bg-quaternary",
    tn = (0, H.c)(er.G, er.q[K], er.c.neutral, "font-sans"),
    tl = (0, H.c)(ev.Q, ev.g[K], ev.f, I.U[K], "justify-center gap-1.5"),
    ti = (e) => {
      let t = e.trim();
      return (0, e0.D)(t) ? t : null;
    },
    tc = (e) => {
      let t = new Map();
      for (let r of e) {
        let e = r.data;
        e?.mint && t.set(e.mint, { ...e, chain_id: eY.d });
      }
      return { byAddress: t, pending: e.some((e) => e.isLoading) };
    },
    to = (e, t) => {
      let a,
        s,
        n,
        l = (0, r.c)(7);
      return (
        l[0] !== e || l[1] !== t
          ? ((a = t ? e : []), (l[0] = e), (l[1] = t), (l[2] = a))
          : (a = l[2]),
        l[3] !== a ? ((s = a.map(tb)), (l[3] = a), (l[4] = s)) : (s = l[4]),
        l[5] !== s
          ? ((n = { queries: s, combine: tc }), (l[5] = s), (l[6] = n))
          : (n = l[6]),
        (0, h.f)(n)
      );
    },
    td = (e) => {
      let a,
        s,
        n,
        l,
        i,
        c,
        d,
        h = (0, r.c)(26),
        { address: x, onClick: g } = e,
        { t: b } = (0, p.f)();
      h[0] !== x ? ((a = { address: x }), (h[0] = x), (h[1] = a)) : (a = h[1]);
      let { data: w } = (0, m.T)(a),
        _ = (0, u.s)(x);
      h[2] !== x || h[3] !== w?.username
        ? ((s = w?.username || x.slice(0, 6)),
          (h[2] = x),
          (h[3] = w?.username),
          (h[4] = s))
        : (s = h[4]);
      let v = s;
      (h[5] !== x ? ((n = (0, o.$)(x)), (h[5] = x), (h[6] = n)) : (n = h[6]),
        h[7] !== v || h[8] !== g || h[9] !== n
          ? ((l = (0, t.jsx)(f.default, {
              href: n,
              onClick: g,
              "aria-label": v,
              className: W,
            })),
            (h[7] = v),
            (h[8] = g),
            (h[9] = n),
            (h[10] = l))
          : (l = h[10]));
      let k = w?.username,
        y = w?.profile_image,
        j = w?.resolved_avatar_decoration,
        N = w?.x_username;
      return (
        h[11] !== b || h[12] !== w
          ? ((i = w
              ? b("common.followers_count", {
                  count: w.followers ?? 0,
                  compact_count: (0, P.O)(w.followers ?? 0),
                })
              : void 0),
            (h[11] = b),
            (h[12] = w),
            (h[13] = i))
          : (i = h[13]),
        h[14] !== x ||
        h[15] !== _ ||
        h[16] !== v ||
        h[17] !== k ||
        h[18] !== y ||
        h[19] !== j ||
        h[20] !== N ||
        h[21] !== i
          ? ((c = (0, t.jsx)(A.S, {
              address: x,
              username: k,
              profileImage: y,
              avatarDecoration: j,
              nameOverride: v,
              size: $,
              density: K,
              link: !1,
              hoverCard: !1,
              verified: _,
              xUsername: N,
              description: i,
              className: "min-w-0 flex-1",
            })),
            (h[14] = x),
            (h[15] = _),
            (h[16] = v),
            (h[17] = k),
            (h[18] = y),
            (h[19] = j),
            (h[20] = N),
            (h[21] = i),
            (h[22] = c))
          : (c = h[22]),
        h[23] !== c || h[24] !== l
          ? ((d = (0, t.jsxs)("div", {
              "data-search-row": !0,
              className: F,
              children: [l, c],
            })),
            (h[23] = c),
            (h[24] = l),
            (h[25] = d))
          : (d = h[25]),
        d
      );
    },
    tu = (e) => {
      let l,
        i,
        o,
        u,
        m,
        x,
        g,
        b,
        w,
        _,
        v = (0, r.c)(31),
        { terms: k, canExpand: y, onClear: j, onNavigate: N } = e,
        { t: C } = (0, p.f)(),
        [S, A] = (0, a.useState)(!1),
        E = y && S;
      v[0] !== E || v[1] !== k
        ? ((l = E ? k : k.slice(0, 3)), (v[0] = E), (v[1] = k), (v[2] = l))
        : (l = v[2]);
      let I = l,
        R = y && k.length > 3,
        M = ((e) => {
          let t,
            a,
            s,
            n,
            l,
            i,
            o,
            u = (0, r.c)(25),
            m = (0, eZ.l)();
          u[0] !== m
            ? ((t = (0, eZ.M)(m)), (u[0] = m), (u[1] = t))
            : (t = u[1]);
          let f = t;
          if (u[2] !== f || u[3] !== e) {
            let t;
            (u[5] !== f
              ? ((t = (e) => ({
                  term: e,
                  candidate: ((e, t = !1) => {
                    let r = (0, d.R)(e);
                    if (r && (0, tr.f)(r))
                      return { address: r, chain: "solana" };
                    let a = e.trim();
                    if ((0, te.h)(a)) return { address: a, chain: "evm" };
                    let s = t ? ti(a) : null;
                    return s ? { address: s, chain: "near" } : null;
                  })(e, f),
                  groupId: (0, c.f)(e.trim()) ? e.trim() : null,
                })),
                (u[5] = f),
                (u[6] = t))
              : (t = u[6]),
              (a = e.map(t)),
              (u[2] = f),
              (u[3] = e),
              (u[4] = a));
          } else a = u[4];
          let x = a;
          u[7] !== x
            ? ((s = x.flatMap(tw)), (u[7] = x), (u[8] = s))
            : (s = u[8]);
          let { squads: p, pendingIds: g } = ((e) => {
            let t,
              a,
              s,
              n = (0, r.c)(13),
              l = (0, eO.useClientServerContract)(),
              i = (0, eH.f)();
            if (n[0] !== l || n[1] !== e || n[2] !== i) {
              let r;
              (n[4] !== l || n[5] !== i
                ? ((r = (e) => ({
                    queryKey: eK.f.profile(e),
                    queryFn: (t) => {
                      let { signal: r } = t;
                      return (0, eB.N)({ api: l, groupId: e, signal: r });
                    },
                    enabled: i,
                    staleTime: 3e4,
                  })),
                  (n[4] = l),
                  (n[5] = i),
                  (n[6] = r))
                : (r = n[6]),
                (t = e.map(r)),
                (n[0] = l),
                (n[1] = e),
                (n[2] = i),
                (n[3] = t));
            } else t = n[3];
            return (
              n[7] !== e || n[8] !== i
                ? ((a = (t) => {
                    let r = new Map(),
                      a = new Set();
                    return (
                      i &&
                        t.forEach((t, s) => {
                          let n = e[s];
                          void 0 !== n &&
                            (void 0 !== t.data
                              ? r.set(n, t.data)
                              : t.isPending && a.add(n));
                        }),
                      { squads: r, pendingIds: a }
                    );
                  }),
                  (n[7] = e),
                  (n[8] = i),
                  (n[9] = a))
                : (a = n[9]),
              n[10] !== t || n[11] !== a
                ? ((s = { queries: t, combine: a }),
                  (n[10] = t),
                  (n[11] = a),
                  (n[12] = s))
                : (s = n[12]),
              (0, h.f)(s)
            );
          })(s);
          u[9] !== x
            ? ((n = x.flatMap(t_)), (u[9] = x), (u[10] = n))
            : (n = u[10]);
          let b = n;
          u[11] !== x
            ? ((l = x.flatMap(tv)), (u[11] = x), (u[12] = l))
            : (l = u[12]);
          let w = l,
            _ = to(w, f && w.length > 0),
            v = 0 === b.length;
          u[13] !== b || u[14] !== v
            ? ((i = { mints: b, includeNsfw: !0, disabled: v }),
              (u[13] = b),
              (u[14] = v),
              (u[15] = i))
            : (i = u[15]);
          let {
            coins: k,
            loading: y,
            isLoadingError: j,
            fallbackPending: N,
          } = (0, eQ.f)(i);
          if (
            u[16] !== x ||
            u[17] !== k ||
            u[18] !== N ||
            u[19] !== j ||
            u[20] !== y ||
            u[21] !== _ ||
            u[22] !== g ||
            u[23] !== p
          ) {
            let e = new Map(k.map(tk));
            ((o = x.map((t) => {
              let { term: r, candidate: a, groupId: s } = t;
              if (null !== s) {
                let e = p.get(s);
                return e
                  ? { kind: "squad", term: r, squad: e }
                  : g.has(s)
                    ? { kind: "pending", term: r }
                    : { kind: "text", term: r };
              }
              if (!a) return { kind: "text", term: r };
              if ("near" === a.chain) {
                let e = _.byAddress.get(a.address);
                return e
                  ? { kind: "coin", term: r, coin: e }
                  : _.pending
                    ? { kind: "pending", term: r }
                    : { kind: "text", term: r };
              }
              let n = e.get((0, te.c)(a.address));
              return n
                ? { kind: "coin", term: r, coin: n }
                : y || N
                  ? { kind: "pending", term: r }
                  : !j && "solana" === a.chain && (0, tt.f)(a.address)
                    ? { kind: "user", term: r, address: a.address }
                    : { kind: "text", term: r };
            })),
              (u[16] = x),
              (u[17] = k),
              (u[18] = N),
              (u[19] = j),
              (u[20] = y),
              (u[21] = _),
              (u[22] = g),
              (u[23] = p),
              (u[24] = o));
          } else o = u[24];
          return o;
        })(I);
      (v[3] !== M ? ((i = M.flatMap(tN)), (v[3] = M), (v[4] = i)) : (i = v[4]),
        (0, eJ.f)(i),
        v[5] !== C
          ? ((o = C("web.search.recently_searched")), (v[5] = C), (v[6] = o))
          : (o = v[6]),
        v[7] !== R || v[8] !== E || v[9] !== C
          ? ((u = R
              ? (0, t.jsx)("button", {
                  type: "button",
                  className: V,
                  onClick: () => A(tC),
                  children: C(E ? "common.show_less" : "common.see_all"),
                })
              : null),
            (v[7] = R),
            (v[8] = E),
            (v[9] = C),
            (v[10] = u))
          : (u = v[10]));
      let L = 0 === k.length;
      return (
        v[11] !== C
          ? ((m = C("common.clear")), (v[11] = C), (v[12] = m))
          : (m = v[12]),
        v[13] !== j || v[14] !== L || v[15] !== m
          ? ((x = (0, t.jsx)("button", {
              type: "button",
              className: V,
              onClick: j,
              disabled: L,
              children: m,
            })),
            (v[13] = j),
            (v[14] = L),
            (v[15] = m),
            (v[16] = x))
          : (x = v[16]),
        v[17] !== u || v[18] !== x
          ? ((g = (0, t.jsxs)("span", {
              className: "flex items-center gap-3",
              children: [u, x],
            })),
            (v[17] = u),
            (v[18] = x),
            (v[19] = g))
          : (g = v[19]),
        v[20] !== o || v[21] !== g
          ? ((b = (0, t.jsx)(q._, {
              density: K,
              title: o,
              className: Q,
              aside: g,
            })),
            (v[20] = o),
            (v[21] = g),
            (v[22] = b))
          : (b = v[22]),
        v[23] !== N || v[24] !== M || v[25] !== C || v[26] !== k.length
          ? ((w =
              0 === k.length
                ? (0, t.jsx)(e_.L, {
                    density: K,
                    children: C("search.no_recent_searches"),
                  })
                : (0, t.jsx)("div", {
                    className: "flex flex-col",
                    children: M.map((e, r) =>
                      "coin" === e.kind
                        ? (0, t.jsx)(
                            Z,
                            {
                              coin: e.coin,
                              index: r,
                              sourceScreen: n.Ae.SEARCH,
                              sourceElement: n.k9.RECENT_LIST,
                              searchTerm: e.term,
                              onClick: N,
                            },
                            e.term,
                          )
                        : "user" === e.kind
                          ? (0, t.jsx)(
                              td,
                              { address: e.address, onClick: N },
                              e.term,
                            )
                          : "squad" === e.kind
                            ? (0, t.jsx)(
                                en,
                                { squad: e.squad, onClick: N },
                                e.term,
                              )
                            : "pending" === e.kind
                              ? (0, t.jsxs)(
                                  "div",
                                  {
                                    "aria-hidden": !0,
                                    "data-testid": "recent-search-pending",
                                    className: (0, H.c)(
                                      F,
                                      "hover:bg-transparent",
                                    ),
                                    children: [
                                      (0, t.jsx)(T.l, {
                                        variant: "circle",
                                        size: $,
                                      }),
                                      (0, t.jsx)(T.l, {
                                        height: 14,
                                        width: 144,
                                      }),
                                    ],
                                  },
                                  e.term,
                                )
                              : (0, t.jsxs)(
                                  f.default,
                                  {
                                    href: `/explore?q=${encodeURIComponent(e.term)}`,
                                    onClick: N,
                                    className: (0, H.c)(F, "focus-inset"),
                                    children: [
                                      (0, t.jsx)("span", {
                                        className:
                                          "flex size-7 shrink-0 items-center justify-center text-text-quaternary",
                                        children: (0, t.jsx)(s.L3, {
                                          "aria-hidden": !0,
                                          className: "size-4",
                                        }),
                                      }),
                                      (0, t.jsx)("span", {
                                        className:
                                          "min-w-0 truncate text-sm leading-5 text-text-primary",
                                        children: e.term,
                                      }),
                                    ],
                                  },
                                  e.term,
                                ),
                    ),
                  })),
            (v[23] = N),
            (v[24] = M),
            (v[25] = C),
            (v[26] = k.length),
            (v[27] = w))
          : (w = v[27]),
        v[28] !== w || v[29] !== b
          ? ((_ = (0, t.jsxs)("section", {
              className: "flex flex-col",
              "data-testid": "search-recently-searched",
              children: [b, w],
            })),
            (v[28] = w),
            (v[29] = b),
            (v[30] = _))
          : (_ = v[30]),
        _
      );
    },
    tm = (e) => {
      let a,
        s,
        n,
        c,
        d,
        u,
        h,
        x,
        p,
        g,
        b,
        w,
        _,
        v = (0, r.c)(53),
        { entry: k, onClick: y } = e,
        j = (0, i.k)(l.D.WEB_AVATAR_DECORATIONS);
      v[0] !== j || v[1] !== k.walletAddress
        ? ((a = { address: k.walletAddress, enabled: j }),
          (v[0] = j),
          (v[1] = k.walletAddress),
          (v[2] = a))
        : (a = v[2]);
      let { data: N } = (0, m.T)(a);
      v[3] !== k.username || v[4] !== k.walletAddress
        ? ((s =
            k.username ||
            `${k.walletAddress.slice(0, 4)}...${k.walletAddress.slice(-4)}`),
          (v[3] = k.username),
          (v[4] = k.walletAddress),
          (v[5] = s))
        : (s = v[5]);
      let C = s;
      if (
        v[6] !== C ||
        v[7] !== k.pnlUsd ||
        v[8] !== k.profileImage ||
        v[9] !== k.username ||
        v[10] !== k.walletAddress ||
        v[11] !== k.xUsername ||
        v[12] !== y ||
        v[13] !== N?.resolved_avatar_decoration
      ) {
        let e,
          r,
          a,
          s = (0, P.k)(k.pnlUsd, 0);
        ((u = !0),
          v[21] === Symbol.for("react.memo_cache_sentinel")
            ? ((h = (0, H.c)(ta, "min-w-40")), (v[21] = h))
            : (h = v[21]),
          v[22] !== k.walletAddress
            ? ((e = (0, o.$)(k.walletAddress)),
              (v[22] = k.walletAddress),
              (v[23] = e))
            : (e = v[23]),
          v[24] === Symbol.for("react.memo_cache_sentinel")
            ? ((r = (0, H.c)(W, "rounded-md")), (v[24] = r))
            : (r = v[24]),
          v[25] !== C || v[26] !== y || v[27] !== e
            ? ((x = (0, t.jsx)(f.default, {
                href: e,
                onClick: y,
                "aria-label": C,
                className: r,
              })),
              (v[25] = C),
              (v[26] = y),
              (v[27] = e),
              (v[28] = x))
            : (x = v[28]));
        let l = N?.resolved_avatar_decoration;
        (v[29] !== C ||
        v[30] !== k.profileImage ||
        v[31] !== k.username ||
        v[32] !== k.walletAddress ||
        v[33] !== k.xUsername ||
        v[34] !== l
          ? ((p = (0, t.jsx)(A.S, {
              address: k.walletAddress,
              username: k.username,
              profileImage: k.profileImage,
              avatarDecoration: l,
              nameOverride: C,
              size: $,
              density: K,
              link: !1,
              hoverCard: !1,
              xUsername: k.xUsername,
              className: "min-w-0",
            })),
            (v[29] = C),
            (v[30] = k.profileImage),
            (v[31] = k.username),
            (v[32] = k.walletAddress),
            (v[33] = k.xUsername),
            (v[34] = l),
            (v[35] = p))
          : (p = v[35]),
          (c = "flex flex-col gap-0.5"));
        let i = (0, H.c)(
          "whitespace-nowrap text-sm font-medium leading-5 tabular-nums",
          s,
        );
        (v[36] !== k.pnlUsd
          ? ((a = (0, P.u)(k.pnlUsd)), (v[36] = k.pnlUsd), (v[37] = a))
          : (a = v[37]),
          (d = (0, t.jsx)("span", { className: i, children: a })),
          (n = (0, H.c)("text-xs leading-4 tabular-nums", s)),
          (v[6] = C),
          (v[7] = k.pnlUsd),
          (v[8] = k.profileImage),
          (v[9] = k.username),
          (v[10] = k.walletAddress),
          (v[11] = k.xUsername),
          (v[12] = y),
          (v[13] = N?.resolved_avatar_decoration),
          (v[14] = n),
          (v[15] = c),
          (v[16] = d),
          (v[17] = u),
          (v[18] = h),
          (v[19] = x),
          (v[20] = p));
      } else
        ((n = v[14]),
          (c = v[15]),
          (d = v[16]),
          (u = v[17]),
          (h = v[18]),
          (x = v[19]),
          (p = v[20]));
      return (
        v[38] !== k.pnlPercent
          ? ((g = (0, P.c)(k.pnlPercent)), (v[38] = k.pnlPercent), (v[39] = g))
          : (g = v[39]),
        v[40] !== n || v[41] !== g
          ? ((b = (0, t.jsx)("span", { className: n, children: g })),
            (v[40] = n),
            (v[41] = g),
            (v[42] = b))
          : (b = v[42]),
        v[43] !== b || v[44] !== c || v[45] !== d
          ? ((w = (0, t.jsxs)("div", { className: c, children: [d, b] })),
            (v[43] = b),
            (v[44] = c),
            (v[45] = d),
            (v[46] = w))
          : (w = v[46]),
        v[47] !== w || v[48] !== u || v[49] !== h || v[50] !== x || v[51] !== p
          ? ((_ = (0, t.jsxs)("div", {
              "data-search-tile": u,
              className: h,
              children: [x, p, w],
            })),
            (v[47] = w),
            (v[48] = u),
            (v[49] = h),
            (v[50] = x),
            (v[51] = p),
            (v[52] = _))
          : (_ = v[52]),
        _
      );
    },
    th = () => {
      let e,
        a,
        s,
        n = (0, r.c)(3);
      return (
        n[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, H.c)(ta, "min-w-40 hover:bg-bg-tertiary")), (n[0] = e))
          : (e = n[0]),
        n[1] === Symbol.for("react.memo_cache_sentinel")
          ? ((a = (0, t.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [
                (0, t.jsx)(T.l, { variant: "circle", size: $, className: ts }),
                (0, t.jsx)(T.l, { height: 14, width: 64, className: ts }),
              ],
            })),
            (n[1] = a))
          : (a = n[1]),
        n[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((s = (0, t.jsxs)("div", {
              "aria-hidden": !0,
              className: e,
              children: [
                a,
                (0, t.jsxs)("div", {
                  className: "flex flex-col gap-1 py-0.5",
                  children: [
                    (0, t.jsx)(T.l, { height: 14, width: 80, className: ts }),
                    (0, t.jsx)(T.l, { height: 12, width: 48, className: ts }),
                  ],
                }),
              ],
            })),
            (n[2] = s))
          : (s = n[2]),
        s
      );
    },
    tf = (e) => {
      let a,
        s,
        l,
        i,
        c,
        o,
        d,
        u,
        m,
        h,
        x,
        p,
        b,
        w,
        _,
        v,
        k,
        y = (0, r.c)(49),
        { coin: j, onClick: A, index: E } = e;
      y[0] !== j
        ? ((a = {
            mint: j.mint,
            chainId: j.chain_id,
            fallbackMarketCap: j.usd_market_cap,
            coin: j,
          }),
          (y[0] = j),
          (y[1] = a))
        : (a = y[1]);
      let I = (0, O.h)(a);
      (y[2] !== j.usd_market_cap
        ? ((s = j.usd_market_cap ? Number(j.usd_market_cap.toFixed(2)) : 0),
          (y[2] = j.usd_market_cap),
          (y[3] = s))
        : (s = y[3]),
        y[4] !== E || y[5] !== s
          ? ((l = {
              itemPosition: E,
              marketCap: s,
              sourceScreen: n.Ae.SEARCH,
              sourceElement: n.k9.ACTIVE_SEARCH_TRENDING_COIN_LIST,
            }),
            (y[4] = E),
            (y[5] = s),
            (y[6] = l))
          : (l = y[6]));
      let T = l,
        q = (0, L.f)(j.mint, T, void 0, n.k9.ACTIVE_SEARCH_TRENDING_COIN_LIST),
        { handleCoinClick: U } = (0, M.f)(),
        { setLastClickImpression: D } = (0, B.y)();
      y[7] !== j.chain_id
        ? ((i = { chainId: j.chain_id }), (y[7] = j.chain_id), (y[8] = i))
        : (i = y[8]);
      let {
        candlesticks: z,
        error: K,
        isLoading: F,
      } = (0, eN.f)(j.mint, j.created_timestamp ?? null, void 0, i);
      y[9] !== j.symbol
        ? ((c = (0, S.W)(j.symbol)), (y[9] = j.symbol), (y[10] = c))
        : (c = y[10]);
      let W = c,
        { prefetch: V, hoverProps: Q } = (0, R.W)(j),
        G = `/coin/${j.mint}`;
      (y[11] !== j.mint ||
      y[12] !== U ||
      y[13] !== T ||
      y[14] !== A ||
      y[15] !== D
        ? ((o = () => {
            (T && (D(j.mint, T), U(j.mint, T)), A());
          }),
          (y[11] = j.mint),
          (y[12] = U),
          (y[13] = T),
          (y[14] = A),
          (y[15] = D),
          (y[16] = o))
        : (o = y[16]),
        y[17] === Symbol.for("react.memo_cache_sentinel")
          ? ((d = (0, H.c)(ta, "focus-inset min-w-36")), (y[17] = d))
          : (d = y[17]),
        y[18] !== j
          ? ((u = (0, t.jsx)(N.CoinAvatar, {
              coin: j,
              size: $,
              hideCorner: !0,
            })),
            (y[18] = j),
            (y[19] = u))
          : (u = y[19]),
        y[20] !== j
          ? ((m = (0, t.jsx)(C.f, {
              coin: j,
              nameClassName: "text-sm leading-5",
            })),
            (y[20] = j),
            (y[21] = m))
          : (m = y[21]),
        y[22] !== W
          ? ((h = W
              ? (0, t.jsxs)("span", {
                  className: "truncate text-xs leading-4 text-text-quaternary",
                  children: ["$", W],
                })
              : null),
            (y[22] = W),
            (y[23] = h))
          : (h = y[23]),
        y[24] !== h || y[25] !== m
          ? ((x = (0, t.jsxs)("div", {
              className: "flex min-w-0 flex-col",
              children: [m, h],
            })),
            (y[24] = h),
            (y[25] = m),
            (y[26] = x))
          : (x = y[26]),
        y[27] !== x || y[28] !== u
          ? ((p = (0, t.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [u, x],
            })),
            (y[27] = x),
            (y[28] = u),
            (y[29] = p))
          : (p = y[29]),
        y[30] !== z || y[31] !== K || y[32] !== F
          ? ((b = (0, t.jsx)("div", {
              className: "pointer-events-none",
              children: (0, t.jsx)(g.f, {
                className: "h-12 w-full",
                data: z,
                error: K,
                isLoading: F,
              }),
            })),
            (y[30] = z),
            (y[31] = K),
            (y[32] = F),
            (y[33] = b))
          : (b = y[33]));
      let J = I ?? j.usd_market_cap;
      return (
        y[34] !== J
          ? ((w = (0, P.l)(J)), (y[34] = J), (y[35] = w))
          : (w = y[35]),
        y[36] !== w
          ? ((_ = (0, t.jsx)("span", {
              className:
                "text-sm font-medium leading-5 tabular-nums text-text-primary",
              children: w,
            })),
            (y[36] = w),
            (y[37] = _))
          : (_ = y[37]),
        y[38] !== Q ||
        y[39] !== V ||
        y[40] !== p ||
        y[41] !== b ||
        y[42] !== _ ||
        y[43] !== G ||
        y[44] !== o
          ? ((v = (0, t.jsxs)(f.default, {
              href: G,
              prefetch: V,
              ...Q,
              onClick: o,
              "data-search-tile": !0,
              className: d,
              children: [p, b, _],
            })),
            (y[38] = Q),
            (y[39] = V),
            (y[40] = p),
            (y[41] = b),
            (y[42] = _),
            (y[43] = G),
            (y[44] = o),
            (y[45] = v))
          : (v = y[45]),
        y[46] !== q || y[47] !== v
          ? ((k = (0, t.jsx)("div", {
              ref: q,
              className: "flex",
              children: v,
            })),
            (y[46] = q),
            (y[47] = v),
            (y[48] = k))
          : (k = y[48]),
        k
      );
    },
    tx = () => {
      let e,
        a,
        s,
        n,
        l = (0, r.c)(4);
      return (
        l[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, H.c)(ta, "min-w-36 hover:bg-bg-tertiary")), (l[0] = e))
          : (e = l[0]),
        l[1] === Symbol.for("react.memo_cache_sentinel")
          ? ((a = (0, t.jsx)(T.l, { variant: "art", size: $, className: ts })),
            (l[1] = a))
          : (a = l[1]),
        l[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((s = (0, t.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [
                a,
                (0, t.jsxs)("div", {
                  className: "flex flex-col gap-1",
                  children: [
                    (0, t.jsx)(T.l, { height: 14, width: 64, className: ts }),
                    (0, t.jsx)(T.l, { height: 12, width: 40, className: ts }),
                  ],
                }),
              ],
            })),
            (l[2] = s))
          : (s = l[2]),
        l[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((n = (0, t.jsxs)("div", {
              "aria-hidden": !0,
              className: e,
              children: [
                s,
                (0, t.jsx)(T.l, {
                  height: 48,
                  className: (0, H.c)("w-full", ts),
                }),
                (0, t.jsx)(T.l, { height: 14, width: 56, className: ts }),
              ],
            })),
            (l[3] = n))
          : (n = l[3]),
        n
      );
    },
    tp = (e) => {
      let s,
        n,
        l,
        i,
        c,
        o,
        d,
        u,
        m,
        h,
        f,
        x,
        g,
        b,
        w,
        _,
        v,
        k = (0, r.c)(50),
        {
          topTraders: y,
          topTradersLoading: j,
          trendingCoins: N,
          trendingLoading: C,
          onNavigate: S,
        } = e,
        { t: A } = (0, p.f)(),
        [E, I] = (0, a.useState)(eb),
        T = (function () {
          let e,
            t,
            s,
            n,
            l,
            i,
            c = (0, r.c)(14),
            [o, d] = (0, a.useState)(null);
          c[0] !== o
            ? ((e = (e) => {
                if (!o) return ef;
                o.addEventListener("scroll", e, { passive: !0 });
                let t =
                  "u" < typeof ResizeObserver ? null : new ResizeObserver(e);
                t?.observe(o);
                let r = new MutationObserver(e);
                return (
                  r.observe(o, { childList: !0 }),
                  () => {
                    (o.removeEventListener("scroll", e),
                      t?.disconnect(),
                      r.disconnect());
                  }
                );
              }),
              (c[0] = o),
              (c[1] = e))
            : (e = c[1]);
          let u = e;
          c[2] !== o
            ? ((t = () => {
                let e;
                return o
                  ? ((e = o.scrollWidth - o.clientWidth),
                    (o.scrollLeft <= 1) | (2 * (o.scrollLeft >= e - 1)))
                  : 3;
              }),
              (c[2] = o),
              (c[3] = t))
            : (t = c[3]);
          let m = (0, a.useSyncExternalStore)(u, t, eh);
          c[4] !== o
            ? ((s = (e) => {
                o &&
                  o.scrollBy({
                    left: e * o.clientWidth,
                    behavior: window.matchMedia?.(
                      "(prefers-reduced-motion: reduce)",
                    ).matches
                      ? "auto"
                      : "smooth",
                  });
              }),
              (c[4] = o),
              (c[5] = s))
            : (s = c[5]);
          let h = s,
            f = (1 & m) != 0,
            x = (2 & m) != 0;
          return (
            c[6] !== h
              ? ((n = () => h(-1)),
                (l = () => h(1)),
                (c[6] = h),
                (c[7] = n),
                (c[8] = l))
              : ((n = c[7]), (l = c[8])),
            c[9] !== f || c[10] !== x || c[11] !== n || c[12] !== l
              ? ((i = {
                  attachStrip: d,
                  atStart: f,
                  atEnd: x,
                  pagePrevious: n,
                  pageNext: l,
                }),
                (c[9] = f),
                (c[10] = x),
                (c[11] = n),
                (c[12] = l),
                (c[13] = i))
              : (i = c[13]),
            i
          );
        })();
      k[0] !== T
        ? (({ attachStrip: s, ...n } = T), (k[0] = T), (k[1] = s), (k[2] = n))
        : ((s = k[1]), (n = k[2]));
      let R = C || N.length > 0,
        M = j || y.length > 0;
      k[3] !== E || k[4] !== R || k[5] !== M
        ? ((i = (({ picked: e, available: t }) => {
            if (t[e]) return e;
            let r = "hot-coins" === e ? "top-traders" : "hot-coins";
            return t[r] ? r : null;
          })({
            picked: E,
            available: (l = { "hot-coins": R, "top-traders": M }),
          })),
          (k[3] = E),
          (k[4] = R),
          (k[5] = M),
          (k[6] = l),
          (k[7] = i))
        : ((l = k[6]), (i = k[7]));
      let L = i;
      k[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((c = (e) => {
            I(e);
            try {
              window.sessionStorage.setItem(ep, e);
            } catch {}
          }),
          (k[8] = c))
        : (c = k[8]);
      let P = c;
      k[9] !== L ||
      k[10] !== S ||
      k[11] !== y ||
      k[12] !== j ||
      k[13] !== N ||
      k[14] !== C
        ? ((o =
            "top-traders" === L
              ? j
                ? Array.from({ length: 5 }, tS)
                : y.map((e) =>
                    (0, t.jsx)(tm, { entry: e, onClick: S }, e.walletAddress),
                  )
              : "hot-coins" === L
                ? C
                  ? Array.from({ length: 5 }, tA)
                  : N.map((e, r) =>
                      (0, t.jsx)(tf, { coin: e, index: r, onClick: S }, e.mint),
                    )
                : null),
          (k[9] = L),
          (k[10] = S),
          (k[11] = y),
          (k[12] = j),
          (k[13] = N),
          (k[14] = C),
          (k[15] = o))
        : (o = k[15]);
      let O = o,
        U = "top-traders" === L ? "search-top-traders" : "search-hot-coins";
      k[16] !== A
        ? ((d = A("web.nav.discover")), (k[16] = A), (k[17] = d))
        : (d = k[17]);
      let D = L ?? E;
      k[18] !== A
        ? ((u = A("web.search.hot_coins")), (k[18] = A), (k[19] = u))
        : (u = k[19]);
      let z = !l["hot-coins"];
      (k[20] !== u || k[21] !== z
        ? ((m = { value: "hot-coins", label: u, disabled: z }),
          (k[20] = u),
          (k[21] = z),
          (k[22] = m))
        : (m = k[22]),
        k[23] !== A
          ? ((h = A("web.search.top_traders")), (k[23] = A), (k[24] = h))
          : (h = k[24]));
      let H = !l["top-traders"];
      return (
        k[25] !== h || k[26] !== H
          ? ((f = { value: "top-traders", label: h, disabled: H }),
            (k[25] = h),
            (k[26] = H),
            (k[27] = f))
          : (f = k[27]),
        k[28] !== m || k[29] !== f
          ? ((x = [m, f]), (k[28] = m), (k[29] = f), (k[30] = x))
          : (x = k[30]),
        k[31] !== x || k[32] !== d || k[33] !== D
          ? ((g = (0, t.jsx)(ey.X, {
              density: K,
              "aria-label": d,
              value: D,
              onValueChange: P,
              options: x,
            })),
            (k[31] = x),
            (k[32] = d),
            (k[33] = D),
            (k[34] = g))
          : (g = k[34]),
        k[35] !== L || k[36] !== n
          ? ((b = L ? (0, t.jsx)(ex, { density: K, ...n }) : void 0),
            (k[35] = L),
            (k[36] = n),
            (k[37] = b))
          : (b = k[37]),
        k[38] !== g || k[39] !== b
          ? ((w = (0, t.jsx)(q._, {
              density: K,
              titleAs: "span",
              truncateTitle: !1,
              title: g,
              className: Q,
              action: b,
            })),
            (k[38] = g),
            (k[39] = b),
            (k[40] = w))
          : (w = k[40]),
        k[41] !== L || k[42] !== s || k[43] !== O || k[44] !== A
          ? ((_ = L
              ? (0, t.jsx)(
                  "div",
                  {
                    ref: s,
                    className:
                      "flex gap-3 overflow-x-auto px-5 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                    children: O,
                  },
                  L,
                )
              : (0, t.jsx)(e_.L, {
                  density: K,
                  children: A("web.search.no_trending_coins"),
                })),
            (k[41] = L),
            (k[42] = s),
            (k[43] = O),
            (k[44] = A),
            (k[45] = _))
          : (_ = k[45]),
        k[46] !== w || k[47] !== _ || k[48] !== U
          ? ((v = (0, t.jsxs)("section", {
              className: "flex flex-col",
              "data-testid": U,
              children: [w, _],
            })),
            (k[46] = w),
            (k[47] = _),
            (k[48] = U),
            (k[49] = v))
          : (v = k[49]),
        v
      );
    };
  function tg() {
    var e;
    let c,
      u,
      m,
      { t: h } = (0, p.f)(),
      g = (0, e8.F)(),
      b = (0, e8.Z)(),
      [w, _] = (0, a.useState)(""),
      [v, k] = (0, a.useState)("all"),
      y = (0, e9.M)(),
      j = (0, a.useRef)(null),
      [N, C, S] = (() => {
        let e,
          t,
          a,
          s,
          n = (0, r.c)(10);
        n[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = []), (n[0] = e))
          : (e = n[0]);
        let [l, i] = (0, eM.j)("recently-searched-terms", e);
        n[1] !== l || n[2] !== i
          ? ((t = (e) => {
              let t = l.filter((t) => t !== e).slice(0, 19);
              i([e, ...t]);
            }),
            (n[1] = l),
            (n[2] = i),
            (n[3] = t))
          : (t = n[3]);
        let c = t;
        n[4] !== i
          ? ((a = () => {
              i([]);
            }),
            (n[4] = i),
            (n[5] = a))
          : (a = n[5]);
        let o = a;
        return (
          n[6] !== c || n[7] !== o || n[8] !== l
            ? ((s = [l, c, o]), (n[6] = c), (n[7] = o), (n[8] = l), (n[9] = s))
            : (s = n[9]),
          s
        );
      })(),
      [A, , E, I] = (0, eP.U)(),
      T = ((e, t) => {
        let a,
          s,
          n,
          l,
          i,
          c = (0, r.c)(18),
          o = (0, eZ.l)();
        c[0] !== o ? ((a = (0, eZ.M)(o)), (c[0] = o), (c[1] = a)) : (a = c[1]);
        let d = a;
        if (c[2] !== d || c[3] !== e) {
          let t;
          (c[5] !== d
            ? ((t = (e) => (d && (0, eY.a)(e) ? [] : [e.mint])),
              (c[5] = d),
              (c[6] = t))
            : (t = c[6]),
            (s = e.flatMap(t)),
            (c[2] = d),
            (c[3] = e),
            (c[4] = s));
        } else s = c[4];
        let u = s;
        c[7] !== d || c[8] !== e
          ? ((n = d ? e.flatMap(ty) : []), (c[7] = d), (c[8] = e), (c[9] = n))
          : (n = c[9]);
        let m = n,
          h = to(m, t && m.length > 0),
          f = !t || 0 === u.length;
        c[10] !== u || c[11] !== f
          ? ((l = { mints: u, includeNsfw: !0, disabled: f }),
            (c[10] = u),
            (c[11] = f),
            (c[12] = l))
          : (l = c[12]);
        let { coins: x } = (0, eQ.f)(l);
        e: {
          let t;
          if (0 === x.length && 0 === h.byAddress.size) {
            i = e;
            break e;
          }
          if (c[13] !== x || c[14] !== h || c[15] !== d || c[16] !== e) {
            let r = new Map(x.map(tj));
            ((t = e.map((e) =>
              d && (0, eY.a)(e)
                ? (h.byAddress.get(e.mint) ?? e)
                : (r.get((0, te.c)(e.mint)) ?? e),
            )),
              (c[13] = x),
              (c[14] = h),
              (c[15] = d),
              (c[16] = e),
              (c[17] = t));
          } else t = c[17];
          i = t;
        }
        return i;
      })(A, g),
      R = (0, i.k)(l.D.WEB_PACKS, !1),
      [L, , P] = (0, eL.f)(),
      O = (0, a.useMemo)(
        () =>
          (({ coins: e, viewedAtByMint: t = {}, cards: r }) =>
            [
              ...e.map((e, r) => ({
                item: { kind: "coin", coin: e },
                viewedAt: (0, eP.A)({ times: t, mint: e.mint }) ?? -r,
              })),
              ...r.map((e) => ({
                item: { kind: "card", card: e },
                viewedAt: e.viewedAt,
              })),
            ]
              .sort((e, t) => t.viewedAt - e.viewedAt)
              .map((e) => e.item))({
            coins: T,
            viewedAtByMint: I,
            cards: R ? L : [],
          }),
        [T, I, R, L],
      ),
      $ = A.length > 0 || (R && L.length > 0),
      { push: F } = (0, x.useRouter)(),
      { handleCoinClick: W } = (0, M.f)(),
      { setLastClickImpression: X } = (0, B.y)(),
      Y = (0, a.useRef)(null),
      er = (0, a.useRef)(null),
      ea = (0, a.useCallback)(() => {
        (Y.current?.abort(),
          (Y.current = null),
          (er.current = null),
          _(""),
          k("all"),
          b(!1));
      }, [b]),
      es = (0, a.useCallback)(
        (e) => {
          e ? b(!0) : ea();
        },
        [ea, b],
      ),
      el = (0, a.useCallback)(() => {
        g ? ea() : b(!0);
      }, [ea, g, b]),
      ei = (0, i.k)(l.D.WEB_SEARCH_MIXED_RESULTS),
      ed = (0, eZ.l)(),
      em = (0, eZ.k)(ed),
      eh = (0, eZ.M)(ed),
      ef = (0, a.useCallback)(
        async (e) => {
          (Y.current?.abort(), (Y.current = null));
          let t = (0, d.R)(e);
          if (!t || !(0, tr.f)(t)) return !1;
          let r = new AbortController();
          Y.current = r;
          let a = () => {
              Y.current === r && (Y.current = null);
            },
            s = () => Y.current === r && !r.signal.aborted,
            l = null,
            i = t,
            c = async () => {
              let e = await (0, eA.Q)(t, r.signal);
              if (!s()) return null;
              if (e) return "coin";
              let a = await (0, e1.isSolanaMintOnChain)(t, r.signal);
              return s()
                ? a
                  ? "coin"
                  : (0, tt.f)(t)
                    ? "profile"
                    : null
                : null;
            },
            u = await e4(t, r.signal);
          if (!s()) return (a(), "cancelled");
          let m = "fallback" !== u.kind;
          if (
            ("coin" === u.kind
              ? ((i = u.mint), (l = "coin"))
              : "user" === u.kind
                ? (l = "profile")
                : "external_wallet" === u.kind &&
                  (l = (0, tt.f)(t) ? "profile" : null),
            !m)
          )
            try {
              let e = !1,
                n = 0,
                o = await (0, eI.j)()("GET /coins-v3/{address}", {
                  params: { address: t },
                  query: {},
                  signal: r.signal,
                  throwHttpErrors: !1,
                  parseJson: (e) => {
                    try {
                      return JSON.parse(e);
                    } catch {
                      return null;
                    }
                  },
                  hooks: {
                    afterResponse: [
                      (t, r, a) => {
                        ((e = a.ok), (n = a.status));
                      },
                    ],
                  },
                });
              if (r.signal.aborted) return (a(), "cancelled");
              if (e) {
                if (!s()) return (a(), "cancelled");
                if (o?.mint) ((i = o.mint), (l = "coin"));
                else if (((l = await c()), !s())) return (a(), "cancelled");
              } else {
                if (404 !== n) return (a(), !1);
                if (!s() || ((l = await c()), !s())) return (a(), "cancelled");
              }
            } catch (e) {
              if ((a(), e instanceof DOMException && "AbortError" === e.name))
                return "cancelled";
              return !1;
            }
          if ((a(), null === l)) return !1;
          let h = er.current === t;
          if (((er.current = null), ea(), C(t), "coin" === l)) {
            (h && (0, z.pL)({ mint: i }),
              (0, z.iu)({ searchTerm: t, searchType: n.B8.COINS }));
            let e = {
              itemPosition: 0,
              marketCap: 0,
              sourceScreen: n.Ae.SEARCH,
              sourceElement: n.k9.SEARCH_INPUT,
            };
            (X(i, e, t), W(i, e, t), F(`/coin/${i}`));
          } else
            (h && (0, z.Cv)({ wallet: t }),
              (0, z.iu)({ searchTerm: t, searchType: n.B8.USERS }),
              F((0, o.$)(t)));
          return !0;
        },
        [C, ea, W, F, X],
      ),
      ex = (0, a.useCallback)(
        async (e) => {
          (Y.current?.abort(), (Y.current = null));
          let t = e.trim();
          if (!(0, te.h)(t)) return !1;
          let r = new AbortController();
          Y.current = r;
          let a = () => {
              Y.current === r && (Y.current = null);
            },
            s = null,
            l = await e4(t, r.signal);
          if (Y.current !== r || r.signal.aborted) return (a(), "cancelled");
          let i = "fallback" !== l.kind;
          if (("coin" === l.kind && (s = l.mint), !i))
            try {
              let e = !1,
                n = await (0, eI.j)()("GET /coins-v3/{address}", {
                  params: { address: t },
                  query: {},
                  signal: r.signal,
                  throwHttpErrors: !1,
                  parseJson: (e) => {
                    try {
                      return JSON.parse(e);
                    } catch {
                      return null;
                    }
                  },
                  hooks: {
                    afterResponse: [
                      (t, r, a) => {
                        e = a.ok;
                      },
                    ],
                  },
                });
              if (r.signal.aborted) return (a(), "cancelled");
              if (e) {
                if (Y.current !== r || r.signal.aborted)
                  return (a(), "cancelled");
                s = n?.mint ?? null;
              }
              if (!s) {
                let e = await (0, eA.Q)(t, r.signal);
                if (Y.current !== r || r.signal.aborted)
                  return (a(), "cancelled");
                e && (s = t);
              }
            } catch (e) {
              if ((a(), e instanceof DOMException && "AbortError" === e.name))
                return "cancelled";
              return !1;
            }
          if ((a(), !s)) return !1;
          let c = er.current === t;
          ((er.current = null),
            ea(),
            C(t),
            c && (0, z.pL)({ mint: s }),
            (0, z.iu)({ searchTerm: t, searchType: n.B8.COINS }));
          let o = {
            itemPosition: 0,
            marketCap: 0,
            sourceScreen: n.Ae.SEARCH,
            sourceElement: n.k9.SEARCH_INPUT,
          };
          return (X(s, o, t), W(s, o, t), F(`/coin/${s}`), !0);
        },
        [C, ea, W, F, X],
      ),
      ep = (0, a.useCallback)(
        async (e) => {
          (Y.current?.abort(), (Y.current = null));
          let t = em ? e7(e) : null;
          if (!t) return !1;
          let r = new AbortController();
          Y.current = r;
          let a = () => Y.current === r && !r.signal.aborted,
            s = (e) => (Y.current === r && (Y.current = null), e),
            l = null,
            i = t,
            c = await e4(t, r.signal);
          if (!a()) return s("cancelled");
          if ("coin" === c.kind) ((i = c.mint), (l = "coin"));
          else if ("user" === c.kind || "external_wallet" === c.kind)
            l = "profile";
          else
            try {
              let e = await (0, eS.k)({
                coinAddress: t,
                chainId: eY.W,
                fetchOptions: { signal: r.signal },
              });
              if (!a()) return s("cancelled");
              e.mint && (0, eY.X)(e) && ((i = e.mint), (l = "coin"));
            } catch (e) {
              if (
                !a() ||
                (e instanceof DOMException && "AbortError" === e.name)
              )
                return s("cancelled");
              return s(!1);
            }
          if ((s(!1), null === l)) return !1;
          let d = er.current === t;
          if (((er.current = null), ea(), C(t), "coin" === l)) {
            (d && (0, z.pL)({ mint: i }),
              (0, z.iu)({ searchTerm: t, searchType: n.B8.COINS }));
            let e = {
              itemPosition: 0,
              marketCap: 0,
              sourceScreen: n.Ae.SEARCH,
              sourceElement: n.k9.SEARCH_INPUT,
            };
            (X(i, e, t), W(i, e, t), F(`/coin/${i}`));
          } else
            (d && (0, z.Cv)({ wallet: t }),
              (0, z.iu)({ searchTerm: t, searchType: n.B8.USERS }),
              F((0, o.$)(t)));
          return !0;
        },
        [C, ea, W, em, F, X],
      ),
      eg = (0, a.useCallback)(
        async (e) => {
          (Y.current?.abort(), (Y.current = null));
          let t = eh ? ti(e) : null;
          if (!t) return !1;
          let r = new AbortController();
          Y.current = r;
          let a = () => Y.current === r && !r.signal.aborted,
            s = (e) => (Y.current === r && (Y.current = null), e),
            l = null,
            i = t,
            c = await e4(t, r.signal);
          if (!a()) return s("cancelled");
          if ("coin" === c.kind && "near" === c.chain)
            ((i = c.mint), (l = "coin"));
          else if ("user" === c.kind || "external_wallet" === c.kind)
            l = "profile";
          else
            try {
              let e = await (0, eS.k)({
                coinAddress: t,
                chainId: eY.d,
                fetchOptions: { signal: r.signal },
              });
              if (!a()) return s("cancelled");
              e.mint && ((i = e.mint), (l = "coin"));
            } catch (e) {
              if (
                !a() ||
                (e instanceof DOMException && "AbortError" === e.name)
              )
                return s("cancelled");
              return s(!1);
            }
          if ((s(!1), null === l)) return !1;
          let d = er.current === t;
          if (((er.current = null), ea(), C(t), "coin" === l)) {
            (d && (0, z.pL)({ mint: i }),
              (0, z.iu)({ searchTerm: t, searchType: n.B8.COINS }));
            let e = {
              itemPosition: 0,
              marketCap: 0,
              sourceScreen: n.Ae.SEARCH,
              sourceElement: n.k9.SEARCH_INPUT,
            };
            (X(i, e, t), W(i, e, t), F(`/coin/${i}`));
          } else
            (d && (0, z.Cv)({ wallet: t }),
              (0, z.iu)({ searchTerm: t, searchType: n.B8.USERS }),
              F((0, o.$)(t)));
          return !0;
        },
        [C, ea, W, eh, F, X],
      ),
      { data: eb = [], isLoading: ev } = (function (e) {
        let t,
          a,
          s = (0, r.c)(4);
        s[0] !== e
          ? ((t = void 0 === e ? {} : e), (s[0] = e), (s[1] = t))
          : (t = s[1]);
        let { queryOptions: n } = t;
        return (
          s[2] !== n
            ? ((a = {
                queryFn: eR,
                queryKey: eC.Q.TRENDING_COINS,
                staleTime: 3e5,
                gcTime: 6e5,
                refetchOnWindowFocus: !1,
                refetchOnMount: !1,
                ...n,
              }),
              (s[2] = n),
              (s[3] = a))
            : (a = s[3]),
          (0, eE.useQuery)(a)
        );
      })({ queryOptions: { enabled: g } }),
      { data: ey, isLoading: eN } = (function (e) {
        let t,
          a,
          s,
          n = (0, r.c)(9),
          { period: l, sort: i, limit: c, queryOptions: o } = e;
        return (
          n[0] !== c || n[1] !== l || n[2] !== i
            ? ((t = () => eT({ period: l, sort: i, limit: c })),
              (a = eC.Q.PNL_LEADERBOARD({ period: l, sort: i, limit: c })),
              (n[0] = c),
              (n[1] = l),
              (n[2] = i),
              (n[3] = t),
              (n[4] = a))
            : ((t = n[3]), (a = n[4])),
          n[5] !== o || n[6] !== t || n[7] !== a
            ? ((s = {
                queryFn: t,
                queryKey: a,
                staleTime: 3e5,
                gcTime: 6e5,
                refetchOnWindowFocus: !1,
                refetchOnMount: !1,
                ...o,
              }),
              (n[5] = o),
              (n[6] = t),
              (n[7] = a),
              (n[8] = s))
            : (s = n[8]),
          (0, eE.useQuery)(s)
        );
      })({
        period: "daily",
        sort: "combined",
        limit: 20,
        queryOptions: { enabled: g },
      }),
      eq = ey?.entries ?? [],
      e0 = (0, i.k)(l.D.WEB_PERPS, !1),
      { coins: e6, loading: ta } = (0, eV.f)({
        offset: 0,
        limit: 50,
        includeNsfw: y,
        isSearchMode: !0,
        searchTerm: w,
        includePerps: e0,
        onSearchSettled: (e) =>
          (0, z.iu)({
            searchTerm: e.searchTerm,
            searchType: n.B8.COINS,
            timeToLoadMs: e.timeToLoadMs,
            resultCount: e.resultCount,
          }),
      }),
      ts = (0, a.useMemo)(
        () => e6.filter((e) => !(0, D.x)(e) || null !== (0, U.K)(e)),
        [e6],
      ),
      tc = ts.filter((e) => (0, D.x)(e) || !0 === e.search_priority),
      td = tc.some((e) => !(0, D.x)(e)) ? tc : ts,
      tm = (0, a.useMemo)(
        () => (w ? td.filter((e) => !(0, D.x)(e)) : [...T, ...eb]),
        [w, td, T, eb],
      );
    (0, eJ.f)(tm, g);
    let {
        users: th,
        loading: tf,
        isSearchTermTooShort: tx,
        isDebouncing: tg,
        minSearchTermLength: tb,
      } = (0, eX.N)({ searchTerm: w }),
      tw = (0, eH.f)(),
      {
        squads: t_,
        loading: tv,
        isSearchTermTooShort: tk,
        isDebouncing: tN,
        minSearchTermLength: tC,
      } = ((e) => {
        let t,
          a,
          s,
          n,
          l,
          i,
          c,
          o = (0, r.c)(31),
          { searchTerm: d, enabled: u, pageSize: m } = e,
          h = void 0 === m ? eB.V : m,
          f = (0, eO.useClientServerContract)(),
          x = (0, ez.useQueryClient)(),
          p = (0, eH.f)();
        o[0] !== d
          ? ((t = d?.trim() ?? ""), (o[0] = d), (o[1] = t))
          : (t = o[1]);
        let [g] = (0, eM.r)(t, 500),
          b = (void 0 === u || u) && p,
          w = b && g.length < 2;
        o[2] !== g || o[3] !== b || o[4] !== d
          ? ((a = b && (d?.trim() ?? "") !== g),
            (o[2] = g),
            (o[3] = b),
            (o[4] = d),
            (o[5] = a))
          : (a = o[5]);
        let _ = a;
        (o[6] !== g || o[7] !== h
          ? ((s = eK.f.search(g, h)), (o[6] = g), (o[7] = h), (o[8] = s))
          : (s = o[8]),
          o[9] !== f || o[10] !== g || o[11] !== h || o[12] !== x
            ? ((n = async (e) => {
                let { pageParam: t, signal: r } = e,
                  a = await (0, eB.B)({
                    api: f,
                    searchTerm: g,
                    offset: t,
                    limit: h,
                    signal: r,
                  });
                for (let e of a)
                  x.setQueryData(eK.f.profile(e.userId), (0, eo.h)(e));
                return a;
              }),
              (o[9] = f),
              (o[10] = g),
              (o[11] = h),
              (o[12] = x),
              (o[13] = n))
            : (n = o[13]),
          o[14] !== h
            ? ((l = (e, t) => {
                if (e.length < h) return;
                let r = t.reduce(eF, 0);
                return r > eB.J ? void 0 : r;
              }),
              (o[14] = h),
              (o[15] = l))
            : (l = o[15]));
        let v = b && !w,
          k = w ? void 0 : eU.y;
        o[16] !== s || o[17] !== n || o[18] !== l || o[19] !== v || o[20] !== k
          ? ((i = {
              queryKey: s,
              queryFn: n,
              initialPageParam: 0,
              getNextPageParam: l,
              select: eW,
              enabled: v,
              staleTime: 3e4,
              refetchOnWindowFocus: !1,
              placeholderData: k,
            }),
            (o[16] = s),
            (o[17] = n),
            (o[18] = l),
            (o[19] = v),
            (o[20] = k),
            (o[21] = i))
          : (i = o[21]);
        let y = (0, eD.useInfiniteQuery)(i),
          j = p ? (y.data ?? e$) : e$,
          N = p && y.isFetching;
        return (
          o[22] !== _ ||
          o[23] !== w ||
          o[24] !== y.error ||
          o[25] !== y.fetchNextPage ||
          o[26] !== y.hasNextPage ||
          o[27] !== y.isFetchingNextPage ||
          o[28] !== j ||
          o[29] !== N
            ? ((c = {
                squads: j,
                loading: N,
                error: y.error,
                isSearchTermTooShort: w,
                isDebouncing: _,
                minSearchTermLength: 2,
                fetchNextPage: y.fetchNextPage,
                hasNextPage: y.hasNextPage,
                isFetchingNextPage: y.isFetchingNextPage,
              }),
              (o[22] = _),
              (o[23] = w),
              (o[24] = y.error),
              (o[25] = y.fetchNextPage),
              (o[26] = y.hasNextPage),
              (o[27] = y.isFetchingNextPage),
              (o[28] = j),
              (o[29] = N),
              (o[30] = c))
            : (c = o[30]),
          c
        );
      })({ searchTerm: w, enabled: tw }),
      tS = ta || tf || tv,
      tA = { coins: td.length, users: th.length, squads: t_.length },
      tE = td.length > 0 || th.length > 0 || t_.length > 0,
      tI = w.trim().length,
      tT = {
        coins: e3({
          rows: (0, a.useMemo)(() => {
            let e = td.findIndex((e) => (0, D.x)(e));
            if (e < e2) return td;
            let t = td[e];
            if (void 0 === t) return td;
            let r = td.filter((e) => e !== t);
            return [...r.slice(0, e2 - 1), t, ...r.slice(e2 - 1)];
          }, [td]),
          loading: ta,
        }),
        users: e3({ rows: th, loading: tf || tg, skipped: tI < tb }),
        squads: e3({ rows: t_, loading: tv || tN, skipped: !tw || tI < tC }),
      },
      tq = tT.coins.visible || tT.users.visible || tT.squads.visible,
      tR = tI < tb || (tw && tI < tC),
      tM = "all" === v ? "coins" : v,
      tL = ei
        ? (({ selected: e, visible: t }) => ("all" === e || t[e] ? e : "all"))({
            selected: v,
            visible: {
              coins: tT.coins.visible,
              users: tT.users.visible,
              squads: tT.squads.visible,
            },
          })
        : (({ selected: e, counts: t }) =>
            t[e] > 0 ? e : (e5.find((e) => t[e] > 0) ?? e))({
            selected: tM,
            counts: tA,
          }),
      tP = "all" === tL ? "coins" : tL,
      tO = (({ view: e, coinsVisible: t }) =>
        "all" === e ? t : "coins" === e)({
        view: tL,
        coinsVisible: tT.coins.visible,
      }),
      tU = [
        ...(ei
          ? [{ key: "all", label: h("common.all"), count: null, isEmpty: !1 }]
          : []),
        ...e5
          .filter((e) => "squads" !== e || tw)
          .map((e) => ({
            key: e,
            label: ((e, t) => {
              switch (e) {
                case "coins":
                  return t("search.coins");
                case "users":
                  return t("search.users");
                case "squads":
                  return t("search.squads");
              }
            })(e, h),
            count: ei && !tT[e].visible ? 0 : tA[e],
            isEmpty: ei ? !tT[e].visible : 0 === tA[e],
          })),
      ],
      tD = ei ? tq : !tS && tE,
      tz = ei ? !tq : !tS && !tE;
    (0, a.useEffect)(() => {
      g && (0, z.P8)();
    }, [g]);
    let tH = (0, a.useCallback)((e) => {
        if (((j.current = e), !e)) return;
        let t = e.closest('[role="dialog"]');
        t?.contains(document.activeElement) || e.focus();
      }, []),
      tB = async (e) => {
        e.preventDefault();
        let t = w.trim();
        if (!t) return;
        let r = await ef(t);
        if (!0 === r || "cancelled" === r) return;
        let a = await ex(t);
        if (!0 === a || "cancelled" === a) return;
        let s = await ep(t);
        if (!0 === s || "cancelled" === s) return;
        let n = await eg(t);
        if (!0 === n || "cancelled" === n) return;
        (ea(), C(t));
        let l = encodeURIComponent(t);
        F(`/explore?q=${l}`);
      };
    ((e = [
      { keys: ["Meta", "k"], callback: el },
      { keys: ["Control", "k"], callback: el },
      { keys: ["/"], callback: el },
    ]),
      (m = (0, r.c)(3))[0] !== e
        ? ((c = () => {
            let t = (t) => {
              let r = t.target,
                a =
                  "INPUT" === r.tagName ||
                  "TEXTAREA" === r.tagName ||
                  r.isContentEditable;
              e.forEach((e) => {
                let { keys: r, callback: s } = e,
                  n = r.map(eG),
                  l = new Set();
                (t.ctrlKey && l.add("control"),
                  t.shiftKey && l.add("shift"),
                  t.altKey && l.add("alt"),
                  t.metaKey && l.add("meta"),
                  t.key && l.add(t.key.toLowerCase()));
                let i = l.size === n.length && n.every((e) => l.has(e)),
                  c = t.ctrlKey || t.metaKey || t.altKey || t.shiftKey;
                (!a || c) && i && (t.preventDefault(), s());
              });
            };
            return (
              window.addEventListener("keydown", t),
              () => {
                window.removeEventListener("keydown", t);
              }
            );
          }),
          (u = [e]),
          (m[0] = e),
          (m[1] = c),
          (m[2] = u))
        : ((c = m[1]), (u = m[2])),
      (0, a.useEffect)(c, u));
    let tK = (e) => {
        (ei && !(0, D.x)(e) && C(e.mint), ea());
      },
      t$ = (e) => {
        (ei && e.address && (0, tr.f)(e.address) && C(e.address), ea());
      },
      tF = (e) => {
        (C(e.userId), ea());
      };
    return (0, t.jsxs)(ew.N, {
      open: g,
      onOpenChange: es,
      density: K,
      size: "lg",
      hideClose: !0,
      "aria-label": h("web.search.title"),
      className: "max-h-[85dvh]",
      "data-testid": "search-dialog",
      children: [
        (0, t.jsxs)("form", {
          onSubmit: tB,
          className: "shrink-0",
          children: [
            (0, t.jsx)(ek.o, {
              density: K,
              size: "hero",
              inputRef: tH,
              value: w,
              onValueChange: (e) => {
                (Y.current?.abort(),
                  (Y.current = null),
                  (er.current = null),
                  _(e));
              },
              onClear: () => (0, z.bG)({ searchTerm: w }),
              label: h("web.search.input_placeholder"),
              "aria-label": h("web.search.input_a11y"),
              name: "search-token",
              id: "search-token",
              autoComplete: "off",
              enterKeyHint: "search",
              onPaste: (e) => {
                let t = e.clipboardData.getData("text"),
                  r = (0, d.R)(t),
                  a = (0, te.h)(t.trim()) ? t.trim() : null,
                  s = em ? e7(t) : null,
                  n = eh ? ti(t) : null,
                  l = r && (0, tr.f)(r) ? r : (a ?? s ?? n);
                if (!l) return;
                (e.preventDefault(), (er.current = l));
                let i = j.current,
                  c = i?.value ?? w,
                  o = i?.selectionStart ?? c.length,
                  u = i?.selectionEnd ?? c.length;
                (_(c.slice(0, o) + l + c.slice(u)),
                  l === a ? ex(l) : l === s ? ep(l) : l === n ? eg(l) : ef(l));
              },
              className:
                "rounded-none border-0 border-b border-border-secondary bg-transparent",
            }),
            (0, t.jsx)("p", {
              className: "sr-only",
              children: h("web.search.dialog_description"),
            }),
          ],
        }),
        (0, t.jsxs)(ew.K, {
          className: (0, H.c)(
            G,
            "p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          ),
          children: [
            w
              ? null
              : (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(tp, {
                      topTraders: eq,
                      topTradersLoading: eN,
                      trendingCoins: eb,
                      trendingLoading: ev,
                      onNavigate: ea,
                    }),
                    (0, t.jsx)(tu, {
                      terms: N,
                      canExpand: ei,
                      onClear: S,
                      onNavigate: ea,
                    }),
                    (0, t.jsxs)("section", {
                      className: "flex flex-col",
                      "data-testid": "search-recently-viewed",
                      children: [
                        (0, t.jsx)(q._, {
                          density: K,
                          title: h("profile.recently_viewed"),
                          className: Q,
                          aside: (0, t.jsx)("button", {
                            type: "button",
                            className: V,
                            onClick: () => {
                              (E(), P());
                            },
                            disabled: !$,
                            children: h("common.clear"),
                          }),
                        }),
                        $
                          ? (0, t.jsx)("div", {
                              className: "flex flex-col",
                              children: O.map((e, r) =>
                                "card" === e.kind
                                  ? (0, t.jsx)(
                                      ec,
                                      { card: e.card, onClick: ea },
                                      `card:${e.card.nftAddress}`,
                                    )
                                  : (0, t.jsx)(
                                      Z,
                                      {
                                        coin: e.coin,
                                        index: r,
                                        sourceScreen: n.Ae.SEARCH,
                                        sourceElement: n.k9.RECENT_LIST,
                                        searchTerm: w,
                                        onClick: ea,
                                      },
                                      (0, te.c)(e.coin.mint),
                                    ),
                              ),
                            })
                          : (0, t.jsx)(e_.L, {
                              density: K,
                              children: h("web.search.no_recently_viewed"),
                            }),
                      ],
                    }),
                  ],
                }),
            w && !ei && tS ? (0, t.jsx)(et, { rows: 5, variant: J[tP] }) : null,
            w && tD
              ? (0, t.jsxs)("div", {
                  className: "flex flex-col",
                  "data-testid": "search-results",
                  children: [
                    (0, t.jsx)(ej.p, {
                      density: K,
                      "aria-label": h("web.search.filter_results_a11y"),
                      value: tL,
                      onValueChange: (e) => {
                        ("all" !== e &&
                          (0, z.mM)({ tab: "users" === e ? "accounts" : e }),
                          k(e));
                      },
                      tabs: tU.map((e) => ({
                        value: e.key,
                        label: e.label,
                        count: e.count,
                        disabled: e.isEmpty,
                        onClick: () => {
                          var t;
                          let r;
                          return (
                            (t = e.key),
                            (r = ei ? v : tM),
                            void (
                              tL === t &&
                              r !== t &&
                              ("all" !== t &&
                                (0, z.mM)({
                                  tab: "users" === t ? "accounts" : t,
                                }),
                              k(t))
                            )
                          );
                        },
                      })),
                    }),
                    ei && "all" === tL
                      ? (0, t.jsx)(eu, {
                          searchTerm: w,
                          coins: tT.coins,
                          users: tT.users,
                          squads: tT.squads,
                          onSeeAll: (e) => {
                            ((0, z.mM)({ tab: "users" === e ? "accounts" : e }),
                              k(e));
                          },
                          onCoinClick: tK,
                          onUserClick: t$,
                          onSquadClick: tF,
                        })
                      : ei && tT[tP].loading
                        ? (0, t.jsx)(et, { rows: 5, variant: J[tP] })
                        : "coins" === tP
                          ? (0, t.jsx)("div", {
                              className: "flex flex-col",
                              children: td.map((e, r) =>
                                (0, t.jsx)(
                                  Z,
                                  {
                                    coin: e,
                                    index: r,
                                    searchTerm: w,
                                    onClick: () => tK(e),
                                  },
                                  e.mint,
                                ),
                              ),
                            })
                          : "squads" === tP
                            ? (0, t.jsx)("div", {
                                className: "flex flex-col",
                                children: t_.map((e) =>
                                  (0, t.jsx)(
                                    en,
                                    {
                                      squad: (0, eo.h)(e),
                                      onClick: () => tF(e),
                                    },
                                    e.userId,
                                  ),
                                ),
                              })
                            : (0, t.jsx)("div", {
                                className: "flex flex-col",
                                children: th.map((e) =>
                                  (0, t.jsx)(
                                    ee,
                                    { user: e, onClick: () => t$(e) },
                                    e.userId ?? e.address,
                                  ),
                                ),
                              }),
                    tO
                      ? (0, t.jsxs)(f.default, {
                          href: `/explore?q=${encodeURIComponent(w.trim())}`,
                          className: tl,
                          onClick: () => {
                            (C(w.trim()), ea());
                          },
                          "data-testid": "search-view-all-results",
                          children: [
                            h("web.search.view_all_results"),
                            (0, t.jsx)(s.kK, {
                              "aria-hidden": !0,
                              className: "size-3 shrink-0 text-text-quaternary",
                            }),
                          ],
                        })
                      : null,
                  ],
                })
              : null,
            !w || !tz || tR || tx || tk
              ? null
              : (0, t.jsx)(e_.L, {
                  density: K,
                  children: h("web.search.no_results_for", { query: w }),
                }),
          ],
        }),
        (0, t.jsxs)(ew.c, {
          className: "justify-between",
          children: [
            (0, t.jsxs)("div", {
              className:
                "flex items-center gap-4 text-xs leading-4 text-text-tertiary",
              children: [
                (0, t.jsxs)("span", {
                  className: "flex items-center gap-1.5",
                  children: [
                    (0, t.jsx)("kbd", { className: tn, children: "↵" }),
                    (0, t.jsx)("span", {
                      children: h("web.search.kbd_to_search"),
                    }),
                  ],
                }),
                (0, t.jsxs)("span", {
                  className: "flex items-center gap-1.5",
                  children: [
                    (0, t.jsx)("kbd", { className: tn, children: "esc" }),
                    (0, t.jsx)("span", {
                      children: h("web.search.kbd_to_close"),
                    }),
                  ],
                }),
              ],
            }),
            (0, t.jsx)("kbd", { className: tn, children: "⌘K" }),
          ],
        }),
      ],
    });
  }
  function tb(e) {
    return {
      queryKey: eC.Q.COIN({
        coinAddress: e,
        includeDataLivestream: !1,
        chainId: eY.d,
      }),
      queryFn: () =>
        (0, eS.k)({ coinAddress: e, includeDataLivestream: !1, chainId: eY.d }),
      retry: !1,
      refetchOnWindowFocus: !1,
    };
  }
  function tw(e) {
    let { groupId: t } = e;
    return t ? [t] : [];
  }
  function t_(e) {
    let { candidate: t } = e;
    return t && "near" !== t.chain ? [t.address] : [];
  }
  function tv(e) {
    let { candidate: t } = e;
    return t?.chain === "near" ? [t.address] : [];
  }
  function tk(e) {
    return [(0, te.c)(e.mint), e];
  }
  function ty(e) {
    return (0, eY.a)(e) ? [e.mint] : [];
  }
  function tj(e) {
    return [(0, te.c)(e.mint), e];
  }
  function tN(e) {
    return "coin" === e.kind ? [e.coin] : [];
  }
  function tC(e) {
    return !e;
  }
  function tS(e, r) {
    return (0, t.jsx)(th, {}, r);
  }
  function tA(e, r) {
    return (0, t.jsx)(tx, {}, r);
  }
  e.s(
    [
      "SearchDialogLazy",
      0,
      function (e) {
        let s,
          n,
          l,
          i = (0, r.c)(4),
          { onMounted: c } = e;
        return (
          i[0] !== c
            ? ((s = () => {
                c();
              }),
              (n = [c]),
              (i[0] = c),
              (i[1] = s),
              (i[2] = n))
            : ((s = i[1]), (n = i[2])),
          (0, a.useEffect)(s, n),
          i[3] === Symbol.for("react.memo_cache_sentinel")
            ? ((l = (0, t.jsx)(tg, {})), (i[3] = l))
            : (l = i[3]),
          l
        );
      },
    ],
    238128,
  );
};
