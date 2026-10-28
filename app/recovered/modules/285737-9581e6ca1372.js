// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  let a, l;
  var s = Object.create,
    o = Object.defineProperty,
    i = Object.getOwnPropertyDescriptor,
    n = Object.getOwnPropertyNames,
    p = Object.getPrototypeOf,
    u = Object.prototype.hasOwnProperty,
    h = (e, t, r, a) => {
      if ((t && "object" == typeof t) || "function" == typeof t)
        for (let l of n(t))
          u.call(e, l) ||
            l === r ||
            o(e, l, {
              get: () => t[l],
              enumerable: !(a = i(t, l)) || a.enumerable,
            });
      return e;
    },
    y = (e, t, r) => {
      let a;
      return (
        (a = "symbol" != typeof t ? t + "" : t) in e
          ? o(e, a, {
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
    c = { default: () => g };
  for (var m in c) o(d, m, { get: c[m], enumerable: !0 });
  t.exports = h(o({}, "__esModule", { value: !0 }), d);
  var P =
      ((l = null != (a = e.r(352386)) ? s(p(a)) : {}),
      h(
        a && a.__esModule ? l : o(l, "default", { value: a, enumerable: !0 }),
        a,
      )),
    b = e.r(415685),
    f = e.r(574087);
  class g extends P.Component {
    constructor() {
      (super(...arguments),
        y(this, "callPlayer", b.callPlayer),
        y(this, "mute", () => {
          this.setVolume(0);
        }),
        y(this, "unmute", () => {
          null !== this.props.volume && this.setVolume(this.props.volume);
        }),
        y(this, "ref", (e) => {
          this.container = e;
        }));
    }
    componentDidMount() {
      this.props.onMount && this.props.onMount(this);
    }
    load(e) {
      let { playing: t, config: r, onError: a, onDuration: l } = this.props,
        s = e && e.match(f.MATCH_URL_VIDYARD)[1];
      (this.player && this.stop(),
        (0, b.getSDK)(
          "https://play.vidyard.com/embed/v4.js",
          "VidyardV4",
          "onVidyardAPI",
        ).then((e) => {
          this.container &&
            (e.api.addReadyListener((e, t) => {
              this.player ||
                ((this.player = t),
                this.player.on("ready", this.props.onReady),
                this.player.on("play", this.props.onPlay),
                this.player.on("pause", this.props.onPause),
                this.player.on("seek", this.props.onSeek),
                this.player.on("playerComplete", this.props.onEnded));
            }, s),
            e.api.renderPlayer({
              uuid: s,
              container: this.container,
              autoplay: +!!t,
              ...r.options,
            }),
            e.api.getPlayerMetadata(s).then((e) => {
              ((this.duration = e.length_in_seconds), l(e.length_in_seconds));
            }));
        }, a));
    }
    play() {
      this.callPlayer("play");
    }
    pause() {
      this.callPlayer("pause");
    }
    stop() {
      window.VidyardV4.api.destroyPlayer(this.player);
    }
    seekTo(e, t = !0) {
      (this.callPlayer("seek", e), t || this.pause());
    }
    setVolume(e) {
      this.callPlayer("setVolume", e);
    }
    setPlaybackRate(e) {
      this.callPlayer("setPlaybackSpeed", e);
    }
    getDuration() {
      return this.duration;
    }
    getCurrentTime() {
      return this.callPlayer("currentTime");
    }
    getSecondsLoaded() {
      return null;
    }
    render() {
      let { display: e } = this.props;
      return P.default.createElement(
        "div",
        { style: { width: "100%", height: "100%", display: e } },
        P.default.createElement("div", { ref: this.ref }),
      );
    }
  }
  (y(g, "displayName", "Vidyard"), y(g, "canPlay", f.canPlay.vidyard));
};
