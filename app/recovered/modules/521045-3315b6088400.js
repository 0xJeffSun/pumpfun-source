// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(835436),
    i = e.i(177366);
  e.s([
    "f",
    0,
    (e) => {
      if (null === e) {
        let e = new t.I();
        throw (
          e.fatal({
            reason: "trade_provider_info_missing",
            cause: Error("perps signers unavailable"),
            operation: "resolve-signers",
          }),
          e
        );
      }
      return { ...e, api: i.f };
    },
  ]);
};
