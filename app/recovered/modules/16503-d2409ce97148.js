// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(265129),
    n = e.i(917341),
    r = e.i(154703),
    i = e.i(662986),
    l = e.i(287129),
    a = e.i(646908);
  let o = (e) => ((0, a.C)(e) ? { chain: e } : {}),
    s = (e) => {
      if (!e) return 0;
      let t = Date.parse(e);
      return Number.isFinite(t) ? t : 0;
    },
    u = (e) =>
      e.walletAddress?.trim() ||
      e.author?.walletAddress?.trim() ||
      e.author?.userId ||
      void 0,
    c = (e, t) => {
      let n = e.coinMint || t?.coinMint;
      return n
        ? {
            mint: n,
            chainId: e.chainId,
            ...o(e.chain),
            name: e.coinName ?? t?.coinName ?? null,
            symbol: e.symbol ?? t?.symbol ?? null,
            image: e.coinImage ?? t?.coinImage ?? null,
          }
        : null;
    };
  e.s([
    "D",
    0,
    (e) => {
      let t = (0, i.l)(e);
      return "callout" === e.type
        ? {
            coinMint: e.entry.coinMint,
            chainId: e.chain ?? e.entry.chain ?? e.chainId ?? null,
            perp: t,
          }
        : {
            coinMint: e.coin?.mint ?? "",
            chainId: e.coin?.chain ?? e.coin?.chainId ?? null,
            perp: t,
          };
    },
    "o",
    0,
    (e) => {
      if ("callout" === e.kind) {
        let { callout: t } = e;
        if (!t || null === t.calloutId) return null;
        let i = u(e);
        if (!i) return null;
        let l = s(e.createdAt) || s(t.calloutTimestamp),
          a = s(t.calloutTimestamp) || l,
          c = e.position ? (0, r.g)(e.position) : void 0;
        return {
          type: "callout",
          key: `cid:${t.calloutId}`,
          chainId: e.chainId,
          ...o(e.chain),
          createdAtMs: l,
          entry: {
            key: `cid:${t.calloutId}`,
            calloutId: t.calloutId,
            coinMint: e.coinMint,
            userId: i,
            authorCcUserId: e.author?.userId ?? void 0,
            multiple: t.multiple ?? 0,
            marketCapUsd: t.calledOutAtMcap ?? void 0,
            createdAt: a,
            coinName: e.coinName ?? void 0,
            coinSymbol: e.symbol ?? void 0,
            coinImage: e.coinImage ?? void 0,
            username: e.author?.userName || void 0,
            xUsername: e.author?.xUsername ?? void 0,
            profileImage: e.author?.profileImage ?? void 0,
            resolvedAvatarDecoration:
              e.author?.resolvedAvatarDecoration ?? void 0,
            note: t.thesis?.trim() || void 0,
            ...(t.mediaUrl ? { mediaUrl: t.mediaUrl } : {}),
            ...(t.chain ? { chain: t.chain } : {}),
            ...(t.perp ? { perp: t.perp } : {}),
            ...(0, n.E)(t),
            updates: (0, r.v)({
              updates: t.updates,
              mint: e.coinMint,
              calloutId: t.calloutId,
            }),
            updateCount: (0, r.s)({
              updates: t.updates,
              updateCount: t.updateCount,
            }),
            ...(c ? { positionPnl: c } : {}),
          },
        };
      }
      if ("update" === e.kind) {
        let t = e.reply,
          n = t?.callout,
          i = n?.callout;
        if (!t || !n || !i || null === i.calloutId) return null;
        let l = u(e);
        if (!l) return null;
        let a = e.coinMint || n.coinMint;
        if (!a) return null;
        let c = {
            id: t.reply.id,
            content: t.reply.content,
            createdAt: t.reply.createdAt,
            likeCount: t.reply.likeCount ?? 0,
            mediaUrl: t.reply.mediaUrl ?? null,
            parentMessageId: null,
            repostCount: t.reply.repostCount,
          },
          d = [c, ...(i.updates ?? []).filter((e) => e.id !== c.id)].sort(
            (e, t) => s(t.createdAt) - s(e.createdAt),
          ),
          m = s(e.createdAt) || s(t.reply.createdAt) || s(i.calloutTimestamp),
          f = s(i.calloutTimestamp) || m;
        return {
          type: "callout",
          key: `upd:${t.reply.id}`,
          chainId: e.chainId,
          ...o(e.chain),
          createdAtMs: m,
          entry: {
            key: `upd:${t.reply.id}`,
            calloutId: i.calloutId,
            coinMint: a,
            userId: l,
            authorCcUserId: e.author?.userId ?? void 0,
            multiple: i.multiple ?? 0,
            marketCapUsd: i.calledOutAtMcap ?? void 0,
            createdAt: f,
            coinName: (e.coinName ?? n.coinName) || void 0,
            coinSymbol: (e.symbol ?? n.symbol) || void 0,
            coinImage: (e.coinImage ?? n.coinImage) || void 0,
            username: e.author?.userName || void 0,
            xUsername: e.author?.xUsername ?? void 0,
            profileImage: e.author?.profileImage ?? void 0,
            resolvedAvatarDecoration:
              e.author?.resolvedAvatarDecoration ?? void 0,
            note: i.thesis?.trim() || void 0,
            ...(i.mediaUrl ? { mediaUrl: i.mediaUrl } : {}),
            ...(i.chain ? { chain: i.chain } : {}),
            ...(i.perp ? { perp: i.perp } : {}),
            updates: (0, r.v)({ updates: d, mint: a, calloutId: i.calloutId }),
            updateCount: (0, r.s)({ updates: d, updateCount: i.updateCount }),
          },
        };
      }
      if ("trade" === e.kind || "collectible" === e.kind) {
        let { trade: n } = e;
        return n?.tx && e.coinMint
          ? {
              type: "trade",
              key: `trade:${n.tx}:${e.walletAddress ?? ""}:${e.coinMint}:${n.isBuy ? "buy" : "sell"}`,
              createdAtMs: s(e.createdAt) || s(n.timestamp),
              trade: n,
              author: {
                name: e.author?.userName || null,
                avatarUrl: e.author?.profileImage ?? null,
                avatarDecoration: e.author?.resolvedAvatarDecoration ?? void 0,
                address: u(e) ?? null,
                userId: e.author?.userId ?? null,
                xUsername: e.author?.xUsername ?? null,
              },
              coin: {
                mint: e.coinMint,
                chainId: e.chainId,
                ...o(e.chain),
                name: e.coinName,
                symbol: e.symbol,
                image: e.coinImage,
                marketCapUsd: e.marketCap ?? null,
              },
              card: (0, t.q)(e.coinMint, n.collectible),
            }
          : null;
      }
      if ("reply" === e.kind || "quote" === e.kind) {
        let t = e.reply;
        if (!t?.reply?.id) return null;
        let n = (0, l.j)({
          callout: t.callout,
          parent: t.parent ?? null,
          reply: t.reply,
        });
        return {
          type: e.kind,
          key: `${e.kind}:${t.reply.id}`,
          createdAtMs: s(e.createdAt) || s(t.reply.createdAt),
          row: n,
          coin: c(e, t.callout),
          xUsername: e.author?.xUsername ?? null,
        };
      }
      if ("repost" === e.kind) {
        let t = e.repost;
        return t?.id && t.callout?.callout
          ? {
              type: "repost",
              key: `repost:${t.id}`,
              createdAtMs: s(e.createdAt) || s(t.createdAt),
              reposter: {
                name: e.author?.userName || null,
                avatarUrl: e.author?.profileImage ?? null,
                address: e.author?.walletAddress?.trim() || null,
                xUsername: e.author?.xUsername ?? null,
              },
              callout: (0, l.m)(t.callout),
              coin: c(e, t.callout),
            }
          : null;
      }
      return null;
    },
  ]);
};
