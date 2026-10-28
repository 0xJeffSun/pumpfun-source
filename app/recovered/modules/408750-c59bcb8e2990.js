// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(735821),
    r = e.i(759257),
    l = e.i(605587);
  class a extends Error {
    constructor(e) {
      (super(`Callout not found: ${e}`), (this.name = "CalloutNotFoundError"));
    }
  }
  async function n(e) {
    let { calloutId: r, signal: l } = e;
    try {
      let e = await (0, t.Q)({ calloutId: r, signal: l });
      return e ? { status: "found", callout: e } : { status: "missing" };
    } catch (e) {
      if (
        "object" == typeof e &&
        null !== e &&
        "name" in e &&
        "AbortError" === e.name
      )
        throw e;
      return { status: "failed", error: e };
    }
  }
  async function i(e) {
    let { mint: t, calloutId: r, signal: i } = e,
      s = await n({ calloutId: r, signal: i });
    if ("failed" === s.status)
      throw s.error instanceof Error
        ? s.error
        : Error("Failed to fetch callout: unknown error");
    if ("found" === s.status && (0, l.I)(s.callout.coinMint, t))
      return { callout: s.callout, hasCommunityThread: !0 };
    throw new a(r);
  }
  async function s(e) {
    let {
      calloutId: t,
      scope: l = "author",
      parentReplyId: a,
      includeTombstones: n = !1,
      signal: i,
    } = e;
    return (
      (
        await (0, r.j)()("GET /callout/{calloutId}/replies", {
          params: { calloutId: t },
          query: {
            limit: 200,
            filter: "all" === l ? "ALL" : "AUTHOR_ONLY",
            parentReplyId: a || void 0,
          },
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          signal: i,
          hooks: {
            afterResponse: [
              (e, t, r) => {
                if (404 === r.status) return Response.json({ replies: [] });
                if (!r.ok)
                  throw Error(`Failed to fetch callout replies: ${r.status}`);
              },
            ],
          },
        })
      ).replies ?? []
    )
      .filter((e) => n || !e.tombstone)
      .map((e) => {
        var r, l;
        let a, n;
        return (
          (r = e),
          (l = t),
          (n = r.walletAddress?.trim() || void 0),
          {
            replyId: r.id,
            calloutId: l,
            userId: n ?? r.userId,
            ...(r.userId ? { authorCcUserId: r.userId } : {}),
            content: r.content,
            createdAt:
              r.createdAt && Number.isFinite((a = Date.parse(r.createdAt)))
                ? a
                : 0,
            likeCount: r.likeCount,
            likedByViewer: r.hasLiked ?? !1,
            mediaUrl: r.mediaUrl ?? null,
            ...(void 0 !== r.directReplyCount
              ? { directReplyCount: r.directReplyCount }
              : {}),
            ...(void 0 !== r.threadReplyCount
              ? { threadReplyCount: r.threadReplyCount }
              : {}),
            ...(r.tombstone ? { tombstone: !0 } : {}),
            caller: {
              ...(r.userName?.trim() ? { username: r.userName.trim() } : {}),
              ...(r.profileImage ? { avatarUrl: r.profileImage } : {}),
              ...(n ? { walletAddress: n } : {}),
            },
          }
        );
      });
  }
  async function o(e) {
    let { calloutId: t, liked: l } = e;
    await (0, r.j)()(
      l ? "POST /callout/{calloutId}/like" : "DELETE /callout/{calloutId}/like",
      { params: { calloutId: t }, credentials: "include" },
    );
  }
  async function u(e) {
    let { messageId: t, liked: l } = e;
    await (0, r.j)()(
      l
        ? "POST /callout/replies/{replyId}/like"
        : "DELETE /callout/replies/{replyId}/like",
      { params: { replyId: t }, credentials: "include" },
    );
  }
  e.s([
    "D",
    0,
    a,
    "a",
    0,
    i,
    "L",
    0,
    s,
    "O",
    0,
    (e) =>
      "number" == typeof e.threadReplyCount
        ? e.threadReplyCount
        : "number" == typeof e.directReplyCount
          ? e.directReplyCount
          : null,
    "J",
    0,
    o,
    "K",
    0,
    u,
  ]);
};
