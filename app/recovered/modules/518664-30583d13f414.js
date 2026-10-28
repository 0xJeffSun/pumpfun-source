// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    i = e.i(811005);
  e.s([
    "f",
    0,
    function (e, l, { isEqual: r = Object.is } = {}) {
      let [a] = (0, t.useState)(() => {
        let t;
        return (t = {
          value: l(e.getState()),
          selector: l,
          isEqual: r,
          notify: null,
          emittedThisFrame: !1,
          emit: () => {
            let i = t.selector(e.getState());
            t.isEqual(i, t.value) || ((t.value = i), t.notify?.());
          },
          onCommit: () => {
            t.emittedThisFrame
              ? (0, i._)(t.flushEmit)
              : ((t.emittedThisFrame = !0), (0, i._)(t.endFrame), t.emit());
          },
          flushEmit: () => {
            ((t.emittedThisFrame = !0), (0, i._)(t.endFrame), t.emit());
          },
          endFrame: () => {
            t.emittedThisFrame = !1;
          },
          adopt: (i, l) => {
            let r = i !== t.selector;
            ((t.selector = i),
              (t.isEqual = l),
              r && (t.value = i(e.getState())));
          },
        });
      });
      a.adopt(l, r);
      let s = (0, t.useCallback)(
          (t) => {
            ((a.notify = t), a.emit());
            let i = e.subscribe(a.onCommit);
            return () => {
              (i(), (a.notify = null));
            };
          },
          [e, a],
        ),
        n = (0, t.useCallback)(() => a.value, [a]),
        o = (0, t.useCallback)(
          () => l((e.getInitialState ?? e.getState)()),
          [e, l],
        );
      return (0, t.useSyncExternalStore)(s, n, o);
    },
  ]);
};
