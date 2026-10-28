// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(645912);
  e.s([
    "f",
    0,
    function () {
      let e = "",
        r = 0;
      return {
        isAsync: !1,
        get isEmpty() {
          return !e;
        },
        write(o, n) {
          let i = (0, t.C)(o);
          ((r += i), (e += o), n && n(i));
        },
        finish(e) {
          e(this.finishSync());
        },
        finishSync() {
          let t = {
            output: e,
            outputBytesCount: r,
            rawBytesCount: r,
            pendingData: "",
          };
          return ((e = ""), (r = 0), t);
        },
        estimateEncodedBytesCount: (e) => e.length,
      };
    },
  ]);
};
