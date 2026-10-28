// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(357500);
  let n = "0x0000000000000000000000000000000000000000";
  e.s([
    "W",
    0,
    n,
    "G",
    0,
    (e) => e?.toLowerCase() === n,
    "Q",
    0,
    (e) => (0, t.findChainByEvmChainId)(e)?.nativeCurrency.decimals ?? 18,
  ]);
};
