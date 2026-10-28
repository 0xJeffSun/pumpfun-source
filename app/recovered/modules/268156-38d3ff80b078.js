// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(79631);
  let l = [1500, 4e3, 1e4],
    r = new Map(),
    n = (e, t) => `${e}:${t}`;
  e.s([
    "f",
    0,
    (e, i, a) => {
      if (!i || !a) return;
      let s = n(i, a);
      for (let e of r.get(s) ?? []) clearTimeout(e);
      r.delete(s);
      let o = n(i, a),
        c = t.F.batch(i, [a]),
        d = l.map((t, n) =>
          setTimeout(() => {
            (e.invalidateQueries({ queryKey: c }),
              n === l.length - 1 && r.delete(o));
          }, t),
        );
      r.set(o, d);
    },
  ]);
};
