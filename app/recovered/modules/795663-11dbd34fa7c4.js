// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(528600),
    n = e.i(690877),
    a = e.i(544930),
    i = e.i(503630);
  let s = a.p,
    o = (e) => ["walletMapping", "solToEvm", e];
  async function l(e) {
    let { solAddresses: t, signal: r } = e,
      n = Array.from(new Set(t)),
      i = [];
    for (let e = 0; e < n.length; e += s) i.push(n.slice(e, e + s));
    let o = await Promise.all(
        i.map((e) =>
          (0, a.u)({ userAddresses: e, fetchOptions: { signal: r } }),
        ),
      ),
      l = {};
    for (let e of n) l[e] = null;
    for (let e of o)
      for (let t of e)
        t?.address &&
          t.address in l &&
          (l[t.address] = t.canonical_evm_wallet ?? null);
    return l;
  }
  async function u(e) {
    let { solAddress: t, signal: n } = e;
    try {
      return (
        (
          await (0, r.e)({
            clientServerUrl: (0, i.R)(),
            userIdentifier: t,
            fetchOptions: { signal: n },
          })
        ).canonical_evm_wallet ?? null
      );
    } catch (e) {
      if ((0, r.g)(e)) return null;
      throw e;
    }
  }
  async function d(e) {
    let { solAddresses: t, queryClient: r, signal: n } = e,
      a = {},
      i = [],
      s = Date.now();
    for (let e of new Set(t)) {
      let t = r.getQueryState(o(e)),
        n = t?.data;
      "string" == typeof n ||
      (null === n && void 0 !== t && s - t.dataUpdatedAt < 3e5)
        ? (a[e] = n)
        : i.push(e);
    }
    if (i.length > 0) {
      let e = await l({ solAddresses: i, signal: n });
      for (let t of i) {
        let n = e[t] ?? null;
        ((a[t] = n), r.setQueryData(o(t), n));
      }
    }
    return a;
  }
  e.s([
    "a",
    0,
    u,
    "i",
    0,
    l,
    "m",
    0,
    d,
    "O",
    0,
    function (e) {
      let r,
        a,
        i,
        s,
        l = (0, t.c)(12),
        { solAddress: d, enabled: c, fresh: m } = e,
        f = void 0 !== m && m,
        h = d ?? null;
      l[0] !== h ? ((r = o(h)), (l[0] = h), (l[1] = r)) : (r = l[1]);
      let p = !!d && (void 0 === c || c),
        y = 3e5 * !f;
      return (
        l[2] !== f
          ? ((a = f ? { refetchOnWindowFocus: !1 } : {}),
            (l[2] = f),
            (l[3] = a))
          : (a = l[3]),
        l[4] !== d
          ? ((i = (e) => {
              let { signal: t } = e;
              return u({ solAddress: d ?? "", signal: t });
            }),
            (l[4] = d),
            (l[5] = i))
          : (i = l[5]),
        l[6] !== r || l[7] !== p || l[8] !== y || l[9] !== a || l[10] !== i
          ? ((s = { queryKey: r, enabled: p, staleTime: y, ...a, queryFn: i }),
            (l[6] = r),
            (l[7] = p),
            (l[8] = y),
            (l[9] = a),
            (l[10] = i),
            (l[11] = s))
          : (s = l[11]),
        (0, n.useQuery)(s)
      );
    },
  ]);
};
