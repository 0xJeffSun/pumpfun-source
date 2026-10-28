// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.feedAssetClass = void 0),
    (r.feedAssetClass = e
      .r(876543)
      .z.enum(["coin", "stock", "perp", "pack"])
      .describe(
        "perp = a perp (hlcore) row, pack = a graded-card row, stock = a coin coin-service classifies as tokenized equity, coin = every other coin row (a missed coin card reads as coin)",
      )));
};
