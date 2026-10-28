// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(300983),
    i = e.i(92245),
    a = e.i(38279);
  async function n(e) {
    let {
      address: n,
      userId: r,
      userIdentifier: s,
      queryClient: l,
      router: o,
    } = e;
    o.refresh();
    let c = [s, n, r],
      d = new Set(),
      m = c
        .filter((e) => !!e && !d.has(e))
        .map((e) => (d.add(e), l.invalidateQueries({ queryKey: ["user", e] }))),
      u = (0, i.$)({ userId: r, address: n });
    (u &&
      (m.push(l.invalidateQueries({ queryKey: a.Q.X_CONNECTION_STATUS(u) })),
      n &&
        n !== u &&
        m.push(l.invalidateQueries({ queryKey: a.Q.X_CONNECTION_STATUS(n) }))),
      n && m.push((0, t.W)(l)),
      await Promise.all(m));
  }
  e.s(["f", 0, n]);
};
