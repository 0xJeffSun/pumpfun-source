// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = 2n ** 256n - 1n;
  e.s([
    "f",
    0,
    ({ amount: e, decimals: n }) =>
      e === t
        ? "Maximum"
        : Intl.NumberFormat(void 0, { maximumFractionDigits: n }).format(
            Number(e) / 10 ** n,
          ),
  ]);
};
