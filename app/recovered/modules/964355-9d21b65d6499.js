// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.i(149502);
  var e = t.i(810246),
    i = t.i(398361),
    s = t.i(720802),
    r = t.i(907953);
  let n = { current: void 0 };
  class a {
    constructor(t, e = {}) {
      ((this.canTrackVelocity = null),
        (this.events = {}),
        (this.updateAndNotify = (t) => {
          let e = s.f.now();
          if (
            (this.updatedAt !== e && this.setPrevFrameValue(),
            (this.prev = this.current),
            this.setCurrent(t),
            this.current !== this.prev &&
              (this.events.change?.notify(this.current), this.dependents))
          )
            for (let t of this.dependents) t.dirty();
        }),
        (this.hasAnimated = !1),
        this.setCurrent(t),
        (this.owner = e.owner));
    }
    setCurrent(t) {
      ((this.current = t),
        (this.updatedAt = s.f.now()),
        null === this.canTrackVelocity &&
          void 0 !== t &&
          (this.canTrackVelocity = !isNaN(parseFloat(this.current))));
    }
    setPrevFrameValue(t = this.current) {
      ((this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt));
    }
    onChange(t) {
      return this.on("change", t);
    }
    on(t, i) {
      this.events[t] || (this.events[t] = new e.f());
      let s = this.events[t].add(i);
      return "change" === t
        ? () => {
            (s(),
              r.y.read(() => {
                this.events.change.getSize() || this.stop();
              }));
          }
        : s;
    }
    clearListeners() {
      for (let t in this.events) this.events[t].clear();
    }
    attach(t, e) {
      ((this.passiveEffect = t), (this.stopPassiveEffect = e));
    }
    set(t) {
      this.passiveEffect
        ? this.passiveEffect(t, this.updateAndNotify)
        : this.updateAndNotify(t);
    }
    setWithVelocity(t, e, i) {
      (this.set(e),
        (this.prev = void 0),
        (this.prevFrameValue = t),
        (this.prevUpdatedAt = this.updatedAt - i));
    }
    jump(t, e = !0) {
      (this.updateAndNotify(t),
        (this.prev = t),
        (this.prevUpdatedAt = this.prevFrameValue = void 0),
        e && this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect());
    }
    dirty() {
      this.events.change?.notify(this.current);
    }
    addDependent(t) {
      (this.dependents || (this.dependents = new Set()),
        this.dependents.add(t));
    }
    removeDependent(t) {
      this.dependents && this.dependents.delete(t);
    }
    get() {
      return (n.current && n.current.push(this), this.current);
    }
    getPrevious() {
      return this.prev;
    }
    getVelocity() {
      let t = s.f.now();
      if (
        !this.canTrackVelocity ||
        void 0 === this.prevFrameValue ||
        t - this.updatedAt > 30
      )
        return 0;
      let e = Math.min(this.updatedAt - this.prevUpdatedAt, 30);
      return (0, i.f)(
        parseFloat(this.current) - parseFloat(this.prevFrameValue),
        e,
      );
    }
    start(t) {
      return (
        this.stop(),
        new Promise((e) => {
          ((this.hasAnimated = !0),
            (this.animation = t(e)),
            this.events.animationStart && this.events.animationStart.notify());
        }).then(() => {
          (this.events.animationComplete &&
            this.events.animationComplete.notify(),
            this.clearAnimation());
        })
      );
    }
    stop() {
      (this.animation &&
        (this.animation.stop(),
        this.events.animationCancel && this.events.animationCancel.notify()),
        this.clearAnimation());
    }
    isAnimating() {
      return !!this.animation;
    }
    clearAnimation() {
      delete this.animation;
    }
    destroy() {
      (this.dependents?.clear(),
        this.events.destroy?.notify(),
        this.clearListeners(),
        this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect());
    }
  }
  t.s([
    "I",
    0,
    n,
    "o",
    0,
    function (t, e) {
      return new a(t, e);
    },
  ]);
};
