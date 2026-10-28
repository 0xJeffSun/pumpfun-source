// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(621624),
    i = e.i(917341),
    a = e.i(559015),
    l = e.i(639374);
  let r = (e) =>
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
        valueUsd: i,
        pnlUsd: a,
        pnlPercentage: l,
        costBasisUsd: r,
        amountBoughtUsd: n,
        receiptBasisUsd: o,
        realizedPnlUsd: s,
        isExited: d,
      } = e;
      if (null != t || null != a || null != i)
        return {
          amountHeld: t,
          valueUsd: i,
          pnlUsd: a,
          pnlPercentage: l,
          costBasisUsd: r,
          amountBoughtUsd: n,
          receiptBasisUsd: o,
          realizedPnlUsd: s,
          isExited: d,
        };
    },
    d = (e) => void 0 === e.parentMessageId || null === e.parentMessageId,
    c = (e) => {
      let { updates: t, mint: i, calloutId: a } = e;
      return t?.length
        ? t
            .filter(d)
            .map((e) => ({
              id: e.id,
              content: e.content,
              createdAt: o(e.createdAt),
              mint: i,
              calloutId: a,
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
      let { updates: t, updateCount: i } = e,
        a = t ?? [],
        l = a.filter(d).length,
        r = a.length - l;
      return Math.max((i ?? a.length) - r, l);
    };
  e.s(
    [
      "v",
      0,
      c,
      "y",
      0,
      (e) => {
        let d = e.position,
          m = d?.callout;
        if (!d || !m || null === m.calloutId) return null;
        let f = m.thesis?.trim() || void 0,
          p = ((e) => {
            let t;
            if ("quote" !== e.contentKind) return;
            let i = e.quote;
            if (!i || i.reply.tombstone) return;
            let { parent: a, callout: l } = i;
            return (
              (t = a
                ? a.tombstone
                  ? { deleted: !0 }
                  : {
                      authorName: a.userName?.trim() || void 0,
                      authorAddress: a.walletAddress ?? void 0,
                      text: a.content.trim() || void 0,
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
                replyId: i.reply.id,
                content: i.reply.content,
                createdAt: o(i.reply.createdAt),
                quotedContentId: a?.id ?? l?.callout.calloutId ?? null,
                calloutId: l?.callout.calloutId ?? null,
                quoted: t,
              }
            );
          })(d),
          h = s(d),
          b = (0, a.i)(e.followedHolders, d.userId),
          y = (0, n.T)(e.chain_id);
        return {
          key: `cid:${m.calloutId}`,
          calloutId: m.calloutId,
          coinMint: e.coinMint,
          userId: d.walletAddress ?? d.userId,
          authorCcUserId: d.userId,
          multiple: m.multiple ?? 0,
          marketCapUsd: null != m.calledOutAtMcap ? m.calledOutAtMcap : void 0,
          createdAt: o(m.calloutTimestamp),
          coinName: e.coinName ?? void 0,
          coinSymbol: e.symbol ?? void 0,
          coinImage: e.coinImage ?? void 0,
          ...(y ? { coinChain: y } : e.chain ? { coinChain: e.chain } : {}),
          ...(m.chain ? { chain: m.chain } : {}),
          ...(m.perp ? { perp: m.perp } : {}),
          ...(0, i.E)(m),
          ...(null != e.marketCap ? { coinMarketCapUsd: e.marketCap } : {}),
          username: d.userName || void 0,
          xUsername: d.xUsername ?? void 0,
          profileImage: d.profileImage ?? void 0,
          resolvedAvatarDecoration: d.resolvedAvatarDecoration ?? void 0,
          note: f,
          ...(m.mediaUrl ? { mediaUrl: m.mediaUrl } : {}),
          ...(0, t.P)(m),
          updates: c({
            updates: m.updates,
            mint: e.coinMint,
            calloutId: m.calloutId,
          }),
          updateCount: u({ updates: m.updates, updateCount: m.updateCount }),
          ...(h ? { positionPnl: h } : {}),
          ...(b?.holders.length ? { followedHolders: b } : {}),
          ...(p ? { quote: p } : {}),
          ...(e.recommendationId
            ? { recommendationId: e.recommendationId }
            : {}),
          ...(null != e.recommendationRank
            ? { recommendationRank: e.recommendationRank }
            : {}),
          positionId: (({ chainSlug: e, holderWallet: t, mint: i }) => {
            let a;
            if (t && i)
              return (
                (a = e ? e.toLowerCase() : (0, l.f)(i) ? "solana" : "unknown"),
                `${a}:${r(t)}:${r(i)}`
              );
          })({
            chainSlug: e.chain,
            holderWallet: d.walletAddress ?? d.userId,
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
