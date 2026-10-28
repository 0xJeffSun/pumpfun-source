// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(689943),
    a = e.i(369091),
    s = e.i(493025);
  e.s([
    "f",
    0,
    (e) => {
      let n,
        l,
        r,
        c,
        o,
        d,
        h,
        x,
        f,
        m,
        u,
        b,
        p,
        _ = (0, t.c)(32);
      _[0] !== e
        ? (({
            mints: n,
            limit: r,
            offset: c,
            sort: o,
            order: d,
            includeNsfw: h,
            disabled: x,
            ...l
          } = e),
          (_[0] = e),
          (_[1] = n),
          (_[2] = l),
          (_[3] = r),
          (_[4] = c),
          (_[5] = o),
          (_[6] = d),
          (_[7] = h),
          (_[8] = x))
        : ((n = _[1]),
          (l = _[2]),
          (r = _[3]),
          (c = _[4]),
          (o = _[5]),
          (d = _[6]),
          (h = _[7]),
          (x = _[8]));
      let g = void 0 === r ? 50 : r,
        y = void 0 === c ? 0 : c,
        v = void 0 === o ? "market_cap" : o,
        j = void 0 === d ? "DESC" : d,
        k = void 0 !== h && h,
        w = void 0 !== x && x,
        { ipfsPrefix: N } = (0, a.useIpfsPrefix)();
      _[9] !== w ||
      _[10] !== k ||
      _[11] !== g ||
      _[12] !== y ||
      _[13] !== j ||
      _[14] !== l ||
      _[15] !== v
        ? ((f = {
            limit: g,
            offset: y,
            sort: v,
            order: j,
            includeNsfw: k,
            disabled: w,
            ...l,
          }),
          (_[9] = w),
          (_[10] = k),
          (_[11] = g),
          (_[12] = y),
          (_[13] = j),
          (_[14] = l),
          (_[15] = v),
          (_[16] = f))
        : (f = _[16]);
      let {
        data: C,
        isLoading: A,
        error: F,
        refetch: E,
        isError: S,
        isLoadingError: I,
      } = (0, i.V)(n, f);
      _[17] !== C
        ? ((m = void 0 === C ? [] : C), (_[17] = C), (_[18] = m))
        : (m = _[18]);
      let B = m;
      e: {
        let e;
        if (!B.length) {
          let e;
          (_[19] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = []), (_[19] = e))
            : (e = _[19]),
            (u = e));
          break e;
        }
        (_[20] !== N || _[21] !== B
          ? ((e = (0, s.f)(B, N)), (_[20] = N), (_[21] = B), (_[22] = e))
          : (e = _[22]),
          (u = e));
      }
      let D = u;
      _[23] !== F
        ? ((b = F ? (F instanceof Error ? F : Error(String(F))) : null),
          (_[23] = F),
          (_[24] = b))
        : (b = _[24]);
      let M = b;
      return (
        _[25] !== D ||
        _[26] !== M ||
        _[27] !== S ||
        _[28] !== I ||
        _[29] !== A ||
        _[30] !== E
          ? ((p = {
              coins: D,
              loading: A,
              error: M,
              refetch: E,
              isError: S,
              isLoadingError: I,
            }),
            (_[25] = D),
            (_[26] = M),
            (_[27] = S),
            (_[28] = I),
            (_[29] = A),
            (_[30] = E),
            (_[31] = p))
          : (p = _[31]),
        p
      );
    },
  ]);
};
