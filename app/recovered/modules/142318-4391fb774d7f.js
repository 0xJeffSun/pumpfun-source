// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    n = e.i(85324),
    l = e.i(233283),
    i = e.i(541710),
    a = e.i(192);
  e.s([
    "$",
    0,
    50,
    "z",
    0,
    function (e) {
      let s,
        o,
        u,
        d,
        c,
        m,
        f,
        p,
        h,
        b,
        g,
        x,
        y,
        v,
        w,
        _,
        S = (0, t.c)(53),
        {
          mint: k,
          sortBy: j,
          withThesis: N,
          pageSize: C,
          chainId: F,
          chain: I,
          coinChain: T,
          enabled: A,
        } = e,
        K = void 0 === j ? "TOP" : j,
        E = void 0 === N || N,
        M = (0, i.l)();
      if (S[0] !== I || S[1] !== T || S[2] !== M) {
        let e = (0, l.t)({ chain_id: T });
        ((s = I ?? (e && (0, i.m)(e, M) ? e : void 0)),
          (S[0] = I),
          (S[1] = T),
          (S[2] = M),
          (S[3] = s));
      } else s = S[3];
      let q = s,
        D = (void 0 === A || A) && !!k,
        B = (0, n.q)(3e4, D),
        O = "RANKED" === K;
      (S[4] !== D ||
      S[5] !== F ||
      S[6] !== O ||
      S[7] !== k ||
      S[8] !== C ||
      S[9] !== K ||
      S[10] !== E
        ? ((o = O ? ((0, a.d)() ?? null) : null),
          (d = r.useQuery),
          (u = D),
          (c = "mint-positions"),
          (m = k ?? null),
          (f = K),
          (p = E),
          (h = C ?? null),
          (b = O
            ? [
                (({ sessionId: e, chainId: t }) => ({
                  session: e,
                  chainId: t ?? null,
                }))({ sessionId: o, chainId: F }),
              ]
            : []),
          (S[4] = D),
          (S[5] = F),
          (S[6] = O),
          (S[7] = k),
          (S[8] = C),
          (S[9] = K),
          (S[10] = E),
          (S[11] = o),
          (S[12] = u),
          (S[13] = d),
          (S[14] = c),
          (S[15] = m),
          (S[16] = f),
          (S[17] = p),
          (S[18] = h),
          (S[19] = b))
        : ((o = S[11]),
          (u = S[12]),
          (d = S[13]),
          (c = S[14]),
          (m = S[15]),
          (f = S[16]),
          (p = S[17]),
          (h = S[18]),
          (b = S[19])),
        S[20] !== q
          ? ((g = q ? [{ chain: q }] : []), (S[20] = q), (S[21] = g))
          : (g = S[21]),
        S[22] !== g ||
        S[23] !== c ||
        S[24] !== m ||
        S[25] !== f ||
        S[26] !== p ||
        S[27] !== h ||
        S[28] !== b
          ? ((x = [c, m, f, p, h, ...b, ...g]),
            (S[22] = g),
            (S[23] = c),
            (S[24] = m),
            (S[25] = f),
            (S[26] = p),
            (S[27] = h),
            (S[28] = b),
            (S[29] = x))
          : (x = S[29]),
        S[30] !== q ||
        S[31] !== F ||
        S[32] !== k ||
        S[33] !== C ||
        S[34] !== o ||
        S[35] !== K ||
        S[36] !== E
          ? ((y = (e) => {
              let { signal: t } = e;
              if (!k) throw Error("mint is required");
              return (0, l._)({
                mint: k,
                sortBy: K,
                withThesis: E,
                pageSize: C,
                chainId: F,
                chain: q,
                sessionId: o,
                signal: t,
              });
            }),
            (S[30] = q),
            (S[31] = F),
            (S[32] = k),
            (S[33] = C),
            (S[34] = o),
            (S[35] = K),
            (S[36] = E),
            (S[37] = y))
          : (y = S[37]),
        S[38] !== B || S[39] !== u || S[40] !== x || S[41] !== y
          ? ((v = {
              enabled: u,
              queryKey: x,
              queryFn: y,
              staleTime: 15e3,
              gcTime: 3e5,
              refetchInterval: B,
              refetchOnWindowFocus: !0,
            }),
            (S[38] = B),
            (S[39] = u),
            (S[40] = x),
            (S[41] = y),
            (S[42] = v))
          : (v = S[42]));
      let U = d(v);
      S[43] !== U.data?.positions
        ? ((w = U.data?.positions ?? []),
          (S[43] = U.data?.positions),
          (S[44] = w))
        : (w = S[44]);
      let P = w,
        R = U.data?.totalCount ?? null;
      return (
        S[45] !== P ||
        S[46] !== U.error ||
        S[47] !== U.isError ||
        S[48] !== U.isFetching ||
        S[49] !== U.isLoading ||
        S[50] !== U.refetch ||
        S[51] !== R
          ? ((_ = {
              positions: P,
              totalCount: R,
              isLoading: U.isLoading,
              isFetching: U.isFetching,
              isError: U.isError,
              error: U.error,
              refetch: U.refetch,
            }),
            (S[45] = P),
            (S[46] = U.error),
            (S[47] = U.isError),
            (S[48] = U.isFetching),
            (S[49] = U.isLoading),
            (S[50] = U.refetch),
            (S[51] = R),
            (S[52] = _))
          : (_ = S[52]),
        _
      );
    },
  ]);
};
