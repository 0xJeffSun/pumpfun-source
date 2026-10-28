// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.dmsRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = o.z.object({ conversationId: o.z.string() }),
    a = o.z.object({
      limit: o.z
        .number()
        .int()
        .min(1)
        .max(200)
        .optional()
        .describe("Page size; default 50, capped at 200"),
      cursor: o.z
        .string()
        .optional()
        .describe("Opaque keyset cursor from a previous response"),
    }),
    i = o.z.object({
      downloadUrl: o.z
        .string()
        .describe(
          "Short-lived presigned GET URL, re-minted on every read — never persist it",
        ),
      width: o.z.number().nullable(),
      height: o.z.number().nullable(),
      mimeType: o.z.string().nullable(),
      blurhash: o.z.string().nullable(),
    }),
    l = o.z.object({
      messageId: o.z.string(),
      conversationId: o.z.string(),
      senderId: o.z.string(),
      content: o.z.string(),
      media: i.nullable(),
      isSpam: o.z.boolean(),
      isHarmful: o.z.boolean(),
      createdAt: o.z.string().nullable().describe("ISO 8601"),
    }),
    d = o.z.object({
      userId: o.z.string(),
      unreadCount: o.z.number(),
      lastReadMessageId: o.z.string().nullable(),
      lastReadAt: o.z.string().nullable(),
      lastActiveAt: o.z
        .string()
        .nullable()
        .describe("This participant's app-wide last-seen; null when unknown"),
    }),
    c = o.z.object({
      messages: o.z.array(l).describe("Newest first"),
      readStates: o.z
        .array(d)
        .describe("One row per participant, the caller included"),
      nextCursor: o.z.string().nullable().describe("null means end of list"),
    }),
    u = o.z.object({
      isArchived: o.z.boolean(),
      isMuted: o.z
        .boolean()
        .describe(
          "Authoritative mute flag: key mute state off this, not mutedUntil",
        ),
      mutedUntil: o.z
        .string()
        .nullable()
        .describe("null when unmuted OR muted indefinitely; display-only"),
      pinnedAt: o.z.string().nullable(),
    }),
    h = u.extend({
      conversationId: o.z.string(),
      peerId: o.z.string(),
      unreadCount: o.z.number(),
      lastReadMessageId: o.z.string().nullable(),
      lastActivityAt: o.z.string().nullable(),
      lastActiveAt: o.z
        .string()
        .nullable()
        .describe(
          "The peer's app-wide last-seen (~1 min granularity, 1-day TTL); null when unknown",
        ),
      lastMessage: l.nullable(),
    });
  r.dmsRoutes = (0, n.defineRoutes)({
    "POST /dms/to/{userId}/messages": {
      summary: "Send a direct message, optionally with an image upload",
      multipart: !0,
      params: o.z.object({ userId: o.z.string() }),
      body: o.z.object({
        content: o.z
          .string()
          .max(2e3)
          .regex(/\S/)
          .or(o.z.literal(""))
          .optional(),
        mediaWidth: o.z.number().int().min(1).optional(),
        mediaHeight: o.z.number().int().min(1).optional(),
        mediaBlurhash: o.z.string().max(128).optional(),
      }),
      response: l,
      emits: ["NOT_MUTUAL", "RATE_LIMITED", "MEDIA_REJECTED"],
    },
    "GET /dms/inbox": {
      summary:
        "Conversation list, newest activity first, with unread counts, a preview of the latest message, and the caller's own archive/mute/pin prefs. Optional filter=inbox|archived slices by archived state (omitted = everything).",
      query: a.extend({
        filter: o.z
          .enum(["inbox", "archived"])
          .optional()
          .describe("Archived-state slice; omitted = everything"),
      }),
      response: o.z.object({
        entries: o.z.array(h),
        nextCursor: o.z.string().nullable().describe("null means end of list"),
      }),
    },
    "PATCH /dms/conversations/{conversationId}": {
      summary:
        "Set the caller's private archive/mute/pin prefs on a conversation (partial update: omitted fields keep their stored value; prefs are never visible to the peer). Echoes the resolved post-write state. 404 unless the caller is a participant.",
      params: s,
      body: o.z.object({
        isArchived: o.z
          .boolean()
          .optional()
          .describe(
            "true = archive as of now (auto-unarchives on new activity); false = unarchive",
          ),
        isMuted: o.z
          .boolean()
          .optional()
          .describe(
            "true = mute (until mutedUntil when set, indefinitely when not); false = unmute",
          ),
        mutedUntil: o.z
          .string()
          .optional()
          .describe(
            "ISO timestamp; only legal alongside isMuted: true, and must be in the future",
          ),
        isPinned: o.z
          .boolean()
          .optional()
          .describe("true = pin (re-pin bumps pinnedAt); false = unpin"),
      }),
      response: u,
    },
    "GET /dms/conversations/{conversationId}/messages": {
      summary:
        "One conversation's messages, newest first (viewer must be a participant)",
      params: s,
      query: a,
      response: c,
    },
    "GET /dms/with/{userId}/messages": {
      summary: "The caller's conversation with a specific user, newest first",
      params: o.z.object({ userId: o.z.string() }),
      query: a,
      response: c,
    },
    "POST /dms/conversations/{conversationId}/read": {
      summary:
        "Zero the caller's unread count and advance their read pointer in a conversation",
      params: s,
      body: o.z.object({
        upToMessageId: o.z
          .uuid()
          .optional()
          .describe(
            "Advances the read pointer to this message; unread is zeroed whether or not it is sent",
          ),
      }),
      response: o.z.object({ ok: o.z.boolean() }),
    },
    "GET /dms/eligibility/{userId}": {
      summary:
        "Whether the caller and the given user can DM right now (mutual follow, both directions)",
      params: o.z.object({ userId: o.z.string() }),
      response: o.z.object({ isMutual: o.z.boolean() }),
    },
  });
};
