// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "U",
    0,
    ({ markAsOf: e, fetchedAt: t }, i = Date.now()) => {
      let r = e ?? t;
      return null !== r && !(r <= 0) && !(i <= 0) && i - r > 6e4;
    },
    "h",
    0,
    (e, t = Date.now()) =>
      null !== e.markAsOf
        ? t - e.markAsOf > 6e4
          ? "delayed"
          : "live"
        : null !== e.nextFundingAt && t - e.nextFundingAt > 3e5
          ? "delayed"
          : "live",
  ]);
};
