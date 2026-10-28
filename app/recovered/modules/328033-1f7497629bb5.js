// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  let e = 2n ** 256n - 1n;
  r.s([
    "f",
    0,
    ({ amount: r, decimals: i }) =>
      r === e
        ? "Maximum"
        : Intl.NumberFormat(void 0, { maximumFractionDigits: i }).format(
            Number(r) / 10 ** i,
          ),
  ]);
};
