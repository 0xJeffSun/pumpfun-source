// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var a = e.i(445242),
    t = e.i(352386);
  e.s([
    "f",
    0,
    (e) => {
      let r,
        s,
        l,
        i,
        n,
        o,
        d,
        u,
        c = (0, a.c)(22),
        { hasMore: m, isLoading: f, onLoadMore: p, rootMargin: h, root: g } = e,
        x = void 0 === h ? "400px 0px" : h;
      c[0] !== m || c[1] !== f || c[2] !== p
        ? ((r = { hasMore: m, isLoading: f, onLoadMore: p }),
          (c[0] = m),
          (c[1] = f),
          (c[2] = p),
          (c[3] = r))
        : (r = c[3]);
      let v = (0, t.useRef)(r);
      (c[4] !== m || c[5] !== f || c[6] !== p
        ? ((s = () => {
            v.current = { hasMore: m, isLoading: f, onLoadMore: p };
          }),
          (c[4] = m),
          (c[5] = f),
          (c[6] = p),
          (c[7] = s))
        : (s = c[7]),
        (0, t.useEffect)(s));
      let w = (0, t.useRef)(null),
        y = (0, t.useRef)(!1),
        b = (0, t.useRef)(null),
        j = (0, t.useRef)(f);
      c[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = () => {
            let e = v.current;
            !e.isLoading && e.hasMore && e.onLoadMore();
          }),
          (c[8] = l))
        : (l = c[8]);
      let N = l;
      return (
        c[9] !== m || c[10] !== g?.current || c[11] !== x
          ? ((i = () => {
              let e = w.current;
              if (!e || !m) return;
              let a = new IntersectionObserver(
                (e) => {
                  let a = e[e.length - 1];
                  a &&
                    ((y.current = a.isIntersecting), a.isIntersecting && N());
                },
                { root: g?.current ?? null, rootMargin: x },
              );
              return (
                a.observe(e),
                () => {
                  (a.disconnect(), (y.current = !1));
                }
              );
            }),
            (c[9] = m),
            (c[10] = g?.current),
            (c[11] = x),
            (c[12] = i))
          : (i = c[12]),
        c[13] !== m || c[14] !== g || c[15] !== x
          ? ((n = [m, N, x, g]),
            (c[13] = m),
            (c[14] = g),
            (c[15] = x),
            (c[16] = n))
          : (n = c[16]),
        (0, t.useEffect)(i, n),
        c[17] !== m || c[18] !== f
          ? ((o = () => {
              let e = j.current;
              j.current = f;
              let a = w.current;
              if (!e && f) {
                b.current = a?.getBoundingClientRect().top ?? null;
                return;
              }
              if (!(e && !f) || !m || !y.current || !a) return;
              let t = b.current,
                r = a.getBoundingClientRect().top;
              (null !== t && 1 > Math.abs(r - t)) || N();
            }),
            (d = [f, m, N]),
            (c[17] = m),
            (c[18] = f),
            (c[19] = o),
            (c[20] = d))
          : ((o = c[19]), (d = c[20])),
        (0, t.useEffect)(o, d),
        c[21] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { sentinelRef: w, loadMore: N }), (c[21] = u))
          : (u = c[21]),
        u
      );
    },
  ]);
};
