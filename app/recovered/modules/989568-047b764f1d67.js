// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = new Map();
  e.s([
    "e",
    0,
    (e) => t.get(e),
    "o",
    0,
    (e, r) => {
      let a;
      if (
        !("u" > typeof URL && "function" == typeof URL.createObjectURL) ||
        t.has(e) ||
        (t.set(e, URL.createObjectURL(r)), t.size <= 500)
      )
        return;
      let i = t.keys().next().value;
      void 0 !== i &&
        void 0 !== (a = t.get(i)) &&
        (t.delete(i), URL.revokeObjectURL(a));
    },
  ]);
};
