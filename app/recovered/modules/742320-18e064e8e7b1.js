// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  let a, l;
  var s = Object.create,
    i = Object.defineProperty,
    n = Object.getOwnPropertyDescriptor,
    o = Object.getOwnPropertyNames,
    p = Object.getPrototypeOf,
    h = Object.prototype.hasOwnProperty,
    d = (e, t, r, a) => {
      if ((t && "object" == typeof t) || "function" == typeof t)
        for (let l of o(t))
          h.call(e, l) ||
            l === r ||
            i(e, l, {
              get: () => t[l],
              enumerable: !(a = n(t, l)) || a.enumerable,
            });
      return e;
    },
    u = (e, t, r) => {
      let a;
      return (
        (a = "symbol" != typeof t ? t + "" : t) in e
          ? i(e, a, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: r,
            })
          : (e[a] = r),
        r
      );
    },
    y = {},
    c = { default: () => v };
  for (var m in c) i(y, m, { get: c[m], enumerable: !0 });
  t.exports = d(i({}, "__esModule", { value: !0 }), y);
  var P =
      ((l = null != (a = e.r(352386)) ? s(p(a)) : {}),
      d(
        a && a.__esModule ? l : i(l, "default", { value: a, enumerable: !0 }),
        a,
      )),
    b = e.r(415685),
    g = e.r(574087);
  class v extends P.Component {
    constructor() {
      (super(...arguments),
        u(this, "callPlayer", b.callPlayer),
        u(
          this,
          "playerID",
          this.props.config.playerId ||
            `twitch-player-${(0, b.randomString)()}`,
        ),
        u(this, "mute", () => {
          this.callPlayer("setMuted", !0);
        }),
        u(this, "unmute", () => {
          this.callPlayer("setMuted", !1);
        }));
    }
    componentDidMount() {
      this.props.onMount && this.props.onMount(this);
    }
    load(e, t) {
      let { playsinline: r, onError: a, config: l, controls: s } = this.props,
        i = g.MATCH_URL_TWITCH_CHANNEL.test(e),
        n = i
          ? e.match(g.MATCH_URL_TWITCH_CHANNEL)[1]
          : e.match(g.MATCH_URL_TWITCH_VIDEO)[1];
      t
        ? i
          ? this.player.setChannel(n)
          : this.player.setVideo("v" + n)
        : (0, b.getSDK)(
            "https://player.twitch.tv/js/embed/v1.js",
            "Twitch",
          ).then((t) => {
            this.player = new t.Player(this.playerID, {
              video: i ? "" : n,
              channel: i ? n : "",
              height: "100%",
              width: "100%",
              playsinline: r,
              autoplay: this.props.playing,
              muted: this.props.muted,
              controls: !!i || s,
              time: (0, b.parseStartTime)(e),
              ...l.options,
            });
            let {
              READY: a,
              PLAYING: o,
              PAUSE: p,
              ENDED: h,
              ONLINE: d,
              OFFLINE: u,
              SEEK: y,
            } = t.Player;
            (this.player.addEventListener(a, this.props.onReady),
              this.player.addEventListener(o, this.props.onPlay),
              this.player.addEventListener(p, this.props.onPause),
              this.player.addEventListener(h, this.props.onEnded),
              this.player.addEventListener(y, this.props.onSeek),
              this.player.addEventListener(d, this.props.onLoaded),
              this.player.addEventListener(u, this.props.onLoaded));
          }, a);
    }
    play() {
      this.callPlayer("play");
    }
    pause() {
      this.callPlayer("pause");
    }
    stop() {
      this.callPlayer("pause");
    }
    seekTo(e, t = !0) {
      (this.callPlayer("seek", e), t || this.pause());
    }
    setVolume(e) {
      this.callPlayer("setVolume", e);
    }
    getDuration() {
      return this.callPlayer("getDuration");
    }
    getCurrentTime() {
      return this.callPlayer("getCurrentTime");
    }
    getSecondsLoaded() {
      return null;
    }
    render() {
      return P.default.createElement("div", {
        style: { width: "100%", height: "100%" },
        id: this.playerID,
      });
    }
  }
  (u(v, "displayName", "Twitch"),
    u(v, "canPlay", g.canPlay.twitch),
    u(v, "loopOnEnded", !0));
};
