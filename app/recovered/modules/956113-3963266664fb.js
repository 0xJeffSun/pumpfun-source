// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242);
  let i = (0, e.i(78436).$)((e) => ({
    byMint: {},
    setCurve: (t, i) =>
      e((e) => {
        if (e.byMint[t] === i) return e;
        let a = { ...e.byMint };
        return (i ? (a[t] = i) : delete a[t], { byMint: a });
      }),
    servingByMint: {},
    setServing: (t, i, a) =>
      e((e) => {
        let r = e.servingByMint[t];
        if ((r?.[i] === !0) === a) return e;
        let n = { ...r };
        a ? (n[i] = !0) : delete n[i];
        let l = { ...e.servingByMint };
        return (
          n.header || n.tape ? (l[t] = n) : delete l[t],
          { servingByMint: l }
        );
      }),
  }));
  e.s([
    "R",
    0,
    (e, t) => i.getState().servingByMint[e]?.[t] === !0,
    "E",
    0,
    i,
    "r",
    0,
    (e) => {
      let a,
        r = (0, t.c)(2);
      return (
        r[0] !== e
          ? ((a = (t) => t.byMint[e]), (r[0] = e), (r[1] = a))
          : (a = r[1]),
        i(a)
      );
    },
    "u",
    0,
    (e) => {
      let a,
        r,
        n,
        l = (0, t.c)(8);
      l[0] !== e
        ? ((a = (t) => t.servingByMint[e]?.header === !0),
          (l[0] = e),
          (l[1] = a))
        : (a = l[1]);
      let s = i(a);
      l[2] !== e
        ? ((r = (t) => t.servingByMint[e]?.tape === !0), (l[2] = e), (l[3] = r))
        : (r = l[3]);
      let o = i(r),
        d = !(s && o),
        c = !s,
        u = !o;
      return (
        l[4] !== d || l[5] !== c || l[6] !== u
          ? ((n = { enabled: d, foldMarketData: c, feedTape: u }),
            (l[4] = d),
            (l[5] = c),
            (l[6] = u),
            (l[7] = n))
          : (n = l[7]),
        n
      );
    },
  ]);
};
