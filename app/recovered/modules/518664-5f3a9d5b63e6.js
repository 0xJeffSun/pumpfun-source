// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(811005);
  e.s([
    "f",
    0,
    function (e, l, { isEqual: a = Object.is } = {}) {
      let [i] = (0, t.useState)(() => {
        let t;
        return (t = {
          value: l(e.getState()),
          selector: l,
          isEqual: a,
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
          adopt: (r, l) => {
            let a = r !== t.selector;
            ((t.selector = r),
              (t.isEqual = l),
              a && (t.value = r(e.getState())));
          },
        });
      });
      i.adopt(l, a);
      let s = (0, t.useCallback)(
          (t) => {
            ((i.notify = t), i.emit());
            let r = e.subscribe(i.onCommit);
            return () => {
              (r(), (i.notify = null));
            };
          },
          [e, i],
        ),
        n = (0, t.useCallback)(() => i.value, [i]),
        o = (0, t.useCallback)(
          () => l((e.getInitialState ?? e.getState)()),
          [e, l],
        );
      return (0, t.useSyncExternalStore)(s, n, o);
    },
  ]);
};
