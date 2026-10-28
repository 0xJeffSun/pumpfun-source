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
    c = { batch: (e, t) => ["userMintPositions", e, t] };
  function d(e) {
    return !!e;
  }
  function u(e) {
    return e.coinMint;
  }
  e.s([
    "F",
    0,
    c,
    "_",
    0,
    (e) => {
      let m,
        p,
        g,
        h,
        x,
        f,
        w,
        v,
        y,
        b,
        j,
        N,
        S,
        C,
        R,
        E = (0, t.c)(53),
        {
          userId: _,
          mints: P,
          enabled: T,
          refetchIntervalMs: M,
          refetchInterval: I,
          skipChainDispute: k,
        } = e;
      (E[0] !== P || E[1] !== _
        ? ((m = Array.from(new Set(P.filter(d))).sort()),
          (g = i.useQuery),
          (p = c.batch(_ ?? void 0, m)),
          (E[0] = P),
          (E[1] = _),
          (E[2] = m),
          (E[3] = p),
          (E[4] = g))
        : ((m = E[2]), (p = E[3]), (g = E[4])),
        E[5] !== m || E[6] !== _
          ? ((h = () => (0, n.m)({ userId: _, mints: m })),
            (E[5] = m),
            (E[6] = _),
            (E[7] = h))
          : (h = E[7]));
      let O = (void 0 === T || T) && !!_ && m.length > 0,
        z = I ?? M ?? !1,
        A = 3e4 * (void 0 === I && null == M);
      (E[8] !== _
        ? ((x = (e, t) => (t?.queryKey[1] === _ ? e : void 0)),
          (E[8] = _),
          (E[9] = x))
        : (x = E[9]),
        E[10] !== p ||
        E[11] !== h ||
        E[12] !== O ||
        E[13] !== z ||
        E[14] !== A ||
        E[15] !== x
          ? ((f = {
              queryKey: p,
              queryFn: h,
              enabled: O,
              refetchInterval: z,
              staleTime: A,
              placeholderData: x,
            }),
            (E[10] = p),
            (E[11] = h),
            (E[12] = O),
            (E[13] = z),
            (E[14] = A),
            (E[15] = x),
            (E[16] = f))
          : (f = E[16]));
      let q = g(f);
      e: {
        let e, t, i;
        if (void 0 !== k && k) {
          let e;
          (E[17] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = { owner: null, mints: [] }), (E[17] = e))
            : (e = E[17]),
            (w = e));
          break e;
        }
        if (E[18] !== q.data) {
          let i = (q.data ?? []).filter(a.P);
          ((e = i[0]?.walletAddress ?? null),
            (t = i
              .filter((t) => t.walletAddress === e)
              .map(u)
              .sort()
              .slice(0, l.y)),
            (E[18] = q.data),
            (E[19] = e),
            (E[20] = t));
        } else ((e = E[19]), (t = E[20]));
        let r = t;
        (E[21] !== r || E[22] !== e
          ? ((i = { owner: e, mints: r }),
            (E[21] = r),
            (E[22] = e),
            (E[23] = i))
          : (i = E[23]),
          (w = i));
      }
      let U = w;
      E[24] !== U.mints || E[25] !== U.owner
        ? ((v = ["userMintPositions.chainHeld", U.owner, U.mints]),
          (E[24] = U.mints),
          (E[25] = U.owner),
          (E[26] = v))
        : (v = E[26]);
      let L = !!U.owner && U.mints.length > 0;
      (E[27] !== U.mints || E[28] !== U.owner
        ? ((y = (e) => {
            let { signal: t } = e;
            return (0, l.L)({
              owner: U.owner,
              mints: U.mints,
              endpoint: (0, s.L)(),
              signal: t,
            });
          }),
          (E[27] = U.mints),
          (E[28] = U.owner),
          (E[29] = y))
        : (y = E[29]),
        E[30] !== v || E[31] !== L || E[32] !== y
          ? ((b = {
              queryKey: v,
              enabled: L,
              staleTime: 3e4,
              retry: !1,
              queryFn: y,
            }),
            (E[30] = v),
            (E[31] = L),
            (E[32] = y),
            (E[33] = b))
          : (b = E[33]));
      let F = (0, i.useQuery)(b),
        $ = F.data ?? o;
      if (E[34] !== $ || E[35] !== q.data) {
        let e;
        (E[37] !== $
          ? ((e = (e) => (0, r.N)((0, a.N)(e, $.get(e.coinMint)))),
            (E[37] = $),
            (E[38] = e))
          : (e = E[38]),
          (j = (0, n.u)((q.data ?? []).map(e))),
          (E[34] = $),
          (E[35] = q.data),
          (E[36] = j));
      } else j = E[36];
      let D = j;
      E[39] !== D
        ? ((N = (e) => (0, n.l)(D, e)), (E[39] = D), (E[40] = N))
        : (N = E[40]);
      let H = N;
      E[41] !== D
        ? ((S = (e) => (0, r.y)((0, n.l)(D, e))), (E[41] = D), (E[42] = S))
        : (S = E[42]);
      let B = S,
        V = q.isLoading || F.isLoading;
      return (
        E[43] !== q
          ? ((C = () => {
              q.refetch();
            }),
            (E[43] = q),
            (E[44] = C))
          : (C = E[44]),
        E[45] !== D ||
        E[46] !== H ||
        E[47] !== q.dataUpdatedAt ||
        E[48] !== q.isError ||
        E[49] !== B ||
        E[50] !== V ||
        E[51] !== C
          ? ((R = {
              byMint: D,
              positionFor: H,
              summaryFor: B,
              isLoading: V,
              isError: q.isError,
              dataUpdatedAt: q.dataUpdatedAt,
              refetch: C,
            }),
            (E[45] = D),
            (E[46] = H),
            (E[47] = q.dataUpdatedAt),
            (E[48] = q.isError),
            (E[49] = B),
            (E[50] = V),
            (E[51] = C),
            (E[52] = R))
          : (R = E[52]),
        R
      );
    },
  ]);
};
