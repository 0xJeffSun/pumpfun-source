// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = ["memes", "stocks", "perps"],
    a = "memes",
    i = ["memes", "stocks"],
    n = (e) => "string" == typeof e && t.includes(e);
  e.s([
    "X",
    0,
    a,
    "U",
    0,
    {
      memes: "web.screeners.trending_memes",
      stocks: "web.screeners.trending_stocks",
      perps: "web.screeners.trending_perps",
    },
    "f",
    0,
    i,
    "B",
    0,
    (e) => (n(e) ? e : a),
    "_",
    0,
    n,
    "H",
    0,
    ({ perpsEnabled: e }) => (e ? t : i),
    "Z",
    0,
    ({ board: e, perpsEnabled: t }) => ("perps" !== e || t ? e : a),
  ]);
};
