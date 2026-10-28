// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = new (e.i(533030).f)(8192);
  e.s([
    "f",
    0,
    function (e, { enabled: r = !0, id: s }) {
      if (!r || !s) return e();
      if (t.get(s)) return t.get(s);
      let n = e().finally(() => t.delete(s));
      return (t.set(s, n), n);
    },
  ]);
};
