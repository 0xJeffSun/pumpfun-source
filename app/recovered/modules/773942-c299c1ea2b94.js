// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(745018),
    r = e.i(439587),
    a = e.i(574472),
    n = e.i(352386),
    o = e.i(171840),
    s = e.i(506486),
    d = e.i(79395),
    c = e.i(595673),
    u = e.i(338319),
    m = e.i(198825),
    f = e.i(237687);
  let y = "Create callout";
  function h(e) {
    let l,
      r,
      s,
      u,
      f = (0, i.c)(17),
      { variant: h, coin: b, mint: v, className: g, label: C, screen: w } = e;
    f[0] !== b || f[1] !== v || f[2] !== w
      ? ((l = { coin: b, mint: v, screen: w }),
        (f[0] = b),
        (f[1] = v),
        (f[2] = w),
        (f[3] = l))
      : (l = f[3]);
    let {
      isOpen: k,
      onOpenChange: _,
      requestOpen: j,
      prefilledCoin: A,
      isResolving: I,
    } = (function (e) {
      let t,
        l,
        r,
        o,
        s = (0, i.c)(15),
        { coin: u, mint: f, screen: y } = e,
        { address: h } = (0, a.F)(),
        { setShowWallet: p } = (0, m.useConnectWallet)(),
        [x, b] = (0, n.useState)(!1),
        v = !u && !!f,
        g = f ?? "",
        C = v && x;
      (s[0] !== C ? ((t = { enabled: C }), (s[0] = C), (s[1] = t)) : (t = s[1]),
        s[2] !== g || s[3] !== t
          ? ((l = { coinAddress: g, queryOptions: t }),
            (s[2] = g),
            (s[3] = t),
            (s[4] = l))
          : (l = s[4]));
      let { data: w, isError: k } = (0, d.f)(l),
        _ = u ?? w ?? null,
        j = x && (!v || null != _ || k),
        A = x && v && null == _ && !k;
      s[5] !== h || s[6] !== y || s[7] !== p || s[8] !== x
        ? ((r = () => {
            if (!x) {
              if (!h) return void p(!0);
              ((0, c.bh)(y ? { screen: y } : void 0), b(!0));
            }
          }),
          (s[5] = h),
          (s[6] = y),
          (s[7] = p),
          (s[8] = x),
          (s[9] = r))
        : (r = s[9]);
      let I = r;
      return (
        s[10] !== j || s[11] !== A || s[12] !== _ || s[13] !== I
          ? ((o = {
              isOpen: j,
              onOpenChange: b,
              requestOpen: I,
              prefilledCoin: _,
              isResolving: A,
            }),
            (s[10] = j),
            (s[11] = A),
            (s[12] = _),
            (s[13] = I),
            (s[14] = o))
          : (o = s[14]),
        o
      );
    })(l);
    return (
      f[4] !== g || f[5] !== I || f[6] !== C || f[7] !== j || f[8] !== h
        ? ((r =
            "card" === h
              ? (0, t.jsx)(p, {
                  onClick: j,
                  loading: I,
                  label: C ?? "Add your callout",
                  className: g,
                })
              : (0, t.jsx)(x, {
                  onClick: j,
                  loading: I,
                  label: C ?? y,
                  className: g,
                })),
          (f[4] = g),
          (f[5] = I),
          (f[6] = C),
          (f[7] = j),
          (f[8] = h),
          (f[9] = r))
        : (r = f[9]),
      f[10] !== k || f[11] !== _ || f[12] !== A
        ? ((s = k
            ? (0, t.jsx)(o.f, { isOpen: k, onOpenChange: _, prefilledCoin: A })
            : null),
          (f[10] = k),
          (f[11] = _),
          (f[12] = A),
          (f[13] = s))
        : (s = f[13]),
      f[14] !== r || f[15] !== s
        ? ((u = (0, t.jsxs)(t.Fragment, { children: [r, s] })),
          (f[14] = r),
          (f[15] = s),
          (f[16] = u))
        : (u = f[16]),
      u
    );
  }
  function p(e) {
    let r,
      a,
      n,
      o = (0, i.c)(8),
      { onClick: s, loading: d, label: c, className: m } = e;
    (o[0] !== m
      ? ((r = (0, u.c)(
          "flex w-full items-center justify-center gap-2 rounded-xl border border-dotted border-border-tertiary bg-bg-secondary px-4 py-3 text-[13px] font-medium leading-4 text-text-secondary transition-colors hover:border-text-quaternary hover:bg-bg-tertiary hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50",
          m,
        )),
        (o[0] = m),
        (o[1] = r))
      : (r = o[1]),
      o[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className:
              "flex size-5 shrink-0 items-center justify-center rounded-full border border-dotted border-current",
            children: (0, t.jsx)(l.YC, { className: "size-3" }),
          })),
          (o[2] = a))
        : (a = o[2]));
    let f = d ? "Loading…" : c;
    return (
      o[3] !== d || o[4] !== s || o[5] !== r || o[6] !== f
        ? ((n = (0, t.jsxs)("button", {
            type: "button",
            onClick: s,
            disabled: d,
            "aria-busy": d,
            "data-testid": "create-callout-upsell-trigger",
            className: r,
            children: [a, f],
          })),
          (o[3] = d),
          (o[4] = s),
          (o[5] = r),
          (o[6] = f),
          (o[7] = n))
        : (n = o[7]),
      n
    );
  }
  function x(e) {
    let a,
      n,
      o = (0, i.c)(6),
      { onClick: s, loading: d, label: c, className: u } = e;
    o[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((a = (0, t.jsx)(l.EX, {})), (o[0] = a))
      : (a = o[0]);
    let m = d ? "Loading…" : c;
    return (
      o[1] !== u || o[2] !== d || o[3] !== s || o[4] !== m
        ? ((n = (0, t.jsx)(r.K, {
            variant: "secondary",
            size: 32,
            onClick: s,
            isDisabled: d,
            isLoading: d,
            "aria-busy": d,
            "data-testid": "create-callout-upsell-trigger",
            iconStart: a,
            className: u,
            children: m,
          })),
          (o[1] = u),
          (o[2] = d),
          (o[3] = s),
          (o[4] = m),
          (o[5] = n))
        : (n = o[5]),
      n
    );
  }
  function b(e) {
    let r,
      a,
      n,
      o,
      d,
      c = (0, i.c)(13),
      { coin: m, mint: h, className: p, label: x, screen: b } = e;
    if (c[0] !== m || c[1] !== h)
      ((r = m ? { coin: m } : h ? { mint: h } : void 0),
        (c[0] = m),
        (c[1] = h),
        (c[2] = r));
    else r = c[2];
    let v = r;
    (c[3] !== b || c[4] !== v
      ? ((a = () => (0, f._)(v, b ? { screen: b } : void 0)),
        (c[3] = b),
        (c[4] = v),
        (c[5] = a))
      : (a = c[5]),
      c[6] !== p
        ? ((n = (0, u.c)(s.u, p)), (c[6] = p), (c[7] = n))
        : (n = c[7]),
      c[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (0, t.jsx)(l.EX, { className: "size-3.5" })), (c[8] = o))
        : (o = c[8]));
    let g = x ?? y;
    return (
      c[9] !== a || c[10] !== n || c[11] !== g
        ? ((d = (0, t.jsxs)("button", {
            type: "button",
            onClick: a,
            "data-testid": "create-callout-upsell-trigger",
            className: n,
            children: [o, g],
          })),
          (c[9] = a),
          (c[10] = n),
          (c[11] = g),
          (c[12] = d))
        : (d = c[12]),
      d
    );
  }
  e.s([
    "f",
    0,
    function (e) {
      let l,
        r = (0, i.c)(4);
      if ("toast-action" === e.variant) {
        let i;
        return (
          r[0] !== e
            ? ((i = (0, t.jsx)(b, { ...e })), (r[0] = e), (r[1] = i))
            : (i = r[1]),
          i
        );
      }
      return (
        r[2] !== e
          ? ((l = (0, t.jsx)(h, { ...e })), (r[2] = e), (r[3] = l))
          : (l = r[3]),
        l
      );
    },
  ]);
};
