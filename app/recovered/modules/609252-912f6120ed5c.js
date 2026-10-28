// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(689943),
    a = e.i(369091),
    i = e.i(493025);
  e.s([
    "f",
    0,
    (e) => {
      let s,
        l,
        o,
        n,
        d,
        u,
        c,
        f,
        m,
        p,
        v,
        h,
        y,
        x = (0, t.c)(32);
      x[0] !== e
        ? (({
            mints: s,
            limit: o,
            offset: n,
            sort: d,
            order: u,
            includeNsfw: c,
            disabled: f,
            ...l
          } = e),
          (x[0] = e),
          (x[1] = s),
          (x[2] = l),
          (x[3] = o),
          (x[4] = n),
          (x[5] = d),
          (x[6] = u),
          (x[7] = c),
          (x[8] = f))
        : ((s = x[1]),
          (l = x[2]),
          (o = x[3]),
          (n = x[4]),
          (d = x[5]),
          (u = x[6]),
          (c = x[7]),
          (f = x[8]));
      let g = void 0 === o ? 50 : o,
        w = void 0 === n ? 0 : n,
        b = void 0 === d ? "market_cap" : d,
        N = void 0 === u ? "DESC" : u,
        j = void 0 !== c && c,
        R = void 0 !== f && f,
        { ipfsPrefix: S } = (0, a.useIpfsPrefix)();
      x[9] !== R ||
      x[10] !== j ||
      x[11] !== g ||
      x[12] !== w ||
      x[13] !== N ||
      x[14] !== l ||
      x[15] !== b
        ? ((m = {
            limit: g,
            offset: w,
            sort: b,
            order: N,
            includeNsfw: j,
            disabled: R,
            ...l,
          }),
          (x[9] = R),
          (x[10] = j),
          (x[11] = g),
          (x[12] = w),
          (x[13] = N),
          (x[14] = l),
          (x[15] = b),
          (x[16] = m))
        : (m = x[16]);
      let {
        data: C,
        isLoading: A,
        error: F,
        refetch: _,
        isError: k,
        isLoadingError: M,
      } = (0, r.V)(s, m);
      x[17] !== C
        ? ((p = void 0 === C ? [] : C), (x[17] = C), (x[18] = p))
        : (p = x[18]);
      let T = p;
      e: {
        let e;
        if (!T.length) {
          let e;
          (x[19] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = []), (x[19] = e))
            : (e = x[19]),
            (v = e));
          break e;
        }
        (x[20] !== S || x[21] !== T
          ? ((e = (0, i.f)(T, S)), (x[20] = S), (x[21] = T), (x[22] = e))
          : (e = x[22]),
          (v = e));
      }
      let E = v;
      x[23] !== F
        ? ((h = F ? (F instanceof Error ? F : Error(String(F))) : null),
          (x[23] = F),
          (x[24] = h))
        : (h = x[24]);
      let I = h;
      return (
        x[25] !== E ||
        x[26] !== I ||
        x[27] !== k ||
        x[28] !== M ||
        x[29] !== A ||
        x[30] !== _
          ? ((y = {
              coins: E,
              loading: A,
              error: I,
              refetch: _,
              isError: k,
              isLoadingError: M,
            }),
            (x[25] = E),
            (x[26] = I),
            (x[27] = k),
            (x[28] = M),
            (x[29] = A),
            (x[30] = _),
            (x[31] = y))
          : (y = x[31]),
        y
      );
    },
  ]);
};
