// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    a = e.i(448341),
    i = e.i(528600),
    n = e.i(690877),
    r = e.i(606933),
    l = e.i(352386),
    s = e.i(38279),
    o = e.i(544930),
    c = e.i(466931);
  let d = (e, t) => !(0, i.r)(t) && e < 1,
    m = (e, t) => "error" === e.status && t - e.errorUpdatedAt >= 3e4,
    u = 0,
    h = 0;
  function p(e) {
    return m(e.state, Date.now());
  }
  function f(e) {
    return m(e.state, Date.now());
  }
  function x(e, t) {
    return e.localeCompare(t);
  }
  e.s([
    "f",
    0,
    function (e) {
      let i,
        m,
        _,
        g,
        y,
        v,
        b = (0, t.c)(21),
        { userAddresses: j, queryOptions: k } = e,
        w = [...j].sort(x),
        N = w.join(","),
        C = !!j.length,
        S = (0, r.useQueryClient)(),
        A = () => (0, o.u)({ userAddresses: w }),
        M = s.Q.USERS(w);
      b[0] !== C || b[1] !== k || b[2] !== A || b[3] !== M
        ? ((i = {
            enabled: C,
            queryFn: A,
            queryKey: M,
            retryOnMount: !1,
            refetchOnMount: f,
            refetchOnWindowFocus: p,
            retry: d,
            ...k,
          }),
          (b[0] = C),
          (b[1] = k),
          (b[2] = A),
          (b[3] = M),
          (b[4] = i))
        : (i = b[4]);
      let T = (0, n.useQuery)(i),
        { error: I, errorUpdatedAt: P } = T;
      b[5] !== N
        ? ((m = "" === N ? [] : N.split(",")), (b[5] = N), (b[6] = m))
        : (m = b[6]);
      let z = m;
      if (
        (b[7] !== z || b[8] !== I
          ? ((_ = () => {
              if (!I) return;
              let e = ((e) => {
                if (e - u < 3e4) return ((h += 1), null);
                let t = h;
                return ((u = e), (h = 0), t);
              })(Date.now());
              null !== e &&
                (0, c.l)({
                  error: I,
                  feature: "profile",
                  operation: "users-batch",
                  context: {
                    addressCount: z.length,
                    ...(e > 0 ? { suppressedReports: e } : {}),
                  },
                });
            }),
            (b[7] = z),
            (b[8] = I),
            (b[9] = _))
          : (_ = b[9]),
        b[10] !== z || b[11] !== I || b[12] !== P
          ? ((g = [I, P, z]),
            (b[10] = z),
            (b[11] = I),
            (b[12] = P),
            (b[13] = g))
          : (g = b[13]),
        (0, l.useEffect)(_, g),
        b[14] !== z || b[15] !== I || b[16] !== S)
      )
        ((y = I
          ? z
              .map((e) => S.getQueryData((0, a.B)(e)))
              .filter((e) => void 0 !== e)
          : []),
          (b[14] = z),
          (b[15] = I),
          (b[16] = S),
          (b[17] = y));
      else y = b[17];
      let D = y;
      if (!I) return T;
      let F = T.data ?? D;
      return (
        b[18] !== T || b[19] !== F
          ? ((v = { ...T, data: F }), (b[18] = T), (b[19] = F), (b[20] = v))
          : (v = b[20]),
        v
      );
    },
  ]);
};
