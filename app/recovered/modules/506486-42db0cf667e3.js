// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(745018),
    i = e.i(606933),
    l = e.i(352386);
  e.i(12692);
  var a = e.i(398902),
    s = e.i(34011),
    o = e.i(51206),
    u = e.i(360827),
    c = e.i(38279),
    d = e.i(689943);
  e.i(267146);
  var m = e.i(540805),
    f = e.i(84674);
  let g = { gain: "bg-gain", loss: "bg-loss", neutral: "bg-border-tertiary" },
    p = {
      gain: "bg-gain/70",
      loss: "bg-loss/70",
      neutral: "bg-border-tertiary",
    },
    h = {
      buy: "bg-gain text-[var(--color-text-on-accent)]",
      sell: "bg-loss text-[var(--color-text-on-error)]",
    },
    y = u.V.replace("overlay-glass", "bg-bg-primary"),
    b = `${y} group relative flex w-[var(--width)] max-w-full flex-col gap-2 overflow-hidden p-3 text-left`,
    x =
      "inline-flex h-7 shrink-0 items-center gap-1 rounded-md bg-bg-tertiary px-2.5 text-xs font-medium text-text-primary hover:bg-bg-quaternary",
    v =
      "inline-flex h-7 shrink-0 items-center gap-1 rounded-md bg-bg-accent px-2.5 text-xs font-medium text-[var(--color-text-on-accent)] transition-[filter] hover:brightness-110";
  function w(e) {
    let t,
      r,
      a = (0, n.c)(6),
      s = (0, l.useContext)(i.QueryClientContext);
    a[0] !== s || a[1] !== e
      ? ((t = () => (s && e ? s.getQueryData(e) : void 0)),
        (a[0] = s),
        (a[1] = e),
        (a[2] = t))
      : (t = a[2]);
    let o = t;
    a[3] !== s || a[4] !== e
      ? ((r = (t) => (s && e ? s.getQueryCache().subscribe(t) : _)),
        (a[3] = s),
        (a[4] = e),
        (a[5] = r))
      : (r = a[5]);
    let u = r;
    return (0, l.useSyncExternalStore)(u, o, o);
  }
  function _() {}
  function k(e) {
    let r,
      i,
      l = (0, n.c)(9),
      { href: a, children: s, target: o, variant: u, onClick: c } = e,
      d = void 0 === o ? "_blank" : o,
      m = "_blank" === d ? "noreferrer noopener" : void 0;
    l[0] !== c
      ? ((r = (e) => {
          (e.stopPropagation(), c?.());
        }),
        (l[0] = c),
        (l[1] = r))
      : (r = l[1]);
    let f = "primary" === (void 0 === u ? "default" : u) ? v : x;
    return (
      l[2] !== s ||
      l[3] !== a ||
      l[4] !== m ||
      l[5] !== r ||
      l[6] !== f ||
      l[7] !== d
        ? ((i = (0, t.jsx)("a", {
            href: a,
            target: d,
            rel: m,
            onClick: r,
            className: f,
            children: s,
          })),
          (l[2] = s),
          (l[3] = a),
          (l[4] = m),
          (l[5] = r),
          (l[6] = f),
          (l[7] = d),
          (l[8] = i))
        : (i = l[8]),
      i
    );
  }
  function P(e) {
    return e.stopPropagation();
  }
  e.s([
    "t",
    0,
    x,
    "u",
    0,
    v,
    "m",
    0,
    k,
    "O",
    0,
    function (e) {
      var i;
      let l,
        a,
        o,
        u,
        c,
        m,
        f,
        y,
        x,
        v,
        _,
        k,
        P,
        z,
        C,
        A,
        L,
        $ = (0, n.c)(52),
        {
          tone: S,
          side: U,
          coin: j,
          mint: q,
          glyph: N,
          title: B,
          subtitle: E,
          subtitleLines: M,
          action: T,
          actionBelow: F,
          durationMs: I,
          onDismiss: D,
          ariaLabel: Q,
          testId: O,
        } = e,
        K = void 0 === M ? 1 : M,
        R = void 0 !== F && F,
        H =
          ((i = q ?? j?.mint),
          (L = (0, n.c)(2))[0] !== i
            ? ((A = i ? d.o.coin(i) : null), (L[0] = i), (L[1] = A))
            : (A = L[1]),
          w(A));
      $[0] !== H || $[1] !== j
        ? ((l = j
            ? H && H.mint.toLowerCase() === j.mint.toLowerCase()
              ? {
                  mint: j.mint,
                  name: j.name ?? H.name,
                  symbol: j.symbol ?? H.symbol,
                  image_uri: j.image_uri ?? H.image_uri,
                  is_banned: j.is_banned ?? H.is_banned,
                  chain_id: j.chain_id ?? H.chain_id,
                }
              : j
            : (H ?? null)),
          ($[0] = H),
          ($[1] = j),
          ($[2] = l))
        : (l = $[2]);
      let V = l;
      $[3] !== I
        ? ((a = null != I && Number.isFinite(I)), ($[3] = I), ($[4] = a))
        : (a = $[4]);
      let W = a,
        G = `absolute inset-y-0 left-0 w-[3px] rounded-full ${g[S]}`;
      ($[5] !== G
        ? ((o = (0, t.jsx)("span", {
            "aria-hidden": !0,
            "data-toast-spine": !0,
            className: G,
          })),
          ($[5] = G),
          ($[6] = o))
        : (o = $[6]),
        $[7] !== V || $[8] !== N
          ? ((u = V
              ? (0, t.jsx)(s.CoinAvatar, {
                  coin: V,
                  size: 36,
                  hideCorner: !0,
                  verified: !1,
                  optimisticImage: !0 !== V.is_banned,
                  eager: !0,
                  bone: !0,
                  imageRetries: 8,
                })
              : N),
            ($[7] = V),
            ($[8] = N),
            ($[9] = u))
          : (u = $[9]),
        $[10] !== U
          ? ((c = U
              ? (0, t.jsx)("span", {
                  "aria-hidden": !0,
                  "data-toast-badge": !0,
                  "data-side": U,
                  className: `absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full ring-2 ring-bg-primary ${h[U]}`,
                  children:
                    "buy" === U
                      ? (0, t.jsx)(r.DD, { size: 10 })
                      : (0, t.jsx)(r.kg, { size: 10 }),
                })
              : null),
            ($[10] = U),
            ($[11] = c))
          : (c = $[11]),
        $[12] !== u || $[13] !== c
          ? ((m = (0, t.jsxs)("span", {
              "data-toast-well": !0,
              className:
                "relative flex size-9 shrink-0 items-center justify-center rounded-md bg-bg-tertiary text-text-tertiary [&>svg]:size-4",
              children: [u, c],
            })),
            ($[12] = u),
            ($[13] = c),
            ($[14] = m))
          : (m = $[14]),
        $[15] !== B
          ? ((f = (0, t.jsx)("span", {
              "data-toast-title": !0,
              className:
                "truncate text-[13px] font-medium leading-5 text-text-primary",
              children: B,
            })),
            ($[15] = B),
            ($[16] = f))
          : (f = $[16]),
        $[17] !== E || $[18] !== K
          ? ((y =
              null != E
                ? (0, t.jsx)("span", {
                    "data-toast-subtitle": !0,
                    className: `text-xs font-normal leading-4 text-text-tertiary tabular-nums ${2 === K ? "line-clamp-2" : "truncate"}`,
                    children: E,
                  })
                : null),
            ($[17] = E),
            ($[18] = K),
            ($[19] = y))
          : (y = $[19]),
        $[20] !== f || $[21] !== y
          ? ((x = (0, t.jsxs)("span", {
              className: "flex min-w-0 flex-1 flex-col",
              children: [f, y],
            })),
            ($[20] = f),
            ($[21] = y),
            ($[22] = x))
          : (x = $[22]),
        $[23] !== T || $[24] !== R
          ? ((v =
              T && !R
                ? (0, t.jsx)("span", {
                    className: "flex shrink-0 items-center gap-1.5",
                    children: T,
                  })
                : null),
            ($[23] = T),
            ($[24] = R),
            ($[25] = v))
          : (v = $[25]),
        $[26] !== x || $[27] !== v || $[28] !== m
          ? ((_ = (0, t.jsxs)("span", {
              className: "flex w-full items-center gap-3",
              children: [m, x, v],
            })),
            ($[26] = x),
            ($[27] = v),
            ($[28] = m),
            ($[29] = _))
          : (_ = $[29]),
        $[30] !== T || $[31] !== R
          ? ((k =
              T && R
                ? (0, t.jsx)("span", {
                    className: "flex items-center gap-1.5 pl-12",
                    children: T,
                  })
                : null),
            ($[30] = T),
            ($[31] = R),
            ($[32] = k))
          : (k = $[32]),
        $[33] !== I || $[34] !== W || $[35] !== S
          ? ((P = W
              ? (0, t.jsx)("span", {
                  "aria-hidden": !0,
                  "data-toast-life": !0,
                  className: `pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left animate-[toast-life_var(--toast-life)_linear_forwards] group-hover:[animation-play-state:paused] motion-reduce:animate-none ${p[S]}`,
                  style: { "--toast-life": `${I}ms` },
                })
              : null),
            ($[33] = I),
            ($[34] = W),
            ($[35] = S),
            ($[36] = P))
          : (P = $[36]),
        $[37] !== _ || $[38] !== k || $[39] !== P || $[40] !== o
          ? ((z = (0, t.jsxs)(t.Fragment, { children: [o, _, k, P] })),
            ($[37] = _),
            ($[38] = k),
            ($[39] = P),
            ($[40] = o),
            ($[41] = z))
          : (z = $[41]));
      let J = z;
      if (D) {
        let e;
        return (
          $[42] !== Q ||
          $[43] !== J ||
          $[44] !== D ||
          $[45] !== O ||
          $[46] !== S
            ? ((e = (0, t.jsx)("button", {
                type: "button",
                onClick: D,
                className: `${b} cursor-pointer transition-colors hover:bg-bg-secondary`,
                "data-testid": O,
                "data-tone": S,
                "aria-label": Q,
                children: J,
              })),
              ($[42] = Q),
              ($[43] = J),
              ($[44] = D),
              ($[45] = O),
              ($[46] = S),
              ($[47] = e))
            : (e = $[47]),
          e
        );
      }
      return (
        $[48] !== J || $[49] !== O || $[50] !== S
          ? ((C = (0, t.jsx)("div", {
              className: b,
              "data-testid": O,
              "data-tone": S,
              children: J,
            })),
            ($[48] = J),
            ($[49] = O),
            ($[50] = S),
            ($[51] = C))
          : (C = $[51]),
        C
      );
    },
    "X",
    0,
    function (e) {
      let t,
        r = (0, n.c)(3),
        { render: i } = e,
        { t: l } = (0, a.f)();
      return (
        r[0] !== i || r[1] !== l
          ? ((t = i(l)), (r[0] = i), (r[1] = l), (r[2] = t))
          : (t = r[2]),
        t
      );
    },
    "H",
    0,
    function (e) {
      let r,
        i,
        l = (0, n.c)(5),
        { label: a, solUi: s } = e,
        o = w(c.Q.SOL_PRICE),
        u = null != s && null != o && o > 0 ? s * o : null;
      return (
        l[0] !== u
          ? ((r = null != u && u >= 0.01 ? ` \xb7 ${(0, m.w)(u)}` : null),
            (l[0] = u),
            (l[1] = r))
          : (r = l[1]),
        l[2] !== a || l[3] !== r
          ? ((i = (0, t.jsxs)(t.Fragment, { children: [a, r] })),
            (l[2] = a),
            (l[3] = r),
            (l[4] = i))
          : (i = l[4]),
        i
      );
    },
    "v",
    0,
    function (e) {
      let i,
        l,
        s,
        u,
        c = (0, n.c)(13),
        { signature: d, chainId: m, compact: g } = e,
        { t: p } = (0, a.f)();
      c[0] !== m || c[1] !== d
        ? ((i = (0, f.X)(d, m)), (c[0] = m), (c[1] = d), (c[2] = i))
        : (i = c[2]);
      let h = i;
      c[3] !== p
        ? ((l = p("web.toasts.view_tx")), (c[3] = p), (c[4] = l))
        : (l = c[4]);
      let y = l;
      if (void 0 !== g && g) {
        let e, n;
        return (
          c[5] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, t.jsx)(r.ic, {})), (c[5] = e))
            : (e = c[5]),
          c[6] !== h || c[7] !== y
            ? ((n = (0, t.jsx)(o._, {
                density: "terminal",
                size: 28,
                variant: "ghost",
                href: h,
                target: "_blank",
                rel: "noreferrer noopener",
                "aria-label": y,
                title: y,
                onClick: P,
                children: e,
              })),
              (c[6] = h),
              (c[7] = y),
              (c[8] = n))
            : (n = c[8]),
          n
        );
      }
      return (
        c[9] === Symbol.for("react.memo_cache_sentinel")
          ? ((s = (0, t.jsx)(r.ic, { size: 12 })), (c[9] = s))
          : (s = c[9]),
        c[10] !== h || c[11] !== y
          ? ((u = (0, t.jsxs)(k, { href: h, children: [y, s] })),
            (c[10] = h),
            (c[11] = y),
            (c[12] = u))
          : (u = c[12]),
        u
      );
    },
    "R",
    0,
    (e) => ("buy" === e ? "gain" : "loss"),
    "$",
    0,
    (e) => {
      (0, s.warmCoinAvatarArt)(e, 36, e?.is_banned !== !0);
    },
  ]);
};
