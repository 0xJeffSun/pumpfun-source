// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(609252);
  function n(e) {
    return [e.mint, e];
  }
  function i(e) {
    return e.mint;
  }
  function a(e) {
    return !!e;
  }
  e.s([
    "f",
    0,
    function (e) {
      let o,
        s,
        l,
        d,
        u,
        m = (0, t.c)(13);
      m[0] !== e ? ((o = e.filter(a)), (m[0] = e), (m[1] = o)) : (o = m[1]);
      let c = o;
      m[2] !== c
        ? ((s = Array.from(new Set(c.map(i))).filter(Boolean)),
          (m[2] = c),
          (m[3] = s))
        : (s = m[3]);
      let f = s,
        p = 0 === f.length;
      m[4] !== f || m[5] !== p
        ? ((l = { mints: f, disabled: p }), (m[4] = f), (m[5] = p), (m[6] = l))
        : (l = m[6]);
      let { coins: h, loading: g } = (0, r.f)(l);
      if (m[7] !== h || m[8] !== c) {
        let e = new Map(h.map(n));
        ((d = new Map(
          c.map((t) => {
            let r = e.get(t.mint),
              n = r?.usd_market_cap || r?.market_cap || 0,
              i = r?.total_supply
                ? Number(r.total_supply) / 10 ** (r.base_decimals ?? 6)
                : 0;
            return [
              t.mint,
              {
                ...t,
                liveMarketCap: n,
                liveName: r?.name?.trim() || t.name,
                liveSymbol: r?.symbol?.trim() || t.symbol,
                liveImageUri: r?.image_uri || t.imageUri,
                livePriceUsd: i > 0 ? n / i : 0,
              },
            ];
          }),
        )),
          (m[7] = h),
          (m[8] = c),
          (m[9] = d));
      } else d = m[9];
      let w = d,
        y = f.length > 0 && g;
      return (
        m[10] !== w || m[11] !== y
          ? ((u = { liveTokens: w, isLoading: y }),
            (m[10] = w),
            (m[11] = y),
            (m[12] = u))
          : (u = m[12]),
        u
      );
    },
  ]);
};
