// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.calloutRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = e.r(421504),
    i = e.r(983689),
    l = e.r(4171),
    d = e.r(890664),
    c = e.r(617159),
    u = o.z.object({
      calloutId: o.z.string(),
      userId: o.z.string(),
      coinMint: o.z.string(),
      marketCap: o.z.number(),
      calloutPrice: o.z
        .number()
        .describe(
          "SOL-denominated; 0 both for a genuine zero and when the SOL price lookup failed open",
        ),
      calloutPriceUsd: o.z.number(),
      multiple: o.z.number(),
      createdAt: o.z
        .number()
        .describe("Epoch milliseconds; 0 when unparseable"),
      maxPriceSol: o.z
        .number()
        .describe(
          "SOL-denominated; 0 both for a genuine zero and when the SOL price lookup failed open",
        ),
      maxPriceUsd: o.z.number(),
      thesis: o.z.string().optional(),
      user_uuid: o.z
        .string()
        .describe(
          "Unread by every known caller; kept for wire compatibility, and always empty on the list read",
        ),
      likes: o.z.number(),
      hasLiked: o.z.boolean().nullable(),
      hasReposted: o.z.boolean().nullable(),
      repostCount: o.z.number(),
      quoteCount: o.z.number(),
      updates: o.z
        .array(a.calloutUpdateDto)
        .describe(
          "Author updates (the author's own replies), newest first; empty when the route does not include them",
        ),
      updateCount: o.z.number(),
      commentCount: o.z.number(),
      replyCount: o.z.number(),
      maxMultiplier: o.z.number().nullable(),
      maxMultiplierAt: o.z.string().nullable(),
      viewCount: o.z
        .number()
        .optional()
        .describe(
          "The only counter here that is not zero-filled: absent means unknown (no counter row yet), never a real 0",
        ),
      mediaUrl: o.z
        .string()
        .nullable()
        .describe(
          "Server-minted CDN URL; null when the callout carries no media",
        ),
      mediaTranscript: o.z
        .string()
        .optional()
        .describe(
          "Speech-to-text transcript of an attached voice note; absent on every other callout",
        ),
      mediaWaveform: a.mediaWaveform,
      quotedCalloutId: o.z
        .string()
        .nullable()
        .describe(
          'Set with quotedCallout null means the quote target is hidden or unavailable, never "no quote"',
        ),
      quotedCallout: a.calloutWithAuthorDto.nullable(),
      chain: o.z
        .string()
        .nullable()
        .optional()
        .describe(
          "CAIP-2 chain of the called-out ref; null when the row carries none",
        ),
      perp: a.perpCalloutDto
        .nullable()
        .optional()
        .describe("Set only on a perp callout; maxPriceSol is 0 when set"),
      assetClass: o.z
        .enum([
          "ASSET_CLASS_TOKEN",
          "ASSET_CLASS_PERPETUAL",
          "ASSET_CLASS_NFT_LIKE",
        ])
        .optional()
        .describe(
          "ASSET_CLASS_NFT_LIKE on a card callout (collectible set); absent on every token and perp row",
        ),
      collectible: i.collectibleDto
        .optional()
        .describe(
          "NFT_LIKE card callouts only: the card (identity, grade, mark, insured value, buyback, listing); multiple is then the card mark over calloutPriceUsd. Absent on every token callout",
        ),
    }),
    h = u.extend({
      tailBuyers: o.z
        .number()
        .nullable()
        .describe(
          "Distinct users whose buy was attributed to this callout; null = unknown (callout predates tail tracking).",
        ),
      tailCohort1h: o.z
        .number()
        .nullable()
        .describe(
          "Users tailPnl1hUsd covers (tailers whose first attributed buy landed before +1 h and whose window priced); null until the 1 h horizon is served.",
        ),
      tailPnl1hUsd: o.z
        .number()
        .nullable()
        .describe(
          "USD, whole-position PnL change of the tailing cohort over [callout, +1 h]; null until the 1 h horizon is served.",
        ),
      tailCohort4h: o.z
        .number()
        .nullable()
        .describe(
          "Users tailPnl4hUsd covers (tailers whose first attributed buy landed before +4 h and whose window priced); null until the 4 h horizon is served.",
        ),
      tailPnl4hUsd: o.z
        .number()
        .nullable()
        .describe(
          "USD, whole-position PnL change of the tailing cohort over [callout, +4 h]; null until the 4 h horizon is served.",
        ),
      tailCohort24h: o.z
        .number()
        .nullable()
        .describe(
          "Users tailPnl24hUsd covers (tailers whose first attributed buy landed before +24 h and whose window priced); null until the 24 h horizon is served.",
        ),
      tailPnl24hUsd: o.z
        .number()
        .nullable()
        .describe(
          "USD, whole-position PnL change of the tailing cohort over [callout, +24 h]; null until the 24 h horizon is served.",
        ),
      tailPnlHist1h: a.tailPnlHistogram
        .nullable()
        .describe(
          "Per-tailer 1 h PnL histogram of the tailing cohort (server-defined buckets); null until the 1 h horizon is served, never all-zero buckets.",
        ),
      tailPnlHist4h: a.tailPnlHistogram
        .nullable()
        .describe(
          "Per-tailer 4 h PnL histogram of the tailing cohort (server-defined buckets); null until the 4 h horizon is served, never all-zero buckets.",
        ),
      tailPnlHist24h: a.tailPnlHistogram
        .nullable()
        .describe(
          "Per-tailer 24 h PnL histogram of the tailing cohort (server-defined buckets); null until the 24 h horizon is served, never all-zero buckets.",
        ),
      tailAth1hUsd: o.z
        .number()
        .nullable()
        .describe(
          "USD, best-case-exit PnL of the 1 h tailing cohort: sum over tailers of max(0, in-window bought amount x highest outlier-screened 1 m candle high - in-window buy spend) over each tailer's own window [first in-window buy, +1 h]; >= 0; null until the 1 h ATH arm is served (one horizon after tailPnl1hUsd) or unavailable.",
        ),
      tailAth4hUsd: o.z
        .number()
        .nullable()
        .describe(
          "USD, best-case-exit PnL of the 4 h tailing cohort: sum over tailers of max(0, in-window bought amount x highest outlier-screened 1 m candle high - in-window buy spend) over each tailer's own window [first in-window buy, +4 h]; >= 0; null until the 4 h ATH arm is served (one horizon after tailPnl4hUsd) or unavailable.",
        ),
      tailAth24hUsd: o.z
        .number()
        .nullable()
        .describe(
          "USD, best-case-exit PnL of the 24 h tailing cohort: sum over tailers of max(0, in-window bought amount x highest outlier-screened 5 m candle high - in-window buy spend) over each tailer's own window [first in-window buy, +24 h]; >= 0; null until the 24 h ATH arm is served (one horizon after tailPnl24hUsd) or unavailable.",
        ),
      tailAthHist1h: a.tailPnlHistogram
        .nullable()
        .describe(
          "Per-tailer 1 h best-case-exit PnL histogram of the tailing cohort (tailer-anchored window, 1 m candle highs); five buckets from 0 up (first min 0, last max null), tailers sum to the 1 h ATH cohort and pnlUsd to tailAth1hUsd; null until served.",
        ),
      tailAthHist4h: a.tailPnlHistogram
        .nullable()
        .describe(
          "Per-tailer 4 h best-case-exit PnL histogram of the tailing cohort (tailer-anchored window, 1 m candle highs); five buckets from 0 up (first min 0, last max null), tailers sum to the 4 h ATH cohort and pnlUsd to tailAth4hUsd; null until served.",
        ),
      tailAthHist24h: a.tailPnlHistogram
        .nullable()
        .describe(
          "Per-tailer 24 h best-case-exit PnL histogram of the tailing cohort (tailer-anchored window, 5 m candle highs); five buckets from 0 up (first min 0, last max null), tailers sum to the 24 h ATH cohort and pnlUsd to tailAth24hUsd; null until served.",
        ),
      author: o.z
        .object({
          userId: o.z.string(),
          userName: o.z.string(),
          profileImage: o.z.string().nullable(),
          accountKind: o.z
            .enum(["person", "group"])
            .describe(
              "'group' = the squad's own post; 'person' = a member's or a single person's post",
            ),
        })
        .optional()
        .describe(
          "The row's author — the requested user on a single-author page, the posting member or the squad itself under includeMembers; absent when cc predates the field or the callout has no linked user.",
        ),
    }),
    m = u.extend({
      userName: o.z.string().nullable(),
      profileImage: o.z.string().nullable(),
      isVerified: o.z.boolean(),
      verifiedBadgeVisible: o.z
        .boolean()
        .describe(
          "Badge rendering hint beside isVerified: show the checkmark only when both are true",
        ),
      accountKind: o.z
        .enum(["person", "group"])
        .describe(
          "'group' = a squad callout: user_uuid/userName/profileImage are the squad's while userId is the acting admin's posting wallet; route the author press on user_uuid + accountKind",
        ),
      xUsername: o.z.string().nullable(),
      xFollowerCount: o.z.number(),
    }),
    p = {
      chain: o.z
        .string()
        .optional()
        .describe(
          "CAIP-2 chain (hlcore:mainnet, ton:-239, near:mainnet or starknet:SN_MAIN); present only on a perp, TON, NEAR or Starknet callout, absent on every other token row",
        ),
      assetClass: o.z
        .literal("ASSET_CLASS_PERPETUAL")
        .optional()
        .describe("Present only on a perp callout, beside chain"),
      perp: a.perpCalloutDto
        .nullable()
        .optional()
        .describe(
          "The perp fill of a perp callout; null when cc served no long/short side, absent on every token row",
        ),
    },
    b = o.z.object({
      ...p,
      calloutId: o.z.string(),
      userId: o.z
        .string()
        .describe(
          "The author's wallet address (deprecated wallet-keyed identity)",
        ),
      coinMint: o.z.string(),
      marketCap: o.z.number(),
      calloutPrice: o.z.number(),
      multiple: o.z.number(),
      createdAt: o.z.number().describe("Epoch milliseconds; 0 when absent"),
      maxPriceSol: o.z.number(),
      thesis: o.z.string().optional(),
      peakTimestamp: o.z
        .number()
        .optional()
        .describe(
          "Epoch milliseconds when maxPriceSol was last set; absent until the first price update",
        ),
      user_uuid: o.z.string(),
      viewCount: o.z.number().optional(),
      mediaUrl: o.z.string().optional(),
      mediaTranscript: o.z
        .string()
        .optional()
        .describe(
          "Voice-note transcript; absent unless mediaUrl is a voice note",
        ),
      mediaWaveform: a.mediaWaveform,
    }),
    g = o.z
      .union([
        o.z.literal(0),
        o.z.literal(1),
        o.z.literal(2),
        o.z.literal(3),
        o.z.literal(-1),
      ])
      .describe(
        "Board period as a number: UNSPECIFIED=0, WEEKLY=1, MONTHLY=2, DAILY=3; UNRECOGNIZED=-1 for a value this document does not list",
      ),
    w = o.z.object({
      appearances: o.z.number(),
      currentStreak: o.z.number(),
      longestStreak: o.z.number(),
      firstPlaceFinishes: o.z.number(),
      topThreeFinishes: o.z.number(),
      averageRank: o.z
        .number()
        .optional()
        .describe("Mean rank across appearances; absent when appearances is 0"),
    }),
    y = o.z.object({
      top10: w.optional(),
      top25: w.optional(),
      top50: w.optional(),
    }),
    f = o.z.object({
      userId: o.z.string(),
      weekly: y.optional(),
      monthly: y.optional(),
      bestRank: o.z
        .object({
          rank: o.z.number(),
          periodType: g,
          periodLabel: o.z.string(),
        })
        .optional()
        .describe(
          "Best across all tiers and periodicities; absent if never ranked",
        ),
      bestCallout: o.z
        .object({
          ...p,
          coinMint: o.z
            .string()
            .describe(
              "Always empty on the cc arm — cc reports no token address",
            ),
          multiple: o.z.number(),
          calloutTimestamp: o.z.number().describe("Epoch milliseconds"),
        })
        .optional(),
      firstAppearance: o.z
        .object({ periodType: g, periodLabel: o.z.string() })
        .optional(),
      snapshotAt: o.z
        .number()
        .describe('Epoch milliseconds; 0 means "no record" to clients'),
      user_uuid: o.z.string(),
    }),
    z = (0, c.openEnum)(
      [
        "UNSPECIFIED",
        "ELIGIBLE",
        "RESTRICTED",
        "EXISTING_CALLOUT",
        "COOLDOWN",
        "WALLET_NOT_LINKED",
        "INSUFFICIENT_BALANCE",
        "PRICE_UNAVAILABLE",
        "UNKNOWN",
        "ATTEMPT_LIMIT",
        "MAYHEM_NOT_COMPLETED",
      ],
      "cc's EligibilityVerdict name, an upstream-owned open set: treat unknown values like UNKNOWN (fail-open, the write path re-checks) (TASK-4734)",
    ),
    v = o.z.object({
      id: o.z.string(),
      username: o.z.string(),
      profileImageUrl: o.z.string().nullable(),
      kind: o.z.enum(["PERSON", "GROUP"]),
      verdict: z,
      attemptsRemaining: o.z.number(),
      existingCalloutId: o.z
        .string()
        .nullable()
        .describe(
          "The account's live callout on this mint, when one holds the slot",
        ),
      position: o.z
        .object({
          amountHeld: o.z.number(),
          valueUsd: o.z.number().nullable(),
          pnlUsd: o.z.number().nullable(),
          pnlPercentage: o.z.number().nullable(),
          amountBoughtUsd: o.z.number().nullable(),
          receiptBasisUsd: o.z.number().nullable(),
        })
        .nullable()
        .describe("null = no contributing position rows for this mint"),
    }),
    k = o.z.object({
      userFound: o.z.boolean(),
      create: o.z.object({
        verdict: z,
        canBackfillThesis: o.z.boolean(),
        attemptsUsed: o.z
          .number()
          .describe(
            "<=3 persisted attempts per (user, mint); moderation-flagged attempts consume slots but unlock retries",
          ),
        attemptsRemaining: o.z.number(),
      }),
      reply: o.z.object({
        authorVerdict: z,
        nonAuthorVerdict: z,
        cooldownRemainingSeconds: o.z.number(),
        isCalloutAuthor: o.z.boolean(),
      }),
      postableAccounts: o.z
        .array(v)
        .describe(
          'The "post as" picker: entry 0 is always the caller (failing verdict included), then their owner/admin groups, capped at 20 upstream',
        ),
    }),
    _ = o.z
      .number()
      .int()
      .min(1)
      .optional()
      .describe(
        "1-based position in the followed-first ranking, offset-aware (offset + index on this page + 1); present exactly when the page carries recommendationId, absent — never null — on a chronological page",
      ),
    E = o.z
      .uuid()
      .optional()
      .describe(
        "Present when the page is ranked followed-first for the signed-in viewer (the viewer's follows first, each tier in the sheet's own order): one UUID minted per page, shared by its rows' rank — attribute a follow or profile open to the serving page with it. Each page is ranked against the viewer's follow set when it is read, so a follow or unfollow made from the sheet shifts the rows after it by one on the next page: dedupe rows by id across pages. Absent — never null — on an anonymous read or a chronological page",
      ),
    T = d.normalizedProfile.extend({
      viewerFollows: o.z
        .boolean()
        .optional()
        .describe("Absent on unauthenticated reads"),
      rank: _,
    }),
    A = o.z.object({
      likers: o.z.array(T),
      hasMore: o.z.boolean(),
      recommendationId: E,
    }),
    I = o.z
      .object({
        profile: d.normalizedProfile
          .optional()
          .describe("Absent when the wallet resolves to no user"),
        walletAddress: o.z.string(),
        chainId: o.z.number().int(),
        firstSeenAt: o.z
          .number()
          .nullable()
          .describe("Epoch ms of the tailer's first buy after the callout"),
        pnl1hUsd: o.z.number().nullable(),
        pnl4hUsd: o.z.number().nullable(),
        pnl24hUsd: o.z.number().nullable(),
        ath1hUsd: o.z
          .number()
          .nullable()
          .describe(
            "USD, the tailer's best-case-exit PnL over its own window [first in-window buy, +1 h]: max(0, in-window bought amount x highest outlier-screened 1 m candle high - in-window buy spend); >= 0; null until the 1 h ATH arm is served, when unavailable, or outside that horizon's cohort.",
          ),
        ath4hUsd: o.z
          .number()
          .nullable()
          .describe(
            "USD, the tailer's best-case-exit PnL over its own window [first in-window buy, +4 h]: max(0, in-window bought amount x highest outlier-screened 1 m candle high - in-window buy spend); >= 0; null until the 4 h ATH arm is served, when unavailable, or outside that horizon's cohort.",
          ),
        ath24hUsd: o.z
          .number()
          .nullable()
          .describe(
            "USD, the tailer's best-case-exit PnL over its own window [first in-window buy, +24 h]: max(0, in-window bought amount x highest outlier-screened 5 m candle high - in-window buy spend); >= 0; null until the 24 h ATH arm is served, when unavailable, or outside that horizon's cohort.",
          ),
        positionUsd: o.z.number().nullable(),
        amountHeld: o.z.number().nullable(),
        pnlUsd: o.z.number().nullable(),
        isExited: o.z.boolean().nullable(),
        rank: _,
      })
      .describe("One tailer of a callout; null = unknown, never a real 0"),
    S = o.z.object({
      tailers: o.z
        .array(I)
        .describe(
          "Oldest tail first; on a ranked page the viewer's follows first, each tier oldest first",
        ),
      hasMore: o.z.boolean(),
      recommendationId: E,
    }),
    R = d.normalizedProfile.extend({
      viewerFollows: o.z
        .boolean()
        .optional()
        .describe("Absent on unauthenticated reads"),
      position: a.repostPositionDto
        .optional()
        .describe(
          "The reposter's own position in the callout's token; absent = none visible",
        ),
      rank: _,
    }),
    P = o.z.object({
      reposters: o.z.array(R),
      hasMore: o.z.boolean(),
      recommendationId: E,
    }),
    O = o.z.object({
      limit: o.z.number().int().min(1).optional(),
      offset: o.z
        .number()
        .int()
        .min(0)
        .optional()
        .describe("Offset paging, mirroring the cc RPC; cc rejects past 10k"),
    }),
    C = o.z.object({
      mediaId: o.z
        .string()
        .describe("Upload id to poll and to send as mediaId"),
      status: o.z.enum(["pending", "clean", "flagged", "failed"]),
      reason: o.z
        .string()
        .optional()
        .describe("Rejection or failure code from cc when flagged or failed"),
    }),
    U = C.extend({
      transcript: o.z
        .string()
        .optional()
        .describe(
          "Voice notes only: the speech-to-text transcript, present once the upload is clean",
        ),
      waveform: a.voiceWaveform
        .optional()
        .describe(
          "Voice notes only: the clip's loudness shape for a waveform player, 64 buckets 0..100 (100 = its loudest bucket), present beside transcript on a clean upload; absent on video uploads, on every other status and when the waveform could not be computed",
        ),
    }),
    N = o.z.object({ calloutId: o.z.string() }),
    D = o.z.object({ replyId: o.z.string() });
  r.calloutRoutes = (0, n.defineRoutes)({
    "POST /callout/create": {
      summary: "Create a callout, optionally with an image upload",
      multipart: !0,
      body: o.z.object({
        coinMint: o.z.string().min(1).regex(/\S/),
        thesis: o.z.string().max(2e3).optional(),
        version: o.z
          .number()
          .int()
          .refine((e) => 1 === e || 2 === e)
          .optional(),
        chainId: o.z.number().int().min(1).optional(),
        chain: o.z
          .string()
          .regex(
            /^(hlcore:(mainnet|testnet)|ton:-239|near:mainnet|starknet:SN_MAIN)$/,
          )
          .optional()
          .describe(
            "CAIP-2 chain of a perp ref (hlcore), a TON ref (ton:-239, coinMint = the friendly EQ... jetton master), a NEAR ref (near:mainnet, coinMint = the token account id) or a Starknet ref (starknet:SN_MAIN, coinMint = the 0x felt token address); tokens with a Codex id name their chain with chainId",
          ),
        asGroupId: o.z.uuid().optional(),
        quotedCalloutId: o.z.uuid().optional(),
        mediaId: o.z
          .uuid()
          .optional()
          .describe(
            "Video upload id from POST /callout/media; must be clean, unexpired and the caller's own. Mutually exclusive with the image part",
          ),
        sourceRef: o.z
          .string()
          .regex(/^collectible:[A-Za-z0-9:_-]{1,200}$/)
          .optional()
          .describe(
            "Origin of a prompted callout: collectible:<opening_uuid> from the collectible pull deeplink; one callout per pull",
          ),
      }),
      response: o.z.object({ callout: b.optional() }),
      emits: [
        "MEDIA_EXPIRED",
        "MEDIA_NOT_CLEAN",
        "MEDIA_NOT_OWNED",
        "VIDEO_DISABLED",
        "PRICE_UNAVAILABLE",
        "DUPLICATE_CALLOUT",
        "MEDIA_RATE_LIMITED",
        "ATTEMPT_LIMIT",
        "COOLDOWN",
        "SPAM_RESTRICTED",
        "INVALID_CONTENT",
        "INSUFFICIENT_BALANCE",
        "MAYHEM_NOT_COMPLETED",
        "NOT_GROUP_ADMIN",
        "NO_ELIGIBLE_WALLET",
        "USER_BANNED",
      ],
    },
    "POST /callout/media": {
      summary:
        "Upload a callout video for screening; poll the returned mediaId until clean, then attach it on POST /callout/create. The upload belongs to the caller; a squad create claims it as the acting admin",
      multipart: !0,
      multipartFiles: ["video"],
      response: C,
      emits: [
        "MEDIA_EXPIRED",
        "MEDIA_NOT_CLEAN",
        "MEDIA_NOT_OWNED",
        "VIDEO_DISABLED",
        "PRICE_UNAVAILABLE",
        "DUPLICATE_CALLOUT",
        "MEDIA_RATE_LIMITED",
        "ATTEMPT_LIMIT",
        "COOLDOWN",
        "SPAM_RESTRICTED",
        "INVALID_CONTENT",
        "INSUFFICIENT_BALANCE",
        "MAYHEM_NOT_COMPLETED",
        "NOT_GROUP_ADMIN",
        "NO_ELIGIBLE_WALLET",
        "USER_BANNED",
      ],
      errors: {
        400: (0, l.nestError)("Bad Request").describe(
          "Missing video part, or cc INVALID_ARGUMENT: not a video container, a codec the server cannot convert, over 60 s",
        ),
        413: (0, l.nestError)("Payload Too Large").describe(
          "The video exceeds the 50 MiB multipart cap",
        ),
        429: l.userRateLimitError.describe(
          "The BFF bucket (callout-media-upload, 10/min) fired before cc was asked",
        ),
        503: !0,
      },
    },
    "POST /callout/voice": {
      summary:
        "Upload a callout voice note (audio-only m4a, AAC, 10 MiB, 120 s) for transcription; resolves synchronously with the transcript when clean, then attach the mediaId on POST /callout/create. Dark behind calloutVoiceUploads here and coinCommunitiesCalloutVoiceMedia on cc (400 VOICE_DISABLED)",
      multipart: !0,
      multipartFiles: ["audio"],
      response: U,
      emits: [
        "VOICE_DISABLED",
        "UNSUPPORTED_VOICE",
        "MEDIA_EXPIRED",
        "MEDIA_NOT_CLEAN",
        "MEDIA_NOT_OWNED",
        "PRICE_UNAVAILABLE",
        "DUPLICATE_CALLOUT",
        "MEDIA_RATE_LIMITED",
        "ATTEMPT_LIMIT",
        "COOLDOWN",
        "SPAM_RESTRICTED",
        "INVALID_CONTENT",
        "INSUFFICIENT_BALANCE",
        "MAYHEM_NOT_COMPLETED",
        "NOT_GROUP_ADMIN",
        "NO_ELIGIBLE_WALLET",
        "USER_BANNED",
      ],
      errors: {
        400: (0, l.nestError)("Bad Request").describe(
          "Missing audio part, or the lane is dark (VOICE_DISABLED), or cc INVALID_ARGUMENT: not an audio-only AAC clip, over 120 s (UNSUPPORTED_VOICE)",
        ),
        413: (0, l.nestError)("Payload Too Large").describe(
          "The clip exceeds the 10 MiB multipart cap",
        ),
        429: l.userRateLimitError.describe(
          "The BFF bucket (callout-voice-upload, 10/min) fired before cc was asked",
        ),
        503: !0,
      },
    },
    "GET /callout/media/{mediaId}": {
      summary: "Poll a callout video or voice-note upload (owner only)",
      params: o.z.object({ mediaId: o.z.string() }),
      response: U,
      emits: [
        "MEDIA_EXPIRED",
        "MEDIA_NOT_CLEAN",
        "MEDIA_NOT_OWNED",
        "VIDEO_DISABLED",
        "PRICE_UNAVAILABLE",
        "DUPLICATE_CALLOUT",
        "MEDIA_RATE_LIMITED",
        "ATTEMPT_LIMIT",
        "COOLDOWN",
        "SPAM_RESTRICTED",
        "INVALID_CONTENT",
        "INSUFFICIENT_BALANCE",
        "MAYHEM_NOT_COMPLETED",
        "NOT_GROUP_ADMIN",
        "NO_ELIGIBLE_WALLET",
        "USER_BANNED",
      ],
      errors: {
        404: (0, l.nestError)("Not Found").describe(
          "Unknown mediaId, or another user's upload",
        ),
        429: l.userRateLimitError.describe(
          "The BFF bucket (callout-media-status, 30/min) fired",
        ),
      },
    },
    "POST /callout/{calloutId}/replies": {
      summary: "Reply to a callout, optionally with an image upload",
      multipart: !0,
      params: o.z.object({ calloutId: o.z.string() }),
      body: o.z
        .object({
          content: o.z.string().max(2e3).optional(),
          replyToMessageId: o.z.string().min(1).optional(),
          isQuote: o.z.boolean().optional(),
          asGroupId: o.z.uuid().optional(),
        })
        .refine(
          ({ content: e, isQuote: t }) =>
            (!0 === t && !e) || (void 0 !== e && /\S/.test(e)),
          { path: ["content"] },
        ),
      response: o.z.object({
        replyId: o.z.string(),
        createdAt: o.z.string().nullable(),
        mediaUrl: o.z.string().nullable(),
        rootMessageId: o.z.string().nullable(),
      }),
      emits: [
        "MEDIA_REJECTED",
        "NOT_GROUP_ADMIN",
        "BLOCKED_BY_AUTHOR",
        "INSUFFICIENT_BALANCE",
        "NO_ELIGIBLE_WALLET",
        "PARENT_REPLY_NOT_FOUND",
        "CALLOUT_MODERATED",
        "COOLDOWN",
        "SPAM_RESTRICTED",
      ],
      errors: {
        400: (0, l.nestError)("Bad Request").describe(
          "Validation (message is the field list), an unexpected file field, or a cc INVALID_ARGUMENT",
        ),
        403: (0, l.nestError)("Forbidden").describe(
          "The most common 403: the wallet has no coin-communities profile",
        ),
        404: (0, l.nestError)("Not Found").describe(
          "cc NOT_FOUND for the callout itself",
        ),
        409: o.z
          .object({ message: o.z.string() })
          .describe("cc FAILED_PRECONDITION other than moderation"),
        413: (0, l.nestError)("Payload Too Large").describe(
          "The image exceeds the 15 MiB multipart cap",
        ),
        429: o.z
          .object({ message: o.z.string() })
          .describe("The route throttle (10/min); no 'error' key"),
        503: !0,
      },
    },
    "GET /callout/list/{userId}": (0, s.publicRead)("content.read", {
      summary:
        "List callouts for a user (legacy shape). Optional window=daily|weekly|monthly|last_round re-scopes to the stats-strip windows; re-send it with every pageToken request.",
      params: o.z.object({ userId: o.z.string() }),
      query: o.z.object({
        limit: o.z.number().int().min(1).optional(),
        sortBy: o.z
          .enum(["TIMESTAMP", "MULTIPLE"])
          .optional()
          .describe(
            "Optional with an API key. A request without an API key must send it on every page: once automatedClientQueryReject is live, an unkeyed request that omits sortBy or sortOrder is refused 403 Client not allowed",
          ),
        sortOrder: o.z
          .enum(["ASC", "DESC"])
          .optional()
          .describe(
            "Optional with an API key. A request without an API key must send it on every page: once automatedClientQueryReject is live, an unkeyed request that omits sortBy or sortOrder is refused 403 Client not allowed",
          ),
        pageToken: o.z.string().optional(),
        window: o.z
          .string()
          .transform((e) => e.trim().toUpperCase() || void 0)
          .pipe(
            o.z
              .enum(["DAILY", "WEEKLY", "MONTHLY", "ALLTIME", "LAST_ROUND"])
              .optional(),
          )
          .optional()
          .describe(
            'Case-insensitive and trimmed (daily, WEEKLY, " monthly " all accepted): daily|weekly|monthly re-scope to the stats-strip windows; last_round = callouts created between the two newest executed payout round cuts; alltime, empty and omitted all mean full history',
          ),
        includeMembers: o.z
          .boolean()
          .optional()
          .describe(
            "Squad id only: true lists the squad's own posts plus every active member's, newest first ignored on a person id, except that sortBy=MULTIPLE with includeMembers is a 400 on any id. Re-send it with every pageToken request.",
          ),
      }),
      response: o.z.object({
        callouts: o.z
          .array(h)
          .describe(
            "Can be shorter than the requested limit — rows whose callout is missing are dropped after the page is cut, so page on nextPageToken, not on array length",
          ),
        nextPageToken: o.z
          .string()
          .describe("Empty string on the last page; never omitted"),
      }),
    }),
    "GET /callout/leaderboard-stats/{userId}": (0, s.publicRead)(
      "content.read",
      {
        summary: "Get leaderboard stats for a user",
        params: o.z.object({ userId: o.z.string() }),
        response: f,
      },
    ),
    "GET /callout/user/{userId}/mint/{coinMint}": (0, s.publicRead)(
      "content.read",
      {
        summary:
          "Get a user callout for a coin (legacy shape); quotesLimit adds the callout-sheet carousel quotes",
        params: o.z.object({ userId: o.z.string(), coinMint: o.z.string() }),
        query: o.z.object({
          quotesLimit: o.z
            .number()
            .int()
            .min(0)
            .max(20)
            .optional()
            .describe("Absent or 0 = callout only"),
          chain: o.z
            .string()
            .optional()
            .describe(
              "ton:-239 (TON mainnet): {coinMint} must then be the CRC-checked 48-char bounceable EQ jetton master. starknet:SN_MAIN (Starknet mainnet, while starknet callouts are enabled): {coinMint} must then be a 0x felt address (0x + 1..64 hex), read and echoed as its canonical 0x + 64 lowercase form. A malformed chain answers the eligibility route body; any other well-formed chain is a 400",
            ),
        }),
        response: o.z.object({
          callout: u
            .nullable()
            .describe(
              "null when the user holds no live callout on this coin, or when it is a Starknet callout while starknet callouts are not enabled",
            ),
          quotes: a.userReplyRowDto
            .array()
            .describe(
              "The user's live reply-quotes on this coin, newest first, at most quotesLimit; always empty without quotesLimit or without a callout",
            ),
        }),
      },
    ),
    "GET /callout/eligibility/{coinMint}": {
      summary:
        "Check callout eligibility for a coin; chain=hlcore:* evaluates the perp arm",
      params: o.z.object({ coinMint: o.z.string() }),
      query: o.z.object({
        chain: o.z
          .string()
          .regex(
            /^(hlcore:(mainnet|testnet)|ton:-239|near:mainnet|starknet:SN_MAIN)$/,
          )
          .optional()
          .describe(
            "CAIP-2 chain of a perp ref (hlcore), a TON ref (ton:-239, coinMint = the friendly EQ... jetton master), a NEAR ref (near:mainnet, coinMint = the token account id) or a Starknet ref (starknet:SN_MAIN, coinMint = the 0x felt token address); hlcore evaluates the perp arm, ton:-239 the TON arm, near:mainnet the NEAR arm, starknet:SN_MAIN the Starknet arm",
          ),
      }),
      errors: {
        400: (0, l.nestError)("Bad Request").describe(
          "A malformed chain, or a ton:-239 chain whose coinMint is not the friendly EQ... jetton master, or a near:mainnet chain while near callouts are not enabled or whose coinMint is not a token account id, or a starknet:SN_MAIN chain while starknet callouts are not enabled or whose coinMint is not a 0x felt address",
        ),
      },
      response: o.z.discriminatedUnion("eligible", [
        o.z.object({ eligible: o.z.literal(!0), preflight: k }),
        o.z.object({
          eligible: o.z.literal(!1),
          reason: o.z.discriminatedUnion("type", [
            o.z.object({
              type: o.z.literal("EXISTING_CALLOUT"),
              existingCallout: u
                .optional()
                .describe(
                  "Omitted when cc reports the slot taken but the record read could not answer",
                ),
            }),
            o.z.object({ type: o.z.literal("ATTEMPT_LIMIT") }),
          ]),
          preflight: k,
        }),
      ]),
    },
    "GET /callout/coin/{coin}": (0, s.publicRead)("content.read", {
      summary:
        "List top callouts on a coin (legacy shape); chain=hlcore:* reads perp callouts by HyperCore coin name",
      params: o.z.object({
        coin: o.z
          .string()
          .describe(
            "A base58 or EVM mint, or with an hlcore chain the HyperCore coin name verbatim (BTC, kPEPE, xyz:TSLA; case-sensitive), or with ton:-239 the friendly EQ... jetton master, or with near:mainnet the token account id, or with starknet:SN_MAIN the 0x felt token address",
          ),
      }),
      query: o.z.object({
        chain: o.z
          .string()
          .max(64)
          .regex(
            /^((solana|eip155):[A-Za-z0-9]{1,48}|hlcore:(mainnet|testnet)|ton:-239|near:mainnet|starknet:SN_MAIN)$/,
          )
          .optional()
          .describe(
            "CAIP-2 chain; hlcore keeps only that chain perp rows, ton:-239 only TON rows, near:mainnet only NEAR rows, starknet:SN_MAIN only Starknet rows, absent or solana/eip155 keeps only token rows",
          ),
        limit: o.z
          .number()
          .int()
          .min(1)
          .max(100)
          .optional()
          .describe("Default 50"),
      }),
      response: o.z.object({
        callouts: o.z
          .array(u)
          .describe(
            "Empty when cc knows no such coin; can be shorter than limit after the chain filter",
          ),
      }),
      errors: {
        400: (0, l.nestError)("Bad Request").describe(
          "Not a base58 or EVM mint without an hlcore chain, or a malformed chain or limit",
        ),
      },
    }),
    "GET /callout/replies/{replyId}/chain": (0, s.publicRead)("content.read", {
      summary: "Get a reply's ancestor chain up to its callout",
      params: D,
      response: o.z.object({
        callout: a.calloutWithAuthorDto
          .nullable()
          .describe(
            "null when the callout is deleted or moderation-hidden (the chain still serves)",
          ),
        ancestors: o.z
          .array(a.calloutReplyDto)
          .describe(
            "Thread top first, immediate parent last; [] when the reply is a thread top. A dead ancestor is a tombstone placeholder",
          ),
        reply: a.calloutReplyDto,
      }),
      emits: ["REPLY_NOT_FOUND"],
    }),
    "GET /callout/replies/list/{userId}": (0, s.publicRead)("content.read", {
      summary:
        "List a user's callout replies with thread context. filter (ALL|REPLIES|QUOTES) narrows to plain replies or quote posts; omitted = ALL, the interleaved list.",
      params: o.z.object({ userId: o.z.string() }),
      query: o.z.object({
        limit: o.z.number().int().min(1).optional(),
        beforeId: o.z
          .string()
          .optional()
          .describe("Keyset cursor: a reply id from a previous page"),
        filter: o.z.enum(["ALL", "REPLIES", "QUOTES"]).optional(),
        includeMembers: o.z
          .boolean()
          .optional()
          .describe(
            "Squad id only: true lists the squad's own posts plus every active member's, newest first (TIMESTAMP sort only on the callouts read); ignored on a person id. Re-send it with every beforeId request.",
          ),
      }),
      response: o.z.object({
        replies: o.z
          .array(a.userReplyRowDto)
          .describe(
            "Newest first; a page shorter than the requested limit marks the end. The user's own dead replies are simply absent",
          ),
      }),
    }),
    "GET /callout/replies/{replyId}/likers": (0, s.publicRead)("graph.read", {
      summary: "List the profiles who liked a callout reply",
      params: D,
      query: O,
      response: A,
    }),
    "GET /callout/replies/{replyId}/reposters": (0, s.publicRead)(
      "graph.read",
      {
        summary: "List the profiles who reposted a callout reply",
        params: D,
        query: O,
        response: P,
      },
    ),
    "GET /callout/reposts/list/{userId}": (0, s.publicRead)("content.read", {
      summary: "List a user's reposts",
      params: o.z.object({ userId: o.z.string() }),
      query: o.z.object({
        limit: o.z.number().int().min(1).optional(),
        cursor: o.z
          .string()
          .optional()
          .describe("Opaque keyset cursor from the previous page's nextCursor"),
        includeQuotes: o.z
          .boolean()
          .optional()
          .describe(
            "Interleaves the user's quotes as kind='quote' rows; absent/false serves plain reposts only",
          ),
      }),
      response: o.z.object({
        reposts: o.z
          .array(a.repostDto)
          .describe(
            "Newest first; moderation-hidden rows and dead-target rows are absent",
          ),
        nextCursor: o.z
          .string()
          .nullable()
          .describe("null when there are no more results"),
      }),
    }),
    "GET /callout/{calloutId}/replies": (0, s.publicRead)("content.read", {
      summary: "List replies on a callout",
      params: N,
      query: o.z.object({
        limit: o.z.number().int().min(1).optional(),
        beforeId: o.z
          .string()
          .optional()
          .describe(
            "Keyset cursor; recency-only — cc rejects it with POSITION sort",
          ),
        page: o.z
          .number()
          .int()
          .min(0)
          .optional()
          .describe("Offset page for POSITION walks (rank has no keyset)"),
        filter: o.z.enum(["ALL", "EXCLUDE_AUTHOR", "AUTHOR_ONLY"]).optional(),
        sort: o.z.enum(["RECENCY", "POSITION", "PNL"]).optional(),
        parentReplyId: o.z
          .string()
          .optional()
          .describe(
            "Page one reply's direct children instead of the callout's top level",
          ),
        nestedLimit: o.z
          .number()
          .int()
          .min(0)
          .optional()
          .describe(
            "Hydrate up to N newest preview children per row; cc caps at 10",
          ),
      }),
      response: o.z.object({
        replies: o.z
          .array(a.calloutReplyDto)
          .describe(
            "One tree level, newest first; a page shorter than the requested limit marks the end of that level. On the ALL filter a dead reply whose subtree still holds live rows rides the page as a tombstone stub",
          ),
      }),
      emits: ["PARENT_REPLY_NOT_FOUND"],
    }),
    "GET /callout/{calloutId}/likers": (0, s.publicRead)("graph.read", {
      summary: "List the profiles who liked a callout",
      params: N,
      query: O,
      response: A,
    }),
    "GET /callout/{calloutId}/tailers": (0, s.publicRead)("content.read", {
      summary: "List the wallets that tailed a callout",
      params: N,
      query: O,
      response: S,
      errors: {
        400: (0, l.nestError)("Bad Request").describe(
          "calloutId is not a UUID, a malformed limit/offset, or offset over 10000 (cc INVALID_ARGUMENT)",
        ),
        404: (0, l.nestError)("Not Found").describe(
          "cc NOT_FOUND: unknown or hidden callout",
        ),
      },
    }),
    "GET /callout/{calloutId}/reposters": (0, s.publicRead)("graph.read", {
      summary: "List the profiles who reposted a callout",
      params: N,
      query: O,
      response: P,
    }),
    "GET /callout/{calloutId}/quotes": (0, s.publicRead)("content.read", {
      summary: "List quote posts of a callout",
      params: N,
      query: O,
      response: o.z.object({
        quotes: o.z
          .array(a.calloutReplyDto)
          .describe(
            "Reply-shaped quotes only, newest first — the pre-quote-callout shape, kept for readers that predate items",
          ),
        items: o.z
          .array(
            o.z.discriminatedUnion("kind", [
              o.z.object({
                kind: o.z.literal("reply"),
                reply: a.calloutReplyDto,
                rank: _,
              }),
              o.z.object({
                kind: o.z.literal("callout"),
                callout: a.calloutWithAuthorDto,
                rank: _,
              }),
            ]),
          )
          .describe(
            "The full page, newest first (on a ranked page the viewer's follows first, each tier newest first), both shapes merged; scope matches quoteCount exactly. hasMore answers this merged page, not quotes",
          ),
        hasMore: o.z.boolean(),
        recommendationId: E,
      }),
    }),
    "POST /callout/{calloutId}/repost": {
      summary:
        "Repost a callout, or one of its replies via replyId (author reposts freely; others must hold ≥$1 of the token). Idempotent toggle.",
      params: N,
      body: o.z.object({
        replyId: o.z
          .string()
          .min(1)
          .optional()
          .describe(
            "Reply (any depth in this callout's thread) to repost instead of the callout itself",
          ),
      }),
      response: o.z.object({
        created: o.z
          .boolean()
          .describe("False only for a repost that already existed"),
        repostId: o.z.string().nullable().describe("null when created=false"),
        createdAt: o.z.string().nullable(),
      }),
      emits: [
        "REPLY_NOT_FOUND",
        "COOLDOWN",
        "SPAM_RESTRICTED",
        "INSUFFICIENT_BALANCE",
        "NO_ELIGIBLE_WALLET",
      ],
    },
    "DELETE /callout/{calloutId}/repost": {
      summary: "Undo a plain repost of a callout or reply",
      params: N,
      query: o.z.object({
        replyId: o.z
          .string()
          .min(1)
          .optional()
          .describe(
            "Undo the plain repost of this reply instead of the callout's",
          ),
      }),
      response: o.z.object({
        removed: o.z
          .boolean()
          .describe(
            "False when no matching repost existed (idempotent success)",
          ),
      }),
    },
    "POST /callout/{calloutId}/like": {
      summary: "Like a callout",
      params: N,
      response: o.z.object({
        created: o.z
          .boolean()
          .describe("False when the like already existed (idempotent toggle)"),
      }),
    },
    "DELETE /callout/{calloutId}/like": {
      summary: "Unlike a callout",
      params: N,
      response: o.z.object({
        removed: o.z
          .boolean()
          .describe("False when no like existed (idempotent success)"),
      }),
    },
    "POST /callout/replies/{replyId}/like": {
      summary: "Like a callout reply",
      params: D,
      response: o.z.object({
        created: o.z
          .boolean()
          .describe("False when the like already existed (idempotent toggle)"),
      }),
    },
    "DELETE /callout/replies/{replyId}/like": {
      summary: "Unlike a callout reply",
      params: D,
      response: o.z.object({
        removed: o.z
          .boolean()
          .describe("False when no like existed (idempotent success)"),
      }),
    },
    "GET /callout/onboarding": {
      summary: "Get the onboarding callout for the authenticated user",
      query: o.z.object({
        os: o.z
          .string()
          .max(16)
          .optional()
          .describe(
            'Device OS the client declares ("ios"/"android") — a hint, never auth',
          ),
        country: o.z
          .string()
          .max(8)
          .optional()
          .describe(
            "ISO 3166-1 alpha-2 country code — device-locale hint, never auth",
          ),
      }),
      response: o.z.object({
        source: o.z
          .enum(["REFERRER", "CONFIGURED_MINT"])
          .nullable()
          .describe(
            "Branch cc served the callout from; null when cc served none or reported a branch this build does not know",
          ),
        chainId: o.z
          .number()
          .nullable()
          .describe(
            "Codex network id of the callout's coin; null when the coin's community records no chain",
          ),
        positionValueUsd: o.z
          .number()
          .nullable()
          .describe(
            "CONFIGURED_MINT only: the ranked position's current USD value. null means unknown, never a real 0",
          ),
        callout: m
          .nullable()
          .describe(
            "null when neither branch yields a callout, and when the row could not be mapped to the legacy shape",
          ),
      }),
    },
    "GET /callout/{calloutId}": (0, s.publicRead)("content.read", {
      summary: "Get a callout by id with its author identity",
      params: N,
      response: o.z.object({
        callout: m
          .nullable()
          .describe(
            "null when no callout carries that id and when the row could not be mapped to the legacy shape",
          ),
      }),
      emits: ["CALLOUT_NOT_FOUND"],
    }),
  });
};
