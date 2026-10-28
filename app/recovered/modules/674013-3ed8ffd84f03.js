// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(78436),
    r = e.i(605587);
  let i = (0, n.$)()((e, t) => ({
    prefill: null,
    setTradePrefill: (t) => e({ prefill: { ...t, mint: (0, r.c)(t.mint) } }),
    consumeTradePrefill: (n) => {
      let i = t().prefill;
      return i && i.mint === (0, r.c)(n) ? (e({ prefill: null }), i) : null;
    },
  }));
  e.s([
    "p",
    0,
    (e) => i.getState().consumeTradePrefill(e),
    "w",
    0,
    (e) => i.getState().setTradePrefill(e),
    "g",
    0,
    (e) => {
      let n,
        a,
        s = (0, t.c)(4);
      s[0] !== e ? ((n = (0, r.c)(e)), (s[0] = e), (s[1] = n)) : (n = s[1]);
      let l = n;
      return (
        s[2] !== l
          ? ((a = (e) => (e.prefill?.mint === l ? e.prefill : null)),
            (s[2] = l),
            (s[3] = a))
          : (a = s[3]),
        i(a)
      );
    },
  ]);
};
