// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(574472);
  e.i(12692);
  var a = e.i(398902),
    i = e.i(66397),
    n = e.i(996005),
    s = e.i(66819),
    o = e.i(616217),
    d = e.i(303599),
    c = e.i(633216),
    u = e.i(762316),
    m = e.i(338319);
  let f = [
      { value: "pnl", labelKey: "web.leaderboard.top_traders" },
      { value: "earners", labelKey: "web.leaderboard.top_rewards" },
    ],
    p = f.map((e) => e.value);
  e.s([
    "f",
    0,
    (e) => {
      let h,
        v,
        b,
        g,
        y,
        x,
        w = (0, r.c)(24);
      w[0] !== e
        ? ((h = void 0 === e ? {} : e), (w[0] = e), (w[1] = h))
        : (h = w[1]);
      let { variant: _ } = h,
        A = void 0 === _ ? "home" : _,
        { t: j } = (0, a.f)(),
        I = "profile" === A,
        [U, S] = (0, o.f)(u.b.leaderboardTab, p, "pnl"),
        { address: N } = (0, l.F)(),
        C = (0, d.o)();
      w[2] !== j
        ? ((v = j("web.leaderboard.heading")), (w[2] = j), (w[3] = v))
        : (v = w[3]);
      let k = I ? "profile" : void 0;
      (w[4] !== I || w[5] !== S || w[6] !== j || w[7] !== U
        ? ((b = I
            ? (0, t.jsx)(s.p, {
                density: "comfortable",
                value: U,
                onValueChange: (e) => {
                  let t = p.find((t) => t === e);
                  t && S(t);
                },
                "aria-label": j("web.leaderboard.tabs"),
                tabs: f.map((e) => ({ value: e.value, label: j(e.labelKey) })),
              })
            : (0, t.jsx)("header", {
                className: "flex min-h-[60px] items-center pb-2 pt-4",
                children: (0, t.jsx)("div", {
                  role: "tablist",
                  "aria-label": j("web.leaderboard.tabs"),
                  className: "flex flex-wrap items-center gap-x-5 gap-y-1",
                  children: f.map((e) => {
                    let r = U === e.value;
                    return (0, t.jsx)(
                      "button",
                      {
                        type: "button",
                        role: "tab",
                        "aria-selected": r,
                        onClick: () => S(e.value),
                        className: (0, m.c)(
                          "text-left text-xl font-bold leading-6 tracking-[-0.2px] transition-colors [overflow-wrap:anywhere]",
                          r
                            ? "text-text-primary"
                            : "text-text-tertiary hover:text-text-primary",
                        ),
                        children: j(e.labelKey),
                      },
                      e.value,
                    );
                  }),
                }),
              })),
          (w[4] = I),
          (w[5] = S),
          (w[6] = j),
          (w[7] = U),
          (w[8] = b))
        : (b = w[8]),
        w[9] !== N || w[10] !== U || w[11] !== C
          ? ((g =
              "earners" === U
                ? (0, t.jsx)(i.f, {
                    viewerAddress: N,
                    viewerFollowing: C,
                    refetchIntervalMs: c.f,
                  })
                : null),
            (w[9] = N),
            (w[10] = U),
            (w[11] = C),
            (w[12] = g))
          : (g = w[12]));
      let E = "pnl" === U;
      return (
        w[13] !== N || w[14] !== E || w[15] !== A || w[16] !== C
          ? ((y = (0, t.jsx)(n.f, {
              enabled: E,
              viewerAddress: N,
              viewerFollowing: C,
              refetchIntervalMs: c.f,
              variant: A,
            })),
            (w[13] = N),
            (w[14] = E),
            (w[15] = A),
            (w[16] = C),
            (w[17] = y))
          : (y = w[17]),
        w[18] !== v || w[19] !== k || w[20] !== b || w[21] !== g || w[22] !== y
          ? ((x = (0, t.jsxs)("section", {
              "aria-label": v,
              className: "flex flex-col",
              "data-testid": "home-pnl-leaderboard",
              "data-variant": k,
              children: [b, g, y],
            })),
            (w[18] = v),
            (w[19] = k),
            (w[20] = b),
            (w[21] = g),
            (w[22] = y),
            (w[23] = x))
          : (x = w[23]),
        x
      );
    },
  ]);
};
