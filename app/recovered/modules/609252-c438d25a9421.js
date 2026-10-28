// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var a = e.i(445242),
    t = e.i(689943),
    r = e.i(369091),
    s = e.i(493025);
  e.s([
    "f",
    0,
    (e) => {
      let l,
        i,
        n,
        o,
        d,
        u,
        c,
        m,
        f,
        p,
        h,
        g,
        x,
        v = (0, a.c)(32);
      v[0] !== e
        ? (({
            mints: l,
            limit: n,
            offset: o,
            sort: d,
            order: u,
            includeNsfw: c,
            disabled: m,
            ...i
          } = e),
          (v[0] = e),
          (v[1] = l),
          (v[2] = i),
          (v[3] = n),
          (v[4] = o),
          (v[5] = d),
          (v[6] = u),
          (v[7] = c),
          (v[8] = m))
        : ((l = v[1]),
          (i = v[2]),
          (n = v[3]),
          (o = v[4]),
          (d = v[5]),
          (u = v[6]),
          (c = v[7]),
          (m = v[8]));
      let w = void 0 === n ? 50 : n,
        y = void 0 === o ? 0 : o,
        b = void 0 === d ? "market_cap" : d,
        j = void 0 === u ? "DESC" : u,
        N = void 0 !== c && c,
        _ = void 0 !== m && m,
        { ipfsPrefix: A } = (0, r.useIpfsPrefix)();
      v[9] !== _ ||
      v[10] !== N ||
      v[11] !== w ||
      v[12] !== y ||
      v[13] !== j ||
      v[14] !== i ||
      v[15] !== b
        ? ((f = {
            limit: w,
            offset: y,
            sort: b,
            order: j,
            includeNsfw: N,
            disabled: _,
            ...i,
          }),
          (v[9] = _),
          (v[10] = N),
          (v[11] = w),
          (v[12] = y),
          (v[13] = j),
          (v[14] = i),
          (v[15] = b),
          (v[16] = f))
        : (f = v[16]);
      let {
        data: k,
        isLoading: I,
        error: C,
        refetch: E,
        isError: F,
        isLoadingError: P,
      } = (0, t.V)(l, f);
      v[17] !== k
        ? ((p = void 0 === k ? [] : k), (v[17] = k), (v[18] = p))
        : (p = v[18]);
      let S = p;
      e: {
        let e;
        if (!S.length) {
          let e;
          (v[19] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = []), (v[19] = e))
            : (e = v[19]),
            (h = e));
          break e;
        }
        (v[20] !== A || v[21] !== S
          ? ((e = (0, s.f)(S, A)), (v[20] = A), (v[21] = S), (v[22] = e))
          : (e = v[22]),
          (h = e));
      }
      let T = h;
      v[23] !== C
        ? ((g = C ? (C instanceof Error ? C : Error(String(C))) : null),
          (v[23] = C),
          (v[24] = g))
        : (g = v[24]);
      let U = g;
      return (
        v[25] !== T ||
        v[26] !== U ||
        v[27] !== F ||
        v[28] !== P ||
        v[29] !== I ||
        v[30] !== E
          ? ((x = {
              coins: T,
              loading: I,
              error: U,
              refetch: E,
              isError: F,
              isLoadingError: P,
            }),
            (v[25] = T),
            (v[26] = U),
            (v[27] = F),
            (v[28] = P),
            (v[29] = I),
            (v[30] = E),
            (v[31] = x))
          : (x = v[31]),
        x
      );
    },
  ]);
};
