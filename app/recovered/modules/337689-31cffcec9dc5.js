// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    r = e.i(426091),
    i = e.i(146695),
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
    m = e.i(574472),
    p = e.i(466931);
  let f = null,
    x = null,
    h = (e, t, l, r = {}) => {
      let { revalidateSession: i } = (0, m.F)(),
        a = t(e),
        n = (0, s.useRef)(r.onSessionValid);
      ((n.current = r.onSessionValid),
        (0, s.useEffect)(() => {
          if (!a || "function" != typeof i) return;
          let e = !1;
          return (
            ((e, t) => {
              if (f) return f;
              if (null !== x && Date.now() - x < 1e4)
                return Promise.resolve("skipped");
              let l = e()
                .then(
                  (e) => (
                    (0, p.B)({
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
            })(i, l).then((t) => {
              e || "ok" !== t || n.current?.();
            }),
            () => {
              e = !0;
            }
          );
        }, [a, e, i, l]));
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
        i,
        a,
        s,
        n,
        o = (0, l.c)(22),
        {
          mint: d,
          limit: c,
          includePositions: m,
          coinChain: p,
          enabled: f,
        } = e,
        x = void 0 === c ? 50 : c,
        j = void 0 !== m && m,
        N = (0, v.f)("followed-holders"),
        I = (0, y.l)();
      o[0] !== p || o[1] !== I
        ? ((t = w(p, I)), (o[0] = p), (o[1] = I), (o[2] = t))
        : (t = o[2]);
      let { chain: _, readable: k } = t,
        C = d ?? "";
      (o[3] !== _ ? ((r = _ ? [_] : []), (o[3] = _), (o[4] = r)) : (r = o[4]),
        o[5] !== j || o[6] !== x || o[7] !== C || o[8] !== r || o[9] !== N
          ? ((i = ["callouts", "followed-holders", N, C, x, j, ...r]),
            (o[5] = j),
            (o[6] = x),
            (o[7] = C),
            (o[8] = r),
            (o[9] = N),
            (o[10] = i))
          : (i = o[10]),
        o[11] !== _ || o[12] !== j || o[13] !== x || o[14] !== d
          ? ((a = (e) => {
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
            (o[15] = a))
          : (a = o[15]));
      let S = (void 0 === f || f) && k && !!d;
      o[16] !== i || o[17] !== a || o[18] !== S
        ? ((s = {
            queryKey: i,
            queryFn: a,
            enabled: S,
            staleTime: 6e4,
            retry: b,
          }),
          (o[16] = i),
          (o[17] = a),
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
    let i,
      o,
      c,
      u,
      m,
      p,
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
      E = void 0 === I ? "md" : I,
      D = void 0 === _ ? "end" : _,
      { t: q } = (0, n.f)(),
      [M, z] = (0, s.useState)(!1),
      T = S[E],
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
        ((i = Math.min(j.totalCount - l.length, 99)),
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
        (b[3] = i),
        (b[4] = o),
        (b[5] = c));
    } else ((i = b[3]), (o = b[4]), (c = b[5]));
    if (c !== Symbol.for("react.early_return_sentinel")) return c;
    (b[8] !== E || b[9] !== i
      ? ((u =
          i > 0
            ? (0, t.jsx)("span", {
                "data-testid": "followed-holders-overflow",
                className: "relative block rounded-full",
                children: (0, t.jsxs)("span", {
                  className: (0, r.c)(
                    "flex items-center justify-center rounded-full bg-bg-primary text-[11px] font-medium text-text-secondary",
                    P[E],
                  ),
                  children: [i, "+"],
                }),
              })
            : null),
        (b[8] = E),
        (b[9] = i),
        (b[10] = u))
      : (u = b[10]),
      b[11] !== o || b[12] !== u
        ? ((m = (0, t.jsxs)(t.Fragment, { children: [o, u] })),
          (b[11] = o),
          (b[12] = u),
          (b[13] = m))
        : (m = b[13]));
    let O = m;
    if (!(void 0 === C || C)) {
      let e, l, i;
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
          ? ((i = (0, t.jsx)("span", {
              "aria-label": e,
              "data-testid": "followed-holders-facepile",
              "data-interactive": "false",
              className: l,
              children: O,
            })),
            (b[18] = O),
            (b[19] = e),
            (b[20] = l),
            (b[21] = i))
          : (i = b[21]),
        i
      );
    }
    return (
      b[22] !== q
        ? ((p = q("web.callouts.followed_holders_title")),
          (b[22] = q),
          (b[23] = p))
        : (p = b[23]),
      b[24] === Symbol.for("react.memo_cache_sentinel")
        ? ((f = (e) => {
            (e.stopPropagation(), e.preventDefault(), z(!0));
          }),
          (b[24] = f))
        : (f = b[24]),
      b[25] !== U
        ? ((x = (0, r.c)(d.v, "shrink-0", U)), (b[25] = U), (b[26] = x))
        : (x = b[26]),
      b[27] !== O || b[28] !== x || b[29] !== p
        ? ((h = (0, t.jsx)(a.b, {
            asChild: !0,
            children: (0, t.jsx)("button", {
              type: "button",
              "aria-label": p,
              "data-testid": "followed-holders-facepile",
              onClick: f,
              className: x,
              children: O,
            }),
          })),
          (b[27] = O),
          (b[28] = x),
          (b[29] = p),
          (b[30] = h))
        : (h = b[30]),
      b[31] !== N || b[32] !== M || b[33] !== w
        ? ((g = (0, t.jsx)(F, { mint: w, coin: N, open: M })),
          (b[31] = N),
          (b[32] = M),
          (b[33] = w),
          (b[34] = g))
        : (g = b[34]),
      b[35] !== D || b[36] !== g
        ? ((y = (0, t.jsx)(a.P, {
            side: "bottom",
            align: D,
            className: "w-80 p-3",
            onClick: A,
            children: g,
          })),
          (b[35] = D),
          (b[36] = g),
          (b[37] = y))
        : (y = b[37]),
      b[38] !== M || b[39] !== h || b[40] !== y
        ? ((v = (0, t.jsxs)(a.c, {
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
  function F(e) {
    let i,
      a,
      s,
      o,
      d,
      c,
      u,
      m,
      p = (0, l.c)(50),
      { mint: f, coin: x, open: h } = e,
      { t: y } = (0, n.f)(),
      v = x?.chain_id;
    p[0] !== f || p[1] !== h || p[2] !== v
      ? ((i = { mint: f, includePositions: !0, coinChain: v, enabled: h }),
        (p[0] = f),
        (p[1] = h),
        (p[2] = v),
        (p[3] = i))
      : (i = p[3]);
    let { data: b, isPending: w, isError: N } = j(i);
    (p[4] !== b?.followedHolders
      ? ((a = b?.followedHolders ?? []),
        (p[4] = b?.followedHolders),
        (p[5] = a))
      : (a = p[5]),
      p[6] !== b?.positions
        ? ((s = b?.positions ?? []), (p[6] = b?.positions), (p[7] = s))
        : (s = p[7]),
      p[8] !== a || p[9] !== s
        ? ((o = (0, g.F)(a, s)), (p[8] = a), (p[9] = s), (p[10] = o))
        : (o = p[10]));
    let I = o;
    if (N) {
      let e, l;
      (p[11] !== y
        ? ((e = y("web.callouts.holders_error")), (p[11] = y), (p[12] = e))
        : (e = p[12]),
        p[13] !== e
          ? ((l = (0, t.jsx)("p", {
              className: "py-3 text-xs text-text-tertiary",
              children: e,
            })),
            (p[13] = e),
            (p[14] = l))
          : (l = p[14]),
        (d = l));
    } else if (w || !b) {
      let e;
      (p[15] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)("div", {
            "aria-hidden": !0,
            "data-testid": "followed-holders-panel-skeleton",
            className: "flex flex-col gap-2 py-1",
            children: Array.from({ length: 3 }).map(E),
          })),
          (p[15] = e))
        : (e = p[15]),
        (d = e));
    } else if (0 === I.length) {
      let e, l;
      (p[16] !== y
        ? ((e = y("web.callouts.followed_holders_empty")),
          (p[16] = y),
          (p[17] = e))
        : (e = p[17]),
        p[18] !== e
          ? ((l = (0, t.jsx)("p", {
              className: "py-3 text-xs text-text-tertiary",
              children: e,
            })),
            (p[18] = e),
            (p[19] = l))
          : (l = p[19]),
        (d = l));
    } else {
      let e, l, i, a, s, n, o, c, u, m;
      (p[20] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, r.c)(
            C,
            "border-b border-border-secondary pb-2 text-[11px] font-medium text-text-tertiary",
          )),
          (p[20] = e))
        : (e = p[20]),
        p[21] !== y
          ? ((l = y("web.callouts.holder_column")), (p[21] = y), (p[22] = l))
          : (l = p[22]),
        p[23] !== l
          ? ((i = (0, t.jsx)("span", { children: l })),
            (p[23] = l),
            (p[24] = i))
          : (i = p[24]),
        p[25] !== y
          ? ((a = y("coin_details.position")), (p[25] = y), (p[26] = a))
          : (a = p[26]),
        p[27] !== a
          ? ((s = (0, t.jsx)("span", { children: a })),
            (p[27] = a),
            (p[28] = s))
          : (s = p[28]),
        p[29] !== y
          ? ((n = y("share.profile.pnl_label")), (p[29] = y), (p[30] = n))
          : (n = p[30]),
        p[31] !== n
          ? ((o = (0, t.jsx)("span", { children: n })),
            (p[31] = n),
            (p[32] = o))
          : (o = p[32]),
        p[33] !== o || p[34] !== i || p[35] !== s
          ? ((c = (0, t.jsxs)("div", { className: e, children: [i, s, o] })),
            (p[33] = o),
            (p[34] = i),
            (p[35] = s),
            (p[36] = c))
          : (c = p[36]),
        p[37] !== x || p[38] !== I
          ? ((u = (0, t.jsx)(D, { rows: I, coin: x })),
            (p[37] = x),
            (p[38] = I),
            (p[39] = u))
          : (u = p[39]),
        p[40] !== c || p[41] !== u
          ? ((m = (0, t.jsxs)(t.Fragment, { children: [c, u] })),
            (p[40] = c),
            (p[41] = u),
            (p[42] = m))
          : (m = p[42]),
        (d = m));
    }
    return (
      p[43] !== y
        ? ((c = y("web.callouts.followed_holders_title")),
          (p[43] = y),
          (p[44] = c))
        : (c = p[44]),
      p[45] !== c
        ? ((u = (0, t.jsx)("p", {
            className:
              "pb-2 text-[13px] font-medium leading-4 text-text-primary",
            children: c,
          })),
          (p[45] = c),
          (p[46] = u))
        : (u = p[46]),
      p[47] !== d || p[48] !== u
        ? ((m = (0, t.jsxs)("div", {
            "data-testid": "followed-holders-panel",
            children: [u, d],
          })),
          (p[47] = d),
          (p[48] = u),
          (p[49] = m))
        : (m = p[49]),
      m
    );
  }
  function E(e, l) {
    return (0, t.jsx)(c.l, { height: 32 }, l);
  }
  function D(e) {
    let r,
      i = (0, l.c)(3),
      { rows: a, coin: s } = e;
    return (
      i[0] !== s || i[1] !== a
        ? ((r = s
            ? (0, t.jsx)(q, { rows: a, coin: s })
            : (0, t.jsx)(M, { rows: a, pricePerTokenUsd: 0 })),
          (i[0] = s),
          (i[1] = a),
          (i[2] = r))
        : (r = i[2]),
      r
    );
  }
  function q(e) {
    let r,
      i,
      a = (0, l.c)(5),
      { rows: s, coin: n } = e;
    a[0] !== n ? ((r = { coin: n }), (a[0] = n), (a[1] = r)) : (r = a[1]);
    let o = (0, N.f)(r);
    return (
      a[2] !== o || a[3] !== s
        ? ((i = (0, t.jsx)(M, { rows: s, pricePerTokenUsd: o })),
          (a[2] = o),
          (a[3] = s),
          (a[4] = i))
        : (i = a[4]),
      i
    );
  }
  function M(e) {
    let r,
      i,
      a,
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
        (i = o.map(e)),
        (s[2] = d),
        (s[3] = o),
        (s[4] = i));
    } else i = s[4];
    return (
      s[7] !== r || s[8] !== i
        ? ((a = (0, t.jsx)("ul", {
            "aria-label": r,
            className: "flex max-h-72 w-full flex-col overflow-y-auto",
            children: i,
          })),
          (s[7] = r),
          (s[8] = i),
          (s[9] = a))
        : (a = s[9]),
      a
    );
  }
  function z(e) {
    let a,
      s,
      c,
      u,
      m,
      p,
      f,
      x,
      h,
      g,
      y = (0, l.c)(32),
      { row: v, pricePerTokenUsd: b } = e,
      { t: w } = (0, n.f)();
    y[0] !== v.username
      ? ((a = v.username.trim() || null), (y[0] = v.username), (y[1] = a))
      : (a = y[1]);
    let j = a;
    y[2] !== v.userId || y[3] !== v.walletAddress
      ? ((s = (0, i.$)({ address: v.walletAddress, userId: v.userId })),
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
        ? ((m =
            j ?? (v.walletAddress ? null : w("web.callouts.holder_column"))),
          (y[8] = v.walletAddress),
          (y[9] = w),
          (y[10] = j),
          (y[11] = m))
        : (m = y[11]),
      y[12] !== v.profileImageUrl ||
      y[13] !== v.resolvedAvatarDecoration ||
      y[14] !== v.userId ||
      y[15] !== v.walletAddress ||
      y[16] !== N ||
      y[17] !== u ||
      y[18] !== A ||
      y[19] !== m ||
      y[20] !== j
        ? ((p = (0, t.jsx)(d.S, {
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
            nameOverride: m,
            className: "min-w-0",
          })),
          (y[12] = v.profileImageUrl),
          (y[13] = v.resolvedAvatarDecoration),
          (y[14] = v.userId),
          (y[15] = v.walletAddress),
          (y[16] = N),
          (y[17] = u),
          (y[18] = A),
          (y[19] = m),
          (y[20] = j),
          (y[21] = p))
        : (p = y[21]),
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
      y[28] !== p || y[29] !== x || y[30] !== h
        ? ((g = (0, t.jsxs)("li", {
            "data-testid": "followed-holders-panel-row",
            className: c,
            children: [p, x, h],
          })),
          (y[28] = p),
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
          i,
          a,
          s,
          n,
          o = (0, l.c)(21),
          {
            mint: d,
            isLoggedIn: c,
            excludeWalletAddress: u,
            coin: m,
            avatarSize: p,
            className: f,
          } = e,
          x = m?.followed_holders,
          h = m?.chain_id,
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
          ? ((i =
              void 0 !== x
                ? x
                : v
                  ? { holders: v.followedHolders, totalCount: v.totalCount }
                  : null),
            (o[4] = v),
            (o[5] = x),
            (o[6] = i))
          : (i = o[6]);
        let b = i;
        if (!b || 0 === b.holders.length) return null;
        if (o[7] !== u || o[8] !== b.holders) {
          let e;
          (o[10] !== u
            ? ((e = (e) => !(0, I.f)(e.walletAddress, u)),
              (o[10] = u),
              (o[11] = e))
            : (e = o[11]),
            (a = b.holders.filter(e)),
            (o[7] = u),
            (o[8] = b.holders),
            (o[9] = a));
        } else a = o[9];
        let w = a;
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
          o[15] !== p ||
          o[16] !== f ||
          o[17] !== m ||
          o[18] !== d ||
          o[19] !== s
            ? ((n = (0, t.jsx)(U, {
                mint: d,
                followedHolders: s,
                coin: m,
                avatarSize: p,
                className: f,
              })),
              (o[15] = p),
              (o[16] = f),
              (o[17] = m),
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
      F,
    ],
    337689,
  );
};
