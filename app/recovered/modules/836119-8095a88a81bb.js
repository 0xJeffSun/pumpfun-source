// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(300983),
    r = e.i(92245),
    n = e.i(38279);
  async function i(e) {
    let {
      address: i,
      userId: s,
      userIdentifier: a,
      queryClient: o,
      router: l,
    } = e;
    l.refresh();
    let u = [a, i, s],
      d = new Set(),
      c = u
        .filter((e) => !!e && !d.has(e))
        .map((e) => (d.add(e), o.invalidateQueries({ queryKey: ["user", e] }))),
      f = (0, r.$)({ userId: s, address: i });
    (f &&
      (c.push(o.invalidateQueries({ queryKey: n.Q.X_CONNECTION_STATUS(f) })),
      i &&
        i !== f &&
        c.push(o.invalidateQueries({ queryKey: n.Q.X_CONNECTION_STATUS(i) }))),
      i && c.push((0, t.W)(o)),
      await Promise.all(c));
  }
  e.s(["f", 0, i]);
};
