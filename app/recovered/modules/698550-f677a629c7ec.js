// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.feesRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = ["5m", "30m", "1d"],
    a = ["1d", "7d", "30d"],
    i =
      "503 with degraded_lanes [trade_api.get_fees] when the TradeApi lane is down or unconfigured. No Cache-Control of its own (a JWT caller gets no-store): fees change per block",
    l = o.z.object({
      chainId: o.z.string().describe("CAIP-2 chain id"),
      address: o.z.string().describe("Address on that chain"),
    }),
    d = o.z.object({
      chainId: o.z.string().describe("CAIP-2 chain id of the quote asset"),
      address: o.z.string().describe("Quote asset address on that chain"),
      symbol: o.z.string().optional(),
      decimals: o.z.number().int().optional(),
    }),
    c = o.z.object({
      raw: o.z.string().describe("Integer base units as a decimal string"),
      decimals: o.z.number().int(),
    }),
    u = o.z.object({
      quote: d,
      amount: c
        .optional()
        .describe("Absent when the server knows no decimals for the quote"),
      usd: o.z
        .string()
        .optional()
        .describe(
          "USD as a decimal string, stamped at trade time; absent for claims, distributions and pre-2026-05-20 SOL rows",
        ),
    }),
    h = o.z.object({
      usd: o.z.string().optional().describe("USD as a decimal string"),
      native: o.z
        .string()
        .optional()
        .describe("The SOL-quoted leg as a decimal string"),
      nativeAsset: d.optional(),
    }),
    m = o.z.object({
      address: o.z.string(),
      shareBps: o.z.number().int().describe("Share in basis points of 10 000"),
      isAdmin: o.z.boolean(),
    }),
    p = o.z.object({
      cursor: o.z
        .string()
        .optional()
        .describe("Opaque base64url cursor from a previous page (nextCursor)"),
    }),
    b = o.z
      .string()
      .optional()
      .describe(
        "Opaque base64url cursor for the next page; absent on the last",
      ),
    g = o.z
      .string()
      .describe(
        "Wallet: a base58 Solana key or a 0x EVM account (EVM answers empty: no EVM fee events exist)",
      );
  r.feesRoutes = (0, n.defineRoutes)({
    "GET /fees/coin/{chainId}/{address}": {
      summary: "A coin's fee-sharing config and fee events, newest first",
      params: o.z.object({
        chainId: o.z
          .string()
          .describe(
            "CAIP-2 chain id: solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp (mainnet), eip155:<chain id>, starknet:SN_MAIN (Starknet mainnet; the address is 0x + 1 to 64 hex digits, any case, sent as 0x + 64 lowercase hex, any other form a 400; 400 while uapiStarknetCards is off), or near:mainnet (NEAR mainnet; the address is a NEAR account id, 2-64 lowercase chars: named (dotted or top-level), 64-hex or 0x-implicit, sent verbatim and never case-folded, any other form a 400; 400 while uapiNearCards is off)",
          ),
        address: o.z.string().describe("Coin address on that chain"),
      }),
      query: p,
      response: o.z
        .object({
          coin: l,
          sharing: o.z
            .object({
              configAddress: o.z
                .string()
                .describe("The on-chain sharing-config account"),
              admin: o.z.string(),
              adminRevoked: o.z.boolean(),
              shareholders: o.z.array(m),
              asOf: o.z
                .number()
                .int()
                .optional()
                .describe("Unix ms the config was last written"),
            })
            .optional()
            .describe("Absent when the coin has no fee-sharing config"),
          events: o.z
            .array(
              o.z.object({
                kind: o.z.enum([
                  "coin_created",
                  "config_created",
                  "config_updated",
                  "admin_transferred",
                  "admin_revoked",
                  "config_reset",
                  "distribution",
                ]),
                blockTime: o.z.number().int().describe("Unix ms"),
                txId: o.z
                  .string()
                  .describe("Empty on the synthesized coin_created event"),
                ordinal: o.z
                  .string()
                  .optional()
                  .describe(
                    "OrdinalKey <blockId>-<txIndex>-<eventIndex>-<blockTimeMs>; absent on the synthesized coin_created event",
                  ),
                shareholders: o.z
                  .array(m)
                  .optional()
                  .describe("The shareholder set after a config event"),
                oldAdmin: o.z
                  .string()
                  .optional()
                  .describe("admin_transferred only"),
                newAdmin: o.z
                  .string()
                  .optional()
                  .describe("admin_transferred only"),
                distributed: u
                  .optional()
                  .describe(
                    "distribution only: the total paid out, usd absent; a 0 distribution is still listed",
                  ),
                recipients: o.z
                  .array(
                    o.z.object({
                      address: o.z.string(),
                      shareBps: o.z
                        .number()
                        .int()
                        .describe("Share in basis points of 10 000"),
                      amount: c
                        .optional()
                        .describe(
                          "In the distribution quote; absent when the server knows no decimals for it",
                        ),
                    }),
                  )
                  .optional()
                  .describe("distribution only"),
              }),
            )
            .describe(
              "Newest first, 50 per page; coin_created closes the last page when the registry knows the creator",
            ),
          nextCursor: b,
        })
        .describe(i),
    },
    "GET /fees/creator/{address}": {
      summary: "A creator's fee earnings, claimable balance and series",
      params: o.z.object({ address: g }),
      query: o.z.object({
        interval: o.z
          .enum(s)
          .optional()
          .describe(
            "Series bucket width, default 1d; 5m only with period 1d, 30m with 1d or 7d, else 400",
          ),
        period: o.z
          .enum(a)
          .optional()
          .describe("Series window ending now, default 30d"),
        mint: o.z
          .string()
          .optional()
          .describe(
            "Narrow the earnings to one Solana coin (base58 mint); 400 with an EVM creator",
          ),
      }),
      response: o.z
        .object({
          creator: o.z.string().describe("The creator wallet as requested"),
          interval: o.z.enum(s).describe("The series width served"),
          period: o.z.enum(a).describe("The series window served"),
          earned: o.z.array(u).describe("All-time earnings per quote"),
          claimable: h
            .optional()
            .describe(
              "Store-derived unclaimed balance (earned minus collected, floored at 0); the claim transaction re-checks it",
            ),
          isClaimable: o.z.boolean(),
          series: o.z
            .array(
              o.z.object({
                bucketStart: o.z
                  .number()
                  .int()
                  .describe("Bucket start, unix ms"),
                earned: h,
                byQuote: o.z.array(u),
              }),
            )
            .describe("Newest bucket first"),
          asOf: o.z
            .number()
            .int()
            .optional()
            .describe(
              "Unix ms of the newest bucket end read; absent when nothing was read",
            ),
        })
        .describe(i),
    },
    "GET /fees/creator/{address}/unswept": {
      summary:
        "A creator's coins with creator fees still in the on-chain bucket (unswept), by USD; what a claim must sweep",
      params: o.z.object({ address: g }),
      response: o.z
        .object({
          creator: o.z.string().describe("The creator wallet as requested"),
          slot: o.z
            .number()
            .int()
            .describe(
              "The chain slot the buckets were read at; 0 when the server stamped none. The claim transaction re-reads the chain",
            ),
          examined: o.z
            .number()
            .int()
            .describe("Pump coins of the creator the server examined"),
          truncated: o.z
            .boolean()
            .describe(
              "True only when the creator has more than 10,000 open buckets: the response then carries the 10,000 largest, so a caller that sweeps and re-reads converges",
            ),
          coins: o.z
            .array(
              o.z.object({
                mint: o.z.string().describe("The coin mint (base58)"),
                totalUsd: o.z
                  .string()
                  .optional()
                  .describe(
                    "Sum of the bucket USD values as a decimal string; absent when no bucket quote has a mark",
                  ),
                bondingCurveSweepRequired: o.z
                  .boolean()
                  .describe(
                    "A claim must prepend the pump (bonding curve) program's sweep_creator_fee",
                  ),
                poolSweepRequired: o.z
                  .boolean()
                  .describe(
                    "A claim must prepend the pump-amm (pool) program's sweep_creator_fee",
                  ),
                buckets: o.z
                  .array(
                    o.z.object({
                      venue: o.z
                        .enum(["bonding_curve", "pool"])
                        .describe(
                          "bonding_curve = the pump creator vault, pool = the pump-amm coin-creator vault",
                        ),
                      account: o.z
                        .string()
                        .describe(
                          "The on-chain vault account holding the fees",
                        ),
                      quote: d.describe("The asset the bucket holds"),
                      amount: c.describe(
                        "Unswept balance in base units at slot; the claim transaction re-reads the chain",
                      ),
                      usd: o.z
                        .string()
                        .optional()
                        .describe(
                          "USD value as a decimal string at the current quote mark; absent when the quote has no mark",
                        ),
                    }),
                  )
                  .describe("Each non-empty on-chain bucket of the coin"),
              }),
            )
            .describe(
              "Coins with unswept creator fees, sorted by totalUsd descending",
            ),
        })
        .describe(i),
    },
    "GET /fees/referral/{wallet}": {
      summary:
        "A referrer's referral-vault withdrawals: per-quote totals with USD at the block-time mark, and the withdrawal page",
      params: o.z.object({
        wallet: o.z
          .string()
          .describe("Referrer wallet: a base58 Solana key, else 400"),
      }),
      query: o.z.object({
        period: o.z
          .enum(a)
          .optional()
          .describe(
            "Window ending now for the totals and the page; absent = lifetime",
          ),
        page: o.z
          .string()
          .optional()
          .describe("Opaque base64url cursor from a previous page (next)"),
      }),
      response: o.z
        .object({
          referrer: o.z.string().describe("The referrer wallet as requested"),
          withdrawn: o.z
            .array(u)
            .describe(
              "Withdrawn from the referral vault in the window, per quote, SOL first; usd sums the priced withdrawals at their block-time marks, absent when none is priced",
            ),
          withdrawnUsd: o.z
            .string()
            .optional()
            .describe(
              "Sum of the priced quotes as a USD decimal string; absent when none is priced",
            ),
          withdrawals: o.z
            .array(
              o.z.object({
                ordinal: o.z
                  .string()
                  .describe(
                    "OrdinalKey <blockId>-<txIndex>-<eventIndex>-<blockTimeMs>",
                  ),
                txId: o.z
                  .string()
                  .describe("The withdraw transaction signature"),
                blockTime: o.z.string().describe("Block time, ISO-8601 UTC"),
                amount: u.describe(
                  "The withdrawn leg; usd at the block-time mark, absent when unpriced",
                ),
              }),
            )
            .describe("One row per withdraw leg, newest first"),
          next: o.z
            .string()
            .optional()
            .describe(
              "Opaque base64url cursor for the next page; absent on the last",
            ),
          asOf: o.z
            .number()
            .int()
            .optional()
            .describe(
              "Unix ms the figures are current to; absent when unstamped",
            ),
        })
        .describe(
          `${i}. 503 (unimplemented) until the trade API serves the referral scope`,
        ),
    },
    "GET /fees/shareholder/{id}": {
      summary: "A wallet's fee-sharing earnings per coin, with wallet totals",
      params: o.z.object({ id: g }),
      query: p,
      response: o.z
        .object({
          coins: o.z
            .array(
              o.z.object({
                coin: l,
                configAddress: o.z
                  .string()
                  .describe("The on-chain sharing-config account"),
                totalEarned: o.z
                  .array(u)
                  .describe("Accrued to the config, per quote, usd present"),
                totalClaimed: o.z
                  .array(u)
                  .describe(
                    "Distributed from the config, per quote, usd absent",
                  ),
                totalUnclaimed: o.z
                  .array(u)
                  .describe(
                    "max(earned - distributed, 0) per quote, usd absent",
                  ),
                shareholderEarned: o.z
                  .array(u)
                  .describe("claimed + unclaimed for this wallet"),
                shareholderClaimed: o.z.array(u),
                shareholderUnclaimed: o.z
                  .array(u)
                  .describe("floor(unclaimed x shareBps / 10 000)"),
                shareBps: o.z
                  .number()
                  .int()
                  .describe("Current share in basis points of 10 000"),
              }),
            )
            .describe("Sorted by mint, 20 per page"),
          totals: o.z
            .object({
              earned: o.z.array(u),
              claimed: o.z.array(u),
              unclaimed: o.z.array(u),
            })
            .describe(
              "Across every coin of the wallet (up to 500; partial beyond), not just this page",
            ),
          nextCursor: b,
        })
        .describe(i),
    },
    "GET /fees/holder-rewards": {
      summary:
        "One page of the holder-rewards book per request: fees accrued to each vault, payouts, and book totals",
      query: o.z.object({
        cursor: o.z
          .string()
          .optional()
          .describe(
            "Opaque base64url cursor from a previous page (next); exclusive with the page parameters (sort, direction, quote, payingOnly, page, limit)",
          ),
        sort: o.z
          .enum([
            "accrued",
            "accruedNow",
            "distributed",
            "lastPayout",
            "wallets",
            "trades",
            "lastTrade",
          ])
          .optional()
          .describe(
            "Book-wide sort; default accrued. distributed orders by payouts.paidToHoldersUsd at the current quote mark; accruedNow and distributed omit coins whose quote has no mark or decimals (totals.unpricedCoinCount)",
          ),
        direction: o.z
          .enum(["asc", "desc"])
          .optional()
          .describe("Default desc"),
        quote: o.z
          .string()
          .regex(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/)
          .optional()
          .describe("Canonical quote mint filter (base58 mint)"),
        payingOnly: o.z
          .boolean()
          .optional()
          .describe("Only coins with a holder payout"),
        page: o.z
          .number()
          .int()
          .min(1)
          .optional()
          .describe("1-based page; default 1"),
        limit: o.z
          .number()
          .int()
          .min(1)
          .max(2e3)
          .optional()
          .describe("Rows per page; default 50"),
      }),
      response: o.z
        .object({
          generatedAt: o.z
            .string()
            .describe(
              "ISO instant the book's open-day fold last ran (every 60 s)",
            ),
          coins: o.z
            .array(
              o.z.object({
                mint: o.z.string(),
                holderRewardsPda: o.z
                  .string()
                  .describe(
                    'Holder-rewards PDA ["holder-rewards", mint] under the pump program',
                  ),
                name: o.z.string().nullable(),
                symbol: o.z.string().nullable(),
                imageUri: o.z.string().nullable(),
                createdAt: o.z.string().nullable(),
                lastTradeAt: o.z.string().nullable(),
                marketCapUsd: o.z.number().nullable(),
                athMarketCapUsd: o.z
                  .number()
                  .nullable()
                  .describe(
                    "ATH market cap in USD, as the coin registry stores it (no conversion); null when unknown",
                  ),
                isGraduated: o.z.boolean(),
                isLive: o.z.boolean(),
                isNsfw: o.z.boolean(),
                quoteMintAddress: o.z.string().nullable(),
                socials: o.z.object({
                  twitter: o.z.string().nullable(),
                  telegram: o.z.string().nullable(),
                  website: o.z.string().nullable(),
                }),
                accrued: o.z
                  .object({
                    quoteMintAddress: o.z.string(),
                    quote: o.z
                      .string()
                      .nullable()
                      .describe("Whole quote units as a decimal string"),
                    usdAtTrade: o.z.string().nullable(),
                    usdNow: o.z.string().nullable(),
                    numTrades: o.z.number().int(),
                    firstTradeAt: o.z.string().nullable(),
                    lastTradeAt: o.z.string().nullable(),
                  })
                  .nullable(),
                payouts: o.z
                  .object({
                    quoteMintAddress: o.z.string().nullable(),
                    paidToHolders: o.z
                      .string()
                      .nullable()
                      .describe(
                        "Atomic units of quoteMintAddress; null when the index has no holder payout for the coin",
                      ),
                    paidToHoldersQuote: o.z.string().nullable(),
                    paidToHoldersUsd: o.z
                      .string()
                      .nullable()
                      .describe(
                        "paidToHoldersQuote times quotes[quoteMintAddress].usdPrice as a decimal string; null when either is unknown",
                      ),
                    opsCharge: o.z.string().nullable(),
                    payoutCount: o.z.number().int(),
                    recipientCount: o.z.number().int(),
                    lastPayoutAt: o.z.string().nullable(),
                  })
                  .nullable(),
              }),
            )
            .describe(
              "Ordered by the sort in page mode; cursor mode orders by accrued.usdAtTrade, then usdNow, descending, then mint",
            ),
          next: o.z
            .string()
            .nullable()
            .describe(
              "Opaque cursor into the book's default order, only in cursor mode (no page/limit/sort); null on the last page and in page mode. Pages hold up to 2,000 coins ordered by accrued.usdAtTrade descending; a coin can move between pages as the book folds every 60 s; totals and quotes describe the whole book, not the page.",
            ),
          quotes: o.z
            .record(
              o.z.string(),
              o.z.object({
                mint: o.z.string(),
                decimals: o.z.number().nullable(),
                usdPrice: o.z.number().nullable(),
                symbol: o.z.string().nullable(),
                name: o.z.string().nullable(),
                imageUri: o.z
                  .string()
                  .nullable()
                  .describe(
                    "Quote registry logo URL; null when the registry row has none",
                  ),
              }),
            )
            .describe(
              "Every quote mint the coins accrued or paid in, and every byQuote mint; symbol, name and imageUri from the quote registry when it lists the mint",
            ),
          totals: o.z.object({
            coinCount: o.z.number().int(),
            payingCount: o.z.number().int(),
            accruedUsdAtTrade: o.z.string(),
            accruedUsdNow: o.z.string(),
            unpricedCoinCount: o.z.number().int(),
            walletsRewarded: o.z
              .number()
              .int()
              .describe("Distinct wallets paid, summed per coin"),
            walletsRewardedDistinct: o.z
              .number()
              .int()
              .describe(
                "Distinct wallets paid at least once across the book; a wallet paid by two coins counts once",
              ),
            payoutCount: o.z
              .number()
              .int()
              .describe("Sum of payouts.payoutCount over the book"),
          }),
          matchingCount: o.z
            .number()
            .int()
            .describe(
              "Coins matching the request's filter, the paging denominator; equals totals.coinCount with no filter",
            ),
          offset: o.z
            .number()
            .int()
            .describe("Offset of coins[0] in the sorted, filtered set"),
          byQuote: o.z
            .array(
              o.z.object({
                quoteMintAddress: o.z.string(),
                coinCount: o.z.number().int(),
                payingCount: o.z.number().int(),
                accrued: o.z
                  .string()
                  .describe(
                    "Atomic units of quoteMintAddress (decimals in quotes)",
                  ),
                accruedUsdAtTrade: o.z.string().nullable(),
                paid: o.z
                  .string()
                  .describe(
                    "Atomic units of quoteMintAddress (decimals in quotes)",
                  ),
              }),
            )
            .describe("Per-quote facets over the whole book, unfiltered"),
        })
        .describe(i),
    },
    "GET /fees/me": {
      summary:
        "The authenticated user's platform-fee bypass: how much of the platform fee they are exempt from, in whole basis points, the referral code they applied, their referrer's canonical wallets and fee split, and the referral fee split they earn as a referrer",
      response: o.z.object({
        feeBypass: o.z
          .number()
          .describe(
            "Share of the platform fee the viewer bypasses, in whole basis points (0-10000; 10000 = the whole platform fee waived). 0 = the viewer pays the full platform fee, also for an account the registry does not know yet. Set by operators",
          ),
        referredBy: o.z
          .string()
          .optional()
          .describe(
            "The referral code the viewer applied: the referrer's username at apply time (renames do not update it). Absent when nobody referred the viewer",
          ),
        referredByWallet: o.z
          .string()
          .optional()
          .describe(
            "The referrer's current canonical Solana wallet (base58): where the referral fee is paid. Absent when nobody referred the viewer, when the referrer's account is gone, or when the referrer has no canonical Solana wallet",
          ),
        referredByEvmWallet: o.z
          .string()
          .optional()
          .describe(
            "The referrer's current canonical EVM wallet (0x-hex). Absent under the same rules as referredByWallet; nothing pays on it yet",
          ),
        referredByFeeSplit: o.z
          .number()
          .optional()
          .describe(
            "The referrer's referral trade fee split: how much of the viewer's discounted referral trade fee goes to the referrer (the rest to the callout vault), in whole basis points of that fee (0-10000; 2500 = a quarter). Set by operators on the referrer. Absent when referredByWallet's absence rules apply or no operator has set a split for the referrer: the client applies its default. 0 is a real value (the referrer earns nothing), distinct from absent",
          ),
        referralTradeFeeSplit: o.z
          .number()
          .optional()
          .describe(
            "The share of the discounted referral trade fee the viewer earns as a REFERRER on their referees' trades, in whole basis points of that fee (0-10000; 2500 = a quarter). Set by operators. Absent when no operator has set one: the client applies its default split (25% at launch). 0 is a real value (the referrer earns nothing), distinct from absent",
          ),
      }),
    },
  });
};
