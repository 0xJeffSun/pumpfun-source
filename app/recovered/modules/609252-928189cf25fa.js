// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(689943),
    r = e.i(369091),
    a = e.i(493025);
  e.s([
    "f",
    0,
    (e) => {
      let n,
        l,
        o,
        s,
        c,
        d,
        m,
        x,
        u,
        p,
        b,
        f,
        h,
        g = (0, t.c)(32);
      g[0] !== e
        ? (({
            mints: n,
            limit: o,
            offset: s,
            sort: c,
            order: d,
            includeNsfw: m,
            disabled: x,
            ...l
          } = e),
          (g[0] = e),
          (g[1] = n),
          (g[2] = l),
          (g[3] = o),
          (g[4] = s),
          (g[5] = c),
          (g[6] = d),
          (g[7] = m),
          (g[8] = x))
        : ((n = g[1]),
          (l = g[2]),
          (o = g[3]),
          (s = g[4]),
          (c = g[5]),
          (d = g[6]),
          (m = g[7]),
          (x = g[8]));
      let y = void 0 === o ? 50 : o,
        v = void 0 === s ? 0 : s,
        _ = void 0 === c ? "market_cap" : c,
        w = void 0 === d ? "DESC" : d,
        N = void 0 !== m && m,
        k = void 0 !== x && x,
        { ipfsPrefix: j } = (0, r.useIpfsPrefix)();
      g[9] !== k ||
      g[10] !== N ||
      g[11] !== y ||
      g[12] !== v ||
      g[13] !== w ||
      g[14] !== l ||
      g[15] !== _
        ? ((u = {
            limit: y,
            offset: v,
            sort: _,
            order: w,
            includeNsfw: N,
            disabled: k,
            ...l,
          }),
          (g[9] = k),
          (g[10] = N),
          (g[11] = y),
          (g[12] = v),
          (g[13] = w),
          (g[14] = l),
          (g[15] = _),
          (g[16] = u))
        : (u = g[16]);
      let {
        data: S,
        isLoading: C,
        error: z,
        refetch: $,
        isError: F,
        isLoadingError: E,
      } = (0, i.V)(n, u);
      g[17] !== S
        ? ((p = void 0 === S ? [] : S), (g[17] = S), (g[18] = p))
        : (p = g[18]);
      let P = p;
      e: {
        let e;
        if (!P.length) {
          let e;
          (g[19] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = []), (g[19] = e))
            : (e = g[19]),
            (b = e));
          break e;
        }
        (g[20] !== j || g[21] !== P
          ? ((e = (0, a.f)(P, j)), (g[20] = j), (g[21] = P), (g[22] = e))
          : (e = g[22]),
          (b = e));
      }
      let T = b;
      g[23] !== z
        ? ((f = z ? (z instanceof Error ? z : Error(String(z))) : null),
          (g[23] = z),
          (g[24] = f))
        : (f = g[24]);
      let A = f;
      return (
        g[25] !== T ||
        g[26] !== A ||
        g[27] !== F ||
        g[28] !== E ||
        g[29] !== C ||
        g[30] !== $
          ? ((h = {
              coins: T,
              loading: C,
              error: A,
              refetch: $,
              isError: F,
              isLoadingError: E,
            }),
            (g[25] = T),
            (g[26] = A),
            (g[27] = F),
            (g[28] = E),
            (g[29] = C),
            (g[30] = $),
            (g[31] = h))
          : (h = g[31]),
        h
      );
    },
  ]);
};
