// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(426091),
    r = e.i(146695),
    a = e.i(598883),
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
  let h = null,
    f = null,
    x = (e, t, i, l = {}) => {
      let { revalidateSession: r } = (0, p.F)(),
        a = t(e),
        n = (0, s.useRef)(l.onSessionValid);
      ((n.current = l.onSessionValid),
        (0, s.useEffect)(() => {
          if (!a || "function" != typeof r) return;
          let e = !1;
          return (
            ((e, t) => {
              if (h) return h;
              if (null !== f && Date.now() - f < 1e4)
                return Promise.resolve("skipped");
              let i = e()
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
                  ((h = null), (f = Date.now()));
                });
              return ((h = i), i);
            })(r, i).then((t) => {
              e || "ok" !== t || n.current?.();
            }),
            () => {
              e = !0;
            }
          );
        }, [a, e, r, i]));
    };
  e.s(["f", 0, x], 175190);
  var y = e.i(559015),
    v = e.i(541710),
    b = e.i(779106);
  let g = (e, t) => !(0, y.u)(t) && e < 1,
    w = (e, t) => {
      let i = (0, v.T)(e);
      return void 0 === i
        ? { chain: void 0, readable: !0 }
        : (0, v.m)(i, t)
          ? { chain: i, readable: !0 }
          : { chain: void 0, readable: !1 };
    },
    _ = (e) => {
      let t,
        l,
        r,
        a,
        s,
        n,
        o = (0, i.c)(22),
        {
          mint: d,
          limit: c,
          includePositions: p,
          coinChain: m,
          enabled: h,
        } = e,
        f = void 0 === c ? 50 : c,
        _ = void 0 !== p && p,
        k = (0, b.f)("followed-holders"),
        S = (0, v.l)();
      o[0] !== m || o[1] !== S
        ? ((t = w(m, S)), (o[0] = m), (o[1] = S), (o[2] = t))
        : (t = o[2]);
      let { chain: j, readable: C } = t,
        N = d ?? "";
      (o[3] !== j ? ((l = j ? [j] : []), (o[3] = j), (o[4] = l)) : (l = o[4]),
        o[5] !== _ || o[6] !== f || o[7] !== N || o[8] !== l || o[9] !== k
          ? ((r = ["callouts", "followed-holders", k, N, f, _, ...l]),
            (o[5] = _),
            (o[6] = f),
            (o[7] = N),
            (o[8] = l),
            (o[9] = k),
            (o[10] = r))
          : (r = o[10]),
        o[11] !== j || o[12] !== _ || o[13] !== f || o[14] !== d
          ? ((a = (e) => {
              let { signal: t } = e;
              return (0, y.D)({
                mint: d ?? "",
                limit: f,
                includePositions: _,
                ...(j ? { chain: j } : {}),
                signal: t,
              });
            }),
            (o[11] = j),
            (o[12] = _),
            (o[13] = f),
            (o[14] = d),
            (o[15] = a))
          : (a = o[15]));
      let F = (void 0 === h || h) && C && !!d;
      o[16] !== r || o[17] !== a || o[18] !== F
        ? ((s = {
            queryKey: r,
            queryFn: a,
            enabled: F,
            staleTime: 6e4,
            retry: g,
          }),
          (o[16] = r),
          (o[17] = a),
          (o[18] = F),
          (o[19] = s))
        : (s = o[19]);
      let A = (0, u.useQuery)(s);
      return (
        o[20] !== A
          ? ((n = { onSessionValid: () => void A.refetch() }),
            (o[20] = A),
            (o[21] = n))
          : (n = o[21]),
        x(A.error, y.X, "followed-holders", n),
        A
      );
    };
  e.s(["f", 0, w, "E", 0, g, "q", 0, _], 106411);
  var k = e.i(927878),
    S = e.i(834247);
  e.i(267146);
  var j = e.i(599432);
  let C = y.A,
    N = "grid grid-cols-[minmax(0,1fr)_3.75rem_7rem] items-center gap-x-2",
    F = { sm: 16, rail: 20, md: 24 },
    A = { sm: "size-4", rail: "size-5", md: "size-6" };
  function I(e) {
    let r,
      o,
      c,
      u,
      p,
      m,
      h,
      f,
      x,
      y,
      v,
      b,
      g = (0, i.c)(42),
      {
        mint: w,
        followedHolders: _,
        coin: k,
        avatarSize: S,
        popoverAlign: j,
        interactive: N,
        className: I,
      } = e,
      U = void 0 === S ? "md" : S,
      E = void 0 === j ? "end" : j,
      { t: P } = (0, n.f)(),
      [M, q] = (0, s.useState)(!1),
      R = F[U],
      W = _.holders;
    if (g[0] !== R || g[1] !== _.holders || g[2] !== _.totalCount) {
      c = Symbol.for("react.early_return_sentinel");
      e: {
        let e,
          i = W.slice(0, C);
        if (0 === i.length || _.totalCount <= 0) {
          c = null;
          break e;
        }
        ((r = Math.min(_.totalCount - i.length, 99)),
          g[6] !== R
            ? ((e = (e) =>
                (0, t.jsx)(
                  d.S,
                  {
                    address: e.userId,
                    userId: e.userId,
                    username: e.username,
                    profileImage: e.profileImageUrl,
                    size: R,
                    facepile: !0,
                    link: !1,
                    hoverCard: !1,
                  },
                  e.userId,
                )),
              (g[6] = R),
              (g[7] = e))
            : (e = g[7]),
          (o = i.map(e)));
      }
      ((g[0] = R),
        (g[1] = _.holders),
        (g[2] = _.totalCount),
        (g[3] = r),
        (g[4] = o),
        (g[5] = c));
    } else ((r = g[3]), (o = g[4]), (c = g[5]));
    if (c !== Symbol.for("react.early_return_sentinel")) return c;
    (g[8] !== U || g[9] !== r
      ? ((u =
          r > 0
            ? (0, t.jsx)("span", {
                "data-testid": "followed-holders-overflow",
                className: "relative block rounded-full",
                children: (0, t.jsxs)("span", {
                  className: (0, l.c)(
                    "flex items-center justify-center rounded-full bg-bg-primary text-[11px] font-medium text-text-secondary",
                    A[U],
                  ),
                  children: [r, "+"],
                }),
              })
            : null),
        (g[8] = U),
        (g[9] = r),
        (g[10] = u))
      : (u = g[10]),
      g[11] !== o || g[12] !== u
        ? ((p = (0, t.jsxs)(t.Fragment, { children: [o, u] })),
          (g[11] = o),
          (g[12] = u),
          (g[13] = p))
        : (p = g[13]));
    let B = p;
    if (!(void 0 === N || N)) {
      let e, i, r;
      return (
        g[14] !== P
          ? ((e = P("web.callouts.followed_holders_title")),
            (g[14] = P),
            (g[15] = e))
          : (e = g[15]),
        g[16] !== I
          ? ((i = (0, l.c)(d.v, "pointer-events-none shrink-0", I)),
            (g[16] = I),
            (g[17] = i))
          : (i = g[17]),
        g[18] !== B || g[19] !== e || g[20] !== i
          ? ((r = (0, t.jsx)("span", {
              "aria-label": e,
              "data-testid": "followed-holders-facepile",
              "data-interactive": "false",
              className: i,
              children: B,
            })),
            (g[18] = B),
            (g[19] = e),
            (g[20] = i),
            (g[21] = r))
          : (r = g[21]),
        r
      );
    }
    return (
      g[22] !== P
        ? ((m = P("web.callouts.followed_holders_title")),
          (g[22] = P),
          (g[23] = m))
        : (m = g[23]),
      g[24] === Symbol.for("react.memo_cache_sentinel")
        ? ((h = (e) => {
            (e.stopPropagation(), e.preventDefault(), q(!0));
          }),
          (g[24] = h))
        : (h = g[24]),
      g[25] !== I
        ? ((f = (0, l.c)(d.v, "shrink-0", I)), (g[25] = I), (g[26] = f))
        : (f = g[26]),
      g[27] !== B || g[28] !== f || g[29] !== m
        ? ((x = (0, t.jsx)(a.b, {
            asChild: !0,
            children: (0, t.jsx)("button", {
              type: "button",
              "aria-label": m,
              "data-testid": "followed-holders-facepile",
              onClick: h,
              className: f,
              children: B,
            }),
          })),
          (g[27] = B),
          (g[28] = f),
          (g[29] = m),
          (g[30] = x))
        : (x = g[30]),
      g[31] !== k || g[32] !== M || g[33] !== w
        ? ((y = (0, t.jsx)(T, { mint: w, coin: k, open: M })),
          (g[31] = k),
          (g[32] = M),
          (g[33] = w),
          (g[34] = y))
        : (y = g[34]),
      g[35] !== E || g[36] !== y
        ? ((v = (0, t.jsx)(a.P, {
            side: "bottom",
            align: E,
            className: "w-80 p-3",
            onClick: D,
            children: y,
          })),
          (g[35] = E),
          (g[36] = y),
          (g[37] = v))
        : (v = g[37]),
      g[38] !== M || g[39] !== x || g[40] !== v
        ? ((b = (0, t.jsxs)(a.c, {
            open: M,
            onOpenChange: q,
            openDelay: 300,
            closeDelay: 150,
            children: [x, v],
          })),
          (g[38] = M),
          (g[39] = x),
          (g[40] = v),
          (g[41] = b))
        : (b = g[41]),
      b
    );
  }
  function D(e) {
    return e.stopPropagation();
  }
  function T(e) {
    let r,
      a,
      s,
      o,
      d,
      c,
      u,
      p,
      m = (0, i.c)(50),
      { mint: h, coin: f, open: x } = e,
      { t: v } = (0, n.f)(),
      b = f?.chain_id;
    m[0] !== h || m[1] !== x || m[2] !== b
      ? ((r = { mint: h, includePositions: !0, coinChain: b, enabled: x }),
        (m[0] = h),
        (m[1] = x),
        (m[2] = b),
        (m[3] = r))
      : (r = m[3]);
    let { data: g, isPending: w, isError: k } = _(r);
    (m[4] !== g?.followedHolders
      ? ((a = g?.followedHolders ?? []),
        (m[4] = g?.followedHolders),
        (m[5] = a))
      : (a = m[5]),
      m[6] !== g?.positions
        ? ((s = g?.positions ?? []), (m[6] = g?.positions), (m[7] = s))
        : (s = m[7]),
      m[8] !== a || m[9] !== s
        ? ((o = (0, y.F)(a, s)), (m[8] = a), (m[9] = s), (m[10] = o))
        : (o = m[10]));
    let S = o;
    if (k) {
      let e, i;
      (m[11] !== v
        ? ((e = v("web.callouts.holders_error")), (m[11] = v), (m[12] = e))
        : (e = m[12]),
        m[13] !== e
          ? ((i = (0, t.jsx)("p", {
              className: "py-3 text-xs text-text-tertiary",
              children: e,
            })),
            (m[13] = e),
            (m[14] = i))
          : (i = m[14]),
        (d = i));
    } else if (w || !g) {
      let e;
      (m[15] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)("div", {
            "aria-hidden": !0,
            "data-testid": "followed-holders-panel-skeleton",
            className: "flex flex-col gap-2 py-1",
            children: Array.from({ length: 3 }).map(U),
          })),
          (m[15] = e))
        : (e = m[15]),
        (d = e));
    } else if (0 === S.length) {
      let e, i;
      (m[16] !== v
        ? ((e = v("web.callouts.followed_holders_empty")),
          (m[16] = v),
          (m[17] = e))
        : (e = m[17]),
        m[18] !== e
          ? ((i = (0, t.jsx)("p", {
              className: "py-3 text-xs text-text-tertiary",
              children: e,
            })),
            (m[18] = e),
            (m[19] = i))
          : (i = m[19]),
        (d = i));
    } else {
      let e, i, r, a, s, n, o, c, u, p;
      (m[20] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, l.c)(
            N,
            "border-b border-border-secondary pb-2 text-[11px] font-medium text-text-tertiary",
          )),
          (m[20] = e))
        : (e = m[20]),
        m[21] !== v
          ? ((i = v("web.callouts.holder_column")), (m[21] = v), (m[22] = i))
          : (i = m[22]),
        m[23] !== i
          ? ((r = (0, t.jsx)("span", { children: i })),
            (m[23] = i),
            (m[24] = r))
          : (r = m[24]),
        m[25] !== v
          ? ((a = v("coin_details.position")), (m[25] = v), (m[26] = a))
          : (a = m[26]),
        m[27] !== a
          ? ((s = (0, t.jsx)("span", { children: a })),
            (m[27] = a),
            (m[28] = s))
          : (s = m[28]),
        m[29] !== v
          ? ((n = v("share.profile.pnl_label")), (m[29] = v), (m[30] = n))
          : (n = m[30]),
        m[31] !== n
          ? ((o = (0, t.jsx)("span", { children: n })),
            (m[31] = n),
            (m[32] = o))
          : (o = m[32]),
        m[33] !== o || m[34] !== r || m[35] !== s
          ? ((c = (0, t.jsxs)("div", { className: e, children: [r, s, o] })),
            (m[33] = o),
            (m[34] = r),
            (m[35] = s),
            (m[36] = c))
          : (c = m[36]),
        m[37] !== f || m[38] !== S
          ? ((u = (0, t.jsx)(E, { rows: S, coin: f })),
            (m[37] = f),
            (m[38] = S),
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
      m[43] !== v
        ? ((c = v("web.callouts.followed_holders_title")),
          (m[43] = v),
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
  function U(e, i) {
    return (0, t.jsx)(c.l, { height: 32 }, i);
  }
  function E(e) {
    let l,
      r = (0, i.c)(3),
      { rows: a, coin: s } = e;
    return (
      r[0] !== s || r[1] !== a
        ? ((l = s
            ? (0, t.jsx)(P, { rows: a, coin: s })
            : (0, t.jsx)(M, { rows: a, pricePerTokenUsd: 0 })),
          (r[0] = s),
          (r[1] = a),
          (r[2] = l))
        : (l = r[2]),
      l
    );
  }
  function P(e) {
    let l,
      r,
      a = (0, i.c)(5),
      { rows: s, coin: n } = e;
    a[0] !== n ? ((l = { coin: n }), (a[0] = n), (a[1] = l)) : (l = a[1]);
    let o = (0, k.f)(l);
    return (
      a[2] !== o || a[3] !== s
        ? ((r = (0, t.jsx)(M, { rows: s, pricePerTokenUsd: o })),
          (a[2] = o),
          (a[3] = s),
          (a[4] = r))
        : (r = a[4]),
      r
    );
  }
  function M(e) {
    let l,
      r,
      a,
      s = (0, i.c)(10),
      { rows: o, pricePerTokenUsd: d } = e,
      { t: c } = (0, n.f)();
    if (
      (s[0] !== c
        ? ((l = c("web.callouts.followed_holders_title")),
          (s[0] = c),
          (s[1] = l))
        : (l = s[1]),
      s[2] !== d || s[3] !== o)
    ) {
      let e;
      (s[5] !== d
        ? ((e = (e) =>
            (0, t.jsx)(q, { row: e, pricePerTokenUsd: d }, e.userId)),
          (s[5] = d),
          (s[6] = e))
        : (e = s[6]),
        (r = o.map(e)),
        (s[2] = d),
        (s[3] = o),
        (s[4] = r));
    } else r = s[4];
    return (
      s[7] !== l || s[8] !== r
        ? ((a = (0, t.jsx)("ul", {
            "aria-label": l,
            className: "flex max-h-72 w-full flex-col overflow-y-auto",
            children: r,
          })),
          (s[7] = l),
          (s[8] = r),
          (s[9] = a))
        : (a = s[9]),
      a
    );
  }
  function q(e) {
    let a,
      s,
      c,
      u,
      p,
      m,
      h,
      f,
      x,
      y,
      v = (0, i.c)(32),
      { row: b, pricePerTokenUsd: g } = e,
      { t: w } = (0, n.f)();
    v[0] !== b.username
      ? ((a = b.username.trim() || null), (v[0] = b.username), (v[1] = a))
      : (a = v[1]);
    let _ = a;
    v[2] !== b.userId || v[3] !== b.walletAddress
      ? ((s = (0, r.$)({ address: b.walletAddress, userId: b.userId })),
        (v[2] = b.userId),
        (v[3] = b.walletAddress),
        (v[4] = s))
      : (s = v[4]);
    let k = s,
      S = null !== b.amountHeld && g > 0 ? b.amountHeld * g : null;
    v[5] === Symbol.for("react.memo_cache_sentinel")
      ? ((c = (0, l.c)(
          N,
          "border-b border-border-secondary py-2 last:border-b-0",
        )),
        (v[5] = c))
      : (c = v[5]);
    let C = b.walletAddress,
      F = b.userId,
      A = b.profileImageUrl,
      I = b.resolvedAvatarDecoration;
    v[6] !== b ? ((u = (0, j.f)(b)), (v[6] = b), (v[7] = u)) : (u = v[7]);
    let D = !!k;
    return (
      v[8] !== b.walletAddress || v[9] !== w || v[10] !== _
        ? ((p =
            _ ?? (b.walletAddress ? null : w("web.callouts.holder_column"))),
          (v[8] = b.walletAddress),
          (v[9] = w),
          (v[10] = _),
          (v[11] = p))
        : (p = v[11]),
      v[12] !== b.profileImageUrl ||
      v[13] !== b.resolvedAvatarDecoration ||
      v[14] !== b.userId ||
      v[15] !== b.walletAddress ||
      v[16] !== k ||
      v[17] !== u ||
      v[18] !== D ||
      v[19] !== p ||
      v[20] !== _
        ? ((m = (0, t.jsx)(d.S, {
            address: C,
            userId: F,
            username: _,
            profileImage: A,
            avatarDecoration: I,
            size: 24,
            density: "terminal",
            verified: u,
            link: D,
            href: k,
            nameOverride: p,
            className: "min-w-0",
          })),
          (v[12] = b.profileImageUrl),
          (v[13] = b.resolvedAvatarDecoration),
          (v[14] = b.userId),
          (v[15] = b.walletAddress),
          (v[16] = k),
          (v[17] = u),
          (v[18] = D),
          (v[19] = p),
          (v[20] = _),
          (v[21] = m))
        : (m = v[21]),
      v[22] !== S
        ? ((h = null != S && Number.isFinite(S) ? (0, o.l)(S) : "—"),
          (v[22] = S),
          (v[23] = h))
        : (h = v[23]),
      v[24] !== h
        ? ((f = (0, t.jsx)("span", {
            className: "text-xs tabular-nums text-text-secondary",
            children: h,
          })),
          (v[24] = h),
          (v[25] = f))
        : (f = v[25]),
      v[26] !== b.pnlUsd
        ? ((x = (0, t.jsx)("span", {
            children:
              null == b.pnlUsd
                ? (0, t.jsx)("span", {
                    className: "text-xs text-text-tertiary",
                    children: "—",
                  })
                : (0, t.jsx)("span", {
                    className: (0, l.c)(
                      "whitespace-nowrap text-xs font-medium tabular-nums",
                      (0, o.k)(b.pnlUsd),
                    ),
                    children: (0, o.u)(b.pnlUsd),
                  }),
          })),
          (v[26] = b.pnlUsd),
          (v[27] = x))
        : (x = v[27]),
      v[28] !== m || v[29] !== f || v[30] !== x
        ? ((y = (0, t.jsxs)("li", {
            "data-testid": "followed-holders-panel-row",
            className: c,
            children: [m, f, x],
          })),
          (v[28] = m),
          (v[29] = f),
          (v[30] = x),
          (v[31] = y))
        : (y = v[31]),
      y
    );
  }
  e.s(
    [
      "$",
      0,
      function (e) {
        let l,
          r,
          a,
          s,
          n,
          o = (0, i.c)(21),
          {
            mint: d,
            isLoggedIn: c,
            excludeWalletAddress: u,
            coin: p,
            avatarSize: m,
            className: h,
          } = e,
          f = p?.followed_holders,
          x = p?.chain_id,
          v = c && void 0 === f;
        o[0] !== d || o[1] !== x || o[2] !== v
          ? ((l = { mint: d, limit: y.A, coinChain: x, enabled: v }),
            (o[0] = d),
            (o[1] = x),
            (o[2] = v),
            (o[3] = l))
          : (l = o[3]);
        let { data: b } = _(l);
        o[4] !== b || o[5] !== f
          ? ((r =
              void 0 !== f
                ? f
                : b
                  ? { holders: b.followedHolders, totalCount: b.totalCount }
                  : null),
            (o[4] = b),
            (o[5] = f),
            (o[6] = r))
          : (r = o[6]);
        let g = r;
        if (!g || 0 === g.holders.length) return null;
        if (o[7] !== u || o[8] !== g.holders) {
          let e;
          (o[10] !== u
            ? ((e = (e) => !(0, S.f)(e.walletAddress, u)),
              (o[10] = u),
              (o[11] = e))
            : (e = o[11]),
            (a = g.holders.filter(e)),
            (o[7] = u),
            (o[8] = g.holders),
            (o[9] = a));
        } else a = o[9];
        let w = a;
        if (0 === w.length) return null;
        let k = g.holders.length - w.length,
          j = Math.max(g.totalCount - k, w.length);
        return (
          o[12] !== w || o[13] !== j
            ? ((s = { holders: w, totalCount: j }),
              (o[12] = w),
              (o[13] = j),
              (o[14] = s))
            : (s = o[14]),
          o[15] !== m ||
          o[16] !== h ||
          o[17] !== p ||
          o[18] !== d ||
          o[19] !== s
            ? ((n = (0, t.jsx)(I, {
                mint: d,
                followedHolders: s,
                coin: p,
                avatarSize: m,
                className: h,
              })),
              (o[15] = m),
              (o[16] = h),
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
      I,
      "g",
      0,
      T,
    ],
    337689,
  );
};
