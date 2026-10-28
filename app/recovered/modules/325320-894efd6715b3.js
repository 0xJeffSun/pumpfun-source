// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.s(["t", () => ee, "E", () => er], 325320),
    e.s(["Q", () => K, "u", () => G], 855645));
  var r = e.i(732486),
    t = e.i(445242),
    s = e.i(439587),
    n = e.i(606933),
    o = e.i(352386),
    a = e.i(392230),
    i = e.i(113427),
    d = e.i(921753),
    l = e.i(275762),
    u = e.i(726266),
    c = e.i(154793),
    m = e.i(928785),
    g = e.i(264552),
    f = e.i(565813),
    v = e.i(912585),
    y = e.i(42541),
    h = e.i(909576),
    p = e.i(942219),
    I = e.i(163097),
    R = e.i(395622),
    M = e.i(985436),
    A = e.i(867175),
    b = e.i(474877),
    E = e.i(292686),
    S = e.i(408289),
    w = e.i(967388),
    C = e.i(396693),
    L = e.i(480530),
    U = e.i(54567),
    T = e.i(66866),
    _ = e.i(596904),
    k = e.i(750115);
  let B = (0, e.i(78436).$)((e, r) => ({
    participantsByRoom: {},
    bannedUsersByRoom: {},
    banUser: (r, t) =>
      e((e) => {
        let s = new Set(e.bannedUsersByRoom[t] || new Set());
        return (
          s.add(r),
          { bannedUsersByRoom: { ...e.bannedUsersByRoom, [t]: s } }
        );
      }),
    unbanUser: (r, t) =>
      e((e) => {
        let s = new Set(e.bannedUsersByRoom[t] || new Set());
        return (
          s.delete(r),
          { bannedUsersByRoom: { ...e.bannedUsersByRoom, [t]: s } }
        );
      }),
    isUserBanned: (e, t) => {
      let s = r().bannedUsersByRoom[t];
      return !!s && s.has(e);
    },
    clearBannedUsers: (r) =>
      e((e) => {
        if (!r) return { bannedUsersByRoom: {} };
        {
          let { [r]: t, ...s } = e.bannedUsersByRoom;
          return { bannedUsersByRoom: s };
        }
      }),
    setParticipants: (r, t) =>
      e((e) => ({ participantsByRoom: { ...e.participantsByRoom, [r]: t } })),
    addParticipant: (r, t) =>
      e((e) => {
        let s = e.participantsByRoom[r] || [];
        return s.some((e) => e.userAddress === t.userAddress)
          ? e
          : { participantsByRoom: { ...e.participantsByRoom, [r]: [...s, t] } };
      }),
    removeParticipant: (r, t) =>
      e((e) => {
        let s = e.participantsByRoom[r] || [];
        return {
          participantsByRoom: {
            ...e.participantsByRoom,
            [r]: s.filter((e) => e.userAddress !== t),
          },
        };
      }),
  }));
  e.s(["f", 0, B], 619416);
  var P = e.i(550118),
    x = e.i(26454),
    F = e.i(18671),
    j = e.i(188624),
    D = e.i(450098),
    O = e.i(508695);
  let Q = (0, o.createContext)(void 0),
    N = (e) => {
      let s,
        a,
        i,
        d,
        l,
        u,
        N,
        K,
        G,
        V,
        Y,
        Z,
        ee,
        et,
        es,
        en,
        eo,
        ea,
        ei,
        ed,
        el,
        eu,
        ec,
        em,
        eg,
        ef,
        ev = (0, t.c)(116),
        { children: ey, roomId: eh, readOnly: ep, shouldJoin: eI } = e,
        eR = void 0 !== ep && ep,
        { socket: eM, isConnected: eA } = (0, M.I)(),
        { user: eb } = (0, A.X)(),
        { isDisconnected: eE } = er(),
        eS = (0, n.useQueryClient)(),
        { isCreator: ew, isRoomModerator: eC } = (0, b.G)(),
        eL = (0, P.f)($),
        [eU, eT] = (0, o.useState)(null);
      ev[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = []), (ev[0] = s))
        : (s = ev[0]);
      let [e_, ek] = (0, o.useState)(s);
      ev[1] !== eS || ev[2] !== eh
        ? ((a = (e, r) => {
            (ek([]),
              eS.invalidateQueries({ queryKey: (0, p.l)(eh) }),
              eT(r || null));
          }),
          (ev[1] = eS),
          (ev[2] = eh),
          (ev[3] = a))
        : (a = ev[3]);
      let {
          isJoined: eB,
          isJoining: eP,
          currentRoomId: ex,
        } = (({
          roomId: e,
          shouldJoin: r,
          onJoinSuccess: s,
          onLeaveRoom: n,
        }) => {
          let { socket: a, connect: i, disconnect: d } = (0, M.I)(),
            { user: l, authReady: u } = (0, A.X)(),
            {
              isJoined: c,
              isJoining: m,
              currentRoomId: g,
              joinRoom: f,
              leaveRoom: v,
              resetRoomState: y,
              roomStateRef: h,
            } = (({ onJoinSuccess: e, onAuthUpdated: r }) => {
              let t = (0, M.Y)(),
                { emitJoinRoom: s, emitLeaveRoom: n } = (0, T.f)({ socket: t }),
                [a, i] = (0, o.useState)(!1),
                [d, l] = (0, o.useState)(!1),
                [u, c] = (0, o.useState)(!1),
                [m, g] = (0, o.useState)(null),
                [f, v] = (0, o.useState)(null),
                y = (0, o.useRef)(null),
                h = (0, o.useRef)({ isJoined: !1, currentRoomId: null });
              h.current = { isJoined: a, currentRoomId: f };
              let p = (0, o.useCallback)(
                  (t, s, n, o) => {
                    ((y.current = o),
                      U.logger.info(
                        "[useLivechatRoom] Received auth status from backend",
                        {
                          roomId: t,
                          authenticated: n.authenticated,
                          userAddress: n.userAddress,
                          userId: n.userId,
                          isCreator: n.isCreator,
                          isRoomModerator: n.isRoomModerator,
                        },
                      ),
                      (0, S.w)({
                        mintId: t,
                        status: E.tL.SUCCESS,
                        context: w.R.CHAT,
                      }),
                      r?.({
                        isAuthenticated: !!n.authenticated,
                        userAddress: n.userAddress || "",
                        userId: n.userId,
                        isCreator: n.isCreator ?? !1,
                        isRoomModerator: n.isRoomModerator ?? !1,
                        pinnedMessageId: n.pinnedMessageId,
                      }),
                      g({
                        id: o,
                        username: s.username || "",
                        profile_image: s.profile_image || C.f,
                        userAddress: n.userAddress || "",
                        ...(n.userId ? { userId: n.userId } : {}),
                      }),
                      v(t),
                      l(!1),
                      i(!0),
                      e?.(t, n.pinnedMessageId));
                  },
                  [r, e],
                ),
                I = (0, o.useCallback)(
                  (e, r) => {
                    d ||
                      u ||
                      (l(!0),
                      s(e, r.username || "", (t, s) => {
                        if (Array.isArray(t)) {
                          let n = t.map((e) =>
                            (0, L.s)({
                              rawMsg: e,
                              currentUserUsername: r.username,
                            }),
                          );
                          p(e, r, { authenticated: !1, messages: n }, s);
                        } else p(e, r, t, s);
                      }));
                  },
                  [d, u, s, p],
                ),
                R = (0, o.useCallback)(() => {
                  if (u || !f) return;
                  (U.logger.info("[useLivechatRoom] Attempting to leave room", {
                    currentRoomId: f,
                  }),
                    c(!0));
                  let e = m?.username || "";
                  ((0, S.B)({
                    mintId: f,
                    status: E.tL.SUCCESS,
                    context: w.R.CHAT,
                  }),
                    (h.current = { isJoined: !1, currentRoomId: null }),
                    v(null),
                    g(null),
                    i(!1),
                    c(!1),
                    r?.({ isAuthenticated: !1, userAddress: void 0 }),
                    n(f, e),
                    U.logger.info("[useLivechatRoom] Left room", {
                      roomId: f,
                    }));
                }, [u, f, m, n, r]);
              return {
                roomStateRef: h,
                isJoined: a,
                isJoining: d,
                isLeaving: u,
                currentUser: m,
                currentRoomId: f,
                joinRoom: I,
                leaveRoom: R,
                resetRoomState: (0, o.useCallback)(() => {
                  (U.logger.debug("[useLivechatRoom] Resetting room state"),
                    i(!1),
                    l(!1),
                    c(!1),
                    g(null),
                    v(null),
                    r?.({ isAuthenticated: !1, userAddress: void 0 }));
                }, [r]),
                setCurrentUser: g,
              };
            })({ onJoinSuccess: s }),
            p = (0, o.useCallback)(() => {
              r &&
                f(e, {
                  username: l?.username ?? null,
                  profile_image: l?.profile_image ?? C.f,
                  userAddress: l?.address ?? void 0,
                });
            }, [e, f, l?.username, l?.profile_image, l?.address, r]),
            I = (0, o.useCallback)(() => {
              (v(), n());
            }, [v, n]),
            R = (0, o.useCallback)(() => {
              (b.current(), d());
            }, [d]),
            b = (0, o.useRef)(I);
          ((0, o.useEffect)(() => {
            b.current = I;
          }),
            ((e) => {
              let r,
                s,
                n = (0, t.c)(5),
                { socket: a, onDisconnect: i, onReconnect: d } = e;
              (n[0] !== i || n[1] !== d || n[2] !== a
                ? ((r = () => {
                    if (!a) return;
                    let e = (e) => {
                        if ("io client disconnect" !== e) {
                          U.logger.info(
                            "[useLivechatSocketEvents] Socket disconnected",
                            { reason: e },
                          );
                          try {
                            i();
                          } catch (e) {
                            U.logger.error(
                              "[useLivechatSocketEvents] Error in disconnect handler",
                              {
                                error:
                                  e instanceof Error ? e.message : String(e),
                              },
                            );
                          }
                        }
                      },
                      r = () => {
                        U.logger.info(
                          "[useLivechatSocketEvents] Socket connected/reconnected",
                        );
                        try {
                          d();
                        } catch (e) {
                          U.logger.error(
                            "[useLivechatSocketEvents] Error in reconnect handler",
                            {
                              error: e instanceof Error ? e.message : String(e),
                            },
                          );
                        }
                      };
                    return (
                      a.on("disconnect", e),
                      a.on("connect", r),
                      () => {
                        (a.off("disconnect", e), a.off("connect", r));
                      }
                    );
                  }),
                  (s = [a, i, d]),
                  (n[0] = i),
                  (n[1] = d),
                  (n[2] = a),
                  (n[3] = r),
                  (n[4] = s))
                : ((r = n[3]), (s = n[4])),
                (0, o.useEffect)(r, s));
            })({
              socket: a,
              onDisconnect: (0, o.useCallback)(() => {
                let { isJoined: e, currentRoomId: r } = h.current;
                e &&
                  r &&
                  (U.logger.info(
                    "[LivechatProvider] Socket disconnected, saving room for rejoin",
                    { roomId: r },
                  ),
                  y());
              }, [y, h]),
              onReconnect: (0, o.useCallback)(() => {
                (U.logger.info(
                  "[LivechatProvider] Rejoining room after reconnect",
                ),
                  p());
              }, [p]),
            }),
            (0, o.useEffect)(() => {
              if (u)
                return (
                  i(),
                  () => {
                    R();
                  }
                );
            }, [u, i, R]));
          let k = (0, o.useCallback)(
              (e) => {
                (U.logger.debug(
                  "[useLivechatLifecycle] Syncing livechat with auth change",
                  { nextAddress: e, isJoined: c, isJoining: m },
                ),
                  m && y(),
                  c && I(),
                  e || (0, _.u)());
              },
              [m, y, c, I],
            ),
            B = (0, o.useRef)(void 0),
            P = (0, o.useRef)(!1);
          return (
            (0, o.useEffect)(() => {
              if (!u) return;
              let e = l?.address ?? void 0,
                r = B.current;
              if (!P.current) {
                ((P.current = !0), (B.current = e));
                return;
              }
              e !== r && ((B.current = e), k(e));
            }, [u, l?.address, k]),
            {
              isJoined: c,
              isJoining: m,
              currentRoomId: g,
              joinRoom: p,
              leaveRoom: I,
              syncLivechatWithAuth: k,
            }
          );
        })({
          roomId: eh,
          shouldJoin: void 0 === eI || eI,
          onJoinSuccess: a,
          onLeaveRoom: () => {
            (ek([]), eF && eS.invalidateQueries({ queryKey: (0, p.l)(eF) }));
          },
        }),
        eF = ex;
      ev[4] !== eB || ev[5] !== eb
        ? ((i = eB && (0, O.T)(eb)), (ev[4] = eB), (ev[5] = eb), (ev[6] = i))
        : (i = ev[6]);
      let ej = i,
        eD = (0, o.useRef)(null);
      (ev[7] !== eL || ev[8] !== eF
        ? ((d = () => {
            eD.current !== eF &&
              ((eD.current || eF) && eL(), (eD.current = eF ?? null));
          }),
          (ev[7] = eL),
          (ev[8] = eF),
          (ev[9] = d))
        : (d = ev[9]),
        ev[10] !== eL || ev[11] !== eF
          ? ((l = [eL, eF]), (ev[10] = eL), (ev[11] = eF), (ev[12] = l))
          : (l = ev[12]),
        (0, o.useEffect)(d, l),
        ev[13] !== eF
          ? ((u = (e) => {
              let r = {
                id: `sys-${Date.now()}`,
                roomId: eF || "system",
                message: e,
                timestamp: new Date(),
                messageType: F.d.SYSTEM,
              };
              ek((e) => [...e, r]);
            }),
            (ev[13] = eF),
            (ev[14] = u))
          : (u = ev[14]));
      let eO = u,
        eQ = eA && eB;
      ev[15] !== eF || ev[16] !== eM || ev[17] !== eQ || ev[18] !== eb
        ? ((N = { socket: eM, roomId: eF, currentUser: eb, isEnabled: eQ }),
          (ev[15] = eF),
          (ev[16] = eM),
          (ev[17] = eQ),
          (ev[18] = eb),
          (ev[19] = N))
        : (N = ev[19]);
      let {
        data: eN,
        fetchNextPage: eK,
        hasNextPage: eG,
        isFetchingNextPage: e$,
      } = (0, p.Q)(N);
      e: {
        let e;
        if (!eN?.pages) {
          let e;
          (ev[20] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = []), (ev[20] = e))
            : (e = ev[20]),
            (K = e));
          break e;
        }
        (ev[21] !== eN.pages
          ? ((e = eN.pages.flatMap(q)), (ev[21] = eN.pages), (ev[22] = e))
          : (e = ev[22]),
          (K = e));
      }
      let eq = K,
        eW = eb?.userId,
        eH = eb?.address,
        eX = eb?.username;
      ev[23] !== eq || ev[24] !== eW || ev[25] !== eH || ev[26] !== eX
        ? ((G = {
            messages: eq,
            currentUserId: eW,
            currentUserAddress: eH,
            currentUsername: eX,
          }),
          (ev[23] = eq),
          (ev[24] = eW),
          (ev[25] = eH),
          (ev[26] = eX),
          (ev[27] = G))
        : (G = ev[27]);
      let { canSend: eJ, recordOwnSend: ez } = (0, I.f)(G);
      ev[28] !== eO || ev[29] !== eF || ev[30] !== eM || ev[31] !== eb
        ? ((V = {
            socket: eM,
            roomId: eF,
            currentUser: eb,
            addSystemMessage: eO,
          }),
          (ev[28] = eO),
          (ev[29] = eF),
          (ev[30] = eM),
          (ev[31] = eb),
          (ev[32] = V))
        : (V = ev[32]);
      let { mutate: eV, isPending: eY } = (0, R.f)(V);
      (ev[33] !== eO ||
      ev[34] !== eJ ||
      ev[35] !== eF ||
      ev[36] !== ej ||
      ev[37] !== eR ||
      ev[38] !== ez ||
      ev[39] !== eV ||
      ev[40] !== eb?.address ||
      ev[41] !== eb?.userId ||
      ev[42] !== eb?.username
        ? ((Y = (e) => {
            if (eR || !ej || !e.messageText.trim()) return;
            let r = eJ(e.messageText);
            if (!r.allow) {
              c.f.addAction("sendMessage:blocked", {
                reason: r.reason,
                roomId: eF,
                userAddress: eb?.address,
                userId: eb?.userId,
              });
              let t = m.$[r.reason] || "blocked by client moderation",
                s = (0, D.f)(e.messageText);
              (U.logger.info("[LivechatProvider] Client-side send blocked", {
                reason: r.reason,
                roomId: eF,
                userAddress: eb?.address,
                userId: eb?.userId,
                username: eb?.username,
                messageLength: e.messageText.length,
                normalizedLength: s.length,
                isAuthenticated: ej,
              }),
                eO(`Failed to send message: ${t}`));
              return;
            }
            (ez(), eV(e));
          }),
          (ev[33] = eO),
          (ev[34] = eJ),
          (ev[35] = eF),
          (ev[36] = ej),
          (ev[37] = eR),
          (ev[38] = ez),
          (ev[39] = eV),
          (ev[40] = eb?.address),
          (ev[41] = eb?.userId),
          (ev[42] = eb?.username),
          (ev[43] = Y))
        : (Y = ev[43]),
        eb?.userId,
        eb?.address,
        eb?.username);
      let eZ = Y;
      (ev[44] !== eF ||
      ev[45] !== ej ||
      ev[46] !== eB ||
      ev[47] !== eS ||
      ev[48] !== eR ||
      ev[49] !== eb?.address ||
      ev[50] !== eb?.userId ||
      ev[51] !== eb?.username
        ? ((Z = (e) => {
            if (
              (0, j.Z)({ userAddress: e.userAddress, username: e.username }) &&
              eB &&
              e.roomId === eF
            ) {
              let r = (0, L.s)({
                rawMsg: e,
                currentUserId: eb?.userId,
                currentUserUsername: eb?.username,
                currentUserAddress: eb?.address,
              });
              if (!eR && ej && r.isOwnMessage) {
                let e = (0, p.l)(eF),
                  t = eS.getQueryData(e);
                if (
                  t?.pages
                    .flatMap(W)
                    .some(
                      (e) =>
                        e.isPending &&
                        e.isOwnMessage &&
                        e.message === r.message,
                    )
                )
                  return;
              }
              let t = (0, p.l)(eF);
              eS.setQueryData(t, (e) => {
                if (
                  !e ||
                  e.pages.some((e) =>
                    e.messages.some((e) => e.id === r.id && r.id),
                  )
                )
                  return e;
                let t = e.pages.map((t, s) =>
                  s === e.pages.length - 1
                    ? { ...t, messages: [...t.messages, r] }
                    : t,
                );
                return { ...e, pages: t };
              });
            }
          }),
          (ev[44] = eF),
          (ev[45] = ej),
          (ev[46] = eB),
          (ev[47] = eS),
          (ev[48] = eR),
          (ev[49] = eb?.address),
          (ev[50] = eb?.userId),
          (ev[51] = eb?.username),
          (ev[52] = Z))
        : (Z = ev[52]),
        eb?.userId,
        eb?.address,
        eb?.username);
      let e0 = Z;
      ev[53] !== eF || ev[54] !== eS
        ? ((ee = (e) => {
            eF &&
              (x.K.getState().addModerator(eF, (0, x.n)(e)),
              eS.invalidateQueries({ queryKey: [f.L, eF] }));
          }),
          (ev[53] = eF),
          (ev[54] = eS),
          (ev[55] = ee))
        : (ee = ev[55]);
      let e1 = ee;
      ev[56] !== eF || ev[57] !== eS
        ? ((et = (e) => {
            eF &&
              (x.K.getState().removeModerator(eF, (0, x.n)(e)),
              eS.invalidateQueries({ queryKey: [f.L, eF] }));
          }),
          (ev[56] = eF),
          (ev[57] = eS),
          (ev[58] = et))
        : (et = ev[58]);
      let e2 = et;
      ev[59] !== eF || ev[60] !== eS
        ? ((es = (e) => {
            if (
              (U.logger.debug(
                "[LivechatProvider] Received messageDeleted event",
                { messageId: e, roomId: eF },
              ),
              !eF)
            )
              return void U.logger.warn(
                "[LivechatProvider] No current room ID for message deletion",
                { messageId: e },
              );
            let r = (0, p.l)(eF);
            eS.setQueryData(r, (r) => {
              if (!r)
                return (
                  U.logger.debug(
                    "[LivechatProvider] No existing data to update for message deletion",
                    { messageId: e, roomId: eF },
                  ),
                  r
                );
              let t = r.pages.map((r) => ({
                  ...r,
                  messages: r.messages.filter((r) => r.id !== e),
                })),
                s = { ...r, pages: t };
              return (
                U.logger.debug(
                  "[LivechatProvider] Message removed from cache",
                  { messageId: e, roomId: eF },
                ),
                s
              );
            });
          }),
          (ev[59] = eF),
          (ev[60] = eS),
          (ev[61] = es))
        : (es = ev[61]);
      let e5 = es;
      ev[62] !== eF || ev[63] !== eS
        ? ((en = (e) => {
            U.logger.debug(
              "[LivechatProvider] Received userMessagesWiped event",
              { userAddress: e.userAddress, userId: e.userId, roomId: eF },
            );
            let r = (0, O.g)({
              userAddress: e.userAddress,
              ccUserId: e.userId,
            });
            if (!eF) return;
            let t = (0, p.l)(eF);
            (eS.setQueryData(t, (e) => {
              if (!e) return e;
              let t = e.pages.map((e) => ({
                ...e,
                messages: e.messages.filter(
                  (e) =>
                    !(0, O.E)({ userId: e.userId, address: e.userAddress }, r),
                ),
              }));
              return { ...e, pages: t };
            }),
              eS.invalidateQueries({ queryKey: t, exact: !0 }));
          }),
          (ev[62] = eF),
          (ev[63] = eS),
          (ev[64] = en))
        : (en = ev[64]);
      let e4 = en;
      ev[65] === Symbol.for("react.memo_cache_sentinel")
        ? ((eo = (e) => {
            eT(e.messageId);
          }),
          (ev[65] = eo))
        : (eo = ev[65]);
      let e3 = eo;
      ev[66] === Symbol.for("react.memo_cache_sentinel")
        ? ((ea = () => {
            eT(null);
          }),
          (ev[66] = ea))
        : (ea = ev[66]);
      let e6 = ea,
        e8 = B(H),
        e7 = B(X);
      (ev[67] !== e8 ||
      ev[68] !== eF ||
      ev[69] !== eS ||
      ev[70] !== eM ||
      ev[71] !== e7
        ? ((ei = () => {
            if (!eM || !eF) return;
            let e = (e) => {
                (U.logger.debug(
                  "[LivechatProvider] Received userBannedInRoom event",
                  { roomId: eF, userAddress: e.userAddress, userId: e.userId },
                ),
                  e8(e.userAddress, eF),
                  e.userId && e8(e.userId, eF),
                  eS.invalidateQueries({ queryKey: [g.A, eF] }));
              },
              r = (e) => {
                (U.logger.debug(
                  "[LivechatProvider] Received userUnbannedInRoom event",
                  { roomId: eF, userAddress: e.userAddress, userId: e.userId },
                ),
                  e7(e.userAddress, eF),
                  e.userId && e7(e.userId, eF),
                  eS.invalidateQueries({ queryKey: [g.A, eF] }));
              };
            return (
              eM.on("userBannedInRoom", e),
              eM.on("userUnbannedInRoom", r),
              () => {
                (eM.off("userBannedInRoom", e),
                  eM.off("userUnbannedInRoom", r));
              }
            );
          }),
          (ev[67] = e8),
          (ev[68] = eF),
          (ev[69] = eS),
          (ev[70] = eM),
          (ev[71] = e7),
          (ev[72] = ei))
        : (ei = ev[72]),
        ev[73] !== e8 ||
        ev[74] !== eF ||
        ev[75] !== eS ||
        ev[76] !== eM ||
        ev[77] !== e7
          ? ((ed = [eM, eF, eS, e8, e7]),
            (ev[73] = e8),
            (ev[74] = eF),
            (ev[75] = eS),
            (ev[76] = eM),
            (ev[77] = e7),
            (ev[78] = ed))
          : (ed = ev[78]),
        (0, o.useEffect)(ei, ed),
        ev[79] !== e5 ||
        ev[80] !== e1 ||
        ev[81] !== e2 ||
        ev[82] !== e0 ||
        ev[83] !== e4 ||
        ev[84] !== eM
          ? ((el = {
              socket: eM,
              onNewMessage: e0,
              onMessageDeleted: e5,
              onUserMessagesWiped: e4,
              onModeratorAssigned: e1,
              onModeratorUnassigned: e2,
              onMessagePinned: e3,
              onMessageUnpinned: e6,
            }),
            (ev[79] = e5),
            (ev[80] = e1),
            (ev[81] = e2),
            (ev[82] = e0),
            (ev[83] = e4),
            (ev[84] = eM),
            (ev[85] = el))
          : (el = ev[85]),
        (0, h.f)(el));
      let e9 = eb?.address ?? void 0;
      if (
        (ev[86] !== eF || ev[87] !== eM || ev[88] !== e9
          ? ((eu = { socket: eM, currentRoomId: eF, currentUserAddress: e9 }),
            (ev[86] = eF),
            (ev[87] = eM),
            (ev[88] = e9),
            (ev[89] = eu))
          : (eu = ev[89]),
        (0, y.f)(eu),
        ev[90] !== eN || ev[91] !== e_)
      ) {
        r: {
          let e = [...(eN?.pages ? eN.pages.flatMap(J) : []), ...e_].sort(z);
          if (e.length > v.L) {
            let r = e.length - v.L;
            (U.logger.debug(
              "[LivechatProvider] Truncating old messages from memory",
              { totalMessages: e.length, truncatedCount: r, keptMessages: v.L },
            ),
              (ec = e.slice(-v.L)));
            break r;
          }
          ec = e;
        }
        ((ev[90] = eN), (ev[91] = e_), (ev[92] = ec));
      } else ec = ev[92];
      let re = ec,
        rr = !!eG,
        rt = eR || !ej;
      ev[93] !== re ||
      ev[94] !== eF ||
      ev[95] !== eK ||
      ev[96] !== ej ||
      ev[97] !== ew ||
      ev[98] !== e$ ||
      ev[99] !== eB ||
      ev[100] !== eP ||
      ev[101] !== eC ||
      ev[102] !== eY ||
      ev[103] !== eU ||
      ev[104] !== eZ ||
      ev[105] !== eM ||
      ev[106] !== rr ||
      ev[107] !== rt
        ? ((em = {
            socket: eM,
            isJoined: eB,
            isJoining: eP,
            messages: re,
            currentRoomId: eF,
            hasMoreHistory: rr,
            isLoadingHistory: e$,
            loadOlderMessages: eK,
            pinnedMessageId: eU,
            sendMessage: eZ,
            isSendingMessage: eY,
            readOnly: rt,
            isAuthenticated: ej,
            isCreator: ew,
            isRoomModerator: eC,
          }),
          (ev[93] = re),
          (ev[94] = eF),
          (ev[95] = eK),
          (ev[96] = ej),
          (ev[97] = ew),
          (ev[98] = e$),
          (ev[99] = eB),
          (ev[100] = eP),
          (ev[101] = eC),
          (ev[102] = eY),
          (ev[103] = eU),
          (ev[104] = eZ),
          (ev[105] = eM),
          (ev[106] = rr),
          (ev[107] = rt),
          (ev[108] = em))
        : (em = ev[108]);
      let rs = em,
        rn = !eE;
      return (
        ev[109] !== ey || ev[110] !== rs
          ? ((eg = (0, r.jsx)(Q.Provider, { value: rs, children: ey })),
            (ev[109] = ey),
            (ev[110] = rs),
            (ev[111] = eg))
          : (eg = ev[111]),
        ev[112] !== eh || ev[113] !== rn || ev[114] !== eg
          ? ((ef = (0, r.jsx)(k.j, { roomId: eh, enabled: rn, children: eg })),
            (ev[112] = eh),
            (ev[113] = rn),
            (ev[114] = eg),
            (ev[115] = ef))
          : (ef = ev[115]),
        ef
      );
    },
    K = (e) => {
      let s,
        n,
        o,
        a,
        i,
        d,
        l,
        u,
        c,
        m = (0, t.c)(18);
      m[0] !== e
        ? (({
            isModeratorCheckEnabled: a,
            roomId: o,
            children: s,
            isConnectionEnabled: i,
            shouldJoin: d,
            ...n
          } = e),
          (m[0] = e),
          (m[1] = s),
          (m[2] = n),
          (m[3] = o),
          (m[4] = a),
          (m[5] = i),
          (m[6] = d))
        : ((s = m[1]),
          (n = m[2]),
          (o = m[3]),
          (a = m[4]),
          (i = m[5]),
          (d = m[6]));
      let g = void 0 === a || a,
        f = void 0 === i || i,
        v = void 0 === d || d,
        y = f && v;
      return (
        m[7] !== s || m[8] !== n || m[9] !== o || m[10] !== y
          ? ((l = (0, r.jsx)(N, {
              roomId: o,
              shouldJoin: y,
              ...n,
              children: s,
            })),
            (m[7] = s),
            (m[8] = n),
            (m[9] = o),
            (m[10] = y),
            (m[11] = l))
          : (l = m[11]),
        m[12] !== g || m[13] !== l
          ? ((u = (0, r.jsx)(b._, { isEnabled: g, children: l })),
            (m[12] = g),
            (m[13] = l),
            (m[14] = u))
          : (u = m[14]),
        m[15] !== f || m[16] !== u
          ? ((c = (0, r.jsx)(M.y, { isEnabled: f, children: u })),
            (m[15] = f),
            (m[16] = u),
            (m[17] = c))
          : (c = m[17]),
        c
      );
    },
    G = () => {
      let e = (0, o.useContext)(Q);
      if (void 0 === e)
        throw Error("useLivechat must be used within a LivechatProvider");
      return e;
    };
  function $(e) {
    return e.clearRoom;
  }
  function q(e) {
    return e.messages;
  }
  function W(e) {
    return e.messages;
  }
  function H(e) {
    return e.banUser;
  }
  function X(e) {
    return e.unbanUser;
  }
  function J(e) {
    return e.messages;
  }
  function z(e, r) {
    return e.timestamp.getTime() - r.timestamp.getTime();
  }
  let V = (0, o.createContext)(void 0);
  e.s(
    [
      "V",
      0,
      V,
      "X",
      0,
      () => {
        let e = (0, o.useContext)(V);
        if (!e)
          throw Error(
            "useLivekitConnectionContext must be used within a LivekitConnectionContext.Provider",
          );
        return e;
      },
    ],
    701470,
  );
  var Y = e.i(182251);
  let Z = (0, o.createContext)(void 0),
    ee = (e) => {
      let c,
        m,
        g,
        f,
        v,
        y,
        h,
        p,
        I,
        R,
        M,
        b,
        E,
        S,
        w,
        C,
        L,
        T,
        _,
        k = (0, t.c)(65),
        {
          isLivechatEnabled: B,
          children: P,
          mint: x,
          isMobile: F,
          livechatReadOnly: j,
          initialLivestream: D,
          initialBanExpiry: Q,
          isModeratorCheckEnabled: N,
          isLive: G,
          shouldGetCoinInfo: $,
          shouldGetLivestreamData: q,
          shouldJoinChatRoom: W,
        } = e,
        H = void 0 !== j && j,
        X = void 0 === G || G,
        J = void 0 === $ || $,
        z = void 0 === q || q,
        ee = void 0 === W || W,
        [er, es] = (0, o.useState)(null),
        [en, eo] = (0, o.useState)(!1),
        [ea, ei] = (0, o.useState)(!1),
        [ed, el] = (0, o.useState)(!1),
        eu = (0, o.useRef)(null),
        ec = void 0 !== F ? F : ed,
        em = (0, n.useQueryClient)(),
        eg = (0, Y.F)(et),
        { user: ef, authReady: ev } = (0, A.X)();
      (k[0] !== Q
        ? ((c = () => {
            ei(!!(Q && Q > Date.now()));
          }),
          (m = [Q, ei]),
          (k[0] = Q),
          (k[1] = c),
          (k[2] = m))
        : ((c = k[1]), (m = k[2])),
        (0, o.useEffect)(c, m),
        k[3] !== D || k[4] !== x
          ? ((g = { mintId: x, initial: D }),
            (k[3] = D),
            (k[4] = x),
            (k[5] = g))
          : (g = k[5]));
      let ey = (0, l.D)(g);
      (k[6] !== F
        ? ((f = () => {
            if (void 0 !== F) return;
            let e = () => {
              let e = window.innerWidth < 768;
              el((r) => (r !== e ? e : r));
            };
            return (
              e(),
              window.addEventListener("resize", e),
              () => window.removeEventListener("resize", e)
            );
          }),
          (v = [F]),
          (k[6] = F),
          (k[7] = f),
          (k[8] = v))
        : ((f = k[7]), (v = k[8])),
        (0, o.useEffect)(f, v),
        k[9] !== en || k[10] !== ey
          ? ((y = () => {
              en && ey && eo(!1);
            }),
            (h = [en, ey, eo]),
            (k[9] = en),
            (k[10] = ey),
            (k[11] = y),
            (k[12] = h))
          : ((y = k[11]), (h = k[12])),
        (0, o.useEffect)(y, h),
        k[13] !== eg || k[14] !== x || k[15] !== em
          ? ((p = (e) => {
              let r = void 0 === e ? {} : e;
              (U.logger.info("[LivestreamProvider] resetContext called.", {
                mintId: x,
              }),
                es(null),
                eo(r?.isDisconnected ?? !1),
                r?.isDisconnected && eg(x),
                em.invalidateQueries({ queryKey: [i.T, x] }),
                em.invalidateQueries({ queryKey: [d.E, x] }));
            }),
            (k[13] = eg),
            (k[14] = x),
            (k[15] = em),
            (k[16] = p))
          : (p = k[16]));
      let eh = p,
        ep = (0, o.useRef)(null);
      k[17] !== ev || k[18] !== ef?.address
        ? ((I = () => {
            if (!ev) return;
            let e = ep.current;
            e === ef?.address ||
              ((ep.current = ef?.address ?? null), null !== e && es(null));
          }),
          (k[17] = ev),
          (k[18] = ef?.address),
          (k[19] = I))
        : (I = k[19]);
      let eI = ef?.address;
      (k[20] !== ev || k[21] !== eI
        ? ((R = [ev, eI]), (k[20] = ev), (k[21] = eI), (k[22] = R))
        : (R = k[22]),
        (0, o.useEffect)(I, R),
        U.logger.debug(
          "[LivestreamProvider] Recalculating LivestreamContext value.",
          { mintId: x },
        ),
        k[23] !== ea ||
        k[24] !== en ||
        k[25] !== X ||
        k[26] !== ec ||
        k[27] !== x ||
        k[28] !== eh ||
        k[29] !== er
          ? ((M = {
              mintId: x,
              token: er,
              setToken: es,
              isDisconnected: en,
              setIsDisconnected: eo,
              resetContext: eh,
              isBanned: ea,
              isMobile: ec,
              roomRef: eu,
              isLive: X,
            }),
            (k[23] = ea),
            (k[24] = en),
            (k[25] = X),
            (k[26] = ec),
            (k[27] = x),
            (k[28] = eh),
            (k[29] = er),
            (k[30] = M))
          : (M = k[30]));
      let eR = M;
      k[31] !== ec || k[32] !== x || k[33] !== eh || k[34] !== er
        ? ((b = {
            mintId: x,
            token: er,
            isMobile: ec,
            roomRef: eu,
            setIsDisconnected: eo,
            resetContext: eh,
          }),
          (k[31] = ec),
          (k[32] = x),
          (k[33] = eh),
          (k[34] = er),
          (k[35] = b))
        : (b = k[35]);
      let eM = b;
      (k[36] !== Q || k[37] !== D || k[38] !== X || k[39] !== J || k[40] !== z
        ? ((E = (0, r.jsx)(a.f, {
            isLive: X,
            shouldGetLivestreamData: z,
            shouldGetCoinInfo: J,
            initialBanExpiry: Q,
            initialLivestream: D,
            setIsBanned: ei,
          })),
          (k[36] = Q),
          (k[37] = D),
          (k[38] = X),
          (k[39] = J),
          (k[40] = z),
          (k[41] = E))
        : (E = k[41]),
        k[42] !== H || k[43] !== ef
          ? ((S = H || !(0, O.T)(ef)), (k[42] = H), (k[43] = ef), (k[44] = S))
          : (S = k[44]));
      let eA = X && (void 0 === N || N),
        eb = (void 0 === B || B) && X;
      return (
        k[45] !== P
          ? ((w = (0, r.jsx)(s.g, { children: P })), (k[45] = P), (k[46] = w))
          : (w = k[46]),
        k[47] !== x ||
        k[48] !== ee ||
        k[49] !== S ||
        k[50] !== eA ||
        k[51] !== eb ||
        k[52] !== w
          ? ((C = (0, r.jsx)(K, {
              roomId: x,
              readOnly: S,
              isModeratorCheckEnabled: eA,
              isConnectionEnabled: eb,
              shouldJoin: ee,
              children: w,
            })),
            (k[47] = x),
            (k[48] = ee),
            (k[49] = S),
            (k[50] = eA),
            (k[51] = eb),
            (k[52] = w),
            (k[53] = C))
          : (C = k[53]),
        k[54] !== eM || k[55] !== C
          ? ((L = (0, r.jsx)(V.Provider, { value: eM, children: C })),
            (k[54] = eM),
            (k[55] = C),
            (k[56] = L))
          : (L = k[56]),
        k[57] !== D || k[58] !== x || k[59] !== E || k[60] !== L
          ? ((T = (0, r.jsxs)(u.h, {
              mintId: x,
              livestream: D,
              children: [E, L],
            })),
            (k[57] = D),
            (k[58] = x),
            (k[59] = E),
            (k[60] = L),
            (k[61] = T))
          : (T = k[61]),
        k[62] !== T || k[63] !== eR
          ? ((_ = (0, r.jsx)(Z.Provider, { value: eR, children: T })),
            (k[62] = T),
            (k[63] = eR),
            (k[64] = _))
          : (_ = k[64]),
        _
      );
    };
  function er() {
    let e = (0, o.useContext)(Z);
    if (void 0 === e)
      throw Error(
        "useLivestreamContext must be used within a LivestreamProvider",
      );
    return e;
  }
  function et(e) {
    return e.clearLivestream;
  }
};
