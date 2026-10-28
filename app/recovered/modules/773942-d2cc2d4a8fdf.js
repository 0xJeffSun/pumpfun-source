// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(745018),
    o = e.i(439587),
    i = e.i(574472),
    a = e.i(352386),
    n = e.i(171840),
    s = e.i(506486),
    c = e.i(79395),
    d = e.i(595673),
    u = e.i(338319),
    m = e.i(198825),
    p = e.i(237687);
  let b = "Create callout";
  function h(e) {
    let l,
      o,
      s,
      u,
      p = (0, r.c)(17),
      { variant: h, coin: g, mint: v, className: x, label: w, screen: C } = e;
    p[0] !== g || p[1] !== v || p[2] !== C
      ? ((l = { coin: g, mint: v, screen: C }),
        (p[0] = g),
        (p[1] = v),
        (p[2] = C),
        (p[3] = l))
      : (l = p[3]);
    let {
      isOpen: k,
      onOpenChange: S,
      requestOpen: N,
      prefilledCoin: P,
      isResolving: j,
    } = (function (e) {
      let t,
        l,
        o,
        n,
        s = (0, r.c)(15),
        { coin: u, mint: p, screen: b } = e,
        { address: h } = (0, i.F)(),
        { setShowWallet: y } = (0, m.useConnectWallet)(),
        [f, g] = (0, a.useState)(!1),
        v = !u && !!p,
        x = p ?? "",
        w = v && f;
      (s[0] !== w ? ((t = { enabled: w }), (s[0] = w), (s[1] = t)) : (t = s[1]),
        s[2] !== x || s[3] !== t
          ? ((l = { coinAddress: x, queryOptions: t }),
            (s[2] = x),
            (s[3] = t),
            (s[4] = l))
          : (l = s[4]));
      let { data: C, isError: k } = (0, c.f)(l),
        S = u ?? C ?? null,
        N = f && (!v || null != S || k),
        P = f && v && null == S && !k;
      s[5] !== h || s[6] !== b || s[7] !== y || s[8] !== f
        ? ((o = () => {
            if (!f) {
              if (!h) return void y(!0);
              ((0, d.bh)(b ? { screen: b } : void 0), g(!0));
            }
          }),
          (s[5] = h),
          (s[6] = b),
          (s[7] = y),
          (s[8] = f),
          (s[9] = o))
        : (o = s[9]);
      let j = o;
      return (
        s[10] !== N || s[11] !== P || s[12] !== S || s[13] !== j
          ? ((n = {
              isOpen: N,
              onOpenChange: g,
              requestOpen: j,
              prefilledCoin: S,
              isResolving: P,
            }),
            (s[10] = N),
            (s[11] = P),
            (s[12] = S),
            (s[13] = j),
            (s[14] = n))
          : (n = s[14]),
        n
      );
    })(l);
    return (
      p[4] !== x || p[5] !== j || p[6] !== w || p[7] !== N || p[8] !== h
        ? ((o =
            "card" === h
              ? (0, t.jsx)(y, {
                  onClick: N,
                  loading: j,
                  label: w ?? "Add your callout",
                  className: x,
                })
              : (0, t.jsx)(f, {
                  onClick: N,
                  loading: j,
                  label: w ?? b,
                  className: x,
                })),
          (p[4] = x),
          (p[5] = j),
          (p[6] = w),
          (p[7] = N),
          (p[8] = h),
          (p[9] = o))
        : (o = p[9]),
      p[10] !== k || p[11] !== S || p[12] !== P
        ? ((s = k
            ? (0, t.jsx)(n.f, { isOpen: k, onOpenChange: S, prefilledCoin: P })
            : null),
          (p[10] = k),
          (p[11] = S),
          (p[12] = P),
          (p[13] = s))
        : (s = p[13]),
      p[14] !== o || p[15] !== s
        ? ((u = (0, t.jsxs)(t.Fragment, { children: [o, s] })),
          (p[14] = o),
          (p[15] = s),
          (p[16] = u))
        : (u = p[16]),
      u
    );
  }
  function y(e) {
    let o,
      i,
      a,
      n = (0, r.c)(8),
      { onClick: s, loading: c, label: d, className: m } = e;
    (n[0] !== m
      ? ((o = (0, u.c)(
          "flex w-full items-center justify-center gap-2 rounded-xl border border-dotted border-border-tertiary bg-bg-secondary px-4 py-3 text-[13px] font-medium leading-4 text-text-secondary transition-colors hover:border-text-quaternary hover:bg-bg-tertiary hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50",
          m,
        )),
        (n[0] = m),
        (n[1] = o))
      : (o = n[1]),
      n[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className:
              "flex size-5 shrink-0 items-center justify-center rounded-full border border-dotted border-current",
            children: (0, t.jsx)(l.YC, { className: "size-3" }),
          })),
          (n[2] = i))
        : (i = n[2]));
    let p = c ? "Loading…" : d;
    return (
      n[3] !== c || n[4] !== s || n[5] !== o || n[6] !== p
        ? ((a = (0, t.jsxs)("button", {
            type: "button",
            onClick: s,
            disabled: c,
            "aria-busy": c,
            "data-testid": "create-callout-upsell-trigger",
            className: o,
            children: [i, p],
          })),
          (n[3] = c),
          (n[4] = s),
          (n[5] = o),
          (n[6] = p),
          (n[7] = a))
        : (a = n[7]),
      a
    );
  }
  function f(e) {
    let i,
      a,
      n = (0, r.c)(6),
      { onClick: s, loading: c, label: d, className: u } = e;
    n[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((i = (0, t.jsx)(l.EX, {})), (n[0] = i))
      : (i = n[0]);
    let m = c ? "Loading…" : d;
    return (
      n[1] !== u || n[2] !== c || n[3] !== s || n[4] !== m
        ? ((a = (0, t.jsx)(o.K, {
            variant: "secondary",
            size: 32,
            onClick: s,
            isDisabled: c,
            isLoading: c,
            "aria-busy": c,
            "data-testid": "create-callout-upsell-trigger",
            iconStart: i,
            className: u,
            children: m,
          })),
          (n[1] = u),
          (n[2] = c),
          (n[3] = s),
          (n[4] = m),
          (n[5] = a))
        : (a = n[5]),
      a
    );
  }
  function g(e) {
    let o,
      i,
      a,
      n,
      c,
      d = (0, r.c)(13),
      { coin: m, mint: h, className: y, label: f, screen: g } = e;
    if (d[0] !== m || d[1] !== h)
      ((o = m ? { coin: m } : h ? { mint: h } : void 0),
        (d[0] = m),
        (d[1] = h),
        (d[2] = o));
    else o = d[2];
    let v = o;
    (d[3] !== g || d[4] !== v
      ? ((i = () => (0, p._)(v, g ? { screen: g } : void 0)),
        (d[3] = g),
        (d[4] = v),
        (d[5] = i))
      : (i = d[5]),
      d[6] !== y
        ? ((a = (0, u.c)(s.u, y)), (d[6] = y), (d[7] = a))
        : (a = d[7]),
      d[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, t.jsx)(l.EX, { className: "size-3.5" })), (d[8] = n))
        : (n = d[8]));
    let x = f ?? b;
    return (
      d[9] !== i || d[10] !== a || d[11] !== x
        ? ((c = (0, t.jsxs)("button", {
            type: "button",
            onClick: i,
            "data-testid": "create-callout-upsell-trigger",
            className: a,
            children: [n, x],
          })),
          (d[9] = i),
          (d[10] = a),
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
      let l,
        o = (0, r.c)(4);
      if ("toast-action" === e.variant) {
        let r;
        return (
          o[0] !== e
            ? ((r = (0, t.jsx)(g, { ...e })), (o[0] = e), (o[1] = r))
            : (r = o[1]),
          r
        );
      }
      return (
        o[2] !== e
          ? ((l = (0, t.jsx)(h, { ...e })), (o[2] = e), (o[3] = l))
          : (l = o[3]),
        l
      );
    },
  ]);
};
