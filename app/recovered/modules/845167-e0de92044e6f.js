// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(745018),
    l = e.i(439587),
    n = e.i(322315),
    a = e.i(254010),
    s = e.i(574472),
    o = e.i(458310),
    d = e.i(352386);
  e.i(12692);
  var c = e.i(398902),
    u = e.i(959594),
    m = e.i(411534),
    h = e.i(218578),
    f = e.i(360633),
    x = e.i(167958),
    p = e.i(38279),
    y = e.i(629169),
    v = e.i(198825);
  function w(e) {
    let i,
      d,
      u,
      h,
      f,
      w,
      j,
      _,
      k,
      C,
      N = (0, r.c)(34),
      { onClose: A, onShare: I } = e,
      { t: S } = (0, c.f)(),
      { address: E, user: L } = (0, s.F)(),
      { setShowWallet: U } = (0, v.useConnectWallet)(),
      B = !!E,
      P = (0, a.k)(n.D.WEB_REWARDS_PAGE, !1),
      R = E ?? "";
    N[0] !== R
      ? ((i = {
          kind: "callout",
          page: p.v.USER_PAYOUTS.PAGE,
          pageSize: p.v.USER_PAYOUTS.PAGE_SIZE,
          userAddress: R,
        }),
        (N[0] = R),
        (N[1] = i))
      : (i = N[1]);
    let T = (0, y.f)(i),
      V = T.data?.totalPaidUsdc,
      M = 0 === V,
      $ = T.isError && void 0 === V,
      D = !$ && void 0 === V;
    N[2] !== E ||
    N[3] !== I ||
    N[4] !== T.data?.payouts ||
    N[5] !== V ||
    N[6] !== L
      ? ((d = () => {
          E &&
            I({
              totalPaidUsdc: V ?? 0,
              mostRecentPayout: T.data?.payouts.find(b),
              address: E,
              user: L,
            });
        }),
        (N[2] = E),
        (N[3] = I),
        (N[4] = T.data?.payouts),
        (N[5] = V),
        (N[6] = L),
        (N[7] = d))
      : (d = N[7]);
    let z = d;
    N[8] !== A || N[9] !== U
      ? ((u = () => {
          (A(), U(!0));
        }),
        (N[8] = A),
        (N[9] = U),
        (N[10] = u))
      : (u = N[10]);
    let F = u;
    return (
      N[11] !== T
        ? ((h = () => void T.refetch()), (N[11] = T), (N[12] = h))
        : (h = N[12]),
      N[13] !== z ||
      N[14] !== F ||
      N[15] !== M ||
      N[16] !== $ ||
      N[17] !== B ||
      N[18] !== h ||
      N[19] !== V
        ? ((f = (0, t.jsx)(g, {
            isSignedIn: B,
            isLoadFailed: $,
            isEmpty: M,
            totalPaidUsdc: V,
            onShare: z,
            onRetry: h,
            onSignIn: F,
          })),
          (N[13] = z),
          (N[14] = F),
          (N[15] = M),
          (N[16] = $),
          (N[17] = B),
          (N[18] = h),
          (N[19] = V),
          (N[20] = f))
        : (f = N[20]),
      N[21] === Symbol.for("react.memo_cache_sentinel")
        ? ((w = (0, t.jsx)(x.a, {})),
          (j = (0, t.jsx)(m.f, {})),
          (N[21] = w),
          (N[22] = j))
        : ((w = N[21]), (j = N[22])),
      N[23] !== f
        ? ((_ = (0, t.jsxs)(x.K, {
            className: "flex flex-col gap-4",
            children: [f, w, j],
          })),
          (N[23] = f),
          (N[24] = _))
        : (_ = N[24]),
      N[25] !== D || N[26] !== P || N[27] !== B || N[28] !== A || N[29] !== S
        ? ((k =
            B && P
              ? (0, t.jsx)(x.c, {
                  children: D
                    ? (0, t.jsx)(l.K, {
                        variant: "secondary",
                        size: x.Z,
                        isFullWidth: !0,
                        isDisabled: !0,
                        "data-testid": "callout-rewards-view-all",
                        children: S("callouts.rewards.view_all_payouts"),
                      })
                    : (0, t.jsx)(l.L, {
                        as: o.default,
                        href: "/rewards",
                        variant: "secondary",
                        size: x.Z,
                        isFullWidth: !0,
                        onClick: A,
                        "data-testid": "callout-rewards-view-all",
                        children: S("callouts.rewards.view_all_payouts"),
                      }),
                })
              : null),
          (N[25] = D),
          (N[26] = P),
          (N[27] = B),
          (N[28] = A),
          (N[29] = S),
          (N[30] = k))
        : (k = N[30]),
      N[31] !== k || N[32] !== _
        ? ((C = (0, t.jsxs)(t.Fragment, { children: [_, k] })),
          (N[31] = k),
          (N[32] = _),
          (N[33] = C))
        : (C = N[33]),
      C
    );
  }
  function b(e) {
    return "confirmed" === e.status;
  }
  function g(e) {
    let i,
      l = (0, r.c)(8),
      {
        isSignedIn: n,
        isLoadFailed: a,
        isEmpty: s,
        totalPaidUsdc: o,
        onShare: d,
        onRetry: c,
        onSignIn: m,
      } = e;
    if (!n) {
      let e;
      return (
        l[0] !== m
          ? ((e = (0, t.jsx)(j, { onSignIn: m })), (l[0] = m), (l[1] = e))
          : (e = l[1]),
        e
      );
    }
    if (a) {
      let e;
      return (
        l[2] !== c
          ? ((e = (0, t.jsx)(_, { onRetry: c })), (l[2] = c), (l[3] = e))
          : (e = l[3]),
        e
      );
    }
    if (s) {
      let e;
      return (
        l[4] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)(u.f, {})), (l[4] = e))
          : (e = l[4]),
        e
      );
    }
    return (
      l[5] !== d || l[6] !== o
        ? ((i = (0, t.jsx)(f.f, { totalPaidUsdc: o, onShare: d })),
          (l[5] = d),
          (l[6] = o),
          (l[7] = i))
        : (i = l[7]),
      i
    );
  }
  function j(e) {
    let n,
      a,
      s,
      o,
      d,
      u,
      m = (0, r.c)(13),
      { onSignIn: h } = e,
      { t: f } = (0, c.f)();
    return (
      m[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, t.jsx)("span", {
            className:
              "inline-grid size-7 shrink-0 place-items-center rounded-md bg-bg-tertiary text-text-tertiary",
            children: (0, t.jsx)(i.dl, {
              className: "size-4",
              "aria-hidden": !0,
            }),
          })),
          (m[0] = n))
        : (n = m[0]),
      m[1] !== f
        ? ((a = f("profile.rewards.sign_in_title")), (m[1] = f), (m[2] = a))
        : (a = m[2]),
      m[3] !== a
        ? ((s = (0, t.jsxs)("div", {
            className: "flex items-center gap-3",
            children: [
              n,
              (0, t.jsx)("p", {
                className: "text-sm leading-5 font-medium text-text-primary",
                children: a,
              }),
            ],
          })),
          (m[3] = a),
          (m[4] = s))
        : (s = m[4]),
      m[5] !== f
        ? ((o = f("common.sign_in")), (m[5] = f), (m[6] = o))
        : (o = m[6]),
      m[7] !== h || m[8] !== o
        ? ((d = (0, t.jsx)(l.K, {
            variant: "primary",
            size: x.$,
            isFullWidth: !0,
            onClick: h,
            "data-testid": "callout-rewards-sign-in",
            children: o,
          })),
          (m[7] = h),
          (m[8] = o),
          (m[9] = d))
        : (d = m[9]),
      m[10] !== s || m[11] !== d
        ? ((u = (0, t.jsxs)("section", {
            "data-testid": "callout-rewards-signed-out",
            className: "flex flex-col gap-3",
            children: [s, d],
          })),
          (m[10] = s),
          (m[11] = d),
          (m[12] = u))
        : (u = m[12]),
      u
    );
  }
  function _(e) {
    let i,
      n,
      a,
      s,
      o,
      d = (0, r.c)(12),
      { onRetry: u } = e,
      { t: m } = (0, c.f)();
    return (
      d[0] !== m
        ? ((i = m("web.rewards.callout_payouts_error")), (d[0] = m), (d[1] = i))
        : (i = d[1]),
      d[2] !== i
        ? ((n = (0, t.jsx)("p", {
            className: "text-[13px] leading-[18px] text-text-tertiary",
            children: i,
          })),
          (d[2] = i),
          (d[3] = n))
        : (n = d[3]),
      d[4] !== m
        ? ((a = m("common.try_again")), (d[4] = m), (d[5] = a))
        : (a = d[5]),
      d[6] !== u || d[7] !== a
        ? ((s = (0, t.jsx)(l.K, {
            variant: "secondary",
            size: x.Z,
            isFullWidth: !0,
            onClick: u,
            "data-testid": "callout-rewards-retry",
            children: a,
          })),
          (d[6] = u),
          (d[7] = a),
          (d[8] = s))
        : (s = d[8]),
      d[9] !== n || d[10] !== s
        ? ((o = (0, t.jsxs)("section", {
            "data-testid": "callout-rewards-load-failed",
            className: "flex flex-col gap-3",
            children: [n, s],
          })),
          (d[9] = n),
          (d[10] = s),
          (d[11] = o))
        : (o = d[11]),
      o
    );
  }
  e.s([
    "f",
    0,
    function (e) {
      let i,
        l,
        n,
        a,
        s,
        o,
        u,
        m = (0, r.c)(21),
        { isOpen: f, onOpenChange: p } = e,
        { t: y } = (0, c.f)(),
        [v, b] = (0, d.useState)(null),
        [g, j] = (0, d.useState)(!1);
      m[0] !== p ? ((i = () => p(!1)), (m[0] = p), (m[1] = i)) : (i = m[1]);
      let _ = i;
      m[2] !== _
        ? ((l = (e) => {
            (b(e), _(), j(!0));
          }),
          (m[2] = _),
          (m[3] = l))
        : (l = m[3]);
      let k = l;
      return (
        m[4] !== y
          ? ((n = y("callouts.rewards.title")), (m[4] = y), (m[5] = n))
          : (n = m[5]),
        m[6] !== _ || m[7] !== k || m[8] !== f
          ? ((a = f ? (0, t.jsx)(w, { onClose: _, onShare: k }) : null),
            (m[6] = _),
            (m[7] = k),
            (m[8] = f),
            (m[9] = a))
          : (a = m[9]),
        m[10] !== f || m[11] !== p || m[12] !== n || m[13] !== a
          ? ((s = (0, t.jsx)(x.N, {
              open: f,
              onOpenChange: p,
              size: "md",
              title: n,
              "data-testid": "callout-rewards-dialog",
              children: a,
            })),
            (m[10] = f),
            (m[11] = p),
            (m[12] = n),
            (m[13] = a),
            (m[14] = s))
          : (s = m[14]),
        m[15] !== g || m[16] !== v
          ? ((o = v
              ? (0, t.jsx)(h.f, {
                  open: g,
                  onOpenChange: j,
                  holderAddress: v.address,
                  user: v.user,
                  totalPaidUsdc: v.totalPaidUsdc,
                  mostRecentPayout: v.mostRecentPayout,
                })
              : null),
            (m[15] = g),
            (m[16] = v),
            (m[17] = o))
          : (o = m[17]),
        m[18] !== s || m[19] !== o
          ? ((u = (0, t.jsxs)(t.Fragment, { children: [s, o] })),
            (m[18] = s),
            (m[19] = o),
            (m[20] = u))
          : (u = m[20]),
        u
      );
    },
  ]);
};
