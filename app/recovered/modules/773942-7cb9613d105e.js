// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(745018),
    a = e.i(439587),
    n = e.i(574472),
    l = e.i(352386),
    o = e.i(171840),
    s = e.i(506486),
    c = e.i(79395),
    d = e.i(595673),
    m = e.i(338319),
    x = e.i(198825),
    u = e.i(237687);
  let p = "Create callout";
  function b(e) {
    let r,
      a,
      s,
      m,
      u = (0, i.c)(17),
      { variant: b, coin: g, mint: y, className: v, label: _, screen: w } = e;
    u[0] !== g || u[1] !== y || u[2] !== w
      ? ((r = { coin: g, mint: y, screen: w }),
        (u[0] = g),
        (u[1] = y),
        (u[2] = w),
        (u[3] = r))
      : (r = u[3]);
    let {
      isOpen: N,
      onOpenChange: k,
      requestOpen: j,
      prefilledCoin: S,
      isResolving: C,
    } = (function (e) {
      let t,
        r,
        a,
        o,
        s = (0, i.c)(15),
        { coin: m, mint: u, screen: p } = e,
        { address: b } = (0, n.F)(),
        { setShowWallet: f } = (0, x.useConnectWallet)(),
        [h, g] = (0, l.useState)(!1),
        y = !m && !!u,
        v = u ?? "",
        _ = y && h;
      (s[0] !== _ ? ((t = { enabled: _ }), (s[0] = _), (s[1] = t)) : (t = s[1]),
        s[2] !== v || s[3] !== t
          ? ((r = { coinAddress: v, queryOptions: t }),
            (s[2] = v),
            (s[3] = t),
            (s[4] = r))
          : (r = s[4]));
      let { data: w, isError: N } = (0, c.f)(r),
        k = m ?? w ?? null,
        j = h && (!y || null != k || N),
        S = h && y && null == k && !N;
      s[5] !== b || s[6] !== p || s[7] !== f || s[8] !== h
        ? ((a = () => {
            if (!h) {
              if (!b) return void f(!0);
              ((0, d.bh)(p ? { screen: p } : void 0), g(!0));
            }
          }),
          (s[5] = b),
          (s[6] = p),
          (s[7] = f),
          (s[8] = h),
          (s[9] = a))
        : (a = s[9]);
      let C = a;
      return (
        s[10] !== j || s[11] !== S || s[12] !== k || s[13] !== C
          ? ((o = {
              isOpen: j,
              onOpenChange: g,
              requestOpen: C,
              prefilledCoin: k,
              isResolving: S,
            }),
            (s[10] = j),
            (s[11] = S),
            (s[12] = k),
            (s[13] = C),
            (s[14] = o))
          : (o = s[14]),
        o
      );
    })(r);
    return (
      u[4] !== v || u[5] !== C || u[6] !== _ || u[7] !== j || u[8] !== b
        ? ((a =
            "card" === b
              ? (0, t.jsx)(f, {
                  onClick: j,
                  loading: C,
                  label: _ ?? "Add your callout",
                  className: v,
                })
              : (0, t.jsx)(h, {
                  onClick: j,
                  loading: C,
                  label: _ ?? p,
                  className: v,
                })),
          (u[4] = v),
          (u[5] = C),
          (u[6] = _),
          (u[7] = j),
          (u[8] = b),
          (u[9] = a))
        : (a = u[9]),
      u[10] !== N || u[11] !== k || u[12] !== S
        ? ((s = N
            ? (0, t.jsx)(o.f, { isOpen: N, onOpenChange: k, prefilledCoin: S })
            : null),
          (u[10] = N),
          (u[11] = k),
          (u[12] = S),
          (u[13] = s))
        : (s = u[13]),
      u[14] !== a || u[15] !== s
        ? ((m = (0, t.jsxs)(t.Fragment, { children: [a, s] })),
          (u[14] = a),
          (u[15] = s),
          (u[16] = m))
        : (m = u[16]),
      m
    );
  }
  function f(e) {
    let a,
      n,
      l,
      o = (0, i.c)(8),
      { onClick: s, loading: c, label: d, className: x } = e;
    (o[0] !== x
      ? ((a = (0, m.c)(
          "flex w-full items-center justify-center gap-2 rounded-xl border border-dotted border-border-tertiary bg-bg-secondary px-4 py-3 text-[13px] font-medium leading-4 text-text-secondary transition-colors hover:border-text-quaternary hover:bg-bg-tertiary hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50",
          x,
        )),
        (o[0] = x),
        (o[1] = a))
      : (a = o[1]),
      o[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className:
              "flex size-5 shrink-0 items-center justify-center rounded-full border border-dotted border-current",
            children: (0, t.jsx)(r.YC, { className: "size-3" }),
          })),
          (o[2] = n))
        : (n = o[2]));
    let u = c ? "Loading…" : d;
    return (
      o[3] !== c || o[4] !== s || o[5] !== a || o[6] !== u
        ? ((l = (0, t.jsxs)("button", {
            type: "button",
            onClick: s,
            disabled: c,
            "aria-busy": c,
            "data-testid": "create-callout-upsell-trigger",
            className: a,
            children: [n, u],
          })),
          (o[3] = c),
          (o[4] = s),
          (o[5] = a),
          (o[6] = u),
          (o[7] = l))
        : (l = o[7]),
      l
    );
  }
  function h(e) {
    let n,
      l,
      o = (0, i.c)(6),
      { onClick: s, loading: c, label: d, className: m } = e;
    o[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((n = (0, t.jsx)(r.EX, {})), (o[0] = n))
      : (n = o[0]);
    let x = c ? "Loading…" : d;
    return (
      o[1] !== m || o[2] !== c || o[3] !== s || o[4] !== x
        ? ((l = (0, t.jsx)(a.K, {
            variant: "secondary",
            size: 32,
            onClick: s,
            isDisabled: c,
            isLoading: c,
            "aria-busy": c,
            "data-testid": "create-callout-upsell-trigger",
            iconStart: n,
            className: m,
            children: x,
          })),
          (o[1] = m),
          (o[2] = c),
          (o[3] = s),
          (o[4] = x),
          (o[5] = l))
        : (l = o[5]),
      l
    );
  }
  function g(e) {
    let a,
      n,
      l,
      o,
      c,
      d = (0, i.c)(13),
      { coin: x, mint: b, className: f, label: h, screen: g } = e;
    if (d[0] !== x || d[1] !== b)
      ((a = x ? { coin: x } : b ? { mint: b } : void 0),
        (d[0] = x),
        (d[1] = b),
        (d[2] = a));
    else a = d[2];
    let y = a;
    (d[3] !== g || d[4] !== y
      ? ((n = () => (0, u._)(y, g ? { screen: g } : void 0)),
        (d[3] = g),
        (d[4] = y),
        (d[5] = n))
      : (n = d[5]),
      d[6] !== f
        ? ((l = (0, m.c)(s.u, f)), (d[6] = f), (d[7] = l))
        : (l = d[7]),
      d[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (0, t.jsx)(r.EX, { className: "size-3.5" })), (d[8] = o))
        : (o = d[8]));
    let v = h ?? p;
    return (
      d[9] !== n || d[10] !== l || d[11] !== v
        ? ((c = (0, t.jsxs)("button", {
            type: "button",
            onClick: n,
            "data-testid": "create-callout-upsell-trigger",
            className: l,
            children: [o, v],
          })),
          (d[9] = n),
          (d[10] = l),
          (d[11] = v),
          (d[12] = c))
        : (c = d[12]),
      c
    );
  }
  e.s([
    "f",
    0,
    function (e) {
      let r,
        a = (0, i.c)(4);
      if ("toast-action" === e.variant) {
        let i;
        return (
          a[0] !== e
            ? ((i = (0, t.jsx)(g, { ...e })), (a[0] = e), (a[1] = i))
            : (i = a[1]),
          i
        );
      }
      return (
        a[2] !== e
          ? ((r = (0, t.jsx)(b, { ...e })), (a[2] = e), (a[3] = r))
          : (r = a[3]),
        r
      );
    },
  ]);
};
