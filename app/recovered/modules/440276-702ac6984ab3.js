// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(292686),
    n = e.i(352386),
    l = e.i(491208),
    i = e.i(239453),
    u = e.i(595673);
  let a = (e) => e.find((e) => e.rec_id)?.rec_id;
  function s(e, t) {
    return { mint: e.mint, isPinned: !1, rank: e.rec_rank ?? t + 1 };
  }
  e.s([
    "f",
    0,
    function (e) {
      let o,
        c,
        f,
        d = (0, t.c)(10),
        { coins: h, window: E, enabled: y, screen: m } = e,
        g = void 0 === E ? l.L : E,
        S = void 0 === y || y,
        p = void 0 === m ? r.Ae.COIN_SCREENERS : m,
        w = (0, n.useRef)(null);
      d[0] !== h || d[1] !== S || d[2] !== g
        ? ((o = S
            ? (function (e, t) {
                if (0 === e.length) return null;
                let r = a(e) ?? "";
                return `${t}|${r}|${e.map((e) => e.mint).join(",")}`;
              })(h, g)
            : null),
          (d[0] = h),
          (d[1] = S),
          (d[2] = g),
          (d[3] = o))
        : (o = d[3]);
      let k = o;
      (d[4] !== h || d[5] !== k || d[6] !== p || d[7] !== g
        ? ((c = () => {
            if (null !== k && k !== w.current) {
              w.current = k;
              try {
                (0, u.kS)({
                  board: "trending",
                  recommendationId: a(h),
                  window: g,
                  scoreVersion: "v1",
                  hotMode: i.D,
                  coins: h.map(s),
                  screen: p,
                  sourceElement: r.k9.TRENDING,
                });
              } catch (e) {
                console.error("Error tracking SeenCoinBoard:", e);
              }
            }
          }),
          (f = [k, h, g, p]),
          (d[4] = h),
          (d[5] = k),
          (d[6] = p),
          (d[7] = g),
          (d[8] = c),
          (d[9] = f))
        : ((c = d[8]), (f = d[9])),
        (0, n.useEffect)(c, f));
    },
  ]);
};
