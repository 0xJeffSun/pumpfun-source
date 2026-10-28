// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(365089);
  let l = /^(?:unknown|\?+|n\/a)$/i,
    i = (e) => {
      let t = e?.trim();
      return t && !l.test(t) ? t : null;
    };
  e.s([
    "c",
    0,
    (e) => null !== i(e?.name) || null !== i(e?.symbol),
    "m",
    0,
    (e) => i(e),
    "F",
    0,
    ({ mint: e, sources: l }) => {
      let n = null,
        s = null,
        a = null;
      for (let e of l)
        e && ((n ??= i(e.name)), (s ??= i(e.symbol)), (a ??= i(e.imageUri)));
      return null === n && null === s
        ? {
            name: null,
            symbol: (0, t.d)(e, 4, 4),
            imageUri: a,
            isAddressFallback: !0,
          }
        : { name: n, symbol: s, imageUri: a, isAddressFallback: !1 };
    },
  ]);
};
