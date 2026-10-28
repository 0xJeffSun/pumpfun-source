// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(38279);
  let n = [1500, 6e3, 15e3],
    r = new Map();
  e.s([
    "f",
    0,
    (e, i) => {
      if (!i) return;
      for (let e of r.get(i) ?? []) clearTimeout(e);
      let a = t.Q.BALANCE_SUMMARY(i),
        s = n.map((t, s) =>
          setTimeout(() => {
            (e.invalidateQueries({ queryKey: a }),
              s === n.length - 1 && r.delete(i));
          }, t),
        );
      r.set(i, s);
    },
  ]);
};
