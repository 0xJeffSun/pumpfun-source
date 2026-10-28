// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  function e(t) {
    let e = [{}, {}];
    return (
      t?.values.forEach((t, i) => {
        ((e[0][i] = t.get()), (e[1][i] = t.getVelocity()));
      }),
      e
    );
  }
  t.s([
    "f",
    0,
    function (t, i, s, r) {
      if ("function" == typeof i) {
        let [n, a] = e(r);
        i = i(void 0 !== s ? s : t.custom, n, a);
      }
      if (
        ("string" == typeof i && (i = t.variants && t.variants[i]),
        "function" == typeof i)
      ) {
        let [n, a] = e(r);
        i = i(void 0 !== s ? s : t.custom, n, a);
      }
      return i;
    },
  ]);
};
