// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(621624),
    r = e.i(917341),
    i = e.i(559015),
    l = e.i(639374);
  let n = (e) =>
    e.startsWith("0x") || e.startsWith("0X") ? e.toLowerCase() : e;
  var a = e.i(541710);
  let s = (e) => {
      if (!e) return 0;
      let t = Date.parse(e);
      return Number.isFinite(t) ? t : 0;
    },
    o = (e) => {
      let {
        amountHeld: t,
        valueUsd: r,
        pnlUsd: i,
        pnlPercentage: l,
        costBasisUsd: n,
        amountBoughtUsd: a,
        receiptBasisUsd: s,
        realizedPnlUsd: o,
        isExited: d,
      } = e;
      if (null != t || null != i || null != r)
        return {
          amountHeld: t,
          valueUsd: r,
          pnlUsd: i,
          pnlPercentage: l,
          costBasisUsd: n,
          amountBoughtUsd: a,
          receiptBasisUsd: s,
          realizedPnlUsd: o,
          isExited: d,
        };
    },
    d = (e) => void 0 === e.parentMessageId || null === e.parentMessageId,
    c = (e) => {
      let { updates: t, mint: r, calloutId: i } = e;
      return t?.length
        ? t
            .filter(d)
            .map((e) => ({
              id: e.id,
              content: e.content,
              createdAt: s(e.createdAt),
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
        l = i.filter(d).length,
        n = i.length - l;
      return Math.max((r ?? i.length) - n, l);
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
        let h = m.thesis?.trim() || void 0,
          f = ((e) => {
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
                createdAt: s(r.reply.createdAt),
                quotedContentId: i?.id ?? l?.callout.calloutId ?? null,
                calloutId: l?.callout.calloutId ?? null,
                quoted: t,
              }
            );
          })(d),
          x = o(d),
          p = (0, i.i)(e.followedHolders, d.userId),
          y = (0, a.T)(e.chain_id);
        return {
          key: `cid:${m.calloutId}`,
          calloutId: m.calloutId,
          coinMint: e.coinMint,
          userId: d.walletAddress ?? d.userId,
          authorCcUserId: d.userId,
          multiple: m.multiple ?? 0,
          marketCapUsd: null != m.calledOutAtMcap ? m.calledOutAtMcap : void 0,
          createdAt: s(m.calloutTimestamp),
          coinName: e.coinName ?? void 0,
          coinSymbol: e.symbol ?? void 0,
          coinImage: e.coinImage ?? void 0,
          ...(y ? { coinChain: y } : e.chain ? { coinChain: e.chain } : {}),
          ...(m.chain ? { chain: m.chain } : {}),
          ...(m.perp ? { perp: m.perp } : {}),
          ...(0, r.E)(m),
          ...(null != e.marketCap ? { coinMarketCapUsd: e.marketCap } : {}),
          username: d.userName || void 0,
          xUsername: d.xUsername ?? void 0,
          profileImage: d.profileImage ?? void 0,
          resolvedAvatarDecoration: d.resolvedAvatarDecoration ?? void 0,
          note: h,
          ...(m.mediaUrl ? { mediaUrl: m.mediaUrl } : {}),
          ...(0, t.P)(m),
          updates: c({
            updates: m.updates,
            mint: e.coinMint,
            calloutId: m.calloutId,
          }),
          updateCount: u({ updates: m.updates, updateCount: m.updateCount }),
          ...(x ? { positionPnl: x } : {}),
          ...(p?.holders.length ? { followedHolders: p } : {}),
          ...(f ? { quote: f } : {}),
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
                `${i}:${n(t)}:${n(r)}`
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
      o,
      "s",
      0,
      u,
      "l",
      0,
      s,
    ],
    154703,
  );
};
