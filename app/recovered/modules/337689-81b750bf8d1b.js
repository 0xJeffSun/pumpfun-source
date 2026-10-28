// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(426091),
    l = e.i(146695),
    a = e.i(598883),
    n = e.i(352386);
  e.i(12692);
  var s = e.i(398902);
  e.i(84455);
  var o = e.i(540805);
  e.i(107240);
  var d = e.i(693124),
    c = e.i(248496),
    u = e.i(690877),
    m = e.i(574472),
    f = e.i(466931);
  let p = null,
    h = null,
    x = (e, t, i, r = {}) => {
      let { revalidateSession: l } = (0, m.F)(),
        a = t(e),
        s = (0, n.useRef)(r.onSessionValid);
      ((s.current = r.onSessionValid),
        (0, n.useEffect)(() => {
          if (!a || "function" != typeof l) return;
          let e = !1;
          return (
            ((e, t) => {
              if (p) return p;
              if (null !== h && Date.now() - h < 1e4)
                return Promise.resolve("skipped");
              let i = e()
                .then(
                  (e) => (
                    (0, f.B)({
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
                  ((p = null), (h = Date.now()));
                });
              return ((p = i), i);
            })(l, i).then((t) => {
              e || "ok" !== t || s.current?.();
            }),
            () => {
              e = !0;
            }
          );
        }, [a, e, l, i]));
    };
  e.s(["f", 0, x], 175190);
  var b = e.i(559015),
    v = e.i(541710),
    y = e.i(779106);
  let g = (e, t) => !(0, b.u)(t) && e < 1,
    w = (e, t) => {
      let i = (0, v.T)(e);
      return void 0 === i
        ? { chain: void 0, readable: !0 }
        : (0, v.m)(i, t)
          ? { chain: i, readable: !0 }
          : { chain: void 0, readable: !1 };
    },
    j = (e) => {
      let t,
        r,
        l,
        a,
        n,
        s,
        o = (0, i.c)(22),
        {
          mint: d,
          limit: c,
          includePositions: m,
          coinChain: f,
          enabled: p,
        } = e,
        h = void 0 === c ? 50 : c,
        j = void 0 !== m && m,
        k = (0, y.f)("followed-holders"),
        N = (0, v.l)();
      o[0] !== f || o[1] !== N
        ? ((t = w(f, N)), (o[0] = f), (o[1] = N), (o[2] = t))
        : (t = o[2]);
      let { chain: _, readable: S } = t,
        C = d ?? "";
      (o[3] !== _ ? ((r = _ ? [_] : []), (o[3] = _), (o[4] = r)) : (r = o[4]),
        o[5] !== j || o[6] !== h || o[7] !== C || o[8] !== r || o[9] !== k
          ? ((l = ["callouts", "followed-holders", k, C, h, j, ...r]),
            (o[5] = j),
            (o[6] = h),
            (o[7] = C),
            (o[8] = r),
            (o[9] = k),
            (o[10] = l))
          : (l = o[10]),
        o[11] !== _ || o[12] !== j || o[13] !== h || o[14] !== d
          ? ((a = (e) => {
              let { signal: t } = e;
              return (0, b.D)({
                mint: d ?? "",
                limit: h,
                includePositions: j,
                ...(_ ? { chain: _ } : {}),
                signal: t,
              });
            }),
            (o[11] = _),
            (o[12] = j),
            (o[13] = h),
            (o[14] = d),
            (o[15] = a))
          : (a = o[15]));
      let I = (void 0 === p || p) && S && !!d;
      o[16] !== l || o[17] !== a || o[18] !== I
        ? ((n = {
            queryKey: l,
            queryFn: a,
            enabled: I,
            staleTime: 6e4,
            retry: g,
          }),
          (o[16] = l),
          (o[17] = a),
          (o[18] = I),
          (o[19] = n))
        : (n = o[19]);
      let A = (0, u.useQuery)(n);
      return (
        o[20] !== A
          ? ((s = { onSessionValid: () => void A.refetch() }),
            (o[20] = A),
            (o[21] = s))
          : (s = o[21]),
        x(A.error, b.X, "followed-holders", s),
        A
      );
    };
  e.s(["f", 0, w, "E", 0, g, "q", 0, j], 106411);
  var k = e.i(927878),
    N = e.i(834247);
  e.i(267146);
  var _ = e.i(599432);
  let S = b.A,
    C = "grid grid-cols-[minmax(0,1fr)_3.75rem_7rem] items-center gap-x-2",
    I = { sm: 16, rail: 20, md: 24 },
    A = { sm: "size-4", rail: "size-5", md: "size-6" };
  function D(e) {
    let l,
      o,
      c,
      u,
      m,
      f,
      p,
      h,
      x,
      b,
      v,
      y,
      g = (0, i.c)(42),
      {
        mint: w,
        followedHolders: j,
        coin: k,
        avatarSize: N,
        popoverAlign: _,
        interactive: C,
        className: D,
      } = e,
      M = void 0 === N ? "md" : N,
      z = void 0 === _ ? "end" : _,
      { t: P } = (0, s.f)(),
      [$, E] = (0, n.useState)(!1),
      L = I[M],
      R = j.holders;
    if (g[0] !== L || g[1] !== j.holders || g[2] !== j.totalCount) {
      c = Symbol.for("react.early_return_sentinel");
      e: {
        let e,
          i = R.slice(0, S);
        if (0 === i.length || j.totalCount <= 0) {
          c = null;
          break e;
        }
        ((l = Math.min(j.totalCount - i.length, 99)),
          g[6] !== L
            ? ((e = (e) =>
                (0, t.jsx)(
                  d.S,
                  {
                    address: e.userId,
                    userId: e.userId,
                    username: e.username,
                    profileImage: e.profileImageUrl,
                    size: L,
                    facepile: !0,
                    link: !1,
                    hoverCard: !1,
                  },
                  e.userId,
                )),
              (g[6] = L),
              (g[7] = e))
            : (e = g[7]),
          (o = i.map(e)));
      }
      ((g[0] = L),
        (g[1] = j.holders),
        (g[2] = j.totalCount),
        (g[3] = l),
        (g[4] = o),
        (g[5] = c));
    } else ((l = g[3]), (o = g[4]), (c = g[5]));
    if (c !== Symbol.for("react.early_return_sentinel")) return c;
    (g[8] !== M || g[9] !== l
      ? ((u =
          l > 0
            ? (0, t.jsx)("span", {
                "data-testid": "followed-holders-overflow",
                className: "relative block rounded-full",
                children: (0, t.jsxs)("span", {
                  className: (0, r.c)(
                    "flex items-center justify-center rounded-full bg-bg-primary text-[11px] font-medium text-text-secondary",
                    A[M],
                  ),
                  children: [l, "+"],
                }),
              })
            : null),
        (g[8] = M),
        (g[9] = l),
        (g[10] = u))
      : (u = g[10]),
      g[11] !== o || g[12] !== u
        ? ((m = (0, t.jsxs)(t.Fragment, { children: [o, u] })),
          (g[11] = o),
          (g[12] = u),
          (g[13] = m))
        : (m = g[13]));
    let T = m;
    if (!(void 0 === C || C)) {
      let e, i, l;
      return (
        g[14] !== P
          ? ((e = P("web.callouts.followed_holders_title")),
            (g[14] = P),
            (g[15] = e))
          : (e = g[15]),
        g[16] !== D
          ? ((i = (0, r.c)(d.v, "pointer-events-none shrink-0", D)),
            (g[16] = D),
            (g[17] = i))
          : (i = g[17]),
        g[18] !== T || g[19] !== e || g[20] !== i
          ? ((l = (0, t.jsx)("span", {
              "aria-label": e,
              "data-testid": "followed-holders-facepile",
              "data-interactive": "false",
              className: i,
              children: T,
            })),
            (g[18] = T),
            (g[19] = e),
            (g[20] = i),
            (g[21] = l))
          : (l = g[21]),
        l
      );
    }
    return (
      g[22] !== P
        ? ((f = P("web.callouts.followed_holders_title")),
          (g[22] = P),
          (g[23] = f))
        : (f = g[23]),
      g[24] === Symbol.for("react.memo_cache_sentinel")
        ? ((p = (e) => {
            (e.stopPropagation(), e.preventDefault(), E(!0));
          }),
          (g[24] = p))
        : (p = g[24]),
      g[25] !== D
        ? ((h = (0, r.c)(d.v, "shrink-0", D)), (g[25] = D), (g[26] = h))
        : (h = g[26]),
      g[27] !== T || g[28] !== h || g[29] !== f
        ? ((x = (0, t.jsx)(a.b, {
            asChild: !0,
            children: (0, t.jsx)("button", {
              type: "button",
              "aria-label": f,
              "data-testid": "followed-holders-facepile",
              onClick: p,
              className: h,
              children: T,
            }),
          })),
          (g[27] = T),
          (g[28] = h),
          (g[29] = f),
          (g[30] = x))
        : (x = g[30]),
      g[31] !== k || g[32] !== $ || g[33] !== w
        ? ((b = (0, t.jsx)(F, { mint: w, coin: k, open: $ })),
          (g[31] = k),
          (g[32] = $),
          (g[33] = w),
          (g[34] = b))
        : (b = g[34]),
      g[35] !== z || g[36] !== b
        ? ((v = (0, t.jsx)(a.P, {
            side: "bottom",
            align: z,
            className: "w-80 p-3",
            onClick: U,
            children: b,
          })),
          (g[35] = z),
          (g[36] = b),
          (g[37] = v))
        : (v = g[37]),
      g[38] !== $ || g[39] !== x || g[40] !== v
        ? ((y = (0, t.jsxs)(a.c, {
            open: $,
            onOpenChange: E,
            openDelay: 300,
            closeDelay: 150,
            children: [x, v],
          })),
          (g[38] = $),
          (g[39] = x),
          (g[40] = v),
          (g[41] = y))
        : (y = g[41]),
      y
    );
  }
  function U(e) {
    return e.stopPropagation();
  }
  function F(e) {
    let l,
      a,
      n,
      o,
      d,
      c,
      u,
      m,
      f = (0, i.c)(50),
      { mint: p, coin: h, open: x } = e,
      { t: v } = (0, s.f)(),
      y = h?.chain_id;
    f[0] !== p || f[1] !== x || f[2] !== y
      ? ((l = { mint: p, includePositions: !0, coinChain: y, enabled: x }),
        (f[0] = p),
        (f[1] = x),
        (f[2] = y),
        (f[3] = l))
      : (l = f[3]);
    let { data: g, isPending: w, isError: k } = j(l);
    (f[4] !== g?.followedHolders
      ? ((a = g?.followedHolders ?? []),
        (f[4] = g?.followedHolders),
        (f[5] = a))
      : (a = f[5]),
      f[6] !== g?.positions
        ? ((n = g?.positions ?? []), (f[6] = g?.positions), (f[7] = n))
        : (n = f[7]),
      f[8] !== a || f[9] !== n
        ? ((o = (0, b.F)(a, n)), (f[8] = a), (f[9] = n), (f[10] = o))
        : (o = f[10]));
    let N = o;
    if (k) {
      let e, i;
      (f[11] !== v
        ? ((e = v("web.callouts.holders_error")), (f[11] = v), (f[12] = e))
        : (e = f[12]),
        f[13] !== e
          ? ((i = (0, t.jsx)("p", {
              className: "py-3 text-xs text-text-tertiary",
              children: e,
            })),
            (f[13] = e),
            (f[14] = i))
          : (i = f[14]),
        (d = i));
    } else if (w || !g) {
      let e;
      (f[15] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)("div", {
            "aria-hidden": !0,
            "data-testid": "followed-holders-panel-skeleton",
            className: "flex flex-col gap-2 py-1",
            children: Array.from({ length: 3 }).map(M),
          })),
          (f[15] = e))
        : (e = f[15]),
        (d = e));
    } else if (0 === N.length) {
      let e, i;
      (f[16] !== v
        ? ((e = v("web.callouts.followed_holders_empty")),
          (f[16] = v),
          (f[17] = e))
        : (e = f[17]),
        f[18] !== e
          ? ((i = (0, t.jsx)("p", {
              className: "py-3 text-xs text-text-tertiary",
              children: e,
            })),
            (f[18] = e),
            (f[19] = i))
          : (i = f[19]),
        (d = i));
    } else {
      let e, i, l, a, n, s, o, c, u, m;
      (f[20] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, r.c)(
            C,
            "border-b border-border-secondary pb-2 text-[11px] font-medium text-text-tertiary",
          )),
          (f[20] = e))
        : (e = f[20]),
        f[21] !== v
          ? ((i = v("web.callouts.holder_column")), (f[21] = v), (f[22] = i))
          : (i = f[22]),
        f[23] !== i
          ? ((l = (0, t.jsx)("span", { children: i })),
            (f[23] = i),
            (f[24] = l))
          : (l = f[24]),
        f[25] !== v
          ? ((a = v("coin_details.position")), (f[25] = v), (f[26] = a))
          : (a = f[26]),
        f[27] !== a
          ? ((n = (0, t.jsx)("span", { children: a })),
            (f[27] = a),
            (f[28] = n))
          : (n = f[28]),
        f[29] !== v
          ? ((s = v("share.profile.pnl_label")), (f[29] = v), (f[30] = s))
          : (s = f[30]),
        f[31] !== s
          ? ((o = (0, t.jsx)("span", { children: s })),
            (f[31] = s),
            (f[32] = o))
          : (o = f[32]),
        f[33] !== o || f[34] !== l || f[35] !== n
          ? ((c = (0, t.jsxs)("div", { className: e, children: [l, n, o] })),
            (f[33] = o),
            (f[34] = l),
            (f[35] = n),
            (f[36] = c))
          : (c = f[36]),
        f[37] !== h || f[38] !== N
          ? ((u = (0, t.jsx)(z, { rows: N, coin: h })),
            (f[37] = h),
            (f[38] = N),
            (f[39] = u))
          : (u = f[39]),
        f[40] !== c || f[41] !== u
          ? ((m = (0, t.jsxs)(t.Fragment, { children: [c, u] })),
            (f[40] = c),
            (f[41] = u),
            (f[42] = m))
          : (m = f[42]),
        (d = m));
    }
    return (
      f[43] !== v
        ? ((c = v("web.callouts.followed_holders_title")),
          (f[43] = v),
          (f[44] = c))
        : (c = f[44]),
      f[45] !== c
        ? ((u = (0, t.jsx)("p", {
            className:
              "pb-2 text-[13px] font-medium leading-4 text-text-primary",
            children: c,
          })),
          (f[45] = c),
          (f[46] = u))
        : (u = f[46]),
      f[47] !== d || f[48] !== u
        ? ((m = (0, t.jsxs)("div", {
            "data-testid": "followed-holders-panel",
            children: [u, d],
          })),
          (f[47] = d),
          (f[48] = u),
          (f[49] = m))
        : (m = f[49]),
      m
    );
  }
  function M(e, i) {
    return (0, t.jsx)(c.l, { height: 32 }, i);
  }
  function z(e) {
    let r,
      l = (0, i.c)(3),
      { rows: a, coin: n } = e;
    return (
      l[0] !== n || l[1] !== a
        ? ((r = n
            ? (0, t.jsx)(P, { rows: a, coin: n })
            : (0, t.jsx)($, { rows: a, pricePerTokenUsd: 0 })),
          (l[0] = n),
          (l[1] = a),
          (l[2] = r))
        : (r = l[2]),
      r
    );
  }
  function P(e) {
    let r,
      l,
      a = (0, i.c)(5),
      { rows: n, coin: s } = e;
    a[0] !== s ? ((r = { coin: s }), (a[0] = s), (a[1] = r)) : (r = a[1]);
    let o = (0, k.f)(r);
    return (
      a[2] !== o || a[3] !== n
        ? ((l = (0, t.jsx)($, { rows: n, pricePerTokenUsd: o })),
          (a[2] = o),
          (a[3] = n),
          (a[4] = l))
        : (l = a[4]),
      l
    );
  }
  function $(e) {
    let r,
      l,
      a,
      n = (0, i.c)(10),
      { rows: o, pricePerTokenUsd: d } = e,
      { t: c } = (0, s.f)();
    if (
      (n[0] !== c
        ? ((r = c("web.callouts.followed_holders_title")),
          (n[0] = c),
          (n[1] = r))
        : (r = n[1]),
      n[2] !== d || n[3] !== o)
    ) {
      let e;
      (n[5] !== d
        ? ((e = (e) =>
            (0, t.jsx)(E, { row: e, pricePerTokenUsd: d }, e.userId)),
          (n[5] = d),
          (n[6] = e))
        : (e = n[6]),
        (l = o.map(e)),
        (n[2] = d),
        (n[3] = o),
        (n[4] = l));
    } else l = n[4];
    return (
      n[7] !== r || n[8] !== l
        ? ((a = (0, t.jsx)("ul", {
            "aria-label": r,
            className: "flex max-h-72 w-full flex-col overflow-y-auto",
            children: l,
          })),
          (n[7] = r),
          (n[8] = l),
          (n[9] = a))
        : (a = n[9]),
      a
    );
  }
  function E(e) {
    let a,
      n,
      c,
      u,
      m,
      f,
      p,
      h,
      x,
      b,
      v = (0, i.c)(32),
      { row: y, pricePerTokenUsd: g } = e,
      { t: w } = (0, s.f)();
    v[0] !== y.username
      ? ((a = y.username.trim() || null), (v[0] = y.username), (v[1] = a))
      : (a = v[1]);
    let j = a;
    v[2] !== y.userId || v[3] !== y.walletAddress
      ? ((n = (0, l.$)({ address: y.walletAddress, userId: y.userId })),
        (v[2] = y.userId),
        (v[3] = y.walletAddress),
        (v[4] = n))
      : (n = v[4]);
    let k = n,
      N = null !== y.amountHeld && g > 0 ? y.amountHeld * g : null;
    v[5] === Symbol.for("react.memo_cache_sentinel")
      ? ((c = (0, r.c)(
          C,
          "border-b border-border-secondary py-2 last:border-b-0",
        )),
        (v[5] = c))
      : (c = v[5]);
    let S = y.walletAddress,
      I = y.userId,
      A = y.profileImageUrl,
      D = y.resolvedAvatarDecoration;
    v[6] !== y ? ((u = (0, _.f)(y)), (v[6] = y), (v[7] = u)) : (u = v[7]);
    let U = !!k;
    return (
      v[8] !== y.walletAddress || v[9] !== w || v[10] !== j
        ? ((m =
            j ?? (y.walletAddress ? null : w("web.callouts.holder_column"))),
          (v[8] = y.walletAddress),
          (v[9] = w),
          (v[10] = j),
          (v[11] = m))
        : (m = v[11]),
      v[12] !== y.profileImageUrl ||
      v[13] !== y.resolvedAvatarDecoration ||
      v[14] !== y.userId ||
      v[15] !== y.walletAddress ||
      v[16] !== k ||
      v[17] !== u ||
      v[18] !== U ||
      v[19] !== m ||
      v[20] !== j
        ? ((f = (0, t.jsx)(d.S, {
            address: S,
            userId: I,
            username: j,
            profileImage: A,
            avatarDecoration: D,
            size: 24,
            density: "terminal",
            verified: u,
            link: U,
            href: k,
            nameOverride: m,
            className: "min-w-0",
          })),
          (v[12] = y.profileImageUrl),
          (v[13] = y.resolvedAvatarDecoration),
          (v[14] = y.userId),
          (v[15] = y.walletAddress),
          (v[16] = k),
          (v[17] = u),
          (v[18] = U),
          (v[19] = m),
          (v[20] = j),
          (v[21] = f))
        : (f = v[21]),
      v[22] !== N
        ? ((p = null != N && Number.isFinite(N) ? (0, o.l)(N) : "—"),
          (v[22] = N),
          (v[23] = p))
        : (p = v[23]),
      v[24] !== p
        ? ((h = (0, t.jsx)("span", {
            className: "text-xs tabular-nums text-text-secondary",
            children: p,
          })),
          (v[24] = p),
          (v[25] = h))
        : (h = v[25]),
      v[26] !== y.pnlUsd
        ? ((x = (0, t.jsx)("span", {
            children:
              null == y.pnlUsd
                ? (0, t.jsx)("span", {
                    className: "text-xs text-text-tertiary",
                    children: "—",
                  })
                : (0, t.jsx)("span", {
                    className: (0, r.c)(
                      "whitespace-nowrap text-xs font-medium tabular-nums",
                      (0, o.k)(y.pnlUsd),
                    ),
                    children: (0, o.u)(y.pnlUsd),
                  }),
          })),
          (v[26] = y.pnlUsd),
          (v[27] = x))
        : (x = v[27]),
      v[28] !== f || v[29] !== h || v[30] !== x
        ? ((b = (0, t.jsxs)("li", {
            "data-testid": "followed-holders-panel-row",
            className: c,
            children: [f, h, x],
          })),
          (v[28] = f),
          (v[29] = h),
          (v[30] = x),
          (v[31] = b))
        : (b = v[31]),
      b
    );
  }
  e.s(
    [
      "$",
      0,
      function (e) {
        let r,
          l,
          a,
          n,
          s,
          o = (0, i.c)(21),
          {
            mint: d,
            isLoggedIn: c,
            excludeWalletAddress: u,
            coin: m,
            avatarSize: f,
            className: p,
          } = e,
          h = m?.followed_holders,
          x = m?.chain_id,
          v = c && void 0 === h;
        o[0] !== d || o[1] !== x || o[2] !== v
          ? ((r = { mint: d, limit: b.A, coinChain: x, enabled: v }),
            (o[0] = d),
            (o[1] = x),
            (o[2] = v),
            (o[3] = r))
          : (r = o[3]);
        let { data: y } = j(r);
        o[4] !== y || o[5] !== h
          ? ((l =
              void 0 !== h
                ? h
                : y
                  ? { holders: y.followedHolders, totalCount: y.totalCount }
                  : null),
            (o[4] = y),
            (o[5] = h),
            (o[6] = l))
          : (l = o[6]);
        let g = l;
        if (!g || 0 === g.holders.length) return null;
        if (o[7] !== u || o[8] !== g.holders) {
          let e;
          (o[10] !== u
            ? ((e = (e) => !(0, N.f)(e.walletAddress, u)),
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
          _ = Math.max(g.totalCount - k, w.length);
        return (
          o[12] !== w || o[13] !== _
            ? ((n = { holders: w, totalCount: _ }),
              (o[12] = w),
              (o[13] = _),
              (o[14] = n))
            : (n = o[14]),
          o[15] !== f ||
          o[16] !== p ||
          o[17] !== m ||
          o[18] !== d ||
          o[19] !== n
            ? ((s = (0, t.jsx)(D, {
                mint: d,
                followedHolders: n,
                coin: m,
                avatarSize: f,
                className: p,
              })),
              (o[15] = f),
              (o[16] = p),
              (o[17] = m),
              (o[18] = d),
              (o[19] = n),
              (o[20] = s))
            : (s = o[20]),
          s
        );
      },
      "E",
      0,
      D,
      "g",
      0,
      F,
    ],
    337689,
  );
};
