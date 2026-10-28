// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    a = e.i(292686),
    s = e.i(545063),
    i = e.i(574472),
    r = e.i(352386);
  e.i(12692);
  var l = e.i(398902),
    m = e.i(896024),
    c = e.i(690877),
    o = e.i(38279),
    d = e.i(759257);
  async function u(e) {
    let { window: t, fetchOptions: n } = e;
    return (0, d.j)()("GET /mayhem/top-traders", {
      query: { window: t },
      ...n,
      throwHttpErrors: !1,
      hooks: {
        afterResponse: [
          (e, t, n) => {
            if (!n.ok) throw Error("Failed to fetch mayhem top traders");
          },
        ],
      },
    });
  }
  function h(e) {
    let t,
      a,
      s,
      i = (0, n.c)(7),
      { window: r, queryOptions: l } = e;
    return (
      i[0] !== r
        ? ((t = () => u({ window: r })),
          (a = o.Q.MAYHEM_TOP_TRADERS(r)),
          (i[0] = r),
          (i[1] = t),
          (i[2] = a))
        : ((t = i[1]), (a = i[2])),
      i[3] !== l || i[4] !== t || i[5] !== a
        ? ((s = {
            queryFn: t,
            queryKey: a,
            refetchOnMount: !0,
            refetchOnWindowFocus: !0,
            ...l,
          }),
          (i[3] = l),
          (i[4] = t),
          (i[5] = a),
          (i[6] = s))
        : (s = i[6]),
      (0, c.useQuery)(s)
    );
  }
  var x = e.i(576766),
    f = e.i(303599),
    p = e.i(595673),
    b = e.i(338319),
    y = e.i(90832),
    _ = e.i(618860),
    g = e.i(146695),
    v = e.i(365089),
    w = e.i(98525),
    j = e.i(179736),
    N = e.i(458310),
    k = e.i(875737),
    S = e.i(31802);
  e.i(107240);
  var E = e.i(693124),
    M = e.i(425890),
    C = e.i(84674);
  function A(e) {
    return (0, g.d)(e.address, e.user?.username);
  }
  function R(e) {
    let t = e.user;
    return t?.username?.trim()
      ? t.username.startsWith("@")
        ? t.username
        : `@${t.username}`
      : (0, v.d)(e.address, 4, 4);
  }
  function O(e) {
    return !!e.user?.username?.trim();
  }
  function I(e) {
    let a,
      s = (0, n.c)(3),
      i = (0, M.f)();
    return (
      s[0] !== e || s[1] !== i
        ? ((a = i ? (0, t.jsx)(T, { ...e }) : (0, t.jsx)(F, { ...e })),
          (s[0] = e),
          (s[1] = i),
          (s[2] = a))
        : (a = s[2]),
      a
    );
  }
  function T(e) {
    let a,
      s,
      i,
      r,
      l,
      m,
      c = (0, n.c)(25),
      { trader: o, size: d, className: u, nameClassName: h, rank: x } = e,
      f = void 0 === d ? "md" : d,
      b = o.address,
      y = o.user?.userId,
      _ = o.user?.username,
      g = o.user?.profile_image,
      v = o.user?.resolved_avatar_decoration;
    return (
      c[0] !== o ? ((a = R(o)), (c[0] = o), (c[1] = a)) : (a = c[1]),
      c[2] !== o.user
        ? ((s = o.user?.x_username
            ? (0, t.jsx)(k.f, { xUsername: o.user.x_username, iconOnly: !0 })
            : void 0),
          (c[2] = o.user),
          (c[3] = s))
        : (s = c[3]),
      c[4] !== o ? ((i = O(o)), (c[4] = o), (c[5] = i)) : (i = c[5]),
      c[6] !== o ? ((r = A(o)), (c[6] = o), (c[7] = r)) : (r = c[7]),
      c[8] !== x || c[9] !== o.address
        ? ((l = () => (0, p.Qz)({ address: o.address, leaderboardRank: x })),
          (c[8] = x),
          (c[9] = o.address),
          (c[10] = l))
        : (l = c[10]),
      c[11] !== u ||
      c[12] !== h ||
      c[13] !== f ||
      c[14] !== r ||
      c[15] !== l ||
      c[16] !== y ||
      c[17] !== _ ||
      c[18] !== g ||
      c[19] !== v ||
      c[20] !== a ||
      c[21] !== s ||
      c[22] !== i ||
      c[23] !== o.address
        ? ((m = (0, t.jsx)(E.S, {
            address: b,
            userId: y,
            username: _,
            profileImage: g,
            avatarDecoration: v,
            nameOverride: a,
            verified: "lookup",
            trailing: s,
            link: i,
            href: r,
            onClick: l,
            size: f,
            nameClassName: h,
            className: u,
          })),
          (c[11] = u),
          (c[12] = h),
          (c[13] = f),
          (c[14] = r),
          (c[15] = l),
          (c[16] = y),
          (c[17] = _),
          (c[18] = g),
          (c[19] = v),
          (c[20] = a),
          (c[21] = s),
          (c[22] = i),
          (c[23] = o.address),
          (c[24] = m))
        : (m = c[24]),
      m
    );
  }
  function U(e) {
    let a,
      s,
      i,
      r = (0, n.c)(10),
      { user: l, address: m, size: c } = e,
      o = l?.profile_image?.trim() ? l.profile_image : null;
    r[0] !== m || r[1] !== l?.username
      ? ((a = (l?.username?.trim() || m)
          .replace(/^@/, "")
          .charAt(0)
          .toUpperCase()),
        (r[0] = m),
        (r[1] = l?.username),
        (r[2] = a))
      : (a = r[2]);
    let d = a;
    r[3] !== m
      ? ((s = (function (e) {
          let t = 0;
          for (let n = 0; n < e.length; n++) t = (31 * t + e.charCodeAt(n)) | 0;
          return Math.abs(t) % 360;
        })(m)),
        (r[3] = m),
        (r[4] = s))
      : (s = r[4]);
    let u = s;
    return (
      r[5] !== u || r[6] !== d || r[7] !== c || r[8] !== o
        ? ((i = o
            ? (0, t.jsx)("img", {
                src: o,
                alt: "",
                width: c,
                height: c,
                className: "flex-shrink-0 rounded-full object-cover",
                style: { width: c, height: c },
              })
            : (0, t.jsx)("span", {
                className: (0, b.c)(
                  "flex flex-shrink-0 items-center justify-center rounded-full font-semibold text-white",
                ),
                style: {
                  width: c,
                  height: c,
                  backgroundColor: `hsl(${u} 60% 45%)`,
                  fontSize: Math.max(10, Math.floor(0.4 * c)),
                },
                "aria-hidden": !0,
                children: d,
              })),
          (r[5] = u),
          (r[6] = d),
          (r[7] = c),
          (r[8] = o),
          (r[9] = i))
        : (i = r[9]),
      i
    );
  }
  function F(e) {
    let a,
      s,
      i,
      r,
      l,
      m,
      c,
      o,
      d,
      u,
      h,
      x = (0, n.c)(38),
      { trader: f, avatarSize: y, className: _, nameClassName: g, rank: v } = e,
      S = void 0 === y ? 28 : y,
      E = (0, j.s)(f.user?.userId ?? f.address);
    (x[0] !== S || x[1] !== f.address || x[2] !== f.user
      ? ((a = (0, t.jsx)(U, { user: f.user, address: f.address, size: S })),
        (x[0] = S),
        (x[1] = f.address),
        (x[2] = f.user),
        (x[3] = a))
      : (a = x[3]),
      x[4] !== g
        ? ((s = (0, b.c)("truncate", g)), (x[4] = g), (x[5] = s))
        : (s = x[5]),
      x[6] !== f ? ((i = R(f)), (x[6] = f), (x[7] = i)) : (i = x[7]),
      x[8] !== s || x[9] !== i
        ? ((r = (0, t.jsx)("span", { className: s, children: i })),
          (x[8] = s),
          (x[9] = i),
          (x[10] = r))
        : (r = x[10]),
      x[11] !== a || x[12] !== r
        ? ((l = (0, t.jsxs)(t.Fragment, { children: [a, r] })),
          (x[11] = a),
          (x[12] = r),
          (x[13] = l))
        : (l = x[13]));
    let M = l,
      C = f.user?.x_username;
    x[14] !== E || x[15] !== C
      ? ((m =
          E || C
            ? (0, t.jsxs)("span", {
                className: "flex shrink-0 items-center gap-1.5",
                children: [
                  E ? (0, t.jsx)(w.f, { size: 18 }) : null,
                  C ? (0, t.jsx)(k.f, { xUsername: C, iconOnly: !0 }) : null,
                ],
              })
            : null),
        (x[14] = E),
        (x[15] = C),
        (x[16] = m))
      : (m = x[16]);
    let I = m;
    if (!O(f)) {
      let e, n;
      return (
        x[17] !== _
          ? ((e = (0, b.c)("flex items-center", _)), (x[17] = _), (x[18] = e))
          : (e = x[18]),
        x[19] !== M || x[20] !== I || x[21] !== e
          ? ((n = (0, t.jsxs)("div", { className: e, children: [M, I] })),
            (x[19] = M),
            (x[20] = I),
            (x[21] = e),
            (x[22] = n))
          : (n = x[22]),
        n
      );
    }
    return (
      x[23] !== _
        ? ((c = (0, b.c)("flex items-center", _)), (x[23] = _), (x[24] = c))
        : (c = x[24]),
      x[25] !== f ? ((o = A(f)), (x[25] = f), (x[26] = o)) : (o = x[26]),
      x[27] !== v || x[28] !== f.address
        ? ((d = () => (0, p.Qz)({ address: f.address, leaderboardRank: v })),
          (x[27] = v),
          (x[28] = f.address),
          (x[29] = d))
        : (d = x[29]),
      x[30] !== M || x[31] !== d || x[32] !== o
        ? ((u = (0, t.jsx)(N.default, {
            href: o,
            className: "flex min-w-0 items-center gap-3",
            onClick: d,
            children: M,
          })),
          (x[30] = M),
          (x[31] = d),
          (x[32] = o),
          (x[33] = u))
        : (u = x[33]),
      x[34] !== I || x[35] !== u || x[36] !== c
        ? ((h = (0, t.jsxs)("div", { className: c, children: [u, I] })),
          (x[34] = I),
          (x[35] = u),
          (x[36] = c),
          (x[37] = h))
        : (h = x[37]),
      h
    );
  }
  function $(e) {
    let a,
      s = (0, n.c)(13),
      {
        trader: i,
        isLoggedIn: r,
        isSelf: m,
        initialIsFollowing: c,
        variant: o,
      } = e,
      d = void 0 === o ? "row" : o,
      { t: u } = (0, l.f)();
    if (m) return null;
    if (!O(i)) {
      let e, n, a, r;
      return (
        s[0] !== i.address
          ? ((e = (0, C.B)(i.address)), (s[0] = i.address), (s[1] = e))
          : (e = s[1]),
        s[2] !== u
          ? ((n = u("web.mayhem.solscan")), (s[2] = u), (s[3] = n))
          : (n = s[3]),
        s[4] === Symbol.for("react.memo_cache_sentinel")
          ? ((a = (0, t.jsx)("svg", {
              width: "10",
              height: "10",
              viewBox: "0 0 13 13",
              fill: "none",
              "aria-hidden": !0,
              children: (0, t.jsx)("path", {
                d: "M3.5 9.5l6-6M4.5 3.5h5v5",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
              }),
            })),
            (s[4] = a))
          : (a = s[4]),
        s[5] !== e || s[6] !== n
          ? ((r = (0, t.jsxs)("a", {
              href: e,
              target: "_blank",
              rel: "noopener noreferrer",
              className:
                "inline-flex items-center gap-1 whitespace-nowrap font-medium text-text-tertiary text-xs hover:text-text-secondary hover:underline",
              children: [n, a],
            })),
            (s[5] = e),
            (s[6] = n),
            (s[7] = r))
          : (r = s[7]),
        r
      );
    }
    return (
      s[8] !== c || s[9] !== r || s[10] !== i.address || s[11] !== d
        ? ((a = (0, t.jsx)(S.f, {
            userAddress: i.address,
            mayhemVariant: d,
            isLoggedIn: r,
            initialIsFollowing: c,
          })),
          (s[8] = c),
          (s[9] = r),
          (s[10] = i.address),
          (s[11] = d),
          (s[12] = a))
        : (a = s[12]),
      a
    );
  }
  function L(e) {
    return null == e ? "—" : e >= 0 ? `+${(0, y.w)(e)}` : (0, y.w)(e);
  }
  function z(e) {
    let a,
      s,
      i,
      r,
      l,
      m,
      c,
      o,
      d,
      u,
      h,
      x,
      f,
      p,
      y = (0, n.c)(38),
      {
        trader: g,
        displayRank: v,
        activeWindow: w,
        isLoggedIn: j,
        isSelf: N,
        initialIsFollowing: k,
      } = e,
      S = "24h" === w ? g.pnl24hUsd : g.pnl7dUsd,
      E = "24h" === w ? g.pnl7dUsd : g.pnl24hUsd,
      M = "24h" === w ? "7d" : "24h",
      C = "24h" === w ? g.winRate24h : g.winRate7d;
    if (
      (y[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, b.c)(
            "grid h-[68px] grid-cols-[1.625rem_minmax(0,1fr)_auto_auto] items-center gap-2.5 border-t px-4 transition-colors first:border-t-0 sm:grid-cols-[2rem_minmax(0,1fr)_auto_5.75rem] sm:gap-3.5 sm:px-[22px]",
            _.N,
            _.f,
          )),
          (y[0] = a))
        : (a = y[0]),
      y[1] !== v
        ? ((s = (0, t.jsx)("span", { className: _.C, children: v })),
          (y[1] = v),
          (y[2] = s))
        : (s = y[2]),
      y[3] !== v || y[4] !== g
        ? ((i = (0, t.jsx)(I, {
            trader: g,
            size: "lg",
            avatarSize: 40,
            className: "min-w-0 gap-3",
            nameClassName: "text-[15px] font-semibold text-text-primary",
            rank: v,
          })),
          (y[3] = v),
          (y[4] = g),
          (y[5] = i))
        : (i = y[5]),
      y[6] !== C
        ? ((r = null != C ? `${(100 * C).toFixed(1)}% win` : ""),
          (y[6] = C),
          (y[7] = r))
        : (r = y[7]),
      y[8] !== r
        ? ((l = (0, t.jsx)("span", {
            className:
              "hidden shrink-0 text-[13px] text-text-tertiary tabular-nums sm:inline",
            children: r,
          })),
          (y[8] = r),
          (y[9] = l))
        : (l = y[9]),
      y[10] !== i || y[11] !== l
        ? ((m = (0, t.jsxs)("div", {
            className: "flex min-w-0 items-center gap-2.5",
            children: [i, l],
          })),
          (y[10] = i),
          (y[11] = l),
          (y[12] = m))
        : (m = y[12]),
      y[13] !== S)
    )
      ((c = (0, b.c)(
        "font-semibold text-sm tabular-nums sm:text-[15px]",
        null == S ? "text-text-tertiary" : S >= 0 ? "text-gain" : "text-loss",
      )),
        (y[13] = S),
        (y[14] = c));
    else c = y[14];
    return (
      y[15] !== S ? ((o = L(S)), (y[15] = S), (y[16] = o)) : (o = y[16]),
      y[17] !== c || y[18] !== o
        ? ((d = (0, t.jsx)("span", { className: c, children: o })),
          (y[17] = c),
          (y[18] = o),
          (y[19] = d))
        : (d = y[19]),
      y[20] !== M || y[21] !== E
        ? ((u =
            null != E
              ? (0, t.jsxs)(t.Fragment, { children: [M, " ", L(E)] })
              : null),
          (y[20] = M),
          (y[21] = E),
          (y[22] = u))
        : (u = y[22]),
      y[23] !== u
        ? ((h = (0, t.jsx)("span", {
            className:
              "min-h-4 text-[11px] text-text-tertiary tabular-nums sm:text-xs",
            children: u,
          })),
          (y[23] = u),
          (y[24] = h))
        : (h = y[24]),
      y[25] !== h || y[26] !== d
        ? ((x = (0, t.jsxs)("div", {
            className: "flex flex-col items-end",
            children: [d, h],
          })),
          (y[25] = h),
          (y[26] = d),
          (y[27] = x))
        : (x = y[27]),
      y[28] !== k || y[29] !== j || y[30] !== N || y[31] !== g
        ? ((f = (0, t.jsx)("div", {
            className: "flex justify-end",
            children: (0, t.jsx)($, {
              trader: g,
              isLoggedIn: j,
              isSelf: N,
              initialIsFollowing: k,
              variant: "card",
            }),
          })),
          (y[28] = k),
          (y[29] = j),
          (y[30] = N),
          (y[31] = g),
          (y[32] = f))
        : (f = y[32]),
      y[33] !== x || y[34] !== f || y[35] !== s || y[36] !== m
        ? ((p = (0, t.jsxs)("div", { className: a, children: [s, m, x, f] })),
          (y[33] = x),
          (y[34] = f),
          (y[35] = s),
          (y[36] = m),
          (y[37] = p))
        : (p = y[37]),
      p
    );
  }
  var H = e.i(693618);
  let P = ["24h", "7d"];
  function D(e) {
    return e.address;
  }
  function Y() {
    let e,
      a = (0, n.c)(1);
    return (
      a[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)("div", {
            className: "animate-pulse",
            children: Array.from({ length: 5 }).map(q),
          })),
          (a[0] = e))
        : (e = a[0]),
      e
    );
  }
  function q(e, n) {
    return (0, t.jsx)(
      "div",
      { className: (0, b.c)("h-[68px] border-t first:border-t-0", _.N) },
      n,
    );
  }
  e.s(
    [
      "MayhemTradersSection",
      0,
      function () {
        let e,
          c,
          o,
          d,
          u,
          y,
          g,
          v,
          w,
          j,
          N = (0, n.c)(54),
          { t: k } = (0, l.f)(),
          [S, E] = (0, r.useState)("24h");
        N[0] !== k
          ? ((e = P.map((e) => ({
              value: e,
              label:
                "24h" === e
                  ? k("web.mayhem.window_24h")
                  : k("web.mayhem.window_7d"),
            }))),
            (N[0] = k),
            (N[1] = e))
          : (e = N[1]);
        let M = e,
          { address: C } = (0, i.F)(),
          A = (0, s.$)(),
          R = !!C,
          I = (0, f.o)();
        N[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((c = { window: "24h", queryOptions: { refetchInterval: 6e4 } }),
            (N[2] = c))
          : (c = N[2]);
        let T = h(c);
        N[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((o = { window: "7d", queryOptions: { refetchInterval: 6e4 } }),
            (N[3] = o))
          : (o = N[3]);
        let U = h(o);
        if (N[4] !== T.data?.items || N[5] !== U.data?.items) {
          let e = new Map();
          for (let t of T.data?.items ?? [])
            e.set(t.address, {
              address: t.address,
              user: void 0,
              rank24h: t.rank,
              rank7d: void 0,
              pnl24hUsd: t.realisedPnlUsd,
              pnl7dUsd: void 0,
              winRate24h: t.winRate,
              winRate7d: void 0,
            });
          for (let t of U.data?.items ?? []) {
            let n = e.get(t.address);
            n
              ? ((n.rank7d = t.rank),
                (n.pnl7dUsd = t.realisedPnlUsd),
                (n.winRate7d = t.winRate))
              : e.set(t.address, {
                  address: t.address,
                  user: void 0,
                  rank24h: void 0,
                  rank7d: t.rank,
                  pnl24hUsd: void 0,
                  pnl7dUsd: t.realisedPnlUsd,
                  winRate24h: void 0,
                  winRate7d: t.winRate,
                });
          }
          ((d = Array.from(e.values())),
            (N[4] = T.data?.items),
            (N[5] = U.data?.items),
            (N[6] = d));
        } else d = N[6];
        let F = d;
        N[7] !== S
          ? ((u = (e) => ("24h" === S ? e.pnl24hUsd : e.pnl7dUsd) ?? -1 / 0),
            (N[7] = S),
            (N[8] = u))
          : (u = N[8]);
        let $ = u;
        if (N[9] !== F || N[10] !== $) {
          let e;
          (N[12] !== $
            ? ((e = (e, t) => $(t) - $(e)), (N[12] = $), (N[13] = e))
            : (e = N[13]),
            (y = [...F].toSorted(e)),
            (N[9] = F),
            (N[10] = $),
            (N[11] = y));
        } else y = N[11];
        let L = y;
        N[14] !== L ? ((g = L.map(D)), (N[14] = L), (N[15] = g)) : (g = N[15]);
        let q = g;
        N[16] !== q
          ? ((v = { userAddresses: q }), (N[16] = q), (N[17] = v))
          : (v = N[17]);
        let { data: V, isLoading: W } = (0, x.f)(v);
        if (N[18] !== L || N[19] !== V) {
          let e = new Map();
          for (let t of V ?? []) e.set(t.address, t);
          ((w = L.map((t) => ({ ...t, user: e.get(t.address) })).filter(O)),
            (N[18] = L),
            (N[19] = V),
            (N[20] = w));
        } else w = N[20];
        let B = w,
          K = T.isLoading || U.isLoading || (q.length > 0 && W),
          G = T.isError && U.isError,
          Q = "24h" === S ? T.data?.updatedAt : U.data?.updatedAt;
        if (
          N[21] !== S ||
          N[22] !== B ||
          N[23] !== G ||
          N[24] !== K ||
          N[25] !== R ||
          N[26] !== A ||
          N[27] !== k ||
          N[28] !== M ||
          N[29] !== Q ||
          N[30] !== I
        ) {
          let e,
            n,
            s,
            i,
            r,
            l,
            c,
            o,
            d,
            u,
            h = B.slice(0, 5);
          (N[32] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, b.c)(_.O, "flex flex-col overflow-hidden pb-1.5")),
              (N[32] = e))
            : (e = N[32]),
            N[33] === Symbol.for("react.memo_cache_sentinel")
              ? ((n = (0, b.c)(_.F, "whitespace-nowrap")), (N[33] = n))
              : (n = N[33]),
            N[34] !== k
              ? ((s = k("web.mayhem.top_traders")), (N[34] = k), (N[35] = s))
              : (s = N[35]),
            N[36] !== s
              ? ((i = (0, t.jsx)("h2", { className: n, children: s })),
                (N[36] = s),
                (N[37] = i))
              : (i = N[37]),
            N[38] !== k || N[39] !== Q
              ? ((r = Q
                  ? (0, t.jsx)("span", {
                      className: (0, b.c)(_.k, "whitespace-nowrap"),
                      children: k("web.mayhem.updated_time_ago", {
                        time: (0, H.f)(Q),
                      }),
                    })
                  : null),
                (N[38] = k),
                (N[39] = Q),
                (N[40] = r))
              : (r = N[40]),
            N[41] !== k
              ? ((l = k("web.mayhem.trader_window_aria")),
                (N[41] = k),
                (N[42] = l))
              : (l = N[42]),
            N[43] === Symbol.for("react.memo_cache_sentinel")
              ? ((c = (e) => {
                  ((0, p.gh)({
                    tabName: `window:${e}`,
                    sourceElement: a.k9.MAYHEM_TOP_TRADERS_FEED,
                  }),
                    E(e));
                }),
                (N[43] = c))
              : (c = N[43]),
            N[44] !== S || N[45] !== l || N[46] !== M
              ? ((o = (0, t.jsx)(m.f, {
                  items: M,
                  value: S,
                  ariaLabel: l,
                  onValueChange: c,
                })),
                (N[44] = S),
                (N[45] = l),
                (N[46] = M),
                (N[47] = o))
              : (o = N[47]),
            N[48] !== r || N[49] !== o
              ? ((d = (0, t.jsxs)("div", {
                  className: "flex items-center gap-3",
                  children: [r, o],
                })),
                (N[48] = r),
                (N[49] = o),
                (N[50] = d))
              : (d = N[50]),
            N[51] !== i || N[52] !== d
              ? ((u = (0, t.jsxs)("div", {
                  className:
                    "flex flex-wrap items-center justify-between gap-x-3 gap-y-2.5 px-4 pt-4 pb-3 sm:px-[22px] sm:pt-5 sm:pb-3.5",
                  children: [i, d],
                })),
                (N[51] = i),
                (N[52] = d),
                (N[53] = u))
              : (u = N[53]),
            (j = (0, t.jsxs)("div", {
              className: e,
              children: [
                u,
                K
                  ? (0, t.jsx)(Y, {})
                  : G
                    ? (0, t.jsx)("p", {
                        className:
                          "px-4 py-6 text-sm text-text-tertiary sm:px-[22px]",
                        children: k("web.mayhem.traders_unavailable"),
                      })
                    : 0 === h.length
                      ? (0, t.jsx)("p", {
                          className:
                            "px-4 py-6 text-sm text-text-tertiary sm:px-[22px]",
                          children: k("web.mayhem.traders_empty"),
                        })
                      : (0, t.jsx)("div", {
                          children: h.map((e, n) =>
                            (0, t.jsx)(
                              z,
                              {
                                trader: e,
                                displayRank: n + 1,
                                activeWindow: S,
                                isLoggedIn: R,
                                isSelf: A(e.address),
                                initialIsFollowing: I.isFollowing(e.address),
                              },
                              e.address,
                            ),
                          ),
                        }),
              ],
            })),
            (N[21] = S),
            (N[22] = B),
            (N[23] = G),
            (N[24] = K),
            (N[25] = R),
            (N[26] = A),
            (N[27] = k),
            (N[28] = M),
            (N[29] = Q),
            (N[30] = I),
            (N[31] = j));
        } else j = N[31];
        return j;
      },
      "MayhemTradersSkeleton",
      0,
      function () {
        let e,
          a = (0, n.c)(1);
        return (
          a[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, t.jsx)("div", {
                className: (0, b.c)(_.O, "h-[422px] animate-pulse"),
              })),
              (a[0] = e))
            : (e = a[0]),
          e
        );
      },
    ],
    905868,
  );
};
