// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(352386);
  let r = (0, e.i(78436).$)(() => ({})),
    a = (e) => r.getState()[e];
  e.s([
    "P",
    0,
    ({ children: e, configPlugins: a }) => (
      (0, n.useEffect)(() => {
        if (a && 0 !== a.length)
          return (
            r.setState(Object.fromEntries(a.map((e) => [e.id, e]))),
            () => {
              r.setState(Object.fromEntries(a.map((e) => [e.id, void 0])));
            }
          );
      }, [a]),
      (0, t.jsx)(t.Fragment, { children: e })
    ),
    "a",
    0,
    (e) => {
      (0, n.useEffect)(
        () => (
          r.setState({ [e.id]: e }),
          () => {
            r.setState({ [e.id]: void 0 });
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
    () => (0, n.useCallback)((e) => a(e), []),
  ]);
};
