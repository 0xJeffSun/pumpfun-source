// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "hlcore:mainnet",
    r = "ASSET_CLASS_PERPETUAL";
  e.s([
    "g",
    0,
    t,
    "l",
    0,
    10,
    "h",
    0,
    r,
    "H",
    0,
    100,
    "w",
    0,
    100,
    "C",
    0,
    ["4h", "1d", "1w", "1mo"],
    "o",
    0,
    ["crypto", "stocks", "commodities"],
    "p",
    0,
    45e-5,
    "x",
    0,
    (e) => e.chain === t && e.assetClass === r,
    "J",
    0,
    (e) => {
      let r = `${t}:`;
      if (!e.startsWith(r)) return null;
      let n = e.slice(r.length);
      return n.length > 0 ? n : null;
    },
    "v",
    0,
    (e) => `${t}:${e}`,
  ]);
};
