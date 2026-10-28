// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(352386);
  let n = (0, e.i(78436).$)(() => ({})),
    a = (e) => n.getState()[e];
  e.s([
    "P",
    0,
    ({ children: e, configPlugins: a }) => (
      (0, r.useEffect)(() => {
        if (a && 0 !== a.length)
          return (
            n.setState(Object.fromEntries(a.map((e) => [e.id, e]))),
            () => {
              n.setState(Object.fromEntries(a.map((e) => [e.id, void 0])));
            }
          );
      }, [a]),
      (0, t.jsx)(t.Fragment, { children: e })
    ),
    "a",
    0,
    (e) => {
      (0, r.useEffect)(
        () => (
          n.setState({ [e.id]: e }),
          () => {
            n.setState({ [e.id]: void 0 });
          }
        ),
        [e],
      );
    },
    "g",
    0,
    a,
    "u",
    0,
    () => (0, r.useCallback)((e) => a(e), []),
  ]);
};
