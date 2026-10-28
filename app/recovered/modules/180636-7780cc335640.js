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
      let o,
        i = (0, t.c)(3),
        { mint: a, isEvm: n } = e;
      return (
        i[0] !== n || i[1] !== a
          ? ((o = (e) => {
              let t;
              return n
                ? 0
                : ((t = e.coins[a]), l(t?.wireSupply) ?? l(t?.seedSupply) ?? 0);
            }),
            (i[0] = n),
            (i[1] = a),
            (i[2] = o))
          : (o = i[2]),
        (0, r.x)(o)
      );
    },
  ]);
};
