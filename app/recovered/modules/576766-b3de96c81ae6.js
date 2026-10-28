// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var a = e.i(445242),
    t = e.i(448341),
    r = e.i(528600),
    s = e.i(690877),
    l = e.i(606933),
    i = e.i(352386),
    n = e.i(38279),
    o = e.i(544930),
    d = e.i(466931);
  let u = (e, a) => !(0, r.r)(a) && e < 1,
    c = (e, a) => "error" === e.status && a - e.errorUpdatedAt >= 3e4,
    m = 0,
    f = 0;
  function p(e) {
    return c(e.state, Date.now());
  }
  function h(e) {
    return c(e.state, Date.now());
  }
  function g(e, a) {
    return e.localeCompare(a);
  }
  e.s([
    "f",
    0,
    function (e) {
      let r,
        c,
        x,
        v,
        w,
        y,
        b = (0, a.c)(21),
        { userAddresses: j, queryOptions: N } = e,
        _ = [...j].sort(g),
        A = _.join(","),
        k = !!j.length,
        I = (0, l.useQueryClient)(),
        C = () => (0, o.u)({ userAddresses: _ }),
        E = n.Q.USERS(_);
      b[0] !== k || b[1] !== N || b[2] !== C || b[3] !== E
        ? ((r = {
            enabled: k,
            queryFn: C,
            queryKey: E,
            retryOnMount: !1,
            refetchOnMount: h,
            refetchOnWindowFocus: p,
            retry: u,
            ...N,
          }),
          (b[0] = k),
          (b[1] = N),
          (b[2] = C),
          (b[3] = E),
          (b[4] = r))
        : (r = b[4]);
      let F = (0, s.useQuery)(r),
        { error: P, errorUpdatedAt: S } = F;
      b[5] !== A
        ? ((c = "" === A ? [] : A.split(",")), (b[5] = A), (b[6] = c))
        : (c = b[6]);
      let T = c;
      if (
        (b[7] !== T || b[8] !== P
          ? ((x = () => {
              if (!P) return;
              let e = ((e) => {
                if (e - m < 3e4) return ((f += 1), null);
                let a = f;
                return ((m = e), (f = 0), a);
              })(Date.now());
              null !== e &&
                (0, d.l)({
                  error: P,
                  feature: "profile",
                  operation: "users-batch",
                  context: {
                    addressCount: T.length,
                    ...(e > 0 ? { suppressedReports: e } : {}),
                  },
                });
            }),
            (b[7] = T),
            (b[8] = P),
            (b[9] = x))
          : (x = b[9]),
        b[10] !== T || b[11] !== P || b[12] !== S
          ? ((v = [P, S, T]),
            (b[10] = T),
            (b[11] = P),
            (b[12] = S),
            (b[13] = v))
          : (v = b[13]),
        (0, i.useEffect)(x, v),
        b[14] !== T || b[15] !== P || b[16] !== I)
      )
        ((w = P
          ? T.map((e) => I.getQueryData((0, t.B)(e))).filter(
              (e) => void 0 !== e,
            )
          : []),
          (b[14] = T),
          (b[15] = P),
          (b[16] = I),
          (b[17] = w));
      else w = b[17];
      let U = w;
      if (!P) return F;
      let L = F.data ?? U;
      return (
        b[18] !== F || b[19] !== L
          ? ((y = { ...F, data: L }), (b[18] = F), (b[19] = L), (b[20] = y))
          : (y = b[20]),
        y
      );
    },
  ]);
};
