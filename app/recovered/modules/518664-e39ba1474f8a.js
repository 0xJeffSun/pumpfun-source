// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    l = e.i(811005);
  e.s([
    "f",
    0,
    function (e, i, { isEqual: r = Object.is } = {}) {
      let [a] = (0, t.useState)(() => {
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
      a.adopt(i, r);
      let s = (0, t.useCallback)(
          (t) => {
            ((a.notify = t), a.emit());
            let l = e.subscribe(a.onCommit);
            return () => {
              (l(), (a.notify = null));
            };
          },
          [e, a],
        ),
        n = (0, t.useCallback)(() => a.value, [a]),
        o = (0, t.useCallback)(
          () => i((e.getInitialState ?? e.getState)()),
          [e, i],
        );
      return (0, t.useSyncExternalStore)(s, n, o);
    },
  ]);
};
