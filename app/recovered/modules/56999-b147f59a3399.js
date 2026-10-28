// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    n = e.i(732486),
    i = e.i(445242),
    r = e.i(352386),
    a =
      (((t = {}).GLOBAL = "global"),
      (t.HERO_SLIDE = "HeroSlide"),
      (t.CARD = "Card"),
      t);
  let s = (0, r.createContext)(void 0),
    l = { global: !0, HeroSlide: !0, Card: !0 };
  e.s([
    "k",
    () => a,
    "c",
    0,
    function (e) {
      let t,
        a,
        o,
        c,
        d,
        u,
        m = (0, i.c)(12),
        { children: f } = e,
        [p, h] = (0, r.useState)(l);
      m[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = () => {
            o("global");
          }),
          (o = (e) => {
            h((t) => ({ ...t, [e]: !t[e] }));
          }),
          (t = (e, t) => {
            h((n) => ({ ...n, [e]: t }));
          }),
          (m[0] = t),
          (m[1] = a),
          (m[2] = o))
        : ((t = m[0]), (a = m[1]), (o = m[2]));
      let g = t;
      m[3] !== p
        ? ((c = (e) => p[e] ?? p.global), (m[3] = p), (m[4] = c))
        : (c = m[4]);
      let y = c,
        x = p.global;
      return (
        m[5] !== y || m[6] !== p || m[7] !== x
          ? ((d = {
              muteState: p,
              isMuted: x,
              isMutedFor: y,
              setMuteFor: g,
              toggleMute: a,
              toggleMuteFor: o,
            }),
            (m[5] = y),
            (m[6] = p),
            (m[7] = x),
            (m[8] = d))
          : (d = m[8]),
        m[9] !== f || m[10] !== d
          ? ((u = (0, n.jsx)(s.Provider, { value: d, children: f })),
            (m[9] = f),
            (m[10] = d),
            (m[11] = u))
          : (u = m[11]),
        u
      );
    },
    "F",
    0,
    function () {
      let e = (0, r.useContext)(s);
      if (void 0 === e)
        throw Error("useVideoMute must be used within a VideoMuteProvider");
      return e;
    },
  ]);
};
