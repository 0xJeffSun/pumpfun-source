// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(445242),
    t = e.i(387819),
    a = e.i(292686),
    r = e.i(484169),
    i = e.i(352386),
    o = e.i(851746),
    s = e.i(756506),
    l = e.i(967388),
    c = e.i(797948),
    u = e.i(325320),
    d = e.i(182251);
  let m = (e, n) => {
    let t = 0;
    return (
      e.remoteParticipants.forEach((e) => {
        e.trackPublications.forEach((e) => {
          e.kind === r.Track.Kind.Video &&
            e.isSubscribed &&
            e.track &&
            (e.setVideoQuality(n), (t += 1));
        });
      }),
      t
    );
  };
  e.s(["f", 0, m], 223744);
  var p = e.i(54567);
  function f(e) {
    return { label: e, value: e };
  }
  e.s(
    [
      "f",
      0,
      () => {
        let e,
          h,
          g,
          k = (0, n.c)(9),
          T = (0, t.f)(),
          { mintId: v } = (0, u.E)(),
          { getLivestream: y } = (0, d.F)(),
          [b, E] = (0, i.useState)(o.f.AUTO);
        k[0] !== y || k[1] !== v || k[2] !== b || k[3] !== T
          ? ((e = (e) => {
              let n = m(T, e === o.f.AUTO ? r.VideoQuality.HIGH : (0, s.X)(e));
              if (
                (p.logger.debug(
                  "[useConnectionQuality] Applied quality to publications",
                  { requestedQuality: e, applied: n },
                ),
                b !== e)
              ) {
                let n = y(v);
                (0, c.k)({
                  fromQuality: (0, s.L)(b),
                  toQuality: (0, s.L)(e),
                  mint: v,
                  livestreamId: n?.id ? String(n.id) : void 0,
                  contentType: a.iF.LIVESTREAM,
                  context: l.D.CONTROLS,
                });
              }
              E(e);
            }),
            (k[0] = y),
            (k[1] = v),
            (k[2] = b),
            (k[3] = T),
            (k[4] = e))
          : (e = k[4]);
        let _ = e;
        k[5] === Symbol.for("react.memo_cache_sentinel")
          ? ((h = Object.values(o.f).map(f)), (k[5] = h))
          : (h = k[5]);
        let S = h;
        return (
          k[6] !== _ || k[7] !== b
            ? ((g = { quality: b, setQuality: _, selectorOptions: S }),
              (k[6] = _),
              (k[7] = b),
              (k[8] = g))
            : (g = k[8]),
          g
        );
      },
    ],
    812176,
  );
};
