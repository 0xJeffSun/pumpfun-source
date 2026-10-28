// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    ({ origin: e, path: t, query: r = {}, hash: n = {} }) => {
      let a = new URL(t, e.endsWith("/") ? e : `${e}/`);
      for (let [e, t] of Object.entries(r))
        void 0 !== t && a.searchParams.set(e, t);
      let i = Object.entries(n);
      if (i.length > 0) {
        let e = new URLSearchParams();
        for (let [t, r] of i) void 0 !== r && e.append(t, r);
        a.hash = e.toString();
      }
      return a.href;
    },
  ]);
};
