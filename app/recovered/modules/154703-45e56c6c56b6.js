// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(621624),
    r = e.i(917341),
    l = e.i(559015),
    o = e.i(639374);
  let i = (e) =>
    e.startsWith("0x") || e.startsWith("0X") ? e.toLowerCase() : e;
  var a = e.i(541710);
  let n = (e) => {
      if (!e) return 0;
      let t = Date.parse(e);
      return Number.isFinite(t) ? t : 0;
    },
    s = (e) => {
      let {
        amountHeld: t,
        valueUsd: r,
        pnlUsd: l,
        pnlPercentage: o,
        costBasisUsd: i,
        amountBoughtUsd: a,
        receiptBasisUsd: n,
        realizedPnlUsd: s,
        isExited: c,
      } = e;
      if (null != t || null != l || null != r)
        return {
          amountHeld: t,
          valueUsd: r,
          pnlUsd: l,
          pnlPercentage: o,
          costBasisUsd: i,
          amountBoughtUsd: a,
          receiptBasisUsd: n,
          realizedPnlUsd: s,
          isExited: c,
        };
    },
    c = (e) => void 0 === e.parentMessageId || null === e.parentMessageId,
    d = (e) => {
      let { updates: t, mint: r, calloutId: l } = e;
      return t?.length
        ? t
            .filter(c)
            .map((e) => ({
              id: e.id,
              content: e.content,
              createdAt: n(e.createdAt),
              mint: r,
              calloutId: l,
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
        l = t ?? [],
        o = l.filter(c).length,
        i = l.length - o;
      return Math.max((r ?? l.length) - i, o);
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
          b = ((e) => {
            let t;
            if ("quote" !== e.contentKind) return;
            let r = e.quote;
            if (!r || r.reply.tombstone) return;
            let { parent: l, callout: o } = r;
            return (
              (t = l
                ? l.tombstone
                  ? { deleted: !0 }
                  : {
                      authorName: l.userName?.trim() || void 0,
                      authorAddress: l.walletAddress ?? void 0,
                      text: l.content.trim() || void 0,
                      deleted: !1,
                    }
                : o
                  ? {
                      authorName: o.userName?.trim() || void 0,
                      authorAddress: o.walletAddress ?? void 0,
                      text: o.callout.thesis?.trim() || void 0,
                      deleted: !1,
                    }
                  : { deleted: !0 }),
              {
                replyId: r.reply.id,
                content: r.reply.content,
                createdAt: n(r.reply.createdAt),
                quotedContentId: l?.id ?? o?.callout.calloutId ?? null,
                calloutId: o?.callout.calloutId ?? null,
                quoted: t,
              }
            );
          })(c),
          h = s(c),
          y = (0, l.i)(e.followedHolders, c.userId),
          f = (0, a.T)(e.chain_id);
        return {
          key: `cid:${m.calloutId}`,
          calloutId: m.calloutId,
          coinMint: e.coinMint,
          userId: c.walletAddress ?? c.userId,
          authorCcUserId: c.userId,
          multiple: m.multiple ?? 0,
          marketCapUsd: null != m.calledOutAtMcap ? m.calledOutAtMcap : void 0,
          createdAt: n(m.calloutTimestamp),
          coinName: e.coinName ?? void 0,
          coinSymbol: e.symbol ?? void 0,
          coinImage: e.coinImage ?? void 0,
          ...(f ? { coinChain: f } : e.chain ? { coinChain: e.chain } : {}),
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
          ...(h ? { positionPnl: h } : {}),
          ...(y?.holders.length ? { followedHolders: y } : {}),
          ...(b ? { quote: b } : {}),
          ...(e.recommendationId
            ? { recommendationId: e.recommendationId }
            : {}),
          ...(null != e.recommendationRank
            ? { recommendationRank: e.recommendationRank }
            : {}),
          positionId: (({ chainSlug: e, holderWallet: t, mint: r }) => {
            let l;
            if (t && r)
              return (
                (l = e ? e.toLowerCase() : (0, o.f)(r) ? "solana" : "unknown"),
                `${l}:${i(t)}:${i(r)}`
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
      n,
    ],
    154703,
  );
};
