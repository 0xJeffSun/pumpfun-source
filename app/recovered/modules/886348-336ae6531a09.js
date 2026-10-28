// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.topHoldersRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = o.z.object({
      address: o.z.string(),
      amount: o.z.number(),
      isDev: o.z.boolean(),
      isSniper: o.z.boolean(),
      isBundler: o.z.boolean(),
      enteredAt: o.z
        .number()
        .nullable()
        .describe(
          "Unix SECONDS at which the wallet entered the coin; null when the entry is unknown",
        ),
    }),
    a = o.z
      .object({
        funder: o.z.string(),
        funderName: o.z.string().nullable(),
        funderType: o.z.string().nullable(),
        amountSol: o.z.number(),
        fundedAt: o.z.number(),
        signature: o.z.string(),
      })
      .describe(
        "The wallet's first SOL funding (fundedAt in Unix SECONDS); funderName/funderType null when the funder is unlabeled",
      ),
    i = s.extend({
      funding: a
        .nullish()
        .describe(
          "null or absent when unknown, never funded, or not requested (uapiHoldersFunding off)",
        ),
    }),
    l = o.z
      .number()
      .describe(
        "Total holders of the mint (GetHolders holder_count); never synthesized from a set without a count (503); the Solana legacy fill and a banned mint answer the legacy degraded shape (0)",
      );
  r.topHoldersRoutes = (0, n.defineRoutes)({
    "GET /coins/top-holders-v2/{mint}": {
      summary: "A mint's top holders, decorated, and its total holder count",
      params: o.z.object({ mint: o.z.string() }),
      query: o.z.object({
        chain: o.z
          .string()
          .optional()
          .describe(
            "CAIP-2 chain of the mint. Default solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp (Solana mainnet); eip155:<chain id> takes a 0x mint and answers 503 while the EVM holders lane is dark; hlcore:mainnet takes the HL coin key verbatim (BTC, xyz:TSLA) and serves its HyperCore perp holders as address rows (amount = |size|, every flag false, enteredAt null, ranked by position value); near:mainnet takes a NEAR account id verbatim (wrap.near, a 64-hex implicit id) and serves its NEP-141 holders as account-id rows (isSniper and isBundler false, totalHolders = the token holder count), 400 while the NEAR holders surface is dark; starknet:SN_MAIN takes a Starknet felt (0x + 1 to 64 hex digits, any case) and serves its holders as felt rows (0x + 64 lowercase hex, amount = raw / 10^decimals, isDev = the creator, isSniper and isBundler false, totalHolders = the token holder count), 400 while the Starknet holders surface is dark",
          ),
      }),
      response: o.z
        .object({
          topHolders: o.z
            .array(i)
            .describe(
              "At most 50 rows, balance-descending, every row decorated",
            ),
          totalHolders: l,
        })
        .describe(
          "503 with degraded_lanes [trade_api.get_holders] when the TradeApi lane is down or unconfigured, is saturated (resource_exhausted), answers a set without a holder count, or holds no card for an eip155 mint (not_found); a Solana not_found (a mint the coin registry lacks) fills from the Codex chain instead",
        ),
      errors: { 503: !0 },
      cacheTtlSeconds: 60,
    },
  });
};
