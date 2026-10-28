// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(745018),
    l = e.i(116549);
  e.i(12641);
  var r = e.i(34011),
    n = e.i(441315),
    o = e.i(338319);
  let s = { terminal: 16, comfortable: 20 },
    d = { terminal: "h-4 min-w-4", comfortable: "h-5 min-w-5" },
    c = [];
  e.s([
    "f",
    0,
    function (e) {
      let u,
        m,
        f,
        p,
        h,
        b,
        y,
        x,
        v,
        g,
        w = (0, i.c)(34),
        {
          count: k,
          onClick: C,
          label: N,
          tail: j,
          avatars: I,
          placement: _,
          className: A,
        } = e,
        U = void 0 === I ? c : I,
        V = void 0 === _ ? "sticky" : _,
        B = (0, l.x)();
      if (k <= 0) return null;
      if (
        w[0] !== U ||
        w[1] !== A ||
        w[2] !== k ||
        w[3] !== B ||
        w[4] !== N ||
        w[5] !== C ||
        w[6] !== V ||
        w[7] !== j
      ) {
        let e = U.slice(0, Math.min(3, k)),
          i = k - e.length,
          l = i > 99 ? "+99" : `+${i}`,
          c = "sticky" === V,
          v = c && "pointer-events-none sticky top-3 z-10 py-1";
        (w[16] !== A || w[17] !== v
          ? ((u = (0, o.c)("flex", v, A)),
            (w[16] = A),
            (w[17] = v),
            (w[18] = u))
          : (u = w[18]),
          (m = "button"),
          (f = C),
          (p = N),
          (h = B),
          w[19] !== B || w[20] !== c
            ? ((b = (0, n.C)({
                density: B,
                variant: "raised",
                interactive: !0,
                className: (0, o.c)(
                  "w-full justify-center gap-1.5",
                  c && "pointer-events-auto",
                ),
              })),
              (w[19] = B),
              (w[20] = c),
              (w[21] = b))
            : (b = w[21]),
          w[22] === Symbol.for("react.memo_cache_sentinel")
            ? ((y = (0, t.jsx)(a.cg, { className: "size-3.5" })), (w[22] = y))
            : (y = w[22]),
          (x =
            e.length > 0
              ? (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsxs)("span", {
                      "aria-hidden": !0,
                      className: "flex items-center",
                      children: [
                        e.map((e, i) =>
                          (0, t.jsx)(
                            r.CoinAvatar,
                            {
                              coin: { mint: e.mint, image_uri: e.imageUrl },
                              size: s[B],
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
                                d[B],
                                e.length > 0 && "-ml-1.5",
                              ),
                              children: l,
                            })
                          : null,
                      ],
                    }),
                    (0, t.jsx)("span", { children: j }),
                  ],
                })
              : N),
          (w[0] = U),
          (w[1] = A),
          (w[2] = k),
          (w[3] = B),
          (w[4] = N),
          (w[5] = C),
          (w[6] = V),
          (w[7] = j),
          (w[8] = u),
          (w[9] = m),
          (w[10] = f),
          (w[11] = p),
          (w[12] = h),
          (w[13] = b),
          (w[14] = y),
          (w[15] = x));
      } else
        ((u = w[8]),
          (m = w[9]),
          (f = w[10]),
          (p = w[11]),
          (h = w[12]),
          (b = w[13]),
          (y = w[14]),
          (x = w[15]));
      return (
        w[23] !== m ||
        w[24] !== f ||
        w[25] !== p ||
        w[26] !== h ||
        w[27] !== b ||
        w[28] !== y ||
        w[29] !== x
          ? ((v = (0, t.jsxs)("button", {
              type: m,
              onClick: f,
              "aria-label": p,
              "data-density": h,
              className: b,
              children: [y, x],
            })),
            (w[23] = m),
            (w[24] = f),
            (w[25] = p),
            (w[26] = h),
            (w[27] = b),
            (w[28] = y),
            (w[29] = x),
            (w[30] = v))
          : (v = w[30]),
        w[31] !== u || w[32] !== v
          ? ((g = (0, t.jsx)("div", { className: u, children: v })),
            (w[31] = u),
            (w[32] = v),
            (w[33] = g))
          : (g = w[33]),
        g
      );
    },
  ]);
};
