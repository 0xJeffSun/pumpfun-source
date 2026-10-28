// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(350764),
    i = t.i(97225);
  t.s([
    "f",
    0,
    function (t, s, r) {
      let n = t.style,
        a = s?.style,
        o = {};
      if (!n) return o;
      for (let s in n)
        ((0, e.f)(n[s]) ||
          (a && (0, e.f)(a[s])) ||
          (0, i.f)(s, t) ||
          r?.getValue(s)?.liveStyle !== void 0) &&
          (o[s] = n[s]);
      return o;
    },
  ]);
};
