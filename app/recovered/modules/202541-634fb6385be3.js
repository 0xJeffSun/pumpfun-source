// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(352386),
    t = e.i(445242),
    a = e.i(77962),
    r = e.i(54567),
    i = e.i(558898),
    o = e.i(622493);
  let s = (e, n) =>
      e?.playlistUrl ?? e?.playlistUrlHigh ?? e?.playlistUrlLow ?? n ?? null,
    l = async (e) => {
      try {
        let n = await fetch(e, { method: "HEAD", cache: "no-store" });
        if (!n.ok) return null;
        let t = n.headers.get("etag");
        return t?.trim() || null;
      } catch {
        return null;
      }
    };
  e.s(
    [
      "f",
      0,
      ({
        roomId: e,
        isForceLiveKit: c,
        playlistUrl: u,
        playlistEndedAt: d,
        isLive: m = !0,
        preferLowRate: p = !1,
      }) => {
        let [f, h] = (0, n.useState)(!0),
          [g, k] = (0, n.useState)(0),
          [T, v] = (0, n.useState)(!1),
          y = (0, n.useRef)(null),
          b = (0, n.useRef)(null),
          E = (0, n.useRef)(null),
          _ = (0, n.useRef)(null),
          S = (0, n.useRef)(!1),
          w = (0, n.useCallback)((e, n) => {
            null !== y.current &&
              (o.f.increment("player_switch.livekit_to_hls", 1, {
                reason: e,
                ...n,
              }),
              o.f.timing(
                "player_switch.livekit_fallback_ms",
                Date.now() - y.current,
                { reason: e },
              ),
              "probe_changed" === e && v(!0),
              k((e) => e + 1),
              (y.current = null));
          }, []),
          I = (0, n.useCallback)(
            async (e) => {
              if (!S.current) {
                S.current = !0;
                try {
                  let n = await l(e);
                  if (!n)
                    return void o.f.increment(
                      "player_switch.livekit_probe_unusable",
                      1,
                      { hasBaseline: !!b.current },
                    );
                  if (!b.current) {
                    ((b.current = n), (E.current = e));
                    return;
                  }
                  if (E.current !== e || b.current !== n) {
                    let t = E.current !== e,
                      a = b.current !== n;
                    ((b.current = null),
                      (E.current = null),
                      w("probe_changed", { urlChanged: t, etagChanged: a }),
                      h(!0));
                  } else
                    o.f.increment("player_switch.livekit_probe_unchanged", 1);
                } finally {
                  S.current = !1;
                }
              }
            },
            [w],
          ),
          A = !!(u && !d && f),
          { data: N, isLoading: R } = (0, i.W)(e, {
            isPlaylistActive: f,
            enabled: !c && !A,
            onSuccess: (e) => {
              if (e?.endedAt || f) return;
              let n = s(e, u ?? null);
              n && I(n);
            },
          }),
          P = u || N?.vodPlaylistUrl,
          O = void 0 === d ? N?.endedAt : d,
          x = (p && N?.playlistUrlLow) || N?.vodPlaylistUrl,
          C = (T && x) || P,
          M = C
            ? ((e, n) => {
                if (n <= 0) return e;
                try {
                  let t = new URL(e);
                  return (
                    t.searchParams.set("hls_recover", String(n)),
                    t.toString()
                  );
                } catch {
                  let t = e.includes("?") ? "&" : "?";
                  return `${e}${t}hls_recover=${n}`;
                }
              })(C, g)
            : C,
          D = !!(!1 !== m && (c || (!R && (!f || !P || O)))),
          L = (0, n.useRef)(null),
          U = s(N, u ?? null);
        ((0, n.useEffect)(() => {
          _.current = U;
        }, [U]),
          (0, n.useEffect)(() => {
            (L.current &&
              L.current !== P &&
              ((b.current = null),
              (E.current = null),
              w("playlist_url_changed"),
              h(!0)),
              (L.current = P ?? null));
          }, [P, w]));
        let { onProviderSetup: F, onEnded: j } = ((e) => {
          let i,
            o,
            s,
            l,
            c,
            u,
            d,
            m,
            p,
            f,
            h = (0, t.c)(19),
            { onInactivePlaylistDetected: g, isEnabled: k } = e,
            T = (0, n.useRef)(null),
            v = (0, n.useRef)(0);
          h[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((i = Date.now()), (h[0] = i))
            : (i = h[0]);
          let y = (0, n.useRef)(i),
            b = (0, n.useRef)(null),
            E = (0, n.useRef)(!1),
            _ = (0, n.useRef)(null);
          h[1] !== k || h[2] !== g
            ? ((o = () => {
                k && ((E.current = !0), g());
              }),
              (h[1] = k),
              (h[2] = g),
              (h[3] = o))
            : (o = h[3]);
          let S = o;
          h[4] === Symbol.for("react.memo_cache_sentinel")
            ? ((s = () => {
                (b.current && (clearInterval(b.current), (b.current = null)),
                  _.current && (_.current(), (_.current = null)),
                  (T.current = null),
                  (E.current = !1));
              }),
              (h[4] = s))
            : (s = h[4]);
          let w = s;
          h[5] !== S
            ? ((l = (e) => {
                let n = e.constructor,
                  t = (e, n) => {
                    let t = n.details.endSN;
                    t <= v.current ||
                      ((v.current = t),
                      (y.current = Date.now()),
                      r.logger.debug(
                        "[useActivePlaylistDetection] New segments detected",
                        { segmentCount: t, isLive: n.details.live },
                      ));
                  },
                  a = () => {
                    ((y.current = Date.now()),
                      r.logger.debug(
                        "[useActivePlaylistDetection] Manifest parsed",
                      ));
                  },
                  i = (e, n) => {
                    n.fatal &&
                      (r.logger.error(
                        "[useActivePlaylistDetection] Fatal HLS error",
                        { type: n.type, details: n.details },
                      ),
                      E.current || S());
                  };
                return (
                  e.on(n.Events.LEVEL_LOADED, t),
                  e.on(n.Events.MANIFEST_PARSED, a),
                  e.on(n.Events.ERROR, i),
                  () => {
                    (e.off(n.Events.LEVEL_LOADED, t),
                      e.off(n.Events.MANIFEST_PARSED, a),
                      e.off(n.Events.ERROR, i));
                  }
                );
              }),
              (h[5] = S),
              (h[6] = l))
            : (l = h[6]);
          let I = l;
          h[7] !== S
            ? ((c = () => {
                let e = Date.now() - y.current;
                e < 1e4 ||
                  E.current ||
                  (r.logger.warn(
                    "[useActivePlaylistDetection] Playlist inactive - no new segments",
                    { timeSinceLastUpdateMs: e, lastSegmentCount: v.current },
                  ),
                  S());
              }),
              (h[7] = S),
              (h[8] = c))
            : (c = h[8]);
          let A = c;
          h[9] !== A || h[10] !== I
            ? ((u = (e, n) => {
                (w(),
                  (0, a.G4)(e) &&
                    e.instance &&
                    ((T.current = e.instance),
                    (v.current = 0),
                    (y.current = Date.now()),
                    (E.current = !1),
                    (_.current = I(e.instance)),
                    (b.current = setInterval(A, 2e3)),
                    r.logger.debug(
                      "[useActivePlaylistDetection] HLS provider setup complete",
                    )));
              }),
              (h[9] = A),
              (h[10] = I),
              (h[11] = u))
            : (u = h[11]);
          let N = u;
          h[12] !== S
            ? ((d = () => {
                E.current ||
                  (r.logger.debug("[useActivePlaylistDetection] Video ended"),
                  S());
              }),
              (h[12] = S),
              (h[13] = d))
            : (d = h[13]);
          let R = d;
          return (
            h[14] === Symbol.for("react.memo_cache_sentinel")
              ? ((m = () => w), (p = [w]), (h[14] = m), (h[15] = p))
              : ((m = h[14]), (p = h[15])),
            (0, n.useEffect)(m, p),
            h[16] !== R || h[17] !== N
              ? ((f = { onProviderSetup: N, onEnded: R }),
                (h[16] = R),
                (h[17] = N),
                (h[18] = f))
              : (f = h[18]),
            f
          );
        })({
          isEnabled: !!(!D && m),
          onInactivePlaylistDetected: () => {
            (null === y.current &&
              ((y.current = Date.now()),
              o.f.increment("player_switch.hls_to_livekit", 1, {
                reason: "inactive_playlist",
                hasProbeUrl: !!_.current,
              })),
              (b.current = null),
              (E.current = null),
              h(!1));
            let e = _.current;
            e && I(e);
          },
        });
        return {
          onProviderSetup: F,
          onEnded: j,
          isLiveKit: D,
          playlist: N,
          isPlaylistLoading: R,
          playlistUrl: M,
        };
      },
    ],
    202541,
  );
};
