// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  var a = Object.create,
    n = Object.defineProperty,
    o = Object.getOwnPropertyDescriptor,
    i = Object.getOwnPropertyNames,
    l = Object.getPrototypeOf,
    s = Object.prototype.hasOwnProperty,
    u = (e, t, r, a) => {
      if ((t && "object" == typeof t) || "function" == typeof t)
        for (let l of i(t))
          s.call(e, l) ||
            l === r ||
            n(e, l, {
              get: () => t[l],
              enumerable: !(a = o(t, l)) || a.enumerable,
            });
      return e;
    },
    c = (e, t, r) => (
      (r = null != e ? a(l(e)) : {}),
      u(
        !t && e && e.__esModule
          ? r
          : n(r, "default", { value: e, enumerable: !0 }),
        e,
      )
    ),
    p = (e, t, r) => {
      let a;
      return (
        (a = "symbol" != typeof t ? t + "" : t) in e
          ? n(e, a, {
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
    d = { default: () => g };
  for (var h in d) n(y, h, { get: d[h], enumerable: !0 });
  t.exports = u(n({}, "__esModule", { value: !0 }), y);
  var f = c(e.r(352386)),
    m = c(e.r(771196)),
    b = e.r(496135),
    P = e.r(415685);
  class g extends f.Component {
    constructor() {
      (super(...arguments),
        p(this, "mounted", !1),
        p(this, "isReady", !1),
        p(this, "isPlaying", !1),
        p(this, "isLoading", !0),
        p(this, "loadOnReady", null),
        p(this, "startOnPlay", !0),
        p(this, "seekOnPlay", null),
        p(this, "onDurationCalled", !1),
        p(this, "handlePlayerMount", (e) => {
          (this.player || ((this.player = e), this.player.load(this.props.url)),
            this.progress());
        }),
        p(this, "getInternalPlayer", (e) =>
          this.player ? this.player[e] : null,
        ),
        p(this, "progress", () => {
          if (this.props.url && this.player && this.isReady) {
            let e = this.getCurrentTime() || 0,
              t = this.getSecondsLoaded(),
              r = this.getDuration();
            if (r) {
              let a = { playedSeconds: e, played: e / r };
              (null !== t && ((a.loadedSeconds = t), (a.loaded = t / r)),
                (a.playedSeconds !== this.prevPlayed ||
                  a.loadedSeconds !== this.prevLoaded) &&
                  this.props.onProgress(a),
                (this.prevPlayed = a.playedSeconds),
                (this.prevLoaded = a.loadedSeconds));
            }
          }
          this.progressTimeout = setTimeout(
            this.progress,
            this.props.progressFrequency || this.props.progressInterval,
          );
        }),
        p(this, "handleReady", () => {
          if (!this.mounted) return;
          ((this.isReady = !0), (this.isLoading = !1));
          let { onReady: e, playing: t, volume: r, muted: a } = this.props;
          (e(),
            a || null === r || this.player.setVolume(r),
            this.loadOnReady
              ? (this.player.load(this.loadOnReady, !0),
                (this.loadOnReady = null))
              : t && this.player.play(),
            this.handleDurationCheck());
        }),
        p(this, "handlePlay", () => {
          ((this.isPlaying = !0), (this.isLoading = !1));
          let { onStart: e, onPlay: t, playbackRate: r } = this.props;
          (this.startOnPlay &&
            (this.player.setPlaybackRate &&
              1 !== r &&
              this.player.setPlaybackRate(r),
            e(),
            (this.startOnPlay = !1)),
            t(),
            this.seekOnPlay &&
              (this.seekTo(this.seekOnPlay), (this.seekOnPlay = null)),
            this.handleDurationCheck());
        }),
        p(this, "handlePause", (e) => {
          ((this.isPlaying = !1), this.isLoading || this.props.onPause(e));
        }),
        p(this, "handleEnded", () => {
          let { activePlayer: e, loop: t, onEnded: r } = this.props;
          (e.loopOnEnded && t && this.seekTo(0),
            t || ((this.isPlaying = !1), r()));
        }),
        p(this, "handleError", (...e) => {
          ((this.isLoading = !1), this.props.onError(...e));
        }),
        p(this, "handleDurationCheck", () => {
          clearTimeout(this.durationCheckTimeout);
          let e = this.getDuration();
          e
            ? this.onDurationCalled ||
              (this.props.onDuration(e), (this.onDurationCalled = !0))
            : (this.durationCheckTimeout = setTimeout(
                this.handleDurationCheck,
                100,
              ));
        }),
        p(this, "handleLoaded", () => {
          this.isLoading = !1;
        }));
    }
    componentDidMount() {
      this.mounted = !0;
    }
    componentWillUnmount() {
      (clearTimeout(this.progressTimeout),
        clearTimeout(this.durationCheckTimeout),
        this.isReady &&
          this.props.stopOnUnmount &&
          (this.player.stop(),
          this.player.disablePIP && this.player.disablePIP()),
        (this.mounted = !1));
    }
    componentDidUpdate(e) {
      if (!this.player) return;
      let {
        url: t,
        playing: r,
        volume: a,
        muted: n,
        playbackRate: o,
        pip: i,
        loop: l,
        activePlayer: s,
        disableDeferredLoading: u,
      } = this.props;
      if (!(0, m.default)(e.url, t)) {
        if (this.isLoading && !s.forceLoad && !u && !(0, P.isMediaStream)(t)) {
          (console.warn(
            `ReactPlayer: the attempt to load ${t} is being deferred until the player has loaded`,
          ),
            (this.loadOnReady = t));
          return;
        }
        ((this.isLoading = !0),
          (this.startOnPlay = !0),
          (this.onDurationCalled = !1),
          this.player.load(t, this.isReady));
      }
      (e.playing || !r || this.isPlaying || this.player.play(),
        e.playing && !r && this.isPlaying && this.player.pause(),
        !e.pip && i && this.player.enablePIP && this.player.enablePIP(),
        e.pip && !i && this.player.disablePIP && this.player.disablePIP(),
        e.volume !== a && null !== a && this.player.setVolume(a),
        e.muted !== n &&
          (n
            ? this.player.mute()
            : (this.player.unmute(),
              null !== a && setTimeout(() => this.player.setVolume(a)))),
        e.playbackRate !== o &&
          this.player.setPlaybackRate &&
          this.player.setPlaybackRate(o),
        e.loop !== l && this.player.setLoop && this.player.setLoop(l));
    }
    getDuration() {
      return this.isReady ? this.player.getDuration() : null;
    }
    getCurrentTime() {
      return this.isReady ? this.player.getCurrentTime() : null;
    }
    getSecondsLoaded() {
      return this.isReady ? this.player.getSecondsLoaded() : null;
    }
    seekTo(e, t, r) {
      if (!this.isReady) {
        0 !== e &&
          ((this.seekOnPlay = e),
          setTimeout(() => {
            this.seekOnPlay = null;
          }, 5e3));
        return;
      }
      if (t ? "fraction" === t : e > 0 && e < 1) {
        let t = this.player.getDuration();
        return t
          ? void this.player.seekTo(t * e, r)
          : void console.warn(
              "ReactPlayer: could not seek using fraction – duration not yet available",
            );
      }
      this.player.seekTo(e, r);
    }
    render() {
      let e = this.props.activePlayer;
      return e
        ? f.default.createElement(e, {
            ...this.props,
            onMount: this.handlePlayerMount,
            onReady: this.handleReady,
            onPlay: this.handlePlay,
            onPause: this.handlePause,
            onEnded: this.handleEnded,
            onLoaded: this.handleLoaded,
            onError: this.handleError,
          })
        : null;
    }
  }
  (p(g, "displayName", "Player"),
    p(g, "propTypes", b.propTypes),
    p(g, "defaultProps", b.defaultProps));
};
