// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(668487);
  e.s([
    "f",
    0,
    function (e) {
      let n = Math.max(0, Math.round(((0, t.t)() - e) / 1e3));
      if (n < 60) return `${n}s`;
      let a = Math.round(n / 60);
      if (a < 60) return `${a}m`;
      let s = Math.round(a / 60);
      return `${s}h`;
    },
  ]);
};
