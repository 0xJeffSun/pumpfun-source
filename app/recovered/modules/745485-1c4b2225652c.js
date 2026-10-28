// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  let a, o;
  var i = Object.create,
    s = Object.defineProperty,
    n = Object.getOwnPropertyDescriptor,
    l = Object.getOwnPropertyNames,
    p = Object.getPrototypeOf,
    u = Object.prototype.hasOwnProperty,
    h = (e, t, r, a) => {
      if ((t && "object" == typeof t) || "function" == typeof t)
        for (let o of l(t))
          u.call(e, o) ||
            o === r ||
            s(e, o, {
              get: () => t[o],
              enumerable: !(a = n(t, o)) || a.enumerable,
            });
      return e;
    },
    c = (e, t, r) => {
      let a;
      return (
        (a = "symbol" != typeof t ? t + "" : t) in e
          ? s(e, a, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: r,
            })
          : (e[a] = r),
        r
      );
    },
    d = {},
    y = { default: () => P };
  for (var m in y) s(d, m, { get: y[m], enumerable: !0 });
  t.exports = h(s({}, "__esModule", { value: !0 }), d);
  var f =
      ((o = null != (a = e.r(352386)) ? i(p(a)) : {}),
      h(
        a && a.__esModule ? o : s(o, "default", { value: a, enumerable: !0 }),
        a,
      )),
    g = e.r(415685),
    b = e.r(574087);
  class P extends f.Component {
    constructor() {
      (super(...arguments),
        c(this, "callPlayer", g.callPlayer),
        c(this, "onDurationChange", () => {
          let e = this.getDuration();
          this.props.onDuration(e);
        }),
        c(this, "mute", () => {
          this.callPlayer("setMuted", !0);
        }),
        c(this, "unmute", () => {
          this.callPlayer("setMuted", !1);
        }),
        c(this, "ref", (e) => {
          this.container = e;
        }));
    }
    componentDidMount() {
      this.props.onMount && this.props.onMount(this);
    }
    load(e) {
      let { controls: t, config: r, onError: a, playing: o } = this.props,
        [, i] = e.match(b.MATCH_URL_DAILYMOTION);
      this.player
        ? this.player.load(i, { start: (0, g.parseStartTime)(e), autoplay: o })
        : (0, g.getSDK)(
            "https://api.dmcdn.net/all.js",
            "DM",
            "dmAsyncInit",
            (e) => e.player,
          ).then((o) => {
            if (!this.container) return;
            let s = o.player;
            this.player = new s(this.container, {
              width: "100%",
              height: "100%",
              video: i,
              params: {
                controls: t,
                autoplay: this.props.playing,
                mute: this.props.muted,
                start: (0, g.parseStartTime)(e),
                origin: window.location.origin,
                ...r.params,
              },
              events: {
                apiready: this.props.onReady,
                seeked: () => this.props.onSeek(this.player.currentTime),
                video_end: this.props.onEnded,
                durationchange: this.onDurationChange,
                pause: this.props.onPause,
                playing: this.props.onPlay,
                waiting: this.props.onBuffer,
                error: (e) => a(e),
              },
            });
          }, a);
    }
    play() {
      this.callPlayer("play");
    }
    pause() {
      this.callPlayer("pause");
    }
    stop() {}
    seekTo(e, t = !0) {
      (this.callPlayer("seek", e), t || this.pause());
    }
    setVolume(e) {
      this.callPlayer("setVolume", e);
    }
    getDuration() {
      return this.player.duration || null;
    }
    getCurrentTime() {
      return this.player.currentTime;
    }
    getSecondsLoaded() {
      return this.player.bufferedTime;
    }
    render() {
      let { display: e } = this.props;
      return f.default.createElement(
        "div",
        { style: { width: "100%", height: "100%", display: e } },
        f.default.createElement("div", { ref: this.ref }),
      );
    }
  }
  (c(P, "displayName", "DailyMotion"),
    c(P, "canPlay", b.canPlay.dailymotion),
    c(P, "loopOnEnded", !0));
};
