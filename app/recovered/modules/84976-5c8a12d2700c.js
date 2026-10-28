// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(656846),
    n = e.i(399015);
  let r = "11111111111111111111111111111111";
  e.s([
    "f",
    0,
    9,
    "d",
    0,
    r,
    "q",
    0,
    function (e) {
      return "usdc" === e ? t.f.decimals : 9;
    },
    "F",
    0,
    function (e) {
      return "usdc" === e ? t.f.mint : r;
    },
    "n",
    0,
    function (e, t) {
      return "usdc" === e ? 1 : (t ?? 0);
    },
    "g",
    0,
    function ({ mint: e, direction: t, preferredAsset: r }) {
      return "sell" === t && (0, n.G)(e) ? "usdc" : (r ?? "sol");
    },
  ]);
};
