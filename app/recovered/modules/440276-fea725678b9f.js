// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(292686),
    l = e.i(352386),
    r = e.i(491208),
    a = e.i(239453),
    o = e.i(595673);
  let n = (e) => e.find((e) => e.rec_id)?.rec_id;
  function s(e, t) {
    return { mint: e.mint, isPinned: !1, rank: e.rec_rank ?? t + 1 };
  }
  e.s([
    "f",
    0,
    function (e) {
      let d,
        c,
        u,
        m = (0, t.c)(10),
        { coins: p, window: f, enabled: h, screen: I } = e,
        x = void 0 === f ? r.L : f,
        y = void 0 === h || h,
        b = void 0 === I ? i.Ae.COIN_SCREENERS : I,
        g = (0, l.useRef)(null);
      m[0] !== p || m[1] !== y || m[2] !== x
        ? ((d = y
            ? (function (e, t) {
                if (0 === e.length) return null;
                let i = n(e) ?? "";
                return `${t}|${i}|${e.map((e) => e.mint).join(",")}`;
              })(p, x)
            : null),
          (m[0] = p),
          (m[1] = y),
          (m[2] = x),
          (m[3] = d))
        : (d = m[3]);
      let v = d;
      (m[4] !== p || m[5] !== v || m[6] !== b || m[7] !== x
        ? ((c = () => {
            if (null !== v && v !== g.current) {
              g.current = v;
              try {
                (0, o.kS)({
                  board: "trending",
                  recommendationId: n(p),
                  window: x,
                  scoreVersion: "v1",
                  hotMode: a.D,
                  coins: p.map(s),
                  screen: b,
                  sourceElement: i.k9.TRENDING,
                });
              } catch (e) {
                console.error("Error tracking SeenCoinBoard:", e);
              }
            }
          }),
          (u = [v, p, x, b]),
          (m[4] = p),
          (m[5] = v),
          (m[6] = b),
          (m[7] = x),
          (m[8] = c),
          (m[9] = u))
        : ((c = m[8]), (u = m[9])),
        (0, l.useEffect)(c, u));
    },
  ]);
};
