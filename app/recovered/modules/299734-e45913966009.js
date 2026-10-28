// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    ({ origin: e, path: t, query: n = {}, hash: r = {} }) => {
      let a = new URL(t, e.endsWith("/") ? e : `${e}/`);
      for (let [e, t] of Object.entries(n))
        void 0 !== t && a.searchParams.set(e, t);
      let i = Object.entries(r);
      if (i.length > 0) {
        let e = new URLSearchParams();
        for (let [t, n] of i) void 0 !== n && e.append(t, n);
        a.hash = e.toString();
      }
      return a.href;
    },
  ]);
};
