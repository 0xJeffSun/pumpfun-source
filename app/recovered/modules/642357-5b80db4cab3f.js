// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(449597);
  function r(e) {
    return (0, t.Y)(e) ? "usdc" : (0, t.i)(e) ? "unsupported" : "sol";
  }
  let a = ({ quoteMintAddress: e, hasRoutedSpend: t }) =>
    "unsupported" !== r(e) || t;
  e.s([
    "H",
    0,
    { sol: "/icons/sol-filled-logo.svg", usdc: "/usdc2.png" },
    "T",
    0,
    r,
    "r",
    0,
    a,
    "X",
    0,
    (e) =>
      a({
        quoteMintAddress: e.quote_mint,
        hasRoutedSpend: !1 !== e.initialized,
      }),
  ]);
};
