// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    s = e.i(352386);
  e.s([
    "f",
    0,
    (e) => {
      let r,
        n,
        i,
        l,
        o,
        a,
        u,
        d,
        c = (0, t.c)(22),
        { hasMore: f, isLoading: m, onLoadMore: b, rootMargin: g, root: p } = e,
        h = void 0 === g ? "400px 0px" : g;
      c[0] !== f || c[1] !== m || c[2] !== b
        ? ((r = { hasMore: f, isLoading: m, onLoadMore: b }),
          (c[0] = f),
          (c[1] = m),
          (c[2] = b),
          (c[3] = r))
        : (r = c[3]);
      let x = (0, s.useRef)(r);
      (c[4] !== f || c[5] !== m || c[6] !== b
        ? ((n = () => {
            x.current = { hasMore: f, isLoading: m, onLoadMore: b };
          }),
          (c[4] = f),
          (c[5] = m),
          (c[6] = b),
          (c[7] = n))
        : (n = c[7]),
        (0, s.useEffect)(n));
      let y = (0, s.useRef)(null),
        w = (0, s.useRef)(!1),
        _ = (0, s.useRef)(null),
        v = (0, s.useRef)(m);
      c[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = () => {
            let e = x.current;
            !e.isLoading && e.hasMore && e.onLoadMore();
          }),
          (c[8] = i))
        : (i = c[8]);
      let T = i;
      return (
        c[9] !== f || c[10] !== p?.current || c[11] !== h
          ? ((l = () => {
              let e = y.current;
              if (!e || !f) return;
              let t = new IntersectionObserver(
                (e) => {
                  let t = e[e.length - 1];
                  t &&
                    ((w.current = t.isIntersecting), t.isIntersecting && T());
                },
                { root: p?.current ?? null, rootMargin: h },
              );
              return (
                t.observe(e),
                () => {
                  (t.disconnect(), (w.current = !1));
                }
              );
            }),
            (c[9] = f),
            (c[10] = p?.current),
            (c[11] = h),
            (c[12] = l))
          : (l = c[12]),
        c[13] !== f || c[14] !== p || c[15] !== h
          ? ((o = [f, T, h, p]),
            (c[13] = f),
            (c[14] = p),
            (c[15] = h),
            (c[16] = o))
          : (o = c[16]),
        (0, s.useEffect)(l, o),
        c[17] !== f || c[18] !== m
          ? ((a = () => {
              let e = v.current;
              v.current = m;
              let t = y.current;
              if (!e && m) {
                _.current = t?.getBoundingClientRect().top ?? null;
                return;
              }
              if (!(e && !m) || !f || !w.current || !t) return;
              let s = _.current,
                r = t.getBoundingClientRect().top;
              (null !== s && 1 > Math.abs(r - s)) || T();
            }),
            (u = [m, f, T]),
            (c[17] = f),
            (c[18] = m),
            (c[19] = a),
            (c[20] = u))
          : ((a = c[19]), (u = c[20])),
        (0, s.useEffect)(a, u),
        c[21] === Symbol.for("react.memo_cache_sentinel")
          ? ((d = { sentinelRef: y, loadMore: T }), (c[21] = d))
          : (d = c[21]),
        d
      );
    },
  ]);
};
