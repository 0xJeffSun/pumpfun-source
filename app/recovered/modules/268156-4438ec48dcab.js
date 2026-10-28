// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(79631);
  let n = [1500, 4e3, 1e4],
    r = new Map(),
    i = (e, t) => `${e}:${t}`;
  e.s([
    "f",
    0,
    (e, a, o) => {
      if (!a || !o) return;
      let l = i(a, o);
      for (let e of r.get(l) ?? []) clearTimeout(e);
      r.delete(l);
      let s = i(a, o),
        u = t.F.batch(a, [o]),
        d = n.map((t, i) =>
          setTimeout(() => {
            (e.invalidateQueries({ queryKey: u }),
              i === n.length - 1 && r.delete(s));
          }, t),
        );
      r.set(s, d);
    },
  ]);
};
