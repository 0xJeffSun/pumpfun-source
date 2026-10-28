// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.postsRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = e.r(443063),
    i = e.r(890664),
    l = o.z.object({ postId: o.z.string() }),
    d = i.normalizedProfile.extend({
      viewerFollows: o.z
        .boolean()
        .optional()
        .describe(
          "Whether the authenticated viewer follows this user; absent on unauthenticated reads",
        ),
    }),
    c = o.z.object({
      cursor: o.z
        .string()
        .max(200)
        .optional()
        .describe(
          "Keyset cursor from the previous response's nextCursor; omit for the first page",
        ),
      limit: o.z
        .number()
        .int()
        .min(1)
        .optional()
        .describe("Page size; default 50, clamped to 200"),
    }),
    u = o.z.object({
      limit: o.z
        .number()
        .int()
        .min(1)
        .optional()
        .describe("Page size; default 50, clamped to 200"),
      offset: o.z
        .number()
        .int()
        .min(0)
        .max(1e4)
        .optional()
        .describe("Offset paging (no keyset on this read); default 0"),
    }),
    h = o.z.string().nullable().describe("null means end of list");
  r.postsRoutes = (0, n.defineRoutes)({
    "GET /posts": (0, s.publicRead)("content.read", {
      summary:
        "Posts by id (at most 100), with one-level embeds and viewer stamps when signed in. Unknown, hidden and deleted ids are simply absent.",
      query: o.z.object({
        ids: o.z
          .array(o.z.uuid())
          .min(1)
          .max(100)
          .describe(
            "Comma-separated post ids (UUID), at most 100; duplicates collapse",
          ),
      }),
      response: o.z.object({
        posts: o.z
          .array(a.postDto)
          .describe(
            "Request order; unknown, hidden and deleted ids leave no placeholder",
          ),
      }),
    }),
    "GET /posts/{postId}": (0, s.publicRead)("content.read", {
      summary:
        "One post with its one-level embeds and viewer stamps when signed in. 404 for unknown, hidden or deleted posts.",
      params: l,
      response: o.z.object({ post: a.postDto }),
    }),
    "GET /posts/{postId}/replies": (0, s.publicRead)("content.read", {
      summary:
        "Direct live replies to a post, newest first, keyset-paginated (nextCursor null = end). 404 unless the post is live.",
      params: l,
      query: c,
      response: o.z.object({
        replies: o.z
          .array(a.postDto)
          .describe(
            "Direct live replies, newest first; page on nextCursor, not array length",
          ),
        nextCursor: h,
      }),
    }),
    "GET /posts/{postId}/quotes": (0, s.publicRead)("content.read", {
      summary:
        "Live quotes of a post, newest first, keyset-paginated (nextCursor null = end). 404 unless the post is live.",
      params: l,
      query: c,
      response: o.z.object({
        quotes: o.z.array(a.postDto).describe("Live quotes, newest first"),
        nextCursor: h,
      }),
    }),
    "GET /posts/{postId}/likers": (0, s.publicRead)("graph.read", {
      summary:
        "Profiles who liked a post, newest like first, offset-paginated; viewerFollows stamped when signed in. 404 unless the post is live.",
      params: l,
      query: u,
      response: o.z.object({
        likers: o.z.array(d).describe("Newest like first"),
        hasMore: o.z.boolean(),
      }),
    }),
    "GET /posts/{postId}/reposters": (0, s.publicRead)("graph.read", {
      summary:
        "Profiles who plain-reposted a post, newest first, offset-paginated; viewerFollows stamped when signed in. 404 unless the post is live.",
      params: l,
      query: u,
      response: o.z.object({
        reposters: o.z
          .array(d)
          .describe("Newest repost first; plain reposts only"),
        hasMore: o.z.boolean(),
      }),
    }),
  });
};
