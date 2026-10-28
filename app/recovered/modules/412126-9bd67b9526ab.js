// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e = (t) => null !== t;
  (t.s(
    [
      "f",
      0,
      function (t, { repeat: i, repeatType: s = "loop" }, r, n = 1) {
        let a = t.filter(e),
          o = n < 0 || (i && "loop" !== s && i % 2 == 1) ? 0 : a.length - 1;
        return o && void 0 !== r ? r : a[o];
      },
    ],
    412126,
  ),
    t.s(
      [
        "f",
        0,
        class {
          constructor() {
            this.updateFinished();
          }
          get finished() {
            return this._finished;
          }
          updateFinished() {
            this._finished = new Promise((t) => {
              this.resolve = t;
            });
          }
          notifyFinished() {
            this.resolve();
          }
          then(t, e) {
            return this.finished.then(t, e);
          }
        },
      ],
      247553,
    ));
};
