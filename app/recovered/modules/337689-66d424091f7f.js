// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    r = e.i(426091),
    a = e.i(146695),
    i = e.i(598883),
    s = e.i(352386);
  e.i(12692);
  var n = e.i(398902);
  e.i(84455);
  var o = e.i(540805);
  e.i(107240);
  var d = e.i(693124),
    c = e.i(248496),
    u = e.i(690877),
    p = e.i(574472),
    m = e.i(466931);
  let f = null,
    x = null,
    h = (e, t, l, r = {}) => {
      let { revalidateSession: a } = (0, p.F)(),
        i = t(e),
        n = (0, s.useRef)(r.onSessionValid);
      ((n.current = r.onSessionValid),
        (0, s.useEffect)(() => {
          if (!i || "function" != typeof a) return;
          let e = !1;
          return (
            ((e, t) => {
              if (f) return f;
              if (null !== x && Date.now() - x < 1e4)
                return Promise.resolve("skipped");
              let l = e()
                .then(
                  (e) => (
                    (0, m.B)({
                      name: "session-revalidated-on-auth-error",
                      feature: "auth",
                      operation: t,
                      context: { result: e },
                    }),
                    e
                  ),
                  () => "ok",
                )
                .finally(() => {
                  ((f = null), (x = Date.now()));
                });
              return ((f = l), l);
            })(a, l).then((t) => {
              e || "ok" !== t || n.current?.();
            }),
            () => {
              e = !0;
            }
          );
        }, [i, e, a, l]));
    };
  e.s(["f", 0, h], 175190);
  var g = e.i(559015),
    y = e.i(541710),
    v = e.i(779106);
  let b = (e, t) => !(0, g.u)(t) && e < 1,
    w = (e, t) => {
      let l = (0, y.T)(e);
      return void 0 === l
        ? { chain: void 0, readable: !0 }
        : (0, y.m)(l, t)
          ? { chain: l, readable: !0 }
          : { chain: void 0, readable: !1 };
    },
    j = (e) => {
      let t,
        r,
        a,
        i,
        s,
        n,
        o = (0, l.c)(22),
        {
          mint: d,
          limit: c,
          includePositions: p,
          coinChain: m,
          enabled: f,
        } = e,
        x = void 0 === c ? 50 : c,
        j = void 0 !== p && p,
        N = (0, v.f)("followed-holders"),
        I = (0, y.l)();
      o[0] !== m || o[1] !== I
        ? ((t = w(m, I)), (o[0] = m), (o[1] = I), (o[2] = t))
        : (t = o[2]);
      let { chain: _, readable: k } = t,
        C = d ?? "";
      (o[3] !== _ ? ((r = _ ? [_] : []), (o[3] = _), (o[4] = r)) : (r = o[4]),
        o[5] !== j || o[6] !== x || o[7] !== C || o[8] !== r || o[9] !== N
          ? ((a = ["callouts", "followed-holders", N, C, x, j, ...r]),
            (o[5] = j),
            (o[6] = x),
            (o[7] = C),
            (o[8] = r),
            (o[9] = N),
            (o[10] = a))
          : (a = o[10]),
        o[11] !== _ || o[12] !== j || o[13] !== x || o[14] !== d
          ? ((i = (e) => {
              let { signal: t } = e;
              return (0, g.D)({
                mint: d ?? "",
                limit: x,
                includePositions: j,
                ...(_ ? { chain: _ } : {}),
                signal: t,
              });
            }),
            (o[11] = _),
            (o[12] = j),
            (o[13] = x),
            (o[14] = d),
            (o[15] = i))
          : (i = o[15]));
      let S = (void 0 === f || f) && k && !!d;
      o[16] !== a || o[17] !== i || o[18] !== S
        ? ((s = {
            queryKey: a,
            queryFn: i,
            enabled: S,
            staleTime: 6e4,
            retry: b,
          }),
          (o[16] = a),
          (o[17] = i),
          (o[18] = S),
          (o[19] = s))
        : (s = o[19]);
      let P = (0, u.useQuery)(s);
      return (
        o[20] !== P
          ? ((n = { onSessionValid: () => void P.refetch() }),
            (o[20] = P),
            (o[21] = n))
          : (n = o[21]),
        h(P.error, g.X, "followed-holders", n),
        P
      );
    };
  e.s(["f", 0, w, "E", 0, b, "q", 0, j], 106411);
  var N = e.i(927878),
    I = e.i(834247);
  e.i(267146);
  var _ = e.i(599432);
  let k = g.A,
    C = "grid grid-cols-[minmax(0,1fr)_3.75rem_7rem] items-center gap-x-2",
    S = { sm: 16, rail: 20, md: 24 },
    P = { sm: "size-4", rail: "size-5", md: "size-6" };
  function U(e) {
    let a,
      o,
      c,
      u,
      p,
      m,
      f,
      x,
      h,
      g,
      y,
      v,
      b = (0, l.c)(42),
      {
        mint: w,
        followedHolders: j,
        coin: N,
        avatarSize: I,
        popoverAlign: _,
        interactive: C,
        className: U,
      } = e,
      D = void 0 === I ? "md" : I,
      F = void 0 === _ ? "end" : _,
      { t: q } = (0, n.f)(),
      [M, z] = (0, s.useState)(!1),
      T = S[D],
      L = j.holders;
    if (b[0] !== T || b[1] !== j.holders || b[2] !== j.totalCount) {
      c = Symbol.for("react.early_return_sentinel");
      e: {
        let e,
          l = L.slice(0, k);
        if (0 === l.length || j.totalCount <= 0) {
          c = null;
          break e;
        }
        ((a = Math.min(j.totalCount - l.length, 99)),
          b[6] !== T
            ? ((e = (e) =>
                (0, t.jsx)(
                  d.S,
                  {
                    address: e.userId,
                    userId: e.userId,
                    username: e.username,
                    profileImage: e.profileImageUrl,
                    size: T,
                    facepile: !0,
                    link: !1,
                    hoverCard: !1,
                  },
                  e.userId,
                )),
              (b[6] = T),
              (b[7] = e))
            : (e = b[7]),
          (o = l.map(e)));
      }
      ((b[0] = T),
        (b[1] = j.holders),
        (b[2] = j.totalCount),
        (b[3] = a),
        (b[4] = o),
        (b[5] = c));
    } else ((a = b[3]), (o = b[4]), (c = b[5]));
    if (c !== Symbol.for("react.early_return_sentinel")) return c;
    (b[8] !== D || b[9] !== a
      ? ((u =
          a > 0
            ? (0, t.jsx)("span", {
                "data-testid": "followed-holders-overflow",
                className: "relative block rounded-full",
                children: (0, t.jsxs)("span", {
                  className: (0, r.c)(
                    "flex items-center justify-center rounded-full bg-bg-primary text-[11px] font-medium text-text-secondary",
                    P[D],
                  ),
                  children: [a, "+"],
                }),
              })
            : null),
        (b[8] = D),
        (b[9] = a),
        (b[10] = u))
      : (u = b[10]),
      b[11] !== o || b[12] !== u
        ? ((p = (0, t.jsxs)(t.Fragment, { children: [o, u] })),
          (b[11] = o),
          (b[12] = u),
          (b[13] = p))
        : (p = b[13]));
    let O = p;
    if (!(void 0 === C || C)) {
      let e, l, a;
      return (
        b[14] !== q
          ? ((e = q("web.callouts.followed_holders_title")),
            (b[14] = q),
            (b[15] = e))
          : (e = b[15]),
        b[16] !== U
          ? ((l = (0, r.c)(d.v, "pointer-events-none shrink-0", U)),
            (b[16] = U),
            (b[17] = l))
          : (l = b[17]),
        b[18] !== O || b[19] !== e || b[20] !== l
          ? ((a = (0, t.jsx)("span", {
              "aria-label": e,
              "data-testid": "followed-holders-facepile",
              "data-interactive": "false",
              className: l,
              children: O,
            })),
            (b[18] = O),
            (b[19] = e),
            (b[20] = l),
            (b[21] = a))
          : (a = b[21]),
        a
      );
    }
    return (
      b[22] !== q
        ? ((m = q("web.callouts.followed_holders_title")),
          (b[22] = q),
          (b[23] = m))
        : (m = b[23]),
      b[24] === Symbol.for("react.memo_cache_sentinel")
        ? ((f = (e) => {
            (e.stopPropagation(), e.preventDefault(), z(!0));
          }),
          (b[24] = f))
        : (f = b[24]),
      b[25] !== U
        ? ((x = (0, r.c)(d.v, "shrink-0", U)), (b[25] = U), (b[26] = x))
        : (x = b[26]),
      b[27] !== O || b[28] !== x || b[29] !== m
        ? ((h = (0, t.jsx)(i.b, {
            asChild: !0,
            children: (0, t.jsx)("button", {
              type: "button",
              "aria-label": m,
              "data-testid": "followed-holders-facepile",
              onClick: f,
              className: x,
              children: O,
            }),
          })),
          (b[27] = O),
          (b[28] = x),
          (b[29] = m),
          (b[30] = h))
        : (h = b[30]),
      b[31] !== N || b[32] !== M || b[33] !== w
        ? ((g = (0, t.jsx)(E, { mint: w, coin: N, open: M })),
          (b[31] = N),
          (b[32] = M),
          (b[33] = w),
          (b[34] = g))
        : (g = b[34]),
      b[35] !== F || b[36] !== g
        ? ((y = (0, t.jsx)(i.P, {
            side: "bottom",
            align: F,
            className: "w-80 p-3",
            onClick: A,
            children: g,
          })),
          (b[35] = F),
          (b[36] = g),
          (b[37] = y))
        : (y = b[37]),
      b[38] !== M || b[39] !== h || b[40] !== y
        ? ((v = (0, t.jsxs)(i.c, {
            open: M,
            onOpenChange: z,
            openDelay: 300,
            closeDelay: 150,
            children: [h, y],
          })),
          (b[38] = M),
          (b[39] = h),
          (b[40] = y),
          (b[41] = v))
        : (v = b[41]),
      v
    );
  }
  function A(e) {
    return e.stopPropagation();
  }
  function E(e) {
    let a,
      i,
      s,
      o,
      d,
      c,
      u,
      p,
      m = (0, l.c)(50),
      { mint: f, coin: x, open: h } = e,
      { t: y } = (0, n.f)(),
      v = x?.chain_id;
    m[0] !== f || m[1] !== h || m[2] !== v
      ? ((a = { mint: f, includePositions: !0, coinChain: v, enabled: h }),
        (m[0] = f),
        (m[1] = h),
        (m[2] = v),
        (m[3] = a))
      : (a = m[3]);
    let { data: b, isPending: w, isError: N } = j(a);
    (m[4] !== b?.followedHolders
      ? ((i = b?.followedHolders ?? []),
        (m[4] = b?.followedHolders),
        (m[5] = i))
      : (i = m[5]),
      m[6] !== b?.positions
        ? ((s = b?.positions ?? []), (m[6] = b?.positions), (m[7] = s))
        : (s = m[7]),
      m[8] !== i || m[9] !== s
        ? ((o = (0, g.F)(i, s)), (m[8] = i), (m[9] = s), (m[10] = o))
        : (o = m[10]));
    let I = o;
    if (N) {
      let e, l;
      (m[11] !== y
        ? ((e = y("web.callouts.holders_error")), (m[11] = y), (m[12] = e))
        : (e = m[12]),
        m[13] !== e
          ? ((l = (0, t.jsx)("p", {
              className: "py-3 text-xs text-text-tertiary",
              children: e,
            })),
            (m[13] = e),
            (m[14] = l))
          : (l = m[14]),
        (d = l));
    } else if (w || !b) {
      let e;
      (m[15] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)("div", {
            "aria-hidden": !0,
            "data-testid": "followed-holders-panel-skeleton",
            className: "flex flex-col gap-2 py-1",
            children: Array.from({ length: 3 }).map(D),
          })),
          (m[15] = e))
        : (e = m[15]),
        (d = e));
    } else if (0 === I.length) {
      let e, l;
      (m[16] !== y
        ? ((e = y("web.callouts.followed_holders_empty")),
          (m[16] = y),
          (m[17] = e))
        : (e = m[17]),
        m[18] !== e
          ? ((l = (0, t.jsx)("p", {
              className: "py-3 text-xs text-text-tertiary",
              children: e,
            })),
            (m[18] = e),
            (m[19] = l))
          : (l = m[19]),
        (d = l));
    } else {
      let e, l, a, i, s, n, o, c, u, p;
      (m[20] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, r.c)(
            C,
            "border-b border-border-secondary pb-2 text-[11px] font-medium text-text-tertiary",
          )),
          (m[20] = e))
        : (e = m[20]),
        m[21] !== y
          ? ((l = y("web.callouts.holder_column")), (m[21] = y), (m[22] = l))
          : (l = m[22]),
        m[23] !== l
          ? ((a = (0, t.jsx)("span", { children: l })),
            (m[23] = l),
            (m[24] = a))
          : (a = m[24]),
        m[25] !== y
          ? ((i = y("coin_details.position")), (m[25] = y), (m[26] = i))
          : (i = m[26]),
        m[27] !== i
          ? ((s = (0, t.jsx)("span", { children: i })),
            (m[27] = i),
            (m[28] = s))
          : (s = m[28]),
        m[29] !== y
          ? ((n = y("share.profile.pnl_label")), (m[29] = y), (m[30] = n))
          : (n = m[30]),
        m[31] !== n
          ? ((o = (0, t.jsx)("span", { children: n })),
            (m[31] = n),
            (m[32] = o))
          : (o = m[32]),
        m[33] !== o || m[34] !== a || m[35] !== s
          ? ((c = (0, t.jsxs)("div", { className: e, children: [a, s, o] })),
            (m[33] = o),
            (m[34] = a),
            (m[35] = s),
            (m[36] = c))
          : (c = m[36]),
        m[37] !== x || m[38] !== I
          ? ((u = (0, t.jsx)(F, { rows: I, coin: x })),
            (m[37] = x),
            (m[38] = I),
            (m[39] = u))
          : (u = m[39]),
        m[40] !== c || m[41] !== u
          ? ((p = (0, t.jsxs)(t.Fragment, { children: [c, u] })),
            (m[40] = c),
            (m[41] = u),
            (m[42] = p))
          : (p = m[42]),
        (d = p));
    }
    return (
      m[43] !== y
        ? ((c = y("web.callouts.followed_holders_title")),
          (m[43] = y),
          (m[44] = c))
        : (c = m[44]),
      m[45] !== c
        ? ((u = (0, t.jsx)("p", {
            className:
              "pb-2 text-[13px] font-medium leading-4 text-text-primary",
            children: c,
          })),
          (m[45] = c),
          (m[46] = u))
        : (u = m[46]),
      m[47] !== d || m[48] !== u
        ? ((p = (0, t.jsxs)("div", {
            "data-testid": "followed-holders-panel",
            children: [u, d],
          })),
          (m[47] = d),
          (m[48] = u),
          (m[49] = p))
        : (p = m[49]),
      p
    );
  }
  function D(e, l) {
    return (0, t.jsx)(c.l, { height: 32 }, l);
  }
  function F(e) {
    let r,
      a = (0, l.c)(3),
      { rows: i, coin: s } = e;
    return (
      a[0] !== s || a[1] !== i
        ? ((r = s
            ? (0, t.jsx)(q, { rows: i, coin: s })
            : (0, t.jsx)(M, { rows: i, pricePerTokenUsd: 0 })),
          (a[0] = s),
          (a[1] = i),
          (a[2] = r))
        : (r = a[2]),
      r
    );
  }
  function q(e) {
    let r,
      a,
      i = (0, l.c)(5),
      { rows: s, coin: n } = e;
    i[0] !== n ? ((r = { coin: n }), (i[0] = n), (i[1] = r)) : (r = i[1]);
    let o = (0, N.f)(r);
    return (
      i[2] !== o || i[3] !== s
        ? ((a = (0, t.jsx)(M, { rows: s, pricePerTokenUsd: o })),
          (i[2] = o),
          (i[3] = s),
          (i[4] = a))
        : (a = i[4]),
      a
    );
  }
  function M(e) {
    let r,
      a,
      i,
      s = (0, l.c)(10),
      { rows: o, pricePerTokenUsd: d } = e,
      { t: c } = (0, n.f)();
    if (
      (s[0] !== c
        ? ((r = c("web.callouts.followed_holders_title")),
          (s[0] = c),
          (s[1] = r))
        : (r = s[1]),
      s[2] !== d || s[3] !== o)
    ) {
      let e;
      (s[5] !== d
        ? ((e = (e) =>
            (0, t.jsx)(z, { row: e, pricePerTokenUsd: d }, e.userId)),
          (s[5] = d),
          (s[6] = e))
        : (e = s[6]),
        (a = o.map(e)),
        (s[2] = d),
        (s[3] = o),
        (s[4] = a));
    } else a = s[4];
    return (
      s[7] !== r || s[8] !== a
        ? ((i = (0, t.jsx)("ul", {
            "aria-label": r,
            className: "flex max-h-72 w-full flex-col overflow-y-auto",
            children: a,
          })),
          (s[7] = r),
          (s[8] = a),
          (s[9] = i))
        : (i = s[9]),
      i
    );
  }
  function z(e) {
    let i,
      s,
      c,
      u,
      p,
      m,
      f,
      x,
      h,
      g,
      y = (0, l.c)(32),
      { row: v, pricePerTokenUsd: b } = e,
      { t: w } = (0, n.f)();
    y[0] !== v.username
      ? ((i = v.username.trim() || null), (y[0] = v.username), (y[1] = i))
      : (i = y[1]);
    let j = i;
    y[2] !== v.userId || y[3] !== v.walletAddress
      ? ((s = (0, a.$)({ address: v.walletAddress, userId: v.userId })),
        (y[2] = v.userId),
        (y[3] = v.walletAddress),
        (y[4] = s))
      : (s = y[4]);
    let N = s,
      I = null !== v.amountHeld && b > 0 ? v.amountHeld * b : null;
    y[5] === Symbol.for("react.memo_cache_sentinel")
      ? ((c = (0, r.c)(
          C,
          "border-b border-border-secondary py-2 last:border-b-0",
        )),
        (y[5] = c))
      : (c = y[5]);
    let k = v.walletAddress,
      S = v.userId,
      P = v.profileImageUrl,
      U = v.resolvedAvatarDecoration;
    y[6] !== v ? ((u = (0, _.f)(v)), (y[6] = v), (y[7] = u)) : (u = y[7]);
    let A = !!N;
    return (
      y[8] !== v.walletAddress || y[9] !== w || y[10] !== j
        ? ((p =
            j ?? (v.walletAddress ? null : w("web.callouts.holder_column"))),
          (y[8] = v.walletAddress),
          (y[9] = w),
          (y[10] = j),
          (y[11] = p))
        : (p = y[11]),
      y[12] !== v.profileImageUrl ||
      y[13] !== v.resolvedAvatarDecoration ||
      y[14] !== v.userId ||
      y[15] !== v.walletAddress ||
      y[16] !== N ||
      y[17] !== u ||
      y[18] !== A ||
      y[19] !== p ||
      y[20] !== j
        ? ((m = (0, t.jsx)(d.S, {
            address: k,
            userId: S,
            username: j,
            profileImage: P,
            avatarDecoration: U,
            size: 24,
            density: "terminal",
            verified: u,
            link: A,
            href: N,
            nameOverride: p,
            className: "min-w-0",
          })),
          (y[12] = v.profileImageUrl),
          (y[13] = v.resolvedAvatarDecoration),
          (y[14] = v.userId),
          (y[15] = v.walletAddress),
          (y[16] = N),
          (y[17] = u),
          (y[18] = A),
          (y[19] = p),
          (y[20] = j),
          (y[21] = m))
        : (m = y[21]),
      y[22] !== I
        ? ((f = null != I && Number.isFinite(I) ? (0, o.l)(I) : "—"),
          (y[22] = I),
          (y[23] = f))
        : (f = y[23]),
      y[24] !== f
        ? ((x = (0, t.jsx)("span", {
            className: "text-xs tabular-nums text-text-secondary",
            children: f,
          })),
          (y[24] = f),
          (y[25] = x))
        : (x = y[25]),
      y[26] !== v.pnlUsd
        ? ((h = (0, t.jsx)("span", {
            children:
              null == v.pnlUsd
                ? (0, t.jsx)("span", {
                    className: "text-xs text-text-tertiary",
                    children: "—",
                  })
                : (0, t.jsx)("span", {
                    className: (0, r.c)(
                      "whitespace-nowrap text-xs font-medium tabular-nums",
                      (0, o.k)(v.pnlUsd),
                    ),
                    children: (0, o.u)(v.pnlUsd),
                  }),
          })),
          (y[26] = v.pnlUsd),
          (y[27] = h))
        : (h = y[27]),
      y[28] !== m || y[29] !== x || y[30] !== h
        ? ((g = (0, t.jsxs)("li", {
            "data-testid": "followed-holders-panel-row",
            className: c,
            children: [m, x, h],
          })),
          (y[28] = m),
          (y[29] = x),
          (y[30] = h),
          (y[31] = g))
        : (g = y[31]),
      g
    );
  }
  e.s(
    [
      "$",
      0,
      function (e) {
        let r,
          a,
          i,
          s,
          n,
          o = (0, l.c)(21),
          {
            mint: d,
            isLoggedIn: c,
            excludeWalletAddress: u,
            coin: p,
            avatarSize: m,
            className: f,
          } = e,
          x = p?.followed_holders,
          h = p?.chain_id,
          y = c && void 0 === x;
        o[0] !== d || o[1] !== h || o[2] !== y
          ? ((r = { mint: d, limit: g.A, coinChain: h, enabled: y }),
            (o[0] = d),
            (o[1] = h),
            (o[2] = y),
            (o[3] = r))
          : (r = o[3]);
        let { data: v } = j(r);
        o[4] !== v || o[5] !== x
          ? ((a =
              void 0 !== x
                ? x
                : v
                  ? { holders: v.followedHolders, totalCount: v.totalCount }
                  : null),
            (o[4] = v),
            (o[5] = x),
            (o[6] = a))
          : (a = o[6]);
        let b = a;
        if (!b || 0 === b.holders.length) return null;
        if (o[7] !== u || o[8] !== b.holders) {
          let e;
          (o[10] !== u
            ? ((e = (e) => !(0, I.f)(e.walletAddress, u)),
              (o[10] = u),
              (o[11] = e))
            : (e = o[11]),
            (i = b.holders.filter(e)),
            (o[7] = u),
            (o[8] = b.holders),
            (o[9] = i));
        } else i = o[9];
        let w = i;
        if (0 === w.length) return null;
        let N = b.holders.length - w.length,
          _ = Math.max(b.totalCount - N, w.length);
        return (
          o[12] !== w || o[13] !== _
            ? ((s = { holders: w, totalCount: _ }),
              (o[12] = w),
              (o[13] = _),
              (o[14] = s))
            : (s = o[14]),
          o[15] !== m ||
          o[16] !== f ||
          o[17] !== p ||
          o[18] !== d ||
          o[19] !== s
            ? ((n = (0, t.jsx)(U, {
                mint: d,
                followedHolders: s,
                coin: p,
                avatarSize: m,
                className: f,
              })),
              (o[15] = m),
              (o[16] = f),
              (o[17] = p),
              (o[18] = d),
              (o[19] = s),
              (o[20] = n))
            : (n = o[20]),
          n
        );
      },
      "E",
      0,
      U,
      "g",
      0,
      E,
    ],
    337689,
  );
};
