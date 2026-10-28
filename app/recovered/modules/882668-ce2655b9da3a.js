// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.onboardingSuggestion =
      r.viewerFollowFields =
      r.pnlBoardTopPosition =
      r.pnlBoardPosition =
        void 0));
  let o = e.r(876543);
  ((r.pnlBoardPosition = o.z.object({
    mint: o.z.string(),
    chainId: o.z.number(),
    symbol: o.z
      .string()
      .nullable()
      .describe("Null for anything coin-service does not index"),
    name: o.z.string().nullable(),
    imageUri: o.z.string().nullable(),
  })),
    (r.pnlBoardTopPosition = r.pnlBoardPosition.extend({
      chainId: o.z
        .number()
        .nullable()
        .describe(
          "Codex network id; null on a chain with none (starknet:SN_MAIN, near:mainnet), which names itself by chain",
        ),
      chain: o.z
        .string()
        .optional()
        .describe(
          "CAIP-2 chain (starknet:SN_MAIN, or near:mainnet with mint the NEAR account id verbatim); present only on a chain with no Codex id, absent on every other row",
        ),
    })),
    (r.viewerFollowFields = {
      isViewer: o.z
        .boolean()
        .optional()
        .describe("Present only on a response with an authenticated viewer"),
      viewerFollows: o.z
        .boolean()
        .nullable()
        .optional()
        .describe("Null means unknown or nothing to follow"),
    }),
    (r.onboardingSuggestion = o.z.object({
      walletAddress: o.z.string(),
      userId: o.z
        .string()
        .nullable()
        .describe("cc user id; null when the profile lookup missed"),
      username: o.z
        .string()
        .describe(
          "Never null — a row with no username is dropped, not blanked",
        ),
      profileImage: o.z.string().nullable(),
      isVerified: o.z.boolean(),
      verifiedBadgeVisible: o.z
        .boolean()
        .describe(
          "Badge rendering hint beside isVerified: show the checkmark only when both are true",
        ),
      resolvedAvatarDecoration: o.z
        .string()
        .nullable()
        .describe(
          "The border a viewer draws on the avatar, resolved by cc against the owner's unlocks (TASK-6093); null = no border, or no cc profile",
        ),
      pnlUsd: o.z
        .number()
        .nullable()
        .describe(
          "The account's live 24h PnL in USD, the same figure the PnL board shows — read off that board when the account is on it, otherwise from the portfolio summary GET /pnl-leaderboard/rank uses for an off-board row. NOT the scored table's pnl_usd_24h, which is net cash flow and disagrees with the board by tens of thousands of dollars. Null means only that the lookup failed or timed out; it is rare, and the row is still a valid suggestion, so render it without the amount rather than dropping it.",
        ),
      followers: o.z
        .number()
        .nullable()
        .describe(
          "Follower count carried through from profile enrichment; null on the degraded path, where the board rows carry none",
        ),
    })));
};
