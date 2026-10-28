// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, a) => {
  let l, n;
  var s = Object.create,
    i = Object.defineProperty,
    o = Object.getOwnPropertyDescriptor,
    r = Object.getOwnPropertyNames,
    p = Object.getPrototypeOf,
    h = Object.prototype.hasOwnProperty,
    u = (e, t, a, l) => {
      if ((t && "object" == typeof t) || "function" == typeof t)
        for (let n of r(t))
          h.call(e, n) ||
            n === a ||
            i(e, n, {
              get: () => t[n],
              enumerable: !(l = o(t, n)) || l.enumerable,
            });
      return e;
    },
    y = (e, t, a) => {
      let l;
      return (
        (l = "symbol" != typeof t ? t + "" : t) in e
          ? i(e, l, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: a,
            })
          : (e[l] = a),
        a
      );
    },
    c = {},
    d = { default: () => f };
  for (var b in d) i(c, b, { get: d[b], enumerable: !0 });
  t.exports = u(i({}, "__esModule", { value: !0 }), c);
  var P =
      ((n = null != (l = e.r(352386)) ? s(p(l)) : {}),
      u(
        l && l.__esModule ? n : i(n, "default", { value: l, enumerable: !0 }),
        l,
      )),
    m = e.r(415685),
    g = e.r(574087);
  class f extends P.Component {
    constructor() {
      (super(...arguments),
        y(this, "callPlayer", m.callPlayer),
        y(
          this,
          "playerID",
          this.props.config.playerId ||
            `wistia-player-${(0, m.randomString)()}`,
        ),
        y(this, "onPlay", (...e) => this.props.onPlay(...e)),
        y(this, "onPause", (...e) => this.props.onPause(...e)),
        y(this, "onSeek", (...e) => this.props.onSeek(...e)),
        y(this, "onEnded", (...e) => this.props.onEnded(...e)),
        y(this, "onPlaybackRateChange", (...e) =>
          this.props.onPlaybackRateChange(...e),
        ),
        y(this, "mute", () => {
          this.callPlayer("mute");
        }),
        y(this, "unmute", () => {
          this.callPlayer("unmute");
        }));
    }
    componentDidMount() {
      this.props.onMount && this.props.onMount(this);
    }
    load(e) {
      let {
        playing: t,
        muted: a,
        controls: l,
        onReady: n,
        config: s,
        onError: i,
      } = this.props;
      (0, m.getSDK)(
        "https://fast.wistia.com/assets/external/E-v1.js",
        "Wistia",
      ).then((e) => {
        (s.customControls &&
          s.customControls.forEach((t) => e.defineControl(t)),
          (window._wq = window._wq || []),
          window._wq.push({
            id: this.playerID,
            options: {
              autoPlay: t,
              silentAutoPlay: "allow",
              muted: a,
              controlsVisibleOnLoad: l,
              fullscreenButton: l,
              playbar: l,
              playbackRateControl: l,
              qualityControl: l,
              volumeControl: l,
              settingsControl: l,
              smallPlayButton: l,
              ...s.options,
            },
            onReady: (e) => {
              ((this.player = e),
                this.unbind(),
                this.player.bind("play", this.onPlay),
                this.player.bind("pause", this.onPause),
                this.player.bind("seek", this.onSeek),
                this.player.bind("end", this.onEnded),
                this.player.bind(
                  "playbackratechange",
                  this.onPlaybackRateChange,
                ),
                n());
            },
          }));
      }, i);
    }
    unbind() {
      (this.player.unbind("play", this.onPlay),
        this.player.unbind("pause", this.onPause),
        this.player.unbind("seek", this.onSeek),
        this.player.unbind("end", this.onEnded),
        this.player.unbind("playbackratechange", this.onPlaybackRateChange));
    }
    play() {
      this.callPlayer("play");
    }
    pause() {
      this.callPlayer("pause");
    }
    stop() {
      (this.unbind(), this.callPlayer("remove"));
    }
    seekTo(e, t = !0) {
      (this.callPlayer("time", e), t || this.pause());
    }
    setVolume(e) {
      this.callPlayer("volume", e);
    }
    setPlaybackRate(e) {
      this.callPlayer("playbackRate", e);
    }
    getDuration() {
      return this.callPlayer("duration");
    }
    getCurrentTime() {
      return this.callPlayer("time");
    }
    getSecondsLoaded() {
      return null;
    }
    render() {
      let { url: e } = this.props,
        t = e && e.match(g.MATCH_URL_WISTIA)[1],
        a = `wistia_embed wistia_async_${t}`;
      return P.default.createElement("div", {
        id: this.playerID,
        key: t,
        className: a,
        style: { width: "100%", height: "100%" },
      });
    }
  }
  (y(f, "displayName", "Wistia"),
    y(f, "canPlay", g.canPlay.wistia),
    y(f, "loopOnEnded", !0));
};
