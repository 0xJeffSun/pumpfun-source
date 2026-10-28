// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(38279);
  let i = [1500, 6e3, 15e3],
    n = new Map();
  e.s([
    "f",
    0,
    (e, r) => {
      if (!r) return;
      for (let e of n.get(r) ?? []) clearTimeout(e);
      let s = t.Q.BALANCE_SUMMARY(r),
        o = i.map((t, o) =>
          setTimeout(() => {
            (e.invalidateQueries({ queryKey: s }),
              o === i.length - 1 && n.delete(r));
          }, t),
        );
      n.set(r, o);
    },
  ]);
};
