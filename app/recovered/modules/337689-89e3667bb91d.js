// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    i = e.i(426091),
    r = e.i(146695),
    s = e.i(598883),
    a = e.i(352386);
  e.i(12692);
  var n = e.i(398902);
  e.i(84455);
  var o = e.i(540805);
  e.i(107240);
  var d = e.i(693124),
    c = e.i(248496),
    u = e.i(690877),
    m = e.i(574472),
    b = e.i(466931);
  let p = null,
    f = null,
    h = (e, t, l, i = {}) => {
      let { revalidateSession: r } = (0, m.F)(),
        s = t(e),
        n = (0, a.useRef)(i.onSessionValid);
      ((n.current = i.onSessionValid),
        (0, a.useEffect)(() => {
          if (!s || "function" != typeof r) return;
          let e = !1;
          return (
            ((e, t) => {
              if (p) return p;
              if (null !== f && Date.now() - f < 1e4)
                return Promise.resolve("skipped");
              let l = e()
                .then(
                  (e) => (
                    (0, b.B)({
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
                  ((p = null), (f = Date.now()));
                });
              return ((p = l), l);
            })(r, l).then((t) => {
              e || "ok" !== t || n.current?.();
            }),
            () => {
              e = !0;
            }
          );
        }, [s, e, r, l]));
    };
  e.s(["f", 0, h], 175190);
  var x = e.i(559015),
    y = e.i(541710),
    v = e.i(779106);
  let g = (e, t) => !(0, x.u)(t) && e < 1,
    w = (e, t) => {
      let l = (0, y.T)(e);
      return void 0 === l
        ? { chain: void 0, readable: !0 }
        : (0, y.m)(l, t)
          ? { chain: l, readable: !0 }
          : { chain: void 0, readable: !1 };
    },
    _ = (e) => {
      let t,
        i,
        r,
        s,
        a,
        n,
        o = (0, l.c)(22),
        {
          mint: d,
          limit: c,
          includePositions: m,
          coinChain: b,
          enabled: p,
        } = e,
        f = void 0 === c ? 50 : c,
        _ = void 0 !== m && m,
        j = (0, v.f)("followed-holders"),
        k = (0, y.l)();
      o[0] !== b || o[1] !== k
        ? ((t = w(b, k)), (o[0] = b), (o[1] = k), (o[2] = t))
        : (t = o[2]);
      let { chain: N, readable: S } = t,
        C = d ?? "";
      (o[3] !== N ? ((i = N ? [N] : []), (o[3] = N), (o[4] = i)) : (i = o[4]),
        o[5] !== _ || o[6] !== f || o[7] !== C || o[8] !== i || o[9] !== j
          ? ((r = ["callouts", "followed-holders", j, C, f, _, ...i]),
            (o[5] = _),
            (o[6] = f),
            (o[7] = C),
            (o[8] = i),
            (o[9] = j),
            (o[10] = r))
          : (r = o[10]),
        o[11] !== N || o[12] !== _ || o[13] !== f || o[14] !== d
          ? ((s = (e) => {
              let { signal: t } = e;
              return (0, x.D)({
                mint: d ?? "",
                limit: f,
                includePositions: _,
                ...(N ? { chain: N } : {}),
                signal: t,
              });
            }),
            (o[11] = N),
            (o[12] = _),
            (o[13] = f),
            (o[14] = d),
            (o[15] = s))
          : (s = o[15]));
      let I = (void 0 === p || p) && S && !!d;
      o[16] !== r || o[17] !== s || o[18] !== I
        ? ((a = {
            queryKey: r,
            queryFn: s,
            enabled: I,
            staleTime: 6e4,
            retry: g,
          }),
          (o[16] = r),
          (o[17] = s),
          (o[18] = I),
          (o[19] = a))
        : (a = o[19]);
      let F = (0, u.useQuery)(a);
      return (
        o[20] !== F
          ? ((n = { onSessionValid: () => void F.refetch() }),
            (o[20] = F),
            (o[21] = n))
          : (n = o[21]),
        h(F.error, x.X, "followed-holders", n),
        F
      );
    };
  e.s(["f", 0, w, "E", 0, g, "q", 0, _], 106411);
  var j = e.i(927878),
    k = e.i(834247);
  e.i(267146);
  var N = e.i(599432);
  let S = x.A,
    C = "grid grid-cols-[minmax(0,1fr)_3.75rem_7rem] items-center gap-x-2",
    I = { sm: 16, rail: 20, md: 24 },
    F = { sm: "size-4", rail: "size-5", md: "size-6" };
  function T(e) {
    let r,
      o,
      c,
      u,
      m,
      b,
      p,
      f,
      h,
      x,
      y,
      v,
      g = (0, l.c)(42),
      {
        mint: w,
        followedHolders: _,
        coin: j,
        avatarSize: k,
        popoverAlign: N,
        interactive: C,
        className: T,
      } = e,
      A = void 0 === k ? "md" : k,
      D = void 0 === N ? "end" : N,
      { t: P } = (0, n.f)(),
      [z, E] = (0, a.useState)(!1),
      V = I[A],
      H = _.holders;
    if (g[0] !== V || g[1] !== _.holders || g[2] !== _.totalCount) {
      c = Symbol.for("react.early_return_sentinel");
      e: {
        let e,
          l = H.slice(0, S);
        if (0 === l.length || _.totalCount <= 0) {
          c = null;
          break e;
        }
        ((r = Math.min(_.totalCount - l.length, 99)),
          g[6] !== V
            ? ((e = (e) =>
                (0, t.jsx)(
                  d.S,
                  {
                    address: e.userId,
                    userId: e.userId,
                    username: e.username,
                    profileImage: e.profileImageUrl,
                    size: V,
                    facepile: !0,
                    link: !1,
                    hoverCard: !1,
                  },
                  e.userId,
                )),
              (g[6] = V),
              (g[7] = e))
            : (e = g[7]),
          (o = l.map(e)));
      }
      ((g[0] = V),
        (g[1] = _.holders),
        (g[2] = _.totalCount),
        (g[3] = r),
        (g[4] = o),
        (g[5] = c));
    } else ((r = g[3]), (o = g[4]), (c = g[5]));
    if (c !== Symbol.for("react.early_return_sentinel")) return c;
    (g[8] !== A || g[9] !== r
      ? ((u =
          r > 0
            ? (0, t.jsx)("span", {
                "data-testid": "followed-holders-overflow",
                className: "relative block rounded-full",
                children: (0, t.jsxs)("span", {
                  className: (0, i.c)(
                    "flex items-center justify-center rounded-full bg-bg-primary text-[11px] font-medium text-text-secondary",
                    F[A],
                  ),
                  children: [r, "+"],
                }),
              })
            : null),
        (g[8] = A),
        (g[9] = r),
        (g[10] = u))
      : (u = g[10]),
      g[11] !== o || g[12] !== u
        ? ((m = (0, t.jsxs)(t.Fragment, { children: [o, u] })),
          (g[11] = o),
          (g[12] = u),
          (g[13] = m))
        : (m = g[13]));
    let M = m;
    if (!(void 0 === C || C)) {
      let e, l, r;
      return (
        g[14] !== P
          ? ((e = P("web.callouts.followed_holders_title")),
            (g[14] = P),
            (g[15] = e))
          : (e = g[15]),
        g[16] !== T
          ? ((l = (0, i.c)(d.v, "pointer-events-none shrink-0", T)),
            (g[16] = T),
            (g[17] = l))
          : (l = g[17]),
        g[18] !== M || g[19] !== e || g[20] !== l
          ? ((r = (0, t.jsx)("span", {
              "aria-label": e,
              "data-testid": "followed-holders-facepile",
              "data-interactive": "false",
              className: l,
              children: M,
            })),
            (g[18] = M),
            (g[19] = e),
            (g[20] = l),
            (g[21] = r))
          : (r = g[21]),
        r
      );
    }
    return (
      g[22] !== P
        ? ((b = P("web.callouts.followed_holders_title")),
          (g[22] = P),
          (g[23] = b))
        : (b = g[23]),
      g[24] === Symbol.for("react.memo_cache_sentinel")
        ? ((p = (e) => {
            (e.stopPropagation(), e.preventDefault(), E(!0));
          }),
          (g[24] = p))
        : (p = g[24]),
      g[25] !== T
        ? ((f = (0, i.c)(d.v, "shrink-0", T)), (g[25] = T), (g[26] = f))
        : (f = g[26]),
      g[27] !== M || g[28] !== f || g[29] !== b
        ? ((h = (0, t.jsx)(s.b, {
            asChild: !0,
            children: (0, t.jsx)("button", {
              type: "button",
              "aria-label": b,
              "data-testid": "followed-holders-facepile",
              onClick: p,
              className: f,
              children: M,
            }),
          })),
          (g[27] = M),
          (g[28] = f),
          (g[29] = b),
          (g[30] = h))
        : (h = g[30]),
      g[31] !== j || g[32] !== z || g[33] !== w
        ? ((x = (0, t.jsx)(K, { mint: w, coin: j, open: z })),
          (g[31] = j),
          (g[32] = z),
          (g[33] = w),
          (g[34] = x))
        : (x = g[34]),
      g[35] !== D || g[36] !== x
        ? ((y = (0, t.jsx)(s.P, {
            side: "bottom",
            align: D,
            className: "w-80 p-3",
            onClick: U,
            children: x,
          })),
          (g[35] = D),
          (g[36] = x),
          (g[37] = y))
        : (y = g[37]),
      g[38] !== z || g[39] !== h || g[40] !== y
        ? ((v = (0, t.jsxs)(s.c, {
            open: z,
            onOpenChange: E,
            openDelay: 300,
            closeDelay: 150,
            children: [h, y],
          })),
          (g[38] = z),
          (g[39] = h),
          (g[40] = y),
          (g[41] = v))
        : (v = g[41]),
      v
    );
  }
  function U(e) {
    return e.stopPropagation();
  }
  function K(e) {
    let r,
      s,
      a,
      o,
      d,
      c,
      u,
      m,
      b = (0, l.c)(50),
      { mint: p, coin: f, open: h } = e,
      { t: y } = (0, n.f)(),
      v = f?.chain_id;
    b[0] !== p || b[1] !== h || b[2] !== v
      ? ((r = { mint: p, includePositions: !0, coinChain: v, enabled: h }),
        (b[0] = p),
        (b[1] = h),
        (b[2] = v),
        (b[3] = r))
      : (r = b[3]);
    let { data: g, isPending: w, isError: j } = _(r);
    (b[4] !== g?.followedHolders
      ? ((s = g?.followedHolders ?? []),
        (b[4] = g?.followedHolders),
        (b[5] = s))
      : (s = b[5]),
      b[6] !== g?.positions
        ? ((a = g?.positions ?? []), (b[6] = g?.positions), (b[7] = a))
        : (a = b[7]),
      b[8] !== s || b[9] !== a
        ? ((o = (0, x.F)(s, a)), (b[8] = s), (b[9] = a), (b[10] = o))
        : (o = b[10]));
    let k = o;
    if (j) {
      let e, l;
      (b[11] !== y
        ? ((e = y("web.callouts.holders_error")), (b[11] = y), (b[12] = e))
        : (e = b[12]),
        b[13] !== e
          ? ((l = (0, t.jsx)("p", {
              className: "py-3 text-xs text-text-tertiary",
              children: e,
            })),
            (b[13] = e),
            (b[14] = l))
          : (l = b[14]),
        (d = l));
    } else if (w || !g) {
      let e;
      (b[15] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)("div", {
            "aria-hidden": !0,
            "data-testid": "followed-holders-panel-skeleton",
            className: "flex flex-col gap-2 py-1",
            children: Array.from({ length: 3 }).map(A),
          })),
          (b[15] = e))
        : (e = b[15]),
        (d = e));
    } else if (0 === k.length) {
      let e, l;
      (b[16] !== y
        ? ((e = y("web.callouts.followed_holders_empty")),
          (b[16] = y),
          (b[17] = e))
        : (e = b[17]),
        b[18] !== e
          ? ((l = (0, t.jsx)("p", {
              className: "py-3 text-xs text-text-tertiary",
              children: e,
            })),
            (b[18] = e),
            (b[19] = l))
          : (l = b[19]),
        (d = l));
    } else {
      let e, l, r, s, a, n, o, c, u, m;
      (b[20] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, i.c)(
            C,
            "border-b border-border-secondary pb-2 text-[11px] font-medium text-text-tertiary",
          )),
          (b[20] = e))
        : (e = b[20]),
        b[21] !== y
          ? ((l = y("web.callouts.holder_column")), (b[21] = y), (b[22] = l))
          : (l = b[22]),
        b[23] !== l
          ? ((r = (0, t.jsx)("span", { children: l })),
            (b[23] = l),
            (b[24] = r))
          : (r = b[24]),
        b[25] !== y
          ? ((s = y("coin_details.position")), (b[25] = y), (b[26] = s))
          : (s = b[26]),
        b[27] !== s
          ? ((a = (0, t.jsx)("span", { children: s })),
            (b[27] = s),
            (b[28] = a))
          : (a = b[28]),
        b[29] !== y
          ? ((n = y("share.profile.pnl_label")), (b[29] = y), (b[30] = n))
          : (n = b[30]),
        b[31] !== n
          ? ((o = (0, t.jsx)("span", { children: n })),
            (b[31] = n),
            (b[32] = o))
          : (o = b[32]),
        b[33] !== o || b[34] !== r || b[35] !== a
          ? ((c = (0, t.jsxs)("div", { className: e, children: [r, a, o] })),
            (b[33] = o),
            (b[34] = r),
            (b[35] = a),
            (b[36] = c))
          : (c = b[36]),
        b[37] !== f || b[38] !== k
          ? ((u = (0, t.jsx)(D, { rows: k, coin: f })),
            (b[37] = f),
            (b[38] = k),
            (b[39] = u))
          : (u = b[39]),
        b[40] !== c || b[41] !== u
          ? ((m = (0, t.jsxs)(t.Fragment, { children: [c, u] })),
            (b[40] = c),
            (b[41] = u),
            (b[42] = m))
          : (m = b[42]),
        (d = m));
    }
    return (
      b[43] !== y
        ? ((c = y("web.callouts.followed_holders_title")),
          (b[43] = y),
          (b[44] = c))
        : (c = b[44]),
      b[45] !== c
        ? ((u = (0, t.jsx)("p", {
            className:
              "pb-2 text-[13px] font-medium leading-4 text-text-primary",
            children: c,
          })),
          (b[45] = c),
          (b[46] = u))
        : (u = b[46]),
      b[47] !== d || b[48] !== u
        ? ((m = (0, t.jsxs)("div", {
            "data-testid": "followed-holders-panel",
            children: [u, d],
          })),
          (b[47] = d),
          (b[48] = u),
          (b[49] = m))
        : (m = b[49]),
      m
    );
  }
  function A(e, l) {
    return (0, t.jsx)(c.l, { height: 32 }, l);
  }
  function D(e) {
    let i,
      r = (0, l.c)(3),
      { rows: s, coin: a } = e;
    return (
      r[0] !== a || r[1] !== s
        ? ((i = a
            ? (0, t.jsx)(P, { rows: s, coin: a })
            : (0, t.jsx)(z, { rows: s, pricePerTokenUsd: 0 })),
          (r[0] = a),
          (r[1] = s),
          (r[2] = i))
        : (i = r[2]),
      i
    );
  }
  function P(e) {
    let i,
      r,
      s = (0, l.c)(5),
      { rows: a, coin: n } = e;
    s[0] !== n ? ((i = { coin: n }), (s[0] = n), (s[1] = i)) : (i = s[1]);
    let o = (0, j.f)(i);
    return (
      s[2] !== o || s[3] !== a
        ? ((r = (0, t.jsx)(z, { rows: a, pricePerTokenUsd: o })),
          (s[2] = o),
          (s[3] = a),
          (s[4] = r))
        : (r = s[4]),
      r
    );
  }
  function z(e) {
    let i,
      r,
      s,
      a = (0, l.c)(10),
      { rows: o, pricePerTokenUsd: d } = e,
      { t: c } = (0, n.f)();
    if (
      (a[0] !== c
        ? ((i = c("web.callouts.followed_holders_title")),
          (a[0] = c),
          (a[1] = i))
        : (i = a[1]),
      a[2] !== d || a[3] !== o)
    ) {
      let e;
      (a[5] !== d
        ? ((e = (e) =>
            (0, t.jsx)(E, { row: e, pricePerTokenUsd: d }, e.userId)),
          (a[5] = d),
          (a[6] = e))
        : (e = a[6]),
        (r = o.map(e)),
        (a[2] = d),
        (a[3] = o),
        (a[4] = r));
    } else r = a[4];
    return (
      a[7] !== i || a[8] !== r
        ? ((s = (0, t.jsx)("ul", {
            "aria-label": i,
            className: "flex max-h-72 w-full flex-col overflow-y-auto",
            children: r,
          })),
          (a[7] = i),
          (a[8] = r),
          (a[9] = s))
        : (s = a[9]),
      s
    );
  }
  function E(e) {
    let s,
      a,
      c,
      u,
      m,
      b,
      p,
      f,
      h,
      x,
      y = (0, l.c)(32),
      { row: v, pricePerTokenUsd: g } = e,
      { t: w } = (0, n.f)();
    y[0] !== v.username
      ? ((s = v.username.trim() || null), (y[0] = v.username), (y[1] = s))
      : (s = y[1]);
    let _ = s;
    y[2] !== v.userId || y[3] !== v.walletAddress
      ? ((a = (0, r.$)({ address: v.walletAddress, userId: v.userId })),
        (y[2] = v.userId),
        (y[3] = v.walletAddress),
        (y[4] = a))
      : (a = y[4]);
    let j = a,
      k = null !== v.amountHeld && g > 0 ? v.amountHeld * g : null;
    y[5] === Symbol.for("react.memo_cache_sentinel")
      ? ((c = (0, i.c)(
          C,
          "border-b border-border-secondary py-2 last:border-b-0",
        )),
        (y[5] = c))
      : (c = y[5]);
    let S = v.walletAddress,
      I = v.userId,
      F = v.profileImageUrl,
      T = v.resolvedAvatarDecoration;
    y[6] !== v ? ((u = (0, N.f)(v)), (y[6] = v), (y[7] = u)) : (u = y[7]);
    let U = !!j;
    return (
      y[8] !== v.walletAddress || y[9] !== w || y[10] !== _
        ? ((m =
            _ ?? (v.walletAddress ? null : w("web.callouts.holder_column"))),
          (y[8] = v.walletAddress),
          (y[9] = w),
          (y[10] = _),
          (y[11] = m))
        : (m = y[11]),
      y[12] !== v.profileImageUrl ||
      y[13] !== v.resolvedAvatarDecoration ||
      y[14] !== v.userId ||
      y[15] !== v.walletAddress ||
      y[16] !== j ||
      y[17] !== u ||
      y[18] !== U ||
      y[19] !== m ||
      y[20] !== _
        ? ((b = (0, t.jsx)(d.S, {
            address: S,
            userId: I,
            username: _,
            profileImage: F,
            avatarDecoration: T,
            size: 24,
            density: "terminal",
            verified: u,
            link: U,
            href: j,
            nameOverride: m,
            className: "min-w-0",
          })),
          (y[12] = v.profileImageUrl),
          (y[13] = v.resolvedAvatarDecoration),
          (y[14] = v.userId),
          (y[15] = v.walletAddress),
          (y[16] = j),
          (y[17] = u),
          (y[18] = U),
          (y[19] = m),
          (y[20] = _),
          (y[21] = b))
        : (b = y[21]),
      y[22] !== k
        ? ((p = null != k && Number.isFinite(k) ? (0, o.l)(k) : "—"),
          (y[22] = k),
          (y[23] = p))
        : (p = y[23]),
      y[24] !== p
        ? ((f = (0, t.jsx)("span", {
            className: "text-xs tabular-nums text-text-secondary",
            children: p,
          })),
          (y[24] = p),
          (y[25] = f))
        : (f = y[25]),
      y[26] !== v.pnlUsd
        ? ((h = (0, t.jsx)("span", {
            children:
              null == v.pnlUsd
                ? (0, t.jsx)("span", {
                    className: "text-xs text-text-tertiary",
                    children: "—",
                  })
                : (0, t.jsx)("span", {
                    className: (0, i.c)(
                      "whitespace-nowrap text-xs font-medium tabular-nums",
                      (0, o.k)(v.pnlUsd),
                    ),
                    children: (0, o.u)(v.pnlUsd),
                  }),
          })),
          (y[26] = v.pnlUsd),
          (y[27] = h))
        : (h = y[27]),
      y[28] !== b || y[29] !== f || y[30] !== h
        ? ((x = (0, t.jsxs)("li", {
            "data-testid": "followed-holders-panel-row",
            className: c,
            children: [b, f, h],
          })),
          (y[28] = b),
          (y[29] = f),
          (y[30] = h),
          (y[31] = x))
        : (x = y[31]),
      x
    );
  }
  e.s(
    [
      "$",
      0,
      function (e) {
        let i,
          r,
          s,
          a,
          n,
          o = (0, l.c)(21),
          {
            mint: d,
            isLoggedIn: c,
            excludeWalletAddress: u,
            coin: m,
            avatarSize: b,
            className: p,
          } = e,
          f = m?.followed_holders,
          h = m?.chain_id,
          y = c && void 0 === f;
        o[0] !== d || o[1] !== h || o[2] !== y
          ? ((i = { mint: d, limit: x.A, coinChain: h, enabled: y }),
            (o[0] = d),
            (o[1] = h),
            (o[2] = y),
            (o[3] = i))
          : (i = o[3]);
        let { data: v } = _(i);
        o[4] !== v || o[5] !== f
          ? ((r =
              void 0 !== f
                ? f
                : v
                  ? { holders: v.followedHolders, totalCount: v.totalCount }
                  : null),
            (o[4] = v),
            (o[5] = f),
            (o[6] = r))
          : (r = o[6]);
        let g = r;
        if (!g || 0 === g.holders.length) return null;
        if (o[7] !== u || o[8] !== g.holders) {
          let e;
          (o[10] !== u
            ? ((e = (e) => !(0, k.f)(e.walletAddress, u)),
              (o[10] = u),
              (o[11] = e))
            : (e = o[11]),
            (s = g.holders.filter(e)),
            (o[7] = u),
            (o[8] = g.holders),
            (o[9] = s));
        } else s = o[9];
        let w = s;
        if (0 === w.length) return null;
        let j = g.holders.length - w.length,
          N = Math.max(g.totalCount - j, w.length);
        return (
          o[12] !== w || o[13] !== N
            ? ((a = { holders: w, totalCount: N }),
              (o[12] = w),
              (o[13] = N),
              (o[14] = a))
            : (a = o[14]),
          o[15] !== b ||
          o[16] !== p ||
          o[17] !== m ||
          o[18] !== d ||
          o[19] !== a
            ? ((n = (0, t.jsx)(T, {
                mint: d,
                followedHolders: a,
                coin: m,
                avatarSize: b,
                className: p,
              })),
              (o[15] = b),
              (o[16] = p),
              (o[17] = m),
              (o[18] = d),
              (o[19] = a),
              (o[20] = n))
            : (n = o[20]),
          n
        );
      },
      "E",
      0,
      T,
      "g",
      0,
      K,
    ],
    337689,
  );
};
