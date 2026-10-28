// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  var a = Object.defineProperty,
    n = Object.getOwnPropertyDescriptor,
    o = Object.getOwnPropertyNames,
    i = Object.prototype.hasOwnProperty,
    l = {},
    s = {
      AUDIO_EXTENSIONS: () => _,
      DASH_EXTENSIONS: () => T,
      FLV_EXTENSIONS: () => E,
      HLS_EXTENSIONS: () => S,
      MATCH_URL_DAILYMOTION: () => w,
      MATCH_URL_FACEBOOK: () => f,
      MATCH_URL_FACEBOOK_WATCH: () => m,
      MATCH_URL_KALTURA: () => j,
      MATCH_URL_MIXCLOUD: () => O,
      MATCH_URL_MUX: () => h,
      MATCH_URL_SOUNDCLOUD: () => y,
      MATCH_URL_STREAMABLE: () => b,
      MATCH_URL_TWITCH_CHANNEL: () => v,
      MATCH_URL_TWITCH_VIDEO: () => g,
      MATCH_URL_VIDYARD: () => k,
      MATCH_URL_VIMEO: () => d,
      MATCH_URL_WISTIA: () => P,
      MATCH_URL_YOUTUBE: () => p,
      VIDEO_EXTENSIONS: () => A,
      canPlay: () => M,
    };
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
  var c = e.r(415685);
  let p =
      /(?:youtu\.be\/|youtube(?:-nocookie|education)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//,
    y = /(?:soundcloud\.com|snd\.sc)\/[^.]+$/,
    d = /vimeo\.com\/(?!progressive_redirect).+/,
    h = /stream\.mux\.com\/(?!\w+\.m3u8)(\w+)/,
    f =
      /^https?:\/\/(www\.)?facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/,
    m = /^https?:\/\/fb\.watch\/.+$/,
    b = /streamable\.com\/([a-z0-9]+)$/,
    P =
      /(?:wistia\.(?:com|net)|wi\.st)\/(?:medias|embed)\/(?:iframe\/)?([^?]+)/,
    g = /(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/,
    v = /(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/,
    w =
      /^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?(?:[\w.#_-]+)?/,
    O = /mixcloud\.com\/([^/]+\/[^/]+)/,
    k = /vidyard.com\/(?:watch\/)?([a-zA-Z0-9-_]+)/,
    j =
      /^https?:\/\/[a-zA-Z]+\.kaltura.(com|org)\/p\/([0-9]+)\/sp\/([0-9]+)00\/embedIframeJs\/uiconf_id\/([0-9]+)\/partner_id\/([0-9]+)(.*)entry_id.([a-zA-Z0-9-_].*)$/,
    _ =
      /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i,
    A = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i,
    S = /\.(m3u8)($|\?)/i,
    T = /\.(mpd)($|\?)/i,
    E = /\.(flv)($|\?)/i,
    C = (e) => {
      if (e instanceof Array) {
        for (let t of e)
          if (("string" == typeof t && C(t)) || C(t.src)) return !0;
        return !1;
      }
      return (
        !!((0, c.isMediaStream)(e) || (0, c.isBlobUrl)(e)) ||
        _.test(e) ||
        A.test(e) ||
        S.test(e) ||
        T.test(e) ||
        E.test(e)
      );
    },
    M = {
      youtube: (e) =>
        e instanceof Array ? e.every((e) => p.test(e)) : p.test(e),
      soundcloud: (e) => y.test(e) && !_.test(e),
      vimeo: (e) => d.test(e) && !A.test(e) && !S.test(e),
      mux: (e) => h.test(e),
      facebook: (e) => f.test(e) || m.test(e),
      streamable: (e) => b.test(e),
      wistia: (e) => P.test(e),
      twitch: (e) => g.test(e) || v.test(e),
      dailymotion: (e) => w.test(e),
      mixcloud: (e) => O.test(e),
      vidyard: (e) => k.test(e),
      kaltura: (e) => j.test(e),
      file: C,
    };
};
