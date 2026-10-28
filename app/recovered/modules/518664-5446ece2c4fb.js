// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    l = e.i(811005);
  e.s([
    "f",
    0,
    function (e, i, { isEqual: r = Object.is } = {}) {
      let [s] = (0, t.useState)(() => {
        let t;
        return (t = {
          value: i(e.getState()),
          selector: i,
          isEqual: r,
          notify: null,
          emittedThisFrame: !1,
          emit: () => {
            let l = t.selector(e.getState());
            t.isEqual(l, t.value) || ((t.value = l), t.notify?.());
          },
          onCommit: () => {
            t.emittedThisFrame
              ? (0, l._)(t.flushEmit)
              : ((t.emittedThisFrame = !0), (0, l._)(t.endFrame), t.emit());
          },
          flushEmit: () => {
            ((t.emittedThisFrame = !0), (0, l._)(t.endFrame), t.emit());
          },
          endFrame: () => {
            t.emittedThisFrame = !1;
          },
          adopt: (l, i) => {
            let r = l !== t.selector;
            ((t.selector = l),
              (t.isEqual = i),
              r && (t.value = l(e.getState())));
          },
        });
      });
      s.adopt(i, r);
      let a = (0, t.useCallback)(
          (t) => {
            ((s.notify = t), s.emit());
            let l = e.subscribe(s.onCommit);
            return () => {
              (l(), (s.notify = null));
            };
          },
          [e, s],
        ),
        n = (0, t.useCallback)(() => s.value, [s]),
        o = (0, t.useCallback)(
          () => i((e.getInitialState ?? e.getState)()),
          [e, i],
        );
      return (0, t.useSyncExternalStore)(a, n, o);
    },
  ]);
};
