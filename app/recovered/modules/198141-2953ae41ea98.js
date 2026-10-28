// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(49997),
    i = t.i(49946),
    s = t.i(108645),
    r = t.i(711320);
  let n = new Set([i.f, s.f]);
  t.s([
    "f",
    0,
    function (t, i) {
      let s = (0, r.f)(t);
      return (
        n.has(s) || (s = e.u),
        s.getAnimatableNone ? s.getAnimatableNone(i) : void 0
      );
    },
  ]);
};
