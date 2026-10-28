// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(607079),
    i = e.i(77962),
    s = e.i(831185),
    r = e.i(123696);
  e.i(352386);
  class o extends s.f {
    $$PROVIDER_TYPE = "YOUTUBE";
    scope = (0, t.createScope)();
    #e;
    #t = (0, t.signal)("");
    #i = -1;
    #s = null;
    #r = -1;
    #o = !1;
    #a = new Map();
    constructor(e, t) {
      (super(e), (this.#e = t));
    }
    language = "en";
    color = "red";
    cookies = !1;
    get currentSrc() {
      return this.#s;
    }
    get type() {
      return "youtube";
    }
    get videoId() {
      return this.#t();
    }
    preconnect() {
      (0, i.WZ)(this.getOrigin());
    }
    setup() {
      (super.setup(),
        (0, t.effect)(this.#n.bind(this)),
        this.#e.notify("provider-setup", this));
    }
    destroy() {
      for (let e of (this.#h(), this.#a.values()))
        for (let { reject: t } of e) t("provider destroyed");
      this.#a.clear();
    }
    async play() {
      return this.#c("playVideo");
    }
    #d(e) {
      this.#l("playVideo")?.reject(e);
    }
    async pause() {
      return this.#c("pauseVideo");
    }
    #u(e) {
      this.#l("pauseVideo")?.reject(e);
    }
    setMuted(e) {
      e ? this.#c("mute") : this.#c("unMute");
    }
    setCurrentTime(e) {
      (this.#c("seekTo", e), this.#e.notify("seeking", e));
    }
    setVolume(e) {
      this.#c("setVolume", 100 * e);
    }
    setPlaybackRate(e) {
      this.#c("setPlaybackRate", e);
    }
    async loadSource(e) {
      if (!(0, t.isString)(e.src)) {
        ((this.#s = null), this.#t.set(""));
        return;
      }
      let i = (0, r.resolveYouTubeVideoId)(e.src);
      (this.#t.set(i ?? ""), (this.#s = e));
    }
    getOrigin() {
      return this.cookies
        ? "https://www.youtube.com"
        : "https://www.youtube-nocookie.com";
    }
    #n() {
      this.#h();
      let e = this.#t();
      e
        ? (this.src.set(`${this.getOrigin()}/embed/${e}`),
          this.#e.notify("load-start"))
        : this.src.set("");
    }
    buildParams() {
      let { keyDisabled: e } = this.#e.$props,
        { muted: t, playsInline: i, nativeControls: s } = this.#e.$state,
        r = s();
      return {
        rel: 0,
        autoplay: 0,
        cc_lang_pref: this.language,
        cc_load_policy: r ? 1 : void 0,
        color: this.color,
        controls: +!!r,
        disablekb: !r || e() ? 1 : 0,
        enablejsapi: 1,
        fs: 1,
        hl: this.language,
        iv_load_policy: r ? 1 : 3,
        mute: +!!t(),
        playsinline: +!!i(),
      };
    }
    #c(e, i) {
      let s = (0, t.deferredPromise)(),
        r = this.#a.get(e);
      return (
        r || this.#a.set(e, (r = [])),
        r.push(s),
        this.postMessage({ event: "command", func: e, args: i ? [i] : void 0 }),
        s.promise
      );
    }
    onLoad() {
      window.setTimeout(() => this.postMessage({ event: "listening" }), 100);
    }
    #g(e) {
      (this.#e.notify("loaded-metadata"),
        this.#e.notify("loaded-data"),
        this.#e.delegate.ready(void 0, e));
    }
    #m(e) {
      (this.#l("pauseVideo")?.resolve(), this.#e.notify("pause", void 0, e));
    }
    #p(e, t) {
      let { duration: i, realCurrentTime: s } = this.#e.$state,
        r = 0 === this.#i,
        o = r ? i() : e;
      (this.#e.notify("time-change", o, t),
        !r && Math.abs(o - s()) > 1 && this.#e.notify("seeking", o, t));
    }
    #f(e, t, s) {
      let r = { buffered: new i.y0(0, e), seekable: t };
      this.#e.notify("progress", r, s);
      let { seeking: o, realCurrentTime: a } = this.#e.$state;
      o() && e > a() && this.#y(s);
    }
    #y(e) {
      let { paused: t, realCurrentTime: i } = this.#e.$state;
      (window.clearTimeout(this.#r),
        (this.#r = window.setTimeout(() => {
          (this.#e.notify("seeked", i(), e), (this.#r = -1));
        }, 100 * !!t())));
    }
    #v(e) {
      let { seeking: t } = this.#e.$state;
      (t() && this.#y(e),
        this.#e.notify("pause", void 0, e),
        this.#e.notify("end", void 0, e));
    }
    #b(e, t) {
      let { paused: i, seeking: s } = this.#e.$state,
        r = 1 === e,
        o = 3 === e,
        a = this.#w("playVideo"),
        n = i() && (o || r);
      if (
        (o && this.#e.notify("waiting", void 0, t),
        s() && r && this.#y(t),
        this.#o && r)
      ) {
        (this.pause(), (this.#o = !1), this.setMuted(this.#e.$state.muted()));
        return;
      }
      if (!a && n) {
        ((this.#o = !0), this.setMuted(!0));
        return;
      }
      switch (
        (n &&
          (this.#l("playVideo")?.resolve(), this.#e.notify("play", void 0, t)),
        e)
      ) {
        case 5:
          this.#g(t);
          break;
        case 1:
          this.#e.notify("playing", void 0, t);
          break;
        case 2:
          this.#m(t);
          break;
        case 0:
          this.#v(t);
      }
      this.#i = e;
    }
    onMessage({ info: e }, s) {
      if (!e) return;
      let { title: r, intrinsicDuration: o, playbackRate: a } = this.#e.$state;
      if (
        ((0, t.isObject)(e.videoData) &&
          e.videoData.title !== r() &&
          this.#e.notify("title-change", e.videoData.title, s),
        (0, t.isNumber)(e.duration) && e.duration !== o())
      ) {
        if ((0, t.isNumber)(e.videoLoadedFraction)) {
          let t = e.progressState?.loaded ?? e.videoLoadedFraction * e.duration,
            r = new i.y0(0, e.duration);
          this.#f(t, r, s);
        }
        this.#e.notify("duration-change", e.duration, s);
      }
      if (
        ((0, t.isNumber)(e.playbackRate) &&
          e.playbackRate !== a() &&
          this.#e.notify("rate-change", e.playbackRate, s),
        e.progressState)
      ) {
        let {
          current: t,
          seekableStart: r,
          seekableEnd: a,
          loaded: n,
          duration: h,
        } = e.progressState;
        (this.#p(t, s),
          this.#f(n, new i.y0(r, a), s),
          h !== o() && this.#e.notify("duration-change", h, s));
      }
      if ((0, t.isNumber)(e.volume) && (0, t.isBoolean)(e.muted) && !this.#o) {
        let t = { muted: e.muted, volume: e.volume / 100 };
        this.#e.notify("volume-change", t, s);
      }
      (0, t.isNumber)(e.playerState) &&
        e.playerState !== this.#i &&
        this.#b(e.playerState, s);
    }
    #h() {
      ((this.#i = -1), (this.#r = -1), (this.#o = !1));
    }
    #l(e) {
      return this.#a.get(e)?.shift();
    }
    #w(e) {
      return !!this.#a.get(e)?.length;
    }
  }
  e.s(["YouTubeProvider", 0, o]);
};
