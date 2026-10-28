// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  e.s([
    "f",
    0,
    (e) => {
      let a,
        l,
        s,
        i,
        n,
        o,
        d,
        u,
        c = (0, t.c)(22),
        { hasMore: f, isLoading: m, onLoadMore: p, rootMargin: h, root: g } = e,
        b = void 0 === h ? "400px 0px" : h;
      c[0] !== f || c[1] !== m || c[2] !== p
        ? ((a = { hasMore: f, isLoading: m, onLoadMore: p }),
          (c[0] = f),
          (c[1] = m),
          (c[2] = p),
          (c[3] = a))
        : (a = c[3]);
      let w = (0, r.useRef)(a);
      (c[4] !== f || c[5] !== m || c[6] !== p
        ? ((l = () => {
            w.current = { hasMore: f, isLoading: m, onLoadMore: p };
          }),
          (c[4] = f),
          (c[5] = m),
          (c[6] = p),
          (c[7] = l))
        : (l = c[7]),
        (0, r.useEffect)(l));
      let y = (0, r.useRef)(null),
        v = (0, r.useRef)(!1),
        x = (0, r.useRef)(null),
        j = (0, r.useRef)(m);
      c[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = () => {
            let e = w.current;
            !e.isLoading && e.hasMore && e.onLoadMore();
          }),
          (c[8] = s))
        : (s = c[8]);
      let _ = s;
      return (
        c[9] !== f || c[10] !== g?.current || c[11] !== b
          ? ((i = () => {
              let e = y.current;
              if (!e || !f) return;
              let t = new IntersectionObserver(
                (e) => {
                  let t = e[e.length - 1];
                  t &&
                    ((v.current = t.isIntersecting), t.isIntersecting && _());
                },
                { root: g?.current ?? null, rootMargin: b },
              );
              return (
                t.observe(e),
                () => {
                  (t.disconnect(), (v.current = !1));
                }
              );
            }),
            (c[9] = f),
            (c[10] = g?.current),
            (c[11] = b),
            (c[12] = i))
          : (i = c[12]),
        c[13] !== f || c[14] !== g || c[15] !== b
          ? ((n = [f, _, b, g]),
            (c[13] = f),
            (c[14] = g),
            (c[15] = b),
            (c[16] = n))
          : (n = c[16]),
        (0, r.useEffect)(i, n),
        c[17] !== f || c[18] !== m
          ? ((o = () => {
              let e = j.current;
              j.current = m;
              let t = y.current;
              if (!e && m) {
                x.current = t?.getBoundingClientRect().top ?? null;
                return;
              }
              if (!(e && !m) || !f || !v.current || !t) return;
              let r = x.current,
                a = t.getBoundingClientRect().top;
              (null !== r && 1 > Math.abs(a - r)) || _();
            }),
            (d = [m, f, _]),
            (c[17] = f),
            (c[18] = m),
            (c[19] = o),
            (c[20] = d))
          : ((o = c[19]), (d = c[20])),
        (0, r.useEffect)(o, d),
        c[21] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { sentinelRef: y, loadMore: _ }), (c[21] = u))
          : (u = c[21]),
        u
      );
    },
  ]);
};
