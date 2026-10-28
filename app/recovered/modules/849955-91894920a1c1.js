// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var i = e.i(732486),
    t = e.i(445242),
    a = e.i(465085),
    n = e.i(352386);
  e.i(12692);
  var r = e.i(398902),
    l = e.i(667876),
    s = e.i(34011),
    o = e.i(338319);
  let c = { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    m = (e) => {
      let n,
        r,
        l,
        m,
        d = (0, t.c)(11),
        { coin: h, isScrolled: u } = e,
        x = u && "coin-avatar-glow-active";
      d[0] !== x
        ? ((n = (0, o.c)("coin-avatar-glow relative shrink-0 rounded-md", x)),
          (d[0] = x),
          (d[1] = n))
        : (n = d[1]);
      let p = u ? 1.15 : 1;
      d[2] !== p ? ((r = { scale: p }), (d[2] = p), (d[3] = r)) : (r = d[3]);
      let f = u ? 32 : 28;
      return (
        d[4] !== h || d[5] !== f
          ? ((l = (0, i.jsx)(s.CoinAvatar, {
              coin: h,
              size: f,
              seal: "name",
              optimisticImage: !0,
              testIdPrefix: "coin-cell-art",
            })),
            (d[4] = h),
            (d[5] = f),
            (d[6] = l))
          : (l = d[6]),
        d[7] !== n || d[8] !== r || d[9] !== l
          ? ((m = (0, i.jsx)(a.f.div, {
              className: n,
              animate: r,
              transition: c,
              children: l,
            })),
            (d[7] = n),
            (d[8] = r),
            (d[9] = l),
            (d[10] = m))
          : (m = d[10]),
        m
      );
    },
    d = (e) => {
      let n,
        s,
        o,
        m,
        d,
        h,
        u,
        x,
        p,
        f,
        g = (0, t.c)(29),
        { coin: v, isScrolled: b } = e,
        { t: w } = (0, r.f)(),
        y = +!b,
        _ = b ? -15 : 0,
        S = b ? 0.9 : 1;
      (g[0] !== y || g[1] !== _ || g[2] !== S
        ? ((n = { opacity: y, x: _, scale: S }),
          (g[0] = y),
          (g[1] = _),
          (g[2] = S),
          (g[3] = n))
        : (n = g[3]),
        g[4] === Symbol.for("react.memo_cache_sentinel")
          ? ((s = { transformOrigin: "left center" }), (g[4] = s))
          : (s = g[4]),
        g[5] !== v.name
          ? ((o = (0, i.jsx)("span", {
              className:
                "min-w-0 max-w-[85px] truncate whitespace-nowrap text-sm font-medium leading-none md:max-w-none",
              title: v.name,
              children: v.name,
            })),
            (g[5] = v.name),
            (g[6] = o))
          : (o = g[6]));
      let j = "string" == typeof v.chain_id ? v.chain_id : null;
      (g[7] !== v.mint || g[8] !== j
        ? ((m = (0, i.jsx)(l.f, { mint: v.mint, chainId: j })),
          (g[7] = v.mint),
          (g[8] = j),
          (g[9] = m))
        : (m = g[9]),
        g[10] !== o || g[11] !== m
          ? ((d = (0, i.jsxs)("span", {
              className: "flex min-w-0 max-w-full items-center gap-1",
              children: [o, m],
            })),
            (g[10] = o),
            (g[11] = m),
            (g[12] = d))
          : (d = g[12]));
      let N = v.symbol ? `$${v.symbol}` : null;
      return (
        g[13] !== N
          ? ((h = (0, i.jsx)("span", {
              className:
                "flex-shrink-0 text-xs leading-none text-text-tertiary",
              children: N,
            })),
            (g[13] = N),
            (g[14] = h))
          : (h = g[14]),
        g[15] !== v.nsfw || g[16] !== w
          ? ((u =
              v.nsfw &&
              (0, i.jsx)("span", {
                className:
                  "border-destructive/50 text-destructive h-3.5 content-center rounded border px-1 text-[8px] leading-none",
                children: w("web.home.nsfw_label"),
              })),
            (g[15] = v.nsfw),
            (g[16] = w),
            (g[17] = u))
          : (u = g[17]),
        g[18] !== v.is_charity || g[19] !== w
          ? ((x =
              v.is_charity &&
              (0, i.jsx)("span", {
                className:
                  "h-3.5 content-center rounded border border-pink-500/40 bg-pink-500/10 px-1 text-[8px] leading-none text-pink-500",
                children: w("creator_fees.charity.label"),
              })),
            (g[18] = v.is_charity),
            (g[19] = w),
            (g[20] = x))
          : (x = g[20]),
        g[21] !== h || g[22] !== u || g[23] !== x
          ? ((p = (0, i.jsxs)("div", {
              className: "flex h-3.5 items-center gap-1",
              children: [h, u, x],
            })),
            (g[21] = h),
            (g[22] = u),
            (g[23] = x),
            (g[24] = p))
          : (p = g[24]),
        g[25] !== p || g[26] !== n || g[27] !== d
          ? ((f = (0, i.jsxs)(a.f.div, {
              className:
                "coin-cell-animation flex min-w-0 flex-col items-baseline gap-1 overflow-hidden px-1",
              animate: n,
              transition: c,
              style: s,
              children: [d, p],
            })),
            (g[25] = p),
            (g[26] = n),
            (g[27] = d),
            (g[28] = f))
          : (f = g[28]),
        f
      );
    },
    h = (0, n.memo)(
      (e) => {
        let n,
          r,
          l,
          s,
          h,
          u,
          x = (0, t.c)(20),
          {
            coin: p,
            isScrolled: f,
            isHorizontallyScrolled: g,
            serialNumber: v,
          } = e,
          b = f || g ? "justify-center gap-0" : "gap-1.5";
        x[0] !== b
          ? ((n = (0, o.c)("coin-cell-animation flex w-full items-center", b)),
            (x[0] = b),
            (x[1] = n))
          : (n = x[1]);
        let w = f || g ? 0 : 8;
        (x[2] !== w ? ((r = { gap: w }), (x[2] = w), (x[3] = r)) : (r = x[3]),
          x[4] !== g || x[5] !== v
            ? ((l =
                void 0 !== v &&
                (0, i.jsx)(a.f.div, {
                  className:
                    "flex-shrink-0 text-center font-medium text-text-tertiary",
                  style: { minWidth: 32 * !g, overflow: "hidden" },
                  animate: { opacity: +!g, scale: g ? 0.8 : 1, width: 32 * !g },
                  transition: c,
                  children: (0, i.jsx)("span", {
                    className: "text-sm",
                    children: v,
                  }),
                })),
              (x[4] = g),
              (x[5] = v),
              (x[6] = l))
            : (l = x[6]));
        let y = f || g;
        return (
          x[7] !== p || x[8] !== y
            ? ((s = (0, i.jsx)(m, { coin: p, isScrolled: y })),
              (x[7] = p),
              (x[8] = y),
              (x[9] = s))
            : (s = x[9]),
          x[10] !== p || x[11] !== g || x[12] !== f
            ? ((h = !g && (0, i.jsx)(d, { coin: p, isScrolled: f })),
              (x[10] = p),
              (x[11] = g),
              (x[12] = f),
              (x[13] = h))
            : (h = x[13]),
          x[14] !== n ||
          x[15] !== r ||
          x[16] !== l ||
          x[17] !== s ||
          x[18] !== h
            ? ((u = (0, i.jsxs)(a.f.div, {
                className: n,
                animate: r,
                transition: c,
                children: [l, s, h],
              })),
              (x[14] = n),
              (x[15] = r),
              (x[16] = l),
              (x[17] = s),
              (x[18] = h),
              (x[19] = u))
            : (u = x[19]),
          u
        );
      },
      (e, i) => {
        if (e.coin === i.coin)
          return (
            e.isScrolled === i.isScrolled &&
            e.isHorizontallyScrolled === i.isHorizontallyScrolled &&
            e.serialNumber === i.serialNumber
          );
        let t = e.coin,
          a = i.coin;
        return (
          t.mint === a.mint &&
          t.name === a.name &&
          t.symbol === a.symbol &&
          t.image_uri === a.image_uri &&
          t.chain_id === a.chain_id &&
          t.program === a.program &&
          t.board_program === a.board_program &&
          t.platform === a.platform &&
          t.protocol === a.protocol &&
          t.is_currently_live === a.is_currently_live &&
          t.nsfw === a.nsfw &&
          t.is_charity === a.is_charity &&
          e.isScrolled === i.isScrolled &&
          e.isHorizontallyScrolled === i.isHorizontallyScrolled &&
          e.serialNumber === i.serialNumber
        );
      },
    );
  ((h.displayName = "CoinCell"), e.s(["f", 0, h]));
};
