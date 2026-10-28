// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(689943),
    n = e.i(369091),
    i = e.i(493025);
  e.s([
    "f",
    0,
    (e) => {
      let a,
        o,
        s,
        l,
        d,
        u,
        m,
        c,
        f,
        p,
        h,
        g,
        w,
        y = (0, t.c)(32);
      y[0] !== e
        ? (({
            mints: a,
            limit: s,
            offset: l,
            sort: d,
            order: u,
            includeNsfw: m,
            disabled: c,
            ...o
          } = e),
          (y[0] = e),
          (y[1] = a),
          (y[2] = o),
          (y[3] = s),
          (y[4] = l),
          (y[5] = d),
          (y[6] = u),
          (y[7] = m),
          (y[8] = c))
        : ((a = y[1]),
          (o = y[2]),
          (s = y[3]),
          (l = y[4]),
          (d = y[5]),
          (u = y[6]),
          (m = y[7]),
          (c = y[8]));
      let b = void 0 === s ? 50 : s,
        x = void 0 === l ? 0 : l,
        $ = void 0 === d ? "market_cap" : d,
        S = void 0 === u ? "DESC" : u,
        A = void 0 !== m && m,
        N = void 0 !== c && c,
        { ipfsPrefix: v } = (0, n.useIpfsPrefix)();
      y[9] !== N ||
      y[10] !== A ||
      y[11] !== b ||
      y[12] !== x ||
      y[13] !== S ||
      y[14] !== o ||
      y[15] !== $
        ? ((f = {
            limit: b,
            offset: x,
            sort: $,
            order: S,
            includeNsfw: A,
            disabled: N,
            ...o,
          }),
          (y[9] = N),
          (y[10] = A),
          (y[11] = b),
          (y[12] = x),
          (y[13] = S),
          (y[14] = o),
          (y[15] = $),
          (y[16] = f))
        : (f = y[16]);
      let {
        data: U,
        isLoading: D,
        error: _,
        refetch: j,
        isError: F,
        isLoadingError: M,
      } = (0, r.V)(a, f);
      y[17] !== U
        ? ((p = void 0 === U ? [] : U), (y[17] = U), (y[18] = p))
        : (p = y[18]);
      let P = p;
      e: {
        let e;
        if (!P.length) {
          let e;
          (y[19] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = []), (y[19] = e))
            : (e = y[19]),
            (h = e));
          break e;
        }
        (y[20] !== v || y[21] !== P
          ? ((e = (0, i.f)(P, v)), (y[20] = v), (y[21] = P), (y[22] = e))
          : (e = y[22]),
          (h = e));
      }
      let k = h;
      y[23] !== _
        ? ((g = _ ? (_ instanceof Error ? _ : Error(String(_))) : null),
          (y[23] = _),
          (y[24] = g))
        : (g = y[24]);
      let C = g;
      return (
        y[25] !== k ||
        y[26] !== C ||
        y[27] !== F ||
        y[28] !== M ||
        y[29] !== D ||
        y[30] !== j
          ? ((w = {
              coins: k,
              loading: D,
              error: C,
              refetch: j,
              isError: F,
              isLoadingError: M,
            }),
            (y[25] = k),
            (y[26] = C),
            (y[27] = F),
            (y[28] = M),
            (y[29] = D),
            (y[30] = j),
            (y[31] = w))
          : (w = y[31]),
        w
      );
    },
  ]);
};
