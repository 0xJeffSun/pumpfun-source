// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    r = e.i(745018),
    n = e.i(439587),
    i = e.i(574472),
    a = e.i(352386),
    s = e.i(171840),
    o = e.i(506486),
    c = e.i(79395),
    d = e.i(595673),
    u = e.i(338319),
    m = e.i(198825),
    f = e.i(237687);
  let x = "Create callout";
  function h(e) {
    let r,
      n,
      o,
      u,
      f = (0, l.c)(17),
      { variant: h, coin: b, mint: v, className: y, label: _, screen: j } = e;
    f[0] !== b || f[1] !== v || f[2] !== j
      ? ((r = { coin: b, mint: v, screen: j }),
        (f[0] = b),
        (f[1] = v),
        (f[2] = j),
        (f[3] = r))
      : (r = f[3]);
    let {
      isOpen: w,
      onOpenChange: N,
      requestOpen: k,
      prefilledCoin: S,
      isResolving: C,
    } = (function (e) {
      let t,
        r,
        n,
        s,
        o = (0, l.c)(15),
        { coin: u, mint: f, screen: x } = e,
        { address: h } = (0, i.F)(),
        { setShowWallet: p } = (0, m.useConnectWallet)(),
        [g, b] = (0, a.useState)(!1),
        v = !u && !!f,
        y = f ?? "",
        _ = v && g;
      (o[0] !== _ ? ((t = { enabled: _ }), (o[0] = _), (o[1] = t)) : (t = o[1]),
        o[2] !== y || o[3] !== t
          ? ((r = { coinAddress: y, queryOptions: t }),
            (o[2] = y),
            (o[3] = t),
            (o[4] = r))
          : (r = o[4]));
      let { data: j, isError: w } = (0, c.f)(r),
        N = u ?? j ?? null,
        k = g && (!v || null != N || w),
        S = g && v && null == N && !w;
      o[5] !== h || o[6] !== x || o[7] !== p || o[8] !== g
        ? ((n = () => {
            if (!g) {
              if (!h) return void p(!0);
              ((0, d.bh)(x ? { screen: x } : void 0), b(!0));
            }
          }),
          (o[5] = h),
          (o[6] = x),
          (o[7] = p),
          (o[8] = g),
          (o[9] = n))
        : (n = o[9]);
      let C = n;
      return (
        o[10] !== k || o[11] !== S || o[12] !== N || o[13] !== C
          ? ((s = {
              isOpen: k,
              onOpenChange: b,
              requestOpen: C,
              prefilledCoin: N,
              isResolving: S,
            }),
            (o[10] = k),
            (o[11] = S),
            (o[12] = N),
            (o[13] = C),
            (o[14] = s))
          : (s = o[14]),
        s
      );
    })(r);
    return (
      f[4] !== y || f[5] !== C || f[6] !== _ || f[7] !== k || f[8] !== h
        ? ((n =
            "card" === h
              ? (0, t.jsx)(p, {
                  onClick: k,
                  loading: C,
                  label: _ ?? "Add your callout",
                  className: y,
                })
              : (0, t.jsx)(g, {
                  onClick: k,
                  loading: C,
                  label: _ ?? x,
                  className: y,
                })),
          (f[4] = y),
          (f[5] = C),
          (f[6] = _),
          (f[7] = k),
          (f[8] = h),
          (f[9] = n))
        : (n = f[9]),
      f[10] !== w || f[11] !== N || f[12] !== S
        ? ((o = w
            ? (0, t.jsx)(s.f, { isOpen: w, onOpenChange: N, prefilledCoin: S })
            : null),
          (f[10] = w),
          (f[11] = N),
          (f[12] = S),
          (f[13] = o))
        : (o = f[13]),
      f[14] !== n || f[15] !== o
        ? ((u = (0, t.jsxs)(t.Fragment, { children: [n, o] })),
          (f[14] = n),
          (f[15] = o),
          (f[16] = u))
        : (u = f[16]),
      u
    );
  }
  function p(e) {
    let n,
      i,
      a,
      s = (0, l.c)(8),
      { onClick: o, loading: c, label: d, className: m } = e;
    (s[0] !== m
      ? ((n = (0, u.c)(
          "flex w-full items-center justify-center gap-2 rounded-xl border border-dotted border-border-tertiary bg-bg-secondary px-4 py-3 text-[13px] font-medium leading-4 text-text-secondary transition-colors hover:border-text-quaternary hover:bg-bg-tertiary hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50",
          m,
        )),
        (s[0] = m),
        (s[1] = n))
      : (n = s[1]),
      s[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className:
              "flex size-5 shrink-0 items-center justify-center rounded-full border border-dotted border-current",
            children: (0, t.jsx)(r.YC, { className: "size-3" }),
          })),
          (s[2] = i))
        : (i = s[2]));
    let f = c ? "Loading…" : d;
    return (
      s[3] !== c || s[4] !== o || s[5] !== n || s[6] !== f
        ? ((a = (0, t.jsxs)("button", {
            type: "button",
            onClick: o,
            disabled: c,
            "aria-busy": c,
            "data-testid": "create-callout-upsell-trigger",
            className: n,
            children: [i, f],
          })),
          (s[3] = c),
          (s[4] = o),
          (s[5] = n),
          (s[6] = f),
          (s[7] = a))
        : (a = s[7]),
      a
    );
  }
  function g(e) {
    let i,
      a,
      s = (0, l.c)(6),
      { onClick: o, loading: c, label: d, className: u } = e;
    s[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((i = (0, t.jsx)(r.EX, {})), (s[0] = i))
      : (i = s[0]);
    let m = c ? "Loading…" : d;
    return (
      s[1] !== u || s[2] !== c || s[3] !== o || s[4] !== m
        ? ((a = (0, t.jsx)(n.K, {
            variant: "secondary",
            size: 32,
            onClick: o,
            isDisabled: c,
            isLoading: c,
            "aria-busy": c,
            "data-testid": "create-callout-upsell-trigger",
            iconStart: i,
            className: u,
            children: m,
          })),
          (s[1] = u),
          (s[2] = c),
          (s[3] = o),
          (s[4] = m),
          (s[5] = a))
        : (a = s[5]),
      a
    );
  }
  function b(e) {
    let n,
      i,
      a,
      s,
      c,
      d = (0, l.c)(13),
      { coin: m, mint: h, className: p, label: g, screen: b } = e;
    if (d[0] !== m || d[1] !== h)
      ((n = m ? { coin: m } : h ? { mint: h } : void 0),
        (d[0] = m),
        (d[1] = h),
        (d[2] = n));
    else n = d[2];
    let v = n;
    (d[3] !== b || d[4] !== v
      ? ((i = () => (0, f._)(v, b ? { screen: b } : void 0)),
        (d[3] = b),
        (d[4] = v),
        (d[5] = i))
      : (i = d[5]),
      d[6] !== p
        ? ((a = (0, u.c)(o.u, p)), (d[6] = p), (d[7] = a))
        : (a = d[7]),
      d[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = (0, t.jsx)(r.EX, { className: "size-3.5" })), (d[8] = s))
        : (s = d[8]));
    let y = g ?? x;
    return (
      d[9] !== i || d[10] !== a || d[11] !== y
        ? ((c = (0, t.jsxs)("button", {
            type: "button",
            onClick: i,
            "data-testid": "create-callout-upsell-trigger",
            className: a,
            children: [s, y],
          })),
          (d[9] = i),
          (d[10] = a),
          (d[11] = y),
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
        n = (0, l.c)(4);
      if ("toast-action" === e.variant) {
        let l;
        return (
          n[0] !== e
            ? ((l = (0, t.jsx)(b, { ...e })), (n[0] = e), (n[1] = l))
            : (l = n[1]),
          l
        );
      }
      return (
        n[2] !== e
          ? ((r = (0, t.jsx)(h, { ...e })), (n[2] = e), (n[3] = r))
          : (r = n[3]),
        r
      );
    },
  ]);
};
