// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = new Map(),
    r = new Map();
  e.s([
    "S",
    0,
    ({ userId: e, mint: n, isStillCurrent: i }) => {
      let a = t.get(e);
      if (void 0 !== a) return Promise.resolve(a);
      let o = r.get(e);
      if (void 0 !== o) return o;
      let s = n()
        .then((r) => {
          let n = "string" == typeof r?.address ? r.address : null;
          return null !== n && (void 0 === i || i()) ? (t.set(e, n), n) : null;
        })
        .finally(() => {
          r.delete(e);
        });
      return (r.set(e, s), s);
    },
    "U",
    0,
    ({ userId: e, address: r }) => {
      t.set(e, r);
    },
    "C",
    0,
    () => {
      (t.clear(), r.clear());
    },
  ]);
};
