// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.coinsV3Routes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(540480);
  r.coinsV3Routes = (0, n.defineRoutes)({
    "GET /coins-v3/{address}": {
      summary: "Resolve a coin by address",
      params: o.z.object({
        address: o.z
          .string()
          .describe(
            "Any address the registry can resolve to a coin, not only the mint",
          ),
      }),
      query: o.z.object({
        includeLiveStreamInfo: o.z
          .boolean()
          .optional()
          .describe("Defaults to true"),
        chain: o.z
          .string()
          .optional()
          .describe(
            "CAIP-2 chain to pin a multi-chain 0x address to; 404 when it does not resolve there. hlcore:mainnet / hlcore:testnet pin a HyperCore perp by its coin name; ton:-239 pins a TON jetton master by its 48-char bounceable friendly form (any other address form is a 400) and serves a card-only row with chain_id ton:-239; near:mainnet pins a NEAR token by its account id (named, 64-hex or 0x-implicit; any other form is a 400) and serves a card-only row with chain_id near:mainnet; starknet:SN_MAIN pins a Starknet token by 0x + 1..64 hex in any case (canonicalised; any other form is a 400) and serves a card-only row with chain_id starknet:SN_MAIN, mint, quote_mint and pool_address as 0x + 64 lowercase hex and supply strings up to 78 digits; near:mainnet and starknet:SN_MAIN each answer 400 while its lane is dark",
          ),
      }),
      response: s.coinDto
        .extend({
          also_on: o.z
            .array(
              o.z.object({ chain_id: o.z.string(), address: o.z.string() }),
            )
            .optional()
            .describe(
              "Other chains the address resolves to as a coin, winner excluded; present only when non-empty",
            ),
        })
        .describe(
          "The resolved coin; an address that resolves to no coin, is hidden on resolve (a coin blocked everywhere while coinSecurityVerdictBlockedError is off), or is rejected under a pin answers a plain 404 instead",
        ),
      emits: ["COIN_BLOCKED"],
    },
  });
};
