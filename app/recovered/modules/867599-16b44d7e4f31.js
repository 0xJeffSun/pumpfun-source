// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  r.s(
    [
      "A",
      0,
      "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
      "D",
      0,
      {
        "solana:mainnet": {
          EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: {
            symbol: "USDC",
            decimals: 6,
            address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          },
          Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB: {
            symbol: "USDT",
            decimals: 6,
            address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
          },
          So11111111111111111111111111111111111111112: {
            symbol: "SOL",
            decimals: 9,
            address: "So11111111111111111111111111111111111111112",
          },
        },
        "solana:devnet": {
          "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU": {
            symbol: "USDC",
            decimals: 6,
            address: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
          },
          EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS: {
            symbol: "USDT",
            decimals: 6,
            address: "EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS",
          },
          So11111111111111111111111111111111111111112: {
            symbol: "SOL",
            decimals: 9,
            address: "So11111111111111111111111111111111111111112",
          },
        },
        "solana:testnet": {},
      },
      "J",
      0,
      ["JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"],
      "L",
      0,
      1e9,
      "R",
      0,
      [
        "CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C",
        "CPMDWBwJDtYax9qW7AyRuVC19Cc4L4Vcy4n2BHAbHkCW",
      ],
      "S",
      0,
      "11111111111111111111111111111111",
      "T",
      0,
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      "a",
      0,
      "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
    ],
    683903,
  );
  let e = new Intl.NumberFormat(void 0, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
  r.s(
    [
      "g",
      0,
      function (r, o) {
        let i = parseFloat(r.toString()) / 1e9,
          a = e.format(o * i);
        return "$0.00" === a ? "<$0.01" : a;
      },
    ],
    867599,
  );
};
