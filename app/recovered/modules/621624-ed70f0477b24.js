// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "P",
    0,
    (e) => ({
      ...(null != e.likes ? { likeCount: e.likes } : {}),
      ...(null != e.replyCount ? { replyCount: e.replyCount } : {}),
      ...(null != e.repostCount ? { repostCount: e.repostCount } : {}),
      ...(null != e.viewCount ? { viewCount: e.viewCount } : {}),
      ...("boolean" == typeof e.hasLiked ? { likedByViewer: e.hasLiked } : {}),
      ...("boolean" == typeof e.hasReposted
        ? { repostedByViewer: e.hasReposted }
        : {}),
    }),
    "i",
    0,
    (e, t) => {
      if (null == e.count) return t?.count ?? null;
      if ("boolean" != typeof t?.byViewer) return e.count;
      let i = Number(t.byViewer) - Number(e.byViewer ?? !1);
      return Math.max(e.count + i, 0);
    },
  ]);
};
