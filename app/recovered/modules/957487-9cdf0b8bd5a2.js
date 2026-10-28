// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "B",
    0,
    1,
    "m",
    0,
    (e, t, r) => {
      let i = r ?? e.valueUsd;
      return (
        !(
          e.isExited ||
          ((e, t = e.valueUsd) =>
            !((t ?? 0) > 0) && e.amountHeld > 0 && (e.costBasisUsd ?? 0) > 0)(
            e,
            i,
          )
        ) &&
        ((void 0 === t && !0 === e.dustFloorFiltered) ||
          (null != i && i < (t ?? 1)))
      );
    },
  ]);
};
