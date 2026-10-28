// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.userPositionDto =
      r.groupHoldersDto =
      r.groupHolderDto =
      r.positionCoinDto =
      r.mintPositionDto =
        void 0));
  let o = e.r(876543),
    n = e.r(421504),
    s = e.r(983689),
    a = e.r(890664),
    i =
      "ASSET_CLASS_NFT_LIKE rows only: the card (identity, grade, mark, insured value, buyback, listing); absent on every token row";
  ((r.mintPositionDto = o.z.object({
    coinMint: o.z.string(),
    chainId: o.z
      .number()
      .nullable()
      .describe(
        "Codex network id of this row's chain; positions are keyed (wallet, mint, chain), so userId alone never keys a row. 0 on rows requested with chain=hlcore:*, as coin-communities sends it (HyperCore has no Codex id, and no Codex id is 0), null on near:mainnet, starknet:SN_MAIN and ton:-239 rows: key those by chain, and tell a perp row by chain and assetClass, never by chainId. Typed nullable so older readers still parse",
      ),
    chain: o.z
      .string()
      .optional()
      .describe(
        "CAIP-2 chain of an hlcore row (hlcore:mainnet), a NEAR row (near:mainnet, walletAddress the NEAR account id), a Starknet row (starknet:SN_MAIN, coinMint and walletAddress 0x + 64 lowercase hex) or a TON row (ton:-239, coinMint the EQ jetton master, walletAddress the TON wallet); absent on every other spot row",
      ),
    assetClass: o.z
      .enum(["ASSET_CLASS_TOKEN", "ASSET_CLASS_PERPETUAL"])
      .optional()
      .describe(
        "ASSET_CLASS_PERPETUAL on hlcore rows; absent on every spot row",
      ),
    perp: n.mintPositionPerpDto
      .nullable()
      .optional()
      .describe(
        "hlcore rows only: the HyperCore position (live while open, the frozen close once closed); null when the position has no side. On these rows amountHeld = |size|, costBasisUsd = margin (null when unknown), amountBought = |size|, amountBoughtUsd = |size| x entry, pnlPercentage = ROE",
      ),
    userId: o.z
      .string()
      .describe(
        "Empty string for wallet-only holders with no registry profile",
      ),
    userName: o.z
      .string()
      .describe(
        "Empty string for wallet-only holders with no registry profile",
      ),
    profileImage: o.z.string().nullable(),
    walletAddress: o.z
      .string()
      .nullable()
      .describe(
        "The chain-correct HOLDING wallet, not the profile's canonical wallet; EVM addresses are scrubbed to SVM before serving. On near:mainnet, starknet:SN_MAIN and ton:-239 rows it is the chain wallet as coin-communities sends it",
      ),
    profileWallet: o.z
      .string()
      .nullable()
      .optional()
      .describe(
        "near:mainnet, starknet:SN_MAIN and ton:-239 rows only: the holder profile's canonical SVM wallet beside the chain walletAddress; null when none is linked or it equals walletAddress. Absent on every other row",
      ),
    isVerified: o.z.boolean(),
    verifiedBadgeVisible: o.z
      .boolean()
      .describe(
        "Badge rendering hint beside isVerified: show the checkmark only when both are true",
      ),
    resolvedAvatarDecoration: o.z
      .string()
      .nullable()
      .optional()
      .describe(a.CACHED_RESOLVED_AVATAR_DECORATION_DESCRIPTION),
    xUsername: o.z.string().nullable(),
    accountKind: o.z
      .enum(["person", "group"])
      .describe(
        "'group' = a squad row: route the author press on userId + accountKind, never the wallet",
      ),
    amountHeld: o.z.number(),
    pnlUsd: o.z.number().nullable(),
    pnlPercentage: o.z.number().nullable(),
    realizedPnlUsd: o.z
      .number()
      .describe("pnlUsd = realizedPnlUsd + read-time unrealized"),
    costBasisAmount: o.z
      .number()
      .describe("Net cost basis; avg entry = costBasisUsd / costBasisAmount"),
    costBasisUsd: o.z.number().nullable(),
    amountBoughtUsd: o.z
      .number()
      .nullable()
      .describe("Lifetime buy total, never reduced by sells"),
    receiptBasisUsd: o.z
      .number()
      .nullable()
      .describe(
        "Lifetime USD basis booked for transfer-in receipts, never reduced; pnlPercentage = pnlUsd / max(amountBoughtUsd + receiptBasisUsd, open costBasisUsd). Null on rows not yet re-folded",
      ),
    amountBought: o.z
      .number()
      .nullable()
      .describe("Null until cc seeds the row, and stays null on EVM rows"),
    callout: n.calloutDto.nullable(),
    profile: a.normalizedProfile
      .nullable()
      .optional()
      .describe(
        "Present only when includeProfile=true, null there for wallet-only holders with no profile",
      ),
    recommendationId: o.z
      .string()
      .optional()
      .describe(
        "RANKED path only: the ranking response id, the join key for impression/action attribution. Absent — never null — on every other sort",
      ),
    recommendationRank: o.z
      .number()
      .optional()
      .describe("This row's 1-based rank in that RANKED ranking response"),
    lowQuality: o.z
      .boolean()
      .optional()
      .describe(
        "GET /mint-positions rows only, never on /followed-holders rows: true when cc tags the holder low quality, i.e. the holding wallet is external (non-Privy) custody AND under 24h old AND holds under $5 at the served mark. Clients roll tagged rows up behind a show-more row. Absent when no verdict is available (TASK-5709)",
      ),
  })),
    (r.positionCoinDto = o.z.object({
      name: o.z.string().nullable(),
      symbol: o.z.string().nullable(),
      imageUri: o.z.string().nullable(),
      imageBackdrop: o.z
        .enum(["light", "dark"])
        .nullable()
        .optional()
        .describe(
          "Surface to paint behind imageUri when it is a bare mark on transparency: light for a dark mark, dark for a light one. null = paint the image as-is (an opaque tile, an unassessed image, no image, or any non-perp coin). Absent on routes that do not serve perp coin cards",
        ),
      marketCapUsd: o.z.number().nullable(),
      totalSupply: o.z
        .number()
        .nullable()
        .describe(
          "UI-normalized supply (raw / 10^decimals) on the basis marketCapUsd is computed on: circulating supply when an EVM record carries one (it may exceed total), else total supply — implied unit price = marketCapUsd / totalSupply; null means do not derive a price from marketCapUsd",
        ),
      protocol: o.z
        .string()
        .nullable()
        .describe(
          "The schemas Protocol slug coin-service stores for the coin's birth venue (`pons`, `flap`, `uniswap_v3`, `pump`); an EVM coin's launchpad identity",
        ),
      platform: o.z
        .string()
        .nullable()
        .describe(
          "Solana launchpad platform (`bonk`, `bags`, `believe`); null on EVM rows",
        ),
      program: o.z
        .string()
        .nullable()
        .describe(
          "Solana program slug (`pump`, `meteora_dbc`, `raydium_launchpad`); null on EVM rows",
        ),
      collectible: s.collectibleDto.optional().describe(i),
    })),
    (r.groupHolderDto = o.z.object({
      userId: o.z.string(),
      username: o.z.string(),
      profileImageUrl: o.z.string().nullable(),
      isVerified: o.z.boolean(),
      verifiedBadgeVisible: o.z
        .boolean()
        .describe(
          "Badge rendering hint beside isVerified: show the checkmark only when both are true",
        ),
      amountHeld: o.z
        .number()
        .describe("The member's open holdings summed across their wallets"),
    })),
    (r.groupHoldersDto = o.z.object({
      holders: o.z
        .array(r.groupHolderDto)
        .describe("Sorted amountHeld desc, server-capped"),
      totalCount: o.z.number().describe("The uncapped figure"),
    })));
  let l = o.z.object({
    side: o.z.string().describe("long | short"),
    entryPx: o.z.number().nullable(),
    markPx: o.z.number().nullable(),
    liquidationPx: o.z
      .number()
      .nullable()
      .describe("null when the account carries no liquidation price"),
    leverageBps: o.z.number(),
    isCross: o.z
      .boolean()
      .describe(
        "Deprecated: always false (cross-margin positions are excluded server side)",
      ),
    marginUsed: o.z.number().nullable(),
    equity: o.z
      .number()
      .nullable()
      .describe("Margin + unrealized: the figure totals and sorts read"),
    notional: o.z
      .number()
      .nullable()
      .describe("The row's valueUsd: size x mark"),
    fundingSinceOpen: o.z.number().nullable(),
    fundingAllTime: o.z.number().nullable(),
    roeBps: o.z
      .number()
      .describe(
        "Return on equity in bps; 0 on a clearinghouse snapshot miss, so read stateAsOf != null first",
      ),
    maxLeverage: o.z.number(),
    dex: o.z
      .string()
      .nullable()
      .describe(
        "HIP-3 dex; null on the main dex (the coin key carries the dex: prefix)",
      ),
    category: o.z
      .string()
      .nullable()
      .describe("crypto | stocks | commodities; null when unknown"),
    stateAsOf: o.z
      .string()
      .nullable()
      .describe("ISO instant of the clearinghouse state behind these figures"),
    openedAt: o.z
      .string()
      .nullable()
      .describe(
        "ISO instant of the position's first fill; null when the server carries no first trade",
      ),
    closedAt: o.z
      .string()
      .nullable()
      .describe(
        "ISO instant of the lifecycle's last fill on an exited row (its close, also the row's updatedAt); null while the position is open",
      ),
  });
  r.userPositionDto = o.z.object({
    coinMint: o.z.string(),
    chainId: o.z
      .number()
      .nullable()
      .describe(
        "Codex network id of this row's chain; uapi rows on a chain with no Codex id carry what coin-communities sends: 0 on HyperCore, null on TON, NEAR and Starknet. Key those rows by chain, and tell a perp row by chain and assetClass, never by chainId. Typed nullable so older readers still parse",
      ),
    chain: o.z
      .string()
      .optional()
      .describe(
        "CAIP-2 id of this row's chain (solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp, eip155:8453, hlcore:mainnet, ton:-239, near:mainnet, starknet:SN_MAIN); absent on rows served without chain information",
      ),
    assetClass: o.z
      .string()
      .optional()
      .describe(
        "Asset class of the row: ASSET_CLASS_TOKEN, ASSET_CLASS_PERPETUAL or ASSET_CLASS_NFT_LIKE. Some rows carry it only when it is not ASSET_CLASS_TOKEN; absent means a token row",
      ),
    perp: l
      .optional()
      .describe(
        "ASSET_CLASS_PERPETUAL rows only: the HyperCore position state; absent on every token row",
      ),
    collectible: s.collectibleDto.optional().describe(i),
    isExited: o.z.boolean(),
    walletAddress: o.z.string().nullable(),
    profileWallet: o.z
      .string()
      .nullable()
      .optional()
      .describe(
        "ton:-239 and starknet:SN_MAIN rows only: the holder profile's canonical SVM wallet beside the chain walletAddress; null when none is linked or it equals walletAddress. Absent on every other row",
      ),
    amountHeld: o.z.number(),
    pnlUsd: o.z
      .number()
      .nullable()
      .describe(
        "PnL in USD; null when the position's PnL is not yet available",
      ),
    pnlPercentage: o.z.number().nullable(),
    costBasisAmount: o.z
      .number()
      .nullable()
      .describe(
        "Net cost-basis quantity of the position (on most rows the quantity currently held); null on balance-hydrated holdings; always set on gRPC positions",
      ),
    costBasisUsd: o.z.number().nullable(),
    amountBoughtUsd: o.z
      .number()
      .nullable()
      .describe(
        "Lifetime buy total, never reduced by sells; survives full exit unlike the cost-basis pair",
      ),
    receiptBasisUsd: o.z
      .number()
      .nullable()
      .describe(
        "Lifetime USD basis booked for transfer-in receipts, never reduced; pnlPercentage = pnlUsd / max(amountBoughtUsd + receiptBasisUsd, open costBasisUsd). Null on rows not yet re-folded",
      ),
    amountBought: o.z
      .number()
      .nullable()
      .describe("Null until cc seeds the row, and stays null on EVM rows"),
    callout: n.calloutDto.nullable(),
    valueUsd: o.z
      .number()
      .nullable()
      .optional()
      .describe(
        "Absent or null both mean no fresh price known, never 0; never reconstruct it as costBasisUsd + pnlUsd",
      ),
    tokenPriceUsd: o.z
      .number()
      .nullable()
      .describe(
        "The per-token USD price mark behind valueUsd; null means unpriced (cc has no fresh price, or the balance/Codex/RPC lookup missed), never 0. Always present on both /user-positions and /user-portfolio rows",
      ),
    realizedPnlUsd: o.z
      .number()
      .nullable()
      .optional()
      .describe(
        "cc's realized leg alone: unrealized = pnlUsd - realizedPnlUsd; treat absent and null the same",
      ),
    hasTransfers: o.z
      .boolean()
      .optional()
      .describe(
        "False means no transfer marker was seen, NOT provably trade-only; absent when the source cannot say",
      ),
    likelyLost: o.z
      .boolean()
      .optional()
      .describe(
        "Label only; the row itself is unchanged. Always false on Solana rows; may be absent on other rows",
      ),
    hasUntrustedUsdBasis: o.z
      .boolean()
      .optional()
      .describe(
        "True when the USD cost basis is untrusted (a leg was booked with no USD mark): costBasisUsd, pnlUsd, realizedPnlUsd and pnlPercentage do not reflect a real basis, so mask them rather than render $0 / 0%; amountBoughtUsd, amountHeld and valueUsd are unaffected. Absent on rows that carry no verdict (for example balance-derived rows); always true/false on cc rows",
      ),
    hasUntrustedSolBasis: o.z
      .boolean()
      .optional()
      .describe(
        "True when the SOL (native) cost basis is untrusted: native-denominated basis and PnL figures do not reflect a real basis, so mask them. Absent on rows that carry no verdict (for example balance-derived rows); always true/false on cc rows",
      ),
    updatedAt: o.z
      .string()
      .nullable()
      .optional()
      .describe(
        "block time of the position's last ledger leg as ISO — the RECENCY sort instant; the stored row's write clock only where the pair has no ledger row; absent on balance-hydrated rows",
      ),
    openedAt: o.z
      .string()
      .optional()
      .describe(
        "ISO instant the CURRENT position opened (re-stamped on re-entry, so the latest entry, not the lifetime first buy); absent when unknown and on exited and group rows — never a fallback to updatedAt. Anchors a position chart or 'held since' without walking the trade history",
      ),
    amountSoldUsd: o.z
      .number()
      .optional()
      .describe(
        "Lifetime gross sell proceeds in USD (venue trades only); amountBoughtUsd + amountSoldUsd is the lifetime trade volume. Absent when no sell total is known — never 0",
      ),
    tradeCount: o.z
      .number()
      .int()
      .nonnegative()
      .optional()
      .describe(
        "The wallet's lifetime venue-trade count on this mint (one per transaction carrying a trade leg; transfers excluded) — the exact figure for a transactions header without paging trades. Absent when no exact count is known: absent means unknown, never 0; a present 0 is exact",
      ),
    lastSlotIndexId: o.z
      .string()
      .optional()
      .describe(
        "26-digit slot(12) tx_index(6) ev(8) ledger cursor of the last folded leg; block number in the slot field on EVM; compare the 12-char prefix; absent = unknown",
      ),
    potentialSpam: o.z
      .boolean()
      .optional()
      .describe(
        "/user-portfolio only; spam group = potentialSpam && !userMarkedNonSpam",
      ),
    userMarkedNonSpam: o.z
      .boolean()
      .optional()
      .describe("/user-portfolio only"),
    dustFloorFiltered: o.z
      .boolean()
      .optional()
      .describe(
        "/user-portfolio only, stamped on the owner's own authed read (a public read serves false); grouping hint: nothing is hidden and totals are untouched",
      ),
    isNative: o.z
      .boolean()
      .optional()
      .describe(
        '/user-portfolio only: the row is a chain\'s native gas token, served under the bare "native" wire mint',
      ),
    groupHolders: r.groupHoldersDto
      .optional()
      .describe(
        "Group-subject reads only; present-but-empty when no member currently holds",
      ),
    coin: r.positionCoinDto
      .nullable()
      .optional()
      .describe(
        "/user-portfolio only; null = no chain-matching record, never attached on native rows",
      ),
  });
};
