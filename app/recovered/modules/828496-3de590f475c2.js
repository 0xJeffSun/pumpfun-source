// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.feedRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = e.r(540480),
    i = e.r(617159),
    l = o.z.object({
      name: (0, i.openEnum)(
        ["low", "mid", "high"],
        "ABR rung, livestream-service-owned",
      ),
      height: o.z.number(),
      playlistUrl: o.z.string(),
      playlistS3Key: o.z.string().optional(),
    }),
    d = o.z
      .object({
        roomName: o.z
          .string()
          .describe("The coin mint the clip was recorded in"),
        clipId: o.z.string(),
        startTime: o.z.string().describe("ISO 8601"),
        endTime: o.z.string().describe("ISO 8601"),
        duration: o.z.number().describe("Seconds"),
        playlistUrl: o.z
          .string()
          .optional()
          .describe("HLS playlist for playback"),
        mp4Url: o.z.string().optional(),
        mp4S3Key: o.z.string().optional(),
        mp4SizeBytes: o.z.number().optional(),
        mp4CreatedAt: o.z.string().optional(),
        thumbnailUrl: o.z.string(),
        thumbnailS3Key: o.z.string(),
        playlistS3Key: o.z.string(),
        variants: o.z
          .array(l)
          .optional()
          .describe("ABR variants (low/mid/high)"),
        title: o.z.string().optional(),
        hidden: o.z
          .boolean()
          .optional()
          .describe(
            "Always false here: hidden clips are filtered out of the feed",
          ),
        hiddenReason: o.z
          .string()
          .optional()
          .describe("`banned` | `user_hidden`"),
        sessionId: o.z.string().optional(),
        clipType: o.z.string().optional().describe("e.g. `HIGHLIGHT`"),
        createdAt: o.z.string().optional(),
        highlightCreatorAddress: o.z.string().optional(),
        viewCount: o.z.number().optional().describe("Total across all shards"),
        pinnedAt: o.z.string().optional().describe("Set means pinned"),
        deletionStatus: o.z
          .string()
          .optional()
          .describe("`ACTIVE` | `SOFT_DELETED` | `HARD_DELETED`"),
        softDeletedAt: o.z.string().optional(),
        hardDeleteScheduledAt: o.z.string().optional(),
        hardDeletedAt: o.z.string().optional(),
        deletionReason: o.z
          .string()
          .optional()
          .describe(
            "`manual` | `expired` | `unpinned_expired` | `policy_violation`",
          ),
      })
      .describe("The livestream-service clip record, forwarded verbatim");
  r.feedRoutes = (0, n.defineRoutes)({
    "GET /feed/video-feed": (0, s.publicRead)("content.read", {
      summary: "Get the curated video feed",
      response: o.z.array(
        o.z.discriminatedUnion("feedItemType", [
          o.z.object({
            feedItemType: o.z.literal("clip"),
            clip: d,
            coin: a.coinDto,
          }),
          o.z.object({ feedItemType: o.z.literal("live"), coin: a.coinDto }),
        ]),
      ),
    }),
  });
};
