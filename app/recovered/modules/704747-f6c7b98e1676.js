// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.useFeedBump = function (e) {
      var t, r;
      let n,
        {
          items: i,
          setItems: s,
          sort: o,
          showAnimations: c,
          areAnimationsPaused: d,
          isTrending: u = (e) => !0 === e.isTrending,
          isGraduated: m = (e) => !0 === e.isGraduated,
          animationTriggerSort: f = "featured",
        } = e,
        [h, p] = (0, l.useState)(null),
        [x, b] = (0, l.useState)(new Set()),
        {
          trendingItems: g,
          nonTrendingItems: v,
          graduatedItems: y,
          customItems: w,
        } = (0, l.useMemo)(() => {
          let e = i.filter(u),
            t = i.filter((e) => !u(e)),
            r = t.filter(m),
            l = t.filter((e) => !m(e));
          return {
            trendingItems: e,
            nonTrendingItems: t,
            graduatedItems: r,
            customItems: l,
          };
        }, [i, u, m]),
        j = (0, l.useMemo)(
          () =>
            (0, a.createItemWeightMapping)(i, (e) =>
              (0, a.smoothCurveWeightCalculator)(e),
            ),
          [i],
        ),
        _ = (0, l.useCallback)(
          (e) => {
            e &&
              (s((t) => {
                let r = t.findIndex((t) => t.id === e.id);
                if (-1 === r) return t;
                let l = [...t];
                return (l.splice(r, 1), [e, ...l]);
              }),
              p(e.id),
              b(
                (t) =>
                  new Set(
                    Array.from(new Set([e.id, ...Array.from(t)])).slice(0, 5),
                  ),
              ),
              setTimeout(() => p(null), 300));
          },
          [s],
        ),
        C = (0, l.useCallback)(() => {
          let e,
            t = Math.random() < (w.length > 5 ? 0.85 : 0.9),
            r = g.length > 0,
            l = v.length > 0,
            n = new Set(i.filter((e) => x.has(e.id)));
          if (t && r) e = (0, a.selectRandomItemByWeight)(g, j, n);
          else if (!t && l) {
            let t = 0.25;
            (w.length <= 2 ? (t = 0.66) : w.length <= 5 && (t = 0.5),
              (e =
                y.length > 0 && Math.random() < t
                  ? (0, a.selectRandomItemByWeight)(y, j, n)
                  : (0, a.selectRandomItemByWeight)(w, j, n)));
          }
          e && _(e);
        }, [i, w, g, v, y, j, x, _]);
      return (
        (t = () => {
          o === f && c && !d && i.length > 0 && C();
        }),
        (r = c
          ? (function (e = 1e3, t = 500) {
              return Math.max(300, e + t * (Math.random() - 0.5) * 2);
            })(300, 150)
          : 300),
        (n = (0, l.useRef)(null)),
        (0, l.useEffect)(() => {
          n.current = t;
        }, [t]),
        (0, l.useEffect)(() => {
          if (null !== r) {
            let e = setInterval(function () {
              n.current && n.current();
            }, r);
            return () => clearInterval(e);
          }
        }, [r]),
        h
      );
    }));
  let l = e.r(352386),
    a = e.r(357103);
};
