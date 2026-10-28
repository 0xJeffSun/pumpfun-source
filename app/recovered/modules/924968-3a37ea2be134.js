// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.moderationRoutes = r.markVerifiedBody = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = o.z.object({
      id: o.z.number().int(),
      timestamp: o.z.number(),
      moderator: o.z.string(),
      description: o.z.string(),
      user_id: o.z.string().nullable(),
    }),
    i = o.z.object({
      id: o.z.string().describe("coin-communities user id (UUID)"),
      origin: o.z
        .string()
        .describe(
          "Always empty: coin-communities keeps no ban origin (TASK-4901)",
        ),
      expires: o.z.number(),
      created_at: o.z.number().nullable(),
      banned_at: o.z.number().nullable(),
      address: o.z.string().nullable(),
      reason: o.z.string().nullable(),
      unban_request: o.z.boolean().nullable(),
      username: o.z.string().nullable(),
      profile_image: o.z.string().nullable(),
    }),
    l = o.z.object({
      banId: o.z.string().optional(),
      targetUserId: o.z.string().optional(),
      targetAddress: o.z.string().optional(),
      reason: o.z.string().optional(),
      bannedBy: o.z.string().optional(),
      createdAt: o.z
        .string()
        .nullable()
        .optional()
        .describe("ISO 8601 timestamp"),
      expiresAt: o.z
        .string()
        .nullable()
        .optional()
        .describe("ISO 8601 timestamp; null means a permanent ban"),
    }),
    d = o.z.object({
      success: o.z
        .boolean()
        .describe("Whether the moderation action succeeded"),
      message: o.z.string().describe("Human-readable result message"),
    });
  r.markVerifiedBody = o.z.object({
    verified: o.z.boolean(),
    chain: o.z
      .string()
      .max(64)
      .regex(/^(eip155:\d+|solana:[A-Za-z0-9]+|near:mainnet|starknet:SN_MAIN)$/)
      .optional()
      .describe(
        "CAIP-2 chain of the one deployment the write applies to (TASK-5601). Omitted = the mint-only write, every EVM row sharing the address. near:mainnet takes a NEAR account id as the mint (any other form is a 400) and is a 400 while uapiNearCards is off. starknet:SN_MAIN takes a Starknet felt (0x + 1..64 hex, any case, a 0x+40 included) written as 0x + 64 lowercase hex (any other form is a 400) and is a 400 while uapiStarknetCards is off.",
      ),
  });
  let c = o.z
    .string()
    .optional()
    .describe(
      "CAIP-2 chain of the coin (SK-S25, CS-A1). Only starknet:SN_MAIN and near:mainnet are read. starknet:SN_MAIN, only while uapiStarknetCards is live: the mint is then a Starknet felt (0x + 1..64 hex, any case, a 0x+40 included) written as 0x + 64 lowercase hex (any other form is a 400). near:mainnet, only while uapiNearCards is live: the mint is then a NEAR account id written verbatim (a named or 64-hex implicit id, or a 0x-implicit id; any other form is a 400). Any other value, or either value while its key is off, is ignored.",
    );
  r.moderationRoutes = (0, n.defineRoutes)({
    "GET /moderation/logs": {
      summary: "List moderator action logs",
      query: o.z.object({
        offset: o.z.number().int().optional(),
        limit: o.z.number().int().optional(),
        moderator: o.z.string().optional(),
      }),
      response: o.z.array(a).nullable(),
    },
    "POST /moderation/ban/address/{address}": {
      summary: "Ban a wallet address",
      params: o.z.object({ address: o.z.string() }),
      body: o.z.object({
        expires: o.z
          .number()
          .int()
          .describe("Ban expiry as a Unix timestamp in milliseconds."),
        reason: o.z.string().optional(),
      }),
      response: l,
    },
    "GET /moderation/ban/address/{address}": (0, s.publicRead)(
      "moderation.read",
      {
        summary: "Check whether a wallet address is banned",
        params: o.z.object({ address: o.z.string() }),
        response: o.z
          .boolean()
          .describe(
            "true while the address is banned (a permanent ban, or a temporary ban that has not expired); false otherwise. Never null.",
          ),
      },
    ),
    "POST /moderation/mark-as-nsfw/{mint}": {
      summary: "Mark a coin as NSFW or SFW",
      params: o.z.object({ mint: o.z.string() }),
      body: o.z.object({ nsfw: o.z.boolean(), chain: c }),
      response: o.z.void(),
    },
    "GET /moderation/ban-users": {
      summary: "List banned users",
      query: o.z.object({
        limit: o.z.number().int().optional(),
        offset: o.z.number().int().optional(),
        sortBy: o.z.string().optional(),
        order: o.z.string().optional(),
        searchQuery: o.z.string().optional(),
        active: o.z.boolean().optional(),
        unbanRequest: o.z.boolean().optional(),
        fromDate: o.z.number().int().optional(),
        toDate: o.z.number().int().optional(),
      }),
      response: o.z.array(i),
    },
    "POST /moderation/delete-photo/{mint}": {
      summary: "Delete a coin photo",
      params: o.z.object({ mint: o.z.string() }),
      body: o.z.object({ chain: c }).optional(),
      response: d,
    },
    "POST /moderation/delete-banner/{mint}": {
      summary: "Delete a coin banner",
      params: o.z.object({ mint: o.z.string() }),
      body: o.z.object({ chain: c }).optional(),
      response: d,
    },
  });
};
