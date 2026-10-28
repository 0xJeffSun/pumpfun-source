// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "t",
    0,
    [25, 50, 100],
    "P",
    0,
    [0.1, 0.5, 1],
    "w",
    0,
    [25, 100, 250],
    "W",
    0,
    [25, 50, 100],
    "G",
    0,
    (e) => Math.min(Math.max(e, 1), 100),
    "v",
    0,
    (e) => Math.min(Math.max(e, 1e-4), 1e3),
    "m",
    0,
    (e) => Math.min(Math.max(e, 0.01), 1e4),
    "k",
    0,
    (e) => Math.min(Math.max(e, 1), 100),
    "N",
    0,
    function (e, t, r) {
      if (!Array.isArray(e)) return t;
      let i = e.map((e) => Number(e)),
        s = [...t];
      for (let e = 0; e < 3; e++) {
        let t = i[e];
        "number" == typeof t && Number.isFinite(t) && t > 0 && (s[e] = r(t));
      }
      return s;
    },
  ]);
};
