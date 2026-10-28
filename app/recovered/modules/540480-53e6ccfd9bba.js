// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.getCoinsByMintsBody =
      r.enrichedCoinDto =
      r.coinFollowedHoldersDto =
      r.followedHolderSummaryDto =
      r.FOLLOWED_HOLDER_DECORATION_DESCRIPTION =
      r.coinDto =
      r.coinPerpDto =
      r.tokenizedEquityIssuer =
      r.coinCardSource =
      r.coinAssetClass =
      r.coinOperatorWarningDto =
      r.coinOperatorWarningSeverity =
      r.OPERATOR_WARNING_DESCRIPTION =
      r.coinSecurityVerdictDto =
      r.coinMayhemDto =
      r.MAYHEM_COMPLETE_REASONS =
      r.MAYHEM_PAUSE_REASONS =
      r.MAYHEM_MODES =
      r.MAYHEM_STATES =
        void 0));
  let o = e.r(876543),
    n = e.r(617159),
    s = e.r(983689),
    a = e.r(890664);
  ((r.MAYHEM_STATES = ["enabled", "active", "paused", "completed"]),
    (r.MAYHEM_MODES = ["auto", "manual"]),
    (r.MAYHEM_PAUSE_REASONS = [
      "mcap_floor",
      "unprofitable",
      "low_reserves",
      "creator_paused",
      "below_initial_buy_floor",
      "low_sol_reserves",
      "low_stable_reserves",
      "unprofitable_fees",
    ]),
    (r.MAYHEM_COMPLETE_REASONS = [
      "max_age_reached",
      "sol_reserve_errors",
      "zero_base_amount",
      "sell_zero_amount",
      "buy_zero_amount",
      "mayhem_mode_ended",
      "overflow",
    ]));
  let i = "an open set",
    l = (0, n.openEnum)(
      r.MAYHEM_STATES,
      `Mayhem lifecycle state, ${i}; a value not listed here is still a coin in mayhem`,
    );
  ((r.coinMayhemDto = o.z.object({
    state: l.optional(),
    mode: (0, n.openEnum)(
      r.MAYHEM_MODES,
      `Trading mode, ${i}; served as stored, never defaulted here`,
    ).optional(),
    pause_reason: (0, n.openEnum)(
      r.MAYHEM_PAUSE_REASONS,
      `Why the coin is paused, ${i}; present only while state is paused`,
    ).optional(),
    complete_reason: (0, n.openEnum)(
      r.MAYHEM_COMPLETE_REASONS,
      `Why the coin completed, ${i}; present only once state is completed`,
    ).optional(),
  })),
    (r.coinSecurityVerdictDto = o.z.object({
      verdict: o.z
        .string()
        .describe(
          'Resolved token-security verdict: "blocked" | "warn" | "allow" | "unknown"',
        ),
      scope: o.z
        .string()
        .describe(
          'Hiding scope, meaningful only when verdict is "blocked": "all" hides the coin everywhere, "discovery" only from feeds',
        ),
      reasons: o.z
        .array(o.z.string())
        .describe('token-trust reason slugs, e.g. "honeypot", "rugpull"'),
      decided_by: o.z
        .string()
        .describe(
          'Resolver tier that decided: "blacklist" | "bypass" | "vendor" | "trust" | "soft" | "default"',
        ),
      provider: o.z
        .string()
        .describe(
          'Security data provider(s) consulted: "blockaid" | "goplus" | "both" | "solana-rpc" | "heuristic" | "none"',
        ),
      malicious_score: o.z
        .number()
        .optional()
        .describe("Provider-reported malicious score, when one was returned"),
      version: o.z.number().describe("Per-coin monotonic write version"),
      updated_at: o.z.number().optional().describe("Unix epoch milliseconds"),
      source: o.z.string().describe('Writer identity, e.g. "token-trust"'),
    })),
    (r.OPERATOR_WARNING_DESCRIPTION =
      "Operator-set warning, informational only; never gates trading"),
    (r.coinOperatorWarningSeverity = o.z.enum(["soft_scam", "hard_scam"])),
    (r.coinOperatorWarningDto = o.z.object({
      severity: r.coinOperatorWarningSeverity,
      message: o.z
        .string()
        .refine((e) => Array.from(e).length <= 500, "at most 500 code points")
        .meta({ maxLength: 500 })
        .describe("Operator-authored plain text; render as text, never markup"),
      updated_at: o.z
        .string()
        .datetime()
        .optional()
        .describe("ISO 8601; when the warning was last set"),
    })),
    (r.coinAssetClass = o.z.enum(["tokenized_stock", "pre_ipo_synthetic"])),
    (r.coinCardSource = o.z.enum(["indexed", "vendor"])),
    (r.tokenizedEquityIssuer = o.z.enum([
      "xstocks",
      "ondo",
      "backpack",
      "prestocks",
      "tessera",
      "robinhood",
      "coinbase",
      "binance",
    ])));
  let d = o.z
    .string()
    .nullable()
    .describe("USD as a decimal string; null when the store carries no mark");
  ((r.coinPerpDto = o.z
    .object({
      markPx: d,
      oraclePx: d,
      fundingRateHourly: o.z
        .string()
        .nullable()
        .describe("Hourly funding rate as a decimal string; null when unknown"),
      openInterestUsd: d,
      nextFundingAt: o.z.string().nullable().describe("ISO 8601"),
      asOf: o.z
        .string()
        .nullable()
        .describe("ISO 8601; when the HL market context was last observed"),
      stale: o.z
        .boolean()
        .describe(
          "true when the context is older than 120 s; perp values are the last observed",
        ),
      maxLeverage: o.z.number().int(),
      szDecimals: o.z.number().int(),
      onlyIsolated: o.z.boolean(),
      dex: o.z
        .string()
        .nullable()
        .describe("HIP-3 dex name; null on the main perp dex"),
      category: o.z
        .string()
        .nullable()
        .describe("crypto | stocks | commodities; null when unknown"),
      isDelisted: o.z.boolean(),
      volume24hUsd: d.describe(
        "24h notional volume in USD as a decimal string from the HL market context (dayNtlVlmUsd); falls back to the 24h fold window; null when neither is present",
      ),
      priceChange24hBps: o.z
        .number()
        .int()
        .nullable()
        .describe(
          "24h price change in bps from the HL market context (markPx vs prevDayPx); falls back to the 24h fold window; null when neither is present",
        ),
    })
    .describe("HyperCore perp state; set on perp rows only")),
    (r.coinDto = o.z.object({
      mint: o.z
        .string()
        .describe(
          "The only field guaranteed on every coin row; every other field can be absent",
        ),
      initialized: o.z.boolean().optional(),
      name: o.z
        .string()
        .optional()
        .describe(
          "Absent when coin-service holds no value and when the stored value is entirely bidi control characters (sanitised away); render the mint, never a blank string",
        ),
      symbol: o.z
        .string()
        .optional()
        .describe(
          "Absent when coin-service holds no value and when the stored value is entirely bidi control characters (sanitised away); render the mint, never a blank string",
        ),
      description: o.z
        .string()
        .optional()
        .describe(
          'Absent when coin-service holds no value and on Codex-fallback rows without one. Never the empty string: the server collapses "" to absent (TASK-5032), so presence alone says whether there is a value',
        ),
      image_uri: o.z
        .string()
        .optional()
        .describe(
          'Absent when coin-service holds no value and on Codex-fallback rows without one. Never the empty string: the server collapses "" to absent (TASK-5032), so presence alone says whether there is a value',
        ),
      image_backdrop: o.z
        .enum(["light", "dark"])
        .optional()
        .describe(
          "Surface to paint behind image_uri when it is a bare mark on transparency: light for a dark mark, dark for a light one. Absent = paint the image as-is (an opaque tile, an unassessed image, or no image). Served on HyperCore perp rows only, and only beside image_uri",
        ),
      metadata_uri: o.z
        .string()
        .optional()
        .describe(
          'Absent when coin-service holds no value and on every Codex-fallback row. Never the empty string: the server collapses "" to absent (TASK-5032), so presence alone says whether there is a value',
        ),
      video_uri: o.z.string().optional(),
      banner_uri: o.z.string().optional(),
      twitter: o.z.string().optional(),
      telegram: o.z.string().optional(),
      website: o.z.string().optional(),
      bonding_curve: o.z.string().optional(),
      associated_bonding_curve: o.z.string().optional(),
      creator: o.z
        .string()
        .optional()
        .describe(
          "Creator wallet of the coin; the system program id 11111111111111111111111111111111 when the coin was created without one. Absent when coin-service holds no value, on Codex-fallback rows and on unknown-creator rows",
        ),
      signer: o.z.string().optional(),
      created_timestamp: o.z
        .number()
        .optional()
        .describe("Unix epoch milliseconds"),
      complete: o.z
        .boolean()
        .optional()
        .describe("Whether the bonding curve has completed"),
      progress_bps: o.z
        .number()
        .int()
        .min(0)
        .max(1e4)
        .optional()
        .describe(
          "Starknet and NEAR only (chain starknet:SN_MAIN or near:mainnet): bonding-curve progress in basis points, absent off-curve",
        ),
      curve_phase: (0, n.openEnum)(
        ["curve", "complete", "graduated"],
        "Starknet and NEAR only: curve | complete (curve filled, graduation pending) | graduated; absent off-curve",
      ).optional(),
      virtual_sol_reserves: o.z.number().optional(),
      virtual_token_reserves: o.z.number().optional(),
      virtual_quote_reserves: o.z.number().optional(),
      total_supply: o.z
        .number()
        .optional()
        .describe(
          'Raw base-unit total supply as a JSON number; values above 2^53 are imprecise (BONK is 8799515941776938000 here and "8799515941776937984" in total_supply_str). Read total_supply_str when exactness matters. Absent when no supply is known or the raw value exceeds uint64; Codex-fallback rows apply that bound explicitly',
        ),
      total_supply_str: o.z
        .string()
        .optional()
        .describe(
          "Raw base-unit total supply as a base-10 integer string (Coin field 64, coin-service's *_supply_raw columns; apply base_decimals for a human value); string-typed because raw 18-decimal EVM values exceed uint64, and exact where total_supply is imprecise. Observed on every production row that has a supply, and Codex-fallback rows set it beside base_decimals or set neither, but presence is the upstream producer's behaviour, not one this server enforces. Absent when the producer holds no supply.",
        ),
      circulating_supply_str: o.z
        .string()
        .optional()
        .describe(
          "Raw on-chain circulating supply as a base-10 integer string; string-typed because raw 18-decimal EVM values exceed uint64",
        ),
      show_name: o.z.boolean().optional(),
      last_trade_timestamp: o.z
        .number()
        .optional()
        .describe("Unix epoch milliseconds"),
      king_of_the_hill_timestamp: o.z
        .number()
        .optional()
        .describe("Unix epoch milliseconds"),
      market_cap: o.z
        .number()
        .optional()
        .describe(
          "Legacy market cap in the chain's native unit (SOL on SVM), never converted to USD (#3272). On EVM rows applyUsdMarketCap overwrites it with the USD figure, so there it equals usd_market_cap and is absent with it (TASK-3732). Absent on Codex-fallback SVM rows.",
        ),
      market_cap_quote: o.z
        .number()
        .optional()
        .describe(
          "Market cap in quote_mint units (SOL, USDC, ...; Coin field 68), passed through from coin-service unchanged; absent when coin-service holds none and on every Codex-fallback row. A mark, not a spot ratio: the Raydium/DexScreener enrich re-base rewrites market_cap, market_cap_usd and usd_market_cap and leaves this field as coin-service last wrote it, and the SOL-scale market-cap write-back skips coins quoted in anything but SOL (shouldWriteBackMarketCap). usd_market_cap is served from market_cap_usd whenever that is set and falls back to this field only for a USDC-quoted coin with none (getUsdMarketCap).",
        ),
      market_cap_usd: o.z
        .number()
        .optional()
        .describe(
          "coin-service's authoritative USD market cap; unset only for a dormant coin that never had one populated. usd_market_cap is served from it.",
        ),
      market_id: o.z.string().optional(),
      inverted: o.z
        .boolean()
        .optional()
        .describe("Inverted (special) pricing mode"),
      nsfw: o.z.boolean().optional(),
      is_banned: o.z.boolean().optional(),
      hidden: o.z.boolean().optional(),
      real_sol_reserves: o.z.number().optional(),
      real_token_reserves: o.z.number().optional(),
      real_quote_reserves: o.z.number().optional(),
      updated_at: o.z.number().optional().describe("Unix epoch milliseconds"),
      livestream_ban_expiry: o.z
        .number()
        .optional()
        .describe("Unix epoch milliseconds"),
      last_reply: o.z.number().optional().describe("Unix epoch milliseconds"),
      reply_count: o.z.number().optional(),
      is_currently_live: o.z.boolean().optional(),
      thumbnail: o.z
        .string()
        .optional()
        .describe("Livestream thumbnail URL; set only while is_currently_live"),
      thumbnail_updated_at: o.z
        .number()
        .optional()
        .describe("Unix epoch milliseconds; set only while is_currently_live"),
      num_participants: o.z
        .number()
        .optional()
        .describe(
          "Livestream participant count; set only while is_currently_live",
        ),
      ath_market_cap: o.z.number().optional(),
      ath_market_cap_timestamp: o.z
        .number()
        .optional()
        .describe("Unix epoch milliseconds"),
      hide_banner: o.z.boolean().optional(),
      program: o.z
        .string()
        .optional()
        .describe(
          "Launch program of the mint; absent on off-platform mints (presence is the gate for swap-api / advanced-indexer reads)",
        ),
      token_program: o.z.string().optional(),
      usd_market_cap: o.z
        .number()
        .optional()
        .describe(
          "USD market cap, set only by this server (getUsdMarketCap / applyUsdMarketCap, TASK-3732): market_cap_usd when set (coin-service's figure, or the Raydium/DexScreener or Codex cap the server wrote into it), else market_cap_quote for a USDC-quoted SVM coin, else absent. Absent, never 0, when no USD figure is known (#3272 served DJT at $700 by converting a SOL cap); treat absence as unknown and sink it in value sorts.",
        ),
      price_usd: o.z
        .number()
        .optional()
        .describe(
          "USD price per whole token from the trade-api card (market.priceUsd), written by the card overlay like market_cap_usd and on TON rows; absent when the card carries none. Never computed by this server.",
        ),
      fdv_usd: o.z
        .number()
        .optional()
        .describe(
          "USD fully diluted valuation from the trade-api card (market.fdvUsd); absent when the card carries none. Never computed by this server.",
        ),
      source: r.coinCardSource
        .optional()
        .describe(
          "Who served the card overlaid on this row: vendor when card.source or card.market.source is DATA_SOURCE_VENDOR (the Codex gate), else indexed. Absent on a row no card with a market was applied to (legacy-only, Codex-fallback, no-market card).",
        ),
      is_multichain_fallback: o.z
        .boolean()
        .optional()
        .describe(
          "true when this server built the body from the market card because no indexed row exists for the address (coinCardTokenBodies); absent on every indexed row, whatever its source.",
        ),
      is_validated_mint: o.z
        .boolean()
        .optional()
        .describe(
          "true when coin-details-api validated the mint, false when it did not; absent when unknown (coin-details-api did not answer in time, failed or holds no record for the mint) and on every indexed row.",
        ),
      platform: o.z
        .string()
        .optional()
        .describe(
          "Launchpad slug. 'non_launchpad' marks a Solana coin served outside the pump venue. Absent means pump.",
        ),
      base_decimals: o.z.number().optional(),
      quote_decimals: o.z.number().optional(),
      quote_mint: o.z.string().optional(),
      quote_token_program: o.z
        .string()
        .optional()
        .describe(
          "SPL Token or Token-2022 program id owning the quote mint; absent on older rows",
        ),
      mayhem_state: l.optional(),
      mayhem: r.coinMayhemDto.optional(),
      security_verdict: r.coinSecurityVerdictDto
        .optional()
        .describe(
          "Token-security verdict attached by coin-service; absent until the verdict writer has processed the coin",
        ),
      operator_warning: r.coinOperatorWarningDto
        .optional()
        .describe(r.OPERATOR_WARNING_DESCRIPTION),
      is_test: o.z.boolean().optional(),
      username: o.z.string().optional(),
      profile_image: o.z.string().optional(),
      cto_address: o.z.string().optional(),
      cto_username: o.z.string().optional(),
      cto_profile_image: o.z.string().optional(),
      indexed_by_pump: o.z.boolean().optional(),
      is_cashback_enabled: o.z.boolean().optional(),
      is_holder_reward: o.z.boolean().optional(),
      transfer_fee_bps: o.z
        .number()
        .int()
        .min(0)
        .optional()
        .describe(
          "Base mint Token-2022 transfer fee in basis points (newer TransferFeeConfig step, Coin field 76); 0 = fee-less, absent = not inspected",
        ),
      transfer_hook_program: o.z
        .string()
        .optional()
        .describe(
          "Base-mint Token-2022 TransferHook program (base58). Empty string: inspected, no hook or revoked at graduation. Absent: not inspected.",
        ),
      is_charity: o.z.boolean().optional(),
      tokenized_agent: o.z.boolean().optional(),
      verified: o.z.boolean().optional(),
      raydium_pool: o.z.string().optional(),
      pump_swap_pool: o.z.string().optional(),
      depth: o.z
        .number()
        .int()
        .min(0)
        .optional()
        .describe(
          "Pump curve nesting level; 0 for SOL/USDC/whitelisted quotes and for coins created before the depth rung.",
        ),
      volume_1h_usd: o.z.number().optional(),
      volume_24h_usd: o.z.number().optional(),
      price_change_24h_bps: o.z.number().int().optional(),
      chain_id: o.z.string().optional(),
      multichain_family: o.z.number().optional(),
      protocol: o.z.string().optional(),
      pool_address: o.z.string().optional(),
      canonical_pool_liquidity_usd: o.z.number().optional(),
      boost_mode: o.z
        .string()
        .optional()
        .describe(
          'Boost-mode lifecycle state: "NONE" | "IN_PROGRESS" | "COMPLETED"',
        ),
      asset_class: r.coinAssetClass
        .nullable()
        .optional()
        .describe(
          "Tokenized-equity class of the coin, when it has one; null = classified as neither; absent = not classified on this path (coin-service rows)",
        ),
      issuer: r.tokenizedEquityIssuer
        .nullable()
        .optional()
        .describe("Tokenized-equity issuer; set only alongside asset_class"),
      underlying_symbol: o.z
        .string()
        .nullable()
        .optional()
        .describe(
          "Underlying equity ticker derived from the token symbol (issuer affix stripped where recognised); set only alongside asset_class",
        ),
      canonical_stock: o.z
        .boolean()
        .nullable()
        .optional()
        .describe(
          "Stock badge: true = the one canonical coin for its underlying stock, false = another variant of a stock that has a canonical coin, null = not a stock; absent = no verdict on this path (badge off either way)",
        ),
      chain: o.z
        .string()
        .optional()
        .describe(
          "CAIP-2 chain; set on a perp row (hlcore:mainnet, where mint is the HyperCore coin name verbatim: BTC, kPEPE, xyz:TSLA), on a TON row (ton:-239, where mint is the jetton master's friendly address), on a NEAR row (near:mainnet, where mint is the token's account id) and on a Starknet row (starknet:SN_MAIN, where mint is the token's 0x + 64 lowercase hex address)",
        ),
      assetClass: o.z
        .enum(["ASSET_CLASS_PERPETUAL", "ASSET_CLASS_NFT_LIKE"])
        .optional()
        .describe(
          "Asset class of the coin: ASSET_CLASS_PERPETUAL on a perp row, ASSET_CLASS_NFT_LIKE on a card body (collectible set, market cap and pool absent); absent on every token row. A card body is a coin-service miss the card door answered",
        ),
      perp: r.coinPerpDto.optional(),
      collectible: s.collectibleDto
        .optional()
        .describe(
          "NFT_LIKE card only: the card block (identity, grade, mark, insured value, buyback, listing); a card has no pool, so branch on it before mounting chart or trade panels. Absent on every token coin",
        ),
    })),
    (r.FOLLOWED_HOLDER_DECORATION_DESCRIPTION = `${a.RESOLVED_AVATAR_DECORATION_DESCRIPTION} Always null on a facepile whose holders carry no profile (coin-card facepiles).`),
    (r.followedHolderSummaryDto = o.z.object({
      userId: o.z.string(),
      username: o.z.string(),
      profileImageUrl: o.z.string(),
      isVerified: o.z.boolean(),
      verifiedBadgeVisible: o.z
        .boolean()
        .describe(
          "Badge rendering hint beside isVerified: show the checkmark only when both are true",
        ),
      resolvedAvatarDecoration: o.z
        .string()
        .nullable()
        .describe(r.FOLLOWED_HOLDER_DECORATION_DESCRIPTION),
      walletAddress: o.z
        .string()
        .nullable()
        .describe(
          "The holder's canonical SVM wallet (cc Profile.canonical_svm_wallet, else the legacy wallet_address); null when the account has none. Never an EVM address (an EVM value is mapped to its SVM wallet or dropped to null)",
        ),
    })),
    (r.coinFollowedHoldersDto = o.z.object({
      holders: o.z.array(r.followedHolderSummaryDto),
      totalCount: o.z
        .number()
        .describe(
          'Size of the whole followed-holder set for the coin, not just the embedded page — the "and N others" figure',
        ),
    })),
    (r.enrichedCoinDto = r.coinDto.extend({
      followed_holders: r.coinFollowedHoldersDto
        .nullable()
        .optional()
        .describe(
          "Viewer overlay, attached to every row or to none: present only when the request opted in via includeFollowedHolders; null when there is no viewer, the overlay degraded or the coin has no followed-holder group",
        ),
    })),
    (r.getCoinsByMintsBody = o.z.object({
      mints: o.z.array(o.z.string()).max(500),
      includeLiveStreamInfo: o.z.boolean().optional(),
      includeFollowedHolders: o.z
        .boolean()
        .optional()
        .describe(
          "Attach followed_holders per coin: requires an authenticated viewer; anonymous opt-in gets followed_holders: null.",
        ),
      followedHoldersLimit: o.z
        .number()
        .int()
        .min(1)
        .optional()
        .describe(
          "Followed holders returned per coin (default 3; values above 10 clamp to 10).",
        ),
    })));
};
