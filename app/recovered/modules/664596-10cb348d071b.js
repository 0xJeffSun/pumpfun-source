// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = new (e.i(533030).f)(8192);
  e.s([
    "f",
    0,
    function (e, { enabled: r = !0, id: n }) {
      if (!r || !n) return e();
      if (t.get(n)) return t.get(n);
      let a = e().finally(() => t.delete(n));
      return (t.set(n, a), a);
    },
  ]);
};
