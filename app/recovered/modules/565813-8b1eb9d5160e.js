// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(445242),
    t = e.i(944410),
    s = e.i(690877),
    n = e.i(867175),
    o = e.i(78436),
    a = e.i(508695);
  let i = (e) => ({
      ...(e.userId ? { userId: e.userId } : {}),
      ...(e.userAddress ? { address: e.userAddress } : {}),
    }),
    d = (e, r) => !!e?.some((e) => (0, a.E)(e, r)),
    l = (0, o.$)((e, r) => ({
      roomModeratorsByRoom: {},
      setModerators: (r, t) =>
        e((e) => ({
          roomModeratorsByRoom: { ...e.roomModeratorsByRoom, [r]: [...t] },
        })),
      addModerator: (r, t) =>
        e((e) => {
          let s = e.roomModeratorsByRoom[r] || [];
          return d(s, t)
            ? e
            : {
                roomModeratorsByRoom: {
                  ...e.roomModeratorsByRoom,
                  [r]: [...s, t],
                },
              };
        }),
      removeModerator: (r, t) =>
        e((e) => {
          let s = e.roomModeratorsByRoom[r] || [];
          return {
            roomModeratorsByRoom: {
              ...e.roomModeratorsByRoom,
              [r]: s.filter((e) => !(0, a.E)(e, t)),
            },
          };
        }),
      isRoomModerator: (e, t) => d(r().roomModeratorsByRoom[e], t),
      clearModerators: (r) =>
        e((e) => {
          if (r) {
            let { [r]: t, ...s } = e.roomModeratorsByRoom;
            return { roomModeratorsByRoom: s };
          }
          return { roomModeratorsByRoom: {} };
        }),
    }));
  e.s(
    [
      "n",
      0,
      i,
      "Z",
      0,
      (e, r) => (t) => !!r && d(t.roomModeratorsByRoom[e], r),
      "K",
      0,
      l,
    ],
    26454,
  );
  var u = e.i(812768);
  function c(e) {
    return (
      (e instanceof u.f && 403 === e.response.status) ||
      (e instanceof u.f && 401 === e.response.status)
    );
  }
  e.s(
    [
      "G",
      0,
      c,
      "w",
      0,
      function (e) {
        return e instanceof Error ? e.message : String(e);
      },
    ],
    419111,
  );
  var m = e.i(54567);
  let g = "get-room-moderators";
  function f(e, r) {
    return !c(r) && e < 3;
  }
  e.s(
    [
      "L",
      0,
      g,
      "G",
      0,
      (e, o) => {
        let d,
          u,
          v,
          y,
          h,
          p = (0, r.c)(15);
        p[0] !== o
          ? ((d = void 0 === o ? {} : o), (p[0] = o), (p[1] = d))
          : (d = p[1]);
        let { enabled: I } = d,
          R = void 0 === I || I,
          { user: M } = (0, n.X)(),
          A = (0, t.useLivechatApiClient)();
        return (
          p[2] !== e ? ((u = [g, e]), (p[2] = e), (p[3] = u)) : (u = p[3]),
          p[4] !== A || p[5] !== e
            ? ((v = async () => {
                if (!e)
                  return (
                    m.logger.debug(
                      "[useGetRoomModerators] Skipping fetch: roomId is missing",
                    ),
                    []
                  );
                m.logger.debug(
                  `[useGetRoomModerators] Fetching room moderators for room: ${e}`,
                );
                try {
                  let r = await A.get(
                    `chat/moderation/rooms/${e}/moderators`,
                  ).json();
                  return (
                    m.logger.debug(
                      `[useGetRoomModerators] Fetched ${r.length} room moderators for room: ${e}`,
                    ),
                    (0, l.getState().setModerators)(e, r.map(i)),
                    r
                  );
                } catch (t) {
                  if (c(t)) return [];
                  let r = t instanceof Error ? t.message : String(t);
                  throw (
                    m.logger.error(
                      `[useGetRoomModerators] Failed to fetch room moderators for room: ${e}`,
                      { error: r },
                    ),
                    t
                  );
                }
              }),
              (p[4] = A),
              (p[5] = e),
              (p[6] = v))
            : (v = p[6]),
          p[7] !== R || p[8] !== e || p[9] !== M
            ? ((y = !!e && (0, a.T)(M) && R),
              (p[7] = R),
              (p[8] = e),
              (p[9] = M),
              (p[10] = y))
            : (y = p[10]),
          p[11] !== u || p[12] !== v || p[13] !== y
            ? ((h = {
                queryKey: u,
                queryFn: v,
                enabled: y,
                staleTime: 6e4,
                refetchOnWindowFocus: !1,
                retry: f,
              }),
              (p[11] = u),
              (p[12] = v),
              (p[13] = y),
              (p[14] = h))
            : (h = p[14]),
          (0, s.useQuery)(h)
        );
      },
    ],
    565813,
  );
};
