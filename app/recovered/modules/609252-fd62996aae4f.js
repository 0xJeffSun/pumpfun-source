// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    a = e.i(689943),
    i = e.i(369091),
    n = e.i(493025);
  e.s([
    "f",
    0,
    (e) => {
      let r,
        l,
        s,
        o,
        c,
        d,
        m,
        u,
        h,
        p,
        f,
        x,
        _,
        g = (0, t.c)(32);
      g[0] !== e
        ? (({
            mints: r,
            limit: s,
            offset: o,
            sort: c,
            order: d,
            includeNsfw: m,
            disabled: u,
            ...l
          } = e),
          (g[0] = e),
          (g[1] = r),
          (g[2] = l),
          (g[3] = s),
          (g[4] = o),
          (g[5] = c),
          (g[6] = d),
          (g[7] = m),
          (g[8] = u))
        : ((r = g[1]),
          (l = g[2]),
          (s = g[3]),
          (o = g[4]),
          (c = g[5]),
          (d = g[6]),
          (m = g[7]),
          (u = g[8]));
      let y = void 0 === s ? 50 : s,
        v = void 0 === o ? 0 : o,
        b = void 0 === c ? "market_cap" : c,
        j = void 0 === d ? "DESC" : d,
        k = void 0 !== m && m,
        w = void 0 !== u && u,
        { ipfsPrefix: N } = (0, i.useIpfsPrefix)();
      g[9] !== w ||
      g[10] !== k ||
      g[11] !== y ||
      g[12] !== v ||
      g[13] !== j ||
      g[14] !== l ||
      g[15] !== b
        ? ((h = {
            limit: y,
            offset: v,
            sort: b,
            order: j,
            includeNsfw: k,
            disabled: w,
            ...l,
          }),
          (g[9] = w),
          (g[10] = k),
          (g[11] = y),
          (g[12] = v),
          (g[13] = j),
          (g[14] = l),
          (g[15] = b),
          (g[16] = h))
        : (h = g[16]);
      let {
        data: C,
        isLoading: S,
        error: A,
        refetch: M,
        isError: T,
        isLoadingError: I,
      } = (0, a.V)(r, h);
      g[17] !== C
        ? ((p = void 0 === C ? [] : C), (g[17] = C), (g[18] = p))
        : (p = g[18]);
      let P = p;
      e: {
        let e;
        if (!P.length) {
          let e;
          (g[19] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = []), (g[19] = e))
            : (e = g[19]),
            (f = e));
          break e;
        }
        (g[20] !== N || g[21] !== P
          ? ((e = (0, n.f)(P, N)), (g[20] = N), (g[21] = P), (g[22] = e))
          : (e = g[22]),
          (f = e));
      }
      let z = f;
      g[23] !== A
        ? ((x = A ? (A instanceof Error ? A : Error(String(A))) : null),
          (g[23] = A),
          (g[24] = x))
        : (x = g[24]);
      let D = x;
      return (
        g[25] !== z ||
        g[26] !== D ||
        g[27] !== T ||
        g[28] !== I ||
        g[29] !== S ||
        g[30] !== M
          ? ((_ = {
              coins: z,
              loading: S,
              error: D,
              refetch: M,
              isError: T,
              isLoadingError: I,
            }),
            (g[25] = z),
            (g[26] = D),
            (g[27] = T),
            (g[28] = I),
            (g[29] = S),
            (g[30] = M),
            (g[31] = _))
          : (_ = g[31]),
        _
      );
    },
  ]);
};
