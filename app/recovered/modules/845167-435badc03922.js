// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(745018),
    r = e.i(439587),
    a = e.i(322315),
    n = e.i(254010),
    o = e.i(574472),
    s = e.i(458310),
    d = e.i(352386);
  e.i(12692);
  var c = e.i(398902),
    u = e.i(959594),
    m = e.i(411534),
    f = e.i(218578),
    y = e.i(360633),
    h = e.i(167958),
    p = e.i(38279),
    x = e.i(629169),
    b = e.i(198825);
  function v(e) {
    let l,
      d,
      u,
      f,
      y,
      v,
      w,
      k,
      _,
      j,
      A = (0, i.c)(34),
      { onClose: I, onShare: S } = e,
      { t: N } = (0, c.f)(),
      { address: E, user: U } = (0, o.F)(),
      { setShowWallet: B } = (0, b.useConnectWallet)(),
      V = !!E,
      T = (0, n.k)(a.D.WEB_REWARDS_PAGE, !1),
      O = E ?? "";
    A[0] !== O
      ? ((l = {
          kind: "callout",
          page: p.v.USER_PAYOUTS.PAGE,
          pageSize: p.v.USER_PAYOUTS.PAGE_SIZE,
          userAddress: O,
        }),
        (A[0] = O),
        (A[1] = l))
      : (l = A[1]);
    let R = (0, x.f)(l),
      P = R.data?.totalPaidUsdc,
      M = 0 === P,
      L = R.isError && void 0 === P,
      F = !L && void 0 === P;
    A[2] !== E ||
    A[3] !== S ||
    A[4] !== R.data?.payouts ||
    A[5] !== P ||
    A[6] !== U
      ? ((d = () => {
          E &&
            S({
              totalPaidUsdc: P ?? 0,
              mostRecentPayout: R.data?.payouts.find(g),
              address: E,
              user: U,
            });
        }),
        (A[2] = E),
        (A[3] = S),
        (A[4] = R.data?.payouts),
        (A[5] = P),
        (A[6] = U),
        (A[7] = d))
      : (d = A[7]);
    let z = d;
    A[8] !== I || A[9] !== B
      ? ((u = () => {
          (I(), B(!0));
        }),
        (A[8] = I),
        (A[9] = B),
        (A[10] = u))
      : (u = A[10]);
    let D = u;
    return (
      A[11] !== R
        ? ((f = () => void R.refetch()), (A[11] = R), (A[12] = f))
        : (f = A[12]),
      A[13] !== z ||
      A[14] !== D ||
      A[15] !== M ||
      A[16] !== L ||
      A[17] !== V ||
      A[18] !== f ||
      A[19] !== P
        ? ((y = (0, t.jsx)(C, {
            isSignedIn: V,
            isLoadFailed: L,
            isEmpty: M,
            totalPaidUsdc: P,
            onShare: z,
            onRetry: f,
            onSignIn: D,
          })),
          (A[13] = z),
          (A[14] = D),
          (A[15] = M),
          (A[16] = L),
          (A[17] = V),
          (A[18] = f),
          (A[19] = P),
          (A[20] = y))
        : (y = A[20]),
      A[21] === Symbol.for("react.memo_cache_sentinel")
        ? ((v = (0, t.jsx)(h.a, {})),
          (w = (0, t.jsx)(m.f, {})),
          (A[21] = v),
          (A[22] = w))
        : ((v = A[21]), (w = A[22])),
      A[23] !== y
        ? ((k = (0, t.jsxs)(h.K, {
            className: "flex flex-col gap-4",
            children: [y, v, w],
          })),
          (A[23] = y),
          (A[24] = k))
        : (k = A[24]),
      A[25] !== F || A[26] !== T || A[27] !== V || A[28] !== I || A[29] !== N
        ? ((_ =
            V && T
              ? (0, t.jsx)(h.c, {
                  children: F
                    ? (0, t.jsx)(r.K, {
                        variant: "secondary",
                        size: h.Z,
                        isFullWidth: !0,
                        isDisabled: !0,
                        "data-testid": "callout-rewards-view-all",
                        children: N("callouts.rewards.view_all_payouts"),
                      })
                    : (0, t.jsx)(r.L, {
                        as: s.default,
                        href: "/rewards",
                        variant: "secondary",
                        size: h.Z,
                        isFullWidth: !0,
                        onClick: I,
                        "data-testid": "callout-rewards-view-all",
                        children: N("callouts.rewards.view_all_payouts"),
                      }),
                })
              : null),
          (A[25] = F),
          (A[26] = T),
          (A[27] = V),
          (A[28] = I),
          (A[29] = N),
          (A[30] = _))
        : (_ = A[30]),
      A[31] !== _ || A[32] !== k
        ? ((j = (0, t.jsxs)(t.Fragment, { children: [k, _] })),
          (A[31] = _),
          (A[32] = k),
          (A[33] = j))
        : (j = A[33]),
      j
    );
  }
  function g(e) {
    return "confirmed" === e.status;
  }
  function C(e) {
    let l,
      r = (0, i.c)(8),
      {
        isSignedIn: a,
        isLoadFailed: n,
        isEmpty: o,
        totalPaidUsdc: s,
        onShare: d,
        onRetry: c,
        onSignIn: m,
      } = e;
    if (!a) {
      let e;
      return (
        r[0] !== m
          ? ((e = (0, t.jsx)(w, { onSignIn: m })), (r[0] = m), (r[1] = e))
          : (e = r[1]),
        e
      );
    }
    if (n) {
      let e;
      return (
        r[2] !== c
          ? ((e = (0, t.jsx)(k, { onRetry: c })), (r[2] = c), (r[3] = e))
          : (e = r[3]),
        e
      );
    }
    if (o) {
      let e;
      return (
        r[4] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)(u.f, {})), (r[4] = e))
          : (e = r[4]),
        e
      );
    }
    return (
      r[5] !== d || r[6] !== s
        ? ((l = (0, t.jsx)(y.f, { totalPaidUsdc: s, onShare: d })),
          (r[5] = d),
          (r[6] = s),
          (r[7] = l))
        : (l = r[7]),
      l
    );
  }
  function w(e) {
    let a,
      n,
      o,
      s,
      d,
      u,
      m = (0, i.c)(13),
      { onSignIn: f } = e,
      { t: y } = (0, c.f)();
    return (
      m[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)("span", {
            className:
              "inline-grid size-7 shrink-0 place-items-center rounded-md bg-bg-tertiary text-text-tertiary",
            children: (0, t.jsx)(l.dl, {
              className: "size-4",
              "aria-hidden": !0,
            }),
          })),
          (m[0] = a))
        : (a = m[0]),
      m[1] !== y
        ? ((n = y("profile.rewards.sign_in_title")), (m[1] = y), (m[2] = n))
        : (n = m[2]),
      m[3] !== n
        ? ((o = (0, t.jsxs)("div", {
            className: "flex items-center gap-3",
            children: [
              a,
              (0, t.jsx)("p", {
                className: "text-sm leading-5 font-medium text-text-primary",
                children: n,
              }),
            ],
          })),
          (m[3] = n),
          (m[4] = o))
        : (o = m[4]),
      m[5] !== y
        ? ((s = y("common.sign_in")), (m[5] = y), (m[6] = s))
        : (s = m[6]),
      m[7] !== f || m[8] !== s
        ? ((d = (0, t.jsx)(r.K, {
            variant: "primary",
            size: h.$,
            isFullWidth: !0,
            onClick: f,
            "data-testid": "callout-rewards-sign-in",
            children: s,
          })),
          (m[7] = f),
          (m[8] = s),
          (m[9] = d))
        : (d = m[9]),
      m[10] !== o || m[11] !== d
        ? ((u = (0, t.jsxs)("section", {
            "data-testid": "callout-rewards-signed-out",
            className: "flex flex-col gap-3",
            children: [o, d],
          })),
          (m[10] = o),
          (m[11] = d),
          (m[12] = u))
        : (u = m[12]),
      u
    );
  }
  function k(e) {
    let l,
      a,
      n,
      o,
      s,
      d = (0, i.c)(12),
      { onRetry: u } = e,
      { t: m } = (0, c.f)();
    return (
      d[0] !== m
        ? ((l = m("web.rewards.callout_payouts_error")), (d[0] = m), (d[1] = l))
        : (l = d[1]),
      d[2] !== l
        ? ((a = (0, t.jsx)("p", {
            className: "text-[13px] leading-[18px] text-text-tertiary",
            children: l,
          })),
          (d[2] = l),
          (d[3] = a))
        : (a = d[3]),
      d[4] !== m
        ? ((n = m("common.try_again")), (d[4] = m), (d[5] = n))
        : (n = d[5]),
      d[6] !== u || d[7] !== n
        ? ((o = (0, t.jsx)(r.K, {
            variant: "secondary",
            size: h.Z,
            isFullWidth: !0,
            onClick: u,
            "data-testid": "callout-rewards-retry",
            children: n,
          })),
          (d[6] = u),
          (d[7] = n),
          (d[8] = o))
        : (o = d[8]),
      d[9] !== a || d[10] !== o
        ? ((s = (0, t.jsxs)("section", {
            "data-testid": "callout-rewards-load-failed",
            className: "flex flex-col gap-3",
            children: [a, o],
          })),
          (d[9] = a),
          (d[10] = o),
          (d[11] = s))
        : (s = d[11]),
      s
    );
  }
  e.s([
    "f",
    0,
    function (e) {
      let l,
        r,
        a,
        n,
        o,
        s,
        u,
        m = (0, i.c)(21),
        { isOpen: y, onOpenChange: p } = e,
        { t: x } = (0, c.f)(),
        [b, g] = (0, d.useState)(null),
        [C, w] = (0, d.useState)(!1);
      m[0] !== p ? ((l = () => p(!1)), (m[0] = p), (m[1] = l)) : (l = m[1]);
      let k = l;
      m[2] !== k
        ? ((r = (e) => {
            (g(e), k(), w(!0));
          }),
          (m[2] = k),
          (m[3] = r))
        : (r = m[3]);
      let _ = r;
      return (
        m[4] !== x
          ? ((a = x("callouts.rewards.title")), (m[4] = x), (m[5] = a))
          : (a = m[5]),
        m[6] !== k || m[7] !== _ || m[8] !== y
          ? ((n = y ? (0, t.jsx)(v, { onClose: k, onShare: _ }) : null),
            (m[6] = k),
            (m[7] = _),
            (m[8] = y),
            (m[9] = n))
          : (n = m[9]),
        m[10] !== y || m[11] !== p || m[12] !== a || m[13] !== n
          ? ((o = (0, t.jsx)(h.N, {
              open: y,
              onOpenChange: p,
              size: "md",
              title: a,
              "data-testid": "callout-rewards-dialog",
              children: n,
            })),
            (m[10] = y),
            (m[11] = p),
            (m[12] = a),
            (m[13] = n),
            (m[14] = o))
          : (o = m[14]),
        m[15] !== C || m[16] !== b
          ? ((s = b
              ? (0, t.jsx)(f.f, {
                  open: C,
                  onOpenChange: w,
                  holderAddress: b.address,
                  user: b.user,
                  totalPaidUsdc: b.totalPaidUsdc,
                  mostRecentPayout: b.mostRecentPayout,
                })
              : null),
            (m[15] = C),
            (m[16] = b),
            (m[17] = s))
          : (s = m[17]),
        m[18] !== o || m[19] !== s
          ? ((u = (0, t.jsxs)(t.Fragment, { children: [o, s] })),
            (m[18] = o),
            (m[19] = s),
            (m[20] = u))
          : (u = m[20]),
        u
      );
    },
  ]);
};
