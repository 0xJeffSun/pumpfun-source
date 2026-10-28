// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(574472),
    r = e.i(92245);
  let n = () => {
    let e,
      r = (0, t.c)(3),
      { userId: n, address: a } = (0, i.F)();
    return (
      r[0] !== a || r[1] !== n
        ? ((e = { userId: n, address: a }), (r[0] = a), (r[1] = n), (r[2] = e))
        : (e = r[2]),
      e
    );
  };
  e.s([
    "$",
    0,
    () => {
      let e,
        i = (0, t.c)(2),
        a = n();
      return (
        i[0] !== a
          ? ((e = (e) => (0, r.Z)(a, e)), (i[0] = a), (i[1] = e))
          : (e = i[1]),
        e
      );
    },
    "U",
    0,
    n,
    "_",
    0,
    () => {
      let e,
        n = (0, t.c)(3),
        { userId: a, address: o } = (0, i.F)();
      return (
        n[0] !== o || n[1] !== a
          ? ((e = (0, r.$)({ userId: a, address: o })),
            (n[0] = o),
            (n[1] = a),
            (n[2] = e))
          : (e = n[2]),
        e
      );
    },
  ]);
};
