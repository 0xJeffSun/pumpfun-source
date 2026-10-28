// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = new Map();
  e.s([
    "A",
    0,
    function (e) {
      let t = Math.max(0, Math.ceil(e / 1e3)),
        r = Math.floor(t / 60);
      return `${r}:${String(t % 60).padStart(2, "0")}`;
    },
    "g",
    0,
    function (e, r, l = Date.now()) {
      let a = Math.max(t.get(e) ?? 0, r ?? 0);
      return a <= 0 ? 0 : Math.max(0, a + 12e4 - l);
    },
    "r",
    0,
    function (e, r = Date.now()) {
      r > (t.get(e) ?? 0) && t.set(e, r);
    },
  ]);
};
