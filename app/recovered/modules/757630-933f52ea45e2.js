// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(621624),
    r = e.i(154703),
    a = e.i(233283);
  let i = (e) => {
    let a = e.callout,
      i = a?.thesis?.trim();
    return a?.calloutId && i
      ? {
          key: `cid:${a.calloutId}`,
          calloutId: a.calloutId,
          coinMint: e.coinMint,
          userId: e.walletAddress ?? e.userId,
          authorCcUserId: e.userId,
          multiple: a.multiple ?? 0,
          marketCapUsd: null != a.calledOutAtMcap ? a.calledOutAtMcap : void 0,
          createdAt: ((e) => {
            if (!e) return 0;
            let t = Date.parse(e);
            return Number.isFinite(t) ? t : 0;
          })(a.calloutTimestamp),
          username: e.userName || void 0,
          xUsername: e.xUsername ?? void 0,
          profileImage: e.profileImage ?? void 0,
          resolvedAvatarDecoration: e.resolvedAvatarDecoration ?? void 0,
          note: i,
          ...(null == e.chain ? {} : { chain: e.chain }),
          ...(null == e.perp ? {} : { perp: e.perp }),
          ...(a.mediaUrl ? { mediaUrl: a.mediaUrl } : {}),
          ...(0, t.P)(a),
          updates: (0, r.v)({
            updates: a.updates,
            mint: e.coinMint,
            calloutId: a.calloutId,
          }),
          updateCount: (0, r.s)({
            updates: a.updates,
            updateCount: a.updateCount,
          }),
        }
      : null;
  };
  async function n(e) {
    let { mint: t, signal: r } = e,
      { positions: n } = await (0, a._)({
        mint: t,
        sortBy: "TOP",
        withThesis: !0,
        pageSize: 50,
        signal: r,
      });
    return n
      .map((e) => ({
        entry: i(e),
        peak: e.callout?.maxMultiplier ?? e.callout?.multiple ?? 0,
      }))
      .filter((e) => null !== e.entry)
      .sort((e, t) => t.peak - e.peak)
      .map((e) => e.entry);
  }
  (e.s(["J", 0, n, "j", 0, i], 757630),
    e.s(
      [
        "f",
        0,
        (e) => ({
          key: `cid:${e.calloutId}`,
          calloutId: e.calloutId,
          coinMint: e.coinMint,
          userId: e.userId,
          ...(e.authorCcUserId ? { authorCcUserId: e.authorCcUserId } : {}),
          multiple: e.multiple,
          marketCapUsd: Number.isFinite(e.marketCap) ? e.marketCap : void 0,
          createdAt: e.createdAt,
          note: e.note,
          ...(null != e.chain ? { chain: e.chain } : {}),
          ...(e.perp ? { perp: e.perp } : {}),
          ...(e.mediaUrl ? { mediaUrl: e.mediaUrl } : {}),
          ...(void 0 !== e.likeCount ? { likeCount: e.likeCount } : {}),
          ...(void 0 !== e.replyCount ? { replyCount: e.replyCount } : {}),
          ...(void 0 !== e.repostCount ? { repostCount: e.repostCount } : {}),
          ...(void 0 !== e.viewCount ? { viewCount: e.viewCount } : {}),
          ...(void 0 !== e.likedByViewer
            ? { likedByViewer: e.likedByViewer }
            : {}),
          ...(void 0 !== e.repostedByViewer
            ? { repostedByViewer: e.repostedByViewer }
            : {}),
        }),
      ],
      726692,
    ));
};
