// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    s = e.i(745018),
    a = e.i(439587),
    r = e.i(574472),
    n = e.i(352386),
    l = e.i(171840),
    o = e.i(506486),
    c = e.i(79395),
    d = e.i(595673),
    x = e.i(338319),
    h = e.i(198825),
    u = e.i(237687);
  let f = "Create callout";
  function b(e) {
    let s,
      a,
      o,
      x,
      u = (0, i.c)(17),
      { variant: b, coin: y, mint: v, className: g, label: w, screen: _ } = e;
    u[0] !== y || u[1] !== v || u[2] !== _
      ? ((s = { coin: y, mint: v, screen: _ }),
        (u[0] = y),
        (u[1] = v),
        (u[2] = _),
        (u[3] = s))
      : (s = u[3]);
    let {
      isOpen: N,
      onOpenChange: A,
      requestOpen: I,
      prefilledCoin: k,
      isResolving: j,
    } = (function (e) {
      let t,
        s,
        a,
        l,
        o = (0, i.c)(15),
        { coin: x, mint: u, screen: f } = e,
        { address: b } = (0, r.F)(),
        { setShowWallet: p } = (0, h.useConnectWallet)(),
        [m, y] = (0, n.useState)(!1),
        v = !x && !!u,
        g = u ?? "",
        w = v && m;
      (o[0] !== w ? ((t = { enabled: w }), (o[0] = w), (o[1] = t)) : (t = o[1]),
        o[2] !== g || o[3] !== t
          ? ((s = { coinAddress: g, queryOptions: t }),
            (o[2] = g),
            (o[3] = t),
            (o[4] = s))
          : (s = o[4]));
      let { data: _, isError: N } = (0, c.f)(s),
        A = x ?? _ ?? null,
        I = m && (!v || null != A || N),
        k = m && v && null == A && !N;
      o[5] !== b || o[6] !== f || o[7] !== p || o[8] !== m
        ? ((a = () => {
            if (!m) {
              if (!b) return void p(!0);
              ((0, d.bh)(f ? { screen: f } : void 0), y(!0));
            }
          }),
          (o[5] = b),
          (o[6] = f),
          (o[7] = p),
          (o[8] = m),
          (o[9] = a))
        : (a = o[9]);
      let j = a;
      return (
        o[10] !== I || o[11] !== k || o[12] !== A || o[13] !== j
          ? ((l = {
              isOpen: I,
              onOpenChange: y,
              requestOpen: j,
              prefilledCoin: A,
              isResolving: k,
            }),
            (o[10] = I),
            (o[11] = k),
            (o[12] = A),
            (o[13] = j),
            (o[14] = l))
          : (l = o[14]),
        l
      );
    })(s);
    return (
      u[4] !== g || u[5] !== j || u[6] !== w || u[7] !== I || u[8] !== b
        ? ((a =
            "card" === b
              ? (0, t.jsx)(p, {
                  onClick: I,
                  loading: j,
                  label: w ?? "Add your callout",
                  className: g,
                })
              : (0, t.jsx)(m, {
                  onClick: I,
                  loading: j,
                  label: w ?? f,
                  className: g,
                })),
          (u[4] = g),
          (u[5] = j),
          (u[6] = w),
          (u[7] = I),
          (u[8] = b),
          (u[9] = a))
        : (a = u[9]),
      u[10] !== N || u[11] !== A || u[12] !== k
        ? ((o = N
            ? (0, t.jsx)(l.f, { isOpen: N, onOpenChange: A, prefilledCoin: k })
            : null),
          (u[10] = N),
          (u[11] = A),
          (u[12] = k),
          (u[13] = o))
        : (o = u[13]),
      u[14] !== a || u[15] !== o
        ? ((x = (0, t.jsxs)(t.Fragment, { children: [a, o] })),
          (u[14] = a),
          (u[15] = o),
          (u[16] = x))
        : (x = u[16]),
      x
    );
  }
  function p(e) {
    let a,
      r,
      n,
      l = (0, i.c)(8),
      { onClick: o, loading: c, label: d, className: h } = e;
    (l[0] !== h
      ? ((a = (0, x.c)(
          "flex w-full items-center justify-center gap-2 rounded-xl border border-dotted border-border-tertiary bg-bg-secondary px-4 py-3 text-[13px] font-medium leading-4 text-text-secondary transition-colors hover:border-text-quaternary hover:bg-bg-tertiary hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50",
          h,
        )),
        (l[0] = h),
        (l[1] = a))
      : (a = l[1]),
      l[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className:
              "flex size-5 shrink-0 items-center justify-center rounded-full border border-dotted border-current",
            children: (0, t.jsx)(s.YC, { className: "size-3" }),
          })),
          (l[2] = r))
        : (r = l[2]));
    let u = c ? "Loading…" : d;
    return (
      l[3] !== c || l[4] !== o || l[5] !== a || l[6] !== u
        ? ((n = (0, t.jsxs)("button", {
            type: "button",
            onClick: o,
            disabled: c,
            "aria-busy": c,
            "data-testid": "create-callout-upsell-trigger",
            className: a,
            children: [r, u],
          })),
          (l[3] = c),
          (l[4] = o),
          (l[5] = a),
          (l[6] = u),
          (l[7] = n))
        : (n = l[7]),
      n
    );
  }
  function m(e) {
    let r,
      n,
      l = (0, i.c)(6),
      { onClick: o, loading: c, label: d, className: x } = e;
    l[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((r = (0, t.jsx)(s.EX, {})), (l[0] = r))
      : (r = l[0]);
    let h = c ? "Loading…" : d;
    return (
      l[1] !== x || l[2] !== c || l[3] !== o || l[4] !== h
        ? ((n = (0, t.jsx)(a.K, {
            variant: "secondary",
            size: 32,
            onClick: o,
            isDisabled: c,
            isLoading: c,
            "aria-busy": c,
            "data-testid": "create-callout-upsell-trigger",
            iconStart: r,
            className: x,
            children: h,
          })),
          (l[1] = x),
          (l[2] = c),
          (l[3] = o),
          (l[4] = h),
          (l[5] = n))
        : (n = l[5]),
      n
    );
  }
  function y(e) {
    let a,
      r,
      n,
      l,
      c,
      d = (0, i.c)(13),
      { coin: h, mint: b, className: p, label: m, screen: y } = e;
    if (d[0] !== h || d[1] !== b)
      ((a = h ? { coin: h } : b ? { mint: b } : void 0),
        (d[0] = h),
        (d[1] = b),
        (d[2] = a));
    else a = d[2];
    let v = a;
    (d[3] !== y || d[4] !== v
      ? ((r = () => (0, u._)(v, y ? { screen: y } : void 0)),
        (d[3] = y),
        (d[4] = v),
        (d[5] = r))
      : (r = d[5]),
      d[6] !== p
        ? ((n = (0, x.c)(o.u, p)), (d[6] = p), (d[7] = n))
        : (n = d[7]),
      d[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (0, t.jsx)(s.EX, { className: "size-3.5" })), (d[8] = l))
        : (l = d[8]));
    let g = m ?? f;
    return (
      d[9] !== r || d[10] !== n || d[11] !== g
        ? ((c = (0, t.jsxs)("button", {
            type: "button",
            onClick: r,
            "data-testid": "create-callout-upsell-trigger",
            className: n,
            children: [l, g],
          })),
          (d[9] = r),
          (d[10] = n),
          (d[11] = g),
          (d[12] = c))
        : (c = d[12]),
      c
    );
  }
  e.s([
    "f",
    0,
    function (e) {
      let s,
        a = (0, i.c)(4);
      if ("toast-action" === e.variant) {
        let i;
        return (
          a[0] !== e
            ? ((i = (0, t.jsx)(y, { ...e })), (a[0] = e), (a[1] = i))
            : (i = a[1]),
          i
        );
      }
      return (
        a[2] !== e
          ? ((s = (0, t.jsx)(b, { ...e })), (a[2] = e), (a[3] = s))
          : (s = a[3]),
        s
      );
    },
  ]);
};
