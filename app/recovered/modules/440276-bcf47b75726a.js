// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(292686),
    l = e.i(352386),
    n = e.i(491208),
    i = e.i(239453),
    s = e.i(595673);
  let a = (e) => e.find((e) => e.rec_id)?.rec_id;
  function o(e, t) {
    return { mint: e.mint, isPinned: !1, rank: e.rec_rank ?? t + 1 };
  }
  e.s([
    "f",
    0,
    function (e) {
      let u,
        c,
        f,
        d = (0, t.c)(10),
        { coins: E, window: h, enabled: m, screen: y } = e,
        p = void 0 === h ? n.L : h,
        S = void 0 === m || m,
        w = void 0 === y ? r.Ae.COIN_SCREENERS : y,
        g = (0, l.useRef)(null);
      d[0] !== E || d[1] !== S || d[2] !== p
        ? ((u = S
            ? (function (e, t) {
                if (0 === e.length) return null;
                let r = a(e) ?? "";
                return `${t}|${r}|${e.map((e) => e.mint).join(",")}`;
              })(E, p)
            : null),
          (d[0] = E),
          (d[1] = S),
          (d[2] = p),
          (d[3] = u))
        : (u = d[3]);
      let k = u;
      (d[4] !== E || d[5] !== k || d[6] !== w || d[7] !== p
        ? ((c = () => {
            if (null !== k && k !== g.current) {
              g.current = k;
              try {
                (0, s.kS)({
                  board: "trending",
                  recommendationId: a(E),
                  window: p,
                  scoreVersion: "v1",
                  hotMode: i.D,
                  coins: E.map(o),
                  screen: w,
                  sourceElement: r.k9.TRENDING,
                });
              } catch (e) {
                console.error("Error tracking SeenCoinBoard:", e);
              }
            }
          }),
          (f = [k, E, p, w]),
          (d[4] = E),
          (d[5] = k),
          (d[6] = w),
          (d[7] = p),
          (d[8] = c),
          (d[9] = f))
        : ((c = d[8]), (f = d[9])),
        (0, l.useEffect)(c, f));
    },
  ]);
};
