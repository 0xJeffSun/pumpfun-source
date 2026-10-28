// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(448341),
    i = e.i(782067);
  async function l(e) {
    let {
        queryClient: l,
        address: n,
        userId: a,
        username: r,
        identifiers: s = [],
      } = e,
      o = new Set([n, a, r, ...s].filter((e) => !!e));
    await Promise.all(
      Array.from(o).flatMap((e) => [
        l.invalidateQueries({ queryKey: (0, t.B)(e) }),
        l.invalidateQueries({ queryKey: (0, i.J)(e) }),
      ]),
    );
  }
  e.s(["f", 0, l]);
};
