// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  r.s([
    "g",
    0,
    function (r) {
      switch (r) {
        case "solana:mainnet":
          return "Solana";
        case "solana:devnet":
          return "Devnet";
        case "solana:testnet":
          return "Testnet";
      }
    },
  ]);
};
