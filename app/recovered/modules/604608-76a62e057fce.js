// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(241175),
    a = e.i(213618),
    n = e.i(606933);
  function i(e, t) {
    return e.findAll(t.filters).map((e) => (t.select ? t.select(e) : e.state));
  }
  function s(e = {}, o) {
    let l = (0, n.useQueryClient)(o).getMutationCache(),
      c = t.useRef(e),
      u = t.useRef(null);
    return (
      u.current || (u.current = i(l, e)),
      t.useEffect(() => {
        c.current = e;
      }),
      t.useSyncExternalStore(
        t.useCallback(
          (e) =>
            l.subscribe(() => {
              let t = (0, a.B)(u.current, i(l, c.current));
              u.current !== t && ((u.current = t), r.f.schedule(e));
            }),
          [l],
        ),
        () => u.current,
        () => u.current,
      )
    );
  }
  e.s([
    "F",
    0,
    function (e, t) {
      let r = (0, n.useQueryClient)(t);
      return s({ filters: { ...e, status: "pending" } }, r).length;
    },
    "Z",
    0,
    s,
  ]);
};
