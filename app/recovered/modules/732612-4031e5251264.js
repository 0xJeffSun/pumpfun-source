// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(303232),
    n = e.i(268932);
  class r {
    static create() {
      return new r();
    }
    currentId = 0;
    start(e, t) {
      (this.clear(),
        (this.currentId = setTimeout(() => {
          ((this.currentId = 0), t());
        }, e)));
    }
    isStarted() {
      return 0 !== this.currentId;
    }
    clear = () => {
      0 !== this.currentId &&
        (clearTimeout(this.currentId), (this.currentId = 0));
    };
    disposeEffect = () => this.clear;
  }
  e.s([
    "U",
    0,
    r,
    "e",
    0,
    function () {
      let e = (0, t.f)(r.create).current;
      return ((0, n.f)(e.disposeEffect), e);
    },
  ]);
};
