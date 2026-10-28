// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    i = e.i(426091),
    r = e.i(146695),
    a = e.i(598883),
    s = e.i(352386);
  e.i(12692);
  var n = e.i(398902);
  e.i(84455);
  var o = e.i(540805);
  e.i(107240);
  var d = e.i(693124),
    m = e.i(248496),
    c = e.i(690877),
    u = e.i(574472),
    f = e.i(466931);
  let x = null,
    h = null,
    p = (e, t, l, i = {}) => {
      let { revalidateSession: r } = (0, u.F)(),
        a = t(e),
        n = (0, s.useRef)(i.onSessionValid);
      ((n.current = i.onSessionValid),
        (0, s.useEffect)(() => {
          if (!a || "function" != typeof r) return;
          let e = !1;
          return (
            ((e, t) => {
              if (x) return x;
              if (null !== h && Date.now() - h < 1e4)
                return Promise.resolve("skipped");
              let l = e()
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
                  ((x = null), (h = Date.now()));
                });
              return ((x = l), l);
            })(r, l).then((t) => {
              e || "ok" !== t || n.current?.();
            }),
            () => {
              e = !0;
            }
          );
        }, [a, e, r, l]));
    };
  e.s(["f", 0, p], 175190);
  var v = e.i(559015),
    b = e.i(541710),
    g = e.i(779106);
  let w = (e, t) => !(0, v.u)(t) && e < 1,
    y = (e, t) => {
      let l = (0, b.T)(e);
      return void 0 === l
        ? { chain: void 0, readable: !0 }
        : (0, b.m)(l, t)
          ? { chain: l, readable: !0 }
          : { chain: void 0, readable: !1 };
    },
    j = (e) => {
      let t,
        i,
        r,
        a,
        s,
        n,
        o = (0, l.c)(22),
        {
          mint: d,
          limit: m,
          includePositions: u,
          coinChain: f,
          enabled: x,
        } = e,
        h = void 0 === m ? 50 : m,
        j = void 0 !== u && u,
        N = (0, g.f)("followed-holders"),
        k = (0, b.l)();
      o[0] !== f || o[1] !== k
        ? ((t = y(f, k)), (o[0] = f), (o[1] = k), (o[2] = t))
        : (t = o[2]);
      let { chain: S, readable: _ } = t,
        C = d ?? "";
      (o[3] !== S ? ((i = S ? [S] : []), (o[3] = S), (o[4] = i)) : (i = o[4]),
        o[5] !== j || o[6] !== h || o[7] !== C || o[8] !== i || o[9] !== N
          ? ((r = ["callouts", "followed-holders", N, C, h, j, ...i]),
            (o[5] = j),
            (o[6] = h),
            (o[7] = C),
            (o[8] = i),
            (o[9] = N),
            (o[10] = r))
          : (r = o[10]),
        o[11] !== S || o[12] !== j || o[13] !== h || o[14] !== d
          ? ((a = (e) => {
              let { signal: t } = e;
              return (0, v.D)({
                mint: d ?? "",
                limit: h,
                includePositions: j,
                ...(S ? { chain: S } : {}),
                signal: t,
              });
            }),
            (o[11] = S),
            (o[12] = j),
            (o[13] = h),
            (o[14] = d),
            (o[15] = a))
          : (a = o[15]));
      let F = (void 0 === x || x) && _ && !!d;
      o[16] !== r || o[17] !== a || o[18] !== F
        ? ((s = {
            queryKey: r,
            queryFn: a,
            enabled: F,
            staleTime: 6e4,
            retry: w,
          }),
          (o[16] = r),
          (o[17] = a),
          (o[18] = F),
          (o[19] = s))
        : (s = o[19]);
      let A = (0, c.useQuery)(s);
      return (
        o[20] !== A
          ? ((n = { onSessionValid: () => void A.refetch() }),
            (o[20] = A),
            (o[21] = n))
          : (n = o[21]),
        p(A.error, v.X, "followed-holders", n),
        A
      );
    };
  e.s(["f", 0, y, "E", 0, w, "q", 0, j], 106411);
  var N = e.i(927878),
    k = e.i(834247);
  e.i(267146);
  var S = e.i(599432);
  let _ = v.A,
    C = "grid grid-cols-[minmax(0,1fr)_3.75rem_7rem] items-center gap-x-2",
    F = { sm: 16, rail: 20, md: 24 },
    A = { sm: "size-4", rail: "size-5", md: "size-6" };
  function D(e) {
    let r,
      o,
      m,
      c,
      u,
      f,
      x,
      h,
      p,
      v,
      b,
      g,
      w = (0, l.c)(42),
      {
        mint: y,
        followedHolders: j,
        coin: N,
        avatarSize: k,
        popoverAlign: S,
        interactive: C,
        className: D,
      } = e,
      U = void 0 === k ? "md" : k,
      $ = void 0 === S ? "end" : S,
      { t: z } = (0, n.f)(),
      [M, E] = (0, s.useState)(!1),
      T = F[U],
      q = j.holders;
    if (w[0] !== T || w[1] !== j.holders || w[2] !== j.totalCount) {
      m = Symbol.for("react.early_return_sentinel");
      e: {
        let e,
          l = q.slice(0, _);
        if (0 === l.length || j.totalCount <= 0) {
          m = null;
          break e;
        }
        ((r = Math.min(j.totalCount - l.length, 99)),
          w[6] !== T
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
              (w[6] = T),
              (w[7] = e))
            : (e = w[7]),
          (o = l.map(e)));
      }
      ((w[0] = T),
        (w[1] = j.holders),
        (w[2] = j.totalCount),
        (w[3] = r),
        (w[4] = o),
        (w[5] = m));
    } else ((r = w[3]), (o = w[4]), (m = w[5]));
    if (m !== Symbol.for("react.early_return_sentinel")) return m;
    (w[8] !== U || w[9] !== r
      ? ((c =
          r > 0
            ? (0, t.jsx)("span", {
                "data-testid": "followed-holders-overflow",
                className: "relative block rounded-full",
                children: (0, t.jsxs)("span", {
                  className: (0, i.c)(
                    "flex items-center justify-center rounded-full bg-bg-primary text-[11px] font-medium text-text-secondary",
                    A[U],
                  ),
                  children: [r, "+"],
                }),
              })
            : null),
        (w[8] = U),
        (w[9] = r),
        (w[10] = c))
      : (c = w[10]),
      w[11] !== o || w[12] !== c
        ? ((u = (0, t.jsxs)(t.Fragment, { children: [o, c] })),
          (w[11] = o),
          (w[12] = c),
          (w[13] = u))
        : (u = w[13]));
    let H = u;
    if (!(void 0 === C || C)) {
      let e, l, r;
      return (
        w[14] !== z
          ? ((e = z("web.callouts.followed_holders_title")),
            (w[14] = z),
            (w[15] = e))
          : (e = w[15]),
        w[16] !== D
          ? ((l = (0, i.c)(d.v, "pointer-events-none shrink-0", D)),
            (w[16] = D),
            (w[17] = l))
          : (l = w[17]),
        w[18] !== H || w[19] !== e || w[20] !== l
          ? ((r = (0, t.jsx)("span", {
              "aria-label": e,
              "data-testid": "followed-holders-facepile",
              "data-interactive": "false",
              className: l,
              children: H,
            })),
            (w[18] = H),
            (w[19] = e),
            (w[20] = l),
            (w[21] = r))
          : (r = w[21]),
        r
      );
    }
    return (
      w[22] !== z
        ? ((f = z("web.callouts.followed_holders_title")),
          (w[22] = z),
          (w[23] = f))
        : (f = w[23]),
      w[24] === Symbol.for("react.memo_cache_sentinel")
        ? ((x = (e) => {
            (e.stopPropagation(), e.preventDefault(), E(!0));
          }),
          (w[24] = x))
        : (x = w[24]),
      w[25] !== D
        ? ((h = (0, i.c)(d.v, "shrink-0", D)), (w[25] = D), (w[26] = h))
        : (h = w[26]),
      w[27] !== H || w[28] !== h || w[29] !== f
        ? ((p = (0, t.jsx)(a.b, {
            asChild: !0,
            children: (0, t.jsx)("button", {
              type: "button",
              "aria-label": f,
              "data-testid": "followed-holders-facepile",
              onClick: x,
              className: h,
              children: H,
            }),
          })),
          (w[27] = H),
          (w[28] = h),
          (w[29] = f),
          (w[30] = p))
        : (p = w[30]),
      w[31] !== N || w[32] !== M || w[33] !== y
        ? ((v = (0, t.jsx)(I, { mint: y, coin: N, open: M })),
          (w[31] = N),
          (w[32] = M),
          (w[33] = y),
          (w[34] = v))
        : (v = w[34]),
      w[35] !== $ || w[36] !== v
        ? ((b = (0, t.jsx)(a.P, {
            side: "bottom",
            align: $,
            className: "w-80 p-3",
            onClick: P,
            children: v,
          })),
          (w[35] = $),
          (w[36] = v),
          (w[37] = b))
        : (b = w[37]),
      w[38] !== M || w[39] !== p || w[40] !== b
        ? ((g = (0, t.jsxs)(a.c, {
            open: M,
            onOpenChange: E,
            openDelay: 300,
            closeDelay: 150,
            children: [p, b],
          })),
          (w[38] = M),
          (w[39] = p),
          (w[40] = b),
          (w[41] = g))
        : (g = w[41]),
      g
    );
  }
  function P(e) {
    return e.stopPropagation();
  }
  function I(e) {
    let r,
      a,
      s,
      o,
      d,
      m,
      c,
      u,
      f = (0, l.c)(50),
      { mint: x, coin: h, open: p } = e,
      { t: b } = (0, n.f)(),
      g = h?.chain_id;
    f[0] !== x || f[1] !== p || f[2] !== g
      ? ((r = { mint: x, includePositions: !0, coinChain: g, enabled: p }),
        (f[0] = x),
        (f[1] = p),
        (f[2] = g),
        (f[3] = r))
      : (r = f[3]);
    let { data: w, isPending: y, isError: N } = j(r);
    (f[4] !== w?.followedHolders
      ? ((a = w?.followedHolders ?? []),
        (f[4] = w?.followedHolders),
        (f[5] = a))
      : (a = f[5]),
      f[6] !== w?.positions
        ? ((s = w?.positions ?? []), (f[6] = w?.positions), (f[7] = s))
        : (s = f[7]),
      f[8] !== a || f[9] !== s
        ? ((o = (0, v.F)(a, s)), (f[8] = a), (f[9] = s), (f[10] = o))
        : (o = f[10]));
    let k = o;
    if (N) {
      let e, l;
      (f[11] !== b
        ? ((e = b("web.callouts.holders_error")), (f[11] = b), (f[12] = e))
        : (e = f[12]),
        f[13] !== e
          ? ((l = (0, t.jsx)("p", {
              className: "py-3 text-xs text-text-tertiary",
              children: e,
            })),
            (f[13] = e),
            (f[14] = l))
          : (l = f[14]),
        (d = l));
    } else if (y || !w) {
      let e;
      (f[15] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)("div", {
            "aria-hidden": !0,
            "data-testid": "followed-holders-panel-skeleton",
            className: "flex flex-col gap-2 py-1",
            children: Array.from({ length: 3 }).map(U),
          })),
          (f[15] = e))
        : (e = f[15]),
        (d = e));
    } else if (0 === k.length) {
      let e, l;
      (f[16] !== b
        ? ((e = b("web.callouts.followed_holders_empty")),
          (f[16] = b),
          (f[17] = e))
        : (e = f[17]),
        f[18] !== e
          ? ((l = (0, t.jsx)("p", {
              className: "py-3 text-xs text-text-tertiary",
              children: e,
            })),
            (f[18] = e),
            (f[19] = l))
          : (l = f[19]),
        (d = l));
    } else {
      let e, l, r, a, s, n, o, m, c, u;
      (f[20] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, i.c)(
            C,
            "border-b border-border-secondary pb-2 text-[11px] font-medium text-text-tertiary",
          )),
          (f[20] = e))
        : (e = f[20]),
        f[21] !== b
          ? ((l = b("web.callouts.holder_column")), (f[21] = b), (f[22] = l))
          : (l = f[22]),
        f[23] !== l
          ? ((r = (0, t.jsx)("span", { children: l })),
            (f[23] = l),
            (f[24] = r))
          : (r = f[24]),
        f[25] !== b
          ? ((a = b("coin_details.position")), (f[25] = b), (f[26] = a))
          : (a = f[26]),
        f[27] !== a
          ? ((s = (0, t.jsx)("span", { children: a })),
            (f[27] = a),
            (f[28] = s))
          : (s = f[28]),
        f[29] !== b
          ? ((n = b("share.profile.pnl_label")), (f[29] = b), (f[30] = n))
          : (n = f[30]),
        f[31] !== n
          ? ((o = (0, t.jsx)("span", { children: n })),
            (f[31] = n),
            (f[32] = o))
          : (o = f[32]),
        f[33] !== o || f[34] !== r || f[35] !== s
          ? ((m = (0, t.jsxs)("div", { className: e, children: [r, s, o] })),
            (f[33] = o),
            (f[34] = r),
            (f[35] = s),
            (f[36] = m))
          : (m = f[36]),
        f[37] !== h || f[38] !== k
          ? ((c = (0, t.jsx)($, { rows: k, coin: h })),
            (f[37] = h),
            (f[38] = k),
            (f[39] = c))
          : (c = f[39]),
        f[40] !== m || f[41] !== c
          ? ((u = (0, t.jsxs)(t.Fragment, { children: [m, c] })),
            (f[40] = m),
            (f[41] = c),
            (f[42] = u))
          : (u = f[42]),
        (d = u));
    }
    return (
      f[43] !== b
        ? ((m = b("web.callouts.followed_holders_title")),
          (f[43] = b),
          (f[44] = m))
        : (m = f[44]),
      f[45] !== m
        ? ((c = (0, t.jsx)("p", {
            className:
              "pb-2 text-[13px] font-medium leading-4 text-text-primary",
            children: m,
          })),
          (f[45] = m),
          (f[46] = c))
        : (c = f[46]),
      f[47] !== d || f[48] !== c
        ? ((u = (0, t.jsxs)("div", {
            "data-testid": "followed-holders-panel",
            children: [c, d],
          })),
          (f[47] = d),
          (f[48] = c),
          (f[49] = u))
        : (u = f[49]),
      u
    );
  }
  function U(e, l) {
    return (0, t.jsx)(m.l, { height: 32 }, l);
  }
  function $(e) {
    let i,
      r = (0, l.c)(3),
      { rows: a, coin: s } = e;
    return (
      r[0] !== s || r[1] !== a
        ? ((i = s
            ? (0, t.jsx)(z, { rows: a, coin: s })
            : (0, t.jsx)(M, { rows: a, pricePerTokenUsd: 0 })),
          (r[0] = s),
          (r[1] = a),
          (r[2] = i))
        : (i = r[2]),
      i
    );
  }
  function z(e) {
    let i,
      r,
      a = (0, l.c)(5),
      { rows: s, coin: n } = e;
    a[0] !== n ? ((i = { coin: n }), (a[0] = n), (a[1] = i)) : (i = a[1]);
    let o = (0, N.f)(i);
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
    let i,
      r,
      a,
      s = (0, l.c)(10),
      { rows: o, pricePerTokenUsd: d } = e,
      { t: m } = (0, n.f)();
    if (
      (s[0] !== m
        ? ((i = m("web.callouts.followed_holders_title")),
          (s[0] = m),
          (s[1] = i))
        : (i = s[1]),
      s[2] !== d || s[3] !== o)
    ) {
      let e;
      (s[5] !== d
        ? ((e = (e) =>
            (0, t.jsx)(E, { row: e, pricePerTokenUsd: d }, e.userId)),
          (s[5] = d),
          (s[6] = e))
        : (e = s[6]),
        (r = o.map(e)),
        (s[2] = d),
        (s[3] = o),
        (s[4] = r));
    } else r = s[4];
    return (
      s[7] !== i || s[8] !== r
        ? ((a = (0, t.jsx)("ul", {
            "aria-label": i,
            className: "flex max-h-72 w-full flex-col overflow-y-auto",
            children: r,
          })),
          (s[7] = i),
          (s[8] = r),
          (s[9] = a))
        : (a = s[9]),
      a
    );
  }
  function E(e) {
    let a,
      s,
      m,
      c,
      u,
      f,
      x,
      h,
      p,
      v,
      b = (0, l.c)(32),
      { row: g, pricePerTokenUsd: w } = e,
      { t: y } = (0, n.f)();
    b[0] !== g.username
      ? ((a = g.username.trim() || null), (b[0] = g.username), (b[1] = a))
      : (a = b[1]);
    let j = a;
    b[2] !== g.userId || b[3] !== g.walletAddress
      ? ((s = (0, r.$)({ address: g.walletAddress, userId: g.userId })),
        (b[2] = g.userId),
        (b[3] = g.walletAddress),
        (b[4] = s))
      : (s = b[4]);
    let N = s,
      k = null !== g.amountHeld && w > 0 ? g.amountHeld * w : null;
    b[5] === Symbol.for("react.memo_cache_sentinel")
      ? ((m = (0, i.c)(
          C,
          "border-b border-border-secondary py-2 last:border-b-0",
        )),
        (b[5] = m))
      : (m = b[5]);
    let _ = g.walletAddress,
      F = g.userId,
      A = g.profileImageUrl,
      D = g.resolvedAvatarDecoration;
    b[6] !== g ? ((c = (0, S.f)(g)), (b[6] = g), (b[7] = c)) : (c = b[7]);
    let P = !!N;
    return (
      b[8] !== g.walletAddress || b[9] !== y || b[10] !== j
        ? ((u =
            j ?? (g.walletAddress ? null : y("web.callouts.holder_column"))),
          (b[8] = g.walletAddress),
          (b[9] = y),
          (b[10] = j),
          (b[11] = u))
        : (u = b[11]),
      b[12] !== g.profileImageUrl ||
      b[13] !== g.resolvedAvatarDecoration ||
      b[14] !== g.userId ||
      b[15] !== g.walletAddress ||
      b[16] !== N ||
      b[17] !== c ||
      b[18] !== P ||
      b[19] !== u ||
      b[20] !== j
        ? ((f = (0, t.jsx)(d.S, {
            address: _,
            userId: F,
            username: j,
            profileImage: A,
            avatarDecoration: D,
            size: 24,
            density: "terminal",
            verified: c,
            link: P,
            href: N,
            nameOverride: u,
            className: "min-w-0",
          })),
          (b[12] = g.profileImageUrl),
          (b[13] = g.resolvedAvatarDecoration),
          (b[14] = g.userId),
          (b[15] = g.walletAddress),
          (b[16] = N),
          (b[17] = c),
          (b[18] = P),
          (b[19] = u),
          (b[20] = j),
          (b[21] = f))
        : (f = b[21]),
      b[22] !== k
        ? ((x = null != k && Number.isFinite(k) ? (0, o.l)(k) : "—"),
          (b[22] = k),
          (b[23] = x))
        : (x = b[23]),
      b[24] !== x
        ? ((h = (0, t.jsx)("span", {
            className: "text-xs tabular-nums text-text-secondary",
            children: x,
          })),
          (b[24] = x),
          (b[25] = h))
        : (h = b[25]),
      b[26] !== g.pnlUsd
        ? ((p = (0, t.jsx)("span", {
            children:
              null == g.pnlUsd
                ? (0, t.jsx)("span", {
                    className: "text-xs text-text-tertiary",
                    children: "—",
                  })
                : (0, t.jsx)("span", {
                    className: (0, i.c)(
                      "whitespace-nowrap text-xs font-medium tabular-nums",
                      (0, o.k)(g.pnlUsd),
                    ),
                    children: (0, o.u)(g.pnlUsd),
                  }),
          })),
          (b[26] = g.pnlUsd),
          (b[27] = p))
        : (p = b[27]),
      b[28] !== f || b[29] !== h || b[30] !== p
        ? ((v = (0, t.jsxs)("li", {
            "data-testid": "followed-holders-panel-row",
            className: m,
            children: [f, h, p],
          })),
          (b[28] = f),
          (b[29] = h),
          (b[30] = p),
          (b[31] = v))
        : (v = b[31]),
      v
    );
  }
  e.s(
    [
      "$",
      0,
      function (e) {
        let i,
          r,
          a,
          s,
          n,
          o = (0, l.c)(21),
          {
            mint: d,
            isLoggedIn: m,
            excludeWalletAddress: c,
            coin: u,
            avatarSize: f,
            className: x,
          } = e,
          h = u?.followed_holders,
          p = u?.chain_id,
          b = m && void 0 === h;
        o[0] !== d || o[1] !== p || o[2] !== b
          ? ((i = { mint: d, limit: v.A, coinChain: p, enabled: b }),
            (o[0] = d),
            (o[1] = p),
            (o[2] = b),
            (o[3] = i))
          : (i = o[3]);
        let { data: g } = j(i);
        o[4] !== g || o[5] !== h
          ? ((r =
              void 0 !== h
                ? h
                : g
                  ? { holders: g.followedHolders, totalCount: g.totalCount }
                  : null),
            (o[4] = g),
            (o[5] = h),
            (o[6] = r))
          : (r = o[6]);
        let w = r;
        if (!w || 0 === w.holders.length) return null;
        if (o[7] !== c || o[8] !== w.holders) {
          let e;
          (o[10] !== c
            ? ((e = (e) => !(0, k.f)(e.walletAddress, c)),
              (o[10] = c),
              (o[11] = e))
            : (e = o[11]),
            (a = w.holders.filter(e)),
            (o[7] = c),
            (o[8] = w.holders),
            (o[9] = a));
        } else a = o[9];
        let y = a;
        if (0 === y.length) return null;
        let N = w.holders.length - y.length,
          S = Math.max(w.totalCount - N, y.length);
        return (
          o[12] !== y || o[13] !== S
            ? ((s = { holders: y, totalCount: S }),
              (o[12] = y),
              (o[13] = S),
              (o[14] = s))
            : (s = o[14]),
          o[15] !== f ||
          o[16] !== x ||
          o[17] !== u ||
          o[18] !== d ||
          o[19] !== s
            ? ((n = (0, t.jsx)(D, {
                mint: d,
                followedHolders: s,
                coin: u,
                avatarSize: f,
                className: x,
              })),
              (o[15] = f),
              (o[16] = x),
              (o[17] = u),
              (o[18] = d),
              (o[19] = s),
              (o[20] = n))
            : (n = o[20]),
          n
        );
      },
      "E",
      0,
      D,
      "g",
      0,
      I,
    ],
    337689,
  );
};
