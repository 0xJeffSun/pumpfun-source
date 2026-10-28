// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var a = e.i(352386),
    t = e.i(811005);
  e.s([
    "f",
    0,
    function (e, r, { isEqual: s = Object.is } = {}) {
      let [l] = (0, a.useState)(() => {
        let a;
        return (a = {
          value: r(e.getState()),
          selector: r,
          isEqual: s,
          notify: null,
          emittedThisFrame: !1,
          emit: () => {
            let t = a.selector(e.getState());
            a.isEqual(t, a.value) || ((a.value = t), a.notify?.());
          },
          onCommit: () => {
            a.emittedThisFrame
              ? (0, t._)(a.flushEmit)
              : ((a.emittedThisFrame = !0), (0, t._)(a.endFrame), a.emit());
          },
          flushEmit: () => {
            ((a.emittedThisFrame = !0), (0, t._)(a.endFrame), a.emit());
          },
          endFrame: () => {
            a.emittedThisFrame = !1;
          },
          adopt: (t, r) => {
            let s = t !== a.selector;
            ((a.selector = t),
              (a.isEqual = r),
              s && (a.value = t(e.getState())));
          },
        });
      });
      l.adopt(r, s);
      let i = (0, a.useCallback)(
          (a) => {
            ((l.notify = a), l.emit());
            let t = e.subscribe(l.onCommit);
            return () => {
              (t(), (l.notify = null));
            };
          },
          [e, l],
        ),
        n = (0, a.useCallback)(() => l.value, [l]),
        o = (0, a.useCallback)(
          () => r((e.getInitialState ?? e.getState)()),
          [e, r],
        );
      return (0, a.useSyncExternalStore)(i, n, o);
    },
  ]);
};
