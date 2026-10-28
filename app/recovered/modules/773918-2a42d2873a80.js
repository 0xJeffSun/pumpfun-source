// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(426091),
    n = e.i(352386),
    o = e.i(845785),
    l = e.i(759818),
    a = e.i(381577),
    s = e.i(484169),
    c = e.i(202541),
    u = e.i(23284),
    d = e.i(275762),
    f = e.i(325320),
    m = e.i(898660),
    p = e.i(54567),
    v = e.i(702164),
    h = e.i(264458),
    g = e.i(302636),
    y = e.i(992034),
    b = e.i(414948),
    x = e.i(326964),
    j = e.i(851746),
    w = e.i(725940),
    S = e.i(273094),
    P = e.i(812176),
    T = e.i(524102);
  let I = (e) => {
      let i,
        o,
        l,
        a,
        s,
        c = (0, r.c)(13),
        { muted: u, onConnectionStateChange: d, loaderType: f } = e,
        { mainTracks: m, overlayTrack: p } = (0, T.f)(),
        { setQuality: v } = (0, P.f)();
      return (
        c[0] !== v
          ? ((i = () => {
              v(j.f.LOW);
            }),
            (o = [v]),
            (c[0] = v),
            (c[1] = i),
            (c[2] = o))
          : ((i = c[1]), (o = c[2])),
        (0, n.useEffect)(i, o),
        c[3] !== u
          ? ((l = (0, t.jsx)(x.f, { muted: u })), (c[3] = u), (c[4] = l))
          : (l = c[4]),
        c[5] !== f || c[6] !== m || c[7] !== d || c[8] !== p
          ? ((a = (0, t.jsx)(w.f, {
              mainTracks: m,
              overlayTrack: p,
              onConnectionStateChange: d,
              loaderType: f,
              VideoTile: S.f,
            })),
            (c[5] = f),
            (c[6] = m),
            (c[7] = d),
            (c[8] = p),
            (c[9] = a))
          : (a = c[9]),
        c[10] !== l || c[11] !== a
          ? ((s = (0, t.jsxs)(t.Fragment, { children: [l, a] })),
            (c[10] = l),
            (c[11] = a),
            (c[12] = s))
          : (s = c[12]),
        s
      );
    },
    C = (e) => {
      let i,
        n,
        o,
        l = (0, r.c)(15),
        {
          tokenValue: a,
          isMobile: s,
          roomRef: c,
          muted: u,
          onConnectionStateChange: d,
          className: f,
          connect: m,
          loaderType: p,
          onError: x,
        } = e,
        j = void 0 === m || m,
        { livekitUrl: w } = (0, y.a)(),
        S = !s && "group";
      return (
        l[0] !== f || l[1] !== S
          ? ((i = (0, h.default)(["flex h-full w-full items-center", S, f])),
            (l[0] = f),
            (l[1] = S),
            (l[2] = i))
          : (i = l[2]),
        l[3] !== p || l[4] !== u || l[5] !== d
          ? ((n = (0, t.jsx)(g.K, {
              children: (0, t.jsx)(b.r, {
                children: (0, t.jsx)(I, {
                  muted: u,
                  onConnectionStateChange: d,
                  loaderType: p,
                }),
              }),
            })),
            (l[3] = p),
            (l[4] = u),
            (l[5] = d),
            (l[6] = n))
          : (n = l[6]),
        l[7] !== j ||
        l[8] !== w ||
        l[9] !== x ||
        l[10] !== c ||
        l[11] !== i ||
        l[12] !== n ||
        l[13] !== a
          ? ((o = (0, t.jsx)(v.f, {
              ref: c,
              token: a,
              video: !1,
              audio: !1,
              serverUrl: w,
              className: i,
              connect: j,
              onError: x,
              children: n,
            })),
            (l[7] = j),
            (l[8] = w),
            (l[9] = x),
            (l[10] = c),
            (l[11] = i),
            (l[12] = n),
            (l[13] = a),
            (l[14] = o))
          : (o = l[14]),
        o
      );
    },
    E = (e) => {
      let i,
        n = (0, r.c)(38),
        {
          autoJoinEnabled: v,
          initialToken: h,
          token: g,
          isMobile: y,
          roomRef: b,
          muted: x,
          onConnectionStateChange: j,
          className: w,
          playlistUrl: S,
          playlistEndedAt: P,
          onIsReady: T,
          connect: I,
          isLoading: E,
          loaderType: k,
          roomId: R,
          videoId: N,
          creator: L,
          onAutoPlayFail: _,
          isLive: A,
          preferLowRate: M,
        } = e,
        V = void 0 === I || I,
        O = void 0 !== M && M,
        { mintId: D, setToken: z } = (0, f.E)(),
        F = (0, d.X)(D),
        K = A && (v || h),
        $ = g?.token,
        U = (0, a.useLaunchDarklyKillSwitch)(
          l.f.LIVESTREAM_HLS_PLAYBACK_KILLSWITCH,
        );
      n[0] !== U ||
      n[1] !== A ||
      n[2] !== D ||
      n[3] !== P ||
      n[4] !== S ||
      n[5] !== O
        ? ((i = {
            roomId: D,
            isForceLiveKit: U,
            playlistUrl: S,
            playlistEndedAt: P,
            isLive: A,
            preferLowRate: O,
          }),
          (n[0] = U),
          (n[1] = A),
          (n[2] = D),
          (n[3] = P),
          (n[4] = S),
          (n[5] = O),
          (n[6] = i))
        : (i = n[6]);
      let {
        isLiveKit: H,
        onProviderSetup: Z,
        onEnded: B,
        isPlaylistLoading: J,
        playlistUrl: W,
      } = (0, c.f)(i);
      if (!H) {
        let e,
          r = W ?? void 0,
          i = (void 0 !== E && E) || J,
          l = F?.title ?? "",
          a = L ?? "",
          s = !1 === A ? 1 : void 0;
        return (
          n[7] !== w ||
          n[8] !== k ||
          n[9] !== x ||
          n[10] !== _ ||
          n[11] !== B ||
          n[12] !== T ||
          n[13] !== Z ||
          n[14] !== R ||
          n[15] !== r ||
          n[16] !== i ||
          n[17] !== l ||
          n[18] !== a ||
          n[19] !== s ||
          n[20] !== N
            ? ((e = (0, t.jsx)(u.f, {
                src: r,
                muted: x,
                playsInline: !0,
                className: w,
                onLoadedData: T,
                isLoading: i,
                videoId: N,
                roomId: R,
                loaderType: k,
                onProviderSetup: Z,
                onEnded: B,
                videoTitle: l,
                creatorId: a,
                page: o.j.WEB_LIVESTREAM_COIN_DETAILS,
                onAutoPlayFail: _,
                initialTime: s,
              })),
              (n[7] = w),
              (n[8] = k),
              (n[9] = x),
              (n[10] = _),
              (n[11] = B),
              (n[12] = T),
              (n[13] = Z),
              (n[14] = R),
              (n[15] = r),
              (n[16] = i),
              (n[17] = l),
              (n[18] = a),
              (n[19] = s),
              (n[20] = N),
              (n[21] = e))
            : (e = n[21]),
          e
        );
      }
      if (K && $) {
        let e, r, i;
        return (
          n[22] !== j || n[23] !== T
            ? ((e = (e) => {
                (j?.(e), e === s.ConnectionState.Connected && T?.());
              }),
              (n[22] = j),
              (n[23] = T),
              (n[24] = e))
            : (e = n[24]),
          n[25] !== D || n[26] !== z
            ? ((r = (e) => {
                (0, m.f)(e) &&
                  (p.logger.warn(
                    "[LivestreamPreviewPlayerContent] Connect rejected with stale token (401 NotAllowed) - clearing token to re-acquire.",
                    { mintId: D, errorMessage: e.message },
                  ),
                  z(null));
              }),
              (n[25] = D),
              (n[26] = z),
              (n[27] = r))
            : (r = n[27]),
          n[28] !== w ||
          n[29] !== V ||
          n[30] !== y ||
          n[31] !== k ||
          n[32] !== x ||
          n[33] !== b ||
          n[34] !== e ||
          n[35] !== r ||
          n[36] !== g.token
            ? ((i = (0, t.jsx)(C, {
                tokenValue: g.token,
                isMobile: y,
                roomRef: b,
                muted: x,
                onConnectionStateChange: e,
                className: w,
                connect: V,
                loaderType: k,
                onError: r,
              })),
              (n[28] = w),
              (n[29] = V),
              (n[30] = y),
              (n[31] = k),
              (n[32] = x),
              (n[33] = b),
              (n[34] = e),
              (n[35] = r),
              (n[36] = g.token),
              (n[37] = i))
            : (i = n[37]),
          i
        );
      }
      return null;
    };
  var k = e.i(162786),
    R = e.i(374930),
    N = e.i(692433),
    L = e.i(676873);
  e.s(
    [
      "LivestreamPreviewPlayer",
      0,
      (e) => {
        let o,
          l,
          a,
          s,
          c,
          u,
          m,
          v,
          h,
          g,
          y,
          b,
          x,
          j = (0, r.c)(61),
          {
            playOnHover: w,
            muted: S,
            playWhenVisible: P,
            onConnectionStateChange: T,
            className: I,
            containerClassName: C,
            initialToken: _,
            playlistUrl: A,
            playlistEndedAt: M,
            onIsReady: V,
            connect: O,
            isLoading: D,
            loaderType: z,
            onAutoPlayFail: F,
            creator: K,
            isLive: $,
            preferLowRate: U,
          } = e,
          H = void 0 !== w && w,
          Z = void 0 === S || S,
          B = void 0 === O || O,
          J = void 0 !== D && D,
          W = void 0 !== U && U,
          {
            token: G,
            setToken: Q,
            isMobile: q,
            roomRef: X,
            mintId: Y,
          } = (0, f.E)(),
          ee = (0, d.X)(Y);
        j[0] !== ee?.id
          ? ((o = ee?.id.toString()), (j[0] = ee?.id), (j[1] = o))
          : (o = j[1]);
        let et = o;
        if (!et && A)
          try {
            let e;
            j[2] !== A
              ? ((e = (0, L.f)(A)), (j[2] = A), (j[3] = e))
              : (e = j[3]);
            let { livestreamId: t } = e;
            et = t;
          } catch {
            et = void 0;
          }
        let { value: er, setTrue: ei, setFalse: en } = (0, k.f)(!1),
          eo = (0, n.useRef)(null);
        j[4] === Symbol.for("react.memo_cache_sentinel")
          ? ((l = { threshold: 0.5, rootMargin: "100% 0px 100% 0px" }),
            (j[4] = l))
          : (l = j[4]);
        let el = (0, R.f)(eo, l),
          ea = (!(void 0 === P || P) || el) && (!H || er),
          es = !!($ && ea && !A && !_);
        (j[5] !== Q
          ? ((a = (e) => {
              Q(e);
            }),
            (j[5] = Q),
            (j[6] = a))
          : (a = j[6]),
          j[7] !== es || j[8] !== Y || j[9] !== a
            ? ((s = {
                mintId: Y,
                onSuccess: a,
                viewer: !0,
                hidden: !0,
                enabled: es,
              }),
              (j[7] = es),
              (j[8] = Y),
              (j[9] = a),
              (j[10] = s))
            : (s = j[10]),
          (0, N.f)(s),
          j[11] !== _ || j[12] !== Q
            ? ((c = () => {
                _ && Q(_);
              }),
              (u = [_, Q]),
              (j[11] = _),
              (j[12] = Q),
              (j[13] = c),
              (j[14] = u))
            : ((c = j[13]), (u = j[14])),
          (0, n.useEffect)(c, u),
          j[15] !== es ||
          j[16] !== _ ||
          j[17] !== Y ||
          j[18] !== Q ||
          j[19] !== G?.token
            ? ((m = () => {
                !es &&
                  !_ &&
                  G?.token &&
                  (p.logger.info(
                    "[LivestreamPreviewPlayer] Auto-join no longer active with an existing token, clearing token.",
                    {
                      mintId: Y,
                      autoJoinStreamEnabled: es,
                      hasToken: !!G?.token,
                    },
                  ),
                  Q(null));
              }),
              (j[15] = es),
              (j[16] = _),
              (j[17] = Y),
              (j[18] = Q),
              (j[19] = G?.token),
              (j[20] = m))
            : (m = j[20]),
          j[21] !== es ||
          j[22] !== _ ||
          j[23] !== Y ||
          j[24] !== Q ||
          j[25] !== G
            ? ((v = [es, _, G, Q, Y]),
              (j[21] = es),
              (j[22] = _),
              (j[23] = Y),
              (j[24] = Q),
              (j[25] = G),
              (j[26] = v))
            : (v = j[26]),
          (0, n.useEffect)(m, v),
          j[27] !== H || j[28] !== ei
            ? ((h = () => {
                H && ei();
              }),
              (j[27] = H),
              (j[28] = ei),
              (j[29] = h))
            : (h = j[29]));
        let ec = h;
        j[30] !== H || j[31] !== en
          ? ((g = () => {
              H && en();
            }),
            (j[30] = H),
            (j[31] = en),
            (j[32] = g))
          : (g = j[32]);
        let eu = g;
        j[33] !== C
          ? ((y = (0, i.c)("relative h-full w-full", C)),
            (j[33] = C),
            (j[34] = y))
          : (y = j[34]);
        let ed = et ?? "N/A";
        return (
          j[35] !== es ||
          j[36] !== I ||
          j[37] !== B ||
          j[38] !== K ||
          j[39] !== _ ||
          j[40] !== $ ||
          j[41] !== J ||
          j[42] !== q ||
          j[43] !== z ||
          j[44] !== Y ||
          j[45] !== Z ||
          j[46] !== F ||
          j[47] !== T ||
          j[48] !== V ||
          j[49] !== M ||
          j[50] !== A ||
          j[51] !== W ||
          j[52] !== X ||
          j[53] !== ed ||
          j[54] !== G
            ? ((b = (0, t.jsx)(E, {
                autoJoinEnabled: es,
                initialToken: _,
                token: G,
                isMobile: q,
                roomRef: X,
                muted: Z,
                onConnectionStateChange: T,
                className: I,
                playlistUrl: A,
                playlistEndedAt: M,
                onIsReady: V,
                connect: B,
                isLoading: J,
                loaderType: z,
                roomId: Y,
                videoId: ed,
                onAutoPlayFail: F,
                creator: K,
                isLive: $,
                preferLowRate: W,
              })),
              (j[35] = es),
              (j[36] = I),
              (j[37] = B),
              (j[38] = K),
              (j[39] = _),
              (j[40] = $),
              (j[41] = J),
              (j[42] = q),
              (j[43] = z),
              (j[44] = Y),
              (j[45] = Z),
              (j[46] = F),
              (j[47] = T),
              (j[48] = V),
              (j[49] = M),
              (j[50] = A),
              (j[51] = W),
              (j[52] = X),
              (j[53] = ed),
              (j[54] = G),
              (j[55] = b))
            : (b = j[55]),
          j[56] !== ec || j[57] !== eu || j[58] !== y || j[59] !== b
            ? ((x = (0, t.jsx)("div", {
                ref: eo,
                onMouseEnter: ec,
                onMouseLeave: eu,
                className: y,
                children: b,
              })),
              (j[56] = ec),
              (j[57] = eu),
              (j[58] = y),
              (j[59] = b),
              (j[60] = x))
            : (x = j[60]),
          x
        );
      },
    ],
    773918,
  );
};
