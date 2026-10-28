// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "e",
    0,
    function (e) {
      return Array.isArray(e) && e.length > 0;
    },
    "y",
    0,
    function (e) {
      let t = new Set();
      return (e.forEach((e) => t.add(e)), Array.from(t));
    },
    "i",
    0,
    function (e, t) {
      let n = e.indexOf(t);
      n >= 0 && e.splice(n, 1);
    },
  ]);
};
