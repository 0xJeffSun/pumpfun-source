// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.useFeedShuffle = function (e) {
      let {
          items: t,
          setItems: r,
          sort: n,
          showAnimations: i,
          isTrending: s = (e) => !0 === e.isTrending,
          isGraduated: o = (e) => !0 === e.isGraduated,
          getWeight: c = (e) => e.weight || 1,
          shuffleTriggerSort: d = "featured",
        } = e,
        [u, m] = (0, l.useState)([]),
        {
          trendingItems: f,
          nonTrendingItems: h,
          graduatedItems: p,
          customItems: x,
        } = (0, l.useMemo)(() => {
          let e = t.filter(s),
            r = t.filter((e) => !s(e)),
            l = r.filter(o),
            a = r.filter((e) => !o(e));
          return {
            trendingItems: e,
            nonTrendingItems: r,
            graduatedItems: l,
            customItems: a,
          };
        }, [t, s, o]),
        b = (0, l.useMemo)(
          () =>
            (0, a.createItemWeightMapping)(t, (e) =>
              (0, a.smoothCurveWeightCalculator)(e),
            ),
          [t],
        ),
        g = (0, l.useCallback)(() => {
          r((e) => {
            let t = 0,
              r = 2 * e.length,
              l = [],
              n = new Set(),
              i = Math.random() < (x.length > 5 ? 0.85 : 0.9),
              s = f.length > 0,
              o = h.length > 0,
              c = (e) => {
                n.has(e) || (l.push(e), n.add(e));
              };
            for (; l.length < e.length && t < r; ) {
              if (i && s) {
                let e = (0, a.selectRandomItemByWeight)(f, b, n);
                e && c(e);
              } else if (!i && o) {
                let e = 0.25;
                x.length <= 2 ? (e = 0.66) : x.length <= 5 && (e = 0.5);
                let t =
                  Math.random() < e && p.length > 0
                    ? (0, a.selectRandomItemByWeight)(p, b, n)
                    : (0, a.selectRandomItemByWeight)(x, b, n);
                t && c(t);
              } else break;
              t++;
            }
            return (n.size < e.length &&
              e.forEach((e) => {
                n.has(e) || (l.push(e), n.add(e));
              }),
            0 === l.length && e.length > 0)
              ? (console.warn(
                  "Shuffle produced empty array - falling back to current items",
                ),
                m(e),
                e)
              : (m(l), l);
          });
        }, [r, x, f, h.length, b, p]);
      return (
        (0, l.useEffect)(() => {
          n === d && !i && t.length > 0 && t !== u && g();
        }, [n, t, i, d, u, g]),
        u
      );
    }));
  let l = e.r(352386),
    a = e.r(357103);
};
