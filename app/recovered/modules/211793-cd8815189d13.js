// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  var a = Object.defineProperty,
    n = Object.getOwnPropertyDescriptor,
    o = Object.getOwnPropertyNames,
    i = Object.prototype.hasOwnProperty,
    l = {},
    s = { default: () => y };
  for (var u in s) a(l, u, { get: s[u], enumerable: !0 });
  t.exports = ((e, t, r) => {
    if ((t && "object" == typeof t) || "function" == typeof t)
      for (let l of o(t))
        i.call(e, l) ||
          void 0 === l ||
          a(e, l, {
            get: () => t[l],
            enumerable: !(r = n(t, l)) || r.enumerable,
          });
    return e;
  })(a({}, "__esModule", { value: !0 }), l);
  var c = e.r(415685),
    p = e.r(574087),
    y = [
      {
        key: "youtube",
        name: "YouTube",
        canPlay: p.canPlay.youtube,
        lazyPlayer: (0, c.lazy)(() => e.A(574049)),
      },
      {
        key: "soundcloud",
        name: "SoundCloud",
        canPlay: p.canPlay.soundcloud,
        lazyPlayer: (0, c.lazy)(() => e.A(356646)),
      },
      {
        key: "vimeo",
        name: "Vimeo",
        canPlay: p.canPlay.vimeo,
        lazyPlayer: (0, c.lazy)(() => e.A(455197)),
      },
      {
        key: "mux",
        name: "Mux",
        canPlay: p.canPlay.mux,
        lazyPlayer: (0, c.lazy)(() => e.A(595279)),
      },
      {
        key: "facebook",
        name: "Facebook",
        canPlay: p.canPlay.facebook,
        lazyPlayer: (0, c.lazy)(() => e.A(530576)),
      },
      {
        key: "streamable",
        name: "Streamable",
        canPlay: p.canPlay.streamable,
        lazyPlayer: (0, c.lazy)(() => e.A(825255)),
      },
      {
        key: "wistia",
        name: "Wistia",
        canPlay: p.canPlay.wistia,
        lazyPlayer: (0, c.lazy)(() => e.A(940280)),
      },
      {
        key: "twitch",
        name: "Twitch",
        canPlay: p.canPlay.twitch,
        lazyPlayer: (0, c.lazy)(() => e.A(737473)),
      },
      {
        key: "dailymotion",
        name: "DailyMotion",
        canPlay: p.canPlay.dailymotion,
        lazyPlayer: (0, c.lazy)(() => e.A(558619)),
      },
      {
        key: "mixcloud",
        name: "Mixcloud",
        canPlay: p.canPlay.mixcloud,
        lazyPlayer: (0, c.lazy)(() => e.A(599203)),
      },
      {
        key: "vidyard",
        name: "Vidyard",
        canPlay: p.canPlay.vidyard,
        lazyPlayer: (0, c.lazy)(() => e.A(178391)),
      },
      {
        key: "kaltura",
        name: "Kaltura",
        canPlay: p.canPlay.kaltura,
        lazyPlayer: (0, c.lazy)(() => e.A(393292)),
      },
      {
        key: "file",
        name: "FilePlayer",
        canPlay: p.canPlay.file,
        canEnablePIP: (e) =>
          p.canPlay.file(e) &&
          (document.pictureInPictureEnabled ||
            (0, c.supportsWebKitPresentationMode)()) &&
          !p.AUDIO_EXTENSIONS.test(e),
        lazyPlayer: (0, c.lazy)(() => e.A(652879)),
      },
    ];
};
