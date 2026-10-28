// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let r = [
      12, 14, 16, 20, 24, 32, 36, 40, 48, 56, 64, 72, 80, 86, 96, 98, 110, 128,
      144, 256, 288, 300, 400, 600,
    ],
    t = new Set([
      "178x180",
      "178x250",
      "286x161",
      "294x96",
      "800x267",
      "1200x630",
      "1200x750",
      "1500x500",
    ]);
  e.s([
    "h",
    0,
    r,
    "l",
    0,
    ({ width: e, height: o }) => {
      let n = `${e}x${o}`;
      if (t.has(n)) return n;
      let l = Math.max(e ?? 0, o ?? 0);
      if (l <= 0) return "600x600";
      let a = r.find((e) => e >= l) ?? 600;
      return `${a}x${a}`;
    },
  ]);
};
