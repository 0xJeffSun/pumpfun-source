// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.s(
    ["D", () => w, "I", () => A, "y", () => N, "K", () => R, "f", () => S],
    188014,
  ),
    e.s(["k", () => y, "W", () => v], 882234),
    e.s(["e", () => T, "a", () => k], 692948),
    e.s(["K", () => _, "s", () => E], 339269));
  var n = e.i(732486),
    t = e.i(445242),
    a = e.i(198584),
    r = e.i(264458),
    i = e.i(484169),
    o = e.i(352386),
    s = e.i(167949),
    l = e.i(480085),
    c = e.i(166037),
    u = e.i(325320),
    d = e.i(414948),
    m = e.i(89085),
    p = e.i(852687),
    f = e.i(93336),
    h = e.i(408848),
    g = e.i(249437),
    g = g;
  let k = () => {
      let e,
        n = (0, t.c)(4),
        { token: a } = (0, u.E)(),
        r = (0, g.A)(),
        i = a?.role === m.A.HOST,
        o = !i && r?.canPublish,
        s = !i && !o;
      return (
        n[0] !== o || n[1] !== i || n[2] !== s
          ? ((e = { isHost: i, isCoHost: o, isViewer: s }),
            (n[0] = o),
            (n[1] = i),
            (n[2] = s),
            (n[3] = e))
          : (e = n[3]),
        e
      );
    },
    T = (e) => {
      let n = S(e);
      return n?.role || m.A.VIEWER;
    },
    v = () => {
      let e,
        n = (0, t.c)(4),
        { isHost: a, isCoHost: r } = k(),
        { localParticipant: i } = (0, f.f)(),
        o = i.identity;
      return (
        n[0] !== o || n[1] !== r || n[2] !== a
          ? ((e = a || r || (0, h.B)(o)),
            (n[0] = o),
            (n[1] = r),
            (n[2] = a),
            (n[3] = e))
          : (e = n[3]),
        e
      );
    },
    y = (e) => {
      let n = S(e);
      return (
        n?.role === m.A.HOST || n?.role === m.A.CO_HOST || (0, h.B)(e.identity)
      );
    };
  var b = e.i(396693);
  let E = () => {
      let e,
        n = (0, t.c)(2),
        { localParticipant: a } = (0, f.f)();
      return (
        n[0] !== a ? ((e = _(a)), (n[0] = a), (n[1] = e)) : (e = n[1]),
        e
      );
    },
    _ = (e) => {
      let n = S(e),
        t = !!n?.invited_to_stage,
        a = !!n?.screen_share_request_timestamp,
        r = !!n?.hand_raised,
        i = n?.role || m.A.VIEWER,
        o = n?.username;
      return {
        isScreenShareRequested: a,
        isHandRaised: r,
        isInvited: t,
        role: i,
        avatarUrl: n?.avatar_image || b.f,
        username: o,
      };
    },
    S = (e) => {
      try {
        if (!e?.metadata) return null;
        let n = JSON.parse(e.metadata);
        return { ...n, avatar_image: n.avatar_image || b.f };
      } catch {
        return null;
      }
    },
    w = ({ participant: e, localParticipant: n }) => {
      let {
          isHandRaised: t,
          isScreenShareRequested: a,
          isInvited: r,
          username: i,
        } = _(e),
        o = !!n && e?.identity === n?.identity;
      return {
        identity: e.identity,
        displayName: N(e),
        participant: e,
        isCurrentUser: o,
        isHandRaised: t,
        isScreenShareRequested: a,
        isInvited: r,
        isLoggedIn: y(e),
        role: T(e),
        username: i,
        avatarUrl: _(e).avatarUrl,
      };
    },
    I = (e) =>
      (0, h.A)(e?.identity).wallet ??
      (e ? S(e) : null)?.wallet_address ??
      void 0,
    A = (e) => {
      if (!e) return;
      let n = I(e);
      if (n) return n;
      let t = (0, h.A)(e?.identity).userId ?? (e ? S(e) : null)?.gid ?? void 0;
      return (
        t || ("unknown" === (0, h.A)(e.identity).form ? e.identity : void 0)
      );
    },
    N = (e, n) => {
      let t,
        a = S(e),
        r = (
          I(e) ??
          ("unknown" === (0, h.A)(e.identity).form ? e.identity : void 0)
        )?.slice(0, 6);
      return (
        (t =
          e.kind === p.w.AGENT
            ? e.identity.slice(e.identity.length - 6, e.identity.length)
            : e.kind === p.w.INGRESS
              ? a?.username || r || "Unknown"
              : e.name || a?.username || r || "Unknown"),
        n ? `${t} (screensharing)` : t
      );
    },
    R = (e) => !!e?.publication?.track && !e.publication.track.isMuted;
  function P(e) {
    if (
      e.source === i.Track.Source.ScreenShare ||
      (e.participant.kind === i.ParticipantKind.INGRESS &&
        e.source === i.Track.Source.Camera)
    )
      return 2;
    let n = S(e.participant);
    return +(n?.role === m.A.HOST);
  }
  function O() {
    return "";
  }
  function x(e) {
    return 0 === e ? "col-span-2 row-span-2" : "";
  }
  function C(e) {
    return 0 === e ? "col-span-2 row-span-2" : "";
  }
  function M(e) {
    return 0 === e ? "col-span-2 row-span-2" : "";
  }
  function D(e) {
    return 0 === e ? "col-span-2 row-span-2" : "";
  }
  let L = (e) => {
    let a,
      i,
      o,
      s,
      l = (0, t.c)(14),
      { tracks: c, VideoTile: u } = e;
    l[0] !== c ? ((a = { tracks: c }), (l[0] = c), (l[1] = a)) : (a = l[1]);
    let {
      gridLayoutClasses: d,
      trackClassFn: m,
      sortedTracks: p,
    } = ((e) => {
      let n,
        a,
        r,
        i,
        o = (0, t.c)(12),
        { tracks: s } = e,
        l = s.length;
      if (o[0] !== s) {
        let e;
        (o[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (e, n) => P(n) - P(e)), (o[2] = e))
          : (e = o[2]),
          (n = [...s].sort(e)),
          (o[0] = s),
          (o[1] = n));
      } else n = o[1];
      let c = n,
        u = O;
      if (1 === l) a = "grid-cols-1 grid-rows-1";
      else if (2 === l) a = "grid-cols-2 grid-rows-1";
      else if (3 === l) ((a = "grid-cols-3 grid-rows-2"), (u = x));
      else if (4 === l) a = "grid-cols-2 grid-rows-2";
      else if (5 === l) ((a = "grid-cols-4 grid-rows-2"), (u = C));
      else if (6 === l) a = "grid-cols-3 grid-rows-2";
      else if (7 === l) ((a = "grid-cols-4 grid-rows-3"), (u = M));
      else if (8 === l) ((a = "grid-cols-4 grid-rows-3"), (u = D));
      else if (9 === l) a = "grid-cols-3 grid-rows-3";
      else if (l > 9) {
        let e;
        o[3] !== l ? ((e = Math.sqrt(l)), (o[3] = l), (o[4] = e)) : (e = o[4]);
        let n = Math.min(4, Math.ceil(e));
        ((a = `grid-cols-${n}`),
          4 === n && l > 9 && l <= 12
            ? (a = "grid-cols-4 grid-rows-3")
            : 4 === n && l > 12 && l <= 16 && (a = "grid-cols-4 grid-rows-4"));
      } else a = "grid-cols-1 grid-rows-1";
      o[5] !== a || o[6] !== u
        ? ((r = { classes: a, trackClassFn: u }),
          (o[5] = a),
          (o[6] = u),
          (o[7] = r))
        : (r = o[7]);
      let d = r;
      return (
        o[8] !== d.classes || o[9] !== d.trackClassFn || o[10] !== c
          ? ((i = {
              sortedTracks: c,
              gridLayoutClasses: d.classes,
              trackClassFn: d.trackClassFn,
            }),
            (o[8] = d.classes),
            (o[9] = d.trackClassFn),
            (o[10] = c),
            (o[11] = i))
          : (i = o[11]),
        i
      );
    })(a);
    if (0 === p.length) return null;
    if (
      (l[2] !== d
        ? ((i = (0, r.default)(
            "grid h-full w-full overflow-hidden",
            "gap-1",
            d,
          )),
          (l[2] = d),
          (l[3] = i))
        : (i = l[3]),
      l[4] !== u || l[5] !== p || l[6] !== m)
    ) {
      let e;
      (l[8] !== u || l[9] !== m
        ? ((e = (e, t) =>
            (0, n.jsx)(
              "div",
              {
                className: (0, r.default)(
                  "flex h-full w-full items-center justify-center",
                  m(t),
                ),
                children: (0, n.jsx)(u, {
                  participant: e.participant,
                  trackRef: e,
                  showGradient: !1,
                  isOnMainVideoView: !0,
                  className: "h-full w-full",
                }),
              },
              e.publication?.trackSid ??
                `${e.participant.identity}-${e.source}`,
            )),
          (l[8] = u),
          (l[9] = m),
          (l[10] = e))
        : (e = l[10]),
        (o = p.map(e)),
        (l[4] = u),
        (l[5] = p),
        (l[6] = m),
        (l[7] = o));
    } else o = l[7];
    return (
      l[11] !== i || l[12] !== o
        ? ((s = (0, n.jsx)("div", { className: i, children: o })),
          (l[11] = i),
          (l[12] = o),
          (l[13] = s))
        : (s = l[13]),
      s
    );
  };
  var U = g;
  e.s(["f", () => U.H], 814048);
  var U = g,
    F = e.i(705313),
    j = e.i(412826),
    V = e.i(897665),
    H = g;
  let B = () => {
    let e,
      n = (0, t.c)(1);
    return (
      n[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = { kind: p.w.INGRESS }), (n[0] = e))
        : (e = n[0]),
      !!(0, H.L)(e)
    );
  };
  e.s(["f", 0, B], 403692);
  var $ = g;
  let G = ({ includeLocalParticipant: e = !0 } = {}) => {
    let n = (0, $.K)(),
      { localParticipant: t } = (0, f.f)();
    return (0, o.useMemo)(() => {
      let a,
        r,
        i = [],
        o = [],
        s = [];
      return (
        n.forEach((n) => {
          if (!e && n.identity === t?.identity) return;
          let l = w({ participant: n, localParticipant: t });
          if (n.kind === p.w.AGENT) return void s.push(l);
          if (n.kind === p.w.INGRESS) {
            r = l;
            return;
          }
          switch (l.role) {
            case m.A.HOST:
              a = l;
              break;
            case m.A.CO_HOST:
              i.push(l);
              break;
            case m.A.VIEWER:
            default:
              o.push(l);
          }
        }),
        i.sort((e, n) =>
          e.participant.identity.localeCompare(n.participant.identity),
        ),
        o.sort((e, n) => {
          let t = e.isHandRaised ?? !1;
          return t !== (n.isHandRaised ?? !1)
            ? t
              ? -1
              : 1
            : e.participant.identity.localeCompare(n.participant.identity);
        }),
        { host: a, ingress: r, coHosts: i, viewers: o, aiModerators: s }
      );
    }, [n, t, e]);
  };
  e.s(["f", 0, G], 210496);
  let W = (e) => {
      let a,
        i,
        o,
        s,
        l = (0, t.c)(14),
        { isActive: c, src: u, alt: d, size: m, address: p } = e,
        f = m > 42 ? "big" : "small",
        h = c ? "border-livestream-green/70" : "border-transparent";
      return (
        l[0] !== h
          ? ((a = (0, r.default)(
              "w-fit rounded-full border-4 p-1 transition-colors duration-300 ease-in-out",
              h,
            )),
            (l[0] = h),
            (l[1] = a))
          : (a = l[1]),
        l[2] !== m
          ? ((i = { width: m, height: m }), (l[2] = m), (l[3] = i))
          : (i = l[3]),
        l[4] !== p || l[5] !== d || l[6] !== m || l[7] !== u || l[8] !== i
          ? ((o = (0, n.jsx)(F.f, {
              src: u,
              address: p,
              ipfsPrefix: V.f,
              alt: d,
              height: m,
              width: m,
              style: i,
              isAnonymous: !1,
              className:
                "aspect-square border border-livestream-muted/30 bg-black",
            })),
            (l[4] = p),
            (l[5] = d),
            (l[6] = m),
            (l[7] = u),
            (l[8] = i),
            (l[9] = o))
          : (o = l[9]),
        l[10] !== f || l[11] !== a || l[12] !== o
          ? ((s = (0, n.jsx)("div", {
              "data-avatar-ring": !0,
              "data-avatar-size": f,
              className: a,
              children: o,
            })),
            (l[10] = f),
            (l[11] = a),
            (l[12] = o),
            (l[13] = s))
          : (s = l[13]),
        s
      );
    },
    J = (e) => {
      let a,
        r,
        i = (0, t.c)(8),
        { participant: o, size: s, showSpeakingIndicator: l } = e,
        c = "big" === s ? 70 : 42,
        u = S(o)?.avatar_image,
        d = (0, U.H)(o);
      i[0] !== o ? ((a = A(o)), (i[0] = o), (i[1] = a)) : (a = i[1]);
      let m = a,
        p = !!(l && d),
        f = o?.identity || "Participant";
      return (
        i[2] !== m || i[3] !== u || i[4] !== c || i[5] !== p || i[6] !== f
          ? ((r = (0, n.jsx)(W, {
              isActive: p,
              src: u,
              alt: f,
              size: c,
              address: m,
            })),
            (i[2] = m),
            (i[3] = u),
            (i[4] = c),
            (i[5] = p),
            (i[6] = f),
            (i[7] = r))
          : (r = i[7]),
        r
      );
    },
    z = (e) => {
      let a,
        i,
        s,
        l,
        c,
        u = (0, t.c)(13),
        {
          className: d,
          participant: m,
          size: p,
          showSpeakingIndicator: f,
          isConnectingToRoom: h,
          initialHasStarted: g,
        } = e,
        k = void 0 === p ? "small" : p,
        T = void 0 === f || f,
        { host: v, coHosts: y } = G(),
        E = B(),
        [_, S] = (0, o.useState)(void 0 !== g && g),
        w = !!(v || E || y.length > 0);
      (u[0] !== w
        ? ((a = () => {
            w && S(!0);
          }),
          (i = [w]),
          (u[0] = w),
          (u[1] = a),
          (u[2] = i))
        : ((a = u[1]), (i = u[2])),
        (0, o.useEffect)(a, i));
      let I =
        void 0 !== h && h
          ? "Connecting to stream"
          : w
            ? void 0
            : _
              ? "The stream will be back shortly"
              : "The stream is starting";
      u[3] !== m || u[4] !== I || u[5] !== T || u[6] !== k
        ? ((s = I
            ? (0, n.jsxs)("div", {
                "data-reconnecting": !0,
                className: "flex flex-col items-center justify-center gap-6",
                children: [
                  (0, n.jsx)(j.f, {}),
                  (0, n.jsx)("p", { children: I }),
                ],
              })
            : m
              ? (0, n.jsx)(J, {
                  participant: m,
                  size: k,
                  showSpeakingIndicator: T,
                })
              : (0, n.jsx)(W, {
                  isActive: !1,
                  src: b.f,
                  alt: "Participant",
                  size: "big" === k ? 70 : 42,
                })),
          (u[3] = m),
          (u[4] = I),
          (u[5] = T),
          (u[6] = k),
          (u[7] = s))
        : (s = u[7]);
      let A = s;
      return (
        u[8] !== d
          ? ((l = (0, r.default)(
              d,
              "flex h-full w-full items-center justify-center bg-livestream-dark-gray text-white",
            )),
            (u[8] = d),
            (u[9] = l))
          : (l = u[9]),
        u[10] !== A || u[11] !== l
          ? ((c = (0, n.jsx)("div", {
              "data-video-placeholder": !0,
              className: l,
              children: A,
            })),
            (u[10] = A),
            (u[11] = l),
            (u[12] = c))
          : (c = u[12]),
        c
      );
    };
  (e.s(["f", 0, z], 952080),
    e.s(
      [
        "f",
        0,
        (e) => {
          let m,
            p,
            f,
            h,
            g,
            k,
            T = (0, t.c)(26),
            {
              mainTracks: v,
              overlayTrack: y,
              onConnectionStateChange: b,
              loaderType: E,
              onMouseEnter: _,
              onMouseLeave: S,
              VideoTile: w,
              cameraOverlayClassName: I,
              children: A,
              initialHasStarted: N,
            } = e,
            R = (0, a.f)(),
            { isMobile: P } = (0, u.E)(),
            { fullScreen: O } = (0, d.w)(),
            x = !O && !P,
            C = v[0] ?? null;
          (T[0] !== b || T[1] !== R.state
            ? ((m = () => {
                b?.(R.state ?? i.ConnectionState.Disconnected);
              }),
              (p = [R.state, b]),
              (T[0] = b),
              (T[1] = R.state),
              (T[2] = m),
              (T[3] = p))
            : ((m = T[2]), (p = T[3])),
            (0, o.useEffect)(m, p));
          let M = v.length > 1 ? "bg-black p-1" : "bg-livestream-dark-gray",
            D = x && "rounded-[8px]";
          return (
            T[4] !== M || T[5] !== D
              ? ((f = (0, r.default)(
                  "group/main relative flex aspect-video w-full justify-center @container",
                  M,
                  D,
                )),
                (T[4] = M),
                (T[5] = D),
                (T[6] = f))
              : (f = T[6]),
            T[7] !== w ||
            T[8] !== N ||
            T[9] !== E ||
            T[10] !== v ||
            T[11] !== C ||
            T[12] !== R.state
              ? ((h =
                  0 === v.length
                    ? "progress-bar" === E
                      ? (0, n.jsx)(l.f, { loaderType: E })
                      : (0, n.jsx)(z, {
                          size: "big",
                          participant: void 0,
                          isConnectingToRoom:
                            R.state === i.ConnectionState.Connecting ||
                            R.state === i.ConnectionState.Reconnecting,
                          initialHasStarted: N,
                        })
                    : 1 === v.length && C
                      ? (0, n.jsx)(w, {
                          participant: C.participant,
                          trackRef: C,
                          showGradient: !1,
                          className: (0, r.default)("h-full w-full"),
                          isOnMainVideoView: !0,
                        })
                      : v.length > 1
                        ? (0, n.jsx)(L, { tracks: v, VideoTile: w })
                        : null),
                (T[7] = w),
                (T[8] = N),
                (T[9] = E),
                (T[10] = v),
                (T[11] = C),
                (T[12] = R.state),
                (T[13] = h))
              : (h = T[13]),
            T[14] !== w || T[15] !== I || T[16] !== O || T[17] !== y
              ? ((g =
                  y &&
                  (0, n.jsx)("div", {
                    "data-pip-overlay": !0,
                    className: (0, r.default)(
                      "absolute left-3",
                      "aspect-video h-20 w-auto sm:h-24",
                      "overflow-hidden rounded",
                      O ? "bottom-12 sm:bottom-16" : "bottom-3",
                      I,
                    ),
                    style: { zIndex: c.f.MainVideoView.screenshareVideoTile },
                    children: (0, n.jsx)(w, {
                      participant: y.participant,
                      trackRef: y,
                      showGradient: !0,
                      className: "h-full w-full",
                    }),
                  })),
                (T[14] = w),
                (T[15] = I),
                (T[16] = O),
                (T[17] = y),
                (T[18] = g))
              : (g = T[18]),
            T[19] !== A ||
            T[20] !== _ ||
            T[21] !== S ||
            T[22] !== f ||
            T[23] !== h ||
            T[24] !== g
              ? ((k = (0, n.jsxs)(s.f, {
                  "data-testid": "main-video-view",
                  className: f,
                  onMouseEnter: _,
                  onMouseLeave: S,
                  children: [h, g, A],
                })),
                (T[19] = A),
                (T[20] = _),
                (T[21] = S),
                (T[22] = f),
                (T[23] = h),
                (T[24] = g),
                (T[25] = k))
              : (k = T[25]),
            k
          );
        },
      ],
      725940,
    ));
};
