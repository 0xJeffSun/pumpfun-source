// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "g",
    0,
    function (e) {
      switch (e) {
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
