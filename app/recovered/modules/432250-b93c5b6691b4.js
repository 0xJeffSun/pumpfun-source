// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(352386);
  let r = (0, e.i(78436).$)(() => ({})),
    i = (e) => r.getState()[e];
  e.s([
    "P",
    0,
    ({ children: e, configPlugins: i }) => (
      (0, n.useEffect)(() => {
        if (i && 0 !== i.length)
          return (
            r.setState(Object.fromEntries(i.map((e) => [e.id, e]))),
            () => {
              r.setState(Object.fromEntries(i.map((e) => [e.id, void 0])));
            }
          );
      }, [i]),
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
    i,
    "u",
    0,
    () => (0, n.useCallback)((e) => i(e), []),
  ]);
};
