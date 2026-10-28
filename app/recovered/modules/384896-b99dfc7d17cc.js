// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  let o, s;
  var l = Object.create,
    n = Object.defineProperty,
    a = Object.getOwnPropertyDescriptor,
    i = Object.getOwnPropertyNames,
    p = Object.getPrototypeOf,
    u = Object.prototype.hasOwnProperty,
    h = (e, t, r, o) => {
      if ((t && "object" == typeof t) || "function" == typeof t)
        for (let s of i(t))
          u.call(e, s) ||
            s === r ||
            n(e, s, {
              get: () => t[s],
              enumerable: !(o = a(t, s)) || o.enumerable,
            });
      return e;
    },
    d = (e, t, r) => {
      let o;
      return (
        (o = "symbol" != typeof t ? t + "" : t) in e
          ? n(e, o, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: r,
            })
          : (e[o] = r),
        r
      );
    },
    c = {},
    y = { default: () => P };
  for (var m in y) n(c, m, { get: y[m], enumerable: !0 });
  t.exports = h(n({}, "__esModule", { value: !0 }), c);
  var f =
      ((s = null != (o = e.r(352386)) ? l(p(o)) : {}),
      h(
        o && o.__esModule ? s : n(s, "default", { value: o, enumerable: !0 }),
        o,
      )),
    g = e.r(415685),
    b = e.r(574087);
  class P extends f.Component {
    constructor() {
      (super(...arguments),
        d(this, "callPlayer", g.callPlayer),
        d(this, "duration", null),
        d(this, "currentTime", null),
        d(this, "secondsLoaded", null),
        d(this, "mute", () => {}),
        d(this, "unmute", () => {}),
        d(this, "ref", (e) => {
          this.iframe = e;
        }));
    }
    componentDidMount() {
      this.props.onMount && this.props.onMount(this);
    }
    load(e) {
      (0, g.getSDK)(
        "https://widget.mixcloud.com/media/js/widgetApi.js",
        "Mixcloud",
      ).then((e) => {
        ((this.player = e.PlayerWidget(this.iframe)),
          this.player.ready.then(() => {
            (this.player.events.play.on(this.props.onPlay),
              this.player.events.pause.on(this.props.onPause),
              this.player.events.ended.on(this.props.onEnded),
              this.player.events.error.on(this.props.error),
              this.player.events.progress.on((e, t) => {
                ((this.currentTime = e), (this.duration = t));
              }),
              this.props.onReady());
          }));
      }, this.props.onError);
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
    setVolume(e) {}
    getDuration() {
      return this.duration;
    }
    getCurrentTime() {
      return this.currentTime;
    }
    getSecondsLoaded() {
      return null;
    }
    render() {
      let { url: e, config: t } = this.props,
        r = e.match(b.MATCH_URL_MIXCLOUD)[1],
        o = (0, g.queryString)({ ...t.options, feed: `/${r}/` });
      return f.default.createElement("iframe", {
        key: r,
        ref: this.ref,
        style: { width: "100%", height: "100%" },
        src: `https://www.mixcloud.com/widget/iframe/?${o}`,
        frameBorder: "0",
        allow: "autoplay",
      });
    }
  }
  (d(P, "displayName", "Mixcloud"),
    d(P, "canPlay", b.canPlay.mixcloud),
    d(P, "loopOnEnded", !0));
};
