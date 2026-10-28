// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = new Map();
  e.s([
    "X",
    0,
    (e) => t.has(e),
    "J",
    0,
    (e) => {
      let r = e.filter((e) => !!e);
      for (let e of r) t.set(e, (t.get(e) ?? 0) + 1);
      let n = !1;
      return () => {
        if (!n)
          for (let e of ((n = !0), r)) {
            let r = (t.get(e) ?? 0) - 1;
            r > 0 ? t.set(e, r) : t.delete(e);
          }
      };
    },
  ]);
};
