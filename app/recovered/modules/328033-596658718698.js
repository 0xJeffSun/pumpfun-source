// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  let e = 2n ** 256n - 1n;
  r.s([
    "f",
    0,
    ({ amount: r, decimals: o }) =>
      r === e
        ? "Maximum"
        : Intl.NumberFormat(void 0, { maximumFractionDigits: o }).format(
            Number(r) / 10 ** o,
          ),
  ]);
};
