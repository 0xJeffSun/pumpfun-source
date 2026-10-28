// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e;
  var i = t.i(719372),
    s = t.i(907953);
  function r() {
    e = void 0;
  }
  let n = {
    now: () => (
      void 0 === e &&
        n.set(
          s.I.isProcessing || i.f.useManualTiming
            ? s.I.timestamp
            : performance.now(),
        ),
      e
    ),
    set: (t) => {
      ((e = t), queueMicrotask(r));
    },
  };
  t.s(["f", 0, n]);
};
