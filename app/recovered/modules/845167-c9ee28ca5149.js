// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(745018),
    i = e.i(439587),
    a = e.i(322315),
    n = e.i(254010),
    s = e.i(574472),
    o = e.i(458310),
    d = e.i(352386);
  e.i(12692);
  var u = e.i(398902),
    c = e.i(959594),
    m = e.i(411534),
    p = e.i(218578),
    h = e.i(360633),
    f = e.i(167958),
    g = e.i(38279),
    y = e.i(629169),
    b = e.i(198825);
  function v(e) {
    let l,
      d,
      c,
      p,
      h,
      v,
      C,
      I,
      A,
      k,
      _ = (0, r.c)(34),
      { onClose: U, onShare: E } = e,
      { t: j } = (0, u.f)(),
      { address: N, user: S } = (0, s.F)(),
      { setShowWallet: T } = (0, b.useConnectWallet)(),
      P = !!N,
      V = (0, n.k)(a.D.WEB_REWARDS_PAGE, !1),
      M = N ?? "";
    _[0] !== M
      ? ((l = {
          kind: "callout",
          page: g.v.USER_PAYOUTS.PAGE,
          pageSize: g.v.USER_PAYOUTS.PAGE_SIZE,
          userAddress: M,
        }),
        (_[0] = M),
        (_[1] = l))
      : (l = _[1]);
    let B = (0, y.f)(l),
      F = B.data?.totalPaidUsdc,
      D = 0 === F,
      q = B.isError && void 0 === F,
      R = !q && void 0 === F;
    _[2] !== N ||
    _[3] !== E ||
    _[4] !== B.data?.payouts ||
    _[5] !== F ||
    _[6] !== S
      ? ((d = () => {
          N &&
            E({
              totalPaidUsdc: F ?? 0,
              mostRecentPayout: B.data?.payouts.find(w),
              address: N,
              user: S,
            });
        }),
        (_[2] = N),
        (_[3] = E),
        (_[4] = B.data?.payouts),
        (_[5] = F),
        (_[6] = S),
        (_[7] = d))
      : (d = _[7]);
    let $ = d;
    _[8] !== U || _[9] !== T
      ? ((c = () => {
          (U(), T(!0));
        }),
        (_[8] = U),
        (_[9] = T),
        (_[10] = c))
      : (c = _[10]);
    let G = c;
    return (
      _[11] !== B
        ? ((p = () => void B.refetch()), (_[11] = B), (_[12] = p))
        : (p = _[12]),
      _[13] !== $ ||
      _[14] !== G ||
      _[15] !== D ||
      _[16] !== q ||
      _[17] !== P ||
      _[18] !== p ||
      _[19] !== F
        ? ((h = (0, t.jsx)(x, {
            isSignedIn: P,
            isLoadFailed: q,
            isEmpty: D,
            totalPaidUsdc: F,
            onShare: $,
            onRetry: p,
            onSignIn: G,
          })),
          (_[13] = $),
          (_[14] = G),
          (_[15] = D),
          (_[16] = q),
          (_[17] = P),
          (_[18] = p),
          (_[19] = F),
          (_[20] = h))
        : (h = _[20]),
      _[21] === Symbol.for("react.memo_cache_sentinel")
        ? ((v = (0, t.jsx)(f.a, {})),
          (C = (0, t.jsx)(m.f, {})),
          (_[21] = v),
          (_[22] = C))
        : ((v = _[21]), (C = _[22])),
      _[23] !== h
        ? ((I = (0, t.jsxs)(f.K, {
            className: "flex flex-col gap-4",
            children: [h, v, C],
          })),
          (_[23] = h),
          (_[24] = I))
        : (I = _[24]),
      _[25] !== R || _[26] !== V || _[27] !== P || _[28] !== U || _[29] !== j
        ? ((A =
            P && V
              ? (0, t.jsx)(f.c, {
                  children: R
                    ? (0, t.jsx)(i.K, {
                        variant: "secondary",
                        size: f.Z,
                        isFullWidth: !0,
                        isDisabled: !0,
                        "data-testid": "callout-rewards-view-all",
                        children: j("callouts.rewards.view_all_payouts"),
                      })
                    : (0, t.jsx)(i.L, {
                        as: o.default,
                        href: "/rewards",
                        variant: "secondary",
                        size: f.Z,
                        isFullWidth: !0,
                        onClick: U,
                        "data-testid": "callout-rewards-view-all",
                        children: j("callouts.rewards.view_all_payouts"),
                      }),
                })
              : null),
          (_[25] = R),
          (_[26] = V),
          (_[27] = P),
          (_[28] = U),
          (_[29] = j),
          (_[30] = A))
        : (A = _[30]),
      _[31] !== A || _[32] !== I
        ? ((k = (0, t.jsxs)(t.Fragment, { children: [I, A] })),
          (_[31] = A),
          (_[32] = I),
          (_[33] = k))
        : (k = _[33]),
      k
    );
  }
  function w(e) {
    return "confirmed" === e.status;
  }
  function x(e) {
    let l,
      i = (0, r.c)(8),
      {
        isSignedIn: a,
        isLoadFailed: n,
        isEmpty: s,
        totalPaidUsdc: o,
        onShare: d,
        onRetry: u,
        onSignIn: m,
      } = e;
    if (!a) {
      let e;
      return (
        i[0] !== m
          ? ((e = (0, t.jsx)(C, { onSignIn: m })), (i[0] = m), (i[1] = e))
          : (e = i[1]),
        e
      );
    }
    if (n) {
      let e;
      return (
        i[2] !== u
          ? ((e = (0, t.jsx)(I, { onRetry: u })), (i[2] = u), (i[3] = e))
          : (e = i[3]),
        e
      );
    }
    if (s) {
      let e;
      return (
        i[4] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)(c.f, {})), (i[4] = e))
          : (e = i[4]),
        e
      );
    }
    return (
      i[5] !== d || i[6] !== o
        ? ((l = (0, t.jsx)(h.f, { totalPaidUsdc: o, onShare: d })),
          (i[5] = d),
          (i[6] = o),
          (i[7] = l))
        : (l = i[7]),
      l
    );
  }
  function C(e) {
    let a,
      n,
      s,
      o,
      d,
      c,
      m = (0, r.c)(13),
      { onSignIn: p } = e,
      { t: h } = (0, u.f)();
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
      m[1] !== h
        ? ((n = h("profile.rewards.sign_in_title")), (m[1] = h), (m[2] = n))
        : (n = m[2]),
      m[3] !== n
        ? ((s = (0, t.jsxs)("div", {
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
          (m[4] = s))
        : (s = m[4]),
      m[5] !== h
        ? ((o = h("common.sign_in")), (m[5] = h), (m[6] = o))
        : (o = m[6]),
      m[7] !== p || m[8] !== o
        ? ((d = (0, t.jsx)(i.K, {
            variant: "primary",
            size: f.$,
            isFullWidth: !0,
            onClick: p,
            "data-testid": "callout-rewards-sign-in",
            children: o,
          })),
          (m[7] = p),
          (m[8] = o),
          (m[9] = d))
        : (d = m[9]),
      m[10] !== s || m[11] !== d
        ? ((c = (0, t.jsxs)("section", {
            "data-testid": "callout-rewards-signed-out",
            className: "flex flex-col gap-3",
            children: [s, d],
          })),
          (m[10] = s),
          (m[11] = d),
          (m[12] = c))
        : (c = m[12]),
      c
    );
  }
  function I(e) {
    let l,
      a,
      n,
      s,
      o,
      d = (0, r.c)(12),
      { onRetry: c } = e,
      { t: m } = (0, u.f)();
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
      d[6] !== c || d[7] !== n
        ? ((s = (0, t.jsx)(i.K, {
            variant: "secondary",
            size: f.Z,
            isFullWidth: !0,
            onClick: c,
            "data-testid": "callout-rewards-retry",
            children: n,
          })),
          (d[6] = c),
          (d[7] = n),
          (d[8] = s))
        : (s = d[8]),
      d[9] !== a || d[10] !== s
        ? ((o = (0, t.jsxs)("section", {
            "data-testid": "callout-rewards-load-failed",
            className: "flex flex-col gap-3",
            children: [a, s],
          })),
          (d[9] = a),
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
        i,
        a,
        n,
        s,
        o,
        c,
        m = (0, r.c)(21),
        { isOpen: h, onOpenChange: g } = e,
        { t: y } = (0, u.f)(),
        [b, w] = (0, d.useState)(null),
        [x, C] = (0, d.useState)(!1);
      m[0] !== g ? ((l = () => g(!1)), (m[0] = g), (m[1] = l)) : (l = m[1]);
      let I = l;
      m[2] !== I
        ? ((i = (e) => {
            (w(e), I(), C(!0));
          }),
          (m[2] = I),
          (m[3] = i))
        : (i = m[3]);
      let A = i;
      return (
        m[4] !== y
          ? ((a = y("callouts.rewards.title")), (m[4] = y), (m[5] = a))
          : (a = m[5]),
        m[6] !== I || m[7] !== A || m[8] !== h
          ? ((n = h ? (0, t.jsx)(v, { onClose: I, onShare: A }) : null),
            (m[6] = I),
            (m[7] = A),
            (m[8] = h),
            (m[9] = n))
          : (n = m[9]),
        m[10] !== h || m[11] !== g || m[12] !== a || m[13] !== n
          ? ((s = (0, t.jsx)(f.N, {
              open: h,
              onOpenChange: g,
              size: "md",
              title: a,
              "data-testid": "callout-rewards-dialog",
              children: n,
            })),
            (m[10] = h),
            (m[11] = g),
            (m[12] = a),
            (m[13] = n),
            (m[14] = s))
          : (s = m[14]),
        m[15] !== x || m[16] !== b
          ? ((o = b
              ? (0, t.jsx)(p.f, {
                  open: x,
                  onOpenChange: C,
                  holderAddress: b.address,
                  user: b.user,
                  totalPaidUsdc: b.totalPaidUsdc,
                  mostRecentPayout: b.mostRecentPayout,
                })
              : null),
            (m[15] = x),
            (m[16] = b),
            (m[17] = o))
          : (o = m[17]),
        m[18] !== s || m[19] !== o
          ? ((c = (0, t.jsxs)(t.Fragment, { children: [s, o] })),
            (m[18] = s),
            (m[19] = o),
            (m[20] = c))
          : (c = m[20]),
        c
      );
    },
  ]);
};
