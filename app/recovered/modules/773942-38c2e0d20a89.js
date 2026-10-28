// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(745018),
    l = e.i(439587),
    a = e.i(574472),
    n = e.i(352386),
    o = e.i(171840),
    s = e.i(506486),
    c = e.i(79395),
    d = e.i(595673),
    u = e.i(338319),
    m = e.i(198825),
    p = e.i(237687);
  let h = "Create callout";
  function f(e) {
    let i,
      l,
      s,
      u,
      p = (0, r.c)(17),
      { variant: f, coin: v, mint: g, className: x, label: C, screen: k } = e;
    p[0] !== v || p[1] !== g || p[2] !== k
      ? ((i = { coin: v, mint: g, screen: k }),
        (p[0] = v),
        (p[1] = g),
        (p[2] = k),
        (p[3] = i))
      : (i = p[3]);
    let {
      isOpen: w,
      onOpenChange: S,
      requestOpen: _,
      prefilledCoin: P,
      isResolving: N,
    } = (function (e) {
      let t,
        i,
        l,
        o,
        s = (0, r.c)(15),
        { coin: u, mint: p, screen: h } = e,
        { address: f } = (0, a.F)(),
        { setShowWallet: y } = (0, m.useConnectWallet)(),
        [b, v] = (0, n.useState)(!1),
        g = !u && !!p,
        x = p ?? "",
        C = g && b;
      (s[0] !== C ? ((t = { enabled: C }), (s[0] = C), (s[1] = t)) : (t = s[1]),
        s[2] !== x || s[3] !== t
          ? ((i = { coinAddress: x, queryOptions: t }),
            (s[2] = x),
            (s[3] = t),
            (s[4] = i))
          : (i = s[4]));
      let { data: k, isError: w } = (0, c.f)(i),
        S = u ?? k ?? null,
        _ = b && (!g || null != S || w),
        P = b && g && null == S && !w;
      s[5] !== f || s[6] !== h || s[7] !== y || s[8] !== b
        ? ((l = () => {
            if (!b) {
              if (!f) return void y(!0);
              ((0, d.bh)(h ? { screen: h } : void 0), v(!0));
            }
          }),
          (s[5] = f),
          (s[6] = h),
          (s[7] = y),
          (s[8] = b),
          (s[9] = l))
        : (l = s[9]);
      let N = l;
      return (
        s[10] !== _ || s[11] !== P || s[12] !== S || s[13] !== N
          ? ((o = {
              isOpen: _,
              onOpenChange: v,
              requestOpen: N,
              prefilledCoin: S,
              isResolving: P,
            }),
            (s[10] = _),
            (s[11] = P),
            (s[12] = S),
            (s[13] = N),
            (s[14] = o))
          : (o = s[14]),
        o
      );
    })(i);
    return (
      p[4] !== x || p[5] !== N || p[6] !== C || p[7] !== _ || p[8] !== f
        ? ((l =
            "card" === f
              ? (0, t.jsx)(y, {
                  onClick: _,
                  loading: N,
                  label: C ?? "Add your callout",
                  className: x,
                })
              : (0, t.jsx)(b, {
                  onClick: _,
                  loading: N,
                  label: C ?? h,
                  className: x,
                })),
          (p[4] = x),
          (p[5] = N),
          (p[6] = C),
          (p[7] = _),
          (p[8] = f),
          (p[9] = l))
        : (l = p[9]),
      p[10] !== w || p[11] !== S || p[12] !== P
        ? ((s = w
            ? (0, t.jsx)(o.f, { isOpen: w, onOpenChange: S, prefilledCoin: P })
            : null),
          (p[10] = w),
          (p[11] = S),
          (p[12] = P),
          (p[13] = s))
        : (s = p[13]),
      p[14] !== l || p[15] !== s
        ? ((u = (0, t.jsxs)(t.Fragment, { children: [l, s] })),
          (p[14] = l),
          (p[15] = s),
          (p[16] = u))
        : (u = p[16]),
      u
    );
  }
  function y(e) {
    let l,
      a,
      n,
      o = (0, r.c)(8),
      { onClick: s, loading: c, label: d, className: m } = e;
    (o[0] !== m
      ? ((l = (0, u.c)(
          "flex w-full items-center justify-center gap-2 rounded-xl border border-dotted border-border-tertiary bg-bg-secondary px-4 py-3 text-[13px] font-medium leading-4 text-text-secondary transition-colors hover:border-text-quaternary hover:bg-bg-tertiary hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50",
          m,
        )),
        (o[0] = m),
        (o[1] = l))
      : (l = o[1]),
      o[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className:
              "flex size-5 shrink-0 items-center justify-center rounded-full border border-dotted border-current",
            children: (0, t.jsx)(i.YC, { className: "size-3" }),
          })),
          (o[2] = a))
        : (a = o[2]));
    let p = c ? "Loading…" : d;
    return (
      o[3] !== c || o[4] !== s || o[5] !== l || o[6] !== p
        ? ((n = (0, t.jsxs)("button", {
            type: "button",
            onClick: s,
            disabled: c,
            "aria-busy": c,
            "data-testid": "create-callout-upsell-trigger",
            className: l,
            children: [a, p],
          })),
          (o[3] = c),
          (o[4] = s),
          (o[5] = l),
          (o[6] = p),
          (o[7] = n))
        : (n = o[7]),
      n
    );
  }
  function b(e) {
    let a,
      n,
      o = (0, r.c)(6),
      { onClick: s, loading: c, label: d, className: u } = e;
    o[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((a = (0, t.jsx)(i.EX, {})), (o[0] = a))
      : (a = o[0]);
    let m = c ? "Loading…" : d;
    return (
      o[1] !== u || o[2] !== c || o[3] !== s || o[4] !== m
        ? ((n = (0, t.jsx)(l.K, {
            variant: "secondary",
            size: 32,
            onClick: s,
            isDisabled: c,
            isLoading: c,
            "aria-busy": c,
            "data-testid": "create-callout-upsell-trigger",
            iconStart: a,
            className: u,
            children: m,
          })),
          (o[1] = u),
          (o[2] = c),
          (o[3] = s),
          (o[4] = m),
          (o[5] = n))
        : (n = o[5]),
      n
    );
  }
  function v(e) {
    let l,
      a,
      n,
      o,
      c,
      d = (0, r.c)(13),
      { coin: m, mint: f, className: y, label: b, screen: v } = e;
    if (d[0] !== m || d[1] !== f)
      ((l = m ? { coin: m } : f ? { mint: f } : void 0),
        (d[0] = m),
        (d[1] = f),
        (d[2] = l));
    else l = d[2];
    let g = l;
    (d[3] !== v || d[4] !== g
      ? ((a = () => (0, p._)(g, v ? { screen: v } : void 0)),
        (d[3] = v),
        (d[4] = g),
        (d[5] = a))
      : (a = d[5]),
      d[6] !== y
        ? ((n = (0, u.c)(s.u, y)), (d[6] = y), (d[7] = n))
        : (n = d[7]),
      d[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (0, t.jsx)(i.EX, { className: "size-3.5" })), (d[8] = o))
        : (o = d[8]));
    let x = b ?? h;
    return (
      d[9] !== a || d[10] !== n || d[11] !== x
        ? ((c = (0, t.jsxs)("button", {
            type: "button",
            onClick: a,
            "data-testid": "create-callout-upsell-trigger",
            className: n,
            children: [o, x],
          })),
          (d[9] = a),
          (d[10] = n),
          (d[11] = x),
          (d[12] = c))
        : (c = d[12]),
      c
    );
  }
  e.s([
    "f",
    0,
    function (e) {
      let i,
        l = (0, r.c)(4);
      if ("toast-action" === e.variant) {
        let r;
        return (
          l[0] !== e
            ? ((r = (0, t.jsx)(v, { ...e })), (l[0] = e), (l[1] = r))
            : (r = l[1]),
          r
        );
      }
      return (
        l[2] !== e
          ? ((i = (0, t.jsx)(f, { ...e })), (l[2] = e), (l[3] = i))
          : (i = l[3]),
        i
      );
    },
  ]);
};
