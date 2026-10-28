// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(653805),
    a = e.i(978854),
    r = e.i(605587);
  e.s([
    "f",
    0,
    (e) => {
      let n,
        l = (0, t.c)(4),
        s = (0, a.H)(e),
        o = (0, i.F)(e);
      return (
        l[0] !== s || l[1] !== e || l[2] !== o
          ? ((n = (({ mint: e, latestTrade: t, row: i }) => {
              if (!t) return null;
              let a = Number(t.priceUsd),
                n = Number.isFinite(a) && a > 0 ? a : null;
              if (!(0, r.N)({ mint: e })) return n;
              let l = i?.priceUsd,
                s = i?.lastTradeTimestamp;
              if (!l || !(l > 0) || "number" != typeof s) return n;
              if (null == n) return l;
              let o = new Date(t.timestamp).getTime();
              return Number.isFinite(o) && o >= s ? n : l;
            })({ mint: e, latestTrade: s, row: o })),
            (l[0] = s),
            (l[1] = e),
            (l[2] = o),
            (l[3] = n))
          : (n = l[3]),
        n
      );
    },
  ]);
};
