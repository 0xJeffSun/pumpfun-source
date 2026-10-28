// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(620268),
    n = e.i(449597);
  e.s([
    "f",
    0,
    function (e) {
      let r = "string" == typeof e ? e : e?.toBase58(),
        i = (0, n.L)(r),
        a = void 0 === i && r ? r : void 0,
        { data: s } = (0, t.x)({
          addresses: a ? [a] : [],
          enabled: void 0 !== a,
        });
      return void 0 !== i
        ? i
        : (a ? s?.get(a.toLowerCase())?.symbol?.trim() : void 0) || (0, n.q)(r);
    },
  ]);
};
