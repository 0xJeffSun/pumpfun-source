// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(132838),
    l = e.i(606933),
    a = e.i(138411),
    n = e.i(640068),
    i = e.i(464154),
    s = e.i(258182),
    o = e.i(761459),
    u = e.i(759257);
  let d = (e) => {
      if (!e) return 0;
      let t = Date.parse(e);
      return Number.isFinite(t) ? t : 0;
    },
    c = (e, t) => {
      let r = e.walletAddress?.trim() || void 0;
      return {
        replyId: e.id,
        calloutId: t,
        userId: r ?? e.userId ?? "",
        ...(e.userId ? { authorCcUserId: e.userId } : {}),
        authorAccountKind: e.accountKind,
        content: e.content,
        createdAt: d(e.createdAt),
        likeCount: e.likeCount ?? 0,
        likedByViewer: e.hasLiked ?? !1,
        mediaUrl: e.mediaUrl ?? null,
        caller: {
          ...(e.userName?.trim() ? { username: e.userName.trim() } : {}),
          ...(e.profileImage ? { avatarUrl: e.profileImage } : {}),
          ...(r ? { walletAddress: r } : {}),
        },
      };
    },
    m = (e) => {
      let t = e.walletAddress?.trim() || void 0,
        r = e.userName?.trim() || void 0,
        l = e.profileImage?.trim() || void 0,
        a = e.callout?.thesis?.trim() || void 0,
        n = e.callout?.mediaUrl || void 0,
        i = d(e.callout?.calloutTimestamp ?? null);
      return {
        calloutId: e.callout?.calloutId ?? null,
        createdAtMs: i > 0 ? i : null,
        coinMint: e.coinMint,
        author: {
          ...(r ? { username: r } : {}),
          ...(l ? { avatarUrl: l } : {}),
          ...(t ? { walletAddress: t } : {}),
        },
        ...(a ? { note: a } : {}),
        ...(n ? { mediaUrl: n } : {}),
      };
    },
    f = (e) => {
      let t = e.callout ? m(e.callout) : null,
        r = t?.calloutId ?? "",
        l = e.parent ?? null;
      return {
        reply: c(e.reply, r),
        parent: l
          ? {
              tombstone: !0 === l.tombstone,
              reply: !0 === l.tombstone ? null : c(l, r),
            }
          : null,
        callout: t,
        isNested: null != e.reply.rootMessageId,
      };
    };
  async function p(e) {
    let {
        userId: t,
        limit: r = 30,
        beforeId: l,
        includeMembers: a = !1,
        signal: n,
      } = e,
      i =
        (
          await (0, u.j)()("GET /callout/replies/list/{userId}", {
            params: { userId: t },
            query: {
              limit: r,
              beforeId: l || void 0,
              includeMembers: a || void 0,
            },
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            signal: n,
            hooks: {
              afterResponse: [
                (e, t, r) => {
                  if (404 === r.status) return Response.json({ replies: [] });
                  if (!r.ok)
                    throw Error(`Failed to fetch user replies: ${r.status}`);
                },
              ],
            },
          })
        ).replies ?? [],
      s = i.map(f),
      o = i.at(-1);
    return {
      rows: s,
      nextBeforeId: o ? o.reply.id : null,
      hasMore: i.length >= r,
    };
  }
  e.s(
    [
      "y",
      0,
      30,
      "v",
      0,
      p,
      "m",
      0,
      m,
      "j",
      0,
      f,
      "g",
      0,
      (e) => {
        let { parent: t, callout: r } = e;
        if (t) {
          if (t.tombstone || !t.reply) return { deleted: !0 };
          let { caller: e, userId: r, content: l } = t.reply,
            a = e?.username?.trim(),
            n = e?.walletAddress?.trim() || r;
          return {
            deleted: !1,
            ...(a ? { authorName: a } : {}),
            ...(n ? { authorAddress: n } : {}),
            ...(l ? { text: l } : {}),
          };
        }
        return r
          ? {
              deleted: !1,
              ...(r.author.username ? { authorName: r.author.username } : {}),
              ...(r.author.walletAddress
                ? { authorAddress: r.author.walletAddress }
                : {}),
              ...(r.note ? { text: r.note } : {}),
            }
          : { deleted: !0 };
      },
    ],
    287129,
  );
  let h = ["callouts", "user-replies"];
  function y(e) {
    return e.pages.flatMap(g);
  }
  function g(e) {
    return e.rows;
  }
  function x(e) {
    return e.hasMore && e.nextBeforeId ? e.nextBeforeId : void 0;
  }
  e.s(
    [
      "r",
      0,
      function (e) {
        let r,
          l,
          a,
          n,
          i,
          s = (0, t.c)(23),
          { userId: u, limit: d, includeMembers: c, enabled: m } = e,
          f = void 0 === d ? 30 : d,
          g = void 0 !== c && c,
          I = (void 0 === m || m) && !!u,
          v = u ?? null;
        s[0] !== g || s[1] !== f || s[2] !== v
          ? ((r = [...h, v, f, g]),
            (s[0] = g),
            (s[1] = f),
            (s[2] = v),
            (s[3] = r))
          : (r = s[3]);
        let w = r;
        (s[4] !== g || s[5] !== f || s[6] !== u
          ? ((l = async (e) => {
              let { pageParam: t, signal: r } = e;
              if (!u) throw Error("userId is required");
              return p({
                userId: u,
                limit: f,
                beforeId: t,
                includeMembers: g,
                signal: r,
              });
            }),
            (s[4] = g),
            (s[5] = f),
            (s[6] = u),
            (s[7] = l))
          : (l = s[7]),
          s[8] !== I || s[9] !== w || s[10] !== l
            ? ((a = {
                enabled: I,
                queryKey: w,
                queryFn: l,
                initialPageParam: void 0,
                getNextPageParam: x,
                staleTime: 6e4,
                gcTime: 3e5,
                refetchOnWindowFocus: !1,
                select: y,
              }),
              (s[8] = I),
              (s[9] = w),
              (s[10] = l),
              (s[11] = a))
            : (a = s[11]));
        let b = (0, o.useInfiniteQuery)(a);
        s[12] !== b.data
          ? ((n = b.data ?? []), (s[12] = b.data), (s[13] = n))
          : (n = s[13]);
        let A = n;
        return (
          s[14] !== b.fetchNextPage ||
          s[15] !== b.hasNextPage ||
          s[16] !== b.isError ||
          s[17] !== b.isFetchNextPageError ||
          s[18] !== b.isFetchingNextPage ||
          s[19] !== b.isLoading ||
          s[20] !== b.refetch ||
          s[21] !== A
            ? ((i = {
                rows: A,
                isLoading: b.isLoading,
                isError: b.isError,
                refetch: b.refetch,
                hasNextPage: b.hasNextPage,
                isFetchingNextPage: b.isFetchingNextPage,
                isFetchNextPageError: b.isFetchNextPageError,
                fetchNextPage: b.fetchNextPage,
              }),
              (s[14] = b.fetchNextPage),
              (s[15] = b.hasNextPage),
              (s[16] = b.isError),
              (s[17] = b.isFetchNextPageError),
              (s[18] = b.isFetchingNextPage),
              (s[19] = b.isLoading),
              (s[20] = b.refetch),
              (s[21] = A),
              (s[22] = i))
            : (i = s[22]),
          i
        );
      },
      "v",
      0,
      h,
    ],
    546803,
  );
  let I = (e) => (0, n.h)(e, "PARENT_REPLY_NOT_FOUND");
  async function v(e) {
    let t = () =>
      (0, n._)({
        calloutId: e.calloutId,
        content: e.content,
        image: e.image,
        replyToMessageId: e.parentReplyId,
      });
    try {
      return await t();
    } catch (r) {
      if (
        I(r) &&
        e.parentReplyId &&
        (0, s.N)(e.mint, e.calloutId, e.parentReplyId, 8e3)
      )
        return (
          await new Promise((e) => {
            setTimeout(e, 1200);
          }),
          t()
        );
      throw r;
    }
  }
  e.s(
    [
      "f",
      0,
      function () {
        let e,
          n = (0, t.c)(2),
          o = (0, l.useQueryClient)();
        return (
          n[0] !== o
            ? ((e = {
                mutationFn: v,
                onError: (e, t) => {
                  I(e) &&
                    o.invalidateQueries({
                      queryKey: (0, s.o)(t.mint, t.calloutId),
                    });
                },
                onSuccess: (e, t) => {
                  let r = e.createdAt ? Date.parse(e.createdAt) : 0 / 0,
                    l = t.parentReplyId ?? null,
                    n = {
                      replyId: e.replyId,
                      calloutId: t.calloutId,
                      userId: t.viewerAddress,
                      content: t.content,
                      createdAt: Number.isFinite(r) ? r : Date.now(),
                      likeCount: 0,
                      likedByViewer: !1,
                      mediaUrl: e.mediaUrl,
                      directReplyCount: 0,
                      threadReplyCount: l ? null : 0,
                      ...(t.viewerCaller ? { caller: t.viewerCaller } : {}),
                    };
                  ((0, s.t)(t.mint, t.calloutId, n, {
                    isAuthorReply: t.isAuthorReply,
                    parentReplyId: l,
                  }),
                    (0, s.a)(o, {
                      mint: t.mint,
                      calloutId: t.calloutId,
                      reply: n,
                      isAuthorReply: t.isAuthorReply,
                      parentReplyId: l,
                    }),
                    l &&
                      (0, s.k)(o, {
                        mint: t.mint,
                        calloutId: t.calloutId,
                        replyId: l,
                        delta: 1,
                      }),
                    o.invalidateQueries({
                      queryKey: (0, s.o)(t.mint, t.calloutId),
                    }),
                    o.invalidateQueries({
                      queryKey: (0, i.B)(t.mint, t.calloutId),
                    }),
                    t.cacheCalloutId &&
                      t.cacheCalloutId !== t.calloutId &&
                      o.invalidateQueries({
                        queryKey: (0, i.B)(t.mint, t.cacheCalloutId),
                      }),
                    t.isAuthorReply || o.invalidateQueries({ queryKey: h }),
                    (0, a.r)(t.mint));
                },
              }),
              (n[0] = o),
              (n[1] = e))
            : (e = n[1]),
          (0, r.f)(e)
        );
      },
    ],
    236315,
  );
};
