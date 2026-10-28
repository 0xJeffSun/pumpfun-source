// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(609252);
  function r(e) {
    return [e.mint, e];
  }
  function i(e) {
    return e.mint;
  }
  function s(e) {
    return !!e;
  }
  e.s([
    "f",
    0,
    function (e) {
      let o,
        d,
        a,
        u,
        l,
        m = (0, t.c)(13);
      m[0] !== e ? ((o = e.filter(s)), (m[0] = e), (m[1] = o)) : (o = m[1]);
      let c = o;
      m[2] !== c
        ? ((d = Array.from(new Set(c.map(i))).filter(Boolean)),
          (m[2] = c),
          (m[3] = d))
        : (d = m[3]);
      let f = d,
        w = 0 === f.length;
      m[4] !== f || m[5] !== w
        ? ((a = { mints: f, disabled: w }), (m[4] = f), (m[5] = w), (m[6] = a))
        : (a = m[6]);
      let { coins: p, loading: b } = (0, n.f)(a);
      if (m[7] !== p || m[8] !== c) {
        let e = new Map(p.map(r));
        ((u = new Map(
          c.map((t) => {
            let n = e.get(t.mint),
              r = n?.usd_market_cap || n?.market_cap || 0,
              i = n?.total_supply
                ? Number(n.total_supply) / 10 ** (n.base_decimals ?? 6)
                : 0;
            return [
              t.mint,
              {
                ...t,
                liveMarketCap: r,
                liveName: n?.name?.trim() || t.name,
                liveSymbol: n?.symbol?.trim() || t.symbol,
                liveImageUri: n?.image_uri || t.imageUri,
                livePriceUsd: i > 0 ? r / i : 0,
              },
            ];
          }),
        )),
          (m[7] = p),
          (m[8] = c),
          (m[9] = u));
      } else u = m[9];
      let A = u,
        h = f.length > 0 && b;
      return (
        m[10] !== A || m[11] !== h
          ? ((l = { liveTokens: A, isLoading: h }),
            (m[10] = A),
            (m[11] = h),
            (m[12] = l))
          : (l = m[12]),
        l
      );
    },
  ]);
};
