// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(811005);
  e.s([
    "f",
    0,
    function (e, a, { isEqual: i = Object.is } = {}) {
      let [s] = (0, t.useState)(() => {
        let t;
        return (t = {
          value: a(e.getState()),
          selector: a,
          isEqual: i,
          notify: null,
          emittedThisFrame: !1,
          emit: () => {
            let r = t.selector(e.getState());
            t.isEqual(r, t.value) || ((t.value = r), t.notify?.());
          },
          onCommit: () => {
            t.emittedThisFrame
              ? (0, r._)(t.flushEmit)
              : ((t.emittedThisFrame = !0), (0, r._)(t.endFrame), t.emit());
          },
          flushEmit: () => {
            ((t.emittedThisFrame = !0), (0, r._)(t.endFrame), t.emit());
          },
          endFrame: () => {
            t.emittedThisFrame = !1;
          },
          adopt: (r, a) => {
            let i = r !== t.selector;
            ((t.selector = r),
              (t.isEqual = a),
              i && (t.value = r(e.getState())));
          },
        });
      });
      s.adopt(a, i);
      let l = (0, t.useCallback)(
          (t) => {
            ((s.notify = t), s.emit());
            let r = e.subscribe(s.onCommit);
            return () => {
              (r(), (s.notify = null));
            };
          },
          [e, s],
        ),
        o = (0, t.useCallback)(() => s.value, [s]),
        n = (0, t.useCallback)(
          () => a((e.getInitialState ?? e.getState)()),
          [e, a],
        );
      return (0, t.useSyncExternalStore)(l, o, n);
    },
  ]);
};
