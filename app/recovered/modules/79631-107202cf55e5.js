// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(690877),
    a = e.i(832971),
    r = e.i(889451),
    n = e.i(384886),
    l = e.i(663628),
    s = e.i(188902);
  let o = new Map(),
    d = { batch: (e, t) => ["userMintPositions", e, t] };
  function c(e) {
    return !!e;
  }
  function u(e) {
    return e.coinMint;
  }
  e.s([
    "F",
    0,
    d,
    "_",
    0,
    (e) => {
      let m,
        p,
        h,
        f,
        g,
        x,
        v,
        y,
        w,
        b,
        j,
        N,
        C,
        S,
        M,
        T = (0, t.c)(53),
        {
          userId: k,
          mints: R,
          enabled: _,
          refetchIntervalMs: E,
          refetchInterval: P,
          skipChainDispute: A,
        } = e;
      (T[0] !== R || T[1] !== k
        ? ((m = Array.from(new Set(R.filter(c))).sort()),
          (h = i.useQuery),
          (p = d.batch(k ?? void 0, m)),
          (T[0] = R),
          (T[1] = k),
          (T[2] = m),
          (T[3] = p),
          (T[4] = h))
        : ((m = T[2]), (p = T[3]), (h = T[4])),
        T[5] !== m || T[6] !== k
          ? ((f = () => (0, n.m)({ userId: k, mints: m })),
            (T[5] = m),
            (T[6] = k),
            (T[7] = f))
          : (f = T[7]));
      let z = (void 0 === _ || _) && !!k && m.length > 0,
        U = P ?? E ?? !1,
        F = 3e4 * (void 0 === P && null == E);
      (T[8] !== k
        ? ((g = (e, t) => (t?.queryKey[1] === k ? e : void 0)),
          (T[8] = k),
          (T[9] = g))
        : (g = T[9]),
        T[10] !== p ||
        T[11] !== f ||
        T[12] !== z ||
        T[13] !== U ||
        T[14] !== F ||
        T[15] !== g
          ? ((x = {
              queryKey: p,
              queryFn: f,
              enabled: z,
              refetchInterval: U,
              staleTime: F,
              placeholderData: g,
            }),
            (T[10] = p),
            (T[11] = f),
            (T[12] = z),
            (T[13] = U),
            (T[14] = F),
            (T[15] = g),
            (T[16] = x))
          : (x = T[16]));
      let I = h(x);
      e: {
        let e, t, i;
        if (void 0 !== A && A) {
          let e;
          (T[17] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = { owner: null, mints: [] }), (T[17] = e))
            : (e = T[17]),
            (v = e));
          break e;
        }
        if (T[18] !== I.data) {
          let i = (I.data ?? []).filter(a.P);
          ((e = i[0]?.walletAddress ?? null),
            (t = i
              .filter((t) => t.walletAddress === e)
              .map(u)
              .sort()
              .slice(0, l.y)),
            (T[18] = I.data),
            (T[19] = e),
            (T[20] = t));
        } else ((e = T[19]), (t = T[20]));
        let r = t;
        (T[21] !== r || T[22] !== e
          ? ((i = { owner: e, mints: r }),
            (T[21] = r),
            (T[22] = e),
            (T[23] = i))
          : (i = T[23]),
          (v = i));
      }
      let O = v;
      T[24] !== O.mints || T[25] !== O.owner
        ? ((y = ["userMintPositions.chainHeld", O.owner, O.mints]),
          (T[24] = O.mints),
          (T[25] = O.owner),
          (T[26] = y))
        : (y = T[26]);
      let B = !!O.owner && O.mints.length > 0;
      (T[27] !== O.mints || T[28] !== O.owner
        ? ((w = (e) => {
            let { signal: t } = e;
            return (0, l.L)({
              owner: O.owner,
              mints: O.mints,
              endpoint: (0, s.L)(),
              signal: t,
            });
          }),
          (T[27] = O.mints),
          (T[28] = O.owner),
          (T[29] = w))
        : (w = T[29]),
        T[30] !== y || T[31] !== B || T[32] !== w
          ? ((b = {
              queryKey: y,
              enabled: B,
              staleTime: 3e4,
              retry: !1,
              queryFn: w,
            }),
            (T[30] = y),
            (T[31] = B),
            (T[32] = w),
            (T[33] = b))
          : (b = T[33]));
      let D = (0, i.useQuery)(b),
        L = D.data ?? o;
      if (T[34] !== L || T[35] !== I.data) {
        let e;
        (T[37] !== L
          ? ((e = (e) => (0, r.N)((0, a.N)(e, L.get(e.coinMint)))),
            (T[37] = L),
            (T[38] = e))
          : (e = T[38]),
          (j = (0, n.u)((I.data ?? []).map(e))),
          (T[34] = L),
          (T[35] = I.data),
          (T[36] = j));
      } else j = T[36];
      let q = j;
      T[39] !== q
        ? ((N = (e) => (0, n.l)(q, e)), (T[39] = q), (T[40] = N))
        : (N = T[40]);
      let $ = N;
      T[41] !== q
        ? ((C = (e) => (0, r.y)((0, n.l)(q, e))), (T[41] = q), (T[42] = C))
        : (C = T[42]);
      let H = C,
        V = I.isLoading || D.isLoading;
      return (
        T[43] !== I
          ? ((S = () => {
              I.refetch();
            }),
            (T[43] = I),
            (T[44] = S))
          : (S = T[44]),
        T[45] !== q ||
        T[46] !== $ ||
        T[47] !== I.dataUpdatedAt ||
        T[48] !== I.isError ||
        T[49] !== H ||
        T[50] !== V ||
        T[51] !== S
          ? ((M = {
              byMint: q,
              positionFor: $,
              summaryFor: H,
              isLoading: V,
              isError: I.isError,
              dataUpdatedAt: I.dataUpdatedAt,
              refetch: S,
            }),
            (T[45] = q),
            (T[46] = $),
            (T[47] = I.dataUpdatedAt),
            (T[48] = I.isError),
            (T[49] = H),
            (T[50] = V),
            (T[51] = S),
            (T[52] = M))
          : (M = T[52]),
        M
      );
    },
  ]);
};
