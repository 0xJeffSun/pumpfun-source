// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(745018),
    i = e.i(439587),
    l = e.i(574472),
    a = e.i(352386),
    s = e.i(171840),
    o = e.i(506486),
    c = e.i(79395),
    u = e.i(595673),
    d = e.i(338319),
    m = e.i(198825),
    f = e.i(237687);
  let h = "Create callout";
  function p(e) {
    let n,
      i,
      o,
      d,
      f = (0, r.c)(17),
      { variant: p, coin: x, mint: v, className: y, label: w, screen: j } = e;
    f[0] !== x || f[1] !== v || f[2] !== j
      ? ((n = { coin: x, mint: v, screen: j }),
        (f[0] = x),
        (f[1] = v),
        (f[2] = j),
        (f[3] = n))
      : (n = f[3]);
    let {
      isOpen: N,
      onOpenChange: C,
      requestOpen: _,
      prefilledCoin: k,
      isResolving: S,
    } = (function (e) {
      let t,
        n,
        i,
        s,
        o = (0, r.c)(15),
        { coin: d, mint: f, screen: h } = e,
        { address: p } = (0, l.F)(),
        { setShowWallet: g } = (0, m.useConnectWallet)(),
        [b, x] = (0, a.useState)(!1),
        v = !d && !!f,
        y = f ?? "",
        w = v && b;
      (o[0] !== w ? ((t = { enabled: w }), (o[0] = w), (o[1] = t)) : (t = o[1]),
        o[2] !== y || o[3] !== t
          ? ((n = { coinAddress: y, queryOptions: t }),
            (o[2] = y),
            (o[3] = t),
            (o[4] = n))
          : (n = o[4]));
      let { data: j, isError: N } = (0, c.f)(n),
        C = d ?? j ?? null,
        _ = b && (!v || null != C || N),
        k = b && v && null == C && !N;
      o[5] !== p || o[6] !== h || o[7] !== g || o[8] !== b
        ? ((i = () => {
            if (!b) {
              if (!p) return void g(!0);
              ((0, u.bh)(h ? { screen: h } : void 0), x(!0));
            }
          }),
          (o[5] = p),
          (o[6] = h),
          (o[7] = g),
          (o[8] = b),
          (o[9] = i))
        : (i = o[9]);
      let S = i;
      return (
        o[10] !== _ || o[11] !== k || o[12] !== C || o[13] !== S
          ? ((s = {
              isOpen: _,
              onOpenChange: x,
              requestOpen: S,
              prefilledCoin: C,
              isResolving: k,
            }),
            (o[10] = _),
            (o[11] = k),
            (o[12] = C),
            (o[13] = S),
            (o[14] = s))
          : (s = o[14]),
        s
      );
    })(n);
    return (
      f[4] !== y || f[5] !== S || f[6] !== w || f[7] !== _ || f[8] !== p
        ? ((i =
            "card" === p
              ? (0, t.jsx)(g, {
                  onClick: _,
                  loading: S,
                  label: w ?? "Add your callout",
                  className: y,
                })
              : (0, t.jsx)(b, {
                  onClick: _,
                  loading: S,
                  label: w ?? h,
                  className: y,
                })),
          (f[4] = y),
          (f[5] = S),
          (f[6] = w),
          (f[7] = _),
          (f[8] = p),
          (f[9] = i))
        : (i = f[9]),
      f[10] !== N || f[11] !== C || f[12] !== k
        ? ((o = N
            ? (0, t.jsx)(s.f, { isOpen: N, onOpenChange: C, prefilledCoin: k })
            : null),
          (f[10] = N),
          (f[11] = C),
          (f[12] = k),
          (f[13] = o))
        : (o = f[13]),
      f[14] !== i || f[15] !== o
        ? ((d = (0, t.jsxs)(t.Fragment, { children: [i, o] })),
          (f[14] = i),
          (f[15] = o),
          (f[16] = d))
        : (d = f[16]),
      d
    );
  }
  function g(e) {
    let i,
      l,
      a,
      s = (0, r.c)(8),
      { onClick: o, loading: c, label: u, className: m } = e;
    (s[0] !== m
      ? ((i = (0, d.c)(
          "flex w-full items-center justify-center gap-2 rounded-xl border border-dotted border-border-tertiary bg-bg-secondary px-4 py-3 text-[13px] font-medium leading-4 text-text-secondary transition-colors hover:border-text-quaternary hover:bg-bg-tertiary hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50",
          m,
        )),
        (s[0] = m),
        (s[1] = i))
      : (i = s[1]),
      s[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className:
              "flex size-5 shrink-0 items-center justify-center rounded-full border border-dotted border-current",
            children: (0, t.jsx)(n.YC, { className: "size-3" }),
          })),
          (s[2] = l))
        : (l = s[2]));
    let f = c ? "Loading…" : u;
    return (
      s[3] !== c || s[4] !== o || s[5] !== i || s[6] !== f
        ? ((a = (0, t.jsxs)("button", {
            type: "button",
            onClick: o,
            disabled: c,
            "aria-busy": c,
            "data-testid": "create-callout-upsell-trigger",
            className: i,
            children: [l, f],
          })),
          (s[3] = c),
          (s[4] = o),
          (s[5] = i),
          (s[6] = f),
          (s[7] = a))
        : (a = s[7]),
      a
    );
  }
  function b(e) {
    let l,
      a,
      s = (0, r.c)(6),
      { onClick: o, loading: c, label: u, className: d } = e;
    s[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((l = (0, t.jsx)(n.EX, {})), (s[0] = l))
      : (l = s[0]);
    let m = c ? "Loading…" : u;
    return (
      s[1] !== d || s[2] !== c || s[3] !== o || s[4] !== m
        ? ((a = (0, t.jsx)(i.K, {
            variant: "secondary",
            size: 32,
            onClick: o,
            isDisabled: c,
            isLoading: c,
            "aria-busy": c,
            "data-testid": "create-callout-upsell-trigger",
            iconStart: l,
            className: d,
            children: m,
          })),
          (s[1] = d),
          (s[2] = c),
          (s[3] = o),
          (s[4] = m),
          (s[5] = a))
        : (a = s[5]),
      a
    );
  }
  function x(e) {
    let i,
      l,
      a,
      s,
      c,
      u = (0, r.c)(13),
      { coin: m, mint: p, className: g, label: b, screen: x } = e;
    if (u[0] !== m || u[1] !== p)
      ((i = m ? { coin: m } : p ? { mint: p } : void 0),
        (u[0] = m),
        (u[1] = p),
        (u[2] = i));
    else i = u[2];
    let v = i;
    (u[3] !== x || u[4] !== v
      ? ((l = () => (0, f._)(v, x ? { screen: x } : void 0)),
        (u[3] = x),
        (u[4] = v),
        (u[5] = l))
      : (l = u[5]),
      u[6] !== g
        ? ((a = (0, d.c)(o.u, g)), (u[6] = g), (u[7] = a))
        : (a = u[7]),
      u[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = (0, t.jsx)(n.EX, { className: "size-3.5" })), (u[8] = s))
        : (s = u[8]));
    let y = b ?? h;
    return (
      u[9] !== l || u[10] !== a || u[11] !== y
        ? ((c = (0, t.jsxs)("button", {
            type: "button",
            onClick: l,
            "data-testid": "create-callout-upsell-trigger",
            className: a,
            children: [s, y],
          })),
          (u[9] = l),
          (u[10] = a),
          (u[11] = y),
          (u[12] = c))
        : (c = u[12]),
      c
    );
  }
  e.s([
    "f",
    0,
    function (e) {
      let n,
        i = (0, r.c)(4);
      if ("toast-action" === e.variant) {
        let r;
        return (
          i[0] !== e
            ? ((r = (0, t.jsx)(x, { ...e })), (i[0] = e), (i[1] = r))
            : (r = i[1]),
          r
        );
      }
      return (
        i[2] !== e
          ? ((n = (0, t.jsx)(p, { ...e })), (i[2] = e), (i[3] = n))
          : (n = i[3]),
        n
      );
    },
  ]);
};
