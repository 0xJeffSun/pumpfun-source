// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    s = e.i(117330),
    n = e.i(662610),
    l = e.i(791898);
  e.s([
    "f",
    0,
    function () {
      let e,
        r = (0, t.c)(2),
        i = (0, n.f)();
      if (r[0] !== i) {
        let t = { squads: i };
        ((e = l.z.filter((e) => {
          if (!(0, s.r)(e)) return !1;
          let n = l.J[e].gate;
          return void 0 === n || t[n];
        })),
          (r[0] = i),
          (r[1] = e));
      } else e = r[1];
      return e;
    },
  ]);
};
