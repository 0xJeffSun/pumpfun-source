// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["K", 0, 3, "L", 0, 150, "M", 0, 50], 912585);
  var r,
    t,
    s,
    n,
    o = e.i(445242),
    a = e.i(606933),
    i = e.i(352386),
    d = e.i(78436);
  e.s(["d", 0, 420, "s", 0, 3, "n", 0, 4], 751973);
  var l = (((r = {}).Add = "add"), (r.Remove = "remove"), r),
    u = e.i(426091);
  let c = (e, r) => `${e}|${r}`,
    m = (e, r) => {
      let t = r.toLowerCase();
      for (let [r, s] of e) if (r.toLowerCase() === t) return s;
    };
  e.s(
    [
      "s",
      0,
      (e) => {
        let r = new Map();
        for (let t of e)
          t.userAddress &&
            t.profile_image &&
            r.set(t.userAddress, t.profile_image);
        return r;
      },
      "U",
      0,
      (e, r, t) => {
        let s = [];
        for (let n of e) {
          if (s.length >= t) break;
          let e = m(r, n) ?? u.A;
          s.push({ address: n, avatarUrl: e });
        }
        return s;
      },
      "i",
      0,
      c,
      "e",
      0,
      (e, r) => {
        let t = r.toLowerCase();
        return e.some((e) => e.toLowerCase() === t);
      },
      "S",
      0,
      (e) => {
        let { recentMap: r, serverRecent: t, emojiKey: s } = e,
          n = r?.[s];
        return void 0 !== n ? n : (t?.[s] ?? []);
      },
    ],
    600963,
  );
  let g = ({ state: e, args: r, action: t, currentUserAddress: s }) => {
      let {
          messageId: n,
          emojiKey: o,
          userAddress: a,
          serverRecent: i,
          serverRecentAvatarUrls: d,
          avatarUrl: l,
        } = r,
        u = e.byMessageId[n] ?? {
          counts: {},
          ...v({ serverRecent: i, serverRecentAvatarUrls: d }),
        },
        m = c(n, o),
        g = f(u.counts, o, t),
        b = y({
          recentAddresses: u.recentAddresses,
          recentAvatarUrls: u.recentAvatarUrls,
          emojiKey: o,
          userAddress: a,
          avatarUrl: l,
          action: t,
        }),
        E = R(s, a),
        S = e.myReactions,
        w = e.mySelectedByMessage;
      if (E) {
        let r = M({ state: e, key: m, messageId: n, emojiKey: o, action: t });
        ((S = r.myReactions), (w = r.mySelectedByMessage));
      }
      let C =
          0 === Object.keys(g).length &&
          Object.values(b.recentAddresses).every((e) => 0 === e.length),
        L = h(g, b.recentAddresses)
          ? I(e.byMessageId, n)
          : p(e.byMessageId, n, g, b.recentAddresses, b.recentAvatarUrls);
      if (C) {
        if (w[n]) {
          let { [n]: e, ...r } = w;
          w = r;
        }
        S = A(S, n);
      }
      return { byMessageId: L, myReactions: S, mySelectedByMessage: w };
    },
    f = (e, r, t) => {
      let s = e[r] ?? 0,
        n = t === l.Add ? s + 1 : Math.max(0, s - 1),
        o = { ...e };
      return (n > 0 ? (o[r] = n) : delete o[r], o);
    },
    v = ({ serverRecent: e, serverRecentAvatarUrls: r }) => {
      if (!e) return { recentAddresses: {}, recentAvatarUrls: {} };
      let t = e
          ? Object.entries(e).reduce((e, [r, t]) => {
              if (!t || 0 === t.length) return e;
              let s = t.slice(-4);
              return (s.length > 0 && (e[r] = s), e);
            }, {})
          : {},
        s = (({ sanitizedAddresses: e, serverRecentAvatarUrls: r }) =>
          r
            ? Object.entries(e).reduce((e, [t, s]) => {
                if (!s || 0 === s.length) return e;
                let n = r[t] ?? [];
                if (!n || 0 === n.length) return e;
                let o = Math.max(n.length - s.length, 0),
                  a = s.reduce((e, r, t) => {
                    let s = n[o + t];
                    return (r && s && (e[r] = s), e);
                  }, {});
                return (Object.keys(a).length > 0 && (e[t] = a), e);
              }, {})
            : {})({ sanitizedAddresses: t, serverRecentAvatarUrls: r });
      return { recentAddresses: t, recentAvatarUrls: s };
    },
    y = ({
      recentAddresses: e,
      recentAvatarUrls: r,
      emojiKey: t,
      userAddress: s,
      avatarUrl: n,
      action: o,
    }) => {
      let a = s.toLowerCase(),
        i = (e[t] ?? []).filter((e) => e.toLowerCase() !== a),
        d = o === l.Add ? [...i, s].slice(-4) : i.slice(-4),
        u = { ...e };
      u[t] = d;
      let c = new Set(d.map((e) => e.toLowerCase())),
        m = r[t] ?? {},
        g = Object.entries(m).find(([e]) => e.toLowerCase() === a)?.[1],
        f = {};
      for (let [e, r] of Object.entries(m))
        c.has(e.toLowerCase()) && e.toLowerCase() !== a && (f[e] = r);
      if (o === l.Add) {
        let e = n ?? g;
        e && (f[s] = e);
      }
      if (d.length > 0) {
        let e = new Set(d);
        Object.keys(f).forEach((r) => {
          e.has(r) || delete f[r];
        });
      }
      let v = { ...r };
      return (
        Object.keys(f).length > 0 ? (v[t] = f) : delete v[t],
        { recentAddresses: u, recentAvatarUrls: v }
      );
    },
    h = (e, r) => 0 === Object.keys(e).length && 0 === Object.keys(r).length,
    p = (e, r, t, s, n) => ({
      ...e,
      [r]: { counts: t, recentAddresses: s, recentAvatarUrls: n },
    }),
    I = (e, r) => {
      if (!(r in e)) return e;
      let { [r]: t, ...s } = e;
      return s;
    },
    R = (e, r) => !!(e && r && e.toLowerCase() === r.toLowerCase()),
    M = ({ state: e, key: r, messageId: t, emojiKey: s, action: n }) => {
      var o;
      let a,
        i,
        d =
          ((o = e.myReactions),
          (i = new Set(o)),
          n === l.Add ? i.add(r) : i.delete(r),
          i),
        u = new Set(e.mySelectedByMessage[t] ?? []);
      if ((n === l.Add ? u.add(s) : u.delete(s), 0 === u.size)) {
        let { [t]: r, ...s } = e.mySelectedByMessage;
        a = s;
      } else a = { ...e.mySelectedByMessage, [t]: u };
      return { myReactions: d, mySelectedByMessage: a };
    },
    A = (e, r) => {
      if (0 === e.size) return e;
      let t = new Set(),
        s = `${r}|`;
      return (
        e.forEach((e) => {
          e.startsWith(s) || t.add(e);
        }),
        t
      );
    },
    b = (0, d.$)()((e, r) => ({
      byMessageId: {},
      myReactions: new Set(),
      mySelectedByMessage: {},
      addReaction: (r, t) => {
        r.messageId &&
          r.emojiKey &&
          r.userAddress &&
          e((e) =>
            g({ state: e, args: r, action: l.Add, currentUserAddress: t }),
          );
      },
      removeReaction: (r, t) => {
        r.messageId &&
          r.emojiKey &&
          r.userAddress &&
          e((e) =>
            g({ state: e, args: r, action: l.Remove, currentUserAddress: t }),
          );
      },
      getCounts: (e) => r().byMessageId[e]?.counts ?? {},
      getRecentAddresses: (e, t) =>
        (r().byMessageId[e]?.recentAddresses?.[t] ?? []).slice(-3),
      isMyReaction: (e, t) => r().myReactions.has(c(e, t)),
      clearRoom: () =>
        e({ byMessageId: {}, myReactions: new Set(), mySelectedByMessage: {} }),
    }));
  e.s(["f", 0, b], 550118);
  var E = e.i(54567),
    S = e.i(761459),
    w = e.i(975982),
    C = e.i(365089);
  let L = ({ username: e, userAddress: r }) => {
      let t = e?.trim();
      if (!t || "Unknown User" === t) return !1;
      let s = r?.trim();
      return s ? t.toLowerCase() !== s.toLowerCase() : !(0, w.k)(t);
    },
    U = ({ userAddress: e, username: r }) => !!r?.trim() || !!e?.trim();
  e.s(
    [
      "Z",
      0,
      U,
      "s",
      0,
      L,
      "b",
      0,
      ({
        payloadAvatarUrl: e,
        payloadUsername: r,
        profile: t,
        userAddress: s,
      }) => {
        let n = s?.trim() ?? "",
          o = t?.username?.trim(),
          a = L({ username: r, userAddress: n }) ? r?.trim() : void 0,
          i = o || a,
          d = t?.profile_image?.trim() || e?.trim() || void 0;
        return i
          ? {
              avatarUrl: d,
              displayName: i,
              isAddressFallback: !1,
              profileSlug: i,
            }
          : {
              avatarUrl: d,
              displayName: (0, C.d)(n, 6, 4),
              isAddressFallback: !0,
              profileSlug: n,
            };
      },
    ],
    188624,
  );
  var T =
      (((t = {}).REGULAR = "regular"),
      (t.SYSTEM = "system"),
      (t.NOTIFICATION = "notification"),
      t),
    _ =
      (((s = {}).INSUFFICIENT_PORTFOLIO_BALANCE =
        "INSUFFICIENT_PORTFOLIO_BALANCE"),
      (s.USER_BANNED = "USER_BANNED"),
      s),
    k =
      (((n = {}).TOXIC = "TOXIC"),
      (n.SPAM = "SPAM"),
      (n.USER_BANNED = "USER_BANNED"),
      n);
  e.s(["c", () => k, "d", () => T, "A", () => _], 18671);
  var B = e.i(508695),
    P = e.i(396693);
  let x = ({
      rawMsg: e,
      currentUserId: r,
      currentUserUsername: t,
      currentUserAddress: s,
    }) => {
      let n =
          "string" == typeof e.username && "" !== e.username.trim()
            ? e.username.trim()
            : "Unknown User",
        o = (function (e) {
          let {
              rawMsg: r,
              currentUserId: t,
              currentUserUsername: s,
              currentUserAddress: n,
            } = e,
            o = !!(r.userId || r.userAddress),
            a = !!(t || n);
          return o && a
            ? (0, B.E)(
                { userId: r.userId, address: r.userAddress },
                { userId: t, address: n },
              )
            : !!s && r.username === s;
        })({
          rawMsg: e,
          currentUserId: r,
          currentUserUsername: t,
          currentUserAddress: s,
        }),
        a =
          e.timestamp && !isNaN(new Date(e.timestamp).getTime())
            ? new Date(e.timestamp)
            : new Date(),
        i = "",
        d = e.message;
      "string" == typeof d
        ? (i = d)
        : Array.isArray(d)
          ? (E.logger.warn(
              "[mapRawMessageToChatMessage] Message received as array",
              {
                messageId: e.id,
                roomId: e.roomId,
                username: e.username,
                messageArray: d,
              },
            ),
            d.length > 0 && (i = String(d[0] || "")))
          : null != d &&
            (E.logger.warn(
              "[mapRawMessageToChatMessage] Message received as unexpected type",
              {
                messageId: e.id,
                roomId: e.roomId,
                username: e.username,
                messageType: typeof d,
                messageValue: d,
              },
            ),
            (i = String(d)));
      let l = {
        id: e.id || `fallback-${a.getTime()}-${Math.random()}`,
        roomId: e.roomId,
        username: n,
        message: i,
        userAddress: e.userAddress || "",
        ...(e.userId ? { userId: e.userId } : {}),
        profile_image: e.profile_image || P.f,
        timestamp: a,
        messageType: T.REGULAR,
        isOwnMessage: o,
        isPending: !1,
        replyToId: e.replyToId,
        replyPreview: ((e) => {
          if ("string" == typeof e) return e;
          if (null != e) {
            if ("object" == typeof e && !Array.isArray(e)) {
              let r = e.message;
              if ("string" == typeof r) return r;
            }
            E.logger.warn(
              "[normalizeReplyPreview] Dropping non-string reply preview",
              { previewType: typeof e },
            );
          }
        })(e.replyPreview),
        isModerator: e.isModerator,
        isCreator: e.isCreator,
      };
      (e &&
        e.reactionRecentAddresses &&
        ((l.reactionRecentAddresses = e.reactionRecentAddresses),
        E.logger.debug(
          "[mapRawMessageToChatMessage] Preserved reactionRecentAddresses",
          {
            messageId: l.id,
            emojis: Object.keys(e.reactionRecentAddresses || {}),
          },
        )),
        e &&
          e.reactionRecentAvatarUrls &&
          ((l.reactionRecentAvatarUrls = e.reactionRecentAvatarUrls),
          E.logger.debug(
            "[mapRawMessageToChatMessage] Preserved reactionRecentAvatarUrls",
            {
              messageId: l.id,
              emojis: Object.keys(e.reactionRecentAvatarUrls || {}),
            },
          )));
      try {
        let e = b.getState().byMessageId[l.id ?? ""];
        if (e && e.recentAddresses) {
          let r = l.reactionRecentAddresses || {},
            t = { ...r };
          for (let [s, n] of Object.entries(e.recentAddresses)) {
            let e = r[s];
            (Array.isArray(e) && e.length > 0) || (t[s] = n);
          }
          l.reactionRecentAddresses = t;
        }
      } catch {}
      return l;
    },
    F = (e) =>
      [...e].sort((e, r) => e.timestamp.getTime() - r.timestamp.getTime()),
    j = (e) => (e && 0 !== e.length ? e[0].timestamp.getTime() : null);
  e.s(
    [
      "q",
      0,
      j,
      "U",
      0,
      (e) => {
        let r = 0;
        for (let t = 0; t < e.length; t++) r = e.charCodeAt(t) + ((r << 5) - r);
        let t = (0x7fffffff & r) % 360;
        return `hsl(${t}, 70%, 60%)`;
      },
      "D",
      0,
      (e) =>
        "object" == typeof e &&
        null !== e &&
        "userAddress" in e &&
        "profile_image" in e,
      "s",
      0,
      x,
      "E",
      0,
      F,
    ],
    480530,
  );
  var D = e.i(66866);
  let O = async (e, r, t, s, n, o) => (
      E.logger.debug("[useMessagesQuery] Fetching message history", {
        roomId: r,
        beforeTimestamp: o,
      }),
      new Promise((a) => {
        e(r, o, 50, (e) => {
          if (!e)
            return (
              E.logger.warn(
                "[useMessagesQuery] No response received for getMessageHistory",
                { roomId: r, beforeTimestamp: o },
              ),
              a({ messages: [], nextCursor: null })
            );
          let i = Array.isArray(e) ? e : e?.messages;
          if (i && i.length > 0) {
            let e = F(
                i
                  .filter((e) =>
                    U({ userAddress: e.userAddress, username: e.username }),
                  )
                  .map((e) =>
                    x({
                      rawMsg: e,
                      currentUserId: t,
                      currentUserUsername: s,
                      currentUserAddress: n,
                    }),
                  ),
              ),
              o = j(e),
              d = i.length >= 50;
            (E.logger.debug("[useMessagesQuery] History fetch successful", {
              roomId: r,
              count: e.length,
              hasMore: d,
              oldestTs: o,
            }),
              a({ messages: e.filter(Boolean), nextCursor: d ? o : null }));
          } else
            (E.logger.debug(
              "[useMessagesQuery] History fetch returned no messages",
              { roomId: r, beforeTimestamp: o },
            ),
              a({ messages: [], nextCursor: null }));
        });
      })
    ),
    Q = (e) => ["livechat", e, "messages"];
  function N() {}
  function K(e) {
    return e.addReaction;
  }
  function G(e) {
    return e.removeReaction;
  }
  function $(e) {
    return e.messages;
  }
  (e.s(
    [
      "l",
      0,
      Q,
      "Q",
      0,
      (e) => {
        let r,
          t,
          s,
          n,
          a,
          i = (0, o.c)(17),
          { socket: d, roomId: l, currentUser: u, isEnabled: c } = e;
        i[0] !== d ? ((r = { socket: d }), (i[0] = d), (i[1] = r)) : (r = i[1]);
        let { emitGetMessageHistory: m } = (0, D.f)(r);
        (i[2] !== l ? ((t = Q(l)), (i[2] = l), (i[3] = t)) : (t = i[3]),
          i[4] !== u?.address ||
          i[5] !== u?.userId ||
          i[6] !== u?.username ||
          i[7] !== m ||
          i[8] !== l
            ? ((s = (e) => {
                let { pageParam: r } = e;
                return l
                  ? O(
                      m,
                      l,
                      u?.userId ?? void 0,
                      u?.username ?? void 0,
                      u?.address ?? void 0,
                      r,
                    )
                  : (E.logger.warn(
                      "[useMessagesQuery] Query function skipped, no roomId",
                    ),
                    Promise.resolve({ messages: [], nextCursor: null }));
              }),
              (i[4] = u?.address),
              (i[5] = u?.userId),
              (i[6] = u?.username),
              (i[7] = m),
              (i[8] = l),
              (i[9] = s))
            : (s = i[9]),
          i[10] !== l
            ? ((n = (e, r) =>
                r.length >= 3
                  ? void E.logger.debug(
                      "[useMessagesQuery] Max history pages reached",
                      { roomId: l, pageCount: r.length, maxPages: 3 },
                    )
                  : e.nextCursor),
              (i[10] = l),
              (i[11] = n))
            : (n = i[11]));
        let g = c && !!l && !!d;
        return (
          i[12] !== t || i[13] !== s || i[14] !== n || i[15] !== g
            ? ((a = {
                queryKey: t,
                queryFn: s,
                initialPageParam: null,
                getNextPageParam: n,
                getPreviousPageParam: N,
                enabled: g,
                staleTime: 1 / 0,
                refetchOnWindowFocus: !1,
                refetchOnMount: !1,
                maxPages: 3,
              }),
              (i[12] = t),
              (i[13] = s),
              (i[14] = n),
              (i[15] = g),
              (i[16] = a))
            : (a = i[16]),
          (0, S.useInfiniteQuery)(a)
        );
      },
    ],
    942219,
  ),
    e.s(
      [
        "f",
        0,
        (e) => {
          let r,
            t,
            s = (0, o.c)(8),
            { socket: n, currentRoomId: d, currentUserAddress: u } = e,
            c = (0, a.useQueryClient)(),
            m = b(K),
            g = b(G);
          (s[0] !== m ||
          s[1] !== d ||
          s[2] !== u ||
          s[3] !== c ||
          s[4] !== g ||
          s[5] !== n
            ? ((r = () => {
                if (!n || !d) return;
                let e = (e) => {
                  let r, t;
                  E.logger.debug(
                    "[useLivechatReactionsSync] handleMessageReactionUpdated",
                    e,
                  );
                  let s = Q(d),
                    n = c.getQueryData(s),
                    o = n?.pages.flatMap($).find((r) => r.id === e.messageId);
                  d &&
                    ((r = o?.reactionRecentAddresses),
                    (t = o?.reactionRecentAvatarUrls));
                  let a = {
                    messageId: e.messageId,
                    emojiKey: e.emojiKey,
                    userAddress: e.userAddress,
                    serverRecent: r,
                    serverRecentAvatarUrls: t,
                    avatarUrl: e.avatarUrl,
                  };
                  e.action === l.Add ? m(a, u) : g(a, u);
                };
                return (
                  n.on("messageReactionUpdated", e),
                  () => {
                    n.off("messageReactionUpdated", e);
                  }
                );
              }),
              (t = [m, d, u, c, g, n]),
              (s[0] = m),
              (s[1] = d),
              (s[2] = u),
              (s[3] = c),
              (s[4] = g),
              (s[5] = n),
              (s[6] = r),
              (s[7] = t))
            : ((r = s[6]), (t = s[7])),
            (0, i.useEffect)(r, t));
        },
      ],
      42541,
    ),
    e.s(
      [
        "f",
        0,
        (e) => {
          let r,
            t,
            s = (0, o.c)(10),
            {
              socket: n,
              onNewMessage: a,
              onMessageDeleted: d,
              onUserMessagesWiped: l,
              onModeratorAssigned: u,
              onModeratorUnassigned: c,
              onMessagePinned: m,
              onMessageUnpinned: g,
            } = e;
          (s[0] !== d ||
          s[1] !== m ||
          s[2] !== g ||
          s[3] !== u ||
          s[4] !== c ||
          s[5] !== a ||
          s[6] !== l ||
          s[7] !== n
            ? ((r = () => {
                if (!n) return;
                let e = (e) => {
                    E.logger.debug(
                      "[useLivechatSocketEvents] Received newMessage event",
                      { id: e?.id, roomId: e?.roomId },
                    );
                    try {
                      a(e);
                    } catch (r) {
                      E.logger.error(
                        "[useLivechatSocketEvents] Error processing newMessage",
                        {
                          id: e?.id,
                          error: r instanceof Error ? r.message : String(r),
                        },
                      );
                    }
                    e &&
                      e.id &&
                      (E.logger.debug(
                        "[useLivechatSocketEvents] Emitting messageReceived ack",
                        { messageId: e.id },
                      ),
                      n.emit("messageReceived", { messageId: e.id }));
                  },
                  r = (e) => {
                    try {
                      d(e.messageId);
                    } catch (e) {
                      E.logger.error(
                        "[useLivechatSocketEvents] Error in messageDeleted",
                        { error: e instanceof Error ? e.message : String(e) },
                      );
                    }
                  },
                  t = (e) => {
                    try {
                      m(e);
                    } catch (e) {
                      E.logger.error(
                        "[useLivechatSocketEvents] Error in messagePinned",
                        { error: e instanceof Error ? e.message : String(e) },
                      );
                    }
                  },
                  s = () => {
                    try {
                      g();
                    } catch (e) {
                      E.logger.error(
                        "[useLivechatSocketEvents] Error in messageUnpinned",
                        { error: e instanceof Error ? e.message : String(e) },
                      );
                    }
                  },
                  o = (e) => {
                    try {
                      l(e);
                    } catch (e) {
                      E.logger.error(
                        "[useLivechatSocketEvents] Error in userMessagesWiped",
                        { error: e instanceof Error ? e.message : String(e) },
                      );
                    }
                  },
                  i = (e) => {
                    try {
                      u(e);
                    } catch (e) {
                      E.logger.error(
                        "[useLivechatSocketEvents] Error in roomModeratorAssigned",
                        { error: e instanceof Error ? e.message : String(e) },
                      );
                    }
                  },
                  f = (e) => {
                    try {
                      c(e);
                    } catch (e) {
                      E.logger.error(
                        "[useLivechatSocketEvents] Error in roomModeratorUnassigned",
                        { error: e instanceof Error ? e.message : String(e) },
                      );
                    }
                  };
                return (
                  n.on("newMessage", e),
                  n.on("messageDeleted", r),
                  n.on("messagePinned", t),
                  n.on("messageUnpinned", s),
                  n.on("userMessagesWiped", o),
                  n.on("roomModeratorAssigned", i),
                  n.on("roomModeratorUnassigned", f),
                  () => {
                    (n.off("newMessage", e),
                      n.off("messageDeleted", r),
                      n.off("messagePinned", t),
                      n.off("messageUnpinned", s),
                      n.off("userMessagesWiped", o),
                      n.off("roomModeratorAssigned", i),
                      n.off("roomModeratorUnassigned", f));
                  }
                );
              }),
              (t = [n, a, d, l, u, c, m, g]),
              (s[0] = d),
              (s[1] = m),
              (s[2] = g),
              (s[3] = u),
              (s[4] = c),
              (s[5] = a),
              (s[6] = l),
              (s[7] = n),
              (s[8] = r),
              (s[9] = t))
            : ((r = s[8]), (t = s[9])),
            (0, i.useEffect)(r, t));
        },
      ],
      909576,
    ));
  var q = e.i(928785);
  let W = (e, r, t) =>
      ((...e) =>
        e.find((e) => "string" == typeof e && e.trim().length > 0) ?? null)(
        e,
        r,
        t,
      ),
    H = (e) => {
      if ("string" != typeof e) return "";
      let r = e;
      return (r = (r = (r = (r = (r = r.replace(
        /\b((https?:\/\/)?[\w-]+(\.[\w-]+)+(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?)\b/gi,
        " ",
      )).replace(/[\p{Extended_Pictographic}\p{Emoji}]/gu, " ")).replace(
        /[^\p{L}\p{N}\s]/gu,
        " ",
      )).toLowerCase()).replace(/\s+/g, " ")).trim();
    };
  function X(e) {
    return e.messageType === T.REGULAR;
  }
  function J(e) {
    return H(e.message || "");
  }
  (e.s(["f", 0, H], 450098),
    e.s(
      [
        "f",
        0,
        (e) => {
          let r,
            t,
            s,
            n,
            a,
            d,
            l,
            u = (0, o.c)(21),
            {
              messages: c,
              currentUserId: m,
              currentUserAddress: g,
              currentUsername: f,
            } = e;
          u[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((r = []), (u[0] = r))
            : (r = u[0]);
          let v = (0, i.useRef)(r);
          if (u[1] !== c) {
            let e = c.filter(X).slice(-q.F);
            ((t = e.slice(-q.M).map(J)), (s = new Map()));
            for (let r = Math.max(0, e.length - q.F); r < e.length; r++) {
              let t = e[r],
                n = H(t.message || "");
              if (!n) continue;
              let o = t.timestamp.getTime();
              (s.has(n) || s.set(n, []), s.get(n).push(o));
            }
            ((u[1] = c), (u[2] = t), (u[3] = s));
          } else ((t = u[2]), (s = u[3]));
          u[4] !== t || u[5] !== s
            ? ((n = { lastNNormalized: t, perTextTimestamps: s }),
              (u[4] = t),
              (u[5] = s),
              (u[6] = n))
            : (n = u[6]);
          let { lastNNormalized: y, perTextTimestamps: h } = n;
          u[7] !== g ||
          u[8] !== m ||
          u[9] !== f ||
          u[10] !== y ||
          u[11] !== c ||
          u[12] !== h
            ? ((a = (e, r) => {
                let t = void 0 === r ? Date.now() : r;
                if (W(m, g, f)) {
                  let e = t - q.I,
                    r = v.current;
                  for (; r.length > 0 && r[0] < e; ) r.shift();
                  if (r.length >= q.G)
                    return { allow: !1, reason: "rate_limit" };
                }
                let s = H(e || "");
                if (s.length <= q.O) return { allow: !0 };
                let n = h.get(s) || [],
                  o = t - q.r,
                  a = 0;
                for (let e = n.length - 1; e >= 0 && !(n[e] < o); e--)
                  if (++a >= q.p)
                    return { allow: !1, reason: "too_many_identical_10s" };
                let i = 0;
                for (let e = 0; e < y.length; e++)
                  if ((y[e] === s && i++, i >= q.g))
                    return { allow: !1, reason: "too_many_identical_lastN" };
                let d = 0;
                for (let e = c.length - 1; e >= 0; e--) {
                  let r = c[e];
                  if (r.messageType !== T.REGULAR) continue;
                  let t = H(r.message || "");
                  if (t)
                    if (t === s) {
                      if (++d >= q.h)
                        return { allow: !1, reason: "too_many_consecutive" };
                    } else break;
                }
                return { allow: !0 };
              }),
              (u[7] = g),
              (u[8] = m),
              (u[9] = f),
              (u[10] = y),
              (u[11] = c),
              (u[12] = h),
              (u[13] = a))
            : (a = u[13]);
          let p = a;
          u[14] !== g || u[15] !== m || u[16] !== f
            ? ((d = (e) => {
                let r = void 0 === e ? Date.now() : e;
                if (!W(m, g, f)) return;
                let t = v.current,
                  s = r - q.I;
                for (; t.length > 0 && t[0] < s; ) t.shift();
                t.push(r);
              }),
              (u[14] = g),
              (u[15] = m),
              (u[16] = f),
              (u[17] = d))
            : (d = u[17]);
          let I = d;
          return (
            u[18] !== p || u[19] !== I
              ? ((l = { canSend: p, recordOwnSend: I }),
                (u[18] = p),
                (u[19] = I),
                (u[20] = l))
              : (l = u[20]),
            l
          );
        },
      ],
      163097,
    ));
  var z = e.i(292686),
    V = e.i(132838),
    Y = e.i(26101),
    Z = e.i(203350);
  let ee = (
      e,
      { chatId: r, chatType: t, messageId: s, mint: n, context: o },
    ) => {
      (0, Z.j)(
        (0, Y.bb)({
          chatId: r,
          chatType: t,
          messageId: s,
          actionType: e,
          mint: n,
        }),
        o,
      );
    },
    er = ({
      mintId: e,
      status: r,
      messageId: t,
      isReply: s,
      errorReason: n,
      context: o,
    }) => {
      let a = {
        interactionType: z.EG.CLICK,
        chatId: e,
        chatType: z.lj.LIVECHAT,
        contentType: z.A0.TEXT,
        status: r,
        messageId: t,
        mint: e,
        isReply: s,
        errorReason: n,
      };
      (0, Z.j)((0, Y.eM)(a), o);
    };
  e.s(
    [
      "w",
      0,
      ({ mintId: e, status: r, context: t }) => {
        let s = {
          interactionType: z.EG.VIEWED,
          chatId: e,
          chatType: z.lj.LIVECHAT,
          source: z.Wy.LIVESTREAM,
          mint: e,
          status: r,
        };
        (0, Z.j)((0, Y.pO)(s), t);
      },
      "B",
      0,
      ({ mintId: e, status: r, context: t }) => {
        let s = {
          interactionType: z.EG.CLICK,
          chatId: e,
          chatType: z.lj.LIVECHAT,
          mint: e,
          status: r,
        };
        (0, Z.j)((0, Y.br)(s), t);
      },
      "C",
      0,
      (e) => ee(z.Cl.PIN, e),
      "T",
      0,
      (e) => ee(z.Cl.UNPIN, e),
      "v",
      0,
      er,
    ],
    408289,
  );
  var et = e.i(967388),
    es = e.i(63289),
    en = e.i(279383),
    eo = e.i(232453),
    ea = e.i(622493);
  e.s(
    [
      "f",
      0,
      (e) => {
        let r,
          t,
          s,
          n,
          d,
          l,
          u = (0, o.c)(23),
          { socket: c, roomId: m, currentUser: g, addSystemMessage: f } = e,
          v = (0, a.useQueryClient)();
        u[0] !== c ? ((r = { socket: c }), (u[0] = c), (u[1] = r)) : (r = u[1]);
        let { emitSendMessage: y } = (0, D.f)(r);
        return (
          u[2] !== g || u[3] !== y || u[4] !== m || u[5] !== c
            ? ((t = (e) => {
                let { messageText: r, replyToId: t, replyPreview: s } = e,
                  n = Date.now();
                return new Promise((e, o) => {
                  let a = g?.address,
                    i = g?.userId;
                  if (!c || !m || !(0, B.T)(g))
                    return (
                      E.logger.error(
                        "[useSendMessageMutation] Mutation failed pre-check",
                        { hasSocket: !!c, roomId: m, hasCurrentUser: !!g },
                      ),
                      ea.f.increment("livechat.send.precheck_failed", 1),
                      o(Error("Chat not ready to send message."))
                    );
                  y({
                    roomId: m,
                    username: g?.username ?? void 0,
                    messageText: r,
                    replyToId: t,
                    replyPreview: s,
                    callback: (r) => {
                      if (r?.error) {
                        let e;
                        (E.logger.error(
                          "[useSendMessageMutation] Server returned error on send message ack",
                          {
                            error: r.error,
                            errorCode: r.error_code,
                            details: r.details,
                            roomId: m,
                            username: g?.username,
                            address: a,
                            userId: i,
                          },
                        ),
                          ea.f.increment("livechat.send.ack_error", 1, {
                            code: r.error_code ?? "unknown",
                          }),
                          o(
                            (((e = Error(
                              r.error ?? "Failed to send message",
                            )).name = "SendMessageError"),
                            (e.ack = r),
                            e),
                          ));
                      } else
                        (ea.f.timing("livechat.send.ack_ms", Date.now() - n, {
                          hasId: !!r?.id,
                        }),
                          e(r));
                    },
                  });
                });
              }),
              (u[2] = g),
              (u[3] = y),
              (u[4] = m),
              (u[5] = c),
              (u[6] = t))
            : (t = u[6]),
          u[7] !== g || u[8] !== v || u[9] !== m
            ? ((s = async (e) => {
                let { messageText: r, replyToId: t, replyPreview: s } = e;
                if (!m || !(0, B.T)(g)) return;
                let n = Q(m);
                (ea.f.increment("livechat.send.on_mutate"),
                  await v.cancelQueries({ queryKey: n }));
                let o = v.getQueryData(n),
                  a = `pending-${Date.now()}-${Math.random()}`;
                return (
                  ea.f.increment("livechat.send.optimistic_added"),
                  v.setQueryData(n, (e) => {
                    if (!e)
                      return {
                        pages: [{ messages: [], nextCursor: null }],
                        pageParams: [null],
                      };
                    let n = {
                        id: a,
                        roomId: m,
                        username: g?.username ?? "",
                        message: r,
                        userAddress: g?.address ?? "",
                        ...(g?.userId ? { userId: g.userId } : {}),
                        profile_image: g?.profile_image || P.f,
                        timestamp: new Date(),
                        messageType: T.REGULAR,
                        isOwnMessage: !0,
                        isPending: !0,
                        replyToId: t,
                        replyPreview: s,
                      },
                      o = e.pages.map((r, t) =>
                        t === e.pages.length - 1
                          ? { ...r, messages: [...r.messages, n] }
                          : r,
                      );
                    return { ...e, pages: o };
                  }),
                  { previousMessages: o, tempId: a }
                );
              }),
              (u[7] = g),
              (u[8] = v),
              (u[9] = m),
              (u[10] = s))
            : (s = u[10]),
          u[11] !== f || u[12] !== v || u[13] !== m
            ? ((n = (e, r, t) => {
                if (!m || !t?.tempId) return;
                er({
                  mintId: m,
                  status: z.tL.ERROR,
                  isReply: !!r.replyToId,
                  errorReason: z._P.UNKNOWN,
                  context: et.R.CHAT_INPUT,
                });
                let s = Q(m);
                (E.logger.error("[useSendMessageMutation] onError triggered", {
                  error: e.message,
                  isReply: !!r.replyToId,
                  messageLength: r.messageText?.length,
                  tempId: t.tempId,
                  queryKey: s,
                }),
                  ea.f.increment("livechat.send.on_error", 1),
                  t?.previousMessages
                    ? v.setQueryData(s, t.previousMessages)
                    : v.setQueryData(s, (e) => {
                        if (!e) return e;
                        let r = e.pages.map((e) => ({
                          ...e,
                          messages: e.messages.filter((e) => e.id !== t.tempId),
                        }));
                        return { ...e, pages: r };
                      }),
                  ((e, { onGenericError: r } = {}) =>
                    !!e?.error &&
                    (e.error_code === _.INSUFFICIENT_PORTFOLIO_BALANCE
                      ? (E.logger.info(
                          "[livechat] Send blocked: insufficient portfolio balance",
                          { details: e.details },
                        ),
                        es.c.custom(
                          (e) =>
                            (0, i.createElement)(en.f, {
                              onAddFunds: () => {
                                (window.dispatchEvent(new CustomEvent(eo.f)),
                                  es.c.dismiss(e));
                              },
                            }),
                          {
                            id: "livechat-insufficient-portfolio",
                            duration: 8e3,
                          },
                        ),
                        !0)
                      : (r?.(e.error), !1)))(
                    e instanceof Error && "ack" in e ? e.ack : void 0,
                  ) || f(`Failed to send message: ${e.message}`));
              }),
              (u[11] = f),
              (u[12] = v),
              (u[13] = m),
              (u[14] = n))
            : (n = u[14]),
          u[15] !== v || u[16] !== m
            ? ((d = (e, r, t) => {
                if (!m || !t?.tempId) return;
                er({
                  mintId: m,
                  status: z.tL.SUCCESS,
                  messageId: e?.id,
                  isReply: !!r.replyToId,
                  context: et.R.CHAT_INPUT,
                });
                let s = Q(m),
                  n = e?.id;
                (ea.f.increment("livechat.send.on_success", 1, { hadId: !!n }),
                  v.setQueryData(s, (e) => {
                    if (!e) return e;
                    let r = e.pages.map((e) => ({
                      ...e,
                      messages: e.messages.map((e) =>
                        e.id === t.tempId
                          ? { ...e, id: n || e.id, isPending: !1 }
                          : e,
                      ),
                    }));
                    return { ...e, pages: r };
                  }));
              }),
              (u[15] = v),
              (u[16] = m),
              (u[17] = d))
            : (d = u[17]),
          u[18] !== t || u[19] !== s || u[20] !== n || u[21] !== d
            ? ((l = { mutationFn: t, onMutate: s, onError: n, onSuccess: d }),
              (u[18] = t),
              (u[19] = s),
              (u[20] = n),
              (u[21] = d),
              (u[22] = l))
            : (l = u[22]),
          (0, V.f)(l)
        );
      },
    ],
    395622,
  );
};
