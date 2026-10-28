// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["_", () => f, "G", () => v]);
  var r = e.i(732486),
    t = e.i(445242),
    s = e.i(352386),
    n = e.i(565813),
    o = e.i(921753),
    a = e.i(958507),
    i = e.i(132788),
    d = e.i(325320),
    l = e.i(867175),
    u = e.i(86868),
    c = e.i(26454),
    m = e.i(508695);
  let g = (0, s.createContext)(void 0),
    f = (e) => {
      let f,
        v,
        y,
        h,
        p,
        I,
        R,
        M,
        A,
        b = (0, t.c)(39),
        { children: E, isEnabled: S } = e,
        w = void 0 === S || S,
        C = (0, a.f)(),
        { mintId: L } = (0, d.E)(),
        { user: U } = (0, l.X)();
      b[0] !== U ? ((f = (0, m.T)(U)), (b[0] = U), (b[1] = f)) : (f = b[1]);
      let T = f,
        _ = U?.userId,
        k = U?.address,
        B = w && T;
      b[2] !== B ? ((v = { enabled: B }), (b[2] = B), (b[3] = v)) : (v = b[3]);
      let { refetch: P } = (0, i.f)(v),
        x = L ?? "",
        F = w && !!L && T;
      b[4] !== x || b[5] !== F
        ? ((y = { mintId: x, enabled: F }), (b[4] = x), (b[5] = F), (b[6] = y))
        : (y = b[6]);
      let { data: j, refetch: D } = (0, o.d)(y),
        O = void 0 !== j && j,
        Q = w && !!L && T;
      b[7] !== Q ? ((h = { enabled: Q }), (b[7] = Q), (b[8] = h)) : (h = b[8]);
      let { refetch: N } = (0, n.G)(L ?? "", h);
      b[9] !== T || b[10] !== L || b[11] !== k || b[12] !== _
        ? ((p = (e) =>
            !!T && !!L && e.isRoomModerator(L, { userId: _, address: k })),
          (b[9] = T),
          (b[10] = L),
          (b[11] = k),
          (b[12] = _),
          (b[13] = p))
        : (p = b[13]);
      let K = (0, c.K)(p),
        G = !!T && O,
        $ = C || G,
        q = $ || K;
      (b[14] !== w ||
      b[15] !== T ||
      b[16] !== L ||
      b[17] !== P ||
      b[18] !== D ||
      b[19] !== N
        ? ((I = () => {
            if (w) {
              if (!T) {
                (u.U.getState().setModerator(null),
                  L && c.K.getState().clearModerators(L));
                return;
              }
              (P(), L && (D(), N()));
            }
          }),
          (b[14] = w),
          (b[15] = T),
          (b[16] = L),
          (b[17] = P),
          (b[18] = D),
          (b[19] = N),
          (b[20] = I))
        : (I = b[20]),
        b[21] !== w ||
        b[22] !== T ||
        b[23] !== L ||
        b[24] !== P ||
        b[25] !== D ||
        b[26] !== N ||
        b[27] !== k ||
        b[28] !== _
          ? ((R = [w, T, _, k, L, P, D, N]),
            (b[21] = w),
            (b[22] = T),
            (b[23] = L),
            (b[24] = P),
            (b[25] = D),
            (b[26] = N),
            (b[27] = k),
            (b[28] = _),
            (b[29] = R))
          : (R = b[29]),
        (0, s.useEffect)(I, R),
        b[30] !== $ || b[31] !== q || b[32] !== O || b[33] !== C || b[34] !== K
          ? ((M = {
              canModerateRoom: q,
              canManageRoomModerators: $,
              isRoomModerator: K,
              isCreator: O,
              isGlobalModerator: C,
            }),
            (b[30] = $),
            (b[31] = q),
            (b[32] = O),
            (b[33] = C),
            (b[34] = K),
            (b[35] = M))
          : (M = b[35]));
      let W = M;
      return (
        b[36] !== E || b[37] !== W
          ? ((A = (0, r.jsx)(g.Provider, { value: W, children: E })),
            (b[36] = E),
            (b[37] = W),
            (b[38] = A))
          : (A = b[38]),
        A
      );
    },
    v = () => {
      let e = (0, s.useContext)(g);
      if (void 0 === e)
        throw Error(
          "useRoomModerationContext must be used within a RoomModerationProvider",
        );
      return e;
    };
};
