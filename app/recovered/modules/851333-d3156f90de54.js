// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.tokenHoldersRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = o.z.enum([
      "solana",
      "ethereum",
      "bsc",
      "base",
      "monad",
      "robinhood",
      "hyperevm",
      "ink",
      "arc",
      "megaeth",
      "xlayer",
      "polygon",
      "arbitrum",
    ]);
  r.tokenHoldersRoutes = (0, n.defineRoutes)({
    "GET /token-holders/{mint}/count": {
      summary:
        "Get a token's unique holder count: TradeApi GetHolders holder_count, the coin-communities composite",
      params: o.z.object({ mint: o.z.string() }),
      query: o.z.object({
        chain: s
          .optional()
          .describe(
            "Chain the mint lives on; defaults to solana. A registry chain outside the tokenHolders set is refused with a 400",
          ),
      }),
      response: o.z.object({
        mint: o.z.string(),
        chain: s,
        networkId: o.z.number().describe("Codex's network id for the chain"),
        holderCount: o.z.number(),
      }),
    },
  });
};
