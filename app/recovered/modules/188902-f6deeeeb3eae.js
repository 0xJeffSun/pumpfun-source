// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.i(149502),
    e.s([
      "L",
      0,
      () =>
        "https://solana-mainnet.pump.fun/f15623a5-2536-4b47-9641-8abc239413ba",
      "M",
      0,
      () => {
        var e =
          "wss://solana-mainnet.pump.fun/2ba533b3-1d80-4fa8-8879-404ea05e068f";
        try {
          let t = new URL(e);
          if ("ws:" === t.protocol || "wss:" === t.protocol) return e;
          if ("https:" === t.protocol)
            return ((t.protocol = "wss:"), t.toString());
          if ("http:" === t.protocol)
            return ((t.protocol = "ws:"), t.toString());
        } catch {}
      },
    ]));
};
