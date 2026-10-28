// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    s = e.i(745018),
    n = e.i(116549);
  e.i(12641);
  var l = e.i(34011),
    r = e.i(441315),
    o = e.i(338319);
  let a = { terminal: 16, comfortable: 20 },
    c = { terminal: "h-4 min-w-4", comfortable: "h-5 min-w-5" },
    d = [];
  e.s([
    "f",
    0,
    function (e) {
      let h,
        u,
        m,
        f,
        p,
        g,
        x,
        b,
        v,
        y,
        w = (0, i.c)(34),
        {
          count: C,
          onClick: j,
          label: S,
          tail: z,
          avatars: k,
          placement: M,
          className: E,
        } = e,
        N = void 0 === k ? d : k,
        I = void 0 === M ? "sticky" : M,
        O = (0, n.x)();
      if (C <= 0) return null;
      if (
        w[0] !== N ||
        w[1] !== E ||
        w[2] !== C ||
        w[3] !== O ||
        w[4] !== S ||
        w[5] !== j ||
        w[6] !== I ||
        w[7] !== z
      ) {
        let e = N.slice(0, Math.min(3, C)),
          i = C - e.length,
          n = i > 99 ? "+99" : `+${i}`,
          d = "sticky" === I,
          v = d && "pointer-events-none sticky top-3 z-10 py-1";
        (w[16] !== E || w[17] !== v
          ? ((h = (0, o.c)("flex", v, E)),
            (w[16] = E),
            (w[17] = v),
            (w[18] = h))
          : (h = w[18]),
          (u = "button"),
          (m = j),
          (f = S),
          (p = O),
          w[19] !== O || w[20] !== d
            ? ((g = (0, r.C)({
                density: O,
                variant: "raised",
                interactive: !0,
                className: (0, o.c)(
                  "w-full justify-center gap-1.5",
                  d && "pointer-events-auto",
                ),
              })),
              (w[19] = O),
              (w[20] = d),
              (w[21] = g))
            : (g = w[21]),
          w[22] === Symbol.for("react.memo_cache_sentinel")
            ? ((x = (0, t.jsx)(s.cg, { className: "size-3.5" })), (w[22] = x))
            : (x = w[22]),
          (b =
            e.length > 0
              ? (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsxs)("span", {
                      "aria-hidden": !0,
                      className: "flex items-center",
                      children: [
                        e.map((e, i) =>
                          (0, t.jsx)(
                            l.CoinAvatar,
                            {
                              coin: { mint: e.mint, image_uri: e.imageUrl },
                              size: a[O],
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
                                c[O],
                                e.length > 0 && "-ml-1.5",
                              ),
                              children: n,
                            })
                          : null,
                      ],
                    }),
                    (0, t.jsx)("span", { children: z }),
                  ],
                })
              : S),
          (w[0] = N),
          (w[1] = E),
          (w[2] = C),
          (w[3] = O),
          (w[4] = S),
          (w[5] = j),
          (w[6] = I),
          (w[7] = z),
          (w[8] = h),
          (w[9] = u),
          (w[10] = m),
          (w[11] = f),
          (w[12] = p),
          (w[13] = g),
          (w[14] = x),
          (w[15] = b));
      } else
        ((h = w[8]),
          (u = w[9]),
          (m = w[10]),
          (f = w[11]),
          (p = w[12]),
          (g = w[13]),
          (x = w[14]),
          (b = w[15]));
      return (
        w[23] !== u ||
        w[24] !== m ||
        w[25] !== f ||
        w[26] !== p ||
        w[27] !== g ||
        w[28] !== x ||
        w[29] !== b
          ? ((v = (0, t.jsxs)("button", {
              type: u,
              onClick: m,
              "aria-label": f,
              "data-density": p,
              className: g,
              children: [x, b],
            })),
            (w[23] = u),
            (w[24] = m),
            (w[25] = f),
            (w[26] = p),
            (w[27] = g),
            (w[28] = x),
            (w[29] = b),
            (w[30] = v))
          : (v = w[30]),
        w[31] !== h || w[32] !== v
          ? ((y = (0, t.jsx)("div", { className: h, children: v })),
            (w[31] = h),
            (w[32] = v),
            (w[33] = y))
          : (y = w[33]),
        y
      );
    },
  ]);
};
