// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(989039),
    n = e.i(690877),
    i = e.i(697638),
    a = e.i(569124),
    l = e.i(605587);
  let s = (e) => {
    let t = new Map();
    for (let r of e.rows)
      "string" == typeof r?.mint &&
        0 !== r.mint.length &&
        ("tokenized_stock" === r.assetClass ||
          "pre_ipo_synthetic" === r.assetClass) &&
        t.set((0, l.c)(r.mint), r.assetClass);
    return t;
  };
  function o(e) {
    let { signal: t } = e;
    return (0, a.X)({ signal: t });
  }
  function c(e, t) {
    return !(t instanceof a.d && 401 === t.status) && e < 2;
  }
  let u = (0, e.i(78436).$)()((e) => ({
    overrides: {},
    setOverride: (t, r) =>
      e((e) => ({ overrides: { ...e.overrides, [(0, l.c)(t)]: r } })),
  }));
  function d(e) {
    return e.setOverride;
  }
  e.s(
    [
      "f",
      0,
      (e) => {
        let a,
          f,
          m,
          p,
          h,
          g,
          x,
          v,
          y,
          b,
          w = (0, t.c)(13),
          { displayMode: _, persistDisplayMode: C } = (0, r.f)(),
          S =
            null !=
            ((v = (0, t.c)(7))[0] !== e
              ? ((h =
                  "string" == typeof e && e.length > 0 && !e.startsWith("0x")),
                (v[0] = e),
                (v[1] = h))
              : (h = v[1]),
            (y = h),
            v[2] !== y
              ? ((g = {
                  queryKey: i.u,
                  queryFn: o,
                  select: s,
                  enabled: y,
                  staleTime: 3e5,
                  refetchOnWindowFocus: !1,
                  retry: c,
                }),
                (v[2] = y),
                (v[3] = g))
              : (g = v[3]),
            (b = (0, n.useQuery)(g)),
            y
              ? void 0 === b.data
                ? b.isError
                  ? null
                  : void 0
                : (v[4] !== e || v[5] !== b.data
                    ? ((x = b.data.get((0, l.c)(e)) ?? null),
                      (v[4] = e),
                      (v[5] = b.data),
                      (v[6] = x))
                    : (x = v[6]),
                  x)
              : null);
        w[0] !== e ? ((a = (0, l.c)(e)), (w[0] = e), (w[1] = a)) : (a = w[1]);
        let k = a;
        w[2] !== k
          ? ((f = (e) => e.overrides[k]), (w[2] = k), (w[3] = f))
          : (f = w[3]);
        let j = u(f),
          N = u(d),
          I = S ? (j ?? "price") : _;
        w[4] !== S || w[5] !== e || w[6] !== C || w[7] !== N
          ? ((m = (t) => {
              S ? N(e, t) : C(t);
            }),
            (w[4] = S),
            (w[5] = e),
            (w[6] = C),
            (w[7] = N),
            (w[8] = m))
          : (m = w[8]);
        let E = m;
        return (
          w[9] !== I || w[10] !== S || w[11] !== E
            ? ((p = { displayMode: I, setDisplayMode: E, isStockCoin: S }),
              (w[9] = I),
              (w[10] = S),
              (w[11] = E),
              (w[12] = p))
            : (p = w[12]),
          p
        );
      },
    ],
    772876,
  );
};
