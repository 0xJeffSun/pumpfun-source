// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(352386);
  e.s([
    "f",
    0,
    (e) => {
      let i,
        r,
        a,
        s,
        o,
        u,
        l,
        c,
        m = (0, t.c)(22),
        { hasMore: d, isLoading: f, onLoadMore: b, rootMargin: p, root: y } = e,
        w = void 0 === p ? "400px 0px" : p;
      m[0] !== d || m[1] !== f || m[2] !== b
        ? ((i = { hasMore: d, isLoading: f, onLoadMore: b }),
          (m[0] = d),
          (m[1] = f),
          (m[2] = b),
          (m[3] = i))
        : (i = m[3]);
      let h = (0, n.useRef)(i);
      (m[4] !== d || m[5] !== f || m[6] !== b
        ? ((r = () => {
            h.current = { hasMore: d, isLoading: f, onLoadMore: b };
          }),
          (m[4] = d),
          (m[5] = f),
          (m[6] = b),
          (m[7] = r))
        : (r = m[7]),
        (0, n.useEffect)(r));
      let g = (0, n.useRef)(null),
        C = (0, n.useRef)(!1),
        A = (0, n.useRef)(null),
        K = (0, n.useRef)(f);
      m[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = () => {
            let e = h.current;
            !e.isLoading && e.hasMore && e.onLoadMore();
          }),
          (m[8] = a))
        : (a = m[8]);
      let x = a;
      return (
        m[9] !== d || m[10] !== y?.current || m[11] !== w
          ? ((s = () => {
              let e = g.current;
              if (!e || !d) return;
              let t = new IntersectionObserver(
                (e) => {
                  let t = e[e.length - 1];
                  t &&
                    ((C.current = t.isIntersecting), t.isIntersecting && x());
                },
                { root: y?.current ?? null, rootMargin: w },
              );
              return (
                t.observe(e),
                () => {
                  (t.disconnect(), (C.current = !1));
                }
              );
            }),
            (m[9] = d),
            (m[10] = y?.current),
            (m[11] = w),
            (m[12] = s))
          : (s = m[12]),
        m[13] !== d || m[14] !== y || m[15] !== w
          ? ((o = [d, x, w, y]),
            (m[13] = d),
            (m[14] = y),
            (m[15] = w),
            (m[16] = o))
          : (o = m[16]),
        (0, n.useEffect)(s, o),
        m[17] !== d || m[18] !== f
          ? ((u = () => {
              let e = K.current;
              K.current = f;
              let t = g.current;
              if (!e && f) {
                A.current = t?.getBoundingClientRect().top ?? null;
                return;
              }
              if (!(e && !f) || !d || !C.current || !t) return;
              let n = A.current,
                i = t.getBoundingClientRect().top;
              (null !== n && 1 > Math.abs(i - n)) || x();
            }),
            (l = [f, d, x]),
            (m[17] = d),
            (m[18] = f),
            (m[19] = u),
            (m[20] = l))
          : ((u = m[19]), (l = m[20])),
        (0, n.useEffect)(u, l),
        m[21] === Symbol.for("react.memo_cache_sentinel")
          ? ((c = { sentinelRef: g, loadMore: x }), (m[21] = c))
          : (c = m[21]),
        c
      );
    },
  ]);
};
