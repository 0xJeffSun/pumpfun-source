// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(127864),
    r = t[" useId ".trim().toString()] || (() => void 0),
    o = 0;
  e.s([
    "f",
    0,
    function (e) {
      let [a, i] = t.useState(r());
      return (
        (0, n.f)(() => {
          e || i((e) => e ?? String(o++));
        }, [e]),
        e || (a ? `radix-${a}` : "")
      );
    },
  ]);
};
