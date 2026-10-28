// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(964355),
    l = e.i(352386),
    r = e.i(144685),
    n = e.i(1807);
  e.s([
    "f",
    0,
    function (e) {
      let i = (0, n.f)(() => (0, t.o)(e)),
        { isStatic: a } = (0, l.useContext)(r.f);
      if (a) {
        let [, t] = (0, l.useState)(e);
        (0, l.useEffect)(() => i.on("change", t), []);
      }
      return i;
    },
  ]);
};
