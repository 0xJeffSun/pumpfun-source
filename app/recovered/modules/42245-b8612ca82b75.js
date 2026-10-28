// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, a) => {
  let l, s;
  var r = Object.create,
    o = Object.defineProperty,
    i = Object.getOwnPropertyDescriptor,
    n = Object.getOwnPropertyNames,
    y = Object.getPrototypeOf,
    p = Object.prototype.hasOwnProperty,
    c = (e, t, a, l) => {
      if ((t && "object" == typeof t) || "function" == typeof t)
        for (let s of n(t))
          p.call(e, s) ||
            s === a ||
            o(e, s, {
              get: () => t[s],
              enumerable: !(l = i(t, s)) || l.enumerable,
            });
      return e;
    },
    u = (e, t, a) => {
      let l;
      return (
        (l = "symbol" != typeof t ? t + "" : t) in e
          ? o(e, l, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: a,
            })
          : (e[l] = a),
        a
      );
    },
    h = {},
    d = { default: () => v };
  for (var P in d) o(h, P, { get: d[P], enumerable: !0 });
  t.exports = c(o({}, "__esModule", { value: !0 }), h);
  var m =
      ((s = null != (l = e.r(352386)) ? r(y(l)) : {}),
      c(
        l && l.__esModule ? s : o(s, "default", { value: l, enumerable: !0 }),
        l,
      )),
    g = e.r(415685),
    b = e.r(574087);
  let f = /[?&](?:list|channel)=([a-zA-Z0-9_-]+)/,
    T = /user\/([a-zA-Z0-9_-]+)\/?/,
    w = /youtube-nocookie\.com/;
  class v extends m.Component {
    constructor() {
      (super(...arguments),
        u(this, "callPlayer", g.callPlayer),
        u(this, "parsePlaylist", (e) => {
          if (e instanceof Array)
            return {
              listType: "playlist",
              playlist: e.map(this.getID).join(","),
            };
          if (f.test(e)) {
            let [, t] = e.match(f);
            return { listType: "playlist", list: t.replace(/^UC/, "UU") };
          }
          if (T.test(e)) {
            let [, t] = e.match(T);
            return { listType: "user_uploads", list: t };
          }
          return {};
        }),
        u(this, "onStateChange", (e) => {
          let { data: t } = e,
            {
              onPlay: a,
              onPause: l,
              onBuffer: s,
              onBufferEnd: r,
              onEnded: o,
              onReady: i,
              loop: n,
              config: { playerVars: y, onUnstarted: p },
            } = this.props,
            {
              UNSTARTED: c,
              PLAYING: u,
              PAUSED: h,
              BUFFERING: d,
              ENDED: P,
              CUED: m,
            } = window.YT.PlayerState;
          if (
            (t === c && p(),
            t === u && (a(), r()),
            t === h && l(),
            t === d && s(),
            t === P)
          ) {
            let e = !!this.callPlayer("getPlaylist");
            (n && !e && (y.start ? this.seekTo(y.start) : this.play()), o());
          }
          t === m && i();
        }),
        u(this, "mute", () => {
          this.callPlayer("mute");
        }),
        u(this, "unmute", () => {
          this.callPlayer("unMute");
        }),
        u(this, "ref", (e) => {
          this.container = e;
        }));
    }
    componentDidMount() {
      this.props.onMount && this.props.onMount(this);
    }
    getID(e) {
      return !e || e instanceof Array || f.test(e)
        ? null
        : e.match(b.MATCH_URL_YOUTUBE)[1];
    }
    load(e, t) {
      let {
          playing: a,
          muted: l,
          playsinline: s,
          controls: r,
          loop: o,
          config: i,
          onError: n,
        } = this.props,
        { playerVars: y, embedOptions: p } = i,
        c = this.getID(e);
      t
        ? f.test(e) || T.test(e) || e instanceof Array
          ? this.player.loadPlaylist(this.parsePlaylist(e))
          : this.player.cueVideoById({
              videoId: c,
              startSeconds: (0, g.parseStartTime)(e) || y.start,
              endSeconds: (0, g.parseEndTime)(e) || y.end,
            })
        : ((0, g.getSDK)(
            "https://www.youtube.com/iframe_api",
            "YT",
            "onYouTubeIframeAPIReady",
            (e) => e.loaded,
          ).then((t) => {
            this.container &&
              (this.player = new t.Player(this.container, {
                width: "100%",
                height: "100%",
                videoId: c,
                playerVars: {
                  autoplay: +!!a,
                  mute: +!!l,
                  controls: +!!r,
                  start: (0, g.parseStartTime)(e),
                  end: (0, g.parseEndTime)(e),
                  origin: window.location.origin,
                  playsinline: +!!s,
                  ...this.parsePlaylist(e),
                  ...y,
                },
                events: {
                  onReady: () => {
                    (o && this.player.setLoop(!0), this.props.onReady());
                  },
                  onPlaybackRateChange: (e) =>
                    this.props.onPlaybackRateChange(e.data),
                  onPlaybackQualityChange: (e) =>
                    this.props.onPlaybackQualityChange(e),
                  onStateChange: this.onStateChange,
                  onError: (e) => n(e.data),
                },
                host: w.test(e) ? "https://www.youtube-nocookie.com" : void 0,
                ...p,
              }));
          }, n),
          p.events &&
            console.warn(
              "Using `embedOptions.events` will likely break things. Use ReactPlayer’s callback props instead, eg onReady, onPlay, onPause",
            ));
    }
    play() {
      this.callPlayer("playVideo");
    }
    pause() {
      this.callPlayer("pauseVideo");
    }
    stop() {
      document.body.contains(this.callPlayer("getIframe")) &&
        this.callPlayer("stopVideo");
    }
    seekTo(e, t = !1) {
      (this.callPlayer("seekTo", e), t || this.props.playing || this.pause());
    }
    setVolume(e) {
      this.callPlayer("setVolume", 100 * e);
    }
    setPlaybackRate(e) {
      this.callPlayer("setPlaybackRate", e);
    }
    setLoop(e) {
      this.callPlayer("setLoop", e);
    }
    getDuration() {
      return this.callPlayer("getDuration");
    }
    getCurrentTime() {
      return this.callPlayer("getCurrentTime");
    }
    getSecondsLoaded() {
      return this.callPlayer("getVideoLoadedFraction") * this.getDuration();
    }
    render() {
      let { display: e } = this.props;
      return m.default.createElement(
        "div",
        { style: { width: "100%", height: "100%", display: e } },
        m.default.createElement("div", { ref: this.ref }),
      );
    }
  }
  (u(v, "displayName", "YouTube"), u(v, "canPlay", b.canPlay.youtube));
};
