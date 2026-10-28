// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.postDto = r.postMentionDto = r.postKindName = void 0));
  let o = e.r(876543),
    n = e.r(890664);
  ((r.postKindName = o.z.enum(["root", "reply", "quote", "repost"])),
    (r.postMentionDto = o.z.object({
      userId: o.z.string(),
      username: o.z.string(),
      walletAddress: o.z
        .string()
        .nullable()
        .describe("Canonical SVM wallet; null when the user has none"),
    })));
  let s = {
    postId: o.z.string(),
    kind: r.postKindName
      .nullable()
      .describe("null only on a tombstone whose underlying row is gone"),
    author: n.normalizedProfile.nullable().describe("null on tombstones"),
    content: o.z.string().nullable(),
    mediaUrl: o.z
      .string()
      .nullable()
      .describe("Server-minted CDN URL; null when the post carries no image"),
    createdAt: o.z.string().nullable().describe("ISO 8601"),
    parentPostId: o.z
      .string()
      .nullable()
      .describe("Reply rows: the direct parent"),
    rootPostId: o.z.string().nullable().describe("Reply rows: the thread root"),
    quotedPostId: o.z
      .string()
      .nullable()
      .describe(
        'Set on quotes even when the target is gone: set with `quoted` null means "quote of an unavailable post"',
      ),
    repostedPostId: o.z
      .string()
      .nullable()
      .describe("Repost rows: the reposted post"),
    likeCount: o.z.number(),
    replyCount: o.z.number(),
    repostCount: o.z.number(),
    quoteCount: o.z.number(),
    mentions: o.z.array(r.postMentionDto),
    hasLiked: o.z
      .boolean()
      .nullable()
      .describe(
        "null when the request had no viewer; always false on repost rows (read reposted.hasLiked)",
      ),
    hasReposted: o.z
      .boolean()
      .nullable()
      .describe(
        "null when the request had no viewer; always false on repost rows (read reposted.hasReposted)",
      ),
    deleted: o.z
      .boolean()
      .describe(
        "Tombstone marker, only ever true on a `parent` embed: ids, kind, createdAt and counts survive; content, media, author and mentions are cleared",
      ),
  };
  r.postDto = o.z.object(s).extend({
    get parent() {
      return r.postDto
        .nullable()
        .describe(
          "Reply rows: a deleted parent is a tombstone (deleted=true, author null); a moderation-hidden parent is null with parentPostId still set",
        );
    },
    get quoted() {
      return r.postDto
        .nullable()
        .describe("Quote rows: null when the target is hidden or deleted");
    },
    get reposted() {
      return r.postDto
        .nullable()
        .describe("Repost rows: always present on a served repost");
    },
  });
};
