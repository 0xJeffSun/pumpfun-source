// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(621624),
    r = e.i(917341),
    i = e.i(559015),
    l = e.i(639374);
  let a = (e) =>
    e.startsWith("0x") || e.startsWith("0X") ? e.toLowerCase() : e;
  var n = e.i(541710);
  let o = (e) => {
      if (!e) return 0;
      let t = Date.parse(e);
      return Number.isFinite(t) ? t : 0;
    },
    s = (e) => {
      let {
        amountHeld: t,
        valueUsd: r,
        pnlUsd: i,
        pnlPercentage: l,
        costBasisUsd: a,
        amountBoughtUsd: n,
        receiptBasisUsd: o,
        realizedPnlUsd: s,
        isExited: c,
      } = e;
      if (null != t || null != i || null != r)
        return {
          amountHeld: t,
          valueUsd: r,
          pnlUsd: i,
          pnlPercentage: l,
          costBasisUsd: a,
          amountBoughtUsd: n,
          receiptBasisUsd: o,
          realizedPnlUsd: s,
          isExited: c,
        };
    },
    c = (e) => void 0 === e.parentMessageId || null === e.parentMessageId,
    d = (e) => {
      let { updates: t, mint: r, calloutId: i } = e;
      return t?.length
        ? t
            .filter(c)
            .map((e) => ({
              id: e.id,
              content: e.content,
              createdAt: o(e.createdAt),
              mint: r,
              calloutId: i,
              likeCount: e.likeCount ?? 0,
              likedByViewer: !1,
              mediaUrl: e.mediaUrl ?? null,
            }))
            .sort(
              (e, t) =>
                (e.createdAt || Number.MAX_SAFE_INTEGER) -
                (t.createdAt || Number.MAX_SAFE_INTEGER),
            )
        : [];
    },
    u = (e) => {
      let { updates: t, updateCount: r } = e,
        i = t ?? [],
        l = i.filter(c).length,
        a = i.length - l;
      return Math.max((r ?? i.length) - a, l);
    };
  e.s(
    [
      "v",
      0,
      d,
      "y",
      0,
      (e) => {
        let c = e.position,
          m = c?.callout;
        if (!c || !m || null === m.calloutId) return null;
        let p = m.thesis?.trim() || void 0,
          h = ((e) => {
            let t;
            if ("quote" !== e.contentKind) return;
            let r = e.quote;
            if (!r || r.reply.tombstone) return;
            let { parent: i, callout: l } = r;
            return (
              (t = i
                ? i.tombstone
                  ? { deleted: !0 }
                  : {
                      authorName: i.userName?.trim() || void 0,
                      authorAddress: i.walletAddress ?? void 0,
                      text: i.content.trim() || void 0,
                      deleted: !1,
                    }
                : l
                  ? {
                      authorName: l.userName?.trim() || void 0,
                      authorAddress: l.walletAddress ?? void 0,
                      text: l.callout.thesis?.trim() || void 0,
                      deleted: !1,
                    }
                  : { deleted: !0 }),
              {
                replyId: r.reply.id,
                content: r.reply.content,
                createdAt: o(r.reply.createdAt),
                quotedContentId: i?.id ?? l?.callout.calloutId ?? null,
                calloutId: l?.callout.calloutId ?? null,
                quoted: t,
              }
            );
          })(c),
          f = s(c),
          y = (0, i.i)(e.followedHolders, c.userId),
          b = (0, n.T)(e.chain_id);
        return {
          key: `cid:${m.calloutId}`,
          calloutId: m.calloutId,
          coinMint: e.coinMint,
          userId: c.walletAddress ?? c.userId,
          authorCcUserId: c.userId,
          multiple: m.multiple ?? 0,
          marketCapUsd: null != m.calledOutAtMcap ? m.calledOutAtMcap : void 0,
          createdAt: o(m.calloutTimestamp),
          coinName: e.coinName ?? void 0,
          coinSymbol: e.symbol ?? void 0,
          coinImage: e.coinImage ?? void 0,
          ...(b ? { coinChain: b } : e.chain ? { coinChain: e.chain } : {}),
          ...(m.chain ? { chain: m.chain } : {}),
          ...(m.perp ? { perp: m.perp } : {}),
          ...(0, r.E)(m),
          ...(null != e.marketCap ? { coinMarketCapUsd: e.marketCap } : {}),
          username: c.userName || void 0,
          xUsername: c.xUsername ?? void 0,
          profileImage: c.profileImage ?? void 0,
          resolvedAvatarDecoration: c.resolvedAvatarDecoration ?? void 0,
          note: p,
          ...(m.mediaUrl ? { mediaUrl: m.mediaUrl } : {}),
          ...(0, t.P)(m),
          updates: d({
            updates: m.updates,
            mint: e.coinMint,
            calloutId: m.calloutId,
          }),
          updateCount: u({ updates: m.updates, updateCount: m.updateCount }),
          ...(f ? { positionPnl: f } : {}),
          ...(y?.holders.length ? { followedHolders: y } : {}),
          ...(h ? { quote: h } : {}),
          ...(e.recommendationId
            ? { recommendationId: e.recommendationId }
            : {}),
          ...(null != e.recommendationRank
            ? { recommendationRank: e.recommendationRank }
            : {}),
          positionId: (({ chainSlug: e, holderWallet: t, mint: r }) => {
            let i;
            if (t && r)
              return (
                (i = e ? e.toLowerCase() : (0, l.f)(r) ? "solana" : "unknown"),
                `${i}:${a(t)}:${a(r)}`
              );
          })({
            chainSlug: e.chain,
            holderWallet: c.walletAddress ?? c.userId,
            mint: e.coinMint,
          }),
        };
      },
      "g",
      0,
      s,
      "s",
      0,
      u,
      "l",
      0,
      o,
    ],
    154703,
  );
};
