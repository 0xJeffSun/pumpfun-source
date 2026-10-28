// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(196796);
  var t = e.i(272700);
  let r = (e) => {
    if (!1 !== e.resettable) {
      if (e.reset) return void e.reset();
      if (e.adapter.remove) return void e.adapter.remove();
      e.adapter.write(e.default);
    }
  };
  (e.s(
    [
      "t",
      0,
      (e) => {
        for (let a of (0, t.n)(e)) r(a);
      },
      "O",
      0,
      (e) => {
        r(t.k[e]);
      },
    ],
    138800,
  ),
    e.i(532757),
    e.i(547562),
    e.s([], 550675));
};
