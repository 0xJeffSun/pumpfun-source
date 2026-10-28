// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.userActivityRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(76439),
    a = o.z.object({
      kind: o.z
        .enum(["create", "fee_claim"])
        .describe(
          "'create' = a coin this wallet created; 'fee_claim' = a creator-fee, social-fee, cashback or holder-reward payout to this wallet",
        ),
      feeKind: o.z
        .enum([
          "DISTRIBUTE_CREATOR_FEE",
          "COLLECT_CREATOR_FEE",
          "CLAIM_SOCIAL_FEE",
          "CLAIM_CASHBACK",
          "HOLDER_REWARD",
        ])
        .nullable()
        .describe(
          "fee_claim rows only: the fee instruction behind the payout; null on create rows",
        ),
      mint: o.z
        .string()
        .describe(
          "create: the coin created; fee_claim: the token paid out (WSOL for a SOL claim)",
        ),
      chainId: o.z
        .number()
        .describe("Codex network id (Solana: SVM rows only)"),
      tx: o.z.string().describe("Transaction signature"),
      timestamp: o.z
        .string()
        .describe("ISO-8601 of the transaction's block time"),
      amount: o.z
        .string()
        .describe(
          "Decimal string in whole tokens (whole SOL for a SOL claim): the created supply on create rows, the payout on fee_claim rows",
        ),
      solValue: o.z
        .number()
        .nullable()
        .describe(
          "fee_claim rows: SOL value of the payout; null on create rows and when the source carries none",
        ),
      counterparty: o.z
        .string()
        .nullable()
        .describe(
          "create: the creator address; fee_claim: the paying address; null when the source carries none",
        ),
      walletAddress: o.z
        .string()
        .describe(
          "The wallet the row was read for (a user id resolves to its canonical SVM wallet)",
        ),
    });
  r.userActivityRoutes = (0, n.defineRoutes)({
    "GET /user-activity/{id}": {
      summary:
        "One page of an account's coin creates and fee claims, newest first, proxied from profile-service — id is a Solana wallet, an EVM wallet (always the empty page: these are SVM rows only) or a user id (its canonical SVM wallet; none, squads included, = the empty page). types (CSV of create|fee_claim) is required. The web merges this feed with GET /user-trades/{id} by timestamp up to scannedThrough. An upstream failure is a 503, never an empty page.",
      params: o.z.object({ id: o.z.string() }),
      query: o.z.object({
        types: o.z
          .array(o.z.enum(["create", "fee_claim"]))
          .min(1)
          .max(2)
          .describe(
            "Comma-separated row kinds to serve, 1-2 distinct values of create|fee_claim",
          ),
        limit: o.z
          .number()
          .int()
          .min(1)
          .max(40)
          .optional()
          .describe("Rows per page; 20 when omitted"),
        cursor: o.z
          .string()
          .optional()
          .describe(
            "Opaque keyset cursor from the previous page's nextCursor; any other value is a 400",
          ),
      }),
      response: o.z.object({
        rows: o.z.array(a).describe("Newest first"),
        coins: o.z
          .array(s.userTradeCoin)
          .describe(
            "Token identity for this page's rows: one entry per distinct mint from the profile-service row metadata (name, symbol, icon); a mint profile-service has no metadata for is omitted, and so is a mint the security verdict hides; a degraded verdict read serves no entries",
          ),
        nextCursor: o.z
          .string()
          .nullable()
          .describe("null when there are no more results"),
        scannedThrough: o.z
          .string()
          .nullable()
          .describe(
            "ISO-8601: rows newer than this instant are complete on this feed (the merge frontier, set on an empty page too); null when nextCursor is null, except when profile-service cannot advance past the request cursor: then nextCursor is null and this is that cursor's instant",
          ),
      }),
    },
  });
};
