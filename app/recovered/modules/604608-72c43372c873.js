// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(241175),
    a = e.i(213618),
    n = e.i(606933);
  function s(e, t) {
    return e.findAll(t.filters).map((e) => (t.select ? t.select(e) : e.state));
  }
  function i(e = {}, o) {
    let l = (0, n.useQueryClient)(o).getMutationCache(),
      u = t.useRef(e),
      c = t.useRef(null);
    return (
      c.current || (c.current = s(l, e)),
      t.useEffect(() => {
        u.current = e;
      }),
      t.useSyncExternalStore(
        t.useCallback(
          (e) =>
            l.subscribe(() => {
              let t = (0, a.B)(c.current, s(l, u.current));
              c.current !== t && ((c.current = t), r.f.schedule(e));
            }),
          [l],
        ),
        () => c.current,
        () => c.current,
      )
    );
  }
  e.s([
    "F",
    0,
    function (e, t) {
      let r = (0, n.useQueryClient)(t);
      return i({ filters: { ...e, status: "pending" } }, r).length;
    },
    "Z",
    0,
    i,
  ]);
};
