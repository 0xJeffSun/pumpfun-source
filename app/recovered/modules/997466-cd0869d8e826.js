// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(412427),
    i = e.i(845785),
    n = e.i(827935),
    o = e.i(886813),
    l = e.i(77962),
    a = e.i(520),
    s = e.i(352386),
    c = e.i(992034),
    u = e.i(54567);
  let d = e.i(113939).f.init({ appName: i.v.PUMP_WEB });
  function f() {
    try {
      let e = localStorage.getItem("pump_session_data");
      if (e) {
        let t = JSON.parse(e);
        if ("string" == typeof t?.pump_session_id) return t.pump_session_id;
      }
    } catch {}
    return `session-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 11)}`;
  }
  (e.s(["f", 0, d], 832139), e.s(["f", 0, f], 676648));
  let m = () => {
      let e = localStorage.getItem("decoded-jwt");
      if (e)
        try {
          return JSON.parse(e).address || void 0;
        } catch {
          return;
        }
    },
    p = () => {
      try {
        let e = localStorage.getItem("decoded-jwt");
        if (!e) return;
        let t = JSON.parse(e);
        return "string" == typeof t.userId && "" !== t.userId
          ? t.userId
          : void 0;
      } catch {
        return;
      }
    };
  e.s(["Q", 0, p, "e", 0, m], 370245);
  let v = (e) => {
    try {
      a.f.destroyMonitor(e);
    } catch {}
  };
  e.s(
    [
      "f",
      0,
      (e) => {
        let a,
          h,
          g,
          y = (0, t.c)(15),
          {
            videoType: b,
            videoId: x,
            videoTitle: j,
            roomId: w,
            creatorId: S,
            creatorCcUserId: P,
            participantRole: T,
            page: I,
            playerName: C,
            property: E,
          } = e,
          k = void 0 === T ? r.E.PARTICIPANT : T,
          { muxDataEnvKey: R, getSessionId: N } = (0, c.a)(),
          L = (0, s.useRef)(null);
        y[0] !== P ||
        y[1] !== S ||
        y[2] !== N ||
        y[3] !== R ||
        y[4] !== I ||
        y[5] !== k ||
        y[6] !== C ||
        y[7] !== E ||
        y[8] !== w ||
        y[9] !== x ||
        y[10] !== j ||
        y[11] !== b
          ? ((a = (e, t) => {
              if (
                (L.current && (v(L.current), (L.current = null)),
                (0, l.UF)(e) || (0, l.G4)(e))
              ) {
                R && !d.hasEnvKey() && d.setEnvKey(R);
                let t = e.video;
                L.current = t;
                let l = m() ?? r.J.ANONYMOUS,
                  s = N?.() ?? f();
                var a = {
                  debug: !1,
                  data: d.build(b, i.J.VIDSTACK, {
                    deviceId: (0, o.$)() ?? "",
                    envKey: R,
                    videoId: x,
                    videoTitle: j,
                    mintId: w,
                    creatorId: S,
                    creatorCcUserId: P,
                    viewerId: l,
                    viewerCcUserId: p(),
                    sessionId: s,
                    participantRole: k,
                    page: I,
                    playerName: C,
                    experimentName: null,
                    property: E,
                  }),
                };
                try {
                  n.F.monitor(t, a);
                } catch (e) {
                  u.logger.warn(
                    "[MuxAnalytics] Mux monitor failed (analytics blocked?)",
                    { error: e instanceof Error ? e.message : String(e) },
                  );
                }
              }
            }),
            (y[0] = P),
            (y[1] = S),
            (y[2] = N),
            (y[3] = R),
            (y[4] = I),
            (y[5] = k),
            (y[6] = C),
            (y[7] = E),
            (y[8] = w),
            (y[9] = x),
            (y[10] = j),
            (y[11] = b),
            (y[12] = a))
          : (a = y[12]);
        let _ = a;
        return (
          y[13] === Symbol.for("react.memo_cache_sentinel")
            ? ((h = () => () => {
                L.current &&
                  (u.logger.debug("[VodPlayer] Cleaning up Mux tracking"),
                  v(L.current),
                  (L.current = null));
              }),
              (g = []),
              (y[13] = h),
              (y[14] = g))
            : ((h = y[13]), (g = y[14])),
          (0, s.useEffect)(h, g),
          _
        );
      },
    ],
    997466,
  );
};
