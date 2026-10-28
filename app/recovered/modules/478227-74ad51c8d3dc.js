// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = {
    moderator: { baseCu: 12e4, perIxCu: 6e4 },
    platform: { baseCu: 15e4, perIxCu: 12e4 },
  };
  e.s([
    "J",
    0,
    14e5,
    "I",
    0,
    (e) => {
      let { baseCu: n, perIxCu: i } = t[e.kind];
      return Math.min(14e5, n + i * Math.max(0, e.innerIxCount));
    },
  ]);
};
