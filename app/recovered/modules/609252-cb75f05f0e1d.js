// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(689943),
    l = e.i(369091),
    a = e.i(493025);
  e.s([
    "f",
    0,
    (e) => {
      let i,
        s,
        n,
        o,
        u,
        c,
        d,
        m,
        f,
        p,
        h,
        g,
        x,
        b = (0, t.c)(32);
      b[0] !== e
        ? (({
            mints: i,
            limit: n,
            offset: o,
            sort: u,
            order: c,
            includeNsfw: d,
            disabled: m,
            ...s
          } = e),
          (b[0] = e),
          (b[1] = i),
          (b[2] = s),
          (b[3] = n),
          (b[4] = o),
          (b[5] = u),
          (b[6] = c),
          (b[7] = d),
          (b[8] = m))
        : ((i = b[1]),
          (s = b[2]),
          (n = b[3]),
          (o = b[4]),
          (u = b[5]),
          (c = b[6]),
          (d = b[7]),
          (m = b[8]));
      let w = void 0 === n ? 50 : n,
        y = void 0 === o ? 0 : o,
        v = void 0 === u ? "market_cap" : u,
        E = void 0 === c ? "DESC" : c,
        k = void 0 !== d && d,
        C = void 0 !== m && m,
        { ipfsPrefix: S } = (0, l.useIpfsPrefix)();
      b[9] !== C ||
      b[10] !== k ||
      b[11] !== w ||
      b[12] !== y ||
      b[13] !== E ||
      b[14] !== s ||
      b[15] !== v
        ? ((f = {
            limit: w,
            offset: y,
            sort: v,
            order: E,
            includeNsfw: k,
            disabled: C,
            ...s,
          }),
          (b[9] = C),
          (b[10] = k),
          (b[11] = w),
          (b[12] = y),
          (b[13] = E),
          (b[14] = s),
          (b[15] = v),
          (b[16] = f))
        : (f = b[16]);
      let {
        data: I,
        isLoading: N,
        error: T,
        refetch: A,
        isError: j,
        isLoadingError: P,
      } = (0, r.V)(i, f);
      b[17] !== I
        ? ((p = void 0 === I ? [] : I), (b[17] = I), (b[18] = p))
        : (p = b[18]);
      let _ = p;
      e: {
        let e;
        if (!_.length) {
          let e;
          (b[19] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = []), (b[19] = e))
            : (e = b[19]),
            (h = e));
          break e;
        }
        (b[20] !== S || b[21] !== _
          ? ((e = (0, a.f)(_, S)), (b[20] = S), (b[21] = _), (b[22] = e))
          : (e = b[22]),
          (h = e));
      }
      let U = h;
      b[23] !== T
        ? ((g = T ? (T instanceof Error ? T : Error(String(T))) : null),
          (b[23] = T),
          (b[24] = g))
        : (g = b[24]);
      let M = g;
      return (
        b[25] !== U ||
        b[26] !== M ||
        b[27] !== j ||
        b[28] !== P ||
        b[29] !== N ||
        b[30] !== A
          ? ((x = {
              coins: U,
              loading: N,
              error: M,
              refetch: A,
              isError: j,
              isLoadingError: P,
            }),
            (b[25] = U),
            (b[26] = M),
            (b[27] = j),
            (b[28] = P),
            (b[29] = N),
            (b[30] = A),
            (b[31] = x))
          : (x = b[31]),
        x
      );
    },
  ]);
};
