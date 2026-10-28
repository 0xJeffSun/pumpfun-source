// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(194672),
    n = e.i(63794);
  function r(e) {
    var r;
    let i = null == (r = n.P.queueMicrotask) ? void 0 : r.bind(n.P);
    "function" == typeof i
      ? i((0, t.l)(e))
      : Promise.resolve().then((0, t.l)(e));
  }
  class i {
    constructor(e) {
      ((this.onFirstSubscribe = e), (this.observers = []));
    }
    subscribe(e) {
      return (
        this.addObserver(e),
        { unsubscribe: () => this.removeObserver(e) }
      );
    }
    notify(e) {
      this.observers.forEach((t) => t(e));
    }
    addObserver(e) {
      (this.observers.push(e),
        1 === this.observers.length &&
          this.onFirstSubscribe &&
          (this.onLastUnsubscribe = this.onFirstSubscribe(this) || void 0));
    }
    removeObserver(e) {
      ((this.observers = this.observers.filter((t) => e !== t)),
        !this.observers.length &&
          this.onLastUnsubscribe &&
          this.onLastUnsubscribe());
    }
  }
  e.s(
    [
      "O",
      0,
      class extends i {
        constructor(e) {
          (super(), (this.maxBufferSize = e), (this.buffer = []));
        }
        notify(e) {
          (this.buffer.push(e),
            this.buffer.length > this.maxBufferSize && this.buffer.shift(),
            super.notify(e));
        }
        subscribe(e) {
          let t = !1;
          return (
            r(() => {
              for (let n of this.buffer) {
                if (t) return;
                e(n);
              }
              t || this.addObserver(e);
            }),
            {
              unsubscribe: () => {
                ((t = !0), this.removeObserver(e));
              },
            }
          );
        }
        unbuffer() {
          r(() => {
            this.maxBufferSize = this.buffer.length = 0;
          });
        }
      },
      "S",
      0,
      i,
      "R",
      0,
      function (...e) {
        return new i((t) => {
          let n = e.map((e) => e.subscribe((e) => t.notify(e)));
          return () => n.forEach((e) => e.unsubscribe());
        });
      },
    ],
    526658,
  );
};
