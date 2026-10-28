// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(445242),
    t = e.i(249437);
  e.s(["f", () => t.t], 608249);
  var t = t,
    a = e.i(484169);
  let r = (e) => null != e.publication && !e.publication.isMuted;
  function i(e, n) {
    return (
      n.source === a.Track.Source.Microphone &&
        r(n) &&
        e.add(n.participant.identity),
      e
    );
  }
  function o(e) {
    return (
      e.source === a.Track.Source.Camera &&
      e.participant.kind !== a.ParticipantKind.INGRESS
    );
  }
  function s(e) {
    return (
      e.participant.kind === a.ParticipantKind.INGRESS &&
      e.source === a.Track.Source.Camera
    );
  }
  function l(e) {
    return e.source === a.Track.Source.ScreenShare;
  }
  e.s(
    [
      "f",
      0,
      () => {
        let e,
          c,
          u,
          d,
          m,
          p,
          f,
          h,
          g,
          k = (0, n.c)(15);
        k[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = [
              { source: a.Track.Source.Microphone, withPlaceholder: !1 },
              { source: a.Track.Source.Camera, withPlaceholder: !1 },
              { source: a.Track.Source.ScreenShare, withPlaceholder: !1 },
            ]),
            (c = {
              updateOnlyOn: [
                a.RoomEvent.ActiveSpeakersChanged,
                a.RoomEvent.TrackMuted,
                a.RoomEvent.TrackUnmuted,
                a.RoomEvent.TrackPublished,
                a.RoomEvent.TrackUnpublished,
                a.RoomEvent.LocalTrackPublished,
                a.RoomEvent.LocalTrackUnpublished,
                a.RoomEvent.ParticipantMetadataChanged,
                a.RoomEvent.ParticipantDisconnected,
              ],
              onlySubscribed: !0,
            }),
            (k[0] = e),
            (k[1] = c))
          : ((e = k[0]), (c = k[1]));
        let T = (0, t.t)(e, c);
        if (k[2] !== T) {
          f = Symbol.for("react.early_return_sentinel");
          e: {
            let e = T.reduce(i, new Set());
            if (
              2 !==
              (m = T.filter(
                (n) =>
                  n.source !== a.Track.Source.Microphone &&
                  (r(n) ||
                    (n.source === a.Track.Source.Camera &&
                      e.has(n.participant.identity))),
              )).length
            ) {
              f = { mainTracks: m, overlayTrack: null };
              break e;
            }
            ((u = m.find(o)), (d = m.find(s)), (p = m.find(l)));
          }
          ((k[2] = T),
            (k[3] = u),
            (k[4] = d),
            (k[5] = m),
            (k[6] = p),
            (k[7] = f));
        } else ((u = k[3]), (d = k[4]), (m = k[5]), (p = k[6]), (f = k[7]));
        if (f !== Symbol.for("react.early_return_sentinel")) return f;
        let v = p ?? d,
          y = u ?? d;
        if (!v || !y || v === y) {
          let e;
          return (
            k[8] !== m
              ? ((e = { mainTracks: m, overlayTrack: null }),
                (k[8] = m),
                (k[9] = e))
              : (e = k[9]),
            e
          );
        }
        return (
          k[10] !== v ? ((h = [v]), (k[10] = v), (k[11] = h)) : (h = k[11]),
          k[12] !== y || k[13] !== h
            ? ((g = { mainTracks: h, overlayTrack: y }),
              (k[12] = y),
              (k[13] = h),
              (k[14] = g))
            : (g = k[14]),
          g
        );
      },
    ],
    524102,
  );
};
