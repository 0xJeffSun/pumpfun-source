// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(745018),
    a = e.i(116549);
  e.i(12641);
  var n = e.i(34011),
    l = e.i(441315),
    o = e.i(338319);
  let s = { terminal: 16, comfortable: 20 },
    d = { terminal: "h-4 min-w-4", comfortable: "h-5 min-w-5" },
    c = [];
  e.s([
    "f",
    0,
    function (e) {
      let u,
        p,
        m,
        x,
        b,
        f,
        h,
        v,
        y,
        g,
        _ = (0, i.c)(34),
        {
          count: w,
          onClick: k,
          label: N,
          tail: I,
          avatars: S,
          placement: A,
          className: j,
        } = e,
        $ = void 0 === S ? c : S,
        U = void 0 === A ? "sticky" : A,
        F = (0, a.x)();
      if (w <= 0) return null;
      if (
        _[0] !== $ ||
        _[1] !== j ||
        _[2] !== w ||
        _[3] !== F ||
        _[4] !== N ||
        _[5] !== k ||
        _[6] !== U ||
        _[7] !== I
      ) {
        let e = $.slice(0, Math.min(3, w)),
          i = w - e.length,
          a = i > 99 ? "+99" : `+${i}`,
          c = "sticky" === U,
          y = c && "pointer-events-none sticky top-3 z-10 py-1";
        (_[16] !== j || _[17] !== y
          ? ((u = (0, o.c)("flex", y, j)),
            (_[16] = j),
            (_[17] = y),
            (_[18] = u))
          : (u = _[18]),
          (p = "button"),
          (m = k),
          (x = N),
          (b = F),
          _[19] !== F || _[20] !== c
            ? ((f = (0, l.C)({
                density: F,
                variant: "raised",
                interactive: !0,
                className: (0, o.c)(
                  "w-full justify-center gap-1.5",
                  c && "pointer-events-auto",
                ),
              })),
              (_[19] = F),
              (_[20] = c),
              (_[21] = f))
            : (f = _[21]),
          _[22] === Symbol.for("react.memo_cache_sentinel")
            ? ((h = (0, t.jsx)(r.cg, { className: "size-3.5" })), (_[22] = h))
            : (h = _[22]),
          (v =
            e.length > 0
              ? (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsxs)("span", {
                      "aria-hidden": !0,
                      className: "flex items-center",
                      children: [
                        e.map((e, i) =>
                          (0, t.jsx)(
                            n.CoinAvatar,
                            {
                              coin: { mint: e.mint, image_uri: e.imageUrl },
                              size: s[F],
                              shape: "round",
                              seal: "none",
                              hideCorner: !0,
                              optimisticImage: !0,
                              className: (0, o.c)(
                                "rounded-full",
                                i > 0 && "-ml-1.5",
                              ),
                            },
                            e.key,
                          ),
                        ),
                        i > 0
                          ? (0, t.jsx)("span", {
                              className: (0, o.c)(
                                "flex items-center justify-center rounded-full bg-bg-primary px-1 text-[11px] font-medium text-text-primary",
                                d[F],
                                e.length > 0 && "-ml-1.5",
                              ),
                              children: a,
                            })
                          : null,
                      ],
                    }),
                    (0, t.jsx)("span", { children: I }),
                  ],
                })
              : N),
          (_[0] = $),
          (_[1] = j),
          (_[2] = w),
          (_[3] = F),
          (_[4] = N),
          (_[5] = k),
          (_[6] = U),
          (_[7] = I),
          (_[8] = u),
          (_[9] = p),
          (_[10] = m),
          (_[11] = x),
          (_[12] = b),
          (_[13] = f),
          (_[14] = h),
          (_[15] = v));
      } else
        ((u = _[8]),
          (p = _[9]),
          (m = _[10]),
          (x = _[11]),
          (b = _[12]),
          (f = _[13]),
          (h = _[14]),
          (v = _[15]));
      return (
        _[23] !== p ||
        _[24] !== m ||
        _[25] !== x ||
        _[26] !== b ||
        _[27] !== f ||
        _[28] !== h ||
        _[29] !== v
          ? ((y = (0, t.jsxs)("button", {
              type: p,
              onClick: m,
              "aria-label": x,
              "data-density": b,
              className: f,
              children: [h, v],
            })),
            (_[23] = p),
            (_[24] = m),
            (_[25] = x),
            (_[26] = b),
            (_[27] = f),
            (_[28] = h),
            (_[29] = v),
            (_[30] = y))
          : (y = _[30]),
        _[31] !== u || _[32] !== y
          ? ((g = (0, t.jsx)("div", { className: u, children: y })),
            (_[31] = u),
            (_[32] = y),
            (_[33] = g))
          : (g = _[33]),
        g
      );
    },
  ]);
};
