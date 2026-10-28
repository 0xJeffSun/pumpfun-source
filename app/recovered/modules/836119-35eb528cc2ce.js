// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(300983),
    r = e.i(92245),
    n = e.i(38279);
  async function a(e) {
    let {
      address: a,
      userId: i,
      userIdentifier: o,
      queryClient: s,
      router: l,
    } = e;
    l.refresh();
    let u = [o, a, i],
      c = new Set(),
      d = u
        .filter((e) => !!e && !c.has(e))
        .map((e) => (c.add(e), s.invalidateQueries({ queryKey: ["user", e] }))),
      f = (0, r.$)({ userId: i, address: a });
    (f &&
      (d.push(s.invalidateQueries({ queryKey: n.Q.X_CONNECTION_STATUS(f) })),
      a &&
        a !== f &&
        d.push(s.invalidateQueries({ queryKey: n.Q.X_CONNECTION_STATUS(a) }))),
      a && d.push((0, t.W)(s)),
      await Promise.all(d));
  }
  e.s(["f", 0, a]);
};
