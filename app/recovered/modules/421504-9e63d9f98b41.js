// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.repostDto =
      r.repostCalloutDto =
      r.repostPositionDto =
      r.mintPositionPerpDto =
      r.reposterDto =
      r.userReplyRowDto =
      r.replyCalloutDto =
      r.calloutReplyDto =
      r.calloutWithAuthorDto =
      r.calloutDto =
      r.perpCalloutDto =
      r.calloutActingUserDto =
      r.calloutUpdateDto =
      r.tailPnlHistogram =
      r.mediaWaveform =
      r.voiceWaveform =
        void 0));
  let o = e.r(876543),
    n = e.r(983689);
  ((r.voiceWaveform = o.z.array(o.z.number().int().min(0).max(100))),
    (r.mediaWaveform = r.voiceWaveform
      .optional()
      .describe(
        "Loudness shape of an attached voice note for a waveform player: 64 buckets 0..100, 100 = the clip's loudest bucket; absent on every other callout and on voice notes recorded before the waveform shipped",
      )));
  let s = o.z.object({
    min: o.z
      .number()
      .nullable()
      .describe(
        "USD, inclusive lower bound of the bucket's per-tailer PnL range; null for the open-ended bottom bucket.",
      ),
    max: o.z
      .number()
      .nullable()
      .describe(
        "USD, exclusive upper bound; null for the open-ended top bucket.",
      ),
    tailers: o.z
      .number()
      .describe("Tailers whose horizon PnL fell in this bucket."),
    pnlUsd: o.z
      .number()
      .describe("USD, summed horizon PnL of this bucket's tailers."),
  });
  r.tailPnlHistogram = o.z
    .object({
      buckets: o.z
        .array(s)
        .describe(
          "Server-defined buckets in ascending order; tailers sum to this histogram's cohort and pnlUsd to the matching horizon total.",
        ),
      callouts: o.z
        .number()
        .describe(
          "Served callouts whose buckets contributed (1 on a single callout row).",
        ),
    })
    .describe(
      "Per-tailer PnL histogram of the tailing cohort at one horizon, over server-defined buckets; clients render the bounds they are served, never a hardcoded edge list.",
    );
  let a = o.z
    .number()
    .optional()
    .describe(
      "Session-deduped views; absent means unknown (no counter row yet), never a real zero",
    );
  ((r.calloutUpdateDto = o.z.object({
    id: o.z.string(),
    content: o.z.string(),
    createdAt: o.z.string().nullable(),
    likeCount: o.z.number(),
    mediaUrl: o.z.string().nullable(),
    parentMessageId: o.z.string().nullable(),
    repostCount: o.z.number(),
    viewCount: a,
  })),
    (r.calloutActingUserDto = o.z.object({
      userId: o.z.string(),
      userName: o.z.string(),
      profileImage: o.z.string().nullable(),
      walletAddress: o.z.string().nullable(),
      isVerified: o.z.boolean(),
      verifiedBadgeVisible: o.z
        .boolean()
        .describe(
          "Badge rendering hint beside isVerified: show the checkmark only when both are true",
        ),
      xUsername: o.z.string().nullable(),
    })),
    (r.perpCalloutDto = o.z.object({
      side: o.z.enum(["long", "short"]),
      leverageBps: o.z.number(),
      entryPx: o.z.number().nullable(),
      closePx: o.z.number().nullable(),
      closedAt: o.z.string().nullable(),
    })));
  let i = {
    calloutId: o.z
      .string()
      .describe(
        "cc's callout UUID; a row cc serves without one is mapped to callout null, so the key is never empty",
      ),
    chain: o.z
      .string()
      .nullable()
      .optional()
      .describe(
        "CAIP-2 chain of the called-out ref (hlcore:mainnet for a perp, ton:-239 for a TON callout, near:mainnet for a NEAR callout, starknet:SN_MAIN for a Starknet callout); null when the row carries none",
      ),
    assetClass: o.z
      .enum([
        "ASSET_CLASS_TOKEN",
        "ASSET_CLASS_PERPETUAL",
        "ASSET_CLASS_NFT_LIKE",
      ])
      .optional()
      .describe(
        "Asset class of the called-out position: ASSET_CLASS_PERPETUAL on an hlcore (HyperCore perp) callout, ASSET_CLASS_NFT_LIKE on a card callout (collectible set), ASSET_CLASS_TOKEN on every other row, chainless ones included",
      ),
    collectible: n.collectibleDto
      .optional()
      .describe(
        "ASSET_CLASS_NFT_LIKE callouts only: the card (identity, grade, mark, insured value, buyback, listing); multiple is then the card mark over calloutPrice. Absent on every token callout",
      ),
    perp: r.perpCalloutDto
      .nullable()
      .optional()
      .describe("Set only on a perp callout, whose calledOutAtMcap is 0"),
    calledOutAtMcap: o.z
      .number()
      .describe(
        "USD market cap when the callout was made; 0 when coin-communities captured none, never null",
      ),
    multiple: o.z
      .number()
      .describe(
        "Current multiplier (live price vs callout price), 1 for an untracked callout; maxMultiplier is the all-time peak",
      ),
    thesis: o.z.string().nullable(),
    mediaUrl: o.z.string().nullable(),
    mediaTranscript: o.z
      .string()
      .optional()
      .describe(
        "Speech-to-text transcript of an attached voice note; absent on every other callout",
      ),
    mediaWaveform: r.mediaWaveform,
    calloutTimestamp: o.z.string().nullable(),
    likes: o.z.number(),
    hasLiked: o.z.boolean().nullable().describe("null until a viewer is known"),
    updates: o.z
      .array(r.calloutUpdateDto)
      .describe(
        "Author updates (the author's own replies), newest first; empty when the route does not include them",
      ),
    updateCount: o.z.number(),
    commentCount: o.z
      .number()
      .describe("Live replies from users OTHER than the callout author"),
    replyCount: o.z.number().describe("All live replies, updates included"),
    maxMultiplier: o.z.number().nullable(),
    maxMultiplierAt: o.z.string().nullable(),
    calloutPrice: o.z
      .number()
      .describe(
        "Token price when the callout was made; 0 for callouts predating price capture, never null",
      ),
    repostCount: o.z
      .number()
      .describe(
        "Live plain reposts of the callout itself; quotes do not count",
      ),
    quoteCount: o.z.number(),
    hasReposted: o.z
      .boolean()
      .nullable()
      .describe("null until a viewer is known"),
    viewCount: a,
    quotedCalloutId: o.z
      .string()
      .nullable()
      .optional()
      .describe(
        'Set with quotedCallout null means "quote of an unavailable callout", never "no quote"',
      ),
    actingUserId: o.z
      .string()
      .nullable()
      .describe(
        "Squad callouts: the admin who posted on the squad's behalf; presence is not the squad discriminator, the author's kind is",
      ),
    actingUser: r.calloutActingUserDto
      .nullable()
      .describe(
        'actingUserId set with actingUser null means "unresolved", not "absent"',
      ),
  };
  r.calloutDto = o.z.object(i).extend({
    get quotedCallout() {
      return r.calloutWithAuthorDto
        .nullable()
        .describe(
          "The quoted callout one level deep (its own quotedCallout is always null)",
        );
    },
  });
  let l = {
    coinMint: o.z.string(),
    walletAddress: o.z.string().nullable(),
    userId: o.z.string().nullable(),
    userName: o.z.string().nullable(),
    profileImage: o.z.string().nullable(),
    isVerified: o.z.boolean(),
    verifiedBadgeVisible: o.z
      .boolean()
      .describe(
        "Badge rendering hint beside isVerified: show the checkmark only when both are true; true for user-less callouts",
      ),
    accountKind: o.z
      .enum(["person", "group"])
      .describe(
        "'group' = a squad callout: userId/userName/profileImage are the squad's while walletAddress is the acting admin's posting wallet; route the author press on userId + accountKind, never the wallet",
      ),
    xUsername: o.z.string().nullable(),
    xFollowerCount: o.z.number(),
    mediaUrl: o.z.string().nullable(),
    chain: o.z
      .string()
      .optional()
      .describe(
        "CAIP-2 chain of the called-out ref; absent when the callout carries none",
      ),
    mediaTranscript: o.z
      .string()
      .optional()
      .describe(
        "Speech-to-text transcript of an attached voice note; absent on every other callout",
      ),
    mediaWaveform: r.mediaWaveform,
  };
  r.calloutWithAuthorDto = o.z.object(l).extend({
    get callout() {
      return r.calloutDto;
    },
  });
  let d = {
    id: o.z.string(),
    content: o.z.string(),
    createdAt: o.z.string().nullable(),
    likeCount: o.z.number(),
    userId: o.z.string(),
    walletAddress: o.z.string().nullable(),
    userName: o.z.string().nullable(),
    profileImage: o.z.string().nullable(),
    accountKind: o.z
      .enum(["person", "group"])
      .describe(
        "'group' = a squad reply posted by an acting admin: userId/userName/profileImage are the squad's and walletAddress is null (groups are walletless)",
      ),
    mediaUrl: o.z.string().nullable(),
    parentMessageId: o.z
      .string()
      .nullable()
      .describe("null when this reply targets the callout itself"),
    rootMessageId: o.z.string().nullable().describe("null on thread tops"),
    directReplyCount: o.z.number(),
    threadReplyCount: o.z
      .number()
      .nullable()
      .describe("Live descendants at every depth; thread tops only"),
    tombstone: o.z
      .boolean()
      .describe(
        "Placeholder for a deleted/hidden reply — only id, linkage and counts are set",
      ),
    hasLiked: o.z
      .boolean()
      .nullable()
      .describe("null for anonymous requests and on tombstones"),
    viewerFollowsAuthor: o.z
      .boolean()
      .nullable()
      .describe("null for anonymous requests and on tombstones"),
    repostCount: o.z.number(),
    positionAmountHeld: o.z.number().nullable(),
    positionValueUsd: o.z.number().nullable(),
    positionPnlUsd: o.z.number().nullable(),
    positionPnlPercentage: o.z.number().nullable(),
    positionCostBasisAmount: o.z
      .number()
      .describe(
        "cc zeroes it on exit; use the amountBought pair for lifetime entry",
      ),
    positionCostBasisUsd: o.z.number().nullable(),
    positionAmountBoughtUsd: o.z.number().nullable(),
    positionAmountBought: o.z.number().nullable(),
    positionRealizedPnlUsd: o.z.number().nullable(),
    positionAvgEntryMcapUsd: o.z.number().nullable(),
    isQuote: o.z
      .boolean()
      .describe(
        "Quote rows root their own thread and never appear in the quoted thread; always false on tombstones",
      ),
    viewCount: a,
  };
  ((r.calloutReplyDto = o.z.object(d).extend({
    get previewReplies() {
      return o.z
        .array(r.calloutReplyDto)
        .describe(
          "Newest live direct children, deduped against authorReply; empty without nestedLimit",
        );
    },
    get authorReply() {
      return r.calloutReplyDto
        .nullable()
        .describe("The callout author's earliest live direct child");
    },
  })),
    (r.replyCalloutDto = r.calloutWithAuthorDto.extend({
      coinName: o.z.string().nullable(),
      coinImage: o.z.string().nullable(),
      symbol: o.z.string().nullable(),
      marketCap: o.z.number().nullable(),
    })),
    (r.userReplyRowDto = o.z.object({
      callout: r.replyCalloutDto
        .nullable()
        .describe("null when the callout is deleted or moderation-hidden"),
      parent: r.calloutReplyDto
        .nullable()
        .describe("null when the reply targets the callout directly"),
      reply: r.calloutReplyDto,
    })),
    (r.reposterDto = o.z.object({
      userId: o.z.string(),
      userName: o.z.string().nullable(),
      profileImage: o.z.string().nullable(),
      walletAddress: o.z.string().nullable(),
      isVerified: o.z.boolean(),
      verifiedBadgeVisible: o.z
        .boolean()
        .describe(
          "Badge rendering hint beside isVerified: show the checkmark only when both are true",
        ),
      accountKind: o.z
        .enum(["person", "group"])
        .describe(
          "'group' = a squad reposted it: userId/userName/profileImage are the squad's and walletAddress is null (groups are walletless)",
        ),
      followerCount: o.z.number(),
      followingCount: o.z.number(),
    })),
    (r.mintPositionPerpDto = o.z.object({
      side: o.z.enum(["long", "short"]),
      leverageBps: o.z.number(),
      entryPx: o.z.number().nullable(),
      markPx: o.z.number().nullable(),
      closePx: o.z
        .number()
        .nullable()
        .describe("The frozen close price; null while the position is open"),
      closedAt: o.z
        .string()
        .nullable()
        .describe("ISO instant of the close; null while the position is open"),
      positionValueUsd: o.z
        .number()
        .nullable()
        .describe(
          "cc's notional (|size| x mark while open, the callout-time notional once closed), the order the list ranks by",
        ),
      marginUsd: o.z.number().nullable(),
      equityUsd: o.z
        .number()
        .nullable()
        .describe(
          "Account equity (USD) behind the position; null when cc serves none",
        ),
      stateAsOf: o.z
        .string()
        .nullable()
        .describe(
          "ISO instant of the clearinghouse state behind these figures",
        ),
    })),
    (r.repostPositionDto = o.z.object({
      amountHeld: o.z.number(),
      valueUsd: o.z.number().nullable(),
      pnlUsd: o.z.number().nullable(),
      pnlPercentage: o.z.number().nullable(),
      isExited: o.z.boolean(),
      costBasisAmount: o.z
        .number()
        .describe("cc zeroes it on exit; use the amountBought pair there"),
      costBasisUsd: o.z.number().nullable(),
      amountBoughtUsd: o.z.number().nullable(),
      receiptBasisUsd: o.z.number().nullable(),
      amountBought: o.z.number().nullable(),
      realizedPnlUsd: o.z.number().nullable(),
      avgEntryMcapUsd: o.z.number().nullable(),
      perp: r.mintPositionPerpDto
        .nullable()
        .describe(
          "The author's HyperCore position on a perp callout: live while open, the frozen close once closed; null on a spot position",
        ),
    })),
    (r.repostCalloutDto = r.calloutWithAuthorDto.extend({
      coinName: o.z.string().nullable(),
      coinImage: o.z.string().nullable(),
      symbol: o.z.string().nullable(),
      marketCap: o.z.number().nullable(),
      position: r.repostPositionDto
        .nullable()
        .describe("null when the author has no visible position row"),
    })),
    (r.repostDto = o.z.object({
      id: o.z
        .string()
        .describe(
          "For kind 'quote' this is the quote MESSAGE id and is never valid for undo-repost",
        ),
      kind: o.z
        .enum(["repost", "quote"])
        .describe(
          "Routing discriminator: 'quote' rows carry only id/createdAt/quote",
        ),
      createdAt: o.z.string().nullable(),
      reposter: r.reposterDto.nullable(),
      callout: r.repostCalloutDto.nullable(),
      reply: r.calloutReplyDto
        .nullable()
        .describe("null for callout-target reposts and on quote rows"),
      quote: r.userReplyRowDto.nullable().describe("null on plain reposts"),
    })));
};
