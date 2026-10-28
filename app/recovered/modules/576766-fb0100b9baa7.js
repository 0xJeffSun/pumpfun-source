// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(448341),
    a = e.i(528600),
    s = e.i(690877),
    n = e.i(606933),
    l = e.i(352386),
    r = e.i(38279),
    c = e.i(544930),
    o = e.i(466931);
  let d = (e, t) => !(0, a.r)(t) && e < 1,
    h = (e, t) => "error" === e.status && t - e.errorUpdatedAt >= 3e4,
    x = 0,
    f = 0;
  function m(e) {
    return h(e.state, Date.now());
  }
  function u(e) {
    return h(e.state, Date.now());
  }
  function b(e, t) {
    return e.localeCompare(t);
  }
  e.s([
    "f",
    0,
    function (e) {
      let a,
        h,
        p,
        _,
        g,
        y,
        v = (0, t.c)(21),
        { userAddresses: j, queryOptions: k } = e,
        w = [...j].sort(b),
        N = w.join(","),
        C = !!j.length,
        A = (0, n.useQueryClient)(),
        F = () => (0, c.u)({ userAddresses: w }),
        E = r.Q.USERS(w);
      v[0] !== C || v[1] !== k || v[2] !== F || v[3] !== E
        ? ((a = {
            enabled: C,
            queryFn: F,
            queryKey: E,
            retryOnMount: !1,
            refetchOnMount: u,
            refetchOnWindowFocus: m,
            retry: d,
            ...k,
          }),
          (v[0] = C),
          (v[1] = k),
          (v[2] = F),
          (v[3] = E),
          (v[4] = a))
        : (a = v[4]);
      let S = (0, s.useQuery)(a),
        { error: I, errorUpdatedAt: B } = S;
      v[5] !== N
        ? ((h = "" === N ? [] : N.split(",")), (v[5] = N), (v[6] = h))
        : (h = v[6]);
      let D = h;
      if (
        (v[7] !== D || v[8] !== I
          ? ((p = () => {
              if (!I) return;
              let e = ((e) => {
                if (e - x < 3e4) return ((f += 1), null);
                let t = f;
                return ((x = e), (f = 0), t);
              })(Date.now());
              null !== e &&
                (0, o.l)({
                  error: I,
                  feature: "profile",
                  operation: "users-batch",
                  context: {
                    addressCount: D.length,
                    ...(e > 0 ? { suppressedReports: e } : {}),
                  },
                });
            }),
            (v[7] = D),
            (v[8] = I),
            (v[9] = p))
          : (p = v[9]),
        v[10] !== D || v[11] !== I || v[12] !== B
          ? ((_ = [I, B, D]),
            (v[10] = D),
            (v[11] = I),
            (v[12] = B),
            (v[13] = _))
          : (_ = v[13]),
        (0, l.useEffect)(p, _),
        v[14] !== D || v[15] !== I || v[16] !== A)
      )
        ((g = I
          ? D.map((e) => A.getQueryData((0, i.B)(e))).filter(
              (e) => void 0 !== e,
            )
          : []),
          (v[14] = D),
          (v[15] = I),
          (v[16] = A),
          (v[17] = g));
      else g = v[17];
      let M = g;
      if (!I) return S;
      let U = S.data ?? M;
      return (
        v[18] !== S || v[19] !== U
          ? ((y = { ...S, data: U }), (v[18] = S), (v[19] = U), (v[20] = y))
          : (y = v[20]),
        y
      );
    },
  ]);
};
