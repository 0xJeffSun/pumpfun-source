// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(745018),
    a = e.i(439587),
    i = e.i(322315),
    n = e.i(254010),
    s = e.i(574472),
    o = e.i(458310),
    d = e.i(352386);
  e.i(12692);
  var c = e.i(398902),
    u = e.i(959594),
    m = e.i(411534),
    f = e.i(218578),
    p = e.i(360633),
    h = e.i(167958),
    v = e.i(38279),
    b = e.i(629169),
    g = e.i(198825);
  function y(e) {
    let l,
      d,
      u,
      f,
      p,
      y,
      _,
      A,
      j,
      I,
      U = (0, r.c)(34),
      { onClose: S, onShare: N } = e,
      { t: C } = (0, c.f)(),
      { address: k, user: E } = (0, s.F)(),
      { setShowWallet: M } = (0, g.useConnectWallet)(),
      P = !!k,
      F = (0, n.k)(i.D.WEB_REWARDS_PAGE, !1),
      R = k ?? "";
    U[0] !== R
      ? ((l = {
          kind: "callout",
          page: v.v.USER_PAYOUTS.PAGE,
          pageSize: v.v.USER_PAYOUTS.PAGE_SIZE,
          userAddress: R,
        }),
        (U[0] = R),
        (U[1] = l))
      : (l = U[1]);
    let T = (0, b.f)(l),
      z = T.data?.totalPaidUsdc,
      O = 0 === z,
      $ = T.isError && void 0 === z,
      K = !$ && void 0 === z;
    U[2] !== k ||
    U[3] !== N ||
    U[4] !== T.data?.payouts ||
    U[5] !== z ||
    U[6] !== E
      ? ((d = () => {
          k &&
            N({
              totalPaidUsdc: z ?? 0,
              mostRecentPayout: T.data?.payouts.find(x),
              address: k,
              user: E,
            });
        }),
        (U[2] = k),
        (U[3] = N),
        (U[4] = T.data?.payouts),
        (U[5] = z),
        (U[6] = E),
        (U[7] = d))
      : (d = U[7]);
    let B = d;
    U[8] !== S || U[9] !== M
      ? ((u = () => {
          (S(), M(!0));
        }),
        (U[8] = S),
        (U[9] = M),
        (U[10] = u))
      : (u = U[10]);
    let L = u;
    return (
      U[11] !== T
        ? ((f = () => void T.refetch()), (U[11] = T), (U[12] = f))
        : (f = U[12]),
      U[13] !== B ||
      U[14] !== L ||
      U[15] !== O ||
      U[16] !== $ ||
      U[17] !== P ||
      U[18] !== f ||
      U[19] !== z
        ? ((p = (0, t.jsx)(w, {
            isSignedIn: P,
            isLoadFailed: $,
            isEmpty: O,
            totalPaidUsdc: z,
            onShare: B,
            onRetry: f,
            onSignIn: L,
          })),
          (U[13] = B),
          (U[14] = L),
          (U[15] = O),
          (U[16] = $),
          (U[17] = P),
          (U[18] = f),
          (U[19] = z),
          (U[20] = p))
        : (p = U[20]),
      U[21] === Symbol.for("react.memo_cache_sentinel")
        ? ((y = (0, t.jsx)(h.a, {})),
          (_ = (0, t.jsx)(m.f, {})),
          (U[21] = y),
          (U[22] = _))
        : ((y = U[21]), (_ = U[22])),
      U[23] !== p
        ? ((A = (0, t.jsxs)(h.K, {
            className: "flex flex-col gap-4",
            children: [p, y, _],
          })),
          (U[23] = p),
          (U[24] = A))
        : (A = U[24]),
      U[25] !== K || U[26] !== F || U[27] !== P || U[28] !== S || U[29] !== C
        ? ((j =
            P && F
              ? (0, t.jsx)(h.c, {
                  children: K
                    ? (0, t.jsx)(a.K, {
                        variant: "secondary",
                        size: h.Z,
                        isFullWidth: !0,
                        isDisabled: !0,
                        "data-testid": "callout-rewards-view-all",
                        children: C("callouts.rewards.view_all_payouts"),
                      })
                    : (0, t.jsx)(a.L, {
                        as: o.default,
                        href: "/rewards",
                        variant: "secondary",
                        size: h.Z,
                        isFullWidth: !0,
                        onClick: S,
                        "data-testid": "callout-rewards-view-all",
                        children: C("callouts.rewards.view_all_payouts"),
                      }),
                })
              : null),
          (U[25] = K),
          (U[26] = F),
          (U[27] = P),
          (U[28] = S),
          (U[29] = C),
          (U[30] = j))
        : (j = U[30]),
      U[31] !== j || U[32] !== A
        ? ((I = (0, t.jsxs)(t.Fragment, { children: [A, j] })),
          (U[31] = j),
          (U[32] = A),
          (U[33] = I))
        : (I = U[33]),
      I
    );
  }
  function x(e) {
    return "confirmed" === e.status;
  }
  function w(e) {
    let l,
      a = (0, r.c)(8),
      {
        isSignedIn: i,
        isLoadFailed: n,
        isEmpty: s,
        totalPaidUsdc: o,
        onShare: d,
        onRetry: c,
        onSignIn: m,
      } = e;
    if (!i) {
      let e;
      return (
        a[0] !== m
          ? ((e = (0, t.jsx)(_, { onSignIn: m })), (a[0] = m), (a[1] = e))
          : (e = a[1]),
        e
      );
    }
    if (n) {
      let e;
      return (
        a[2] !== c
          ? ((e = (0, t.jsx)(A, { onRetry: c })), (a[2] = c), (a[3] = e))
          : (e = a[3]),
        e
      );
    }
    if (s) {
      let e;
      return (
        a[4] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)(u.f, {})), (a[4] = e))
          : (e = a[4]),
        e
      );
    }
    return (
      a[5] !== d || a[6] !== o
        ? ((l = (0, t.jsx)(p.f, { totalPaidUsdc: o, onShare: d })),
          (a[5] = d),
          (a[6] = o),
          (a[7] = l))
        : (l = a[7]),
      l
    );
  }
  function _(e) {
    let i,
      n,
      s,
      o,
      d,
      u,
      m = (0, r.c)(13),
      { onSignIn: f } = e,
      { t: p } = (0, c.f)();
    return (
      m[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsx)("span", {
            className:
              "inline-grid size-7 shrink-0 place-items-center rounded-md bg-bg-tertiary text-text-tertiary",
            children: (0, t.jsx)(l.dl, {
              className: "size-4",
              "aria-hidden": !0,
            }),
          })),
          (m[0] = i))
        : (i = m[0]),
      m[1] !== p
        ? ((n = p("profile.rewards.sign_in_title")), (m[1] = p), (m[2] = n))
        : (n = m[2]),
      m[3] !== n
        ? ((s = (0, t.jsxs)("div", {
            className: "flex items-center gap-3",
            children: [
              i,
              (0, t.jsx)("p", {
                className: "text-sm leading-5 font-medium text-text-primary",
                children: n,
              }),
            ],
          })),
          (m[3] = n),
          (m[4] = s))
        : (s = m[4]),
      m[5] !== p
        ? ((o = p("common.sign_in")), (m[5] = p), (m[6] = o))
        : (o = m[6]),
      m[7] !== f || m[8] !== o
        ? ((d = (0, t.jsx)(a.K, {
            variant: "primary",
            size: h.$,
            isFullWidth: !0,
            onClick: f,
            "data-testid": "callout-rewards-sign-in",
            children: o,
          })),
          (m[7] = f),
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
  function A(e) {
    let l,
      i,
      n,
      s,
      o,
      d = (0, r.c)(12),
      { onRetry: u } = e,
      { t: m } = (0, c.f)();
    return (
      d[0] !== m
        ? ((l = m("web.rewards.callout_payouts_error")), (d[0] = m), (d[1] = l))
        : (l = d[1]),
      d[2] !== l
        ? ((i = (0, t.jsx)("p", {
            className: "text-[13px] leading-[18px] text-text-tertiary",
            children: l,
          })),
          (d[2] = l),
          (d[3] = i))
        : (i = d[3]),
      d[4] !== m
        ? ((n = m("common.try_again")), (d[4] = m), (d[5] = n))
        : (n = d[5]),
      d[6] !== u || d[7] !== n
        ? ((s = (0, t.jsx)(a.K, {
            variant: "secondary",
            size: h.Z,
            isFullWidth: !0,
            onClick: u,
            "data-testid": "callout-rewards-retry",
            children: n,
          })),
          (d[6] = u),
          (d[7] = n),
          (d[8] = s))
        : (s = d[8]),
      d[9] !== i || d[10] !== s
        ? ((o = (0, t.jsxs)("section", {
            "data-testid": "callout-rewards-load-failed",
            className: "flex flex-col gap-3",
            children: [i, s],
          })),
          (d[9] = i),
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
      let l,
        a,
        i,
        n,
        s,
        o,
        u,
        m = (0, r.c)(21),
        { isOpen: p, onOpenChange: v } = e,
        { t: b } = (0, c.f)(),
        [g, x] = (0, d.useState)(null),
        [w, _] = (0, d.useState)(!1);
      m[0] !== v ? ((l = () => v(!1)), (m[0] = v), (m[1] = l)) : (l = m[1]);
      let A = l;
      m[2] !== A
        ? ((a = (e) => {
            (x(e), A(), _(!0));
          }),
          (m[2] = A),
          (m[3] = a))
        : (a = m[3]);
      let j = a;
      return (
        m[4] !== b
          ? ((i = b("callouts.rewards.title")), (m[4] = b), (m[5] = i))
          : (i = m[5]),
        m[6] !== A || m[7] !== j || m[8] !== p
          ? ((n = p ? (0, t.jsx)(y, { onClose: A, onShare: j }) : null),
            (m[6] = A),
            (m[7] = j),
            (m[8] = p),
            (m[9] = n))
          : (n = m[9]),
        m[10] !== p || m[11] !== v || m[12] !== i || m[13] !== n
          ? ((s = (0, t.jsx)(h.N, {
              open: p,
              onOpenChange: v,
              size: "md",
              title: i,
              "data-testid": "callout-rewards-dialog",
              children: n,
            })),
            (m[10] = p),
            (m[11] = v),
            (m[12] = i),
            (m[13] = n),
            (m[14] = s))
          : (s = m[14]),
        m[15] !== w || m[16] !== g
          ? ((o = g
              ? (0, t.jsx)(f.f, {
                  open: w,
                  onOpenChange: _,
                  holderAddress: g.address,
                  user: g.user,
                  totalPaidUsdc: g.totalPaidUsdc,
                  mostRecentPayout: g.mostRecentPayout,
                })
              : null),
            (m[15] = w),
            (m[16] = g),
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
