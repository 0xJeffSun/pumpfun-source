// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(761321),
    r = e.i(971370),
    i = e.i(549200),
    l = e.i(646908),
    s = e.i(605587),
    a = e.i(449597);
  (e.i(882238),
    e.s([
      "V",
      0,
      (e) => {
        if ((0, l.B)(e.chain_id))
          return {
            address: "",
            baseMint: e.mint,
            quoteMint: e.quote_mint ?? "",
            baseMintDecimals: e.base_decimals ?? 18,
            quoteMintDecimals: e.quote_decimals ?? 24,
          };
        if ((0, s.N)({ mint: e.mint, chainId: e.chain_id }))
          return {
            address: e.mint,
            baseMint: e.mint,
            quoteMint: e.quote_mint ?? "",
            baseMintDecimals: e.base_decimals ?? 18,
            quoteMintDecimals: e.quote_decimals ?? 18,
          };
        if ((0, l.L)(e.chain_id))
          return {
            address: e.pool_address ?? "",
            baseMint: e.mint,
            quoteMint: e.quote_mint ?? "",
            baseMintDecimals: e.base_decimals ?? 9,
            quoteMintDecimals: e.quote_decimals ?? 9,
          };
        if ((0, l._)(e.chain_id))
          return {
            address: e.pool_address ?? "",
            baseMint: e.mint,
            quoteMint: e.quote_mint ?? "",
            baseMintDecimals: e.base_decimals ?? 18,
            quoteMintDecimals: e.quote_decimals ?? 18,
          };
        let i = e.quote_mint && !(0, a.Q)(e.quote_mint) ? e.quote_mint : a.X;
        return {
          address:
            e.pool_address ??
            (0, t.n)(new r.PublicKey(e.mint), new r.PublicKey(i)).toBase58(),
          baseMint: e.mint,
          quoteMint: i,
          baseMintDecimals: e.base_decimals ?? 6,
          quoteMintDecimals: (0, a.x)(e.quote_mint, e.quote_decimals),
        };
      },
      "A",
      0,
      (e = "card") => {
        let t = (0, i.A)();
        return "panel" === e ? t.bgPrimary : t.bgSecondary;
      },
      "T",
      0,
      () => [
        "header_screenshot",
        "header_undo_redo",
        "header_fullscreen_button",
        "header_saveload",
        "header_settings",
        "header_indicators",
      ],
    ]));
};
