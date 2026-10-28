// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(574472),
    i = e.i(690877),
    n = e.i(606933),
    s = e.i(352386),
    l = e.i(85324),
    a = e.i(569124),
    o = e.i(369091),
    u = e.i(493025);
  let c = ["feed", "stocks-feed"],
    d = [],
    f = [],
    h = () => 0;
  function m(e) {
    return e.coin;
  }
  function p(e) {
    return [e.mint, e];
  }
  function b(e) {
    return e.coin;
  }
  function g(e, t) {
    return !(t instanceof a.d && 401 === t.status) && e < 2;
  }
  e.s([
    "u",
    0,
    c,
    "a",
    0,
    function (e) {
      let y,
        v,
        w,
        _,
        x,
        E,
        N,
        S,
        R,
        T,
        C,
        P = (0, t.c)(22);
      P[0] !== e
        ? ((y = void 0 === e ? {} : e), (P[0] = e), (P[1] = y))
        : (y = P[1]);
      let { enabled: k, live: F } = y,
        M = void 0 === k || k,
        { ipfsPrefix: j } = (0, o.useIpfsPrefix)(),
        { address: I } = (0, r.F)(),
        O = I || null,
        Q = null !== O;
      if (P[2] !== O)
        ((v = null === O ? c : [...c, "fh", O]), (P[2] = O), (P[3] = v));
      else v = P[3];
      let A = v,
        U =
          ((T = (0, t.c)(5)),
          (C = (0, n.useQueryClient)()),
          T[0] !== C
            ? ((S = (e) => C.getQueryCache().subscribe(e)),
              (T[0] = C),
              (T[1] = S))
            : (S = T[1]),
          T[2] !== C || T[3] !== A
            ? ((R = () => C.getQueryData(A)?.maxAgeMs ?? 0),
              (T[2] = C),
              (T[3] = A),
              (T[4] = R))
            : (R = T[4]),
          (0, s.useSyncExternalStore)(S, R, h)),
        q = (0, l.q)(Math.max(a.J, U), M && (void 0 === F || F));
      P[4] !== Q
        ? ((w = (e) => {
            let { signal: t } = e;
            return (0, a.X)({ includeFollowedHolders: Q, signal: t });
          }),
          (P[4] = Q),
          (P[5] = w))
        : (w = P[5]);
      let B = Math.max(a.r, U);
      P[6] !== M || P[7] !== A || P[8] !== q || P[9] !== w || P[10] !== B
        ? ((_ = {
            queryKey: A,
            queryFn: w,
            select: a.N,
            enabled: M,
            staleTime: B,
            refetchInterval: q,
            refetchIntervalInBackground: !1,
            refetchOnWindowFocus: !1,
            retry: g,
          }),
          (P[6] = M),
          (P[7] = A),
          (P[8] = q),
          (P[9] = w),
          (P[10] = B),
          (P[11] = _))
        : (_ = P[11]);
      let L = (0, i.useQuery)(_);
      e: {
        let e,
          t = L.data ?? d;
        if (0 === t.length) {
          x = d;
          break e;
        }
        if (P[12] !== t || P[13] !== j) {
          let r = new Map((0, u.f)(t.map(b), j).map(p));
          ((e = t.flatMap((e) => {
            let t = r.get(e.coin.mint);
            return t ? [{ ...e, coin: t }] : [];
          })),
            (P[12] = t),
            (P[13] = j),
            (P[14] = e));
        } else e = P[14];
        x = e;
      }
      let $ = x;
      P[15] !== $
        ? ((E = 0 === $.length ? f : $.map(m)), (P[15] = $), (P[16] = E))
        : (E = P[16]);
      let D = E,
        H = M && L.isPending,
        z = L.isError && 0 === $.length;
      return (
        P[17] !== D || P[18] !== $ || P[19] !== H || P[20] !== z
          ? ((N = { rows: $, coins: D, isLoading: H, isError: z }),
            (P[17] = D),
            (P[18] = $),
            (P[19] = H),
            (P[20] = z),
            (P[21] = N))
          : (N = P[21]),
        N
      );
    },
  ]);
};
