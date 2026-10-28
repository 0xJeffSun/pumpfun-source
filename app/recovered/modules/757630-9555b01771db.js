// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(621624),
    a = e.i(154703),
    i = e.i(233283);
  let l = (e) => {
    let i = e.callout,
      l = i?.thesis?.trim();
    return i?.calloutId && l
      ? {
          key: `cid:${i.calloutId}`,
          calloutId: i.calloutId,
          coinMint: e.coinMint,
          userId: e.walletAddress ?? e.userId,
          authorCcUserId: e.userId,
          multiple: i.multiple ?? 0,
          marketCapUsd: null != i.calledOutAtMcap ? i.calledOutAtMcap : void 0,
          createdAt: ((e) => {
            if (!e) return 0;
            let t = Date.parse(e);
            return Number.isFinite(t) ? t : 0;
          })(i.calloutTimestamp),
          username: e.userName || void 0,
          xUsername: e.xUsername ?? void 0,
          profileImage: e.profileImage ?? void 0,
          resolvedAvatarDecoration: e.resolvedAvatarDecoration ?? void 0,
          note: l,
          ...(null == e.chain ? {} : { chain: e.chain }),
          ...(null == e.perp ? {} : { perp: e.perp }),
          ...(i.mediaUrl ? { mediaUrl: i.mediaUrl } : {}),
          ...(0, t.P)(i),
          updates: (0, a.v)({
            updates: i.updates,
            mint: e.coinMint,
            calloutId: i.calloutId,
          }),
          updateCount: (0, a.s)({
            updates: i.updates,
            updateCount: i.updateCount,
          }),
        }
      : null;
  };
  async function r(e) {
    let { mint: t, signal: a } = e,
      { positions: r } = await (0, i._)({
        mint: t,
        sortBy: "TOP",
        withThesis: !0,
        pageSize: 50,
        signal: a,
      });
    return r
      .map((e) => ({
        entry: l(e),
        peak: e.callout?.maxMultiplier ?? e.callout?.multiple ?? 0,
      }))
      .filter((e) => null !== e.entry)
      .sort((e, t) => t.peak - e.peak)
      .map((e) => e.entry);
  }
  (e.s(["J", 0, r, "j", 0, l], 757630),
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
