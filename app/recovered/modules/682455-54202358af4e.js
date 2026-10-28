// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = new Map(),
    n = new Map();
  e.s([
    "S",
    0,
    ({ userId: e, mint: r, isStillCurrent: a }) => {
      let i = t.get(e);
      if (void 0 !== i) return Promise.resolve(i);
      let o = n.get(e);
      if (void 0 !== o) return o;
      let l = r()
        .then((n) => {
          let r = "string" == typeof n?.address ? n.address : null;
          return null !== r && (void 0 === a || a()) ? (t.set(e, r), r) : null;
        })
        .finally(() => {
          n.delete(e);
        });
      return (n.set(e, l), l);
    },
    "U",
    0,
    ({ userId: e, address: n }) => {
      t.set(e, n);
    },
    "C",
    0,
    () => {
      (t.clear(), n.clear());
    },
  ]);
};
