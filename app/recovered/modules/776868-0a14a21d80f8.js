// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  "use strict";
  var e = t.i(607079),
    i = t.i(77962);
  t.i(352386);
  class s {
    #t;
    #e;
    #i = null;
    #s = null;
    config = {};
    #n = new Set();
    get instance() {
      return this.#i;
    }
    constructor(t, e) {
      ((this.#t = t), (this.#e = e));
    }
    setup(t) {
      let { streamType: s } = this.#e.$state,
        n = (0, e.peek)(s).includes("live"),
        a = (0, e.peek)(s).includes("ll-");
      this.#i = new t({
        lowLatencyMode: a,
        backBufferLength: a ? 4 : n ? 8 : void 0,
        renderTextTracksNatively: !1,
        ...this.config,
      });
      let r = this.#a.bind(this);
      for (let e of Object.values(t.Events)) this.#i.on(e, r);
      for (let e of (this.#i.on(t.Events.ERROR, this.#r.bind(this)), this.#n))
        e(this.#i);
      (this.#e.player.dispatch("hls-instance", { detail: this.#i }),
        this.#i.attachMedia(this.#t),
        this.#i.on(t.Events.AUDIO_TRACK_SWITCHED, this.#o.bind(this)),
        this.#i.on(t.Events.LEVEL_SWITCHED, this.#c.bind(this)),
        this.#i.on(t.Events.LEVEL_LOADED, this.#l.bind(this)),
        this.#i.on(t.Events.LEVEL_UPDATED, this.#h.bind(this)),
        this.#i.on(t.Events.NON_NATIVE_TEXT_TRACKS_FOUND, this.#d.bind(this)),
        this.#i.on(t.Events.CUES_PARSED, this.#u.bind(this)),
        (this.#e.qualities[i.cS.enableAuto] = this.#v.bind(this)),
        (0, e.listenEvent)(this.#e.qualities, "change", this.#p.bind(this)),
        (0, e.listenEvent)(this.#e.audioTracks, "change", this.#b.bind(this)),
        (this.#s = (0, e.effect)(this.#E.bind(this))));
    }
    #y(t, i) {
      return new e.DOMEvent((0, e.camelToKebabCase)(t), { detail: i });
    }
    #E() {
      if (!this.#e.$state.live()) return;
      let t = new i.Z_(this.#g.bind(this));
      return (t.start(), t.stop.bind(t));
    }
    #g() {
      this.#e.$state.liveSyncPosition.set(this.#i?.liveSyncPosition ?? 1 / 0);
    }
    #a(t, e) {
      this.#e.player?.dispatch(this.#y(t, e));
    }
    #d(t, e) {
      let s = this.#y(t, e),
        n = -1;
      for (let t = 0; t < e.tracks.length; t++) {
        let a = e.tracks[t],
          r = a.subtitleTrack ?? a.closedCaptions,
          o = new i.it({
            id: `hls-${a.kind}-${t}`,
            src: r?.url,
            label: a.label,
            language: r?.lang,
            kind: a.kind,
            default: a.default,
          });
        ((o[i.LI.readyState] = 2),
          (o[i.LI.onModeChange] = () => {
            "showing" === o.mode
              ? ((this.#i.subtitleTrack = t), (n = t))
              : n === t && ((this.#i.subtitleTrack = -1), (n = -1));
          }),
          this.#e.textTracks.add(o, s));
      }
    }
    #u(t, e) {
      let i = this.#i?.subtitleTrack,
        s = this.#e.textTracks.getById(`hls-${e.type}-${i}`);
      if (!s) return;
      let n = this.#y(t, e);
      for (let t of e.cues) ((t.positionAlign = "auto"), s.addCue(t, n));
    }
    #o(t, e) {
      let s = this.#e.audioTracks[e.id];
      if (s) {
        let n = this.#y(t, e);
        this.#e.audioTracks[i.MP.select](s, !0, n);
      }
    }
    #c(t, e) {
      let s = this.#e.qualities[e.level];
      if (s) {
        let n = this.#y(t, e);
        this.#e.qualities[i.MP.select](s, !0, n);
      }
    }
    #h(t, e) {
      e.details.totalduration > 0 &&
        this.#e.$state.inferredLiveDVRWindow.set(e.details.totalduration);
    }
    #l(t, s) {
      if (this.#e.$state.canPlay()) return;
      let { type: n, live: a, totalduration: r, targetduration: o } = s.details,
        c = this.#y(t, s);
      (this.#e.notify(
        "stream-type-change",
        a
          ? "EVENT" === n && Number.isFinite(r) && o >= 10
            ? "live:dvr"
            : "live"
          : "on-demand",
        c,
      ),
        this.#e.notify("duration-change", r, c));
      let l = this.#i.media;
      for (let t of (-1 === this.#i.currentLevel &&
        this.#e.qualities[i.cS.setAuto](!0, c),
      this.#i.audioTracks)) {
        let e = {
          id: t.id.toString(),
          label: t.name,
          language: t.lang || "",
          kind: "main",
        };
        this.#e.audioTracks[i.MP.add](e, c);
      }
      for (let t of this.#i.levels) {
        let e = {
          id: t.id?.toString() ?? t.height + "p",
          width: t.width,
          height: t.height,
          codec: t.codecSet,
          bitrate: t.bitrate,
        };
        this.#e.qualities[i.MP.add](e, c);
      }
      l.dispatchEvent(new e.DOMEvent("canplay", { trigger: c }));
    }
    #r(t, e) {
      e.fatal &&
        ("mediaError" === e.type
          ? this.#i?.recoverMediaError()
          : this.#L(e.error));
    }
    #L(t) {
      this.#e.notify("error", { message: t.message, code: 1, error: t });
    }
    #v() {
      this.#i && (this.#i.currentLevel = -1);
    }
    #p() {
      let { qualities: t } = this.#e;
      this.#i &&
        !t.auto &&
        ((this.#i[t.switch + "Level"] = t.selectedIndex),
        i.Rz && (this.#t.currentTime = this.#t.currentTime));
    }
    #b() {
      let { audioTracks: t } = this.#e;
      this.#i &&
        this.#i.audioTrack !== t.selectedIndex &&
        (this.#i.audioTrack = t.selectedIndex);
    }
    onInstance(t) {
      return (this.#n.add(t), () => this.#n.delete(t));
    }
    loadSource(t) {
      (0, e.isString)(t.src) && this.#i?.loadSource(t.src);
    }
    destroy() {
      (this.#i?.destroy(), (this.#i = null), this.#s?.(), (this.#s = null));
    }
  }
  class n {
    #S;
    #e;
    #f;
    constructor(t, e, i) {
      ((this.#S = t), (this.#e = e), (this.#f = i), this.#x());
    }
    async #x() {
      let t = {
          onLoadStart: this.#k.bind(this),
          onLoaded: this.#T.bind(this),
          onLoadError: this.#w.bind(this),
        },
        i = await r(this.#S, t);
      return ((0, e.isUndefined)(i) &&
        !(0, e.isString)(this.#S) &&
        (i = await a(this.#S, t)),
      i)
        ? i.isSupported()
          ? i
          : (this.#e.player.dispatch(new e.DOMEvent("hls-unsupported")),
            this.#e.notify("error", {
              message:
                "[vidstack] `hls.js` is not supported in this environment",
              code: 4,
            }),
            null)
        : null;
    }
    #k() {
      this.#e.player.dispatch(new e.DOMEvent("hls-lib-load-start"));
    }
    #T(t) {
      (this.#e.player.dispatch(new e.DOMEvent("hls-lib-loaded", { detail: t })),
        this.#f(t));
    }
    #w(t) {
      let s = (0, i.hL)(t);
      (this.#e.player.dispatch(
        new e.DOMEvent("hls-lib-load-error", { detail: s }),
      ),
        this.#e.notify("error", { message: s.message, code: 4, error: s }));
    }
  }
  async function a(t, i = {}) {
    if (!(0, e.isUndefined)(t)) {
      if ((i.onLoadStart?.(), t.prototype && t.prototype !== Function))
        return (i.onLoaded?.(t), t);
      try {
        let e = (await t())?.default;
        if (e && e.isSupported) i.onLoaded?.(e);
        else throw Error("");
        return e;
      } catch (t) {
        i.onLoadError?.(t);
      }
    }
  }
  async function r(t, s = {}) {
    if ((0, e.isString)(t)) {
      s.onLoadStart?.();
      try {
        if ((await (0, i.sE)(t), !(0, e.isFunction)(window.Hls)))
          throw Error("");
        let n = window.Hls;
        return (s.onLoaded?.(n), n);
      } catch (t) {
        s.onLoadError?.(t);
      }
    }
  }
  class o extends i.L0 {
    $$PROVIDER_TYPE = "HLS";
    #m = null;
    #D = new s(this.video, this.ctx);
    get ctor() {
      return this.#m;
    }
    get instance() {
      return this.#D.instance;
    }
    static supported = (0, i.Va)();
    get type() {
      return "hls";
    }
    get canLiveSync() {
      return !0;
    }
    #O = "https://cdn.jsdelivr.net/npm/hls.js@^1.5.0/dist/hls.min.js";
    get config() {
      return this.#D.config;
    }
    set config(t) {
      this.#D.config = t;
    }
    get library() {
      return this.#O;
    }
    set library(t) {
      this.#O = t;
    }
    preconnect() {
      (0, e.isString)(this.#O) && (0, i.WZ)(this.#O);
    }
    setup() {
      (super.setup(),
        new n(this.#O, this.ctx, (t) => {
          ((this.#m = t),
            this.#D.setup(t),
            this.ctx.notify("provider-setup", this));
          let i = (0, e.peek)(this.ctx.$state.source);
          i && this.loadSource(i);
        }));
    }
    async loadSource(t, i) {
      (0, e.isString)(t.src)
        ? ((this.media.preload = i || ""),
          this.appendSource(t, "application/x-mpegurl"),
          this.#D.loadSource(t),
          (this.currentSrc = t))
        : this.removeSource();
    }
    onInstance(t) {
      let e = this.#D.instance;
      return (e && t(e), this.#D.onInstance(t));
    }
    destroy() {
      this.#D.destroy();
    }
  }
  t.s(["HLSProvider", 0, o]);
};
