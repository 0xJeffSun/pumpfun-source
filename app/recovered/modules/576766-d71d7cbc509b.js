// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(448341),
    a = e.i(528600),
    i = e.i(690877),
    s = e.i(606933),
    l = e.i(352386),
    o = e.i(38279),
    n = e.i(544930),
    d = e.i(466931);
  let u = (e, t) => !(0, a.r)(t) && e < 1,
    c = (e, t) => "error" === e.status && t - e.errorUpdatedAt >= 3e4,
    f = 0,
    m = 0;
  function p(e) {
    return c(e.state, Date.now());
  }
  function v(e) {
    return c(e.state, Date.now());
  }
  function h(e, t) {
    return e.localeCompare(t);
  }
  e.s([
    "f",
    0,
    function (e) {
      let a,
        c,
        y,
        x,
        g,
        w,
        b = (0, t.c)(21),
        { userAddresses: N, queryOptions: j } = e,
        R = [...N].sort(h),
        S = R.join(","),
        C = !!N.length,
        A = (0, s.useQueryClient)(),
        F = () => (0, n.u)({ userAddresses: R }),
        _ = o.Q.USERS(R);
      b[0] !== C || b[1] !== j || b[2] !== F || b[3] !== _
        ? ((a = {
            enabled: C,
            queryFn: F,
            queryKey: _,
            retryOnMount: !1,
            refetchOnMount: v,
            refetchOnWindowFocus: p,
            retry: u,
            ...j,
          }),
          (b[0] = C),
          (b[1] = j),
          (b[2] = F),
          (b[3] = _),
          (b[4] = a))
        : (a = b[4]);
      let k = (0, i.useQuery)(a),
        { error: M, errorUpdatedAt: T } = k;
      b[5] !== S
        ? ((c = "" === S ? [] : S.split(",")), (b[5] = S), (b[6] = c))
        : (c = b[6]);
      let E = c;
      if (
        (b[7] !== E || b[8] !== M
          ? ((y = () => {
              if (!M) return;
              let e = ((e) => {
                if (e - f < 3e4) return ((m += 1), null);
                let t = m;
                return ((f = e), (m = 0), t);
              })(Date.now());
              null !== e &&
                (0, d.l)({
                  error: M,
                  feature: "profile",
                  operation: "users-batch",
                  context: {
                    addressCount: E.length,
                    ...(e > 0 ? { suppressedReports: e } : {}),
                  },
                });
            }),
            (b[7] = E),
            (b[8] = M),
            (b[9] = y))
          : (y = b[9]),
        b[10] !== E || b[11] !== M || b[12] !== T
          ? ((x = [M, T, E]),
            (b[10] = E),
            (b[11] = M),
            (b[12] = T),
            (b[13] = x))
          : (x = b[13]),
        (0, l.useEffect)(y, x),
        b[14] !== E || b[15] !== M || b[16] !== A)
      )
        ((g = M
          ? E.map((e) => A.getQueryData((0, r.B)(e))).filter(
              (e) => void 0 !== e,
            )
          : []),
          (b[14] = E),
          (b[15] = M),
          (b[16] = A),
          (b[17] = g));
      else g = b[17];
      let I = g;
      if (!M) return k;
      let D = k.data ?? I;
      return (
        b[18] !== k || b[19] !== D
          ? ((w = { ...k, data: D }), (b[18] = k), (b[19] = D), (b[20] = w))
          : (w = b[20]),
        w
      );
    },
  ]);
};
