// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(350764),
    i = t.i(59778),
    s = t.i(570110);
  t.s([
    "f",
    0,
    function (t, r, n) {
      let a = (0, s.f)(t, r, n);
      for (let s in t)
        ((0, e.f)(t[s]) || (0, e.f)(r[s])) &&
          (a[
            -1 !== i.$.indexOf(s)
              ? "attr" + s.charAt(0).toUpperCase() + s.substring(1)
              : s
          ] = t[s]);
      return a;
    },
  ]);
};
