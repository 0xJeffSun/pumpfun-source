// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    i = e.i(811005);
  e.s([
    "f",
    0,
    function (e, a, { isEqual: s = Object.is } = {}) {
      let [n] = (0, t.useState)(() => {
        let t;
        return (t = {
          value: a(e.getState()),
          selector: a,
          isEqual: s,
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
          adopt: (i, a) => {
            let s = i !== t.selector;
            ((t.selector = i),
              (t.isEqual = a),
              s && (t.value = i(e.getState())));
          },
        });
      });
      n.adopt(a, s);
      let l = (0, t.useCallback)(
          (t) => {
            ((n.notify = t), n.emit());
            let i = e.subscribe(n.onCommit);
            return () => {
              (i(), (n.notify = null));
            };
          },
          [e, n],
        ),
        r = (0, t.useCallback)(() => n.value, [n]),
        c = (0, t.useCallback)(
          () => a((e.getInitialState ?? e.getState)()),
          [e, a],
        );
      return (0, t.useSyncExternalStore)(l, r, c);
    },
  ]);
};
