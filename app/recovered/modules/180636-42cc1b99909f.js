// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(653805);
  let l = (e) =>
    "number" == typeof e && Number.isFinite(e) && e > 0 ? e : void 0;
  e.s([
    "f",
    0,
    (e) => {
      let a,
        o = (0, t.c)(3),
        { mint: i, isEvm: n } = e;
      return (
        o[0] !== n || o[1] !== i
          ? ((a = (e) => {
              let t;
              return n
                ? 0
                : ((t = e.coins[i]), l(t?.wireSupply) ?? l(t?.seedSupply) ?? 0);
            }),
            (o[0] = n),
            (o[1] = i),
            (o[2] = a))
          : (a = o[2]),
        (0, r.x)(a)
      );
    },
  ]);
};
