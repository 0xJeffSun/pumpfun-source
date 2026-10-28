// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(938277);
  let r = "bounty_",
    i = (e) =>
      "number" != typeof e || !Number.isFinite(e) || e <= 0
        ? ""
        : (0, t.q)(e, e >= 1 ? 0 : 2, "$");
  e.s([
    "h",
    0,
    "#2a1d05",
    "d",
    0,
    "#f59e0b",
    "s",
    0,
    "BT",
    "k",
    0,
    "#fde68a",
    "H",
    0,
    r,
    "V",
    0,
    (e) => {
      let t = "string" == typeof e ? e : String(e);
      return t.startsWith(r) ? t.slice(r.length) : null;
    },
    "b",
    0,
    (e) =>
      !Number.isFinite(e) || e <= 0
        ? 0
        : e > 1e10
          ? Math.floor(e / 1e3)
          : Math.floor(e),
    "D",
    0,
    i,
    "R",
    0,
    (e) => {
      let t = e.title?.trim() || "Untitled bounty",
        r = i(e.rewardTotalUsd),
        l = `🏆 Bounty: ${t}`;
      return r ? `${l} \xb7 ${r} reward` : l;
    },
  ]);
};
