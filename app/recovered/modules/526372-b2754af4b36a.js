// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  e.s([
    "f",
    0,
    (e) => {
      let n,
        s,
        i,
        l,
        a,
        o,
        c,
        u,
        d = (0, t.c)(22),
        { hasMore: f, isLoading: x, onLoadMore: b, rootMargin: m, root: g } = e,
        p = void 0 === m ? "400px 0px" : m;
      d[0] !== f || d[1] !== x || d[2] !== b
        ? ((n = { hasMore: f, isLoading: x, onLoadMore: b }),
          (d[0] = f),
          (d[1] = x),
          (d[2] = b),
          (d[3] = n))
        : (n = d[3]);
      let h = (0, r.useRef)(n);
      (d[4] !== f || d[5] !== x || d[6] !== b
        ? ((s = () => {
            h.current = { hasMore: f, isLoading: x, onLoadMore: b };
          }),
          (d[4] = f),
          (d[5] = x),
          (d[6] = b),
          (d[7] = s))
        : (s = d[7]),
        (0, r.useEffect)(s));
      let v = (0, r.useRef)(null),
        w = (0, r.useRef)(!1),
        _ = (0, r.useRef)(null),
        y = (0, r.useRef)(x);
      d[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = () => {
            let e = h.current;
            !e.isLoading && e.hasMore && e.onLoadMore();
          }),
          (d[8] = i))
        : (i = d[8]);
      let j = i;
      return (
        d[9] !== f || d[10] !== g?.current || d[11] !== p
          ? ((l = () => {
              let e = v.current;
              if (!e || !f) return;
              let t = new IntersectionObserver(
                (e) => {
                  let t = e[e.length - 1];
                  t &&
                    ((w.current = t.isIntersecting), t.isIntersecting && j());
                },
                { root: g?.current ?? null, rootMargin: p },
              );
              return (
                t.observe(e),
                () => {
                  (t.disconnect(), (w.current = !1));
                }
              );
            }),
            (d[9] = f),
            (d[10] = g?.current),
            (d[11] = p),
            (d[12] = l))
          : (l = d[12]),
        d[13] !== f || d[14] !== g || d[15] !== p
          ? ((a = [f, j, p, g]),
            (d[13] = f),
            (d[14] = g),
            (d[15] = p),
            (d[16] = a))
          : (a = d[16]),
        (0, r.useEffect)(l, a),
        d[17] !== f || d[18] !== x
          ? ((o = () => {
              let e = y.current;
              y.current = x;
              let t = v.current;
              if (!e && x) {
                _.current = t?.getBoundingClientRect().top ?? null;
                return;
              }
              if (!(e && !x) || !f || !w.current || !t) return;
              let r = _.current,
                n = t.getBoundingClientRect().top;
              (null !== r && 1 > Math.abs(n - r)) || j();
            }),
            (c = [x, f, j]),
            (d[17] = f),
            (d[18] = x),
            (d[19] = o),
            (d[20] = c))
          : ((o = d[19]), (c = d[20])),
        (0, r.useEffect)(o, c),
        d[21] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { sentinelRef: v, loadMore: j }), (d[21] = u))
          : (u = d[21]),
        u
      );
    },
  ]);
};
