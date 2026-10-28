// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  var t = e.i(303232),
    n = e.i(268932);
  let r = new (class {
    callbacks = [];
    callbacksCount = 0;
    nextId = 1;
    startId = 1;
    isScheduled = !1;
    tick = (e) => {
      this.isScheduled = !1;
      let t = this.callbacks,
        n = this.callbacksCount;
      if (
        ((this.callbacks = []),
        (this.callbacksCount = 0),
        (this.startId = this.nextId),
        n > 0)
      )
        for (let n = 0; n < t.length; n += 1) t[n]?.(e);
    };
    request(e) {
      let t = this.nextId;
      return (
        (this.nextId += 1),
        this.callbacks.push(e),
        (this.callbacksCount += 1),
        this.isScheduled ||
          (requestAnimationFrame(this.tick), (this.isScheduled = !0)),
        t
      );
    }
    cancel(e) {
      let t = e - this.startId;
      t < 0 ||
        t >= this.callbacks.length ||
        ((this.callbacks[t] = null), (this.callbacksCount -= 1));
    }
  })();
  class i {
    static create() {
      return new i();
    }
    static request(e) {
      return r.request(e);
    }
    static cancel(e) {
      return r.cancel(e);
    }
    currentId = null;
    request(e) {
      (this.cancel(),
        (this.currentId = r.request(() => {
          ((this.currentId = null), e());
        })));
    }
    cancel = () => {
      null !== this.currentId &&
        (r.cancel(this.currentId), (this.currentId = null));
    };
    disposeEffect = () => this.cancel;
  }
  e.s([
    "$",
    0,
    i,
    "z",
    0,
    function () {
      let e = (0, t.f)(i.create).current;
      return ((0, n.f)(e.disposeEffect), e);
    },
  ]);
};
