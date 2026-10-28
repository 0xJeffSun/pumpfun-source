// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = new Set([
    "withdraw_amount_exceeds_withdrawable",
    "insufficient_withdrawable",
    "insufficient_funds",
  ]);
  e.s([
    "B",
    0,
    (e) => void 0 !== e && t.has(e),
    "x",
    0,
    ({ account: e, hasPositions: t }) =>
      void 0 === e
        ? 0
        : t
          ? (e.withdrawableUsd ?? 0)
          : (e.withdrawableUsd ?? e.cashUsd),
    "u",
    0,
    (e) => {
      let r = ((e) => {
        if ("object" != typeof e || null === e) return;
        let t = Reflect.get(e, "reason");
        return "string" == typeof t && t.length > 0 ? t : void 0;
      })(e);
      return "AMOUNT_TOO_LOW" === r
        ? "too_small"
        : void 0 !== r && t.has(r)
          ? "hidden"
          : "ready";
    },
  ]);
};
