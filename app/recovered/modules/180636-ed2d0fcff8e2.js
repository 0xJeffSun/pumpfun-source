// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(653805);
  let i = (e) =>
    "number" == typeof e && Number.isFinite(e) && e > 0 ? e : void 0;
  e.s([
    "f",
    0,
    (e) => {
      let l,
        a = (0, t.c)(3),
        { mint: n, isEvm: o } = e;
      return (
        a[0] !== o || a[1] !== n
          ? ((l = (e) => {
              let t;
              return o
                ? 0
                : ((t = e.coins[n]), i(t?.wireSupply) ?? i(t?.seedSupply) ?? 0);
            }),
            (a[0] = o),
            (a[1] = n),
            (a[2] = l))
          : (l = a[2]),
        (0, r.x)(l)
      );
    },
  ]);
};
