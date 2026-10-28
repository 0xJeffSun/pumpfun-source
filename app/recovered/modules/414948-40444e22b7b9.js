// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(732486),
    t = e.i(445242),
    a = e.i(352386),
    r = e.i(162786);
  let i = (0, a.createContext)(void 0);
  e.s([
    "r",
    0,
    (e) => {
      let o,
        s,
        l = (0, t.c)(13),
        { children: c } = e,
        [u, d] = (0, a.useState)(!1),
        [m, p] = (0, a.useState)(null),
        [f, h] = (0, a.useState)(null),
        [g, k] = (0, a.useState)(1),
        { value: T, toggleValue: v, setFalse: y } = (0, r.f)(!1),
        { value: b, toggleValue: E } = (0, r.f)(!0);
      l[0] !== f ||
      l[1] !== T ||
      l[2] !== u ||
      l[3] !== m ||
      l[4] !== b ||
      l[5] !== E ||
      l[6] !== v ||
      l[7] !== y ||
      l[8] !== g
        ? ((o = {
            fullScreen: u,
            setFullScreen: d,
            audioMuted: T,
            unmuteAudio: y,
            toggleMute: v,
            rtmpCredentials: m,
            setRtmpCredentials: p,
            activeProtocol: f,
            setActiveProtocol: h,
            volume: g,
            setVolume: k,
            showFullscreenChat: b,
            toggleFullscreenChat: E,
          }),
          (l[0] = f),
          (l[1] = T),
          (l[2] = u),
          (l[3] = m),
          (l[4] = b),
          (l[5] = E),
          (l[6] = v),
          (l[7] = y),
          (l[8] = g),
          (l[9] = o))
        : (o = l[9]);
      let _ = o;
      return (
        l[10] !== c || l[11] !== _
          ? ((s = (0, n.jsx)(i.Provider, { value: _, children: c })),
            (l[10] = c),
            (l[11] = _),
            (l[12] = s))
          : (s = l[12]),
        s
      );
    },
    "w",
    0,
    function () {
      let e = (0, a.useContext)(i);
      if (void 0 === e)
        throw Error(
          "useLivestreamFeaturesContext must be used within a LivestreamFeaturesProvider",
        );
      return e;
    },
  ]);
};
