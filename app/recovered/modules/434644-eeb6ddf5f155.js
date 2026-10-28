// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(971370),
    n = e.i(690877),
    l = e.i(958083);
  e.i(70833);
  var i = e.i(66961),
    a = e.i(639374);
  function s(e) {
    let s,
      o,
      u,
      d,
      c = (0, t.c)(13),
      { connection: m } = (0, i.f)(),
      { mint: f, enabled: p } = e,
      h = void 0 === p || p;
    return (
      c[0] !== m || c[1] !== h || c[2] !== f
        ? ((s = h && !!m && (0, a.f)(f)),
          (c[0] = m),
          (c[1] = h),
          (c[2] = f),
          (c[3] = s))
        : (s = c[3]),
      c[4] !== f
        ? ((o = ["mint-supply", f]), (c[4] = f), (c[5] = o))
        : (o = c[5]),
      c[6] !== m || c[7] !== f
        ? ((u = async () => {
            let { value: e } = await m.getTokenSupply(new r.PublicKey(f));
            return {
              wholeTokens: new l.U(e.amount)
                .div(l.U.pow(10, e.decimals))
                .toNumber(),
              decimals: e.decimals,
            };
          }),
          (c[6] = m),
          (c[7] = f),
          (c[8] = u))
        : (u = c[8]),
      c[9] !== s || c[10] !== o || c[11] !== u
        ? ((d = {
            enabled: s,
            queryKey: o,
            queryFn: u,
            staleTime: 3e5,
            refetchOnWindowFocus: !1,
          }),
          (c[9] = s),
          (c[10] = o),
          (c[11] = u),
          (c[12] = d))
        : (d = c[12]),
      (0, n.useQuery)(d)
    );
  }
  e.s(["f", 0, s], 790485);
  var o = e.i(526080),
    u = e.i(662093),
    d = e.i(605587);
  let c = (e) => {
    let { coin: t, mintSupplyWholeTokens: r, evmBasis: n } = e;
    return (0, d.N)({ mint: t.mint, chainId: t.chain_id })
      ? (0, u.X)({ coin: t, basis: n })
      : null != r && Number.isFinite(r) && r > 0
        ? r
        : (0, o.B)(t);
  };
  (e.s(
    [
      "f",
      0,
      "BwWK17cbHxwWBKZkUYvzxLcNQ1YVyaFezduWbtm2de6s",
      "Y",
      0,
      c,
      "Z",
      0,
      ({ holders: e, wallets: t, limit: r }) => {
        let n = [...e],
          l = new Set();
        for (let e of t) {
          let { address: t, amount: r } = e;
          if (!t || void 0 === r || !(r > 0) || l.has(t)) continue;
          let i = n.findIndex((e) => e.address === t);
          if (-1 === i) n.push({ address: t, amount: r, fromChain: !0 });
          else {
            if (!(n[i].amount < r * (1 - 1e-9))) continue;
            n[i] = { address: t, amount: r, fromChain: !0 };
          }
          l.add(t);
        }
        return 0 === l.size
          ? e
          : (n.sort((e, t) => t.amount - e.amount), n.length <= r)
            ? n
            : n.filter((e, t) => t < r || l.has(e.address));
      },
    ],
    13720,
  ),
    e.s(
      [
        "f",
        0,
        (e) => {
          let r,
            n,
            l = (0, t.c)(7),
            i = e?.mint ?? "",
            a = !!e;
          l[0] !== i || l[1] !== a
            ? ((r = { mint: i, enabled: a }),
              (l[0] = i),
              (l[1] = a),
              (l[2] = r))
            : (r = l[2]);
          let o = s(r),
            d = (0, u.m)(e);
          if (!e) return 0;
          let m = o.data?.wholeTokens;
          return (
            l[3] !== e || l[4] !== d || l[5] !== m
              ? ((n = c({ coin: e, mintSupplyWholeTokens: m, evmBasis: d })),
                (l[3] = e),
                (l[4] = d),
                (l[5] = m),
                (l[6] = n))
              : (n = l[6]),
            n
          );
        },
      ],
      434644,
    ));
};
