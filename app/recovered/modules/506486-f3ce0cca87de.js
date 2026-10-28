// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(745018),
    i = e.i(606933),
    a = e.i(352386);
  e.i(12692);
  var o = e.i(398902),
    s = e.i(34011),
    l = e.i(51206),
    u = e.i(360827),
    c = e.i(38279),
    d = e.i(689943);
  e.i(267146);
  var f = e.i(540805),
    h = e.i(84674);
  let p = { gain: "bg-gain", loss: "bg-loss", neutral: "bg-border-tertiary" },
    m = {
      gain: "bg-gain/70",
      loss: "bg-loss/70",
      neutral: "bg-border-tertiary",
    },
    g = {
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
      o = (0, n.c)(6),
      s = (0, a.useContext)(i.QueryClientContext);
    o[0] !== s || o[1] !== e
      ? ((t = () => (s && e ? s.getQueryData(e) : void 0)),
        (o[0] = s),
        (o[1] = e),
        (o[2] = t))
      : (t = o[2]);
    let l = t;
    o[3] !== s || o[4] !== e
      ? ((r = (t) => (s && e ? s.getQueryCache().subscribe(t) : k)),
        (o[3] = s),
        (o[4] = e),
        (o[5] = r))
      : (r = o[5]);
    let u = r;
    return (0, a.useSyncExternalStore)(u, l, l);
  }
  function k() {}
  function P(e) {
    let r,
      i,
      a = (0, n.c)(9),
      { href: o, children: s, target: l, variant: u, onClick: c } = e,
      d = void 0 === l ? "_blank" : l,
      f = "_blank" === d ? "noreferrer noopener" : void 0;
    a[0] !== c
      ? ((r = (e) => {
          (e.stopPropagation(), c?.());
        }),
        (a[0] = c),
        (a[1] = r))
      : (r = a[1]);
    let h = "primary" === (void 0 === u ? "default" : u) ? v : x;
    return (
      a[2] !== s ||
      a[3] !== o ||
      a[4] !== f ||
      a[5] !== r ||
      a[6] !== h ||
      a[7] !== d
        ? ((i = (0, t.jsx)("a", {
            href: o,
            target: d,
            rel: f,
            onClick: r,
            className: h,
            children: s,
          })),
          (a[2] = s),
          (a[3] = o),
          (a[4] = f),
          (a[5] = r),
          (a[6] = h),
          (a[7] = d),
          (a[8] = i))
        : (i = a[8]),
      i
    );
  }
  function S(e) {
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
    P,
    "O",
    0,
    function (e) {
      var i;
      let a,
        o,
        l,
        u,
        c,
        f,
        h,
        y,
        x,
        v,
        k,
        P,
        S,
        A,
        C,
        U,
        L,
        I = (0, n.c)(52),
        {
          tone: E,
          side: M,
          coin: O,
          mint: z,
          glyph: N,
          title: T,
          subtitle: B,
          subtitleLines: _,
          action: $,
          actionBelow: F,
          durationMs: R,
          onDismiss: j,
          ariaLabel: D,
          testId: H,
        } = e,
        q = void 0 === _ ? 1 : _,
        W = void 0 !== F && F,
        X =
          ((i = z ?? O?.mint),
          (L = (0, n.c)(2))[0] !== i
            ? ((U = i ? d.o.coin(i) : null), (L[0] = i), (L[1] = U))
            : (U = L[1]),
          w(U));
      I[0] !== X || I[1] !== O
        ? ((a = O
            ? X && X.mint.toLowerCase() === O.mint.toLowerCase()
              ? {
                  mint: O.mint,
                  name: O.name ?? X.name,
                  symbol: O.symbol ?? X.symbol,
                  image_uri: O.image_uri ?? X.image_uri,
                  is_banned: O.is_banned ?? X.is_banned,
                  chain_id: O.chain_id ?? X.chain_id,
                }
              : O
            : (X ?? null)),
          (I[0] = X),
          (I[1] = O),
          (I[2] = a))
        : (a = I[2]);
      let V = a;
      I[3] !== R
        ? ((o = null != R && Number.isFinite(R)), (I[3] = R), (I[4] = o))
        : (o = I[4]);
      let Q = o,
        K = `absolute inset-y-0 left-0 w-[3px] rounded-full ${p[E]}`;
      (I[5] !== K
        ? ((l = (0, t.jsx)("span", {
            "aria-hidden": !0,
            "data-toast-spine": !0,
            className: K,
          })),
          (I[5] = K),
          (I[6] = l))
        : (l = I[6]),
        I[7] !== V || I[8] !== N
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
            (I[7] = V),
            (I[8] = N),
            (I[9] = u))
          : (u = I[9]),
        I[10] !== M
          ? ((c = M
              ? (0, t.jsx)("span", {
                  "aria-hidden": !0,
                  "data-toast-badge": !0,
                  "data-side": M,
                  className: `absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full ring-2 ring-bg-primary ${g[M]}`,
                  children:
                    "buy" === M
                      ? (0, t.jsx)(r.DD, { size: 10 })
                      : (0, t.jsx)(r.kg, { size: 10 }),
                })
              : null),
            (I[10] = M),
            (I[11] = c))
          : (c = I[11]),
        I[12] !== u || I[13] !== c
          ? ((f = (0, t.jsxs)("span", {
              "data-toast-well": !0,
              className:
                "relative flex size-9 shrink-0 items-center justify-center rounded-md bg-bg-tertiary text-text-tertiary [&>svg]:size-4",
              children: [u, c],
            })),
            (I[12] = u),
            (I[13] = c),
            (I[14] = f))
          : (f = I[14]),
        I[15] !== T
          ? ((h = (0, t.jsx)("span", {
              "data-toast-title": !0,
              className:
                "truncate text-[13px] font-medium leading-5 text-text-primary",
              children: T,
            })),
            (I[15] = T),
            (I[16] = h))
          : (h = I[16]),
        I[17] !== B || I[18] !== q
          ? ((y =
              null != B
                ? (0, t.jsx)("span", {
                    "data-toast-subtitle": !0,
                    className: `text-xs font-normal leading-4 text-text-tertiary tabular-nums ${2 === q ? "line-clamp-2" : "truncate"}`,
                    children: B,
                  })
                : null),
            (I[17] = B),
            (I[18] = q),
            (I[19] = y))
          : (y = I[19]),
        I[20] !== h || I[21] !== y
          ? ((x = (0, t.jsxs)("span", {
              className: "flex min-w-0 flex-1 flex-col",
              children: [h, y],
            })),
            (I[20] = h),
            (I[21] = y),
            (I[22] = x))
          : (x = I[22]),
        I[23] !== $ || I[24] !== W
          ? ((v =
              $ && !W
                ? (0, t.jsx)("span", {
                    className: "flex shrink-0 items-center gap-1.5",
                    children: $,
                  })
                : null),
            (I[23] = $),
            (I[24] = W),
            (I[25] = v))
          : (v = I[25]),
        I[26] !== x || I[27] !== v || I[28] !== f
          ? ((k = (0, t.jsxs)("span", {
              className: "flex w-full items-center gap-3",
              children: [f, x, v],
            })),
            (I[26] = x),
            (I[27] = v),
            (I[28] = f),
            (I[29] = k))
          : (k = I[29]),
        I[30] !== $ || I[31] !== W
          ? ((P =
              $ && W
                ? (0, t.jsx)("span", {
                    className: "flex items-center gap-1.5 pl-12",
                    children: $,
                  })
                : null),
            (I[30] = $),
            (I[31] = W),
            (I[32] = P))
          : (P = I[32]),
        I[33] !== R || I[34] !== Q || I[35] !== E
          ? ((S = Q
              ? (0, t.jsx)("span", {
                  "aria-hidden": !0,
                  "data-toast-life": !0,
                  className: `pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left animate-[toast-life_var(--toast-life)_linear_forwards] group-hover:[animation-play-state:paused] motion-reduce:animate-none ${m[E]}`,
                  style: { "--toast-life": `${R}ms` },
                })
              : null),
            (I[33] = R),
            (I[34] = Q),
            (I[35] = E),
            (I[36] = S))
          : (S = I[36]),
        I[37] !== k || I[38] !== P || I[39] !== S || I[40] !== l
          ? ((A = (0, t.jsxs)(t.Fragment, { children: [l, k, P, S] })),
            (I[37] = k),
            (I[38] = P),
            (I[39] = S),
            (I[40] = l),
            (I[41] = A))
          : (A = I[41]));
      let G = A;
      if (j) {
        let e;
        return (
          I[42] !== D ||
          I[43] !== G ||
          I[44] !== j ||
          I[45] !== H ||
          I[46] !== E
            ? ((e = (0, t.jsx)("button", {
                type: "button",
                onClick: j,
                className: `${b} cursor-pointer transition-colors hover:bg-bg-secondary`,
                "data-testid": H,
                "data-tone": E,
                "aria-label": D,
                children: G,
              })),
              (I[42] = D),
              (I[43] = G),
              (I[44] = j),
              (I[45] = H),
              (I[46] = E),
              (I[47] = e))
            : (e = I[47]),
          e
        );
      }
      return (
        I[48] !== G || I[49] !== H || I[50] !== E
          ? ((C = (0, t.jsx)("div", {
              className: b,
              "data-testid": H,
              "data-tone": E,
              children: G,
            })),
            (I[48] = G),
            (I[49] = H),
            (I[50] = E),
            (I[51] = C))
          : (C = I[51]),
        C
      );
    },
    "X",
    0,
    function (e) {
      let t,
        r = (0, n.c)(3),
        { render: i } = e,
        { t: a } = (0, o.f)();
      return (
        r[0] !== i || r[1] !== a
          ? ((t = i(a)), (r[0] = i), (r[1] = a), (r[2] = t))
          : (t = r[2]),
        t
      );
    },
    "H",
    0,
    function (e) {
      let r,
        i,
        a = (0, n.c)(5),
        { label: o, solUi: s } = e,
        l = w(c.Q.SOL_PRICE),
        u = null != s && null != l && l > 0 ? s * l : null;
      return (
        a[0] !== u
          ? ((r = null != u && u >= 0.01 ? ` \xb7 ${(0, f.w)(u)}` : null),
            (a[0] = u),
            (a[1] = r))
          : (r = a[1]),
        a[2] !== o || a[3] !== r
          ? ((i = (0, t.jsxs)(t.Fragment, { children: [o, r] })),
            (a[2] = o),
            (a[3] = r),
            (a[4] = i))
          : (i = a[4]),
        i
      );
    },
    "v",
    0,
    function (e) {
      let i,
        a,
        s,
        u,
        c = (0, n.c)(13),
        { signature: d, chainId: f, compact: p } = e,
        { t: m } = (0, o.f)();
      c[0] !== f || c[1] !== d
        ? ((i = (0, h.X)(d, f)), (c[0] = f), (c[1] = d), (c[2] = i))
        : (i = c[2]);
      let g = i;
      c[3] !== m
        ? ((a = m("web.toasts.view_tx")), (c[3] = m), (c[4] = a))
        : (a = c[4]);
      let y = a;
      if (void 0 !== p && p) {
        let e, n;
        return (
          c[5] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, t.jsx)(r.ic, {})), (c[5] = e))
            : (e = c[5]),
          c[6] !== g || c[7] !== y
            ? ((n = (0, t.jsx)(l._, {
                density: "terminal",
                size: 28,
                variant: "ghost",
                href: g,
                target: "_blank",
                rel: "noreferrer noopener",
                "aria-label": y,
                title: y,
                onClick: S,
                children: e,
              })),
              (c[6] = g),
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
        c[10] !== g || c[11] !== y
          ? ((u = (0, t.jsxs)(P, { href: g, children: [y, s] })),
            (c[10] = g),
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
