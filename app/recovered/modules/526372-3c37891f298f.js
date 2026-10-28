// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(352386);
  e.s([
    "f",
    0,
    (e) => {
      let l,
        r,
        a,
        n,
        o,
        s,
        d,
        u,
        c = (0, t.c)(22),
        { hasMore: m, isLoading: p, onLoadMore: f, rootMargin: I, root: h } = e,
        y = void 0 === I ? "400px 0px" : I;
      c[0] !== m || c[1] !== p || c[2] !== f
        ? ((l = { hasMore: m, isLoading: p, onLoadMore: f }),
          (c[0] = m),
          (c[1] = p),
          (c[2] = f),
          (c[3] = l))
        : (l = c[3]);
      let g = (0, i.useRef)(l);
      (c[4] !== m || c[5] !== p || c[6] !== f
        ? ((r = () => {
            g.current = { hasMore: m, isLoading: p, onLoadMore: f };
          }),
          (c[4] = m),
          (c[5] = p),
          (c[6] = f),
          (c[7] = r))
        : (r = c[7]),
        (0, i.useEffect)(r));
      let x = (0, i.useRef)(null),
        v = (0, i.useRef)(!1),
        b = (0, i.useRef)(null),
        C = (0, i.useRef)(p);
      c[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = () => {
            let e = g.current;
            !e.isLoading && e.hasMore && e.onLoadMore();
          }),
          (c[8] = a))
        : (a = c[8]);
      let w = a;
      return (
        c[9] !== m || c[10] !== h?.current || c[11] !== y
          ? ((n = () => {
              let e = x.current;
              if (!e || !m) return;
              let t = new IntersectionObserver(
                (e) => {
                  let t = e[e.length - 1];
                  t &&
                    ((v.current = t.isIntersecting), t.isIntersecting && w());
                },
                { root: h?.current ?? null, rootMargin: y },
              );
              return (
                t.observe(e),
                () => {
                  (t.disconnect(), (v.current = !1));
                }
              );
            }),
            (c[9] = m),
            (c[10] = h?.current),
            (c[11] = y),
            (c[12] = n))
          : (n = c[12]),
        c[13] !== m || c[14] !== h || c[15] !== y
          ? ((o = [m, w, y, h]),
            (c[13] = m),
            (c[14] = h),
            (c[15] = y),
            (c[16] = o))
          : (o = c[16]),
        (0, i.useEffect)(n, o),
        c[17] !== m || c[18] !== p
          ? ((s = () => {
              let e = C.current;
              C.current = p;
              let t = x.current;
              if (!e && p) {
                b.current = t?.getBoundingClientRect().top ?? null;
                return;
              }
              if (!(e && !p) || !m || !v.current || !t) return;
              let i = b.current,
                l = t.getBoundingClientRect().top;
              (null !== i && 1 > Math.abs(l - i)) || w();
            }),
            (d = [p, m, w]),
            (c[17] = m),
            (c[18] = p),
            (c[19] = s),
            (c[20] = d))
          : ((s = c[19]), (d = c[20])),
        (0, i.useEffect)(s, d),
        c[21] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { sentinelRef: x, loadMore: w }), (c[21] = u))
          : (u = c[21]),
        u
      );
    },
  ]);
};
